import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import LoginPage from "./LoginPage/LoginPage";
import ChatPage from "./ChatPage/ChatPage";

function Root() {
  return (
    <Routes>
      <Route path={routes.loginPage} element={<LoginPage />} />
      <Route path={routes.chatPage} element={<ChatPage />} />
    </Routes>
  );
}

export default Root;
