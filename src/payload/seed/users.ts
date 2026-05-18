import type { Payload } from "payload";

export async function seedUsers(payload: Payload) {
  try {
    // Önce username ile ara
    const existingByUsername = await payload.find({
      collection: "users",
      where: { username: { equals: "admin" } },
      limit: 1,
    });
    if (existingByUsername.docs.length === 0) {
      // Eski email-based admin var mı kontrol et ve güncelle
      const existingByEmail = await payload.find({
        collection: "users",
        where: { email: { equals: "admin@beydigitalmedia.com" } },
        limit: 1,
      });
      if (existingByEmail.docs.length > 0) {
        const userId = existingByEmail.docs[0].id;
        await payload.update({
          collection: "users",
          id: userId,
          data: {
            username: "admin",
            password: "admin123",
          },
        });
        console.log("✅ Admin user updated with username: admin");
      } else {
        await payload.create({
          collection: "users",
          data: {
            username: "admin",
            password: "admin123",
            name: "Admin",
            role: "admin",
          },
        });
        console.log("✅ Admin user created (username: admin)");
      }
    } else {
      console.log("ℹ️ Admin user already exists");
    }
  } catch (e) {
    console.error("❌ Admin user error:", e);
  }
}
