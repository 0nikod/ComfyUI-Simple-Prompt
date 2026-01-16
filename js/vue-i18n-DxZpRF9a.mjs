import { effectScope as Ua, ref as $e, shallowRef as Wn, computed as ge, watch as Dt, isRef as wa, defineComponent as Kt, h as Gn, Fragment as Hn, getCurrentInstance as it, inject as Va, onMounted as $a, onUnmounted as Wa, onBeforeMount as Ga, createVNode as Ha, Text as Ya } from "./vue.runtime.esm-bundler-C8DxJOnH.mjs";
/*!
  * shared v9.14.4
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const de = typeof window < "u";
let ie, ye;
{
  const e = de && window.performance;
  e && e.mark && e.measure && e.clearMarks && // @ts-ignore browser compat
  e.clearMeasures && (ie = (t) => {
    e.mark(t);
  }, ye = (t, n, r) => {
    e.measure(t, n, r), e.clearMarks(n), e.clearMarks(r);
  });
}
const xa = /\{([0-9a-zA-Z]+)\}/g;
function Xt(e, ...t) {
  return t.length === 1 && w(t[0]) && (t = t[0]), (!t || !t.hasOwnProperty) && (t = {}), e.replace(xa, (n, r) => t.hasOwnProperty(r) ? t[r] : "");
}
const Ne = (e, t = !1) => t ? Symbol.for(e) : Symbol(e), Ka = (e, t, n) => Xa({ l: e, k: t, s: n }), Xa = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), q = (e) => typeof e == "number" && isFinite(e), Ba = (e) => xn(e) === "[object Date]", he = (e) => xn(e) === "[object RegExp]", Ot = (e) => F(e) && Object.keys(e).length === 0, te = Object.assign, ja = Object.create, x = (e = null) => ja(e);
let an;
const Oe = () => an || (an = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : x());
function rn(e) {
  return e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const Ja = Object.prototype.hasOwnProperty;
function me(e, t) {
  return Ja.call(e, t);
}
const B = Array.isArray, Y = (e) => typeof e == "function", A = (e) => typeof e == "string", U = (e) => typeof e == "boolean", w = (e) => e !== null && typeof e == "object", Qa = (e) => w(e) && Y(e.then) && Y(e.catch), Yn = Object.prototype.toString, xn = (e) => Yn.call(e), F = (e) => {
  if (!w(e))
    return !1;
  const t = Object.getPrototypeOf(e);
  return t === null || t.constructor === Object;
}, qa = (e) => e == null ? "" : B(e) || F(e) && e.toString === Yn ? JSON.stringify(e, null, 2) : String(e);
function Za(e, t = "") {
  return e.reduce((n, r, l) => l === 0 ? n + r : n + t + r, "");
}
const ln = 2;
function za(e, t = 0, n = e.length) {
  const r = e.split(/\r?\n/);
  let l = 0;
  const a = [];
  for (let s = 0; s < r.length; s++)
    if (l += r[s].length + 1, l >= t) {
      for (let o = s - ln; o <= s + ln || n > l; o++) {
        if (o < 0 || o >= r.length)
          continue;
        const u = o + 1;
        a.push(`${u}${" ".repeat(3 - String(u).length)}|  ${r[o]}`);
        const _ = r[o].length;
        if (o === s) {
          const N = t - (l - _) + 1, L = Math.max(1, n > l ? _ - N : n - t);
          a.push("   |  " + " ".repeat(N) + "^".repeat(L));
        } else if (o > s) {
          if (n > l) {
            const N = Math.max(Math.min(n - l, _), 1);
            a.push("   |  " + "^".repeat(N));
          }
          l += _ + 1;
        }
      }
      break;
    }
  return a.join(`
`);
}
function pt(e) {
  let t = e;
  return () => ++t;
}
function Z(e, t) {
  typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
const sn = {};
function Kn(e) {
  sn[e] || (sn[e] = !0, Z(e));
}
function Bt() {
  const e = /* @__PURE__ */ new Map();
  return {
    events: e,
    on(n, r) {
      const l = e.get(n);
      l && l.push(r) || e.set(n, [r]);
    },
    off(n, r) {
      const l = e.get(n);
      l && l.splice(l.indexOf(r) >>> 0, 1);
    },
    emit(n, r) {
      (e.get(n) || []).slice().map((l) => l(r)), (e.get("*") || []).slice().map((l) => l(n, r));
    }
  };
}
const gt = (e) => !w(e) || B(e);
function Nt(e, t) {
  if (gt(e) || gt(t))
    throw new Error("Invalid value");
  const n = [{ src: e, des: t }];
  for (; n.length; ) {
    const { src: r, des: l } = n.pop();
    Object.keys(r).forEach((a) => {
      a !== "__proto__" && (w(r[a]) && !w(l[a]) && (l[a] = Array.isArray(r[a]) ? [] : x()), gt(l[a]) || gt(r[a]) ? l[a] = r[a] : n.push({ src: r[a], des: l[a] }));
    });
  }
}
/*!
  * message-compiler v9.14.4
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function er(e, t, n) {
  return { line: e, column: t, offset: n };
}
function Lt(e, t, n) {
  return { start: e, end: t };
}
const tr = /\{([0-9a-zA-Z]+)\}/g;
function Xn(e, ...t) {
  return t.length === 1 && nr(t[0]) && (t = t[0]), (!t || !t.hasOwnProperty) && (t = {}), e.replace(tr, (n, r) => t.hasOwnProperty(r) ? t[r] : "");
}
const Bn = Object.assign, on = (e) => typeof e == "string", nr = (e) => e !== null && typeof e == "object";
function jn(e, t = "") {
  return e.reduce((n, r, l) => l === 0 ? n + r : n + t + r, "");
}
const bt = {
  USE_MODULO_SYNTAX: 1,
  __EXTEND_POINT__: 2
}, ar = {
  [bt.USE_MODULO_SYNTAX]: "Use modulo before '{{0}}'."
};
function rr(e, t, ...n) {
  const r = Xn(ar[e], ...n || []), l = { message: String(r), code: e };
  return t && (l.location = t), l;
}
const M = {
  // tokenizer error codes
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  // parser error codes
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14,
  // generator error codes
  UNHANDLED_CODEGEN_NODE_TYPE: 15,
  // minifier error codes
  UNHANDLED_MINIFIER_NODE_TYPE: 16,
  // Special value for higher-order compilers to pick up the last code
  // to avoid collision of error codes. This should always be kept as the last
  // item.
  __EXTEND_POINT__: 17
}, lr = {
  // tokenizer error messages
  [M.EXPECTED_TOKEN]: "Expected token: '{0}'",
  [M.INVALID_TOKEN_IN_PLACEHOLDER]: "Invalid token in placeholder: '{0}'",
  [M.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER]: "Unterminated single quote in placeholder",
  [M.UNKNOWN_ESCAPE_SEQUENCE]: "Unknown escape sequence: \\{0}",
  [M.INVALID_UNICODE_ESCAPE_SEQUENCE]: "Invalid unicode escape sequence: {0}",
  [M.UNBALANCED_CLOSING_BRACE]: "Unbalanced closing brace",
  [M.UNTERMINATED_CLOSING_BRACE]: "Unterminated closing brace",
  [M.EMPTY_PLACEHOLDER]: "Empty placeholder",
  [M.NOT_ALLOW_NEST_PLACEHOLDER]: "Not allowed nest placeholder",
  [M.INVALID_LINKED_FORMAT]: "Invalid linked format",
  // parser error messages
  [M.MUST_HAVE_MESSAGES_IN_PLURAL]: "Plural must have messages",
  [M.UNEXPECTED_EMPTY_LINKED_MODIFIER]: "Unexpected empty linked modifier",
  [M.UNEXPECTED_EMPTY_LINKED_KEY]: "Unexpected empty linked key",
  [M.UNEXPECTED_LEXICAL_ANALYSIS]: "Unexpected lexical analysis in token: '{0}'",
  // generator error messages
  [M.UNHANDLED_CODEGEN_NODE_TYPE]: "unhandled codegen node type: '{0}'",
  // minimizer error messages
  [M.UNHANDLED_MINIFIER_NODE_TYPE]: "unhandled mimifier node type: '{0}'"
};
function xe(e, t, n = {}) {
  const { domain: r, messages: l, args: a } = n, s = Xn((l || lr)[e] || "", ...a || []), o = new SyntaxError(String(s));
  return o.code = e, t && (o.location = t), o.domain = r, o;
}
function sr(e) {
  throw e;
}
const or = /<\/?[\w\s="/.':;#-\/]+>/, ir = (e) => or.test(e), Le = " ", cr = "\r", ae = `
`, ur = "\u2028", fr = "\u2029";
function _r(e) {
  const t = e;
  let n = 0, r = 1, l = 1, a = 0;
  const s = (p) => t[p] === cr && t[p + 1] === ae, o = (p) => t[p] === ae, u = (p) => t[p] === fr, _ = (p) => t[p] === ur, N = (p) => s(p) || o(p) || u(p) || _(p), L = () => n, d = () => r, v = () => l, R = () => a, C = (p) => s(p) || u(p) || _(p) ? ae : t[p], S = () => C(n), D = () => C(n + a);
  function y() {
    return a = 0, N(n) && (r++, l = 0), s(n) && n++, n++, l++, t[n];
  }
  function f() {
    return s(n + a) && a++, a++, t[n + a];
  }
  function E() {
    n = 0, r = 1, l = 1, a = 0;
  }
  function O(p = 0) {
    a = p;
  }
  function g() {
    const p = n + a;
    for (; p !== n; )
      y();
    a = 0;
  }
  return {
    index: L,
    line: d,
    column: v,
    peekOffset: R,
    charAt: C,
    currentChar: S,
    currentPeek: D,
    next: y,
    peek: f,
    reset: E,
    resetPeek: O,
    skipToPeek: g
  };
}
const be = void 0, mr = ".", cn = "'", dr = "tokenizer";
function Er(e, t = {}) {
  const n = t.location !== !1, r = _r(e), l = () => r.index(), a = () => er(r.line(), r.column(), r.index()), s = a(), o = l(), u = {
    currentType: 14,
    offset: o,
    startLoc: s,
    endLoc: s,
    lastType: 14,
    lastOffset: o,
    lastStartLoc: s,
    lastEndLoc: s,
    braceNest: 0,
    inLinked: !1,
    text: ""
  }, _ = () => u, { onError: N } = t;
  function L(i, c, T, ...k) {
    const j = _();
    if (c.column += T, c.offset += T, N) {
      const K = n ? Lt(j.startLoc, c) : null, H = xe(i, K, {
        domain: dr,
        args: k
      });
      N(H);
    }
  }
  function d(i, c, T) {
    i.endLoc = a(), i.currentType = c;
    const k = { type: c };
    return n && (k.loc = Lt(i.startLoc, i.endLoc)), T != null && (k.value = T), k;
  }
  const v = (i) => d(
    i,
    14
    /* TokenTypes.EOF */
  );
  function R(i, c) {
    return i.currentChar() === c ? (i.next(), c) : (L(M.EXPECTED_TOKEN, a(), 0, c), "");
  }
  function C(i) {
    let c = "";
    for (; i.currentPeek() === Le || i.currentPeek() === ae; )
      c += i.currentPeek(), i.peek();
    return c;
  }
  function S(i) {
    const c = C(i);
    return i.skipToPeek(), c;
  }
  function D(i) {
    if (i === be)
      return !1;
    const c = i.charCodeAt(0);
    return c >= 97 && c <= 122 || // a-z
    c >= 65 && c <= 90 || // A-Z
    c === 95;
  }
  function y(i) {
    if (i === be)
      return !1;
    const c = i.charCodeAt(0);
    return c >= 48 && c <= 57;
  }
  function f(i, c) {
    const { currentType: T } = c;
    if (T !== 2)
      return !1;
    C(i);
    const k = D(i.currentPeek());
    return i.resetPeek(), k;
  }
  function E(i, c) {
    const { currentType: T } = c;
    if (T !== 2)
      return !1;
    C(i);
    const k = i.currentPeek() === "-" ? i.peek() : i.currentPeek(), j = y(k);
    return i.resetPeek(), j;
  }
  function O(i, c) {
    const { currentType: T } = c;
    if (T !== 2)
      return !1;
    C(i);
    const k = i.currentPeek() === cn;
    return i.resetPeek(), k;
  }
  function g(i, c) {
    const { currentType: T } = c;
    if (T !== 8)
      return !1;
    C(i);
    const k = i.currentPeek() === ".";
    return i.resetPeek(), k;
  }
  function p(i, c) {
    const { currentType: T } = c;
    if (T !== 9)
      return !1;
    C(i);
    const k = D(i.currentPeek());
    return i.resetPeek(), k;
  }
  function P(i, c) {
    const { currentType: T } = c;
    if (!(T === 8 || T === 12))
      return !1;
    C(i);
    const k = i.currentPeek() === ":";
    return i.resetPeek(), k;
  }
  function b(i, c) {
    const { currentType: T } = c;
    if (T !== 10)
      return !1;
    const k = () => {
      const K = i.currentPeek();
      return K === "{" ? D(i.peek()) : K === "@" || K === "%" || K === "|" || K === ":" || K === "." || K === Le || !K ? !1 : K === ae ? (i.peek(), k()) : V(i, !1);
    }, j = k();
    return i.resetPeek(), j;
  }
  function X(i) {
    C(i);
    const c = i.currentPeek() === "|";
    return i.resetPeek(), c;
  }
  function oe(i) {
    const c = C(i), T = i.currentPeek() === "%" && i.peek() === "{";
    return i.resetPeek(), {
      isModulo: T,
      hasSpace: c.length > 0
    };
  }
  function V(i, c = !0) {
    const T = (j = !1, K = "", H = !1) => {
      const m = i.currentPeek();
      return m === "{" ? K === "%" ? !1 : j : m === "@" || !m ? K === "%" ? !0 : j : m === "%" ? (i.peek(), T(j, "%", !0)) : m === "|" ? K === "%" || H ? !0 : !(K === Le || K === ae) : m === Le ? (i.peek(), T(!0, Le, H)) : m === ae ? (i.peek(), T(!0, ae, H)) : !0;
    }, k = T();
    return c && i.resetPeek(), k;
  }
  function ne(i, c) {
    const T = i.currentChar();
    return T === be ? be : c(T) ? (i.next(), T) : null;
  }
  function Ke(i) {
    const c = i.charCodeAt(0);
    return c >= 97 && c <= 122 || // a-z
    c >= 65 && c <= 90 || // A-Z
    c >= 48 && c <= 57 || // 0-9
    c === 95 || // _
    c === 36;
  }
  function Xe(i) {
    return ne(i, Ke);
  }
  function Ee(i) {
    const c = i.charCodeAt(0);
    return c >= 97 && c <= 122 || // a-z
    c >= 65 && c <= 90 || // A-Z
    c >= 48 && c <= 57 || // 0-9
    c === 95 || // _
    c === 36 || // $
    c === 45;
  }
  function Be(i) {
    return ne(i, Ee);
  }
  function je(i) {
    const c = i.charCodeAt(0);
    return c >= 48 && c <= 57;
  }
  function Je(i) {
    return ne(i, je);
  }
  function Qe(i) {
    const c = i.charCodeAt(0);
    return c >= 48 && c <= 57 || // 0-9
    c >= 65 && c <= 70 || // A-F
    c >= 97 && c <= 102;
  }
  function qe(i) {
    return ne(i, Qe);
  }
  function ce(i) {
    let c = "", T = "";
    for (; c = Je(i); )
      T += c;
    return T;
  }
  function Me(i) {
    S(i);
    const c = i.currentChar();
    return c !== "%" && L(M.EXPECTED_TOKEN, a(), 0, c), i.next(), "%";
  }
  function Fe(i) {
    let c = "";
    for (; ; ) {
      const T = i.currentChar();
      if (T === "{" || T === "}" || T === "@" || T === "|" || !T)
        break;
      if (T === "%")
        if (V(i))
          c += T, i.next();
        else
          break;
      else if (T === Le || T === ae)
        if (V(i))
          c += T, i.next();
        else {
          if (X(i))
            break;
          c += T, i.next();
        }
      else
        c += T, i.next();
    }
    return c;
  }
  function Ze(i) {
    S(i);
    let c = "", T = "";
    for (; c = Be(i); )
      T += c;
    return i.currentChar() === be && L(M.UNTERMINATED_CLOSING_BRACE, a(), 0), T;
  }
  function ze(i) {
    S(i);
    let c = "";
    return i.currentChar() === "-" ? (i.next(), c += `-${ce(i)}`) : c += ce(i), i.currentChar() === be && L(M.UNTERMINATED_CLOSING_BRACE, a(), 0), c;
  }
  function et(i) {
    return i !== cn && i !== ae;
  }
  function dt(i) {
    S(i), R(i, "'");
    let c = "", T = "";
    for (; c = ne(i, et); )
      c === "\\" ? T += tt(i) : T += c;
    const k = i.currentChar();
    return k === ae || k === be ? (L(M.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, a(), 0), k === ae && (i.next(), R(i, "'")), T) : (R(i, "'"), T);
  }
  function tt(i) {
    const c = i.currentChar();
    switch (c) {
      case "\\":
      case "'":
        return i.next(), `\\${c}`;
      case "u":
        return Ue(i, c, 4);
      case "U":
        return Ue(i, c, 6);
      default:
        return L(M.UNKNOWN_ESCAPE_SEQUENCE, a(), 0, c), "";
    }
  }
  function Ue(i, c, T) {
    R(i, c);
    let k = "";
    for (let j = 0; j < T; j++) {
      const K = qe(i);
      if (!K) {
        L(M.INVALID_UNICODE_ESCAPE_SEQUENCE, a(), 0, `\\${c}${k}${i.currentChar()}`);
        break;
      }
      k += K;
    }
    return `\\${c}${k}`;
  }
  function nt(i) {
    return i !== "{" && i !== "}" && i !== Le && i !== ae;
  }
  function at(i) {
    S(i);
    let c = "", T = "";
    for (; c = ne(i, nt); )
      T += c;
    return T;
  }
  function rt(i) {
    let c = "", T = "";
    for (; c = Xe(i); )
      T += c;
    return T;
  }
  function h(i) {
    const c = (T) => {
      const k = i.currentChar();
      return k === "{" || k === "%" || k === "@" || k === "|" || k === "(" || k === ")" || !k || k === Le ? T : (T += k, i.next(), c(T));
    };
    return c("");
  }
  function W(i) {
    S(i);
    const c = R(
      i,
      "|"
      /* TokenChars.Pipe */
    );
    return S(i), c;
  }
  function lt(i, c) {
    let T = null;
    switch (i.currentChar()) {
      case "{":
        return c.braceNest >= 1 && L(M.NOT_ALLOW_NEST_PLACEHOLDER, a(), 0), i.next(), T = d(
          c,
          2,
          "{"
          /* TokenChars.BraceLeft */
        ), S(i), c.braceNest++, T;
      case "}":
        return c.braceNest > 0 && c.currentType === 2 && L(M.EMPTY_PLACEHOLDER, a(), 0), i.next(), T = d(
          c,
          3,
          "}"
          /* TokenChars.BraceRight */
        ), c.braceNest--, c.braceNest > 0 && S(i), c.inLinked && c.braceNest === 0 && (c.inLinked = !1), T;
      case "@":
        return c.braceNest > 0 && L(M.UNTERMINATED_CLOSING_BRACE, a(), 0), T = Pe(i, c) || v(c), c.braceNest = 0, T;
      default: {
        let j = !0, K = !0, H = !0;
        if (X(i))
          return c.braceNest > 0 && L(M.UNTERMINATED_CLOSING_BRACE, a(), 0), T = d(c, 1, W(i)), c.braceNest = 0, c.inLinked = !1, T;
        if (c.braceNest > 0 && (c.currentType === 5 || c.currentType === 6 || c.currentType === 7))
          return L(M.UNTERMINATED_CLOSING_BRACE, a(), 0), c.braceNest = 0, st(i, c);
        if (j = f(i, c))
          return T = d(c, 5, Ze(i)), S(i), T;
        if (K = E(i, c))
          return T = d(c, 6, ze(i)), S(i), T;
        if (H = O(i, c))
          return T = d(c, 7, dt(i)), S(i), T;
        if (!j && !K && !H)
          return T = d(c, 13, at(i)), L(M.INVALID_TOKEN_IN_PLACEHOLDER, a(), 0, T.value), S(i), T;
        break;
      }
    }
    return T;
  }
  function Pe(i, c) {
    const { currentType: T } = c;
    let k = null;
    const j = i.currentChar();
    switch ((T === 8 || T === 9 || T === 12 || T === 10) && (j === ae || j === Le) && L(M.INVALID_LINKED_FORMAT, a(), 0), j) {
      case "@":
        return i.next(), k = d(
          c,
          8,
          "@"
          /* TokenChars.LinkedAlias */
        ), c.inLinked = !0, k;
      case ".":
        return S(i), i.next(), d(
          c,
          9,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        return S(i), i.next(), d(
          c,
          10,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        return X(i) ? (k = d(c, 1, W(i)), c.braceNest = 0, c.inLinked = !1, k) : g(i, c) || P(i, c) ? (S(i), Pe(i, c)) : p(i, c) ? (S(i), d(c, 12, rt(i))) : b(i, c) ? (S(i), j === "{" ? lt(i, c) || k : d(c, 11, h(i))) : (T === 8 && L(M.INVALID_LINKED_FORMAT, a(), 0), c.braceNest = 0, c.inLinked = !1, st(i, c));
    }
  }
  function st(i, c) {
    let T = {
      type: 14
      /* TokenTypes.EOF */
    };
    if (c.braceNest > 0)
      return lt(i, c) || v(c);
    if (c.inLinked)
      return Pe(i, c) || v(c);
    switch (i.currentChar()) {
      case "{":
        return lt(i, c) || v(c);
      case "}":
        return L(M.UNBALANCED_CLOSING_BRACE, a(), 0), i.next(), d(
          c,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return Pe(i, c) || v(c);
      default: {
        if (X(i))
          return T = d(c, 1, W(i)), c.braceNest = 0, c.inLinked = !1, T;
        const { isModulo: j, hasSpace: K } = oe(i);
        if (j)
          return K ? d(c, 0, Fe(i)) : d(c, 4, Me(i));
        if (V(i))
          return d(c, 0, Fe(i));
        break;
      }
    }
    return T;
  }
  function Pt() {
    const { currentType: i, offset: c, startLoc: T, endLoc: k } = u;
    return u.lastType = i, u.lastOffset = c, u.lastStartLoc = T, u.lastEndLoc = k, u.offset = l(), u.startLoc = a(), r.currentChar() === be ? d(
      u,
      14
      /* TokenTypes.EOF */
    ) : st(r, u);
  }
  return {
    nextToken: Pt,
    currentOffset: l,
    currentPosition: a,
    context: _
  };
}
const gr = "parser", Tr = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function Nr(e, t, n) {
  switch (e) {
    case "\\\\":
      return "\\";
    // eslint-disable-next-line no-useless-escape
    case "\\'":
      return "'";
    default: {
      const r = parseInt(t || n, 16);
      return r <= 55295 || r >= 57344 ? String.fromCodePoint(r) : "�";
    }
  }
}
function Lr(e = {}) {
  const t = e.location !== !1, { onError: n, onWarn: r } = e;
  function l(f, E, O, g, ...p) {
    const P = f.currentPosition();
    if (P.offset += g, P.column += g, n) {
      const b = t ? Lt(O, P) : null, X = xe(E, b, {
        domain: gr,
        args: p
      });
      n(X);
    }
  }
  function a(f, E, O, g, ...p) {
    const P = f.currentPosition();
    if (P.offset += g, P.column += g, r) {
      const b = t ? Lt(O, P) : null;
      r(rr(E, b, p));
    }
  }
  function s(f, E, O) {
    const g = { type: f };
    return t && (g.start = E, g.end = E, g.loc = { start: O, end: O }), g;
  }
  function o(f, E, O, g) {
    t && (f.end = E, f.loc && (f.loc.end = O));
  }
  function u(f, E) {
    const O = f.context(), g = s(3, O.offset, O.startLoc);
    return g.value = E, o(g, f.currentOffset(), f.currentPosition()), g;
  }
  function _(f, E) {
    const O = f.context(), { lastOffset: g, lastStartLoc: p } = O, P = s(5, g, p);
    return P.index = parseInt(E, 10), f.nextToken(), o(P, f.currentOffset(), f.currentPosition()), P;
  }
  function N(f, E, O) {
    const g = f.context(), { lastOffset: p, lastStartLoc: P } = g, b = s(4, p, P);
    return b.key = E, O === !0 && (b.modulo = !0), f.nextToken(), o(b, f.currentOffset(), f.currentPosition()), b;
  }
  function L(f, E) {
    const O = f.context(), { lastOffset: g, lastStartLoc: p } = O, P = s(9, g, p);
    return P.value = E.replace(Tr, Nr), f.nextToken(), o(P, f.currentOffset(), f.currentPosition()), P;
  }
  function d(f) {
    const E = f.nextToken(), O = f.context(), { lastOffset: g, lastStartLoc: p } = O, P = s(8, g, p);
    return E.type !== 12 ? (l(f, M.UNEXPECTED_EMPTY_LINKED_MODIFIER, O.lastStartLoc, 0), P.value = "", o(P, g, p), {
      nextConsumeToken: E,
      node: P
    }) : (E.value == null && l(f, M.UNEXPECTED_LEXICAL_ANALYSIS, O.lastStartLoc, 0, _e(E)), P.value = E.value || "", o(P, f.currentOffset(), f.currentPosition()), {
      node: P
    });
  }
  function v(f, E) {
    const O = f.context(), g = s(7, O.offset, O.startLoc);
    return g.value = E, o(g, f.currentOffset(), f.currentPosition()), g;
  }
  function R(f) {
    const E = f.context(), O = s(6, E.offset, E.startLoc);
    let g = f.nextToken();
    if (g.type === 9) {
      const p = d(f);
      O.modifier = p.node, g = p.nextConsumeToken || f.nextToken();
    }
    switch (g.type !== 10 && l(f, M.UNEXPECTED_LEXICAL_ANALYSIS, E.lastStartLoc, 0, _e(g)), g = f.nextToken(), g.type === 2 && (g = f.nextToken()), g.type) {
      case 11:
        g.value == null && l(f, M.UNEXPECTED_LEXICAL_ANALYSIS, E.lastStartLoc, 0, _e(g)), O.key = v(f, g.value || "");
        break;
      case 5:
        g.value == null && l(f, M.UNEXPECTED_LEXICAL_ANALYSIS, E.lastStartLoc, 0, _e(g)), O.key = N(f, g.value || "");
        break;
      case 6:
        g.value == null && l(f, M.UNEXPECTED_LEXICAL_ANALYSIS, E.lastStartLoc, 0, _e(g)), O.key = _(f, g.value || "");
        break;
      case 7:
        g.value == null && l(f, M.UNEXPECTED_LEXICAL_ANALYSIS, E.lastStartLoc, 0, _e(g)), O.key = L(f, g.value || "");
        break;
      default: {
        l(f, M.UNEXPECTED_EMPTY_LINKED_KEY, E.lastStartLoc, 0);
        const p = f.context(), P = s(7, p.offset, p.startLoc);
        return P.value = "", o(P, p.offset, p.startLoc), O.key = P, o(O, p.offset, p.startLoc), {
          nextConsumeToken: g,
          node: O
        };
      }
    }
    return o(O, f.currentOffset(), f.currentPosition()), {
      node: O
    };
  }
  function C(f) {
    const E = f.context(), O = E.currentType === 1 ? f.currentOffset() : E.offset, g = E.currentType === 1 ? E.endLoc : E.startLoc, p = s(2, O, g);
    p.items = [];
    let P = null, b = null;
    do {
      const V = P || f.nextToken();
      switch (P = null, V.type) {
        case 0:
          V.value == null && l(f, M.UNEXPECTED_LEXICAL_ANALYSIS, E.lastStartLoc, 0, _e(V)), p.items.push(u(f, V.value || ""));
          break;
        case 6:
          V.value == null && l(f, M.UNEXPECTED_LEXICAL_ANALYSIS, E.lastStartLoc, 0, _e(V)), p.items.push(_(f, V.value || ""));
          break;
        case 4:
          b = !0;
          break;
        case 5:
          V.value == null && l(f, M.UNEXPECTED_LEXICAL_ANALYSIS, E.lastStartLoc, 0, _e(V)), p.items.push(N(f, V.value || "", !!b)), b && (a(f, bt.USE_MODULO_SYNTAX, E.lastStartLoc, 0, _e(V)), b = null);
          break;
        case 7:
          V.value == null && l(f, M.UNEXPECTED_LEXICAL_ANALYSIS, E.lastStartLoc, 0, _e(V)), p.items.push(L(f, V.value || ""));
          break;
        case 8: {
          const ne = R(f);
          p.items.push(ne.node), P = ne.nextConsumeToken || null;
          break;
        }
      }
    } while (E.currentType !== 14 && E.currentType !== 1);
    const X = E.currentType === 1 ? E.lastOffset : f.currentOffset(), oe = E.currentType === 1 ? E.lastEndLoc : f.currentPosition();
    return o(p, X, oe), p;
  }
  function S(f, E, O, g) {
    const p = f.context();
    let P = g.items.length === 0;
    const b = s(1, E, O);
    b.cases = [], b.cases.push(g);
    do {
      const X = C(f);
      P || (P = X.items.length === 0), b.cases.push(X);
    } while (p.currentType !== 14);
    return P && l(f, M.MUST_HAVE_MESSAGES_IN_PLURAL, O, 0), o(b, f.currentOffset(), f.currentPosition()), b;
  }
  function D(f) {
    const E = f.context(), { offset: O, startLoc: g } = E, p = C(f);
    return E.currentType === 14 ? p : S(f, O, g, p);
  }
  function y(f) {
    const E = Er(f, Bn({}, e)), O = E.context(), g = s(0, O.offset, O.startLoc);
    return t && g.loc && (g.loc.source = f), g.body = D(E), e.onCacheKey && (g.cacheKey = e.onCacheKey(f)), O.currentType !== 14 && l(E, M.UNEXPECTED_LEXICAL_ANALYSIS, O.lastStartLoc, 0, f[O.offset] || ""), o(g, E.currentOffset(), E.currentPosition()), g;
  }
  return { parse: y };
}
function _e(e) {
  if (e.type === 14)
    return "EOF";
  const t = (e.value || "").replace(/\r?\n/gu, "\\n");
  return t.length > 10 ? t.slice(0, 9) + "…" : t;
}
function Ir(e, t = {}) {
  const n = {
    ast: e,
    helpers: /* @__PURE__ */ new Set()
  };
  return { context: () => n, helper: (a) => (n.helpers.add(a), a) };
}
function un(e, t) {
  for (let n = 0; n < e.length; n++)
    jt(e[n], t);
}
function jt(e, t) {
  switch (e.type) {
    case 1:
      un(e.cases, t), t.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      un(e.items, t);
      break;
    case 6: {
      jt(e.key, t), t.helper(
        "linked"
        /* HelperNameMap.LINKED */
      ), t.helper(
        "type"
        /* HelperNameMap.TYPE */
      );
      break;
    }
    case 5:
      t.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      ), t.helper(
        "list"
        /* HelperNameMap.LIST */
      );
      break;
    case 4:
      t.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      ), t.helper(
        "named"
        /* HelperNameMap.NAMED */
      );
      break;
  }
}
function Or(e, t = {}) {
  const n = Ir(e);
  n.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  ), e.body && jt(e.body, n);
  const r = n.context();
  e.helpers = Array.from(r.helpers);
}
function pr(e) {
  const t = e.body;
  return t.type === 2 ? fn(t) : t.cases.forEach((n) => fn(n)), e;
}
function fn(e) {
  if (e.items.length === 1) {
    const t = e.items[0];
    (t.type === 3 || t.type === 9) && (e.static = t.value, delete t.value);
  } else {
    const t = [];
    for (let n = 0; n < e.items.length; n++) {
      const r = e.items[n];
      if (!(r.type === 3 || r.type === 9) || r.value == null)
        break;
      t.push(r.value);
    }
    if (t.length === e.items.length) {
      e.static = jn(t);
      for (let n = 0; n < e.items.length; n++) {
        const r = e.items[n];
        (r.type === 3 || r.type === 9) && delete r.value;
      }
    }
  }
}
const br = "minifier";
function We(e) {
  switch (e.t = e.type, e.type) {
    case 0: {
      const t = e;
      We(t.body), t.b = t.body, delete t.body;
      break;
    }
    case 1: {
      const t = e, n = t.cases;
      for (let r = 0; r < n.length; r++)
        We(n[r]);
      t.c = n, delete t.cases;
      break;
    }
    case 2: {
      const t = e, n = t.items;
      for (let r = 0; r < n.length; r++)
        We(n[r]);
      t.i = n, delete t.items, t.static && (t.s = t.static, delete t.static);
      break;
    }
    case 3:
    case 9:
    case 8:
    case 7: {
      const t = e;
      t.value && (t.v = t.value, delete t.value);
      break;
    }
    case 6: {
      const t = e;
      We(t.key), t.k = t.key, delete t.key, t.modifier && (We(t.modifier), t.m = t.modifier, delete t.modifier);
      break;
    }
    case 5: {
      const t = e;
      t.i = t.index, delete t.index;
      break;
    }
    case 4: {
      const t = e;
      t.k = t.key, delete t.key;
      break;
    }
    default:
      throw xe(M.UNHANDLED_MINIFIER_NODE_TYPE, null, {
        domain: br,
        args: [e.type]
      });
  }
  delete e.type;
}
const hr = "parser";
function vr(e, t) {
  const { filename: n, breakLineCode: r, needIndent: l } = t, a = t.location !== !1, s = {
    filename: n,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    map: void 0,
    breakLineCode: r,
    needIndent: l,
    indentLevel: 0
  };
  a && e.loc && (s.source = e.loc.source);
  const o = () => s;
  function u(C, S) {
    s.code += C;
  }
  function _(C, S = !0) {
    const D = S ? r : "";
    u(l ? D + "  ".repeat(C) : D);
  }
  function N(C = !0) {
    const S = ++s.indentLevel;
    C && _(S);
  }
  function L(C = !0) {
    const S = --s.indentLevel;
    C && _(S);
  }
  function d() {
    _(s.indentLevel);
  }
  return {
    context: o,
    push: u,
    indent: N,
    deindent: L,
    newline: d,
    helper: (C) => `_${C}`,
    needIndent: () => s.needIndent
  };
}
function Ar(e, t) {
  const { helper: n } = e;
  e.push(`${n(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`), He(e, t.key), t.modifier ? (e.push(", "), He(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")");
}
function Pr(e, t) {
  const { helper: n, needIndent: r } = e;
  e.push(`${n(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`), e.indent(r());
  const l = t.items.length;
  for (let a = 0; a < l && (He(e, t.items[a]), a !== l - 1); a++)
    e.push(", ");
  e.deindent(r()), e.push("])");
}
function Cr(e, t) {
  const { helper: n, needIndent: r } = e;
  if (t.cases.length > 1) {
    e.push(`${n(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`), e.indent(r());
    const l = t.cases.length;
    for (let a = 0; a < l && (He(e, t.cases[a]), a !== l - 1); a++)
      e.push(", ");
    e.deindent(r()), e.push("])");
  }
}
function Sr(e, t) {
  t.body ? He(e, t.body) : e.push("null");
}
function He(e, t) {
  const { helper: n } = e;
  switch (t.type) {
    case 0:
      Sr(e, t);
      break;
    case 1:
      Cr(e, t);
      break;
    case 2:
      Pr(e, t);
      break;
    case 6:
      Ar(e, t);
      break;
    case 8:
      e.push(JSON.stringify(t.value), t);
      break;
    case 7:
      e.push(JSON.stringify(t.value), t);
      break;
    case 5:
      e.push(`${n(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${n(
        "list"
        /* HelperNameMap.LIST */
      )}(${t.index}))`, t);
      break;
    case 4:
      e.push(`${n(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${n(
        "named"
        /* HelperNameMap.NAMED */
      )}(${JSON.stringify(t.key)}))`, t);
      break;
    case 9:
      e.push(JSON.stringify(t.value), t);
      break;
    case 3:
      e.push(JSON.stringify(t.value), t);
      break;
    default:
      throw xe(M.UNHANDLED_CODEGEN_NODE_TYPE, null, {
        domain: hr,
        args: [t.type]
      });
  }
}
const Rr = (e, t = {}) => {
  const n = on(t.mode) ? t.mode : "normal", r = on(t.filename) ? t.filename : "message.intl";
  t.sourceMap;
  const l = t.breakLineCode != null ? t.breakLineCode : n === "arrow" ? ";" : `
`, a = t.needIndent ? t.needIndent : n !== "arrow", s = e.helpers || [], o = vr(e, {
    filename: r,
    breakLineCode: l,
    needIndent: a
  });
  o.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), o.indent(a), s.length > 0 && (o.push(`const { ${jn(s.map((N) => `${N}: _${N}`), ", ")} } = ctx`), o.newline()), o.push("return "), He(o, e), o.deindent(a), o.push("}"), delete e.helpers;
  const { code: u, map: _ } = o.context();
  return {
    ast: e,
    code: u,
    map: _ ? _.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function yr(e, t = {}) {
  const n = Bn({}, t), r = !!n.jit, l = !!n.minify, a = n.optimize == null ? !0 : n.optimize, o = Lr(n).parse(e);
  return r ? (a && pr(o), l && We(o), { ast: o, code: "" }) : (Or(o, n), Rr(o, n));
}
var kr = { NODE_ENV: '"production"' };
function Dr() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (Oe().__INTLIFY_PROD_DEVTOOLS__ = !1), typeof __INTLIFY_JIT_COMPILATION__ != "boolean" && (Oe().__INTLIFY_JIT_COMPILATION__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (Oe().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1);
}
function fe(e) {
  return w(e) && Jt(e) === 0 && (me(e, "b") || me(e, "body"));
}
const Jn = ["b", "body"];
function Mr(e) {
  return ve(e, Jn);
}
const Qn = ["c", "cases"];
function Fr(e) {
  return ve(e, Qn, []);
}
const qn = ["s", "static"];
function Ur(e) {
  return ve(e, qn);
}
const Zn = ["i", "items"];
function wr(e) {
  return ve(e, Zn, []);
}
const zn = ["t", "type"];
function Jt(e) {
  return ve(e, zn);
}
const ea = ["v", "value"];
function Tt(e, t) {
  const n = ve(e, ea);
  if (n != null)
    return n;
  throw ct(t);
}
const ta = ["m", "modifier"];
function Vr(e) {
  return ve(e, ta);
}
const na = ["k", "key"];
function $r(e) {
  const t = ve(e, na);
  if (t)
    return t;
  throw ct(
    6
    /* NodeTypes.Linked */
  );
}
function ve(e, t, n) {
  for (let r = 0; r < t.length; r++) {
    const l = t[r];
    if (me(e, l) && e[l] != null)
      return e[l];
  }
  return n;
}
const aa = [
  ...Jn,
  ...Qn,
  ...qn,
  ...Zn,
  ...na,
  ...ta,
  ...ea,
  ...zn
];
function ct(e) {
  return new Error(`unhandled node type: ${e}`);
}
const Ae = [];
Ae[
  0
  /* States.BEFORE_PATH */
] = {
  w: [
    0
    /* States.BEFORE_PATH */
  ],
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  "[": [
    4
    /* States.IN_SUB_PATH */
  ],
  o: [
    7
    /* States.AFTER_PATH */
  ]
};
Ae[
  1
  /* States.IN_PATH */
] = {
  w: [
    1
    /* States.IN_PATH */
  ],
  ".": [
    2
    /* States.BEFORE_IDENT */
  ],
  "[": [
    4
    /* States.IN_SUB_PATH */
  ],
  o: [
    7
    /* States.AFTER_PATH */
  ]
};
Ae[
  2
  /* States.BEFORE_IDENT */
] = {
  w: [
    2
    /* States.BEFORE_IDENT */
  ],
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  0: [
    3,
    0
    /* Actions.APPEND */
  ]
};
Ae[
  3
  /* States.IN_IDENT */
] = {
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  0: [
    3,
    0
    /* Actions.APPEND */
  ],
  w: [
    1,
    1
    /* Actions.PUSH */
  ],
  ".": [
    2,
    1
    /* Actions.PUSH */
  ],
  "[": [
    4,
    1
    /* Actions.PUSH */
  ],
  o: [
    7,
    1
    /* Actions.PUSH */
  ]
};
Ae[
  4
  /* States.IN_SUB_PATH */
] = {
  "'": [
    5,
    0
    /* Actions.APPEND */
  ],
  '"': [
    6,
    0
    /* Actions.APPEND */
  ],
  "[": [
    4,
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ],
  "]": [
    1,
    3
    /* Actions.PUSH_SUB_PATH */
  ],
  o: 8,
  l: [
    4,
    0
    /* Actions.APPEND */
  ]
};
Ae[
  5
  /* States.IN_SINGLE_QUOTE */
] = {
  "'": [
    4,
    0
    /* Actions.APPEND */
  ],
  o: 8,
  l: [
    5,
    0
    /* Actions.APPEND */
  ]
};
Ae[
  6
  /* States.IN_DOUBLE_QUOTE */
] = {
  '"': [
    4,
    0
    /* Actions.APPEND */
  ],
  o: 8,
  l: [
    6,
    0
    /* Actions.APPEND */
  ]
};
const Wr = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function Gr(e) {
  return Wr.test(e);
}
function Hr(e) {
  const t = e.charCodeAt(0), n = e.charCodeAt(e.length - 1);
  return t === n && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function Yr(e) {
  if (e == null)
    return "o";
  switch (e.charCodeAt(0)) {
    case 91:
    // [
    case 93:
    // ]
    case 46:
    // .
    case 34:
    // "
    case 39:
      return e;
    case 95:
    // _
    case 36:
    // $
    case 45:
      return "i";
    case 9:
    // Tab (HT)
    case 10:
    // Newline (LF)
    case 13:
    // Return (CR)
    case 160:
    // No-break space (NBSP)
    case 65279:
    // Byte Order Mark (BOM)
    case 8232:
    // Line Separator (LS)
    case 8233:
      return "w";
  }
  return "i";
}
function xr(e) {
  const t = e.trim();
  return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : Gr(t) ? Hr(t) : "*" + t;
}
function Kr(e) {
  const t = [];
  let n = -1, r = 0, l = 0, a, s, o, u, _, N, L;
  const d = [];
  d[
    0
    /* Actions.APPEND */
  ] = () => {
    s === void 0 ? s = o : s += o;
  }, d[
    1
    /* Actions.PUSH */
  ] = () => {
    s !== void 0 && (t.push(s), s = void 0);
  }, d[
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ] = () => {
    d[
      0
      /* Actions.APPEND */
    ](), l++;
  }, d[
    3
    /* Actions.PUSH_SUB_PATH */
  ] = () => {
    if (l > 0)
      l--, r = 4, d[
        0
        /* Actions.APPEND */
      ]();
    else {
      if (l = 0, s === void 0 || (s = xr(s), s === !1))
        return !1;
      d[
        1
        /* Actions.PUSH */
      ]();
    }
  };
  function v() {
    const R = e[n + 1];
    if (r === 5 && R === "'" || r === 6 && R === '"')
      return n++, o = "\\" + R, d[
        0
        /* Actions.APPEND */
      ](), !0;
  }
  for (; r !== null; )
    if (n++, a = e[n], !(a === "\\" && v())) {
      if (u = Yr(a), L = Ae[r], _ = L[u] || L.l || 8, _ === 8 || (r = _[0], _[1] !== void 0 && (N = d[_[1]], N && (o = a, N() === !1))))
        return;
      if (r === 7)
        return t;
    }
}
const _n = /* @__PURE__ */ new Map();
function Xr(e, t) {
  return w(e) ? e[t] : null;
}
function Br(e, t) {
  if (!w(e))
    return null;
  let n = _n.get(t);
  if (n || (n = Kr(t), n && _n.set(t, n)), !n)
    return null;
  const r = n.length;
  let l = e, a = 0;
  for (; a < r; ) {
    const s = n[a];
    if (aa.includes(s) && fe(l))
      return null;
    const o = l[s];
    if (o === void 0 || Y(l))
      return null;
    l = o, a++;
  }
  return l;
}
const jr = (e) => e, Jr = (e) => "", Qr = "text", qr = (e) => e.length === 0 ? "" : Za(e), Zr = qa;
function mn(e, t) {
  return e = Math.abs(e), t === 2 ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0;
}
function zr(e) {
  const t = q(e.pluralIndex) ? e.pluralIndex : -1;
  return e.named && (q(e.named.count) || q(e.named.n)) ? q(e.named.count) ? e.named.count : q(e.named.n) ? e.named.n : t : t;
}
function el(e, t) {
  t.count || (t.count = e), t.n || (t.n = e);
}
function tl(e = {}) {
  const t = e.locale, n = zr(e), r = w(e.pluralRules) && A(t) && Y(e.pluralRules[t]) ? e.pluralRules[t] : mn, l = w(e.pluralRules) && A(t) && Y(e.pluralRules[t]) ? mn : void 0, a = (D) => D[r(n, D.length, l)], s = e.list || [], o = (D) => s[D], u = e.named || x();
  q(e.pluralIndex) && el(n, u);
  const _ = (D) => u[D];
  function N(D) {
    const y = Y(e.messages) ? e.messages(D) : w(e.messages) ? e.messages[D] : !1;
    return y || (e.parent ? e.parent.message(D) : Jr);
  }
  const L = (D) => e.modifiers ? e.modifiers[D] : jr, d = F(e.processor) && Y(e.processor.normalize) ? e.processor.normalize : qr, v = F(e.processor) && Y(e.processor.interpolate) ? e.processor.interpolate : Zr, R = F(e.processor) && A(e.processor.type) ? e.processor.type : Qr, S = {
    list: o,
    named: _,
    plural: a,
    linked: (D, ...y) => {
      const [f, E] = y;
      let O = "text", g = "";
      y.length === 1 ? w(f) ? (g = f.modifier || g, O = f.type || O) : A(f) && (g = f || g) : y.length === 2 && (A(f) && (g = f || g), A(E) && (O = E || O));
      const p = N(D)(S), P = (
        // The message in vnode resolved with linked are returned as an array by processor.nomalize
        O === "vnode" && B(p) && g ? p[0] : p
      );
      return g ? L(g)(P, O) : P;
    },
    message: N,
    type: R,
    interpolate: v,
    normalize: d,
    values: te(x(), s, u)
  };
  return S;
}
let ut = null;
function nl(e) {
  ut = e;
}
function al(e, t, n) {
  ut && ut.emit("i18n:init", {
    timestamp: Date.now(),
    i18n: e,
    version: t,
    meta: n
  });
}
const rl = /* @__PURE__ */ ll(
  "function:translate"
  /* IntlifyDevToolsHooks.FunctionTranslate */
);
function ll(e) {
  return (t) => ut && ut.emit(e, t);
}
const ra = bt.__EXTEND_POINT__, Se = pt(ra), re = {
  NOT_FOUND_KEY: ra,
  // 2
  FALLBACK_TO_TRANSLATE: Se(),
  // 3
  CANNOT_FORMAT_NUMBER: Se(),
  // 4
  FALLBACK_TO_NUMBER_FORMAT: Se(),
  // 5
  CANNOT_FORMAT_DATE: Se(),
  // 6
  FALLBACK_TO_DATE_FORMAT: Se(),
  // 7
  EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: Se(),
  // 8
  __EXTEND_POINT__: Se()
  // 9
}, sl = {
  [re.NOT_FOUND_KEY]: "Not found '{key}' key in '{locale}' locale messages.",
  [re.FALLBACK_TO_TRANSLATE]: "Fall back to translate '{key}' key with '{target}' locale.",
  [re.CANNOT_FORMAT_NUMBER]: "Cannot format a number value due to not supported Intl.NumberFormat.",
  [re.FALLBACK_TO_NUMBER_FORMAT]: "Fall back to number format '{key}' key with '{target}' locale.",
  [re.CANNOT_FORMAT_DATE]: "Cannot format a date value due to not supported Intl.DateTimeFormat.",
  [re.FALLBACK_TO_DATE_FORMAT]: "Fall back to datetime format '{key}' key with '{target}' locale.",
  [re.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER]: "This project is using Custom Message Compiler, which is an experimental feature. It may receive breaking changes or be removed in the future."
};
function ke(e, ...t) {
  return Xt(sl[e], ...t);
}
const la = M.__EXTEND_POINT__, Re = pt(la), ee = {
  INVALID_ARGUMENT: la,
  // 17
  INVALID_DATE_ARGUMENT: Re(),
  // 18
  INVALID_ISO_DATE_ARGUMENT: Re(),
  // 19
  NOT_SUPPORT_NON_STRING_MESSAGE: Re(),
  // 20
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: Re(),
  // 21
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: Re(),
  // 22
  NOT_SUPPORT_LOCALE_TYPE: Re(),
  // 23
  __EXTEND_POINT__: Re()
  // 24
};
function Te(e) {
  return xe(e, null, { messages: ol });
}
const ol = {
  [ee.INVALID_ARGUMENT]: "Invalid arguments",
  [ee.INVALID_DATE_ARGUMENT]: "The date provided is an invalid Date object.Make sure your Date represents a valid date.",
  [ee.INVALID_ISO_DATE_ARGUMENT]: "The argument provided is not a valid ISO date string",
  [ee.NOT_SUPPORT_NON_STRING_MESSAGE]: "Not support non-string message",
  [ee.NOT_SUPPORT_LOCALE_PROMISE_VALUE]: "cannot support promise value",
  [ee.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION]: "cannot support async function",
  [ee.NOT_SUPPORT_LOCALE_TYPE]: "cannot support locale type"
};
function Qt(e, t) {
  return t.locale != null ? dn(t.locale) : dn(e.locale);
}
let Ct;
function dn(e) {
  if (A(e))
    return e;
  if (Y(e)) {
    if (e.resolvedOnce && Ct != null)
      return Ct;
    if (e.constructor.name === "Function") {
      const t = e();
      if (Qa(t))
        throw Te(ee.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
      return Ct = t;
    } else
      throw Te(ee.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
  } else
    throw Te(ee.NOT_SUPPORT_LOCALE_TYPE);
}
function il(e, t, n) {
  return [.../* @__PURE__ */ new Set([
    n,
    ...B(t) ? t : w(t) ? Object.keys(t) : A(t) ? [t] : [n]
  ])];
}
function sa(e, t, n) {
  const r = A(n) ? n : Ye, l = e;
  l.__localeChainCache || (l.__localeChainCache = /* @__PURE__ */ new Map());
  let a = l.__localeChainCache.get(r);
  if (!a) {
    a = [];
    let s = [n];
    for (; B(s); )
      s = En(a, s, t);
    const o = B(t) || !F(t) ? t : t.default ? t.default : null;
    s = A(o) ? [o] : o, B(s) && En(a, s, !1), l.__localeChainCache.set(r, a);
  }
  return a;
}
function En(e, t, n) {
  let r = !0;
  for (let l = 0; l < t.length && U(r); l++) {
    const a = t[l];
    A(a) && (r = cl(e, t[l], n));
  }
  return r;
}
function cl(e, t, n) {
  let r;
  const l = t.split("-");
  do {
    const a = l.join("-");
    r = ul(e, a, n), l.splice(-1, 1);
  } while (l.length && r === !0);
  return r;
}
function ul(e, t, n) {
  let r = !1;
  if (!e.includes(t) && (r = !0, t)) {
    r = t[t.length - 1] !== "!";
    const l = t.replace(/!/g, "");
    e.push(l), (B(n) || F(n)) && n[l] && (r = n[l]);
  }
  return r;
}
const fl = "9.14.4", ht = -1, Ye = "en-US", It = "", gn = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function _l() {
  return {
    upper: (e, t) => t === "text" && A(e) ? e.toUpperCase() : t === "vnode" && w(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
    lower: (e, t) => t === "text" && A(e) ? e.toLowerCase() : t === "vnode" && w(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
    capitalize: (e, t) => t === "text" && A(e) ? gn(e) : t === "vnode" && w(e) && "__v_isVNode" in e ? gn(e.children) : e
  };
}
let oa;
function Tn(e) {
  oa = e;
}
let ia;
function ml(e) {
  ia = e;
}
let ca;
function dl(e) {
  ca = e;
}
let ua = null;
const El = /* @__NO_SIDE_EFFECTS__ */ (e) => {
  ua = e;
}, gl = /* @__NO_SIDE_EFFECTS__ */ () => ua;
let fa = null;
const Nn = (e) => {
  fa = e;
}, Tl = () => fa;
let Ln = 0;
function Nl(e = {}) {
  const t = Y(e.onWarn) ? e.onWarn : Z, n = A(e.version) ? e.version : fl, r = A(e.locale) || Y(e.locale) ? e.locale : Ye, l = Y(r) ? Ye : r, a = B(e.fallbackLocale) || F(e.fallbackLocale) || A(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : l, s = F(e.messages) ? e.messages : St(l), o = F(e.datetimeFormats) ? e.datetimeFormats : St(l), u = F(e.numberFormats) ? e.numberFormats : St(l), _ = te(x(), e.modifiers, _l()), N = e.pluralRules || x(), L = Y(e.missing) ? e.missing : null, d = U(e.missingWarn) || he(e.missingWarn) ? e.missingWarn : !0, v = U(e.fallbackWarn) || he(e.fallbackWarn) ? e.fallbackWarn : !0, R = !!e.fallbackFormat, C = !!e.unresolving, S = Y(e.postTranslation) ? e.postTranslation : null, D = F(e.processor) ? e.processor : null, y = U(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, f = !!e.escapeParameter, E = Y(e.messageCompiler) ? e.messageCompiler : oa;
  Y(e.messageCompiler) && Kn(ke(re.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER));
  const O = Y(e.messageResolver) ? e.messageResolver : ia || Xr, g = Y(e.localeFallbacker) ? e.localeFallbacker : ca || il, p = w(e.fallbackContext) ? e.fallbackContext : void 0, P = e, b = w(P.__datetimeFormatters) ? P.__datetimeFormatters : /* @__PURE__ */ new Map(), X = w(P.__numberFormatters) ? P.__numberFormatters : /* @__PURE__ */ new Map(), oe = w(P.__meta) ? P.__meta : {};
  Ln++;
  const V = {
    version: n,
    cid: Ln,
    locale: r,
    fallbackLocale: a,
    messages: s,
    modifiers: _,
    pluralRules: N,
    missing: L,
    missingWarn: d,
    fallbackWarn: v,
    fallbackFormat: R,
    unresolving: C,
    postTranslation: S,
    processor: D,
    warnHtmlMessage: y,
    escapeParameter: f,
    messageCompiler: E,
    messageResolver: O,
    localeFallbacker: g,
    fallbackContext: p,
    onWarn: t,
    __meta: oe
  };
  return V.datetimeFormats = o, V.numberFormats = u, V.__datetimeFormatters = b, V.__numberFormatters = X, V.__v_emitter = P.__v_emitter != null ? P.__v_emitter : void 0, al(V, n, oe), V;
}
const St = (e) => ({ [e]: x() });
function vt(e, t) {
  return e instanceof RegExp ? e.test(t) : e;
}
function _a(e, t) {
  return e instanceof RegExp ? e.test(t) : e;
}
function qt(e, t, n, r, l) {
  const { missing: a, onWarn: s } = e;
  {
    const o = e.__v_emitter;
    o && o.emit("missing", {
      locale: n,
      key: t,
      type: l,
      groupId: `${l}:${t}`
    });
  }
  if (a !== null) {
    const o = a(e, n, t, l);
    return A(o) ? o : t;
  } else
    return _a(r, t) && s(ke(re.NOT_FOUND_KEY, { key: t, locale: n })), t;
}
function ot(e, t, n) {
  const r = e;
  r.__localeChainCache = /* @__PURE__ */ new Map(), e.localeFallbacker(e, n, t);
}
function ma(e, t) {
  return e === t ? !1 : e.split("-")[0] === t.split("-")[0];
}
function Ll(e, t) {
  const n = t.indexOf(e);
  if (n === -1)
    return !1;
  for (let r = n + 1; r < t.length; r++)
    if (ma(e, t[r]))
      return !0;
  return !1;
}
function Rt(e) {
  return (n) => Il(n, e);
}
function Il(e, t) {
  const n = Mr(t);
  if (n == null)
    throw ct(
      0
      /* NodeTypes.Resource */
    );
  if (Jt(n) === 1) {
    const a = Fr(n);
    return e.plural(a.reduce((s, o) => [
      ...s,
      In(e, o)
    ], []));
  } else
    return In(e, n);
}
function In(e, t) {
  const n = Ur(t);
  if (n != null)
    return e.type === "text" ? n : e.normalize([n]);
  {
    const r = wr(t).reduce((l, a) => [...l, Mt(e, a)], []);
    return e.normalize(r);
  }
}
function Mt(e, t) {
  const n = Jt(t);
  switch (n) {
    case 3:
      return Tt(t, n);
    case 9:
      return Tt(t, n);
    case 4: {
      const r = t;
      if (me(r, "k") && r.k)
        return e.interpolate(e.named(r.k));
      if (me(r, "key") && r.key)
        return e.interpolate(e.named(r.key));
      throw ct(n);
    }
    case 5: {
      const r = t;
      if (me(r, "i") && q(r.i))
        return e.interpolate(e.list(r.i));
      if (me(r, "index") && q(r.index))
        return e.interpolate(e.list(r.index));
      throw ct(n);
    }
    case 6: {
      const r = t, l = Vr(r), a = $r(r);
      return e.linked(Mt(e, a), l ? Mt(e, l) : void 0, e.type);
    }
    case 7:
      return Tt(t, n);
    case 8:
      return Tt(t, n);
    default:
      throw new Error(`unhandled node on format message part: ${n}`);
  }
}
const Ol = "Detected HTML in '{source}' message. Recommend not using HTML messages to avoid XSS.";
function da(e, t) {
  t && ir(e) && Z(Xt(Ol, { source: e }));
}
const Ea = (e) => e;
let Ge = x();
function ga(e) {
  e.code === bt.USE_MODULO_SYNTAX && Z(`The use of named interpolation with modulo syntax is deprecated. It will be removed in v10.
reference: https://vue-i18n.intlify.dev/guide/essentials/syntax#rails-i18n-format 
(message compiler warning message: ${e.message})`);
}
function Ta(e, t = {}) {
  let n = !1;
  const r = t.onError || sr;
  return t.onError = (l) => {
    n = !0, r(l);
  }, { ...yr(e, t), detectError: n };
}
const pl = /* @__NO_SIDE_EFFECTS__ */ (e, t) => {
  if (!A(e))
    throw Te(ee.NOT_SUPPORT_NON_STRING_MESSAGE);
  t.onWarn = ga;
  {
    const n = U(t.warnHtmlMessage) ? t.warnHtmlMessage : !0;
    da(e, n);
    const l = (t.onCacheKey || Ea)(e), a = Ge[l];
    if (a)
      return a;
    const { code: s, detectError: o } = Ta(e, t), u = new Function(`return ${s}`)();
    return o ? u : Ge[l] = u;
  }
};
function bl(e, t) {
  if (t.onWarn = ga, __INTLIFY_JIT_COMPILATION__ && !__INTLIFY_DROP_MESSAGE_COMPILER__ && A(e)) {
    const n = U(t.warnHtmlMessage) ? t.warnHtmlMessage : !0;
    da(e, n);
    const l = (t.onCacheKey || Ea)(e), a = Ge[l];
    if (a)
      return a;
    const { ast: s, detectError: o } = Ta(e, {
      ...t,
      location: kr.NODE_ENV !== "production",
      jit: !0
    }), u = Rt(s);
    return o ? u : Ge[l] = u;
  } else {
    if (!fe(e))
      return Z(`the message that is resolve with key '${t.key}' is not supported for jit compilation`), () => e;
    const n = e.cacheKey;
    if (n) {
      const r = Ge[n];
      return r || (Ge[n] = Rt(e));
    } else
      return Rt(e);
  }
}
const On = () => "", ue = (e) => Y(e);
function pn(e, ...t) {
  const { fallbackFormat: n, postTranslation: r, unresolving: l, messageCompiler: a, fallbackLocale: s, messages: o } = e, [u, _] = Ft(...t), N = U(_.missingWarn) ? _.missingWarn : e.missingWarn, L = U(_.fallbackWarn) ? _.fallbackWarn : e.fallbackWarn, d = U(_.escapeParameter) ? _.escapeParameter : e.escapeParameter, v = !!_.resolvedMessage, R = A(_.default) || U(_.default) ? U(_.default) ? a ? u : () => u : _.default : n ? a ? u : () => u : "", C = n || R !== "", S = Qt(e, _);
  d && hl(_);
  let [D, y, f] = v ? [
    u,
    S,
    o[S] || x()
  ] : Na(e, u, S, s, L, N), E = D, O = u;
  if (!v && !(A(E) || fe(E) || ue(E)) && C && (E = R, O = E), !v && (!(A(E) || fe(E) || ue(E)) || !A(y)))
    return l ? ht : u;
  if (A(E) && e.messageCompiler == null)
    return Z(`The message format compilation is not supported in this build. Because message compiler isn't included. You need to pre-compilation all message format. So translate function return '${u}'.`), u;
  let g = !1;
  const p = () => {
    g = !0;
  }, P = ue(E) ? E : La(e, u, y, E, O, p);
  if (g)
    return E;
  const b = Cl(e, y, f, _), X = tl(b), oe = vl(e, P, X), V = r ? r(oe, u) : oe;
  {
    const ne = {
      timestamp: Date.now(),
      key: A(u) ? u : ue(E) ? E.key : "",
      locale: y || (ue(E) ? E.locale : ""),
      format: A(E) ? E : ue(E) ? E.source : "",
      message: V
    };
    ne.meta = te({}, e.__meta, /* @__PURE__ */ gl() || {}), rl(ne);
  }
  return V;
}
function hl(e) {
  B(e.list) ? e.list = e.list.map((t) => A(t) ? rn(t) : t) : w(e.named) && Object.keys(e.named).forEach((t) => {
    A(e.named[t]) && (e.named[t] = rn(e.named[t]));
  });
}
function Na(e, t, n, r, l, a) {
  const { messages: s, onWarn: o, messageResolver: u, localeFallbacker: _ } = e, N = _(e, r, n);
  let L = x(), d, v = null, R = n, C = null;
  const S = "translate";
  for (let D = 0; D < N.length; D++) {
    if (d = C = N[D], n !== d && !ma(n, d) && vt(l, t) && o(ke(re.FALLBACK_TO_TRANSLATE, {
      key: t,
      target: d
    })), n !== d) {
      const O = e.__v_emitter;
      O && O.emit("fallback", {
        type: S,
        key: t,
        from: R,
        to: C,
        groupId: `${S}:${t}`
      });
    }
    L = s[d] || x();
    let y = null, f, E;
    if (de && (y = window.performance.now(), f = "intlify-message-resolve-start", E = "intlify-message-resolve-end", ie && ie(f)), (v = u(L, t)) === null && (v = L[t]), de) {
      const O = window.performance.now(), g = e.__v_emitter;
      g && y && v && g.emit("message-resolve", {
        type: "message-resolve",
        key: t,
        message: v,
        time: O - y,
        groupId: `${S}:${t}`
      }), f && E && ie && ye && (ie(E), ye("intlify message resolve", f, E));
    }
    if (A(v) || fe(v) || ue(v))
      break;
    if (!Ll(d, N)) {
      const O = qt(
        e,
        // eslint-disable-line @typescript-eslint/no-explicit-any
        t,
        d,
        a,
        S
      );
      O !== t && (v = O);
    }
    R = C;
  }
  return [v, d, L];
}
function La(e, t, n, r, l, a) {
  const { messageCompiler: s, warnHtmlMessage: o } = e;
  if (ue(r)) {
    const d = r;
    return d.locale = d.locale || n, d.key = d.key || t, d;
  }
  if (s == null) {
    const d = () => r;
    return d.locale = n, d.key = t, d;
  }
  let u = null, _, N;
  de && (u = window.performance.now(), _ = "intlify-message-compilation-start", N = "intlify-message-compilation-end", ie && ie(_));
  const L = s(r, Al(e, n, l, r, o, a));
  if (de) {
    const d = window.performance.now(), v = e.__v_emitter;
    v && u && v.emit("message-compilation", {
      type: "message-compilation",
      message: r,
      time: d - u,
      groupId: `translate:${t}`
    }), _ && N && ie && ye && (ie(N), ye("intlify message compilation", _, N));
  }
  return L.locale = n, L.key = t, L.source = r, L;
}
function vl(e, t, n) {
  let r = null, l, a;
  de && (r = window.performance.now(), l = "intlify-message-evaluation-start", a = "intlify-message-evaluation-end", ie && ie(l));
  const s = t(n);
  if (de) {
    const o = window.performance.now(), u = e.__v_emitter;
    u && r && u.emit("message-evaluation", {
      type: "message-evaluation",
      value: s,
      time: o - r,
      groupId: `translate:${t.key}`
    }), l && a && ie && ye && (ie(a), ye("intlify message evaluation", l, a));
  }
  return s;
}
function Ft(...e) {
  const [t, n, r] = e, l = x();
  if (!A(t) && !q(t) && !ue(t) && !fe(t))
    throw Te(ee.INVALID_ARGUMENT);
  const a = q(t) ? String(t) : (ue(t), t);
  return q(n) ? l.plural = n : A(n) ? l.default = n : F(n) && !Ot(n) ? l.named = n : B(n) && (l.list = n), q(r) ? l.plural = r : A(r) ? l.default = r : F(r) && te(l, r), [a, l];
}
function Al(e, t, n, r, l, a) {
  return {
    locale: t,
    key: n,
    warnHtmlMessage: l,
    onError: (s) => {
      a && a(s);
      {
        const o = Pl(r), u = `Message compilation error: ${s.message}`, _ = s.location && o && za(o, s.location.start.offset, s.location.end.offset), N = e.__v_emitter;
        N && o && N.emit("compile-error", {
          message: o,
          error: s.message,
          start: s.location && s.location.start.offset,
          end: s.location && s.location.end.offset,
          groupId: `translate:${n}`
        }), console.error(_ ? `${u}
${_}` : u);
      }
    },
    onCacheKey: (s) => Ka(t, n, s)
  };
}
function Pl(e) {
  if (A(e))
    return e;
  if (e.loc && e.loc.source)
    return e.loc.source;
}
function Cl(e, t, n, r) {
  const { modifiers: l, pluralRules: a, messageResolver: s, fallbackLocale: o, fallbackWarn: u, missingWarn: _, fallbackContext: N } = e, d = {
    locale: t,
    modifiers: l,
    pluralRules: a,
    messages: (v) => {
      let R = s(n, v);
      if (R == null && N) {
        const [, , C] = Na(N, v, t, o, u, _);
        R = s(C, v);
      }
      if (A(R) || fe(R)) {
        let C = !1;
        const D = La(e, v, t, R, v, () => {
          C = !0;
        });
        return C ? On : D;
      } else return ue(R) ? R : On;
    }
  };
  return e.processor && (d.processor = e.processor), r.list && (d.list = r.list), r.named && (d.named = r.named), q(r.plural) && (d.pluralIndex = r.plural), d;
}
const bn = typeof Intl < "u", Ia = {
  dateTimeFormat: bn && typeof Intl.DateTimeFormat < "u",
  numberFormat: bn && typeof Intl.NumberFormat < "u"
};
function hn(e, ...t) {
  const { datetimeFormats: n, unresolving: r, fallbackLocale: l, onWarn: a, localeFallbacker: s } = e, { __datetimeFormatters: o } = e;
  if (!Ia.dateTimeFormat)
    return a(ke(re.CANNOT_FORMAT_DATE)), It;
  const [u, _, N, L] = Ut(...t), d = U(N.missingWarn) ? N.missingWarn : e.missingWarn, v = U(N.fallbackWarn) ? N.fallbackWarn : e.fallbackWarn, R = !!N.part, C = Qt(e, N), S = s(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    l,
    C
  );
  if (!A(u) || u === "")
    return new Intl.DateTimeFormat(C, L).format(_);
  let D = {}, y, f = null, E = C, O = null;
  const g = "datetime format";
  for (let b = 0; b < S.length; b++) {
    if (y = O = S[b], C !== y && vt(v, u) && a(ke(re.FALLBACK_TO_DATE_FORMAT, {
      key: u,
      target: y
    })), C !== y) {
      const X = e.__v_emitter;
      X && X.emit("fallback", {
        type: g,
        key: u,
        from: E,
        to: O,
        groupId: `${g}:${u}`
      });
    }
    if (D = n[y] || {}, f = D[u], F(f))
      break;
    qt(e, u, y, d, g), E = O;
  }
  if (!F(f) || !A(y))
    return r ? ht : u;
  let p = `${y}__${u}`;
  Ot(L) || (p = `${p}__${JSON.stringify(L)}`);
  let P = o.get(p);
  return P || (P = new Intl.DateTimeFormat(y, te({}, f, L)), o.set(p, P)), R ? P.formatToParts(_) : P.format(_);
}
const Oa = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits"
];
function Ut(...e) {
  const [t, n, r, l] = e, a = x();
  let s = x(), o;
  if (A(t)) {
    const u = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!u)
      throw Te(ee.INVALID_ISO_DATE_ARGUMENT);
    const _ = u[3] ? u[3].trim().startsWith("T") ? `${u[1].trim()}${u[3].trim()}` : `${u[1].trim()}T${u[3].trim()}` : u[1].trim();
    o = new Date(_);
    try {
      o.toISOString();
    } catch {
      throw Te(ee.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (Ba(t)) {
    if (isNaN(t.getTime()))
      throw Te(ee.INVALID_DATE_ARGUMENT);
    o = t;
  } else if (q(t))
    o = t;
  else
    throw Te(ee.INVALID_ARGUMENT);
  return A(n) ? a.key = n : F(n) && Object.keys(n).forEach((u) => {
    Oa.includes(u) ? s[u] = n[u] : a[u] = n[u];
  }), A(r) ? a.locale = r : F(r) && (s = r), F(l) && (s = l), [a.key || "", o, a, s];
}
function vn(e, t, n) {
  const r = e;
  for (const l in n) {
    const a = `${t}__${l}`;
    r.__datetimeFormatters.has(a) && r.__datetimeFormatters.delete(a);
  }
}
function An(e, ...t) {
  const { numberFormats: n, unresolving: r, fallbackLocale: l, onWarn: a, localeFallbacker: s } = e, { __numberFormatters: o } = e;
  if (!Ia.numberFormat)
    return a(ke(re.CANNOT_FORMAT_NUMBER)), It;
  const [u, _, N, L] = wt(...t), d = U(N.missingWarn) ? N.missingWarn : e.missingWarn, v = U(N.fallbackWarn) ? N.fallbackWarn : e.fallbackWarn, R = !!N.part, C = Qt(e, N), S = s(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    l,
    C
  );
  if (!A(u) || u === "")
    return new Intl.NumberFormat(C, L).format(_);
  let D = {}, y, f = null, E = C, O = null;
  const g = "number format";
  for (let b = 0; b < S.length; b++) {
    if (y = O = S[b], C !== y && vt(v, u) && a(ke(re.FALLBACK_TO_NUMBER_FORMAT, {
      key: u,
      target: y
    })), C !== y) {
      const X = e.__v_emitter;
      X && X.emit("fallback", {
        type: g,
        key: u,
        from: E,
        to: O,
        groupId: `${g}:${u}`
      });
    }
    if (D = n[y] || {}, f = D[u], F(f))
      break;
    qt(e, u, y, d, g), E = O;
  }
  if (!F(f) || !A(y))
    return r ? ht : u;
  let p = `${y}__${u}`;
  Ot(L) || (p = `${p}__${JSON.stringify(L)}`);
  let P = o.get(p);
  return P || (P = new Intl.NumberFormat(y, te({}, f, L)), o.set(p, P)), R ? P.formatToParts(_) : P.format(_);
}
const pa = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay"
];
function wt(...e) {
  const [t, n, r, l] = e, a = x();
  let s = x();
  if (!q(t))
    throw Te(ee.INVALID_ARGUMENT);
  const o = t;
  return A(n) ? a.key = n : F(n) && Object.keys(n).forEach((u) => {
    pa.includes(u) ? s[u] = n[u] : a[u] = n[u];
  }), A(r) ? a.locale = r : F(r) && (s = r), F(l) && (s = l), [a.key || "", o, a, s];
}
function Pn(e, t, n) {
  const r = e;
  for (const l in n) {
    const a = `${t}__${l}`;
    r.__numberFormatters.has(a) && r.__numberFormatters.delete(a);
  }
}
Dr();
function Sl() {
  return ba().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function ba() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Rl = typeof Proxy == "function", yl = "devtools-plugin:setup", kl = "plugin:settings:set";
let Ve, Vt;
function Dl() {
  var e;
  return Ve !== void 0 || (typeof window < "u" && window.performance ? (Ve = !0, Vt = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Ve = !0, Vt = globalThis.perf_hooks.performance) : Ve = !1), Ve;
}
function Ml() {
  return Dl() ? Vt.now() : Date.now();
}
class Fl {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const r = {};
    if (t.settings)
      for (const s in t.settings) {
        const o = t.settings[s];
        r[s] = o.defaultValue;
      }
    const l = `__vue-devtools-plugin-settings__${t.id}`;
    let a = Object.assign({}, r);
    try {
      const s = localStorage.getItem(l), o = JSON.parse(s);
      Object.assign(a, o);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return a;
      },
      setSettings(s) {
        try {
          localStorage.setItem(l, JSON.stringify(s));
        } catch {
        }
        a = s;
      },
      now() {
        return Ml();
      }
    }, n && n.on(kl, (s, o) => {
      s === this.plugin.id && this.fallbacks.setSettings(o);
    }), this.proxiedOn = new Proxy({}, {
      get: (s, o) => this.target ? this.target.on[o] : (...u) => {
        this.onQueue.push({
          method: o,
          args: u
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (s, o) => this.target ? this.target[o] : o === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(o) ? (...u) => (this.targetQueue.push({
        method: o,
        args: u,
        resolve: () => {
        }
      }), this.fallbacks[o](...u)) : (...u) => new Promise((_) => {
        this.targetQueue.push({
          method: o,
          args: u,
          resolve: _
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const n of this.onQueue)
      this.target.on[n.method](...n.args);
    for (const n of this.targetQueue)
      n.resolve(await this.target[n.method](...n.args));
  }
}
function Ul(e, t) {
  const n = e, r = ba(), l = Sl(), a = Rl && n.enableEarlyProxy;
  if (l && (r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !a))
    l.emit(yl, e, t);
  else {
    const s = a ? new Fl(n, l) : null;
    (r.__VUE_DEVTOOLS_PLUGINS__ = r.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: s
    }), s && t(s.proxiedTarget);
  }
}
var wl = { NODE_ENV: '"production"' };
const Vl = "9.14.4";
function $l() {
  typeof __VUE_I18N_FULL_INSTALL__ != "boolean" && (Oe().__VUE_I18N_FULL_INSTALL__ = !0), typeof __VUE_I18N_LEGACY_API__ != "boolean" && (Oe().__VUE_I18N_LEGACY_API__ = !0), typeof __INTLIFY_JIT_COMPILATION__ != "boolean" && (Oe().__INTLIFY_JIT_COMPILATION__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (Oe().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1), typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (Oe().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
const ha = re.__EXTEND_POINT__, Ie = pt(ha), J = {
  FALLBACK_TO_ROOT: ha,
  // 9
  NOT_SUPPORTED_PRESERVE: Ie(),
  // 10
  NOT_SUPPORTED_FORMATTER: Ie(),
  // 11
  NOT_SUPPORTED_PRESERVE_DIRECTIVE: Ie(),
  // 12
  NOT_SUPPORTED_GET_CHOICE_INDEX: Ie(),
  // 13
  COMPONENT_NAME_LEGACY_COMPATIBLE: Ie(),
  // 14
  NOT_FOUND_PARENT_SCOPE: Ie(),
  // 15
  IGNORE_OBJ_FLATTEN: Ie(),
  // 16
  NOTICE_DROP_ALLOW_COMPOSITION: Ie(),
  // 17
  NOTICE_DROP_TRANSLATE_EXIST_COMPATIBLE_FLAG: Ie()
  // 18
}, Wl = {
  [J.FALLBACK_TO_ROOT]: "Fall back to {type} '{key}' with root locale.",
  [J.NOT_SUPPORTED_PRESERVE]: "Not supported 'preserve'.",
  [J.NOT_SUPPORTED_FORMATTER]: "Not supported 'formatter'.",
  [J.NOT_SUPPORTED_PRESERVE_DIRECTIVE]: "Not supported 'preserveDirectiveContent'.",
  [J.NOT_SUPPORTED_GET_CHOICE_INDEX]: "Not supported 'getChoiceIndex'.",
  [J.COMPONENT_NAME_LEGACY_COMPATIBLE]: "Component name legacy compatible: '{name}' -> 'i18n'",
  [J.NOT_FOUND_PARENT_SCOPE]: "Not found parent scope. use the global scope.",
  [J.IGNORE_OBJ_FLATTEN]: "Ignore object flatten: '{key}' key has an string value",
  [J.NOTICE_DROP_ALLOW_COMPOSITION]: "'allowComposition' option will be dropped in the next major version. For more information, please see 👉 https://tinyurl.com/2p97mcze",
  [J.NOTICE_DROP_TRANSLATE_EXIST_COMPATIBLE_FLAG]: "'translateExistCompatible' option will be dropped in the next major version."
};
function se(e, ...t) {
  return Xt(Wl[e], ...t);
}
const va = ee.__EXTEND_POINT__, le = pt(va), $ = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: va,
  // 24
  // legacy module errors
  INVALID_ARGUMENT: le(),
  // 25
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: le(),
  // 26
  NOT_INSTALLED: le(),
  // 27
  NOT_AVAILABLE_IN_LEGACY_MODE: le(),
  // 28
  // directive module errors
  REQUIRED_VALUE: le(),
  // 29
  INVALID_VALUE: le(),
  // 30
  // vue-devtools errors
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: le(),
  // 31
  NOT_INSTALLED_WITH_PROVIDE: le(),
  // 32
  // unexpected error
  UNEXPECTED_ERROR: le(),
  // 33
  // not compatible legacy vue-i18n constructor
  NOT_COMPATIBLE_LEGACY_VUE_I18N: le(),
  // 34
  // bridge support vue 2.x only
  BRIDGE_SUPPORT_VUE_2_ONLY: le(),
  // 35
  // need to define `i18n` option in `allowComposition: true` and `useScope: 'local' at `useI18n``
  MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: le(),
  // 36
  // Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: le(),
  // 37
  // for enhancement
  __EXTEND_POINT__: le()
  // 38
};
function z(e, ...t) {
  return xe(e, null, { messages: Gl, args: t });
}
const Gl = {
  [$.UNEXPECTED_RETURN_TYPE]: "Unexpected return type in composer",
  [$.INVALID_ARGUMENT]: "Invalid argument",
  [$.MUST_BE_CALL_SETUP_TOP]: "Must be called at the top of a `setup` function",
  [$.NOT_INSTALLED]: "Need to install with `app.use` function",
  [$.UNEXPECTED_ERROR]: "Unexpected error",
  [$.NOT_AVAILABLE_IN_LEGACY_MODE]: "Not available in legacy mode",
  [$.REQUIRED_VALUE]: "Required in value: {0}",
  [$.INVALID_VALUE]: "Invalid value",
  [$.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN]: "Cannot setup vue-devtools plugin",
  [$.NOT_INSTALLED_WITH_PROVIDE]: "Need to install with `provide` function",
  [$.NOT_COMPATIBLE_LEGACY_VUE_I18N]: "Not compatible legacy VueI18n.",
  [$.BRIDGE_SUPPORT_VUE_2_ONLY]: "vue-i18n-bridge support Vue 2.x only",
  [$.MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION]: "Must define ‘i18n’ option or custom block in Composition API with using local scope in Legacy API mode",
  [$.NOT_AVAILABLE_COMPOSITION_IN_LEGACY]: "Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly"
}, $t = /* @__PURE__ */ Ne("__translateVNode"), Wt = /* @__PURE__ */ Ne("__datetimeParts"), Gt = /* @__PURE__ */ Ne("__numberParts"), De = /* @__PURE__ */ Ne("__enableEmitter"), ft = /* @__PURE__ */ Ne("__disableEmitter"), Aa = Ne("__setPluralRules"), Pa = /* @__PURE__ */ Ne("__injectWithOption"), Ht = /* @__PURE__ */ Ne("__dispose");
function _t(e) {
  if (!w(e) || fe(e))
    return e;
  for (const t in e)
    if (me(e, t))
      if (!t.includes("."))
        w(e[t]) && _t(e[t]);
      else {
        const n = t.split("."), r = n.length - 1;
        let l = e, a = !1;
        for (let s = 0; s < r; s++) {
          if (n[s] === "__proto__")
            throw new Error(`unsafe key: ${n[s]}`);
          if (n[s] in l || (l[n[s]] = x()), !w(l[n[s]])) {
            Z(se(J.IGNORE_OBJ_FLATTEN, {
              key: n[s]
            })), a = !0;
            break;
          }
          l = l[n[s]];
        }
        if (a || (fe(l) ? aa.includes(n[r]) || delete e[t] : (l[n[r]] = e[t], delete e[t])), !fe(l)) {
          const s = l[n[r]];
          w(s) && _t(s);
        }
      }
  return e;
}
function At(e, t) {
  const { messages: n, __i18n: r, messageResolver: l, flatJson: a } = t, s = F(n) ? n : B(r) ? x() : { [e]: x() };
  if (B(r) && r.forEach((o) => {
    if ("locale" in o && "resource" in o) {
      const { locale: u, resource: _ } = o;
      u ? (s[u] = s[u] || x(), Nt(_, s[u])) : Nt(_, s);
    } else
      A(o) && Nt(JSON.parse(o), s);
  }), l == null && a)
    for (const o in s)
      me(s, o) && _t(s[o]);
  return s;
}
function Ca(e) {
  return e.type;
}
function Sa(e, t, n) {
  let r = w(t.messages) ? t.messages : x();
  "__i18nGlobal" in n && (r = At(e.locale.value, {
    messages: r,
    __i18n: n.__i18nGlobal
  }));
  const l = Object.keys(r);
  l.length && l.forEach((a) => {
    e.mergeLocaleMessage(a, r[a]);
  });
  {
    if (w(t.datetimeFormats)) {
      const a = Object.keys(t.datetimeFormats);
      a.length && a.forEach((s) => {
        e.mergeDateTimeFormat(s, t.datetimeFormats[s]);
      });
    }
    if (w(t.numberFormats)) {
      const a = Object.keys(t.numberFormats);
      a.length && a.forEach((s) => {
        e.mergeNumberFormat(s, t.numberFormats[s]);
      });
    }
  }
}
function Cn(e) {
  return Ha(Ya, null, e, 0);
}
const Sn = "__INTLIFY_META__", Rn = () => [], Hl = () => !1;
let yn = 0;
function kn(e) {
  return (t, n, r, l) => e(n, r, it() || void 0, l);
}
const Yl = /* @__NO_SIDE_EFFECTS__ */ () => {
  const e = it();
  let t = null;
  return e && (t = Ca(e)[Sn]) ? { [Sn]: t } : null;
};
function Zt(e = {}, t) {
  const { __root: n, __injectWithOption: r } = e, l = n === void 0, a = e.flatJson, s = de ? $e : Wn, o = !!e.translateExistCompatible;
  o && Kn(se(J.NOTICE_DROP_TRANSLATE_EXIST_COMPATIBLE_FLAG));
  let u = U(e.inheritLocale) ? e.inheritLocale : !0;
  const _ = s(
    // prettier-ignore
    n && u ? n.locale.value : A(e.locale) ? e.locale : Ye
  ), N = s(
    // prettier-ignore
    n && u ? n.fallbackLocale.value : A(e.fallbackLocale) || B(e.fallbackLocale) || F(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : _.value
  ), L = s(At(_.value, e)), d = s(F(e.datetimeFormats) ? e.datetimeFormats : { [_.value]: {} }), v = s(F(e.numberFormats) ? e.numberFormats : { [_.value]: {} });
  let R = n ? n.missingWarn : U(e.missingWarn) || he(e.missingWarn) ? e.missingWarn : !0, C = n ? n.fallbackWarn : U(e.fallbackWarn) || he(e.fallbackWarn) ? e.fallbackWarn : !0, S = n ? n.fallbackRoot : U(e.fallbackRoot) ? e.fallbackRoot : !0, D = !!e.fallbackFormat, y = Y(e.missing) ? e.missing : null, f = Y(e.missing) ? kn(e.missing) : null, E = Y(e.postTranslation) ? e.postTranslation : null, O = n ? n.warnHtmlMessage : U(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, g = !!e.escapeParameter;
  const p = n ? n.modifiers : F(e.modifiers) ? e.modifiers : {};
  let P = e.pluralRules || n && n.pluralRules, b;
  b = (() => {
    l && Nn(null);
    const m = {
      version: Vl,
      locale: _.value,
      fallbackLocale: N.value,
      messages: L.value,
      modifiers: p,
      pluralRules: P,
      missing: f === null ? void 0 : f,
      missingWarn: R,
      fallbackWarn: C,
      fallbackFormat: D,
      unresolving: !0,
      postTranslation: E === null ? void 0 : E,
      warnHtmlMessage: O,
      escapeParameter: g,
      messageResolver: e.messageResolver,
      messageCompiler: e.messageCompiler,
      __meta: { framework: "vue" }
    };
    m.datetimeFormats = d.value, m.numberFormats = v.value, m.__datetimeFormatters = F(b) ? b.__datetimeFormatters : void 0, m.__numberFormatters = F(b) ? b.__numberFormatters : void 0, m.__v_emitter = F(b) ? b.__v_emitter : void 0;
    const I = Nl(m);
    return l && Nn(I), I;
  })(), ot(b, _.value, N.value);
  function oe() {
    return [
      _.value,
      N.value,
      L.value,
      d.value,
      v.value
    ];
  }
  const V = ge({
    get: () => _.value,
    set: (m) => {
      _.value = m, b.locale = _.value;
    }
  }), ne = ge({
    get: () => N.value,
    set: (m) => {
      N.value = m, b.fallbackLocale = N.value, ot(b, _.value, m);
    }
  }), Ke = ge(() => L.value), Xe = /* @__PURE__ */ ge(() => d.value), Ee = /* @__PURE__ */ ge(() => v.value);
  function Be() {
    return Y(E) ? E : null;
  }
  function je(m) {
    E = m, b.postTranslation = m;
  }
  function Je() {
    return y;
  }
  function Qe(m) {
    m !== null && (f = kn(m)), y = m, b.missing = f;
  }
  function qe(m, I) {
    return m !== "translate" || !I.resolvedMessage;
  }
  const ce = (m, I, G, Q, pe, Et) => {
    oe();
    let we;
    try {
      wl.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__, l || (b.fallbackContext = n ? Tl() : void 0), we = m(b);
    } finally {
      l || (b.fallbackContext = void 0);
    }
    if (G !== "translate exists" && // for not `te` (e.g `t`)
    q(we) && we === ht || G === "translate exists" && !we) {
      const [Ce, Fa] = I();
      if (n && A(Ce) && qe(G, Fa)) {
        S && (vt(C, Ce) || _a(R, Ce)) && Z(se(J.FALLBACK_TO_ROOT, {
          key: Ce,
          type: G
        }));
        {
          const { __v_emitter: nn } = b;
          nn && S && nn.emit("fallback", {
            type: G,
            key: Ce,
            to: "global",
            groupId: `${G}:${Ce}`
          });
        }
      }
      return n && S ? Q(n) : pe(Ce);
    } else {
      if (Et(we))
        return we;
      throw z($.UNEXPECTED_RETURN_TYPE);
    }
  };
  function Me(...m) {
    return ce((I) => Reflect.apply(pn, null, [I, ...m]), () => Ft(...m), "translate", (I) => Reflect.apply(I.t, I, [...m]), (I) => I, (I) => A(I));
  }
  function Fe(...m) {
    const [I, G, Q] = m;
    if (Q && !w(Q))
      throw z($.INVALID_ARGUMENT);
    return Me(I, G, te({ resolvedMessage: !0 }, Q || {}));
  }
  function Ze(...m) {
    return ce((I) => Reflect.apply(hn, null, [I, ...m]), () => Ut(...m), "datetime format", (I) => Reflect.apply(I.d, I, [...m]), () => It, (I) => A(I));
  }
  function ze(...m) {
    return ce((I) => Reflect.apply(An, null, [I, ...m]), () => wt(...m), "number format", (I) => Reflect.apply(I.n, I, [...m]), () => It, (I) => A(I));
  }
  function et(m) {
    return m.map((I) => A(I) || q(I) || U(I) ? Cn(String(I)) : I);
  }
  const tt = {
    normalize: et,
    interpolate: (m) => m,
    type: "vnode"
  };
  function Ue(...m) {
    return ce(
      (I) => {
        let G;
        const Q = I;
        try {
          Q.processor = tt, G = Reflect.apply(pn, null, [Q, ...m]);
        } finally {
          Q.processor = null;
        }
        return G;
      },
      () => Ft(...m),
      "translate",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (I) => I[$t](...m),
      (I) => [Cn(I)],
      (I) => B(I)
    );
  }
  function nt(...m) {
    return ce(
      (I) => Reflect.apply(An, null, [I, ...m]),
      () => wt(...m),
      "number format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (I) => I[Gt](...m),
      Rn,
      (I) => A(I) || B(I)
    );
  }
  function at(...m) {
    return ce(
      (I) => Reflect.apply(hn, null, [I, ...m]),
      () => Ut(...m),
      "datetime format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (I) => I[Wt](...m),
      Rn,
      (I) => A(I) || B(I)
    );
  }
  function rt(m) {
    P = m, b.pluralRules = P;
  }
  function h(m, I) {
    return ce(() => {
      if (!m)
        return !1;
      const G = A(I) ? I : _.value, Q = Pe(G), pe = b.messageResolver(Q, m);
      return o ? pe != null : fe(pe) || ue(pe) || A(pe);
    }, () => [m], "translate exists", (G) => Reflect.apply(G.te, G, [m, I]), Hl, (G) => U(G));
  }
  function W(m) {
    let I = null;
    const G = sa(b, N.value, _.value);
    for (let Q = 0; Q < G.length; Q++) {
      const pe = L.value[G[Q]] || {}, Et = b.messageResolver(pe, m);
      if (Et != null) {
        I = Et;
        break;
      }
    }
    return I;
  }
  function lt(m) {
    const I = W(m);
    return I ?? (n ? n.tm(m) || {} : {});
  }
  function Pe(m) {
    return L.value[m] || {};
  }
  function st(m, I) {
    if (a) {
      const G = { [m]: I };
      for (const Q in G)
        me(G, Q) && _t(G[Q]);
      I = G[m];
    }
    L.value[m] = I, b.messages = L.value;
  }
  function Pt(m, I) {
    L.value[m] = L.value[m] || {};
    const G = { [m]: I };
    if (a)
      for (const Q in G)
        me(G, Q) && _t(G[Q]);
    I = G[m], Nt(I, L.value[m]), b.messages = L.value;
  }
  function i(m) {
    return d.value[m] || {};
  }
  function c(m, I) {
    d.value[m] = I, b.datetimeFormats = d.value, vn(b, m, I);
  }
  function T(m, I) {
    d.value[m] = te(d.value[m] || {}, I), b.datetimeFormats = d.value, vn(b, m, I);
  }
  function k(m) {
    return v.value[m] || {};
  }
  function j(m, I) {
    v.value[m] = I, b.numberFormats = v.value, Pn(b, m, I);
  }
  function K(m, I) {
    v.value[m] = te(v.value[m] || {}, I), b.numberFormats = v.value, Pn(b, m, I);
  }
  yn++, n && de && (Dt(n.locale, (m) => {
    u && (_.value = m, b.locale = m, ot(b, _.value, N.value));
  }), Dt(n.fallbackLocale, (m) => {
    u && (N.value = m, b.fallbackLocale = m, ot(b, _.value, N.value));
  }));
  const H = {
    id: yn,
    locale: V,
    fallbackLocale: ne,
    get inheritLocale() {
      return u;
    },
    set inheritLocale(m) {
      u = m, m && n && (_.value = n.locale.value, N.value = n.fallbackLocale.value, ot(b, _.value, N.value));
    },
    get availableLocales() {
      return Object.keys(L.value).sort();
    },
    messages: Ke,
    get modifiers() {
      return p;
    },
    get pluralRules() {
      return P || {};
    },
    get isGlobal() {
      return l;
    },
    get missingWarn() {
      return R;
    },
    set missingWarn(m) {
      R = m, b.missingWarn = R;
    },
    get fallbackWarn() {
      return C;
    },
    set fallbackWarn(m) {
      C = m, b.fallbackWarn = C;
    },
    get fallbackRoot() {
      return S;
    },
    set fallbackRoot(m) {
      S = m;
    },
    get fallbackFormat() {
      return D;
    },
    set fallbackFormat(m) {
      D = m, b.fallbackFormat = D;
    },
    get warnHtmlMessage() {
      return O;
    },
    set warnHtmlMessage(m) {
      O = m, b.warnHtmlMessage = m;
    },
    get escapeParameter() {
      return g;
    },
    set escapeParameter(m) {
      g = m, b.escapeParameter = m;
    },
    t: Me,
    getLocaleMessage: Pe,
    setLocaleMessage: st,
    mergeLocaleMessage: Pt,
    getPostTranslationHandler: Be,
    setPostTranslationHandler: je,
    getMissingHandler: Je,
    setMissingHandler: Qe,
    [Aa]: rt
  };
  return H.datetimeFormats = Xe, H.numberFormats = Ee, H.rt = Fe, H.te = h, H.tm = lt, H.d = Ze, H.n = ze, H.getDateTimeFormat = i, H.setDateTimeFormat = c, H.mergeDateTimeFormat = T, H.getNumberFormat = k, H.setNumberFormat = j, H.mergeNumberFormat = K, H[Pa] = r, H[$t] = Ue, H[Wt] = at, H[Gt] = nt, H[De] = (m) => {
    b.__v_emitter = m;
  }, H[ft] = () => {
    b.__v_emitter = void 0;
  }, H;
}
function xl(e) {
  const t = A(e.locale) ? e.locale : Ye, n = A(e.fallbackLocale) || B(e.fallbackLocale) || F(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : t, r = Y(e.missing) ? e.missing : void 0, l = U(e.silentTranslationWarn) || he(e.silentTranslationWarn) ? !e.silentTranslationWarn : !0, a = U(e.silentFallbackWarn) || he(e.silentFallbackWarn) ? !e.silentFallbackWarn : !0, s = U(e.fallbackRoot) ? e.fallbackRoot : !0, o = !!e.formatFallbackMessages, u = F(e.modifiers) ? e.modifiers : {}, _ = e.pluralizationRules, N = Y(e.postTranslation) ? e.postTranslation : void 0, L = A(e.warnHtmlInMessage) ? e.warnHtmlInMessage !== "off" : !0, d = !!e.escapeParameterHtml, v = U(e.sync) ? e.sync : !0;
  e.formatter && Z(se(J.NOT_SUPPORTED_FORMATTER)), e.preserveDirectiveContent && Z(se(J.NOT_SUPPORTED_PRESERVE_DIRECTIVE));
  let R = e.messages;
  if (F(e.sharedMessages)) {
    const g = e.sharedMessages;
    R = Object.keys(g).reduce((P, b) => {
      const X = P[b] || (P[b] = {});
      return te(X, g[b]), P;
    }, R || {});
  }
  const { __i18n: C, __root: S, __injectWithOption: D } = e, y = e.datetimeFormats, f = e.numberFormats, E = e.flatJson, O = e.translateExistCompatible;
  return {
    locale: t,
    fallbackLocale: n,
    messages: R,
    flatJson: E,
    datetimeFormats: y,
    numberFormats: f,
    missing: r,
    missingWarn: l,
    fallbackWarn: a,
    fallbackRoot: s,
    fallbackFormat: o,
    modifiers: u,
    pluralRules: _,
    postTranslation: N,
    warnHtmlMessage: L,
    escapeParameter: d,
    messageResolver: e.messageResolver,
    inheritLocale: v,
    translateExistCompatible: O,
    __i18n: C,
    __root: S,
    __injectWithOption: D
  };
}
function Yt(e = {}, t) {
  {
    const n = Zt(xl(e)), { __extender: r } = e, l = {
      // id
      id: n.id,
      // locale
      get locale() {
        return n.locale.value;
      },
      set locale(a) {
        n.locale.value = a;
      },
      // fallbackLocale
      get fallbackLocale() {
        return n.fallbackLocale.value;
      },
      set fallbackLocale(a) {
        n.fallbackLocale.value = a;
      },
      // messages
      get messages() {
        return n.messages.value;
      },
      // datetimeFormats
      get datetimeFormats() {
        return n.datetimeFormats.value;
      },
      // numberFormats
      get numberFormats() {
        return n.numberFormats.value;
      },
      // availableLocales
      get availableLocales() {
        return n.availableLocales;
      },
      // formatter
      get formatter() {
        return Z(se(J.NOT_SUPPORTED_FORMATTER)), {
          interpolate() {
            return [];
          }
        };
      },
      set formatter(a) {
        Z(se(J.NOT_SUPPORTED_FORMATTER));
      },
      // missing
      get missing() {
        return n.getMissingHandler();
      },
      set missing(a) {
        n.setMissingHandler(a);
      },
      // silentTranslationWarn
      get silentTranslationWarn() {
        return U(n.missingWarn) ? !n.missingWarn : n.missingWarn;
      },
      set silentTranslationWarn(a) {
        n.missingWarn = U(a) ? !a : a;
      },
      // silentFallbackWarn
      get silentFallbackWarn() {
        return U(n.fallbackWarn) ? !n.fallbackWarn : n.fallbackWarn;
      },
      set silentFallbackWarn(a) {
        n.fallbackWarn = U(a) ? !a : a;
      },
      // modifiers
      get modifiers() {
        return n.modifiers;
      },
      // formatFallbackMessages
      get formatFallbackMessages() {
        return n.fallbackFormat;
      },
      set formatFallbackMessages(a) {
        n.fallbackFormat = a;
      },
      // postTranslation
      get postTranslation() {
        return n.getPostTranslationHandler();
      },
      set postTranslation(a) {
        n.setPostTranslationHandler(a);
      },
      // sync
      get sync() {
        return n.inheritLocale;
      },
      set sync(a) {
        n.inheritLocale = a;
      },
      // warnInHtmlMessage
      get warnHtmlInMessage() {
        return n.warnHtmlMessage ? "warn" : "off";
      },
      set warnHtmlInMessage(a) {
        n.warnHtmlMessage = a !== "off";
      },
      // escapeParameterHtml
      get escapeParameterHtml() {
        return n.escapeParameter;
      },
      set escapeParameterHtml(a) {
        n.escapeParameter = a;
      },
      // preserveDirectiveContent
      get preserveDirectiveContent() {
        return Z(se(J.NOT_SUPPORTED_PRESERVE_DIRECTIVE)), !0;
      },
      set preserveDirectiveContent(a) {
        Z(se(J.NOT_SUPPORTED_PRESERVE_DIRECTIVE));
      },
      // pluralizationRules
      get pluralizationRules() {
        return n.pluralRules || {};
      },
      // for internal
      __composer: n,
      // t
      t(...a) {
        const [s, o, u] = a, _ = {};
        let N = null, L = null;
        if (!A(s))
          throw z($.INVALID_ARGUMENT);
        const d = s;
        return A(o) ? _.locale = o : B(o) ? N = o : F(o) && (L = o), B(u) ? N = u : F(u) && (L = u), Reflect.apply(n.t, n, [
          d,
          N || L || {},
          _
        ]);
      },
      rt(...a) {
        return Reflect.apply(n.rt, n, [...a]);
      },
      // tc
      tc(...a) {
        const [s, o, u] = a, _ = { plural: 1 };
        let N = null, L = null;
        if (!A(s))
          throw z($.INVALID_ARGUMENT);
        const d = s;
        return A(o) ? _.locale = o : q(o) ? _.plural = o : B(o) ? N = o : F(o) && (L = o), A(u) ? _.locale = u : B(u) ? N = u : F(u) && (L = u), Reflect.apply(n.t, n, [
          d,
          N || L || {},
          _
        ]);
      },
      // te
      te(a, s) {
        return n.te(a, s);
      },
      // tm
      tm(a) {
        return n.tm(a);
      },
      // getLocaleMessage
      getLocaleMessage(a) {
        return n.getLocaleMessage(a);
      },
      // setLocaleMessage
      setLocaleMessage(a, s) {
        n.setLocaleMessage(a, s);
      },
      // mergeLocaleMessage
      mergeLocaleMessage(a, s) {
        n.mergeLocaleMessage(a, s);
      },
      // d
      d(...a) {
        return Reflect.apply(n.d, n, [...a]);
      },
      // getDateTimeFormat
      getDateTimeFormat(a) {
        return n.getDateTimeFormat(a);
      },
      // setDateTimeFormat
      setDateTimeFormat(a, s) {
        n.setDateTimeFormat(a, s);
      },
      // mergeDateTimeFormat
      mergeDateTimeFormat(a, s) {
        n.mergeDateTimeFormat(a, s);
      },
      // n
      n(...a) {
        return Reflect.apply(n.n, n, [...a]);
      },
      // getNumberFormat
      getNumberFormat(a) {
        return n.getNumberFormat(a);
      },
      // setNumberFormat
      setNumberFormat(a, s) {
        n.setNumberFormat(a, s);
      },
      // mergeNumberFormat
      mergeNumberFormat(a, s) {
        n.mergeNumberFormat(a, s);
      },
      // getChoiceIndex
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getChoiceIndex(a, s) {
        return Z(se(J.NOT_SUPPORTED_GET_CHOICE_INDEX)), -1;
      }
    };
    return l.__extender = r, l.__enableEmitter = (a) => {
      const s = n;
      s[De] && s[De](a);
    }, l.__disableEmitter = () => {
      const a = n;
      a[ft] && a[ft]();
    }, l;
  }
}
const zt = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
    validator: (e) => e === "parent" || e === "global",
    default: "parent"
    /* ComponentI18nScope */
  },
  i18n: {
    type: Object
  }
};
function Kl({ slots: e }, t) {
  return t.length === 1 && t[0] === "default" ? (e.default ? e.default() : []).reduce((r, l) => [
    ...r,
    // prettier-ignore
    ...l.type === Hn ? l.children : [l]
  ], []) : t.reduce((n, r) => {
    const l = e[r];
    return l && (n[r] = l()), n;
  }, x());
}
function Ra(e) {
  return Hn;
}
const Xl = /* @__PURE__ */ Kt({
  /* eslint-disable */
  name: "i18n-t",
  props: te({
    keypath: {
      type: String,
      required: !0
    },
    plural: {
      type: [Number, String],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validator: (e) => q(e) || !isNaN(e)
    }
  }, zt),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const { slots: n, attrs: r } = t, l = e.i18n || tn({
      useScope: e.scope,
      __useComponent: !0
    });
    return () => {
      const a = Object.keys(n).filter((L) => L !== "_"), s = x();
      e.locale && (s.locale = e.locale), e.plural !== void 0 && (s.plural = A(e.plural) ? +e.plural : e.plural);
      const o = Kl(t, a), u = l[$t](e.keypath, o, s), _ = te(x(), r), N = A(e.tag) || w(e.tag) ? e.tag : Ra();
      return Gn(N, _, u);
    };
  }
}), yt = Xl;
function Bl(e) {
  return B(e) && !A(e[0]);
}
function ya(e, t, n, r) {
  const { slots: l, attrs: a } = t;
  return () => {
    const s = { part: !0 };
    let o = x();
    e.locale && (s.locale = e.locale), A(e.format) ? s.key = e.format : w(e.format) && (A(e.format.key) && (s.key = e.format.key), o = Object.keys(e.format).reduce((d, v) => n.includes(v) ? te(x(), d, { [v]: e.format[v] }) : d, x()));
    const u = r(e.value, s, o);
    let _ = [s.key];
    B(u) ? _ = u.map((d, v) => {
      const R = l[d.type], C = R ? R({ [d.type]: d.value, index: v, parts: u }) : [d.value];
      return Bl(C) && (C[0].key = `${d.type}-${v}`), C;
    }) : A(u) && (_ = [u]);
    const N = te(x(), a), L = A(e.tag) || w(e.tag) ? e.tag : Ra();
    return Gn(L, N, _);
  };
}
const jl = /* @__PURE__ */ Kt({
  /* eslint-disable */
  name: "i18n-n",
  props: te({
    value: {
      type: Number,
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, zt),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const n = e.i18n || tn({
      useScope: e.scope,
      __useComponent: !0
    });
    return ya(e, t, pa, (...r) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      n[Gt](...r)
    ));
  }
}), Dn = jl, Jl = /* @__PURE__ */ Kt({
  /* eslint-disable */
  name: "i18n-d",
  props: te({
    value: {
      type: [Number, Date],
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, zt),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const n = e.i18n || tn({
      useScope: e.scope,
      __useComponent: !0
    });
    return ya(e, t, Oa, (...r) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      n[Wt](...r)
    ));
  }
}), Mn = Jl;
function Ql(e, t) {
  const n = e;
  if (e.mode === "composition")
    return n.__getInstance(t) || e.global;
  {
    const r = n.__getInstance(t);
    return r != null ? r.__composer : e.global.__composer;
  }
}
function ql(e) {
  const t = (s) => {
    const { instance: o, modifiers: u, value: _ } = s;
    if (!o || !o.$)
      throw z($.UNEXPECTED_ERROR);
    const N = Ql(e, o.$);
    u.preserve && Z(se(J.NOT_SUPPORTED_PRESERVE));
    const L = Fn(_);
    return [
      Reflect.apply(N.t, N, [...Un(L)]),
      N
    ];
  };
  return {
    created: (s, o) => {
      const [u, _] = t(o);
      de && e.global === _ && (s.__i18nWatcher = Dt(_.locale, () => {
        o.instance && o.instance.$forceUpdate();
      })), s.__composer = _, s.textContent = u;
    },
    unmounted: (s) => {
      de && s.__i18nWatcher && (s.__i18nWatcher(), s.__i18nWatcher = void 0, delete s.__i18nWatcher), s.__composer && (s.__composer = void 0, delete s.__composer);
    },
    beforeUpdate: (s, { value: o }) => {
      if (s.__composer) {
        const u = s.__composer, _ = Fn(o);
        s.textContent = Reflect.apply(u.t, u, [
          ...Un(_)
        ]);
      }
    },
    getSSRProps: (s) => {
      const [o] = t(s);
      return { textContent: o };
    }
  };
}
function Fn(e) {
  if (A(e))
    return { path: e };
  if (F(e)) {
    if (!("path" in e))
      throw z($.REQUIRED_VALUE, "path");
    return e;
  } else
    throw z($.INVALID_VALUE);
}
function Un(e) {
  const { path: t, locale: n, args: r, choice: l, plural: a } = e, s = {}, o = r || {};
  return A(n) && (s.locale = n), q(l) && (s.plural = l), q(a) && (s.plural = a), [t, o, s];
}
function Zl(e, t, ...n) {
  const r = F(n[0]) ? n[0] : {}, l = !!r.useI18nComponentName, a = U(r.globalInstall) ? r.globalInstall : !0;
  a && l && Z(se(J.COMPONENT_NAME_LEGACY_COMPATIBLE, {
    name: yt.name
  })), a && ([l ? "i18n" : yt.name, "I18nT"].forEach((s) => e.component(s, yt)), [Dn.name, "I18nN"].forEach((s) => e.component(s, Dn)), [Mn.name, "I18nD"].forEach((s) => e.component(s, Mn))), e.directive("t", ql(t));
}
const kt = {
  "vue-devtools-plugin-vue-i18n": "Vue I18n devtools",
  "vue-i18n-resource-inspector": "I18n Resources",
  "vue-i18n-timeline": "Vue I18n"
}, zl = {
  "vue-i18n-resource-inspector": "Search for scopes ..."
}, es = {
  "vue-i18n-timeline": 16764185
}, ka = "vue-i18n: composer properties";
let xt;
async function ts(e, t) {
  return new Promise((n, r) => {
    try {
      Ul({
        id: "vue-devtools-plugin-vue-i18n",
        label: kt[
          "vue-devtools-plugin-vue-i18n"
          /* VueDevToolsIDs.PLUGIN */
        ],
        packageName: "vue-i18n",
        homepage: "https://vue-i18n.intlify.dev",
        logo: "https://vue-i18n.intlify.dev/vue-i18n-devtools-logo.png",
        componentStateTypes: [ka],
        app: e
        // eslint-disable-line @typescript-eslint/no-explicit-any
      }, (l) => {
        xt = l, l.on.visitComponentTree(({ componentInstance: s, treeNode: o }) => {
          ns(s, o, t);
        }), l.on.inspectComponent(({ componentInstance: s, instanceData: o }) => {
          s.vnode.el && s.vnode.el.__VUE_I18N__ && o && (t.mode === "legacy" ? s.vnode.el.__VUE_I18N__ !== t.global.__composer && wn(o, s.vnode.el.__VUE_I18N__) : wn(o, s.vnode.el.__VUE_I18N__));
        }), l.addInspector({
          id: "vue-i18n-resource-inspector",
          label: kt[
            "vue-i18n-resource-inspector"
            /* VueDevToolsIDs.CUSTOM_INSPECTOR */
          ],
          icon: "language",
          treeFilterPlaceholder: zl[
            "vue-i18n-resource-inspector"
            /* VueDevToolsIDs.CUSTOM_INSPECTOR */
          ]
        }), l.on.getInspectorTree((s) => {
          s.app === e && s.inspectorId === "vue-i18n-resource-inspector" && os(s, t);
        });
        const a = /* @__PURE__ */ new Map();
        l.on.getInspectorState(async (s) => {
          if (s.app === e && s.inspectorId === "vue-i18n-resource-inspector")
            if (l.unhighlightElement(), cs(s, t), s.nodeId === "global") {
              if (!a.has(s.app)) {
                const [o] = await l.getComponentInstances(s.app);
                a.set(s.app, o);
              }
              l.highlightElement(a.get(s.app));
            } else {
              const o = is(s.nodeId, t);
              o && l.highlightElement(o);
            }
        }), l.on.editInspectorState((s) => {
          s.app === e && s.inspectorId === "vue-i18n-resource-inspector" && fs(s, t);
        }), l.addTimelineLayer({
          id: "vue-i18n-timeline",
          label: kt[
            "vue-i18n-timeline"
            /* VueDevToolsIDs.TIMELINE */
          ],
          color: es[
            "vue-i18n-timeline"
            /* VueDevToolsIDs.TIMELINE */
          ]
        }), n(!0);
      });
    } catch (l) {
      console.error(l), r(!1);
    }
  });
}
function Da(e) {
  return e.type.name || e.type.displayName || e.type.__file || "Anonymous";
}
function ns(e, t, n) {
  const r = n.mode === "composition" ? n.global : n.global.__composer;
  if (e && e.vnode.el && e.vnode.el.__VUE_I18N__ && e.vnode.el.__VUE_I18N__ !== r) {
    const l = {
      label: `i18n (${Da(e)} Scope)`,
      textColor: 0,
      backgroundColor: 16764185
    };
    t.tags.push(l);
  }
}
function wn(e, t) {
  const n = ka;
  e.state.push({
    type: n,
    key: "locale",
    editable: !0,
    value: t.locale.value
  }), e.state.push({
    type: n,
    key: "availableLocales",
    editable: !1,
    value: t.availableLocales
  }), e.state.push({
    type: n,
    key: "fallbackLocale",
    editable: !0,
    value: t.fallbackLocale.value
  }), e.state.push({
    type: n,
    key: "inheritLocale",
    editable: !0,
    value: t.inheritLocale
  }), e.state.push({
    type: n,
    key: "messages",
    editable: !1,
    value: en(t.messages.value)
  }), e.state.push({
    type: n,
    key: "datetimeFormats",
    editable: !1,
    value: t.datetimeFormats.value
  }), e.state.push({
    type: n,
    key: "numberFormats",
    editable: !1,
    value: t.numberFormats.value
  });
}
function en(e) {
  const t = {};
  return Object.keys(e).forEach((n) => {
    const r = e[n];
    Y(r) && "source" in r ? t[n] = ss(r) : fe(r) && r.loc && r.loc.source ? t[n] = r.loc.source : w(r) ? t[n] = en(r) : t[n] = r;
  }), t;
}
const as = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "&": "&amp;"
};
function rs(e) {
  return e.replace(/[<>"&]/g, ls);
}
function ls(e) {
  return as[e] || e;
}
function ss(e) {
  return {
    _custom: {
      type: "function",
      display: `<span>ƒ</span> ${e.source ? `("${rs(e.source)}")` : "(?)"}`
    }
  };
}
function os(e, t) {
  e.rootNodes.push({
    id: "global",
    label: "Global Scope"
  });
  const n = t.mode === "composition" ? t.global : t.global.__composer;
  for (const [r, l] of t.__instances) {
    const a = t.mode === "composition" ? l : l.__composer;
    n !== a && e.rootNodes.push({
      id: a.id.toString(),
      label: `${Da(r)} Scope`
    });
  }
}
function is(e, t) {
  let n = null;
  if (e !== "global") {
    for (const [r, l] of t.__instances.entries())
      if (l.id.toString() === e) {
        n = r;
        break;
      }
  }
  return n;
}
function Ma(e, t) {
  if (e === "global")
    return t.mode === "composition" ? t.global : t.global.__composer;
  {
    const n = Array.from(t.__instances.values()).find((r) => r.id.toString() === e);
    return n ? t.mode === "composition" ? n : n.__composer : null;
  }
}
function cs(e, t) {
  const n = Ma(e.nodeId, t);
  return n && (e.state = us(n)), null;
}
function us(e) {
  const t = {}, n = "Locale related info", r = [
    {
      type: n,
      key: "locale",
      editable: !0,
      value: e.locale.value
    },
    {
      type: n,
      key: "fallbackLocale",
      editable: !0,
      value: e.fallbackLocale.value
    },
    {
      type: n,
      key: "availableLocales",
      editable: !1,
      value: e.availableLocales
    },
    {
      type: n,
      key: "inheritLocale",
      editable: !0,
      value: e.inheritLocale
    }
  ];
  t[n] = r;
  const l = "Locale messages info", a = [
    {
      type: l,
      key: "messages",
      editable: !1,
      value: en(e.messages.value)
    }
  ];
  t[l] = a;
  {
    const s = "Datetime formats info", o = [
      {
        type: s,
        key: "datetimeFormats",
        editable: !1,
        value: e.datetimeFormats.value
      }
    ];
    t[s] = o;
    const u = "Datetime formats info", _ = [
      {
        type: u,
        key: "numberFormats",
        editable: !1,
        value: e.numberFormats.value
      }
    ];
    t[u] = _;
  }
  return t;
}
function mt(e, t) {
  if (xt) {
    let n;
    t && "groupId" in t && (n = t.groupId, delete t.groupId), xt.addTimelineEvent({
      layerId: "vue-i18n-timeline",
      event: {
        title: e,
        groupId: n,
        time: Date.now(),
        meta: {},
        data: t || {},
        logType: e === "compile-error" ? "error" : e === "fallback" || e === "missing" ? "warning" : "default"
      }
    });
  }
}
function fs(e, t) {
  const n = Ma(e.nodeId, t);
  if (n) {
    const [r] = e.path;
    r === "locale" && A(e.state.value) ? n.locale.value = e.state.value : r === "fallbackLocale" && (A(e.state.value) || B(e.state.value) || w(e.state.value)) ? n.fallbackLocale.value = e.state.value : r === "inheritLocale" && U(e.state.value) && (n.inheritLocale = e.state.value);
  }
}
function _s(e, t, n) {
  return {
    beforeCreate() {
      const r = it();
      if (!r)
        throw z($.UNEXPECTED_ERROR);
      const l = this.$options;
      if (l.i18n) {
        const a = l.i18n;
        if (l.__i18n && (a.__i18n = l.__i18n), a.__root = t, this === this.$root)
          this.$i18n = Vn(e, a);
        else {
          a.__injectWithOption = !0, a.__extender = n.__vueI18nExtend, this.$i18n = Yt(a);
          const s = this.$i18n;
          s.__extender && (s.__disposer = s.__extender(this.$i18n));
        }
      } else if (l.__i18n)
        if (this === this.$root)
          this.$i18n = Vn(e, l);
        else {
          this.$i18n = Yt({
            __i18n: l.__i18n,
            __injectWithOption: !0,
            __extender: n.__vueI18nExtend,
            __root: t
          });
          const a = this.$i18n;
          a.__extender && (a.__disposer = a.__extender(this.$i18n));
        }
      else
        this.$i18n = e;
      l.__i18nGlobal && Sa(t, l, l), this.$t = (...a) => this.$i18n.t(...a), this.$rt = (...a) => this.$i18n.rt(...a), this.$tc = (...a) => this.$i18n.tc(...a), this.$te = (a, s) => this.$i18n.te(a, s), this.$d = (...a) => this.$i18n.d(...a), this.$n = (...a) => this.$i18n.n(...a), this.$tm = (a) => this.$i18n.tm(a), n.__setInstance(r, this.$i18n);
    },
    mounted() {
      if (this.$el && this.$i18n) {
        const r = this.$i18n;
        this.$el.__VUE_I18N__ = r.__composer;
        const l = this.__v_emitter = Bt();
        r.__enableEmitter && r.__enableEmitter(l), l.on("*", mt);
      }
    },
    unmounted() {
      const r = it();
      if (!r)
        throw z($.UNEXPECTED_ERROR);
      const l = this.$i18n;
      this.$el && this.$el.__VUE_I18N__ && (this.__v_emitter && (this.__v_emitter.off("*", mt), delete this.__v_emitter), this.$i18n && (l.__disableEmitter && l.__disableEmitter(), delete this.$el.__VUE_I18N__)), delete this.$t, delete this.$rt, delete this.$tc, delete this.$te, delete this.$d, delete this.$n, delete this.$tm, l.__disposer && (l.__disposer(), delete l.__disposer, delete l.__extender), n.__deleteInstance(r), delete this.$i18n;
    }
  };
}
function Vn(e, t) {
  e.locale = t.locale || e.locale, e.fallbackLocale = t.fallbackLocale || e.fallbackLocale, e.missing = t.missing || e.missing, e.silentTranslationWarn = t.silentTranslationWarn || e.silentFallbackWarn, e.silentFallbackWarn = t.silentFallbackWarn || e.silentFallbackWarn, e.formatFallbackMessages = t.formatFallbackMessages || e.formatFallbackMessages, e.postTranslation = t.postTranslation || e.postTranslation, e.warnHtmlInMessage = t.warnHtmlInMessage || e.warnHtmlInMessage, e.escapeParameterHtml = t.escapeParameterHtml || e.escapeParameterHtml, e.sync = t.sync || e.sync, e.__composer[Aa](t.pluralizationRules || e.pluralizationRules);
  const n = At(e.locale, {
    messages: t.messages,
    __i18n: t.__i18n
  });
  return Object.keys(n).forEach((r) => e.mergeLocaleMessage(r, n[r])), t.datetimeFormats && Object.keys(t.datetimeFormats).forEach((r) => e.mergeDateTimeFormat(r, t.datetimeFormats[r])), t.numberFormats && Object.keys(t.numberFormats).forEach((r) => e.mergeNumberFormat(r, t.numberFormats[r])), e;
}
const ms = /* @__PURE__ */ Ne("global-vue-i18n");
function vs(e = {}, t) {
  const n = __VUE_I18N_LEGACY_API__ && U(e.legacy) ? e.legacy : __VUE_I18N_LEGACY_API__, r = U(e.globalInjection) ? e.globalInjection : !0, l = __VUE_I18N_LEGACY_API__ && n ? !!e.allowComposition : !0, a = /* @__PURE__ */ new Map(), [s, o] = ds(e, n), u = /* @__PURE__ */ Ne("vue-i18n");
  n && l && Z(se(J.NOTICE_DROP_ALLOW_COMPOSITION));
  function _(d) {
    return a.get(d) || null;
  }
  function N(d, v) {
    a.set(d, v);
  }
  function L(d) {
    a.delete(d);
  }
  {
    const d = {
      // mode
      get mode() {
        return __VUE_I18N_LEGACY_API__ && n ? "legacy" : "composition";
      },
      // allowComposition
      get allowComposition() {
        return l;
      },
      // install plugin
      async install(v, ...R) {
        if (v.__VUE_I18N__ = d, v.__VUE_I18N_SYMBOL__ = u, v.provide(v.__VUE_I18N_SYMBOL__, d), F(R[0])) {
          const D = R[0];
          d.__composerExtend = D.__composerExtend, d.__vueI18nExtend = D.__vueI18nExtend;
        }
        let C = null;
        !n && r && (C = bs(v, d.global)), __VUE_I18N_FULL_INSTALL__ && Zl(v, d, ...R), __VUE_I18N_LEGACY_API__ && n && v.mixin(_s(o, o.__composer, d));
        const S = v.unmount;
        v.unmount = () => {
          C && C(), d.dispose(), S();
        };
        {
          if (!await ts(v, d))
            throw z($.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN);
          const y = Bt();
          if (n) {
            const f = o;
            f.__enableEmitter && f.__enableEmitter(y);
          } else {
            const f = o;
            f[De] && f[De](y);
          }
          y.on("*", mt);
        }
      },
      // global accessor
      get global() {
        return o;
      },
      dispose() {
        s.stop();
      },
      // @internal
      __instances: a,
      // @internal
      __getInstance: _,
      // @internal
      __setInstance: N,
      // @internal
      __deleteInstance: L
    };
    return d;
  }
}
function tn(e = {}) {
  const t = it();
  if (t == null)
    throw z($.MUST_BE_CALL_SETUP_TOP);
  if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__)
    throw z($.NOT_INSTALLED);
  const n = Es(t), r = Ts(n), l = Ca(t), a = gs(e, l);
  if (__VUE_I18N_LEGACY_API__ && n.mode === "legacy" && !e.__useComponent) {
    if (!n.allowComposition)
      throw z($.NOT_AVAILABLE_IN_LEGACY_MODE);
    return Os(t, a, r, e);
  }
  if (a === "global")
    return Sa(r, e, l), r;
  if (a === "parent") {
    let u = Ns(n, t, e.__useComponent);
    return u == null && (Z(se(J.NOT_FOUND_PARENT_SCOPE)), u = r), u;
  }
  const s = n;
  let o = s.__getInstance(t);
  if (o == null) {
    const u = te({}, e);
    "__i18n" in l && (u.__i18n = l.__i18n), r && (u.__root = r), o = Zt(u), s.__composerExtend && (o[Ht] = s.__composerExtend(o)), Is(s, t, o), s.__setInstance(t, o);
  }
  return o;
}
function ds(e, t, n) {
  const r = Ua();
  {
    const l = __VUE_I18N_LEGACY_API__ && t ? r.run(() => Yt(e)) : r.run(() => Zt(e));
    if (l == null)
      throw z($.UNEXPECTED_ERROR);
    return [r, l];
  }
}
function Es(e) {
  {
    const t = Va(e.isCE ? ms : e.appContext.app.__VUE_I18N_SYMBOL__);
    if (!t)
      throw z(e.isCE ? $.NOT_INSTALLED_WITH_PROVIDE : $.UNEXPECTED_ERROR);
    return t;
  }
}
function gs(e, t) {
  return Ot(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
}
function Ts(e) {
  return e.mode === "composition" ? e.global : e.global.__composer;
}
function Ns(e, t, n = !1) {
  let r = null;
  const l = t.root;
  let a = Ls(t, n);
  for (; a != null; ) {
    const s = e;
    if (e.mode === "composition")
      r = s.__getInstance(a);
    else if (__VUE_I18N_LEGACY_API__) {
      const o = s.__getInstance(a);
      o != null && (r = o.__composer, n && r && !r[Pa] && (r = null));
    }
    if (r != null || l === a)
      break;
    a = a.parent;
  }
  return r;
}
function Ls(e, t = !1) {
  return e == null ? null : t && e.vnode.ctx || e.parent;
}
function Is(e, t, n) {
  let r = null;
  $a(() => {
    if (t.vnode.el) {
      t.vnode.el.__VUE_I18N__ = n, r = Bt();
      const l = n;
      l[De] && l[De](r), r.on("*", mt);
    }
  }, t), Wa(() => {
    const l = n;
    t.vnode.el && t.vnode.el.__VUE_I18N__ && (r && r.off("*", mt), l[ft] && l[ft](), delete t.vnode.el.__VUE_I18N__), e.__deleteInstance(t);
    const a = l[Ht];
    a && (a(), delete l[Ht]);
  }, t);
}
function Os(e, t, n, r = {}) {
  const l = t === "local", a = Wn(null);
  if (l && e.proxy && !(e.proxy.$options.i18n || e.proxy.$options.__i18n))
    throw z($.MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION);
  const s = U(r.inheritLocale) ? r.inheritLocale : !A(r.locale), o = $e(
    // prettier-ignore
    !l || s ? n.locale.value : A(r.locale) ? r.locale : Ye
  ), u = $e(
    // prettier-ignore
    !l || s ? n.fallbackLocale.value : A(r.fallbackLocale) || B(r.fallbackLocale) || F(r.fallbackLocale) || r.fallbackLocale === !1 ? r.fallbackLocale : o.value
  ), _ = $e(At(o.value, r)), N = $e(F(r.datetimeFormats) ? r.datetimeFormats : { [o.value]: {} }), L = $e(F(r.numberFormats) ? r.numberFormats : { [o.value]: {} }), d = l ? n.missingWarn : U(r.missingWarn) || he(r.missingWarn) ? r.missingWarn : !0, v = l ? n.fallbackWarn : U(r.fallbackWarn) || he(r.fallbackWarn) ? r.fallbackWarn : !0, R = l ? n.fallbackRoot : U(r.fallbackRoot) ? r.fallbackRoot : !0, C = !!r.fallbackFormat, S = Y(r.missing) ? r.missing : null, D = Y(r.postTranslation) ? r.postTranslation : null, y = l ? n.warnHtmlMessage : U(r.warnHtmlMessage) ? r.warnHtmlMessage : !0, f = !!r.escapeParameter, E = l ? n.modifiers : F(r.modifiers) ? r.modifiers : {}, O = r.pluralRules || l && n.pluralRules;
  function g() {
    return [
      o.value,
      u.value,
      _.value,
      N.value,
      L.value
    ];
  }
  const p = ge({
    get: () => a.value ? a.value.locale.value : o.value,
    set: (h) => {
      a.value && (a.value.locale.value = h), o.value = h;
    }
  }), P = ge({
    get: () => a.value ? a.value.fallbackLocale.value : u.value,
    set: (h) => {
      a.value && (a.value.fallbackLocale.value = h), u.value = h;
    }
  }), b = ge(() => a.value ? a.value.messages.value : _.value), X = ge(() => N.value), oe = ge(() => L.value);
  function V() {
    return a.value ? a.value.getPostTranslationHandler() : D;
  }
  function ne(h) {
    a.value && a.value.setPostTranslationHandler(h);
  }
  function Ke() {
    return a.value ? a.value.getMissingHandler() : S;
  }
  function Xe(h) {
    a.value && a.value.setMissingHandler(h);
  }
  function Ee(h) {
    return g(), h();
  }
  function Be(...h) {
    return a.value ? Ee(() => Reflect.apply(a.value.t, null, [...h])) : Ee(() => "");
  }
  function je(...h) {
    return a.value ? Reflect.apply(a.value.rt, null, [...h]) : "";
  }
  function Je(...h) {
    return a.value ? Ee(() => Reflect.apply(a.value.d, null, [...h])) : Ee(() => "");
  }
  function Qe(...h) {
    return a.value ? Ee(() => Reflect.apply(a.value.n, null, [...h])) : Ee(() => "");
  }
  function qe(h) {
    return a.value ? a.value.tm(h) : {};
  }
  function ce(h, W) {
    return a.value ? a.value.te(h, W) : !1;
  }
  function Me(h) {
    return a.value ? a.value.getLocaleMessage(h) : {};
  }
  function Fe(h, W) {
    a.value && (a.value.setLocaleMessage(h, W), _.value[h] = W);
  }
  function Ze(h, W) {
    a.value && a.value.mergeLocaleMessage(h, W);
  }
  function ze(h) {
    return a.value ? a.value.getDateTimeFormat(h) : {};
  }
  function et(h, W) {
    a.value && (a.value.setDateTimeFormat(h, W), N.value[h] = W);
  }
  function dt(h, W) {
    a.value && a.value.mergeDateTimeFormat(h, W);
  }
  function tt(h) {
    return a.value ? a.value.getNumberFormat(h) : {};
  }
  function Ue(h, W) {
    a.value && (a.value.setNumberFormat(h, W), L.value[h] = W);
  }
  function nt(h, W) {
    a.value && a.value.mergeNumberFormat(h, W);
  }
  const at = {
    get id() {
      return a.value ? a.value.id : -1;
    },
    locale: p,
    fallbackLocale: P,
    messages: b,
    datetimeFormats: X,
    numberFormats: oe,
    get inheritLocale() {
      return a.value ? a.value.inheritLocale : s;
    },
    set inheritLocale(h) {
      a.value && (a.value.inheritLocale = h);
    },
    get availableLocales() {
      return a.value ? a.value.availableLocales : Object.keys(_.value);
    },
    get modifiers() {
      return a.value ? a.value.modifiers : E;
    },
    get pluralRules() {
      return a.value ? a.value.pluralRules : O;
    },
    get isGlobal() {
      return a.value ? a.value.isGlobal : !1;
    },
    get missingWarn() {
      return a.value ? a.value.missingWarn : d;
    },
    set missingWarn(h) {
      a.value && (a.value.missingWarn = h);
    },
    get fallbackWarn() {
      return a.value ? a.value.fallbackWarn : v;
    },
    set fallbackWarn(h) {
      a.value && (a.value.missingWarn = h);
    },
    get fallbackRoot() {
      return a.value ? a.value.fallbackRoot : R;
    },
    set fallbackRoot(h) {
      a.value && (a.value.fallbackRoot = h);
    },
    get fallbackFormat() {
      return a.value ? a.value.fallbackFormat : C;
    },
    set fallbackFormat(h) {
      a.value && (a.value.fallbackFormat = h);
    },
    get warnHtmlMessage() {
      return a.value ? a.value.warnHtmlMessage : y;
    },
    set warnHtmlMessage(h) {
      a.value && (a.value.warnHtmlMessage = h);
    },
    get escapeParameter() {
      return a.value ? a.value.escapeParameter : f;
    },
    set escapeParameter(h) {
      a.value && (a.value.escapeParameter = h);
    },
    t: Be,
    getPostTranslationHandler: V,
    setPostTranslationHandler: ne,
    getMissingHandler: Ke,
    setMissingHandler: Xe,
    rt: je,
    d: Je,
    n: Qe,
    tm: qe,
    te: ce,
    getLocaleMessage: Me,
    setLocaleMessage: Fe,
    mergeLocaleMessage: Ze,
    getDateTimeFormat: ze,
    setDateTimeFormat: et,
    mergeDateTimeFormat: dt,
    getNumberFormat: tt,
    setNumberFormat: Ue,
    mergeNumberFormat: nt
  };
  function rt(h) {
    h.locale.value = o.value, h.fallbackLocale.value = u.value, Object.keys(_.value).forEach((W) => {
      h.mergeLocaleMessage(W, _.value[W]);
    }), Object.keys(N.value).forEach((W) => {
      h.mergeDateTimeFormat(W, N.value[W]);
    }), Object.keys(L.value).forEach((W) => {
      h.mergeNumberFormat(W, L.value[W]);
    }), h.escapeParameter = f, h.fallbackFormat = C, h.fallbackRoot = R, h.fallbackWarn = v, h.missingWarn = d, h.warnHtmlMessage = y;
  }
  return Ga(() => {
    if (e.proxy == null || e.proxy.$i18n == null)
      throw z($.NOT_AVAILABLE_COMPOSITION_IN_LEGACY);
    const h = a.value = e.proxy.$i18n.__composer;
    t === "global" ? (o.value = h.locale.value, u.value = h.fallbackLocale.value, _.value = h.messages.value, N.value = h.datetimeFormats.value, L.value = h.numberFormats.value) : l && rt(h);
  }), at;
}
const ps = [
  "locale",
  "fallbackLocale",
  "availableLocales"
], $n = ["t", "rt", "d", "n", "tm", "te"];
function bs(e, t) {
  const n = /* @__PURE__ */ Object.create(null);
  return ps.forEach((l) => {
    const a = Object.getOwnPropertyDescriptor(t, l);
    if (!a)
      throw z($.UNEXPECTED_ERROR);
    const s = wa(a.value) ? {
      get() {
        return a.value.value;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(o) {
        a.value.value = o;
      }
    } : {
      get() {
        return a.get && a.get();
      }
    };
    Object.defineProperty(n, l, s);
  }), e.config.globalProperties.$i18n = n, $n.forEach((l) => {
    const a = Object.getOwnPropertyDescriptor(t, l);
    if (!a || !a.value)
      throw z($.UNEXPECTED_ERROR);
    Object.defineProperty(e.config.globalProperties, `$${l}`, a);
  }), () => {
    delete e.config.globalProperties.$i18n, $n.forEach((l) => {
      delete e.config.globalProperties[`$${l}`];
    });
  };
}
$l();
__INTLIFY_JIT_COMPILATION__ ? Tn(bl) : Tn(pl);
ml(Br);
dl(sa);
{
  const e = Oe();
  e.__INTLIFY__ = !0, nl(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
export {
  vs as c,
  tn as u
};
