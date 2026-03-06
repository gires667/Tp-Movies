import type { ServerResponse } from "node:http";
import type { MovieRepository } from "../Infrastructure/MovieRepository.js";
import type { ScreeningRepository } from "../Infrastructure/ScreeningRepository.js";
import { sendError, sendJson } from "./http.js";

type MovieControllerDeps = {
  movies: MovieRepository;
  screenings: ScreeningRepository;
};

export class MovieController {
  private readonly movies: MovieRepository;
  private readonly screenings: ScreeningRepository;

  constructor(deps: MovieControllerDeps) {
    this.movies = deps.movies;
    this.screenings = deps.screenings;
  }

  async health(res: ServerResponse): Promise<void> {
    return sendJson(res, 200, { ok: true });
  }

  async listMovies(res: ServerResponse): Promise<void> {
    const items = await this.movies.list();
    return sendJson(res, 200, { ok: true, items });
  }

  async listScreeningsByMovieId(
    res: ServerResponse,
    movieId: number
  ): Promise<void> {
    const items = await this.screenings.listByMovieId(movieId);
    return sendJson(res, 200, { ok: true, items });
  }

  notFound(res: ServerResponse): void {
    sendError(res, 404, "Not found");
  }
}

