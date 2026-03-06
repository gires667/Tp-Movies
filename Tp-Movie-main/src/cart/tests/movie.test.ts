import { describe, it, expect } from 'vitest';
import { Movie } from '../domain/Movie.js';

describe('Movie', () => {
    it('should return the correct name', () => {
        const movie = new Movie('Inception', 10);
        expect(movie.getName()).toBe('Inception');
    });

    it('should return the correct price', () => {
        const movie = new Movie('Inception', 10);
        expect(movie.getPrice()).toBe(10);
    });
});
