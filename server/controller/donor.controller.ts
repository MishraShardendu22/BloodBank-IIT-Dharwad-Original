import { Donation, DonationLocation, Donor } from '../model/model';
import { IDonor } from '../model/schema/donor.schema';
import ResponseApi from '../util/ApiResponse.util';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


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

    const existingDonor = (await Donor.findOne({ email: email.toLowerCase() })) as IDonor | null;
    if (existingDonor) {
      return ResponseApi(res, 400, 'Donor already exists');
    }

    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, genSalt);

    const newDonor: IDonor = new Donor({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phoneNo,
    });
    await newDonor.save();

    return ResponseApi(res, 201, 'Donor registered successfully');
  } catch (error) {
    return ResponseApi(res, 500, handleError(error));
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    const existingDonor = (await Donor.findOne({ email: email.toLowerCase() })) as IDonor | null;
    if (!existingDonor) {
      return ResponseApi(res, 400, 'Donor does not exist');
    }

    const isPasswordValid = await bcrypt.compare(password, existingDonor.password);
    if (!isPasswordValid) {
      return ResponseApi(res, 400, 'Invalid password');
    }

    if (!process.env.JWT_SECRET_KEY) {
      return ResponseApi(res, 500, 'JWT secret key is not defined');
    }

    const token = jwt.sign(
      { _id: existingDonor._id, role: 'donor' },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '30d' }
    );

    return ResponseApi(res, 200, 'Donor logged in successfully', token);
  } catch (error) {
    return ResponseApi(res, 500, handleError(error));
  }
};

const getDonationHistory = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;

    const donationHistory = await Donation.find({ donorId: _id }).populate({
      path: 'organisationId',
      select: 'name'
    });

    return ResponseApi(res, 200, 'Donation history fetched successfully', donationHistory);
  } catch (error) {
    return ResponseApi(res, 500, handleError(error));
  }
};

const getDonationLocation = async (req: Request, res: Response) => {
  try {
    const donationLocation = await DonationLocation.find();
    return ResponseApi(res, 200, 'Donation location fetched successfully', donationLocation);
  } catch (error) {
    return ResponseApi(res, 500, handleError(error));
  }
};

// Utility function to handle errors
const handleError = (error: unknown) => {
  return error instanceof Error ? error.message : 'An unknown error occurred';
};

export { login, register, getDonationHistory, getDonationLocation };
