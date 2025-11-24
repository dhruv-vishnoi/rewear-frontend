import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SwapRequests() {
  const [requests, setRequests] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;
  
    axios
      .get(`http://rewear-backend-a1uz.onrender.com/api/swaps/${user._id}`)
      .then((res) => setRequests(res.data))
      .catch((err) => console.log(err));
  }, [user]); // add user here
  

  const handleAccept = async (id) => {
    await axios.post(`http://rewear-backend-a1uz.onrender.com/api/swaps/accept/${id}`);
    alert("Swap Accepted!");
    window.location.reload();
  };

  const handleReject = async (id) => {
    await axios.post(`http://rewear-backend-a1uz.onrender.com/api/swaps/reject/${id}`);
    alert("Swap Rejected!");
    window.location.reload();
  };

  return (
    <div className="swap-requests-page">
      <h2>Swap Requests</h2>

      {requests.length === 0 ? (
        <p>No swap requests yet.</p>
      ) : (
        requests.map((r) => (
          <div key={r._id} className="swap-request-card">
            <p><strong>From:</strong> {r.requestedByName}</p>
            <p><strong>Their Product:</strong> {r.offeredProductTitle}</p>
            <p><strong>Wants Your Product:</strong> {r.productWantedTitle}</p>
            <p><strong>Status:</strong> {r.status}</p>

            {r.status === "pending" && (
              <div>
                <button onClick={() => handleAccept(r._id)}>Accept</button>
                <button onClick={() => handleReject(r._id)}>Reject</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
