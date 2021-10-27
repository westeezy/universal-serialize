export declare type SerializedArray<T = unknown> = ReadonlyArray<T>;
export declare function serializeArray<T>(val: ReadonlyArray<T>): SerializedArray<T>;
export declare function deserializeArray<T>(val: SerializedArray<T>): ReadonlyArray<T>;
