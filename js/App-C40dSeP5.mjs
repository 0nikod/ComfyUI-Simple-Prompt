var Nt = Object.defineProperty;
var Ut = (e, n, s) => n in e ? Nt(e, n, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[n] = s;
var se = (e, n, s) => Ut(e, typeof n != "symbol" ? n + "" : n, s);
import { defineComponent as oe, ref as E, shallowRef as Vt, onMounted as xe, watch as ae, onUnmounted as Le, h as et, nextTick as Pe, reactive as gt, createBlock as re, openBlock as k, Transition as De, withCtx as we, createElementBlock as x, createCommentVNode as B, withModifiers as de, createElementVNode as o, createVNode as A, unref as l, toDisplayString as v, withDirectives as G, createTextVNode as J, vModelText as ee, vModelSelect as qe, Fragment as Z, renderList as te, normalizeStyle as le, computed as _e, withKeys as Bt, normalizeClass as fe, vModelCheckbox as ye, renderSlot as zt, TransitionGroup as Ht } from "./vue.runtime.esm-bundler-C8DxJOnH.mjs";
import { u as ue } from "./vue-i18n-DxZpRF9a.mjs";
const pt = /^[a-z0-9]+(-[a-z0-9]+)*$/, Re = (e, n, s, a = "") => {
  const t = e.split(":");
  if (e.slice(0, 1) === "@") {
    if (t.length < 2 || t.length > 3)
      return null;
    a = t.shift().slice(1);
  }
  if (t.length > 3 || !t.length)
    return null;
  if (t.length > 1) {
    const d = t.pop(), c = t.pop(), u = {
      // Allow provider without '@': "provider:prefix:name"
      provider: t.length > 0 ? t[0] : a,
      prefix: c,
      name: d
    };
    return n && !Se(u) ? null : u;
  }
  const i = t[0], r = i.split("-");
  if (r.length > 1) {
    const d = {
      provider: a,
      prefix: r.shift(),
      name: r.join("-")
    };
    return n && !Se(d) ? null : d;
  }
  if (s && a === "") {
    const d = {
      provider: a,
      prefix: "",
      name: i
    };
    return n && !Se(d, s) ? null : d;
  }
  return null;
}, Se = (e, n) => e ? !!// Check prefix: cannot be empty, unless allowSimpleName is enabled
// Check name: cannot be empty
((n && e.prefix === "" || e.prefix) && e.name) : !1, ht = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
), Me = Object.freeze({
  rotate: 0,
  vFlip: !1,
  hFlip: !1
}), Oe = Object.freeze({
  ...ht,
  ...Me
}), Be = Object.freeze({
  ...Oe,
  body: "",
  hidden: !1
});
function Wt(e, n) {
  const s = {};
  !e.hFlip != !n.hFlip && (s.hFlip = !0), !e.vFlip != !n.vFlip && (s.vFlip = !0);
  const a = ((e.rotate || 0) + (n.rotate || 0)) % 4;
  return a && (s.rotate = a), s;
}
function tt(e, n) {
  const s = Wt(e, n);
  for (const a in Be)
    a in Me ? a in e && !(a in s) && (s[a] = Me[a]) : a in n ? s[a] = n[a] : a in e && (s[a] = e[a]);
  return s;
}
function Gt(e, n) {
  const s = e.icons, a = e.aliases || /* @__PURE__ */ Object.create(null), t = /* @__PURE__ */ Object.create(null);
  function i(r) {
    if (s[r])
      return t[r] = [];
    if (!(r in t)) {
      t[r] = null;
      const d = a[r] && a[r].parent, c = d && i(d);
      c && (t[r] = [d].concat(c));
    }
    return t[r];
  }
  return Object.keys(s).concat(Object.keys(a)).forEach(i), t;
}
function qt(e, n, s) {
  const a = e.icons, t = e.aliases || /* @__PURE__ */ Object.create(null);
  let i = {};
  function r(d) {
    i = tt(
      a[d] || t[d],
      i
    );
  }
  return r(n), s.forEach(r), tt(e, i);
}
function mt(e, n) {
  const s = [];
  if (typeof e != "object" || typeof e.icons != "object")
    return s;
  e.not_found instanceof Array && e.not_found.forEach((t) => {
    n(t, null), s.push(t);
  });
  const a = Gt(e);
  for (const t in a) {
    const i = a[t];
    i && (n(t, qt(e, t, i)), s.push(t));
  }
  return s;
}
const Qt = {
  provider: "",
  aliases: {},
  not_found: {},
  ...ht
};
function je(e, n) {
  for (const s in n)
    if (s in e && typeof e[s] != typeof n[s])
      return !1;
  return !0;
}
function vt(e) {
  if (typeof e != "object" || e === null)
    return null;
  const n = e;
  if (typeof n.prefix != "string" || !e.icons || typeof e.icons != "object" || !je(e, Qt))
    return null;
  const s = n.icons;
  for (const t in s) {
    const i = s[t];
    if (
      // Name cannot be empty
      !t || // Must have body
      typeof i.body != "string" || // Check other props
      !je(
        i,
        Be
      )
    )
      return null;
  }
  const a = n.aliases || /* @__PURE__ */ Object.create(null);
  for (const t in a) {
    const i = a[t], r = i.parent;
    if (
      // Name cannot be empty
      !t || // Parent must be set and point to existing icon
      typeof r != "string" || !s[r] && !a[r] || // Check other props
      !je(
        i,
        Be
      )
    )
      return null;
  }
  return n;
}
const st = /* @__PURE__ */ Object.create(null);
function Kt(e, n) {
  return {
    provider: e,
    prefix: n,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function be(e, n) {
  const s = st[e] || (st[e] = /* @__PURE__ */ Object.create(null));
  return s[n] || (s[n] = Kt(e, n));
}
function yt(e, n) {
  return vt(n) ? mt(n, (s, a) => {
    a ? e.icons[s] = a : e.missing.add(s);
  }) : [];
}
function Jt(e, n, s) {
  try {
    if (typeof s.body == "string")
      return e.icons[n] = { ...s }, !0;
  } catch {
  }
  return !1;
}
let $e = !1;
function _t(e) {
  return typeof e == "boolean" && ($e = e), $e;
}
function Yt(e) {
  const n = typeof e == "string" ? Re(e, !0, $e) : e;
  if (n) {
    const s = be(n.provider, n.prefix), a = n.name;
    return s.icons[a] || (s.missing.has(a) ? null : void 0);
  }
}
function Xt(e, n) {
  const s = Re(e, !0, $e);
  if (!s)
    return !1;
  const a = be(s.provider, s.prefix);
  return n ? Jt(a, s.name, n) : (a.missing.add(s.name), !0);
}
function Zt(e, n) {
  if (typeof e != "object")
    return !1;
  if (typeof n != "string" && (n = e.provider || ""), $e && !n && !e.prefix) {
    let t = !1;
    return vt(e) && (e.prefix = "", mt(e, (i, r) => {
      Xt(i, r) && (t = !0);
    })), t;
  }
  const s = e.prefix;
  if (!Se({
    prefix: s,
    name: "a"
  }))
    return !1;
  const a = be(n, s);
  return !!yt(a, e);
}
const bt = Object.freeze({
  width: null,
  height: null
}), wt = Object.freeze({
  // Dimensions
  ...bt,
  // Transformations
  ...Me
}), es = /(-?[0-9.]*[0-9]+[0-9.]*)/g, ts = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function nt(e, n, s) {
  if (n === 1)
    return e;
  if (s = s || 100, typeof e == "number")
    return Math.ceil(e * n * s) / s;
  if (typeof e != "string")
    return e;
  const a = e.split(es);
  if (a === null || !a.length)
    return e;
  const t = [];
  let i = a.shift(), r = ts.test(i);
  for (; ; ) {
    if (r) {
      const d = parseFloat(i);
      isNaN(d) ? t.push(i) : t.push(Math.ceil(d * n * s) / s);
    } else
      t.push(i);
    if (i = a.shift(), i === void 0)
      return t.join("");
    r = !r;
  }
}
function ss(e, n = "defs") {
  let s = "";
  const a = e.indexOf("<" + n);
  for (; a >= 0; ) {
    const t = e.indexOf(">", a), i = e.indexOf("</" + n);
    if (t === -1 || i === -1)
      break;
    const r = e.indexOf(">", i);
    if (r === -1)
      break;
    s += e.slice(t + 1, i).trim(), e = e.slice(0, a).trim() + e.slice(r + 1);
  }
  return {
    defs: s,
    content: e
  };
}
function ns(e, n) {
  return e ? "<defs>" + e + "</defs>" + n : n;
}
function os(e, n, s) {
  const a = ss(e);
  return ns(a.defs, n + a.content + s);
}
const as = (e) => e === "unset" || e === "undefined" || e === "none";
function is(e, n) {
  const s = {
    ...Oe,
    ...e
  }, a = {
    ...wt,
    ...n
  }, t = {
    left: s.left,
    top: s.top,
    width: s.width,
    height: s.height
  };
  let i = s.body;
  [s, a].forEach((P) => {
    const T = [], D = P.hFlip, R = P.vFlip;
    let U = P.rotate;
    D ? R ? U += 2 : (T.push(
      "translate(" + (t.width + t.left).toString() + " " + (0 - t.top).toString() + ")"
    ), T.push("scale(-1 1)"), t.top = t.left = 0) : R && (T.push(
      "translate(" + (0 - t.left).toString() + " " + (t.height + t.top).toString() + ")"
    ), T.push("scale(1 -1)"), t.top = t.left = 0);
    let $;
    switch (U < 0 && (U -= Math.floor(U / 4) * 4), U = U % 4, U) {
      case 1:
        $ = t.height / 2 + t.top, T.unshift(
          "rotate(90 " + $.toString() + " " + $.toString() + ")"
        );
        break;
      case 2:
        T.unshift(
          "rotate(180 " + (t.width / 2 + t.left).toString() + " " + (t.height / 2 + t.top).toString() + ")"
        );
        break;
      case 3:
        $ = t.width / 2 + t.left, T.unshift(
          "rotate(-90 " + $.toString() + " " + $.toString() + ")"
        );
        break;
    }
    U % 2 === 1 && (t.left !== t.top && ($ = t.left, t.left = t.top, t.top = $), t.width !== t.height && ($ = t.width, t.width = t.height, t.height = $)), T.length && (i = os(
      i,
      '<g transform="' + T.join(" ") + '">',
      "</g>"
    ));
  });
  const r = a.width, d = a.height, c = t.width, u = t.height;
  let f, h;
  r === null ? (h = d === null ? "1em" : d === "auto" ? u : d, f = nt(h, c / u)) : (f = r === "auto" ? c : r, h = d === null ? nt(f, u / c) : d === "auto" ? u : d);
  const m = {}, b = (P, T) => {
    as(T) || (m[P] = T.toString());
  };
  b("width", f), b("height", h);
  const g = [t.left, t.top, c, u];
  return m.viewBox = g.join(" "), {
    attributes: m,
    viewBox: g,
    body: i
  };
}
const ls = /\sid="(\S+)"/g, rs = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let cs = 0;
function us(e, n = rs) {
  const s = [];
  let a;
  for (; a = ls.exec(e); )
    s.push(a[1]);
  if (!s.length)
    return e;
  const t = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return s.forEach((i) => {
    const r = typeof n == "function" ? n(i) : n + (cs++).toString(), d = i.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    e = e.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + d + ')([")]|\\.[a-z])', "g"),
      "$1" + r + t + "$3"
    );
  }), e = e.replace(new RegExp(t, "g"), ""), e;
}
const ze = /* @__PURE__ */ Object.create(null);
function ds(e, n) {
  ze[e] = n;
}
function He(e) {
  return ze[e] || ze[""];
}
function Qe(e) {
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
const Ke = /* @__PURE__ */ Object.create(null), ke = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
], Ee = [];
for (; ke.length > 0; )
  ke.length === 1 || Math.random() > 0.5 ? Ee.push(ke.shift()) : Ee.push(ke.pop());
