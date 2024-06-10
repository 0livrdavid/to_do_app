import { SigninData, SigninResponse } from "@/api/interface/signin";
import API from "@/api/api";

const signin = async (data: SigninData) => {
    try {
        const response = await API.post('user/signin/', data)
        return response.data as SigninResponse;
    } catch (error) {
        throw new Error(`Falha na tentativa de entrar: ${error}`);
    }
};

export default signin;

