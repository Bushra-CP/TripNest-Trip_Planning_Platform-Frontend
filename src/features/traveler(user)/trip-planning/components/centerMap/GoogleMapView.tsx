import { useEffect } from "react";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  Polyline,
  useMap,
} from "@vis.gl/react-google-maps";

import { decode } from "@googlemaps/polyline-codec";

import type { RoutePlanningResult } from "../../interfaces/route.interfaces";

interface GoogleMapViewProps {
  isDarkMode: boolean;
  route: RoutePlanningResult | null;
}

interface MapViewportProps {
  route: RoutePlanningResult | null;
}

const MapViewport = ({ route }: MapViewportProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !route?.locations.length) {
      return;
    }

    const latitudes = route.locations.map((location) => location.latitude);

    const longitudes = route.locations.map((location) => location.longitude);

    const bounds = {
      north: Math.max(...latitudes),
      south: Math.min(...latitudes),
      east: Math.max(...longitudes),
      west: Math.min(...longitudes),
    };

    map.fitBounds(bounds);
  }, [map, route]);

  return null;
};

const GoogleMapView = ({ isDarkMode, route }: GoogleMapViewProps) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const firstLocation = route?.locations[0];

  const defaultCenter = firstLocation
    ? {
        lat: firstLocation.latitude,
        lng: firstLocation.longitude,
      }
    : {
        lat: 19.076,
        lng: 72.8777,
      };

  const routePath = route?.encodedPolyline
    ? decode(route.encodedPolyline).map(([latitude, longitude]) => ({
        lat: latitude,
        lng: longitude,
      }))
    : [];

  if (!apiKey) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
        <p className="text-sm font-semibold text-red-500">
          Google Maps API key is missing.
        </p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultCenter={defaultCenter}
        defaultZoom={7}
        mapId="DEMO_MAP_ID"
        gestureHandling="greedy"
        disableDefaultUI={true}
        className="absolute inset-0"
        colorScheme={isDarkMode ? "DARK" : "LIGHT"}
      >
        <MapViewport route={route} />

        {routePath.length > 0 && (
          <Polyline
            path={routePath}
            strokeColor="#2563EB"
            strokeOpacity={0.9}
            strokeWeight={5}
          />
        )}

        {route?.locations.map((location, index) => (
          <AdvancedMarker
            key={`${location.name}-${index}`}
            position={{
              lat: location.latitude,
              lng: location.longitude,
            }}
            title={location.name}
          />
        ))}
      </Map>
    </APIProvider>
  );
};

export default GoogleMapView;
