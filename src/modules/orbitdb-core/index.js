var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod3) => function __require2() {
  return mod3 || (0, cb[__getOwnPropNames(cb)[0]])((mod3 = { exports: {} }).exports, mod3), mod3.exports;
};
var __export = (target, all) => {
  for (var name3 in all)
    __defProp(target, name3, { get: all[name3], enumerable: true });
};
var __copyProps = (to, from4, except, desc) => {
  if (from4 && typeof from4 === "object" || typeof from4 === "function") {
    for (let key of __getOwnPropNames(from4))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from4[key], enumerable: !(desc = __getOwnPropDesc(from4, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod3, isNodeMode, target) => (target = mod3 != null ? __create(__getProtoOf(mod3)) : {}, __copyProps(isNodeMode || !mod3 || !mod3.__esModule ? __defProp(target, "default", { value: mod3, enumerable: true }) : target, mod3));

// node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/base64-js/index.js"(exports2) {
    "use strict";
    init_node_globals();
    exports2.byteLength = byteLength;
    exports2.toByteArray = toByteArray;
    exports2.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code3.length; i < len; ++i) {
      lookup[i] = code3[i];
      revLookup[code3.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1)
        validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output2 = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output2.push(tripletToBase64(tmp));
      }
      return output2.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
      }
      return parts.join("");
    }
  }
});

// node_modules/ieee754/index.js
var require_ieee754 = __commonJS({
  "node_modules/ieee754/index.js"(exports2) {
    init_node_globals();
    exports2.read = function(buffer2, offset, isLE2, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE2 ? nBytes - 1 : 0;
      var d = isLE2 ? -1 : 1;
      var s = buffer2[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer2[offset + i], i += d, nBits -= 8) {
      }
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer2[offset + i], i += d, nBits -= 8) {
      }
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports2.write = function(buffer2, value, offset, isLE2, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE2 ? 0 : nBytes - 1;
      var d = isLE2 ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer2[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
      }
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer2[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
      }
      buffer2[offset + i - d] |= s * 128;
    };
  }
});

// node_modules/buffer/index.js
var require_buffer = __commonJS({
  "node_modules/buffer/index.js"(exports2) {
    "use strict";
    init_node_globals();
    var base642 = require_base64_js();
    var ieee754 = require_ieee754();
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports2.Buffer = Buffer2;
    exports2.SlowBuffer = SlowBuffer;
    exports2.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports2.kMaxLength = K_MAX_LENGTH;
    Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
    }
    function typedArraySupport() {
      try {
        const arr = new Uint8Array(1);
        const proto = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    Object.defineProperty(Buffer2.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this))
          return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer2.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this))
          return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length3) {
      if (length3 > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length3 + '" is invalid for option "size"');
      }
      const buf2 = new Uint8Array(length3);
      Object.setPrototypeOf(buf2, Buffer2.prototype);
      return buf2;
    }
    function Buffer2(arg, encodingOrOffset, length3) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError('The "string" argument must be of type string. Received type number');
        }
        return allocUnsafe2(arg);
      }
      return from4(arg, encodingOrOffset, length3);
    }
    Buffer2.poolSize = 8192;
    function from4(value, encodingOrOffset, length3) {
      if (typeof value === "string") {
        return fromString4(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length3);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length3);
      }
      if (typeof value === "number") {
        throw new TypeError('The "value" argument must not be of type number. Received type number');
      }
      const valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer2.from(valueOf, encodingOrOffset, length3);
      }
      const b = fromObject(value);
      if (b)
        return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer2.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length3);
      }
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
    }
    Buffer2.from = function(value, encodingOrOffset, length3) {
      return from4(value, encodingOrOffset, length3);
    };
    Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer2, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc2(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    Buffer2.alloc = function(size, fill, encoding) {
      return alloc2(size, fill, encoding);
    };
    function allocUnsafe2(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer2.allocUnsafe = function(size) {
      return allocUnsafe2(size);
    };
    Buffer2.allocUnsafeSlow = function(size) {
      return allocUnsafe2(size);
    };
    function fromString4(string2, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer2.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length3 = byteLength(string2, encoding) | 0;
      let buf2 = createBuffer(length3);
      const actual = buf2.write(string2, encoding);
      if (actual !== length3) {
        buf2 = buf2.slice(0, actual);
      }
      return buf2;
    }
    function fromArrayLike(array) {
      const length3 = array.length < 0 ? 0 : checked(array.length) | 0;
      const buf2 = createBuffer(length3);
      for (let i = 0; i < length3; i += 1) {
        buf2[i] = array[i] & 255;
      }
      return buf2;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length3) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length3 || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf2;
      if (byteOffset === void 0 && length3 === void 0) {
        buf2 = new Uint8Array(array);
      } else if (length3 === void 0) {
        buf2 = new Uint8Array(array, byteOffset);
      } else {
        buf2 = new Uint8Array(array, byteOffset, length3);
      }
      Object.setPrototypeOf(buf2, Buffer2.prototype);
      return buf2;
    }
    function fromObject(obj) {
      if (Buffer2.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf2 = createBuffer(len);
        if (buf2.length === 0) {
          return buf2;
        }
        obj.copy(buf2, 0, 0, len);
        return buf2;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length3) {
      if (length3 >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length3 | 0;
    }
    function SlowBuffer(length3) {
      if (+length3 != length3) {
        length3 = 0;
      }
      return Buffer2.alloc(+length3);
    }
    Buffer2.isBuffer = function isBuffer3(b) {
      return b != null && b._isBuffer === true && b !== Buffer2.prototype;
    };
    Buffer2.compare = function compare3(a, b) {
      if (isInstance(a, Uint8Array))
        a = Buffer2.from(a, a.offset, a.byteLength);
      if (isInstance(b, Uint8Array))
        b = Buffer2.from(b, b.offset, b.byteLength);
      if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
        throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
      }
      if (a === b)
        return 0;
      let x = a.length;
      let y = b.length;
      for (let i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    Buffer2.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer2.concat = function concat3(list, length3) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer2.alloc(0);
      }
      let i;
      if (length3 === void 0) {
        length3 = 0;
        for (i = 0; i < list.length; ++i) {
          length3 += list[i].length;
        }
      }
      const buffer2 = Buffer2.allocUnsafe(length3);
      let pos = 0;
      for (i = 0; i < list.length; ++i) {
        let buf2 = list[i];
        if (isInstance(buf2, Uint8Array)) {
          if (pos + buf2.length > buffer2.length) {
            if (!Buffer2.isBuffer(buf2))
              buf2 = Buffer2.from(buf2);
            buf2.copy(buffer2, pos);
          } else {
            Uint8Array.prototype.set.call(buffer2, buf2, pos);
          }
        } else if (!Buffer2.isBuffer(buf2)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf2.copy(buffer2, pos);
        }
        pos += buf2.length;
      }
      return buffer2;
    };
    function byteLength(string2, encoding) {
      if (Buffer2.isBuffer(string2)) {
        return string2.length;
      }
      if (ArrayBuffer.isView(string2) || isInstance(string2, ArrayBuffer)) {
        return string2.byteLength;
      }
      if (typeof string2 !== "string") {
        throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string2);
      }
      const len = string2.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0)
        return 0;
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes4(string2).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string2).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes4(string2).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding)
        encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice2(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.prototype._isBuffer = true;
    function swap(b, n, m) {
      const i = b[n];
      b[n] = b[m];
      b[m] = i;
    }
    Buffer2.prototype.swap16 = function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer2.prototype.swap32 = function swap32() {
      const len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer2.prototype.swap64 = function swap64() {
      const len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer2.prototype.toString = function toString4() {
      const length3 = this.length;
      if (length3 === 0)
        return "";
      if (arguments.length === 0)
        return utf8Slice2(this, 0, length3);
      return slowToString.apply(this, arguments);
    };
    Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
    Buffer2.prototype.equals = function equals6(b) {
      if (!Buffer2.isBuffer(b))
        throw new TypeError("Argument must be a Buffer");
      if (this === b)
        return true;
      return Buffer2.compare(this, b) === 0;
    };
    Buffer2.prototype.inspect = function inspect() {
      let str = "";
      const max = exports2.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max)
        str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
    }
    Buffer2.prototype.compare = function compare3(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer2.from(target, target.offset, target.byteLength);
      }
      if (!Buffer2.isBuffer(target)) {
        throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target);
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target)
        return 0;
      let x = thisEnd - thisStart;
      let y = end - start;
      const len = Math.min(x, y);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer2, val, byteOffset, encoding, dir) {
      if (buffer2.length === 0)
        return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer2.length - 1;
      }
      if (byteOffset < 0)
        byteOffset = buffer2.length + byteOffset;
      if (byteOffset >= buffer2.length) {
        if (dir)
          return -1;
        else
          byteOffset = buffer2.length - 1;
      } else if (byteOffset < 0) {
        if (dir)
          byteOffset = 0;
        else
          return -1;
      }
      if (typeof val === "string") {
        val = Buffer2.from(val, encoding);
      }
      if (Buffer2.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer2, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer2, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer2, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer2, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read3(buf2, i2) {
        if (indexSize === 1) {
          return buf2[i2];
        } else {
          return buf2.readUInt16BE(i2 * indexSize);
        }
      }
      let i;
      if (dir) {
        let foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read3(arr, i) === read3(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1)
              foundIndex = i;
            if (i - foundIndex + 1 === valLength)
              return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1)
              i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength)
          byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          let found = true;
          for (let j = 0; j < valLength; j++) {
            if (read3(arr, i + j) !== read3(val, j)) {
              found = false;
              break;
            }
          }
          if (found)
            return i;
        }
      }
      return -1;
    }
    Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf2, string2, offset, length3) {
      offset = Number(offset) || 0;
      const remaining = buf2.length - offset;
      if (!length3) {
        length3 = remaining;
      } else {
        length3 = Number(length3);
        if (length3 > remaining) {
          length3 = remaining;
        }
      }
      const strLen = string2.length;
      if (length3 > strLen / 2) {
        length3 = strLen / 2;
      }
      let i;
      for (i = 0; i < length3; ++i) {
        const parsed = parseInt(string2.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed))
          return i;
        buf2[offset + i] = parsed;
      }
      return i;
    }
    function utf8Write(buf2, string2, offset, length3) {
      return blitBuffer(utf8ToBytes4(string2, buf2.length - offset), buf2, offset, length3);
    }
    function asciiWrite(buf2, string2, offset, length3) {
      return blitBuffer(asciiToBytes(string2), buf2, offset, length3);
    }
    function base64Write(buf2, string2, offset, length3) {
      return blitBuffer(base64ToBytes(string2), buf2, offset, length3);
    }
    function ucs2Write(buf2, string2, offset, length3) {
      return blitBuffer(utf16leToBytes(string2, buf2.length - offset), buf2, offset, length3);
    }
    Buffer2.prototype.write = function write(string2, offset, length3, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length3 = this.length;
        offset = 0;
      } else if (length3 === void 0 && typeof offset === "string") {
        encoding = offset;
        length3 = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length3)) {
          length3 = length3 >>> 0;
          if (encoding === void 0)
            encoding = "utf8";
        } else {
          encoding = length3;
          length3 = void 0;
        }
      } else {
        throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
      }
      const remaining = this.length - offset;
      if (length3 === void 0 || length3 > remaining)
        length3 = remaining;
      if (string2.length > 0 && (length3 < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding)
        encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string2, offset, length3);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string2, offset, length3);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string2, offset, length3);
          case "base64":
            return base64Write(this, string2, offset, length3);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string2, offset, length3);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer2.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf2, start, end) {
      if (start === 0 && end === buf2.length) {
        return base642.fromByteArray(buf2);
      } else {
        return base642.fromByteArray(buf2.slice(start, end));
      }
    }
    function utf8Slice2(buf2, start, end) {
      end = Math.min(buf2.length, end);
      const res = [];
      let i = start;
      while (i < end) {
        const firstByte = buf2[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf2[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf2[i + 1];
              thirdByte = buf2[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf2[i + 1];
              thirdByte = buf2[i + 2];
              fourthByte = buf2[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray2(res);
    }
    var MAX_ARGUMENTS_LENGTH2 = 4096;
    function decodeCodePointsArray2(codePoints) {
      const len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH2) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH2));
      }
      return res;
    }
    function asciiSlice(buf2, start, end) {
      let ret = "";
      end = Math.min(buf2.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf2[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf2, start, end) {
      let ret = "";
      end = Math.min(buf2.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf2[i]);
      }
      return ret;
    }
    function hexSlice(buf2, start, end) {
      const len = buf2.length;
      if (!start || start < 0)
        start = 0;
      if (!end || end < 0 || end > len)
        end = len;
      let out = "";
      for (let i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf2[i]];
      }
      return out;
    }
    function utf16leSlice(buf2, start, end) {
      const bytes2 = buf2.slice(start, end);
      let res = "";
      for (let i = 0; i < bytes2.length - 1; i += 2) {
        res += String.fromCharCode(bytes2[i] + bytes2[i + 1] * 256);
      }
      return res;
    }
    Buffer2.prototype.slice = function slice2(start, end) {
      const len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0)
          start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0)
          end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start)
        end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer2.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length3) {
      if (offset % 1 !== 0 || offset < 0)
        throw new RangeError("offset is not uint");
      if (offset + ext > length3)
        throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      let val = this[offset + --byteLength2];
      let mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer2.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
      const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    });
    Buffer2.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    });
    Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let i = byteLength2;
      let mul = 1;
      let val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128))
        return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer2.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
    });
    Buffer2.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = (first << 24) + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
    });
    Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };
    Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };
    Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };
    Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };
    function checkInt(buf2, value, offset, ext, max, min) {
      if (!Buffer2.isBuffer(buf2))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min)
        throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf2.length)
        throw new RangeError("Index out of range");
    }
    Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let mul = 1;
      let i = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    function wrtBigUInt64LE(buf2, value, offset, min, max) {
      checkIntBI(value, min, max, buf2, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf2[offset++] = lo;
      lo = lo >> 8;
      buf2[offset++] = lo;
      lo = lo >> 8;
      buf2[offset++] = lo;
      lo = lo >> 8;
      buf2[offset++] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf2[offset++] = hi;
      hi = hi >> 8;
      buf2[offset++] = hi;
      hi = hi >> 8;
      buf2[offset++] = hi;
      hi = hi >> 8;
      buf2[offset++] = hi;
      return offset;
    }
    function wrtBigUInt64BE(buf2, value, offset, min, max) {
      checkIntBI(value, min, max, buf2, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf2[offset + 7] = lo;
      lo = lo >> 8;
      buf2[offset + 6] = lo;
      lo = lo >> 8;
      buf2[offset + 5] = lo;
      lo = lo >> 8;
      buf2[offset + 4] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf2[offset + 3] = hi;
      hi = hi >> 8;
      buf2[offset + 2] = hi;
      hi = hi >> 8;
      buf2[offset + 1] = hi;
      hi = hi >> 8;
      buf2[offset] = hi;
      return offset + 8;
    }
    Buffer2.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer2.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = 0;
      let mul = 1;
      let sub = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      let sub = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 127, -128);
      if (value < 0)
        value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };
    Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0)
        value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    Buffer2.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function checkIEEE754(buf2, value, offset, ext, max, min) {
      if (offset + ext > buf2.length)
        throw new RangeError("Index out of range");
      if (offset < 0)
        throw new RangeError("Index out of range");
    }
    function writeFloat(buf2, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf2, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
      }
      ieee754.write(buf2, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf2, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf2, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
      }
      ieee754.write(buf2, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer2.isBuffer(target))
        throw new TypeError("argument should be a Buffer");
      if (!start)
        start = 0;
      if (!end && end !== 0)
        end = this.length;
      if (targetStart >= target.length)
        targetStart = target.length;
      if (!targetStart)
        targetStart = 0;
      if (end > 0 && end < start)
        end = start;
      if (end === start)
        return 0;
      if (target.length === 0 || this.length === 0)
        return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length)
        throw new RangeError("Index out of range");
      if (end < 0)
        throw new RangeError("sourceEnd out of bounds");
      if (end > this.length)
        end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
      }
      return len;
    };
    Buffer2.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          const code3 = val.charCodeAt(0);
          if (encoding === "utf8" && code3 < 128 || encoding === "latin1") {
            val = code3;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val)
        val = 0;
      let i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        const bytes2 = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
        const len = bytes2.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes2[i % len];
        }
      }
      return this;
    };
    var errors = {};
    function E(sym, getMessage, Base) {
      errors[sym] = class NodeError extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      };
    }
    E("ERR_BUFFER_OUT_OF_BOUNDS", function(name3) {
      if (name3) {
        return `${name3} is outside of buffer bounds`;
      }
      return "Attempt to access memory outside buffer bounds";
    }, RangeError);
    E("ERR_INVALID_ARG_TYPE", function(name3, actual) {
      return `The "${name3}" argument must be of type number. Received type ${typeof actual}`;
    }, TypeError);
    E("ERR_OUT_OF_RANGE", function(str, range, input) {
      let msg = `The value of "${str}" is out of range.`;
      let received = input;
      if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
        received = addNumericalSeparator(String(input));
      } else if (typeof input === "bigint") {
        received = String(input);
        if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
          received = addNumericalSeparator(received);
        }
        received += "n";
      }
      msg += ` It must be ${range}. Received ${received}`;
      return msg;
    }, RangeError);
    function addNumericalSeparator(val) {
      let res = "";
      let i = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i >= start + 4; i -= 3) {
        res = `_${val.slice(i - 3, i)}${res}`;
      }
      return `${val.slice(0, i)}${res}`;
    }
    function checkBounds(buf2, offset, byteLength2) {
      validateNumber(offset, "offset");
      if (buf2[offset] === void 0 || buf2[offset + byteLength2] === void 0) {
        boundsError(offset, buf2.length - (byteLength2 + 1));
      }
    }
    function checkIntBI(value, min, max, buf2, offset, byteLength2) {
      if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength2 > 3) {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
          } else {
            range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
          }
        } else {
          range = `>= ${min}${n} and <= ${max}${n}`;
        }
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
      }
      checkBounds(buf2, offset, byteLength2);
    }
    function validateNumber(value, name3) {
      if (typeof value !== "number") {
        throw new errors.ERR_INVALID_ARG_TYPE(name3, "number", value);
      }
    }
    function boundsError(value, length3, type7) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type7);
        throw new errors.ERR_OUT_OF_RANGE(type7 || "offset", "an integer", value);
      }
      if (length3 < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors.ERR_OUT_OF_RANGE(type7 || "offset", `>= ${type7 ? 1 : 0} and <= ${length3}`, value);
    }
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2)
        return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes4(string2, units) {
      units = units || Infinity;
      let codePoint;
      const length3 = string2.length;
      let leadSurrogate = null;
      const bytes2 = [];
      for (let i = 0; i < length3; ++i) {
        codePoint = string2.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1)
                bytes2.push(239, 191, 189);
              continue;
            } else if (i + 1 === length3) {
              if ((units -= 3) > -1)
                bytes2.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1)
              bytes2.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1)
            bytes2.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0)
            break;
          bytes2.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0)
            break;
          bytes2.push(codePoint >> 6 | 192, codePoint & 63 | 128);
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0)
            break;
          bytes2.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0)
            break;
          bytes2.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes2;
    }
    function asciiToBytes(str) {
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      let c, hi, lo;
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0)
          break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base642.toByteArray(base64clean(str));
    }
    function blitBuffer(src3, dst, offset, length3) {
      let i;
      for (i = 0; i < length3; ++i) {
        if (i + offset >= dst.length || i >= src3.length)
          break;
        dst[i + offset] = src3[i];
      }
      return i;
    }
    function isInstance(obj, type7) {
      return obj instanceof type7 || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type7.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    var hexSliceLookupTable = function() {
      const alphabet2 = "0123456789abcdef";
      const table = new Array(256);
      for (let i = 0; i < 16; ++i) {
        const i16 = i * 16;
        for (let j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet2[i] + alphabet2[j];
        }
      }
      return table;
    }();
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
  }
});

// node_modules/process/browser.js
var require_browser = __commonJS({
  "node_modules/process/browser.js"(exports2, module2) {
    init_node_globals();
    var process2 = module2.exports = {};
    var cachedSetTimeout;
    var cachedClearTimeout;
    function defaultSetTimout() {
      throw new Error("setTimeout has not been defined");
    }
    function defaultClearTimeout() {
      throw new Error("clearTimeout has not been defined");
    }
    (function() {
      try {
        if (typeof setTimeout === "function") {
          cachedSetTimeout = setTimeout;
        } else {
          cachedSetTimeout = defaultSetTimout;
        }
      } catch (e) {
        cachedSetTimeout = defaultSetTimout;
      }
      try {
        if (typeof clearTimeout === "function") {
          cachedClearTimeout = clearTimeout;
        } else {
          cachedClearTimeout = defaultClearTimeout;
        }
      } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
      }
    })();
    function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
        return setTimeout(fun, 0);
      }
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
      }
      try {
        return cachedSetTimeout(fun, 0);
      } catch (e) {
        try {
          return cachedSetTimeout.call(null, fun, 0);
        } catch (e2) {
          return cachedSetTimeout.call(this, fun, 0);
        }
      }
    }
    function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
        return clearTimeout(marker);
      }
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
      }
      try {
        return cachedClearTimeout(marker);
      } catch (e) {
        try {
          return cachedClearTimeout.call(null, marker);
        } catch (e2) {
          return cachedClearTimeout.call(this, marker);
        }
      }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;
    function cleanUpNextTick() {
      if (!draining || !currentQueue) {
        return;
      }
      draining = false;
      if (currentQueue.length) {
        queue = currentQueue.concat(queue);
      } else {
        queueIndex = -1;
      }
      if (queue.length) {
        drainQueue();
      }
    }
    function drainQueue() {
      if (draining) {
        return;
      }
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;
      var len = queue.length;
      while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
          if (currentQueue) {
            currentQueue[queueIndex].run();
          }
        }
        queueIndex = -1;
        len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
    }
    process2.nextTick = function(fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
          args[i - 1] = arguments[i];
        }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
      }
    };
    function Item(fun, array) {
      this.fun = fun;
      this.array = array;
    }
    Item.prototype.run = function() {
      this.fun.apply(null, this.array);
    };
    process2.title = "browser";
    process2.browser = true;
    process2.env = {};
    process2.argv = [];
    process2.version = "";
    process2.versions = {};
    function noop() {
    }
    process2.on = noop;
    process2.addListener = noop;
    process2.once = noop;
    process2.off = noop;
    process2.removeListener = noop;
    process2.removeAllListeners = noop;
    process2.emit = noop;
    process2.prependListener = noop;
    process2.prependOnceListener = noop;
    process2.listeners = function(name3) {
      return [];
    };
    process2.binding = function(name3) {
      throw new Error("process.binding is not supported");
    };
    process2.cwd = function() {
      return "/";
    };
    process2.chdir = function(dir) {
      throw new Error("process.chdir is not supported");
    };
    process2.umask = function() {
      return 0;
    };
  }
});

// src/node-globals.js
var Buffer, process, global;
var init_node_globals = __esm({
  "src/node-globals.js"() {
    Buffer = require_buffer().Buffer;
    process = require_browser();
    global = typeof global !== "undefined" ? global : typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
    if (globalThis && globalThis.process && globalThis.process.env)
      globalThis.process.env.LIBP2P_FORCE_PNET = false;
  }
});

// node_modules/events/events.js
var require_events = __commonJS({
  "node_modules/events/events.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    var R = typeof Reflect === "object" ? Reflect : null;
    var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    };
    var ReflectOwnKeys;
    if (R && typeof R.ownKeys === "function") {
      ReflectOwnKeys = R.ownKeys;
    } else if (Object.getOwnPropertySymbols) {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
      };
    } else {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target);
      };
    }
    function ProcessEmitWarning(warning) {
      if (console && console.warn)
        console.warn(warning);
    }
    var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
      return value !== value;
    };
    function EventEmitter4() {
      EventEmitter4.init.call(this);
    }
    module2.exports = EventEmitter4;
    module2.exports.once = once;
    EventEmitter4.EventEmitter = EventEmitter4;
    EventEmitter4.prototype._events = void 0;
    EventEmitter4.prototype._eventsCount = 0;
    EventEmitter4.prototype._maxListeners = void 0;
    var defaultMaxListeners = 10;
    function checkListener(listener) {
      if (typeof listener !== "function") {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
    }
    Object.defineProperty(EventEmitter4, "defaultMaxListeners", {
      enumerable: true,
      get: function() {
        return defaultMaxListeners;
      },
      set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
        }
        defaultMaxListeners = arg;
      }
    });
    EventEmitter4.init = function() {
      if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter4.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
      }
      this._maxListeners = n;
      return this;
    };
    function _getMaxListeners(that) {
      if (that._maxListeners === void 0)
        return EventEmitter4.defaultMaxListeners;
      return that._maxListeners;
    }
    EventEmitter4.prototype.getMaxListeners = function getMaxListeners() {
      return _getMaxListeners(this);
    };
    EventEmitter4.prototype.emit = function emit(type7) {
      var args = [];
      for (var i = 1; i < arguments.length; i++)
        args.push(arguments[i]);
      var doError = type7 === "error";
      var events = this._events;
      if (events !== void 0)
        doError = doError && events.error === void 0;
      else if (!doError)
        return false;
      if (doError) {
        var er;
        if (args.length > 0)
          er = args[0];
        if (er instanceof Error) {
          throw er;
        }
        var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
        err.context = er;
        throw err;
      }
      var handler = events[type7];
      if (handler === void 0)
        return false;
      if (typeof handler === "function") {
        ReflectApply(handler, this, args);
      } else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          ReflectApply(listeners[i], this, args);
      }
      return true;
    };
    function _addListener(target, type7, listener, prepend) {
      var m;
      var events;
      var existing;
      checkListener(listener);
      events = target._events;
      if (events === void 0) {
        events = target._events = /* @__PURE__ */ Object.create(null);
        target._eventsCount = 0;
      } else {
        if (events.newListener !== void 0) {
          target.emit("newListener", type7, listener.listener ? listener.listener : listener);
          events = target._events;
        }
        existing = events[type7];
      }
      if (existing === void 0) {
        existing = events[type7] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === "function") {
          existing = events[type7] = prepend ? [listener, existing] : [existing, listener];
        } else if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
          existing.warned = true;
          var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type7) + " listeners added. Use emitter.setMaxListeners() to increase limit");
          w.name = "MaxListenersExceededWarning";
          w.emitter = target;
          w.type = type7;
          w.count = existing.length;
          ProcessEmitWarning(w);
        }
      }
      return target;
    }
    EventEmitter4.prototype.addListener = function addListener(type7, listener) {
      return _addListener(this, type7, listener, false);
    };
    EventEmitter4.prototype.on = EventEmitter4.prototype.addListener;
    EventEmitter4.prototype.prependListener = function prependListener(type7, listener) {
      return _addListener(this, type7, listener, true);
    };
    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0)
          return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
      }
    }
    function _onceWrap(target, type7, listener) {
      var state = { fired: false, wrapFn: void 0, target, type: type7, listener };
      var wrapped = onceWrapper.bind(state);
      wrapped.listener = listener;
      state.wrapFn = wrapped;
      return wrapped;
    }
    EventEmitter4.prototype.once = function once2(type7, listener) {
      checkListener(listener);
      this.on(type7, _onceWrap(this, type7, listener));
      return this;
    };
    EventEmitter4.prototype.prependOnceListener = function prependOnceListener(type7, listener) {
      checkListener(listener);
      this.prependListener(type7, _onceWrap(this, type7, listener));
      return this;
    };
    EventEmitter4.prototype.removeListener = function removeListener(type7, listener) {
      var list, events, position, i, originalListener;
      checkListener(listener);
      events = this._events;
      if (events === void 0)
        return this;
      list = events[type7];
      if (list === void 0)
        return this;
      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = /* @__PURE__ */ Object.create(null);
        else {
          delete events[type7];
          if (events.removeListener)
            this.emit("removeListener", type7, list.listener || listener);
        }
      } else if (typeof list !== "function") {
        position = -1;
        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }
        if (position < 0)
          return this;
        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }
        if (list.length === 1)
          events[type7] = list[0];
        if (events.removeListener !== void 0)
          this.emit("removeListener", type7, originalListener || listener);
      }
      return this;
    };
    EventEmitter4.prototype.off = EventEmitter4.prototype.removeListener;
    EventEmitter4.prototype.removeAllListeners = function removeAllListeners(type7) {
      var listeners, events, i;
      events = this._events;
      if (events === void 0)
        return this;
      if (events.removeListener === void 0) {
        if (arguments.length === 0) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        } else if (events[type7] !== void 0) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else
            delete events[type7];
        }
        return this;
      }
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === "removeListener")
            continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
        return this;
      }
      listeners = events[type7];
      if (typeof listeners === "function") {
        this.removeListener(type7, listeners);
      } else if (listeners !== void 0) {
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type7, listeners[i]);
        }
      }
      return this;
    };
    function _listeners(target, type7, unwrap) {
      var events = target._events;
      if (events === void 0)
        return [];
      var evlistener = events[type7];
      if (evlistener === void 0)
        return [];
      if (typeof evlistener === "function")
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];
      return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }
    EventEmitter4.prototype.listeners = function listeners(type7) {
      return _listeners(this, type7, true);
    };
    EventEmitter4.prototype.rawListeners = function rawListeners(type7) {
      return _listeners(this, type7, false);
    };
    EventEmitter4.listenerCount = function(emitter, type7) {
      if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type7);
      } else {
        return listenerCount.call(emitter, type7);
      }
    };
    EventEmitter4.prototype.listenerCount = listenerCount;
    function listenerCount(type7) {
      var events = this._events;
      if (events !== void 0) {
        var evlistener = events[type7];
        if (typeof evlistener === "function") {
          return 1;
        } else if (evlistener !== void 0) {
          return evlistener.length;
        }
      }
      return 0;
    }
    EventEmitter4.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
    };
    function arrayClone(arr, n) {
      var copy = new Array(n);
      for (var i = 0; i < n; ++i)
        copy[i] = arr[i];
      return copy;
    }
    function spliceOne(list, index) {
      for (; index + 1 < list.length; index++)
        list[index] = list[index + 1];
      list.pop();
    }
    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
      }
      return ret;
    }
    function once(emitter, name3) {
      return new Promise(function(resolve, reject) {
        function errorListener(err) {
          emitter.removeListener(name3, resolver);
          reject(err);
        }
        function resolver() {
          if (typeof emitter.removeListener === "function") {
            emitter.removeListener("error", errorListener);
          }
          resolve([].slice.call(arguments));
        }
        ;
        eventTargetAgnosticAddListener(emitter, name3, resolver, { once: true });
        if (name3 !== "error") {
          addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
        }
      });
    }
    function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
      if (typeof emitter.on === "function") {
        eventTargetAgnosticAddListener(emitter, "error", handler, flags);
      }
    }
    function eventTargetAgnosticAddListener(emitter, name3, listener, flags) {
      if (typeof emitter.on === "function") {
        if (flags.once) {
          emitter.once(name3, listener);
        } else {
          emitter.on(name3, listener);
        }
      } else if (typeof emitter.addEventListener === "function") {
        emitter.addEventListener(name3, function wrapListener(arg) {
          if (flags.once) {
            emitter.removeEventListener(name3, wrapListener);
          }
          listener(arg);
        });
      } else {
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
      }
    }
  }
});

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/eventemitter3/index.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events2() {
    }
    if (Object.create) {
      Events2.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events2().__proto__)
        prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt])
        emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn)
        emitter._events[evt].push(listener);
      else
        emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0)
        emitter._events = new Events2();
      else
        delete emitter._events[evt];
    }
    function EventEmitter4() {
      this._events = new Events2();
      this._eventsCount = 0;
    }
    EventEmitter4.prototype.eventNames = function eventNames() {
      var names2 = [], events, name3;
      if (this._eventsCount === 0)
        return names2;
      for (name3 in events = this._events) {
        if (has.call(events, name3))
          names2.push(prefix ? name3.slice(1) : name3);
      }
      if (Object.getOwnPropertySymbols) {
        return names2.concat(Object.getOwnPropertySymbols(events));
      }
      return names2;
    };
    EventEmitter4.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers)
        return [];
      if (handlers.fn)
        return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter4.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners)
        return 0;
      if (listeners.fn)
        return 1;
      return listeners.length;
    };
    EventEmitter4.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once)
          this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length3 = listeners.length, j;
        for (i = 0; i < length3; i++) {
          if (listeners[i].once)
            this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args)
                for (j = 1, args = new Array(len - 1); j < len; j++) {
                  args[j - 1] = arguments[j];
                }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter4.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter4.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter4.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length3 = listeners.length; i < length3; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length)
          this._events[evt] = events.length === 1 ? events[0] : events;
        else
          clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter4.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt])
          clearEvent(this, evt);
      } else {
        this._events = new Events2();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter4.prototype.off = EventEmitter4.prototype.removeListener;
    EventEmitter4.prototype.addListener = EventEmitter4.prototype.on;
    EventEmitter4.prefixed = prefix;
    EventEmitter4.EventEmitter = EventEmitter4;
    if (typeof module2 !== "undefined") {
      module2.exports = EventEmitter4;
    }
  }
});

// node_modules/retimer/time-browser.js
var require_time_browser = __commonJS({
  "node_modules/retimer/time-browser.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    module2.exports = function getTime() {
      return Date.now();
    };
  }
});

// node_modules/retimer/retimer.js
var require_retimer = __commonJS({
  "node_modules/retimer/retimer.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    var getTime = require_time_browser();
    var Retimer = class {
      constructor(callback, timeout, args) {
        const that = this;
        this._started = getTime();
        this._rescheduled = 0;
        this._scheduled = timeout;
        this._args = args;
        this._triggered = false;
        this._timerWrapper = () => {
          if (that._rescheduled > 0) {
            that._scheduled = that._rescheduled - (getTime() - that._started);
            that._schedule(that._scheduled);
          } else {
            that._triggered = true;
            callback.apply(null, that._args);
          }
        };
        this._timer = setTimeout(this._timerWrapper, timeout);
      }
      reschedule(timeout) {
        if (!timeout) {
          timeout = this._scheduled;
        }
        const now = getTime();
        if (now + timeout - (this._started + this._scheduled) < 0) {
          clearTimeout(this._timer);
          this._schedule(timeout);
        } else if (!this._triggered) {
          this._started = now;
          this._rescheduled = timeout;
        } else {
          this._schedule(timeout);
        }
      }
      _schedule(timeout) {
        this._triggered = false;
        this._started = getTime();
        this._rescheduled = 0;
        this._scheduled = timeout;
        this._timer = setTimeout(this._timerWrapper, timeout);
      }
      clear() {
        clearTimeout(this._timer);
      }
    };
    function retimer() {
      if (typeof arguments[0] !== "function") {
        throw new Error("callback needed");
      }
      if (typeof arguments[1] !== "number") {
        throw new Error("timeout needed");
      }
      let args;
      if (arguments.length > 0) {
        args = new Array(arguments.length - 2);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 2];
        }
      }
      return new Retimer(arguments[0], arguments[1], args);
    }
    module2.exports = retimer;
  }
});

// node_modules/timeout-abort-controller/index.js
var require_timeout_abort_controller = __commonJS({
  "node_modules/timeout-abort-controller/index.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    var { AbortController } = globalThis;
    var retimer = require_retimer();
    var TimeoutController2 = class extends AbortController {
      constructor(ms) {
        super();
        this._ms = ms;
        this._timer = retimer(() => this.abort(), ms);
        Object.setPrototypeOf(this, TimeoutController2.prototype);
      }
      abort() {
        this._timer.clear();
        return super.abort();
      }
      clear() {
        this._timer.clear();
      }
      reset() {
        this._timer.clear();
        this._timer = retimer(() => this.abort(), this._ms);
      }
    };
    module2.exports = {
      TimeoutController: TimeoutController2
    };
  }
});

// node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "node_modules/inherits/inherits_browser.js"(exports2, module2) {
    init_node_globals();
    if (typeof Object.create === "function") {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  }
});

// node_modules/lru/index.js
var require_lru = __commonJS({
  "node_modules/lru/index.js"(exports2, module2) {
    init_node_globals();
    var events = require_events();
    var inherits = require_inherits_browser();
    module2.exports = LRU3;
    function LRU3(opts) {
      if (!(this instanceof LRU3))
        return new LRU3(opts);
      if (typeof opts === "number")
        opts = { max: opts };
      if (!opts)
        opts = {};
      events.EventEmitter.call(this);
      this.cache = {};
      this.head = this.tail = null;
      this.length = 0;
      this.max = opts.max || 1e3;
      this.maxAge = opts.maxAge || 0;
    }
    inherits(LRU3, events.EventEmitter);
    Object.defineProperty(LRU3.prototype, "keys", {
      get: function() {
        return Object.keys(this.cache);
      }
    });
    LRU3.prototype.clear = function() {
      this.cache = {};
      this.head = this.tail = null;
      this.length = 0;
    };
    LRU3.prototype.remove = function(key) {
      if (typeof key !== "string")
        key = "" + key;
      if (!this.cache.hasOwnProperty(key))
        return;
      var element = this.cache[key];
      delete this.cache[key];
      this._unlink(key, element.prev, element.next);
      return element.value;
    };
    LRU3.prototype._unlink = function(key, prev, next) {
      this.length--;
      if (this.length === 0) {
        this.head = this.tail = null;
      } else {
        if (this.head === key) {
          this.head = prev;
          this.cache[this.head].next = null;
        } else if (this.tail === key) {
          this.tail = next;
          this.cache[this.tail].prev = null;
        } else {
          this.cache[prev].next = next;
          this.cache[next].prev = prev;
        }
      }
    };
    LRU3.prototype.peek = function(key) {
      if (!this.cache.hasOwnProperty(key))
        return;
      var element = this.cache[key];
      if (!this._checkAge(key, element))
        return;
      return element.value;
    };
    LRU3.prototype.set = function(key, value) {
      if (typeof key !== "string")
        key = "" + key;
      var element;
      if (this.cache.hasOwnProperty(key)) {
        element = this.cache[key];
        element.value = value;
        if (this.maxAge)
          element.modified = Date.now();
        if (key === this.head)
          return value;
        this._unlink(key, element.prev, element.next);
      } else {
        element = { value, modified: 0, next: null, prev: null };
        if (this.maxAge)
          element.modified = Date.now();
        this.cache[key] = element;
        if (this.length === this.max)
          this.evict();
      }
      this.length++;
      element.next = null;
      element.prev = this.head;
      if (this.head)
        this.cache[this.head].next = key;
      this.head = key;
      if (!this.tail)
        this.tail = key;
      return value;
    };
    LRU3.prototype._checkAge = function(key, element) {
      if (this.maxAge && Date.now() - element.modified > this.maxAge) {
        this.remove(key);
        this.emit("evict", { key, value: element.value });
        return false;
      }
      return true;
    };
    LRU3.prototype.get = function(key) {
      if (typeof key !== "string")
        key = "" + key;
      if (!this.cache.hasOwnProperty(key))
        return;
      var element = this.cache[key];
      if (!this._checkAge(key, element))
        return;
      if (this.head !== key) {
        if (key === this.tail) {
          this.tail = element.next;
          this.cache[this.tail].prev = null;
        } else {
          this.cache[element.prev].next = element.next;
        }
        this.cache[element.next].prev = element.prev;
        this.cache[this.head].next = key;
        element.prev = this.head;
        element.next = null;
        this.head = key;
      }
      return element.value;
    };
    LRU3.prototype.evict = function() {
      if (!this.tail)
        return;
      var key = this.tail;
      var value = this.remove(this.tail);
      this.emit("evict", { key, value });
    };
  }
});

// node_modules/level-supports/index.js
var require_level_supports = __commonJS({
  "node_modules/level-supports/index.js"(exports2) {
    "use strict";
    init_node_globals();
    exports2.supports = function supports(...manifests) {
      const manifest = manifests.reduce((acc, m) => Object.assign(acc, m), {});
      return Object.assign(manifest, {
        snapshots: manifest.snapshots || false,
        permanence: manifest.permanence || false,
        seek: manifest.seek || false,
        clear: manifest.clear || false,
        getMany: manifest.getMany || false,
        keyIterator: manifest.keyIterator || false,
        valueIterator: manifest.valueIterator || false,
        iteratorNextv: manifest.iteratorNextv || false,
        iteratorAll: manifest.iteratorAll || false,
        status: manifest.status || false,
        createIfMissing: manifest.createIfMissing || false,
        errorIfExists: manifest.errorIfExists || false,
        deferredOpen: manifest.deferredOpen || false,
        promises: manifest.promises || false,
        streams: manifest.streams || false,
        encodings: Object.assign({}, manifest.encodings),
        events: Object.assign({}, manifest.events),
        additionalMethods: Object.assign({}, manifest.additionalMethods)
      });
    };
  }
});

// node_modules/module-error/index.js
var require_module_error = __commonJS({
  "node_modules/module-error/index.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    module2.exports = class ModuleError extends Error {
      constructor(message2, options) {
        super(message2 || "");
        if (typeof options === "object" && options !== null) {
          if (options.code)
            this.code = String(options.code);
          if (options.expected)
            this.expected = true;
          if (options.transient)
            this.transient = true;
          if (options.cause)
            this.cause = options.cause;
        }
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        }
      }
    };
  }
});

// node_modules/level-transcoder/lib/text-endec.js
var require_text_endec = __commonJS({
  "node_modules/level-transcoder/lib/text-endec.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    var lazy = null;
    module2.exports = function() {
      if (lazy === null) {
        lazy = {
          textEncoder: new TextEncoder(),
          textDecoder: new TextDecoder()
        };
      }
      return lazy;
    };
  }
});

// node_modules/level-transcoder/lib/encoding.js
var require_encoding = __commonJS({
  "node_modules/level-transcoder/lib/encoding.js"(exports2) {
    "use strict";
    init_node_globals();
    var ModuleError = require_module_error();
    var formats = /* @__PURE__ */ new Set(["buffer", "view", "utf8"]);
    var Encoding = class {
      constructor(options) {
        this.encode = options.encode || this.encode;
        this.decode = options.decode || this.decode;
        this.name = options.name || this.name;
        this.format = options.format || this.format;
        if (typeof this.encode !== "function") {
          throw new TypeError("The 'encode' property must be a function");
        }
        if (typeof this.decode !== "function") {
          throw new TypeError("The 'decode' property must be a function");
        }
        this.encode = this.encode.bind(this);
        this.decode = this.decode.bind(this);
        if (typeof this.name !== "string" || this.name === "") {
          throw new TypeError("The 'name' property must be a string");
        }
        if (typeof this.format !== "string" || !formats.has(this.format)) {
          throw new TypeError("The 'format' property must be one of 'buffer', 'view', 'utf8'");
        }
        if (options.createViewTranscoder) {
          this.createViewTranscoder = options.createViewTranscoder;
        }
        if (options.createBufferTranscoder) {
          this.createBufferTranscoder = options.createBufferTranscoder;
        }
        if (options.createUTF8Transcoder) {
          this.createUTF8Transcoder = options.createUTF8Transcoder;
        }
      }
      get commonName() {
        return this.name.split("+")[0];
      }
      createBufferTranscoder() {
        throw new ModuleError(`Encoding '${this.name}' cannot be transcoded to 'buffer'`, {
          code: "LEVEL_ENCODING_NOT_SUPPORTED"
        });
      }
      createViewTranscoder() {
        throw new ModuleError(`Encoding '${this.name}' cannot be transcoded to 'view'`, {
          code: "LEVEL_ENCODING_NOT_SUPPORTED"
        });
      }
      createUTF8Transcoder() {
        throw new ModuleError(`Encoding '${this.name}' cannot be transcoded to 'utf8'`, {
          code: "LEVEL_ENCODING_NOT_SUPPORTED"
        });
      }
    };
    exports2.Encoding = Encoding;
  }
});

// node_modules/level-transcoder/lib/formats.js
var require_formats = __commonJS({
  "node_modules/level-transcoder/lib/formats.js"(exports2) {
    "use strict";
    init_node_globals();
    var { Buffer: Buffer2 } = require_buffer() || {};
    var { Encoding } = require_encoding();
    var textEndec = require_text_endec();
    var BufferFormat = class extends Encoding {
      constructor(options) {
        super({ ...options, format: "buffer" });
      }
      createViewTranscoder() {
        return new ViewFormat({
          encode: this.encode,
          decode: (data) => this.decode(Buffer2.from(data.buffer, data.byteOffset, data.byteLength)),
          name: `${this.name}+view`
        });
      }
      createBufferTranscoder() {
        return this;
      }
    };
    var ViewFormat = class extends Encoding {
      constructor(options) {
        super({ ...options, format: "view" });
      }
      createBufferTranscoder() {
        return new BufferFormat({
          encode: (data) => {
            const view = this.encode(data);
            return Buffer2.from(view.buffer, view.byteOffset, view.byteLength);
          },
          decode: this.decode,
          name: `${this.name}+buffer`
        });
      }
      createViewTranscoder() {
        return this;
      }
    };
    var UTF8Format = class extends Encoding {
      constructor(options) {
        super({ ...options, format: "utf8" });
      }
      createBufferTranscoder() {
        return new BufferFormat({
          encode: (data) => Buffer2.from(this.encode(data), "utf8"),
          decode: (data) => this.decode(data.toString("utf8")),
          name: `${this.name}+buffer`
        });
      }
      createViewTranscoder() {
        const { textEncoder: textEncoder3, textDecoder: textDecoder3 } = textEndec();
        return new ViewFormat({
          encode: (data) => textEncoder3.encode(this.encode(data)),
          decode: (data) => this.decode(textDecoder3.decode(data)),
          name: `${this.name}+view`
        });
      }
      createUTF8Transcoder() {
        return this;
      }
    };
    exports2.BufferFormat = BufferFormat;
    exports2.ViewFormat = ViewFormat;
    exports2.UTF8Format = UTF8Format;
  }
});

// node_modules/level-transcoder/lib/encodings.js
var require_encodings = __commonJS({
  "node_modules/level-transcoder/lib/encodings.js"(exports2) {
    "use strict";
    init_node_globals();
    var { Buffer: Buffer2 } = require_buffer() || { Buffer: { isBuffer: () => false } };
    var { textEncoder: textEncoder3, textDecoder: textDecoder3 } = require_text_endec()();
    var { BufferFormat, ViewFormat, UTF8Format } = require_formats();
    var identity3 = (v) => v;
    exports2.utf8 = new UTF8Format({
      encode: function(data) {
        return Buffer2.isBuffer(data) ? data.toString("utf8") : ArrayBuffer.isView(data) ? textDecoder3.decode(data) : String(data);
      },
      decode: identity3,
      name: "utf8",
      createViewTranscoder() {
        return new ViewFormat({
          encode: function(data) {
            return ArrayBuffer.isView(data) ? data : textEncoder3.encode(data);
          },
          decode: function(data) {
            return textDecoder3.decode(data);
          },
          name: `${this.name}+view`
        });
      },
      createBufferTranscoder() {
        return new BufferFormat({
          encode: function(data) {
            return Buffer2.isBuffer(data) ? data : ArrayBuffer.isView(data) ? Buffer2.from(data.buffer, data.byteOffset, data.byteLength) : Buffer2.from(String(data), "utf8");
          },
          decode: function(data) {
            return data.toString("utf8");
          },
          name: `${this.name}+buffer`
        });
      }
    });
    exports2.json = new UTF8Format({
      encode: JSON.stringify,
      decode: JSON.parse,
      name: "json"
    });
    exports2.buffer = new BufferFormat({
      encode: function(data) {
        return Buffer2.isBuffer(data) ? data : ArrayBuffer.isView(data) ? Buffer2.from(data.buffer, data.byteOffset, data.byteLength) : Buffer2.from(String(data), "utf8");
      },
      decode: identity3,
      name: "buffer",
      createViewTranscoder() {
        return new ViewFormat({
          encode: function(data) {
            return ArrayBuffer.isView(data) ? data : Buffer2.from(String(data), "utf8");
          },
          decode: function(data) {
            return Buffer2.from(data.buffer, data.byteOffset, data.byteLength);
          },
          name: `${this.name}+view`
        });
      }
    });
    exports2.view = new ViewFormat({
      encode: function(data) {
        return ArrayBuffer.isView(data) ? data : textEncoder3.encode(data);
      },
      decode: identity3,
      name: "view",
      createBufferTranscoder() {
        return new BufferFormat({
          encode: function(data) {
            return Buffer2.isBuffer(data) ? data : ArrayBuffer.isView(data) ? Buffer2.from(data.buffer, data.byteOffset, data.byteLength) : Buffer2.from(String(data), "utf8");
          },
          decode: identity3,
          name: `${this.name}+buffer`
        });
      }
    });
    exports2.hex = new BufferFormat({
      encode: function(data) {
        return Buffer2.isBuffer(data) ? data : Buffer2.from(String(data), "hex");
      },
      decode: function(buffer2) {
        return buffer2.toString("hex");
      },
      name: "hex"
    });
    exports2.base64 = new BufferFormat({
      encode: function(data) {
        return Buffer2.isBuffer(data) ? data : Buffer2.from(String(data), "base64");
      },
      decode: function(buffer2) {
        return buffer2.toString("base64");
      },
      name: "base64"
    });
  }
});

// node_modules/level-transcoder/index.js
var require_level_transcoder = __commonJS({
  "node_modules/level-transcoder/index.js"(exports2) {
    "use strict";
    init_node_globals();
    var ModuleError = require_module_error();
    var encodings = require_encodings();
    var { Encoding } = require_encoding();
    var { BufferFormat, ViewFormat, UTF8Format } = require_formats();
    var kFormats = Symbol("formats");
    var kEncodings = Symbol("encodings");
    var validFormats = /* @__PURE__ */ new Set(["buffer", "view", "utf8"]);
    var Transcoder = class {
      constructor(formats) {
        if (!Array.isArray(formats)) {
          throw new TypeError("The first argument 'formats' must be an array");
        } else if (!formats.every((f) => validFormats.has(f))) {
          throw new TypeError("Format must be one of 'buffer', 'view', 'utf8'");
        }
        this[kEncodings] = /* @__PURE__ */ new Map();
        this[kFormats] = new Set(formats);
        for (const k in encodings) {
          try {
            this.encoding(k);
          } catch (err) {
            if (err.code !== "LEVEL_ENCODING_NOT_SUPPORTED")
              throw err;
          }
        }
      }
      encodings() {
        return Array.from(new Set(this[kEncodings].values()));
      }
      encoding(encoding) {
        let resolved = this[kEncodings].get(encoding);
        if (resolved === void 0) {
          if (typeof encoding === "string" && encoding !== "") {
            resolved = lookup[encoding];
            if (!resolved) {
              throw new ModuleError(`Encoding '${encoding}' is not found`, {
                code: "LEVEL_ENCODING_NOT_FOUND"
              });
            }
          } else if (typeof encoding !== "object" || encoding === null) {
            throw new TypeError("First argument 'encoding' must be a string or object");
          } else {
            resolved = from4(encoding);
          }
          const { name: name3, format: format3 } = resolved;
          if (!this[kFormats].has(format3)) {
            if (this[kFormats].has("view")) {
              resolved = resolved.createViewTranscoder();
            } else if (this[kFormats].has("buffer")) {
              resolved = resolved.createBufferTranscoder();
            } else if (this[kFormats].has("utf8")) {
              resolved = resolved.createUTF8Transcoder();
            } else {
              throw new ModuleError(`Encoding '${name3}' cannot be transcoded`, {
                code: "LEVEL_ENCODING_NOT_SUPPORTED"
              });
            }
          }
          for (const k of [encoding, name3, resolved.name, resolved.commonName]) {
            this[kEncodings].set(k, resolved);
          }
        }
        return resolved;
      }
    };
    exports2.Transcoder = Transcoder;
    function from4(options) {
      if (options instanceof Encoding) {
        return options;
      }
      const maybeType = "type" in options && typeof options.type === "string" ? options.type : void 0;
      const name3 = options.name || maybeType || `anonymous-${anonymousCount++}`;
      switch (detectFormat(options)) {
        case "view":
          return new ViewFormat({ ...options, name: name3 });
        case "utf8":
          return new UTF8Format({ ...options, name: name3 });
        case "buffer":
          return new BufferFormat({ ...options, name: name3 });
        default: {
          throw new TypeError("Format must be one of 'buffer', 'view', 'utf8'");
        }
      }
    }
    function detectFormat(options) {
      if ("format" in options && options.format !== void 0) {
        return options.format;
      } else if ("buffer" in options && typeof options.buffer === "boolean") {
        return options.buffer ? "buffer" : "utf8";
      } else if ("code" in options && Number.isInteger(options.code)) {
        return "view";
      } else {
        return "buffer";
      }
    }
    var aliases = {
      binary: encodings.buffer,
      "utf-8": encodings.utf8
    };
    var lookup = {
      ...encodings,
      ...aliases
    };
    var anonymousCount = 0;
  }
});

// node_modules/catering/next-tick-browser.js
var require_next_tick_browser = __commonJS({
  "node_modules/catering/next-tick-browser.js"(exports2, module2) {
    init_node_globals();
    module2.exports = typeof queueMicrotask === "function" ? queueMicrotask : (fn) => Promise.resolve().then(fn);
  }
});

// node_modules/catering/index.js
var require_catering = __commonJS({
  "node_modules/catering/index.js"(exports2) {
    "use strict";
    init_node_globals();
    var nextTick = require_next_tick_browser();
    exports2.fromCallback = function(callback, symbol) {
      if (callback === void 0) {
        var promise = new Promise(function(resolve, reject) {
          callback = function(err, res) {
            if (err)
              reject(err);
            else
              resolve(res);
          };
        });
        callback[symbol !== void 0 ? symbol : "promise"] = promise;
      } else if (typeof callback !== "function") {
        throw new TypeError("Callback must be a function");
      }
      return callback;
    };
    exports2.fromPromise = function(promise, callback) {
      if (callback === void 0)
        return promise;
      promise.then(function(res) {
        nextTick(() => callback(null, res));
      }).catch(function(err) {
        nextTick(() => callback(err));
      });
    };
  }
});

// node_modules/abstract-level/lib/common.js
var require_common = __commonJS({
  "node_modules/abstract-level/lib/common.js"(exports2) {
    "use strict";
    init_node_globals();
    exports2.getCallback = function(options, callback) {
      return typeof options === "function" ? options : callback;
    };
    exports2.getOptions = function(options, def) {
      if (typeof options === "object" && options !== null) {
        return options;
      }
      if (def !== void 0) {
        return def;
      }
      return {};
    };
  }
});

// node_modules/abstract-level/abstract-iterator.js
var require_abstract_iterator = __commonJS({
  "node_modules/abstract-level/abstract-iterator.js"(exports2) {
    "use strict";
    init_node_globals();
    var { fromCallback } = require_catering();
    var ModuleError = require_module_error();
    var { getOptions, getCallback } = require_common();
    var kPromise = Symbol("promise");
    var kCallback = Symbol("callback");
    var kWorking = Symbol("working");
    var kHandleOne = Symbol("handleOne");
    var kHandleMany = Symbol("handleMany");
    var kAutoClose = Symbol("autoClose");
    var kFinishWork = Symbol("finishWork");
    var kReturnMany = Symbol("returnMany");
    var kClosing = Symbol("closing");
    var kHandleClose = Symbol("handleClose");
    var kClosed = Symbol("closed");
    var kCloseCallbacks = Symbol("closeCallbacks");
    var kKeyEncoding = Symbol("keyEncoding");
    var kValueEncoding = Symbol("valueEncoding");
    var kAbortOnClose = Symbol("abortOnClose");
    var kLegacy = Symbol("legacy");
    var kKeys = Symbol("keys");
    var kValues = Symbol("values");
    var kLimit = Symbol("limit");
    var kCount = Symbol("count");
    var emptyOptions = Object.freeze({});
    var noop = () => {
    };
    var warnedEnd = false;
    var CommonIterator = class {
      constructor(db, options, legacy) {
        if (typeof db !== "object" || db === null) {
          const hint = db === null ? "null" : typeof db;
          throw new TypeError(`The first argument must be an abstract-level database, received ${hint}`);
        }
        if (typeof options !== "object" || options === null) {
          throw new TypeError("The second argument must be an options object");
        }
        this[kClosed] = false;
        this[kCloseCallbacks] = [];
        this[kWorking] = false;
        this[kClosing] = false;
        this[kAutoClose] = false;
        this[kCallback] = null;
        this[kHandleOne] = this[kHandleOne].bind(this);
        this[kHandleMany] = this[kHandleMany].bind(this);
        this[kHandleClose] = this[kHandleClose].bind(this);
        this[kKeyEncoding] = options[kKeyEncoding];
        this[kValueEncoding] = options[kValueEncoding];
        this[kLegacy] = legacy;
        this[kLimit] = Number.isInteger(options.limit) && options.limit >= 0 ? options.limit : Infinity;
        this[kCount] = 0;
        this[kAbortOnClose] = !!options.abortOnClose;
        this.db = db;
        this.db.attachResource(this);
        this.nextTick = db.nextTick;
      }
      get count() {
        return this[kCount];
      }
      get limit() {
        return this[kLimit];
      }
      next(callback) {
        let promise;
        if (callback === void 0) {
          promise = new Promise((resolve, reject) => {
            callback = (err, key, value) => {
              if (err)
                reject(err);
              else if (!this[kLegacy])
                resolve(key);
              else if (key === void 0 && value === void 0)
                resolve();
              else
                resolve([key, value]);
            };
          });
        } else if (typeof callback !== "function") {
          throw new TypeError("Callback must be a function");
        }
        if (this[kClosing]) {
          this.nextTick(callback, new ModuleError("Iterator is not open: cannot call next() after close()", {
            code: "LEVEL_ITERATOR_NOT_OPEN"
          }));
        } else if (this[kWorking]) {
          this.nextTick(callback, new ModuleError("Iterator is busy: cannot call next() until previous call has completed", {
            code: "LEVEL_ITERATOR_BUSY"
          }));
        } else {
          this[kWorking] = true;
          this[kCallback] = callback;
          if (this[kCount] >= this[kLimit])
            this.nextTick(this[kHandleOne], null);
          else
            this._next(this[kHandleOne]);
        }
        return promise;
      }
      _next(callback) {
        this.nextTick(callback);
      }
      nextv(size, options, callback) {
        callback = getCallback(options, callback);
        callback = fromCallback(callback, kPromise);
        options = getOptions(options, emptyOptions);
        if (!Number.isInteger(size)) {
          this.nextTick(callback, new TypeError("The first argument 'size' must be an integer"));
          return callback[kPromise];
        }
        if (this[kClosing]) {
          this.nextTick(callback, new ModuleError("Iterator is not open: cannot call nextv() after close()", {
            code: "LEVEL_ITERATOR_NOT_OPEN"
          }));
        } else if (this[kWorking]) {
          this.nextTick(callback, new ModuleError("Iterator is busy: cannot call nextv() until previous call has completed", {
            code: "LEVEL_ITERATOR_BUSY"
          }));
        } else {
          if (size < 1)
            size = 1;
          if (this[kLimit] < Infinity)
            size = Math.min(size, this[kLimit] - this[kCount]);
          this[kWorking] = true;
          this[kCallback] = callback;
          if (size <= 0)
            this.nextTick(this[kHandleMany], null, []);
          else
            this._nextv(size, options, this[kHandleMany]);
        }
        return callback[kPromise];
      }
      _nextv(size, options, callback) {
        const acc = [];
        const onnext = (err, key, value) => {
          if (err) {
            return callback(err);
          } else if (this[kLegacy] ? key === void 0 && value === void 0 : key === void 0) {
            return callback(null, acc);
          }
          acc.push(this[kLegacy] ? [key, value] : key);
          if (acc.length === size) {
            callback(null, acc);
          } else {
            this._next(onnext);
          }
        };
        this._next(onnext);
      }
      all(options, callback) {
        callback = getCallback(options, callback);
        callback = fromCallback(callback, kPromise);
        options = getOptions(options, emptyOptions);
        if (this[kClosing]) {
          this.nextTick(callback, new ModuleError("Iterator is not open: cannot call all() after close()", {
            code: "LEVEL_ITERATOR_NOT_OPEN"
          }));
        } else if (this[kWorking]) {
          this.nextTick(callback, new ModuleError("Iterator is busy: cannot call all() until previous call has completed", {
            code: "LEVEL_ITERATOR_BUSY"
          }));
        } else {
          this[kWorking] = true;
          this[kCallback] = callback;
          this[kAutoClose] = true;
          if (this[kCount] >= this[kLimit])
            this.nextTick(this[kHandleMany], null, []);
          else
            this._all(options, this[kHandleMany]);
        }
        return callback[kPromise];
      }
      _all(options, callback) {
        let count = this[kCount];
        const acc = [];
        const nextv = () => {
          const size = this[kLimit] < Infinity ? Math.min(1e3, this[kLimit] - count) : 1e3;
          if (size <= 0) {
            this.nextTick(callback, null, acc);
          } else {
            this._nextv(size, emptyOptions, onnextv);
          }
        };
        const onnextv = (err, items) => {
          if (err) {
            callback(err);
          } else if (items.length === 0) {
            callback(null, acc);
          } else {
            acc.push.apply(acc, items);
            count += items.length;
            nextv();
          }
        };
        nextv();
      }
      [kFinishWork]() {
        const cb = this[kCallback];
        if (this[kAbortOnClose] && cb === null)
          return noop;
        this[kWorking] = false;
        this[kCallback] = null;
        if (this[kClosing])
          this._close(this[kHandleClose]);
        return cb;
      }
      [kReturnMany](cb, err, items) {
        if (this[kAutoClose]) {
          this.close(cb.bind(null, err, items));
        } else {
          cb(err, items);
        }
      }
      seek(target, options) {
        options = getOptions(options, emptyOptions);
        if (this[kClosing]) {
        } else if (this[kWorking]) {
          throw new ModuleError("Iterator is busy: cannot call seek() until next() has completed", {
            code: "LEVEL_ITERATOR_BUSY"
          });
        } else {
          const keyEncoding = this.db.keyEncoding(options.keyEncoding || this[kKeyEncoding]);
          const keyFormat = keyEncoding.format;
          if (options.keyEncoding !== keyFormat) {
            options = { ...options, keyEncoding: keyFormat };
          }
          const mapped = this.db.prefixKey(keyEncoding.encode(target), keyFormat);
          this._seek(mapped, options);
        }
      }
      _seek(target, options) {
        throw new ModuleError("Iterator does not support seek()", {
          code: "LEVEL_NOT_SUPPORTED"
        });
      }
      close(callback) {
        callback = fromCallback(callback, kPromise);
        if (this[kClosed]) {
          this.nextTick(callback);
        } else if (this[kClosing]) {
          this[kCloseCallbacks].push(callback);
        } else {
          this[kClosing] = true;
          this[kCloseCallbacks].push(callback);
          if (!this[kWorking]) {
            this._close(this[kHandleClose]);
          } else if (this[kAbortOnClose]) {
            const cb = this[kFinishWork]();
            cb(new ModuleError("Aborted on iterator close()", {
              code: "LEVEL_ITERATOR_NOT_OPEN"
            }));
          }
        }
        return callback[kPromise];
      }
      _close(callback) {
        this.nextTick(callback);
      }
      [kHandleClose]() {
        this[kClosed] = true;
        this.db.detachResource(this);
        const callbacks = this[kCloseCallbacks];
        this[kCloseCallbacks] = [];
        for (const cb of callbacks) {
          cb();
        }
      }
      async *[Symbol.asyncIterator]() {
        try {
          let item;
          while ((item = await this.next()) !== void 0) {
            yield item;
          }
        } finally {
          if (!this[kClosed])
            await this.close();
        }
      }
    };
    var AbstractIterator = class extends CommonIterator {
      constructor(db, options) {
        super(db, options, true);
        this[kKeys] = options.keys !== false;
        this[kValues] = options.values !== false;
      }
      [kHandleOne](err, key, value) {
        const cb = this[kFinishWork]();
        if (err)
          return cb(err);
        try {
          key = this[kKeys] && key !== void 0 ? this[kKeyEncoding].decode(key) : void 0;
          value = this[kValues] && value !== void 0 ? this[kValueEncoding].decode(value) : void 0;
        } catch (err2) {
          return cb(new IteratorDecodeError("entry", err2));
        }
        if (!(key === void 0 && value === void 0)) {
          this[kCount]++;
        }
        cb(null, key, value);
      }
      [kHandleMany](err, entries) {
        const cb = this[kFinishWork]();
        if (err)
          return this[kReturnMany](cb, err);
        try {
          for (const entry of entries) {
            const key = entry[0];
            const value = entry[1];
            entry[0] = this[kKeys] && key !== void 0 ? this[kKeyEncoding].decode(key) : void 0;
            entry[1] = this[kValues] && value !== void 0 ? this[kValueEncoding].decode(value) : void 0;
          }
        } catch (err2) {
          return this[kReturnMany](cb, new IteratorDecodeError("entries", err2));
        }
        this[kCount] += entries.length;
        this[kReturnMany](cb, null, entries);
      }
      end(callback) {
        if (!warnedEnd && typeof console !== "undefined") {
          warnedEnd = true;
          console.warn(new ModuleError("The iterator.end() method was renamed to close() and end() is an alias that will be removed in a future version", { code: "LEVEL_LEGACY" }));
        }
        return this.close(callback);
      }
    };
    var AbstractKeyIterator = class extends CommonIterator {
      constructor(db, options) {
        super(db, options, false);
      }
      [kHandleOne](err, key) {
        const cb = this[kFinishWork]();
        if (err)
          return cb(err);
        try {
          key = key !== void 0 ? this[kKeyEncoding].decode(key) : void 0;
        } catch (err2) {
          return cb(new IteratorDecodeError("key", err2));
        }
        if (key !== void 0)
          this[kCount]++;
        cb(null, key);
      }
      [kHandleMany](err, keys) {
        const cb = this[kFinishWork]();
        if (err)
          return this[kReturnMany](cb, err);
        try {
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            keys[i] = key !== void 0 ? this[kKeyEncoding].decode(key) : void 0;
          }
        } catch (err2) {
          return this[kReturnMany](cb, new IteratorDecodeError("keys", err2));
        }
        this[kCount] += keys.length;
        this[kReturnMany](cb, null, keys);
      }
    };
    var AbstractValueIterator = class extends CommonIterator {
      constructor(db, options) {
        super(db, options, false);
      }
      [kHandleOne](err, value) {
        const cb = this[kFinishWork]();
        if (err)
          return cb(err);
        try {
          value = value !== void 0 ? this[kValueEncoding].decode(value) : void 0;
        } catch (err2) {
          return cb(new IteratorDecodeError("value", err2));
        }
        if (value !== void 0)
          this[kCount]++;
        cb(null, value);
      }
      [kHandleMany](err, values) {
        const cb = this[kFinishWork]();
        if (err)
          return this[kReturnMany](cb, err);
        try {
          for (let i = 0; i < values.length; i++) {
            const value = values[i];
            values[i] = value !== void 0 ? this[kValueEncoding].decode(value) : void 0;
          }
        } catch (err2) {
          return this[kReturnMany](cb, new IteratorDecodeError("values", err2));
        }
        this[kCount] += values.length;
        this[kReturnMany](cb, null, values);
      }
    };
    var IteratorDecodeError = class extends ModuleError {
      constructor(subject, cause) {
        super(`Iterator could not decode ${subject}`, {
          code: "LEVEL_DECODE_ERROR",
          cause
        });
      }
    };
    for (const k of ["_ended property", "_nexting property", "_end method"]) {
      Object.defineProperty(AbstractIterator.prototype, k.split(" ")[0], {
        get() {
          throw new ModuleError(`The ${k} has been removed`, { code: "LEVEL_LEGACY" });
        },
        set() {
          throw new ModuleError(`The ${k} has been removed`, { code: "LEVEL_LEGACY" });
        }
      });
    }
    AbstractIterator.keyEncoding = kKeyEncoding;
    AbstractIterator.valueEncoding = kValueEncoding;
    exports2.AbstractIterator = AbstractIterator;
    exports2.AbstractKeyIterator = AbstractKeyIterator;
    exports2.AbstractValueIterator = AbstractValueIterator;
  }
});

// node_modules/abstract-level/lib/default-kv-iterator.js
var require_default_kv_iterator = __commonJS({
  "node_modules/abstract-level/lib/default-kv-iterator.js"(exports2) {
    "use strict";
    init_node_globals();
    var { AbstractKeyIterator, AbstractValueIterator } = require_abstract_iterator();
    var kIterator = Symbol("iterator");
    var kCallback = Symbol("callback");
    var kHandleOne = Symbol("handleOne");
    var kHandleMany = Symbol("handleMany");
    var DefaultKeyIterator = class extends AbstractKeyIterator {
      constructor(db, options) {
        super(db, options);
        this[kIterator] = db.iterator({ ...options, keys: true, values: false });
        this[kHandleOne] = this[kHandleOne].bind(this);
        this[kHandleMany] = this[kHandleMany].bind(this);
      }
    };
    var DefaultValueIterator = class extends AbstractValueIterator {
      constructor(db, options) {
        super(db, options);
        this[kIterator] = db.iterator({ ...options, keys: false, values: true });
        this[kHandleOne] = this[kHandleOne].bind(this);
        this[kHandleMany] = this[kHandleMany].bind(this);
      }
    };
    for (const Iterator of [DefaultKeyIterator, DefaultValueIterator]) {
      const keys = Iterator === DefaultKeyIterator;
      const mapEntry = keys ? (entry) => entry[0] : (entry) => entry[1];
      Iterator.prototype._next = function(callback) {
        this[kCallback] = callback;
        this[kIterator].next(this[kHandleOne]);
      };
      Iterator.prototype[kHandleOne] = function(err, key, value) {
        const callback = this[kCallback];
        if (err)
          callback(err);
        else
          callback(null, keys ? key : value);
      };
      Iterator.prototype._nextv = function(size, options, callback) {
        this[kCallback] = callback;
        this[kIterator].nextv(size, options, this[kHandleMany]);
      };
      Iterator.prototype._all = function(options, callback) {
        this[kCallback] = callback;
        this[kIterator].all(options, this[kHandleMany]);
      };
      Iterator.prototype[kHandleMany] = function(err, entries) {
        const callback = this[kCallback];
        if (err)
          callback(err);
        else
          callback(null, entries.map(mapEntry));
      };
      Iterator.prototype._seek = function(target, options) {
        this[kIterator].seek(target, options);
      };
      Iterator.prototype._close = function(callback) {
        this[kIterator].close(callback);
      };
    }
    exports2.DefaultKeyIterator = DefaultKeyIterator;
    exports2.DefaultValueIterator = DefaultValueIterator;
  }
});

// node_modules/abstract-level/lib/deferred-iterator.js
var require_deferred_iterator = __commonJS({
  "node_modules/abstract-level/lib/deferred-iterator.js"(exports2) {
    "use strict";
    init_node_globals();
    var { AbstractIterator, AbstractKeyIterator, AbstractValueIterator } = require_abstract_iterator();
    var ModuleError = require_module_error();
    var kNut = Symbol("nut");
    var kUndefer = Symbol("undefer");
    var kFactory = Symbol("factory");
    var DeferredIterator = class extends AbstractIterator {
      constructor(db, options) {
        super(db, options);
        this[kNut] = null;
        this[kFactory] = () => db.iterator(options);
        this.db.defer(() => this[kUndefer]());
      }
    };
    var DeferredKeyIterator = class extends AbstractKeyIterator {
      constructor(db, options) {
        super(db, options);
        this[kNut] = null;
        this[kFactory] = () => db.keys(options);
        this.db.defer(() => this[kUndefer]());
      }
    };
    var DeferredValueIterator = class extends AbstractValueIterator {
      constructor(db, options) {
        super(db, options);
        this[kNut] = null;
        this[kFactory] = () => db.values(options);
        this.db.defer(() => this[kUndefer]());
      }
    };
    for (const Iterator of [DeferredIterator, DeferredKeyIterator, DeferredValueIterator]) {
      Iterator.prototype[kUndefer] = function() {
        if (this.db.status === "open") {
          this[kNut] = this[kFactory]();
        }
      };
      Iterator.prototype._next = function(callback) {
        if (this[kNut] !== null) {
          this[kNut].next(callback);
        } else if (this.db.status === "opening") {
          this.db.defer(() => this._next(callback));
        } else {
          this.nextTick(callback, new ModuleError("Iterator is not open: cannot call next() after close()", {
            code: "LEVEL_ITERATOR_NOT_OPEN"
          }));
        }
      };
      Iterator.prototype._nextv = function(size, options, callback) {
        if (this[kNut] !== null) {
          this[kNut].nextv(size, options, callback);
        } else if (this.db.status === "opening") {
          this.db.defer(() => this._nextv(size, options, callback));
        } else {
          this.nextTick(callback, new ModuleError("Iterator is not open: cannot call nextv() after close()", {
            code: "LEVEL_ITERATOR_NOT_OPEN"
          }));
        }
      };
      Iterator.prototype._all = function(options, callback) {
        if (this[kNut] !== null) {
          this[kNut].all(callback);
        } else if (this.db.status === "opening") {
          this.db.defer(() => this._all(options, callback));
        } else {
          this.nextTick(callback, new ModuleError("Iterator is not open: cannot call all() after close()", {
            code: "LEVEL_ITERATOR_NOT_OPEN"
          }));
        }
      };
      Iterator.prototype._seek = function(target, options) {
        if (this[kNut] !== null) {
          this[kNut]._seek(target, options);
        } else if (this.db.status === "opening") {
          this.db.defer(() => this._seek(target, options));
        }
      };
      Iterator.prototype._close = function(callback) {
        if (this[kNut] !== null) {
          this[kNut].close(callback);
        } else if (this.db.status === "opening") {
          this.db.defer(() => this._close(callback));
        } else {
          this.nextTick(callback);
        }
      };
    }
    exports2.DeferredIterator = DeferredIterator;
    exports2.DeferredKeyIterator = DeferredKeyIterator;
    exports2.DeferredValueIterator = DeferredValueIterator;
  }
});

// node_modules/abstract-level/abstract-chained-batch.js
var require_abstract_chained_batch = __commonJS({
  "node_modules/abstract-level/abstract-chained-batch.js"(exports2) {
    "use strict";
    init_node_globals();
    var { fromCallback } = require_catering();
    var ModuleError = require_module_error();
    var { getCallback, getOptions } = require_common();
    var kPromise = Symbol("promise");
    var kStatus = Symbol("status");
    var kOperations = Symbol("operations");
    var kFinishClose = Symbol("finishClose");
    var kCloseCallbacks = Symbol("closeCallbacks");
    var AbstractChainedBatch = class {
      constructor(db) {
        if (typeof db !== "object" || db === null) {
          const hint = db === null ? "null" : typeof db;
          throw new TypeError(`The first argument must be an abstract-level database, received ${hint}`);
        }
        this[kOperations] = [];
        this[kCloseCallbacks] = [];
        this[kStatus] = "open";
        this[kFinishClose] = this[kFinishClose].bind(this);
        this.db = db;
        this.db.attachResource(this);
        this.nextTick = db.nextTick;
      }
      get length() {
        return this[kOperations].length;
      }
      put(key, value, options) {
        if (this[kStatus] !== "open") {
          throw new ModuleError("Batch is not open: cannot call put() after write() or close()", {
            code: "LEVEL_BATCH_NOT_OPEN"
          });
        }
        const err = this.db._checkKey(key) || this.db._checkValue(value);
        if (err)
          throw err;
        const db = options && options.sublevel != null ? options.sublevel : this.db;
        const original = options;
        const keyEncoding = db.keyEncoding(options && options.keyEncoding);
        const valueEncoding2 = db.valueEncoding(options && options.valueEncoding);
        const keyFormat = keyEncoding.format;
        options = { ...options, keyEncoding: keyFormat, valueEncoding: valueEncoding2.format };
        if (db !== this.db) {
          options.sublevel = null;
        }
        const mappedKey = db.prefixKey(keyEncoding.encode(key), keyFormat);
        const mappedValue = valueEncoding2.encode(value);
        this._put(mappedKey, mappedValue, options);
        this[kOperations].push({ ...original, type: "put", key, value });
        return this;
      }
      _put(key, value, options) {
      }
      del(key, options) {
        if (this[kStatus] !== "open") {
          throw new ModuleError("Batch is not open: cannot call del() after write() or close()", {
            code: "LEVEL_BATCH_NOT_OPEN"
          });
        }
        const err = this.db._checkKey(key);
        if (err)
          throw err;
        const db = options && options.sublevel != null ? options.sublevel : this.db;
        const original = options;
        const keyEncoding = db.keyEncoding(options && options.keyEncoding);
        const keyFormat = keyEncoding.format;
        options = { ...options, keyEncoding: keyFormat };
        if (db !== this.db) {
          options.sublevel = null;
        }
        this._del(db.prefixKey(keyEncoding.encode(key), keyFormat), options);
        this[kOperations].push({ ...original, type: "del", key });
        return this;
      }
      _del(key, options) {
      }
      clear() {
        if (this[kStatus] !== "open") {
          throw new ModuleError("Batch is not open: cannot call clear() after write() or close()", {
            code: "LEVEL_BATCH_NOT_OPEN"
          });
        }
        this._clear();
        this[kOperations] = [];
        return this;
      }
      _clear() {
      }
      write(options, callback) {
        callback = getCallback(options, callback);
        callback = fromCallback(callback, kPromise);
        options = getOptions(options);
        if (this[kStatus] !== "open") {
          this.nextTick(callback, new ModuleError("Batch is not open: cannot call write() after write() or close()", {
            code: "LEVEL_BATCH_NOT_OPEN"
          }));
        } else if (this.length === 0) {
          this.close(callback);
        } else {
          this[kStatus] = "writing";
          this._write(options, (err) => {
            this[kStatus] = "closing";
            this[kCloseCallbacks].push(() => callback(err));
            if (!err)
              this.db.emit("batch", this[kOperations]);
            this._close(this[kFinishClose]);
          });
        }
        return callback[kPromise];
      }
      _write(options, callback) {
      }
      close(callback) {
        callback = fromCallback(callback, kPromise);
        if (this[kStatus] === "closing") {
          this[kCloseCallbacks].push(callback);
        } else if (this[kStatus] === "closed") {
          this.nextTick(callback);
        } else {
          this[kCloseCallbacks].push(callback);
          if (this[kStatus] !== "writing") {
            this[kStatus] = "closing";
            this._close(this[kFinishClose]);
          }
        }
        return callback[kPromise];
      }
      _close(callback) {
        this.nextTick(callback);
      }
      [kFinishClose]() {
        this[kStatus] = "closed";
        this.db.detachResource(this);
        const callbacks = this[kCloseCallbacks];
        this[kCloseCallbacks] = [];
        for (const cb of callbacks) {
          cb();
        }
      }
    };
    exports2.AbstractChainedBatch = AbstractChainedBatch;
  }
});

// node_modules/abstract-level/lib/default-chained-batch.js
var require_default_chained_batch = __commonJS({
  "node_modules/abstract-level/lib/default-chained-batch.js"(exports2) {
    "use strict";
    init_node_globals();
    var { AbstractChainedBatch } = require_abstract_chained_batch();
    var ModuleError = require_module_error();
    var kEncoded = Symbol("encoded");
    var DefaultChainedBatch = class extends AbstractChainedBatch {
      constructor(db) {
        super(db);
        this[kEncoded] = [];
      }
      _put(key, value, options) {
        this[kEncoded].push({ ...options, type: "put", key, value });
      }
      _del(key, options) {
        this[kEncoded].push({ ...options, type: "del", key });
      }
      _clear() {
        this[kEncoded] = [];
      }
      _write(options, callback) {
        if (this.db.status === "opening") {
          this.db.defer(() => this._write(options, callback));
        } else if (this.db.status === "open") {
          if (this[kEncoded].length === 0)
            this.nextTick(callback);
          else
            this.db._batch(this[kEncoded], options, callback);
        } else {
          this.nextTick(callback, new ModuleError("Batch is not open: cannot call write() after write() or close()", {
            code: "LEVEL_BATCH_NOT_OPEN"
          }));
        }
      }
    };
    exports2.DefaultChainedBatch = DefaultChainedBatch;
  }
});

// node_modules/abstract-level/lib/range-options.js
var require_range_options = __commonJS({
  "node_modules/abstract-level/lib/range-options.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    var ModuleError = require_module_error();
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var rangeOptions = /* @__PURE__ */ new Set(["lt", "lte", "gt", "gte"]);
    module2.exports = function(options, keyEncoding) {
      const result = {};
      for (const k in options) {
        if (!hasOwnProperty.call(options, k))
          continue;
        if (k === "keyEncoding" || k === "valueEncoding")
          continue;
        if (k === "start" || k === "end") {
          throw new ModuleError(`The legacy range option '${k}' has been removed`, {
            code: "LEVEL_LEGACY"
          });
        } else if (k === "encoding") {
          throw new ModuleError("The levelup-style 'encoding' alias has been removed, use 'valueEncoding' instead", {
            code: "LEVEL_LEGACY"
          });
        }
        if (rangeOptions.has(k)) {
          result[k] = keyEncoding.encode(options[k]);
        } else {
          result[k] = options[k];
        }
      }
      result.reverse = !!result.reverse;
      result.limit = Number.isInteger(result.limit) && result.limit >= 0 ? result.limit : -1;
      return result;
    };
  }
});

// node_modules/queue-microtask/index.js
var require_queue_microtask = __commonJS({
  "node_modules/queue-microtask/index.js"(exports2, module2) {
    init_node_globals();
    var promise;
    module2.exports = typeof queueMicrotask === "function" ? queueMicrotask.bind(typeof window !== "undefined" ? window : global) : (cb) => (promise || (promise = Promise.resolve())).then(cb).catch((err) => setTimeout(() => {
      throw err;
    }, 0));
  }
});

// node_modules/abstract-level/lib/next-tick-browser.js
var require_next_tick_browser2 = __commonJS({
  "node_modules/abstract-level/lib/next-tick-browser.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    var queueMicrotask2 = require_queue_microtask();
    module2.exports = function(fn, ...args) {
      if (args.length === 0) {
        queueMicrotask2(fn);
      } else {
        queueMicrotask2(() => fn(...args));
      }
    };
  }
});

// node_modules/abstract-level/lib/abstract-sublevel-iterator.js
var require_abstract_sublevel_iterator = __commonJS({
  "node_modules/abstract-level/lib/abstract-sublevel-iterator.js"(exports2) {
    "use strict";
    init_node_globals();
    var { AbstractIterator, AbstractKeyIterator, AbstractValueIterator } = require_abstract_iterator();
    var kUnfix = Symbol("unfix");
    var kIterator = Symbol("iterator");
    var kHandleOne = Symbol("handleOne");
    var kHandleMany = Symbol("handleMany");
    var kCallback = Symbol("callback");
    var AbstractSublevelIterator = class extends AbstractIterator {
      constructor(db, options, iterator, unfix) {
        super(db, options);
        this[kIterator] = iterator;
        this[kUnfix] = unfix;
        this[kHandleOne] = this[kHandleOne].bind(this);
        this[kHandleMany] = this[kHandleMany].bind(this);
        this[kCallback] = null;
      }
      [kHandleOne](err, key, value) {
        const callback = this[kCallback];
        if (err)
          return callback(err);
        if (key !== void 0)
          key = this[kUnfix](key);
        callback(err, key, value);
      }
      [kHandleMany](err, entries) {
        const callback = this[kCallback];
        if (err)
          return callback(err);
        for (const entry of entries) {
          const key = entry[0];
          if (key !== void 0)
            entry[0] = this[kUnfix](key);
        }
        callback(err, entries);
      }
    };
    var AbstractSublevelKeyIterator = class extends AbstractKeyIterator {
      constructor(db, options, iterator, unfix) {
        super(db, options);
        this[kIterator] = iterator;
        this[kUnfix] = unfix;
        this[kHandleOne] = this[kHandleOne].bind(this);
        this[kHandleMany] = this[kHandleMany].bind(this);
        this[kCallback] = null;
      }
      [kHandleOne](err, key) {
        const callback = this[kCallback];
        if (err)
          return callback(err);
        if (key !== void 0)
          key = this[kUnfix](key);
        callback(err, key);
      }
      [kHandleMany](err, keys) {
        const callback = this[kCallback];
        if (err)
          return callback(err);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if (key !== void 0)
            keys[i] = this[kUnfix](key);
        }
        callback(err, keys);
      }
    };
    var AbstractSublevelValueIterator = class extends AbstractValueIterator {
      constructor(db, options, iterator) {
        super(db, options);
        this[kIterator] = iterator;
      }
    };
    for (const Iterator of [AbstractSublevelIterator, AbstractSublevelKeyIterator]) {
      Iterator.prototype._next = function(callback) {
        this[kCallback] = callback;
        this[kIterator].next(this[kHandleOne]);
      };
      Iterator.prototype._nextv = function(size, options, callback) {
        this[kCallback] = callback;
        this[kIterator].nextv(size, options, this[kHandleMany]);
      };
      Iterator.prototype._all = function(options, callback) {
        this[kCallback] = callback;
        this[kIterator].all(options, this[kHandleMany]);
      };
    }
    for (const Iterator of [AbstractSublevelValueIterator]) {
      Iterator.prototype._next = function(callback) {
        this[kIterator].next(callback);
      };
      Iterator.prototype._nextv = function(size, options, callback) {
        this[kIterator].nextv(size, options, callback);
      };
      Iterator.prototype._all = function(options, callback) {
        this[kIterator].all(options, callback);
      };
    }
    for (const Iterator of [AbstractSublevelIterator, AbstractSublevelKeyIterator, AbstractSublevelValueIterator]) {
      Iterator.prototype._seek = function(target, options) {
        this[kIterator].seek(target, options);
      };
      Iterator.prototype._close = function(callback) {
        this[kIterator].close(callback);
      };
    }
    exports2.AbstractSublevelIterator = AbstractSublevelIterator;
    exports2.AbstractSublevelKeyIterator = AbstractSublevelKeyIterator;
    exports2.AbstractSublevelValueIterator = AbstractSublevelValueIterator;
  }
});

// node_modules/abstract-level/lib/abstract-sublevel.js
var require_abstract_sublevel = __commonJS({
  "node_modules/abstract-level/lib/abstract-sublevel.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    var ModuleError = require_module_error();
    var { Buffer: Buffer2 } = require_buffer() || {};
    var {
      AbstractSublevelIterator,
      AbstractSublevelKeyIterator,
      AbstractSublevelValueIterator
    } = require_abstract_sublevel_iterator();
    var kPrefix = Symbol("prefix");
    var kUpperBound = Symbol("upperBound");
    var kPrefixRange = Symbol("prefixRange");
    var kParent = Symbol("parent");
    var kUnfix = Symbol("unfix");
    var textEncoder3 = new TextEncoder();
    var defaults = { separator: "!" };
    module2.exports = function({ AbstractLevel }) {
      class AbstractSublevel extends AbstractLevel {
        static defaults(options) {
          if (typeof options === "string") {
            throw new ModuleError("The subleveldown string shorthand for { separator } has been removed", {
              code: "LEVEL_LEGACY"
            });
          } else if (options && options.open) {
            throw new ModuleError("The subleveldown open option has been removed", {
              code: "LEVEL_LEGACY"
            });
          }
          if (options == null) {
            return defaults;
          } else if (!options.separator) {
            return { ...options, separator: "!" };
          } else {
            return options;
          }
        }
        constructor(db, name3, options) {
          const { separator, manifest, ...forward } = AbstractSublevel.defaults(options);
          name3 = trim(name3, separator);
          const reserved = separator.charCodeAt(0) + 1;
          const parent = db[kParent] || db;
          if (!textEncoder3.encode(name3).every((x) => x > reserved && x < 127)) {
            throw new ModuleError(`Prefix must use bytes > ${reserved} < ${127}`, {
              code: "LEVEL_INVALID_PREFIX"
            });
          }
          super(mergeManifests(parent, manifest), forward);
          const prefix = (db.prefix || "") + separator + name3 + separator;
          const upperBound = prefix.slice(0, -1) + String.fromCharCode(reserved);
          this[kParent] = parent;
          this[kPrefix] = new MultiFormat(prefix);
          this[kUpperBound] = new MultiFormat(upperBound);
          this[kUnfix] = new Unfixer();
          this.nextTick = parent.nextTick;
        }
        prefixKey(key, keyFormat) {
          if (keyFormat === "utf8") {
            return this[kPrefix].utf8 + key;
          } else if (key.byteLength === 0) {
            return this[kPrefix][keyFormat];
          } else if (keyFormat === "view") {
            const view = this[kPrefix].view;
            const result = new Uint8Array(view.byteLength + key.byteLength);
            result.set(view, 0);
            result.set(key, view.byteLength);
            return result;
          } else {
            const buffer2 = this[kPrefix].buffer;
            return Buffer2.concat([buffer2, key], buffer2.byteLength + key.byteLength);
          }
        }
        [kPrefixRange](range, keyFormat) {
          if (range.gte !== void 0) {
            range.gte = this.prefixKey(range.gte, keyFormat);
          } else if (range.gt !== void 0) {
            range.gt = this.prefixKey(range.gt, keyFormat);
          } else {
            range.gte = this[kPrefix][keyFormat];
          }
          if (range.lte !== void 0) {
            range.lte = this.prefixKey(range.lte, keyFormat);
          } else if (range.lt !== void 0) {
            range.lt = this.prefixKey(range.lt, keyFormat);
          } else {
            range.lte = this[kUpperBound][keyFormat];
          }
        }
        get prefix() {
          return this[kPrefix].utf8;
        }
        get db() {
          return this[kParent];
        }
        _open(options, callback) {
          this[kParent].open({ passive: true }, callback);
        }
        _put(key, value, options, callback) {
          this[kParent].put(key, value, options, callback);
        }
        _get(key, options, callback) {
          this[kParent].get(key, options, callback);
        }
        _getMany(keys, options, callback) {
          this[kParent].getMany(keys, options, callback);
        }
        _del(key, options, callback) {
          this[kParent].del(key, options, callback);
        }
        _batch(operations, options, callback) {
          this[kParent].batch(operations, options, callback);
        }
        _clear(options, callback) {
          this[kPrefixRange](options, options.keyEncoding);
          this[kParent].clear(options, callback);
        }
        _iterator(options) {
          this[kPrefixRange](options, options.keyEncoding);
          const iterator = this[kParent].iterator(options);
          const unfix = this[kUnfix].get(this[kPrefix].utf8.length, options.keyEncoding);
          return new AbstractSublevelIterator(this, options, iterator, unfix);
        }
        _keys(options) {
          this[kPrefixRange](options, options.keyEncoding);
          const iterator = this[kParent].keys(options);
          const unfix = this[kUnfix].get(this[kPrefix].utf8.length, options.keyEncoding);
          return new AbstractSublevelKeyIterator(this, options, iterator, unfix);
        }
        _values(options) {
          this[kPrefixRange](options, options.keyEncoding);
          const iterator = this[kParent].values(options);
          return new AbstractSublevelValueIterator(this, options, iterator);
        }
      }
      return { AbstractSublevel };
    };
    var mergeManifests = function(parent, manifest) {
      return {
        ...parent.supports,
        createIfMissing: false,
        errorIfExists: false,
        events: {},
        additionalMethods: {},
        ...manifest,
        encodings: {
          utf8: supportsEncoding(parent, "utf8"),
          buffer: supportsEncoding(parent, "buffer"),
          view: supportsEncoding(parent, "view")
        }
      };
    };
    var supportsEncoding = function(parent, encoding) {
      return parent.supports.encodings[encoding] ? parent.keyEncoding(encoding).name === encoding : false;
    };
    var MultiFormat = class {
      constructor(key) {
        this.utf8 = key;
        this.view = textEncoder3.encode(key);
        this.buffer = Buffer2 ? Buffer2.from(this.view.buffer, 0, this.view.byteLength) : {};
      }
    };
    var Unfixer = class {
      constructor() {
        this.cache = /* @__PURE__ */ new Map();
      }
      get(prefixLength, keyFormat) {
        let unfix = this.cache.get(keyFormat);
        if (unfix === void 0) {
          if (keyFormat === "view") {
            unfix = function(prefixLength2, key) {
              return key.subarray(prefixLength2);
            }.bind(null, prefixLength);
          } else {
            unfix = function(prefixLength2, key) {
              return key.slice(prefixLength2);
            }.bind(null, prefixLength);
          }
          this.cache.set(keyFormat, unfix);
        }
        return unfix;
      }
    };
    var trim = function(str, char) {
      let start = 0;
      let end = str.length;
      while (start < end && str[start] === char)
        start++;
      while (end > start && str[end - 1] === char)
        end--;
      return str.slice(start, end);
    };
  }
});

// node_modules/abstract-level/abstract-level.js
var require_abstract_level = __commonJS({
  "node_modules/abstract-level/abstract-level.js"(exports2) {
    "use strict";
    init_node_globals();
    var { supports } = require_level_supports();
    var { Transcoder } = require_level_transcoder();
    var { EventEmitter: EventEmitter4 } = require_events();
    var { fromCallback } = require_catering();
    var ModuleError = require_module_error();
    var { AbstractIterator } = require_abstract_iterator();
    var { DefaultKeyIterator, DefaultValueIterator } = require_default_kv_iterator();
    var { DeferredIterator, DeferredKeyIterator, DeferredValueIterator } = require_deferred_iterator();
    var { DefaultChainedBatch } = require_default_chained_batch();
    var { getCallback, getOptions } = require_common();
    var rangeOptions = require_range_options();
    var kPromise = Symbol("promise");
    var kLanded = Symbol("landed");
    var kResources = Symbol("resources");
    var kCloseResources = Symbol("closeResources");
    var kOperations = Symbol("operations");
    var kUndefer = Symbol("undefer");
    var kDeferOpen = Symbol("deferOpen");
    var kOptions = Symbol("options");
    var kStatus = Symbol("status");
    var kDefaultOptions = Symbol("defaultOptions");
    var kTranscoder = Symbol("transcoder");
    var kKeyEncoding = Symbol("keyEncoding");
    var kValueEncoding = Symbol("valueEncoding");
    var noop = () => {
    };
    var AbstractLevel = class extends EventEmitter4 {
      constructor(manifest, options) {
        super();
        if (typeof manifest !== "object" || manifest === null) {
          throw new TypeError("The first argument 'manifest' must be an object");
        }
        options = getOptions(options);
        const { keyEncoding, valueEncoding: valueEncoding2, passive, ...forward } = options;
        this[kResources] = /* @__PURE__ */ new Set();
        this[kOperations] = [];
        this[kDeferOpen] = true;
        this[kOptions] = forward;
        this[kStatus] = "opening";
        this.supports = supports(manifest, {
          status: true,
          promises: true,
          clear: true,
          getMany: true,
          deferredOpen: true,
          snapshots: manifest.snapshots !== false,
          permanence: manifest.permanence !== false,
          keyIterator: true,
          valueIterator: true,
          iteratorNextv: true,
          iteratorAll: true,
          encodings: manifest.encodings || {},
          events: Object.assign({}, manifest.events, {
            opening: true,
            open: true,
            closing: true,
            closed: true,
            put: true,
            del: true,
            batch: true,
            clear: true
          })
        });
        this[kTranscoder] = new Transcoder(formats(this));
        this[kKeyEncoding] = this[kTranscoder].encoding(keyEncoding || "utf8");
        this[kValueEncoding] = this[kTranscoder].encoding(valueEncoding2 || "utf8");
        for (const encoding of this[kTranscoder].encodings()) {
          if (!this.supports.encodings[encoding.commonName]) {
            this.supports.encodings[encoding.commonName] = true;
          }
        }
        this[kDefaultOptions] = {
          empty: Object.freeze({}),
          entry: Object.freeze({
            keyEncoding: this[kKeyEncoding].commonName,
            valueEncoding: this[kValueEncoding].commonName
          }),
          key: Object.freeze({
            keyEncoding: this[kKeyEncoding].commonName
          })
        };
        this.nextTick(() => {
          if (this[kDeferOpen]) {
            this.open({ passive: false }, noop);
          }
        });
      }
      get status() {
        return this[kStatus];
      }
      keyEncoding(encoding) {
        return this[kTranscoder].encoding(encoding != null ? encoding : this[kKeyEncoding]);
      }
      valueEncoding(encoding) {
        return this[kTranscoder].encoding(encoding != null ? encoding : this[kValueEncoding]);
      }
      open(options, callback) {
        callback = getCallback(options, callback);
        callback = fromCallback(callback, kPromise);
        options = { ...this[kOptions], ...getOptions(options) };
        options.createIfMissing = options.createIfMissing !== false;
        options.errorIfExists = !!options.errorIfExists;
        const maybeOpened = (err) => {
          if (this[kStatus] === "closing" || this[kStatus] === "opening") {
            this.once(kLanded, err ? () => maybeOpened(err) : maybeOpened);
          } else if (this[kStatus] !== "open") {
            callback(new ModuleError("Database is not open", {
              code: "LEVEL_DATABASE_NOT_OPEN",
              cause: err
            }));
          } else {
            callback();
          }
        };
        if (options.passive) {
          if (this[kStatus] === "opening") {
            this.once(kLanded, maybeOpened);
          } else {
            this.nextTick(maybeOpened);
          }
        } else if (this[kStatus] === "closed" || this[kDeferOpen]) {
          this[kDeferOpen] = false;
          this[kStatus] = "opening";
          this.emit("opening");
          this._open(options, (err) => {
            if (err) {
              this[kStatus] = "closed";
              this[kCloseResources](() => {
                this.emit(kLanded);
                maybeOpened(err);
              });
              this[kUndefer]();
              return;
            }
            this[kStatus] = "open";
            this[kUndefer]();
            this.emit(kLanded);
            if (this[kStatus] === "open")
              this.emit("open");
            if (this[kStatus] === "open")
              this.emit("ready");
            maybeOpened();
          });
        } else if (this[kStatus] === "open") {
          this.nextTick(maybeOpened);
        } else {
          this.once(kLanded, () => this.open(options, callback));
        }
        return callback[kPromise];
      }
      _open(options, callback) {
        this.nextTick(callback);
      }
      close(callback) {
        callback = fromCallback(callback, kPromise);
        const maybeClosed = (err) => {
          if (this[kStatus] === "opening" || this[kStatus] === "closing") {
            this.once(kLanded, err ? maybeClosed(err) : maybeClosed);
          } else if (this[kStatus] !== "closed") {
            callback(new ModuleError("Database is not closed", {
              code: "LEVEL_DATABASE_NOT_CLOSED",
              cause: err
            }));
          } else {
            callback();
          }
        };
        if (this[kStatus] === "open") {
          this[kStatus] = "closing";
          this.emit("closing");
          const cancel = (err) => {
            this[kStatus] = "open";
            this[kUndefer]();
            this.emit(kLanded);
            maybeClosed(err);
          };
          this[kCloseResources](() => {
            this._close((err) => {
              if (err)
                return cancel(err);
              this[kStatus] = "closed";
              this[kUndefer]();
              this.emit(kLanded);
              if (this[kStatus] === "closed")
                this.emit("closed");
              maybeClosed();
            });
          });
        } else if (this[kStatus] === "closed") {
          this.nextTick(maybeClosed);
        } else {
          this.once(kLanded, () => this.close(callback));
        }
        return callback[kPromise];
      }
      [kCloseResources](callback) {
        if (this[kResources].size === 0) {
          return this.nextTick(callback);
        }
        let pending = this[kResources].size;
        let sync = true;
        const next = () => {
          if (--pending === 0) {
            if (sync)
              this.nextTick(callback);
            else
              callback();
          }
        };
        for (const resource of this[kResources]) {
          resource.close(next);
        }
        sync = false;
        this[kResources].clear();
      }
      _close(callback) {
        this.nextTick(callback);
      }
      get(key, options, callback) {
        callback = getCallback(options, callback);
        callback = fromCallback(callback, kPromise);
        options = getOptions(options, this[kDefaultOptions].entry);
        if (this[kStatus] === "opening") {
          this.defer(() => this.get(key, options, callback));
          return callback[kPromise];
        }
        if (maybeError(this, callback)) {
          return callback[kPromise];
        }
        const err = this._checkKey(key);
        if (err) {
          this.nextTick(callback, err);
          return callback[kPromise];
        }
        const keyEncoding = this.keyEncoding(options.keyEncoding);
        const valueEncoding2 = this.valueEncoding(options.valueEncoding);
        const keyFormat = keyEncoding.format;
        const valueFormat = valueEncoding2.format;
        if (options.keyEncoding !== keyFormat || options.valueEncoding !== valueFormat) {
          options = Object.assign({}, options, { keyEncoding: keyFormat, valueEncoding: valueFormat });
        }
        this._get(this.prefixKey(keyEncoding.encode(key), keyFormat), options, (err2, value) => {
          if (err2) {
            if (err2.code === "LEVEL_NOT_FOUND" || err2.notFound || /NotFound/i.test(err2)) {
              if (!err2.code)
                err2.code = "LEVEL_NOT_FOUND";
              if (!err2.notFound)
                err2.notFound = true;
              if (!err2.status)
                err2.status = 404;
            }
            return callback(err2);
          }
          try {
            value = valueEncoding2.decode(value);
          } catch (err3) {
            return callback(new ModuleError("Could not decode value", {
              code: "LEVEL_DECODE_ERROR",
              cause: err3
            }));
          }
          callback(null, value);
        });
        return callback[kPromise];
      }
      _get(key, options, callback) {
        this.nextTick(callback, new Error("NotFound"));
      }
      getMany(keys, options, callback) {
        callback = getCallback(options, callback);
        callback = fromCallback(callback, kPromise);
        options = getOptions(options, this[kDefaultOptions].entry);
        if (this[kStatus] === "opening") {
          this.defer(() => this.getMany(keys, options, callback));
          return callback[kPromise];
        }
        if (maybeError(this, callback)) {
          return callback[kPromise];
        }
        if (!Array.isArray(keys)) {
          this.nextTick(callback, new TypeError("The first argument 'keys' must be an array"));
          return callback[kPromise];
        }
        if (keys.length === 0) {
          this.nextTick(callback, null, []);
          return callback[kPromise];
        }
        const keyEncoding = this.keyEncoding(options.keyEncoding);
        const valueEncoding2 = this.valueEncoding(options.valueEncoding);
        const keyFormat = keyEncoding.format;
        const valueFormat = valueEncoding2.format;
        if (options.keyEncoding !== keyFormat || options.valueEncoding !== valueFormat) {
          options = Object.assign({}, options, { keyEncoding: keyFormat, valueEncoding: valueFormat });
        }
        const mappedKeys = new Array(keys.length);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const err = this._checkKey(key);
          if (err) {
            this.nextTick(callback, err);
            return callback[kPromise];
          }
          mappedKeys[i] = this.prefixKey(keyEncoding.encode(key), keyFormat);
        }
        this._getMany(mappedKeys, options, (err, values) => {
          if (err)
            return callback(err);
          try {
            for (let i = 0; i < values.length; i++) {
              if (values[i] !== void 0) {
                values[i] = valueEncoding2.decode(values[i]);
              }
            }
          } catch (err2) {
            return callback(new ModuleError(`Could not decode one or more of ${values.length} value(s)`, {
              code: "LEVEL_DECODE_ERROR",
              cause: err2
            }));
          }
          callback(null, values);
        });
        return callback[kPromise];
      }
      _getMany(keys, options, callback) {
        this.nextTick(callback, null, new Array(keys.length).fill(void 0));
      }
      put(key, value, options, callback) {
        callback = getCallback(options, callback);
        callback = fromCallback(callback, kPromise);
        options = getOptions(options, this[kDefaultOptions].entry);
        if (this[kStatus] === "opening") {
          this.defer(() => this.put(key, value, options, callback));
          return callback[kPromise];
        }
        if (maybeError(this, callback)) {
          return callback[kPromise];
        }
        const err = this._checkKey(key) || this._checkValue(value);
        if (err) {
          this.nextTick(callback, err);
          return callback[kPromise];
        }
        const keyEncoding = this.keyEncoding(options.keyEncoding);
        const valueEncoding2 = this.valueEncoding(options.valueEncoding);
        const keyFormat = keyEncoding.format;
        const valueFormat = valueEncoding2.format;
        if (options.keyEncoding !== keyFormat || options.valueEncoding !== valueFormat) {
          options = Object.assign({}, options, { keyEncoding: keyFormat, valueEncoding: valueFormat });
        }
        const mappedKey = this.prefixKey(keyEncoding.encode(key), keyFormat);
        const mappedValue = valueEncoding2.encode(value);
        this._put(mappedKey, mappedValue, options, (err2) => {
          if (err2)
            return callback(err2);
          this.emit("put", key, value);
          callback();
        });
        return callback[kPromise];
      }
      _put(key, value, options, callback) {
        this.nextTick(callback);
      }
      del(key, options, callback) {
        callback = getCallback(options, callback);
        callback = fromCallback(callback, kPromise);
        options = getOptions(options, this[kDefaultOptions].key);
        if (this[kStatus] === "opening") {
          this.defer(() => this.del(key, options, callback));
          return callback[kPromise];
        }
        if (maybeError(this, callback)) {
          return callback[kPromise];
        }
        const err = this._checkKey(key);
        if (err) {
          this.nextTick(callback, err);
          return callback[kPromise];
        }
        const keyEncoding = this.keyEncoding(options.keyEncoding);
        const keyFormat = keyEncoding.format;
        if (options.keyEncoding !== keyFormat) {
          options = Object.assign({}, options, { keyEncoding: keyFormat });
        }
        this._del(this.prefixKey(keyEncoding.encode(key), keyFormat), options, (err2) => {
          if (err2)
            return callback(err2);
          this.emit("del", key);
          callback();
        });
        return callback[kPromise];
      }
      _del(key, options, callback) {
        this.nextTick(callback);
      }
      batch(operations, options, callback) {
        if (!arguments.length) {
          if (this[kStatus] === "opening")
            return new DefaultChainedBatch(this);
          if (this[kStatus] !== "open") {
            throw new ModuleError("Database is not open", {
              code: "LEVEL_DATABASE_NOT_OPEN"
            });
          }
          return this._chainedBatch();
        }
        if (typeof operations === "function")
          callback = operations;
        else
          callback = getCallback(options, callback);
        callback = fromCallback(callback, kPromise);
        options = getOptions(options, this[kDefaultOptions].empty);
        if (this[kStatus] === "opening") {
          this.defer(() => this.batch(operations, options, callback));
          return callback[kPromise];
        }
        if (maybeError(this, callback)) {
          return callback[kPromise];
        }
        if (!Array.isArray(operations)) {
          this.nextTick(callback, new TypeError("The first argument 'operations' must be an array"));
          return callback[kPromise];
        }
        if (operations.length === 0) {
          this.nextTick(callback);
          return callback[kPromise];
        }
        const mapped = new Array(operations.length);
        const { keyEncoding: ke, valueEncoding: ve, ...forward } = options;
        for (let i = 0; i < operations.length; i++) {
          if (typeof operations[i] !== "object" || operations[i] === null) {
            this.nextTick(callback, new TypeError("A batch operation must be an object"));
            return callback[kPromise];
          }
          const op = Object.assign({}, operations[i]);
          if (op.type !== "put" && op.type !== "del") {
            this.nextTick(callback, new TypeError("A batch operation must have a type property that is 'put' or 'del'"));
            return callback[kPromise];
          }
          const err = this._checkKey(op.key);
          if (err) {
            this.nextTick(callback, err);
            return callback[kPromise];
          }
          const db = op.sublevel != null ? op.sublevel : this;
          const keyEncoding = db.keyEncoding(op.keyEncoding || ke);
          const keyFormat = keyEncoding.format;
          op.key = db.prefixKey(keyEncoding.encode(op.key), keyFormat);
          op.keyEncoding = keyFormat;
          if (op.type === "put") {
            const valueErr = this._checkValue(op.value);
            if (valueErr) {
              this.nextTick(callback, valueErr);
              return callback[kPromise];
            }
            const valueEncoding2 = db.valueEncoding(op.valueEncoding || ve);
            op.value = valueEncoding2.encode(op.value);
            op.valueEncoding = valueEncoding2.format;
          }
          if (db !== this) {
            op.sublevel = null;
          }
          mapped[i] = op;
        }
        this._batch(mapped, forward, (err) => {
          if (err)
            return callback(err);
          this.emit("batch", operations);
          callback();
        });
        return callback[kPromise];
      }
      _batch(operations, options, callback) {
        this.nextTick(callback);
      }
      sublevel(name3, options) {
        return this._sublevel(name3, AbstractSublevel.defaults(options));
      }
      _sublevel(name3, options) {
        return new AbstractSublevel(this, name3, options);
      }
      prefixKey(key, keyFormat) {
        return key;
      }
      clear(options, callback) {
        callback = getCallback(options, callback);
        callback = fromCallback(callback, kPromise);
        options = getOptions(options, this[kDefaultOptions].empty);
        if (this[kStatus] === "opening") {
          this.defer(() => this.clear(options, callback));
          return callback[kPromise];
        }
        if (maybeError(this, callback)) {
          return callback[kPromise];
        }
        const original = options;
        const keyEncoding = this.keyEncoding(options.keyEncoding);
        options = rangeOptions(options, keyEncoding);
        options.keyEncoding = keyEncoding.format;
        if (options.limit === 0) {
          this.nextTick(callback);
        } else {
          this._clear(options, (err) => {
            if (err)
              return callback(err);
            this.emit("clear", original);
            callback();
          });
        }
        return callback[kPromise];
      }
      _clear(options, callback) {
        this.nextTick(callback);
      }
      iterator(options) {
        const keyEncoding = this.keyEncoding(options && options.keyEncoding);
        const valueEncoding2 = this.valueEncoding(options && options.valueEncoding);
        options = rangeOptions(options, keyEncoding);
        options.keys = options.keys !== false;
        options.values = options.values !== false;
        options[AbstractIterator.keyEncoding] = keyEncoding;
        options[AbstractIterator.valueEncoding] = valueEncoding2;
        options.keyEncoding = keyEncoding.format;
        options.valueEncoding = valueEncoding2.format;
        if (this[kStatus] === "opening") {
          return new DeferredIterator(this, options);
        } else if (this[kStatus] !== "open") {
          throw new ModuleError("Database is not open", {
            code: "LEVEL_DATABASE_NOT_OPEN"
          });
        }
        return this._iterator(options);
      }
      _iterator(options) {
        return new AbstractIterator(this, options);
      }
      keys(options) {
        const keyEncoding = this.keyEncoding(options && options.keyEncoding);
        const valueEncoding2 = this.valueEncoding(options && options.valueEncoding);
        options = rangeOptions(options, keyEncoding);
        options[AbstractIterator.keyEncoding] = keyEncoding;
        options[AbstractIterator.valueEncoding] = valueEncoding2;
        options.keyEncoding = keyEncoding.format;
        options.valueEncoding = valueEncoding2.format;
        if (this[kStatus] === "opening") {
          return new DeferredKeyIterator(this, options);
        } else if (this[kStatus] !== "open") {
          throw new ModuleError("Database is not open", {
            code: "LEVEL_DATABASE_NOT_OPEN"
          });
        }
        return this._keys(options);
      }
      _keys(options) {
        return new DefaultKeyIterator(this, options);
      }
      values(options) {
        const keyEncoding = this.keyEncoding(options && options.keyEncoding);
        const valueEncoding2 = this.valueEncoding(options && options.valueEncoding);
        options = rangeOptions(options, keyEncoding);
        options[AbstractIterator.keyEncoding] = keyEncoding;
        options[AbstractIterator.valueEncoding] = valueEncoding2;
        options.keyEncoding = keyEncoding.format;
        options.valueEncoding = valueEncoding2.format;
        if (this[kStatus] === "opening") {
          return new DeferredValueIterator(this, options);
        } else if (this[kStatus] !== "open") {
          throw new ModuleError("Database is not open", {
            code: "LEVEL_DATABASE_NOT_OPEN"
          });
        }
        return this._values(options);
      }
      _values(options) {
        return new DefaultValueIterator(this, options);
      }
      defer(fn) {
        if (typeof fn !== "function") {
          throw new TypeError("The first argument must be a function");
        }
        this[kOperations].push(fn);
      }
      [kUndefer]() {
        if (this[kOperations].length === 0) {
          return;
        }
        const operations = this[kOperations];
        this[kOperations] = [];
        for (const op of operations) {
          op();
        }
      }
      attachResource(resource) {
        if (typeof resource !== "object" || resource === null || typeof resource.close !== "function") {
          throw new TypeError("The first argument must be a resource object");
        }
        this[kResources].add(resource);
      }
      detachResource(resource) {
        this[kResources].delete(resource);
      }
      _chainedBatch() {
        return new DefaultChainedBatch(this);
      }
      _checkKey(key) {
        if (key === null || key === void 0) {
          return new ModuleError("Key cannot be null or undefined", {
            code: "LEVEL_INVALID_KEY"
          });
        }
      }
      _checkValue(value) {
        if (value === null || value === void 0) {
          return new ModuleError("Value cannot be null or undefined", {
            code: "LEVEL_INVALID_VALUE"
          });
        }
      }
    };
    AbstractLevel.prototype.nextTick = require_next_tick_browser2();
    var { AbstractSublevel } = require_abstract_sublevel()({ AbstractLevel });
    exports2.AbstractLevel = AbstractLevel;
    exports2.AbstractSublevel = AbstractSublevel;
    var maybeError = function(db, callback) {
      if (db[kStatus] !== "open") {
        db.nextTick(callback, new ModuleError("Database is not open", {
          code: "LEVEL_DATABASE_NOT_OPEN"
        }));
        return true;
      }
      return false;
    };
    var formats = function(db) {
      return Object.keys(db.supports.encodings).filter((k) => !!db.supports.encodings[k]);
    };
  }
});

// node_modules/abstract-level/index.js
var require_abstract_level2 = __commonJS({
  "node_modules/abstract-level/index.js"(exports2) {
    "use strict";
    init_node_globals();
    exports2.AbstractLevel = require_abstract_level().AbstractLevel;
    exports2.AbstractSublevel = require_abstract_level().AbstractSublevel;
    exports2.AbstractIterator = require_abstract_iterator().AbstractIterator;
    exports2.AbstractKeyIterator = require_abstract_iterator().AbstractKeyIterator;
    exports2.AbstractValueIterator = require_abstract_iterator().AbstractValueIterator;
    exports2.AbstractChainedBatch = require_abstract_chained_batch().AbstractChainedBatch;
  }
});

// node_modules/run-parallel-limit/index.js
var require_run_parallel_limit = __commonJS({
  "node_modules/run-parallel-limit/index.js"(exports2, module2) {
    init_node_globals();
    module2.exports = runParallelLimit;
    var queueMicrotask2 = require_queue_microtask();
    function runParallelLimit(tasks, limit, cb) {
      if (typeof limit !== "number")
        throw new Error("second argument must be a Number");
      let results, len, pending, keys, isErrored;
      let isSync = true;
      let next;
      if (Array.isArray(tasks)) {
        results = [];
        pending = len = tasks.length;
      } else {
        keys = Object.keys(tasks);
        results = {};
        pending = len = keys.length;
      }
      function done(err) {
        function end() {
          if (cb)
            cb(err, results);
          cb = null;
        }
        if (isSync)
          queueMicrotask2(end);
        else
          end();
      }
      function each(i, err, result) {
        results[i] = result;
        if (err)
          isErrored = true;
        if (--pending === 0 || err) {
          done(err);
        } else if (!isErrored && next < len) {
          let key;
          if (keys) {
            key = keys[next];
            next += 1;
            tasks[key](function(err2, result2) {
              each(key, err2, result2);
            });
          } else {
            key = next;
            next += 1;
            tasks[key](function(err2, result2) {
              each(key, err2, result2);
            });
          }
        }
      }
      next = limit;
      if (!pending) {
        done(null);
      } else if (keys) {
        keys.some(function(key, i) {
          tasks[key](function(err, result) {
            each(key, err, result);
          });
          if (i === limit - 1)
            return true;
          return false;
        });
      } else {
        tasks.some(function(task, i) {
          task(function(err, result) {
            each(i, err, result);
          });
          if (i === limit - 1)
            return true;
          return false;
        });
      }
      isSync = false;
    }
  }
});

// node_modules/browser-level/util/key-range.js
var require_key_range = __commonJS({
  "node_modules/browser-level/util/key-range.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    module2.exports = function createKeyRange(options) {
      const lower = options.gte !== void 0 ? options.gte : options.gt !== void 0 ? options.gt : void 0;
      const upper = options.lte !== void 0 ? options.lte : options.lt !== void 0 ? options.lt : void 0;
      const lowerExclusive = options.gte === void 0;
      const upperExclusive = options.lte === void 0;
      if (lower !== void 0 && upper !== void 0) {
        return IDBKeyRange.bound(lower, upper, lowerExclusive, upperExclusive);
      } else if (lower !== void 0) {
        return IDBKeyRange.lowerBound(lower, lowerExclusive);
      } else if (upper !== void 0) {
        return IDBKeyRange.upperBound(upper, upperExclusive);
      } else {
        return null;
      }
    };
  }
});

// node_modules/browser-level/util/deserialize.js
var require_deserialize = __commonJS({
  "node_modules/browser-level/util/deserialize.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    var textEncoder3 = new TextEncoder();
    module2.exports = function(data) {
      if (data instanceof Uint8Array) {
        return data;
      } else if (data instanceof ArrayBuffer) {
        return new Uint8Array(data);
      } else {
        return textEncoder3.encode(data);
      }
    };
  }
});

// node_modules/browser-level/iterator.js
var require_iterator = __commonJS({
  "node_modules/browser-level/iterator.js"(exports2) {
    "use strict";
    init_node_globals();
    var { AbstractIterator } = require_abstract_level2();
    var createKeyRange = require_key_range();
    var deserialize = require_deserialize();
    var kCache = Symbol("cache");
    var kFinished = Symbol("finished");
    var kOptions = Symbol("options");
    var kCurrentOptions = Symbol("currentOptions");
    var kPosition = Symbol("position");
    var kLocation = Symbol("location");
    var kFirst = Symbol("first");
    var emptyOptions = {};
    var Iterator = class extends AbstractIterator {
      constructor(db, location, options) {
        super(db, options);
        this[kCache] = [];
        this[kFinished] = this.limit === 0;
        this[kOptions] = options;
        this[kCurrentOptions] = { ...options };
        this[kPosition] = void 0;
        this[kLocation] = location;
        this[kFirst] = true;
      }
      _nextv(size, options, callback) {
        this[kFirst] = false;
        if (this[kFinished]) {
          return this.nextTick(callback, null, []);
        } else if (this[kCache].length > 0) {
          size = Math.min(size, this[kCache].length);
          return this.nextTick(callback, null, this[kCache].splice(0, size));
        }
        if (this[kPosition] !== void 0) {
          if (this[kOptions].reverse) {
            this[kCurrentOptions].lt = this[kPosition];
            this[kCurrentOptions].lte = void 0;
          } else {
            this[kCurrentOptions].gt = this[kPosition];
            this[kCurrentOptions].gte = void 0;
          }
        }
        let keyRange;
        try {
          keyRange = createKeyRange(this[kCurrentOptions]);
        } catch (_) {
          this[kFinished] = true;
          return this.nextTick(callback, null, []);
        }
        const transaction = this.db.db.transaction([this[kLocation]], "readonly");
        const store = transaction.objectStore(this[kLocation]);
        const entries = [];
        if (!this[kOptions].reverse) {
          let keys;
          let values;
          const complete = () => {
            if (keys === void 0 || values === void 0)
              return;
            const length3 = Math.max(keys.length, values.length);
            if (length3 === 0 || size === Infinity) {
              this[kFinished] = true;
            } else {
              this[kPosition] = keys[length3 - 1];
            }
            entries.length = length3;
            for (let i = 0; i < length3; i++) {
              const key = keys[i];
              const value = values[i];
              entries[i] = [
                this[kOptions].keys && key !== void 0 ? deserialize(key) : void 0,
                this[kOptions].values && value !== void 0 ? deserialize(value) : void 0
              ];
            }
            maybeCommit(transaction);
          };
          if (this[kOptions].keys || size < Infinity) {
            store.getAllKeys(keyRange, size < Infinity ? size : void 0).onsuccess = (ev) => {
              keys = ev.target.result;
              complete();
            };
          } else {
            keys = [];
            this.nextTick(complete);
          }
          if (this[kOptions].values) {
            store.getAll(keyRange, size < Infinity ? size : void 0).onsuccess = (ev) => {
              values = ev.target.result;
              complete();
            };
          } else {
            values = [];
            this.nextTick(complete);
          }
        } else {
          const method = !this[kOptions].values && store.openKeyCursor ? "openKeyCursor" : "openCursor";
          store[method](keyRange, "prev").onsuccess = (ev) => {
            const cursor = ev.target.result;
            if (cursor) {
              const { key, value } = cursor;
              this[kPosition] = key;
              entries.push([
                this[kOptions].keys && key !== void 0 ? deserialize(key) : void 0,
                this[kOptions].values && value !== void 0 ? deserialize(value) : void 0
              ]);
              if (entries.length < size) {
                cursor.continue();
              } else {
                maybeCommit(transaction);
              }
            } else {
              this[kFinished] = true;
            }
          };
        }
        transaction.onabort = () => {
          callback(transaction.error || new Error("aborted by user"));
          callback = null;
        };
        transaction.oncomplete = () => {
          callback(null, entries);
          callback = null;
        };
      }
      _next(callback) {
        if (this[kCache].length > 0) {
          const [key, value] = this[kCache].shift();
          this.nextTick(callback, null, key, value);
        } else if (this[kFinished]) {
          this.nextTick(callback);
        } else {
          let size = Math.min(100, this.limit - this.count);
          if (this[kFirst]) {
            this[kFirst] = false;
            size = 1;
          }
          this._nextv(size, emptyOptions, (err, entries) => {
            if (err)
              return callback(err);
            this[kCache] = entries;
            this._next(callback);
          });
        }
      }
      _all(options, callback) {
        this[kFirst] = false;
        const cache3 = this[kCache].splice(0, this[kCache].length);
        const size = this.limit - this.count - cache3.length;
        if (size <= 0) {
          return this.nextTick(callback, null, cache3);
        }
        this._nextv(size, emptyOptions, (err, entries) => {
          if (err)
            return callback(err);
          if (cache3.length > 0)
            entries = cache3.concat(entries);
          callback(null, entries);
        });
      }
      _seek(target, options) {
        this[kFirst] = true;
        this[kCache] = [];
        this[kFinished] = false;
        this[kPosition] = void 0;
        this[kCurrentOptions] = { ...this[kOptions] };
        let keyRange;
        try {
          keyRange = createKeyRange(this[kOptions]);
        } catch (_) {
          this[kFinished] = true;
          return;
        }
        if (keyRange !== null && !keyRange.includes(target)) {
          this[kFinished] = true;
        } else if (this[kOptions].reverse) {
          this[kCurrentOptions].lte = target;
        } else {
          this[kCurrentOptions].gte = target;
        }
      }
    };
    exports2.Iterator = Iterator;
    function maybeCommit(transaction) {
      if (typeof transaction.commit === "function") {
        transaction.commit();
      }
    }
  }
});

// node_modules/browser-level/util/clear.js
var require_clear = __commonJS({
  "node_modules/browser-level/util/clear.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    module2.exports = function clear(db, location, keyRange, options, callback) {
      if (options.limit === 0)
        return db.nextTick(callback);
      const transaction = db.db.transaction([location], "readwrite");
      const store = transaction.objectStore(location);
      let count = 0;
      transaction.oncomplete = function() {
        callback();
      };
      transaction.onabort = function() {
        callback(transaction.error || new Error("aborted by user"));
      };
      const method = store.openKeyCursor ? "openKeyCursor" : "openCursor";
      const direction = options.reverse ? "prev" : "next";
      store[method](keyRange, direction).onsuccess = function(ev) {
        const cursor = ev.target.result;
        if (cursor) {
          store.delete(cursor.key).onsuccess = function() {
            if (options.limit <= 0 || ++count < options.limit) {
              cursor.continue();
            }
          };
        }
      };
    };
  }
});

// node_modules/browser-level/index.js
var require_browser_level = __commonJS({
  "node_modules/browser-level/index.js"(exports2) {
    "use strict";
    init_node_globals();
    var { AbstractLevel } = require_abstract_level2();
    var ModuleError = require_module_error();
    var parallel = require_run_parallel_limit();
    var { fromCallback } = require_catering();
    var { Iterator } = require_iterator();
    var deserialize = require_deserialize();
    var clear = require_clear();
    var createKeyRange = require_key_range();
    var DEFAULT_PREFIX = "level-js-";
    var kIDB = Symbol("idb");
    var kNamePrefix = Symbol("namePrefix");
    var kLocation = Symbol("location");
    var kVersion = Symbol("version");
    var kStore = Symbol("store");
    var kOnComplete = Symbol("onComplete");
    var kPromise = Symbol("promise");
    var BrowserLevel = class extends AbstractLevel {
      constructor(location, options, _) {
        if (typeof options === "function" || typeof _ === "function") {
          throw new ModuleError("The levelup-style callback argument has been removed", {
            code: "LEVEL_LEGACY"
          });
        }
        const { prefix, version, ...forward } = options || {};
        super({
          encodings: { view: true },
          snapshots: false,
          createIfMissing: false,
          errorIfExists: false,
          seek: true
        }, forward);
        if (typeof location !== "string") {
          throw new Error("constructor requires a location string argument");
        }
        this[kLocation] = location;
        this[kNamePrefix] = prefix == null ? DEFAULT_PREFIX : prefix;
        this[kVersion] = parseInt(version || 1, 10);
        this[kIDB] = null;
      }
      get location() {
        return this[kLocation];
      }
      get namePrefix() {
        return this[kNamePrefix];
      }
      get version() {
        return this[kVersion];
      }
      get db() {
        return this[kIDB];
      }
      get type() {
        return "browser-level";
      }
      _open(options, callback) {
        const req = indexedDB.open(this[kNamePrefix] + this[kLocation], this[kVersion]);
        req.onerror = function() {
          callback(req.error || new Error("unknown error"));
        };
        req.onsuccess = () => {
          this[kIDB] = req.result;
          callback();
        };
        req.onupgradeneeded = (ev) => {
          const db = ev.target.result;
          if (!db.objectStoreNames.contains(this[kLocation])) {
            db.createObjectStore(this[kLocation]);
          }
        };
      }
      [kStore](mode) {
        const transaction = this[kIDB].transaction([this[kLocation]], mode);
        return transaction.objectStore(this[kLocation]);
      }
      [kOnComplete](request, callback) {
        const transaction = request.transaction;
        transaction.onabort = function() {
          callback(transaction.error || new Error("aborted by user"));
        };
        transaction.oncomplete = function() {
          callback(null, request.result);
        };
      }
      _get(key, options, callback) {
        const store = this[kStore]("readonly");
        let req;
        try {
          req = store.get(key);
        } catch (err) {
          return this.nextTick(callback, err);
        }
        this[kOnComplete](req, function(err, value) {
          if (err)
            return callback(err);
          if (value === void 0) {
            return callback(new ModuleError("Entry not found", {
              code: "LEVEL_NOT_FOUND"
            }));
          }
          callback(null, deserialize(value));
        });
      }
      _getMany(keys, options, callback) {
        const store = this[kStore]("readonly");
        const tasks = keys.map((key) => (next) => {
          let request;
          try {
            request = store.get(key);
          } catch (err) {
            return next(err);
          }
          request.onsuccess = () => {
            const value = request.result;
            next(null, value === void 0 ? value : deserialize(value));
          };
          request.onerror = (ev) => {
            ev.stopPropagation();
            next(request.error);
          };
        });
        parallel(tasks, 16, callback);
      }
      _del(key, options, callback) {
        const store = this[kStore]("readwrite");
        let req;
        try {
          req = store.delete(key);
        } catch (err) {
          return this.nextTick(callback, err);
        }
        this[kOnComplete](req, callback);
      }
      _put(key, value, options, callback) {
        const store = this[kStore]("readwrite");
        let req;
        try {
          req = store.put(value, key);
        } catch (err) {
          return this.nextTick(callback, err);
        }
        this[kOnComplete](req, callback);
      }
      _iterator(options) {
        return new Iterator(this, this[kLocation], options);
      }
      _batch(operations, options, callback) {
        const store = this[kStore]("readwrite");
        const transaction = store.transaction;
        let index = 0;
        let error;
        transaction.onabort = function() {
          callback(error || transaction.error || new Error("aborted by user"));
        };
        transaction.oncomplete = function() {
          callback();
        };
        function loop() {
          const op = operations[index++];
          const key = op.key;
          let req;
          try {
            req = op.type === "del" ? store.delete(key) : store.put(op.value, key);
          } catch (err) {
            error = err;
            transaction.abort();
            return;
          }
          if (index < operations.length) {
            req.onsuccess = loop;
          } else if (typeof transaction.commit === "function") {
            transaction.commit();
          }
        }
        loop();
      }
      _clear(options, callback) {
        let keyRange;
        let req;
        try {
          keyRange = createKeyRange(options);
        } catch (e) {
          return this.nextTick(callback);
        }
        if (options.limit >= 0) {
          return clear(this, this[kLocation], keyRange, options, callback);
        }
        try {
          const store = this[kStore]("readwrite");
          req = keyRange ? store.delete(keyRange) : store.clear();
        } catch (err) {
          return this.nextTick(callback, err);
        }
        this[kOnComplete](req, callback);
      }
      _close(callback) {
        this[kIDB].close();
        this.nextTick(callback);
      }
    };
    BrowserLevel.destroy = function(location, prefix, callback) {
      if (typeof prefix === "function") {
        callback = prefix;
        prefix = DEFAULT_PREFIX;
      }
      callback = fromCallback(callback, kPromise);
      const request = indexedDB.deleteDatabase(prefix + location);
      request.onsuccess = function() {
        callback();
      };
      request.onerror = function(err) {
        callback(err);
      };
      return callback[kPromise];
    };
    exports2.BrowserLevel = BrowserLevel;
  }
});

// node_modules/level/browser.js
var require_browser2 = __commonJS({
  "node_modules/level/browser.js"(exports2) {
    init_node_globals();
    exports2.Level = require_browser_level().BrowserLevel;
  }
});

// node_modules/node-forge/lib/forge.js
var require_forge = __commonJS({
  "node_modules/node-forge/lib/forge.js"(exports2, module2) {
    init_node_globals();
    module2.exports = {
      options: {
        usePureJavaScript: false
      }
    };
  }
});

// node_modules/node-forge/lib/baseN.js
var require_baseN = __commonJS({
  "node_modules/node-forge/lib/baseN.js"(exports2, module2) {
    init_node_globals();
    var api = {};
    module2.exports = api;
    var _reverseAlphabets = {};
    api.encode = function(input, alphabet2, maxline) {
      if (typeof alphabet2 !== "string") {
        throw new TypeError('"alphabet" must be a string.');
      }
      if (maxline !== void 0 && typeof maxline !== "number") {
        throw new TypeError('"maxline" must be a number.');
      }
      var output2 = "";
      if (!(input instanceof Uint8Array)) {
        output2 = _encodeWithByteBuffer(input, alphabet2);
      } else {
        var i = 0;
        var base3 = alphabet2.length;
        var first = alphabet2.charAt(0);
        var digits = [0];
        for (i = 0; i < input.length; ++i) {
          for (var j = 0, carry = input[i]; j < digits.length; ++j) {
            carry += digits[j] << 8;
            digits[j] = carry % base3;
            carry = carry / base3 | 0;
          }
          while (carry > 0) {
            digits.push(carry % base3);
            carry = carry / base3 | 0;
          }
        }
        for (i = 0; input[i] === 0 && i < input.length - 1; ++i) {
          output2 += first;
        }
        for (i = digits.length - 1; i >= 0; --i) {
          output2 += alphabet2[digits[i]];
        }
      }
      if (maxline) {
        var regex = new RegExp(".{1," + maxline + "}", "g");
        output2 = output2.match(regex).join("\r\n");
      }
      return output2;
    };
    api.decode = function(input, alphabet2) {
      if (typeof input !== "string") {
        throw new TypeError('"input" must be a string.');
      }
      if (typeof alphabet2 !== "string") {
        throw new TypeError('"alphabet" must be a string.');
      }
      var table = _reverseAlphabets[alphabet2];
      if (!table) {
        table = _reverseAlphabets[alphabet2] = [];
        for (var i = 0; i < alphabet2.length; ++i) {
          table[alphabet2.charCodeAt(i)] = i;
        }
      }
      input = input.replace(/\s/g, "");
      var base3 = alphabet2.length;
      var first = alphabet2.charAt(0);
      var bytes2 = [0];
      for (var i = 0; i < input.length; i++) {
        var value = table[input.charCodeAt(i)];
        if (value === void 0) {
          return;
        }
        for (var j = 0, carry = value; j < bytes2.length; ++j) {
          carry += bytes2[j] * base3;
          bytes2[j] = carry & 255;
          carry >>= 8;
        }
        while (carry > 0) {
          bytes2.push(carry & 255);
          carry >>= 8;
        }
      }
      for (var k = 0; input[k] === first && k < input.length - 1; ++k) {
        bytes2.push(0);
      }
      if (typeof Buffer !== "undefined") {
        return Buffer.from(bytes2.reverse());
      }
      return new Uint8Array(bytes2.reverse());
    };
    function _encodeWithByteBuffer(input, alphabet2) {
      var i = 0;
      var base3 = alphabet2.length;
      var first = alphabet2.charAt(0);
      var digits = [0];
      for (i = 0; i < input.length(); ++i) {
        for (var j = 0, carry = input.at(i); j < digits.length; ++j) {
          carry += digits[j] << 8;
          digits[j] = carry % base3;
          carry = carry / base3 | 0;
        }
        while (carry > 0) {
          digits.push(carry % base3);
          carry = carry / base3 | 0;
        }
      }
      var output2 = "";
      for (i = 0; input.at(i) === 0 && i < input.length() - 1; ++i) {
        output2 += first;
      }
      for (i = digits.length - 1; i >= 0; --i) {
        output2 += alphabet2[digits[i]];
      }
      return output2;
    }
  }
});

// node_modules/node-forge/lib/util.js
var require_util = __commonJS({
  "node_modules/node-forge/lib/util.js"(exports2, module2) {
    init_node_globals();
    var forge7 = require_forge();
    var baseN = require_baseN();
    var util2 = module2.exports = forge7.util = forge7.util || {};
    (function() {
      if (typeof process !== "undefined" && process.nextTick && !process.browser) {
        util2.nextTick = process.nextTick;
        if (typeof setImmediate === "function") {
          util2.setImmediate = setImmediate;
        } else {
          util2.setImmediate = util2.nextTick;
        }
        return;
      }
      if (typeof setImmediate === "function") {
        util2.setImmediate = function() {
          return setImmediate.apply(void 0, arguments);
        };
        util2.nextTick = function(callback) {
          return setImmediate(callback);
        };
        return;
      }
      util2.setImmediate = function(callback) {
        setTimeout(callback, 0);
      };
      if (typeof window !== "undefined" && typeof window.postMessage === "function") {
        let handler2 = function(event) {
          if (event.source === window && event.data === msg) {
            event.stopPropagation();
            var copy = callbacks.slice();
            callbacks.length = 0;
            copy.forEach(function(callback) {
              callback();
            });
          }
        };
        var handler = handler2;
        var msg = "forge.setImmediate";
        var callbacks = [];
        util2.setImmediate = function(callback) {
          callbacks.push(callback);
          if (callbacks.length === 1) {
            window.postMessage(msg, "*");
          }
        };
        window.addEventListener("message", handler2, true);
      }
      if (typeof MutationObserver !== "undefined") {
        var now = Date.now();
        var attr = true;
        var div = document.createElement("div");
        var callbacks = [];
        new MutationObserver(function() {
          var copy = callbacks.slice();
          callbacks.length = 0;
          copy.forEach(function(callback) {
            callback();
          });
        }).observe(div, { attributes: true });
        var oldSetImmediate = util2.setImmediate;
        util2.setImmediate = function(callback) {
          if (Date.now() - now > 15) {
            now = Date.now();
            oldSetImmediate(callback);
          } else {
            callbacks.push(callback);
            if (callbacks.length === 1) {
              div.setAttribute("a", attr = !attr);
            }
          }
        };
      }
      util2.nextTick = util2.setImmediate;
    })();
    util2.isNodejs = typeof process !== "undefined" && process.versions && process.versions.node;
    util2.globalScope = function() {
      if (util2.isNodejs) {
        return global;
      }
      return typeof self === "undefined" ? window : self;
    }();
    util2.isArray = Array.isArray || function(x) {
      return Object.prototype.toString.call(x) === "[object Array]";
    };
    util2.isArrayBuffer = function(x) {
      return typeof ArrayBuffer !== "undefined" && x instanceof ArrayBuffer;
    };
    util2.isArrayBufferView = function(x) {
      return x && util2.isArrayBuffer(x.buffer) && x.byteLength !== void 0;
    };
    function _checkBitsParam(n) {
      if (!(n === 8 || n === 16 || n === 24 || n === 32)) {
        throw new Error("Only 8, 16, 24, or 32 bits supported: " + n);
      }
    }
    util2.ByteBuffer = ByteStringBuffer;
    function ByteStringBuffer(b) {
      this.data = "";
      this.read = 0;
      if (typeof b === "string") {
        this.data = b;
      } else if (util2.isArrayBuffer(b) || util2.isArrayBufferView(b)) {
        if (typeof Buffer !== "undefined" && b instanceof Buffer) {
          this.data = b.toString("binary");
        } else {
          var arr = new Uint8Array(b);
          try {
            this.data = String.fromCharCode.apply(null, arr);
          } catch (e) {
            for (var i = 0; i < arr.length; ++i) {
              this.putByte(arr[i]);
            }
          }
        }
      } else if (b instanceof ByteStringBuffer || typeof b === "object" && typeof b.data === "string" && typeof b.read === "number") {
        this.data = b.data;
        this.read = b.read;
      }
      this._constructedStringLength = 0;
    }
    util2.ByteStringBuffer = ByteStringBuffer;
    var _MAX_CONSTRUCTED_STRING_LENGTH = 4096;
    util2.ByteStringBuffer.prototype._optimizeConstructedString = function(x) {
      this._constructedStringLength += x;
      if (this._constructedStringLength > _MAX_CONSTRUCTED_STRING_LENGTH) {
        this.data.substr(0, 1);
        this._constructedStringLength = 0;
      }
    };
    util2.ByteStringBuffer.prototype.length = function() {
      return this.data.length - this.read;
    };
    util2.ByteStringBuffer.prototype.isEmpty = function() {
      return this.length() <= 0;
    };
    util2.ByteStringBuffer.prototype.putByte = function(b) {
      return this.putBytes(String.fromCharCode(b));
    };
    util2.ByteStringBuffer.prototype.fillWithByte = function(b, n) {
      b = String.fromCharCode(b);
      var d = this.data;
      while (n > 0) {
        if (n & 1) {
          d += b;
        }
        n >>>= 1;
        if (n > 0) {
          b += b;
        }
      }
      this.data = d;
      this._optimizeConstructedString(n);
      return this;
    };
    util2.ByteStringBuffer.prototype.putBytes = function(bytes2) {
      this.data += bytes2;
      this._optimizeConstructedString(bytes2.length);
      return this;
    };
    util2.ByteStringBuffer.prototype.putString = function(str) {
      return this.putBytes(util2.encodeUtf8(str));
    };
    util2.ByteStringBuffer.prototype.putInt16 = function(i) {
      return this.putBytes(String.fromCharCode(i >> 8 & 255) + String.fromCharCode(i & 255));
    };
    util2.ByteStringBuffer.prototype.putInt24 = function(i) {
      return this.putBytes(String.fromCharCode(i >> 16 & 255) + String.fromCharCode(i >> 8 & 255) + String.fromCharCode(i & 255));
    };
    util2.ByteStringBuffer.prototype.putInt32 = function(i) {
      return this.putBytes(String.fromCharCode(i >> 24 & 255) + String.fromCharCode(i >> 16 & 255) + String.fromCharCode(i >> 8 & 255) + String.fromCharCode(i & 255));
    };
    util2.ByteStringBuffer.prototype.putInt16Le = function(i) {
      return this.putBytes(String.fromCharCode(i & 255) + String.fromCharCode(i >> 8 & 255));
    };
    util2.ByteStringBuffer.prototype.putInt24Le = function(i) {
      return this.putBytes(String.fromCharCode(i & 255) + String.fromCharCode(i >> 8 & 255) + String.fromCharCode(i >> 16 & 255));
    };
    util2.ByteStringBuffer.prototype.putInt32Le = function(i) {
      return this.putBytes(String.fromCharCode(i & 255) + String.fromCharCode(i >> 8 & 255) + String.fromCharCode(i >> 16 & 255) + String.fromCharCode(i >> 24 & 255));
    };
    util2.ByteStringBuffer.prototype.putInt = function(i, n) {
      _checkBitsParam(n);
      var bytes2 = "";
      do {
        n -= 8;
        bytes2 += String.fromCharCode(i >> n & 255);
      } while (n > 0);
      return this.putBytes(bytes2);
    };
    util2.ByteStringBuffer.prototype.putSignedInt = function(i, n) {
      if (i < 0) {
        i += 2 << n - 1;
      }
      return this.putInt(i, n);
    };
    util2.ByteStringBuffer.prototype.putBuffer = function(buffer2) {
      return this.putBytes(buffer2.getBytes());
    };
    util2.ByteStringBuffer.prototype.getByte = function() {
      return this.data.charCodeAt(this.read++);
    };
    util2.ByteStringBuffer.prototype.getInt16 = function() {
      var rval = this.data.charCodeAt(this.read) << 8 ^ this.data.charCodeAt(this.read + 1);
      this.read += 2;
      return rval;
    };
    util2.ByteStringBuffer.prototype.getInt24 = function() {
      var rval = this.data.charCodeAt(this.read) << 16 ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2);
      this.read += 3;
      return rval;
    };
    util2.ByteStringBuffer.prototype.getInt32 = function() {
      var rval = this.data.charCodeAt(this.read) << 24 ^ this.data.charCodeAt(this.read + 1) << 16 ^ this.data.charCodeAt(this.read + 2) << 8 ^ this.data.charCodeAt(this.read + 3);
      this.read += 4;
      return rval;
    };
    util2.ByteStringBuffer.prototype.getInt16Le = function() {
      var rval = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8;
      this.read += 2;
      return rval;
    };
    util2.ByteStringBuffer.prototype.getInt24Le = function() {
      var rval = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2) << 16;
      this.read += 3;
      return rval;
    };
    util2.ByteStringBuffer.prototype.getInt32Le = function() {
      var rval = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2) << 16 ^ this.data.charCodeAt(this.read + 3) << 24;
      this.read += 4;
      return rval;
    };
    util2.ByteStringBuffer.prototype.getInt = function(n) {
      _checkBitsParam(n);
      var rval = 0;
      do {
        rval = (rval << 8) + this.data.charCodeAt(this.read++);
        n -= 8;
      } while (n > 0);
      return rval;
    };
    util2.ByteStringBuffer.prototype.getSignedInt = function(n) {
      var x = this.getInt(n);
      var max = 2 << n - 2;
      if (x >= max) {
        x -= max << 1;
      }
      return x;
    };
    util2.ByteStringBuffer.prototype.getBytes = function(count) {
      var rval;
      if (count) {
        count = Math.min(this.length(), count);
        rval = this.data.slice(this.read, this.read + count);
        this.read += count;
      } else if (count === 0) {
        rval = "";
      } else {
        rval = this.read === 0 ? this.data : this.data.slice(this.read);
        this.clear();
      }
      return rval;
    };
    util2.ByteStringBuffer.prototype.bytes = function(count) {
      return typeof count === "undefined" ? this.data.slice(this.read) : this.data.slice(this.read, this.read + count);
    };
    util2.ByteStringBuffer.prototype.at = function(i) {
      return this.data.charCodeAt(this.read + i);
    };
    util2.ByteStringBuffer.prototype.setAt = function(i, b) {
      this.data = this.data.substr(0, this.read + i) + String.fromCharCode(b) + this.data.substr(this.read + i + 1);
      return this;
    };
    util2.ByteStringBuffer.prototype.last = function() {
      return this.data.charCodeAt(this.data.length - 1);
    };
    util2.ByteStringBuffer.prototype.copy = function() {
      var c = util2.createBuffer(this.data);
      c.read = this.read;
      return c;
    };
    util2.ByteStringBuffer.prototype.compact = function() {
      if (this.read > 0) {
        this.data = this.data.slice(this.read);
        this.read = 0;
      }
      return this;
    };
    util2.ByteStringBuffer.prototype.clear = function() {
      this.data = "";
      this.read = 0;
      return this;
    };
    util2.ByteStringBuffer.prototype.truncate = function(count) {
      var len = Math.max(0, this.length() - count);
      this.data = this.data.substr(this.read, len);
      this.read = 0;
      return this;
    };
    util2.ByteStringBuffer.prototype.toHex = function() {
      var rval = "";
      for (var i = this.read; i < this.data.length; ++i) {
        var b = this.data.charCodeAt(i);
        if (b < 16) {
          rval += "0";
        }
        rval += b.toString(16);
      }
      return rval;
    };
    util2.ByteStringBuffer.prototype.toString = function() {
      return util2.decodeUtf8(this.bytes());
    };
    function DataBuffer(b, options) {
      options = options || {};
      this.read = options.readOffset || 0;
      this.growSize = options.growSize || 1024;
      var isArrayBuffer = util2.isArrayBuffer(b);
      var isArrayBufferView = util2.isArrayBufferView(b);
      if (isArrayBuffer || isArrayBufferView) {
        if (isArrayBuffer) {
          this.data = new DataView(b);
        } else {
          this.data = new DataView(b.buffer, b.byteOffset, b.byteLength);
        }
        this.write = "writeOffset" in options ? options.writeOffset : this.data.byteLength;
        return;
      }
      this.data = new DataView(new ArrayBuffer(0));
      this.write = 0;
      if (b !== null && b !== void 0) {
        this.putBytes(b);
      }
      if ("writeOffset" in options) {
        this.write = options.writeOffset;
      }
    }
    util2.DataBuffer = DataBuffer;
    util2.DataBuffer.prototype.length = function() {
      return this.write - this.read;
    };
    util2.DataBuffer.prototype.isEmpty = function() {
      return this.length() <= 0;
    };
    util2.DataBuffer.prototype.accommodate = function(amount, growSize) {
      if (this.length() >= amount) {
        return this;
      }
      growSize = Math.max(growSize || this.growSize, amount);
      var src3 = new Uint8Array(this.data.buffer, this.data.byteOffset, this.data.byteLength);
      var dst = new Uint8Array(this.length() + growSize);
      dst.set(src3);
      this.data = new DataView(dst.buffer);
      return this;
    };
    util2.DataBuffer.prototype.putByte = function(b) {
      this.accommodate(1);
      this.data.setUint8(this.write++, b);
      return this;
    };
    util2.DataBuffer.prototype.fillWithByte = function(b, n) {
      this.accommodate(n);
      for (var i = 0; i < n; ++i) {
        this.data.setUint8(b);
      }
      return this;
    };
    util2.DataBuffer.prototype.putBytes = function(bytes2, encoding) {
      if (util2.isArrayBufferView(bytes2)) {
        var src3 = new Uint8Array(bytes2.buffer, bytes2.byteOffset, bytes2.byteLength);
        var len = src3.byteLength - src3.byteOffset;
        this.accommodate(len);
        var dst = new Uint8Array(this.data.buffer, this.write);
        dst.set(src3);
        this.write += len;
        return this;
      }
      if (util2.isArrayBuffer(bytes2)) {
        var src3 = new Uint8Array(bytes2);
        this.accommodate(src3.byteLength);
        var dst = new Uint8Array(this.data.buffer);
        dst.set(src3, this.write);
        this.write += src3.byteLength;
        return this;
      }
      if (bytes2 instanceof util2.DataBuffer || typeof bytes2 === "object" && typeof bytes2.read === "number" && typeof bytes2.write === "number" && util2.isArrayBufferView(bytes2.data)) {
        var src3 = new Uint8Array(bytes2.data.byteLength, bytes2.read, bytes2.length());
        this.accommodate(src3.byteLength);
        var dst = new Uint8Array(bytes2.data.byteLength, this.write);
        dst.set(src3);
        this.write += src3.byteLength;
        return this;
      }
      if (bytes2 instanceof util2.ByteStringBuffer) {
        bytes2 = bytes2.data;
        encoding = "binary";
      }
      encoding = encoding || "binary";
      if (typeof bytes2 === "string") {
        var view;
        if (encoding === "hex") {
          this.accommodate(Math.ceil(bytes2.length / 2));
          view = new Uint8Array(this.data.buffer, this.write);
          this.write += util2.binary.hex.decode(bytes2, view, this.write);
          return this;
        }
        if (encoding === "base64") {
          this.accommodate(Math.ceil(bytes2.length / 4) * 3);
          view = new Uint8Array(this.data.buffer, this.write);
          this.write += util2.binary.base64.decode(bytes2, view, this.write);
          return this;
        }
        if (encoding === "utf8") {
          bytes2 = util2.encodeUtf8(bytes2);
          encoding = "binary";
        }
        if (encoding === "binary" || encoding === "raw") {
          this.accommodate(bytes2.length);
          view = new Uint8Array(this.data.buffer, this.write);
          this.write += util2.binary.raw.decode(view);
          return this;
        }
        if (encoding === "utf16") {
          this.accommodate(bytes2.length * 2);
          view = new Uint16Array(this.data.buffer, this.write);
          this.write += util2.text.utf16.encode(view);
          return this;
        }
        throw new Error("Invalid encoding: " + encoding);
      }
      throw Error("Invalid parameter: " + bytes2);
    };
    util2.DataBuffer.prototype.putBuffer = function(buffer2) {
      this.putBytes(buffer2);
      buffer2.clear();
      return this;
    };
    util2.DataBuffer.prototype.putString = function(str) {
      return this.putBytes(str, "utf16");
    };
    util2.DataBuffer.prototype.putInt16 = function(i) {
      this.accommodate(2);
      this.data.setInt16(this.write, i);
      this.write += 2;
      return this;
    };
    util2.DataBuffer.prototype.putInt24 = function(i) {
      this.accommodate(3);
      this.data.setInt16(this.write, i >> 8 & 65535);
      this.data.setInt8(this.write, i >> 16 & 255);
      this.write += 3;
      return this;
    };
    util2.DataBuffer.prototype.putInt32 = function(i) {
      this.accommodate(4);
      this.data.setInt32(this.write, i);
      this.write += 4;
      return this;
    };
    util2.DataBuffer.prototype.putInt16Le = function(i) {
      this.accommodate(2);
      this.data.setInt16(this.write, i, true);
      this.write += 2;
      return this;
    };
    util2.DataBuffer.prototype.putInt24Le = function(i) {
      this.accommodate(3);
      this.data.setInt8(this.write, i >> 16 & 255);
      this.data.setInt16(this.write, i >> 8 & 65535, true);
      this.write += 3;
      return this;
    };
    util2.DataBuffer.prototype.putInt32Le = function(i) {
      this.accommodate(4);
      this.data.setInt32(this.write, i, true);
      this.write += 4;
      return this;
    };
    util2.DataBuffer.prototype.putInt = function(i, n) {
      _checkBitsParam(n);
      this.accommodate(n / 8);
      do {
        n -= 8;
        this.data.setInt8(this.write++, i >> n & 255);
      } while (n > 0);
      return this;
    };
    util2.DataBuffer.prototype.putSignedInt = function(i, n) {
      _checkBitsParam(n);
      this.accommodate(n / 8);
      if (i < 0) {
        i += 2 << n - 1;
      }
      return this.putInt(i, n);
    };
    util2.DataBuffer.prototype.getByte = function() {
      return this.data.getInt8(this.read++);
    };
    util2.DataBuffer.prototype.getInt16 = function() {
      var rval = this.data.getInt16(this.read);
      this.read += 2;
      return rval;
    };
    util2.DataBuffer.prototype.getInt24 = function() {
      var rval = this.data.getInt16(this.read) << 8 ^ this.data.getInt8(this.read + 2);
      this.read += 3;
      return rval;
    };
    util2.DataBuffer.prototype.getInt32 = function() {
      var rval = this.data.getInt32(this.read);
      this.read += 4;
      return rval;
    };
    util2.DataBuffer.prototype.getInt16Le = function() {
      var rval = this.data.getInt16(this.read, true);
      this.read += 2;
      return rval;
    };
    util2.DataBuffer.prototype.getInt24Le = function() {
      var rval = this.data.getInt8(this.read) ^ this.data.getInt16(this.read + 1, true) << 8;
      this.read += 3;
      return rval;
    };
    util2.DataBuffer.prototype.getInt32Le = function() {
      var rval = this.data.getInt32(this.read, true);
      this.read += 4;
      return rval;
    };
    util2.DataBuffer.prototype.getInt = function(n) {
      _checkBitsParam(n);
      var rval = 0;
      do {
        rval = (rval << 8) + this.data.getInt8(this.read++);
        n -= 8;
      } while (n > 0);
      return rval;
    };
    util2.DataBuffer.prototype.getSignedInt = function(n) {
      var x = this.getInt(n);
      var max = 2 << n - 2;
      if (x >= max) {
        x -= max << 1;
      }
      return x;
    };
    util2.DataBuffer.prototype.getBytes = function(count) {
      var rval;
      if (count) {
        count = Math.min(this.length(), count);
        rval = this.data.slice(this.read, this.read + count);
        this.read += count;
      } else if (count === 0) {
        rval = "";
      } else {
        rval = this.read === 0 ? this.data : this.data.slice(this.read);
        this.clear();
      }
      return rval;
    };
    util2.DataBuffer.prototype.bytes = function(count) {
      return typeof count === "undefined" ? this.data.slice(this.read) : this.data.slice(this.read, this.read + count);
    };
    util2.DataBuffer.prototype.at = function(i) {
      return this.data.getUint8(this.read + i);
    };
    util2.DataBuffer.prototype.setAt = function(i, b) {
      this.data.setUint8(i, b);
      return this;
    };
    util2.DataBuffer.prototype.last = function() {
      return this.data.getUint8(this.write - 1);
    };
    util2.DataBuffer.prototype.copy = function() {
      return new util2.DataBuffer(this);
    };
    util2.DataBuffer.prototype.compact = function() {
      if (this.read > 0) {
        var src3 = new Uint8Array(this.data.buffer, this.read);
        var dst = new Uint8Array(src3.byteLength);
        dst.set(src3);
        this.data = new DataView(dst);
        this.write -= this.read;
        this.read = 0;
      }
      return this;
    };
    util2.DataBuffer.prototype.clear = function() {
      this.data = new DataView(new ArrayBuffer(0));
      this.read = this.write = 0;
      return this;
    };
    util2.DataBuffer.prototype.truncate = function(count) {
      this.write = Math.max(0, this.length() - count);
      this.read = Math.min(this.read, this.write);
      return this;
    };
    util2.DataBuffer.prototype.toHex = function() {
      var rval = "";
      for (var i = this.read; i < this.data.byteLength; ++i) {
        var b = this.data.getUint8(i);
        if (b < 16) {
          rval += "0";
        }
        rval += b.toString(16);
      }
      return rval;
    };
    util2.DataBuffer.prototype.toString = function(encoding) {
      var view = new Uint8Array(this.data, this.read, this.length());
      encoding = encoding || "utf8";
      if (encoding === "binary" || encoding === "raw") {
        return util2.binary.raw.encode(view);
      }
      if (encoding === "hex") {
        return util2.binary.hex.encode(view);
      }
      if (encoding === "base64") {
        return util2.binary.base64.encode(view);
      }
      if (encoding === "utf8") {
        return util2.text.utf8.decode(view);
      }
      if (encoding === "utf16") {
        return util2.text.utf16.decode(view);
      }
      throw new Error("Invalid encoding: " + encoding);
    };
    util2.createBuffer = function(input, encoding) {
      encoding = encoding || "raw";
      if (input !== void 0 && encoding === "utf8") {
        input = util2.encodeUtf8(input);
      }
      return new util2.ByteBuffer(input);
    };
    util2.fillString = function(c, n) {
      var s = "";
      while (n > 0) {
        if (n & 1) {
          s += c;
        }
        n >>>= 1;
        if (n > 0) {
          c += c;
        }
      }
      return s;
    };
    util2.xorBytes = function(s1, s2, n) {
      var s3 = "";
      var b = "";
      var t = "";
      var i = 0;
      var c = 0;
      for (; n > 0; --n, ++i) {
        b = s1.charCodeAt(i) ^ s2.charCodeAt(i);
        if (c >= 10) {
          s3 += t;
          t = "";
          c = 0;
        }
        t += String.fromCharCode(b);
        ++c;
      }
      s3 += t;
      return s3;
    };
    util2.hexToBytes = function(hex) {
      var rval = "";
      var i = 0;
      if (hex.length & true) {
        i = 1;
        rval += String.fromCharCode(parseInt(hex[0], 16));
      }
      for (; i < hex.length; i += 2) {
        rval += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      }
      return rval;
    };
    util2.bytesToHex = function(bytes2) {
      return util2.createBuffer(bytes2).toHex();
    };
    util2.int32ToBytes = function(i) {
      return String.fromCharCode(i >> 24 & 255) + String.fromCharCode(i >> 16 & 255) + String.fromCharCode(i >> 8 & 255) + String.fromCharCode(i & 255);
    };
    var _base64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var _base64Idx = [
      62,
      -1,
      -1,
      -1,
      63,
      52,
      53,
      54,
      55,
      56,
      57,
      58,
      59,
      60,
      61,
      -1,
      -1,
      -1,
      64,
      -1,
      -1,
      -1,
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33,
      34,
      35,
      36,
      37,
      38,
      39,
      40,
      41,
      42,
      43,
      44,
      45,
      46,
      47,
      48,
      49,
      50,
      51
    ];
    var _base58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    util2.encode64 = function(input, maxline) {
      var line = "";
      var output2 = "";
      var chr1, chr2, chr3;
      var i = 0;
      while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        line += _base64.charAt(chr1 >> 2);
        line += _base64.charAt((chr1 & 3) << 4 | chr2 >> 4);
        if (isNaN(chr2)) {
          line += "==";
        } else {
          line += _base64.charAt((chr2 & 15) << 2 | chr3 >> 6);
          line += isNaN(chr3) ? "=" : _base64.charAt(chr3 & 63);
        }
        if (maxline && line.length > maxline) {
          output2 += line.substr(0, maxline) + "\r\n";
          line = line.substr(maxline);
        }
      }
      output2 += line;
      return output2;
    };
    util2.decode64 = function(input) {
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      var output2 = "";
      var enc1, enc2, enc3, enc4;
      var i = 0;
      while (i < input.length) {
        enc1 = _base64Idx[input.charCodeAt(i++) - 43];
        enc2 = _base64Idx[input.charCodeAt(i++) - 43];
        enc3 = _base64Idx[input.charCodeAt(i++) - 43];
        enc4 = _base64Idx[input.charCodeAt(i++) - 43];
        output2 += String.fromCharCode(enc1 << 2 | enc2 >> 4);
        if (enc3 !== 64) {
          output2 += String.fromCharCode((enc2 & 15) << 4 | enc3 >> 2);
          if (enc4 !== 64) {
            output2 += String.fromCharCode((enc3 & 3) << 6 | enc4);
          }
        }
      }
      return output2;
    };
    util2.encodeUtf8 = function(str) {
      return unescape(encodeURIComponent(str));
    };
    util2.decodeUtf8 = function(str) {
      return decodeURIComponent(escape(str));
    };
    util2.binary = {
      raw: {},
      hex: {},
      base64: {},
      base58: {},
      baseN: {
        encode: baseN.encode,
        decode: baseN.decode
      }
    };
    util2.binary.raw.encode = function(bytes2) {
      return String.fromCharCode.apply(null, bytes2);
    };
    util2.binary.raw.decode = function(str, output2, offset) {
      var out = output2;
      if (!out) {
        out = new Uint8Array(str.length);
      }
      offset = offset || 0;
      var j = offset;
      for (var i = 0; i < str.length; ++i) {
        out[j++] = str.charCodeAt(i);
      }
      return output2 ? j - offset : out;
    };
    util2.binary.hex.encode = util2.bytesToHex;
    util2.binary.hex.decode = function(hex, output2, offset) {
      var out = output2;
      if (!out) {
        out = new Uint8Array(Math.ceil(hex.length / 2));
      }
      offset = offset || 0;
      var i = 0, j = offset;
      if (hex.length & 1) {
        i = 1;
        out[j++] = parseInt(hex[0], 16);
      }
      for (; i < hex.length; i += 2) {
        out[j++] = parseInt(hex.substr(i, 2), 16);
      }
      return output2 ? j - offset : out;
    };
    util2.binary.base64.encode = function(input, maxline) {
      var line = "";
      var output2 = "";
      var chr1, chr2, chr3;
      var i = 0;
      while (i < input.byteLength) {
        chr1 = input[i++];
        chr2 = input[i++];
        chr3 = input[i++];
        line += _base64.charAt(chr1 >> 2);
        line += _base64.charAt((chr1 & 3) << 4 | chr2 >> 4);
        if (isNaN(chr2)) {
          line += "==";
        } else {
          line += _base64.charAt((chr2 & 15) << 2 | chr3 >> 6);
          line += isNaN(chr3) ? "=" : _base64.charAt(chr3 & 63);
        }
        if (maxline && line.length > maxline) {
          output2 += line.substr(0, maxline) + "\r\n";
          line = line.substr(maxline);
        }
      }
      output2 += line;
      return output2;
    };
    util2.binary.base64.decode = function(input, output2, offset) {
      var out = output2;
      if (!out) {
        out = new Uint8Array(Math.ceil(input.length / 4) * 3);
      }
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      offset = offset || 0;
      var enc1, enc2, enc3, enc4;
      var i = 0, j = offset;
      while (i < input.length) {
        enc1 = _base64Idx[input.charCodeAt(i++) - 43];
        enc2 = _base64Idx[input.charCodeAt(i++) - 43];
        enc3 = _base64Idx[input.charCodeAt(i++) - 43];
        enc4 = _base64Idx[input.charCodeAt(i++) - 43];
        out[j++] = enc1 << 2 | enc2 >> 4;
        if (enc3 !== 64) {
          out[j++] = (enc2 & 15) << 4 | enc3 >> 2;
          if (enc4 !== 64) {
            out[j++] = (enc3 & 3) << 6 | enc4;
          }
        }
      }
      return output2 ? j - offset : out.subarray(0, j);
    };
    util2.binary.base58.encode = function(input, maxline) {
      return util2.binary.baseN.encode(input, _base58, maxline);
    };
    util2.binary.base58.decode = function(input, maxline) {
      return util2.binary.baseN.decode(input, _base58, maxline);
    };
    util2.text = {
      utf8: {},
      utf16: {}
    };
    util2.text.utf8.encode = function(str, output2, offset) {
      str = util2.encodeUtf8(str);
      var out = output2;
      if (!out) {
        out = new Uint8Array(str.length);
      }
      offset = offset || 0;
      var j = offset;
      for (var i = 0; i < str.length; ++i) {
        out[j++] = str.charCodeAt(i);
      }
      return output2 ? j - offset : out;
    };
    util2.text.utf8.decode = function(bytes2) {
      return util2.decodeUtf8(String.fromCharCode.apply(null, bytes2));
    };
    util2.text.utf16.encode = function(str, output2, offset) {
      var out = output2;
      if (!out) {
        out = new Uint8Array(str.length * 2);
      }
      var view = new Uint16Array(out.buffer);
      offset = offset || 0;
      var j = offset;
      var k = offset;
      for (var i = 0; i < str.length; ++i) {
        view[k++] = str.charCodeAt(i);
        j += 2;
      }
      return output2 ? j - offset : out;
    };
    util2.text.utf16.decode = function(bytes2) {
      return String.fromCharCode.apply(null, new Uint16Array(bytes2.buffer));
    };
    util2.deflate = function(api, bytes2, raw) {
      bytes2 = util2.decode64(api.deflate(util2.encode64(bytes2)).rval);
      if (raw) {
        var start = 2;
        var flg = bytes2.charCodeAt(1);
        if (flg & 32) {
          start = 6;
        }
        bytes2 = bytes2.substring(start, bytes2.length - 4);
      }
      return bytes2;
    };
    util2.inflate = function(api, bytes2, raw) {
      var rval = api.inflate(util2.encode64(bytes2)).rval;
      return rval === null ? null : util2.decode64(rval);
    };
    var _setStorageObject = function(api, id, obj) {
      if (!api) {
        throw new Error("WebStorage not available.");
      }
      var rval;
      if (obj === null) {
        rval = api.removeItem(id);
      } else {
        obj = util2.encode64(JSON.stringify(obj));
        rval = api.setItem(id, obj);
      }
      if (typeof rval !== "undefined" && rval.rval !== true) {
        var error = new Error(rval.error.message);
        error.id = rval.error.id;
        error.name = rval.error.name;
        throw error;
      }
    };
    var _getStorageObject = function(api, id) {
      if (!api) {
        throw new Error("WebStorage not available.");
      }
      var rval = api.getItem(id);
      if (api.init) {
        if (rval.rval === null) {
          if (rval.error) {
            var error = new Error(rval.error.message);
            error.id = rval.error.id;
            error.name = rval.error.name;
            throw error;
          }
          rval = null;
        } else {
          rval = rval.rval;
        }
      }
      if (rval !== null) {
        rval = JSON.parse(util2.decode64(rval));
      }
      return rval;
    };
    var _setItem = function(api, id, key, data) {
      var obj = _getStorageObject(api, id);
      if (obj === null) {
        obj = {};
      }
      obj[key] = data;
      _setStorageObject(api, id, obj);
    };
    var _getItem = function(api, id, key) {
      var rval = _getStorageObject(api, id);
      if (rval !== null) {
        rval = key in rval ? rval[key] : null;
      }
      return rval;
    };
    var _removeItem = function(api, id, key) {
      var obj = _getStorageObject(api, id);
      if (obj !== null && key in obj) {
        delete obj[key];
        var empty3 = true;
        for (var prop in obj) {
          empty3 = false;
          break;
        }
        if (empty3) {
          obj = null;
        }
        _setStorageObject(api, id, obj);
      }
    };
    var _clearItems = function(api, id) {
      _setStorageObject(api, id, null);
    };
    var _callStorageFunction = function(func, args, location) {
      var rval = null;
      if (typeof location === "undefined") {
        location = ["web", "flash"];
      }
      var type7;
      var done = false;
      var exception = null;
      for (var idx in location) {
        type7 = location[idx];
        try {
          if (type7 === "flash" || type7 === "both") {
            if (args[0] === null) {
              throw new Error("Flash local storage not available.");
            }
            rval = func.apply(this, args);
            done = type7 === "flash";
          }
          if (type7 === "web" || type7 === "both") {
            args[0] = localStorage;
            rval = func.apply(this, args);
            done = true;
          }
        } catch (ex) {
          exception = ex;
        }
        if (done) {
          break;
        }
      }
      if (!done) {
        throw exception;
      }
      return rval;
    };
    util2.setItem = function(api, id, key, data, location) {
      _callStorageFunction(_setItem, arguments, location);
    };
    util2.getItem = function(api, id, key, location) {
      return _callStorageFunction(_getItem, arguments, location);
    };
    util2.removeItem = function(api, id, key, location) {
      _callStorageFunction(_removeItem, arguments, location);
    };
    util2.clearItems = function(api, id, location) {
      _callStorageFunction(_clearItems, arguments, location);
    };
    util2.isEmpty = function(obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          return false;
        }
      }
      return true;
    };
    util2.format = function(format3) {
      var re = /%./g;
      var match;
      var part;
      var argi = 0;
      var parts = [];
      var last = 0;
      while (match = re.exec(format3)) {
        part = format3.substring(last, re.lastIndex - 2);
        if (part.length > 0) {
          parts.push(part);
        }
        last = re.lastIndex;
        var code3 = match[0][1];
        switch (code3) {
          case "s":
          case "o":
            if (argi < arguments.length) {
              parts.push(arguments[argi++ + 1]);
            } else {
              parts.push("<?>");
            }
            break;
          case "%":
            parts.push("%");
            break;
          default:
            parts.push("<%" + code3 + "?>");
        }
      }
      parts.push(format3.substring(last));
      return parts.join("");
    };
    util2.formatNumber = function(number2, decimals, dec_point, thousands_sep) {
      var n = number2, c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
      var d = dec_point === void 0 ? "," : dec_point;
      var t = thousands_sep === void 0 ? "." : thousands_sep, s = n < 0 ? "-" : "";
      var i = parseInt(n = Math.abs(+n || 0).toFixed(c), 10) + "";
      var j = i.length > 3 ? i.length % 3 : 0;
      return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };
    util2.formatSize = function(size) {
      if (size >= 1073741824) {
        size = util2.formatNumber(size / 1073741824, 2, ".", "") + " GiB";
      } else if (size >= 1048576) {
        size = util2.formatNumber(size / 1048576, 2, ".", "") + " MiB";
      } else if (size >= 1024) {
        size = util2.formatNumber(size / 1024, 0) + " KiB";
      } else {
        size = util2.formatNumber(size, 0) + " bytes";
      }
      return size;
    };
    util2.bytesFromIP = function(ip) {
      if (ip.indexOf(".") !== -1) {
        return util2.bytesFromIPv4(ip);
      }
      if (ip.indexOf(":") !== -1) {
        return util2.bytesFromIPv6(ip);
      }
      return null;
    };
    util2.bytesFromIPv4 = function(ip) {
      ip = ip.split(".");
      if (ip.length !== 4) {
        return null;
      }
      var b = util2.createBuffer();
      for (var i = 0; i < ip.length; ++i) {
        var num = parseInt(ip[i], 10);
        if (isNaN(num)) {
          return null;
        }
        b.putByte(num);
      }
      return b.getBytes();
    };
    util2.bytesFromIPv6 = function(ip) {
      var blanks = 0;
      ip = ip.split(":").filter(function(e) {
        if (e.length === 0)
          ++blanks;
        return true;
      });
      var zeros = (8 - ip.length + blanks) * 2;
      var b = util2.createBuffer();
      for (var i = 0; i < 8; ++i) {
        if (!ip[i] || ip[i].length === 0) {
          b.fillWithByte(0, zeros);
          zeros = 0;
          continue;
        }
        var bytes2 = util2.hexToBytes(ip[i]);
        if (bytes2.length < 2) {
          b.putByte(0);
        }
        b.putBytes(bytes2);
      }
      return b.getBytes();
    };
    util2.bytesToIP = function(bytes2) {
      if (bytes2.length === 4) {
        return util2.bytesToIPv4(bytes2);
      }
      if (bytes2.length === 16) {
        return util2.bytesToIPv6(bytes2);
      }
      return null;
    };
    util2.bytesToIPv4 = function(bytes2) {
      if (bytes2.length !== 4) {
        return null;
      }
      var ip = [];
      for (var i = 0; i < bytes2.length; ++i) {
        ip.push(bytes2.charCodeAt(i));
      }
      return ip.join(".");
    };
    util2.bytesToIPv6 = function(bytes2) {
      if (bytes2.length !== 16) {
        return null;
      }
      var ip = [];
      var zeroGroups = [];
      var zeroMaxGroup = 0;
      for (var i = 0; i < bytes2.length; i += 2) {
        var hex = util2.bytesToHex(bytes2[i] + bytes2[i + 1]);
        while (hex[0] === "0" && hex !== "0") {
          hex = hex.substr(1);
        }
        if (hex === "0") {
          var last = zeroGroups[zeroGroups.length - 1];
          var idx = ip.length;
          if (!last || idx !== last.end + 1) {
            zeroGroups.push({ start: idx, end: idx });
          } else {
            last.end = idx;
            if (last.end - last.start > zeroGroups[zeroMaxGroup].end - zeroGroups[zeroMaxGroup].start) {
              zeroMaxGroup = zeroGroups.length - 1;
            }
          }
        }
        ip.push(hex);
      }
      if (zeroGroups.length > 0) {
        var group = zeroGroups[zeroMaxGroup];
        if (group.end - group.start > 0) {
          ip.splice(group.start, group.end - group.start + 1, "");
          if (group.start === 0) {
            ip.unshift("");
          }
          if (group.end === 7) {
            ip.push("");
          }
        }
      }
      return ip.join(":");
    };
    util2.estimateCores = function(options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      options = options || {};
      if ("cores" in util2 && !options.update) {
        return callback(null, util2.cores);
      }
      if (typeof navigator !== "undefined" && "hardwareConcurrency" in navigator && navigator.hardwareConcurrency > 0) {
        util2.cores = navigator.hardwareConcurrency;
        return callback(null, util2.cores);
      }
      if (typeof Worker === "undefined") {
        util2.cores = 1;
        return callback(null, util2.cores);
      }
      if (typeof Blob === "undefined") {
        util2.cores = 2;
        return callback(null, util2.cores);
      }
      var blobUrl = URL.createObjectURL(new Blob([
        "(",
        function() {
          self.addEventListener("message", function(e) {
            var st = Date.now();
            var et = st + 4;
            while (Date.now() < et)
              ;
            self.postMessage({ st, et });
          });
        }.toString(),
        ")()"
      ], { type: "application/javascript" }));
      sample([], 5, 16);
      function sample(max, samples, numWorkers) {
        if (samples === 0) {
          var avg = Math.floor(max.reduce(function(avg2, x) {
            return avg2 + x;
          }, 0) / max.length);
          util2.cores = Math.max(1, avg);
          URL.revokeObjectURL(blobUrl);
          return callback(null, util2.cores);
        }
        map(numWorkers, function(err, results) {
          max.push(reduce(numWorkers, results));
          sample(max, samples - 1, numWorkers);
        });
      }
      function map(numWorkers, callback2) {
        var workers = [];
        var results = [];
        for (var i = 0; i < numWorkers; ++i) {
          var worker = new Worker(blobUrl);
          worker.addEventListener("message", function(e) {
            results.push(e.data);
            if (results.length === numWorkers) {
              for (var i2 = 0; i2 < numWorkers; ++i2) {
                workers[i2].terminate();
              }
              callback2(null, results);
            }
          });
          workers.push(worker);
        }
        for (var i = 0; i < numWorkers; ++i) {
          workers[i].postMessage(i);
        }
      }
      function reduce(numWorkers, results) {
        var overlaps = [];
        for (var n = 0; n < numWorkers; ++n) {
          var r1 = results[n];
          var overlap = overlaps[n] = [];
          for (var i = 0; i < numWorkers; ++i) {
            if (n === i) {
              continue;
            }
            var r2 = results[i];
            if (r1.st > r2.st && r1.st < r2.et || r2.st > r1.st && r2.st < r1.et) {
              overlap.push(i);
            }
          }
        }
        return overlaps.reduce(function(max, overlap2) {
          return Math.max(max, overlap2.length);
        }, 0);
      }
    };
  }
});

// node_modules/node-forge/lib/cipher.js
var require_cipher = __commonJS({
  "node_modules/node-forge/lib/cipher.js"(exports2, module2) {
    init_node_globals();
    var forge7 = require_forge();
    require_util();
    module2.exports = forge7.cipher = forge7.cipher || {};
    forge7.cipher.algorithms = forge7.cipher.algorithms || {};
    forge7.cipher.createCipher = function(algorithm, key) {
      var api = algorithm;
      if (typeof api === "string") {
        api = forge7.cipher.getAlgorithm(api);
        if (api) {
          api = api();
        }
      }
      if (!api) {
        throw new Error("Unsupported algorithm: " + algorithm);
      }
      return new forge7.cipher.BlockCipher({
        algorithm: api,
        key,
        decrypt: false
      });
    };
    forge7.cipher.createDecipher = function(algorithm, key) {
      var api = algorithm;
      if (typeof api === "string") {
        api = forge7.cipher.getAlgorithm(api);
        if (api) {
          api = api();
        }
      }
      if (!api) {
        throw new Error("Unsupported algorithm: " + algorithm);
      }
      return new forge7.cipher.BlockCipher({
        algorithm: api,
        key,
        decrypt: true
      });
    };
    forge7.cipher.registerAlgorithm = function(name3, algorithm) {
      name3 = name3.toUpperCase();
      forge7.cipher.algorithms[name3] = algorithm;
    };
    forge7.cipher.getAlgorithm = function(name3) {
      name3 = name3.toUpperCase();
      if (name3 in forge7.cipher.algorithms) {
        return forge7.cipher.algorithms[name3];
      }
      return null;
    };
    var BlockCipher = forge7.cipher.BlockCipher = function(options) {
      this.algorithm = options.algorithm;
      this.mode = this.algorithm.mode;
      this.blockSize = this.mode.blockSize;
      this._finish = false;
      this._input = null;
      this.output = null;
      this._op = options.decrypt ? this.mode.decrypt : this.mode.encrypt;
      this._decrypt = options.decrypt;
      this.algorithm.initialize(options);
    };
    BlockCipher.prototype.start = function(options) {
      options = options || {};
      var opts = {};
      for (var key in options) {
        opts[key] = options[key];
      }
      opts.decrypt = this._decrypt;
      this._finish = false;
      this._input = forge7.util.createBuffer();
      this.output = options.output || forge7.util.createBuffer();
      this.mode.start(opts);
    };
    BlockCipher.prototype.update = function(input) {
      if (input) {
        this._input.putBuffer(input);
      }
      while (!this._op.call(this.mode, this._input, this.output, this._finish) && !this._finish) {
      }
      this._input.compact();
    };
    BlockCipher.prototype.finish = function(pad) {
      if (pad && (this.mode.name === "ECB" || this.mode.name === "CBC")) {
        this.mode.pad = function(input) {
          return pad(this.blockSize, input, false);
        };
        this.mode.unpad = function(output2) {
          return pad(this.blockSize, output2, true);
        };
      }
      var options = {};
      options.decrypt = this._decrypt;
      options.overflow = this._input.length() % this.blockSize;
      if (!this._decrypt && this.mode.pad) {
        if (!this.mode.pad(this._input, options)) {
          return false;
        }
      }
      this._finish = true;
      this.update();
      if (this._decrypt && this.mode.unpad) {
        if (!this.mode.unpad(this.output, options)) {
          return false;
        }
      }
      if (this.mode.afterFinish) {
        if (!this.mode.afterFinish(this.output, options)) {
          return false;
        }
      }
      return true;
    };
  }
});

// node_modules/node-forge/lib/cipherModes.js
var require_cipherModes = __commonJS({
  "node_modules/node-forge/lib/cipherModes.js"(exports2, module2) {
    init_node_globals();
    var forge7 = require_forge();
    require_util();
    forge7.cipher = forge7.cipher || {};
    var modes = module2.exports = forge7.cipher.modes = forge7.cipher.modes || {};
    modes.ecb = function(options) {
      options = options || {};
      this.name = "ECB";
      this.cipher = options.cipher;
      this.blockSize = options.blockSize || 16;
      this._ints = this.blockSize / 4;
      this._inBlock = new Array(this._ints);
      this._outBlock = new Array(this._ints);
    };
    modes.ecb.prototype.start = function(options) {
    };
    modes.ecb.prototype.encrypt = function(input, output2, finish) {
      if (input.length() < this.blockSize && !(finish && input.length() > 0)) {
        return true;
      }
      for (var i = 0; i < this._ints; ++i) {
        this._inBlock[i] = input.getInt32();
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      for (var i = 0; i < this._ints; ++i) {
        output2.putInt32(this._outBlock[i]);
      }
    };
    modes.ecb.prototype.decrypt = function(input, output2, finish) {
      if (input.length() < this.blockSize && !(finish && input.length() > 0)) {
        return true;
      }
      for (var i = 0; i < this._ints; ++i) {
        this._inBlock[i] = input.getInt32();
      }
      this.cipher.decrypt(this._inBlock, this._outBlock);
      for (var i = 0; i < this._ints; ++i) {
        output2.putInt32(this._outBlock[i]);
      }
    };
    modes.ecb.prototype.pad = function(input, options) {
      var padding = input.length() === this.blockSize ? this.blockSize : this.blockSize - input.length();
      input.fillWithByte(padding, padding);
      return true;
    };
    modes.ecb.prototype.unpad = function(output2, options) {
      if (options.overflow > 0) {
        return false;
      }
      var len = output2.length();
      var count = output2.at(len - 1);
      if (count > this.blockSize << 2) {
        return false;
      }
      output2.truncate(count);
      return true;
    };
    modes.cbc = function(options) {
      options = options || {};
      this.name = "CBC";
      this.cipher = options.cipher;
      this.blockSize = options.blockSize || 16;
      this._ints = this.blockSize / 4;
      this._inBlock = new Array(this._ints);
      this._outBlock = new Array(this._ints);
    };
    modes.cbc.prototype.start = function(options) {
      if (options.iv === null) {
        if (!this._prev) {
          throw new Error("Invalid IV parameter.");
        }
        this._iv = this._prev.slice(0);
      } else if (!("iv" in options)) {
        throw new Error("Invalid IV parameter.");
      } else {
        this._iv = transformIV(options.iv, this.blockSize);
        this._prev = this._iv.slice(0);
      }
    };
    modes.cbc.prototype.encrypt = function(input, output2, finish) {
      if (input.length() < this.blockSize && !(finish && input.length() > 0)) {
        return true;
      }
      for (var i = 0; i < this._ints; ++i) {
        this._inBlock[i] = this._prev[i] ^ input.getInt32();
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      for (var i = 0; i < this._ints; ++i) {
        output2.putInt32(this._outBlock[i]);
      }
      this._prev = this._outBlock;
    };
    modes.cbc.prototype.decrypt = function(input, output2, finish) {
      if (input.length() < this.blockSize && !(finish && input.length() > 0)) {
        return true;
      }
      for (var i = 0; i < this._ints; ++i) {
        this._inBlock[i] = input.getInt32();
      }
      this.cipher.decrypt(this._inBlock, this._outBlock);
      for (var i = 0; i < this._ints; ++i) {
        output2.putInt32(this._prev[i] ^ this._outBlock[i]);
      }
      this._prev = this._inBlock.slice(0);
    };
    modes.cbc.prototype.pad = function(input, options) {
      var padding = input.length() === this.blockSize ? this.blockSize : this.blockSize - input.length();
      input.fillWithByte(padding, padding);
      return true;
    };
    modes.cbc.prototype.unpad = function(output2, options) {
      if (options.overflow > 0) {
        return false;
      }
      var len = output2.length();
      var count = output2.at(len - 1);
      if (count > this.blockSize << 2) {
        return false;
      }
      output2.truncate(count);
      return true;
    };
    modes.cfb = function(options) {
      options = options || {};
      this.name = "CFB";
      this.cipher = options.cipher;
      this.blockSize = options.blockSize || 16;
      this._ints = this.blockSize / 4;
      this._inBlock = null;
      this._outBlock = new Array(this._ints);
      this._partialBlock = new Array(this._ints);
      this._partialOutput = forge7.util.createBuffer();
      this._partialBytes = 0;
    };
    modes.cfb.prototype.start = function(options) {
      if (!("iv" in options)) {
        throw new Error("Invalid IV parameter.");
      }
      this._iv = transformIV(options.iv, this.blockSize);
      this._inBlock = this._iv.slice(0);
      this._partialBytes = 0;
    };
    modes.cfb.prototype.encrypt = function(input, output2, finish) {
      var inputLength = input.length();
      if (inputLength === 0) {
        return true;
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      if (this._partialBytes === 0 && inputLength >= this.blockSize) {
        for (var i = 0; i < this._ints; ++i) {
          this._inBlock[i] = input.getInt32() ^ this._outBlock[i];
          output2.putInt32(this._inBlock[i]);
        }
        return;
      }
      var partialBytes = (this.blockSize - inputLength) % this.blockSize;
      if (partialBytes > 0) {
        partialBytes = this.blockSize - partialBytes;
      }
      this._partialOutput.clear();
      for (var i = 0; i < this._ints; ++i) {
        this._partialBlock[i] = input.getInt32() ^ this._outBlock[i];
        this._partialOutput.putInt32(this._partialBlock[i]);
      }
      if (partialBytes > 0) {
        input.read -= this.blockSize;
      } else {
        for (var i = 0; i < this._ints; ++i) {
          this._inBlock[i] = this._partialBlock[i];
        }
      }
      if (this._partialBytes > 0) {
        this._partialOutput.getBytes(this._partialBytes);
      }
      if (partialBytes > 0 && !finish) {
        output2.putBytes(this._partialOutput.getBytes(partialBytes - this._partialBytes));
        this._partialBytes = partialBytes;
        return true;
      }
      output2.putBytes(this._partialOutput.getBytes(inputLength - this._partialBytes));
      this._partialBytes = 0;
    };
    modes.cfb.prototype.decrypt = function(input, output2, finish) {
      var inputLength = input.length();
      if (inputLength === 0) {
        return true;
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      if (this._partialBytes === 0 && inputLength >= this.blockSize) {
        for (var i = 0; i < this._ints; ++i) {
          this._inBlock[i] = input.getInt32();
          output2.putInt32(this._inBlock[i] ^ this._outBlock[i]);
        }
        return;
      }
      var partialBytes = (this.blockSize - inputLength) % this.blockSize;
      if (partialBytes > 0) {
        partialBytes = this.blockSize - partialBytes;
      }
      this._partialOutput.clear();
      for (var i = 0; i < this._ints; ++i) {
        this._partialBlock[i] = input.getInt32();
        this._partialOutput.putInt32(this._partialBlock[i] ^ this._outBlock[i]);
      }
      if (partialBytes > 0) {
        input.read -= this.blockSize;
      } else {
        for (var i = 0; i < this._ints; ++i) {
          this._inBlock[i] = this._partialBlock[i];
        }
      }
      if (this._partialBytes > 0) {
        this._partialOutput.getBytes(this._partialBytes);
      }
      if (partialBytes > 0 && !finish) {
        output2.putBytes(this._partialOutput.getBytes(partialBytes - this._partialBytes));
        this._partialBytes = partialBytes;
        return true;
      }
      output2.putBytes(this._partialOutput.getBytes(inputLength - this._partialBytes));
      this._partialBytes = 0;
    };
    modes.ofb = function(options) {
      options = options || {};
      this.name = "OFB";
      this.cipher = options.cipher;
      this.blockSize = options.blockSize || 16;
      this._ints = this.blockSize / 4;
      this._inBlock = null;
      this._outBlock = new Array(this._ints);
      this._partialOutput = forge7.util.createBuffer();
      this._partialBytes = 0;
    };
    modes.ofb.prototype.start = function(options) {
      if (!("iv" in options)) {
        throw new Error("Invalid IV parameter.");
      }
      this._iv = transformIV(options.iv, this.blockSize);
      this._inBlock = this._iv.slice(0);
      this._partialBytes = 0;
    };
    modes.ofb.prototype.encrypt = function(input, output2, finish) {
      var inputLength = input.length();
      if (input.length() === 0) {
        return true;
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      if (this._partialBytes === 0 && inputLength >= this.blockSize) {
        for (var i = 0; i < this._ints; ++i) {
          output2.putInt32(input.getInt32() ^ this._outBlock[i]);
          this._inBlock[i] = this._outBlock[i];
        }
        return;
      }
      var partialBytes = (this.blockSize - inputLength) % this.blockSize;
      if (partialBytes > 0) {
        partialBytes = this.blockSize - partialBytes;
      }
      this._partialOutput.clear();
      for (var i = 0; i < this._ints; ++i) {
        this._partialOutput.putInt32(input.getInt32() ^ this._outBlock[i]);
      }
      if (partialBytes > 0) {
        input.read -= this.blockSize;
      } else {
        for (var i = 0; i < this._ints; ++i) {
          this._inBlock[i] = this._outBlock[i];
        }
      }
      if (this._partialBytes > 0) {
        this._partialOutput.getBytes(this._partialBytes);
      }
      if (partialBytes > 0 && !finish) {
        output2.putBytes(this._partialOutput.getBytes(partialBytes - this._partialBytes));
        this._partialBytes = partialBytes;
        return true;
      }
      output2.putBytes(this._partialOutput.getBytes(inputLength - this._partialBytes));
      this._partialBytes = 0;
    };
    modes.ofb.prototype.decrypt = modes.ofb.prototype.encrypt;
    modes.ctr = function(options) {
      options = options || {};
      this.name = "CTR";
      this.cipher = options.cipher;
      this.blockSize = options.blockSize || 16;
      this._ints = this.blockSize / 4;
      this._inBlock = null;
      this._outBlock = new Array(this._ints);
      this._partialOutput = forge7.util.createBuffer();
      this._partialBytes = 0;
    };
    modes.ctr.prototype.start = function(options) {
      if (!("iv" in options)) {
        throw new Error("Invalid IV parameter.");
      }
      this._iv = transformIV(options.iv, this.blockSize);
      this._inBlock = this._iv.slice(0);
      this._partialBytes = 0;
    };
    modes.ctr.prototype.encrypt = function(input, output2, finish) {
      var inputLength = input.length();
      if (inputLength === 0) {
        return true;
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      if (this._partialBytes === 0 && inputLength >= this.blockSize) {
        for (var i = 0; i < this._ints; ++i) {
          output2.putInt32(input.getInt32() ^ this._outBlock[i]);
        }
      } else {
        var partialBytes = (this.blockSize - inputLength) % this.blockSize;
        if (partialBytes > 0) {
          partialBytes = this.blockSize - partialBytes;
        }
        this._partialOutput.clear();
        for (var i = 0; i < this._ints; ++i) {
          this._partialOutput.putInt32(input.getInt32() ^ this._outBlock[i]);
        }
        if (partialBytes > 0) {
          input.read -= this.blockSize;
        }
        if (this._partialBytes > 0) {
          this._partialOutput.getBytes(this._partialBytes);
        }
        if (partialBytes > 0 && !finish) {
          output2.putBytes(this._partialOutput.getBytes(partialBytes - this._partialBytes));
          this._partialBytes = partialBytes;
          return true;
        }
        output2.putBytes(this._partialOutput.getBytes(inputLength - this._partialBytes));
        this._partialBytes = 0;
      }
      inc32(this._inBlock);
    };
    modes.ctr.prototype.decrypt = modes.ctr.prototype.encrypt;
    modes.gcm = function(options) {
      options = options || {};
      this.name = "GCM";
      this.cipher = options.cipher;
      this.blockSize = options.blockSize || 16;
      this._ints = this.blockSize / 4;
      this._inBlock = new Array(this._ints);
      this._outBlock = new Array(this._ints);
      this._partialOutput = forge7.util.createBuffer();
      this._partialBytes = 0;
      this._R = 3774873600;
    };
    modes.gcm.prototype.start = function(options) {
      if (!("iv" in options)) {
        throw new Error("Invalid IV parameter.");
      }
      var iv = forge7.util.createBuffer(options.iv);
      this._cipherLength = 0;
      var additionalData;
      if ("additionalData" in options) {
        additionalData = forge7.util.createBuffer(options.additionalData);
      } else {
        additionalData = forge7.util.createBuffer();
      }
      if ("tagLength" in options) {
        this._tagLength = options.tagLength;
      } else {
        this._tagLength = 128;
      }
      this._tag = null;
      if (options.decrypt) {
        this._tag = forge7.util.createBuffer(options.tag).getBytes();
        if (this._tag.length !== this._tagLength / 8) {
          throw new Error("Authentication tag does not match tag length.");
        }
      }
      this._hashBlock = new Array(this._ints);
      this.tag = null;
      this._hashSubkey = new Array(this._ints);
      this.cipher.encrypt([0, 0, 0, 0], this._hashSubkey);
      this.componentBits = 4;
      this._m = this.generateHashTable(this._hashSubkey, this.componentBits);
      var ivLength = iv.length();
      if (ivLength === 12) {
        this._j0 = [iv.getInt32(), iv.getInt32(), iv.getInt32(), 1];
      } else {
        this._j0 = [0, 0, 0, 0];
        while (iv.length() > 0) {
          this._j0 = this.ghash(this._hashSubkey, this._j0, [iv.getInt32(), iv.getInt32(), iv.getInt32(), iv.getInt32()]);
        }
        this._j0 = this.ghash(this._hashSubkey, this._j0, [0, 0].concat(from64To32(ivLength * 8)));
      }
      this._inBlock = this._j0.slice(0);
      inc32(this._inBlock);
      this._partialBytes = 0;
      additionalData = forge7.util.createBuffer(additionalData);
      this._aDataLength = from64To32(additionalData.length() * 8);
      var overflow = additionalData.length() % this.blockSize;
      if (overflow) {
        additionalData.fillWithByte(0, this.blockSize - overflow);
      }
      this._s = [0, 0, 0, 0];
      while (additionalData.length() > 0) {
        this._s = this.ghash(this._hashSubkey, this._s, [
          additionalData.getInt32(),
          additionalData.getInt32(),
          additionalData.getInt32(),
          additionalData.getInt32()
        ]);
      }
    };
    modes.gcm.prototype.encrypt = function(input, output2, finish) {
      var inputLength = input.length();
      if (inputLength === 0) {
        return true;
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      if (this._partialBytes === 0 && inputLength >= this.blockSize) {
        for (var i = 0; i < this._ints; ++i) {
          output2.putInt32(this._outBlock[i] ^= input.getInt32());
        }
        this._cipherLength += this.blockSize;
      } else {
        var partialBytes = (this.blockSize - inputLength) % this.blockSize;
        if (partialBytes > 0) {
          partialBytes = this.blockSize - partialBytes;
        }
        this._partialOutput.clear();
        for (var i = 0; i < this._ints; ++i) {
          this._partialOutput.putInt32(input.getInt32() ^ this._outBlock[i]);
        }
        if (partialBytes <= 0 || finish) {
          if (finish) {
            var overflow = inputLength % this.blockSize;
            this._cipherLength += overflow;
            this._partialOutput.truncate(this.blockSize - overflow);
          } else {
            this._cipherLength += this.blockSize;
          }
          for (var i = 0; i < this._ints; ++i) {
            this._outBlock[i] = this._partialOutput.getInt32();
          }
          this._partialOutput.read -= this.blockSize;
        }
        if (this._partialBytes > 0) {
          this._partialOutput.getBytes(this._partialBytes);
        }
        if (partialBytes > 0 && !finish) {
          input.read -= this.blockSize;
          output2.putBytes(this._partialOutput.getBytes(partialBytes - this._partialBytes));
          this._partialBytes = partialBytes;
          return true;
        }
        output2.putBytes(this._partialOutput.getBytes(inputLength - this._partialBytes));
        this._partialBytes = 0;
      }
      this._s = this.ghash(this._hashSubkey, this._s, this._outBlock);
      inc32(this._inBlock);
    };
    modes.gcm.prototype.decrypt = function(input, output2, finish) {
      var inputLength = input.length();
      if (inputLength < this.blockSize && !(finish && inputLength > 0)) {
        return true;
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      inc32(this._inBlock);
      this._hashBlock[0] = input.getInt32();
      this._hashBlock[1] = input.getInt32();
      this._hashBlock[2] = input.getInt32();
      this._hashBlock[3] = input.getInt32();
      this._s = this.ghash(this._hashSubkey, this._s, this._hashBlock);
      for (var i = 0; i < this._ints; ++i) {
        output2.putInt32(this._outBlock[i] ^ this._hashBlock[i]);
      }
      if (inputLength < this.blockSize) {
        this._cipherLength += inputLength % this.blockSize;
      } else {
        this._cipherLength += this.blockSize;
      }
    };
    modes.gcm.prototype.afterFinish = function(output2, options) {
      var rval = true;
      if (options.decrypt && options.overflow) {
        output2.truncate(this.blockSize - options.overflow);
      }
      this.tag = forge7.util.createBuffer();
      var lengths = this._aDataLength.concat(from64To32(this._cipherLength * 8));
      this._s = this.ghash(this._hashSubkey, this._s, lengths);
      var tag = [];
      this.cipher.encrypt(this._j0, tag);
      for (var i = 0; i < this._ints; ++i) {
        this.tag.putInt32(this._s[i] ^ tag[i]);
      }
      this.tag.truncate(this.tag.length() % (this._tagLength / 8));
      if (options.decrypt && this.tag.bytes() !== this._tag) {
        rval = false;
      }
      return rval;
    };
    modes.gcm.prototype.multiply = function(x, y) {
      var z_i = [0, 0, 0, 0];
      var v_i = y.slice(0);
      for (var i = 0; i < 128; ++i) {
        var x_i = x[i / 32 | 0] & 1 << 31 - i % 32;
        if (x_i) {
          z_i[0] ^= v_i[0];
          z_i[1] ^= v_i[1];
          z_i[2] ^= v_i[2];
          z_i[3] ^= v_i[3];
        }
        this.pow(v_i, v_i);
      }
      return z_i;
    };
    modes.gcm.prototype.pow = function(x, out) {
      var lsb = x[3] & 1;
      for (var i = 3; i > 0; --i) {
        out[i] = x[i] >>> 1 | (x[i - 1] & 1) << 31;
      }
      out[0] = x[0] >>> 1;
      if (lsb) {
        out[0] ^= this._R;
      }
    };
    modes.gcm.prototype.tableMultiply = function(x) {
      var z = [0, 0, 0, 0];
      for (var i = 0; i < 32; ++i) {
        var idx = i / 8 | 0;
        var x_i = x[idx] >>> (7 - i % 8) * 4 & 15;
        var ah = this._m[i][x_i];
        z[0] ^= ah[0];
        z[1] ^= ah[1];
        z[2] ^= ah[2];
        z[3] ^= ah[3];
      }
      return z;
    };
    modes.gcm.prototype.ghash = function(h, y, x) {
      y[0] ^= x[0];
      y[1] ^= x[1];
      y[2] ^= x[2];
      y[3] ^= x[3];
      return this.tableMultiply(y);
    };
    modes.gcm.prototype.generateHashTable = function(h, bits2) {
      var multiplier = 8 / bits2;
      var perInt = 4 * multiplier;
      var size = 16 * multiplier;
      var m = new Array(size);
      for (var i = 0; i < size; ++i) {
        var tmp = [0, 0, 0, 0];
        var idx = i / perInt | 0;
        var shft = (perInt - 1 - i % perInt) * bits2;
        tmp[idx] = 1 << bits2 - 1 << shft;
        m[i] = this.generateSubHashTable(this.multiply(tmp, h), bits2);
      }
      return m;
    };
    modes.gcm.prototype.generateSubHashTable = function(mid, bits2) {
      var size = 1 << bits2;
      var half = size >>> 1;
      var m = new Array(size);
      m[half] = mid.slice(0);
      var i = half >>> 1;
      while (i > 0) {
        this.pow(m[2 * i], m[i] = []);
        i >>= 1;
      }
      i = 2;
      while (i < half) {
        for (var j = 1; j < i; ++j) {
          var m_i = m[i];
          var m_j = m[j];
          m[i + j] = [
            m_i[0] ^ m_j[0],
            m_i[1] ^ m_j[1],
            m_i[2] ^ m_j[2],
            m_i[3] ^ m_j[3]
          ];
        }
        i *= 2;
      }
      m[0] = [0, 0, 0, 0];
      for (i = half + 1; i < size; ++i) {
        var c = m[i ^ half];
        m[i] = [mid[0] ^ c[0], mid[1] ^ c[1], mid[2] ^ c[2], mid[3] ^ c[3]];
      }
      return m;
    };
    function transformIV(iv, blockSize) {
      if (typeof iv === "string") {
        iv = forge7.util.createBuffer(iv);
      }
      if (forge7.util.isArray(iv) && iv.length > 4) {
        var tmp = iv;
        iv = forge7.util.createBuffer();
        for (var i = 0; i < tmp.length; ++i) {
          iv.putByte(tmp[i]);
        }
      }
      if (iv.length() < blockSize) {
        throw new Error("Invalid IV length; got " + iv.length() + " bytes and expected " + blockSize + " bytes.");
      }
      if (!forge7.util.isArray(iv)) {
        var ints = [];
        var blocks = blockSize / 4;
        for (var i = 0; i < blocks; ++i) {
          ints.push(iv.getInt32());
        }
        iv = ints;
      }
      return iv;
    }
    function inc32(block) {
      block[block.length - 1] = block[block.length - 1] + 1 & 4294967295;
    }
    function from64To32(num) {
      return [num / 4294967296 | 0, num & 4294967295];
    }
  }
});

// node_modules/node-forge/lib/aes.js
var require_aes = __commonJS({
  "node_modules/node-forge/lib/aes.js"(exports2, module2) {
    init_node_globals();
    var forge7 = require_forge();
    require_cipher();
    require_cipherModes();
    require_util();
    module2.exports = forge7.aes = forge7.aes || {};
    forge7.aes.startEncrypting = function(key, iv, output2, mode) {
      var cipher = _createCipher({
        key,
        output: output2,
        decrypt: false,
        mode
      });
      cipher.start(iv);
      return cipher;
    };
    forge7.aes.createEncryptionCipher = function(key, mode) {
      return _createCipher({
        key,
        output: null,
        decrypt: false,
        mode
      });
    };
    forge7.aes.startDecrypting = function(key, iv, output2, mode) {
      var cipher = _createCipher({
        key,
        output: output2,
        decrypt: true,
        mode
      });
      cipher.start(iv);
      return cipher;
    };
    forge7.aes.createDecryptionCipher = function(key, mode) {
      return _createCipher({
        key,
        output: null,
        decrypt: true,
        mode
      });
    };
    forge7.aes.Algorithm = function(name3, mode) {
      if (!init) {
        initialize();
      }
      var self2 = this;
      self2.name = name3;
      self2.mode = new mode({
        blockSize: 16,
        cipher: {
          encrypt: function(inBlock, outBlock) {
            return _updateBlock(self2._w, inBlock, outBlock, false);
          },
          decrypt: function(inBlock, outBlock) {
            return _updateBlock(self2._w, inBlock, outBlock, true);
          }
        }
      });
      self2._init = false;
    };
    forge7.aes.Algorithm.prototype.initialize = function(options) {
      if (this._init) {
        return;
      }
      var key = options.key;
      var tmp;
      if (typeof key === "string" && (key.length === 16 || key.length === 24 || key.length === 32)) {
        key = forge7.util.createBuffer(key);
      } else if (forge7.util.isArray(key) && (key.length === 16 || key.length === 24 || key.length === 32)) {
        tmp = key;
        key = forge7.util.createBuffer();
        for (var i = 0; i < tmp.length; ++i) {
          key.putByte(tmp[i]);
        }
      }
      if (!forge7.util.isArray(key)) {
        tmp = key;
        key = [];
        var len = tmp.length();
        if (len === 16 || len === 24 || len === 32) {
          len = len >>> 2;
          for (var i = 0; i < len; ++i) {
            key.push(tmp.getInt32());
          }
        }
      }
      if (!forge7.util.isArray(key) || !(key.length === 4 || key.length === 6 || key.length === 8)) {
        throw new Error("Invalid key parameter.");
      }
      var mode = this.mode.name;
      var encryptOp = ["CFB", "OFB", "CTR", "GCM"].indexOf(mode) !== -1;
      this._w = _expandKey(key, options.decrypt && !encryptOp);
      this._init = true;
    };
    forge7.aes._expandKey = function(key, decrypt2) {
      if (!init) {
        initialize();
      }
      return _expandKey(key, decrypt2);
    };
    forge7.aes._updateBlock = _updateBlock;
    registerAlgorithm("AES-ECB", forge7.cipher.modes.ecb);
    registerAlgorithm("AES-CBC", forge7.cipher.modes.cbc);
    registerAlgorithm("AES-CFB", forge7.cipher.modes.cfb);
    registerAlgorithm("AES-OFB", forge7.cipher.modes.ofb);
    registerAlgorithm("AES-CTR", forge7.cipher.modes.ctr);
    registerAlgorithm("AES-GCM", forge7.cipher.modes.gcm);
    function registerAlgorithm(name3, mode) {
      var factory = function() {
        return new forge7.aes.Algorithm(name3, mode);
      };
      forge7.cipher.registerAlgorithm(name3, factory);
    }
    var init = false;
    var Nb = 4;
    var sbox;
    var isbox;
    var rcon;
    var mix;
    var imix;
    function initialize() {
      init = true;
      rcon = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
      var xtime = new Array(256);
      for (var i = 0; i < 128; ++i) {
        xtime[i] = i << 1;
        xtime[i + 128] = i + 128 << 1 ^ 283;
      }
      sbox = new Array(256);
      isbox = new Array(256);
      mix = new Array(4);
      imix = new Array(4);
      for (var i = 0; i < 4; ++i) {
        mix[i] = new Array(256);
        imix[i] = new Array(256);
      }
      var e = 0, ei = 0, e2, e4, e8, sx, sx2, me, ime;
      for (var i = 0; i < 256; ++i) {
        sx = ei ^ ei << 1 ^ ei << 2 ^ ei << 3 ^ ei << 4;
        sx = sx >> 8 ^ sx & 255 ^ 99;
        sbox[e] = sx;
        isbox[sx] = e;
        sx2 = xtime[sx];
        e2 = xtime[e];
        e4 = xtime[e2];
        e8 = xtime[e4];
        me = sx2 << 24 ^ sx << 16 ^ sx << 8 ^ (sx ^ sx2);
        ime = (e2 ^ e4 ^ e8) << 24 ^ (e ^ e8) << 16 ^ (e ^ e4 ^ e8) << 8 ^ (e ^ e2 ^ e8);
        for (var n = 0; n < 4; ++n) {
          mix[n][e] = me;
          imix[n][sx] = ime;
          me = me << 24 | me >>> 8;
          ime = ime << 24 | ime >>> 8;
        }
        if (e === 0) {
          e = ei = 1;
        } else {
          e = e2 ^ xtime[xtime[xtime[e2 ^ e8]]];
          ei ^= xtime[xtime[ei]];
        }
      }
    }
    function _expandKey(key, decrypt2) {
      var w = key.slice(0);
      var temp, iNk = 1;
      var Nk = w.length;
      var Nr1 = Nk + 6 + 1;
      var end = Nb * Nr1;
      for (var i = Nk; i < end; ++i) {
        temp = w[i - 1];
        if (i % Nk === 0) {
          temp = sbox[temp >>> 16 & 255] << 24 ^ sbox[temp >>> 8 & 255] << 16 ^ sbox[temp & 255] << 8 ^ sbox[temp >>> 24] ^ rcon[iNk] << 24;
          iNk++;
        } else if (Nk > 6 && i % Nk === 4) {
          temp = sbox[temp >>> 24] << 24 ^ sbox[temp >>> 16 & 255] << 16 ^ sbox[temp >>> 8 & 255] << 8 ^ sbox[temp & 255];
        }
        w[i] = w[i - Nk] ^ temp;
      }
      if (decrypt2) {
        var tmp;
        var m0 = imix[0];
        var m1 = imix[1];
        var m2 = imix[2];
        var m3 = imix[3];
        var wnew = w.slice(0);
        end = w.length;
        for (var i = 0, wi = end - Nb; i < end; i += Nb, wi -= Nb) {
          if (i === 0 || i === end - Nb) {
            wnew[i] = w[wi];
            wnew[i + 1] = w[wi + 3];
            wnew[i + 2] = w[wi + 2];
            wnew[i + 3] = w[wi + 1];
          } else {
            for (var n = 0; n < Nb; ++n) {
              tmp = w[wi + n];
              wnew[i + (3 & -n)] = m0[sbox[tmp >>> 24]] ^ m1[sbox[tmp >>> 16 & 255]] ^ m2[sbox[tmp >>> 8 & 255]] ^ m3[sbox[tmp & 255]];
            }
          }
        }
        w = wnew;
      }
      return w;
    }
    function _updateBlock(w, input, output2, decrypt2) {
      var Nr = w.length / 4 - 1;
      var m0, m1, m2, m3, sub;
      if (decrypt2) {
        m0 = imix[0];
        m1 = imix[1];
        m2 = imix[2];
        m3 = imix[3];
        sub = isbox;
      } else {
        m0 = mix[0];
        m1 = mix[1];
        m2 = mix[2];
        m3 = mix[3];
        sub = sbox;
      }
      var a, b, c, d, a2, b2, c2;
      a = input[0] ^ w[0];
      b = input[decrypt2 ? 3 : 1] ^ w[1];
      c = input[2] ^ w[2];
      d = input[decrypt2 ? 1 : 3] ^ w[3];
      var i = 3;
      for (var round = 1; round < Nr; ++round) {
        a2 = m0[a >>> 24] ^ m1[b >>> 16 & 255] ^ m2[c >>> 8 & 255] ^ m3[d & 255] ^ w[++i];
        b2 = m0[b >>> 24] ^ m1[c >>> 16 & 255] ^ m2[d >>> 8 & 255] ^ m3[a & 255] ^ w[++i];
        c2 = m0[c >>> 24] ^ m1[d >>> 16 & 255] ^ m2[a >>> 8 & 255] ^ m3[b & 255] ^ w[++i];
        d = m0[d >>> 24] ^ m1[a >>> 16 & 255] ^ m2[b >>> 8 & 255] ^ m3[c & 255] ^ w[++i];
        a = a2;
        b = b2;
        c = c2;
      }
      output2[0] = sub[a >>> 24] << 24 ^ sub[b >>> 16 & 255] << 16 ^ sub[c >>> 8 & 255] << 8 ^ sub[d & 255] ^ w[++i];
      output2[decrypt2 ? 3 : 1] = sub[b >>> 24] << 24 ^ sub[c >>> 16 & 255] << 16 ^ sub[d >>> 8 & 255] << 8 ^ sub[a & 255] ^ w[++i];
      output2[2] = sub[c >>> 24] << 24 ^ sub[d >>> 16 & 255] << 16 ^ sub[a >>> 8 & 255] << 8 ^ sub[b & 255] ^ w[++i];
      output2[decrypt2 ? 1 : 3] = sub[d >>> 24] << 24 ^ sub[a >>> 16 & 255] << 16 ^ sub[b >>> 8 & 255] << 8 ^ sub[c & 255] ^ w[++i];
    }
    function _createCipher(options) {
      options = options || {};
      var mode = (options.mode || "CBC").toUpperCase();
      var algorithm = "AES-" + mode;
      var cipher;
      if (options.decrypt) {
        cipher = forge7.cipher.createDecipher(algorithm, options.key);
      } else {
        cipher = forge7.cipher.createCipher(algorithm, options.key);
      }
      var start = cipher.start;
      cipher.start = function(iv, options2) {
        var output2 = null;
        if (options2 instanceof forge7.util.ByteBuffer) {
          output2 = options2;
          options2 = {};
        }
        options2 = options2 || {};
        options2.output = output2;
        options2.iv = iv;
        start.call(cipher, options2);
      };
      return cipher;
    }
  }
});

// node_modules/node-forge/lib/oids.js
var require_oids = __commonJS({
  "node_modules/node-forge/lib/oids.js"(exports2, module2) {
    init_node_globals();
    var forge7 = require_forge();
    forge7.pki = forge7.pki || {};
    var oids = module2.exports = forge7.pki.oids = forge7.oids = forge7.oids || {};
    function _IN(id, name3) {
      oids[id] = name3;
      oids[name3] = id;
    }
    function _I_(id, name3) {
      oids[id] = name3;
    }
    _IN("1.2.840.113549.1.1.1", "rsaEncryption");
    _IN("1.2.840.113549.1.1.4", "md5WithRSAEncryption");
    _IN("1.2.840.113549.1.1.5", "sha1WithRSAEncryption");
    _IN("1.2.840.113549.1.1.7", "RSAES-OAEP");
    _IN("1.2.840.113549.1.1.8", "mgf1");
    _IN("1.2.840.113549.1.1.9", "pSpecified");
    _IN("1.2.840.113549.1.1.10", "RSASSA-PSS");
    _IN("1.2.840.113549.1.1.11", "sha256WithRSAEncryption");
    _IN("1.2.840.113549.1.1.12", "sha384WithRSAEncryption");
    _IN("1.2.840.113549.1.1.13", "sha512WithRSAEncryption");
    _IN("1.3.101.112", "EdDSA25519");
    _IN("1.2.840.10040.4.3", "dsa-with-sha1");
    _IN("1.3.14.3.2.7", "desCBC");
    _IN("1.3.14.3.2.26", "sha1");
    _IN("1.3.14.3.2.29", "sha1WithRSASignature");
    _IN("2.16.840.1.101.3.4.2.1", "sha256");
    _IN("2.16.840.1.101.3.4.2.2", "sha384");
    _IN("2.16.840.1.101.3.4.2.3", "sha512");
    _IN("2.16.840.1.101.3.4.2.4", "sha224");
    _IN("2.16.840.1.101.3.4.2.5", "sha512-224");
    _IN("2.16.840.1.101.3.4.2.6", "sha512-256");
    _IN("1.2.840.113549.2.2", "md2");
    _IN("1.2.840.113549.2.5", "md5");
    _IN("1.2.840.113549.1.7.1", "data");
    _IN("1.2.840.113549.1.7.2", "signedData");
    _IN("1.2.840.113549.1.7.3", "envelopedData");
    _IN("1.2.840.113549.1.7.4", "signedAndEnvelopedData");
    _IN("1.2.840.113549.1.7.5", "digestedData");
    _IN("1.2.840.113549.1.7.6", "encryptedData");
    _IN("1.2.840.113549.1.9.1", "emailAddress");
    _IN("1.2.840.113549.1.9.2", "unstructuredName");
    _IN("1.2.840.113549.1.9.3", "contentType");
    _IN("1.2.840.113549.1.9.4", "messageDigest");
    _IN("1.2.840.113549.1.9.5", "signingTime");
    _IN("1.2.840.113549.1.9.6", "counterSignature");
    _IN("1.2.840.113549.1.9.7", "challengePassword");
    _IN("1.2.840.113549.1.9.8", "unstructuredAddress");
    _IN("1.2.840.113549.1.9.14", "extensionRequest");
    _IN("1.2.840.113549.1.9.20", "friendlyName");
    _IN("1.2.840.113549.1.9.21", "localKeyId");
    _IN("1.2.840.113549.1.9.22.1", "x509Certificate");
    _IN("1.2.840.113549.1.12.10.1.1", "keyBag");
    _IN("1.2.840.113549.1.12.10.1.2", "pkcs8ShroudedKeyBag");
    _IN("1.2.840.113549.1.12.10.1.3", "certBag");
    _IN("1.2.840.113549.1.12.10.1.4", "crlBag");
    _IN("1.2.840.113549.1.12.10.1.5", "secretBag");
    _IN("1.2.840.113549.1.12.10.1.6", "safeContentsBag");
    _IN("1.2.840.113549.1.5.13", "pkcs5PBES2");
    _IN("1.2.840.113549.1.5.12", "pkcs5PBKDF2");
    _IN("1.2.840.113549.1.12.1.1", "pbeWithSHAAnd128BitRC4");
    _IN("1.2.840.113549.1.12.1.2", "pbeWithSHAAnd40BitRC4");
    _IN("1.2.840.113549.1.12.1.3", "pbeWithSHAAnd3-KeyTripleDES-CBC");
    _IN("1.2.840.113549.1.12.1.4", "pbeWithSHAAnd2-KeyTripleDES-CBC");
    _IN("1.2.840.113549.1.12.1.5", "pbeWithSHAAnd128BitRC2-CBC");
    _IN("1.2.840.113549.1.12.1.6", "pbewithSHAAnd40BitRC2-CBC");
    _IN("1.2.840.113549.2.7", "hmacWithSHA1");
    _IN("1.2.840.113549.2.8", "hmacWithSHA224");
    _IN("1.2.840.113549.2.9", "hmacWithSHA256");
    _IN("1.2.840.113549.2.10", "hmacWithSHA384");
    _IN("1.2.840.113549.2.11", "hmacWithSHA512");
    _IN("1.2.840.113549.3.7", "des-EDE3-CBC");
    _IN("2.16.840.1.101.3.4.1.2", "aes128-CBC");
    _IN("2.16.840.1.101.3.4.1.22", "aes192-CBC");
    _IN("2.16.840.1.101.3.4.1.42", "aes256-CBC");
    _IN("2.5.4.3", "commonName");
    _IN("2.5.4.4", "surname");
    _IN("2.5.4.5", "serialNumber");
    _IN("2.5.4.6", "countryName");
    _IN("2.5.4.7", "localityName");
    _IN("2.5.4.8", "stateOrProvinceName");
    _IN("2.5.4.9", "streetAddress");
    _IN("2.5.4.10", "organizationName");
    _IN("2.5.4.11", "organizationalUnitName");
    _IN("2.5.4.12", "title");
    _IN("2.5.4.13", "description");
    _IN("2.5.4.15", "businessCategory");
    _IN("2.5.4.17", "postalCode");
    _IN("2.5.4.42", "givenName");
    _IN("1.3.6.1.4.1.311.60.2.1.2", "jurisdictionOfIncorporationStateOrProvinceName");
    _IN("1.3.6.1.4.1.311.60.2.1.3", "jurisdictionOfIncorporationCountryName");
    _IN("2.16.840.1.113730.1.1", "nsCertType");
    _IN("2.16.840.1.113730.1.13", "nsComment");
    _I_("2.5.29.1", "authorityKeyIdentifier");
    _I_("2.5.29.2", "keyAttributes");
    _I_("2.5.29.3", "certificatePolicies");
    _I_("2.5.29.4", "keyUsageRestriction");
    _I_("2.5.29.5", "policyMapping");
    _I_("2.5.29.6", "subtreesConstraint");
    _I_("2.5.29.7", "subjectAltName");
    _I_("2.5.29.8", "issuerAltName");
    _I_("2.5.29.9", "subjectDirectoryAttributes");
    _I_("2.5.29.10", "basicConstraints");
    _I_("2.5.29.11", "nameConstraints");
    _I_("2.5.29.12", "policyConstraints");
    _I_("2.5.29.13", "basicConstraints");
    _IN("2.5.29.14", "subjectKeyIdentifier");
    _IN("2.5.29.15", "keyUsage");
    _I_("2.5.29.16", "privateKeyUsagePeriod");
    _IN("2.5.29.17", "subjectAltName");
    _IN("2.5.29.18", "issuerAltName");
    _IN("2.5.29.19", "basicConstraints");
    _I_("2.5.29.20", "cRLNumber");
    _I_("2.5.29.21", "cRLReason");
    _I_("2.5.29.22", "expirationDate");
    _I_("2.5.29.23", "instructionCode");
    _I_("2.5.29.24", "invalidityDate");
    _I_("2.5.29.25", "cRLDistributionPoints");
    _I_("2.5.29.26", "issuingDistributionPoint");
    _I_("2.5.29.27", "deltaCRLIndicator");
    _I_("2.5.29.28", "issuingDistributionPoint");
    _I_("2.5.29.29", "certificateIssuer");
    _I_("2.5.29.30", "nameConstraints");
    _IN("2.5.29.31", "cRLDistributionPoints");
    _IN("2.5.29.32", "certificatePolicies");
    _I_("2.5.29.33", "policyMappings");
    _I_("2.5.29.34", "policyConstraints");
    _IN("2.5.29.35", "authorityKeyIdentifier");
    _I_("2.5.29.36", "policyConstraints");
    _IN("2.5.29.37", "extKeyUsage");
    _I_("2.5.29.46", "freshestCRL");
    _I_("2.5.29.54", "inhibitAnyPolicy");
    _IN("1.3.6.1.4.1.11129.2.4.2", "timestampList");
    _IN("1.3.6.1.5.5.7.1.1", "authorityInfoAccess");
    _IN("1.3.6.1.5.5.7.3.1", "serverAuth");
    _IN("1.3.6.1.5.5.7.3.2", "clientAuth");
    _IN("1.3.6.1.5.5.7.3.3", "codeSigning");
    _IN("1.3.6.1.5.5.7.3.4", "emailProtection");
    _IN("1.3.6.1.5.5.7.3.8", "timeStamping");
  }
});

// node_modules/node-forge/lib/asn1.js
var require_asn1 = __commonJS({
  "node_modules/node-forge/lib/asn1.js"(exports2, module2) {
    init_node_globals();
    var forge7 = require_forge();
    require_util();
    require_oids();
    var asn1 = module2.exports = forge7.asn1 = forge7.asn1 || {};
    asn1.Class = {
      UNIVERSAL: 0,
      APPLICATION: 64,
      CONTEXT_SPECIFIC: 128,
      PRIVATE: 192
    };
    asn1.Type = {
      NONE: 0,
      BOOLEAN: 1,
      INTEGER: 2,
      BITSTRING: 3,
      OCTETSTRING: 4,
      NULL: 5,
      OID: 6,
      ODESC: 7,
      EXTERNAL: 8,
      REAL: 9,
      ENUMERATED: 10,
      EMBEDDED: 11,
      UTF8: 12,
      ROID: 13,
      SEQUENCE: 16,
      SET: 17,
      PRINTABLESTRING: 19,
      IA5STRING: 22,
      UTCTIME: 23,
      GENERALIZEDTIME: 24,
      BMPSTRING: 30
    };
    asn1.create = function(tagClass, type7, constructed, value, options) {
      if (forge7.util.isArray(value)) {
        var tmp = [];
        for (var i = 0; i < value.length; ++i) {
          if (value[i] !== void 0) {
            tmp.push(value[i]);
          }
        }
        value = tmp;
      }
      var obj = {
        tagClass,
        type: type7,
        constructed,
        composed: constructed || forge7.util.isArray(value),
        value
      };
      if (options && "bitStringContents" in options) {
        obj.bitStringContents = options.bitStringContents;
        obj.original = asn1.copy(obj);
      }
      return obj;
    };
    asn1.copy = function(obj, options) {
      var copy;
      if (forge7.util.isArray(obj)) {
        copy = [];
        for (var i = 0; i < obj.length; ++i) {
          copy.push(asn1.copy(obj[i], options));
        }
        return copy;
      }
      if (typeof obj === "string") {
        return obj;
      }
      copy = {
        tagClass: obj.tagClass,
        type: obj.type,
        constructed: obj.constructed,
        composed: obj.composed,
        value: asn1.copy(obj.value, options)
      };
      if (options && !options.excludeBitStringContents) {
        copy.bitStringContents = obj.bitStringContents;
      }
      return copy;
    };
    asn1.equals = function(obj1, obj2, options) {
      if (forge7.util.isArray(obj1)) {
        if (!forge7.util.isArray(obj2)) {
          return false;
        }
        if (obj1.length !== obj2.length) {
          return false;
        }
        for (var i = 0; i < obj1.length; ++i) {
          if (!asn1.equals(obj1[i], obj2[i])) {
            return false;
          }
        }
        return true;
      }
      if (typeof obj1 !== typeof obj2) {
        return false;
      }
      if (typeof obj1 === "string") {
        return obj1 === obj2;
      }
      var equal = obj1.tagClass === obj2.tagClass && obj1.type === obj2.type && obj1.constructed === obj2.constructed && obj1.composed === obj2.composed && asn1.equals(obj1.value, obj2.value);
      if (options && options.includeBitStringContents) {
        equal = equal && obj1.bitStringContents === obj2.bitStringContents;
      }
      return equal;
    };
    asn1.getBerValueLength = function(b) {
      var b2 = b.getByte();
      if (b2 === 128) {
        return void 0;
      }
      var length3;
      var longForm = b2 & 128;
      if (!longForm) {
        length3 = b2;
      } else {
        length3 = b.getInt((b2 & 127) << 3);
      }
      return length3;
    };
    function _checkBufferLength(bytes2, remaining, n) {
      if (n > remaining) {
        var error = new Error("Too few bytes to parse DER.");
        error.available = bytes2.length();
        error.remaining = remaining;
        error.requested = n;
        throw error;
      }
    }
    var _getValueLength = function(bytes2, remaining) {
      var b2 = bytes2.getByte();
      remaining--;
      if (b2 === 128) {
        return void 0;
      }
      var length3;
      var longForm = b2 & 128;
      if (!longForm) {
        length3 = b2;
      } else {
        var longFormBytes = b2 & 127;
        _checkBufferLength(bytes2, remaining, longFormBytes);
        length3 = bytes2.getInt(longFormBytes << 3);
      }
      if (length3 < 0) {
        throw new Error("Negative length: " + length3);
      }
      return length3;
    };
    asn1.fromDer = function(bytes2, options) {
      if (options === void 0) {
        options = {
          strict: true,
          parseAllBytes: true,
          decodeBitStrings: true
        };
      }
      if (typeof options === "boolean") {
        options = {
          strict: options,
          parseAllBytes: true,
          decodeBitStrings: true
        };
      }
      if (!("strict" in options)) {
        options.strict = true;
      }
      if (!("parseAllBytes" in options)) {
        options.parseAllBytes = true;
      }
      if (!("decodeBitStrings" in options)) {
        options.decodeBitStrings = true;
      }
      if (typeof bytes2 === "string") {
        bytes2 = forge7.util.createBuffer(bytes2);
      }
      var byteCount = bytes2.length();
      var value = _fromDer(bytes2, bytes2.length(), 0, options);
      if (options.parseAllBytes && bytes2.length() !== 0) {
        var error = new Error("Unparsed DER bytes remain after ASN.1 parsing.");
        error.byteCount = byteCount;
        error.remaining = bytes2.length();
        throw error;
      }
      return value;
    };
    function _fromDer(bytes2, remaining, depth, options) {
      var start;
      _checkBufferLength(bytes2, remaining, 2);
      var b1 = bytes2.getByte();
      remaining--;
      var tagClass = b1 & 192;
      var type7 = b1 & 31;
      start = bytes2.length();
      var length3 = _getValueLength(bytes2, remaining);
      remaining -= start - bytes2.length();
      if (length3 !== void 0 && length3 > remaining) {
        if (options.strict) {
          var error = new Error("Too few bytes to read ASN.1 value.");
          error.available = bytes2.length();
          error.remaining = remaining;
          error.requested = length3;
          throw error;
        }
        length3 = remaining;
      }
      var value;
      var bitStringContents;
      var constructed = (b1 & 32) === 32;
      if (constructed) {
        value = [];
        if (length3 === void 0) {
          for (; ; ) {
            _checkBufferLength(bytes2, remaining, 2);
            if (bytes2.bytes(2) === String.fromCharCode(0, 0)) {
              bytes2.getBytes(2);
              remaining -= 2;
              break;
            }
            start = bytes2.length();
            value.push(_fromDer(bytes2, remaining, depth + 1, options));
            remaining -= start - bytes2.length();
          }
        } else {
          while (length3 > 0) {
            start = bytes2.length();
            value.push(_fromDer(bytes2, length3, depth + 1, options));
            remaining -= start - bytes2.length();
            length3 -= start - bytes2.length();
          }
        }
      }
      if (value === void 0 && tagClass === asn1.Class.UNIVERSAL && type7 === asn1.Type.BITSTRING) {
        bitStringContents = bytes2.bytes(length3);
      }
      if (value === void 0 && options.decodeBitStrings && tagClass === asn1.Class.UNIVERSAL && type7 === asn1.Type.BITSTRING && length3 > 1) {
        var savedRead = bytes2.read;
        var savedRemaining = remaining;
        var unused = 0;
        if (type7 === asn1.Type.BITSTRING) {
          _checkBufferLength(bytes2, remaining, 1);
          unused = bytes2.getByte();
          remaining--;
        }
        if (unused === 0) {
          try {
            start = bytes2.length();
            var subOptions = {
              strict: true,
              decodeBitStrings: true
            };
            var composed = _fromDer(bytes2, remaining, depth + 1, subOptions);
            var used = start - bytes2.length();
            remaining -= used;
            if (type7 == asn1.Type.BITSTRING) {
              used++;
            }
            var tc = composed.tagClass;
            if (used === length3 && (tc === asn1.Class.UNIVERSAL || tc === asn1.Class.CONTEXT_SPECIFIC)) {
              value = [composed];
            }
          } catch (ex) {
          }
        }
        if (value === void 0) {
          bytes2.read = savedRead;
          remaining = savedRemaining;
        }
      }
      if (value === void 0) {
        if (length3 === void 0) {
          if (options.strict) {
            throw new Error("Non-constructed ASN.1 object of indefinite length.");
          }
          length3 = remaining;
        }
        if (type7 === asn1.Type.BMPSTRING) {
          value = "";
          for (; length3 > 0; length3 -= 2) {
            _checkBufferLength(bytes2, remaining, 2);
            value += String.fromCharCode(bytes2.getInt16());
            remaining -= 2;
          }
        } else {
          value = bytes2.getBytes(length3);
          remaining -= length3;
        }
      }
      var asn1Options = bitStringContents === void 0 ? null : {
        bitStringContents
      };
      return asn1.create(tagClass, type7, constructed, value, asn1Options);
    }
    asn1.toDer = function(obj) {
      var bytes2 = forge7.util.createBuffer();
      var b1 = obj.tagClass | obj.type;
      var value = forge7.util.createBuffer();
      var useBitStringContents = false;
      if ("bitStringContents" in obj) {
        useBitStringContents = true;
        if (obj.original) {
          useBitStringContents = asn1.equals(obj, obj.original);
        }
      }
      if (useBitStringContents) {
        value.putBytes(obj.bitStringContents);
      } else if (obj.composed) {
        if (obj.constructed) {
          b1 |= 32;
        } else {
          value.putByte(0);
        }
        for (var i = 0; i < obj.value.length; ++i) {
          if (obj.value[i] !== void 0) {
            value.putBuffer(asn1.toDer(obj.value[i]));
          }
        }
      } else {
        if (obj.type === asn1.Type.BMPSTRING) {
          for (var i = 0; i < obj.value.length; ++i) {
            value.putInt16(obj.value.charCodeAt(i));
          }
        } else {
          if (obj.type === asn1.Type.INTEGER && obj.value.length > 1 && (obj.value.charCodeAt(0) === 0 && (obj.value.charCodeAt(1) & 128) === 0 || obj.value.charCodeAt(0) === 255 && (obj.value.charCodeAt(1) & 128) === 128)) {
            value.putBytes(obj.value.substr(1));
          } else {
            value.putBytes(obj.value);
          }
        }
      }
      bytes2.putByte(b1);
      if (value.length() <= 127) {
        bytes2.putByte(value.length() & 127);
      } else {
        var len = value.length();
        var lenBytes = "";
        do {
          lenBytes += String.fromCharCode(len & 255);
          len = len >>> 8;
        } while (len > 0);
        bytes2.putByte(lenBytes.length | 128);
        for (var i = lenBytes.length - 1; i >= 0; --i) {
          bytes2.putByte(lenBytes.charCodeAt(i));
        }
      }
      bytes2.putBuffer(value);
      return bytes2;
    };
    asn1.oidToDer = function(oid) {
      var values = oid.split(".");
      var bytes2 = forge7.util.createBuffer();
      bytes2.putByte(40 * parseInt(values[0], 10) + parseInt(values[1], 10));
      var last, valueBytes, value, b;
      for (var i = 2; i < values.length; ++i) {
        last = true;
        valueBytes = [];
        value = parseInt(values[i], 10);
        do {
          b = value & 127;
          value = value >>> 7;
          if (!last) {
            b |= 128;
          }
          valueBytes.push(b);
          last = false;
        } while (value > 0);
        for (var n = valueBytes.length - 1; n >= 0; --n) {
          bytes2.putByte(valueBytes[n]);
        }
      }
      return bytes2;
    };
    asn1.derToOid = function(bytes2) {
      var oid;
      if (typeof bytes2 === "string") {
        bytes2 = forge7.util.createBuffer(bytes2);
      }
      var b = bytes2.getByte();
      oid = Math.floor(b / 40) + "." + b % 40;
      var value = 0;
      while (bytes2.length() > 0) {
        b = bytes2.getByte();
        value = value << 7;
        if (b & 128) {
          value += b & 127;
        } else {
          oid += "." + (value + b);
          value = 0;
        }
      }
      return oid;
    };
    asn1.utcTimeToDate = function(utc) {
      var date = new Date();
      var year = parseInt(utc.substr(0, 2), 10);
      year = year >= 50 ? 1900 + year : 2e3 + year;
      var MM = parseInt(utc.substr(2, 2), 10) - 1;
      var DD = parseInt(utc.substr(4, 2), 10);
      var hh = parseInt(utc.substr(6, 2), 10);
      var mm = parseInt(utc.substr(8, 2), 10);
      var ss = 0;
      if (utc.length > 11) {
        var c = utc.charAt(10);
        var end = 10;
        if (c !== "+" && c !== "-") {
          ss = parseInt(utc.substr(10, 2), 10);
          end += 2;
        }
      }
      date.setUTCFullYear(year, MM, DD);
      date.setUTCHours(hh, mm, ss, 0);
      if (end) {
        c = utc.charAt(end);
        if (c === "+" || c === "-") {
          var hhoffset = parseInt(utc.substr(end + 1, 2), 10);
          var mmoffset = parseInt(utc.substr(end + 4, 2), 10);
          var offset = hhoffset * 60 + mmoffset;
          offset *= 6e4;
          if (c === "+") {
            date.setTime(+date - offset);
          } else {
            date.setTime(+date + offset);
          }
        }
      }
      return date;
    };
    asn1.generalizedTimeToDate = function(gentime) {
      var date = new Date();
      var YYYY = parseInt(gentime.substr(0, 4), 10);
      var MM = parseInt(gentime.substr(4, 2), 10) - 1;
      var DD = parseInt(gentime.substr(6, 2), 10);
      var hh = parseInt(gentime.substr(8, 2), 10);
      var mm = parseInt(gentime.substr(10, 2), 10);
      var ss = parseInt(gentime.substr(12, 2), 10);
      var fff = 0;
      var offset = 0;
      var isUTC = false;
      if (gentime.charAt(gentime.length - 1) === "Z") {
        isUTC = true;
      }
      var end = gentime.length - 5, c = gentime.charAt(end);
      if (c === "+" || c === "-") {
        var hhoffset = parseInt(gentime.substr(end + 1, 2), 10);
        var mmoffset = parseInt(gentime.substr(end + 4, 2), 10);
        offset = hhoffset * 60 + mmoffset;
        offset *= 6e4;
        if (c === "+") {
          offset *= -1;
        }
        isUTC = true;
      }
      if (gentime.charAt(14) === ".") {
        fff = parseFloat(gentime.substr(14), 10) * 1e3;
      }
      if (isUTC) {
        date.setUTCFullYear(YYYY, MM, DD);
        date.setUTCHours(hh, mm, ss, fff);
        date.setTime(+date + offset);
      } else {
        date.setFullYear(YYYY, MM, DD);
        date.setHours(hh, mm, ss, fff);
      }
      return date;
    };
    asn1.dateToUtcTime = function(date) {
      if (typeof date === "string") {
        return date;
      }
      var rval = "";
      var format3 = [];
      format3.push(("" + date.getUTCFullYear()).substr(2));
      format3.push("" + (date.getUTCMonth() + 1));
      format3.push("" + date.getUTCDate());
      format3.push("" + date.getUTCHours());
      format3.push("" + date.getUTCMinutes());
      format3.push("" + date.getUTCSeconds());
      for (var i = 0; i < format3.length; ++i) {
        if (format3[i].length < 2) {
          rval += "0";
        }
        rval += format3[i];
      }
      rval += "Z";
      return rval;
    };
    asn1.dateToGeneralizedTime = function(date) {
      if (typeof date === "string") {
        return date;
      }
      var rval = "";
      var format3 = [];
      format3.push("" + date.getUTCFullYear());
      format3.push("" + (date.getUTCMonth() + 1));
      format3.push("" + date.getUTCDate());
      format3.push("" + date.getUTCHours());
      format3.push("" + date.getUTCMinutes());
      format3.push("" + date.getUTCSeconds());
      for (var i = 0; i < format3.length; ++i) {
        if (format3[i].length < 2) {
          rval += "0";
        }
        rval += format3[i];
      }
      rval += "Z";
      return rval;
    };
    asn1.integerToDer = function(x) {
      var rval = forge7.util.createBuffer();
      if (x >= -128 && x < 128) {
        return rval.putSignedInt(x, 8);
      }
      if (x >= -32768 && x < 32768) {
        return rval.putSignedInt(x, 16);
      }
      if (x >= -8388608 && x < 8388608) {
        return rval.putSignedInt(x, 24);
      }
      if (x >= -2147483648 && x < 2147483648) {
        return rval.putSignedInt(x, 32);
      }
      var error = new Error("Integer too large; max is 32-bits.");
      error.integer = x;
      throw error;
    };
    asn1.derToInteger = function(bytes2) {
      if (typeof bytes2 === "string") {
        bytes2 = forge7.util.createBuffer(bytes2);
      }
      var n = bytes2.length() * 8;
      if (n > 32) {
        throw new Error("Integer too large; max is 32-bits.");
      }
      return bytes2.getSignedInt(n);
    };
    asn1.validate = function(obj, v, capture, errors) {
      var rval = false;
      if ((obj.tagClass === v.tagClass || typeof v.tagClass === "undefined") && (obj.type === v.type || typeof v.type === "undefined")) {
        if (obj.constructed === v.constructed || typeof v.constructed === "undefined") {
          rval = true;
          if (v.value && forge7.util.isArray(v.value)) {
            var j = 0;
            for (var i = 0; rval && i < v.value.length; ++i) {
              rval = v.value[i].optional || false;
              if (obj.value[j]) {
                rval = asn1.validate(obj.value[j], v.value[i], capture, errors);
                if (rval) {
                  ++j;
                } else if (v.value[i].optional) {
                  rval = true;
                }
              }
              if (!rval && errors) {
                errors.push("[" + v.name + '] Tag class "' + v.tagClass + '", type "' + v.type + '" expected value length "' + v.value.length + '", got "' + obj.value.length + '"');
              }
            }
          }
          if (rval && capture) {
            if (v.capture) {
              capture[v.capture] = obj.value;
            }
            if (v.captureAsn1) {
              capture[v.captureAsn1] = obj;
            }
            if (v.captureBitStringContents && "bitStringContents" in obj) {
              capture[v.captureBitStringContents] = obj.bitStringContents;
            }
            if (v.captureBitStringValue && "bitStringContents" in obj) {
              var value;
              if (obj.bitStringContents.length < 2) {
                capture[v.captureBitStringValue] = "";
              } else {
                var unused = obj.bitStringContents.charCodeAt(0);
                if (unused !== 0) {
                  throw new Error("captureBitStringValue only supported for zero unused bits");
                }
                capture[v.captureBitStringValue] = obj.bitStringContents.slice(1);
              }
            }
          }
        } else if (errors) {
          errors.push("[" + v.name + '] Expected constructed "' + v.constructed + '", got "' + obj.constructed + '"');
        }
      } else if (errors) {
        if (obj.tagClass !== v.tagClass) {
          errors.push("[" + v.name + '] Expected tag class "' + v.tagClass + '", got "' + obj.tagClass + '"');
        }
        if (obj.type !== v.type) {
          errors.push("[" + v.name + '] Expected type "' + v.type + '", got "' + obj.type + '"');
        }
      }
      return rval;
    };
    var _nonLatinRegex = /[^\\u0000-\\u00ff]/;
    asn1.prettyPrint = function(obj, level, indentation) {
      var rval = "";
      level = level || 0;
      indentation = indentation || 2;
      if (level > 0) {
        rval += "\n";
      }
      var indent = "";
      for (var i = 0; i < level * indentation; ++i) {
        indent += " ";
      }
      rval += indent + "Tag: ";
      switch (obj.tagClass) {
        case asn1.Class.UNIVERSAL:
          rval += "Universal:";
          break;
        case asn1.Class.APPLICATION:
          rval += "Application:";
          break;
        case asn1.Class.CONTEXT_SPECIFIC:
          rval += "Context-Specific:";
          break;
        case asn1.Class.PRIVATE:
          rval += "Private:";
          break;
      }
      if (obj.tagClass === asn1.Class.UNIVERSAL) {
        rval += obj.type;
        switch (obj.type) {
          case asn1.Type.NONE:
            rval += " (None)";
            break;
          case asn1.Type.BOOLEAN:
            rval += " (Boolean)";
            break;
          case asn1.Type.INTEGER:
            rval += " (Integer)";
            break;
          case asn1.Type.BITSTRING:
            rval += " (Bit string)";
            break;
          case asn1.Type.OCTETSTRING:
            rval += " (Octet string)";
            break;
          case asn1.Type.NULL:
            rval += " (Null)";
            break;
          case asn1.Type.OID:
            rval += " (Object Identifier)";
            break;
          case asn1.Type.ODESC:
            rval += " (Object Descriptor)";
            break;
          case asn1.Type.EXTERNAL:
            rval += " (External or Instance of)";
            break;
          case asn1.Type.REAL:
            rval += " (Real)";
            break;
          case asn1.Type.ENUMERATED:
            rval += " (Enumerated)";
            break;
          case asn1.Type.EMBEDDED:
            rval += " (Embedded PDV)";
            break;
          case asn1.Type.UTF8:
            rval += " (UTF8)";
            break;
          case asn1.Type.ROID:
            rval += " (Relative Object Identifier)";
            break;
          case asn1.Type.SEQUENCE:
            rval += " (Sequence)";
            break;
          case asn1.Type.SET:
            rval += " (Set)";
            break;
          case asn1.Type.PRINTABLESTRING:
            rval += " (Printable String)";
            break;
          case asn1.Type.IA5String:
            rval += " (IA5String (ASCII))";
            break;
          case asn1.Type.UTCTIME:
            rval += " (UTC time)";
            break;
          case asn1.Type.GENERALIZEDTIME:
            rval += " (Generalized time)";
            break;
          case asn1.Type.BMPSTRING:
            rval += " (BMP String)";
            break;
        }
      } else {
        rval += obj.type;
      }
      rval += "\n";
      rval += indent + "Constructed: " + obj.constructed + "\n";
      if (obj.composed) {
        var subvalues = 0;
        var sub = "";
        for (var i = 0; i < obj.value.length; ++i) {
          if (obj.value[i] !== void 0) {
            subvalues += 1;
            sub += asn1.prettyPrint(obj.value[i], level + 1, indentation);
            if (i + 1 < obj.value.length) {
              sub += ",";
            }
          }
        }
        rval += indent + "Sub values: " + subvalues + sub;
      } else {
        rval += indent + "Value: ";
        if (obj.type === asn1.Type.OID) {
          var oid = asn1.derToOid(obj.value);
          rval += oid;
          if (forge7.pki && forge7.pki.oids) {
            if (oid in forge7.pki.oids) {
              rval += " (" + forge7.pki.oids[oid] + ") ";
            }
          }
        }
        if (obj.type === asn1.Type.INTEGER) {
          try {
            rval += asn1.derToInteger(obj.value);
          } catch (ex) {
            rval += "0x" + forge7.util.bytesToHex(obj.value);
          }
        } else if (obj.type === asn1.Type.BITSTRING) {
          if (obj.value.length > 1) {
            rval += "0x" + forge7.util.bytesToHex(obj.value.slice(1));
          } else {
            rval += "(none)";
          }
          if (obj.value.length > 0) {
            var unused = obj.value.charCodeAt(0);
            if (unused == 1) {
              rval += " (1 unused bit shown)";
            } else if (unused > 1) {
              rval += " (" + unused + " unused bits shown)";
            }
          }
        } else if (obj.type === asn1.Type.OCTETSTRING) {
          if (!_nonLatinRegex.test(obj.value)) {
            rval += "(" + obj.value + ") ";
          }
          rval += "0x" + forge7.util.bytesToHex(obj.value);
        } else if (obj.type === asn1.Type.UTF8) {
          try {
            rval += forge7.util.decodeUtf8(obj.value);
          } catch (e) {
            if (e.message === "URI malformed") {
              rval += "0x" + forge7.util.bytesToHex(obj.value) + " (malformed UTF8)";
            } else {
              throw e;
            }
          }
        } else if (obj.type === asn1.Type.PRINTABLESTRING || obj.type === asn1.Type.IA5String) {
          rval += obj.value;
        } else if (_nonLatinRegex.test(obj.value)) {
          rval += "0x" + forge7.util.bytesToHex(obj.value);
        } else if (obj.value.length === 0) {
          rval += "[null]";
        } else {
          rval += obj.value;
        }
      }
      return rval;
    };
  }
});

// node_modules/node-forge/lib/des.js
var require_des = __commonJS({
  "node_modules/node-forge/lib/des.js"(exports2, module2) {
    init_node_globals();
    var forge7 = require_forge();
    require_cipher();
    require_cipherModes();
    require_util();
    module2.exports = forge7.des = forge7.des || {};
    forge7.des.startEncrypting = function(key, iv, output2, mode) {
      var cipher = _createCipher({
        key,
        output: output2,
        decrypt: false,
        mode: mode || (iv === null ? "ECB" : "CBC")
      });
      cipher.start(iv);
      return cipher;
    };
    forge7.des.createEncryptionCipher = function(key, mode) {
      return _createCipher({
        key,
        output: null,
        decrypt: false,
        mode
      });
    };
    forge7.des.startDecrypting = function(key, iv, output2, mode) {
      var cipher = _createCipher({
        key,
        output: output2,
        decrypt: true,
        mode: mode || (iv === null ? "ECB" : "CBC")
      });
      cipher.start(iv);
      return cipher;
    };
    forge7.des.createDecryptionCipher = function(key, mode) {
      return _createCipher({
        key,
        output: null,
        decrypt: true,
        mode
      });
    };
    forge7.des.Algorithm = function(name3, mode) {
      var self2 = this;
      self2.name = name3;
      self2.mode = new mode({
        blockSize: 8,
        cipher: {
          encrypt: function(inBlock, outBlock) {
            return _updateBlock(self2._keys, inBlock, outBlock, false);
          },
          decrypt: function(inBlock, outBlock) {
            return _updateBlock(self2._keys, inBlock, outBlock, true);
          }
        }
      });
      self2._init = false;
    };
    forge7.des.Algorithm.prototype.initialize = function(options) {
      if (this._init) {
        return;
      }
      var key = forge7.util.createBuffer(options.key);
      if (this.name.indexOf("3DES") === 0) {
        if (key.length() !== 24) {
          throw new Error("Invalid Triple-DES key size: " + key.length() * 8);
        }
      }
      this._keys = _createKeys(key);
      this._init = true;
    };
    registerAlgorithm("DES-ECB", forge7.cipher.modes.ecb);
    registerAlgorithm("DES-CBC", forge7.cipher.modes.cbc);
    registerAlgorithm("DES-CFB", forge7.cipher.modes.cfb);
    registerAlgorithm("DES-OFB", forge7.cipher.modes.ofb);
    registerAlgorithm("DES-CTR", forge7.cipher.modes.ctr);
    registerAlgorithm("3DES-ECB", forge7.cipher.modes.ecb);
    registerAlgorithm("3DES-CBC", forge7.cipher.modes.cbc);
    registerAlgorithm("3DES-CFB", forge7.cipher.modes.cfb);
    registerAlgorithm("3DES-OFB", forge7.cipher.modes.ofb);
    registerAlgorithm("3DES-CTR", forge7.cipher.modes.ctr);
    function registerAlgorithm(name3, mode) {
      var factory = function() {
        return new forge7.des.Algorithm(name3, mode);
      };
      forge7.cipher.registerAlgorithm(name3, factory);
    }
    var spfunction1 = [16843776, 0, 65536, 16843780, 16842756, 66564, 4, 65536, 1024, 16843776, 16843780, 1024, 16778244, 16842756, 16777216, 4, 1028, 16778240, 16778240, 66560, 66560, 16842752, 16842752, 16778244, 65540, 16777220, 16777220, 65540, 0, 1028, 66564, 16777216, 65536, 16843780, 4, 16842752, 16843776, 16777216, 16777216, 1024, 16842756, 65536, 66560, 16777220, 1024, 4, 16778244, 66564, 16843780, 65540, 16842752, 16778244, 16777220, 1028, 66564, 16843776, 1028, 16778240, 16778240, 0, 65540, 66560, 0, 16842756];
    var spfunction2 = [-2146402272, -2147450880, 32768, 1081376, 1048576, 32, -2146435040, -2147450848, -2147483616, -2146402272, -2146402304, -2147483648, -2147450880, 1048576, 32, -2146435040, 1081344, 1048608, -2147450848, 0, -2147483648, 32768, 1081376, -2146435072, 1048608, -2147483616, 0, 1081344, 32800, -2146402304, -2146435072, 32800, 0, 1081376, -2146435040, 1048576, -2147450848, -2146435072, -2146402304, 32768, -2146435072, -2147450880, 32, -2146402272, 1081376, 32, 32768, -2147483648, 32800, -2146402304, 1048576, -2147483616, 1048608, -2147450848, -2147483616, 1048608, 1081344, 0, -2147450880, 32800, -2147483648, -2146435040, -2146402272, 1081344];
    var spfunction3 = [520, 134349312, 0, 134348808, 134218240, 0, 131592, 134218240, 131080, 134217736, 134217736, 131072, 134349320, 131080, 134348800, 520, 134217728, 8, 134349312, 512, 131584, 134348800, 134348808, 131592, 134218248, 131584, 131072, 134218248, 8, 134349320, 512, 134217728, 134349312, 134217728, 131080, 520, 131072, 134349312, 134218240, 0, 512, 131080, 134349320, 134218240, 134217736, 512, 0, 134348808, 134218248, 131072, 134217728, 134349320, 8, 131592, 131584, 134217736, 134348800, 134218248, 520, 134348800, 131592, 8, 134348808, 131584];
    var spfunction4 = [8396801, 8321, 8321, 128, 8396928, 8388737, 8388609, 8193, 0, 8396800, 8396800, 8396929, 129, 0, 8388736, 8388609, 1, 8192, 8388608, 8396801, 128, 8388608, 8193, 8320, 8388737, 1, 8320, 8388736, 8192, 8396928, 8396929, 129, 8388736, 8388609, 8396800, 8396929, 129, 0, 0, 8396800, 8320, 8388736, 8388737, 1, 8396801, 8321, 8321, 128, 8396929, 129, 1, 8192, 8388609, 8193, 8396928, 8388737, 8193, 8320, 8388608, 8396801, 128, 8388608, 8192, 8396928];
    var spfunction5 = [256, 34078976, 34078720, 1107296512, 524288, 256, 1073741824, 34078720, 1074266368, 524288, 33554688, 1074266368, 1107296512, 1107820544, 524544, 1073741824, 33554432, 1074266112, 1074266112, 0, 1073742080, 1107820800, 1107820800, 33554688, 1107820544, 1073742080, 0, 1107296256, 34078976, 33554432, 1107296256, 524544, 524288, 1107296512, 256, 33554432, 1073741824, 34078720, 1107296512, 1074266368, 33554688, 1073741824, 1107820544, 34078976, 1074266368, 256, 33554432, 1107820544, 1107820800, 524544, 1107296256, 1107820800, 34078720, 0, 1074266112, 1107296256, 524544, 33554688, 1073742080, 524288, 0, 1074266112, 34078976, 1073742080];
    var spfunction6 = [536870928, 541065216, 16384, 541081616, 541065216, 16, 541081616, 4194304, 536887296, 4210704, 4194304, 536870928, 4194320, 536887296, 536870912, 16400, 0, 4194320, 536887312, 16384, 4210688, 536887312, 16, 541065232, 541065232, 0, 4210704, 541081600, 16400, 4210688, 541081600, 536870912, 536887296, 16, 541065232, 4210688, 541081616, 4194304, 16400, 536870928, 4194304, 536887296, 536870912, 16400, 536870928, 541081616, 4210688, 541065216, 4210704, 541081600, 0, 541065232, 16, 16384, 541065216, 4210704, 16384, 4194320, 536887312, 0, 541081600, 536870912, 4194320, 536887312];
    var spfunction7 = [2097152, 69206018, 67110914, 0, 2048, 67110914, 2099202, 69208064, 69208066, 2097152, 0, 67108866, 2, 67108864, 69206018, 2050, 67110912, 2099202, 2097154, 67110912, 67108866, 69206016, 69208064, 2097154, 69206016, 2048, 2050, 69208066, 2099200, 2, 67108864, 2099200, 67108864, 2099200, 2097152, 67110914, 67110914, 69206018, 69206018, 2, 2097154, 67108864, 67110912, 2097152, 69208064, 2050, 2099202, 69208064, 2050, 67108866, 69208066, 69206016, 2099200, 0, 2, 69208066, 0, 2099202, 69206016, 2048, 67108866, 67110912, 2048, 2097154];
    var spfunction8 = [268439616, 4096, 262144, 268701760, 268435456, 268439616, 64, 268435456, 262208, 268697600, 268701760, 266240, 268701696, 266304, 4096, 64, 268697600, 268435520, 268439552, 4160, 266240, 262208, 268697664, 268701696, 4160, 0, 0, 268697664, 268435520, 268439552, 266304, 262144, 266304, 262144, 268701696, 4096, 64, 268697664, 4096, 266304, 268439552, 64, 268435520, 268697600, 268697664, 268435456, 262144, 268439616, 0, 268701760, 262208, 268435520, 268697600, 268439552, 268439616, 0, 268701760, 266240, 266240, 4160, 4160, 262208, 268435456, 268701696];
    function _createKeys(key) {
      var pc2bytes0 = [0, 4, 536870912, 536870916, 65536, 65540, 536936448, 536936452, 512, 516, 536871424, 536871428, 66048, 66052, 536936960, 536936964], pc2bytes1 = [0, 1, 1048576, 1048577, 67108864, 67108865, 68157440, 68157441, 256, 257, 1048832, 1048833, 67109120, 67109121, 68157696, 68157697], pc2bytes2 = [0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272, 0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272], pc2bytes3 = [0, 2097152, 134217728, 136314880, 8192, 2105344, 134225920, 136323072, 131072, 2228224, 134348800, 136445952, 139264, 2236416, 134356992, 136454144], pc2bytes4 = [0, 262144, 16, 262160, 0, 262144, 16, 262160, 4096, 266240, 4112, 266256, 4096, 266240, 4112, 266256], pc2bytes5 = [0, 1024, 32, 1056, 0, 1024, 32, 1056, 33554432, 33555456, 33554464, 33555488, 33554432, 33555456, 33554464, 33555488], pc2bytes6 = [0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746, 0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746], pc2bytes7 = [0, 65536, 2048, 67584, 536870912, 536936448, 536872960, 536938496, 131072, 196608, 133120, 198656, 537001984, 537067520, 537004032, 537069568], pc2bytes8 = [0, 262144, 0, 262144, 2, 262146, 2, 262146, 33554432, 33816576, 33554432, 33816576, 33554434, 33816578, 33554434, 33816578], pc2bytes9 = [0, 268435456, 8, 268435464, 0, 268435456, 8, 268435464, 1024, 268436480, 1032, 268436488, 1024, 268436480, 1032, 268436488], pc2bytes10 = [0, 32, 0, 32, 1048576, 1048608, 1048576, 1048608, 8192, 8224, 8192, 8224, 1056768, 1056800, 1056768, 1056800], pc2bytes11 = [0, 16777216, 512, 16777728, 2097152, 18874368, 2097664, 18874880, 67108864, 83886080, 67109376, 83886592, 69206016, 85983232, 69206528, 85983744], pc2bytes12 = [0, 4096, 134217728, 134221824, 524288, 528384, 134742016, 134746112, 16, 4112, 134217744, 134221840, 524304, 528400, 134742032, 134746128], pc2bytes13 = [0, 4, 256, 260, 0, 4, 256, 260, 1, 5, 257, 261, 1, 5, 257, 261];
      var iterations = key.length() > 8 ? 3 : 1;
      var keys = [];
      var shifts = [0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0];
      var n = 0, tmp;
      for (var j = 0; j < iterations; j++) {
        var left = key.getInt32();
        var right = key.getInt32();
        tmp = (left >>> 4 ^ right) & 252645135;
        right ^= tmp;
        left ^= tmp << 4;
        tmp = (right >>> -16 ^ left) & 65535;
        left ^= tmp;
        right ^= tmp << -16;
        tmp = (left >>> 2 ^ right) & 858993459;
        right ^= tmp;
        left ^= tmp << 2;
        tmp = (right >>> -16 ^ left) & 65535;
        left ^= tmp;
        right ^= tmp << -16;
        tmp = (left >>> 1 ^ right) & 1431655765;
        right ^= tmp;
        left ^= tmp << 1;
        tmp = (right >>> 8 ^ left) & 16711935;
        left ^= tmp;
        right ^= tmp << 8;
        tmp = (left >>> 1 ^ right) & 1431655765;
        right ^= tmp;
        left ^= tmp << 1;
        tmp = left << 8 | right >>> 20 & 240;
        left = right << 24 | right << 8 & 16711680 | right >>> 8 & 65280 | right >>> 24 & 240;
        right = tmp;
        for (var i = 0; i < shifts.length; ++i) {
          if (shifts[i]) {
            left = left << 2 | left >>> 26;
            right = right << 2 | right >>> 26;
          } else {
            left = left << 1 | left >>> 27;
            right = right << 1 | right >>> 27;
          }
          left &= -15;
          right &= -15;
          var lefttmp = pc2bytes0[left >>> 28] | pc2bytes1[left >>> 24 & 15] | pc2bytes2[left >>> 20 & 15] | pc2bytes3[left >>> 16 & 15] | pc2bytes4[left >>> 12 & 15] | pc2bytes5[left >>> 8 & 15] | pc2bytes6[left >>> 4 & 15];
          var righttmp = pc2bytes7[right >>> 28] | pc2bytes8[right >>> 24 & 15] | pc2bytes9[right >>> 20 & 15] | pc2bytes10[right >>> 16 & 15] | pc2bytes11[right >>> 12 & 15] | pc2bytes12[right >>> 8 & 15] | pc2bytes13[right >>> 4 & 15];
          tmp = (righttmp >>> 16 ^ lefttmp) & 65535;
          keys[n++] = lefttmp ^ tmp;
          keys[n++] = righttmp ^ tmp << 16;
        }
      }
      return keys;
    }
    function _updateBlock(keys, input, output2, decrypt2) {
      var iterations = keys.length === 32 ? 3 : 9;
      var looping;
      if (iterations === 3) {
        looping = decrypt2 ? [30, -2, -2] : [0, 32, 2];
      } else {
        looping = decrypt2 ? [94, 62, -2, 32, 64, 2, 30, -2, -2] : [0, 32, 2, 62, 30, -2, 64, 96, 2];
      }
      var tmp;
      var left = input[0];
      var right = input[1];
      tmp = (left >>> 4 ^ right) & 252645135;
      right ^= tmp;
      left ^= tmp << 4;
      tmp = (left >>> 16 ^ right) & 65535;
      right ^= tmp;
      left ^= tmp << 16;
      tmp = (right >>> 2 ^ left) & 858993459;
      left ^= tmp;
      right ^= tmp << 2;
      tmp = (right >>> 8 ^ left) & 16711935;
      left ^= tmp;
      right ^= tmp << 8;
      tmp = (left >>> 1 ^ right) & 1431655765;
      right ^= tmp;
      left ^= tmp << 1;
      left = left << 1 | left >>> 31;
      right = right << 1 | right >>> 31;
      for (var j = 0; j < iterations; j += 3) {
        var endloop = looping[j + 1];
        var loopinc = looping[j + 2];
        for (var i = looping[j]; i != endloop; i += loopinc) {
          var right1 = right ^ keys[i];
          var right2 = (right >>> 4 | right << 28) ^ keys[i + 1];
          tmp = left;
          left = right;
          right = tmp ^ (spfunction2[right1 >>> 24 & 63] | spfunction4[right1 >>> 16 & 63] | spfunction6[right1 >>> 8 & 63] | spfunction8[right1 & 63] | spfunction1[right2 >>> 24 & 63] | spfunction3[right2 >>> 16 & 63] | spfunction5[right2 >>> 8 & 63] | spfunction7[right2 & 63]);
        }
        tmp = left;
        left = right;
        right = tmp;
      }
      left = left >>> 1 | left << 31;
      right = right >>> 1 | right << 31;
      tmp = (left >>> 1 ^ right) & 1431655765;
      right ^= tmp;
      left ^= tmp << 1;
      tmp = (right >>> 8 ^ left) & 16711935;
      left ^= tmp;
      right ^= tmp << 8;
      tmp = (right >>> 2 ^ left) & 858993459;
      left ^= tmp;
      right ^= tmp << 2;
      tmp = (left >>> 16 ^ right) & 65535;
      right ^= tmp;
      left ^= tmp << 16;
      tmp = (left >>> 4 ^ right) & 252645135;
      right ^= tmp;
      left ^= tmp << 4;
      output2[0] = left;
      output2[1] = right;
    }
    function _createCipher(options) {
      options = options || {};
      var mode = (options.mode || "CBC").toUpperCase();
      var algorithm = "DES-" + mode;
      var cipher;
      if (options.decrypt) {
        cipher = forge7.cipher.createDecipher(algorithm, options.key);
      } else {
        cipher = forge7.cipher.createCipher(algorithm, options.key);
      }
      var start = cipher.start;
      cipher.start = function(iv, options2) {
        var output2 = null;
        if (options2 instanceof forge7.util.ByteBuffer) {
          output2 = options2;
          options2 = {};
        }
        options2 = options2 || {};
        options2.output = output2;
        options2.iv = iv;
        start.call(cipher, options2);
      };
      return cipher;
    }
  }
});

// node_modules/node-forge/lib/md.js
var require_md = __commonJS({
  "node_modules/node-forge/lib/md.js"(exports2, module2) {
    init_node_globals();
    var forge7 = require_forge();
    module2.exports = forge7.md = forge7.md || {};
    forge7.md.algorithms = forge7.md.algorithms || {};
  }
});

// node_modules/node-forge/lib/hmac.js
var require_hmac = __commonJS({
  "node_modules/node-forge/lib/hmac.js"(exports2, module2) {
    init_node_globals();
    var forge7 = require_forge();
    require_md();
    require_util();
    var hmac2 = module2.exports = forge7.hmac = forge7.hmac || {};
    hmac2.create = function() {
      var _key = null;
      var _md = null;
      var _ipadding = null;
      var _opadding = null;
      var ctx = {};
      ctx.start = function(md, key) {
        if (md !== null) {
          if (typeof md === "string") {
            md = md.toLowerCase();
            if (md in forge7.md.algorithms) {
              _md = forge7.md.algorithms[md].create();
            } else {
              throw new Error('Unknown hash algorithm "' + md + '"');
            }
          } else {
            _md = md;
          }
        }
        if (key === null) {
          key = _key;
        } else {
          if (typeof key === "string") {
            key = forge7.util.createBuffer(key);
          } else if (forge7.util.isArray(key)) {
            var tmp = key;
            key = forge7.util.createBuffer();
            for (var i = 0; i < tmp.length; ++i) {
              key.putByte(tmp[i]);
            }
          }
          var keylen = key.length();
          if (keylen > _md.blockLength) {
            _md.start();
            _md.update(key.bytes());
            key = _md.digest();
          }
          _ipadding = forge7.util.createBuffer();
          _opadding = forge7.util.createBuffer();
          keylen = key.length();
          for (var i = 0; i < keylen; ++i) {
            var tmp = key.at(i);
            _ipadding.putByte(54 ^ tmp);
            _opadding.putByte(92 ^ tmp);
          }
          if (keylen < _md.blockLength) {
            var tmp = _md.blockLength - keylen;
            for (var i = 0; i < tmp; ++i) {
              _ipadding.putByte(54);
              _opadding.putByte(92);
            }
          }
          _key = key;
          _ipadding = _ipadding.bytes();
          _opadding = _opadding.bytes();
        }
        _md.start();
        _md.update(_ipadding);
      };
      ctx.update = function(bytes2) {
        _md.update(bytes2);
      };
      ctx.getMac = function() {
        var inner = _md.digest().bytes();
        _md.start();
        _md.update(_opadding);
        _md.update(inner);
        return _md.digest();
      };
      ctx.digest = ctx.getMac;
      return ctx;
    };
  }
});

// node_modules/node-forge/lib/pbkdf2.js
var require_pbkdf2 = __commonJS({
  "node_modules/node-forge/lib/pbkdf2.js"(exports2, module2) {
    init_node_globals();
    var forge7 = require_forge();
    require_hmac();
    require_md();
    require_util();
    var pkcs5 = forge7.pkcs5 = forge7.pkcs5 || {};
    var crypto3;
    if (forge7.util.isNodejs && !forge7.options.usePureJavaScript) {
      crypto3 = __require("crypto");
    }
    module2.exports = forge7.pbkdf2 = pkcs5.pbkdf2 = function(p, s, c, dkLen, md, callback) {
      if (typeof md === "function") {
        callback = md;
        md = null;
      }
      if (forge7.util.isNodejs && !forge7.options.usePureJavaScript && crypto3.pbkdf2 && (md === null || typeof md !== "object") && (crypto3.pbkdf2Sync.length > 4 || (!md || md === "sha1"))) {
        if (typeof md !== "string") {
          md = "sha1";
        }
        p = Buffer.from(p, "binary");
        s = Buffer.from(s, "binary");
        if (!callback) {
          if (crypto3.pbkdf2Sync.length === 4) {
            return crypto3.pbkdf2Sync(p, s, c, dkLen).toString("binary");
          }
          return crypto3.pbkdf2Sync(p, s, c, dkLen, md).toString("binary");
        }
        if (crypto3.pbkdf2Sync.length === 4) {
          return crypto3.pbkdf2(p, s, c, dkLen, function(err2, key) {
            if (err2) {
              return callback(err2);
            }
            callback(null, key.toString("binary"));
          });
        }
        return crypto3.pbkdf2(p, s, c, dkLen, md, function(err2, key) {
          if (err2) {
            return callback(err2);
          }
          callback(null, key.toString("binary"));
        });
      }
      if (typeof md === "undefined" || md === null) {
        md = "sha1";
      }
      if (typeof md === "string") {
        if (!(md in forge7.md.algorithms)) {
          throw new Error("Unknown hash algorithm: " + md);
        }
        md = forge7.md[md].create();
      }
      var hLen = md.digestLength;
      if (dkLen > 4294967295 * hLen) {
        var err = new Error("Derived key is too long.");
        if (callback) {
          return callback(err);
        }
        throw err;
      }
      var len = Math.ceil(dkLen / hLen);
      var r = dkLen - (len - 1) * hLen;
      var prf = forge7.hmac.create();
      prf.start(md, p);
      var dk = "";
      var xor, u_c, u_c1;
      if (!callback) {
        for (var i = 1; i <= len; ++i) {
          prf.start(null, null);
          prf.update(s);
          prf.update(forge7.util.int32ToBytes(i));
          xor = u_c1 = prf.digest().getBytes();
          for (var j = 2; j <= c; ++j) {
            prf.start(null, null);
            prf.update(u_c1);
            u_c = prf.digest().getBytes();
            xor = forge7.util.xorBytes(xor, u_c, hLen);
            u_c1 = u_c;
          }
          dk += i < len ? xor : xor.substr(0, r);
        }
        return dk;
      }
      var i = 1, j;
      function outer() {
        if (i > len) {
          return callback(null, dk);
        }
        prf.start(null, null);
        prf.update(s);
        prf.update(forge7.util.int32ToBytes(i));
        xor = u_c1 = prf.digest().getBytes();
        j = 2;
        inner();
      }
      function inner() {
        if (j <= c) {
          prf.start(null, null);
          prf.update(u_c1);
          u_c = prf.digest().getBytes();
          xor = forge7.util.xorBytes(xor, u_c, hLen);
          u_c1 = u_c;
          ++j;
          return forge7.util.setImmediate(inner);
        }
        dk += i < len ? xor : xor.substr(0, r);
        ++i;
        outer();
      }
      outer();
    };
  }
});

// node_modules/node-forge/lib/pem.js
var require_pem = __commonJS({
  "node_modules/node-forge/lib/pem.js"(exports2, module2) {
    init_node_globals();
    var forge7 = require_forge();
    require_util();
    var pem = module2.exports = forge7.pem = forge7.pem || {};
    pem.encode = function(msg, options) {
      options = options || {};
      var rval = "-----BEGIN " + msg.type + "-----\r\n";
      var header;
      if (msg.procType) {
        header = {
          name: "Proc-Type",
          values: [String(msg.procType.version), msg.procType.type]
        };
        rval += foldHeader(header);
      }
      if (msg.contentDomain) {
        header = { name: "Content-Domain", values: [msg.contentDomain] };
        rval += foldHeader(header);
      }
      if (msg.dekInfo) {
        header = { name: "DEK-Info", values: [msg.dekInfo.algorithm] };
        if (msg.dekInfo.parameters) {
          header.values.push(msg.dekInfo.parameters);
        }
        rval += foldHeader(header);
      }
      if (msg.headers) {
        for (var i = 0; i < msg.headers.length; ++i) {
          rval += foldHeader(msg.headers[i]);
        }
      }
      if (msg.procType) {
        rval += "\r\n";
      }
      rval += forge7.util.encode64(msg.body, options.maxline || 64) + "\r\n";
      rval += "-----END " + msg.type + "-----\r\n";
      return rval;
    };
    pem.decode = function(str) {
      var rval = [];
      var rMessage = /\s*-----BEGIN ([A-Z0-9- ]+)-----\r?\n?([\x21-\x7e\s]+?(?:\r?\n\r?\n))?([:A-Za-z0-9+\/=\s]+?)-----END \1-----/g;
      var rHeader = /([\x21-\x7e]+):\s*([\x21-\x7e\s^:]+)/;
      var rCRLF = /\r?\n/;
      var match;
      while (true) {
        match = rMessage.exec(str);
        if (!match) {
          break;
        }
        var type7 = match[1];
        if (type7 === "NEW CERTIFICATE REQUEST") {
          type7 = "CERTIFICATE REQUEST";
        }
        var msg = {
          type: type7,
          procType: null,
          contentDomain: null,
          dekInfo: null,
          headers: [],
          body: forge7.util.decode64(match[3])
        };
        rval.push(msg);
        if (!match[2]) {
          continue;
        }
        var lines = match[2].split(rCRLF);
        var li = 0;
        while (match && li < lines.length) {
          var line = lines[li].replace(/\s+$/, "");
          for (var nl = li + 1; nl < lines.length; ++nl) {
            var next = lines[nl];
            if (!/\s/.test(next[0])) {
              break;
            }
            line += next;
            li = nl;
          }
          match = line.match(rHeader);
          if (match) {
            var header = { name: match[1], values: [] };
            var values = match[2].split(",");
            for (var vi = 0; vi < values.length; ++vi) {
              header.values.push(ltrim(values[vi]));
            }
            if (!msg.procType) {
              if (header.name !== "Proc-Type") {
                throw new Error('Invalid PEM formatted message. The first encapsulated header must be "Proc-Type".');
              } else if (header.values.length !== 2) {
                throw new Error('Invalid PEM formatted message. The "Proc-Type" header must have two subfields.');
              }
              msg.procType = { version: values[0], type: values[1] };
            } else if (!msg.contentDomain && header.name === "Content-Domain") {
              msg.contentDomain = values[0] || "";
            } else if (!msg.dekInfo && header.name === "DEK-Info") {
              if (header.values.length === 0) {
                throw new Error('Invalid PEM formatted message. The "DEK-Info" header must have at least one subfield.');
              }
              msg.dekInfo = { algorithm: values[0], parameters: values[1] || null };
            } else {
              msg.headers.push(header);
            }
          }
          ++li;
        }
        if (msg.procType === "ENCRYPTED" && !msg.dekInfo) {
          throw new Error('Invalid PEM formatted message. The "DEK-Info" header must be present if "Proc-Type" is "ENCRYPTED".');
        }
      }
      if (rval.length === 0) {
        throw new Error("Invalid PEM formatted message.");
      }
      return rval;
    };
    function foldHeader(header) {
      var rval = header.name + ": ";
      var values = [];
      var insertSpace = function(match, $1) {
        return " " + $1;
      };
      for (var i = 0; i < header.values.length; ++i) {
        values.push(header.values[i].replace(/^(\S+\r\n)/, insertSpace));
      }
      rval += values.join(",") + "\r\n";
      var length3 = 0;
      var candidate = -1;
      for (var i = 0; i < rval.length; ++i, ++length3) {
        if (length3 > 65 && candidate !== -1) {
          var insert = rval[candidate];
          if (insert === ",") {
            ++candidate;
            rval = rval.substr(0, candidate) + "\r\n " + rval.substr(candidate);
          } else {
            rval = rval.substr(0, candidate) + "\r\n" + insert + rval.substr(candidate + 1);
          }
          length3 = i - candidate - 1;
          candidate = -1;
          ++i;
        } else if (rval[i] === " " || rval[i] === "	" || rval[i] === ",") {
          candidate = i;
        }
      }
      return rval;
    }
    function ltrim(str) {
      return str.replace(/^\s+/, "");
    }
  }
});

// node_modules/node-forge/lib/sha256.js
var require_sha256 = __commonJS({
  "node_modules/node-forge/lib/sha256.js"(exports2, module2) {
    init_node_globals();
    var forge7 = require_forge();
    require_md();
    require_util();
    var sha2563 = module2.exports = forge7.sha256 = forge7.sha256 || {};
    forge7.md.sha256 = forge7.md.algorithms.sha256 = sha2563;
    sha2563.create = function() {
      if (!_initialized) {
        _init();
      }
      var _state = null;
      var _input = forge7.util.createBuffer();
      var _w = new Array(64);
      var md = {
        algorithm: "sha256",
        blockLength: 64,
        digestLength: 32,
        messageLength: 0,
        fullMessageLength: null,
        messageLengthSize: 8
      };
      md.start = function() {
        md.messageLength = 0;
        md.fullMessageLength = md.messageLength64 = [];
        var int32s = md.messageLengthSize / 4;
        for (var i = 0; i < int32s; ++i) {
          md.fullMessageLength.push(0);
        }
        _input = forge7.util.createBuffer();
        _state = {
          h0: 1779033703,
          h1: 3144134277,
          h2: 1013904242,
          h3: 2773480762,
          h4: 1359893119,
          h5: 2600822924,
          h6: 528734635,
          h7: 1541459225
        };
        return md;
      };
      md.start();
      md.update = function(msg, encoding) {
        if (encoding === "utf8") {
          msg = forge7.util.encodeUtf8(msg);
        }
        var len = msg.length;
        md.messageLength += len;
        len = [len / 4294967296 >>> 0, len >>> 0];
        for (var i = md.fullMessageLength.length - 1; i >= 0; --i) {
          md.fullMessageLength[i] += len[1];
          len[1] = len[0] + (md.fullMessageLength[i] / 4294967296 >>> 0);
          md.fullMessageLength[i] = md.fullMessageLength[i] >>> 0;
          len[0] = len[1] / 4294967296 >>> 0;
        }
        _input.putBytes(msg);
        _update(_state, _w, _input);
        if (_input.read > 2048 || _input.length() === 0) {
          _input.compact();
        }
        return md;
      };
      md.digest = function() {
        var finalBlock = forge7.util.createBuffer();
        finalBlock.putBytes(_input.bytes());
        var remaining = md.fullMessageLength[md.fullMessageLength.length - 1] + md.messageLengthSize;
        var overflow = remaining & md.blockLength - 1;
        finalBlock.putBytes(_padding.substr(0, md.blockLength - overflow));
        var next, carry;
        var bits2 = md.fullMessageLength[0] * 8;
        for (var i = 0; i < md.fullMessageLength.length - 1; ++i) {
          next = md.fullMessageLength[i + 1] * 8;
          carry = next / 4294967296 >>> 0;
          bits2 += carry;
          finalBlock.putInt32(bits2 >>> 0);
          bits2 = next >>> 0;
        }
        finalBlock.putInt32(bits2);
        var s2 = {
          h0: _state.h0,
          h1: _state.h1,
          h2: _state.h2,
          h3: _state.h3,
          h4: _state.h4,
          h5: _state.h5,
          h6: _state.h6,
          h7: _state.h7
        };
        _update(s2, _w, finalBlock);
        var rval = forge7.util.createBuffer();
        rval.putInt32(s2.h0);
        rval.putInt32(s2.h1);
        rval.putInt32(s2.h2);
        rval.putInt32(s2.h3);
        rval.putInt32(s2.h4);
        rval.putInt32(s2.h5);
        rval.putInt32(s2.h6);
        rval.putInt32(s2.h7);
        return rval;
      };
      return md;
    };
    var _padding = null;
    var _initialized = false;
    var _k = null;
    function _init() {
      _padding = String.fromCharCode(128);
      _padding += forge7.util.fillString(String.fromCharCode(0), 64);
      _k = [
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ];
      _initialized = true;
    }
    function _update(s, w, bytes2) {
      var t1, t2, s0, s1, ch, maj, i, a, b, c, d, e, f, g, h;
      var len = bytes2.length();
      while (len >= 64) {
        for (i = 0; i < 16; ++i) {
          w[i] = bytes2.getInt32();
        }
        for (; i < 64; ++i) {
          t1 = w[i - 2];
          t1 = (t1 >>> 17 | t1 << 15) ^ (t1 >>> 19 | t1 << 13) ^ t1 >>> 10;
          t2 = w[i - 15];
          t2 = (t2 >>> 7 | t2 << 25) ^ (t2 >>> 18 | t2 << 14) ^ t2 >>> 3;
          w[i] = t1 + w[i - 7] + t2 + w[i - 16] | 0;
        }
        a = s.h0;
        b = s.h1;
        c = s.h2;
        d = s.h3;
        e = s.h4;
        f = s.h5;
        g = s.h6;
        h = s.h7;
        for (i = 0; i < 64; ++i) {
          s1 = (e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7);
          ch = g ^ e & (f ^ g);
          s0 = (a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^ (a >>> 22 | a << 10);
          maj = a & b | c & (a ^ b);
          t1 = h + s1 + ch + _k[i] + w[i];
          t2 = s0 + maj;
          h = g;
          g = f;
          f = e;
          e = d + t1 >>> 0;
          d = c;
          c = b;
          b = a;
          a = t1 + t2 >>> 0;
        }
        s.h0 = s.h0 + a | 0;
        s.h1 = s.h1 + b | 0;
        s.h2 = s.h2 + c | 0;
        s.h3 = s.h3 + d | 0;
        s.h4 = s.h4 + e | 0;
        s.h5 = s.h5 + f | 0;
        s.h6 = s.h6 + g | 0;
        s.h7 = s.h7 + h | 0;
        len -= 64;
      }
    }
  }
});

// node_modules/node-forge/lib/prng.js
var require_prng = __commonJS({
  "node_modules/node-forge/lib/prng.js"(exports2, module2) {
    init_node_globals();
    var forge7 = require_forge();
    require_util();
    var _crypto = null;
    if (forge7.util.isNodejs && !forge7.options.usePureJavaScript && !process.versions["node-webkit"]) {
      _crypto = __require("crypto");
    }
    var prng = module2.exports = forge7.prng = forge7.prng || {};
    prng.create = function(plugin) {
      var ctx = {
        plugin,
        key: null,
        seed: null,
        time: null,
        reseeds: 0,
        generated: 0,
        keyBytes: ""
      };
      var md = plugin.md;
      var pools = new Array(32);
      for (var i = 0; i < 32; ++i) {
        pools[i] = md.create();
      }
      ctx.pools = pools;
      ctx.pool = 0;
      ctx.generate = function(count, callback) {
        if (!callback) {
          return ctx.generateSync(count);
        }
        var cipher = ctx.plugin.cipher;
        var increment = ctx.plugin.increment;
        var formatKey = ctx.plugin.formatKey;
        var formatSeed = ctx.plugin.formatSeed;
        var b = forge7.util.createBuffer();
        ctx.key = null;
        generate();
        function generate(err) {
          if (err) {
            return callback(err);
          }
          if (b.length() >= count) {
            return callback(null, b.getBytes(count));
          }
          if (ctx.generated > 1048575) {
            ctx.key = null;
          }
          if (ctx.key === null) {
            return forge7.util.nextTick(function() {
              _reseed(generate);
            });
          }
          var bytes2 = cipher(ctx.key, ctx.seed);
          ctx.generated += bytes2.length;
          b.putBytes(bytes2);
          ctx.key = formatKey(cipher(ctx.key, increment(ctx.seed)));
          ctx.seed = formatSeed(cipher(ctx.key, ctx.seed));
          forge7.util.setImmediate(generate);
        }
      };
      ctx.generateSync = function(count) {
        var cipher = ctx.plugin.cipher;
        var increment = ctx.plugin.increment;
        var formatKey = ctx.plugin.formatKey;
        var formatSeed = ctx.plugin.formatSeed;
        ctx.key = null;
        var b = forge7.util.createBuffer();
        while (b.length() < count) {
          if (ctx.generated > 1048575) {
            ctx.key = null;
          }
          if (ctx.key === null) {
            _reseedSync();
          }
          var bytes2 = cipher(ctx.key, ctx.seed);
          ctx.generated += bytes2.length;
          b.putBytes(bytes2);
          ctx.key = formatKey(cipher(ctx.key, increment(ctx.seed)));
          ctx.seed = formatSeed(cipher(ctx.key, ctx.seed));
        }
        return b.getBytes(count);
      };
      function _reseed(callback) {
        if (ctx.pools[0].messageLength >= 32) {
          _seed();
          return callback();
        }
        var needed = 32 - ctx.pools[0].messageLength << 5;
        ctx.seedFile(needed, function(err, bytes2) {
          if (err) {
            return callback(err);
          }
          ctx.collect(bytes2);
          _seed();
          callback();
        });
      }
      function _reseedSync() {
        if (ctx.pools[0].messageLength >= 32) {
          return _seed();
        }
        var needed = 32 - ctx.pools[0].messageLength << 5;
        ctx.collect(ctx.seedFileSync(needed));
        _seed();
      }
      function _seed() {
        ctx.reseeds = ctx.reseeds === 4294967295 ? 0 : ctx.reseeds + 1;
        var md2 = ctx.plugin.md.create();
        md2.update(ctx.keyBytes);
        var _2powK = 1;
        for (var k = 0; k < 32; ++k) {
          if (ctx.reseeds % _2powK === 0) {
            md2.update(ctx.pools[k].digest().getBytes());
            ctx.pools[k].start();
          }
          _2powK = _2powK << 1;
        }
        ctx.keyBytes = md2.digest().getBytes();
        md2.start();
        md2.update(ctx.keyBytes);
        var seedBytes = md2.digest().getBytes();
        ctx.key = ctx.plugin.formatKey(ctx.keyBytes);
        ctx.seed = ctx.plugin.formatSeed(seedBytes);
        ctx.generated = 0;
      }
      function defaultSeedFile(needed) {
        var getRandomValues = null;
        var globalScope = forge7.util.globalScope;
        var _crypto2 = globalScope.crypto || globalScope.msCrypto;
        if (_crypto2 && _crypto2.getRandomValues) {
          getRandomValues = function(arr) {
            return _crypto2.getRandomValues(arr);
          };
        }
        var b = forge7.util.createBuffer();
        if (getRandomValues) {
          while (b.length() < needed) {
            var count = Math.max(1, Math.min(needed - b.length(), 65536) / 4);
            var entropy = new Uint32Array(Math.floor(count));
            try {
              getRandomValues(entropy);
              for (var i2 = 0; i2 < entropy.length; ++i2) {
                b.putInt32(entropy[i2]);
              }
            } catch (e) {
              if (!(typeof QuotaExceededError !== "undefined" && e instanceof QuotaExceededError)) {
                throw e;
              }
            }
          }
        }
        if (b.length() < needed) {
          var hi, lo, next;
          var seed = Math.floor(Math.random() * 65536);
          while (b.length() < needed) {
            lo = 16807 * (seed & 65535);
            hi = 16807 * (seed >> 16);
            lo += (hi & 32767) << 16;
            lo += hi >> 15;
            lo = (lo & 2147483647) + (lo >> 31);
            seed = lo & 4294967295;
            for (var i2 = 0; i2 < 3; ++i2) {
              next = seed >>> (i2 << 3);
              next ^= Math.floor(Math.random() * 256);
              b.putByte(next & 255);
            }
          }
        }
        return b.getBytes(needed);
      }
      if (_crypto) {
        ctx.seedFile = function(needed, callback) {
          _crypto.randomBytes(needed, function(err, bytes2) {
            if (err) {
              return callback(err);
            }
            callback(null, bytes2.toString());
          });
        };
        ctx.seedFileSync = function(needed) {
          return _crypto.randomBytes(needed).toString();
        };
      } else {
        ctx.seedFile = function(needed, callback) {
          try {
            callback(null, defaultSeedFile(needed));
          } catch (e) {
            callback(e);
          }
        };
        ctx.seedFileSync = defaultSeedFile;
      }
      ctx.collect = function(bytes2) {
        var count = bytes2.length;
        for (var i2 = 0; i2 < count; ++i2) {
          ctx.pools[ctx.pool].update(bytes2.substr(i2, 1));
          ctx.pool = ctx.pool === 31 ? 0 : ctx.pool + 1;
        }
      };
      ctx.collectInt = function(i2, n) {
        var bytes2 = "";
        for (var x = 0; x < n; x += 8) {
          bytes2 += String.fromCharCode(i2 >> x & 255);
        }
        ctx.collect(bytes2);
      };
      ctx.registerWorker = function(worker) {
        if (worker === self) {
          ctx.seedFile = function(needed, callback) {
            function listener2(e) {
              var data = e.data;
              if (data.forge && data.forge.prng) {
                self.removeEventListener("message", listener2);
                callback(data.forge.prng.err, data.forge.prng.bytes);
              }
            }
            self.addEventListener("message", listener2);
            self.postMessage({ forge: { prng: { needed } } });
          };
        } else {
          var listener = function(e) {
            var data = e.data;
            if (data.forge && data.forge.prng) {
              ctx.seedFile(data.forge.prng.needed, function(err, bytes2) {
                worker.postMessage({ forge: { prng: { err, bytes: bytes2 } } });
              });
            }
          };
          worker.addEventListener("message", listener);
        }
      };
      return ctx;
    };
  }
});

// node_modules/node-forge/lib/random.js
var require_random = __commonJS({
  "node_modules/node-forge/lib/random.js"(exports2, module2) {
    init_node_globals();
    var forge7 = require_forge();
    require_aes();
    require_sha256();
    require_prng();
    require_util();
    (function() {
      if (forge7.random && forge7.random.getBytes) {
        module2.exports = forge7.random;
        return;
      }
      (function(jQuery2) {
        var prng_aes = {};
        var _prng_aes_output = new Array(4);
        var _prng_aes_buffer = forge7.util.createBuffer();
        prng_aes.formatKey = function(key2) {
          var tmp = forge7.util.createBuffer(key2);
          key2 = new Array(4);
          key2[0] = tmp.getInt32();
          key2[1] = tmp.getInt32();
          key2[2] = tmp.getInt32();
          key2[3] = tmp.getInt32();
          return forge7.aes._expandKey(key2, false);
        };
        prng_aes.formatSeed = function(seed) {
          var tmp = forge7.util.createBuffer(seed);
          seed = new Array(4);
          seed[0] = tmp.getInt32();
          seed[1] = tmp.getInt32();
          seed[2] = tmp.getInt32();
          seed[3] = tmp.getInt32();
          return seed;
        };
        prng_aes.cipher = function(key2, seed) {
          forge7.aes._updateBlock(key2, seed, _prng_aes_output, false);
          _prng_aes_buffer.putInt32(_prng_aes_output[0]);
          _prng_aes_buffer.putInt32(_prng_aes_output[1]);
          _prng_aes_buffer.putInt32(_prng_aes_output[2]);
          _prng_aes_buffer.putInt32(_prng_aes_output[3]);
          return _prng_aes_buffer.getBytes();
        };
        prng_aes.increment = function(seed) {
          ++seed[3];
          return seed;
        };
        prng_aes.md = forge7.md.sha256;
        function spawnPrng() {
          var ctx = forge7.prng.create(prng_aes);
          ctx.getBytes = function(count, callback) {
            return ctx.generate(count, callback);
          };
          ctx.getBytesSync = function(count) {
            return ctx.generate(count);
          };
          return ctx;
        }
        var _ctx = spawnPrng();
        var getRandomValues = null;
        var globalScope = forge7.util.globalScope;
        var _crypto = globalScope.crypto || globalScope.msCrypto;
        if (_crypto && _crypto.getRandomValues) {
          getRandomValues = function(arr) {
            return _crypto.getRandomValues(arr);
          };
        }
        if (forge7.options.usePureJavaScript || !forge7.util.isNodejs && !getRandomValues) {
          if (typeof window === "undefined" || window.document === void 0) {
          }
          _ctx.collectInt(+new Date(), 32);
          if (typeof navigator !== "undefined") {
            var _navBytes = "";
            for (var key in navigator) {
              try {
                if (typeof navigator[key] == "string") {
                  _navBytes += navigator[key];
                }
              } catch (e) {
              }
            }
            _ctx.collect(_navBytes);
            _navBytes = null;
          }
          if (jQuery2) {
            jQuery2().mousemove(function(e) {
              _ctx.collectInt(e.clientX, 16);
              _ctx.collectInt(e.clientY, 16);
            });
            jQuery2().keypress(function(e) {
              _ctx.collectInt(e.charCode, 8);
            });
          }
        }
        if (!forge7.random) {
          forge7.random = _ctx;
        } else {
          for (var key in _ctx) {
            forge7.random[key] = _ctx[key];
          }
        }
        forge7.random.createInstance = spawnPrng;
        module2.exports = forge7.random;
      })(typeof jQuery !== "undefined" ? jQuery : null);
    })();
  }
});

// node_modules/node-forge/lib/rc2.js
var require_rc2 = __commonJS({
  "node_modules/node-forge/lib/rc2.js"(exports2, module2) {
    init_node_globals();
    var forge7 = require_forge();
    require_util();
    var piTable = [
      217,
      120,
      249,
      196,
      25,
      221,
      181,
      237,
      40,
      233,
      253,
      121,
      74,
      160,
      216,
      157,
      198,
      126,
      55,
      131,
      43,
      118,
      83,
      142,
      98,
      76,
      100,
      136,
      68,
      139,
      251,
      162,
      23,
      154,
      89,
      245,
      135,
      179,
      79,
      19,
      97,
      69,
      109,
      141,
      9,
      129,
      125,
      50,
      189,
      143,
      64,
      235,
      134,
      183,
      123,
      11,
      240,
      149,
      33,
      34,
      92,
      107,
      78,
      130,
      84,
      214,
      101,
      147,
      206,
      96,
      178,
      28,
      115,
      86,
      192,
      20,
      167,
      140,
      241,
      220,
      18,
      117,
      202,
      31,
      59,
      190,
      228,
      209,
      66,
      61,
      212,
      48,
      163,
      60,
      182,
      38,
      111,
      191,
      14,
      218,
      70,
      105,
      7,
      87,
      39,
      242,
      29,
      155,
      188,
      148,
      67,
      3,
      248,
      17,
      199,
      246,
      144,
      239,
      62,
      231,
      6,
      195,
      213,
      47,
      200,
      102,
      30,
      215,
      8,
      232,
      234,
      222,
      128,
      82,
      238,
      247,
      132,
      170,
      114,
      172,
      53,
      77,
      106,
      42,
      150,
      26,
      210,
      113,
      90,
      21,
      73,
      116,
      75,
      159,
      208,
      94,
      4,
      24,
      164,
      236,
      194,
      224,
      65,
      110,
      15,
      81,
      203,
      204,
      36,
      145,
      175,
      80,
      161,
      244,
      112,
      57,
      153,
      124,
      58,
      133,
      35,
      184,
      180,
      122,
      252,
      2,
      54,
      91,
      37,
      85,
      151,
      49,
      45,
      93,
      250,
      152,
      227,
      138,
      146,
      174,
      5,
      223,
      41,
      16,
      103,
      108,
      186,
      201,
      211,
      0,
      230,
      207,
      225,
      158,
      168,
      44,
      99,
      22,
      1,
      63,
      88,
      226,
      137,
      169,
      13,
      56,
      52,
      27,
      171,
      51,
      255,
      176,
      187,
      72,
      12,
      95,
      185,
      177,
      205,
      46,
      197,
      243,
      219,
      71,
      229,
      165,
      156,
      119,
      10,
      166,
      32,
      104,
      254,
      127,
      193,
      173
    ];
    var s = [1, 2, 3, 5];
    var rol = function(word, bits2) {
      return word << bits2 & 65535 | (word & 65535) >> 16 - bits2;
    };
    var ror = function(word, bits2) {
      return (word & 65535) >> bits2 | word << 16 - bits2 & 65535;
    };
    module2.exports = forge7.rc2 = forge7.rc2 || {};
    forge7.rc2.expandKey = function(key, effKeyBits) {
      if (typeof key === "string") {
        key = forge7.util.createBuffer(key);
      }
      effKeyBits = effKeyBits || 128;
      var L = key;
      var T = key.length();
      var T1 = effKeyBits;
      var T8 = Math.ceil(T1 / 8);
      var TM = 255 >> (T1 & 7);
      var i;
      for (i = T; i < 128; i++) {
        L.putByte(piTable[L.at(i - 1) + L.at(i - T) & 255]);
      }
      L.setAt(128 - T8, piTable[L.at(128 - T8) & TM]);
      for (i = 127 - T8; i >= 0; i--) {
        L.setAt(i, piTable[L.at(i + 1) ^ L.at(i + T8)]);
      }
      return L;
    };
    var createCipher = function(key, bits2, encrypt2) {
      var _finish = false, _input = null, _output = null, _iv = null;
      var mixRound, mashRound;
      var i, j, K = [];
      key = forge7.rc2.expandKey(key, bits2);
      for (i = 0; i < 64; i++) {
        K.push(key.getInt16Le());
      }
      if (encrypt2) {
        mixRound = function(R) {
          for (i = 0; i < 4; i++) {
            R[i] += K[j] + (R[(i + 3) % 4] & R[(i + 2) % 4]) + (~R[(i + 3) % 4] & R[(i + 1) % 4]);
            R[i] = rol(R[i], s[i]);
            j++;
          }
        };
        mashRound = function(R) {
          for (i = 0; i < 4; i++) {
            R[i] += K[R[(i + 3) % 4] & 63];
          }
        };
      } else {
        mixRound = function(R) {
          for (i = 3; i >= 0; i--) {
            R[i] = ror(R[i], s[i]);
            R[i] -= K[j] + (R[(i + 3) % 4] & R[(i + 2) % 4]) + (~R[(i + 3) % 4] & R[(i + 1) % 4]);
            j--;
          }
        };
        mashRound = function(R) {
          for (i = 3; i >= 0; i--) {
            R[i] -= K[R[(i + 3) % 4] & 63];
          }
        };
      }
      var runPlan = function(plan) {
        var R = [];
        for (i = 0; i < 4; i++) {
          var val = _input.getInt16Le();
          if (_iv !== null) {
            if (encrypt2) {
              val ^= _iv.getInt16Le();
            } else {
              _iv.putInt16Le(val);
            }
          }
          R.push(val & 65535);
        }
        j = encrypt2 ? 0 : 63;
        for (var ptr = 0; ptr < plan.length; ptr++) {
          for (var ctr = 0; ctr < plan[ptr][0]; ctr++) {
            plan[ptr][1](R);
          }
        }
        for (i = 0; i < 4; i++) {
          if (_iv !== null) {
            if (encrypt2) {
              _iv.putInt16Le(R[i]);
            } else {
              R[i] ^= _iv.getInt16Le();
            }
          }
          _output.putInt16Le(R[i]);
        }
      };
      var cipher = null;
      cipher = {
        start: function(iv, output2) {
          if (iv) {
            if (typeof iv === "string") {
              iv = forge7.util.createBuffer(iv);
            }
          }
          _finish = false;
          _input = forge7.util.createBuffer();
          _output = output2 || new forge7.util.createBuffer();
          _iv = iv;
          cipher.output = _output;
        },
        update: function(input) {
          if (!_finish) {
            _input.putBuffer(input);
          }
          while (_input.length() >= 8) {
            runPlan([
              [5, mixRound],
              [1, mashRound],
              [6, mixRound],
              [1, mashRound],
              [5, mixRound]
            ]);
          }
        },
        finish: function(pad) {
          var rval = true;
          if (encrypt2) {
            if (pad) {
              rval = pad(8, _input, !encrypt2);
            } else {
              var padding = _input.length() === 8 ? 8 : 8 - _input.length();
              _input.fillWithByte(padding, padding);
            }
          }
          if (rval) {
            _finish = true;
            cipher.update();
          }
          if (!encrypt2) {
            rval = _input.length() === 0;
            if (rval) {
              if (pad) {
                rval = pad(8, _output, !encrypt2);
              } else {
                var len = _output.length();
                var count = _output.at(len - 1);
                if (count > len) {
                  rval = false;
                } else {
                  _output.truncate(count);
                }
              }
            }
          }
          return rval;
        }
      };
      return cipher;
    };
    forge7.rc2.startEncrypting = function(key, iv, output2) {
      var cipher = forge7.rc2.createEncryptionCipher(key, 128);
      cipher.start(iv, output2);
      return cipher;
    };
    forge7.rc2.createEncryptionCipher = function(key, bits2) {
      return createCipher(key, bits2, true);
    };
    forge7.rc2.startDecrypting = function(key, iv, output2) {
      var cipher = forge7.rc2.createDecryptionCipher(key, 128);
      cipher.start(iv, output2);
      return cipher;
    };
    forge7.rc2.createDecryptionCipher = function(key, bits2) {
      return createCipher(key, bits2, false);
    };
  }
});

// node_modules/node-forge/lib/jsbn.js
var require_jsbn = __commonJS({
  "node_modules/node-forge/lib/jsbn.js"(exports2, module2) {
    init_node_globals();
    var forge7 = require_forge();
    module2.exports = forge7.jsbn = forge7.jsbn || {};
    var dbits;
    var canary = 244837814094590;
    var j_lm = (canary & 16777215) == 15715070;
    function BigInteger(a, b, c) {
      this.data = [];
      if (a != null)
        if (typeof a == "number")
          this.fromNumber(a, b, c);
        else if (b == null && typeof a != "string")
          this.fromString(a, 256);
        else
          this.fromString(a, b);
    }
    forge7.jsbn.BigInteger = BigInteger;
    function nbi() {
      return new BigInteger(null);
    }
    function am1(i, x, w, j, c, n) {
      while (--n >= 0) {
        var v = x * this.data[i++] + w.data[j] + c;
        c = Math.floor(v / 67108864);
        w.data[j++] = v & 67108863;
      }
      return c;
    }
    function am2(i, x, w, j, c, n) {
      var xl = x & 32767, xh = x >> 15;
      while (--n >= 0) {
        var l = this.data[i] & 32767;
        var h = this.data[i++] >> 15;
        var m = xh * l + h * xl;
        l = xl * l + ((m & 32767) << 15) + w.data[j] + (c & 1073741823);
        c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
        w.data[j++] = l & 1073741823;
      }
      return c;
    }
    function am3(i, x, w, j, c, n) {
      var xl = x & 16383, xh = x >> 14;
      while (--n >= 0) {
        var l = this.data[i] & 16383;
        var h = this.data[i++] >> 14;
        var m = xh * l + h * xl;
        l = xl * l + ((m & 16383) << 14) + w.data[j] + c;
        c = (l >> 28) + (m >> 14) + xh * h;
        w.data[j++] = l & 268435455;
      }
      return c;
    }
    if (typeof navigator === "undefined") {
      BigInteger.prototype.am = am3;
      dbits = 28;
    } else if (j_lm && navigator.appName == "Microsoft Internet Explorer") {
      BigInteger.prototype.am = am2;
      dbits = 30;
    } else if (j_lm && navigator.appName != "Netscape") {
      BigInteger.prototype.am = am1;
      dbits = 26;
    } else {
      BigInteger.prototype.am = am3;
      dbits = 28;
    }
    BigInteger.prototype.DB = dbits;
    BigInteger.prototype.DM = (1 << dbits) - 1;
    BigInteger.prototype.DV = 1 << dbits;
    var BI_FP = 52;
    BigInteger.prototype.FV = Math.pow(2, BI_FP);
    BigInteger.prototype.F1 = BI_FP - dbits;
    BigInteger.prototype.F2 = 2 * dbits - BI_FP;
    var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
    var BI_RC = new Array();
    var rr;
    var vv;
    rr = "0".charCodeAt(0);
    for (vv = 0; vv <= 9; ++vv)
      BI_RC[rr++] = vv;
    rr = "a".charCodeAt(0);
    for (vv = 10; vv < 36; ++vv)
      BI_RC[rr++] = vv;
    rr = "A".charCodeAt(0);
    for (vv = 10; vv < 36; ++vv)
      BI_RC[rr++] = vv;
    function int2char(n) {
      return BI_RM.charAt(n);
    }
    function intAt(s, i) {
      var c = BI_RC[s.charCodeAt(i)];
      return c == null ? -1 : c;
    }
    function bnpCopyTo(r) {
      for (var i = this.t - 1; i >= 0; --i)
        r.data[i] = this.data[i];
      r.t = this.t;
      r.s = this.s;
    }
    function bnpFromInt(x) {
      this.t = 1;
      this.s = x < 0 ? -1 : 0;
      if (x > 0)
        this.data[0] = x;
      else if (x < -1)
        this.data[0] = x + this.DV;
      else
        this.t = 0;
    }
    function nbv(i) {
      var r = nbi();
      r.fromInt(i);
      return r;
    }
    function bnpFromString(s, b) {
      var k;
      if (b == 16)
        k = 4;
      else if (b == 8)
        k = 3;
      else if (b == 256)
        k = 8;
      else if (b == 2)
        k = 1;
      else if (b == 32)
        k = 5;
      else if (b == 4)
        k = 2;
      else {
        this.fromRadix(s, b);
        return;
      }
      this.t = 0;
      this.s = 0;
      var i = s.length, mi = false, sh = 0;
      while (--i >= 0) {
        var x = k == 8 ? s[i] & 255 : intAt(s, i);
        if (x < 0) {
          if (s.charAt(i) == "-")
            mi = true;
          continue;
        }
        mi = false;
        if (sh == 0)
          this.data[this.t++] = x;
        else if (sh + k > this.DB) {
          this.data[this.t - 1] |= (x & (1 << this.DB - sh) - 1) << sh;
          this.data[this.t++] = x >> this.DB - sh;
        } else
          this.data[this.t - 1] |= x << sh;
        sh += k;
        if (sh >= this.DB)
          sh -= this.DB;
      }
      if (k == 8 && (s[0] & 128) != 0) {
        this.s = -1;
        if (sh > 0)
          this.data[this.t - 1] |= (1 << this.DB - sh) - 1 << sh;
      }
      this.clamp();
      if (mi)
        BigInteger.ZERO.subTo(this, this);
    }
    function bnpClamp() {
      var c = this.s & this.DM;
      while (this.t > 0 && this.data[this.t - 1] == c)
        --this.t;
    }
    function bnToString(b) {
      if (this.s < 0)
        return "-" + this.negate().toString(b);
      var k;
      if (b == 16)
        k = 4;
      else if (b == 8)
        k = 3;
      else if (b == 2)
        k = 1;
      else if (b == 32)
        k = 5;
      else if (b == 4)
        k = 2;
      else
        return this.toRadix(b);
      var km = (1 << k) - 1, d, m = false, r = "", i = this.t;
      var p = this.DB - i * this.DB % k;
      if (i-- > 0) {
        if (p < this.DB && (d = this.data[i] >> p) > 0) {
          m = true;
          r = int2char(d);
        }
        while (i >= 0) {
          if (p < k) {
            d = (this.data[i] & (1 << p) - 1) << k - p;
            d |= this.data[--i] >> (p += this.DB - k);
          } else {
            d = this.data[i] >> (p -= k) & km;
            if (p <= 0) {
              p += this.DB;
              --i;
            }
          }
          if (d > 0)
            m = true;
          if (m)
            r += int2char(d);
        }
      }
      return m ? r : "0";
    }
    function bnNegate() {
      var r = nbi();
      BigInteger.ZERO.subTo(this, r);
      return r;
    }
    function bnAbs() {
      return this.s < 0 ? this.negate() : this;
    }
    function bnCompareTo(a) {
      var r = this.s - a.s;
      if (r != 0)
        return r;
      var i = this.t;
      r = i - a.t;
      if (r != 0)
        return this.s < 0 ? -r : r;
      while (--i >= 0)
        if ((r = this.data[i] - a.data[i]) != 0)
          return r;
      return 0;
    }
    function nbits(x) {
      var r = 1, t;
      if ((t = x >>> 16) != 0) {
        x = t;
        r += 16;
      }
      if ((t = x >> 8) != 0) {
        x = t;
        r += 8;
      }
      if ((t = x >> 4) != 0) {
        x = t;
        r += 4;
      }
      if ((t = x >> 2) != 0) {
        x = t;
        r += 2;
      }
      if ((t = x >> 1) != 0) {
        x = t;
        r += 1;
      }
      return r;
    }
    function bnBitLength() {
      if (this.t <= 0)
        return 0;
      return this.DB * (this.t - 1) + nbits(this.data[this.t - 1] ^ this.s & this.DM);
    }
    function bnpDLShiftTo(n, r) {
      var i;
      for (i = this.t - 1; i >= 0; --i)
        r.data[i + n] = this.data[i];
      for (i = n - 1; i >= 0; --i)
        r.data[i] = 0;
      r.t = this.t + n;
      r.s = this.s;
    }
    function bnpDRShiftTo(n, r) {
      for (var i = n; i < this.t; ++i)
        r.data[i - n] = this.data[i];
      r.t = Math.max(this.t - n, 0);
      r.s = this.s;
    }
    function bnpLShiftTo(n, r) {
      var bs = n % this.DB;
      var cbs = this.DB - bs;
      var bm = (1 << cbs) - 1;
      var ds = Math.floor(n / this.DB), c = this.s << bs & this.DM, i;
      for (i = this.t - 1; i >= 0; --i) {
        r.data[i + ds + 1] = this.data[i] >> cbs | c;
        c = (this.data[i] & bm) << bs;
      }
      for (i = ds - 1; i >= 0; --i)
        r.data[i] = 0;
      r.data[ds] = c;
      r.t = this.t + ds + 1;
      r.s = this.s;
      r.clamp();
    }
    function bnpRShiftTo(n, r) {
      r.s = this.s;
      var ds = Math.floor(n / this.DB);
      if (ds >= this.t) {
        r.t = 0;
        return;
      }
      var bs = n % this.DB;
      var cbs = this.DB - bs;
      var bm = (1 << bs) - 1;
      r.data[0] = this.data[ds] >> bs;
      for (var i = ds + 1; i < this.t; ++i) {
        r.data[i - ds - 1] |= (this.data[i] & bm) << cbs;
        r.data[i - ds] = this.data[i] >> bs;
      }
      if (bs > 0)
        r.data[this.t - ds - 1] |= (this.s & bm) << cbs;
      r.t = this.t - ds;
      r.clamp();
    }
    function bnpSubTo(a, r) {
      var i = 0, c = 0, m = Math.min(a.t, this.t);
      while (i < m) {
        c += this.data[i] - a.data[i];
        r.data[i++] = c & this.DM;
        c >>= this.DB;
      }
      if (a.t < this.t) {
        c -= a.s;
        while (i < this.t) {
          c += this.data[i];
          r.data[i++] = c & this.DM;
          c >>= this.DB;
        }
        c += this.s;
      } else {
        c += this.s;
        while (i < a.t) {
          c -= a.data[i];
          r.data[i++] = c & this.DM;
          c >>= this.DB;
        }
        c -= a.s;
      }
      r.s = c < 0 ? -1 : 0;
      if (c < -1)
        r.data[i++] = this.DV + c;
      else if (c > 0)
        r.data[i++] = c;
      r.t = i;
      r.clamp();
    }
    function bnpMultiplyTo(a, r) {
      var x = this.abs(), y = a.abs();
      var i = x.t;
      r.t = i + y.t;
      while (--i >= 0)
        r.data[i] = 0;
      for (i = 0; i < y.t; ++i)
        r.data[i + x.t] = x.am(0, y.data[i], r, i, 0, x.t);
      r.s = 0;
      r.clamp();
      if (this.s != a.s)
        BigInteger.ZERO.subTo(r, r);
    }
    function bnpSquareTo(r) {
      var x = this.abs();
      var i = r.t = 2 * x.t;
      while (--i >= 0)
        r.data[i] = 0;
      for (i = 0; i < x.t - 1; ++i) {
        var c = x.am(i, x.data[i], r, 2 * i, 0, 1);
        if ((r.data[i + x.t] += x.am(i + 1, 2 * x.data[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
          r.data[i + x.t] -= x.DV;
          r.data[i + x.t + 1] = 1;
        }
      }
      if (r.t > 0)
        r.data[r.t - 1] += x.am(i, x.data[i], r, 2 * i, 0, 1);
      r.s = 0;
      r.clamp();
    }
    function bnpDivRemTo(m, q, r) {
      var pm = m.abs();
      if (pm.t <= 0)
        return;
      var pt = this.abs();
      if (pt.t < pm.t) {
        if (q != null)
          q.fromInt(0);
        if (r != null)
          this.copyTo(r);
        return;
      }
      if (r == null)
        r = nbi();
      var y = nbi(), ts = this.s, ms = m.s;
      var nsh = this.DB - nbits(pm.data[pm.t - 1]);
      if (nsh > 0) {
        pm.lShiftTo(nsh, y);
        pt.lShiftTo(nsh, r);
      } else {
        pm.copyTo(y);
        pt.copyTo(r);
      }
      var ys = y.t;
      var y0 = y.data[ys - 1];
      if (y0 == 0)
        return;
      var yt = y0 * (1 << this.F1) + (ys > 1 ? y.data[ys - 2] >> this.F2 : 0);
      var d1 = this.FV / yt, d2 = (1 << this.F1) / yt, e = 1 << this.F2;
      var i = r.t, j = i - ys, t = q == null ? nbi() : q;
      y.dlShiftTo(j, t);
      if (r.compareTo(t) >= 0) {
        r.data[r.t++] = 1;
        r.subTo(t, r);
      }
      BigInteger.ONE.dlShiftTo(ys, t);
      t.subTo(y, y);
      while (y.t < ys)
        y.data[y.t++] = 0;
      while (--j >= 0) {
        var qd = r.data[--i] == y0 ? this.DM : Math.floor(r.data[i] * d1 + (r.data[i - 1] + e) * d2);
        if ((r.data[i] += y.am(0, qd, r, j, 0, ys)) < qd) {
          y.dlShiftTo(j, t);
          r.subTo(t, r);
          while (r.data[i] < --qd)
            r.subTo(t, r);
        }
      }
      if (q != null) {
        r.drShiftTo(ys, q);
        if (ts != ms)
          BigInteger.ZERO.subTo(q, q);
      }
      r.t = ys;
      r.clamp();
      if (nsh > 0)
        r.rShiftTo(nsh, r);
      if (ts < 0)
        BigInteger.ZERO.subTo(r, r);
    }
    function bnMod(a) {
      var r = nbi();
      this.abs().divRemTo(a, null, r);
      if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0)
        a.subTo(r, r);
      return r;
    }
    function Classic(m) {
      this.m = m;
    }
    function cConvert(x) {
      if (x.s < 0 || x.compareTo(this.m) >= 0)
        return x.mod(this.m);
      else
        return x;
    }
    function cRevert(x) {
      return x;
    }
    function cReduce(x) {
      x.divRemTo(this.m, null, x);
    }
    function cMulTo(x, y, r) {
      x.multiplyTo(y, r);
      this.reduce(r);
    }
    function cSqrTo(x, r) {
      x.squareTo(r);
      this.reduce(r);
    }
    Classic.prototype.convert = cConvert;
    Classic.prototype.revert = cRevert;
    Classic.prototype.reduce = cReduce;
    Classic.prototype.mulTo = cMulTo;
    Classic.prototype.sqrTo = cSqrTo;
    function bnpInvDigit() {
      if (this.t < 1)
        return 0;
      var x = this.data[0];
      if ((x & 1) == 0)
        return 0;
      var y = x & 3;
      y = y * (2 - (x & 15) * y) & 15;
      y = y * (2 - (x & 255) * y) & 255;
      y = y * (2 - ((x & 65535) * y & 65535)) & 65535;
      y = y * (2 - x * y % this.DV) % this.DV;
      return y > 0 ? this.DV - y : -y;
    }
    function Montgomery(m) {
      this.m = m;
      this.mp = m.invDigit();
      this.mpl = this.mp & 32767;
      this.mph = this.mp >> 15;
      this.um = (1 << m.DB - 15) - 1;
      this.mt2 = 2 * m.t;
    }
    function montConvert(x) {
      var r = nbi();
      x.abs().dlShiftTo(this.m.t, r);
      r.divRemTo(this.m, null, r);
      if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0)
        this.m.subTo(r, r);
      return r;
    }
    function montRevert(x) {
      var r = nbi();
      x.copyTo(r);
      this.reduce(r);
      return r;
    }
    function montReduce(x) {
      while (x.t <= this.mt2)
        x.data[x.t++] = 0;
      for (var i = 0; i < this.m.t; ++i) {
        var j = x.data[i] & 32767;
        var u0 = j * this.mpl + ((j * this.mph + (x.data[i] >> 15) * this.mpl & this.um) << 15) & x.DM;
        j = i + this.m.t;
        x.data[j] += this.m.am(0, u0, x, i, 0, this.m.t);
        while (x.data[j] >= x.DV) {
          x.data[j] -= x.DV;
          x.data[++j]++;
        }
      }
      x.clamp();
      x.drShiftTo(this.m.t, x);
      if (x.compareTo(this.m) >= 0)
        x.subTo(this.m, x);
    }
    function montSqrTo(x, r) {
      x.squareTo(r);
      this.reduce(r);
    }
    function montMulTo(x, y, r) {
      x.multiplyTo(y, r);
      this.reduce(r);
    }
    Montgomery.prototype.convert = montConvert;
    Montgomery.prototype.revert = montRevert;
    Montgomery.prototype.reduce = montReduce;
    Montgomery.prototype.mulTo = montMulTo;
    Montgomery.prototype.sqrTo = montSqrTo;
    function bnpIsEven() {
      return (this.t > 0 ? this.data[0] & 1 : this.s) == 0;
    }
    function bnpExp(e, z) {
      if (e > 4294967295 || e < 1)
        return BigInteger.ONE;
      var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e) - 1;
      g.copyTo(r);
      while (--i >= 0) {
        z.sqrTo(r, r2);
        if ((e & 1 << i) > 0)
          z.mulTo(r2, g, r);
        else {
          var t = r;
          r = r2;
          r2 = t;
        }
      }
      return z.revert(r);
    }
    function bnModPowInt(e, m) {
      var z;
      if (e < 256 || m.isEven())
        z = new Classic(m);
      else
        z = new Montgomery(m);
      return this.exp(e, z);
    }
    BigInteger.prototype.copyTo = bnpCopyTo;
    BigInteger.prototype.fromInt = bnpFromInt;
    BigInteger.prototype.fromString = bnpFromString;
    BigInteger.prototype.clamp = bnpClamp;
    BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
    BigInteger.prototype.drShiftTo = bnpDRShiftTo;
    BigInteger.prototype.lShiftTo = bnpLShiftTo;
    BigInteger.prototype.rShiftTo = bnpRShiftTo;
    BigInteger.prototype.subTo = bnpSubTo;
    BigInteger.prototype.multiplyTo = bnpMultiplyTo;
    BigInteger.prototype.squareTo = bnpSquareTo;
    BigInteger.prototype.divRemTo = bnpDivRemTo;
    BigInteger.prototype.invDigit = bnpInvDigit;
    BigInteger.prototype.isEven = bnpIsEven;
    BigInteger.prototype.exp = bnpExp;
    BigInteger.prototype.toString = bnToString;
    BigInteger.prototype.negate = bnNegate;
    BigInteger.prototype.abs = bnAbs;
    BigInteger.prototype.compareTo = bnCompareTo;
    BigInteger.prototype.bitLength = bnBitLength;
    BigInteger.prototype.mod = bnMod;
    BigInteger.prototype.modPowInt = bnModPowInt;
    BigInteger.ZERO = nbv(0);
    BigInteger.ONE = nbv(1);
    function bnClone() {
      var r = nbi();
      this.copyTo(r);
      return r;
    }
    function bnIntValue() {
      if (this.s < 0) {
        if (this.t == 1)
          return this.data[0] - this.DV;
        else if (this.t == 0)
          return -1;
      } else if (this.t == 1)
        return this.data[0];
      else if (this.t == 0)
        return 0;
      return (this.data[1] & (1 << 32 - this.DB) - 1) << this.DB | this.data[0];
    }
    function bnByteValue() {
      return this.t == 0 ? this.s : this.data[0] << 24 >> 24;
    }
    function bnShortValue() {
      return this.t == 0 ? this.s : this.data[0] << 16 >> 16;
    }
    function bnpChunkSize(r) {
      return Math.floor(Math.LN2 * this.DB / Math.log(r));
    }
    function bnSigNum() {
      if (this.s < 0)
        return -1;
      else if (this.t <= 0 || this.t == 1 && this.data[0] <= 0)
        return 0;
      else
        return 1;
    }
    function bnpToRadix(b) {
      if (b == null)
        b = 10;
      if (this.signum() == 0 || b < 2 || b > 36)
        return "0";
      var cs = this.chunkSize(b);
      var a = Math.pow(b, cs);
      var d = nbv(a), y = nbi(), z = nbi(), r = "";
      this.divRemTo(d, y, z);
      while (y.signum() > 0) {
        r = (a + z.intValue()).toString(b).substr(1) + r;
        y.divRemTo(d, y, z);
      }
      return z.intValue().toString(b) + r;
    }
    function bnpFromRadix(s, b) {
      this.fromInt(0);
      if (b == null)
        b = 10;
      var cs = this.chunkSize(b);
      var d = Math.pow(b, cs), mi = false, j = 0, w = 0;
      for (var i = 0; i < s.length; ++i) {
        var x = intAt(s, i);
        if (x < 0) {
          if (s.charAt(i) == "-" && this.signum() == 0)
            mi = true;
          continue;
        }
        w = b * w + x;
        if (++j >= cs) {
          this.dMultiply(d);
          this.dAddOffset(w, 0);
          j = 0;
          w = 0;
        }
      }
      if (j > 0) {
        this.dMultiply(Math.pow(b, j));
        this.dAddOffset(w, 0);
      }
      if (mi)
        BigInteger.ZERO.subTo(this, this);
    }
    function bnpFromNumber(a, b, c) {
      if (typeof b == "number") {
        if (a < 2)
          this.fromInt(1);
        else {
          this.fromNumber(a, c);
          if (!this.testBit(a - 1))
            this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this);
          if (this.isEven())
            this.dAddOffset(1, 0);
          while (!this.isProbablePrime(b)) {
            this.dAddOffset(2, 0);
            if (this.bitLength() > a)
              this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);
          }
        }
      } else {
        var x = new Array(), t = a & 7;
        x.length = (a >> 3) + 1;
        b.nextBytes(x);
        if (t > 0)
          x[0] &= (1 << t) - 1;
        else
          x[0] = 0;
        this.fromString(x, 256);
      }
    }
    function bnToByteArray() {
      var i = this.t, r = new Array();
      r[0] = this.s;
      var p = this.DB - i * this.DB % 8, d, k = 0;
      if (i-- > 0) {
        if (p < this.DB && (d = this.data[i] >> p) != (this.s & this.DM) >> p)
          r[k++] = d | this.s << this.DB - p;
        while (i >= 0) {
          if (p < 8) {
            d = (this.data[i] & (1 << p) - 1) << 8 - p;
            d |= this.data[--i] >> (p += this.DB - 8);
          } else {
            d = this.data[i] >> (p -= 8) & 255;
            if (p <= 0) {
              p += this.DB;
              --i;
            }
          }
          if ((d & 128) != 0)
            d |= -256;
          if (k == 0 && (this.s & 128) != (d & 128))
            ++k;
          if (k > 0 || d != this.s)
            r[k++] = d;
        }
      }
      return r;
    }
    function bnEquals(a) {
      return this.compareTo(a) == 0;
    }
    function bnMin(a) {
      return this.compareTo(a) < 0 ? this : a;
    }
    function bnMax(a) {
      return this.compareTo(a) > 0 ? this : a;
    }
    function bnpBitwiseTo(a, op, r) {
      var i, f, m = Math.min(a.t, this.t);
      for (i = 0; i < m; ++i)
        r.data[i] = op(this.data[i], a.data[i]);
      if (a.t < this.t) {
        f = a.s & this.DM;
        for (i = m; i < this.t; ++i)
          r.data[i] = op(this.data[i], f);
        r.t = this.t;
      } else {
        f = this.s & this.DM;
        for (i = m; i < a.t; ++i)
          r.data[i] = op(f, a.data[i]);
        r.t = a.t;
      }
      r.s = op(this.s, a.s);
      r.clamp();
    }
    function op_and(x, y) {
      return x & y;
    }
    function bnAnd(a) {
      var r = nbi();
      this.bitwiseTo(a, op_and, r);
      return r;
    }
    function op_or(x, y) {
      return x | y;
    }
    function bnOr(a) {
      var r = nbi();
      this.bitwiseTo(a, op_or, r);
      return r;
    }
    function op_xor(x, y) {
      return x ^ y;
    }
    function bnXor(a) {
      var r = nbi();
      this.bitwiseTo(a, op_xor, r);
      return r;
    }
    function op_andnot(x, y) {
      return x & ~y;
    }
    function bnAndNot(a) {
      var r = nbi();
      this.bitwiseTo(a, op_andnot, r);
      return r;
    }
    function bnNot() {
      var r = nbi();
      for (var i = 0; i < this.t; ++i)
        r.data[i] = this.DM & ~this.data[i];
      r.t = this.t;
      r.s = ~this.s;
      return r;
    }
    function bnShiftLeft(n) {
      var r = nbi();
      if (n < 0)
        this.rShiftTo(-n, r);
      else
        this.lShiftTo(n, r);
      return r;
    }
    function bnShiftRight(n) {
      var r = nbi();
      if (n < 0)
        this.lShiftTo(-n, r);
      else
        this.rShiftTo(n, r);
      return r;
    }
    function lbit(x) {
      if (x == 0)
        return -1;
      var r = 0;
      if ((x & 65535) == 0) {
        x >>= 16;
        r += 16;
      }
      if ((x & 255) == 0) {
        x >>= 8;
        r += 8;
      }
      if ((x & 15) == 0) {
        x >>= 4;
        r += 4;
      }
      if ((x & 3) == 0) {
        x >>= 2;
        r += 2;
      }
      if ((x & 1) == 0)
        ++r;
      return r;
    }
    function bnGetLowestSetBit() {
      for (var i = 0; i < this.t; ++i)
        if (this.data[i] != 0)
          return i * this.DB + lbit(this.data[i]);
      if (this.s < 0)
        return this.t * this.DB;
      return -1;
    }
    function cbit(x) {
      var r = 0;
      while (x != 0) {
        x &= x - 1;
        ++r;
      }
      return r;
    }
    function bnBitCount() {
      var r = 0, x = this.s & this.DM;
      for (var i = 0; i < this.t; ++i)
        r += cbit(this.data[i] ^ x);
      return r;
    }
    function bnTestBit(n) {
      var j = Math.floor(n / this.DB);
      if (j >= this.t)
        return this.s != 0;
      return (this.data[j] & 1 << n % this.DB) != 0;
    }
    function bnpChangeBit(n, op) {
      var r = BigInteger.ONE.shiftLeft(n);
      this.bitwiseTo(r, op, r);
      return r;
    }
    function bnSetBit(n) {
      return this.changeBit(n, op_or);
    }
    function bnClearBit(n) {
      return this.changeBit(n, op_andnot);
    }
    function bnFlipBit(n) {
      return this.changeBit(n, op_xor);
    }
    function bnpAddTo(a, r) {
      var i = 0, c = 0, m = Math.min(a.t, this.t);
      while (i < m) {
        c += this.data[i] + a.data[i];
        r.data[i++] = c & this.DM;
        c >>= this.DB;
      }
      if (a.t < this.t) {
        c += a.s;
        while (i < this.t) {
          c += this.data[i];
          r.data[i++] = c & this.DM;
          c >>= this.DB;
        }
        c += this.s;
      } else {
        c += this.s;
        while (i < a.t) {
          c += a.data[i];
          r.data[i++] = c & this.DM;
          c >>= this.DB;
        }
        c += a.s;
      }
      r.s = c < 0 ? -1 : 0;
      if (c > 0)
        r.data[i++] = c;
      else if (c < -1)
        r.data[i++] = this.DV + c;
      r.t = i;
      r.clamp();
    }
    function bnAdd(a) {
      var r = nbi();
      this.addTo(a, r);
      return r;
    }
    function bnSubtract(a) {
      var r = nbi();
      this.subTo(a, r);
      return r;
    }
    function bnMultiply(a) {
      var r = nbi();
      this.multiplyTo(a, r);
      return r;
    }
    function bnDivide(a) {
      var r = nbi();
      this.divRemTo(a, r, null);
      return r;
    }
    function bnRemainder(a) {
      var r = nbi();
      this.divRemTo(a, null, r);
      return r;
    }
    function bnDivideAndRemainder(a) {
      var q = nbi(), r = nbi();
      this.divRemTo(a, q, r);
      return new Array(q, r);
    }
    function bnpDMultiply(n) {
      this.data[this.t] = this.am(0, n - 1, this, 0, 0, this.t);
      ++this.t;
      this.clamp();
    }
    function bnpDAddOffset(n, w) {
      if (n == 0)
        return;
      while (this.t <= w)
        this.data[this.t++] = 0;
      this.data[w] += n;
      while (this.data[w] >= this.DV) {
        this.data[w] -= this.DV;
        if (++w >= this.t)
          this.data[this.t++] = 0;
        ++this.data[w];
      }
    }
    function NullExp() {
    }
    function nNop(x) {
      return x;
    }
    function nMulTo(x, y, r) {
      x.multiplyTo(y, r);
    }
    function nSqrTo(x, r) {
      x.squareTo(r);
    }
    NullExp.prototype.convert = nNop;
    NullExp.prototype.revert = nNop;
    NullExp.prototype.mulTo = nMulTo;
    NullExp.prototype.sqrTo = nSqrTo;
    function bnPow(e) {
      return this.exp(e, new NullExp());
    }
    function bnpMultiplyLowerTo(a, n, r) {
      var i = Math.min(this.t + a.t, n);
      r.s = 0;
      r.t = i;
      while (i > 0)
        r.data[--i] = 0;
      var j;
      for (j = r.t - this.t; i < j; ++i)
        r.data[i + this.t] = this.am(0, a.data[i], r, i, 0, this.t);
      for (j = Math.min(a.t, n); i < j; ++i)
        this.am(0, a.data[i], r, i, 0, n - i);
      r.clamp();
    }
    function bnpMultiplyUpperTo(a, n, r) {
      --n;
      var i = r.t = this.t + a.t - n;
      r.s = 0;
      while (--i >= 0)
        r.data[i] = 0;
      for (i = Math.max(n - this.t, 0); i < a.t; ++i)
        r.data[this.t + i - n] = this.am(n - i, a.data[i], r, 0, 0, this.t + i - n);
      r.clamp();
      r.drShiftTo(1, r);
    }
    function Barrett(m) {
      this.r2 = nbi();
      this.q3 = nbi();
      BigInteger.ONE.dlShiftTo(2 * m.t, this.r2);
      this.mu = this.r2.divide(m);
      this.m = m;
    }
    function barrettConvert(x) {
      if (x.s < 0 || x.t > 2 * this.m.t)
        return x.mod(this.m);
      else if (x.compareTo(this.m) < 0)
        return x;
      else {
        var r = nbi();
        x.copyTo(r);
        this.reduce(r);
        return r;
      }
    }
    function barrettRevert(x) {
      return x;
    }
    function barrettReduce(x) {
      x.drShiftTo(this.m.t - 1, this.r2);
      if (x.t > this.m.t + 1) {
        x.t = this.m.t + 1;
        x.clamp();
      }
      this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
      this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
      while (x.compareTo(this.r2) < 0)
        x.dAddOffset(1, this.m.t + 1);
      x.subTo(this.r2, x);
      while (x.compareTo(this.m) >= 0)
        x.subTo(this.m, x);
    }
    function barrettSqrTo(x, r) {
      x.squareTo(r);
      this.reduce(r);
    }
    function barrettMulTo(x, y, r) {
      x.multiplyTo(y, r);
      this.reduce(r);
    }
    Barrett.prototype.convert = barrettConvert;
    Barrett.prototype.revert = barrettRevert;
    Barrett.prototype.reduce = barrettReduce;
    Barrett.prototype.mulTo = barrettMulTo;
    Barrett.prototype.sqrTo = barrettSqrTo;
    function bnModPow(e, m) {
      var i = e.bitLength(), k, r = nbv(1), z;
      if (i <= 0)
        return r;
      else if (i < 18)
        k = 1;
      else if (i < 48)
        k = 3;
      else if (i < 144)
        k = 4;
      else if (i < 768)
        k = 5;
      else
        k = 6;
      if (i < 8)
        z = new Classic(m);
      else if (m.isEven())
        z = new Barrett(m);
      else
        z = new Montgomery(m);
      var g = new Array(), n = 3, k1 = k - 1, km = (1 << k) - 1;
      g[1] = z.convert(this);
      if (k > 1) {
        var g2 = nbi();
        z.sqrTo(g[1], g2);
        while (n <= km) {
          g[n] = nbi();
          z.mulTo(g2, g[n - 2], g[n]);
          n += 2;
        }
      }
      var j = e.t - 1, w, is1 = true, r2 = nbi(), t;
      i = nbits(e.data[j]) - 1;
      while (j >= 0) {
        if (i >= k1)
          w = e.data[j] >> i - k1 & km;
        else {
          w = (e.data[j] & (1 << i + 1) - 1) << k1 - i;
          if (j > 0)
            w |= e.data[j - 1] >> this.DB + i - k1;
        }
        n = k;
        while ((w & 1) == 0) {
          w >>= 1;
          --n;
        }
        if ((i -= n) < 0) {
          i += this.DB;
          --j;
        }
        if (is1) {
          g[w].copyTo(r);
          is1 = false;
        } else {
          while (n > 1) {
            z.sqrTo(r, r2);
            z.sqrTo(r2, r);
            n -= 2;
          }
          if (n > 0)
            z.sqrTo(r, r2);
          else {
            t = r;
            r = r2;
            r2 = t;
          }
          z.mulTo(r2, g[w], r);
        }
        while (j >= 0 && (e.data[j] & 1 << i) == 0) {
          z.sqrTo(r, r2);
          t = r;
          r = r2;
          r2 = t;
          if (--i < 0) {
            i = this.DB - 1;
            --j;
          }
        }
      }
      return z.revert(r);
    }
    function bnGCD(a) {
      var x = this.s < 0 ? this.negate() : this.clone();
      var y = a.s < 0 ? a.negate() : a.clone();
      if (x.compareTo(y) < 0) {
        var t = x;
        x = y;
        y = t;
      }
      var i = x.getLowestSetBit(), g = y.getLowestSetBit();
      if (g < 0)
        return x;
      if (i < g)
        g = i;
      if (g > 0) {
        x.rShiftTo(g, x);
        y.rShiftTo(g, y);
      }
      while (x.signum() > 0) {
        if ((i = x.getLowestSetBit()) > 0)
          x.rShiftTo(i, x);
        if ((i = y.getLowestSetBit()) > 0)
          y.rShiftTo(i, y);
        if (x.compareTo(y) >= 0) {
          x.subTo(y, x);
          x.rShiftTo(1, x);
        } else {
          y.subTo(x, y);
          y.rShiftTo(1, y);
        }
      }
      if (g > 0)
        y.lShiftTo(g, y);
      return y;
    }
    function bnpModInt(n) {
      if (n <= 0)
        return 0;
      var d = this.DV % n, r = this.s < 0 ? n - 1 : 0;
      if (this.t > 0)
        if (d == 0)
          r = this.data[0] % n;
        else
          for (var i = this.t - 1; i >= 0; --i)
            r = (d * r + this.data[i]) % n;
      return r;
    }
    function bnModInverse(m) {
      var ac = m.isEven();
      if (this.isEven() && ac || m.signum() == 0)
        return BigInteger.ZERO;
      var u = m.clone(), v = this.clone();
      var a = nbv(1), b = nbv(0), c = nbv(0), d = nbv(1);
      while (u.signum() != 0) {
        while (u.isEven()) {
          u.rShiftTo(1, u);
          if (ac) {
            if (!a.isEven() || !b.isEven()) {
              a.addTo(this, a);
              b.subTo(m, b);
            }
            a.rShiftTo(1, a);
          } else if (!b.isEven())
            b.subTo(m, b);
          b.rShiftTo(1, b);
        }
        while (v.isEven()) {
          v.rShiftTo(1, v);
          if (ac) {
            if (!c.isEven() || !d.isEven()) {
              c.addTo(this, c);
              d.subTo(m, d);
            }
            c.rShiftTo(1, c);
          } else if (!d.isEven())
            d.subTo(m, d);
          d.rShiftTo(1, d);
        }
        if (u.compareTo(v) >= 0) {
          u.subTo(v, u);
          if (ac)
            a.subTo(c, a);
          b.subTo(d, b);
        } else {
          v.subTo(u, v);
          if (ac)
            c.subTo(a, c);
          d.subTo(b, d);
        }
      }
      if (v.compareTo(BigInteger.ONE) != 0)
        return BigInteger.ZERO;
      if (d.compareTo(m) >= 0)
        return d.subtract(m);
      if (d.signum() < 0)
        d.addTo(m, d);
      else
        return d;
      if (d.signum() < 0)
        return d.add(m);
      else
        return d;
    }
    var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509];
    var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
    function bnIsProbablePrime(t) {
      var i, x = this.abs();
      if (x.t == 1 && x.data[0] <= lowprimes[lowprimes.length - 1]) {
        for (i = 0; i < lowprimes.length; ++i)
          if (x.data[0] == lowprimes[i])
            return true;
        return false;
      }
      if (x.isEven())
        return false;
      i = 1;
      while (i < lowprimes.length) {
        var m = lowprimes[i], j = i + 1;
        while (j < lowprimes.length && m < lplim)
          m *= lowprimes[j++];
        m = x.modInt(m);
        while (i < j)
          if (m % lowprimes[i++] == 0)
            return false;
      }
      return x.millerRabin(t);
    }
    function bnpMillerRabin(t) {
      var n1 = this.subtract(BigInteger.ONE);
      var k = n1.getLowestSetBit();
      if (k <= 0)
        return false;
      var r = n1.shiftRight(k);
      var prng = bnGetPrng();
      var a;
      for (var i = 0; i < t; ++i) {
        do {
          a = new BigInteger(this.bitLength(), prng);
        } while (a.compareTo(BigInteger.ONE) <= 0 || a.compareTo(n1) >= 0);
        var y = a.modPow(r, this);
        if (y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
          var j = 1;
          while (j++ < k && y.compareTo(n1) != 0) {
            y = y.modPowInt(2, this);
            if (y.compareTo(BigInteger.ONE) == 0)
              return false;
          }
          if (y.compareTo(n1) != 0)
            return false;
        }
      }
      return true;
    }
    function bnGetPrng() {
      return {
        nextBytes: function(x) {
          for (var i = 0; i < x.length; ++i) {
            x[i] = Math.floor(Math.random() * 256);
          }
        }
      };
    }
    BigInteger.prototype.chunkSize = bnpChunkSize;
    BigInteger.prototype.toRadix = bnpToRadix;
    BigInteger.prototype.fromRadix = bnpFromRadix;
    BigInteger.prototype.fromNumber = bnpFromNumber;
    BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
    BigInteger.prototype.changeBit = bnpChangeBit;
    BigInteger.prototype.addTo = bnpAddTo;
    BigInteger.prototype.dMultiply = bnpDMultiply;
    BigInteger.prototype.dAddOffset = bnpDAddOffset;
    BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
    BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
    BigInteger.prototype.modInt = bnpModInt;
    BigInteger.prototype.millerRabin = bnpMillerRabin;
    BigInteger.prototype.clone = bnClone;
    BigInteger.prototype.intValue = bnIntValue;
    BigInteger.prototype.byteValue = bnByteValue;
    BigInteger.prototype.shortValue = bnShortValue;
    BigInteger.prototype.signum = bnSigNum;
    BigInteger.prototype.toByteArray = bnToByteArray;
    BigInteger.prototype.equals = bnEquals;
    BigInteger.prototype.min = bnMin;
    BigInteger.prototype.max = bnMax;
    BigInteger.prototype.and = bnAnd;
    BigInteger.prototype.or = bnOr;
    BigInteger.prototype.xor = bnXor;
    BigInteger.prototype.andNot = bnAndNot;
    BigInteger.prototype.not = bnNot;
    BigInteger.prototype.shiftLeft = bnShiftLeft;
    BigInteger.prototype.shiftRight = bnShiftRight;
    BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
    BigInteger.prototype.bitCount = bnBitCount;
    BigInteger.prototype.testBit = bnTestBit;
    BigInteger.prototype.setBit = bnSetBit;
    BigInteger.prototype.clearBit = bnClearBit;
    BigInteger.prototype.flipBit = bnFlipBit;
    BigInteger.prototype.add = bnAdd;
    BigInteger.prototype.subtract = bnSubtract;
    BigInteger.prototype.multiply = bnMultiply;
    BigInteger.prototype.divide = bnDivide;
    BigInteger.prototype.remainder = bnRemainder;
    BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
    BigInteger.prototype.modPow = bnModPow;
    BigInteger.prototype.modInverse = bnModInverse;
    BigInteger.prototype.pow = bnPow;
    BigInteger.prototype.gcd = bnGCD;
    BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
  }
});

// node_modules/node-forge/lib/sha1.js
var require_sha1 = __commonJS({
  "node_modules/node-forge/lib/sha1.js"(exports2, module2) {
    init_node_globals();
    var forge7 = require_forge();
    require_md();
    require_util();
    var sha1 = module2.exports = forge7.sha1 = forge7.sha1 || {};
    forge7.md.sha1 = forge7.md.algorithms.sha1 = sha1;
    sha1.create = function() {
      if (!_initialized) {
        _init();
      }
      var _state = null;
      var _input = forge7.util.createBuffer();
      var _w = new Array(80);
      var md = {
        algorithm: "sha1",
        blockLength: 64,
        digestLength: 20,
        messageLength: 0,
        fullMessageLength: null,
        messageLengthSize: 8
      };
      md.start = function() {
        md.messageLength = 0;
        md.fullMessageLength = md.messageLength64 = [];
        var int32s = md.messageLengthSize / 4;
        for (var i = 0; i < int32s; ++i) {
          md.fullMessageLength.push(0);
        }
        _input = forge7.util.createBuffer();
        _state = {
          h0: 1732584193,
          h1: 4023233417,
          h2: 2562383102,
          h3: 271733878,
          h4: 3285377520
        };
        return md;
      };
      md.start();
      md.update = function(msg, encoding) {
        if (encoding === "utf8") {
          msg = forge7.util.encodeUtf8(msg);
        }
        var len = msg.length;
        md.messageLength += len;
        len = [len / 4294967296 >>> 0, len >>> 0];
        for (var i = md.fullMessageLength.length - 1; i >= 0; --i) {
          md.fullMessageLength[i] += len[1];
          len[1] = len[0] + (md.fullMessageLength[i] / 4294967296 >>> 0);
          md.fullMessageLength[i] = md.fullMessageLength[i] >>> 0;
          len[0] = len[1] / 4294967296 >>> 0;
        }
        _input.putBytes(msg);
        _update(_state, _w, _input);
        if (_input.read > 2048 || _input.length() === 0) {
          _input.compact();
        }
        return md;
      };
      md.digest = function() {
        var finalBlock = forge7.util.createBuffer();
        finalBlock.putBytes(_input.bytes());
        var remaining = md.fullMessageLength[md.fullMessageLength.length - 1] + md.messageLengthSize;
        var overflow = remaining & md.blockLength - 1;
        finalBlock.putBytes(_padding.substr(0, md.blockLength - overflow));
        var next, carry;
        var bits2 = md.fullMessageLength[0] * 8;
        for (var i = 0; i < md.fullMessageLength.length - 1; ++i) {
          next = md.fullMessageLength[i + 1] * 8;
          carry = next / 4294967296 >>> 0;
          bits2 += carry;
          finalBlock.putInt32(bits2 >>> 0);
          bits2 = next >>> 0;
        }
        finalBlock.putInt32(bits2);
        var s2 = {
          h0: _state.h0,
          h1: _state.h1,
          h2: _state.h2,
          h3: _state.h3,
          h4: _state.h4
        };
        _update(s2, _w, finalBlock);
        var rval = forge7.util.createBuffer();
        rval.putInt32(s2.h0);
        rval.putInt32(s2.h1);
        rval.putInt32(s2.h2);
        rval.putInt32(s2.h3);
        rval.putInt32(s2.h4);
        return rval;
      };
      return md;
    };
    var _padding = null;
    var _initialized = false;
    function _init() {
      _padding = String.fromCharCode(128);
      _padding += forge7.util.fillString(String.fromCharCode(0), 64);
      _initialized = true;
    }
    function _update(s, w, bytes2) {
      var t, a, b, c, d, e, f, i;
      var len = bytes2.length();
      while (len >= 64) {
        a = s.h0;
        b = s.h1;
        c = s.h2;
        d = s.h3;
        e = s.h4;
        for (i = 0; i < 16; ++i) {
          t = bytes2.getInt32();
          w[i] = t;
          f = d ^ b & (c ^ d);
          t = (a << 5 | a >>> 27) + f + e + 1518500249 + t;
          e = d;
          d = c;
          c = (b << 30 | b >>> 2) >>> 0;
          b = a;
          a = t;
        }
        for (; i < 20; ++i) {
          t = w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16];
          t = t << 1 | t >>> 31;
          w[i] = t;
          f = d ^ b & (c ^ d);
          t = (a << 5 | a >>> 27) + f + e + 1518500249 + t;
          e = d;
          d = c;
          c = (b << 30 | b >>> 2) >>> 0;
          b = a;
          a = t;
        }
        for (; i < 32; ++i) {
          t = w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16];
          t = t << 1 | t >>> 31;
          w[i] = t;
          f = b ^ c ^ d;
          t = (a << 5 | a >>> 27) + f + e + 1859775393 + t;
          e = d;
          d = c;
          c = (b << 30 | b >>> 2) >>> 0;
          b = a;
          a = t;
        }
        for (; i < 40; ++i) {
          t = w[i - 6] ^ w[i - 16] ^ w[i - 28] ^ w[i - 32];
          t = t << 2 | t >>> 30;
          w[i] = t;
          f = b ^ c ^ d;
          t = (a << 5 | a >>> 27) + f + e + 1859775393 + t;
          e = d;
          d = c;
          c = (b << 30 | b >>> 2) >>> 0;
          b = a;
          a = t;
        }
        for (; i < 60; ++i) {
          t = w[i - 6] ^ w[i - 16] ^ w[i - 28] ^ w[i - 32];
          t = t << 2 | t >>> 30;
          w[i] = t;
          f = b & c | d & (b ^ c);
          t = (a << 5 | a >>> 27) + f + e + 2400959708 + t;
          e = d;
          d = c;
          c = (b << 30 | b >>> 2) >>> 0;
          b = a;
          a = t;
        }
        for (; i < 80; ++i) {
          t = w[i - 6] ^ w[i - 16] ^ w[i - 28] ^ w[i - 32];
          t = t << 2 | t >>> 30;
          w[i] = t;
          f = b ^ c ^ d;
          t = (a << 5 | a >>> 27) + f + e + 3395469782 + t;
          e = d;
          d = c;
          c = (b << 30 | b >>> 2) >>> 0;
          b = a;
          a = t;
        }
        s.h0 = s.h0 + a | 0;
        s.h1 = s.h1 + b | 0;
        s.h2 = s.h2 + c | 0;
        s.h3 = s.h3 + d | 0;
        s.h4 = s.h4 + e | 0;
        len -= 64;
      }
    }
  }
});

// node_modules/node-forge/lib/pkcs1.js
var require_pkcs1 = __commonJS({
  "node_modules/node-forge/lib/pkcs1.js"(exports2, module2) {
    init_node_globals();
    var forge7 = require_forge();
    require_util();
    require_random();
    require_sha1();
    var pkcs1 = module2.exports = forge7.pkcs1 = forge7.pkcs1 || {};
    pkcs1.encode_rsa_oaep = function(key, message2, options) {
      var label;
      var seed;
      var md;
      var mgf1Md;
      if (typeof options === "string") {
        label = options;
        seed = arguments[3] || void 0;
        md = arguments[4] || void 0;
      } else if (options) {
        label = options.label || void 0;
        seed = options.seed || void 0;
        md = options.md || void 0;
        if (options.mgf1 && options.mgf1.md) {
          mgf1Md = options.mgf1.md;
        }
      }
      if (!md) {
        md = forge7.md.sha1.create();
      } else {
        md.start();
      }
      if (!mgf1Md) {
        mgf1Md = md;
      }
      var keyLength = Math.ceil(key.n.bitLength() / 8);
      var maxLength = keyLength - 2 * md.digestLength - 2;
      if (message2.length > maxLength) {
        var error = new Error("RSAES-OAEP input message length is too long.");
        error.length = message2.length;
        error.maxLength = maxLength;
        throw error;
      }
      if (!label) {
        label = "";
      }
      md.update(label, "raw");
      var lHash = md.digest();
      var PS = "";
      var PS_length = maxLength - message2.length;
      for (var i = 0; i < PS_length; i++) {
        PS += "\0";
      }
      var DB = lHash.getBytes() + PS + "" + message2;
      if (!seed) {
        seed = forge7.random.getBytes(md.digestLength);
      } else if (seed.length !== md.digestLength) {
        var error = new Error("Invalid RSAES-OAEP seed. The seed length must match the digest length.");
        error.seedLength = seed.length;
        error.digestLength = md.digestLength;
        throw error;
      }
      var dbMask = rsa_mgf1(seed, keyLength - md.digestLength - 1, mgf1Md);
      var maskedDB = forge7.util.xorBytes(DB, dbMask, DB.length);
      var seedMask = rsa_mgf1(maskedDB, md.digestLength, mgf1Md);
      var maskedSeed = forge7.util.xorBytes(seed, seedMask, seed.length);
      return "\0" + maskedSeed + maskedDB;
    };
    pkcs1.decode_rsa_oaep = function(key, em, options) {
      var label;
      var md;
      var mgf1Md;
      if (typeof options === "string") {
        label = options;
        md = arguments[3] || void 0;
      } else if (options) {
        label = options.label || void 0;
        md = options.md || void 0;
        if (options.mgf1 && options.mgf1.md) {
          mgf1Md = options.mgf1.md;
        }
      }
      var keyLength = Math.ceil(key.n.bitLength() / 8);
      if (em.length !== keyLength) {
        var error = new Error("RSAES-OAEP encoded message length is invalid.");
        error.length = em.length;
        error.expectedLength = keyLength;
        throw error;
      }
      if (md === void 0) {
        md = forge7.md.sha1.create();
      } else {
        md.start();
      }
      if (!mgf1Md) {
        mgf1Md = md;
      }
      if (keyLength < 2 * md.digestLength + 2) {
        throw new Error("RSAES-OAEP key is too short for the hash function.");
      }
      if (!label) {
        label = "";
      }
      md.update(label, "raw");
      var lHash = md.digest().getBytes();
      var y = em.charAt(0);
      var maskedSeed = em.substring(1, md.digestLength + 1);
      var maskedDB = em.substring(1 + md.digestLength);
      var seedMask = rsa_mgf1(maskedDB, md.digestLength, mgf1Md);
      var seed = forge7.util.xorBytes(maskedSeed, seedMask, maskedSeed.length);
      var dbMask = rsa_mgf1(seed, keyLength - md.digestLength - 1, mgf1Md);
      var db = forge7.util.xorBytes(maskedDB, dbMask, maskedDB.length);
      var lHashPrime = db.substring(0, md.digestLength);
      var error = y !== "\0";
      for (var i = 0; i < md.digestLength; ++i) {
        error |= lHash.charAt(i) !== lHashPrime.charAt(i);
      }
      var in_ps = 1;
      var index = md.digestLength;
      for (var j = md.digestLength; j < db.length; j++) {
        var code3 = db.charCodeAt(j);
        var is_0 = code3 & 1 ^ 1;
        var error_mask = in_ps ? 65534 : 0;
        error |= code3 & error_mask;
        in_ps = in_ps & is_0;
        index += in_ps;
      }
      if (error || db.charCodeAt(index) !== 1) {
        throw new Error("Invalid RSAES-OAEP padding.");
      }
      return db.substring(index + 1);
    };
    function rsa_mgf1(seed, maskLength, hash2) {
      if (!hash2) {
        hash2 = forge7.md.sha1.create();
      }
      var t = "";
      var count = Math.ceil(maskLength / hash2.digestLength);
      for (var i = 0; i < count; ++i) {
        var c = String.fromCharCode(i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, i & 255);
        hash2.start();
        hash2.update(seed + c);
        t += hash2.digest().getBytes();
      }
      return t.substring(0, maskLength);
    }
  }
});

// node_modules/node-forge/lib/prime.js
var require_prime = __commonJS({
  "node_modules/node-forge/lib/prime.js"(exports2, module2) {
    init_node_globals();
    var forge7 = require_forge();
    require_util();
    require_jsbn();
    require_random();
    (function() {
      if (forge7.prime) {
        module2.exports = forge7.prime;
        return;
      }
      var prime = module2.exports = forge7.prime = forge7.prime || {};
      var BigInteger = forge7.jsbn.BigInteger;
      var GCD_30_DELTA = [6, 4, 2, 4, 2, 4, 6, 2];
      var THIRTY = new BigInteger(null);
      THIRTY.fromInt(30);
      var op_or = function(x, y) {
        return x | y;
      };
      prime.generateProbablePrime = function(bits2, options, callback) {
        if (typeof options === "function") {
          callback = options;
          options = {};
        }
        options = options || {};
        var algorithm = options.algorithm || "PRIMEINC";
        if (typeof algorithm === "string") {
          algorithm = { name: algorithm };
        }
        algorithm.options = algorithm.options || {};
        var prng = options.prng || forge7.random;
        var rng = {
          nextBytes: function(x) {
            var b = prng.getBytesSync(x.length);
            for (var i = 0; i < x.length; ++i) {
              x[i] = b.charCodeAt(i);
            }
          }
        };
        if (algorithm.name === "PRIMEINC") {
          return primeincFindPrime(bits2, rng, algorithm.options, callback);
        }
        throw new Error("Invalid prime generation algorithm: " + algorithm.name);
      };
      function primeincFindPrime(bits2, rng, options, callback) {
        if ("workers" in options) {
          return primeincFindPrimeWithWorkers(bits2, rng, options, callback);
        }
        return primeincFindPrimeWithoutWorkers(bits2, rng, options, callback);
      }
      function primeincFindPrimeWithoutWorkers(bits2, rng, options, callback) {
        var num = generateRandom(bits2, rng);
        var deltaIdx = 0;
        var mrTests = getMillerRabinTests(num.bitLength());
        if ("millerRabinTests" in options) {
          mrTests = options.millerRabinTests;
        }
        var maxBlockTime = 10;
        if ("maxBlockTime" in options) {
          maxBlockTime = options.maxBlockTime;
        }
        _primeinc(num, bits2, rng, deltaIdx, mrTests, maxBlockTime, callback);
      }
      function _primeinc(num, bits2, rng, deltaIdx, mrTests, maxBlockTime, callback) {
        var start = +new Date();
        do {
          if (num.bitLength() > bits2) {
            num = generateRandom(bits2, rng);
          }
          if (num.isProbablePrime(mrTests)) {
            return callback(null, num);
          }
          num.dAddOffset(GCD_30_DELTA[deltaIdx++ % 8], 0);
        } while (maxBlockTime < 0 || +new Date() - start < maxBlockTime);
        forge7.util.setImmediate(function() {
          _primeinc(num, bits2, rng, deltaIdx, mrTests, maxBlockTime, callback);
        });
      }
      function primeincFindPrimeWithWorkers(bits2, rng, options, callback) {
        if (typeof Worker === "undefined") {
          return primeincFindPrimeWithoutWorkers(bits2, rng, options, callback);
        }
        var num = generateRandom(bits2, rng);
        var numWorkers = options.workers;
        var workLoad = options.workLoad || 100;
        var range = workLoad * 30 / 8;
        var workerScript = options.workerScript || "forge/prime.worker.js";
        if (numWorkers === -1) {
          return forge7.util.estimateCores(function(err, cores) {
            if (err) {
              cores = 2;
            }
            numWorkers = cores - 1;
            generate();
          });
        }
        generate();
        function generate() {
          numWorkers = Math.max(1, numWorkers);
          var workers = [];
          for (var i = 0; i < numWorkers; ++i) {
            workers[i] = new Worker(workerScript);
          }
          var running = numWorkers;
          for (var i = 0; i < numWorkers; ++i) {
            workers[i].addEventListener("message", workerMessage);
          }
          var found = false;
          function workerMessage(e) {
            if (found) {
              return;
            }
            --running;
            var data = e.data;
            if (data.found) {
              for (var i2 = 0; i2 < workers.length; ++i2) {
                workers[i2].terminate();
              }
              found = true;
              return callback(null, new BigInteger(data.prime, 16));
            }
            if (num.bitLength() > bits2) {
              num = generateRandom(bits2, rng);
            }
            var hex = num.toString(16);
            e.target.postMessage({
              hex,
              workLoad
            });
            num.dAddOffset(range, 0);
          }
        }
      }
      function generateRandom(bits2, rng) {
        var num = new BigInteger(bits2, rng);
        var bits1 = bits2 - 1;
        if (!num.testBit(bits1)) {
          num.bitwiseTo(BigInteger.ONE.shiftLeft(bits1), op_or, num);
        }
        num.dAddOffset(31 - num.mod(THIRTY).byteValue(), 0);
        return num;
      }
      function getMillerRabinTests(bits2) {
        if (bits2 <= 100)
          return 27;
        if (bits2 <= 150)
          return 18;
        if (bits2 <= 200)
          return 15;
        if (bits2 <= 250)
          return 12;
        if (bits2 <= 300)
          return 9;
        if (bits2 <= 350)
          return 8;
        if (bits2 <= 400)
          return 7;
        if (bits2 <= 500)
          return 6;
        if (bits2 <= 600)
          return 5;
        if (bits2 <= 800)
          return 4;
        if (bits2 <= 1250)
          return 3;
        return 2;
      }
    })();
  }
});

// node_modules/node-forge/lib/rsa.js
var require_rsa = __commonJS({
  "node_modules/node-forge/lib/rsa.js"(exports2, module2) {
    init_node_globals();
    var forge7 = require_forge();
    require_asn1();
    require_jsbn();
    require_oids();
    require_pkcs1();
    require_prime();
    require_random();
    require_util();
    if (typeof BigInteger === "undefined") {
      BigInteger = forge7.jsbn.BigInteger;
    }
    var BigInteger;
    var _crypto = forge7.util.isNodejs ? __require("crypto") : null;
    var asn1 = forge7.asn1;
    var util2 = forge7.util;
    forge7.pki = forge7.pki || {};
    module2.exports = forge7.pki.rsa = forge7.rsa = forge7.rsa || {};
    var pki = forge7.pki;
    var GCD_30_DELTA = [6, 4, 2, 4, 2, 4, 6, 2];
    var privateKeyValidator = {
      name: "PrivateKeyInfo",
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "PrivateKeyInfo.version",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyVersion"
      }, {
        name: "PrivateKeyInfo.privateKeyAlgorithm",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "AlgorithmIdentifier.algorithm",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.OID,
          constructed: false,
          capture: "privateKeyOid"
        }]
      }, {
        name: "PrivateKeyInfo",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.OCTETSTRING,
        constructed: false,
        capture: "privateKey"
      }]
    };
    var rsaPrivateKeyValidator = {
      name: "RSAPrivateKey",
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "RSAPrivateKey.version",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyVersion"
      }, {
        name: "RSAPrivateKey.modulus",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyModulus"
      }, {
        name: "RSAPrivateKey.publicExponent",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyPublicExponent"
      }, {
        name: "RSAPrivateKey.privateExponent",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyPrivateExponent"
      }, {
        name: "RSAPrivateKey.prime1",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyPrime1"
      }, {
        name: "RSAPrivateKey.prime2",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyPrime2"
      }, {
        name: "RSAPrivateKey.exponent1",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyExponent1"
      }, {
        name: "RSAPrivateKey.exponent2",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyExponent2"
      }, {
        name: "RSAPrivateKey.coefficient",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyCoefficient"
      }]
    };
    var rsaPublicKeyValidator = {
      name: "RSAPublicKey",
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "RSAPublicKey.modulus",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "publicKeyModulus"
      }, {
        name: "RSAPublicKey.exponent",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "publicKeyExponent"
      }]
    };
    var publicKeyValidator = forge7.pki.rsa.publicKeyValidator = {
      name: "SubjectPublicKeyInfo",
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.SEQUENCE,
      constructed: true,
      captureAsn1: "subjectPublicKeyInfo",
      value: [{
        name: "SubjectPublicKeyInfo.AlgorithmIdentifier",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "AlgorithmIdentifier.algorithm",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.OID,
          constructed: false,
          capture: "publicKeyOid"
        }]
      }, {
        name: "SubjectPublicKeyInfo.subjectPublicKey",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.BITSTRING,
        constructed: false,
        value: [{
          name: "SubjectPublicKeyInfo.subjectPublicKey.RSAPublicKey",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.SEQUENCE,
          constructed: true,
          optional: true,
          captureAsn1: "rsaPublicKey"
        }]
      }]
    };
    var digestInfoValidator = {
      name: "DigestInfo",
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "DigestInfo.DigestAlgorithm",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "DigestInfo.DigestAlgorithm.algorithmIdentifier",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.OID,
          constructed: false,
          capture: "algorithmIdentifier"
        }, {
          name: "DigestInfo.DigestAlgorithm.parameters",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.NULL,
          capture: "parameters",
          optional: true,
          constructed: false
        }]
      }, {
        name: "DigestInfo.digest",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.OCTETSTRING,
        constructed: false,
        capture: "digest"
      }]
    };
    var emsaPkcs1v15encode = function(md) {
      var oid;
      if (md.algorithm in pki.oids) {
        oid = pki.oids[md.algorithm];
      } else {
        var error = new Error("Unknown message digest algorithm.");
        error.algorithm = md.algorithm;
        throw error;
      }
      var oidBytes = asn1.oidToDer(oid).getBytes();
      var digestInfo = asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, []);
      var digestAlgorithm = asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, []);
      digestAlgorithm.value.push(asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OID, false, oidBytes));
      digestAlgorithm.value.push(asn1.create(asn1.Class.UNIVERSAL, asn1.Type.NULL, false, ""));
      var digest2 = asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OCTETSTRING, false, md.digest().getBytes());
      digestInfo.value.push(digestAlgorithm);
      digestInfo.value.push(digest2);
      return asn1.toDer(digestInfo).getBytes();
    };
    var _modPow = function(x, key, pub) {
      if (pub) {
        return x.modPow(key.e, key.n);
      }
      if (!key.p || !key.q) {
        return x.modPow(key.d, key.n);
      }
      if (!key.dP) {
        key.dP = key.d.mod(key.p.subtract(BigInteger.ONE));
      }
      if (!key.dQ) {
        key.dQ = key.d.mod(key.q.subtract(BigInteger.ONE));
      }
      if (!key.qInv) {
        key.qInv = key.q.modInverse(key.p);
      }
      var r;
      do {
        r = new BigInteger(forge7.util.bytesToHex(forge7.random.getBytes(key.n.bitLength() / 8)), 16);
      } while (r.compareTo(key.n) >= 0 || !r.gcd(key.n).equals(BigInteger.ONE));
      x = x.multiply(r.modPow(key.e, key.n)).mod(key.n);
      var xp = x.mod(key.p).modPow(key.dP, key.p);
      var xq = x.mod(key.q).modPow(key.dQ, key.q);
      while (xp.compareTo(xq) < 0) {
        xp = xp.add(key.p);
      }
      var y = xp.subtract(xq).multiply(key.qInv).mod(key.p).multiply(key.q).add(xq);
      y = y.multiply(r.modInverse(key.n)).mod(key.n);
      return y;
    };
    pki.rsa.encrypt = function(m, key, bt) {
      var pub = bt;
      var eb;
      var k = Math.ceil(key.n.bitLength() / 8);
      if (bt !== false && bt !== true) {
        pub = bt === 2;
        eb = _encodePkcs1_v1_5(m, key, bt);
      } else {
        eb = forge7.util.createBuffer();
        eb.putBytes(m);
      }
      var x = new BigInteger(eb.toHex(), 16);
      var y = _modPow(x, key, pub);
      var yhex = y.toString(16);
      var ed = forge7.util.createBuffer();
      var zeros = k - Math.ceil(yhex.length / 2);
      while (zeros > 0) {
        ed.putByte(0);
        --zeros;
      }
      ed.putBytes(forge7.util.hexToBytes(yhex));
      return ed.getBytes();
    };
    pki.rsa.decrypt = function(ed, key, pub, ml) {
      var k = Math.ceil(key.n.bitLength() / 8);
      if (ed.length !== k) {
        var error = new Error("Encrypted message length is invalid.");
        error.length = ed.length;
        error.expected = k;
        throw error;
      }
      var y = new BigInteger(forge7.util.createBuffer(ed).toHex(), 16);
      if (y.compareTo(key.n) >= 0) {
        throw new Error("Encrypted message is invalid.");
      }
      var x = _modPow(y, key, pub);
      var xhex = x.toString(16);
      var eb = forge7.util.createBuffer();
      var zeros = k - Math.ceil(xhex.length / 2);
      while (zeros > 0) {
        eb.putByte(0);
        --zeros;
      }
      eb.putBytes(forge7.util.hexToBytes(xhex));
      if (ml !== false) {
        return _decodePkcs1_v1_5(eb.getBytes(), key, pub);
      }
      return eb.getBytes();
    };
    pki.rsa.createKeyPairGenerationState = function(bits2, e, options) {
      if (typeof bits2 === "string") {
        bits2 = parseInt(bits2, 10);
      }
      bits2 = bits2 || 2048;
      options = options || {};
      var prng = options.prng || forge7.random;
      var rng = {
        nextBytes: function(x) {
          var b = prng.getBytesSync(x.length);
          for (var i = 0; i < x.length; ++i) {
            x[i] = b.charCodeAt(i);
          }
        }
      };
      var algorithm = options.algorithm || "PRIMEINC";
      var rval;
      if (algorithm === "PRIMEINC") {
        rval = {
          algorithm,
          state: 0,
          bits: bits2,
          rng,
          eInt: e || 65537,
          e: new BigInteger(null),
          p: null,
          q: null,
          qBits: bits2 >> 1,
          pBits: bits2 - (bits2 >> 1),
          pqState: 0,
          num: null,
          keys: null
        };
        rval.e.fromInt(rval.eInt);
      } else {
        throw new Error("Invalid key generation algorithm: " + algorithm);
      }
      return rval;
    };
    pki.rsa.stepKeyPairGenerationState = function(state, n) {
      if (!("algorithm" in state)) {
        state.algorithm = "PRIMEINC";
      }
      var THIRTY = new BigInteger(null);
      THIRTY.fromInt(30);
      var deltaIdx = 0;
      var op_or = function(x, y) {
        return x | y;
      };
      var t1 = +new Date();
      var t2;
      var total = 0;
      while (state.keys === null && (n <= 0 || total < n)) {
        if (state.state === 0) {
          var bits2 = state.p === null ? state.pBits : state.qBits;
          var bits1 = bits2 - 1;
          if (state.pqState === 0) {
            state.num = new BigInteger(bits2, state.rng);
            if (!state.num.testBit(bits1)) {
              state.num.bitwiseTo(BigInteger.ONE.shiftLeft(bits1), op_or, state.num);
            }
            state.num.dAddOffset(31 - state.num.mod(THIRTY).byteValue(), 0);
            deltaIdx = 0;
            ++state.pqState;
          } else if (state.pqState === 1) {
            if (state.num.bitLength() > bits2) {
              state.pqState = 0;
            } else if (state.num.isProbablePrime(_getMillerRabinTests(state.num.bitLength()))) {
              ++state.pqState;
            } else {
              state.num.dAddOffset(GCD_30_DELTA[deltaIdx++ % 8], 0);
            }
          } else if (state.pqState === 2) {
            state.pqState = state.num.subtract(BigInteger.ONE).gcd(state.e).compareTo(BigInteger.ONE) === 0 ? 3 : 0;
          } else if (state.pqState === 3) {
            state.pqState = 0;
            if (state.p === null) {
              state.p = state.num;
            } else {
              state.q = state.num;
            }
            if (state.p !== null && state.q !== null) {
              ++state.state;
            }
            state.num = null;
          }
        } else if (state.state === 1) {
          if (state.p.compareTo(state.q) < 0) {
            state.num = state.p;
            state.p = state.q;
            state.q = state.num;
          }
          ++state.state;
        } else if (state.state === 2) {
          state.p1 = state.p.subtract(BigInteger.ONE);
          state.q1 = state.q.subtract(BigInteger.ONE);
          state.phi = state.p1.multiply(state.q1);
          ++state.state;
        } else if (state.state === 3) {
          if (state.phi.gcd(state.e).compareTo(BigInteger.ONE) === 0) {
            ++state.state;
          } else {
            state.p = null;
            state.q = null;
            state.state = 0;
          }
        } else if (state.state === 4) {
          state.n = state.p.multiply(state.q);
          if (state.n.bitLength() === state.bits) {
            ++state.state;
          } else {
            state.q = null;
            state.state = 0;
          }
        } else if (state.state === 5) {
          var d = state.e.modInverse(state.phi);
          state.keys = {
            privateKey: pki.rsa.setPrivateKey(state.n, state.e, d, state.p, state.q, d.mod(state.p1), d.mod(state.q1), state.q.modInverse(state.p)),
            publicKey: pki.rsa.setPublicKey(state.n, state.e)
          };
        }
        t2 = +new Date();
        total += t2 - t1;
        t1 = t2;
      }
      return state.keys !== null;
    };
    pki.rsa.generateKeyPair = function(bits2, e, options, callback) {
      if (arguments.length === 1) {
        if (typeof bits2 === "object") {
          options = bits2;
          bits2 = void 0;
        } else if (typeof bits2 === "function") {
          callback = bits2;
          bits2 = void 0;
        }
      } else if (arguments.length === 2) {
        if (typeof bits2 === "number") {
          if (typeof e === "function") {
            callback = e;
            e = void 0;
          } else if (typeof e !== "number") {
            options = e;
            e = void 0;
          }
        } else {
          options = bits2;
          callback = e;
          bits2 = void 0;
          e = void 0;
        }
      } else if (arguments.length === 3) {
        if (typeof e === "number") {
          if (typeof options === "function") {
            callback = options;
            options = void 0;
          }
        } else {
          callback = options;
          options = e;
          e = void 0;
        }
      }
      options = options || {};
      if (bits2 === void 0) {
        bits2 = options.bits || 2048;
      }
      if (e === void 0) {
        e = options.e || 65537;
      }
      if (!forge7.options.usePureJavaScript && !options.prng && bits2 >= 256 && bits2 <= 16384 && (e === 65537 || e === 3)) {
        if (callback) {
          if (_detectNodeCrypto("generateKeyPair")) {
            return _crypto.generateKeyPair("rsa", {
              modulusLength: bits2,
              publicExponent: e,
              publicKeyEncoding: {
                type: "spki",
                format: "pem"
              },
              privateKeyEncoding: {
                type: "pkcs8",
                format: "pem"
              }
            }, function(err, pub, priv) {
              if (err) {
                return callback(err);
              }
              callback(null, {
                privateKey: pki.privateKeyFromPem(priv),
                publicKey: pki.publicKeyFromPem(pub)
              });
            });
          }
          if (_detectSubtleCrypto("generateKey") && _detectSubtleCrypto("exportKey")) {
            return util2.globalScope.crypto.subtle.generateKey({
              name: "RSASSA-PKCS1-v1_5",
              modulusLength: bits2,
              publicExponent: _intToUint8Array(e),
              hash: { name: "SHA-256" }
            }, true, ["sign", "verify"]).then(function(pair) {
              return util2.globalScope.crypto.subtle.exportKey("pkcs8", pair.privateKey);
            }).then(void 0, function(err) {
              callback(err);
            }).then(function(pkcs8) {
              if (pkcs8) {
                var privateKey = pki.privateKeyFromAsn1(asn1.fromDer(forge7.util.createBuffer(pkcs8)));
                callback(null, {
                  privateKey,
                  publicKey: pki.setRsaPublicKey(privateKey.n, privateKey.e)
                });
              }
            });
          }
          if (_detectSubtleMsCrypto("generateKey") && _detectSubtleMsCrypto("exportKey")) {
            var genOp = util2.globalScope.msCrypto.subtle.generateKey({
              name: "RSASSA-PKCS1-v1_5",
              modulusLength: bits2,
              publicExponent: _intToUint8Array(e),
              hash: { name: "SHA-256" }
            }, true, ["sign", "verify"]);
            genOp.oncomplete = function(e2) {
              var pair = e2.target.result;
              var exportOp = util2.globalScope.msCrypto.subtle.exportKey("pkcs8", pair.privateKey);
              exportOp.oncomplete = function(e3) {
                var pkcs8 = e3.target.result;
                var privateKey = pki.privateKeyFromAsn1(asn1.fromDer(forge7.util.createBuffer(pkcs8)));
                callback(null, {
                  privateKey,
                  publicKey: pki.setRsaPublicKey(privateKey.n, privateKey.e)
                });
              };
              exportOp.onerror = function(err) {
                callback(err);
              };
            };
            genOp.onerror = function(err) {
              callback(err);
            };
            return;
          }
        } else {
          if (_detectNodeCrypto("generateKeyPairSync")) {
            var keypair = _crypto.generateKeyPairSync("rsa", {
              modulusLength: bits2,
              publicExponent: e,
              publicKeyEncoding: {
                type: "spki",
                format: "pem"
              },
              privateKeyEncoding: {
                type: "pkcs8",
                format: "pem"
              }
            });
            return {
              privateKey: pki.privateKeyFromPem(keypair.privateKey),
              publicKey: pki.publicKeyFromPem(keypair.publicKey)
            };
          }
        }
      }
      var state = pki.rsa.createKeyPairGenerationState(bits2, e, options);
      if (!callback) {
        pki.rsa.stepKeyPairGenerationState(state, 0);
        return state.keys;
      }
      _generateKeyPair(state, options, callback);
    };
    pki.setRsaPublicKey = pki.rsa.setPublicKey = function(n, e) {
      var key = {
        n,
        e
      };
      key.encrypt = function(data, scheme, schemeOptions) {
        if (typeof scheme === "string") {
          scheme = scheme.toUpperCase();
        } else if (scheme === void 0) {
          scheme = "RSAES-PKCS1-V1_5";
        }
        if (scheme === "RSAES-PKCS1-V1_5") {
          scheme = {
            encode: function(m, key2, pub) {
              return _encodePkcs1_v1_5(m, key2, 2).getBytes();
            }
          };
        } else if (scheme === "RSA-OAEP" || scheme === "RSAES-OAEP") {
          scheme = {
            encode: function(m, key2) {
              return forge7.pkcs1.encode_rsa_oaep(key2, m, schemeOptions);
            }
          };
        } else if (["RAW", "NONE", "NULL", null].indexOf(scheme) !== -1) {
          scheme = { encode: function(e3) {
            return e3;
          } };
        } else if (typeof scheme === "string") {
          throw new Error('Unsupported encryption scheme: "' + scheme + '".');
        }
        var e2 = scheme.encode(data, key, true);
        return pki.rsa.encrypt(e2, key, true);
      };
      key.verify = function(digest2, signature, scheme, options) {
        if (typeof scheme === "string") {
          scheme = scheme.toUpperCase();
        } else if (scheme === void 0) {
          scheme = "RSASSA-PKCS1-V1_5";
        }
        if (options === void 0) {
          options = {
            _parseAllDigestBytes: true
          };
        }
        if (!("_parseAllDigestBytes" in options)) {
          options._parseAllDigestBytes = true;
        }
        if (scheme === "RSASSA-PKCS1-V1_5") {
          scheme = {
            verify: function(digest3, d2) {
              d2 = _decodePkcs1_v1_5(d2, key, true);
              var obj = asn1.fromDer(d2, {
                parseAllBytes: options._parseAllDigestBytes
              });
              var capture = {};
              var errors = [];
              if (!asn1.validate(obj, digestInfoValidator, capture, errors)) {
                var error = new Error("ASN.1 object does not contain a valid RSASSA-PKCS1-v1_5 DigestInfo value.");
                error.errors = errors;
                throw error;
              }
              var oid = asn1.derToOid(capture.algorithmIdentifier);
              if (!(oid === forge7.oids.md2 || oid === forge7.oids.md5 || oid === forge7.oids.sha1 || oid === forge7.oids.sha224 || oid === forge7.oids.sha256 || oid === forge7.oids.sha384 || oid === forge7.oids.sha512 || oid === forge7.oids["sha512-224"] || oid === forge7.oids["sha512-256"])) {
                var error = new Error("Unknown RSASSA-PKCS1-v1_5 DigestAlgorithm identifier.");
                error.oid = oid;
                throw error;
              }
              if (oid === forge7.oids.md2 || oid === forge7.oids.md5) {
                if (!("parameters" in capture)) {
                  throw new Error("ASN.1 object does not contain a valid RSASSA-PKCS1-v1_5 DigestInfo value. Missing algorithm identifer NULL parameters.");
                }
              }
              return digest3 === capture.digest;
            }
          };
        } else if (scheme === "NONE" || scheme === "NULL" || scheme === null) {
          scheme = {
            verify: function(digest3, d2) {
              d2 = _decodePkcs1_v1_5(d2, key, true);
              return digest3 === d2;
            }
          };
        }
        var d = pki.rsa.decrypt(signature, key, true, false);
        return scheme.verify(digest2, d, key.n.bitLength());
      };
      return key;
    };
    pki.setRsaPrivateKey = pki.rsa.setPrivateKey = function(n, e, d, p, q, dP, dQ, qInv) {
      var key = {
        n,
        e,
        d,
        p,
        q,
        dP,
        dQ,
        qInv
      };
      key.decrypt = function(data, scheme, schemeOptions) {
        if (typeof scheme === "string") {
          scheme = scheme.toUpperCase();
        } else if (scheme === void 0) {
          scheme = "RSAES-PKCS1-V1_5";
        }
        var d2 = pki.rsa.decrypt(data, key, false, false);
        if (scheme === "RSAES-PKCS1-V1_5") {
          scheme = { decode: _decodePkcs1_v1_5 };
        } else if (scheme === "RSA-OAEP" || scheme === "RSAES-OAEP") {
          scheme = {
            decode: function(d3, key2) {
              return forge7.pkcs1.decode_rsa_oaep(key2, d3, schemeOptions);
            }
          };
        } else if (["RAW", "NONE", "NULL", null].indexOf(scheme) !== -1) {
          scheme = { decode: function(d3) {
            return d3;
          } };
        } else {
          throw new Error('Unsupported encryption scheme: "' + scheme + '".');
        }
        return scheme.decode(d2, key, false);
      };
      key.sign = function(md, scheme) {
        var bt = false;
        if (typeof scheme === "string") {
          scheme = scheme.toUpperCase();
        }
        if (scheme === void 0 || scheme === "RSASSA-PKCS1-V1_5") {
          scheme = { encode: emsaPkcs1v15encode };
          bt = 1;
        } else if (scheme === "NONE" || scheme === "NULL" || scheme === null) {
          scheme = { encode: function() {
            return md;
          } };
          bt = 1;
        }
        var d2 = scheme.encode(md, key.n.bitLength());
        return pki.rsa.encrypt(d2, key, bt);
      };
      return key;
    };
    pki.wrapRsaPrivateKey = function(rsaKey) {
      return asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
        asn1.create(asn1.Class.UNIVERSAL, asn1.Type.INTEGER, false, asn1.integerToDer(0).getBytes()),
        asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
          asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OID, false, asn1.oidToDer(pki.oids.rsaEncryption).getBytes()),
          asn1.create(asn1.Class.UNIVERSAL, asn1.Type.NULL, false, "")
        ]),
        asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OCTETSTRING, false, asn1.toDer(rsaKey).getBytes())
      ]);
    };
    pki.privateKeyFromAsn1 = function(obj) {
      var capture = {};
      var errors = [];
      if (asn1.validate(obj, privateKeyValidator, capture, errors)) {
        obj = asn1.fromDer(forge7.util.createBuffer(capture.privateKey));
      }
      capture = {};
      errors = [];
      if (!asn1.validate(obj, rsaPrivateKeyValidator, capture, errors)) {
        var error = new Error("Cannot read private key. ASN.1 object does not contain an RSAPrivateKey.");
        error.errors = errors;
        throw error;
      }
      var n, e, d, p, q, dP, dQ, qInv;
      n = forge7.util.createBuffer(capture.privateKeyModulus).toHex();
      e = forge7.util.createBuffer(capture.privateKeyPublicExponent).toHex();
      d = forge7.util.createBuffer(capture.privateKeyPrivateExponent).toHex();
      p = forge7.util.createBuffer(capture.privateKeyPrime1).toHex();
      q = forge7.util.createBuffer(capture.privateKeyPrime2).toHex();
      dP = forge7.util.createBuffer(capture.privateKeyExponent1).toHex();
      dQ = forge7.util.createBuffer(capture.privateKeyExponent2).toHex();
      qInv = forge7.util.createBuffer(capture.privateKeyCoefficient).toHex();
      return pki.setRsaPrivateKey(new BigInteger(n, 16), new BigInteger(e, 16), new BigInteger(d, 16), new BigInteger(p, 16), new BigInteger(q, 16), new BigInteger(dP, 16), new BigInteger(dQ, 16), new BigInteger(qInv, 16));
    };
    pki.privateKeyToAsn1 = pki.privateKeyToRSAPrivateKey = function(key) {
      return asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
        asn1.create(asn1.Class.UNIVERSAL, asn1.Type.INTEGER, false, asn1.integerToDer(0).getBytes()),
        asn1.create(asn1.Class.UNIVERSAL, asn1.Type.INTEGER, false, _bnToBytes(key.n)),
        asn1.create(asn1.Class.UNIVERSAL, asn1.Type.INTEGER, false, _bnToBytes(key.e)),
        asn1.create(asn1.Class.UNIVERSAL, asn1.Type.INTEGER, false, _bnToBytes(key.d)),
        asn1.create(asn1.Class.UNIVERSAL, asn1.Type.INTEGER, false, _bnToBytes(key.p)),
        asn1.create(asn1.Class.UNIVERSAL, asn1.Type.INTEGER, false, _bnToBytes(key.q)),
        asn1.create(asn1.Class.UNIVERSAL, asn1.Type.INTEGER, false, _bnToBytes(key.dP)),
        asn1.create(asn1.Class.UNIVERSAL, asn1.Type.INTEGER, false, _bnToBytes(key.dQ)),
        asn1.create(asn1.Class.UNIVERSAL, asn1.Type.INTEGER, false, _bnToBytes(key.qInv))
      ]);
    };
    pki.publicKeyFromAsn1 = function(obj) {
      var capture = {};
      var errors = [];
      if (asn1.validate(obj, publicKeyValidator, capture, errors)) {
        var oid = asn1.derToOid(capture.publicKeyOid);
        if (oid !== pki.oids.rsaEncryption) {
          var error = new Error("Cannot read public key. Unknown OID.");
          error.oid = oid;
          throw error;
        }
        obj = capture.rsaPublicKey;
      }
      errors = [];
      if (!asn1.validate(obj, rsaPublicKeyValidator, capture, errors)) {
        var error = new Error("Cannot read public key. ASN.1 object does not contain an RSAPublicKey.");
        error.errors = errors;
        throw error;
      }
      var n = forge7.util.createBuffer(capture.publicKeyModulus).toHex();
      var e = forge7.util.createBuffer(capture.publicKeyExponent).toHex();
      return pki.setRsaPublicKey(new BigInteger(n, 16), new BigInteger(e, 16));
    };
    pki.publicKeyToAsn1 = pki.publicKeyToSubjectPublicKeyInfo = function(key) {
      return asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
        asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
          asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OID, false, asn1.oidToDer(pki.oids.rsaEncryption).getBytes()),
          asn1.create(asn1.Class.UNIVERSAL, asn1.Type.NULL, false, "")
        ]),
        asn1.create(asn1.Class.UNIVERSAL, asn1.Type.BITSTRING, false, [
          pki.publicKeyToRSAPublicKey(key)
        ])
      ]);
    };
    pki.publicKeyToRSAPublicKey = function(key) {
      return asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
        asn1.create(asn1.Class.UNIVERSAL, asn1.Type.INTEGER, false, _bnToBytes(key.n)),
        asn1.create(asn1.Class.UNIVERSAL, asn1.Type.INTEGER, false, _bnToBytes(key.e))
      ]);
    };
    function _encodePkcs1_v1_5(m, key, bt) {
      var eb = forge7.util.createBuffer();
      var k = Math.ceil(key.n.bitLength() / 8);
      if (m.length > k - 11) {
        var error = new Error("Message is too long for PKCS#1 v1.5 padding.");
        error.length = m.length;
        error.max = k - 11;
        throw error;
      }
      eb.putByte(0);
      eb.putByte(bt);
      var padNum = k - 3 - m.length;
      var padByte;
      if (bt === 0 || bt === 1) {
        padByte = bt === 0 ? 0 : 255;
        for (var i = 0; i < padNum; ++i) {
          eb.putByte(padByte);
        }
      } else {
        while (padNum > 0) {
          var numZeros = 0;
          var padBytes = forge7.random.getBytes(padNum);
          for (var i = 0; i < padNum; ++i) {
            padByte = padBytes.charCodeAt(i);
            if (padByte === 0) {
              ++numZeros;
            } else {
              eb.putByte(padByte);
            }
          }
          padNum = numZeros;
        }
      }
      eb.putByte(0);
      eb.putBytes(m);
      return eb;
    }
    function _decodePkcs1_v1_5(em, key, pub, ml) {
      var k = Math.ceil(key.n.bitLength() / 8);
      var eb = forge7.util.createBuffer(em);
      var first = eb.getByte();
      var bt = eb.getByte();
      if (first !== 0 || pub && bt !== 0 && bt !== 1 || !pub && bt != 2 || pub && bt === 0 && typeof ml === "undefined") {
        throw new Error("Encryption block is invalid.");
      }
      var padNum = 0;
      if (bt === 0) {
        padNum = k - 3 - ml;
        for (var i = 0; i < padNum; ++i) {
          if (eb.getByte() !== 0) {
            throw new Error("Encryption block is invalid.");
          }
        }
      } else if (bt === 1) {
        padNum = 0;
        while (eb.length() > 1) {
          if (eb.getByte() !== 255) {
            --eb.read;
            break;
          }
          ++padNum;
        }
      } else if (bt === 2) {
        padNum = 0;
        while (eb.length() > 1) {
          if (eb.getByte() === 0) {
            --eb.read;
            break;
          }
          ++padNum;
        }
      }
      var zero = eb.getByte();
      if (zero !== 0 || padNum !== k - 3 - eb.length()) {
        throw new Error("Encryption block is invalid.");
      }
      return eb.getBytes();
    }
    function _generateKeyPair(state, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      options = options || {};
      var opts = {
        algorithm: {
          name: options.algorithm || "PRIMEINC",
          options: {
            workers: options.workers || 2,
            workLoad: options.workLoad || 100,
            workerScript: options.workerScript
          }
        }
      };
      if ("prng" in options) {
        opts.prng = options.prng;
      }
      generate();
      function generate() {
        getPrime(state.pBits, function(err, num) {
          if (err) {
            return callback(err);
          }
          state.p = num;
          if (state.q !== null) {
            return finish(err, state.q);
          }
          getPrime(state.qBits, finish);
        });
      }
      function getPrime(bits2, callback2) {
        forge7.prime.generateProbablePrime(bits2, opts, callback2);
      }
      function finish(err, num) {
        if (err) {
          return callback(err);
        }
        state.q = num;
        if (state.p.compareTo(state.q) < 0) {
          var tmp = state.p;
          state.p = state.q;
          state.q = tmp;
        }
        if (state.p.subtract(BigInteger.ONE).gcd(state.e).compareTo(BigInteger.ONE) !== 0) {
          state.p = null;
          generate();
          return;
        }
        if (state.q.subtract(BigInteger.ONE).gcd(state.e).compareTo(BigInteger.ONE) !== 0) {
          state.q = null;
          getPrime(state.qBits, finish);
          return;
        }
        state.p1 = state.p.subtract(BigInteger.ONE);
        state.q1 = state.q.subtract(BigInteger.ONE);
        state.phi = state.p1.multiply(state.q1);
        if (state.phi.gcd(state.e).compareTo(BigInteger.ONE) !== 0) {
          state.p = state.q = null;
          generate();
          return;
        }
        state.n = state.p.multiply(state.q);
        if (state.n.bitLength() !== state.bits) {
          state.q = null;
          getPrime(state.qBits, finish);
          return;
        }
        var d = state.e.modInverse(state.phi);
        state.keys = {
          privateKey: pki.rsa.setPrivateKey(state.n, state.e, d, state.p, state.q, d.mod(state.p1), d.mod(state.q1), state.q.modInverse(state.p)),
          publicKey: pki.rsa.setPublicKey(state.n, state.e)
        };
        callback(null, state.keys);
      }
    }
    function _bnToBytes(b) {
      var hex = b.toString(16);
      if (hex[0] >= "8") {
        hex = "00" + hex;
      }
      var bytes2 = forge7.util.hexToBytes(hex);
      if (bytes2.length > 1 && (bytes2.charCodeAt(0) === 0 && (bytes2.charCodeAt(1) & 128) === 0 || bytes2.charCodeAt(0) === 255 && (bytes2.charCodeAt(1) & 128) === 128)) {
        return bytes2.substr(1);
      }
      return bytes2;
    }
    function _getMillerRabinTests(bits2) {
      if (bits2 <= 100)
        return 27;
      if (bits2 <= 150)
        return 18;
      if (bits2 <= 200)
        return 15;
      if (bits2 <= 250)
        return 12;
      if (bits2 <= 300)
        return 9;
      if (bits2 <= 350)
        return 8;
      if (bits2 <= 400)
        return 7;
      if (bits2 <= 500)
        return 6;
      if (bits2 <= 600)
        return 5;
      if (bits2 <= 800)
        return 4;
      if (bits2 <= 1250)
        return 3;
      return 2;
    }
    function _detectNodeCrypto(fn) {
      return forge7.util.isNodejs && typeof _crypto[fn] === "function";
    }
    function _detectSubtleCrypto(fn) {
      return typeof util2.globalScope !== "undefined" && typeof util2.globalScope.crypto === "object" && typeof util2.globalScope.crypto.subtle === "object" && typeof util2.globalScope.crypto.subtle[fn] === "function";
    }
    function _detectSubtleMsCrypto(fn) {
      return typeof util2.globalScope !== "undefined" && typeof util2.globalScope.msCrypto === "object" && typeof util2.globalScope.msCrypto.subtle === "object" && typeof util2.globalScope.msCrypto.subtle[fn] === "function";
    }
    function _intToUint8Array(x) {
      var bytes2 = forge7.util.hexToBytes(x.toString(16));
      var buffer2 = new Uint8Array(bytes2.length);
      for (var i = 0; i < bytes2.length; ++i) {
        buffer2[i] = bytes2.charCodeAt(i);
      }
      return buffer2;
    }
  }
});

// node_modules/node-forge/lib/pbe.js
var require_pbe = __commonJS({
  "node_modules/node-forge/lib/pbe.js"(exports2, module2) {
    init_node_globals();
    var forge7 = require_forge();
    require_aes();
    require_asn1();
    require_des();
    require_md();
    require_oids();
    require_pbkdf2();
    require_pem();
    require_random();
    require_rc2();
    require_rsa();
    require_util();
    if (typeof BigInteger === "undefined") {
      BigInteger = forge7.jsbn.BigInteger;
    }
    var BigInteger;
    var asn1 = forge7.asn1;
    var pki = forge7.pki = forge7.pki || {};
    module2.exports = pki.pbe = forge7.pbe = forge7.pbe || {};
    var oids = pki.oids;
    var encryptedPrivateKeyValidator = {
      name: "EncryptedPrivateKeyInfo",
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "EncryptedPrivateKeyInfo.encryptionAlgorithm",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "AlgorithmIdentifier.algorithm",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.OID,
          constructed: false,
          capture: "encryptionOid"
        }, {
          name: "AlgorithmIdentifier.parameters",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.SEQUENCE,
          constructed: true,
          captureAsn1: "encryptionParams"
        }]
      }, {
        name: "EncryptedPrivateKeyInfo.encryptedData",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.OCTETSTRING,
        constructed: false,
        capture: "encryptedData"
      }]
    };
    var PBES2AlgorithmsValidator = {
      name: "PBES2Algorithms",
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "PBES2Algorithms.keyDerivationFunc",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "PBES2Algorithms.keyDerivationFunc.oid",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.OID,
          constructed: false,
          capture: "kdfOid"
        }, {
          name: "PBES2Algorithms.params",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.SEQUENCE,
          constructed: true,
          value: [{
            name: "PBES2Algorithms.params.salt",
            tagClass: asn1.Class.UNIVERSAL,
            type: asn1.Type.OCTETSTRING,
            constructed: false,
            capture: "kdfSalt"
          }, {
            name: "PBES2Algorithms.params.iterationCount",
            tagClass: asn1.Class.UNIVERSAL,
            type: asn1.Type.INTEGER,
            constructed: false,
            capture: "kdfIterationCount"
          }, {
            name: "PBES2Algorithms.params.keyLength",
            tagClass: asn1.Class.UNIVERSAL,
            type: asn1.Type.INTEGER,
            constructed: false,
            optional: true,
            capture: "keyLength"
          }, {
            name: "PBES2Algorithms.params.prf",
            tagClass: asn1.Class.UNIVERSAL,
            type: asn1.Type.SEQUENCE,
            constructed: true,
            optional: true,
            value: [{
              name: "PBES2Algorithms.params.prf.algorithm",
              tagClass: asn1.Class.UNIVERSAL,
              type: asn1.Type.OID,
              constructed: false,
              capture: "prfOid"
            }]
          }]
        }]
      }, {
        name: "PBES2Algorithms.encryptionScheme",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "PBES2Algorithms.encryptionScheme.oid",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.OID,
          constructed: false,
          capture: "encOid"
        }, {
          name: "PBES2Algorithms.encryptionScheme.iv",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.OCTETSTRING,
          constructed: false,
          capture: "encIv"
        }]
      }]
    };
    var pkcs12PbeParamsValidator = {
      name: "pkcs-12PbeParams",
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "pkcs-12PbeParams.salt",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.OCTETSTRING,
        constructed: false,
        capture: "salt"
      }, {
        name: "pkcs-12PbeParams.iterations",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "iterations"
      }]
    };
    pki.encryptPrivateKeyInfo = function(obj, password, options) {
      options = options || {};
      options.saltSize = options.saltSize || 8;
      options.count = options.count || 2048;
      options.algorithm = options.algorithm || "aes128";
      options.prfAlgorithm = options.prfAlgorithm || "sha1";
      var salt = forge7.random.getBytesSync(options.saltSize);
      var count = options.count;
      var countBytes = asn1.integerToDer(count);
      var dkLen;
      var encryptionAlgorithm;
      var encryptedData;
      if (options.algorithm.indexOf("aes") === 0 || options.algorithm === "des") {
        var ivLen, encOid, cipherFn;
        switch (options.algorithm) {
          case "aes128":
            dkLen = 16;
            ivLen = 16;
            encOid = oids["aes128-CBC"];
            cipherFn = forge7.aes.createEncryptionCipher;
            break;
          case "aes192":
            dkLen = 24;
            ivLen = 16;
            encOid = oids["aes192-CBC"];
            cipherFn = forge7.aes.createEncryptionCipher;
            break;
          case "aes256":
            dkLen = 32;
            ivLen = 16;
            encOid = oids["aes256-CBC"];
            cipherFn = forge7.aes.createEncryptionCipher;
            break;
          case "des":
            dkLen = 8;
            ivLen = 8;
            encOid = oids["desCBC"];
            cipherFn = forge7.des.createEncryptionCipher;
            break;
          default:
            var error = new Error("Cannot encrypt private key. Unknown encryption algorithm.");
            error.algorithm = options.algorithm;
            throw error;
        }
        var prfAlgorithm = "hmacWith" + options.prfAlgorithm.toUpperCase();
        var md = prfAlgorithmToMessageDigest(prfAlgorithm);
        var dk = forge7.pkcs5.pbkdf2(password, salt, count, dkLen, md);
        var iv = forge7.random.getBytesSync(ivLen);
        var cipher = cipherFn(dk);
        cipher.start(iv);
        cipher.update(asn1.toDer(obj));
        cipher.finish();
        encryptedData = cipher.output.getBytes();
        var params = createPbkdf2Params(salt, countBytes, dkLen, prfAlgorithm);
        encryptionAlgorithm = asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
          asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OID, false, asn1.oidToDer(oids["pkcs5PBES2"]).getBytes()),
          asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
            asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
              asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OID, false, asn1.oidToDer(oids["pkcs5PBKDF2"]).getBytes()),
              params
            ]),
            asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
              asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OID, false, asn1.oidToDer(encOid).getBytes()),
              asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OCTETSTRING, false, iv)
            ])
          ])
        ]);
      } else if (options.algorithm === "3des") {
        dkLen = 24;
        var saltBytes = new forge7.util.ByteBuffer(salt);
        var dk = pki.pbe.generatePkcs12Key(password, saltBytes, 1, count, dkLen);
        var iv = pki.pbe.generatePkcs12Key(password, saltBytes, 2, count, dkLen);
        var cipher = forge7.des.createEncryptionCipher(dk);
        cipher.start(iv);
        cipher.update(asn1.toDer(obj));
        cipher.finish();
        encryptedData = cipher.output.getBytes();
        encryptionAlgorithm = asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
          asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OID, false, asn1.oidToDer(oids["pbeWithSHAAnd3-KeyTripleDES-CBC"]).getBytes()),
          asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
            asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OCTETSTRING, false, salt),
            asn1.create(asn1.Class.UNIVERSAL, asn1.Type.INTEGER, false, countBytes.getBytes())
          ])
        ]);
      } else {
        var error = new Error("Cannot encrypt private key. Unknown encryption algorithm.");
        error.algorithm = options.algorithm;
        throw error;
      }
      var rval = asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
        encryptionAlgorithm,
        asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OCTETSTRING, false, encryptedData)
      ]);
      return rval;
    };
    pki.decryptPrivateKeyInfo = function(obj, password) {
      var rval = null;
      var capture = {};
      var errors = [];
      if (!asn1.validate(obj, encryptedPrivateKeyValidator, capture, errors)) {
        var error = new Error("Cannot read encrypted private key. ASN.1 object is not a supported EncryptedPrivateKeyInfo.");
        error.errors = errors;
        throw error;
      }
      var oid = asn1.derToOid(capture.encryptionOid);
      var cipher = pki.pbe.getCipher(oid, capture.encryptionParams, password);
      var encrypted = forge7.util.createBuffer(capture.encryptedData);
      cipher.update(encrypted);
      if (cipher.finish()) {
        rval = asn1.fromDer(cipher.output);
      }
      return rval;
    };
    pki.encryptedPrivateKeyToPem = function(epki, maxline) {
      var msg = {
        type: "ENCRYPTED PRIVATE KEY",
        body: asn1.toDer(epki).getBytes()
      };
      return forge7.pem.encode(msg, { maxline });
    };
    pki.encryptedPrivateKeyFromPem = function(pem) {
      var msg = forge7.pem.decode(pem)[0];
      if (msg.type !== "ENCRYPTED PRIVATE KEY") {
        var error = new Error('Could not convert encrypted private key from PEM; PEM header type is "ENCRYPTED PRIVATE KEY".');
        error.headerType = msg.type;
        throw error;
      }
      if (msg.procType && msg.procType.type === "ENCRYPTED") {
        throw new Error("Could not convert encrypted private key from PEM; PEM is encrypted.");
      }
      return asn1.fromDer(msg.body);
    };
    pki.encryptRsaPrivateKey = function(rsaKey, password, options) {
      options = options || {};
      if (!options.legacy) {
        var rval = pki.wrapRsaPrivateKey(pki.privateKeyToAsn1(rsaKey));
        rval = pki.encryptPrivateKeyInfo(rval, password, options);
        return pki.encryptedPrivateKeyToPem(rval);
      }
      var algorithm;
      var iv;
      var dkLen;
      var cipherFn;
      switch (options.algorithm) {
        case "aes128":
          algorithm = "AES-128-CBC";
          dkLen = 16;
          iv = forge7.random.getBytesSync(16);
          cipherFn = forge7.aes.createEncryptionCipher;
          break;
        case "aes192":
          algorithm = "AES-192-CBC";
          dkLen = 24;
          iv = forge7.random.getBytesSync(16);
          cipherFn = forge7.aes.createEncryptionCipher;
          break;
        case "aes256":
          algorithm = "AES-256-CBC";
          dkLen = 32;
          iv = forge7.random.getBytesSync(16);
          cipherFn = forge7.aes.createEncryptionCipher;
          break;
        case "3des":
          algorithm = "DES-EDE3-CBC";
          dkLen = 24;
          iv = forge7.random.getBytesSync(8);
          cipherFn = forge7.des.createEncryptionCipher;
          break;
        case "des":
          algorithm = "DES-CBC";
          dkLen = 8;
          iv = forge7.random.getBytesSync(8);
          cipherFn = forge7.des.createEncryptionCipher;
          break;
        default:
          var error = new Error('Could not encrypt RSA private key; unsupported encryption algorithm "' + options.algorithm + '".');
          error.algorithm = options.algorithm;
          throw error;
      }
      var dk = forge7.pbe.opensslDeriveBytes(password, iv.substr(0, 8), dkLen);
      var cipher = cipherFn(dk);
      cipher.start(iv);
      cipher.update(asn1.toDer(pki.privateKeyToAsn1(rsaKey)));
      cipher.finish();
      var msg = {
        type: "RSA PRIVATE KEY",
        procType: {
          version: "4",
          type: "ENCRYPTED"
        },
        dekInfo: {
          algorithm,
          parameters: forge7.util.bytesToHex(iv).toUpperCase()
        },
        body: cipher.output.getBytes()
      };
      return forge7.pem.encode(msg);
    };
    pki.decryptRsaPrivateKey = function(pem, password) {
      var rval = null;
      var msg = forge7.pem.decode(pem)[0];
      if (msg.type !== "ENCRYPTED PRIVATE KEY" && msg.type !== "PRIVATE KEY" && msg.type !== "RSA PRIVATE KEY") {
        var error = new Error('Could not convert private key from PEM; PEM header type is not "ENCRYPTED PRIVATE KEY", "PRIVATE KEY", or "RSA PRIVATE KEY".');
        error.headerType = error;
        throw error;
      }
      if (msg.procType && msg.procType.type === "ENCRYPTED") {
        var dkLen;
        var cipherFn;
        switch (msg.dekInfo.algorithm) {
          case "DES-CBC":
            dkLen = 8;
            cipherFn = forge7.des.createDecryptionCipher;
            break;
          case "DES-EDE3-CBC":
            dkLen = 24;
            cipherFn = forge7.des.createDecryptionCipher;
            break;
          case "AES-128-CBC":
            dkLen = 16;
            cipherFn = forge7.aes.createDecryptionCipher;
            break;
          case "AES-192-CBC":
            dkLen = 24;
            cipherFn = forge7.aes.createDecryptionCipher;
            break;
          case "AES-256-CBC":
            dkLen = 32;
            cipherFn = forge7.aes.createDecryptionCipher;
            break;
          case "RC2-40-CBC":
            dkLen = 5;
            cipherFn = function(key) {
              return forge7.rc2.createDecryptionCipher(key, 40);
            };
            break;
          case "RC2-64-CBC":
            dkLen = 8;
            cipherFn = function(key) {
              return forge7.rc2.createDecryptionCipher(key, 64);
            };
            break;
          case "RC2-128-CBC":
            dkLen = 16;
            cipherFn = function(key) {
              return forge7.rc2.createDecryptionCipher(key, 128);
            };
            break;
          default:
            var error = new Error('Could not decrypt private key; unsupported encryption algorithm "' + msg.dekInfo.algorithm + '".');
            error.algorithm = msg.dekInfo.algorithm;
            throw error;
        }
        var iv = forge7.util.hexToBytes(msg.dekInfo.parameters);
        var dk = forge7.pbe.opensslDeriveBytes(password, iv.substr(0, 8), dkLen);
        var cipher = cipherFn(dk);
        cipher.start(iv);
        cipher.update(forge7.util.createBuffer(msg.body));
        if (cipher.finish()) {
          rval = cipher.output.getBytes();
        } else {
          return rval;
        }
      } else {
        rval = msg.body;
      }
      if (msg.type === "ENCRYPTED PRIVATE KEY") {
        rval = pki.decryptPrivateKeyInfo(asn1.fromDer(rval), password);
      } else {
        rval = asn1.fromDer(rval);
      }
      if (rval !== null) {
        rval = pki.privateKeyFromAsn1(rval);
      }
      return rval;
    };
    pki.pbe.generatePkcs12Key = function(password, salt, id, iter, n, md) {
      var j, l;
      if (typeof md === "undefined" || md === null) {
        if (!("sha1" in forge7.md)) {
          throw new Error('"sha1" hash algorithm unavailable.');
        }
        md = forge7.md.sha1.create();
      }
      var u = md.digestLength;
      var v = md.blockLength;
      var result = new forge7.util.ByteBuffer();
      var passBuf = new forge7.util.ByteBuffer();
      if (password !== null && password !== void 0) {
        for (l = 0; l < password.length; l++) {
          passBuf.putInt16(password.charCodeAt(l));
        }
        passBuf.putInt16(0);
      }
      var p = passBuf.length();
      var s = salt.length();
      var D = new forge7.util.ByteBuffer();
      D.fillWithByte(id, v);
      var Slen = v * Math.ceil(s / v);
      var S = new forge7.util.ByteBuffer();
      for (l = 0; l < Slen; l++) {
        S.putByte(salt.at(l % s));
      }
      var Plen = v * Math.ceil(p / v);
      var P = new forge7.util.ByteBuffer();
      for (l = 0; l < Plen; l++) {
        P.putByte(passBuf.at(l % p));
      }
      var I = S;
      I.putBuffer(P);
      var c = Math.ceil(n / u);
      for (var i = 1; i <= c; i++) {
        var buf2 = new forge7.util.ByteBuffer();
        buf2.putBytes(D.bytes());
        buf2.putBytes(I.bytes());
        for (var round = 0; round < iter; round++) {
          md.start();
          md.update(buf2.getBytes());
          buf2 = md.digest();
        }
        var B = new forge7.util.ByteBuffer();
        for (l = 0; l < v; l++) {
          B.putByte(buf2.at(l % u));
        }
        var k = Math.ceil(s / v) + Math.ceil(p / v);
        var Inew = new forge7.util.ByteBuffer();
        for (j = 0; j < k; j++) {
          var chunk = new forge7.util.ByteBuffer(I.getBytes(v));
          var x = 511;
          for (l = B.length() - 1; l >= 0; l--) {
            x = x >> 8;
            x += B.at(l) + chunk.at(l);
            chunk.setAt(l, x & 255);
          }
          Inew.putBuffer(chunk);
        }
        I = Inew;
        result.putBuffer(buf2);
      }
      result.truncate(result.length() - n);
      return result;
    };
    pki.pbe.getCipher = function(oid, params, password) {
      switch (oid) {
        case pki.oids["pkcs5PBES2"]:
          return pki.pbe.getCipherForPBES2(oid, params, password);
        case pki.oids["pbeWithSHAAnd3-KeyTripleDES-CBC"]:
        case pki.oids["pbewithSHAAnd40BitRC2-CBC"]:
          return pki.pbe.getCipherForPKCS12PBE(oid, params, password);
        default:
          var error = new Error("Cannot read encrypted PBE data block. Unsupported OID.");
          error.oid = oid;
          error.supportedOids = [
            "pkcs5PBES2",
            "pbeWithSHAAnd3-KeyTripleDES-CBC",
            "pbewithSHAAnd40BitRC2-CBC"
          ];
          throw error;
      }
    };
    pki.pbe.getCipherForPBES2 = function(oid, params, password) {
      var capture = {};
      var errors = [];
      if (!asn1.validate(params, PBES2AlgorithmsValidator, capture, errors)) {
        var error = new Error("Cannot read password-based-encryption algorithm parameters. ASN.1 object is not a supported EncryptedPrivateKeyInfo.");
        error.errors = errors;
        throw error;
      }
      oid = asn1.derToOid(capture.kdfOid);
      if (oid !== pki.oids["pkcs5PBKDF2"]) {
        var error = new Error("Cannot read encrypted private key. Unsupported key derivation function OID.");
        error.oid = oid;
        error.supportedOids = ["pkcs5PBKDF2"];
        throw error;
      }
      oid = asn1.derToOid(capture.encOid);
      if (oid !== pki.oids["aes128-CBC"] && oid !== pki.oids["aes192-CBC"] && oid !== pki.oids["aes256-CBC"] && oid !== pki.oids["des-EDE3-CBC"] && oid !== pki.oids["desCBC"]) {
        var error = new Error("Cannot read encrypted private key. Unsupported encryption scheme OID.");
        error.oid = oid;
        error.supportedOids = [
          "aes128-CBC",
          "aes192-CBC",
          "aes256-CBC",
          "des-EDE3-CBC",
          "desCBC"
        ];
        throw error;
      }
      var salt = capture.kdfSalt;
      var count = forge7.util.createBuffer(capture.kdfIterationCount);
      count = count.getInt(count.length() << 3);
      var dkLen;
      var cipherFn;
      switch (pki.oids[oid]) {
        case "aes128-CBC":
          dkLen = 16;
          cipherFn = forge7.aes.createDecryptionCipher;
          break;
        case "aes192-CBC":
          dkLen = 24;
          cipherFn = forge7.aes.createDecryptionCipher;
          break;
        case "aes256-CBC":
          dkLen = 32;
          cipherFn = forge7.aes.createDecryptionCipher;
          break;
        case "des-EDE3-CBC":
          dkLen = 24;
          cipherFn = forge7.des.createDecryptionCipher;
          break;
        case "desCBC":
          dkLen = 8;
          cipherFn = forge7.des.createDecryptionCipher;
          break;
      }
      var md = prfOidToMessageDigest(capture.prfOid);
      var dk = forge7.pkcs5.pbkdf2(password, salt, count, dkLen, md);
      var iv = capture.encIv;
      var cipher = cipherFn(dk);
      cipher.start(iv);
      return cipher;
    };
    pki.pbe.getCipherForPKCS12PBE = function(oid, params, password) {
      var capture = {};
      var errors = [];
      if (!asn1.validate(params, pkcs12PbeParamsValidator, capture, errors)) {
        var error = new Error("Cannot read password-based-encryption algorithm parameters. ASN.1 object is not a supported EncryptedPrivateKeyInfo.");
        error.errors = errors;
        throw error;
      }
      var salt = forge7.util.createBuffer(capture.salt);
      var count = forge7.util.createBuffer(capture.iterations);
      count = count.getInt(count.length() << 3);
      var dkLen, dIvLen, cipherFn;
      switch (oid) {
        case pki.oids["pbeWithSHAAnd3-KeyTripleDES-CBC"]:
          dkLen = 24;
          dIvLen = 8;
          cipherFn = forge7.des.startDecrypting;
          break;
        case pki.oids["pbewithSHAAnd40BitRC2-CBC"]:
          dkLen = 5;
          dIvLen = 8;
          cipherFn = function(key2, iv2) {
            var cipher = forge7.rc2.createDecryptionCipher(key2, 40);
            cipher.start(iv2, null);
            return cipher;
          };
          break;
        default:
          var error = new Error("Cannot read PKCS #12 PBE data block. Unsupported OID.");
          error.oid = oid;
          throw error;
      }
      var md = prfOidToMessageDigest(capture.prfOid);
      var key = pki.pbe.generatePkcs12Key(password, salt, 1, count, dkLen, md);
      md.start();
      var iv = pki.pbe.generatePkcs12Key(password, salt, 2, count, dIvLen, md);
      return cipherFn(key, iv);
    };
    pki.pbe.opensslDeriveBytes = function(password, salt, dkLen, md) {
      if (typeof md === "undefined" || md === null) {
        if (!("md5" in forge7.md)) {
          throw new Error('"md5" hash algorithm unavailable.');
        }
        md = forge7.md.md5.create();
      }
      if (salt === null) {
        salt = "";
      }
      var digests = [hash2(md, password + salt)];
      for (var length3 = 16, i = 1; length3 < dkLen; ++i, length3 += 16) {
        digests.push(hash2(md, digests[i - 1] + password + salt));
      }
      return digests.join("").substr(0, dkLen);
    };
    function hash2(md, bytes2) {
      return md.start().update(bytes2).digest().getBytes();
    }
    function prfOidToMessageDigest(prfOid) {
      var prfAlgorithm;
      if (!prfOid) {
        prfAlgorithm = "hmacWithSHA1";
      } else {
        prfAlgorithm = pki.oids[asn1.derToOid(prfOid)];
        if (!prfAlgorithm) {
          var error = new Error("Unsupported PRF OID.");
          error.oid = prfOid;
          error.supported = [
            "hmacWithSHA1",
            "hmacWithSHA224",
            "hmacWithSHA256",
            "hmacWithSHA384",
            "hmacWithSHA512"
          ];
          throw error;
        }
      }
      return prfAlgorithmToMessageDigest(prfAlgorithm);
    }
    function prfAlgorithmToMessageDigest(prfAlgorithm) {
      var factory = forge7.md;
      switch (prfAlgorithm) {
        case "hmacWithSHA224":
          factory = forge7.md.sha512;
        case "hmacWithSHA1":
        case "hmacWithSHA256":
        case "hmacWithSHA384":
        case "hmacWithSHA512":
          prfAlgorithm = prfAlgorithm.substr(8).toLowerCase();
          break;
        default:
          var error = new Error("Unsupported PRF algorithm.");
          error.algorithm = prfAlgorithm;
          error.supported = [
            "hmacWithSHA1",
            "hmacWithSHA224",
            "hmacWithSHA256",
            "hmacWithSHA384",
            "hmacWithSHA512"
          ];
          throw error;
      }
      if (!factory || !(prfAlgorithm in factory)) {
        throw new Error("Unknown hash algorithm: " + prfAlgorithm);
      }
      return factory[prfAlgorithm].create();
    }
    function createPbkdf2Params(salt, countBytes, dkLen, prfAlgorithm) {
      var params = asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
        asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OCTETSTRING, false, salt),
        asn1.create(asn1.Class.UNIVERSAL, asn1.Type.INTEGER, false, countBytes.getBytes())
      ]);
      if (prfAlgorithm !== "hmacWithSHA1") {
        params.value.push(asn1.create(asn1.Class.UNIVERSAL, asn1.Type.INTEGER, false, forge7.util.hexToBytes(dkLen.toString(16))), asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
          asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OID, false, asn1.oidToDer(pki.oids[prfAlgorithm]).getBytes()),
          asn1.create(asn1.Class.UNIVERSAL, asn1.Type.NULL, false, "")
        ]));
      }
      return params;
    }
  }
});

// node_modules/@protobufjs/aspromise/index.js
var require_aspromise = __commonJS({
  "node_modules/@protobufjs/aspromise/index.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    module2.exports = asPromise;
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
  }
});

// node_modules/@protobufjs/base64/index.js
var require_base64 = __commonJS({
  "node_modules/@protobufjs/base64/index.js"(exports2) {
    "use strict";
    init_node_globals();
    var base642 = exports2;
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
    for (i = 0; i < 64; )
      s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
    var i;
    base642.encode = function encode10(buffer2, start, end) {
      var parts = null, chunk = [];
      var i2 = 0, j = 0, t;
      while (start < end) {
        var b = buffer2[start++];
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
    base642.decode = function decode14(string2, buffer2, offset) {
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
            buffer2[offset++] = t << 2 | (c & 48) >> 4;
            t = c;
            j = 2;
            break;
          case 2:
            buffer2[offset++] = (t & 15) << 4 | (c & 60) >> 2;
            t = c;
            j = 3;
            break;
          case 3:
            buffer2[offset++] = (t & 3) << 6 | c;
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
  }
});

// node_modules/@protobufjs/eventemitter/index.js
var require_eventemitter = __commonJS({
  "node_modules/@protobufjs/eventemitter/index.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    module2.exports = EventEmitter4;
    function EventEmitter4() {
      this._listeners = {};
    }
    EventEmitter4.prototype.on = function on(evt, fn, ctx) {
      (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn,
        ctx: ctx || this
      });
      return this;
    };
    EventEmitter4.prototype.off = function off(evt, fn) {
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
    EventEmitter4.prototype.emit = function emit(evt) {
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
  }
});

// node_modules/@protobufjs/float/index.js
var require_float = __commonJS({
  "node_modules/@protobufjs/float/index.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    module2.exports = factory(factory);
    function factory(exports3) {
      if (typeof Float32Array !== "undefined")
        (function() {
          var f32 = new Float32Array([-0]), f8b = new Uint8Array(f32.buffer), le = f8b[3] === 128;
          function writeFloat_f32_cpy(val, buf2, pos) {
            f32[0] = val;
            buf2[pos] = f8b[0];
            buf2[pos + 1] = f8b[1];
            buf2[pos + 2] = f8b[2];
            buf2[pos + 3] = f8b[3];
          }
          function writeFloat_f32_rev(val, buf2, pos) {
            f32[0] = val;
            buf2[pos] = f8b[3];
            buf2[pos + 1] = f8b[2];
            buf2[pos + 2] = f8b[1];
            buf2[pos + 3] = f8b[0];
          }
          exports3.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
          exports3.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
          function readFloat_f32_cpy(buf2, pos) {
            f8b[0] = buf2[pos];
            f8b[1] = buf2[pos + 1];
            f8b[2] = buf2[pos + 2];
            f8b[3] = buf2[pos + 3];
            return f32[0];
          }
          function readFloat_f32_rev(buf2, pos) {
            f8b[3] = buf2[pos];
            f8b[2] = buf2[pos + 1];
            f8b[1] = buf2[pos + 2];
            f8b[0] = buf2[pos + 3];
            return f32[0];
          }
          exports3.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
          exports3.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
        })();
      else
        (function() {
          function writeFloat_ieee754(writeUint, val, buf2, pos) {
            var sign2 = val < 0 ? 1 : 0;
            if (sign2)
              val = -val;
            if (val === 0)
              writeUint(1 / val > 0 ? 0 : 2147483648, buf2, pos);
            else if (isNaN(val))
              writeUint(2143289344, buf2, pos);
            else if (val > 34028234663852886e22)
              writeUint((sign2 << 31 | 2139095040) >>> 0, buf2, pos);
            else if (val < 11754943508222875e-54)
              writeUint((sign2 << 31 | Math.round(val / 1401298464324817e-60)) >>> 0, buf2, pos);
            else {
              var exponent = Math.floor(Math.log(val) / Math.LN2), mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
              writeUint((sign2 << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf2, pos);
            }
          }
          exports3.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
          exports3.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
          function readFloat_ieee754(readUint, buf2, pos) {
            var uint = readUint(buf2, pos), sign2 = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
            return exponent === 255 ? mantissa ? NaN : sign2 * Infinity : exponent === 0 ? sign2 * 1401298464324817e-60 * mantissa : sign2 * Math.pow(2, exponent - 150) * (mantissa + 8388608);
          }
          exports3.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
          exports3.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
        })();
      if (typeof Float64Array !== "undefined")
        (function() {
          var f64 = new Float64Array([-0]), f8b = new Uint8Array(f64.buffer), le = f8b[7] === 128;
          function writeDouble_f64_cpy(val, buf2, pos) {
            f64[0] = val;
            buf2[pos] = f8b[0];
            buf2[pos + 1] = f8b[1];
            buf2[pos + 2] = f8b[2];
            buf2[pos + 3] = f8b[3];
            buf2[pos + 4] = f8b[4];
            buf2[pos + 5] = f8b[5];
            buf2[pos + 6] = f8b[6];
            buf2[pos + 7] = f8b[7];
          }
          function writeDouble_f64_rev(val, buf2, pos) {
            f64[0] = val;
            buf2[pos] = f8b[7];
            buf2[pos + 1] = f8b[6];
            buf2[pos + 2] = f8b[5];
            buf2[pos + 3] = f8b[4];
            buf2[pos + 4] = f8b[3];
            buf2[pos + 5] = f8b[2];
            buf2[pos + 6] = f8b[1];
            buf2[pos + 7] = f8b[0];
          }
          exports3.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
          exports3.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
          function readDouble_f64_cpy(buf2, pos) {
            f8b[0] = buf2[pos];
            f8b[1] = buf2[pos + 1];
            f8b[2] = buf2[pos + 2];
            f8b[3] = buf2[pos + 3];
            f8b[4] = buf2[pos + 4];
            f8b[5] = buf2[pos + 5];
            f8b[6] = buf2[pos + 6];
            f8b[7] = buf2[pos + 7];
            return f64[0];
          }
          function readDouble_f64_rev(buf2, pos) {
            f8b[7] = buf2[pos];
            f8b[6] = buf2[pos + 1];
            f8b[5] = buf2[pos + 2];
            f8b[4] = buf2[pos + 3];
            f8b[3] = buf2[pos + 4];
            f8b[2] = buf2[pos + 5];
            f8b[1] = buf2[pos + 6];
            f8b[0] = buf2[pos + 7];
            return f64[0];
          }
          exports3.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
          exports3.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
        })();
      else
        (function() {
          function writeDouble_ieee754(writeUint, off0, off1, val, buf2, pos) {
            var sign2 = val < 0 ? 1 : 0;
            if (sign2)
              val = -val;
            if (val === 0) {
              writeUint(0, buf2, pos + off0);
              writeUint(1 / val > 0 ? 0 : 2147483648, buf2, pos + off1);
            } else if (isNaN(val)) {
              writeUint(0, buf2, pos + off0);
              writeUint(2146959360, buf2, pos + off1);
            } else if (val > 17976931348623157e292) {
              writeUint(0, buf2, pos + off0);
              writeUint((sign2 << 31 | 2146435072) >>> 0, buf2, pos + off1);
            } else {
              var mantissa;
              if (val < 22250738585072014e-324) {
                mantissa = val / 5e-324;
                writeUint(mantissa >>> 0, buf2, pos + off0);
                writeUint((sign2 << 31 | mantissa / 4294967296) >>> 0, buf2, pos + off1);
              } else {
                var exponent = Math.floor(Math.log(val) / Math.LN2);
                if (exponent === 1024)
                  exponent = 1023;
                mantissa = val * Math.pow(2, -exponent);
                writeUint(mantissa * 4503599627370496 >>> 0, buf2, pos + off0);
                writeUint((sign2 << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf2, pos + off1);
              }
            }
          }
          exports3.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
          exports3.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
          function readDouble_ieee754(readUint, off0, off1, buf2, pos) {
            var lo = readUint(buf2, pos + off0), hi = readUint(buf2, pos + off1);
            var sign2 = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047 ? mantissa ? NaN : sign2 * Infinity : exponent === 0 ? sign2 * 5e-324 * mantissa : sign2 * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
          }
          exports3.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
          exports3.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
        })();
      return exports3;
    }
    function writeUintLE(val, buf2, pos) {
      buf2[pos] = val & 255;
      buf2[pos + 1] = val >>> 8 & 255;
      buf2[pos + 2] = val >>> 16 & 255;
      buf2[pos + 3] = val >>> 24;
    }
    function writeUintBE(val, buf2, pos) {
      buf2[pos] = val >>> 24;
      buf2[pos + 1] = val >>> 16 & 255;
      buf2[pos + 2] = val >>> 8 & 255;
      buf2[pos + 3] = val & 255;
    }
    function readUintLE(buf2, pos) {
      return (buf2[pos] | buf2[pos + 1] << 8 | buf2[pos + 2] << 16 | buf2[pos + 3] << 24) >>> 0;
    }
    function readUintBE(buf2, pos) {
      return (buf2[pos] << 24 | buf2[pos + 1] << 16 | buf2[pos + 2] << 8 | buf2[pos + 3]) >>> 0;
    }
  }
});

// node_modules/@protobufjs/inquire/index.js
var require_inquire = __commonJS({
  "node_modules/@protobufjs/inquire/index.js"(exports, module) {
    "use strict";
    init_node_globals();
    module.exports = inquire;
    function inquire(moduleName) {
      try {
        var mod = eval("quire".replace(/^/, "re"))(moduleName);
        if (mod && (mod.length || Object.keys(mod).length))
          return mod;
      } catch (e) {
      }
      return null;
    }
  }
});

// node_modules/@protobufjs/utf8/index.js
var require_utf8 = __commonJS({
  "node_modules/@protobufjs/utf8/index.js"(exports2) {
    "use strict";
    init_node_globals();
    var utf8 = exports2;
    utf8.length = function utf8_length(string2) {
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
    utf8.read = function utf8_read(buffer2, start, end) {
      var len = end - start;
      if (len < 1)
        return "";
      var parts = null, chunk = [], i = 0, t;
      while (start < end) {
        t = buffer2[start++];
        if (t < 128)
          chunk[i++] = t;
        else if (t > 191 && t < 224)
          chunk[i++] = (t & 31) << 6 | buffer2[start++] & 63;
        else if (t > 239 && t < 365) {
          t = ((t & 7) << 18 | (buffer2[start++] & 63) << 12 | (buffer2[start++] & 63) << 6 | buffer2[start++] & 63) - 65536;
          chunk[i++] = 55296 + (t >> 10);
          chunk[i++] = 56320 + (t & 1023);
        } else
          chunk[i++] = (t & 15) << 12 | (buffer2[start++] & 63) << 6 | buffer2[start++] & 63;
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
    utf8.write = function utf8_write(string2, buffer2, offset) {
      var start = offset, c1, c2;
      for (var i = 0; i < string2.length; ++i) {
        c1 = string2.charCodeAt(i);
        if (c1 < 128) {
          buffer2[offset++] = c1;
        } else if (c1 < 2048) {
          buffer2[offset++] = c1 >> 6 | 192;
          buffer2[offset++] = c1 & 63 | 128;
        } else if ((c1 & 64512) === 55296 && ((c2 = string2.charCodeAt(i + 1)) & 64512) === 56320) {
          c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
          ++i;
          buffer2[offset++] = c1 >> 18 | 240;
          buffer2[offset++] = c1 >> 12 & 63 | 128;
          buffer2[offset++] = c1 >> 6 & 63 | 128;
          buffer2[offset++] = c1 & 63 | 128;
        } else {
          buffer2[offset++] = c1 >> 12 | 224;
          buffer2[offset++] = c1 >> 6 & 63 | 128;
          buffer2[offset++] = c1 & 63 | 128;
        }
      }
      return offset - start;
    };
  }
});

// node_modules/@protobufjs/pool/index.js
var require_pool = __commonJS({
  "node_modules/@protobufjs/pool/index.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    module2.exports = pool;
    function pool(alloc2, slice2, size) {
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
        var buf2 = slice2.call(slab, offset, offset += size2);
        if (offset & 7)
          offset = (offset | 7) + 1;
        return buf2;
      };
    }
  }
});

// node_modules/protons-runtime/node_modules/protobufjs/src/util/longbits.js
var require_longbits = __commonJS({
  "node_modules/protons-runtime/node_modules/protobufjs/src/util/longbits.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    module2.exports = LongBits;
    var util2 = require_minimal();
    function LongBits(lo, hi) {
      this.lo = lo >>> 0;
      this.hi = hi >>> 0;
    }
    var zero = LongBits.zero = new LongBits(0, 0);
    zero.toNumber = function() {
      return 0;
    };
    zero.zzEncode = zero.zzDecode = function() {
      return this;
    };
    zero.length = function() {
      return 1;
    };
    var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";
    LongBits.fromNumber = function fromNumber(value) {
      if (value === 0)
        return zero;
      var sign2 = value < 0;
      if (sign2)
        value = -value;
      var lo = value >>> 0, hi = (value - lo) / 4294967296 >>> 0;
      if (sign2) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
          lo = 0;
          if (++hi > 4294967295)
            hi = 0;
        }
      }
      return new LongBits(lo, hi);
    };
    LongBits.from = function from4(value) {
      if (typeof value === "number")
        return LongBits.fromNumber(value);
      if (util2.isString(value)) {
        if (util2.Long)
          value = util2.Long.fromString(value);
        else
          return LongBits.fromNumber(parseInt(value, 10));
      }
      return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
    };
    LongBits.prototype.toNumber = function toNumber(unsigned) {
      if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
        if (!lo)
          hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
      }
      return this.lo + this.hi * 4294967296;
    };
    LongBits.prototype.toLong = function toLong(unsigned) {
      return util2.Long ? new util2.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
    };
    var charCodeAt = String.prototype.charCodeAt;
    LongBits.fromHash = function fromHash(hash2) {
      if (hash2 === zeroHash)
        return zero;
      return new LongBits((charCodeAt.call(hash2, 0) | charCodeAt.call(hash2, 1) << 8 | charCodeAt.call(hash2, 2) << 16 | charCodeAt.call(hash2, 3) << 24) >>> 0, (charCodeAt.call(hash2, 4) | charCodeAt.call(hash2, 5) << 8 | charCodeAt.call(hash2, 6) << 16 | charCodeAt.call(hash2, 7) << 24) >>> 0);
    };
    LongBits.prototype.toHash = function toHash() {
      return String.fromCharCode(this.lo & 255, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, this.hi & 255, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
    };
    LongBits.prototype.zzEncode = function zzEncode() {
      var mask = this.hi >> 31;
      this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
      this.lo = (this.lo << 1 ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.zzDecode = function zzDecode() {
      var mask = -(this.lo & 1);
      this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
      this.hi = (this.hi >>> 1 ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.length = function length3() {
      var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
      return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
    };
  }
});

// node_modules/protons-runtime/node_modules/protobufjs/src/util/minimal.js
var require_minimal = __commonJS({
  "node_modules/protons-runtime/node_modules/protobufjs/src/util/minimal.js"(exports2) {
    "use strict";
    init_node_globals();
    var util2 = exports2;
    util2.asPromise = require_aspromise();
    util2.base64 = require_base64();
    util2.EventEmitter = require_eventemitter();
    util2.float = require_float();
    util2.inquire = require_inquire();
    util2.utf8 = require_utf8();
    util2.pool = require_pool();
    util2.LongBits = require_longbits();
    util2.isNode = Boolean(typeof global !== "undefined" && global && global.process && global.process.versions && global.process.versions.node);
    util2.global = util2.isNode && global || typeof window !== "undefined" && window || typeof self !== "undefined" && self || exports2;
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
    util2.longFromHash = function longFromHash(hash2, unsigned) {
      var bits2 = util2.LongBits.fromHash(hash2);
      if (util2.Long)
        return util2.Long.fromBits(bits2.lo, bits2.hi, unsigned);
      return bits2.toNumber(Boolean(unsigned));
    };
    function merge2(dst, src3, ifNotSet) {
      for (var keys = Object.keys(src3), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === void 0 || !ifNotSet)
          dst[keys[i]] = src3[keys[i]];
      return dst;
    }
    util2.merge = merge2;
    util2.lcFirst = function lcFirst(str) {
      return str.charAt(0).toLowerCase() + str.substring(1);
    };
    function newError(name3) {
      function CustomError(message2, properties) {
        if (!(this instanceof CustomError))
          return new CustomError(message2, properties);
        Object.defineProperty(this, "message", { get: function() {
          return message2;
        } });
        if (Error.captureStackTrace)
          Error.captureStackTrace(this, CustomError);
        else
          Object.defineProperty(this, "stack", { value: new Error().stack || "" });
        if (properties)
          merge2(this, properties);
      }
      CustomError.prototype = Object.create(Error.prototype, {
        constructor: {
          value: CustomError,
          writable: true,
          enumerable: false,
          configurable: true
        },
        name: {
          get: function get2() {
            return name3;
          },
          set: void 0,
          enumerable: false,
          configurable: true
        },
        toString: {
          value: function value() {
            return this.name + ": " + this.message;
          },
          writable: true,
          enumerable: false,
          configurable: true
        }
      });
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
      return function(name3) {
        for (var i = 0; i < fieldNames.length; ++i)
          if (fieldNames[i] !== name3)
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
  }
});

// node_modules/protons-runtime/node_modules/protobufjs/src/reader.js
var require_reader = __commonJS({
  "node_modules/protons-runtime/node_modules/protobufjs/src/reader.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    module2.exports = Reader;
    var util2 = require_minimal();
    var BufferReader;
    var LongBits = util2.LongBits;
    var utf8 = util2.utf8;
    function indexOutOfRange(reader2, writeLength) {
      return RangeError("index out of range: " + reader2.pos + " + " + (writeLength || 1) + " > " + reader2.len);
    }
    function Reader(buffer2) {
      this.buf = buffer2;
      this.pos = 0;
      this.len = buffer2.length;
    }
    var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer2) {
      if (buffer2 instanceof Uint8Array || Array.isArray(buffer2))
        return new Reader(buffer2);
      throw Error("illegal buffer");
    } : function create_array2(buffer2) {
      if (Array.isArray(buffer2))
        return new Reader(buffer2);
      throw Error("illegal buffer");
    };
    var create6 = function create7() {
      return util2.Buffer ? function create_buffer_setup(buffer2) {
        return (Reader.create = function create_buffer(buffer3) {
          return util2.Buffer.isBuffer(buffer3) ? new BufferReader(buffer3) : create_array(buffer3);
        })(buffer2);
      } : create_array;
    };
    Reader.create = create6();
    Reader.prototype._slice = util2.Array.prototype.subarray || util2.Array.prototype.slice;
    Reader.prototype.uint32 = function read_uint32_setup() {
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
    Reader.prototype.int32 = function read_int32() {
      return this.uint32() | 0;
    };
    Reader.prototype.sint32 = function read_sint32() {
      var value = this.uint32();
      return value >>> 1 ^ -(value & 1) | 0;
    };
    function readLongVarint() {
      var bits2 = new LongBits(0, 0);
      var i = 0;
      if (this.len - this.pos > 4) {
        for (; i < 4; ++i) {
          bits2.lo = (bits2.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits2;
        }
        bits2.lo = (bits2.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits2.hi = (bits2.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
        if (this.buf[this.pos++] < 128)
          return bits2;
        i = 0;
      } else {
        for (; i < 3; ++i) {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
          bits2.lo = (bits2.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits2;
        }
        bits2.lo = (bits2.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
        return bits2;
      }
      if (this.len - this.pos > 4) {
        for (; i < 5; ++i) {
          bits2.hi = (bits2.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits2;
        }
      } else {
        for (; i < 5; ++i) {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
          bits2.hi = (bits2.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits2;
        }
      }
      throw Error("invalid varint encoding");
    }
    Reader.prototype.bool = function read_bool() {
      return this.uint32() !== 0;
    };
    function readFixed32_end(buf2, end) {
      return (buf2[end - 4] | buf2[end - 3] << 8 | buf2[end - 2] << 16 | buf2[end - 1] << 24) >>> 0;
    }
    Reader.prototype.fixed32 = function read_fixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4);
    };
    Reader.prototype.sfixed32 = function read_sfixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4) | 0;
    };
    function readFixed64() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);
      return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
    }
    Reader.prototype.float = function read_float() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util2.float.readFloatLE(this.buf, this.pos);
      this.pos += 4;
      return value;
    };
    Reader.prototype.double = function read_double() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util2.float.readDoubleLE(this.buf, this.pos);
      this.pos += 8;
      return value;
    };
    Reader.prototype.bytes = function read_bytes() {
      var length3 = this.uint32(), start = this.pos, end = this.pos + length3;
      if (end > this.len)
        throw indexOutOfRange(this, length3);
      this.pos += length3;
      if (Array.isArray(this.buf))
        return this.buf.slice(start, end);
      if (start === end) {
        var nativeBuffer = util2.Buffer;
        return nativeBuffer ? nativeBuffer.alloc(0) : new this.buf.constructor(0);
      }
      return this._slice.call(this.buf, start, end);
    };
    Reader.prototype.string = function read_string() {
      var bytes2 = this.bytes();
      return utf8.read(bytes2, 0, bytes2.length);
    };
    Reader.prototype.skip = function skip(length3) {
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
    Reader.prototype.skipType = function(wireType) {
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
    Reader._configure = function(BufferReader_) {
      BufferReader = BufferReader_;
      Reader.create = create6();
      BufferReader._configure();
      var fn = util2.Long ? "toLong" : "toNumber";
      util2.merge(Reader.prototype, {
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
  }
});

// node_modules/protons-runtime/node_modules/protobufjs/src/reader_buffer.js
var require_reader_buffer = __commonJS({
  "node_modules/protons-runtime/node_modules/protobufjs/src/reader_buffer.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    module2.exports = BufferReader;
    var Reader = require_reader();
    (BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;
    var util2 = require_minimal();
    function BufferReader(buffer2) {
      Reader.call(this, buffer2);
    }
    BufferReader._configure = function() {
      if (util2.Buffer)
        BufferReader.prototype._slice = util2.Buffer.prototype.slice;
    };
    BufferReader.prototype.string = function read_string_buffer() {
      var len = this.uint32();
      return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
    };
    BufferReader._configure();
  }
});

// node_modules/protons-runtime/node_modules/protobufjs/src/writer.js
var require_writer = __commonJS({
  "node_modules/protons-runtime/node_modules/protobufjs/src/writer.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    module2.exports = Writer;
    var util2 = require_minimal();
    var BufferWriter;
    var LongBits = util2.LongBits;
    var base642 = util2.base64;
    var utf8 = util2.utf8;
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
    function Writer() {
      this.len = 0;
      this.head = new Op(noop, 0, 0);
      this.tail = this.head;
      this.states = null;
    }
    var create6 = function create7() {
      return util2.Buffer ? function create_buffer_setup() {
        return (Writer.create = function create_buffer() {
          return new BufferWriter();
        })();
      } : function create_array() {
        return new Writer();
      };
    };
    Writer.create = create6();
    Writer.alloc = function alloc2(size) {
      return new util2.Array(size);
    };
    if (util2.Array !== Array)
      Writer.alloc = util2.pool(Writer.alloc, util2.Array.prototype.subarray);
    Writer.prototype._push = function push(fn, len, val) {
      this.tail = this.tail.next = new Op(fn, len, val);
      this.len += len;
      return this;
    };
    function writeByte(val, buf2, pos) {
      buf2[pos] = val & 255;
    }
    function writeVarint32(val, buf2, pos) {
      while (val > 127) {
        buf2[pos++] = val & 127 | 128;
        val >>>= 7;
      }
      buf2[pos] = val;
    }
    function VarintOp(len, val) {
      this.len = len;
      this.next = void 0;
      this.val = val;
    }
    VarintOp.prototype = Object.create(Op.prototype);
    VarintOp.prototype.fn = writeVarint32;
    Writer.prototype.uint32 = function write_uint32(value) {
      this.len += (this.tail = this.tail.next = new VarintOp((value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5, value)).len;
      return this;
    };
    Writer.prototype.int32 = function write_int32(value) {
      return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) : this.uint32(value);
    };
    Writer.prototype.sint32 = function write_sint32(value) {
      return this.uint32((value << 1 ^ value >> 31) >>> 0);
    };
    function writeVarint64(val, buf2, pos) {
      while (val.hi) {
        buf2[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
      }
      while (val.lo > 127) {
        buf2[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
      }
      buf2[pos++] = val.lo;
    }
    Writer.prototype.uint64 = function write_uint64(value) {
      var bits2 = LongBits.from(value);
      return this._push(writeVarint64, bits2.length(), bits2);
    };
    Writer.prototype.int64 = Writer.prototype.uint64;
    Writer.prototype.sint64 = function write_sint64(value) {
      var bits2 = LongBits.from(value).zzEncode();
      return this._push(writeVarint64, bits2.length(), bits2);
    };
    Writer.prototype.bool = function write_bool(value) {
      return this._push(writeByte, 1, value ? 1 : 0);
    };
    function writeFixed32(val, buf2, pos) {
      buf2[pos] = val & 255;
      buf2[pos + 1] = val >>> 8 & 255;
      buf2[pos + 2] = val >>> 16 & 255;
      buf2[pos + 3] = val >>> 24;
    }
    Writer.prototype.fixed32 = function write_fixed32(value) {
      return this._push(writeFixed32, 4, value >>> 0);
    };
    Writer.prototype.sfixed32 = Writer.prototype.fixed32;
    Writer.prototype.fixed64 = function write_fixed64(value) {
      var bits2 = LongBits.from(value);
      return this._push(writeFixed32, 4, bits2.lo)._push(writeFixed32, 4, bits2.hi);
    };
    Writer.prototype.sfixed64 = Writer.prototype.fixed64;
    Writer.prototype.float = function write_float(value) {
      return this._push(util2.float.writeFloatLE, 4, value);
    };
    Writer.prototype.double = function write_double(value) {
      return this._push(util2.float.writeDoubleLE, 8, value);
    };
    var writeBytes = util2.Array.prototype.set ? function writeBytes_set(val, buf2, pos) {
      buf2.set(val, pos);
    } : function writeBytes_for(val, buf2, pos) {
      for (var i = 0; i < val.length; ++i)
        buf2[pos + i] = val[i];
    };
    Writer.prototype.bytes = function write_bytes(value) {
      var len = value.length >>> 0;
      if (!len)
        return this._push(writeByte, 1, 0);
      if (util2.isString(value)) {
        var buf2 = Writer.alloc(len = base642.length(value));
        base642.decode(value, buf2, 0);
        value = buf2;
      }
      return this.uint32(len)._push(writeBytes, len, value);
    };
    Writer.prototype.string = function write_string(value) {
      var len = utf8.length(value);
      return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
    };
    Writer.prototype.fork = function fork() {
      this.states = new State(this);
      this.head = this.tail = new Op(noop, 0, 0);
      this.len = 0;
      return this;
    };
    Writer.prototype.reset = function reset() {
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
    Writer.prototype.ldelim = function ldelim() {
      var head = this.head, tail = this.tail, len = this.len;
      this.reset().uint32(len);
      if (len) {
        this.tail.next = head.next;
        this.tail = tail;
        this.len += len;
      }
      return this;
    };
    Writer.prototype.finish = function finish() {
      var head = this.head.next, buf2 = this.constructor.alloc(this.len), pos = 0;
      while (head) {
        head.fn(head.val, buf2, pos);
        pos += head.len;
        head = head.next;
      }
      return buf2;
    };
    Writer._configure = function(BufferWriter_) {
      BufferWriter = BufferWriter_;
      Writer.create = create6();
      BufferWriter._configure();
    };
  }
});

// node_modules/protons-runtime/node_modules/protobufjs/src/writer_buffer.js
var require_writer_buffer = __commonJS({
  "node_modules/protons-runtime/node_modules/protobufjs/src/writer_buffer.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    module2.exports = BufferWriter;
    var Writer = require_writer();
    (BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;
    var util2 = require_minimal();
    function BufferWriter() {
      Writer.call(this);
    }
    BufferWriter._configure = function() {
      BufferWriter.alloc = util2._Buffer_allocUnsafe;
      BufferWriter.writeBytesBuffer = util2.Buffer && util2.Buffer.prototype instanceof Uint8Array && util2.Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf2, pos) {
        buf2.set(val, pos);
      } : function writeBytesBuffer_copy(val, buf2, pos) {
        if (val.copy)
          val.copy(buf2, pos, 0, val.length);
        else
          for (var i = 0; i < val.length; )
            buf2[pos++] = val[i++];
      };
    };
    BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
      if (util2.isString(value))
        value = util2._Buffer_from(value, "base64");
      var len = value.length >>> 0;
      this.uint32(len);
      if (len)
        this._push(BufferWriter.writeBytesBuffer, len, value);
      return this;
    };
    function writeStringBuffer(val, buf2, pos) {
      if (val.length < 40)
        util2.utf8.write(val, buf2, pos);
      else if (buf2.utf8Write)
        buf2.utf8Write(val, pos);
      else
        buf2.write(val, pos);
    }
    BufferWriter.prototype.string = function write_string_buffer(value) {
      var len = util2.Buffer.byteLength(value);
      this.uint32(len);
      if (len)
        this._push(writeStringBuffer, len, value);
      return this;
    };
    BufferWriter._configure();
  }
});

// node_modules/node-forge/lib/sha512.js
var require_sha512 = __commonJS({
  "node_modules/node-forge/lib/sha512.js"(exports2, module2) {
    init_node_globals();
    var forge7 = require_forge();
    require_md();
    require_util();
    var sha5123 = module2.exports = forge7.sha512 = forge7.sha512 || {};
    forge7.md.sha512 = forge7.md.algorithms.sha512 = sha5123;
    var sha384 = forge7.sha384 = forge7.sha512.sha384 = forge7.sha512.sha384 || {};
    sha384.create = function() {
      return sha5123.create("SHA-384");
    };
    forge7.md.sha384 = forge7.md.algorithms.sha384 = sha384;
    forge7.sha512.sha256 = forge7.sha512.sha256 || {
      create: function() {
        return sha5123.create("SHA-512/256");
      }
    };
    forge7.md["sha512/256"] = forge7.md.algorithms["sha512/256"] = forge7.sha512.sha256;
    forge7.sha512.sha224 = forge7.sha512.sha224 || {
      create: function() {
        return sha5123.create("SHA-512/224");
      }
    };
    forge7.md["sha512/224"] = forge7.md.algorithms["sha512/224"] = forge7.sha512.sha224;
    sha5123.create = function(algorithm) {
      if (!_initialized) {
        _init();
      }
      if (typeof algorithm === "undefined") {
        algorithm = "SHA-512";
      }
      if (!(algorithm in _states)) {
        throw new Error("Invalid SHA-512 algorithm: " + algorithm);
      }
      var _state = _states[algorithm];
      var _h = null;
      var _input = forge7.util.createBuffer();
      var _w = new Array(80);
      for (var wi = 0; wi < 80; ++wi) {
        _w[wi] = new Array(2);
      }
      var digestLength = 64;
      switch (algorithm) {
        case "SHA-384":
          digestLength = 48;
          break;
        case "SHA-512/256":
          digestLength = 32;
          break;
        case "SHA-512/224":
          digestLength = 28;
          break;
      }
      var md = {
        algorithm: algorithm.replace("-", "").toLowerCase(),
        blockLength: 128,
        digestLength,
        messageLength: 0,
        fullMessageLength: null,
        messageLengthSize: 16
      };
      md.start = function() {
        md.messageLength = 0;
        md.fullMessageLength = md.messageLength128 = [];
        var int32s = md.messageLengthSize / 4;
        for (var i = 0; i < int32s; ++i) {
          md.fullMessageLength.push(0);
        }
        _input = forge7.util.createBuffer();
        _h = new Array(_state.length);
        for (var i = 0; i < _state.length; ++i) {
          _h[i] = _state[i].slice(0);
        }
        return md;
      };
      md.start();
      md.update = function(msg, encoding) {
        if (encoding === "utf8") {
          msg = forge7.util.encodeUtf8(msg);
        }
        var len = msg.length;
        md.messageLength += len;
        len = [len / 4294967296 >>> 0, len >>> 0];
        for (var i = md.fullMessageLength.length - 1; i >= 0; --i) {
          md.fullMessageLength[i] += len[1];
          len[1] = len[0] + (md.fullMessageLength[i] / 4294967296 >>> 0);
          md.fullMessageLength[i] = md.fullMessageLength[i] >>> 0;
          len[0] = len[1] / 4294967296 >>> 0;
        }
        _input.putBytes(msg);
        _update(_h, _w, _input);
        if (_input.read > 2048 || _input.length() === 0) {
          _input.compact();
        }
        return md;
      };
      md.digest = function() {
        var finalBlock = forge7.util.createBuffer();
        finalBlock.putBytes(_input.bytes());
        var remaining = md.fullMessageLength[md.fullMessageLength.length - 1] + md.messageLengthSize;
        var overflow = remaining & md.blockLength - 1;
        finalBlock.putBytes(_padding.substr(0, md.blockLength - overflow));
        var next, carry;
        var bits2 = md.fullMessageLength[0] * 8;
        for (var i = 0; i < md.fullMessageLength.length - 1; ++i) {
          next = md.fullMessageLength[i + 1] * 8;
          carry = next / 4294967296 >>> 0;
          bits2 += carry;
          finalBlock.putInt32(bits2 >>> 0);
          bits2 = next >>> 0;
        }
        finalBlock.putInt32(bits2);
        var h = new Array(_h.length);
        for (var i = 0; i < _h.length; ++i) {
          h[i] = _h[i].slice(0);
        }
        _update(h, _w, finalBlock);
        var rval = forge7.util.createBuffer();
        var hlen;
        if (algorithm === "SHA-512") {
          hlen = h.length;
        } else if (algorithm === "SHA-384") {
          hlen = h.length - 2;
        } else {
          hlen = h.length - 4;
        }
        for (var i = 0; i < hlen; ++i) {
          rval.putInt32(h[i][0]);
          if (i !== hlen - 1 || algorithm !== "SHA-512/224") {
            rval.putInt32(h[i][1]);
          }
        }
        return rval;
      };
      return md;
    };
    var _padding = null;
    var _initialized = false;
    var _k = null;
    var _states = null;
    function _init() {
      _padding = String.fromCharCode(128);
      _padding += forge7.util.fillString(String.fromCharCode(0), 128);
      _k = [
        [1116352408, 3609767458],
        [1899447441, 602891725],
        [3049323471, 3964484399],
        [3921009573, 2173295548],
        [961987163, 4081628472],
        [1508970993, 3053834265],
        [2453635748, 2937671579],
        [2870763221, 3664609560],
        [3624381080, 2734883394],
        [310598401, 1164996542],
        [607225278, 1323610764],
        [1426881987, 3590304994],
        [1925078388, 4068182383],
        [2162078206, 991336113],
        [2614888103, 633803317],
        [3248222580, 3479774868],
        [3835390401, 2666613458],
        [4022224774, 944711139],
        [264347078, 2341262773],
        [604807628, 2007800933],
        [770255983, 1495990901],
        [1249150122, 1856431235],
        [1555081692, 3175218132],
        [1996064986, 2198950837],
        [2554220882, 3999719339],
        [2821834349, 766784016],
        [2952996808, 2566594879],
        [3210313671, 3203337956],
        [3336571891, 1034457026],
        [3584528711, 2466948901],
        [113926993, 3758326383],
        [338241895, 168717936],
        [666307205, 1188179964],
        [773529912, 1546045734],
        [1294757372, 1522805485],
        [1396182291, 2643833823],
        [1695183700, 2343527390],
        [1986661051, 1014477480],
        [2177026350, 1206759142],
        [2456956037, 344077627],
        [2730485921, 1290863460],
        [2820302411, 3158454273],
        [3259730800, 3505952657],
        [3345764771, 106217008],
        [3516065817, 3606008344],
        [3600352804, 1432725776],
        [4094571909, 1467031594],
        [275423344, 851169720],
        [430227734, 3100823752],
        [506948616, 1363258195],
        [659060556, 3750685593],
        [883997877, 3785050280],
        [958139571, 3318307427],
        [1322822218, 3812723403],
        [1537002063, 2003034995],
        [1747873779, 3602036899],
        [1955562222, 1575990012],
        [2024104815, 1125592928],
        [2227730452, 2716904306],
        [2361852424, 442776044],
        [2428436474, 593698344],
        [2756734187, 3733110249],
        [3204031479, 2999351573],
        [3329325298, 3815920427],
        [3391569614, 3928383900],
        [3515267271, 566280711],
        [3940187606, 3454069534],
        [4118630271, 4000239992],
        [116418474, 1914138554],
        [174292421, 2731055270],
        [289380356, 3203993006],
        [460393269, 320620315],
        [685471733, 587496836],
        [852142971, 1086792851],
        [1017036298, 365543100],
        [1126000580, 2618297676],
        [1288033470, 3409855158],
        [1501505948, 4234509866],
        [1607167915, 987167468],
        [1816402316, 1246189591]
      ];
      _states = {};
      _states["SHA-512"] = [
        [1779033703, 4089235720],
        [3144134277, 2227873595],
        [1013904242, 4271175723],
        [2773480762, 1595750129],
        [1359893119, 2917565137],
        [2600822924, 725511199],
        [528734635, 4215389547],
        [1541459225, 327033209]
      ];
      _states["SHA-384"] = [
        [3418070365, 3238371032],
        [1654270250, 914150663],
        [2438529370, 812702999],
        [355462360, 4144912697],
        [1731405415, 4290775857],
        [2394180231, 1750603025],
        [3675008525, 1694076839],
        [1203062813, 3204075428]
      ];
      _states["SHA-512/256"] = [
        [573645204, 4230739756],
        [2673172387, 3360449730],
        [596883563, 1867755857],
        [2520282905, 1497426621],
        [2519219938, 2827943907],
        [3193839141, 1401305490],
        [721525244, 746961066],
        [246885852, 2177182882]
      ];
      _states["SHA-512/224"] = [
        [2352822216, 424955298],
        [1944164710, 2312950998],
        [502970286, 855612546],
        [1738396948, 1479516111],
        [258812777, 2077511080],
        [2011393907, 79989058],
        [1067287976, 1780299464],
        [286451373, 2446758561]
      ];
      _initialized = true;
    }
    function _update(s, w, bytes2) {
      var t1_hi, t1_lo;
      var t2_hi, t2_lo;
      var s0_hi, s0_lo;
      var s1_hi, s1_lo;
      var ch_hi, ch_lo;
      var maj_hi, maj_lo;
      var a_hi, a_lo;
      var b_hi, b_lo;
      var c_hi, c_lo;
      var d_hi, d_lo;
      var e_hi, e_lo;
      var f_hi, f_lo;
      var g_hi, g_lo;
      var h_hi, h_lo;
      var i, hi, lo, w2, w7, w15, w16;
      var len = bytes2.length();
      while (len >= 128) {
        for (i = 0; i < 16; ++i) {
          w[i][0] = bytes2.getInt32() >>> 0;
          w[i][1] = bytes2.getInt32() >>> 0;
        }
        for (; i < 80; ++i) {
          w2 = w[i - 2];
          hi = w2[0];
          lo = w2[1];
          t1_hi = ((hi >>> 19 | lo << 13) ^ (lo >>> 29 | hi << 3) ^ hi >>> 6) >>> 0;
          t1_lo = ((hi << 13 | lo >>> 19) ^ (lo << 3 | hi >>> 29) ^ (hi << 26 | lo >>> 6)) >>> 0;
          w15 = w[i - 15];
          hi = w15[0];
          lo = w15[1];
          t2_hi = ((hi >>> 1 | lo << 31) ^ (hi >>> 8 | lo << 24) ^ hi >>> 7) >>> 0;
          t2_lo = ((hi << 31 | lo >>> 1) ^ (hi << 24 | lo >>> 8) ^ (hi << 25 | lo >>> 7)) >>> 0;
          w7 = w[i - 7];
          w16 = w[i - 16];
          lo = t1_lo + w7[1] + t2_lo + w16[1];
          w[i][0] = t1_hi + w7[0] + t2_hi + w16[0] + (lo / 4294967296 >>> 0) >>> 0;
          w[i][1] = lo >>> 0;
        }
        a_hi = s[0][0];
        a_lo = s[0][1];
        b_hi = s[1][0];
        b_lo = s[1][1];
        c_hi = s[2][0];
        c_lo = s[2][1];
        d_hi = s[3][0];
        d_lo = s[3][1];
        e_hi = s[4][0];
        e_lo = s[4][1];
        f_hi = s[5][0];
        f_lo = s[5][1];
        g_hi = s[6][0];
        g_lo = s[6][1];
        h_hi = s[7][0];
        h_lo = s[7][1];
        for (i = 0; i < 80; ++i) {
          s1_hi = ((e_hi >>> 14 | e_lo << 18) ^ (e_hi >>> 18 | e_lo << 14) ^ (e_lo >>> 9 | e_hi << 23)) >>> 0;
          s1_lo = ((e_hi << 18 | e_lo >>> 14) ^ (e_hi << 14 | e_lo >>> 18) ^ (e_lo << 23 | e_hi >>> 9)) >>> 0;
          ch_hi = (g_hi ^ e_hi & (f_hi ^ g_hi)) >>> 0;
          ch_lo = (g_lo ^ e_lo & (f_lo ^ g_lo)) >>> 0;
          s0_hi = ((a_hi >>> 28 | a_lo << 4) ^ (a_lo >>> 2 | a_hi << 30) ^ (a_lo >>> 7 | a_hi << 25)) >>> 0;
          s0_lo = ((a_hi << 4 | a_lo >>> 28) ^ (a_lo << 30 | a_hi >>> 2) ^ (a_lo << 25 | a_hi >>> 7)) >>> 0;
          maj_hi = (a_hi & b_hi | c_hi & (a_hi ^ b_hi)) >>> 0;
          maj_lo = (a_lo & b_lo | c_lo & (a_lo ^ b_lo)) >>> 0;
          lo = h_lo + s1_lo + ch_lo + _k[i][1] + w[i][1];
          t1_hi = h_hi + s1_hi + ch_hi + _k[i][0] + w[i][0] + (lo / 4294967296 >>> 0) >>> 0;
          t1_lo = lo >>> 0;
          lo = s0_lo + maj_lo;
          t2_hi = s0_hi + maj_hi + (lo / 4294967296 >>> 0) >>> 0;
          t2_lo = lo >>> 0;
          h_hi = g_hi;
          h_lo = g_lo;
          g_hi = f_hi;
          g_lo = f_lo;
          f_hi = e_hi;
          f_lo = e_lo;
          lo = d_lo + t1_lo;
          e_hi = d_hi + t1_hi + (lo / 4294967296 >>> 0) >>> 0;
          e_lo = lo >>> 0;
          d_hi = c_hi;
          d_lo = c_lo;
          c_hi = b_hi;
          c_lo = b_lo;
          b_hi = a_hi;
          b_lo = a_lo;
          lo = t1_lo + t2_lo;
          a_hi = t1_hi + t2_hi + (lo / 4294967296 >>> 0) >>> 0;
          a_lo = lo >>> 0;
        }
        lo = s[0][1] + a_lo;
        s[0][0] = s[0][0] + a_hi + (lo / 4294967296 >>> 0) >>> 0;
        s[0][1] = lo >>> 0;
        lo = s[1][1] + b_lo;
        s[1][0] = s[1][0] + b_hi + (lo / 4294967296 >>> 0) >>> 0;
        s[1][1] = lo >>> 0;
        lo = s[2][1] + c_lo;
        s[2][0] = s[2][0] + c_hi + (lo / 4294967296 >>> 0) >>> 0;
        s[2][1] = lo >>> 0;
        lo = s[3][1] + d_lo;
        s[3][0] = s[3][0] + d_hi + (lo / 4294967296 >>> 0) >>> 0;
        s[3][1] = lo >>> 0;
        lo = s[4][1] + e_lo;
        s[4][0] = s[4][0] + e_hi + (lo / 4294967296 >>> 0) >>> 0;
        s[4][1] = lo >>> 0;
        lo = s[5][1] + f_lo;
        s[5][0] = s[5][0] + f_hi + (lo / 4294967296 >>> 0) >>> 0;
        s[5][1] = lo >>> 0;
        lo = s[6][1] + g_lo;
        s[6][0] = s[6][0] + g_hi + (lo / 4294967296 >>> 0) >>> 0;
        s[6][1] = lo >>> 0;
        lo = s[7][1] + h_lo;
        s[7][0] = s[7][0] + h_hi + (lo / 4294967296 >>> 0) >>> 0;
        s[7][1] = lo >>> 0;
        len -= 128;
      }
    }
  }
});

// node_modules/@orbitdb/core/src/index.js
init_node_globals();

// node_modules/@orbitdb/core/src/orbitdb.js
init_node_globals();

// node_modules/@orbitdb/core/src/databases/index.js
init_node_globals();

// node_modules/@orbitdb/core/src/databases/documents.js
init_node_globals();

// node_modules/@orbitdb/core/src/database.js
init_node_globals();
var import_events2 = __toESM(require_events(), 1);

// node_modules/p-queue/dist/index.js
init_node_globals();

// node_modules/eventemitter3/index.mjs
init_node_globals();
var import_index = __toESM(require_eventemitter3(), 1);

// node_modules/p-queue/node_modules/p-timeout/index.js
init_node_globals();
var TimeoutError = class extends Error {
  constructor(message2) {
    super(message2);
    this.name = "TimeoutError";
  }
};
var AbortError = class extends Error {
  constructor(message2) {
    super();
    this.name = "AbortError";
    this.message = message2;
  }
};
var getDOMException = (errorMessage) => globalThis.DOMException === void 0 ? new AbortError(errorMessage) : new DOMException(errorMessage);
var getAbortedReason = (signal) => {
  const reason = signal.reason === void 0 ? getDOMException("This operation was aborted.") : signal.reason;
  return reason instanceof Error ? reason : getDOMException(reason);
};
function pTimeout(promise, milliseconds, fallback, options) {
  let timer;
  const cancelablePromise = new Promise((resolve, reject) => {
    if (typeof milliseconds !== "number" || Math.sign(milliseconds) !== 1) {
      throw new TypeError(`Expected \`milliseconds\` to be a positive number, got \`${milliseconds}\``);
    }
    if (milliseconds === Number.POSITIVE_INFINITY) {
      resolve(promise);
      return;
    }
    options = {
      customTimers: { setTimeout, clearTimeout },
      ...options
    };
    if (options.signal) {
      const { signal } = options;
      if (signal.aborted) {
        reject(getAbortedReason(signal));
      }
      signal.addEventListener("abort", () => {
        reject(getAbortedReason(signal));
      });
    }
    timer = options.customTimers.setTimeout.call(void 0, () => {
      if (typeof fallback === "function") {
        try {
          resolve(fallback());
        } catch (error) {
          reject(error);
        }
        return;
      }
      const message2 = typeof fallback === "string" ? fallback : `Promise timed out after ${milliseconds} milliseconds`;
      const timeoutError = fallback instanceof Error ? fallback : new TimeoutError(message2);
      if (typeof promise.cancel === "function") {
        promise.cancel();
      }
      reject(timeoutError);
    }, milliseconds);
    (async () => {
      try {
        resolve(await promise);
      } catch (error) {
        reject(error);
      } finally {
        options.customTimers.clearTimeout.call(void 0, timer);
      }
    })();
  });
  cancelablePromise.clear = () => {
    clearTimeout(timer);
    timer = void 0;
  };
  return cancelablePromise;
}

// node_modules/p-queue/dist/priority-queue.js
init_node_globals();

// node_modules/p-queue/dist/lower-bound.js
init_node_globals();
function lowerBound(array, value, comparator) {
  let first = 0;
  let count = array.length;
  while (count > 0) {
    const step = Math.trunc(count / 2);
    let it = first + step;
    if (comparator(array[it], value) <= 0) {
      first = ++it;
      count -= step + 1;
    } else {
      count = step;
    }
  }
  return first;
}

// node_modules/p-queue/dist/priority-queue.js
var __classPrivateFieldGet = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PriorityQueue_queue;
var PriorityQueue = class {
  constructor() {
    _PriorityQueue_queue.set(this, []);
  }
  enqueue(run, options) {
    options = {
      priority: 0,
      ...options
    };
    const element = {
      priority: options.priority,
      run
    };
    if (this.size && __classPrivateFieldGet(this, _PriorityQueue_queue, "f")[this.size - 1].priority >= options.priority) {
      __classPrivateFieldGet(this, _PriorityQueue_queue, "f").push(element);
      return;
    }
    const index = lowerBound(__classPrivateFieldGet(this, _PriorityQueue_queue, "f"), element, (a, b) => b.priority - a.priority);
    __classPrivateFieldGet(this, _PriorityQueue_queue, "f").splice(index, 0, element);
  }
  dequeue() {
    const item = __classPrivateFieldGet(this, _PriorityQueue_queue, "f").shift();
    return item === null || item === void 0 ? void 0 : item.run;
  }
  filter(options) {
    return __classPrivateFieldGet(this, _PriorityQueue_queue, "f").filter((element) => element.priority === options.priority).map((element) => element.run);
  }
  get size() {
    return __classPrivateFieldGet(this, _PriorityQueue_queue, "f").length;
  }
};
_PriorityQueue_queue = /* @__PURE__ */ new WeakMap();
var priority_queue_default = PriorityQueue;

// node_modules/p-queue/dist/index.js
var __classPrivateFieldSet = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet2 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PQueue_instances;
var _PQueue_carryoverConcurrencyCount;
var _PQueue_isIntervalIgnored;
var _PQueue_intervalCount;
var _PQueue_intervalCap;
var _PQueue_interval;
var _PQueue_intervalEnd;
var _PQueue_intervalId;
var _PQueue_timeoutId;
var _PQueue_queue;
var _PQueue_queueClass;
var _PQueue_pending;
var _PQueue_concurrency;
var _PQueue_isPaused;
var _PQueue_throwOnTimeout;
var _PQueue_doesIntervalAllowAnother_get;
var _PQueue_doesConcurrentAllowAnother_get;
var _PQueue_next;
var _PQueue_onResumeInterval;
var _PQueue_isIntervalPaused_get;
var _PQueue_tryToStartAnother;
var _PQueue_initializeIntervalIfNeeded;
var _PQueue_onInterval;
var _PQueue_processQueue;
var _PQueue_throwOnAbort;
var _PQueue_onEvent;
var AbortError2 = class extends Error {
};
var PQueue = class extends import_index.default {
  constructor(options) {
    var _a, _b, _c, _d;
    super();
    _PQueue_instances.add(this);
    _PQueue_carryoverConcurrencyCount.set(this, void 0);
    _PQueue_isIntervalIgnored.set(this, void 0);
    _PQueue_intervalCount.set(this, 0);
    _PQueue_intervalCap.set(this, void 0);
    _PQueue_interval.set(this, void 0);
    _PQueue_intervalEnd.set(this, 0);
    _PQueue_intervalId.set(this, void 0);
    _PQueue_timeoutId.set(this, void 0);
    _PQueue_queue.set(this, void 0);
    _PQueue_queueClass.set(this, void 0);
    _PQueue_pending.set(this, 0);
    _PQueue_concurrency.set(this, void 0);
    _PQueue_isPaused.set(this, void 0);
    _PQueue_throwOnTimeout.set(this, void 0);
    Object.defineProperty(this, "timeout", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    options = {
      carryoverConcurrencyCount: false,
      intervalCap: Number.POSITIVE_INFINITY,
      interval: 0,
      concurrency: Number.POSITIVE_INFINITY,
      autoStart: true,
      queueClass: priority_queue_default,
      ...options
    };
    if (!(typeof options.intervalCap === "number" && options.intervalCap >= 1)) {
      throw new TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${(_b = (_a = options.intervalCap) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : ""}\` (${typeof options.intervalCap})`);
    }
    if (options.interval === void 0 || !(Number.isFinite(options.interval) && options.interval >= 0)) {
      throw new TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${(_d = (_c = options.interval) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ""}\` (${typeof options.interval})`);
    }
    __classPrivateFieldSet(this, _PQueue_carryoverConcurrencyCount, options.carryoverConcurrencyCount, "f");
    __classPrivateFieldSet(this, _PQueue_isIntervalIgnored, options.intervalCap === Number.POSITIVE_INFINITY || options.interval === 0, "f");
    __classPrivateFieldSet(this, _PQueue_intervalCap, options.intervalCap, "f");
    __classPrivateFieldSet(this, _PQueue_interval, options.interval, "f");
    __classPrivateFieldSet(this, _PQueue_queue, new options.queueClass(), "f");
    __classPrivateFieldSet(this, _PQueue_queueClass, options.queueClass, "f");
    this.concurrency = options.concurrency;
    this.timeout = options.timeout;
    __classPrivateFieldSet(this, _PQueue_throwOnTimeout, options.throwOnTimeout === true, "f");
    __classPrivateFieldSet(this, _PQueue_isPaused, options.autoStart === false, "f");
  }
  get concurrency() {
    return __classPrivateFieldGet2(this, _PQueue_concurrency, "f");
  }
  set concurrency(newConcurrency) {
    if (!(typeof newConcurrency === "number" && newConcurrency >= 1)) {
      throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${newConcurrency}\` (${typeof newConcurrency})`);
    }
    __classPrivateFieldSet(this, _PQueue_concurrency, newConcurrency, "f");
    __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_processQueue).call(this);
  }
  async add(function_, options = {}) {
    options = {
      timeout: this.timeout,
      throwOnTimeout: __classPrivateFieldGet2(this, _PQueue_throwOnTimeout, "f"),
      ...options
    };
    return new Promise((resolve, reject) => {
      __classPrivateFieldGet2(this, _PQueue_queue, "f").enqueue(async () => {
        var _a;
        var _b, _c;
        __classPrivateFieldSet(this, _PQueue_pending, (_b = __classPrivateFieldGet2(this, _PQueue_pending, "f"), _b++, _b), "f");
        __classPrivateFieldSet(this, _PQueue_intervalCount, (_c = __classPrivateFieldGet2(this, _PQueue_intervalCount, "f"), _c++, _c), "f");
        try {
          if ((_a = options.signal) === null || _a === void 0 ? void 0 : _a.aborted) {
            throw new AbortError2("The task was aborted.");
          }
          let operation = function_({ signal: options.signal });
          if (options.timeout) {
            operation = pTimeout(Promise.resolve(operation), options.timeout);
          }
          if (options.signal) {
            operation = Promise.race([operation, __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_throwOnAbort).call(this, options.signal)]);
          }
          const result = await operation;
          resolve(result);
          this.emit("completed", result);
        } catch (error) {
          if (error instanceof TimeoutError && !options.throwOnTimeout) {
            resolve();
            return;
          }
          reject(error);
          this.emit("error", error);
        } finally {
          __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_next).call(this);
        }
      }, options);
      this.emit("add");
      __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_tryToStartAnother).call(this);
    });
  }
  async addAll(functions, options) {
    return Promise.all(functions.map(async (function_) => this.add(function_, options)));
  }
  start() {
    if (!__classPrivateFieldGet2(this, _PQueue_isPaused, "f")) {
      return this;
    }
    __classPrivateFieldSet(this, _PQueue_isPaused, false, "f");
    __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_processQueue).call(this);
    return this;
  }
  pause() {
    __classPrivateFieldSet(this, _PQueue_isPaused, true, "f");
  }
  clear() {
    __classPrivateFieldSet(this, _PQueue_queue, new (__classPrivateFieldGet2(this, _PQueue_queueClass, "f"))(), "f");
  }
  async onEmpty() {
    if (__classPrivateFieldGet2(this, _PQueue_queue, "f").size === 0) {
      return;
    }
    await __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_onEvent).call(this, "empty");
  }
  async onSizeLessThan(limit) {
    if (__classPrivateFieldGet2(this, _PQueue_queue, "f").size < limit) {
      return;
    }
    await __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_onEvent).call(this, "next", () => __classPrivateFieldGet2(this, _PQueue_queue, "f").size < limit);
  }
  async onIdle() {
    if (__classPrivateFieldGet2(this, _PQueue_pending, "f") === 0 && __classPrivateFieldGet2(this, _PQueue_queue, "f").size === 0) {
      return;
    }
    await __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_onEvent).call(this, "idle");
  }
  get size() {
    return __classPrivateFieldGet2(this, _PQueue_queue, "f").size;
  }
  sizeBy(options) {
    return __classPrivateFieldGet2(this, _PQueue_queue, "f").filter(options).length;
  }
  get pending() {
    return __classPrivateFieldGet2(this, _PQueue_pending, "f");
  }
  get isPaused() {
    return __classPrivateFieldGet2(this, _PQueue_isPaused, "f");
  }
};
_PQueue_carryoverConcurrencyCount = /* @__PURE__ */ new WeakMap(), _PQueue_isIntervalIgnored = /* @__PURE__ */ new WeakMap(), _PQueue_intervalCount = /* @__PURE__ */ new WeakMap(), _PQueue_intervalCap = /* @__PURE__ */ new WeakMap(), _PQueue_interval = /* @__PURE__ */ new WeakMap(), _PQueue_intervalEnd = /* @__PURE__ */ new WeakMap(), _PQueue_intervalId = /* @__PURE__ */ new WeakMap(), _PQueue_timeoutId = /* @__PURE__ */ new WeakMap(), _PQueue_queue = /* @__PURE__ */ new WeakMap(), _PQueue_queueClass = /* @__PURE__ */ new WeakMap(), _PQueue_pending = /* @__PURE__ */ new WeakMap(), _PQueue_concurrency = /* @__PURE__ */ new WeakMap(), _PQueue_isPaused = /* @__PURE__ */ new WeakMap(), _PQueue_throwOnTimeout = /* @__PURE__ */ new WeakMap(), _PQueue_instances = /* @__PURE__ */ new WeakSet(), _PQueue_doesIntervalAllowAnother_get = function _PQueue_doesIntervalAllowAnother_get2() {
  return __classPrivateFieldGet2(this, _PQueue_isIntervalIgnored, "f") || __classPrivateFieldGet2(this, _PQueue_intervalCount, "f") < __classPrivateFieldGet2(this, _PQueue_intervalCap, "f");
}, _PQueue_doesConcurrentAllowAnother_get = function _PQueue_doesConcurrentAllowAnother_get2() {
  return __classPrivateFieldGet2(this, _PQueue_pending, "f") < __classPrivateFieldGet2(this, _PQueue_concurrency, "f");
}, _PQueue_next = function _PQueue_next2() {
  var _a;
  __classPrivateFieldSet(this, _PQueue_pending, (_a = __classPrivateFieldGet2(this, _PQueue_pending, "f"), _a--, _a), "f");
  __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_tryToStartAnother).call(this);
  this.emit("next");
}, _PQueue_onResumeInterval = function _PQueue_onResumeInterval2() {
  __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_onInterval).call(this);
  __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_initializeIntervalIfNeeded).call(this);
  __classPrivateFieldSet(this, _PQueue_timeoutId, void 0, "f");
}, _PQueue_isIntervalPaused_get = function _PQueue_isIntervalPaused_get2() {
  const now = Date.now();
  if (__classPrivateFieldGet2(this, _PQueue_intervalId, "f") === void 0) {
    const delay = __classPrivateFieldGet2(this, _PQueue_intervalEnd, "f") - now;
    if (delay < 0) {
      __classPrivateFieldSet(this, _PQueue_intervalCount, __classPrivateFieldGet2(this, _PQueue_carryoverConcurrencyCount, "f") ? __classPrivateFieldGet2(this, _PQueue_pending, "f") : 0, "f");
    } else {
      if (__classPrivateFieldGet2(this, _PQueue_timeoutId, "f") === void 0) {
        __classPrivateFieldSet(this, _PQueue_timeoutId, setTimeout(() => {
          __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_onResumeInterval).call(this);
        }, delay), "f");
      }
      return true;
    }
  }
  return false;
}, _PQueue_tryToStartAnother = function _PQueue_tryToStartAnother2() {
  if (__classPrivateFieldGet2(this, _PQueue_queue, "f").size === 0) {
    if (__classPrivateFieldGet2(this, _PQueue_intervalId, "f")) {
      clearInterval(__classPrivateFieldGet2(this, _PQueue_intervalId, "f"));
    }
    __classPrivateFieldSet(this, _PQueue_intervalId, void 0, "f");
    this.emit("empty");
    if (__classPrivateFieldGet2(this, _PQueue_pending, "f") === 0) {
      this.emit("idle");
    }
    return false;
  }
  if (!__classPrivateFieldGet2(this, _PQueue_isPaused, "f")) {
    const canInitializeInterval = !__classPrivateFieldGet2(this, _PQueue_instances, "a", _PQueue_isIntervalPaused_get);
    if (__classPrivateFieldGet2(this, _PQueue_instances, "a", _PQueue_doesIntervalAllowAnother_get) && __classPrivateFieldGet2(this, _PQueue_instances, "a", _PQueue_doesConcurrentAllowAnother_get)) {
      const job = __classPrivateFieldGet2(this, _PQueue_queue, "f").dequeue();
      if (!job) {
        return false;
      }
      this.emit("active");
      job();
      if (canInitializeInterval) {
        __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_initializeIntervalIfNeeded).call(this);
      }
      return true;
    }
  }
  return false;
}, _PQueue_initializeIntervalIfNeeded = function _PQueue_initializeIntervalIfNeeded2() {
  if (__classPrivateFieldGet2(this, _PQueue_isIntervalIgnored, "f") || __classPrivateFieldGet2(this, _PQueue_intervalId, "f") !== void 0) {
    return;
  }
  __classPrivateFieldSet(this, _PQueue_intervalId, setInterval(() => {
    __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_onInterval).call(this);
  }, __classPrivateFieldGet2(this, _PQueue_interval, "f")), "f");
  __classPrivateFieldSet(this, _PQueue_intervalEnd, Date.now() + __classPrivateFieldGet2(this, _PQueue_interval, "f"), "f");
}, _PQueue_onInterval = function _PQueue_onInterval2() {
  if (__classPrivateFieldGet2(this, _PQueue_intervalCount, "f") === 0 && __classPrivateFieldGet2(this, _PQueue_pending, "f") === 0 && __classPrivateFieldGet2(this, _PQueue_intervalId, "f")) {
    clearInterval(__classPrivateFieldGet2(this, _PQueue_intervalId, "f"));
    __classPrivateFieldSet(this, _PQueue_intervalId, void 0, "f");
  }
  __classPrivateFieldSet(this, _PQueue_intervalCount, __classPrivateFieldGet2(this, _PQueue_carryoverConcurrencyCount, "f") ? __classPrivateFieldGet2(this, _PQueue_pending, "f") : 0, "f");
  __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_processQueue).call(this);
}, _PQueue_processQueue = function _PQueue_processQueue2() {
  while (__classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_tryToStartAnother).call(this)) {
  }
}, _PQueue_throwOnAbort = async function _PQueue_throwOnAbort2(signal) {
  return new Promise((_resolve, reject) => {
    signal.addEventListener("abort", () => {
      reject(new AbortError2("The task was aborted."));
    }, { once: true });
  });
}, _PQueue_onEvent = async function _PQueue_onEvent2(event, filter) {
  return new Promise((resolve) => {
    const listener = () => {
      if (filter && !filter()) {
        return;
      }
      this.off(event, listener);
      resolve();
    };
    this.on(event, listener);
  });
};
var dist_default = PQueue;

// node_modules/@orbitdb/core/src/sync.js
init_node_globals();

// node_modules/@orbitdb/core/node_modules/it-pipe/dist/src/index.js
init_node_globals();

// node_modules/it-pushable/dist/src/index.js
init_node_globals();

// node_modules/p-defer/index.js
init_node_globals();
function pDefer() {
  const deferred = {};
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
}

// node_modules/it-pushable/dist/src/fifo.js
init_node_globals();
var FixedFIFO = class {
  buffer;
  mask;
  top;
  btm;
  next;
  constructor(hwm) {
    if (!(hwm > 0) || (hwm - 1 & hwm) !== 0) {
      throw new Error("Max size for a FixedFIFO should be a power of two");
    }
    this.buffer = new Array(hwm);
    this.mask = hwm - 1;
    this.top = 0;
    this.btm = 0;
    this.next = null;
  }
  push(data) {
    if (this.buffer[this.top] !== void 0) {
      return false;
    }
    this.buffer[this.top] = data;
    this.top = this.top + 1 & this.mask;
    return true;
  }
  shift() {
    const last = this.buffer[this.btm];
    if (last === void 0) {
      return void 0;
    }
    this.buffer[this.btm] = void 0;
    this.btm = this.btm + 1 & this.mask;
    return last;
  }
  isEmpty() {
    return this.buffer[this.btm] === void 0;
  }
};
var FIFO = class {
  size;
  hwm;
  head;
  tail;
  constructor(options = {}) {
    this.hwm = options.splitLimit ?? 16;
    this.head = new FixedFIFO(this.hwm);
    this.tail = this.head;
    this.size = 0;
  }
  calculateSize(obj) {
    if (obj?.byteLength != null) {
      return obj.byteLength;
    }
    return 1;
  }
  push(val) {
    if (val?.value != null) {
      this.size += this.calculateSize(val.value);
    }
    if (!this.head.push(val)) {
      const prev = this.head;
      this.head = prev.next = new FixedFIFO(2 * this.head.buffer.length);
      this.head.push(val);
    }
  }
  shift() {
    let val = this.tail.shift();
    if (val === void 0 && this.tail.next != null) {
      const next = this.tail.next;
      this.tail.next = null;
      this.tail = next;
      val = this.tail.shift();
    }
    if (val?.value != null) {
      this.size -= this.calculateSize(val.value);
    }
    return val;
  }
  isEmpty() {
    return this.head.isEmpty();
  }
};

// node_modules/it-pushable/dist/src/index.js
var AbortError3 = class extends Error {
  type;
  code;
  constructor(message2, code3) {
    super(message2 ?? "The operation was aborted");
    this.type = "aborted";
    this.code = code3 ?? "ABORT_ERR";
  }
};
function pushable(options = {}) {
  const getNext = (buffer2) => {
    const next = buffer2.shift();
    if (next == null) {
      return { done: true };
    }
    if (next.error != null) {
      throw next.error;
    }
    return {
      done: next.done === true,
      value: next.value
    };
  };
  return _pushable(getNext, options);
}
function _pushable(getNext, options) {
  options = options ?? {};
  let onEnd = options.onEnd;
  let buffer2 = new FIFO();
  let pushable2;
  let onNext;
  let ended;
  let drain = pDefer();
  const waitNext = async () => {
    try {
      if (!buffer2.isEmpty()) {
        return getNext(buffer2);
      }
      if (ended) {
        return { done: true };
      }
      return await new Promise((resolve, reject) => {
        onNext = (next) => {
          onNext = null;
          buffer2.push(next);
          try {
            resolve(getNext(buffer2));
          } catch (err) {
            reject(err);
          }
          return pushable2;
        };
      });
    } finally {
      if (buffer2.isEmpty()) {
        queueMicrotask(() => {
          drain.resolve();
          drain = pDefer();
        });
      }
    }
  };
  const bufferNext = (next) => {
    if (onNext != null) {
      return onNext(next);
    }
    buffer2.push(next);
    return pushable2;
  };
  const bufferError = (err) => {
    buffer2 = new FIFO();
    if (onNext != null) {
      return onNext({ error: err });
    }
    buffer2.push({ error: err });
    return pushable2;
  };
  const push = (value) => {
    if (ended) {
      return pushable2;
    }
    if (options?.objectMode !== true && value?.byteLength == null) {
      throw new Error("objectMode was not true but tried to push non-Uint8Array value");
    }
    return bufferNext({ done: false, value });
  };
  const end = (err) => {
    if (ended)
      return pushable2;
    ended = true;
    return err != null ? bufferError(err) : bufferNext({ done: true });
  };
  const _return = () => {
    buffer2 = new FIFO();
    end();
    return { done: true };
  };
  const _throw = (err) => {
    end(err);
    return { done: true };
  };
  pushable2 = {
    [Symbol.asyncIterator]() {
      return this;
    },
    next: waitNext,
    return: _return,
    throw: _throw,
    push,
    end,
    get readableLength() {
      return buffer2.size;
    },
    onEmpty: async (options2) => {
      const signal = options2?.signal;
      signal?.throwIfAborted();
      if (buffer2.isEmpty()) {
        return;
      }
      let cancel;
      let listener;
      if (signal != null) {
        cancel = new Promise((resolve, reject) => {
          listener = () => {
            reject(new AbortError3());
          };
          signal.addEventListener("abort", listener);
        });
      }
      try {
        await Promise.race([
          drain.promise,
          cancel
        ]);
      } finally {
        if (listener != null && signal != null) {
          signal?.removeEventListener("abort", listener);
        }
      }
    }
  };
  if (onEnd == null) {
    return pushable2;
  }
  const _pushable2 = pushable2;
  pushable2 = {
    [Symbol.asyncIterator]() {
      return this;
    },
    next() {
      return _pushable2.next();
    },
    throw(err) {
      _pushable2.throw(err);
      if (onEnd != null) {
        onEnd(err);
        onEnd = void 0;
      }
      return { done: true };
    },
    return() {
      _pushable2.return();
      if (onEnd != null) {
        onEnd();
        onEnd = void 0;
      }
      return { done: true };
    },
    push,
    end(err) {
      _pushable2.end(err);
      if (onEnd != null) {
        onEnd(err);
        onEnd = void 0;
      }
      return pushable2;
    },
    get readableLength() {
      return _pushable2.readableLength;
    }
  };
  return pushable2;
}

// node_modules/@orbitdb/core/node_modules/it-merge/dist/src/index.js
init_node_globals();
function isAsyncIterable(thing) {
  return thing[Symbol.asyncIterator] != null;
}
function merge(...sources) {
  const syncSources = [];
  for (const source of sources) {
    if (!isAsyncIterable(source)) {
      syncSources.push(source);
    }
  }
  if (syncSources.length === sources.length) {
    return function* () {
      for (const source of syncSources) {
        yield* source;
      }
    }();
  }
  return async function* () {
    const output2 = pushable({
      objectMode: true
    });
    void Promise.resolve().then(async () => {
      try {
        await Promise.all(sources.map(async (source) => {
          for await (const item of source) {
            output2.push(item);
          }
        }));
        output2.end();
      } catch (err) {
        output2.end(err);
      }
    });
    yield* output2;
  }();
}
var src_default = merge;

// node_modules/@orbitdb/core/node_modules/it-pipe/dist/src/index.js
function pipe(first, ...rest) {
  if (first == null) {
    throw new Error("Empty pipeline");
  }
  if (isDuplex(first)) {
    const duplex = first;
    first = () => duplex.source;
  } else if (isIterable(first) || isAsyncIterable2(first)) {
    const source = first;
    first = () => source;
  }
  const fns = [first, ...rest];
  if (fns.length > 1) {
    if (isDuplex(fns[fns.length - 1])) {
      fns[fns.length - 1] = fns[fns.length - 1].sink;
    }
  }
  if (fns.length > 2) {
    for (let i = 1; i < fns.length - 1; i++) {
      if (isDuplex(fns[i])) {
        fns[i] = duplexPipelineFn(fns[i]);
      }
    }
  }
  return rawPipe(...fns);
}
var rawPipe = (...fns) => {
  let res;
  while (fns.length > 0) {
    res = fns.shift()(res);
  }
  return res;
};
var isAsyncIterable2 = (obj) => {
  return obj?.[Symbol.asyncIterator] != null;
};
var isIterable = (obj) => {
  return obj?.[Symbol.iterator] != null;
};
var isDuplex = (obj) => {
  if (obj == null) {
    return false;
  }
  return obj.sink != null && obj.source != null;
};
var duplexPipelineFn = (duplex) => {
  return (source) => {
    const p = duplex.sink(source);
    if (p?.then != null) {
      const stream = pushable({
        objectMode: true
      });
      p.then(() => {
        stream.end();
      }, (err) => {
        stream.end(err);
      });
      let sourceWrap;
      const source2 = duplex.source;
      if (isAsyncIterable2(source2)) {
        sourceWrap = async function* () {
          yield* source2;
          stream.end();
        };
      } else if (isIterable(source2)) {
        sourceWrap = function* () {
          yield* source2;
          stream.end();
        };
      } else {
        throw new Error("Unknown duplex source type - must be Iterable or AsyncIterable");
      }
      return src_default(stream, sourceWrap());
    }
    return duplex.source;
  };
};

// node_modules/@orbitdb/core/src/sync.js
var import_events = __toESM(require_events(), 1);
var import_timeout_abort_controller = __toESM(require_timeout_abort_controller(), 1);

// node_modules/@orbitdb/core/src/utils/path-join.js
init_node_globals();
var posixJoin = (...paths) => paths.join("/").replace(/((?<=\/)\/+)|(^\.\/)|((?<=\/)\.\/)/g, "") || ".";
var path_join_default = posixJoin;

// node_modules/@orbitdb/core/src/sync.js
var DefaultTimeout = 3e4;
var Sync = async ({ ipfs, log, events, onSynced, start, timeout }) => {
  if (!ipfs)
    throw new Error("An instance of ipfs is required.");
  if (!log)
    throw new Error("An instance of log is required.");
  const address = log.id;
  const headsSyncAddress = path_join_default("/orbitdb/heads/", address);
  const queue = new dist_default({ concurrency: 1 });
  const peers = /* @__PURE__ */ new Set();
  events = events || new import_events.EventEmitter();
  timeout = timeout || DefaultTimeout;
  let started = false;
  const onPeerJoined = async (peerId) => {
    const heads = await log.heads();
    events.emit("join", peerId, heads);
  };
  const sendHeads = async (source) => {
    return async function* () {
      const heads = await log.heads();
      for await (const { bytes: bytes2 } of heads) {
        yield bytes2;
      }
    }();
  };
  const receiveHeads = (peerId) => async (source) => {
    for await (const value of source) {
      const headBytes = value.subarray();
      if (headBytes && onSynced) {
        await onSynced(headBytes);
      }
    }
    await onPeerJoined(peerId);
  };
  const handleReceiveHeads = async ({ connection, stream }) => {
    const peerId = String(connection.remotePeer);
    try {
      peers.add(peerId);
      await pipe(stream, receiveHeads(peerId), sendHeads, stream);
    } catch (e) {
      peers.delete(peerId);
      events.emit("error", e);
    }
  };
  const handlePeerSubscribed = async (event) => {
    const task = async () => {
      const { peerId: remotePeer, subscriptions } = event.detail;
      const peerId = String(remotePeer);
      const subscription = subscriptions.find((e) => e.topic === address);
      if (!subscription) {
        return;
      }
      if (subscription.subscribe) {
        if (peers.has(peerId)) {
          return;
        }
        const timeoutController = new import_timeout_abort_controller.TimeoutController(timeout);
        const { signal } = timeoutController;
        try {
          peers.add(peerId);
          const stream = await ipfs.libp2p.dialProtocol(remotePeer, headsSyncAddress, { signal });
          await pipe(sendHeads, stream, receiveHeads(peerId));
        } catch (e) {
          if (e.code === "ERR_UNSUPPORTED_PROTOCOL") {
          } else {
            peers.delete(peerId);
            events.emit("error", e);
          }
        } finally {
          if (timeoutController) {
            timeoutController.clear();
          }
        }
      } else {
        peers.delete(peerId);
        events.emit("leave", peerId);
      }
    };
    queue.add(task);
  };
  const handleUpdateMessage = async (message2) => {
    const task = async () => {
      const { id: peerId } = await ipfs.id();
      const messageIsNotFromMe = (message3) => String(peerId) !== String(message3.from);
      const messageHasData = (message3) => message3.data !== void 0;
      try {
        if (messageIsNotFromMe(message2) && messageHasData(message2) && onSynced) {
          await onSynced(message2.data);
        }
      } catch (e) {
        events.emit("error", e);
      }
    };
    queue.add(task);
  };
  const add2 = async (entry) => {
    if (started) {
      await ipfs.pubsub.publish(address, entry.bytes);
    }
  };
  const stopSync = async () => {
    if (started) {
      await queue.onIdle();
      await ipfs.libp2p.unhandle(headsSyncAddress);
      await ipfs.pubsub.unsubscribe(address, handleUpdateMessage);
      peers.clear();
      started = false;
    }
  };
  const startSync = async () => {
    if (!started) {
      await ipfs.libp2p.handle(headsSyncAddress, handleReceiveHeads);
      await ipfs.pubsub.subscribe(address, handleUpdateMessage);
      started = true;
    }
  };
  if (start !== false) {
    await startSync();
  }
  return {
    add: add2,
    stop: stopSync,
    start: startSync,
    events,
    peers
  };
};

// node_modules/@orbitdb/core/src/oplog/index.js
init_node_globals();

// node_modules/@orbitdb/core/src/oplog/log.js
init_node_globals();
var import_lru = __toESM(require_lru(), 1);

// node_modules/@orbitdb/core/src/oplog/entry.js
init_node_globals();

// node_modules/@orbitdb/core/src/oplog/clock.js
init_node_globals();
var compareClocks = (a, b) => {
  const dist = a.time - b.time;
  if (dist === 0 && a.id !== b.id)
    return a.id < b.id ? -1 : 1;
  return dist;
};
var tickClock = (clock) => {
  return Clock(clock.id, ++clock.time);
};
var Clock = (id, time) => {
  time = time || 0;
  return {
    id,
    time
  };
};

// node_modules/@orbitdb/core/node_modules/multiformats/src/block.js
init_node_globals();

// node_modules/@orbitdb/core/node_modules/multiformats/src/index.js
init_node_globals();

// node_modules/@orbitdb/core/node_modules/multiformats/src/bytes.js
init_node_globals();
var empty = new Uint8Array(0);
var equals = (aa, bb) => {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii = 0; ii < aa.byteLength; ii++) {
    if (aa[ii] !== bb[ii]) {
      return false;
    }
  }
  return true;
};
var coerce = (o) => {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
};
var fromString = (str) => new TextEncoder().encode(str);
var toString = (b) => new TextDecoder().decode(b);

// node_modules/@orbitdb/core/node_modules/multiformats/src/cid.js
init_node_globals();

// node_modules/@orbitdb/core/node_modules/multiformats/src/bases/base32.js
var base32_exports = {};
__export(base32_exports, {
  base32: () => base32,
  base32hex: () => base32hex,
  base32hexpad: () => base32hexpad,
  base32hexpadupper: () => base32hexpadupper,
  base32hexupper: () => base32hexupper,
  base32pad: () => base32pad,
  base32padupper: () => base32padupper,
  base32upper: () => base32upper,
  base32z: () => base32z
});
init_node_globals();

// node_modules/@orbitdb/core/node_modules/multiformats/src/bases/base.js
init_node_globals();

// node_modules/@orbitdb/core/node_modules/multiformats/vendor/base-x.js
init_node_globals();
function base(ALPHABET, name3) {
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
  function encode10(source) {
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
  function decode14(string2) {
    var buffer2 = decodeUnsafe(string2);
    if (buffer2) {
      return buffer2;
    }
    throw new Error(`Non-${name3} character`);
  }
  return {
    encode: encode10,
    decodeUnsafe,
    decode: decode14
  };
}
var src = base;
var _brrp__multiformats_scope_baseX = src;
var base_x_default = _brrp__multiformats_scope_baseX;

// node_modules/@orbitdb/core/node_modules/multiformats/src/bases/interface.js
init_node_globals();

// node_modules/@orbitdb/core/node_modules/multiformats/src/bases/base.js
var Encoder = class {
  constructor(name3, prefix, baseEncode) {
    this.name = name3;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes2) {
    if (bytes2 instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes2)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
var Decoder = class {
  constructor(name3, prefix, baseDecode) {
    this.name = name3;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder) {
    return or(this, decoder);
  }
};
var ComposedDecoder = class {
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
};
var or = (left, right) => new ComposedDecoder({
  ...left.decoders || { [left.prefix]: left },
  ...right.decoders || { [right.prefix]: right }
});
var Codec = class {
  constructor(name3, prefix, baseEncode, baseDecode) {
    this.name = name3;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder(name3, prefix, baseEncode);
    this.decoder = new Decoder(name3, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
};
var from = ({ name: name3, prefix, encode: encode10, decode: decode14 }) => new Codec(name3, prefix, encode10, decode14);
var baseX = ({ prefix, name: name3, alphabet: alphabet2 }) => {
  const { encode: encode10, decode: decode14 } = base_x_default(alphabet2, name3);
  return from({
    prefix,
    name: name3,
    encode: encode10,
    decode: (text) => coerce(decode14(text))
  });
};
var decode = (string2, alphabet2, bitsPerChar, name3) => {
  const codes = {};
  for (let i = 0; i < alphabet2.length; ++i) {
    codes[alphabet2[i]] = i;
  }
  let end = string2.length;
  while (string2[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits2 = 0;
  let buffer2 = 0;
  let written = 0;
  for (let i = 0; i < end; ++i) {
    const value = codes[string2[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name3} character`);
    }
    buffer2 = buffer2 << bitsPerChar | value;
    bits2 += bitsPerChar;
    if (bits2 >= 8) {
      bits2 -= 8;
      out[written++] = 255 & buffer2 >> bits2;
    }
  }
  if (bits2 >= bitsPerChar || 255 & buffer2 << 8 - bits2) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
var encode = (data, alphabet2, bitsPerChar) => {
  const pad = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits2 = 0;
  let buffer2 = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer2 = buffer2 << 8 | data[i];
    bits2 += 8;
    while (bits2 > bitsPerChar) {
      bits2 -= bitsPerChar;
      out += alphabet2[mask & buffer2 >> bits2];
    }
  }
  if (bits2) {
    out += alphabet2[mask & buffer2 << bitsPerChar - bits2];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
var rfc4648 = ({ name: name3, prefix, bitsPerChar, alphabet: alphabet2 }) => {
  return from({
    prefix,
    name: name3,
    encode(input) {
      return encode(input, alphabet2, bitsPerChar);
    },
    decode(input) {
      return decode(input, alphabet2, bitsPerChar, name3);
    }
  });
};

// node_modules/@orbitdb/core/node_modules/multiformats/src/bases/base32.js
var base32 = rfc4648({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
var base32upper = rfc4648({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
var base32pad = rfc4648({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
var base32padupper = rfc4648({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
var base32hex = rfc4648({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
var base32hexupper = rfc4648({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
var base32hexpad = rfc4648({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
var base32hexpadupper = rfc4648({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
var base32z = rfc4648({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});

// node_modules/@orbitdb/core/node_modules/multiformats/src/bases/base58.js
var base58_exports = {};
__export(base58_exports, {
  base58btc: () => base58btc,
  base58flickr: () => base58flickr
});
init_node_globals();
var base58btc = baseX({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
var base58flickr = baseX({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});

// node_modules/@orbitdb/core/node_modules/multiformats/src/hashes/digest.js
init_node_globals();

// node_modules/@orbitdb/core/node_modules/multiformats/src/varint.js
init_node_globals();

// node_modules/@orbitdb/core/node_modules/multiformats/vendor/varint.js
init_node_globals();
var encode_1 = encode2;
var MSB = 128;
var REST = 127;
var MSBALL = ~REST;
var INT = Math.pow(2, 31);
function encode2(num, out, offset) {
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
  encode2.bytes = offset - oldOffset + 1;
  return out;
}
var decode2 = read;
var MSB$1 = 128;
var REST$1 = 127;
function read(buf2, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf2.length;
  do {
    if (counter >= l) {
      read.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf2[counter++];
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
  decode: decode2,
  encodingLength: length
};
var _brrp_varint = varint;
var varint_default = _brrp_varint;

// node_modules/@orbitdb/core/node_modules/multiformats/src/varint.js
var decode3 = (data, offset = 0) => {
  const code3 = varint_default.decode(data, offset);
  return [code3, varint_default.decode.bytes];
};
var encodeTo = (int, target, offset = 0) => {
  varint_default.encode(int, target, offset);
  return target;
};
var encodingLength = (int) => {
  return varint_default.encodingLength(int);
};

// node_modules/@orbitdb/core/node_modules/multiformats/src/hashes/digest.js
var create = (code3, digest2) => {
  const size = digest2.byteLength;
  const sizeOffset = encodingLength(code3);
  const digestOffset = sizeOffset + encodingLength(size);
  const bytes2 = new Uint8Array(digestOffset + size);
  encodeTo(code3, bytes2, 0);
  encodeTo(size, bytes2, sizeOffset);
  bytes2.set(digest2, digestOffset);
  return new Digest(code3, size, digest2, bytes2);
};
var decode4 = (multihash) => {
  const bytes2 = coerce(multihash);
  const [code3, sizeOffset] = decode3(bytes2);
  const [size, digestOffset] = decode3(bytes2.subarray(sizeOffset));
  const digest2 = bytes2.subarray(sizeOffset + digestOffset);
  if (digest2.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest(code3, size, digest2, bytes2);
};
var equals2 = (a, b) => {
  if (a === b) {
    return true;
  } else {
    const data = b;
    return a.code === data.code && a.size === data.size && data.bytes instanceof Uint8Array && equals(a.bytes, data.bytes);
  }
};
var Digest = class {
  constructor(code3, size, digest2, bytes2) {
    this.code = code3;
    this.size = size;
    this.digest = digest2;
    this.bytes = bytes2;
  }
};

// node_modules/@orbitdb/core/node_modules/multiformats/src/link/interface.js
init_node_globals();

// node_modules/@orbitdb/core/node_modules/multiformats/src/cid.js
var format = (link, base3) => {
  const { bytes: bytes2, version } = link;
  switch (version) {
    case 0:
      return toStringV0(bytes2, baseCache(link), base3 || base58btc.encoder);
    default:
      return toStringV1(bytes2, baseCache(link), base3 || base32.encoder);
  }
};
var cache = /* @__PURE__ */ new WeakMap();
var baseCache = (cid) => {
  const baseCache3 = cache.get(cid);
  if (baseCache3 == null) {
    const baseCache4 = /* @__PURE__ */ new Map();
    cache.set(cid, baseCache4);
    return baseCache4;
  }
  return baseCache3;
};
var CID = class {
  constructor(version, code3, multihash, bytes2) {
    this.code = code3;
    this.version = version;
    this.multihash = multihash;
    this.bytes = bytes2;
    this["/"] = bytes2;
  }
  get asCID() {
    return this;
  }
  get byteOffset() {
    return this.bytes.byteOffset;
  }
  get byteLength() {
    return this.bytes.byteLength;
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      case 1: {
        const { code: code3, multihash } = this;
        if (code3 !== DAG_PB_CODE) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return CID.createV0(multihash);
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code3, digest: digest2 } = this.multihash;
        const multihash = create(code3, digest2);
        return CID.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 1. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return CID.equals(this, other);
  }
  static equals(self2, other) {
    const unknown = other;
    return unknown && self2.code === unknown.code && self2.version === unknown.version && equals2(self2.multihash, unknown.multihash);
  }
  toString(base3) {
    return format(this, base3);
  }
  toJSON() {
    return { "/": format(this) };
  }
  link() {
    return this;
  }
  get [Symbol.toStringTag]() {
    return "CID";
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return `CID(${this.toString()})`;
  }
  static asCID(input) {
    if (input == null) {
      return null;
    }
    const value = input;
    if (value instanceof CID) {
      return value;
    } else if (value["/"] != null && value["/"] === value.bytes || value.asCID === value) {
      const { version, code: code3, multihash, bytes: bytes2 } = value;
      return new CID(version, code3, multihash, bytes2 || encodeCID(version, code3, multihash.bytes));
    } else if (value[cidSymbol] === true) {
      const { version, multihash, code: code3 } = value;
      const digest2 = decode4(multihash);
      return CID.create(version, code3, digest2);
    } else {
      return null;
    }
  }
  static create(version, code3, digest2) {
    if (typeof code3 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    if (!(digest2.bytes instanceof Uint8Array)) {
      throw new Error("Invalid digest");
    }
    switch (version) {
      case 0: {
        if (code3 !== DAG_PB_CODE) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
        } else {
          return new CID(version, code3, digest2, digest2.bytes);
        }
      }
      case 1: {
        const bytes2 = encodeCID(version, code3, digest2.bytes);
        return new CID(version, code3, digest2, bytes2);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  static createV0(digest2) {
    return CID.create(0, DAG_PB_CODE, digest2);
  }
  static createV1(code3, digest2) {
    return CID.create(1, code3, digest2);
  }
  static decode(bytes2) {
    const [cid, remainder] = CID.decodeFirst(bytes2);
    if (remainder.length) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  static decodeFirst(bytes2) {
    const specs = CID.inspectBytes(bytes2);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce(bytes2.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest2 = new Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? CID.createV0(digest2) : CID.createV1(specs.codec, digest2);
    return [cid, bytes2.subarray(specs.size)];
  }
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i, length3] = decode3(initialBytes.subarray(offset));
      offset += length3;
      return i;
    };
    let version = next();
    let codec5 = DAG_PB_CODE;
    if (version === 18) {
      version = 0;
      offset = 0;
    } else {
      codec5 = next();
    }
    if (version !== 0 && version !== 1) {
      throw new RangeError(`Invalid CID version ${version}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return { version, codec: codec5, multihashCode, digestSize, multihashSize, size };
  }
  static parse(source, base3) {
    const [prefix, bytes2] = parseCIDtoBytes(source, base3);
    const cid = CID.decode(bytes2);
    if (cid.version === 0 && source[0] !== "Q") {
      throw Error("Version 0 CID string must not include multibase prefix");
    }
    baseCache(cid).set(prefix, source);
    return cid;
  }
};
var parseCIDtoBytes = (source, base3) => {
  switch (source[0]) {
    case "Q": {
      const decoder = base3 || base58btc;
      return [
        base58btc.prefix,
        decoder.decode(`${base58btc.prefix}${source}`)
      ];
    }
    case base58btc.prefix: {
      const decoder = base3 || base58btc;
      return [base58btc.prefix, decoder.decode(source)];
    }
    case base32.prefix: {
      const decoder = base3 || base32;
      return [base32.prefix, decoder.decode(source)];
    }
    default: {
      if (base3 == null) {
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      }
      return [source[0], base3.decode(source)];
    }
  }
};
var toStringV0 = (bytes2, cache3, base3) => {
  const { prefix } = base3;
  if (prefix !== base58btc.prefix) {
    throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
  }
  const cid = cache3.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes2).slice(1);
    cache3.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
var toStringV1 = (bytes2, cache3, base3) => {
  const { prefix } = base3;
  const cid = cache3.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes2);
    cache3.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
var DAG_PB_CODE = 112;
var SHA_256_CODE = 18;
var encodeCID = (version, code3, multihash) => {
  const codeOffset = encodingLength(version);
  const hashOffset = codeOffset + encodingLength(code3);
  const bytes2 = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo(version, bytes2, 0);
  encodeTo(code3, bytes2, codeOffset);
  bytes2.set(multihash, hashOffset);
  return bytes2;
};
var cidSymbol = Symbol.for("@ipld/js-cid/CID");

// node_modules/@orbitdb/core/node_modules/multiformats/src/hashes/hasher.js
init_node_globals();
var from2 = ({ name: name3, code: code3, encode: encode10 }) => new Hasher(name3, code3, encode10);
var Hasher = class {
  constructor(name3, code3, encode10) {
    this.name = name3;
    this.code = code3;
    this.encode = encode10;
  }
  digest(input) {
    if (input instanceof Uint8Array) {
      const result = this.encode(input);
      return result instanceof Uint8Array ? create(this.code, result) : result.then((digest2) => create(this.code, digest2));
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};

// node_modules/@orbitdb/core/node_modules/multiformats/src/interface.js
init_node_globals();

// node_modules/@orbitdb/core/node_modules/multiformats/src/block.js
function readonly({ enumerable = true, configurable = false } = {}) {
  return { enumerable, configurable, writable: false };
}
function* linksWithin(path, value) {
  if (value != null && typeof value === "object") {
    if (Array.isArray(value)) {
      for (const [index, element] of value.entries()) {
        const elementPath = [...path, index];
        const cid = CID.asCID(element);
        if (cid) {
          yield [elementPath.join("/"), cid];
        } else if (typeof element === "object") {
          yield* links(element, elementPath);
        }
      }
    } else {
      const cid = CID.asCID(value);
      if (cid) {
        yield [path.join("/"), cid];
      } else {
        yield* links(value, path);
      }
    }
  }
}
function* links(source, base3) {
  if (source == null || source instanceof Uint8Array) {
    return;
  }
  const cid = CID.asCID(source);
  if (cid) {
    yield [base3.join("/"), cid];
  }
  for (const [key, value] of Object.entries(source)) {
    const path = [...base3, key];
    yield* linksWithin(path, value);
  }
}
function* treeWithin(path, value) {
  if (Array.isArray(value)) {
    for (const [index, element] of value.entries()) {
      const elementPath = [...path, index];
      yield elementPath.join("/");
      if (typeof element === "object" && !CID.asCID(element)) {
        yield* tree(element, elementPath);
      }
    }
  } else {
    yield* tree(value, path);
  }
}
function* tree(source, base3) {
  if (source == null || typeof source !== "object") {
    return;
  }
  for (const [key, value] of Object.entries(source)) {
    const path = [...base3, key];
    yield path.join("/");
    if (value != null && !(value instanceof Uint8Array) && typeof value === "object" && !CID.asCID(value)) {
      yield* treeWithin(path, value);
    }
  }
}
function get(source, path) {
  let node = source;
  for (const [index, key] of path.entries()) {
    node = node[key];
    if (node == null) {
      throw new Error(`Object has no property at ${path.slice(0, index + 1).map((part) => `[${JSON.stringify(part)}]`).join("")}`);
    }
    const cid = CID.asCID(node);
    if (cid) {
      return { value: cid, remaining: path.slice(index + 1).join("/") };
    }
  }
  return { value: node };
}
var Block = class {
  constructor({ cid, bytes: bytes2, value }) {
    if (!cid || !bytes2 || typeof value === "undefined") {
      throw new Error("Missing required argument");
    }
    this.cid = cid;
    this.bytes = bytes2;
    this.value = value;
    this.asBlock = this;
    Object.defineProperties(this, {
      cid: readonly(),
      bytes: readonly(),
      value: readonly(),
      asBlock: readonly()
    });
  }
  links() {
    return links(this.value, []);
  }
  tree() {
    return tree(this.value, []);
  }
  get(path = "/") {
    return get(this.value, path.split("/").filter(Boolean));
  }
};
async function encode3({ value, codec: codec5, hasher: hasher5 }) {
  if (typeof value === "undefined")
    throw new Error('Missing required argument "value"');
  if (!codec5 || !hasher5)
    throw new Error("Missing required argument: codec or hasher");
  const bytes2 = codec5.encode(value);
  const hash2 = await hasher5.digest(bytes2);
  const cid = CID.create(1, codec5.code, hash2);
  return new Block({ value, bytes: bytes2, cid });
}
async function decode5({ bytes: bytes2, codec: codec5, hasher: hasher5 }) {
  if (!bytes2)
    throw new Error('Missing required argument "bytes"');
  if (!codec5 || !hasher5)
    throw new Error("Missing required argument: codec or hasher");
  const value = codec5.decode(bytes2);
  const hash2 = await hasher5.digest(bytes2);
  const cid = CID.create(1, codec5.code, hash2);
  return new Block({ value, bytes: bytes2, cid });
}

// node_modules/@ipld/dag-cbor/src/index.js
var src_exports = {};
__export(src_exports, {
  code: () => code,
  decode: () => decode11,
  encode: () => encode7,
  name: () => name
});
init_node_globals();

// node_modules/cborg/cborg.js
init_node_globals();

// node_modules/cborg/lib/encode.js
init_node_globals();

// node_modules/cborg/lib/is.js
init_node_globals();
var typeofs = [
  "string",
  "number",
  "bigint",
  "symbol"
];
var objectTypeNames = [
  "Function",
  "Generator",
  "AsyncGenerator",
  "GeneratorFunction",
  "AsyncGeneratorFunction",
  "AsyncFunction",
  "Observable",
  "Array",
  "Buffer",
  "Object",
  "RegExp",
  "Date",
  "Error",
  "Map",
  "Set",
  "WeakMap",
  "WeakSet",
  "ArrayBuffer",
  "SharedArrayBuffer",
  "DataView",
  "Promise",
  "URL",
  "HTMLElement",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Uint16Array",
  "Int32Array",
  "Uint32Array",
  "Float32Array",
  "Float64Array",
  "BigInt64Array",
  "BigUint64Array"
];
function is(value) {
  if (value === null) {
    return "null";
  }
  if (value === void 0) {
    return "undefined";
  }
  if (value === true || value === false) {
    return "boolean";
  }
  const typeOf = typeof value;
  if (typeofs.includes(typeOf)) {
    return typeOf;
  }
  if (typeOf === "function") {
    return "Function";
  }
  if (Array.isArray(value)) {
    return "Array";
  }
  if (isBuffer(value)) {
    return "Buffer";
  }
  const objectType = getObjectType(value);
  if (objectType) {
    return objectType;
  }
  return "Object";
}
function isBuffer(value) {
  return value && value.constructor && value.constructor.isBuffer && value.constructor.isBuffer.call(null, value);
}
function getObjectType(value) {
  const objectTypeName = Object.prototype.toString.call(value).slice(8, -1);
  if (objectTypeNames.includes(objectTypeName)) {
    return objectTypeName;
  }
  return void 0;
}

// node_modules/cborg/lib/token.js
init_node_globals();
var Type = class {
  constructor(major, name3, terminal) {
    this.major = major;
    this.majorEncoded = major << 5;
    this.name = name3;
    this.terminal = terminal;
  }
  toString() {
    return `Type[${this.major}].${this.name}`;
  }
  compare(typ) {
    return this.major < typ.major ? -1 : this.major > typ.major ? 1 : 0;
  }
};
Type.uint = new Type(0, "uint", true);
Type.negint = new Type(1, "negint", true);
Type.bytes = new Type(2, "bytes", true);
Type.string = new Type(3, "string", true);
Type.array = new Type(4, "array", false);
Type.map = new Type(5, "map", false);
Type.tag = new Type(6, "tag", false);
Type.float = new Type(7, "float", true);
Type.false = new Type(7, "false", true);
Type.true = new Type(7, "true", true);
Type.null = new Type(7, "null", true);
Type.undefined = new Type(7, "undefined", true);
Type.break = new Type(7, "break", true);
var Token = class {
  constructor(type7, value, encodedLength) {
    this.type = type7;
    this.value = value;
    this.encodedLength = encodedLength;
    this.encodedBytes = void 0;
    this.byteValue = void 0;
  }
  toString() {
    return `Token[${this.type}].${this.value}`;
  }
};

// node_modules/cborg/lib/bl.js
init_node_globals();

// node_modules/cborg/lib/byte-utils.js
init_node_globals();
var useBuffer = globalThis.process && !globalThis.process.browser && globalThis.Buffer && typeof globalThis.Buffer.isBuffer === "function";
var textDecoder = new TextDecoder();
var textEncoder = new TextEncoder();
function isBuffer2(buf2) {
  return useBuffer && globalThis.Buffer.isBuffer(buf2);
}
function asU8A(buf2) {
  if (!(buf2 instanceof Uint8Array)) {
    return Uint8Array.from(buf2);
  }
  return isBuffer2(buf2) ? new Uint8Array(buf2.buffer, buf2.byteOffset, buf2.byteLength) : buf2;
}
var toString2 = useBuffer ? (bytes2, start, end) => {
  return end - start > 64 ? globalThis.Buffer.from(bytes2.subarray(start, end)).toString("utf8") : utf8Slice(bytes2, start, end);
} : (bytes2, start, end) => {
  return end - start > 64 ? textDecoder.decode(bytes2.subarray(start, end)) : utf8Slice(bytes2, start, end);
};
var fromString2 = useBuffer ? (string2) => {
  return string2.length > 64 ? globalThis.Buffer.from(string2) : utf8ToBytes(string2);
} : (string2) => {
  return string2.length > 64 ? textEncoder.encode(string2) : utf8ToBytes(string2);
};
var fromArray = (arr) => {
  return Uint8Array.from(arr);
};
var slice = useBuffer ? (bytes2, start, end) => {
  if (isBuffer2(bytes2)) {
    return new Uint8Array(bytes2.subarray(start, end));
  }
  return bytes2.slice(start, end);
} : (bytes2, start, end) => {
  return bytes2.slice(start, end);
};
var concat = useBuffer ? (chunks, length3) => {
  chunks = chunks.map((c) => c instanceof Uint8Array ? c : globalThis.Buffer.from(c));
  return asU8A(globalThis.Buffer.concat(chunks, length3));
} : (chunks, length3) => {
  const out = new Uint8Array(length3);
  let off = 0;
  for (let b of chunks) {
    if (off + b.length > out.length) {
      b = b.subarray(0, out.length - off);
    }
    out.set(b, off);
    off += b.length;
  }
  return out;
};
var alloc = useBuffer ? (size) => {
  return globalThis.Buffer.allocUnsafe(size);
} : (size) => {
  return new Uint8Array(size);
};
function compare(b1, b2) {
  if (isBuffer2(b1) && isBuffer2(b2)) {
    return b1.compare(b2);
  }
  for (let i = 0; i < b1.length; i++) {
    if (b1[i] === b2[i]) {
      continue;
    }
    return b1[i] < b2[i] ? -1 : 1;
  }
  return 0;
}
function utf8ToBytes(str) {
  const out = [];
  let p = 0;
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);
    if (c < 128) {
      out[p++] = c;
    } else if (c < 2048) {
      out[p++] = c >> 6 | 192;
      out[p++] = c & 63 | 128;
    } else if ((c & 64512) === 55296 && i + 1 < str.length && (str.charCodeAt(i + 1) & 64512) === 56320) {
      c = 65536 + ((c & 1023) << 10) + (str.charCodeAt(++i) & 1023);
      out[p++] = c >> 18 | 240;
      out[p++] = c >> 12 & 63 | 128;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    } else {
      out[p++] = c >> 12 | 224;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    }
  }
  return out;
}
function utf8Slice(buf2, offset, end) {
  const res = [];
  while (offset < end) {
    const firstByte = buf2[offset];
    let codePoint = null;
    let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
    if (offset + bytesPerSequence <= end) {
      let secondByte, thirdByte, fourthByte, tempCodePoint;
      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 128) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = buf2[offset + 1];
          if ((secondByte & 192) === 128) {
            tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
            if (tempCodePoint > 127) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = buf2[offset + 1];
          thirdByte = buf2[offset + 2];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
            tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
            if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = buf2[offset + 1];
          thirdByte = buf2[offset + 2];
          fourthByte = buf2[offset + 3];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
            tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
            if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
              codePoint = tempCodePoint;
            }
          }
      }
    }
    if (codePoint === null) {
      codePoint = 65533;
      bytesPerSequence = 1;
    } else if (codePoint > 65535) {
      codePoint -= 65536;
      res.push(codePoint >>> 10 & 1023 | 55296);
      codePoint = 56320 | codePoint & 1023;
    }
    res.push(codePoint);
    offset += bytesPerSequence;
  }
  return decodeCodePointsArray(res);
}
var MAX_ARGUMENTS_LENGTH = 4096;
function decodeCodePointsArray(codePoints) {
  const len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints);
  }
  let res = "";
  let i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
  }
  return res;
}

// node_modules/cborg/lib/bl.js
var defaultChunkSize = 256;
var Bl = class {
  constructor(chunkSize = defaultChunkSize) {
    this.chunkSize = chunkSize;
    this.cursor = 0;
    this.maxCursor = -1;
    this.chunks = [];
    this._initReuseChunk = null;
  }
  reset() {
    this.cursor = 0;
    this.maxCursor = -1;
    if (this.chunks.length) {
      this.chunks = [];
    }
    if (this._initReuseChunk !== null) {
      this.chunks.push(this._initReuseChunk);
      this.maxCursor = this._initReuseChunk.length - 1;
    }
  }
  push(bytes2) {
    let topChunk = this.chunks[this.chunks.length - 1];
    const newMax = this.cursor + bytes2.length;
    if (newMax <= this.maxCursor + 1) {
      const chunkPos = topChunk.length - (this.maxCursor - this.cursor) - 1;
      topChunk.set(bytes2, chunkPos);
    } else {
      if (topChunk) {
        const chunkPos = topChunk.length - (this.maxCursor - this.cursor) - 1;
        if (chunkPos < topChunk.length) {
          this.chunks[this.chunks.length - 1] = topChunk.subarray(0, chunkPos);
          this.maxCursor = this.cursor - 1;
        }
      }
      if (bytes2.length < 64 && bytes2.length < this.chunkSize) {
        topChunk = alloc(this.chunkSize);
        this.chunks.push(topChunk);
        this.maxCursor += topChunk.length;
        if (this._initReuseChunk === null) {
          this._initReuseChunk = topChunk;
        }
        topChunk.set(bytes2, 0);
      } else {
        this.chunks.push(bytes2);
        this.maxCursor += bytes2.length;
      }
    }
    this.cursor += bytes2.length;
  }
  toBytes(reset = false) {
    let byts;
    if (this.chunks.length === 1) {
      const chunk = this.chunks[0];
      if (reset && this.cursor > chunk.length / 2) {
        byts = this.cursor === chunk.length ? chunk : chunk.subarray(0, this.cursor);
        this._initReuseChunk = null;
        this.chunks = [];
      } else {
        byts = slice(chunk, 0, this.cursor);
      }
    } else {
      byts = concat(this.chunks, this.cursor);
    }
    if (reset) {
      this.reset();
    }
    return byts;
  }
};

// node_modules/cborg/lib/common.js
init_node_globals();
var decodeErrPrefix = "CBOR decode error:";
var encodeErrPrefix = "CBOR encode error:";
var uintMinorPrefixBytes = [];
uintMinorPrefixBytes[23] = 1;
uintMinorPrefixBytes[24] = 2;
uintMinorPrefixBytes[25] = 3;
uintMinorPrefixBytes[26] = 5;
uintMinorPrefixBytes[27] = 9;
function assertEnoughData(data, pos, need) {
  if (data.length - pos < need) {
    throw new Error(`${decodeErrPrefix} not enough data for type`);
  }
}

// node_modules/cborg/lib/jump.js
init_node_globals();

// node_modules/cborg/lib/0uint.js
init_node_globals();
var uintBoundaries = [24, 256, 65536, 4294967296, BigInt("18446744073709551616")];
function readUint8(data, offset, options) {
  assertEnoughData(data, offset, 1);
  const value = data[offset];
  if (options.strict === true && value < uintBoundaries[0]) {
    throw new Error(`${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`);
  }
  return value;
}
function readUint16(data, offset, options) {
  assertEnoughData(data, offset, 2);
  const value = data[offset] << 8 | data[offset + 1];
  if (options.strict === true && value < uintBoundaries[1]) {
    throw new Error(`${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`);
  }
  return value;
}
function readUint32(data, offset, options) {
  assertEnoughData(data, offset, 4);
  const value = data[offset] * 16777216 + (data[offset + 1] << 16) + (data[offset + 2] << 8) + data[offset + 3];
  if (options.strict === true && value < uintBoundaries[2]) {
    throw new Error(`${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`);
  }
  return value;
}
function readUint64(data, offset, options) {
  assertEnoughData(data, offset, 8);
  const hi = data[offset] * 16777216 + (data[offset + 1] << 16) + (data[offset + 2] << 8) + data[offset + 3];
  const lo = data[offset + 4] * 16777216 + (data[offset + 5] << 16) + (data[offset + 6] << 8) + data[offset + 7];
  const value = (BigInt(hi) << BigInt(32)) + BigInt(lo);
  if (options.strict === true && value < uintBoundaries[3]) {
    throw new Error(`${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`);
  }
  if (value <= Number.MAX_SAFE_INTEGER) {
    return Number(value);
  }
  if (options.allowBigInt === true) {
    return value;
  }
  throw new Error(`${decodeErrPrefix} integers outside of the safe integer range are not supported`);
}
function decodeUint8(data, pos, _minor, options) {
  return new Token(Type.uint, readUint8(data, pos + 1, options), 2);
}
function decodeUint16(data, pos, _minor, options) {
  return new Token(Type.uint, readUint16(data, pos + 1, options), 3);
}
function decodeUint32(data, pos, _minor, options) {
  return new Token(Type.uint, readUint32(data, pos + 1, options), 5);
}
function decodeUint64(data, pos, _minor, options) {
  return new Token(Type.uint, readUint64(data, pos + 1, options), 9);
}
function encodeUint(buf2, token) {
  return encodeUintValue(buf2, 0, token.value);
}
function encodeUintValue(buf2, major, uint) {
  if (uint < uintBoundaries[0]) {
    const nuint = Number(uint);
    buf2.push([major | nuint]);
  } else if (uint < uintBoundaries[1]) {
    const nuint = Number(uint);
    buf2.push([major | 24, nuint]);
  } else if (uint < uintBoundaries[2]) {
    const nuint = Number(uint);
    buf2.push([major | 25, nuint >>> 8, nuint & 255]);
  } else if (uint < uintBoundaries[3]) {
    const nuint = Number(uint);
    buf2.push([major | 26, nuint >>> 24 & 255, nuint >>> 16 & 255, nuint >>> 8 & 255, nuint & 255]);
  } else {
    const buint = BigInt(uint);
    if (buint < uintBoundaries[4]) {
      const set = [major | 27, 0, 0, 0, 0, 0, 0, 0];
      let lo = Number(buint & BigInt(4294967295));
      let hi = Number(buint >> BigInt(32) & BigInt(4294967295));
      set[8] = lo & 255;
      lo = lo >> 8;
      set[7] = lo & 255;
      lo = lo >> 8;
      set[6] = lo & 255;
      lo = lo >> 8;
      set[5] = lo & 255;
      set[4] = hi & 255;
      hi = hi >> 8;
      set[3] = hi & 255;
      hi = hi >> 8;
      set[2] = hi & 255;
      hi = hi >> 8;
      set[1] = hi & 255;
      buf2.push(set);
    } else {
      throw new Error(`${decodeErrPrefix} encountered BigInt larger than allowable range`);
    }
  }
}
encodeUint.encodedSize = function encodedSize(token) {
  return encodeUintValue.encodedSize(token.value);
};
encodeUintValue.encodedSize = function encodedSize2(uint) {
  if (uint < uintBoundaries[0]) {
    return 1;
  }
  if (uint < uintBoundaries[1]) {
    return 2;
  }
  if (uint < uintBoundaries[2]) {
    return 3;
  }
  if (uint < uintBoundaries[3]) {
    return 5;
  }
  return 9;
};
encodeUint.compareTokens = function compareTokens(tok1, tok2) {
  return tok1.value < tok2.value ? -1 : tok1.value > tok2.value ? 1 : 0;
};

// node_modules/cborg/lib/1negint.js
init_node_globals();
function decodeNegint8(data, pos, _minor, options) {
  return new Token(Type.negint, -1 - readUint8(data, pos + 1, options), 2);
}
function decodeNegint16(data, pos, _minor, options) {
  return new Token(Type.negint, -1 - readUint16(data, pos + 1, options), 3);
}
function decodeNegint32(data, pos, _minor, options) {
  return new Token(Type.negint, -1 - readUint32(data, pos + 1, options), 5);
}
var neg1b = BigInt(-1);
var pos1b = BigInt(1);
function decodeNegint64(data, pos, _minor, options) {
  const int = readUint64(data, pos + 1, options);
  if (typeof int !== "bigint") {
    const value = -1 - int;
    if (value >= Number.MIN_SAFE_INTEGER) {
      return new Token(Type.negint, value, 9);
    }
  }
  if (options.allowBigInt !== true) {
    throw new Error(`${decodeErrPrefix} integers outside of the safe integer range are not supported`);
  }
  return new Token(Type.negint, neg1b - BigInt(int), 9);
}
function encodeNegint(buf2, token) {
  const negint = token.value;
  const unsigned = typeof negint === "bigint" ? negint * neg1b - pos1b : negint * -1 - 1;
  encodeUintValue(buf2, token.type.majorEncoded, unsigned);
}
encodeNegint.encodedSize = function encodedSize3(token) {
  const negint = token.value;
  const unsigned = typeof negint === "bigint" ? negint * neg1b - pos1b : negint * -1 - 1;
  if (unsigned < uintBoundaries[0]) {
    return 1;
  }
  if (unsigned < uintBoundaries[1]) {
    return 2;
  }
  if (unsigned < uintBoundaries[2]) {
    return 3;
  }
  if (unsigned < uintBoundaries[3]) {
    return 5;
  }
  return 9;
};
encodeNegint.compareTokens = function compareTokens2(tok1, tok2) {
  return tok1.value < tok2.value ? 1 : tok1.value > tok2.value ? -1 : 0;
};

// node_modules/cborg/lib/2bytes.js
init_node_globals();
function toToken(data, pos, prefix, length3) {
  assertEnoughData(data, pos, prefix + length3);
  const buf2 = slice(data, pos + prefix, pos + prefix + length3);
  return new Token(Type.bytes, buf2, prefix + length3);
}
function decodeBytesCompact(data, pos, minor, _options) {
  return toToken(data, pos, 1, minor);
}
function decodeBytes8(data, pos, _minor, options) {
  return toToken(data, pos, 2, readUint8(data, pos + 1, options));
}
function decodeBytes16(data, pos, _minor, options) {
  return toToken(data, pos, 3, readUint16(data, pos + 1, options));
}
function decodeBytes32(data, pos, _minor, options) {
  return toToken(data, pos, 5, readUint32(data, pos + 1, options));
}
function decodeBytes64(data, pos, _minor, options) {
  const l = readUint64(data, pos + 1, options);
  if (typeof l === "bigint") {
    throw new Error(`${decodeErrPrefix} 64-bit integer bytes lengths not supported`);
  }
  return toToken(data, pos, 9, l);
}
function tokenBytes(token) {
  if (token.encodedBytes === void 0) {
    token.encodedBytes = token.type === Type.string ? fromString2(token.value) : token.value;
  }
  return token.encodedBytes;
}
function encodeBytes(buf2, token) {
  const bytes2 = tokenBytes(token);
  encodeUintValue(buf2, token.type.majorEncoded, bytes2.length);
  buf2.push(bytes2);
}
encodeBytes.encodedSize = function encodedSize4(token) {
  const bytes2 = tokenBytes(token);
  return encodeUintValue.encodedSize(bytes2.length) + bytes2.length;
};
encodeBytes.compareTokens = function compareTokens3(tok1, tok2) {
  return compareBytes(tokenBytes(tok1), tokenBytes(tok2));
};
function compareBytes(b1, b2) {
  return b1.length < b2.length ? -1 : b1.length > b2.length ? 1 : compare(b1, b2);
}

// node_modules/cborg/lib/3string.js
init_node_globals();
function toToken2(data, pos, prefix, length3, options) {
  const totLength = prefix + length3;
  assertEnoughData(data, pos, totLength);
  const tok = new Token(Type.string, toString2(data, pos + prefix, pos + totLength), totLength);
  if (options.retainStringBytes === true) {
    tok.byteValue = slice(data, pos + prefix, pos + totLength);
  }
  return tok;
}
function decodeStringCompact(data, pos, minor, options) {
  return toToken2(data, pos, 1, minor, options);
}
function decodeString8(data, pos, _minor, options) {
  return toToken2(data, pos, 2, readUint8(data, pos + 1, options), options);
}
function decodeString16(data, pos, _minor, options) {
  return toToken2(data, pos, 3, readUint16(data, pos + 1, options), options);
}
function decodeString32(data, pos, _minor, options) {
  return toToken2(data, pos, 5, readUint32(data, pos + 1, options), options);
}
function decodeString64(data, pos, _minor, options) {
  const l = readUint64(data, pos + 1, options);
  if (typeof l === "bigint") {
    throw new Error(`${decodeErrPrefix} 64-bit integer string lengths not supported`);
  }
  return toToken2(data, pos, 9, l, options);
}
var encodeString = encodeBytes;

// node_modules/cborg/lib/4array.js
init_node_globals();
function toToken3(_data, _pos, prefix, length3) {
  return new Token(Type.array, length3, prefix);
}
function decodeArrayCompact(data, pos, minor, _options) {
  return toToken3(data, pos, 1, minor);
}
function decodeArray8(data, pos, _minor, options) {
  return toToken3(data, pos, 2, readUint8(data, pos + 1, options));
}
function decodeArray16(data, pos, _minor, options) {
  return toToken3(data, pos, 3, readUint16(data, pos + 1, options));
}
function decodeArray32(data, pos, _minor, options) {
  return toToken3(data, pos, 5, readUint32(data, pos + 1, options));
}
function decodeArray64(data, pos, _minor, options) {
  const l = readUint64(data, pos + 1, options);
  if (typeof l === "bigint") {
    throw new Error(`${decodeErrPrefix} 64-bit integer array lengths not supported`);
  }
  return toToken3(data, pos, 9, l);
}
function decodeArrayIndefinite(data, pos, _minor, options) {
  if (options.allowIndefinite === false) {
    throw new Error(`${decodeErrPrefix} indefinite length items not allowed`);
  }
  return toToken3(data, pos, 1, Infinity);
}
function encodeArray(buf2, token) {
  encodeUintValue(buf2, Type.array.majorEncoded, token.value);
}
encodeArray.compareTokens = encodeUint.compareTokens;
encodeArray.encodedSize = function encodedSize5(token) {
  return encodeUintValue.encodedSize(token.value);
};

// node_modules/cborg/lib/5map.js
init_node_globals();
function toToken4(_data, _pos, prefix, length3) {
  return new Token(Type.map, length3, prefix);
}
function decodeMapCompact(data, pos, minor, _options) {
  return toToken4(data, pos, 1, minor);
}
function decodeMap8(data, pos, _minor, options) {
  return toToken4(data, pos, 2, readUint8(data, pos + 1, options));
}
function decodeMap16(data, pos, _minor, options) {
  return toToken4(data, pos, 3, readUint16(data, pos + 1, options));
}
function decodeMap32(data, pos, _minor, options) {
  return toToken4(data, pos, 5, readUint32(data, pos + 1, options));
}
function decodeMap64(data, pos, _minor, options) {
  const l = readUint64(data, pos + 1, options);
  if (typeof l === "bigint") {
    throw new Error(`${decodeErrPrefix} 64-bit integer map lengths not supported`);
  }
  return toToken4(data, pos, 9, l);
}
function decodeMapIndefinite(data, pos, _minor, options) {
  if (options.allowIndefinite === false) {
    throw new Error(`${decodeErrPrefix} indefinite length items not allowed`);
  }
  return toToken4(data, pos, 1, Infinity);
}
function encodeMap(buf2, token) {
  encodeUintValue(buf2, Type.map.majorEncoded, token.value);
}
encodeMap.compareTokens = encodeUint.compareTokens;
encodeMap.encodedSize = function encodedSize6(token) {
  return encodeUintValue.encodedSize(token.value);
};

// node_modules/cborg/lib/6tag.js
init_node_globals();
function decodeTagCompact(_data, _pos, minor, _options) {
  return new Token(Type.tag, minor, 1);
}
function decodeTag8(data, pos, _minor, options) {
  return new Token(Type.tag, readUint8(data, pos + 1, options), 2);
}
function decodeTag16(data, pos, _minor, options) {
  return new Token(Type.tag, readUint16(data, pos + 1, options), 3);
}
function decodeTag32(data, pos, _minor, options) {
  return new Token(Type.tag, readUint32(data, pos + 1, options), 5);
}
function decodeTag64(data, pos, _minor, options) {
  return new Token(Type.tag, readUint64(data, pos + 1, options), 9);
}
function encodeTag(buf2, token) {
  encodeUintValue(buf2, Type.tag.majorEncoded, token.value);
}
encodeTag.compareTokens = encodeUint.compareTokens;
encodeTag.encodedSize = function encodedSize7(token) {
  return encodeUintValue.encodedSize(token.value);
};

// node_modules/cborg/lib/7float.js
init_node_globals();
var MINOR_FALSE = 20;
var MINOR_TRUE = 21;
var MINOR_NULL = 22;
var MINOR_UNDEFINED = 23;
function decodeUndefined(_data, _pos, _minor, options) {
  if (options.allowUndefined === false) {
    throw new Error(`${decodeErrPrefix} undefined values are not supported`);
  } else if (options.coerceUndefinedToNull === true) {
    return new Token(Type.null, null, 1);
  }
  return new Token(Type.undefined, void 0, 1);
}
function decodeBreak(_data, _pos, _minor, options) {
  if (options.allowIndefinite === false) {
    throw new Error(`${decodeErrPrefix} indefinite length items not allowed`);
  }
  return new Token(Type.break, void 0, 1);
}
function createToken(value, bytes2, options) {
  if (options) {
    if (options.allowNaN === false && Number.isNaN(value)) {
      throw new Error(`${decodeErrPrefix} NaN values are not supported`);
    }
    if (options.allowInfinity === false && (value === Infinity || value === -Infinity)) {
      throw new Error(`${decodeErrPrefix} Infinity values are not supported`);
    }
  }
  return new Token(Type.float, value, bytes2);
}
function decodeFloat16(data, pos, _minor, options) {
  return createToken(readFloat16(data, pos + 1), 3, options);
}
function decodeFloat32(data, pos, _minor, options) {
  return createToken(readFloat32(data, pos + 1), 5, options);
}
function decodeFloat64(data, pos, _minor, options) {
  return createToken(readFloat64(data, pos + 1), 9, options);
}
function encodeFloat(buf2, token, options) {
  const float = token.value;
  if (float === false) {
    buf2.push([Type.float.majorEncoded | MINOR_FALSE]);
  } else if (float === true) {
    buf2.push([Type.float.majorEncoded | MINOR_TRUE]);
  } else if (float === null) {
    buf2.push([Type.float.majorEncoded | MINOR_NULL]);
  } else if (float === void 0) {
    buf2.push([Type.float.majorEncoded | MINOR_UNDEFINED]);
  } else {
    let decoded;
    let success = false;
    if (!options || options.float64 !== true) {
      encodeFloat16(float);
      decoded = readFloat16(ui8a, 1);
      if (float === decoded || Number.isNaN(float)) {
        ui8a[0] = 249;
        buf2.push(ui8a.slice(0, 3));
        success = true;
      } else {
        encodeFloat32(float);
        decoded = readFloat32(ui8a, 1);
        if (float === decoded) {
          ui8a[0] = 250;
          buf2.push(ui8a.slice(0, 5));
          success = true;
        }
      }
    }
    if (!success) {
      encodeFloat64(float);
      decoded = readFloat64(ui8a, 1);
      ui8a[0] = 251;
      buf2.push(ui8a.slice(0, 9));
    }
  }
}
encodeFloat.encodedSize = function encodedSize8(token, options) {
  const float = token.value;
  if (float === false || float === true || float === null || float === void 0) {
    return 1;
  }
  if (!options || options.float64 !== true) {
    encodeFloat16(float);
    let decoded = readFloat16(ui8a, 1);
    if (float === decoded || Number.isNaN(float)) {
      return 3;
    }
    encodeFloat32(float);
    decoded = readFloat32(ui8a, 1);
    if (float === decoded) {
      return 5;
    }
  }
  return 9;
};
var buffer = new ArrayBuffer(9);
var dataView = new DataView(buffer, 1);
var ui8a = new Uint8Array(buffer, 0);
function encodeFloat16(inp) {
  if (inp === Infinity) {
    dataView.setUint16(0, 31744, false);
  } else if (inp === -Infinity) {
    dataView.setUint16(0, 64512, false);
  } else if (Number.isNaN(inp)) {
    dataView.setUint16(0, 32256, false);
  } else {
    dataView.setFloat32(0, inp);
    const valu32 = dataView.getUint32(0);
    const exponent = (valu32 & 2139095040) >> 23;
    const mantissa = valu32 & 8388607;
    if (exponent === 255) {
      dataView.setUint16(0, 31744, false);
    } else if (exponent === 0) {
      dataView.setUint16(0, (inp & 2147483648) >> 16 | mantissa >> 13, false);
    } else {
      const logicalExponent = exponent - 127;
      if (logicalExponent < -24) {
        dataView.setUint16(0, 0);
      } else if (logicalExponent < -14) {
        dataView.setUint16(0, (valu32 & 2147483648) >> 16 | 1 << 24 + logicalExponent, false);
      } else {
        dataView.setUint16(0, (valu32 & 2147483648) >> 16 | logicalExponent + 15 << 10 | mantissa >> 13, false);
      }
    }
  }
}
function readFloat16(ui8a2, pos) {
  if (ui8a2.length - pos < 2) {
    throw new Error(`${decodeErrPrefix} not enough data for float16`);
  }
  const half = (ui8a2[pos] << 8) + ui8a2[pos + 1];
  if (half === 31744) {
    return Infinity;
  }
  if (half === 64512) {
    return -Infinity;
  }
  if (half === 32256) {
    return NaN;
  }
  const exp = half >> 10 & 31;
  const mant = half & 1023;
  let val;
  if (exp === 0) {
    val = mant * 2 ** -24;
  } else if (exp !== 31) {
    val = (mant + 1024) * 2 ** (exp - 25);
  } else {
    val = mant === 0 ? Infinity : NaN;
  }
  return half & 32768 ? -val : val;
}
function encodeFloat32(inp) {
  dataView.setFloat32(0, inp, false);
}
function readFloat32(ui8a2, pos) {
  if (ui8a2.length - pos < 4) {
    throw new Error(`${decodeErrPrefix} not enough data for float32`);
  }
  const offset = (ui8a2.byteOffset || 0) + pos;
  return new DataView(ui8a2.buffer, offset, 4).getFloat32(0, false);
}
function encodeFloat64(inp) {
  dataView.setFloat64(0, inp, false);
}
function readFloat64(ui8a2, pos) {
  if (ui8a2.length - pos < 8) {
    throw new Error(`${decodeErrPrefix} not enough data for float64`);
  }
  const offset = (ui8a2.byteOffset || 0) + pos;
  return new DataView(ui8a2.buffer, offset, 8).getFloat64(0, false);
}
encodeFloat.compareTokens = encodeUint.compareTokens;

// node_modules/cborg/lib/jump.js
function invalidMinor(data, pos, minor) {
  throw new Error(`${decodeErrPrefix} encountered invalid minor (${minor}) for major ${data[pos] >>> 5}`);
}
function errorer(msg) {
  return () => {
    throw new Error(`${decodeErrPrefix} ${msg}`);
  };
}
var jump = [];
for (let i = 0; i <= 23; i++) {
  jump[i] = invalidMinor;
}
jump[24] = decodeUint8;
jump[25] = decodeUint16;
jump[26] = decodeUint32;
jump[27] = decodeUint64;
jump[28] = invalidMinor;
jump[29] = invalidMinor;
jump[30] = invalidMinor;
jump[31] = invalidMinor;
for (let i = 32; i <= 55; i++) {
  jump[i] = invalidMinor;
}
jump[56] = decodeNegint8;
jump[57] = decodeNegint16;
jump[58] = decodeNegint32;
jump[59] = decodeNegint64;
jump[60] = invalidMinor;
jump[61] = invalidMinor;
jump[62] = invalidMinor;
jump[63] = invalidMinor;
for (let i = 64; i <= 87; i++) {
  jump[i] = decodeBytesCompact;
}
jump[88] = decodeBytes8;
jump[89] = decodeBytes16;
jump[90] = decodeBytes32;
jump[91] = decodeBytes64;
jump[92] = invalidMinor;
jump[93] = invalidMinor;
jump[94] = invalidMinor;
jump[95] = errorer("indefinite length bytes/strings are not supported");
for (let i = 96; i <= 119; i++) {
  jump[i] = decodeStringCompact;
}
jump[120] = decodeString8;
jump[121] = decodeString16;
jump[122] = decodeString32;
jump[123] = decodeString64;
jump[124] = invalidMinor;
jump[125] = invalidMinor;
jump[126] = invalidMinor;
jump[127] = errorer("indefinite length bytes/strings are not supported");
for (let i = 128; i <= 151; i++) {
  jump[i] = decodeArrayCompact;
}
jump[152] = decodeArray8;
jump[153] = decodeArray16;
jump[154] = decodeArray32;
jump[155] = decodeArray64;
jump[156] = invalidMinor;
jump[157] = invalidMinor;
jump[158] = invalidMinor;
jump[159] = decodeArrayIndefinite;
for (let i = 160; i <= 183; i++) {
  jump[i] = decodeMapCompact;
}
jump[184] = decodeMap8;
jump[185] = decodeMap16;
jump[186] = decodeMap32;
jump[187] = decodeMap64;
jump[188] = invalidMinor;
jump[189] = invalidMinor;
jump[190] = invalidMinor;
jump[191] = decodeMapIndefinite;
for (let i = 192; i <= 215; i++) {
  jump[i] = decodeTagCompact;
}
jump[216] = decodeTag8;
jump[217] = decodeTag16;
jump[218] = decodeTag32;
jump[219] = decodeTag64;
jump[220] = invalidMinor;
jump[221] = invalidMinor;
jump[222] = invalidMinor;
jump[223] = invalidMinor;
for (let i = 224; i <= 243; i++) {
  jump[i] = errorer("simple values are not supported");
}
jump[244] = invalidMinor;
jump[245] = invalidMinor;
jump[246] = invalidMinor;
jump[247] = decodeUndefined;
jump[248] = errorer("simple values are not supported");
jump[249] = decodeFloat16;
jump[250] = decodeFloat32;
jump[251] = decodeFloat64;
jump[252] = invalidMinor;
jump[253] = invalidMinor;
jump[254] = invalidMinor;
jump[255] = decodeBreak;
var quick = [];
for (let i = 0; i < 24; i++) {
  quick[i] = new Token(Type.uint, i, 1);
}
for (let i = -1; i >= -24; i--) {
  quick[31 - i] = new Token(Type.negint, i, 1);
}
quick[64] = new Token(Type.bytes, new Uint8Array(0), 1);
quick[96] = new Token(Type.string, "", 1);
quick[128] = new Token(Type.array, 0, 1);
quick[160] = new Token(Type.map, 0, 1);
quick[244] = new Token(Type.false, false, 1);
quick[245] = new Token(Type.true, true, 1);
quick[246] = new Token(Type.null, null, 1);
function quickEncodeToken(token) {
  switch (token.type) {
    case Type.false:
      return fromArray([244]);
    case Type.true:
      return fromArray([245]);
    case Type.null:
      return fromArray([246]);
    case Type.bytes:
      if (!token.value.length) {
        return fromArray([64]);
      }
      return;
    case Type.string:
      if (token.value === "") {
        return fromArray([96]);
      }
      return;
    case Type.array:
      if (token.value === 0) {
        return fromArray([128]);
      }
      return;
    case Type.map:
      if (token.value === 0) {
        return fromArray([160]);
      }
      return;
    case Type.uint:
      if (token.value < 24) {
        return fromArray([Number(token.value)]);
      }
      return;
    case Type.negint:
      if (token.value >= -24) {
        return fromArray([31 - Number(token.value)]);
      }
  }
}

// node_modules/cborg/lib/encode.js
var defaultEncodeOptions = {
  float64: false,
  mapSorter,
  quickEncodeToken
};
function makeCborEncoders() {
  const encoders = [];
  encoders[Type.uint.major] = encodeUint;
  encoders[Type.negint.major] = encodeNegint;
  encoders[Type.bytes.major] = encodeBytes;
  encoders[Type.string.major] = encodeString;
  encoders[Type.array.major] = encodeArray;
  encoders[Type.map.major] = encodeMap;
  encoders[Type.tag.major] = encodeTag;
  encoders[Type.float.major] = encodeFloat;
  return encoders;
}
var cborEncoders = makeCborEncoders();
var buf = new Bl();
var Ref = class {
  constructor(obj, parent) {
    this.obj = obj;
    this.parent = parent;
  }
  includes(obj) {
    let p = this;
    do {
      if (p.obj === obj) {
        return true;
      }
    } while (p = p.parent);
    return false;
  }
  static createCheck(stack, obj) {
    if (stack && stack.includes(obj)) {
      throw new Error(`${encodeErrPrefix} object contains circular references`);
    }
    return new Ref(obj, stack);
  }
};
var simpleTokens = {
  null: new Token(Type.null, null),
  undefined: new Token(Type.undefined, void 0),
  true: new Token(Type.true, true),
  false: new Token(Type.false, false),
  emptyArray: new Token(Type.array, 0),
  emptyMap: new Token(Type.map, 0)
};
var typeEncoders = {
  number(obj, _typ, _options, _refStack) {
    if (!Number.isInteger(obj) || !Number.isSafeInteger(obj)) {
      return new Token(Type.float, obj);
    } else if (obj >= 0) {
      return new Token(Type.uint, obj);
    } else {
      return new Token(Type.negint, obj);
    }
  },
  bigint(obj, _typ, _options, _refStack) {
    if (obj >= BigInt(0)) {
      return new Token(Type.uint, obj);
    } else {
      return new Token(Type.negint, obj);
    }
  },
  Uint8Array(obj, _typ, _options, _refStack) {
    return new Token(Type.bytes, obj);
  },
  string(obj, _typ, _options, _refStack) {
    return new Token(Type.string, obj);
  },
  boolean(obj, _typ, _options, _refStack) {
    return obj ? simpleTokens.true : simpleTokens.false;
  },
  null(_obj, _typ, _options, _refStack) {
    return simpleTokens.null;
  },
  undefined(_obj, _typ, _options, _refStack) {
    return simpleTokens.undefined;
  },
  ArrayBuffer(obj, _typ, _options, _refStack) {
    return new Token(Type.bytes, new Uint8Array(obj));
  },
  DataView(obj, _typ, _options, _refStack) {
    return new Token(Type.bytes, new Uint8Array(obj.buffer, obj.byteOffset, obj.byteLength));
  },
  Array(obj, _typ, options, refStack) {
    if (!obj.length) {
      if (options.addBreakTokens === true) {
        return [simpleTokens.emptyArray, new Token(Type.break)];
      }
      return simpleTokens.emptyArray;
    }
    refStack = Ref.createCheck(refStack, obj);
    const entries = [];
    let i = 0;
    for (const e of obj) {
      entries[i++] = objectToTokens(e, options, refStack);
    }
    if (options.addBreakTokens) {
      return [new Token(Type.array, obj.length), entries, new Token(Type.break)];
    }
    return [new Token(Type.array, obj.length), entries];
  },
  Object(obj, typ, options, refStack) {
    const isMap = typ !== "Object";
    const keys = isMap ? obj.keys() : Object.keys(obj);
    const length3 = isMap ? obj.size : keys.length;
    if (!length3) {
      if (options.addBreakTokens === true) {
        return [simpleTokens.emptyMap, new Token(Type.break)];
      }
      return simpleTokens.emptyMap;
    }
    refStack = Ref.createCheck(refStack, obj);
    const entries = [];
    let i = 0;
    for (const key of keys) {
      entries[i++] = [
        objectToTokens(key, options, refStack),
        objectToTokens(isMap ? obj.get(key) : obj[key], options, refStack)
      ];
    }
    sortMapEntries(entries, options);
    if (options.addBreakTokens) {
      return [new Token(Type.map, length3), entries, new Token(Type.break)];
    }
    return [new Token(Type.map, length3), entries];
  }
};
typeEncoders.Map = typeEncoders.Object;
typeEncoders.Buffer = typeEncoders.Uint8Array;
for (const typ of "Uint8Clamped Uint16 Uint32 Int8 Int16 Int32 BigUint64 BigInt64 Float32 Float64".split(" ")) {
  typeEncoders[`${typ}Array`] = typeEncoders.DataView;
}
function objectToTokens(obj, options = {}, refStack) {
  const typ = is(obj);
  const customTypeEncoder = options && options.typeEncoders && options.typeEncoders[typ] || typeEncoders[typ];
  if (typeof customTypeEncoder === "function") {
    const tokens = customTypeEncoder(obj, typ, options, refStack);
    if (tokens != null) {
      return tokens;
    }
  }
  const typeEncoder = typeEncoders[typ];
  if (!typeEncoder) {
    throw new Error(`${encodeErrPrefix} unsupported type: ${typ}`);
  }
  return typeEncoder(obj, typ, options, refStack);
}
function sortMapEntries(entries, options) {
  if (options.mapSorter) {
    entries.sort(options.mapSorter);
  }
}
function mapSorter(e1, e2) {
  const keyToken1 = Array.isArray(e1[0]) ? e1[0][0] : e1[0];
  const keyToken2 = Array.isArray(e2[0]) ? e2[0][0] : e2[0];
  if (keyToken1.type !== keyToken2.type) {
    return keyToken1.type.compare(keyToken2.type);
  }
  const major = keyToken1.type.major;
  const tcmp = cborEncoders[major].compareTokens(keyToken1, keyToken2);
  if (tcmp === 0) {
    console.warn("WARNING: complex key types used, CBOR key sorting guarantees are gone");
  }
  return tcmp;
}
function tokensToEncoded(buf2, tokens, encoders, options) {
  if (Array.isArray(tokens)) {
    for (const token of tokens) {
      tokensToEncoded(buf2, token, encoders, options);
    }
  } else {
    encoders[tokens.type.major](buf2, tokens, options);
  }
}
function encodeCustom(data, encoders, options) {
  const tokens = objectToTokens(data, options);
  if (!Array.isArray(tokens) && options.quickEncodeToken) {
    const quickBytes = options.quickEncodeToken(tokens);
    if (quickBytes) {
      return quickBytes;
    }
    const encoder = encoders[tokens.type.major];
    if (encoder.encodedSize) {
      const size = encoder.encodedSize(tokens, options);
      const buf2 = new Bl(size);
      encoder(buf2, tokens, options);
      if (buf2.chunks.length !== 1) {
        throw new Error(`Unexpected error: pre-calculated length for ${tokens} was wrong`);
      }
      return asU8A(buf2.chunks[0]);
    }
  }
  buf.reset();
  tokensToEncoded(buf, tokens, encoders, options);
  return buf.toBytes(true);
}
function encode4(data, options) {
  options = Object.assign({}, defaultEncodeOptions, options);
  return encodeCustom(data, cborEncoders, options);
}

// node_modules/cborg/lib/decode.js
init_node_globals();
var defaultDecodeOptions = {
  strict: false,
  allowIndefinite: true,
  allowUndefined: true,
  allowBigInt: true
};
var Tokeniser = class {
  constructor(data, options = {}) {
    this._pos = 0;
    this.data = data;
    this.options = options;
  }
  pos() {
    return this._pos;
  }
  done() {
    return this._pos >= this.data.length;
  }
  next() {
    const byt = this.data[this._pos];
    let token = quick[byt];
    if (token === void 0) {
      const decoder = jump[byt];
      if (!decoder) {
        throw new Error(`${decodeErrPrefix} no decoder for major type ${byt >>> 5} (byte 0x${byt.toString(16).padStart(2, "0")})`);
      }
      const minor = byt & 31;
      token = decoder(this.data, this._pos, minor, this.options);
    }
    this._pos += token.encodedLength;
    return token;
  }
};
var DONE = Symbol.for("DONE");
var BREAK = Symbol.for("BREAK");
function tokenToArray(token, tokeniser, options) {
  const arr = [];
  for (let i = 0; i < token.value; i++) {
    const value = tokensToObject(tokeniser, options);
    if (value === BREAK) {
      if (token.value === Infinity) {
        break;
      }
      throw new Error(`${decodeErrPrefix} got unexpected break to lengthed array`);
    }
    if (value === DONE) {
      throw new Error(`${decodeErrPrefix} found array but not enough entries (got ${i}, expected ${token.value})`);
    }
    arr[i] = value;
  }
  return arr;
}
function tokenToMap(token, tokeniser, options) {
  const useMaps = options.useMaps === true;
  const obj = useMaps ? void 0 : {};
  const m = useMaps ? /* @__PURE__ */ new Map() : void 0;
  for (let i = 0; i < token.value; i++) {
    const key = tokensToObject(tokeniser, options);
    if (key === BREAK) {
      if (token.value === Infinity) {
        break;
      }
      throw new Error(`${decodeErrPrefix} got unexpected break to lengthed map`);
    }
    if (key === DONE) {
      throw new Error(`${decodeErrPrefix} found map but not enough entries (got ${i} [no key], expected ${token.value})`);
    }
    if (useMaps !== true && typeof key !== "string") {
      throw new Error(`${decodeErrPrefix} non-string keys not supported (got ${typeof key})`);
    }
    if (options.rejectDuplicateMapKeys === true) {
      if (useMaps && m.has(key) || !useMaps && key in obj) {
        throw new Error(`${decodeErrPrefix} found repeat map key "${key}"`);
      }
    }
    const value = tokensToObject(tokeniser, options);
    if (value === DONE) {
      throw new Error(`${decodeErrPrefix} found map but not enough entries (got ${i} [no value], expected ${token.value})`);
    }
    if (useMaps) {
      m.set(key, value);
    } else {
      obj[key] = value;
    }
  }
  return useMaps ? m : obj;
}
function tokensToObject(tokeniser, options) {
  if (tokeniser.done()) {
    return DONE;
  }
  const token = tokeniser.next();
  if (token.type === Type.break) {
    return BREAK;
  }
  if (token.type.terminal) {
    return token.value;
  }
  if (token.type === Type.array) {
    return tokenToArray(token, tokeniser, options);
  }
  if (token.type === Type.map) {
    return tokenToMap(token, tokeniser, options);
  }
  if (token.type === Type.tag) {
    if (options.tags && typeof options.tags[token.value] === "function") {
      const tagged = tokensToObject(tokeniser, options);
      return options.tags[token.value](tagged);
    }
    throw new Error(`${decodeErrPrefix} tag not supported (${token.value})`);
  }
  throw new Error("unsupported");
}
function decodeFirst(data, options) {
  if (!(data instanceof Uint8Array)) {
    throw new Error(`${decodeErrPrefix} data to decode must be a Uint8Array`);
  }
  options = Object.assign({}, defaultDecodeOptions, options);
  const tokeniser = options.tokenizer || new Tokeniser(data, options);
  const decoded = tokensToObject(tokeniser, options);
  if (decoded === DONE) {
    throw new Error(`${decodeErrPrefix} did not find any content to decode`);
  }
  if (decoded === BREAK) {
    throw new Error(`${decodeErrPrefix} got unexpected break`);
  }
  return [decoded, data.subarray(tokeniser.pos())];
}
function decode6(data, options) {
  const [decoded, remainder] = decodeFirst(data, options);
  if (remainder.length > 0) {
    throw new Error(`${decodeErrPrefix} too many terminals, data makes no sense`);
  }
  return decoded;
}

// node_modules/@ipld/dag-cbor/node_modules/multiformats/src/cid.js
init_node_globals();

// node_modules/@ipld/dag-cbor/node_modules/multiformats/src/bases/base32.js
init_node_globals();

// node_modules/@ipld/dag-cbor/node_modules/multiformats/src/bases/base.js
init_node_globals();

// node_modules/@ipld/dag-cbor/node_modules/multiformats/vendor/base-x.js
init_node_globals();
function base2(ALPHABET, name3) {
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
  function encode10(source) {
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
  function decode14(string2) {
    var buffer2 = decodeUnsafe(string2);
    if (buffer2) {
      return buffer2;
    }
    throw new Error(`Non-${name3} character`);
  }
  return {
    encode: encode10,
    decodeUnsafe,
    decode: decode14
  };
}
var src2 = base2;
var _brrp__multiformats_scope_baseX2 = src2;
var base_x_default2 = _brrp__multiformats_scope_baseX2;

// node_modules/@ipld/dag-cbor/node_modules/multiformats/src/bytes.js
init_node_globals();
var empty2 = new Uint8Array(0);
var equals3 = (aa, bb) => {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii = 0; ii < aa.byteLength; ii++) {
    if (aa[ii] !== bb[ii]) {
      return false;
    }
  }
  return true;
};
var coerce2 = (o) => {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
};

// node_modules/@ipld/dag-cbor/node_modules/multiformats/src/bases/interface.js
init_node_globals();

// node_modules/@ipld/dag-cbor/node_modules/multiformats/src/bases/base.js
var Encoder2 = class {
  constructor(name3, prefix, baseEncode) {
    this.name = name3;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes2) {
    if (bytes2 instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes2)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
var Decoder2 = class {
  constructor(name3, prefix, baseDecode) {
    this.name = name3;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder) {
    return or2(this, decoder);
  }
};
var ComposedDecoder2 = class {
  constructor(decoders) {
    this.decoders = decoders;
  }
  or(decoder) {
    return or2(this, decoder);
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
};
var or2 = (left, right) => new ComposedDecoder2({
  ...left.decoders || { [left.prefix]: left },
  ...right.decoders || { [right.prefix]: right }
});
var Codec2 = class {
  constructor(name3, prefix, baseEncode, baseDecode) {
    this.name = name3;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder2(name3, prefix, baseEncode);
    this.decoder = new Decoder2(name3, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
};
var from3 = ({ name: name3, prefix, encode: encode10, decode: decode14 }) => new Codec2(name3, prefix, encode10, decode14);
var baseX2 = ({ prefix, name: name3, alphabet: alphabet2 }) => {
  const { encode: encode10, decode: decode14 } = base_x_default2(alphabet2, name3);
  return from3({
    prefix,
    name: name3,
    encode: encode10,
    decode: (text) => coerce2(decode14(text))
  });
};
var decode7 = (string2, alphabet2, bitsPerChar, name3) => {
  const codes = {};
  for (let i = 0; i < alphabet2.length; ++i) {
    codes[alphabet2[i]] = i;
  }
  let end = string2.length;
  while (string2[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits2 = 0;
  let buffer2 = 0;
  let written = 0;
  for (let i = 0; i < end; ++i) {
    const value = codes[string2[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name3} character`);
    }
    buffer2 = buffer2 << bitsPerChar | value;
    bits2 += bitsPerChar;
    if (bits2 >= 8) {
      bits2 -= 8;
      out[written++] = 255 & buffer2 >> bits2;
    }
  }
  if (bits2 >= bitsPerChar || 255 & buffer2 << 8 - bits2) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
var encode5 = (data, alphabet2, bitsPerChar) => {
  const pad = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits2 = 0;
  let buffer2 = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer2 = buffer2 << 8 | data[i];
    bits2 += 8;
    while (bits2 > bitsPerChar) {
      bits2 -= bitsPerChar;
      out += alphabet2[mask & buffer2 >> bits2];
    }
  }
  if (bits2) {
    out += alphabet2[mask & buffer2 << bitsPerChar - bits2];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
var rfc46482 = ({ name: name3, prefix, bitsPerChar, alphabet: alphabet2 }) => {
  return from3({
    prefix,
    name: name3,
    encode(input) {
      return encode5(input, alphabet2, bitsPerChar);
    },
    decode(input) {
      return decode7(input, alphabet2, bitsPerChar, name3);
    }
  });
};

// node_modules/@ipld/dag-cbor/node_modules/multiformats/src/bases/base32.js
var base322 = rfc46482({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
var base32upper2 = rfc46482({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
var base32pad2 = rfc46482({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
var base32padupper2 = rfc46482({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
var base32hex2 = rfc46482({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
var base32hexupper2 = rfc46482({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
var base32hexpad2 = rfc46482({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
var base32hexpadupper2 = rfc46482({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
var base32z2 = rfc46482({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});

// node_modules/@ipld/dag-cbor/node_modules/multiformats/src/bases/base58.js
init_node_globals();
var base58btc2 = baseX2({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
var base58flickr2 = baseX2({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});

// node_modules/@ipld/dag-cbor/node_modules/multiformats/src/hashes/digest.js
init_node_globals();

// node_modules/@ipld/dag-cbor/node_modules/multiformats/src/varint.js
init_node_globals();

// node_modules/@ipld/dag-cbor/node_modules/multiformats/vendor/varint.js
init_node_globals();
var encode_12 = encode6;
var MSB2 = 128;
var REST2 = 127;
var MSBALL2 = ~REST2;
var INT2 = Math.pow(2, 31);
function encode6(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT2) {
    out[offset++] = num & 255 | MSB2;
    num /= 128;
  }
  while (num & MSBALL2) {
    out[offset++] = num & 255 | MSB2;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode6.bytes = offset - oldOffset + 1;
  return out;
}
var decode8 = read2;
var MSB$12 = 128;
var REST$12 = 127;
function read2(buf2, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf2.length;
  do {
    if (counter >= l) {
      read2.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf2[counter++];
    res += shift < 28 ? (b & REST$12) << shift : (b & REST$12) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB$12);
  read2.bytes = counter - offset;
  return res;
}
var N12 = Math.pow(2, 7);
var N22 = Math.pow(2, 14);
var N32 = Math.pow(2, 21);
var N42 = Math.pow(2, 28);
var N52 = Math.pow(2, 35);
var N62 = Math.pow(2, 42);
var N72 = Math.pow(2, 49);
var N82 = Math.pow(2, 56);
var N92 = Math.pow(2, 63);
var length2 = function(value) {
  return value < N12 ? 1 : value < N22 ? 2 : value < N32 ? 3 : value < N42 ? 4 : value < N52 ? 5 : value < N62 ? 6 : value < N72 ? 7 : value < N82 ? 8 : value < N92 ? 9 : 10;
};
var varint2 = {
  encode: encode_12,
  decode: decode8,
  encodingLength: length2
};
var _brrp_varint2 = varint2;
var varint_default2 = _brrp_varint2;

// node_modules/@ipld/dag-cbor/node_modules/multiformats/src/varint.js
var decode9 = (data, offset = 0) => {
  const code3 = varint_default2.decode(data, offset);
  return [code3, varint_default2.decode.bytes];
};
var encodeTo2 = (int, target, offset = 0) => {
  varint_default2.encode(int, target, offset);
  return target;
};
var encodingLength2 = (int) => {
  return varint_default2.encodingLength(int);
};

// node_modules/@ipld/dag-cbor/node_modules/multiformats/src/hashes/digest.js
var create2 = (code3, digest2) => {
  const size = digest2.byteLength;
  const sizeOffset = encodingLength2(code3);
  const digestOffset = sizeOffset + encodingLength2(size);
  const bytes2 = new Uint8Array(digestOffset + size);
  encodeTo2(code3, bytes2, 0);
  encodeTo2(size, bytes2, sizeOffset);
  bytes2.set(digest2, digestOffset);
  return new Digest2(code3, size, digest2, bytes2);
};
var decode10 = (multihash) => {
  const bytes2 = coerce2(multihash);
  const [code3, sizeOffset] = decode9(bytes2);
  const [size, digestOffset] = decode9(bytes2.subarray(sizeOffset));
  const digest2 = bytes2.subarray(sizeOffset + digestOffset);
  if (digest2.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest2(code3, size, digest2, bytes2);
};
var equals4 = (a, b) => {
  if (a === b) {
    return true;
  } else {
    const data = b;
    return a.code === data.code && a.size === data.size && data.bytes instanceof Uint8Array && equals3(a.bytes, data.bytes);
  }
};
var Digest2 = class {
  constructor(code3, size, digest2, bytes2) {
    this.code = code3;
    this.size = size;
    this.digest = digest2;
    this.bytes = bytes2;
  }
};

// node_modules/@ipld/dag-cbor/node_modules/multiformats/src/link/interface.js
init_node_globals();

// node_modules/@ipld/dag-cbor/node_modules/multiformats/src/cid.js
var format2 = (link, base3) => {
  const { bytes: bytes2, version } = link;
  switch (version) {
    case 0:
      return toStringV02(bytes2, baseCache2(link), base3 || base58btc2.encoder);
    default:
      return toStringV12(bytes2, baseCache2(link), base3 || base322.encoder);
  }
};
var cache2 = /* @__PURE__ */ new WeakMap();
var baseCache2 = (cid) => {
  const baseCache3 = cache2.get(cid);
  if (baseCache3 == null) {
    const baseCache4 = /* @__PURE__ */ new Map();
    cache2.set(cid, baseCache4);
    return baseCache4;
  }
  return baseCache3;
};
var CID2 = class {
  constructor(version, code3, multihash, bytes2) {
    this.code = code3;
    this.version = version;
    this.multihash = multihash;
    this.bytes = bytes2;
    this["/"] = bytes2;
  }
  get asCID() {
    return this;
  }
  get byteOffset() {
    return this.bytes.byteOffset;
  }
  get byteLength() {
    return this.bytes.byteLength;
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      case 1: {
        const { code: code3, multihash } = this;
        if (code3 !== DAG_PB_CODE2) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE2) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return CID2.createV0(multihash);
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code3, digest: digest2 } = this.multihash;
        const multihash = create2(code3, digest2);
        return CID2.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 1. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return CID2.equals(this, other);
  }
  static equals(self2, other) {
    const unknown = other;
    return unknown && self2.code === unknown.code && self2.version === unknown.version && equals4(self2.multihash, unknown.multihash);
  }
  toString(base3) {
    return format2(this, base3);
  }
  toJSON() {
    return { "/": format2(this) };
  }
  link() {
    return this;
  }
  get [Symbol.toStringTag]() {
    return "CID";
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return `CID(${this.toString()})`;
  }
  static asCID(input) {
    if (input == null) {
      return null;
    }
    const value = input;
    if (value instanceof CID2) {
      return value;
    } else if (value["/"] != null && value["/"] === value.bytes || value.asCID === value) {
      const { version, code: code3, multihash, bytes: bytes2 } = value;
      return new CID2(version, code3, multihash, bytes2 || encodeCID2(version, code3, multihash.bytes));
    } else if (value[cidSymbol2] === true) {
      const { version, multihash, code: code3 } = value;
      const digest2 = decode10(multihash);
      return CID2.create(version, code3, digest2);
    } else {
      return null;
    }
  }
  static create(version, code3, digest2) {
    if (typeof code3 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    if (!(digest2.bytes instanceof Uint8Array)) {
      throw new Error("Invalid digest");
    }
    switch (version) {
      case 0: {
        if (code3 !== DAG_PB_CODE2) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE2}) block encoding`);
        } else {
          return new CID2(version, code3, digest2, digest2.bytes);
        }
      }
      case 1: {
        const bytes2 = encodeCID2(version, code3, digest2.bytes);
        return new CID2(version, code3, digest2, bytes2);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  static createV0(digest2) {
    return CID2.create(0, DAG_PB_CODE2, digest2);
  }
  static createV1(code3, digest2) {
    return CID2.create(1, code3, digest2);
  }
  static decode(bytes2) {
    const [cid, remainder] = CID2.decodeFirst(bytes2);
    if (remainder.length) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  static decodeFirst(bytes2) {
    const specs = CID2.inspectBytes(bytes2);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce2(bytes2.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest2 = new Digest2(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? CID2.createV0(digest2) : CID2.createV1(specs.codec, digest2);
    return [cid, bytes2.subarray(specs.size)];
  }
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i, length3] = decode9(initialBytes.subarray(offset));
      offset += length3;
      return i;
    };
    let version = next();
    let codec5 = DAG_PB_CODE2;
    if (version === 18) {
      version = 0;
      offset = 0;
    } else {
      codec5 = next();
    }
    if (version !== 0 && version !== 1) {
      throw new RangeError(`Invalid CID version ${version}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return { version, codec: codec5, multihashCode, digestSize, multihashSize, size };
  }
  static parse(source, base3) {
    const [prefix, bytes2] = parseCIDtoBytes2(source, base3);
    const cid = CID2.decode(bytes2);
    if (cid.version === 0 && source[0] !== "Q") {
      throw Error("Version 0 CID string must not include multibase prefix");
    }
    baseCache2(cid).set(prefix, source);
    return cid;
  }
};
var parseCIDtoBytes2 = (source, base3) => {
  switch (source[0]) {
    case "Q": {
      const decoder = base3 || base58btc2;
      return [
        base58btc2.prefix,
        decoder.decode(`${base58btc2.prefix}${source}`)
      ];
    }
    case base58btc2.prefix: {
      const decoder = base3 || base58btc2;
      return [base58btc2.prefix, decoder.decode(source)];
    }
    case base322.prefix: {
      const decoder = base3 || base322;
      return [base322.prefix, decoder.decode(source)];
    }
    default: {
      if (base3 == null) {
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      }
      return [source[0], base3.decode(source)];
    }
  }
};
var toStringV02 = (bytes2, cache3, base3) => {
  const { prefix } = base3;
  if (prefix !== base58btc2.prefix) {
    throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
  }
  const cid = cache3.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes2).slice(1);
    cache3.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
var toStringV12 = (bytes2, cache3, base3) => {
  const { prefix } = base3;
  const cid = cache3.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes2);
    cache3.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
var DAG_PB_CODE2 = 112;
var SHA_256_CODE2 = 18;
var encodeCID2 = (version, code3, multihash) => {
  const codeOffset = encodingLength2(version);
  const hashOffset = codeOffset + encodingLength2(code3);
  const bytes2 = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo2(version, bytes2, 0);
  encodeTo2(code3, bytes2, codeOffset);
  bytes2.set(multihash, hashOffset);
  return bytes2;
};
var cidSymbol2 = Symbol.for("@ipld/js-cid/CID");

// node_modules/@ipld/dag-cbor/src/index.js
var CID_CBOR_TAG = 42;
function cidEncoder(obj) {
  if (obj.asCID !== obj && obj["/"] !== obj.bytes) {
    return null;
  }
  const cid = CID2.asCID(obj);
  if (!cid) {
    return null;
  }
  const bytes2 = new Uint8Array(cid.bytes.byteLength + 1);
  bytes2.set(cid.bytes, 1);
  return [
    new Token(Type.tag, CID_CBOR_TAG),
    new Token(Type.bytes, bytes2)
  ];
}
function undefinedEncoder() {
  throw new Error("`undefined` is not supported by the IPLD Data Model and cannot be encoded");
}
function numberEncoder(num) {
  if (Number.isNaN(num)) {
    throw new Error("`NaN` is not supported by the IPLD Data Model and cannot be encoded");
  }
  if (num === Infinity || num === -Infinity) {
    throw new Error("`Infinity` and `-Infinity` is not supported by the IPLD Data Model and cannot be encoded");
  }
  return null;
}
var encodeOptions = {
  float64: true,
  typeEncoders: {
    Object: cidEncoder,
    undefined: undefinedEncoder,
    number: numberEncoder
  }
};
function cidDecoder(bytes2) {
  if (bytes2[0] !== 0) {
    throw new Error("Invalid CID for CBOR tag 42; expected leading 0x00");
  }
  return CID2.decode(bytes2.subarray(1));
}
var decodeOptions = {
  allowIndefinite: false,
  coerceUndefinedToNull: true,
  allowNaN: false,
  allowInfinity: false,
  allowBigInt: true,
  strict: true,
  useMaps: false,
  rejectDuplicateMapKeys: true,
  tags: []
};
decodeOptions.tags[CID_CBOR_TAG] = cidDecoder;
var name = "dag-cbor";
var code = 113;
var encode7 = (node) => encode4(node, encodeOptions);
var decode11 = (data) => decode6(data, decodeOptions);

// node_modules/@orbitdb/core/node_modules/multiformats/src/hashes/sha2-browser.js
var sha2_browser_exports = {};
__export(sha2_browser_exports, {
  sha256: () => sha256,
  sha512: () => sha512
});
init_node_globals();
var sha = (name3) => async (data) => new Uint8Array(await crypto.subtle.digest(name3, data));
var sha256 = from2({
  name: "sha2-256",
  code: 18,
  encode: sha("SHA-256")
});
var sha512 = from2({
  name: "sha2-512",
  code: 19,
  encode: sha("SHA-512")
});

// node_modules/@orbitdb/core/src/oplog/entry.js
var codec = src_exports;
var hasher = sha256;
var hashStringEncoding = base58btc;
var create3 = async (identity3, id, payload, clock = null, next = [], refs = []) => {
  if (identity3 == null)
    throw new Error("Identity is required, cannot create entry");
  if (id == null)
    throw new Error("Entry requires an id");
  if (payload == null)
    throw new Error("Entry requires a payload");
  if (next == null || !Array.isArray(next))
    throw new Error("'next' argument is not an array");
  clock = clock || Clock(identity3.publicKey);
  const entry = {
    id,
    payload,
    next,
    refs,
    clock,
    v: 2
  };
  const { bytes: bytes2 } = await encode3({ value: entry, codec, hasher });
  const signature = await identity3.sign(identity3, bytes2);
  entry.key = identity3.publicKey;
  entry.identity = identity3.hash;
  entry.sig = signature;
  return _encodeEntry(entry);
};
var verify = async (identities, entry) => {
  if (!identities)
    throw new Error("Identities is required, cannot verify entry");
  if (!isEntry(entry))
    throw new Error("Invalid Log entry");
  if (!entry.key)
    throw new Error("Entry doesn't have a key");
  if (!entry.sig)
    throw new Error("Entry doesn't have a signature");
  const value = {
    id: entry.id,
    payload: entry.payload,
    next: entry.next,
    refs: entry.refs,
    clock: entry.clock,
    v: entry.v
  };
  const { bytes: bytes2 } = await encode3({ value, codec, hasher });
  return identities.verify(entry.sig, entry.key, bytes2);
};
var isEntry = (obj) => {
  return obj && obj.id !== void 0 && obj.next !== void 0 && obj.payload !== void 0 && obj.v !== void 0 && obj.clock !== void 0 && obj.refs !== void 0;
};
var isEqual = (a, b) => {
  return a && b && a.hash === b.hash;
};
var decode12 = async (bytes2) => {
  const { value } = await decode5({ bytes: bytes2, codec, hasher });
  return _encodeEntry(value);
};
var _encodeEntry = async (entry) => {
  const { cid, bytes: bytes2 } = await encode3({ value: entry, codec, hasher });
  const hash2 = cid.toString(hashStringEncoding);
  const clock = Clock(entry.clock.id, entry.clock.time);
  return {
    ...entry,
    clock,
    hash: hash2,
    bytes: bytes2
  };
};
var entry_default = {
  create: create3,
  verify,
  decode: decode12,
  isEntry,
  isEqual
};

// node_modules/@orbitdb/core/src/oplog/heads.js
init_node_globals();

// node_modules/@orbitdb/core/src/storage/memory.js
init_node_globals();
var MemoryStorage = async () => {
  let memory = {};
  const put = async (hash2, data) => {
    memory[hash2] = data;
  };
  const del = async (hash2) => {
    delete memory[hash2];
  };
  const get2 = async (hash2) => {
    return memory[hash2];
  };
  const iterator = async function* () {
    for await (const [key, value] of Object.entries(memory)) {
      yield [key, value];
    }
  };
  const merge2 = async (other) => {
    if (other) {
      for await (const [key, value] of other.iterator()) {
        put(key, value);
      }
    }
  };
  const clear = async () => {
    memory = {};
  };
  const close = async () => {
  };
  return {
    put,
    del,
    get: get2,
    iterator,
    merge: merge2,
    clear,
    close
  };
};
var memory_default = MemoryStorage;

// node_modules/@orbitdb/core/src/oplog/heads.js
var DefaultStorage = memory_default;
var Heads = async ({ storage, heads }) => {
  storage = storage || await DefaultStorage();
  const put = async (heads2) => {
    heads2 = findHeads(heads2);
    for (const head of heads2) {
      await storage.put(head.hash, head.bytes);
    }
  };
  const set = async (heads2) => {
    await storage.clear();
    await put(heads2);
  };
  const add2 = async (head) => {
    const currentHeads = await all();
    if (currentHeads.find((e) => entry_default.isEqual(e, head))) {
      return;
    }
    const newHeads = findHeads([...currentHeads, head]);
    await set(newHeads);
    return newHeads;
  };
  const iterator = async function* () {
    const it = storage.iterator();
    for await (const [, bytes2] of it) {
      const head = await entry_default.decode(bytes2);
      yield head;
    }
  };
  const all = async () => {
    const values = [];
    for await (const head of iterator()) {
      values.push(head);
    }
    return values;
  };
  const clear = async () => {
    await storage.clear();
  };
  const close = async () => {
    await storage.close();
  };
  await put(heads || []);
  return {
    put,
    set,
    add: add2,
    iterator,
    all,
    clear,
    close
  };
};
var findHeads = (entries) => {
  entries = new Set(entries);
  const items = {};
  for (const entry of entries) {
    for (const next of entry.next) {
      items[next] = entry.hash;
    }
  }
  const res = [];
  for (const entry of entries) {
    if (!items[entry.hash]) {
      res.push(entry);
    }
  }
  return res;
};
var heads_default = Heads;

// node_modules/@orbitdb/core/src/oplog/conflict-resolution.js
init_node_globals();
function LastWriteWins(a, b) {
  const First = (a2, b2) => a2;
  const sortById = (a2, b2) => SortByClockId(a2, b2, First);
  const sortByEntryClocks = (a2, b2) => SortByClocks(a2, b2, sortById);
  return sortByEntryClocks(a, b);
}
function SortByClocks(a, b, resolveConflict) {
  const diff = compareClocks(a.clock, b.clock);
  return diff === 0 ? resolveConflict(a, b) : diff;
}
function SortByClockId(a, b, resolveConflict) {
  return a.clock.id === b.clock.id ? resolveConflict(a, b) : a.clock.id < b.clock.id ? -1 : 1;
}
function NoZeroes(func) {
  const msg = `Your log's tiebreaker function, ${func.name}, has returned zero and therefore cannot be`;
  const comparator = (a, b) => {
    const result = func(a, b);
    if (result === 0) {
      throw Error(msg);
    }
    return result;
  };
  return comparator;
}
var conflict_resolution_default = {
  SortByClocks,
  SortByClockId,
  LastWriteWins,
  NoZeroes
};

// node_modules/@orbitdb/core/src/oplog/log.js
var { LastWriteWins: LastWriteWins2, NoZeroes: NoZeroes2 } = conflict_resolution_default;
var randomId = () => new Date().getTime().toString();
var maxClockTimeReducer = (res, acc) => Math.max(res, acc.clock.time);
var DefaultStorage2 = memory_default;
var DefaultAccessController = async () => {
  return {
    canAppend: async (entry) => true
  };
};
var Log = async (identity3, { logId, logHeads, access, entryStorage, headsStorage, indexStorage, sortFn } = {}) => {
  if (identity3 == null) {
    throw new Error("Identity is required");
  }
  if (logHeads != null && !Array.isArray(logHeads)) {
    throw new Error("'logHeads' argument must be an array");
  }
  const id = logId || randomId();
  access = access || await DefaultAccessController();
  const _entries = entryStorage || await DefaultStorage2();
  const _index = indexStorage || await DefaultStorage2();
  headsStorage = headsStorage || await DefaultStorage2();
  const _heads = await heads_default({ storage: headsStorage, heads: logHeads });
  sortFn = NoZeroes2(sortFn || LastWriteWins2);
  const clock = async () => {
    const maxTime = Math.max(0, (await heads()).reduce(maxClockTimeReducer, 0));
    return Clock(identity3.publicKey, maxTime);
  };
  const heads = async () => {
    const res = await _heads.all();
    return res.sort(sortFn).reverse();
  };
  const values = async () => {
    const values2 = [];
    for await (const entry of traverse()) {
      values2.unshift(entry);
    }
    return values2;
  };
  const get2 = async (hash2) => {
    const bytes2 = await _entries.get(hash2);
    if (bytes2) {
      const entry = await entry_default.decode(bytes2);
      await _index.put(hash2, true);
      return entry;
    }
  };
  const has = async (hash2) => {
    const entry = await _index.get(hash2);
    return entry != null;
  };
  const append = async (data, options = { referencesCount: 0 }) => {
    const heads_ = await heads();
    const nexts = heads_.map((entry2) => entry2.hash);
    const refs = await getReferences(heads_, options.referencesCount + heads_.length);
    const entry = await entry_default.create(identity3, id, data, tickClock(await clock()), nexts, refs);
    const canAppend = await access.canAppend(entry);
    if (!canAppend) {
      throw new Error(`Could not append entry:
Key "${identity3.hash}" is not allowed to write to the log`);
    }
    await _heads.set([entry]);
    await _entries.put(entry.hash, entry.bytes);
    await _index.put(entry.hash, true);
    return entry;
  };
  const join = async (log) => {
    if (!log) {
      throw new Error("Log instance not defined");
    }
    if (!isLog(log)) {
      throw new Error("Given argument is not an instance of Log");
    }
    const heads2 = await log.heads();
    for (const entry of heads2) {
      await joinEntry(entry);
    }
    if (_entries.merge) {
      await _entries.merge(log.storage);
    }
  };
  const joinEntry = async (entry) => {
    const { hash: hash2 } = entry;
    const isAlreadyInTheLog = await has(hash2);
    if (isAlreadyInTheLog) {
      return false;
    } else {
      const it = traverse(await heads(), (e) => e.next.includes(hash2) || entry.next.includes(e.hash));
      for await (const e of it) {
        if (e.next.includes(hash2)) {
          await _index.put(hash2, true);
          return false;
        }
      }
    }
    if (entry.id !== id) {
      throw new Error(`Entry's id (${entry.id}) doesn't match the log's id (${id}).`);
    }
    const canAppend = await access.canAppend(entry);
    if (!canAppend) {
      throw new Error(`Could not append entry:
Key "${entry.identity}" is not allowed to write to the log`);
    }
    const isValid = await entry_default.verify(identity3, entry);
    if (!isValid) {
      throw new Error(`Could not validate signature for entry "${hash2}"`);
    }
    const newHeads = await _heads.add(entry);
    if (!newHeads) {
      return false;
    }
    await _entries.put(hash2, entry.bytes);
    await _index.put(hash2, true);
    return true;
  };
  const traverse = async function* (rootEntries, shouldStopFn, useRefs = true) {
    const defaultStopFn = () => false;
    shouldStopFn = shouldStopFn || defaultStopFn;
    rootEntries = rootEntries || await heads();
    let stack = rootEntries.sort(sortFn);
    const traversed = {};
    let toFetch = [];
    const fetched = {};
    const notIndexed = (hash2) => !(traversed[hash2] || fetched[hash2]);
    let entry;
    while (stack.length > 0) {
      stack = stack.sort(sortFn);
      entry = stack.pop();
      if (entry) {
        const { hash: hash2, next, refs } = entry;
        if (!traversed[hash2]) {
          yield entry;
          const done = await shouldStopFn(entry);
          if (done === true) {
            break;
          }
          traversed[hash2] = true;
          fetched[hash2] = true;
          toFetch = [...toFetch, ...next, ...useRefs ? refs : []].filter(notIndexed);
          const fetchEntries = (hash3) => {
            if (!traversed[hash3] && !fetched[hash3]) {
              fetched[hash3] = true;
              return get2(hash3);
            }
          };
          const nexts = await Promise.all(toFetch.map(fetchEntries));
          toFetch = nexts.filter((e) => e != null).reduce((res, acc) => Array.from(/* @__PURE__ */ new Set([...res, ...acc.next, ...useRefs ? acc.refs : []])), []).filter(notIndexed);
          stack = [...nexts, ...stack];
        }
      }
    }
  };
  const iterator = async function* ({ amount = -1, gt, gte, lt, lte } = {}) {
    if (amount === 0) {
      return;
    }
    if (typeof lte === "string") {
      lte = [await get2(lte)];
    }
    if (typeof lt === "string") {
      const entry = await get2(lt);
      const nexts = await Promise.all(entry.next.map((n) => get2(n)));
      lt = nexts;
    }
    if (lt != null && !Array.isArray(lt))
      throw new Error("lt must be a string or an array of Entries");
    if (lte != null && !Array.isArray(lte))
      throw new Error("lte must be a string or an array of Entries");
    const start = (lt || (lte || await heads())).filter((i) => i != null);
    const end = gt || gte ? await get2(gt || gte) : null;
    const amountToIterate = end || amount === -1 ? -1 : amount;
    let count = 0;
    const shouldStopTraversal = async (entry) => {
      count++;
      if (!entry) {
        return false;
      }
      if (count >= amountToIterate && amountToIterate !== -1) {
        return true;
      }
      if (end && entry_default.isEqual(entry, end)) {
        return true;
      }
      return false;
    };
    const useBuffer2 = end && amount !== -1 && !lt && !lte;
    const buffer2 = useBuffer2 ? new import_lru.default(amount + 2) : null;
    let index = 0;
    const it = traverse(start, shouldStopTraversal);
    for await (const entry of it) {
      const skipFirst = lt && entry_default.isEqual(entry, start);
      const skipLast = gt && entry_default.isEqual(entry, end);
      const skip = skipFirst || skipLast;
      if (!skip) {
        if (useBuffer2) {
          buffer2.set(index++, entry.hash);
        } else {
          yield entry;
        }
      }
    }
    if (useBuffer2) {
      const endIndex = buffer2.keys.length;
      const startIndex = endIndex - amount;
      const keys = buffer2.keys.slice(startIndex, endIndex);
      for (const key of keys) {
        const hash2 = buffer2.get(key);
        const entry = await get2(hash2);
        yield entry;
      }
    }
  };
  const clear = async () => {
    await _index.clear();
    await _heads.clear();
    await _entries.clear();
  };
  const close = async () => {
    await _index.close();
    await _heads.close();
    await _entries.close();
  };
  const isLog = (obj) => {
    return obj && obj.id !== void 0 && obj.clock !== void 0 && obj.heads !== void 0 && obj.values !== void 0 && obj.access !== void 0 && obj.identity !== void 0 && obj.storage !== void 0;
  };
  const getReferences = async (heads2, amount = 0) => {
    let refs = [];
    const shouldStopTraversal = async (entry) => {
      return refs.length >= amount && amount !== -1;
    };
    for await (const { hash: hash2 } of traverse(heads2, shouldStopTraversal, false)) {
      refs.push(hash2);
    }
    refs = refs.slice(heads2.length + 1, amount);
    return refs;
  };
  return {
    id,
    clock,
    heads,
    values,
    all: values,
    get: get2,
    has,
    append,
    join,
    joinEntry,
    traverse,
    iterator,
    clear,
    close,
    access,
    identity: identity3,
    storage: _entries
  };
};

// node_modules/@orbitdb/core/src/storage/index.js
init_node_globals();

// node_modules/@orbitdb/core/src/storage/composed.js
init_node_globals();
var ComposedStorage = async (storage1, storage2) => {
  const put = async (hash2, data) => {
    await storage1.put(hash2, data);
    await storage2.put(hash2, data);
  };
  const get2 = async (hash2) => {
    let value = await storage1.get(hash2);
    if (!value) {
      value = await storage2.get(hash2);
      if (value) {
        await storage1.put(hash2, value);
      }
    }
    return value;
  };
  const iterator = async function* () {
    const keys = [];
    for (const storage of [storage1, storage2]) {
      for await (const [key, value] of storage.iterator()) {
        if (!keys[key]) {
          keys[key] = true;
          yield [key, value];
        }
      }
    }
  };
  const merge2 = async (other) => {
    await storage1.merge(other);
    await storage2.merge(other);
    await other.merge(storage1);
    await other.merge(storage2);
  };
  const clear = async () => {
    await storage1.clear();
    await storage2.clear();
  };
  const close = async () => {
    await storage1.close();
    await storage2.close();
  };
  return {
    put,
    get: get2,
    iterator,
    merge: merge2,
    clear,
    close
  };
};
var composed_default = ComposedStorage;

// node_modules/@orbitdb/core/src/storage/ipfs-block.js
init_node_globals();
var defaultTimeout = 3e4;
var IPFSBlockStorage = async ({ ipfs, timeout, pin } = {}) => {
  if (!ipfs)
    throw new Error("An instance of ipfs is required.");
  timeout = timeout || defaultTimeout;
  const put = async (hash2, data) => {
    const cid = CID.parse(hash2, base58btc);
    await ipfs.block.put(data, {
      cid: cid.bytes,
      version: cid.version,
      format: "dag-cbor",
      mhtype: "sha2-256",
      pin,
      timeout
    });
  };
  const del = async (hash2) => {
  };
  const get2 = async (hash2) => {
    const cid = CID.parse(hash2, base58btc);
    const block = await ipfs.block.get(cid, { timeout });
    if (block) {
      return block;
    }
  };
  const iterator = async function* () {
  };
  const merge2 = async (other) => {
  };
  const clear = async () => {
  };
  const close = async () => {
  };
  return {
    put,
    del,
    get: get2,
    iterator,
    merge: merge2,
    clear,
    close
  };
};
var ipfs_block_default = IPFSBlockStorage;

// node_modules/@orbitdb/core/src/storage/level.js
init_node_globals();
var import_level = __toESM(require_browser2(), 1);
var defaultPath = "./level";
var defaultValueEncoding = "view";
var LevelStorage = async ({ path, valueEncoding: valueEncoding2 } = {}) => {
  path = path || defaultPath;
  valueEncoding2 = valueEncoding2 || defaultValueEncoding;
  const db = new import_level.Level(path, { valueEncoding: valueEncoding2, passive: true });
  await db.open();
  const put = async (hash2, value) => {
    await db.put(hash2, value);
  };
  const del = async (hash2) => {
    await db.del(hash2);
  };
  const get2 = async (hash2) => {
    try {
      const value = await db.get(hash2);
      if (value) {
        return value;
      }
    } catch (e) {
    }
  };
  const iterator = async function* () {
    for await (const [key, value] of db.iterator()) {
      yield [key, value];
    }
  };
  const merge2 = async (other) => {
  };
  const clear = async () => {
    await db.clear();
  };
  const close = async () => {
    await db.close();
  };
  return {
    put,
    del,
    get: get2,
    iterator,
    merge: merge2,
    clear,
    close
  };
};
var level_default = LevelStorage;

// node_modules/@orbitdb/core/src/storage/lru.js
init_node_globals();
var import_lru2 = __toESM(require_lru(), 1);
var defaultSize = 1e6;
var LRUStorage = async ({ size } = {}) => {
  let lru = new import_lru2.default(size || defaultSize);
  const put = async (hash2, data) => {
    lru.set(hash2, data);
  };
  const del = async (hash2) => {
    lru.remove(hash2);
  };
  const get2 = async (hash2) => {
    return lru.get(hash2);
  };
  const iterator = async function* () {
    for await (const key of lru.keys) {
      const value = lru.get(key);
      yield [key, value];
    }
  };
  const merge2 = async (other) => {
    if (other) {
      for await (const [key, value] of other.iterator()) {
        lru.set(key, value);
      }
    }
  };
  const clear = async () => {
    lru = new import_lru2.default(size || defaultSize);
  };
  const close = async () => {
  };
  return {
    put,
    del,
    get: get2,
    iterator,
    merge: merge2,
    clear,
    close
  };
};
var lru_default = LRUStorage;

// node_modules/@orbitdb/core/src/database.js
var defaultReferencesCount = 16;
var defaultCacheSize = 1e3;
var Database = async ({ ipfs, identity: identity3, address, name: name3, access, directory, meta, headsStorage, entryStorage, indexStorage, referencesCount, syncAutomatically, onUpdate }) => {
  directory = path_join_default(directory || "./orbitdb", `./${address}/`);
  meta = meta || {};
  referencesCount = Number(referencesCount) > -1 ? referencesCount : defaultReferencesCount;
  entryStorage = entryStorage || await composed_default(await lru_default({ size: defaultCacheSize }), await ipfs_block_default({ ipfs, pin: true }));
  headsStorage = headsStorage || await composed_default(await lru_default({ size: defaultCacheSize }), await level_default({ path: path_join_default(directory, "/log/_heads/") }));
  indexStorage = indexStorage || await composed_default(await lru_default({ size: defaultCacheSize }), await level_default({ path: path_join_default(directory, "/log/_index/") }));
  const log = await Log(identity3, { logId: address, access, entryStorage, headsStorage, indexStorage });
  const events = new import_events2.EventEmitter();
  const queue = new dist_default({ concurrency: 1 });
  const addOperation = async (op) => {
    const task = async () => {
      const entry = await log.append(op, { referencesCount });
      await sync.add(entry);
      if (onUpdate) {
        await onUpdate(log, entry);
      }
      events.emit("update", entry);
      return entry.hash;
    };
    const hash2 = await queue.add(task);
    await queue.onIdle();
    return hash2;
  };
  const applyOperation = async (bytes2) => {
    const task = async () => {
      const entry = await entry_default.decode(bytes2);
      if (entry) {
        const updated = await log.joinEntry(entry);
        if (updated) {
          if (onUpdate) {
            await onUpdate(log, entry);
          }
          events.emit("update", entry);
        }
      }
    };
    await queue.add(task);
  };
  const close = async () => {
    await sync.stop();
    await queue.onIdle();
    await log.close();
    if (access && access.close) {
      await access.close();
    }
    events.emit("close");
  };
  const drop = async () => {
    await queue.onIdle();
    await log.clear();
    if (access && access.drop) {
      await access.drop();
    }
    events.emit("drop");
  };
  const sync = await Sync({ ipfs, log, events, onSynced: applyOperation, start: syncAutomatically });
  return {
    address,
    name: name3,
    identity: identity3,
    meta,
    close,
    drop,
    addOperation,
    log,
    sync,
    peers: sync.peers,
    events,
    access
  };
};
var database_default = Database;

// node_modules/@orbitdb/core/src/databases/documents.js
var type = "documents";
var DefaultOptions = { indexBy: "_id" };
var Documents = ({ indexBy } = DefaultOptions) => async ({ ipfs, identity: identity3, address, name: name3, access, directory, meta, headsStorage, entryStorage, indexStorage, referencesCount, syncAutomatically, onUpdate }) => {
  const database = await database_default({ ipfs, identity: identity3, address, name: name3, access, directory, meta, headsStorage, entryStorage, indexStorage, referencesCount, syncAutomatically });
  const { addOperation, log } = database;
  const put = async (doc) => {
    const key = doc[indexBy];
    if (!key) {
      throw new Error(`The provided document doesn't contain field '${indexBy}'`);
    }
    return addOperation({ op: "PUT", key, value: doc });
  };
  const del = async (key) => {
    if (!await get2(key)) {
      throw new Error(`No document with key '${key}' in the database`);
    }
    return addOperation({ op: "DEL", key, value: null });
  };
  const get2 = async (key) => {
    for await (const doc of iterator()) {
      if (key === doc.key) {
        return doc;
      }
    }
  };
  const query = async (findFn) => {
    const results = [];
    for await (const doc of iterator()) {
      if (findFn(doc.value)) {
        results.push(doc.value);
      }
    }
    return results;
  };
  const iterator = async function* ({ amount } = {}) {
    const keys = {};
    let count = 0;
    for await (const entry of log.iterator()) {
      const { op, key, value } = entry.payload;
      if (op === "PUT" && !keys[key]) {
        keys[key] = true;
        count++;
        const hash2 = entry.hash;
        yield { hash: hash2, key, value };
      } else if (op === "DEL" && !keys[key]) {
        keys[key] = true;
      }
      if (count >= amount) {
        break;
      }
    }
  };
  const all = async () => {
    const values = [];
    for await (const entry of iterator()) {
      values.unshift(entry);
    }
    return values;
  };
  return {
    ...database,
    type,
    put,
    del,
    get: get2,
    iterator,
    query,
    indexBy,
    all
  };
};
Documents.type = type;
var documents_default = Documents;

// node_modules/@orbitdb/core/src/databases/events.js
init_node_globals();
var type2 = "events";
var Events = () => async ({ ipfs, identity: identity3, address, name: name3, access, directory, meta, headsStorage, entryStorage, indexStorage, referencesCount, syncAutomatically, onUpdate }) => {
  const database = await database_default({ ipfs, identity: identity3, address, name: name3, access, directory, meta, headsStorage, entryStorage, indexStorage, referencesCount, syncAutomatically, onUpdate });
  const { addOperation, log } = database;
  const add2 = async (value) => {
    return addOperation({ op: "ADD", key: null, value });
  };
  const get2 = async (hash2) => {
    const entry = await log.get(hash2);
    return entry.payload.value;
  };
  const iterator = async function* ({ gt, gte, lt, lte, amount } = {}) {
    const it = log.iterator({ gt, gte, lt, lte, amount });
    for await (const event of it) {
      const hash2 = event.hash;
      const value = event.payload.value;
      yield { hash: hash2, value };
    }
  };
  const all = async () => {
    const values = [];
    for await (const entry of iterator()) {
      values.unshift(entry);
    }
    return values;
  };
  return {
    ...database,
    type: type2,
    add: add2,
    get: get2,
    iterator,
    all
  };
};
Events.type = type2;
var events_default = Events;

// node_modules/@orbitdb/core/src/databases/keyvalue.js
init_node_globals();
var type3 = "keyvalue";
var KeyValue = () => async ({ ipfs, identity: identity3, address, name: name3, access, directory, meta, headsStorage, entryStorage, indexStorage, referencesCount, syncAutomatically, onUpdate }) => {
  const database = await database_default({ ipfs, identity: identity3, address, name: name3, access, directory, meta, headsStorage, entryStorage, indexStorage, referencesCount, syncAutomatically, onUpdate });
  const { addOperation, log } = database;
  const put = async (key, value) => {
    return addOperation({ op: "PUT", key, value });
  };
  const del = async (key) => {
    return addOperation({ op: "DEL", key, value: null });
  };
  const get2 = async (key) => {
    for await (const entry of log.traverse()) {
      const { op, key: k, value } = entry.payload;
      if (op === "PUT" && k === key) {
        return value;
      } else if (op === "DEL" && k === key) {
        return;
      }
    }
  };
  const iterator = async function* ({ amount } = {}) {
    const keys = {};
    let count = 0;
    for await (const entry of log.traverse()) {
      const { op, key, value } = entry.payload;
      if (op === "PUT" && !keys[key]) {
        keys[key] = true;
        count++;
        const hash2 = entry.hash;
        yield { key, value, hash: hash2 };
      } else if (op === "DEL" && !keys[key]) {
        keys[key] = true;
      }
      if (count >= amount) {
        break;
      }
    }
  };
  const all = async () => {
    const values = [];
    for await (const entry of iterator()) {
      values.unshift(entry);
    }
    return values;
  };
  return {
    ...database,
    type: type3,
    put,
    set: put,
    del,
    get: get2,
    iterator,
    all
  };
};
KeyValue.type = type3;
var keyvalue_default = KeyValue;

// node_modules/@orbitdb/core/src/databases/keyvalue-indexed.js
init_node_globals();
var valueEncoding = "json";
var KeyValueIndexed = ({ storage } = {}) => async ({ ipfs, identity: identity3, address, name: name3, access, directory, meta, headsStorage, entryStorage, indexStorage, referencesCount, syncAutomatically, onUpdate }) => {
  const indexDirectory = path_join_default(directory || "./orbitdb", `./${address}/_index/`);
  const index = storage || await level_default({ path: indexDirectory, valueEncoding });
  let latestOplogHash;
  const _updateIndex = async (log, entry) => {
    const keys = {};
    const it = await log.iterator({ gt: latestOplogHash });
    for await (const entry2 of it) {
      const { op, key, value } = entry2.payload;
      if (op === "PUT" && !keys[key]) {
        keys[key] = true;
        await index.put(key, value);
      } else if (op === "DEL" && !keys[key]) {
        keys[key] = true;
        await index.del(key);
      }
    }
    latestOplogHash = entry ? entry.hash : null;
  };
  const keyValueStore = await keyvalue_default()({ ipfs, identity: identity3, address, name: name3, access, directory, meta, headsStorage, entryStorage, indexStorage, referencesCount, syncAutomatically, onUpdate: _updateIndex });
  await _updateIndex(keyValueStore.log);
  const get2 = async (key) => {
    const value = await index.get(key);
    if (value) {
      return value;
    }
    return keyValueStore.get(key);
  };
  const iterator = async function* ({ amount } = {}) {
    const it = keyValueStore.iterator({ amount });
    for await (const { key, value, hash: hash2 } of it) {
      yield { key, value, hash: hash2 };
    }
  };
  const close = async () => {
    await index.close();
    await keyValueStore.close();
  };
  const drop = async () => {
    await index.clear();
    await keyValueStore.drop();
  };
  return {
    ...keyValueStore,
    get: get2,
    iterator,
    close,
    drop
  };
};
KeyValueIndexed.type = "keyvalue";
var keyvalue_indexed_default = KeyValueIndexed;

// node_modules/@orbitdb/core/src/databases/index.js
var databaseTypes = {};
var useDatabaseType = (database) => {
  if (!database.type) {
    throw new Error("Database type does not contain required field 'type'.");
  }
  databaseTypes[database.type] = database;
};
var getDatabaseType = (type7) => {
  if (!type7) {
    throw new Error("Type not specified");
  }
  if (!databaseTypes[type7]) {
    throw new Error(`Unsupported database type: '${type7}'`);
  }
  return databaseTypes[type7];
};
useDatabaseType(events_default);
useDatabaseType(documents_default);
useDatabaseType(keyvalue_default);

// node_modules/@orbitdb/core/src/key-store.js
init_node_globals();

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/index.js
init_node_globals();

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/aes/index.js
init_node_globals();

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/aes/cipher-mode.js
init_node_globals();

// node_modules/@libp2p/interface/dist/src/errors.js
init_node_globals();
var CodeError = class extends Error {
  code;
  props;
  constructor(message2, code3, props) {
    super(message2);
    this.code = code3;
    this.name = props?.name ?? "CodeError";
    this.props = props ?? {};
  }
};

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/aes/ciphers-browser.js
init_node_globals();
var import_aes = __toESM(require_aes(), 1);
var import_forge = __toESM(require_forge(), 1);

// node_modules/@orbitdb/core/node_modules/uint8arrays/dist/src/from-string.js
init_node_globals();

// node_modules/@orbitdb/core/node_modules/uint8arrays/dist/src/util/as-uint8array.js
init_node_globals();
function asUint8Array(buf2) {
  if (globalThis.Buffer != null) {
    return new Uint8Array(buf2.buffer, buf2.byteOffset, buf2.byteLength);
  }
  return buf2;
}

// node_modules/@orbitdb/core/node_modules/uint8arrays/dist/src/util/bases.js
init_node_globals();

// node_modules/@orbitdb/core/node_modules/multiformats/src/basics.js
init_node_globals();

// node_modules/@orbitdb/core/node_modules/multiformats/src/bases/base10.js
var base10_exports = {};
__export(base10_exports, {
  base10: () => base10
});
init_node_globals();
var base10 = baseX({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});

// node_modules/@orbitdb/core/node_modules/multiformats/src/bases/base16.js
var base16_exports = {};
__export(base16_exports, {
  base16: () => base16,
  base16upper: () => base16upper
});
init_node_globals();
var base16 = rfc4648({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
var base16upper = rfc4648({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
});

// node_modules/@orbitdb/core/node_modules/multiformats/src/bases/base2.js
var base2_exports = {};
__export(base2_exports, {
  base2: () => base22
});
init_node_globals();
var base22 = rfc4648({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});

// node_modules/@orbitdb/core/node_modules/multiformats/src/bases/base256emoji.js
var base256emoji_exports = {};
__export(base256emoji_exports, {
  base256emoji: () => base256emoji
});
init_node_globals();
var alphabet = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}");
var alphabetBytesToChars = alphabet.reduce((p, c, i) => {
  p[i] = c;
  return p;
}, []);
var alphabetCharsToBytes = alphabet.reduce((p, c, i) => {
  p[c.codePointAt(0)] = i;
  return p;
}, []);
function encode8(data) {
  return data.reduce((p, c) => {
    p += alphabetBytesToChars[c];
    return p;
  }, "");
}
function decode13(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes[char.codePointAt(0)];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
var base256emoji = from({
  prefix: "\u{1F680}",
  name: "base256emoji",
  encode: encode8,
  decode: decode13
});

// node_modules/@orbitdb/core/node_modules/multiformats/src/bases/base36.js
var base36_exports = {};
__export(base36_exports, {
  base36: () => base36,
  base36upper: () => base36upper
});
init_node_globals();
var base36 = baseX({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
var base36upper = baseX({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});

// node_modules/@orbitdb/core/node_modules/multiformats/src/bases/base64.js
var base64_exports = {};
__export(base64_exports, {
  base64: () => base64,
  base64pad: () => base64pad,
  base64url: () => base64url,
  base64urlpad: () => base64urlpad
});
init_node_globals();
var base64 = rfc4648({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
var base64pad = rfc4648({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
var base64url = rfc4648({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
var base64urlpad = rfc4648({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});

// node_modules/@orbitdb/core/node_modules/multiformats/src/bases/base8.js
var base8_exports = {};
__export(base8_exports, {
  base8: () => base8
});
init_node_globals();
var base8 = rfc4648({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});

// node_modules/@orbitdb/core/node_modules/multiformats/src/bases/identity.js
var identity_exports = {};
__export(identity_exports, {
  identity: () => identity
});
init_node_globals();
var identity = from({
  prefix: "\0",
  name: "identity",
  encode: (buf2) => toString(buf2),
  decode: (str) => fromString(str)
});

// node_modules/@orbitdb/core/node_modules/multiformats/src/codecs/json.js
init_node_globals();
var textEncoder2 = new TextEncoder();
var textDecoder2 = new TextDecoder();

// node_modules/@orbitdb/core/node_modules/multiformats/src/codecs/raw.js
init_node_globals();

// node_modules/@orbitdb/core/node_modules/multiformats/src/hashes/identity.js
var identity_exports2 = {};
__export(identity_exports2, {
  identity: () => identity2
});
init_node_globals();
var code2 = 0;
var name2 = "identity";
var encode9 = coerce;
var digest = (input) => create(code2, encode9(input));
var identity2 = { code: code2, name: name2, encode: encode9, digest };

// node_modules/@orbitdb/core/node_modules/multiformats/src/basics.js
var bases = { ...identity_exports, ...base2_exports, ...base8_exports, ...base10_exports, ...base16_exports, ...base32_exports, ...base36_exports, ...base58_exports, ...base64_exports, ...base256emoji_exports };
var hashes = { ...sha2_browser_exports, ...identity_exports2 };

// node_modules/@orbitdb/core/node_modules/uint8arrays/dist/src/alloc.js
init_node_globals();
function allocUnsafe(size = 0) {
  if (globalThis.Buffer?.allocUnsafe != null) {
    return asUint8Array(globalThis.Buffer.allocUnsafe(size));
  }
  return new Uint8Array(size);
}

// node_modules/@orbitdb/core/node_modules/uint8arrays/dist/src/util/bases.js
function createCodec(name3, prefix, encode10, decode14) {
  return {
    name: name3,
    prefix,
    encoder: {
      name: name3,
      prefix,
      encode: encode10
    },
    decoder: {
      decode: decode14
    }
  };
}
var string = createCodec("utf8", "u", (buf2) => {
  const decoder = new TextDecoder("utf8");
  return "u" + decoder.decode(buf2);
}, (str) => {
  const encoder = new TextEncoder();
  return encoder.encode(str.substring(1));
});
var ascii = createCodec("ascii", "a", (buf2) => {
  let string2 = "a";
  for (let i = 0; i < buf2.length; i++) {
    string2 += String.fromCharCode(buf2[i]);
  }
  return string2;
}, (str) => {
  str = str.substring(1);
  const buf2 = allocUnsafe(str.length);
  for (let i = 0; i < str.length; i++) {
    buf2[i] = str.charCodeAt(i);
  }
  return buf2;
});
var BASES = {
  utf8: string,
  "utf-8": string,
  hex: bases.base16,
  latin1: ascii,
  ascii,
  binary: ascii,
  ...bases
};
var bases_default = BASES;

// node_modules/@orbitdb/core/node_modules/uint8arrays/dist/src/from-string.js
function fromString3(string2, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (base3 == null) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return asUint8Array(globalThis.Buffer.from(string2, "utf-8"));
  }
  return base3.decoder.decode(`${base3.prefix}${string2}`);
}

// node_modules/@orbitdb/core/node_modules/uint8arrays/dist/src/to-string.js
init_node_globals();
function toString3(array, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (base3 == null) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString("utf8");
  }
  return base3.encoder.encode(array).substring(1);
}

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/hmac/index-browser.js
init_node_globals();

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/webcrypto.js
init_node_globals();
var webcrypto_default = {
  get(win = globalThis) {
    const nativeCrypto = win.crypto;
    if (nativeCrypto == null || nativeCrypto.subtle == null) {
      throw Object.assign(new Error("Missing Web Crypto API. The most likely cause of this error is that this page is being accessed from an insecure context (i.e. not HTTPS). For more information and possible resolutions see https://github.com/libp2p/js-libp2p-crypto/blob/master/README.md#web-crypto-api"), { code: "ERR_MISSING_WEB_CRYPTO" });
    }
    return nativeCrypto;
  }
};

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/hmac/lengths.js
init_node_globals();
var lengths_default = {
  SHA1: 20,
  SHA256: 32,
  SHA512: 64
};

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/hmac/index-browser.js
var hashTypes = {
  SHA1: "SHA-1",
  SHA256: "SHA-256",
  SHA512: "SHA-512"
};
var sign = async (key, data) => {
  const buf2 = await webcrypto_default.get().subtle.sign({ name: "HMAC" }, key, data);
  return new Uint8Array(buf2, 0, buf2.byteLength);
};
async function create4(hashType, secret) {
  const hash2 = hashTypes[hashType];
  const key = await webcrypto_default.get().subtle.importKey("raw", secret, {
    name: "HMAC",
    hash: { name: hash2 }
  }, false, ["sign"]);
  return {
    async digest(data) {
      return sign(key, data);
    },
    length: lengths_default[hashType]
  };
}

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/keys/index.js
var keys_exports2 = {};
__export(keys_exports2, {
  generateEphemeralKeyPair: () => ephemeral_keys_default,
  generateKeyPair: () => generateKeyPair4,
  generateKeyPairFromSeed: () => generateKeyPairFromSeed2,
  importKey: () => importKey,
  keyStretcher: () => keyStretcher,
  keysPBM: () => keys_exports,
  marshalPrivateKey: () => marshalPrivateKey,
  marshalPublicKey: () => marshalPublicKey2,
  supportedKeys: () => supportedKeys,
  unmarshalPrivateKey: () => unmarshalPrivateKey3,
  unmarshalPublicKey: () => unmarshalPublicKey2
});
init_node_globals();
var import_asn12 = __toESM(require_asn1(), 1);
var import_pbe = __toESM(require_pbe(), 1);
var import_forge6 = __toESM(require_forge(), 1);

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/keys/ed25519-class.js
var ed25519_class_exports = {};
__export(ed25519_class_exports, {
  Ed25519PrivateKey: () => Ed25519PrivateKey,
  Ed25519PublicKey: () => Ed25519PublicKey,
  generateKeyPair: () => generateKeyPair,
  generateKeyPairFromSeed: () => generateKeyPairFromSeed,
  unmarshalEd25519PrivateKey: () => unmarshalEd25519PrivateKey,
  unmarshalEd25519PublicKey: () => unmarshalEd25519PublicKey
});
init_node_globals();

// node_modules/@orbitdb/core/node_modules/uint8arrays/dist/src/equals.js
init_node_globals();
function equals5(a, b) {
  if (a === b) {
    return true;
  }
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  for (let i = 0; i < a.byteLength; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/keys/ed25519-browser.js
init_node_globals();

// node_modules/@noble/curves/esm/ed25519.js
init_node_globals();

// node_modules/@noble/hashes/esm/sha512.js
init_node_globals();

// node_modules/@noble/hashes/esm/_sha2.js
init_node_globals();

// node_modules/@noble/hashes/esm/_assert.js
init_node_globals();
function number(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error(`Wrong positive integer: ${n}`);
}
function bytes(b, ...lengths) {
  if (!(b instanceof Uint8Array))
    throw new Error("Expected Uint8Array");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error(`Expected Uint8Array of length ${lengths}, not of length=${b.length}`);
}
function hash(hash2) {
  if (typeof hash2 !== "function" || typeof hash2.create !== "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  number(hash2.outputLen);
  number(hash2.blockLen);
}
function exists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function output(out, instance) {
  bytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error(`digestInto() expects output buffer of length at least ${min}`);
  }
}

// node_modules/@noble/hashes/esm/utils.js
init_node_globals();

// node_modules/@noble/hashes/esm/crypto.js
init_node_globals();
var crypto2 = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;

// node_modules/@noble/hashes/esm/utils.js
var u8a = (a) => a instanceof Uint8Array;
var createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
var rotr = (word, shift) => word << 32 - shift | word >>> shift;
var isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!isLE)
  throw new Error("Non little-endian hardware is not supported");
function utf8ToBytes2(str) {
  if (typeof str !== "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes(data) {
  if (typeof data === "string")
    data = utf8ToBytes2(data);
  if (!u8a(data))
    throw new Error(`expected Uint8Array, got ${typeof data}`);
  return data;
}
function concatBytes(...arrays) {
  const r = new Uint8Array(arrays.reduce((sum, a) => sum + a.length, 0));
  let pad = 0;
  arrays.forEach((a) => {
    if (!u8a(a))
      throw new Error("Uint8Array expected");
    r.set(a, pad);
    pad += a.length;
  });
  return r;
}
var Hash = class {
  clone() {
    return this._cloneInto();
  }
};
var toStr = {}.toString;
function wrapConstructor(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
function randomBytes(bytesLength = 32) {
  if (crypto2 && typeof crypto2.getRandomValues === "function") {
    return crypto2.getRandomValues(new Uint8Array(bytesLength));
  }
  throw new Error("crypto.getRandomValues must be defined");
}

// node_modules/@noble/hashes/esm/_sha2.js
function setBigUint64(view, byteOffset, value, isLE2) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value, isLE2);
  const _32n2 = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n2 & _u32_max);
  const wl = Number(value & _u32_max);
  const h = isLE2 ? 4 : 0;
  const l = isLE2 ? 0 : 4;
  view.setUint32(byteOffset + h, wh, isLE2);
  view.setUint32(byteOffset + l, wl, isLE2);
}
var SHA2 = class extends Hash {
  constructor(blockLen, outputLen, padOffset, isLE2) {
    super();
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.padOffset = padOffset;
    this.isLE = isLE2;
    this.finished = false;
    this.length = 0;
    this.pos = 0;
    this.destroyed = false;
    this.buffer = new Uint8Array(blockLen);
    this.view = createView(this.buffer);
  }
  update(data) {
    exists(this);
    const { view, buffer: buffer2, blockLen } = this;
    data = toBytes(data);
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        const dataView2 = createView(data);
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(dataView2, pos);
        continue;
      }
      buffer2.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(view, 0);
        this.pos = 0;
      }
    }
    this.length += data.length;
    this.roundClean();
    return this;
  }
  digestInto(out) {
    exists(this);
    output(out, this);
    this.finished = true;
    const { buffer: buffer2, view, blockLen, isLE: isLE2 } = this;
    let { pos } = this;
    buffer2[pos++] = 128;
    this.buffer.subarray(pos).fill(0);
    if (this.padOffset > blockLen - pos) {
      this.process(view, 0);
      pos = 0;
    }
    for (let i = pos; i < blockLen; i++)
      buffer2[i] = 0;
    setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE2);
    this.process(view, 0);
    const oview = createView(out);
    const len = this.outputLen;
    if (len % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const outLen = len / 4;
    const state = this.get();
    if (outLen > state.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let i = 0; i < outLen; i++)
      oview.setUint32(4 * i, state[i], isLE2);
  }
  digest() {
    const { buffer: buffer2, outputLen } = this;
    this.digestInto(buffer2);
    const res = buffer2.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to) {
    to || (to = new this.constructor());
    to.set(...this.get());
    const { blockLen, buffer: buffer2, length: length3, finished, destroyed, pos } = this;
    to.length = length3;
    to.pos = pos;
    to.finished = finished;
    to.destroyed = destroyed;
    if (length3 % blockLen)
      to.buffer.set(buffer2);
    return to;
  }
};

// node_modules/@noble/hashes/esm/_u64.js
init_node_globals();
var U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
var _32n = /* @__PURE__ */ BigInt(32);
function fromBig(n, le = false) {
  if (le)
    return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
  return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
}
function split(lst, le = false) {
  let Ah = new Uint32Array(lst.length);
  let Al = new Uint32Array(lst.length);
  for (let i = 0; i < lst.length; i++) {
    const { h, l } = fromBig(lst[i], le);
    [Ah[i], Al[i]] = [h, l];
  }
  return [Ah, Al];
}
var toBig = (h, l) => BigInt(h >>> 0) << _32n | BigInt(l >>> 0);
var shrSH = (h, _l, s) => h >>> s;
var shrSL = (h, l, s) => h << 32 - s | l >>> s;
var rotrSH = (h, l, s) => h >>> s | l << 32 - s;
var rotrSL = (h, l, s) => h << 32 - s | l >>> s;
var rotrBH = (h, l, s) => h << 64 - s | l >>> s - 32;
var rotrBL = (h, l, s) => h >>> s - 32 | l << 64 - s;
var rotr32H = (_h, l) => l;
var rotr32L = (h, _l) => h;
var rotlSH = (h, l, s) => h << s | l >>> 32 - s;
var rotlSL = (h, l, s) => l << s | h >>> 32 - s;
var rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
var rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
function add(Ah, Al, Bh, Bl2) {
  const l = (Al >>> 0) + (Bl2 >>> 0);
  return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
}
var add3L = (Al, Bl2, Cl) => (Al >>> 0) + (Bl2 >>> 0) + (Cl >>> 0);
var add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
var add4L = (Al, Bl2, Cl, Dl) => (Al >>> 0) + (Bl2 >>> 0) + (Cl >>> 0) + (Dl >>> 0);
var add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
var add5L = (Al, Bl2, Cl, Dl, El) => (Al >>> 0) + (Bl2 >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
var add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
var u64 = {
  fromBig,
  split,
  toBig,
  shrSH,
  shrSL,
  rotrSH,
  rotrSL,
  rotrBH,
  rotrBL,
  rotr32H,
  rotr32L,
  rotlSH,
  rotlSL,
  rotlBH,
  rotlBL,
  add,
  add3L,
  add3H,
  add4L,
  add4H,
  add5H,
  add5L
};
var u64_default = u64;

// node_modules/@noble/hashes/esm/sha512.js
var [SHA512_Kh, SHA512_Kl] = /* @__PURE__ */ (() => u64_default.split([
  "0x428a2f98d728ae22",
  "0x7137449123ef65cd",
  "0xb5c0fbcfec4d3b2f",
  "0xe9b5dba58189dbbc",
  "0x3956c25bf348b538",
  "0x59f111f1b605d019",
  "0x923f82a4af194f9b",
  "0xab1c5ed5da6d8118",
  "0xd807aa98a3030242",
  "0x12835b0145706fbe",
  "0x243185be4ee4b28c",
  "0x550c7dc3d5ffb4e2",
  "0x72be5d74f27b896f",
  "0x80deb1fe3b1696b1",
  "0x9bdc06a725c71235",
  "0xc19bf174cf692694",
  "0xe49b69c19ef14ad2",
  "0xefbe4786384f25e3",
  "0x0fc19dc68b8cd5b5",
  "0x240ca1cc77ac9c65",
  "0x2de92c6f592b0275",
  "0x4a7484aa6ea6e483",
  "0x5cb0a9dcbd41fbd4",
  "0x76f988da831153b5",
  "0x983e5152ee66dfab",
  "0xa831c66d2db43210",
  "0xb00327c898fb213f",
  "0xbf597fc7beef0ee4",
  "0xc6e00bf33da88fc2",
  "0xd5a79147930aa725",
  "0x06ca6351e003826f",
  "0x142929670a0e6e70",
  "0x27b70a8546d22ffc",
  "0x2e1b21385c26c926",
  "0x4d2c6dfc5ac42aed",
  "0x53380d139d95b3df",
  "0x650a73548baf63de",
  "0x766a0abb3c77b2a8",
  "0x81c2c92e47edaee6",
  "0x92722c851482353b",
  "0xa2bfe8a14cf10364",
  "0xa81a664bbc423001",
  "0xc24b8b70d0f89791",
  "0xc76c51a30654be30",
  "0xd192e819d6ef5218",
  "0xd69906245565a910",
  "0xf40e35855771202a",
  "0x106aa07032bbd1b8",
  "0x19a4c116b8d2d0c8",
  "0x1e376c085141ab53",
  "0x2748774cdf8eeb99",
  "0x34b0bcb5e19b48a8",
  "0x391c0cb3c5c95a63",
  "0x4ed8aa4ae3418acb",
  "0x5b9cca4f7763e373",
  "0x682e6ff3d6b2b8a3",
  "0x748f82ee5defb2fc",
  "0x78a5636f43172f60",
  "0x84c87814a1f0ab72",
  "0x8cc702081a6439ec",
  "0x90befffa23631e28",
  "0xa4506cebde82bde9",
  "0xbef9a3f7b2c67915",
  "0xc67178f2e372532b",
  "0xca273eceea26619c",
  "0xd186b8c721c0c207",
  "0xeada7dd6cde0eb1e",
  "0xf57d4f7fee6ed178",
  "0x06f067aa72176fba",
  "0x0a637dc5a2c898a6",
  "0x113f9804bef90dae",
  "0x1b710b35131c471b",
  "0x28db77f523047d84",
  "0x32caab7b40c72493",
  "0x3c9ebe0a15c9bebc",
  "0x431d67c49c100d4c",
  "0x4cc5d4becb3e42b6",
  "0x597f299cfc657e2a",
  "0x5fcb6fab3ad6faec",
  "0x6c44198c4a475817"
].map((n) => BigInt(n))))();
var SHA512_W_H = /* @__PURE__ */ new Uint32Array(80);
var SHA512_W_L = /* @__PURE__ */ new Uint32Array(80);
var SHA512 = class extends SHA2 {
  constructor() {
    super(128, 64, 16, false);
    this.Ah = 1779033703 | 0;
    this.Al = 4089235720 | 0;
    this.Bh = 3144134277 | 0;
    this.Bl = 2227873595 | 0;
    this.Ch = 1013904242 | 0;
    this.Cl = 4271175723 | 0;
    this.Dh = 2773480762 | 0;
    this.Dl = 1595750129 | 0;
    this.Eh = 1359893119 | 0;
    this.El = 2917565137 | 0;
    this.Fh = 2600822924 | 0;
    this.Fl = 725511199 | 0;
    this.Gh = 528734635 | 0;
    this.Gl = 4215389547 | 0;
    this.Hh = 1541459225 | 0;
    this.Hl = 327033209 | 0;
  }
  get() {
    const { Ah, Al, Bh, Bl: Bl2, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
    return [Ah, Al, Bh, Bl2, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
  }
  set(Ah, Al, Bh, Bl2, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
    this.Ah = Ah | 0;
    this.Al = Al | 0;
    this.Bh = Bh | 0;
    this.Bl = Bl2 | 0;
    this.Ch = Ch | 0;
    this.Cl = Cl | 0;
    this.Dh = Dh | 0;
    this.Dl = Dl | 0;
    this.Eh = Eh | 0;
    this.El = El | 0;
    this.Fh = Fh | 0;
    this.Fl = Fl | 0;
    this.Gh = Gh | 0;
    this.Gl = Gl | 0;
    this.Hh = Hh | 0;
    this.Hl = Hl | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4) {
      SHA512_W_H[i] = view.getUint32(offset);
      SHA512_W_L[i] = view.getUint32(offset += 4);
    }
    for (let i = 16; i < 80; i++) {
      const W15h = SHA512_W_H[i - 15] | 0;
      const W15l = SHA512_W_L[i - 15] | 0;
      const s0h = u64_default.rotrSH(W15h, W15l, 1) ^ u64_default.rotrSH(W15h, W15l, 8) ^ u64_default.shrSH(W15h, W15l, 7);
      const s0l = u64_default.rotrSL(W15h, W15l, 1) ^ u64_default.rotrSL(W15h, W15l, 8) ^ u64_default.shrSL(W15h, W15l, 7);
      const W2h = SHA512_W_H[i - 2] | 0;
      const W2l = SHA512_W_L[i - 2] | 0;
      const s1h = u64_default.rotrSH(W2h, W2l, 19) ^ u64_default.rotrBH(W2h, W2l, 61) ^ u64_default.shrSH(W2h, W2l, 6);
      const s1l = u64_default.rotrSL(W2h, W2l, 19) ^ u64_default.rotrBL(W2h, W2l, 61) ^ u64_default.shrSL(W2h, W2l, 6);
      const SUMl = u64_default.add4L(s0l, s1l, SHA512_W_L[i - 7], SHA512_W_L[i - 16]);
      const SUMh = u64_default.add4H(SUMl, s0h, s1h, SHA512_W_H[i - 7], SHA512_W_H[i - 16]);
      SHA512_W_H[i] = SUMh | 0;
      SHA512_W_L[i] = SUMl | 0;
    }
    let { Ah, Al, Bh, Bl: Bl2, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
    for (let i = 0; i < 80; i++) {
      const sigma1h = u64_default.rotrSH(Eh, El, 14) ^ u64_default.rotrSH(Eh, El, 18) ^ u64_default.rotrBH(Eh, El, 41);
      const sigma1l = u64_default.rotrSL(Eh, El, 14) ^ u64_default.rotrSL(Eh, El, 18) ^ u64_default.rotrBL(Eh, El, 41);
      const CHIh = Eh & Fh ^ ~Eh & Gh;
      const CHIl = El & Fl ^ ~El & Gl;
      const T1ll = u64_default.add5L(Hl, sigma1l, CHIl, SHA512_Kl[i], SHA512_W_L[i]);
      const T1h = u64_default.add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i], SHA512_W_H[i]);
      const T1l = T1ll | 0;
      const sigma0h = u64_default.rotrSH(Ah, Al, 28) ^ u64_default.rotrBH(Ah, Al, 34) ^ u64_default.rotrBH(Ah, Al, 39);
      const sigma0l = u64_default.rotrSL(Ah, Al, 28) ^ u64_default.rotrBL(Ah, Al, 34) ^ u64_default.rotrBL(Ah, Al, 39);
      const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
      const MAJl = Al & Bl2 ^ Al & Cl ^ Bl2 & Cl;
      Hh = Gh | 0;
      Hl = Gl | 0;
      Gh = Fh | 0;
      Gl = Fl | 0;
      Fh = Eh | 0;
      Fl = El | 0;
      ({ h: Eh, l: El } = u64_default.add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
      Dh = Ch | 0;
      Dl = Cl | 0;
      Ch = Bh | 0;
      Cl = Bl2 | 0;
      Bh = Ah | 0;
      Bl2 = Al | 0;
      const All = u64_default.add3L(T1l, sigma0l, MAJl);
      Ah = u64_default.add3H(All, T1h, sigma0h, MAJh);
      Al = All | 0;
    }
    ({ h: Ah, l: Al } = u64_default.add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
    ({ h: Bh, l: Bl2 } = u64_default.add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl2 | 0));
    ({ h: Ch, l: Cl } = u64_default.add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
    ({ h: Dh, l: Dl } = u64_default.add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
    ({ h: Eh, l: El } = u64_default.add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
    ({ h: Fh, l: Fl } = u64_default.add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
    ({ h: Gh, l: Gl } = u64_default.add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
    ({ h: Hh, l: Hl } = u64_default.add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
    this.set(Ah, Al, Bh, Bl2, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
  }
  roundClean() {
    SHA512_W_H.fill(0);
    SHA512_W_L.fill(0);
  }
  destroy() {
    this.buffer.fill(0);
    this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
};
var sha5122 = /* @__PURE__ */ wrapConstructor(() => new SHA512());

// node_modules/@noble/curves/esm/abstract/edwards.js
init_node_globals();

// node_modules/@noble/curves/esm/abstract/modular.js
init_node_globals();

// node_modules/@noble/curves/esm/abstract/utils.js
var utils_exports = {};
__export(utils_exports, {
  bitGet: () => bitGet,
  bitLen: () => bitLen,
  bitMask: () => bitMask,
  bitSet: () => bitSet,
  bytesToHex: () => bytesToHex,
  bytesToNumberBE: () => bytesToNumberBE,
  bytesToNumberLE: () => bytesToNumberLE,
  concatBytes: () => concatBytes2,
  createHmacDrbg: () => createHmacDrbg,
  ensureBytes: () => ensureBytes,
  equalBytes: () => equalBytes,
  hexToBytes: () => hexToBytes,
  hexToNumber: () => hexToNumber,
  numberToBytesBE: () => numberToBytesBE,
  numberToBytesLE: () => numberToBytesLE,
  numberToHexUnpadded: () => numberToHexUnpadded,
  numberToVarBytesBE: () => numberToVarBytesBE,
  utf8ToBytes: () => utf8ToBytes3,
  validateObject: () => validateObject
});
init_node_globals();
var _0n = BigInt(0);
var _1n = BigInt(1);
var _2n = BigInt(2);
var u8a2 = (a) => a instanceof Uint8Array;
var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
function bytesToHex(bytes2) {
  if (!u8a2(bytes2))
    throw new Error("Uint8Array expected");
  let hex = "";
  for (let i = 0; i < bytes2.length; i++) {
    hex += hexes[bytes2[i]];
  }
  return hex;
}
function numberToHexUnpadded(num) {
  const hex = num.toString(16);
  return hex.length & 1 ? `0${hex}` : hex;
}
function hexToNumber(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  return BigInt(hex === "" ? "0" : `0x${hex}`);
}
function hexToBytes(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  const len = hex.length;
  if (len % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + len);
  const array = new Uint8Array(len / 2);
  for (let i = 0; i < array.length; i++) {
    const j = i * 2;
    const hexByte = hex.slice(j, j + 2);
    const byte = Number.parseInt(hexByte, 16);
    if (Number.isNaN(byte) || byte < 0)
      throw new Error("Invalid byte sequence");
    array[i] = byte;
  }
  return array;
}
function bytesToNumberBE(bytes2) {
  return hexToNumber(bytesToHex(bytes2));
}
function bytesToNumberLE(bytes2) {
  if (!u8a2(bytes2))
    throw new Error("Uint8Array expected");
  return hexToNumber(bytesToHex(Uint8Array.from(bytes2).reverse()));
}
function numberToBytesBE(n, len) {
  return hexToBytes(n.toString(16).padStart(len * 2, "0"));
}
function numberToBytesLE(n, len) {
  return numberToBytesBE(n, len).reverse();
}
function numberToVarBytesBE(n) {
  return hexToBytes(numberToHexUnpadded(n));
}
function ensureBytes(title, hex, expectedLength) {
  let res;
  if (typeof hex === "string") {
    try {
      res = hexToBytes(hex);
    } catch (e) {
      throw new Error(`${title} must be valid hex string, got "${hex}". Cause: ${e}`);
    }
  } else if (u8a2(hex)) {
    res = Uint8Array.from(hex);
  } else {
    throw new Error(`${title} must be hex string or Uint8Array`);
  }
  const len = res.length;
  if (typeof expectedLength === "number" && len !== expectedLength)
    throw new Error(`${title} expected ${expectedLength} bytes, got ${len}`);
  return res;
}
function concatBytes2(...arrays) {
  const r = new Uint8Array(arrays.reduce((sum, a) => sum + a.length, 0));
  let pad = 0;
  arrays.forEach((a) => {
    if (!u8a2(a))
      throw new Error("Uint8Array expected");
    r.set(a, pad);
    pad += a.length;
  });
  return r;
}
function equalBytes(b1, b2) {
  if (b1.length !== b2.length)
    return false;
  for (let i = 0; i < b1.length; i++)
    if (b1[i] !== b2[i])
      return false;
  return true;
}
function utf8ToBytes3(str) {
  if (typeof str !== "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
  return new Uint8Array(new TextEncoder().encode(str));
}
function bitLen(n) {
  let len;
  for (len = 0; n > _0n; n >>= _1n, len += 1)
    ;
  return len;
}
function bitGet(n, pos) {
  return n >> BigInt(pos) & _1n;
}
var bitSet = (n, pos, value) => {
  return n | (value ? _1n : _0n) << BigInt(pos);
};
var bitMask = (n) => (_2n << BigInt(n - 1)) - _1n;
var u8n = (data) => new Uint8Array(data);
var u8fr = (arr) => Uint8Array.from(arr);
function createHmacDrbg(hashLen, qByteLen, hmacFn) {
  if (typeof hashLen !== "number" || hashLen < 2)
    throw new Error("hashLen must be a number");
  if (typeof qByteLen !== "number" || qByteLen < 2)
    throw new Error("qByteLen must be a number");
  if (typeof hmacFn !== "function")
    throw new Error("hmacFn must be a function");
  let v = u8n(hashLen);
  let k = u8n(hashLen);
  let i = 0;
  const reset = () => {
    v.fill(1);
    k.fill(0);
    i = 0;
  };
  const h = (...b) => hmacFn(k, v, ...b);
  const reseed = (seed = u8n()) => {
    k = h(u8fr([0]), seed);
    v = h();
    if (seed.length === 0)
      return;
    k = h(u8fr([1]), seed);
    v = h();
  };
  const gen = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let len = 0;
    const out = [];
    while (len < qByteLen) {
      v = h();
      const sl = v.slice();
      out.push(sl);
      len += v.length;
    }
    return concatBytes2(...out);
  };
  const genUntil = (seed, pred) => {
    reset();
    reseed(seed);
    let res = void 0;
    while (!(res = pred(gen())))
      reseed();
    reset();
    return res;
  };
  return genUntil;
}
var validatorFns = {
  bigint: (val) => typeof val === "bigint",
  function: (val) => typeof val === "function",
  boolean: (val) => typeof val === "boolean",
  string: (val) => typeof val === "string",
  stringOrUint8Array: (val) => typeof val === "string" || val instanceof Uint8Array,
  isSafeInteger: (val) => Number.isSafeInteger(val),
  array: (val) => Array.isArray(val),
  field: (val, object) => object.Fp.isValid(val),
  hash: (val) => typeof val === "function" && Number.isSafeInteger(val.outputLen)
};
function validateObject(object, validators, optValidators = {}) {
  const checkField = (fieldName, type7, isOptional) => {
    const checkVal = validatorFns[type7];
    if (typeof checkVal !== "function")
      throw new Error(`Invalid validator "${type7}", expected function`);
    const val = object[fieldName];
    if (isOptional && val === void 0)
      return;
    if (!checkVal(val, object)) {
      throw new Error(`Invalid param ${String(fieldName)}=${val} (${typeof val}), expected ${type7}`);
    }
  };
  for (const [fieldName, type7] of Object.entries(validators))
    checkField(fieldName, type7, false);
  for (const [fieldName, type7] of Object.entries(optValidators))
    checkField(fieldName, type7, true);
  return object;
}

// node_modules/@noble/curves/esm/abstract/modular.js
var _0n2 = BigInt(0);
var _1n2 = BigInt(1);
var _2n2 = BigInt(2);
var _3n = BigInt(3);
var _4n = BigInt(4);
var _5n = BigInt(5);
var _8n = BigInt(8);
var _9n = BigInt(9);
var _16n = BigInt(16);
function mod2(a, b) {
  const result = a % b;
  return result >= _0n2 ? result : b + result;
}
function pow(num, power, modulo) {
  if (modulo <= _0n2 || power < _0n2)
    throw new Error("Expected power/modulo > 0");
  if (modulo === _1n2)
    return _0n2;
  let res = _1n2;
  while (power > _0n2) {
    if (power & _1n2)
      res = res * num % modulo;
    num = num * num % modulo;
    power >>= _1n2;
  }
  return res;
}
function pow2(x, power, modulo) {
  let res = x;
  while (power-- > _0n2) {
    res *= res;
    res %= modulo;
  }
  return res;
}
function invert(number2, modulo) {
  if (number2 === _0n2 || modulo <= _0n2) {
    throw new Error(`invert: expected positive integers, got n=${number2} mod=${modulo}`);
  }
  let a = mod2(number2, modulo);
  let b = modulo;
  let x = _0n2, y = _1n2, u = _1n2, v = _0n2;
  while (a !== _0n2) {
    const q = b / a;
    const r = b % a;
    const m = x - u * q;
    const n = y - v * q;
    b = a, a = r, x = u, y = v, u = m, v = n;
  }
  const gcd = b;
  if (gcd !== _1n2)
    throw new Error("invert: does not exist");
  return mod2(x, modulo);
}
function tonelliShanks(P) {
  const legendreC = (P - _1n2) / _2n2;
  let Q, S, Z;
  for (Q = P - _1n2, S = 0; Q % _2n2 === _0n2; Q /= _2n2, S++)
    ;
  for (Z = _2n2; Z < P && pow(Z, legendreC, P) !== P - _1n2; Z++)
    ;
  if (S === 1) {
    const p1div4 = (P + _1n2) / _4n;
    return function tonelliFast(Fp3, n) {
      const root = Fp3.pow(n, p1div4);
      if (!Fp3.eql(Fp3.sqr(root), n))
        throw new Error("Cannot find square root");
      return root;
    };
  }
  const Q1div2 = (Q + _1n2) / _2n2;
  return function tonelliSlow(Fp3, n) {
    if (Fp3.pow(n, legendreC) === Fp3.neg(Fp3.ONE))
      throw new Error("Cannot find square root");
    let r = S;
    let g = Fp3.pow(Fp3.mul(Fp3.ONE, Z), Q);
    let x = Fp3.pow(n, Q1div2);
    let b = Fp3.pow(n, Q);
    while (!Fp3.eql(b, Fp3.ONE)) {
      if (Fp3.eql(b, Fp3.ZERO))
        return Fp3.ZERO;
      let m = 1;
      for (let t2 = Fp3.sqr(b); m < r; m++) {
        if (Fp3.eql(t2, Fp3.ONE))
          break;
        t2 = Fp3.sqr(t2);
      }
      const ge = Fp3.pow(g, _1n2 << BigInt(r - m - 1));
      g = Fp3.sqr(ge);
      x = Fp3.mul(x, ge);
      b = Fp3.mul(b, g);
      r = m;
    }
    return x;
  };
}
function FpSqrt(P) {
  if (P % _4n === _3n) {
    const p1div4 = (P + _1n2) / _4n;
    return function sqrt3mod4(Fp3, n) {
      const root = Fp3.pow(n, p1div4);
      if (!Fp3.eql(Fp3.sqr(root), n))
        throw new Error("Cannot find square root");
      return root;
    };
  }
  if (P % _8n === _5n) {
    const c1 = (P - _5n) / _8n;
    return function sqrt5mod8(Fp3, n) {
      const n2 = Fp3.mul(n, _2n2);
      const v = Fp3.pow(n2, c1);
      const nv = Fp3.mul(n, v);
      const i = Fp3.mul(Fp3.mul(nv, _2n2), v);
      const root = Fp3.mul(nv, Fp3.sub(i, Fp3.ONE));
      if (!Fp3.eql(Fp3.sqr(root), n))
        throw new Error("Cannot find square root");
      return root;
    };
  }
  if (P % _16n === _9n) {
  }
  return tonelliShanks(P);
}
var isNegativeLE = (num, modulo) => (mod2(num, modulo) & _1n2) === _1n2;
var FIELD_FIELDS = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function validateField(field) {
  const initial = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  };
  const opts = FIELD_FIELDS.reduce((map, val) => {
    map[val] = "function";
    return map;
  }, initial);
  return validateObject(field, opts);
}
function FpPow(f, num, power) {
  if (power < _0n2)
    throw new Error("Expected power > 0");
  if (power === _0n2)
    return f.ONE;
  if (power === _1n2)
    return num;
  let p = f.ONE;
  let d = num;
  while (power > _0n2) {
    if (power & _1n2)
      p = f.mul(p, d);
    d = f.sqr(d);
    power >>= _1n2;
  }
  return p;
}
function FpInvertBatch(f, nums) {
  const tmp = new Array(nums.length);
  const lastMultiplied = nums.reduce((acc, num, i) => {
    if (f.is0(num))
      return acc;
    tmp[i] = acc;
    return f.mul(acc, num);
  }, f.ONE);
  const inverted = f.inv(lastMultiplied);
  nums.reduceRight((acc, num, i) => {
    if (f.is0(num))
      return acc;
    tmp[i] = f.mul(acc, tmp[i]);
    return f.mul(acc, num);
  }, inverted);
  return tmp;
}
function nLength(n, nBitLength) {
  const _nBitLength = nBitLength !== void 0 ? nBitLength : n.toString(2).length;
  const nByteLength = Math.ceil(_nBitLength / 8);
  return { nBitLength: _nBitLength, nByteLength };
}
function Field(ORDER, bitLen2, isLE2 = false, redef = {}) {
  if (ORDER <= _0n2)
    throw new Error(`Expected Field ORDER > 0, got ${ORDER}`);
  const { nBitLength: BITS, nByteLength: BYTES } = nLength(ORDER, bitLen2);
  if (BYTES > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const sqrtP = FpSqrt(ORDER);
  const f = Object.freeze({
    ORDER,
    BITS,
    BYTES,
    MASK: bitMask(BITS),
    ZERO: _0n2,
    ONE: _1n2,
    create: (num) => mod2(num, ORDER),
    isValid: (num) => {
      if (typeof num !== "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof num}`);
      return _0n2 <= num && num < ORDER;
    },
    is0: (num) => num === _0n2,
    isOdd: (num) => (num & _1n2) === _1n2,
    neg: (num) => mod2(-num, ORDER),
    eql: (lhs, rhs) => lhs === rhs,
    sqr: (num) => mod2(num * num, ORDER),
    add: (lhs, rhs) => mod2(lhs + rhs, ORDER),
    sub: (lhs, rhs) => mod2(lhs - rhs, ORDER),
    mul: (lhs, rhs) => mod2(lhs * rhs, ORDER),
    pow: (num, power) => FpPow(f, num, power),
    div: (lhs, rhs) => mod2(lhs * invert(rhs, ORDER), ORDER),
    sqrN: (num) => num * num,
    addN: (lhs, rhs) => lhs + rhs,
    subN: (lhs, rhs) => lhs - rhs,
    mulN: (lhs, rhs) => lhs * rhs,
    inv: (num) => invert(num, ORDER),
    sqrt: redef.sqrt || ((n) => sqrtP(f, n)),
    invertBatch: (lst) => FpInvertBatch(f, lst),
    cmov: (a, b, c) => c ? b : a,
    toBytes: (num) => isLE2 ? numberToBytesLE(num, BYTES) : numberToBytesBE(num, BYTES),
    fromBytes: (bytes2) => {
      if (bytes2.length !== BYTES)
        throw new Error(`Fp.fromBytes: expected ${BYTES}, got ${bytes2.length}`);
      return isLE2 ? bytesToNumberLE(bytes2) : bytesToNumberBE(bytes2);
    }
  });
  return Object.freeze(f);
}
function FpSqrtEven(Fp3, elm) {
  if (!Fp3.isOdd)
    throw new Error(`Field doesn't have isOdd`);
  const root = Fp3.sqrt(elm);
  return Fp3.isOdd(root) ? Fp3.neg(root) : root;
}
function getFieldBytesLength(fieldOrder) {
  if (typeof fieldOrder !== "bigint")
    throw new Error("field order must be bigint");
  const bitLength = fieldOrder.toString(2).length;
  return Math.ceil(bitLength / 8);
}
function getMinHashLength(fieldOrder) {
  const length3 = getFieldBytesLength(fieldOrder);
  return length3 + Math.ceil(length3 / 2);
}
function mapHashToField(key, fieldOrder, isLE2 = false) {
  const len = key.length;
  const fieldLen = getFieldBytesLength(fieldOrder);
  const minLen = getMinHashLength(fieldOrder);
  if (len < 16 || len < minLen || len > 1024)
    throw new Error(`expected ${minLen}-1024 bytes of input, got ${len}`);
  const num = isLE2 ? bytesToNumberBE(key) : bytesToNumberLE(key);
  const reduced = mod2(num, fieldOrder - _1n2) + _1n2;
  return isLE2 ? numberToBytesLE(reduced, fieldLen) : numberToBytesBE(reduced, fieldLen);
}

// node_modules/@noble/curves/esm/abstract/curve.js
init_node_globals();
var _0n3 = BigInt(0);
var _1n3 = BigInt(1);
function wNAF(c, bits2) {
  const constTimeNegate = (condition, item) => {
    const neg = item.negate();
    return condition ? neg : item;
  };
  const opts = (W) => {
    const windows = Math.ceil(bits2 / W) + 1;
    const windowSize = 2 ** (W - 1);
    return { windows, windowSize };
  };
  return {
    constTimeNegate,
    unsafeLadder(elm, n) {
      let p = c.ZERO;
      let d = elm;
      while (n > _0n3) {
        if (n & _1n3)
          p = p.add(d);
        d = d.double();
        n >>= _1n3;
      }
      return p;
    },
    precomputeWindow(elm, W) {
      const { windows, windowSize } = opts(W);
      const points = [];
      let p = elm;
      let base3 = p;
      for (let window2 = 0; window2 < windows; window2++) {
        base3 = p;
        points.push(base3);
        for (let i = 1; i < windowSize; i++) {
          base3 = base3.add(p);
          points.push(base3);
        }
        p = base3.double();
      }
      return points;
    },
    wNAF(W, precomputes, n) {
      const { windows, windowSize } = opts(W);
      let p = c.ZERO;
      let f = c.BASE;
      const mask = BigInt(2 ** W - 1);
      const maxNumber = 2 ** W;
      const shiftBy = BigInt(W);
      for (let window2 = 0; window2 < windows; window2++) {
        const offset = window2 * windowSize;
        let wbits = Number(n & mask);
        n >>= shiftBy;
        if (wbits > windowSize) {
          wbits -= maxNumber;
          n += _1n3;
        }
        const offset1 = offset;
        const offset2 = offset + Math.abs(wbits) - 1;
        const cond1 = window2 % 2 !== 0;
        const cond2 = wbits < 0;
        if (wbits === 0) {
          f = f.add(constTimeNegate(cond1, precomputes[offset1]));
        } else {
          p = p.add(constTimeNegate(cond2, precomputes[offset2]));
        }
      }
      return { p, f };
    },
    wNAFCached(P, precomputesMap, n, transform) {
      const W = P._WINDOW_SIZE || 1;
      let comp = precomputesMap.get(P);
      if (!comp) {
        comp = this.precomputeWindow(P, W);
        if (W !== 1) {
          precomputesMap.set(P, transform(comp));
        }
      }
      return this.wNAF(W, comp, n);
    }
  };
}
function validateBasic(curve) {
  validateField(curve.Fp);
  validateObject(curve, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  });
  return Object.freeze({
    ...nLength(curve.n, curve.nBitLength),
    ...curve,
    ...{ p: curve.Fp.ORDER }
  });
}

// node_modules/@noble/curves/esm/abstract/edwards.js
var _0n4 = BigInt(0);
var _1n4 = BigInt(1);
var _2n3 = BigInt(2);
var _8n2 = BigInt(8);
var VERIFY_DEFAULT = { zip215: true };
function validateOpts(curve) {
  const opts = validateBasic(curve);
  validateObject(curve, {
    hash: "function",
    a: "bigint",
    d: "bigint",
    randomBytes: "function"
  }, {
    adjustScalarBytes: "function",
    domain: "function",
    uvRatio: "function",
    mapToCurve: "function"
  });
  return Object.freeze({ ...opts });
}
function twistedEdwards(curveDef) {
  const CURVE = validateOpts(curveDef);
  const { Fp: Fp3, n: CURVE_ORDER, prehash, hash: cHash, randomBytes: randomBytes3, nByteLength, h: cofactor } = CURVE;
  const MASK = _2n3 << BigInt(nByteLength * 8) - _1n4;
  const modP = Fp3.create;
  const uvRatio2 = CURVE.uvRatio || ((u, v) => {
    try {
      return { isValid: true, value: Fp3.sqrt(u * Fp3.inv(v)) };
    } catch (e) {
      return { isValid: false, value: _0n4 };
    }
  });
  const adjustScalarBytes2 = CURVE.adjustScalarBytes || ((bytes2) => bytes2);
  const domain = CURVE.domain || ((data, ctx, phflag) => {
    if (ctx.length || phflag)
      throw new Error("Contexts/pre-hash are not supported");
    return data;
  });
  const inBig = (n) => typeof n === "bigint" && _0n4 < n;
  const inRange = (n, max) => inBig(n) && inBig(max) && n < max;
  const in0MaskRange = (n) => n === _0n4 || inRange(n, MASK);
  function assertInRange(n, max) {
    if (inRange(n, max))
      return n;
    throw new Error(`Expected valid scalar < ${max}, got ${typeof n} ${n}`);
  }
  function assertGE0(n) {
    return n === _0n4 ? n : assertInRange(n, CURVE_ORDER);
  }
  const pointPrecomputes = /* @__PURE__ */ new Map();
  function isPoint(other) {
    if (!(other instanceof Point2))
      throw new Error("ExtendedPoint expected");
  }
  class Point2 {
    constructor(ex, ey, ez, et) {
      this.ex = ex;
      this.ey = ey;
      this.ez = ez;
      this.et = et;
      if (!in0MaskRange(ex))
        throw new Error("x required");
      if (!in0MaskRange(ey))
        throw new Error("y required");
      if (!in0MaskRange(ez))
        throw new Error("z required");
      if (!in0MaskRange(et))
        throw new Error("t required");
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static fromAffine(p) {
      if (p instanceof Point2)
        throw new Error("extended point not allowed");
      const { x, y } = p || {};
      if (!in0MaskRange(x) || !in0MaskRange(y))
        throw new Error("invalid affine point");
      return new Point2(x, y, _1n4, modP(x * y));
    }
    static normalizeZ(points) {
      const toInv = Fp3.invertBatch(points.map((p) => p.ez));
      return points.map((p, i) => p.toAffine(toInv[i])).map(Point2.fromAffine);
    }
    _setWindowSize(windowSize) {
      this._WINDOW_SIZE = windowSize;
      pointPrecomputes.delete(this);
    }
    assertValidity() {
      const { a, d } = CURVE;
      if (this.is0())
        throw new Error("bad point: ZERO");
      const { ex: X, ey: Y, ez: Z, et: T } = this;
      const X2 = modP(X * X);
      const Y2 = modP(Y * Y);
      const Z2 = modP(Z * Z);
      const Z4 = modP(Z2 * Z2);
      const aX2 = modP(X2 * a);
      const left = modP(Z2 * modP(aX2 + Y2));
      const right = modP(Z4 + modP(d * modP(X2 * Y2)));
      if (left !== right)
        throw new Error("bad point: equation left != right (1)");
      const XY = modP(X * Y);
      const ZT = modP(Z * T);
      if (XY !== ZT)
        throw new Error("bad point: equation left != right (2)");
    }
    equals(other) {
      isPoint(other);
      const { ex: X1, ey: Y1, ez: Z1 } = this;
      const { ex: X2, ey: Y2, ez: Z2 } = other;
      const X1Z2 = modP(X1 * Z2);
      const X2Z1 = modP(X2 * Z1);
      const Y1Z2 = modP(Y1 * Z2);
      const Y2Z1 = modP(Y2 * Z1);
      return X1Z2 === X2Z1 && Y1Z2 === Y2Z1;
    }
    is0() {
      return this.equals(Point2.ZERO);
    }
    negate() {
      return new Point2(modP(-this.ex), this.ey, this.ez, modP(-this.et));
    }
    double() {
      const { a } = CURVE;
      const { ex: X1, ey: Y1, ez: Z1 } = this;
      const A = modP(X1 * X1);
      const B = modP(Y1 * Y1);
      const C = modP(_2n3 * modP(Z1 * Z1));
      const D = modP(a * A);
      const x1y1 = X1 + Y1;
      const E = modP(modP(x1y1 * x1y1) - A - B);
      const G2 = D + B;
      const F = G2 - C;
      const H = D - B;
      const X3 = modP(E * F);
      const Y3 = modP(G2 * H);
      const T3 = modP(E * H);
      const Z3 = modP(F * G2);
      return new Point2(X3, Y3, Z3, T3);
    }
    add(other) {
      isPoint(other);
      const { a, d } = CURVE;
      const { ex: X1, ey: Y1, ez: Z1, et: T1 } = this;
      const { ex: X2, ey: Y2, ez: Z2, et: T2 } = other;
      if (a === BigInt(-1)) {
        const A2 = modP((Y1 - X1) * (Y2 + X2));
        const B2 = modP((Y1 + X1) * (Y2 - X2));
        const F2 = modP(B2 - A2);
        if (F2 === _0n4)
          return this.double();
        const C2 = modP(Z1 * _2n3 * T2);
        const D2 = modP(T1 * _2n3 * Z2);
        const E2 = D2 + C2;
        const G3 = B2 + A2;
        const H2 = D2 - C2;
        const X32 = modP(E2 * F2);
        const Y32 = modP(G3 * H2);
        const T32 = modP(E2 * H2);
        const Z32 = modP(F2 * G3);
        return new Point2(X32, Y32, Z32, T32);
      }
      const A = modP(X1 * X2);
      const B = modP(Y1 * Y2);
      const C = modP(T1 * d * T2);
      const D = modP(Z1 * Z2);
      const E = modP((X1 + Y1) * (X2 + Y2) - A - B);
      const F = D - C;
      const G2 = D + C;
      const H = modP(B - a * A);
      const X3 = modP(E * F);
      const Y3 = modP(G2 * H);
      const T3 = modP(E * H);
      const Z3 = modP(F * G2);
      return new Point2(X3, Y3, Z3, T3);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    wNAF(n) {
      return wnaf.wNAFCached(this, pointPrecomputes, n, Point2.normalizeZ);
    }
    multiply(scalar) {
      const { p, f } = this.wNAF(assertInRange(scalar, CURVE_ORDER));
      return Point2.normalizeZ([p, f])[0];
    }
    multiplyUnsafe(scalar) {
      let n = assertGE0(scalar);
      if (n === _0n4)
        return I;
      if (this.equals(I) || n === _1n4)
        return this;
      if (this.equals(G))
        return this.wNAF(n).p;
      return wnaf.unsafeLadder(this, n);
    }
    isSmallOrder() {
      return this.multiplyUnsafe(cofactor).is0();
    }
    isTorsionFree() {
      return wnaf.unsafeLadder(this, CURVE_ORDER).is0();
    }
    toAffine(iz) {
      const { ex: x, ey: y, ez: z } = this;
      const is0 = this.is0();
      if (iz == null)
        iz = is0 ? _8n2 : Fp3.inv(z);
      const ax = modP(x * iz);
      const ay = modP(y * iz);
      const zz = modP(z * iz);
      if (is0)
        return { x: _0n4, y: _1n4 };
      if (zz !== _1n4)
        throw new Error("invZ was invalid");
      return { x: ax, y: ay };
    }
    clearCofactor() {
      const { h: cofactor2 } = CURVE;
      if (cofactor2 === _1n4)
        return this;
      return this.multiplyUnsafe(cofactor2);
    }
    static fromHex(hex, zip215 = false) {
      const { d, a } = CURVE;
      const len = Fp3.BYTES;
      hex = ensureBytes("pointHex", hex, len);
      const normed = hex.slice();
      const lastByte = hex[len - 1];
      normed[len - 1] = lastByte & ~128;
      const y = bytesToNumberLE(normed);
      if (y === _0n4) {
      } else {
        if (zip215)
          assertInRange(y, MASK);
        else
          assertInRange(y, Fp3.ORDER);
      }
      const y2 = modP(y * y);
      const u = modP(y2 - _1n4);
      const v = modP(d * y2 - a);
      let { isValid, value: x } = uvRatio2(u, v);
      if (!isValid)
        throw new Error("Point.fromHex: invalid y coordinate");
      const isXOdd = (x & _1n4) === _1n4;
      const isLastByteOdd = (lastByte & 128) !== 0;
      if (!zip215 && x === _0n4 && isLastByteOdd)
        throw new Error("Point.fromHex: x=0 and x_0=1");
      if (isLastByteOdd !== isXOdd)
        x = modP(-x);
      return Point2.fromAffine({ x, y });
    }
    static fromPrivateKey(privKey) {
      return getExtendedPublicKey(privKey).point;
    }
    toRawBytes() {
      const { x, y } = this.toAffine();
      const bytes2 = numberToBytesLE(y, Fp3.BYTES);
      bytes2[bytes2.length - 1] |= x & _1n4 ? 128 : 0;
      return bytes2;
    }
    toHex() {
      return bytesToHex(this.toRawBytes());
    }
  }
  Point2.BASE = new Point2(CURVE.Gx, CURVE.Gy, _1n4, modP(CURVE.Gx * CURVE.Gy));
  Point2.ZERO = new Point2(_0n4, _1n4, _1n4, _0n4);
  const { BASE: G, ZERO: I } = Point2;
  const wnaf = wNAF(Point2, nByteLength * 8);
  function modN(a) {
    return mod2(a, CURVE_ORDER);
  }
  function modN_LE(hash2) {
    return modN(bytesToNumberLE(hash2));
  }
  function getExtendedPublicKey(key) {
    const len = nByteLength;
    key = ensureBytes("private key", key, len);
    const hashed = ensureBytes("hashed private key", cHash(key), 2 * len);
    const head = adjustScalarBytes2(hashed.slice(0, len));
    const prefix = hashed.slice(len, 2 * len);
    const scalar = modN_LE(head);
    const point = G.multiply(scalar);
    const pointBytes = point.toRawBytes();
    return { head, prefix, scalar, point, pointBytes };
  }
  function getPublicKey(privKey) {
    return getExtendedPublicKey(privKey).pointBytes;
  }
  function hashDomainToScalar(context = new Uint8Array(), ...msgs) {
    const msg = concatBytes2(...msgs);
    return modN_LE(cHash(domain(msg, ensureBytes("context", context), !!prehash)));
  }
  function sign2(msg, privKey, options = {}) {
    msg = ensureBytes("message", msg);
    if (prehash)
      msg = prehash(msg);
    const { prefix, scalar, pointBytes } = getExtendedPublicKey(privKey);
    const r = hashDomainToScalar(options.context, prefix, msg);
    const R = G.multiply(r).toRawBytes();
    const k = hashDomainToScalar(options.context, R, pointBytes, msg);
    const s = modN(r + k * scalar);
    assertGE0(s);
    const res = concatBytes2(R, numberToBytesLE(s, Fp3.BYTES));
    return ensureBytes("result", res, nByteLength * 2);
  }
  const verifyOpts = VERIFY_DEFAULT;
  function verify2(sig, msg, publicKey, options = verifyOpts) {
    const { context, zip215 } = options;
    const len = Fp3.BYTES;
    sig = ensureBytes("signature", sig, 2 * len);
    msg = ensureBytes("message", msg);
    if (prehash)
      msg = prehash(msg);
    const s = bytesToNumberLE(sig.slice(len, 2 * len));
    let A, R, SB;
    try {
      A = Point2.fromHex(publicKey, zip215);
      R = Point2.fromHex(sig.slice(0, len), zip215);
      SB = G.multiplyUnsafe(s);
    } catch (error) {
      return false;
    }
    if (!zip215 && A.isSmallOrder())
      return false;
    const k = hashDomainToScalar(context, R.toRawBytes(), A.toRawBytes(), msg);
    const RkA = R.add(A.multiplyUnsafe(k));
    return RkA.subtract(SB).clearCofactor().equals(Point2.ZERO);
  }
  G._setWindowSize(8);
  const utils = {
    getExtendedPublicKey,
    randomPrivateKey: () => randomBytes3(Fp3.BYTES),
    precompute(windowSize = 8, point = Point2.BASE) {
      point._setWindowSize(windowSize);
      point.multiply(BigInt(3));
      return point;
    }
  };
  return {
    CURVE,
    getPublicKey,
    sign: sign2,
    verify: verify2,
    ExtendedPoint: Point2,
    utils
  };
}

// node_modules/@noble/curves/esm/ed25519.js
var ED25519_P = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949");
var ED25519_SQRT_M1 = BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
var _0n5 = BigInt(0);
var _1n5 = BigInt(1);
var _2n4 = BigInt(2);
var _5n2 = BigInt(5);
var _10n = BigInt(10);
var _20n = BigInt(20);
var _40n = BigInt(40);
var _80n = BigInt(80);
function ed25519_pow_2_252_3(x) {
  const P = ED25519_P;
  const x2 = x * x % P;
  const b2 = x2 * x % P;
  const b4 = pow2(b2, _2n4, P) * b2 % P;
  const b5 = pow2(b4, _1n5, P) * x % P;
  const b10 = pow2(b5, _5n2, P) * b5 % P;
  const b20 = pow2(b10, _10n, P) * b10 % P;
  const b40 = pow2(b20, _20n, P) * b20 % P;
  const b80 = pow2(b40, _40n, P) * b40 % P;
  const b160 = pow2(b80, _80n, P) * b80 % P;
  const b240 = pow2(b160, _80n, P) * b80 % P;
  const b250 = pow2(b240, _10n, P) * b10 % P;
  const pow_p_5_8 = pow2(b250, _2n4, P) * x % P;
  return { pow_p_5_8, b2 };
}
function adjustScalarBytes(bytes2) {
  bytes2[0] &= 248;
  bytes2[31] &= 127;
  bytes2[31] |= 64;
  return bytes2;
}
function uvRatio(u, v) {
  const P = ED25519_P;
  const v3 = mod2(v * v * v, P);
  const v7 = mod2(v3 * v3 * v, P);
  const pow3 = ed25519_pow_2_252_3(u * v7).pow_p_5_8;
  let x = mod2(u * v3 * pow3, P);
  const vx2 = mod2(v * x * x, P);
  const root1 = x;
  const root2 = mod2(x * ED25519_SQRT_M1, P);
  const useRoot1 = vx2 === u;
  const useRoot2 = vx2 === mod2(-u, P);
  const noRoot = vx2 === mod2(-u * ED25519_SQRT_M1, P);
  if (useRoot1)
    x = root1;
  if (useRoot2 || noRoot)
    x = root2;
  if (isNegativeLE(x, P))
    x = mod2(-x, P);
  return { isValid: useRoot1 || useRoot2, value: x };
}
var Fp = Field(ED25519_P, void 0, true);
var ed25519Defaults = {
  a: BigInt(-1),
  d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"),
  Fp,
  n: BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989"),
  h: BigInt(8),
  Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"),
  Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960"),
  hash: sha5122,
  randomBytes,
  adjustScalarBytes,
  uvRatio
};
var ed25519 = /* @__PURE__ */ twistedEdwards(ed25519Defaults);
function ed25519_domain(data, ctx, phflag) {
  if (ctx.length > 255)
    throw new Error("Context is too big");
  return concatBytes(utf8ToBytes2("SigEd25519 no Ed25519 collisions"), new Uint8Array([phflag ? 1 : 0, ctx.length]), ctx, data);
}
var ed25519ctx = /* @__PURE__ */ twistedEdwards({
  ...ed25519Defaults,
  domain: ed25519_domain
});
var ed25519ph = /* @__PURE__ */ twistedEdwards({
  ...ed25519Defaults,
  domain: ed25519_domain,
  prehash: sha5122
});
var ELL2_C1 = (Fp.ORDER + BigInt(3)) / BigInt(8);
var ELL2_C2 = Fp.pow(_2n4, ELL2_C1);
var ELL2_C3 = Fp.sqrt(Fp.neg(Fp.ONE));
var ELL2_C4 = (Fp.ORDER - BigInt(5)) / BigInt(8);
var ELL2_J = BigInt(486662);
var ELL2_C1_EDWARDS = FpSqrtEven(Fp, Fp.neg(BigInt(486664)));
var SQRT_AD_MINUS_ONE = BigInt("25063068953384623474111414158702152701244531502492656460079210482610430750235");
var INVSQRT_A_MINUS_D = BigInt("54469307008909316920995813868745141605393597292927456921205312896311721017578");
var ONE_MINUS_D_SQ = BigInt("1159843021668779879193775521855586647937357759715417654439879720876111806838");
var D_MINUS_ONE_SQ = BigInt("40440834346308536858101042469323190826248399146238708352240133220865137265952");
var MAX_255B = BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/keys/ed25519-browser.js
var PUBLIC_KEY_BYTE_LENGTH = 32;
var PRIVATE_KEY_BYTE_LENGTH = 64;
var KEYS_BYTE_LENGTH = 32;
async function generateKey() {
  const privateKeyRaw = ed25519.utils.randomPrivateKey();
  const publicKey = ed25519.getPublicKey(privateKeyRaw);
  const privateKey = concatKeys(privateKeyRaw, publicKey);
  return {
    privateKey,
    publicKey
  };
}
async function generateKeyFromSeed(seed) {
  if (seed.length !== KEYS_BYTE_LENGTH) {
    throw new TypeError('"seed" must be 32 bytes in length.');
  } else if (!(seed instanceof Uint8Array)) {
    throw new TypeError('"seed" must be a node.js Buffer, or Uint8Array.');
  }
  const privateKeyRaw = seed;
  const publicKey = ed25519.getPublicKey(privateKeyRaw);
  const privateKey = concatKeys(privateKeyRaw, publicKey);
  return {
    privateKey,
    publicKey
  };
}
async function hashAndSign(privateKey, msg) {
  const privateKeyRaw = privateKey.subarray(0, KEYS_BYTE_LENGTH);
  return ed25519.sign(msg, privateKeyRaw);
}
async function hashAndVerify(publicKey, sig, msg) {
  return ed25519.verify(sig, msg, publicKey);
}
function concatKeys(privateKeyRaw, publicKey) {
  const privateKey = new Uint8Array(PRIVATE_KEY_BYTE_LENGTH);
  for (let i = 0; i < KEYS_BYTE_LENGTH; i++) {
    privateKey[i] = privateKeyRaw[i];
    privateKey[KEYS_BYTE_LENGTH + i] = publicKey[i];
  }
  return privateKey;
}

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/keys/exporter.js
init_node_globals();

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/ciphers/aes-gcm.browser.js
init_node_globals();

// node_modules/@orbitdb/core/node_modules/uint8arrays/dist/src/concat.js
init_node_globals();
function concat2(arrays, length3) {
  if (length3 == null) {
    length3 = arrays.reduce((acc, curr) => acc + curr.length, 0);
  }
  const output2 = allocUnsafe(length3);
  let offset = 0;
  for (const arr of arrays) {
    output2.set(arr, offset);
    offset += arr.length;
  }
  return asUint8Array(output2);
}

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/ciphers/aes-gcm.browser.js
var derivedEmptyPasswordKey = { alg: "A128GCM", ext: true, k: "scm9jmO_4BJAgdwWGVulLg", key_ops: ["encrypt", "decrypt"], kty: "oct" };
function create5(opts) {
  const algorithm = opts?.algorithm ?? "AES-GCM";
  let keyLength = opts?.keyLength ?? 16;
  const nonceLength = opts?.nonceLength ?? 12;
  const digest2 = opts?.digest ?? "SHA-256";
  const saltLength = opts?.saltLength ?? 16;
  const iterations = opts?.iterations ?? 32767;
  const crypto3 = webcrypto_default.get();
  keyLength *= 8;
  async function encrypt2(data, password) {
    const salt = crypto3.getRandomValues(new Uint8Array(saltLength));
    const nonce = crypto3.getRandomValues(new Uint8Array(nonceLength));
    const aesGcm = { name: algorithm, iv: nonce };
    if (typeof password === "string") {
      password = fromString3(password);
    }
    let cryptoKey;
    if (password.length === 0) {
      cryptoKey = await crypto3.subtle.importKey("jwk", derivedEmptyPasswordKey, { name: "AES-GCM" }, true, ["encrypt"]);
      try {
        const deriveParams = { name: "PBKDF2", salt, iterations, hash: { name: digest2 } };
        const runtimeDerivedEmptyPassword = await crypto3.subtle.importKey("raw", password, { name: "PBKDF2" }, false, ["deriveKey"]);
        cryptoKey = await crypto3.subtle.deriveKey(deriveParams, runtimeDerivedEmptyPassword, { name: algorithm, length: keyLength }, true, ["encrypt"]);
      } catch {
        cryptoKey = await crypto3.subtle.importKey("jwk", derivedEmptyPasswordKey, { name: "AES-GCM" }, true, ["encrypt"]);
      }
    } else {
      const deriveParams = { name: "PBKDF2", salt, iterations, hash: { name: digest2 } };
      const rawKey = await crypto3.subtle.importKey("raw", password, { name: "PBKDF2" }, false, ["deriveKey"]);
      cryptoKey = await crypto3.subtle.deriveKey(deriveParams, rawKey, { name: algorithm, length: keyLength }, true, ["encrypt"]);
    }
    const ciphertext = await crypto3.subtle.encrypt(aesGcm, cryptoKey, data);
    return concat2([salt, aesGcm.iv, new Uint8Array(ciphertext)]);
  }
  async function decrypt2(data, password) {
    const salt = data.subarray(0, saltLength);
    const nonce = data.subarray(saltLength, saltLength + nonceLength);
    const ciphertext = data.subarray(saltLength + nonceLength);
    const aesGcm = { name: algorithm, iv: nonce };
    if (typeof password === "string") {
      password = fromString3(password);
    }
    let cryptoKey;
    if (password.length === 0) {
      try {
        const deriveParams = { name: "PBKDF2", salt, iterations, hash: { name: digest2 } };
        const runtimeDerivedEmptyPassword = await crypto3.subtle.importKey("raw", password, { name: "PBKDF2" }, false, ["deriveKey"]);
        cryptoKey = await crypto3.subtle.deriveKey(deriveParams, runtimeDerivedEmptyPassword, { name: algorithm, length: keyLength }, true, ["decrypt"]);
      } catch {
        cryptoKey = await crypto3.subtle.importKey("jwk", derivedEmptyPasswordKey, { name: "AES-GCM" }, true, ["decrypt"]);
      }
    } else {
      const deriveParams = { name: "PBKDF2", salt, iterations, hash: { name: digest2 } };
      const rawKey = await crypto3.subtle.importKey("raw", password, { name: "PBKDF2" }, false, ["deriveKey"]);
      cryptoKey = await crypto3.subtle.deriveKey(deriveParams, rawKey, { name: algorithm, length: keyLength }, true, ["decrypt"]);
    }
    const plaintext = await crypto3.subtle.decrypt(aesGcm, cryptoKey, ciphertext);
    return new Uint8Array(plaintext);
  }
  const cipher = {
    encrypt: encrypt2,
    decrypt: decrypt2
  };
  return cipher;
}

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/keys/exporter.js
async function exporter(privateKey, password) {
  const cipher = create5();
  const encryptedKey = await cipher.encrypt(privateKey, password);
  return base64.encode(encryptedKey);
}

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/keys/keys.js
var keys_exports = {};
__export(keys_exports, {
  KeyType: () => KeyType,
  PrivateKey: () => PrivateKey,
  PublicKey: () => PublicKey
});
init_node_globals();

// node_modules/protons-runtime/dist/src/index.js
init_node_globals();

// node_modules/protons-runtime/dist/src/decode.js
init_node_globals();

// node_modules/protons-runtime/dist/src/utils.js
init_node_globals();
var import_reader = __toESM(require_reader(), 1);
var import_reader_buffer = __toESM(require_reader_buffer(), 1);
var import_minimal = __toESM(require_minimal(), 1);
var import_writer = __toESM(require_writer(), 1);
var import_writer_buffer = __toESM(require_writer_buffer(), 1);
function configure() {
  import_minimal.default._configure();
  import_reader.default._configure(import_reader_buffer.default);
  import_writer.default._configure(import_writer_buffer.default);
}
configure();
var methods = [
  "uint64",
  "int64",
  "sint64",
  "fixed64",
  "sfixed64"
];
function patchReader(obj) {
  for (const method of methods) {
    if (obj[method] == null) {
      continue;
    }
    const original = obj[method];
    obj[method] = function() {
      return BigInt(original.call(this).toString());
    };
  }
  return obj;
}
function reader(buf2) {
  return patchReader(new import_reader.default(buf2));
}
function patchWriter(obj) {
  for (const method of methods) {
    if (obj[method] == null) {
      continue;
    }
    const original = obj[method];
    obj[method] = function(val) {
      return original.call(this, val.toString());
    };
  }
  return obj;
}
function writer() {
  return patchWriter(import_writer.default.create());
}

// node_modules/protons-runtime/dist/src/decode.js
function decodeMessage(buf2, codec5) {
  const r = reader(buf2 instanceof Uint8Array ? buf2 : buf2.subarray());
  return codec5.decode(r);
}

// node_modules/protons-runtime/dist/src/encode.js
init_node_globals();
function encodeMessage(message2, codec5) {
  const w = writer();
  codec5.encode(message2, w, {
    lengthDelimited: false
  });
  return w.finish();
}

// node_modules/protons-runtime/dist/src/codecs/enum.js
init_node_globals();

// node_modules/protons-runtime/dist/src/codec.js
init_node_globals();
var CODEC_TYPES;
(function(CODEC_TYPES2) {
  CODEC_TYPES2[CODEC_TYPES2["VARINT"] = 0] = "VARINT";
  CODEC_TYPES2[CODEC_TYPES2["BIT64"] = 1] = "BIT64";
  CODEC_TYPES2[CODEC_TYPES2["LENGTH_DELIMITED"] = 2] = "LENGTH_DELIMITED";
  CODEC_TYPES2[CODEC_TYPES2["START_GROUP"] = 3] = "START_GROUP";
  CODEC_TYPES2[CODEC_TYPES2["END_GROUP"] = 4] = "END_GROUP";
  CODEC_TYPES2[CODEC_TYPES2["BIT32"] = 5] = "BIT32";
})(CODEC_TYPES || (CODEC_TYPES = {}));
function createCodec2(name3, type7, encode10, decode14) {
  return {
    name: name3,
    type: type7,
    encode: encode10,
    decode: decode14
  };
}

// node_modules/protons-runtime/dist/src/codecs/enum.js
function enumeration(v) {
  function findValue(val) {
    if (v[val.toString()] == null) {
      throw new Error("Invalid enum value");
    }
    return v[val];
  }
  const encode10 = function enumEncode(val, writer2) {
    const enumValue = findValue(val);
    writer2.int32(enumValue);
  };
  const decode14 = function enumDecode(reader2) {
    const val = reader2.int32();
    return findValue(val);
  };
  return createCodec2("enum", CODEC_TYPES.VARINT, encode10, decode14);
}

// node_modules/protons-runtime/dist/src/codecs/message.js
init_node_globals();
function message(encode10, decode14) {
  return createCodec2("message", CODEC_TYPES.LENGTH_DELIMITED, encode10, decode14);
}

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/keys/keys.js
var KeyType;
(function(KeyType2) {
  KeyType2["RSA"] = "RSA";
  KeyType2["Ed25519"] = "Ed25519";
  KeyType2["Secp256k1"] = "Secp256k1";
})(KeyType || (KeyType = {}));
var __KeyTypeValues;
(function(__KeyTypeValues2) {
  __KeyTypeValues2[__KeyTypeValues2["RSA"] = 0] = "RSA";
  __KeyTypeValues2[__KeyTypeValues2["Ed25519"] = 1] = "Ed25519";
  __KeyTypeValues2[__KeyTypeValues2["Secp256k1"] = 2] = "Secp256k1";
})(__KeyTypeValues || (__KeyTypeValues = {}));
(function(KeyType2) {
  KeyType2.codec = () => {
    return enumeration(__KeyTypeValues);
  };
})(KeyType || (KeyType = {}));
var PublicKey;
(function(PublicKey2) {
  let _codec;
  PublicKey2.codec = () => {
    if (_codec == null) {
      _codec = message((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork();
        }
        if (obj.Type != null) {
          w.uint32(8);
          KeyType.codec().encode(obj.Type, w);
        }
        if (obj.Data != null) {
          w.uint32(18);
          w.bytes(obj.Data);
        }
        if (opts.lengthDelimited !== false) {
          w.ldelim();
        }
      }, (reader2, length3) => {
        const obj = {};
        const end = length3 == null ? reader2.len : reader2.pos + length3;
        while (reader2.pos < end) {
          const tag = reader2.uint32();
          switch (tag >>> 3) {
            case 1:
              obj.Type = KeyType.codec().decode(reader2);
              break;
            case 2:
              obj.Data = reader2.bytes();
              break;
            default:
              reader2.skipType(tag & 7);
              break;
          }
        }
        return obj;
      });
    }
    return _codec;
  };
  PublicKey2.encode = (obj) => {
    return encodeMessage(obj, PublicKey2.codec());
  };
  PublicKey2.decode = (buf2) => {
    return decodeMessage(buf2, PublicKey2.codec());
  };
})(PublicKey || (PublicKey = {}));
var PrivateKey;
(function(PrivateKey2) {
  let _codec;
  PrivateKey2.codec = () => {
    if (_codec == null) {
      _codec = message((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork();
        }
        if (obj.Type != null) {
          w.uint32(8);
          KeyType.codec().encode(obj.Type, w);
        }
        if (obj.Data != null) {
          w.uint32(18);
          w.bytes(obj.Data);
        }
        if (opts.lengthDelimited !== false) {
          w.ldelim();
        }
      }, (reader2, length3) => {
        const obj = {};
        const end = length3 == null ? reader2.len : reader2.pos + length3;
        while (reader2.pos < end) {
          const tag = reader2.uint32();
          switch (tag >>> 3) {
            case 1:
              obj.Type = KeyType.codec().decode(reader2);
              break;
            case 2:
              obj.Data = reader2.bytes();
              break;
            default:
              reader2.skipType(tag & 7);
              break;
          }
        }
        return obj;
      });
    }
    return _codec;
  };
  PrivateKey2.encode = (obj) => {
    return encodeMessage(obj, PrivateKey2.codec());
  };
  PrivateKey2.decode = (buf2) => {
    return decodeMessage(buf2, PrivateKey2.codec());
  };
})(PrivateKey || (PrivateKey = {}));

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/keys/ed25519-class.js
var Ed25519PublicKey = class {
  _key;
  constructor(key) {
    this._key = ensureKey(key, PUBLIC_KEY_BYTE_LENGTH);
  }
  async verify(data, sig) {
    return hashAndVerify(this._key, sig, data);
  }
  marshal() {
    return this._key;
  }
  get bytes() {
    return PublicKey.encode({
      Type: KeyType.Ed25519,
      Data: this.marshal()
    }).subarray();
  }
  equals(key) {
    return equals5(this.bytes, key.bytes);
  }
  async hash() {
    const { bytes: bytes2 } = await sha256.digest(this.bytes);
    return bytes2;
  }
};
var Ed25519PrivateKey = class {
  _key;
  _publicKey;
  constructor(key, publicKey) {
    this._key = ensureKey(key, PRIVATE_KEY_BYTE_LENGTH);
    this._publicKey = ensureKey(publicKey, PUBLIC_KEY_BYTE_LENGTH);
  }
  async sign(message2) {
    return hashAndSign(this._key, message2);
  }
  get public() {
    return new Ed25519PublicKey(this._publicKey);
  }
  marshal() {
    return this._key;
  }
  get bytes() {
    return PrivateKey.encode({
      Type: KeyType.Ed25519,
      Data: this.marshal()
    }).subarray();
  }
  equals(key) {
    return equals5(this.bytes, key.bytes);
  }
  async hash() {
    const { bytes: bytes2 } = await sha256.digest(this.bytes);
    return bytes2;
  }
  async id() {
    const encoding = identity2.digest(this.public.bytes);
    return base58btc.encode(encoding.bytes).substring(1);
  }
  async export(password, format3 = "libp2p-key") {
    if (format3 === "libp2p-key") {
      return exporter(this.bytes, password);
    } else {
      throw new CodeError(`export format '${format3}' is not supported`, "ERR_INVALID_EXPORT_FORMAT");
    }
  }
};
function unmarshalEd25519PrivateKey(bytes2) {
  if (bytes2.length > PRIVATE_KEY_BYTE_LENGTH) {
    bytes2 = ensureKey(bytes2, PRIVATE_KEY_BYTE_LENGTH + PUBLIC_KEY_BYTE_LENGTH);
    const privateKeyBytes2 = bytes2.subarray(0, PRIVATE_KEY_BYTE_LENGTH);
    const publicKeyBytes2 = bytes2.subarray(PRIVATE_KEY_BYTE_LENGTH, bytes2.length);
    return new Ed25519PrivateKey(privateKeyBytes2, publicKeyBytes2);
  }
  bytes2 = ensureKey(bytes2, PRIVATE_KEY_BYTE_LENGTH);
  const privateKeyBytes = bytes2.subarray(0, PRIVATE_KEY_BYTE_LENGTH);
  const publicKeyBytes = bytes2.subarray(PUBLIC_KEY_BYTE_LENGTH);
  return new Ed25519PrivateKey(privateKeyBytes, publicKeyBytes);
}
function unmarshalEd25519PublicKey(bytes2) {
  bytes2 = ensureKey(bytes2, PUBLIC_KEY_BYTE_LENGTH);
  return new Ed25519PublicKey(bytes2);
}
async function generateKeyPair() {
  const { privateKey, publicKey } = await generateKey();
  return new Ed25519PrivateKey(privateKey, publicKey);
}
async function generateKeyPairFromSeed(seed) {
  const { privateKey, publicKey } = await generateKeyFromSeed(seed);
  return new Ed25519PrivateKey(privateKey, publicKey);
}
function ensureKey(key, length3) {
  key = Uint8Array.from(key ?? []);
  if (key.length !== length3) {
    throw new CodeError(`Key must be a Uint8Array of length ${length3}, got ${key.length}`, "ERR_INVALID_KEY_TYPE");
  }
  return key;
}

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/keys/ephemeral-keys.js
init_node_globals();

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/keys/ecdh-browser.js
init_node_globals();

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/util.js
init_node_globals();
var import_util = __toESM(require_util(), 1);
var import_jsbn = __toESM(require_jsbn(), 1);
var import_forge2 = __toESM(require_forge(), 1);
function bigIntegerToUintBase64url(num, len) {
  let buf2 = Uint8Array.from(num.abs().toByteArray());
  buf2 = buf2[0] === 0 ? buf2.subarray(1) : buf2;
  if (len != null) {
    if (buf2.length > len)
      throw new Error("byte array longer than desired length");
    buf2 = concat2([new Uint8Array(len - buf2.length), buf2]);
  }
  return toString3(buf2, "base64url");
}
function base64urlToBigInteger(str) {
  const buf2 = base64urlToBuffer(str);
  return new import_forge2.default.jsbn.BigInteger(toString3(buf2, "base16"), 16);
}
function base64urlToBuffer(str, len) {
  let buf2 = fromString3(str, "base64urlpad");
  if (len != null) {
    if (buf2.length > len)
      throw new Error("byte array longer than desired length");
    buf2 = concat2([new Uint8Array(len - buf2.length), buf2]);
  }
  return buf2;
}

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/keys/ecdh-browser.js
var bits = {
  "P-256": 256,
  "P-384": 384,
  "P-521": 521
};
var curveTypes = Object.keys(bits);
var names = curveTypes.join(" / ");
async function generateEphmeralKeyPair(curve) {
  if (curve !== "P-256" && curve !== "P-384" && curve !== "P-521") {
    throw new CodeError(`Unknown curve: ${curve}. Must be ${names}`, "ERR_INVALID_CURVE");
  }
  const pair = await webcrypto_default.get().subtle.generateKey({
    name: "ECDH",
    namedCurve: curve
  }, true, ["deriveBits"]);
  const genSharedKey = async (theirPub, forcePrivate) => {
    let privateKey;
    if (forcePrivate != null) {
      privateKey = await webcrypto_default.get().subtle.importKey("jwk", unmarshalPrivateKey(curve, forcePrivate), {
        name: "ECDH",
        namedCurve: curve
      }, false, ["deriveBits"]);
    } else {
      privateKey = pair.privateKey;
    }
    const key = await webcrypto_default.get().subtle.importKey("jwk", unmarshalPublicKey(curve, theirPub), {
      name: "ECDH",
      namedCurve: curve
    }, false, []);
    const buffer2 = await webcrypto_default.get().subtle.deriveBits({
      name: "ECDH",
      namedCurve: curve,
      public: key
    }, privateKey, bits[curve]);
    return new Uint8Array(buffer2, 0, buffer2.byteLength);
  };
  const publicKey = await webcrypto_default.get().subtle.exportKey("jwk", pair.publicKey);
  const ecdhKey = {
    key: marshalPublicKey(publicKey),
    genSharedKey
  };
  return ecdhKey;
}
var curveLengths = {
  "P-256": 32,
  "P-384": 48,
  "P-521": 66
};
function marshalPublicKey(jwk) {
  if (jwk.crv == null || jwk.x == null || jwk.y == null) {
    throw new CodeError("JWK was missing components", "ERR_INVALID_PARAMETERS");
  }
  if (jwk.crv !== "P-256" && jwk.crv !== "P-384" && jwk.crv !== "P-521") {
    throw new CodeError(`Unknown curve: ${jwk.crv}. Must be ${names}`, "ERR_INVALID_CURVE");
  }
  const byteLen = curveLengths[jwk.crv];
  return concat2([
    Uint8Array.from([4]),
    base64urlToBuffer(jwk.x, byteLen),
    base64urlToBuffer(jwk.y, byteLen)
  ], 1 + byteLen * 2);
}
function unmarshalPublicKey(curve, key) {
  if (curve !== "P-256" && curve !== "P-384" && curve !== "P-521") {
    throw new CodeError(`Unknown curve: ${curve}. Must be ${names}`, "ERR_INVALID_CURVE");
  }
  const byteLen = curveLengths[curve];
  if (!equals5(key.subarray(0, 1), Uint8Array.from([4]))) {
    throw new CodeError("Cannot unmarshal public key - invalid key format", "ERR_INVALID_KEY_FORMAT");
  }
  return {
    kty: "EC",
    crv: curve,
    x: toString3(key.subarray(1, byteLen + 1), "base64url"),
    y: toString3(key.subarray(1 + byteLen), "base64url"),
    ext: true
  };
}
var unmarshalPrivateKey = (curve, key) => ({
  ...unmarshalPublicKey(curve, key.public),
  d: toString3(key.private, "base64url")
});

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/keys/ephemeral-keys.js
var ephemeral_keys_default = generateEphmeralKeyPair;

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/keys/importer.js
init_node_globals();
async function importer(privateKey, password) {
  const encryptedKey = base64.decode(privateKey);
  const cipher = create5();
  return cipher.decrypt(encryptedKey, password);
}

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/keys/key-stretcher.js
init_node_globals();
var cipherMap = {
  "AES-128": {
    ivSize: 16,
    keySize: 16
  },
  "AES-256": {
    ivSize: 16,
    keySize: 32
  },
  Blowfish: {
    ivSize: 8,
    keySize: 32
  }
};
async function keyStretcher(cipherType, hash2, secret) {
  const cipher = cipherMap[cipherType];
  if (cipher == null) {
    const allowed = Object.keys(cipherMap).join(" / ");
    throw new CodeError(`unknown cipher type '${cipherType}'. Must be ${allowed}`, "ERR_INVALID_CIPHER_TYPE");
  }
  if (hash2 == null) {
    throw new CodeError("missing hash type", "ERR_MISSING_HASH_TYPE");
  }
  const cipherKeySize = cipher.keySize;
  const ivSize = cipher.ivSize;
  const hmacKeySize = 20;
  const seed = fromString3("key expansion");
  const resultLength = 2 * (ivSize + cipherKeySize + hmacKeySize);
  const m = await create4(hash2, secret);
  let a = await m.digest(seed);
  const result = [];
  let j = 0;
  while (j < resultLength) {
    const b = await m.digest(concat2([a, seed]));
    let todo = b.length;
    if (j + todo > resultLength) {
      todo = resultLength - j;
    }
    result.push(b);
    j += todo;
    a = await m.digest(a);
  }
  const half = resultLength / 2;
  const resultBuffer = concat2(result);
  const r1 = resultBuffer.subarray(0, half);
  const r2 = resultBuffer.subarray(half, resultLength);
  const createKey = (res) => ({
    iv: res.subarray(0, ivSize),
    cipherKey: res.subarray(ivSize, ivSize + cipherKeySize),
    macKey: res.subarray(ivSize + cipherKeySize)
  });
  return {
    k1: createKey(r1),
    k2: createKey(r2)
  };
}

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/keys/rsa-class.js
var rsa_class_exports = {};
__export(rsa_class_exports, {
  MAX_KEY_SIZE: () => MAX_KEY_SIZE,
  RsaPrivateKey: () => RsaPrivateKey,
  RsaPublicKey: () => RsaPublicKey,
  fromJwk: () => fromJwk,
  generateKeyPair: () => generateKeyPair2,
  unmarshalRsaPrivateKey: () => unmarshalRsaPrivateKey,
  unmarshalRsaPublicKey: () => unmarshalRsaPublicKey
});
init_node_globals();
var import_forge5 = __toESM(require_forge(), 1);
var import_sha5122 = __toESM(require_sha512(), 1);

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/keys/rsa-browser.js
init_node_globals();

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/random-bytes.js
init_node_globals();
function randomBytes2(length3) {
  if (isNaN(length3) || length3 <= 0) {
    throw new CodeError("random bytes length must be a Number bigger than 0", "ERR_INVALID_LENGTH");
  }
  return randomBytes(length3);
}

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/keys/jwk2pem.js
init_node_globals();
var import_rsa = __toESM(require_rsa(), 1);
var import_forge3 = __toESM(require_forge(), 1);
function convert(key, types) {
  return types.map((t) => base64urlToBigInteger(key[t]));
}
function jwk2priv(key) {
  return import_forge3.default.pki.setRsaPrivateKey(...convert(key, ["n", "e", "d", "p", "q", "dp", "dq", "qi"]));
}
function jwk2pub(key) {
  return import_forge3.default.pki.setRsaPublicKey(...convert(key, ["n", "e"]));
}

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/keys/rsa-utils.js
var rsa_utils_exports = {};
__export(rsa_utils_exports, {
  jwkToPkcs1: () => jwkToPkcs1,
  jwkToPkix: () => jwkToPkix,
  pkcs1ToJwk: () => pkcs1ToJwk,
  pkixToJwk: () => pkixToJwk
});
init_node_globals();
var import_asn1 = __toESM(require_asn1(), 1);
var import_rsa2 = __toESM(require_rsa(), 1);
var import_forge4 = __toESM(require_forge(), 1);
function pkcs1ToJwk(bytes2) {
  const asn1 = import_forge4.default.asn1.fromDer(toString3(bytes2, "ascii"));
  const privateKey = import_forge4.default.pki.privateKeyFromAsn1(asn1);
  return {
    kty: "RSA",
    n: bigIntegerToUintBase64url(privateKey.n),
    e: bigIntegerToUintBase64url(privateKey.e),
    d: bigIntegerToUintBase64url(privateKey.d),
    p: bigIntegerToUintBase64url(privateKey.p),
    q: bigIntegerToUintBase64url(privateKey.q),
    dp: bigIntegerToUintBase64url(privateKey.dP),
    dq: bigIntegerToUintBase64url(privateKey.dQ),
    qi: bigIntegerToUintBase64url(privateKey.qInv),
    alg: "RS256"
  };
}
function jwkToPkcs1(jwk) {
  if (jwk.n == null || jwk.e == null || jwk.d == null || jwk.p == null || jwk.q == null || jwk.dp == null || jwk.dq == null || jwk.qi == null) {
    throw new CodeError("JWK was missing components", "ERR_INVALID_PARAMETERS");
  }
  const asn1 = import_forge4.default.pki.privateKeyToAsn1({
    n: base64urlToBigInteger(jwk.n),
    e: base64urlToBigInteger(jwk.e),
    d: base64urlToBigInteger(jwk.d),
    p: base64urlToBigInteger(jwk.p),
    q: base64urlToBigInteger(jwk.q),
    dP: base64urlToBigInteger(jwk.dp),
    dQ: base64urlToBigInteger(jwk.dq),
    qInv: base64urlToBigInteger(jwk.qi)
  });
  return fromString3(import_forge4.default.asn1.toDer(asn1).getBytes(), "ascii");
}
function pkixToJwk(bytes2) {
  const asn1 = import_forge4.default.asn1.fromDer(toString3(bytes2, "ascii"));
  const publicKey = import_forge4.default.pki.publicKeyFromAsn1(asn1);
  return {
    kty: "RSA",
    n: bigIntegerToUintBase64url(publicKey.n),
    e: bigIntegerToUintBase64url(publicKey.e)
  };
}
function jwkToPkix(jwk) {
  if (jwk.n == null || jwk.e == null) {
    throw new CodeError("JWK was missing components", "ERR_INVALID_PARAMETERS");
  }
  const asn1 = import_forge4.default.pki.publicKeyToAsn1({
    n: base64urlToBigInteger(jwk.n),
    e: base64urlToBigInteger(jwk.e)
  });
  return fromString3(import_forge4.default.asn1.toDer(asn1).getBytes(), "ascii");
}

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/keys/rsa-browser.js
async function generateKey2(bits2) {
  const pair = await webcrypto_default.get().subtle.generateKey({
    name: "RSASSA-PKCS1-v1_5",
    modulusLength: bits2,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: { name: "SHA-256" }
  }, true, ["sign", "verify"]);
  const keys = await exportKey(pair);
  return {
    privateKey: keys[0],
    publicKey: keys[1]
  };
}
async function unmarshalPrivateKey2(key) {
  const privateKey = await webcrypto_default.get().subtle.importKey("jwk", key, {
    name: "RSASSA-PKCS1-v1_5",
    hash: { name: "SHA-256" }
  }, true, ["sign"]);
  const pair = [
    privateKey,
    await derivePublicFromPrivate(key)
  ];
  const keys = await exportKey({
    privateKey: pair[0],
    publicKey: pair[1]
  });
  return {
    privateKey: keys[0],
    publicKey: keys[1]
  };
}
async function hashAndSign2(key, msg) {
  const privateKey = await webcrypto_default.get().subtle.importKey("jwk", key, {
    name: "RSASSA-PKCS1-v1_5",
    hash: { name: "SHA-256" }
  }, false, ["sign"]);
  const sig = await webcrypto_default.get().subtle.sign({ name: "RSASSA-PKCS1-v1_5" }, privateKey, Uint8Array.from(msg));
  return new Uint8Array(sig, 0, sig.byteLength);
}
async function hashAndVerify2(key, sig, msg) {
  const publicKey = await webcrypto_default.get().subtle.importKey("jwk", key, {
    name: "RSASSA-PKCS1-v1_5",
    hash: { name: "SHA-256" }
  }, false, ["verify"]);
  return webcrypto_default.get().subtle.verify({ name: "RSASSA-PKCS1-v1_5" }, publicKey, sig, msg);
}
async function exportKey(pair) {
  if (pair.privateKey == null || pair.publicKey == null) {
    throw new CodeError("Private and public key are required", "ERR_INVALID_PARAMETERS");
  }
  return Promise.all([
    webcrypto_default.get().subtle.exportKey("jwk", pair.privateKey),
    webcrypto_default.get().subtle.exportKey("jwk", pair.publicKey)
  ]);
}
async function derivePublicFromPrivate(jwKey) {
  return webcrypto_default.get().subtle.importKey("jwk", {
    kty: jwKey.kty,
    n: jwKey.n,
    e: jwKey.e
  }, {
    name: "RSASSA-PKCS1-v1_5",
    hash: { name: "SHA-256" }
  }, true, ["verify"]);
}
function convertKey(key, pub, msg, handle) {
  const fkey = pub ? jwk2pub(key) : jwk2priv(key);
  const fmsg = toString3(Uint8Array.from(msg), "ascii");
  const fomsg = handle(fmsg, fkey);
  return fromString3(fomsg, "ascii");
}
function encrypt(key, msg) {
  return convertKey(key, true, msg, (msg2, key2) => key2.encrypt(msg2));
}
function decrypt(key, msg) {
  return convertKey(key, false, msg, (msg2, key2) => key2.decrypt(msg2));
}
function keySize(jwk) {
  if (jwk.kty !== "RSA") {
    throw new CodeError("invalid key type", "ERR_INVALID_KEY_TYPE");
  } else if (jwk.n == null) {
    throw new CodeError("invalid key modulus", "ERR_INVALID_KEY_MODULUS");
  }
  const bytes2 = fromString3(jwk.n, "base64url");
  return bytes2.length * 8;
}

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/keys/rsa-class.js
var MAX_KEY_SIZE = 8192;
var RsaPublicKey = class {
  _key;
  constructor(key) {
    this._key = key;
  }
  async verify(data, sig) {
    return hashAndVerify2(this._key, sig, data);
  }
  marshal() {
    return rsa_utils_exports.jwkToPkix(this._key);
  }
  get bytes() {
    return PublicKey.encode({
      Type: KeyType.RSA,
      Data: this.marshal()
    }).subarray();
  }
  encrypt(bytes2) {
    return encrypt(this._key, bytes2);
  }
  equals(key) {
    return equals5(this.bytes, key.bytes);
  }
  async hash() {
    const { bytes: bytes2 } = await sha256.digest(this.bytes);
    return bytes2;
  }
};
var RsaPrivateKey = class {
  _key;
  _publicKey;
  constructor(key, publicKey) {
    this._key = key;
    this._publicKey = publicKey;
  }
  genSecret() {
    return randomBytes2(16);
  }
  async sign(message2) {
    return hashAndSign2(this._key, message2);
  }
  get public() {
    if (this._publicKey == null) {
      throw new CodeError("public key not provided", "ERR_PUBKEY_NOT_PROVIDED");
    }
    return new RsaPublicKey(this._publicKey);
  }
  decrypt(bytes2) {
    return decrypt(this._key, bytes2);
  }
  marshal() {
    return rsa_utils_exports.jwkToPkcs1(this._key);
  }
  get bytes() {
    return PrivateKey.encode({
      Type: KeyType.RSA,
      Data: this.marshal()
    }).subarray();
  }
  equals(key) {
    return equals5(this.bytes, key.bytes);
  }
  async hash() {
    const { bytes: bytes2 } = await sha256.digest(this.bytes);
    return bytes2;
  }
  async id() {
    const hash2 = await this.public.hash();
    return toString3(hash2, "base58btc");
  }
  async export(password, format3 = "pkcs-8") {
    if (format3 === "pkcs-8") {
      const buffer2 = new import_forge5.default.util.ByteBuffer(this.marshal());
      const asn1 = import_forge5.default.asn1.fromDer(buffer2);
      const privateKey = import_forge5.default.pki.privateKeyFromAsn1(asn1);
      const options = {
        algorithm: "aes256",
        count: 1e4,
        saltSize: 128 / 8,
        prfAlgorithm: "sha512"
      };
      return import_forge5.default.pki.encryptRsaPrivateKey(privateKey, password, options);
    } else if (format3 === "libp2p-key") {
      return exporter(this.bytes, password);
    } else {
      throw new CodeError(`export format '${format3}' is not supported`, "ERR_INVALID_EXPORT_FORMAT");
    }
  }
};
async function unmarshalRsaPrivateKey(bytes2) {
  const jwk = rsa_utils_exports.pkcs1ToJwk(bytes2);
  if (keySize(jwk) > MAX_KEY_SIZE) {
    throw new CodeError("key size is too large", "ERR_KEY_SIZE_TOO_LARGE");
  }
  const keys = await unmarshalPrivateKey2(jwk);
  return new RsaPrivateKey(keys.privateKey, keys.publicKey);
}
function unmarshalRsaPublicKey(bytes2) {
  const jwk = rsa_utils_exports.pkixToJwk(bytes2);
  if (keySize(jwk) > MAX_KEY_SIZE) {
    throw new CodeError("key size is too large", "ERR_KEY_SIZE_TOO_LARGE");
  }
  return new RsaPublicKey(jwk);
}
async function fromJwk(jwk) {
  if (keySize(jwk) > MAX_KEY_SIZE) {
    throw new CodeError("key size is too large", "ERR_KEY_SIZE_TOO_LARGE");
  }
  const keys = await unmarshalPrivateKey2(jwk);
  return new RsaPrivateKey(keys.privateKey, keys.publicKey);
}
async function generateKeyPair2(bits2) {
  if (bits2 > MAX_KEY_SIZE) {
    throw new CodeError("key size is too large", "ERR_KEY_SIZE_TOO_LARGE");
  }
  const keys = await generateKey2(bits2);
  return new RsaPrivateKey(keys.privateKey, keys.publicKey);
}

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/keys/secp256k1-class.js
var secp256k1_class_exports = {};
__export(secp256k1_class_exports, {
  Secp256k1PrivateKey: () => Secp256k1PrivateKey,
  Secp256k1PublicKey: () => Secp256k1PublicKey,
  generateKeyPair: () => generateKeyPair3,
  unmarshalSecp256k1PrivateKey: () => unmarshalSecp256k1PrivateKey,
  unmarshalSecp256k1PublicKey: () => unmarshalSecp256k1PublicKey
});
init_node_globals();

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/keys/secp256k1.js
init_node_globals();

// node_modules/@noble/curves/esm/secp256k1.js
init_node_globals();

// node_modules/@noble/hashes/esm/sha256.js
init_node_globals();
var Chi = (a, b, c) => a & b ^ ~a & c;
var Maj = (a, b, c) => a & b ^ a & c ^ b & c;
var SHA256_K = /* @__PURE__ */ new Uint32Array([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);
var IV = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]);
var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
var SHA256 = class extends SHA2 {
  constructor() {
    super(64, 32, 8, false);
    this.A = IV[0] | 0;
    this.B = IV[1] | 0;
    this.C = IV[2] | 0;
    this.D = IV[3] | 0;
    this.E = IV[4] | 0;
    this.F = IV[5] | 0;
    this.G = IV[6] | 0;
    this.H = IV[7] | 0;
  }
  get() {
    const { A, B, C, D, E, F, G, H } = this;
    return [A, B, C, D, E, F, G, H];
  }
  set(A, B, C, D, E, F, G, H) {
    this.A = A | 0;
    this.B = B | 0;
    this.C = C | 0;
    this.D = D | 0;
    this.E = E | 0;
    this.F = F | 0;
    this.G = G | 0;
    this.H = H | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4)
      SHA256_W[i] = view.getUint32(offset, false);
    for (let i = 16; i < 64; i++) {
      const W15 = SHA256_W[i - 15];
      const W2 = SHA256_W[i - 2];
      const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
      const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
      SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
    }
    let { A, B, C, D, E, F, G, H } = this;
    for (let i = 0; i < 64; i++) {
      const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
      const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
      const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
      const T2 = sigma0 + Maj(A, B, C) | 0;
      H = G;
      G = F;
      F = E;
      E = D + T1 | 0;
      D = C;
      C = B;
      B = A;
      A = T1 + T2 | 0;
    }
    A = A + this.A | 0;
    B = B + this.B | 0;
    C = C + this.C | 0;
    D = D + this.D | 0;
    E = E + this.E | 0;
    F = F + this.F | 0;
    G = G + this.G | 0;
    H = H + this.H | 0;
    this.set(A, B, C, D, E, F, G, H);
  }
  roundClean() {
    SHA256_W.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
    this.buffer.fill(0);
  }
};
var sha2562 = /* @__PURE__ */ wrapConstructor(() => new SHA256());

// node_modules/@noble/curves/esm/abstract/weierstrass.js
init_node_globals();
function validatePointOpts(curve) {
  const opts = validateBasic(curve);
  validateObject(opts, {
    a: "field",
    b: "field"
  }, {
    allowedPrivateKeyLengths: "array",
    wrapPrivateKey: "boolean",
    isTorsionFree: "function",
    clearCofactor: "function",
    allowInfinityPoint: "boolean",
    fromBytes: "function",
    toBytes: "function"
  });
  const { endo, Fp: Fp3, a } = opts;
  if (endo) {
    if (!Fp3.eql(a, Fp3.ZERO)) {
      throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");
    }
    if (typeof endo !== "object" || typeof endo.beta !== "bigint" || typeof endo.splitScalar !== "function") {
      throw new Error("Expected endomorphism with beta: bigint and splitScalar: function");
    }
  }
  return Object.freeze({ ...opts });
}
var { bytesToNumberBE: b2n, hexToBytes: h2b } = utils_exports;
var DER = {
  Err: class DERErr extends Error {
    constructor(m = "") {
      super(m);
    }
  },
  _parseInt(data) {
    const { Err: E } = DER;
    if (data.length < 2 || data[0] !== 2)
      throw new E("Invalid signature integer tag");
    const len = data[1];
    const res = data.subarray(2, len + 2);
    if (!len || res.length !== len)
      throw new E("Invalid signature integer: wrong length");
    if (res[0] & 128)
      throw new E("Invalid signature integer: negative");
    if (res[0] === 0 && !(res[1] & 128))
      throw new E("Invalid signature integer: unnecessary leading zero");
    return { d: b2n(res), l: data.subarray(len + 2) };
  },
  toSig(hex) {
    const { Err: E } = DER;
    const data = typeof hex === "string" ? h2b(hex) : hex;
    if (!(data instanceof Uint8Array))
      throw new Error("ui8a expected");
    let l = data.length;
    if (l < 2 || data[0] != 48)
      throw new E("Invalid signature tag");
    if (data[1] !== l - 2)
      throw new E("Invalid signature: incorrect length");
    const { d: r, l: sBytes } = DER._parseInt(data.subarray(2));
    const { d: s, l: rBytesLeft } = DER._parseInt(sBytes);
    if (rBytesLeft.length)
      throw new E("Invalid signature: left bytes after parsing");
    return { r, s };
  },
  hexFromSig(sig) {
    const slice2 = (s2) => Number.parseInt(s2[0], 16) & 8 ? "00" + s2 : s2;
    const h = (num) => {
      const hex = num.toString(16);
      return hex.length & 1 ? `0${hex}` : hex;
    };
    const s = slice2(h(sig.s));
    const r = slice2(h(sig.r));
    const shl = s.length / 2;
    const rhl = r.length / 2;
    const sl = h(shl);
    const rl = h(rhl);
    return `30${h(rhl + shl + 4)}02${rl}${r}02${sl}${s}`;
  }
};
var _0n6 = BigInt(0);
var _1n6 = BigInt(1);
var _2n5 = BigInt(2);
var _3n2 = BigInt(3);
var _4n2 = BigInt(4);
function weierstrassPoints(opts) {
  const CURVE = validatePointOpts(opts);
  const { Fp: Fp3 } = CURVE;
  const toBytes2 = CURVE.toBytes || ((_c, point, _isCompressed) => {
    const a = point.toAffine();
    return concatBytes2(Uint8Array.from([4]), Fp3.toBytes(a.x), Fp3.toBytes(a.y));
  });
  const fromBytes = CURVE.fromBytes || ((bytes2) => {
    const tail = bytes2.subarray(1);
    const x = Fp3.fromBytes(tail.subarray(0, Fp3.BYTES));
    const y = Fp3.fromBytes(tail.subarray(Fp3.BYTES, 2 * Fp3.BYTES));
    return { x, y };
  });
  function weierstrassEquation(x) {
    const { a, b } = CURVE;
    const x2 = Fp3.sqr(x);
    const x3 = Fp3.mul(x2, x);
    return Fp3.add(Fp3.add(x3, Fp3.mul(x, a)), b);
  }
  if (!Fp3.eql(Fp3.sqr(CURVE.Gy), weierstrassEquation(CURVE.Gx)))
    throw new Error("bad generator point: equation left != right");
  function isWithinCurveOrder(num) {
    return typeof num === "bigint" && _0n6 < num && num < CURVE.n;
  }
  function assertGE(num) {
    if (!isWithinCurveOrder(num))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function normPrivateKeyToScalar(key) {
    const { allowedPrivateKeyLengths: lengths, nByteLength, wrapPrivateKey, n } = CURVE;
    if (lengths && typeof key !== "bigint") {
      if (key instanceof Uint8Array)
        key = bytesToHex(key);
      if (typeof key !== "string" || !lengths.includes(key.length))
        throw new Error("Invalid key");
      key = key.padStart(nByteLength * 2, "0");
    }
    let num;
    try {
      num = typeof key === "bigint" ? key : bytesToNumberBE(ensureBytes("private key", key, nByteLength));
    } catch (error) {
      throw new Error(`private key must be ${nByteLength} bytes, hex or bigint, not ${typeof key}`);
    }
    if (wrapPrivateKey)
      num = mod2(num, n);
    assertGE(num);
    return num;
  }
  const pointPrecomputes = /* @__PURE__ */ new Map();
  function assertPrjPoint(other) {
    if (!(other instanceof Point2))
      throw new Error("ProjectivePoint expected");
  }
  class Point2 {
    constructor(px, py, pz) {
      this.px = px;
      this.py = py;
      this.pz = pz;
      if (px == null || !Fp3.isValid(px))
        throw new Error("x required");
      if (py == null || !Fp3.isValid(py))
        throw new Error("y required");
      if (pz == null || !Fp3.isValid(pz))
        throw new Error("z required");
    }
    static fromAffine(p) {
      const { x, y } = p || {};
      if (!p || !Fp3.isValid(x) || !Fp3.isValid(y))
        throw new Error("invalid affine point");
      if (p instanceof Point2)
        throw new Error("projective point not allowed");
      const is0 = (i) => Fp3.eql(i, Fp3.ZERO);
      if (is0(x) && is0(y))
        return Point2.ZERO;
      return new Point2(x, y, Fp3.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static normalizeZ(points) {
      const toInv = Fp3.invertBatch(points.map((p) => p.pz));
      return points.map((p, i) => p.toAffine(toInv[i])).map(Point2.fromAffine);
    }
    static fromHex(hex) {
      const P = Point2.fromAffine(fromBytes(ensureBytes("pointHex", hex)));
      P.assertValidity();
      return P;
    }
    static fromPrivateKey(privateKey) {
      return Point2.BASE.multiply(normPrivateKeyToScalar(privateKey));
    }
    _setWindowSize(windowSize) {
      this._WINDOW_SIZE = windowSize;
      pointPrecomputes.delete(this);
    }
    assertValidity() {
      if (this.is0()) {
        if (CURVE.allowInfinityPoint && !Fp3.is0(this.py))
          return;
        throw new Error("bad point: ZERO");
      }
      const { x, y } = this.toAffine();
      if (!Fp3.isValid(x) || !Fp3.isValid(y))
        throw new Error("bad point: x or y not FE");
      const left = Fp3.sqr(y);
      const right = weierstrassEquation(x);
      if (!Fp3.eql(left, right))
        throw new Error("bad point: equation left != right");
      if (!this.isTorsionFree())
        throw new Error("bad point: not in prime-order subgroup");
    }
    hasEvenY() {
      const { y } = this.toAffine();
      if (Fp3.isOdd)
        return !Fp3.isOdd(y);
      throw new Error("Field doesn't support isOdd");
    }
    equals(other) {
      assertPrjPoint(other);
      const { px: X1, py: Y1, pz: Z1 } = this;
      const { px: X2, py: Y2, pz: Z2 } = other;
      const U1 = Fp3.eql(Fp3.mul(X1, Z2), Fp3.mul(X2, Z1));
      const U2 = Fp3.eql(Fp3.mul(Y1, Z2), Fp3.mul(Y2, Z1));
      return U1 && U2;
    }
    negate() {
      return new Point2(this.px, Fp3.neg(this.py), this.pz);
    }
    double() {
      const { a, b } = CURVE;
      const b3 = Fp3.mul(b, _3n2);
      const { px: X1, py: Y1, pz: Z1 } = this;
      let X3 = Fp3.ZERO, Y3 = Fp3.ZERO, Z3 = Fp3.ZERO;
      let t0 = Fp3.mul(X1, X1);
      let t1 = Fp3.mul(Y1, Y1);
      let t2 = Fp3.mul(Z1, Z1);
      let t3 = Fp3.mul(X1, Y1);
      t3 = Fp3.add(t3, t3);
      Z3 = Fp3.mul(X1, Z1);
      Z3 = Fp3.add(Z3, Z3);
      X3 = Fp3.mul(a, Z3);
      Y3 = Fp3.mul(b3, t2);
      Y3 = Fp3.add(X3, Y3);
      X3 = Fp3.sub(t1, Y3);
      Y3 = Fp3.add(t1, Y3);
      Y3 = Fp3.mul(X3, Y3);
      X3 = Fp3.mul(t3, X3);
      Z3 = Fp3.mul(b3, Z3);
      t2 = Fp3.mul(a, t2);
      t3 = Fp3.sub(t0, t2);
      t3 = Fp3.mul(a, t3);
      t3 = Fp3.add(t3, Z3);
      Z3 = Fp3.add(t0, t0);
      t0 = Fp3.add(Z3, t0);
      t0 = Fp3.add(t0, t2);
      t0 = Fp3.mul(t0, t3);
      Y3 = Fp3.add(Y3, t0);
      t2 = Fp3.mul(Y1, Z1);
      t2 = Fp3.add(t2, t2);
      t0 = Fp3.mul(t2, t3);
      X3 = Fp3.sub(X3, t0);
      Z3 = Fp3.mul(t2, t1);
      Z3 = Fp3.add(Z3, Z3);
      Z3 = Fp3.add(Z3, Z3);
      return new Point2(X3, Y3, Z3);
    }
    add(other) {
      assertPrjPoint(other);
      const { px: X1, py: Y1, pz: Z1 } = this;
      const { px: X2, py: Y2, pz: Z2 } = other;
      let X3 = Fp3.ZERO, Y3 = Fp3.ZERO, Z3 = Fp3.ZERO;
      const a = CURVE.a;
      const b3 = Fp3.mul(CURVE.b, _3n2);
      let t0 = Fp3.mul(X1, X2);
      let t1 = Fp3.mul(Y1, Y2);
      let t2 = Fp3.mul(Z1, Z2);
      let t3 = Fp3.add(X1, Y1);
      let t4 = Fp3.add(X2, Y2);
      t3 = Fp3.mul(t3, t4);
      t4 = Fp3.add(t0, t1);
      t3 = Fp3.sub(t3, t4);
      t4 = Fp3.add(X1, Z1);
      let t5 = Fp3.add(X2, Z2);
      t4 = Fp3.mul(t4, t5);
      t5 = Fp3.add(t0, t2);
      t4 = Fp3.sub(t4, t5);
      t5 = Fp3.add(Y1, Z1);
      X3 = Fp3.add(Y2, Z2);
      t5 = Fp3.mul(t5, X3);
      X3 = Fp3.add(t1, t2);
      t5 = Fp3.sub(t5, X3);
      Z3 = Fp3.mul(a, t4);
      X3 = Fp3.mul(b3, t2);
      Z3 = Fp3.add(X3, Z3);
      X3 = Fp3.sub(t1, Z3);
      Z3 = Fp3.add(t1, Z3);
      Y3 = Fp3.mul(X3, Z3);
      t1 = Fp3.add(t0, t0);
      t1 = Fp3.add(t1, t0);
      t2 = Fp3.mul(a, t2);
      t4 = Fp3.mul(b3, t4);
      t1 = Fp3.add(t1, t2);
      t2 = Fp3.sub(t0, t2);
      t2 = Fp3.mul(a, t2);
      t4 = Fp3.add(t4, t2);
      t0 = Fp3.mul(t1, t4);
      Y3 = Fp3.add(Y3, t0);
      t0 = Fp3.mul(t5, t4);
      X3 = Fp3.mul(t3, X3);
      X3 = Fp3.sub(X3, t0);
      t0 = Fp3.mul(t3, t1);
      Z3 = Fp3.mul(t5, Z3);
      Z3 = Fp3.add(Z3, t0);
      return new Point2(X3, Y3, Z3);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    is0() {
      return this.equals(Point2.ZERO);
    }
    wNAF(n) {
      return wnaf.wNAFCached(this, pointPrecomputes, n, (comp) => {
        const toInv = Fp3.invertBatch(comp.map((p) => p.pz));
        return comp.map((p, i) => p.toAffine(toInv[i])).map(Point2.fromAffine);
      });
    }
    multiplyUnsafe(n) {
      const I = Point2.ZERO;
      if (n === _0n6)
        return I;
      assertGE(n);
      if (n === _1n6)
        return this;
      const { endo } = CURVE;
      if (!endo)
        return wnaf.unsafeLadder(this, n);
      let { k1neg, k1, k2neg, k2 } = endo.splitScalar(n);
      let k1p = I;
      let k2p = I;
      let d = this;
      while (k1 > _0n6 || k2 > _0n6) {
        if (k1 & _1n6)
          k1p = k1p.add(d);
        if (k2 & _1n6)
          k2p = k2p.add(d);
        d = d.double();
        k1 >>= _1n6;
        k2 >>= _1n6;
      }
      if (k1neg)
        k1p = k1p.negate();
      if (k2neg)
        k2p = k2p.negate();
      k2p = new Point2(Fp3.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
      return k1p.add(k2p);
    }
    multiply(scalar) {
      assertGE(scalar);
      let n = scalar;
      let point, fake;
      const { endo } = CURVE;
      if (endo) {
        const { k1neg, k1, k2neg, k2 } = endo.splitScalar(n);
        let { p: k1p, f: f1p } = this.wNAF(k1);
        let { p: k2p, f: f2p } = this.wNAF(k2);
        k1p = wnaf.constTimeNegate(k1neg, k1p);
        k2p = wnaf.constTimeNegate(k2neg, k2p);
        k2p = new Point2(Fp3.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
        point = k1p.add(k2p);
        fake = f1p.add(f2p);
      } else {
        const { p, f } = this.wNAF(n);
        point = p;
        fake = f;
      }
      return Point2.normalizeZ([point, fake])[0];
    }
    multiplyAndAddUnsafe(Q, a, b) {
      const G = Point2.BASE;
      const mul = (P, a2) => a2 === _0n6 || a2 === _1n6 || !P.equals(G) ? P.multiplyUnsafe(a2) : P.multiply(a2);
      const sum = mul(this, a).add(mul(Q, b));
      return sum.is0() ? void 0 : sum;
    }
    toAffine(iz) {
      const { px: x, py: y, pz: z } = this;
      const is0 = this.is0();
      if (iz == null)
        iz = is0 ? Fp3.ONE : Fp3.inv(z);
      const ax = Fp3.mul(x, iz);
      const ay = Fp3.mul(y, iz);
      const zz = Fp3.mul(z, iz);
      if (is0)
        return { x: Fp3.ZERO, y: Fp3.ZERO };
      if (!Fp3.eql(zz, Fp3.ONE))
        throw new Error("invZ was invalid");
      return { x: ax, y: ay };
    }
    isTorsionFree() {
      const { h: cofactor, isTorsionFree } = CURVE;
      if (cofactor === _1n6)
        return true;
      if (isTorsionFree)
        return isTorsionFree(Point2, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: cofactor, clearCofactor } = CURVE;
      if (cofactor === _1n6)
        return this;
      if (clearCofactor)
        return clearCofactor(Point2, this);
      return this.multiplyUnsafe(CURVE.h);
    }
    toRawBytes(isCompressed = true) {
      this.assertValidity();
      return toBytes2(Point2, this, isCompressed);
    }
    toHex(isCompressed = true) {
      return bytesToHex(this.toRawBytes(isCompressed));
    }
  }
  Point2.BASE = new Point2(CURVE.Gx, CURVE.Gy, Fp3.ONE);
  Point2.ZERO = new Point2(Fp3.ZERO, Fp3.ONE, Fp3.ZERO);
  const _bits = CURVE.nBitLength;
  const wnaf = wNAF(Point2, CURVE.endo ? Math.ceil(_bits / 2) : _bits);
  return {
    CURVE,
    ProjectivePoint: Point2,
    normPrivateKeyToScalar,
    weierstrassEquation,
    isWithinCurveOrder
  };
}
function validateOpts2(curve) {
  const opts = validateBasic(curve);
  validateObject(opts, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  });
  return Object.freeze({ lowS: true, ...opts });
}
function weierstrass(curveDef) {
  const CURVE = validateOpts2(curveDef);
  const { Fp: Fp3, n: CURVE_ORDER } = CURVE;
  const compressedLen = Fp3.BYTES + 1;
  const uncompressedLen = 2 * Fp3.BYTES + 1;
  function isValidFieldElement(num) {
    return _0n6 < num && num < Fp3.ORDER;
  }
  function modN(a) {
    return mod2(a, CURVE_ORDER);
  }
  function invN(a) {
    return invert(a, CURVE_ORDER);
  }
  const { ProjectivePoint: Point2, normPrivateKeyToScalar, weierstrassEquation, isWithinCurveOrder } = weierstrassPoints({
    ...CURVE,
    toBytes(_c, point, isCompressed) {
      const a = point.toAffine();
      const x = Fp3.toBytes(a.x);
      const cat = concatBytes2;
      if (isCompressed) {
        return cat(Uint8Array.from([point.hasEvenY() ? 2 : 3]), x);
      } else {
        return cat(Uint8Array.from([4]), x, Fp3.toBytes(a.y));
      }
    },
    fromBytes(bytes2) {
      const len = bytes2.length;
      const head = bytes2[0];
      const tail = bytes2.subarray(1);
      if (len === compressedLen && (head === 2 || head === 3)) {
        const x = bytesToNumberBE(tail);
        if (!isValidFieldElement(x))
          throw new Error("Point is not on curve");
        const y2 = weierstrassEquation(x);
        let y = Fp3.sqrt(y2);
        const isYOdd = (y & _1n6) === _1n6;
        const isHeadOdd = (head & 1) === 1;
        if (isHeadOdd !== isYOdd)
          y = Fp3.neg(y);
        return { x, y };
      } else if (len === uncompressedLen && head === 4) {
        const x = Fp3.fromBytes(tail.subarray(0, Fp3.BYTES));
        const y = Fp3.fromBytes(tail.subarray(Fp3.BYTES, 2 * Fp3.BYTES));
        return { x, y };
      } else {
        throw new Error(`Point of length ${len} was invalid. Expected ${compressedLen} compressed bytes or ${uncompressedLen} uncompressed bytes`);
      }
    }
  });
  const numToNByteStr = (num) => bytesToHex(numberToBytesBE(num, CURVE.nByteLength));
  function isBiggerThanHalfOrder(number2) {
    const HALF = CURVE_ORDER >> _1n6;
    return number2 > HALF;
  }
  function normalizeS(s) {
    return isBiggerThanHalfOrder(s) ? modN(-s) : s;
  }
  const slcNum = (b, from4, to) => bytesToNumberBE(b.slice(from4, to));
  class Signature {
    constructor(r, s, recovery) {
      this.r = r;
      this.s = s;
      this.recovery = recovery;
      this.assertValidity();
    }
    static fromCompact(hex) {
      const l = CURVE.nByteLength;
      hex = ensureBytes("compactSignature", hex, l * 2);
      return new Signature(slcNum(hex, 0, l), slcNum(hex, l, 2 * l));
    }
    static fromDER(hex) {
      const { r, s } = DER.toSig(ensureBytes("DER", hex));
      return new Signature(r, s);
    }
    assertValidity() {
      if (!isWithinCurveOrder(this.r))
        throw new Error("r must be 0 < r < CURVE.n");
      if (!isWithinCurveOrder(this.s))
        throw new Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(recovery) {
      return new Signature(this.r, this.s, recovery);
    }
    recoverPublicKey(msgHash) {
      const { r, s, recovery: rec } = this;
      const h = bits2int_modN(ensureBytes("msgHash", msgHash));
      if (rec == null || ![0, 1, 2, 3].includes(rec))
        throw new Error("recovery id invalid");
      const radj = rec === 2 || rec === 3 ? r + CURVE.n : r;
      if (radj >= Fp3.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const prefix = (rec & 1) === 0 ? "02" : "03";
      const R = Point2.fromHex(prefix + numToNByteStr(radj));
      const ir = invN(radj);
      const u1 = modN(-h * ir);
      const u2 = modN(s * ir);
      const Q = Point2.BASE.multiplyAndAddUnsafe(R, u1, u2);
      if (!Q)
        throw new Error("point at infinify");
      Q.assertValidity();
      return Q;
    }
    hasHighS() {
      return isBiggerThanHalfOrder(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new Signature(this.r, modN(-this.s), this.recovery) : this;
    }
    toDERRawBytes() {
      return hexToBytes(this.toDERHex());
    }
    toDERHex() {
      return DER.hexFromSig({ r: this.r, s: this.s });
    }
    toCompactRawBytes() {
      return hexToBytes(this.toCompactHex());
    }
    toCompactHex() {
      return numToNByteStr(this.r) + numToNByteStr(this.s);
    }
  }
  const utils = {
    isValidPrivateKey(privateKey) {
      try {
        normPrivateKeyToScalar(privateKey);
        return true;
      } catch (error) {
        return false;
      }
    },
    normPrivateKeyToScalar,
    randomPrivateKey: () => {
      const length3 = getMinHashLength(CURVE.n);
      return mapHashToField(CURVE.randomBytes(length3), CURVE.n);
    },
    precompute(windowSize = 8, point = Point2.BASE) {
      point._setWindowSize(windowSize);
      point.multiply(BigInt(3));
      return point;
    }
  };
  function getPublicKey(privateKey, isCompressed = true) {
    return Point2.fromPrivateKey(privateKey).toRawBytes(isCompressed);
  }
  function isProbPub(item) {
    const arr = item instanceof Uint8Array;
    const str = typeof item === "string";
    const len = (arr || str) && item.length;
    if (arr)
      return len === compressedLen || len === uncompressedLen;
    if (str)
      return len === 2 * compressedLen || len === 2 * uncompressedLen;
    if (item instanceof Point2)
      return true;
    return false;
  }
  function getSharedSecret(privateA, publicB, isCompressed = true) {
    if (isProbPub(privateA))
      throw new Error("first arg must be private key");
    if (!isProbPub(publicB))
      throw new Error("second arg must be public key");
    const b = Point2.fromHex(publicB);
    return b.multiply(normPrivateKeyToScalar(privateA)).toRawBytes(isCompressed);
  }
  const bits2int = CURVE.bits2int || function(bytes2) {
    const num = bytesToNumberBE(bytes2);
    const delta = bytes2.length * 8 - CURVE.nBitLength;
    return delta > 0 ? num >> BigInt(delta) : num;
  };
  const bits2int_modN = CURVE.bits2int_modN || function(bytes2) {
    return modN(bits2int(bytes2));
  };
  const ORDER_MASK = bitMask(CURVE.nBitLength);
  function int2octets(num) {
    if (typeof num !== "bigint")
      throw new Error("bigint expected");
    if (!(_0n6 <= num && num < ORDER_MASK))
      throw new Error(`bigint expected < 2^${CURVE.nBitLength}`);
    return numberToBytesBE(num, CURVE.nByteLength);
  }
  function prepSig(msgHash, privateKey, opts = defaultSigOpts) {
    if (["recovered", "canonical"].some((k) => k in opts))
      throw new Error("sign() legacy options not supported");
    const { hash: hash2, randomBytes: randomBytes3 } = CURVE;
    let { lowS, prehash, extraEntropy: ent } = opts;
    if (lowS == null)
      lowS = true;
    msgHash = ensureBytes("msgHash", msgHash);
    if (prehash)
      msgHash = ensureBytes("prehashed msgHash", hash2(msgHash));
    const h1int = bits2int_modN(msgHash);
    const d = normPrivateKeyToScalar(privateKey);
    const seedArgs = [int2octets(d), int2octets(h1int)];
    if (ent != null) {
      const e = ent === true ? randomBytes3(Fp3.BYTES) : ent;
      seedArgs.push(ensureBytes("extraEntropy", e));
    }
    const seed = concatBytes2(...seedArgs);
    const m = h1int;
    function k2sig(kBytes) {
      const k = bits2int(kBytes);
      if (!isWithinCurveOrder(k))
        return;
      const ik = invN(k);
      const q = Point2.BASE.multiply(k).toAffine();
      const r = modN(q.x);
      if (r === _0n6)
        return;
      const s = modN(ik * modN(m + r * d));
      if (s === _0n6)
        return;
      let recovery = (q.x === r ? 0 : 2) | Number(q.y & _1n6);
      let normS = s;
      if (lowS && isBiggerThanHalfOrder(s)) {
        normS = normalizeS(s);
        recovery ^= 1;
      }
      return new Signature(r, normS, recovery);
    }
    return { seed, k2sig };
  }
  const defaultSigOpts = { lowS: CURVE.lowS, prehash: false };
  const defaultVerOpts = { lowS: CURVE.lowS, prehash: false };
  function sign2(msgHash, privKey, opts = defaultSigOpts) {
    const { seed, k2sig } = prepSig(msgHash, privKey, opts);
    const C = CURVE;
    const drbg = createHmacDrbg(C.hash.outputLen, C.nByteLength, C.hmac);
    return drbg(seed, k2sig);
  }
  Point2.BASE._setWindowSize(8);
  function verify2(signature, msgHash, publicKey, opts = defaultVerOpts) {
    const sg = signature;
    msgHash = ensureBytes("msgHash", msgHash);
    publicKey = ensureBytes("publicKey", publicKey);
    if ("strict" in opts)
      throw new Error("options.strict was renamed to lowS");
    const { lowS, prehash } = opts;
    let _sig = void 0;
    let P;
    try {
      if (typeof sg === "string" || sg instanceof Uint8Array) {
        try {
          _sig = Signature.fromDER(sg);
        } catch (derError) {
          if (!(derError instanceof DER.Err))
            throw derError;
          _sig = Signature.fromCompact(sg);
        }
      } else if (typeof sg === "object" && typeof sg.r === "bigint" && typeof sg.s === "bigint") {
        const { r: r2, s: s2 } = sg;
        _sig = new Signature(r2, s2);
      } else {
        throw new Error("PARSE");
      }
      P = Point2.fromHex(publicKey);
    } catch (error) {
      if (error.message === "PARSE")
        throw new Error(`signature must be Signature instance, Uint8Array or hex string`);
      return false;
    }
    if (lowS && _sig.hasHighS())
      return false;
    if (prehash)
      msgHash = CURVE.hash(msgHash);
    const { r, s } = _sig;
    const h = bits2int_modN(msgHash);
    const is2 = invN(s);
    const u1 = modN(h * is2);
    const u2 = modN(r * is2);
    const R = Point2.BASE.multiplyAndAddUnsafe(P, u1, u2)?.toAffine();
    if (!R)
      return false;
    const v = modN(R.x);
    return v === r;
  }
  return {
    CURVE,
    getPublicKey,
    getSharedSecret,
    sign: sign2,
    verify: verify2,
    ProjectivePoint: Point2,
    Signature,
    utils
  };
}

// node_modules/@noble/curves/esm/_shortw_utils.js
init_node_globals();

// node_modules/@noble/hashes/esm/hmac.js
init_node_globals();
var HMAC = class extends Hash {
  constructor(hash2, _key) {
    super();
    this.finished = false;
    this.destroyed = false;
    hash(hash2);
    const key = toBytes(_key);
    this.iHash = hash2.create();
    if (typeof this.iHash.update !== "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen;
    this.outputLen = this.iHash.outputLen;
    const blockLen = this.blockLen;
    const pad = new Uint8Array(blockLen);
    pad.set(key.length > blockLen ? hash2.create().update(key).digest() : key);
    for (let i = 0; i < pad.length; i++)
      pad[i] ^= 54;
    this.iHash.update(pad);
    this.oHash = hash2.create();
    for (let i = 0; i < pad.length; i++)
      pad[i] ^= 54 ^ 92;
    this.oHash.update(pad);
    pad.fill(0);
  }
  update(buf2) {
    exists(this);
    this.iHash.update(buf2);
    return this;
  }
  digestInto(out) {
    exists(this);
    bytes(out, this.outputLen);
    this.finished = true;
    this.iHash.digestInto(out);
    this.oHash.update(out);
    this.oHash.digestInto(out);
    this.destroy();
  }
  digest() {
    const out = new Uint8Array(this.oHash.outputLen);
    this.digestInto(out);
    return out;
  }
  _cloneInto(to) {
    to || (to = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
    to = to;
    to.finished = finished;
    to.destroyed = destroyed;
    to.blockLen = blockLen;
    to.outputLen = outputLen;
    to.oHash = oHash._cloneInto(to.oHash);
    to.iHash = iHash._cloneInto(to.iHash);
    return to;
  }
  destroy() {
    this.destroyed = true;
    this.oHash.destroy();
    this.iHash.destroy();
  }
};
var hmac = (hash2, key, message2) => new HMAC(hash2, key).update(message2).digest();
hmac.create = (hash2, key) => new HMAC(hash2, key);

// node_modules/@noble/curves/esm/_shortw_utils.js
function getHash(hash2) {
  return {
    hash: hash2,
    hmac: (key, ...msgs) => hmac(hash2, key, concatBytes(...msgs)),
    randomBytes
  };
}
function createCurve(curveDef, defHash) {
  const create6 = (hash2) => weierstrass({ ...curveDef, ...getHash(hash2) });
  return Object.freeze({ ...create6(defHash), create: create6 });
}

// node_modules/@noble/curves/esm/secp256k1.js
var secp256k1P = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f");
var secp256k1N = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
var _1n7 = BigInt(1);
var _2n6 = BigInt(2);
var divNearest = (a, b) => (a + b / _2n6) / b;
function sqrtMod(y) {
  const P = secp256k1P;
  const _3n3 = BigInt(3), _6n = BigInt(6), _11n = BigInt(11), _22n = BigInt(22);
  const _23n = BigInt(23), _44n = BigInt(44), _88n = BigInt(88);
  const b2 = y * y * y % P;
  const b3 = b2 * b2 * y % P;
  const b6 = pow2(b3, _3n3, P) * b3 % P;
  const b9 = pow2(b6, _3n3, P) * b3 % P;
  const b11 = pow2(b9, _2n6, P) * b2 % P;
  const b22 = pow2(b11, _11n, P) * b11 % P;
  const b44 = pow2(b22, _22n, P) * b22 % P;
  const b88 = pow2(b44, _44n, P) * b44 % P;
  const b176 = pow2(b88, _88n, P) * b88 % P;
  const b220 = pow2(b176, _44n, P) * b44 % P;
  const b223 = pow2(b220, _3n3, P) * b3 % P;
  const t1 = pow2(b223, _23n, P) * b22 % P;
  const t2 = pow2(t1, _6n, P) * b2 % P;
  const root = pow2(t2, _2n6, P);
  if (!Fp2.eql(Fp2.sqr(root), y))
    throw new Error("Cannot find square root");
  return root;
}
var Fp2 = Field(secp256k1P, void 0, void 0, { sqrt: sqrtMod });
var secp256k1 = createCurve({
  a: BigInt(0),
  b: BigInt(7),
  Fp: Fp2,
  n: secp256k1N,
  Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
  Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
  h: BigInt(1),
  lowS: true,
  endo: {
    beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
    splitScalar: (k) => {
      const n = secp256k1N;
      const a1 = BigInt("0x3086d221a7d46bcde86c90e49284eb15");
      const b1 = -_1n7 * BigInt("0xe4437ed6010e88286f547fa90abfe4c3");
      const a2 = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8");
      const b2 = a1;
      const POW_2_128 = BigInt("0x100000000000000000000000000000000");
      const c1 = divNearest(b2 * k, n);
      const c2 = divNearest(-b1 * k, n);
      let k1 = mod2(k - c1 * a1 - c2 * a2, n);
      let k2 = mod2(-c1 * b1 - c2 * b2, n);
      const k1neg = k1 > POW_2_128;
      const k2neg = k2 > POW_2_128;
      if (k1neg)
        k1 = n - k1;
      if (k2neg)
        k2 = n - k2;
      if (k1 > POW_2_128 || k2 > POW_2_128) {
        throw new Error("splitScalar: Endomorphism failed, k=" + k);
      }
      return { k1neg, k1, k2neg, k2 };
    }
  }
}, sha2562);
var _0n7 = BigInt(0);
var Point = secp256k1.ProjectivePoint;

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/keys/secp256k1.js
function generateKey3() {
  return secp256k1.utils.randomPrivateKey();
}
async function hashAndSign3(key, msg) {
  const { digest: digest2 } = await sha256.digest(msg);
  try {
    const signature = secp256k1.sign(digest2, key);
    return signature.toDERRawBytes();
  } catch (err) {
    throw new CodeError(String(err), "ERR_INVALID_INPUT");
  }
}
async function hashAndVerify3(key, sig, msg) {
  try {
    const { digest: digest2 } = await sha256.digest(msg);
    return secp256k1.verify(sig, digest2, key);
  } catch (err) {
    throw new CodeError(String(err), "ERR_INVALID_INPUT");
  }
}
function compressPublicKey(key) {
  const point = secp256k1.ProjectivePoint.fromHex(key).toRawBytes(true);
  return point;
}
function validatePrivateKey(key) {
  try {
    secp256k1.getPublicKey(key, true);
  } catch (err) {
    throw new CodeError(String(err), "ERR_INVALID_PRIVATE_KEY");
  }
}
function validatePublicKey(key) {
  try {
    secp256k1.ProjectivePoint.fromHex(key);
  } catch (err) {
    throw new CodeError(String(err), "ERR_INVALID_PUBLIC_KEY");
  }
}
function computePublicKey(privateKey) {
  try {
    return secp256k1.getPublicKey(privateKey, true);
  } catch (err) {
    throw new CodeError(String(err), "ERR_INVALID_PRIVATE_KEY");
  }
}

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/keys/secp256k1-class.js
var Secp256k1PublicKey = class {
  _key;
  constructor(key) {
    validatePublicKey(key);
    this._key = key;
  }
  async verify(data, sig) {
    return hashAndVerify3(this._key, sig, data);
  }
  marshal() {
    return compressPublicKey(this._key);
  }
  get bytes() {
    return PublicKey.encode({
      Type: KeyType.Secp256k1,
      Data: this.marshal()
    }).subarray();
  }
  equals(key) {
    return equals5(this.bytes, key.bytes);
  }
  async hash() {
    const { bytes: bytes2 } = await sha256.digest(this.bytes);
    return bytes2;
  }
};
var Secp256k1PrivateKey = class {
  _key;
  _publicKey;
  constructor(key, publicKey) {
    this._key = key;
    this._publicKey = publicKey ?? computePublicKey(key);
    validatePrivateKey(this._key);
    validatePublicKey(this._publicKey);
  }
  async sign(message2) {
    return hashAndSign3(this._key, message2);
  }
  get public() {
    return new Secp256k1PublicKey(this._publicKey);
  }
  marshal() {
    return this._key;
  }
  get bytes() {
    return PrivateKey.encode({
      Type: KeyType.Secp256k1,
      Data: this.marshal()
    }).subarray();
  }
  equals(key) {
    return equals5(this.bytes, key.bytes);
  }
  async hash() {
    const { bytes: bytes2 } = await sha256.digest(this.bytes);
    return bytes2;
  }
  async id() {
    const hash2 = await this.public.hash();
    return toString3(hash2, "base58btc");
  }
  async export(password, format3 = "libp2p-key") {
    if (format3 === "libp2p-key") {
      return exporter(this.bytes, password);
    } else {
      throw new CodeError(`export format '${format3}' is not supported`, "ERR_INVALID_EXPORT_FORMAT");
    }
  }
};
function unmarshalSecp256k1PrivateKey(bytes2) {
  return new Secp256k1PrivateKey(bytes2);
}
function unmarshalSecp256k1PublicKey(bytes2) {
  return new Secp256k1PublicKey(bytes2);
}
async function generateKeyPair3() {
  const privateKeyBytes = generateKey3();
  return new Secp256k1PrivateKey(privateKeyBytes);
}

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/keys/index.js
var supportedKeys = {
  rsa: rsa_class_exports,
  ed25519: ed25519_class_exports,
  secp256k1: secp256k1_class_exports
};
function unsupportedKey(type7) {
  const supported = Object.keys(supportedKeys).join(" / ");
  return new CodeError(`invalid or unsupported key type ${type7}. Must be ${supported}`, "ERR_UNSUPPORTED_KEY_TYPE");
}
function typeToKey(type7) {
  type7 = type7.toLowerCase();
  if (type7 === "rsa" || type7 === "ed25519" || type7 === "secp256k1") {
    return supportedKeys[type7];
  }
  throw unsupportedKey(type7);
}
async function generateKeyPair4(type7, bits2) {
  return typeToKey(type7).generateKeyPair(bits2 ?? 2048);
}
async function generateKeyPairFromSeed2(type7, seed, bits2) {
  if (type7.toLowerCase() !== "ed25519") {
    throw new CodeError("Seed key derivation is unimplemented for RSA or secp256k1", "ERR_UNSUPPORTED_KEY_DERIVATION_TYPE");
  }
  return generateKeyPairFromSeed(seed);
}
function unmarshalPublicKey2(buf2) {
  const decoded = PublicKey.decode(buf2);
  const data = decoded.Data ?? new Uint8Array();
  switch (decoded.Type) {
    case KeyType.RSA:
      return supportedKeys.rsa.unmarshalRsaPublicKey(data);
    case KeyType.Ed25519:
      return supportedKeys.ed25519.unmarshalEd25519PublicKey(data);
    case KeyType.Secp256k1:
      return supportedKeys.secp256k1.unmarshalSecp256k1PublicKey(data);
    default:
      throw unsupportedKey(decoded.Type ?? "unknown");
  }
}
function marshalPublicKey2(key, type7) {
  type7 = (type7 ?? "rsa").toLowerCase();
  typeToKey(type7);
  return key.bytes;
}
async function unmarshalPrivateKey3(buf2) {
  const decoded = PrivateKey.decode(buf2);
  const data = decoded.Data ?? new Uint8Array();
  switch (decoded.Type) {
    case KeyType.RSA:
      return supportedKeys.rsa.unmarshalRsaPrivateKey(data);
    case KeyType.Ed25519:
      return supportedKeys.ed25519.unmarshalEd25519PrivateKey(data);
    case KeyType.Secp256k1:
      return supportedKeys.secp256k1.unmarshalSecp256k1PrivateKey(data);
    default:
      throw unsupportedKey(decoded.Type ?? "RSA");
  }
}
function marshalPrivateKey(key, type7) {
  type7 = (type7 ?? "rsa").toLowerCase();
  typeToKey(type7);
  return key.bytes;
}
async function importKey(encryptedKey, password) {
  try {
    const key2 = await importer(encryptedKey, password);
    return await unmarshalPrivateKey3(key2);
  } catch (_) {
  }
  const key = import_forge6.default.pki.decryptRsaPrivateKey(encryptedKey, password);
  if (key === null) {
    throw new CodeError("Cannot read the key, most likely the password is wrong or not a RSA key", "ERR_CANNOT_DECRYPT_PEM");
  }
  let der = import_forge6.default.asn1.toDer(import_forge6.default.pki.privateKeyToAsn1(key));
  der = fromString3(der.getBytes(), "ascii");
  return supportedKeys.rsa.unmarshalRsaPrivateKey(der);
}

// node_modules/@orbitdb/core/node_modules/@libp2p/crypto/dist/src/pbkdf2.js
init_node_globals();
var import_pbkdf2 = __toESM(require_pbkdf2(), 1);
var import_util5 = __toESM(require_util(), 1);

// node_modules/@orbitdb/core/node_modules/uint8arrays/dist/src/compare.js
init_node_globals();
function compare2(a, b) {
  for (let i = 0; i < a.byteLength; i++) {
    if (a[i] < b[i]) {
      return -1;
    }
    if (a[i] > b[i]) {
      return 1;
    }
  }
  if (a.byteLength > b.byteLength) {
    return 1;
  }
  if (a.byteLength < b.byteLength) {
    return -1;
  }
  return 0;
}

// node_modules/@orbitdb/core/src/key-store.js
var unmarshal = keys_exports2.supportedKeys.secp256k1.unmarshalSecp256k1PrivateKey;
var unmarshalPubKey = keys_exports2.supportedKeys.secp256k1.unmarshalSecp256k1PublicKey;
var verifySignature = async (signature, publicKey, data) => {
  if (!signature) {
    throw new Error("No signature given");
  }
  if (!publicKey) {
    throw new Error("Given publicKey was undefined");
  }
  if (!data) {
    throw new Error("Given input data was undefined");
  }
  if (!(data instanceof Uint8Array)) {
    data = typeof data === "string" ? fromString3(data) : new Uint8Array(data);
  }
  const isValid = (key, msg, sig) => key.verify(msg, sig);
  let res = false;
  try {
    const pubKey = unmarshalPubKey(fromString3(publicKey, "base16"));
    res = await isValid(pubKey, data, fromString3(signature, "base16"));
  } catch (e) {
  }
  return Promise.resolve(res);
};
var signMessage = async (key, data) => {
  if (!key) {
    throw new Error("No signing key given");
  }
  if (!data) {
    throw new Error("Given input data was undefined");
  }
  if (!(data instanceof Uint8Array)) {
    data = typeof data === "string" ? fromString3(data) : new Uint8Array(data);
  }
  return toString3(await key.sign(data), "base16");
};
var verifiedCachePromise = lru_default({ size: 1e3 });
var verifyMessage = async (signature, publicKey, data) => {
  const verifiedCache = await verifiedCachePromise;
  const cached = await verifiedCache.get(signature);
  let res = false;
  if (!cached) {
    const verified = await verifySignature(signature, publicKey, data);
    res = verified;
    if (verified) {
      await verifiedCache.put(signature, { publicKey, data });
    }
  } else {
    const compare3 = (cached2, data2) => {
      const match = data2 instanceof Uint8Array ? compare2(cached2, data2) === 0 : cached2.toString() === data2.toString();
      return match;
    };
    res = cached.publicKey === publicKey && compare3(cached.data, data);
  }
  return res;
};
var defaultPath2 = "./keystore";
var KeyStore = async ({ storage, path } = {}) => {
  storage = storage || await composed_default(await lru_default({ size: 1e3 }), await level_default({ path: path || defaultPath2 }));
  const close = async () => {
    await storage.close();
  };
  const clear = async () => {
    await storage.clear();
  };
  const hasKey = async (id) => {
    if (!id) {
      throw new Error("id needed to check a key");
    }
    let hasKey2 = false;
    try {
      const storedKey = await storage.get("private_" + id);
      hasKey2 = storedKey !== void 0 && storedKey !== null;
    } catch (e) {
      console.error("Error: ENOENT: no such file or directory");
    }
    return hasKey2;
  };
  const addKey = async (id, key) => {
    await storage.put("private_" + id, key.privateKey);
  };
  const createKey = async (id) => {
    if (!id) {
      throw new Error("id needed to create a key");
    }
    const pair = await keys_exports2.generateKeyPair("secp256k1");
    const keys = await keys_exports2.unmarshalPrivateKey(pair.bytes);
    const pubKey = keys.public.marshal();
    const key = {
      publicKey: pubKey,
      privateKey: keys.marshal()
    };
    await addKey(id, key);
    return keys;
  };
  const getKey = async (id) => {
    if (!id) {
      throw new Error("id needed to get a key");
    }
    let storedKey;
    try {
      storedKey = await storage.get("private_" + id);
    } catch (e) {
    }
    if (!storedKey) {
      return;
    }
    return unmarshal(storedKey);
  };
  const getPublic = (keys, options = {}) => {
    const formats = ["hex", "buffer"];
    const format3 = options.format || "hex";
    if (formats.indexOf(format3) === -1) {
      throw new Error("Supported formats are `hex` and `buffer`");
    }
    const pubKey = keys.public.marshal();
    return format3 === "buffer" ? pubKey : toString3(pubKey, "base16");
  };
  return {
    clear,
    close,
    hasKey,
    addKey,
    createKey,
    getKey,
    getPublic
  };
};

// node_modules/@orbitdb/core/src/identities/index.js
init_node_globals();

// node_modules/@orbitdb/core/src/identities/identities.js
init_node_globals();

// node_modules/@orbitdb/core/src/identities/identity.js
init_node_globals();
var codec2 = src_exports;
var hasher2 = sha256;
var hashStringEncoding2 = base58btc;
var Identity = async ({ id, publicKey, signatures, type: type7, sign: sign2, verify: verify2 } = {}) => {
  if (!id)
    throw new Error("Identity id is required");
  if (!publicKey)
    throw new Error("Invalid public key");
  if (!signatures)
    throw new Error("Signatures object is required");
  if (!signatures.id)
    throw new Error("Signature of id is required");
  if (!signatures.publicKey)
    throw new Error("Signature of publicKey+id is required");
  if (!type7)
    throw new Error("Identity type is required");
  signatures = Object.assign({}, signatures);
  const identity3 = {
    id,
    publicKey,
    signatures,
    type: type7,
    sign: sign2,
    verify: verify2
  };
  const { hash: hash2, bytes: bytes2 } = await _encodeIdentity(identity3);
  identity3.hash = hash2;
  identity3.bytes = bytes2;
  return identity3;
};
var _encodeIdentity = async (identity3) => {
  const { id, publicKey, signatures, type: type7 } = identity3;
  const value = { id, publicKey, signatures, type: type7 };
  const { cid, bytes: bytes2 } = await encode3({ value, codec: codec2, hasher: hasher2 });
  const hash2 = cid.toString(hashStringEncoding2);
  return { hash: hash2, bytes: Uint8Array.from(bytes2) };
};
var decodeIdentity = async (bytes2) => {
  const { value } = await decode5({ bytes: bytes2, codec: codec2, hasher: hasher2 });
  return Identity({ ...value });
};
var isIdentity = (identity3) => {
  return Boolean(identity3.id && identity3.hash && identity3.bytes && identity3.publicKey && identity3.signatures && identity3.signatures.id && identity3.signatures.publicKey && identity3.type);
};
var isEqual2 = (a, b) => {
  return a.id === b.id && a.hash === b.hash && a.type === b.type && a.publicKey === b.publicKey && a.signatures.id === b.signatures.id && a.signatures.publicKey === b.signatures.publicKey;
};

// node_modules/@orbitdb/core/src/identities/providers/index.js
init_node_globals();

// node_modules/@orbitdb/core/src/identities/providers/publickey.js
init_node_globals();
var type4 = "publickey";
var verifyIdentity = async (identity3) => {
  const { id, publicKey, signatures } = identity3;
  return verifyMessage(signatures.publicKey, id, publicKey + signatures.id);
};
var PublicKeyIdentityProvider = ({ keystore }) => async () => {
  if (!keystore) {
    throw new Error("PublicKeyIdentityProvider requires a keystore parameter");
  }
  const getId = async ({ id } = {}) => {
    if (!id) {
      throw new Error("id is required");
    }
    const key = await keystore.getKey(id) || await keystore.createKey(id);
    return toString3(key.public.marshal(), "base16");
  };
  const signIdentity = async (data, { id } = {}) => {
    if (!id) {
      throw new Error("id is required");
    }
    const key = await keystore.getKey(id);
    if (!key) {
      throw new Error(`Signing key for '${id}' not found`);
    }
    return signMessage(key, data);
  };
  return {
    type: type4,
    getId,
    signIdentity
  };
};
PublicKeyIdentityProvider.verifyIdentity = verifyIdentity;
PublicKeyIdentityProvider.type = type4;
var publickey_default = PublicKeyIdentityProvider;

// node_modules/@orbitdb/core/src/identities/providers/index.js
var identityProviders = {};
var isProviderSupported = (type7) => {
  return Object.keys(identityProviders).includes(type7);
};
var getIdentityProvider = (type7) => {
  if (!isProviderSupported(type7)) {
    throw new Error(`IdentityProvider type '${type7}' is not supported`);
  }
  return identityProviders[type7];
};
var useIdentityProvider = (identityProvider) => {
  if (!identityProvider.type || typeof identityProvider.type !== "string") {
    throw new Error("Given IdentityProvider doesn't have a field 'type'.");
  }
  if (!identityProvider.verifyIdentity) {
    throw new Error("Given IdentityProvider doesn't have a function 'verifyIdentity'.");
  }
  identityProviders[identityProvider.type] = identityProvider;
};
useIdentityProvider(publickey_default);

// node_modules/@orbitdb/core/src/identities/identities.js
var DefaultIdentityKeysPath = path_join_default("./orbitdb", "identities");
var Identities = async ({ keystore, path, storage, ipfs } = {}) => {
  keystore = keystore || await KeyStore({ path: path || DefaultIdentityKeysPath });
  if (!storage) {
    storage = ipfs ? await composed_default(await lru_default({ size: 1e3 }), await ipfs_block_default({ ipfs, pin: true })) : await memory_default();
  }
  const verifiedIdentitiesCache = await lru_default({ size: 1e3 });
  const getIdentity = async (hash2) => {
    const bytes2 = await storage.get(hash2);
    if (bytes2) {
      return decodeIdentity(bytes2);
    }
  };
  const createIdentity = async (options = {}) => {
    options.keystore = keystore;
    const DefaultIdentityProvider = getIdentityProvider("publickey");
    const identityProviderInit = options.provider || DefaultIdentityProvider({ keystore });
    const identityProvider = await identityProviderInit();
    if (!getIdentityProvider(identityProvider.type)) {
      throw new Error("Identity provider is unknown. Use useIdentityProvider(provider) to register the identity provider");
    }
    const id = await identityProvider.getId(options);
    const privateKey = await keystore.getKey(id) || await keystore.createKey(id);
    const publicKey = keystore.getPublic(privateKey);
    const idSignature = await signMessage(privateKey, id);
    const publicKeyAndIdSignature = await identityProvider.signIdentity(publicKey + idSignature, options);
    const signatures = {
      id: idSignature,
      publicKey: publicKeyAndIdSignature
    };
    const identity3 = await Identity({ id, publicKey, signatures, type: identityProvider.type, sign: sign2, verify: verify2 });
    await storage.put(identity3.hash, identity3.bytes);
    return identity3;
  };
  const verifyIdentity2 = async (identity3) => {
    if (!isIdentity(identity3)) {
      return false;
    }
    const { id, publicKey, signatures } = identity3;
    const idSignatureVerified = await verify2(signatures.id, publicKey, id);
    if (!idSignatureVerified) {
      return false;
    }
    const verifiedIdentity = await verifiedIdentitiesCache.get(signatures.id);
    if (verifiedIdentity) {
      return isEqual2(identity3, verifiedIdentity);
    }
    const Provider = getIdentityProvider(identity3.type);
    const identityVerified = await Provider.verifyIdentity(identity3);
    if (identityVerified) {
      await verifiedIdentitiesCache.put(signatures.id, identity3);
    }
    return identityVerified;
  };
  const sign2 = async (identity3, data) => {
    const signingKey = await keystore.getKey(identity3.id);
    if (!signingKey) {
      throw new Error("Private signing key not found from KeyStore");
    }
    return await signMessage(signingKey, data);
  };
  const verify2 = async (signature, publicKey, data) => {
    return await verifyMessage(signature, publicKey, data);
  };
  return {
    createIdentity,
    verifyIdentity: verifyIdentity2,
    getIdentity,
    sign: sign2,
    verify: verify2,
    keystore
  };
};

// node_modules/@orbitdb/core/src/address.js
init_node_globals();
var isValidAddress = (address) => {
  address = address.toString();
  if (!address.startsWith("/orbitdb") && !address.startsWith("\\orbitdb")) {
    return false;
  }
  address = address.replaceAll("/orbitdb/", "");
  address = address.replaceAll("\\orbitdb\\", "");
  address = address.replaceAll("/", "");
  address = address.replaceAll("\\", "");
  let cid;
  try {
    cid = CID.parse(address, base58btc);
  } catch (e) {
    return false;
  }
  return cid !== void 0;
};
var parseAddress = (address) => {
  if (!address) {
    throw new Error(`Not a valid OrbitDB address: ${address}`);
  }
  if (!isValidAddress(address)) {
    throw new Error(`Not a valid OrbitDB address: ${address}`);
  }
  return OrbitDBAddress(address);
};
var OrbitDBAddress = (address) => {
  if (address && address.protocol === "orbitdb" && address.hash) {
    return address;
  }
  const protocol = "orbitdb";
  const hash2 = address.replace("/orbitdb/", "").replace("\\orbitdb\\", "");
  const toString4 = () => {
    return posixJoin("/", protocol, hash2);
  };
  return {
    protocol,
    hash: hash2,
    address,
    toString: toString4
  };
};

// node_modules/@orbitdb/core/src/manifest-store.js
init_node_globals();
var codec3 = src_exports;
var hasher3 = sha256;
var hashStringEncoding3 = base58btc;
var ManifestStore = async ({ ipfs, storage } = {}) => {
  storage = storage || await composed_default(await lru_default({ size: 1e3 }), await ipfs_block_default({ ipfs, pin: true }));
  const get2 = async (address) => {
    const bytes2 = await storage.get(address);
    const { value } = await decode5({ bytes: bytes2, codec: codec3, hasher: hasher3 });
    return value;
  };
  const create6 = async ({ name: name3, type: type7, accessController, meta }) => {
    if (!name3)
      throw new Error("name is required");
    if (!type7)
      throw new Error("type is required");
    if (!accessController)
      throw new Error("accessController is required");
    const manifest = Object.assign({
      name: name3,
      type: type7,
      accessController
    }, meta !== void 0 ? { meta } : {});
    const { cid, bytes: bytes2 } = await encode3({ value: manifest, codec: codec3, hasher: hasher3 });
    const hash2 = cid.toString(hashStringEncoding3);
    await storage.put(hash2, bytes2);
    return {
      hash: hash2,
      manifest
    };
  };
  const close = async () => {
    await storage.close();
  };
  return {
    get: get2,
    create: create6,
    close
  };
};
var manifest_store_default = ManifestStore;

// node_modules/@orbitdb/core/src/utils/index.js
init_node_globals();

// node_modules/@orbitdb/core/src/utils/create-id.js
init_node_globals();
var createId = async (length3 = 32) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  let counter = 0;
  while (counter < length3) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    counter += 1;
  }
  return result;
};
var create_id_default = createId;

// node_modules/@orbitdb/core/src/access-controllers/index.js
init_node_globals();

// node_modules/@orbitdb/core/src/access-controllers/ipfs.js
init_node_globals();
var codec4 = src_exports;
var hasher4 = sha256;
var hashStringEncoding4 = base58btc;
var AccessControlList = async ({ storage, type: type7, params }) => {
  const manifest = {
    type: type7,
    ...params
  };
  const { cid, bytes: bytes2 } = await encode3({ value: manifest, codec: codec4, hasher: hasher4 });
  const hash2 = cid.toString(hashStringEncoding4);
  await storage.put(hash2, bytes2);
  return hash2;
};
var type5 = "ipfs";
var IPFSAccessController = ({ write, storage } = {}) => async ({ orbitdb, identities, address }) => {
  storage = storage || await composed_default(await lru_default({ size: 1e3 }), await ipfs_block_default({ ipfs: orbitdb.ipfs, pin: true }));
  write = write || [orbitdb.identity.id];
  if (address) {
    const manifestBytes = await storage.get(address.replaceAll("/ipfs/", ""));
    const { value } = await decode5({ bytes: manifestBytes, codec: codec4, hasher: hasher4 });
    write = value.write;
  } else {
    address = await AccessControlList({ storage, type: type5, params: { write } });
    address = path_join_default("/", type5, address);
  }
  const canAppend = async (entry) => {
    const writerIdentity = await identities.getIdentity(entry.identity);
    if (!writerIdentity) {
      return false;
    }
    const { id } = writerIdentity;
    if (write.includes(id) || write.includes("*")) {
      return identities.verifyIdentity(writerIdentity);
    }
    return false;
  };
  return {
    type: type5,
    address,
    write,
    canAppend
  };
};
IPFSAccessController.type = type5;
var ipfs_default = IPFSAccessController;

// node_modules/@orbitdb/core/src/access-controllers/orbitdb.js
init_node_globals();
var type6 = "orbitdb";
var OrbitDBAccessController = ({ write } = {}) => async ({ orbitdb, identities, address, name: name3 }) => {
  address = address || name3 || await create_id_default(64);
  write = write || [orbitdb.identity.id];
  const db = await orbitdb.open(address, { type: "keyvalue", AccessController: ipfs_default({ write }) });
  address = db.address;
  const canAppend = async (entry) => {
    const writerIdentity = await identities.getIdentity(entry.identity);
    if (!writerIdentity) {
      return false;
    }
    const { id } = writerIdentity;
    const hasWriteAccess = await hasCapability("write", id) || await hasCapability("admin", id);
    if (hasWriteAccess) {
      return identities.verifyIdentity(writerIdentity);
    }
    return false;
  };
  const capabilities = async () => {
    const _capabilities = [];
    for await (const entry of db.iterator()) {
      _capabilities[entry.key] = entry.value;
    }
    const toSet = (e) => {
      const key = e[0];
      _capabilities[key] = /* @__PURE__ */ new Set([..._capabilities[key] || [], ...e[1]]);
    };
    Object.entries({
      ..._capabilities,
      ...{ admin: /* @__PURE__ */ new Set([..._capabilities.admin || [], ...db.access.write]) }
    }).forEach(toSet);
    return _capabilities;
  };
  const get2 = async (capability) => {
    const _capabilities = await capabilities();
    return _capabilities[capability] || /* @__PURE__ */ new Set([]);
  };
  const close = async () => {
    await db.close();
  };
  const drop = async () => {
    await db.drop();
  };
  const hasCapability = async (capability, key) => {
    const access = new Set(await get2(capability));
    return access.has(key) || access.has("*");
  };
  const grant = async (capability, key) => {
    const capabilities2 = /* @__PURE__ */ new Set([...await db.get(capability) || [], ...[key]]);
    await db.put(capability, Array.from(capabilities2.values()));
  };
  const revoke = async (capability, key) => {
    const capabilities2 = new Set(await db.get(capability) || []);
    capabilities2.delete(key);
    if (capabilities2.size > 0) {
      await db.put(capability, Array.from(capabilities2.values()));
    } else {
      await db.del(capability);
    }
  };
  return {
    type: type6,
    address,
    write,
    canAppend,
    capabilities,
    get: get2,
    grant,
    revoke,
    close,
    drop,
    events: db.events
  };
};
OrbitDBAccessController.type = type6;
var orbitdb_default = OrbitDBAccessController;

// node_modules/@orbitdb/core/src/access-controllers/index.js
var accessControllers = {};
var getAccessController = (type7) => {
  if (!accessControllers[type7]) {
    throw new Error(`AccessController type '${type7}' is not supported`);
  }
  return accessControllers[type7];
};
var useAccessController = (accessController) => {
  if (!accessController.type) {
    throw new Error("AccessController does not contain required field 'type'.");
  }
  accessControllers[accessController.type] = accessController;
};
useAccessController(ipfs_default);
useAccessController(orbitdb_default);

// node_modules/@orbitdb/core/src/orbitdb.js
var DefaultDatabaseType = "events";
var DefaultAccessController2 = ipfs_default;
var OrbitDB = async ({ ipfs, id, identity: identity3, identities, directory } = {}) => {
  if (ipfs == null) {
    throw new Error("IPFS instance is a required argument.");
  }
  id = id || await create_id_default();
  const { id: peerId } = await ipfs.id();
  directory = directory || "./orbitdb";
  let keystore;
  if (identities) {
    keystore = identities.keystore;
  } else {
    keystore = await KeyStore({ path: path_join_default(directory, "./keystore") });
    identities = await Identities({ ipfs, keystore });
  }
  if (identity3) {
    if (identity3.provider) {
      identity3 = await identities.createIdentity({ ...identity3 });
    }
  } else {
    identity3 = await identities.createIdentity({ id });
  }
  const manifestStore = await manifest_store_default({ ipfs });
  let databases = {};
  const open = async (address, { type: type7, meta, sync, Database: Database2, AccessController, headsStorage, entryStorage, indexStorage, referencesCount } = {}) => {
    let name3, manifest, accessController;
    if (databases[address]) {
      return databases[address];
    }
    if (isValidAddress(address)) {
      const addr = OrbitDBAddress(address);
      manifest = await manifestStore.get(addr.hash);
      const acType = manifest.accessController.split("/", 2).pop();
      AccessController = getAccessController(acType)();
      accessController = await AccessController({ orbitdb: { open, identity: identity3, ipfs }, identities, address: manifest.accessController });
      name3 = manifest.name;
      type7 = type7 || manifest.type;
      meta = manifest.meta;
    } else {
      type7 = type7 || DefaultDatabaseType;
      AccessController = AccessController || DefaultAccessController2();
      accessController = await AccessController({ orbitdb: { open, identity: identity3, ipfs }, identities, name: address });
      const m = await manifestStore.create({ name: address, type: type7, accessController: accessController.address, meta });
      manifest = m.manifest;
      address = OrbitDBAddress(m.hash);
      name3 = manifest.name;
      meta = manifest.meta;
      if (databases[address]) {
        return databases[address];
      }
    }
    Database2 = Database2 || getDatabaseType(type7)();
    if (!Database2) {
      throw new Error(`Unsupported database type: '${type7}'`);
    }
    address = address.toString();
    const db = await Database2({ ipfs, identity: identity3, address, name: name3, access: accessController, directory, meta, syncAutomatically: sync, headsStorage, entryStorage, indexStorage, referencesCount });
    db.events.on("close", onDatabaseClosed(address));
    databases[address] = db;
    return db;
  };
  const onDatabaseClosed = (address) => () => {
    delete databases[address];
  };
  const stop = async () => {
    for (const db of Object.values(databases)) {
      await db.close();
    }
    if (keystore) {
      await keystore.close();
    }
    if (manifestStore) {
      await manifestStore.close();
    }
    databases = {};
  };
  return {
    id,
    open,
    stop,
    ipfs,
    directory,
    keystore,
    identity: identity3,
    peerId
  };
};
export {
  composed_default as ComposedStorage,
  database_default as Database,
  DefaultAccessController,
  documents_default as Documents,
  entry_default as Entry,
  events_default as Events,
  ipfs_default as IPFSAccessController,
  ipfs_block_default as IPFSBlockStorage,
  Identities,
  KeyStore,
  keyvalue_default as KeyValue,
  keyvalue_indexed_default as KeyValueIndexed,
  lru_default as LRUStorage,
  level_default as LevelStorage,
  Log,
  memory_default as MemoryStorage,
  orbitdb_default as OrbitDBAccessController,
  publickey_default as PublicKeyIdentityProvider,
  OrbitDB as createOrbitDB,
  isIdentity,
  isValidAddress,
  parseAddress,
  useAccessController,
  useDatabaseType,
  useIdentityProvider
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/*! run-parallel-limit. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
//# sourceMappingURL=index.js.map
