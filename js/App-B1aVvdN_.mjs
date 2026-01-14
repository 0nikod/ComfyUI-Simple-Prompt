var bt = Object.defineProperty;
var yt = (e, n, s) => n in e ? bt(e, n, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[n] = s;
var xe = (e, n, s) => yt(e, typeof n != "symbol" ? n + "" : n, s);
import { defineComponent as W, ref as x, shallowRef as kt, onMounted as ye, watch as Y, onUnmounted as Me, h as Ue, nextTick as De, reactive as wt, createBlock as oe, openBlock as y, Transition as ke, withCtx as ce, createElementBlock as w, createCommentVNode as F, withModifiers as ie, createElementVNode as i, createVNode as k, unref as u, toDisplayString as m, withDirectives as H, createTextVNode as U, vModelText as ne, Fragment as K, renderList as Z, normalizeStyle as J, normalizeClass as ee, computed as fe, vModelCheckbox as ae, vModelSelect as Tt, renderSlot as Ct, TransitionGroup as xt } from "./vue.runtime.esm-bundler-DMW2pLBK.mjs";
import { u as X } from "./vue-i18n-CDK56dMz.mjs";
const et = /^[a-z0-9]+(-[a-z0-9]+)*$/, we = (e, n, s, o = "") => {
  const t = e.split(":");
  if (e.slice(0, 1) === "@") {
    if (t.length < 2 || t.length > 3)
      return null;
    o = t.shift().slice(1);
  }
  if (t.length > 3 || !t.length)
    return null;
  if (t.length > 1) {
    const d = t.pop(), c = t.pop(), r = {
      // Allow provider without '@': "provider:prefix:name"
      provider: t.length > 0 ? t[0] : o,
      prefix: c,
      name: d
    };
    return n && !me(r) ? null : r;
  }
  const a = t[0], l = a.split("-");
  if (l.length > 1) {
    const d = {
      provider: o,
      prefix: l.shift(),
      name: l.join("-")
    };
    return n && !me(d) ? null : d;
  }
  if (s && o === "") {
    const d = {
      provider: o,
      prefix: "",
      name: a
    };
    return n && !me(d, s) ? null : d;
  }
  return null;
}, me = (e, n) => e ? !!// Check prefix: cannot be empty, unless allowSimpleName is enabled
// Check name: cannot be empty
((n && e.prefix === "" || e.prefix) && e.name) : !1, tt = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
), be = Object.freeze({
  rotate: 0,
  vFlip: !1,
  hFlip: !1
}), Te = Object.freeze({
  ...tt,
  ...be
}), Ie = Object.freeze({
  ...Te,
  body: "",
  hidden: !1
});
function $t(e, n) {
  const s = {};
  !e.hFlip != !n.hFlip && (s.hFlip = !0), !e.vFlip != !n.vFlip && (s.vFlip = !0);
  const o = ((e.rotate || 0) + (n.rotate || 0)) % 4;
  return o && (s.rotate = o), s;
}
function Ve(e, n) {
  const s = $t(e, n);
  for (const o in Ie)
    o in be ? o in e && !(o in s) && (s[o] = be[o]) : o in n ? s[o] = n[o] : o in e && (s[o] = e[o]);
  return s;
}
function St(e, n) {
  const s = e.icons, o = e.aliases || /* @__PURE__ */ Object.create(null), t = /* @__PURE__ */ Object.create(null);
  function a(l) {
    if (s[l])
      return t[l] = [];
    if (!(l in t)) {
      t[l] = null;
      const d = o[l] && o[l].parent, c = d && a(d);
      c && (t[l] = [d].concat(c));
    }
    return t[l];
  }
  return Object.keys(s).concat(Object.keys(o)).forEach(a), t;
}
function Et(e, n, s) {
  const o = e.icons, t = e.aliases || /* @__PURE__ */ Object.create(null);
  let a = {};
  function l(d) {
    a = Ve(
      o[d] || t[d],
      a
    );
  }
  return l(n), s.forEach(l), Ve(e, a);
}
function st(e, n) {
  const s = [];
  if (typeof e != "object" || typeof e.icons != "object")
    return s;
  e.not_found instanceof Array && e.not_found.forEach((t) => {
    n(t, null), s.push(t);
  });
  const o = St(e);
  for (const t in o) {
    const a = o[t];
    a && (n(t, Et(e, t, a)), s.push(t));
  }
  return s;
}
const It = {
  provider: "",
  aliases: {},
  not_found: {},
  ...tt
};
function $e(e, n) {
  for (const s in n)
    if (s in e && typeof e[s] != typeof n[s])
      return !1;
  return !0;
}
function nt(e) {
  if (typeof e != "object" || e === null)
    return null;
  const n = e;
  if (typeof n.prefix != "string" || !e.icons || typeof e.icons != "object" || !$e(e, It))
    return null;
  const s = n.icons;
  for (const t in s) {
    const a = s[t];
    if (
      // Name cannot be empty
      !t || // Must have body
      typeof a.body != "string" || // Check other props
      !$e(
        a,
        Ie
      )
    )
      return null;
  }
  const o = n.aliases || /* @__PURE__ */ Object.create(null);
  for (const t in o) {
    const a = o[t], l = a.parent;
    if (
      // Name cannot be empty
      !t || // Parent must be set and point to existing icon
      typeof l != "string" || !s[l] && !o[l] || // Check other props
      !$e(
        a,
        Ie
      )
    )
      return null;
  }
  return n;
}
const Be = /* @__PURE__ */ Object.create(null);
function At(e, n) {
  return {
    provider: e,
    prefix: n,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function le(e, n) {
  const s = Be[e] || (Be[e] = /* @__PURE__ */ Object.create(null));
  return s[n] || (s[n] = At(e, n));
}
function ot(e, n) {
  return nt(n) ? st(n, (s, o) => {
    o ? e.icons[s] = o : e.missing.add(s);
  }) : [];
}
function Lt(e, n, s) {
  try {
    if (typeof s.body == "string")
      return e.icons[n] = { ...s }, !0;
  } catch {
  }
  return !1;
}
let pe = !1;
function it(e) {
  return typeof e == "boolean" && (pe = e), pe;
}
function Rt(e) {
  const n = typeof e == "string" ? we(e, !0, pe) : e;
  if (n) {
    const s = le(n.provider, n.prefix), o = n.name;
    return s.icons[o] || (s.missing.has(o) ? null : void 0);
  }
}
function Mt(e, n) {
  const s = we(e, !0, pe);
  if (!s)
    return !1;
  const o = le(s.provider, s.prefix);
  return n ? Lt(o, s.name, n) : (o.missing.add(s.name), !0);
}
function Dt(e, n) {
  if (typeof e != "object")
    return !1;
  if (typeof n != "string" && (n = e.provider || ""), pe && !n && !e.prefix) {
    let t = !1;
    return nt(e) && (e.prefix = "", st(e, (a, l) => {
      Mt(a, l) && (t = !0);
    })), t;
  }
  const s = e.prefix;
  if (!me({
    prefix: s,
    name: "a"
  }))
    return !1;
  const o = le(n, s);
  return !!ot(o, e);
}
const at = Object.freeze({
  width: null,
  height: null
}), lt = Object.freeze({
  // Dimensions
  ...at,
  // Transformations
  ...be
}), Pt = /(-?[0-9.]*[0-9]+[0-9.]*)/g, Ot = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function He(e, n, s) {
  if (n === 1)
    return e;
  if (s = s || 100, typeof e == "number")
    return Math.ceil(e * n * s) / s;
  if (typeof e != "string")
    return e;
  const o = e.split(Pt);
  if (o === null || !o.length)
    return e;
  const t = [];
  let a = o.shift(), l = Ot.test(a);
  for (; ; ) {
    if (l) {
      const d = parseFloat(a);
      isNaN(d) ? t.push(a) : t.push(Math.ceil(d * n * s) / s);
    } else
      t.push(a);
    if (a = o.shift(), a === void 0)
      return t.join("");
    l = !l;
  }
}
function Ft(e, n = "defs") {
  let s = "";
  const o = e.indexOf("<" + n);
  for (; o >= 0; ) {
    const t = e.indexOf(">", o), a = e.indexOf("</" + n);
    if (t === -1 || a === -1)
      break;
    const l = e.indexOf(">", a);
    if (l === -1)
      break;
    s += e.slice(t + 1, a).trim(), e = e.slice(0, o).trim() + e.slice(l + 1);
  }
  return {
    defs: s,
    content: e
  };
}
function Nt(e, n) {
  return e ? "<defs>" + e + "</defs>" + n : n;
}
function jt(e, n, s) {
  const o = Ft(e);
  return Nt(o.defs, n + o.content + s);
}
const Ut = (e) => e === "unset" || e === "undefined" || e === "none";
function Vt(e, n) {
  const s = {
    ...Te,
    ...e
  }, o = {
    ...lt,
    ...n
  }, t = {
    left: s.left,
    top: s.top,
    width: s.width,
    height: s.height
  };
  let a = s.body;
  [s, o].forEach((f) => {
    const g = [], C = f.hFlip, E = f.vFlip;
    let I = f.rotate;
    C ? E ? I += 2 : (g.push(
      "translate(" + (t.width + t.left).toString() + " " + (0 - t.top).toString() + ")"
    ), g.push("scale(-1 1)"), t.top = t.left = 0) : E && (g.push(
      "translate(" + (0 - t.left).toString() + " " + (t.height + t.top).toString() + ")"
    ), g.push("scale(1 -1)"), t.top = t.left = 0);
    let S;
    switch (I < 0 && (I -= Math.floor(I / 4) * 4), I = I % 4, I) {
      case 1:
        S = t.height / 2 + t.top, g.unshift(
          "rotate(90 " + S.toString() + " " + S.toString() + ")"
        );
        break;
      case 2:
        g.unshift(
          "rotate(180 " + (t.width / 2 + t.left).toString() + " " + (t.height / 2 + t.top).toString() + ")"
        );
        break;
      case 3:
        S = t.width / 2 + t.left, g.unshift(
          "rotate(-90 " + S.toString() + " " + S.toString() + ")"
        );
        break;
    }
    I % 2 === 1 && (t.left !== t.top && (S = t.left, t.left = t.top, t.top = S), t.width !== t.height && (S = t.width, t.width = t.height, t.height = S)), g.length && (a = jt(
      a,
      '<g transform="' + g.join(" ") + '">',
      "</g>"
    ));
  });
  const l = o.width, d = o.height, c = t.width, r = t.height;
  let p, h;
  l === null ? (h = d === null ? "1em" : d === "auto" ? r : d, p = He(h, c / r)) : (p = l === "auto" ? c : l, h = d === null ? He(p, r / c) : d === "auto" ? r : d);
  const b = {}, v = (f, g) => {
    Ut(g) || (b[f] = g.toString());
  };
  v("width", p), v("height", h);
  const _ = [t.left, t.top, c, r];
  return b.viewBox = _.join(" "), {
    attributes: b,
    viewBox: _,
    body: a
  };
}
const Bt = /\sid="(\S+)"/g, Ht = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let zt = 0;
function Gt(e, n = Ht) {
  const s = [];
  let o;
  for (; o = Bt.exec(e); )
    s.push(o[1]);
  if (!s.length)
    return e;
  const t = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return s.forEach((a) => {
    const l = typeof n == "function" ? n(a) : n + (zt++).toString(), d = a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    e = e.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + d + ')([")]|\\.[a-z])', "g"),
      "$1" + l + t + "$3"
    );
  }), e = e.replace(new RegExp(t, "g"), ""), e;
}
const Ae = /* @__PURE__ */ Object.create(null);
function Wt(e, n) {
  Ae[e] = n;
}
function Le(e) {
  return Ae[e] || Ae[""];
}
function Pe(e) {
  let n;
  if (typeof e.resources == "string")
    n = [e.resources];
  else if (n = e.resources, !(n instanceof Array) || !n.length)
    return null;
  return {
    // API hosts
    resources: n,
    // Root path
    path: e.path || "/",
    // URL length limit
    maxURL: e.maxURL || 500,
    // Timeout before next host is used.
    rotate: e.rotate || 750,
    // Timeout before failing query.
    timeout: e.timeout || 5e3,
    // Randomise default API end point.
    random: e.random === !0,
    // Start index
    index: e.index || 0,
    // Receive data after time out (used if time out kicks in first, then API module sends data anyway).
    dataAfterTimeout: e.dataAfterTimeout !== !1
  };
}
const Oe = /* @__PURE__ */ Object.create(null), ue = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
], ve = [];
for (; ue.length > 0; )
  ue.length === 1 || Math.random() > 0.5 ? ve.push(ue.shift()) : ve.push(ue.pop());
