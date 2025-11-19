import Form from "../components/Form";
import { Link } from "react-router-dom";
import "../styles/Auth.css";

function Register() {
    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2 className="auth-title">Join FureverHomes! 🐾</h2>
                <p className="auth-subtitle">Create an account to start finding your perfect pet</p>
                
                <Form route="/register/" method="register" />
                
                <div className="auth-switch">
                    <p>Already have an account? <Link to="/login" className="auth-link">Log in here</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Register;