import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Logout() {
  // TODO import user session store, extract logout function
  const navigate = useNavigate();

  useEffect(() => {
    // TODO run logout function to clear session token
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('username');
    navigate("/login");
  }, [navigate]);

  return null;
}