import type { IncomingMessage, ServerResponse } from "node:http";
import type { Pool } from "pg";
import { z } from "zod";
import type { MovieRepository } from "../Infrastructure/MovieRepository.js";
import type { ScreeningRepository } from "../Infrastructure/ScreeningRepository.js";
import { sendError } from "./http.js";
import { MovieController } from "./MovieController.js";

type RouterDeps = {
  pool: Pool;
  movies: MovieRepository;
  screenings: ScreeningRepository;
};

const MovieIdSchema = z.coerce.number().int().positive();

export async function router(
  req: IncomingMessage,
  res: ServerResponse,
  deps: RouterDeps
): Promise<void> {
  const { movies, screenings } = deps;
  const controller = new MovieController({ movies, screenings });

  const method = req.method ?? "GET";
  const url = req.url ?? "/";
  const [rawPath] = url.split("?", 2);
  const safeRawPath = rawPath ?? "/";
  const path: string = safeRawPath === "" ? "/" : safeRawPath;
  const segments = path.split("/").filter(Boolean);

  try {
    if (method === "GET" && path === "/health") {
      return controller.health(res);
    }

    if (method === "GET" && path === "/movies") {
      return controller.listMovies(res);
    }

    if (
      method === "GET" &&
      segments[0] === "movies" &&
      segments.length === 3 &&
      (segments[2] === "screenings" || segments[2] === "seances")
    ) {
      const parsedMovieId = MovieIdSchema.safeParse(segments[1]);
      if (!parsedMovieId.success) {
        return sendError(res, 400, "Invalid movie id");
      }

      const movieId = parsedMovieId.data;
      return controller.listScreeningsByMovieId(res, movieId);
    }

    return controller.notFound(res);
  } catch (err) {
    console.error("Unexpected error in router:", err);
    return sendError(res, 500, "Internal server error");
  }
}

