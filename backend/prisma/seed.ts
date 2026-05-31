import { PrismaClient, PropertyType, PropertyStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/** Verified working Unsplash IDs (HTTP 200) — homes, cabins, interiors */
const VERIFIED_GALLERY_PHOTOS = [
  "1564013799919-ab600027ffc6",
  "1518780664697-55e3ad937233",
  "1600596542815-ffad4c1539a9",
  "1600585154340-be6161a56a0c",
  "1600607687939-ce8a6c25118c",
  "1613490493576-7fde63acd811",
  "1570129477492-45c003edd2be",
  "1600585154526-990dced4db0d",
  "1600607687644-c7171b42498f",
  "1560518883-ce09059eeffa",
  "1502672260266-1c1ef2d93688",
  "1560448204-e02f11c3d0e2",
] as const;

const VERIFIED_FLOOR_PLANS = [
  "1503387762-592deb58ef4e",
  "1484154218962-a197022b5858",
  "1505693416388-ac5ce068fe85",
] as const;

const IMAGES_PER_PROPERTY = 10;

function photoUrl(id: string): string {
  return `https://images.unsplash.com/photo-${id}?w=1200&q=80&auto=format&fit=crop`;
}

/** 10 working gallery images; offset rotates the set per property for variety */
function buildGallery(offset = 0): string[] {
  const pool = VERIFIED_GALLERY_PHOTOS;
  return Array.from({ length: IMAGES_PER_PROPERTY }, (_, i) =>
    photoUrl(pool[(i + offset) % pool.length])
  );
}

function buildFloorPlans(count = 2, offset = 0): string[] {
  const pool = VERIFIED_FLOOR_PLANS;
  return Array.from({ length: count }, (_, i) =>
    photoUrl(pool[(i + offset) % pool.length])
  );
}

const HALLVIKEN_DESCRIPTION =
  "Fritidshus med utbyggd avkopplingsdel/förråd och terrass, samt ett redskapsbod. Fastigheten har ett unikt läge med egen brygga i Hällviken med strand mot Vallsjön, som är en del av Betarsjön. På den 970 kvadratmeter stora tomten finns björkar, grässtep, äldre staket och grillplats. Möjlighet till semesterboende, bad, fiske och annan rekreation.";

async function main() {
  const hashedPassword = await bcrypt.hash("Admin123!", 12);

  await prisma.admin.upsert({
    where: { email: "admin@nordmark.se" },
    update: {},
    create: {
      email: "admin@nordmark.se",
      password: hashedPassword,
      name: "Admin",
    },
  });

  const properties = [
    {
      title: "Hällviken 106",
      slug: "hallviken-106",
      description: HALLVIKEN_DESCRIPTION,
      price: 600000,
      city: "Hällviken",
      address: "Hällviken 106",
      county: "Västernorrland",
      municipality: "Sollefteå kommun",
      rooms: 3,
      area: 70,
      landArea: 970,
      propertyType: PropertyType.RESIDENTIAL,
      status: PropertyStatus.FOR_SALE,
      housingType: "Fritidshus",
      ownershipForm: "Äganderätt",
      features: ["Balkong", "Uteplats", "Egen brygga", "Grillplats"],
      images: buildGallery(0),
      floorPlanImages: buildFloorPlans(2, 0),
      minCash: 60000,
      titleDeedCost: 9825,
      electricityKwh: 2800,
      viewingDate: "Fre 5 jun",
      viewingNote: "För anmälan och mer info",
      featured: true,
    },
    {
      title: "Lasarettsvägen 16, Backe",
      slug: "backe-lasarettsvagen-16",
      description:
        "Bostad i Backe, Strömsunds kommun. Boyta 145 + 130 m² (totalt 275 m²), 7 rum och tomt om 1 560 m². Uteplats och generös planlösning med gott om utrymme för familjen.",
      price: 500000,
      city: "Backe",
      address: "Lasarettsvägen 16",
      county: "Jämtland",
      municipality: "Strömsunds kommun",
      rooms: 7,
      area: 275,
      landArea: 1560,
      propertyType: PropertyType.RESIDENTIAL,
      status: PropertyStatus.FOR_SALE,
      housingType: "Villa",
      ownershipForm: "Äganderätt",
      features: ["Uteplats", "Garage"],
      images: buildGallery(2),
      floorPlanImages: buildFloorPlans(2, 1),
      minCash: 50000,
      titleDeedCost: 9825,
      electricityKwh: 4200,
      viewingDate: "Lör 7 jun",
      viewingNote: "Kontakta mäklaren för tidsbokning",
      featured: true,
    },
    {
      title: "Köpmangatan 15, Junsele",
      slug: "junsele-kopmangatan-15",
      description:
        "Fastighet i Junsele, Sollefteå kommun. 416 m² boyta och tomt om 2 710 m². Centralt läge med närhet till service och natur.",
      price: 980000,
      city: "Junsele",
      address: "Köpmangatan 15",
      county: "Västernorrland",
      municipality: "Sollefteå kommun",
      rooms: 0,
      area: 416,
      landArea: 2710,
      propertyType: PropertyType.RESIDENTIAL,
      status: PropertyStatus.FOR_SALE,
      housingType: "Bostad",
      ownershipForm: "Äganderätt",
      features: ["Centralt läge"],
      images: buildGallery(4),
      floorPlanImages: buildFloorPlans(2, 2),
      minCash: 98000,
      titleDeedCost: 9825,
      featured: true,
    },
    {
      title: "Östra Gafsele 52",
      slug: "gafsele-ostra-gafsele-52",
      description:
        "Bostad i Gafsele, Åsele kommun. Budgivning pågår. Boyta 60 + 40 m² (totalt 100 m²), 3 rum och tomt om 3,9 ha. Lugnt läge omgivet av natur.",
      price: 440000,
      city: "Gafsele",
      address: "Östra Gafsele 52",
      county: "Västerbotten",
      municipality: "Åsele kommun",
      rooms: 3,
      area: 100,
      landArea: 39000,
      propertyType: PropertyType.RESIDENTIAL,
      status: PropertyStatus.RESERVED,
      housingType: "Fritidshus",
      ownershipForm: "Äganderätt",
      features: ["Uteplats", "Skog"],
      images: buildGallery(6),
      floorPlanImages: buildFloorPlans(2, 0),
      minCash: 44000,
      titleDeedCost: 9825,
      electricityKwh: 2400,
      featured: false,
    },
    {
      title: "Jon-Zakrisväg 4, Junsele",
      slug: "junsele-jon-zakrisvag-4",
      description:
        "Bostad i Junsele, Sollefteå kommun. Boyta 188 + 33 m² (totalt 221 m²), 6 rum och tomt om 2 455 m². Rymlig villa med potential för generationsboende.",
      price: 360000,
      city: "Junsele",
      address: "Jon-Zakrisväg 4",
      county: "Västernorrland",
      municipality: "Sollefteå kommun",
      rooms: 6,
      area: 221,
      landArea: 2455,
      propertyType: PropertyType.RESIDENTIAL,
      status: PropertyStatus.FOR_SALE,
      housingType: "Villa",
      ownershipForm: "Äganderätt",
      features: ["Uteplats", "Förråd"],
      images: buildGallery(8),
      floorPlanImages: buildFloorPlans(2, 1),
      minCash: 36000,
      titleDeedCost: 9825,
      electricityKwh: 3800,
      viewingDate: "Ons 4 jun",
      viewingNote: "Anmälan krävs",
      featured: false,
    },
  ];

  for (const property of properties) {
    await prisma.property.upsert({
      where: { slug: property.slug },
      update: property,
      create: property,
    });
    console.log(
      `  ✓ ${property.slug}: ${property.images.length} bilder, ${property.floorPlanImages.length} planritningar`
    );
  }

  console.log(`\nSeeded ${properties.length} properties (${IMAGES_PER_PROPERTY} images each)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