Oe[""] = Pe({
  resources: ["https://api.iconify.design"].concat(ve)
});
function Yt(e, n) {
  const s = Pe(n);
  return s === null ? !1 : (Oe[e] = s, !0);
}
function Fe(e) {
  return Oe[e];
}
const qt = () => {
  let e;
  try {
    if (e = fetch, typeof e == "function")
      return e;
  } catch {
  }
};
let ze = qt();
function Qt(e, n) {
  const s = Fe(e);
  if (!s)
    return 0;
  let o;
  if (!s.maxURL)
    o = 0;
  else {
    let t = 0;
    s.resources.forEach((l) => {
      t = Math.max(t, l.length);
    });
    const a = n + ".json?icons=";
    o = s.maxURL - t - s.path.length - a.length;
  }
  return o;
}
function Kt(e) {
  return e === 404;
}
const Jt = (e, n, s) => {
  const o = [], t = Qt(e, n), a = "icons";
  let l = {
    type: a,
    provider: e,
    prefix: n,
    icons: []
  }, d = 0;
  return s.forEach((c, r) => {
    d += c.length + 1, d >= t && r > 0 && (o.push(l), l = {
      type: a,
      provider: e,
      prefix: n,
      icons: []
    }, d = c.length), l.icons.push(c);
  }), o.push(l), o;
};
function Xt(e) {
  if (typeof e == "string") {
    const n = Fe(e);
    if (n)
      return n.path;
  }
  return "/";
}
const Zt = (e, n, s) => {
  if (!ze) {
    s("abort", 424);
    return;
  }
  let o = Xt(n.provider);
  switch (n.type) {
    case "icons": {
      const a = n.prefix, d = n.icons.join(","), c = new URLSearchParams({
        icons: d
      });
      o += a + ".json?" + c.toString();
      break;
    }
    case "custom": {
      const a = n.uri;
      o += a.slice(0, 1) === "/" ? a.slice(1) : a;
      break;
    }
    default:
      s("abort", 400);
      return;
  }
  let t = 503;
  ze(e + o).then((a) => {
    const l = a.status;
    if (l !== 200) {
      setTimeout(() => {
        s(Kt(l) ? "abort" : "next", l);
      });
      return;
    }
    return t = 501, a.json();
  }).then((a) => {
    if (typeof a != "object" || a === null) {
      setTimeout(() => {
        a === 404 ? s("abort", a) : s("next", t);
      });
      return;
    }
    setTimeout(() => {
      s("success", a);
    });
  }).catch(() => {
    s("next", t);
  });
}, es = {
  prepare: Jt,
  send: Zt
};
function ts(e) {
  const n = {
    loaded: [],
    missing: [],
    pending: []
  }, s = /* @__PURE__ */ Object.create(null);
  e.sort((t, a) => t.provider !== a.provider ? t.provider.localeCompare(a.provider) : t.prefix !== a.prefix ? t.prefix.localeCompare(a.prefix) : t.name.localeCompare(a.name));
  let o = {
    provider: "",
    prefix: "",
    name: ""
  };
  return e.forEach((t) => {
    if (o.name === t.name && o.prefix === t.prefix && o.provider === t.provider)
      return;
    o = t;
    const a = t.provider, l = t.prefix, d = t.name, c = s[a] || (s[a] = /* @__PURE__ */ Object.create(null)), r = c[l] || (c[l] = le(a, l));
    let p;
    d in r.icons ? p = n.loaded : l === "" || r.missing.has(d) ? p = n.missing : p = n.pending;
    const h = {
      provider: a,
      prefix: l,
      name: d
    };
    p.push(h);
  }), n;
}
function ct(e, n) {
  e.forEach((s) => {
    const o = s.loaderCallbacks;
    o && (s.loaderCallbacks = o.filter((t) => t.id !== n));
  });
}
function ss(e) {
  e.pendingCallbacksFlag || (e.pendingCallbacksFlag = !0, setTimeout(() => {
    e.pendingCallbacksFlag = !1;
    const n = e.loaderCallbacks ? e.loaderCallbacks.slice(0) : [];
    if (!n.length)
      return;
    let s = !1;
    const o = e.provider, t = e.prefix;
    n.forEach((a) => {
      const l = a.icons, d = l.pending.length;
      l.pending = l.pending.filter((c) => {
        if (c.prefix !== t)
          return !0;
        const r = c.name;
        if (e.icons[r])
          l.loaded.push({
            provider: o,
            prefix: t,
            name: r
          });
        else if (e.missing.has(r))
          l.missing.push({
            provider: o,
            prefix: t,
            name: r
          });
        else
          return s = !0, !0;
        return !1;
      }), l.pending.length !== d && (s || ct([e], a.id), a.callback(
        l.loaded.slice(0),
        l.missing.slice(0),
        l.pending.slice(0),
        a.abort
      ));
    });
  }));
}
let ns = 0;
function os(e, n, s) {
  const o = ns++, t = ct.bind(null, s, o);
  if (!n.pending.length)
    return t;
  const a = {
    id: o,
    icons: n,
    callback: e,
    abort: t
  };
  return s.forEach((l) => {
    (l.loaderCallbacks || (l.loaderCallbacks = [])).push(a);
  }), t;
}
function is(e, n = !0, s = !1) {
  const o = [];
  return e.forEach((t) => {
    const a = typeof t == "string" ? we(t, n, s) : t;
    a && o.push(a);
  }), o;
}
var as = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function ls(e, n, s, o) {
  const t = e.resources.length, a = e.random ? Math.floor(Math.random() * t) : e.index;
  let l;
  if (e.random) {
    let P = e.resources.slice(0);
    for (l = []; P.length > 1; ) {
      const T = Math.floor(Math.random() * P.length);
      l.push(P[T]), P = P.slice(0, T).concat(P.slice(T + 1));
    }
    l = l.concat(P);
  } else
    l = e.resources.slice(a).concat(e.resources.slice(0, a));
  const d = Date.now();
  let c = "pending", r = 0, p, h = null, b = [], v = [];
  typeof o == "function" && v.push(o);
  function _() {
    h && (clearTimeout(h), h = null);
  }
  function f() {
    c === "pending" && (c = "aborted"), _(), b.forEach((P) => {
      P.status === "pending" && (P.status = "aborted");
    }), b = [];
  }
  function g(P, T) {
    T && (v = []), typeof P == "function" && v.push(P);
  }
  function C() {
    return {
      startTime: d,
      payload: n,
      status: c,
      queriesSent: r,
      queriesPending: b.length,
      subscribe: g,
      abort: f
    };
  }
  function E() {
    c = "failed", v.forEach((P) => {
      P(void 0, p);
    });
  }
  function I() {
    b.forEach((P) => {
      P.status === "pending" && (P.status = "aborted");
    }), b = [];
  }
  function S(P, T, M) {
    const A = T !== "success";
    switch (b = b.filter((j) => j !== P), c) {
      case "pending":
        break;
      case "failed":
        if (A || !e.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (T === "abort") {
      p = M, E();
      return;
    }
    if (A) {
      p = M, b.length || (l.length ? N() : E());
      return;
    }
    if (_(), I(), !e.random) {
      const j = e.resources.indexOf(P.resource);
      j !== -1 && j !== e.index && (e.index = j);
    }
    c = "completed", v.forEach((j) => {
      j(M);
    });
  }
  function N() {
    if (c !== "pending")
      return;
    _();
    const P = l.shift();
    if (P === void 0) {
      if (b.length) {
        h = setTimeout(() => {
          _(), c === "pending" && (I(), E());
        }, e.timeout);
        return;
      }
      E();
      return;
    }
    const T = {
      status: "pending",
      resource: P,
      callback: (M, A) => {
        S(T, M, A);
      }
    };
    b.push(T), r++, h = setTimeout(N, e.rotate), s(P, n, T.callback);
  }
  return setTimeout(N), C;
}
function rt(e) {
  const n = {
    ...as,
    ...e
  };
  let s = [];
  function o() {
    s = s.filter((d) => d().status === "pending");
  }
  function t(d, c, r) {
    const p = ls(
      n,
      d,
      c,
      (h, b) => {
        o(), r && r(h, b);
      }
    );
    return s.push(p), p;
  }
  function a(d) {
    return s.find((c) => d(c)) || null;
  }
  return {
    query: t,
    find: a,
    setIndex: (d) => {
      n.index = d;
    },
    getIndex: () => n.index,
    cleanup: o
  };
}
function Ge() {
}
const Se = /* @__PURE__ */ Object.create(null);
function cs(e) {
  if (!Se[e]) {
    const n = Fe(e);
    if (!n)
      return;
    const s = rt(n), o = {
      config: n,
      redundancy: s
    };
    Se[e] = o;
  }
  return Se[e];
}
function rs(e, n, s) {
  let o, t;
  if (typeof e == "string") {
    const a = Le(e);
    if (!a)
      return s(void 0, 424), Ge;
    t = a.send;
    const l = cs(e);
    l && (o = l.redundancy);
  } else {
    const a = Pe(e);
    if (a) {
      o = rt(a);
      const l = e.resources ? e.resources[0] : "", d = Le(l);
      d && (t = d.send);
    }
  }
  return !o || !t ? (s(void 0, 424), Ge) : o.query(n, t, s)().abort;
}
function We() {
}
function us(e) {
  e.iconsLoaderFlag || (e.iconsLoaderFlag = !0, setTimeout(() => {
    e.iconsLoaderFlag = !1, ss(e);
  }));
}
function ds(e) {
  const n = [], s = [];
  return e.forEach((o) => {
    (o.match(et) ? n : s).push(o);
  }), {
    valid: n,
    invalid: s
  };
}
function de(e, n, s) {
  function o() {
    const t = e.pendingIcons;
    n.forEach((a) => {
      t && t.delete(a), e.icons[a] || e.missing.add(a);
    });
  }
  if (s && typeof s == "object")
    try {
      if (!ot(e, s).length) {
        o();
        return;
      }
    } catch (t) {
      console.error(t);
    }
  o(), us(e);
}
function Ye(e, n) {
  e instanceof Promise ? e.then((s) => {
    n(s);
  }).catch(() => {
    n(null);
  }) : n(e);
}
function fs(e, n) {
  e.iconsToLoad ? e.iconsToLoad = e.iconsToLoad.concat(n).sort() : e.iconsToLoad = n, e.iconsQueueFlag || (e.iconsQueueFlag = !0, setTimeout(() => {
    e.iconsQueueFlag = !1;
    const { provider: s, prefix: o } = e, t = e.iconsToLoad;
    if (delete e.iconsToLoad, !t || !t.length)
      return;
    const a = e.loadIcon;
    if (e.loadIcons && (t.length > 1 || !a)) {
      Ye(
        e.loadIcons(t, o, s),
        (p) => {
          de(e, t, p);
        }
      );
      return;
    }
    if (a) {
      t.forEach((p) => {
        const h = a(p, o, s);
        Ye(h, (b) => {
          const v = b ? {
            prefix: o,
            icons: {
              [p]: b
            }
          } : null;
          de(e, [p], v);
        });
      });
      return;
    }
    const { valid: l, invalid: d } = ds(t);
    if (d.length && de(e, d, null), !l.length)
      return;
    const c = o.match(et) ? Le(s) : null;
    if (!c) {
      de(e, l, null);
      return;
    }
    c.prepare(s, o, l).forEach((p) => {
      rs(s, p, (h) => {
        de(e, p.icons, h);
      });
    });
  }));
}
const ps = (e, n) => {
  const s = is(e, !0, it()), o = ts(s);
  if (!o.pending.length) {
    let c = !0;
    return n && setTimeout(() => {
      c && n(
        o.loaded,
        o.missing,
        o.pending,
        We
      );
    }), () => {
      c = !1;
    };
  }
  const t = /* @__PURE__ */ Object.create(null), a = [];
  let l, d;
  return o.pending.forEach((c) => {
    const { provider: r, prefix: p } = c;
    if (p === d && r === l)
      return;
    l = r, d = p, a.push(le(r, p));
    const h = t[r] || (t[r] = /* @__PURE__ */ Object.create(null));
    h[p] || (h[p] = []);
  }), o.pending.forEach((c) => {
    const { provider: r, prefix: p, name: h } = c, b = le(r, p), v = b.pendingIcons || (b.pendingIcons = /* @__PURE__ */ new Set());
    v.has(h) || (v.add(h), t[r][p].push(h));
  }), a.forEach((c) => {
    const r = t[c.provider][c.prefix];
    r.length && fs(c, r);
  }), n ? os(n, o, a) : We;
};
function gs(e, n) {
  const s = {
    ...e
  };
  for (const o in n) {
    const t = n[o], a = typeof t;
    o in at ? (t === null || t && (a === "string" || a === "number")) && (s[o] = t) : a === typeof s[o] && (s[o] = o === "rotate" ? t % 4 : t);
  }
  return s;
}
const hs = /[\s,]+/;
function ms(e, n) {
  n.split(hs).forEach((s) => {
    switch (s.trim()) {
      case "horizontal":
        e.hFlip = !0;
        break;
      case "vertical":
        e.vFlip = !0;
        break;
    }
  });
}
function vs(e, n = 0) {
  const s = e.replace(/^-?[0-9.]*/, "");
  function o(t) {
    for (; t < 0; )
      t += 4;
    return t % 4;
  }
  if (s === "") {
    const t = parseInt(e);
    return isNaN(t) ? 0 : o(t);
  } else if (s !== e) {
    let t = 0;
    switch (s) {
      case "%":
        t = 25;
        break;
      case "deg":
        t = 90;
    }
    if (t) {
      let a = parseFloat(e.slice(0, e.length - s.length));
      return isNaN(a) ? 0 : (a = a / t, a % 1 === 0 ? o(a) : 0);
    }
  }
  return n;
}
function _s(e, n) {
  let s = e.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const o in n)
    s += " " + o + '="' + n[o] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + s + ">" + e + "</svg>";
}
function bs(e) {
  return e.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function ys(e) {
  return "data:image/svg+xml," + bs(e);
}
function ks(e) {
  return 'url("' + ys(e) + '")';
}
const qe = {
  ...lt,
  inline: !1
}, ws = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": !0,
  role: "img"
}, Ts = {
  display: "inline-block"
}, Re = {
  backgroundColor: "currentColor"
}, ut = {
  backgroundColor: "transparent"
}, Qe = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
}, Ke = {
  webkitMask: Re,
  mask: Re,
  background: ut
};
for (const e in Ke) {
  const n = Ke[e];
  for (const s in Qe)
    n[e + s] = Qe[s];
}
const _e = {};
["horizontal", "vertical"].forEach((e) => {
  const n = e.slice(0, 1) + "Flip";
  _e[e + "-flip"] = n, _e[e.slice(0, 1) + "-flip"] = n, _e[e + "Flip"] = n;
});
function Je(e) {
  return e + (e.match(/^[-0-9.]+$/) ? "px" : "");
}
const Xe = (e, n) => {
  const s = gs(qe, n), o = { ...ws }, t = n.mode || "svg", a = {}, l = n.style, d = typeof l == "object" && !(l instanceof Array) ? l : {};
  for (let f in n) {
    const g = n[f];
    if (g !== void 0)
      switch (f) {
        // Properties to ignore
        case "icon":
        case "style":
        case "onLoad":
        case "mode":
        case "ssr":
          break;
        // Boolean attributes
        case "inline":
        case "hFlip":
        case "vFlip":
          s[f] = g === !0 || g === "true" || g === 1;
          break;
        // Flip as string: 'horizontal,vertical'
        case "flip":
          typeof g == "string" && ms(s, g);
          break;
        // Color: override style
        case "color":
          a.color = g;
          break;
        // Rotation as string
        case "rotate":
          typeof g == "string" ? s[f] = vs(g) : typeof g == "number" && (s[f] = g);
          break;
        // Remove aria-hidden
        case "ariaHidden":
        case "aria-hidden":
          g !== !0 && g !== "true" && delete o["aria-hidden"];
          break;
        default: {
          const C = _e[f];
          C ? (g === !0 || g === "true" || g === 1) && (s[C] = !0) : qe[f] === void 0 && (o[f] = g);
        }
      }
  }
  const c = Vt(e, s), r = c.attributes;
  if (s.inline && (a.verticalAlign = "-0.125em"), t === "svg") {
    o.style = {
      ...a,
      ...d
    }, Object.assign(o, r);
    let f = 0, g = n.id;
    return typeof g == "string" && (g = g.replace(/-/g, "_")), o.innerHTML = Gt(c.body, g ? () => g + "ID" + f++ : "iconifyVue"), Ue("svg", o);
  }
  const { body: p, width: h, height: b } = e, v = t === "mask" || (t === "bg" ? !1 : p.indexOf("currentColor") !== -1), _ = _s(p, {
    ...r,
    width: h + "",
    height: b + ""
  });
  return o.style = {
    ...a,
    "--svg": ks(_),
    width: Je(r.width),
    height: Je(r.height),
    ...Ts,
    ...v ? Re : ut,
    ...d
  }, Ue("span", o);
};
it(!0);
Wt("", es);
if (typeof document < "u" && typeof window < "u") {
  const e = window;
  if (e.IconifyPreload !== void 0) {
    const n = e.IconifyPreload, s = "Invalid IconifyPreload syntax.";
    typeof n == "object" && n !== null && (n instanceof Array ? n : [n]).forEach((o) => {
      try {
        // Check if item is an object and not null/array
        (typeof o != "object" || o === null || o instanceof Array || // Check for 'icons' and 'prefix'
        typeof o.icons != "object" || typeof o.prefix != "string" || // Add icon set
        !Dt(o)) && console.error(s);
      } catch {
        console.error(s);
      }
    });
  }
  if (e.IconifyProviders !== void 0) {
    const n = e.IconifyProviders;
    if (typeof n == "object" && n !== null)
      for (let s in n) {
        const o = "IconifyProviders[" + s + "] is invalid.";
        try {
          const t = n[s];
          if (typeof t != "object" || !t || t.resources === void 0)
            continue;
          Yt(s, t) || console.error(o);
        } catch {
          console.error(o);
        }
      }
  }
}
const Cs = {
  ...Te,
  body: ""
}, $ = W((e, { emit: n }) => {
  const s = x(null);
  function o() {
    var r, p;
    s.value && ((p = (r = s.value).abort) == null || p.call(r), s.value = null);
  }
  const t = x(!!e.ssr), a = x(""), l = kt(null);
  function d() {
    const r = e.icon;
    if (typeof r == "object" && r !== null && typeof r.body == "string")
      return a.value = "", {
        data: r
      };
    let p;
    if (typeof r != "string" || (p = we(r, !1, !0)) === null)
      return null;
    let h = Rt(p);
    if (!h) {
      const _ = s.value;
      return (!_ || _.name !== r) && (h === null ? s.value = {
        name: r
      } : s.value = {
        name: r,
        abort: ps([p], c)
      }), null;
    }
    o(), a.value !== r && (a.value = r, De(() => {
      n("load", r);
    }));
    const b = e.customise;
    if (b) {
      h = Object.assign({}, h);
      const _ = b(h.body, p.name, p.prefix, p.provider);
      typeof _ == "string" && (h.body = _);
    }
    const v = ["iconify"];
    return p.prefix !== "" && v.push("iconify--" + p.prefix), p.provider !== "" && v.push("iconify--" + p.provider), { data: h, classes: v };
  }
  function c() {
    var p;
    const r = d();
    r ? r.data !== ((p = l.value) == null ? void 0 : p.data) && (l.value = r) : l.value = null;
  }
  return t.value ? c() : ye(() => {
    t.value = !0, c();
  }), Y(() => e.icon, c), Me(o), () => {
    const r = l.value;
    if (!r)
      return Xe(Cs, e);
    let p = e;
    return r.classes && (p = {
      ...e,
      class: r.classes.join(" ")
    }), Xe({
      ...Te,
      ...r.data
    }, p);
  };
}, {
  props: [
    // Icon and render mode
    "icon",
    "mode",
    "ssr",
    // Layout and style
    "width",
    "height",
    "style",
    "color",
    "inline",
    // Transformations
    "rotate",
    "hFlip",
    "horizontalFlip",
    "vFlip",
    "verticalFlip",
    "flip",
    // Misc
    "id",
    "ariaHidden",
    "customise",
    "title"
  ],
  emits: ["load"]
}), dt = "simplePrompt.settings", ft = {
  convertUnderscoreToSpace: !0,
  escapeBrackets: !1,
  useAliasesInSearch: !0,
  useAliasesInAutocomplete: !1,
  // Default false as per new spec
  smartBackspace: !1,
  // Default false - user must opt-in
  language: "en",
  // Default fallback
  allowEditDefaultTags: !1
}, O = wt({ ...ft });
function xs() {
  try {
    const e = localStorage.getItem(dt);
    if (e) {
      const n = JSON.parse(e);
      Object.assign(O, { ...ft, ...n });
    } else
      navigator.language.startsWith("zh") && (O.language = "zh-CN");
  } catch (e) {
    console.error("Failed to load settings:", e);
  }
}
Y(O, (e) => {
  try {
    localStorage.setItem(dt, JSON.stringify(e));
  } catch (n) {
    console.error("Failed to save settings:", n);
  }
}, { deep: !0 });
xs();
var D = /* @__PURE__ */ ((e) => (e[e.GENERAL = 0] = "GENERAL", e[e.ARTIST = 1] = "ARTIST", e[e.COPYRIGHT = 3] = "COPYRIGHT", e[e.CHARACTER = 4] = "CHARACTER", e[e.META = 5] = "META", e))(D || {});
const V = {
  0: "#0075db",
  // Blue
  1: "#c00004",
  // Red
  3: "#c000c0",
  // Purple
  4: "#00aa00",
  // Green
  5: "#fd9200"
  // Orange
}, $s = { class: "modal-container" }, Ss = { class: "modal-header" }, Es = { class: "modal-title" }, Is = ["title"], As = { class: "modal-body" }, Ls = { class: "form-group" }, Rs = ["placeholder", "disabled"], Ms = { class: "form-group" }, Ds = { class: "category-options" }, Ps = ["onClick"], Os = { class: "form-group" }, Fs = { class: "hint" }, Ns = { class: "form-group" }, js = ["placeholder"], Us = { class: "hint" }, Vs = {
  key: 0,
  class: "message error"
}, Bs = {
  key: 1,
  class: "message success"
}, Hs = { class: "modal-footer" }, zs = ["disabled"], Gs = /* @__PURE__ */ W({
  __name: "CustomTagModal",
  props: {
    visible: { type: Boolean },
    editMode: { type: Boolean },
    initialData: {},
    targetSource: {}
  },
  emits: ["close", "save"],
  setup(e, { emit: n }) {
    const s = e, o = n, { t } = X(), a = x({
      name: "",
      category: D.GENERAL,
      post_count: 0,
      alias: ""
    }), l = x(!1), d = x(""), c = x(""), r = [
      { value: D.GENERAL, label: "General", color: V[D.GENERAL] },
      { value: D.ARTIST, label: "Artist", color: V[D.ARTIST] },
      { value: D.COPYRIGHT, label: "Copyright", color: V[D.COPYRIGHT] },
      { value: D.CHARACTER, label: "Character", color: V[D.CHARACTER] },
      { value: D.META, label: "Meta", color: V[D.META] }
    ], p = () => {
      a.value = {
        name: "",
        category: D.GENERAL,
        post_count: 0,
        alias: ""
      }, d.value = "", c.value = "";
    };
    Y(() => s.visible, (v) => {
      v && (s.editMode && s.initialData ? a.value = {
        name: s.initialData.name,
        category: s.initialData.category || D.GENERAL,
        post_count: s.initialData.post_count || 0,
        alias: Array.isArray(s.initialData.alias) ? s.initialData.alias.join(", ") : s.initialData.alias || ""
      } : p());
    });
    const h = () => {
      o("close");
    }, b = async () => {
      if (!a.value.name.trim()) {
        d.value = t("customTag.errorNameRequired");
        return;
      }
      l.value = !0, d.value = "", c.value = "";
      try {
        const v = a.value.alias.split(",").map((C) => C.trim()).filter((C) => C), _ = {
          name: a.value.name.trim(),
          category: a.value.category,
          post_count: Number(a.value.post_count),
          alias: v,
          source: s.targetSource || "user"
        }, f = await fetch("/simple-prompt/add-custom-tag", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(_)
        }), g = await f.json();
        if (!f.ok)
          throw new Error(g.error || f.statusText);
        c.value = s.editMode ? t("customTag.successEdited") || "Tag updated!" : t("customTag.successAdded"), setTimeout(() => {
          o("save"), h();
        }, 1e3);
      } catch (v) {
        console.error("Add tag error:", v), d.value = v.message || t("customTag.errorGeneric");
      } finally {
        l.value = !1;
      }
    };
    return (v, _) => (y(), oe(ke, { name: "fade" }, {
      default: ce(() => [
        v.visible ? (y(), w("div", {
          key: 0,
          class: "modal-overlay",
          onClick: ie(h, ["self"])
        }, [
          i("div", $s, [
            i("div", Ss, [
              i("div", Es, [
                k(u($), {
                  icon: v.editMode ? "mdi:pencil" : "mdi:tag-plus",
                  class: "title-icon"
                }, null, 8, ["icon"]),
                i("span", null, m(v.editMode ? u(t)("customTag.titleEdit") || "Edit Tag" : u(t)("customTag.title")), 1)
              ]),
              i("button", {
                class: "close-btn",
                onClick: h,
                title: u(t)("common.close")
              }, [
                k(u($), { icon: "mdi:close" })
              ], 8, Is)
            ]),
            i("div", As, [
              i("div", Ls, [
                i("label", null, [
                  U(m(u(t)("customTag.nameLabel")) + " ", 1),
                  _[3] || (_[3] = i("span", { class: "required" }, "*", -1))
                ]),
                H(i("input", {
                  "onUpdate:modelValue": _[0] || (_[0] = (f) => a.value.name = f),
                  type: "text",
                  placeholder: u(t)("customTag.namePlaceholder"),
                  class: "sp-input",
                  autofocus: "",
                  disabled: v.editMode
                }, null, 8, Rs), [
                  [ne, a.value.name]
                ])
              ]),
              i("div", Ms, [
                i("label", null, m(u(t)("customTag.categoryLabel")), 1),
                i("div", Ds, [
                  (y(), w(K, null, Z(r, (f) => i("button", {
                    key: f.value,
                    type: "button",
                    class: ee(["category-btn", { active: a.value.category === f.value }]),
                    style: J({ "--cat-color": f.color }),
                    onClick: (g) => a.value.category = f.value
                  }, [
                    _[4] || (_[4] = i("span", { class: "dot" }, null, -1)),
                    U(" " + m(f.label), 1)
                  ], 14, Ps)), 64))
                ])
              ]),
              i("div", Os, [
                i("label", null, m(u(t)("customTag.countLabel")), 1),
                H(i("input", {
                  "onUpdate:modelValue": _[1] || (_[1] = (f) => a.value.post_count = f),
                  type: "number",
                  min: "0",
                  class: "sp-input"
                }, null, 512), [
                  [ne, a.value.post_count]
                ]),
                i("p", Fs, m(u(t)("customTag.countHint")), 1)
              ]),
              i("div", Ns, [
                i("label", null, m(u(t)("customTag.aliasLabel")), 1),
                H(i("input", {
                  "onUpdate:modelValue": _[2] || (_[2] = (f) => a.value.alias = f),
                  type: "text",
                  placeholder: u(t)("customTag.aliasPlaceholder"),
                  class: "sp-input"
                }, null, 8, js), [
                  [ne, a.value.alias]
                ]),
                i("p", Us, m(u(t)("customTag.aliasHint")), 1)
              ]),
              d.value ? (y(), w("div", Vs, [
                k(u($), { icon: "mdi:alert-circle" }),
                U(" " + m(d.value), 1)
              ])) : F("", !0),
              c.value ? (y(), w("div", Bs, [
                k(u($), { icon: "mdi:check-circle" }),
                U(" " + m(c.value), 1)
              ])) : F("", !0)
            ]),
            i("div", Hs, [
              i("button", {
                class: "btn-cancel",
                onClick: h
              }, m(u(t)("common.cancel")), 1),
              i("button", {
                class: "btn-save",
                onClick: b,
                disabled: l.value
              }, [
                l.value ? (y(), oe(u($), {
                  key: 0,
                  icon: "mdi:loading",
                  class: "spin"
                })) : F("", !0),
                i("span", null, m(u(t)("common.save")), 1)
              ], 8, zs)
            ])
          ])
        ])) : F("", !0)
      ]),
      _: 1
    }));
  }
}), q = (e, n) => {
  const s = e.__vccOpts || e;
  for (const [o, t] of n)
    s[o] = t;
  return s;
}, pt = /* @__PURE__ */ q(Gs, [["__scopeId", "data-v-83b7d6de"]]), Ws = { class: "tag-manager" }, Ys = { class: "tabs" }, qs = ["onClick"], Qs = { class: "toolbar" }, Ks = { class: "search-box" }, Js = ["placeholder"], Xs = { class: "status-info" }, Zs = {
  key: 0,
  class: "warning-banner"
}, en = { class: "table-container" }, tn = { class: "data-table" }, sn = {
  key: 0,
  class: "loading-row"
}, nn = { colspan: "5" }, on = {
  key: 1,
  class: "empty-row"
}, an = { colspan: "5" }, ln = { class: "name-cell" }, cn = ["title"], rn = { align: "right" }, un = {
  key: 0,
  class: "actions"
}, dn = ["onClick"], fn = ["onClick"], pn = {
  key: 1,
  class: "actions-disabled"
}, gn = { class: "pagination" }, hn = ["disabled"], mn = { class: "page-info" }, vn = ["disabled"], Ee = 20, _n = /* @__PURE__ */ W({
  __name: "TagManager",
  setup(e) {
    const { t: n } = X(), s = x("user"), o = fe(() => [
      { id: "user", label: n("settings.items.updateUserTags") || "User Tags" },
      { id: "liked", label: n("settings.items.updateLikedTags") || "Liked Tags" },
      { id: "default", label: "Default Tags" }
    ]), t = x([]), a = x(0), l = x(!1), d = x(""), c = x(1), r = x(!1), p = x(null), h = async () => {
      l.value = !0;
      try {
        const E = (c.value - 1) * Ee, I = new URLSearchParams({
          source: s.value,
          limit: Ee.toString(),
          offset: E.toString(),
          q: d.value
        }), S = await fetch(`/simple-prompt/tags/list?${I.toString()}`), N = await S.json();
        S.ok ? (t.value = N.data || [], a.value = N.total || 0) : console.error("Fetch tags failed:", N.error);
      } catch (E) {
        console.error("Fetch tags error:", E);
      } finally {
        l.value = !1;
      }
    }, b = async (E) => {
      if (confirm(n("common.confirm") + ` Delete '${E.name}'?`))
        try {
          const I = await fetch("/simple-prompt/tags/delete", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: E.name, source: s.value })
          });
          if (I.ok)
            h();
          else {
            const S = await I.json();
            alert("Delete failed: " + S.error);
          }
        } catch (I) {
          alert("Delete failed: " + I.message);
        }
    }, v = (E) => {
      p.value = E, r.value = !0;
    }, _ = () => {
      h();
    }, f = fe(() => s.value === "default" ? O.allowEditDefaultTags : !0);
    Y([s, d], () => {
      c.value = 1, h();
    }), Y(c, () => {
      h();
    }), ye(() => {
      h();
    });
    const g = (E) => ({
      0: "General",
      1: "Artist",
      3: "Copyright",
      4: "Character",
      5: "Meta"
    })[E] || "Unknown", C = (E) => V[E] || "#aaa";
    return (E, I) => (y(), w("div", Ws, [
      i("div", Ys, [
        (y(!0), w(K, null, Z(o.value, (S) => (y(), w("button", {
          key: S.id,
          class: ee(["tab-btn", { active: s.value === S.id }]),
          onClick: (N) => s.value = S.id
        }, m(S.label), 11, qs))), 128))
      ]),
      i("div", Qs, [
        i("div", Ks, [
          k(u($), {
            icon: "mdi:magnify",
            class: "search-icon"
          }),
          H(i("input", {
            "onUpdate:modelValue": I[0] || (I[0] = (S) => d.value = S),
            type: "text",
            placeholder: u(n)("search.placeholder"),
            class: "search-input"
          }, null, 8, Js), [
            [ne, d.value]
          ])
        ]),
        i("div", Xs, m(a.value) + " tags ", 1)
      ]),
      s.value === "default" && !f.value ? (y(), w("div", Zs, [
        k(u($), { icon: "mdi:lock" }),
        I[4] || (I[4] = i("span", null, "Editing default tags is disabled in settings.", -1))
      ])) : F("", !0),
      i("div", en, [
        i("table", tn, [
          I[6] || (I[6] = i("thead", null, [
            i("tr", null, [
              i("th", { width: "30%" }, "Name"),
              i("th", { width: "15%" }, "Category"),
              i("th", { width: "15%" }, "Post Count"),
              i("th", { width: "25%" }, "Aliases"),
              i("th", {
                width: "15%",
                align: "right"
              }, "Actions")
            ])
          ], -1)),
          i("tbody", null, [
            l.value ? (y(), w("tr", sn, [
              i("td", nn, [
                k(u($), {
                  icon: "mdi:loading",
                  class: "spin"
                }),
                I[5] || (I[5] = U(" Loading... "))
              ])
            ])) : t.value.length === 0 ? (y(), w("tr", on, [
              i("td", an, m(u(n)("search.noResults")), 1)
            ])) : (y(!0), w(K, { key: 2 }, Z(t.value, (S) => (y(), w("tr", {
              key: S.name
            }, [
              i("td", ln, m(S.name), 1),
              i("td", null, [
                i("span", {
                  class: "cat-badge",
                  style: J({ "--c": C(S.category) })
                }, m(g(S.category)), 5)
              ]),
              i("td", null, m(S.post_count), 1),
              i("td", {
                class: "alias-cell",
                title: S.alias ? S.alias.join(", ") : ""
              }, m(S.alias ? S.alias.join(", ") : "-"), 9, cn),
              i("td", rn, [
                f.value ? (y(), w("div", un, [
                  i("button", {
                    class: "action-btn edit",
                    onClick: (N) => v(S),
                    title: "Edit"
                  }, [
                    k(u($), { icon: "mdi:pencil" })
                  ], 8, dn),
                  i("button", {
                    class: "action-btn delete",
                    onClick: (N) => b(S),
                    title: "Delete"
                  }, [
                    k(u($), { icon: "mdi:delete" })
                  ], 8, fn)
                ])) : (y(), w("div", pn, [
                  k(u($), { icon: "mdi:lock-outline" })
                ]))
              ])
            ]))), 128))
          ])
        ])
      ]),
      i("div", gn, [
        i("button", {
          disabled: c.value === 1,
          onClick: I[1] || (I[1] = (S) => c.value--),
          class: "page-btn"
        }, [
          k(u($), { icon: "mdi:chevron-left" })
        ], 8, hn),
        i("span", mn, "Page " + m(c.value), 1),
        i("button", {
          disabled: t.value.length < Ee,
          onClick: I[2] || (I[2] = (S) => c.value++),
          class: "page-btn"
        }, [
          k(u($), { icon: "mdi:chevron-right" })
        ], 8, vn)
      ]),
      k(pt, {
        visible: r.value,
        "edit-mode": !0,
        "initial-data": p.value,
        "target-source": s.value,
        onClose: I[3] || (I[3] = (S) => r.value = !1),
        onSave: _
      }, null, 8, ["visible", "initial-data", "target-source"])
    ]));
  }
}), bn = /* @__PURE__ */ q(_n, [["__scopeId", "data-v-7bcc66d2"]]), yn = { class: "settings-container" }, kn = { class: "settings-header" }, wn = { class: "settings-title" }, Tn = ["title"], Cn = { class: "settings-body" }, xn = { class: "settings-sidebar" }, $n = ["onClick"], Sn = { class: "settings-content" }, En = {
  key: 0,
  class: "settings-section"
}, In = { class: "section-title" }, An = { class: "setting-item" }, Ln = { class: "setting-info" }, Rn = { class: "setting-label" }, Mn = { class: "setting-desc" }, Dn = { class: "switch" }, Pn = { class: "setting-item" }, On = { class: "setting-info" }, Fn = { class: "setting-label" }, Nn = { class: "setting-desc" }, jn = { class: "switch" }, Un = {
  key: 1,
  class: "settings-section"
}, Vn = { class: "section-title" }, Bn = { class: "setting-item" }, Hn = { class: "setting-info" }, zn = { class: "setting-label" }, Gn = { class: "setting-desc" }, Wn = { class: "switch" }, Yn = { class: "setting-item" }, qn = { class: "setting-info" }, Qn = { class: "setting-label" }, Kn = { class: "setting-desc" }, Jn = { class: "switch" }, Xn = {
  key: 2,
  class: "settings-section"
}, Zn = { class: "section-title" }, eo = { class: "setting-item" }, to = { class: "setting-info" }, so = { class: "setting-label" }, no = { class: "setting-desc" }, oo = { class: "switch" }, io = {
  key: 3,
  class: "settings-section"
}, ao = { class: "section-title" }, lo = { class: "setting-item" }, co = { class: "setting-info" }, ro = { class: "setting-label" }, uo = { class: "setting-desc" }, fo = {
  key: 4,
  class: "settings-section"
}, po = { class: "section-title" }, go = { class: "setting-item" }, ho = { class: "setting-info" }, mo = { class: "setting-label" }, vo = { class: "setting-desc" }, _o = { class: "switch" }, bo = { class: "setting-item data-update-item" }, yo = { class: "setting-info" }, ko = { class: "setting-label" }, wo = { class: "setting-desc" }, To = { class: "update-actions" }, Co = ["disabled"], xo = { class: "setting-item data-update-item" }, $o = { class: "setting-info" }, So = { class: "setting-label" }, Eo = { class: "setting-desc" }, Io = { class: "update-actions" }, Ao = ["disabled"], Lo = { class: "setting-item data-update-item" }, Ro = { class: "setting-info" }, Mo = { class: "setting-label" }, Do = { class: "setting-desc" }, Po = { class: "update-actions" }, Oo = ["disabled"], Fo = {
  key: 5,
  class: "settings-section full-width"
}, No = { class: "section-title" }, jo = { class: "settings-footer" }, Uo = { class: "footer-info" }, Vo = /* @__PURE__ */ W({
  __name: "SettingsModal",
  props: {
    visible: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["close"],
  setup(e, { emit: n }) {
    const s = e, o = n, { t, locale: a } = X(), l = () => {
      o("close");
    };
    Y(() => O.language, (_) => {
      a.value = _;
    });
    const d = [
      { id: "textFormat", icon: "mdi:format-text" },
      { id: "autocomplete", icon: "mdi:magnify" },
      { id: "editing", icon: "mdi:pencil" },
      { id: "interface", icon: "mdi:translate" },
      { id: "data", icon: "mdi:database" },
      { id: "tagManager", icon: "mdi:tag-multiple" }
    ], c = x("textFormat"), r = x(""), p = x(!1), h = x(!1), b = x(""), v = async (_) => {
      if (!(p.value || h.value)) {
        p.value = !0, r.value = "";
        try {
          if (_ === "update_github") {
            h.value = !0, r.value = t("settings.checkingUpdate");
            try {
              const f = await fetch("/simple-prompt/check-update"), g = await f.json();
              if (!f.ok)
                throw new Error(g.error || f.statusText);
              if (b.value = g.version, h.value = !1, !g.update_available) {
                r.value = t("settings.upToDate") + b.value;
                return;
              }
              r.value = t("settings.updating");
              const C = await fetch("/simple-prompt/update-tags", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({})
              }), E = await C.json();
              if (C.ok && E.status === "success")
                r.value = t("settings.updateSuccess");
              else
                throw new Error(E.error || C.statusText);
            } finally {
              h.value = !1;
            }
          } else {
            r.value = t("settings.updating");
            const C = await fetch("/simple-prompt/update-data", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ action: _ })
            }), E = await C.json();
            if (C.ok && E.status === "success")
              r.value = E.message || t("settings.updateSuccess");
            else
              throw new Error(E.error || C.statusText);
          }
        } catch (f) {
          console.error("Update action error:", f), r.value = t("settings.updateError") + f.message;
        } finally {
          p.value = !1;
        }
      }
    };
    return Y(() => s.visible, (_) => {
      _ && (r.value = "", b.value = "");
    }), (_, f) => (y(), oe(ke, { name: "fade" }, {
      default: ce(() => [
        e.visible ? (y(), w("div", {
          key: 0,
          class: "settings-overlay",
          onClick: ie(l, ["self"])
        }, [
          i("div", yn, [
            i("div", kn, [
              i("div", wn, [
                k(u($), {
                  icon: "mdi:cog",
                  class: "settings-icon"
                }),
                i("span", null, m(u(t)("settings.title")), 1)
              ]),
              i("button", {
                class: "btn-close",
                onClick: l,
                title: u(t)("common.close")
              }, [
                k(u($), { icon: "mdi:close" })
              ], 8, Tn)
            ]),
            i("div", Cn, [
              i("div", xn, [
                (y(), w(K, null, Z(d, (g) => i("div", {
                  key: g.id,
                  class: ee(["sidebar-item", { active: c.value === g.id }]),
                  onClick: (C) => c.value = g.id
                }, [
                  k(u($), {
                    icon: g.icon,
                    class: "item-icon"
                  }, null, 8, ["icon"]),
                  i("span", null, m(u(t)(`settings.sections.${g.id}`)), 1)
                ], 10, $n)), 64))
              ]),
              i("div", Sn, [
                c.value === "textFormat" ? (y(), w("div", En, [
                  i("h3", In, [
                    k(u($), { icon: "mdi:format-text" }),
                    U(" " + m(u(t)("settings.sections.textFormat")), 1)
                  ]),
                  i("div", An, [
                    i("div", Ln, [
                      i("label", Rn, m(u(t)("settings.items.convertUnderscore")), 1),
                      i("p", Mn, m(u(t)("settings.items.convertUnderscoreDesc")), 1)
                    ]),
                    i("label", Dn, [
                      H(i("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": f[0] || (f[0] = (g) => u(O).convertUnderscoreToSpace = g)
                      }, null, 512), [
                        [ae, u(O).convertUnderscoreToSpace]
                      ]),
                      f[10] || (f[10] = i("span", { class: "slider" }, null, -1))
                    ])
                  ]),
                  i("div", Pn, [
                    i("div", On, [
                      i("label", Fn, m(u(t)("settings.items.escapeBrackets")), 1),
                      i("p", Nn, m(u(t)("settings.items.escapeBracketsDesc")), 1)
                    ]),
                    i("label", jn, [
                      H(i("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": f[1] || (f[1] = (g) => u(O).escapeBrackets = g)
                      }, null, 512), [
                        [ae, u(O).escapeBrackets]
                      ]),
                      f[11] || (f[11] = i("span", { class: "slider" }, null, -1))
                    ])
                  ])
                ])) : F("", !0),
                c.value === "autocomplete" ? (y(), w("div", Un, [
                  i("h3", Vn, [
                    k(u($), { icon: "mdi:magnify" }),
                    U(" " + m(u(t)("settings.sections.autocomplete")), 1)
                  ]),
                  i("div", Bn, [
                    i("div", Hn, [
                      i("label", zn, m(u(t)("settings.items.useAliasSearch")), 1),
                      i("p", Gn, m(u(t)("settings.items.useAliasSearchDesc")), 1)
                    ]),
                    i("label", Wn, [
                      H(i("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": f[2] || (f[2] = (g) => u(O).useAliasesInSearch = g)
                      }, null, 512), [
                        [ae, u(O).useAliasesInSearch]
                      ]),
                      f[12] || (f[12] = i("span", { class: "slider" }, null, -1))
                    ])
                  ]),
                  i("div", Yn, [
                    i("div", qn, [
                      i("label", Qn, m(u(t)("settings.items.useAliasAutocomplete")), 1),
                      i("p", Kn, m(u(t)("settings.items.useAliasAutocompleteDesc")), 1)
                    ]),
                    i("label", Jn, [
                      H(i("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": f[3] || (f[3] = (g) => u(O).useAliasesInAutocomplete = g)
                      }, null, 512), [
                        [ae, u(O).useAliasesInAutocomplete]
                      ]),
                      f[13] || (f[13] = i("span", { class: "slider" }, null, -1))
                    ])
                  ])
                ])) : F("", !0),
                c.value === "editing" ? (y(), w("div", Xn, [
                  i("h3", Zn, [
                    k(u($), { icon: "mdi:pencil" }),
                    U(" " + m(u(t)("settings.sections.editing")), 1)
                  ]),
                  i("div", eo, [
                    i("div", to, [
                      i("label", so, m(u(t)("settings.items.smartBackspace")), 1),
                      i("p", no, m(u(t)("settings.items.smartBackspaceDesc")), 1)
                    ]),
                    i("label", oo, [
                      H(i("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": f[4] || (f[4] = (g) => u(O).smartBackspace = g)
                      }, null, 512), [
                        [ae, u(O).smartBackspace]
                      ]),
                      f[14] || (f[14] = i("span", { class: "slider" }, null, -1))
                    ])
                  ])
                ])) : F("", !0),
                c.value === "interface" ? (y(), w("div", io, [
                  i("h3", ao, [
                    k(u($), { icon: "mdi:translate" }),
                    U(" " + m(u(t)("settings.sections.interface")), 1)
                  ]),
                  i("div", lo, [
                    i("div", co, [
                      i("label", ro, m(u(t)("settings.items.language")), 1),
                      i("p", uo, m(u(t)("settings.items.languageDesc")), 1)
                    ]),
                    H(i("select", {
                      "onUpdate:modelValue": f[5] || (f[5] = (g) => u(O).language = g),
                      class: "language-select"
                    }, f[15] || (f[15] = [
                      i("option", { value: "en" }, "English", -1),
                      i("option", { value: "zh-CN" }, "简体中文", -1)
                    ]), 512), [
                      [Tt, u(O).language]
                    ])
                  ])
                ])) : F("", !0),
                c.value === "data" ? (y(), w("div", fo, [
                  i("h3", po, [
                    k(u($), { icon: "mdi:database" }),
                    U(" " + m(u(t)("settings.sections.data")), 1)
                  ]),
                  i("div", go, [
                    i("div", ho, [
                      i("label", mo, m(u(t)("settings.items.allowEditDefaultTags") || "Allow Editing Default Tags"), 1),
                      i("p", vo, m(u(t)("settings.items.allowEditDefaultTagsDesc") || "Enable editing and deleting of default tags (Use with caution)."), 1)
                    ]),
                    i("label", _o, [
                      H(i("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": f[6] || (f[6] = (g) => u(O).allowEditDefaultTags = g)
                      }, null, 512), [
                        [ae, u(O).allowEditDefaultTags]
                      ]),
                      f[16] || (f[16] = i("span", { class: "slider" }, null, -1))
                    ])
                  ]),
                  i("div", bo, [
                    i("div", yo, [
                      i("label", ko, m(u(t)("settings.items.updateTags")), 1),
                      i("p", wo, m(u(t)("settings.items.updateTagsDesc")), 1)
                    ]),
                    i("div", To, [
                      i("button", {
                        class: "btn-update primary",
                        disabled: p.value || h.value,
                        onClick: f[7] || (f[7] = (g) => v("update_github"))
                      }, [
                        p.value && c.value === "data" ? (y(), oe(u($), {
                          key: 0,
                          icon: "mdi:loading",
                          class: "spin"
                        })) : F("", !0),
                        i("span", null, m(u(t)("settings.updateNow")), 1)
                      ], 8, Co)
                    ])
                  ]),
                  i("div", xo, [
                    i("div", $o, [
                      i("label", So, m(u(t)("settings.items.updateLikedTags") || "Update Liked Tags"), 1),
                      i("p", Eo, m(u(t)("settings.items.updateLikedTagsDesc") || "Sync liked tags data with main database."), 1)
                    ]),
                    i("div", Io, [
                      i("button", {
                        class: "btn-update secondary",
                        disabled: p.value,
                        onClick: f[8] || (f[8] = (g) => v("update_liked"))
                      }, [
                        k(u($), { icon: "mdi:heart" }),
                        i("span", null, m(u(t)("common.update") || "Update"), 1)
                      ], 8, Ao)
                    ])
                  ]),
                  i("div", Lo, [
                    i("div", Ro, [
                      i("label", Mo, m(u(t)("settings.items.updateUserTags") || "Update User Tags"), 1),
                      i("p", Do, m(u(t)("settings.items.updateUserTagsDesc") || "Sync custom tags data with main database."), 1)
                    ]),
                    i("div", Po, [
                      i("button", {
                        class: "btn-update secondary",
                        disabled: p.value,
                        onClick: f[9] || (f[9] = (g) => v("update_user"))
                      }, [
                        k(u($), { icon: "mdi:account-tag" }),
                        i("span", null, m(u(t)("common.update") || "Update"), 1)
                      ], 8, Oo)
                    ])
                  ]),
                  r.value ? (y(), w("div", {
                    key: 0,
                    class: ee(["update-status-box", { error: r.value.includes("failed") || r.value.toLowerCase().includes("error"), success: r.value.includes("success") || r.value.includes("upToDate") || r.value.includes("updated") }])
                  }, [
                    k(u($), {
                      icon: r.value.includes("success") || r.value.includes("upToDate") || r.value.includes("updated") ? "mdi:check-circle" : "mdi:alert-circle"
                    }, null, 8, ["icon"]),
                    i("span", null, m(r.value), 1)
                  ], 2)) : F("", !0)
                ])) : F("", !0),
                c.value === "tagManager" ? (y(), w("div", Fo, [
                  i("h3", No, [
                    k(u($), { icon: "mdi:tag-multiple" }),
                    U(" " + m(u(t)("settings.sections.tagManager") || "Tag Manager"), 1)
                  ]),
                  k(bn)
                ])) : F("", !0)
              ])
            ]),
            i("div", jo, [
              i("div", Uo, [
                k(u($), { icon: "mdi:information-outline" }),
                U(" " + m(u(t)("settings.autoSave")), 1)
              ]),
              i("button", {
                class: "btn-primary",
                onClick: l
              }, m(u(t)("common.done")), 1)
            ])
          ])
        ])) : F("", !0)
      ]),
      _: 1
    }));
  }
}), Bo = /* @__PURE__ */ q(Vo, [["__scopeId", "data-v-5dbcc92e"]]), Ho = { class: "sp-modal-container" }, zo = { class: "sp-modal-header" }, Go = { class: "sp-modal-title" }, Wo = { class: "sp-modal-actions" }, Yo = ["title"], qo = ["title"], Qo = { class: "sp-modal-body" }, Ko = { class: "sp-modal-footer" }, Jo = { class: "sp-footer-left" }, Xo = { class: "sp-hint" }, Zo = { class: "sp-footer-right" }, ei = /* @__PURE__ */ W({
  __name: "ModalWrapper",
  props: {
    visible: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["close", "save"],
  setup(e, { emit: n }) {
    const s = n, o = e, { t } = X(), a = x(!1), l = x(!1), d = () => {
      a.value = !0;
    }, c = () => {
      a.value = !1;
    }, r = () => {
      l.value = !0;
    }, p = () => {
      l.value = !1;
    }, h = () => {
      s("close");
    }, b = () => {
      s("save");
    }, v = (_) => {
      a.value || l.value || (_.key === "Escape" && o.visible && h(), (_.ctrlKey || _.metaKey) && _.key === "s" && (_.preventDefault(), b()));
    };
    return ye(() => {
      window.addEventListener("keydown", v);
    }), Me(() => {
      window.removeEventListener("keydown", v);
    }), (_, f) => (y(), oe(ke, { name: "fade" }, {
      default: ce(() => [
        e.visible ? (y(), w("div", {
          key: 0,
          class: "sp-modal-overlay",
          onClick: ie(h, ["self"])
        }, [
          i("div", Ho, [
            i("div", zo, [
              i("div", Go, [
                k(u($), {
                  icon: "mdi:pencil-box-outline",
                  class: "sp-icon"
                }),
                i("span", null, m(u(t)("editor.subtitle")), 1)
              ]),
              i("div", Wo, [
                i("button", {
                  class: "sp-btn-icon",
                  title: u(t)("settings.title"),
                  onClick: d
                }, [
                  k(u($), { icon: "mdi:cog" })
                ], 8, Yo),
                i("button", {
                  class: "sp-btn-icon sp-btn-close",
                  onClick: h,
                  title: u(t)("common.close")
                }, [
                  k(u($), { icon: "mdi:close" })
                ], 8, qo)
              ])
            ]),
            i("div", Qo, [
              Ct(_.$slots, "content", { openCustomTag: r }, void 0, !0)
            ]),
            i("div", Ko, [
              i("div", Jo, [
                i("span", Xo, m(u(t)("editor.autocompleteHint")), 1)
              ]),
              i("div", Zo, [
                i("button", {
                  class: "sp-btn sp-btn-secondary",
                  onClick: h
                }, m(u(t)("common.cancel")), 1),
                i("button", {
                  class: "sp-btn sp-btn-primary",
                  onClick: b
                }, m(u(t)("common.save")), 1)
              ])
            ])
          ]),
          k(Bo, {
            visible: a.value,
            onClose: c
          }, null, 8, ["visible"]),
          k(pt, {
            visible: l.value,
            onClose: p
          }, null, 8, ["visible"])
        ])) : F("", !0)
      ]),
      _: 3
    }));
  }
}), ti = /* @__PURE__ */ q(ei, [["__scopeId", "data-v-86b97fcd"]]), se = class se {
  constructor() {
    xe(this, "isInitialized", !1);
  }
  static getInstance() {
    return se.instance || (se.instance = new se()), se.instance;
  }
  async init() {
    this.isInitialized || (console.log("[DuckDB] Backend initialization check (API-based)"), this.isInitialized = !0);
  }
  async searchTags(n, s = 20, o = !1, t = []) {
    const a = new URLSearchParams({
      q: n,
      limit: s.toString(),
      use_aliases: o.toString(),
      categories: t.join(",")
    });
    try {
      const l = await fetch(`/simple-prompt/search-tags?${a.toString()}`);
      if (!l.ok)
        throw new Error(`HTTP error! status: ${l.status}`);
      const d = await l.json();
      return o && d.length > 0 ? d.map((c) => {
        if (c.name && c.name.toLowerCase().includes(n.toLowerCase()))
          return c;
        const p = Array.isArray(c.alias) ? c.alias : [];
        if (p.length > 0) {
          const h = p.find(
            (b) => b && b.toLowerCase().includes(n.toLowerCase())
          );
          if (h)
            return { ...c, matched_alias: h };
        }
        return c;
      }) : d;
    } catch (l) {
      return console.error("[DuckDB] Search failed via API:", l), [];
    }
  }
};
xe(se, "instance");
let ge = se;
function si(e, n) {
  const s = [
    "direction",
    "boxSizing",
    "width",
    "height",
    "overflowX",
    "overflowY",
    "borderTopWidth",
    "borderRightWidth",
    "borderBottomWidth",
    "borderLeftWidth",
    "paddingTop",
    "paddingRight",
    "paddingBottom",
    "paddingLeft",
    "fontStyle",
    "fontVariant",
    "fontWeight",
    "fontStretch",
    "fontSize",
    "fontSizeAdjust",
    "lineHeight",
    "fontFamily",
    "textAlign",
    "textTransform",
    "textIndent",
    "textDecoration",
    "letterSpacing",
    "wordSpacing",
    "tabSize",
    "MozTabSize"
  ], o = document.createElement("div");
  o.id = "input-textarea-caret-position-mirror-div", document.body.appendChild(o);
  const t = o.style, a = window.getComputedStyle(e);
  t.whiteSpace = "pre-wrap", e.nodeName !== "INPUT" && (t.wordWrap = "break-word"), t.position = "absolute", t.visibility = "hidden", s.forEach((c) => {
    t[c] = a[c];
  }), navigator.userAgent.toLowerCase().indexOf("firefox") > -1 ? e.scrollHeight > parseInt(a.height) && (t.overflowY = "scroll") : t.overflow = "hidden", o.textContent = e.value.substring(0, n), e.nodeName === "INPUT" && (o.textContent = o.textContent.replace(/\s/g, " "));
  const l = document.createElement("span");
  l.textContent = e.value.substring(n) || ".", o.appendChild(l);
  const d = {
    top: l.offsetTop + parseInt(a.borderTopWidth),
    left: l.offsetLeft + parseInt(a.borderLeftWidth),
    height: parseInt(a.lineHeight)
  };
  return document.body.removeChild(o), d;
}
const ni = { class: "autocomplete-list" }, oi = {
  key: 0,
  class: "loading-item"
}, ii = {
  key: 1,
  class: "no-results"
}, ai = ["onClick"], li = { class: "item-left" }, ci = { class: "item-name" }, ri = {
  key: 0,
  class: "item-alias"
}, ui = { class: "item-right" }, di = { class: "item-count" }, fi = /* @__PURE__ */ W({
  __name: "AutocompleteList",
  props: {
    items: {},
    selectedIndex: {},
    loading: { type: Boolean }
  },
  emits: ["select"],
  setup(e, { emit: n }) {
    const s = n, { t: o } = X(), t = (d) => {
      s("select", d);
    }, a = (d) => V[d] || V[D.GENERAL], l = (d) => {
      const c = Number(d);
      return c >= 1e6 ? (c / 1e6).toFixed(1) + "M" : c >= 1e3 ? (c / 1e3).toFixed(1) + "k" : c.toString();
    };
    return (d, c) => (y(), w("div", ni, [
      d.loading ? (y(), w("div", oi, [
        k(u($), {
          icon: "mdi:loading",
          class: "spin"
        }),
        U(" " + m(u(o)("editor.loading")), 1)
      ])) : d.items.length === 0 ? (y(), w("div", ii, m(u(o)("editor.noMatches")), 1)) : (y(!0), w(K, { key: 2 }, Z(d.items, (r, p) => (y(), w("div", {
        key: r.name,
        class: ee(["menu-item", { selected: p === d.selectedIndex }]),
        onClick: (h) => t(r),
        onMousedown: c[0] || (c[0] = ie(() => {
        }, ["prevent"]))
      }, [
        i("div", li, [
          i("div", {
            class: "category-dot",
            style: J({ backgroundColor: a(r.category) })
          }, null, 4),
          i("span", ci, m(r.name), 1),
          r.alias_match ? (y(), w("span", ri, "(" + m(r.alias_match) + ")", 1)) : F("", !0)
        ]),
        i("div", ui, [
          i("span", di, m(l(r.post_count)), 1)
        ])
      ], 42, ai))), 128))
    ]));
  }
}), pi = /* @__PURE__ */ q(fi, [["__scopeId", "data-v-f05a4847"]]), gi = {
  key: 0,
  class: "tag-weight"
}, hi = ["title"], mi = { class: "weight-value" }, vi = ["title"], _i = ["title"], bi = /* @__PURE__ */ W({
  __name: "TagItem",
  props: {
    tag: {}
  },
  emits: ["remove", "update:weight", "toggle:enabled"],
  setup(e, { emit: n }) {
    const s = e, o = n, { t } = X(), a = fe(() => V[s.tag.category || D.GENERAL]), l = fe(() => s.tag.weight !== 1), d = () => {
      o("remove", s.tag.id);
    }, c = () => {
      o("toggle:enabled", s.tag.id);
    }, r = () => {
      const C = Math.min(s.tag.weight + 0.1, 2);
      o("update:weight", s.tag.id, parseFloat(C.toFixed(1)));
    }, p = () => {
      const C = Math.max(s.tag.weight - 0.1, 0.1);
      o("update:weight", s.tag.id, parseFloat(C.toFixed(1)));
    }, h = x(!1), b = x(null), v = x(""), _ = async () => {
      var C, E;
      v.value = s.tag.weight.toString(), h.value = !0, await De(), (C = b.value) == null || C.focus(), (E = b.value) == null || E.select();
    }, f = () => {
      if (!h.value) return;
      const C = parseFloat(v.value);
      !isNaN(C) && C >= 0 && o("update:weight", s.tag.id, parseFloat(C.toFixed(2))), h.value = !1;
    }, g = (C) => {
      C.key === "Enter" ? f() : C.key === "Escape" && (h.value = !1);
    };
    return (C, E) => (y(), w("div", {
      class: ee(["tag-item", { disabled: !C.tag.enabled }]),
      style: J({ "--category-color": a.value }),
      onDblclick: ie(_, ["stop"])
    }, [
      E[2] || (E[2] = i("div", { class: "tag-dot" }, null, -1)),
      i("span", {
        class: "tag-text",
        onClick: c
      }, m(C.tag.text), 1),
      l.value && !h.value ? (y(), w("div", gi, [
        i("button", {
          class: "weight-btn",
          onClick: p,
          title: u(t)("editor.decreaseWeight")
        }, [
          k(u($), { icon: "mdi:minus" })
        ], 8, hi),
        i("span", mi, m(C.tag.weight.toFixed(1)), 1),
        i("button", {
          class: "weight-btn",
          onClick: r,
          title: u(t)("editor.increaseWeight")
        }, [
          k(u($), { icon: "mdi:plus" })
        ], 8, vi)
      ])) : F("", !0),
      h.value ? H((y(), w("input", {
        key: 1,
        ref_key: "weightInput",
        ref: b,
        "onUpdate:modelValue": E[0] || (E[0] = (I) => v.value = I),
        class: "weight-input",
        onBlur: f,
        onKeydown: g,
        onClick: E[1] || (E[1] = ie(() => {
        }, ["stop"]))
      }, null, 544)), [
        [ne, v.value]
      ]) : F("", !0),
      i("button", {
        class: "tag-remove",
        onClick: d,
        title: u(t)("editor.removeTag")
      }, [
        k(u($), { icon: "mdi:close" })
      ], 8, _i)
    ], 38));
  }
}), yi = /* @__PURE__ */ q(bi, [["__scopeId", "data-v-f641b4a8"]]), ki = { class: "visual-tag-area" }, wi = {
  key: 0,
  class: "empty-state"
}, Ti = {
  key: 1,
  class: "tags-scroller"
}, Ci = ["onDragstart", "onDragenter"], xi = /* @__PURE__ */ W({
  __name: "VisualTagArea",
  props: {
    tags: {}
  },
  emits: ["update:tags"],
  setup(e, { emit: n }) {
    const s = e, o = n, t = x([]), a = x(null);
    Y(() => s.tags, (v) => {
      a.value === null && (t.value = [...v]);
    }, { immediate: !0 });
    const l = (v) => {
      const _ = t.value.filter((f) => f.id !== v);
      t.value = _, o("update:tags", _);
    }, d = (v, _) => {
      const f = t.value.map(
        (g) => g.id === v ? { ...g, weight: _ } : g
      );
      t.value = f, o("update:tags", f);
    }, c = (v) => {
      const _ = t.value.map(
        (f) => f.id === v ? { ...f, enabled: !f.enabled } : f
      );
      t.value = _, o("update:tags", _);
    }, r = (v, _) => {
      a.value = _, v.dataTransfer && (v.dataTransfer.effectAllowed = "move");
    }, p = (v) => {
      v.preventDefault(), v.dataTransfer && (v.dataTransfer.dropEffect = "move");
    }, h = (v) => {
      if (a.value !== null && a.value !== v) {
        const _ = a.value, f = v, g = t.value[_], C = [...t.value];
        C.splice(_, 1), C.splice(f, 0, g), t.value = C, a.value = f;
      }
    }, b = () => {
      a.value !== null && (o("update:tags", t.value), a.value = null);
    };
    return (v, _) => (y(), w("div", ki, [
      t.value.length === 0 ? (y(), w("div", wi, _[0] || (_[0] = [
        i("p", null, "No tags yet. Start typing in the editor...", -1)
      ]))) : (y(), w("div", Ti, [
        k(xt, {
          name: "tag-list",
          tag: "div",
          class: "tags-container"
        }, {
          default: ce(() => [
            (y(!0), w(K, null, Z(t.value, (f, g) => (y(), w("div", {
              key: f.id,
              class: "tag-wrapper",
              draggable: "true",
              onDragstart: (C) => r(C, g),
              onDragover: p,
              onDragenter: (C) => h(g),
              onDragend: b
            }, [
              k(yi, {
                tag: f,
                onRemove: l,
                "onUpdate:weight": d,
                "onToggle:enabled": c
              }, null, 8, ["tag"])
            ], 40, Ci))), 128))
          ]),
          _: 1
        })
      ]))
    ]));
  }
}), $i = /* @__PURE__ */ q(xi, [["__scopeId", "data-v-5d3d64b5"]]), Si = { class: "toolbar" }, Ei = { class: "tag-count" }, Ii = /* @__PURE__ */ W({
  __name: "OtherFunctions",
  props: {
    tagCount: {}
  },
  emits: ["open-search"],
  setup(e, { emit: n }) {
    const s = n, { t: o } = X(), t = () => {
      s("open-search");
    };
    return (a, l) => (y(), w("div", Si, [
      i("button", {
        class: "toolbar-btn",
        onClick: t
      }, [
        k(u($), { icon: "mdi:magnify" }),
        i("span", null, m(u(o)("editor.searchBtn")), 1)
      ]),
      l[0] || (l[0] = i("div", { class: "separator" }, null, -1)),
      i("div", Ei, [
        k(u($), { icon: "mdi:tag-multiple" }),
        i("span", null, m(u(o)("editor.tagCount")) + m(a.tagCount || 0), 1)
      ])
    ]));
  }
}), Ai = /* @__PURE__ */ q(Ii, [["__scopeId", "data-v-22dfc699"]]), Li = { class: "modal-container" }, Ri = { class: "modal-header" }, Mi = { class: "modal-title" }, Di = ["title"], Pi = { class: "search-section" }, Oi = { class: "search-box" }, Fi = ["placeholder"], Ni = { class: "category-filters" }, ji = { class: "filter-label" }, Ui = ["onClick"], Vi = { class: "results-section" }, Bi = {
  key: 0,
  class: "loading-state"
}, Hi = {
  key: 1,
  class: "empty-state"
}, zi = {
  key: 2,
  class: "results-list"
}, Gi = ["onClick"], Wi = { class: "tag-info" }, Yi = { class: "tag-name-row" }, qi = { class: "tag-name" }, Qi = ["innerHTML"], Ki = ["innerHTML"], Ji = ["innerHTML"], Xi = { class: "tag-meta" }, Zi = { class: "category-label" }, ea = { class: "post-count" }, ta = { class: "actions" }, sa = ["onClick", "title"], na = ["title"], oa = {
  key: 3,
  class: "hint-state"
}, ia = /* @__PURE__ */ W({
  __name: "TagSearchModal",
  props: {
    visible: { type: Boolean }
  },
  emits: ["close", "add-tag"],
  setup(e, { emit: n }) {
    const s = e, { t: o } = X(), t = n, a = x(""), l = x([]), d = x(!1), c = x([]), r = fe(() => [
      { value: D.GENERAL, label: o("search.categories.general"), color: V[D.GENERAL] },
      { value: D.ARTIST, label: o("search.categories.artist"), color: V[D.ARTIST] },
      { value: D.CHARACTER, label: o("search.categories.character"), color: V[D.CHARACTER] },
      { value: D.COPYRIGHT, label: o("search.categories.copyright"), color: V[D.COPYRIGHT] },
      { value: D.META, label: o("search.categories.meta"), color: V[D.META] }
    ]), p = (T) => {
      const M = c.value.indexOf(T);
      M > -1 ? c.value.splice(M, 1) : c.value.push(T), a.value.trim() && b();
    }, h = (T) => c.value.includes(T), b = async () => {
      const T = a.value.trim();
      if (!T || T.length < 2) {
        l.value = [];
        return;
      }
      d.value = !0;
      try {
        const A = await ge.getInstance().searchTags(T, 50, !0, c.value);
        l.value = A;
      } catch (M) {
        console.error("Search error:", M), l.value = [];
      } finally {
        d.value = !1;
      }
    };
    let v = null;
    const _ = () => {
      v && clearTimeout(v), v = setTimeout(() => {
        b();
      }, 300);
    }, f = (T) => {
      t("add-tag", T.name, T.category);
    }, g = () => {
      t("close");
    };
    Y(() => s.visible, (T) => {
      T || (a.value = "", l.value = [], c.value = []);
    });
    const C = (T) => {
      const M = r.value.find((A) => A.value === T);
      return M ? M.label : o("search.categories.unknown");
    }, E = (T) => V[T] || "#888", I = (T) => (T == null ? void 0 : T.toLocaleString()) || "0", S = (T, M) => {
      if (!M || !T) return T;
      const A = new RegExp(`(${M.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
      return T.replace(A, '<strong class="match-bold">$1</strong>');
    }, N = (T) => T.priority === 1, P = async (T, M) => {
      M.stopPropagation();
      const A = N(T);
      T.priority = A ? 4 : 1;
      try {
        const j = {
          name: T.name,
          is_liked: !A,
          category: T.category,
          post_count: T.post_count,
          alias: T.alias
        };
        await fetch("/simple-prompt/toggle-like-tag", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(j)
        });
      } catch (j) {
        console.error("Toggle like failed", j), T.priority = A ? 1 : 4;
      }
    };
    return (T, M) => (y(), oe(ke, { name: "fade" }, {
      default: ce(() => [
        T.visible ? (y(), w("div", {
          key: 0,
          class: "modal-overlay",
          onClick: ie(g, ["self"])
        }, [
          i("div", Li, [
            i("div", Ri, [
              i("div", Mi, [
                k(u($), {
                  icon: "mdi:database-search",
                  class: "title-icon"
                }),
                i("span", null, m(u(o)("search.title")), 1)
              ]),
              i("button", {
                class: "close-btn",
                onClick: g,
                title: u(o)("common.close")
              }, [
                k(u($), { icon: "mdi:close" })
              ], 8, Di)
            ]),
            i("div", Pi, [
              i("div", Oi, [
                k(u($), {
                  icon: "mdi:magnify",
                  class: "search-icon"
                }),
                H(i("input", {
                  "onUpdate:modelValue": M[0] || (M[0] = (A) => a.value = A),
                  type: "text",
                  placeholder: u(o)("search.placeholder"),
                  class: "search-input",
                  onInput: _,
                  autofocus: ""
                }, null, 40, Fi), [
                  [ne, a.value]
                ]),
                a.value ? (y(), w("button", {
                  key: 0,
                  class: "clear-btn",
                  onClick: M[1] || (M[1] = (A) => {
                    a.value = "", l.value = [];
                  }),
                  title: "Clear"
                }, [
                  k(u($), { icon: "mdi:close-circle" })
                ])) : F("", !0)
              ]),
              i("div", Ni, [
                i("span", ji, m(u(o)("search.filterLabel")), 1),
                (y(!0), w(K, null, Z(r.value, (A) => (y(), w("button", {
                  key: A.value,
                  class: ee(["category-chip", { active: h(A.value) }]),
                  style: J({ "--category-color": A.color }),
                  onClick: (j) => p(A.value)
                }, [
                  i("span", {
                    class: "category-dot",
                    style: J({ backgroundColor: A.color })
                  }, null, 4),
                  U(" " + m(A.label), 1)
                ], 14, Ui))), 128))
              ])
            ]),
            i("div", Vi, [
              d.value ? (y(), w("div", Bi, [
                k(u($), {
                  icon: "mdi:loading",
                  class: "spin"
                }),
                i("span", null, m(u(o)("search.loading")), 1)
              ])) : l.value.length === 0 && a.value.trim() ? (y(), w("div", Hi, [
                k(u($), { icon: "mdi:magnify-close" }),
                i("p", null, m(u(o)("search.noResults")), 1)
              ])) : l.value.length > 0 ? (y(), w("div", zi, [
                (y(!0), w(K, null, Z(l.value, (A) => (y(), w("div", {
                  key: A.name,
                  class: "result-item",
                  style: J({ "--cat-color": E(A.category) }),
                  onClick: (j) => f(A)
                }, [
                  i("div", Wi, [
                    i("div", Yi, [
                      M[2] || (M[2] = i("span", { class: "category-indicator" }, null, -1)),
                      i("span", qi, [
                        A.matched_alias ? (y(), w(K, { key: 1 }, [
                          i("span", {
                            innerHTML: S(A.name, a.value)
                          }, null, 8, Ki),
                          i("span", {
                            class: "alias-indicator",
                            innerHTML: S(A.matched_alias, a.value)
                          }, null, 8, Ji)
                        ], 64)) : (y(), w("span", {
                          key: 0,
                          innerHTML: S(A.name, a.value)
                        }, null, 8, Qi))
                      ])
                    ]),
                    i("div", Xi, [
                      i("span", Zi, m(C(A.category)), 1),
                      i("span", ea, [
                        k(u($), { icon: "mdi:image-multiple" }),
                        U(" " + m(I(A.post_count)), 1)
                      ])
                    ])
                  ]),
                  i("div", ta, [
                    i("button", {
                      class: ee(["action-btn like-btn", { liked: N(A) }]),
                      onClick: (j) => P(A, j),
                      title: N(A) ? "Unlike" : "Like"
                    }, [
                      k(u($), {
                        icon: N(A) ? "mdi:heart" : "mdi:heart-outline"
                      }, null, 8, ["icon"])
                    ], 10, sa),
                    i("button", {
                      class: "action-btn add-btn",
                      title: u(o)("search.addBtnTitle")
                    }, [
                      k(u($), { icon: "mdi:plus" })
                    ], 8, na)
                  ])
                ], 12, Gi))), 128))
              ])) : (y(), w("div", oa, [
                k(u($), { icon: "mdi:information-outline" }),
                i("p", null, m(u(o)("search.hint")), 1)
              ]))
            ])
          ])
        ])) : F("", !0)
      ]),
      _: 1
    }));
  }
}), aa = /* @__PURE__ */ q(ia, [["__scopeId", "data-v-6f10f098"]]);
function he(e) {
  if (!e.trim()) return [];
  const n = [];
  let s = 0, o = 0, t = "", a = "", l = "";
  for (; o < e.length; ) {
    const d = e[o];
    if (d === "\\" && o + 1 < e.length) {
      const c = e[o + 1];
      if (c === "(" || c === ")") {
        t += c, o += 2;
        continue;
      }
    }
    if (d === "(") {
      t.trim() && (n.push({
        id: `tag-${s++}`,
        text: t.trim(),
        weight: 1,
        enabled: !0,
        category: D.GENERAL
      }), t = "");
      let c = 1, r = o + 1;
      for (; r < e.length && c > 0; ) {
        if (e[r] === "\\" && r + 1 < e.length) {
          r += 2;
          continue;
        }
        e[r] === "(" && c++, e[r] === ")" && c--, r++;
      }
      if (c === 0) {
        const p = e.substring(o + 1, r - 1), h = p.indexOf(":");
        if (h > 0) {
          l = p.substring(0, h).trim(), a = p.substring(h + 1).trim();
          const b = parseFloat(a);
          !isNaN(b) && l && n.push({
            id: `tag-${s++}`,
            text: l,
            weight: b,
            enabled: !0,
            category: D.GENERAL
          });
        } else
          t += e.substring(o, r);
        o = r;
        continue;
      }
    }
    if (d === ",") {
      t.trim() && (n.push({
        id: `tag-${s++}`,
        text: t.trim(),
        weight: 1,
        enabled: !0,
        category: D.GENERAL
      }), t = ""), o++;
      continue;
    }
    t += d, o++;
  }
  return t.trim() && n.push({
    id: `tag-${s++}`,
    text: t.trim(),
    weight: 1,
    enabled: !0,
    category: D.GENERAL
  }), n;
}
function Ze(e) {
  return e.filter((n) => n.enabled).map((n) => n.weight !== 1 ? `(${n.text}:${n.weight.toFixed(1)})` : n.text).join(", ");
}
const la = { class: "sp-toolbar" }, ca = ["title"], ra = ["title"], ua = ["placeholder"], da = { class: "sp-visual-area" }, fa = { class: "sp-footer" }, pa = /* @__PURE__ */ W({
  __name: "TextEditor",
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue", "cursor-move", "open-custom-tag"],
  setup(e, { expose: n, emit: s }) {
    const o = e, t = s, { t: a } = X(), l = x(null), d = x(null), c = x(o.modelValue), r = x([]), p = x(60), h = x(!1);
    r.value = he(c.value);
    const b = x(!1), v = x([]), _ = x(0), f = x({ top: 0, left: 0 }), g = x(""), C = x(0), E = x(!1), I = x(!1);
    Y(() => o.modelValue, (L) => {
      L !== c.value && (c.value = L, r.value = he(L));
    });
    const S = (L) => {
      const R = L.target;
      c.value = R.value, t("update:modelValue", R.value), r.value = he(R.value), j(R);
    }, N = (L) => {
      r.value = L;
      const R = Ze(L);
      R !== c.value && (c.value = R, t("update:modelValue", R));
    }, P = async () => {
      try {
        await navigator.clipboard.writeText(c.value), console.log("Copied to clipboard");
      } catch (L) {
        console.error("Failed to copy: ", L);
      }
    }, T = (L) => {
      h.value = !0, document.addEventListener("mousemove", M), document.addEventListener("mouseup", A), document.body.style.userSelect = "none";
    }, M = (L) => {
      if (!h.value || !d.value) return;
      const R = d.value.getBoundingClientRect();
      let B = (L.clientY - R.top) / R.height * 100;
      B < 20 && (B = 20), B > 80 && (B = 80), p.value = B;
    }, A = () => {
      h.value = !1, document.removeEventListener("mousemove", M), document.removeEventListener("mouseup", A), document.body.style.userSelect = "";
    };
    Me(() => {
      document.removeEventListener("mousemove", M), document.removeEventListener("mouseup", A);
    });
    const j = async (L) => {
      const R = L.selectionEnd, z = L.value.substring(0, R), B = /([a-zA-Z0-9_\u4e00-\u9fa5]{2,})$/.exec(z);
      if (B) {
        const G = B[1];
        g.value = G, C.value = B.index;
        const Q = si(L, R);
        f.value = {
          top: Q.top + Q.height + 5,
          // 5px padding
          left: Q.left
        }, E.value = !0, b.value = !0;
        try {
          console.log(`[Autocomplete] Searching for: "${G}"`);
          const re = await ge.getInstance().searchTags(G, 20, O.useAliasesInAutocomplete);
          v.value = re, _.value = 0;
        } catch (te) {
          console.error("Autocomplete search error:", te);
        } finally {
          E.value = !1;
        }
      } else
        b.value = !1;
    }, gt = (L) => {
      if (b.value && v.value.length > 0) {
        if (L.key === "ArrowUp") {
          L.preventDefault(), _.value = (_.value - 1 + v.value.length) % v.value.length;
          return;
        }
        if (L.key === "ArrowDown") {
          L.preventDefault(), _.value = (_.value + 1) % v.value.length;
          return;
        }
        if (L.key === "Tab" || L.key === "Enter") {
          L.preventDefault(), Ne(v.value[_.value]);
          return;
        }
        if (L.key === "Escape") {
          L.preventDefault(), b.value = !1;
          return;
        }
      }
    }, Ne = (L) => {
      if (!l.value) return;
      const R = l.value, z = R.selectionEnd, B = c.value;
      let G = L.name;
      O.convertUnderscoreToSpace && (G = G.replace(/_/g, " ")), O.escapeBrackets && (G = G.replace(/\(/g, "\\(").replace(/\)/g, "\\)"));
      const Q = B.substring(0, C.value), te = B.substring(z);
      let re = te;
      !te.trim().startsWith(",") && !te.trim().startsWith(")") && (re = ", " + te);
      const Ce = Q + G + re;
      c.value = Ce, t("update:modelValue", Ce), r.value = he(Ce), b.value = !1, De(() => {
        const je = Q.length + G.length + (re.startsWith(", ") ? 2 : 0);
        R.setSelectionRange(je, je), R.focus();
      });
    }, ht = () => {
      setTimeout(() => {
        b.value = !1;
      }, 200);
    }, mt = () => {
      I.value = !0;
    }, vt = () => {
      I.value = !1;
    }, _t = (L, R) => {
      let z = L;
      O.convertUnderscoreToSpace && (z = z.replace(/_/g, " ")), O.escapeBrackets && (z = z.replace(/\(/g, "\\(").replace(/\)/g, "\\)"));
      const B = {
        id: `tag-${Date.now()}-${Math.random()}`,
        text: z,
        weight: 1,
        enabled: !0,
        category: R
      }, G = [...r.value, B];
      r.value = G;
      const Q = Ze(G);
      c.value = Q, t("update:modelValue", Q);
    };
    return n({ focus: () => {
      var L;
      (L = l.value) == null || L.focus();
    } }), (L, R) => (y(), w("div", {
      class: "sp-editor-container",
      ref_key: "containerRef",
      ref: d
    }, [
      i("div", la, [
        i("button", {
          class: "sp-btn",
          onClick: P,
          title: u(a)("editor.copyTitle")
        }, [
          R[2] || (R[2] = i("span", { class: "icon" }, "📋", -1)),
          U(" " + m(u(a)("editor.copy")), 1)
        ], 8, ca),
        i("button", {
          class: "sp-btn",
          onClick: R[0] || (R[0] = (z) => L.$emit("open-custom-tag")),
          title: u(a)("customTag.addBtnTitle")
        }, [
          R[3] || (R[3] = i("span", { class: "icon" }, "➕", -1)),
          U(" " + m(u(a)("customTag.addBtnTitle")), 1)
        ], 8, ra)
      ]),
      i("div", {
        class: "sp-editor-area",
        style: J({ height: `calc(${p.value}% - 40px)` })
      }, [
        H(i("textarea", {
          ref_key: "textareaRef",
          ref: l,
          class: "sp-textarea",
          "onUpdate:modelValue": R[1] || (R[1] = (z) => c.value = z),
          onInput: S,
          onKeydown: gt,
          onBlur: ht,
          placeholder: u(a)("editor.placeholder"),
          spellcheck: "false"
        }, null, 40, ua), [
          [ne, c.value]
        ]),
        b.value ? (y(), w("div", {
          key: 0,
          class: "autocomplete-wrapper",
          style: J({ top: f.value.top + "px", left: f.value.left + "px" })
        }, [
          k(pi, {
            items: v.value,
            "selected-index": _.value,
            loading: E.value,
            onSelect: Ne
          }, null, 8, ["items", "selected-index", "loading"])
        ], 4)) : F("", !0)
      ], 4),
      i("div", {
        class: "sp-splitter",
        onMousedown: T
      }, R[4] || (R[4] = [
        i("div", { class: "sp-splitter-handle" }, null, -1)
      ]), 32),
      i("div", da, [
        k($i, {
          tags: r.value,
          "onUpdate:tags": N
        }, null, 8, ["tags"])
      ]),
      i("div", fa, [
        k(Ai, {
          "tag-count": r.value.length,
          onOpenSearch: mt
        }, null, 8, ["tag-count"])
      ]),
      k(aa, {
        visible: I.value,
        onClose: vt,
        onAddTag: _t
      }, null, 8, ["visible"])
    ], 512));
  }
}), ga = /* @__PURE__ */ q(pa, [["__scopeId", "data-v-8a7d15e7"]]), ha = { style: { width: "100%", height: "100%" } }, ya = /* @__PURE__ */ W({
  __name: "App",
  props: {
    initialPrompt: {}
  },
  emits: ["save", "close"],
  setup(e, { emit: n }) {
    const s = e, o = n, t = x(!0), a = x(s.initialPrompt), l = x("Initializing...");
    ye(async () => {
      try {
        await ge.getInstance().init(), l.value = "Ready";
      } catch (r) {
        console.error("DB Error:", r), l.value = `Error: ${r}`;
      }
    });
    const d = () => {
      t.value = !1, o("close");
    }, c = () => {
      o("save", a.value), t.value = !1;
    };
    return (r, p) => (y(), oe(ti, {
      visible: t.value,
      onClose: d,
      onSave: c
    }, {
      content: ce(({ openCustomTag: h }) => [
        i("div", ha, [
          k(ga, {
            modelValue: a.value,
            "onUpdate:modelValue": p[0] || (p[0] = (b) => a.value = b),
            onOpenCustomTag: h
          }, null, 8, ["modelValue", "onOpenCustomTag"])
        ])
      ]),
      _: 1
    }, 8, ["visible"]));
  }
});
export {
  ya as default
};
