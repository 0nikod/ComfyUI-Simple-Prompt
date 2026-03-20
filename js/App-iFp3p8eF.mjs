import { A as e, B as t, D as n, E as r, F as i, I as a, L as o, O as s, P as c, R as l, S as u, T as d, _ as f, a as p, b as m, c as h, d as g, f as _, g as v, h as y, i as b, j as x, k as S, l as C, m as w, n as T, o as E, p as D, r as O, s as k, v as A, w as j, z as M } from "./vue.runtime.esm-bundler-DCog0BBo.mjs";
import { n as N } from "./vue-i18n-BzRCVqyv.mjs";
//#region node_modules/.pnpm/@iconify+vue@5.0.0_vue@3.5.30/node_modules/@iconify/vue/dist/iconify.mjs
var P = /^[a-z0-9]+(-[a-z0-9]+)*$/, F = (e, t, n, r = "") => {
	let i = e.split(":");
	if (e.slice(0, 1) === "@") {
		if (i.length < 2 || i.length > 3) return null;
		r = i.shift().slice(1);
	}
	if (i.length > 3 || !i.length) return null;
	if (i.length > 1) {
		let e = i.pop(), n = i.pop(), a = {
			provider: i.length > 0 ? i[0] : r,
			prefix: n,
			name: e
		};
		return t && !I(a) ? null : a;
	}
	let a = i[0], o = a.split("-");
	if (o.length > 1) {
		let e = {
			provider: r,
			prefix: o.shift(),
			name: o.join("-")
		};
		return t && !I(e) ? null : e;
	}
	if (n && r === "") {
		let e = {
			provider: r,
			prefix: "",
			name: a
		};
		return t && !I(e, n) ? null : e;
	}
	return null;
}, I = (e, t) => e ? !!((t && e.prefix === "" || e.prefix) && e.name) : !1, L = Object.freeze({
	left: 0,
	top: 0,
	width: 16,
	height: 16
}), R = Object.freeze({
	rotate: 0,
	vFlip: !1,
	hFlip: !1
}), z = Object.freeze({
	...L,
	...R
}), B = Object.freeze({
	...z,
	body: "",
	hidden: !1
});
function V(e, t) {
	let n = {};
	!e.hFlip != !t.hFlip && (n.hFlip = !0), !e.vFlip != !t.vFlip && (n.vFlip = !0);
	let r = ((e.rotate || 0) + (t.rotate || 0)) % 4;
	return r && (n.rotate = r), n;
}
function H(e, t) {
	let n = V(e, t);
	for (let r in B) r in R ? r in e && !(r in n) && (n[r] = R[r]) : r in t ? n[r] = t[r] : r in e && (n[r] = e[r]);
	return n;
}
function U(e, t) {
	let n = e.icons, r = e.aliases || /* @__PURE__ */ Object.create(null), i = /* @__PURE__ */ Object.create(null);
	function a(e) {
		if (n[e]) return i[e] = [];
		if (!(e in i)) {
			i[e] = null;
			let t = r[e] && r[e].parent, n = t && a(t);
			n && (i[e] = [t].concat(n));
		}
		return i[e];
	}
	return Object.keys(n).concat(Object.keys(r)).forEach(a), i;
}
function W(e, t, n) {
	let r = e.icons, i = e.aliases || /* @__PURE__ */ Object.create(null), a = {};
	function o(e) {
		a = H(r[e] || i[e], a);
	}
	return o(t), n.forEach(o), H(e, a);
}
function G(e, t) {
	let n = [];
	if (typeof e != "object" || typeof e.icons != "object") return n;
	e.not_found instanceof Array && e.not_found.forEach((e) => {
		t(e, null), n.push(e);
	});
	let r = U(e);
	for (let i in r) {
		let a = r[i];
		a && (t(i, W(e, i, a)), n.push(i));
	}
	return n;
}
var ee = {
	provider: "",
	aliases: {},
	not_found: {},
	...L
};
function K(e, t) {
	for (let n in t) if (n in e && typeof e[n] != typeof t[n]) return !1;
	return !0;
}
function te(e) {
	if (typeof e != "object" || !e) return null;
	let t = e;
	if (typeof t.prefix != "string" || !e.icons || typeof e.icons != "object" || !K(e, ee)) return null;
	let n = t.icons;
	for (let e in n) {
		let t = n[e];
		if (!e || typeof t.body != "string" || !K(t, B)) return null;
	}
	let r = t.aliases || /* @__PURE__ */ Object.create(null);
	for (let e in r) {
		let t = r[e], i = t.parent;
		if (!e || typeof i != "string" || !n[i] && !r[i] || !K(t, B)) return null;
	}
	return t;
}
var ne = /* @__PURE__ */ Object.create(null);
function re(e, t) {
	return {
		provider: e,
		prefix: t,
		icons: /* @__PURE__ */ Object.create(null),
		missing: /* @__PURE__ */ new Set()
	};
}
function ie(e, t) {
	let n = ne[e] || (ne[e] = /* @__PURE__ */ Object.create(null));
	return n[t] || (n[t] = re(e, t));
}
function ae(e, t) {
	return te(t) ? G(t, (t, n) => {
		n ? e.icons[t] = n : e.missing.add(t);
	}) : [];
}
function oe(e, t, n) {
	try {
		if (typeof n.body == "string") return e.icons[t] = { ...n }, !0;
	} catch {}
	return !1;
}
var se = !1;
function ce(e) {
	return typeof e == "boolean" && (se = e), se;
}
function le(e) {
	let t = typeof e == "string" ? F(e, !0, se) : e;
	if (t) {
		let e = ie(t.provider, t.prefix), n = t.name;
		return e.icons[n] || (e.missing.has(n) ? null : void 0);
	}
}
function ue(e, t) {
	let n = F(e, !0, se);
	if (!n) return !1;
	let r = ie(n.provider, n.prefix);
	return t ? oe(r, n.name, t) : (r.missing.add(n.name), !0);
}
function de(e, t) {
	if (typeof e != "object") return !1;
	if (typeof t != "string" && (t = e.provider || ""), se && !t && !e.prefix) {
		let t = !1;
		return te(e) && (e.prefix = "", G(e, (e, n) => {
			ue(e, n) && (t = !0);
		})), t;
	}
	let n = e.prefix;
	return I({
		prefix: n,
		name: "a"
	}) ? !!ae(ie(t, n), e) : !1;
}
var fe = Object.freeze({
	width: null,
	height: null
}), pe = Object.freeze({
	...fe,
	...R
}), me = /(-?[0-9.]*[0-9]+[0-9.]*)/g, he = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function ge(e, t, n) {
	if (t === 1) return e;
	if (n ||= 100, typeof e == "number") return Math.ceil(e * t * n) / n;
	if (typeof e != "string") return e;
	let r = e.split(me);
	if (r === null || !r.length) return e;
	let i = [], a = r.shift(), o = he.test(a);
	for (;;) {
		if (o) {
			let e = parseFloat(a);
			isNaN(e) ? i.push(a) : i.push(Math.ceil(e * t * n) / n);
		} else i.push(a);
		if (a = r.shift(), a === void 0) return i.join("");
		o = !o;
	}
}
function _e(e, t = "defs") {
	let n = "", r = e.indexOf("<" + t);
	for (; r >= 0;) {
		let i = e.indexOf(">", r), a = e.indexOf("</" + t);
		if (i === -1 || a === -1) break;
		let o = e.indexOf(">", a);
		if (o === -1) break;
		n += e.slice(i + 1, a).trim(), e = e.slice(0, r).trim() + e.slice(o + 1);
	}
	return {
		defs: n,
		content: e
	};
}
function ve(e, t) {
	return e ? "<defs>" + e + "</defs>" + t : t;
}
function ye(e, t, n) {
	let r = _e(e);
	return ve(r.defs, t + r.content + n);
}
var be = (e) => e === "unset" || e === "undefined" || e === "none";
function xe(e, t) {
	let n = {
		...z,
		...e
	}, r = {
		...pe,
		...t
	}, i = {
		left: n.left,
		top: n.top,
		width: n.width,
		height: n.height
	}, a = n.body;
	[n, r].forEach((e) => {
		let t = [], n = e.hFlip, r = e.vFlip, o = e.rotate;
		n ? r ? o += 2 : (t.push("translate(" + (i.width + i.left).toString() + " " + (0 - i.top).toString() + ")"), t.push("scale(-1 1)"), i.top = i.left = 0) : r && (t.push("translate(" + (0 - i.left).toString() + " " + (i.height + i.top).toString() + ")"), t.push("scale(1 -1)"), i.top = i.left = 0);
		let s;
		switch (o < 0 && (o -= Math.floor(o / 4) * 4), o %= 4, o) {
			case 1:
				s = i.height / 2 + i.top, t.unshift("rotate(90 " + s.toString() + " " + s.toString() + ")");
				break;
			case 2:
				t.unshift("rotate(180 " + (i.width / 2 + i.left).toString() + " " + (i.height / 2 + i.top).toString() + ")");
				break;
			case 3:
				s = i.width / 2 + i.left, t.unshift("rotate(-90 " + s.toString() + " " + s.toString() + ")");
				break;
		}
		o % 2 == 1 && (i.left !== i.top && (s = i.left, i.left = i.top, i.top = s), i.width !== i.height && (s = i.width, i.width = i.height, i.height = s)), t.length && (a = ye(a, "<g transform=\"" + t.join(" ") + "\">", "</g>"));
	});
	let o = r.width, s = r.height, c = i.width, l = i.height, u, d;
	o === null ? (d = s === null ? "1em" : s === "auto" ? l : s, u = ge(d, c / l)) : (u = o === "auto" ? c : o, d = s === null ? ge(u, l / c) : s === "auto" ? l : s);
	let f = {}, p = (e, t) => {
		be(t) || (f[e] = t.toString());
	};
	p("width", u), p("height", d);
	let m = [
		i.left,
		i.top,
		c,
		l
	];
	return f.viewBox = m.join(" "), {
		attributes: f,
		viewBox: m,
		body: a
	};
}
var Se = /\sid="(\S+)"/g, Ce = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16), we = 0;
function Te(e, t = Ce) {
	let n = [], r;
	for (; r = Se.exec(e);) n.push(r[1]);
	if (!n.length) return e;
	let i = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
	return n.forEach((n) => {
		let r = typeof t == "function" ? t(n) : t + (we++).toString(), a = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		e = e.replace(RegExp("([#;\"])(" + a + ")([\")]|\\.[a-z])", "g"), "$1" + r + i + "$3");
	}), e = e.replace(new RegExp(i, "g"), ""), e;
}
var Ee = /* @__PURE__ */ Object.create(null);
function De(e, t) {
	Ee[e] = t;
}
function Oe(e) {
	return Ee[e] || Ee[""];
}
function ke(e) {
	let t;
	if (typeof e.resources == "string") t = [e.resources];
	else if (t = e.resources, !(t instanceof Array) || !t.length) return null;
	return {
		resources: t,
		path: e.path || "/",
		maxURL: e.maxURL || 500,
		rotate: e.rotate || 750,
		timeout: e.timeout || 5e3,
		random: e.random === !0,
		index: e.index || 0,
		dataAfterTimeout: e.dataAfterTimeout !== !1
	};
}
for (var Ae = /* @__PURE__ */ Object.create(null), je = ["https://api.simplesvg.com", "https://api.unisvg.com"], Me = []; je.length > 0;) je.length === 1 || Math.random() > .5 ? Me.push(je.shift()) : Me.push(je.pop());
Ae[""] = ke({ resources: ["https://api.iconify.design"].concat(Me) });
function Ne(e, t) {
	let n = ke(t);
	return n === null ? !1 : (Ae[e] = n, !0);
}
function Pe(e) {
	return Ae[e];
}
var Fe = (() => {
	let e;
	try {
		if (e = fetch, typeof e == "function") return e;
	} catch {}
})();
function Ie(e, t) {
	let n = Pe(e);
	if (!n) return 0;
	let r;
	if (!n.maxURL) r = 0;
	else {
		let e = 0;
		n.resources.forEach((t) => {
			e = Math.max(e, t.length);
		});
		let i = t + ".json?icons=";
		r = n.maxURL - e - n.path.length - i.length;
	}
	return r;
}
function Le(e) {
	return e === 404;
}
var Re = (e, t, n) => {
	let r = [], i = Ie(e, t), a = "icons", o = {
		type: a,
		provider: e,
		prefix: t,
		icons: []
	}, s = 0;
	return n.forEach((n, c) => {
		s += n.length + 1, s >= i && c > 0 && (r.push(o), o = {
			type: a,
			provider: e,
			prefix: t,
			icons: []
		}, s = n.length), o.icons.push(n);
	}), r.push(o), r;
};
function ze(e) {
	if (typeof e == "string") {
		let t = Pe(e);
		if (t) return t.path;
	}
	return "/";
}
var Be = {
	prepare: Re,
	send: (e, t, n) => {
		if (!Fe) {
			n("abort", 424);
			return;
		}
		let r = ze(t.provider);
		switch (t.type) {
			case "icons": {
				let e = t.prefix, n = t.icons.join(","), i = new URLSearchParams({ icons: n });
				r += e + ".json?" + i.toString();
				break;
			}
			case "custom": {
				let e = t.uri;
				r += e.slice(0, 1) === "/" ? e.slice(1) : e;
				break;
			}
			default:
				n("abort", 400);
				return;
		}
		let i = 503;
		Fe(e + r).then((e) => {
			let t = e.status;
			if (t !== 200) {
				setTimeout(() => {
					n(Le(t) ? "abort" : "next", t);
				});
				return;
			}
			return i = 501, e.json();
		}).then((e) => {
			if (typeof e != "object" || !e) {
				setTimeout(() => {
					e === 404 ? n("abort", e) : n("next", i);
				});
				return;
			}
			setTimeout(() => {
				n("success", e);
			});
		}).catch(() => {
			n("next", i);
		});
	}
};
function Ve(e) {
	let t = {
		loaded: [],
		missing: [],
		pending: []
	}, n = /* @__PURE__ */ Object.create(null);
	e.sort((e, t) => e.provider === t.provider ? e.prefix === t.prefix ? e.name.localeCompare(t.name) : e.prefix.localeCompare(t.prefix) : e.provider.localeCompare(t.provider));
	let r = {
		provider: "",
		prefix: "",
		name: ""
	};
	return e.forEach((e) => {
		if (r.name === e.name && r.prefix === e.prefix && r.provider === e.provider) return;
		r = e;
		let i = e.provider, a = e.prefix, o = e.name, s = n[i] || (n[i] = /* @__PURE__ */ Object.create(null)), c = s[a] || (s[a] = ie(i, a)), l;
		l = o in c.icons ? t.loaded : a === "" || c.missing.has(o) ? t.missing : t.pending;
		let u = {
			provider: i,
			prefix: a,
			name: o
		};
		l.push(u);
	}), t;
}
function He(e, t) {
	e.forEach((e) => {
		let n = e.loaderCallbacks;
		n && (e.loaderCallbacks = n.filter((e) => e.id !== t));
	});
}
function Ue(e) {
	e.pendingCallbacksFlag || (e.pendingCallbacksFlag = !0, setTimeout(() => {
		e.pendingCallbacksFlag = !1;
		let t = e.loaderCallbacks ? e.loaderCallbacks.slice(0) : [];
		if (!t.length) return;
		let n = !1, r = e.provider, i = e.prefix;
		t.forEach((t) => {
			let a = t.icons, o = a.pending.length;
			a.pending = a.pending.filter((t) => {
				if (t.prefix !== i) return !0;
				let o = t.name;
				if (e.icons[o]) a.loaded.push({
					provider: r,
					prefix: i,
					name: o
				});
				else if (e.missing.has(o)) a.missing.push({
					provider: r,
					prefix: i,
					name: o
				});
				else return n = !0, !0;
				return !1;
			}), a.pending.length !== o && (n || He([e], t.id), t.callback(a.loaded.slice(0), a.missing.slice(0), a.pending.slice(0), t.abort));
		});
	}));
}
var We = 0;
function Ge(e, t, n) {
	let r = We++, i = He.bind(null, n, r);
	if (!t.pending.length) return i;
	let a = {
		id: r,
		icons: t,
		callback: e,
		abort: i
	};
	return n.forEach((e) => {
		(e.loaderCallbacks ||= []).push(a);
	}), i;
}
function Ke(e, t = !0, n = !1) {
	let r = [];
	return e.forEach((e) => {
		let i = typeof e == "string" ? F(e, t, n) : e;
		i && r.push(i);
	}), r;
}
var qe = {
	resources: [],
	index: 0,
	timeout: 2e3,
	rotate: 750,
	random: !1,
	dataAfterTimeout: !1
};
function Je(e, t, n, r) {
	let i = e.resources.length, a = e.random ? Math.floor(Math.random() * i) : e.index, o;
	if (e.random) {
		let t = e.resources.slice(0);
		for (o = []; t.length > 1;) {
			let e = Math.floor(Math.random() * t.length);
			o.push(t[e]), t = t.slice(0, e).concat(t.slice(e + 1));
		}
		o = o.concat(t);
	} else o = e.resources.slice(a).concat(e.resources.slice(0, a));
	let s = Date.now(), c = "pending", l = 0, u, d = null, f = [], p = [];
	typeof r == "function" && p.push(r);
	function m() {
		d &&= (clearTimeout(d), null);
	}
	function h() {
		c === "pending" && (c = "aborted"), m(), f.forEach((e) => {
			e.status === "pending" && (e.status = "aborted");
		}), f = [];
	}
	function g(e, t) {
		t && (p = []), typeof e == "function" && p.push(e);
	}
	function _() {
		return {
			startTime: s,
			payload: t,
			status: c,
			queriesSent: l,
			queriesPending: f.length,
			subscribe: g,
			abort: h
		};
	}
	function v() {
		c = "failed", p.forEach((e) => {
			e(void 0, u);
		});
	}
	function y() {
		f.forEach((e) => {
			e.status === "pending" && (e.status = "aborted");
		}), f = [];
	}
	function b(t, n, r) {
		let i = n !== "success";
		switch (f = f.filter((e) => e !== t), c) {
			case "pending": break;
			case "failed":
				if (i || !e.dataAfterTimeout) return;
				break;
			default: return;
		}
		if (n === "abort") {
			u = r, v();
			return;
		}
		if (i) {
			u = r, f.length || (o.length ? x() : v());
			return;
		}
		if (m(), y(), !e.random) {
			let n = e.resources.indexOf(t.resource);
			n !== -1 && n !== e.index && (e.index = n);
		}
		c = "completed", p.forEach((e) => {
			e(r);
		});
	}
	function x() {
		if (c !== "pending") return;
		m();
		let r = o.shift();
		if (r === void 0) {
			if (f.length) {
				d = setTimeout(() => {
					m(), c === "pending" && (y(), v());
				}, e.timeout);
				return;
			}
			v();
			return;
		}
		let i = {
			status: "pending",
			resource: r,
			callback: (e, t) => {
				b(i, e, t);
			}
		};
		f.push(i), l++, d = setTimeout(x, e.rotate), n(r, t, i.callback);
	}
	return setTimeout(x), _;
}
function Ye(e) {
	let t = {
		...qe,
		...e
	}, n = [];
	function r() {
		n = n.filter((e) => e().status === "pending");
	}
	function i(e, i, a) {
		let o = Je(t, e, i, (e, t) => {
			r(), a && a(e, t);
		});
		return n.push(o), o;
	}
	function a(e) {
		return n.find((t) => e(t)) || null;
	}
	return {
		query: i,
		find: a,
		setIndex: (e) => {
			t.index = e;
		},
		getIndex: () => t.index,
		cleanup: r
	};
}
function Xe() {}
var Ze = /* @__PURE__ */ Object.create(null);
function Qe(e) {
	if (!Ze[e]) {
		let t = Pe(e);
		if (!t) return;
		Ze[e] = {
			config: t,
			redundancy: Ye(t)
		};
	}
	return Ze[e];
}
function $e(e, t, n) {
	let r, i;
	if (typeof e == "string") {
		let t = Oe(e);
		if (!t) return n(void 0, 424), Xe;
		i = t.send;
		let a = Qe(e);
		a && (r = a.redundancy);
	} else {
		let t = ke(e);
		if (t) {
			r = Ye(t);
			let n = Oe(e.resources ? e.resources[0] : "");
			n && (i = n.send);
		}
	}
	return !r || !i ? (n(void 0, 424), Xe) : r.query(t, i, n)().abort;
}
function et() {}
function tt(e) {
	e.iconsLoaderFlag || (e.iconsLoaderFlag = !0, setTimeout(() => {
		e.iconsLoaderFlag = !1, Ue(e);
	}));
}
function nt(e) {
	let t = [], n = [];
	return e.forEach((e) => {
		(e.match(P) ? t : n).push(e);
	}), {
		valid: t,
		invalid: n
	};
}
function rt(e, t, n) {
	function r() {
		let n = e.pendingIcons;
		t.forEach((t) => {
			n && n.delete(t), e.icons[t] || e.missing.add(t);
		});
	}
	if (n && typeof n == "object") try {
		if (!ae(e, n).length) {
			r();
			return;
		}
	} catch (e) {
		console.error(e);
	}
	r(), tt(e);
}
function it(e, t) {
	e instanceof Promise ? e.then((e) => {
		t(e);
	}).catch(() => {
		t(null);
	}) : t(e);
}
function at(e, t) {
	e.iconsToLoad ? e.iconsToLoad = e.iconsToLoad.concat(t).sort() : e.iconsToLoad = t, e.iconsQueueFlag || (e.iconsQueueFlag = !0, setTimeout(() => {
		e.iconsQueueFlag = !1;
		let { provider: t, prefix: n } = e, r = e.iconsToLoad;
		if (delete e.iconsToLoad, !r || !r.length) return;
		let i = e.loadIcon;
		if (e.loadIcons && (r.length > 1 || !i)) {
			it(e.loadIcons(r, n, t), (t) => {
				rt(e, r, t);
			});
			return;
		}
		if (i) {
			r.forEach((r) => {
				it(i(r, n, t), (t) => {
					rt(e, [r], t ? {
						prefix: n,
						icons: { [r]: t }
					} : null);
				});
			});
			return;
		}
		let { valid: a, invalid: o } = nt(r);
		if (o.length && rt(e, o, null), !a.length) return;
		let s = n.match(P) ? Oe(t) : null;
		if (!s) {
			rt(e, a, null);
			return;
		}
		s.prepare(t, n, a).forEach((n) => {
			$e(t, n, (t) => {
				rt(e, n.icons, t);
			});
		});
	}));
}
var ot = (e, t) => {
	let n = Ve(Ke(e, !0, ce()));
	if (!n.pending.length) {
		let e = !0;
		return t && setTimeout(() => {
			e && t(n.loaded, n.missing, n.pending, et);
		}), () => {
			e = !1;
		};
	}
	let r = /* @__PURE__ */ Object.create(null), i = [], a, o;
	return n.pending.forEach((e) => {
		let { provider: t, prefix: n } = e;
		if (n === o && t === a) return;
		a = t, o = n, i.push(ie(t, n));
		let s = r[t] || (r[t] = /* @__PURE__ */ Object.create(null));
		s[n] || (s[n] = []);
	}), n.pending.forEach((e) => {
		let { provider: t, prefix: n, name: i } = e, a = ie(t, n), o = a.pendingIcons ||= /* @__PURE__ */ new Set();
		o.has(i) || (o.add(i), r[t][n].push(i));
	}), i.forEach((e) => {
		let t = r[e.provider][e.prefix];
		t.length && at(e, t);
	}), t ? Ge(t, n, i) : et;
};
function st(e, t) {
	let n = { ...e };
	for (let e in t) {
		let r = t[e], i = typeof r;
		e in fe ? (r === null || r && (i === "string" || i === "number")) && (n[e] = r) : i === typeof n[e] && (n[e] = e === "rotate" ? r % 4 : r);
	}
	return n;
}
var ct = /[\s,]+/;
function lt(e, t) {
	t.split(ct).forEach((t) => {
		switch (t.trim()) {
			case "horizontal":
				e.hFlip = !0;
				break;
			case "vertical":
				e.vFlip = !0;
				break;
		}
	});
}
function ut(e, t = 0) {
	let n = e.replace(/^-?[0-9.]*/, "");
	function r(e) {
		for (; e < 0;) e += 4;
		return e % 4;
	}
	if (n === "") {
		let t = parseInt(e);
		return isNaN(t) ? 0 : r(t);
	} else if (n !== e) {
		let t = 0;
		switch (n) {
			case "%":
				t = 25;
				break;
			case "deg": t = 90;
		}
		if (t) {
			let i = parseFloat(e.slice(0, e.length - n.length));
			return isNaN(i) ? 0 : (i /= t, i % 1 == 0 ? r(i) : 0);
		}
	}
	return t;
}
function dt(e, t) {
	let n = e.indexOf("xlink:") === -1 ? "" : " xmlns:xlink=\"http://www.w3.org/1999/xlink\"";
	for (let e in t) n += " " + e + "=\"" + t[e] + "\"";
	return "<svg xmlns=\"http://www.w3.org/2000/svg\"" + n + ">" + e + "</svg>";
}
function ft(e) {
	return e.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function pt(e) {
	return "data:image/svg+xml," + ft(e);
}
function mt(e) {
	return "url(\"" + pt(e) + "\")";
}
var ht = {
	...pe,
	inline: !1
}, gt = {
	xmlns: "http://www.w3.org/2000/svg",
	"xmlns:xlink": "http://www.w3.org/1999/xlink",
	"aria-hidden": !0,
	role: "img"
}, _t = { display: "inline-block" }, vt = { backgroundColor: "currentColor" }, yt = { backgroundColor: "transparent" }, bt = {
	Image: "var(--svg)",
	Repeat: "no-repeat",
	Size: "100% 100%"
}, xt = {
	webkitMask: vt,
	mask: vt,
	background: yt
};
for (let e in xt) {
	let t = xt[e];
	for (let n in bt) t[e + n] = bt[n];
}
var St = {};
["horizontal", "vertical"].forEach((e) => {
	let t = e.slice(0, 1) + "Flip";
	St[e + "-flip"] = t, St[e.slice(0, 1) + "-flip"] = t, St[e + "Flip"] = t;
});
function Ct(e) {
	return e + (e.match(/^[-0-9.]+$/) ? "px" : "");
}
var wt = (e, t) => {
	let n = st(ht, t), r = { ...gt }, i = t.mode || "svg", a = {}, o = t.style, s = typeof o == "object" && !(o instanceof Array) ? o : {};
	for (let e in t) {
		let i = t[e];
		if (i !== void 0) switch (e) {
			case "icon":
			case "style":
			case "onLoad":
			case "mode":
			case "ssr": break;
			case "inline":
			case "hFlip":
			case "vFlip":
				n[e] = i === !0 || i === "true" || i === 1;
				break;
			case "flip":
				typeof i == "string" && lt(n, i);
				break;
			case "color":
				a.color = i;
				break;
			case "rotate":
				typeof i == "string" ? n[e] = ut(i) : typeof i == "number" && (n[e] = i);
				break;
			case "ariaHidden":
			case "aria-hidden":
				i !== !0 && i !== "true" && delete r["aria-hidden"];
				break;
			default: {
				let t = St[e];
				t ? (i === !0 || i === "true" || i === 1) && (n[t] = !0) : ht[e] === void 0 && (r[e] = i);
			}
		}
	}
	let c = xe(e, n), l = c.attributes;
	if (n.inline && (a.verticalAlign = "-0.125em"), i === "svg") {
		r.style = {
			...a,
			...s
		}, Object.assign(r, l);
		let e = 0, n = t.id;
		return typeof n == "string" && (n = n.replace(/-/g, "_")), r.innerHTML = Te(c.body, n ? () => n + "ID" + e++ : "iconifyVue"), m("svg", r);
	}
	let { body: u, width: d, height: f } = e, p = i === "mask" || (i === "bg" ? !1 : u.indexOf("currentColor") !== -1), h = dt(u, {
		...l,
		width: d + "",
		height: f + ""
	});
	return r.style = {
		...a,
		"--svg": mt(h),
		width: Ct(l.width),
		height: Ct(l.height),
		..._t,
		...p ? vt : yt,
		...s
	}, m("span", r);
};
if (ce(!0), De("", Be), typeof document < "u" && typeof window < "u") {
	let e = window;
	if (e.IconifyPreload !== void 0) {
		let t = e.IconifyPreload, n = "Invalid IconifyPreload syntax.";
		typeof t == "object" && t && (t instanceof Array ? t : [t]).forEach((e) => {
			try {
				(typeof e != "object" || !e || e instanceof Array || typeof e.icons != "object" || typeof e.prefix != "string" || !de(e)) && console.error(n);
			} catch {
				console.error(n);
			}
		});
	}
	if (e.IconifyProviders !== void 0) {
		let t = e.IconifyProviders;
		if (typeof t == "object" && t) for (let e in t) {
			let n = "IconifyProviders[" + e + "] is invalid.";
			try {
				let r = t[e];
				if (typeof r != "object" || !r || r.resources === void 0) continue;
				Ne(e, r) || console.error(n);
			} catch {
				console.error(n);
			}
		}
	}
}
var Tt = {
	...z,
	body: ""
}, q = A((e, { emit: t }) => {
	let n = i(null);
	function r() {
		n.value &&= (n.value.abort?.(), null);
	}
	let o = i(!!e.ssr), s = i(""), c = a(null);
	function l() {
		let i = e.icon;
		if (typeof i == "object" && i && typeof i.body == "string") return s.value = "", { data: i };
		let a;
		if (typeof i != "string" || (a = F(i, !1, !0)) === null) return null;
		let o = le(a);
		if (!o) {
			let e = n.value;
			return (!e || e.name !== i) && (o === null ? n.value = { name: i } : n.value = {
				name: i,
				abort: ot([a], f)
			}), null;
		}
		r(), s.value !== i && (s.value = i, u(() => {
			t("load", i);
		}));
		let c = e.customise;
		if (c) {
			o = Object.assign({}, o);
			let e = c(o.body, a.name, a.prefix, a.provider);
			typeof e == "string" && (o.body = e);
		}
		let l = ["iconify"];
		return a.prefix !== "" && l.push("iconify--" + a.prefix), a.provider !== "" && l.push("iconify--" + a.provider), {
			data: o,
			classes: l
		};
	}
	function f() {
		let e = l();
		e ? e.data !== c.value?.data && (c.value = e) : c.value = null;
	}
	return o.value ? f() : j(() => {
		o.value = !0, f();
	}), S(() => e.icon, f), d(r), () => {
		let t = c.value;
		if (!t) return wt(Tt, e);
		let n = e;
		return t.classes && (n = {
			...e,
			class: t.classes.join(" ")
		}), wt({
			...z,
			...t.data
		}, n);
	};
}, {
	props: [
		"icon",
		"mode",
		"ssr",
		"width",
		"height",
		"style",
		"color",
		"inline",
		"rotate",
		"hFlip",
		"horizontalFlip",
		"vFlip",
		"verticalFlip",
		"flip",
		"id",
		"ariaHidden",
		"customise",
		"title"
	],
	emits: ["load"]
}), Et = "simplePrompt.settings", Dt = {
	convertUnderscoreToSpace: !0,
	escapeBrackets: !1,
	useAliasesInSearch: !0,
	useAliasesInAutocomplete: !1,
	smartBackspace: !1,
	language: "en",
	allowEditDefaultTags: !1,
	autoMetaEnabled: !1,
	tagMaxLength: 50
}, J = c({ ...Dt });
function Ot() {
	try {
		let e = localStorage.getItem(Et);
		if (e) {
			let t = JSON.parse(e);
			Object.assign(J, {
				...Dt,
				...t
			});
		} else navigator.language.startsWith("zh") && (J.language = "zh-CN");
	} catch (e) {
		console.error("Failed to load settings:", e);
	}
}
S(J, (e) => {
	try {
		localStorage.setItem(Et, JSON.stringify(e));
	} catch (e) {
		console.error("Failed to save settings:", e);
	}
}, { deep: !0 }), Ot();
//#endregion
//#region src/utils/types.ts
var Y = /* @__PURE__ */ function(e) {
	return e[e.GENERAL = 0] = "GENERAL", e[e.ARTIST = 1] = "ARTIST", e[e.COPYRIGHT = 3] = "COPYRIGHT", e[e.CHARACTER = 4] = "CHARACTER", e[e.META = 5] = "META", e;
}({}), kt = {
	[Y.GENERAL]: "#0075db",
	[Y.ARTIST]: "#c00004",
	[Y.COPYRIGHT]: "#c000c0",
	[Y.CHARACTER]: "#00aa00",
	[Y.META]: "#fd9200"
}, X = class e {
	static instance;
	_categories = c(/* @__PURE__ */ new Map());
	isInitialized = !1;
	constructor() {
		this.addDefaultCategories();
	}
	static getInstance() {
		return e.instance ||= new e(), e.instance;
	}
	addDefaultCategories() {
		this._categories.set(Y.GENERAL, {
			value: Y.GENERAL,
			label: "General",
			color: kt[Y.GENERAL]
		}), this._categories.set(Y.ARTIST, {
			value: Y.ARTIST,
			label: "Artist",
			color: kt[Y.ARTIST]
		}), this._categories.set(Y.COPYRIGHT, {
			value: Y.COPYRIGHT,
			label: "Copyright",
			color: kt[Y.COPYRIGHT]
		}), this._categories.set(Y.CHARACTER, {
			value: Y.CHARACTER,
			label: "Character",
			color: kt[Y.CHARACTER]
		}), this._categories.set(Y.META, {
			value: Y.META,
			label: "Meta",
			color: kt[Y.META]
		});
	}
	async init() {
		this.isInitialized || await this.fetchCategories();
	}
	async fetchCategories() {
		try {
			let e = await fetch("/simple-prompt/categories/list");
			if (e.ok) {
				let t = await e.json();
				Array.isArray(t) && t.forEach((e) => {
					this._categories.set(e.id, {
						value: e.id,
						label: e.name,
						color: e.color
					});
				});
			}
		} catch (e) {
			console.error("[CategoryService] Failed to fetch categories:", e);
		} finally {
			this.isInitialized = !0;
		}
	}
	async saveCustomCategories(e) {
		try {
			let t = await fetch("/simple-prompt/categories/save", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ categories: e })
			});
			if (t.ok) await this.fetchCategories();
			else throw console.error("[CategoryService] Failed to save categories:", await t.text()), Error("Failed to save categories");
		} catch (e) {
			throw console.error("[CategoryService] Error saving categories:", e), e;
		}
	}
	getCategory(e) {
		return this._categories.get(e) || {
			value: e,
			label: "Unknown",
			color: "#888888"
		};
	}
	getColor(e) {
		return this.getCategory(e).color;
	}
	getName(e) {
		return this.getCategory(e).label;
	}
	getAll() {
		return Array.from(this._categories.values()).sort((e, t) => e.value - t.value);
	}
	get categoriesArray() {
		return this.getAll().map((e) => ({
			id: e.value,
			name: e.label,
			color: e.color
		}));
	}
	getCategoryColor(e) {
		return this.getColor(e);
	}
}, Z = {
	get categories() {
		return { get value() {
			return X.getInstance().categoriesArray;
		} };
	},
	getCategoryColor(e) {
		return X.getInstance().getColor(e);
	},
	getCategoryName(e) {
		return X.getInstance().getName(e);
	},
	async init() {
		return X.getInstance().init();
	},
	async fetchCategories() {
		return X.getInstance().fetchCategories();
	},
	async saveCustomCategories(e) {
		return X.getInstance().saveCustomCategories(e);
	}
}, At = { class: "modal-container" }, jt = { class: "modal-header" }, Mt = { class: "modal-title" }, Nt = ["title"], Pt = { class: "modal-body" }, Ft = { class: "form-group" }, It = ["placeholder", "disabled"], Lt = { class: "form-group" }, Rt = { class: "category-select-wrapper" }, zt = ["value"], Bt = { class: "form-group" }, Vt = { class: "hint" }, Ht = { class: "form-group" }, Ut = ["placeholder"], Wt = { class: "hint" }, Gt = {
	key: 0,
	class: "message error"
}, Kt = {
	key: 1,
	class: "message success"
}, qt = { class: "modal-footer" }, Jt = ["disabled"], Yt = /* @__PURE__ */ A({
	__name: "CustomTagModal",
	props: {
		visible: { type: Boolean },
		editMode: { type: Boolean },
		initialData: {},
		targetSource: {}
	},
	emits: ["close", "save"],
	setup(a, { emit: s }) {
		let c = a, l = s, { t: u } = N(), d = i({
			name: "",
			category: 0,
			post_count: 0,
			alias: ""
		}), m = i(!1), g = i(""), b = i(""), O = () => {
			d.value = {
				name: "",
				category: 0,
				post_count: 0,
				alias: ""
			}, g.value = "", b.value = "";
		};
		S(() => c.visible, (e) => {
			e && (c.editMode && c.initialData ? d.value = {
				name: c.initialData.name,
				category: c.initialData.category || Y.GENERAL,
				post_count: c.initialData.post_count || 0,
				alias: Array.isArray(c.initialData.alias) ? c.initialData.alias.join(", ") : c.initialData.alias || ""
			} : O());
		});
		let k = () => {
			l("close");
		}, A = async () => {
			if (!d.value.name.trim()) {
				g.value = u("customTag.errorNameRequired");
				return;
			}
			m.value = !0, g.value = "", b.value = "";
			try {
				let e = d.value.alias.split(",").map((e) => e.trim()).filter((e) => e), t = {
					name: d.value.name.trim(),
					category: d.value.category,
					post_count: Number(d.value.post_count),
					alias: e,
					source: c.targetSource || "user"
				}, n = await fetch("/simple-prompt/add-custom-tag", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(t)
				}), r = await n.json();
				if (!n.ok) throw Error(r.error || n.statusText);
				b.value = c.editMode ? u("customTag.successEdited") || "Tag updated!" : u("customTag.successAdded"), setTimeout(() => {
					l("save"), k();
				}, 1e3);
			} catch (e) {
				console.error("Add tag error:", e), g.value = e.message || u("customTag.errorGeneric");
			} finally {
				m.value = !1;
			}
		};
		return (i, s) => (r(), D(T, { name: "fade" }, {
			default: e(() => [a.visible ? (r(), y("div", {
				key: 0,
				class: "modal-overlay",
				onClick: h(k, ["self"])
			}, [_("div", At, [
				_("div", jt, [_("div", Mt, [f(o(q), {
					icon: a.editMode ? "mdi:pencil" : "mdi:tag-plus",
					class: "title-icon"
				}, null, 8, ["icon"]), _("span", null, t(a.editMode ? o(u)("customTag.titleEdit") || "Edit Tag" : o(u)("customTag.title")), 1)]), _("button", {
					class: "close-btn",
					onClick: k,
					title: o(u)("common.close")
				}, [f(o(q), { icon: "mdi:close" })], 8, Nt)]),
				_("div", Pt, [
					_("div", Ft, [_("label", null, [v(t(o(u)("customTag.nameLabel")) + " ", 1), s[4] ||= _("span", { class: "required" }, "*", -1)]), x(_("input", {
						"onUpdate:modelValue": s[0] ||= (e) => d.value.name = e,
						type: "text",
						placeholder: o(u)("customTag.namePlaceholder"),
						class: "sp-input",
						autofocus: "",
						disabled: a.editMode
					}, null, 8, It), [[E, d.value.name]])]),
					_("div", Lt, [_("label", null, t(o(u)("customTag.categoryLabel")), 1), _("div", Rt, [x(_("select", {
						"onUpdate:modelValue": s[1] ||= (e) => d.value.category = e,
						class: "sp-select"
					}, [(r(!0), y(C, null, n(o(Z).categories.value, (e) => (r(), y("option", {
						key: e.id,
						value: e.id
					}, t(e.name), 9, zt))), 128))], 512), [[p, d.value.category]]), _("div", {
						class: "color-preview",
						style: M({ backgroundColor: o(Z).getCategoryColor(d.value.category) })
					}, null, 4)])]),
					_("div", Bt, [
						_("label", null, t(o(u)("customTag.countLabel")), 1),
						x(_("input", {
							"onUpdate:modelValue": s[2] ||= (e) => d.value.post_count = e,
							type: "number",
							min: "0",
							class: "sp-input"
						}, null, 512), [[E, d.value.post_count]]),
						_("p", Vt, t(o(u)("customTag.countHint")), 1)
					]),
					_("div", Ht, [
						_("label", null, t(o(u)("customTag.aliasLabel")), 1),
						x(_("input", {
							"onUpdate:modelValue": s[3] ||= (e) => d.value.alias = e,
							type: "text",
							placeholder: o(u)("customTag.aliasPlaceholder"),
							class: "sp-input"
						}, null, 8, Ut), [[E, d.value.alias]]),
						_("p", Wt, t(o(u)("customTag.aliasHint")), 1)
					]),
					g.value ? (r(), y("div", Gt, [f(o(q), { icon: "mdi:alert-circle" }), v(" " + t(g.value), 1)])) : w("", !0),
					b.value ? (r(), y("div", Kt, [f(o(q), { icon: "mdi:check-circle" }), v(" " + t(b.value), 1)])) : w("", !0)
				]),
				_("div", qt, [_("button", {
					class: "btn-cancel",
					onClick: k
				}, t(o(u)("common.cancel")), 1), _("button", {
					class: "btn-save",
					onClick: A,
					disabled: m.value
				}, [m.value ? (r(), D(o(q), {
					key: 0,
					icon: "mdi:loading",
					class: "spin"
				})) : w("", !0), _("span", null, t(o(u)("common.save")), 1)], 8, Jt)])
			])])) : w("", !0)]),
			_: 1
		}));
	}
}), Q = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, Xt = /* @__PURE__ */ Q(Yt, [["__scopeId", "data-v-ccfab1f0"]]), Zt = { class: "tag-manager" }, Qt = { class: "tabs" }, $t = ["onClick"], en = { class: "toolbar" }, tn = { class: "search-box" }, nn = ["placeholder"], rn = { class: "status-info" }, an = {
	key: 0,
	class: "warning-banner"
}, on = { class: "table-container" }, sn = { class: "data-table" }, cn = {
	key: 0,
	class: "loading-row"
}, ln = { colspan: "5" }, un = {
	key: 1,
	class: "empty-row"
}, dn = { colspan: "5" }, fn = { class: "name-cell" }, pn = ["title"], mn = { align: "right" }, hn = {
	key: 0,
	class: "actions"
}, gn = ["onClick"], _n = ["onClick"], vn = {
	key: 1,
	class: "actions-disabled"
}, yn = { class: "pagination" }, bn = ["disabled"], xn = { class: "page-info" }, Sn = ["disabled"], Cn = {
	key: 1,
	class: "add-tag-bar"
}, wn = { class: "add-inputs" }, Tn = ["placeholder"], En = ["value"], Dn = ["disabled"], On = 20, kn = /* @__PURE__ */ Q(/* @__PURE__ */ A({
	__name: "TagManager",
	setup(e) {
		let { t: a } = N(), s = i("user"), c = g(() => [
			{
				id: "user",
				label: a("settings.items.updateUserTags") || "User Tags"
			},
			{
				id: "liked",
				label: a("settings.items.updateLikedTags") || "Liked Tags"
			},
			{
				id: "default",
				label: "Default Tags"
			}
		]), u = i([]), d = i(0), m = i(!1), h = i(""), b = i(1), T = i(!1), O = i(null), A = async () => {
			m.value = !0;
			try {
				let e = (b.value - 1) * On, t = new URLSearchParams({
					source: s.value,
					limit: On.toString(),
					offset: e.toString(),
					q: h.value
				}), n = await fetch(`/simple-prompt/tags/list?${t.toString()}`), r = await n.json();
				n.ok ? (u.value = r.data || [], d.value = r.total || 0) : console.error("Fetch tags failed:", r.error);
			} catch (e) {
				console.error("Fetch tags error:", e);
			} finally {
				m.value = !1;
			}
		}, P = async (e) => {
			if (confirm(a("common.confirm") + ` Delete '${e.name}'?`)) try {
				let t = await fetch("/simple-prompt/tags/delete", {
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						name: e.name,
						source: s.value
					})
				});
				if (t.ok) A();
				else {
					let e = await t.json();
					alert("Delete failed: " + e.error);
				}
			} catch (e) {
				alert("Delete failed: " + e.message);
			}
		}, F = (e) => {
			O.value = e, T.value = !0;
		}, I = () => {
			A();
		}, L = g(() => s.value === "default" ? J.allowEditDefaultTags : !0);
		S([s, h], () => {
			b.value = 1, A();
		}), S(b, () => {
			A();
		}), j(() => {
			A(), Z.fetchCategories();
		});
		let R = i(""), z = i(0), B = i(!1), V = async () => {
			if (!R.value.trim()) return;
			let e = R.value.split(/[,\n]/).map((e) => e.trim()).filter(Boolean);
			if (e.length !== 0) {
				B.value = !0;
				try {
					let t = e.map((e) => ({
						name: e,
						category: z.value,
						post_count: 0,
						alias: [],
						source: s.value
					})), n = await fetch("/simple-prompt/add-custom-tag", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ tags: t })
					}), r = await n.json();
					n.ok ? (R.value = "", A()) : alert("Add failed: " + r.error);
				} catch (e) {
					alert("Add failed: " + e.message);
				} finally {
					B.value = !1;
				}
			}
		}, H = (e) => Z.getCategoryName(e), U = (e) => Z.getCategoryColor(e);
		return (e, i) => (r(), y("div", Zt, [
			_("div", Qt, [(r(!0), y(C, null, n(c.value, (e) => (r(), y("button", {
				key: e.id,
				class: l(["tab-btn", { active: s.value === e.id }]),
				onClick: (t) => s.value = e.id
			}, t(e.label), 11, $t))), 128))]),
			_("div", en, [_("div", tn, [f(o(q), {
				icon: "mdi:magnify",
				class: "search-icon"
			}), x(_("input", {
				"onUpdate:modelValue": i[0] ||= (e) => h.value = e,
				type: "text",
				placeholder: o(a)("search.placeholder"),
				class: "search-input"
			}, null, 8, nn), [[E, h.value]])]), _("div", rn, t(d.value) + " tags ", 1)]),
			s.value === "default" && !L.value ? (r(), y("div", an, [f(o(q), { icon: "mdi:lock" }), i[6] ||= _("span", null, "Editing default tags is disabled in settings.", -1)])) : w("", !0),
			_("div", on, [_("table", sn, [i[8] ||= _("thead", null, [_("tr", null, [
				_("th", { width: "30%" }, "Name"),
				_("th", { width: "15%" }, "Category"),
				_("th", { width: "15%" }, "Post Count"),
				_("th", { width: "25%" }, "Aliases"),
				_("th", {
					width: "15%",
					align: "right"
				}, "Actions")
			])], -1), _("tbody", null, [m.value ? (r(), y("tr", cn, [_("td", ln, [f(o(q), {
				icon: "mdi:loading",
				class: "spin"
			}), i[7] ||= v(" Loading... ", -1)])])) : u.value.length === 0 ? (r(), y("tr", un, [_("td", dn, t(o(a)("search.noResults")), 1)])) : (r(!0), y(C, { key: 2 }, n(u.value, (e) => (r(), y("tr", { key: e.name }, [
				_("td", fn, t(e.name), 1),
				_("td", null, [_("span", {
					class: "cat-badge",
					style: M({ "--c": U(e.category) })
				}, t(H(e.category)), 5)]),
				_("td", null, t(e.post_count), 1),
				_("td", {
					class: "alias-cell",
					title: e.alias ? e.alias.join(", ") : ""
				}, t(e.alias ? e.alias.join(", ") : "-"), 9, pn),
				_("td", mn, [L.value ? (r(), y("div", hn, [_("button", {
					class: "action-btn edit",
					onClick: (t) => F(e),
					title: "Edit"
				}, [f(o(q), { icon: "mdi:pencil" })], 8, gn), _("button", {
					class: "action-btn delete",
					onClick: (t) => P(e),
					title: "Delete"
				}, [f(o(q), { icon: "mdi:delete" })], 8, _n)])) : (r(), y("div", vn, [f(o(q), { icon: "mdi:lock-outline" })]))])
			]))), 128))])])]),
			_("div", yn, [
				_("button", {
					disabled: b.value === 1,
					onClick: i[1] ||= (e) => b.value--,
					class: "page-btn"
				}, [f(o(q), { icon: "mdi:chevron-left" })], 8, bn),
				_("span", xn, "Page " + t(b.value), 1),
				_("button", {
					disabled: u.value.length < On,
					onClick: i[2] ||= (e) => b.value++,
					class: "page-btn"
				}, [f(o(q), { icon: "mdi:chevron-right" })], 8, Sn)
			]),
			L.value ? (r(), y("div", Cn, [_("div", wn, [
				x(_("input", {
					"onUpdate:modelValue": i[3] ||= (e) => R.value = e,
					placeholder: o(a)("settings.sections.addPlaceholder") || "New Tag Name (comma separated for multiple)",
					class: "input-new-name",
					onKeyup: k(V, ["enter"])
				}, null, 40, Tn), [[E, R.value]]),
				x(_("select", {
					"onUpdate:modelValue": i[4] ||= (e) => z.value = e,
					class: "select-new-cat"
				}, [(r(!0), y(C, null, n(o(Z).categories.value, (e) => (r(), y("option", {
					key: e.id,
					value: e.id
				}, t(e.name), 9, En))), 128))], 512), [[p, z.value]]),
				_("button", {
					class: "btn-add",
					onClick: V,
					disabled: B.value
				}, [B.value ? (r(), D(o(q), {
					key: 0,
					icon: "mdi:loading",
					class: "spin"
				})) : (r(), D(o(q), {
					key: 1,
					icon: "mdi:plus"
				})), i[9] ||= v(" Add ", -1)], 8, Dn)
			])])) : w("", !0),
			f(Xt, {
				visible: T.value,
				"edit-mode": !0,
				"initial-data": O.value,
				"target-source": s.value,
				onClose: i[5] ||= (e) => T.value = !1,
				onSave: I
			}, null, 8, [
				"visible",
				"initial-data",
				"target-source"
			])
		]));
	}
}), [["__scopeId", "data-v-7564308e"]]), $ = class e {
	static instance;
	presets = i([]);
	defaultPresets = i([]);
	customPresets = i([]);
	activePresetId = i("");
	loading = i(!1);
	constructor() {}
	static getInstance() {
		return e.instance ||= new e(), e.instance;
	}
	async fetchPresets() {
		try {
			let e = await fetch("/simple-prompt/presets/list");
			if (e.ok) {
				let t = await e.json();
				this.defaultPresets.value = t.defaults || [], this.customPresets.value = t.customs || [], this.presets.value = [...this.defaultPresets.value, ...this.customPresets.value], !this.activePresetId.value && this.presets.value.length > 0 && (this.activePresetId.value = this.presets.value[0].id);
			}
		} catch (e) {
			console.error("Error fetching presets:", e);
		}
	}
	async saveCustomPresets(e) {
		try {
			if (!(await fetch("/simple-prompt/presets/save", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ presets: e })
			})).ok) throw Error("Failed");
			await this.fetchPresets();
		} catch (e) {
			throw console.error("Error saving presets:", e), e;
		}
	}
	getActiveTags() {
		if (this.activePresetId.value) {
			let e = this.presets.value.find((e) => e.id === this.activePresetId.value);
			if (e && e.tags) return e.tags;
		}
		return [];
	}
	setActivePreset(e) {
		this.activePresetId.value = e;
	}
}.getInstance(), An = { class: "settings-container" }, jn = { class: "settings-header" }, Mn = { class: "settings-title" }, Nn = ["title"], Pn = { class: "settings-body" }, Fn = { class: "settings-sidebar" }, In = ["onClick"], Ln = { class: "settings-content" }, Rn = {
	key: 0,
	class: "settings-section"
}, zn = { class: "section-title" }, Bn = { class: "setting-item" }, Vn = { class: "setting-info" }, Hn = { class: "setting-label" }, Un = { class: "setting-desc" }, Wn = { class: "switch" }, Gn = { class: "setting-item" }, Kn = { class: "setting-info" }, qn = { class: "setting-label" }, Jn = { class: "setting-desc" }, Yn = { class: "switch" }, Xn = {
	key: 1,
	class: "settings-section"
}, Zn = { class: "section-title" }, Qn = { class: "setting-item" }, $n = { class: "setting-info" }, er = { class: "setting-label" }, tr = { class: "setting-desc" }, nr = { class: "switch" }, rr = { class: "setting-item" }, ir = { class: "setting-info" }, ar = { class: "setting-label" }, or = { class: "setting-desc" }, sr = { class: "switch" }, cr = {
	key: 2,
	class: "settings-section"
}, lr = { class: "section-title" }, ur = { class: "setting-item" }, dr = { class: "setting-info" }, fr = { class: "setting-label" }, pr = { class: "setting-desc" }, mr = { class: "switch" }, hr = {
	key: 3,
	class: "settings-section"
}, gr = { class: "section-title" }, _r = { class: "setting-item" }, vr = { class: "setting-info" }, yr = { class: "setting-label" }, br = { class: "setting-desc" }, xr = { class: "setting-item" }, Sr = { class: "setting-info" }, Cr = { class: "setting-label" }, wr = { class: "setting-desc" }, Tr = {
	key: 4,
	class: "settings-section"
}, Er = { class: "section-title" }, Dr = { class: "setting-item" }, Or = { class: "setting-info" }, kr = { class: "setting-label" }, Ar = { class: "setting-desc" }, jr = { class: "switch" }, Mr = { class: "setting-item data-update-item" }, Nr = { class: "setting-info" }, Pr = { class: "setting-label" }, Fr = { class: "setting-desc" }, Ir = { class: "update-actions" }, Lr = ["disabled"], Rr = { class: "setting-item data-update-item" }, zr = { class: "setting-info" }, Br = { class: "setting-label" }, Vr = { class: "setting-desc" }, Hr = { class: "update-actions" }, Ur = ["disabled"], Wr = { class: "setting-item data-update-item" }, Gr = { class: "setting-info" }, Kr = { class: "setting-label" }, qr = { class: "setting-desc" }, Jr = { class: "update-actions" }, Yr = ["disabled"], Xr = {
	key: 5,
	class: "settings-section full-width"
}, Zr = { class: "section-title" }, Qr = { class: "category-manager" }, $r = { class: "add-cat-form" }, ei = ["placeholder"], ti = { class: "cat-list" }, ni = { class: "cat-name" }, ri = { class: "cat-id" }, ii = ["onClick"], ai = {
	key: 6,
	class: "settings-section full-width"
}, oi = { class: "section-title" }, si = { class: "meta-manager" }, ci = { class: "preset-form" }, li = { class: "form-row" }, ui = ["placeholder"], di = { class: "form-row" }, fi = ["placeholder"], pi = { class: "form-actions" }, mi = { class: "preset-list" }, hi = { class: "preset-info" }, gi = { class: "preset-name" }, _i = { class: "preset-tags" }, vi = { class: "preset-actions" }, yi = ["onClick"], bi = ["onClick"], xi = {
	key: 0,
	class: "empty-msg"
}, Si = {
	class: "preset-list",
	style: { "margin-top": "20px" }
}, Ci = { style: { color: "#888" } }, wi = { class: "preset-info" }, Ti = { class: "preset-name" }, Ei = { class: "preset-tags" }, Di = {
	key: 7,
	class: "settings-section full-width"
}, Oi = { class: "section-title" }, ki = { class: "settings-footer" }, Ai = { class: "footer-info" }, ji = /* @__PURE__ */ Q(/* @__PURE__ */ A({
	__name: "SettingsModal",
	props: { visible: {
		type: Boolean,
		default: !1
	} },
	emits: ["close"],
	setup(a, { emit: s }) {
		let c = a, u = s, { t: d, locale: m } = N(), g = () => {
			u("close");
		};
		S(() => J.language, (e) => {
			m.value = e;
		});
		let O = [
			{
				id: "textFormat",
				icon: "mdi:format-text"
			},
			{
				id: "autocomplete",
				icon: "mdi:magnify"
			},
			{
				id: "editing",
				icon: "mdi:pencil"
			},
			{
				id: "interface",
				icon: "mdi:translate"
			},
			{
				id: "data",
				icon: "mdi:database"
			},
			{
				id: "categoryManager",
				icon: "mdi:palette"
			},
			{
				id: "metaManager",
				icon: "mdi:format-list-bulleted-type"
			},
			{
				id: "tagManager",
				icon: "mdi:tag-multiple"
			}
		], k = i("textFormat"), A = i(""), j = i("#aabbcc"), P = () => {
			if (!A.value) return;
			let e = Z.categories.value, t = (e.length > 0 ? Math.max(...e.map((e) => e.id)) : 5) + 1;
			for (t < 6 && (t = 6); e.some((e) => e.id === t);) t++;
			let n = {
				id: t,
				name: A.value,
				color: j.value
			}, r = [
				0,
				1,
				3,
				4,
				5,
				6,
				7
			], i = [...e.filter((e) => !r.includes(e.id)), n];
			Z.saveCustomCategories(i).then(() => {
				A.value = "";
			});
		}, F = (e) => {
			if (!confirm(d("common.confirm") || "Are you sure?")) return;
			let t = Z.categories.value, n = [
				0,
				1,
				3,
				4,
				5,
				6,
				7
			];
			if (n.includes(e)) {
				alert(d("category.cannotDeleteDefault"));
				return;
			}
			let r = t.filter((t) => !n.includes(t.id) && t.id !== e);
			Z.saveCustomCategories(r);
		}, I = i(""), L = i(""), R = i(null);
		S(k, (e) => {
			e === "categoryManager" ? Z.fetchCategories() : e === "metaManager" && $.fetchPresets();
		});
		let z = () => {
			if (!I.value || !L.value) {
				alert(d("category.nameRequired"));
				return;
			}
			let e = L.value.split(/[,\n]/).map((e) => e.trim()).filter(Boolean);
			if (R.value) {
				let t = $.customPresets.value.findIndex((e) => e.id === R.value);
				t !== -1 && ($.customPresets.value[t] = {
					...$.customPresets.value[t],
					name: I.value,
					tags: e
				});
			} else {
				let t = {
					id: "custom_" + Date.now(),
					name: I.value,
					tags: e
				};
				$.customPresets.value.push(t);
			}
			$.saveCustomPresets($.customPresets.value).then(() => {
				H();
			});
		}, B = (e) => {
			R.value = e.id, I.value = e.name, L.value = e.tags.join(", ");
		}, V = (e) => {
			if (!confirm(d("common.confirm") || "Are you sure?")) return;
			let t = $.customPresets.value.filter((t) => t.id !== e);
			$.customPresets.value = t, $.saveCustomPresets(t);
		}, H = () => {
			I.value = "", L.value = "", R.value = null;
		}, U = i(""), W = i(!1), G = i(!1), ee = i(""), K = async (e) => {
			if (!(W.value || G.value)) {
				W.value = !0, U.value = "";
				try {
					if (e === "update_github") {
						G.value = !0, U.value = d("settings.items.checkingUpdate");
						try {
							let e = await fetch("/simple-prompt/check-update"), t = await e.json();
							if (!e.ok) throw Error(t.error || e.statusText);
							if (ee.value = t.version, G.value = !1, !t.update_available) {
								U.value = d("settings.items.upToDate") + ee.value;
								return;
							}
							U.value = d("settings.items.updating");
							let n = await fetch("/simple-prompt/update-tags", {
								method: "POST",
								headers: { "Content-Type": "application/json" },
								body: JSON.stringify({})
							}), r = await n.json();
							if (n.ok && r.status === "success") U.value = d("settings.items.updateSuccess");
							else throw Error(r.error || n.statusText);
						} finally {
							G.value = !1;
						}
					} else {
						U.value = d("settings.items.updating");
						let t = { action: e }, n = await fetch("/simple-prompt/update-data", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify(t)
						}), r = await n.json();
						if (n.ok && r.status === "success") U.value = r.message || d("settings.items.updateSuccess");
						else throw Error(r.error || n.statusText);
					}
				} catch (e) {
					console.error("Update action error:", e), U.value = d("settings.items.updateError") + e.message;
				} finally {
					W.value = !1;
				}
			}
		};
		return S(() => c.visible, (e) => {
			e && (U.value = "", ee.value = "");
		}), (i, s) => (r(), D(T, { name: "fade" }, {
			default: e(() => [a.visible ? (r(), y("div", {
				key: 0,
				class: "settings-overlay",
				onClick: h(g, ["self"])
			}, [_("div", An, [
				_("div", jn, [_("div", Mn, [f(o(q), {
					icon: "mdi:cog",
					class: "settings-icon"
				}), _("span", null, t(o(d)("settings.title")), 1)]), _("button", {
					class: "btn-close",
					onClick: g,
					title: o(d)("common.close")
				}, [f(o(q), { icon: "mdi:close" })], 8, Nn)]),
				_("div", Pn, [_("div", Fn, [(r(), y(C, null, n(O, (e) => _("div", {
					key: e.id,
					class: l(["sidebar-item", { active: k.value === e.id }]),
					onClick: (t) => k.value = e.id
				}, [f(o(q), {
					icon: e.icon,
					class: "item-icon"
				}, null, 8, ["icon"]), _("span", null, t(o(d)(`settings.sections.${e.id}`)), 1)], 10, In)), 64))]), _("div", Ln, [
					k.value === "textFormat" ? (r(), y("div", Rn, [
						_("h3", zn, [f(o(q), { icon: "mdi:format-text" }), v(" " + t(o(d)("settings.sections.textFormat")), 1)]),
						_("div", Bn, [_("div", Vn, [_("label", Hn, t(o(d)("settings.items.convertUnderscore")), 1), _("p", Un, t(o(d)("settings.items.convertUnderscoreDesc")), 1)]), _("label", Wn, [x(_("input", {
							type: "checkbox",
							"onUpdate:modelValue": s[0] ||= (e) => o(J).convertUnderscoreToSpace = e
						}, null, 512), [[b, o(J).convertUnderscoreToSpace]]), s[15] ||= _("span", { class: "slider" }, null, -1)])]),
						_("div", Gn, [_("div", Kn, [_("label", qn, t(o(d)("settings.items.escapeBrackets")), 1), _("p", Jn, t(o(d)("settings.items.escapeBracketsDesc")), 1)]), _("label", Yn, [x(_("input", {
							type: "checkbox",
							"onUpdate:modelValue": s[1] ||= (e) => o(J).escapeBrackets = e
						}, null, 512), [[b, o(J).escapeBrackets]]), s[16] ||= _("span", { class: "slider" }, null, -1)])])
					])) : w("", !0),
					k.value === "autocomplete" ? (r(), y("div", Xn, [
						_("h3", Zn, [f(o(q), { icon: "mdi:magnify" }), v(" " + t(o(d)("settings.sections.autocomplete")), 1)]),
						_("div", Qn, [_("div", $n, [_("label", er, t(o(d)("settings.items.useAliasSearch")), 1), _("p", tr, t(o(d)("settings.items.useAliasSearchDesc")), 1)]), _("label", nr, [x(_("input", {
							type: "checkbox",
							"onUpdate:modelValue": s[2] ||= (e) => o(J).useAliasesInSearch = e
						}, null, 512), [[b, o(J).useAliasesInSearch]]), s[17] ||= _("span", { class: "slider" }, null, -1)])]),
						_("div", rr, [_("div", ir, [_("label", ar, t(o(d)("settings.items.useAliasAutocomplete")), 1), _("p", or, t(o(d)("settings.items.useAliasAutocompleteDesc")), 1)]), _("label", sr, [x(_("input", {
							type: "checkbox",
							"onUpdate:modelValue": s[3] ||= (e) => o(J).useAliasesInAutocomplete = e
						}, null, 512), [[b, o(J).useAliasesInAutocomplete]]), s[18] ||= _("span", { class: "slider" }, null, -1)])])
					])) : w("", !0),
					k.value === "editing" ? (r(), y("div", cr, [_("h3", lr, [f(o(q), { icon: "mdi:pencil" }), v(" " + t(o(d)("settings.sections.editing")), 1)]), _("div", ur, [_("div", dr, [_("label", fr, t(o(d)("settings.items.smartBackspace")), 1), _("p", pr, t(o(d)("settings.items.smartBackspaceDesc")), 1)]), _("label", mr, [x(_("input", {
						type: "checkbox",
						"onUpdate:modelValue": s[4] ||= (e) => o(J).smartBackspace = e
					}, null, 512), [[b, o(J).smartBackspace]]), s[19] ||= _("span", { class: "slider" }, null, -1)])])])) : w("", !0),
					k.value === "interface" ? (r(), y("div", hr, [
						_("h3", gr, [f(o(q), { icon: "mdi:translate" }), v(" " + t(o(d)("settings.sections.interface")), 1)]),
						_("div", _r, [_("div", vr, [_("label", yr, t(o(d)("settings.items.language")), 1), _("p", br, t(o(d)("settings.items.languageDesc")), 1)]), x(_("select", {
							"onUpdate:modelValue": s[5] ||= (e) => o(J).language = e,
							class: "language-select"
						}, [...s[20] ||= [_("option", { value: "en" }, "English", -1), _("option", { value: "zh-CN" }, "简体中文", -1)]], 512), [[p, o(J).language]])]),
						_("div", xr, [_("div", Sr, [_("label", Cr, t(o(d)("settings.items.tagMaxLength")), 1), _("p", wr, t(o(d)("settings.items.tagMaxLengthDesc")), 1)]), x(_("input", {
							type: "number",
							"onUpdate:modelValue": s[6] ||= (e) => o(J).tagMaxLength = e,
							class: "input-number",
							min: "0",
							step: "5"
						}, null, 512), [[
							E,
							o(J).tagMaxLength,
							void 0,
							{ number: !0 }
						]])])
					])) : w("", !0),
					k.value === "data" ? (r(), y("div", Tr, [
						_("h3", Er, [f(o(q), { icon: "mdi:database" }), v(" " + t(o(d)("settings.sections.data")), 1)]),
						_("div", Dr, [_("div", Or, [_("label", kr, t(o(d)("settings.items.allowEditDefaultTags") || "Allow Editing Default Tags"), 1), _("p", Ar, t(o(d)("settings.items.allowEditDefaultTagsDesc") || "Enable editing and deleting of default tags (Use with caution)."), 1)]), _("label", jr, [x(_("input", {
							type: "checkbox",
							"onUpdate:modelValue": s[7] ||= (e) => o(J).allowEditDefaultTags = e
						}, null, 512), [[b, o(J).allowEditDefaultTags]]), s[21] ||= _("span", { class: "slider" }, null, -1)])]),
						_("div", Mr, [_("div", Nr, [_("label", Pr, t(o(d)("settings.items.updateTags")), 1), _("p", Fr, t(o(d)("settings.items.updateTagsDesc")), 1)]), _("div", Ir, [_("button", {
							class: "btn-update primary",
							disabled: W.value || G.value,
							onClick: s[8] ||= (e) => K("update_github")
						}, [W.value && k.value === "data" ? (r(), D(o(q), {
							key: 0,
							icon: "mdi:loading",
							class: "spin"
						})) : w("", !0), _("span", null, t(o(d)("settings.items.updateNow")), 1)], 8, Lr)])]),
						_("div", Rr, [_("div", zr, [_("label", Br, t(o(d)("settings.items.updateLikedTags") || "Update Liked Tags"), 1), _("p", Vr, t(o(d)("settings.items.updateLikedTagsDesc") || "Sync liked tags data with main database."), 1)]), _("div", Hr, [_("button", {
							class: "btn-update secondary",
							disabled: W.value,
							onClick: s[9] ||= (e) => K("update_liked")
						}, [f(o(q), { icon: "mdi:heart" }), _("span", null, t(o(d)("common.update") || "Update"), 1)], 8, Ur)])]),
						_("div", Wr, [_("div", Gr, [_("label", Kr, t(o(d)("settings.items.updateUserTags") || "Update User Tags"), 1), _("p", qr, t(o(d)("settings.items.updateUserTagsDesc") || "Sync custom tags data with main database."), 1)]), _("div", Jr, [_("button", {
							class: "btn-update secondary",
							disabled: W.value,
							onClick: s[10] ||= (e) => K("update_user")
						}, [f(o(q), { icon: "mdi:account-tag" }), _("span", null, t(o(d)("common.update") || "Update"), 1)], 8, Yr)])]),
						U.value ? (r(), y("div", {
							key: 0,
							class: l(["update-status-box", {
								error: U.value.includes("failed") || U.value.toLowerCase().includes("error"),
								success: U.value.includes("success") || U.value.includes("upToDate") || U.value.includes("updated")
							}])
						}, [f(o(q), { icon: U.value.includes("success") || U.value.includes("upToDate") || U.value.includes("updated") ? "mdi:check-circle" : "mdi:alert-circle" }, null, 8, ["icon"]), _("span", null, t(U.value), 1)], 2)) : w("", !0)
					])) : w("", !0),
					k.value === "categoryManager" ? (r(), y("div", Xr, [_("h3", Zr, [f(o(q), { icon: "mdi:palette" }), v(" " + t(o(d)("settings.sections.categoryManager") || "Category Management"), 1)]), _("div", Qr, [_("div", $r, [
						x(_("input", {
							"onUpdate:modelValue": s[11] ||= (e) => A.value = e,
							placeholder: o(d)("category.namePlaceholder"),
							class: "input-text"
						}, null, 8, ei), [[E, A.value]]),
						x(_("input", {
							"onUpdate:modelValue": s[12] ||= (e) => j.value = e,
							type: "color",
							class: "input-color"
						}, null, 512), [[E, j.value]]),
						_("button", {
							class: "btn-primary",
							onClick: P
						}, t(o(d)("category.addButton")), 1)
					]), _("div", ti, [(r(!0), y(C, null, n(o(Z).categories.value, (e) => (r(), y("div", {
						key: e.id,
						class: "cat-item"
					}, [
						_("div", {
							class: "cat-dot",
							style: M({ backgroundColor: e.color })
						}, null, 4),
						_("span", ni, t(e.name), 1),
						_("span", ri, "#" + t(e.id), 1),
						[
							0,
							1,
							3,
							4,
							5,
							6,
							7
						].includes(e.id) ? w("", !0) : (r(), y("button", {
							key: 0,
							class: "btn-icon",
							onClick: (t) => F(e.id)
						}, [f(o(q), { icon: "mdi:delete" })], 8, ii))
					]))), 128))])])])) : w("", !0),
					k.value === "metaManager" ? (r(), y("div", ai, [_("h3", oi, [f(o(q), { icon: "mdi:format-list-bulleted-type" }), v(" " + t(o(d)("settings.sections.metaManager") || "Meta Presets Management"), 1)]), _("div", si, [
						_("div", ci, [
							_("h4", null, t(R.value ? o(d)("settings.meta.editPreset") : o(d)("settings.meta.newPreset")), 1),
							_("div", li, [x(_("input", {
								"onUpdate:modelValue": s[13] ||= (e) => I.value = e,
								placeholder: o(d)("settings.meta.presetNamePlaceholder"),
								class: "input-text"
							}, null, 8, ui), [[E, I.value]])]),
							_("div", di, [x(_("textarea", {
								"onUpdate:modelValue": s[14] ||= (e) => L.value = e,
								placeholder: o(d)("settings.meta.presetTagsPlaceholder"),
								class: "input-textarea"
							}, null, 8, fi), [[E, L.value]])]),
							_("div", pi, [I.value || L.value ? (r(), y("button", {
								key: 0,
								class: "btn-cancel",
								onClick: H
							}, t(o(d)("common.cancel")), 1)) : w("", !0), _("button", {
								class: "btn-primary",
								onClick: z
							}, t(R.value ? o(d)("common.update") : o(d)("category.addButton")), 1)])
						]),
						_("div", mi, [
							_("h4", null, t(o(d)("settings.meta.customPresetsHeading")), 1),
							(r(!0), y(C, null, n(o($).customPresets.value, (e) => (r(), y("div", {
								key: e.id,
								class: "preset-item"
							}, [_("div", hi, [_("span", gi, t(e.name), 1), _("span", _i, t(e.tags.join(", ")), 1)]), _("div", vi, [_("button", {
								class: "btn-icon",
								onClick: (t) => B(e)
							}, [f(o(q), { icon: "mdi:pencil" })], 8, yi), _("button", {
								class: "btn-icon",
								onClick: (t) => V(e.id)
							}, [f(o(q), { icon: "mdi:delete" })], 8, bi)])]))), 128)),
							o($).customPresets.value.length === 0 ? (r(), y("div", xi, t(o(d)("settings.meta.noCustomPresets")), 1)) : w("", !0)
						]),
						_("div", Si, [_("h4", Ci, t(o(d)("settings.meta.defaultPresetsHeading")), 1), (r(!0), y(C, null, n(o($).defaultPresets.value, (e) => (r(), y("div", {
							key: e.id,
							class: "preset-item default"
						}, [_("div", wi, [_("span", Ti, t(e.name), 1), _("span", Ei, t(e.tags.join(", ")), 1)])]))), 128))])
					])])) : w("", !0),
					k.value === "tagManager" ? (r(), y("div", Di, [_("h3", Oi, [f(o(q), { icon: "mdi:tag-multiple" }), v(" " + t(o(d)("settings.sections.tagManager") || "Tag Manager"), 1)]), f(kn)])) : w("", !0)
				])]),
				_("div", ki, [_("div", Ai, [f(o(q), { icon: "mdi:information-outline" }), v(" " + t(o(d)("settings.autoSave")), 1)]), _("button", {
					class: "btn-primary",
					onClick: g
				}, t(o(d)("common.done")), 1)])
			])])) : w("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-0b481180"]]), Mi = { class: "sp-modal-container" }, Ni = { class: "sp-modal-header" }, Pi = { class: "sp-modal-title" }, Fi = { class: "sp-modal-actions" }, Ii = ["title"], Li = ["title"], Ri = { class: "sp-modal-body" }, zi = { class: "sp-modal-footer" }, Bi = { class: "sp-footer-left" }, Vi = { class: "sp-hint" }, Hi = { class: "sp-footer-right" }, Ui = /* @__PURE__ */ Q(/* @__PURE__ */ A({
	__name: "ModalWrapper",
	props: { visible: {
		type: Boolean,
		default: !1
	} },
	emits: ["close", "save"],
	setup(n, { emit: a }) {
		let c = a, l = n, { t: u } = N(), p = i(!1), m = i(!1), g = () => {
			p.value = !0;
		}, v = () => {
			p.value = !1;
		}, b = () => {
			m.value = !0;
		}, x = () => {
			m.value = !1;
		}, S = () => {
			c("close");
		}, C = () => {
			c("save");
		}, E = (e) => {
			p.value || m.value || (e.key === "Escape" && l.visible && S(), (e.ctrlKey || e.metaKey) && e.key === "s" && (e.preventDefault(), C()));
		};
		return j(() => {
			window.addEventListener("keydown", E);
		}), d(() => {
			window.removeEventListener("keydown", E);
		}), (i, a) => (r(), D(T, { name: "fade" }, {
			default: e(() => [n.visible ? (r(), y("div", {
				key: 0,
				class: "sp-modal-overlay",
				onClick: h(S, ["self"])
			}, [
				_("div", Mi, [
					_("div", Ni, [_("div", Pi, [f(o(q), {
						icon: "mdi:pencil-box-outline",
						class: "sp-icon"
					}), _("span", null, t(o(u)("editor.subtitle")), 1)]), _("div", Fi, [_("button", {
						class: "sp-btn-icon",
						title: o(u)("settings.title"),
						onClick: g
					}, [f(o(q), { icon: "mdi:cog" })], 8, Ii), _("button", {
						class: "sp-btn-icon sp-btn-close",
						onClick: S,
						title: o(u)("common.close")
					}, [f(o(q), { icon: "mdi:close" })], 8, Li)])]),
					_("div", Ri, [s(i.$slots, "content", { openCustomTag: b }, void 0, !0)]),
					_("div", zi, [_("div", Bi, [_("span", Vi, t(o(u)("editor.autocompleteHint")), 1)]), _("div", Hi, [_("button", {
						class: "sp-btn sp-btn-secondary",
						onClick: S
					}, t(o(u)("common.cancel")), 1), _("button", {
						class: "sp-btn sp-btn-primary",
						onClick: C
					}, t(o(u)("common.save")), 1)])])
				]),
				f(ji, {
					visible: p.value,
					onClose: v
				}, null, 8, ["visible"]),
				f(Xt, {
					visible: m.value,
					onClose: x
				}, null, 8, ["visible"])
			])) : w("", !0)]),
			_: 3
		}));
	}
}), [["__scopeId", "data-v-86b97fcd"]]), Wi = class e {
	static instance;
	isInitialized = !1;
	constructor() {}
	static getInstance() {
		return e.instance ||= new e(), e.instance;
	}
	async init() {
		this.isInitialized ||= (console.log("[DuckDB] Backend initialization check (API-based)"), !0);
	}
	async searchTags(e, t = 20, n = !1, r = []) {
		let i = new URLSearchParams({
			q: e,
			limit: t.toString(),
			use_aliases: n.toString(),
			categories: r.join(",")
		});
		try {
			let t = await fetch(`/simple-prompt/search-tags?${i.toString()}`);
			if (!t.ok) throw Error(`HTTP error! status: ${t.status}`);
			let r = await t.json();
			return n && r.length > 0 ? r.map((t) => {
				if (t.name && t.name.toLowerCase().includes(e.toLowerCase())) return t;
				let n = Array.isArray(t.alias) ? t.alias : [];
				if (n.length > 0) {
					let r = n.find((t) => t && t.toLowerCase().includes(e.toLowerCase()));
					if (r) return {
						...t,
						matched_alias: r
					};
				}
				return t;
			}) : r;
		} catch (e) {
			return console.error("[DuckDB] Search failed via API:", e), [];
		}
	}
	async getTagsDetails(e) {
		if (e.length === 0) return {};
		try {
			let t = await fetch("/simple-prompt/get-tags-details", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ names: e })
			});
			if (!t.ok) throw Error(`HTTP error! status: ${t.status}`);
			return await t.json();
		} catch (e) {
			return console.error("[DuckDB] Get tags details failed:", e), {};
		}
	}
};
//#endregion
//#region src/utils/caret.ts
function Gi(e, t) {
	let n = /* @__PURE__ */ "direction.boxSizing.width.height.overflowX.overflowY.borderTopWidth.borderRightWidth.borderBottomWidth.borderLeftWidth.paddingTop.paddingRight.paddingBottom.paddingLeft.fontStyle.fontVariant.fontWeight.fontStretch.fontSize.fontSizeAdjust.lineHeight.fontFamily.textAlign.textTransform.textIndent.textDecoration.letterSpacing.wordSpacing.tabSize.MozTabSize".split("."), r = document.createElement("div");
	r.id = "input-textarea-caret-position-mirror-div", document.body.appendChild(r);
	let i = r.style, a = window.getComputedStyle(e);
	i.whiteSpace = "pre-wrap", e.nodeName !== "INPUT" && (i.wordWrap = "break-word"), i.position = "absolute", i.visibility = "hidden", n.forEach((e) => {
		i[e] = a[e];
	}), navigator.userAgent.toLowerCase().indexOf("firefox") > -1 ? e.scrollHeight > parseInt(a.height) && (i.overflowY = "scroll") : i.overflow = "hidden", r.textContent = e.value.substring(0, t), e.nodeName === "INPUT" && (r.textContent = r.textContent.replace(/\s/g, "\xA0"));
	let o = document.createElement("span");
	o.textContent = e.value.substring(t) || ".", r.appendChild(o);
	let s = {
		top: o.offsetTop + parseInt(a.borderTopWidth),
		left: o.offsetLeft + parseInt(a.borderLeftWidth),
		height: parseInt(a.lineHeight)
	};
	return document.body.removeChild(r), s;
}
//#endregion
//#region src/components/AutocompleteList.vue?vue&type=script&setup=true&lang.ts
var Ki = { class: "autocomplete-list" }, qi = {
	key: 0,
	class: "loading-item"
}, Ji = {
	key: 1,
	class: "no-results"
}, Yi = ["onClick"], Xi = { class: "item-left" }, Zi = { class: "item-name" }, Qi = {
	key: 0,
	class: "item-alias"
}, $i = { class: "item-right" }, ea = { class: "item-count" }, ta = /* @__PURE__ */ Q(/* @__PURE__ */ A({
	__name: "AutocompleteList",
	props: {
		items: {},
		selectedIndex: {},
		loading: { type: Boolean }
	},
	emits: ["select"],
	setup(e, { emit: i }) {
		let a = i, { t: s } = N(), c = (e) => {
			a("select", e);
		}, u = (e) => X.getInstance().getColor(e), d = (e) => {
			let t = Number(e);
			return t >= 1e6 ? (t / 1e6).toFixed(1) + "M" : t >= 1e3 ? (t / 1e3).toFixed(1) + "k" : t.toString();
		};
		return (i, a) => (r(), y("div", Ki, [e.loading ? (r(), y("div", qi, [f(o(q), {
			icon: "mdi:loading",
			class: "spin"
		}), v(" " + t(o(s)("editor.loading")), 1)])) : e.items.length === 0 ? (r(), y("div", Ji, t(o(s)("editor.noMatches")), 1)) : (r(!0), y(C, { key: 2 }, n(e.items, (n, i) => (r(), y("div", {
			key: n.name,
			class: l(["menu-item", { selected: i === e.selectedIndex }]),
			onClick: (e) => c(n),
			onMousedown: a[0] ||= h(() => {}, ["prevent"])
		}, [_("div", Xi, [
			_("div", {
				class: "category-dot",
				style: M({ backgroundColor: u(n.category) })
			}, null, 4),
			_("span", Zi, t(n.name), 1),
			n.alias_match ? (r(), y("span", Qi, "(" + t(n.alias_match) + ")", 1)) : w("", !0)
		]), _("div", $i, [_("span", ea, t(d(n.post_count)), 1)])], 42, Yi))), 128))]));
	}
}), [["__scopeId", "data-v-7fa181e7"]]), na = ["title"], ra = {
	key: 0,
	class: "tag-weight"
}, ia = ["title"], aa = { class: "weight-value" }, oa = ["title"], sa = ["title"], ca = /* @__PURE__ */ Q(/* @__PURE__ */ A({
	__name: "TagItem",
	props: { tag: {} },
	emits: [
		"remove",
		"update:weight",
		"toggle:enabled"
	],
	setup(e, { emit: n }) {
		let a = e, s = n, { t: c } = N(), d = g(() => X.getInstance().getColor(a.tag.category || 0)), p = g(() => a.tag.weight !== 1), m = g(() => {
			let e = J.tagMaxLength, t = a.tag.text;
			return e > 0 && t.length > e ? t.substring(0, e) + "..." : t;
		}), v = () => {
			s("remove", a.tag.id);
		}, b = () => {
			s("toggle:enabled", a.tag.id);
		}, S = () => {
			let e = Math.min(a.tag.weight + .1, 2);
			s("update:weight", a.tag.id, parseFloat(e.toFixed(1)));
		}, C = () => {
			let e = Math.max(a.tag.weight - .1, .1);
			s("update:weight", a.tag.id, parseFloat(e.toFixed(1)));
		}, T = i(!1), D = i(null), O = i(""), k = async () => {
			O.value = a.tag.weight.toString(), T.value = !0, await u(), D.value?.focus(), D.value?.select();
		}, A = () => {
			if (!T.value) return;
			let e = parseFloat(O.value);
			!isNaN(e) && e >= 0 && s("update:weight", a.tag.id, parseFloat(e.toFixed(2))), T.value = !1;
		}, j = (e) => {
			e.key === "Enter" ? A() : e.key === "Escape" && (T.value = !1);
		};
		return (n, i) => (r(), y("div", {
			class: l(["tag-item", { disabled: !e.tag.enabled }]),
			style: M({ "--category-color": d.value }),
			onDblclick: h(k, ["stop"])
		}, [
			i[2] ||= _("div", { class: "tag-dot" }, null, -1),
			_("span", {
				class: "tag-text",
				title: e.tag.text,
				onClick: b
			}, t(m.value), 9, na),
			p.value && !T.value ? (r(), y("div", ra, [
				_("button", {
					class: "weight-btn",
					onClick: C,
					title: o(c)("editor.decreaseWeight")
				}, [f(o(q), { icon: "mdi:minus" })], 8, ia),
				_("span", aa, t(e.tag.weight.toFixed(1)), 1),
				_("button", {
					class: "weight-btn",
					onClick: S,
					title: o(c)("editor.increaseWeight")
				}, [f(o(q), { icon: "mdi:plus" })], 8, oa)
			])) : w("", !0),
			T.value ? x((r(), y("input", {
				key: 1,
				ref_key: "weightInput",
				ref: D,
				"onUpdate:modelValue": i[0] ||= (e) => O.value = e,
				class: "weight-input",
				onBlur: A,
				onKeydown: j,
				onClick: i[1] ||= h(() => {}, ["stop"])
			}, null, 544)), [[E, O.value]]) : w("", !0),
			_("button", {
				class: "tag-remove",
				onClick: v,
				title: o(c)("editor.removeTag")
			}, [f(o(q), { icon: "mdi:close" })], 8, sa)
		], 38));
	}
}), [["__scopeId", "data-v-2cba916c"]]), la = { class: "visual-tag-area" }, ua = {
	key: 0,
	class: "empty-state"
}, da = {
	key: 1,
	class: "tags-scroller"
}, fa = ["onDragstart", "onDragenter"], pa = /* @__PURE__ */ Q(/* @__PURE__ */ A({
	__name: "VisualTagArea",
	props: { tags: {} },
	emits: ["update:tags"],
	setup(t, { emit: a }) {
		let o = t, s = a, c = i([]), l = i(null);
		S(() => o.tags, (e) => {
			l.value === null && (c.value = [...e]);
		}, { immediate: !0 });
		let u = (e) => {
			let t = c.value.filter((t) => t.id !== e);
			c.value = t, s("update:tags", t);
		}, d = (e, t) => {
			let n = c.value.map((n) => n.id === e ? {
				...n,
				weight: t
			} : n);
			c.value = n, s("update:tags", n);
		}, p = (e) => {
			let t = c.value.map((t) => t.id === e ? {
				...t,
				enabled: !t.enabled
			} : t);
			c.value = t, s("update:tags", t);
		}, m = (e, t) => {
			l.value = t, e.dataTransfer && (e.dataTransfer.effectAllowed = "move");
		}, h = (e) => {
			e.preventDefault(), e.dataTransfer && (e.dataTransfer.dropEffect = "move");
		}, g = (e) => {
			if (l.value !== null && l.value !== e) {
				let t = l.value, n = e, r = c.value[t], i = [...c.value];
				i.splice(t, 1), i.splice(n, 0, r), c.value = i, l.value = n;
			}
		}, v = () => {
			l.value !== null && (s("update:tags", c.value), l.value = null);
		};
		return (t, i) => (r(), y("div", la, [c.value.length === 0 ? (r(), y("div", ua, [...i[0] ||= [_("p", null, "No tags yet. Start typing in the editor...", -1)]])) : (r(), y("div", da, [f(O, {
			name: "tag-list",
			tag: "div",
			class: "tags-container"
		}, {
			default: e(() => [(r(!0), y(C, null, n(c.value, (e, t) => (r(), y("div", {
				key: e.id,
				class: "tag-wrapper",
				draggable: "true",
				onDragstart: (e) => m(e, t),
				onDragover: h,
				onDragenter: (e) => g(t),
				onDragend: v
			}, [f(ca, {
				tag: e,
				onRemove: u,
				"onUpdate:weight": d,
				"onToggle:enabled": p
			}, null, 8, ["tag"])], 40, fa))), 128))]),
			_: 1
		})]))]));
	}
}), [["__scopeId", "data-v-5d3d64b5"]]), ma = { class: "toolbar" }, ha = ["title"], ga = ["title"], _a = { class: "switch-group" }, va = { class: "switch-label" }, ya = { class: "switch" }, ba = ["checked"], xa = ["title"], Sa = {
	key: 0,
	class: "meta-popup"
}, Ca = { class: "meta-search-box" }, wa = ["placeholder"], Ta = { class: "meta-list-scroll" }, Ea = ["onClick"], Da = { class: "meta-name" }, Oa = {
	key: 0,
	class: "meta-empty"
}, ka = { class: "meta-footer" }, Aa = { class: "meta-footer-hint" }, ja = { class: "tag-count" }, Ma = /* @__PURE__ */ Q(/* @__PURE__ */ A({
	__name: "OtherFunctions",
	props: {
		tagCount: {},
		autoMeta: { type: Boolean }
	},
	emits: [
		"open-search",
		"format",
		"organize",
		"update:autoMeta",
		"insert-meta"
	],
	setup(e, { emit: a }) {
		let { t: s } = N(), c = i(!1), u = i(null), p = i(""), m = () => {
			c.value = !c.value, c.value && ($.fetchPresets(), p.value = "");
		}, v = (e) => {
			u.value && !u.value.contains(e.target) && (c.value = !1);
		};
		j(() => {
			document.addEventListener("click", v), $.fetchPresets();
		}), d(() => {
			document.removeEventListener("click", v);
		});
		let b = g(() => {
			let e = p.value.toLowerCase().trim();
			return e ? $.presets.value.filter((t) => t.name.toLowerCase().includes(e)) : $.presets.value;
		}), S = (e) => {
			$.setActivePreset(e), c.value = !1;
		};
		return (i, a) => (r(), y("div", ma, [
			_("button", {
				class: "toolbar-btn",
				onClick: a[0] ||= (e) => i.$emit("format"),
				title: o(s)("editor.formatTitle") || "Format Text"
			}, [f(o(q), { icon: "mdi:format-align-left" }), _("span", null, t(o(s)("editor.format") || "Format"), 1)], 8, ha),
			_("button", {
				class: "toolbar-btn",
				onClick: a[1] ||= (e) => i.$emit("organize"),
				title: o(s)("editor.organizeTitle") || "Organize Tags"
			}, [f(o(q), { icon: "mdi:sort" }), _("span", null, t(o(s)("editor.organize") || "Organize"), 1)], 8, ga),
			a[6] ||= _("div", { class: "separator" }, null, -1),
			_("div", _a, [_("label", va, t(o(s)("editor.autoMeta") || "Auto Meta"), 1), _("label", ya, [_("input", {
				type: "checkbox",
				checked: e.autoMeta,
				onChange: a[2] ||= (e) => i.$emit("update:autoMeta", e.target.checked)
			}, null, 40, ba), a[5] ||= _("span", { class: "slider" }, null, -1)])]),
			_("div", {
				class: "meta-menu-wrapper",
				ref_key: "metaMenuRef",
				ref: u
			}, [_("button", {
				class: "toolbar-btn icon-only",
				onClick: h(m, ["stop"]),
				title: o(s)("editor.qualityWords") || "Select Meta Preset"
			}, [f(o(q), { icon: "mdi:cog" })], 8, xa), c.value ? (r(), y("div", Sa, [
				_("div", Ca, [x(_("input", {
					"onUpdate:modelValue": a[3] ||= (e) => p.value = e,
					placeholder: o(s)("settings.meta.searchPlaceholder"),
					class: "meta-search-input"
				}, null, 8, wa), [[E, p.value]])]),
				_("div", Ta, [(r(!0), y(C, null, n(b.value, (e) => (r(), y("div", {
					key: e.id,
					class: l(["meta-item", { active: o($).activePresetId.value === e.id }]),
					onClick: (t) => S(e.id)
				}, [_("span", Da, t(e.name), 1), o($).activePresetId.value === e.id ? (r(), D(o(q), {
					key: 0,
					icon: "mdi:check"
				})) : w("", !0)], 10, Ea))), 128)), b.value.length === 0 ? (r(), y("div", Oa, t(o(s)("settings.meta.noPresetsFound")), 1)) : w("", !0)]),
				_("div", ka, [_("span", Aa, t(o(s)("settings.meta.editInSettings")), 1)])
			])) : w("", !0)], 512),
			a[7] ||= _("div", { class: "separator" }, null, -1),
			_("button", {
				class: "toolbar-btn",
				onClick: a[4] ||= (e) => i.$emit("open-search")
			}, [f(o(q), { icon: "mdi:magnify" }), _("span", null, t(o(s)("editor.searchBtn")), 1)]),
			a[8] ||= _("div", { class: "separator" }, null, -1),
			_("div", ja, [f(o(q), { icon: "mdi:tag-multiple" }), _("span", null, t(o(s)("editor.tagCount")) + t(e.tagCount || 0), 1)])
		]));
	}
}), [["__scopeId", "data-v-92303e18"]]), Na = { class: "modal-container" }, Pa = { class: "modal-header" }, Fa = { class: "modal-title" }, Ia = ["title"], La = { class: "search-section" }, Ra = { class: "search-box" }, za = ["placeholder"], Ba = { class: "category-filters" }, Va = { class: "filter-label" }, Ha = ["onClick"], Ua = { class: "results-section" }, Wa = {
	key: 0,
	class: "loading-state"
}, Ga = {
	key: 1,
	class: "empty-state"
}, Ka = {
	key: 2,
	class: "results-list"
}, qa = ["onClick"], Ja = { class: "tag-info" }, Ya = { class: "tag-name-row" }, Xa = { class: "tag-name" }, Za = ["innerHTML"], Qa = ["innerHTML"], $a = ["innerHTML"], eo = { class: "tag-meta" }, to = { class: "category-label" }, no = { class: "post-count" }, ro = { class: "actions" }, io = ["onClick", "title"], ao = ["title"], oo = {
	key: 3,
	class: "hint-state"
}, so = /* @__PURE__ */ Q(/* @__PURE__ */ A({
	__name: "TagSearchModal",
	props: { visible: { type: Boolean } },
	emits: ["close", "add-tag"],
	setup(a, { emit: s }) {
		let c = a, { t: u } = N(), d = s, p = i(""), m = i([]), b = i(!1), O = i([]), k = g(() => {
			let e = X.getInstance().getAll();
			return e.length === 0 ? [] : e.map((e) => ({
				value: e.value,
				label: e.value <= 5 ? u(`search.categories.${e.label.toLowerCase()}`) : e.label,
				color: e.color
			}));
		}), A = (e) => {
			let t = O.value.indexOf(e);
			t > -1 ? O.value.splice(t, 1) : O.value.push(e), p.value.trim() && P();
		}, j = (e) => O.value.includes(e), P = async () => {
			let e = p.value.trim();
			if (!e || e.length < 2) {
				m.value = [];
				return;
			}
			b.value = !0;
			try {
				m.value = await Wi.getInstance().searchTags(e, 50, !0, O.value);
			} catch (e) {
				console.error("Search error:", e), m.value = [];
			} finally {
				b.value = !1;
			}
		}, F = null, I = () => {
			F && clearTimeout(F), F = setTimeout(() => {
				P();
			}, 300);
		}, L = (e) => {
			d("add-tag", e.name, e.category);
		}, R = () => {
			d("close");
		};
		S(() => c.visible, (e) => {
			e ? X.getInstance().init() : (p.value = "", m.value = [], O.value = []);
		});
		let z = (e) => {
			let t = X.getInstance().getCategory(e);
			return t.value <= 5 ? u(`search.categories.${t.label.toLowerCase()}`) : t.label;
		}, B = (e) => X.getInstance().getColor(e), V = (e) => e?.toLocaleString() || "0", H = (e, t) => {
			if (!t || !e) return e;
			let n = RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
			return e.replace(n, "<strong class=\"match-bold\">$1</strong>");
		}, U = (e) => e.priority === 1, W = async (e, t) => {
			t.stopPropagation();
			let n = U(e);
			e.priority = n ? 4 : 1;
			try {
				let t = {
					name: e.name,
					is_liked: !n,
					category: e.category,
					post_count: e.post_count,
					alias: e.alias
				};
				await fetch("/simple-prompt/toggle-like-tag", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(t)
				});
			} catch (t) {
				console.error("Toggle like failed", t), e.priority = n ? 1 : 4;
			}
		};
		return (i, s) => (r(), D(T, { name: "fade" }, {
			default: e(() => [a.visible ? (r(), y("div", {
				key: 0,
				class: "modal-overlay",
				onClick: h(R, ["self"])
			}, [_("div", Na, [
				_("div", Pa, [_("div", Fa, [f(o(q), {
					icon: "mdi:database-search",
					class: "title-icon"
				}), _("span", null, t(o(u)("search.title")), 1)]), _("button", {
					class: "close-btn",
					onClick: R,
					title: o(u)("common.close")
				}, [f(o(q), { icon: "mdi:close" })], 8, Ia)]),
				_("div", La, [_("div", Ra, [
					f(o(q), {
						icon: "mdi:magnify",
						class: "search-icon"
					}),
					x(_("input", {
						"onUpdate:modelValue": s[0] ||= (e) => p.value = e,
						type: "text",
						placeholder: o(u)("search.placeholder"),
						class: "search-input",
						onInput: I,
						autofocus: ""
					}, null, 40, za), [[E, p.value]]),
					p.value ? (r(), y("button", {
						key: 0,
						class: "clear-btn",
						onClick: s[1] ||= (e) => {
							p.value = "", m.value = [];
						},
						title: "Clear"
					}, [f(o(q), { icon: "mdi:close-circle" })])) : w("", !0)
				]), _("div", Ba, [_("span", Va, t(o(u)("search.filterLabel")), 1), (r(!0), y(C, null, n(k.value, (e) => (r(), y("button", {
					key: e.value,
					class: l(["category-chip", { active: j(e.value) }]),
					style: M({ "--category-color": e.color }),
					onClick: (t) => A(e.value)
				}, [_("span", {
					class: "category-dot",
					style: M({ backgroundColor: e.color })
				}, null, 4), v(" " + t(e.label), 1)], 14, Ha))), 128))])]),
				_("div", Ua, [b.value ? (r(), y("div", Wa, [f(o(q), {
					icon: "mdi:loading",
					class: "spin"
				}), _("span", null, t(o(u)("search.loading")), 1)])) : m.value.length === 0 && p.value.trim() ? (r(), y("div", Ga, [f(o(q), { icon: "mdi:magnify-close" }), _("p", null, t(o(u)("search.noResults")), 1)])) : m.value.length > 0 ? (r(), y("div", Ka, [(r(!0), y(C, null, n(m.value, (e) => (r(), y("div", {
					key: e.name,
					class: "result-item",
					style: M({ "--cat-color": B(e.category) }),
					onClick: (t) => L(e)
				}, [_("div", Ja, [_("div", Ya, [s[2] ||= _("span", { class: "category-indicator" }, null, -1), _("span", Xa, [e.matched_alias ? (r(), y(C, { key: 1 }, [_("span", { innerHTML: H(e.name, p.value) }, null, 8, Qa), _("span", {
					class: "alias-indicator",
					innerHTML: H(e.matched_alias, p.value)
				}, null, 8, $a)], 64)) : (r(), y("span", {
					key: 0,
					innerHTML: H(e.name, p.value)
				}, null, 8, Za))])]), _("div", eo, [_("span", to, t(z(e.category)), 1), _("span", no, [f(o(q), { icon: "mdi:image-multiple" }), v(" " + t(V(e.post_count)), 1)])])]), _("div", ro, [_("button", {
					class: l(["action-btn like-btn", { liked: U(e) }]),
					onClick: (t) => W(e, t),
					title: U(e) ? "Unlike" : "Like"
				}, [f(o(q), { icon: U(e) ? "mdi:heart" : "mdi:heart-outline" }, null, 8, ["icon"])], 10, io), _("button", {
					class: "action-btn add-btn",
					title: o(u)("search.addBtnTitle")
				}, [f(o(q), { icon: "mdi:plus" })], 8, ao)])], 12, qa))), 128))])) : (r(), y("div", oo, [f(o(q), { icon: "mdi:information-outline" }), _("p", null, t(o(u)("search.hint")), 1)]))])
			])])) : w("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-c0eb3703"]]);
//#endregion
//#region src/utils/promptParser.ts
function co(e) {
	if (!e.trim()) return [];
	let t = [], n = 0, r = 0, i = "", a = "", o = "";
	for (; r < e.length;) {
		let s = e[r];
		if (s === "\\" && r + 1 < e.length) {
			let t = e[r + 1];
			if (t === "(" || t === ")") {
				i += t, r += 2;
				continue;
			} else {
				i += s, r++;
				continue;
			}
		}
		if (s === "(") {
			i.trim() && (t.push({
				id: `tag-${n++}`,
				text: i.trim(),
				weight: 1,
				enabled: !0,
				category: Y.GENERAL
			}), i = "");
			let s = 1, c = r + 1;
			for (; c < e.length && s > 0;) {
				if (e[c] === "\\" && c + 1 < e.length) {
					c += 2;
					continue;
				}
				e[c] === "(" && s++, e[c] === ")" && s--, c++;
			}
			if (s === 0) {
				let s = e.substring(r + 1, c - 1), l = s.indexOf(":");
				if (l > 0) {
					o = s.substring(0, l).trim(), o = o.replace(/\\([()])/g, "$1"), a = s.substring(l + 1).trim();
					let e = parseFloat(a);
					!isNaN(e) && o && t.push({
						id: `tag-${n++}`,
						text: o,
						weight: e,
						enabled: !0,
						category: Y.GENERAL
					});
				} else i += e.substring(r, c);
				r = c;
				continue;
			}
		}
		if (s === "," || s === "\n") {
			i.trim() && (t.push({
				id: `tag-${n++}`,
				text: i.trim(),
				weight: 1,
				enabled: !0,
				category: Y.GENERAL
			}), i = ""), r++;
			continue;
		}
		i += s, r++;
	}
	return i.trim() && t.push({
		id: `tag-${n++}`,
		text: i.trim(),
		weight: 1,
		enabled: !0,
		category: Y.GENERAL
	}), t;
}
function lo(e) {
	let t = e.filter((e) => e.enabled);
	return t.length === 0 ? "" : t.map((e) => {
		let t = e.text.replace(/(?<!\\)\(/g, "\\(").replace(/(?<!\\)\)/g, "\\)");
		return e.weight === 1 ? t : `(${t}:${e.weight.toFixed(1)})`;
	}).join(", ") + ",";
}
function uo(e, t, n) {
	if (!t.length) return e;
	let r = new Set(t.map((e) => e.toLowerCase())), i = new Set(n.map((e) => e.toLowerCase())), a = [], o = 0, s = 0, c = "", l = (e, t, n, r) => {
		let i = e.trim();
		if (!i) return;
		let o = i.match(/^\((.+):(\d+\.?\d*)\)$/), s = i, c = 1;
		o && (s = o[1].trim(), c = parseFloat(o[2]));
		let l = s.replace(/\\([()])/g, "$1");
		a.push({
			text: l,
			fullMatch: t,
			start: n,
			end: r,
			weight: c
		});
	};
	for (; o < e.length;) {
		let t = e[o];
		if (t === "(" && c.trim() === "") {
			let t = 1, n = o + 1;
			for (; n < e.length && t > 0;) {
				if (e[n] === "\\" && n + 1 < e.length) {
					n += 2;
					continue;
				}
				e[n] === "(" && t++, e[n] === ")" && t--, n++;
			}
			if (t === 0) {
				let t = e.substring(o, n);
				e.substring(o + 1, n - 1), l(t, t, o, n), o = n, s = n, c = "";
				continue;
			}
		}
		if (t === "\\" && o + 1 < e.length) {
			c += t + e[o + 1], o += 2;
			continue;
		}
		if (t === "," || t === "\n") {
			c.trim() && l(c.trim(), c, s, o), o++, s = o, c = "";
			continue;
		}
		c += t, o++;
	}
	c.trim() && l(c.trim(), c, s, o);
	let u = [], d = /* @__PURE__ */ new Map(), f = e.length;
	for (let e of a) {
		let t = e.text.toLowerCase();
		r.has(t) && (u.push(e), d.set(t, e.weight)), i.has(t) && e.start < f && (f = e.start);
	}
	let p = [...u].sort((e, t) => t.start - e.start), m = e;
	for (let e of p) {
		let t = e.start, n = e.end;
		for (; t > 0 && /[\s,]/.test(m[t - 1]);) t--;
		for (; n < m.length && m[n] === " ";) n++;
		if (n < m.length && m[n] === ",") for (n++; n < m.length && m[n] === " ";) n++;
		m = m.substring(0, t) + m.substring(n);
		let r = n - t;
		f > e.start && (f -= r);
	}
	m = m.replace(/,\s*,/g, ","), m = m.replace(/,\s*\n/g, ",\n"), m = m.replace(/\n\s*,/g, "\n");
	let h = t.map((e) => {
		let t = d.get(e.toLowerCase()) || 1, n = e.replace(/\(/g, "\\(").replace(/\)/g, "\\)");
		return t === 1 ? n : `(${n}:${t.toFixed(1)})`;
	}).join(", ") + ",", g = co(m), _ = m.length;
	for (let e = 0; e < g.length; e++) {
		let t = g[e].text.toLowerCase();
		if (i.has(t)) {
			for (let e of n) {
				let t = e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), n = RegExp(`(^|[,\\n\\s])${t}([,\\n]|$)`, "i"), r = m.match(n);
				if (r && r.index !== void 0) {
					let e = r.index + r[1].length;
					e < _ && (_ = e);
				}
			}
			break;
		}
	}
	let v = m.substring(0, _).trimEnd(), y = m.substring(_);
	return v && !v.endsWith(",") && !v.endsWith("\n") && (v += ","), v && !v.endsWith("\n\n") && (v.endsWith("\n") ? v += "\n" : v += "\n\n"), y.trim() && !y.startsWith("\n") && (y = "\n\n" + y.trimStart()), v + h + y;
}
//#endregion
//#region src/components/TextEditor.vue?vue&type=script&setup=true&lang.ts
var fo = { class: "sp-toolbar" }, po = ["title"], mo = ["title"], ho = ["placeholder"], go = { class: "sp-visual-area" }, _o = { class: "sp-footer" }, vo = 300, yo = /* @__PURE__ */ Q(/* @__PURE__ */ A({
	__name: "TextEditor",
	props: { modelValue: {
		type: String,
		default: ""
	} },
	emits: [
		"update:modelValue",
		"cursor-move",
		"open-custom-tag"
	],
	setup(e, { expose: n, emit: a }) {
		let s = e, c = a, { t: l } = N(), p = i(null), m = i(null), h = i(s.modelValue), g = i([]), b = i(60), C = i(!1), T = i({}), D = /* @__PURE__ */ new Set(), O = null, k = null, A = 0, j = () => {
			O && clearTimeout(O), O = setTimeout(async () => {
				let e = Array.from(D);
				if (D.clear(), e.length !== 0) try {
					let t = await Wi.getInstance().getTagsDetails(e);
					Object.entries(t).forEach(([e, t]) => {
						T.value[e.toLowerCase()] = t;
					}), e.forEach((e) => {
						let t = e.toLowerCase();
						T.value[t] === void 0 && (T.value[t] = 0);
					}), g.value = g.value.map((e) => {
						let t = e.text.toLowerCase();
						return T.value[t] === void 0 ? e : {
							...e,
							category: T.value[t]
						};
					});
				} catch (e) {
					console.error("Error fetching tag categories:", e);
				}
			}, 1e3);
		}, P = (e) => (e.forEach((e) => {
			let t = e.text.toLowerCase();
			T.value[t] === void 0 ? D.add(e.text) : e.category = T.value[t];
		}), D.size > 0 && j(), e), F = () => {
			k &&= (clearTimeout(k), null);
		}, I = (e) => {
			g.value = P(co(e));
		}, L = () => {
			F(), k = setTimeout(() => {
				k = null, I(h.value);
				let e = p.value;
				if (!e || document.activeElement !== e) {
					R.value = !1, W.value = !1;
					return;
				}
				ie(e);
			}, vo);
		};
		g.value = P(co(h.value));
		let R = i(!1), z = i([]), B = i(0), V = i({
			top: 0,
			left: 0
		}), H = i(""), U = i(0), W = i(!1), G = i(!1);
		S(() => s.modelValue, (e) => {
			e !== h.value && (F(), h.value = e, I(e), R.value = !1, z.value = [], B.value = 0, W.value = !1);
		});
		let ee = (e) => {
			let t = e.target;
			h.value = t.value, c("update:modelValue", t.value), R.value = !1, W.value = !1, z.value = [], B.value = 0, L();
		}, K = async () => {
			try {
				await navigator.clipboard.writeText(h.value), console.log("Copied to clipboard");
			} catch (e) {
				console.error("Failed to copy: ", e);
			}
		}, te = (e) => {
			C.value = !0, document.addEventListener("mousemove", ne), document.addEventListener("mouseup", re), document.body.style.userSelect = "none";
		}, ne = (e) => {
			if (!C.value || !m.value) return;
			let t = m.value.getBoundingClientRect(), n = (e.clientY - t.top) / t.height * 100;
			n < 20 && (n = 20), n > 80 && (n = 80), b.value = n;
		}, re = () => {
			C.value = !1, document.removeEventListener("mousemove", ne), document.removeEventListener("mouseup", re), document.body.style.userSelect = "";
		};
		d(() => {
			F(), O && clearTimeout(O), document.removeEventListener("mousemove", ne), document.removeEventListener("mouseup", re);
		});
		let ie = async (e) => {
			let t = e.selectionEnd, n = e.value.substring(0, t), r = /([a-zA-Z0-9_\u4e00-\u9fa5]{2,})$/.exec(n);
			if (r) {
				let n = r[1], i = ++A;
				H.value = n, U.value = r.index;
				let a = Gi(e, t);
				V.value = {
					top: a.top + a.height + 5,
					left: a.left
				}, W.value = !0, R.value = !0;
				try {
					console.log(`[Autocomplete] Searching for: "${n}"`);
					let e = await Wi.getInstance().searchTags(n, 20, J.useAliasesInAutocomplete);
					if (i !== A) return;
					z.value = e, B.value = 0;
				} catch (e) {
					i === A && console.error("Autocomplete search error:", e);
				} finally {
					i === A && (W.value = !1);
				}
			} else A++, R.value = !1, z.value = [], B.value = 0, H.value = "", W.value = !1;
		}, ae = (e) => {
			if (R.value && z.value.length > 0) {
				if (e.key === "ArrowUp") {
					e.preventDefault(), B.value = (B.value - 1 + z.value.length) % z.value.length;
					return;
				}
				if (e.key === "ArrowDown") {
					e.preventDefault(), B.value = (B.value + 1) % z.value.length;
					return;
				}
				if (e.key === "Tab" || e.key === "Enter") {
					e.preventDefault(), oe(z.value[B.value]);
					return;
				}
				if (e.key === "Escape") {
					e.preventDefault(), R.value = !1;
					return;
				}
			}
		}, oe = (e) => {
			if (!p.value) return;
			F();
			let t = p.value, n = t.selectionEnd, r = h.value, i = e.name;
			e.category !== void 0 && (T.value[i.toLowerCase()] = e.category), J.convertUnderscoreToSpace && (i = i.replace(/_/g, " "), e.category !== void 0 && (T.value[i.toLowerCase()] = e.category)), J.escapeBrackets && (i = i.replace(/\(/g, "\\(").replace(/\)/g, "\\)"));
			let a = r.substring(0, U.value), o = r.substring(n), s = o;
			!o.trim().startsWith(",") && !o.trim().startsWith(")") && (s = ", " + o);
			let l = a + i + s;
			h.value = l, c("update:modelValue", l), I(l), R.value = !1, u(() => {
				let e = a.length + i.length + (s.startsWith(", ") ? 2 : 0);
				t.setSelectionRange(e, e), t.focus();
			});
		}, se = () => {
			setTimeout(() => {
				R.value = !1;
			}, 200);
		}, ce = () => {
			G.value = !0;
		}, le = () => {
			G.value = !1;
		}, ue = (e, t) => {
			F();
			let n = e;
			T.value[e.toLowerCase()] = t, J.convertUnderscoreToSpace && (n = n.replace(/_/g, " "), T.value[n.toLowerCase()] = t), J.escapeBrackets && (n = n.replace(/\(/g, "\\(").replace(/\)/g, "\\)"));
			let r = {
				id: `tag-${Date.now()}-${Math.random()}`,
				text: n,
				weight: 1,
				enabled: !0,
				category: t
			}, i = [...g.value, r];
			g.value = i;
			let a = lo(i);
			h.value = a, c("update:modelValue", a);
		}, de = () => {
			p.value?.focus();
		}, fe = () => {
			F();
			let e = h.value;
			e = e.replace(/,(\S)/g, ", $1"), e !== h.value && (h.value = e, c("update:modelValue", e), I(e));
		}, pe = (e) => {
			let t = {
				6: 0,
				4: 1,
				2: 1,
				3: 1,
				1: 2,
				0: 3,
				5: 4,
				7: 4
			};
			return t[e] === void 0 ? 3 : t[e];
		}, me = (e) => {
			if (e.length === 0) return "";
			let t = {
				0: [],
				1: [],
				2: [],
				3: [],
				4: []
			};
			e.forEach((e) => {
				t[pe(e.category === void 0 ? 0 : e.category)].push(e);
			}), t[1].sort((e, t) => {
				let n = e.category === void 0 ? 0 : e.category;
				return (t.category === void 0 ? 0 : t.category) - n;
			});
			let n = [
				0,
				1,
				2,
				3,
				4
			].map((e) => {
				let n = t[e];
				return n.length === 0 ? "" : lo(n);
			}), r = "", i = n.slice(0, 3).filter((e) => e).join("\n");
			return i && (r += i), r && n[3] && (r += "\n\n"), n[3] && (r += n[3]), r && n[4] && (r += "\n\n"), n[4] && (r += n[4]), r;
		}, he = (e) => {
			F(), g.value = e;
			let t = e.some((e) => e.category !== void 0 && e.category !== 0) ? me(e) : lo(e);
			t !== h.value && (h.value = t, c("update:modelValue", t));
		}, ge = async () => {
			F();
			let e = P(co(h.value));
			if (D.size > 0) {
				O && clearTimeout(O);
				let t = Array.from(D);
				D.clear();
				try {
					let n = await Wi.getInstance().getTagsDetails(t);
					Object.entries(n).forEach(([e, t]) => {
						T.value[e.toLowerCase()] = t;
					}), t.forEach((e) => {
						let t = e.toLowerCase();
						T.value[t] === void 0 && (T.value[t] = 0);
					}), e.forEach((e) => {
						let t = e.text.toLowerCase();
						T.value[t] !== void 0 && (e.category = T.value[t]);
					});
				} catch (e) {
					console.error("Error fetching tag categories during organize:", e);
				}
			}
			let t = me(e);
			t !== h.value && (h.value = t, c("update:modelValue", t), g.value = co(t).map((t) => {
				let n = e.find((e) => e.text === t.text);
				return n ? {
					...t,
					category: n.category
				} : t;
			}));
		}, _e = (e) => {
			let t = p.value;
			if (!t) return;
			F();
			let n = t.selectionStart, r = t.selectionEnd, i = h.value, a = e, o = i.substring(n - 1, n);
			o && o.trim() && o !== "," ? a = ", " + a : o === "," && (a = " " + a);
			let s = i.substring(0, n) + a + i.substring(r);
			h.value = s, c("update:modelValue", s), I(s), u(() => {
				t.focus(), t.setSelectionRange(n + a.length, n + a.length);
			});
		}, ve = (e) => {
			J.autoMetaEnabled = e;
		};
		return n({ focus: de }), (e, n) => (r(), y("div", {
			class: "sp-editor-container",
			ref_key: "containerRef",
			ref: m
		}, [
			_("div", fo, [_("button", {
				class: "sp-btn",
				onClick: K,
				title: o(l)("editor.copyTitle")
			}, [n[2] ||= _("span", { class: "icon" }, "📋", -1), v(" " + t(o(l)("editor.copy")), 1)], 8, po), _("button", {
				class: "sp-btn",
				onClick: n[0] ||= (t) => e.$emit("open-custom-tag"),
				title: o(l)("customTag.addBtnTitle")
			}, [n[3] ||= _("span", { class: "icon" }, "➕", -1), v(" " + t(o(l)("customTag.addBtnTitle")), 1)], 8, mo)]),
			_("div", {
				class: "sp-editor-area",
				style: M({ height: `calc(${b.value}% - 40px)` })
			}, [x(_("textarea", {
				ref_key: "textareaRef",
				ref: p,
				class: "sp-textarea",
				"onUpdate:modelValue": n[1] ||= (e) => h.value = e,
				onInput: ee,
				onKeydown: ae,
				onBlur: se,
				placeholder: o(l)("editor.placeholder"),
				spellcheck: "false"
			}, null, 40, ho), [[E, h.value]]), R.value ? (r(), y("div", {
				key: 0,
				class: "autocomplete-wrapper",
				style: M({
					top: V.value.top + "px",
					left: V.value.left + "px"
				})
			}, [f(ta, {
				items: z.value,
				"selected-index": B.value,
				loading: W.value,
				onSelect: oe
			}, null, 8, [
				"items",
				"selected-index",
				"loading"
			])], 4)) : w("", !0)], 4),
			_("div", {
				class: "sp-splitter",
				onMousedown: te
			}, [...n[4] ||= [_("div", { class: "sp-splitter-handle" }, null, -1)]], 32),
			_("div", go, [f(pa, {
				tags: g.value,
				"onUpdate:tags": he
			}, null, 8, ["tags"])]),
			_("div", _o, [f(Ma, {
				"tag-count": g.value.length,
				"auto-meta": o(J).autoMetaEnabled,
				onOpenSearch: ce,
				onFormat: fe,
				onOrganize: ge,
				"onUpdate:autoMeta": ve,
				onInsertMeta: _e
			}, null, 8, ["tag-count", "auto-meta"])]),
			f(so, {
				visible: G.value,
				onClose: le,
				onAddTag: ue
			}, null, 8, ["visible"])
		], 512));
	}
}), [["__scopeId", "data-v-80816ac0"]]), bo = { style: {
	width: "100%",
	height: "100%"
} }, xo = /* @__PURE__ */ A({
	__name: "App",
	props: { initialPrompt: {} },
	emits: ["save", "close"],
	setup(t, { emit: n }) {
		let a = t, o = n, s = i(!0), c = i(a.initialPrompt), l = i("Initializing...");
		j(async () => {
			try {
				await Wi.getInstance().init(), await X.getInstance().init(), l.value = "Ready";
			} catch (e) {
				console.error("DB Error:", e), l.value = `Error: ${e}`;
			}
		});
		let u = () => {
			s.value = !1, o("close");
		}, d = async () => {
			let e = c.value;
			if (J.autoMetaEnabled) {
				$.presets.value.length === 0 && await $.fetchPresets();
				let t = $.getActiveTags();
				if (t.length > 0) {
					let n = co(e).map((e) => e.text), r = [];
					try {
						let e = await (await fetch("/simple-prompt/get-tags-details", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								names: n,
								fast: !0
							})
						})).json();
						r = n.filter((t) => e[t.toLowerCase()] === 7);
					} catch (e) {
						console.error("Failed to fetch tag categories:", e);
					}
					e = uo(e, t, r);
				}
			}
			o("save", e), s.value = !1;
		};
		return (t, n) => (r(), D(Ui, {
			visible: s.value,
			onClose: u,
			onSave: d
		}, {
			content: e(({ openCustomTag: e }) => [_("div", bo, [f(yo, {
				modelValue: c.value,
				"onUpdate:modelValue": n[0] ||= (e) => c.value = e,
				onOpenCustomTag: e
			}, null, 8, ["modelValue", "onOpenCustomTag"])])]),
			_: 1
		}, 8, ["visible"]));
	}
});
//#endregion
export { xo as default };
