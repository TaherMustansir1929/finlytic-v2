// index.ts
import { Hono } from "hono";
import authors from "./authors";
import books from "./books";

const app = new Hono();

const routes = app.route("/authors", authors).route("/books", books);

export default app;
export type AppType = typeof routes;
