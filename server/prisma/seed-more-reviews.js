import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sampleComments = [
  "Bohot badhiya service! Samay par aaye aur dikkat turant theek kardi.",
  "Very polite and professional technician. Reasonable charges and clean work.",
  "10/10 experience. Genuine parts used and clear explanation of the issue.",
  "Quick response and solved the problem in less than 30 minutes. Highly recommended!",
  "Extremely skilled and well-equipped with modern tools. Will book again.",
  "Punctual and honest work. Did not charge extra for minor adjustments.",
  "Super fast arrival and great technical know-how. Fully satisfied!",
  "Great workmanship and verified profile gives complete peace of mind."
];

async function seedReviews() {
  console.log("⭐ Seeding reviews and completed bookings for new technicians...");

  // Get customer profile
  const customer = await prisma.customerProfile.findFirst({
    include: { user: true }
  });

  if (!customer) {
    console.log("No customer profile found, skipping reviews seed.");
    return;
  }

  const allServices = await prisma.service.findMany({ take: 10 });
  const newTechPhones = [
    "9876500005",
    "9876500006",
    "9876500007",
    "9876500008",
    "9876500009",
    "9876500010",
    "9876500011",
    "9876500012"
  ];

  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");

  for (let idx = 0; idx < newTechPhones.length; idx++) {
    const phone = newTechPhones[idx];
    const techUser = await prisma.user.findUnique({
      where: { phone },
      include: { technicianProfile: true }
    });

    if (!techUser || !techUser.technicianProfile) continue;
    const techProfile = techUser.technicianProfile;

    // Create 3 to 6 completed bookings + reviews for each tech
    const reviewCount = 4 + (idx % 5);
    for (let r = 0; r < reviewCount; r++) {
      const service = allServices[(idx + r) % allServices.length];
      const bookingNumber = `JG-${dateStr}-${techUser.phone.slice(-4)}-${r + 1}`;

      const booking = await prisma.booking.upsert({
        where: { bookingNumber },
        update: {},
        create: {
          bookingNumber,
          customerId: customer.id,
          technicianId: techProfile.id,
          serviceId: service.id,
          status: "COMPLETED",
          problemDescription: `Regular service call resolved on-site.`,
          scheduledAt: new Date(Date.now() - 86400000 * (r + 1)),
          startOtp: `${1000 + Math.floor(Math.random() * 8999)}`,
          agreedPrice: Number(service.defaultPrice),
          serviceAddress: customer.address || "Sector 62, Noida, UP",
          latitude: 28.628,
          longitude: 77.3649
        }
      });

      const existingReview = await prisma.review.findUnique({
        where: { bookingId: booking.id }
      });

      if (!existingReview) {
        await prisma.review.create({
          data: {
            bookingId: booking.id,
            customerId: customer.id,
            technicianId: techProfile.id,
            rating: 5,
            comment: sampleComments[(idx + r) % sampleComments.length]
          }
        });
      }
    }

    console.log(`✅ Seeded reviews for ${techUser.fullName}`);
  }

  console.log("🎉 All reviews seeded successfully!");
}

seedReviews()
  .catch((e) => {
    console.error("❌ Error seeding reviews:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
