import React from "react";

const MyReports = () => {
  // Customize list items with your app's specific data
  const listItems = [
    {
      title: "Report 1",
      description: "Details of Report 1",
      status: "Approved",
    },
    {
      title: "Report 2",
      description: "Details of Report 2",
      status: "Pending",
    },
    {
      title: "Report 3",
      description: "Details of Report 3",
      status: "Rejected",
    },
  ];

  return (
    <div className="container mx-auto mt-8">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {listItems.map((item, index) => (
          <ListItem key={index} {...item} />
        ))}
      </ul>
    </div>
  );
};

const ListItem = ({ title, description, status }) => {
  return (
    <li className="border border-gray-200 rounded-md shadow-md">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
        <p className="mt-2 text-sm font-medium">
          Status:{" "}
          <span
            className={`text-${
              status === "Approved"
                ? "green"
                : status === "Pending"
                ? "yellow"
                : "red"
            }-600`}
          >
            {status}
          </span>
        </p>
        <a
          href="#"
          className="block mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
         Mark As Resolved
        </a>
      </div>
    </li>
  );
};

export default MyReports;
