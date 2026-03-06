export interface Productable {
    getName(): string;
    getPrice(): number;
}

export interface Storage {
    setValue(key: string, value: number): void;
    restore(key: string): void;
    reset(): void;
    getStorage(): Record<string, number>;
}

export interface AsyncStorage {
    setValue(key: string, value: number): Promise<void>;
    restore(key: string): Promise<void>;
    reset(): Promise<void>;
    getStorage(): Promise<Record<string, number>>;
}
