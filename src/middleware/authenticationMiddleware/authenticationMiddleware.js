import {jwtDecode} from "jwt-decode";

 const authenticationMiddleware = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken?.user.role || null; // Adjust based on your token's structure
  } catch (error) {
    return null;
  }
};

export default authenticationMiddleware
