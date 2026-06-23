import { senegalPaths } from "../../data/senegalPaths";
import "./SenegalMap.css";

function Map({ selectedRegion, onSelectRegion }) {
  return (
    <>
    <svg viewBox="0 0 1000 736" className="senegal-map">
      {senegalPaths.map((region) => (
        <path
          key={region.id}
          id={region.id}
          d={region.d}
          className={
            selectedRegion === region.id
              ? "region selected"
              : "region"
          }
          onClick={() => onSelectRegion(region.id)}
        />
      ))}
    </svg>
    </>
  );
}

export default Map;

