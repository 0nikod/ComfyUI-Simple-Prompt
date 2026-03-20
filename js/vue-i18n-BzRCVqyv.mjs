import { C as e, F as t, I as n, M as r, N as i, T as a, _ as o, b as s, d as c, k as l, l as u, u as d, v as f, w as p, x as m, y as h } from "./vue.runtime.esm-bundler-DCog0BBo.mjs";
//#region node_modules/.pnpm/@intlify+shared@9.14.4/node_modules/@intlify/shared/dist/shared.mjs
var g = typeof window < "u", _, v;
if (process.env.NODE_ENV !== "production") {
	let e = g && window.performance;
	e && e.mark && e.measure && e.clearMarks && e.clearMeasures && (_ = (t) => {
		e.mark(t);
	}, v = (t, n, r) => {
		e.measure(t, n, r), e.clearMarks(n), e.clearMarks(r);
	});
}
var y = /\{([0-9a-zA-Z]+)\}/g;
function b(e, ...t) {
	return t.length === 1 && R(t[0]) && (t = t[0]), (!t || !t.hasOwnProperty) && (t = {}), e.replace(y, (e, n) => t.hasOwnProperty(n) ? t[n] : "");
}
var x = (e, t = !1) => t ? Symbol.for(e) : Symbol(e), S = (e, t, n) => C({
	l: e,
	k: t,
	s: n
}), C = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), w = (e) => typeof e == "number" && isFinite(e), ee = (e) => ie(e) === "[object Date]", T = (e) => ie(e) === "[object RegExp]", E = (e) => z(e) && Object.keys(e).length === 0, D = Object.assign, O = Object.create, k = (e = null) => O(e), A, j = () => A ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : k();
function M(e) {
	return e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
var te = Object.prototype.hasOwnProperty;
function N(e, t) {
	return te.call(e, t);
}
var P = Array.isArray, F = (e) => typeof e == "function", I = (e) => typeof e == "string", L = (e) => typeof e == "boolean", R = (e) => typeof e == "object" && !!e, ne = (e) => R(e) && F(e.then) && F(e.catch), re = Object.prototype.toString, ie = (e) => re.call(e), z = (e) => {
	if (!R(e)) return !1;
	let t = Object.getPrototypeOf(e);
	return t === null || t.constructor === Object;
}, ae = (e) => e == null ? "" : P(e) || z(e) && e.toString === re ? JSON.stringify(e, null, 2) : String(e);
function oe(e, t = "") {
	return e.reduce((e, n, r) => r === 0 ? e + n : e + t + n, "");
}
var se = 2;
function ce(e, t = 0, n = e.length) {
	let r = e.split(/\r?\n/), i = 0, a = [];
	for (let e = 0; e < r.length; e++) if (i += r[e].length + 1, i >= t) {
		for (let o = e - se; o <= e + se || n > i; o++) {
			if (o < 0 || o >= r.length) continue;
			let s = o + 1;
			a.push(`${s}${" ".repeat(3 - String(s).length)}|  ${r[o]}`);
			let c = r[o].length;
			if (o === e) {
				let e = t - (i - c) + 1, r = Math.max(1, n > i ? c - e : n - t);
				a.push("   |  " + " ".repeat(e) + "^".repeat(r));
			} else if (o > e) {
				if (n > i) {
					let e = Math.max(Math.min(n - i, c), 1);
					a.push("   |  " + "^".repeat(e));
				}
				i += c + 1;
			}
		}
		break;
	}
	return a.join("\n");
}
function le(e) {
	let t = e;
	return () => ++t;
}
function B(e, t) {
	typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
var ue = {};
function de(e) {
	ue[e] || (ue[e] = !0, B(e));
}
function fe() {
	let e = /* @__PURE__ */ new Map();
	return {
		events: e,
		on(t, n) {
			let r = e.get(t);
			r && r.push(n) || e.set(t, [n]);
		},
		off(t, n) {
			let r = e.get(t);
			r && r.splice(r.indexOf(n) >>> 0, 1);
		},
		emit(t, n) {
			(e.get(t) || []).slice().map((e) => e(n)), (e.get("*") || []).slice().map((e) => e(t, n));
		}
	};
}
var V = (e) => !R(e) || P(e);
function pe(e, t) {
	if (V(e) || V(t)) throw Error("Invalid value");
	let n = [{
		src: e,
		des: t
	}];
	for (; n.length;) {
		let { src: e, des: t } = n.pop();
		Object.keys(e).forEach((r) => {
			r !== "__proto__" && (R(e[r]) && !R(t[r]) && (t[r] = Array.isArray(e[r]) ? [] : k()), V(t[r]) || V(e[r]) ? t[r] = e[r] : n.push({
				src: e[r],
				des: t[r]
			}));
		});
	}
}
//#endregion
//#region node_modules/.pnpm/@intlify+message-compiler@9.14.4/node_modules/@intlify/message-compiler/dist/message-compiler.esm-browser.js
function me(e, t, n) {
	return {
		line: e,
		column: t,
		offset: n
	};
}
function he(e, t, n) {
	let r = {
		start: e,
		end: t
	};
	return n != null && (r.source = n), r;
}
var ge = /\{([0-9a-zA-Z]+)\}/g;
function _e(e, ...t) {
	return t.length === 1 && be(t[0]) && (t = t[0]), (!t || !t.hasOwnProperty) && (t = {}), e.replace(ge, (e, n) => t.hasOwnProperty(n) ? t[n] : "");
}
var ve = Object.assign, ye = (e) => typeof e == "string", be = (e) => typeof e == "object" && !!e;
function xe(e, t = "") {
	return e.reduce((e, n, r) => r === 0 ? e + n : e + t + n, "");
}
var Se = {
	USE_MODULO_SYNTAX: 1,
	__EXTEND_POINT__: 2
}, Ce = { [Se.USE_MODULO_SYNTAX]: "Use modulo before '{{0}}'." };
function we(e, t, ...n) {
	let r = _e(Ce[e] || "", ...n || []), i = {
		message: String(r),
		code: e
	};
	return t && (i.location = t), i;
}
var H = {
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
	MUST_HAVE_MESSAGES_IN_PLURAL: 11,
	UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
	UNEXPECTED_EMPTY_LINKED_KEY: 13,
	UNEXPECTED_LEXICAL_ANALYSIS: 14,
	UNHANDLED_CODEGEN_NODE_TYPE: 15,
	UNHANDLED_MINIFIER_NODE_TYPE: 16,
	__EXTEND_POINT__: 17
}, Te = {
	[H.EXPECTED_TOKEN]: "Expected token: '{0}'",
	[H.INVALID_TOKEN_IN_PLACEHOLDER]: "Invalid token in placeholder: '{0}'",
	[H.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER]: "Unterminated single quote in placeholder",
	[H.UNKNOWN_ESCAPE_SEQUENCE]: "Unknown escape sequence: \\{0}",
	[H.INVALID_UNICODE_ESCAPE_SEQUENCE]: "Invalid unicode escape sequence: {0}",
	[H.UNBALANCED_CLOSING_BRACE]: "Unbalanced closing brace",
	[H.UNTERMINATED_CLOSING_BRACE]: "Unterminated closing brace",
	[H.EMPTY_PLACEHOLDER]: "Empty placeholder",
	[H.NOT_ALLOW_NEST_PLACEHOLDER]: "Not allowed nest placeholder",
	[H.INVALID_LINKED_FORMAT]: "Invalid linked format",
	[H.MUST_HAVE_MESSAGES_IN_PLURAL]: "Plural must have messages",
	[H.UNEXPECTED_EMPTY_LINKED_MODIFIER]: "Unexpected empty linked modifier",
	[H.UNEXPECTED_EMPTY_LINKED_KEY]: "Unexpected empty linked key",
	[H.UNEXPECTED_LEXICAL_ANALYSIS]: "Unexpected lexical analysis in token: '{0}'",
	[H.UNHANDLED_CODEGEN_NODE_TYPE]: "unhandled codegen node type: '{0}'",
	[H.UNHANDLED_MINIFIER_NODE_TYPE]: "unhandled mimifier node type: '{0}'"
};
function Ee(e, t, n = {}) {
	let { domain: r, messages: i, args: a } = n, o = _e((i || Te)[e] || "", ...a || []), s = SyntaxError(String(o));
	return s.code = e, t && (s.location = t), s.domain = r, s;
}
function De(e) {
	throw e;
}
var Oe = /<\/?[\w\s="/.':;#-\/]+>/, ke = (e) => Oe.test(e), Ae = " ", je = "\r", U = "\n", Me = "\u2028", Ne = "\u2029";
function W(e) {
	let t = e, n = 0, r = 1, i = 1, a = 0, o = (e) => t[e] === je && t[e + 1] === U, s = (e) => t[e] === U, c = (e) => t[e] === Ne, l = (e) => t[e] === Me, u = (e) => o(e) || s(e) || c(e) || l(e), d = () => n, f = () => r, p = () => i, m = () => a, h = (e) => o(e) || c(e) || l(e) ? U : t[e], g = () => h(n), _ = () => h(n + a);
	function v() {
		return a = 0, u(n) && (r++, i = 0), o(n) && n++, n++, i++, t[n];
	}
	function y() {
		return o(n + a) && a++, a++, t[n + a];
	}
	function b() {
		n = 0, r = 1, i = 1, a = 0;
	}
	function x(e = 0) {
		a = e;
	}
	function S() {
		let e = n + a;
		for (; e !== n;) v();
		a = 0;
	}
	return {
		index: d,
		line: f,
		column: p,
		peekOffset: m,
		charAt: h,
		currentChar: g,
		currentPeek: _,
		next: v,
		peek: y,
		reset: b,
		resetPeek: x,
		skipToPeek: S
	};
}
var Pe = void 0, Fe = "'", Ie = "tokenizer";
function Le(e, t = {}) {
	let n = t.location !== !1, r = W(e), i = () => r.index(), a = () => me(r.line(), r.column(), r.index()), o = a(), s = i(), c = {
		currentType: 14,
		offset: s,
		startLoc: o,
		endLoc: o,
		lastType: 14,
		lastOffset: s,
		lastStartLoc: o,
		lastEndLoc: o,
		braceNest: 0,
		inLinked: !1,
		text: ""
	}, l = () => c, { onError: u } = t;
	function d(e, t, r, ...i) {
		let a = l();
		t.column += r, t.offset += r, u && u(Ee(e, n ? he(a.startLoc, t) : null, {
			domain: Ie,
			args: i
		}));
	}
	function f(e, t, r) {
		e.endLoc = a(), e.currentType = t;
		let i = { type: t };
		return n && (i.loc = he(e.startLoc, e.endLoc)), r != null && (i.value = r), i;
	}
	let p = (e) => f(e, 14);
	function m(e, t) {
		return e.currentChar() === t ? (e.next(), t) : (d(H.EXPECTED_TOKEN, a(), 0, t), "");
	}
	function h(e) {
		let t = "";
		for (; e.currentPeek() === Ae || e.currentPeek() === U;) t += e.currentPeek(), e.peek();
		return t;
	}
	function g(e) {
		let t = h(e);
		return e.skipToPeek(), t;
	}
	function _(e) {
		if (e === Pe) return !1;
		let t = e.charCodeAt(0);
		return t >= 97 && t <= 122 || t >= 65 && t <= 90 || t === 95;
	}
	function v(e) {
		if (e === Pe) return !1;
		let t = e.charCodeAt(0);
		return t >= 48 && t <= 57;
	}
	function y(e, t) {
		let { currentType: n } = t;
		if (n !== 2) return !1;
		h(e);
		let r = _(e.currentPeek());
		return e.resetPeek(), r;
	}
	function b(e, t) {
		let { currentType: n } = t;
		if (n !== 2) return !1;
		h(e);
		let r = v(e.currentPeek() === "-" ? e.peek() : e.currentPeek());
		return e.resetPeek(), r;
	}
	function x(e, t) {
		let { currentType: n } = t;
		if (n !== 2) return !1;
		h(e);
		let r = e.currentPeek() === Fe;
		return e.resetPeek(), r;
	}
	function S(e, t) {
		let { currentType: n } = t;
		if (n !== 8) return !1;
		h(e);
		let r = e.currentPeek() === ".";
		return e.resetPeek(), r;
	}
	function C(e, t) {
		let { currentType: n } = t;
		if (n !== 9) return !1;
		h(e);
		let r = _(e.currentPeek());
		return e.resetPeek(), r;
	}
	function w(e, t) {
		let { currentType: n } = t;
		if (!(n === 8 || n === 12)) return !1;
		h(e);
		let r = e.currentPeek() === ":";
		return e.resetPeek(), r;
	}
	function ee(e, t) {
		let { currentType: n } = t;
		if (n !== 10) return !1;
		let r = () => {
			let t = e.currentPeek();
			return t === "{" ? _(e.peek()) : t === "@" || t === "%" || t === "|" || t === ":" || t === "." || t === Ae || !t ? !1 : t === U ? (e.peek(), r()) : D(e, !1);
		}, i = r();
		return e.resetPeek(), i;
	}
	function T(e) {
		h(e);
		let t = e.currentPeek() === "|";
		return e.resetPeek(), t;
	}
	function E(e) {
		let t = h(e), n = e.currentPeek() === "%" && e.peek() === "{";
		return e.resetPeek(), {
			isModulo: n,
			hasSpace: t.length > 0
		};
	}
	function D(e, t = !0) {
		let n = (t = !1, r = "", i = !1) => {
			let a = e.currentPeek();
			return a === "{" ? r === "%" ? !1 : t : a === "@" || !a ? r === "%" ? !0 : t : a === "%" ? (e.peek(), n(t, "%", !0)) : a === "|" ? r === "%" || i ? !0 : !(r === Ae || r === U) : a === Ae ? (e.peek(), n(!0, Ae, i)) : a === U ? (e.peek(), n(!0, U, i)) : !0;
		}, r = n();
		return t && e.resetPeek(), r;
	}
	function O(e, t) {
		let n = e.currentChar();
		return n === Pe ? Pe : t(n) ? (e.next(), n) : null;
	}
	function k(e) {
		let t = e.charCodeAt(0);
		return t >= 97 && t <= 122 || t >= 65 && t <= 90 || t >= 48 && t <= 57 || t === 95 || t === 36;
	}
	function A(e) {
		return O(e, k);
	}
	function j(e) {
		let t = e.charCodeAt(0);
		return t >= 97 && t <= 122 || t >= 65 && t <= 90 || t >= 48 && t <= 57 || t === 95 || t === 36 || t === 45;
	}
	function M(e) {
		return O(e, j);
	}
	function te(e) {
		let t = e.charCodeAt(0);
		return t >= 48 && t <= 57;
	}
	function N(e) {
		return O(e, te);
	}
	function P(e) {
		let t = e.charCodeAt(0);
		return t >= 48 && t <= 57 || t >= 65 && t <= 70 || t >= 97 && t <= 102;
	}
	function F(e) {
		return O(e, P);
	}
	function I(e) {
		let t = "", n = "";
		for (; t = N(e);) n += t;
		return n;
	}
	function L(e) {
		g(e);
		let t = e.currentChar();
		return t !== "%" && d(H.EXPECTED_TOKEN, a(), 0, t), e.next(), "%";
	}
	function R(e) {
		let t = "";
		for (;;) {
			let n = e.currentChar();
			if (n === "{" || n === "}" || n === "@" || n === "|" || !n) break;
			if (n === "%") if (D(e)) t += n, e.next();
			else break;
			else if (n === Ae || n === U) if (D(e)) t += n, e.next();
			else if (T(e)) break;
			else t += n, e.next();
			else t += n, e.next();
		}
		return t;
	}
	function ne(e) {
		g(e);
		let t = "", n = "";
		for (; t = M(e);) n += t;
		return e.currentChar() === Pe && d(H.UNTERMINATED_CLOSING_BRACE, a(), 0), n;
	}
	function re(e) {
		g(e);
		let t = "";
		return e.currentChar() === "-" ? (e.next(), t += `-${I(e)}`) : t += I(e), e.currentChar() === Pe && d(H.UNTERMINATED_CLOSING_BRACE, a(), 0), t;
	}
	function ie(e) {
		return e !== Fe && e !== U;
	}
	function z(e) {
		g(e), m(e, "'");
		let t = "", n = "";
		for (; t = O(e, ie);) t === "\\" ? n += ae(e) : n += t;
		let r = e.currentChar();
		return r === U || r === Pe ? (d(H.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, a(), 0), r === U && (e.next(), m(e, "'")), n) : (m(e, "'"), n);
	}
	function ae(e) {
		let t = e.currentChar();
		switch (t) {
			case "\\":
			case "'": return e.next(), `\\${t}`;
			case "u": return oe(e, t, 4);
			case "U": return oe(e, t, 6);
			default: return d(H.UNKNOWN_ESCAPE_SEQUENCE, a(), 0, t), "";
		}
	}
	function oe(e, t, n) {
		m(e, t);
		let r = "";
		for (let i = 0; i < n; i++) {
			let n = F(e);
			if (!n) {
				d(H.INVALID_UNICODE_ESCAPE_SEQUENCE, a(), 0, `\\${t}${r}${e.currentChar()}`);
				break;
			}
			r += n;
		}
		return `\\${t}${r}`;
	}
	function se(e) {
		return e !== "{" && e !== "}" && e !== Ae && e !== U;
	}
	function ce(e) {
		g(e);
		let t = "", n = "";
		for (; t = O(e, se);) n += t;
		return n;
	}
	function le(e) {
		let t = "", n = "";
		for (; t = A(e);) n += t;
		return n;
	}
	function B(e) {
		let t = (n) => {
			let r = e.currentChar();
			return r === "{" || r === "%" || r === "@" || r === "|" || r === "(" || r === ")" || !r || r === Ae ? n : (n += r, e.next(), t(n));
		};
		return t("");
	}
	function ue(e) {
		g(e);
		let t = m(e, "|");
		return g(e), t;
	}
	function de(e, t) {
		let n = null;
		switch (e.currentChar()) {
			case "{": return t.braceNest >= 1 && d(H.NOT_ALLOW_NEST_PLACEHOLDER, a(), 0), e.next(), n = f(t, 2, "{"), g(e), t.braceNest++, n;
			case "}": return t.braceNest > 0 && t.currentType === 2 && d(H.EMPTY_PLACEHOLDER, a(), 0), e.next(), n = f(t, 3, "}"), t.braceNest--, t.braceNest > 0 && g(e), t.inLinked && t.braceNest === 0 && (t.inLinked = !1), n;
			case "@": return t.braceNest > 0 && d(H.UNTERMINATED_CLOSING_BRACE, a(), 0), n = fe(e, t) || p(t), t.braceNest = 0, n;
			default: {
				let r = !0, i = !0, o = !0;
				if (T(e)) return t.braceNest > 0 && d(H.UNTERMINATED_CLOSING_BRACE, a(), 0), n = f(t, 1, ue(e)), t.braceNest = 0, t.inLinked = !1, n;
				if (t.braceNest > 0 && (t.currentType === 5 || t.currentType === 6 || t.currentType === 7)) return d(H.UNTERMINATED_CLOSING_BRACE, a(), 0), t.braceNest = 0, V(e, t);
				if (r = y(e, t)) return n = f(t, 5, ne(e)), g(e), n;
				if (i = b(e, t)) return n = f(t, 6, re(e)), g(e), n;
				if (o = x(e, t)) return n = f(t, 7, z(e)), g(e), n;
				if (!r && !i && !o) return n = f(t, 13, ce(e)), d(H.INVALID_TOKEN_IN_PLACEHOLDER, a(), 0, n.value), g(e), n;
				break;
			}
		}
		return n;
	}
	function fe(e, t) {
		let { currentType: n } = t, r = null, i = e.currentChar();
		switch ((n === 8 || n === 9 || n === 12 || n === 10) && (i === U || i === Ae) && d(H.INVALID_LINKED_FORMAT, a(), 0), i) {
			case "@": return e.next(), r = f(t, 8, "@"), t.inLinked = !0, r;
			case ".": return g(e), e.next(), f(t, 9, ".");
			case ":": return g(e), e.next(), f(t, 10, ":");
			default: return T(e) ? (r = f(t, 1, ue(e)), t.braceNest = 0, t.inLinked = !1, r) : S(e, t) || w(e, t) ? (g(e), fe(e, t)) : C(e, t) ? (g(e), f(t, 12, le(e))) : ee(e, t) ? (g(e), i === "{" ? de(e, t) || r : f(t, 11, B(e))) : (n === 8 && d(H.INVALID_LINKED_FORMAT, a(), 0), t.braceNest = 0, t.inLinked = !1, V(e, t));
		}
	}
	function V(e, t) {
		let n = { type: 14 };
		if (t.braceNest > 0) return de(e, t) || p(t);
		if (t.inLinked) return fe(e, t) || p(t);
		switch (e.currentChar()) {
			case "{": return de(e, t) || p(t);
			case "}": return d(H.UNBALANCED_CLOSING_BRACE, a(), 0), e.next(), f(t, 3, "}");
			case "@": return fe(e, t) || p(t);
			default: {
				if (T(e)) return n = f(t, 1, ue(e)), t.braceNest = 0, t.inLinked = !1, n;
				let { isModulo: r, hasSpace: i } = E(e);
				if (r) return i ? f(t, 0, R(e)) : f(t, 4, L(e));
				if (D(e)) return f(t, 0, R(e));
				break;
			}
		}
		return n;
	}
	function pe() {
		let { currentType: e, offset: t, startLoc: n, endLoc: o } = c;
		return c.lastType = e, c.lastOffset = t, c.lastStartLoc = n, c.lastEndLoc = o, c.offset = i(), c.startLoc = a(), r.currentChar() === Pe ? f(c, 14) : V(r, c);
	}
	return {
		nextToken: pe,
		currentOffset: i,
		currentPosition: a,
		context: l
	};
}
var Re = "parser", ze = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function Be(e, t, n) {
	switch (e) {
		case "\\\\": return "\\";
		case "\\'": return "'";
		default: {
			let e = parseInt(t || n, 16);
			return e <= 55295 || e >= 57344 ? String.fromCodePoint(e) : "�";
		}
	}
}
function Ve(e = {}) {
	let t = e.location !== !1, { onError: n, onWarn: r } = e;
	function i(e, r, i, a, ...o) {
		let s = e.currentPosition();
		s.offset += a, s.column += a, n && n(Ee(r, t ? he(i, s) : null, {
			domain: Re,
			args: o
		}));
	}
	function a(e, n, i, a, ...o) {
		let s = e.currentPosition();
		s.offset += a, s.column += a, r && r(we(n, t ? he(i, s) : null, o));
	}
	function o(e, n, r) {
		let i = { type: e };
		return t && (i.start = n, i.end = n, i.loc = {
			start: r,
			end: r
		}), i;
	}
	function s(e, n, r, i) {
		i && (e.type = i), t && (e.end = n, e.loc && (e.loc.end = r));
	}
	function c(e, t) {
		let n = e.context(), r = o(3, n.offset, n.startLoc);
		return r.value = t, s(r, e.currentOffset(), e.currentPosition()), r;
	}
	function l(e, t) {
		let { lastOffset: n, lastStartLoc: r } = e.context(), i = o(5, n, r);
		return i.index = parseInt(t, 10), e.nextToken(), s(i, e.currentOffset(), e.currentPosition()), i;
	}
	function u(e, t, n) {
		let { lastOffset: r, lastStartLoc: i } = e.context(), a = o(4, r, i);
		return a.key = t, n === !0 && (a.modulo = !0), e.nextToken(), s(a, e.currentOffset(), e.currentPosition()), a;
	}
	function d(e, t) {
		let { lastOffset: n, lastStartLoc: r } = e.context(), i = o(9, n, r);
		return i.value = t.replace(ze, Be), e.nextToken(), s(i, e.currentOffset(), e.currentPosition()), i;
	}
	function f(e) {
		let t = e.nextToken(), n = e.context(), { lastOffset: r, lastStartLoc: a } = n, c = o(8, r, a);
		return t.type === 12 ? (t.value ?? i(e, H.UNEXPECTED_LEXICAL_ANALYSIS, n.lastStartLoc, 0, He(t)), c.value = t.value || "", s(c, e.currentOffset(), e.currentPosition()), { node: c }) : (i(e, H.UNEXPECTED_EMPTY_LINKED_MODIFIER, n.lastStartLoc, 0), c.value = "", s(c, r, a), {
			nextConsumeToken: t,
			node: c
		});
	}
	function p(e, t) {
		let n = e.context(), r = o(7, n.offset, n.startLoc);
		return r.value = t, s(r, e.currentOffset(), e.currentPosition()), r;
	}
	function m(e) {
		let t = e.context(), n = o(6, t.offset, t.startLoc), r = e.nextToken();
		if (r.type === 9) {
			let t = f(e);
			n.modifier = t.node, r = t.nextConsumeToken || e.nextToken();
		}
		switch (r.type !== 10 && i(e, H.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, He(r)), r = e.nextToken(), r.type === 2 && (r = e.nextToken()), r.type) {
			case 11:
				r.value ?? i(e, H.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, He(r)), n.key = p(e, r.value || "");
				break;
			case 5:
				r.value ?? i(e, H.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, He(r)), n.key = u(e, r.value || "");
				break;
			case 6:
				r.value ?? i(e, H.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, He(r)), n.key = l(e, r.value || "");
				break;
			case 7:
				r.value ?? i(e, H.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, He(r)), n.key = d(e, r.value || "");
				break;
			default: {
				i(e, H.UNEXPECTED_EMPTY_LINKED_KEY, t.lastStartLoc, 0);
				let a = e.context(), c = o(7, a.offset, a.startLoc);
				return c.value = "", s(c, a.offset, a.startLoc), n.key = c, s(n, a.offset, a.startLoc), {
					nextConsumeToken: r,
					node: n
				};
			}
		}
		return s(n, e.currentOffset(), e.currentPosition()), { node: n };
	}
	function h(e) {
		let t = e.context(), n = o(2, t.currentType === 1 ? e.currentOffset() : t.offset, t.currentType === 1 ? t.endLoc : t.startLoc);
		n.items = [];
		let r = null, f = null;
		do {
			let o = r || e.nextToken();
			switch (r = null, o.type) {
				case 0:
					o.value ?? i(e, H.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, He(o)), n.items.push(c(e, o.value || ""));
					break;
				case 6:
					o.value ?? i(e, H.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, He(o)), n.items.push(l(e, o.value || ""));
					break;
				case 4:
					f = !0;
					break;
				case 5:
					o.value ?? i(e, H.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, He(o)), n.items.push(u(e, o.value || "", !!f)), f &&= (a(e, Se.USE_MODULO_SYNTAX, t.lastStartLoc, 0, He(o)), null);
					break;
				case 7:
					o.value ?? i(e, H.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, He(o)), n.items.push(d(e, o.value || ""));
					break;
				case 8: {
					let t = m(e);
					n.items.push(t.node), r = t.nextConsumeToken || null;
					break;
				}
			}
		} while (t.currentType !== 14 && t.currentType !== 1);
		return s(n, t.currentType === 1 ? t.lastOffset : e.currentOffset(), t.currentType === 1 ? t.lastEndLoc : e.currentPosition()), n;
	}
	function g(e, t, n, r) {
		let a = e.context(), c = r.items.length === 0, l = o(1, t, n);
		l.cases = [], l.cases.push(r);
		do {
			let t = h(e);
			c ||= t.items.length === 0, l.cases.push(t);
		} while (a.currentType !== 14);
		return c && i(e, H.MUST_HAVE_MESSAGES_IN_PLURAL, n, 0), s(l, e.currentOffset(), e.currentPosition()), l;
	}
	function _(e) {
		let t = e.context(), { offset: n, startLoc: r } = t, i = h(e);
		return t.currentType === 14 ? i : g(e, n, r, i);
	}
	function v(n) {
		let r = Le(n, ve({}, e)), a = r.context(), c = o(0, a.offset, a.startLoc);
		return t && c.loc && (c.loc.source = n), c.body = _(r), e.onCacheKey && (c.cacheKey = e.onCacheKey(n)), a.currentType !== 14 && i(r, H.UNEXPECTED_LEXICAL_ANALYSIS, a.lastStartLoc, 0, n[a.offset] || ""), s(c, r.currentOffset(), r.currentPosition()), c;
	}
	return { parse: v };
}
function He(e) {
	if (e.type === 14) return "EOF";
	let t = (e.value || "").replace(/\r?\n/gu, "\\n");
	return t.length > 10 ? t.slice(0, 9) + "…" : t;
}
function Ue(e, t = {}) {
	let n = {
		ast: e,
		helpers: /* @__PURE__ */ new Set()
	};
	return {
		context: () => n,
		helper: (e) => (n.helpers.add(e), e)
	};
}
function We(e, t) {
	for (let n = 0; n < e.length; n++) Ge(e[n], t);
}
function Ge(e, t) {
	switch (e.type) {
		case 1:
			We(e.cases, t), t.helper("plural");
			break;
		case 2:
			We(e.items, t);
			break;
		case 6:
			Ge(e.key, t), t.helper("linked"), t.helper("type");
			break;
		case 5:
			t.helper("interpolate"), t.helper("list");
			break;
		case 4:
			t.helper("interpolate"), t.helper("named");
			break;
	}
}
function Ke(e, t = {}) {
	let n = Ue(e);
	n.helper("normalize"), e.body && Ge(e.body, n);
	let r = n.context();
	e.helpers = Array.from(r.helpers);
}
function qe(e) {
	let t = e.body;
	return t.type === 2 ? Je(t) : t.cases.forEach((e) => Je(e)), e;
}
function Je(e) {
	if (e.items.length === 1) {
		let t = e.items[0];
		(t.type === 3 || t.type === 9) && (e.static = t.value, delete t.value);
	} else {
		let t = [];
		for (let n = 0; n < e.items.length; n++) {
			let r = e.items[n];
			if (!(r.type === 3 || r.type === 9) || r.value == null) break;
			t.push(r.value);
		}
		if (t.length === e.items.length) {
			e.static = xe(t);
			for (let t = 0; t < e.items.length; t++) {
				let n = e.items[t];
				(n.type === 3 || n.type === 9) && delete n.value;
			}
		}
	}
}
var Ye = "minifier";
function Xe(e) {
	switch (e.t = e.type, e.type) {
		case 0: {
			let t = e;
			Xe(t.body), t.b = t.body, delete t.body;
			break;
		}
		case 1: {
			let t = e, n = t.cases;
			for (let e = 0; e < n.length; e++) Xe(n[e]);
			t.c = n, delete t.cases;
			break;
		}
		case 2: {
			let t = e, n = t.items;
			for (let e = 0; e < n.length; e++) Xe(n[e]);
			t.i = n, delete t.items, t.static && (t.s = t.static, delete t.static);
			break;
		}
		case 3:
		case 9:
		case 8:
		case 7: {
			let t = e;
			t.value && (t.v = t.value, delete t.value);
			break;
		}
		case 6: {
			let t = e;
			Xe(t.key), t.k = t.key, delete t.key, t.modifier && (Xe(t.modifier), t.m = t.modifier, delete t.modifier);
			break;
		}
		case 5: {
			let t = e;
			t.i = t.index, delete t.index;
			break;
		}
		case 4: {
			let t = e;
			t.k = t.key, delete t.key;
			break;
		}
		default: throw Ee(H.UNHANDLED_MINIFIER_NODE_TYPE, null, {
			domain: Ye,
			args: [e.type]
		});
	}
	delete e.type;
}
var Ze = "parser";
function Qe(e, t) {
	let { sourceMap: n, filename: r, breakLineCode: i, needIndent: a } = t, o = t.location !== !1, s = {
		filename: r,
		code: "",
		column: 1,
		line: 1,
		offset: 0,
		map: void 0,
		breakLineCode: i,
		needIndent: a,
		indentLevel: 0
	};
	o && e.loc && (s.source = e.loc.source);
	let c = () => s;
	function l(e, t) {
		s.code += e;
	}
	function u(e, t = !0) {
		let n = t ? i : "";
		l(a ? n + "  ".repeat(e) : n);
	}
	function d(e = !0) {
		let t = ++s.indentLevel;
		e && u(t);
	}
	function f(e = !0) {
		let t = --s.indentLevel;
		e && u(t);
	}
	function p() {
		u(s.indentLevel);
	}
	return {
		context: c,
		push: l,
		indent: d,
		deindent: f,
		newline: p,
		helper: (e) => `_${e}`,
		needIndent: () => s.needIndent
	};
}
function $e(e, t) {
	let { helper: n } = e;
	e.push(`${n("linked")}(`), rt(e, t.key), t.modifier ? (e.push(", "), rt(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")");
}
function et(e, t) {
	let { helper: n, needIndent: r } = e;
	e.push(`${n("normalize")}([`), e.indent(r());
	let i = t.items.length;
	for (let n = 0; n < i && (rt(e, t.items[n]), n !== i - 1); n++) e.push(", ");
	e.deindent(r()), e.push("])");
}
function tt(e, t) {
	let { helper: n, needIndent: r } = e;
	if (t.cases.length > 1) {
		e.push(`${n("plural")}([`), e.indent(r());
		let i = t.cases.length;
		for (let n = 0; n < i && (rt(e, t.cases[n]), n !== i - 1); n++) e.push(", ");
		e.deindent(r()), e.push("])");
	}
}
function nt(e, t) {
	t.body ? rt(e, t.body) : e.push("null");
}
function rt(e, t) {
	let { helper: n } = e;
	switch (t.type) {
		case 0:
			nt(e, t);
			break;
		case 1:
			tt(e, t);
			break;
		case 2:
			et(e, t);
			break;
		case 6:
			$e(e, t);
			break;
		case 8:
			e.push(JSON.stringify(t.value), t);
			break;
		case 7:
			e.push(JSON.stringify(t.value), t);
			break;
		case 5:
			e.push(`${n("interpolate")}(${n("list")}(${t.index}))`, t);
			break;
		case 4:
			e.push(`${n("interpolate")}(${n("named")}(${JSON.stringify(t.key)}))`, t);
			break;
		case 9:
			e.push(JSON.stringify(t.value), t);
			break;
		case 3:
			e.push(JSON.stringify(t.value), t);
			break;
		default: throw Ee(H.UNHANDLED_CODEGEN_NODE_TYPE, null, {
			domain: Ze,
			args: [t.type]
		});
	}
}
var it = (e, t = {}) => {
	let n = ye(t.mode) ? t.mode : "normal", r = ye(t.filename) ? t.filename : "message.intl", i = !!t.sourceMap, a = t.breakLineCode == null ? n === "arrow" ? ";" : "\n" : t.breakLineCode, o = t.needIndent ? t.needIndent : n !== "arrow", s = e.helpers || [], c = Qe(e, {
		mode: n,
		filename: r,
		sourceMap: i,
		breakLineCode: a,
		needIndent: o
	});
	c.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), c.indent(o), s.length > 0 && (c.push(`const { ${xe(s.map((e) => `${e}: _${e}`), ", ")} } = ctx`), c.newline()), c.push("return "), rt(c, e), c.deindent(o), c.push("}"), delete e.helpers;
	let { code: l, map: u } = c.context();
	return {
		ast: e,
		code: l,
		map: u ? u.toJSON() : void 0
	};
};
function at(e, t = {}) {
	let n = ve({}, t), r = !!n.jit, i = !!n.minify, a = n.optimize == null ? !0 : n.optimize, o = Ve(n).parse(e);
	return r ? (a && qe(o), i && Xe(o), {
		ast: o,
		code: ""
	}) : (Ke(o, n), it(o, n));
}
//#endregion
//#region node_modules/.pnpm/@intlify+core-base@9.14.4/node_modules/@intlify/core-base/dist/core-base.mjs
function ot() {
	typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (j().__INTLIFY_PROD_DEVTOOLS__ = !1), typeof __INTLIFY_JIT_COMPILATION__ != "boolean" && (j().__INTLIFY_JIT_COMPILATION__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (j().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1);
}
function G(e) {
	return R(e) && gt(e) === 0 && (N(e, "b") || N(e, "body"));
}
var st = ["b", "body"];
function ct(e) {
	return Ct(e, st);
}
var lt = ["c", "cases"];
function ut(e) {
	return Ct(e, lt, []);
}
var dt = ["s", "static"];
function ft(e) {
	return Ct(e, dt);
}
var pt = ["i", "items"];
function mt(e) {
	return Ct(e, pt, []);
}
var ht = ["t", "type"];
function gt(e) {
	return Ct(e, ht);
}
var _t = ["v", "value"];
function vt(e, t) {
	let n = Ct(e, _t);
	if (n != null) return n;
	throw Tt(t);
}
var yt = ["m", "modifier"];
function bt(e) {
	return Ct(e, yt);
}
var xt = ["k", "key"];
function St(e) {
	let t = Ct(e, xt);
	if (t) return t;
	throw Tt(6);
}
function Ct(e, t, n) {
	for (let n = 0; n < t.length; n++) {
		let r = t[n];
		if (N(e, r) && e[r] != null) return e[r];
	}
	return n;
}
var wt = [
	...st,
	...lt,
	...dt,
	...pt,
	...xt,
	...yt,
	..._t,
	...ht
];
function Tt(e) {
	return /* @__PURE__ */ Error(`unhandled node type: ${e}`);
}
var Et = [];
Et[0] = {
	w: [0],
	i: [3, 0],
	"[": [4],
	o: [7]
}, Et[1] = {
	w: [1],
	".": [2],
	"[": [4],
	o: [7]
}, Et[2] = {
	w: [2],
	i: [3, 0],
	0: [3, 0]
}, Et[3] = {
	i: [3, 0],
	0: [3, 0],
	w: [1, 1],
	".": [2, 1],
	"[": [4, 1],
	o: [7, 1]
}, Et[4] = {
	"'": [5, 0],
	"\"": [6, 0],
	"[": [4, 2],
	"]": [1, 3],
	o: 8,
	l: [4, 0]
}, Et[5] = {
	"'": [4, 0],
	o: 8,
	l: [5, 0]
}, Et[6] = {
	"\"": [4, 0],
	o: 8,
	l: [6, 0]
};
var Dt = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function Ot(e) {
	return Dt.test(e);
}
function kt(e) {
	let t = e.charCodeAt(0);
	return t === e.charCodeAt(e.length - 1) && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function At(e) {
	if (e == null) return "o";
	switch (e.charCodeAt(0)) {
		case 91:
		case 93:
		case 46:
		case 34:
		case 39: return e;
		case 95:
		case 36:
		case 45: return "i";
		case 9:
		case 10:
		case 13:
		case 160:
		case 65279:
		case 8232:
		case 8233: return "w";
	}
	return "i";
}
function jt(e) {
	let t = e.trim();
	return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : Ot(t) ? kt(t) : "*" + t;
}
function Mt(e) {
	let t = [], n = -1, r = 0, i = 0, a, o, s, c, l, u, d, f = [];
	f[0] = () => {
		o === void 0 ? o = s : o += s;
	}, f[1] = () => {
		o !== void 0 && (t.push(o), o = void 0);
	}, f[2] = () => {
		f[0](), i++;
	}, f[3] = () => {
		if (i > 0) i--, r = 4, f[0]();
		else {
			if (i = 0, o === void 0 || (o = jt(o), o === !1)) return !1;
			f[1]();
		}
	};
	function p() {
		let t = e[n + 1];
		if (r === 5 && t === "'" || r === 6 && t === "\"") return n++, s = "\\" + t, f[0](), !0;
	}
	for (; r !== null;) if (n++, a = e[n], !(a === "\\" && p())) {
		if (c = At(a), d = Et[r], l = d[c] || d.l || 8, l === 8 || (r = l[0], l[1] !== void 0 && (u = f[l[1]], u && (s = a, u() === !1)))) return;
		if (r === 7) return t;
	}
}
var Nt = /* @__PURE__ */ new Map();
function Pt(e, t) {
	return R(e) ? e[t] : null;
}
function Ft(e, t) {
	if (!R(e)) return null;
	let n = Nt.get(t);
	if (n || (n = Mt(t), n && Nt.set(t, n)), !n) return null;
	let r = n.length, i = e, a = 0;
	for (; a < r;) {
		let e = n[a];
		if (wt.includes(e) && G(i)) return null;
		let t = i[e];
		if (t === void 0 || F(i)) return null;
		i = t, a++;
	}
	return i;
}
var It = (e) => e, Lt = (e) => "", Rt = "text", zt = (e) => e.length === 0 ? "" : oe(e), Bt = ae;
function Vt(e, t) {
	return e = Math.abs(e), t === 2 ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0;
}
function Ht(e) {
	let t = w(e.pluralIndex) ? e.pluralIndex : -1;
	return e.named && (w(e.named.count) || w(e.named.n)) ? w(e.named.count) ? e.named.count : w(e.named.n) ? e.named.n : t : t;
}
function Ut(e, t) {
	t.count ||= e, t.n ||= e;
}
function Wt(e = {}) {
	let t = e.locale, n = Ht(e), r = R(e.pluralRules) && I(t) && F(e.pluralRules[t]) ? e.pluralRules[t] : Vt, i = R(e.pluralRules) && I(t) && F(e.pluralRules[t]) ? Vt : void 0, a = (e) => e[r(n, e.length, i)], o = e.list || [], s = (e) => o[e], c = e.named || k();
	w(e.pluralIndex) && Ut(n, c);
	let l = (e) => c[e];
	function u(t) {
		return (F(e.messages) ? e.messages(t) : R(e.messages) ? e.messages[t] : !1) || (e.parent ? e.parent.message(t) : Lt);
	}
	let d = (t) => e.modifiers ? e.modifiers[t] : It, f = z(e.processor) && F(e.processor.normalize) ? e.processor.normalize : zt, p = z(e.processor) && F(e.processor.interpolate) ? e.processor.interpolate : Bt, m = {
		list: s,
		named: l,
		plural: a,
		linked: (e, ...t) => {
			let [n, r] = t, i = "text", a = "";
			t.length === 1 ? R(n) ? (a = n.modifier || a, i = n.type || i) : I(n) && (a = n || a) : t.length === 2 && (I(n) && (a = n || a), I(r) && (i = r || i));
			let o = u(e)(m), s = i === "vnode" && P(o) && a ? o[0] : o;
			return a ? d(a)(s, i) : s;
		},
		message: u,
		type: z(e.processor) && I(e.processor.type) ? e.processor.type : Rt,
		interpolate: p,
		normalize: f,
		values: D(k(), o, c)
	};
	return m;
}
var Gt = null;
function Kt(e) {
	Gt = e;
}
function qt(e, t, n) {
	Gt && Gt.emit("i18n:init", {
		timestamp: Date.now(),
		i18n: e,
		version: t,
		meta: n
	});
}
var Jt = /* @__PURE__ */ Yt("function:translate");
function Yt(e) {
	return (t) => Gt && Gt.emit(e, t);
}
var Xt = Se.__EXTEND_POINT__, Zt = le(Xt), K = {
	NOT_FOUND_KEY: Xt,
	FALLBACK_TO_TRANSLATE: Zt(),
	CANNOT_FORMAT_NUMBER: Zt(),
	FALLBACK_TO_NUMBER_FORMAT: Zt(),
	CANNOT_FORMAT_DATE: Zt(),
	FALLBACK_TO_DATE_FORMAT: Zt(),
	EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: Zt(),
	__EXTEND_POINT__: Zt()
}, Qt = {
	[K.NOT_FOUND_KEY]: "Not found '{key}' key in '{locale}' locale messages.",
	[K.FALLBACK_TO_TRANSLATE]: "Fall back to translate '{key}' key with '{target}' locale.",
	[K.CANNOT_FORMAT_NUMBER]: "Cannot format a number value due to not supported Intl.NumberFormat.",
	[K.FALLBACK_TO_NUMBER_FORMAT]: "Fall back to number format '{key}' key with '{target}' locale.",
	[K.CANNOT_FORMAT_DATE]: "Cannot format a date value due to not supported Intl.DateTimeFormat.",
	[K.FALLBACK_TO_DATE_FORMAT]: "Fall back to datetime format '{key}' key with '{target}' locale.",
	[K.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER]: "This project is using Custom Message Compiler, which is an experimental feature. It may receive breaking changes or be removed in the future."
};
function $t(e, ...t) {
	return b(Qt[e], ...t);
}
var en = H.__EXTEND_POINT__, tn = le(en), q = {
	INVALID_ARGUMENT: en,
	INVALID_DATE_ARGUMENT: tn(),
	INVALID_ISO_DATE_ARGUMENT: tn(),
	NOT_SUPPORT_NON_STRING_MESSAGE: tn(),
	NOT_SUPPORT_LOCALE_PROMISE_VALUE: tn(),
	NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: tn(),
	NOT_SUPPORT_LOCALE_TYPE: tn(),
	__EXTEND_POINT__: tn()
};
function nn(e) {
	return Ee(e, null, process.env.NODE_ENV === "production" ? void 0 : { messages: rn });
}
var rn = {
	[q.INVALID_ARGUMENT]: "Invalid arguments",
	[q.INVALID_DATE_ARGUMENT]: "The date provided is an invalid Date object.Make sure your Date represents a valid date.",
	[q.INVALID_ISO_DATE_ARGUMENT]: "The argument provided is not a valid ISO date string",
	[q.NOT_SUPPORT_NON_STRING_MESSAGE]: "Not support non-string message",
	[q.NOT_SUPPORT_LOCALE_PROMISE_VALUE]: "cannot support promise value",
	[q.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION]: "cannot support async function",
	[q.NOT_SUPPORT_LOCALE_TYPE]: "cannot support locale type"
};
function an(e, t) {
	return t.locale == null ? sn(e.locale) : sn(t.locale);
}
var on;
function sn(e) {
	if (I(e)) return e;
	if (F(e)) {
		if (e.resolvedOnce && on != null) return on;
		if (e.constructor.name === "Function") {
			let t = e();
			if (ne(t)) throw nn(q.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
			return on = t;
		} else throw nn(q.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
	} else throw nn(q.NOT_SUPPORT_LOCALE_TYPE);
}
function cn(e, t, n) {
	return [...new Set([n, ...P(t) ? t : R(t) ? Object.keys(t) : I(t) ? [t] : [n]])];
}
function ln(e, t, n) {
	let r = I(n) ? n : mn, i = e;
	i.__localeChainCache ||= /* @__PURE__ */ new Map();
	let a = i.__localeChainCache.get(r);
	if (!a) {
		a = [];
		let e = [n];
		for (; P(e);) e = un(a, e, t);
		let o = P(t) || !z(t) ? t : t.default ? t.default : null;
		e = I(o) ? [o] : o, P(e) && un(a, e, !1), i.__localeChainCache.set(r, a);
	}
	return a;
}
function un(e, t, n) {
	let r = !0;
	for (let i = 0; i < t.length && L(r); i++) {
		let a = t[i];
		I(a) && (r = dn(e, t[i], n));
	}
	return r;
}
function dn(e, t, n) {
	let r, i = t.split("-");
	do
		r = fn(e, i.join("-"), n), i.splice(-1, 1);
	while (i.length && r === !0);
	return r;
}
function fn(e, t, n) {
	let r = !1;
	if (!e.includes(t) && (r = !0, t)) {
		r = t[t.length - 1] !== "!";
		let i = t.replace(/!/g, "");
		e.push(i), (P(n) || z(n)) && n[i] && (r = n[i]);
	}
	return r;
}
var pn = "9.14.4", mn = "en-US", hn = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function gn() {
	return {
		upper: (e, t) => t === "text" && I(e) ? e.toUpperCase() : t === "vnode" && R(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
		lower: (e, t) => t === "text" && I(e) ? e.toLowerCase() : t === "vnode" && R(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
		capitalize: (e, t) => t === "text" && I(e) ? hn(e) : t === "vnode" && R(e) && "__v_isVNode" in e ? hn(e.children) : e
	};
}
var _n;
function vn(e) {
	_n = e;
}
var yn;
function bn(e) {
	yn = e;
}
var xn;
function Sn(e) {
	xn = e;
}
var Cn = null, wn = /* @__NO_SIDE_EFFECTS__ */ () => Cn, Tn = null, En = (e) => {
	Tn = e;
}, Dn = () => Tn, On = 0;
function kn(e = {}) {
	let t = F(e.onWarn) ? e.onWarn : B, n = I(e.version) ? e.version : pn, r = I(e.locale) || F(e.locale) ? e.locale : mn, i = F(r) ? mn : r, a = P(e.fallbackLocale) || z(e.fallbackLocale) || I(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : i, o = z(e.messages) ? e.messages : An(i), s = z(e.datetimeFormats) ? e.datetimeFormats : An(i), c = z(e.numberFormats) ? e.numberFormats : An(i), l = D(k(), e.modifiers, gn()), u = e.pluralRules || k(), d = F(e.missing) ? e.missing : null, f = L(e.missingWarn) || T(e.missingWarn) ? e.missingWarn : !0, p = L(e.fallbackWarn) || T(e.fallbackWarn) ? e.fallbackWarn : !0, m = !!e.fallbackFormat, h = !!e.unresolving, g = F(e.postTranslation) ? e.postTranslation : null, _ = z(e.processor) ? e.processor : null, v = L(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, y = !!e.escapeParameter, b = F(e.messageCompiler) ? e.messageCompiler : _n;
	process.env.NODE_ENV !== "production" && F(e.messageCompiler) && de($t(K.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER));
	let x = F(e.messageResolver) ? e.messageResolver : yn || Pt, S = F(e.localeFallbacker) ? e.localeFallbacker : xn || cn, C = R(e.fallbackContext) ? e.fallbackContext : void 0, w = e, ee = R(w.__datetimeFormatters) ? w.__datetimeFormatters : /* @__PURE__ */ new Map(), E = R(w.__numberFormatters) ? w.__numberFormatters : /* @__PURE__ */ new Map(), O = R(w.__meta) ? w.__meta : {};
	On++;
	let A = {
		version: n,
		cid: On,
		locale: r,
		fallbackLocale: a,
		messages: o,
		modifiers: l,
		pluralRules: u,
		missing: d,
		missingWarn: f,
		fallbackWarn: p,
		fallbackFormat: m,
		unresolving: h,
		postTranslation: g,
		processor: _,
		warnHtmlMessage: v,
		escapeParameter: y,
		messageCompiler: b,
		messageResolver: x,
		localeFallbacker: S,
		fallbackContext: C,
		onWarn: t,
		__meta: O
	};
	return A.datetimeFormats = s, A.numberFormats = c, A.__datetimeFormatters = ee, A.__numberFormatters = E, process.env.NODE_ENV !== "production" && (A.__v_emitter = w.__v_emitter == null ? void 0 : w.__v_emitter), (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) && qt(A, n, O), A;
}
var An = (e) => ({ [e]: k() });
function jn(e, t) {
	return e instanceof RegExp ? e.test(t) : e;
}
function Mn(e, t) {
	return e instanceof RegExp ? e.test(t) : e;
}
function Nn(e, t, n, r, i) {
	let { missing: a, onWarn: o } = e;
	if (process.env.NODE_ENV !== "production") {
		let r = e.__v_emitter;
		r && r.emit("missing", {
			locale: n,
			key: t,
			type: i,
			groupId: `${i}:${t}`
		});
	}
	if (a !== null) {
		let r = a(e, n, t, i);
		return I(r) ? r : t;
	} else return process.env.NODE_ENV !== "production" && Mn(r, t) && o($t(K.NOT_FOUND_KEY, {
		key: t,
		locale: n
	})), t;
}
function Pn(e, t, n) {
	let r = e;
	r.__localeChainCache = /* @__PURE__ */ new Map(), e.localeFallbacker(e, n, t);
}
function Fn(e, t) {
	return e === t ? !1 : e.split("-")[0] === t.split("-")[0];
}
function In(e, t) {
	let n = t.indexOf(e);
	if (n === -1) return !1;
	for (let r = n + 1; r < t.length; r++) if (Fn(e, t[r])) return !0;
	return !1;
}
function Ln(e) {
	return (t) => Rn(t, e);
}
function Rn(e, t) {
	let n = ct(t);
	if (n == null) throw Tt(0);
	if (gt(n) === 1) {
		let t = ut(n);
		return e.plural(t.reduce((t, n) => [...t, zn(e, n)], []));
	} else return zn(e, n);
}
function zn(e, t) {
	let n = ft(t);
	if (n != null) return e.type === "text" ? n : e.normalize([n]);
	{
		let n = mt(t).reduce((t, n) => [...t, Bn(e, n)], []);
		return e.normalize(n);
	}
}
function Bn(e, t) {
	let n = gt(t);
	switch (n) {
		case 3: return vt(t, n);
		case 9: return vt(t, n);
		case 4: {
			let r = t;
			if (N(r, "k") && r.k) return e.interpolate(e.named(r.k));
			if (N(r, "key") && r.key) return e.interpolate(e.named(r.key));
			throw Tt(n);
		}
		case 5: {
			let r = t;
			if (N(r, "i") && w(r.i)) return e.interpolate(e.list(r.i));
			if (N(r, "index") && w(r.index)) return e.interpolate(e.list(r.index));
			throw Tt(n);
		}
		case 6: {
			let n = t, r = bt(n), i = St(n);
			return e.linked(Bn(e, i), r ? Bn(e, r) : void 0, e.type);
		}
		case 7: return vt(t, n);
		case 8: return vt(t, n);
		default: throw Error(`unhandled node on format message part: ${n}`);
	}
}
var Vn = "Detected HTML in '{source}' message. Recommend not using HTML messages to avoid XSS.";
function Hn(e, t) {
	t && ke(e) && B(b(Vn, { source: e }));
}
var Un = (e) => e, Wn = k();
function Gn(e) {
	e.code === Se.USE_MODULO_SYNTAX && B(`The use of named interpolation with modulo syntax is deprecated. It will be removed in v10.
reference: https://vue-i18n.intlify.dev/guide/essentials/syntax#rails-i18n-format 
(message compiler warning message: ${e.message})`);
}
function Kn(e, t = {}) {
	let n = !1, r = t.onError || De;
	return t.onError = (e) => {
		n = !0, r(e);
	}, {
		...at(e, t),
		detectError: n
	};
}
var qn = /* @__NO_SIDE_EFFECTS__ */ (e, t) => {
	if (!I(e)) throw nn(q.NOT_SUPPORT_NON_STRING_MESSAGE);
	process.env.NODE_ENV !== "production" && (t.onWarn = Gn);
	{
		let n = L(t.warnHtmlMessage) ? t.warnHtmlMessage : !0;
		process.env.NODE_ENV !== "production" && Hn(e, n);
		let r = (t.onCacheKey || Un)(e), i = Wn[r];
		if (i) return i;
		let { code: a, detectError: o } = Kn(e, t), s = Function(`return ${a}`)();
		return o ? s : Wn[r] = s;
	}
};
function Jn(e, t) {
	if (process.env.NODE_ENV !== "production" && (t.onWarn = Gn), __INTLIFY_JIT_COMPILATION__ && !__INTLIFY_DROP_MESSAGE_COMPILER__ && I(e)) {
		let n = L(t.warnHtmlMessage) ? t.warnHtmlMessage : !0;
		process.env.NODE_ENV !== "production" && Hn(e, n);
		let r = (t.onCacheKey || Un)(e), i = Wn[r];
		if (i) return i;
		let { ast: a, detectError: o } = Kn(e, {
			...t,
			location: process.env.NODE_ENV !== "production",
			jit: !0
		}), s = Ln(a);
		return o ? s : Wn[r] = s;
	} else {
		if (process.env.NODE_ENV !== "production" && !G(e)) return B(`the message that is resolve with key '${t.key}' is not supported for jit compilation`), (() => e);
		let n = e.cacheKey;
		return n ? Wn[n] || (Wn[n] = Ln(e)) : Ln(e);
	}
}
var Yn = () => "", J = (e) => F(e);
function Xn(e, ...t) {
	let { fallbackFormat: n, postTranslation: r, unresolving: i, messageCompiler: a, fallbackLocale: o, messages: s } = e, [c, l] = tr(...t), u = L(l.missingWarn) ? l.missingWarn : e.missingWarn, d = L(l.fallbackWarn) ? l.fallbackWarn : e.fallbackWarn, f = L(l.escapeParameter) ? l.escapeParameter : e.escapeParameter, p = !!l.resolvedMessage, m = I(l.default) || L(l.default) ? L(l.default) ? a ? c : () => c : l.default : n ? a ? c : () => c : "", h = n || m !== "", g = an(e, l);
	f && Zn(l);
	let [_, v, y] = p ? [
		c,
		g,
		s[g] || k()
	] : Qn(e, c, g, o, d, u), b = _, x = c;
	if (!p && !(I(b) || G(b) || J(b)) && h && (b = m, x = b), !p && (!(I(b) || G(b) || J(b)) || !I(v))) return i ? -1 : c;
	if (process.env.NODE_ENV !== "production" && I(b) && e.messageCompiler == null) return B(`The message format compilation is not supported in this build. Because message compiler isn't included. You need to pre-compilation all message format. So translate function return '${c}'.`), c;
	let S = !1, C = J(b) ? b : $n(e, c, v, b, x, () => {
		S = !0;
	});
	if (S) return b;
	let w = er(e, C, Wt(ir(e, v, y, l))), ee = r ? r(w, c) : w;
	if (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
		let t = {
			timestamp: Date.now(),
			key: I(c) ? c : J(b) ? b.key : "",
			locale: v || (J(b) ? b.locale : ""),
			format: I(b) ? b : J(b) ? b.source : "",
			message: ee
		};
		t.meta = D({}, e.__meta, /* @__PURE__ */ wn() || {}), Jt(t);
	}
	return ee;
}
function Zn(e) {
	P(e.list) ? e.list = e.list.map((e) => I(e) ? M(e) : e) : R(e.named) && Object.keys(e.named).forEach((t) => {
		I(e.named[t]) && (e.named[t] = M(e.named[t]));
	});
}
function Qn(e, t, n, r, i, a) {
	let { messages: o, onWarn: s, messageResolver: c, localeFallbacker: l } = e, u = l(e, r, n), d = k(), f, p = null, m = n, h = null, y = "translate";
	for (let r = 0; r < u.length; r++) {
		if (f = h = u[r], process.env.NODE_ENV !== "production" && n !== f && !Fn(n, f) && jn(i, t) && s($t(K.FALLBACK_TO_TRANSLATE, {
			key: t,
			target: f
		})), process.env.NODE_ENV !== "production" && n !== f) {
			let n = e.__v_emitter;
			n && n.emit("fallback", {
				type: y,
				key: t,
				from: m,
				to: h,
				groupId: `${y}:${t}`
			});
		}
		d = o[f] || k();
		let l = null, b, x;
		if (process.env.NODE_ENV !== "production" && g && (l = window.performance.now(), b = "intlify-message-resolve-start", x = "intlify-message-resolve-end", _ && _(b)), (p = c(d, t)) === null && (p = d[t]), process.env.NODE_ENV !== "production" && g) {
			let n = window.performance.now(), r = e.__v_emitter;
			r && l && p && r.emit("message-resolve", {
				type: "message-resolve",
				key: t,
				message: p,
				time: n - l,
				groupId: `${y}:${t}`
			}), b && x && _ && v && (_(x), v("intlify message resolve", b, x));
		}
		if (I(p) || G(p) || J(p)) break;
		if (!In(f, u)) {
			let n = Nn(e, t, f, a, y);
			n !== t && (p = n);
		}
		m = h;
	}
	return [
		p,
		f,
		d
	];
}
function $n(e, t, n, r, i, a) {
	let { messageCompiler: o, warnHtmlMessage: s } = e;
	if (J(r)) {
		let e = r;
		return e.locale = e.locale || n, e.key = e.key || t, e;
	}
	if (o == null) {
		let e = (() => r);
		return e.locale = n, e.key = t, e;
	}
	let c = null, l, u;
	process.env.NODE_ENV !== "production" && g && (c = window.performance.now(), l = "intlify-message-compilation-start", u = "intlify-message-compilation-end", _ && _(l));
	let d = o(r, nr(e, n, i, r, s, a));
	if (process.env.NODE_ENV !== "production" && g) {
		let n = window.performance.now(), i = e.__v_emitter;
		i && c && i.emit("message-compilation", {
			type: "message-compilation",
			message: r,
			time: n - c,
			groupId: `translate:${t}`
		}), l && u && _ && v && (_(u), v("intlify message compilation", l, u));
	}
	return d.locale = n, d.key = t, d.source = r, d;
}
function er(e, t, n) {
	let r = null, i, a;
	process.env.NODE_ENV !== "production" && g && (r = window.performance.now(), i = "intlify-message-evaluation-start", a = "intlify-message-evaluation-end", _ && _(i));
	let o = t(n);
	if (process.env.NODE_ENV !== "production" && g) {
		let n = window.performance.now(), s = e.__v_emitter;
		s && r && s.emit("message-evaluation", {
			type: "message-evaluation",
			value: o,
			time: n - r,
			groupId: `translate:${t.key}`
		}), i && a && _ && v && (_(a), v("intlify message evaluation", i, a));
	}
	return o;
}
function tr(...e) {
	let [t, n, r] = e, i = k();
	if (!I(t) && !w(t) && !J(t) && !G(t)) throw nn(q.INVALID_ARGUMENT);
	let a = w(t) ? String(t) : (J(t), t);
	return w(n) ? i.plural = n : I(n) ? i.default = n : z(n) && !E(n) ? i.named = n : P(n) && (i.list = n), w(r) ? i.plural = r : I(r) ? i.default = r : z(r) && D(i, r), [a, i];
}
function nr(e, t, n, r, i, a) {
	return {
		locale: t,
		key: n,
		warnHtmlMessage: i,
		onError: (t) => {
			if (a && a(t), process.env.NODE_ENV !== "production") {
				let i = rr(r), a = `Message compilation error: ${t.message}`, o = t.location && i && ce(i, t.location.start.offset, t.location.end.offset), s = e.__v_emitter;
				s && i && s.emit("compile-error", {
					message: i,
					error: t.message,
					start: t.location && t.location.start.offset,
					end: t.location && t.location.end.offset,
					groupId: `translate:${n}`
				}), console.error(o ? `${a}\n${o}` : a);
			} else throw t;
		},
		onCacheKey: (e) => S(t, n, e)
	};
}
function rr(e) {
	if (I(e)) return e;
	if (e.loc && e.loc.source) return e.loc.source;
}
function ir(e, t, n, r) {
	let { modifiers: i, pluralRules: a, messageResolver: o, fallbackLocale: s, fallbackWarn: c, missingWarn: l, fallbackContext: u } = e, d = {
		locale: t,
		modifiers: i,
		pluralRules: a,
		messages: (r) => {
			let i = o(n, r);
			if (i == null && u) {
				let [, , e] = Qn(u, r, t, s, c, l);
				i = o(e, r);
			}
			if (I(i) || G(i)) {
				let n = !1, a = $n(e, r, t, i, r, () => {
					n = !0;
				});
				return n ? Yn : a;
			} else if (J(i)) return i;
			else return Yn;
		}
	};
	return e.processor && (d.processor = e.processor), r.list && (d.list = r.list), r.named && (d.named = r.named), w(r.plural) && (d.pluralIndex = r.plural), d;
}
var ar = typeof Intl < "u", or = {
	dateTimeFormat: ar && Intl.DateTimeFormat !== void 0,
	numberFormat: ar && Intl.NumberFormat !== void 0
};
function sr(e, ...t) {
	let { datetimeFormats: n, unresolving: r, fallbackLocale: i, onWarn: a, localeFallbacker: o } = e, { __datetimeFormatters: s } = e;
	if (process.env.NODE_ENV !== "production" && !or.dateTimeFormat) return a($t(K.CANNOT_FORMAT_DATE)), "";
	let [c, l, u, d] = lr(...t), f = L(u.missingWarn) ? u.missingWarn : e.missingWarn, p = L(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn, m = !!u.part, h = an(e, u), g = o(e, i, h);
	if (!I(c) || c === "") return new Intl.DateTimeFormat(h, d).format(l);
	let _ = {}, v, y = null, b = h, x = null, S = "datetime format";
	for (let t = 0; t < g.length; t++) {
		if (v = x = g[t], process.env.NODE_ENV !== "production" && h !== v && jn(p, c) && a($t(K.FALLBACK_TO_DATE_FORMAT, {
			key: c,
			target: v
		})), process.env.NODE_ENV !== "production" && h !== v) {
			let t = e.__v_emitter;
			t && t.emit("fallback", {
				type: S,
				key: c,
				from: b,
				to: x,
				groupId: `${S}:${c}`
			});
		}
		if (_ = n[v] || {}, y = _[c], z(y)) break;
		Nn(e, c, v, f, S), b = x;
	}
	if (!z(y) || !I(v)) return r ? -1 : c;
	let C = `${v}__${c}`;
	E(d) || (C = `${C}__${JSON.stringify(d)}`);
	let w = s.get(C);
	return w || (w = new Intl.DateTimeFormat(v, D({}, y, d)), s.set(C, w)), m ? w.formatToParts(l) : w.format(l);
}
var cr = [
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
function lr(...e) {
	let [t, n, r, i] = e, a = k(), o = k(), s;
	if (I(t)) {
		let e = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
		if (!e) throw nn(q.INVALID_ISO_DATE_ARGUMENT);
		let n = e[3] ? e[3].trim().startsWith("T") ? `${e[1].trim()}${e[3].trim()}` : `${e[1].trim()}T${e[3].trim()}` : e[1].trim();
		s = new Date(n);
		try {
			s.toISOString();
		} catch {
			throw nn(q.INVALID_ISO_DATE_ARGUMENT);
		}
	} else if (ee(t)) {
		if (isNaN(t.getTime())) throw nn(q.INVALID_DATE_ARGUMENT);
		s = t;
	} else if (w(t)) s = t;
	else throw nn(q.INVALID_ARGUMENT);
	return I(n) ? a.key = n : z(n) && Object.keys(n).forEach((e) => {
		cr.includes(e) ? o[e] = n[e] : a[e] = n[e];
	}), I(r) ? a.locale = r : z(r) && (o = r), z(i) && (o = i), [
		a.key || "",
		s,
		a,
		o
	];
}
function ur(e, t, n) {
	let r = e;
	for (let e in n) {
		let n = `${t}__${e}`;
		r.__datetimeFormatters.has(n) && r.__datetimeFormatters.delete(n);
	}
}
function dr(e, ...t) {
	let { numberFormats: n, unresolving: r, fallbackLocale: i, onWarn: a, localeFallbacker: o } = e, { __numberFormatters: s } = e;
	if (process.env.NODE_ENV !== "production" && !or.numberFormat) return a($t(K.CANNOT_FORMAT_NUMBER)), "";
	let [c, l, u, d] = pr(...t), f = L(u.missingWarn) ? u.missingWarn : e.missingWarn, p = L(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn, m = !!u.part, h = an(e, u), g = o(e, i, h);
	if (!I(c) || c === "") return new Intl.NumberFormat(h, d).format(l);
	let _ = {}, v, y = null, b = h, x = null, S = "number format";
	for (let t = 0; t < g.length; t++) {
		if (v = x = g[t], process.env.NODE_ENV !== "production" && h !== v && jn(p, c) && a($t(K.FALLBACK_TO_NUMBER_FORMAT, {
			key: c,
			target: v
		})), process.env.NODE_ENV !== "production" && h !== v) {
			let t = e.__v_emitter;
			t && t.emit("fallback", {
				type: S,
				key: c,
				from: b,
				to: x,
				groupId: `${S}:${c}`
			});
		}
		if (_ = n[v] || {}, y = _[c], z(y)) break;
		Nn(e, c, v, f, S), b = x;
	}
	if (!z(y) || !I(v)) return r ? -1 : c;
	let C = `${v}__${c}`;
	E(d) || (C = `${C}__${JSON.stringify(d)}`);
	let w = s.get(C);
	return w || (w = new Intl.NumberFormat(v, D({}, y, d)), s.set(C, w)), m ? w.formatToParts(l) : w.format(l);
}
var fr = [
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
function pr(...e) {
	let [t, n, r, i] = e, a = k(), o = k();
	if (!w(t)) throw nn(q.INVALID_ARGUMENT);
	let s = t;
	return I(n) ? a.key = n : z(n) && Object.keys(n).forEach((e) => {
		fr.includes(e) ? o[e] = n[e] : a[e] = n[e];
	}), I(r) ? a.locale = r : z(r) && (o = r), z(i) && (o = i), [
		a.key || "",
		s,
		a,
		o
	];
}
function mr(e, t, n) {
	let r = e;
	for (let e in n) {
		let n = `${t}__${e}`;
		r.__numberFormatters.has(n) && r.__numberFormatters.delete(n);
	}
}
ot();
//#endregion
//#region node_modules/.pnpm/@vue+devtools-api@6.6.4/node_modules/@vue/devtools-api/lib/esm/env.js
function hr() {
	return gr().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function gr() {
	return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
var _r = typeof Proxy == "function", vr = "devtools-plugin:setup", yr = "plugin:settings:set", br, xr;
function Sr() {
	return br === void 0 && (typeof window < "u" && window.performance ? (br = !0, xr = window.performance) : typeof globalThis < "u" && globalThis.perf_hooks?.performance ? (br = !0, xr = globalThis.perf_hooks.performance) : br = !1), br;
}
function Cr() {
	return Sr() ? xr.now() : Date.now();
}
//#endregion
//#region node_modules/.pnpm/@vue+devtools-api@6.6.4/node_modules/@vue/devtools-api/lib/esm/proxy.js
var wr = class {
	constructor(e, t) {
		this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = e, this.hook = t;
		let n = {};
		if (e.settings) for (let t in e.settings) n[t] = e.settings[t].defaultValue;
		let r = `__vue-devtools-plugin-settings__${e.id}`, i = Object.assign({}, n);
		try {
			let e = localStorage.getItem(r), t = JSON.parse(e);
			Object.assign(i, t);
		} catch {}
		this.fallbacks = {
			getSettings() {
				return i;
			},
			setSettings(e) {
				try {
					localStorage.setItem(r, JSON.stringify(e));
				} catch {}
				i = e;
			},
			now() {
				return Cr();
			}
		}, t && t.on(yr, (e, t) => {
			e === this.plugin.id && this.fallbacks.setSettings(t);
		}), this.proxiedOn = new Proxy({}, { get: (e, t) => this.target ? this.target.on[t] : (...e) => {
			this.onQueue.push({
				method: t,
				args: e
			});
		} }), this.proxiedTarget = new Proxy({}, { get: (e, t) => this.target ? this.target[t] : t === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(t) ? (...e) => (this.targetQueue.push({
			method: t,
			args: e,
			resolve: () => {}
		}), this.fallbacks[t](...e)) : (...e) => new Promise((n) => {
			this.targetQueue.push({
				method: t,
				args: e,
				resolve: n
			});
		}) });
	}
	async setRealTarget(e) {
		this.target = e;
		for (let e of this.onQueue) this.target.on[e.method](...e.args);
		for (let e of this.targetQueue) e.resolve(await this.target[e.method](...e.args));
	}
};
//#endregion
//#region node_modules/.pnpm/@vue+devtools-api@6.6.4/node_modules/@vue/devtools-api/lib/esm/index.js
function Tr(e, t) {
	let n = e, r = gr(), i = hr(), a = _r && n.enableEarlyProxy;
	if (i && (r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !a)) i.emit(vr, e, t);
	else {
		let e = a ? new wr(n, i) : null;
		(r.__VUE_DEVTOOLS_PLUGINS__ = r.__VUE_DEVTOOLS_PLUGINS__ || []).push({
			pluginDescriptor: n,
			setupFn: t,
			proxy: e
		}), e && t(e.proxiedTarget);
	}
}
//#endregion
//#region node_modules/.pnpm/vue-i18n@9.14.4_vue@3.5.30/node_modules/vue-i18n/dist/vue-i18n.mjs
var Er = "9.14.4";
function Dr() {
	typeof __VUE_I18N_FULL_INSTALL__ != "boolean" && (j().__VUE_I18N_FULL_INSTALL__ = !0), typeof __VUE_I18N_LEGACY_API__ != "boolean" && (j().__VUE_I18N_LEGACY_API__ = !0), typeof __INTLIFY_JIT_COMPILATION__ != "boolean" && (j().__INTLIFY_JIT_COMPILATION__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (j().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1), typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (j().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
var Or = K.__EXTEND_POINT__, kr = le(Or), Y = {
	FALLBACK_TO_ROOT: Or,
	NOT_SUPPORTED_PRESERVE: kr(),
	NOT_SUPPORTED_FORMATTER: kr(),
	NOT_SUPPORTED_PRESERVE_DIRECTIVE: kr(),
	NOT_SUPPORTED_GET_CHOICE_INDEX: kr(),
	COMPONENT_NAME_LEGACY_COMPATIBLE: kr(),
	NOT_FOUND_PARENT_SCOPE: kr(),
	IGNORE_OBJ_FLATTEN: kr(),
	NOTICE_DROP_ALLOW_COMPOSITION: kr(),
	NOTICE_DROP_TRANSLATE_EXIST_COMPATIBLE_FLAG: kr()
}, Ar = {
	[Y.FALLBACK_TO_ROOT]: "Fall back to {type} '{key}' with root locale.",
	[Y.NOT_SUPPORTED_PRESERVE]: "Not supported 'preserve'.",
	[Y.NOT_SUPPORTED_FORMATTER]: "Not supported 'formatter'.",
	[Y.NOT_SUPPORTED_PRESERVE_DIRECTIVE]: "Not supported 'preserveDirectiveContent'.",
	[Y.NOT_SUPPORTED_GET_CHOICE_INDEX]: "Not supported 'getChoiceIndex'.",
	[Y.COMPONENT_NAME_LEGACY_COMPATIBLE]: "Component name legacy compatible: '{name}' -> 'i18n'",
	[Y.NOT_FOUND_PARENT_SCOPE]: "Not found parent scope. use the global scope.",
	[Y.IGNORE_OBJ_FLATTEN]: "Ignore object flatten: '{key}' key has an string value",
	[Y.NOTICE_DROP_ALLOW_COMPOSITION]: "'allowComposition' option will be dropped in the next major version. For more information, please see 👉 https://tinyurl.com/2p97mcze",
	[Y.NOTICE_DROP_TRANSLATE_EXIST_COMPATIBLE_FLAG]: "'translateExistCompatible' option will be dropped in the next major version."
};
function X(e, ...t) {
	return b(Ar[e], ...t);
}
var jr = q.__EXTEND_POINT__, Z = le(jr), Q = {
	UNEXPECTED_RETURN_TYPE: jr,
	INVALID_ARGUMENT: Z(),
	MUST_BE_CALL_SETUP_TOP: Z(),
	NOT_INSTALLED: Z(),
	NOT_AVAILABLE_IN_LEGACY_MODE: Z(),
	REQUIRED_VALUE: Z(),
	INVALID_VALUE: Z(),
	CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: Z(),
	NOT_INSTALLED_WITH_PROVIDE: Z(),
	UNEXPECTED_ERROR: Z(),
	NOT_COMPATIBLE_LEGACY_VUE_I18N: Z(),
	BRIDGE_SUPPORT_VUE_2_ONLY: Z(),
	MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: Z(),
	NOT_AVAILABLE_COMPOSITION_IN_LEGACY: Z(),
	__EXTEND_POINT__: Z()
};
function $(e, ...t) {
	return Ee(e, null, process.env.NODE_ENV === "production" ? void 0 : {
		messages: Mr,
		args: t
	});
}
var Mr = {
	[Q.UNEXPECTED_RETURN_TYPE]: "Unexpected return type in composer",
	[Q.INVALID_ARGUMENT]: "Invalid argument",
	[Q.MUST_BE_CALL_SETUP_TOP]: "Must be called at the top of a `setup` function",
	[Q.NOT_INSTALLED]: "Need to install with `app.use` function",
	[Q.UNEXPECTED_ERROR]: "Unexpected error",
	[Q.NOT_AVAILABLE_IN_LEGACY_MODE]: "Not available in legacy mode",
	[Q.REQUIRED_VALUE]: "Required in value: {0}",
	[Q.INVALID_VALUE]: "Invalid value",
	[Q.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN]: "Cannot setup vue-devtools plugin",
	[Q.NOT_INSTALLED_WITH_PROVIDE]: "Need to install with `provide` function",
	[Q.NOT_COMPATIBLE_LEGACY_VUE_I18N]: "Not compatible legacy VueI18n.",
	[Q.BRIDGE_SUPPORT_VUE_2_ONLY]: "vue-i18n-bridge support Vue 2.x only",
	[Q.MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION]: "Must define ‘i18n’ option or custom block in Composition API with using local scope in Legacy API mode",
	[Q.NOT_AVAILABLE_COMPOSITION_IN_LEGACY]: "Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly"
}, Nr = /* @__PURE__ */ x("__translateVNode"), Pr = /* @__PURE__ */ x("__datetimeParts"), Fr = /* @__PURE__ */ x("__numberParts"), Ir = /* @__PURE__ */ x("__enableEmitter"), Lr = /* @__PURE__ */ x("__disableEmitter"), Rr = x("__setPluralRules");
x("__intlifyMeta");
var zr = /* @__PURE__ */ x("__injectWithOption"), Br = /* @__PURE__ */ x("__dispose");
function Vr(e) {
	if (!R(e) || G(e)) return e;
	for (let t in e) if (N(e, t)) if (!t.includes(".")) R(e[t]) && Vr(e[t]);
	else {
		let n = t.split("."), r = n.length - 1, i = e, a = !1;
		for (let e = 0; e < r; e++) {
			if (n[e] === "__proto__") throw Error(`unsafe key: ${n[e]}`);
			if (n[e] in i || (i[n[e]] = k()), !R(i[n[e]])) {
				process.env.NODE_ENV !== "production" && B(X(Y.IGNORE_OBJ_FLATTEN, { key: n[e] })), a = !0;
				break;
			}
			i = i[n[e]];
		}
		if (a || (G(i) ? wt.includes(n[r]) || delete e[t] : (i[n[r]] = e[t], delete e[t])), !G(i)) {
			let e = i[n[r]];
			R(e) && Vr(e);
		}
	}
	return e;
}
function Hr(e, t) {
	let { messages: n, __i18n: r, messageResolver: i, flatJson: a } = t, o = z(n) ? n : P(r) ? k() : { [e]: k() };
	if (P(r) && r.forEach((e) => {
		if ("locale" in e && "resource" in e) {
			let { locale: t, resource: n } = e;
			t ? (o[t] = o[t] || k(), pe(n, o[t])) : pe(n, o);
		} else I(e) && pe(JSON.parse(e), o);
	}), i == null && a) for (let e in o) N(o, e) && Vr(o[e]);
	return o;
}
function Ur(e) {
	return e.type;
}
function Wr(e, t, n) {
	let r = R(t.messages) ? t.messages : k();
	"__i18nGlobal" in n && (r = Hr(e.locale.value, {
		messages: r,
		__i18n: n.__i18nGlobal
	}));
	let i = Object.keys(r);
	if (i.length && i.forEach((t) => {
		e.mergeLocaleMessage(t, r[t]);
	}), R(t.datetimeFormats)) {
		let n = Object.keys(t.datetimeFormats);
		n.length && n.forEach((n) => {
			e.mergeDateTimeFormat(n, t.datetimeFormats[n]);
		});
	}
	if (R(t.numberFormats)) {
		let n = Object.keys(t.numberFormats);
		n.length && n.forEach((n) => {
			e.mergeNumberFormat(n, t.numberFormats[n]);
		});
	}
}
function Gr(e) {
	return o(d, null, e, 0);
}
var Kr = () => [], qr = () => !1, Jr = 0;
function Yr(e) {
	return ((t, n, r, i) => e(n, r, h() || void 0, i));
}
function Xr(e = {}, r) {
	let { __root: i, __injectWithOption: a } = e, o = i === void 0, s = e.flatJson, u = g ? t : n, d = !!e.translateExistCompatible;
	process.env.NODE_ENV !== "production" && d && de(X(Y.NOTICE_DROP_TRANSLATE_EXIST_COMPATIBLE_FLAG));
	let f = L(e.inheritLocale) ? e.inheritLocale : !0, p = u(i && f ? i.locale.value : I(e.locale) ? e.locale : mn), m = u(i && f ? i.fallbackLocale.value : I(e.fallbackLocale) || P(e.fallbackLocale) || z(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : p.value), h = u(Hr(p.value, e)), _ = u(z(e.datetimeFormats) ? e.datetimeFormats : { [p.value]: {} }), v = u(z(e.numberFormats) ? e.numberFormats : { [p.value]: {} }), y = i ? i.missingWarn : L(e.missingWarn) || T(e.missingWarn) ? e.missingWarn : !0, b = i ? i.fallbackWarn : L(e.fallbackWarn) || T(e.fallbackWarn) ? e.fallbackWarn : !0, x = i ? i.fallbackRoot : L(e.fallbackRoot) ? e.fallbackRoot : !0, S = !!e.fallbackFormat, C = F(e.missing) ? e.missing : null, ee = F(e.missing) ? Yr(e.missing) : null, E = F(e.postTranslation) ? e.postTranslation : null, O = i ? i.warnHtmlMessage : L(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, k = !!e.escapeParameter, A = i ? i.modifiers : z(e.modifiers) ? e.modifiers : {}, j = e.pluralRules || i && i.pluralRules, M;
	M = (() => {
		o && En(null);
		let t = {
			version: Er,
			locale: p.value,
			fallbackLocale: m.value,
			messages: h.value,
			modifiers: A,
			pluralRules: j,
			missing: ee === null ? void 0 : ee,
			missingWarn: y,
			fallbackWarn: b,
			fallbackFormat: S,
			unresolving: !0,
			postTranslation: E === null ? void 0 : E,
			warnHtmlMessage: O,
			escapeParameter: k,
			messageResolver: e.messageResolver,
			messageCompiler: e.messageCompiler,
			__meta: { framework: "vue" }
		};
		t.datetimeFormats = _.value, t.numberFormats = v.value, t.__datetimeFormatters = z(M) ? M.__datetimeFormatters : void 0, t.__numberFormatters = z(M) ? M.__numberFormatters : void 0, process.env.NODE_ENV !== "production" && (t.__v_emitter = z(M) ? M.__v_emitter : void 0);
		let n = kn(t);
		return o && En(n), n;
	})(), Pn(M, p.value, m.value);
	function te() {
		return [
			p.value,
			m.value,
			h.value,
			_.value,
			v.value
		];
	}
	let ne = c({
		get: () => p.value,
		set: (e) => {
			p.value = e, M.locale = p.value;
		}
	}), re = c({
		get: () => m.value,
		set: (e) => {
			m.value = e, M.fallbackLocale = m.value, Pn(M, p.value, e);
		}
	}), ie = c(() => h.value), ae = /* @__PURE__ */ c(() => _.value), oe = /* @__PURE__ */ c(() => v.value);
	function se() {
		return F(E) ? E : null;
	}
	function ce(e) {
		E = e, M.postTranslation = e;
	}
	function le() {
		return C;
	}
	function ue(e) {
		e !== null && (ee = Yr(e)), C = e, M.missing = ee;
	}
	function fe(e, t) {
		return e !== "translate" || !t.resolvedMessage;
	}
	let V = (e, t, n, r, a, s) => {
		te();
		let c;
		try {
			process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__, o || (M.fallbackContext = i ? Dn() : void 0), c = e(M);
		} finally {
			process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__, o || (M.fallbackContext = void 0);
		}
		if (n !== "translate exists" && w(c) && c === -1 || n === "translate exists" && !c) {
			let [e, o] = t();
			if (process.env.NODE_ENV !== "production" && i && I(e) && fe(n, o) && (x && (jn(b, e) || Mn(y, e)) && B(X(Y.FALLBACK_TO_ROOT, {
				key: e,
				type: n
			})), process.env.NODE_ENV !== "production")) {
				let { __v_emitter: t } = M;
				t && x && t.emit("fallback", {
					type: n,
					key: e,
					to: "global",
					groupId: `${n}:${e}`
				});
			}
			return i && x ? r(i) : a(e);
		} else if (s(c)) return c;
		else
 /* istanbul ignore next */
		throw $(Q.UNEXPECTED_RETURN_TYPE);
	};
	function me(...e) {
		return V((t) => Reflect.apply(Xn, null, [t, ...e]), () => tr(...e), "translate", (t) => Reflect.apply(t.t, t, [...e]), (e) => e, (e) => I(e));
	}
	function he(...e) {
		let [t, n, r] = e;
		if (r && !R(r)) throw $(Q.INVALID_ARGUMENT);
		return me(t, n, D({ resolvedMessage: !0 }, r || {}));
	}
	function ge(...e) {
		return V((t) => Reflect.apply(sr, null, [t, ...e]), () => lr(...e), "datetime format", (t) => Reflect.apply(t.d, t, [...e]), () => "", (e) => I(e));
	}
	function _e(...e) {
		return V((t) => Reflect.apply(dr, null, [t, ...e]), () => pr(...e), "number format", (t) => Reflect.apply(t.n, t, [...e]), () => "", (e) => I(e));
	}
	function ve(e) {
		return e.map((e) => I(e) || w(e) || L(e) ? Gr(String(e)) : e);
	}
	let ye = {
		normalize: ve,
		interpolate: (e) => e,
		type: "vnode"
	};
	function be(...e) {
		return V((t) => {
			let n, r = t;
			try {
				r.processor = ye, n = Reflect.apply(Xn, null, [r, ...e]);
			} finally {
				r.processor = null;
			}
			return n;
		}, () => tr(...e), "translate", (t) => t[Nr](...e), (e) => [Gr(e)], (e) => P(e));
	}
	function xe(...e) {
		return V((t) => Reflect.apply(dr, null, [t, ...e]), () => pr(...e), "number format", (t) => t[Fr](...e), Kr, (e) => I(e) || P(e));
	}
	function Se(...e) {
		return V((t) => Reflect.apply(sr, null, [t, ...e]), () => lr(...e), "datetime format", (t) => t[Pr](...e), Kr, (e) => I(e) || P(e));
	}
	function Ce(e) {
		j = e, M.pluralRules = j;
	}
	function we(e, t) {
		return V(() => {
			if (!e) return !1;
			let n = Ee(I(t) ? t : p.value), r = M.messageResolver(n, e);
			return d ? r != null : G(r) || J(r) || I(r);
		}, () => [e], "translate exists", (n) => Reflect.apply(n.te, n, [e, t]), qr, (e) => L(e));
	}
	function H(e) {
		let t = null, n = ln(M, m.value, p.value);
		for (let r = 0; r < n.length; r++) {
			let i = h.value[n[r]] || {}, a = M.messageResolver(i, e);
			if (a != null) {
				t = a;
				break;
			}
		}
		return t;
	}
	function Te(e) {
		return H(e) ?? (i && i.tm(e) || {});
	}
	function Ee(e) {
		return h.value[e] || {};
	}
	function De(e, t) {
		if (s) {
			let n = { [e]: t };
			for (let e in n) N(n, e) && Vr(n[e]);
			t = n[e];
		}
		h.value[e] = t, M.messages = h.value;
	}
	function Oe(e, t) {
		h.value[e] = h.value[e] || {};
		let n = { [e]: t };
		if (s) for (let e in n) N(n, e) && Vr(n[e]);
		t = n[e], pe(t, h.value[e]), M.messages = h.value;
	}
	function ke(e) {
		return _.value[e] || {};
	}
	function Ae(e, t) {
		_.value[e] = t, M.datetimeFormats = _.value, ur(M, e, t);
	}
	function je(e, t) {
		_.value[e] = D(_.value[e] || {}, t), M.datetimeFormats = _.value, ur(M, e, t);
	}
	function U(e) {
		return v.value[e] || {};
	}
	function Me(e, t) {
		v.value[e] = t, M.numberFormats = v.value, mr(M, e, t);
	}
	function Ne(e, t) {
		v.value[e] = D(v.value[e] || {}, t), M.numberFormats = v.value, mr(M, e, t);
	}
	Jr++, i && g && (l(i.locale, (e) => {
		f && (p.value = e, M.locale = e, Pn(M, p.value, m.value));
	}), l(i.fallbackLocale, (e) => {
		f && (m.value = e, M.fallbackLocale = e, Pn(M, p.value, m.value));
	}));
	let W = {
		id: Jr,
		locale: ne,
		fallbackLocale: re,
		get inheritLocale() {
			return f;
		},
		set inheritLocale(e) {
			f = e, e && i && (p.value = i.locale.value, m.value = i.fallbackLocale.value, Pn(M, p.value, m.value));
		},
		get availableLocales() {
			return Object.keys(h.value).sort();
		},
		messages: ie,
		get modifiers() {
			return A;
		},
		get pluralRules() {
			return j || {};
		},
		get isGlobal() {
			return o;
		},
		get missingWarn() {
			return y;
		},
		set missingWarn(e) {
			y = e, M.missingWarn = y;
		},
		get fallbackWarn() {
			return b;
		},
		set fallbackWarn(e) {
			b = e, M.fallbackWarn = b;
		},
		get fallbackRoot() {
			return x;
		},
		set fallbackRoot(e) {
			x = e;
		},
		get fallbackFormat() {
			return S;
		},
		set fallbackFormat(e) {
			S = e, M.fallbackFormat = S;
		},
		get warnHtmlMessage() {
			return O;
		},
		set warnHtmlMessage(e) {
			O = e, M.warnHtmlMessage = e;
		},
		get escapeParameter() {
			return k;
		},
		set escapeParameter(e) {
			k = e, M.escapeParameter = e;
		},
		t: me,
		getLocaleMessage: Ee,
		setLocaleMessage: De,
		mergeLocaleMessage: Oe,
		getPostTranslationHandler: se,
		setPostTranslationHandler: ce,
		getMissingHandler: le,
		setMissingHandler: ue,
		[Rr]: Ce
	};
	return W.datetimeFormats = ae, W.numberFormats = oe, W.rt = he, W.te = we, W.tm = Te, W.d = ge, W.n = _e, W.getDateTimeFormat = ke, W.setDateTimeFormat = Ae, W.mergeDateTimeFormat = je, W.getNumberFormat = U, W.setNumberFormat = Me, W.mergeNumberFormat = Ne, W[zr] = a, W[Nr] = be, W[Pr] = Se, W[Fr] = xe, process.env.NODE_ENV !== "production" && (W[Ir] = (e) => {
		M.__v_emitter = e;
	}, W[Lr] = () => {
		M.__v_emitter = void 0;
	}), W;
}
function Zr(e) {
	let t = I(e.locale) ? e.locale : mn, n = I(e.fallbackLocale) || P(e.fallbackLocale) || z(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : t, r = F(e.missing) ? e.missing : void 0, i = L(e.silentTranslationWarn) || T(e.silentTranslationWarn) ? !e.silentTranslationWarn : !0, a = L(e.silentFallbackWarn) || T(e.silentFallbackWarn) ? !e.silentFallbackWarn : !0, o = L(e.fallbackRoot) ? e.fallbackRoot : !0, s = !!e.formatFallbackMessages, c = z(e.modifiers) ? e.modifiers : {}, l = e.pluralizationRules, u = F(e.postTranslation) ? e.postTranslation : void 0, d = I(e.warnHtmlInMessage) ? e.warnHtmlInMessage !== "off" : !0, f = !!e.escapeParameterHtml, p = L(e.sync) ? e.sync : !0;
	process.env.NODE_ENV !== "production" && e.formatter && B(X(Y.NOT_SUPPORTED_FORMATTER)), process.env.NODE_ENV !== "production" && e.preserveDirectiveContent && B(X(Y.NOT_SUPPORTED_PRESERVE_DIRECTIVE));
	let m = e.messages;
	if (z(e.sharedMessages)) {
		let t = e.sharedMessages;
		m = Object.keys(t).reduce((e, n) => (D(e[n] || (e[n] = {}), t[n]), e), m || {});
	}
	let { __i18n: h, __root: g, __injectWithOption: _ } = e, v = e.datetimeFormats, y = e.numberFormats, b = e.flatJson, x = e.translateExistCompatible;
	return {
		locale: t,
		fallbackLocale: n,
		messages: m,
		flatJson: b,
		datetimeFormats: v,
		numberFormats: y,
		missing: r,
		missingWarn: i,
		fallbackWarn: a,
		fallbackRoot: o,
		fallbackFormat: s,
		modifiers: c,
		pluralRules: l,
		postTranslation: u,
		warnHtmlMessage: d,
		escapeParameter: f,
		messageResolver: e.messageResolver,
		inheritLocale: p,
		translateExistCompatible: x,
		__i18n: h,
		__root: g,
		__injectWithOption: _
	};
}
function Qr(e = {}, t) {
	{
		let t = Xr(Zr(e)), { __extender: n } = e, r = {
			id: t.id,
			get locale() {
				return t.locale.value;
			},
			set locale(e) {
				t.locale.value = e;
			},
			get fallbackLocale() {
				return t.fallbackLocale.value;
			},
			set fallbackLocale(e) {
				t.fallbackLocale.value = e;
			},
			get messages() {
				return t.messages.value;
			},
			get datetimeFormats() {
				return t.datetimeFormats.value;
			},
			get numberFormats() {
				return t.numberFormats.value;
			},
			get availableLocales() {
				return t.availableLocales;
			},
			get formatter() {
				return process.env.NODE_ENV !== "production" && B(X(Y.NOT_SUPPORTED_FORMATTER)), { interpolate() {
					return [];
				} };
			},
			set formatter(e) {
				process.env.NODE_ENV !== "production" && B(X(Y.NOT_SUPPORTED_FORMATTER));
			},
			get missing() {
				return t.getMissingHandler();
			},
			set missing(e) {
				t.setMissingHandler(e);
			},
			get silentTranslationWarn() {
				return L(t.missingWarn) ? !t.missingWarn : t.missingWarn;
			},
			set silentTranslationWarn(e) {
				t.missingWarn = L(e) ? !e : e;
			},
			get silentFallbackWarn() {
				return L(t.fallbackWarn) ? !t.fallbackWarn : t.fallbackWarn;
			},
			set silentFallbackWarn(e) {
				t.fallbackWarn = L(e) ? !e : e;
			},
			get modifiers() {
				return t.modifiers;
			},
			get formatFallbackMessages() {
				return t.fallbackFormat;
			},
			set formatFallbackMessages(e) {
				t.fallbackFormat = e;
			},
			get postTranslation() {
				return t.getPostTranslationHandler();
			},
			set postTranslation(e) {
				t.setPostTranslationHandler(e);
			},
			get sync() {
				return t.inheritLocale;
			},
			set sync(e) {
				t.inheritLocale = e;
			},
			get warnHtmlInMessage() {
				return t.warnHtmlMessage ? "warn" : "off";
			},
			set warnHtmlInMessage(e) {
				t.warnHtmlMessage = e !== "off";
			},
			get escapeParameterHtml() {
				return t.escapeParameter;
			},
			set escapeParameterHtml(e) {
				t.escapeParameter = e;
			},
			get preserveDirectiveContent() {
				return process.env.NODE_ENV !== "production" && B(X(Y.NOT_SUPPORTED_PRESERVE_DIRECTIVE)), !0;
			},
			set preserveDirectiveContent(e) {
				process.env.NODE_ENV !== "production" && B(X(Y.NOT_SUPPORTED_PRESERVE_DIRECTIVE));
			},
			get pluralizationRules() {
				return t.pluralRules || {};
			},
			__composer: t,
			t(...e) {
				let [n, r, i] = e, a = {}, o = null, s = null;
				if (!I(n)) throw $(Q.INVALID_ARGUMENT);
				let c = n;
				return I(r) ? a.locale = r : P(r) ? o = r : z(r) && (s = r), P(i) ? o = i : z(i) && (s = i), Reflect.apply(t.t, t, [
					c,
					o || s || {},
					a
				]);
			},
			rt(...e) {
				return Reflect.apply(t.rt, t, [...e]);
			},
			tc(...e) {
				let [n, r, i] = e, a = { plural: 1 }, o = null, s = null;
				if (!I(n)) throw $(Q.INVALID_ARGUMENT);
				let c = n;
				return I(r) ? a.locale = r : w(r) ? a.plural = r : P(r) ? o = r : z(r) && (s = r), I(i) ? a.locale = i : P(i) ? o = i : z(i) && (s = i), Reflect.apply(t.t, t, [
					c,
					o || s || {},
					a
				]);
			},
			te(e, n) {
				return t.te(e, n);
			},
			tm(e) {
				return t.tm(e);
			},
			getLocaleMessage(e) {
				return t.getLocaleMessage(e);
			},
			setLocaleMessage(e, n) {
				t.setLocaleMessage(e, n);
			},
			mergeLocaleMessage(e, n) {
				t.mergeLocaleMessage(e, n);
			},
			d(...e) {
				return Reflect.apply(t.d, t, [...e]);
			},
			getDateTimeFormat(e) {
				return t.getDateTimeFormat(e);
			},
			setDateTimeFormat(e, n) {
				t.setDateTimeFormat(e, n);
			},
			mergeDateTimeFormat(e, n) {
				t.mergeDateTimeFormat(e, n);
			},
			n(...e) {
				return Reflect.apply(t.n, t, [...e]);
			},
			getNumberFormat(e) {
				return t.getNumberFormat(e);
			},
			setNumberFormat(e, n) {
				t.setNumberFormat(e, n);
			},
			mergeNumberFormat(e, n) {
				t.mergeNumberFormat(e, n);
			},
			getChoiceIndex(e, t) {
				return process.env.NODE_ENV !== "production" && B(X(Y.NOT_SUPPORTED_GET_CHOICE_INDEX)), -1;
			}
		};
		return r.__extender = n, process.env.NODE_ENV !== "production" && (r.__enableEmitter = (e) => {
			let n = t;
			n[Ir] && n[Ir](e);
		}, r.__disableEmitter = () => {
			let e = t;
			e[Lr] && e[Lr]();
		}), r;
	}
}
var $r = {
	tag: { type: [String, Object] },
	locale: { type: String },
	scope: {
		type: String,
		validator: (e) => e === "parent" || e === "global",
		default: "parent"
	},
	i18n: { type: Object }
};
function ei({ slots: e }, t) {
	return t.length === 1 && t[0] === "default" ? (e.default ? e.default() : []).reduce((e, t) => [...e, ...t.type === u ? t.children : [t]], []) : t.reduce((t, n) => {
		let r = e[n];
		return r && (t[n] = r()), t;
	}, k());
}
function ti(e) {
	return u;
}
var ni = /* @__PURE__ */ f({
	name: "i18n-t",
	props: D({
		keypath: {
			type: String,
			required: !0
		},
		plural: {
			type: [Number, String],
			validator: (e) => w(e) || !isNaN(e)
		}
	}, $r),
	setup(e, t) {
		let { slots: n, attrs: r } = t, i = e.i18n || Li({
			useScope: e.scope,
			__useComponent: !0
		});
		return () => {
			let a = Object.keys(n).filter((e) => e !== "_"), o = k();
			e.locale && (o.locale = e.locale), e.plural !== void 0 && (o.plural = I(e.plural) ? +e.plural : e.plural);
			let c = ei(t, a), l = i[Nr](e.keypath, c, o), u = D(k(), r);
			return s(I(e.tag) || R(e.tag) ? e.tag : ti(), u, l);
		};
	}
});
function ri(e) {
	return P(e) && !I(e[0]);
}
function ii(e, t, n, r) {
	let { slots: i, attrs: a } = t;
	return () => {
		let t = { part: !0 }, o = k();
		e.locale && (t.locale = e.locale), I(e.format) ? t.key = e.format : R(e.format) && (I(e.format.key) && (t.key = e.format.key), o = Object.keys(e.format).reduce((t, r) => n.includes(r) ? D(k(), t, { [r]: e.format[r] }) : t, k()));
		let c = r(e.value, t, o), l = [t.key];
		P(c) ? l = c.map((e, t) => {
			let n = i[e.type], r = n ? n({
				[e.type]: e.value,
				index: t,
				parts: c
			}) : [e.value];
			return ri(r) && (r[0].key = `${e.type}-${t}`), r;
		}) : I(c) && (l = [c]);
		let u = D(k(), a);
		return s(I(e.tag) || R(e.tag) ? e.tag : ti(), u, l);
	};
}
var ai = /* @__PURE__ */ f({
	name: "i18n-n",
	props: D({
		value: {
			type: Number,
			required: !0
		},
		format: { type: [String, Object] }
	}, $r),
	setup(e, t) {
		let n = e.i18n || Li({
			useScope: e.scope,
			__useComponent: !0
		});
		return ii(e, t, fr, (...e) => n[Fr](...e));
	}
}), oi = /* @__PURE__ */ f({
	name: "i18n-d",
	props: D({
		value: {
			type: [Number, Date],
			required: !0
		},
		format: { type: [String, Object] }
	}, $r),
	setup(e, t) {
		let n = e.i18n || Li({
			useScope: e.scope,
			__useComponent: !0
		});
		return ii(e, t, cr, (...e) => n[Pr](...e));
	}
});
function si(e, t) {
	let n = e;
	if (e.mode === "composition") return n.__getInstance(t) || e.global;
	{
		let r = n.__getInstance(t);
		return r == null ? e.global.__composer : r.__composer;
	}
}
function ci(e) {
	let t = (t) => {
		let { instance: n, modifiers: r, value: i } = t;
		/* istanbul ignore if */
		if (!n || !n.$) throw $(Q.UNEXPECTED_ERROR);
		let a = si(e, n.$);
		process.env.NODE_ENV !== "production" && r.preserve && B(X(Y.NOT_SUPPORTED_PRESERVE));
		let o = li(i);
		return [Reflect.apply(a.t, a, [...ui(o)]), a];
	};
	return {
		created: (n, r) => {
			let [i, a] = t(r);
			g && e.global === a && (n.__i18nWatcher = l(a.locale, () => {
				r.instance && r.instance.$forceUpdate();
			})), n.__composer = a, n.textContent = i;
		},
		unmounted: (e) => {
			g && e.__i18nWatcher && (e.__i18nWatcher(), e.__i18nWatcher = void 0, delete e.__i18nWatcher), e.__composer && (e.__composer = void 0, delete e.__composer);
		},
		beforeUpdate: (e, { value: t }) => {
			if (e.__composer) {
				let n = e.__composer, r = li(t);
				e.textContent = Reflect.apply(n.t, n, [...ui(r)]);
			}
		},
		getSSRProps: (e) => {
			let [n] = t(e);
			return { textContent: n };
		}
	};
}
function li(e) {
	if (I(e)) return { path: e };
	if (z(e)) {
		if (!("path" in e)) throw $(Q.REQUIRED_VALUE, "path");
		return e;
	} else throw $(Q.INVALID_VALUE);
}
function ui(e) {
	let { path: t, locale: n, args: r, choice: i, plural: a } = e, o = {}, s = r || {};
	return I(n) && (o.locale = n), w(i) && (o.plural = i), w(a) && (o.plural = a), [
		t,
		s,
		o
	];
}
function di(e, t, ...n) {
	let r = z(n[0]) ? n[0] : {}, i = !!r.useI18nComponentName, a = L(r.globalInstall) ? r.globalInstall : !0;
	process.env.NODE_ENV !== "production" && a && i && B(X(Y.COMPONENT_NAME_LEGACY_COMPATIBLE, { name: ni.name })), a && ([i ? "i18n" : ni.name, "I18nT"].forEach((t) => e.component(t, ni)), [ai.name, "I18nN"].forEach((t) => e.component(t, ai)), [oi.name, "I18nD"].forEach((t) => e.component(t, oi))), e.directive("t", ci(t));
}
var fi = {
	"vue-devtools-plugin-vue-i18n": "Vue I18n devtools",
	"vue-i18n-resource-inspector": "I18n Resources",
	"vue-i18n-timeline": "Vue I18n"
}, pi = { "vue-i18n-resource-inspector": "Search for scopes ..." }, mi = { "vue-i18n-timeline": 16764185 }, hi = "vue-i18n: composer properties", gi;
async function _i(e, t) {
	return new Promise((n, r) => {
		try {
			Tr({
				id: "vue-devtools-plugin-vue-i18n",
				label: fi["vue-devtools-plugin-vue-i18n"],
				packageName: "vue-i18n",
				homepage: "https://vue-i18n.intlify.dev",
				logo: "https://vue-i18n.intlify.dev/vue-i18n-devtools-logo.png",
				componentStateTypes: [hi],
				app: e
			}, (r) => {
				gi = r, r.on.visitComponentTree(({ componentInstance: e, treeNode: n }) => {
					yi(e, n, t);
				}), r.on.inspectComponent(({ componentInstance: e, instanceData: n }) => {
					e.vnode.el && e.vnode.el.__VUE_I18N__ && n && (t.mode === "legacy" ? e.vnode.el.__VUE_I18N__ !== t.global.__composer && bi(n, e.vnode.el.__VUE_I18N__) : bi(n, e.vnode.el.__VUE_I18N__));
				}), r.addInspector({
					id: "vue-i18n-resource-inspector",
					label: fi["vue-i18n-resource-inspector"],
					icon: "language",
					treeFilterPlaceholder: pi["vue-i18n-resource-inspector"]
				}), r.on.getInspectorTree((n) => {
					n.app === e && n.inspectorId === "vue-i18n-resource-inspector" && Ei(n, t);
				});
				let i = /* @__PURE__ */ new Map();
				r.on.getInspectorState(async (n) => {
					if (n.app === e && n.inspectorId === "vue-i18n-resource-inspector") if (r.unhighlightElement(), ki(n, t), n.nodeId === "global") {
						if (!i.has(n.app)) {
							let [e] = await r.getComponentInstances(n.app);
							i.set(n.app, e);
						}
						r.highlightElement(i.get(n.app));
					} else {
						let e = Di(n.nodeId, t);
						e && r.highlightElement(e);
					}
				}), r.on.editInspectorState((n) => {
					n.app === e && n.inspectorId === "vue-i18n-resource-inspector" && Mi(n, t);
				}), r.addTimelineLayer({
					id: "vue-i18n-timeline",
					label: fi["vue-i18n-timeline"],
					color: mi["vue-i18n-timeline"]
				}), n(!0);
			});
		} catch (e) {
			console.error(e), r(!1);
		}
	});
}
function vi(e) {
	return e.type.name || e.type.displayName || e.type.__file || "Anonymous";
}
function yi(e, t, n) {
	let r = n.mode === "composition" ? n.global : n.global.__composer;
	if (e && e.vnode.el && e.vnode.el.__VUE_I18N__ && e.vnode.el.__VUE_I18N__ !== r) {
		let n = {
			label: `i18n (${vi(e)} Scope)`,
			textColor: 0,
			backgroundColor: 16764185
		};
		t.tags.push(n);
	}
}
function bi(e, t) {
	let n = hi;
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
		value: xi(t.messages.value)
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
function xi(e) {
	let t = {};
	return Object.keys(e).forEach((n) => {
		let r = e[n];
		F(r) && "source" in r ? t[n] = Ti(r) : G(r) && r.loc && r.loc.source ? t[n] = r.loc.source : R(r) ? t[n] = xi(r) : t[n] = r;
	}), t;
}
var Si = {
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"&": "&amp;"
};
function Ci(e) {
	return e.replace(/[<>"&]/g, wi);
}
function wi(e) {
	return Si[e] || e;
}
function Ti(e) {
	return { _custom: {
		type: "function",
		display: `<span>ƒ</span> ${e.source ? `("${Ci(e.source)}")` : "(?)"}`
	} };
}
function Ei(e, t) {
	e.rootNodes.push({
		id: "global",
		label: "Global Scope"
	});
	let n = t.mode === "composition" ? t.global : t.global.__composer;
	for (let [r, i] of t.__instances) {
		let a = t.mode === "composition" ? i : i.__composer;
		n !== a && e.rootNodes.push({
			id: a.id.toString(),
			label: `${vi(r)} Scope`
		});
	}
}
function Di(e, t) {
	let n = null;
	if (e !== "global") {
		for (let [r, i] of t.__instances.entries()) if (i.id.toString() === e) {
			n = r;
			break;
		}
	}
	return n;
}
function Oi(e, t) {
	if (e === "global") return t.mode === "composition" ? t.global : t.global.__composer;
	{
		let n = Array.from(t.__instances.values()).find((t) => t.id.toString() === e);
		return n ? t.mode === "composition" ? n : n.__composer : null;
	}
}
function ki(e, t) {
	let n = Oi(e.nodeId, t);
	return n && (e.state = Ai(n)), null;
}
function Ai(e) {
	let t = {}, n = "Locale related info";
	t[n] = [
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
	let r = "Locale messages info";
	t[r] = [{
		type: r,
		key: "messages",
		editable: !1,
		value: xi(e.messages.value)
	}];
	{
		let n = "Datetime formats info";
		t[n] = [{
			type: n,
			key: "datetimeFormats",
			editable: !1,
			value: e.datetimeFormats.value
		}];
		let r = "Datetime formats info";
		t[r] = [{
			type: r,
			key: "numberFormats",
			editable: !1,
			value: e.numberFormats.value
		}];
	}
	return t;
}
function ji(e, t) {
	if (gi) {
		let n;
		t && "groupId" in t && (n = t.groupId, delete t.groupId), gi.addTimelineEvent({
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
function Mi(e, t) {
	let n = Oi(e.nodeId, t);
	if (n) {
		let [t] = e.path;
		t === "locale" && I(e.state.value) ? n.locale.value = e.state.value : t === "fallbackLocale" && (I(e.state.value) || P(e.state.value) || R(e.state.value)) ? n.fallbackLocale.value = e.state.value : t === "inheritLocale" && L(e.state.value) && (n.inheritLocale = e.state.value);
	}
}
function Ni(e, t, n) {
	return {
		beforeCreate() {
			let r = h();
			/* istanbul ignore if */
			if (!r) throw $(Q.UNEXPECTED_ERROR);
			let i = this.$options;
			if (i.i18n) {
				let r = i.i18n;
				if (i.__i18n && (r.__i18n = i.__i18n), r.__root = t, this === this.$root) this.$i18n = Pi(e, r);
				else {
					r.__injectWithOption = !0, r.__extender = n.__vueI18nExtend, this.$i18n = Qr(r);
					let e = this.$i18n;
					e.__extender && (e.__disposer = e.__extender(this.$i18n));
				}
			} else if (i.__i18n) if (this === this.$root) this.$i18n = Pi(e, i);
			else {
				this.$i18n = Qr({
					__i18n: i.__i18n,
					__injectWithOption: !0,
					__extender: n.__vueI18nExtend,
					__root: t
				});
				let e = this.$i18n;
				e.__extender && (e.__disposer = e.__extender(this.$i18n));
			}
			else this.$i18n = e;
			i.__i18nGlobal && Wr(t, i, i), this.$t = (...e) => this.$i18n.t(...e), this.$rt = (...e) => this.$i18n.rt(...e), this.$tc = (...e) => this.$i18n.tc(...e), this.$te = (e, t) => this.$i18n.te(e, t), this.$d = (...e) => this.$i18n.d(...e), this.$n = (...e) => this.$i18n.n(...e), this.$tm = (e) => this.$i18n.tm(e), n.__setInstance(r, this.$i18n);
		},
		mounted() {
			/* istanbul ignore if */
			if (process.env.NODE_ENV !== "production" && this.$el && this.$i18n) {
				let e = this.$i18n;
				this.$el.__VUE_I18N__ = e.__composer;
				let t = this.__v_emitter = fe();
				e.__enableEmitter && e.__enableEmitter(t), t.on("*", ji);
			}
		},
		unmounted() {
			let e = h();
			/* istanbul ignore if */
			if (!e) throw $(Q.UNEXPECTED_ERROR);
			let t = this.$i18n;
			process.env.NODE_ENV !== "production" && this.$el && this.$el.__VUE_I18N__ && (this.__v_emitter && (this.__v_emitter.off("*", ji), delete this.__v_emitter), this.$i18n && (t.__disableEmitter && t.__disableEmitter(), delete this.$el.__VUE_I18N__)), delete this.$t, delete this.$rt, delete this.$tc, delete this.$te, delete this.$d, delete this.$n, delete this.$tm, t.__disposer && (t.__disposer(), delete t.__disposer, delete t.__extender), n.__deleteInstance(e), delete this.$i18n;
		}
	};
}
function Pi(e, t) {
	e.locale = t.locale || e.locale, e.fallbackLocale = t.fallbackLocale || e.fallbackLocale, e.missing = t.missing || e.missing, e.silentTranslationWarn = t.silentTranslationWarn || e.silentFallbackWarn, e.silentFallbackWarn = t.silentFallbackWarn || e.silentFallbackWarn, e.formatFallbackMessages = t.formatFallbackMessages || e.formatFallbackMessages, e.postTranslation = t.postTranslation || e.postTranslation, e.warnHtmlInMessage = t.warnHtmlInMessage || e.warnHtmlInMessage, e.escapeParameterHtml = t.escapeParameterHtml || e.escapeParameterHtml, e.sync = t.sync || e.sync, e.__composer[Rr](t.pluralizationRules || e.pluralizationRules);
	let n = Hr(e.locale, {
		messages: t.messages,
		__i18n: t.__i18n
	});
	return Object.keys(n).forEach((t) => e.mergeLocaleMessage(t, n[t])), t.datetimeFormats && Object.keys(t.datetimeFormats).forEach((n) => e.mergeDateTimeFormat(n, t.datetimeFormats[n])), t.numberFormats && Object.keys(t.numberFormats).forEach((n) => e.mergeNumberFormat(n, t.numberFormats[n])), e;
}
var Fi = /* @__PURE__ */ x("global-vue-i18n");
function Ii(e = {}, t) {
	let n = __VUE_I18N_LEGACY_API__ && L(e.legacy) ? e.legacy : __VUE_I18N_LEGACY_API__, r = L(e.globalInjection) ? e.globalInjection : !0, i = __VUE_I18N_LEGACY_API__ && n ? !!e.allowComposition : !0, a = /* @__PURE__ */ new Map(), [o, s] = Ri(e, n), c = /* @__PURE__ */ x(process.env.NODE_ENV === "production" ? "" : "vue-i18n");
	process.env.NODE_ENV !== "production" && n && i && B(X(Y.NOTICE_DROP_ALLOW_COMPOSITION));
	function l(e) {
		return a.get(e) || null;
	}
	function u(e, t) {
		a.set(e, t);
	}
	function d(e) {
		a.delete(e);
	}
	{
		let e = {
			get mode() {
				return __VUE_I18N_LEGACY_API__ && n ? "legacy" : "composition";
			},
			get allowComposition() {
				return i;
			},
			async install(t, ...i) {
				if (process.env.NODE_ENV !== "production" && (t.__VUE_I18N__ = e), t.__VUE_I18N_SYMBOL__ = c, t.provide(t.__VUE_I18N_SYMBOL__, e), z(i[0])) {
					let t = i[0];
					e.__composerExtend = t.__composerExtend, e.__vueI18nExtend = t.__vueI18nExtend;
				}
				let a = null;
				!n && r && (a = Ji(t, e.global)), __VUE_I18N_FULL_INSTALL__ && di(t, e, ...i), __VUE_I18N_LEGACY_API__ && n && t.mixin(Ni(s, s.__composer, e));
				let o = t.unmount;
				if (t.unmount = () => {
					a && a(), e.dispose(), o();
				}, process.env.NODE_ENV !== "production") {
					if (!await _i(t, e)) throw $(Q.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN);
					let r = fe();
					if (n) {
						let e = s;
						e.__enableEmitter && e.__enableEmitter(r);
					} else {
						let e = s;
						e[Ir] && e[Ir](r);
					}
					r.on("*", ji);
				}
			},
			get global() {
				return s;
			},
			dispose() {
				o.stop();
			},
			__instances: a,
			__getInstance: l,
			__setInstance: u,
			__deleteInstance: d
		};
		return e;
	}
}
function Li(e = {}) {
	let t = h();
	if (t == null) throw $(Q.MUST_BE_CALL_SETUP_TOP);
	if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__) throw $(Q.NOT_INSTALLED);
	let n = zi(t), r = Vi(n), i = Ur(t), a = Bi(e, i);
	if (__VUE_I18N_LEGACY_API__ && n.mode === "legacy" && !e.__useComponent) {
		if (!n.allowComposition) throw $(Q.NOT_AVAILABLE_IN_LEGACY_MODE);
		return Gi(t, a, r, e);
	}
	if (a === "global") return Wr(r, e, i), r;
	if (a === "parent") {
		let i = Hi(n, t, e.__useComponent);
		return i ??= (process.env.NODE_ENV !== "production" && B(X(Y.NOT_FOUND_PARENT_SCOPE)), r), i;
	}
	let o = n, s = o.__getInstance(t);
	if (s == null) {
		let n = D({}, e);
		"__i18n" in i && (n.__i18n = i.__i18n), r && (n.__root = r), s = Xr(n), o.__composerExtend && (s[Br] = o.__composerExtend(s)), Wi(o, t, s), o.__setInstance(t, s);
	}
	return s;
}
function Ri(e, t, n) {
	let i = r();
	{
		let n = __VUE_I18N_LEGACY_API__ && t ? i.run(() => Qr(e)) : i.run(() => Xr(e));
		if (n == null) throw $(Q.UNEXPECTED_ERROR);
		return [i, n];
	}
}
function zi(e) {
	{
		let t = m(e.isCE ? Fi : e.appContext.app.__VUE_I18N_SYMBOL__);
		/* istanbul ignore if */
		if (!t) throw $(e.isCE ? Q.NOT_INSTALLED_WITH_PROVIDE : Q.UNEXPECTED_ERROR);
		return t;
	}
}
function Bi(e, t) {
	return E(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
}
function Vi(e) {
	return e.mode === "composition" ? e.global : e.global.__composer;
}
function Hi(e, t, n = !1) {
	let r = null, i = t.root, a = Ui(t, n);
	for (; a != null;) {
		let t = e;
		if (e.mode === "composition") r = t.__getInstance(a);
		else if (__VUE_I18N_LEGACY_API__) {
			let e = t.__getInstance(a);
			e != null && (r = e.__composer, n && r && !r[zr] && (r = null));
		}
		if (r != null || i === a) break;
		a = a.parent;
	}
	return r;
}
function Ui(e, t = !1) {
	return e == null ? null : t && e.vnode.ctx || e.parent;
}
function Wi(e, t, n) {
	let r = null;
	p(() => {
		if (process.env.NODE_ENV !== "production" && t.vnode.el) {
			t.vnode.el.__VUE_I18N__ = n, r = fe();
			let e = n;
			e[Ir] && e[Ir](r), r.on("*", ji);
		}
	}, t), a(() => {
		let i = n;
		process.env.NODE_ENV !== "production" && t.vnode.el && t.vnode.el.__VUE_I18N__ && (r && r.off("*", ji), i[Lr] && i[Lr](), delete t.vnode.el.__VUE_I18N__), e.__deleteInstance(t);
		let a = i[Br];
		a && (a(), delete i[Br]);
	}, t);
}
function Gi(r, i, a, o = {}) {
	let s = i === "local", l = n(null);
	if (s && r.proxy && !(r.proxy.$options.i18n || r.proxy.$options.__i18n)) throw $(Q.MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION);
	let u = L(o.inheritLocale) ? o.inheritLocale : !I(o.locale), d = t(!s || u ? a.locale.value : I(o.locale) ? o.locale : mn), f = t(!s || u ? a.fallbackLocale.value : I(o.fallbackLocale) || P(o.fallbackLocale) || z(o.fallbackLocale) || o.fallbackLocale === !1 ? o.fallbackLocale : d.value), p = t(Hr(d.value, o)), m = t(z(o.datetimeFormats) ? o.datetimeFormats : { [d.value]: {} }), h = t(z(o.numberFormats) ? o.numberFormats : { [d.value]: {} }), g = s ? a.missingWarn : L(o.missingWarn) || T(o.missingWarn) ? o.missingWarn : !0, _ = s ? a.fallbackWarn : L(o.fallbackWarn) || T(o.fallbackWarn) ? o.fallbackWarn : !0, v = s ? a.fallbackRoot : L(o.fallbackRoot) ? o.fallbackRoot : !0, y = !!o.fallbackFormat, b = F(o.missing) ? o.missing : null, x = F(o.postTranslation) ? o.postTranslation : null, S = s ? a.warnHtmlMessage : L(o.warnHtmlMessage) ? o.warnHtmlMessage : !0, C = !!o.escapeParameter, w = s ? a.modifiers : z(o.modifiers) ? o.modifiers : {}, ee = o.pluralRules || s && a.pluralRules;
	function E() {
		return [
			d.value,
			f.value,
			p.value,
			m.value,
			h.value
		];
	}
	let D = c({
		get: () => l.value ? l.value.locale.value : d.value,
		set: (e) => {
			l.value && (l.value.locale.value = e), d.value = e;
		}
	}), O = c({
		get: () => l.value ? l.value.fallbackLocale.value : f.value,
		set: (e) => {
			l.value && (l.value.fallbackLocale.value = e), f.value = e;
		}
	}), k = c(() => l.value ? l.value.messages.value : p.value), A = c(() => m.value), j = c(() => h.value);
	function M() {
		return l.value ? l.value.getPostTranslationHandler() : x;
	}
	function te(e) {
		l.value && l.value.setPostTranslationHandler(e);
	}
	function N() {
		return l.value ? l.value.getMissingHandler() : b;
	}
	function R(e) {
		l.value && l.value.setMissingHandler(e);
	}
	function ne(e) {
		return E(), e();
	}
	function re(...e) {
		return l.value ? ne(() => Reflect.apply(l.value.t, null, [...e])) : ne(() => "");
	}
	function ie(...e) {
		return l.value ? Reflect.apply(l.value.rt, null, [...e]) : "";
	}
	function ae(...e) {
		return l.value ? ne(() => Reflect.apply(l.value.d, null, [...e])) : ne(() => "");
	}
	function oe(...e) {
		return l.value ? ne(() => Reflect.apply(l.value.n, null, [...e])) : ne(() => "");
	}
	function se(e) {
		return l.value ? l.value.tm(e) : {};
	}
	function ce(e, t) {
		return l.value ? l.value.te(e, t) : !1;
	}
	function le(e) {
		return l.value ? l.value.getLocaleMessage(e) : {};
	}
	function B(e, t) {
		l.value && (l.value.setLocaleMessage(e, t), p.value[e] = t);
	}
	function ue(e, t) {
		l.value && l.value.mergeLocaleMessage(e, t);
	}
	function de(e) {
		return l.value ? l.value.getDateTimeFormat(e) : {};
	}
	function fe(e, t) {
		l.value && (l.value.setDateTimeFormat(e, t), m.value[e] = t);
	}
	function V(e, t) {
		l.value && l.value.mergeDateTimeFormat(e, t);
	}
	function pe(e) {
		return l.value ? l.value.getNumberFormat(e) : {};
	}
	function me(e, t) {
		l.value && (l.value.setNumberFormat(e, t), h.value[e] = t);
	}
	function he(e, t) {
		l.value && l.value.mergeNumberFormat(e, t);
	}
	let ge = {
		get id() {
			return l.value ? l.value.id : -1;
		},
		locale: D,
		fallbackLocale: O,
		messages: k,
		datetimeFormats: A,
		numberFormats: j,
		get inheritLocale() {
			return l.value ? l.value.inheritLocale : u;
		},
		set inheritLocale(e) {
			l.value && (l.value.inheritLocale = e);
		},
		get availableLocales() {
			return l.value ? l.value.availableLocales : Object.keys(p.value);
		},
		get modifiers() {
			return l.value ? l.value.modifiers : w;
		},
		get pluralRules() {
			return l.value ? l.value.pluralRules : ee;
		},
		get isGlobal() {
			return l.value ? l.value.isGlobal : !1;
		},
		get missingWarn() {
			return l.value ? l.value.missingWarn : g;
		},
		set missingWarn(e) {
			l.value && (l.value.missingWarn = e);
		},
		get fallbackWarn() {
			return l.value ? l.value.fallbackWarn : _;
		},
		set fallbackWarn(e) {
			l.value && (l.value.missingWarn = e);
		},
		get fallbackRoot() {
			return l.value ? l.value.fallbackRoot : v;
		},
		set fallbackRoot(e) {
			l.value && (l.value.fallbackRoot = e);
		},
		get fallbackFormat() {
			return l.value ? l.value.fallbackFormat : y;
		},
		set fallbackFormat(e) {
			l.value && (l.value.fallbackFormat = e);
		},
		get warnHtmlMessage() {
			return l.value ? l.value.warnHtmlMessage : S;
		},
		set warnHtmlMessage(e) {
			l.value && (l.value.warnHtmlMessage = e);
		},
		get escapeParameter() {
			return l.value ? l.value.escapeParameter : C;
		},
		set escapeParameter(e) {
			l.value && (l.value.escapeParameter = e);
		},
		t: re,
		getPostTranslationHandler: M,
		setPostTranslationHandler: te,
		getMissingHandler: N,
		setMissingHandler: R,
		rt: ie,
		d: ae,
		n: oe,
		tm: se,
		te: ce,
		getLocaleMessage: le,
		setLocaleMessage: B,
		mergeLocaleMessage: ue,
		getDateTimeFormat: de,
		setDateTimeFormat: fe,
		mergeDateTimeFormat: V,
		getNumberFormat: pe,
		setNumberFormat: me,
		mergeNumberFormat: he
	};
	function _e(e) {
		e.locale.value = d.value, e.fallbackLocale.value = f.value, Object.keys(p.value).forEach((t) => {
			e.mergeLocaleMessage(t, p.value[t]);
		}), Object.keys(m.value).forEach((t) => {
			e.mergeDateTimeFormat(t, m.value[t]);
		}), Object.keys(h.value).forEach((t) => {
			e.mergeNumberFormat(t, h.value[t]);
		}), e.escapeParameter = C, e.fallbackFormat = y, e.fallbackRoot = v, e.fallbackWarn = _, e.missingWarn = g, e.warnHtmlMessage = S;
	}
	return e(() => {
		if (r.proxy == null || r.proxy.$i18n == null) throw $(Q.NOT_AVAILABLE_COMPOSITION_IN_LEGACY);
		let e = l.value = r.proxy.$i18n.__composer;
		i === "global" ? (d.value = e.locale.value, f.value = e.fallbackLocale.value, p.value = e.messages.value, m.value = e.datetimeFormats.value, h.value = e.numberFormats.value) : s && _e(e);
	}), ge;
}
var Ki = [
	"locale",
	"fallbackLocale",
	"availableLocales"
], qi = [
	"t",
	"rt",
	"d",
	"n",
	"tm",
	"te"
];
function Ji(e, t) {
	let n = Object.create(null);
	return Ki.forEach((e) => {
		let r = Object.getOwnPropertyDescriptor(t, e);
		if (!r) throw $(Q.UNEXPECTED_ERROR);
		let a = i(r.value) ? {
			get() {
				return r.value.value;
			},
			set(e) {
				r.value.value = e;
			}
		} : { get() {
			return r.get && r.get();
		} };
		Object.defineProperty(n, e, a);
	}), e.config.globalProperties.$i18n = n, qi.forEach((n) => {
		let r = Object.getOwnPropertyDescriptor(t, n);
		if (!r || !r.value) throw $(Q.UNEXPECTED_ERROR);
		Object.defineProperty(e.config.globalProperties, `$${n}`, r);
	}), () => {
		delete e.config.globalProperties.$i18n, qi.forEach((t) => {
			delete e.config.globalProperties[`$${t}`];
		});
	};
}
if (Dr(), __INTLIFY_JIT_COMPILATION__ ? vn(Jn) : vn(qn), bn(Ft), Sn(ln), process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
	let e = j();
	e.__INTLIFY__ = !0, Kt(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
process.env.NODE_ENV;
//#endregion
export { Li as n, Ii as t };
