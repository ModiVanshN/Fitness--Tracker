import { Router } from "express";
import  {   registerUser,
            loginuser, 
            logoutuser,
            refreshAccessToken,
            changeuserpassword ,
            UpdateDetail,
            GetcurrentUser
         } from "../controllers/user.controller.js";
import { verifyjwt } from "../middleware/auth.middleware.js";
import {upload} from "../middleware/multer.middleware.js";

const  router = Router();

router.route('/register').post(registerUser)

router.route('/login').post(loginuser)

router.route('/logout').post(verifyjwt,logoutuser)

router.route('/refresh-Token').post(refreshAccessToken)

router.route('/change-Password').post(upload.
fields([
    
    {
        name: 'oldPassword',
        maxCount :1
    },
    {
        name: 'newPassword',
        maxCount :1  
    }
]),verifyjwt,changeuserpassword)

router.route('/current-user').get(verifyjwt,GetcurrentUser)

router.route('/Upadate-Detail').patch(verifyjwt,UpdateDetail);



export default router;