import { $Values } from 'utility-types';
import { TYPE } from './constants';
import type { CustomSerializedType } from './types';
export declare function isSerializedType(item: any): boolean;
export declare function determineType(val: unknown): $Values<typeof TYPE>;
export declare function serializeType<T extends string, V extends unknown>(type: T, val: V): CustomSerializedType<T, V>;
