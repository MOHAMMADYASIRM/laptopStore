import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const useTokenWatcher = () => {
    const [expiresIn, setExpiresIn] = useState("");
    const nav = useNavigate();

    useEffect(() => {
        const authToken = localStorage.getItem("userToken");
        if (!authToken || typeof authToken !== "string") {
            nav("/");
            return;
        }

        try {
            const decodedToken = jwtDecode(authToken);
            const now = Date.now();
            const expiryTime = decodedToken.exp * 1000;

            if (expiryTime < now) {
                handleLogout();
                return;
            }

            const remainingTime = expiryTime - now;
            const logoutTimer = setTimeout(() => {
                handleLogout();
            }, remainingTime);

            const intervalId = setInterval(() => {
                const timeLeft = expiryTime - Date.now();
                if (timeLeft <= 0) {
                    clearInterval(intervalId);
                    return;
                }
                const minutes = Math.floor(timeLeft / 60000);
                const seconds = Math.floor((timeLeft % 60000) / 1000);
                setExpiresIn(`${minutes}m ${seconds}s`);
            }, 1000);

            return () => {
                clearTimeout(logoutTimer);
                clearInterval(intervalId);
            };
        } catch (error) {
            handleLogout();
        }
    }, [nav]);

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userId");
        nav("/");
    };

    return { expiresIn };
};

export default useTokenWatcher;
