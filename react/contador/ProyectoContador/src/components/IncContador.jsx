import ("./IncContador.css")

function IncContador({ num, incrementar, decrementar, limpiar }) {
    return (
      <div>
        <div>
          <h1 className="numero">{num}</h1> {/* Muestra el valor de num */}
        </div>
        <div className="botones">
          <button onClick={incrementar}>Incrementar</button> 
          <button onClick={decrementar}>Decrementar</button>
          <button onClick={limpiar}>Limpiar</button> 
        </div>
      </div>
    );
  }
  
  export default IncContador;
  