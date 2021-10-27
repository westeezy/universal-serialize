export declare type SerializedObject = Record<string, unknown>;
export declare function serializeObject(val: Record<string, unknown>): SerializedObject;
export declare function deserializeObject(val: SerializedObject): Record<string, unknown>;
