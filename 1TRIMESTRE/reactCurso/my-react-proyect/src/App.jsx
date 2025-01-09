import { useEffect, useState } from 'react'
import './App.css'
import ButtonComponent from './components/ButtonComponent'
import HeaderComponent from './components/HeaderComponent'
import Login from './components/Login';
import MovieList from './components/MovieList';
import Jugadores from './components/Jugadores';

function App() {

  // Encabezado
  const [greetings, setGreetings] = useState("Bienvenidos a mi web");

  const links = {
    home: "Home",
    blog: "Blog",
    news: "News",
    contact: "Contact Us"
  };

  // Login
  const [user, setUser] = useState({});
  const login = (userInfo) => {
    console.log(userInfo);
    setUser(userInfo);
  };

  // Películas
  const [showMovies,setShowMovies] = useState(true);


  //const [number, setNumber] = useState(0);

  // const sayHello = () => {
  //   console.log("Hello");
  // };

  // const addOne = () => {
  //   setNumber(number + 1);
  //   console.log(number);
  // };

  // const handleChange = (event) => {
  //   console.log(event.target.value);
  //   setMyValue(event.target.value); // Asegúrate de actualizar el estado para que el input sea controlado
  // };

  // const condition = true;


  // const [myValue, setMyValue] = useState("");
  // let myPlaceHolder = "Escribe aquí";




  return (
    <>
      <HeaderComponent greetings={greetings} links={links}></HeaderComponent>

      <main className='main-content'>
       {/*Si tenemos usuario, mostrarmos el Hola, sino no saldrá nada*/}
       {user.userName && <h2 >Bienvenido {user.userName}</h2>}

        <Login handleLogin={login}></Login>
        <br>
        </br>
        <button onClick={() => setShowMovies(!showMovies) }>Toggle Movie</button>
        {showMovies && <MovieList></MovieList>}

        {/* {condition && <h2> La condición se cumple</h2>}
        {!condition && <h2> La condición no se cumple</h2>}

        { condition ? 
        (<h2> La condición se cumple</h2>) :(<h2> La condición no se cumple</h2> )
        }

        <h2 onClick={addOne}>Number: {number}</h2>

        <input value={myValue} placeholder={myPlaceHolder} type='text' onChange={handleChange}></input>
        <br />
        <br />
        <ButtonComponent></ButtonComponent>
        <MovieList></MovieList>
        <Jugadores></Jugadores> */}
        

      </main>
    </>
  )
}

export default App;
