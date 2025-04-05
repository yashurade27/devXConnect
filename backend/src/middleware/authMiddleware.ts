import { verify } from "hono/jwt";
import { Context } from "hono";

export const isAuthenticated = async (c: Context, next: () => Promise<void>) => {
  const authHeader = c.req.header("Authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    console.log("Authorization header missing or token not provided");
    return c.json({ message: "Unauthorized: Token not provided" }, 401);
  }

  try {
    const payload = await verify(token, c.env.JWT_SECRET);
    console.log("Decoded JWT Payload:", payload);
    if (!payload) {
      throw new Error("Invalid token payload");
    }

    console.log("Decoded JWT Payload:", payload); // ✅ Debugging JWT Payload

    c.set("user", payload); // Attach user payload to context
    await next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return c.json({ message: "Unauthorized: Invalid token" }, 401);
  }
};
