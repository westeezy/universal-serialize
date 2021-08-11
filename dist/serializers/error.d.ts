import { TYPE } from '../constants';
import type { NativeSerializedType } from '../types';
export declare type SerializedError = {
    message: string;
    stack: string;
    code: string | number | void;
    data: unknown;
};
export declare function serializeError({ message, stack, code, data }: Error): NativeSerializedType<typeof TYPE.ERROR, SerializedError>;
export declare function deserializeError({ message, stack, code, data }: SerializedError): Error;
