import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin");
  };

  // ✅ State for pending listings
  const [pendingListings, setPendingListings] = useState([
    { id: 1, title: "Toyota Corolla 2020", seller: "Seller A" },
    { id: 2, title: "Honda Civic 2019", seller: "Seller B" },
    { id: 3, title: "Suzuki Alto 2021", seller: "Seller C" },
    { id: 4, title: "Kia Sportage 2022", seller: "Seller D" },
  ]);

  // ✅ Approve & Reject handlers
  const handleAction = (id, action) => {
    alert(`Listing ${id} ${action} ✅`);
    setPendingListings(pendingListings.filter((listing) => listing.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-lg font-semibold">Total Listings</h2>
          <p className="text-2xl font-bold text-blue-600">120</p>
        </div>
        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-lg font-semibold">Total Sellers</h2>
          <p className="text-2xl font-bold text-green-600">45</p>
        </div>
        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-lg font-semibold">Package Subscribers</h2>
          <p className="text-2xl font-bold text-purple-600">15</p>
        </div>
      </div>

      {/* More Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-lg font-semibold">Last Month Listings</h2>
          <p className="text-2xl font-bold text-orange-600">30</p>
        </div>
        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-lg font-semibold">Last Month Sales</h2>
          <p className="text-2xl font-bold text-pink-600">12</p>
        </div>
        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-lg font-semibold">Pending Listing Requests</h2>
          <p className="text-2xl font-bold text-red-600">
            {pendingListings.length}
          </p>
        </div>
      </div>

      {/* Listing Approval Section */}
      <div className="bg-white shadow rounded-lg p-5 mb-6">
        <h2 className="text-lg font-semibold mb-4">Listing Approval Section</h2>

        {pendingListings.length === 0 ? (
          <p className="text-gray-500">No pending listings 🎉</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-gray-50 border rounded-lg p-4 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {listing.title}
                  </h3>
                  <p className="text-gray-600">Seller: {listing.seller}</p>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleAction(listing.id, "Approved")}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(listing.id, "Rejected")}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add News / Blog Section */}
      <div className="bg-white shadow rounded-lg p-5">
        <h2 className="text-lg font-semibold mb-3">Add News / Blog</h2>
        <textarea
          placeholder="Write your update..."
          className="w-full border rounded p-2 mb-3"
          rows="4"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Post
        </button>
      </div>
    </div>
  );
}
