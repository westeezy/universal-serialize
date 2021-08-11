import { serialize, deserialize } from '../../src';

describe('basic type cases', () => {
    it('should serialize a date embedded in an object', () => {
        const val = {
            foo: new Date()
        };
        const result = deserialize<Record<string, Date>>(serialize(val));

        if (result.foo.toJSON() !== val.foo.toJSON()) {
            throw new Error(
                `Expected ${ result.foo.toJSON() } to equal ${ val.foo.toJSON() }`
            );
        }
    });
    it('should serialize a boolean embedded in an object', () => {
        const val = {
            foo: true
        };
        const result = deserialize<Record<string, boolean>>(serialize(val));

        if (result.foo !== val.foo) {
            throw new Error(
                `Expected ${ JSON.stringify(
                    result.foo
                ) } to equal ${ JSON.stringify(val.foo) }`
            );
        }
    });
    it('should serialize a string embedded in an object', () => {
        const val = {
            foo: 'hello world\nsup'
        };
        const result = deserialize<Record<string, string>>(serialize(val));

        if (result.foo !== val.foo) {
            throw new Error(
                `Expected ${ JSON.stringify(
                    result.foo
                ) } to equal ${ JSON.stringify(val.foo) }`
            );
        }
    });
    it('should serialize a number embedded in an object', () => {
        const val = {
            foo: 12345
        };
        const result = deserialize<Record<string, number>>(serialize(val));

        if (result.foo !== val.foo) {
            throw new Error(
                `Expected ${ JSON.stringify(
                    result.foo
                ) } to equal ${ JSON.stringify(val.foo) }`
            );
        }
    });
    it('should serialize a float embedded in an object', () => {
        const val = {
            foo: 123.45
        };
        const result = deserialize<Record<string, number>>(serialize(val));

        if (result.foo !== val.foo) {
            throw new Error(
                `Expected ${ JSON.stringify(
                    result.foo
                ) } to equal ${ JSON.stringify(val.foo) }`
            );
        }
    });
    it('should serialize an array  embedded in an object', () => {
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
        const result = deserialize<Record<string, any>>(serialize(val));

        if (JSON.stringify(result.foo) !== JSON.stringify(val.foo)) {
            throw new Error(
                `Expected ${ JSON.stringify(
                    result.foo
                ) } to equal ${ JSON.stringify(val.foo) }`
            );
        }
    });
    it('should serialize an object  embedded in an object', () => {
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
        const result = deserialize<Record<string, any>>(serialize(val));

        if (JSON.stringify(result.foo) !== JSON.stringify(val.foo)) {
            throw new Error(
                `Expected ${ JSON.stringify(
                    result.foo
                ) } to equal ${ JSON.stringify(val.foo) }`
            );
        }
    });
    it('should serialize a regex embedded in an object', () => {
        const val = {
            foo: /hello world[123]/
        };
        const result = deserialize<Record<string, RegExp>>(serialize(val));

        if (result.foo.source !== val.foo.source) {
            throw new Error(
                `Expected ${ JSON.stringify(
                    result.foo.source
                ) } to equal ${ JSON.stringify(val.foo.source) }`
            );
        }
    });
    it('should serialize null embedded in an object', () => {
        const val = {
            // @ts-ignore
            foo: null
        };
        const result = deserialize<Record<string, null>>(serialize(val));

        if (result.foo !== val.foo) {
            throw new Error(
                `Expected ${ JSON.stringify(
                    result.foo
                ) } to equal ${ JSON.stringify(val.foo) }`
            );
        }
    });
    it('should serialize undefined embedded in an object', () => {
        const val = {
            // @ts-ignore
            foo: undefined
        };
        const result = deserialize<Record<string, undefined>>(serialize(val));

        if (result.foo !== val.foo) {
            throw new Error(
                `Expected ${ JSON.stringify(result.foo) } to equal ${
                    JSON.stringify(val.foo) || 'undefined'
                }`
            );
        }
    });
    it('should serialize an error embedded in an object', () => {
        const val = {
            foo: new Error('meep')
        };
        // @ts-ignore
        val.foo.code = 'ERROR_55';
        const result = deserialize(serialize(val));

        // @ts-ignore
        if (!(result.foo instanceof Error)) {
            throw new TypeError(
                `Expected result.foo to be an instance of error`
            );
        }

        // @ts-ignore
        if (result.foo.message !== val.foo.message) {
            throw new Error(
                // @ts-ignore
                `Expected message ${ result.foo.message } to equal ${ val.foo.message }`
            );
        }

        // @ts-ignore
        if (result.foo.code !== val.foo.code) {
            throw new Error(
                // @ts-ignore
                `Expected message ${ result.foo.code } to equal ${ val.foo.code }`
            );
        }

        // @ts-ignore
        if (result.foo.stack.indexOf(val.foo.stack) === -1) {
            throw new Error(
                // @ts-ignore
                `Expected stack ${ result.foo.stack } to contain ${ val.foo.stack }`
            );
        }
    });
    it('should silently remove promises embedded in an object', () => {
        const val = {
            foo: Promise.resolve(1) // eslint-disable-line no-restricted-globals,compat/compat
        };
        const result = deserialize<Record<string, Promise<any>>>(  // eslint-disable-line no-restricted-globals
            serialize(val)
        );
        if (result.foo !== undefined) {
            throw new Error(`Expected ${ result.foo } to equal undefined`);
        }
    });
    it('should silently remove functions  embedded in an object', () => {
        const val = {
            foo: function foo(bar: string): string {
                return bar;
            }
        };
        const result = deserialize<Record<string, Function>>(serialize(val)); // eslint-disable-line  @typescript-eslint/ban-types

        if (result.foo !== undefined) {
            throw new Error(`Expected ${ result.foo } to equal undefined`);
        }
    });
});
