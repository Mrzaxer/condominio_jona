import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./resetPassword.css"; // Importar CSS

const ResetPassword = () => {
  const { token } = useParams(); // Obtener el token de la URL
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isValidToken, setIsValidToken] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Validar el token al cargar la página
    const validateToken = async () => { 
      try {   
        const response = await fetch(`https://api-mongo-5hdo.onrender.com/api/auth/validate-token/${token}`);
        const data = await response.json();
        if (response.ok) {
          setIsValidToken(true);
        } else {
          setMessage(data.message || "Token inválido o expirado");
        }
      } catch (error) {
        setMessage("Error al validar el token.");
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidToken) {
      setMessage("Token inválido o expirado.");
      return;
    }

    try {
      const response = await fetch(`https://api-mongo-5hdo.onrender.com/api/auth/resetpassword/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Error al restablecer la contraseña.");
    }
  };

  return (
    <div className="reset-container">
      <h2 className="reset-title">Restablecer contraseña</h2>
      {loading ? (
        <p className="reset-message">Cargando...</p>
      ) : isValidToken ? (
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="reset-input"
            required
          />
          <button type="submit" className="reset-button">
            Guardar nueva contraseña
          </button>
        </form>
      ) : (
        <p className="reset-message">{message}</p>
      )}
    </div>
  );
};

export default ResetPassword;
