import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.admin.findFirst();
  console.log("Connection OK:", admin?.email ?? "no admin found");
}

main()
  .catch((error) => {
    console.error("Connection FAILED:", error.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
