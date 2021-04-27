import { RequestToken } from "./JWTService";
import axios from "axios";

class AuthService {
    _user = null;
    _isAuthenticated = false;

    isAuthenticated() {
        return this._isAuthenticated;
    }

    getUser() {
        return this._user;
    }

    getToken() {
        return localStorage.getItem("jwtToken");
    }

    setToken(token) {
        localStorage.setItem("jwtToken", token);
    }

    async signIn(email, password) {
        this.signOut();
        let response = await RequestToken({ email: email, password: password });
        debugger;
        if (response.data.statusCode.toString() != "500") {
            this.setToken(response.data.token);
        }
        return response;
    }
    signOut() {
        this.setToken(null);
    }
    
    async register(corporateType, companyNo, email, password) {
        debugger;
        try {
        const response = await axios.post('user/register', {SpecialCompany : corporateType,companyNo:companyNo, email: email, password: password}, {});
        return response;
        }catch(e){
            return e;
        }
       
    }
    static get instance() { return authService }
}
const authService = new AuthService();

export default authService;
