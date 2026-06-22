import { useEffect } from "react";

import "./SenegalMap.css";

import SenegalSVG from "../../assets/svg/senegal.svg?raw";

function SenegalMap({
  selectedRegion,
  setSelectedRegion,
}) {
  useEffect(() => {
    const svgContainer =
      document.getElementById("senegal-map");

    if (!svgContainer) return;

    // On cible uniquement les régions
    const regions =
      svgContainer.querySelectorAll(
        "#features path"
      );

    regions.forEach((region) => {
      region.classList.remove(
        "region-selected"
      );

      if (
        region.id === selectedRegion
      ) {
        region.classList.add(
          "region-selected"
        );
      }
    });
  }, [selectedRegion]);

  const handleClick = (event) => {
    const region =
      event.target.closest("path");

    if (!region) return;

    const regionId = region.id;

    if (!regionId) return;

    setSelectedRegion(regionId);
  };

  return (
    <div
      id="senegal-map"
      className="map-container"
      onClick={handleClick}
      dangerouslySetInnerHTML={{
        __html: SenegalSVG,
      }}
    />
  );
}

export default SenegalMap;