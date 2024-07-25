import React from "react";
import QRCode from "qrcode.react";
import "./QRModal.css";

const QRModal = ({ courseName, onClose }) => {
  return (
    <div className="qr-modal">
      <div className="qr-modal-content">
        <span className="qr-modal-close" onClick={onClose}>
          &times;
        </span>
        <QRCode value={`Course: ${courseName}`} size={256} />
        <p>Scan this code to mark your attendance for {courseName}</p>
      </div>
    </div>
  );
};

export default QRModal;
