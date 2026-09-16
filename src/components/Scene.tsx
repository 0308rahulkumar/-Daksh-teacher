"use client";
 
import { BestsellersBookShowcase } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame w-full h-[540px] rounded-2xl overflow-hidden shadow-2xl border border-[#c3a47b]/25 my-6 relative bg-[#1d1a15]">
      <BestsellersBookShowcase
        headingFont="iowan-old-style"
        bodyFont="iowan-old-style"
        headingWeight="500"
        bodyWeight="400"
        primaryColor="#c3a47b"
        headingSize={325}
        bodySize={17}
        headingLetterSpacing={-0.085}
      />
    </div>
  );
}
