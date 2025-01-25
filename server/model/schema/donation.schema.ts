import { Schema, Document, Types } from 'mongoose';

interface IDonation extends Document {
  donorId: Types.ObjectId;
  quantity: string;
}

const DonationSchema = new Schema<IDonation>(
  {
    donorId: {
      type: Schema.Types.ObjectId,
      ref: 'Donor',
      required: [true, 'DonorId is required'],
      trim: true,
    },
    quantity: {
      type: String,
      required: [true, 'Quantity is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export { IDonation, DonationSchema };
