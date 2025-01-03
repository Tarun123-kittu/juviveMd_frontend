import Cookies from 'js-cookie';

export const getRoutePermissions = (route) => {
    try {
        const permissions_data = localStorage.getItem('permissions');
        if (!permissions_data) {
            return [];
        }

        const parsed_permissions = JSON.parse(permissions_data);

        if (!Array.isArray(parsed_permissions)) {
            console.warn('Parsed permissions is not an array:', parsed_permissions);
            return [];
        }
        const all_permissions = parsed_permissions.filter(
            (el) => el.permissionName === route
        );
        return all_permissions || [];
    } catch (error) {
        console.error('Error processing permissions data:', error);
        return [];
    }
};
