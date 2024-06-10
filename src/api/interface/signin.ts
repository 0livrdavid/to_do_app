export interface SigninData {
    username: string;
    password: string;
}

export interface SigninResponse {
    success: boolean;
    msg: string;
    data: {
        user: {
            username: string;
            name: string;
            email: string;
        };
        token: string;
    };
}

