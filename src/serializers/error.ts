import { serializeType } from '../common';
import { TYPE } from '../constants';
import type { NativeSerializedType } from '../types';

import { serializeObject } from './object';

export type SerializedError = {
    message: string;
    stack: string;
    code: string | number | void;
    data: unknown;
};

export function serializeError({
    message,
    stack,
    // @ts-ignore - Error does not match NodeJS.ErrnoException
    code,
    // @ts-ignore - not sure where data comes from
    data
}: Error): NativeSerializedType<typeof TYPE.ERROR, SerializedError> {
    return serializeType(TYPE.ERROR, {
        message,
        stack,
        code,
        data
    });
}
export function deserializeError({
    message,
    stack,
    code,
    data
}: SerializedError): Error {
    const error = new Error(message);
    // @ts-ignore
    error.code = code;

    if (data) {
        // @ts-ignore
        error.data = serializeObject(data);
    }

    error.stack = `${ stack }\n\n${ error.stack }`;
    return error;
}
