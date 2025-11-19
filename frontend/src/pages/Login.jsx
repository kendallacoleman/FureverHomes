import Form from "../components/Form";
import { Link } from "react-router-dom";
import "../styles/Auth.css";

function Login() {
    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2 className="auth-title">Welcome Back! 🐾</h2>
                <p className="auth-subtitle">Log in to continue finding your furever friend</p>
                
                <Form route="/token/" method="login" />
                
                <div className="auth-switch">
                    <p>Don't have an account? <Link to="/register" className="auth-link">Sign up here</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;