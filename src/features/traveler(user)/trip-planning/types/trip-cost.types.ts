import type { FuelType } from "./vehicle.types";

export type TripCostStatus = "AVAILABLE" | "UNAVAILABLE";

export interface TripVehicleCost {
  tripVehicleId: string;
  vehicleId: string;
  vehicleName: string;
  fuelType: FuelType;
  fuelEfficiency: number;
  distanceKm: number;
  requiredEnergy: number | null;
  energyPrice: number | null;
  estimatedCost: number | null;
  priceUnit: string | null;
  priceLocation: string | null;
  pricingSource: string | null;
  costStatus: TripCostStatus;
}

export interface TripCostResponse {
  tripId: string;
  distanceKm: number;
  vehicles: TripVehicleCost[];
}
