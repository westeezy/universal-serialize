import type { Thenable } from './types';
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

type Deserializer<V extends unknown, S extends unknown> = (
    serializedValue: S,
    key: string
) => V;
type PrimitiveDeserializer<V, S = V> = (serializedValue: S, key: string) => V;

type Deserializers = {
    // @ts-ignroe - function deserlization not supported yet... Deserializer<Function, any>
    function?: any;
    error?: Deserializer<Error, SerializedError>;
    promise?: Deserializer<Thenable, any>;
    regex?: Deserializer<RegExp, SerializedRegex>;
    date?: Deserializer<Date, SerializedDate>;
    array?: PrimitiveDeserializer<ReadonlyArray<unknown>>;
    object?: PrimitiveDeserializer<Record<string, any>>;
    string?: PrimitiveDeserializer<string>;
    number?: PrimitiveDeserializer<number>;
    boolean?: PrimitiveDeserializer<boolean>;
    null?: PrimitiveDeserializer<null>;
    undefined?: PrimitiveDeserializer<void>;
    [key: string]: Deserializer<unknown, any>;
};

const DESERIALIZER: Deserializers = {
    [TYPE.FUNCTION]: deserializeFunction,
    [TYPE.ERROR]:    deserializeError,
    [TYPE.PROMISE]:  deserializePromise,
    [TYPE.REGEX]:    deserializeRegex,
    [TYPE.DATE]:     deserializeDate,
    [TYPE.ARRAY]:    deserializeArray,
    [TYPE.OBJECT]:   deserializeObject,
    [TYPE.STRING]:   deserializeString,
    [TYPE.NUMBER]:   deserializeNumber,
    [TYPE.BOOLEAN]:  deserializeBoolean,
    [TYPE.NULL]:     deserializeNull,
    [TYPE.UNDEFINED]:deserializeUndefined
};
const defaultDeserializers: Deserializers = {};

export function deserialize<T extends unknown | null | void>(
    str: string,
    deserializers: Deserializers = defaultDeserializers
): T {
    if (str === TYPE.UNDEFINED) {
        // @ts-ignore
        return;
    }

    function replacer(key: string, val: any): unknown | null | undefined {
        // @ts-ignore
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

        const deserializer = deserializers[type] || DESERIALIZER[type];

        if (!deserializer) {
            return value;
        }

        return deserializer(value, key);
    }

    return JSON.parse(str, replacer);
}
