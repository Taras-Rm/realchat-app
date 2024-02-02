import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import LoginPage from "./LoginPage/LoginPage";
import ChatPage from "./ChatPage/ChatPage";
import PrivateRoutes from "../components/PrivateRoutes";

function Root() {
  return (
    <Routes>
      <Route path={routes.loginPage} element={<LoginPage />} />
      <Route element={<PrivateRoutes />}>
        <Route path={routes.chatPage} element={<ChatPage />} />
      </Route>
    </Routes>
  );
}

export default Root;
