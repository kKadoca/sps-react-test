import { createBrowserRouter, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/users",
    element: (
      <ProtectedRoute>
        <UsersPage />
      </ProtectedRoute>
    ),
  },
]);

export default router;
