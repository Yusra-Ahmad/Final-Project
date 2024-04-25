import "./login.scss";

const Login = () => {
  return (
    <form className="login-form">
      <p>Login</p>
      <input className="login-input" type="email" placeholder="Email" />
      <input className="login-input" type="password" placeholder="Password" />
      <button className="login-button">Login</button>
    </form>
  );
};

export default Login;
