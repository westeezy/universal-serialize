export type SerializedArray<T = unknown> = ReadonlyArray<T>;

export function serializeArray<T>(val : ReadonlyArray<T>) : SerializedArray<T> {
    return val;
}

export function deserializeArray<T>(val : SerializedArray<T>) : ReadonlyArray<T> {
    return val;
}
