import React, { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  Clock,
  AlertCircle,
  Filter,
  X,
  SlidersHorizontal,
  Star,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Sparkles,
  Zap,
  Droplets,
  Wind,
  Tv,
  Car,
  Check,
  Wrench,
  Shield,
  ArrowRight,
  Flame,
} from "lucide-react";
import {
  useGetCategoriesQuery,
  useGetServicesQuery,
} from "../features/services/api/servicesApi";
import { useLanguage } from "../context/LanguageContext";
import { Service } from "../types/api.types";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Skeleton } from "../components/ui/Skeleton";
import { BookingModal } from "../features/bookings/components/BookingModal";
import {
  getServiceImage,
  handleImageError,
  categoryFallbackImages,
  compressImageUrl,
  DEFAULT_FALLBACK_IMAGE,
} from "../lib/serviceImageMap";

interface ServicesPageProps {
  onOpenAuthModal?: () => void;
}

const categoryImages = categoryFallbackImages;

// Dynamic icon resolver for each service category
const getCategoryIcon = (slugOrId: string = "") => {
  const s = slugOrId.toLowerCase();
  if (s.includes("car") || s.includes("mechanic") || s.includes("periodic") || s.includes("denting")) return Car;
  if (s.includes("sos") || s.includes("emergency") || s.includes("battery") || s.includes("electrician")) return Zap;
  if (s.includes("two-wheeler") || s.includes("bike")) return Wrench;
  if (s.includes("brake") || s.includes("suspension") || s.includes("clutch")) return ShieldCheck;
  if (s.includes("tyre") || s.includes("wheel") || s.includes("puncture")) return ShieldCheck;
  if (s.includes("wash") || s.includes("detailing") || s.includes("spa")) return Sparkles;
  if (s.includes("paint") || s.includes("waterproof") || s.includes("plumbing") || s.includes("ro")) return Droplets;
  if (s.includes("carpentry") || s.includes("wood")) return Wrench;
  if (s.includes("cctv") || s.includes("security")) return Shield;
  if (s.includes("ac") || s.includes("cool")) return Wind;
  if (s.includes("appliance")) return Tv;
  if (s.includes("cleaning")) return Sparkles;
  return Sparkles;
};

// Quick 1-click filter chips for the hero bar
const quickChips = [
  { id: "ALL", label: "All Services", icon: Flame },
  { id: "emergency-roadside-sos", label: "Roadside SOS", icon: Zap },
  { id: "car-periodic-maintenance", label: "Car Service", icon: Car },
  { id: "two-wheeler-repair", label: "Bike Repair", icon: Wrench },
  { id: "tyres-wheel-care", label: "Tyres & Puncture", icon: ShieldCheck },
  { id: "detailing-wash-spa", label: "Wash & Spa", icon: Sparkles },
  { id: "brakes-clutch-suspension", label: "Brakes & Clutch", icon: ShieldCheck },
  { id: "ac-repair", label: "AC Repair", icon: Wind },
  { id: "electrician", label: "Electrician", icon: Zap },
  { id: "plumbing", label: "Plumbing", icon: Droplets },
];

