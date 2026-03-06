import { describe, it, expect, beforeEach } from 'vitest';
import { Cart } from '../domain/cart.js';
import { ArrayStorage } from '../Infrastructure/ArrayStorage.js';
import { Movie } from '../domain/Movie.js';

describe('Cart', () => {
    let cart: Cart;
    let storage: ArrayStorage;

    beforeEach(() => {
        storage = new ArrayStorage();
        cart = new Cart(storage);
    });

    it('should start with a total of 0', async () => {
        expect(await cart.total()).toBe(0);
    });

    it('should add an item and calculate total correctly', async () => {
        const movie = new Movie('Inception', 10);
        await cart.buy(movie, 2); // 2 * 10 * 1.2 = 24
        expect(await cart.total()).toBe(24);
    });

    it('should accumulate total correctly', async () => {
        const movie1 = new Movie('Inception', 10);
        const movie2 = new Movie('Interstellar', 12);

        await cart.buy(movie1, 1); // 10 * 1.2 = 12
        await cart.buy(movie2, 1); // 12 * 1.2 = 14.4

        expect(await cart.total()).toBeCloseTo(26.4);
    });

    it('should throw error for invalid quantity', async () => {
        const movie = new Movie('Inception', 10);
        await expect(cart.buy(movie, 0)).rejects.toThrow('Quantity must be greater than 0');
        await expect(cart.buy(movie, -1)).rejects.toThrow('Quantity must be greater than 0');
    });

    it('should reset the cart', async () => {
        const movie = new Movie('Inception', 10);
        await cart.buy(movie, 1);
        await cart.reset();
        expect(await cart.total()).toBe(0);
    });
});
