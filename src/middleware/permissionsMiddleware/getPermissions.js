export const fetchPermissions = async (roleId) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/role-permissions?roleId=${roleId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch permissions');
        }
        const data = await response.json();
        return data?.data;
    } catch (error) {
        console.error(error.messaeg);
        return [];
    }
};
