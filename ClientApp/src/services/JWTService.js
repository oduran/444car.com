import axios from "axios";

export const RequestToken = async (jsonData) => {
    const response = await axios.post('user/login', jsonData, {});
    
    return await response;
};
export const DecodeJWT = (sJWS, cb) => {
    // Send request to /api/DecodeJWT
};
export const ValidateJWT = (header, token, key, cb) => {
    // Send request to /api/ValidateJWT
};