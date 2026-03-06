import type { Movie } from "../Domain/Movie.js";
import { db } from "./drizzle.js";
import { movies } from "./schema.js";
import { asc } from "drizzle-orm";

export class MovieRepository {
  async list(): Promise<Movie[]> {
    const rows = await db
      .select()
      .from(movies)
      .orderBy(asc(movies.id));

    return rows.map<Movie>((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      durationMinutes: row.durationMinutes,
      rating: row.rating,
      releaseDate: row.releaseDate ?? null,
    }));
  }
}

