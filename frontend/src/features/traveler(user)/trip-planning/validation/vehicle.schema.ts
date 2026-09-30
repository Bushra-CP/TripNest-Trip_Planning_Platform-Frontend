import z from "zod";

export const vehicleSchema = z.object({
  // Vehicle name
  name: z
    .string()
    .trim()
    .min(1, "Vehicle name is required")
    .min(2, "Vehicle name should be at least 2 characters")
    .max(50, "Vehicle name is too long"),

  // Vehicle type
  type: z.enum(
    ["CAR", "BIKE", "SUV", "BUS", "VAN", "TRAVELLER", "TAXI", "AUTO", "OTHER"],
    {
      message: "Please select a valid vehicle type",
    },
  ),

  // Fuel type
  fuelType: z.enum(["PETROL", "DIESEL", "ELECTRIC", "CNG", "OTHER"], {
    message: "Please select a valid fuel type",
  }),

  // Mileage
  mileage: z
    .number({
      message: "Mileage is required",
    })
    .positive("Mileage must be greater than 0")
    .max(150, "Please enter a valid mileage"),

  // Seating capacity
  seatingCapacity: z
    .number({
      message: "Seating capacity is required",
    })
    .int("Seating capacity must be a whole number")
    .min(1, "Seating capacity must be at least 1")
    .max(50, "Seating capacity cannot exceed 50"),

  // Optional details
  additionalDetails: z
    .string()
    .trim()
    .max(300, "Additional details cannot exceed 300 characters")
    .optional()
    .or(z.literal("")),
});

export type VehicleFormValues = z.infer<typeof vehicleSchema>;
