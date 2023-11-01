import React, { useState } from "react";

export default function ResponseModal({ rec, onClose, handleSearch }) {
  const [selectedTeam, setSelectedTeam] = useState("");

  const searchForTeam = () => {
    if (selectedTeam) {
      handleSearch(selectedTeam);
    }
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <p>{rec}</p>
          <input
            type="text"
            placeholder="Enter team here"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
          />
          <button onClick={searchForTeam}>Search</button>
        </div>
      </div>
    </div>
  );
}
