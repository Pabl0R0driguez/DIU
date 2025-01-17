import React, { useContext } from "react";
import { Router } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import UserProvider from "../providers/UserProvider";
import ProfilePage from "./ProfilePage";
import { UserContext } from "../providers/UserProvider";
import PasswordReset from "./PasswordReset";
function Application() {
  const user = useContext(UserContext);

  // Renderizado condicional 
  // Si el usuario está identificado se muestra ProfilePage
  // Sino tiene que registrarse
  return (
        user ?
        <ProfilePage />
      :
      /* usamos path para llamar a signUp de la claese SignUp */
        <Router>
          <SignUp path="signUp" />
          <SignIn path="/" />
          <PasswordReset path = "passwordReset" />
        </Router>
      
  );
}

export default Application;
