import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const additionalTechnicians = [
  {
    phone: "9876500005",
    fullName: "Mohammad Imran",
    bio: "7+ years expertise in residential and commercial plumbing. Concealed leak detection using acoustic meters, sanitary installations, and high-pressure water pump troubleshooting.",
    experienceYears: 7,
    baseVisitingCharge: 149.0,
    serviceRadiusKm: 15.0,
    latitude: 28.5700,
    longitude: 77.3200,
    docType: "AADHAAR",
    docNumber: "7821 9401 5521",
    docUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=480&q=70&fm=webp",
  },
  {
    phone: "9876500006",
    fullName: "Sunil Kumar Mishra",
    bio: "HVAC & multi-brand AC specialist with 9 years experience. Inverter PCB board triage, anti-bacterial foam jet cleaning, copper pipe brazing, and R32/R410A gas charging.",
    experienceYears: 9,
    baseVisitingCharge: 249.0,
    serviceRadiusKm: 18.0,
    latitude: 28.6350,
    longitude: 77.2250,
    docType: "PAN",
    docNumber: "SKMPN8491M",
    docUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=480&q=70&fm=webp",
  },
  {
    phone: "9876500007",
    fullName: "Rameshwar Singh Yadav",
    bio: "Senior certified domestic electrician with 10+ years experience in heavy load balancing, 3-phase wiring, MCB tripping triage, inverter battery bank setup, and modular circuits.",
    experienceYears: 10,
    baseVisitingCharge: 179.0,
    serviceRadiusKm: 15.0,
    latitude: 28.6100,
    longitude: 77.2300,
    docType: "AADHAAR",
    docNumber: "8912 3019 4410",
    docUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=480&q=70&fm=webp",
  },
  {
    phone: "9876500008",
    fullName: "Deepak Chauhan",
    bio: "Certified Paintless Dent Repair (PDR) & detailing expert. Specialist in German car dent pulling without paint damage, 9H ceramic coating, and doorstep compound buffing.",
    experienceYears: 6,
    baseVisitingCharge: 299.0,
    serviceRadiusKm: 20.0,
    latitude: 28.5355,
    longitude: 77.3910,
    docType: "DRIVING_LICENSE",
    docNumber: "DL-0420190019283",
    docUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=480&q=70&fm=webp",
  },
  {
    phone: "9876500009",
    fullName: "Karan Thapa",
    bio: "8 years tuning Royal Enfield Himalayan, Classic, KTM Duke, and Japanese commuter bikes. Complete carburetor syncing, disc brake overhaul, and chain sprocket replacements.",
    experienceYears: 8,
    baseVisitingCharge: 159.0,
    serviceRadiusKm: 14.0,
    latitude: 28.6500,
    longitude: 77.1500,
    docType: "AADHAAR",
    docNumber: "6512 8901 2234",
    docUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=480&q=70&fm=webp",
  },
  {
    phone: "9876500010",
    fullName: "Arjun Gupta",
    bio: "5+ years servicing all major RO water purifiers (Kent, Aquaguard, Pureit). TDS membrane testing, booster pump replacement, and fully automatic washing machine motor repairs.",
    experienceYears: 5,
    baseVisitingCharge: 149.0,
    serviceRadiusKm: 12.0,
    latitude: 28.5800,
    longitude: 77.3100,
    docType: "PAN",
    docNumber: "ARGPT7710K",
    docUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=480&q=70&fm=webp",
  },
  {
    phone: "9876500011",
    fullName: "Pooja Rawat",
    bio: "Certified smart home security technician with 6 years experience in HD CCTV installation, Cat6 networking, night-vision camera alignment, and smart digital door lock setup.",
    experienceYears: 6,
    baseVisitingCharge: 199.0,
    serviceRadiusKm: 16.0,
    latitude: 28.6200,
    longitude: 77.3700,
    docType: "AADHAAR",
    docNumber: "9021 3491 8812",
    docUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=480&q=70&fm=webp",
  },
  {
    phone: "9876500012",
    fullName: "Harpreet Singh",
    bio: "12+ years master carpenter and interior woodwork specialist. Heavy-duty hydraulic concealed hinges, mortise locks, sliding wardrobe rollers, and modular kitchen repair.",
    experienceYears: 12,
    baseVisitingCharge: 249.0,
    serviceRadiusKm: 18.0,
    latitude: 28.6800,
    longitude: 77.2100,
    docType: "AADHAAR",
    docNumber: "4512 7801 9931",
    docUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=480&q=70&fm=webp",
  },
];

async function seedMoreTechnicians() {
  console.log("👨‍🔧 Seeding additional certified technicians...");

  const allServices = await prisma.service.findMany();
  console.log(`Found ${allServices.length} existing services to map.`);

  for (const t of additionalTechnicians) {
    const user = await prisma.user.upsert({
      where: { phone: t.phone },
      update: {
        fullName: t.fullName,
        role: "TECHNICIAN",
        isActive: true,
      },
      create: {
        phone: t.phone,
        fullName: t.fullName,
        role: "TECHNICIAN",
        isActive: true,
        firebaseUid: `uid_tech_${t.phone}`,
      },
    });

    const techProfile = await prisma.technicianProfile.upsert({
      where: { userId: user.id },
      update: {
        bio: t.bio,
        experienceYears: t.experienceYears,
        baseVisitingCharge: t.baseVisitingCharge,
        serviceRadiusKm: t.serviceRadiusKm,
        latitude: t.latitude,
        longitude: t.longitude,
        isOnline: true,
        isAvailable: true,
        kycStatus: "VERIFIED",
        docType: t.docType,
        docNumber: t.docNumber,
        docUrl: t.docUrl,
      },
      create: {
        userId: user.id,
        bio: t.bio,
        experienceYears: t.experienceYears,
        baseVisitingCharge: t.baseVisitingCharge,
        serviceRadiusKm: t.serviceRadiusKm,
        latitude: t.latitude,
        longitude: t.longitude,
        isOnline: true,
        isAvailable: true,
        kycStatus: "VERIFIED",
        docType: t.docType,
        docNumber: t.docNumber,
        docUrl: t.docUrl,
      },
    });

    // Map all available services to this technician
    for (const service of allServices) {
      await prisma.technicianService.upsert({
        where: {
          technicianId_serviceId: {
            technicianId: techProfile.id,
            serviceId: service.id,
          },
        },
        update: {},
        create: {
          technicianId: techProfile.id,
          serviceId: service.id,
          customPrice: service.defaultPrice,
        },
      });
    }

    console.log(`✅ Seeded: ${t.fullName} (${t.phone})`);
  }

  console.log("🎉 All additional technicians seeded successfully!");
}

seedMoreTechnicians()
  .catch((e) => {
    console.error("❌ Error seeding additional technicians:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
