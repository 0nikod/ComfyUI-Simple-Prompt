/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Ze(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const G = Object.freeze({}), Pt = Object.freeze([]), de = () => {
}, Ai = () => !1, cn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), $n = (e) => e.startsWith("onUpdate:"), ee = Object.assign, Rr = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Mi = Object.prototype.hasOwnProperty, k = (e, t) => Mi.call(e, t), $ = Array.isArray, bt = (e) => fn(e) === "[object Map]", jt = (e) => fn(e) === "[object Set]", ro = (e) => fn(e) === "[object Date]", I = (e) => typeof e == "function", Q = (e) => typeof e == "string", Ie = (e) => typeof e == "symbol", K = (e) => e !== null && typeof e == "object", Nr = (e) => (K(e) || I(e)) && I(e.then) && I(e.catch), Yo = Object.prototype.toString, fn = (e) => Yo.call(e), Fr = (e) => fn(e).slice(8, -1), zo = (e) => fn(e) === "[object Object]", Dr = (e) => Q(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, zt = /* @__PURE__ */ Ze(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Ii = /* @__PURE__ */ Ze(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), Bn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Pi = /-(\w)/g, $e = Bn(
  (e) => e.replace(Pi, (t, n) => n ? n.toUpperCase() : "")
), Ri = /\B([A-Z])/g, ze = Bn(
  (e) => e.replace(Ri, "-$1").toLowerCase()
), Kn = Bn((e) => e.charAt(0).toUpperCase() + e.slice(1)), gt = Bn(
  (e) => e ? `on${Kn(e)}` : ""
), ut = (e, t) => !Object.is(e, t), Mt = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, An = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, Mn = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Ni = (e) => {
  const t = Q(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let oo;
const an = () => oo || (oo = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Lr(e) {
  if ($(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = Q(r) ? ji(r) : Lr(r);
      if (o)
        for (const s in o)
          t[s] = o[s];
    }
    return t;
  } else if (Q(e) || K(e))
    return e;
}
const Fi = /;(?![^(]*\))/g, Di = /:([^]+)/, Li = /\/\*[^]*?\*\//g;
function ji(e) {
  const t = {};
  return e.replace(Li, "").split(Fi).forEach((n) => {
    if (n) {
      const r = n.split(Di);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function jr(e) {
  let t = "";
  if (Q(e))
    t = e;
  else if ($(e))
    for (let n = 0; n < e.length; n++) {
      const r = jr(e[n]);
      r && (t += r + " ");
    }
  else if (K(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Vi = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", Hi = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", ki = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", Bi = /* @__PURE__ */ Ze(Vi), Ki = /* @__PURE__ */ Ze(Hi), Ui = /* @__PURE__ */ Ze(ki), Wi = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Gi = /* @__PURE__ */ Ze(Wi);
function Xo(e) {
  return !!e || e === "";
}
function qi(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++)
    n = un(e[r], t[r]);
  return n;
}
function un(e, t) {
  if (e === t) return !0;
  let n = ro(e), r = ro(t);
  if (n || r)
    return n && r ? e.getTime() === t.getTime() : !1;
  if (n = Ie(e), r = Ie(t), n || r)
    return e === t;
  if (n = $(e), r = $(t), n || r)
    return n && r ? qi(e, t) : !1;
  if (n = K(e), r = K(t), n || r) {
    if (!n || !r)
      return !1;
    const o = Object.keys(e).length, s = Object.keys(t).length;
    if (o !== s)
      return !1;
    for (const i in e) {
      const l = e.hasOwnProperty(i), f = t.hasOwnProperty(i);
      if (l && !f || !l && f || !un(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function Vr(e, t) {
  return e.findIndex((n) => un(n, t));
}
const Zo = (e) => !!(e && e.__v_isRef === !0), Ji = (e) => Q(e) ? e : e == null ? "" : $(e) || K(e) && (e.toString === Yo || !I(e.toString)) ? Zo(e) ? Ji(e.value) : JSON.stringify(e, Qo, 2) : String(e), Qo = (e, t) => Zo(t) ? Qo(e, t.value) : bt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, o], s) => (n[tr(r, s) + " =>"] = o, n),
    {}
  )
} : jt(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => tr(n))
} : Ie(t) ? tr(t) : K(t) && !$(t) && !zo(t) ? String(t) : t, tr = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Ie(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
var Yi = { NODE_ENV: '"production"' };
function Ue(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let Se;
class es {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = Se, !t && Se && (this.index = (Se.scopes || (Se.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = Se;
      try {
        return Se = this, t();
      } finally {
        Se = n;
      }
    } else
      Ue("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    Se = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    Se = this.parent;
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, r = this.cleanups.length; n < r; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, r = this.scopes.length; n < r; n++)
          this.scopes[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Qf(e) {
  return new es(e);
}
function zi() {
  return Se;
}
let W;
const nr = /* @__PURE__ */ new WeakSet();
class ts {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Se && Se.active && Se.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, nr.has(this) && (nr.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || rs(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, so(this), os(this);
    const t = W, n = Ae;
    W = this, Ae = !0;
    try {
      return this.fn();
    } finally {
      W !== this && Ue(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), ss(this), W = t, Ae = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Br(t);
      this.deps = this.depsTail = void 0, so(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? nr.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    hr(this) && this.run();
  }
  get dirty() {
    return hr(this);
  }
}
let ns = 0, Xt, Zt;
function rs(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Zt, Zt = e;
    return;
  }
  e.next = Xt, Xt = e;
}
function Hr() {
  ns++;
}
function kr() {
  if (--ns > 0)
    return;
  if (Zt) {
    let t = Zt;
    for (Zt = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Xt; ) {
    let t = Xt;
    for (Xt = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (r) {
          e || (e = r);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function os(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function ss(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const o = r.prevDep;
    r.version === -1 ? (r === n && (n = o), Br(r), Xi(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = o;
  }
  e.deps = t, e.depsTail = n;
}
function hr(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (is(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function is(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === en))
    return;
  e.globalVersion = en;
  const t = e.dep;
  if (e.flags |= 2, t.version > 0 && !e.isSSR && e.deps && !hr(e)) {
    e.flags &= -3;
    return;
  }
  const n = W, r = Ae;
  W = e, Ae = !0;
  try {
    os(e);
    const o = e.fn(e._value);
    (t.version === 0 || ut(o, e._value)) && (e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    W = n, Ae = r, ss(e), e.flags &= -3;
  }
}
function Br(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: o } = e;
  if (r && (r.nextSub = o, e.prevSub = void 0), o && (o.prevSub = r, e.nextSub = void 0), n.subsHead === e && (n.subsHead = o), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep)
      Br(s, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Xi(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Ae = !0;
const ls = [];
function Qe() {
  ls.push(Ae), Ae = !1;
}
function et() {
  const e = ls.pop();
  Ae = e === void 0 ? !0 : e;
}
function so(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = W;
    W = void 0;
    try {
      t();
    } finally {
      W = n;
    }
  }
}
let en = 0;
class Zi {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Kr {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.subsHead = void 0;
  }
  track(t) {
    if (!W || !Ae || W === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== W)
      n = this.activeLink = new Zi(W, this), W.deps ? (n.prevDep = W.depsTail, W.depsTail.nextDep = n, W.depsTail = n) : W.deps = W.depsTail = n, cs(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = W.depsTail, n.nextDep = void 0, W.depsTail.nextDep = n, W.depsTail = n, W.deps === n && (W.deps = r);
    }
    return W.onTrack && W.onTrack(
      ee(
        {
          effect: W
        },
        t
      )
    ), n;
  }
  trigger(t) {
    this.version++, en++, this.notify(t);
  }
  notify(t) {
    Hr();
    try {
      if (Yi.NODE_ENV !== "production")
        for (let n = this.subsHead; n; n = n.nextSub)
          n.sub.onTrigger && !(n.sub.flags & 8) && n.sub.onTrigger(
            ee(
              {
                effect: n.sub
              },
              t
            )
          );
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      kr();
    }
  }
}
function cs(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep)
        cs(r);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
  }
}
const gr = /* @__PURE__ */ new WeakMap(), _t = Symbol(
  "Object iterate"
), mr = Symbol(
  "Map keys iterate"
), tn = Symbol(
  "Array iterate"
);
function le(e, t, n) {
  if (Ae && W) {
    let r = gr.get(e);
    r || gr.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || (r.set(n, o = new Kr()), o.map = r, o.key = n), o.track({
      target: e,
      type: t,
      key: n
    });
  }
}
function He(e, t, n, r, o, s) {
  const i = gr.get(e);
  if (!i) {
    en++;
    return;
  }
  const l = (f) => {
    f && f.trigger({
      target: e,
      type: t,
      key: n,
      newValue: r,
      oldValue: o,
      oldTarget: s
    });
  };
  if (Hr(), t === "clear")
    i.forEach(l);
  else {
    const f = $(e), p = f && Dr(n);
    if (f && n === "length") {
      const u = Number(r);
      i.forEach((a, g) => {
        (g === "length" || g === tn || !Ie(g) && g >= u) && l(a);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), p && l(i.get(tn)), t) {
        case "add":
          f ? p && l(i.get("length")) : (l(i.get(_t)), bt(e) && l(i.get(mr)));
          break;
        case "delete":
          f || (l(i.get(_t)), bt(e) && l(i.get(mr)));
          break;
        case "set":
          bt(e) && l(i.get(_t));
          break;
      }
  }
  kr();
}
function Ot(e) {
  const t = D(e);
  return t === e ? t : (le(t, "iterate", tn), ve(e) ? t : t.map(ue));
}
function Un(e) {
  return le(e = D(e), "iterate", tn), e;
}
const Qi = {
  __proto__: null,
  [Symbol.iterator]() {
    return rr(this, Symbol.iterator, ue);
  },
  concat(...e) {
    return Ot(this).concat(
      ...e.map((t) => $(t) ? Ot(t) : t)
    );
  },
  entries() {
    return rr(this, "entries", (e) => (e[1] = ue(e[1]), e));
  },
  every(e, t) {
    return Ge(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ge(this, "filter", e, t, (n) => n.map(ue), arguments);
  },
  find(e, t) {
    return Ge(this, "find", e, t, ue, arguments);
  },
  findIndex(e, t) {
    return Ge(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ge(this, "findLast", e, t, ue, arguments);
  },
  findLastIndex(e, t) {
    return Ge(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Ge(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return or(this, "includes", e);
  },
  indexOf(...e) {
    return or(this, "indexOf", e);
  },
  join(e) {
    return Ot(this).join(e);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...e) {
    return or(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ge(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Wt(this, "pop");
  },
  push(...e) {
    return Wt(this, "push", e);
  },
  reduce(e, ...t) {
    return io(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return io(this, "reduceRight", e, t);
  },
  shift() {
    return Wt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ge(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Wt(this, "splice", e);
  },
  toReversed() {
    return Ot(this).toReversed();
  },
  toSorted(e) {
    return Ot(this).toSorted(e);
  },
  toSpliced(...e) {
    return Ot(this).toSpliced(...e);
  },
  unshift(...e) {
    return Wt(this, "unshift", e);
  },
  values() {
    return rr(this, "values", ue);
  }
};
function rr(e, t, n) {
  const r = Un(e), o = r[t]();
  return r !== e && !ve(e) && (o._next = o.next, o.next = () => {
    const s = o._next();
    return s.value && (s.value = n(s.value)), s;
  }), o;
}
const el = Array.prototype;
function Ge(e, t, n, r, o, s) {
  const i = Un(e), l = i !== e && !ve(e), f = i[t];
  if (f !== el[t]) {
    const a = f.apply(e, s);
    return l ? ue(a) : a;
  }
  let p = n;
  i !== e && (l ? p = function(a, g) {
    return n.call(this, ue(a), g, e);
  } : n.length > 2 && (p = function(a, g) {
    return n.call(this, a, g, e);
  }));
  const u = f.call(i, p, r);
  return l && o ? o(u) : u;
}
function io(e, t, n, r) {
  const o = Un(e);
  let s = n;
  return o !== e && (ve(e) ? n.length > 3 && (s = function(i, l, f) {
    return n.call(this, i, l, f, e);
  }) : s = function(i, l, f) {
    return n.call(this, i, ue(l), f, e);
  }), o[t](s, ...r);
}
function or(e, t, n) {
  const r = D(e);
  le(r, "iterate", tn);
  const o = r[t](...n);
  return (o === -1 || o === !1) && In(n[0]) ? (n[0] = D(n[0]), r[t](...n)) : o;
}
function Wt(e, t, n = []) {
  Qe(), Hr();
  const r = D(e)[t].apply(e, n);
  return kr(), et(), r;
}
const tl = /* @__PURE__ */ Ze("__proto__,__v_isRef,__isVue"), fs = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ie)
);
function nl(e) {
  Ie(e) || (e = String(e));
  const t = D(this);
  return le(t, "has", e), t.hasOwnProperty(e);
}
class as {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, r) {
    if (n === "__v_skip") return t.__v_skip;
    const o = this._isReadonly, s = this._isShallow;
    if (n === "__v_isReactive")
      return !o;
    if (n === "__v_isReadonly")
      return o;
    if (n === "__v_isShallow")
      return s;
    if (n === "__v_raw")
      return r === (o ? s ? ms : gs : s ? hs : ps).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const i = $(t);
    if (!o) {
      let f;
      if (i && (f = Qi[n]))
        return f;
      if (n === "hasOwnProperty")
        return nl;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      oe(t) ? t : r
    );
    return (Ie(n) ? fs.has(n) : tl(n)) || (o || le(t, "get", n), s) ? l : oe(l) ? i && Dr(n) ? l : l.value : K(l) ? o ? ys(l) : Ur(l) : l;
  }
}
class us extends as {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, o) {
    let s = t[n];
    if (!this._isShallow) {
      const f = Xe(s);
      if (!ve(r) && !Xe(r) && (s = D(s), r = D(r)), !$(t) && oe(s) && !oe(r))
        return f ? !1 : (s.value = r, !0);
    }
    const i = $(t) && Dr(n) ? Number(n) < t.length : k(t, n), l = Reflect.set(
      t,
      n,
      r,
      oe(t) ? t : o
    );
    return t === D(o) && (i ? ut(r, s) && He(t, "set", n, r, s) : He(t, "add", n, r)), l;
  }
  deleteProperty(t, n) {
    const r = k(t, n), o = t[n], s = Reflect.deleteProperty(t, n);
    return s && r && He(t, "delete", n, void 0, o), s;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!Ie(n) || !fs.has(n)) && le(t, "has", n), r;
  }
  ownKeys(t) {
    return le(
      t,
      "iterate",
      $(t) ? "length" : _t
    ), Reflect.ownKeys(t);
  }
}
class ds extends as {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return Ue(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return Ue(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const rl = /* @__PURE__ */ new us(), ol = /* @__PURE__ */ new ds(), sl = /* @__PURE__ */ new us(!0), il = /* @__PURE__ */ new ds(!0), yr = (e) => e, yn = (e) => Reflect.getPrototypeOf(e);
function ll(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, s = D(o), i = bt(s), l = e === "entries" || e === Symbol.iterator && i, f = e === "keys" && i, p = o[e](...r), u = n ? yr : t ? br : ue;
    return !t && le(
      s,
      "iterate",
      f ? mr : _t
    ), {
      // iterator protocol
      next() {
        const { value: a, done: g } = p.next();
        return g ? { value: a, done: g } : {
          value: l ? [u(a[0]), u(a[1])] : u(a),
          done: g
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function bn(e) {
  return function(...t) {
    {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      Ue(
        `${Kn(e)} operation ${n}failed: target is readonly.`,
        D(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function cl(e, t) {
  const n = {
    get(o) {
      const s = this.__v_raw, i = D(s), l = D(o);
      e || (ut(o, l) && le(i, "get", o), le(i, "get", l));
      const { has: f } = yn(i), p = t ? yr : e ? br : ue;
      if (f.call(i, o))
        return p(s.get(o));
      if (f.call(i, l))
        return p(s.get(l));
      s !== i && s.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && le(D(o), "iterate", _t), Reflect.get(o, "size", o);
    },
    has(o) {
      const s = this.__v_raw, i = D(s), l = D(o);
      return e || (ut(o, l) && le(i, "has", o), le(i, "has", l)), o === l ? s.has(o) : s.has(o) || s.has(l);
    },
    forEach(o, s) {
      const i = this, l = i.__v_raw, f = D(l), p = t ? yr : e ? br : ue;
      return !e && le(f, "iterate", _t), l.forEach((u, a) => o.call(s, p(u), p(a), i));
    }
  };
  return ee(
    n,
    e ? {
      add: bn("add"),
      set: bn("set"),
      delete: bn("delete"),
      clear: bn("clear")
    } : {
      add(o) {
        !t && !ve(o) && !Xe(o) && (o = D(o));
        const s = D(this);
        return yn(s).has.call(s, o) || (s.add(o), He(s, "add", o, o)), this;
      },
      set(o, s) {
        !t && !ve(s) && !Xe(s) && (s = D(s));
        const i = D(this), { has: l, get: f } = yn(i);
        let p = l.call(i, o);
        p ? lo(i, l, o) : (o = D(o), p = l.call(i, o));
        const u = f.call(i, o);
        return i.set(o, s), p ? ut(s, u) && He(i, "set", o, s, u) : He(i, "add", o, s), this;
      },
      delete(o) {
        const s = D(this), { has: i, get: l } = yn(s);
        let f = i.call(s, o);
        f ? lo(s, i, o) : (o = D(o), f = i.call(s, o));
        const p = l ? l.call(s, o) : void 0, u = s.delete(o);
        return f && He(s, "delete", o, void 0, p), u;
      },
      clear() {
        const o = D(this), s = o.size !== 0, i = bt(o) ? new Map(o) : new Set(o), l = o.clear();
        return s && He(
          o,
          "clear",
          void 0,
          void 0,
          i
        ), l;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((o) => {
    n[o] = ll(o, e, t);
  }), n;
}
function Wn(e, t) {
  const n = cl(e, t);
  return (r, o, s) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(
    k(n, o) && o in r ? n : r,
    o,
    s
  );
}
const fl = {
  get: /* @__PURE__ */ Wn(!1, !1)
}, al = {
  get: /* @__PURE__ */ Wn(!1, !0)
}, ul = {
  get: /* @__PURE__ */ Wn(!0, !1)
}, dl = {
  get: /* @__PURE__ */ Wn(!0, !0)
};
function lo(e, t, n) {
  const r = D(n);
  if (r !== n && t.call(e, r)) {
    const o = Fr(e);
    Ue(
      `Reactive ${o} contains both the raw and reactive versions of the same object${o === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const ps = /* @__PURE__ */ new WeakMap(), hs = /* @__PURE__ */ new WeakMap(), gs = /* @__PURE__ */ new WeakMap(), ms = /* @__PURE__ */ new WeakMap();
function pl(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function hl(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : pl(Fr(e));
}
function Ur(e) {
  return Xe(e) ? e : Gn(
    e,
    !1,
    rl,
    fl,
    ps
  );
}
function gl(e) {
  return Gn(
    e,
    !1,
    sl,
    al,
    hs
  );
}
function ys(e) {
  return Gn(
    e,
    !0,
    ol,
    ul,
    gs
  );
}
function Be(e) {
  return Gn(
    e,
    !0,
    il,
    dl,
    ms
  );
}
function Gn(e, t, n, r, o) {
  if (!K(e))
    return Ue(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const s = o.get(e);
  if (s)
    return s;
  const i = hl(e);
  if (i === 0)
    return e;
  const l = new Proxy(
    e,
    i === 2 ? r : n
  );
  return o.set(e, l), l;
}
function vt(e) {
  return Xe(e) ? vt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Xe(e) {
  return !!(e && e.__v_isReadonly);
}
function ve(e) {
  return !!(e && e.__v_isShallow);
}
function In(e) {
  return e ? !!e.__v_raw : !1;
}
function D(e) {
  const t = e && e.__v_raw;
  return t ? D(t) : e;
}
function ml(e) {
  return !k(e, "__v_skip") && Object.isExtensible(e) && An(e, "__v_skip", !0), e;
}
const ue = (e) => K(e) ? Ur(e) : e, br = (e) => K(e) ? ys(e) : e;
function oe(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function ea(e) {
  return bs(e, !1);
}
function ta(e) {
  return bs(e, !0);
}
function bs(e, t) {
  return oe(e) ? e : new yl(e, t);
}
class yl {
  constructor(t, n) {
    this.dep = new Kr(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : D(t), this._value = n ? t : ue(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || ve(t) || Xe(t);
    t = r ? t : D(t), ut(t, n) && (this._rawValue = t, this._value = r ? t : ue(t), this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: n
    }));
  }
}
function bl(e) {
  return oe(e) ? e.value : e;
}
const _l = {
  get: (e, t, n) => t === "__v_raw" ? e : bl(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return oe(o) && !oe(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function _s(e) {
  return vt(e) ? e : new Proxy(e, _l);
}
class vl {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Kr(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = en - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    W !== this)
      return rs(this, !0), !0;
  }
  get value() {
    const t = this.dep.track({
      target: this,
      type: "get",
      key: "value"
    });
    return is(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter ? this.setter(t) : Ue("Write operation failed: computed value is readonly");
  }
}
function wl(e, t, n = !1) {
  let r, o;
  return I(e) ? r = e : (r = e.get, o = e.set), new vl(r, o, n);
}
const _n = {}, Pn = /* @__PURE__ */ new WeakMap();
let mt;
function xl(e, t = !1, n = mt) {
  if (n) {
    let r = Pn.get(n);
    r || Pn.set(n, r = []), r.push(e);
  } else t || Ue(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function Cl(e, t, n = G) {
  const { immediate: r, deep: o, once: s, scheduler: i, augmentJob: l, call: f } = n, p = (A) => {
    (n.onWarn || Ue)(
      "Invalid watch source: ",
      A,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, u = (A) => o ? A : ve(A) || o === !1 || o === 0 ? Je(A, 1) : Je(A);
  let a, g, v, O, N = !1, ne = !1;
  if (oe(e) ? (g = () => e.value, N = ve(e)) : vt(e) ? (g = () => u(e), N = !0) : $(e) ? (ne = !0, N = e.some((A) => vt(A) || ve(A)), g = () => e.map((A) => {
    if (oe(A))
      return A.value;
    if (vt(A))
      return u(A);
    if (I(A))
      return f ? f(A, 2) : A();
    p(A);
  })) : I(e) ? t ? g = f ? () => f(e, 2) : e : g = () => {
    if (v) {
      Qe();
      try {
        v();
      } finally {
        et();
      }
    }
    const A = mt;
    mt = a;
    try {
      return f ? f(e, 3, [O]) : e(O);
    } finally {
      mt = A;
    }
  } : (g = de, p(e)), t && o) {
    const A = g, J = o === !0 ? 1 / 0 : o;
    g = () => Je(A(), J);
  }
  const B = zi(), z = () => {
    a.stop(), B && B.active && Rr(B.effects, a);
  };
  if (s && t) {
    const A = t;
    t = (...J) => {
      A(...J), z();
    };
  }
  let L = ne ? new Array(e.length).fill(_n) : _n;
  const ie = (A) => {
    if (!(!(a.flags & 1) || !a.dirty && !A))
      if (t) {
        const J = a.run();
        if (o || N || (ne ? J.some((fe, te) => ut(fe, L[te])) : ut(J, L))) {
          v && v();
          const fe = mt;
          mt = a;
          try {
            const te = [
              J,
              // pass undefined as the old value when it's changed for the first time
              L === _n ? void 0 : ne && L[0] === _n ? [] : L,
              O
            ];
            f ? f(t, 3, te) : (
              // @ts-expect-error
              t(...te)
            ), L = J;
          } finally {
            mt = fe;
          }
        }
      } else
        a.run();
  };
  return l && l(ie), a = new ts(g), a.scheduler = i ? () => i(ie, !1) : ie, O = (A) => xl(A, !1, a), v = a.onStop = () => {
    const A = Pn.get(a);
    if (A) {
      if (f)
        f(A, 4);
      else
        for (const J of A) J();
      Pn.delete(a);
    }
  }, a.onTrack = n.onTrack, a.onTrigger = n.onTrigger, t ? r ? ie(!0) : L = a.run() : i ? i(ie.bind(null, !0), !0) : a.run(), z.pause = a.pause.bind(a), z.resume = a.resume.bind(a), z.stop = z, z;
}
function Je(e, t = 1 / 0, n) {
  if (t <= 0 || !K(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, oe(e))
    Je(e.value, t, n);
  else if ($(e))
    for (let r = 0; r < e.length; r++)
      Je(e[r], t, n);
  else if (jt(e) || bt(e))
    e.forEach((r) => {
      Je(r, t, n);
    });
  else if (zo(e)) {
    for (const r in e)
      Je(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && Je(e[r], t, n);
  }
  return e;
}
var st = { NODE_ENV: '"production"' };
const wt = [];
function wn(e) {
  wt.push(e);
}
function xn() {
  wt.pop();
}
let sr = !1;
function w(e, ...t) {
  if (sr) return;
  sr = !0, Qe();
  const n = wt.length ? wt[wt.length - 1].component : null, r = n && n.appContext.config.warnHandler, o = Sl();
  if (r)
    Vt(
      r,
      n,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((s) => {
          var i, l;
          return (l = (i = s.toString) == null ? void 0 : i.call(s)) != null ? l : JSON.stringify(s);
        }).join(""),
        n && n.proxy,
        o.map(
          ({ vnode: s }) => `at <${Xn(n, s.type)}>`
        ).join(`
`),
        o
      ]
    );
  else {
    const s = [`[Vue warn]: ${e}`, ...t];
    o.length && s.push(`
`, ...Tl(o)), console.warn(...s);
  }
  et(), sr = !1;
}
function Sl() {
  let e = wt[wt.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const r = e.component && e.component.parent;
    e = r && r.vnode;
  }
  return t;
}
function Tl(e) {
  const t = [];
  return e.forEach((n, r) => {
    t.push(...r === 0 ? [] : [`
`], ...El(n));
  }), t;
}
function El({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", r = e.component ? e.component.parent == null : !1, o = ` at <${Xn(
    e.component,
    e.type,
    r
  )}`, s = ">" + n;
  return e.props ? [o, ...Ol(e.props), s] : [o + s];
}
function Ol(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((r) => {
    t.push(...vs(r, e[r]));
  }), n.length > 3 && t.push(" ..."), t;
}
function vs(e, t, n) {
  return Q(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : oe(t) ? (t = vs(e, D(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : I(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = D(t), n ? t : [`${e}=`, t]);
}
function $l(e, t) {
  e !== void 0 && (typeof e != "number" ? w(`${t} is not a valid number - got ${JSON.stringify(e)}.`) : isNaN(e) && w(`${t} is NaN - the duration expression might be incorrect.`));
}
const Wr = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush",
  15: "component update",
  16: "app unmount cleanup function"
};
function Vt(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (o) {
    dn(o, t, n);
  }
}
function Pe(e, t, n, r) {
  if (I(e)) {
    const o = Vt(e, t, n, r);
    return o && Nr(o) && o.catch((s) => {
      dn(s, t, n);
    }), o;
  }
  if ($(e)) {
    const o = [];
    for (let s = 0; s < e.length; s++)
      o.push(Pe(e[s], t, n, r));
    return o;
  } else
    w(
      `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
    );
}
function dn(e, t, n, r = !0) {
  const o = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: i } = t && t.appContext.config || G;
  if (t) {
    let l = t.parent;
    const f = t.proxy, p = Wr[n];
    for (; l; ) {
      const u = l.ec;
      if (u) {
        for (let a = 0; a < u.length; a++)
          if (u[a](e, f, p) === !1)
            return;
      }
      l = l.parent;
    }
    if (s) {
      Qe(), Vt(s, null, 10, [
        e,
        f,
        p
      ]), et();
      return;
    }
  }
  Al(e, n, o, r, i);
}
function Al(e, t, n, r = !0, o = !1) {
  {
    const s = Wr[t];
    if (n && wn(n), w(`Unhandled error${s ? ` during execution of ${s}` : ""}`), n && xn(), r)
      throw e;
    console.error(e);
  }
}
const ye = [];
let Ve = -1;
const Rt = [];
let it = null, It = 0;
const ws = /* @__PURE__ */ Promise.resolve();
let Rn = null;
const Ml = 100;
function xs(e) {
  const t = Rn || ws;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Il(e) {
  let t = Ve + 1, n = ye.length;
  for (; t < n; ) {
    const r = t + n >>> 1, o = ye[r], s = nn(o);
    s < e || s === e && o.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function qn(e) {
  if (!(e.flags & 1)) {
    const t = nn(e), n = ye[ye.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= nn(n) ? ye.push(e) : ye.splice(Il(t), 0, e), e.flags |= 1, Cs();
  }
}
function Cs() {
  Rn || (Rn = ws.then(Es));
}
function Ss(e) {
  $(e) ? Rt.push(...e) : it && e.id === -1 ? it.splice(It + 1, 0, e) : e.flags & 1 || (Rt.push(e), e.flags |= 1), Cs();
}
function co(e, t, n = Ve + 1) {
  for (t = t || /* @__PURE__ */ new Map(); n < ye.length; n++) {
    const r = ye[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid || Gr(t, r))
        continue;
      ye.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function Ts(e) {
  if (Rt.length) {
    const t = [...new Set(Rt)].sort(
      (n, r) => nn(n) - nn(r)
    );
    if (Rt.length = 0, it) {
      it.push(...t);
      return;
    }
    for (it = t, e = e || /* @__PURE__ */ new Map(), It = 0; It < it.length; It++) {
      const n = it[It];
      Gr(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    it = null, It = 0;
  }
}
const nn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Es(e) {
  e = e || /* @__PURE__ */ new Map();
  const t = (n) => Gr(e, n);
  try {
    for (Ve = 0; Ve < ye.length; Ve++) {
      const n = ye[Ve];
      if (n && !(n.flags & 8)) {
        if (st.NODE_ENV !== "production" && t(n))
          continue;
        n.flags & 4 && (n.flags &= -2), Vt(
          n,
          n.i,
          n.i ? 15 : 14
        ), n.flags & 4 || (n.flags &= -2);
      }
    }
  } finally {
    for (; Ve < ye.length; Ve++) {
      const n = ye[Ve];
      n && (n.flags &= -2);
    }
    Ve = -1, ye.length = 0, Ts(e), Rn = null, (ye.length || Rt.length) && Es(e);
  }
}
function Gr(e, t) {
  const n = e.get(t) || 0;
  if (n > Ml) {
    const r = t.i, o = r && yi(r.type);
    return dn(
      `Maximum recursive updates exceeded${o ? ` in component <${o}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, n + 1), !1;
}
let Ke = !1;
const Cn = /* @__PURE__ */ new Map();
an().__VUE_HMR_RUNTIME__ = {
  createRecord: ir(Os),
  rerender: ir(Nl),
  reload: ir(Fl)
};
const Ct = /* @__PURE__ */ new Map();
function Pl(e) {
  const t = e.type.__hmrId;
  let n = Ct.get(t);
  n || (Os(t, e.type), n = Ct.get(t)), n.instances.add(e);
}
function Rl(e) {
  Ct.get(e.type.__hmrId).instances.delete(e);
}
function Os(e, t) {
  return Ct.has(e) ? !1 : (Ct.set(e, {
    initialDef: Nn(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function Nn(e) {
  return bi(e) ? e.__vccOpts : e;
}
function Nl(e, t) {
  const n = Ct.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((r) => {
    t && (r.render = t, Nn(r.type).render = t), r.renderCache = [], Ke = !0, r.update(), Ke = !1;
  }));
}
function Fl(e, t) {
  const n = Ct.get(e);
  if (!n) return;
  t = Nn(t), fo(n.initialDef, t);
  const r = [...n.instances];
  for (let o = 0; o < r.length; o++) {
    const s = r[o], i = Nn(s.type);
    let l = Cn.get(i);
    l || (i !== n.initialDef && fo(i, t), Cn.set(i, l = /* @__PURE__ */ new Set())), l.add(s), s.appContext.propsCache.delete(s.type), s.appContext.emitsCache.delete(s.type), s.appContext.optionsCache.delete(s.type), s.ceReload ? (l.add(s), s.ceReload(t.styles), l.delete(s)) : s.parent ? qn(() => {
      Ke = !0, s.parent.update(), Ke = !1, l.delete(s);
    }) : s.appContext.reload ? s.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), s.root.ce && s !== s.root && s.root.ce._removeChildStyle(i);
  }
  Ss(() => {
    Cn.clear();
  });
}
function fo(e, t) {
  ee(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function ir(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (r) {
      console.error(r), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let ke, Jt = [], _r = !1;
function pn(e, ...t) {
  ke ? ke.emit(e, ...t) : _r || Jt.push({ event: e, args: t });
}
function $s(e, t) {
  var n, r;
  ke = e, ke ? (ke.enabled = !0, Jt.forEach(({ event: o, args: s }) => ke.emit(o, ...s)), Jt = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((r = (n = window.navigator) == null ? void 0 : n.userAgent) != null && r.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((s) => {
    $s(s, t);
  }), setTimeout(() => {
    ke || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, _r = !0, Jt = []);
  }, 3e3)) : (_r = !0, Jt = []);
}
function Dl(e, t) {
  pn("app:init", e, t, {
    Fragment: be,
    Text: Ht,
    Comment: re,
    Static: Tn
  });
}
function Ll(e) {
  pn("app:unmount", e);
}
const jl = /* @__PURE__ */ qr(
  "component:added"
  /* COMPONENT_ADDED */
), As = /* @__PURE__ */ qr(
  "component:updated"
  /* COMPONENT_UPDATED */
), Vl = /* @__PURE__ */ qr(
  "component:removed"
  /* COMPONENT_REMOVED */
), Hl = (e) => {
  ke && typeof ke.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !ke.cleanupBuffer(e) && Vl(e);
};
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function qr(e) {
  return (t) => {
    pn(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
const kl = /* @__PURE__ */ Ms(
  "perf:start"
  /* PERFORMANCE_START */
), Bl = /* @__PURE__ */ Ms(
  "perf:end"
  /* PERFORMANCE_END */
);
function Ms(e) {
  return (t, n, r) => {
    pn(e, t.appContext.app, t.uid, t, n, r);
  };
}
function Kl(e, t, n) {
  pn(
    "component:emit",
    e.appContext.app,
    e,
    t,
    n
  );
}
let se = null, Is = null;
function Fn(e) {
  const t = se;
  return se = e, Is = e && e.type.__scopeId || null, t;
}
function Ul(e, t = se, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && Co(-1);
    const s = Fn(t);
    let i;
    try {
      i = e(...o);
    } finally {
      Fn(s), r._d && Co(1);
    }
    return As(t), i;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function Ps(e) {
  Ii(e) && w("Do not use built-in directive ids as custom directive id: " + e);
}
function na(e, t) {
  if (se === null)
    return w("withDirectives can only be used inside render functions."), e;
  const n = zn(se), r = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [s, i, l, f = G] = t[o];
    s && (I(s) && (s = {
      mounted: s,
      updated: s
    }), s.deep && Je(i), r.push({
      dir: s,
      instance: n,
      value: i,
      oldValue: void 0,
      arg: l,
      modifiers: f
    }));
  }
  return e;
}
function dt(e, t, n, r) {
  const o = e.dirs, s = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const l = o[i];
    s && (l.oldValue = s[i].value);
    let f = l.dir[r];
    f && (Qe(), Pe(f, n, 8, [
      e.el,
      l,
      e,
      t
    ]), et());
  }
}
const Wl = Symbol("_vte"), Rs = (e) => e.__isTeleport, lt = Symbol("_leaveCb"), vn = Symbol("_enterCb");
function Ns() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return ks(() => {
    e.isMounted = !0;
  }), Ks(() => {
    e.isUnmounting = !0;
  }), e;
}
const Ee = [Function, Array], Fs = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: Ee,
  onEnter: Ee,
  onAfterEnter: Ee,
  onEnterCancelled: Ee,
  // leave
  onBeforeLeave: Ee,
  onLeave: Ee,
  onAfterLeave: Ee,
  onLeaveCancelled: Ee,
  // appear
  onBeforeAppear: Ee,
  onAppear: Ee,
  onAfterAppear: Ee,
  onAppearCancelled: Ee
}, Ds = (e) => {
  const t = e.subTree;
  return t.component ? Ds(t.component) : t;
}, Gl = {
  name: "BaseTransition",
  props: Fs,
  setup(e, { slots: t }) {
    const n = Qr(), r = Ns();
    return () => {
      const o = t.default && Jr(t.default(), !0);
      if (!o || !o.length)
        return;
      const s = Ls(o), i = D(e), { mode: l } = i;
      if (l && l !== "in-out" && l !== "out-in" && l !== "default" && w(`invalid <transition> mode: ${l}`), r.isLeaving)
        return lr(s);
      const f = ao(s);
      if (!f)
        return lr(s);
      let p = rn(
        f,
        i,
        r,
        n,
        // #11061, ensure enterHooks is fresh after clone
        (a) => p = a
      );
      f.type !== re && St(f, p);
      let u = n.subTree && ao(n.subTree);
      if (u && u.type !== re && !yt(f, u) && Ds(n).type !== re) {
        let a = rn(
          u,
          i,
          r,
          n
        );
        if (St(u, a), l === "out-in" && f.type !== re)
          return r.isLeaving = !0, a.afterLeave = () => {
            r.isLeaving = !1, n.job.flags & 8 || n.update(), delete a.afterLeave, u = void 0;
          }, lr(s);
        l === "in-out" && f.type !== re ? a.delayLeave = (g, v, O) => {
          const N = js(
            r,
            u
          );
          N[String(u.key)] = u, g[lt] = () => {
            v(), g[lt] = void 0, delete p.delayedLeave, u = void 0;
          }, p.delayedLeave = () => {
            O(), delete p.delayedLeave, u = void 0;
          };
        } : u = void 0;
      } else u && (u = void 0);
      return s;
    };
  }
};
function Ls(e) {
  let t = e[0];
  if (e.length > 1) {
    let n = !1;
    for (const r of e)
      if (r.type !== re) {
        if (n) {
          w(
            "<transition> can only be used on a single element or component. Use <transition-group> for lists."
          );
          break;
        }
        t = r, n = !0;
      }
  }
  return t;
}
const ql = Gl;
function js(e, t) {
  const { leavingVNodes: n } = e;
  let r = n.get(t.type);
  return r || (r = /* @__PURE__ */ Object.create(null), n.set(t.type, r)), r;
}
function rn(e, t, n, r, o) {
  const {
    appear: s,
    mode: i,
    persisted: l = !1,
    onBeforeEnter: f,
    onEnter: p,
    onAfterEnter: u,
    onEnterCancelled: a,
    onBeforeLeave: g,
    onLeave: v,
    onAfterLeave: O,
    onLeaveCancelled: N,
    onBeforeAppear: ne,
    onAppear: B,
    onAfterAppear: z,
    onAppearCancelled: L
  } = t, ie = String(e.key), A = js(n, e), J = (R, U) => {
    R && Pe(
      R,
      r,
      9,
      U
    );
  }, fe = (R, U) => {
    const X = U[1];
    J(R, U), $(R) ? R.every((E) => E.length <= 1) && X() : R.length <= 1 && X();
  }, te = {
    mode: i,
    persisted: l,
    beforeEnter(R) {
      let U = f;
      if (!n.isMounted)
        if (s)
          U = ne || f;
        else
          return;
      R[lt] && R[lt](
        !0
        /* cancelled */
      );
      const X = A[ie];
      X && yt(e, X) && X.el[lt] && X.el[lt](), J(U, [R]);
    },
    enter(R) {
      let U = p, X = u, E = a;
      if (!n.isMounted)
        if (s)
          U = B || p, X = z || u, E = L || a;
        else
          return;
      let Z = !1;
      const pe = R[vn] = (he) => {
        Z || (Z = !0, he ? J(E, [R]) : J(X, [R]), te.delayedLeave && te.delayedLeave(), R[vn] = void 0);
      };
      U ? fe(U, [R, pe]) : pe();
    },
    leave(R, U) {
      const X = String(e.key);
      if (R[vn] && R[vn](
        !0
        /* cancelled */
      ), n.isUnmounting)
        return U();
      J(g, [R]);
      let E = !1;
      const Z = R[lt] = (pe) => {
        E || (E = !0, U(), pe ? J(N, [R]) : J(O, [R]), R[lt] = void 0, A[X] === e && delete A[X]);
      };
      A[X] = e, v ? fe(v, [R, Z]) : Z();
    },
    clone(R) {
      const U = rn(
        R,
        t,
        n,
        r,
        o
      );
      return o && o(U), U;
    }
  };
  return te;
}
function lr(e) {
  if (hn(e))
    return e = We(e), e.children = null, e;
}
function ao(e) {
  if (!hn(e))
    return Rs(e.type) && e.children ? Ls(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && I(n.default))
      return n.default();
  }
}
function St(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, St(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Jr(e, t = !1, n) {
  let r = [], o = 0;
  for (let s = 0; s < e.length; s++) {
    let i = e[s];
    const l = n == null ? i.key : String(n) + String(i.key != null ? i.key : s);
    i.type === be ? (i.patchFlag & 128 && o++, r = r.concat(
      Jr(i.children, t, l)
    )) : (t || i.type !== re) && r.push(l != null ? We(i, { key: l }) : i);
  }
  if (o > 1)
    for (let s = 0; s < r.length; s++)
      r[s].patchFlag = -2;
  return r;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function ra(e, t) {
  return I(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ee({ name: e.name }, t, { setup: e })
  ) : e;
}
function Vs(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const Jl = /* @__PURE__ */ new WeakSet();
function Dn(e, t, n, r, o = !1) {
  if ($(e)) {
    e.forEach(
      (O, N) => Dn(
        O,
        t && ($(t) ? t[N] : t),
        n,
        r,
        o
      )
    );
    return;
  }
  if (Nt(r) && !o) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && Dn(e, t, n, r.component.subTree);
    return;
  }
  const s = r.shapeFlag & 4 ? zn(r.component) : r.el, i = o ? null : s, { i: l, r: f } = e;
  if (!l) {
    w(
      "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
    );
    return;
  }
  const p = t && t.r, u = l.refs === G ? l.refs = {} : l.refs, a = l.setupState, g = D(a), v = a === G ? () => !1 : (O) => (k(g, O) && !oe(g[O]) && w(
    `Template ref "${O}" used on a non-ref value. It will not work in the production build.`
  ), Jl.has(g[O]) ? !1 : k(g, O));
  if (p != null && p !== f && (Q(p) ? (u[p] = null, v(p) && (a[p] = null)) : oe(p) && (p.value = null)), I(f))
    Vt(f, l, 12, [i, u]);
  else {
    const O = Q(f), N = oe(f);
    if (O || N) {
      const ne = () => {
        if (e.f) {
          const B = O ? v(f) ? a[f] : u[f] : f.value;
          o ? $(B) && Rr(B, s) : $(B) ? B.includes(s) || B.push(s) : O ? (u[f] = [s], v(f) && (a[f] = u[f])) : (f.value = [s], e.k && (u[e.k] = f.value));
        } else O ? (u[f] = i, v(f) && (a[f] = i)) : N ? (f.value = i, e.k && (u[e.k] = i)) : w("Invalid template ref type:", f, `(${typeof f})`);
      };
      i ? (ne.id = -1, Ce(ne, n)) : ne();
    } else
      w("Invalid template ref type:", f, `(${typeof f})`);
  }
}
an().requestIdleCallback;
an().cancelIdleCallback;
const Nt = (e) => !!e.type.__asyncLoader, hn = (e) => e.type.__isKeepAlive;
function Yl(e, t) {
  Hs(e, "a", t);
}
function zl(e, t) {
  Hs(e, "da", t);
}
function Hs(e, t, n = ce) {
  const r = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (Jn(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      hn(o.parent.vnode) && Xl(r, t, n, o), o = o.parent;
  }
}
function Xl(e, t, n, r) {
  const o = Jn(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  Us(() => {
    Rr(r[t], o);
  }, n);
}
function Jn(e, t, n = ce, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
      Qe();
      const l = gn(n), f = Pe(t, n, e, i);
      return l(), et(), f;
    });
    return r ? o.unshift(s) : o.push(s), s;
  } else {
    const o = gt(Wr[e].replace(/ hook$/, ""));
    w(
      `${o} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const tt = (e) => (t, n = ce) => {
  (!sn || e === "sp") && Jn(e, (...r) => t(...r), n);
}, Zl = tt("bm"), ks = tt("m"), Ql = tt(
  "bu"
), Bs = tt("u"), Ks = tt(
  "bum"
), Us = tt("um"), ec = tt(
  "sp"
), tc = tt("rtg"), nc = tt("rtc");
function rc(e, t = ce) {
  Jn("ec", e, t);
}
const oc = Symbol.for("v-ndc");
function oa(e, t, n, r) {
  let o;
  const s = n, i = $(e);
  if (i || Q(e)) {
    const l = i && vt(e);
    let f = !1;
    l && (f = !ve(e), e = Un(e)), o = new Array(e.length);
    for (let p = 0, u = e.length; p < u; p++)
      o[p] = t(
        f ? ue(e[p]) : e[p],
        p,
        void 0,
        s
      );
  } else if (typeof e == "number") {
    Number.isInteger(e) || w(`The v-for range expect an integer value but got ${e}.`), o = new Array(e);
    for (let l = 0; l < e; l++)
      o[l] = t(l + 1, l, void 0, s);
  } else if (K(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (l, f) => t(l, f, void 0, s)
      );
    else {
      const l = Object.keys(e);
      o = new Array(l.length);
      for (let f = 0, p = l.length; f < p; f++) {
        const u = l[f];
        o[f] = t(e[u], u, f, s);
      }
    }
  else
    o = [];
  return o;
}
function sa(e, t, n = {}, r, o) {
  if (se.ce || se.parent && Nt(se.parent) && se.parent.ce)
    return n.name = t, Or(), $r(
      be,
      null,
      [_e("slot", n, r)],
      64
    );
  let s = e[t];
  s && s.length > 1 && (w(
    "SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template."
  ), s = () => []), s && s._c && (s._d = !1), Or();
  const i = s && Ws(s(n)), l = n.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  i && i.key, f = $r(
    be,
    {
      key: (l && !Ie(l) ? l : `_${t}`) + // #7256 force differentiate fallback content from actual content
      ""
    },
    i || [],
    i && e._ === 1 ? 64 : -2
  );
  return s && s._c && (s._d = !0), f;
}
function Ws(e) {
  return e.some((t) => Tt(t) ? !(t.type === re || t.type === be && !Ws(t.children)) : !0) ? e : null;
}
const vr = (e) => e ? gi(e) ? zn(e) : vr(e.parent) : null, xt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ee(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => Be(e.props),
    $attrs: (e) => Be(e.attrs),
    $slots: (e) => Be(e.slots),
    $refs: (e) => Be(e.refs),
    $parent: (e) => vr(e.parent),
    $root: (e) => vr(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Js(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      qn(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = xs.bind(e.proxy)),
    $watch: (e) => Lc.bind(e)
  })
), Yr = (e) => e === "_" || e === "$", cr = (e, t) => e !== G && !e.__isScriptSetup && k(e, t), Gs = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: o, props: s, accessCache: i, type: l, appContext: f } = e;
    if (t === "__isVue")
      return !0;
    let p;
    if (t[0] !== "$") {
      const v = i[t];
      if (v !== void 0)
        switch (v) {
          case 1:
            return r[t];
          case 2:
            return o[t];
          case 4:
            return n[t];
          case 3:
            return s[t];
        }
      else {
        if (cr(r, t))
          return i[t] = 1, r[t];
        if (o !== G && k(o, t))
          return i[t] = 2, o[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (p = e.propsOptions[0]) && k(p, t)
        )
          return i[t] = 3, s[t];
        if (n !== G && k(n, t))
          return i[t] = 4, n[t];
        wr && (i[t] = 0);
      }
    }
    const u = xt[t];
    let a, g;
    if (u)
      return t === "$attrs" ? (le(e.attrs, "get", ""), Vn()) : t === "$slots" && le(e, "get", t), u(e);
    if (
      // css module (injected by vue-loader)
      (a = l.__cssModules) && (a = a[t])
    )
      return a;
    if (n !== G && k(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      g = f.config.globalProperties, k(g, t)
    )
      return g[t];
    se && (!Q(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (o !== G && Yr(t[0]) && k(o, t) ? w(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === se && w(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: s } = e;
    return cr(o, t) ? (o[t] = n, !0) : o.__isScriptSetup && k(o, t) ? (w(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : r !== G && k(r, t) ? (r[t] = n, !0) : k(e.props, t) ? (w(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (w(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (t in e.appContext.config.globalProperties ? Object.defineProperty(s, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, propsOptions: s }
  }, i) {
    let l;
    return !!n[i] || e !== G && k(e, i) || cr(t, i) || (l = s[0]) && k(l, i) || k(r, i) || k(xt, i) || k(o.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : k(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
Gs.ownKeys = (e) => (w(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e));
function sc(e) {
  const t = {};
  return Object.defineProperty(t, "_", {
    configurable: !0,
    enumerable: !1,
    get: () => e
  }), Object.keys(xt).forEach((n) => {
    Object.defineProperty(t, n, {
      configurable: !0,
      enumerable: !1,
      get: () => xt[n](e),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: de
    });
  }), t;
}
function ic(e) {
  const {
    ctx: t,
    propsOptions: [n]
  } = e;
  n && Object.keys(n).forEach((r) => {
    Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[r],
      set: de
    });
  });
}
function lc(e) {
  const { ctx: t, setupState: n } = e;
  Object.keys(D(n)).forEach((r) => {
    if (!n.__isScriptSetup) {
      if (Yr(r[0])) {
        w(
          `setup() return property ${JSON.stringify(
            r
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(t, r, {
        enumerable: !0,
        configurable: !0,
        get: () => n[r],
        set: de
      });
    }
  });
}
function uo(e) {
  return $(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function cc() {
  const e = /* @__PURE__ */ Object.create(null);
  return (t, n) => {
    e[n] ? w(`${t} property "${n}" is already defined in ${e[n]}.`) : e[n] = t;
  };
}
let wr = !0;
function fc(e) {
  const t = Js(e), n = e.proxy, r = e.ctx;
  wr = !1, t.beforeCreate && po(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: s,
    methods: i,
    watch: l,
    provide: f,
    inject: p,
    // lifecycle
    created: u,
    beforeMount: a,
    mounted: g,
    beforeUpdate: v,
    updated: O,
    activated: N,
    deactivated: ne,
    beforeDestroy: B,
    beforeUnmount: z,
    destroyed: L,
    unmounted: ie,
    render: A,
    renderTracked: J,
    renderTriggered: fe,
    errorCaptured: te,
    serverPrefetch: R,
    // public API
    expose: U,
    inheritAttrs: X,
    // assets
    components: E,
    directives: Z,
    filters: pe
  } = t, he = cc();
  {
    const [H] = e.propsOptions;
    if (H)
      for (const j in H)
        he("Props", j);
  }
  if (p && ac(p, r, he), i)
    for (const H in i) {
      const j = i[H];
      I(j) ? (Object.defineProperty(r, H, {
        value: j.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }), he("Methods", H)) : w(
        `Method "${H}" has type "${typeof j}" in the component definition. Did you reference the function correctly?`
      );
    }
  if (o) {
    I(o) || w(
      "The data option must be a function. Plain object usage is no longer supported."
    );
    const H = o.call(n, n);
    if (Nr(H) && w(
      "data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."
    ), !K(H))
      w("data() should return an object.");
    else {
      e.data = Ur(H);
      for (const j in H)
        he("Data", j), Yr(j[0]) || Object.defineProperty(r, j, {
          configurable: !0,
          enumerable: !0,
          get: () => H[j],
          set: de
        });
    }
  }
  if (wr = !0, s)
    for (const H in s) {
      const j = s[H], Re = I(j) ? j.bind(n, n) : I(j.get) ? j.get.bind(n, n) : de;
      Re === de && w(`Computed property "${H}" has no getter.`);
      const Zn = !I(j) && I(j.set) ? j.set.bind(n) : () => {
        w(
          `Write operation failed: computed property "${H}" is readonly.`
        );
      }, kt = af({
        get: Re,
        set: Zn
      });
      Object.defineProperty(r, H, {
        enumerable: !0,
        configurable: !0,
        get: () => kt.value,
        set: (Et) => kt.value = Et
      }), he("Computed", H);
    }
  if (l)
    for (const H in l)
      qs(l[H], r, n, H);
  if (f) {
    const H = I(f) ? f.call(n) : f;
    Reflect.ownKeys(H).forEach((j) => {
      mc(j, H[j]);
    });
  }
  u && po(u, e, "c");
  function ae(H, j) {
    $(j) ? j.forEach((Re) => H(Re.bind(n))) : j && H(j.bind(n));
  }
  if (ae(Zl, a), ae(ks, g), ae(Ql, v), ae(Bs, O), ae(Yl, N), ae(zl, ne), ae(rc, te), ae(nc, J), ae(tc, fe), ae(Ks, z), ae(Us, ie), ae(ec, R), $(U))
    if (U.length) {
      const H = e.exposed || (e.exposed = {});
      U.forEach((j) => {
        Object.defineProperty(H, j, {
          get: () => n[j],
          set: (Re) => n[j] = Re
        });
      });
    } else e.exposed || (e.exposed = {});
  A && e.render === de && (e.render = A), X != null && (e.inheritAttrs = X), E && (e.components = E), Z && (e.directives = Z), R && Vs(e);
}
function ac(e, t, n = de) {
  $(e) && (e = xr(e));
  for (const r in e) {
    const o = e[r];
    let s;
    K(o) ? "default" in o ? s = Sn(
      o.from || r,
      o.default,
      !0
    ) : s = Sn(o.from || r) : s = Sn(o), oe(s) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (i) => s.value = i
    }) : t[r] = s, n("Inject", r);
  }
}
function po(e, t, n) {
  Pe(
    $(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function qs(e, t, n, r) {
  let o = r.includes(".") ? li(n, r) : () => n[r];
  if (Q(e)) {
    const s = t[e];
    I(s) ? ar(o, s) : w(`Invalid watch handler specified by key "${e}"`, s);
  } else if (I(e))
    ar(o, e.bind(n));
  else if (K(e))
    if ($(e))
      e.forEach((s) => qs(s, t, n, r));
    else {
      const s = I(e.handler) ? e.handler.bind(n) : t[e.handler];
      I(s) ? ar(o, s, e) : w(`Invalid watch handler specified by key "${e.handler}"`, s);
    }
  else
    w(`Invalid watch option: "${r}"`, e);
}
function Js(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: o,
    optionsCache: s,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = s.get(t);
  let f;
  return l ? f = l : !o.length && !n && !r ? f = t : (f = {}, o.length && o.forEach(
    (p) => Ln(f, p, i, !0)
  ), Ln(f, t, i)), K(t) && s.set(t, f), f;
}
function Ln(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && Ln(e, s, n, !0), o && o.forEach(
    (i) => Ln(e, i, n, !0)
  );
  for (const i in t)
    if (r && i === "expose")
      w(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const l = uc[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const uc = {
  data: ho,
  props: go,
  emits: go,
  // objects
  methods: Yt,
  computed: Yt,
  // lifecycle
  beforeCreate: me,
  created: me,
  beforeMount: me,
  mounted: me,
  beforeUpdate: me,
  updated: me,
  beforeDestroy: me,
  beforeUnmount: me,
  destroyed: me,
  unmounted: me,
  activated: me,
  deactivated: me,
  errorCaptured: me,
  serverPrefetch: me,
  // assets
  components: Yt,
  directives: Yt,
  // watch
  watch: pc,
  // provide / inject
  provide: ho,
  inject: dc
};
function ho(e, t) {
  return t ? e ? function() {
    return ee(
      I(e) ? e.call(this, this) : e,
      I(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function dc(e, t) {
  return Yt(xr(e), xr(t));
}
function xr(e) {
  if ($(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function me(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Yt(e, t) {
  return e ? ee(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function go(e, t) {
  return e ? $(e) && $(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ee(
    /* @__PURE__ */ Object.create(null),
    uo(e),
    uo(t ?? {})
  ) : t;
}
function pc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = ee(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = me(e[r], t[r]);
  return n;
}
function Ys() {
  return {
    app: null,
    config: {
      isNativeTag: Ai,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let hc = 0;
function gc(e, t) {
  return function(r, o = null) {
    I(r) || (r = ee({}, r)), o != null && !K(o) && (w("root props passed to app.mount() must be an object."), o = null);
    const s = Ys(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let f = !1;
    const p = s.app = {
      _uid: hc++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: Eo,
      get config() {
        return s.config;
      },
      set config(u) {
        w(
          "app.config cannot be replaced. Modify individual options instead."
        );
      },
      use(u, ...a) {
        return i.has(u) ? w("Plugin has already been applied to target app.") : u && I(u.install) ? (i.add(u), u.install(p, ...a)) : I(u) ? (i.add(u), u(p, ...a)) : w(
          'A plugin must either be a function or an object with an "install" function.'
        ), p;
      },
      mixin(u) {
        return s.mixins.includes(u) ? w(
          "Mixin has already been applied to target app" + (u.name ? `: ${u.name}` : "")
        ) : s.mixins.push(u), p;
      },
      component(u, a) {
        return Mr(u, s.config), a ? (s.components[u] && w(`Component "${u}" has already been registered in target app.`), s.components[u] = a, p) : s.components[u];
      },
      directive(u, a) {
        return Ps(u), a ? (s.directives[u] && w(`Directive "${u}" has already been registered in target app.`), s.directives[u] = a, p) : s.directives[u];
      },
      mount(u, a, g) {
        if (f)
          w(
            "App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`"
          );
        else {
          u.__vue_app__ && w(
            "There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first."
          );
          const v = p._ceVNode || _e(r, o);
          return v.appContext = s, g === !0 ? g = "svg" : g === !1 && (g = void 0), s.reload = () => {
            e(
              We(v),
              u,
              g
            );
          }, e(v, u, g), f = !0, p._container = u, u.__vue_app__ = p, p._instance = v.component, Dl(p, Eo), zn(v.component);
        }
      },
      onUnmount(u) {
        typeof u != "function" && w(
          `Expected function as first argument to app.onUnmount(), but got ${typeof u}`
        ), l.push(u);
      },
      unmount() {
        f ? (Pe(
          l,
          p._instance,
          16
        ), e(null, p._container), p._instance = null, Ll(p), delete p._container.__vue_app__) : w("Cannot unmount an app that is not mounted.");
      },
      provide(u, a) {
        return u in s.provides && w(
          `App already provides property with key "${String(u)}". It will be overwritten with the new value.`
        ), s.provides[u] = a, p;
      },
      runWithContext(u) {
        const a = Ft;
        Ft = p;
        try {
          return u();
        } finally {
          Ft = a;
        }
      }
    };
    return p;
  };
}
let Ft = null;
function mc(e, t) {
  if (!ce)
    w("provide() can only be used inside setup().");
  else {
    let n = ce.provides;
    const r = ce.parent && ce.parent.provides;
    r === n && (n = ce.provides = Object.create(r)), n[e] = t;
  }
}
function Sn(e, t, n = !1) {
  const r = ce || se;
  if (r || Ft) {
    const o = Ft ? Ft._context.provides : r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && I(t) ? t.call(r && r.proxy) : t;
    w(`injection "${String(e)}" not found.`);
  } else
    w("inject() can only be used inside setup() or functional components.");
}
const zs = {}, Xs = () => Object.create(zs), Zs = (e) => Object.getPrototypeOf(e) === zs;
function yc(e, t, n, r = !1) {
  const o = {}, s = Xs();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Qs(e, t, o, s);
  for (const i in e.propsOptions[0])
    i in o || (o[i] = void 0);
  ti(t || {}, o, e), n ? e.props = r ? o : gl(o) : e.type.props ? e.props = o : e.props = s, e.attrs = s;
}
function bc(e) {
  for (; e; ) {
    if (e.type.__hmrId) return !0;
    e = e.parent;
  }
}
function _c(e, t, n, r) {
  const {
    props: o,
    attrs: s,
    vnode: { patchFlag: i }
  } = e, l = D(o), [f] = e.propsOptions;
  let p = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !bc(e) && (r || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const u = e.vnode.dynamicProps;
      for (let a = 0; a < u.length; a++) {
        let g = u[a];
        if (Yn(e.emitsOptions, g))
          continue;
        const v = t[g];
        if (f)
          if (k(s, g))
            v !== s[g] && (s[g] = v, p = !0);
          else {
            const O = $e(g);
            o[O] = Cr(
              f,
              l,
              O,
              v,
              e,
              !1
            );
          }
        else
          v !== s[g] && (s[g] = v, p = !0);
      }
    }
  } else {
    Qs(e, t, o, s) && (p = !0);
    let u;
    for (const a in l)
      (!t || // for camelCase
      !k(t, a) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = ze(a)) === a || !k(t, u))) && (f ? n && // for camelCase
      (n[a] !== void 0 || // for kebab-case
      n[u] !== void 0) && (o[a] = Cr(
        f,
        l,
        a,
        void 0,
        e,
        !0
      )) : delete o[a]);
    if (s !== l)
      for (const a in s)
        (!t || !k(t, a)) && (delete s[a], p = !0);
  }
  p && He(e.attrs, "set", ""), ti(t || {}, o, e);
}
function Qs(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let f in t) {
      if (zt(f))
        continue;
      const p = t[f];
      let u;
      o && k(o, u = $e(f)) ? !s || !s.includes(u) ? n[u] = p : (l || (l = {}))[u] = p : Yn(e.emitsOptions, f) || (!(f in r) || p !== r[f]) && (r[f] = p, i = !0);
    }
  if (s) {
    const f = D(n), p = l || G;
    for (let u = 0; u < s.length; u++) {
      const a = s[u];
      n[a] = Cr(
        o,
        f,
        a,
        p[a],
        e,
        !k(p, a)
      );
    }
  }
  return i;
}
function Cr(e, t, n, r, o, s) {
  const i = e[n];
  if (i != null) {
    const l = k(i, "default");
    if (l && r === void 0) {
      const f = i.default;
      if (i.type !== Function && !i.skipFactory && I(f)) {
        const { propsDefaults: p } = o;
        if (n in p)
          r = p[n];
        else {
          const u = gn(o);
          r = p[n] = f.call(
            null,
            t
          ), u();
        }
      } else
        r = f;
      o.ce && o.ce._setProp(n, r);
    }
    i[
      0
      /* shouldCast */
    ] && (s && !l ? r = !1 : i[
      1
      /* shouldCastTrue */
    ] && (r === "" || r === ze(n)) && (r = !0));
  }
  return r;
}
const vc = /* @__PURE__ */ new WeakMap();
function ei(e, t, n = !1) {
  const r = n ? vc : t.propsCache, o = r.get(e);
  if (o)
    return o;
  const s = e.props, i = {}, l = [];
  let f = !1;
  if (!I(e)) {
    const u = (a) => {
      f = !0;
      const [g, v] = ei(a, t, !0);
      ee(i, g), v && l.push(...v);
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!s && !f)
    return K(e) && r.set(e, Pt), Pt;
  if ($(s))
    for (let u = 0; u < s.length; u++) {
      Q(s[u]) || w("props must be strings when using array syntax.", s[u]);
      const a = $e(s[u]);
      mo(a) && (i[a] = G);
    }
  else if (s) {
    K(s) || w("invalid props options", s);
    for (const u in s) {
      const a = $e(u);
      if (mo(a)) {
        const g = s[u], v = i[a] = $(g) || I(g) ? { type: g } : ee({}, g), O = v.type;
        let N = !1, ne = !0;
        if ($(O))
          for (let B = 0; B < O.length; ++B) {
            const z = O[B], L = I(z) && z.name;
            if (L === "Boolean") {
              N = !0;
              break;
            } else L === "String" && (ne = !1);
          }
        else
          N = I(O) && O.name === "Boolean";
        v[
          0
          /* shouldCast */
        ] = N, v[
          1
          /* shouldCastTrue */
        ] = ne, (N || k(v, "default")) && l.push(a);
      }
    }
  }
  const p = [i, l];
  return K(e) && r.set(e, p), p;
}
function mo(e) {
  return e[0] !== "$" && !zt(e) ? !0 : (w(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function wc(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function ti(e, t, n) {
  const r = D(t), o = n.propsOptions[0], s = Object.keys(e).map((i) => $e(i));
  for (const i in o) {
    let l = o[i];
    l != null && xc(
      i,
      r[i],
      l,
      Be(r),
      !s.includes(i)
    );
  }
}
function xc(e, t, n, r, o) {
  const { type: s, required: i, validator: l, skipCheck: f } = n;
  if (i && o) {
    w('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !i)) {
    if (s != null && s !== !0 && !f) {
      let p = !1;
      const u = $(s) ? s : [s], a = [];
      for (let g = 0; g < u.length && !p; g++) {
        const { valid: v, expectedType: O } = Sc(t, u[g]);
        a.push(O || ""), p = v;
      }
      if (!p) {
        w(Tc(e, t, a));
        return;
      }
    }
    l && !l(t, r) && w('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const Cc = /* @__PURE__ */ Ze(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function Sc(e, t) {
  let n;
  const r = wc(t);
  if (r === "null")
    n = e === null;
  else if (Cc(r)) {
    const o = typeof e;
    n = o === r.toLowerCase(), !n && o === "object" && (n = e instanceof t);
  } else r === "Object" ? n = K(e) : r === "Array" ? n = $(e) : n = e instanceof t;
  return {
    valid: n,
    expectedType: r
  };
}
function Tc(e, t, n) {
  if (n.length === 0)
    return `Prop type [] for prop "${e}" won't match anything. Did you mean to use type Array instead?`;
  let r = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(Kn).join(" | ")}`;
  const o = n[0], s = Fr(t), i = yo(t, o), l = yo(t, s);
  return n.length === 1 && bo(o) && !Ec(o, s) && (r += ` with value ${i}`), r += `, got ${s} `, bo(s) && (r += `with value ${l}.`), r;
}
function yo(e, t) {
  return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function bo(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function Ec(...e) {
  return e.some((t) => t.toLowerCase() === "boolean");
}
const ni = (e) => e[0] === "_" || e === "$stable", zr = (e) => $(e) ? e.map(Oe) : [Oe(e)], Oc = (e, t, n) => {
  if (t._n)
    return t;
  const r = Ul((...o) => (st.NODE_ENV !== "production" && ce && (!n || n.root === ce.root) && w(
    `Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), zr(t(...o))), n);
  return r._c = !1, r;
}, ri = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (ni(o)) continue;
    const s = e[o];
    if (I(s))
      t[o] = Oc(o, s, r);
    else if (s != null) {
      w(
        `Non-function value encountered for slot "${o}". Prefer function slots for better performance.`
      );
      const i = zr(s);
      t[o] = () => i;
    }
  }
}, oi = (e, t) => {
  hn(e.vnode) || w(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const n = zr(t);
  e.slots.default = () => n;
}, Sr = (e, t, n) => {
  for (const r in t)
    (n || r !== "_") && (e[r] = t[r]);
}, $c = (e, t, n) => {
  const r = e.slots = Xs();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (Sr(r, t, n), n && An(r, "_", o, !0)) : ri(t, r);
  } else t && oi(e, t);
}, Ac = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let s = !0, i = G;
  if (r.shapeFlag & 32) {
    const l = t._;
    l ? Ke ? (Sr(o, t, n), He(e, "set", "$slots")) : n && l === 1 ? s = !1 : Sr(o, t, n) : (s = !t.$stable, ri(t, o)), i = t;
  } else t && (oi(e, t), i = { default: 1 });
  if (s)
    for (const l in o)
      !ni(l) && i[l] == null && delete o[l];
};
let Gt, ft;
function $t(e, t) {
  e.appContext.config.performance && jn() && ft.mark(`vue-${t}-${e.uid}`), kl(e, t, jn() ? ft.now() : Date.now());
}
function At(e, t) {
  if (e.appContext.config.performance && jn()) {
    const n = `vue-${t}-${e.uid}`, r = n + ":end";
    ft.mark(r), ft.measure(
      `<${Xn(e, e.type)}> ${t}`,
      n,
      r
    ), ft.clearMarks(n), ft.clearMarks(r);
  }
  Bl(e, t, jn() ? ft.now() : Date.now());
}
function jn() {
  return Gt !== void 0 || (typeof window < "u" && window.performance ? (Gt = !0, ft = window.performance) : Gt = !1), Gt;
}
function Mc() {
  const e = [];
  if (e.length) {
    const t = e.length > 1;
    console.warn(
      `Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const Ce = Uc;
function Ic(e) {
  return Pc(e);
}
function Pc(e, t) {
  Mc();
  const n = an();
  n.__VUE__ = !0, $s(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const {
    insert: r,
    remove: o,
    patchProp: s,
    createElement: i,
    createText: l,
    createComment: f,
    setText: p,
    setElementText: u,
    parentNode: a,
    nextSibling: g,
    setScopeId: v = de,
    insertStaticContent: O
  } = e, N = (c, d, h, b = null, m = null, y = null, S = void 0, C = null, x = Ke ? !1 : !!d.dynamicChildren) => {
    if (c === d)
      return;
    c && !yt(c, d) && (b = mn(c), nt(c, m, y, !0), c = null), d.patchFlag === -2 && (x = !1, d.dynamicChildren = null);
    const { type: _, ref: P, shapeFlag: T } = d;
    switch (_) {
      case Ht:
        ne(c, d, h, b);
        break;
      case re:
        B(c, d, h, b);
        break;
      case Tn:
        c == null ? z(d, h, b, S) : L(c, d, h, S);
        break;
      case be:
        Z(
          c,
          d,
          h,
          b,
          m,
          y,
          S,
          C,
          x
        );
        break;
      default:
        T & 1 ? J(
          c,
          d,
          h,
          b,
          m,
          y,
          S,
          C,
          x
        ) : T & 6 ? pe(
          c,
          d,
          h,
          b,
          m,
          y,
          S,
          C,
          x
        ) : T & 64 || T & 128 ? _.process(
          c,
          d,
          h,
          b,
          m,
          y,
          S,
          C,
          x,
          Kt
        ) : w("Invalid VNode type:", _, `(${typeof _})`);
    }
    P != null && m && Dn(P, c && c.ref, y, d || c, !d);
  }, ne = (c, d, h, b) => {
    if (c == null)
      r(
        d.el = l(d.children),
        h,
        b
      );
    else {
      const m = d.el = c.el;
      d.children !== c.children && p(m, d.children);
    }
  }, B = (c, d, h, b) => {
    c == null ? r(
      d.el = f(d.children || ""),
      h,
      b
    ) : d.el = c.el;
  }, z = (c, d, h, b) => {
    [c.el, c.anchor] = O(
      c.children,
      d,
      h,
      b,
      c.el,
      c.anchor
    );
  }, L = (c, d, h, b) => {
    if (d.children !== c.children) {
      const m = g(c.anchor);
      A(c), [d.el, d.anchor] = O(
        d.children,
        h,
        m,
        b
      );
    } else
      d.el = c.el, d.anchor = c.anchor;
  }, ie = ({ el: c, anchor: d }, h, b) => {
    let m;
    for (; c && c !== d; )
      m = g(c), r(c, h, b), c = m;
    r(d, h, b);
  }, A = ({ el: c, anchor: d }) => {
    let h;
    for (; c && c !== d; )
      h = g(c), o(c), c = h;
    o(d);
  }, J = (c, d, h, b, m, y, S, C, x) => {
    d.type === "svg" ? S = "svg" : d.type === "math" && (S = "mathml"), c == null ? fe(
      d,
      h,
      b,
      m,
      y,
      S,
      C,
      x
    ) : U(
      c,
      d,
      m,
      y,
      S,
      C,
      x
    );
  }, fe = (c, d, h, b, m, y, S, C) => {
    let x, _;
    const { props: P, shapeFlag: T, transition: M, dirs: F } = c;
    if (x = c.el = i(
      c.type,
      y,
      P && P.is,
      P
    ), T & 8 ? u(x, c.children) : T & 16 && R(
      c.children,
      x,
      null,
      b,
      m,
      fr(c, y),
      S,
      C
    ), F && dt(c, null, b, "created"), te(x, c, c.scopeId, S, b), P) {
      for (const Y in P)
        Y !== "value" && !zt(Y) && s(x, Y, null, P[Y], y, b);
      "value" in P && s(x, "value", null, P.value, y), (_ = P.onVnodeBeforeMount) && Le(_, b, c);
    }
    An(x, "__vnode", c, !0), An(x, "__vueParentComponent", b, !0), F && dt(c, null, b, "beforeMount");
    const V = Rc(m, M);
    V && M.beforeEnter(x), r(x, d, h), ((_ = P && P.onVnodeMounted) || V || F) && Ce(() => {
      _ && Le(_, b, c), V && M.enter(x), F && dt(c, null, b, "mounted");
    }, m);
  }, te = (c, d, h, b, m) => {
    if (h && v(c, h), b)
      for (let y = 0; y < b.length; y++)
        v(c, b[y]);
    if (m) {
      let y = m.subTree;
      if (y.patchFlag > 0 && y.patchFlag & 2048 && (y = Xr(y.children) || y), d === y || ai(y.type) && (y.ssContent === d || y.ssFallback === d)) {
        const S = m.vnode;
        te(
          c,
          S,
          S.scopeId,
          S.slotScopeIds,
          m.parent
        );
      }
    }
  }, R = (c, d, h, b, m, y, S, C, x = 0) => {
    for (let _ = x; _ < c.length; _++) {
      const P = c[_] = C ? ct(c[_]) : Oe(c[_]);
      N(
        null,
        P,
        d,
        h,
        b,
        m,
        y,
        S,
        C
      );
    }
  }, U = (c, d, h, b, m, y, S) => {
    const C = d.el = c.el;
    C.__vnode = d;
    let { patchFlag: x, dynamicChildren: _, dirs: P } = d;
    x |= c.patchFlag & 16;
    const T = c.props || G, M = d.props || G;
    let F;
    if (h && pt(h, !1), (F = M.onVnodeBeforeUpdate) && Le(F, h, d, c), P && dt(d, c, h, "beforeUpdate"), h && pt(h, !0), Ke && (x = 0, S = !1, _ = null), (T.innerHTML && M.innerHTML == null || T.textContent && M.textContent == null) && u(C, ""), _ ? (X(
      c.dynamicChildren,
      _,
      C,
      h,
      b,
      fr(d, m),
      y
    ), Tr(c, d)) : S || Re(
      c,
      d,
      C,
      null,
      h,
      b,
      fr(d, m),
      y,
      !1
    ), x > 0) {
      if (x & 16)
        E(C, T, M, h, m);
      else if (x & 2 && T.class !== M.class && s(C, "class", null, M.class, m), x & 4 && s(C, "style", T.style, M.style, m), x & 8) {
        const V = d.dynamicProps;
        for (let Y = 0; Y < V.length; Y++) {
          const q = V[Y], xe = T[q], we = M[q];
          (we !== xe || q === "value") && s(C, q, xe, we, m, h);
        }
      }
      x & 1 && c.children !== d.children && u(C, d.children);
    } else !S && _ == null && E(C, T, M, h, m);
    ((F = M.onVnodeUpdated) || P) && Ce(() => {
      F && Le(F, h, d, c), P && dt(d, c, h, "updated");
    }, b);
  }, X = (c, d, h, b, m, y, S) => {
    for (let C = 0; C < d.length; C++) {
      const x = c[C], _ = d[C], P = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        x.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (x.type === be || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !yt(x, _) || // - In the case of a component, it could contain anything.
        x.shapeFlag & 70) ? a(x.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          h
        )
      );
      N(
        x,
        _,
        P,
        null,
        b,
        m,
        y,
        S,
        !0
      );
    }
  }, E = (c, d, h, b, m) => {
    if (d !== h) {
      if (d !== G)
        for (const y in d)
          !zt(y) && !(y in h) && s(
            c,
            y,
            d[y],
            null,
            m,
            b
          );
      for (const y in h) {
        if (zt(y)) continue;
        const S = h[y], C = d[y];
        S !== C && y !== "value" && s(c, y, C, S, m, b);
      }
      "value" in h && s(c, "value", d.value, h.value, m);
    }
  }, Z = (c, d, h, b, m, y, S, C, x) => {
    const _ = d.el = c ? c.el : l(""), P = d.anchor = c ? c.anchor : l("");
    let { patchFlag: T, dynamicChildren: M, slotScopeIds: F } = d;
    // #5523 dev root fragment may inherit directives
    (Ke || T & 2048) && (T = 0, x = !1, M = null), F && (C = C ? C.concat(F) : F), c == null ? (r(_, h, b), r(P, h, b), R(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      d.children || [],
      h,
      P,
      m,
      y,
      S,
      C,
      x
    )) : T > 0 && T & 64 && M && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    c.dynamicChildren ? (X(
      c.dynamicChildren,
      M,
      h,
      m,
      y,
      S,
      C
    ), Tr(c, d)) : Re(
      c,
      d,
      h,
      P,
      m,
      y,
      S,
      C,
      x
    );
  }, pe = (c, d, h, b, m, y, S, C, x) => {
    d.slotScopeIds = C, c == null ? d.shapeFlag & 512 ? m.ctx.activate(
      d,
      h,
      b,
      S,
      x
    ) : he(
      d,
      h,
      b,
      m,
      y,
      S,
      x
    ) : ae(c, d, x);
  }, he = (c, d, h, b, m, y, S) => {
    const C = c.component = Qc(
      c,
      b,
      m
    );
    if (C.type.__hmrId && Pl(C), wn(c), $t(C, "mount"), hn(c) && (C.ctx.renderer = Kt), $t(C, "init"), tf(C, !1, S), At(C, "init"), C.asyncDep) {
      if (Ke && (c.el = null), m && m.registerDep(C, H, S), !c.el) {
        const x = C.subTree = _e(re);
        B(null, x, d, h);
      }
    } else
      H(
        C,
        c,
        d,
        h,
        m,
        y,
        S
      );
    xn(), At(C, "mount");
  }, ae = (c, d, h) => {
    const b = d.component = c.component;
    if (Bc(c, d, h))
      if (b.asyncDep && !b.asyncResolved) {
        wn(d), j(b, d, h), xn();
        return;
      } else
        b.next = d, b.update();
    else
      d.el = c.el, b.vnode = d;
  }, H = (c, d, h, b, m, y, S) => {
    const C = () => {
      if (c.isMounted) {
        let { next: T, bu: M, u: F, parent: V, vnode: Y } = c;
        {
          const Fe = si(c);
          if (Fe) {
            T && (T.el = Y.el, j(c, T, S)), Fe.asyncDep.then(() => {
              c.isUnmounted || C();
            });
            return;
          }
        }
        let q = T, xe;
        wn(T || c.vnode), pt(c, !1), T ? (T.el = Y.el, j(c, T, S)) : T = Y, M && Mt(M), (xe = T.props && T.props.onVnodeBeforeUpdate) && Le(xe, V, T, Y), pt(c, !0), $t(c, "render");
        const we = vo(c);
        At(c, "render");
        const Ne = c.subTree;
        c.subTree = we, $t(c, "patch"), N(
          Ne,
          we,
          // parent may have changed if it's in a teleport
          a(Ne.el),
          // anchor may have changed if it's in a fragment
          mn(Ne),
          c,
          m,
          y
        ), At(c, "patch"), T.el = we.el, q === null && Kc(c, we.el), F && Ce(F, m), (xe = T.props && T.props.onVnodeUpdated) && Ce(
          () => Le(xe, V, T, Y),
          m
        ), As(c), xn();
      } else {
        let T;
        const { el: M, props: F } = d, { bm: V, m: Y, parent: q, root: xe, type: we } = c, Ne = Nt(d);
        pt(c, !1), V && Mt(V), !Ne && (T = F && F.onVnodeBeforeMount) && Le(T, q, d), pt(c, !0);
        {
          xe.ce && xe.ce._injectChildStyle(we), $t(c, "render");
          const Fe = c.subTree = vo(c);
          At(c, "render"), $t(c, "patch"), N(
            null,
            Fe,
            h,
            b,
            c,
            m,
            y
          ), At(c, "patch"), d.el = Fe.el;
        }
        if (Y && Ce(Y, m), !Ne && (T = F && F.onVnodeMounted)) {
          const Fe = d;
          Ce(
            () => Le(T, q, Fe),
            m
          );
        }
        (d.shapeFlag & 256 || q && Nt(q.vnode) && q.vnode.shapeFlag & 256) && c.a && Ce(c.a, m), c.isMounted = !0, jl(c), d = h = b = null;
      }
    };
    c.scope.on();
    const x = c.effect = new ts(C);
    c.scope.off();
    const _ = c.update = x.run.bind(x), P = c.job = x.runIfDirty.bind(x);
    P.i = c, P.id = c.uid, x.scheduler = () => qn(P), pt(c, !0), x.onTrack = c.rtc ? (T) => Mt(c.rtc, T) : void 0, x.onTrigger = c.rtg ? (T) => Mt(c.rtg, T) : void 0, _();
  }, j = (c, d, h) => {
    d.component = c;
    const b = c.vnode.props;
    c.vnode = d, c.next = null, _c(c, d.props, b, h), Ac(c, d.children, h), Qe(), co(c), et();
  }, Re = (c, d, h, b, m, y, S, C, x = !1) => {
    const _ = c && c.children, P = c ? c.shapeFlag : 0, T = d.children, { patchFlag: M, shapeFlag: F } = d;
    if (M > 0) {
      if (M & 128) {
        kt(
          _,
          T,
          h,
          b,
          m,
          y,
          S,
          C,
          x
        );
        return;
      } else if (M & 256) {
        Zn(
          _,
          T,
          h,
          b,
          m,
          y,
          S,
          C,
          x
        );
        return;
      }
    }
    F & 8 ? (P & 16 && Bt(_, m, y), T !== _ && u(h, T)) : P & 16 ? F & 16 ? kt(
      _,
      T,
      h,
      b,
      m,
      y,
      S,
      C,
      x
    ) : Bt(_, m, y, !0) : (P & 8 && u(h, ""), F & 16 && R(
      T,
      h,
      b,
      m,
      y,
      S,
      C,
      x
    ));
  }, Zn = (c, d, h, b, m, y, S, C, x) => {
    c = c || Pt, d = d || Pt;
    const _ = c.length, P = d.length, T = Math.min(_, P);
    let M;
    for (M = 0; M < T; M++) {
      const F = d[M] = x ? ct(d[M]) : Oe(d[M]);
      N(
        c[M],
        F,
        h,
        null,
        m,
        y,
        S,
        C,
        x
      );
    }
    _ > P ? Bt(
      c,
      m,
      y,
      !0,
      !1,
      T
    ) : R(
      d,
      h,
      b,
      m,
      y,
      S,
      C,
      x,
      T
    );
  }, kt = (c, d, h, b, m, y, S, C, x) => {
    let _ = 0;
    const P = d.length;
    let T = c.length - 1, M = P - 1;
    for (; _ <= T && _ <= M; ) {
      const F = c[_], V = d[_] = x ? ct(d[_]) : Oe(d[_]);
      if (yt(F, V))
        N(
          F,
          V,
          h,
          null,
          m,
          y,
          S,
          C,
          x
        );
      else
        break;
      _++;
    }
    for (; _ <= T && _ <= M; ) {
      const F = c[T], V = d[M] = x ? ct(d[M]) : Oe(d[M]);
      if (yt(F, V))
        N(
          F,
          V,
          h,
          null,
          m,
          y,
          S,
          C,
          x
        );
      else
        break;
      T--, M--;
    }
    if (_ > T) {
      if (_ <= M) {
        const F = M + 1, V = F < P ? d[F].el : b;
        for (; _ <= M; )
          N(
            null,
            d[_] = x ? ct(d[_]) : Oe(d[_]),
            h,
            V,
            m,
            y,
            S,
            C,
            x
          ), _++;
      }
    } else if (_ > M)
      for (; _ <= T; )
        nt(c[_], m, y, !0), _++;
    else {
      const F = _, V = _, Y = /* @__PURE__ */ new Map();
      for (_ = V; _ <= M; _++) {
        const ge = d[_] = x ? ct(d[_]) : Oe(d[_]);
        ge.key != null && (Y.has(ge.key) && w(
          "Duplicate keys found during update:",
          JSON.stringify(ge.key),
          "Make sure keys are unique."
        ), Y.set(ge.key, _));
      }
      let q, xe = 0;
      const we = M - V + 1;
      let Ne = !1, Fe = 0;
      const Ut = new Array(we);
      for (_ = 0; _ < we; _++) Ut[_] = 0;
      for (_ = F; _ <= T; _++) {
        const ge = c[_];
        if (xe >= we) {
          nt(ge, m, y, !0);
          continue;
        }
        let De;
        if (ge.key != null)
          De = Y.get(ge.key);
        else
          for (q = V; q <= M; q++)
            if (Ut[q - V] === 0 && yt(ge, d[q])) {
              De = q;
              break;
            }
        De === void 0 ? nt(ge, m, y, !0) : (Ut[De - V] = _ + 1, De >= Fe ? Fe = De : Ne = !0, N(
          ge,
          d[De],
          h,
          null,
          m,
          y,
          S,
          C,
          x
        ), xe++);
      }
      const to = Ne ? Nc(Ut) : Pt;
      for (q = to.length - 1, _ = we - 1; _ >= 0; _--) {
        const ge = V + _, De = d[ge], no = ge + 1 < P ? d[ge + 1].el : b;
        Ut[_] === 0 ? N(
          null,
          De,
          h,
          no,
          m,
          y,
          S,
          C,
          x
        ) : Ne && (q < 0 || _ !== to[q] ? Et(De, h, no, 2) : q--);
      }
    }
  }, Et = (c, d, h, b, m = null) => {
    const { el: y, type: S, transition: C, children: x, shapeFlag: _ } = c;
    if (_ & 6) {
      Et(c.component.subTree, d, h, b);
      return;
    }
    if (_ & 128) {
      c.suspense.move(d, h, b);
      return;
    }
    if (_ & 64) {
      S.move(c, d, h, Kt);
      return;
    }
    if (S === be) {
      r(y, d, h);
      for (let T = 0; T < x.length; T++)
        Et(x[T], d, h, b);
      r(c.anchor, d, h);
      return;
    }
    if (S === Tn) {
      ie(c, d, h);
      return;
    }
    if (b !== 2 && _ & 1 && C)
      if (b === 0)
        C.beforeEnter(y), r(y, d, h), Ce(() => C.enter(y), m);
      else {
        const { leave: T, delayLeave: M, afterLeave: F } = C, V = () => r(y, d, h), Y = () => {
          T(y, () => {
            V(), F && F();
          });
        };
        M ? M(y, V, Y) : Y();
      }
    else
      r(y, d, h);
  }, nt = (c, d, h, b = !1, m = !1) => {
    const {
      type: y,
      props: S,
      ref: C,
      children: x,
      dynamicChildren: _,
      shapeFlag: P,
      patchFlag: T,
      dirs: M,
      cacheIndex: F
    } = c;
    if (T === -2 && (m = !1), C != null && Dn(C, null, h, c, !0), F != null && (d.renderCache[F] = void 0), P & 256) {
      d.ctx.deactivate(c);
      return;
    }
    const V = P & 1 && M, Y = !Nt(c);
    let q;
    if (Y && (q = S && S.onVnodeBeforeUnmount) && Le(q, d, c), P & 6)
      $i(c.component, h, b);
    else {
      if (P & 128) {
        c.suspense.unmount(h, b);
        return;
      }
      V && dt(c, null, d, "beforeUnmount"), P & 64 ? c.type.remove(
        c,
        d,
        h,
        Kt,
        b
      ) : _ && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !_.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (y !== be || T > 0 && T & 64) ? Bt(
        _,
        d,
        h,
        !1,
        !0
      ) : (y === be && T & 384 || !m && P & 16) && Bt(x, d, h), b && Qn(c);
    }
    (Y && (q = S && S.onVnodeUnmounted) || V) && Ce(() => {
      q && Le(q, d, c), V && dt(c, null, d, "unmounted");
    }, h);
  }, Qn = (c) => {
    const { type: d, el: h, anchor: b, transition: m } = c;
    if (d === be) {
      c.patchFlag > 0 && c.patchFlag & 2048 && m && !m.persisted ? c.children.forEach((S) => {
        S.type === re ? o(S.el) : Qn(S);
      }) : Oi(h, b);
      return;
    }
    if (d === Tn) {
      A(c);
      return;
    }
    const y = () => {
      o(h), m && !m.persisted && m.afterLeave && m.afterLeave();
    };
    if (c.shapeFlag & 1 && m && !m.persisted) {
      const { leave: S, delayLeave: C } = m, x = () => S(h, y);
      C ? C(c.el, y, x) : x();
    } else
      y();
  }, Oi = (c, d) => {
    let h;
    for (; c !== d; )
      h = g(c), o(c), c = h;
    o(d);
  }, $i = (c, d, h) => {
    c.type.__hmrId && Rl(c);
    const { bum: b, scope: m, job: y, subTree: S, um: C, m: x, a: _ } = c;
    _o(x), _o(_), b && Mt(b), m.stop(), y && (y.flags |= 8, nt(S, c, d, h)), C && Ce(C, d), Ce(() => {
      c.isUnmounted = !0;
    }, d), d && d.pendingBranch && !d.isUnmounted && c.asyncDep && !c.asyncResolved && c.suspenseId === d.pendingId && (d.deps--, d.deps === 0 && d.resolve()), Hl(c);
  }, Bt = (c, d, h, b = !1, m = !1, y = 0) => {
    for (let S = y; S < c.length; S++)
      nt(c[S], d, h, b, m);
  }, mn = (c) => {
    if (c.shapeFlag & 6)
      return mn(c.component.subTree);
    if (c.shapeFlag & 128)
      return c.suspense.next();
    const d = g(c.anchor || c.el), h = d && d[Wl];
    return h ? g(h) : d;
  };
  let er = !1;
  const eo = (c, d, h) => {
    c == null ? d._vnode && nt(d._vnode, null, null, !0) : N(
      d._vnode || null,
      c,
      d,
      null,
      null,
      null,
      h
    ), d._vnode = c, er || (er = !0, co(), Ts(), er = !1);
  }, Kt = {
    p: N,
    um: nt,
    m: Et,
    r: Qn,
    mt: he,
    mc: R,
    pc: Re,
    pbc: X,
    n: mn,
    o: e
  };
  return {
    render: eo,
    hydrate: void 0,
    createApp: gc(eo)
  };
}
function fr({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function pt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Rc(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Tr(e, t, n = !1) {
  const r = e.children, o = t.children;
  if ($(r) && $(o))
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      let l = o[s];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[s] = ct(o[s]), l.el = i.el), !n && l.patchFlag !== -2 && Tr(i, l)), l.type === Ht && (l.el = i.el), l.type === re && !l.el && (l.el = i.el);
    }
}
function Nc(e) {
  const t = e.slice(), n = [0];
  let r, o, s, i, l;
  const f = e.length;
  for (r = 0; r < f; r++) {
    const p = e[r];
    if (p !== 0) {
      if (o = n[n.length - 1], e[o] < p) {
        t[r] = o, n.push(r);
        continue;
      }
      for (s = 0, i = n.length - 1; s < i; )
        l = s + i >> 1, e[n[l]] < p ? s = l + 1 : i = l;
      p < e[n[s]] && (s > 0 && (t[r] = n[s - 1]), n[s] = r);
    }
  }
  for (s = n.length, i = n[s - 1]; s-- > 0; )
    n[s] = i, i = t[i];
  return n;
}
function si(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : si(t);
}
function _o(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const Fc = Symbol.for("v-scx"), Dc = () => {
  {
    const e = Sn(Fc);
    return e || w(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function ar(e, t, n) {
  return I(t) || w(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), ii(e, t, n);
}
function ii(e, t, n = G) {
  const { immediate: r, deep: o, flush: s, once: i } = n;
  t || (r !== void 0 && w(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), o !== void 0 && w(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), i !== void 0 && w(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const l = ee({}, n);
  l.onWarn = w;
  const f = t && r || !t && s !== "post";
  let p;
  if (sn) {
    if (s === "sync") {
      const v = Dc();
      p = v.__watcherHandles || (v.__watcherHandles = []);
    } else if (!f) {
      const v = () => {
      };
      return v.stop = de, v.resume = de, v.pause = de, v;
    }
  }
  const u = ce;
  l.call = (v, O, N) => Pe(v, u, O, N);
  let a = !1;
  s === "post" ? l.scheduler = (v) => {
    Ce(v, u && u.suspense);
  } : s !== "sync" && (a = !0, l.scheduler = (v, O) => {
    O ? v() : qn(v);
  }), l.augmentJob = (v) => {
    t && (v.flags |= 4), a && (v.flags |= 2, u && (v.id = u.uid, v.i = u));
  };
  const g = Cl(e, t, l);
  return sn && (p ? p.push(g) : f && g()), g;
}
function Lc(e, t, n) {
  const r = this.proxy, o = Q(e) ? e.includes(".") ? li(r, e) : () => r[e] : e.bind(r, r);
  let s;
  I(t) ? s = t : (s = t.handler, n = t);
  const i = gn(this), l = ii(o, s.bind(r), n);
  return i(), l;
}
function li(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
const jc = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${$e(t)}Modifiers`] || e[`${ze(t)}Modifiers`];
function Vc(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || G;
  {
    const {
      emitsOptions: u,
      propsOptions: [a]
    } = e;
    if (u)
      if (!(t in u))
        (!a || !(gt($e(t)) in a)) && w(
          `Component emitted event "${t}" but it is neither declared in the emits option nor as an "${gt($e(t))}" prop.`
        );
      else {
        const g = u[t];
        I(g) && (g(...n) || w(
          `Invalid event arguments: event validation failed for event "${t}".`
        ));
      }
  }
  let o = n;
  const s = t.startsWith("update:"), i = s && jc(r, t.slice(7));
  i && (i.trim && (o = n.map((u) => Q(u) ? u.trim() : u)), i.number && (o = n.map(Mn))), Kl(e, t, o);
  {
    const u = t.toLowerCase();
    u !== t && r[gt(u)] && w(
      `Event "${u}" is emitted in component ${Xn(
        e,
        e.type
      )} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${ze(
        t
      )}" instead of "${t}".`
    );
  }
  let l, f = r[l = gt(t)] || // also try camelCase event handler (#2249)
  r[l = gt($e(t))];
  !f && s && (f = r[l = gt(ze(t))]), f && Pe(
    f,
    e,
    6,
    o
  );
  const p = r[l + "Once"];
  if (p) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, Pe(
      p,
      e,
      6,
      o
    );
  }
}
function ci(e, t, n = !1) {
  const r = t.emitsCache, o = r.get(e);
  if (o !== void 0)
    return o;
  const s = e.emits;
  let i = {}, l = !1;
  if (!I(e)) {
    const f = (p) => {
      const u = ci(p, t, !0);
      u && (l = !0, ee(i, u));
    };
    !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  return !s && !l ? (K(e) && r.set(e, null), null) : ($(s) ? s.forEach((f) => i[f] = null) : ee(i, s), K(e) && r.set(e, i), i);
}
function Yn(e, t) {
  return !e || !cn(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), k(e, t[0].toLowerCase() + t.slice(1)) || k(e, ze(t)) || k(e, t));
}
let Er = !1;
function Vn() {
  Er = !0;
}
function vo(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    propsOptions: [s],
    slots: i,
    attrs: l,
    emit: f,
    render: p,
    renderCache: u,
    props: a,
    data: g,
    setupState: v,
    ctx: O,
    inheritAttrs: N
  } = e, ne = Fn(e);
  let B, z;
  Er = !1;
  try {
    if (n.shapeFlag & 4) {
      const A = o || r, J = st.NODE_ENV !== "production" && v.__isScriptSetup ? new Proxy(A, {
        get(fe, te, R) {
          return w(
            `Property '${String(
              te
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(fe, te, R);
        }
      }) : A;
      B = Oe(
        p.call(
          J,
          A,
          u,
          st.NODE_ENV !== "production" ? Be(a) : a,
          v,
          g,
          O
        )
      ), z = l;
    } else {
      const A = t;
      st.NODE_ENV !== "production" && l === a && Vn(), B = Oe(
        A.length > 1 ? A(
          st.NODE_ENV !== "production" ? Be(a) : a,
          st.NODE_ENV !== "production" ? {
            get attrs() {
              return Vn(), Be(l);
            },
            slots: i,
            emit: f
          } : { attrs: l, slots: i, emit: f }
        ) : A(
          st.NODE_ENV !== "production" ? Be(a) : a,
          null
        )
      ), z = t.props ? l : Hc(l);
    }
  } catch (A) {
    Qt.length = 0, dn(A, e, 1), B = _e(re);
  }
  let L = B, ie;
  if (B.patchFlag > 0 && B.patchFlag & 2048 && ([L, ie] = fi(B)), z && N !== !1) {
    const A = Object.keys(z), { shapeFlag: J } = L;
    if (A.length) {
      if (J & 7)
        s && A.some($n) && (z = kc(
          z,
          s
        )), L = We(L, z, !1, !0);
      else if (!Er && L.type !== re) {
        const fe = Object.keys(l), te = [], R = [];
        for (let U = 0, X = fe.length; U < X; U++) {
          const E = fe[U];
          cn(E) ? $n(E) || te.push(E[2].toLowerCase() + E.slice(3)) : R.push(E);
        }
        R.length && w(
          `Extraneous non-props attributes (${R.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.`
        ), te.length && w(
          `Extraneous non-emits event listeners (${te.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
        );
      }
    }
  }
  return n.dirs && (wo(L) || w(
    "Runtime directive used on component with non-element root node. The directives will not function as intended."
  ), L = We(L, null, !1, !0), L.dirs = L.dirs ? L.dirs.concat(n.dirs) : n.dirs), n.transition && (wo(L) || w(
    "Component inside <Transition> renders non-element root node that cannot be animated."
  ), St(L, n.transition)), ie ? ie(L) : B = L, Fn(ne), B;
}
const fi = (e) => {
  const t = e.children, n = e.dynamicChildren, r = Xr(t, !1);
  if (r) {
    if (r.patchFlag > 0 && r.patchFlag & 2048)
      return fi(r);
  } else return [e, void 0];
  const o = t.indexOf(r), s = n ? n.indexOf(r) : -1, i = (l) => {
    t[o] = l, n && (s > -1 ? n[s] = l : l.patchFlag > 0 && (e.dynamicChildren = [...n, l]));
  };
  return [Oe(r), i];
};
function Xr(e, t = !0) {
  let n;
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    if (Tt(o)) {
      if (o.type !== re || o.children === "v-if") {
        if (n)
          return;
        if (n = o, t && n.patchFlag > 0 && n.patchFlag & 2048)
          return Xr(n.children);
      }
    } else
      return;
  }
  return n;
}
const Hc = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || cn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, kc = (e, t) => {
  const n = {};
  for (const r in e)
    (!$n(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
}, wo = (e) => e.shapeFlag & 7 || e.type === re;
function Bc(e, t, n) {
  const { props: r, children: o, component: s } = e, { props: i, children: l, patchFlag: f } = t, p = s.emitsOptions;
  if ((o || l) && Ke || t.dirs || t.transition)
    return !0;
  if (n && f >= 0) {
    if (f & 1024)
      return !0;
    if (f & 16)
      return r ? xo(r, i, p) : !!i;
    if (f & 8) {
      const u = t.dynamicProps;
      for (let a = 0; a < u.length; a++) {
        const g = u[a];
        if (i[g] !== r[g] && !Yn(p, g))
          return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable) ? !0 : r === i ? !1 : r ? i ? xo(r, i, p) : !0 : !!i;
  return !1;
}
function xo(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (t[s] !== e[s] && !Yn(n, s))
      return !0;
  }
  return !1;
}
function Kc({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const r = t.subTree;
    if (r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const ai = (e) => e.__isSuspense;
function Uc(e, t) {
  t && t.pendingBranch ? $(e) ? t.effects.push(...e) : t.effects.push(e) : Ss(e);
}
const be = Symbol.for("v-fgt"), Ht = Symbol.for("v-txt"), re = Symbol.for("v-cmt"), Tn = Symbol.for("v-stc"), Qt = [];
let Te = null;
function Or(e = !1) {
  Qt.push(Te = e ? null : []);
}
function Wc() {
  Qt.pop(), Te = Qt[Qt.length - 1] || null;
}
let on = 1;
function Co(e, t = !1) {
  on += e, e < 0 && Te && t && (Te.hasOnce = !0);
}
function ui(e) {
  return e.dynamicChildren = on > 0 ? Te || Pt : null, Wc(), on > 0 && Te && Te.push(e), e;
}
function ia(e, t, n, r, o, s) {
  return ui(
    pi(
      e,
      t,
      n,
      r,
      o,
      s,
      !0
    )
  );
}
function $r(e, t, n, r, o) {
  return ui(
    _e(
      e,
      t,
      n,
      r,
      o,
      !0
    )
  );
}
function Tt(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function yt(e, t) {
  if (t.shapeFlag & 6 && e.component) {
    const n = Cn.get(t.type);
    if (n && n.has(e.component))
      return e.shapeFlag &= -257, t.shapeFlag &= -513, !1;
  }
  return e.type === t.type && e.key === t.key;
}
const Gc = (...e) => qc(
  ...e
), di = ({ key: e }) => e ?? null, En = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Q(e) || oe(e) || I(e) ? { i: se, r: e, k: t, f: !!n } : e : null);
function pi(e, t = null, n = null, r = 0, o = null, s = e === be ? 0 : 1, i = !1, l = !1) {
  const f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && di(t),
    ref: t && En(t),
    scopeId: Is,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: r,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: se
  };
  return l ? (Zr(f, n), s & 128 && e.normalize(f)) : n && (f.shapeFlag |= Q(n) ? 8 : 16), f.key !== f.key && w("VNode created with invalid key (NaN). VNode type:", f.type), on > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Te && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (f.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  f.patchFlag !== 32 && Te.push(f), f;
}
const _e = Gc;
function qc(e, t = null, n = null, r = 0, o = null, s = !1) {
  if ((!e || e === oc) && (e || w(`Invalid vnode type when creating vnode: ${e}.`), e = re), Tt(e)) {
    const l = We(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Zr(l, n), on > 0 && !s && Te && (l.shapeFlag & 6 ? Te[Te.indexOf(e)] = l : Te.push(l)), l.patchFlag = -2, l;
  }
  if (bi(e) && (e = e.__vccOpts), t) {
    t = Jc(t);
    let { class: l, style: f } = t;
    l && !Q(l) && (t.class = jr(l)), K(f) && (In(f) && !$(f) && (f = ee({}, f)), t.style = Lr(f));
  }
  const i = Q(e) ? 1 : ai(e) ? 128 : Rs(e) ? 64 : K(e) ? 4 : I(e) ? 2 : 0;
  return i & 4 && In(e) && (e = D(e), w(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), pi(
    e,
    t,
    n,
    r,
    o,
    i,
    s,
    !0
  );
}
function Jc(e) {
  return e ? In(e) || Zs(e) ? ee({}, e) : e : null;
}
function We(e, t, n = !1, r = !1) {
  const { props: o, ref: s, patchFlag: i, children: l, transition: f } = e, p = t ? zc(o || {}, t) : o, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: p,
    key: p && di(p),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? $(s) ? s.concat(En(t)) : [s, En(t)] : En(t)
    ) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i === -1 && $(l) ? l.map(hi) : l,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== be ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: f,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && We(e.ssContent),
    ssFallback: e.ssFallback && We(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return f && r && St(
    u,
    f.clone(u)
  ), u;
}
function hi(e) {
  const t = We(e);
  return $(e.children) && (t.children = e.children.map(hi)), t;
}
function Yc(e = " ", t = 0) {
  return _e(Ht, null, e, t);
}
function la(e = "", t = !1) {
  return t ? (Or(), $r(re, null, e)) : _e(re, null, e);
}
function Oe(e) {
  return e == null || typeof e == "boolean" ? _e(re) : $(e) ? _e(
    be,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Tt(e) ? ct(e) : _e(Ht, null, String(e));
}
function ct(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : We(e);
}
function Zr(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if ($(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Zr(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !Zs(t) ? t._ctx = se : o === 3 && se && (se.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else I(t) ? (t = { default: t, _ctx: se }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [Yc(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function zc(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = jr([t.class, r.class]));
      else if (o === "style")
        t.style = Lr([t.style, r.style]);
      else if (cn(o)) {
        const s = t[o], i = r[o];
        i && s !== i && !($(s) && s.includes(i)) && (t[o] = s ? [].concat(s, i) : i);
      } else o !== "" && (t[o] = r[o]);
  }
  return t;
}
function Le(e, t, n, r = null) {
  Pe(e, t, 7, [
    n,
    r
  ]);
}
const Xc = Ys();
let Zc = 0;
function Qc(e, t, n) {
  const r = e.type, o = (t ? t.appContext : e.appContext) || Xc, s = {
    uid: Zc++,
    vnode: e,
    type: r,
    parent: t,
    appContext: o,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new es(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(o.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: ei(r, o),
    emitsOptions: ci(r, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: G,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: G,
    data: G,
    props: G,
    attrs: G,
    slots: G,
    refs: G,
    setupState: G,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return s.ctx = sc(s), s.root = t ? t.root : s, s.emit = Vc.bind(null, s), e.ce && e.ce(s), s;
}
let ce = null;
const Qr = () => ce || se;
let Hn, Ar;
{
  const e = an(), t = (n, r) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(r), (s) => {
      o.length > 1 ? o.forEach((i) => i(s)) : o[0](s);
    };
  };
  Hn = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => ce = n
  ), Ar = t(
    "__VUE_SSR_SETTERS__",
    (n) => sn = n
  );
}
const gn = (e) => {
  const t = ce;
  return Hn(e), e.scope.on(), () => {
    e.scope.off(), Hn(t);
  };
}, So = () => {
  ce && ce.scope.off(), Hn(null);
}, ef = /* @__PURE__ */ Ze("slot,component");
function Mr(e, { isNativeTag: t }) {
  (ef(e) || t(e)) && w(
    "Do not use built-in or reserved HTML elements as component id: " + e
  );
}
function gi(e) {
  return e.vnode.shapeFlag & 4;
}
let sn = !1;
function tf(e, t = !1, n = !1) {
  t && Ar(t);
  const { props: r, children: o } = e.vnode, s = gi(e);
  yc(e, r, s, t), $c(e, o, n);
  const i = s ? nf(e, t) : void 0;
  return t && Ar(!1), i;
}
function nf(e, t) {
  var n;
  const r = e.type;
  {
    if (r.name && Mr(r.name, e.appContext.config), r.components) {
      const s = Object.keys(r.components);
      for (let i = 0; i < s.length; i++)
        Mr(s[i], e.appContext.config);
    }
    if (r.directives) {
      const s = Object.keys(r.directives);
      for (let i = 0; i < s.length; i++)
        Ps(s[i]);
    }
    r.compilerOptions && rf() && w(
      '"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'
    );
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Gs), ic(e);
  const { setup: o } = r;
  if (o) {
    Qe();
    const s = e.setupContext = o.length > 1 ? lf(e) : null, i = gn(e), l = Vt(
      o,
      e,
      0,
      [
        Be(e.props),
        s
      ]
    ), f = Nr(l);
    if (et(), i(), (f || e.sp) && !Nt(e) && Vs(e), f) {
      if (l.then(So, So), t)
        return l.then((p) => {
          To(e, p, t);
        }).catch((p) => {
          dn(p, e, 0);
        });
      if (e.asyncDep = l, !e.suspense) {
        const p = (n = r.name) != null ? n : "Anonymous";
        w(
          `Component <${p}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
        );
      }
    } else
      To(e, l, t);
  } else
    mi(e, t);
}
function To(e, t, n) {
  I(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : K(t) ? (Tt(t) && w(
    "setup() should not return VNodes directly - return a render function instead."
  ), e.devtoolsRawSetupState = t, e.setupState = _s(t), lc(e)) : t !== void 0 && w(
    `setup() should return an object. Received: ${t === null ? "null" : typeof t}`
  ), mi(e, n);
}
const rf = () => !0;
function mi(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || de);
  {
    const o = gn(e);
    Qe();
    try {
      fc(e);
    } finally {
      et(), o();
    }
  }
  !r.render && e.render === de && !t && (r.template ? w(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
  ) : w("Component is missing template or render function: ", r));
}
const of = {
  get(e, t) {
    return Vn(), le(e, "get", ""), e[t];
  },
  set() {
    return w("setupContext.attrs is readonly."), !1;
  },
  deleteProperty() {
    return w("setupContext.attrs is readonly."), !1;
  }
};
function sf(e) {
  return new Proxy(e.slots, {
    get(t, n) {
      return le(e, "get", "$slots"), t[n];
    }
  });
}
function lf(e) {
  const t = (n) => {
    if (e.exposed && w("expose() should be called only once per setup()."), n != null) {
      let r = typeof n;
      r === "object" && ($(n) ? r = "array" : oe(n) && (r = "ref")), r !== "object" && w(
        `expose() should be passed a plain object, received ${r}.`
      );
    }
    e.exposed = n || {};
  };
  {
    let n, r;
    return Object.freeze({
      get attrs() {
        return n || (n = new Proxy(e.attrs, of));
      },
      get slots() {
        return r || (r = sf(e));
      },
      get emit() {
        return (o, ...s) => e.emit(o, ...s);
      },
      expose: t
    });
  }
}
function zn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(_s(ml(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in xt)
        return xt[n](e);
    },
    has(t, n) {
      return n in t || n in xt;
    }
  })) : e.proxy;
}
const cf = /(?:^|[-_])(\w)/g, ff = (e) => e.replace(cf, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function yi(e, t = !0) {
  return I(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Xn(e, t, n = !1) {
  let r = yi(t);
  if (!r && t.__file) {
    const o = t.__file.match(/([^/\\]+)\.\w+$/);
    o && (r = o[1]);
  }
  if (!r && e && e.parent) {
    const o = (s) => {
      for (const i in s)
        if (s[i] === t)
          return i;
    };
    r = o(
      e.components || e.parent.type.components
    ) || o(e.appContext.components);
  }
  return r ? ff(r) : n ? "App" : "Anonymous";
}
function bi(e) {
  return I(e) && "__vccOpts" in e;
}
const af = (e, t) => {
  const n = wl(e, t, sn);
  {
    const r = Qr();
    r && r.appContext.config.warnRecursiveComputed && (n._warnRecursive = !0);
  }
  return n;
};
function uf(e, t, n) {
  const r = arguments.length;
  return r === 2 ? K(t) && !$(t) ? Tt(t) ? _e(e, null, [t]) : _e(e, t) : _e(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && Tt(n) && (n = [n]), _e(e, t, n));
}
function df() {
  if (typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, r = { style: "color:#eb2f96" }, o = {
    __vue_custom_formatter: !0,
    header(a) {
      return K(a) ? a.__isVue ? ["div", e, "VueInstance"] : oe(a) ? [
        "div",
        {},
        ["span", e, u(a)],
        "<",
        // avoid debugger accessing value affecting behavior
        l("_value" in a ? a._value : a),
        ">"
      ] : vt(a) ? [
        "div",
        {},
        ["span", e, ve(a) ? "ShallowReactive" : "Reactive"],
        "<",
        l(a),
        `>${Xe(a) ? " (readonly)" : ""}`
      ] : Xe(a) ? [
        "div",
        {},
        ["span", e, ve(a) ? "ShallowReadonly" : "Readonly"],
        "<",
        l(a),
        ">"
      ] : null : null;
    },
    hasBody(a) {
      return a && a.__isVue;
    },
    body(a) {
      if (a && a.__isVue)
        return [
          "div",
          {},
          ...s(a.$)
        ];
    }
  };
  function s(a) {
    const g = [];
    a.type.props && a.props && g.push(i("props", D(a.props))), a.setupState !== G && g.push(i("setup", a.setupState)), a.data !== G && g.push(i("data", D(a.data)));
    const v = f(a, "computed");
    v && g.push(i("computed", v));
    const O = f(a, "inject");
    return O && g.push(i("injected", O)), g.push([
      "div",
      {},
      [
        "span",
        {
          style: r.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: a }]
    ]), g;
  }
  function i(a, g) {
    return g = ee({}, g), Object.keys(g).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        a
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(g).map((v) => [
          "div",
          {},
          ["span", r, v + ": "],
          l(g[v], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function l(a, g = !0) {
    return typeof a == "number" ? ["span", t, a] : typeof a == "string" ? ["span", n, JSON.stringify(a)] : typeof a == "boolean" ? ["span", r, a] : K(a) ? ["object", { object: g ? D(a) : a }] : ["span", n, String(a)];
  }
  function f(a, g) {
    const v = a.type;
    if (I(v))
      return;
    const O = {};
    for (const N in a.ctx)
      p(v, N, g) && (O[N] = a.ctx[N]);
    return O;
  }
  function p(a, g, v) {
    const O = a[v];
    if ($(O) && O.includes(g) || K(O) && g in O || a.extends && p(a.extends, g, v) || a.mixins && a.mixins.some((N) => p(N, g, v)))
      return !0;
  }
  function u(a) {
    return ve(a) ? "ShallowRef" : a.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(o) : window.devtoolsFormatters = [o];
}
const Eo = "3.5.13", Me = w;
let Ir;
const Oo = typeof window < "u" && window.trustedTypes;
if (Oo)
  try {
    Ir = /* @__PURE__ */ Oo.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch (e) {
    Me(`Error creating trusted types policy: ${e}`);
  }
const _i = Ir ? (e) => Ir.createHTML(e) : (e) => e, pf = "http://www.w3.org/2000/svg", hf = "http://www.w3.org/1998/Math/MathML", qe = typeof document < "u" ? document : null, $o = qe && /* @__PURE__ */ qe.createElement("template"), gf = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t === "svg" ? qe.createElementNS(pf, e) : t === "mathml" ? qe.createElementNS(hf, e) : n ? qe.createElement(e, { is: n }) : qe.createElement(e);
    return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o;
  },
  createText: (e) => qe.createTextNode(e),
  createComment: (e) => qe.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => qe.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, r, o, s) {
    const i = n ? n.previousSibling : t.lastChild;
    if (o && (o === s || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), n), !(o === s || !(o = o.nextSibling)); )
        ;
    else {
      $o.innerHTML = _i(
        r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e
      );
      const l = $o.content;
      if (r === "svg" || r === "mathml") {
        const f = l.firstChild;
        for (; f.firstChild; )
          l.appendChild(f.firstChild);
        l.removeChild(f);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, rt = "transition", qt = "animation", Dt = Symbol("_vtc"), vi = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
}, wi = /* @__PURE__ */ ee(
  {},
  Fs,
  vi
), mf = (e) => (e.displayName = "Transition", e.props = wi, e), ca = /* @__PURE__ */ mf(
  (e, { slots: t }) => uf(ql, xi(e), t)
), ht = (e, t = []) => {
  $(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, Ao = (e) => e ? $(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function xi(e) {
  const t = {};
  for (const E in e)
    E in vi || (t[E] = e[E]);
  if (e.css === !1)
    return t;
  const {
    name: n = "v",
    type: r,
    duration: o,
    enterFromClass: s = `${n}-enter-from`,
    enterActiveClass: i = `${n}-enter-active`,
    enterToClass: l = `${n}-enter-to`,
    appearFromClass: f = s,
    appearActiveClass: p = i,
    appearToClass: u = l,
    leaveFromClass: a = `${n}-leave-from`,
    leaveActiveClass: g = `${n}-leave-active`,
    leaveToClass: v = `${n}-leave-to`
  } = e, O = yf(o), N = O && O[0], ne = O && O[1], {
    onBeforeEnter: B,
    onEnter: z,
    onEnterCancelled: L,
    onLeave: ie,
    onLeaveCancelled: A,
    onBeforeAppear: J = B,
    onAppear: fe = z,
    onAppearCancelled: te = L
  } = t, R = (E, Z, pe, he) => {
    E._enterCancelled = he, ot(E, Z ? u : l), ot(E, Z ? p : i), pe && pe();
  }, U = (E, Z) => {
    E._isLeaving = !1, ot(E, a), ot(E, v), ot(E, g), Z && Z();
  }, X = (E) => (Z, pe) => {
    const he = E ? fe : z, ae = () => R(Z, E, pe);
    ht(he, [Z, ae]), Mo(() => {
      ot(Z, E ? f : s), je(Z, E ? u : l), Ao(he) || Io(Z, r, N, ae);
    });
  };
  return ee(t, {
    onBeforeEnter(E) {
      ht(B, [E]), je(E, s), je(E, i);
    },
    onBeforeAppear(E) {
      ht(J, [E]), je(E, f), je(E, p);
    },
    onEnter: X(!1),
    onAppear: X(!0),
    onLeave(E, Z) {
      E._isLeaving = !0;
      const pe = () => U(E, Z);
      je(E, a), E._enterCancelled ? (je(E, g), Pr()) : (Pr(), je(E, g)), Mo(() => {
        E._isLeaving && (ot(E, a), je(E, v), Ao(ie) || Io(E, r, ne, pe));
      }), ht(ie, [E, pe]);
    },
    onEnterCancelled(E) {
      R(E, !1, void 0, !0), ht(L, [E]);
    },
    onAppearCancelled(E) {
      R(E, !0, void 0, !0), ht(te, [E]);
    },
    onLeaveCancelled(E) {
      U(E), ht(A, [E]);
    }
  });
}
function yf(e) {
  if (e == null)
    return null;
  if (K(e))
    return [ur(e.enter), ur(e.leave)];
  {
    const t = ur(e);
    return [t, t];
  }
}
function ur(e) {
  const t = Ni(e);
  return $l(t, "<transition> explicit duration"), t;
}
function je(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[Dt] || (e[Dt] = /* @__PURE__ */ new Set())).add(t);
}
function ot(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
  const n = e[Dt];
  n && (n.delete(t), n.size || (e[Dt] = void 0));
}
function Mo(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let bf = 0;
function Io(e, t, n, r) {
  const o = e._endId = ++bf, s = () => {
    o === e._endId && r();
  };
  if (n != null)
    return setTimeout(s, n);
  const { type: i, timeout: l, propCount: f } = Ci(e, t);
  if (!i)
    return r();
  const p = i + "end";
  let u = 0;
  const a = () => {
    e.removeEventListener(p, g), s();
  }, g = (v) => {
    v.target === e && ++u >= f && a();
  };
  setTimeout(() => {
    u < f && a();
  }, l + 1), e.addEventListener(p, g);
}
function Ci(e, t) {
  const n = window.getComputedStyle(e), r = (O) => (n[O] || "").split(", "), o = r(`${rt}Delay`), s = r(`${rt}Duration`), i = Po(o, s), l = r(`${qt}Delay`), f = r(`${qt}Duration`), p = Po(l, f);
  let u = null, a = 0, g = 0;
  t === rt ? i > 0 && (u = rt, a = i, g = s.length) : t === qt ? p > 0 && (u = qt, a = p, g = f.length) : (a = Math.max(i, p), u = a > 0 ? i > p ? rt : qt : null, g = u ? u === rt ? s.length : f.length : 0);
  const v = u === rt && /\b(transform|all)(,|$)/.test(
    r(`${rt}Property`).toString()
  );
  return {
    type: u,
    timeout: a,
    propCount: g,
    hasTransform: v
  };
}
function Po(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, r) => Ro(n) + Ro(e[r])));
}
function Ro(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Pr() {
  return document.body.offsetHeight;
}
function _f(e, t, n) {
  const r = e[Dt];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const No = Symbol("_vod"), vf = Symbol("_vsh"), wf = Symbol("CSS_VAR_TEXT"), xf = /(^|;)\s*display\s*:/;
function Cf(e, t, n) {
  const r = e.style, o = Q(n);
  let s = !1;
  if (n && !o) {
    if (t)
      if (Q(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && On(r, l, "");
        }
      else
        for (const i in t)
          n[i] == null && On(r, i, "");
    for (const i in n)
      i === "display" && (s = !0), On(r, i, n[i]);
  } else if (o) {
    if (t !== n) {
      const i = r[wf];
      i && (n += ";" + i), r.cssText = n, s = xf.test(n);
    }
  } else t && e.removeAttribute("style");
  No in e && (e[No] = s ? r.display : "", e[vf] && (r.display = "none"));
}
const Sf = /[^\\];\s*$/, Fo = /\s*!important$/;
function On(e, t, n) {
  if ($(n))
    n.forEach((r) => On(e, t, r));
  else if (n == null && (n = ""), Sf.test(n) && Me(
    `Unexpected semicolon at the end of '${t}' style value: '${n}'`
  ), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const r = Tf(e, t);
    Fo.test(n) ? e.setProperty(
      ze(r),
      n.replace(Fo, ""),
      "important"
    ) : e[r] = n;
  }
}
const Do = ["Webkit", "Moz", "ms"], dr = {};
function Tf(e, t) {
  const n = dr[t];
  if (n)
    return n;
  let r = $e(t);
  if (r !== "filter" && r in e)
    return dr[t] = r;
  r = Kn(r);
  for (let o = 0; o < Do.length; o++) {
    const s = Do[o] + r;
    if (s in e)
      return dr[t] = s;
  }
  return t;
}
const Lo = "http://www.w3.org/1999/xlink";
function jo(e, t, n, r, o, s = Gi(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Lo, t.slice(6, t.length)) : e.setAttributeNS(Lo, t, n) : n == null || s && !Xo(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : Ie(n) ? String(n) : n
  );
}
function Vo(e, t, n, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? _i(n) : n);
    return;
  }
  const s = e.tagName;
  if (t === "value" && s !== "PROGRESS" && // custom elements may use _value internally
  !s.includes("-")) {
    const l = s === "OPTION" ? e.getAttribute("value") || "" : e.value, f = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== f || !("_value" in e)) && (e.value = f), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let i = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = Xo(n) : n == null && l === "string" ? (n = "", i = !0) : l === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch (l) {
    i || Me(
      `Failed setting prop "${t}" on <${s.toLowerCase()}>: value ${n} is invalid.`,
      l
    );
  }
  i && e.removeAttribute(o || t);
}
function at(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Ef(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const Ho = Symbol("_vei");
function Of(e, t, n, r, o = null) {
  const s = e[Ho] || (e[Ho] = {}), i = s[t];
  if (r && i)
    i.value = Bo(r, t);
  else {
    const [l, f] = $f(t);
    if (r) {
      const p = s[t] = If(
        Bo(r, t),
        o
      );
      at(e, l, p, f);
    } else i && (Ef(e, l, i, f), s[t] = void 0);
  }
}
const ko = /(?:Once|Passive|Capture)$/;
function $f(e) {
  let t;
  if (ko.test(e)) {
    t = {};
    let r;
    for (; r = e.match(ko); )
      e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : ze(e.slice(2)), t];
}
let pr = 0;
const Af = /* @__PURE__ */ Promise.resolve(), Mf = () => pr || (Af.then(() => pr = 0), pr = Date.now());
function If(e, t) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    Pe(
      Pf(r, n.value),
      t,
      5,
      [r]
    );
  };
  return n.value = e, n.attached = Mf(), n;
}
function Bo(e, t) {
  return I(e) || $(e) ? e : (Me(
    `Wrong type passed as event handler to ${t} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof e}.`
  ), de);
}
function Pf(e, t) {
  if ($(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (r) => (o) => !o._stopped && r && r(o)
    );
  } else
    return t;
}
const Ko = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Rf = (e, t, n, r, o, s) => {
  const i = o === "svg";
  t === "class" ? _f(e, r, i) : t === "style" ? Cf(e, n, r) : cn(t) ? $n(t) || Of(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Nf(e, t, r, i)) ? (Vo(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && jo(e, t, r, i, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !Q(r)) ? Vo(e, $e(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), jo(e, t, r, i));
};
function Nf(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Ko(t) && I(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return Ko(t) && Q(n) ? !1 : t in e;
}
const Si = /* @__PURE__ */ new WeakMap(), Ti = /* @__PURE__ */ new WeakMap(), kn = Symbol("_moveCb"), Uo = Symbol("_enterCb"), Ff = (e) => (delete e.props.mode, e), Df = /* @__PURE__ */ Ff({
  name: "TransitionGroup",
  props: /* @__PURE__ */ ee({}, wi, {
    tag: String,
    moveClass: String
  }),
  setup(e, { slots: t }) {
    const n = Qr(), r = Ns();
    let o, s;
    return Bs(() => {
      if (!o.length)
        return;
      const i = e.moveClass || `${e.name || "v"}-move`;
      if (!Hf(
        o[0].el,
        n.vnode.el,
        i
      ))
        return;
      o.forEach(Lf), o.forEach(jf);
      const l = o.filter(Vf);
      Pr(), l.forEach((f) => {
        const p = f.el, u = p.style;
        je(p, i), u.transform = u.webkitTransform = u.transitionDuration = "";
        const a = p[kn] = (g) => {
          g && g.target !== p || (!g || /transform$/.test(g.propertyName)) && (p.removeEventListener("transitionend", a), p[kn] = null, ot(p, i));
        };
        p.addEventListener("transitionend", a);
      });
    }), () => {
      const i = D(e), l = xi(i);
      let f = i.tag || be;
      if (o = [], s)
        for (let p = 0; p < s.length; p++) {
          const u = s[p];
          u.el && u.el instanceof Element && (o.push(u), St(
            u,
            rn(
              u,
              l,
              r,
              n
            )
          ), Si.set(
            u,
            u.el.getBoundingClientRect()
          ));
        }
      s = t.default ? Jr(t.default()) : [];
      for (let p = 0; p < s.length; p++) {
        const u = s[p];
        u.key != null ? St(
          u,
          rn(u, l, r, n)
        ) : u.type !== Ht && Me("<TransitionGroup> children must be keyed.");
      }
      return _e(f, null, s);
    };
  }
}), fa = Df;
function Lf(e) {
  const t = e.el;
  t[kn] && t[kn](), t[Uo] && t[Uo]();
}
function jf(e) {
  Ti.set(e, e.el.getBoundingClientRect());
}
function Vf(e) {
  const t = Si.get(e), n = Ti.get(e), r = t.left - n.left, o = t.top - n.top;
  if (r || o) {
    const s = e.el.style;
    return s.transform = s.webkitTransform = `translate(${r}px,${o}px)`, s.transitionDuration = "0s", e;
  }
}
function Hf(e, t, n) {
  const r = e.cloneNode(), o = e[Dt];
  o && o.forEach((l) => {
    l.split(/\s+/).forEach((f) => f && r.classList.remove(f));
  }), n.split(/\s+/).forEach((l) => l && r.classList.add(l)), r.style.display = "none";
  const s = t.nodeType === 1 ? t : t.parentNode;
  s.appendChild(r);
  const { hasTransform: i } = Ci(r);
  return s.removeChild(r), i;
}
const Lt = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return $(t) ? (n) => Mt(t, n) : t;
};
function kf(e) {
  e.target.composing = !0;
}
function Wo(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Ye = Symbol("_assign"), aa = {
  created(e, { modifiers: { lazy: t, trim: n, number: r } }, o) {
    e[Ye] = Lt(o);
    const s = r || o.props && o.props.type === "number";
    at(e, t ? "change" : "input", (i) => {
      if (i.target.composing) return;
      let l = e.value;
      n && (l = l.trim()), s && (l = Mn(l)), e[Ye](l);
    }), n && at(e, "change", () => {
      e.value = e.value.trim();
    }), t || (at(e, "compositionstart", kf), at(e, "compositionend", Wo), at(e, "change", Wo));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: o, number: s } }, i) {
    if (e[Ye] = Lt(i), e.composing) return;
    const l = (s || e.type === "number") && !/^0\d/.test(e.value) ? Mn(e.value) : e.value, f = t ?? "";
    l !== f && (document.activeElement === e && e.type !== "range" && (r && t === n || o && e.value.trim() === f) || (e.value = f));
  }
}, ua = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, n) {
    e[Ye] = Lt(n), at(e, "change", () => {
      const r = e._modelValue, o = ln(e), s = e.checked, i = e[Ye];
      if ($(r)) {
        const l = Vr(r, o), f = l !== -1;
        if (s && !f)
          i(r.concat(o));
        else if (!s && f) {
          const p = [...r];
          p.splice(l, 1), i(p);
        }
      } else if (jt(r)) {
        const l = new Set(r);
        s ? l.add(o) : l.delete(o), i(l);
      } else
        i(Ei(e, s));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: Go,
  beforeUpdate(e, t, n) {
    e[Ye] = Lt(n), Go(e, t, n);
  }
};
function Go(e, { value: t, oldValue: n }, r) {
  e._modelValue = t;
  let o;
  if ($(t))
    o = Vr(t, r.props.value) > -1;
  else if (jt(t))
    o = t.has(r.props.value);
  else {
    if (t === n) return;
    o = un(t, Ei(e, !0));
  }
  e.checked !== o && (e.checked = o);
}
const da = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, r) {
    const o = jt(t);
    at(e, "change", () => {
      const s = Array.prototype.filter.call(e.options, (i) => i.selected).map(
        (i) => n ? Mn(ln(i)) : ln(i)
      );
      e[Ye](
        e.multiple ? o ? new Set(s) : s : s[0]
      ), e._assigning = !0, xs(() => {
        e._assigning = !1;
      });
    }), e[Ye] = Lt(r);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    qo(e, t);
  },
  beforeUpdate(e, t, n) {
    e[Ye] = Lt(n);
  },
  updated(e, { value: t }) {
    e._assigning || qo(e, t);
  }
};
function qo(e, t) {
  const n = e.multiple, r = $(t);
  if (n && !r && !jt(t)) {
    Me(
      `<select multiple v-model> expects an Array or Set value for its binding, but got ${Object.prototype.toString.call(t).slice(8, -1)}.`
    );
    return;
  }
  for (let o = 0, s = e.options.length; o < s; o++) {
    const i = e.options[o], l = ln(i);
    if (n)
      if (r) {
        const f = typeof l;
        f === "string" || f === "number" ? i.selected = t.some((p) => String(p) === String(l)) : i.selected = Vr(t, l) > -1;
      } else
        i.selected = t.has(l);
    else if (un(ln(i), t)) {
      e.selectedIndex !== o && (e.selectedIndex = o);
      return;
    }
  }
  !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
}
function ln(e) {
  return "_value" in e ? e._value : e.value;
}
function Ei(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const Bf = ["ctrl", "shift", "alt", "meta"], Kf = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => Bf.some((n) => e[`${n}Key`] && !t.includes(n))
}, pa = (e, t) => {
  const n = e._withMods || (e._withMods = {}), r = t.join(".");
  return n[r] || (n[r] = (o, ...s) => {
    for (let i = 0; i < t.length; i++) {
      const l = Kf[t[i]];
      if (l && l(o, t)) return;
    }
    return e(o, ...s);
  });
}, Uf = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, ha = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), r = t.join(".");
  return n[r] || (n[r] = (o) => {
    if (!("key" in o))
      return;
    const s = ze(o.key);
    if (t.some(
      (i) => i === s || Uf[i] === s
    ))
      return e(o);
  });
}, Wf = /* @__PURE__ */ ee({ patchProp: Rf }, gf);
let Jo;
function Gf() {
  return Jo || (Jo = Ic(Wf));
}
const ga = (...e) => {
  const t = Gf().createApp(...e);
  Jf(t), Yf(t);
  const { mount: n } = t;
  return t.mount = (r) => {
    const o = zf(r);
    if (!o) return;
    const s = t._component;
    !I(s) && !s.render && !s.template && (s.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const i = n(o, !1, qf(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i;
  }, t;
};
function qf(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Jf(e) {
  Object.defineProperty(e.config, "isNativeTag", {
    value: (t) => Bi(t) || Ki(t) || Ui(t),
    writable: !1
  });
}
function Yf(e) {
  {
    const t = e.config.isCustomElement;
    Object.defineProperty(e.config, "isCustomElement", {
      get() {
        return t;
      },
      set() {
        Me(
          "The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead."
        );
      }
    });
    const n = e.config.compilerOptions, r = 'The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.\n- For vue-loader: pass it via vue-loader\'s `compilerOptions` loader option.\n- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc';
    Object.defineProperty(e.config, "compilerOptions", {
      get() {
        return Me(r), n;
      },
      set() {
        Me(r);
      }
    });
  }
}
function zf(e) {
  if (Q(e)) {
    const t = document.querySelector(e);
    return t || Me(
      `Failed to mount app: mount target selector "${e}" returned null.`
    ), t;
  }
  return window.ShadowRoot && e instanceof window.ShadowRoot && e.mode === "closed" && Me(
    'mounting on a ShadowRoot with `{mode: "closed"}` may lead to unpredictable bugs'
  ), e;
}
function Xf() {
  df();
}
Xf();
export {
  ql as BaseTransition,
  Fs as BaseTransitionPropsValidators,
  re as Comment,
  es as EffectScope,
  be as Fragment,
  ts as ReactiveEffect,
  Tn as Static,
  Ht as Text,
  ca as Transition,
  fa as TransitionGroup,
  $l as assertNumber,
  Pe as callWithAsyncErrorHandling,
  Vt as callWithErrorHandling,
  $e as camelize,
  Kn as capitalize,
  We as cloneVNode,
  af as computed,
  ga as createApp,
  $r as createBlock,
  la as createCommentVNode,
  ia as createElementBlock,
  pi as createElementVNode,
  Ic as createRenderer,
  Yc as createTextVNode,
  _e as createVNode,
  ra as defineComponent,
  Qf as effectScope,
  Qr as getCurrentInstance,
  zi as getCurrentScope,
  Jr as getTransitionRawChildren,
  Jc as guardReactiveProps,
  uf as h,
  dn as handleError,
  df as initCustomFormatter,
  Sn as inject,
  In as isProxy,
  vt as isReactive,
  Xe as isReadonly,
  oe as isRef,
  rf as isRuntimeOnly,
  ve as isShallow,
  Tt as isVNode,
  ml as markRaw,
  zc as mergeProps,
  xs as nextTick,
  jr as normalizeClass,
  Lr as normalizeStyle,
  Yl as onActivated,
  Zl as onBeforeMount,
  Ks as onBeforeUnmount,
  Ql as onBeforeUpdate,
  zl as onDeactivated,
  rc as onErrorCaptured,
  ks as onMounted,
  nc as onRenderTracked,
  tc as onRenderTriggered,
  ec as onServerPrefetch,
  Us as onUnmounted,
  Bs as onUpdated,
  xl as onWatcherCleanup,
  Or as openBlock,
  mc as provide,
  _s as proxyRefs,
  Ss as queuePostFlushCb,
  Ur as reactive,
  ys as readonly,
  ea as ref,
  oa as renderList,
  sa as renderSlot,
  rn as resolveTransitionHooks,
  Co as setBlockTracking,
  St as setTransitionHooks,
  gl as shallowReactive,
  Be as shallowReadonly,
  ta as shallowRef,
  Fc as ssrContextKey,
  Ji as toDisplayString,
  gt as toHandlerKey,
  D as toRaw,
  bl as unref,
  Dc as useSSRContext,
  Ns as useTransitionState,
  ua as vModelCheckbox,
  da as vModelSelect,
  aa as vModelText,
  Eo as version,
  Me as warn,
  ar as watch,
  Ul as withCtx,
  na as withDirectives,
  ha as withKeys,
  pa as withModifiers
};
