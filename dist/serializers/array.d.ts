export declare type SerializedArray<T extends unknown = unknown> = ReadonlyArray<T>;
export declare function serializeArray<T extends unknown>(val: ReadonlyArray<T>): SerializedArray<T>;
export declare function deserializeArray<T extends unknown>(val: SerializedArray<T>): ReadonlyArray<T>;
