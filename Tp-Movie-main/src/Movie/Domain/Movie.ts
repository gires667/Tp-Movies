export type Movie = {
  id: number;
  title: string;
  description: string | null;
  durationMinutes: number;
  rating: string | null;
  /**
   * Date de sortie sous forme de chaîne `YYYY-MM-DD` ou `null` si inconnue.
   */
  releaseDate: string | null;
};

