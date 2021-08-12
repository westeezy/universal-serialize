/* eslint max-lines: off */
import type { CustomSerializedType } from '../../src';
import {
    TYPE,
    serialize,
    deserialize,
    serializeType,
    serializeObject
} from '../../src';

describe('custom type cases', () => {
    const CUSTOM_SERIALIZATION = 'CUSTOM_SERIALIZATION';
    it('should serialize a date with a custom serializer and deserializer', () => {
        const val = {
            foo: new Date()
        };
        const serializedValue = `serialized::${ Math.random().toString() }`;
        const deserializedValue = `deserialized::${ Math.random().toString() }`;
        const serializers = {
            [TYPE.DATE]: (
                value: Date,
                key: string
            ): CustomSerializedType<typeof CUSTOM_SERIALIZATION, string> => {
                if (value.toJSON() !== val.foo.toJSON()) {
                    throw new Error(
                        `Expected ${ JSON.stringify(
                            value
                        ) } to equal ${ JSON.stringify(val.foo) }`
                    );
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }

                return serializeType(CUSTOM_SERIALIZATION, serializedValue);
            }
        };
        const deserializers = {
            [CUSTOM_SERIALIZATION]: (value: any, key: string) => {
                if (value !== serializedValue) {
                    throw new Error(
                        `Expected ${ JSON.stringify(
                            value
                        ) } to equal ${ JSON.stringify(serializedValue) }`
                    );
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }

                return deserializedValue;
            }
        };
        const result = deserialize<any>(
            serialize(val, serializers),
            deserializers
        );

        if (result.foo !== deserializedValue) {
            throw new Error(
                `Expected ${ result.foo } to equal ${ deserializedValue }`
            );
        }
    });
    it('should serialize a boolean with a custom serializer and deserializer', () => {
        const val = {
            foo: true
        };
        const serializedValue = `serialized::${ Math.random().toString() }`;
        const deserializedValue = `deserialized::${ Math.random().toString() }`;
        const serializers = {
            [TYPE.BOOLEAN]: (
                value: boolean,
                key: string
            ): CustomSerializedType<typeof CUSTOM_SERIALIZATION, string> => {
                if (value !== val.foo) {
                    throw new Error(
                        `Expected ${ JSON.stringify(
                            value
                        ) } to equal ${ JSON.stringify(val.foo) }`
                    );
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }

                return serializeType(CUSTOM_SERIALIZATION, serializedValue);
            }
        };
        const deserializers = {
            [CUSTOM_SERIALIZATION]: (value: any, key: string) => {
                if (value !== serializedValue) {
                    throw new Error(
                        `Expected ${ JSON.stringify(
                            value
                        ) } to equal ${ JSON.stringify(serializedValue) }`
                    );
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }

                return deserializedValue;
            }
        };
        const result = deserialize<any>(
            serialize(val, serializers),
            deserializers
        );

        if (result.foo !== deserializedValue) {
            throw new Error(
                `Expected ${ result.foo } to equal ${ deserializedValue }`
            );
        }
    });
    it('should serialize a string with a custom serializer and deserializer', () => {
        const val = {
            foo: 'hello world\nsup'
        };
        const serializedValue = `serialized::${ Math.random().toString() }`;
        const deserializedValue = `deserialized::${ Math.random().toString() }`;
        const serializers = {
            [TYPE.STRING]: (
                value: string,
                key: any
            ): CustomSerializedType<typeof CUSTOM_SERIALIZATION, string> => {
                if (value !== val.foo) {
                    throw new Error(
                        `Expected ${ JSON.stringify(
                            value
                        ) } to equal ${ JSON.stringify(val.foo) }`
                    );
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }

                return serializeType(CUSTOM_SERIALIZATION, serializedValue);
            }
        };
        const deserializers = {
            [CUSTOM_SERIALIZATION]: (value: any, key: string) => {
                if (value !== serializedValue) {
                    throw new Error(
                        `Expected ${ JSON.stringify(
                            value
                        ) } to equal ${ JSON.stringify(serializedValue) }`
                    );
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }

                return deserializedValue;
            }
        };
        const result = deserialize<any>(
            serialize(val, serializers),
            deserializers
        );

        if (result.foo !== deserializedValue) {
            throw new Error(
                `Expected ${ result.foo } to equal ${ deserializedValue }`
            );
        }
    });
    it('should serialize a number with a custom serializer and deserializer', () => {
        const val = {
            foo: 12345
        };
        const serializedValue = `serialized::${ Math.random().toString() }`;
        const deserializedValue = `deserialized::${ Math.random().toString() }`;
        const serializers = {
            [TYPE.NUMBER]: (
                value: number,
                key: string
            ): CustomSerializedType<typeof CUSTOM_SERIALIZATION, string> => {
                if (value !== val.foo) {
                    throw new Error(
                        `Expected ${ JSON.stringify(
                            value
                        ) } to equal ${ JSON.stringify(val.foo) }`
                    );
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }

                return serializeType(CUSTOM_SERIALIZATION, serializedValue);
            }
        };
        const deserializers = {
            [CUSTOM_SERIALIZATION]: (value: any, key: string) => {
                if (value !== serializedValue) {
                    throw new Error(
                        `Expected ${ JSON.stringify(
                            value
                        ) } to equal ${ JSON.stringify(serializedValue) }`
                    );
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }

                return deserializedValue;
            }
        };
        const result = deserialize<any>(
            serialize(val, serializers),
            deserializers
        );

        if (result.foo !== deserializedValue) {
            throw new Error(`Expected ${ result.foo } to equal ${ val.foo }`);
        }
    });
    it('should serialize a float with a custom serializer and deserializer', () => {
        const val = {
            foo: 123.45
        };
        const serializedValue = `serialized::${ Math.random().toString() }`;
        const deserializedValue = `deserialized::${ Math.random().toString() }`;
        const serializers = {
            [TYPE.NUMBER]: (
                value: number,
                key: string
            ): CustomSerializedType<typeof CUSTOM_SERIALIZATION, string> => {
                if (value !== val.foo) {
                    throw new Error(
                        `Expected ${ JSON.stringify(
                            value
                        ) } to equal ${ JSON.stringify(val.foo) }`
                    );
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }

                return serializeType(CUSTOM_SERIALIZATION, serializedValue);
            }
        };
        const deserializers = {
            [CUSTOM_SERIALIZATION]: (value: any, key: string) => {
                if (value !== serializedValue) {
                    throw new Error(
                        `Expected ${ JSON.stringify(
                            value
                        ) } to equal ${ JSON.stringify(serializedValue) }`
                    );
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }

                return deserializedValue;
            }
        };
        const result = deserialize<any>(
            serialize(val, serializers),
            deserializers
        );

        if (result.foo !== deserializedValue) {
            throw new Error(`Expected ${ result.foo } to equal ${ val.foo }`);
        }
    });
    it('should serialize an array  with a custom serializer and deserializer', () => {
        const val = {
            foo: [
                1,
                2,
                3,
                'hello',
                {
                    '5': 6
                }
            ]
        };
        const serializedValue = `serialized::${ Math.random().toString() }`;
        const deserializedValue = `deserialized::${ Math.random().toString() }`;
        const serializers = {
            [TYPE.ARRAY]: (
                value: any[],
                key: string
            ): CustomSerializedType<typeof CUSTOM_SERIALIZATION, string> => {
                if (value !== val.foo) {
                    throw new Error(
                        `Expected ${ JSON.stringify(
                            value
                        ) } to equal ${ JSON.stringify(val.foo) }`
                    );
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }

                return serializeType(CUSTOM_SERIALIZATION, serializedValue);
            }
        };
        const deserializers = {
            [CUSTOM_SERIALIZATION]: (value: any, key: string) => {
                if (value !== serializedValue) {
                    throw new Error(
                        `Expected ${ JSON.stringify(
                            value
                        ) } to equal ${ JSON.stringify(serializedValue) }`
                    );
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }

                return deserializedValue;
            }
        };
        // @ts-ignore
        const result = deserialize<any>(
            serialize(val, serializers),
            deserializers
        );

        if (result.foo !== deserializedValue) {
            throw new Error(
                `Expected ${ result.foo } to equal ${ deserializedValue }`
            );
        }
    });
    it('should serialize an object  with a custom serializer and deserializer', () => {
        const val = {
            foo: {
                woop: [
                    1,
                    2,
                    3,
                    'hello',
                    {
                        '5': 6
                    }
                ],
                floop: 5
            }
        };
        const serializedValue = `serialized::${ Math.random().toString() }`;
        const deserializedValue = `deserialized::${ Math.random().toString() }`;
        const serializers = {
            [TYPE.OBJECT]: (
                value: any,
                key: string
            ): CustomSerializedType<typeof CUSTOM_SERIALIZATION, string> => {
                if (value !== val.foo) {
                    // @ts-ignore
                    return serializeObject(value);
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }

                return serializeType(CUSTOM_SERIALIZATION, serializedValue);
            }
        };
        const deserializers = {
            [CUSTOM_SERIALIZATION]: (value: any, key: string) => {
                if (value !== serializedValue) {
                    throw new Error(
                        `Expected ${ JSON.stringify(
                            value
                        ) } to equal ${ JSON.stringify(serializedValue) }`
                    );
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }

                return deserializedValue;
            }
        };
        const result = deserialize<any>(
            serialize(val, serializers),
            deserializers
        );

        if (result.foo !== deserializedValue) {
            throw new Error(
                `Expected ${ result.foo } to equal ${ deserializedValue }`
            );
        }
    });
    it('should serialize a regex with a custom serializer and deserializer', () => {
        const val = {
            foo: /hello world[123]/
        };
        const serializedValue = `serialized::${ Math.random().toString() }`;
        const deserializedValue = `deserialized::${ Math.random().toString() }`;
        const serializers = {
            [TYPE.REGEX]: (
                value: RegExp,
                key: string
            ): CustomSerializedType<typeof CUSTOM_SERIALIZATION, string> => {
                if (value !== val.foo) {
                    throw new Error(
                        `Expected ${ JSON.stringify(
                            value
                        ) } to equal ${ JSON.stringify(val.foo) }`
                    );
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }

                return serializeType(CUSTOM_SERIALIZATION, serializedValue);
            }
        };
        const deserializers = {
            [CUSTOM_SERIALIZATION]: (value: any, key: string) => {
                if (value !== serializedValue) {
                    throw new Error(
                        `Expected ${ JSON.stringify(
                            value
                        ) } to equal ${ JSON.stringify(serializedValue) }`
                    );
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }

                return deserializedValue;
            }
        };
        const result = deserialize<any>(
            serialize(val, serializers),
            deserializers
        );

        if (result.foo !== deserializedValue) {
            throw new Error(
                `Expected ${ result.foo } to equal ${ deserializedValue }`
            );
        }
    });
    it('should serialize null with a custom serializer and deserializer', () => {
        const val: Record<string, null> = {
            foo: null
        };
        const serializedValue = `serialized::${ Math.random().toString() }`;
        const deserializedValue = `deserialized::${ Math.random().toString() }`;
        const serializers = {
            [TYPE.NULL]: (
                value: null,
                key: string
            ): CustomSerializedType<typeof CUSTOM_SERIALIZATION, string> => {
                if (value !== val.foo) {
                    throw new Error(
                        `Expected ${ JSON.stringify(
                            value
                        ) } to equal ${ JSON.stringify(val.foo) }`
                    );
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }

                return serializeType(CUSTOM_SERIALIZATION, serializedValue);
            }
        };
        const deserializers = {
            [CUSTOM_SERIALIZATION]: (value: any, key: string) => {
                if (value !== serializedValue) {
                    throw new Error(
                        `Expected ${ JSON.stringify(
                            value
                        ) } to equal ${ JSON.stringify(serializedValue) }`
                    );
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }

                return deserializedValue;
            }
        };
        const result = deserialize<any>(
            serialize(val, serializers),
            deserializers
        );

        if (result.foo !== deserializedValue) {
            throw new Error(
                `Expected ${ result.foo } to equal ${ deserializedValue }`
            );
        }
    });
    it('should serialize an error with a custom serializer and deserializer', () => {
        const val = {
            foo: new Error('meep')
        };
        const serializedValue = `serialized::${ Math.random().toString() }`;
        const deserializedValue = `deserialized::${ Math.random().toString() }`;
        const serializers = {
            [TYPE.ERROR]: (
                value: Error,
                key: string
            ): CustomSerializedType<typeof CUSTOM_SERIALIZATION, string> => {
                if (value !== val.foo) {
                    throw new Error(
                        `Expected ${ JSON.stringify(
                            value
                        ) } to equal ${ JSON.stringify(val.foo) }`
                    );
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }

                return serializeType(CUSTOM_SERIALIZATION, serializedValue);
            }
        };
        const deserializers = {
            [CUSTOM_SERIALIZATION]: (value: any, key: string) => {
                if (value !== serializedValue) {
                    throw new Error(
                        `Expected ${ JSON.stringify(
                            value
                        ) } to equal ${ JSON.stringify(serializedValue) }`
                    );
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }

                return deserializedValue;
            }
        };
        const result = deserialize<any>(
            serialize(val, serializers),
            deserializers
        );

        if (result.foo !== deserializedValue) {
            throw new Error(
                `Expected ${ result.foo } to equal ${ deserializedValue }`
            );
        }
    });
    it('should serialize a promise with a custom serializer and deserializer', () => {
        const val = {
            foo: Promise.resolve(1) // eslint-disable-line no-restricted-globals,compat/compat
        };
        const serializedValue = `serialized::${ Math.random().toString() }`;
        const deserializedValue = `deserialized::${ Math.random().toString() }`;
        const serializers = {
            [TYPE.PROMISE]: (
                value: any,
                key: string
            ): CustomSerializedType<typeof CUSTOM_SERIALIZATION, string> => {
                if (value !== val.foo) {
                    throw new Error(
                        `Expected ${ JSON.stringify(
                            value
                        ) } to equal ${ JSON.stringify(val.foo) }`
                    );
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }

                return serializeType(CUSTOM_SERIALIZATION, serializedValue);
            }
        };
        const deserializers = {
            [CUSTOM_SERIALIZATION]: (value: any, key: string) => {
                if (value !== serializedValue) {
                    throw new Error(
                        `Expected ${ JSON.stringify(
                            value
                        ) } to equal ${ JSON.stringify(serializedValue) }`
                    );
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }

                return deserializedValue;
            }
        };
        const result = deserialize<any>(
            serialize(val, serializers),
            deserializers
        );

        if (result.foo !== deserializedValue) {
            throw new Error(
                `Expected ${ result.foo } to equal ${ deserializedValue }`
            );
        }
    });
    it('should serialize a function with a custom serializer and deserializer', () => {
        const val = {
            foo: function foo(bar: string): string {
                return bar;
            }
        };
        const serializedValue = `serialized::${ Math.random().toString() }`;
        const deserializedValue = `deserialized::${ Math.random().toString() }`;
        const serializers = {
            [TYPE.FUNCTION]: (
                value: Function, // eslint-disable-line  @typescript-eslint/ban-types
                key: string
            ): CustomSerializedType<typeof CUSTOM_SERIALIZATION, string> => {
                if (value !== val.foo) {
                    throw new Error(
                        `Expected ${ JSON.stringify(
                            value
                        ) } to equal ${ JSON.stringify(val.foo) }`
                    );
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }

                return serializeType(CUSTOM_SERIALIZATION, serializedValue);
            }
        };
        const deserializers = {
            [CUSTOM_SERIALIZATION]: (value: any, key: string) => {
                if (value !== serializedValue) {
                    throw new Error(
                        `Expected ${ JSON.stringify(
                            value
                        ) } to equal ${ JSON.stringify(serializedValue) }`
                    );
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }

                return deserializedValue;
            }
        };
        const result = deserialize<any>(
            serialize(val, serializers),
            deserializers
        );

        if (result.foo !== deserializedValue) {
            throw new Error(
                `Expected ${ result.foo } to equal ${ deserializedValue }`
            );
        }
    });
    it('should serialize an array with a function with a custom serializer and deserializer', () => {
        const val = {
            blerp: [
                function foo(bar: string): string {
                    return bar;
                }
            ]
        };
        const serializedValue = `serialized::${ Math.random().toString() }`;
        const deserializedValue = `deserialized::${ Math.random().toString() }`;
        const serializers = {
            [TYPE.FUNCTION]: (
                value: Function, // eslint-disable-line  @typescript-eslint/ban-types
                key: string
            ): CustomSerializedType<typeof CUSTOM_SERIALIZATION, string> => {
                if (value !== val.blerp[0]) {
                    throw new Error(
                        `Expected ${ JSON.stringify(
                            value
                        ) } to equal ${ JSON.stringify(val.blerp[0]) }`
                    );
                }

                if (key !== '0') {
                    throw new Error(`Expected key to be 0, got ${ key }`);
                }

                return serializeType(CUSTOM_SERIALIZATION, serializedValue);
            }
        };
        const deserializers = {
            [CUSTOM_SERIALIZATION]: (value: any, key: string) => {
                if (value !== serializedValue) {
                    throw new Error(
                        `Expected ${ JSON.stringify(
                            value
                        ) } to equal ${ JSON.stringify(serializedValue) }`
                    );
                }

                if (key !== '0') {
                    throw new Error(`Expected key to be 0, got ${ key }`);
                }

                return deserializedValue;
            }
        };
        const result = deserialize<any>(
            serialize(val, serializers),
            deserializers
        );

        if (result.blerp[0] !== deserializedValue) {
            throw new Error(
                `Expected ${ result.blerp[0] } to equal ${ deserializedValue }`
            );
        }
    });
});
