import type { Screening } from "../Domain/Screening.js";
import { db } from "./drizzle.js";
import { rooms, screenings } from "./schema.js";
import { and, asc, eq } from "drizzle-orm";

export class ScreeningRepository {
  async listByMovieId(movieId: number): Promise<Screening[]> {
    const rows = await db
      .select({
        id: screenings.id,
        movieId: screenings.movieId,
        startTime: screenings.startTime,
        price: screenings.price,
        roomId: rooms.id,
        roomName: rooms.name,
        roomCapacity: rooms.capacity,
      })
      .from(screenings)
      .innerJoin(rooms, eq(screenings.roomId, rooms.id))
      .where(and(eq(screenings.movieId, movieId)))
      .orderBy(asc(screenings.startTime));

    return rows.map<Screening>((row) => ({
      id: row.id,
      movieId: row.movieId,
      startTime: row.startTime instanceof Date ? row.startTime.toISOString() : String(row.startTime),
      price: typeof row.price === "number" ? row.price : Number(row.price),
      room: {
        id: row.roomId,
        name: row.roomName,
        capacity: row.roomCapacity,
      },
    }));
  }
}

