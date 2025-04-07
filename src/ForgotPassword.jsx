import { useState } from "react";
import "./forgotPassword.css"; // Importar CSS

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://api-mongo-5hdo.onrender.com/api/auth/forgotpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Error al enviar la solicitud.");
    }
  };

  return (
    <div className="forgot-container">
      <h2 className="forgot-title">Recuperar contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="forgot-input"
          required
        />
        <button type="submit" className="forgot-button">
          Enviar enlace
        </button>
      </form>
      {message && <p className="forgot-message">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
