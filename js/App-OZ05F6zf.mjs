var vt = Object.defineProperty;
var _t = (e, n, o) => n in e ? vt(e, n, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[n] = o;
var we = (e, n, o) => _t(e, typeof n != "symbol" ? n + "" : n, o);
import { defineComponent as V, ref as I, shallowRef as yt, onMounted as Ee, watch as X, onUnmounted as Ae, h as je, nextTick as Re, reactive as bt, createBlock as le, openBlock as w, Transition as Le, withCtx as fe, createElementBlock as T, createCommentVNode as O, createElementVNode as l, createVNode as S, unref as d, toDisplayString as y, Fragment as ee, renderList as ce, createTextVNode as B, withDirectives as W, vModelCheckbox as oe, vModelSelect as wt, normalizeClass as re, withModifiers as te, renderSlot as xt, normalizeStyle as J, computed as Te, vModelText as Fe, TransitionGroup as kt } from "./vue.runtime.esm-bundler-DMW2pLBK.mjs";
import { u as Z } from "./vue-i18n-CDK56dMz.mjs";
const Ze = /^[a-z0-9]+(-[a-z0-9]+)*$/, _e = (e, n, o, s = "") => {
  const t = e.split(":");
  if (e.slice(0, 1) === "@") {
    if (t.length < 2 || t.length > 3)
      return null;
    s = t.shift().slice(1);
  }
  if (t.length > 3 || !t.length)
    return null;
  if (t.length > 1) {
    const u = t.pop(), r = t.pop(), c = {
      // Allow provider without '@': "provider:prefix:name"
      provider: t.length > 0 ? t[0] : s,
      prefix: r,
      name: u
    };
    return n && !he(c) ? null : c;
  }
  const i = t[0], a = i.split("-");
  if (a.length > 1) {
    const u = {
      provider: s,
      prefix: a.shift(),
      name: a.join("-")
    };
    return n && !he(u) ? null : u;
  }
  if (o && s === "") {
    const u = {
      provider: s,
      prefix: "",
      name: i
    };
    return n && !he(u, o) ? null : u;
  }
  return null;
}, he = (e, n) => e ? !!// Check prefix: cannot be empty, unless allowSimpleName is enabled
// Check name: cannot be empty
((n && e.prefix === "" || e.prefix) && e.name) : !1, et = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
), ve = Object.freeze({
  rotate: 0,
  vFlip: !1,
  hFlip: !1
}), ye = Object.freeze({
  ...et,
  ...ve
}), Ie = Object.freeze({
  ...ye,
  body: "",
  hidden: !1
});
function Tt(e, n) {
  const o = {};
  !e.hFlip != !n.hFlip && (o.hFlip = !0), !e.vFlip != !n.vFlip && (o.vFlip = !0);
  const s = ((e.rotate || 0) + (n.rotate || 0)) % 4;
  return s && (o.rotate = s), o;
}
function Ue(e, n) {
  const o = Tt(e, n);
  for (const s in Ie)
    s in ve ? s in e && !(s in o) && (o[s] = ve[s]) : s in n ? o[s] = n[s] : s in e && (o[s] = e[s]);
  return o;
}
function It(e, n) {
  const o = e.icons, s = e.aliases || /* @__PURE__ */ Object.create(null), t = /* @__PURE__ */ Object.create(null);
  function i(a) {
    if (o[a])
      return t[a] = [];
    if (!(a in t)) {
      t[a] = null;
      const u = s[a] && s[a].parent, r = u && i(u);
      r && (t[a] = [u].concat(r));
    }
    return t[a];
  }
  return Object.keys(o).concat(Object.keys(s)).forEach(i), t;
}
function St(e, n, o) {
  const s = e.icons, t = e.aliases || /* @__PURE__ */ Object.create(null);
  let i = {};
  function a(u) {
    i = Ue(
      s[u] || t[u],
      i
    );
  }
  return a(n), o.forEach(a), Ue(e, i);
}
function tt(e, n) {
  const o = [];
  if (typeof e != "object" || typeof e.icons != "object")
    return o;
  e.not_found instanceof Array && e.not_found.forEach((t) => {
    n(t, null), o.push(t);
  });
  const s = It(e);
  for (const t in s) {
    const i = s[t];
    i && (n(t, St(e, t, i)), o.push(t));
  }
  return o;
}
const Ct = {
  provider: "",
  aliases: {},
  not_found: {},
  ...et
};
function xe(e, n) {
  for (const o in n)
    if (o in e && typeof e[o] != typeof n[o])
      return !1;
  return !0;
}
function st(e) {
  if (typeof e != "object" || e === null)
    return null;
  const n = e;
  if (typeof n.prefix != "string" || !e.icons || typeof e.icons != "object" || !xe(e, Ct))
    return null;
  const o = n.icons;
  for (const t in o) {
    const i = o[t];
    if (
      // Name cannot be empty
      !t || // Must have body
      typeof i.body != "string" || // Check other props
      !xe(
        i,
        Ie
      )
    )
      return null;
  }
  const s = n.aliases || /* @__PURE__ */ Object.create(null);
  for (const t in s) {
    const i = s[t], a = i.parent;
    if (
      // Name cannot be empty
      !t || // Parent must be set and point to existing icon
      typeof a != "string" || !o[a] && !s[a] || // Check other props
      !xe(
        i,
        Ie
      )
    )
      return null;
  }
  return n;
}
const Be = /* @__PURE__ */ Object.create(null);
function $t(e, n) {
  return {
    provider: e,
    prefix: n,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function se(e, n) {
  const o = Be[e] || (Be[e] = /* @__PURE__ */ Object.create(null));
  return o[n] || (o[n] = $t(e, n));
}
function nt(e, n) {
  return st(n) ? tt(n, (o, s) => {
    s ? e.icons[o] = s : e.missing.add(o);
  }) : [];
}
function Et(e, n, o) {
  try {
    if (typeof o.body == "string")
      return e.icons[n] = { ...o }, !0;
  } catch {
  }
  return !1;
}
let ue = !1;
function ot(e) {
  return typeof e == "boolean" && (ue = e), ue;
}
function At(e) {
  const n = typeof e == "string" ? _e(e, !0, ue) : e;
  if (n) {
    const o = se(n.provider, n.prefix), s = n.name;
    return o.icons[s] || (o.missing.has(s) ? null : void 0);
  }
}
function Rt(e, n) {
  const o = _e(e, !0, ue);
  if (!o)
    return !1;
  const s = se(o.provider, o.prefix);
  return n ? Et(s, o.name, n) : (s.missing.add(o.name), !0);
}
function Lt(e, n) {
  if (typeof e != "object")
    return !1;
  if (typeof n != "string" && (n = e.provider || ""), ue && !n && !e.prefix) {
    let t = !1;
    return st(e) && (e.prefix = "", tt(e, (i, a) => {
      Rt(i, a) && (t = !0);
    })), t;
  }
  const o = e.prefix;
  if (!he({
    prefix: o,
    name: "a"
  }))
    return !1;
  const s = se(n, o);
  return !!nt(s, e);
}
const it = Object.freeze({
  width: null,
  height: null
}), at = Object.freeze({
  // Dimensions
  ...it,
  // Transformations
  ...ve
}), Ft = /(-?[0-9.]*[0-9]+[0-9.]*)/g, Mt = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function Ve(e, n, o) {
  if (n === 1)
    return e;
  if (o = o || 100, typeof e == "number")
    return Math.ceil(e * n * o) / o;
  if (typeof e != "string")
    return e;
  const s = e.split(Ft);
  if (s === null || !s.length)
    return e;
  const t = [];
  let i = s.shift(), a = Mt.test(i);
  for (; ; ) {
    if (a) {
      const u = parseFloat(i);
      isNaN(u) ? t.push(i) : t.push(Math.ceil(u * n * o) / o);
    } else
      t.push(i);
    if (i = s.shift(), i === void 0)
      return t.join("");
    a = !a;
  }
}
function Pt(e, n = "defs") {
  let o = "";
  const s = e.indexOf("<" + n);
  for (; s >= 0; ) {
    const t = e.indexOf(">", s), i = e.indexOf("</" + n);
    if (t === -1 || i === -1)
      break;
    const a = e.indexOf(">", i);
    if (a === -1)
      break;
    o += e.slice(t + 1, i).trim(), e = e.slice(0, s).trim() + e.slice(a + 1);
  }
  return {
    defs: o,
    content: e
  };
}
function Ot(e, n) {
  return e ? "<defs>" + e + "</defs>" + n : n;
}
function Dt(e, n, o) {
  const s = Pt(e);
  return Ot(s.defs, n + s.content + o);
}
const Nt = (e) => e === "unset" || e === "undefined" || e === "none";
function jt(e, n) {
  const o = {
    ...ye,
    ...e
  }, s = {
    ...at,
    ...n
  }, t = {
    left: o.left,
    top: o.top,
    width: o.width,
    height: o.height
  };
  let i = o.body;
  [o, s].forEach((g) => {
    const h = [], x = g.hFlip, R = g.vFlip;
    let F = g.rotate;
    x ? R ? F += 2 : (h.push(
      "translate(" + (t.width + t.left).toString() + " " + (0 - t.top).toString() + ")"
    ), h.push("scale(-1 1)"), t.top = t.left = 0) : R && (h.push(
      "translate(" + (0 - t.left).toString() + " " + (t.height + t.top).toString() + ")"
    ), h.push("scale(1 -1)"), t.top = t.left = 0);
    let M;
    switch (F < 0 && (F -= Math.floor(F / 4) * 4), F = F % 4, F) {
      case 1:
        M = t.height / 2 + t.top, h.unshift(
          "rotate(90 " + M.toString() + " " + M.toString() + ")"
        );
        break;
      case 2:
        h.unshift(
          "rotate(180 " + (t.width / 2 + t.left).toString() + " " + (t.height / 2 + t.top).toString() + ")"
        );
        break;
      case 3:
        M = t.width / 2 + t.left, h.unshift(
          "rotate(-90 " + M.toString() + " " + M.toString() + ")"
        );
        break;
    }
    F % 2 === 1 && (t.left !== t.top && (M = t.left, t.left = t.top, t.top = M), t.width !== t.height && (M = t.width, t.width = t.height, t.height = M)), h.length && (i = Dt(
      i,
      '<g transform="' + h.join(" ") + '">',
      "</g>"
    ));
  });
  const a = s.width, u = s.height, r = t.width, c = t.height;
  let f, p;
  a === null ? (p = u === null ? "1em" : u === "auto" ? c : u, f = Ve(p, r / c)) : (f = a === "auto" ? r : a, p = u === null ? Ve(f, c / r) : u === "auto" ? c : u);
  const v = {}, m = (g, h) => {
    Nt(h) || (v[g] = h.toString());
  };
  m("width", f), m("height", p);
  const _ = [t.left, t.top, r, c];
  return v.viewBox = _.join(" "), {
    attributes: v,
    viewBox: _,
    body: i
  };
}
const Ut = /\sid="(\S+)"/g, Bt = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let Vt = 0;
function zt(e, n = Bt) {
  const o = [];
  let s;
  for (; s = Ut.exec(e); )
    o.push(s[1]);
  if (!o.length)
    return e;
  const t = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return o.forEach((i) => {
    const a = typeof n == "function" ? n(i) : n + (Vt++).toString(), u = i.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    e = e.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + u + ')([")]|\\.[a-z])', "g"),
      "$1" + a + t + "$3"
    );
  }), e = e.replace(new RegExp(t, "g"), ""), e;
}
const Se = /* @__PURE__ */ Object.create(null);
function Ht(e, n) {
  Se[e] = n;
}
function Ce(e) {
  return Se[e] || Se[""];
}
function Me(e) {
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
const Pe = /* @__PURE__ */ Object.create(null), ie = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
], ge = [];
for (; ie.length > 0; )
  ie.length === 1 || Math.random() > 0.5 ? ge.push(ie.shift()) : ge.push(ie.pop());
