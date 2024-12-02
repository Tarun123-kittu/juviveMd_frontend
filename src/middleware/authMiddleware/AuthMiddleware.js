import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export const authMiddleware = (navigate) => {
    const token = Cookies.get('authToken');
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            const { user } = decodedToken;
            localStorage.setItem("user_role", user?.role)
            console.log(user, "this is from the middleware")

            if (user?.role === "ADMIN") {
                navigate("/dashboard")
            }
            else if (user.role === "TRAINER") {
                navigate("/trainer/dashboard")
            }
            else if (user.role === "RECEPTIONIST") {
                navigate("/reception/dashboard")
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            navigate('/');
        }
    } else {
        navigate('/');
    }
};
