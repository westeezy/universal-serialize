import { serialize, deserialize } from '../../src';

describe('basic type cases', () => {
    it('should serialize a date', () => {
        const val = new Date();
        const result = deserialize<Date>(serialize(val));

        if (result.toJSON() !== val.toJSON()) {
            throw new Error(
                `Expected ${ result.toJSON() } to equal ${ val.toJSON() }`
            );
        }
    });
    it('should serialize a boolean', () => {
        const val = true;
        const result = deserialize(serialize(val));

        if (result !== val) {
            throw new Error(
                `Expected ${ JSON.stringify(result) } to equal ${ JSON.stringify(
                    val
                ) }`
            );
        }
    });
    it('should serialize a string', () => {
        const val = 'hello world\nsup';
        const result = deserialize(serialize(val));

        if (result !== val) {
            throw new Error(
                `Expected ${ JSON.stringify(result) } to equal ${ JSON.stringify(
                    val
                ) }`
            );
        }
    });
    it('should serialize a number', () => {
        const val = 12345;
        const result = deserialize(serialize(val));

        if (result !== val) {
            throw new Error(
                `Expected ${ JSON.stringify(result) } to equal ${ JSON.stringify(
                    val
                ) }`
            );
        }
    });
    it('should serialize a float', () => {
        const val = 123.45;
        const result = deserialize(serialize(val));

        if (result !== val) {
            throw new Error(
                `Expected ${ JSON.stringify(result) } to equal ${ JSON.stringify(
                    val
                ) }`
            );
        }
    });
    it('should serialize an array', () => {
        const val = [
            1,
            2,
            3,
            'hello',
            {
                '5': 6
            }
        ];
        const result = deserialize(serialize(val));

        if (JSON.stringify(result) !== JSON.stringify(val)) {
            throw new Error(
                `Expected ${ JSON.stringify(result) } to equal ${ JSON.stringify(
                    val
                ) }`
            );
        }
    });
    it('should serialize an object', () => {
        const val = {
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
        };
        const result = deserialize(serialize(val));

        if (JSON.stringify(result) !== JSON.stringify(val)) {
            throw new Error(
                `Expected ${ JSON.stringify(result) } to equal ${ JSON.stringify(
                    val
                ) }`
            );
        }
    });
    it('should serialize a regex', () => {
        const val = /hello world[123]/;
        const result = deserialize<RegExp>(serialize(val));

        if (result.source !== val.source) {
            throw new Error(`Expected ${ result.source } to equal ${ val.source }`);
        }
    });
    it('should serialize null', () => {
        // @ts-ignore
        const val = null;
        const result = deserialize(serialize(val));

        if (result !== val) {
            throw new Error(
                `Expected ${ JSON.stringify(result) } to equal ${ JSON.stringify(
                    val
                ) }`
            );
        }
    });
    it('should serialize undefined', () => {
        // @ts-ignore
        const val = undefined;
        const result = deserialize(serialize(val));

        if (result !== val) {
            throw new Error(
                `Expected ${ JSON.stringify(result) } to equal ${
                    JSON.stringify(val) || 'undefined'
                }`
            );
        }
    });
    it('should serialize undefined in an object', () => {
        const obj = {
            // @ts-ignore
            foo: undefined
        };
        const result = deserialize<Record<string, any>>(serialize(obj));

        if (result.foo !== obj.foo) {
            throw new Error(
                `Expected ${ JSON.stringify(result.foo) } to equal ${
                    JSON.stringify(obj.foo) || 'undefined'
                }`
            );
        }
    });
    it('should serialize undefined in an array', () => {
        // @ts-ignore
        const arr = [ undefined ];
        const result = deserialize(serialize(arr));

        // @ts-ignore
        if (arr[0] !== result[0]) {
            // @ts-ignore
            throw new Error(
                `Expected ${
                    JSON.stringify(result[0]) || 'undefined'
                } to equal ${ JSON.stringify(arr[0]) || 'undefined' }`
            );
        }
    });
    it('should serialize an error', () => {
        const val = new Error('meep');
        // @ts-ignore
        val.code = 'ERROR_55';
        // @ts-ignore
        val.data = {
            zerp: 'blerp'
        };
        const result = deserialize(serialize(val));

        if (!(result instanceof Error)) {
            throw new TypeError(`Expected result to be an instance of error`);
        }

        if (result.message !== val.message) {
            throw new Error(
                `Expected message ${ result.message } to equal ${ val.message }`
            );
        }

        // @ts-ignore
        if (result.code !== val.code) {
            // @ts-ignore
            throw new Error(
                `Expected message ${ result.code } to equal ${ val.code }`
            );
        }

        // @ts-ignore
        if (!result.data || result.data.zerp !== 'blerp') {
            throw new Error(`Expected err.data to be serialized`);
        }

        if (result.stack.indexOf(val.stack)) {
            throw new Error(
                `Expected stack ${ result.stack } to contain ${ val.stack }`
            );
        }
    });
    it('should silently remove promises', () => {
        const val = Promise.resolve(1); // eslint-disable-line no-restricted-globals, compat/compat
        const result = deserialize(serialize(val));

        if (result !== undefined) {
            throw new Error(`Expected ${ result } to equal undefined`);
        }
    });
    it('should silently remove functions', () => {
        const val = function foo(bar: string): string {
            return bar;
        };

        const result = deserialize(serialize(val));

        if (result !== undefined) {
            throw new Error(`Expected ${ result } to equal undefined`);
        }
    });
});
