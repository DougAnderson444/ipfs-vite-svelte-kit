var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import { __vitePreload } from "../chunks/preload-helper-05a83733.js";
import { SvelteComponent, init, safe_not_equal, space, element, query_selector_all, detach, claim_space, claim_element, children, attr, insert_hydration, noop as noop$1, onMount, text, claim_text, set_data, append_hydration, empty } from "../chunks/index-4d7732b1.js";
function base(ALPHABET, name2) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode2(source) {
    if (source instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length3 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length3) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length3 = i2;
      pbegin++;
    }
    var it2 = size - length3;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length3 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length3) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length3 = i2;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length3;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode2(string2) {
    var buffer = decodeUnsafe(string2);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${name2} character`);
  }
  return {
    encode: encode2,
    decodeUnsafe,
    decode: decode2
  };
}
var src = base;
var _brrp__multiformats_scope_baseX = src;
const coerce = (o) => {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
};
const fromString$1 = (str) => new TextEncoder().encode(str);
const toString = (b) => new TextDecoder().decode(b);
class Encoder {
  constructor(name2, prefix, baseEncode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes) {
    if (bytes instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
}
class Decoder {
  constructor(name2, prefix, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseDecode = baseDecode;
  }
  decode(text2) {
    if (typeof text2 === "string") {
      switch (text2[0]) {
        case this.prefix: {
          return this.baseDecode(text2.slice(1));
        }
        default: {
          throw Error(`Unable to decode multibase string ${JSON.stringify(text2)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
        }
      }
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder) {
    return or(this, decoder);
  }
}
class ComposedDecoder {
  constructor(decoders) {
    this.decoders = decoders;
  }
  or(decoder) {
    return or(this, decoder);
  }
  decode(input) {
    const prefix = input[0];
    const decoder = this.decoders[prefix];
    if (decoder) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
}
const or = (left, right) => new ComposedDecoder(__spreadValues(__spreadValues({}, left.decoders || { [left.prefix]: left }), right.decoders || { [right.prefix]: right }));
class Codec {
  constructor(name2, prefix, baseEncode, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder(name2, prefix, baseEncode);
    this.decoder = new Decoder(name2, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
}
const from$1 = ({ name: name2, prefix, encode: encode2, decode: decode2 }) => new Codec(name2, prefix, encode2, decode2);
const baseX = ({ prefix, name: name2, alphabet }) => {
  const { encode: encode2, decode: decode2 } = _brrp__multiformats_scope_baseX(alphabet, name2);
  return from$1({
    prefix,
    name: name2,
    encode: encode2,
    decode: (text2) => coerce(decode2(text2))
  });
};
const decode$1 = (string2, alphabet, bitsPerChar, name2) => {
  const codes = {};
  for (let i = 0; i < alphabet.length; ++i) {
    codes[alphabet[i]] = i;
  }
  let end2 = string2.length;
  while (string2[end2 - 1] === "=") {
    --end2;
  }
  const out = new Uint8Array(end2 * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end2; ++i) {
    const value = codes[string2[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name2} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
const encode$2 = (data, alphabet, bitsPerChar) => {
  const pad = alphabet[alphabet.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet[mask & buffer >> bits];
    }
  }
  if (bits) {
    out += alphabet[mask & buffer << bitsPerChar - bits];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
const rfc4648 = ({ name: name2, prefix, bitsPerChar, alphabet }) => {
  return from$1({
    prefix,
    name: name2,
    encode(input) {
      return encode$2(input, alphabet, bitsPerChar);
    },
    decode(input) {
      return decode$1(input, alphabet, bitsPerChar, name2);
    }
  });
};
const identity$2 = from$1({
  prefix: "\0",
  name: "identity",
  encode: (buf) => toString(buf),
  decode: (str) => fromString$1(str)
});
var identityBase = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  identity: identity$2
}, Symbol.toStringTag, { value: "Module" }));
const base2 = rfc4648({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});
var base2$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base2
}, Symbol.toStringTag, { value: "Module" }));
const base8 = rfc4648({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});
var base8$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base8
}, Symbol.toStringTag, { value: "Module" }));
const base10 = baseX({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});
var base10$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base10
}, Symbol.toStringTag, { value: "Module" }));
const base16 = rfc4648({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
const base16upper = rfc4648({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
});
var base16$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base16,
  base16upper
}, Symbol.toStringTag, { value: "Module" }));
const base32 = rfc4648({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
const base32upper = rfc4648({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
const base32pad = rfc4648({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
const base32padupper = rfc4648({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
const base32hex = rfc4648({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
const base32hexupper = rfc4648({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
const base32hexpad = rfc4648({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
const base32hexpadupper = rfc4648({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
const base32z = rfc4648({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});
var base32$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base32,
  base32upper,
  base32pad,
  base32padupper,
  base32hex,
  base32hexupper,
  base32hexpad,
  base32hexpadupper,
  base32z
}, Symbol.toStringTag, { value: "Module" }));
const base36 = baseX({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
const base36upper = baseX({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});
var base36$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base36,
  base36upper
}, Symbol.toStringTag, { value: "Module" }));
const base58btc = baseX({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
const base58flickr = baseX({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});
var base58 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base58btc,
  base58flickr
}, Symbol.toStringTag, { value: "Module" }));
const base64$2 = rfc4648({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
const base64pad = rfc4648({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
const base64url = rfc4648({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
const base64urlpad = rfc4648({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});
var base64$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base64: base64$2,
  base64pad,
  base64url,
  base64urlpad
}, Symbol.toStringTag, { value: "Module" }));
var encode_1 = encode$1;
var MSB = 128, REST = 127, MSBALL = ~REST, INT = Math.pow(2, 31);
function encode$1(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT) {
    out[offset++] = num & 255 | MSB;
    num /= 128;
  }
  while (num & MSBALL) {
    out[offset++] = num & 255 | MSB;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode$1.bytes = offset - oldOffset + 1;
  return out;
}
var decode = read;
var MSB$1 = 128, REST$1 = 127;
function read(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
  do {
    if (counter >= l) {
      read.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf[counter++];
    res += shift < 28 ? (b & REST$1) << shift : (b & REST$1) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB$1);
  read.bytes = counter - offset;
  return res;
}
var N1 = Math.pow(2, 7);
var N2 = Math.pow(2, 14);
var N3 = Math.pow(2, 21);
var N4 = Math.pow(2, 28);
var N5 = Math.pow(2, 35);
var N6 = Math.pow(2, 42);
var N7 = Math.pow(2, 49);
var N8 = Math.pow(2, 56);
var N9 = Math.pow(2, 63);
var length = function(value) {
  return value < N1 ? 1 : value < N2 ? 2 : value < N3 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
};
var varint = {
  encode: encode_1,
  decode,
  encodingLength: length
};
var _brrp_varint = varint;
const encodeTo = (int, target, offset = 0) => {
  _brrp_varint.encode(int, target, offset);
  return target;
};
const encodingLength = (int) => {
  return _brrp_varint.encodingLength(int);
};
const create$2 = (code2, digest2) => {
  const size = digest2.byteLength;
  const sizeOffset = encodingLength(code2);
  const digestOffset = sizeOffset + encodingLength(size);
  const bytes = new Uint8Array(digestOffset + size);
  encodeTo(code2, bytes, 0);
  encodeTo(size, bytes, sizeOffset);
  bytes.set(digest2, digestOffset);
  return new Digest(code2, size, digest2, bytes);
};
class Digest {
  constructor(code2, size, digest2, bytes) {
    this.code = code2;
    this.size = size;
    this.digest = digest2;
    this.bytes = bytes;
  }
}
const from = ({ name: name2, code: code2, encode: encode2 }) => new Hasher(name2, code2, encode2);
class Hasher {
  constructor(name2, code2, encode2) {
    this.name = name2;
    this.code = code2;
    this.encode = encode2;
  }
  digest(input) {
    if (input instanceof Uint8Array) {
      const result = this.encode(input);
      return result instanceof Uint8Array ? create$2(this.code, result) : result.then((digest2) => create$2(this.code, digest2));
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
}
const sha = (name2) => async (data) => new Uint8Array(await crypto.subtle.digest(name2, data));
const sha256 = from({
  name: "sha2-256",
  code: 18,
  encode: sha("SHA-256")
});
const sha512 = from({
  name: "sha2-512",
  code: 19,
  encode: sha("SHA-512")
});
var sha2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  sha256,
  sha512
}, Symbol.toStringTag, { value: "Module" }));
const code = 0;
const name = "identity";
const encode = coerce;
const digest = (input) => create$2(code, encode(input));
const identity = {
  code,
  name,
  encode,
  digest
};
var identity$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  identity
}, Symbol.toStringTag, { value: "Module" }));
new TextEncoder();
new TextDecoder();
const bases = __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, identityBase), base2$1), base8$1), base10$1), base16$1), base32$1), base36$1), base58), base64$3);
__spreadValues(__spreadValues({}, sha2), identity$1);
function createCodec(name2, prefix, encode2, decode2) {
  return {
    name: name2,
    prefix,
    encoder: {
      name: name2,
      prefix,
      encode: encode2
    },
    decoder: { decode: decode2 }
  };
}
const string = createCodec("utf8", "u", (buf) => {
  const decoder = new TextDecoder("utf8");
  return "u" + decoder.decode(buf);
}, (str) => {
  const encoder = new TextEncoder();
  return encoder.encode(str.substring(1));
});
const ascii = createCodec("ascii", "a", (buf) => {
  let string2 = "a";
  for (let i = 0; i < buf.length; i++) {
    string2 += String.fromCharCode(buf[i]);
  }
  return string2;
}, (str) => {
  str = str.substring(1);
  const buf = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
});
const BASES = __spreadValues({
  utf8: string,
  "utf-8": string,
  hex: bases.base16,
  latin1: ascii,
  ascii,
  binary: ascii
}, bases);
function fromString(string2, encoding = "utf8") {
  const base3 = BASES[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  return base3.decoder.decode(`${base3.prefix}${string2}`);
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function assign(obj, props) {
  for (const key in props) {
    Object.defineProperty(obj, key, {
      value: props[key],
      enumerable: true,
      configurable: true
    });
  }
  return obj;
}
function createError(err, code2, props) {
  if (!err || typeof err === "string") {
    throw new TypeError("Please pass an Error to err-code");
  }
  if (!props) {
    props = {};
  }
  if (typeof code2 === "object") {
    props = code2;
    code2 = "";
  }
  if (code2) {
    props.code = code2;
  }
  try {
    return assign(err, props);
  } catch (_) {
    props.message = err.message;
    props.stack = err.stack;
    const ErrClass = function() {
    };
    ErrClass.prototype = Object.create(Object.getPrototypeOf(err));
    const output = assign(new ErrClass(), props);
    return output;
  }
}
var errCode = createError;
var indexMinimal = {};
var minimal$1 = {};
var aspromise = asPromise;
function asPromise(fn, ctx) {
  var params = new Array(arguments.length - 1), offset = 0, index = 2, pending = true;
  while (index < arguments.length)
    params[offset++] = arguments[index++];
  return new Promise(function executor(resolve, reject) {
    params[offset] = function callback(err) {
      if (pending) {
        pending = false;
        if (err)
          reject(err);
        else {
          var params2 = new Array(arguments.length - 1), offset2 = 0;
          while (offset2 < params2.length)
            params2[offset2++] = arguments[offset2];
          resolve.apply(null, params2);
        }
      }
    };
    try {
      fn.apply(ctx || null, params);
    } catch (err) {
      if (pending) {
        pending = false;
        reject(err);
      }
    }
  });
}
var base64$1 = {};
(function(exports) {
  var base642 = exports;
  base642.length = function length3(string2) {
    var p = string2.length;
    if (!p)
      return 0;
    var n = 0;
    while (--p % 4 > 1 && string2.charAt(p) === "=")
      ++n;
    return Math.ceil(string2.length * 3) / 4 - n;
  };
  var b64 = new Array(64);
  var s64 = new Array(123);
  for (var i = 0; i < 64; )
    s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
  base642.encode = function encode2(buffer, start, end2) {
    var parts = null, chunk = [];
    var i2 = 0, j = 0, t;
    while (start < end2) {
      var b = buffer[start++];
      switch (j) {
        case 0:
          chunk[i2++] = b64[b >> 2];
          t = (b & 3) << 4;
          j = 1;
          break;
        case 1:
          chunk[i2++] = b64[t | b >> 4];
          t = (b & 15) << 2;
          j = 2;
          break;
        case 2:
          chunk[i2++] = b64[t | b >> 6];
          chunk[i2++] = b64[b & 63];
          j = 0;
          break;
      }
      if (i2 > 8191) {
        (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
        i2 = 0;
      }
    }
    if (j) {
      chunk[i2++] = b64[t];
      chunk[i2++] = 61;
      if (j === 1)
        chunk[i2++] = 61;
    }
    if (parts) {
      if (i2)
        parts.push(String.fromCharCode.apply(String, chunk.slice(0, i2)));
      return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i2));
  };
  var invalidEncoding = "invalid encoding";
  base642.decode = function decode2(string2, buffer, offset) {
    var start = offset;
    var j = 0, t;
    for (var i2 = 0; i2 < string2.length; ) {
      var c = string2.charCodeAt(i2++);
      if (c === 61 && j > 1)
        break;
      if ((c = s64[c]) === void 0)
        throw Error(invalidEncoding);
      switch (j) {
        case 0:
          t = c;
          j = 1;
          break;
        case 1:
          buffer[offset++] = t << 2 | (c & 48) >> 4;
          t = c;
          j = 2;
          break;
        case 2:
          buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
          t = c;
          j = 3;
          break;
        case 3:
          buffer[offset++] = (t & 3) << 6 | c;
          j = 0;
          break;
      }
    }
    if (j === 1)
      throw Error(invalidEncoding);
    return offset - start;
  };
  base642.test = function test(string2) {
    return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string2);
  };
})(base64$1);
var eventemitter = EventEmitter;
function EventEmitter() {
  this._listeners = {};
}
EventEmitter.prototype.on = function on(evt, fn, ctx) {
  (this._listeners[evt] || (this._listeners[evt] = [])).push({
    fn,
    ctx: ctx || this
  });
  return this;
};
EventEmitter.prototype.off = function off(evt, fn) {
  if (evt === void 0)
    this._listeners = {};
  else {
    if (fn === void 0)
      this._listeners[evt] = [];
    else {
      var listeners = this._listeners[evt];
      for (var i = 0; i < listeners.length; )
        if (listeners[i].fn === fn)
          listeners.splice(i, 1);
        else
          ++i;
    }
  }
  return this;
};
EventEmitter.prototype.emit = function emit(evt) {
  var listeners = this._listeners[evt];
  if (listeners) {
    var args = [], i = 1;
    for (; i < arguments.length; )
      args.push(arguments[i++]);
    for (i = 0; i < listeners.length; )
      listeners[i].fn.apply(listeners[i++].ctx, args);
  }
  return this;
};
var float = factory(factory);
function factory(exports) {
  if (typeof Float32Array !== "undefined")
    (function() {
      var f32 = new Float32Array([-0]), f8b = new Uint8Array(f32.buffer), le = f8b[3] === 128;
      function writeFloat_f32_cpy(val, buf, pos) {
        f32[0] = val;
        buf[pos] = f8b[0];
        buf[pos + 1] = f8b[1];
        buf[pos + 2] = f8b[2];
        buf[pos + 3] = f8b[3];
      }
      function writeFloat_f32_rev(val, buf, pos) {
        f32[0] = val;
        buf[pos] = f8b[3];
        buf[pos + 1] = f8b[2];
        buf[pos + 2] = f8b[1];
        buf[pos + 3] = f8b[0];
      }
      exports.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
      exports.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
      function readFloat_f32_cpy(buf, pos) {
        f8b[0] = buf[pos];
        f8b[1] = buf[pos + 1];
        f8b[2] = buf[pos + 2];
        f8b[3] = buf[pos + 3];
        return f32[0];
      }
      function readFloat_f32_rev(buf, pos) {
        f8b[3] = buf[pos];
        f8b[2] = buf[pos + 1];
        f8b[1] = buf[pos + 2];
        f8b[0] = buf[pos + 3];
        return f32[0];
      }
      exports.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
      exports.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
    })();
  else
    (function() {
      function writeFloat_ieee754(writeUint, val, buf, pos) {
        var sign = val < 0 ? 1 : 0;
        if (sign)
          val = -val;
        if (val === 0)
          writeUint(1 / val > 0 ? 0 : 2147483648, buf, pos);
        else if (isNaN(val))
          writeUint(2143289344, buf, pos);
        else if (val > 34028234663852886e22)
          writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
        else if (val < 11754943508222875e-54)
          writeUint((sign << 31 | Math.round(val / 1401298464324817e-60)) >>> 0, buf, pos);
        else {
          var exponent = Math.floor(Math.log(val) / Math.LN2), mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
          writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
        }
      }
      exports.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
      exports.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
      function readFloat_ieee754(readUint, buf, pos) {
        var uint = readUint(buf, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
        return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 1401298464324817e-60 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
      }
      exports.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
      exports.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
    })();
  if (typeof Float64Array !== "undefined")
    (function() {
      var f64 = new Float64Array([-0]), f8b = new Uint8Array(f64.buffer), le = f8b[7] === 128;
      function writeDouble_f64_cpy(val, buf, pos) {
        f64[0] = val;
        buf[pos] = f8b[0];
        buf[pos + 1] = f8b[1];
        buf[pos + 2] = f8b[2];
        buf[pos + 3] = f8b[3];
        buf[pos + 4] = f8b[4];
        buf[pos + 5] = f8b[5];
        buf[pos + 6] = f8b[6];
        buf[pos + 7] = f8b[7];
      }
      function writeDouble_f64_rev(val, buf, pos) {
        f64[0] = val;
        buf[pos] = f8b[7];
        buf[pos + 1] = f8b[6];
        buf[pos + 2] = f8b[5];
        buf[pos + 3] = f8b[4];
        buf[pos + 4] = f8b[3];
        buf[pos + 5] = f8b[2];
        buf[pos + 6] = f8b[1];
        buf[pos + 7] = f8b[0];
      }
      exports.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
      exports.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
      function readDouble_f64_cpy(buf, pos) {
        f8b[0] = buf[pos];
        f8b[1] = buf[pos + 1];
        f8b[2] = buf[pos + 2];
        f8b[3] = buf[pos + 3];
        f8b[4] = buf[pos + 4];
        f8b[5] = buf[pos + 5];
        f8b[6] = buf[pos + 6];
        f8b[7] = buf[pos + 7];
        return f64[0];
      }
      function readDouble_f64_rev(buf, pos) {
        f8b[7] = buf[pos];
        f8b[6] = buf[pos + 1];
        f8b[5] = buf[pos + 2];
        f8b[4] = buf[pos + 3];
        f8b[3] = buf[pos + 4];
        f8b[2] = buf[pos + 5];
        f8b[1] = buf[pos + 6];
        f8b[0] = buf[pos + 7];
        return f64[0];
      }
      exports.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
      exports.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
    })();
  else
    (function() {
      function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
        var sign = val < 0 ? 1 : 0;
        if (sign)
          val = -val;
        if (val === 0) {
          writeUint(0, buf, pos + off0);
          writeUint(1 / val > 0 ? 0 : 2147483648, buf, pos + off1);
        } else if (isNaN(val)) {
          writeUint(0, buf, pos + off0);
          writeUint(2146959360, buf, pos + off1);
        } else if (val > 17976931348623157e292) {
          writeUint(0, buf, pos + off0);
          writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
        } else {
          var mantissa;
          if (val < 22250738585072014e-324) {
            mantissa = val / 5e-324;
            writeUint(mantissa >>> 0, buf, pos + off0);
            writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
          } else {
            var exponent = Math.floor(Math.log(val) / Math.LN2);
            if (exponent === 1024)
              exponent = 1023;
            mantissa = val * Math.pow(2, -exponent);
            writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
            writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
          }
        }
      }
      exports.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
      exports.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
      function readDouble_ieee754(readUint, off0, off1, buf, pos) {
        var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
        var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
        return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
      }
      exports.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
      exports.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
    })();
  return exports;
}
function writeUintLE(val, buf, pos) {
  buf[pos] = val & 255;
  buf[pos + 1] = val >>> 8 & 255;
  buf[pos + 2] = val >>> 16 & 255;
  buf[pos + 3] = val >>> 24;
}
function writeUintBE(val, buf, pos) {
  buf[pos] = val >>> 24;
  buf[pos + 1] = val >>> 16 & 255;
  buf[pos + 2] = val >>> 8 & 255;
  buf[pos + 3] = val & 255;
}
function readUintLE(buf, pos) {
  return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
}
function readUintBE(buf, pos) {
  return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
}
var inquire_1 = inquire;
function inquire(moduleName) {
  try {
    var mod = eval("quire".replace(/^/, "re"))(moduleName);
    if (mod && (mod.length || Object.keys(mod).length))
      return mod;
  } catch (e) {
  }
  return null;
}
var utf8$2 = {};
(function(exports) {
  var utf82 = exports;
  utf82.length = function utf8_length(string2) {
    var len = 0, c = 0;
    for (var i = 0; i < string2.length; ++i) {
      c = string2.charCodeAt(i);
      if (c < 128)
        len += 1;
      else if (c < 2048)
        len += 2;
      else if ((c & 64512) === 55296 && (string2.charCodeAt(i + 1) & 64512) === 56320) {
        ++i;
        len += 4;
      } else
        len += 3;
    }
    return len;
  };
  utf82.read = function utf8_read(buffer, start, end2) {
    var len = end2 - start;
    if (len < 1)
      return "";
    var parts = null, chunk = [], i = 0, t;
    while (start < end2) {
      t = buffer[start++];
      if (t < 128)
        chunk[i++] = t;
      else if (t > 191 && t < 224)
        chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
      else if (t > 239 && t < 365) {
        t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 65536;
        chunk[i++] = 55296 + (t >> 10);
        chunk[i++] = 56320 + (t & 1023);
      } else
        chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
      if (i > 8191) {
        (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
        i = 0;
      }
    }
    if (parts) {
      if (i)
        parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
      return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
  };
  utf82.write = function utf8_write(string2, buffer, offset) {
    var start = offset, c1, c2;
    for (var i = 0; i < string2.length; ++i) {
      c1 = string2.charCodeAt(i);
      if (c1 < 128) {
        buffer[offset++] = c1;
      } else if (c1 < 2048) {
        buffer[offset++] = c1 >> 6 | 192;
        buffer[offset++] = c1 & 63 | 128;
      } else if ((c1 & 64512) === 55296 && ((c2 = string2.charCodeAt(i + 1)) & 64512) === 56320) {
        c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
        ++i;
        buffer[offset++] = c1 >> 18 | 240;
        buffer[offset++] = c1 >> 12 & 63 | 128;
        buffer[offset++] = c1 >> 6 & 63 | 128;
        buffer[offset++] = c1 & 63 | 128;
      } else {
        buffer[offset++] = c1 >> 12 | 224;
        buffer[offset++] = c1 >> 6 & 63 | 128;
        buffer[offset++] = c1 & 63 | 128;
      }
    }
    return offset - start;
  };
})(utf8$2);
var pool_1 = pool;
function pool(alloc2, slice, size) {
  var SIZE = size || 8192;
  var MAX = SIZE >>> 1;
  var slab = null;
  var offset = SIZE;
  return function pool_alloc(size2) {
    if (size2 < 1 || size2 > MAX)
      return alloc2(size2);
    if (offset + size2 > SIZE) {
      slab = alloc2(SIZE);
      offset = 0;
    }
    var buf = slice.call(slab, offset, offset += size2);
    if (offset & 7)
      offset = (offset | 7) + 1;
    return buf;
  };
}
var longbits = LongBits$2;
var util$5 = minimal$1;
function LongBits$2(lo, hi) {
  this.lo = lo >>> 0;
  this.hi = hi >>> 0;
}
var zero = LongBits$2.zero = new LongBits$2(0, 0);
zero.toNumber = function() {
  return 0;
};
zero.zzEncode = zero.zzDecode = function() {
  return this;
};
zero.length = function() {
  return 1;
};
var zeroHash = LongBits$2.zeroHash = "\0\0\0\0\0\0\0\0";
LongBits$2.fromNumber = function fromNumber(value) {
  if (value === 0)
    return zero;
  var sign = value < 0;
  if (sign)
    value = -value;
  var lo = value >>> 0, hi = (value - lo) / 4294967296 >>> 0;
  if (sign) {
    hi = ~hi >>> 0;
    lo = ~lo >>> 0;
    if (++lo > 4294967295) {
      lo = 0;
      if (++hi > 4294967295)
        hi = 0;
    }
  }
  return new LongBits$2(lo, hi);
};
LongBits$2.from = function from2(value) {
  if (typeof value === "number")
    return LongBits$2.fromNumber(value);
  if (util$5.isString(value)) {
    if (util$5.Long)
      value = util$5.Long.fromString(value);
    else
      return LongBits$2.fromNumber(parseInt(value, 10));
  }
  return value.low || value.high ? new LongBits$2(value.low >>> 0, value.high >>> 0) : zero;
};
LongBits$2.prototype.toNumber = function toNumber(unsigned) {
  if (!unsigned && this.hi >>> 31) {
    var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
    if (!lo)
      hi = hi + 1 >>> 0;
    return -(lo + hi * 4294967296);
  }
  return this.lo + this.hi * 4294967296;
};
LongBits$2.prototype.toLong = function toLong(unsigned) {
  return util$5.Long ? new util$5.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
};
var charCodeAt = String.prototype.charCodeAt;
LongBits$2.fromHash = function fromHash(hash) {
  if (hash === zeroHash)
    return zero;
  return new LongBits$2((charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0, (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0);
};
LongBits$2.prototype.toHash = function toHash() {
  return String.fromCharCode(this.lo & 255, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, this.hi & 255, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
};
LongBits$2.prototype.zzEncode = function zzEncode() {
  var mask = this.hi >> 31;
  this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
  this.lo = (this.lo << 1 ^ mask) >>> 0;
  return this;
};
LongBits$2.prototype.zzDecode = function zzDecode() {
  var mask = -(this.lo & 1);
  this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
  this.hi = (this.hi >>> 1 ^ mask) >>> 0;
  return this;
};
LongBits$2.prototype.length = function length2() {
  var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
  return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
};
(function(exports) {
  var util2 = exports;
  util2.asPromise = aspromise;
  util2.base64 = base64$1;
  util2.EventEmitter = eventemitter;
  util2.float = float;
  util2.inquire = inquire_1;
  util2.utf8 = utf8$2;
  util2.pool = pool_1;
  util2.LongBits = longbits;
  util2.isNode = Boolean(typeof commonjsGlobal !== "undefined" && commonjsGlobal && commonjsGlobal.process && commonjsGlobal.process.versions && commonjsGlobal.process.versions.node);
  util2.global = util2.isNode && commonjsGlobal || typeof window !== "undefined" && window || typeof self !== "undefined" && self || commonjsGlobal;
  util2.emptyArray = Object.freeze ? Object.freeze([]) : [];
  util2.emptyObject = Object.freeze ? Object.freeze({}) : {};
  util2.isInteger = Number.isInteger || function isInteger(value) {
    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
  };
  util2.isString = function isString(value) {
    return typeof value === "string" || value instanceof String;
  };
  util2.isObject = function isObject(value) {
    return value && typeof value === "object";
  };
  util2.isset = util2.isSet = function isSet(obj, prop) {
    var value = obj[prop];
    if (value != null && obj.hasOwnProperty(prop))
      return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
    return false;
  };
  util2.Buffer = function() {
    try {
      var Buffer2 = util2.inquire("buffer").Buffer;
      return Buffer2.prototype.utf8Write ? Buffer2 : null;
    } catch (e) {
      return null;
    }
  }();
  util2._Buffer_from = null;
  util2._Buffer_allocUnsafe = null;
  util2.newBuffer = function newBuffer(sizeOrArray) {
    return typeof sizeOrArray === "number" ? util2.Buffer ? util2._Buffer_allocUnsafe(sizeOrArray) : new util2.Array(sizeOrArray) : util2.Buffer ? util2._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
  };
  util2.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
  util2.Long = util2.global.dcodeIO && util2.global.dcodeIO.Long || util2.global.Long || util2.inquire("long");
  util2.key2Re = /^true|false|0|1$/;
  util2.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
  util2.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
  util2.longToHash = function longToHash(value) {
    return value ? util2.LongBits.from(value).toHash() : util2.LongBits.zeroHash;
  };
  util2.longFromHash = function longFromHash(hash, unsigned) {
    var bits = util2.LongBits.fromHash(hash);
    if (util2.Long)
      return util2.Long.fromBits(bits.lo, bits.hi, unsigned);
    return bits.toNumber(Boolean(unsigned));
  };
  function merge(dst, src2, ifNotSet) {
    for (var keys = Object.keys(src2), i = 0; i < keys.length; ++i)
      if (dst[keys[i]] === void 0 || !ifNotSet)
        dst[keys[i]] = src2[keys[i]];
    return dst;
  }
  util2.merge = merge;
  util2.lcFirst = function lcFirst(str) {
    return str.charAt(0).toLowerCase() + str.substring(1);
  };
  function newError(name2) {
    function CustomError(message, properties) {
      if (!(this instanceof CustomError))
        return new CustomError(message, properties);
      Object.defineProperty(this, "message", { get: function() {
        return message;
      } });
      if (Error.captureStackTrace)
        Error.captureStackTrace(this, CustomError);
      else
        Object.defineProperty(this, "stack", { value: new Error().stack || "" });
      if (properties)
        merge(this, properties);
    }
    (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;
    Object.defineProperty(CustomError.prototype, "name", { get: function() {
      return name2;
    } });
    CustomError.prototype.toString = function toString2() {
      return this.name + ": " + this.message;
    };
    return CustomError;
  }
  util2.newError = newError;
  util2.ProtocolError = newError("ProtocolError");
  util2.oneOfGetter = function getOneOf(fieldNames) {
    var fieldMap = {};
    for (var i = 0; i < fieldNames.length; ++i)
      fieldMap[fieldNames[i]] = 1;
    return function() {
      for (var keys = Object.keys(this), i2 = keys.length - 1; i2 > -1; --i2)
        if (fieldMap[keys[i2]] === 1 && this[keys[i2]] !== void 0 && this[keys[i2]] !== null)
          return keys[i2];
    };
  };
  util2.oneOfSetter = function setOneOf(fieldNames) {
    return function(name2) {
      for (var i = 0; i < fieldNames.length; ++i)
        if (fieldNames[i] !== name2)
          delete this[fieldNames[i]];
    };
  };
  util2.toJSONOptions = {
    longs: String,
    enums: String,
    bytes: String,
    json: true
  };
  util2._configure = function() {
    var Buffer2 = util2.Buffer;
    if (!Buffer2) {
      util2._Buffer_from = util2._Buffer_allocUnsafe = null;
      return;
    }
    util2._Buffer_from = Buffer2.from !== Uint8Array.from && Buffer2.from || function Buffer_from(value, encoding) {
      return new Buffer2(value, encoding);
    };
    util2._Buffer_allocUnsafe = Buffer2.allocUnsafe || function Buffer_allocUnsafe(size) {
      return new Buffer2(size);
    };
  };
})(minimal$1);
var writer = Writer$1;
var util$4 = minimal$1;
var BufferWriter$1;
var LongBits$1 = util$4.LongBits, base64 = util$4.base64, utf8$1 = util$4.utf8;
function Op(fn, len, val) {
  this.fn = fn;
  this.len = len;
  this.next = void 0;
  this.val = val;
}
function noop() {
}
function State(writer2) {
  this.head = writer2.head;
  this.tail = writer2.tail;
  this.len = writer2.len;
  this.next = writer2.states;
}
function Writer$1() {
  this.len = 0;
  this.head = new Op(noop, 0, 0);
  this.tail = this.head;
  this.states = null;
}
var create$1 = function create2() {
  return util$4.Buffer ? function create_buffer_setup() {
    return (Writer$1.create = function create_buffer() {
      return new BufferWriter$1();
    })();
  } : function create_array3() {
    return new Writer$1();
  };
};
Writer$1.create = create$1();
Writer$1.alloc = function alloc(size) {
  return new util$4.Array(size);
};
if (util$4.Array !== Array)
  Writer$1.alloc = util$4.pool(Writer$1.alloc, util$4.Array.prototype.subarray);
Writer$1.prototype._push = function push(fn, len, val) {
  this.tail = this.tail.next = new Op(fn, len, val);
  this.len += len;
  return this;
};
function writeByte(val, buf, pos) {
  buf[pos] = val & 255;
}
function writeVarint32(val, buf, pos) {
  while (val > 127) {
    buf[pos++] = val & 127 | 128;
    val >>>= 7;
  }
  buf[pos] = val;
}
function VarintOp(len, val) {
  this.len = len;
  this.next = void 0;
  this.val = val;
}
VarintOp.prototype = Object.create(Op.prototype);
VarintOp.prototype.fn = writeVarint32;
Writer$1.prototype.uint32 = function write_uint32(value) {
  this.len += (this.tail = this.tail.next = new VarintOp((value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5, value)).len;
  return this;
};
Writer$1.prototype.int32 = function write_int32(value) {
  return value < 0 ? this._push(writeVarint64, 10, LongBits$1.fromNumber(value)) : this.uint32(value);
};
Writer$1.prototype.sint32 = function write_sint32(value) {
  return this.uint32((value << 1 ^ value >> 31) >>> 0);
};
function writeVarint64(val, buf, pos) {
  while (val.hi) {
    buf[pos++] = val.lo & 127 | 128;
    val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
    val.hi >>>= 7;
  }
  while (val.lo > 127) {
    buf[pos++] = val.lo & 127 | 128;
    val.lo = val.lo >>> 7;
  }
  buf[pos++] = val.lo;
}
Writer$1.prototype.uint64 = function write_uint64(value) {
  var bits = LongBits$1.from(value);
  return this._push(writeVarint64, bits.length(), bits);
};
Writer$1.prototype.int64 = Writer$1.prototype.uint64;
Writer$1.prototype.sint64 = function write_sint64(value) {
  var bits = LongBits$1.from(value).zzEncode();
  return this._push(writeVarint64, bits.length(), bits);
};
Writer$1.prototype.bool = function write_bool(value) {
  return this._push(writeByte, 1, value ? 1 : 0);
};
function writeFixed32(val, buf, pos) {
  buf[pos] = val & 255;
  buf[pos + 1] = val >>> 8 & 255;
  buf[pos + 2] = val >>> 16 & 255;
  buf[pos + 3] = val >>> 24;
}
Writer$1.prototype.fixed32 = function write_fixed32(value) {
  return this._push(writeFixed32, 4, value >>> 0);
};
Writer$1.prototype.sfixed32 = Writer$1.prototype.fixed32;
Writer$1.prototype.fixed64 = function write_fixed64(value) {
  var bits = LongBits$1.from(value);
  return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
};
Writer$1.prototype.sfixed64 = Writer$1.prototype.fixed64;
Writer$1.prototype.float = function write_float(value) {
  return this._push(util$4.float.writeFloatLE, 4, value);
};
Writer$1.prototype.double = function write_double(value) {
  return this._push(util$4.float.writeDoubleLE, 8, value);
};
var writeBytes = util$4.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
  buf.set(val, pos);
} : function writeBytes_for(val, buf, pos) {
  for (var i = 0; i < val.length; ++i)
    buf[pos + i] = val[i];
};
Writer$1.prototype.bytes = function write_bytes(value) {
  var len = value.length >>> 0;
  if (!len)
    return this._push(writeByte, 1, 0);
  if (util$4.isString(value)) {
    var buf = Writer$1.alloc(len = base64.length(value));
    base64.decode(value, buf, 0);
    value = buf;
  }
  return this.uint32(len)._push(writeBytes, len, value);
};
Writer$1.prototype.string = function write_string(value) {
  var len = utf8$1.length(value);
  return len ? this.uint32(len)._push(utf8$1.write, len, value) : this._push(writeByte, 1, 0);
};
Writer$1.prototype.fork = function fork() {
  this.states = new State(this);
  this.head = this.tail = new Op(noop, 0, 0);
  this.len = 0;
  return this;
};
Writer$1.prototype.reset = function reset() {
  if (this.states) {
    this.head = this.states.head;
    this.tail = this.states.tail;
    this.len = this.states.len;
    this.states = this.states.next;
  } else {
    this.head = this.tail = new Op(noop, 0, 0);
    this.len = 0;
  }
  return this;
};
Writer$1.prototype.ldelim = function ldelim() {
  var head = this.head, tail = this.tail, len = this.len;
  this.reset().uint32(len);
  if (len) {
    this.tail.next = head.next;
    this.tail = tail;
    this.len += len;
  }
  return this;
};
Writer$1.prototype.finish = function finish() {
  var head = this.head.next, buf = this.constructor.alloc(this.len), pos = 0;
  while (head) {
    head.fn(head.val, buf, pos);
    pos += head.len;
    head = head.next;
  }
  return buf;
};
Writer$1._configure = function(BufferWriter_) {
  BufferWriter$1 = BufferWriter_;
  Writer$1.create = create$1();
  BufferWriter$1._configure();
};
var writer_buffer = BufferWriter;
var Writer = writer;
(BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;
var util$3 = minimal$1;
function BufferWriter() {
  Writer.call(this);
}
BufferWriter._configure = function() {
  BufferWriter.alloc = util$3._Buffer_allocUnsafe;
  BufferWriter.writeBytesBuffer = util$3.Buffer && util$3.Buffer.prototype instanceof Uint8Array && util$3.Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
    buf.set(val, pos);
  } : function writeBytesBuffer_copy(val, buf, pos) {
    if (val.copy)
      val.copy(buf, pos, 0, val.length);
    else
      for (var i = 0; i < val.length; )
        buf[pos++] = val[i++];
  };
};
BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
  if (util$3.isString(value))
    value = util$3._Buffer_from(value, "base64");
  var len = value.length >>> 0;
  this.uint32(len);
  if (len)
    this._push(BufferWriter.writeBytesBuffer, len, value);
  return this;
};
function writeStringBuffer(val, buf, pos) {
  if (val.length < 40)
    util$3.utf8.write(val, buf, pos);
  else if (buf.utf8Write)
    buf.utf8Write(val, pos);
  else
    buf.write(val, pos);
}
BufferWriter.prototype.string = function write_string_buffer(value) {
  var len = util$3.Buffer.byteLength(value);
  this.uint32(len);
  if (len)
    this._push(writeStringBuffer, len, value);
  return this;
};
BufferWriter._configure();
var reader = Reader$1;
var util$2 = minimal$1;
var BufferReader$1;
var LongBits = util$2.LongBits, utf8 = util$2.utf8;
function indexOutOfRange(reader2, writeLength) {
  return RangeError("index out of range: " + reader2.pos + " + " + (writeLength || 1) + " > " + reader2.len);
}
function Reader$1(buffer) {
  this.buf = buffer;
  this.pos = 0;
  this.len = buffer.length;
}
var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
  if (buffer instanceof Uint8Array || Array.isArray(buffer))
    return new Reader$1(buffer);
  throw Error("illegal buffer");
} : function create_array2(buffer) {
  if (Array.isArray(buffer))
    return new Reader$1(buffer);
  throw Error("illegal buffer");
};
var create = function create3() {
  return util$2.Buffer ? function create_buffer_setup(buffer) {
    return (Reader$1.create = function create_buffer(buffer2) {
      return util$2.Buffer.isBuffer(buffer2) ? new BufferReader$1(buffer2) : create_array(buffer2);
    })(buffer);
  } : create_array;
};
Reader$1.create = create();
Reader$1.prototype._slice = util$2.Array.prototype.subarray || util$2.Array.prototype.slice;
Reader$1.prototype.uint32 = function read_uint32_setup() {
  var value = 4294967295;
  return function read_uint32() {
    value = (this.buf[this.pos] & 127) >>> 0;
    if (this.buf[this.pos++] < 128)
      return value;
    value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
    if (this.buf[this.pos++] < 128)
      return value;
    value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
    if (this.buf[this.pos++] < 128)
      return value;
    value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
    if (this.buf[this.pos++] < 128)
      return value;
    value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
    if (this.buf[this.pos++] < 128)
      return value;
    if ((this.pos += 5) > this.len) {
      this.pos = this.len;
      throw indexOutOfRange(this, 10);
    }
    return value;
  };
}();
Reader$1.prototype.int32 = function read_int32() {
  return this.uint32() | 0;
};
Reader$1.prototype.sint32 = function read_sint32() {
  var value = this.uint32();
  return value >>> 1 ^ -(value & 1) | 0;
};
function readLongVarint() {
  var bits = new LongBits(0, 0);
  var i = 0;
  if (this.len - this.pos > 4) {
    for (; i < 4; ++i) {
      bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
      if (this.buf[this.pos++] < 128)
        return bits;
    }
    bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
    bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
    if (this.buf[this.pos++] < 128)
      return bits;
    i = 0;
  } else {
    for (; i < 3; ++i) {
      if (this.pos >= this.len)
        throw indexOutOfRange(this);
      bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
      if (this.buf[this.pos++] < 128)
        return bits;
    }
    bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
    return bits;
  }
  if (this.len - this.pos > 4) {
    for (; i < 5; ++i) {
      bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
      if (this.buf[this.pos++] < 128)
        return bits;
    }
  } else {
    for (; i < 5; ++i) {
      if (this.pos >= this.len)
        throw indexOutOfRange(this);
      bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
      if (this.buf[this.pos++] < 128)
        return bits;
    }
  }
  throw Error("invalid varint encoding");
}
Reader$1.prototype.bool = function read_bool() {
  return this.uint32() !== 0;
};
function readFixed32_end(buf, end2) {
  return (buf[end2 - 4] | buf[end2 - 3] << 8 | buf[end2 - 2] << 16 | buf[end2 - 1] << 24) >>> 0;
}
Reader$1.prototype.fixed32 = function read_fixed32() {
  if (this.pos + 4 > this.len)
    throw indexOutOfRange(this, 4);
  return readFixed32_end(this.buf, this.pos += 4);
};
Reader$1.prototype.sfixed32 = function read_sfixed32() {
  if (this.pos + 4 > this.len)
    throw indexOutOfRange(this, 4);
  return readFixed32_end(this.buf, this.pos += 4) | 0;
};
function readFixed64() {
  if (this.pos + 8 > this.len)
    throw indexOutOfRange(this, 8);
  return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
}
Reader$1.prototype.float = function read_float() {
  if (this.pos + 4 > this.len)
    throw indexOutOfRange(this, 4);
  var value = util$2.float.readFloatLE(this.buf, this.pos);
  this.pos += 4;
  return value;
};
Reader$1.prototype.double = function read_double() {
  if (this.pos + 8 > this.len)
    throw indexOutOfRange(this, 4);
  var value = util$2.float.readDoubleLE(this.buf, this.pos);
  this.pos += 8;
  return value;
};
Reader$1.prototype.bytes = function read_bytes() {
  var length3 = this.uint32(), start = this.pos, end2 = this.pos + length3;
  if (end2 > this.len)
    throw indexOutOfRange(this, length3);
  this.pos += length3;
  if (Array.isArray(this.buf))
    return this.buf.slice(start, end2);
  return start === end2 ? new this.buf.constructor(0) : this._slice.call(this.buf, start, end2);
};
Reader$1.prototype.string = function read_string() {
  var bytes = this.bytes();
  return utf8.read(bytes, 0, bytes.length);
};
Reader$1.prototype.skip = function skip(length3) {
  if (typeof length3 === "number") {
    if (this.pos + length3 > this.len)
      throw indexOutOfRange(this, length3);
    this.pos += length3;
  } else {
    do {
      if (this.pos >= this.len)
        throw indexOutOfRange(this);
    } while (this.buf[this.pos++] & 128);
  }
  return this;
};
Reader$1.prototype.skipType = function(wireType) {
  switch (wireType) {
    case 0:
      this.skip();
      break;
    case 1:
      this.skip(8);
      break;
    case 2:
      this.skip(this.uint32());
      break;
    case 3:
      while ((wireType = this.uint32() & 7) !== 4) {
        this.skipType(wireType);
      }
      break;
    case 5:
      this.skip(4);
      break;
    default:
      throw Error("invalid wire type " + wireType + " at offset " + this.pos);
  }
  return this;
};
Reader$1._configure = function(BufferReader_) {
  BufferReader$1 = BufferReader_;
  Reader$1.create = create();
  BufferReader$1._configure();
  var fn = util$2.Long ? "toLong" : "toNumber";
  util$2.merge(Reader$1.prototype, {
    int64: function read_int64() {
      return readLongVarint.call(this)[fn](false);
    },
    uint64: function read_uint64() {
      return readLongVarint.call(this)[fn](true);
    },
    sint64: function read_sint64() {
      return readLongVarint.call(this).zzDecode()[fn](false);
    },
    fixed64: function read_fixed64() {
      return readFixed64.call(this)[fn](true);
    },
    sfixed64: function read_sfixed64() {
      return readFixed64.call(this)[fn](false);
    }
  });
};
var reader_buffer = BufferReader;
var Reader = reader;
(BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;
var util$1 = minimal$1;
function BufferReader(buffer) {
  Reader.call(this, buffer);
}
BufferReader._configure = function() {
  if (util$1.Buffer)
    BufferReader.prototype._slice = util$1.Buffer.prototype.slice;
};
BufferReader.prototype.string = function read_string_buffer() {
  var len = this.uint32();
  return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
};
BufferReader._configure();
var rpc = {};
var service = Service;
var util = minimal$1;
(Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;
function Service(rpcImpl, requestDelimited, responseDelimited) {
  if (typeof rpcImpl !== "function")
    throw TypeError("rpcImpl must be a function");
  util.EventEmitter.call(this);
  this.rpcImpl = rpcImpl;
  this.requestDelimited = Boolean(requestDelimited);
  this.responseDelimited = Boolean(responseDelimited);
}
Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
  if (!request)
    throw TypeError("request must be specified");
  var self2 = this;
  if (!callback)
    return util.asPromise(rpcCall, self2, method, requestCtor, responseCtor, request);
  if (!self2.rpcImpl) {
    setTimeout(function() {
      callback(Error("already ended"));
    }, 0);
    return void 0;
  }
  try {
    return self2.rpcImpl(method, requestCtor[self2.requestDelimited ? "encodeDelimited" : "encode"](request).finish(), function rpcCallback(err, response) {
      if (err) {
        self2.emit("error", err, method);
        return callback(err);
      }
      if (response === null) {
        self2.end(true);
        return void 0;
      }
      if (!(response instanceof responseCtor)) {
        try {
          response = responseCtor[self2.responseDelimited ? "decodeDelimited" : "decode"](response);
        } catch (err2) {
          self2.emit("error", err2, method);
          return callback(err2);
        }
      }
      self2.emit("data", response, method);
      return callback(null, response);
    });
  } catch (err) {
    self2.emit("error", err, method);
    setTimeout(function() {
      callback(err);
    }, 0);
    return void 0;
  }
};
Service.prototype.end = function end(endedByRPC) {
  if (this.rpcImpl) {
    if (!endedByRPC)
      this.rpcImpl(null, null, null);
    this.rpcImpl = null;
    this.emit("end").off();
  }
  return this;
};
(function(exports) {
  var rpc2 = exports;
  rpc2.Service = service;
})(rpc);
var roots = {};
(function(exports) {
  var protobuf = exports;
  protobuf.build = "minimal";
  protobuf.Writer = writer;
  protobuf.BufferWriter = writer_buffer;
  protobuf.Reader = reader;
  protobuf.BufferReader = reader_buffer;
  protobuf.util = minimal$1;
  protobuf.rpc = rpc;
  protobuf.roots = roots;
  protobuf.configure = configure;
  function configure() {
    protobuf.util._configure();
    protobuf.Writer._configure(protobuf.BufferWriter);
    protobuf.Reader._configure(protobuf.BufferReader);
  }
  configure();
})(indexMinimal);
var minimal = indexMinimal;
const $Reader = minimal.Reader, $Writer = minimal.Writer, $util = minimal.util;
const $root = minimal.roots["ipfs-unixfs"] || (minimal.roots["ipfs-unixfs"] = {});
const Data = $root.Data = (() => {
  function Data2(p) {
    this.blocksizes = [];
    if (p) {
      for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
        if (p[ks[i]] != null)
          this[ks[i]] = p[ks[i]];
    }
  }
  Data2.prototype.Type = 0;
  Data2.prototype.Data = $util.newBuffer([]);
  Data2.prototype.filesize = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
  Data2.prototype.blocksizes = $util.emptyArray;
  Data2.prototype.hashType = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
  Data2.prototype.fanout = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
  Data2.prototype.mode = 0;
  Data2.prototype.mtime = null;
  Data2.encode = function encode2(m, w) {
    if (!w)
      w = $Writer.create();
    w.uint32(8).int32(m.Type);
    if (m.Data != null && Object.hasOwnProperty.call(m, "Data"))
      w.uint32(18).bytes(m.Data);
    if (m.filesize != null && Object.hasOwnProperty.call(m, "filesize"))
      w.uint32(24).uint64(m.filesize);
    if (m.blocksizes != null && m.blocksizes.length) {
      for (var i = 0; i < m.blocksizes.length; ++i)
        w.uint32(32).uint64(m.blocksizes[i]);
    }
    if (m.hashType != null && Object.hasOwnProperty.call(m, "hashType"))
      w.uint32(40).uint64(m.hashType);
    if (m.fanout != null && Object.hasOwnProperty.call(m, "fanout"))
      w.uint32(48).uint64(m.fanout);
    if (m.mode != null && Object.hasOwnProperty.call(m, "mode"))
      w.uint32(56).uint32(m.mode);
    if (m.mtime != null && Object.hasOwnProperty.call(m, "mtime"))
      $root.UnixTime.encode(m.mtime, w.uint32(66).fork()).ldelim();
    return w;
  };
  Data2.decode = function decode2(r, l) {
    if (!(r instanceof $Reader))
      r = $Reader.create(r);
    var c = l === void 0 ? r.len : r.pos + l, m = new $root.Data();
    while (r.pos < c) {
      var t = r.uint32();
      switch (t >>> 3) {
        case 1:
          m.Type = r.int32();
          break;
        case 2:
          m.Data = r.bytes();
          break;
        case 3:
          m.filesize = r.uint64();
          break;
        case 4:
          if (!(m.blocksizes && m.blocksizes.length))
            m.blocksizes = [];
          if ((t & 7) === 2) {
            var c2 = r.uint32() + r.pos;
            while (r.pos < c2)
              m.blocksizes.push(r.uint64());
          } else
            m.blocksizes.push(r.uint64());
          break;
        case 5:
          m.hashType = r.uint64();
          break;
        case 6:
          m.fanout = r.uint64();
          break;
        case 7:
          m.mode = r.uint32();
          break;
        case 8:
          m.mtime = $root.UnixTime.decode(r, r.uint32());
          break;
        default:
          r.skipType(t & 7);
          break;
      }
    }
    if (!m.hasOwnProperty("Type"))
      throw $util.ProtocolError("missing required 'Type'", { instance: m });
    return m;
  };
  Data2.fromObject = function fromObject(d) {
    if (d instanceof $root.Data)
      return d;
    var m = new $root.Data();
    switch (d.Type) {
      case "Raw":
      case 0:
        m.Type = 0;
        break;
      case "Directory":
      case 1:
        m.Type = 1;
        break;
      case "File":
      case 2:
        m.Type = 2;
        break;
      case "Metadata":
      case 3:
        m.Type = 3;
        break;
      case "Symlink":
      case 4:
        m.Type = 4;
        break;
      case "HAMTShard":
      case 5:
        m.Type = 5;
        break;
    }
    if (d.Data != null) {
      if (typeof d.Data === "string")
        $util.base64.decode(d.Data, m.Data = $util.newBuffer($util.base64.length(d.Data)), 0);
      else if (d.Data.length)
        m.Data = d.Data;
    }
    if (d.filesize != null) {
      if ($util.Long)
        (m.filesize = $util.Long.fromValue(d.filesize)).unsigned = true;
      else if (typeof d.filesize === "string")
        m.filesize = parseInt(d.filesize, 10);
      else if (typeof d.filesize === "number")
        m.filesize = d.filesize;
      else if (typeof d.filesize === "object")
        m.filesize = new $util.LongBits(d.filesize.low >>> 0, d.filesize.high >>> 0).toNumber(true);
    }
    if (d.blocksizes) {
      if (!Array.isArray(d.blocksizes))
        throw TypeError(".Data.blocksizes: array expected");
      m.blocksizes = [];
      for (var i = 0; i < d.blocksizes.length; ++i) {
        if ($util.Long)
          (m.blocksizes[i] = $util.Long.fromValue(d.blocksizes[i])).unsigned = true;
        else if (typeof d.blocksizes[i] === "string")
          m.blocksizes[i] = parseInt(d.blocksizes[i], 10);
        else if (typeof d.blocksizes[i] === "number")
          m.blocksizes[i] = d.blocksizes[i];
        else if (typeof d.blocksizes[i] === "object")
          m.blocksizes[i] = new $util.LongBits(d.blocksizes[i].low >>> 0, d.blocksizes[i].high >>> 0).toNumber(true);
      }
    }
    if (d.hashType != null) {
      if ($util.Long)
        (m.hashType = $util.Long.fromValue(d.hashType)).unsigned = true;
      else if (typeof d.hashType === "string")
        m.hashType = parseInt(d.hashType, 10);
      else if (typeof d.hashType === "number")
        m.hashType = d.hashType;
      else if (typeof d.hashType === "object")
        m.hashType = new $util.LongBits(d.hashType.low >>> 0, d.hashType.high >>> 0).toNumber(true);
    }
    if (d.fanout != null) {
      if ($util.Long)
        (m.fanout = $util.Long.fromValue(d.fanout)).unsigned = true;
      else if (typeof d.fanout === "string")
        m.fanout = parseInt(d.fanout, 10);
      else if (typeof d.fanout === "number")
        m.fanout = d.fanout;
      else if (typeof d.fanout === "object")
        m.fanout = new $util.LongBits(d.fanout.low >>> 0, d.fanout.high >>> 0).toNumber(true);
    }
    if (d.mode != null) {
      m.mode = d.mode >>> 0;
    }
    if (d.mtime != null) {
      if (typeof d.mtime !== "object")
        throw TypeError(".Data.mtime: object expected");
      m.mtime = $root.UnixTime.fromObject(d.mtime);
    }
    return m;
  };
  Data2.toObject = function toObject(m, o) {
    if (!o)
      o = {};
    var d = {};
    if (o.arrays || o.defaults) {
      d.blocksizes = [];
    }
    if (o.defaults) {
      d.Type = o.enums === String ? "Raw" : 0;
      if (o.bytes === String)
        d.Data = "";
      else {
        d.Data = [];
        if (o.bytes !== Array)
          d.Data = $util.newBuffer(d.Data);
      }
      if ($util.Long) {
        var n = new $util.Long(0, 0, true);
        d.filesize = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
      } else
        d.filesize = o.longs === String ? "0" : 0;
      if ($util.Long) {
        var n = new $util.Long(0, 0, true);
        d.hashType = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
      } else
        d.hashType = o.longs === String ? "0" : 0;
      if ($util.Long) {
        var n = new $util.Long(0, 0, true);
        d.fanout = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
      } else
        d.fanout = o.longs === String ? "0" : 0;
      d.mode = 0;
      d.mtime = null;
    }
    if (m.Type != null && m.hasOwnProperty("Type")) {
      d.Type = o.enums === String ? $root.Data.DataType[m.Type] : m.Type;
    }
    if (m.Data != null && m.hasOwnProperty("Data")) {
      d.Data = o.bytes === String ? $util.base64.encode(m.Data, 0, m.Data.length) : o.bytes === Array ? Array.prototype.slice.call(m.Data) : m.Data;
    }
    if (m.filesize != null && m.hasOwnProperty("filesize")) {
      if (typeof m.filesize === "number")
        d.filesize = o.longs === String ? String(m.filesize) : m.filesize;
      else
        d.filesize = o.longs === String ? $util.Long.prototype.toString.call(m.filesize) : o.longs === Number ? new $util.LongBits(m.filesize.low >>> 0, m.filesize.high >>> 0).toNumber(true) : m.filesize;
    }
    if (m.blocksizes && m.blocksizes.length) {
      d.blocksizes = [];
      for (var j = 0; j < m.blocksizes.length; ++j) {
        if (typeof m.blocksizes[j] === "number")
          d.blocksizes[j] = o.longs === String ? String(m.blocksizes[j]) : m.blocksizes[j];
        else
          d.blocksizes[j] = o.longs === String ? $util.Long.prototype.toString.call(m.blocksizes[j]) : o.longs === Number ? new $util.LongBits(m.blocksizes[j].low >>> 0, m.blocksizes[j].high >>> 0).toNumber(true) : m.blocksizes[j];
      }
    }
    if (m.hashType != null && m.hasOwnProperty("hashType")) {
      if (typeof m.hashType === "number")
        d.hashType = o.longs === String ? String(m.hashType) : m.hashType;
      else
        d.hashType = o.longs === String ? $util.Long.prototype.toString.call(m.hashType) : o.longs === Number ? new $util.LongBits(m.hashType.low >>> 0, m.hashType.high >>> 0).toNumber(true) : m.hashType;
    }
    if (m.fanout != null && m.hasOwnProperty("fanout")) {
      if (typeof m.fanout === "number")
        d.fanout = o.longs === String ? String(m.fanout) : m.fanout;
      else
        d.fanout = o.longs === String ? $util.Long.prototype.toString.call(m.fanout) : o.longs === Number ? new $util.LongBits(m.fanout.low >>> 0, m.fanout.high >>> 0).toNumber(true) : m.fanout;
    }
    if (m.mode != null && m.hasOwnProperty("mode")) {
      d.mode = m.mode;
    }
    if (m.mtime != null && m.hasOwnProperty("mtime")) {
      d.mtime = $root.UnixTime.toObject(m.mtime, o);
    }
    return d;
  };
  Data2.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, minimal.util.toJSONOptions);
  };
  Data2.DataType = function() {
    const valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "Raw"] = 0;
    values[valuesById[1] = "Directory"] = 1;
    values[valuesById[2] = "File"] = 2;
    values[valuesById[3] = "Metadata"] = 3;
    values[valuesById[4] = "Symlink"] = 4;
    values[valuesById[5] = "HAMTShard"] = 5;
    return values;
  }();
  return Data2;
})();
$root.UnixTime = (() => {
  function UnixTime(p) {
    if (p) {
      for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
        if (p[ks[i]] != null)
          this[ks[i]] = p[ks[i]];
    }
  }
  UnixTime.prototype.Seconds = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
  UnixTime.prototype.FractionalNanoseconds = 0;
  UnixTime.encode = function encode2(m, w) {
    if (!w)
      w = $Writer.create();
    w.uint32(8).int64(m.Seconds);
    if (m.FractionalNanoseconds != null && Object.hasOwnProperty.call(m, "FractionalNanoseconds"))
      w.uint32(21).fixed32(m.FractionalNanoseconds);
    return w;
  };
  UnixTime.decode = function decode2(r, l) {
    if (!(r instanceof $Reader))
      r = $Reader.create(r);
    var c = l === void 0 ? r.len : r.pos + l, m = new $root.UnixTime();
    while (r.pos < c) {
      var t = r.uint32();
      switch (t >>> 3) {
        case 1:
          m.Seconds = r.int64();
          break;
        case 2:
          m.FractionalNanoseconds = r.fixed32();
          break;
        default:
          r.skipType(t & 7);
          break;
      }
    }
    if (!m.hasOwnProperty("Seconds"))
      throw $util.ProtocolError("missing required 'Seconds'", { instance: m });
    return m;
  };
  UnixTime.fromObject = function fromObject(d) {
    if (d instanceof $root.UnixTime)
      return d;
    var m = new $root.UnixTime();
    if (d.Seconds != null) {
      if ($util.Long)
        (m.Seconds = $util.Long.fromValue(d.Seconds)).unsigned = false;
      else if (typeof d.Seconds === "string")
        m.Seconds = parseInt(d.Seconds, 10);
      else if (typeof d.Seconds === "number")
        m.Seconds = d.Seconds;
      else if (typeof d.Seconds === "object")
        m.Seconds = new $util.LongBits(d.Seconds.low >>> 0, d.Seconds.high >>> 0).toNumber();
    }
    if (d.FractionalNanoseconds != null) {
      m.FractionalNanoseconds = d.FractionalNanoseconds >>> 0;
    }
    return m;
  };
  UnixTime.toObject = function toObject(m, o) {
    if (!o)
      o = {};
    var d = {};
    if (o.defaults) {
      if ($util.Long) {
        var n = new $util.Long(0, 0, false);
        d.Seconds = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
      } else
        d.Seconds = o.longs === String ? "0" : 0;
      d.FractionalNanoseconds = 0;
    }
    if (m.Seconds != null && m.hasOwnProperty("Seconds")) {
      if (typeof m.Seconds === "number")
        d.Seconds = o.longs === String ? String(m.Seconds) : m.Seconds;
      else
        d.Seconds = o.longs === String ? $util.Long.prototype.toString.call(m.Seconds) : o.longs === Number ? new $util.LongBits(m.Seconds.low >>> 0, m.Seconds.high >>> 0).toNumber() : m.Seconds;
    }
    if (m.FractionalNanoseconds != null && m.hasOwnProperty("FractionalNanoseconds")) {
      d.FractionalNanoseconds = m.FractionalNanoseconds;
    }
    return d;
  };
  UnixTime.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, minimal.util.toJSONOptions);
  };
  return UnixTime;
})();
$root.Metadata = (() => {
  function Metadata(p) {
    if (p) {
      for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
        if (p[ks[i]] != null)
          this[ks[i]] = p[ks[i]];
    }
  }
  Metadata.prototype.MimeType = "";
  Metadata.encode = function encode2(m, w) {
    if (!w)
      w = $Writer.create();
    if (m.MimeType != null && Object.hasOwnProperty.call(m, "MimeType"))
      w.uint32(10).string(m.MimeType);
    return w;
  };
  Metadata.decode = function decode2(r, l) {
    if (!(r instanceof $Reader))
      r = $Reader.create(r);
    var c = l === void 0 ? r.len : r.pos + l, m = new $root.Metadata();
    while (r.pos < c) {
      var t = r.uint32();
      switch (t >>> 3) {
        case 1:
          m.MimeType = r.string();
          break;
        default:
          r.skipType(t & 7);
          break;
      }
    }
    return m;
  };
  Metadata.fromObject = function fromObject(d) {
    if (d instanceof $root.Metadata)
      return d;
    var m = new $root.Metadata();
    if (d.MimeType != null) {
      m.MimeType = String(d.MimeType);
    }
    return m;
  };
  Metadata.toObject = function toObject(m, o) {
    if (!o)
      o = {};
    var d = {};
    if (o.defaults) {
      d.MimeType = "";
    }
    if (m.MimeType != null && m.hasOwnProperty("MimeType")) {
      d.MimeType = m.MimeType;
    }
    return d;
  };
  Metadata.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, minimal.util.toJSONOptions);
  };
  return Metadata;
})();
const PBData = Data;
const types = [
  "raw",
  "directory",
  "file",
  "metadata",
  "symlink",
  "hamt-sharded-directory"
];
const dirTypes = [
  "directory",
  "hamt-sharded-directory"
];
const DEFAULT_FILE_MODE = parseInt("0644", 8);
const DEFAULT_DIRECTORY_MODE = parseInt("0755", 8);
function parseMode(mode) {
  if (mode == null) {
    return void 0;
  }
  if (typeof mode === "number") {
    return mode & 4095;
  }
  mode = mode.toString();
  if (mode.substring(0, 1) === "0") {
    return parseInt(mode, 8) & 4095;
  }
  return parseInt(mode, 10) & 4095;
}
function parseMtime(input) {
  if (input == null) {
    return void 0;
  }
  let mtime;
  if (input.secs != null) {
    mtime = {
      secs: input.secs,
      nsecs: input.nsecs
    };
  }
  if (input.Seconds != null) {
    mtime = {
      secs: input.Seconds,
      nsecs: input.FractionalNanoseconds
    };
  }
  if (Array.isArray(input)) {
    mtime = {
      secs: input[0],
      nsecs: input[1]
    };
  }
  if (input instanceof Date) {
    const ms = input.getTime();
    const secs = Math.floor(ms / 1e3);
    mtime = {
      secs,
      nsecs: (ms - secs * 1e3) * 1e3
    };
  }
  if (!Object.prototype.hasOwnProperty.call(mtime, "secs")) {
    return void 0;
  }
  if (mtime != null && mtime.nsecs != null && (mtime.nsecs < 0 || mtime.nsecs > 999999999)) {
    throw errCode(new Error("mtime-nsecs must be within the range [0,999999999]"), "ERR_INVALID_MTIME_NSECS");
  }
  return mtime;
}
class UnixFS {
  static unmarshal(marshaled) {
    const message = PBData.decode(marshaled);
    const decoded = PBData.toObject(message, {
      defaults: false,
      arrays: true,
      longs: Number,
      objects: false
    });
    const data = new UnixFS({
      type: types[decoded.Type],
      data: decoded.Data,
      blockSizes: decoded.blocksizes,
      mode: decoded.mode,
      mtime: decoded.mtime ? {
        secs: decoded.mtime.Seconds,
        nsecs: decoded.mtime.FractionalNanoseconds
      } : void 0
    });
    data._originalMode = decoded.mode || 0;
    return data;
  }
  constructor(options = { type: "file" }) {
    const { type, data, blockSizes, hashType, fanout, mtime, mode } = options;
    if (type && !types.includes(type)) {
      throw errCode(new Error("Type: " + type + " is not valid"), "ERR_INVALID_TYPE");
    }
    this.type = type || "file";
    this.data = data;
    this.hashType = hashType;
    this.fanout = fanout;
    this.blockSizes = blockSizes || [];
    this._originalMode = 0;
    this.mode = parseMode(mode);
    if (mtime) {
      this.mtime = parseMtime(mtime);
      if (this.mtime && !this.mtime.nsecs) {
        this.mtime.nsecs = 0;
      }
    }
  }
  set mode(mode) {
    this._mode = this.isDirectory() ? DEFAULT_DIRECTORY_MODE : DEFAULT_FILE_MODE;
    const parsedMode = parseMode(mode);
    if (parsedMode !== void 0) {
      this._mode = parsedMode;
    }
  }
  get mode() {
    return this._mode;
  }
  isDirectory() {
    return Boolean(this.type && dirTypes.includes(this.type));
  }
  addBlockSize(size) {
    this.blockSizes.push(size);
  }
  removeBlockSize(index) {
    this.blockSizes.splice(index, 1);
  }
  fileSize() {
    if (this.isDirectory()) {
      return 0;
    }
    let sum = 0;
    this.blockSizes.forEach((size) => {
      sum += size;
    });
    if (this.data) {
      sum += this.data.length;
    }
    return sum;
  }
  marshal() {
    let type;
    switch (this.type) {
      case "raw":
        type = PBData.DataType.Raw;
        break;
      case "directory":
        type = PBData.DataType.Directory;
        break;
      case "file":
        type = PBData.DataType.File;
        break;
      case "metadata":
        type = PBData.DataType.Metadata;
        break;
      case "symlink":
        type = PBData.DataType.Symlink;
        break;
      case "hamt-sharded-directory":
        type = PBData.DataType.HAMTShard;
        break;
      default:
        throw errCode(new Error("Type: " + type + " is not valid"), "ERR_INVALID_TYPE");
    }
    let data = this.data;
    if (!this.data || !this.data.length) {
      data = void 0;
    }
    let mode;
    if (this.mode != null) {
      mode = this._originalMode & 4294963200 | (parseMode(this.mode) || 0);
      if (mode === DEFAULT_FILE_MODE && !this.isDirectory()) {
        mode = void 0;
      }
      if (mode === DEFAULT_DIRECTORY_MODE && this.isDirectory()) {
        mode = void 0;
      }
    }
    let mtime;
    if (this.mtime != null) {
      const parsed = parseMtime(this.mtime);
      if (parsed) {
        mtime = {
          Seconds: parsed.secs,
          FractionalNanoseconds: parsed.nsecs
        };
        if (mtime.FractionalNanoseconds === 0) {
          delete mtime.FractionalNanoseconds;
        }
      }
    }
    const pbData = {
      Type: type,
      Data: data,
      filesize: this.isDirectory() ? void 0 : this.fileSize(),
      blocksizes: this.blockSizes,
      hashType: this.hashType,
      fanout: this.fanout,
      mode,
      mtime
    };
    return PBData.encode(pbData).finish();
  }
}
var index_svelte_svelte_type_style_lang = "";
function create_else_block(ctx) {
  let t;
  return {
    c() {
      t = text("Loading IPFS...");
    },
    l(nodes) {
      t = claim_text(nodes, "Loading IPFS...");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    p: noop$1,
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_if_block(ctx) {
  let h3;
  let t0;
  let t1;
  let t2;
  let h2;
  let t3;
  let strong;
  let t4;
  let t5;
  let br0;
  let br1;
  let t6;
  let t7;
  let br2;
  let br3;
  let t8;
  let t9;
  let br4;
  let br5;
  let t10;
  let t11;
  let if_block4_anchor;
  let if_block0 = ctx[1] && create_if_block_5(ctx);
  let if_block1 = ctx[2] && create_if_block_4(ctx);
  let if_block2 = ctx[2] && create_if_block_3(ctx);
  let if_block3 = ctx[3] && create_if_block_2(ctx);
  let if_block4 = ctx[4] && create_if_block_1(ctx);
  return {
    c() {
      h3 = element("h3");
      t0 = text("Node ID: ");
      t1 = text(ctx[0]);
      t2 = space();
      h2 = element("h2");
      t3 = text("IPFS loaded in a Vite app, ");
      strong = element("strong");
      t4 = text("right?!");
      t5 = space();
      if (if_block0)
        if_block0.c();
      br0 = element("br");
      br1 = element("br");
      t6 = space();
      if (if_block1)
        if_block1.c();
      t7 = space();
      br2 = element("br");
      br3 = element("br");
      t8 = space();
      if (if_block2)
        if_block2.c();
      t9 = space();
      br4 = element("br");
      br5 = element("br");
      t10 = space();
      if (if_block3)
        if_block3.c();
      t11 = space();
      if (if_block4)
        if_block4.c();
      if_block4_anchor = empty();
    },
    l(nodes) {
      h3 = claim_element(nodes, "H3", {});
      var h3_nodes = children(h3);
      t0 = claim_text(h3_nodes, "Node ID: ");
      t1 = claim_text(h3_nodes, ctx[0]);
      h3_nodes.forEach(detach);
      t2 = claim_space(nodes);
      h2 = claim_element(nodes, "H2", {});
      var h2_nodes = children(h2);
      t3 = claim_text(h2_nodes, "IPFS loaded in a Vite app, ");
      strong = claim_element(h2_nodes, "STRONG", {});
      var strong_nodes = children(strong);
      t4 = claim_text(strong_nodes, "right?!");
      strong_nodes.forEach(detach);
      h2_nodes.forEach(detach);
      t5 = claim_space(nodes);
      if (if_block0)
        if_block0.l(nodes);
      br0 = claim_element(nodes, "BR", {});
      br1 = claim_element(nodes, "BR", {});
      t6 = claim_space(nodes);
      if (if_block1)
        if_block1.l(nodes);
      t7 = claim_space(nodes);
      br2 = claim_element(nodes, "BR", {});
      br3 = claim_element(nodes, "BR", {});
      t8 = claim_space(nodes);
      if (if_block2)
        if_block2.l(nodes);
      t9 = claim_space(nodes);
      br4 = claim_element(nodes, "BR", {});
      br5 = claim_element(nodes, "BR", {});
      t10 = claim_space(nodes);
      if (if_block3)
        if_block3.l(nodes);
      t11 = claim_space(nodes);
      if (if_block4)
        if_block4.l(nodes);
      if_block4_anchor = empty();
    },
    m(target, anchor) {
      insert_hydration(target, h3, anchor);
      append_hydration(h3, t0);
      append_hydration(h3, t1);
      insert_hydration(target, t2, anchor);
      insert_hydration(target, h2, anchor);
      append_hydration(h2, t3);
      append_hydration(h2, strong);
      append_hydration(strong, t4);
      insert_hydration(target, t5, anchor);
      if (if_block0)
        if_block0.m(target, anchor);
      insert_hydration(target, br0, anchor);
      insert_hydration(target, br1, anchor);
      insert_hydration(target, t6, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert_hydration(target, t7, anchor);
      insert_hydration(target, br2, anchor);
      insert_hydration(target, br3, anchor);
      insert_hydration(target, t8, anchor);
      if (if_block2)
        if_block2.m(target, anchor);
      insert_hydration(target, t9, anchor);
      insert_hydration(target, br4, anchor);
      insert_hydration(target, br5, anchor);
      insert_hydration(target, t10, anchor);
      if (if_block3)
        if_block3.m(target, anchor);
      insert_hydration(target, t11, anchor);
      if (if_block4)
        if_block4.m(target, anchor);
      insert_hydration(target, if_block4_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 1)
        set_data(t1, ctx2[0]);
      if (ctx2[1]) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_5(ctx2);
          if_block0.c();
          if_block0.m(br0.parentNode, br0);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (ctx2[2]) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block_4(ctx2);
          if_block1.c();
          if_block1.m(t7.parentNode, t7);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (ctx2[2]) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
        } else {
          if_block2 = create_if_block_3(ctx2);
          if_block2.c();
          if_block2.m(t9.parentNode, t9);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
      if (ctx2[3]) {
        if (if_block3) {
          if_block3.p(ctx2, dirty);
        } else {
          if_block3 = create_if_block_2(ctx2);
          if_block3.c();
          if_block3.m(t11.parentNode, t11);
        }
      } else if (if_block3) {
        if_block3.d(1);
        if_block3 = null;
      }
      if (ctx2[4])
        if_block4.p(ctx2, dirty);
    },
    d(detaching) {
      if (detaching)
        detach(h3);
      if (detaching)
        detach(t2);
      if (detaching)
        detach(h2);
      if (detaching)
        detach(t5);
      if (if_block0)
        if_block0.d(detaching);
      if (detaching)
        detach(br0);
      if (detaching)
        detach(br1);
      if (detaching)
        detach(t6);
      if (if_block1)
        if_block1.d(detaching);
      if (detaching)
        detach(t7);
      if (detaching)
        detach(br2);
      if (detaching)
        detach(br3);
      if (detaching)
        detach(t8);
      if (if_block2)
        if_block2.d(detaching);
      if (detaching)
        detach(t9);
      if (detaching)
        detach(br4);
      if (detaching)
        detach(br5);
      if (detaching)
        detach(t10);
      if (if_block3)
        if_block3.d(detaching);
      if (detaching)
        detach(t11);
      if (if_block4)
        if_block4.d(detaching);
      if (detaching)
        detach(if_block4_anchor);
    }
  };
}
function create_if_block_5(ctx) {
  let t0;
  let t1_value = JSON.stringify(ctx[5]) + "";
  let t1;
  let t2;
  let t3_value = "{ storeCodec: 'dag-pb' }";
  let t3;
  let t4;
  let br0;
  let t5;
  let t6_value = ctx[1].toV0().toString() + "";
  let t6;
  let t7;
  let br1;
  let t8;
  let t9_value = ctx[1].toString() + "";
  let t9;
  let t10;
  return {
    c() {
      t0 = text("ipfs.dag.put(");
      t1 = text(t1_value);
      t2 = text(", ");
      t3 = text(t3_value);
      t4 = text(")\r\n			");
      br0 = element("br");
      t5 = text("\r\n			CID verion0: ");
      t6 = text(t6_value);
      t7 = space();
      br1 = element("br");
      t8 = text("\r\n			CID verion1: ");
      t9 = text(t9_value);
      t10 = space();
    },
    l(nodes) {
      t0 = claim_text(nodes, "ipfs.dag.put(");
      t1 = claim_text(nodes, t1_value);
      t2 = claim_text(nodes, ", ");
      t3 = claim_text(nodes, t3_value);
      t4 = claim_text(nodes, ")\r\n			");
      br0 = claim_element(nodes, "BR", {});
      t5 = claim_text(nodes, "\r\n			CID verion0: ");
      t6 = claim_text(nodes, t6_value);
      t7 = claim_space(nodes);
      br1 = claim_element(nodes, "BR", {});
      t8 = claim_text(nodes, "\r\n			CID verion1: ");
      t9 = claim_text(nodes, t9_value);
      t10 = claim_space(nodes);
    },
    m(target, anchor) {
      insert_hydration(target, t0, anchor);
      insert_hydration(target, t1, anchor);
      insert_hydration(target, t2, anchor);
      insert_hydration(target, t3, anchor);
      insert_hydration(target, t4, anchor);
      insert_hydration(target, br0, anchor);
      insert_hydration(target, t5, anchor);
      insert_hydration(target, t6, anchor);
      insert_hydration(target, t7, anchor);
      insert_hydration(target, br1, anchor);
      insert_hydration(target, t8, anchor);
      insert_hydration(target, t9, anchor);
      insert_hydration(target, t10, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 2 && t6_value !== (t6_value = ctx2[1].toV0().toString() + ""))
        set_data(t6, t6_value);
      if (dirty & 2 && t9_value !== (t9_value = ctx2[1].toString() + ""))
        set_data(t9, t9_value);
    },
    d(detaching) {
      if (detaching)
        detach(t0);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(t2);
      if (detaching)
        detach(t3);
      if (detaching)
        detach(t4);
      if (detaching)
        detach(br0);
      if (detaching)
        detach(t5);
      if (detaching)
        detach(t6);
      if (detaching)
        detach(t7);
      if (detaching)
        detach(br1);
      if (detaching)
        detach(t8);
      if (detaching)
        detach(t9);
      if (detaching)
        detach(t10);
    }
  };
}
function create_if_block_4(ctx) {
  let t0;
  let t1_value = JSON.stringify(ctx[5]) + "";
  let t1;
  let t2;
  let br;
  let t3;
  let t4_value = ctx[2].cid.toV0().toString() + "";
  let t4;
  return {
    c() {
      t0 = text("ipfs.add(");
      t1 = text(t1_value);
      t2 = text(")");
      br = element("br");
      t3 = text("CID v0: ");
      t4 = text(t4_value);
    },
    l(nodes) {
      t0 = claim_text(nodes, "ipfs.add(");
      t1 = claim_text(nodes, t1_value);
      t2 = claim_text(nodes, ")");
      br = claim_element(nodes, "BR", {});
      t3 = claim_text(nodes, "CID v0: ");
      t4 = claim_text(nodes, t4_value);
    },
    m(target, anchor) {
      insert_hydration(target, t0, anchor);
      insert_hydration(target, t1, anchor);
      insert_hydration(target, t2, anchor);
      insert_hydration(target, br, anchor);
      insert_hydration(target, t3, anchor);
      insert_hydration(target, t4, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 4 && t4_value !== (t4_value = ctx2[2].cid.toV0().toString() + ""))
        set_data(t4, t4_value);
    },
    d(detaching) {
      if (detaching)
        detach(t0);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(t2);
      if (detaching)
        detach(br);
      if (detaching)
        detach(t3);
      if (detaching)
        detach(t4);
    }
  };
}
function create_if_block_3(ctx) {
  let t0;
  let br0;
  let t1;
  let a;
  let t2_value = ctx[2].cid.toV0().toString() + "";
  let t2;
  let a_href_value;
  let t3;
  let br1;
  let t4;
  let b;
  let t5_value = (ctx[1].toV0().toString() === ctx[2].cid.toV0().toString()) + "";
  let t5;
  return {
    c() {
      t0 = text("ipfs.add(data) >> ipfs.cat(data):");
      br0 = element("br");
      t1 = space();
      a = element("a");
      t2 = text(t2_value);
      t3 = space();
      br1 = element("br");
      t4 = text(" Check that they are the same:\r\n			");
      b = element("b");
      t5 = text(t5_value);
      this.h();
    },
    l(nodes) {
      t0 = claim_text(nodes, "ipfs.add(data) >> ipfs.cat(data):");
      br0 = claim_element(nodes, "BR", {});
      t1 = claim_space(nodes);
      a = claim_element(nodes, "A", { target: true, href: true });
      var a_nodes = children(a);
      t2 = claim_text(a_nodes, t2_value);
      a_nodes.forEach(detach);
      t3 = claim_space(nodes);
      br1 = claim_element(nodes, "BR", {});
      t4 = claim_text(nodes, " Check that they are the same:\r\n			");
      b = claim_element(nodes, "B", {});
      var b_nodes = children(b);
      t5 = claim_text(b_nodes, t5_value);
      b_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(a, "target", "_blank");
      attr(a, "href", a_href_value = "https://dweb.link/api/v0/cat?arg=" + ctx[2].cid.toV0().toString());
    },
    m(target, anchor) {
      insert_hydration(target, t0, anchor);
      insert_hydration(target, br0, anchor);
      insert_hydration(target, t1, anchor);
      insert_hydration(target, a, anchor);
      append_hydration(a, t2);
      insert_hydration(target, t3, anchor);
      insert_hydration(target, br1, anchor);
      insert_hydration(target, t4, anchor);
      insert_hydration(target, b, anchor);
      append_hydration(b, t5);
    },
    p(ctx2, dirty) {
      if (dirty & 4 && t2_value !== (t2_value = ctx2[2].cid.toV0().toString() + ""))
        set_data(t2, t2_value);
      if (dirty & 4 && a_href_value !== (a_href_value = "https://dweb.link/api/v0/cat?arg=" + ctx2[2].cid.toV0().toString())) {
        attr(a, "href", a_href_value);
      }
      if (dirty & 6 && t5_value !== (t5_value = (ctx2[1].toV0().toString() === ctx2[2].cid.toV0().toString()) + ""))
        set_data(t5, t5_value);
    },
    d(detaching) {
      if (detaching)
        detach(t0);
      if (detaching)
        detach(br0);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(a);
      if (detaching)
        detach(t3);
      if (detaching)
        detach(br1);
      if (detaching)
        detach(t4);
      if (detaching)
        detach(b);
    }
  };
}
function create_if_block_2(ctx) {
  let t0;
  let br0;
  let a0;
  let t1_value = ctx[3].toV0().toString() + "";
  let t1;
  let a0_href_value;
  let t2;
  let br1;
  let t3;
  let br2;
  let a1;
  let t4;
  let a1_href_value;
  let br3;
  let br4;
  let t5;
  let br5;
  let t6;
  let a2;
  let t7;
  let a2_href_value;
  let br6;
  let br7;
  return {
    c() {
      t0 = text("Explore Linked Data:");
      br0 = element("br");
      a0 = element("a");
      t1 = text(t1_value);
      t2 = space();
      br1 = element("br");
      t3 = text("DWeb Site:");
      br2 = element("br");
      a1 = element("a");
      t4 = text("https://[cid].ipfs.dweb.link");
      br3 = element("br");
      br4 = element("br");
      t5 = text("\r\n\r\n			CloudFlare:");
      br5 = element("br");
      t6 = space();
      a2 = element("a");
      t7 = text("https://[cid].ipfs.cf-ipfs.com");
      br6 = element("br");
      br7 = element("br");
      this.h();
    },
    l(nodes) {
      t0 = claim_text(nodes, "Explore Linked Data:");
      br0 = claim_element(nodes, "BR", {});
      a0 = claim_element(nodes, "A", { target: true, href: true });
      var a0_nodes = children(a0);
      t1 = claim_text(a0_nodes, t1_value);
      a0_nodes.forEach(detach);
      t2 = claim_space(nodes);
      br1 = claim_element(nodes, "BR", {});
      t3 = claim_text(nodes, "DWeb Site:");
      br2 = claim_element(nodes, "BR", {});
      a1 = claim_element(nodes, "A", { target: true, href: true });
      var a1_nodes = children(a1);
      t4 = claim_text(a1_nodes, "https://[cid].ipfs.dweb.link");
      a1_nodes.forEach(detach);
      br3 = claim_element(nodes, "BR", {});
      br4 = claim_element(nodes, "BR", {});
      t5 = claim_text(nodes, "\r\n\r\n			CloudFlare:");
      br5 = claim_element(nodes, "BR", {});
      t6 = claim_space(nodes);
      a2 = claim_element(nodes, "A", { target: true, href: true });
      var a2_nodes = children(a2);
      t7 = claim_text(a2_nodes, "https://[cid].ipfs.cf-ipfs.com");
      a2_nodes.forEach(detach);
      br6 = claim_element(nodes, "BR", {});
      br7 = claim_element(nodes, "BR", {});
      this.h();
    },
    h() {
      attr(a0, "target", "_blank");
      attr(a0, "href", a0_href_value = "https://explore.ipld.io/#/explore/" + ctx[3].toV0().toString());
      attr(a1, "target", "_blank");
      attr(a1, "href", a1_href_value = "https://" + ctx[3].toV1().toString() + ".ipfs.dweb.link/");
      attr(a2, "target", "_blank");
      attr(a2, "href", a2_href_value = "https://" + ctx[3].toV1().toString() + ".ipfs.cf-ipfs.com/");
    },
    m(target, anchor) {
      insert_hydration(target, t0, anchor);
      insert_hydration(target, br0, anchor);
      insert_hydration(target, a0, anchor);
      append_hydration(a0, t1);
      insert_hydration(target, t2, anchor);
      insert_hydration(target, br1, anchor);
      insert_hydration(target, t3, anchor);
      insert_hydration(target, br2, anchor);
      insert_hydration(target, a1, anchor);
      append_hydration(a1, t4);
      insert_hydration(target, br3, anchor);
      insert_hydration(target, br4, anchor);
      insert_hydration(target, t5, anchor);
      insert_hydration(target, br5, anchor);
      insert_hydration(target, t6, anchor);
      insert_hydration(target, a2, anchor);
      append_hydration(a2, t7);
      insert_hydration(target, br6, anchor);
      insert_hydration(target, br7, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 8 && t1_value !== (t1_value = ctx2[3].toV0().toString() + ""))
        set_data(t1, t1_value);
      if (dirty & 8 && a0_href_value !== (a0_href_value = "https://explore.ipld.io/#/explore/" + ctx2[3].toV0().toString())) {
        attr(a0, "href", a0_href_value);
      }
      if (dirty & 8 && a1_href_value !== (a1_href_value = "https://" + ctx2[3].toV1().toString() + ".ipfs.dweb.link/")) {
        attr(a1, "href", a1_href_value);
      }
      if (dirty & 8 && a2_href_value !== (a2_href_value = "https://" + ctx2[3].toV1().toString() + ".ipfs.cf-ipfs.com/")) {
        attr(a2, "href", a2_href_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(t0);
      if (detaching)
        detach(br0);
      if (detaching)
        detach(a0);
      if (detaching)
        detach(t2);
      if (detaching)
        detach(br1);
      if (detaching)
        detach(t3);
      if (detaching)
        detach(br2);
      if (detaching)
        detach(a1);
      if (detaching)
        detach(br3);
      if (detaching)
        detach(br4);
      if (detaching)
        detach(t5);
      if (detaching)
        detach(br5);
      if (detaching)
        detach(t6);
      if (detaching)
        detach(a2);
      if (detaching)
        detach(br6);
      if (detaching)
        detach(br7);
    }
  };
}
function create_if_block_1(ctx) {
  let t0;
  let br0;
  let a0;
  let t1_value = ctx[4].cid.toV0().toString() + "";
  let t1;
  let a0_href_value;
  let t2;
  let br1;
  let t3;
  let br2;
  let a1;
  let t4;
  let a1_href_value;
  let br3;
  let t5;
  let br4;
  let t6;
  let a2;
  let t7;
  let a2_href_value;
  let br5;
  let br6;
  return {
    c() {
      t0 = text("Explore Add with Links:");
      br0 = element("br");
      a0 = element("a");
      t1 = text(t1_value);
      t2 = space();
      br1 = element("br");
      t3 = text("DWeb Site:");
      br2 = element("br");
      a1 = element("a");
      t4 = text("View Data");
      br3 = element("br");
      t5 = text("Mirror:");
      br4 = element("br");
      t6 = space();
      a2 = element("a");
      t7 = text("View Mirror Data");
      br5 = element("br");
      br6 = element("br");
      this.h();
    },
    l(nodes) {
      t0 = claim_text(nodes, "Explore Add with Links:");
      br0 = claim_element(nodes, "BR", {});
      a0 = claim_element(nodes, "A", { target: true, href: true });
      var a0_nodes = children(a0);
      t1 = claim_text(a0_nodes, t1_value);
      a0_nodes.forEach(detach);
      t2 = claim_space(nodes);
      br1 = claim_element(nodes, "BR", {});
      t3 = claim_text(nodes, "DWeb Site:");
      br2 = claim_element(nodes, "BR", {});
      a1 = claim_element(nodes, "A", { target: true, href: true });
      var a1_nodes = children(a1);
      t4 = claim_text(a1_nodes, "View Data");
      a1_nodes.forEach(detach);
      br3 = claim_element(nodes, "BR", {});
      t5 = claim_text(nodes, "Mirror:");
      br4 = claim_element(nodes, "BR", {});
      t6 = claim_space(nodes);
      a2 = claim_element(nodes, "A", { target: true, href: true });
      var a2_nodes = children(a2);
      t7 = claim_text(a2_nodes, "View Mirror Data");
      a2_nodes.forEach(detach);
      br5 = claim_element(nodes, "BR", {});
      br6 = claim_element(nodes, "BR", {});
      this.h();
    },
    h() {
      attr(a0, "target", "_blank");
      attr(a0, "href", a0_href_value = "ipfs://bafybeiftcyj7gao3kykwic743wuulwpzkeat4nfmzapbgz5mxsfxsnpbtu/#/explore/" + ctx[4].cid.toV0().toString());
      attr(a1, "target", "_blank");
      attr(a1, "href", a1_href_value = "https://" + ctx[4].cid.toV1().toString() + ".ipfs.dweb.link/");
      attr(a2, "target", "_blank");
      attr(a2, "href", a2_href_value = "https://" + ctx[4].cid.toV1().toString() + ".ipfs.cf-ipfs.com/");
    },
    m(target, anchor) {
      insert_hydration(target, t0, anchor);
      insert_hydration(target, br0, anchor);
      insert_hydration(target, a0, anchor);
      append_hydration(a0, t1);
      insert_hydration(target, t2, anchor);
      insert_hydration(target, br1, anchor);
      insert_hydration(target, t3, anchor);
      insert_hydration(target, br2, anchor);
      insert_hydration(target, a1, anchor);
      append_hydration(a1, t4);
      insert_hydration(target, br3, anchor);
      insert_hydration(target, t5, anchor);
      insert_hydration(target, br4, anchor);
      insert_hydration(target, t6, anchor);
      insert_hydration(target, a2, anchor);
      append_hydration(a2, t7);
      insert_hydration(target, br5, anchor);
      insert_hydration(target, br6, anchor);
    },
    p: noop$1,
    d(detaching) {
      if (detaching)
        detach(t0);
      if (detaching)
        detach(br0);
      if (detaching)
        detach(a0);
      if (detaching)
        detach(t2);
      if (detaching)
        detach(br1);
      if (detaching)
        detach(t3);
      if (detaching)
        detach(br2);
      if (detaching)
        detach(a1);
      if (detaching)
        detach(br3);
      if (detaching)
        detach(t5);
      if (detaching)
        detach(br4);
      if (detaching)
        detach(t6);
      if (detaching)
        detach(a2);
      if (detaching)
        detach(br5);
      if (detaching)
        detach(br6);
    }
  };
}
function create_fragment(ctx) {
  let t;
  let section;
  function select_block_type(ctx2, dirty) {
    if (ctx2[0])
      return create_if_block;
    return create_else_block;
  }
  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      t = space();
      section = element("section");
      if_block.c();
      this.h();
    },
    l(nodes) {
      const head_nodes = query_selector_all('[data-svelte="svelte-1anpopb"]', document.head);
      head_nodes.forEach(detach);
      t = claim_space(nodes);
      section = claim_element(nodes, "SECTION", { class: true });
      var section_nodes = children(section);
      if_block.l(section_nodes);
      section_nodes.forEach(detach);
      this.h();
    },
    h() {
      document.title = "Home";
      attr(section, "class", "svelte-1bgohwt");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
      insert_hydration(target, section, anchor);
      if_block.m(section, null);
    },
    p(ctx2, [dirty]) {
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(section, null);
        }
      }
    },
    i: noop$1,
    o: noop$1,
    d(detaching) {
      if (detaching)
        detach(t);
      if (detaching)
        detach(section);
      if_block.d();
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let ipfsNode;
  let nodeId;
  let putted, added;
  let putWithLinks, addedWithLinks;
  let helloWorld = { hello: "world" };
  onMount(async () => {
    if (!globalThis.ipfsNode) {
      const IPFSmodule = await __vitePreload(() => import("../chunks/ipfs-core-53fb93ca.js"), true ? [] : void 0);
      const IPFS = IPFSmodule.default;
      console.log({ IPFS });
      ipfsNode = await IPFS.create();
      globalThis.ipfsNode = ipfsNode;
    } else {
      ipfsNode = globalThis.ipfsNode;
    }
    console.log({ ipfsNode });
    const identity2 = await ipfsNode.id();
    $$invalidate(0, nodeId = identity2.id);
    const file = new UnixFS({
      type: "file",
      data: fromString(JSON.stringify(helloWorld))
    });
    const pbNode = { Data: file.marshal(), Links: [] };
    $$invalidate(1, putted = await ipfsNode.dag.put(pbNode, { storeCodec: "dag-pb" }));
    $$invalidate(2, added = await ipfsNode.add(JSON.stringify(helloWorld)));
    const pbNodeWithLinks = {
      Data: new UnixFS({ type: "file", data: new Uint8Array(0) }).marshal(),
      Links: [
        {
          Name: "hello",
          Tsize: pbNode.Data != null ? pbNode.Data.length : 0,
          Hash: putted.toV0()
        }
      ]
    };
    $$invalidate(3, putWithLinks = await ipfsNode.dag.put(pbNodeWithLinks, { storeCodec: "dag-pb" }));
    return () => {
      console.log("the ipfs node is being stopped");
      ipfsNode.stop();
      globalThis.ipfsNode = null;
    };
  });
  return [nodeId, putted, added, putWithLinks, addedWithLinks, helloWorld];
}
class Routes extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
export { Routes as default };
//# sourceMappingURL=index.svelte-bf6780ab.js.map
