import type { NativeSerializedType } from '../types';
import { serializeType } from '../common';
import { TYPE } from '../constants';

export type SerializedUndefined = undefined;

export function serializeUndefined(val : undefined) : NativeSerializedType<typeof TYPE.UNDEFINED, SerializedUndefined> {
    return serializeType(TYPE.UNDEFINED, val);
}

export function deserializeUndefined() : void {
    // pass
}
