import { serializeType } from '../common';
import { TYPE } from '../constants';
import type { NativeSerializedType } from '../types';

import { serializeObject } from './object';

export type SerializedError = {
    message : string,
    stack : string | undefined,
    code : string | undefined,
    data ?: Record<string, unknown>,
};

export type ExtendedError = {
    data ?: Record<string, unknown>,
// eslint-disable-next-line  no-undef
} & NodeJS.ErrnoException;

export function serializeError({ message, stack, code, data } : ExtendedError) : NativeSerializedType<typeof TYPE.ERROR, SerializedError> {
    return serializeType(TYPE.ERROR, {
        message,
        stack,
        code,
        data
    });
}

export function deserializeError({ message, stack, code, data } : SerializedError) : ExtendedError {
    const error : ExtendedError = new Error(message);
    error.code = code;

    if (data) {
        error.data = serializeObject(data);
    }

    error.stack = `${ stack }\n\n${ error.stack }`;
    return error;
}
