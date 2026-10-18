import React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * 1. Electrician Trade Icon:
 * Heavy-duty 3-pin power plug with insulated cord, strain-relief boot, and voltage surge
 */
export const ElectricianTradeIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Plug Head Body */}
      <rect
        x="6"
        y="8"
        width="12"
        height="8"
        rx="2"
        className="fill-amber-500/15 dark:fill-amber-400/20"
        strokeWidth="1.75"
      />
      {/* Plug Dual Terminals / Contact Prongs */}
      <path d="M9 3v5" strokeWidth="2" />
      <path d="M15 3v5" strokeWidth="2" />
      {/* Grounding / Center notch */}
      <path d="M12 8v2" strokeWidth="1.5" />
      {/* Cord Strain Relief & Industrial Power Cable */}
      <path d="M10 16v1.5a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V16" strokeWidth="1.5" />
      <path d="M12 19.5v2.5" strokeWidth="1.75" />
      {/* Live Voltage Indicator Spark */}
      <path
        d="M11.5 11l1.5-2v2h1.5l-2 3v-2h-1z"
        className="fill-amber-500 text-amber-500"
        strokeWidth="1"
      />
    </svg>
  );
};

/**
 * 2. Plumbing Trade Icon:
 * Professional heavy-duty pipe wrench gripping a plumbing pipe fitting with water seal
 */
export const PlumbingTradeIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Plumber's Pipe / Conduit being serviced */}
      <rect
        x="2"
        y="13"
        width="8"
        height="7"
        rx="1.5"
        className="fill-sky-500/15 dark:fill-sky-400/20"
        strokeWidth="1.75"
      />
      <path d="M2 16.5h8" strokeWidth="1.5" strokeDasharray="1.5 1.5" />
      {/* Professional Pipe Wrench / Spanner */}
      {/* Upper Hook Jaw */}
      <path
        d="M10 6a3 3 0 0 1 3-3h3a2 2 0 0 1 2 2v2h-4"
        strokeWidth="1.75"
      />
      {/* Lower Heel Jaw & Knurled Nut */}
      <rect
        x="12"
        y="8"
        width="6"
        height="3"
        rx="0.75"
        className="fill-sky-500/25"
        strokeWidth="1.5"
      />
      {/* Sturdy Wrench I-Beam Handle */}
      <path
        d="M15 11l5.5 8a1.5 1.5 0 0 1-.5 2.1l-1.2.8a1.5 1.5 0 0 1-2.1-.5L12 13"
        strokeWidth="1.75"
      />
      {/* Hanging hole on handle */}
      <circle cx="18.5" cy="19.5" r="0.75" fill="currentColor" stroke="none" />
      {/* Controlled Sanitary Water Drop */}
      <path
        d="M5.5 8a1.5 1.5 0 0 1 1.5 1.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5c0-.6.7-1.1 1.5-1.5z"
        className="fill-sky-500 text-sky-500"
        strokeWidth="1"
      />
    </svg>
  );
};

/**
 * 3. AC Repair & Service Icon:
 * Modern Wall-Mounted Split AC Unit with Airflow Louvers & Cooling Waves
 */
export const AcRepairTradeIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Main Split AC Chassis */}
      <rect
        x="2"
        y="4"
        width="20"
        height="9"
        rx="2"
        className="fill-teal-500/15 dark:fill-teal-400/20"
        strokeWidth="1.75"
      />
      {/* Top Air Intake Grille Lines */}
      <path d="M5 6.5h14" strokeWidth="1.25" strokeOpacity="0.7" />
      {/* Digital Temperature / Status Display LED */}
      <rect
        x="16"
        y="9"
        width="3"
        height="1.5"
        rx="0.5"
        className="fill-teal-500 text-teal-500"
        strokeWidth="0.5"
      />
      {/* Bottom Horizontal Swing Louver / Discharge Vent */}
      <path d="M4 11h9" strokeWidth="1.5" />
      {/* Cool Air Circulation Breeze Curves */}
      <path d="M5 16c1.5 1.5 2.5 1.5 4 0s2.5-1.5 4 0" strokeWidth="1.5" />
      <path d="M8 19c1.5 1.5 2.5 1.5 4 0s2.5-1.5 4 0" strokeWidth="1.5" />
      {/* Cooling Snowflake Indicator */}
      <path d="M19 16v4M17 18h4M17.5 16.5l3 3M20.5 16.5l-3 3" strokeWidth="1.2" />
    </svg>
  );
};

/**
 * 4. Appliance Repair Trade Icon:
 * Front-Load Smart Washing Machine with Porthole Drum & Control Panel
 */
