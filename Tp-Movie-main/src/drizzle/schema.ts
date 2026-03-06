import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  numeric,
  date
} from "drizzle-orm/pg-core";

/* =========================
   MOVIES
========================= */

export const movies = pgTable("movies", {
  id: serial("id").primaryKey(),

  title: text("title").notNull(),

  description: text("description"),

  durationMinutes: integer("duration_minutes").notNull(),

  rating: text("rating"),

  releaseDate: date("release_date")
});


/* =========================
   ROOMS
========================= */

export const rooms = pgTable("rooms", {
  id: serial("id").primaryKey(),

  name: text("name").notNull(),

  capacity: integer("capacity").notNull()
});


/* =========================
   SCREENINGS
========================= */

export const screenings = pgTable("screenings", {
  id: serial("id").primaryKey(),

  movieId: integer("movie_id")
    .notNull()
    .references(() => movies.id, { onDelete: "cascade" }),

  roomId: integer("room_id")
    .notNull()
    .references(() => rooms.id, { onDelete: "cascade" }),

  startTime: timestamp("start_time").notNull(),

  price: numeric("price", { precision: 6, scale: 2 }).notNull()
});