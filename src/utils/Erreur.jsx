import React from "react";
import { Link } from "react-router-dom";
import "./Erreur.css";

function Erreur() {
  return (
    <div className="error-container">
      <div className="error-card">
        
        <h1>404</h1>
        <h2>Page non trouvée 😕</h2>
        <p>
          Oups... la page que tu cherches n'existe pas ou a été déplacée.
        </p>

        <Link to="/" className="home-btn">
          ⬅ Retour à l'accueil
        </Link>

      </div>
    </div>
  );
}

export default Erreur;


