function Login(props) {
    const user = {
        userName: "Pablo",
        email: "pablorodseg@gmail.com"
    };

    const handleClick = () => {
        props.handleLogin(user);
    };

    return (
        <section>
            <h2>Login section</h2>
            <button onClick={handleClick}>Login</button>
        </section>
    );
}

export default Login;
