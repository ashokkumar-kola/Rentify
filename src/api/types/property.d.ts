import { Types } from 'mongoose';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

export interface Property {
    id?: string;
    landlord_id: string;
    title: string;
    location_id: string;
    price: Float;
    deposit: Float;
    property_type: 'flat' | 'house' | 'plot' | 'commercial';
    bhk_type?: '1BHK' | '2BHK' | '3BHK' | '4BHK' | '4BHK+' | null;
    bathrooms: number;
    size_sqft?: number | null;
    images?: string[];
    status?: 'available' | 'rented' | 'pending';
    description?: string | null;
    is_deleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
