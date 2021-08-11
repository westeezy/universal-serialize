export type SerializedArray<T extends unknown = unknown> = ReadonlyArray<T>;
export function serializeArray<T extends unknown>(
    val: ReadonlyArray<T>
): SerializedArray<T> {
    return val;
}
export function deserializeArray<T extends unknown>(
    val: SerializedArray<T>
): ReadonlyArray<T> {
    return val;
}
