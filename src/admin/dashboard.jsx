import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [pendingListings, setPendingListings] = useState([]);
  const [heavyVehiclePendingListings, setHeavyVehiclePendingListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin");
  };

  // Fetch pending listings from backend
  useEffect(() => {
    fetchPendingListings();
    fetchHeavyVehiclePendingListings();
  }, []);

  const fetchPendingListings = async () => {
    try {
      const response = await fetch('http://localhost:5000/listings/pending');
      if (response.ok) {
        const data = await response.json();
        // Only keep title and seller for light vehicle pending listings as per user request
        const filteredData = data.map(({ id, title, seller }) => ({ id, title, seller }));
        setPendingListings(filteredData);
      } else {
        console.error('Failed to fetch pending listings');
      }
    } catch (error) {
      console.error('Error fetching pending listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHeavyVehiclePendingListings = async () => {
    try {
      const response = await fetch('http://localhost:5000/heavyvehicle/listings/pending');
      if (response.ok) {
        const data = await response.json();
        setHeavyVehiclePendingListings(data);
      } else {
        console.error('Failed to fetch heavy vehicle pending listings');
      }
    } catch (error) {
      console.error('Error fetching heavy vehicle pending listings:', error);
    }
  };

  // Approve listing
  const handleApprove = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/listings/${id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        alert(`Listing ${id} approved ✅`);
        setPendingListings(pendingListings.filter((listing) => listing.id !== id));
      } else {
        alert('Failed to approve listing');
      }
    } catch (error) {
      console.error('Error approving listing:', error);
      alert('Error approving listing');
    }
  };

  // Reject listing
  const handleReject = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/listings/${id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        alert(`Listing ${id} rejected ❌`);
        setPendingListings(pendingListings.filter((listing) => listing.id !== id));
      } else {
        alert('Failed to reject listing');
      }
    } catch (error) {
      console.error('Error rejecting listing:', error);
      alert('Error rejecting listing');
    }
  };

  // Approve heavy vehicle listing
  const handleHeavyVehicleApprove = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/heavyvehicle/listings/${id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        alert(`Heavy vehicle listing ${id} approved ✅`);
        setHeavyVehiclePendingListings(heavyVehiclePendingListings.filter((listing) => listing.id !== id));
      } else {
        alert('Failed to approve heavy vehicle listing');
      }
    } catch (error) {
      console.error('Error approving heavy vehicle listing:', error);
      alert('Error approving heavy vehicle listing');
    }
  };

  // Reject heavy vehicle listing
  const handleHeavyVehicleReject = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/heavyvehicle/listings/${id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        alert(`Heavy vehicle listing ${id} rejected ❌`);
        setHeavyVehiclePendingListings(heavyVehiclePendingListings.filter((listing) => listing.id !== id));
      } else {
        alert('Failed to reject heavy vehicle listing');
      }
    } catch (error) {
      console.error('Error rejecting heavy vehicle listing:', error);
      alert('Error rejecting heavy vehicle listing');
    }
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
                    onClick={() => handleApprove(listing.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(listing.id)}
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

      {/* Heavy Vehicle Listing Approval Section */}
      <div className="bg-white shadow rounded-lg p-5 mb-6">
        <h2 className="text-lg font-semibold mb-4">Heavy Vehicle Listing Approval Section</h2>

        {heavyVehiclePendingListings.length === 0 ? (
          <p className="text-gray-500">No pending heavy vehicle listings 🎉</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {heavyVehiclePendingListings.map((listing) => (
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
                    onClick={() => handleHeavyVehicleApprove(listing.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleHeavyVehicleReject(listing.id)}
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
