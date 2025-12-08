export interface IBaseStore<T> {
    updateValue: <K extends keyof T>(key: K, value: T[K]) => void;
}