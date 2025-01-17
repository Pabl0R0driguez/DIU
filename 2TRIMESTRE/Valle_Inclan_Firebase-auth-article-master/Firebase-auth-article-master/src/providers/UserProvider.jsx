import React, { Component, createContext } from "react";
import { auth, generateUserDocument } from "../firebase";

// Manejar el contexto
export const UserContext = createContext({ user: null });

// Inicializamos el usuario a null
class UserProvider extends Component {
  state = {
    user: null
  };

  
  // Función asincrona que no bloquerá la aplicación
  // Nos devuelve el usuario que se haya logueado
  componentDidMount = async () => {
    auth.onAuthStateChanged(async userAuth => {
      const user = await generateUserDocument(userAuth);
      this.setState({ user });
    });


  };

  render() {
    const { user } = this.state;

    return (
      <UserContext.Provider value={user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
