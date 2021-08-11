var _DESERIALIZER;

import { TYPE } from './constants';
import { determineType, isSerializedType } from './common';
import { deserializeFunction, deserializeError, deserializePromise, deserializeRegex, deserializeDate, deserializeArray, deserializeObject, deserializeString, deserializeNumber, deserializeBoolean, deserializeNull, deserializeUndefined } from './serializers';
var DESERIALIZER = (_DESERIALIZER = {}, _DESERIALIZER[TYPE.FUNCTION] = deserializeFunction, _DESERIALIZER[TYPE.ERROR] = deserializeError, _DESERIALIZER[TYPE.PROMISE] = deserializePromise, _DESERIALIZER[TYPE.REGEX] = deserializeRegex, _DESERIALIZER[TYPE.DATE] = deserializeDate, _DESERIALIZER[TYPE.ARRAY] = deserializeArray, _DESERIALIZER[TYPE.OBJECT] = deserializeObject, _DESERIALIZER[TYPE.STRING] = deserializeString, _DESERIALIZER[TYPE.NUMBER] = deserializeNumber, _DESERIALIZER[TYPE.BOOLEAN] = deserializeBoolean, _DESERIALIZER[TYPE.NULL] = deserializeNull, _DESERIALIZER[TYPE.UNDEFINED] = deserializeUndefined, _DESERIALIZER);
var defaultDeserializers = {};
export function deserialize(str, deserializers) {
  if (deserializers === void 0) {
    deserializers = defaultDeserializers;
  }

  if (str === TYPE.UNDEFINED) {
    // @ts-ignore
    return;
  }

  function replacer(key, val) {
    // @ts-ignore
    if (isSerializedType(this)) {
      return val;
    }

    var type;
    var value;

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

    var deserializer = deserializers[type] || DESERIALIZER[type];

    if (!deserializer) {
      return value;
    }

    return deserializer(value, key);
  }

  return JSON.parse(str, replacer);
}