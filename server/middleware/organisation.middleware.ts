import { NextFunction, Request, Response } from 'express';
import ResponseApi from '../util/ApiResponse.util';
import jwt from 'jsonwebtoken';

export const organisationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /*
            Sample Use in Front-End
            Bearer Token 
            const response = await axiosInstance.get('/some-path', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        */
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
      return ResponseApi(res, 401, 'Unauthorized');
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY!, (error, decodedToken) => {
      if (error) {
        return ResponseApi(res, 403, 'Forbidden');
      }

      if (decodedToken) {
        req.body._Id = (decodedToken as jwt.JwtPayload)?._id;
        req.body.role = (decodedToken as jwt.JwtPayload)?.role;

        if (req.body._id === undefined || req.body.role === undefined) {
          return ResponseApi(res, 403, 'Forbidden');
        }

<<<<<<< HEAD
        if (req.body.role !== 'organisation') {
          return ResponseApi(res, 403, 'Forbidden');
        }
      }
      next();
    });
  } catch (error) {
    console.log('There was an error in Organisation Middleware', error);
    return ResponseApi(
      res,
      500,
      error instanceof Error
        ? error.message
        : 'An unknown error occurred while processing the request'
    );
  }
};
=======
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

                if(req.body.role !== 'organisation'){
                    return ResponseApi(res, 403, 'Forbidden');
                }
            }
            next();
        });
    }
    catch(error){
        console.log("There was an error in Organisation Middleware", error);
        return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while processing the request');
    }
}
>>>>>>> 7c0dfb70bc445b745494f7d0bed5e5559c7a9f5d
