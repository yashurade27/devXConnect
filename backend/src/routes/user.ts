import { Hono } from "hono";
import { sign } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signinInput, signupInput } from "@yashuradepbl/common";
import { hash, compare } from "bcryptjs";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.get("/", (c) => c.json({ message: "User API working!" }));

// Signup Route
userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL, // Use DATABASE_URL from environment
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  
  if (!success) {
    c.status(400);
    return c.json({ message: "Inputs not correct" });
  }

  try {
    const hashedPassword = await hash(body.password, 5);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        name: body.name,
      },
    });

    console.log("User Created with ID:", user.id); // ✅ Debugging

    const jwt = await sign(
      { id: Number(user.id) }, // Ensure ID is a number
      c.env.JWT_SECRET
    );

    return c.text(jwt);
  } catch (e) {
    console.error("Signup Error:", e); // ✅ Log actual error
    c.status(500);
    return c.text("Internal Server Error");
  }
});

// Signin Route
userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL, // Use DATABASE_URL from environment
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  
  if (!success) {
    c.status(400);
    return c.json({ message: "Inputs not correct" });
  }

  try {
    const user = await prisma.user.findFirst({
      where: { email: body.email },
    });

    if (!user) {
      console.log("User not found for email:", body.email); // ✅ Debugging
    }

    if (!user || !(await compare(body.password, user.password))) {
      c.status(401);
      return c.text("Invalid credentials");
    }

    console.log("User Signed in with ID:", user.id); // ✅ Debugging

    const jwt = await sign(
      { id: Number(user.id) }, // Ensure ID is a number
      c.env.JWT_SECRET
    );

    return c.text(jwt);
  } catch (e) {
    console.error("Signin Error:", e); // ✅ Log actual error
    c.status(500);
    return c.text("Internal Server Error");
  }
});

export default userRouter;
