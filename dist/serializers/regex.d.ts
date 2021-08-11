import { TYPE } from '../constants';
import type { NativeSerializedType } from '../types';
export declare type SerializedRegex = string;
export declare function serializeRegex(val: RegExp): NativeSerializedType<typeof TYPE.REGEX, SerializedRegex>;
export declare function deserializeRegex(val: string): RegExp;
