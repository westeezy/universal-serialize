export type SerializedFunction = void;
export function serializeFunction(): SerializedFunction {
    // pass
}
export function deserializeFunction(): void {
    throw new Error(
        `Function serialization is not implemented; nothing to deserialize`
    );
}
