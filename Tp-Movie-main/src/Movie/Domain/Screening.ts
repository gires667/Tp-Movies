export type Screening = {
  id: number;
  movieId: number;
  /**
   * Date et heure de début de séance sous forme de chaîne (ISO par exemple).
   */
  startTime: string;
  price: number;
  room: {
    id: number;
    name: string;
    capacity: number;
  };
};

