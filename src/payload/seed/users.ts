import type { Payload } from "payload";

export async function seedUsers(payload: Payload) {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    throw new Error(
      "ADMIN_USERNAME ve ADMIN_PASSWORD environment değişkenleri tanımlı olmalıdır. Örnek: ADMIN_USERNAME=admin, ADMIN_PASSWORD=güçlü-şifre",
    );
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
