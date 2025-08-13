import type { User } from "../context/UserContext";

export function logout(api: string, setIsLoggedIn: (v: boolean) => void, setUser: (user: User | null) => void) {
    fetch(`${api}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
    }).then(() => {
        //clear the user context of data
        setUser(null);
        setIsLoggedIn(false);
        location.reload(); // Reload to update the UI
    });
}