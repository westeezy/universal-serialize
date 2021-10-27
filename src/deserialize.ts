import { TYPE } from './constants';
import { determineType, isSerializedType } from './common';
import type {
    SerializedError,
    SerializedRegex,
    SerializedDate
} from './serializers';
import {
    deserializeFunction,
    deserializeError,
    deserializePromise,
    deserializeRegex,
    deserializeDate,
    deserializeArray,
    deserializeObject,
    deserializeString,
    deserializeNumber,
    deserializeBoolean,
    deserializeNull,
    deserializeUndefined
} from './serializers';
import type { CustomSerializedType } from './types';

type Deserializer<V, S> = (serializedValue : S, key : string) => V;
type PrimitiveDeserializer<V, S = V> = (serializedValue : S, key : string) => V;

type Deserializers = {
    function : Deserializer<unknown, unknown>,
    error : Deserializer<Error, SerializedError>,
    promise : Deserializer<unknown, unknown>,
    regex : Deserializer<RegExp, SerializedRegex>,
    date : Deserializer<Date, SerializedDate>,
    array : PrimitiveDeserializer<ReadonlyArray<unknown>>,
    object : PrimitiveDeserializer<Record<string, unknown>>,
    string : PrimitiveDeserializer<string>,
    number : PrimitiveDeserializer<number>,
    boolean : PrimitiveDeserializer<boolean>,
    null : PrimitiveDeserializer<null>,
    undefined : PrimitiveDeserializer<void>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key : string] : Deserializer<unknown, any>,
};

const DESERIALIZER : Deserializers = {
    [TYPE.FUNCTION]:  deserializeFunction,
    [TYPE.ERROR]:     deserializeError,
    [TYPE.PROMISE]:   deserializePromise,
    [TYPE.REGEX]:     deserializeRegex,
    [TYPE.DATE]:      deserializeDate,
    [TYPE.ARRAY]:     deserializeArray,
    [TYPE.OBJECT]:    deserializeObject,
    [TYPE.STRING]:    deserializeString,
    [TYPE.NUMBER]:    deserializeNumber,
    [TYPE.BOOLEAN]:   deserializeBoolean,
    [TYPE.NULL]:      deserializeNull,
    [TYPE.UNDEFINED]: deserializeUndefined
};

const defaultDeserializers : Partial<Deserializers> = {};

export function deserialize<T extends unknown | null>(str : string, deserializers : Partial<Deserializers> = defaultDeserializers) : T {
    if (str === TYPE.UNDEFINED) {
        // the lib allows undefined returns but doesnt expect type assertions for it. need fixing
        // @ts-ignore
        return;
    }

    function replacer(key : string, val : CustomSerializedType<string, T>) : unknown | null | undefined {
        // @ts-ignore - function this has unknown caller
        if (isSerializedType(this)) {
            return val;
        }

        let type;
        let value;

        if (isSerializedType(val)) {
            type = val.__type__;
            value = val.__val__;
        } else {
            type = determineType(val);
            value = val;
        }

        if (!type) {
            return value;
        }

        const deserializer = deserializers[type] ?? DESERIALIZER[type];

        if (!deserializer) {
            return value;
        }

        return deserializer(value, key);
    }

    return JSON.parse(str, replacer);
}
