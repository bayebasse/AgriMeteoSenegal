import "./Loader.css";

function Loader() {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>Chargement des données météo...</p>
    </div>
  );
}

export default Loader;