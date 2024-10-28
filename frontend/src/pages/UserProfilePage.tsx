// UserProfilePage.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  updateUserThunk,
  fetchUsersByIdThunk,
} from "../store/slices/userSlice";
import { User } from "../types/User";

export const UserProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [formData, setFormData] = useState<User>({
    id: user?.id || 0,
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    role: user?.role || "",
  });
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUsersByIdThunk(user.id));
    }
  }, [dispatch, user?.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    try {
      await dispatch(updateUserThunk(formData)).unwrap();
      setSuccessMessage("Profile updated successfully!");
      setEditing(false);
    } catch (err: any) {
      setError(err.message || "Error updating profile.");
    }
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="user-profile-page">
      <h2>Your Profile</h2>
      {successMessage && <p className="success">{successMessage}</p>}
      {error && <p className="error">{error}</p>}

      <div className="profile-info">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={!editing}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={!editing}
        />

        <label>Role:</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          disabled
        />

        {editing ? (
          <button onClick={handleSubmit}>Save Changes</button>
        ) : (
          <button onClick={() => setEditing(true)}>Edit Profile</button>
        )}
      </div>
    </div>
  );
};
