import ResponseApi from '../util/ApiResponse.util';
import { Request, Response } from 'express';
import { Admin } from '../model/model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IAdmin } from '../model/schema/admin.schema'; // Import the interface

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phoneNo } = req.body;

    // Ensure we use the types from IAdmin where needed
    if (!name || !email || !password || !phoneNo) {
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    if (password.length < 6 || password.length > 20) {
      return ResponseApi(
        res,
        400,
        'Password must be at least 6 and at most 20 characters'
      );
    }

    if (phoneNo.length !== 10) {
      return ResponseApi(res, 400, 'Phone number must be 10 characters');
    }

    const existingAdmin = (await Admin.findOne({
      email: email.toLowerCase(),
    })) as IAdmin | null;
    if (existingAdmin) {
      return ResponseApi(res, 400, 'Admin already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin: IAdmin = new Admin({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phoneNo,
    });
    await newAdmin.save();

    return ResponseApi(res, 201, 'Admin registered successfully');
  } catch (error) {
    return ResponseApi(
      res,
      500,
      error instanceof Error
        ? error.message
        : 'An unknown error occurred while registering the admin'
    );
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    const existingAdmin = (await Admin.findOne({
      email: email.toLowerCase(),
    })) as IAdmin | null;
    if (!existingAdmin) {
      return ResponseApi(res, 400, 'Admin does not exist');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingAdmin.password
    );
    if (!isPasswordValid) {
      return ResponseApi(res, 400, 'Invalid password');
    }

    if (!process.env.JWT_SECRET_KEY) {
      return ResponseApi(res, 500, 'JWT secret key is not defined');
    }

    const token = jwt.sign(
      {
        _id: existingAdmin._id,
        role: 'admin',
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1d' }
    );

    return ResponseApi(res, 200, 'Admin logged in successfully', token);
  } catch (error) {
    return ResponseApi(
      res,
      500,
      error instanceof Error
        ? error.message
        : 'An unknown error occurred while logging in the admin'
    );
  }
};

export { register, login };
