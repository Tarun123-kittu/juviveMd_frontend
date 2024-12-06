import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export const authMiddleware = (navigate) => {
    const token = Cookies.get('authToken');
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            const { user } = decodedToken;
            localStorage.setItem("user_role", user?.role)
            localStorage.setItem("user_name",user.firstName)

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
            navigate('/');
        }
    } else {
        navigate('/');
    }
};
