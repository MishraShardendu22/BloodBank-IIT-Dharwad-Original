import ResponseApi from "../util/ApiResponse.util";
import { Request, Response } from 'express';

const register = async (req: Request, res: Response) => {
    try{

    }catch(error){
        if (error instanceof Error) {
            return ResponseApi(res, 500, error.message);
        }
        return ResponseApi(res, 500, 'An unknown error occurred while registering the admin');
    }
}

const login = async (req: Request, res: Response) => {
    try{

    }catch(error){
        if (error instanceof Error) {
            return ResponseApi(res, 500, error.message);
        }
        return ResponseApi(res, 500, 'An unknown error occurred while logging in the admin');
    }
}

export {
    register,
    login
}