import { Cart } from "../domain/cart.js";
import { Movie } from "../domain/Movie.js";
import { ArrayStorage } from "../Infrastructure/ArrayStorage.js";
import { PgStorage } from "../Infrastructure/PgStorage.js";
import { AsyncStorage, Productable } from "../types.js";

async function main() {
    console.log("--- Starting Cart Demo ---");

    // Choose storage: 'memory' or 'postgres'
    const storageType = process.env.STORAGE === 'memory' ? 'memory' : 'postgres';
    console.log(`Using storage: ${storageType}`);

    const storage: AsyncStorage = storageType === 'postgres' ? new PgStorage() : new ArrayStorage();
    const cart = new Cart(storage);

    const movie1: Productable = new Movie("Inception", 10);
    const movie2 = new Movie("Interstellar", 12);

    // Scenario
    console.log("1. Resetting cart...");
    await cart.reset();

    console.log("2. Buying Inception (x2)...");
    await cart.buy(movie1, 2);
    console.log(`Current Total: ${await cart.total()}`);

    console.log("3. Buying Inception again (x1)...");
    await cart.buy(movie1, 1);
    console.log(`Current Total: ${await cart.total()}`);

    console.log("4. Buying Interstellar (x1)...");
    await cart.buy(movie2, 1);
    console.log(`Current Total: ${await cart.total()}`);

    console.log("--- Demo Finished ---");
}

main().catch(console.error);
