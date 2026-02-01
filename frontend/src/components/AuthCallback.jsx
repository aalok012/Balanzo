import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const userParam = searchParams.get("user");
    const error = searchParams.get("error");

    if (error) {
      navigate(`/login?error=${error}`, { replace: true });
      return;
    }

    if (!token) {
      navigate("/login?error=no_token", { replace: true });
      return;
    }

    localStorage.setItem("token", token);
    if (userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        if (user?.fullname) localStorage.setItem("userFullname", user.fullname);
        if (user?.username) localStorage.setItem("username", user.username);
        if (user?.email) localStorage.setItem("userEmail", user.email);
      } catch (_) {
        // Ignore malformed user payload
      }
    }

    navigate("/Dashboard", { replace: true });
  }, [searchParams, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <p className="text-slate-300">Signing you in...</p>
    </div>
  );
}
