import type { Thenable } from '../types';
export declare type SerializedPromise = void;
export declare function serializePromise(): SerializedPromise;
export declare function deserializePromise(): Thenable;
