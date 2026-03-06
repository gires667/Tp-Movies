import { AsyncStorage, Productable } from "../types.js";

export class Cart {
    readonly #storage: AsyncStorage;
    readonly #tva: number;

    constructor(storage: AsyncStorage, tva = 0.2) {
        this.#storage = storage;
        this.#tva = tva;
    }

    async buy(product: Productable, quantity: number): Promise<void> {
        if (quantity <= 0) {
            throw new Error("Quantity must be greater than 0");
        }

        const price = product.getPrice();
        const totalItem = quantity * price * (1 + this.#tva);


        await this.#storage.setValue(product.getName(), totalItem);
    }

    async reset(): Promise<void> {
        await this.#storage.reset();
    }

    async restore(product: Productable): Promise<void> {
        await this.#storage.restore(product.getName());
    }

    async total(): Promise<number> {
        const items = await this.#storage.getStorage();
        return Object.values(items).reduce((acc, val) => acc + val, 0);
    }
}
