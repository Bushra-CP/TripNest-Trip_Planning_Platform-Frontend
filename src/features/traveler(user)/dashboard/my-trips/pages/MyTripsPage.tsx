import React from "react";

import MyTripsHeader from "../components/MyTripsHeader";
import TripFilters from "../components/TripFilters";
import TripList from "../components/TripList";

import { useMyTrips } from "../hooks/useMyTrips";

const MyTripsPage: React.FC = () => {
  const {
    trips,
    filterType,
    setFilterType,
    searchQuery,
    setSearchQuery,
    viewState,
    handleSelectTrip,
    handleCreateNewTrip,
    handleResetFilter,
    handleRetry,
  } = useMyTrips();

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif] antialiased selection:bg-[#DCFCE7] selection:text-[#15803D]">
      <main className="flex-1 p-8 max-w-5xl w-full mx-auto space-y-6">
        <MyTripsHeader
          onCreateNewTrip={handleCreateNewTrip}
        />

        <TripFilters
          trips={trips}
          filterType={filterType}
          searchQuery={searchQuery}
          onFilterChange={setFilterType}
          onSearchChange={setSearchQuery}
        />

        <TripList
          trips={trips}
          viewState={viewState}
          searchQuery={searchQuery}
          onSelectTrip={handleSelectTrip}
          onResetFilter={handleResetFilter}
          onRetry={handleRetry}
          onCreateTrip={handleCreateNewTrip}
          onResetDemoData={() => {}}
        />
      </main>
    </div>
  );
};

export default MyTripsPage;