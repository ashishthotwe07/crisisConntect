import React, { useState } from "react";
import { toast } from "react-toastify";

const EmergencyReportForm = () => {
  const [formData, setFormData] = useState({
    type: "",
    address: "",
    details: "",
    phone: "",
    latitude: null,
    longitude: null,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/emergency/report",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create emergency report");
      }

      setFormData({
        type: "",
        address: "",
        details: "",
        phone: "",
        latitude: null,
        longitude: null,
      });

      toast.success("Emergency Reported Successfully");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="type"
            className="block text-sm font-semibold text-gray-600"
          >
            Emergency Type
          </label>
          <select
            id="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 text-sm text-gray-800 placeholder-gray-400 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            required
          >
            <option value="">Select Emergency Type</option>
            <option value="Health">Health</option>
            <option value="AnimalAttack">Animal Attack</option>
            <option value="Accident">Accident</option>
            <option value="Robbery">Robbery</option>
            <option value="CybersecurityIncident">
              Cybersecurity Incident
            </option>
            <option value="PublicSafetyThreat">Public Safety Threat</option>
            <option value="Crime">Crime</option>
            <option value="GasLeak">Gas Leak</option>
            <option value="Fire">Fire</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-semibold text-gray-600"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 text-sm text-gray-800 placeholder-gray-400 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder="Enter the address"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="details"
            className="block text-sm font-semibold text-gray-600"
          >
            Details
          </label>
          <textarea
            id="details"
            value={formData.details}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-4 py-2 mt-2 text-sm text-gray-800 placeholder-gray-400 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder="Enter details about the emergency"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-gray-600"
          >
            Contact Information
          </label>
          <input
            type="text"
            id="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 text-sm text-gray-800 placeholder-gray-400 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder="Enter contact information"
            required
          />
        </div>
        <div className="mb-4">
          <button
            type="button"
            onClick={handleLocationClick}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Get Current Location
          </button>
          {formData.latitude && formData.longitude && (
            <p className="text-sm text-gray-600 mt-2">
              Latitude: {formData.latitude}, Longitude: {formData.longitude}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmergencyReportForm;
