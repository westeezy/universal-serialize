import { $Values } from 'utility-types';

import { TYPE } from './constants';
import type {
    Thenable,
    CustomSerializedType,
    NativeSerializedType
} from './types';
import { determineType, isSerializedType } from './common';
import type {
    SerializedError,
    SerializedRegex,
    SerializedDate
} from './serializers';
import {
    serializeFunction,
    serializeError,
    serializePromise,
    serializeRegex,
    serializeDate,
    serializeArray,
    serializeObject,
    serializeString,
    serializeNumber,
    serializeBoolean,
    serializeNull,
    serializeUndefined
} from './serializers';

type NativeSerializer<
    V extends unknown,
    S extends unknown,
    T extends $Values<typeof TYPE>
> = (value: V, key: string) => NativeSerializedType<T, S>;
type CustomSerializer<
    V extends unknown,
    S extends unknown,
    T extends string
> = (value: V, key: string) => CustomSerializedType<T, S>;
type PrimitiveSerializer<V extends unknown, S extends unknown> = (
    value: V,
    key: string
) => S;
type CustomOrPrimitiveSerializer<V extends unknown, T extends string> =
    | CustomSerializer<V, any, T>
    | PrimitiveSerializer<V, any>;
type NativeOrCustomOrPrimitiveSerializer<
    V extends unknown,
    S extends unknown,
    T extends $Values<typeof TYPE>
> = NativeSerializer<V, S, T> | CustomOrPrimitiveSerializer<V, T>;

type Serializers = {
    function?: CustomOrPrimitiveSerializer<
        (...args: Array<any>) => any,
        typeof TYPE.FUNCTION
    >;
    error?: NativeOrCustomOrPrimitiveSerializer<
        Error,
        SerializedError,
        typeof TYPE.ERROR
    >;
    promise?: CustomOrPrimitiveSerializer<Thenable, typeof TYPE.PROMISE>;
    regex?: NativeOrCustomOrPrimitiveSerializer<
        RegExp,
        SerializedRegex,
        typeof TYPE.REGEX
    >;
    date?: NativeOrCustomOrPrimitiveSerializer<
        Date,
        SerializedDate,
        typeof TYPE.DATE
    >;
    array?: CustomOrPrimitiveSerializer<
        ReadonlyArray<unknown>,
        typeof TYPE.ARRAY
    >;
    object?: CustomOrPrimitiveSerializer<
        Record<string, any>,
        typeof TYPE.OBJECT
    >;
    string?: CustomOrPrimitiveSerializer<string, typeof TYPE.STRING>;
    number?: CustomOrPrimitiveSerializer<number, typeof TYPE.NUMBER>;
    boolean?: CustomOrPrimitiveSerializer<boolean, typeof TYPE.BOOLEAN>;
    null?: CustomOrPrimitiveSerializer<null, typeof TYPE.NULL>;
    undefined?: CustomOrPrimitiveSerializer<void, typeof TYPE.UNDEFINED>;
};

const SERIALIZER: Serializers = {
    [TYPE.FUNCTION]: serializeFunction,
    [TYPE.ERROR]:    serializeError,
    [TYPE.PROMISE]:  serializePromise,
    [TYPE.REGEX]:    serializeRegex,
    [TYPE.DATE]:     serializeDate,
    [TYPE.ARRAY]:    serializeArray,
    [TYPE.OBJECT]:   serializeObject,
    [TYPE.STRING]:   serializeString,
    [TYPE.NUMBER]:   serializeNumber,
    [TYPE.BOOLEAN]:  serializeBoolean,
    [TYPE.NULL]:     serializeNull,
    [TYPE.UNDEFINED]:serializeUndefined
};

const defaultSerializers: Serializers = {};

export function serialize<T extends unknown>(
    obj: T,
    serializers: Serializers = defaultSerializers
): string {
    function replacer(key: string): unknown | null | undefined {
        // @ts-ignore
        const val = this[key];

        // @ts-ignore
        if (isSerializedType(this)) {
            return val;
        }

        const type = determineType(val);

        if (!type) {
            return val;
        }

        const serializer = serializers[type] || SERIALIZER[type];

        if (!serializer) {
            return val;
        }

        // @ts-ignore
        return serializer(val, key);
    }

    const result = JSON.stringify(obj, replacer);

    if (typeof result === 'undefined') {
        return TYPE.UNDEFINED;
    }

    return result;
}
