import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import jwt from "jsonwebtoken"


const generateAccessRefreshToken = async (userId) =>{
       
  const user =  await User.findById(userId);
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({validateBeforeSave : false})

  return {accessToken, refreshToken}
}

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;


  console.log("Received registration request:", req.body);


 
  if (![email, username, password].some(field => field && field.trim() !== "")) {
      throw new ApiError(400, "All fields must be filled");
  }

  const userExisted = await User.findOne({
      $or: [{ email }, { username }]
  });

  if (userExisted) {
      throw new ApiError(409, "User already exists");
  }

  const user = await User.create({
      password,
      email,
      username: username.toLowerCase()
  });

  const usercreated = await User.findById(user._id).select("-password -refreshToken");

  if (!usercreated) {
      throw new ApiError(500, "Something went wrong during user creation");
  }

  return res.status(201).json(
      new ApiResponse(200, user, "Successfully Registered User")
  );
});


const loginuser = asyncHandler(async (req,res) => {

  const { email,password,username } = req.body

  if(!(email || username)){
    throw new ApiError(400,"Please enter an email address or username");
  }

  const user = await User.findOne({
    $or : [{email},{username}]
})

  if(!user){
    throw new ApiError(404,"User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if(!isPasswordValid){
    throw new ApiError(401,"Invalid password");
  }
   
  const {accessToken, refreshToken} = await generateAccessRefreshToken(user._id)

  const loggedinUser = await User.findById(user._id).select("-password -refreshToken");

  const Option = {
      httpOnly: true,
      secure : true
  }
 console.log(loggedinUser.username +" " + loggedinUser.password)
  return res
  .status(200)
  .cookie("accessToken", accessToken, Option)
  .cookie("refreshToken", refreshToken, Option)
  .json( 
    new ApiResponse(
      200,{
        user : loggedinUser
      },
      "User Successfully logged In."
      
    )
  )



})

const logoutuser = asyncHandler(async (req, res) =>{
        await User.findByIdAndUpdate(req.user._id,{
            $unset : {
              refreshToken : 1
            }
        },
          {
            new : true,
          })
        
    const Option = {
      httpOnly: true,
      secure : true
    }
  
    console.log("user logged out successfully"  )
    return res
          .status(200)
          .clearCookie("accessToken", Option)
          .clearCookie("refreshToken", Option)
          .json(new ApiResponse(200,{},"User Logged Out" ))
})

const refreshAccessToken = asyncHandler(async (req, res) =>{

   try {
    const incomingToken = req.cookies.refreshToken || req.body.refreshToken;
    if(!incomingToken) {
      throw new ApiError(401,"Unauthoruthorized request ....");
    }

    const decodedRefreshToken = jwt.verify(incomingToken,process.env.REFRESH_TOKEN_SECRET)

    const user = await User.findById(decodedRefreshToken?._id)
    
    if(!user){
      throw new ApiError(401,"Invalid refreshtoken")
    }
    if( incomingToken!== user?.refreshToken){
      throw new ApiError(401,"refreshtoken is expired or used");
    }

    const option = {
      httpOnly : true,
      secure : true
    }

    const {newRefreshToken,accessToken} = await generateAccessRefreshToken(user._id)
    return res
          .status(200)
          .cookie("accessToken",accessToken, option)
          .cookie("refreshToken", newRefreshToken, option)
          .json(new ApiResponse(
            200,
            {accessToken,refreshToken: newRefreshToken},
            "Access token is refreshed"
    ))
  }catch(error){
      throw new ApiError(401,error?.message || "Invalid refreshtoken")
  }

})

const changeuserpassword = asyncHandler(async(req,res) => {

   const { oldPassword , newPassword } = req.body;

     console.log(oldPassword + " " + newPassword);

   const user = await User.findById(req.user?._id);
   const isoldPassword = user.isPasswordCorrect(oldPassword)

   if(!isoldPassword){
        throw new  ApiError('400',"Invalid Password...")       
   }

   user.password = newPassword;
   await user.save({validateBeforeSave : false})

   return res
          .status(200)
          .json(new ApiResponse(200,{},"Password changed successfully" ) )

})

const GetcurrentUser = asyncHandler(async(req,res) => {
  return res
          .status(200)
          .json(new ApiResponse (200,req.user,"Current user Fetched..."))
});

const UpdateDetail = asyncHandler(async(req,res) =>{

  const { email ,  username    } = req.body;

  if( !email  || !username ){
    throw new ApiError('400',"This Fields are required")
  }

  const user = await User.findByIdAndUpdate(req.user?._id,
    {
      $set : {
    
        email : email,
        username,
    }},
    {
      new : true
    }
  ).select("-password")

  return res
        .status(200)
        .json(new ApiResponse (200,user, "Datail is updated"));
})




export { 
  registerUser , 
  loginuser,
  logoutuser,
  refreshAccessToken,
  changeuserpassword,
  GetcurrentUser,
  UpdateDetail,
};
  