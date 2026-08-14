import { useState } from "react";
import { Car, CheckCircle2, Plus } from "lucide-react";

interface ThemeProps {
  surface: string;
  border: string;
  input: string;
  iconButton: string;
}

interface VehiclesTabProps {
  mobile?: boolean;
  isDarkMode: boolean;
  theme: ThemeProps;
}

interface Vehicle {
  id: string;
  name: string;
  mileage: string;
  fuelCost: string;
  description: string;
  image: string;
}

const vehicles: Vehicle[] = [
  {
    id: "rahul-sedan",
    name: "Rahul's Sedan",
    mileage: "18 km/l",
    fuelCost: "₹3,600",
    description: "Better mileage for long highway stretches.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600",
  },
  {
    id: "amit-suv",
    name: "Amit's SUV",
    mileage: "10 km/l",
    fuelCost: "₹6,480",
    description: "More legroom and luggage space.",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600",
  },
];

interface VehicleCardProps {
  vehicle: Vehicle;
  active: boolean;
  isDarkMode: boolean;
  onClick: () => void;
}

const VehicleCard = ({
  vehicle,
  active,
  isDarkMode,
  onClick,
}: VehicleCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full overflow-hidden rounded-2xl border text-left transition-all duration-300 ${
        active
          ? "border-[#10b981] shadow-lg shadow-[#10b981]/10"
          : isDarkMode
            ? "border-white/10 hover:border-white/20"
            : "border-slate-200 hover:border-slate-300"
      }`}
    >
      <div className="h-40 overflow-hidden">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className={`p-4 ${isDarkMode ? "bg-white/5" : "bg-white"}`}>
        <div className="flex items-center justify-between">
          <h4
            className={`font-bold ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            {vehicle.name}
          </h4>

          {active && <CheckCircle2 size={18} className="text-[#10b981]" />}
        </div>

        <div className="mt-2 flex gap-2">
          <span className="rounded-full bg-[#10b981]/10 px-2 py-1 text-xs font-bold text-[#10b981]">
            {vehicle.mileage}
          </span>

          <span className="rounded-full bg-[#3B82F6]/10 px-2 py-1 text-xs font-bold text-[#3B82F6]">
            {vehicle.fuelCost}
          </span>
        </div>

        <p
          className={`mt-3 text-sm ${
            isDarkMode ? "text-slate-400" : "text-slate-600"
          }`}
        >
          {vehicle.description}
        </p>
      </div>
    </button>
  );
};

const VehiclesTab = ({
  mobile = false,
  isDarkMode,
  theme,
}: VehiclesTabProps) => {
  const [selectedVehicle, setSelectedVehicle] = useState("Rahul's Sedan");

  return (
    <div className="flex h-full flex-col">
      <div
        className={`flex-1 overflow-y-auto hide-scrollbar p-6 space-y-8 ${
          mobile ? "max-h-[calc(80vh-180px)]" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <h3
            className={`text-xs font-black uppercase tracking-[0.2em] ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Vehicle Showdown
          </h3>

          <button className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#10b981]">
            <Plus size={14} />
            Add Vehicle
          </button>
        </div>

        <div className="space-y-4">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              active={selectedVehicle === vehicle.name}
              isDarkMode={isDarkMode}
              onClick={() => setSelectedVehicle(vehicle.name)}
            />
          ))}
        </div>

        <button className="w-full rounded-2xl bg-[#10b981] py-4 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-[#059669]">
          Vote for Selected
        </button>

        <div className="space-y-2 text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#10b981]">
            Split Cost: ₹900 / Person
          </p>
        </div>

        <div
          className={`rounded-2xl border p-4 ${
            isDarkMode
              ? "border-white/10 bg-white/5"
              : "border-slate-200 bg-slate-50"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#10b981]/10">
                <Car size={16} className="text-[#10b981]" />
              </div>

              <p
                className={`text-[10px] font-black uppercase tracking-widest ${
                  isDarkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Selected Vehicle
              </p>
            </div>

            <p
              className={`text-sm font-bold ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              {selectedVehicle}
            </p>
          </div>
        </div>
      </div>

      <div
        className={`border-t p-4 ${
          isDarkMode
            ? "border-white/5 bg-[#0b1326]/50"
            : "border-slate-200 bg-white"
        }`}
      >
        <div className={`rounded-[28px] border p-3 ${theme.input}`}>
          <input
            type="text"
            placeholder="Message group..."
            className={`w-full bg-transparent outline-none ${
              isDarkMode
                ? "text-white placeholder:text-slate-600"
                : "text-slate-900 placeholder:text-slate-400"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default VehiclesTab;
