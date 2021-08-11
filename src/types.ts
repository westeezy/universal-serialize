import { $Values } from 'utility-types';

import { TYPE } from './constants';
// export something to force webpack to see this as an ES module
export const TYPES = true;

export type TypeSerializableTypes = $Values<typeof TYPE>;

export type Thenable = {
    then: (
        onSuccess?: (val?: unknown) => unknown,
        onError?: (err?: unknown) => unknown
    ) => Thenable;
    catch: (onError?: (err?: unknown) => unknown) => Thenable;
};

export type NativeSerializedType<
    T extends $Values<typeof TYPE>,
    V extends unknown
> = {
    __type__: T;
    __val__: V;
};

export type CustomSerializedType<T extends string, V extends unknown> = {
    __type__: T;
    __val__: V;
};
