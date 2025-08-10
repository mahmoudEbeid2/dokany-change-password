import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./ChangePassword.module.css";
import { z } from "zod";
import { toast } from "react-toastify";
import axios from "axios";

const API_URL = "https://dokany-api-production.up.railway.app";

const changePasswordSchema = z
  .object({
    newPassword: z.string()
      .min(8, "Password must be at least 8 characters long")
      .max(50, "Password cannot exceed 50 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one digit")
      .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character (e.g., !@#$%^&*)"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const ChangePassword = () => {
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();

  const role = queryParams.get("role");
  const token = queryParams.get("token");

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }

    if (apiError) {
      setApiError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setApiError(null);

    const result = changePasswordSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${API_URL}/auth/${role}/reset-password/confirm`, {
        token,
        newPassword: formData.newPassword,
      });

      navigate("/success");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
      setApiError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const errorStyle = {
    color: "red",
    fontSize: "0.8rem",
    marginBottom: "0.5rem",
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authFormSection}>
        <div className={styles.formWrapper}>
          <h2>Change Password</h2>
          <p
            style={{
              textAlign: "center",
              color: "#6c7275",
              marginBottom: "2rem",
            }}
          >
            Enter your new password below.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            {apiError && (
              <p style={{ ...errorStyle, textAlign: "center", fontSize: "1rem", marginBottom: "1rem" }}>
                {apiError}
              </p>
            )}

            <div className={styles.inputGroup}>
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
              />
              {errors.newPassword && <p style={errorStyle}>{errors.newPassword[0]}</p>}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <p style={errorStyle}>{errors.confirmPassword[0]}</p>}
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "Updating..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;


