export type VehicleType =
  | "CAR"
  | "BIKE"
  | "SUV"
  | "BUS"
  | "VAN"
  | "TRAVELLER"
  | "TAXI"
  | "AUTO"
  | "OTHER";

export type FuelType = "PETROL" | "DIESEL" | "ELECTRIC" | "CNG" | "OTHER";

export interface CreateVehicleData {
  name: string;
  type: VehicleType;
  fuelType: FuelType;
  fuelEfficiency: number;
  seatingCapacity: number;
  additionalDetails?: string;
}

export interface UpdateVehicleData {
  name?: string;
  type?: VehicleType;
  fuelType?: FuelType;
  fuelEfficiency?: number;
  seatingCapacity?: number;
  additionalDetails?: string;
}

export interface VehicleResponse {
  _id: string;
  ownerId: string;
  name: string;
  type: VehicleType;
  fuelType: FuelType;
  fuelEfficiency: number;
  seatingCapacity: number;
  additionalDetails?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleApiResponse {
  success: boolean;
  message: string;
  data: VehicleResponse;
}

export interface VehiclesApiResponse {
  success: boolean;
  message: string;
  data: VehicleResponse[];
}
