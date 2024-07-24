import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import User from "../../models/User";

export default function LandingPage() {
  const { state } = useLocation();
  const [user] = useState<User>(state?.user);

  return user ? (
    <div> Landing page is under construction</div>
  ) : (
    <Navigate to="/register" />
  );
}
