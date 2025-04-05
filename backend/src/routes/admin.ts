import { Hono } from "hono";
import { sign } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import * as bcrypt from "bcryptjs"; // Updated import

export const adminRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// Endpoint for creating an admin user
adminRouter.post("/create-admin", async (c) => {
  const body = await c.req.json();
  const { email, password, name } = body;

  // Check if the user making the request is a superadmin
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // Get the superadmin user by ID from the request header
  const superadminId = c.req.header("user-id");
  if (!superadminId) {
    c.status(400);
    return c.json({ message: "Missing user-id header" });
  }

  const superadmin = await prisma.user.findUnique({
    where: { id: Number(superadminId) },
  });

  // If the user is not a superadmin, return a forbidden response
  if (!superadmin || superadmin.role !== "superadmin") {
    c.status(403);
    return c.json({ message: "Forbidden" });
  }

  // Create the admin user
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const admin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "admin",
      },
    });

    return c.json({ message: "Admin created successfully", admin });
  } catch (e) {
    c.status(500);
    return c.json({ message: "Internal server error" });
  }
});

// Endpoint for admin login
adminRouter.post("/admin-login", async (c) => {
  const body = await c.req.json();
  const { email, password } = body;

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const admin = await prisma.user.findFirst({
      where: {
        email,
        role: "admin",
      },
    });

    if (!admin || !bcrypt.compareSync(password, admin.password)) {
      c.status(401);
      return c.json({ message: "Invalid credentials" });
    }

    const jwt = await sign(
      {
        id: admin.id,
      },
      c.env.JWT_SECRET
    );

    return c.text(jwt);
  } catch (e) {
    c.status(500);
    return c.json({ message: "Internal server error" });
  }
});