import type { NativeSerializedType } from '../types';
import { TYPE } from '../constants';
export declare type SerializedUndefined = void;
export declare function serializeUndefined(val: void): NativeSerializedType<typeof TYPE.UNDEFINED, SerializedUndefined>;
export declare function deserializeUndefined(): void;
