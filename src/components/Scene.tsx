"use client";

import { ShaderButtons } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <ShaderButtons
        variant="plasma-button"
        mode="dark"
        hue={145}
        saturation={1.15}
        brightness={1.05}
      />
    </div>
  );
}
