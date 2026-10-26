
require('dotenv').config();

const bcrypt = require('bcryptjs');
const prisma = require('../src/prisma');

async function main() {
  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error(
      'Please set ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD in .env'
    );
  }

  if (ADMIN_PASSWORD.length < 12) {
    throw new Error('Admin password must be at least 12 characters.');
  }

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

  await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: {
      name: ADMIN_NAME,
      password: hashedPassword,
      role: 'ADMIN',
    },
    create: {
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log(`Admin account ready: ${ADMIN_EMAIL}`);
}

main()
  .catch((error) => {
    console.error('Admin seed failed:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
