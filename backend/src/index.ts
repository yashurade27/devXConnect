import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { adminRouter } from "./routes/admin";
import { postRouter } from "./routes/post";

const app = new Hono<{  
  Bindings: { DATABASE_URL: string; JWT_SECRET: string };
}>();

app.get("/test-env", (c) => {
  return c.json({
    DATABASE_URL: c.env.DATABASE_URL ? "Exists" : "Not Found",
    JWT_SECRET: c.env.JWT_SECRET ? "Exists" : "Not Found",
  });
});


console.log("✅ API Routes Registered:");

const allowedOrigins = ['http://localhost:5173']; // Add more if needed

app.options('/*', (c) => {
  const origin = c.req.header('Origin') || '*';
  c.res.headers.set('Access-Control-Allow-Origin', origin);
  c.res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  c.res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  c.res.headers.set('Access-Control-Allow-Credentials', 'true');
  return c.body(null, 204);
});

app.use(async (c, next) => {
  await next();
  const origin = c.req.header('Origin') || '*';
  c.res.headers.set('Access-Control-Allow-Origin', origin);
  c.res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  c.res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  c.res.headers.set('Access-Control-Allow-Credentials', 'true');
});

app.route("/api/v1/user", userRouter);
app.route("/api/v1/admin", adminRouter);
app.route("/api/v1/posts", postRouter);

console.log(app.routes);
export default app;