Ke[""] = Qe({
  resources: ["https://api.iconify.design"].concat(Ee)
});
function fs(e, n) {
  const s = Qe(n);
  return s === null ? !1 : (Ke[e] = s, !0);
}
function Je(e) {
  return Ke[e];
}
const gs = () => {
  let e;
  try {
    if (e = fetch, typeof e == "function")
      return e;
  } catch {
  }
};
let ot = gs();
function ps(e, n) {
  const s = Je(e);
  if (!s)
    return 0;
  let a;
  if (!s.maxURL)
    a = 0;
  else {
    let t = 0;
    s.resources.forEach((r) => {
      t = Math.max(t, r.length);
    });
    const i = n + ".json?icons=";
    a = s.maxURL - t - s.path.length - i.length;
  }
  return a;
}
function hs(e) {
  return e === 404;
}
const ms = (e, n, s) => {
  const a = [], t = ps(e, n), i = "icons";
  let r = {
    type: i,
    provider: e,
    prefix: n,
    icons: []
  }, d = 0;
  return s.forEach((c, u) => {
    d += c.length + 1, d >= t && u > 0 && (a.push(r), r = {
      type: i,
      provider: e,
      prefix: n,
      icons: []
    }, d = c.length), r.icons.push(c);
  }), a.push(r), a;
};
function vs(e) {
  if (typeof e == "string") {
    const n = Je(e);
    if (n)
      return n.path;
  }
  return "/";
}
const ys = (e, n, s) => {
  if (!ot) {
    s("abort", 424);
    return;
  }
  let a = vs(n.provider);
  switch (n.type) {
    case "icons": {
      const i = n.prefix, d = n.icons.join(","), c = new URLSearchParams({
        icons: d
      });
      a += i + ".json?" + c.toString();
      break;
    }
    case "custom": {
      const i = n.uri;
      a += i.slice(0, 1) === "/" ? i.slice(1) : i;
      break;
    }
    default:
      s("abort", 400);
      return;
  }
  let t = 503;
  ot(e + a).then((i) => {
    const r = i.status;
    if (r !== 200) {
      setTimeout(() => {
        s(hs(r) ? "abort" : "next", r);
      });
      return;
    }
    return t = 501, i.json();
  }).then((i) => {
    if (typeof i != "object" || i === null) {
      setTimeout(() => {
        i === 404 ? s("abort", i) : s("next", t);
      });
      return;
    }
    setTimeout(() => {
      s("success", i);
    });
  }).catch(() => {
    s("next", t);
  });
}, _s = {
  prepare: ms,
  send: ys
};
function bs(e) {
  const n = {
    loaded: [],
    missing: [],
    pending: []
  }, s = /* @__PURE__ */ Object.create(null);
  e.sort((t, i) => t.provider !== i.provider ? t.provider.localeCompare(i.provider) : t.prefix !== i.prefix ? t.prefix.localeCompare(i.prefix) : t.name.localeCompare(i.name));
  let a = {
    provider: "",
    prefix: "",
    name: ""
  };
  return e.forEach((t) => {
    if (a.name === t.name && a.prefix === t.prefix && a.provider === t.provider)
      return;
    a = t;
    const i = t.provider, r = t.prefix, d = t.name, c = s[i] || (s[i] = /* @__PURE__ */ Object.create(null)), u = c[r] || (c[r] = be(i, r));
    let f;
    d in u.icons ? f = n.loaded : r === "" || u.missing.has(d) ? f = n.missing : f = n.pending;
    const h = {
      provider: i,
      prefix: r,
      name: d
    };
    f.push(h);
  }), n;
}
function kt(e, n) {
  e.forEach((s) => {
    const a = s.loaderCallbacks;
    a && (s.loaderCallbacks = a.filter((t) => t.id !== n));
  });
}
function ws(e) {
  e.pendingCallbacksFlag || (e.pendingCallbacksFlag = !0, setTimeout(() => {
    e.pendingCallbacksFlag = !1;
    const n = e.loaderCallbacks ? e.loaderCallbacks.slice(0) : [];
    if (!n.length)
      return;
    let s = !1;
    const a = e.provider, t = e.prefix;
    n.forEach((i) => {
      const r = i.icons, d = r.pending.length;
      r.pending = r.pending.filter((c) => {
        if (c.prefix !== t)
          return !0;
        const u = c.name;
        if (e.icons[u])
          r.loaded.push({
            provider: a,
            prefix: t,
            name: u
          });
        else if (e.missing.has(u))
          r.missing.push({
            provider: a,
            prefix: t,
            name: u
          });
        else
          return s = !0, !0;
        return !1;
      }), r.pending.length !== d && (s || kt([e], i.id), i.callback(
        r.loaded.slice(0),
        r.missing.slice(0),
        r.pending.slice(0),
        i.abort
      ));
    });
  }));
}
let ks = 0;
function Cs(e, n, s) {
  const a = ks++, t = kt.bind(null, s, a);
  if (!n.pending.length)
    return t;
  const i = {
    id: a,
    icons: n,
    callback: e,
    abort: t
  };
  return s.forEach((r) => {
    (r.loaderCallbacks || (r.loaderCallbacks = [])).push(i);
  }), t;
}
function Ts(e, n = !0, s = !1) {
  const a = [];
  return e.forEach((t) => {
    const i = typeof t == "string" ? Re(t, n, s) : t;
    i && a.push(i);
  }), a;
}
var $s = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function xs(e, n, s, a) {
  const t = e.resources.length, i = e.random ? Math.floor(Math.random() * t) : e.index;
  let r;
  if (e.random) {
    let w = e.resources.slice(0);
    for (r = []; w.length > 1; ) {
      const p = Math.floor(Math.random() * w.length);
      r.push(w[p]), w = w.slice(0, p).concat(w.slice(p + 1));
    }
    r = r.concat(w);
  } else
    r = e.resources.slice(i).concat(e.resources.slice(0, i));
  const d = Date.now();
  let c = "pending", u = 0, f, h = null, m = [], b = [];
  typeof a == "function" && b.push(a);
  function g() {
    h && (clearTimeout(h), h = null);
  }
  function P() {
    c === "pending" && (c = "aborted"), g(), m.forEach((w) => {
      w.status === "pending" && (w.status = "aborted");
    }), m = [];
  }
  function T(w, p) {
    p && (b = []), typeof w == "function" && b.push(w);
  }
  function D() {
    return {
      startTime: d,
      payload: n,
      status: c,
      queriesSent: u,
      queriesPending: m.length,
      subscribe: T,
      abort: P
    };
  }
  function R() {
    c = "failed", b.forEach((w) => {
      w(void 0, f);
    });
  }
  function U() {
    m.forEach((w) => {
      w.status === "pending" && (w.status = "aborted");
    }), m = [];
  }
  function $(w, p, C) {
    const y = p !== "success";
    switch (m = m.filter((_) => _ !== w), c) {
      case "pending":
        break;
      case "failed":
        if (y || !e.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (p === "abort") {
      f = C, R();
      return;
    }
    if (y) {
      f = C, m.length || (r.length ? O() : R());
      return;
    }
    if (g(), U(), !e.random) {
      const _ = e.resources.indexOf(w.resource);
      _ !== -1 && _ !== e.index && (e.index = _);
    }
    c = "completed", b.forEach((_) => {
      _(C);
    });
  }
  function O() {
    if (c !== "pending")
      return;
    g();
    const w = r.shift();
    if (w === void 0) {
      if (m.length) {
        h = setTimeout(() => {
          g(), c === "pending" && (U(), R());
        }, e.timeout);
        return;
      }
      R();
      return;
    }
    const p = {
      status: "pending",
      resource: w,
      callback: (C, y) => {
        $(p, C, y);
      }
    };
    m.push(p), u++, h = setTimeout(O, e.rotate), s(w, n, p.callback);
  }
  return setTimeout(O), D;
}
function Ct(e) {
  const n = {
    ...$s,
    ...e
  };
  let s = [];
  function a() {
    s = s.filter((d) => d().status === "pending");
  }
  function t(d, c, u) {
    const f = xs(
      n,
      d,
      c,
      (h, m) => {
        a(), u && u(h, m);
      }
    );
    return s.push(f), f;
  }
  function i(d) {
    return s.find((c) => d(c)) || null;
  }
  return {
    query: t,
    find: i,
    setIndex: (d) => {
      n.index = d;
    },
    getIndex: () => n.index,
    cleanup: a
  };
}
function at() {
}
const Ne = /* @__PURE__ */ Object.create(null);
function Is(e) {
  if (!Ne[e]) {
    const n = Je(e);
    if (!n)
      return;
    const s = Ct(n), a = {
      config: n,
      redundancy: s
    };
    Ne[e] = a;
  }
  return Ne[e];
}
function Ss(e, n, s) {
  let a, t;
  if (typeof e == "string") {
    const i = He(e);
    if (!i)
      return s(void 0, 424), at;
    t = i.send;
    const r = Is(e);
    r && (a = r.redundancy);
  } else {
    const i = Qe(e);
    if (i) {
      a = Ct(i);
      const r = e.resources ? e.resources[0] : "", d = He(r);
      d && (t = d.send);
    }
  }
  return !a || !t ? (s(void 0, 424), at) : a.query(n, t, s)().abort;
}
function it() {
}
function Es(e) {
  e.iconsLoaderFlag || (e.iconsLoaderFlag = !0, setTimeout(() => {
    e.iconsLoaderFlag = !1, ws(e);
  }));
}
function As(e) {
  const n = [], s = [];
  return e.forEach((a) => {
    (a.match(pt) ? n : s).push(a);
  }), {
    valid: n,
    invalid: s
  };
}
function Ce(e, n, s) {
  function a() {
    const t = e.pendingIcons;
    n.forEach((i) => {
      t && t.delete(i), e.icons[i] || e.missing.add(i);
    });
  }
  if (s && typeof s == "object")
    try {
      if (!yt(e, s).length) {
        a();
        return;
      }
    } catch (t) {
      console.error(t);
    }
  a(), Es(e);
}
function lt(e, n) {
  e instanceof Promise ? e.then((s) => {
    n(s);
  }).catch(() => {
    n(null);
  }) : n(e);
}
function Ps(e, n) {
  e.iconsToLoad ? e.iconsToLoad = e.iconsToLoad.concat(n).sort() : e.iconsToLoad = n, e.iconsQueueFlag || (e.iconsQueueFlag = !0, setTimeout(() => {
    e.iconsQueueFlag = !1;
    const { provider: s, prefix: a } = e, t = e.iconsToLoad;
    if (delete e.iconsToLoad, !t || !t.length)
      return;
    const i = e.loadIcon;
    if (e.loadIcons && (t.length > 1 || !i)) {
      lt(
        e.loadIcons(t, a, s),
        (f) => {
          Ce(e, t, f);
        }
      );
      return;
    }
    if (i) {
      t.forEach((f) => {
        const h = i(f, a, s);
        lt(h, (m) => {
          const b = m ? {
            prefix: a,
            icons: {
              [f]: m
            }
          } : null;
          Ce(e, [f], b);
        });
      });
      return;
    }
    const { valid: r, invalid: d } = As(t);
    if (d.length && Ce(e, d, null), !r.length)
      return;
    const c = a.match(pt) ? He(s) : null;
    if (!c) {
      Ce(e, r, null);
      return;
    }
    c.prepare(s, a, r).forEach((f) => {
      Ss(s, f, (h) => {
        Ce(e, f.icons, h);
      });
    });
  }));
}
const Ms = (e, n) => {
  const s = Ts(e, !0, _t()), a = bs(s);
  if (!a.pending.length) {
    let c = !0;
    return n && setTimeout(() => {
      c && n(
        a.loaded,
        a.missing,
        a.pending,
        it
      );
    }), () => {
      c = !1;
    };
  }
  const t = /* @__PURE__ */ Object.create(null), i = [];
  let r, d;
  return a.pending.forEach((c) => {
    const { provider: u, prefix: f } = c;
    if (f === d && u === r)
      return;
    r = u, d = f, i.push(be(u, f));
    const h = t[u] || (t[u] = /* @__PURE__ */ Object.create(null));
    h[f] || (h[f] = []);
  }), a.pending.forEach((c) => {
    const { provider: u, prefix: f, name: h } = c, m = be(u, f), b = m.pendingIcons || (m.pendingIcons = /* @__PURE__ */ new Set());
    b.has(h) || (b.add(h), t[u][f].push(h));
  }), i.forEach((c) => {
    const u = t[c.provider][c.prefix];
    u.length && Ps(c, u);
  }), n ? Cs(n, a, i) : it;
};
function Ls(e, n) {
  const s = {
    ...e
  };
  for (const a in n) {
    const t = n[a], i = typeof t;
    a in bt ? (t === null || t && (i === "string" || i === "number")) && (s[a] = t) : i === typeof s[a] && (s[a] = a === "rotate" ? t % 4 : t);
  }
  return s;
}
const Ds = /[\s,]+/;
function Rs(e, n) {
  n.split(Ds).forEach((s) => {
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
function Os(e, n = 0) {
  const s = e.replace(/^-?[0-9.]*/, "");
  function a(t) {
    for (; t < 0; )
      t += 4;
    return t % 4;
  }
  if (s === "") {
    const t = parseInt(e);
    return isNaN(t) ? 0 : a(t);
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
      let i = parseFloat(e.slice(0, e.length - s.length));
      return isNaN(i) ? 0 : (i = i / t, i % 1 === 0 ? a(i) : 0);
    }
  }
  return n;
}
function Fs(e, n) {
  let s = e.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const a in n)
    s += " " + a + '="' + n[a] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + s + ">" + e + "</svg>";
}
function js(e) {
  return e.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function Ns(e) {
  return "data:image/svg+xml," + js(e);
}
function Us(e) {
  return 'url("' + Ns(e) + '")';
}
const rt = {
  ...wt,
  inline: !1
}, Vs = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": !0,
  role: "img"
}, Bs = {
  display: "inline-block"
}, We = {
  backgroundColor: "currentColor"
}, Tt = {
  backgroundColor: "transparent"
}, ct = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
}, ut = {
  webkitMask: We,
  mask: We,
  background: Tt
};
for (const e in ut) {
  const n = ut[e];
  for (const s in ct)
    n[e + s] = ct[s];
}
const Ae = {};
["horizontal", "vertical"].forEach((e) => {
  const n = e.slice(0, 1) + "Flip";
  Ae[e + "-flip"] = n, Ae[e.slice(0, 1) + "-flip"] = n, Ae[e + "Flip"] = n;
});
function dt(e) {
  return e + (e.match(/^[-0-9.]+$/) ? "px" : "");
}
const ft = (e, n) => {
  const s = Ls(rt, n), a = { ...Vs }, t = n.mode || "svg", i = {}, r = n.style, d = typeof r == "object" && !(r instanceof Array) ? r : {};
  for (let P in n) {
    const T = n[P];
    if (T !== void 0)
      switch (P) {
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
          s[P] = T === !0 || T === "true" || T === 1;
          break;
        // Flip as string: 'horizontal,vertical'
        case "flip":
          typeof T == "string" && Rs(s, T);
          break;
        // Color: override style
        case "color":
          i.color = T;
          break;
        // Rotation as string
        case "rotate":
          typeof T == "string" ? s[P] = Os(T) : typeof T == "number" && (s[P] = T);
          break;
        // Remove aria-hidden
        case "ariaHidden":
        case "aria-hidden":
          T !== !0 && T !== "true" && delete a["aria-hidden"];
          break;
        default: {
          const D = Ae[P];
          D ? (T === !0 || T === "true" || T === 1) && (s[D] = !0) : rt[P] === void 0 && (a[P] = T);
        }
      }
  }
  const c = is(e, s), u = c.attributes;
  if (s.inline && (i.verticalAlign = "-0.125em"), t === "svg") {
    a.style = {
      ...i,
      ...d
    }, Object.assign(a, u);
    let P = 0, T = n.id;
    return typeof T == "string" && (T = T.replace(/-/g, "_")), a.innerHTML = us(c.body, T ? () => T + "ID" + P++ : "iconifyVue"), et("svg", a);
  }
  const { body: f, width: h, height: m } = e, b = t === "mask" || (t === "bg" ? !1 : f.indexOf("currentColor") !== -1), g = Fs(f, {
    ...u,
    width: h + "",
    height: m + ""
  });
  return a.style = {
    ...i,
    "--svg": Us(g),
    width: dt(u.width),
    height: dt(u.height),
    ...Bs,
    ...b ? We : Tt,
    ...d
  }, et("span", a);
};
_t(!0);
ds("", _s);
if (typeof document < "u" && typeof window < "u") {
  const e = window;
  if (e.IconifyPreload !== void 0) {
    const n = e.IconifyPreload, s = "Invalid IconifyPreload syntax.";
    typeof n == "object" && n !== null && (n instanceof Array ? n : [n]).forEach((a) => {
      try {
        // Check if item is an object and not null/array
        (typeof a != "object" || a === null || a instanceof Array || // Check for 'icons' and 'prefix'
        typeof a.icons != "object" || typeof a.prefix != "string" || // Add icon set
        !Zt(a)) && console.error(s);
      } catch {
        console.error(s);
      }
    });
  }
  if (e.IconifyProviders !== void 0) {
    const n = e.IconifyProviders;
    if (typeof n == "object" && n !== null)
      for (let s in n) {
        const a = "IconifyProviders[" + s + "] is invalid.";
        try {
          const t = n[s];
          if (typeof t != "object" || !t || t.resources === void 0)
            continue;
          fs(s, t) || console.error(a);
        } catch {
          console.error(a);
        }
      }
  }
}
const zs = {
  ...Oe,
  body: ""
}, M = oe((e, { emit: n }) => {
  const s = E(null);
  function a() {
    var u, f;
    s.value && ((f = (u = s.value).abort) == null || f.call(u), s.value = null);
  }
  const t = E(!!e.ssr), i = E(""), r = Vt(null);
  function d() {
    const u = e.icon;
    if (typeof u == "object" && u !== null && typeof u.body == "string")
      return i.value = "", {
        data: u
      };
    let f;
    if (typeof u != "string" || (f = Re(u, !1, !0)) === null)
      return null;
    let h = Yt(f);
    if (!h) {
      const g = s.value;
      return (!g || g.name !== u) && (h === null ? s.value = {
        name: u
      } : s.value = {
        name: u,
        abort: Ms([f], c)
      }), null;
    }
    a(), i.value !== u && (i.value = u, Pe(() => {
      n("load", u);
    }));
    const m = e.customise;
    if (m) {
      h = Object.assign({}, h);
      const g = m(h.body, f.name, f.prefix, f.provider);
      typeof g == "string" && (h.body = g);
    }
    const b = ["iconify"];
    return f.prefix !== "" && b.push("iconify--" + f.prefix), f.provider !== "" && b.push("iconify--" + f.provider), { data: h, classes: b };
  }
  function c() {
    var f;
    const u = d();
    u ? u.data !== ((f = r.value) == null ? void 0 : f.data) && (r.value = u) : r.value = null;
  }
  return t.value ? c() : xe(() => {
    t.value = !0, c();
  }), ae(() => e.icon, c), Le(a), () => {
    const u = r.value;
    if (!u)
      return ft(zs, e);
    let f = e;
    return u.classes && (f = {
      ...e,
      class: u.classes.join(" ")
    }), ft({
      ...Oe,
      ...u.data
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
}), $t = "simplePrompt.settings", xt = {
  convertUnderscoreToSpace: !0,
  escapeBrackets: !1,
  useAliasesInSearch: !0,
  useAliasesInAutocomplete: !1,
  // Default false as per new spec
  smartBackspace: !1,
  // Default false - user must opt-in
  language: "en",
  // Default fallback
  allowEditDefaultTags: !1,
  autoMetaEnabled: !1
}, H = gt({ ...xt });
function Hs() {
  try {
    const e = localStorage.getItem($t);
    if (e) {
      const n = JSON.parse(e);
      Object.assign(H, { ...xt, ...n });
    } else
      navigator.language.startsWith("zh") && (H.language = "zh-CN");
  } catch (e) {
    console.error("Failed to load settings:", e);
  }
}
ae(H, (e) => {
  try {
    localStorage.setItem($t, JSON.stringify(e));
  } catch (n) {
    console.error("Failed to save settings:", n);
  }
}, { deep: !0 });
Hs();
var K = /* @__PURE__ */ ((e) => (e[e.GENERAL = 0] = "GENERAL", e[e.ARTIST = 1] = "ARTIST", e[e.COPYRIGHT = 3] = "COPYRIGHT", e[e.CHARACTER = 4] = "CHARACTER", e[e.META = 5] = "META", e))(K || {});
const Te = {
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
}, pe = class pe {
  constructor() {
    se(this, "_categories", gt(/* @__PURE__ */ new Map()));
    se(this, "isInitialized", !1);
    this.addDefaultCategories();
  }
  static getInstance() {
    return pe.instance || (pe.instance = new pe()), pe.instance;
  }
  addDefaultCategories() {
    this._categories.set(K.GENERAL, { value: K.GENERAL, label: "General", color: Te[K.GENERAL] }), this._categories.set(K.ARTIST, { value: K.ARTIST, label: "Artist", color: Te[K.ARTIST] }), this._categories.set(K.COPYRIGHT, { value: K.COPYRIGHT, label: "Copyright", color: Te[K.COPYRIGHT] }), this._categories.set(K.CHARACTER, { value: K.CHARACTER, label: "Character", color: Te[K.CHARACTER] }), this._categories.set(K.META, { value: K.META, label: "Meta", color: Te[K.META] });
  }
  async init() {
    this.isInitialized || await this.fetchCategories();
  }
  async fetchCategories() {
    try {
      const n = await fetch("/simple-prompt/categories/list");
      if (n.ok) {
        const s = await n.json();
        Array.isArray(s) && s.forEach((a) => {
          this._categories.set(a.id, {
            value: a.id,
            label: a.name,
            color: a.color
          });
        });
      }
    } catch (n) {
      console.error("[CategoryService] Failed to fetch categories:", n);
    } finally {
      this.isInitialized = !0;
    }
  }
  async saveCustomCategories(n) {
    try {
      const s = await fetch("/simple-prompt/categories/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categories: n })
      });
      if (s.ok)
        await this.fetchCategories();
      else
        throw console.error("[CategoryService] Failed to save categories:", await s.text()), new Error("Failed to save categories");
    } catch (s) {
      throw console.error("[CategoryService] Error saving categories:", s), s;
    }
  }
  getCategory(n) {
    return this._categories.get(n) || {
      value: n,
      label: "Unknown",
      color: "#888888"
    };
  }
  getColor(n) {
    return this.getCategory(n).color;
  }
  getName(n) {
    return this.getCategory(n).label;
  }
  getAll() {
    return Array.from(this._categories.values()).sort((n, s) => n.value - s.value);
  }
  // Getter for template usage - returns array format expected by CustomTagModal
  get categoriesArray() {
    return this.getAll().map((n) => ({
      id: n.value,
      name: n.label,
      color: n.color
    }));
  }
  getCategoryColor(n) {
    return this.getColor(n);
  }
};
se(pe, "instance");
let X = pe;
const ne = {
  get categories() {
    return {
      get value() {
        return X.getInstance().categoriesArray;
      }
    };
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
}, Ws = { class: "modal-container" }, Gs = { class: "modal-header" }, qs = { class: "modal-title" }, Qs = ["title"], Ks = { class: "modal-body" }, Js = { class: "form-group" }, Ys = ["placeholder", "disabled"], Xs = { class: "form-group" }, Zs = { class: "category-select-wrapper" }, en = ["value"], tn = { class: "form-group" }, sn = { class: "hint" }, nn = { class: "form-group" }, on = ["placeholder"], an = { class: "hint" }, ln = {
  key: 0,
  class: "message error"
}, rn = {
  key: 1,
  class: "message success"
}, cn = { class: "modal-footer" }, un = ["disabled"], dn = /* @__PURE__ */ oe({
  __name: "CustomTagModal",
  props: {
    visible: { type: Boolean },
    editMode: { type: Boolean },
    initialData: {},
    targetSource: {}
  },
  emits: ["close", "save"],
  setup(e, { emit: n }) {
    const s = e, a = n, { t } = ue(), i = E({
      name: "",
      category: 0,
      // General default
      post_count: 0,
      alias: ""
    }), r = E(!1), d = E(""), c = E(""), u = () => {
      i.value = {
        name: "",
        category: 0,
        post_count: 0,
        alias: ""
      }, d.value = "", c.value = "";
    };
    ae(() => s.visible, (m) => {
      m && (s.editMode && s.initialData ? i.value = {
        name: s.initialData.name,
        category: s.initialData.category || K.GENERAL,
        post_count: s.initialData.post_count || 0,
        alias: Array.isArray(s.initialData.alias) ? s.initialData.alias.join(", ") : s.initialData.alias || ""
      } : u());
    });
    const f = () => {
      a("close");
    }, h = async () => {
      if (!i.value.name.trim()) {
        d.value = t("customTag.errorNameRequired");
        return;
      }
      r.value = !0, d.value = "", c.value = "";
      try {
        const m = i.value.alias.split(",").map((T) => T.trim()).filter((T) => T), b = {
          name: i.value.name.trim(),
          category: i.value.category,
          post_count: Number(i.value.post_count),
          alias: m,
          source: s.targetSource || "user"
        }, g = await fetch("/simple-prompt/add-custom-tag", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(b)
        }), P = await g.json();
        if (!g.ok)
          throw new Error(P.error || g.statusText);
        c.value = s.editMode ? t("customTag.successEdited") || "Tag updated!" : t("customTag.successAdded"), setTimeout(() => {
          a("save"), f();
        }, 1e3);
      } catch (m) {
        console.error("Add tag error:", m), d.value = m.message || t("customTag.errorGeneric");
      } finally {
        r.value = !1;
      }
    };
    return (m, b) => (k(), re(De, { name: "fade" }, {
      default: we(() => [
        m.visible ? (k(), x("div", {
          key: 0,
          class: "modal-overlay",
          onClick: de(f, ["self"])
        }, [
          o("div", Ws, [
            o("div", Gs, [
              o("div", qs, [
                A(l(M), {
                  icon: m.editMode ? "mdi:pencil" : "mdi:tag-plus",
                  class: "title-icon"
                }, null, 8, ["icon"]),
                o("span", null, v(m.editMode ? l(t)("customTag.titleEdit") || "Edit Tag" : l(t)("customTag.title")), 1)
              ]),
              o("button", {
                class: "close-btn",
                onClick: f,
                title: l(t)("common.close")
              }, [
                A(l(M), { icon: "mdi:close" })
              ], 8, Qs)
            ]),
            o("div", Ks, [
              o("div", Js, [
                o("label", null, [
                  J(v(l(t)("customTag.nameLabel")) + " ", 1),
                  b[4] || (b[4] = o("span", { class: "required" }, "*", -1))
                ]),
                G(o("input", {
                  "onUpdate:modelValue": b[0] || (b[0] = (g) => i.value.name = g),
                  type: "text",
                  placeholder: l(t)("customTag.namePlaceholder"),
                  class: "sp-input",
                  autofocus: "",
                  disabled: m.editMode
                }, null, 8, Ys), [
                  [ee, i.value.name]
                ])
              ]),
              o("div", Xs, [
                o("label", null, v(l(t)("customTag.categoryLabel")), 1),
                o("div", Zs, [
                  G(o("select", {
                    "onUpdate:modelValue": b[1] || (b[1] = (g) => i.value.category = g),
                    class: "sp-select"
                  }, [
                    (k(!0), x(Z, null, te(l(ne).categories.value, (g) => (k(), x("option", {
                      key: g.id,
                      value: g.id
                    }, v(g.name), 9, en))), 128))
                  ], 512), [
                    [qe, i.value.category]
                  ]),
                  o("div", {
                    class: "color-preview",
                    style: le({ backgroundColor: l(ne).getCategoryColor(i.value.category) })
                  }, null, 4)
                ])
              ]),
              o("div", tn, [
                o("label", null, v(l(t)("customTag.countLabel")), 1),
                G(o("input", {
                  "onUpdate:modelValue": b[2] || (b[2] = (g) => i.value.post_count = g),
                  type: "number",
                  min: "0",
                  class: "sp-input"
                }, null, 512), [
                  [ee, i.value.post_count]
                ]),
                o("p", sn, v(l(t)("customTag.countHint")), 1)
              ]),
              o("div", nn, [
                o("label", null, v(l(t)("customTag.aliasLabel")), 1),
                G(o("input", {
                  "onUpdate:modelValue": b[3] || (b[3] = (g) => i.value.alias = g),
                  type: "text",
                  placeholder: l(t)("customTag.aliasPlaceholder"),
                  class: "sp-input"
                }, null, 8, on), [
                  [ee, i.value.alias]
                ]),
                o("p", an, v(l(t)("customTag.aliasHint")), 1)
              ]),
              d.value ? (k(), x("div", ln, [
                A(l(M), { icon: "mdi:alert-circle" }),
                J(" " + v(d.value), 1)
              ])) : B("", !0),
              c.value ? (k(), x("div", rn, [
                A(l(M), { icon: "mdi:check-circle" }),
                J(" " + v(c.value), 1)
              ])) : B("", !0)
            ]),
            o("div", cn, [
              o("button", {
                class: "btn-cancel",
                onClick: f
              }, v(l(t)("common.cancel")), 1),
              o("button", {
                class: "btn-save",
                onClick: h,
                disabled: r.value
              }, [
                r.value ? (k(), re(l(M), {
                  key: 0,
                  icon: "mdi:loading",
                  class: "spin"
                })) : B("", !0),
                o("span", null, v(l(t)("common.save")), 1)
              ], 8, un)
            ])
          ])
        ])) : B("", !0)
      ]),
      _: 1
    }));
  }
}), ce = (e, n) => {
  const s = e.__vccOpts || e;
  for (const [a, t] of n)
    s[a] = t;
  return s;
}, It = /* @__PURE__ */ ce(dn, [["__scopeId", "data-v-ccfab1f0"]]), fn = { class: "tag-manager" }, gn = { class: "tabs" }, pn = ["onClick"], hn = { class: "toolbar" }, mn = { class: "search-box" }, vn = ["placeholder"], yn = { class: "status-info" }, _n = {
  key: 0,
  class: "warning-banner"
}, bn = { class: "table-container" }, wn = { class: "data-table" }, kn = {
  key: 0,
  class: "loading-row"
}, Cn = { colspan: "5" }, Tn = {
  key: 1,
  class: "empty-row"
}, $n = { colspan: "5" }, xn = { class: "name-cell" }, In = ["title"], Sn = { align: "right" }, En = {
  key: 0,
  class: "actions"
}, An = ["onClick"], Pn = ["onClick"], Mn = {
  key: 1,
  class: "actions-disabled"
}, Ln = { class: "pagination" }, Dn = ["disabled"], Rn = { class: "page-info" }, On = ["disabled"], Fn = {
  key: 1,
  class: "add-tag-bar"
}, jn = { class: "add-inputs" }, Nn = ["placeholder"], Un = ["value"], Vn = ["disabled"], Ue = 20, Bn = /* @__PURE__ */ oe({
  __name: "TagManager",
  setup(e) {
    const { t: n } = ue(), s = E("user"), a = _e(() => [
      { id: "user", label: n("settings.items.updateUserTags") || "User Tags" },
      { id: "liked", label: n("settings.items.updateLikedTags") || "Liked Tags" },
      { id: "default", label: "Default Tags" }
    ]), t = E([]), i = E(0), r = E(!1), d = E(""), c = E(1), u = E(!1), f = E(null), h = async () => {
      r.value = !0;
      try {
        const w = (c.value - 1) * Ue, p = new URLSearchParams({
          source: s.value,
          limit: Ue.toString(),
          offset: w.toString(),
          q: d.value
        }), C = await fetch(`/simple-prompt/tags/list?${p.toString()}`), y = await C.json();
        C.ok ? (t.value = y.data || [], i.value = y.total || 0) : console.error("Fetch tags failed:", y.error);
      } catch (w) {
        console.error("Fetch tags error:", w);
      } finally {
        r.value = !1;
      }
    }, m = async (w) => {
      if (confirm(n("common.confirm") + ` Delete '${w.name}'?`))
        try {
          const p = await fetch("/simple-prompt/tags/delete", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: w.name, source: s.value })
          });
          if (p.ok)
            h();
          else {
            const C = await p.json();
            alert("Delete failed: " + C.error);
          }
        } catch (p) {
          alert("Delete failed: " + p.message);
        }
    }, b = (w) => {
      f.value = w, u.value = !0;
    }, g = () => {
      h();
    }, P = _e(() => s.value === "default" ? H.allowEditDefaultTags : !0);
    ae([s, d], () => {
      c.value = 1, h();
    }), ae(c, () => {
      h();
    }), xe(() => {
      h(), ne.fetchCategories();
    });
    const T = E(""), D = E(0), R = E(!1), U = async () => {
      if (!T.value.trim()) return;
      const w = T.value.split(/[,\n]/).map((p) => p.trim()).filter(Boolean);
      if (w.length !== 0) {
        R.value = !0;
        try {
          const p = w.map((_) => ({
            name: _,
            category: D.value,
            post_count: 0,
            alias: [],
            source: s.value
          })), C = await fetch("/simple-prompt/add-custom-tag", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tags: p })
          }), y = await C.json();
          C.ok ? (T.value = "", h()) : alert("Add failed: " + y.error);
        } catch (p) {
          alert("Add failed: " + p.message);
        } finally {
          R.value = !1;
        }
      }
    }, $ = (w) => ne.getCategoryName(w), O = (w) => ne.getCategoryColor(w);
    return (w, p) => (k(), x("div", fn, [
      o("div", gn, [
        (k(!0), x(Z, null, te(a.value, (C) => (k(), x("button", {
          key: C.id,
          class: fe(["tab-btn", { active: s.value === C.id }]),
          onClick: (y) => s.value = C.id
        }, v(C.label), 11, pn))), 128))
      ]),
      o("div", hn, [
        o("div", mn, [
          A(l(M), {
            icon: "mdi:magnify",
            class: "search-icon"
          }),
          G(o("input", {
            "onUpdate:modelValue": p[0] || (p[0] = (C) => d.value = C),
            type: "text",
            placeholder: l(n)("search.placeholder"),
            class: "search-input"
          }, null, 8, vn), [
            [ee, d.value]
          ])
        ]),
        o("div", yn, v(i.value) + " tags ", 1)
      ]),
      s.value === "default" && !P.value ? (k(), x("div", _n, [
        A(l(M), { icon: "mdi:lock" }),
        p[6] || (p[6] = o("span", null, "Editing default tags is disabled in settings.", -1))
      ])) : B("", !0),
      o("div", bn, [
        o("table", wn, [
          p[8] || (p[8] = o("thead", null, [
            o("tr", null, [
              o("th", { width: "30%" }, "Name"),
              o("th", { width: "15%" }, "Category"),
              o("th", { width: "15%" }, "Post Count"),
              o("th", { width: "25%" }, "Aliases"),
              o("th", {
                width: "15%",
                align: "right"
              }, "Actions")
            ])
          ], -1)),
          o("tbody", null, [
            r.value ? (k(), x("tr", kn, [
              o("td", Cn, [
                A(l(M), {
                  icon: "mdi:loading",
                  class: "spin"
                }),
                p[7] || (p[7] = J(" Loading... "))
              ])
            ])) : t.value.length === 0 ? (k(), x("tr", Tn, [
              o("td", $n, v(l(n)("search.noResults")), 1)
            ])) : (k(!0), x(Z, { key: 2 }, te(t.value, (C) => (k(), x("tr", {
              key: C.name
            }, [
              o("td", xn, v(C.name), 1),
              o("td", null, [
                o("span", {
                  class: "cat-badge",
                  style: le({ "--c": O(C.category) })
                }, v($(C.category)), 5)
              ]),
              o("td", null, v(C.post_count), 1),
              o("td", {
                class: "alias-cell",
                title: C.alias ? C.alias.join(", ") : ""
              }, v(C.alias ? C.alias.join(", ") : "-"), 9, In),
              o("td", Sn, [
                P.value ? (k(), x("div", En, [
                  o("button", {
                    class: "action-btn edit",
                    onClick: (y) => b(C),
                    title: "Edit"
                  }, [
                    A(l(M), { icon: "mdi:pencil" })
                  ], 8, An),
                  o("button", {
                    class: "action-btn delete",
                    onClick: (y) => m(C),
                    title: "Delete"
                  }, [
                    A(l(M), { icon: "mdi:delete" })
                  ], 8, Pn)
                ])) : (k(), x("div", Mn, [
                  A(l(M), { icon: "mdi:lock-outline" })
                ]))
              ])
            ]))), 128))
          ])
        ])
      ]),
      o("div", Ln, [
        o("button", {
          disabled: c.value === 1,
          onClick: p[1] || (p[1] = (C) => c.value--),
          class: "page-btn"
        }, [
          A(l(M), { icon: "mdi:chevron-left" })
        ], 8, Dn),
        o("span", Rn, "Page " + v(c.value), 1),
        o("button", {
          disabled: t.value.length < Ue,
          onClick: p[2] || (p[2] = (C) => c.value++),
          class: "page-btn"
        }, [
          A(l(M), { icon: "mdi:chevron-right" })
        ], 8, On)
      ]),
      P.value ? (k(), x("div", Fn, [
        o("div", jn, [
          G(o("input", {
            "onUpdate:modelValue": p[3] || (p[3] = (C) => T.value = C),
            placeholder: l(n)("settings.sections.addPlaceholder") || "New Tag Name (comma separated for multiple)",
            class: "input-new-name",
            onKeyup: Bt(U, ["enter"])
          }, null, 40, Nn), [
            [ee, T.value]
          ]),
          G(o("select", {
            "onUpdate:modelValue": p[4] || (p[4] = (C) => D.value = C),
            class: "select-new-cat"
          }, [
            (k(!0), x(Z, null, te(l(ne).categories.value, (C) => (k(), x("option", {
              key: C.id,
              value: C.id
            }, v(C.name), 9, Un))), 128))
          ], 512), [
            [qe, D.value]
          ]),
          o("button", {
            class: "btn-add",
            onClick: U,
            disabled: R.value
          }, [
            R.value ? (k(), re(l(M), {
              key: 0,
              icon: "mdi:loading",
              class: "spin"
            })) : (k(), re(l(M), {
              key: 1,
              icon: "mdi:plus"
            })),
            p[9] || (p[9] = J(" Add "))
          ], 8, Vn)
        ])
      ])) : B("", !0),
      A(It, {
        visible: u.value,
        "edit-mode": !0,
        "initial-data": f.value,
        "target-source": s.value,
        onClose: p[5] || (p[5] = (C) => u.value = !1),
        onSave: g
      }, null, 8, ["visible", "initial-data", "target-source"])
    ]));
  }
}), zn = /* @__PURE__ */ ce(Bn, [["__scopeId", "data-v-7564308e"]]), he = class he {
  constructor() {
    // Preset support
    se(this, "presets", E([]));
    // { id, name, tags }
    se(this, "defaultPresets", E([]));
    se(this, "customPresets", E([]));
    se(this, "activePresetId", E(""));
    se(this, "loading", E(!1));
  }
  static getInstance() {
    return he.instance || (he.instance = new he()), he.instance;
  }
  // --- Preset API ---
  async fetchPresets() {
    try {
      const n = await fetch("/simple-prompt/presets/list");
      if (n.ok) {
        const s = await n.json();
        this.defaultPresets.value = s.defaults || [], this.customPresets.value = s.customs || [], this.presets.value = [...this.defaultPresets.value, ...this.customPresets.value], !this.activePresetId.value && this.presets.value.length > 0 && (this.activePresetId.value = this.presets.value[0].id);
      }
    } catch (n) {
      console.error("Error fetching presets:", n);
    }
  }
  async saveCustomPresets(n) {
    try {
      if (!(await fetch("/simple-prompt/presets/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ presets: n })
      })).ok) throw new Error("Failed");
      await this.fetchPresets();
    } catch (s) {
      throw console.error("Error saving presets:", s), s;
    }
  }
  getActiveTags() {
    if (this.activePresetId.value) {
      const n = this.presets.value.find((s) => s.id === this.activePresetId.value);
      if (n && n.tags) return n.tags;
    }
    return [];
  }
  setActivePreset(n) {
    this.activePresetId.value = n;
  }
};
se(he, "instance");
let Ge = he;
const W = Ge.getInstance(), Hn = { class: "settings-container" }, Wn = { class: "settings-header" }, Gn = { class: "settings-title" }, qn = ["title"], Qn = { class: "settings-body" }, Kn = { class: "settings-sidebar" }, Jn = ["onClick"], Yn = { class: "settings-content" }, Xn = {
  key: 0,
  class: "settings-section"
}, Zn = { class: "section-title" }, eo = { class: "setting-item" }, to = { class: "setting-info" }, so = { class: "setting-label" }, no = { class: "setting-desc" }, oo = { class: "switch" }, ao = { class: "setting-item" }, io = { class: "setting-info" }, lo = { class: "setting-label" }, ro = { class: "setting-desc" }, co = { class: "switch" }, uo = {
  key: 1,
  class: "settings-section"
}, fo = { class: "section-title" }, go = { class: "setting-item" }, po = { class: "setting-info" }, ho = { class: "setting-label" }, mo = { class: "setting-desc" }, vo = { class: "switch" }, yo = { class: "setting-item" }, _o = { class: "setting-info" }, bo = { class: "setting-label" }, wo = { class: "setting-desc" }, ko = { class: "switch" }, Co = {
  key: 2,
  class: "settings-section"
}, To = { class: "section-title" }, $o = { class: "setting-item" }, xo = { class: "setting-info" }, Io = { class: "setting-label" }, So = { class: "setting-desc" }, Eo = { class: "switch" }, Ao = {
  key: 3,
  class: "settings-section"
}, Po = { class: "section-title" }, Mo = { class: "setting-item" }, Lo = { class: "setting-info" }, Do = { class: "setting-label" }, Ro = { class: "setting-desc" }, Oo = {
  key: 4,
  class: "settings-section"
}, Fo = { class: "section-title" }, jo = { class: "setting-item" }, No = { class: "setting-info" }, Uo = { class: "setting-label" }, Vo = { class: "setting-desc" }, Bo = { class: "switch" }, zo = { class: "setting-item data-update-item" }, Ho = { class: "setting-info" }, Wo = { class: "setting-label" }, Go = { class: "setting-desc" }, qo = { class: "update-actions" }, Qo = ["disabled"], Ko = { class: "setting-item data-update-item" }, Jo = { class: "setting-info" }, Yo = { class: "setting-label" }, Xo = { class: "setting-desc" }, Zo = { class: "update-actions" }, ea = ["disabled"], ta = { class: "setting-item data-update-item" }, sa = { class: "setting-info" }, na = { class: "setting-label" }, oa = { class: "setting-desc" }, aa = { class: "update-actions" }, ia = ["disabled"], la = {
  key: 5,
  class: "settings-section full-width"
}, ra = { class: "section-title" }, ca = { class: "category-manager" }, ua = { class: "add-cat-form" }, da = ["placeholder"], fa = { class: "cat-list" }, ga = { class: "cat-name" }, pa = { class: "cat-id" }, ha = ["onClick"], ma = {
  key: 6,
  class: "settings-section full-width"
}, va = { class: "section-title" }, ya = { class: "meta-manager" }, _a = { class: "preset-form" }, ba = { class: "form-row" }, wa = ["placeholder"], ka = { class: "form-row" }, Ca = ["placeholder"], Ta = { class: "form-actions" }, $a = { class: "preset-list" }, xa = { class: "preset-info" }, Ia = { class: "preset-name" }, Sa = { class: "preset-tags" }, Ea = { class: "preset-actions" }, Aa = ["onClick"], Pa = ["onClick"], Ma = {
  key: 0,
  class: "empty-msg"
}, La = {
  class: "preset-list",
  style: { "margin-top": "20px" }
}, Da = { style: { color: "#888" } }, Ra = { class: "preset-info" }, Oa = { class: "preset-name" }, Fa = { class: "preset-tags" }, ja = {
  key: 7,
  class: "settings-section full-width"
}, Na = { class: "section-title" }, Ua = { class: "settings-footer" }, Va = { class: "footer-info" }, Ba = /* @__PURE__ */ oe({
  __name: "SettingsModal",
  props: {
    visible: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["close"],
  setup(e, { emit: n }) {
    const s = e, a = n, { t, locale: i } = ue(), r = () => {
      a("close");
    };
    ae(() => H.language, (y) => {
      i.value = y;
    });
    const d = [
      { id: "textFormat", icon: "mdi:format-text" },
      { id: "autocomplete", icon: "mdi:magnify" },
      { id: "editing", icon: "mdi:pencil" },
      { id: "interface", icon: "mdi:translate" },
      { id: "data", icon: "mdi:database" },
      { id: "categoryManager", icon: "mdi:palette" },
      { id: "metaManager", icon: "mdi:format-list-bulleted-type" },
      { id: "tagManager", icon: "mdi:tag-multiple" }
    ], c = E("textFormat"), u = E(""), f = E("#aabbcc"), h = () => {
      if (!u.value) return;
      const y = ne.categories.value;
      let I = (y.length > 0 ? Math.max(...y.map((ge) => ge.id)) : 5) + 1;
      for (I < 6 && (I = 6); y.some((ge) => ge.id === I); )
        I++;
      const q = {
        id: I,
        name: u.value,
        color: f.value
      }, Y = [0, 1, 3, 4, 5, 6, 7], Fe = [...y.filter((ge) => !Y.includes(ge.id)), q];
      ne.saveCustomCategories(Fe).then(() => {
        u.value = "";
      });
    }, m = (y) => {
      if (!confirm(t("common.confirm") || "Are you sure?")) return;
      const _ = ne.categories.value, I = [0, 1, 3, 4, 5, 6, 7];
      if (I.includes(y)) {
        alert(t("category.cannotDeleteDefault"));
        return;
      }
      const q = _.filter((Y) => !I.includes(Y.id) && Y.id !== y);
      ne.saveCustomCategories(q);
    }, b = E(""), g = E(""), P = E(null);
    ae(c, (y) => {
      y === "categoryManager" ? ne.fetchCategories() : y === "metaManager" && W.fetchPresets();
    });
    const T = () => {
      if (!b.value || !g.value) {
        alert(t("category.nameRequired"));
        return;
      }
      const y = g.value.split(/[,\n]/).map((_) => _.trim()).filter(Boolean);
      if (P.value) {
        const _ = W.customPresets.value.findIndex((I) => I.id === P.value);
        _ !== -1 && (W.customPresets.value[_] = {
          ...W.customPresets.value[_],
          name: b.value,
          tags: y
        });
      } else {
        const _ = {
          id: "custom_" + Date.now(),
          name: b.value,
          tags: y
        };
        W.customPresets.value.push(_);
      }
      W.saveCustomPresets(W.customPresets.value).then(() => {
        U();
      });
    }, D = (y) => {
      P.value = y.id, b.value = y.name, g.value = y.tags.join(", ");
    }, R = (y) => {
      if (!confirm(t("common.confirm") || "Are you sure?")) return;
      const _ = W.customPresets.value.filter((I) => I.id !== y);
      W.customPresets.value = _, W.saveCustomPresets(_);
    }, U = () => {
      b.value = "", g.value = "", P.value = null;
    }, $ = E(""), O = E(!1), w = E(!1), p = E(""), C = async (y) => {
      if (!(O.value || w.value)) {
        O.value = !0, $.value = "";
        try {
          if (y === "update_github") {
            w.value = !0, $.value = t("settings.items.checkingUpdate");
            try {
              const _ = await fetch("/simple-prompt/check-update"), I = await _.json();
              if (!_.ok)
                throw new Error(I.error || _.statusText);
              if (p.value = I.version, w.value = !1, !I.update_available) {
                $.value = t("settings.items.upToDate") + p.value;
                return;
              }
              $.value = t("settings.items.updating");
              const q = await fetch("/simple-prompt/update-tags", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({})
              }), Y = await q.json();
              if (q.ok && Y.status === "success")
                $.value = t("settings.items.updateSuccess");
              else
                throw new Error(Y.error || q.statusText);
            } finally {
              w.value = !1;
            }
          } else {
            $.value = t("settings.items.updating");
            const q = await fetch("/simple-prompt/update-data", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ action: y })
            }), Y = await q.json();
            if (q.ok && Y.status === "success")
              $.value = Y.message || t("settings.items.updateSuccess");
            else
              throw new Error(Y.error || q.statusText);
          }
        } catch (_) {
          console.error("Update action error:", _), $.value = t("settings.items.updateError") + _.message;
        } finally {
          O.value = !1;
        }
      }
    };
    return ae(() => s.visible, (y) => {
      y && ($.value = "", p.value = "");
    }), (y, _) => (k(), re(De, { name: "fade" }, {
      default: we(() => [
        e.visible ? (k(), x("div", {
          key: 0,
          class: "settings-overlay",
          onClick: de(r, ["self"])
        }, [
          o("div", Hn, [
            o("div", Wn, [
              o("div", Gn, [
                A(l(M), {
                  icon: "mdi:cog",
                  class: "settings-icon"
                }),
                o("span", null, v(l(t)("settings.title")), 1)
              ]),
              o("button", {
                class: "btn-close",
                onClick: r,
                title: l(t)("common.close")
              }, [
                A(l(M), { icon: "mdi:close" })
              ], 8, qn)
            ]),
            o("div", Qn, [
              o("div", Kn, [
                (k(), x(Z, null, te(d, (I) => o("div", {
                  key: I.id,
                  class: fe(["sidebar-item", { active: c.value === I.id }]),
                  onClick: (q) => c.value = I.id
                }, [
                  A(l(M), {
                    icon: I.icon,
                    class: "item-icon"
                  }, null, 8, ["icon"]),
                  o("span", null, v(l(t)(`settings.sections.${I.id}`)), 1)
                ], 10, Jn)), 64))
              ]),
              o("div", Yn, [
                c.value === "textFormat" ? (k(), x("div", Xn, [
                  o("h3", Zn, [
                    A(l(M), { icon: "mdi:format-text" }),
                    J(" " + v(l(t)("settings.sections.textFormat")), 1)
                  ]),
                  o("div", eo, [
                    o("div", to, [
                      o("label", so, v(l(t)("settings.items.convertUnderscore")), 1),
                      o("p", no, v(l(t)("settings.items.convertUnderscoreDesc")), 1)
                    ]),
                    o("label", oo, [
                      G(o("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": _[0] || (_[0] = (I) => l(H).convertUnderscoreToSpace = I)
                      }, null, 512), [
                        [ye, l(H).convertUnderscoreToSpace]
                      ]),
                      _[14] || (_[14] = o("span", { class: "slider" }, null, -1))
                    ])
                  ]),
                  o("div", ao, [
                    o("div", io, [
                      o("label", lo, v(l(t)("settings.items.escapeBrackets")), 1),
                      o("p", ro, v(l(t)("settings.items.escapeBracketsDesc")), 1)
                    ]),
                    o("label", co, [
                      G(o("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": _[1] || (_[1] = (I) => l(H).escapeBrackets = I)
                      }, null, 512), [
                        [ye, l(H).escapeBrackets]
                      ]),
                      _[15] || (_[15] = o("span", { class: "slider" }, null, -1))
                    ])
                  ])
                ])) : B("", !0),
                c.value === "autocomplete" ? (k(), x("div", uo, [
                  o("h3", fo, [
                    A(l(M), { icon: "mdi:magnify" }),
                    J(" " + v(l(t)("settings.sections.autocomplete")), 1)
                  ]),
                  o("div", go, [
                    o("div", po, [
                      o("label", ho, v(l(t)("settings.items.useAliasSearch")), 1),
                      o("p", mo, v(l(t)("settings.items.useAliasSearchDesc")), 1)
                    ]),
                    o("label", vo, [
                      G(o("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": _[2] || (_[2] = (I) => l(H).useAliasesInSearch = I)
                      }, null, 512), [
                        [ye, l(H).useAliasesInSearch]
                      ]),
                      _[16] || (_[16] = o("span", { class: "slider" }, null, -1))
                    ])
                  ]),
                  o("div", yo, [
                    o("div", _o, [
                      o("label", bo, v(l(t)("settings.items.useAliasAutocomplete")), 1),
                      o("p", wo, v(l(t)("settings.items.useAliasAutocompleteDesc")), 1)
                    ]),
                    o("label", ko, [
                      G(o("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": _[3] || (_[3] = (I) => l(H).useAliasesInAutocomplete = I)
                      }, null, 512), [
                        [ye, l(H).useAliasesInAutocomplete]
                      ]),
                      _[17] || (_[17] = o("span", { class: "slider" }, null, -1))
                    ])
                  ])
                ])) : B("", !0),
                c.value === "editing" ? (k(), x("div", Co, [
                  o("h3", To, [
                    A(l(M), { icon: "mdi:pencil" }),
                    J(" " + v(l(t)("settings.sections.editing")), 1)
                  ]),
                  o("div", $o, [
                    o("div", xo, [
                      o("label", Io, v(l(t)("settings.items.smartBackspace")), 1),
                      o("p", So, v(l(t)("settings.items.smartBackspaceDesc")), 1)
                    ]),
                    o("label", Eo, [
                      G(o("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": _[4] || (_[4] = (I) => l(H).smartBackspace = I)
                      }, null, 512), [
                        [ye, l(H).smartBackspace]
                      ]),
                      _[18] || (_[18] = o("span", { class: "slider" }, null, -1))
                    ])
                  ])
                ])) : B("", !0),
                c.value === "interface" ? (k(), x("div", Ao, [
                  o("h3", Po, [
                    A(l(M), { icon: "mdi:translate" }),
                    J(" " + v(l(t)("settings.sections.interface")), 1)
                  ]),
                  o("div", Mo, [
                    o("div", Lo, [
                      o("label", Do, v(l(t)("settings.items.language")), 1),
                      o("p", Ro, v(l(t)("settings.items.languageDesc")), 1)
                    ]),
                    G(o("select", {
                      "onUpdate:modelValue": _[5] || (_[5] = (I) => l(H).language = I),
                      class: "language-select"
                    }, _[19] || (_[19] = [
                      o("option", { value: "en" }, "English", -1),
                      o("option", { value: "zh-CN" }, "简体中文", -1)
                    ]), 512), [
                      [qe, l(H).language]
                    ])
                  ])
                ])) : B("", !0),
                c.value === "data" ? (k(), x("div", Oo, [
                  o("h3", Fo, [
                    A(l(M), { icon: "mdi:database" }),
                    J(" " + v(l(t)("settings.sections.data")), 1)
                  ]),
                  o("div", jo, [
                    o("div", No, [
                      o("label", Uo, v(l(t)("settings.items.allowEditDefaultTags") || "Allow Editing Default Tags"), 1),
                      o("p", Vo, v(l(t)("settings.items.allowEditDefaultTagsDesc") || "Enable editing and deleting of default tags (Use with caution)."), 1)
                    ]),
                    o("label", Bo, [
                      G(o("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": _[6] || (_[6] = (I) => l(H).allowEditDefaultTags = I)
                      }, null, 512), [
                        [ye, l(H).allowEditDefaultTags]
                      ]),
                      _[20] || (_[20] = o("span", { class: "slider" }, null, -1))
                    ])
                  ]),
                  o("div", zo, [
                    o("div", Ho, [
                      o("label", Wo, v(l(t)("settings.items.updateTags")), 1),
                      o("p", Go, v(l(t)("settings.items.updateTagsDesc")), 1)
                    ]),
                    o("div", qo, [
                      o("button", {
                        class: "btn-update primary",
                        disabled: O.value || w.value,
                        onClick: _[7] || (_[7] = (I) => C("update_github"))
                      }, [
                        O.value && c.value === "data" ? (k(), re(l(M), {
                          key: 0,
                          icon: "mdi:loading",
                          class: "spin"
                        })) : B("", !0),
                        o("span", null, v(l(t)("settings.items.updateNow")), 1)
                      ], 8, Qo)
                    ])
                  ]),
                  o("div", Ko, [
                    o("div", Jo, [
                      o("label", Yo, v(l(t)("settings.items.updateLikedTags") || "Update Liked Tags"), 1),
                      o("p", Xo, v(l(t)("settings.items.updateLikedTagsDesc") || "Sync liked tags data with main database."), 1)
                    ]),
                    o("div", Zo, [
                      o("button", {
                        class: "btn-update secondary",
                        disabled: O.value,
                        onClick: _[8] || (_[8] = (I) => C("update_liked"))
                      }, [
                        A(l(M), { icon: "mdi:heart" }),
                        o("span", null, v(l(t)("common.update") || "Update"), 1)
                      ], 8, ea)
                    ])
                  ]),
                  o("div", ta, [
                    o("div", sa, [
                      o("label", na, v(l(t)("settings.items.updateUserTags") || "Update User Tags"), 1),
                      o("p", oa, v(l(t)("settings.items.updateUserTagsDesc") || "Sync custom tags data with main database."), 1)
                    ]),
                    o("div", aa, [
                      o("button", {
                        class: "btn-update secondary",
                        disabled: O.value,
                        onClick: _[9] || (_[9] = (I) => C("update_user"))
                      }, [
                        A(l(M), { icon: "mdi:account-tag" }),
                        o("span", null, v(l(t)("common.update") || "Update"), 1)
                      ], 8, ia)
                    ])
                  ]),
                  $.value ? (k(), x("div", {
                    key: 0,
                    class: fe(["update-status-box", { error: $.value.includes("failed") || $.value.toLowerCase().includes("error"), success: $.value.includes("success") || $.value.includes("upToDate") || $.value.includes("updated") }])
                  }, [
                    A(l(M), {
                      icon: $.value.includes("success") || $.value.includes("upToDate") || $.value.includes("updated") ? "mdi:check-circle" : "mdi:alert-circle"
                    }, null, 8, ["icon"]),
                    o("span", null, v($.value), 1)
                  ], 2)) : B("", !0)
                ])) : B("", !0),
                c.value === "categoryManager" ? (k(), x("div", la, [
                  o("h3", ra, [
                    A(l(M), { icon: "mdi:palette" }),
                    J(" " + v(l(t)("settings.sections.categoryManager") || "Category Management"), 1)
                  ]),
                  o("div", ca, [
                    o("div", ua, [
                      G(o("input", {
                        "onUpdate:modelValue": _[10] || (_[10] = (I) => u.value = I),
                        placeholder: l(t)("category.namePlaceholder"),
                        class: "input-text"
                      }, null, 8, da), [
                        [ee, u.value]
                      ]),
                      G(o("input", {
                        "onUpdate:modelValue": _[11] || (_[11] = (I) => f.value = I),
                        type: "color",
                        class: "input-color"
                      }, null, 512), [
                        [ee, f.value]
                      ]),
                      o("button", {
                        class: "btn-primary",
                        onClick: h
                      }, v(l(t)("category.addButton")), 1)
                    ]),
                    o("div", fa, [
                      (k(!0), x(Z, null, te(l(ne).categories.value, (I) => (k(), x("div", {
                        key: I.id,
                        class: "cat-item"
                      }, [
                        o("div", {
                          class: "cat-dot",
                          style: le({ backgroundColor: I.color })
                        }, null, 4),
                        o("span", ga, v(I.name), 1),
                        o("span", pa, "#" + v(I.id), 1),
                        [0, 1, 3, 4, 5, 6, 7].includes(I.id) ? B("", !0) : (k(), x("button", {
                          key: 0,
                          class: "btn-icon",
                          onClick: (q) => m(I.id)
                        }, [
                          A(l(M), { icon: "mdi:delete" })
                        ], 8, ha))
                      ]))), 128))
                    ])
                  ])
                ])) : B("", !0),
                c.value === "metaManager" ? (k(), x("div", ma, [
                  o("h3", va, [
                    A(l(M), { icon: "mdi:format-list-bulleted-type" }),
                    J(" " + v(l(t)("settings.sections.metaManager") || "Meta Presets Management"), 1)
                  ]),
                  o("div", ya, [
                    o("div", _a, [
                      o("h4", null, v(P.value ? l(t)("settings.meta.editPreset") : l(t)("settings.meta.newPreset")), 1),
                      o("div", ba, [
                        G(o("input", {
                          "onUpdate:modelValue": _[12] || (_[12] = (I) => b.value = I),
                          placeholder: l(t)("settings.meta.presetNamePlaceholder"),
                          class: "input-text"
                        }, null, 8, wa), [
                          [ee, b.value]
                        ])
                      ]),
                      o("div", ka, [
                        G(o("textarea", {
                          "onUpdate:modelValue": _[13] || (_[13] = (I) => g.value = I),
                          placeholder: l(t)("settings.meta.presetTagsPlaceholder"),
                          class: "input-textarea"
                        }, null, 8, Ca), [
                          [ee, g.value]
                        ])
                      ]),
                      o("div", Ta, [
                        b.value || g.value ? (k(), x("button", {
                          key: 0,
                          class: "btn-cancel",
                          onClick: U
                        }, v(l(t)("common.cancel")), 1)) : B("", !0),
                        o("button", {
                          class: "btn-primary",
                          onClick: T
                        }, v(P.value ? l(t)("common.update") : l(t)("category.addButton")), 1)
                      ])
                    ]),
                    o("div", $a, [
                      o("h4", null, v(l(t)("settings.meta.customPresetsHeading")), 1),
                      (k(!0), x(Z, null, te(l(W).customPresets.value, (I) => (k(), x("div", {
                        key: I.id,
                        class: "preset-item"
                      }, [
                        o("div", xa, [
                          o("span", Ia, v(I.name), 1),
                          o("span", Sa, v(I.tags.join(", ")), 1)
                        ]),
                        o("div", Ea, [
                          o("button", {
                            class: "btn-icon",
                            onClick: (q) => D(I)
                          }, [
                            A(l(M), { icon: "mdi:pencil" })
                          ], 8, Aa),
                          o("button", {
                            class: "btn-icon",
                            onClick: (q) => R(I.id)
                          }, [
                            A(l(M), { icon: "mdi:delete" })
                          ], 8, Pa)
                        ])
                      ]))), 128)),
                      l(W).customPresets.value.length === 0 ? (k(), x("div", Ma, v(l(t)("settings.meta.noCustomPresets")), 1)) : B("", !0)
                    ]),
                    o("div", La, [
                      o("h4", Da, v(l(t)("settings.meta.defaultPresetsHeading")), 1),
                      (k(!0), x(Z, null, te(l(W).defaultPresets.value, (I) => (k(), x("div", {
                        key: I.id,
                        class: "preset-item default"
                      }, [
                        o("div", Ra, [
                          o("span", Oa, v(I.name), 1),
                          o("span", Fa, v(I.tags.join(", ")), 1)
                        ])
                      ]))), 128))
                    ])
                  ])
                ])) : B("", !0),
                c.value === "tagManager" ? (k(), x("div", ja, [
                  o("h3", Na, [
                    A(l(M), { icon: "mdi:tag-multiple" }),
                    J(" " + v(l(t)("settings.sections.tagManager") || "Tag Manager"), 1)
                  ]),
                  A(zn)
                ])) : B("", !0)
              ])
            ]),
            o("div", Ua, [
              o("div", Va, [
                A(l(M), { icon: "mdi:information-outline" }),
                J(" " + v(l(t)("settings.autoSave")), 1)
              ]),
              o("button", {
                class: "btn-primary",
                onClick: r
              }, v(l(t)("common.done")), 1)
            ])
          ])
        ])) : B("", !0)
      ]),
      _: 1
    }));
  }
}), za = /* @__PURE__ */ ce(Ba, [["__scopeId", "data-v-800ec89c"]]), Ha = { class: "sp-modal-container" }, Wa = { class: "sp-modal-header" }, Ga = { class: "sp-modal-title" }, qa = { class: "sp-modal-actions" }, Qa = ["title"], Ka = ["title"], Ja = { class: "sp-modal-body" }, Ya = { class: "sp-modal-footer" }, Xa = { class: "sp-footer-left" }, Za = { class: "sp-hint" }, ei = { class: "sp-footer-right" }, ti = /* @__PURE__ */ oe({
  __name: "ModalWrapper",
  props: {
    visible: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["close", "save"],
  setup(e, { emit: n }) {
    const s = n, a = e, { t } = ue(), i = E(!1), r = E(!1), d = () => {
      i.value = !0;
    }, c = () => {
      i.value = !1;
    }, u = () => {
      r.value = !0;
    }, f = () => {
      r.value = !1;
    }, h = () => {
      s("close");
    }, m = () => {
      s("save");
    }, b = (g) => {
      i.value || r.value || (g.key === "Escape" && a.visible && h(), (g.ctrlKey || g.metaKey) && g.key === "s" && (g.preventDefault(), m()));
    };
    return xe(() => {
      window.addEventListener("keydown", b);
    }), Le(() => {
      window.removeEventListener("keydown", b);
    }), (g, P) => (k(), re(De, { name: "fade" }, {
      default: we(() => [
        e.visible ? (k(), x("div", {
          key: 0,
          class: "sp-modal-overlay",
          onClick: de(h, ["self"])
        }, [
          o("div", Ha, [
            o("div", Wa, [
              o("div", Ga, [
                A(l(M), {
                  icon: "mdi:pencil-box-outline",
                  class: "sp-icon"
                }),
                o("span", null, v(l(t)("editor.subtitle")), 1)
              ]),
              o("div", qa, [
                o("button", {
                  class: "sp-btn-icon",
                  title: l(t)("settings.title"),
                  onClick: d
                }, [
                  A(l(M), { icon: "mdi:cog" })
                ], 8, Qa),
                o("button", {
                  class: "sp-btn-icon sp-btn-close",
                  onClick: h,
                  title: l(t)("common.close")
                }, [
                  A(l(M), { icon: "mdi:close" })
                ], 8, Ka)
              ])
            ]),
            o("div", Ja, [
              zt(g.$slots, "content", { openCustomTag: u }, void 0, !0)
            ]),
            o("div", Ya, [
              o("div", Xa, [
                o("span", Za, v(l(t)("editor.autocompleteHint")), 1)
              ]),
              o("div", ei, [
                o("button", {
                  class: "sp-btn sp-btn-secondary",
                  onClick: h
                }, v(l(t)("common.cancel")), 1),
                o("button", {
                  class: "sp-btn sp-btn-primary",
                  onClick: m
                }, v(l(t)("common.save")), 1)
              ])
            ])
          ]),
          A(za, {
            visible: i.value,
            onClose: c
          }, null, 8, ["visible"]),
          A(It, {
            visible: r.value,
            onClose: f
          }, null, 8, ["visible"])
        ])) : B("", !0)
      ]),
      _: 3
    }));
  }
}), si = /* @__PURE__ */ ce(ti, [["__scopeId", "data-v-86b97fcd"]]), me = class me {
  constructor() {
    se(this, "isInitialized", !1);
  }
  static getInstance() {
    return me.instance || (me.instance = new me()), me.instance;
  }
  async init() {
    this.isInitialized || (console.log("[DuckDB] Backend initialization check (API-based)"), this.isInitialized = !0);
  }
  async searchTags(n, s = 20, a = !1, t = []) {
    const i = new URLSearchParams({
      q: n,
      limit: s.toString(),
      use_aliases: a.toString(),
      categories: t.join(",")
    });
    try {
      const r = await fetch(`/simple-prompt/search-tags?${i.toString()}`);
      if (!r.ok)
        throw new Error(`HTTP error! status: ${r.status}`);
      const d = await r.json();
      return a && d.length > 0 ? d.map((c) => {
        if (c.name && c.name.toLowerCase().includes(n.toLowerCase()))
          return c;
        const f = Array.isArray(c.alias) ? c.alias : [];
        if (f.length > 0) {
          const h = f.find(
            (m) => m && m.toLowerCase().includes(n.toLowerCase())
          );
          if (h)
            return { ...c, matched_alias: h };
        }
        return c;
      }) : d;
    } catch (r) {
      return console.error("[DuckDB] Search failed via API:", r), [];
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
se(me, "instance");
let ve = me;
function ni(e, n) {
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
  ], a = document.createElement("div");
  a.id = "input-textarea-caret-position-mirror-div", document.body.appendChild(a);
  const t = a.style, i = window.getComputedStyle(e);
  t.whiteSpace = "pre-wrap", e.nodeName !== "INPUT" && (t.wordWrap = "break-word"), t.position = "absolute", t.visibility = "hidden", s.forEach((c) => {
    t[c] = i[c];
  }), navigator.userAgent.toLowerCase().indexOf("firefox") > -1 ? e.scrollHeight > parseInt(i.height) && (t.overflowY = "scroll") : t.overflow = "hidden", a.textContent = e.value.substring(0, n), e.nodeName === "INPUT" && (a.textContent = a.textContent.replace(/\s/g, " "));
  const r = document.createElement("span");
  r.textContent = e.value.substring(n) || ".", a.appendChild(r);
  const d = {
    top: r.offsetTop + parseInt(i.borderTopWidth),
    left: r.offsetLeft + parseInt(i.borderLeftWidth),
    height: parseInt(i.lineHeight)
  };
  return document.body.removeChild(a), d;
}
const oi = { class: "autocomplete-list" }, ai = {
  key: 0,
  class: "loading-item"
}, ii = {
  key: 1,
  class: "no-results"
}, li = ["onClick"], ri = { class: "item-left" }, ci = { class: "item-name" }, ui = {
  key: 0,
  class: "item-alias"
}, di = { class: "item-right" }, fi = { class: "item-count" }, gi = /* @__PURE__ */ oe({
  __name: "AutocompleteList",
  props: {
    items: {},
    selectedIndex: {},
    loading: { type: Boolean }
  },
  emits: ["select"],
  setup(e, { emit: n }) {
    const s = n, { t: a } = ue(), t = (d) => {
      s("select", d);
    }, i = (d) => X.getInstance().getColor(d), r = (d) => {
      const c = Number(d);
      return c >= 1e6 ? (c / 1e6).toFixed(1) + "M" : c >= 1e3 ? (c / 1e3).toFixed(1) + "k" : c.toString();
    };
    return (d, c) => (k(), x("div", oi, [
      d.loading ? (k(), x("div", ai, [
        A(l(M), {
          icon: "mdi:loading",
          class: "spin"
        }),
        J(" " + v(l(a)("editor.loading")), 1)
      ])) : d.items.length === 0 ? (k(), x("div", ii, v(l(a)("editor.noMatches")), 1)) : (k(!0), x(Z, { key: 2 }, te(d.items, (u, f) => (k(), x("div", {
        key: u.name,
        class: fe(["menu-item", { selected: f === d.selectedIndex }]),
        onClick: (h) => t(u),
        onMousedown: c[0] || (c[0] = de(() => {
        }, ["prevent"]))
      }, [
        o("div", ri, [
          o("div", {
            class: "category-dot",
            style: le({ backgroundColor: i(u.category) })
          }, null, 4),
          o("span", ci, v(u.name), 1),
          u.alias_match ? (k(), x("span", ui, "(" + v(u.alias_match) + ")", 1)) : B("", !0)
        ]),
        o("div", di, [
          o("span", fi, v(r(u.post_count)), 1)
        ])
      ], 42, li))), 128))
    ]));
  }
}), pi = /* @__PURE__ */ ce(gi, [["__scopeId", "data-v-7fa181e7"]]), hi = {
  key: 0,
  class: "tag-weight"
}, mi = ["title"], vi = { class: "weight-value" }, yi = ["title"], _i = ["title"], bi = /* @__PURE__ */ oe({
  __name: "TagItem",
  props: {
    tag: {}
  },
  emits: ["remove", "update:weight", "toggle:enabled"],
  setup(e, { emit: n }) {
    const s = e, a = n, { t } = ue(), i = _e(() => X.getInstance().getColor(s.tag.category || 0)), r = _e(() => s.tag.weight !== 1), d = () => {
      a("remove", s.tag.id);
    }, c = () => {
      a("toggle:enabled", s.tag.id);
    }, u = () => {
      const D = Math.min(s.tag.weight + 0.1, 2);
      a("update:weight", s.tag.id, parseFloat(D.toFixed(1)));
    }, f = () => {
      const D = Math.max(s.tag.weight - 0.1, 0.1);
      a("update:weight", s.tag.id, parseFloat(D.toFixed(1)));
    }, h = E(!1), m = E(null), b = E(""), g = async () => {
      var D, R;
      b.value = s.tag.weight.toString(), h.value = !0, await Pe(), (D = m.value) == null || D.focus(), (R = m.value) == null || R.select();
    }, P = () => {
      if (!h.value) return;
      const D = parseFloat(b.value);
      !isNaN(D) && D >= 0 && a("update:weight", s.tag.id, parseFloat(D.toFixed(2))), h.value = !1;
    }, T = (D) => {
      D.key === "Enter" ? P() : D.key === "Escape" && (h.value = !1);
    };
    return (D, R) => (k(), x("div", {
      class: fe(["tag-item", { disabled: !D.tag.enabled }]),
      style: le({ "--category-color": i.value }),
      onDblclick: de(g, ["stop"])
    }, [
      R[2] || (R[2] = o("div", { class: "tag-dot" }, null, -1)),
      o("span", {
        class: "tag-text",
        onClick: c
      }, v(D.tag.text), 1),
      r.value && !h.value ? (k(), x("div", hi, [
        o("button", {
          class: "weight-btn",
          onClick: f,
          title: l(t)("editor.decreaseWeight")
        }, [
          A(l(M), { icon: "mdi:minus" })
        ], 8, mi),
        o("span", vi, v(D.tag.weight.toFixed(1)), 1),
        o("button", {
          class: "weight-btn",
          onClick: u,
          title: l(t)("editor.increaseWeight")
        }, [
          A(l(M), { icon: "mdi:plus" })
        ], 8, yi)
      ])) : B("", !0),
      h.value ? G((k(), x("input", {
        key: 1,
        ref_key: "weightInput",
        ref: m,
        "onUpdate:modelValue": R[0] || (R[0] = (U) => b.value = U),
        class: "weight-input",
        onBlur: P,
        onKeydown: T,
        onClick: R[1] || (R[1] = de(() => {
        }, ["stop"]))
      }, null, 544)), [
        [ee, b.value]
      ]) : B("", !0),
      o("button", {
        class: "tag-remove",
        onClick: d,
        title: l(t)("editor.removeTag")
      }, [
        A(l(M), { icon: "mdi:close" })
      ], 8, _i)
    ], 38));
  }
}), wi = /* @__PURE__ */ ce(bi, [["__scopeId", "data-v-345c51c4"]]), ki = { class: "visual-tag-area" }, Ci = {
  key: 0,
  class: "empty-state"
}, Ti = {
  key: 1,
  class: "tags-scroller"
}, $i = ["onDragstart", "onDragenter"], xi = /* @__PURE__ */ oe({
  __name: "VisualTagArea",
  props: {
    tags: {}
  },
  emits: ["update:tags"],
  setup(e, { emit: n }) {
    const s = e, a = n, t = E([]), i = E(null);
    ae(() => s.tags, (b) => {
      i.value === null && (t.value = [...b]);
    }, { immediate: !0 });
    const r = (b) => {
      const g = t.value.filter((P) => P.id !== b);
      t.value = g, a("update:tags", g);
    }, d = (b, g) => {
      const P = t.value.map(
        (T) => T.id === b ? { ...T, weight: g } : T
      );
      t.value = P, a("update:tags", P);
    }, c = (b) => {
      const g = t.value.map(
        (P) => P.id === b ? { ...P, enabled: !P.enabled } : P
      );
      t.value = g, a("update:tags", g);
    }, u = (b, g) => {
      i.value = g, b.dataTransfer && (b.dataTransfer.effectAllowed = "move");
    }, f = (b) => {
      b.preventDefault(), b.dataTransfer && (b.dataTransfer.dropEffect = "move");
    }, h = (b) => {
      if (i.value !== null && i.value !== b) {
        const g = i.value, P = b, T = t.value[g], D = [...t.value];
        D.splice(g, 1), D.splice(P, 0, T), t.value = D, i.value = P;
      }
    }, m = () => {
      i.value !== null && (a("update:tags", t.value), i.value = null);
    };
    return (b, g) => (k(), x("div", ki, [
      t.value.length === 0 ? (k(), x("div", Ci, g[0] || (g[0] = [
        o("p", null, "No tags yet. Start typing in the editor...", -1)
      ]))) : (k(), x("div", Ti, [
        A(Ht, {
          name: "tag-list",
          tag: "div",
          class: "tags-container"
        }, {
          default: we(() => [
            (k(!0), x(Z, null, te(t.value, (P, T) => (k(), x("div", {
              key: P.id,
              class: "tag-wrapper",
              draggable: "true",
              onDragstart: (D) => u(D, T),
              onDragover: f,
              onDragenter: (D) => h(T),
              onDragend: m
            }, [
              A(wi, {
                tag: P,
                onRemove: r,
                "onUpdate:weight": d,
                "onToggle:enabled": c
              }, null, 8, ["tag"])
            ], 40, $i))), 128))
          ]),
          _: 1
        })
      ]))
    ]));
  }
}), Ii = /* @__PURE__ */ ce(xi, [["__scopeId", "data-v-5d3d64b5"]]), Si = { class: "toolbar" }, Ei = ["title"], Ai = ["title"], Pi = { class: "switch-group" }, Mi = { class: "switch-label" }, Li = { class: "switch" }, Di = ["checked"], Ri = ["title"], Oi = {
  key: 0,
  class: "meta-popup"
}, Fi = { class: "meta-search-box" }, ji = ["placeholder"], Ni = { class: "meta-list-scroll" }, Ui = ["onClick"], Vi = { class: "meta-name" }, Bi = {
  key: 0,
  class: "meta-empty"
}, zi = { class: "meta-footer" }, Hi = { class: "meta-footer-hint" }, Wi = { class: "tag-count" }, Gi = /* @__PURE__ */ oe({
  __name: "OtherFunctions",
  props: {
    tagCount: {},
    autoMeta: { type: Boolean }
  },
  emits: ["open-search", "format", "organize", "update:autoMeta", "insert-meta"],
  setup(e, { emit: n }) {
    const { t: s } = ue(), a = E(!1), t = E(null), i = E(""), r = () => {
      a.value = !a.value, a.value && (W.fetchPresets(), i.value = "");
    }, d = (f) => {
      t.value && !t.value.contains(f.target) && (a.value = !1);
    };
    xe(() => {
      document.addEventListener("click", d), W.fetchPresets();
    }), Le(() => {
      document.removeEventListener("click", d);
    });
    const c = _e(() => {
      const f = i.value.toLowerCase().trim();
      return f ? W.presets.value.filter((h) => h.name.toLowerCase().includes(f)) : W.presets.value;
    }), u = (f) => {
      W.setActivePreset(f), a.value = !1;
    };
    return (f, h) => (k(), x("div", Si, [
      o("button", {
        class: "toolbar-btn",
        onClick: h[0] || (h[0] = (m) => f.$emit("format")),
        title: l(s)("editor.formatTitle") || "Format Text"
      }, [
        A(l(M), { icon: "mdi:format-align-left" }),
        o("span", null, v(l(s)("editor.format") || "Format"), 1)
      ], 8, Ei),
      o("button", {
        class: "toolbar-btn",
        onClick: h[1] || (h[1] = (m) => f.$emit("organize")),
        title: l(s)("editor.organizeTitle") || "Organize Tags"
      }, [
        A(l(M), { icon: "mdi:sort" }),
        o("span", null, v(l(s)("editor.organize") || "Organize"), 1)
      ], 8, Ai),
      h[6] || (h[6] = o("div", { class: "separator" }, null, -1)),
      o("div", Pi, [
        o("label", Mi, v(l(s)("editor.autoMeta") || "Auto Meta"), 1),
        o("label", Li, [
          o("input", {
            type: "checkbox",
            checked: f.autoMeta,
            onChange: h[2] || (h[2] = (m) => f.$emit("update:autoMeta", m.target.checked))
          }, null, 40, Di),
          h[5] || (h[5] = o("span", { class: "slider" }, null, -1))
        ])
      ]),
      o("div", {
        class: "meta-menu-wrapper",
        ref_key: "metaMenuRef",
        ref: t
      }, [
        o("button", {
          class: "toolbar-btn icon-only",
          onClick: de(r, ["stop"]),
          title: l(s)("editor.qualityWords") || "Select Meta Preset"
        }, [
          A(l(M), { icon: "mdi:cog" })
        ], 8, Ri),
        a.value ? (k(), x("div", Oi, [
          o("div", Fi, [
            G(o("input", {
              "onUpdate:modelValue": h[3] || (h[3] = (m) => i.value = m),
              placeholder: l(s)("settings.meta.searchPlaceholder"),
              class: "meta-search-input"
            }, null, 8, ji), [
              [ee, i.value]
            ])
          ]),
          o("div", Ni, [
            (k(!0), x(Z, null, te(c.value, (m) => (k(), x("div", {
              key: m.id,
              class: fe(["meta-item", { active: l(W).activePresetId.value === m.id }]),
              onClick: (b) => u(m.id)
            }, [
              o("span", Vi, v(m.name), 1),
              l(W).activePresetId.value === m.id ? (k(), re(l(M), {
                key: 0,
                icon: "mdi:check"
              })) : B("", !0)
            ], 10, Ui))), 128)),
            c.value.length === 0 ? (k(), x("div", Bi, v(l(s)("settings.meta.noPresetsFound")), 1)) : B("", !0)
          ]),
          o("div", zi, [
            o("span", Hi, v(l(s)("settings.meta.editInSettings")), 1)
          ])
        ])) : B("", !0)
      ], 512),
      h[7] || (h[7] = o("div", { class: "separator" }, null, -1)),
      o("button", {
        class: "toolbar-btn",
        onClick: h[4] || (h[4] = (m) => f.$emit("open-search"))
      }, [
        A(l(M), { icon: "mdi:magnify" }),
        o("span", null, v(l(s)("editor.searchBtn")), 1)
      ]),
      h[8] || (h[8] = o("div", { class: "separator" }, null, -1)),
      o("div", Wi, [
        A(l(M), { icon: "mdi:tag-multiple" }),
        o("span", null, v(l(s)("editor.tagCount")) + v(f.tagCount || 0), 1)
      ])
    ]));
  }
}), qi = /* @__PURE__ */ ce(Gi, [["__scopeId", "data-v-92303e18"]]), Qi = { class: "modal-container" }, Ki = { class: "modal-header" }, Ji = { class: "modal-title" }, Yi = ["title"], Xi = { class: "search-section" }, Zi = { class: "search-box" }, el = ["placeholder"], tl = { class: "category-filters" }, sl = { class: "filter-label" }, nl = ["onClick"], ol = { class: "results-section" }, al = {
  key: 0,
  class: "loading-state"
}, il = {
  key: 1,
  class: "empty-state"
}, ll = {
  key: 2,
  class: "results-list"
}, rl = ["onClick"], cl = { class: "tag-info" }, ul = { class: "tag-name-row" }, dl = { class: "tag-name" }, fl = ["innerHTML"], gl = ["innerHTML"], pl = ["innerHTML"], hl = { class: "tag-meta" }, ml = { class: "category-label" }, vl = { class: "post-count" }, yl = { class: "actions" }, _l = ["onClick", "title"], bl = ["title"], wl = {
  key: 3,
  class: "hint-state"
}, kl = /* @__PURE__ */ oe({
  __name: "TagSearchModal",
  props: {
    visible: { type: Boolean }
  },
  emits: ["close", "add-tag"],
  setup(e, { emit: n }) {
    const s = e, { t: a } = ue(), t = n, i = E(""), r = E([]), d = E(!1), c = E([]), u = _e(() => {
      const C = X.getInstance().getAll();
      return C.length === 0 ? [] : C.map((y) => ({
        value: y.value,
        label: y.value <= 5 ? a(`search.categories.${y.label.toLowerCase()}`) : y.label,
        color: y.color
      }));
    }), f = (p) => {
      const C = c.value.indexOf(p);
      C > -1 ? c.value.splice(C, 1) : c.value.push(p), i.value.trim() && m();
    }, h = (p) => c.value.includes(p), m = async () => {
      const p = i.value.trim();
      if (!p || p.length < 2) {
        r.value = [];
        return;
      }
      d.value = !0;
      try {
        const y = await ve.getInstance().searchTags(p, 50, !0, c.value);
        r.value = y;
      } catch (C) {
        console.error("Search error:", C), r.value = [];
      } finally {
        d.value = !1;
      }
    };
    let b = null;
    const g = () => {
      b && clearTimeout(b), b = setTimeout(() => {
        m();
      }, 300);
    }, P = (p) => {
      t("add-tag", p.name, p.category);
    }, T = () => {
      t("close");
    };
    ae(() => s.visible, (p) => {
      p ? X.getInstance().init() : (i.value = "", r.value = [], c.value = []);
    });
    const D = (p) => {
      const y = X.getInstance().getCategory(p);
      return y.value <= 5 ? a(`search.categories.${y.label.toLowerCase()}`) : y.label;
    }, R = (p) => X.getInstance().getColor(p), U = (p) => (p == null ? void 0 : p.toLocaleString()) || "0", $ = (p, C) => {
      if (!C || !p) return p;
      const y = new RegExp(`(${C.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
      return p.replace(y, '<strong class="match-bold">$1</strong>');
    }, O = (p) => p.priority === 1, w = async (p, C) => {
      C.stopPropagation();
      const y = O(p);
      p.priority = y ? 4 : 1;
      try {
        const _ = {
          name: p.name,
          is_liked: !y,
          category: p.category,
          post_count: p.post_count,
          alias: p.alias
        };
        await fetch("/simple-prompt/toggle-like-tag", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(_)
        });
      } catch (_) {
        console.error("Toggle like failed", _), p.priority = y ? 1 : 4;
      }
    };
    return (p, C) => (k(), re(De, { name: "fade" }, {
      default: we(() => [
        p.visible ? (k(), x("div", {
          key: 0,
          class: "modal-overlay",
          onClick: de(T, ["self"])
        }, [
          o("div", Qi, [
            o("div", Ki, [
              o("div", Ji, [
                A(l(M), {
                  icon: "mdi:database-search",
                  class: "title-icon"
                }),
                o("span", null, v(l(a)("search.title")), 1)
              ]),
              o("button", {
                class: "close-btn",
                onClick: T,
                title: l(a)("common.close")
              }, [
                A(l(M), { icon: "mdi:close" })
              ], 8, Yi)
            ]),
            o("div", Xi, [
              o("div", Zi, [
                A(l(M), {
                  icon: "mdi:magnify",
                  class: "search-icon"
                }),
                G(o("input", {
                  "onUpdate:modelValue": C[0] || (C[0] = (y) => i.value = y),
                  type: "text",
                  placeholder: l(a)("search.placeholder"),
                  class: "search-input",
                  onInput: g,
                  autofocus: ""
                }, null, 40, el), [
                  [ee, i.value]
                ]),
                i.value ? (k(), x("button", {
                  key: 0,
                  class: "clear-btn",
                  onClick: C[1] || (C[1] = (y) => {
                    i.value = "", r.value = [];
                  }),
                  title: "Clear"
                }, [
                  A(l(M), { icon: "mdi:close-circle" })
                ])) : B("", !0)
              ]),
              o("div", tl, [
                o("span", sl, v(l(a)("search.filterLabel")), 1),
                (k(!0), x(Z, null, te(u.value, (y) => (k(), x("button", {
                  key: y.value,
                  class: fe(["category-chip", { active: h(y.value) }]),
                  style: le({ "--category-color": y.color }),
                  onClick: (_) => f(y.value)
                }, [
                  o("span", {
                    class: "category-dot",
                    style: le({ backgroundColor: y.color })
                  }, null, 4),
                  J(" " + v(y.label), 1)
                ], 14, nl))), 128))
              ])
            ]),
            o("div", ol, [
              d.value ? (k(), x("div", al, [
                A(l(M), {
                  icon: "mdi:loading",
                  class: "spin"
                }),
                o("span", null, v(l(a)("search.loading")), 1)
              ])) : r.value.length === 0 && i.value.trim() ? (k(), x("div", il, [
                A(l(M), { icon: "mdi:magnify-close" }),
                o("p", null, v(l(a)("search.noResults")), 1)
              ])) : r.value.length > 0 ? (k(), x("div", ll, [
                (k(!0), x(Z, null, te(r.value, (y) => (k(), x("div", {
                  key: y.name,
                  class: "result-item",
                  style: le({ "--cat-color": R(y.category) }),
                  onClick: (_) => P(y)
                }, [
                  o("div", cl, [
                    o("div", ul, [
                      C[2] || (C[2] = o("span", { class: "category-indicator" }, null, -1)),
                      o("span", dl, [
                        y.matched_alias ? (k(), x(Z, { key: 1 }, [
                          o("span", {
                            innerHTML: $(y.name, i.value)
                          }, null, 8, gl),
                          o("span", {
                            class: "alias-indicator",
                            innerHTML: $(y.matched_alias, i.value)
                          }, null, 8, pl)
                        ], 64)) : (k(), x("span", {
                          key: 0,
                          innerHTML: $(y.name, i.value)
                        }, null, 8, fl))
                      ])
                    ]),
                    o("div", hl, [
                      o("span", ml, v(D(y.category)), 1),
                      o("span", vl, [
                        A(l(M), { icon: "mdi:image-multiple" }),
                        J(" " + v(U(y.post_count)), 1)
                      ])
                    ])
                  ]),
                  o("div", yl, [
                    o("button", {
                      class: fe(["action-btn like-btn", { liked: O(y) }]),
                      onClick: (_) => w(y, _),
                      title: O(y) ? "Unlike" : "Like"
                    }, [
                      A(l(M), {
                        icon: O(y) ? "mdi:heart" : "mdi:heart-outline"
                      }, null, 8, ["icon"])
                    ], 10, _l),
                    o("button", {
                      class: "action-btn add-btn",
                      title: l(a)("search.addBtnTitle")
                    }, [
                      A(l(M), { icon: "mdi:plus" })
                    ], 8, bl)
                  ])
                ], 12, rl))), 128))
              ])) : (k(), x("div", wl, [
                A(l(M), { icon: "mdi:information-outline" }),
                o("p", null, v(l(a)("search.hint")), 1)
              ]))
            ])
          ])
        ])) : B("", !0)
      ]),
      _: 1
    }));
  }
}), Cl = /* @__PURE__ */ ce(kl, [["__scopeId", "data-v-c0eb3703"]]);
function ie(e) {
  if (!e.trim()) return [];
  const n = [];
  let s = 0, a = 0, t = "", i = "", r = "";
  for (; a < e.length; ) {
    const d = e[a];
    if (d === "\\" && a + 1 < e.length) {
      const c = e[a + 1];
      if (c === "(" || c === ")") {
        t += c, a += 2;
        continue;
      } else {
        t += d, a++;
        continue;
      }
    }
    if (d === "(") {
      t.trim() && (n.push({
        id: `tag-${s++}`,
        text: t.trim(),
        weight: 1,
        enabled: !0,
        category: K.GENERAL
      }), t = "");
      let c = 1, u = a + 1;
      for (; u < e.length && c > 0; ) {
        if (e[u] === "\\" && u + 1 < e.length) {
          u += 2;
          continue;
        }
        e[u] === "(" && c++, e[u] === ")" && c--, u++;
      }
      if (c === 0) {
        const f = e.substring(a + 1, u - 1), h = f.indexOf(":");
        if (h > 0) {
          r = f.substring(0, h).trim(), i = f.substring(h + 1).trim();
          const m = parseFloat(i);
          !isNaN(m) && r && n.push({
            id: `tag-${s++}`,
            text: r,
            weight: m,
            enabled: !0,
            category: K.GENERAL
          });
        } else
          t += e.substring(a, u);
        a = u;
        continue;
      }
    }
    if (d === "," || d === `
`) {
      t.trim() && (n.push({
        id: `tag-${s++}`,
        text: t.trim(),
        weight: 1,
        enabled: !0,
        category: K.GENERAL
      }), t = ""), a++;
      continue;
    }
    t += d, a++;
  }
  return t.trim() && n.push({
    id: `tag-${s++}`,
    text: t.trim(),
    weight: 1,
    enabled: !0,
    category: K.GENERAL
  }), n;
}
function Ve(e) {
  const n = e.filter((s) => s.enabled);
  return n.length === 0 ? "" : n.map((s) => {
    const a = s.text.replace(/\(/g, "\\(").replace(/\)/g, "\\)");
    return s.weight !== 1 ? `(${a}:${s.weight.toFixed(1)})` : a;
  }).join(", ") + ",";
}
function Tl(e, n, s) {
  if (!n.length) return e;
  const a = new Set(n.map(($) => $.toLowerCase())), t = new Set(s.map(($) => $.toLowerCase())), i = [];
  let r = 0, d = 0, c = "";
  const u = ($, O, w, p) => {
    const C = $.trim();
    if (!C) return;
    const y = C.match(/^\((.+):(\d+\.?\d*)\)$/);
    let _ = C, I = 1;
    y && (_ = y[1].trim(), I = parseFloat(y[2]));
    const q = _.replace(/\\([()])/g, "$1");
    i.push({
      text: q,
      fullMatch: O,
      start: w,
      end: p,
      weight: I
    });
  };
  for (; r < e.length; ) {
    const $ = e[r];
    if ($ === "(" && c.trim() === "") {
      let O = 1, w = r + 1;
      for (; w < e.length && O > 0; ) {
        if (e[w] === "\\" && w + 1 < e.length) {
          w += 2;
          continue;
        }
        e[w] === "(" && O++, e[w] === ")" && O--, w++;
      }
      if (O === 0) {
        const p = e.substring(r, w);
        e.substring(r + 1, w - 1), u(p, p, r, w), r = w, d = w, c = "";
        continue;
      }
    }
    if ($ === "\\" && r + 1 < e.length) {
      c += $ + e[r + 1], r += 2;
      continue;
    }
    if ($ === "," || $ === `
`) {
      c.trim() && u(c.trim(), c, d, r), r++, d = r, c = "";
      continue;
    }
    c += $, r++;
  }
  c.trim() && u(c.trim(), c, d, r);
  const f = [], h = /* @__PURE__ */ new Map();
  let m = e.length;
  for (const $ of i) {
    const O = $.text.toLowerCase();
    a.has(O) && (f.push($), h.set(O, $.weight)), t.has(O) && $.start < m && (m = $.start);
  }
  const b = [...f].sort(($, O) => O.start - $.start);
  let g = e;
  for (const $ of b) {
    let O = $.start, w = $.end;
    for (; O > 0 && /[\s,]/.test(g[O - 1]); )
      O--;
    for (; w < g.length && g[w] === " "; )
      w++;
    if (w < g.length && g[w] === ",")
      for (w++; w < g.length && g[w] === " "; )
        w++;
    const p = g.substring(0, O), C = g.substring(w);
    g = p + C;
    const y = w - O;
    m > $.start && (m -= y);
  }
  g = g.replace(/,\s*,/g, ","), g = g.replace(/,\s*\n/g, `,
`), g = g.replace(/\n\s*,/g, `
`);
  const P = n.map(($) => {
    const O = h.get($.toLowerCase()) || 1, w = $.replace(/\(/g, "\\(").replace(/\)/g, "\\)");
    return O !== 1 ? `(${w}:${O.toFixed(1)})` : w;
  }).join(", ") + ",", T = ie(g);
  let D = g.length;
  for (let $ = 0; $ < T.length; $++) {
    const O = T[$].text.toLowerCase();
    if (t.has(O)) {
      for (const w of s) {
        const p = w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), C = new RegExp(`(^|[,\\n\\s])${p}([,\\n]|$)`, "i"), y = g.match(C);
        if (y && y.index !== void 0) {
          const _ = y.index + y[1].length;
          _ < D && (D = _);
        }
      }
      break;
    }
  }
  let R = g.substring(0, D).trimEnd(), U = g.substring(D);
  return R && !R.endsWith(",") && !R.endsWith(`
`) && (R += ","), R && !R.endsWith(`

`) && (R.endsWith(`
`) ? R += `
` : R += `

`), U.trim() && !U.startsWith(`
`) && (U = `

` + U.trimStart()), R + P + U;
}
const $l = { class: "sp-toolbar" }, xl = ["title"], Il = ["title"], Sl = ["placeholder"], El = { class: "sp-visual-area" }, Al = { class: "sp-footer" }, Pl = /* @__PURE__ */ oe({
  __name: "TextEditor",
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue", "cursor-move", "open-custom-tag"],
  setup(e, { expose: n, emit: s }) {
    const a = e, t = s, { t: i } = ue(), r = E(null), d = E(null), c = E(a.modelValue), u = E([]), f = E(60), h = E(!1), m = E({}), b = /* @__PURE__ */ new Set();
    let g = null;
    const P = () => {
      g && clearTimeout(g), g = setTimeout(async () => {
        const S = Array.from(b);
        if (b.clear(), S.length !== 0)
          try {
            const j = await ve.getInstance().getTagsDetails(S);
            Object.entries(j).forEach(([F, N]) => {
              m.value[F.toLowerCase()] = N;
            }), S.forEach((F) => {
              const N = F.toLowerCase();
              m.value[N] === void 0 && (m.value[N] = 0);
            }), u.value = u.value.map((F) => {
              const N = F.text.toLowerCase();
              return m.value[N] !== void 0 ? { ...F, category: m.value[N] } : F;
            });
          } catch (L) {
            console.error("Error fetching tag categories:", L);
          }
      }, 1e3);
    }, T = (S) => (S.forEach((L) => {
      const j = L.text.toLowerCase();
      m.value[j] !== void 0 ? L.category = m.value[j] : b.add(L.text);
    }), b.size > 0 && P(), S);
    u.value = T(ie(c.value));
    const D = E(!1), R = E([]), U = E(0), $ = E({ top: 0, left: 0 }), O = E(""), w = E(0), p = E(!1), C = E(!1);
    ae(() => a.modelValue, (S) => {
      S !== c.value && (c.value = S, u.value = T(ie(S)));
    });
    const y = (S) => {
      const L = S.target;
      c.value = L.value, t("update:modelValue", L.value), u.value = T(ie(L.value)), Fe(L);
    }, _ = async () => {
      try {
        await navigator.clipboard.writeText(c.value), console.log("Copied to clipboard");
      } catch (S) {
        console.error("Failed to copy: ", S);
      }
    }, I = (S) => {
      h.value = !0, document.addEventListener("mousemove", q), document.addEventListener("mouseup", Y), document.body.style.userSelect = "none";
    }, q = (S) => {
      if (!h.value || !d.value) return;
      const L = d.value.getBoundingClientRect();
      let F = (S.clientY - L.top) / L.height * 100;
      F < 20 && (F = 20), F > 80 && (F = 80), f.value = F;
    }, Y = () => {
      h.value = !1, document.removeEventListener("mousemove", q), document.removeEventListener("mouseup", Y), document.body.style.userSelect = "";
    };
    Le(() => {
      document.removeEventListener("mousemove", q), document.removeEventListener("mouseup", Y);
    });
    const Fe = async (S) => {
      const L = S.selectionEnd, j = S.value.substring(0, L), F = /([a-zA-Z0-9_\u4e00-\u9fa5]{2,})$/.exec(j);
      if (F) {
        const N = F[1];
        O.value = N, w.value = F.index;
        const V = ni(S, L);
        $.value = {
          top: V.top + V.height + 5,
          // 5px padding
          left: V.left
        }, p.value = !0, D.value = !0;
        try {
          console.log(`[Autocomplete] Searching for: "${N}"`);
          const Q = await ve.getInstance().searchTags(N, 20, H.useAliasesInAutocomplete);
          R.value = Q, U.value = 0;
        } catch (z) {
          console.error("Autocomplete search error:", z);
        } finally {
          p.value = !1;
        }
      } else
        D.value = !1;
    }, ge = (S) => {
      if (D.value && R.value.length > 0) {
        if (S.key === "ArrowUp") {
          S.preventDefault(), U.value = (U.value - 1 + R.value.length) % R.value.length;
          return;
        }
        if (S.key === "ArrowDown") {
          S.preventDefault(), U.value = (U.value + 1) % R.value.length;
          return;
        }
        if (S.key === "Tab" || S.key === "Enter") {
          S.preventDefault(), Ye(R.value[U.value]);
          return;
        }
        if (S.key === "Escape") {
          S.preventDefault(), D.value = !1;
          return;
        }
      }
    }, Ye = (S) => {
      if (!r.value) return;
      const L = r.value, j = L.selectionEnd, F = c.value;
      let N = S.name;
      S.category !== void 0 && (m.value[N.toLowerCase()] = S.category), H.convertUnderscoreToSpace && (N = N.replace(/_/g, " "), S.category !== void 0 && (m.value[N.toLowerCase()] = S.category)), H.escapeBrackets && (N = N.replace(/\(/g, "\\(").replace(/\)/g, "\\)"));
      const V = F.substring(0, w.value), z = F.substring(j);
      let Q = z;
      !z.trim().startsWith(",") && !z.trim().startsWith(")") && (Q = ", " + z);
      const Ie = V + N + Q;
      c.value = Ie, t("update:modelValue", Ie), u.value = T(ie(Ie)), D.value = !1, Pe(() => {
        const Ze = V.length + N.length + (Q.startsWith(", ") ? 2 : 0);
        L.setSelectionRange(Ze, Ze), L.focus();
      });
    }, St = () => {
      setTimeout(() => {
        D.value = !1;
      }, 200);
    }, Et = () => {
      C.value = !0;
    }, At = () => {
      C.value = !1;
    }, Pt = (S, L) => {
      let j = S;
      m.value[S.toLowerCase()] = L, H.convertUnderscoreToSpace && (j = j.replace(/_/g, " "), m.value[j.toLowerCase()] = L), H.escapeBrackets && (j = j.replace(/\(/g, "\\(").replace(/\)/g, "\\)"));
      const F = {
        id: `tag-${Date.now()}-${Math.random()}`,
        text: j,
        weight: 1,
        enabled: !0,
        category: L
      }, N = [...u.value, F];
      u.value = N;
      const V = Ve(N);
      c.value = V, t("update:modelValue", V);
    }, Mt = () => {
      var S;
      (S = r.value) == null || S.focus();
    }, Lt = () => {
      let S = c.value;
      S = S.replace(/,(\S)/g, ", $1"), S !== c.value && (c.value = S, t("update:modelValue", S), u.value = T(ie(S)));
    }, Dt = (S) => {
      const L = {
        6: 0,
        4: 1,
        2: 1,
        3: 1,
        1: 2,
        0: 3,
        5: 4,
        7: 4
      };
      return L[S] !== void 0 ? L[S] : 3;
    }, Xe = (S) => {
      if (S.length === 0) return "";
      const L = { 0: [], 1: [], 2: [], 3: [], 4: [] };
      S.forEach((V) => {
        const z = V.category !== void 0 ? V.category : 0, Q = Dt(z);
        L[Q].push(V);
      }), L[1].sort((V, z) => {
        const Q = V.category !== void 0 ? V.category : 0;
        return (z.category !== void 0 ? z.category : 0) - Q;
      });
      const j = [0, 1, 2, 3, 4].map((V) => {
        const z = L[V];
        return z.length === 0 ? "" : Ve(z);
      });
      let F = "";
      const N = j.slice(0, 3).filter((V) => V).join(`
`);
      return N && (F += N), F && j[3] && (F += `

`), j[3] && (F += j[3]), F && j[4] && (F += `

`), j[4] && (F += j[4]), F;
    }, Rt = (S) => {
      u.value = S;
      const j = S.some((F) => F.category !== void 0 && F.category !== 0) ? Xe(S) : Ve(S);
      j !== c.value && (c.value = j, t("update:modelValue", j));
    }, Ot = async () => {
      const S = ie(c.value), L = T(S);
      if (b.size > 0) {
        g && clearTimeout(g);
        const F = Array.from(b);
        b.clear();
        try {
          const V = await ve.getInstance().getTagsDetails(F);
          Object.entries(V).forEach(([z, Q]) => {
            m.value[z.toLowerCase()] = Q;
          }), F.forEach((z) => {
            const Q = z.toLowerCase();
            m.value[Q] === void 0 && (m.value[Q] = 0);
          }), L.forEach((z) => {
            const Q = z.text.toLowerCase();
            m.value[Q] !== void 0 && (z.category = m.value[Q]);
          });
        } catch (N) {
          console.error("Error fetching tag categories during organize:", N);
        }
      }
      const j = Xe(L);
      j !== c.value && (c.value = j, t("update:modelValue", j), u.value = ie(j).map((F) => {
        const N = L.find((V) => V.text === F.text);
        return N ? { ...F, category: N.category } : F;
      }));
    }, Ft = (S) => {
      const L = r.value;
      if (!L) return;
      const j = L.selectionStart, F = L.selectionEnd, N = c.value;
      let V = S;
      const z = N.substring(j - 1, j);
      z && z.trim() && z !== "," ? V = ", " + V : z === "," && (V = " " + V);
      const Q = N.substring(0, j) + V + N.substring(F);
      c.value = Q, t("update:modelValue", Q), u.value = T(ie(Q)), Pe(() => {
        L.focus(), L.setSelectionRange(j + V.length, j + V.length);
      });
    }, jt = (S) => {
      H.autoMetaEnabled = S;
    };
    return n({ focus: Mt }), (S, L) => (k(), x("div", {
      class: "sp-editor-container",
      ref_key: "containerRef",
      ref: d
    }, [
      o("div", $l, [
        o("button", {
          class: "sp-btn",
          onClick: _,
          title: l(i)("editor.copyTitle")
        }, [
          L[2] || (L[2] = o("span", { class: "icon" }, "📋", -1)),
          J(" " + v(l(i)("editor.copy")), 1)
        ], 8, xl),
        o("button", {
          class: "sp-btn",
          onClick: L[0] || (L[0] = (j) => S.$emit("open-custom-tag")),
          title: l(i)("customTag.addBtnTitle")
        }, [
          L[3] || (L[3] = o("span", { class: "icon" }, "➕", -1)),
          J(" " + v(l(i)("customTag.addBtnTitle")), 1)
        ], 8, Il)
      ]),
      o("div", {
        class: "sp-editor-area",
        style: le({ height: `calc(${f.value}% - 40px)` })
      }, [
        G(o("textarea", {
          ref_key: "textareaRef",
          ref: r,
          class: "sp-textarea",
          "onUpdate:modelValue": L[1] || (L[1] = (j) => c.value = j),
          onInput: y,
          onKeydown: ge,
          onBlur: St,
          placeholder: l(i)("editor.placeholder"),
          spellcheck: "false"
        }, null, 40, Sl), [
          [ee, c.value]
        ]),
        D.value ? (k(), x("div", {
          key: 0,
          class: "autocomplete-wrapper",
          style: le({ top: $.value.top + "px", left: $.value.left + "px" })
        }, [
          A(pi, {
            items: R.value,
            "selected-index": U.value,
            loading: p.value,
            onSelect: Ye
          }, null, 8, ["items", "selected-index", "loading"])
        ], 4)) : B("", !0)
      ], 4),
      o("div", {
        class: "sp-splitter",
        onMousedown: I
      }, L[4] || (L[4] = [
        o("div", { class: "sp-splitter-handle" }, null, -1)
      ]), 32),
      o("div", El, [
        A(Ii, {
          tags: u.value,
          "onUpdate:tags": Rt
        }, null, 8, ["tags"])
      ]),
      o("div", Al, [
        A(qi, {
          "tag-count": u.value.length,
          "auto-meta": l(H).autoMetaEnabled,
          onOpenSearch: Et,
          onFormat: Lt,
          onOrganize: Ot,
          "onUpdate:autoMeta": jt,
          onInsertMeta: Ft
        }, null, 8, ["tag-count", "auto-meta"])
      ]),
      A(Cl, {
        visible: C.value,
        onClose: At,
        onAddTag: Pt
      }, null, 8, ["visible"])
    ], 512));
  }
}), Ml = /* @__PURE__ */ ce(Pl, [["__scopeId", "data-v-d361a752"]]), Ll = { style: { width: "100%", height: "100%" } }, Fl = /* @__PURE__ */ oe({
  __name: "App",
  props: {
    initialPrompt: {}
  },
  emits: ["save", "close"],
  setup(e, { emit: n }) {
    const s = e, a = n, t = E(!0), i = E(s.initialPrompt), r = E("Initializing...");
    xe(async () => {
      try {
        await ve.getInstance().init(), await X.getInstance().init(), r.value = "Ready";
      } catch (u) {
        console.error("DB Error:", u), r.value = `Error: ${u}`;
      }
    });
    const d = () => {
      t.value = !1, a("close");
    }, c = async () => {
      let u = i.value;
      if (H.autoMetaEnabled) {
        W.presets.value.length === 0 && await W.fetchPresets();
        const f = W.getActiveTags();
        if (f.length > 0) {
          const m = ie(u).map((g) => g.text);
          let b = [];
          try {
            const P = await (await fetch("/simple-prompt/get-tags-details", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ names: m, fast: !0 })
            })).json();
            b = m.filter(
              (T) => P[T.toLowerCase()] === 7
            );
          } catch (g) {
            console.error("Failed to fetch tag categories:", g);
          }
          u = Tl(u, f, b);
        }
      }
      a("save", u), t.value = !1;
    };
    return (u, f) => (k(), re(si, {
      visible: t.value,
      onClose: d,
      onSave: c
    }, {
      content: we(({ openCustomTag: h }) => [
        o("div", Ll, [
          A(Ml, {
            modelValue: i.value,
            "onUpdate:modelValue": f[0] || (f[0] = (m) => i.value = m),
            onOpenCustomTag: h
          }, null, 8, ["modelValue", "onOpenCustomTag"])
        ])
      ]),
      _: 1
    }, 8, ["visible"]));
  }
});
export {
  Fl as default
};
