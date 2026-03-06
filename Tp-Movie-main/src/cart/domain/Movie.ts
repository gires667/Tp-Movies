import { Productable } from "../types.js";

export class Movie implements Productable {
    readonly #name: string;
    readonly #price: number;

    constructor(name: string, price: number) {
        this.#name = name;
        this.#price = price;
    }

    getName(): string {
        return this.#name;
    }

    getPrice(): number {
        return this.#price;
    }
}
