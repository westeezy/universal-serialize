/// <reference types="node" />
import { TYPE } from '../constants';
import type { NativeSerializedType } from '../types';
export declare type SerializedError = {
    message: string;
    stack: string | undefined;
    code: string | undefined;
    data?: Record<string, unknown>;
};
export declare type ExtendedError = {
    data?: Record<string, unknown>;
} & NodeJS.ErrnoException;
export declare function serializeError({ message, stack, code, data }: ExtendedError): NativeSerializedType<typeof TYPE.ERROR, SerializedError>;
export declare function deserializeError({ message, stack, code, data }: SerializedError): ExtendedError;
