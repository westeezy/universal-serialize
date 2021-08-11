import { $Values } from 'utility-types';
import { TYPE } from './constants';
export declare const TYPES = true;
export declare type TypeSerializableTypes = $Values<typeof TYPE>;
export declare type Thenable = {
    then: (onSuccess?: (val?: unknown) => unknown, onError?: (err?: unknown) => unknown) => Thenable;
    catch: (onError?: (err?: unknown) => unknown) => Thenable;
};
export declare type NativeSerializedType<T extends $Values<typeof TYPE>, V extends unknown> = {
    __type__: T;
    __val__: V;
};
export declare type CustomSerializedType<T extends string, V extends unknown> = {
    __type__: T;
    __val__: V;
};
