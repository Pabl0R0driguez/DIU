import { useState } from 'react'
import './App.css'
import ButtonComponent from './components/ButtonComponent'
import HeaderComponent from './components/HeaderComponent'
import Login from './components/Login';

function App() {
  const [number, setNumber] = useState(0);
  const [myValue, setMyValue] = useState("");
  let myPlaceHolder = "Escribe aquí";

  const [greetings, setGreetings] = useState("Bienvenidos a mi web");

  const links = {
    home: "Home",
    blog: "Blog",
    news: "News",
    contact: "Contact Us"
  };

  const [user, setUser] = useState({});
  const login = (userInfo) => {
    console.log(userInfo);
    setUser(userInfo);
  };

  const addOne = () => {
    setNumber(number + 1);
    console.log(number);
  };

  const sayHello = () => {
    console.log("Hello");
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setMyValue(event.target.value); // Asegúrate de actualizar el estado para que el input sea controlado
  };

  return (
    <>
      <HeaderComponent greetings={greetings} links={links}></HeaderComponent>

      <main className='mian-content'>
        <h2 onClick={sayHello}>Hola {user.userName}</h2>

        <Login handleLogin={login}></Login>

        <h2 onClick={addOne}>Number: {number}</h2>

        <input value={myValue} placeholder={myPlaceHolder} type='text' onChange={handleChange}></input>
        <br />
        <br />
        <ButtonComponent></ButtonComponent>
      </main>
    </>
  )
}

export default App;
