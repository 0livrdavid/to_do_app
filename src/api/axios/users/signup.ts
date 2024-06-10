import { SignupData, SignupResponse } from "@/api/interface/signup";
import API from "@/api/api";

const signup = async (data: SignupData) => {
    try {
        return await API.post('user/signup/', data) as SignupResponse;
    } catch (error) {
        throw new Error(`Falha na tentativa de registrar usuário: ${error}`);
    }
};

export default signup;