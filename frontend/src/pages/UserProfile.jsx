// pages/UserProfile.jsx
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const [isEditing, setIsEditing] = useState(false);
  const [edited, setEdited] = useState({ ...user });
  const [imagePreview, setImagePreview] = useState(null);

  if (!user) return <Navigate to="/login" />;

  const gradientCard = {
    background: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
    borderRadius: "20px",
    padding: "30px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
    color: "#333",
    width: "100%",
    maxWidth: "600px",
  };

  const avatarStyle = {
    border: "4px solid white",
    borderRadius: "50%",
    width: "120px",
    height: "120px",
    objectFit: "cover",
    marginBottom: "15px",
  };

  const badgeStyle = {
    backgroundColor: user.role === "organizer" ? "#007bff" : "#6c757d",
    color: "#fff",
    borderRadius: "10px",
    padding: "5px 12px",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: "0.8rem",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdited({ ...edited, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setEdited({ ...edited, image_url: URL.createObjectURL(file) });
    }
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(edited));
    setUser(edited);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #e0eafc, #cfdef3)",
        padding: "20px",
      }}
    >
      <div style={gradientCard} className="text-center">
        <img
          src={
            imagePreview ||
            user.image_url ||
            "https://i.pravatar.cc/150?u=userprofile"
          }
          alt="Avatar"
          style={avatarStyle}
        />

        {!isEditing ? (
          <>
            <h3>{user.name || "No Name"}</h3>
            <p className="text-muted mb-2">{user.email}</p>
            <div className="mb-3">
              <span style={badgeStyle}>{user.role}</span>
            </div>
            <div
              className="text-start bg-white rounded p-3 mb-3 shadow-sm"
              style={{ fontSize: "0.9rem" }}
            >
              <p>
                <strong>🆔 ID:</strong> {user.id}
              </p>
              <p>
                <strong>📬 Email:</strong> {user.email}
              </p>
              <p>
                <strong>🎫 Role:</strong> {user.role}
              </p>
            </div>

            <button
              className="btn btn-warning me-2"
              onClick={() => setIsEditing(true)}
            >
              ✏️ Edit Profile
            </button>
            <button className="btn btn-danger" onClick={handleLogout}>
              🔒 Logout
            </button>
          </>
        ) : (
          <>
            <input
              type="file"
              className="form-control mb-3"
              onChange={handleImageUpload}
            />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="form-control mb-2"
              value={edited.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control mb-2"
              value={edited.email}
              onChange={handleChange}
            />
            <button className="btn btn-success me-2" onClick={handleSave}>
              💾 Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              ❌ Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
