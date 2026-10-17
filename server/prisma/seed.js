import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting JantaGaraj Real Data Seeding...");

  // 1. Clean existing dummy categories & services
  console.log("🧹 Cleaning old mock categories...");
  await prisma.technicianService.deleteMany().catch(() => {});
  await prisma.review.deleteMany().catch(() => {});
  await prisma.payment.deleteMany().catch(() => {});
  await prisma.booking.deleteMany().catch(() => {});
  await prisma.service.deleteMany().catch(() => {});
  await prisma.serviceCategory.deleteMany().catch(() => {});

  // 2. Create Real Service Categories
  console.log("🚗 Creating real automotive service categories...");
  const categoriesData = [
    {
      name: "Car Periodic Maintenance",
      slug: "car-periodic-maintenance",
      services: [
        { title: "Standard Car Engine Oil & Filter Service", defaultPrice: 1499.0 },
        { title: "Comprehensive 50-Point Car Health Inspection", defaultPrice: 799.0 },
        { title: "Complete AC Gas Refill & Cooling Coil Flush", defaultPrice: 1299.0 },
      ],
    },
    {
      name: "Emergency Roadside SOS",
      slug: "emergency-roadside-sos",
      services: [
        { title: "Doorstep Car & Bike Battery Jumpstart", defaultPrice: 349.0 },
        { title: "Emergency Highway Fuel Delivery", defaultPrice: 299.0 },
        { title: "Flatbed Roadside Breakdown Towing", defaultPrice: 1899.0 },
      ],
    },
    {
      name: "Two-Wheeler Repair & Care",
      slug: "two-wheeler-repair",
      services: [
        { title: "Full Bike General Tune-Up & Lubrication", defaultPrice: 499.0 },
        { title: "Drive Chain Deep Cleaning & O-Ring Lubrication", defaultPrice: 199.0 },
        { title: "Carburetor Clean & Spark Plug Replacement", defaultPrice: 299.0 },
      ],
    },
    {
      name: "Brakes, Clutch & Suspension",
      slug: "brakes-clutch-suspension",
      services: [
        { title: "Front & Rear Brake Pad Replacement", defaultPrice: 599.0 },
        { title: "Clutch Wire & Friction Plate Overhaul", defaultPrice: 899.0 },
        { title: "Suspension Strut & Bushing Diagnostics", defaultPrice: 699.0 },
      ],
    },
    {
      name: "Battery & Electrical Diagnostics",
      slug: "battery-electrical",
      services: [
        { title: "Computerized OBD-II Scanner Diagnostics", defaultPrice: 499.0 },
        { title: "Starter Motor & Alternator Current Check", defaultPrice: 599.0 },
        { title: "Headlight Relay & Short-Circuit Troubleshooting", defaultPrice: 399.0 },
      ],
    },
    {
      name: "Tyres, Wheels & Puncture Care",
      slug: "tyres-wheel-care",
      services: [
        { title: "Doorstep Tubeless Tyre Puncture Repair", defaultPrice: 199.0 },
        { title: "Computerized Wheel Balancing & Rotation", defaultPrice: 449.0 },
      ],
    },
    {
      name: "Detailing, Foam Wash & Spa",
      slug: "detailing-wash-spa",
      services: [
        { title: "Doorstep Foam Wash & Deep Interior Vacuuming", defaultPrice: 699.0 },
        { title: "Ceramic Coating Polish & Hydrophobic Shield", defaultPrice: 1999.0 },
      ],
    },
  ];

  const createdServices = [];

  for (const cat of categoriesData) {
    const category = await prisma.serviceCategory.create({
      data: {
        name: cat.name,
        slug: cat.slug,
      },
    });

    for (const s of cat.services) {
      const service = await prisma.service.create({
        data: {
          categoryId: category.id,
          title: s.title,
          defaultPrice: s.defaultPrice,
        },
      });
      createdServices.push(service);
    }
  }

  console.log(`✅ Created ${categoriesData.length} categories and ${createdServices.length} services.`);

  // 3. Create Real Verified Technicians
  console.log("👨‍🔧 Seeding certified mechanics with KYC verification...");
  const techniciansData = [
    {
      phone: "9876500001",
      fullName: "Vikram Sharma",
      bio: "8+ years experience as Head Mechanic at Authorized Maruti & Hyundai workshops. Expert in engine diagnostics, brake overhauls, and fast doorstep breakdown resolution.",
      experienceYears: 8,
      baseVisitingCharge: 199.0,
      serviceRadiusKm: 15.0,
      latitude: 28.6139,
      longitude: 77.209,
      docType: "AADHAAR",
      docNumber: "8472 9102 3847",
      docUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600",
    },
    {
      phone: "9876500002",
      fullName: "Mohammad Irfan",
      bio: "Master two-wheeler mechanic with 6 years experience in Royal Enfield, Honda, Yamaha, and KTM tuning. Certified for electrical wiring and high-performance clutch setups.",
      experienceYears: 6,
      baseVisitingCharge: 149.0,
      serviceRadiusKm: 12.0,
      latitude: 28.6289,
      longitude: 77.218,
      docType: "DRIVING_LICENSE",
      docNumber: "DL-1420180049281",
      docUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
    },
    {
      phone: "9876500003",
      fullName: "Rajesh Kumar Verma",
      bio: "11 years specialized automotive experience. Former senior mechanic at Bosch Car Service. Equipped with digital OBD-II scanning tools, AC recharge kits, and suspension jacks.",
      experienceYears: 11,
      baseVisitingCharge: 249.0,
      serviceRadiusKm: 20.0,
      latitude: 28.5355,
      longitude: 77.391,
      docType: "AADHAAR",
      docNumber: "9182 3746 5928",
      docUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600",
    },
    {
      phone: "9876500004",
      fullName: "Amit Patel",
      bio: "Fast response emergency breakdown specialist. Covers highway punctures, battery jumpstarts, and coolant leakage issues within 25 minutes of booking.",
      experienceYears: 5,
      baseVisitingCharge: 179.0,
      serviceRadiusKm: 10.0,
      latitude: 28.7041,
      longitude: 77.1025,
      docType: "PAN",
      docNumber: "BNZPP9283K",
      docUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600",
    },
  ];

  const createdTechProfiles = [];

  for (const t of techniciansData) {
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

    // Map all created services to this technician
    for (const service of createdServices.slice(0, 8)) {
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

    createdTechProfiles.push(techProfile);
  }

  console.log(`✅ Created ${createdTechProfiles.length} verified technician profiles.`);

  // 4. Create Sample Real Customers
  console.log("👤 Creating real customers and sample reviews...");
  const customerUser = await prisma.user.upsert({
    where: { phone: "9876543210" },
    update: {
      fullName: "Rahul Sen Sharma",
      role: "CUSTOMER",
      isActive: true,
    },
    create: {
      phone: "9876543210",
      fullName: "Rahul Sen Sharma",
      role: "CUSTOMER",
      isActive: true,
      firebaseUid: "test_firebase_uid_abc123", // matches test token bypass
    },
  });

  const customerProfile = await prisma.customerProfile.upsert({
    where: { userId: customerUser.id },
    update: {
      address: "Flat 402, Royal Palms, Sector 62, Noida, UP",
      latitude: 28.628,
      longitude: 77.3649,
    },
    create: {
      userId: customerUser.id,
      address: "Flat 402, Royal Palms, Sector 62, Noida, UP",
      latitude: 28.628,
      longitude: 77.3649,
    },
  });

  // 5. Create Completed Booking with Real Review
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const completedBooking = await prisma.booking.create({
    data: {
      bookingNumber: `JG-${dateStr}-8821`,
      customerId: customerProfile.id,
      technicianId: createdTechProfiles[0].id,
      serviceId: createdServices[0].id,
      status: "COMPLETED",
      problemDescription: "Car engine was heating up quickly and required regular periodic oil and coolant flush.",
      scheduledAt: new Date(Date.now() - 86400000 * 2),
      startOtp: "4921",
      agreedPrice: createdServices[0].defaultPrice,
      serviceAddress: "Flat 402, Royal Palms, Sector 62, Noida, UP",
      latitude: 28.628,
      longitude: 77.3649,
    },
  });

  await prisma.payment.create({
    data: {
      bookingId: completedBooking.id,
      amount: completedBooking.agreedPrice,
      method: "UPI",
      status: "SUCCESS",
      transactionId: `UPI-YESB-${Date.now()}`,
    },
  });

  await prisma.review.create({
    data: {
      bookingId: completedBooking.id,
      customerId: customerProfile.id,
      technicianId: createdTechProfiles[0].id,
      rating: 5,
      comment: "Vikram arrived on his bike within 25 minutes with fresh Castrol engine oil and OEM filter. Very neat work, checked brake pads for free. 10/10 service!",
    },
  });

  // 6. Create Active/Pending Booking (so technician radar displays incoming requests)
  await prisma.booking.create({
    data: {
      bookingNumber: `JG-${dateStr}-4192`,
      customerId: customerProfile.id,
      serviceId: createdServices[3].id, // Doorstep Battery Jumpstart
      status: "PENDING",
      problemDescription: "Car battery is completely dead after 2 weeks of parking. Need jumpstart cables and battery health check.",
      scheduledAt: new Date(Date.now() + 3600000 * 2), // 2 hours from now
      startOtp: "6318",
      agreedPrice: createdServices[3].defaultPrice,
      serviceAddress: "C-14, Green Park Extension, New Delhi",
      latitude: 28.5583,
      longitude: 77.2023,
    },
  });

  // 7. Create Pending Technician KYC Submission for Admin Desk
  const pendingTechUser = await prisma.user.upsert({
    where: { phone: "9876599999" },
    update: {
      fullName: "Dharmendra Kushwaha",
      role: "TECHNICIAN",
      isActive: true,
    },
    create: {
      phone: "9876599999",
      fullName: "Dharmendra Kushwaha",
      role: "TECHNICIAN",
      isActive: true,
      firebaseUid: "uid_tech_pending_9999",
    },
  });

  await prisma.technicianProfile.upsert({
    where: { userId: pendingTechUser.id },
    update: {
      bio: "Experienced auto electrician specializing in starter motors, alternator rewinding, and car horn/lighting repairs.",
      experienceYears: 7,
      baseVisitingCharge: 199.0,
      serviceRadiusKm: 15.0,
      isOnline: true,
      isAvailable: true,
      kycStatus: "SUBMITTED",
      docType: "AADHAAR",
      docNumber: "7361 8291 0021",
      docUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600",
    },
    create: {
      userId: pendingTechUser.id,
      bio: "Experienced auto electrician specializing in starter motors, alternator rewinding, and car horn/lighting repairs.",
      experienceYears: 7,
      baseVisitingCharge: 199.0,
      serviceRadiusKm: 15.0,
      isOnline: true,
      isAvailable: true,
      kycStatus: "SUBMITTED",
      docType: "AADHAAR",
      docNumber: "7361 8291 0021",
      docUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600",
    },
  });

  console.log("🎉 Seeding complete! Real automotive data populated successfully in database.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
