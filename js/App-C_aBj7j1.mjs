var Ct = Object.defineProperty;
var xt = (e, n, s) => n in e ? Ct(e, n, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[n] = s;
var Se = (e, n, s) => xt(e, typeof n != "symbol" ? n + "" : n, s);
import { defineComponent as W, ref as x, shallowRef as $t, onMounted as be, watch as Q, onUnmounted as Pe, h as Ve, nextTick as Oe, reactive as St, createBlock as oe, openBlock as b, Transition as we, withCtx as re, createElementBlock as C, createCommentVNode as j, withModifiers as ie, createElementVNode as i, createVNode as k, unref as u, toDisplayString as m, withDirectives as G, createTextVNode as H, vModelText as ne, Fragment as K, renderList as Z, normalizeStyle as J, normalizeClass as ee, computed as pe, vModelCheckbox as ae, vModelSelect as Et, renderSlot as It, TransitionGroup as At } from "./vue.runtime.esm-bundler-DMW2pLBK.mjs";
import { u as X } from "./vue-i18n-CDK56dMz.mjs";
const st = /^[a-z0-9]+(-[a-z0-9]+)*$/, ke = (e, n, s, o = "") => {
  const t = e.split(":");
  if (e.slice(0, 1) === "@") {
    if (t.length < 2 || t.length > 3)
      return null;
    o = t.shift().slice(1);
  }
  if (t.length > 3 || !t.length)
    return null;
  if (t.length > 1) {
    const d = t.pop(), r = t.pop(), c = {
      // Allow provider without '@': "provider:prefix:name"
      provider: t.length > 0 ? t[0] : o,
      prefix: r,
      name: d
    };
    return n && !me(c) ? null : c;
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
((n && e.prefix === "" || e.prefix) && e.name) : !1, nt = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
), ye = Object.freeze({
  rotate: 0,
  vFlip: !1,
  hFlip: !1
}), Te = Object.freeze({
  ...nt,
  ...ye
}), Le = Object.freeze({
  ...Te,
  body: "",
  hidden: !1
});
function Lt(e, n) {
  const s = {};
  !e.hFlip != !n.hFlip && (s.hFlip = !0), !e.vFlip != !n.vFlip && (s.vFlip = !0);
  const o = ((e.rotate || 0) + (n.rotate || 0)) % 4;
  return o && (s.rotate = o), s;
}
function He(e, n) {
  const s = Lt(e, n);
  for (const o in Le)
    o in ye ? o in e && !(o in s) && (s[o] = ye[o]) : o in n ? s[o] = n[o] : o in e && (s[o] = e[o]);
  return s;
}
function Rt(e, n) {
  const s = e.icons, o = e.aliases || /* @__PURE__ */ Object.create(null), t = /* @__PURE__ */ Object.create(null);
  function a(l) {
    if (s[l])
      return t[l] = [];
    if (!(l in t)) {
      t[l] = null;
      const d = o[l] && o[l].parent, r = d && a(d);
      r && (t[l] = [d].concat(r));
    }
    return t[l];
  }
  return Object.keys(s).concat(Object.keys(o)).forEach(a), t;
}
function Dt(e, n, s) {
  const o = e.icons, t = e.aliases || /* @__PURE__ */ Object.create(null);
  let a = {};
  function l(d) {
    a = He(
      o[d] || t[d],
      a
    );
  }
  return l(n), s.forEach(l), He(e, a);
}
function ot(e, n) {
  const s = [];
  if (typeof e != "object" || typeof e.icons != "object")
    return s;
  e.not_found instanceof Array && e.not_found.forEach((t) => {
    n(t, null), s.push(t);
  });
  const o = Rt(e);
  for (const t in o) {
    const a = o[t];
    a && (n(t, Dt(e, t, a)), s.push(t));
  }
  return s;
}
const Mt = {
  provider: "",
  aliases: {},
  not_found: {},
  ...nt
};
function Ee(e, n) {
  for (const s in n)
    if (s in e && typeof e[s] != typeof n[s])
      return !1;
  return !0;
}
function it(e) {
  if (typeof e != "object" || e === null)
    return null;
  const n = e;
  if (typeof n.prefix != "string" || !e.icons || typeof e.icons != "object" || !Ee(e, Mt))
    return null;
  const s = n.icons;
  for (const t in s) {
    const a = s[t];
    if (
      // Name cannot be empty
      !t || // Must have body
      typeof a.body != "string" || // Check other props
      !Ee(
        a,
        Le
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
      !Ee(
        a,
        Le
      )
    )
      return null;
  }
  return n;
}
const ze = /* @__PURE__ */ Object.create(null);
function Pt(e, n) {
  return {
    provider: e,
    prefix: n,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function le(e, n) {
  const s = ze[e] || (ze[e] = /* @__PURE__ */ Object.create(null));
  return s[n] || (s[n] = Pt(e, n));
}
function at(e, n) {
  return it(n) ? ot(n, (s, o) => {
    o ? e.icons[s] = o : e.missing.add(s);
  }) : [];
}
function Ot(e, n, s) {
  try {
    if (typeof s.body == "string")
      return e.icons[n] = { ...s }, !0;
  } catch {
  }
  return !1;
}
let ge = !1;
function lt(e) {
  return typeof e == "boolean" && (ge = e), ge;
}
function Ft(e) {
  const n = typeof e == "string" ? ke(e, !0, ge) : e;
  if (n) {
    const s = le(n.provider, n.prefix), o = n.name;
    return s.icons[o] || (s.missing.has(o) ? null : void 0);
  }
}
function Nt(e, n) {
  const s = ke(e, !0, ge);
  if (!s)
    return !1;
  const o = le(s.provider, s.prefix);
  return n ? Ot(o, s.name, n) : (o.missing.add(s.name), !0);
}
function jt(e, n) {
  if (typeof e != "object")
    return !1;
  if (typeof n != "string" && (n = e.provider || ""), ge && !n && !e.prefix) {
    let t = !1;
    return it(e) && (e.prefix = "", ot(e, (a, l) => {
      Nt(a, l) && (t = !0);
    })), t;
  }
  const s = e.prefix;
  if (!me({
    prefix: s,
    name: "a"
  }))
    return !1;
  const o = le(n, s);
  return !!at(o, e);
}
const ct = Object.freeze({
  width: null,
  height: null
}), rt = Object.freeze({
  // Dimensions
  ...ct,
  // Transformations
  ...ye
}), Ut = /(-?[0-9.]*[0-9]+[0-9.]*)/g, Bt = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function Ge(e, n, s) {
  if (n === 1)
    return e;
  if (s = s || 100, typeof e == "number")
    return Math.ceil(e * n * s) / s;
  if (typeof e != "string")
    return e;
  const o = e.split(Ut);
  if (o === null || !o.length)
    return e;
  const t = [];
  let a = o.shift(), l = Bt.test(a);
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
function Vt(e, n = "defs") {
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
function Ht(e, n) {
  return e ? "<defs>" + e + "</defs>" + n : n;
}
function zt(e, n, s) {
  const o = Vt(e);
  return Ht(o.defs, n + o.content + s);
}
const Gt = (e) => e === "unset" || e === "undefined" || e === "none";
function Wt(e, n) {
  const s = {
    ...Te,
    ...e
  }, o = {
    ...rt,
    ...n
  }, t = {
    left: s.left,
    top: s.top,
    width: s.width,
    height: s.height
  };
  let a = s.body;
  [s, o].forEach((f) => {
    const g = [], w = f.hFlip, $ = f.vFlip;
    let I = f.rotate;
    w ? $ ? I += 2 : (g.push(
      "translate(" + (t.width + t.left).toString() + " " + (0 - t.top).toString() + ")"
    ), g.push("scale(-1 1)"), t.top = t.left = 0) : $ && (g.push(
      "translate(" + (0 - t.left).toString() + " " + (t.height + t.top).toString() + ")"
    ), g.push("scale(1 -1)"), t.top = t.left = 0);
    let E;
    switch (I < 0 && (I -= Math.floor(I / 4) * 4), I = I % 4, I) {
      case 1:
        E = t.height / 2 + t.top, g.unshift(
          "rotate(90 " + E.toString() + " " + E.toString() + ")"
        );
        break;
      case 2:
        g.unshift(
          "rotate(180 " + (t.width / 2 + t.left).toString() + " " + (t.height / 2 + t.top).toString() + ")"
        );
        break;
      case 3:
        E = t.width / 2 + t.left, g.unshift(
          "rotate(-90 " + E.toString() + " " + E.toString() + ")"
        );
        break;
    }
    I % 2 === 1 && (t.left !== t.top && (E = t.left, t.left = t.top, t.top = E), t.width !== t.height && (E = t.width, t.width = t.height, t.height = E)), g.length && (a = zt(
      a,
      '<g transform="' + g.join(" ") + '">',
      "</g>"
    ));
  });
  const l = o.width, d = o.height, r = t.width, c = t.height;
  let p, h;
  l === null ? (h = d === null ? "1em" : d === "auto" ? c : d, p = Ge(h, r / c)) : (p = l === "auto" ? r : l, h = d === null ? Ge(p, c / r) : d === "auto" ? c : d);
  const y = {}, v = (f, g) => {
    Gt(g) || (y[f] = g.toString());
  };
  v("width", p), v("height", h);
  const _ = [t.left, t.top, r, c];
  return y.viewBox = _.join(" "), {
    attributes: y,
    viewBox: _,
    body: a
  };
}
const Qt = /\sid="(\S+)"/g, Yt = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let qt = 0;
function Kt(e, n = Yt) {
  const s = [];
  let o;
  for (; o = Qt.exec(e); )
    s.push(o[1]);
  if (!s.length)
    return e;
  const t = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return s.forEach((a) => {
    const l = typeof n == "function" ? n(a) : n + (qt++).toString(), d = a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    e = e.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + d + ')([")]|\\.[a-z])', "g"),
      "$1" + l + t + "$3"
    );
  }), e = e.replace(new RegExp(t, "g"), ""), e;
}
const Re = /* @__PURE__ */ Object.create(null);
function Jt(e, n) {
  Re[e] = n;
}
function De(e) {
  return Re[e] || Re[""];
}
function Fe(e) {
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
const Ne = /* @__PURE__ */ Object.create(null), de = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
], ve = [];
for (; de.length > 0; )
  de.length === 1 || Math.random() > 0.5 ? ve.push(de.shift()) : ve.push(de.pop());
Ne[""] = Fe({
  resources: ["https://api.iconify.design"].concat(ve)
});
function Xt(e, n) {
  const s = Fe(n);
  return s === null ? !1 : (Ne[e] = s, !0);
}
function je(e) {
  return Ne[e];
}
const Zt = () => {
  let e;
  try {
    if (e = fetch, typeof e == "function")
      return e;
  } catch {
  }
};
let We = Zt();
function es(e, n) {
  const s = je(e);
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
function ts(e) {
  return e === 404;
}
const ss = (e, n, s) => {
  const o = [], t = es(e, n), a = "icons";
  let l = {
    type: a,
    provider: e,
    prefix: n,
    icons: []
  }, d = 0;
  return s.forEach((r, c) => {
    d += r.length + 1, d >= t && c > 0 && (o.push(l), l = {
      type: a,
      provider: e,
      prefix: n,
      icons: []
    }, d = r.length), l.icons.push(r);
  }), o.push(l), o;
};
function ns(e) {
  if (typeof e == "string") {
    const n = je(e);
    if (n)
      return n.path;
  }
  return "/";
}
const os = (e, n, s) => {
  if (!We) {
    s("abort", 424);
    return;
  }
  let o = ns(n.provider);
  switch (n.type) {
    case "icons": {
      const a = n.prefix, d = n.icons.join(","), r = new URLSearchParams({
        icons: d
      });
      o += a + ".json?" + r.toString();
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
  We(e + o).then((a) => {
    const l = a.status;
    if (l !== 200) {
      setTimeout(() => {
        s(ts(l) ? "abort" : "next", l);
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
}, is = {
  prepare: ss,
  send: os
};
function as(e) {
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
    const a = t.provider, l = t.prefix, d = t.name, r = s[a] || (s[a] = /* @__PURE__ */ Object.create(null)), c = r[l] || (r[l] = le(a, l));
    let p;
    d in c.icons ? p = n.loaded : l === "" || c.missing.has(d) ? p = n.missing : p = n.pending;
    const h = {
      provider: a,
      prefix: l,
      name: d
    };
    p.push(h);
  }), n;
}
function ut(e, n) {
  e.forEach((s) => {
    const o = s.loaderCallbacks;
    o && (s.loaderCallbacks = o.filter((t) => t.id !== n));
  });
}
function ls(e) {
  e.pendingCallbacksFlag || (e.pendingCallbacksFlag = !0, setTimeout(() => {
    e.pendingCallbacksFlag = !1;
    const n = e.loaderCallbacks ? e.loaderCallbacks.slice(0) : [];
    if (!n.length)
      return;
    let s = !1;
    const o = e.provider, t = e.prefix;
    n.forEach((a) => {
      const l = a.icons, d = l.pending.length;
      l.pending = l.pending.filter((r) => {
        if (r.prefix !== t)
          return !0;
        const c = r.name;
        if (e.icons[c])
          l.loaded.push({
            provider: o,
            prefix: t,
            name: c
          });
        else if (e.missing.has(c))
          l.missing.push({
            provider: o,
            prefix: t,
            name: c
          });
        else
          return s = !0, !0;
        return !1;
      }), l.pending.length !== d && (s || ut([e], a.id), a.callback(
        l.loaded.slice(0),
        l.missing.slice(0),
        l.pending.slice(0),
        a.abort
      ));
    });
  }));
}
let cs = 0;
function rs(e, n, s) {
  const o = cs++, t = ut.bind(null, s, o);
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
function us(e, n = !0, s = !1) {
  const o = [];
  return e.forEach((t) => {
    const a = typeof t == "string" ? ke(t, n, s) : t;
    a && o.push(a);
  }), o;
}
var ds = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function fs(e, n, s, o) {
  const t = e.resources.length, a = e.random ? Math.floor(Math.random() * t) : e.index;
  let l;
  if (e.random) {
    let D = e.resources.slice(0);
    for (l = []; D.length > 1; ) {
      const T = Math.floor(Math.random() * D.length);
      l.push(D[T]), D = D.slice(0, T).concat(D.slice(T + 1));
    }
    l = l.concat(D);
  } else
    l = e.resources.slice(a).concat(e.resources.slice(0, a));
  const d = Date.now();
  let r = "pending", c = 0, p, h = null, y = [], v = [];
  typeof o == "function" && v.push(o);
  function _() {
    h && (clearTimeout(h), h = null);
  }
  function f() {
    r === "pending" && (r = "aborted"), _(), y.forEach((D) => {
      D.status === "pending" && (D.status = "aborted");
    }), y = [];
  }
  function g(D, T) {
    T && (v = []), typeof D == "function" && v.push(D);
  }
  function w() {
    return {
      startTime: d,
      payload: n,
      status: r,
      queriesSent: c,
      queriesPending: y.length,
      subscribe: g,
      abort: f
    };
  }
  function $() {
    r = "failed", v.forEach((D) => {
      D(void 0, p);
    });
  }
  function I() {
    y.forEach((D) => {
      D.status === "pending" && (D.status = "aborted");
    }), y = [];
  }
  function E(D, T, M) {
    const L = T !== "success";
    switch (y = y.filter((V) => V !== D), r) {
      case "pending":
        break;
      case "failed":
        if (L || !e.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (T === "abort") {
      p = M, $();
      return;
    }
    if (L) {
      p = M, y.length || (l.length ? B() : $());
      return;
    }
    if (_(), I(), !e.random) {
      const V = e.resources.indexOf(D.resource);
      V !== -1 && V !== e.index && (e.index = V);
    }
    r = "completed", v.forEach((V) => {
      V(M);
    });
  }
  function B() {
    if (r !== "pending")
      return;
    _();
    const D = l.shift();
    if (D === void 0) {
      if (y.length) {
        h = setTimeout(() => {
          _(), r === "pending" && (I(), $());
        }, e.timeout);
        return;
      }
      $();
      return;
    }
    const T = {
      status: "pending",
      resource: D,
      callback: (M, L) => {
        E(T, M, L);
      }
    };
    y.push(T), c++, h = setTimeout(B, e.rotate), s(D, n, T.callback);
  }
  return setTimeout(B), w;
}
function dt(e) {
  const n = {
    ...ds,
    ...e
  };
  let s = [];
  function o() {
    s = s.filter((d) => d().status === "pending");
  }
  function t(d, r, c) {
    const p = fs(
      n,
      d,
      r,
      (h, y) => {
        o(), c && c(h, y);
      }
    );
    return s.push(p), p;
  }
  function a(d) {
    return s.find((r) => d(r)) || null;
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
function Qe() {
}
const Ie = /* @__PURE__ */ Object.create(null);
function ps(e) {
  if (!Ie[e]) {
    const n = je(e);
    if (!n)
      return;
    const s = dt(n), o = {
      config: n,
      redundancy: s
    };
    Ie[e] = o;
  }
  return Ie[e];
}
function gs(e, n, s) {
  let o, t;
  if (typeof e == "string") {
    const a = De(e);
    if (!a)
      return s(void 0, 424), Qe;
    t = a.send;
    const l = ps(e);
    l && (o = l.redundancy);
  } else {
    const a = Fe(e);
    if (a) {
      o = dt(a);
      const l = e.resources ? e.resources[0] : "", d = De(l);
      d && (t = d.send);
    }
  }
  return !o || !t ? (s(void 0, 424), Qe) : o.query(n, t, s)().abort;
}
function Ye() {
}
function hs(e) {
  e.iconsLoaderFlag || (e.iconsLoaderFlag = !0, setTimeout(() => {
    e.iconsLoaderFlag = !1, ls(e);
  }));
}
function ms(e) {
  const n = [], s = [];
  return e.forEach((o) => {
    (o.match(st) ? n : s).push(o);
  }), {
    valid: n,
    invalid: s
  };
}
function fe(e, n, s) {
  function o() {
    const t = e.pendingIcons;
    n.forEach((a) => {
      t && t.delete(a), e.icons[a] || e.missing.add(a);
    });
  }
  if (s && typeof s == "object")
    try {
      if (!at(e, s).length) {
        o();
        return;
      }
    } catch (t) {
      console.error(t);
    }
  o(), hs(e);
}
function qe(e, n) {
  e instanceof Promise ? e.then((s) => {
    n(s);
  }).catch(() => {
    n(null);
  }) : n(e);
}
function vs(e, n) {
  e.iconsToLoad ? e.iconsToLoad = e.iconsToLoad.concat(n).sort() : e.iconsToLoad = n, e.iconsQueueFlag || (e.iconsQueueFlag = !0, setTimeout(() => {
    e.iconsQueueFlag = !1;
    const { provider: s, prefix: o } = e, t = e.iconsToLoad;
    if (delete e.iconsToLoad, !t || !t.length)
      return;
    const a = e.loadIcon;
    if (e.loadIcons && (t.length > 1 || !a)) {
      qe(
        e.loadIcons(t, o, s),
        (p) => {
          fe(e, t, p);
        }
      );
      return;
    }
    if (a) {
      t.forEach((p) => {
        const h = a(p, o, s);
        qe(h, (y) => {
          const v = y ? {
            prefix: o,
            icons: {
              [p]: y
            }
          } : null;
          fe(e, [p], v);
        });
      });
      return;
    }
    const { valid: l, invalid: d } = ms(t);
    if (d.length && fe(e, d, null), !l.length)
      return;
    const r = o.match(st) ? De(s) : null;
    if (!r) {
      fe(e, l, null);
      return;
    }
    r.prepare(s, o, l).forEach((p) => {
      gs(s, p, (h) => {
        fe(e, p.icons, h);
      });
    });
  }));
}
const _s = (e, n) => {
  const s = us(e, !0, lt()), o = as(s);
  if (!o.pending.length) {
    let r = !0;
    return n && setTimeout(() => {
      r && n(
        o.loaded,
        o.missing,
        o.pending,
        Ye
      );
    }), () => {
      r = !1;
    };
  }
  const t = /* @__PURE__ */ Object.create(null), a = [];
  let l, d;
  return o.pending.forEach((r) => {
    const { provider: c, prefix: p } = r;
    if (p === d && c === l)
      return;
    l = c, d = p, a.push(le(c, p));
    const h = t[c] || (t[c] = /* @__PURE__ */ Object.create(null));
    h[p] || (h[p] = []);
  }), o.pending.forEach((r) => {
    const { provider: c, prefix: p, name: h } = r, y = le(c, p), v = y.pendingIcons || (y.pendingIcons = /* @__PURE__ */ new Set());
    v.has(h) || (v.add(h), t[c][p].push(h));
  }), a.forEach((r) => {
    const c = t[r.provider][r.prefix];
    c.length && vs(r, c);
  }), n ? rs(n, o, a) : Ye;
};
function ys(e, n) {
  const s = {
    ...e
  };
  for (const o in n) {
    const t = n[o], a = typeof t;
    o in ct ? (t === null || t && (a === "string" || a === "number")) && (s[o] = t) : a === typeof s[o] && (s[o] = o === "rotate" ? t % 4 : t);
  }
  return s;
}
const bs = /[\s,]+/;
function ws(e, n) {
  n.split(bs).forEach((s) => {
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
function ks(e, n = 0) {
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
function Ts(e, n) {
  let s = e.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const o in n)
    s += " " + o + '="' + n[o] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + s + ">" + e + "</svg>";
}
function Cs(e) {
  return e.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function xs(e) {
  return "data:image/svg+xml," + Cs(e);
}
function $s(e) {
  return 'url("' + xs(e) + '")';
}
const Ke = {
  ...rt,
  inline: !1
}, Ss = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": !0,
  role: "img"
}, Es = {
  display: "inline-block"
}, Me = {
  backgroundColor: "currentColor"
}, ft = {
  backgroundColor: "transparent"
}, Je = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
}, Xe = {
  webkitMask: Me,
  mask: Me,
  background: ft
};
for (const e in Xe) {
  const n = Xe[e];
  for (const s in Je)
    n[e + s] = Je[s];
}
const _e = {};
["horizontal", "vertical"].forEach((e) => {
  const n = e.slice(0, 1) + "Flip";
  _e[e + "-flip"] = n, _e[e.slice(0, 1) + "-flip"] = n, _e[e + "Flip"] = n;
});
function Ze(e) {
  return e + (e.match(/^[-0-9.]+$/) ? "px" : "");
}
const et = (e, n) => {
  const s = ys(Ke, n), o = { ...Ss }, t = n.mode || "svg", a = {}, l = n.style, d = typeof l == "object" && !(l instanceof Array) ? l : {};
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
          typeof g == "string" && ws(s, g);
          break;
        // Color: override style
        case "color":
          a.color = g;
          break;
        // Rotation as string
        case "rotate":
          typeof g == "string" ? s[f] = ks(g) : typeof g == "number" && (s[f] = g);
          break;
        // Remove aria-hidden
        case "ariaHidden":
        case "aria-hidden":
          g !== !0 && g !== "true" && delete o["aria-hidden"];
          break;
        default: {
          const w = _e[f];
          w ? (g === !0 || g === "true" || g === 1) && (s[w] = !0) : Ke[f] === void 0 && (o[f] = g);
        }
      }
  }
  const r = Wt(e, s), c = r.attributes;
  if (s.inline && (a.verticalAlign = "-0.125em"), t === "svg") {
    o.style = {
      ...a,
      ...d
    }, Object.assign(o, c);
    let f = 0, g = n.id;
    return typeof g == "string" && (g = g.replace(/-/g, "_")), o.innerHTML = Kt(r.body, g ? () => g + "ID" + f++ : "iconifyVue"), Ve("svg", o);
  }
  const { body: p, width: h, height: y } = e, v = t === "mask" || (t === "bg" ? !1 : p.indexOf("currentColor") !== -1), _ = Ts(p, {
    ...c,
    width: h + "",
    height: y + ""
  });
  return o.style = {
    ...a,
    "--svg": $s(_),
    width: Ze(c.width),
    height: Ze(c.height),
    ...Es,
    ...v ? Me : ft,
    ...d
  }, Ve("span", o);
};
lt(!0);
Jt("", is);
if (typeof document < "u" && typeof window < "u") {
  const e = window;
  if (e.IconifyPreload !== void 0) {
    const n = e.IconifyPreload, s = "Invalid IconifyPreload syntax.";
    typeof n == "object" && n !== null && (n instanceof Array ? n : [n]).forEach((o) => {
      try {
        // Check if item is an object and not null/array
        (typeof o != "object" || o === null || o instanceof Array || // Check for 'icons' and 'prefix'
        typeof o.icons != "object" || typeof o.prefix != "string" || // Add icon set
        !jt(o)) && console.error(s);
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
          Xt(s, t) || console.error(o);
        } catch {
          console.error(o);
        }
      }
  }
}
const Is = {
  ...Te,
  body: ""
}, A = W((e, { emit: n }) => {
  const s = x(null);
  function o() {
    var c, p;
    s.value && ((p = (c = s.value).abort) == null || p.call(c), s.value = null);
  }
  const t = x(!!e.ssr), a = x(""), l = $t(null);
  function d() {
    const c = e.icon;
    if (typeof c == "object" && c !== null && typeof c.body == "string")
      return a.value = "", {
        data: c
      };
    let p;
    if (typeof c != "string" || (p = ke(c, !1, !0)) === null)
      return null;
    let h = Ft(p);
    if (!h) {
      const _ = s.value;
      return (!_ || _.name !== c) && (h === null ? s.value = {
        name: c
      } : s.value = {
        name: c,
        abort: _s([p], r)
      }), null;
    }
    o(), a.value !== c && (a.value = c, Oe(() => {
      n("load", c);
    }));
    const y = e.customise;
    if (y) {
      h = Object.assign({}, h);
      const _ = y(h.body, p.name, p.prefix, p.provider);
      typeof _ == "string" && (h.body = _);
    }
    const v = ["iconify"];
    return p.prefix !== "" && v.push("iconify--" + p.prefix), p.provider !== "" && v.push("iconify--" + p.provider), { data: h, classes: v };
  }
  function r() {
    var p;
    const c = d();
    c ? c.data !== ((p = l.value) == null ? void 0 : p.data) && (l.value = c) : l.value = null;
  }
  return t.value ? r() : be(() => {
    t.value = !0, r();
  }), Q(() => e.icon, r), Pe(o), () => {
    const c = l.value;
    if (!c)
      return et(Is, e);
    let p = e;
    return c.classes && (p = {
      ...e,
      class: c.classes.join(" ")
    }), et({
      ...Te,
      ...c.data
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
}), pt = "simplePrompt.settings", gt = {
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
}, O = St({ ...gt });
function As() {
  try {
    const e = localStorage.getItem(pt);
    if (e) {
      const n = JSON.parse(e);
      Object.assign(O, { ...gt, ...n });
    } else
      navigator.language.startsWith("zh") && (O.language = "zh-CN");
  } catch (e) {
    console.error("Failed to load settings:", e);
  }
}
Q(O, (e) => {
  try {
    localStorage.setItem(pt, JSON.stringify(e));
  } catch (n) {
    console.error("Failed to save settings:", n);
  }
}, { deep: !0 });
As();
var P = /* @__PURE__ */ ((e) => (e[e.GENERAL = 0] = "GENERAL", e[e.ARTIST = 1] = "ARTIST", e[e.COPYRIGHT = 3] = "COPYRIGHT", e[e.CHARACTER = 4] = "CHARACTER", e[e.META = 5] = "META", e))(P || {});
const z = {
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
}, Ls = { class: "modal-container" }, Rs = { class: "modal-header" }, Ds = { class: "modal-title" }, Ms = ["title"], Ps = { class: "modal-body" }, Os = { class: "form-group" }, Fs = ["placeholder", "disabled"], Ns = { class: "form-group" }, js = { class: "category-options" }, Us = ["onClick"], Bs = { class: "form-group" }, Vs = { class: "hint" }, Hs = { class: "form-group" }, zs = ["placeholder"], Gs = { class: "hint" }, Ws = {
  key: 0,
  class: "message error"
}, Qs = {
  key: 1,
  class: "message success"
}, Ys = { class: "modal-footer" }, qs = ["disabled"], Ks = /* @__PURE__ */ W({
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
      category: P.GENERAL,
      post_count: 0,
      alias: ""
    }), l = x(!1), d = x(""), r = x(""), c = [
      { value: P.GENERAL, label: "General", color: z[P.GENERAL] },
      { value: P.ARTIST, label: "Artist", color: z[P.ARTIST] },
      { value: P.COPYRIGHT, label: "Copyright", color: z[P.COPYRIGHT] },
      { value: P.CHARACTER, label: "Character", color: z[P.CHARACTER] },
      { value: P.META, label: "Meta", color: z[P.META] }
    ], p = () => {
      a.value = {
        name: "",
        category: P.GENERAL,
        post_count: 0,
        alias: ""
      }, d.value = "", r.value = "";
    };
    Q(() => s.visible, (v) => {
      v && (s.editMode && s.initialData ? a.value = {
        name: s.initialData.name,
        category: s.initialData.category || P.GENERAL,
        post_count: s.initialData.post_count || 0,
        alias: Array.isArray(s.initialData.alias) ? s.initialData.alias.join(", ") : s.initialData.alias || ""
      } : p());
    });
    const h = () => {
      o("close");
    }, y = async () => {
      if (!a.value.name.trim()) {
        d.value = t("customTag.errorNameRequired");
        return;
      }
      l.value = !0, d.value = "", r.value = "";
      try {
        const v = a.value.alias.split(",").map((w) => w.trim()).filter((w) => w), _ = {
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
        r.value = s.editMode ? t("customTag.successEdited") || "Tag updated!" : t("customTag.successAdded"), setTimeout(() => {
          o("save"), h();
        }, 1e3);
      } catch (v) {
        console.error("Add tag error:", v), d.value = v.message || t("customTag.errorGeneric");
      } finally {
        l.value = !1;
      }
    };
    return (v, _) => (b(), oe(we, { name: "fade" }, {
      default: re(() => [
        v.visible ? (b(), C("div", {
          key: 0,
          class: "modal-overlay",
          onClick: ie(h, ["self"])
        }, [
          i("div", Ls, [
            i("div", Rs, [
              i("div", Ds, [
                k(u(A), {
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
                k(u(A), { icon: "mdi:close" })
              ], 8, Ms)
            ]),
            i("div", Ps, [
              i("div", Os, [
                i("label", null, [
                  H(m(u(t)("customTag.nameLabel")) + " ", 1),
                  _[3] || (_[3] = i("span", { class: "required" }, "*", -1))
                ]),
                G(i("input", {
                  "onUpdate:modelValue": _[0] || (_[0] = (f) => a.value.name = f),
                  type: "text",
                  placeholder: u(t)("customTag.namePlaceholder"),
                  class: "sp-input",
                  autofocus: "",
                  disabled: v.editMode
                }, null, 8, Fs), [
                  [ne, a.value.name]
                ])
              ]),
              i("div", Ns, [
                i("label", null, m(u(t)("customTag.categoryLabel")), 1),
                i("div", js, [
                  (b(), C(K, null, Z(c, (f) => i("button", {
                    key: f.value,
                    type: "button",
                    class: ee(["category-btn", { active: a.value.category === f.value }]),
                    style: J({ "--cat-color": f.color }),
                    onClick: (g) => a.value.category = f.value
                  }, [
                    _[4] || (_[4] = i("span", { class: "dot" }, null, -1)),
                    H(" " + m(f.label), 1)
                  ], 14, Us)), 64))
                ])
              ]),
              i("div", Bs, [
                i("label", null, m(u(t)("customTag.countLabel")), 1),
                G(i("input", {
                  "onUpdate:modelValue": _[1] || (_[1] = (f) => a.value.post_count = f),
                  type: "number",
                  min: "0",
                  class: "sp-input"
                }, null, 512), [
                  [ne, a.value.post_count]
                ]),
                i("p", Vs, m(u(t)("customTag.countHint")), 1)
              ]),
              i("div", Hs, [
                i("label", null, m(u(t)("customTag.aliasLabel")), 1),
                G(i("input", {
                  "onUpdate:modelValue": _[2] || (_[2] = (f) => a.value.alias = f),
                  type: "text",
                  placeholder: u(t)("customTag.aliasPlaceholder"),
                  class: "sp-input"
                }, null, 8, zs), [
                  [ne, a.value.alias]
                ]),
                i("p", Gs, m(u(t)("customTag.aliasHint")), 1)
              ]),
              d.value ? (b(), C("div", Ws, [
                k(u(A), { icon: "mdi:alert-circle" }),
                H(" " + m(d.value), 1)
              ])) : j("", !0),
              r.value ? (b(), C("div", Qs, [
                k(u(A), { icon: "mdi:check-circle" }),
                H(" " + m(r.value), 1)
              ])) : j("", !0)
            ]),
            i("div", Ys, [
              i("button", {
                class: "btn-cancel",
                onClick: h
              }, m(u(t)("common.cancel")), 1),
              i("button", {
                class: "btn-save",
                onClick: y,
                disabled: l.value
              }, [
                l.value ? (b(), oe(u(A), {
                  key: 0,
                  icon: "mdi:loading",
                  class: "spin"
                })) : j("", !0),
                i("span", null, m(u(t)("common.save")), 1)
              ], 8, qs)
            ])
          ])
        ])) : j("", !0)
      ]),
      _: 1
    }));
  }
}), Y = (e, n) => {
  const s = e.__vccOpts || e;
  for (const [o, t] of n)
    s[o] = t;
  return s;
}, ht = /* @__PURE__ */ Y(Ks, [["__scopeId", "data-v-83b7d6de"]]), Js = { class: "tag-manager" }, Xs = { class: "tabs" }, Zs = ["onClick"], en = { class: "toolbar" }, tn = { class: "search-box" }, sn = ["placeholder"], nn = { class: "status-info" }, on = {
  key: 0,
  class: "warning-banner"
}, an = { class: "table-container" }, ln = { class: "data-table" }, cn = {
  key: 0,
  class: "loading-row"
}, rn = { colspan: "5" }, un = {
  key: 1,
  class: "empty-row"
}, dn = { colspan: "5" }, fn = { class: "name-cell" }, pn = ["title"], gn = { align: "right" }, hn = {
  key: 0,
  class: "actions"
}, mn = ["onClick"], vn = ["onClick"], _n = {
  key: 1,
  class: "actions-disabled"
}, yn = { class: "pagination" }, bn = ["disabled"], wn = { class: "page-info" }, kn = ["disabled"], Ae = 20, Tn = /* @__PURE__ */ W({
  __name: "TagManager",
  setup(e) {
    const { t: n } = X(), s = x("user"), o = pe(() => [
      { id: "user", label: n("settings.items.updateUserTags") || "User Tags" },
      { id: "liked", label: n("settings.items.updateLikedTags") || "Liked Tags" },
      { id: "default", label: "Default Tags" }
    ]), t = x([]), a = x(0), l = x(!1), d = x(""), r = x(1), c = x(!1), p = x(null), h = async () => {
      l.value = !0;
      try {
        const $ = (r.value - 1) * Ae, I = new URLSearchParams({
          source: s.value,
          limit: Ae.toString(),
          offset: $.toString(),
          q: d.value
        }), E = await fetch(`/simple-prompt/tags/list?${I.toString()}`), B = await E.json();
        E.ok ? (t.value = B.data || [], a.value = B.total || 0) : console.error("Fetch tags failed:", B.error);
      } catch ($) {
        console.error("Fetch tags error:", $);
      } finally {
        l.value = !1;
      }
    }, y = async ($) => {
      if (confirm(n("common.confirm") + ` Delete '${$.name}'?`))
        try {
          const I = await fetch("/simple-prompt/tags/delete", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: $.name, source: s.value })
          });
          if (I.ok)
            h();
          else {
            const E = await I.json();
            alert("Delete failed: " + E.error);
          }
        } catch (I) {
          alert("Delete failed: " + I.message);
        }
    }, v = ($) => {
      p.value = $, c.value = !0;
    }, _ = () => {
      h();
    }, f = pe(() => s.value === "default" ? O.allowEditDefaultTags : !0);
    Q([s, d], () => {
      r.value = 1, h();
    }), Q(r, () => {
      h();
    }), be(() => {
      h();
    });
    const g = ($) => ({
      0: "General",
      1: "Artist",
      3: "Copyright",
      4: "Character",
      5: "Meta"
    })[$] || "Unknown", w = ($) => z[$] || "#aaa";
    return ($, I) => (b(), C("div", Js, [
      i("div", Xs, [
        (b(!0), C(K, null, Z(o.value, (E) => (b(), C("button", {
          key: E.id,
          class: ee(["tab-btn", { active: s.value === E.id }]),
          onClick: (B) => s.value = E.id
        }, m(E.label), 11, Zs))), 128))
      ]),
      i("div", en, [
        i("div", tn, [
          k(u(A), {
            icon: "mdi:magnify",
            class: "search-icon"
          }),
          G(i("input", {
            "onUpdate:modelValue": I[0] || (I[0] = (E) => d.value = E),
            type: "text",
            placeholder: u(n)("search.placeholder"),
            class: "search-input"
          }, null, 8, sn), [
            [ne, d.value]
          ])
        ]),
        i("div", nn, m(a.value) + " tags ", 1)
      ]),
      s.value === "default" && !f.value ? (b(), C("div", on, [
        k(u(A), { icon: "mdi:lock" }),
        I[4] || (I[4] = i("span", null, "Editing default tags is disabled in settings.", -1))
      ])) : j("", !0),
      i("div", an, [
        i("table", ln, [
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
            l.value ? (b(), C("tr", cn, [
              i("td", rn, [
                k(u(A), {
                  icon: "mdi:loading",
                  class: "spin"
                }),
                I[5] || (I[5] = H(" Loading... "))
              ])
            ])) : t.value.length === 0 ? (b(), C("tr", un, [
              i("td", dn, m(u(n)("search.noResults")), 1)
            ])) : (b(!0), C(K, { key: 2 }, Z(t.value, (E) => (b(), C("tr", {
              key: E.name
            }, [
              i("td", fn, m(E.name), 1),
              i("td", null, [
                i("span", {
                  class: "cat-badge",
                  style: J({ "--c": w(E.category) })
                }, m(g(E.category)), 5)
              ]),
              i("td", null, m(E.post_count), 1),
              i("td", {
                class: "alias-cell",
                title: E.alias ? E.alias.join(", ") : ""
              }, m(E.alias ? E.alias.join(", ") : "-"), 9, pn),
              i("td", gn, [
                f.value ? (b(), C("div", hn, [
                  i("button", {
                    class: "action-btn edit",
                    onClick: (B) => v(E),
                    title: "Edit"
                  }, [
                    k(u(A), { icon: "mdi:pencil" })
                  ], 8, mn),
                  i("button", {
                    class: "action-btn delete",
                    onClick: (B) => y(E),
                    title: "Delete"
                  }, [
                    k(u(A), { icon: "mdi:delete" })
                  ], 8, vn)
                ])) : (b(), C("div", _n, [
                  k(u(A), { icon: "mdi:lock-outline" })
                ]))
              ])
            ]))), 128))
          ])
        ])
      ]),
      i("div", yn, [
        i("button", {
          disabled: r.value === 1,
          onClick: I[1] || (I[1] = (E) => r.value--),
          class: "page-btn"
        }, [
          k(u(A), { icon: "mdi:chevron-left" })
        ], 8, bn),
        i("span", wn, "Page " + m(r.value), 1),
        i("button", {
          disabled: t.value.length < Ae,
          onClick: I[2] || (I[2] = (E) => r.value++),
          class: "page-btn"
        }, [
          k(u(A), { icon: "mdi:chevron-right" })
        ], 8, kn)
      ]),
      k(ht, {
        visible: c.value,
        "edit-mode": !0,
        "initial-data": p.value,
        "target-source": s.value,
        onClose: I[3] || (I[3] = (E) => c.value = !1),
        onSave: _
      }, null, 8, ["visible", "initial-data", "target-source"])
    ]));
  }
}), Cn = /* @__PURE__ */ Y(Tn, [["__scopeId", "data-v-7bcc66d2"]]), xn = { class: "settings-container" }, $n = { class: "settings-header" }, Sn = { class: "settings-title" }, En = ["title"], In = { class: "settings-body" }, An = { class: "settings-sidebar" }, Ln = ["onClick"], Rn = { class: "settings-content" }, Dn = {
  key: 0,
  class: "settings-section"
}, Mn = { class: "section-title" }, Pn = { class: "setting-item" }, On = { class: "setting-info" }, Fn = { class: "setting-label" }, Nn = { class: "setting-desc" }, jn = { class: "switch" }, Un = { class: "setting-item" }, Bn = { class: "setting-info" }, Vn = { class: "setting-label" }, Hn = { class: "setting-desc" }, zn = { class: "switch" }, Gn = {
  key: 1,
  class: "settings-section"
}, Wn = { class: "section-title" }, Qn = { class: "setting-item" }, Yn = { class: "setting-info" }, qn = { class: "setting-label" }, Kn = { class: "setting-desc" }, Jn = { class: "switch" }, Xn = { class: "setting-item" }, Zn = { class: "setting-info" }, eo = { class: "setting-label" }, to = { class: "setting-desc" }, so = { class: "switch" }, no = {
  key: 2,
  class: "settings-section"
}, oo = { class: "section-title" }, io = { class: "setting-item" }, ao = { class: "setting-info" }, lo = { class: "setting-label" }, co = { class: "setting-desc" }, ro = { class: "switch" }, uo = {
  key: 3,
  class: "settings-section"
}, fo = { class: "section-title" }, po = { class: "setting-item" }, go = { class: "setting-info" }, ho = { class: "setting-label" }, mo = { class: "setting-desc" }, vo = {
  key: 4,
  class: "settings-section"
}, _o = { class: "section-title" }, yo = { class: "setting-item" }, bo = { class: "setting-info" }, wo = { class: "setting-label" }, ko = { class: "setting-desc" }, To = { class: "switch" }, Co = { class: "setting-item data-update-item" }, xo = { class: "setting-info" }, $o = { class: "setting-label" }, So = { class: "setting-desc" }, Eo = { class: "update-actions" }, Io = ["disabled"], Ao = { class: "setting-item data-update-item" }, Lo = { class: "setting-info" }, Ro = { class: "setting-label" }, Do = { class: "setting-desc" }, Mo = { class: "update-actions" }, Po = ["disabled"], Oo = { class: "setting-item data-update-item" }, Fo = { class: "setting-info" }, No = { class: "setting-label" }, jo = { class: "setting-desc" }, Uo = { class: "update-actions" }, Bo = ["disabled"], Vo = {
  key: 5,
  class: "settings-section full-width"
}, Ho = { class: "section-title" }, zo = { class: "settings-footer" }, Go = { class: "footer-info" }, Wo = /* @__PURE__ */ W({
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
    Q(() => O.language, (_) => {
      a.value = _;
    });
    const d = [
      { id: "textFormat", icon: "mdi:format-text" },
      { id: "autocomplete", icon: "mdi:magnify" },
      { id: "editing", icon: "mdi:pencil" },
      { id: "interface", icon: "mdi:translate" },
      { id: "data", icon: "mdi:database" },
      { id: "tagManager", icon: "mdi:tag-multiple" }
    ], r = x("textFormat"), c = x(""), p = x(!1), h = x(!1), y = x(""), v = async (_) => {
      if (!(p.value || h.value)) {
        p.value = !0, c.value = "";
        try {
          if (_ === "update_github") {
            h.value = !0, c.value = t("settings.checkingUpdate");
            try {
              const f = await fetch("/simple-prompt/check-update"), g = await f.json();
              if (!f.ok)
                throw new Error(g.error || f.statusText);
              if (y.value = g.version, h.value = !1, !g.update_available) {
                c.value = t("settings.upToDate") + y.value;
                return;
              }
              c.value = t("settings.updating");
              const w = await fetch("/simple-prompt/update-tags", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({})
              }), $ = await w.json();
              if (w.ok && $.status === "success")
                c.value = t("settings.updateSuccess");
              else
                throw new Error($.error || w.statusText);
            } finally {
              h.value = !1;
            }
          } else {
            c.value = t("settings.updating");
            const w = await fetch("/simple-prompt/update-data", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ action: _ })
            }), $ = await w.json();
            if (w.ok && $.status === "success")
              c.value = $.message || t("settings.updateSuccess");
            else
              throw new Error($.error || w.statusText);
          }
        } catch (f) {
          console.error("Update action error:", f), c.value = t("settings.updateError") + f.message;
        } finally {
          p.value = !1;
        }
      }
    };
    return Q(() => s.visible, (_) => {
      _ && (c.value = "", y.value = "");
    }), (_, f) => (b(), oe(we, { name: "fade" }, {
      default: re(() => [
        e.visible ? (b(), C("div", {
          key: 0,
          class: "settings-overlay",
          onClick: ie(l, ["self"])
        }, [
          i("div", xn, [
            i("div", $n, [
              i("div", Sn, [
                k(u(A), {
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
                k(u(A), { icon: "mdi:close" })
              ], 8, En)
            ]),
            i("div", In, [
              i("div", An, [
                (b(), C(K, null, Z(d, (g) => i("div", {
                  key: g.id,
                  class: ee(["sidebar-item", { active: r.value === g.id }]),
                  onClick: (w) => r.value = g.id
                }, [
                  k(u(A), {
                    icon: g.icon,
                    class: "item-icon"
                  }, null, 8, ["icon"]),
                  i("span", null, m(u(t)(`settings.sections.${g.id}`)), 1)
                ], 10, Ln)), 64))
              ]),
              i("div", Rn, [
                r.value === "textFormat" ? (b(), C("div", Dn, [
                  i("h3", Mn, [
                    k(u(A), { icon: "mdi:format-text" }),
                    H(" " + m(u(t)("settings.sections.textFormat")), 1)
                  ]),
                  i("div", Pn, [
                    i("div", On, [
                      i("label", Fn, m(u(t)("settings.items.convertUnderscore")), 1),
                      i("p", Nn, m(u(t)("settings.items.convertUnderscoreDesc")), 1)
                    ]),
                    i("label", jn, [
                      G(i("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": f[0] || (f[0] = (g) => u(O).convertUnderscoreToSpace = g)
                      }, null, 512), [
                        [ae, u(O).convertUnderscoreToSpace]
                      ]),
                      f[10] || (f[10] = i("span", { class: "slider" }, null, -1))
                    ])
                  ]),
                  i("div", Un, [
                    i("div", Bn, [
                      i("label", Vn, m(u(t)("settings.items.escapeBrackets")), 1),
                      i("p", Hn, m(u(t)("settings.items.escapeBracketsDesc")), 1)
                    ]),
                    i("label", zn, [
                      G(i("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": f[1] || (f[1] = (g) => u(O).escapeBrackets = g)
                      }, null, 512), [
                        [ae, u(O).escapeBrackets]
                      ]),
                      f[11] || (f[11] = i("span", { class: "slider" }, null, -1))
                    ])
                  ])
                ])) : j("", !0),
                r.value === "autocomplete" ? (b(), C("div", Gn, [
                  i("h3", Wn, [
                    k(u(A), { icon: "mdi:magnify" }),
                    H(" " + m(u(t)("settings.sections.autocomplete")), 1)
                  ]),
                  i("div", Qn, [
                    i("div", Yn, [
                      i("label", qn, m(u(t)("settings.items.useAliasSearch")), 1),
                      i("p", Kn, m(u(t)("settings.items.useAliasSearchDesc")), 1)
                    ]),
                    i("label", Jn, [
                      G(i("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": f[2] || (f[2] = (g) => u(O).useAliasesInSearch = g)
                      }, null, 512), [
                        [ae, u(O).useAliasesInSearch]
                      ]),
                      f[12] || (f[12] = i("span", { class: "slider" }, null, -1))
                    ])
                  ]),
                  i("div", Xn, [
                    i("div", Zn, [
                      i("label", eo, m(u(t)("settings.items.useAliasAutocomplete")), 1),
                      i("p", to, m(u(t)("settings.items.useAliasAutocompleteDesc")), 1)
                    ]),
                    i("label", so, [
                      G(i("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": f[3] || (f[3] = (g) => u(O).useAliasesInAutocomplete = g)
                      }, null, 512), [
                        [ae, u(O).useAliasesInAutocomplete]
                      ]),
                      f[13] || (f[13] = i("span", { class: "slider" }, null, -1))
                    ])
                  ])
                ])) : j("", !0),
                r.value === "editing" ? (b(), C("div", no, [
                  i("h3", oo, [
                    k(u(A), { icon: "mdi:pencil" }),
                    H(" " + m(u(t)("settings.sections.editing")), 1)
                  ]),
                  i("div", io, [
                    i("div", ao, [
                      i("label", lo, m(u(t)("settings.items.smartBackspace")), 1),
                      i("p", co, m(u(t)("settings.items.smartBackspaceDesc")), 1)
                    ]),
                    i("label", ro, [
                      G(i("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": f[4] || (f[4] = (g) => u(O).smartBackspace = g)
                      }, null, 512), [
                        [ae, u(O).smartBackspace]
                      ]),
                      f[14] || (f[14] = i("span", { class: "slider" }, null, -1))
                    ])
                  ])
                ])) : j("", !0),
                r.value === "interface" ? (b(), C("div", uo, [
                  i("h3", fo, [
                    k(u(A), { icon: "mdi:translate" }),
                    H(" " + m(u(t)("settings.sections.interface")), 1)
                  ]),
                  i("div", po, [
                    i("div", go, [
                      i("label", ho, m(u(t)("settings.items.language")), 1),
                      i("p", mo, m(u(t)("settings.items.languageDesc")), 1)
                    ]),
                    G(i("select", {
                      "onUpdate:modelValue": f[5] || (f[5] = (g) => u(O).language = g),
                      class: "language-select"
                    }, f[15] || (f[15] = [
                      i("option", { value: "en" }, "English", -1),
                      i("option", { value: "zh-CN" }, "简体中文", -1)
                    ]), 512), [
                      [Et, u(O).language]
                    ])
                  ])
                ])) : j("", !0),
                r.value === "data" ? (b(), C("div", vo, [
                  i("h3", _o, [
                    k(u(A), { icon: "mdi:database" }),
                    H(" " + m(u(t)("settings.sections.data")), 1)
                  ]),
                  i("div", yo, [
                    i("div", bo, [
                      i("label", wo, m(u(t)("settings.items.allowEditDefaultTags") || "Allow Editing Default Tags"), 1),
                      i("p", ko, m(u(t)("settings.items.allowEditDefaultTagsDesc") || "Enable editing and deleting of default tags (Use with caution)."), 1)
                    ]),
                    i("label", To, [
                      G(i("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": f[6] || (f[6] = (g) => u(O).allowEditDefaultTags = g)
                      }, null, 512), [
                        [ae, u(O).allowEditDefaultTags]
                      ]),
                      f[16] || (f[16] = i("span", { class: "slider" }, null, -1))
                    ])
                  ]),
                  i("div", Co, [
                    i("div", xo, [
                      i("label", $o, m(u(t)("settings.items.updateTags")), 1),
                      i("p", So, m(u(t)("settings.items.updateTagsDesc")), 1)
                    ]),
                    i("div", Eo, [
                      i("button", {
                        class: "btn-update primary",
                        disabled: p.value || h.value,
                        onClick: f[7] || (f[7] = (g) => v("update_github"))
                      }, [
                        p.value && r.value === "data" ? (b(), oe(u(A), {
                          key: 0,
                          icon: "mdi:loading",
                          class: "spin"
                        })) : j("", !0),
                        i("span", null, m(u(t)("settings.updateNow")), 1)
                      ], 8, Io)
                    ])
                  ]),
                  i("div", Ao, [
                    i("div", Lo, [
                      i("label", Ro, m(u(t)("settings.items.updateLikedTags") || "Update Liked Tags"), 1),
                      i("p", Do, m(u(t)("settings.items.updateLikedTagsDesc") || "Sync liked tags data with main database."), 1)
                    ]),
                    i("div", Mo, [
                      i("button", {
                        class: "btn-update secondary",
                        disabled: p.value,
                        onClick: f[8] || (f[8] = (g) => v("update_liked"))
                      }, [
                        k(u(A), { icon: "mdi:heart" }),
                        i("span", null, m(u(t)("common.update") || "Update"), 1)
                      ], 8, Po)
                    ])
                  ]),
                  i("div", Oo, [
                    i("div", Fo, [
                      i("label", No, m(u(t)("settings.items.updateUserTags") || "Update User Tags"), 1),
                      i("p", jo, m(u(t)("settings.items.updateUserTagsDesc") || "Sync custom tags data with main database."), 1)
                    ]),
                    i("div", Uo, [
                      i("button", {
                        class: "btn-update secondary",
                        disabled: p.value,
                        onClick: f[9] || (f[9] = (g) => v("update_user"))
                      }, [
                        k(u(A), { icon: "mdi:account-tag" }),
                        i("span", null, m(u(t)("common.update") || "Update"), 1)
                      ], 8, Bo)
                    ])
                  ]),
                  c.value ? (b(), C("div", {
                    key: 0,
                    class: ee(["update-status-box", { error: c.value.includes("failed") || c.value.toLowerCase().includes("error"), success: c.value.includes("success") || c.value.includes("upToDate") || c.value.includes("updated") }])
                  }, [
                    k(u(A), {
                      icon: c.value.includes("success") || c.value.includes("upToDate") || c.value.includes("updated") ? "mdi:check-circle" : "mdi:alert-circle"
                    }, null, 8, ["icon"]),
                    i("span", null, m(c.value), 1)
                  ], 2)) : j("", !0)
                ])) : j("", !0),
                r.value === "tagManager" ? (b(), C("div", Vo, [
                  i("h3", Ho, [
                    k(u(A), { icon: "mdi:tag-multiple" }),
                    H(" " + m(u(t)("settings.sections.tagManager") || "Tag Manager"), 1)
                  ]),
                  k(Cn)
                ])) : j("", !0)
              ])
            ]),
            i("div", zo, [
              i("div", Go, [
                k(u(A), { icon: "mdi:information-outline" }),
                H(" " + m(u(t)("settings.autoSave")), 1)
              ]),
              i("button", {
                class: "btn-primary",
                onClick: l
              }, m(u(t)("common.done")), 1)
            ])
          ])
        ])) : j("", !0)
      ]),
      _: 1
    }));
  }
}), Qo = /* @__PURE__ */ Y(Wo, [["__scopeId", "data-v-5dbcc92e"]]), Yo = { class: "sp-modal-container" }, qo = { class: "sp-modal-header" }, Ko = { class: "sp-modal-title" }, Jo = { class: "sp-modal-actions" }, Xo = ["title"], Zo = ["title"], ei = { class: "sp-modal-body" }, ti = { class: "sp-modal-footer" }, si = { class: "sp-footer-left" }, ni = { class: "sp-hint" }, oi = { class: "sp-footer-right" }, ii = /* @__PURE__ */ W({
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
    }, r = () => {
      a.value = !1;
    }, c = () => {
      l.value = !0;
    }, p = () => {
      l.value = !1;
    }, h = () => {
      s("close");
    }, y = () => {
      s("save");
    }, v = (_) => {
      a.value || l.value || (_.key === "Escape" && o.visible && h(), (_.ctrlKey || _.metaKey) && _.key === "s" && (_.preventDefault(), y()));
    };
    return be(() => {
      window.addEventListener("keydown", v);
    }), Pe(() => {
      window.removeEventListener("keydown", v);
    }), (_, f) => (b(), oe(we, { name: "fade" }, {
      default: re(() => [
        e.visible ? (b(), C("div", {
          key: 0,
          class: "sp-modal-overlay",
          onClick: ie(h, ["self"])
        }, [
          i("div", Yo, [
            i("div", qo, [
              i("div", Ko, [
                k(u(A), {
                  icon: "mdi:pencil-box-outline",
                  class: "sp-icon"
                }),
                i("span", null, m(u(t)("editor.subtitle")), 1)
              ]),
              i("div", Jo, [
                i("button", {
                  class: "sp-btn-icon",
                  title: u(t)("settings.title"),
                  onClick: d
                }, [
                  k(u(A), { icon: "mdi:cog" })
                ], 8, Xo),
                i("button", {
                  class: "sp-btn-icon sp-btn-close",
                  onClick: h,
                  title: u(t)("common.close")
                }, [
                  k(u(A), { icon: "mdi:close" })
                ], 8, Zo)
              ])
            ]),
            i("div", ei, [
              It(_.$slots, "content", { openCustomTag: c }, void 0, !0)
            ]),
            i("div", ti, [
              i("div", si, [
                i("span", ni, m(u(t)("editor.autocompleteHint")), 1)
              ]),
              i("div", oi, [
                i("button", {
                  class: "sp-btn sp-btn-secondary",
                  onClick: h
                }, m(u(t)("common.cancel")), 1),
                i("button", {
                  class: "sp-btn sp-btn-primary",
                  onClick: y
                }, m(u(t)("common.save")), 1)
              ])
            ])
          ]),
          k(Qo, {
            visible: a.value,
            onClose: r
          }, null, 8, ["visible"]),
          k(ht, {
            visible: l.value,
            onClose: p
          }, null, 8, ["visible"])
        ])) : j("", !0)
      ]),
      _: 3
    }));
  }
}), ai = /* @__PURE__ */ Y(ii, [["__scopeId", "data-v-86b97fcd"]]), se = class se {
  constructor() {
    Se(this, "isInitialized", !1);
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
      return o && d.length > 0 ? d.map((r) => {
        if (r.name && r.name.toLowerCase().includes(n.toLowerCase()))
          return r;
        const p = Array.isArray(r.alias) ? r.alias : [];
        if (p.length > 0) {
          const h = p.find(
            (y) => y && y.toLowerCase().includes(n.toLowerCase())
          );
          if (h)
            return { ...r, matched_alias: h };
        }
        return r;
      }) : d;
    } catch (l) {
      return console.error("[DuckDB] Search failed via API:", l), [];
    }
  }
  async getTagsDetails(n) {
    if (n.length === 0) return {};
    try {
      const s = await fetch("/simple-prompt/get-tags-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ names: n })
      });
      if (!s.ok)
        throw new Error(`HTTP error! status: ${s.status}`);
      return await s.json();
    } catch (s) {
      return console.error("[DuckDB] Get tags details failed:", s), {};
    }
  }
};
Se(se, "instance");
let ce = se;
function li(e, n) {
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
  t.whiteSpace = "pre-wrap", e.nodeName !== "INPUT" && (t.wordWrap = "break-word"), t.position = "absolute", t.visibility = "hidden", s.forEach((r) => {
    t[r] = a[r];
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
const ci = { class: "autocomplete-list" }, ri = {
  key: 0,
  class: "loading-item"
}, ui = {
  key: 1,
  class: "no-results"
}, di = ["onClick"], fi = { class: "item-left" }, pi = { class: "item-name" }, gi = {
  key: 0,
  class: "item-alias"
}, hi = { class: "item-right" }, mi = { class: "item-count" }, vi = /* @__PURE__ */ W({
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
    }, a = (d) => z[d] || z[P.GENERAL], l = (d) => {
      const r = Number(d);
      return r >= 1e6 ? (r / 1e6).toFixed(1) + "M" : r >= 1e3 ? (r / 1e3).toFixed(1) + "k" : r.toString();
    };
    return (d, r) => (b(), C("div", ci, [
      d.loading ? (b(), C("div", ri, [
        k(u(A), {
          icon: "mdi:loading",
          class: "spin"
        }),
        H(" " + m(u(o)("editor.loading")), 1)
      ])) : d.items.length === 0 ? (b(), C("div", ui, m(u(o)("editor.noMatches")), 1)) : (b(!0), C(K, { key: 2 }, Z(d.items, (c, p) => (b(), C("div", {
        key: c.name,
        class: ee(["menu-item", { selected: p === d.selectedIndex }]),
        onClick: (h) => t(c),
        onMousedown: r[0] || (r[0] = ie(() => {
        }, ["prevent"]))
      }, [
        i("div", fi, [
          i("div", {
            class: "category-dot",
            style: J({ backgroundColor: a(c.category) })
          }, null, 4),
          i("span", pi, m(c.name), 1),
          c.alias_match ? (b(), C("span", gi, "(" + m(c.alias_match) + ")", 1)) : j("", !0)
        ]),
        i("div", hi, [
          i("span", mi, m(l(c.post_count)), 1)
        ])
      ], 42, di))), 128))
    ]));
  }
}), _i = /* @__PURE__ */ Y(vi, [["__scopeId", "data-v-f05a4847"]]), yi = {
  key: 0,
  class: "tag-weight"
}, bi = ["title"], wi = { class: "weight-value" }, ki = ["title"], Ti = ["title"], Ci = /* @__PURE__ */ W({
  __name: "TagItem",
  props: {
    tag: {}
  },
  emits: ["remove", "update:weight", "toggle:enabled"],
  setup(e, { emit: n }) {
    const s = e, o = n, { t } = X(), a = pe(() => z[s.tag.category || P.GENERAL]), l = pe(() => s.tag.weight !== 1), d = () => {
      o("remove", s.tag.id);
    }, r = () => {
      o("toggle:enabled", s.tag.id);
    }, c = () => {
      const w = Math.min(s.tag.weight + 0.1, 2);
      o("update:weight", s.tag.id, parseFloat(w.toFixed(1)));
    }, p = () => {
      const w = Math.max(s.tag.weight - 0.1, 0.1);
      o("update:weight", s.tag.id, parseFloat(w.toFixed(1)));
    }, h = x(!1), y = x(null), v = x(""), _ = async () => {
      var w, $;
      v.value = s.tag.weight.toString(), h.value = !0, await Oe(), (w = y.value) == null || w.focus(), ($ = y.value) == null || $.select();
    }, f = () => {
      if (!h.value) return;
      const w = parseFloat(v.value);
      !isNaN(w) && w >= 0 && o("update:weight", s.tag.id, parseFloat(w.toFixed(2))), h.value = !1;
    }, g = (w) => {
      w.key === "Enter" ? f() : w.key === "Escape" && (h.value = !1);
    };
    return (w, $) => (b(), C("div", {
      class: ee(["tag-item", { disabled: !w.tag.enabled }]),
      style: J({ "--category-color": a.value }),
      onDblclick: ie(_, ["stop"])
    }, [
      $[2] || ($[2] = i("div", { class: "tag-dot" }, null, -1)),
      i("span", {
        class: "tag-text",
        onClick: r
      }, m(w.tag.text), 1),
      l.value && !h.value ? (b(), C("div", yi, [
        i("button", {
          class: "weight-btn",
          onClick: p,
          title: u(t)("editor.decreaseWeight")
        }, [
          k(u(A), { icon: "mdi:minus" })
        ], 8, bi),
        i("span", wi, m(w.tag.weight.toFixed(1)), 1),
        i("button", {
          class: "weight-btn",
          onClick: c,
          title: u(t)("editor.increaseWeight")
        }, [
          k(u(A), { icon: "mdi:plus" })
        ], 8, ki)
      ])) : j("", !0),
      h.value ? G((b(), C("input", {
        key: 1,
        ref_key: "weightInput",
        ref: y,
        "onUpdate:modelValue": $[0] || ($[0] = (I) => v.value = I),
        class: "weight-input",
        onBlur: f,
        onKeydown: g,
        onClick: $[1] || ($[1] = ie(() => {
        }, ["stop"]))
      }, null, 544)), [
        [ne, v.value]
      ]) : j("", !0),
      i("button", {
        class: "tag-remove",
        onClick: d,
        title: u(t)("editor.removeTag")
      }, [
        k(u(A), { icon: "mdi:close" })
      ], 8, Ti)
    ], 38));
  }
}), xi = /* @__PURE__ */ Y(Ci, [["__scopeId", "data-v-f641b4a8"]]), $i = { class: "visual-tag-area" }, Si = {
  key: 0,
  class: "empty-state"
}, Ei = {
  key: 1,
  class: "tags-scroller"
}, Ii = ["onDragstart", "onDragenter"], Ai = /* @__PURE__ */ W({
  __name: "VisualTagArea",
  props: {
    tags: {}
  },
  emits: ["update:tags"],
  setup(e, { emit: n }) {
    const s = e, o = n, t = x([]), a = x(null);
    Q(() => s.tags, (v) => {
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
    }, r = (v) => {
      const _ = t.value.map(
        (f) => f.id === v ? { ...f, enabled: !f.enabled } : f
      );
      t.value = _, o("update:tags", _);
    }, c = (v, _) => {
      a.value = _, v.dataTransfer && (v.dataTransfer.effectAllowed = "move");
    }, p = (v) => {
      v.preventDefault(), v.dataTransfer && (v.dataTransfer.dropEffect = "move");
    }, h = (v) => {
      if (a.value !== null && a.value !== v) {
        const _ = a.value, f = v, g = t.value[_], w = [...t.value];
        w.splice(_, 1), w.splice(f, 0, g), t.value = w, a.value = f;
      }
    }, y = () => {
      a.value !== null && (o("update:tags", t.value), a.value = null);
    };
    return (v, _) => (b(), C("div", $i, [
      t.value.length === 0 ? (b(), C("div", Si, _[0] || (_[0] = [
        i("p", null, "No tags yet. Start typing in the editor...", -1)
      ]))) : (b(), C("div", Ei, [
        k(At, {
          name: "tag-list",
          tag: "div",
          class: "tags-container"
        }, {
          default: re(() => [
            (b(!0), C(K, null, Z(t.value, (f, g) => (b(), C("div", {
              key: f.id,
              class: "tag-wrapper",
              draggable: "true",
              onDragstart: (w) => c(w, g),
              onDragover: p,
              onDragenter: (w) => h(g),
              onDragend: y
            }, [
              k(xi, {
                tag: f,
                onRemove: l,
                "onUpdate:weight": d,
                "onToggle:enabled": r
              }, null, 8, ["tag"])
            ], 40, Ii))), 128))
          ]),
          _: 1
        })
      ]))
    ]));
  }
}), Li = /* @__PURE__ */ Y(Ai, [["__scopeId", "data-v-5d3d64b5"]]), Ri = { class: "toolbar" }, Di = { class: "tag-count" }, Mi = /* @__PURE__ */ W({
  __name: "OtherFunctions",
  props: {
    tagCount: {}
  },
  emits: ["open-search"],
  setup(e, { emit: n }) {
    const s = n, { t: o } = X(), t = () => {
      s("open-search");
    };
    return (a, l) => (b(), C("div", Ri, [
      i("button", {
        class: "toolbar-btn",
        onClick: t
      }, [
        k(u(A), { icon: "mdi:magnify" }),
        i("span", null, m(u(o)("editor.searchBtn")), 1)
      ]),
      l[0] || (l[0] = i("div", { class: "separator" }, null, -1)),
      i("div", Di, [
        k(u(A), { icon: "mdi:tag-multiple" }),
        i("span", null, m(u(o)("editor.tagCount")) + m(a.tagCount || 0), 1)
      ])
    ]));
  }
}), Pi = /* @__PURE__ */ Y(Mi, [["__scopeId", "data-v-22dfc699"]]), Oi = { class: "modal-container" }, Fi = { class: "modal-header" }, Ni = { class: "modal-title" }, ji = ["title"], Ui = { class: "search-section" }, Bi = { class: "search-box" }, Vi = ["placeholder"], Hi = { class: "category-filters" }, zi = { class: "filter-label" }, Gi = ["onClick"], Wi = { class: "results-section" }, Qi = {
  key: 0,
  class: "loading-state"
}, Yi = {
  key: 1,
  class: "empty-state"
}, qi = {
  key: 2,
  class: "results-list"
}, Ki = ["onClick"], Ji = { class: "tag-info" }, Xi = { class: "tag-name-row" }, Zi = { class: "tag-name" }, ea = ["innerHTML"], ta = ["innerHTML"], sa = ["innerHTML"], na = { class: "tag-meta" }, oa = { class: "category-label" }, ia = { class: "post-count" }, aa = { class: "actions" }, la = ["onClick", "title"], ca = ["title"], ra = {
  key: 3,
  class: "hint-state"
}, ua = /* @__PURE__ */ W({
  __name: "TagSearchModal",
  props: {
    visible: { type: Boolean }
  },
  emits: ["close", "add-tag"],
  setup(e, { emit: n }) {
    const s = e, { t: o } = X(), t = n, a = x(""), l = x([]), d = x(!1), r = x([]), c = pe(() => [
      { value: P.GENERAL, label: o("search.categories.general"), color: z[P.GENERAL] },
      { value: P.ARTIST, label: o("search.categories.artist"), color: z[P.ARTIST] },
      { value: P.CHARACTER, label: o("search.categories.character"), color: z[P.CHARACTER] },
      { value: P.COPYRIGHT, label: o("search.categories.copyright"), color: z[P.COPYRIGHT] },
      { value: P.META, label: o("search.categories.meta"), color: z[P.META] }
    ]), p = (T) => {
      const M = r.value.indexOf(T);
      M > -1 ? r.value.splice(M, 1) : r.value.push(T), a.value.trim() && y();
    }, h = (T) => r.value.includes(T), y = async () => {
      const T = a.value.trim();
      if (!T || T.length < 2) {
        l.value = [];
        return;
      }
      d.value = !0;
      try {
        const L = await ce.getInstance().searchTags(T, 50, !0, r.value);
        l.value = L;
      } catch (M) {
        console.error("Search error:", M), l.value = [];
      } finally {
        d.value = !1;
      }
    };
    let v = null;
    const _ = () => {
      v && clearTimeout(v), v = setTimeout(() => {
        y();
      }, 300);
    }, f = (T) => {
      t("add-tag", T.name, T.category);
    }, g = () => {
      t("close");
    };
    Q(() => s.visible, (T) => {
      T || (a.value = "", l.value = [], r.value = []);
    });
    const w = (T) => {
      const M = c.value.find((L) => L.value === T);
      return M ? M.label : o("search.categories.unknown");
    }, $ = (T) => z[T] || "#888", I = (T) => (T == null ? void 0 : T.toLocaleString()) || "0", E = (T, M) => {
      if (!M || !T) return T;
      const L = new RegExp(`(${M.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
      return T.replace(L, '<strong class="match-bold">$1</strong>');
    }, B = (T) => T.priority === 1, D = async (T, M) => {
      M.stopPropagation();
      const L = B(T);
      T.priority = L ? 4 : 1;
      try {
        const V = {
          name: T.name,
          is_liked: !L,
          category: T.category,
          post_count: T.post_count,
          alias: T.alias
        };
        await fetch("/simple-prompt/toggle-like-tag", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(V)
        });
      } catch (V) {
        console.error("Toggle like failed", V), T.priority = L ? 1 : 4;
      }
    };
    return (T, M) => (b(), oe(we, { name: "fade" }, {
      default: re(() => [
        T.visible ? (b(), C("div", {
          key: 0,
          class: "modal-overlay",
          onClick: ie(g, ["self"])
        }, [
          i("div", Oi, [
            i("div", Fi, [
              i("div", Ni, [
                k(u(A), {
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
                k(u(A), { icon: "mdi:close" })
              ], 8, ji)
            ]),
            i("div", Ui, [
              i("div", Bi, [
                k(u(A), {
                  icon: "mdi:magnify",
                  class: "search-icon"
                }),
                G(i("input", {
                  "onUpdate:modelValue": M[0] || (M[0] = (L) => a.value = L),
                  type: "text",
                  placeholder: u(o)("search.placeholder"),
                  class: "search-input",
                  onInput: _,
                  autofocus: ""
                }, null, 40, Vi), [
                  [ne, a.value]
                ]),
                a.value ? (b(), C("button", {
                  key: 0,
                  class: "clear-btn",
                  onClick: M[1] || (M[1] = (L) => {
                    a.value = "", l.value = [];
                  }),
                  title: "Clear"
                }, [
                  k(u(A), { icon: "mdi:close-circle" })
                ])) : j("", !0)
              ]),
              i("div", Hi, [
                i("span", zi, m(u(o)("search.filterLabel")), 1),
                (b(!0), C(K, null, Z(c.value, (L) => (b(), C("button", {
                  key: L.value,
                  class: ee(["category-chip", { active: h(L.value) }]),
                  style: J({ "--category-color": L.color }),
                  onClick: (V) => p(L.value)
                }, [
                  i("span", {
                    class: "category-dot",
                    style: J({ backgroundColor: L.color })
                  }, null, 4),
                  H(" " + m(L.label), 1)
                ], 14, Gi))), 128))
              ])
            ]),
            i("div", Wi, [
              d.value ? (b(), C("div", Qi, [
                k(u(A), {
                  icon: "mdi:loading",
                  class: "spin"
                }),
                i("span", null, m(u(o)("search.loading")), 1)
              ])) : l.value.length === 0 && a.value.trim() ? (b(), C("div", Yi, [
                k(u(A), { icon: "mdi:magnify-close" }),
                i("p", null, m(u(o)("search.noResults")), 1)
              ])) : l.value.length > 0 ? (b(), C("div", qi, [
                (b(!0), C(K, null, Z(l.value, (L) => (b(), C("div", {
                  key: L.name,
                  class: "result-item",
                  style: J({ "--cat-color": $(L.category) }),
                  onClick: (V) => f(L)
                }, [
                  i("div", Ji, [
                    i("div", Xi, [
                      M[2] || (M[2] = i("span", { class: "category-indicator" }, null, -1)),
                      i("span", Zi, [
                        L.matched_alias ? (b(), C(K, { key: 1 }, [
                          i("span", {
                            innerHTML: E(L.name, a.value)
                          }, null, 8, ta),
                          i("span", {
                            class: "alias-indicator",
                            innerHTML: E(L.matched_alias, a.value)
                          }, null, 8, sa)
                        ], 64)) : (b(), C("span", {
                          key: 0,
                          innerHTML: E(L.name, a.value)
                        }, null, 8, ea))
                      ])
                    ]),
                    i("div", na, [
                      i("span", oa, m(w(L.category)), 1),
                      i("span", ia, [
                        k(u(A), { icon: "mdi:image-multiple" }),
                        H(" " + m(I(L.post_count)), 1)
                      ])
                    ])
                  ]),
                  i("div", aa, [
                    i("button", {
                      class: ee(["action-btn like-btn", { liked: B(L) }]),
                      onClick: (V) => D(L, V),
                      title: B(L) ? "Unlike" : "Like"
                    }, [
                      k(u(A), {
                        icon: B(L) ? "mdi:heart" : "mdi:heart-outline"
                      }, null, 8, ["icon"])
                    ], 10, la),
                    i("button", {
                      class: "action-btn add-btn",
                      title: u(o)("search.addBtnTitle")
                    }, [
                      k(u(A), { icon: "mdi:plus" })
                    ], 8, ca)
                  ])
                ], 12, Ki))), 128))
              ])) : (b(), C("div", ra, [
                k(u(A), { icon: "mdi:information-outline" }),
                i("p", null, m(u(o)("search.hint")), 1)
              ]))
            ])
          ])
        ])) : j("", !0)
      ]),
      _: 1
    }));
  }
}), da = /* @__PURE__ */ Y(ua, [["__scopeId", "data-v-6f10f098"]]);
function he(e) {
  if (!e.trim()) return [];
  const n = [];
  let s = 0, o = 0, t = "", a = "", l = "";
  for (; o < e.length; ) {
    const d = e[o];
    if (d === "\\" && o + 1 < e.length) {
      const r = e[o + 1];
      if (r === "(" || r === ")") {
        t += r, o += 2;
        continue;
      }
    }
    if (d === "(") {
      t.trim() && (n.push({
        id: `tag-${s++}`,
        text: t.trim(),
        weight: 1,
        enabled: !0,
        category: P.GENERAL
      }), t = "");
      let r = 1, c = o + 1;
      for (; c < e.length && r > 0; ) {
        if (e[c] === "\\" && c + 1 < e.length) {
          c += 2;
          continue;
        }
        e[c] === "(" && r++, e[c] === ")" && r--, c++;
      }
      if (r === 0) {
        const p = e.substring(o + 1, c - 1), h = p.indexOf(":");
        if (h > 0) {
          l = p.substring(0, h).trim(), a = p.substring(h + 1).trim();
          const y = parseFloat(a);
          !isNaN(y) && l && n.push({
            id: `tag-${s++}`,
            text: l,
            weight: y,
            enabled: !0,
            category: P.GENERAL
          });
        } else
          t += e.substring(o, c);
        o = c;
        continue;
      }
    }
    if (d === ",") {
      t.trim() && (n.push({
        id: `tag-${s++}`,
        text: t.trim(),
        weight: 1,
        enabled: !0,
        category: P.GENERAL
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
    category: P.GENERAL
  }), n;
}
function tt(e) {
  return e.filter((n) => n.enabled).map((n) => n.weight !== 1 ? `(${n.text}:${n.weight.toFixed(1)})` : n.text).join(", ");
}
const fa = { class: "sp-toolbar" }, pa = ["title"], ga = ["title"], ha = ["placeholder"], ma = { class: "sp-visual-area" }, va = { class: "sp-footer" }, _a = /* @__PURE__ */ W({
  __name: "TextEditor",
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue", "cursor-move", "open-custom-tag"],
  setup(e, { expose: n, emit: s }) {
    const o = e, t = s, { t: a } = X(), l = x(null), d = x(null), r = x(o.modelValue), c = x([]), p = x(60), h = x(!1), y = x({}), v = /* @__PURE__ */ new Set();
    let _ = null;
    const f = () => {
      _ && clearTimeout(_), _ = setTimeout(async () => {
        const S = Array.from(v);
        if (v.clear(), S.length !== 0)
          try {
            const U = await ce.getInstance().getTagsDetails(S);
            Object.entries(U).forEach(([N, F]) => {
              y.value[N.toLowerCase()] = F;
            }), S.forEach((N) => {
              const F = N.toLowerCase();
              y.value[F] === void 0 && (y.value[F] = 0);
            }), c.value = c.value.map((N) => {
              const F = N.text.toLowerCase();
              return y.value[F] !== void 0 ? { ...N, category: y.value[F] } : N;
            });
          } catch (R) {
            console.error("Error fetching tag categories:", R);
          }
      }, 1e3);
    }, g = (S) => (S.forEach((R) => {
      const U = R.text.toLowerCase();
      y.value[U] !== void 0 ? R.category = y.value[U] : v.add(R.text);
    }), v.size > 0 && f(), S);
    c.value = g(he(r.value));
    const w = x(!1), $ = x([]), I = x(0), E = x({ top: 0, left: 0 }), B = x(""), D = x(0), T = x(!1), M = x(!1);
    Q(() => o.modelValue, (S) => {
      S !== r.value && (r.value = S, c.value = g(he(S)));
    });
    const L = (S) => {
      const R = S.target;
      r.value = R.value, t("update:modelValue", R.value), c.value = g(he(R.value)), _t(R);
    }, V = (S) => {
      c.value = S;
      const R = tt(S);
      R !== r.value && (r.value = R, t("update:modelValue", R));
    }, mt = async () => {
      try {
        await navigator.clipboard.writeText(r.value), console.log("Copied to clipboard");
      } catch (S) {
        console.error("Failed to copy: ", S);
      }
    }, vt = (S) => {
      h.value = !0, document.addEventListener("mousemove", Ce), document.addEventListener("mouseup", xe), document.body.style.userSelect = "none";
    }, Ce = (S) => {
      if (!h.value || !d.value) return;
      const R = d.value.getBoundingClientRect();
      let N = (S.clientY - R.top) / R.height * 100;
      N < 20 && (N = 20), N > 80 && (N = 80), p.value = N;
    }, xe = () => {
      h.value = !1, document.removeEventListener("mousemove", Ce), document.removeEventListener("mouseup", xe), document.body.style.userSelect = "";
    };
    Pe(() => {
      document.removeEventListener("mousemove", Ce), document.removeEventListener("mouseup", xe);
    });
    const _t = async (S) => {
      const R = S.selectionEnd, U = S.value.substring(0, R), N = /([a-zA-Z0-9_\u4e00-\u9fa5]{2,})$/.exec(U);
      if (N) {
        const F = N[1];
        B.value = F, D.value = N.index;
        const q = li(S, R);
        E.value = {
          top: q.top + q.height + 5,
          // 5px padding
          left: q.left
        }, T.value = !0, w.value = !0;
        try {
          console.log(`[Autocomplete] Searching for: "${F}"`);
          const ue = await ce.getInstance().searchTags(F, 20, O.useAliasesInAutocomplete);
          $.value = ue, I.value = 0;
        } catch (te) {
          console.error("Autocomplete search error:", te);
        } finally {
          T.value = !1;
        }
      } else
        w.value = !1;
    }, yt = (S) => {
      if (w.value && $.value.length > 0) {
        if (S.key === "ArrowUp") {
          S.preventDefault(), I.value = (I.value - 1 + $.value.length) % $.value.length;
          return;
        }
        if (S.key === "ArrowDown") {
          S.preventDefault(), I.value = (I.value + 1) % $.value.length;
          return;
        }
        if (S.key === "Tab" || S.key === "Enter") {
          S.preventDefault(), Ue($.value[I.value]);
          return;
        }
        if (S.key === "Escape") {
          S.preventDefault(), w.value = !1;
          return;
        }
      }
    }, Ue = (S) => {
      if (!l.value) return;
      const R = l.value, U = R.selectionEnd, N = r.value;
      let F = S.name;
      S.category !== void 0 && (y.value[F.toLowerCase()] = S.category), O.convertUnderscoreToSpace && (F = F.replace(/_/g, " "), S.category !== void 0 && (y.value[F.toLowerCase()] = S.category)), O.escapeBrackets && (F = F.replace(/\(/g, "\\(").replace(/\)/g, "\\)"));
      const q = N.substring(0, D.value), te = N.substring(U);
      let ue = te;
      !te.trim().startsWith(",") && !te.trim().startsWith(")") && (ue = ", " + te);
      const $e = q + F + ue;
      r.value = $e, t("update:modelValue", $e), c.value = g(he($e)), w.value = !1, Oe(() => {
        const Be = q.length + F.length + (ue.startsWith(", ") ? 2 : 0);
        R.setSelectionRange(Be, Be), R.focus();
      });
    }, bt = () => {
      setTimeout(() => {
        w.value = !1;
      }, 200);
    }, wt = () => {
      M.value = !0;
    }, kt = () => {
      M.value = !1;
    }, Tt = (S, R) => {
      let U = S;
      y.value[S.toLowerCase()] = R, O.convertUnderscoreToSpace && (U = U.replace(/_/g, " "), y.value[U.toLowerCase()] = R), O.escapeBrackets && (U = U.replace(/\(/g, "\\(").replace(/\)/g, "\\)"));
      const N = {
        id: `tag-${Date.now()}-${Math.random()}`,
        text: U,
        weight: 1,
        enabled: !0,
        category: R
      }, F = [...c.value, N];
      c.value = F;
      const q = tt(F);
      r.value = q, t("update:modelValue", q);
    };
    return n({ focus: () => {
      var S;
      (S = l.value) == null || S.focus();
    } }), (S, R) => (b(), C("div", {
      class: "sp-editor-container",
      ref_key: "containerRef",
      ref: d
    }, [
      i("div", fa, [
        i("button", {
          class: "sp-btn",
          onClick: mt,
          title: u(a)("editor.copyTitle")
        }, [
          R[2] || (R[2] = i("span", { class: "icon" }, "📋", -1)),
          H(" " + m(u(a)("editor.copy")), 1)
        ], 8, pa),
        i("button", {
          class: "sp-btn",
          onClick: R[0] || (R[0] = (U) => S.$emit("open-custom-tag")),
          title: u(a)("customTag.addBtnTitle")
        }, [
          R[3] || (R[3] = i("span", { class: "icon" }, "➕", -1)),
          H(" " + m(u(a)("customTag.addBtnTitle")), 1)
        ], 8, ga)
      ]),
      i("div", {
        class: "sp-editor-area",
        style: J({ height: `calc(${p.value}% - 40px)` })
      }, [
        G(i("textarea", {
          ref_key: "textareaRef",
          ref: l,
          class: "sp-textarea",
          "onUpdate:modelValue": R[1] || (R[1] = (U) => r.value = U),
          onInput: L,
          onKeydown: yt,
          onBlur: bt,
          placeholder: u(a)("editor.placeholder"),
          spellcheck: "false"
        }, null, 40, ha), [
          [ne, r.value]
        ]),
        w.value ? (b(), C("div", {
          key: 0,
          class: "autocomplete-wrapper",
          style: J({ top: E.value.top + "px", left: E.value.left + "px" })
        }, [
          k(_i, {
            items: $.value,
            "selected-index": I.value,
            loading: T.value,
            onSelect: Ue
          }, null, 8, ["items", "selected-index", "loading"])
        ], 4)) : j("", !0)
      ], 4),
      i("div", {
        class: "sp-splitter",
        onMousedown: vt
      }, R[4] || (R[4] = [
        i("div", { class: "sp-splitter-handle" }, null, -1)
      ]), 32),
      i("div", ma, [
        k(Li, {
          tags: c.value,
          "onUpdate:tags": V
        }, null, 8, ["tags"])
      ]),
      i("div", va, [
        k(Pi, {
          "tag-count": c.value.length,
          onOpenSearch: wt
        }, null, 8, ["tag-count"])
      ]),
      k(da, {
        visible: M.value,
        onClose: kt,
        onAddTag: Tt
      }, null, 8, ["visible"])
    ], 512));
  }
}), ya = /* @__PURE__ */ Y(_a, [["__scopeId", "data-v-46df9238"]]), ba = { style: { width: "100%", height: "100%" } }, xa = /* @__PURE__ */ W({
  __name: "App",
  props: {
    initialPrompt: {}
  },
  emits: ["save", "close"],
  setup(e, { emit: n }) {
    const s = e, o = n, t = x(!0), a = x(s.initialPrompt), l = x("Initializing...");
    be(async () => {
      try {
        await ce.getInstance().init(), l.value = "Ready";
      } catch (c) {
        console.error("DB Error:", c), l.value = `Error: ${c}`;
      }
    });
    const d = () => {
      t.value = !1, o("close");
    }, r = () => {
      o("save", a.value), t.value = !1;
    };
    return (c, p) => (b(), oe(ai, {
      visible: t.value,
      onClose: d,
      onSave: r
    }, {
      content: re(({ openCustomTag: h }) => [
        i("div", ba, [
          k(ya, {
            modelValue: a.value,
            "onUpdate:modelValue": p[0] || (p[0] = (y) => a.value = y),
            onOpenCustomTag: h
          }, null, 8, ["modelValue", "onOpenCustomTag"])
        ])
      ]),
      _: 1
    }, 8, ["visible"]));
  }
});
export {
  xa as default
};
