import ResponseApi from '../util/ApiResponse.util';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { BloodRequest, Inventory, Patient } from '../model/model';
import { IPatient } from '../model/schema/patient.schema';

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phoneNo } = req.body;

    if (!name || !email || !password || !phoneNo) {
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    if (password.length < 6 || password.length > 20) {
      return ResponseApi(res, 400, 'Password must be at least 6 and at most 20 characters');
    }

    if (phoneNo.length !== 10) {
      return ResponseApi(res, 400, 'Phone number must be 10 characters');
    }

    const existingAdmin = await Patient.findOne({ email: email.toLowerCase() }) as IPatient | null;
    if (existingAdmin) {
      return ResponseApi(res, 400, 'Donor already exists');
    }

    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, genSalt);

    const newPatient: IPatient = new Patient({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phoneNo,
    });
    await newPatient.save();

    return ResponseApi(res, 201, 'Donor registered successfully');
  } catch (error) {
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while registering the patient');
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    const existingAdmin = await Patient.findOne({ email: email.toLowerCase() }) as IPatient | null;
    if (!existingAdmin) {
      return ResponseApi(res, 400, 'Patient does not exist');
    }

    
    if (!process.env.JWT_SECRET_KEY) {
      return ResponseApi(res, 500, 'JWT secret key is not defined');
    }

    const token = jwt.sign(
      { _id: existingAdmin._id, role: 'donor' },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1d' }
    );

    const isPasswordValid = await bcrypt.compare(password, existingAdmin.password);
    if (!isPasswordValid) {
      return ResponseApi(res, 400, 'Invalid password');
    }

    return ResponseApi(res, 200, 'Patient logged in successfully');
  } catch (error) {
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while logging in the patient');
  }
};

const getBloodAvailable = async (req: Request, res: Response) => {
  try {
    const bloodAvailable = await Inventory.find().populate('organisationId');
    return ResponseApi(res, 200, 'Blood available retrieved successfully', bloodAvailable);
  } catch (error) {
    return ResponseApi(res, 500, 'An unknown error occurred while getting the blood available');
  }
};

const getBloodRequests = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return ResponseApi(res, 400, 'User ID is required');
    }

    const bloodRequests = await BloodRequest.find({ patientId: userId });
    return ResponseApi(res, 200, 'Blood requests retrieved successfully', bloodRequests);
  } catch (error) {
    return ResponseApi(res, 500, 'An unknown error occurred while getting the blood requests');
  }
};

const deleteBloodRequest = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const requestId = req.params.requestId;

    if (!userId || !requestId) {
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    const bloodRequest = await BloodRequest.findOne({
      patientId: userId,
      _id: requestId
    });

    if (!bloodRequest) {
      return ResponseApi(res, 404, 'Blood request not found');
    }

    await BloodRequest.findByIdAndDelete(requestId);
    return ResponseApi(res, 200, 'Blood request deleted successfully');
  } catch (error) {
    return ResponseApi(res, 500, 'An unknown error occurred while deleting the blood request');
  }
};

export { 
  login,
  register, 
  getBloodRequests,
  getBloodAvailable,
  deleteBloodRequest,
};