import { useEffect, useState, useRef } from "react";
import "./SenegalMap.css";
import SenegalSVG from "../../assets/svg/senegal.svg?raw";
import { regions } from "../../data/regions";

function SenegalMap({ selectedRegion, setSelectedRegion }) {
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Applique/retire la classe "sélectionné" sur les paths du SVG
  useEffect(() => {
    const svgContainer = document.getElementById("senegal-map");
    if (!svgContainer) return;

    const regionPaths = svgContainer.querySelectorAll("#features path");
    regionPaths.forEach((region) => {
      region.classList.remove("region-selected");
      if (region.id === selectedRegion) {
        region.classList.add("region-selected");
      }
    });
  }, [selectedRegion]);

  const handleClick = (event) => {
    const region = event.target.closest("path");
    if (!region) return;
    const regionId = region.id;
    if (!regionId) return;
    setSelectedRegion(regionId);
  };

  const handleMouseMove = (event) => {
    const region = event.target.closest("path");

    if (!region || !region.id) {
      setHoveredRegion(null);
      return;
    }

    setHoveredRegion(region.id);

    // Position relative au conteneur de la carte
    const containerRect = containerRef.current.getBoundingClientRect();
    setTooltipPos({
      x: event.clientX - containerRect.left,
      y: event.clientY - containerRect.top,
    });
  };

  const handleMouseLeave = () => {
    setHoveredRegion(null);
  };

  const tooltipName = hoveredRegion ? regions[hoveredRegion]?.name : null;

  return (
    <div
      ref={containerRef}
      className="map-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        id="senegal-map"
        className="map-container"
        onClick={handleClick}
        dangerouslySetInnerHTML={{ __html: SenegalSVG }}
      />

      {tooltipName && (
        <div
          className="region-tooltip"
          style={{ left: tooltipPos.x, top: tooltipPos.y }}
        >
          {tooltipName}
        </div>
      )}
    </div>
  );
}

export default SenegalMap;
