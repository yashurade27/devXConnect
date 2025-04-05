import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { isAuthenticated } from "../middleware/authMiddleware";

export const postRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    user: { id: number };
  };
}>();

postRouter.get("/debug/env", async (c) => {
  return c.json({
    DATABASE_URL: c.env.DATABASE_URL ? "Exists ✅" : "Not Found ❌",
  });
});

postRouter.post("/create", isAuthenticated, async (c) => {
  console.log("Database URL:", c.env.DATABASE_URL);

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { name, techStack, description, projectLinks, linkedIn, email, phone, year, division } = body;
  const user = c.get("user") as { id: number };
  const userId = user.id;

  console.log("Extracted User ID:", userId);
  console.log("Request Body:", body);

  // ✅ Check if user exists in the database
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    console.error("Error: User does not exist.");
    return c.json({ message: "User does not exist" }, 400);
  }

  try {
    const post = await prisma.post.create({
      data: {
        userId,
        name,
        techStack,
        description,
        projectLinks: typeof projectLinks === "string" ? [projectLinks] : projectLinks, // Ensure array
        linkedIn,
        email,
        phone,
        year: Number(year),
        division,
      },
    });

    console.log("Post created successfully:", post);
    return c.json(post);
  } catch (e: any) {
    console.error("Error creating post:", e);
    c.status(500);
    return c.json({ message: "Internal server error", error: e.message });
  }
});

postRouter.put("/:id", isAuthenticated, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = Number(c.req.param("id"));
  const body = await c.req.json();
  const { name, techStack, description, projectLinks, linkedIn, email, phone, year, division } = body;
  const userId = c.get("user").id;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post || post.userId !== userId) {
      c.status(403);
      return c.json({ message: "Forbidden" });
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        name,
        techStack,
        description,
        projectLinks,
        linkedIn,
        email,
        phone,
        year,
        division,
      },
    });

    return c.json(updatedPost);
  } catch (e) {
    c.status(500);
    return c.json({ message: "Internal server error" });
  }
});

postRouter.delete("/:id", isAuthenticated, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = Number(c.req.param("id"));
  const userId = c.get("user").id;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post || post.userId !== userId) {
      c.status(403);
      return c.json({ message: "Forbidden" });
    }

    await prisma.post.delete({
      where: { id },
    });

    return c.json({ message: "Post deleted successfully" });
  } catch (e) {
    c.status(500);
    return c.json({ message: "Internal server error" });
  }
});

postRouter.post("/:id/like", isAuthenticated, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { id } = c.req.param();
  const userId = c.get("user").id;

  try {
    const like = await prisma.like.create({
      data: {
        userId,
        postId: Number(id),
      },
    });

    return c.json(like);
  } catch (e) {
    c.status(500);
    return c.json({ message: "Internal server error" });
  }
});

postRouter.post("/:id/save", isAuthenticated, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { id } = c.req.param();
  const userId = c.get("user").id;

  try {
    const savedPost = await prisma.savedPost.create({
      data: {
        userId,
        postId: Number(id),
      },
    });

    return c.json(savedPost);
  } catch (e) {
    c.status(500);
    return c.json({ message: "Internal server error" });
  }
});

postRouter.get("/all", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const posts = await prisma.post.findMany();
    console.log("Fetched posts:", posts);
    return c.json(posts);
  } catch (e) {
    console.error("Error fetching posts:", e);
    c.status(500);
    return c.json({ message: "Internal server error" });
  }
});

postRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = Number(c.req.param("id"));

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      c.status(404);
      return c.json({ message: "Profile not found" });
    }

    return c.json(post);
  } catch (e) {
    c.status(500);
    return c.json({ message: "Internal server error" });
  }
});
