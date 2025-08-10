const LoginButton = () => {
   const api = import.meta.env.VITE_API_URL || 'http://localhost:3001';
   return (
    <a href={`${api}/auth/google`} className="btn btn-primary">Login with Google</a>
   )
}

export default LoginButton;