// Realistic fallback catalog with 4-6 detailed services per category
const fallbackCatalog: Service[] = [
  // 1. Auto & Garage Repair (mechanic)
  {
    id: "srv-mech-1",
    title: "General Car Inspection & Comprehensive Engine Diagnostics",
    categoryId: "mechanic",
    category: { id: "mechanic", name: "Auto & Garage Repair", slug: "mechanic" },
    defaultPrice: 899,
    description: "40-point vehicle diagnostic including engine health, coolant level, battery charge, brake pads, and tyre pressure.",
    durationMinutes: 60,
    rating: 4.95,
    reviewsCount: 312,
  },
  {
    id: "srv-mech-2",
    title: "Emergency Battery Jumpstart & Alternator Charging Test",
    categoryId: "mechanic",
    category: { id: "mechanic", name: "Auto & Garage Repair", slug: "mechanic" },
    defaultPrice: 349,
    description: "Rapid on-demand doorstep jumpstart with high-capacity booster kit and comprehensive alternator output test.",
    durationMinutes: 25,
    rating: 4.96,
    reviewsCount: 428,
  },
  {
    id: "srv-mech-3",
    title: "Standard Engine Oil & Oil Filter Replacement",
    categoryId: "mechanic",
    category: { id: "mechanic", name: "Auto & Garage Repair", slug: "mechanic" },
    defaultPrice: 1499,
    description: "Full synthetic or semi-synthetic engine oil drain and refill with genuine OEM oil filter swap.",
    durationMinutes: 50,
    rating: 4.91,
    reviewsCount: 265,
  },
  {
    id: "srv-mech-4",
    title: "Emergency Highway Breakdown & Flatbed Towing Assist",
    categoryId: "mechanic",
    category: { id: "mechanic", name: "Auto & Garage Repair", slug: "mechanic" },
    defaultPrice: 1899,
    description: "24/7 rapid highway recovery with flatbed towing, mechanical triage, and secure transport to nearest certified garage.",
    durationMinutes: 45,
    rating: 4.98,
    reviewsCount: 194,
  },
  {
    id: "srv-mech-5",
    title: "Front & Rear Disc Brake Pad Replacement",
    categoryId: "mechanic",
    category: { id: "mechanic", name: "Auto & Garage Repair", slug: "mechanic" },
    defaultPrice: 599,
    description: "Ceramic / semi-metallic brake pad installation, disc rotor inspection, caliper pin lubrication, and brake fluid top-up.",
    durationMinutes: 45,
    rating: 4.89,
    reviewsCount: 172,
  },
  {
    id: "srv-mech-6",
    title: "Computerized OBD-II Engine Scanner Diagnostics",
    categoryId: "mechanic",
    category: { id: "mechanic", name: "Auto & Garage Repair", slug: "mechanic" },
    defaultPrice: 499,
    description: "Digital ECU fault code scanning, check-engine light clearing, sensor live-data logging, and diagnostic report.",
    durationMinutes: 30,
    rating: 4.92,
    reviewsCount: 188,
  },

  // 2. Electrician (electrician)
  {
    id: "srv-elec-1",
    title: "Complete Home Electrical Short Circuit Triage & MCB Fix",
    categoryId: "electrician",
    category: { id: "electrician", name: "Electrician", slug: "electrician" },
    defaultPrice: 249,
    description: "Testing of phase, neutral, earthing, and tripped breakers using digital insulation testers.",
    durationMinutes: 35,
    rating: 4.93,
    reviewsCount: 246,
  },
  {
    id: "srv-elec-2",
    title: "Ceiling Fan Installation & Regulator Switch Wiring",
    categoryId: "electrician",
    category: { id: "electrician", name: "Electrician", slug: "electrician" },
    defaultPrice: 179,
    description: "Safe ceiling anchor drilling, modular switchboard connection, capacitor test, and speed regulator tuning.",
    durationMinutes: 30,
    rating: 4.88,
    reviewsCount: 198,
  },
  {
    id: "srv-elec-3",
    title: "Inverter & Battery Wiring, Socket Setup & Triage",
    categoryId: "electrician",
    category: { id: "electrician", name: "Electrician", slug: "electrician" },
    defaultPrice: 399,
    description: "Pure sine wave inverter connection, distilled water gravity check, terminal grease coating, and high-load bypass switch.",
    durationMinutes: 45,
    rating: 4.94,
    reviewsCount: 182,
  },
  {
    id: "srv-elec-4",
    title: "Modular Switchboard Installation & Internal Rewiring",
    categoryId: "electrician",
    category: { id: "electrician", name: "Electrician", slug: "electrician" },
    defaultPrice: 299,
    description: "Replacement of burnt sockets, loose wiring tightening, and neat modular gang box fitting with safety earthing.",
    durationMinutes: 40,
    rating: 4.9,
    reviewsCount: 144,
  },
  {
    id: "srv-elec-5",
    title: "Heavy Appliance 16A Power Plug & AC Isolator Wiring",
    categoryId: "electrician",
    category: { id: "electrician", name: "Electrician", slug: "electrician" },
    defaultPrice: 219,
    description: "High-amperage dedicated circuit wiring for AC, geyser, microwave, or refrigerator to prevent phase overloading.",
    durationMinutes: 30,
    rating: 4.87,
    reviewsCount: 135,
  },
  {
    id: "srv-elec-6",
    title: "Smart Home Touch Switch & Wi-Fi Controller Setup",
    categoryId: "electrician",
    category: { id: "electrician", name: "Electrician", slug: "electrician" },
    defaultPrice: 499,
    description: "Smart relay integration behind switch plates with mobile app pairing and automated voice assistant routines.",
    durationMinutes: 50,
    rating: 4.96,
    reviewsCount: 115,
  },

  // 3. Plumbing (plumbing)
  {
    id: "srv-plumb-1",
    title: "Bathroom Tap, Mixer & Concealed Pipe Leakage Repair",
    categoryId: "plumbing",
    category: { id: "plumbing", name: "Plumbing", slug: "plumbing" },
    defaultPrice: 199,
    description: "Non-invasive moisture testing, ceramic disc cartridge replacement, and high-pressure leak sealing.",
    durationMinutes: 40,
    rating: 4.91,
    reviewsCount: 278,
  },
  {
    id: "srv-plumb-2",
    title: "Overhead Water Tank Deep Cleaning & UV Disinfection",
    categoryId: "plumbing",
    category: { id: "plumbing", name: "Plumbing", slug: "plumbing" },
    defaultPrice: 699,
    description: "Sludge drainage, high-pressure rotary scrub, anti-bacterial UV chamber treatment, and floating ball-valve check.",
    durationMinutes: 60,
    rating: 4.95,
    reviewsCount: 210,
  },
  {
    id: "srv-plumb-3",
    title: "Blocked Drain, Kitchen Sink & Waste Pipe Unclogging",
    categoryId: "plumbing",
    category: { id: "plumbing", name: "Plumbing", slug: "plumbing" },
    defaultPrice: 299,
    description: "Heavy-duty drain auger wire and pneumatic air snake clearing of grease traps, gully traps, and floor traps.",
    durationMinutes: 35,
    rating: 4.89,
    reviewsCount: 186,
  },
  {
    id: "srv-plumb-4",
    title: "Western Toilet Jet Spray & Dual-Flush Valve Overhaul",
    categoryId: "plumbing",
    category: { id: "plumbing", name: "Plumbing", slug: "plumbing" },
    defaultPrice: 249,
    description: "Replacement of leaky hand health faucet, angle cock valve, internal cistern syphon, and flexible inlet hose.",
    durationMinutes: 30,
    rating: 4.86,
    reviewsCount: 154,
  },
  {
    id: "srv-plumb-5",
    title: "Water Pressure Pump & Booster Motor Pipeline Installation",
    categoryId: "plumbing",
    category: { id: "plumbing", name: "Plumbing", slug: "plumbing" },
    defaultPrice: 449,
    description: "Automatic pressure switch wiring, non-return valve (NRV) mounting, and high-flow CPVC line connection.",
    durationMinutes: 50,
    rating: 4.93,
    reviewsCount: 122,
  },
  {
    id: "srv-plumb-6",
    title: "Geyser Hot Water Inlet/Outlet Valve & Connection Pipe Fitting",
    categoryId: "plumbing",
    category: { id: "plumbing", name: "Plumbing", slug: "plumbing" },
    defaultPrice: 229,
    description: "High-grade braided stainless steel flexible hose fitting, multi-function safety valve (MFV), and leak test.",
    durationMinutes: 30,
    rating: 4.9,
    reviewsCount: 140,
  },

  // 4. AC Repair & Service (ac-repair)
  {
    id: "srv-ac-1",
    title: "Split AC Deep Foam Jet Service & Antibacterial Wash",
    categoryId: "ac-repair",
    category: { id: "ac-repair", name: "AC Repair & Service", slug: "ac-repair" },
    defaultPrice: 549,
    description: "High-pressure jet pump wash with indoor leakproof funnel jacket, coil degreasing, and filter sterilization.",
    durationMinutes: 45,
    rating: 4.96,
    reviewsCount: 384,
  },
  {
    id: "srv-ac-2",
    title: "AC Eco-Gas Charging (R32 / R410A) with Leakage Triage",
    categoryId: "ac-repair",
    category: { id: "ac-repair", name: "AC Repair & Service", slug: "ac-repair" },
    defaultPrice: 1499,
    description: "Nitrogen pressure holding test, flare nut brazing, electronic vacuuming, and digital weight scale gas recharging.",
    durationMinutes: 60,
    rating: 4.92,
    reviewsCount: 295,
  },
  {
    id: "srv-ac-3",
    title: "AC PCB Circuit Board Diagnosis & Capacitor Replacement",
    categoryId: "ac-repair",
    category: { id: "ac-repair", name: "AC Repair & Service", slug: "ac-repair" },
    defaultPrice: 499,
    description: "Microcontroller error code troubleshooting, outdoor fan run capacitor test, and thermostat sensor calibration.",
    durationMinutes: 40,
    rating: 4.88,
    reviewsCount: 176,
  },
  {
    id: "srv-ac-4",
    title: "Window AC Complete Deep Servicing & Filter De-scale",
    categoryId: "ac-repair",
    category: { id: "ac-repair", name: "AC Repair & Service", slug: "ac-repair" },
    defaultPrice: 449,
    description: "Full chassis slide-out cleaning, condenser fin comb straightening, blower wheel degreasing, and drain unclogging.",
    durationMinutes: 45,
    rating: 4.89,
    reviewsCount: 162,
  },
  {
    id: "srv-ac-5",
    title: "Split AC Safe Dismantling & New Bracket Re-Installation",
    categoryId: "ac-repair",
    category: { id: "ac-repair", name: "AC Repair & Service", slug: "ac-repair" },
    defaultPrice: 799,
    description: "Refrigerant pump down, heavy-duty iron angle outdoor bracket mounting, copper pipe flare connection, and level check.",
    durationMinutes: 75,
    rating: 4.94,
    reviewsCount: 150,
  },
  {
    id: "srv-ac-6",
    title: "Indoor Unit Water Leakage Repair & Drain Tray Flushing",
    categoryId: "ac-repair",
    category: { id: "ac-repair", name: "AC Repair & Service", slug: "ac-repair" },
    defaultPrice: 349,
    description: "Algae biofilm removal from condensate drain pan, drain line pressurized flush, and indoor unit slope alignment.",
    durationMinutes: 30,
    rating: 4.87,
    reviewsCount: 138,
  },

  // 5. Appliance Repair (appliance)
  {
    id: "srv-app-1",
    title: "Fully Automatic Washing Machine Motor & Drum Repair",
    categoryId: "appliance",
    category: { id: "appliance", name: "Appliance Repair", slug: "appliance" },
    defaultPrice: 399,
    description: "Doorstep repair for spin drum vibration, drain valve blockage, error code diagnosis, and inlet solenoids.",
    durationMinutes: 50,
    rating: 4.91,
    reviewsCount: 220,
  },
  {
    id: "srv-app-2",
    title: "Single & Double Door Refrigerator Cooling & Gas Triage",
    categoryId: "appliance",
    category: { id: "appliance", name: "Appliance Repair", slug: "appliance" },
    defaultPrice: 449,
    description: "Compressor relay test, thermostat cooling cycle tuning, defrost timer replacement, and door magnetic gasket seal.",
    durationMinutes: 45,
    rating: 4.89,
    reviewsCount: 194,
  },
  {
    id: "srv-app-3",
    title: "Microwave Oven Magnetron, Fuse & Turntable Repair",
    categoryId: "appliance",
    category: { id: "appliance", name: "Appliance Repair", slug: "appliance" },
    defaultPrice: 349,
    description: "High-voltage capacitor discharge, micro-switch door latch alignment, mica sheet replacement, and heat testing.",
    durationMinutes: 40,
    rating: 4.86,
    reviewsCount: 148,
  },
  {
    id: "srv-app-4",
    title: "Kitchen Chimney Deep Degreasing & Duct Pipe Cleaning",
    categoryId: "appliance",
    category: { id: "appliance", name: "Appliance Repair", slug: "appliance" },
    defaultPrice: 599,
    description: "Baffle/mesh filter chemical soak, blower impeller carbon scrape, oil collector cup emptying, and aluminum duct check.",
    durationMinutes: 60,
    rating: 4.94,
    reviewsCount: 165,
  },
  {
    id: "srv-app-5",
    title: "Instant & Storage Geyser Heating Element & Thermostat Fix",
    categoryId: "appliance",
    category: { id: "appliance", name: "Appliance Repair", slug: "appliance" },
    defaultPrice: 299,
    description: "Copper heating coil descaling, dual thermostat safety trip reset, anode rod replacement, and earthing test.",
    durationMinutes: 40,
    rating: 4.9,
    reviewsCount: 152,
  },
  {
    id: "srv-app-6",
    title: "Semi-Automatic Washing Machine Spin/Wash Motor Wiring",
    categoryId: "appliance",
    category: { id: "appliance", name: "Appliance Repair", slug: "appliance" },
    defaultPrice: 349,
    description: "Spin brake liner adjustment, drive belt tensioning, wash timer mechanical repair, and waterproof motor boot seal.",
    durationMinutes: 45,
    rating: 4.85,
    reviewsCount: 126,
  },

  // 6. Deep Cleaning (cleaning)
  {
    id: "srv-clean-1",
    title: "Complete Home Deep Cleaning & Floor Machine Buffing Package",
    categoryId: "cleaning",
    category: { id: "cleaning", name: "Deep Cleaning", slug: "cleaning" },
    defaultPrice: 1499,
    description: "Single-disc scrubbing of tiles, chimney degreasing, stainless steel buffing, and high-grade sanitizer wipe down.",
    durationMinutes: 120,
    rating: 4.96,
    reviewsCount: 310,
  },
  {
    id: "srv-clean-2",
    title: "Intensive Kitchen Degreasing, Tiles & Slab Scrubbing",
    categoryId: "cleaning",
    category: { id: "cleaning", name: "Deep Cleaning", slug: "cleaning" },
    defaultPrice: 699,
    description: "Heavy-duty oil cutting alkali treatment on wall tiles, stove burners, sink area, and modular cabinet exteriors.",
    durationMinutes: 60,
    rating: 4.91,
    reviewsCount: 242,
  },
  {
    id: "srv-clean-3",
    title: "Bathroom Acid-Free Deep Descaling & Sanitization",
    categoryId: "cleaning",
    category: { id: "cleaning", name: "Deep Cleaning", slug: "cleaning" },
    defaultPrice: 499,
    description: "Hard water scale removal from shower partition glass, chrome tap polishing, tile grout whitening, and WC descaling.",
    durationMinutes: 45,
    rating: 4.89,
    reviewsCount: 218,
  },
  {
    id: "srv-clean-4",
    title: "Fabric Sofa & Upholstery Deep Shampoo Vacuum Wash",
    categoryId: "cleaning",
    category: { id: "cleaning", name: "Deep Cleaning", slug: "cleaning" },
    defaultPrice: 599,
    description: "High-foam foam agitation, stain extraction with dual-motor wet vacuum, and fast-drying fabric deodorizer.",
    durationMinutes: 50,
    rating: 4.93,
    reviewsCount: 184,
  },
  {
    id: "srv-clean-5",
    title: "Mattress Deep Dry Vacuuming & Anti-Allergen Sanitization",
    categoryId: "cleaning",
    category: { id: "cleaning", name: "Deep Cleaning", slug: "cleaning" },
    defaultPrice: 449,
    description: "High-suction HEPA filtration extraction for dust mites, dead skin cells, and microscopic allergens with UV-C wand.",
    durationMinutes: 35,
    rating: 4.88,
    reviewsCount: 136,
  },
  {
    id: "srv-clean-6",
    title: "Balcony, Window Grill & Sliding Glass Railing Scrubbing",
    categoryId: "cleaning",
    category: { id: "cleaning", name: "Deep Cleaning", slug: "cleaning" },
    defaultPrice: 399,
    description: "Pigeon droppings removal, high-pressure jet wash on exterior tiles, window track vacuuming, and glass wiping.",
    durationMinutes: 40,
    rating: 4.87,
    reviewsCount: 125,
  },

  // 7. Painting & Waterproofing (painting)
  {
    id: "srv-paint-1",
    title: "Wall Dampness Treatment & Anti-Fungal Waterproofing",
    categoryId: "painting",
    category: { id: "painting", name: "Painting & Waterproofing", slug: "painting" },
    defaultPrice: 1799,
    description: "Deep moisture reading, wall efflorescence scraping, multi-layer polymer base coat, and waterproof barrier paint.",
    durationMinutes: 90,
    rating: 4.95,
    reviewsCount: 260,
  },
  {
    id: "srv-paint-2",
    title: "Interior Wall Fresh Coat & Touch-up Painting",
    categoryId: "painting",
    category: { id: "painting", name: "Painting & Waterproofing", slug: "painting" },
    defaultPrice: 2499,
    description: "Smooth acrylic emulsion application with micro-fiber rollers, sharp tape masking on skirting, and zero splatter.",
    durationMinutes: 120,
    rating: 4.92,
    reviewsCount: 198,
  },
  {
    id: "srv-paint-3",
    title: "Exterior Texture & Weather-Shield Protection Coat",
    categoryId: "painting",
    category: { id: "painting", name: "Painting & Waterproofing", slug: "painting" },
    defaultPrice: 3299,
    description: "Elastomeric heavy weather coat with UV resistance, rain barrier protection, and crack-bridging technology.",
    durationMinutes: 180,
    rating: 4.94,
    reviewsCount: 142,
  },
  {
    id: "srv-paint-4",
    title: "Ceiling Seepage Repair & Water Barrier Membrane",
    categoryId: "painting",
    category: { id: "painting", name: "Painting & Waterproofing", slug: "painting" },
    defaultPrice: 1299,
    description: "Hydraulic crystalline mortar injection, peeling paint removal, and non-toxic moisture curing sealant application.",
    durationMinutes: 75,
    rating: 4.88,
    reviewsCount: 130,
  },
  {
    id: "srv-paint-5",
    title: "Wood & Metal Enamel Painting for Doors & Window Grills",
    categoryId: "painting",
    category: { id: "painting", name: "Painting & Waterproofing", slug: "painting" },
    defaultPrice: 899,
    description: "Rust converter primer on iron grills, high-gloss polyurethane enamel finish, and anti-corrosive protective film.",
    durationMinutes: 60,
    rating: 4.89,
    reviewsCount: 115,
  },
  {
    id: "srv-paint-6",
    title: "Wall Putty, Primer & Crack Filling Surface Preparation",
    categoryId: "painting",
    category: { id: "painting", name: "Painting & Waterproofing", slug: "painting" },
    defaultPrice: 999,
    description: "Flexible polymer fiber crack filler paste, dual-coat white cement putty, and orbital machine sanding for mirror finish.",
    durationMinutes: 80,
    rating: 4.9,
    reviewsCount: 128,
  },

  // 8. Carpentry & Woodwork (carpentry)
  {
    id: "srv-carp-1",
    title: "Door Lock, Handle & Concealed Hydraulic Hinge Repair",
    categoryId: "carpentry",
    category: { id: "carpentry", name: "Carpentry & Woodwork", slug: "carpentry" },
    defaultPrice: 249,
    description: "Heavy-duty mortise lock fixing, soft-close hydraulic cabinet hinge alignment, and striker plate repositioning.",
    durationMinutes: 40,
    rating: 4.93,
    reviewsCount: 254,
  },
  {
    id: "srv-carp-2",
    title: "Modular Kitchen Cabinet & Drawer Channel Tuning",
    categoryId: "carpentry",
    category: { id: "carpentry", name: "Carpentry & Woodwork", slug: "carpentry" },
    defaultPrice: 399,
    description: "Telescopic ball-bearing drawer slide replacement, sagging shutter leveling, and soft-close piston tuning.",
    durationMinutes: 45,
    rating: 4.9,
    reviewsCount: 188,
  },
  {
    id: "srv-carp-3",
    title: "Custom Furniture Assembly (Bed, Wardrobe, Work Desk)",
    categoryId: "carpentry",
    category: { id: "carpentry", name: "Carpentry & Woodwork", slug: "carpentry" },
    defaultPrice: 599,
    description: "Precision engineered assembly with torque drills, dowel alignment, structural bracket reinforcement, and leveling.",
    durationMinutes: 60,
    rating: 4.95,
    reviewsCount: 172,
  },
  {
    id: "srv-carp-4",
    title: "Wooden Door Trimming, Latch Fixing & Peep-Hole Fitting",
    categoryId: "carpentry",
    category: { id: "carpentry", name: "Carpentry & Woodwork", slug: "carpentry" },
    defaultPrice: 299,
    description: "Electric planer trimming for floor scraping doors, high-security tower bolt fixing, and wide-angle optical eye viewer.",
    durationMinutes: 35,
    rating: 4.87,
    reviewsCount: 145,
  },
  {
    id: "srv-carp-5",
    title: "Sliding Wardrobe Track & Nylon Roller Wheel Replacement",
    categoryId: "carpentry",
    category: { id: "carpentry", name: "Carpentry & Woodwork", slug: "carpentry" },
    defaultPrice: 349,
    description: "Smooth heavy-gauge aluminum bottom track fitting, ball-bearing roller adjustment, and anti-jump stopper mounting.",
    durationMinutes: 40,
    rating: 4.88,
    reviewsCount: 130,
  },
  {
    id: "srv-carp-6",
    title: "Curtain Rod, Wooden Wall Shelf & TV Mount Drilling",
    categoryId: "carpentry",
    category: { id: "carpentry", name: "Carpentry & Woodwork", slug: "carpentry" },
    defaultPrice: 199,
    description: "Laser level wall marking, heavy-load anchor fastener insertion, and sturdy bracket mounting for TVs, frames, and shelves.",
    durationMinutes: 30,
    rating: 4.91,
    reviewsCount: 164,
  },

  // 9. CCTV & Smart Security (cctv-security)
  {
    id: "srv-cctv-1",
    title: "Doorstep HD CCTV Camera Installation & Mobile App Streaming",
    categoryId: "cctv-security",
    category: { id: "cctv-security", name: "CCTV & Smart Security", slug: "cctv-security" },
    defaultPrice: 499,
    description: "Neat coaxial/Cat6 cable casing, night-vision infrared camera mounting, DVR network routing, and phone app streaming.",
    durationMinutes: 60,
    rating: 4.96,
    reviewsCount: 220,
  },
  {
    id: "srv-cctv-2",
    title: "Smart Video Doorbell & Digital Biometric Lock Fitting",
    categoryId: "cctv-security",
    category: { id: "cctv-security", name: "CCTV & Smart Security", slug: "cctv-security" },
    defaultPrice: 699,
    description: "Chime transformer wiring, optical fingerprint sensor calibration, RFID card encoding, and home Wi-Fi gateway pairing.",
    durationMinutes: 50,
    rating: 4.94,
    reviewsCount: 178,
  },
  {
    id: "srv-cctv-3",
    title: "Security DVR/NVR Wiring & Surveillance Hard Disk Setup",
    categoryId: "cctv-security",
    category: { id: "cctv-security", name: "CCTV & Smart Security", slug: "cctv-security" },
    defaultPrice: 549,
    description: "Surveillance-grade SATA HDD formatting, motion detection zone masking, cloud backup schedule, and HDMI display output.",
    durationMinutes: 45,
    rating: 4.91,
    reviewsCount: 146,
  },
  {
    id: "srv-cctv-4",
    title: "360° Wi-Fi PTZ Security Camera Setup & Motion Alert Config",
    categoryId: "cctv-security",
    category: { id: "cctv-security", name: "CCTV & Smart Security", slug: "cctv-security" },
    defaultPrice: 349,
    description: "Ceiling mounting plate installation, microSD memory card configuration, human AI tracking setup, and two-way talk test.",
    durationMinutes: 35,
    rating: 4.89,
    reviewsCount: 162,
  },
  {
    id: "srv-cctv-5",
    title: "Intercom & EPABX Video Door Phone Cable Diagnosis",
    categoryId: "cctv-security",
    category: { id: "cctv-security", name: "CCTV & Smart Security", slug: "cctv-security" },
    defaultPrice: 449,
    description: "Tone generator cable fault tracing, outdoor camera sub-unit repair, power supply unit check, and crisp indoor audio test.",
    durationMinutes: 40,
    rating: 4.87,
    reviewsCount: 118,
  },
  {
    id: "srv-cctv-6",
    title: "PIR Motion Sensor Security Floodlight & Alarm Siren Fitting",
    categoryId: "cctv-security",
    category: { id: "cctv-security", name: "CCTV & Smart Security", slug: "cctv-security" },
    defaultPrice: 399,
    description: "Infrared thermal detection sensitivity calibration, dusk-to-dawn lux setting, loud 110dB siren relay, and weather casing.",
    durationMinutes: 40,
    rating: 4.92,
    reviewsCount: 104,
  },

  // 10. RO Water Purifier Care (ro-water-purifier)
  {
    id: "srv-ro-1",
    title: "Comprehensive RO Service & Multi-Stage Filter Replacement",
    categoryId: "ro-water-purifier",
    category: { id: "ro-water-purifier", name: "RO Water Purifier Care", slug: "ro-water-purifier" },
    defaultPrice: 349,
    description: "Sediment filter backwash, activated carbon cartridge swap, membrane pressure check, and digital TDS calibration.",
    durationMinutes: 45,
    rating: 4.95,
    reviewsCount: 340,
  },
  {
    id: "srv-ro-2",
    title: "Water TDS Calibration & High-Pressure Booster Pump Check",
    categoryId: "ro-water-purifier",
    category: { id: "ro-water-purifier", name: "RO Water Purifier Care", slug: "ro-water-purifier" },
    defaultPrice: 299,
    description: "Digital TDS meter before/after sampling, booster pump head pressure test, low-pressure cut-off switch (LPS) verification.",
    durationMinutes: 30,
    rating: 4.9,
    reviewsCount: 215,
  },
  {
    id: "srv-ro-3",
    title: "RO Membrane Replacement & Alkaline Mineralizer Cartridge Add-on",
    categoryId: "ro-water-purifier",
    category: { id: "ro-water-purifier", name: "RO Water Purifier Care", slug: "ro-water-purifier" },
    defaultPrice: 899,
    description: "High-rejection 80 GPD thin-film composite membrane installation with bio-mineral pH balancer cartridge for sweet taste.",
    durationMinutes: 45,
    rating: 4.94,
    reviewsCount: 198,
  },
  {
    id: "srv-ro-4",
    title: "RO UV Lamp & 24V SMPS Electronic Power Adapter Repair",
    categoryId: "ro-water-purifier",
    category: { id: "ro-water-purifier", name: "RO Water Purifier Care", slug: "ro-water-purifier" },
    defaultPrice: 449,
    description: "Stainless steel UV barrel cleaning, 11W germicidal UV tube swap, and heavy-duty regulated power supply unit replacement.",
    durationMinutes: 35,
    rating: 4.88,
    reviewsCount: 142,
  },
  {
    id: "srv-ro-5",
    title: "Tap Connector Leakage Sealing & Food-Grade Pipe Replacement",
    categoryId: "ro-water-purifier",
    category: { id: "ro-water-purifier", name: "RO Water Purifier Care", slug: "ro-water-purifier" },
    defaultPrice: 199,
    description: "Push-fit quick connect elbow fitting, 1/4 inch NSF food-grade tubing re-route, and divergence diverter valve sealing.",
    durationMinutes: 25,
    rating: 4.87,
    reviewsCount: 135,
  },
  {
    id: "srv-ro-6",
    title: "Complete RO Uninstallation & New Kitchen Wall Mounting",
    categoryId: "ro-water-purifier",
    category: { id: "ro-water-purifier", name: "RO Water Purifier Care", slug: "ro-water-purifier" },
    defaultPrice: 399,
    description: "Safe water drainage, wall bracket drill and anchor, reject water line plumbing, and leak-free commissioning.",
    durationMinutes: 45,
    rating: 4.91,
    reviewsCount: 154,
  },

  // 11. Car Denting & Painting (car-denting-painting)
  {
    id: "srv-dent-1",
    title: "Paintless Dent Removal (PDR) & Minor Scratch Buffing",
    categoryId: "car-denting-painting",
    category: { id: "car-denting-painting", name: "Car Denting & Painting", slug: "car-denting-painting" },
    defaultPrice: 799,
    description: "High-precision metal rod PDR technique for door and fender dings without harming original factory paint finish.",
    durationMinutes: 60,
    rating: 4.95,
    reviewsCount: 280,
  },
  {
    id: "srv-dent-2",
    title: "Full Bumper Realignment, Scratch Removal & Spot Touch-Up",
    categoryId: "car-denting-painting",
    category: { id: "car-denting-painting", name: "Car Denting & Painting", slug: "car-denting-painting" },
    defaultPrice: 999,
    description: "Plastic bumper clip replacement, heat reshaping of fender arch, multi-stage compound buffing, and clearcoat touch-up.",
    durationMinutes: 75,
    rating: 4.92,
    reviewsCount: 224,
  },
  {
    id: "srv-dent-3",
    title: "Single Panel (Door/Fender) Primer, Basecoat & Clearcoat Paint",
    categoryId: "car-denting-painting",
    category: { id: "car-denting-painting", name: "Car Denting & Painting", slug: "car-denting-painting" },
    defaultPrice: 1899,
    description: "Computerized spectrophotometer color matching, anti-rust zinc primer, OEM acrylic basecoat, and high-gloss 2K clearcoat.",
    durationMinutes: 120,
    rating: 4.96,
    reviewsCount: 195,
  },
  {
    id: "srv-dent-4",
    title: "Running Board & Door Sill Plate Dent Pulling",
    categoryId: "car-denting-painting",
    category: { id: "car-denting-painting", name: "Car Denting & Painting", slug: "car-denting-painting" },
    defaultPrice: 899,
    description: "Spot stud welder pulling for lower sill damage, underbody anti-stone chip coating, and smooth filler contouring.",
    durationMinutes: 60,
    rating: 4.88,
    reviewsCount: 140,
  },
  {
    id: "srv-dent-5",
    title: "Full Car Exterior Dual-Action Machine Polish & Glaze",
    categoryId: "car-denting-painting",
    category: { id: "car-denting-painting", name: "Car Denting & Painting", slug: "car-denting-painting" },
    defaultPrice: 1499,
    description: "Swirl mark elimination with micro-abrasive foam pad, carnauba wax sealing, and deep mirror gloss paint enhancement.",
    durationMinutes: 90,
    rating: 4.94,
    reviewsCount: 182,
  },
  {
    id: "srv-dent-6",
    title: "Bonnet / Engine Hood Stone Chip Repair & Color Blend",
    categoryId: "car-denting-painting",
    category: { id: "car-denting-painting", name: "Car Denting & Painting", slug: "car-denting-painting" },
    defaultPrice: 1199,
    description: "Micro-pipette paint chip fill, 2000-grit wet leveling, optical clearcoat spot burn-in, and high-friction buff.",
    durationMinutes: 60,
    rating: 4.91,
    reviewsCount: 128,
  },

  // 12. Windshield & Glass Care (windshield-lights-care)
  {
    id: "srv-glass-1",
    title: "Windshield Crack Resin Repair & Stone-Chip Stop Drilling",
    categoryId: "windshield-lights-care",
    category: { id: "windshield-lights-care", name: "Windshield & Glass Care", slug: "windshield-lights-care" },
    defaultPrice: 399,
    description: "Vacuum UV optical resin injection for stone-chip star cracks, bullseyes, and stopping crack lines from spreading.",
    durationMinutes: 40,
    rating: 4.94,
    reviewsCount: 230,
  },
  {
    id: "srv-glass-2",
    title: "Headlight Lens De-Oxidizing, Yellowing Removal & Ceramic Seal",
    categoryId: "windshield-lights-care",
    category: { id: "windshield-lights-care", name: "Windshield & Glass Care", slug: "windshield-lights-care" },
    defaultPrice: 499,
    description: "Multi-grit wet sanding to strip cloudy oxidation, diamond compound buffing, and UV ceramic headlight sealant.",
    durationMinutes: 45,
    rating: 4.96,
    reviewsCount: 285,
  },
  {
    id: "srv-glass-3",
    title: "Car Power Window Motor & Regulator Cable Triage",
    categoryId: "windshield-lights-care",
    category: { id: "windshield-lights-care", name: "Windshield & Glass Care", slug: "windshield-lights-care" },
    defaultPrice: 449,
    description: "Door panel dismantling, tangled cable pulley realign, electric motor gear lubricate, and smooth glass channel guide.",
    durationMinutes: 50,
    rating: 4.89,
    reviewsCount: 174,
  },
  {
    id: "srv-glass-4",
    title: "Frameless Wiper Blade Replacement & Washer Jet De-clog",
    categoryId: "windshield-lights-care",
    category: { id: "windshield-lights-care", name: "Windshield & Glass Care", slug: "windshield-lights-care" },
    defaultPrice: 249,
    description: "Aerodynamic silicone wiper blade fitting, washer fluid reservoir flush, and spray nozzle angle calibration.",
    durationMinutes: 20,
    rating: 4.91,
    reviewsCount: 155,
  },
  {
    id: "srv-glass-5",
    title: "Rear Defogger Grid Line Continuity Test & Conductive Repair",
    categoryId: "windshield-lights-care",
    category: { id: "windshield-lights-care", name: "Windshield & Glass Care", slug: "windshield-lights-care" },
    defaultPrice: 349,
    description: "Digital multimeter continuity check, silver conductive trace paste bridge for broken lines, and fast mist clearing test.",
    durationMinutes: 35,
    rating: 4.87,
    reviewsCount: 112,
  },
  {
    id: "srv-glass-6",
    title: "Side Window Glass Channel Rubber Alignment & Anti-Rattle Fix",
    categoryId: "windshield-lights-care",
    category: { id: "windshield-lights-care", name: "Windshield & Glass Care", slug: "windshield-lights-care" },
    defaultPrice: 299,
    description: "Velvet felt channel cleaning, dry silicone spray lubricant, and window glass vibration stopper adjustment.",
    durationMinutes: 30,
    rating: 4.9,
    reviewsCount: 126,
  },

  // 13. Two-Wheeler Repair & Care (two-wheeler-repair)
  {
    id: "srv-bike-1",
    title: "Full Bike General Tune-Up, Oil Refill & Brake Cleaning",
    categoryId: "two-wheeler-repair",
    category: { id: "two-wheeler-repair", name: "Two-Wheeler Repair & Care", slug: "two-wheeler-repair" },
    defaultPrice: 499,
    description: "Engine oil change, spark plug clean, carburetor tune, brake drum scrub, chain lube, and full 25-point bike check.",
    durationMinutes: 45,
    rating: 4.96,
    reviewsCount: 380,
  },
  {
    id: "srv-bike-2",
    title: "Drive Chain Deep Cleaning & High-Tack O-Ring Lubrication",
    categoryId: "two-wheeler-repair",
    category: { id: "two-wheeler-repair", name: "Two-Wheeler Repair & Care", slug: "two-wheeler-repair" },
    defaultPrice: 199,
    description: "Kerosene / chain cleaner agitation, grime brush scrub, slack tensioning, and high-temp synthetic chain lube spray.",
    durationMinutes: 25,
    rating: 4.93,
    reviewsCount: 290,
  },
  {
    id: "srv-bike-3",
    title: "Carburetor Clean & Spark Plug Replacement",
    categoryId: "two-wheeler-repair",
    category: { id: "two-wheeler-repair", name: "Two-Wheeler Repair & Care", slug: "two-wheeler-repair" },
    defaultPrice: 299,
    description: "Fuel jet needle de-clogging, float chamber drain, air-fuel screw tuning for mileage, and laser iridium spark plug.",
    durationMinutes: 35,
    rating: 4.91,
    reviewsCount: 215,
  },
  {
    id: "srv-bike-4",
    title: "Scooter Automatic CVT Belt & Variator Roller Inspection",
    categoryId: "two-wheeler-repair",
    category: { id: "two-wheeler-repair", name: "Two-Wheeler Repair & Care", slug: "two-wheeler-repair" },
    defaultPrice: 399,
    description: "CVT clutch cover removal, clutch shoe dust blow, drive belt wear check, and variator roller grease service.",
    durationMinutes: 40,
    rating: 4.89,
    reviewsCount: 175,
  },
  {
    id: "srv-bike-5",
    title: "Front Fork Hydraulic Suspension Oil & Bushing Overhaul",
    categoryId: "two-wheeler-repair",
    category: { id: "two-wheeler-repair", name: "Two-Wheeler Repair & Care", slug: "two-wheeler-repair" },
    defaultPrice: 549,
    description: "Fork oil seal replacement, hydraulic fork oil top-up, stanchion scratch buffing, and smooth rebound damping.",
    durationMinutes: 50,
    rating: 4.92,
    reviewsCount: 144,
  },
  {
    id: "srv-bike-6",
    title: "Bike Clutch Cable & Accelerator Wire Replacement",
    categoryId: "two-wheeler-repair",
    category: { id: "two-wheeler-repair", name: "Two-Wheeler Repair & Care", slug: "two-wheeler-repair" },
    defaultPrice: 179,
    description: "Smooth friction-free inner wire routing, clutch lever play adjustment, and silicone throttle tube lubrication.",
    durationMinutes: 20,
    rating: 4.88,
    reviewsCount: 132,
  },

  // 14. Tyres, Wheels & Puncture Care (tyres-wheel-care)
  {
    id: "srv-tyre-1",
    title: "Doorstep Tubeless Tyre Puncture Repair & Mushroom Plug",
    categoryId: "tyres-wheel-care",
    category: { id: "tyres-wheel-care", name: "Tyres, Wheels & Puncture Care", slug: "tyres-wheel-care" },
    defaultPrice: 199,
    description: "Permanent internal vulcanizing mushroom plug, rim bead seal inspection, nail removal, and digital PSI inflation.",
    durationMinutes: 20,
    rating: 4.97,
    reviewsCount: 410,
  },
  {
    id: "srv-tyre-2",
    title: "Computerized Dynamic Wheel Balancing (Set of 4)",
    categoryId: "tyres-wheel-care",
    category: { id: "tyres-wheel-care", name: "Tyres, Wheels & Puncture Care", slug: "tyres-wheel-care" },
    defaultPrice: 449,
    description: "High-speed wheel spinner calibration, adhesive zinc weight clip mounting, and high-speed steering wobble fix.",
    durationMinutes: 40,
    rating: 4.93,
    reviewsCount: 260,
  },
  {
    id: "srv-tyre-3",
    title: "Tyre Valve Stem Replacement & Nitrogen Air Inflation",
    categoryId: "tyres-wheel-care",
    category: { id: "tyres-wheel-care", name: "Tyres, Wheels & Puncture Care", slug: "tyres-wheel-care" },
    defaultPrice: 149,
    description: "Brass valve pin swap, rubber stem core change to stop slow rim leakage, and 99.5% dry nitrogen gas inflation.",
    durationMinutes: 15,
    rating: 4.89,
    reviewsCount: 180,
  },
  {
    id: "srv-tyre-4",
    title: "Emergency Roadside Spare Stepney Wheel Swapping",
    categoryId: "tyres-wheel-care",
    category: { id: "tyres-wheel-care", name: "Tyres, Wheels & Puncture Care", slug: "tyres-wheel-care" },
    defaultPrice: 249,
    description: "Hydraulic jack lifting, wheel lug nut cross-pattern torque tightening, and flat tyre boot stowage.",
    durationMinutes: 20,
    rating: 4.95,
    reviewsCount: 298,
  },
  {
    id: "srv-tyre-5",
    title: "4-Wheel Cross Rotation & Tread Depth Wear Assessment",
    categoryId: "tyres-wheel-care",
    category: { id: "tyres-wheel-care", name: "Tyres, Wheels & Puncture Care", slug: "tyres-wheel-care" },
    defaultPrice: 299,
    description: "Even tyre wear extension, digital tread depth gauge reading, and asymmetric tyre direction alignment.",
    durationMinutes: 30,
    rating: 4.9,
    reviewsCount: 165,
  },

  // 15. Detailing, Foam Wash & Spa (detailing-wash-spa)
  {
    id: "srv-spa-1",
    title: "Doorstep High-Pressure Snow Foam Wash & Vacuuming",
    categoryId: "detailing-wash-spa",
    category: { id: "detailing-wash-spa", name: "Detailing, Foam Wash & Spa", slug: "detailing-wash-spa" },
    defaultPrice: 699,
    description: "pH-neutral foam lance pre-soak, microfiber two-bucket mitt wash, high-flow rinse, and high-suction interior vacuum.",
    durationMinutes: 45,
    rating: 4.96,
    reviewsCount: 350,
  },
  {
    id: "srv-spa-2",
    title: "Deep Interior Upholstery Dry-Cleaning & Dashboard Dressing",
    categoryId: "detailing-wash-spa",
    category: { id: "detailing-wash-spa", name: "Detailing, Foam Wash & Spa", slug: "detailing-wash-spa" },
    defaultPrice: 1199,
    description: "Fabric seat stain extraction, roof liner steam wipe, AC vent brush de-dust, and matte UV dashboard protectant.",
    durationMinutes: 75,
    rating: 4.94,
    reviewsCount: 245,
  },
  {
    id: "srv-spa-3",
    title: "9H Ceramic Coating Polish & Hydrophobic Paint Protection",
    categoryId: "detailing-wash-spa",
    category: { id: "detailing-wash-spa", name: "Detailing, Foam Wash & Spa", slug: "detailing-wash-spa" },
    defaultPrice: 2499,
    description: "Clay bar decontamination, single-step machine polish, and SiO2 nano-ceramic coating with extreme water beading.",
    durationMinutes: 120,
    rating: 4.97,
    reviewsCount: 185,
  },
  {
    id: "srv-spa-4",
    title: "Engine Bay Deep Degreasing & Anti-Rust Silicone Shield",
    categoryId: "detailing-wash-spa",
    category: { id: "detailing-wash-spa", name: "Detailing, Foam Wash & Spa", slug: "detailing-wash-spa" },
    defaultPrice: 499,
    description: "Sensor safe electrical cover, non-caustic grease solvent spray, brush agitation, and heat-resistant silicone dressing.",
    durationMinutes: 35,
    rating: 4.88,
    reviewsCount: 140,
  },
  {
    id: "srv-spa-5",
    title: "Leather Seat Conditioning & Interior Ozone Odor Elimination",
    categoryId: "detailing-wash-spa",
    category: { id: "detailing-wash-spa", name: "Detailing, Foam Wash & Spa", slug: "detailing-wash-spa" },
    defaultPrice: 649,
    description: "pH balanced leather balm deep conditioning to prevent cracking, followed by 15-minute ozone antibacterial cabin deodorization.",
    durationMinutes: 40,
    rating: 4.92,
    reviewsCount: 160,
  },

  // 16. Brakes, Clutch & Suspension (brakes-clutch-suspension)
  {
    id: "srv-brakes-1",
    title: "Front & Rear Ceramic Brake Pad Replacement & Caliper Pin Grease",
    categoryId: "brakes-clutch-suspension",
    category: { id: "brakes-clutch-suspension", name: "Brakes, Clutch & Suspension", slug: "brakes-clutch-suspension" },
    defaultPrice: 599,
    description: "Low-dust ceramic brake pads, anti-squeal shims, caliper pin synthetic grease, and DOT-4 brake fluid level check.",
    durationMinutes: 45,
    rating: 4.95,
    reviewsCount: 275,
  },
  {
    id: "srv-brakes-2",
    title: "Clutch Cable, Friction Plate & Release Bearing Overhaul",
    categoryId: "brakes-clutch-suspension",
    category: { id: "brakes-clutch-suspension", name: "Brakes, Clutch & Suspension", slug: "brakes-clutch-suspension" },
    defaultPrice: 899,
    description: "Hard clutch pedal troubleshooting, flywheel face check, pressure plate alignment, and free-play calibration.",
    durationMinutes: 60,
    rating: 4.91,
    reviewsCount: 198,
  },
  {
    id: "srv-brakes-3",
    title: "Suspension Strut, Link Rod & Bushing Inspection",
    categoryId: "brakes-clutch-suspension",
    category: { id: "brakes-clutch-suspension", name: "Brakes, Clutch & Suspension", slug: "brakes-clutch-suspension" },
    defaultPrice: 699,
    description: "Hydraulic strut leak test, stabilizer bar bushing check, tie-rod end ball joint play assessment, and thud noise diagnostic.",
    durationMinutes: 50,
    rating: 4.9,
    reviewsCount: 165,
  },
  {
    id: "srv-brakes-4",
    title: "Handbrake Cable Tensioning & Rear Drum Shoe Adjustment",
    categoryId: "brakes-clutch-suspension",
    category: { id: "brakes-clutch-suspension", name: "Brakes, Clutch & Suspension", slug: "brakes-clutch-suspension" },
    defaultPrice: 349,
    description: "Parking brake ratchet lever click adjustment, brake drum dust cleaning, and firm slope holding test.",
    durationMinutes: 30,
    rating: 4.88,
    reviewsCount: 145,
  },
  {
    id: "srv-brakes-5",
    title: "Brake Fluid Flush & Air Bleeding Service",
    categoryId: "brakes-clutch-suspension",
    category: { id: "brakes-clutch-suspension", name: "Brakes, Clutch & Suspension", slug: "brakes-clutch-suspension" },
    defaultPrice: 449,
    description: "Moisture-contaminated hydraulic brake oil vacuum extraction, fresh DOT-4 fluid flush, and zero spongy pedal air bleed.",
    durationMinutes: 35,
    rating: 4.93,
    reviewsCount: 158,
  },
];

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenAuthModal }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL state synchronization
  const initialCategory = searchParams.get("category") || "ALL";
  const initialSearch = searchParams.get("search") || "";

  const { t, tc, ts, language } = useLanguage();

  // Local filter states
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("ALL");
  const [instantDispatchOnly, setInstantDispatchOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 15;

  // Selected service for booking modal
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // Sync state if URL changes externally
  useEffect(() => {
    const cat = searchParams.get("category") || "ALL";
    const srch = searchParams.get("search") || "";
    setSelectedCategory(cat);
    setSearchQuery(srch);
  }, [searchParams]);

  // Backend API query
  const {
    data: categoriesData,
    isLoading: catLoading,
  } = useGetCategoriesQuery();

  const {
    data: servicesData,
    isLoading: servicesLoading,
    isError: servicesError,
    refetch,
  } = useGetServicesQuery({
    categoryId: selectedCategory !== "ALL" ? selectedCategory : undefined,
  });

  // Base services pool (API data or rich fallback catalog)
  const allServices: Service[] = useMemo(() => {
    if (servicesData?.data && servicesData.data.length > 0) {
      return servicesData.data.map((srv, idx) => ({
        ...srv,
        description:
          srv.description ||
          "Professional doorstep execution by verified local technicians with genuine parts and standardized post-service inspection.",
        durationMinutes: srv.durationMinutes || 45,
        rating: srv.rating || 4.9,
        reviewsCount: srv.reviewsCount || 100 + idx * 15,
        image: getServiceImage(srv.title, srv.category?.slug, srv.image),
      }));
    }
    return fallbackCatalog.map((srv) => ({
      ...srv,
      image: getServiceImage(srv.title, srv.category?.slug, srv.image),
    }));
  }, [servicesData]);

  // Categories list
  const categoriesList = useMemo(() => {
    if (categoriesData?.data && categoriesData.data.length > 0) {
      return [
        { id: "ALL", name: "All Categories", count: allServices.length },
        ...categoriesData.data.map((c) => ({
          id: c.id,
          name: c.name,
          count: allServices.filter(
            (s) => s.categoryId === c.id || s.category?.id === c.id
          ).length,
        })),
      ];
    }
    return [
      { id: "ALL", name: "All Categories", count: fallbackCatalog.length },
      { id: "mechanic", name: "Auto & Garage Repair", count: 6 },
      { id: "electrician", name: "Electrician", count: 6 },
      { id: "plumbing", name: "Plumbing", count: 6 },
      { id: "ac-repair", name: "AC Repair & Service", count: 6 },
      { id: "appliance", name: "Appliance Repair", count: 6 },
      { id: "cleaning", name: "Deep Cleaning", count: 6 },
      { id: "painting", name: "Painting & Waterproofing", count: 6 },
      { id: "carpentry", name: "Carpentry & Woodwork", count: 6 },
      { id: "cctv-security", name: "CCTV & Smart Security", count: 6 },
      { id: "ro-water-purifier", name: "RO Water Purifier Care", count: 6 },
      { id: "car-denting-painting", name: "Car Denting & Painting", count: 6 },
      { id: "windshield-lights-care", name: "Windshield & Glass Care", count: 6 },
      { id: "two-wheeler-repair", name: "Two-Wheeler Repair & Care", count: 6 },
      { id: "tyres-wheel-care", name: "Tyres & Wheel Care", count: 5 },
      { id: "detailing-wash-spa", name: "Detailing & Spa", count: 5 },
      { id: "brakes-clutch-suspension", name: "Brakes & Suspension", count: 5 },
    ];
  }, [categoriesData, allServices]);

  // Handler for category selection
  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
    const nextParams = new URLSearchParams(searchParams);
    if (catId === "ALL") {
      nextParams.delete("category");
    } else {
      nextParams.set("category", catId);
    }
    setSearchParams(nextParams);
  };

  // Immediate input update for ultra-smooth typing responsiveness
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Debounced URL search param synchronization (avoids thrashing router on every key)
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentSearchInUrl = searchParams.get("search") || "";
      const trimmed = searchQuery.trim();
      if (currentSearchInUrl !== trimmed) {
        const nextParams = new URLSearchParams(searchParams);
        if (trimmed) {
          nextParams.set("search", trimmed);
        } else {
          nextParams.delete("search");
        }
        setSearchParams(nextParams, { replace: true });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, searchParams, setSearchParams]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory("ALL");
    setSearchQuery("");
    setSelectedPriceRange("ALL");
    setInstantDispatchOnly(false);
    setSortBy("featured");
    setCurrentPage(1);
    setSearchParams({});
  };

  // Filtered and sorted services
  const filteredServices = useMemo(() => {
    return allServices
      .filter((srv) => {
        // Category filter
        if (selectedCategory !== "ALL") {
          const matchCatId = srv.categoryId === selectedCategory;
          const matchSlug =
            srv.category?.slug?.toLowerCase() === selectedCategory.toLowerCase();
          const matchName =
            srv.category?.name?.toLowerCase() === selectedCategory.toLowerCase();
          if (!matchCatId && !matchSlug && !matchName) return false;
        }

        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const titleMatch = srv.title.toLowerCase().includes(q);
          const descMatch = (srv.description || "").toLowerCase().includes(q);
          const catMatch = (srv.category?.name || "").toLowerCase().includes(q);
          if (!titleMatch && !descMatch && !catMatch) return false;
        }

        // Price range filter
        const price = Number(srv.defaultPrice);
        if (selectedPriceRange === "UNDER_250" && price >= 250) return false;
        if (
          selectedPriceRange === "250_TO_500" &&
          (price < 250 || price > 500)
        )
          return false;
        if (
          selectedPriceRange === "500_TO_1000" &&
          (price < 500 || price > 1000)
        )
          return false;
        if (selectedPriceRange === "ABOVE_1000" && price <= 1000) return false;

        // Instant dispatch filter
        if (instantDispatchOnly && (srv.durationMinutes || 0) > 40) return false;

        return true;
      })
      .sort((a, b) => {
        const priceA = Number(a.defaultPrice);
        const priceB = Number(b.defaultPrice);
        if (sortBy === "price_asc") return priceA - priceB;
        if (sortBy === "price_desc") return priceB - priceA;
        if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
        if (sortBy === "duration")
          return (a.durationMinutes || 0) - (b.durationMinutes || 0);
        return 0; // featured default
      });
  }, [
    allServices,
    selectedCategory,
    searchQuery,
    selectedPriceRange,
    instantDispatchOnly,
    sortBy,
  ]);

  // Paginated items
  const totalPages = Math.ceil(filteredServices.length / pageSize) || 1;
  const paginatedServices = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredServices.slice(startIndex, startIndex + pageSize);
  }, [filteredServices, currentPage, pageSize]);

  return (
    <div className="relative bg-[#F8F7F3] dark:bg-[#070605] text-[#252621] dark:text-[#F5F2EB] min-h-screen pb-24 transition-colors">
      {/* Ambient Top Glow Mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1560px] h-96 bg-gradient-to-b from-[#FF771C]/15 via-[#FF771C]/5 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* ========================================================= */}
      {/* 01 BREADCRUMB & HERO HEADER SECTION                       */}
      {/* ========================================================= */}
      <div className="border-b border-[#E7E5DF] dark:border-[#221B16] bg-white/60 dark:bg-[#120F0D]/70 backdrop-blur-md relative z-10">
        <div className="max-w-[1560px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-medium text-[#717167] dark:text-[#9E9488]">
            <Link to="/" className="hover:text-[#FF771C] transition-colors">
              {t("common.home")}
            </Link>
            <span>/</span>
            <span className="text-[#FF771C] font-semibold">
              {t("servicesPage.allServices")}
            </span>
          </nav>

          {/* Title Badge & Heading Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              {/* Trust Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF771C]/10 dark:bg-[#FF771C]/15 border border-[#FF771C]/30 text-[#FF771C] text-xs font-bold tracking-wide shadow-sm">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#FF771C]" />
                <span>
                  {language === "hi"
                    ? "सत्यापित मैकेनिक व पेशेवर तकनीशियन"
                    : "Standardized Doorstep & Emergency Services"}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-[#252621] dark:text-[#F5F2EB] leading-[1.2]">
                {language === "hi" ? "विश्वसनीय होम व ऑटो " : "Reliable Home & Auto "}
                <span className="bg-gradient-to-r from-[#FF771C] via-[#FFA463] to-[#FF771C] bg-clip-text text-transparent">
                  {language === "hi" ? "रिपेयर सेवाएं" : "Repair Services"}
                </span>
              </h1>

              <p className="text-sm text-[#717167] dark:text-[#A89E92] leading-relaxed">
                {t("servicesPage.headerSubtitle")}
              </p>
            </div>

            {/* Glowing Top Search Input */}
            <div className="w-full lg:w-96">
              <div className="relative group">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#FF771C] pointer-events-none transition-transform group-focus-within:scale-110" />
                <input
                  type="text"
                  placeholder={t("servicesPage.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white dark:bg-[#181411] border border-[#E7E5DF] dark:border-[#2D241E] text-xs sm:text-sm text-[#252621] dark:text-[#F5F2EB] placeholder:text-[#8F8F85] focus:outline-none focus:ring-4 focus:ring-[#FF771C]/15 focus:border-[#FF771C] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => handleSearchChange("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-[#8F8F85] hover:text-[#252621] dark:hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Category Chips Strip */}
          <div className="pt-2 border-t border-[#E7E5DF]/60 dark:border-[#221B16] flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {quickChips.map((chip) => {
              const Icon = chip.icon;
              const isActive = selectedCategory === chip.id;
              return (
                <button
                  key={chip.id}
                  onClick={() => handleCategoryChange(chip.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-[#FF771C] to-[#E56814] text-white shadow-[0_4px_16px_rgba(255,119,28,0.4)] scale-[1.03]"
                      : "bg-white/80 dark:bg-[#181411] text-[#717167] dark:text-[#9E9488] hover:text-[#252621] dark:hover:text-white border border-[#E7E5DF] dark:border-[#2B231D] hover:border-[#FF771C]/40"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-[#FF771C]"}`} />
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Layout: Left Filters Sidebar + Right Grid */}
      <div className="max-w-[1560px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Mobile Filter Toggle & Sort Header */}
        <div className="lg:hidden flex items-center justify-between pb-4 mb-4 border-b border-[#E7E5DF] dark:border-[#2B231D]">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Filter className="w-4 h-4 text-[#E87532]" />}
            onClick={() => setMobileFilterOpen(true)}
            className="text-xs font-bold"
          >
            {t("common.filters")}{" "}
            {selectedCategory !== "ALL" || selectedPriceRange !== "ALL"
              ? ` • ${t("servicesPage.active")}`
              : ""}
          </Button>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#717167]">{t("common.sort")}:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] rounded-lg px-2.5 py-1 text-xs font-semibold text-[#252621] dark:text-[#F5F2EB] focus:outline-none"
            >
              <option value="featured">{t("servicesPage.featured")}</option>
              <option value="price_asc">{t("servicesPage.priceLowHigh")}</option>
              <option value="price_desc">{t("servicesPage.priceHighLow")}</option>
              <option value="rating">{t("servicesPage.rating")}</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-start relative">
          {/* ========================================================= */}
          {/* 02 LEFT FILTERS SIDEBAR (Desktop) - STICKY                */}
          {/* ========================================================= */}
          <aside className="hidden lg:block w-56 xl:w-64 shrink-0 sticky top-20 self-start z-20">
            <div className="p-4.5 sm:p-5 rounded-3xl bg-white dark:bg-[#14100D] border border-[#E7E5DF] dark:border-[#261E18] shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] space-y-5 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin">
              {/* Header & Reset */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E7E5DF] dark:border-[#261E18]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/10 dark:bg-[#FF771C]/15 border border-[#FF771C]/25 flex items-center justify-center text-[#FF771C]">
                    <SlidersHorizontal className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-[#252621] dark:text-[#F5F2EB]">
                      {t("common.filters")}
                    </h3>
                    <p className="text-[10px] text-[#8F8F85]">
                      {filteredServices.length} {t("servicesPage.servicesCount")}
                    </p>
                  </div>
                </div>
                {(selectedCategory !== "ALL" ||
                  selectedPriceRange !== "ALL" ||
                  instantDispatchOnly ||
                  searchQuery) && (
                  <button
                    onClick={resetFilters}
                    className="text-[11px] font-bold text-[#FF771C] hover:text-[#E56814] flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-50 dark:bg-[#23170E] border border-orange-200/60 dark:border-[#FF771C]/30 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    {t("common.clear")}
                  </button>
                )}
              </div>

              {/* Instant Dispatch Toggle Card */}
              <div
                onClick={() => setInstantDispatchOnly(!instantDispatchOnly)}
                className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer select-none ${
                  instantDispatchOnly
                    ? "bg-gradient-to-br from-emerald-500/10 to-teal-500/5 dark:from-emerald-950/40 dark:to-teal-950/20 border-emerald-500/40 shadow-[0_4px_16px_rgba(16,185,129,0.15)]"
                    : "bg-[#F8F7F3] dark:bg-[#1A1410] border-[#E7E5DF] dark:border-[#261E18] hover:border-[#FF771C]/30"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <div>
                      <p className="text-xs font-extrabold text-[#252621] dark:text-[#F5F2EB]">
                        {t("servicesPage.instantDispatch")}
                      </p>
                      <p className="text-[10px] text-[#717167] dark:text-[#9E9488]">
                        {t("servicesPage.instantDispatchSub")}
                      </p>
                    </div>
                  </div>
                  {/* Switch Pill */}
                  <div
                    className={`w-9 h-5 rounded-full transition-colors relative flex items-center p-0.5 ${
                      instantDispatchOnly
                        ? "bg-emerald-500 justify-end"
                        : "bg-[#D8D5CD] dark:bg-[#342A22] justify-start"
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-white shadow-sm transition-all" />
                  </div>
                </div>
              </div>

              {/* All Categories Filter */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-[#8F8F85] dark:text-[#9E9488]">
                    {t("categories.allCategories")}
                  </h4>
                  <span className="text-[10px] font-semibold text-[#8F8F85]">
                    {categoriesList.length}
                  </span>
                </div>
                <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1 scrollbar-thin">
                  {categoriesList.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    const IconComp = getCategoryIcon(cat.id);
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 group ${
                          isSelected
                            ? "bg-gradient-to-r from-[#FF771C] to-[#E56814] text-white shadow-[0_4px_16px_rgba(255,119,28,0.35)] scale-[1.02]"
                            : "text-[#717167] dark:text-[#9E9488] hover:bg-[#F8F7F3] dark:hover:bg-[#1F1813] hover:text-[#252621] dark:hover:text-[#F5F2EB]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <IconComp
                            className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                              isSelected ? "text-white" : "text-[#FF771C]"
                            }`}
                          />
                          <span className="truncate">{tc(cat.name)}</span>
                        </div>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold ml-2 shrink-0 ${
                            isSelected
                              ? "bg-white/20 text-white"
                              : "bg-[#EFECE6] dark:bg-[#251E17] text-[#8F8F85] group-hover:text-[#252621] dark:group-hover:text-white"
                          }`}
                        >
                          {cat.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Filter */}
              <div className="space-y-3 pt-3 border-t border-[#E7E5DF] dark:border-[#261E18]">
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-[#8F8F85] dark:text-[#9E9488]">
                  {t("servicesPage.priceRange")}
                </h4>
                <div className="grid grid-cols-1 gap-1.5 text-xs">
                  {[
                    { id: "ALL", label: t("servicesPage.allPrices") },
                    { id: "UNDER_250", label: t("servicesPage.under250") },
                    { id: "250_TO_500", label: t("servicesPage.p250to500") },
                    { id: "500_TO_1000", label: t("servicesPage.p500to1000") },
                    { id: "ABOVE_1000", label: t("servicesPage.above1000") },
                  ].map((range) => {
                    const isSelected = selectedPriceRange === range.id;
                    return (
                      <button
                        key={range.id}
                        type="button"
                        onClick={() => {
                          setSelectedPriceRange(range.id);
                          setCurrentPage(1);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-bold transition-all ${
                          isSelected
                            ? "bg-orange-50 dark:bg-[#2A1A10] text-[#FF771C] border border-[#FF771C]/50"
                            : "bg-[#F8F7F3]/70 dark:bg-[#1A1410] border border-transparent text-[#717167] dark:text-[#9E9488] hover:text-[#252621] dark:hover:text-[#F5F2EB] hover:bg-[#F0EDE6] dark:hover:bg-[#221A15]"
                        }`}
                      >
                        <span>{range.label}</span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#FF771C] shadow-[0_0_8px_#FF771C]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Guarantee Highlight Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent dark:from-[#2A180E] dark:to-[#17100B] border border-orange-500/20 dark:border-[#FF771C]/25 space-y-2 relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-[#FF771C]/10 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF771C]">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>{t("servicesPage.doorstepWarranty")}</span>
                </div>
                <p className="text-[11px] text-[#717167] dark:text-[#B3A99B] leading-relaxed">
                  {t("servicesPage.warrantyDesc")}
                </p>
                <div className="pt-2 border-t border-orange-500/15 flex items-center justify-between text-[10px] font-semibold text-[#8F8F85]">
                  <span>✓ 100% Genuine Spares</span>
                  <span>✓ Verified Pros</span>
                </div>
              </div>
            </div>
          </aside>

          {/* ========================================================= */}
          {/* 03 RIGHT CONTENT: SERVICE CARDS GRID                      */}
          {/* ========================================================= */}
          <main className="flex-1 min-w-0 space-y-6">
            {/* Top Toolbar: Active Filters & Sort */}
            <div className="p-4 rounded-3xl bg-white dark:bg-[#14100D] border border-[#E7E5DF] dark:border-[#261E18] shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex flex-wrap items-center justify-between gap-4">
              {/* Active Filter Chips */}
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="text-[#717167] dark:text-[#9E9488] font-bold">
                  {t("servicesPage.showing")}{" "}
                  <strong className="text-[#252621] dark:text-[#F5F2EB] font-black">
                    {filteredServices.length}
                  </strong>{" "}
                  {t("servicesPage.servicesCount")}
                </span>

                {selectedCategory !== "ALL" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-500/10 text-[#FF771C] border border-[#FF771C]/30 text-[11px] font-bold">
                    {t("servicesPage.category")}:{" "}
                    {tc(categoriesList.find((c) => c.id === selectedCategory)?.name ||
                      selectedCategory)}
                    <button
                      onClick={() => handleCategoryChange("ALL")}
                      className="hover:text-red-500 ml-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {selectedPriceRange !== "ALL" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-500/10 text-[#FF771C] border border-[#FF771C]/30 text-[11px] font-bold">
                    {t("servicesPage.priceRange")}: {selectedPriceRange.replace(/_/g, " ")}
                    <button
                      onClick={() => setSelectedPriceRange("ALL")}
                      className="hover:text-red-500 ml-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {instantDispatchOnly && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {t("servicesPage.instantDispatch")}
                    <button
                      onClick={() => setInstantDispatchOnly(false)}
                      className="hover:text-red-500 ml-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
              </div>

              {/* Desktop Sort Dropdown */}
              <div className="hidden lg:flex items-center gap-2 text-xs">
                <span className="text-[#8F8F85] font-semibold">
                  {t("common.sort")}:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#F8F7F3] dark:bg-[#1A1410] border border-[#E7E5DF] dark:border-[#261E18] rounded-xl px-3 py-1.5 text-xs font-bold text-[#252621] dark:text-[#F5F2EB] focus:outline-none focus:border-[#FF771C] transition-colors"
                >
                  <option value="featured">{t("servicesPage.featured")}</option>
                  <option value="price_asc">{t("servicesPage.priceLowHigh")}</option>
                  <option value="price_desc">{t("servicesPage.priceHighLow")}</option>
                  <option value="rating">{t("servicesPage.rating")}</option>
                </select>
              </div>
            </div>

            {/* Service Cards Grid (or Loading / Error / Empty States) */}
            {servicesLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#14100D] border border-[#E7E5DF] dark:border-[#261E18] shadow-subtle space-y-4"
                  >
                    <Skeleton className="h-44 w-full rounded-xl" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <div className="flex justify-between items-center pt-3 border-t border-[#E7E5DF] dark:border-[#261E18]">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-8 w-24 rounded-xl" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (servicesError && allServices.length === 0) ? (
              /* Error State */
              <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#14100D] border border-rose-200 dark:border-rose-900/50 shadow-card space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
                  <AlertCircle className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
                  Unable to load services right now
                </h3>
                <p className="text-xs text-[#717167] dark:text-[#9E9488] max-w-sm mx-auto">
                  There was an issue connecting to the service catalog. Please verify your connection or try again.
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => refetch()}
                  className="font-bold shadow-orange-glow"
                >
                  {t("servicesPage.retry")}
                </Button>
              </div>
            ) : paginatedServices.length > 0 ? (
              /* Active Services Grid - Proportional 3-Column Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4.5 sm:gap-5">
                {paginatedServices.map((service) => (
                  <div
                    key={service.id}
                    className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#15110E] border border-[#E7E5DF] dark:border-[#261E18] shadow-sm hover:shadow-md dark:shadow-none hover:border-[#FF771C]/50 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
                  >
                    <div>
                      {/* Card Thumbnail Image with Floating Badges */}
                      <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-[#1F1813] mb-3">
                        <img
                          src={service.image || DEFAULT_FALLBACK_IMAGE}
                          alt={service.title}
                          onError={handleImageError}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        {/* Dark Vignette Overlay for Crisp Contrast */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                        {/* Top-Left Verified Badge */}
                        <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/80 border border-white/15 text-[11px] font-bold text-white flex items-center gap-1.5 shadow-sm">
                          <Shield className="w-3.5 h-3.5 text-[#FF771C]" />
                          <span>Verified Pro</span>
                        </div>

                        {/* Top-Right Glass Rating Pill */}
                        <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/85 border border-white/15 text-xs font-bold text-white flex items-center gap-1 shadow-sm">
                          <Star className="w-3.5 h-3.5 fill-[#FF771C] text-[#FF771C]" />
                          <span>{service.rating || 4.9}</span>
                          <span className="text-white/60 font-medium text-[11px]">
                            ({service.reviewsCount || 120})
                          </span>
                        </div>

                        {/* Bottom Floating Info Over Image */}
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5">
                          <span className="text-[11px] font-extrabold uppercase tracking-wide text-white bg-[#FF771C] px-2.5 py-0.5 rounded-full shadow-sm truncate max-w-[72%]">
                            {tc(service.category?.name || "Service")}
                          </span>
                          <div className="px-2.5 py-0.5 rounded-full bg-black/80 text-[11px] text-white/90 font-semibold flex items-center gap-1 border border-white/10 shrink-0">
                            <Clock className="w-3.5 h-3.5 text-[#FF771C]" />
                            <span>{service.durationMinutes || 45} {t("common.mins")}</span>
                          </div>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-[17px] font-bold font-display text-[#252621] dark:text-[#F5F2EB] group-hover:text-[#FF771C] transition-colors leading-snug tracking-tight line-clamp-1">
                        {ts(service.title)}
                      </h3>

                      {/* Description */}
                      <p className="text-[13px] sm:text-[13.5px] text-[#717167] dark:text-[#9E9488] mt-1.5 line-clamp-2 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Perks Check Row */}
                      <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-[#E7E5DF]/60 dark:border-[#261E18] text-xs font-semibold text-[#8F8F85]">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          Doorstep
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#FF771C]" />
                          Warranty
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-blue-500" />
                          Genuine
                        </span>
                      </div>
                    </div>

                    {/* Card Footer: Price & Book CTA */}
                    <div className="pt-3.5 mt-3.5 border-t border-[#E7E5DF] dark:border-[#261E18] flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#8F8F85] block">
                          {t("categories.starts")}
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-[22px] sm:text-2xl font-mono font-black text-[#252621] dark:text-white">
                            ₹{service.defaultPrice}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          setSelectedService(service);
                          setBookingModalOpen(true);
                        }}
                        className="font-extrabold bg-gradient-to-r from-[#FF771C] to-[#E56814] hover:from-[#FF8433] hover:to-[#EB7220] text-white shadow-[0_3px_14px_rgba(255,119,28,0.35)] px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-xl transition-all duration-300 group/btn flex items-center gap-1.5 text-xs sm:text-[13px]"
                      >
                        <span>{t("common.bookNow")}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="p-12 text-center rounded-3xl bg-white/90 dark:bg-[#14100D]/90 backdrop-blur-xl border border-[#E7E5DF] dark:border-[#261E18] shadow-card space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-orange-500/10 text-[#FF771C] flex items-center justify-center mx-auto border border-[#FF771C]/25 shadow-sm">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
                  {t("servicesPage.noServicesMatch")}
                </h3>
                <p className="text-xs text-[#717167] dark:text-[#9E9488] max-w-sm mx-auto">
                  {t("servicesPage.adjustSearch")}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFilters}
                  leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                  className="font-bold border-[#FF771C]/40 text-[#FF771C] hover:bg-orange-50 dark:hover:bg-[#23170E]"
                >
                  {t("common.clear")}
                </Button>
              </div>
            )}

            {/* ========================================================= */}
            {/* 04 PAGINATION CONTROLS                                    */}
            {/* ========================================================= */}
            {filteredServices.length > pageSize && (
              <div className="p-4 rounded-3xl bg-white dark:bg-[#14100D] border border-[#E7E5DF] dark:border-[#261E18] shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#717167] dark:text-[#A89E92]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF771C]" />
                  {language === "hi" ? (
                    <span>
                      कुल <span className="font-bold text-[#252621] dark:text-[#F5F2EB]">{filteredServices.length}</span> सेवाओं में से{" "}
                      <span className="font-bold text-[#FF771C]">
                        {(currentPage - 1) * pageSize + 1} से {Math.min(currentPage * pageSize, filteredServices.length)}
                      </span>
                    </span>
                  ) : (
                    <span>
                      Showing{" "}
                      <span className="font-bold text-[#FF771C]">
                        {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filteredServices.length)}
                      </span>{" "}
                      of{" "}
                      <span className="font-bold text-[#252621] dark:text-[#F5F2EB]">
                        {filteredServices.length}
                      </span>{" "}
                      services
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="p-2 rounded-xl border border-[#E7E5DF] dark:border-[#261E18] text-[#252621] dark:text-[#F5F2EB] disabled:opacity-30 hover:bg-[#F8F7F3] dark:hover:bg-[#1A1410] transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    const isActive = pageNum === currentPage;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                          isActive
                            ? "bg-gradient-to-r from-[#FF771C] to-[#E56814] text-white shadow-[0_4px_16px_rgba(255,119,28,0.4)] scale-105"
                            : "border border-[#E7E5DF] dark:border-[#261E18] text-[#717167] dark:text-[#9E9488] hover:bg-[#F8F7F3] dark:hover:bg-[#1A1410] hover:text-[#252621] dark:hover:text-[#F5F2EB]"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    className="p-2 rounded-xl border border-[#E7E5DF] dark:border-[#261E18] text-[#252621] dark:text-[#F5F2EB] disabled:opacity-30 hover:bg-[#F8F7F3] dark:hover:bg-[#1A1410] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm lg:hidden">
          <div className="w-full max-w-xs h-full bg-[#FAFAF8] dark:bg-[#14100D] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-[#E7E5DF] dark:border-[#261E18]">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E7E5DF] dark:border-[#261E18]">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#FF771C]" />
                  <h3 className="font-extrabold text-base text-[#252621] dark:text-[#F5F2EB]">
                    Filters
                  </h3>
                </div>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-[#251E17] text-[#8F8F85] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Instant Dispatch Toggle */}
              <div
                onClick={() => setInstantDispatchOnly(!instantDispatchOnly)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  instantDispatchOnly
                    ? "bg-emerald-500/10 border-emerald-500/40"
                    : "bg-white dark:bg-[#1A1410] border-[#E7E5DF] dark:border-[#261E18]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-[#252621] dark:text-[#F5F2EB]">
                      {t("servicesPage.instantDispatch")}
                    </span>
                  </div>
                  <div
                    className={`w-8 h-4 rounded-full relative flex items-center p-0.5 ${
                      instantDispatchOnly ? "bg-emerald-500 justify-end" : "bg-stone-300 dark:bg-stone-700 justify-start"
                    }`}
                  >
                    <div className="w-3 h-3 rounded-full bg-white shadow-xs" />
                  </div>
                </div>
              </div>

              {/* Mobile Categories */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-[#8F8F85]">
                  Category
                </h4>
                <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                  {categoriesList.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    const IconComp = getCategoryIcon(cat.id);
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          handleCategoryChange(cat.id);
                          setMobileFilterOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                          isSelected
                            ? "bg-gradient-to-r from-[#FF771C] to-[#E56814] text-white shadow-md"
                            : "text-[#252621] dark:text-[#F5F2EB] bg-white dark:bg-[#1A1410] border border-[#E7E5DF] dark:border-[#261E18]"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <IconComp className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-[#FF771C]"}`} />
                          <span className="truncate">{tc(cat.name)}</span>
                        </div>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? "bg-white/20 text-white" : "text-[#8F8F85]"}`}>
                          {cat.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Price Filter */}
              <div className="space-y-2 pt-3 border-t border-[#E7E5DF] dark:border-[#261E18]">
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-[#8F8F85]">
                  Price
                </h4>
                <div className="grid grid-cols-1 gap-1 text-xs">
                  {[
                    { id: "ALL", label: "All Prices" },
                    { id: "UNDER_250", label: "Under ₹250" },
                    { id: "250_TO_500", label: "₹250 to ₹500" },
                    { id: "500_TO_1000", label: "₹500 to ₹1,000" },
                    { id: "ABOVE_1000", label: "₹1,000 and above" },
                  ].map((range) => {
                    const isSelected = selectedPriceRange === range.id;
                    return (
                      <button
                        key={range.id}
                        onClick={() => {
                          setSelectedPriceRange(range.id);
                          setCurrentPage(1);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-left transition-all ${
                          isSelected
                            ? "bg-orange-50 dark:bg-[#2A180E] text-[#FF771C] border border-[#FF771C]/50"
                            : "bg-white dark:bg-[#1A1410] border border-[#E7E5DF] dark:border-[#261E18] text-[#717167] dark:text-[#9E9488]"
                        }`}
                      >
                        <span>{range.label}</span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#FF771C]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E7E5DF] dark:border-[#261E18] space-y-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full font-bold bg-[#FF771C] hover:bg-[#E56814] text-white shadow-[0_4px_16px_rgba(255,119,28,0.4)]"
              >
                Apply Filters
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  resetFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-full text-xs font-bold"
              >
                Reset All
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        service={selectedService}
        onRequireAuth={onOpenAuthModal}
      />
    </div>
  );
};
