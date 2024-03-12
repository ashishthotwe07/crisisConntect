import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";

const Map = ({ latitude, longitude }) => {
  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1IjoiYXNoaXNodGhvdHdlMDciLCJhIjoiY2x0bWs5MXJmMWtlcTJrbno1dmU0bnNiMCJ9.pbI2gY9jr341uKhzDaejag";
    const map = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude],
      zoom: 17,
    });

    // Add a marker
    new mapboxgl.Marker({ color: "red" })
      .setLngLat([longitude, latitude])
      .addTo(map);

    // Clean up map instance
    return () => map.remove();
  }, [latitude, longitude]); 

  return (
    <div
      id="map-container"
      style={{ margin: "auto", width: "300px", height: "300px" }}
    />
  );
};

export default Map;
