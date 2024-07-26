import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import User from "../../models/User";

export default function LandingPage() {
  const { state } = useLocation();
  const [user] = useState<User>(state?.user);

  return user ? (
    <Layout>
      <div>Hello {user.email.split("@")[0]}</div>
    </Layout>
  ) : (
    <Navigate to="/register" />
  );
}
