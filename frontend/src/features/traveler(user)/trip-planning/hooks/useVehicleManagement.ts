import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  vehicleSchema,
  type VehicleFormValues,
} from "../validation/vehicle.schema";

import type { AppDispatch, RootState } from "@/app/store";

import {
  createVehicleThunk,
  fetchVehiclesThunk,
  updateVehicleThunk,
  deleteVehicleThunk,
} from "../redux/vehicle/vehicle.thunk";

import { selectUser } from "../../auth/redux/authSelectors";

import type { VehicleResponse } from "../types/vehicle.types";

interface UseVehicleManagementProps {
  onSelectVehicle?: (vehicleId: string) => void | Promise<void>;

  onClose?: () => void;
}

const useVehicleManagement = ({
  onSelectVehicle,
  onClose,
}: UseVehicleManagementProps = {}) => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const user = useSelector(selectUser);

  // REDUX STATE
  const vehicles = useSelector((state: RootState) => state.vehicle.vehicles);

  const loading = useSelector((state: RootState) => state.vehicle.loading);

  const error = useSelector((state: RootState) => state.vehicle.error);

  // VEHICLE MANAGEMENT MODAL
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);

  // SELECTED VEHICLE
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("");

  // EDIT VEHICLE
  const [editingVehicle, setEditingVehicle] = useState<VehicleResponse | null>(
    null,
  );

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [vehicleToDelete, setVehicleToDelete] = useState<string | null>(null);

  // ADD VEHICLE FORM
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    mode: "all",

    defaultValues: {
      name: "",
      type: "CAR",
      fuelType: "PETROL",
      fuelEfficiency: undefined,
      seatingCapacity: undefined,
      additionalDetails: "",
    },
  });

  // SELECTED VEHICLE OBJECT
  const selectedVehicle = vehicles.find(
    (vehicle) => vehicle._id === selectedVehicleId,
  );

  // OPEN VEHICLE MANAGEMENT MODAL
  const openVehicleModal = () => {
    if (!user) {
      toast.error("Please login to add vehicle!");
      navigate("/login");
      return;
    }

    setIsVehicleModalOpen(true);
  };

  // CLOSE VEHICLE MANAGEMENT MODAL
  const closeVehicleModal = () => {
    setIsVehicleModalOpen(false);
  };

  // SELECT VEHICLE
  const handleSelectVehicle = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
  };

  // FETCH VEHICLES
  useEffect(() => {
    if (!isVehicleModalOpen) {
      return;
    }

    dispatch(fetchVehiclesThunk());
  }, [isVehicleModalOpen, dispatch]);

  // ADD VEHICLE
  const onAddVehicleSubmit = async (data: VehicleFormValues) => {
    try {
      await dispatch(createVehicleThunk(data)).unwrap();

      reset();

      toast.success("Vehicle added successfully");
    } catch (error) {
      console.error("Failed to create vehicle:", error);

      toast.error(
        error instanceof Error ? error.message : "Failed to add vehicle",
      );
    }
  };

  // OPEN EDIT VEHICLE MODAL
  const handleEditVehicle = (vehicle: VehicleResponse) => {
    setEditingVehicle(vehicle);
    setIsEditModalOpen(true);
  };

  // CLOSE EDIT VEHICLE MODAL
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingVehicle(null);
  };

  // UPDATE VEHICLE
  const handleUpdateVehicle = async (
    vehicleId: string,
    data: VehicleFormValues,
  ) => {
    try {
      await dispatch(
        updateVehicleThunk({
          vehicleId,
          vehicleData: data,
        }),
      ).unwrap();

      toast.success("Vehicle updated successfully");

      handleCloseEditModal();
    } catch (error) {
      console.error("Failed to update vehicle:", error);

      toast.error(
        error instanceof Error ? error.message : "Failed to update vehicle",
      );

      throw error;
    }
  };

  // DELETE VEHICLE
  const handleDeleteVehicle = (vehicleId: string) => {
    setVehicleToDelete(vehicleId);
  };

  const confirmDeleteVehicle = async () => {
    if (!vehicleToDelete) return;

    try {
      await dispatch(deleteVehicleThunk(vehicleToDelete)).unwrap();

      if (selectedVehicleId === vehicleToDelete) {
        setSelectedVehicleId("");
      }

      toast.success("Vehicle deleted successfully");

      setVehicleToDelete(null);
    } catch (error) {
      console.error("Failed to delete vehicle:", error);

      toast.error(
        error instanceof Error ? error.message : "Failed to delete vehicle",
      );
    }
  };

  const cancelDeleteVehicle = () => {
    setVehicleToDelete(null);
  };

  // CONFIRM SELECTED VEHICLE
  const handleConfirm = async () => {
    if (!selectedVehicle) {
      return;
    }

    try {
      await onSelectVehicle?.(selectedVehicle._id);

      onClose?.();
    } catch (error) {
      console.error("Failed to select vehicle:", error);

      throw error;
    }
  };

  // RETURN
  return {
    // Vehicle management modal
    isVehicleModalOpen,
    openVehicleModal,
    closeVehicleModal,

    // Vehicles
    vehicles,
    loading,
    error,

    // Selection
    selectedVehicleId,
    selectedVehicle,
    handleSelectVehicle,
    handleConfirm,

    // Add form
    register,
    handleSubmit,
    watch,
    errors,
    onAddVehicleSubmit,

    // Edit
    editingVehicle,
    isEditModalOpen,
    handleEditVehicle,
    handleCloseEditModal,
    handleUpdateVehicle,

    // Delete
    handleDeleteVehicle,
    vehicleToDelete,
    confirmDeleteVehicle,
    cancelDeleteVehicle,
  };
};

export default useVehicleManagement;
