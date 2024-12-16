import "./Login.css"

function Login(props) {

    const user = {
        userName: "",
        email: ""
    };

    const handleClick = () => {
        props.handleLogin(user);
    };

    const handleSubmit = () => {
        console.log(user);
        props.handleLogin(user);
    };

    // Cambiar usuario
    const setUserName = (e) => {
        user.userName = e.target.value;
    };

    // Cambiar email
    const setEmail = (e) => {
        user.email = e.target.value;
    };


    return (
        <section className="Login">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor = "userName"> Username</label>
                    <input type="text" id="userName" onChange={setUserName}></input>
                </fieldset>

                <fieldset>
                    <label htmlFor = "email"> Email</label>
                    <input type="text" id="email" onChange={setEmail}></input>
                    <br></br>
                </fieldset>
            </form>
            <button onClick={handleClick}>Login</button>
        </section>
    );
}

export default Login;
