import { IAdmin } from '../model/schema/admin.schema';
import ResponseApi from '../util/ApiResponse.util';
import { Request, Response } from 'express';
import { Admin, BloodRequest, DonationLocation, Donor, Organisation, Patient } from '../model/model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { IDonationLocation } from '../model/schema/donation-location.schema';
import { IBloodRequest } from '../model/schema/blood-request.schema';

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

    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, genSalt);

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
      { expiresIn: '30d' }
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

const getDonationLocations = async (req: Request, res: Response) => {
  try{
    const donationLocations = await DonationLocation.find({}) as IDonationLocation[];
    return ResponseApi(res, 200, 'Donation locations retrieved successfully', donationLocations);
  }catch(error){
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while getting the donation locations');
  }
}

const deleteDonationLocation = async (req: Request, res: Response) => {
  try{
    const { donationLocationId } = req.body;

    if(!donationLocationId){
      return ResponseApi(res, 400, 'Donation location ID is required');
    }

    const donationLocation = await DonationLocation.findByIdAndDelete(donationLocationId) as IDonationLocation | null;
    if(!donationLocation){
      return ResponseApi(res, 404, 'Donation location not found');
    }

    return ResponseApi(res, 200, 'Donation location deleted successfully');
  }catch(error){
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while deleting the donation location');
  }
}

const getBloodRequests = async (req: Request, res: Response) => {
  try{
    const bloodRequests = await BloodRequest.find({}) as IBloodRequest[];
    return ResponseApi(res, 200, 'Blood requests retrieved successfully', bloodRequests);
  }catch(error){
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while getting the blood requests');
  }
}

const deleteBloodRequest = async (req: Request, res: Response) => {
  try{
    const { bloodRequestId } = req.body;

    if(!bloodRequestId){
      return ResponseApi(res, 400, 'Blood request ID is required');
    }

    const bloodRequest = await BloodRequest.findByIdAndDelete(bloodRequestId) as IBloodRequest | null;
    if(!bloodRequest){
      return ResponseApi(res, 404, 'Blood request not found');
    }

    return ResponseApi(res, 200, 'Blood request deleted successfully');
  }catch(error){
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while deleting the blood request');
  }
}

const getDonors = async (req: Request, res: Response) => {
  try{
    const donors = await Donor.find({});
    return ResponseApi(res, 200, 'Donors retrieved successfully', donors);
  }catch(error){
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while getting the donors');
  }
}

const deleteDonor = async (req: Request, res: Response) => {
  try{
    const { donorId } = req.body;

    if(!donorId){
      return ResponseApi(res, 400, 'Donor ID is required');
    }

    const donor = await Donor.findByIdAndDelete(donorId);
    if(!donor){
      return ResponseApi(res, 404, 'Donor not found');
    }

    return ResponseApi(res, 200, 'Donor deleted successfully');
  }catch(error){
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while deleting the donor');
  }
}

const getPatients = async (req: Request, res: Response) => {
  try{
    const patients = await Patient.find({});
    return ResponseApi(res, 200, 'Patients retrieved successfully', patients);
  }catch(error){
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while getting the patients');
  }
}

const deletePatient = async (req: Request, res: Response) => {
  try{
    const { patientId } = req.body;

    if(!patientId){
      return ResponseApi(res, 400, 'Patient ID is required');
    }

    const patient = await Patient.findByIdAndDelete(patientId);
    if(!patient){
      return ResponseApi(res, 404, 'Patient not found');
    }

    return ResponseApi(res, 200, 'Patient deleted successfully');
  }catch(error){
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while deleting the patient');
  }
}

const getOrganistion = async (req: Request, res: Response) => {
  try{
    const organisations = await Organisation.find({});
    return ResponseApi(res, 200, 'Organisations retrieved successfully', organisations);
  }catch(error){
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while getting the organisations');
  }
}

const deleteOrganisation = async (req: Request, res: Response) => {
  try{
    const { organisationId } = req.body;

    if(!organisationId){
      return ResponseApi(res, 400, 'Organisation ID is required');
    }

    const organisation = await Organisation.findByIdAndDelete(organisationId);
    if(!organisation){
      return ResponseApi(res, 404, 'Organisation not found');
    }

    return ResponseApi(res, 200, 'Organisation deleted successfully');
  }catch(error){
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while deleting the organisation');
  }
}

const getAnalytics = async (req: Request, res: Response) => {
  try{
    const donors = await Donor.countDocuments();
    const patients = await Patient.countDocuments();
    const organisations = await Organisation.countDocuments();
    const donationLocations = await DonationLocation.countDocuments();
    const bloodRequests = await BloodRequest.countDocuments();

    return ResponseApi(res, 200, 'Analytics retrieved successfully', {
      donors,
      patients,
      organisations,
      donationLocations,
      bloodRequests,
    });
  }catch(error){
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while getting the analytics');
  }
}

const verifyAdmin = async (req: Request,res: Response) => {
  try{
    console.log("CP-1")
    const { _id,role } = req.body;

    if(_id === undefined || role === undefined){
      return ResponseApi(res,403,'Forbidden');
    }

    const admin = await Admin.findById(_id);
    return ResponseApi(res,200,'Admin verified successfully',admin);
  }catch(error){
    return ResponseApi(
      res,
      500,
      error instanceof Error
        ? error.message
        : 'An unknown error occurred while verifying the admin'
    )
  }
}

export {
  deleteDonationLocation,
  getDonationLocations,
  deleteOrganisation,
  deleteBloodRequest,
  getBloodRequests,
  getOrganistion,
  verifyAdmin,
  deletePatient,
  getAnalytics,
  deleteDonor,
  getPatients,
  getDonors,
  register, 
  login,
};
