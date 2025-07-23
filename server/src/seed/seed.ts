import { prisma } from '../prisma/client.js';

async function main() {
  await prisma.camera.createMany({
    data: [
      { name: 'Shop Floor A', location: 'Zone A' },
      { name: 'Vault', location: 'Zone B' },
      { name: 'Entrance', location: 'Main Gate' },
    ],
  });

  const now = new Date();
  const threats = ['Gun Threat', 'Unauthorized Access', 'Face Recognised'];
  for (let i = 0; i < 12; i++) {
    await prisma.incident.create({
      data: {
        cameraId: (i % 3) + 1,
        type: threats[i % 3],
        tsStart: new Date(now.getTime() - i * 3600 * 1000),
        tsEnd: new Date(now.getTime() - i * 3600 * 1000 + 5 * 60 * 1000),
        thumbnailUrl: `/thumbnails/thumb${(i % 3) + 1}.jpg`,
        resolved: false,
      },
    });
  }
}

main().then(
    () => {
        console.log('Seeding completed successfully');
    }
).catch(console.error).finally(() => prisma.$disconnect());
