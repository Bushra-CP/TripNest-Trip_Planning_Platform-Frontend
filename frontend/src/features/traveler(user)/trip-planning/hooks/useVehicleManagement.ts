import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  vehicleSchema,
  type VehicleFormValues,
} from "../validation/vehicle.schema";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import {
  createVehicleThunk,
  fetchVehiclesThunk,
} from "../redux/vehicle/vehicle.thunk";

const useVehicleManagement = () => {
  const dispatch = useDispatch<AppDispatch>();

  //Redux Vehicle State
  const vehicles = useSelector((state: RootState) => state.vehicle.vehicles);

  const loading = useSelector((state: RootState) => state.vehicle.loading);

  const error = useSelector((state: RootState) => state.vehicle.error);

  //Vehicle Modal State
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);

  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("");

  const openVehicleModal = () => {
    setIsVehicleModalOpen(true);
  };

  const closeVehicleModal = () => {
    setIsVehicleModalOpen(false);
  };

  const handleSelectVehicle = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
  };

  //Fetch Vehicles
  useEffect(() => {
    if (isVehicleModalOpen) {
      dispatch(fetchVehiclesThunk());
    }
  }, [isVehicleModalOpen, dispatch]);

  //Add Vehicle Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    mode: "all",

    defaultValues: {
      name: "",
      type: "CAR",
      fuelType: "PETROL",
      mileage: undefined,
      seatingCapacity: undefined,
      additionalDetails: "",
    },
  });

  const onAddVehicleSubmit = async (data: VehicleFormValues) => {
    try {
      await dispatch(createVehicleThunk(data)).unwrap();

      reset();
    } catch (error) {
      console.error("Failed to create vehicle:", error);
    }
  };

  return {
    // Modal
    isVehicleModalOpen,
    selectedVehicleId,
    openVehicleModal,
    closeVehicleModal,
    handleSelectVehicle,

    // Vehicles
    vehicles,
    loading,
    error,

    // Form
    register,
    handleSubmit,
    errors,
    onAddVehicleSubmit,
  };
};

export default useVehicleManagement;
