import { NextFunction, Request, Response } from 'express';
import ResponseApi from '../util/ApiResponse.util';
import jwt from 'jsonwebtoken';

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try{
        /*
            Sample Use in Front-End
            Bearer Token 
            const response = await axiosInstance.get('/some-path', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        */
        console.log("CP-1 Middleware")
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) {
            return ResponseApi(res, 401, 'Unauthorized');
        }

        console.log("CP-2 Middleware")
        jwt.verify(token, process.env.JWT_SECRET_KEY!, (error, decodedToken) => {
            if (error) {
                return ResponseApi(res, 403, 'Forbidden');
            }

            if (decodedToken) {
                req.body._id = (decodedToken as jwt.JwtPayload)?._id;
                req.body.role = (decodedToken as jwt.JwtPayload)?.role
                
                if(req.body._id === undefined || req.body.role === undefined){
                    return ResponseApi(res, 403, 'Forbidden');
                }

                if(req.body.role !== 'admin'){
                    return ResponseApi(res, 403, 'Forbidden');
                }
            }
            console.log("CP-3 Middleware")
            next();
        });
    }
    catch(error){
        console.log("There was an error in Admin Middleware", error);
        return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while processing the request');
    }
}