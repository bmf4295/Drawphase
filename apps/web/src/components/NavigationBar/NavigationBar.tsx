import { useState, useEffect } from "react";
import { logout } from "../../hooks/useLogout";
import LoginButton from "../loginButton/LoginButton";
const NavigationBar: React.FC = () => {
    const api = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    //check login status on mount
    useEffect(() => {
        fetch(`${api}/auth/status`, {
            credentials: "include",
        })
            .then((res) => {
                if (res.ok) {
                    setIsLoggedIn(true);
                }
            });
    }, [api]);

    return (
    <div className="flex items-center justify-between fixed top-0 left-0 w-full z-50 bg-gray-800/50 px-6 py-3 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">
            {/* Left: Brand */}
            <div className="text-white text-xl font-bold tracking-wide select-none">
                DrawPhase
            </div>
            {/* Right: Actions */}
            <div className="flex items-center gap-4">
                <button className="text-white px-4 py-2 rounded hover:bg-blue-700 bg-blue-600 transition">
                    Find Match
                </button>
                {isLoggedIn ? (
                    <button
                        className="text-white px-4 py-2 rounded hover:bg-gray-700 bg-gray-600 transition"
                        onClick={() => logout(api, setIsLoggedIn)}
                    >
                        Logout
                    </button>
                ) : (
                    <LoginButton onClick={() => window.location.href = `${api}/auth/google`}/>

                )}
                {/* Hamburger/User menu */}
                <button className="ml-2 flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-700 transition" aria-label="User menu">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white" viewBox="0 0 24 24">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-2.5 3.5-4 8-4s8 1.5 8 4" />
                    </svg>
                </button>
            </div>
        </div>
    )


};

export default NavigationBar;