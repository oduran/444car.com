import axios from "axios";
import Auth from "./AuthService"
export const get = async (url, conf) => {
    let token = Auth.getToken();
    return await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`, ...conf
        }
    });

}; 
export const post = async (url, data, conf) => {
    let token = Auth.getToken();
    return await axios.post(url, data, {
        headers: {
            Authorization: `Bearer ${token}`, ...conf
        }
    });
};

