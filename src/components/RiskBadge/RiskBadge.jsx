function RiskBadge({ risk }) {
  return (
    <div
      style={{
        marginTop: "20px",
        padding: "10px",
        borderRadius: "10px",
        background: risk.color,
        color: "white",
      }}
    >
      <h3>{risk.label}</h3>
      <p>Score: {risk.score} / 100</p>
    </div>
  );
}

export default RiskBadge;