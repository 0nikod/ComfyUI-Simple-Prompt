var Nt = Object.defineProperty;
var Ut = (e, o, s) => o in e ? Nt(e, o, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[o] = s;
var se = (e, o, s) => Ut(e, typeof o != "symbol" ? o + "" : o, s);
import { defineComponent as oe, ref as E, shallowRef as Vt, onMounted as xe, watch as ae, onUnmounted as Le, h as et, nextTick as Pe, reactive as gt, createBlock as re, openBlock as k, Transition as De, withCtx as we, createElementBlock as I, createCommentVNode as z, withModifiers as de, createElementVNode as n, createVNode as A, unref as l, toDisplayString as m, withDirectives as G, createTextVNode as J, vModelText as Z, vModelSelect as qe, Fragment as ee, renderList as te, normalizeStyle as le, computed as ve, withKeys as Bt, normalizeClass as fe, vModelCheckbox as _e, renderSlot as zt, TransitionGroup as Ht } from "./vue.runtime.esm-bundler-C8DxJOnH.mjs";
import { u as ue } from "./vue-i18n-DxZpRF9a.mjs";
const pt = /^[a-z0-9]+(-[a-z0-9]+)*$/, Re = (e, o, s, a = "") => {
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
    return o && !Se(u) ? null : u;
  }
  const i = t[0], r = i.split("-");
  if (r.length > 1) {
    const d = {
      provider: a,
      prefix: r.shift(),
      name: r.join("-")
    };
    return o && !Se(d) ? null : d;
  }
  if (s && a === "") {
    const d = {
      provider: a,
      prefix: "",
      name: i
    };
    return o && !Se(d, s) ? null : d;
  }
  return null;
}, Se = (e, o) => e ? !!// Check prefix: cannot be empty, unless allowSimpleName is enabled
// Check name: cannot be empty
((o && e.prefix === "" || e.prefix) && e.name) : !1, ht = Object.freeze(
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
function Wt(e, o) {
  const s = {};
  !e.hFlip != !o.hFlip && (s.hFlip = !0), !e.vFlip != !o.vFlip && (s.vFlip = !0);
  const a = ((e.rotate || 0) + (o.rotate || 0)) % 4;
  return a && (s.rotate = a), s;
}
function tt(e, o) {
  const s = Wt(e, o);
  for (const a in Be)
    a in Me ? a in e && !(a in s) && (s[a] = Me[a]) : a in o ? s[a] = o[a] : a in e && (s[a] = e[a]);
  return s;
}
function Gt(e, o) {
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
function qt(e, o, s) {
  const a = e.icons, t = e.aliases || /* @__PURE__ */ Object.create(null);
  let i = {};
  function r(d) {
    i = tt(
      a[d] || t[d],
      i
    );
  }
  return r(o), s.forEach(r), tt(e, i);
}
function mt(e, o) {
  const s = [];
  if (typeof e != "object" || typeof e.icons != "object")
    return s;
  e.not_found instanceof Array && e.not_found.forEach((t) => {
    o(t, null), s.push(t);
  });
  const a = Gt(e);
  for (const t in a) {
    const i = a[t];
    i && (o(t, qt(e, t, i)), s.push(t));
  }
  return s;
}
const Qt = {
  provider: "",
  aliases: {},
  not_found: {},
  ...ht
};
function je(e, o) {
  for (const s in o)
    if (s in e && typeof e[s] != typeof o[s])
      return !1;
  return !0;
}
function vt(e) {
  if (typeof e != "object" || e === null)
    return null;
  const o = e;
  if (typeof o.prefix != "string" || !e.icons || typeof e.icons != "object" || !je(e, Qt))
    return null;
  const s = o.icons;
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
  const a = o.aliases || /* @__PURE__ */ Object.create(null);
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
  return o;
}
const st = /* @__PURE__ */ Object.create(null);
function Kt(e, o) {
  return {
    provider: e,
    prefix: o,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function be(e, o) {
  const s = st[e] || (st[e] = /* @__PURE__ */ Object.create(null));
  return s[o] || (s[o] = Kt(e, o));
}
function yt(e, o) {
  return vt(o) ? mt(o, (s, a) => {
    a ? e.icons[s] = a : e.missing.add(s);
  }) : [];
}
function Jt(e, o, s) {
  try {
    if (typeof s.body == "string")
      return e.icons[o] = { ...s }, !0;
  } catch {
  }
  return !1;
}
let $e = !1;
function _t(e) {
  return typeof e == "boolean" && ($e = e), $e;
}
function Yt(e) {
  const o = typeof e == "string" ? Re(e, !0, $e) : e;
  if (o) {
    const s = be(o.provider, o.prefix), a = o.name;
    return s.icons[a] || (s.missing.has(a) ? null : void 0);
  }
}
function Xt(e, o) {
  const s = Re(e, !0, $e);
  if (!s)
    return !1;
  const a = be(s.provider, s.prefix);
  return o ? Jt(a, s.name, o) : (a.missing.add(s.name), !0);
}
function Zt(e, o) {
  if (typeof e != "object")
    return !1;
  if (typeof o != "string" && (o = e.provider || ""), $e && !o && !e.prefix) {
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
  const a = be(o, s);
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
function nt(e, o, s) {
  if (o === 1)
    return e;
  if (s = s || 100, typeof e == "number")
    return Math.ceil(e * o * s) / s;
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
      isNaN(d) ? t.push(i) : t.push(Math.ceil(d * o * s) / s);
    } else
      t.push(i);
    if (i = a.shift(), i === void 0)
      return t.join("");
    r = !r;
  }
}
function ss(e, o = "defs") {
  let s = "";
  const a = e.indexOf("<" + o);
  for (; a >= 0; ) {
    const t = e.indexOf(">", a), i = e.indexOf("</" + o);
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
function ns(e, o) {
  return e ? "<defs>" + e + "</defs>" + o : o;
}
function os(e, o, s) {
  const a = ss(e);
  return ns(a.defs, o + a.content + s);
}
const as = (e) => e === "unset" || e === "undefined" || e === "none";
function is(e, o) {
  const s = {
    ...Oe,
    ...e
  }, a = {
    ...wt,
    ...o
  }, t = {
    left: s.left,
    top: s.top,
    width: s.width,
    height: s.height
  };
  let i = s.body;
  [s, a].forEach((P) => {
    const T = [], N = P.hFlip, M = P.vFlip;
    let R = P.rotate;
    N ? M ? R += 2 : (T.push(
      "translate(" + (t.width + t.left).toString() + " " + (0 - t.top).toString() + ")"
    ), T.push("scale(-1 1)"), t.top = t.left = 0) : M && (T.push(
      "translate(" + (0 - t.left).toString() + " " + (t.height + t.top).toString() + ")"
    ), T.push("scale(1 -1)"), t.top = t.left = 0);
    let $;
    switch (R < 0 && (R -= Math.floor(R / 4) * 4), R = R % 4, R) {
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
    R % 2 === 1 && (t.left !== t.top && ($ = t.left, t.left = t.top, t.top = $), t.width !== t.height && ($ = t.width, t.width = t.height, t.height = $)), T.length && (i = os(
      i,
      '<g transform="' + T.join(" ") + '">',
      "</g>"
    ));
  });
  const r = a.width, d = a.height, c = t.width, u = t.height;
  let f, v;
  r === null ? (v = d === null ? "1em" : d === "auto" ? u : d, f = nt(v, c / u)) : (f = r === "auto" ? c : r, v = d === null ? nt(f, u / c) : d === "auto" ? u : d);
  const p = {}, b = (P, T) => {
    as(T) || (p[P] = T.toString());
  };
  b("width", f), b("height", v);
  const g = [t.left, t.top, c, u];
  return p.viewBox = g.join(" "), {
    attributes: p,
    viewBox: g,
    body: i
  };
}
const ls = /\sid="(\S+)"/g, rs = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let cs = 0;
function us(e, o = rs) {
  const s = [];
  let a;
  for (; a = ls.exec(e); )
    s.push(a[1]);
  if (!s.length)
    return e;
  const t = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return s.forEach((i) => {
    const r = typeof o == "function" ? o(i) : o + (cs++).toString(), d = i.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    e = e.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + d + ')([")]|\\.[a-z])', "g"),
      "$1" + r + t + "$3"
    );
  }), e = e.replace(new RegExp(t, "g"), ""), e;
}
const ze = /* @__PURE__ */ Object.create(null);
function ds(e, o) {
  ze[e] = o;
}
function He(e) {
  return ze[e] || ze[""];
}
function Qe(e) {
  let o;
  if (typeof e.resources == "string")
    o = [e.resources];
  else if (o = e.resources, !(o instanceof Array) || !o.length)
    return null;
  return {
    // API hosts
    resources: o,
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
function fs(e, o) {
  const s = Qe(o);
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
function ps(e, o) {
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
    const i = o + ".json?icons=";
    a = s.maxURL - t - s.path.length - i.length;
  }
  return a;
}
function hs(e) {
  return e === 404;
}
const ms = (e, o, s) => {
  const a = [], t = ps(e, o), i = "icons";
  let r = {
    type: i,
    provider: e,
    prefix: o,
    icons: []
  }, d = 0;
  return s.forEach((c, u) => {
    d += c.length + 1, d >= t && u > 0 && (a.push(r), r = {
      type: i,
      provider: e,
      prefix: o,
      icons: []
    }, d = c.length), r.icons.push(c);
  }), a.push(r), a;
};
function vs(e) {
  if (typeof e == "string") {
    const o = Je(e);
    if (o)
      return o.path;
  }
  return "/";
}
const ys = (e, o, s) => {
  if (!ot) {
    s("abort", 424);
    return;
  }
  let a = vs(o.provider);
  switch (o.type) {
    case "icons": {
      const i = o.prefix, d = o.icons.join(","), c = new URLSearchParams({
        icons: d
      });
      a += i + ".json?" + c.toString();
      break;
    }
    case "custom": {
      const i = o.uri;
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
  const o = {
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
    d in u.icons ? f = o.loaded : r === "" || u.missing.has(d) ? f = o.missing : f = o.pending;
    const v = {
      provider: i,
      prefix: r,
      name: d
    };
    f.push(v);
  }), o;
}
function kt(e, o) {
  e.forEach((s) => {
    const a = s.loaderCallbacks;
    a && (s.loaderCallbacks = a.filter((t) => t.id !== o));
  });
}
function ws(e) {
  e.pendingCallbacksFlag || (e.pendingCallbacksFlag = !0, setTimeout(() => {
    e.pendingCallbacksFlag = !1;
    const o = e.loaderCallbacks ? e.loaderCallbacks.slice(0) : [];
    if (!o.length)
      return;
    let s = !1;
    const a = e.provider, t = e.prefix;
    o.forEach((i) => {
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
function Cs(e, o, s) {
  const a = ks++, t = kt.bind(null, s, a);
  if (!o.pending.length)
    return t;
  const i = {
    id: a,
    icons: o,
    callback: e,
    abort: t
  };
  return s.forEach((r) => {
    (r.loaderCallbacks || (r.loaderCallbacks = [])).push(i);
  }), t;
}
function Ts(e, o = !0, s = !1) {
  const a = [];
  return e.forEach((t) => {
    const i = typeof t == "string" ? Re(t, o, s) : t;
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
function xs(e, o, s, a) {
  const t = e.resources.length, i = e.random ? Math.floor(Math.random() * t) : e.index;
  let r;
  if (e.random) {
    let w = e.resources.slice(0);
    for (r = []; w.length > 1; ) {
      const h = Math.floor(Math.random() * w.length);
      r.push(w[h]), w = w.slice(0, h).concat(w.slice(h + 1));
    }
    r = r.concat(w);
  } else
    r = e.resources.slice(i).concat(e.resources.slice(0, i));
  const d = Date.now();
  let c = "pending", u = 0, f, v = null, p = [], b = [];
  typeof a == "function" && b.push(a);
  function g() {
    v && (clearTimeout(v), v = null);
  }
  function P() {
    c === "pending" && (c = "aborted"), g(), p.forEach((w) => {
      w.status === "pending" && (w.status = "aborted");
    }), p = [];
  }
  function T(w, h) {
    h && (b = []), typeof w == "function" && b.push(w);
  }
  function N() {
    return {
      startTime: d,
      payload: o,
      status: c,
      queriesSent: u,
      queriesPending: p.length,
      subscribe: T,
      abort: P
    };
  }
  function M() {
    c = "failed", b.forEach((w) => {
      w(void 0, f);
    });
  }
  function R() {
    p.forEach((w) => {
      w.status === "pending" && (w.status = "aborted");
    }), p = [];
  }
  function $(w, h, C) {
    const y = h !== "success";
    switch (p = p.filter((_) => _ !== w), c) {
      case "pending":
        break;
      case "failed":
        if (y || !e.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (h === "abort") {
      f = C, M();
      return;
    }
    if (y) {
      f = C, p.length || (r.length ? O() : M());
      return;
    }
    if (g(), R(), !e.random) {
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
      if (p.length) {
        v = setTimeout(() => {
          g(), c === "pending" && (R(), M());
        }, e.timeout);
        return;
      }
      M();
      return;
    }
    const h = {
      status: "pending",
      resource: w,
      callback: (C, y) => {
        $(h, C, y);
      }
    };
    p.push(h), u++, v = setTimeout(O, e.rotate), s(w, o, h.callback);
  }
  return setTimeout(O), N;
}
function Ct(e) {
  const o = {
    ...$s,
    ...e
  };
  let s = [];
  function a() {
    s = s.filter((d) => d().status === "pending");
  }
  function t(d, c, u) {
    const f = xs(
      o,
      d,
      c,
      (v, p) => {
        a(), u && u(v, p);
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
      o.index = d;
    },
    getIndex: () => o.index,
    cleanup: a
  };
}
function at() {
}
const Ne = /* @__PURE__ */ Object.create(null);
function Is(e) {
  if (!Ne[e]) {
    const o = Je(e);
    if (!o)
      return;
    const s = Ct(o), a = {
      config: o,
      redundancy: s
    };
    Ne[e] = a;
  }
  return Ne[e];
}
function Ss(e, o, s) {
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
  return !a || !t ? (s(void 0, 424), at) : a.query(o, t, s)().abort;
}
function it() {
}
function Es(e) {
  e.iconsLoaderFlag || (e.iconsLoaderFlag = !0, setTimeout(() => {
    e.iconsLoaderFlag = !1, ws(e);
  }));
}
function As(e) {
  const o = [], s = [];
  return e.forEach((a) => {
    (a.match(pt) ? o : s).push(a);
  }), {
    valid: o,
    invalid: s
  };
}
function Ce(e, o, s) {
  function a() {
    const t = e.pendingIcons;
    o.forEach((i) => {
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
function lt(e, o) {
  e instanceof Promise ? e.then((s) => {
    o(s);
  }).catch(() => {
    o(null);
  }) : o(e);
}
function Ps(e, o) {
  e.iconsToLoad ? e.iconsToLoad = e.iconsToLoad.concat(o).sort() : e.iconsToLoad = o, e.iconsQueueFlag || (e.iconsQueueFlag = !0, setTimeout(() => {
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
        const v = i(f, a, s);
        lt(v, (p) => {
          const b = p ? {
            prefix: a,
            icons: {
              [f]: p
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
      Ss(s, f, (v) => {
        Ce(e, f.icons, v);
      });
    });
  }));
}
const Ms = (e, o) => {
  const s = Ts(e, !0, _t()), a = bs(s);
  if (!a.pending.length) {
    let c = !0;
    return o && setTimeout(() => {
      c && o(
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
    const v = t[u] || (t[u] = /* @__PURE__ */ Object.create(null));
    v[f] || (v[f] = []);
  }), a.pending.forEach((c) => {
    const { provider: u, prefix: f, name: v } = c, p = be(u, f), b = p.pendingIcons || (p.pendingIcons = /* @__PURE__ */ new Set());
    b.has(v) || (b.add(v), t[u][f].push(v));
  }), i.forEach((c) => {
    const u = t[c.provider][c.prefix];
    u.length && Ps(c, u);
  }), o ? Cs(o, a, i) : it;
};
function Ls(e, o) {
  const s = {
    ...e
  };
  for (const a in o) {
    const t = o[a], i = typeof t;
    a in bt ? (t === null || t && (i === "string" || i === "number")) && (s[a] = t) : i === typeof s[a] && (s[a] = a === "rotate" ? t % 4 : t);
  }
  return s;
}
const Ds = /[\s,]+/;
function Rs(e, o) {
  o.split(Ds).forEach((s) => {
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
function Os(e, o = 0) {
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
  return o;
}
function Fs(e, o) {
  let s = e.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const a in o)
    s += " " + a + '="' + o[a] + '"';
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
  const o = ut[e];
  for (const s in ct)
    o[e + s] = ct[s];
}
const Ae = {};
["horizontal", "vertical"].forEach((e) => {
  const o = e.slice(0, 1) + "Flip";
  Ae[e + "-flip"] = o, Ae[e.slice(0, 1) + "-flip"] = o, Ae[e + "Flip"] = o;
});
function dt(e) {
  return e + (e.match(/^[-0-9.]+$/) ? "px" : "");
}
const ft = (e, o) => {
  const s = Ls(rt, o), a = { ...Vs }, t = o.mode || "svg", i = {}, r = o.style, d = typeof r == "object" && !(r instanceof Array) ? r : {};
  for (let P in o) {
    const T = o[P];
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
          const N = Ae[P];
          N ? (T === !0 || T === "true" || T === 1) && (s[N] = !0) : rt[P] === void 0 && (a[P] = T);
        }
      }
  }
  const c = is(e, s), u = c.attributes;
  if (s.inline && (i.verticalAlign = "-0.125em"), t === "svg") {
    a.style = {
      ...i,
      ...d
    }, Object.assign(a, u);
    let P = 0, T = o.id;
    return typeof T == "string" && (T = T.replace(/-/g, "_")), a.innerHTML = us(c.body, T ? () => T + "ID" + P++ : "iconifyVue"), et("svg", a);
  }
  const { body: f, width: v, height: p } = e, b = t === "mask" || (t === "bg" ? !1 : f.indexOf("currentColor") !== -1), g = Fs(f, {
    ...u,
    width: v + "",
    height: p + ""
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
    const o = e.IconifyPreload, s = "Invalid IconifyPreload syntax.";
    typeof o == "object" && o !== null && (o instanceof Array ? o : [o]).forEach((a) => {
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
    const o = e.IconifyProviders;
    if (typeof o == "object" && o !== null)
      for (let s in o) {
        const a = "IconifyProviders[" + s + "] is invalid.";
        try {
          const t = o[s];
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
}, L = oe((e, { emit: o }) => {
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
    let v = Yt(f);
    if (!v) {
      const g = s.value;
      return (!g || g.name !== u) && (v === null ? s.value = {
        name: u
      } : s.value = {
        name: u,
        abort: Ms([f], c)
      }), null;
    }
    a(), i.value !== u && (i.value = u, Pe(() => {
      o("load", u);
    }));
    const p = e.customise;
    if (p) {
      v = Object.assign({}, v);
      const g = p(v.body, f.name, f.prefix, f.provider);
      typeof g == "string" && (v.body = g);
    }
    const b = ["iconify"];
    return f.prefix !== "" && b.push("iconify--" + f.prefix), f.provider !== "" && b.push("iconify--" + f.provider), { data: v, classes: b };
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
  autoMetaEnabled: !1,
  tagMaxLength: 50
}, B = gt({ ...xt });
function Hs() {
  try {
    const e = localStorage.getItem($t);
    if (e) {
      const o = JSON.parse(e);
      Object.assign(B, { ...xt, ...o });
    } else
      navigator.language.startsWith("zh") && (B.language = "zh-CN");
  } catch (e) {
    console.error("Failed to load settings:", e);
  }
}
ae(B, (e) => {
  try {
    localStorage.setItem($t, JSON.stringify(e));
  } catch (o) {
    console.error("Failed to save settings:", o);
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
      const o = await fetch("/simple-prompt/categories/list");
      if (o.ok) {
        const s = await o.json();
        Array.isArray(s) && s.forEach((a) => {
          this._categories.set(a.id, {
            value: a.id,
            label: a.name,
            color: a.color
          });
        });
      }
    } catch (o) {
      console.error("[CategoryService] Failed to fetch categories:", o);
    } finally {
      this.isInitialized = !0;
    }
  }
  async saveCustomCategories(o) {
    try {
      const s = await fetch("/simple-prompt/categories/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categories: o })
      });
      if (s.ok)
        await this.fetchCategories();
      else
        throw console.error("[CategoryService] Failed to save categories:", await s.text()), new Error("Failed to save categories");
    } catch (s) {
      throw console.error("[CategoryService] Error saving categories:", s), s;
    }
  }
  getCategory(o) {
    return this._categories.get(o) || {
      value: o,
      label: "Unknown",
      color: "#888888"
    };
  }
  getColor(o) {
    return this.getCategory(o).color;
  }
  getName(o) {
    return this.getCategory(o).label;
  }
  getAll() {
    return Array.from(this._categories.values()).sort((o, s) => o.value - s.value);
  }
  // Getter for template usage - returns array format expected by CustomTagModal
  get categoriesArray() {
    return this.getAll().map((o) => ({
      id: o.value,
      name: o.label,
      color: o.color
    }));
  }
  getCategoryColor(o) {
    return this.getColor(o);
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
  setup(e, { emit: o }) {
    const s = e, a = o, { t } = ue(), i = E({
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
    ae(() => s.visible, (p) => {
      p && (s.editMode && s.initialData ? i.value = {
        name: s.initialData.name,
        category: s.initialData.category || K.GENERAL,
        post_count: s.initialData.post_count || 0,
        alias: Array.isArray(s.initialData.alias) ? s.initialData.alias.join(", ") : s.initialData.alias || ""
      } : u());
    });
    const f = () => {
      a("close");
    }, v = async () => {
      if (!i.value.name.trim()) {
        d.value = t("customTag.errorNameRequired");
        return;
      }
      r.value = !0, d.value = "", c.value = "";
      try {
        const p = i.value.alias.split(",").map((T) => T.trim()).filter((T) => T), b = {
          name: i.value.name.trim(),
          category: i.value.category,
          post_count: Number(i.value.post_count),
          alias: p,
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
      } catch (p) {
        console.error("Add tag error:", p), d.value = p.message || t("customTag.errorGeneric");
      } finally {
        r.value = !1;
      }
    };
    return (p, b) => (k(), re(De, { name: "fade" }, {
      default: we(() => [
        p.visible ? (k(), I("div", {
          key: 0,
          class: "modal-overlay",
          onClick: de(f, ["self"])
        }, [
          n("div", Ws, [
            n("div", Gs, [
              n("div", qs, [
                A(l(L), {
                  icon: p.editMode ? "mdi:pencil" : "mdi:tag-plus",
                  class: "title-icon"
                }, null, 8, ["icon"]),
                n("span", null, m(p.editMode ? l(t)("customTag.titleEdit") || "Edit Tag" : l(t)("customTag.title")), 1)
              ]),
              n("button", {
                class: "close-btn",
                onClick: f,
                title: l(t)("common.close")
              }, [
                A(l(L), { icon: "mdi:close" })
              ], 8, Qs)
            ]),
            n("div", Ks, [
              n("div", Js, [
                n("label", null, [
                  J(m(l(t)("customTag.nameLabel")) + " ", 1),
                  b[4] || (b[4] = n("span", { class: "required" }, "*", -1))
                ]),
                G(n("input", {
                  "onUpdate:modelValue": b[0] || (b[0] = (g) => i.value.name = g),
                  type: "text",
                  placeholder: l(t)("customTag.namePlaceholder"),
                  class: "sp-input",
                  autofocus: "",
                  disabled: p.editMode
                }, null, 8, Ys), [
                  [Z, i.value.name]
                ])
              ]),
              n("div", Xs, [
                n("label", null, m(l(t)("customTag.categoryLabel")), 1),
                n("div", Zs, [
                  G(n("select", {
                    "onUpdate:modelValue": b[1] || (b[1] = (g) => i.value.category = g),
                    class: "sp-select"
                  }, [
                    (k(!0), I(ee, null, te(l(ne).categories.value, (g) => (k(), I("option", {
                      key: g.id,
                      value: g.id
                    }, m(g.name), 9, en))), 128))
                  ], 512), [
                    [qe, i.value.category]
                  ]),
                  n("div", {
                    class: "color-preview",
                    style: le({ backgroundColor: l(ne).getCategoryColor(i.value.category) })
                  }, null, 4)
                ])
              ]),
              n("div", tn, [
                n("label", null, m(l(t)("customTag.countLabel")), 1),
                G(n("input", {
                  "onUpdate:modelValue": b[2] || (b[2] = (g) => i.value.post_count = g),
                  type: "number",
                  min: "0",
                  class: "sp-input"
                }, null, 512), [
                  [Z, i.value.post_count]
                ]),
                n("p", sn, m(l(t)("customTag.countHint")), 1)
              ]),
              n("div", nn, [
                n("label", null, m(l(t)("customTag.aliasLabel")), 1),
                G(n("input", {
                  "onUpdate:modelValue": b[3] || (b[3] = (g) => i.value.alias = g),
                  type: "text",
                  placeholder: l(t)("customTag.aliasPlaceholder"),
                  class: "sp-input"
                }, null, 8, on), [
                  [Z, i.value.alias]
                ]),
                n("p", an, m(l(t)("customTag.aliasHint")), 1)
              ]),
              d.value ? (k(), I("div", ln, [
                A(l(L), { icon: "mdi:alert-circle" }),
                J(" " + m(d.value), 1)
              ])) : z("", !0),
              c.value ? (k(), I("div", rn, [
                A(l(L), { icon: "mdi:check-circle" }),
                J(" " + m(c.value), 1)
              ])) : z("", !0)
            ]),
            n("div", cn, [
              n("button", {
                class: "btn-cancel",
                onClick: f
              }, m(l(t)("common.cancel")), 1),
              n("button", {
                class: "btn-save",
                onClick: v,
                disabled: r.value
              }, [
                r.value ? (k(), re(l(L), {
                  key: 0,
                  icon: "mdi:loading",
                  class: "spin"
                })) : z("", !0),
                n("span", null, m(l(t)("common.save")), 1)
              ], 8, un)
            ])
          ])
        ])) : z("", !0)
      ]),
      _: 1
    }));
  }
}), ce = (e, o) => {
  const s = e.__vccOpts || e;
  for (const [a, t] of o)
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
    const { t: o } = ue(), s = E("user"), a = ve(() => [
      { id: "user", label: o("settings.items.updateUserTags") || "User Tags" },
      { id: "liked", label: o("settings.items.updateLikedTags") || "Liked Tags" },
      { id: "default", label: "Default Tags" }
    ]), t = E([]), i = E(0), r = E(!1), d = E(""), c = E(1), u = E(!1), f = E(null), v = async () => {
      r.value = !0;
      try {
        const w = (c.value - 1) * Ue, h = new URLSearchParams({
          source: s.value,
          limit: Ue.toString(),
          offset: w.toString(),
          q: d.value
        }), C = await fetch(`/simple-prompt/tags/list?${h.toString()}`), y = await C.json();
        C.ok ? (t.value = y.data || [], i.value = y.total || 0) : console.error("Fetch tags failed:", y.error);
      } catch (w) {
        console.error("Fetch tags error:", w);
      } finally {
        r.value = !1;
      }
    }, p = async (w) => {
      if (confirm(o("common.confirm") + ` Delete '${w.name}'?`))
        try {
          const h = await fetch("/simple-prompt/tags/delete", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: w.name, source: s.value })
          });
          if (h.ok)
            v();
          else {
            const C = await h.json();
            alert("Delete failed: " + C.error);
          }
        } catch (h) {
          alert("Delete failed: " + h.message);
        }
    }, b = (w) => {
      f.value = w, u.value = !0;
    }, g = () => {
      v();
    }, P = ve(() => s.value === "default" ? B.allowEditDefaultTags : !0);
    ae([s, d], () => {
      c.value = 1, v();
    }), ae(c, () => {
      v();
    }), xe(() => {
      v(), ne.fetchCategories();
    });
    const T = E(""), N = E(0), M = E(!1), R = async () => {
      if (!T.value.trim()) return;
      const w = T.value.split(/[,\n]/).map((h) => h.trim()).filter(Boolean);
      if (w.length !== 0) {
        M.value = !0;
        try {
          const h = w.map((_) => ({
            name: _,
            category: N.value,
            post_count: 0,
            alias: [],
            source: s.value
          })), C = await fetch("/simple-prompt/add-custom-tag", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tags: h })
          }), y = await C.json();
          C.ok ? (T.value = "", v()) : alert("Add failed: " + y.error);
        } catch (h) {
          alert("Add failed: " + h.message);
        } finally {
          M.value = !1;
        }
      }
    }, $ = (w) => ne.getCategoryName(w), O = (w) => ne.getCategoryColor(w);
    return (w, h) => (k(), I("div", fn, [
      n("div", gn, [
        (k(!0), I(ee, null, te(a.value, (C) => (k(), I("button", {
          key: C.id,
          class: fe(["tab-btn", { active: s.value === C.id }]),
          onClick: (y) => s.value = C.id
        }, m(C.label), 11, pn))), 128))
      ]),
      n("div", hn, [
        n("div", mn, [
          A(l(L), {
            icon: "mdi:magnify",
            class: "search-icon"
          }),
          G(n("input", {
            "onUpdate:modelValue": h[0] || (h[0] = (C) => d.value = C),
            type: "text",
            placeholder: l(o)("search.placeholder"),
            class: "search-input"
          }, null, 8, vn), [
            [Z, d.value]
          ])
        ]),
        n("div", yn, m(i.value) + " tags ", 1)
      ]),
      s.value === "default" && !P.value ? (k(), I("div", _n, [
        A(l(L), { icon: "mdi:lock" }),
        h[6] || (h[6] = n("span", null, "Editing default tags is disabled in settings.", -1))
      ])) : z("", !0),
      n("div", bn, [
        n("table", wn, [
          h[8] || (h[8] = n("thead", null, [
            n("tr", null, [
              n("th", { width: "30%" }, "Name"),
              n("th", { width: "15%" }, "Category"),
              n("th", { width: "15%" }, "Post Count"),
              n("th", { width: "25%" }, "Aliases"),
              n("th", {
                width: "15%",
                align: "right"
              }, "Actions")
            ])
          ], -1)),
          n("tbody", null, [
            r.value ? (k(), I("tr", kn, [
              n("td", Cn, [
                A(l(L), {
                  icon: "mdi:loading",
                  class: "spin"
                }),
                h[7] || (h[7] = J(" Loading... "))
              ])
            ])) : t.value.length === 0 ? (k(), I("tr", Tn, [
              n("td", $n, m(l(o)("search.noResults")), 1)
            ])) : (k(!0), I(ee, { key: 2 }, te(t.value, (C) => (k(), I("tr", {
              key: C.name
            }, [
              n("td", xn, m(C.name), 1),
              n("td", null, [
                n("span", {
                  class: "cat-badge",
                  style: le({ "--c": O(C.category) })
                }, m($(C.category)), 5)
              ]),
              n("td", null, m(C.post_count), 1),
              n("td", {
                class: "alias-cell",
                title: C.alias ? C.alias.join(", ") : ""
              }, m(C.alias ? C.alias.join(", ") : "-"), 9, In),
              n("td", Sn, [
                P.value ? (k(), I("div", En, [
                  n("button", {
                    class: "action-btn edit",
                    onClick: (y) => b(C),
                    title: "Edit"
                  }, [
                    A(l(L), { icon: "mdi:pencil" })
                  ], 8, An),
                  n("button", {
                    class: "action-btn delete",
                    onClick: (y) => p(C),
                    title: "Delete"
                  }, [
                    A(l(L), { icon: "mdi:delete" })
                  ], 8, Pn)
                ])) : (k(), I("div", Mn, [
                  A(l(L), { icon: "mdi:lock-outline" })
                ]))
              ])
            ]))), 128))
          ])
        ])
      ]),
      n("div", Ln, [
        n("button", {
          disabled: c.value === 1,
          onClick: h[1] || (h[1] = (C) => c.value--),
          class: "page-btn"
        }, [
          A(l(L), { icon: "mdi:chevron-left" })
        ], 8, Dn),
        n("span", Rn, "Page " + m(c.value), 1),
        n("button", {
          disabled: t.value.length < Ue,
          onClick: h[2] || (h[2] = (C) => c.value++),
          class: "page-btn"
        }, [
          A(l(L), { icon: "mdi:chevron-right" })
        ], 8, On)
      ]),
      P.value ? (k(), I("div", Fn, [
        n("div", jn, [
          G(n("input", {
            "onUpdate:modelValue": h[3] || (h[3] = (C) => T.value = C),
            placeholder: l(o)("settings.sections.addPlaceholder") || "New Tag Name (comma separated for multiple)",
            class: "input-new-name",
            onKeyup: Bt(R, ["enter"])
          }, null, 40, Nn), [
            [Z, T.value]
          ]),
          G(n("select", {
            "onUpdate:modelValue": h[4] || (h[4] = (C) => N.value = C),
            class: "select-new-cat"
          }, [
            (k(!0), I(ee, null, te(l(ne).categories.value, (C) => (k(), I("option", {
              key: C.id,
              value: C.id
            }, m(C.name), 9, Un))), 128))
          ], 512), [
            [qe, N.value]
          ]),
          n("button", {
            class: "btn-add",
            onClick: R,
            disabled: M.value
          }, [
            M.value ? (k(), re(l(L), {
              key: 0,
              icon: "mdi:loading",
              class: "spin"
            })) : (k(), re(l(L), {
              key: 1,
              icon: "mdi:plus"
            })),
            h[9] || (h[9] = J(" Add "))
          ], 8, Vn)
        ])
      ])) : z("", !0),
      A(It, {
        visible: u.value,
        "edit-mode": !0,
        "initial-data": f.value,
        "target-source": s.value,
        onClose: h[5] || (h[5] = (C) => u.value = !1),
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
      const o = await fetch("/simple-prompt/presets/list");
      if (o.ok) {
        const s = await o.json();
        this.defaultPresets.value = s.defaults || [], this.customPresets.value = s.customs || [], this.presets.value = [...this.defaultPresets.value, ...this.customPresets.value], !this.activePresetId.value && this.presets.value.length > 0 && (this.activePresetId.value = this.presets.value[0].id);
      }
    } catch (o) {
      console.error("Error fetching presets:", o);
    }
  }
  async saveCustomPresets(o) {
    try {
      if (!(await fetch("/simple-prompt/presets/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ presets: o })
      })).ok) throw new Error("Failed");
      await this.fetchPresets();
    } catch (s) {
      throw console.error("Error saving presets:", s), s;
    }
  }
  getActiveTags() {
    if (this.activePresetId.value) {
      const o = this.presets.value.find((s) => s.id === this.activePresetId.value);
      if (o && o.tags) return o.tags;
    }
    return [];
  }
  setActivePreset(o) {
    this.activePresetId.value = o;
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
}, Po = { class: "section-title" }, Mo = { class: "setting-item" }, Lo = { class: "setting-info" }, Do = { class: "setting-label" }, Ro = { class: "setting-desc" }, Oo = { class: "setting-item" }, Fo = { class: "setting-info" }, jo = { class: "setting-label" }, No = { class: "setting-desc" }, Uo = {
  key: 4,
  class: "settings-section"
}, Vo = { class: "section-title" }, Bo = { class: "setting-item" }, zo = { class: "setting-info" }, Ho = { class: "setting-label" }, Wo = { class: "setting-desc" }, Go = { class: "switch" }, qo = { class: "setting-item data-update-item" }, Qo = { class: "setting-info" }, Ko = { class: "setting-label" }, Jo = { class: "setting-desc" }, Yo = { class: "update-actions" }, Xo = ["disabled"], Zo = { class: "setting-item data-update-item" }, ea = { class: "setting-info" }, ta = { class: "setting-label" }, sa = { class: "setting-desc" }, na = { class: "update-actions" }, oa = ["disabled"], aa = { class: "setting-item data-update-item" }, ia = { class: "setting-info" }, la = { class: "setting-label" }, ra = { class: "setting-desc" }, ca = { class: "update-actions" }, ua = ["disabled"], da = {
  key: 5,
  class: "settings-section full-width"
}, fa = { class: "section-title" }, ga = { class: "category-manager" }, pa = { class: "add-cat-form" }, ha = ["placeholder"], ma = { class: "cat-list" }, va = { class: "cat-name" }, ya = { class: "cat-id" }, _a = ["onClick"], ba = {
  key: 6,
  class: "settings-section full-width"
}, wa = { class: "section-title" }, ka = { class: "meta-manager" }, Ca = { class: "preset-form" }, Ta = { class: "form-row" }, $a = ["placeholder"], xa = { class: "form-row" }, Ia = ["placeholder"], Sa = { class: "form-actions" }, Ea = { class: "preset-list" }, Aa = { class: "preset-info" }, Pa = { class: "preset-name" }, Ma = { class: "preset-tags" }, La = { class: "preset-actions" }, Da = ["onClick"], Ra = ["onClick"], Oa = {
  key: 0,
  class: "empty-msg"
}, Fa = {
  class: "preset-list",
  style: { "margin-top": "20px" }
}, ja = { style: { color: "#888" } }, Na = { class: "preset-info" }, Ua = { class: "preset-name" }, Va = { class: "preset-tags" }, Ba = {
  key: 7,
  class: "settings-section full-width"
}, za = { class: "section-title" }, Ha = { class: "settings-footer" }, Wa = { class: "footer-info" }, Ga = /* @__PURE__ */ oe({
  __name: "SettingsModal",
  props: {
    visible: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["close"],
  setup(e, { emit: o }) {
    const s = e, a = o, { t, locale: i } = ue(), r = () => {
      a("close");
    };
    ae(() => B.language, (y) => {
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
    ], c = E("textFormat"), u = E(""), f = E("#aabbcc"), v = () => {
      if (!u.value) return;
      const y = ne.categories.value;
      let x = (y.length > 0 ? Math.max(...y.map((ge) => ge.id)) : 5) + 1;
      for (x < 6 && (x = 6); y.some((ge) => ge.id === x); )
        x++;
      const q = {
        id: x,
        name: u.value,
        color: f.value
      }, Y = [0, 1, 3, 4, 5, 6, 7], Fe = [...y.filter((ge) => !Y.includes(ge.id)), q];
      ne.saveCustomCategories(Fe).then(() => {
        u.value = "";
      });
    }, p = (y) => {
      if (!confirm(t("common.confirm") || "Are you sure?")) return;
      const _ = ne.categories.value, x = [0, 1, 3, 4, 5, 6, 7];
      if (x.includes(y)) {
        alert(t("category.cannotDeleteDefault"));
        return;
      }
      const q = _.filter((Y) => !x.includes(Y.id) && Y.id !== y);
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
        const _ = W.customPresets.value.findIndex((x) => x.id === P.value);
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
        R();
      });
    }, N = (y) => {
      P.value = y.id, b.value = y.name, g.value = y.tags.join(", ");
    }, M = (y) => {
      if (!confirm(t("common.confirm") || "Are you sure?")) return;
      const _ = W.customPresets.value.filter((x) => x.id !== y);
      W.customPresets.value = _, W.saveCustomPresets(_);
    }, R = () => {
      b.value = "", g.value = "", P.value = null;
    }, $ = E(""), O = E(!1), w = E(!1), h = E(""), C = async (y) => {
      if (!(O.value || w.value)) {
        O.value = !0, $.value = "";
        try {
          if (y === "update_github") {
            w.value = !0, $.value = t("settings.items.checkingUpdate");
            try {
              const _ = await fetch("/simple-prompt/check-update"), x = await _.json();
              if (!_.ok)
                throw new Error(x.error || _.statusText);
              if (h.value = x.version, w.value = !1, !x.update_available) {
                $.value = t("settings.items.upToDate") + h.value;
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
      y && ($.value = "", h.value = "");
    }), (y, _) => (k(), re(De, { name: "fade" }, {
      default: we(() => [
        e.visible ? (k(), I("div", {
          key: 0,
          class: "settings-overlay",
          onClick: de(r, ["self"])
        }, [
          n("div", Hn, [
            n("div", Wn, [
              n("div", Gn, [
                A(l(L), {
                  icon: "mdi:cog",
                  class: "settings-icon"
                }),
                n("span", null, m(l(t)("settings.title")), 1)
              ]),
              n("button", {
                class: "btn-close",
                onClick: r,
                title: l(t)("common.close")
              }, [
                A(l(L), { icon: "mdi:close" })
              ], 8, qn)
            ]),
            n("div", Qn, [
              n("div", Kn, [
                (k(), I(ee, null, te(d, (x) => n("div", {
                  key: x.id,
                  class: fe(["sidebar-item", { active: c.value === x.id }]),
                  onClick: (q) => c.value = x.id
                }, [
                  A(l(L), {
                    icon: x.icon,
                    class: "item-icon"
                  }, null, 8, ["icon"]),
                  n("span", null, m(l(t)(`settings.sections.${x.id}`)), 1)
                ], 10, Jn)), 64))
              ]),
              n("div", Yn, [
                c.value === "textFormat" ? (k(), I("div", Xn, [
                  n("h3", Zn, [
                    A(l(L), { icon: "mdi:format-text" }),
                    J(" " + m(l(t)("settings.sections.textFormat")), 1)
                  ]),
                  n("div", eo, [
                    n("div", to, [
                      n("label", so, m(l(t)("settings.items.convertUnderscore")), 1),
                      n("p", no, m(l(t)("settings.items.convertUnderscoreDesc")), 1)
                    ]),
                    n("label", oo, [
                      G(n("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": _[0] || (_[0] = (x) => l(B).convertUnderscoreToSpace = x)
                      }, null, 512), [
                        [_e, l(B).convertUnderscoreToSpace]
                      ]),
                      _[15] || (_[15] = n("span", { class: "slider" }, null, -1))
                    ])
                  ]),
                  n("div", ao, [
                    n("div", io, [
                      n("label", lo, m(l(t)("settings.items.escapeBrackets")), 1),
                      n("p", ro, m(l(t)("settings.items.escapeBracketsDesc")), 1)
                    ]),
                    n("label", co, [
                      G(n("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": _[1] || (_[1] = (x) => l(B).escapeBrackets = x)
                      }, null, 512), [
                        [_e, l(B).escapeBrackets]
                      ]),
                      _[16] || (_[16] = n("span", { class: "slider" }, null, -1))
                    ])
                  ])
                ])) : z("", !0),
                c.value === "autocomplete" ? (k(), I("div", uo, [
                  n("h3", fo, [
                    A(l(L), { icon: "mdi:magnify" }),
                    J(" " + m(l(t)("settings.sections.autocomplete")), 1)
                  ]),
                  n("div", go, [
                    n("div", po, [
                      n("label", ho, m(l(t)("settings.items.useAliasSearch")), 1),
                      n("p", mo, m(l(t)("settings.items.useAliasSearchDesc")), 1)
                    ]),
                    n("label", vo, [
                      G(n("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": _[2] || (_[2] = (x) => l(B).useAliasesInSearch = x)
                      }, null, 512), [
                        [_e, l(B).useAliasesInSearch]
                      ]),
                      _[17] || (_[17] = n("span", { class: "slider" }, null, -1))
                    ])
                  ]),
                  n("div", yo, [
                    n("div", _o, [
                      n("label", bo, m(l(t)("settings.items.useAliasAutocomplete")), 1),
                      n("p", wo, m(l(t)("settings.items.useAliasAutocompleteDesc")), 1)
                    ]),
                    n("label", ko, [
                      G(n("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": _[3] || (_[3] = (x) => l(B).useAliasesInAutocomplete = x)
                      }, null, 512), [
                        [_e, l(B).useAliasesInAutocomplete]
                      ]),
                      _[18] || (_[18] = n("span", { class: "slider" }, null, -1))
                    ])
                  ])
                ])) : z("", !0),
                c.value === "editing" ? (k(), I("div", Co, [
                  n("h3", To, [
                    A(l(L), { icon: "mdi:pencil" }),
                    J(" " + m(l(t)("settings.sections.editing")), 1)
                  ]),
                  n("div", $o, [
                    n("div", xo, [
                      n("label", Io, m(l(t)("settings.items.smartBackspace")), 1),
                      n("p", So, m(l(t)("settings.items.smartBackspaceDesc")), 1)
                    ]),
                    n("label", Eo, [
                      G(n("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": _[4] || (_[4] = (x) => l(B).smartBackspace = x)
                      }, null, 512), [
                        [_e, l(B).smartBackspace]
                      ]),
                      _[19] || (_[19] = n("span", { class: "slider" }, null, -1))
                    ])
                  ])
                ])) : z("", !0),
                c.value === "interface" ? (k(), I("div", Ao, [
                  n("h3", Po, [
                    A(l(L), { icon: "mdi:translate" }),
                    J(" " + m(l(t)("settings.sections.interface")), 1)
                  ]),
                  n("div", Mo, [
                    n("div", Lo, [
                      n("label", Do, m(l(t)("settings.items.language")), 1),
                      n("p", Ro, m(l(t)("settings.items.languageDesc")), 1)
                    ]),
                    G(n("select", {
                      "onUpdate:modelValue": _[5] || (_[5] = (x) => l(B).language = x),
                      class: "language-select"
                    }, _[20] || (_[20] = [
                      n("option", { value: "en" }, "English", -1),
                      n("option", { value: "zh-CN" }, "简体中文", -1)
                    ]), 512), [
                      [qe, l(B).language]
                    ])
                  ]),
                  n("div", Oo, [
                    n("div", Fo, [
                      n("label", jo, m(l(t)("settings.items.tagMaxLength")), 1),
                      n("p", No, m(l(t)("settings.items.tagMaxLengthDesc")), 1)
                    ]),
                    G(n("input", {
                      type: "number",
                      "onUpdate:modelValue": _[6] || (_[6] = (x) => l(B).tagMaxLength = x),
                      class: "input-number",
                      min: "0",
                      step: "5"
                    }, null, 512), [
                      [
                        Z,
                        l(B).tagMaxLength,
                        void 0,
                        { number: !0 }
                      ]
                    ])
                  ])
                ])) : z("", !0),
                c.value === "data" ? (k(), I("div", Uo, [
                  n("h3", Vo, [
                    A(l(L), { icon: "mdi:database" }),
                    J(" " + m(l(t)("settings.sections.data")), 1)
                  ]),
                  n("div", Bo, [
                    n("div", zo, [
                      n("label", Ho, m(l(t)("settings.items.allowEditDefaultTags") || "Allow Editing Default Tags"), 1),
                      n("p", Wo, m(l(t)("settings.items.allowEditDefaultTagsDesc") || "Enable editing and deleting of default tags (Use with caution)."), 1)
                    ]),
                    n("label", Go, [
                      G(n("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": _[7] || (_[7] = (x) => l(B).allowEditDefaultTags = x)
                      }, null, 512), [
                        [_e, l(B).allowEditDefaultTags]
                      ]),
                      _[21] || (_[21] = n("span", { class: "slider" }, null, -1))
                    ])
                  ]),
                  n("div", qo, [
                    n("div", Qo, [
                      n("label", Ko, m(l(t)("settings.items.updateTags")), 1),
                      n("p", Jo, m(l(t)("settings.items.updateTagsDesc")), 1)
                    ]),
                    n("div", Yo, [
                      n("button", {
                        class: "btn-update primary",
                        disabled: O.value || w.value,
                        onClick: _[8] || (_[8] = (x) => C("update_github"))
                      }, [
                        O.value && c.value === "data" ? (k(), re(l(L), {
                          key: 0,
                          icon: "mdi:loading",
                          class: "spin"
                        })) : z("", !0),
                        n("span", null, m(l(t)("settings.items.updateNow")), 1)
                      ], 8, Xo)
                    ])
                  ]),
                  n("div", Zo, [
                    n("div", ea, [
                      n("label", ta, m(l(t)("settings.items.updateLikedTags") || "Update Liked Tags"), 1),
                      n("p", sa, m(l(t)("settings.items.updateLikedTagsDesc") || "Sync liked tags data with main database."), 1)
                    ]),
                    n("div", na, [
                      n("button", {
                        class: "btn-update secondary",
                        disabled: O.value,
                        onClick: _[9] || (_[9] = (x) => C("update_liked"))
                      }, [
                        A(l(L), { icon: "mdi:heart" }),
                        n("span", null, m(l(t)("common.update") || "Update"), 1)
                      ], 8, oa)
                    ])
                  ]),
                  n("div", aa, [
                    n("div", ia, [
                      n("label", la, m(l(t)("settings.items.updateUserTags") || "Update User Tags"), 1),
                      n("p", ra, m(l(t)("settings.items.updateUserTagsDesc") || "Sync custom tags data with main database."), 1)
                    ]),
                    n("div", ca, [
                      n("button", {
                        class: "btn-update secondary",
                        disabled: O.value,
                        onClick: _[10] || (_[10] = (x) => C("update_user"))
                      }, [
                        A(l(L), { icon: "mdi:account-tag" }),
                        n("span", null, m(l(t)("common.update") || "Update"), 1)
                      ], 8, ua)
                    ])
                  ]),
                  $.value ? (k(), I("div", {
                    key: 0,
                    class: fe(["update-status-box", { error: $.value.includes("failed") || $.value.toLowerCase().includes("error"), success: $.value.includes("success") || $.value.includes("upToDate") || $.value.includes("updated") }])
                  }, [
                    A(l(L), {
                      icon: $.value.includes("success") || $.value.includes("upToDate") || $.value.includes("updated") ? "mdi:check-circle" : "mdi:alert-circle"
                    }, null, 8, ["icon"]),
                    n("span", null, m($.value), 1)
                  ], 2)) : z("", !0)
                ])) : z("", !0),
                c.value === "categoryManager" ? (k(), I("div", da, [
                  n("h3", fa, [
                    A(l(L), { icon: "mdi:palette" }),
                    J(" " + m(l(t)("settings.sections.categoryManager") || "Category Management"), 1)
                  ]),
                  n("div", ga, [
                    n("div", pa, [
                      G(n("input", {
                        "onUpdate:modelValue": _[11] || (_[11] = (x) => u.value = x),
                        placeholder: l(t)("category.namePlaceholder"),
                        class: "input-text"
                      }, null, 8, ha), [
                        [Z, u.value]
                      ]),
                      G(n("input", {
                        "onUpdate:modelValue": _[12] || (_[12] = (x) => f.value = x),
                        type: "color",
                        class: "input-color"
                      }, null, 512), [
                        [Z, f.value]
                      ]),
                      n("button", {
                        class: "btn-primary",
                        onClick: v
                      }, m(l(t)("category.addButton")), 1)
                    ]),
                    n("div", ma, [
                      (k(!0), I(ee, null, te(l(ne).categories.value, (x) => (k(), I("div", {
                        key: x.id,
                        class: "cat-item"
                      }, [
                        n("div", {
                          class: "cat-dot",
                          style: le({ backgroundColor: x.color })
                        }, null, 4),
                        n("span", va, m(x.name), 1),
                        n("span", ya, "#" + m(x.id), 1),
                        [0, 1, 3, 4, 5, 6, 7].includes(x.id) ? z("", !0) : (k(), I("button", {
                          key: 0,
                          class: "btn-icon",
                          onClick: (q) => p(x.id)
                        }, [
                          A(l(L), { icon: "mdi:delete" })
                        ], 8, _a))
                      ]))), 128))
                    ])
                  ])
                ])) : z("", !0),
                c.value === "metaManager" ? (k(), I("div", ba, [
                  n("h3", wa, [
                    A(l(L), { icon: "mdi:format-list-bulleted-type" }),
                    J(" " + m(l(t)("settings.sections.metaManager") || "Meta Presets Management"), 1)
                  ]),
                  n("div", ka, [
                    n("div", Ca, [
                      n("h4", null, m(P.value ? l(t)("settings.meta.editPreset") : l(t)("settings.meta.newPreset")), 1),
                      n("div", Ta, [
                        G(n("input", {
                          "onUpdate:modelValue": _[13] || (_[13] = (x) => b.value = x),
                          placeholder: l(t)("settings.meta.presetNamePlaceholder"),
                          class: "input-text"
                        }, null, 8, $a), [
                          [Z, b.value]
                        ])
                      ]),
                      n("div", xa, [
                        G(n("textarea", {
                          "onUpdate:modelValue": _[14] || (_[14] = (x) => g.value = x),
                          placeholder: l(t)("settings.meta.presetTagsPlaceholder"),
                          class: "input-textarea"
                        }, null, 8, Ia), [
                          [Z, g.value]
                        ])
                      ]),
                      n("div", Sa, [
                        b.value || g.value ? (k(), I("button", {
                          key: 0,
                          class: "btn-cancel",
                          onClick: R
                        }, m(l(t)("common.cancel")), 1)) : z("", !0),
                        n("button", {
                          class: "btn-primary",
                          onClick: T
                        }, m(P.value ? l(t)("common.update") : l(t)("category.addButton")), 1)
                      ])
                    ]),
                    n("div", Ea, [
                      n("h4", null, m(l(t)("settings.meta.customPresetsHeading")), 1),
                      (k(!0), I(ee, null, te(l(W).customPresets.value, (x) => (k(), I("div", {
                        key: x.id,
                        class: "preset-item"
                      }, [
                        n("div", Aa, [
                          n("span", Pa, m(x.name), 1),
                          n("span", Ma, m(x.tags.join(", ")), 1)
                        ]),
                        n("div", La, [
                          n("button", {
                            class: "btn-icon",
                            onClick: (q) => N(x)
                          }, [
                            A(l(L), { icon: "mdi:pencil" })
                          ], 8, Da),
                          n("button", {
                            class: "btn-icon",
                            onClick: (q) => M(x.id)
                          }, [
                            A(l(L), { icon: "mdi:delete" })
                          ], 8, Ra)
                        ])
                      ]))), 128)),
                      l(W).customPresets.value.length === 0 ? (k(), I("div", Oa, m(l(t)("settings.meta.noCustomPresets")), 1)) : z("", !0)
                    ]),
                    n("div", Fa, [
                      n("h4", ja, m(l(t)("settings.meta.defaultPresetsHeading")), 1),
                      (k(!0), I(ee, null, te(l(W).defaultPresets.value, (x) => (k(), I("div", {
                        key: x.id,
                        class: "preset-item default"
                      }, [
                        n("div", Na, [
                          n("span", Ua, m(x.name), 1),
                          n("span", Va, m(x.tags.join(", ")), 1)
                        ])
                      ]))), 128))
                    ])
                  ])
                ])) : z("", !0),
                c.value === "tagManager" ? (k(), I("div", Ba, [
                  n("h3", za, [
                    A(l(L), { icon: "mdi:tag-multiple" }),
                    J(" " + m(l(t)("settings.sections.tagManager") || "Tag Manager"), 1)
                  ]),
                  A(zn)
                ])) : z("", !0)
              ])
            ]),
            n("div", Ha, [
              n("div", Wa, [
                A(l(L), { icon: "mdi:information-outline" }),
                J(" " + m(l(t)("settings.autoSave")), 1)
              ]),
              n("button", {
                class: "btn-primary",
                onClick: r
              }, m(l(t)("common.done")), 1)
            ])
          ])
        ])) : z("", !0)
      ]),
      _: 1
    }));
  }
}), qa = /* @__PURE__ */ ce(Ga, [["__scopeId", "data-v-0b481180"]]), Qa = { class: "sp-modal-container" }, Ka = { class: "sp-modal-header" }, Ja = { class: "sp-modal-title" }, Ya = { class: "sp-modal-actions" }, Xa = ["title"], Za = ["title"], ei = { class: "sp-modal-body" }, ti = { class: "sp-modal-footer" }, si = { class: "sp-footer-left" }, ni = { class: "sp-hint" }, oi = { class: "sp-footer-right" }, ai = /* @__PURE__ */ oe({
  __name: "ModalWrapper",
  props: {
    visible: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["close", "save"],
  setup(e, { emit: o }) {
    const s = o, a = e, { t } = ue(), i = E(!1), r = E(!1), d = () => {
      i.value = !0;
    }, c = () => {
      i.value = !1;
    }, u = () => {
      r.value = !0;
    }, f = () => {
      r.value = !1;
    }, v = () => {
      s("close");
    }, p = () => {
      s("save");
    }, b = (g) => {
      i.value || r.value || (g.key === "Escape" && a.visible && v(), (g.ctrlKey || g.metaKey) && g.key === "s" && (g.preventDefault(), p()));
    };
    return xe(() => {
      window.addEventListener("keydown", b);
    }), Le(() => {
      window.removeEventListener("keydown", b);
    }), (g, P) => (k(), re(De, { name: "fade" }, {
      default: we(() => [
        e.visible ? (k(), I("div", {
          key: 0,
          class: "sp-modal-overlay",
          onClick: de(v, ["self"])
        }, [
          n("div", Qa, [
            n("div", Ka, [
              n("div", Ja, [
                A(l(L), {
                  icon: "mdi:pencil-box-outline",
                  class: "sp-icon"
                }),
                n("span", null, m(l(t)("editor.subtitle")), 1)
              ]),
              n("div", Ya, [
                n("button", {
                  class: "sp-btn-icon",
                  title: l(t)("settings.title"),
                  onClick: d
                }, [
                  A(l(L), { icon: "mdi:cog" })
                ], 8, Xa),
                n("button", {
                  class: "sp-btn-icon sp-btn-close",
                  onClick: v,
                  title: l(t)("common.close")
                }, [
                  A(l(L), { icon: "mdi:close" })
                ], 8, Za)
              ])
            ]),
            n("div", ei, [
              zt(g.$slots, "content", { openCustomTag: u }, void 0, !0)
            ]),
            n("div", ti, [
              n("div", si, [
                n("span", ni, m(l(t)("editor.autocompleteHint")), 1)
              ]),
              n("div", oi, [
                n("button", {
                  class: "sp-btn sp-btn-secondary",
                  onClick: v
                }, m(l(t)("common.cancel")), 1),
                n("button", {
                  class: "sp-btn sp-btn-primary",
                  onClick: p
                }, m(l(t)("common.save")), 1)
              ])
            ])
          ]),
          A(qa, {
            visible: i.value,
            onClose: c
          }, null, 8, ["visible"]),
          A(It, {
            visible: r.value,
            onClose: f
          }, null, 8, ["visible"])
        ])) : z("", !0)
      ]),
      _: 3
    }));
  }
}), ii = /* @__PURE__ */ ce(ai, [["__scopeId", "data-v-86b97fcd"]]), me = class me {
  constructor() {
    se(this, "isInitialized", !1);
  }
  static getInstance() {
    return me.instance || (me.instance = new me()), me.instance;
  }
  async init() {
    this.isInitialized || (console.log("[DuckDB] Backend initialization check (API-based)"), this.isInitialized = !0);
  }
  async searchTags(o, s = 20, a = !1, t = []) {
    const i = new URLSearchParams({
      q: o,
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
        if (c.name && c.name.toLowerCase().includes(o.toLowerCase()))
          return c;
        const f = Array.isArray(c.alias) ? c.alias : [];
        if (f.length > 0) {
          const v = f.find(
            (p) => p && p.toLowerCase().includes(o.toLowerCase())
          );
          if (v)
            return { ...c, matched_alias: v };
        }
        return c;
      }) : d;
    } catch (r) {
      return console.error("[DuckDB] Search failed via API:", r), [];
    }
  }
  async getTagsDetails(o) {
    if (o.length === 0) return {};
    try {
      const s = await fetch("/simple-prompt/get-tags-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ names: o })
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
let ye = me;
function li(e, o) {
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
  }), navigator.userAgent.toLowerCase().indexOf("firefox") > -1 ? e.scrollHeight > parseInt(i.height) && (t.overflowY = "scroll") : t.overflow = "hidden", a.textContent = e.value.substring(0, o), e.nodeName === "INPUT" && (a.textContent = a.textContent.replace(/\s/g, " "));
  const r = document.createElement("span");
  r.textContent = e.value.substring(o) || ".", a.appendChild(r);
  const d = {
    top: r.offsetTop + parseInt(i.borderTopWidth),
    left: r.offsetLeft + parseInt(i.borderLeftWidth),
    height: parseInt(i.lineHeight)
  };
  return document.body.removeChild(a), d;
}
const ri = { class: "autocomplete-list" }, ci = {
  key: 0,
  class: "loading-item"
}, ui = {
  key: 1,
  class: "no-results"
}, di = ["onClick"], fi = { class: "item-left" }, gi = { class: "item-name" }, pi = {
  key: 0,
  class: "item-alias"
}, hi = { class: "item-right" }, mi = { class: "item-count" }, vi = /* @__PURE__ */ oe({
  __name: "AutocompleteList",
  props: {
    items: {},
    selectedIndex: {},
    loading: { type: Boolean }
  },
  emits: ["select"],
  setup(e, { emit: o }) {
    const s = o, { t: a } = ue(), t = (d) => {
      s("select", d);
    }, i = (d) => X.getInstance().getColor(d), r = (d) => {
      const c = Number(d);
      return c >= 1e6 ? (c / 1e6).toFixed(1) + "M" : c >= 1e3 ? (c / 1e3).toFixed(1) + "k" : c.toString();
    };
    return (d, c) => (k(), I("div", ri, [
      d.loading ? (k(), I("div", ci, [
        A(l(L), {
          icon: "mdi:loading",
          class: "spin"
        }),
        J(" " + m(l(a)("editor.loading")), 1)
      ])) : d.items.length === 0 ? (k(), I("div", ui, m(l(a)("editor.noMatches")), 1)) : (k(!0), I(ee, { key: 2 }, te(d.items, (u, f) => (k(), I("div", {
        key: u.name,
        class: fe(["menu-item", { selected: f === d.selectedIndex }]),
        onClick: (v) => t(u),
        onMousedown: c[0] || (c[0] = de(() => {
        }, ["prevent"]))
      }, [
        n("div", fi, [
          n("div", {
            class: "category-dot",
            style: le({ backgroundColor: i(u.category) })
          }, null, 4),
          n("span", gi, m(u.name), 1),
          u.alias_match ? (k(), I("span", pi, "(" + m(u.alias_match) + ")", 1)) : z("", !0)
        ]),
        n("div", hi, [
          n("span", mi, m(r(u.post_count)), 1)
        ])
      ], 42, di))), 128))
    ]));
  }
}), yi = /* @__PURE__ */ ce(vi, [["__scopeId", "data-v-7fa181e7"]]), _i = ["title"], bi = {
  key: 0,
  class: "tag-weight"
}, wi = ["title"], ki = { class: "weight-value" }, Ci = ["title"], Ti = ["title"], $i = /* @__PURE__ */ oe({
  __name: "TagItem",
  props: {
    tag: {}
  },
  emits: ["remove", "update:weight", "toggle:enabled"],
  setup(e, { emit: o }) {
    const s = e, a = o, { t } = ue(), i = ve(() => X.getInstance().getColor(s.tag.category || 0)), r = ve(() => s.tag.weight !== 1), d = ve(() => {
      const M = B.tagMaxLength, R = s.tag.text;
      return M > 0 && R.length > M ? R.substring(0, M) + "..." : R;
    }), c = () => {
      a("remove", s.tag.id);
    }, u = () => {
      a("toggle:enabled", s.tag.id);
    }, f = () => {
      const M = Math.min(s.tag.weight + 0.1, 2);
      a("update:weight", s.tag.id, parseFloat(M.toFixed(1)));
    }, v = () => {
      const M = Math.max(s.tag.weight - 0.1, 0.1);
      a("update:weight", s.tag.id, parseFloat(M.toFixed(1)));
    }, p = E(!1), b = E(null), g = E(""), P = async () => {
      var M, R;
      g.value = s.tag.weight.toString(), p.value = !0, await Pe(), (M = b.value) == null || M.focus(), (R = b.value) == null || R.select();
    }, T = () => {
      if (!p.value) return;
      const M = parseFloat(g.value);
      !isNaN(M) && M >= 0 && a("update:weight", s.tag.id, parseFloat(M.toFixed(2))), p.value = !1;
    }, N = (M) => {
      M.key === "Enter" ? T() : M.key === "Escape" && (p.value = !1);
    };
    return (M, R) => (k(), I("div", {
      class: fe(["tag-item", { disabled: !M.tag.enabled }]),
      style: le({ "--category-color": i.value }),
      onDblclick: de(P, ["stop"])
    }, [
      R[2] || (R[2] = n("div", { class: "tag-dot" }, null, -1)),
      n("span", {
        class: "tag-text",
        title: M.tag.text,
        onClick: u
      }, m(d.value), 9, _i),
      r.value && !p.value ? (k(), I("div", bi, [
        n("button", {
          class: "weight-btn",
          onClick: v,
          title: l(t)("editor.decreaseWeight")
        }, [
          A(l(L), { icon: "mdi:minus" })
        ], 8, wi),
        n("span", ki, m(M.tag.weight.toFixed(1)), 1),
        n("button", {
          class: "weight-btn",
          onClick: f,
          title: l(t)("editor.increaseWeight")
        }, [
          A(l(L), { icon: "mdi:plus" })
        ], 8, Ci)
      ])) : z("", !0),
      p.value ? G((k(), I("input", {
        key: 1,
        ref_key: "weightInput",
        ref: b,
        "onUpdate:modelValue": R[0] || (R[0] = ($) => g.value = $),
        class: "weight-input",
        onBlur: T,
        onKeydown: N,
        onClick: R[1] || (R[1] = de(() => {
        }, ["stop"]))
      }, null, 544)), [
        [Z, g.value]
      ]) : z("", !0),
      n("button", {
        class: "tag-remove",
        onClick: c,
        title: l(t)("editor.removeTag")
      }, [
        A(l(L), { icon: "mdi:close" })
      ], 8, Ti)
    ], 38));
  }
}), xi = /* @__PURE__ */ ce($i, [["__scopeId", "data-v-2cba916c"]]), Ii = { class: "visual-tag-area" }, Si = {
  key: 0,
  class: "empty-state"
}, Ei = {
  key: 1,
  class: "tags-scroller"
}, Ai = ["onDragstart", "onDragenter"], Pi = /* @__PURE__ */ oe({
  __name: "VisualTagArea",
  props: {
    tags: {}
  },
  emits: ["update:tags"],
  setup(e, { emit: o }) {
    const s = e, a = o, t = E([]), i = E(null);
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
    }, v = (b) => {
      if (i.value !== null && i.value !== b) {
        const g = i.value, P = b, T = t.value[g], N = [...t.value];
        N.splice(g, 1), N.splice(P, 0, T), t.value = N, i.value = P;
      }
    }, p = () => {
      i.value !== null && (a("update:tags", t.value), i.value = null);
    };
    return (b, g) => (k(), I("div", Ii, [
      t.value.length === 0 ? (k(), I("div", Si, g[0] || (g[0] = [
        n("p", null, "No tags yet. Start typing in the editor...", -1)
      ]))) : (k(), I("div", Ei, [
        A(Ht, {
          name: "tag-list",
          tag: "div",
          class: "tags-container"
        }, {
          default: we(() => [
            (k(!0), I(ee, null, te(t.value, (P, T) => (k(), I("div", {
              key: P.id,
              class: "tag-wrapper",
              draggable: "true",
              onDragstart: (N) => u(N, T),
              onDragover: f,
              onDragenter: (N) => v(T),
              onDragend: p
            }, [
              A(xi, {
                tag: P,
                onRemove: r,
                "onUpdate:weight": d,
                "onToggle:enabled": c
              }, null, 8, ["tag"])
            ], 40, Ai))), 128))
          ]),
          _: 1
        })
      ]))
    ]));
  }
}), Mi = /* @__PURE__ */ ce(Pi, [["__scopeId", "data-v-5d3d64b5"]]), Li = { class: "toolbar" }, Di = ["title"], Ri = ["title"], Oi = { class: "switch-group" }, Fi = { class: "switch-label" }, ji = { class: "switch" }, Ni = ["checked"], Ui = ["title"], Vi = {
  key: 0,
  class: "meta-popup"
}, Bi = { class: "meta-search-box" }, zi = ["placeholder"], Hi = { class: "meta-list-scroll" }, Wi = ["onClick"], Gi = { class: "meta-name" }, qi = {
  key: 0,
  class: "meta-empty"
}, Qi = { class: "meta-footer" }, Ki = { class: "meta-footer-hint" }, Ji = { class: "tag-count" }, Yi = /* @__PURE__ */ oe({
  __name: "OtherFunctions",
  props: {
    tagCount: {},
    autoMeta: { type: Boolean }
  },
  emits: ["open-search", "format", "organize", "update:autoMeta", "insert-meta"],
  setup(e, { emit: o }) {
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
    const c = ve(() => {
      const f = i.value.toLowerCase().trim();
      return f ? W.presets.value.filter((v) => v.name.toLowerCase().includes(f)) : W.presets.value;
    }), u = (f) => {
      W.setActivePreset(f), a.value = !1;
    };
    return (f, v) => (k(), I("div", Li, [
      n("button", {
        class: "toolbar-btn",
        onClick: v[0] || (v[0] = (p) => f.$emit("format")),
        title: l(s)("editor.formatTitle") || "Format Text"
      }, [
        A(l(L), { icon: "mdi:format-align-left" }),
        n("span", null, m(l(s)("editor.format") || "Format"), 1)
      ], 8, Di),
      n("button", {
        class: "toolbar-btn",
        onClick: v[1] || (v[1] = (p) => f.$emit("organize")),
        title: l(s)("editor.organizeTitle") || "Organize Tags"
      }, [
        A(l(L), { icon: "mdi:sort" }),
        n("span", null, m(l(s)("editor.organize") || "Organize"), 1)
      ], 8, Ri),
      v[6] || (v[6] = n("div", { class: "separator" }, null, -1)),
      n("div", Oi, [
        n("label", Fi, m(l(s)("editor.autoMeta") || "Auto Meta"), 1),
        n("label", ji, [
          n("input", {
            type: "checkbox",
            checked: f.autoMeta,
            onChange: v[2] || (v[2] = (p) => f.$emit("update:autoMeta", p.target.checked))
          }, null, 40, Ni),
          v[5] || (v[5] = n("span", { class: "slider" }, null, -1))
        ])
      ]),
      n("div", {
        class: "meta-menu-wrapper",
        ref_key: "metaMenuRef",
        ref: t
      }, [
        n("button", {
          class: "toolbar-btn icon-only",
          onClick: de(r, ["stop"]),
          title: l(s)("editor.qualityWords") || "Select Meta Preset"
        }, [
          A(l(L), { icon: "mdi:cog" })
        ], 8, Ui),
        a.value ? (k(), I("div", Vi, [
          n("div", Bi, [
            G(n("input", {
              "onUpdate:modelValue": v[3] || (v[3] = (p) => i.value = p),
              placeholder: l(s)("settings.meta.searchPlaceholder"),
              class: "meta-search-input"
            }, null, 8, zi), [
              [Z, i.value]
            ])
          ]),
          n("div", Hi, [
            (k(!0), I(ee, null, te(c.value, (p) => (k(), I("div", {
              key: p.id,
              class: fe(["meta-item", { active: l(W).activePresetId.value === p.id }]),
              onClick: (b) => u(p.id)
            }, [
              n("span", Gi, m(p.name), 1),
              l(W).activePresetId.value === p.id ? (k(), re(l(L), {
                key: 0,
                icon: "mdi:check"
              })) : z("", !0)
            ], 10, Wi))), 128)),
            c.value.length === 0 ? (k(), I("div", qi, m(l(s)("settings.meta.noPresetsFound")), 1)) : z("", !0)
          ]),
          n("div", Qi, [
            n("span", Ki, m(l(s)("settings.meta.editInSettings")), 1)
          ])
        ])) : z("", !0)
      ], 512),
      v[7] || (v[7] = n("div", { class: "separator" }, null, -1)),
      n("button", {
        class: "toolbar-btn",
        onClick: v[4] || (v[4] = (p) => f.$emit("open-search"))
      }, [
        A(l(L), { icon: "mdi:magnify" }),
        n("span", null, m(l(s)("editor.searchBtn")), 1)
      ]),
      v[8] || (v[8] = n("div", { class: "separator" }, null, -1)),
      n("div", Ji, [
        A(l(L), { icon: "mdi:tag-multiple" }),
        n("span", null, m(l(s)("editor.tagCount")) + m(f.tagCount || 0), 1)
      ])
    ]));
  }
}), Xi = /* @__PURE__ */ ce(Yi, [["__scopeId", "data-v-92303e18"]]), Zi = { class: "modal-container" }, el = { class: "modal-header" }, tl = { class: "modal-title" }, sl = ["title"], nl = { class: "search-section" }, ol = { class: "search-box" }, al = ["placeholder"], il = { class: "category-filters" }, ll = { class: "filter-label" }, rl = ["onClick"], cl = { class: "results-section" }, ul = {
  key: 0,
  class: "loading-state"
}, dl = {
  key: 1,
  class: "empty-state"
}, fl = {
  key: 2,
  class: "results-list"
}, gl = ["onClick"], pl = { class: "tag-info" }, hl = { class: "tag-name-row" }, ml = { class: "tag-name" }, vl = ["innerHTML"], yl = ["innerHTML"], _l = ["innerHTML"], bl = { class: "tag-meta" }, wl = { class: "category-label" }, kl = { class: "post-count" }, Cl = { class: "actions" }, Tl = ["onClick", "title"], $l = ["title"], xl = {
  key: 3,
  class: "hint-state"
}, Il = /* @__PURE__ */ oe({
  __name: "TagSearchModal",
  props: {
    visible: { type: Boolean }
  },
  emits: ["close", "add-tag"],
  setup(e, { emit: o }) {
    const s = e, { t: a } = ue(), t = o, i = E(""), r = E([]), d = E(!1), c = E([]), u = ve(() => {
      const C = X.getInstance().getAll();
      return C.length === 0 ? [] : C.map((y) => ({
        value: y.value,
        label: y.value <= 5 ? a(`search.categories.${y.label.toLowerCase()}`) : y.label,
        color: y.color
      }));
    }), f = (h) => {
      const C = c.value.indexOf(h);
      C > -1 ? c.value.splice(C, 1) : c.value.push(h), i.value.trim() && p();
    }, v = (h) => c.value.includes(h), p = async () => {
      const h = i.value.trim();
      if (!h || h.length < 2) {
        r.value = [];
        return;
      }
      d.value = !0;
      try {
        const y = await ye.getInstance().searchTags(h, 50, !0, c.value);
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
        p();
      }, 300);
    }, P = (h) => {
      t("add-tag", h.name, h.category);
    }, T = () => {
      t("close");
    };
    ae(() => s.visible, (h) => {
      h ? X.getInstance().init() : (i.value = "", r.value = [], c.value = []);
    });
    const N = (h) => {
      const y = X.getInstance().getCategory(h);
      return y.value <= 5 ? a(`search.categories.${y.label.toLowerCase()}`) : y.label;
    }, M = (h) => X.getInstance().getColor(h), R = (h) => (h == null ? void 0 : h.toLocaleString()) || "0", $ = (h, C) => {
      if (!C || !h) return h;
      const y = new RegExp(`(${C.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
      return h.replace(y, '<strong class="match-bold">$1</strong>');
    }, O = (h) => h.priority === 1, w = async (h, C) => {
      C.stopPropagation();
      const y = O(h);
      h.priority = y ? 4 : 1;
      try {
        const _ = {
          name: h.name,
          is_liked: !y,
          category: h.category,
          post_count: h.post_count,
          alias: h.alias
        };
        await fetch("/simple-prompt/toggle-like-tag", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(_)
        });
      } catch (_) {
        console.error("Toggle like failed", _), h.priority = y ? 1 : 4;
      }
    };
    return (h, C) => (k(), re(De, { name: "fade" }, {
      default: we(() => [
        h.visible ? (k(), I("div", {
          key: 0,
          class: "modal-overlay",
          onClick: de(T, ["self"])
        }, [
          n("div", Zi, [
            n("div", el, [
              n("div", tl, [
                A(l(L), {
                  icon: "mdi:database-search",
                  class: "title-icon"
                }),
                n("span", null, m(l(a)("search.title")), 1)
              ]),
              n("button", {
                class: "close-btn",
                onClick: T,
                title: l(a)("common.close")
              }, [
                A(l(L), { icon: "mdi:close" })
              ], 8, sl)
            ]),
            n("div", nl, [
              n("div", ol, [
                A(l(L), {
                  icon: "mdi:magnify",
                  class: "search-icon"
                }),
                G(n("input", {
                  "onUpdate:modelValue": C[0] || (C[0] = (y) => i.value = y),
                  type: "text",
                  placeholder: l(a)("search.placeholder"),
                  class: "search-input",
                  onInput: g,
                  autofocus: ""
                }, null, 40, al), [
                  [Z, i.value]
                ]),
                i.value ? (k(), I("button", {
                  key: 0,
                  class: "clear-btn",
                  onClick: C[1] || (C[1] = (y) => {
                    i.value = "", r.value = [];
                  }),
                  title: "Clear"
                }, [
                  A(l(L), { icon: "mdi:close-circle" })
                ])) : z("", !0)
              ]),
              n("div", il, [
                n("span", ll, m(l(a)("search.filterLabel")), 1),
                (k(!0), I(ee, null, te(u.value, (y) => (k(), I("button", {
                  key: y.value,
                  class: fe(["category-chip", { active: v(y.value) }]),
                  style: le({ "--category-color": y.color }),
                  onClick: (_) => f(y.value)
                }, [
                  n("span", {
                    class: "category-dot",
                    style: le({ backgroundColor: y.color })
                  }, null, 4),
                  J(" " + m(y.label), 1)
                ], 14, rl))), 128))
              ])
            ]),
            n("div", cl, [
              d.value ? (k(), I("div", ul, [
                A(l(L), {
                  icon: "mdi:loading",
                  class: "spin"
                }),
                n("span", null, m(l(a)("search.loading")), 1)
              ])) : r.value.length === 0 && i.value.trim() ? (k(), I("div", dl, [
                A(l(L), { icon: "mdi:magnify-close" }),
                n("p", null, m(l(a)("search.noResults")), 1)
              ])) : r.value.length > 0 ? (k(), I("div", fl, [
                (k(!0), I(ee, null, te(r.value, (y) => (k(), I("div", {
                  key: y.name,
                  class: "result-item",
                  style: le({ "--cat-color": M(y.category) }),
                  onClick: (_) => P(y)
                }, [
                  n("div", pl, [
                    n("div", hl, [
                      C[2] || (C[2] = n("span", { class: "category-indicator" }, null, -1)),
                      n("span", ml, [
                        y.matched_alias ? (k(), I(ee, { key: 1 }, [
                          n("span", {
                            innerHTML: $(y.name, i.value)
                          }, null, 8, yl),
                          n("span", {
                            class: "alias-indicator",
                            innerHTML: $(y.matched_alias, i.value)
                          }, null, 8, _l)
                        ], 64)) : (k(), I("span", {
                          key: 0,
                          innerHTML: $(y.name, i.value)
                        }, null, 8, vl))
                      ])
                    ]),
                    n("div", bl, [
                      n("span", wl, m(N(y.category)), 1),
                      n("span", kl, [
                        A(l(L), { icon: "mdi:image-multiple" }),
                        J(" " + m(R(y.post_count)), 1)
                      ])
                    ])
                  ]),
                  n("div", Cl, [
                    n("button", {
                      class: fe(["action-btn like-btn", { liked: O(y) }]),
                      onClick: (_) => w(y, _),
                      title: O(y) ? "Unlike" : "Like"
                    }, [
                      A(l(L), {
                        icon: O(y) ? "mdi:heart" : "mdi:heart-outline"
                      }, null, 8, ["icon"])
                    ], 10, Tl),
                    n("button", {
                      class: "action-btn add-btn",
                      title: l(a)("search.addBtnTitle")
                    }, [
                      A(l(L), { icon: "mdi:plus" })
                    ], 8, $l)
                  ])
                ], 12, gl))), 128))
              ])) : (k(), I("div", xl, [
                A(l(L), { icon: "mdi:information-outline" }),
                n("p", null, m(l(a)("search.hint")), 1)
              ]))
            ])
          ])
        ])) : z("", !0)
      ]),
      _: 1
    }));
  }
}), Sl = /* @__PURE__ */ ce(Il, [["__scopeId", "data-v-c0eb3703"]]);
function ie(e) {
  if (!e.trim()) return [];
  const o = [];
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
      t.trim() && (o.push({
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
        const f = e.substring(a + 1, u - 1), v = f.indexOf(":");
        if (v > 0) {
          r = f.substring(0, v).trim(), r = r.replace(/\\([()])/g, "$1"), i = f.substring(v + 1).trim();
          const p = parseFloat(i);
          !isNaN(p) && r && o.push({
            id: `tag-${s++}`,
            text: r,
            weight: p,
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
      t.trim() && (o.push({
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
  return t.trim() && o.push({
    id: `tag-${s++}`,
    text: t.trim(),
    weight: 1,
    enabled: !0,
    category: K.GENERAL
  }), o;
}
function Ve(e) {
  const o = e.filter((s) => s.enabled);
  return o.length === 0 ? "" : o.map((s) => {
    const a = s.text.replace(new RegExp("(?<!\\\\)\\(", "g"), "\\(").replace(new RegExp("(?<!\\\\)\\)", "g"), "\\)");
    return s.weight !== 1 ? `(${a}:${s.weight.toFixed(1)})` : a;
  }).join(", ") + ",";
}
function El(e, o, s) {
  if (!o.length) return e;
  const a = new Set(o.map(($) => $.toLowerCase())), t = new Set(s.map(($) => $.toLowerCase())), i = [];
  let r = 0, d = 0, c = "";
  const u = ($, O, w, h) => {
    const C = $.trim();
    if (!C) return;
    const y = C.match(/^\((.+):(\d+\.?\d*)\)$/);
    let _ = C, x = 1;
    y && (_ = y[1].trim(), x = parseFloat(y[2]));
    const q = _.replace(/\\([()])/g, "$1");
    i.push({
      text: q,
      fullMatch: O,
      start: w,
      end: h,
      weight: x
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
        const h = e.substring(r, w);
        e.substring(r + 1, w - 1), u(h, h, r, w), r = w, d = w, c = "";
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
  const f = [], v = /* @__PURE__ */ new Map();
  let p = e.length;
  for (const $ of i) {
    const O = $.text.toLowerCase();
    a.has(O) && (f.push($), v.set(O, $.weight)), t.has(O) && $.start < p && (p = $.start);
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
    const h = g.substring(0, O), C = g.substring(w);
    g = h + C;
    const y = w - O;
    p > $.start && (p -= y);
  }
  g = g.replace(/,\s*,/g, ","), g = g.replace(/,\s*\n/g, `,
`), g = g.replace(/\n\s*,/g, `
`);
  const P = o.map(($) => {
    const O = v.get($.toLowerCase()) || 1, w = $.replace(/\(/g, "\\(").replace(/\)/g, "\\)");
    return O !== 1 ? `(${w}:${O.toFixed(1)})` : w;
  }).join(", ") + ",", T = ie(g);
  let N = g.length;
  for (let $ = 0; $ < T.length; $++) {
    const O = T[$].text.toLowerCase();
    if (t.has(O)) {
      for (const w of s) {
        const h = w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), C = new RegExp(`(^|[,\\n\\s])${h}([,\\n]|$)`, "i"), y = g.match(C);
        if (y && y.index !== void 0) {
          const _ = y.index + y[1].length;
          _ < N && (N = _);
        }
      }
      break;
    }
  }
  let M = g.substring(0, N).trimEnd(), R = g.substring(N);
  return M && !M.endsWith(",") && !M.endsWith(`
`) && (M += ","), M && !M.endsWith(`

`) && (M.endsWith(`
`) ? M += `
` : M += `

`), R.trim() && !R.startsWith(`
`) && (R = `

` + R.trimStart()), M + P + R;
}
const Al = { class: "sp-toolbar" }, Pl = ["title"], Ml = ["title"], Ll = ["placeholder"], Dl = { class: "sp-visual-area" }, Rl = { class: "sp-footer" }, Ol = /* @__PURE__ */ oe({
  __name: "TextEditor",
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue", "cursor-move", "open-custom-tag"],
  setup(e, { expose: o, emit: s }) {
    const a = e, t = s, { t: i } = ue(), r = E(null), d = E(null), c = E(a.modelValue), u = E([]), f = E(60), v = E(!1), p = E({}), b = /* @__PURE__ */ new Set();
    let g = null;
    const P = () => {
      g && clearTimeout(g), g = setTimeout(async () => {
        const S = Array.from(b);
        if (b.clear(), S.length !== 0)
          try {
            const j = await ye.getInstance().getTagsDetails(S);
            Object.entries(j).forEach(([F, U]) => {
              p.value[F.toLowerCase()] = U;
            }), S.forEach((F) => {
              const U = F.toLowerCase();
              p.value[U] === void 0 && (p.value[U] = 0);
            }), u.value = u.value.map((F) => {
              const U = F.text.toLowerCase();
              return p.value[U] !== void 0 ? { ...F, category: p.value[U] } : F;
            });
          } catch (D) {
            console.error("Error fetching tag categories:", D);
          }
      }, 1e3);
    }, T = (S) => (S.forEach((D) => {
      const j = D.text.toLowerCase();
      p.value[j] !== void 0 ? D.category = p.value[j] : b.add(D.text);
    }), b.size > 0 && P(), S);
    u.value = T(ie(c.value));
    const N = E(!1), M = E([]), R = E(0), $ = E({ top: 0, left: 0 }), O = E(""), w = E(0), h = E(!1), C = E(!1);
    ae(() => a.modelValue, (S) => {
      S !== c.value && (c.value = S, u.value = T(ie(S)));
    });
    const y = (S) => {
      const D = S.target;
      c.value = D.value, t("update:modelValue", D.value), u.value = T(ie(D.value)), Fe(D);
    }, _ = async () => {
      try {
        await navigator.clipboard.writeText(c.value), console.log("Copied to clipboard");
      } catch (S) {
        console.error("Failed to copy: ", S);
      }
    }, x = (S) => {
      v.value = !0, document.addEventListener("mousemove", q), document.addEventListener("mouseup", Y), document.body.style.userSelect = "none";
    }, q = (S) => {
      if (!v.value || !d.value) return;
      const D = d.value.getBoundingClientRect();
      let F = (S.clientY - D.top) / D.height * 100;
      F < 20 && (F = 20), F > 80 && (F = 80), f.value = F;
    }, Y = () => {
      v.value = !1, document.removeEventListener("mousemove", q), document.removeEventListener("mouseup", Y), document.body.style.userSelect = "";
    };
    Le(() => {
      document.removeEventListener("mousemove", q), document.removeEventListener("mouseup", Y);
    });
    const Fe = async (S) => {
      const D = S.selectionEnd, j = S.value.substring(0, D), F = /([a-zA-Z0-9_\u4e00-\u9fa5]{2,})$/.exec(j);
      if (F) {
        const U = F[1];
        O.value = U, w.value = F.index;
        const V = li(S, D);
        $.value = {
          top: V.top + V.height + 5,
          // 5px padding
          left: V.left
        }, h.value = !0, N.value = !0;
        try {
          console.log(`[Autocomplete] Searching for: "${U}"`);
          const Q = await ye.getInstance().searchTags(U, 20, B.useAliasesInAutocomplete);
          M.value = Q, R.value = 0;
        } catch (H) {
          console.error("Autocomplete search error:", H);
        } finally {
          h.value = !1;
        }
      } else
        N.value = !1;
    }, ge = (S) => {
      if (N.value && M.value.length > 0) {
        if (S.key === "ArrowUp") {
          S.preventDefault(), R.value = (R.value - 1 + M.value.length) % M.value.length;
          return;
        }
        if (S.key === "ArrowDown") {
          S.preventDefault(), R.value = (R.value + 1) % M.value.length;
          return;
        }
        if (S.key === "Tab" || S.key === "Enter") {
          S.preventDefault(), Ye(M.value[R.value]);
          return;
        }
        if (S.key === "Escape") {
          S.preventDefault(), N.value = !1;
          return;
        }
      }
    }, Ye = (S) => {
      if (!r.value) return;
      const D = r.value, j = D.selectionEnd, F = c.value;
      let U = S.name;
      S.category !== void 0 && (p.value[U.toLowerCase()] = S.category), B.convertUnderscoreToSpace && (U = U.replace(/_/g, " "), S.category !== void 0 && (p.value[U.toLowerCase()] = S.category)), B.escapeBrackets && (U = U.replace(/\(/g, "\\(").replace(/\)/g, "\\)"));
      const V = F.substring(0, w.value), H = F.substring(j);
      let Q = H;
      !H.trim().startsWith(",") && !H.trim().startsWith(")") && (Q = ", " + H);
      const Ie = V + U + Q;
      c.value = Ie, t("update:modelValue", Ie), u.value = T(ie(Ie)), N.value = !1, Pe(() => {
        const Ze = V.length + U.length + (Q.startsWith(", ") ? 2 : 0);
        D.setSelectionRange(Ze, Ze), D.focus();
      });
    }, St = () => {
      setTimeout(() => {
        N.value = !1;
      }, 200);
    }, Et = () => {
      C.value = !0;
    }, At = () => {
      C.value = !1;
    }, Pt = (S, D) => {
      let j = S;
      p.value[S.toLowerCase()] = D, B.convertUnderscoreToSpace && (j = j.replace(/_/g, " "), p.value[j.toLowerCase()] = D), B.escapeBrackets && (j = j.replace(/\(/g, "\\(").replace(/\)/g, "\\)"));
      const F = {
        id: `tag-${Date.now()}-${Math.random()}`,
        text: j,
        weight: 1,
        enabled: !0,
        category: D
      }, U = [...u.value, F];
      u.value = U;
      const V = Ve(U);
      c.value = V, t("update:modelValue", V);
    }, Mt = () => {
      var S;
      (S = r.value) == null || S.focus();
    }, Lt = () => {
      let S = c.value;
      S = S.replace(/,(\S)/g, ", $1"), S !== c.value && (c.value = S, t("update:modelValue", S), u.value = T(ie(S)));
    }, Dt = (S) => {
      const D = {
        6: 0,
        4: 1,
        2: 1,
        3: 1,
        1: 2,
        0: 3,
        5: 4,
        7: 4
      };
      return D[S] !== void 0 ? D[S] : 3;
    }, Xe = (S) => {
      if (S.length === 0) return "";
      const D = { 0: [], 1: [], 2: [], 3: [], 4: [] };
      S.forEach((V) => {
        const H = V.category !== void 0 ? V.category : 0, Q = Dt(H);
        D[Q].push(V);
      }), D[1].sort((V, H) => {
        const Q = V.category !== void 0 ? V.category : 0;
        return (H.category !== void 0 ? H.category : 0) - Q;
      });
      const j = [0, 1, 2, 3, 4].map((V) => {
        const H = D[V];
        return H.length === 0 ? "" : Ve(H);
      });
      let F = "";
      const U = j.slice(0, 3).filter((V) => V).join(`
`);
      return U && (F += U), F && j[3] && (F += `

`), j[3] && (F += j[3]), F && j[4] && (F += `

`), j[4] && (F += j[4]), F;
    }, Rt = (S) => {
      u.value = S;
      const j = S.some((F) => F.category !== void 0 && F.category !== 0) ? Xe(S) : Ve(S);
      j !== c.value && (c.value = j, t("update:modelValue", j));
    }, Ot = async () => {
      const S = ie(c.value), D = T(S);
      if (b.size > 0) {
        g && clearTimeout(g);
        const F = Array.from(b);
        b.clear();
        try {
          const V = await ye.getInstance().getTagsDetails(F);
          Object.entries(V).forEach(([H, Q]) => {
            p.value[H.toLowerCase()] = Q;
          }), F.forEach((H) => {
            const Q = H.toLowerCase();
            p.value[Q] === void 0 && (p.value[Q] = 0);
          }), D.forEach((H) => {
            const Q = H.text.toLowerCase();
            p.value[Q] !== void 0 && (H.category = p.value[Q]);
          });
        } catch (U) {
          console.error("Error fetching tag categories during organize:", U);
        }
      }
      const j = Xe(D);
      j !== c.value && (c.value = j, t("update:modelValue", j), u.value = ie(j).map((F) => {
        const U = D.find((V) => V.text === F.text);
        return U ? { ...F, category: U.category } : F;
      }));
    }, Ft = (S) => {
      const D = r.value;
      if (!D) return;
      const j = D.selectionStart, F = D.selectionEnd, U = c.value;
      let V = S;
      const H = U.substring(j - 1, j);
      H && H.trim() && H !== "," ? V = ", " + V : H === "," && (V = " " + V);
      const Q = U.substring(0, j) + V + U.substring(F);
      c.value = Q, t("update:modelValue", Q), u.value = T(ie(Q)), Pe(() => {
        D.focus(), D.setSelectionRange(j + V.length, j + V.length);
      });
    }, jt = (S) => {
      B.autoMetaEnabled = S;
    };
    return o({ focus: Mt }), (S, D) => (k(), I("div", {
      class: "sp-editor-container",
      ref_key: "containerRef",
      ref: d
    }, [
      n("div", Al, [
        n("button", {
          class: "sp-btn",
          onClick: _,
          title: l(i)("editor.copyTitle")
        }, [
          D[2] || (D[2] = n("span", { class: "icon" }, "📋", -1)),
          J(" " + m(l(i)("editor.copy")), 1)
        ], 8, Pl),
        n("button", {
          class: "sp-btn",
          onClick: D[0] || (D[0] = (j) => S.$emit("open-custom-tag")),
          title: l(i)("customTag.addBtnTitle")
        }, [
          D[3] || (D[3] = n("span", { class: "icon" }, "➕", -1)),
          J(" " + m(l(i)("customTag.addBtnTitle")), 1)
        ], 8, Ml)
      ]),
      n("div", {
        class: "sp-editor-area",
        style: le({ height: `calc(${f.value}% - 40px)` })
      }, [
        G(n("textarea", {
          ref_key: "textareaRef",
          ref: r,
          class: "sp-textarea",
          "onUpdate:modelValue": D[1] || (D[1] = (j) => c.value = j),
          onInput: y,
          onKeydown: ge,
          onBlur: St,
          placeholder: l(i)("editor.placeholder"),
          spellcheck: "false"
        }, null, 40, Ll), [
          [Z, c.value]
        ]),
        N.value ? (k(), I("div", {
          key: 0,
          class: "autocomplete-wrapper",
          style: le({ top: $.value.top + "px", left: $.value.left + "px" })
        }, [
          A(yi, {
            items: M.value,
            "selected-index": R.value,
            loading: h.value,
            onSelect: Ye
          }, null, 8, ["items", "selected-index", "loading"])
        ], 4)) : z("", !0)
      ], 4),
      n("div", {
        class: "sp-splitter",
        onMousedown: x
      }, D[4] || (D[4] = [
        n("div", { class: "sp-splitter-handle" }, null, -1)
      ]), 32),
      n("div", Dl, [
        A(Mi, {
          tags: u.value,
          "onUpdate:tags": Rt
        }, null, 8, ["tags"])
      ]),
      n("div", Rl, [
        A(Xi, {
          "tag-count": u.value.length,
          "auto-meta": l(B).autoMetaEnabled,
          onOpenSearch: Et,
          onFormat: Lt,
          onOrganize: Ot,
          "onUpdate:autoMeta": jt,
          onInsertMeta: Ft
        }, null, 8, ["tag-count", "auto-meta"])
      ]),
      A(Sl, {
        visible: C.value,
        onClose: At,
        onAddTag: Pt
      }, null, 8, ["visible"])
    ], 512));
  }
}), Fl = /* @__PURE__ */ ce(Ol, [["__scopeId", "data-v-d361a752"]]), jl = { style: { width: "100%", height: "100%" } }, Bl = /* @__PURE__ */ oe({
  __name: "App",
  props: {
    initialPrompt: {}
  },
  emits: ["save", "close"],
  setup(e, { emit: o }) {
    const s = e, a = o, t = E(!0), i = E(s.initialPrompt), r = E("Initializing...");
    xe(async () => {
      try {
        await ye.getInstance().init(), await X.getInstance().init(), r.value = "Ready";
      } catch (u) {
        console.error("DB Error:", u), r.value = `Error: ${u}`;
      }
    });
    const d = () => {
      t.value = !1, a("close");
    }, c = async () => {
      let u = i.value;
      if (B.autoMetaEnabled) {
        W.presets.value.length === 0 && await W.fetchPresets();
        const f = W.getActiveTags();
        if (f.length > 0) {
          const p = ie(u).map((g) => g.text);
          let b = [];
          try {
            const P = await (await fetch("/simple-prompt/get-tags-details", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ names: p, fast: !0 })
            })).json();
            b = p.filter(
              (T) => P[T.toLowerCase()] === 7
            );
          } catch (g) {
            console.error("Failed to fetch tag categories:", g);
          }
          u = El(u, f, b);
        }
      }
      a("save", u), t.value = !1;
    };
    return (u, f) => (k(), re(ii, {
      visible: t.value,
      onClose: d,
      onSave: c
    }, {
      content: we(({ openCustomTag: v }) => [
        n("div", jl, [
          A(Fl, {
            modelValue: i.value,
            "onUpdate:modelValue": f[0] || (f[0] = (p) => i.value = p),
            onOpenCustomTag: v
          }, null, 8, ["modelValue", "onOpenCustomTag"])
        ])
      ]),
      _: 1
    }, 8, ["visible"]));
  }
});
export {
  Bl as default
};
