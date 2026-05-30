import { PrismaClient, PropertyType, PropertyStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Admin123!", 12);

  await prisma.admin.upsert({
    where: { email: "admin@nordmark.se" },
    update: {},
    create: {
      email: "admin@nordmark.se",
      password: hashedPassword,
      name: "Nordmark Admin",
    },
  });

  const properties = [
    {
      title: "Skogsmark i Dalarna",
      slug: "skogsmark-dalarna",
      description:
        "Vackert belagen skogsmark om 85 hektar i hjartat av Dalarna. Produktiv gran- och tallskog med god tillvaxt. Utmarkt tillganglighet via skogsvagsnat. Jakt- och fiskerattigheterna medfoljer.",
      price: 4200000,
      city: "Mora",
      address: "Skogsvagen 12",
      county: "Dalarna",
      rooms: 0,
      area: 850000,
      landArea: 850000,
      propertyType: PropertyType.FOREST,
      status: PropertyStatus.FOR_SALE,
      images: [
        "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800",
        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800",
      ],
      featured: true,
    },
    {
      title: "Lantbruksfastighet Skane",
      slug: "lantbruk-skane",
      description:
        "Hogavkastande lantbruksfastighet med 120 hektar bordig akerjord i sodra Skane. Modern driftbyggnad och renoverad mangardbyggnad fran 1800-talet. Bevattningsanlaggning ingaar.",
      price: 18500000,
      city: "Ystad",
      address: "Bondegatan 45",
      county: "Skane",
      rooms: 8,
      area: 280,
      landArea: 1200000,
      propertyType: PropertyType.AGRICULTURAL,
      status: PropertyStatus.FOR_SALE,
      images: [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800",
      ],
      featured: true,
    },
    {
      title: "Skogsfastighet Norrbotten",
      slug: "skog-norrbotten",
      description:
        "Storre skogsfastighet om 200 hektar i Norrbotten. Vaxtlig barrskog med hog virkesvolym. Utmarkt jaktmark med alg, ren och skogsfagel. Fiskeatten i angransande sjoar medfoljer.",
      price: 6800000,
      city: "Lulea",
      address: "Norrlandsvagen 78",
      county: "Norrbotten",
      rooms: 0,
      area: 2000000,
      landArea: 2000000,
      propertyType: PropertyType.FOREST,
      status: PropertyStatus.SOLD,
      images: [
        "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=800",
        "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800",
      ],
      featured: false,
    },
    {
      title: "Blandad Gard Vastergotland",
      slug: "blandad-gard-vastergotland",
      description:
        "Charmig blandad gard med 60 hektar aker- och skogsmark i Vastergotland. Valunderhallet boningshus med 6 rum. Stall och ladugard i gott skick. Perfekt for den som soker landsbygdsliv.",
      price: 9200000,
      city: "Skovde",
      address: "Gardsvagen 23",
      county: "Vastra Gotaland",
      rooms: 6,
      area: 185,
      landArea: 600000,
      propertyType: PropertyType.MIXED,
      status: PropertyStatus.FOR_SALE,
      images: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800",
      ],
      featured: true,
    },
    {
      title: "Jordbruksfastighet Uppland",
      slug: "jordbruk-uppland",
      description:
        "Attraktiv jordbruksfastighet med 95 hektar akerjord nordost om Uppsala. Arrendator pa plats. Stabil avkastning och god vardeotkning. Utmarkt investeringsobjekt.",
      price: 14500000,
      city: "Uppsala",
      address: "Upplandsvagen 56",
      county: "Uppsala",
      rooms: 5,
      area: 210,
      landArea: 950000,
      propertyType: PropertyType.AGRICULTURAL,
      status: PropertyStatus.RESERVED,
      images: [
        "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=800",
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
      ],
      featured: false,
    },
    {
      title: "Skogsinnehav Jamtland",
      slug: "skog-jamtland",
      description:
        "Stort sammanhangande skogsinnehav om 350 hektar i Jamtland. Varierad terrang med fjallnara skog. Rik vilttillgang och fiskevatten. Jarstuga ingaar i forsaljningen.",
      price: 8900000,
      city: "Ostersund",
      address: "Fjallvagen 34",
      county: "Jamtland",
      rooms: 3,
      area: 75,
      landArea: 3500000,
      propertyType: PropertyType.FOREST,
      status: PropertyStatus.FOR_SALE,
      images: [
        "https://images.unsplash.com/photo-1511497584788-876760111969?w=800",
        "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800",
      ],
      featured: true,
    },
  ];

  for (const property of properties) {
    await prisma.property.upsert({
      where: { slug: property.slug },
      update: {},
      create: property,
    });
  }

  console.log("Seed data created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