export const ApplianceRepairTradeIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Washing Machine Outer Cabinet */}
      <rect
        x="3"
        y="2"
        width="18"
        height="20"
        rx="3"
        className="fill-indigo-500/15 dark:fill-indigo-400/20"
        strokeWidth="1.75"
      />
      {/* Top Control Panel Separator */}
      <path d="M3 7h18" strokeWidth="1.5" />
      {/* Detergent Dispenser Drawer */}
      <rect x="6" y="4" width="3.5" height="1.75" rx="0.5" strokeWidth="1.2" />
      {/* Rotary Program Selector Dial Knob */}
      <circle cx="15.5" cy="4.8" r="1.2" fill="currentColor" stroke="none" />
      {/* LED Power / Cycle Indicators */}
      <circle cx="18" cy="4.8" r="0.6" fill="currentColor" stroke="none" />
      {/* Circular Glass Porthole Door Outer Ring */}
      <circle cx="12" cy="14.5" r="5" strokeWidth="1.75" />
      {/* Inner Drum & Water Level Ripple */}
      <circle
        cx="12"
        cy="14.5"
        r="3"
        strokeWidth="1.25"
        strokeDasharray="2 2"
        className="fill-indigo-500/20"
      />
      {/* Door Handle Grip */}
      <path d="M16 14.5a4 4 0 0 0-.5-1.8" strokeWidth="1.5" />
    </svg>
  );
};

/**
 * 5. Deep Cleaning Trade Icon:
 * Professional Industrial Trigger Spray Bottle & Detailing Squeegee (No generic AI sparkles!)
 */
export const CleaningTradeIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Trigger Spray Bottle Body */}
      <path
        d="M7 11h6a1 1 0 0 1 1 1v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-8a1 1 0 0 1 1-1z"
        className="fill-emerald-500/15 dark:fill-emerald-400/20"
        strokeWidth="1.75"
      />
      {/* Bottle Neck & Collar */}
      <path d="M9 11V8h2v3" strokeWidth="1.5" />
      {/* Trigger Pump Head & Nozzle */}
      <path d="M8 8h5l2-3H8v3z" strokeWidth="1.5" />
      <path d="M15 5h2" strokeWidth="1.75" />
      {/* Ergonomic Finger Trigger */}
      <path d="M10 8c0 1.5.8 2 1.5 2" strokeWidth="1.5" />
      {/* Liquid Fill Level Guide */}
      <path d="M8 17h4" strokeWidth="1.25" strokeDasharray="1.5 1.5" />
      {/* Pressurized Fine Cleaning Mist Spray (Directional Action) */}
      <circle cx="19" cy="4" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="21" cy="5.5" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="19.5" cy="7" r="0.75" fill="currentColor" stroke="none" />
      {/* Surface Sanitized Sheen Accent Line */}
      <path d="M3 21h18" strokeWidth="1.5" strokeOpacity="0.4" />
    </svg>
  );
};

/**
 * 6. Auto & Garage Repair Trade Icon:
 * Automotive Front Grille / Chassis with Mechanic's Repair Wrench
 */
export const AutoGarageTradeIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Vehicle Front Hood & Windshield Roofline */}
      <path
        d="M5 10l1.8-4.5A2 2 0 0 1 8.6 4h6.8a2 2 0 0 1 1.8 1.5L19 10"
        strokeWidth="1.5"
      />
      {/* Front Vehicle Body / Bumper */}
      <rect
        x="3"
        y="10"
        width="18"
        height="8"
        rx="2"
        className="fill-orange-500/15 dark:fill-orange-400/20"
        strokeWidth="1.75"
      />
      {/* Dual Headlights */}
      <circle cx="6.5" cy="13.5" r="1.5" strokeWidth="1.5" />
      <circle cx="17.5" cy="13.5" r="1.5" strokeWidth="1.5" />
      {/* Center Radiator Grille Slats */}
      <path d="M10.5 12.5v2M13.5 12.5v2" strokeWidth="1.5" />
      {/* Dual Road Wheels / Tyres */}
      <rect x="4.5" y="18" width="3" height="3" rx="1" fill="currentColor" stroke="none" />
      <rect x="16.5" y="18" width="3" height="3" rx="1" fill="currentColor" stroke="none" />
      {/* Mechanic's Quick-Fix Wrench Accent on Corner */}
      <path
        d="M17.5 2.5a2 2 0 0 0-2 2v.5l-2 2 1.5 1.5 2-2h.5a2 2 0 0 0 2-2l-1 1-1-1 1-1-1 1z"
        className="fill-[#E87532] text-[#E87532]"
        strokeWidth="1"
      />
    </svg>
  );
};
