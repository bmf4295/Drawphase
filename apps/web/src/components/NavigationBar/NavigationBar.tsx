import { useState, useEffect, useContext } from "react";
import { logout } from "../../hooks/useLogout";
import LoginButton from "../loginButton/LoginButton";
import { UserContext } from "../../context/UserContext";

const NavigationBar: React.FC = () => {
    const api = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const userCtx = useContext(UserContext);
    //check login status on mount
    useEffect(() => {
        const checkAuthAndGetUserInfo = async () => {
            const authRes = await fetch(`${api}/auth/status`, { credentials: "include", })
            if (authRes.ok) {
                setIsLoggedIn(true);
                //now that we have authenticated the login, now we fetch the user and save their info to the context
                const userRes = await fetch(`${api}/user/me`, { credentials: "include" });
                if (userRes.ok) {
                    const userInfo = await userRes.json();
                    if (userCtx && "setUser" in userCtx) {
                        userCtx.setUser(userInfo.user);
                    }
                }
            } else {
                setIsLoggedIn(false);
                if (userCtx && "setUser" in userCtx) {
                    userCtx.setUser(null);
                }
            }
        }
        checkAuthAndGetUserInfo();
    }, [api, userCtx]);

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
                    <>
                        {/* Hamburger/User menu */}
                        <button
                            className="ml-2 flex items-center justify-center h-14 px-6 rounded-full hover:bg-gray-700 transition bg-gray-800 min-w-[56px]"
                            aria-label={userCtx?.user?.username}
                            style={{ maxWidth: 220 }}
                        >
                            {userCtx?.user?.username && (
                                <span
                                    className="text-white font-medium mr-2 truncate max-w-[120px] overflow-hidden"
                                    title={userCtx.user.username}
                                >
                                    {userCtx.user.username}
                                </span>
                            )}
                            <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" className="text-white" viewBox="0 0 24 24">
                                <circle cx="12" cy="8" r="4" />
                                <path d="M4 20c0-2.5 3.5-4 8-4s8 1.5 8 4" />
                            </svg>
                        </button>
                        <button
                            className="text-white px-4 py-2 rounded hover:bg-gray-700 bg-gray-600 transition"
                            onClick={() => logout(api, setIsLoggedIn)}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <LoginButton onClick={() => window.location.href = `${api}/auth/google`} />

                )}

            </div>
        </div>
    )


};

export default NavigationBar;