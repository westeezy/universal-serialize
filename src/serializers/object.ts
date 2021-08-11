export type SerializedObject = Record<string, any>;
export function serializeObject(val: Record<string, any>): SerializedObject {
    return val;
}
export function deserializeObject(val: SerializedObject): Record<string, any> {
    return val;
}