Pe[""] = Me({
  resources: ["https://api.iconify.design"].concat(ge)
});
function Wt(e, n) {
  const o = Me(n);
  return o === null ? !1 : (Pe[e] = o, !0);
}
function Oe(e) {
  return Pe[e];
}
const Gt = () => {
  let e;
  try {
    if (e = fetch, typeof e == "function")
      return e;
  } catch {
  }
};
let ze = Gt();
function Qt(e, n) {
  const o = Oe(e);
  if (!o)
    return 0;
  let s;
  if (!o.maxURL)
    s = 0;
  else {
    let t = 0;
    o.resources.forEach((a) => {
      t = Math.max(t, a.length);
    });
    const i = n + ".json?icons=";
    s = o.maxURL - t - o.path.length - i.length;
  }
  return s;
}
function Yt(e) {
  return e === 404;
}
const Kt = (e, n, o) => {
  const s = [], t = Qt(e, n), i = "icons";
  let a = {
    type: i,
    provider: e,
    prefix: n,
    icons: []
  }, u = 0;
  return o.forEach((r, c) => {
    u += r.length + 1, u >= t && c > 0 && (s.push(a), a = {
      type: i,
      provider: e,
      prefix: n,
      icons: []
    }, u = r.length), a.icons.push(r);
  }), s.push(a), s;
};
function qt(e) {
  if (typeof e == "string") {
    const n = Oe(e);
    if (n)
      return n.path;
  }
  return "/";
}
const Jt = (e, n, o) => {
  if (!ze) {
    o("abort", 424);
    return;
  }
  let s = qt(n.provider);
  switch (n.type) {
    case "icons": {
      const i = n.prefix, u = n.icons.join(","), r = new URLSearchParams({
        icons: u
      });
      s += i + ".json?" + r.toString();
      break;
    }
    case "custom": {
      const i = n.uri;
      s += i.slice(0, 1) === "/" ? i.slice(1) : i;
      break;
    }
    default:
      o("abort", 400);
      return;
  }
  let t = 503;
  ze(e + s).then((i) => {
    const a = i.status;
    if (a !== 200) {
      setTimeout(() => {
        o(Yt(a) ? "abort" : "next", a);
      });
      return;
    }
    return t = 501, i.json();
  }).then((i) => {
    if (typeof i != "object" || i === null) {
      setTimeout(() => {
        i === 404 ? o("abort", i) : o("next", t);
      });
      return;
    }
    setTimeout(() => {
      o("success", i);
    });
  }).catch(() => {
    o("next", t);
  });
}, Xt = {
  prepare: Kt,
  send: Jt
};
function Zt(e) {
  const n = {
    loaded: [],
    missing: [],
    pending: []
  }, o = /* @__PURE__ */ Object.create(null);
  e.sort((t, i) => t.provider !== i.provider ? t.provider.localeCompare(i.provider) : t.prefix !== i.prefix ? t.prefix.localeCompare(i.prefix) : t.name.localeCompare(i.name));
  let s = {
    provider: "",
    prefix: "",
    name: ""
  };
  return e.forEach((t) => {
    if (s.name === t.name && s.prefix === t.prefix && s.provider === t.provider)
      return;
    s = t;
    const i = t.provider, a = t.prefix, u = t.name, r = o[i] || (o[i] = /* @__PURE__ */ Object.create(null)), c = r[a] || (r[a] = se(i, a));
    let f;
    u in c.icons ? f = n.loaded : a === "" || c.missing.has(u) ? f = n.missing : f = n.pending;
    const p = {
      provider: i,
      prefix: a,
      name: u
    };
    f.push(p);
  }), n;
}
function lt(e, n) {
  e.forEach((o) => {
    const s = o.loaderCallbacks;
    s && (o.loaderCallbacks = s.filter((t) => t.id !== n));
  });
}
function es(e) {
  e.pendingCallbacksFlag || (e.pendingCallbacksFlag = !0, setTimeout(() => {
    e.pendingCallbacksFlag = !1;
    const n = e.loaderCallbacks ? e.loaderCallbacks.slice(0) : [];
    if (!n.length)
      return;
    let o = !1;
    const s = e.provider, t = e.prefix;
    n.forEach((i) => {
      const a = i.icons, u = a.pending.length;
      a.pending = a.pending.filter((r) => {
        if (r.prefix !== t)
          return !0;
        const c = r.name;
        if (e.icons[c])
          a.loaded.push({
            provider: s,
            prefix: t,
            name: c
          });
        else if (e.missing.has(c))
          a.missing.push({
            provider: s,
            prefix: t,
            name: c
          });
        else
          return o = !0, !0;
        return !1;
      }), a.pending.length !== u && (o || lt([e], i.id), i.callback(
        a.loaded.slice(0),
        a.missing.slice(0),
        a.pending.slice(0),
        i.abort
      ));
    });
  }));
}
let ts = 0;
function ss(e, n, o) {
  const s = ts++, t = lt.bind(null, o, s);
  if (!n.pending.length)
    return t;
  const i = {
    id: s,
    icons: n,
    callback: e,
    abort: t
  };
  return o.forEach((a) => {
    (a.loaderCallbacks || (a.loaderCallbacks = [])).push(i);
  }), t;
}
function ns(e, n = !0, o = !1) {
  const s = [];
  return e.forEach((t) => {
    const i = typeof t == "string" ? _e(t, n, o) : t;
    i && s.push(i);
  }), s;
}
var os = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function is(e, n, o, s) {
  const t = e.resources.length, i = e.random ? Math.floor(Math.random() * t) : e.index;
  let a;
  if (e.random) {
    let b = e.resources.slice(0);
    for (a = []; b.length > 1; ) {
      const k = Math.floor(Math.random() * b.length);
      a.push(b[k]), b = b.slice(0, k).concat(b.slice(k + 1));
    }
    a = a.concat(b);
  } else
    a = e.resources.slice(i).concat(e.resources.slice(0, i));
  const u = Date.now();
  let r = "pending", c = 0, f, p = null, v = [], m = [];
  typeof s == "function" && m.push(s);
  function _() {
    p && (clearTimeout(p), p = null);
  }
  function g() {
    r === "pending" && (r = "aborted"), _(), v.forEach((b) => {
      b.status === "pending" && (b.status = "aborted");
    }), v = [];
  }
  function h(b, k) {
    k && (m = []), typeof b == "function" && m.push(b);
  }
  function x() {
    return {
      startTime: u,
      payload: n,
      status: r,
      queriesSent: c,
      queriesPending: v.length,
      subscribe: h,
      abort: g
    };
  }
  function R() {
    r = "failed", m.forEach((b) => {
      b(void 0, f);
    });
  }
  function F() {
    v.forEach((b) => {
      b.status === "pending" && (b.status = "aborted");
    }), v = [];
  }
  function M(b, k, U) {
    const Q = k !== "success";
    switch (v = v.filter((z) => z !== b), r) {
      case "pending":
        break;
      case "failed":
        if (Q || !e.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (k === "abort") {
      f = U, R();
      return;
    }
    if (Q) {
      f = U, v.length || (a.length ? $() : R());
      return;
    }
    if (_(), F(), !e.random) {
      const z = e.resources.indexOf(b.resource);
      z !== -1 && z !== e.index && (e.index = z);
    }
    r = "completed", m.forEach((z) => {
      z(U);
    });
  }
  function $() {
    if (r !== "pending")
      return;
    _();
    const b = a.shift();
    if (b === void 0) {
      if (v.length) {
        p = setTimeout(() => {
          _(), r === "pending" && (F(), R());
        }, e.timeout);
        return;
      }
      R();
      return;
    }
    const k = {
      status: "pending",
      resource: b,
      callback: (U, Q) => {
        M(k, U, Q);
      }
    };
    v.push(k), c++, p = setTimeout($, e.rotate), o(b, n, k.callback);
  }
  return setTimeout($), x;
}
function ct(e) {
  const n = {
    ...os,
    ...e
  };
  let o = [];
  function s() {
    o = o.filter((u) => u().status === "pending");
  }
  function t(u, r, c) {
    const f = is(
      n,
      u,
      r,
      (p, v) => {
        s(), c && c(p, v);
      }
    );
    return o.push(f), f;
  }
  function i(u) {
    return o.find((r) => u(r)) || null;
  }
  return {
    query: t,
    find: i,
    setIndex: (u) => {
      n.index = u;
    },
    getIndex: () => n.index,
    cleanup: s
  };
}
function He() {
}
const ke = /* @__PURE__ */ Object.create(null);
function as(e) {
  if (!ke[e]) {
    const n = Oe(e);
    if (!n)
      return;
    const o = ct(n), s = {
      config: n,
      redundancy: o
    };
    ke[e] = s;
  }
  return ke[e];
}
function ls(e, n, o) {
  let s, t;
  if (typeof e == "string") {
    const i = Ce(e);
    if (!i)
      return o(void 0, 424), He;
    t = i.send;
    const a = as(e);
    a && (s = a.redundancy);
  } else {
    const i = Me(e);
    if (i) {
      s = ct(i);
      const a = e.resources ? e.resources[0] : "", u = Ce(a);
      u && (t = u.send);
    }
  }
  return !s || !t ? (o(void 0, 424), He) : s.query(n, t, o)().abort;
}
function We() {
}
function cs(e) {
  e.iconsLoaderFlag || (e.iconsLoaderFlag = !0, setTimeout(() => {
    e.iconsLoaderFlag = !1, es(e);
  }));
}
function rs(e) {
  const n = [], o = [];
  return e.forEach((s) => {
    (s.match(Ze) ? n : o).push(s);
  }), {
    valid: n,
    invalid: o
  };
}
function ae(e, n, o) {
  function s() {
    const t = e.pendingIcons;
    n.forEach((i) => {
      t && t.delete(i), e.icons[i] || e.missing.add(i);
    });
  }
  if (o && typeof o == "object")
    try {
      if (!nt(e, o).length) {
        s();
        return;
      }
    } catch (t) {
      console.error(t);
    }
  s(), cs(e);
}
function Ge(e, n) {
  e instanceof Promise ? e.then((o) => {
    n(o);
  }).catch(() => {
    n(null);
  }) : n(e);
}
function us(e, n) {
  e.iconsToLoad ? e.iconsToLoad = e.iconsToLoad.concat(n).sort() : e.iconsToLoad = n, e.iconsQueueFlag || (e.iconsQueueFlag = !0, setTimeout(() => {
    e.iconsQueueFlag = !1;
    const { provider: o, prefix: s } = e, t = e.iconsToLoad;
    if (delete e.iconsToLoad, !t || !t.length)
      return;
    const i = e.loadIcon;
    if (e.loadIcons && (t.length > 1 || !i)) {
      Ge(
        e.loadIcons(t, s, o),
        (f) => {
          ae(e, t, f);
        }
      );
      return;
    }
    if (i) {
      t.forEach((f) => {
        const p = i(f, s, o);
        Ge(p, (v) => {
          const m = v ? {
            prefix: s,
            icons: {
              [f]: v
            }
          } : null;
          ae(e, [f], m);
        });
      });
      return;
    }
    const { valid: a, invalid: u } = rs(t);
    if (u.length && ae(e, u, null), !a.length)
      return;
    const r = s.match(Ze) ? Ce(o) : null;
    if (!r) {
      ae(e, a, null);
      return;
    }
    r.prepare(o, s, a).forEach((f) => {
      ls(o, f, (p) => {
        ae(e, f.icons, p);
      });
    });
  }));
}
const ds = (e, n) => {
  const o = ns(e, !0, ot()), s = Zt(o);
  if (!s.pending.length) {
    let r = !0;
    return n && setTimeout(() => {
      r && n(
        s.loaded,
        s.missing,
        s.pending,
        We
      );
    }), () => {
      r = !1;
    };
  }
  const t = /* @__PURE__ */ Object.create(null), i = [];
  let a, u;
  return s.pending.forEach((r) => {
    const { provider: c, prefix: f } = r;
    if (f === u && c === a)
      return;
    a = c, u = f, i.push(se(c, f));
    const p = t[c] || (t[c] = /* @__PURE__ */ Object.create(null));
    p[f] || (p[f] = []);
  }), s.pending.forEach((r) => {
    const { provider: c, prefix: f, name: p } = r, v = se(c, f), m = v.pendingIcons || (v.pendingIcons = /* @__PURE__ */ new Set());
    m.has(p) || (m.add(p), t[c][f].push(p));
  }), i.forEach((r) => {
    const c = t[r.provider][r.prefix];
    c.length && us(r, c);
  }), n ? ss(n, s, i) : We;
};
function fs(e, n) {
  const o = {
    ...e
  };
  for (const s in n) {
    const t = n[s], i = typeof t;
    s in it ? (t === null || t && (i === "string" || i === "number")) && (o[s] = t) : i === typeof o[s] && (o[s] = s === "rotate" ? t % 4 : t);
  }
  return o;
}
const ps = /[\s,]+/;
function hs(e, n) {
  n.split(ps).forEach((o) => {
    switch (o.trim()) {
      case "horizontal":
        e.hFlip = !0;
        break;
      case "vertical":
        e.vFlip = !0;
        break;
    }
  });
}
function gs(e, n = 0) {
  const o = e.replace(/^-?[0-9.]*/, "");
  function s(t) {
    for (; t < 0; )
      t += 4;
    return t % 4;
  }
  if (o === "") {
    const t = parseInt(e);
    return isNaN(t) ? 0 : s(t);
  } else if (o !== e) {
    let t = 0;
    switch (o) {
      case "%":
        t = 25;
        break;
      case "deg":
        t = 90;
    }
    if (t) {
      let i = parseFloat(e.slice(0, e.length - o.length));
      return isNaN(i) ? 0 : (i = i / t, i % 1 === 0 ? s(i) : 0);
    }
  }
  return n;
}
function ms(e, n) {
  let o = e.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const s in n)
    o += " " + s + '="' + n[s] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + o + ">" + e + "</svg>";
}
function vs(e) {
  return e.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function _s(e) {
  return "data:image/svg+xml," + vs(e);
}
function ys(e) {
  return 'url("' + _s(e) + '")';
}
const Qe = {
  ...at,
  inline: !1
}, bs = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": !0,
  role: "img"
}, ws = {
  display: "inline-block"
}, $e = {
  backgroundColor: "currentColor"
}, rt = {
  backgroundColor: "transparent"
}, Ye = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
}, Ke = {
  webkitMask: $e,
  mask: $e,
  background: rt
};
for (const e in Ke) {
  const n = Ke[e];
  for (const o in Ye)
    n[e + o] = Ye[o];
}
const me = {};
["horizontal", "vertical"].forEach((e) => {
  const n = e.slice(0, 1) + "Flip";
  me[e + "-flip"] = n, me[e.slice(0, 1) + "-flip"] = n, me[e + "Flip"] = n;
});
function qe(e) {
  return e + (e.match(/^[-0-9.]+$/) ? "px" : "");
}
const Je = (e, n) => {
  const o = fs(Qe, n), s = { ...bs }, t = n.mode || "svg", i = {}, a = n.style, u = typeof a == "object" && !(a instanceof Array) ? a : {};
  for (let g in n) {
    const h = n[g];
    if (h !== void 0)
      switch (g) {
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
          o[g] = h === !0 || h === "true" || h === 1;
          break;
        // Flip as string: 'horizontal,vertical'
        case "flip":
          typeof h == "string" && hs(o, h);
          break;
        // Color: override style
        case "color":
          i.color = h;
          break;
        // Rotation as string
        case "rotate":
          typeof h == "string" ? o[g] = gs(h) : typeof h == "number" && (o[g] = h);
          break;
        // Remove aria-hidden
        case "ariaHidden":
        case "aria-hidden":
          h !== !0 && h !== "true" && delete s["aria-hidden"];
          break;
        default: {
          const x = me[g];
          x ? (h === !0 || h === "true" || h === 1) && (o[x] = !0) : Qe[g] === void 0 && (s[g] = h);
        }
      }
  }
  const r = jt(e, o), c = r.attributes;
  if (o.inline && (i.verticalAlign = "-0.125em"), t === "svg") {
    s.style = {
      ...i,
      ...u
    }, Object.assign(s, c);
    let g = 0, h = n.id;
    return typeof h == "string" && (h = h.replace(/-/g, "_")), s.innerHTML = zt(r.body, h ? () => h + "ID" + g++ : "iconifyVue"), je("svg", s);
  }
  const { body: f, width: p, height: v } = e, m = t === "mask" || (t === "bg" ? !1 : f.indexOf("currentColor") !== -1), _ = ms(f, {
    ...c,
    width: p + "",
    height: v + ""
  });
  return s.style = {
    ...i,
    "--svg": ys(_),
    width: qe(c.width),
    height: qe(c.height),
    ...ws,
    ...m ? $e : rt,
    ...u
  }, je("span", s);
};
ot(!0);
Ht("", Xt);
if (typeof document < "u" && typeof window < "u") {
  const e = window;
  if (e.IconifyPreload !== void 0) {
    const n = e.IconifyPreload, o = "Invalid IconifyPreload syntax.";
    typeof n == "object" && n !== null && (n instanceof Array ? n : [n]).forEach((s) => {
      try {
        // Check if item is an object and not null/array
        (typeof s != "object" || s === null || s instanceof Array || // Check for 'icons' and 'prefix'
        typeof s.icons != "object" || typeof s.prefix != "string" || // Add icon set
        !Lt(s)) && console.error(o);
      } catch {
        console.error(o);
      }
    });
  }
  if (e.IconifyProviders !== void 0) {
    const n = e.IconifyProviders;
    if (typeof n == "object" && n !== null)
      for (let o in n) {
        const s = "IconifyProviders[" + o + "] is invalid.";
        try {
          const t = n[o];
          if (typeof t != "object" || !t || t.resources === void 0)
            continue;
          Wt(o, t) || console.error(s);
        } catch {
          console.error(s);
        }
      }
  }
}
const xs = {
  ...ye,
  body: ""
}, E = V((e, { emit: n }) => {
  const o = I(null);
  function s() {
    var c, f;
    o.value && ((f = (c = o.value).abort) == null || f.call(c), o.value = null);
  }
  const t = I(!!e.ssr), i = I(""), a = yt(null);
  function u() {
    const c = e.icon;
    if (typeof c == "object" && c !== null && typeof c.body == "string")
      return i.value = "", {
        data: c
      };
    let f;
    if (typeof c != "string" || (f = _e(c, !1, !0)) === null)
      return null;
    let p = At(f);
    if (!p) {
      const _ = o.value;
      return (!_ || _.name !== c) && (p === null ? o.value = {
        name: c
      } : o.value = {
        name: c,
        abort: ds([f], r)
      }), null;
    }
    s(), i.value !== c && (i.value = c, Re(() => {
      n("load", c);
    }));
    const v = e.customise;
    if (v) {
      p = Object.assign({}, p);
      const _ = v(p.body, f.name, f.prefix, f.provider);
      typeof _ == "string" && (p.body = _);
    }
    const m = ["iconify"];
    return f.prefix !== "" && m.push("iconify--" + f.prefix), f.provider !== "" && m.push("iconify--" + f.provider), { data: p, classes: m };
  }
  function r() {
    var f;
    const c = u();
    c ? c.data !== ((f = a.value) == null ? void 0 : f.data) && (a.value = c) : a.value = null;
  }
  return t.value ? r() : Ee(() => {
    t.value = !0, r();
  }), X(() => e.icon, r), Ae(s), () => {
    const c = a.value;
    if (!c)
      return Je(xs, e);
    let f = e;
    return c.classes && (f = {
      ...e,
      class: c.classes.join(" ")
    }), Je({
      ...ye,
      ...c.data
    }, f);
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
}), ut = "simplePrompt.settings", dt = {
  convertUnderscoreToSpace: !0,
  escapeBrackets: !1,
  useAliasesInSearch: !0,
  useAliasesInAutocomplete: !1,
  // Default false as per new spec
  smartBackspace: !1,
  // Default false - user must opt-in
  language: "en"
  // Default fallback
}, L = bt({ ...dt });
function ks() {
  try {
    const e = localStorage.getItem(ut);
    if (e) {
      const n = JSON.parse(e);
      Object.assign(L, { ...dt, ...n });
    } else
      navigator.language.startsWith("zh") && (L.language = "zh-CN");
  } catch (e) {
    console.error("Failed to load settings:", e);
  }
}
X(L, (e) => {
  try {
    localStorage.setItem(ut, JSON.stringify(e));
  } catch (n) {
    console.error("Failed to save settings:", n);
  }
}, { deep: !0 });
ks();
const Ts = { class: "settings-container" }, Is = { class: "settings-header" }, Ss = { class: "settings-title" }, Cs = ["title"], $s = { class: "settings-body" }, Es = { class: "settings-sidebar" }, As = ["onClick"], Rs = { class: "settings-content" }, Ls = {
  key: 0,
  class: "settings-section"
}, Fs = { class: "section-title" }, Ms = { class: "setting-item" }, Ps = { class: "setting-info" }, Os = { class: "setting-label" }, Ds = { class: "setting-desc" }, Ns = { class: "switch" }, js = { class: "setting-item" }, Us = { class: "setting-info" }, Bs = { class: "setting-label" }, Vs = { class: "setting-desc" }, zs = { class: "switch" }, Hs = {
  key: 1,
  class: "settings-section"
}, Ws = { class: "section-title" }, Gs = { class: "setting-item" }, Qs = { class: "setting-info" }, Ys = { class: "setting-label" }, Ks = { class: "setting-desc" }, qs = { class: "switch" }, Js = { class: "setting-item" }, Xs = { class: "setting-info" }, Zs = { class: "setting-label" }, en = { class: "setting-desc" }, tn = { class: "switch" }, sn = {
  key: 2,
  class: "settings-section"
}, nn = { class: "section-title" }, on = { class: "setting-item" }, an = { class: "setting-info" }, ln = { class: "setting-label" }, cn = { class: "setting-desc" }, rn = { class: "switch" }, un = {
  key: 3,
  class: "settings-section"
}, dn = { class: "section-title" }, fn = { class: "setting-item" }, pn = { class: "setting-info" }, hn = { class: "setting-label" }, gn = { class: "setting-desc" }, mn = {
  key: 4,
  class: "settings-section"
}, vn = { class: "section-title" }, _n = { class: "setting-item data-update-item" }, yn = { class: "setting-info" }, bn = { class: "setting-label" }, wn = { class: "setting-desc" }, xn = { class: "update-actions" }, kn = ["disabled"], Tn = { class: "settings-footer" }, In = { class: "footer-info" }, Sn = /* @__PURE__ */ V({
  __name: "SettingsModal",
  props: {
    visible: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["close"],
  setup(e, { emit: n }) {
    const o = e, s = n, { t, locale: i } = Z(), a = () => {
      s("close");
    };
    X(() => L.language, (_) => {
      i.value = _;
    });
    const u = [
      { id: "textFormat", icon: "mdi:format-text" },
      { id: "autocomplete", icon: "mdi:magnify" },
      { id: "editing", icon: "mdi:pencil" },
      { id: "interface", icon: "mdi:translate" },
      { id: "data", icon: "mdi:database" }
    ], r = I("textFormat"), c = I(""), f = I(!1), p = I(!1);
    I(!1);
    const v = I(""), m = async () => {
      if (!(f.value || p.value)) {
        p.value = !0, c.value = t("settings.checkingUpdate");
        try {
          const _ = await fetch("/simple-prompt/check-update"), g = await _.json();
          if (!_.ok) {
            c.value = t("settings.updateError") + (g.error || _.statusText), p.value = !1;
            return;
          }
          if (v.value = g.version, p.value = !1, !g.update_available) {
            c.value = t("settings.upToDate") + v.value;
            return;
          }
          f.value = !0, c.value = t("settings.updating");
          const h = await fetch("/simple-prompt/update-tags", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({})
          }), x = await h.json();
          h.ok && x.status === "success" ? c.value = t("settings.updateSuccess") : c.value = t("settings.updateError") + (x.error || h.statusText);
        } catch (_) {
          console.error("Update action error:", _), c.value = t("settings.updateError") + _;
        } finally {
          p.value = !1, f.value = !1;
        }
      }
    };
    return X(() => o.visible, (_) => {
      _ && (c.value = "", v.value = "");
    }), (_, g) => (w(), le(Le, { name: "fade" }, {
      default: fe(() => [
        e.visible ? (w(), T("div", {
          key: 0,
          class: "settings-overlay",
          onClick: te(a, ["self"])
        }, [
          l("div", Ts, [
            l("div", Is, [
              l("div", Ss, [
                S(d(E), {
                  icon: "mdi:cog",
                  class: "settings-icon"
                }),
                l("span", null, y(d(t)("settings.title")), 1)
              ]),
              l("button", {
                class: "btn-close",
                onClick: a,
                title: d(t)("common.close")
              }, [
                S(d(E), { icon: "mdi:close" })
              ], 8, Cs)
            ]),
            l("div", $s, [
              l("div", Es, [
                (w(), T(ee, null, ce(u, (h) => l("div", {
                  key: h.id,
                  class: re(["sidebar-item", { active: r.value === h.id }]),
                  onClick: (x) => r.value = h.id
                }, [
                  S(d(E), {
                    icon: h.icon,
                    class: "item-icon"
                  }, null, 8, ["icon"]),
                  l("span", null, y(d(t)(`settings.sections.${h.id}`)), 1)
                ], 10, As)), 64))
              ]),
              l("div", Rs, [
                r.value === "textFormat" ? (w(), T("div", Ls, [
                  l("h3", Fs, [
                    S(d(E), { icon: "mdi:format-text" }),
                    B(" " + y(d(t)("settings.sections.textFormat")), 1)
                  ]),
                  l("div", Ms, [
                    l("div", Ps, [
                      l("label", Os, y(d(t)("settings.items.convertUnderscore")), 1),
                      l("p", Ds, y(d(t)("settings.items.convertUnderscoreDesc")), 1)
                    ]),
                    l("label", Ns, [
                      W(l("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": g[0] || (g[0] = (h) => d(L).convertUnderscoreToSpace = h)
                      }, null, 512), [
                        [oe, d(L).convertUnderscoreToSpace]
                      ]),
                      g[6] || (g[6] = l("span", { class: "slider" }, null, -1))
                    ])
                  ]),
                  l("div", js, [
                    l("div", Us, [
                      l("label", Bs, y(d(t)("settings.items.escapeBrackets")), 1),
                      l("p", Vs, y(d(t)("settings.items.escapeBracketsDesc")), 1)
                    ]),
                    l("label", zs, [
                      W(l("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": g[1] || (g[1] = (h) => d(L).escapeBrackets = h)
                      }, null, 512), [
                        [oe, d(L).escapeBrackets]
                      ]),
                      g[7] || (g[7] = l("span", { class: "slider" }, null, -1))
                    ])
                  ])
                ])) : O("", !0),
                r.value === "autocomplete" ? (w(), T("div", Hs, [
                  l("h3", Ws, [
                    S(d(E), { icon: "mdi:magnify" }),
                    B(" " + y(d(t)("settings.sections.autocomplete")), 1)
                  ]),
                  l("div", Gs, [
                    l("div", Qs, [
                      l("label", Ys, y(d(t)("settings.items.useAliasSearch")), 1),
                      l("p", Ks, y(d(t)("settings.items.useAliasSearchDesc")), 1)
                    ]),
                    l("label", qs, [
                      W(l("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": g[2] || (g[2] = (h) => d(L).useAliasesInSearch = h)
                      }, null, 512), [
                        [oe, d(L).useAliasesInSearch]
                      ]),
                      g[8] || (g[8] = l("span", { class: "slider" }, null, -1))
                    ])
                  ]),
                  l("div", Js, [
                    l("div", Xs, [
                      l("label", Zs, y(d(t)("settings.items.useAliasAutocomplete")), 1),
                      l("p", en, y(d(t)("settings.items.useAliasAutocompleteDesc")), 1)
                    ]),
                    l("label", tn, [
                      W(l("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": g[3] || (g[3] = (h) => d(L).useAliasesInAutocomplete = h)
                      }, null, 512), [
                        [oe, d(L).useAliasesInAutocomplete]
                      ]),
                      g[9] || (g[9] = l("span", { class: "slider" }, null, -1))
                    ])
                  ])
                ])) : O("", !0),
                r.value === "editing" ? (w(), T("div", sn, [
                  l("h3", nn, [
                    S(d(E), { icon: "mdi:pencil" }),
                    B(" " + y(d(t)("settings.sections.editing")), 1)
                  ]),
                  l("div", on, [
                    l("div", an, [
                      l("label", ln, y(d(t)("settings.items.smartBackspace")), 1),
                      l("p", cn, y(d(t)("settings.items.smartBackspaceDesc")), 1)
                    ]),
                    l("label", rn, [
                      W(l("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": g[4] || (g[4] = (h) => d(L).smartBackspace = h)
                      }, null, 512), [
                        [oe, d(L).smartBackspace]
                      ]),
                      g[10] || (g[10] = l("span", { class: "slider" }, null, -1))
                    ])
                  ])
                ])) : O("", !0),
                r.value === "interface" ? (w(), T("div", un, [
                  l("h3", dn, [
                    S(d(E), { icon: "mdi:translate" }),
                    B(" " + y(d(t)("settings.sections.interface")), 1)
                  ]),
                  l("div", fn, [
                    l("div", pn, [
                      l("label", hn, y(d(t)("settings.items.language")), 1),
                      l("p", gn, y(d(t)("settings.items.languageDesc")), 1)
                    ]),
                    W(l("select", {
                      "onUpdate:modelValue": g[5] || (g[5] = (h) => d(L).language = h),
                      class: "language-select"
                    }, g[11] || (g[11] = [
                      l("option", { value: "en" }, "English", -1),
                      l("option", { value: "zh-CN" }, "简体中文", -1)
                    ]), 512), [
                      [wt, d(L).language]
                    ])
                  ])
                ])) : O("", !0),
                r.value === "data" ? (w(), T("div", mn, [
                  l("h3", vn, [
                    S(d(E), { icon: "mdi:database" }),
                    B(" " + y(d(t)("settings.sections.data")), 1)
                  ]),
                  l("div", _n, [
                    l("div", yn, [
                      l("label", bn, y(d(t)("settings.items.updateTags")), 1),
                      l("p", wn, y(d(t)("settings.items.updateTagsDesc")), 1)
                    ]),
                    l("div", xn, [
                      l("button", {
                        class: "btn-update primary",
                        disabled: f.value || p.value,
                        onClick: m
                      }, [
                        f.value || p.value ? (w(), le(d(E), {
                          key: 0,
                          icon: "mdi:loading",
                          class: "spin"
                        })) : O("", !0),
                        l("span", null, y(d(t)("settings.updateNow")), 1)
                      ], 8, kn)
                    ])
                  ]),
                  c.value ? (w(), T("div", {
                    key: 0,
                    class: re(["update-status-box", { error: c.value.includes("failed"), success: c.value.includes("success") || c.value.includes("upToDate") }])
                  }, [
                    S(d(E), {
                      icon: c.value.includes("success") || c.value.includes("upToDate") ? "mdi:check-circle" : "mdi:alert-circle"
                    }, null, 8, ["icon"]),
                    l("span", null, y(c.value), 1)
                  ], 2)) : O("", !0)
                ])) : O("", !0)
              ])
            ]),
            l("div", Tn, [
              l("div", In, [
                S(d(E), { icon: "mdi:information-outline" }),
                B(" " + y(d(t)("settings.autoSave")), 1)
              ]),
              l("button", {
                class: "btn-primary",
                onClick: a
              }, y(d(t)("common.done")), 1)
            ])
          ])
        ])) : O("", !0)
      ]),
      _: 1
    }));
  }
}), Y = (e, n) => {
  const o = e.__vccOpts || e;
  for (const [s, t] of n)
    o[s] = t;
  return o;
}, Cn = /* @__PURE__ */ Y(Sn, [["__scopeId", "data-v-f60947ac"]]), $n = { class: "sp-modal-container" }, En = { class: "sp-modal-header" }, An = { class: "sp-modal-title" }, Rn = { class: "sp-modal-actions" }, Ln = ["title"], Fn = ["title"], Mn = { class: "sp-modal-body" }, Pn = { class: "sp-modal-footer" }, On = { class: "sp-footer-left" }, Dn = { class: "sp-hint" }, Nn = { class: "sp-footer-right" }, jn = /* @__PURE__ */ V({
  __name: "ModalWrapper",
  props: {
    visible: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["close", "save"],
  setup(e, { emit: n }) {
    const o = n, s = e, { t } = Z(), i = I(!1), a = () => {
      i.value = !0;
    }, u = () => {
      i.value = !1;
    }, r = () => {
      o("close");
    }, c = () => {
      o("save");
    }, f = (p) => {
      p.key === "Escape" && s.visible && r(), (p.ctrlKey || p.metaKey) && p.key === "s" && (p.preventDefault(), c());
    };
    return Ee(() => {
      window.addEventListener("keydown", f);
    }), Ae(() => {
      window.removeEventListener("keydown", f);
    }), (p, v) => (w(), le(Le, { name: "fade" }, {
      default: fe(() => [
        e.visible ? (w(), T("div", {
          key: 0,
          class: "sp-modal-overlay",
          onClick: te(r, ["self"])
        }, [
          l("div", $n, [
            l("div", En, [
              l("div", An, [
                S(d(E), {
                  icon: "mdi:pencil-box-outline",
                  class: "sp-icon"
                }),
                l("span", null, y(d(t)("editor.subtitle")), 1)
              ]),
              l("div", Rn, [
                l("button", {
                  class: "sp-btn-icon",
                  title: d(t)("settings.title"),
                  onClick: a
                }, [
                  S(d(E), { icon: "mdi:cog" })
                ], 8, Ln),
                l("button", {
                  class: "sp-btn-icon sp-btn-close",
                  onClick: r,
                  title: d(t)("common.close")
                }, [
                  S(d(E), { icon: "mdi:close" })
                ], 8, Fn)
              ])
            ]),
            l("div", Mn, [
              xt(p.$slots, "content", {}, void 0, !0)
            ]),
            l("div", Pn, [
              l("div", On, [
                l("span", Dn, y(d(t)("editor.autocompleteHint")), 1)
              ]),
              l("div", Nn, [
                l("button", {
                  class: "sp-btn sp-btn-secondary",
                  onClick: r
                }, y(d(t)("common.cancel")), 1),
                l("button", {
                  class: "sp-btn sp-btn-primary",
                  onClick: c
                }, y(d(t)("common.save")), 1)
              ])
            ])
          ]),
          S(Cn, {
            visible: i.value,
            onClose: u
          }, null, 8, ["visible"])
        ])) : O("", !0)
      ]),
      _: 3
    }));
  }
}), Un = /* @__PURE__ */ Y(jn, [["__scopeId", "data-v-b5166860"]]), q = class q {
  constructor() {
    we(this, "isInitialized", !1);
  }
  static getInstance() {
    return q.instance || (q.instance = new q()), q.instance;
  }
  async init() {
    this.isInitialized || (console.log("[DuckDB] Backend initialization check (API-based)"), this.isInitialized = !0);
  }
  async searchTags(n, o = 20, s = !1, t = []) {
    const i = new URLSearchParams({
      q: n,
      limit: o.toString(),
      use_aliases: s.toString(),
      categories: t.join(",")
    });
    try {
      const a = await fetch(`/simple-prompt/search-tags?${i.toString()}`);
      if (!a.ok)
        throw new Error(`HTTP error! status: ${a.status}`);
      const u = await a.json();
      return s && u.length > 0 ? u.map((r) => {
        if (r.name && r.name.toLowerCase().includes(n.toLowerCase()))
          return r;
        const f = Array.isArray(r.alias) ? r.alias : [];
        if (f.length > 0) {
          const p = f.find(
            (v) => v && v.toLowerCase().includes(n.toLowerCase())
          );
          if (p)
            return { ...r, matched_alias: p };
        }
        return r;
      }) : u;
    } catch (a) {
      return console.error("[DuckDB] Search failed via API:", a), [];
    }
  }
};
we(q, "instance");
let de = q;
function Bn(e, n) {
  const o = [
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
  ], s = document.createElement("div");
  s.id = "input-textarea-caret-position-mirror-div", document.body.appendChild(s);
  const t = s.style, i = window.getComputedStyle(e);
  t.whiteSpace = "pre-wrap", e.nodeName !== "INPUT" && (t.wordWrap = "break-word"), t.position = "absolute", t.visibility = "hidden", o.forEach((r) => {
    t[r] = i[r];
  }), navigator.userAgent.toLowerCase().indexOf("firefox") > -1 ? e.scrollHeight > parseInt(i.height) && (t.overflowY = "scroll") : t.overflow = "hidden", s.textContent = e.value.substring(0, n), e.nodeName === "INPUT" && (s.textContent = s.textContent.replace(/\s/g, " "));
  const a = document.createElement("span");
  a.textContent = e.value.substring(n) || ".", s.appendChild(a);
  const u = {
    top: a.offsetTop + parseInt(i.borderTopWidth),
    left: a.offsetLeft + parseInt(i.borderLeftWidth),
    height: parseInt(i.lineHeight)
  };
  return document.body.removeChild(s), u;
}
var P = /* @__PURE__ */ ((e) => (e[e.GENERAL = 0] = "GENERAL", e[e.ARTIST = 1] = "ARTIST", e[e.COPYRIGHT = 3] = "COPYRIGHT", e[e.CHARACTER = 4] = "CHARACTER", e[e.META = 5] = "META", e))(P || {});
const G = {
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
}, Vn = { class: "autocomplete-list" }, zn = {
  key: 0,
  class: "loading-item"
}, Hn = {
  key: 1,
  class: "no-results"
}, Wn = ["onClick"], Gn = { class: "item-left" }, Qn = { class: "item-name" }, Yn = {
  key: 0,
  class: "item-alias"
}, Kn = { class: "item-right" }, qn = { class: "item-count" }, Jn = /* @__PURE__ */ V({
  __name: "AutocompleteList",
  props: {
    items: {},
    selectedIndex: {},
    loading: { type: Boolean }
  },
  emits: ["select"],
  setup(e, { emit: n }) {
    const o = n, { t: s } = Z(), t = (u) => {
      o("select", u);
    }, i = (u) => G[u] || G[P.GENERAL], a = (u) => {
      const r = Number(u);
      return r >= 1e6 ? (r / 1e6).toFixed(1) + "M" : r >= 1e3 ? (r / 1e3).toFixed(1) + "k" : r.toString();
    };
    return (u, r) => (w(), T("div", Vn, [
      u.loading ? (w(), T("div", zn, [
        S(d(E), {
          icon: "mdi:loading",
          class: "spin"
        }),
        B(" " + y(d(s)("editor.loading")), 1)
      ])) : u.items.length === 0 ? (w(), T("div", Hn, y(d(s)("editor.noMatches")), 1)) : (w(!0), T(ee, { key: 2 }, ce(u.items, (c, f) => (w(), T("div", {
        key: c.id,
        class: re(["menu-item", { selected: f === u.selectedIndex }]),
        onClick: (p) => t(c),
        onMousedown: r[0] || (r[0] = te(() => {
        }, ["prevent"]))
      }, [
        l("div", Gn, [
          l("div", {
            class: "category-dot",
            style: J({ backgroundColor: i(c.category) })
          }, null, 4),
          l("span", Qn, y(c.name), 1),
          c.alias_match ? (w(), T("span", Yn, "(" + y(c.alias_match) + ")", 1)) : O("", !0)
        ]),
        l("div", Kn, [
          l("span", qn, y(a(c.post_count)), 1)
        ])
      ], 42, Wn))), 128))
    ]));
  }
}), Xn = /* @__PURE__ */ Y(Jn, [["__scopeId", "data-v-5dc1fd05"]]), Zn = {
  key: 0,
  class: "tag-weight"
}, eo = ["title"], to = { class: "weight-value" }, so = ["title"], no = ["title"], oo = /* @__PURE__ */ V({
  __name: "TagItem",
  props: {
    tag: {}
  },
  emits: ["remove", "update:weight", "toggle:enabled"],
  setup(e, { emit: n }) {
    const o = e, s = n, { t } = Z(), i = Te(() => G[o.tag.category || P.GENERAL]), a = Te(() => o.tag.weight !== 1), u = () => {
      s("remove", o.tag.id);
    }, r = () => {
      s("toggle:enabled", o.tag.id);
    }, c = () => {
      const x = Math.min(o.tag.weight + 0.1, 2);
      s("update:weight", o.tag.id, parseFloat(x.toFixed(1)));
    }, f = () => {
      const x = Math.max(o.tag.weight - 0.1, 0.1);
      s("update:weight", o.tag.id, parseFloat(x.toFixed(1)));
    }, p = I(!1), v = I(null), m = I(""), _ = async () => {
      var x, R;
      m.value = o.tag.weight.toString(), p.value = !0, await Re(), (x = v.value) == null || x.focus(), (R = v.value) == null || R.select();
    }, g = () => {
      if (!p.value) return;
      const x = parseFloat(m.value);
      !isNaN(x) && x >= 0 && s("update:weight", o.tag.id, parseFloat(x.toFixed(2))), p.value = !1;
    }, h = (x) => {
      x.key === "Enter" ? g() : x.key === "Escape" && (p.value = !1);
    };
    return (x, R) => (w(), T("div", {
      class: re(["tag-item", { disabled: !x.tag.enabled }]),
      style: J({ "--category-color": i.value }),
      onDblclick: te(_, ["stop"])
    }, [
      R[2] || (R[2] = l("div", { class: "tag-dot" }, null, -1)),
      l("span", {
        class: "tag-text",
        onClick: r
      }, y(x.tag.text), 1),
      a.value && !p.value ? (w(), T("div", Zn, [
        l("button", {
          class: "weight-btn",
          onClick: f,
          title: d(t)("editor.decreaseWeight")
        }, [
          S(d(E), { icon: "mdi:minus" })
        ], 8, eo),
        l("span", to, y(x.tag.weight.toFixed(1)), 1),
        l("button", {
          class: "weight-btn",
          onClick: c,
          title: d(t)("editor.increaseWeight")
        }, [
          S(d(E), { icon: "mdi:plus" })
        ], 8, so)
      ])) : O("", !0),
      p.value ? W((w(), T("input", {
        key: 1,
        ref_key: "weightInput",
        ref: v,
        "onUpdate:modelValue": R[0] || (R[0] = (F) => m.value = F),
        class: "weight-input",
        onBlur: g,
        onKeydown: h,
        onClick: R[1] || (R[1] = te(() => {
        }, ["stop"]))
      }, null, 544)), [
        [Fe, m.value]
      ]) : O("", !0),
      l("button", {
        class: "tag-remove",
        onClick: u,
        title: d(t)("editor.removeTag")
      }, [
        S(d(E), { icon: "mdi:close" })
      ], 8, no)
    ], 38));
  }
}), io = /* @__PURE__ */ Y(oo, [["__scopeId", "data-v-f641b4a8"]]), ao = { class: "visual-tag-area" }, lo = {
  key: 0,
  class: "empty-state"
}, co = {
  key: 1,
  class: "tags-scroller"
}, ro = ["onDragstart", "onDragenter"], uo = /* @__PURE__ */ V({
  __name: "VisualTagArea",
  props: {
    tags: {}
  },
  emits: ["update:tags"],
  setup(e, { emit: n }) {
    const o = e, s = n, t = I([]), i = I(null);
    X(() => o.tags, (m) => {
      i.value === null && (t.value = [...m]);
    }, { immediate: !0 });
    const a = (m) => {
      const _ = t.value.filter((g) => g.id !== m);
      t.value = _, s("update:tags", _);
    }, u = (m, _) => {
      const g = t.value.map(
        (h) => h.id === m ? { ...h, weight: _ } : h
      );
      t.value = g, s("update:tags", g);
    }, r = (m) => {
      const _ = t.value.map(
        (g) => g.id === m ? { ...g, enabled: !g.enabled } : g
      );
      t.value = _, s("update:tags", _);
    }, c = (m, _) => {
      i.value = _, m.dataTransfer && (m.dataTransfer.effectAllowed = "move");
    }, f = (m) => {
      m.preventDefault(), m.dataTransfer && (m.dataTransfer.dropEffect = "move");
    }, p = (m) => {
      if (i.value !== null && i.value !== m) {
        const _ = i.value, g = m, h = t.value[_], x = [...t.value];
        x.splice(_, 1), x.splice(g, 0, h), t.value = x, i.value = g;
      }
    }, v = () => {
      i.value !== null && (s("update:tags", t.value), i.value = null);
    };
    return (m, _) => (w(), T("div", ao, [
      t.value.length === 0 ? (w(), T("div", lo, _[0] || (_[0] = [
        l("p", null, "No tags yet. Start typing in the editor...", -1)
      ]))) : (w(), T("div", co, [
        S(kt, {
          name: "tag-list",
          tag: "div",
          class: "tags-container"
        }, {
          default: fe(() => [
            (w(!0), T(ee, null, ce(t.value, (g, h) => (w(), T("div", {
              key: g.id,
              class: "tag-wrapper",
              draggable: "true",
              onDragstart: (x) => c(x, h),
              onDragover: f,
              onDragenter: (x) => p(h),
              onDragend: v
            }, [
              S(io, {
                tag: g,
                onRemove: a,
                "onUpdate:weight": u,
                "onToggle:enabled": r
              }, null, 8, ["tag"])
            ], 40, ro))), 128))
          ]),
          _: 1
        })
      ]))
    ]));
  }
}), fo = /* @__PURE__ */ Y(uo, [["__scopeId", "data-v-5d3d64b5"]]), po = { class: "toolbar" }, ho = { class: "tag-count" }, go = /* @__PURE__ */ V({
  __name: "OtherFunctions",
  props: {
    tagCount: {}
  },
  emits: ["open-search"],
  setup(e, { emit: n }) {
    const o = n, { t: s } = Z(), t = () => {
      o("open-search");
    };
    return (i, a) => (w(), T("div", po, [
      l("button", {
        class: "toolbar-btn",
        onClick: t
      }, [
        S(d(E), { icon: "mdi:magnify" }),
        l("span", null, y(d(s)("editor.searchBtn")), 1)
      ]),
      a[0] || (a[0] = l("div", { class: "separator" }, null, -1)),
      l("div", ho, [
        S(d(E), { icon: "mdi:tag-multiple" }),
        l("span", null, y(d(s)("editor.tagCount")) + y(i.tagCount || 0), 1)
      ])
    ]));
  }
}), mo = /* @__PURE__ */ Y(go, [["__scopeId", "data-v-22dfc699"]]), vo = { class: "modal-container" }, _o = { class: "modal-header" }, yo = { class: "modal-title" }, bo = ["title"], wo = { class: "search-section" }, xo = { class: "search-box" }, ko = ["placeholder"], To = { class: "category-filters" }, Io = { class: "filter-label" }, So = ["onClick"], Co = { class: "results-section" }, $o = {
  key: 0,
  class: "loading-state"
}, Eo = {
  key: 1,
  class: "empty-state"
}, Ao = {
  key: 2,
  class: "results-list"
}, Ro = ["onClick"], Lo = { class: "tag-info" }, Fo = { class: "tag-name-row" }, Mo = { class: "tag-name" }, Po = ["innerHTML"], Oo = ["innerHTML"], Do = ["innerHTML"], No = { class: "tag-meta" }, jo = { class: "category-label" }, Uo = { class: "post-count" }, Bo = ["title"], Vo = {
  key: 3,
  class: "hint-state"
}, zo = /* @__PURE__ */ V({
  __name: "TagSearchModal",
  props: {
    visible: { type: Boolean }
  },
  emits: ["close", "add-tag"],
  setup(e, { emit: n }) {
    const o = e, { t: s } = Z(), t = n, i = I(""), a = I([]), u = I(!1), r = I([]), c = Te(() => [
      { value: P.GENERAL, label: s("search.categories.general"), color: G[P.GENERAL] },
      { value: P.ARTIST, label: s("search.categories.artist"), color: G[P.ARTIST] },
      { value: P.CHARACTER, label: s("search.categories.character"), color: G[P.CHARACTER] },
      { value: P.COPYRIGHT, label: s("search.categories.copyright"), color: G[P.COPYRIGHT] },
      { value: P.META, label: s("search.categories.meta"), color: G[P.META] }
    ]), f = ($) => {
      const b = r.value.indexOf($);
      b > -1 ? r.value.splice(b, 1) : r.value.push($), i.value.trim() && v();
    }, p = ($) => r.value.includes($), v = async () => {
      const $ = i.value.trim();
      if (!$ || $.length < 2) {
        a.value = [];
        return;
      }
      u.value = !0;
      try {
        const k = await de.getInstance().searchTags($, 50, !0, r.value);
        a.value = k;
      } catch (b) {
        console.error("Search error:", b), a.value = [];
      } finally {
        u.value = !1;
      }
    };
    let m = null;
    const _ = () => {
      m && clearTimeout(m), m = setTimeout(() => {
        v();
      }, 300);
    }, g = ($) => {
      t("add-tag", $.name, $.category);
    }, h = () => {
      t("close");
    };
    X(() => o.visible, ($) => {
      $ || (i.value = "", a.value = [], r.value = []);
    });
    const x = ($) => {
      const b = c.value.find((k) => k.value === $);
      return b ? b.label : s("search.categories.unknown");
    }, R = ($) => G[$] || "#888", F = ($) => ($ == null ? void 0 : $.toLocaleString()) || "0", M = ($, b) => {
      if (!b || !$) return $;
      const k = new RegExp(`(${b.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
      return $.replace(k, '<strong class="match-bold">$1</strong>');
    };
    return ($, b) => (w(), le(Le, { name: "fade" }, {
      default: fe(() => [
        $.visible ? (w(), T("div", {
          key: 0,
          class: "modal-overlay",
          onClick: te(h, ["self"])
        }, [
          l("div", vo, [
            l("div", _o, [
              l("div", yo, [
                S(d(E), {
                  icon: "mdi:database-search",
                  class: "title-icon"
                }),
                l("span", null, y(d(s)("search.title")), 1)
              ]),
              l("button", {
                class: "close-btn",
                onClick: h,
                title: d(s)("common.close")
              }, [
                S(d(E), { icon: "mdi:close" })
              ], 8, bo)
            ]),
            l("div", wo, [
              l("div", xo, [
                S(d(E), {
                  icon: "mdi:magnify",
                  class: "search-icon"
                }),
                W(l("input", {
                  "onUpdate:modelValue": b[0] || (b[0] = (k) => i.value = k),
                  type: "text",
                  placeholder: d(s)("search.placeholder"),
                  class: "search-input",
                  onInput: _,
                  autofocus: ""
                }, null, 40, ko), [
                  [Fe, i.value]
                ]),
                i.value ? (w(), T("button", {
                  key: 0,
                  class: "clear-btn",
                  onClick: b[1] || (b[1] = (k) => {
                    i.value = "", a.value = [];
                  }),
                  title: "Clear"
                }, [
                  S(d(E), { icon: "mdi:close-circle" })
                ])) : O("", !0)
              ]),
              l("div", To, [
                l("span", Io, y(d(s)("search.filterLabel")), 1),
                (w(!0), T(ee, null, ce(c.value, (k) => (w(), T("button", {
                  key: k.value,
                  class: re(["category-chip", { active: p(k.value) }]),
                  style: J({ "--category-color": k.color }),
                  onClick: (U) => f(k.value)
                }, [
                  l("span", {
                    class: "category-dot",
                    style: J({ backgroundColor: k.color })
                  }, null, 4),
                  B(" " + y(k.label), 1)
                ], 14, So))), 128))
              ])
            ]),
            l("div", Co, [
              u.value ? (w(), T("div", $o, [
                S(d(E), {
                  icon: "mdi:loading",
                  class: "spin"
                }),
                l("span", null, y(d(s)("search.loading")), 1)
              ])) : a.value.length === 0 && i.value.trim() ? (w(), T("div", Eo, [
                S(d(E), { icon: "mdi:magnify-close" }),
                l("p", null, y(d(s)("search.noResults")), 1)
              ])) : a.value.length > 0 ? (w(), T("div", Ao, [
                (w(!0), T(ee, null, ce(a.value, (k) => (w(), T("div", {
                  key: k.id,
                  class: "result-item",
                  style: J({ "--cat-color": R(k.category) }),
                  onClick: (U) => g(k)
                }, [
                  l("div", Lo, [
                    l("div", Fo, [
                      b[2] || (b[2] = l("span", { class: "category-indicator" }, null, -1)),
                      l("span", Mo, [
                        k.matched_alias ? (w(), T(ee, { key: 1 }, [
                          l("span", {
                            innerHTML: M(k.name, i.value)
                          }, null, 8, Oo),
                          l("span", {
                            class: "alias-indicator",
                            innerHTML: M(k.matched_alias, i.value)
                          }, null, 8, Do)
                        ], 64)) : (w(), T("span", {
                          key: 0,
                          innerHTML: M(k.name, i.value)
                        }, null, 8, Po))
                      ])
                    ]),
                    l("div", No, [
                      l("span", jo, y(x(k.category)), 1),
                      l("span", Uo, [
                        S(d(E), { icon: "mdi:image-multiple" }),
                        B(" " + y(F(k.post_count)), 1)
                      ])
                    ])
                  ]),
                  l("button", {
                    class: "add-btn",
                    title: d(s)("search.addBtnTitle")
                  }, [
                    S(d(E), { icon: "mdi:plus" })
                  ], 8, Bo)
                ], 12, Ro))), 128))
              ])) : (w(), T("div", Vo, [
                S(d(E), { icon: "mdi:information-outline" }),
                l("p", null, y(d(s)("search.hint")), 1)
              ]))
            ])
          ])
        ])) : O("", !0)
      ]),
      _: 1
    }));
  }
}), Ho = /* @__PURE__ */ Y(zo, [["__scopeId", "data-v-ff7cf1fe"]]);
function pe(e) {
  if (!e.trim()) return [];
  const n = [];
  let o = 0, s = 0, t = "", i = "", a = "";
  for (; s < e.length; ) {
    const u = e[s];
    if (u === "\\" && s + 1 < e.length) {
      const r = e[s + 1];
      if (r === "(" || r === ")") {
        t += r, s += 2;
        continue;
      }
    }
    if (u === "(") {
      t.trim() && (n.push({
        id: `tag-${o++}`,
        text: t.trim(),
        weight: 1,
        enabled: !0,
        category: P.GENERAL
      }), t = "");
      let r = 1, c = s + 1;
      for (; c < e.length && r > 0; ) {
        if (e[c] === "\\" && c + 1 < e.length) {
          c += 2;
          continue;
        }
        e[c] === "(" && r++, e[c] === ")" && r--, c++;
      }
      if (r === 0) {
        const f = e.substring(s + 1, c - 1), p = f.indexOf(":");
        if (p > 0) {
          a = f.substring(0, p).trim(), i = f.substring(p + 1).trim();
          const v = parseFloat(i);
          !isNaN(v) && a && n.push({
            id: `tag-${o++}`,
            text: a,
            weight: v,
            enabled: !0,
            category: P.GENERAL
          });
        } else
          t += e.substring(s, c);
        s = c;
        continue;
      }
    }
    if (u === ",") {
      t.trim() && (n.push({
        id: `tag-${o++}`,
        text: t.trim(),
        weight: 1,
        enabled: !0,
        category: P.GENERAL
      }), t = ""), s++;
      continue;
    }
    t += u, s++;
  }
  return t.trim() && n.push({
    id: `tag-${o++}`,
    text: t.trim(),
    weight: 1,
    enabled: !0,
    category: P.GENERAL
  }), n;
}
function Xe(e) {
  return e.filter((n) => n.enabled).map((n) => n.weight !== 1 ? `(${n.text}:${n.weight.toFixed(1)})` : n.text).join(", ");
}
const Wo = { class: "sp-toolbar" }, Go = ["title"], Qo = ["placeholder"], Yo = { class: "sp-visual-area" }, Ko = { class: "sp-footer" }, qo = /* @__PURE__ */ V({
  __name: "TextEditor",
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue", "cursor-move"],
  setup(e, { expose: n, emit: o }) {
    const s = e, t = o, { t: i } = Z(), a = I(null), u = I(null), r = I(s.modelValue), c = I([]), f = I(60), p = I(!1);
    c.value = pe(r.value);
    const v = I(!1), m = I([]), _ = I(0), g = I({ top: 0, left: 0 }), h = I(""), x = I(0), R = I(!1), F = I(!1);
    X(() => s.modelValue, (C) => {
      C !== r.value && (r.value = C, c.value = pe(C));
    });
    const M = (C) => {
      const A = C.target;
      r.value = A.value, t("update:modelValue", A.value), c.value = pe(A.value), z(A);
    }, $ = (C) => {
      c.value = C;
      const A = Xe(C);
      A !== r.value && (r.value = A, t("update:modelValue", A));
    }, b = async () => {
      try {
        await navigator.clipboard.writeText(r.value), console.log("Copied to clipboard");
      } catch (C) {
        console.error("Failed to copy: ", C);
      }
    }, k = (C) => {
      p.value = !0, document.addEventListener("mousemove", U), document.addEventListener("mouseup", Q), document.body.style.userSelect = "none";
    }, U = (C) => {
      if (!p.value || !u.value) return;
      const A = u.value.getBoundingClientRect();
      let D = (C.clientY - A.top) / A.height * 100;
      D < 20 && (D = 20), D > 80 && (D = 80), f.value = D;
    }, Q = () => {
      p.value = !1, document.removeEventListener("mousemove", U), document.removeEventListener("mouseup", Q), document.body.style.userSelect = "";
    };
    Ae(() => {
      document.removeEventListener("mousemove", U), document.removeEventListener("mouseup", Q);
    });
    const z = async (C) => {
      const A = C.selectionEnd, j = C.value.substring(0, A), D = /([a-zA-Z0-9_\u4e00-\u9fa5]{2,})$/.exec(j);
      if (D) {
        const N = D[1];
        h.value = N, x.value = D.index;
        const H = Bn(C, A);
        g.value = {
          top: H.top + H.height + 5,
          // 5px padding
          left: H.left
        }, R.value = !0, v.value = !0;
        try {
          console.log(`[Autocomplete] Searching for: "${N}"`);
          const ne = await de.getInstance().searchTags(N, 20, L.useAliasesInAutocomplete);
          m.value = ne, _.value = 0;
        } catch (K) {
          console.error("Autocomplete search error:", K);
        } finally {
          R.value = !1;
        }
      } else
        v.value = !1;
    }, ft = (C) => {
      if (v.value && m.value.length > 0) {
        if (C.key === "ArrowUp") {
          C.preventDefault(), _.value = (_.value - 1 + m.value.length) % m.value.length;
          return;
        }
        if (C.key === "ArrowDown") {
          C.preventDefault(), _.value = (_.value + 1) % m.value.length;
          return;
        }
        if (C.key === "Tab" || C.key === "Enter") {
          C.preventDefault(), De(m.value[_.value]);
          return;
        }
        if (C.key === "Escape") {
          C.preventDefault(), v.value = !1;
          return;
        }
      }
    }, De = (C) => {
      if (!a.value) return;
      const A = a.value, j = A.selectionEnd, D = r.value;
      let N = C.name;
      L.convertUnderscoreToSpace && (N = N.replace(/_/g, " ")), L.escapeBrackets && (N = N.replace(/\(/g, "\\(").replace(/\)/g, "\\)"));
      const H = D.substring(0, x.value), K = D.substring(j);
      let ne = K;
      !K.trim().startsWith(",") && !K.trim().startsWith(")") && (ne = ", " + K);
      const be = H + N + ne;
      r.value = be, t("update:modelValue", be), c.value = pe(be), v.value = !1, Re(() => {
        const Ne = H.length + N.length + (ne.startsWith(", ") ? 2 : 0);
        A.setSelectionRange(Ne, Ne), A.focus();
      });
    }, pt = () => {
      setTimeout(() => {
        v.value = !1;
      }, 200);
    }, ht = () => {
      F.value = !0;
    }, gt = () => {
      F.value = !1;
    }, mt = (C, A) => {
      let j = C;
      L.convertUnderscoreToSpace && (j = j.replace(/_/g, " ")), L.escapeBrackets && (j = j.replace(/\(/g, "\\(").replace(/\)/g, "\\)"));
      const D = {
        id: `tag-${Date.now()}-${Math.random()}`,
        text: j,
        weight: 1,
        enabled: !0,
        category: A
      }, N = [...c.value, D];
      c.value = N;
      const H = Xe(N);
      r.value = H, t("update:modelValue", H);
    };
    return n({ focus: () => {
      var C;
      (C = a.value) == null || C.focus();
    } }), (C, A) => (w(), T("div", {
      class: "sp-editor-container",
      ref_key: "containerRef",
      ref: u
    }, [
      l("div", Wo, [
        l("button", {
          class: "sp-btn",
          onClick: b,
          title: d(i)("editor.copyTitle")
        }, [
          A[1] || (A[1] = l("span", { class: "icon" }, "📋", -1)),
          B(" " + y(d(i)("editor.copy")), 1)
        ], 8, Go)
      ]),
      l("div", {
        class: "sp-editor-area",
        style: J({ height: `calc(${f.value}% - 40px)` })
      }, [
        W(l("textarea", {
          ref_key: "textareaRef",
          ref: a,
          class: "sp-textarea",
          "onUpdate:modelValue": A[0] || (A[0] = (j) => r.value = j),
          onInput: M,
          onKeydown: ft,
          onBlur: pt,
          placeholder: d(i)("editor.placeholder"),
          spellcheck: "false"
        }, null, 40, Qo), [
          [Fe, r.value]
        ]),
        v.value ? (w(), T("div", {
          key: 0,
          class: "autocomplete-wrapper",
          style: J({ top: g.value.top + "px", left: g.value.left + "px" })
        }, [
          S(Xn, {
            items: m.value,
            "selected-index": _.value,
            loading: R.value,
            onSelect: De
          }, null, 8, ["items", "selected-index", "loading"])
        ], 4)) : O("", !0)
      ], 4),
      l("div", {
        class: "sp-splitter",
        onMousedown: k
      }, A[2] || (A[2] = [
        l("div", { class: "sp-splitter-handle" }, null, -1)
      ]), 32),
      l("div", Yo, [
        S(fo, {
          tags: c.value,
          "onUpdate:tags": $
        }, null, 8, ["tags"])
      ]),
      l("div", Ko, [
        S(mo, {
          "tag-count": c.value.length,
          onOpenSearch: ht
        }, null, 8, ["tag-count"])
      ]),
      S(Ho, {
        visible: F.value,
        onClose: gt,
        onAddTag: mt
      }, null, 8, ["visible"])
    ], 512));
  }
}), Jo = /* @__PURE__ */ Y(qo, [["__scopeId", "data-v-ac9d3498"]]), Xo = { style: { width: "100%", height: "100%" } }, ni = /* @__PURE__ */ V({
  __name: "App",
  props: {
    initialPrompt: {}
  },
  emits: ["save", "close"],
  setup(e, { emit: n }) {
    const o = e, s = n, t = I(!0), i = I(o.initialPrompt), a = I("Initializing...");
    Ee(async () => {
      try {
        await de.getInstance().init(), a.value = "Ready";
      } catch (c) {
        console.error("DB Error:", c), a.value = `Error: ${c}`;
      }
    });
    const u = () => {
      t.value = !1, s("close");
    }, r = () => {
      s("save", i.value), t.value = !1;
    };
    return (c, f) => (w(), le(Un, {
      visible: t.value,
      onClose: u,
      onSave: r
    }, {
      content: fe(() => [
        l("div", Xo, [
          S(Jo, {
            modelValue: i.value,
            "onUpdate:modelValue": f[0] || (f[0] = (p) => i.value = p)
          }, null, 8, ["modelValue"])
        ])
      ]),
      _: 1
    }, 8, ["visible"]));
  }
});
export {
  ni as default
};
