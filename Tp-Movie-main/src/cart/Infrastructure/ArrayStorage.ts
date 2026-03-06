import { AsyncStorage } from "../types.js";

export class ArrayStorage implements AsyncStorage {
    private storage: Record<string, number> = {};

    async setValue(key: string, value: number): Promise<void> {
        if (this.storage[key]) {
            this.storage[key] += value;
        } else {
            this.storage[key] = value;
        }
    }

    async restore(key: string): Promise<void> {
        delete this.storage[key];
    }

    async reset(): Promise<void> {
        this.storage = {};
    }

    async getStorage(): Promise<Record<string, number>> {
        return { ...this.storage };
    }
}
