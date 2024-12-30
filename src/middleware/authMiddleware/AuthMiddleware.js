import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { fetchPermissions } from '../permissionsMiddleware/getPermissions';

export const authMiddleware = (navigate) => {
    const token = Cookies.get('authToken');
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            const { user } = decodedToken;
            console.log(user, "this is the user details")
            localStorage.setItem("user_role", user?.roleName);
            localStorage.setItem("user_name", user.firstName);
            localStorage.setItem("juvive_image_url", user.image);
            localStorage.setItem("user_id", user.id);

            fetchPermissions(user.roleId).then((permissions) => {
                localStorage.setItem("permissions", JSON.stringify(permissions));
                if (user?.roleName === "Admin") {
                    navigate("/dashboard");
                } else if (user.roleName === "Trainer") {
                    navigate("/trainer/dashboard");
                } else if (user.roleName === "Receptionist") {
                    navigate("/reception/dashboard");
                }
            }).catch((error) => {
                console.error('Error fetching permissions:', error);
                navigate('/');
            });
        } catch (error) {
            console.error('Error decoding token:', error);
            navigate('/');
        }
    } else {
        navigate('/');
    }
};
