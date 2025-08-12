export function logout(api: string, setIsLoggedIn: (v: boolean) => void) {
    fetch(`${api}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
    }).then(() => {
        setIsLoggedIn(false);
        location.reload(); // Reload to update the UI
    });
}