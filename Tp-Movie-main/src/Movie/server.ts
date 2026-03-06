import { createServer } from "node:http";
import { pool } from "./Infrastructure/DB.js";
import { MovieRepository } from "./Infrastructure/MovieRepository.js";
import { ScreeningRepository } from "./Infrastructure/ScreeningRepository.js";
import { router } from "./Server/router.js";

const movies = new MovieRepository(pool);
const screenings = new ScreeningRepository(pool);

const server = createServer(async (req, res) => {
  await router(req, res, { pool, movies, screenings });
});

const PORT = Number(process.env.PORT ?? 3001);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Movie API listening on http://localhost:${PORT}`);
});

