import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import EmergencyCard from "./EmergencyCard";

const EmergencyList = () => {
  const [emergencyReports, setEmergencyReports] = useState([]);

  useEffect(() => {
    // Fetch initial emergency reports
    fetchEmergencyReports();
  }, []);
  const fetchEmergencyReports = async () => {
    try {
      const token = localStorage.getItem("token");

      // Set headers with the token
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Fetch initial emergency reports using API with token in headers
      const response = await fetch(
        "http://localhost:3000/api/emergency/reports",
        {
          headers: headers,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch emergency reports");
      }

      const data = await response.json();
      setEmergencyReports(data.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const filteredReports = emergencyReports.filter(
    (report) => report.status !== "resolved"
  );

  const resolvedReports = emergencyReports.filter(
    (report) => report.status === "resolved"
  );
  // Filter reports whose time is greater than 1 day
  const greaterThanOneDayReports = emergencyReports.filter((report) => {
    const currentTime = new Date();
    const reportTime = new Date(report.timestamp);
    const oneDayInMs = 24 * 60 * 60 * 1000; // 1 day in milliseconds
    const timeDifference = currentTime - reportTime;
    return timeDifference > oneDayInMs;
  });

  // Sort the filtered reports by timestamp in descending order
  filteredReports.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div className="w-2/3 m-auto">
      {filteredReports.length > 0 && (
        <>
          <h1 className="text-2xl font-bold text-center m-10 mb-4">
            Recent Emergency Reports
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReports.reverse().map((report) => (
              <EmergencyCard key={report._id} emergency={report} />
            ))}
          </div>
        </>
      )}

      {resolvedReports.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Resolved Reports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resolvedReports.map((report) => (
              <EmergencyCard key={report._id} emergency={report} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyList;
