import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userFullname");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("username");
    localStorage.removeItem("userFullname");
    navigate("/login", { replace: true });
  }, [navigate]);

  return null;
}
