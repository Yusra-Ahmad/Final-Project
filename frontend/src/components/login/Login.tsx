import "./login.scss";

const Login = () => {
  return (
    <form className="login-form">
      <p>Login</p>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Login</button>
    </form>
  );
};

export default Login;
