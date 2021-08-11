import { TYPE } from '../constants';
import type { NativeSerializedType } from '../types';
export declare type SerializedDate = string;
export declare function serializeDate(val: Date): NativeSerializedType<typeof TYPE.DATE, SerializedDate>;
export declare function deserializeDate(val: string): Date;
