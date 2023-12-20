import { Navigate } from "react-router-dom";
export default function PrivateRoute({ children }) {
  const token = sessionStorage.getItem("admin");
  if (!token) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
