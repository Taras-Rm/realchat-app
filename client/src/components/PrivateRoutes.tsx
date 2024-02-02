import { useLogin } from "../hooks/useLogin";
import { Navigate, Outlet } from "react-router-dom";
import { routes } from "../pages/routes";

function PrivateRoutes() {
  const { getToken } = useLogin();
  
  const token = getToken();

  return token ? <Outlet /> : <Navigate to={routes.loginPage} />;
}

export default PrivateRoutes;
