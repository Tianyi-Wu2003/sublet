import { Schema, model } from 'mongoose';

export interface IHouse extends Document {
  owner: string;
  address: string;
  description: string;
  bedroom: number;
  bathroom: number;
  startDate: Date;
  endDate: Date;
  price: number;
  picture1: string;
  picture2: string;
}

const houseSchema = new Schema<IHouse>({
  owner: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String },
  bedroom: { type: Number, required: true },
  bathroom: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  price: { type: Number },
  picture1: { type: String },
  picture2: { type: String },
});

const House = model<IHouse>('House', houseSchema);

export default House;
