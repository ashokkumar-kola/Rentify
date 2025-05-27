// export type Property = {
//   id: string;
//   title: string;
//   // Add other property fields
// };

// import { Types } from 'mongoose';

// export interface Property {
//   _id?: Types.ObjectId; // optional if it's not created yet
//   landlord_id: Types.ObjectId;
//   title: string;
//   location_id: Types.ObjectId;
//   price: Types.Decimal128;
//   deposit: Types.Decimal128;
//   property_type: 'flat' | 'house' | 'plot' | 'commercial';
//   bhk_type?: '1BHK' | '2BHK' | '3BHK' | '4BHK' | '4BHK+' | null;
//   bathrooms: number;
//   size_sqft?: number | null;
//   images?: string[];
//   status?: 'available' | 'rented' | 'pending';
//   description?: string | null;
//   is_deleted?: boolean;
//   createdAt?: Date;
//   updatedAt?: Date;
// }
