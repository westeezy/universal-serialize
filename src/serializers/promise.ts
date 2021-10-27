export function serializePromise() : void {
    // pass
}

export function deserializePromise() : Error {
    throw new Error(
        `Promise serialization is not implemented; nothing to deserialize`
    );
}
