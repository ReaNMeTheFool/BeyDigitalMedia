import type { Payload } from "payload";

export async function seedUsers(payload: Payload) {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    console.log(
      "⚠️ ADMIN_USERNAME/ADMIN_PASSWORD tanımlı değil — kullanıcı oluşturma atlandı, içerik seeding devam ediyor.",
    );
    return;
  }

  const existingByUsername = await payload.find({
    collection: "users",
    where: { username: { equals: username } },
    limit: 1,
  });
  if (existingByUsername.docs.length === 0) {
    await payload.create({
      collection: "users",
      data: {
        username,
        password,
        name: "Admin",
        role: "admin",
      },
    });
    console.log("✅ Admin user created");
  } else {
    console.log("ℹ️ Admin user already exists");
  }
}
