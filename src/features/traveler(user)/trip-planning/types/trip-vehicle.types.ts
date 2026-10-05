import type { FuelType, VehicleType } from "./vehicle.types";

export interface TripVehicleResponse {
  _id: string;
  tripId: string;

  vehicle: {
    _id: string;
    ownerId: string;
    name: string;
    type: VehicleType;
    fuelType: FuelType;
    fuelEfficiency: number;
    seatingCapacity: number;
    additionalDetails?: string;
  };

  addedBy: string;
  voters: string[];
  finalSelected: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface TripVehicleApiResponse {
  success: boolean;
  message: string;
  data: TripVehicleResponse;
}

export interface FinalTripVehicleApiResponse {
  success: boolean;
  message: string;
  data: TripVehicleResponse | null;
}

export interface TripVehiclesApiResponse {
  success: boolean;
  message: string;
  data: TripVehicleResponse[];
}

export interface TripVehicleRawResponse {
  _id: string;
  tripId: string;
  vehicleId: string;
  addedBy: string;
  voters: string[];
  finalSelected: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RemoveVehicleApiResponse {
  success: boolean;
  message: string;
  data: TripVehicleRawResponse;
}

export interface AddVehicleToTripPayload {
  tripId: string;
  vehicleId: string;
}

export interface RemoveVehicleFromTripPayload {
  tripId: string;
  vehicleId: string;
}

export interface VoteForVehiclePayload {
  tripId: string;
  tripVehicleId: string;
}

export interface RemoveVotePayload {
  tripId: string;
  tripVehicleId: string;
}

export interface FinalizeVehiclePayload {
  tripId: string;
  tripVehicleId: string;
}

export interface UnfinalizeVehiclePayload {
  tripId: string;
  tripVehicleId: string;
}
