import LoginBanner from "../components/login/LoginBanner";
import LoginForm from "../components/login/LoginForm";
import "../styles/login.css";

function Login() {
  return (
    <main className="login-page">
      <div className="login-wrapper">
        <LoginBanner />
        <LoginForm />
      </div>
    </main>
  );
}

export default Login;
