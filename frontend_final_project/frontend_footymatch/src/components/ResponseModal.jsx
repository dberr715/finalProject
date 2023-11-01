import React from "react";

export default function ResponseModal({ rec, onClose }) {
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
        </div>
      </div>
    </div>
  );
}
