import React, { createContext, useState } from "react"; 

export const ContactContext = createContext();

const ContactProvider = ({ children }) => {
  const [numeroProductos, setNumeroProductos] = useState(0);
  const [productosMaximo, setProductosMaximo] = useState(25);

  
  return (
    <ContactContext.Provider value={{ numeroProductos, setNumeroProductos, productosMaximo, setProductosMaximo } }>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactProvider;
