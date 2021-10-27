import type { Thenable } from './types';
import type { SerializedError, SerializedRegex, SerializedDate } from './serializers';
declare type Deserializer<V extends unknown, S extends unknown> = (serializedValue: S, key: string) => V;
declare type PrimitiveDeserializer<V, S = V> = (serializedValue: S, key: string) => V;
declare type Deserializers = {
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
export declare function deserialize<T extends unknown | null | void>(str: string, deserializers?: Deserializers): T;
export {};