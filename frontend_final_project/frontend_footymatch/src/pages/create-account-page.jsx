import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CreateAccount() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirm_password: "",
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showPasswordMismatchAlert, setShowPasswordMismatchAlert] =
    useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setShowPasswordMismatchAlert(true);
      return;
    }

    try {
      const response = await fetch(
        "https://footymatch1.onrender.com/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 201) {
        setShowSuccessAlert(true);
        setTimeout(() => {
          setShowSuccessAlert(false);
          navigate("/login");
        }, 3200);
      } else if (response.status === 400) {
        setShowErrorAlert(true);
      } else {
        console.error("Registration failed.");
      }
    } catch (error) {
      console.error("Registration failed.", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSuccessAlertClose = () => {
    setShowSuccessAlert(false);
  };

  const handleErrorAlertClose = () => {
    setShowErrorAlert(false);
  };

  const handlePasswordMismatchAlertClose = () => {
    setShowPasswordMismatchAlert(false);
  };

  return (
    <div className="registration form card1">
      <img src="../newfootymatch.png" alt="FootyMatch" className="footy" />
      <header>Sign Up</header>
      <form className="create-account" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a username"
          name="username"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Create a password"
          name="password"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Confirm your password"
          name="confirm_password"
          onChange={handleChange}
        />
        <input type="submit" className="prev-next-button " value="Sign Up" />
      </form>
      <div className="signup">
        <span className="signup">Already have an account?</span>
        <div className="signup">
          <Link to="/login">
            <span className="login1">Login</span>
          </Link>
        </div>
      </div>
      {showSuccessAlert && (
        <div className="modal-create success">
          <div className="modal-content-create">
            <h4>Account creation success!👏</h4>
            <p>Please log in with your credentials🔓</p>
          </div>
        </div>
      )}
      {showErrorAlert && (
        <div className="modal error">
          <div className="modal-content">
            <p>Username is already taken. Try a different option.</p>
            <span className="close-button" onClick={handleErrorAlertClose}>
              &times;
            </span>
          </div>
        </div>
      )}
      {showPasswordMismatchAlert && (
        <div className="modal error">
          <div className="modal-content">
            <p>Passwords do not match.</p>
            <span
              className="close-button"
              onClick={handlePasswordMismatchAlertClose}
            >
              &times;
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
