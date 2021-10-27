import type { NativeSerializedType } from '../types';
import { TYPE } from '../constants';
export declare type SerializedUndefined = undefined;
export declare function serializeUndefined(val: undefined): NativeSerializedType<typeof TYPE.UNDEFINED, SerializedUndefined>;
export declare function deserializeUndefined(): void;
