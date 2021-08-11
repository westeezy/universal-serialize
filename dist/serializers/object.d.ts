export declare type SerializedObject = Record<string, any>;
export declare function serializeObject(val: Record<string, any>): SerializedObject;
export declare function deserializeObject(val: SerializedObject): Record<string, any>;
