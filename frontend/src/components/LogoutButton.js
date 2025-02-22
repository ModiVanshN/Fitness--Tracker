import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Call backend API to handle logout (adjust the endpoint as per your backend setup)
            const response = await fetch("http://localhost:5001/api/v1/users/logout", {
                method: "POST",
                credentials: "include", // Important for cookies-based authentication
            });

            if (!response.ok) {
                throw new Error("Failed to log out. Please try again.");
            }

            // Remove authentication token after successful logout
            localStorage.removeItem("authToken");
            sessionStorage.removeItem("authToken"); // In case of session storage
            alert("Logged out successfully!");

            // Redirect to login & prevent navigating back
            navigate("/login", { replace: true });
        } catch (error) {
            console.error("Logout Error:", error);
            alert("Logout failed. Please try again.");
        }
    };

    return (
        <>
            <button className="logout-btn" onClick={handleLogout}>
                Logout
            </button>

            <style jsx>{`
                .logout-btn {
                    background-color: rgb(42, 195, 203);
                    color: white;
                    border: none;
                    padding: 12px 20px;
                    font-size: 18px;
                    font-weight: bold;
                    cursor: pointer;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    display: block;
                    width: 100%;
                    text-align: center;
                    margin-top: 20px;
                }

                .logout-btn:hover {
                    background-color: rgb(24, 125, 156);
                    transform: scale(1.05);
                }
            `}</style>
        </>
    );
};

export default LogoutButton;
