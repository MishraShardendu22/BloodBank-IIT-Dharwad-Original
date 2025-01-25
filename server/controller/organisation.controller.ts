import { BloodRequest, DonationLocation, Inventory, Organisation } from '../model/model';
import bcrypt from 'bcryptjs';
import { IOrganisation } from '../model/schema/organisation.schema';
import ResponseApi from '../util/ApiResponse.util';
import { Request, Response } from 'express';

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

    const existingOrganisation = await Organisation.findOne({ email: email.toLowerCase() }) as IOrganisation | null;  
    if(existingOrganisation){
      return ResponseApi(res, 400, 'Organisation already exists');
    }
    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, genSalt);

    const newOrganisation: IOrganisation = new Organisation({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phoneNo,
    });

    await newOrganisation.save();
    return ResponseApi(res, 201, 'Organisation registered successfully');
  } catch (error) {
    if (error instanceof Error) {
      return ResponseApi(res, 500, error.message);
    }
    return ResponseApi(
      res,
      500,
      'An unknown error occurred while registering the organisation'
    );
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    const existingOrganisation = await Organisation.findOne({ email: email.toLowerCase() }) as IOrganisation | null;
    if (!existingOrganisation) {
      return ResponseApi(res, 400, 'Organisation does not exist');
    }

    if (existingOrganisation.password !== password) {
      return ResponseApi(res, 400, 'Invalid password');
    }


    return ResponseApi(res, 200, 'Organisation logged in successfully ');
  } catch (error) {
    if (error instanceof Error) {
      return ResponseApi(res, 500, error.message);
    }
    return ResponseApi(
      res,
      500,
      'An unknown error occurred while logging in the organisation'
    );
  }
};

const addDonationLocation = async (req: Request, res: Response) => {
  try{
    const { organisationId,name,contactDetails,location,timings } = req.body;

    if(!name || !contactDetails || !location || !timings || !organisationId){
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    const newLocation = {
      organisationId,
      contactDetails,
      location,
      timings,
      name,
    };


    DonationLocation.create(newLocation);
    return ResponseApi(res, 201, 'Location added successfully');
  }catch(error){
    if(error instanceof Error){
      return ResponseApi(res, 500, error.message);
    }
    return ResponseApi(res, 500, 'An unknown error occurred while adding location to the organisation');
  }
}

const deleteDonationLocation = async (req: Request, res: Response) => {
  try{
    const { locationId } = req.body;

    if(!locationId){
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    const location = await DonationLocation.findByIdAndDelete(locationId);

    return ResponseApi(res, 200, 'Location deleted successfully');
  }catch(error){
    if(error instanceof Error){
      return ResponseApi(res, 500, error.message);
    }
    return ResponseApi(res, 500, 'An unknown error occurred while deleting location from the organisation');
  }
}

const updateDonationLocation = async (req: Request, res: Response) => {
  try{
    const { organisationId,name,contactDetails,location,timings } = req.body;

    if(!name || !contactDetails || !location || !timings || !organisationId){
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    const newLocation = {
      organisationId,
      contactDetails,
      location,
      timings,
      name,
    };

    DonationLocation.findByIdAndUpdate(newLocation);
    return ResponseApi(res, 200, 'Location updated successfully');
  }catch(error){
    if(error instanceof Error){
      return ResponseApi(res, 500, error.message);
    }
    return ResponseApi(res, 500, 'An unknown error occurred while updating location of the organisation');
  }
}

const updateInventory = async (req: Request, res: Response) => {
  try {
    const { organisationId, bloodGroup, quantity } = req.body;

    if (!organisationId || !bloodGroup || !quantity) {
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    if (quantity < 0) {
      return ResponseApi(res, 400, 'Quantity cannot be negative');
    }

    const validBloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    if (!validBloodGroups.includes(bloodGroup)) {
      return ResponseApi(res, 400, 'Invalid blood group');
    }

    const updateField = { [`${bloodGroup.replace('+', '_P').replace('-', '_M')}`]: quantity };

    const inventory = await Inventory.findOneAndUpdate(
      { OrganisationId: organisationId },
      { $inc: updateField },
      { new: true, upsert: true }
    );

    return ResponseApi(res, 200, 'Inventory updated successfully', inventory);
  } catch (error) {
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while updating inventory');
  }
};

const getBloodRequests = async (req: Request, res: Response) => {
  try {
    const bloodRequests = await BloodRequest.find().populate('patientId');
    return ResponseApi(res, 200, 'Blood requests retrieved successfully', bloodRequests);
  } catch (error) {
    return ResponseApi(res, 500, 'An unknown error occurred while getting the blood requests');
  }
}

const completeBloodRequest = async (req: Request, res: Response) => {
  try{
    const { requestId } = req.body;

    if(!requestId){
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    const bloodRequest = await BloodRequest.findById(requestId);

    if(!bloodRequest){
      return ResponseApi(res, 404, 'Blood request not found');
    }

    await BloodRequest.findByIdAndUpdate(requestId, { status: 'completed' });
    return ResponseApi(res, 200, 'Blood request completed successfully');
  }catch(error){
    return ResponseApi(res, 500, 'An unknown error occurred while completing the blood request');
  }
}

const addBloodDonated = async (req: Request, res: Response) => {
  try{
    const { patiendId, quantity, type, completed } = req.body;
    if(!patiendId || !quantity || !type || !completed){
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    const newRequest = {
      patiendId,
      quantity,
      type,
      completed,
    };

    BloodRequest.create(newRequest);

    return ResponseApi(res, 201, 'Blood request added successfully');
    }catch(error){
    return ResponseApi(res, 500, 'An unknown error occurred while adding blood request');
  }
}

export {
  login,
  register,
  addBloodDonated,
  updateInventory,
  getBloodRequests,
  addDonationLocation,
  completeBloodRequest,
  updateDonationLocation,
  deleteDonationLocation,
};