export type SerializedObject = Record<string, unknown>;

export function serializeObject(val : Record<string, unknown>) : SerializedObject {
    return val;
}

export function deserializeObject(val : SerializedObject) : Record<string, unknown> {
    return val;
}
