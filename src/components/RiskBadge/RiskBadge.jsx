import "./RiskBadge.css";

function RiskBadge({ risk }) {
  if (!risk) return null;

  return (
    <div className="risk-badge">
      <span className="risk-badge-label">{risk.label}</span>
      <div
        className="risk-badge-score"
        style={{ backgroundColor: risk.color }}
      >
        {risk.score}
      </div>
    </div>
  );
}

export default RiskBadge;

