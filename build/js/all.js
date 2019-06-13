/*! Joe's-test-package 2019-06-12 */

function checkuser(t) {
    return 4 < t.role
}! function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], e) : e((t = t || self).bootstrap = {}, t.jQuery, t.Popper)
}(this, function (t, g, u) {
    "use strict";

    function i(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }

    function s(t, e, n) {
        return e && i(t.prototype, e), n && i(t, n), t
    }

    function r(o) {
        for (var t = 1; t < arguments.length; t++) {
            var s = null != arguments[t] ? arguments[t] : {},
                e = Object.keys(s);
            "function" == typeof Object.getOwnPropertySymbols && (e = e.concat(Object.getOwnPropertySymbols(s).filter(function (t) {
                return Object.getOwnPropertyDescriptor(s, t).enumerable
            }))), e.forEach(function (t) {
                var e, n, i;
                e = o, i = s[n = t], n in e ? Object.defineProperty(e, n, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[n] = i
            })
        }
        return o
    }
    g = g && g.hasOwnProperty("default") ? g.default : g, u = u && u.hasOwnProperty("default") ? u.default : u;
    var e = "transitionend";
    var _ = {
        TRANSITION_END: "bsTransitionEnd",
        getUID: function (t) {
            for (; t += ~~(1e6 * Math.random()), document.getElementById(t););
            return t
        },
        getSelectorFromElement: function (t) {
            var e = t.getAttribute("data-target");
            if (!e || "#" === e) {
                var n = t.getAttribute("href");
                e = n && "#" !== n ? n.trim() : ""
            }
            try {
                return document.querySelector(e) ? e : null
            } catch (t) {
                return null
            }
        },
        getTransitionDurationFromElement: function (t) {
            if (!t) return 0;
            var e = g(t).css("transition-duration"),
                n = g(t).css("transition-delay"),
                i = parseFloat(e),
                o = parseFloat(n);
            return i || o ? (e = e.split(",")[0], n = n.split(",")[0], 1e3 * (parseFloat(e) + parseFloat(n))) : 0
        },
        reflow: function (t) {
            return t.offsetHeight
        },
        triggerTransitionEnd: function (t) {
            g(t).trigger(e)
        },
        supportsTransitionEnd: function () {
            return Boolean(e)
        },
        isElement: function (t) {
            return (t[0] || t).nodeType
        },
        typeCheckConfig: function (t, e, n) {
            for (var i in n)
                if (Object.prototype.hasOwnProperty.call(n, i)) {
                    var o = n[i],
                        s = e[i],
                        r = s && _.isElement(s) ? "element" : (a = s, {}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase());
                    if (!new RegExp(o).test(r)) throw new Error(t.toUpperCase() + ': Option "' + i + '" provided type "' + r + '" but expected type "' + o + '".')
                } var a
        },
        findShadowRoot: function (t) {
            if (!document.documentElement.attachShadow) return null;
            if ("function" != typeof t.getRootNode) return t instanceof ShadowRoot ? t : t.parentNode ? _.findShadowRoot(t.parentNode) : null;
            var e = t.getRootNode();
            return e instanceof ShadowRoot ? e : null
        }
    };
    g.fn.emulateTransitionEnd = function (t) {
        var e = this,
            n = !1;
        return g(this).one(_.TRANSITION_END, function () {
            n = !0
        }), setTimeout(function () {
            n || _.triggerTransitionEnd(e)
        }, t), this
    }, g.event.special[_.TRANSITION_END] = {
        bindType: e,
        delegateType: e,
        handle: function (t) {
            if (g(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
        }
    };
    var n, o = "alert",
        a = "bs.alert",
        l = "." + a,
        c = g.fn[o],
        h = {
            CLOSE: "close" + l,
            CLOSED: "closed" + l,
            CLICK_DATA_API: "click" + l + ".data-api"
        },
        f = ((n = d.prototype).close = function (t) {
            var e = this._element;
            t && (e = this._getRootElement(t)), this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
        }, n.dispose = function () {
            g.removeData(this._element, a), this._element = null
        }, n._getRootElement = function (t) {
            var e = _.getSelectorFromElement(t),
                n = !1;
            return e && (n = document.querySelector(e)), n = n || g(t).closest(".alert")[0]
        }, n._triggerCloseEvent = function (t) {
            var e = g.Event(h.CLOSE);
            return g(t).trigger(e), e
        }, n._removeElement = function (e) {
            var n = this;
            if (g(e).removeClass("show"), g(e).hasClass("fade")) {
                var t = _.getTransitionDurationFromElement(e);
                g(e).one(_.TRANSITION_END, function (t) {
                    return n._destroyElement(e, t)
                }).emulateTransitionEnd(t)
            } else this._destroyElement(e)
        }, n._destroyElement = function (t) {
            g(t).detach().trigger(h.CLOSED).remove()
        }, d._jQueryInterface = function (n) {
            return this.each(function () {
                var t = g(this),
                    e = t.data(a);
                e || (e = new d(this), t.data(a, e)), "close" === n && e[n](this)
            })
        }, d._handleDismiss = function (e) {
            return function (t) {
                t && t.preventDefault(), e.close(this)
            }
        }, s(d, null, [{
            key: "VERSION",
            get: function () {
                return "4.3.1"
            }
        }]), d);

    function d(t) {
        this._element = t
    }
    g(document).on(h.CLICK_DATA_API, '[data-dismiss="alert"]', f._handleDismiss(new f)), g.fn[o] = f._jQueryInterface, g.fn[o].Constructor = f, g.fn[o].noConflict = function () {
        return g.fn[o] = c, f._jQueryInterface
    };
    var m, p = "button",
        v = "bs.button",
        E = "." + v,
        y = ".data-api",
        C = g.fn[p],
        T = "active",
        S = '[data-toggle^="button"]',
        b = ".btn",
        I = {
            CLICK_DATA_API: "click" + E + y,
            FOCUS_BLUR_DATA_API: "focus" + E + y + " blur" + E + y
        },
        D = ((m = w.prototype).toggle = function () {
            var t = !0,
                e = !0,
                n = g(this._element).closest('[data-toggle="buttons"]')[0];
            if (n) {
                var i = this._element.querySelector('input:not([type="hidden"])');
                if (i) {
                    if ("radio" === i.type)
                        if (i.checked && this._element.classList.contains(T)) t = !1;
                        else {
                            var o = n.querySelector(".active");
                            o && g(o).removeClass(T)
                        } if (t) {
                        if (i.hasAttribute("disabled") || n.hasAttribute("disabled") || i.classList.contains("disabled") || n.classList.contains("disabled")) return;
                        i.checked = !this._element.classList.contains(T), g(i).trigger("change")
                    }
                    i.focus(), e = !1
                }
            }
            e && this._element.setAttribute("aria-pressed", !this._element.classList.contains(T)), t && g(this._element).toggleClass(T)
        }, m.dispose = function () {
            g.removeData(this._element, v), this._element = null
        }, w._jQueryInterface = function (e) {
            return this.each(function () {
                var t = g(this).data(v);
                t || (t = new w(this), g(this).data(v, t)), "toggle" === e && t[e]()
            })
        }, s(w, null, [{
            key: "VERSION",
            get: function () {
                return "4.3.1"
            }
        }]), w);

    function w(t) {
        this._element = t
    }
    g(document).on(I.CLICK_DATA_API, S, function (t) {
        t.preventDefault();
        var e = t.target;
        g(e).hasClass("btn") || (e = g(e).closest(b)), D._jQueryInterface.call(g(e), "toggle")
    }).on(I.FOCUS_BLUR_DATA_API, S, function (t) {
        var e = g(t.target).closest(b)[0];
        g(e).toggleClass("focus", /^focus(in)?$/.test(t.type))
    }), g.fn[p] = D._jQueryInterface, g.fn[p].Constructor = D, g.fn[p].noConflict = function () {
        return g.fn[p] = C, D._jQueryInterface
    };
    var A, N = "carousel",
        O = "bs.carousel",
        k = "." + O,
        P = ".data-api",
        L = g.fn[N],
        j = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0,
            touch: !0
        },
        H = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean",
            touch: "boolean"
        },
        R = "next",
        x = "prev",
        F = {
            SLIDE: "slide" + k,
            SLID: "slid" + k,
            KEYDOWN: "keydown" + k,
            MOUSEENTER: "mouseenter" + k,
            MOUSELEAVE: "mouseleave" + k,
            TOUCHSTART: "touchstart" + k,
            TOUCHMOVE: "touchmove" + k,
            TOUCHEND: "touchend" + k,
            POINTERDOWN: "pointerdown" + k,
            POINTERUP: "pointerup" + k,
            DRAG_START: "dragstart" + k,
            LOAD_DATA_API: "load" + k + P,
            CLICK_DATA_API: "click" + k + P
        },
        U = "active",
        W = ".active.carousel-item",
        q = {
            TOUCH: "touch",
            PEN: "pen"
        },
        M = ((A = K.prototype).next = function () {
            this._isSliding || this._slide(R)
        }, A.nextWhenVisible = function () {
            !document.hidden && g(this._element).is(":visible") && "hidden" !== g(this._element).css("visibility") && this.next()
        }, A.prev = function () {
            this._isSliding || this._slide(x)
        }, A.pause = function (t) {
            t || (this._isPaused = !0), this._element.querySelector(".carousel-item-next, .carousel-item-prev") && (_.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
        }, A.cycle = function (t) {
            t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
        }, A.to = function (t) {
            var e = this;
            this._activeElement = this._element.querySelector(W);
            var n = this._getItemIndex(this._activeElement);
            if (!(t > this._items.length - 1 || t < 0))
                if (this._isSliding) g(this._element).one(F.SLID, function () {
                    return e.to(t)
                });
                else {
                    if (n === t) return this.pause(), void this.cycle();
                    var i = n < t ? R : x;
                    this._slide(i, this._items[t])
                }
        }, A.dispose = function () {
            g(this._element).off(k), g.removeData(this._element, O), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
        }, A._getConfig = function (t) {
            return t = r({}, j, t), _.typeCheckConfig(N, t, H), t
        }, A._handleSwipe = function () {
            var t = Math.abs(this.touchDeltaX);
            if (!(t <= 40)) {
                var e = t / this.touchDeltaX;
                0 < e && this.prev(), e < 0 && this.next()
            }
        }, A._addEventListeners = function () {
            var e = this;
            this._config.keyboard && g(this._element).on(F.KEYDOWN, function (t) {
                return e._keydown(t)
            }), "hover" === this._config.pause && g(this._element).on(F.MOUSEENTER, function (t) {
                return e.pause(t)
            }).on(F.MOUSELEAVE, function (t) {
                return e.cycle(t)
            }), this._config.touch && this._addTouchEventListeners()
        }, A._addTouchEventListeners = function () {
            var n = this;
            if (this._touchSupported) {
                var e = function (t) {
                        n._pointerEvent && q[t.originalEvent.pointerType.toUpperCase()] ? n.touchStartX = t.originalEvent.clientX : n._pointerEvent || (n.touchStartX = t.originalEvent.touches[0].clientX)
                    },
                    i = function (t) {
                        n._pointerEvent && q[t.originalEvent.pointerType.toUpperCase()] && (n.touchDeltaX = t.originalEvent.clientX - n.touchStartX), n._handleSwipe(), "hover" === n._config.pause && (n.pause(), n.touchTimeout && clearTimeout(n.touchTimeout), n.touchTimeout = setTimeout(function (t) {
                            return n.cycle(t)
                        }, 500 + n._config.interval))
                    };
                g(this._element.querySelectorAll(".carousel-item img")).on(F.DRAG_START, function (t) {
                    return t.preventDefault()
                }), this._pointerEvent ? (g(this._element).on(F.POINTERDOWN, function (t) {
                    return e(t)
                }), g(this._element).on(F.POINTERUP, function (t) {
                    return i(t)
                }), this._element.classList.add("pointer-event")) : (g(this._element).on(F.TOUCHSTART, function (t) {
                    return e(t)
                }), g(this._element).on(F.TOUCHMOVE, function (t) {
                    var e;
                    (e = t).originalEvent.touches && 1 < e.originalEvent.touches.length ? n.touchDeltaX = 0 : n.touchDeltaX = e.originalEvent.touches[0].clientX - n.touchStartX
                }), g(this._element).on(F.TOUCHEND, function (t) {
                    return i(t)
                }))
            }
        }, A._keydown = function (t) {
            if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
                case 37:
                    t.preventDefault(), this.prev();
                    break;
                case 39:
                    t.preventDefault(), this.next()
            }
        }, A._getItemIndex = function (t) {
            return this._items = t && t.parentNode ? [].slice.call(t.parentNode.querySelectorAll(".carousel-item")) : [], this._items.indexOf(t)
        }, A._getItemByDirection = function (t, e) {
            var n = t === R,
                i = t === x,
                o = this._getItemIndex(e),
                s = this._items.length - 1;
            if ((i && 0 === o || n && o === s) && !this._config.wrap) return e;
            var r = (o + (t === x ? -1 : 1)) % this._items.length;
            return -1 == r ? this._items[this._items.length - 1] : this._items[r]
        }, A._triggerSlideEvent = function (t, e) {
            var n = this._getItemIndex(t),
                i = this._getItemIndex(this._element.querySelector(W)),
                o = g.Event(F.SLIDE, {
                    relatedTarget: t,
                    direction: e,
                    from: i,
                    to: n
                });
            return g(this._element).trigger(o), o
        }, A._setActiveIndicatorElement = function (t) {
            if (this._indicatorsElement) {
                var e = [].slice.call(this._indicatorsElement.querySelectorAll(".active"));
                g(e).removeClass(U);
                var n = this._indicatorsElement.children[this._getItemIndex(t)];
                n && g(n).addClass(U)
            }
        }, A._slide = function (t, e) {
            var n, i, o, s = this,
                r = this._element.querySelector(W),
                a = this._getItemIndex(r),
                l = e || r && this._getItemByDirection(t, r),
                c = this._getItemIndex(l),
                h = Boolean(this._interval);
            if (o = t === R ? (n = "carousel-item-left", i = "carousel-item-next", "left") : (n = "carousel-item-right", i = "carousel-item-prev", "right"), l && g(l).hasClass(U)) this._isSliding = !1;
            else if (!this._triggerSlideEvent(l, o).isDefaultPrevented() && r && l) {
                this._isSliding = !0, h && this.pause(), this._setActiveIndicatorElement(l);
                var u = g.Event(F.SLID, {
                    relatedTarget: l,
                    direction: o,
                    from: a,
                    to: c
                });
                if (g(this._element).hasClass("slide")) {
                    g(l).addClass(i), _.reflow(l), g(r).addClass(n), g(l).addClass(n);
                    var f = parseInt(l.getAttribute("data-interval"), 10);
                    this._config.interval = f ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, f) : this._config.defaultInterval || this._config.interval;
                    var d = _.getTransitionDurationFromElement(r);
                    g(r).one(_.TRANSITION_END, function () {
                        g(l).removeClass(n + " " + i).addClass(U), g(r).removeClass(U + " " + i + " " + n), s._isSliding = !1, setTimeout(function () {
                            return g(s._element).trigger(u)
                        }, 0)
                    }).emulateTransitionEnd(d)
                } else g(r).removeClass(U), g(l).addClass(U), this._isSliding = !1, g(this._element).trigger(u);
                h && this.cycle()
            }
        }, K._jQueryInterface = function (i) {
            return this.each(function () {
                var t = g(this).data(O),
                    e = r({}, j, g(this).data());
                "object" == typeof i && (e = r({}, e, i));
                var n = "string" == typeof i ? i : e.slide;
                if (t || (t = new K(this, e), g(this).data(O, t)), "number" == typeof i) t.to(i);
                else if ("string" == typeof n) {
                    if (void 0 === t[n]) throw new TypeError('No method named "' + n + '"');
                    t[n]()
                } else e.interval && e.ride && (t.pause(), t.cycle())
            })
        }, K._dataApiClickHandler = function (t) {
            var e = _.getSelectorFromElement(this);
            if (e) {
                var n = g(e)[0];
                if (n && g(n).hasClass("carousel")) {
                    var i = r({}, g(n).data(), g(this).data()),
                        o = this.getAttribute("data-slide-to");
                    o && (i.interval = !1), K._jQueryInterface.call(g(n), i), o && g(n).data(O).to(o), t.preventDefault()
                }
            }
        }, s(K, null, [{
            key: "VERSION",
            get: function () {
                return "4.3.1"
            }
        }, {
            key: "Default",
            get: function () {
                return j
            }
        }]), K);

    function K(t, e) {
        this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._element = t, this._indicatorsElement = this._element.querySelector(".carousel-indicators"), this._touchSupported = "ontouchstart" in document.documentElement || 0 < navigator.maxTouchPoints, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners()
    }
    g(document).on(F.CLICK_DATA_API, "[data-slide], [data-slide-to]", M._dataApiClickHandler), g(window).on(F.LOAD_DATA_API, function () {
        for (var t = [].slice.call(document.querySelectorAll('[data-ride="carousel"]')), e = 0, n = t.length; e < n; e++) {
            var i = g(t[e]);
            M._jQueryInterface.call(i, i.data())
        }
    }), g.fn[N] = M._jQueryInterface, g.fn[N].Constructor = M, g.fn[N].noConflict = function () {
        return g.fn[N] = L, M._jQueryInterface
    };
    var Q, B = "collapse",
        V = "bs.collapse",
        Y = "." + V,
        z = g.fn[B],
        X = {
            toggle: !0,
            parent: ""
        },
        J = {
            toggle: "boolean",
            parent: "(string|element)"
        },
        $ = {
            SHOW: "show" + Y,
            SHOWN: "shown" + Y,
            HIDE: "hide" + Y,
            HIDDEN: "hidden" + Y,
            CLICK_DATA_API: "click" + Y + ".data-api"
        },
        G = "show",
        Z = "collapse",
        tt = "collapsing",
        et = "collapsed",
        nt = '[data-toggle="collapse"]',
        it = ((Q = ot.prototype).toggle = function () {
            g(this._element).hasClass(G) ? this.hide() : this.show()
        }, Q.show = function () {
            var t, e, n = this;
            if (!(this._isTransitioning || g(this._element).hasClass(G) || (this._parent && 0 === (t = [].slice.call(this._parent.querySelectorAll(".show, .collapsing")).filter(function (t) {
                    return "string" == typeof n._config.parent ? t.getAttribute("data-parent") === n._config.parent : t.classList.contains(Z)
                })).length && (t = null), t && (e = g(t).not(this._selector).data(V)) && e._isTransitioning))) {
                var i = g.Event($.SHOW);
                if (g(this._element).trigger(i), !i.isDefaultPrevented()) {
                    t && (ot._jQueryInterface.call(g(t).not(this._selector), "hide"), e || g(t).data(V, null));
                    var o = this._getDimension();
                    g(this._element).removeClass(Z).addClass(tt), this._element.style[o] = 0, this._triggerArray.length && g(this._triggerArray).removeClass(et).attr("aria-expanded", !0), this.setTransitioning(!0);
                    var s = "scroll" + (o[0].toUpperCase() + o.slice(1)),
                        r = _.getTransitionDurationFromElement(this._element);
                    g(this._element).one(_.TRANSITION_END, function () {
                        g(n._element).removeClass(tt).addClass(Z).addClass(G), n._element.style[o] = "", n.setTransitioning(!1), g(n._element).trigger($.SHOWN)
                    }).emulateTransitionEnd(r), this._element.style[o] = this._element[s] + "px"
                }
            }
        }, Q.hide = function () {
            var t = this;
            if (!this._isTransitioning && g(this._element).hasClass(G)) {
                var e = g.Event($.HIDE);
                if (g(this._element).trigger(e), !e.isDefaultPrevented()) {
                    var n = this._getDimension();
                    this._element.style[n] = this._element.getBoundingClientRect()[n] + "px", _.reflow(this._element), g(this._element).addClass(tt).removeClass(Z).removeClass(G);
                    var i = this._triggerArray.length;
                    if (0 < i)
                        for (var o = 0; o < i; o++) {
                            var s = this._triggerArray[o],
                                r = _.getSelectorFromElement(s);
                            null !== r && (g([].slice.call(document.querySelectorAll(r))).hasClass(G) || g(s).addClass(et).attr("aria-expanded", !1))
                        }
                    this.setTransitioning(!0), this._element.style[n] = "";
                    var a = _.getTransitionDurationFromElement(this._element);
                    g(this._element).one(_.TRANSITION_END, function () {
                        t.setTransitioning(!1), g(t._element).removeClass(tt).addClass(Z).trigger($.HIDDEN)
                    }).emulateTransitionEnd(a)
                }
            }
        }, Q.setTransitioning = function (t) {
            this._isTransitioning = t
        }, Q.dispose = function () {
            g.removeData(this._element, V), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
        }, Q._getConfig = function (t) {
            return (t = r({}, X, t)).toggle = Boolean(t.toggle), _.typeCheckConfig(B, t, J), t
        }, Q._getDimension = function () {
            return g(this._element).hasClass("width") ? "width" : "height"
        }, Q._getParent = function () {
            var t, n = this;
            _.isElement(this._config.parent) ? (t = this._config.parent, void 0 !== this._config.parent.jquery && (t = this._config.parent[0])) : t = document.querySelector(this._config.parent);
            var e = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
                i = [].slice.call(t.querySelectorAll(e));
            return g(i).each(function (t, e) {
                n._addAriaAndCollapsedClass(ot._getTargetFromElement(e), [e])
            }), t
        }, Q._addAriaAndCollapsedClass = function (t, e) {
            var n = g(t).hasClass(G);
            e.length && g(e).toggleClass(et, !n).attr("aria-expanded", n)
        }, ot._getTargetFromElement = function (t) {
            var e = _.getSelectorFromElement(t);
            return e ? document.querySelector(e) : null
        }, ot._jQueryInterface = function (i) {
            return this.each(function () {
                var t = g(this),
                    e = t.data(V),
                    n = r({}, X, t.data(), "object" == typeof i && i ? i : {});
                if (!e && n.toggle && /show|hide/.test(i) && (n.toggle = !1), e || (e = new ot(this, n), t.data(V, e)), "string" == typeof i) {
                    if (void 0 === e[i]) throw new TypeError('No method named "' + i + '"');
                    e[i]()
                }
            })
        }, s(ot, null, [{
            key: "VERSION",
            get: function () {
                return "4.3.1"
            }
        }, {
            key: "Default",
            get: function () {
                return X
            }
        }]), ot);

    function ot(e, t) {
        this._isTransitioning = !1, this._element = e, this._config = this._getConfig(t), this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));
        for (var n = [].slice.call(document.querySelectorAll(nt)), i = 0, o = n.length; i < o; i++) {
            var s = n[i],
                r = _.getSelectorFromElement(s),
                a = [].slice.call(document.querySelectorAll(r)).filter(function (t) {
                    return t === e
                });
            null !== r && 0 < a.length && (this._selector = r, this._triggerArray.push(s))
        }
        this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
    }
    g(document).on($.CLICK_DATA_API, nt, function (t) {
        "A" === t.currentTarget.tagName && t.preventDefault();
        var n = g(this),
            e = _.getSelectorFromElement(this),
            i = [].slice.call(document.querySelectorAll(e));
        g(i).each(function () {
            var t = g(this),
                e = t.data(V) ? "toggle" : n.data();
            it._jQueryInterface.call(t, e)
        })
    }), g.fn[B] = it._jQueryInterface, g.fn[B].Constructor = it, g.fn[B].noConflict = function () {
        return g.fn[B] = z, it._jQueryInterface
    };
    var st, rt = "dropdown",
        at = "bs.dropdown",
        lt = "." + at,
        ct = ".data-api",
        ht = g.fn[rt],
        ut = new RegExp("38|40|27"),
        ft = {
            HIDE: "hide" + lt,
            HIDDEN: "hidden" + lt,
            SHOW: "show" + lt,
            SHOWN: "shown" + lt,
            CLICK: "click" + lt,
            CLICK_DATA_API: "click" + lt + ct,
            KEYDOWN_DATA_API: "keydown" + lt + ct,
            KEYUP_DATA_API: "keyup" + lt + ct
        },
        dt = "disabled",
        gt = "show",
        _t = "dropdown-menu-right",
        mt = '[data-toggle="dropdown"]',
        pt = ".dropdown-menu",
        vt = {
            offset: 0,
            flip: !0,
            boundary: "scrollParent",
            reference: "toggle",
            display: "dynamic"
        },
        Et = {
            offset: "(number|string|function)",
            flip: "boolean",
            boundary: "(string|element)",
            reference: "(string|element)",
            display: "string"
        },
        yt = ((st = Ct.prototype).toggle = function () {
            if (!this._element.disabled && !g(this._element).hasClass(dt)) {
                var t = Ct._getParentFromElement(this._element),
                    e = g(this._menu).hasClass(gt);
                if (Ct._clearMenus(), !e) {
                    var n = {
                            relatedTarget: this._element
                        },
                        i = g.Event(ft.SHOW, n);
                    if (g(t).trigger(i), !i.isDefaultPrevented()) {
                        if (!this._inNavbar) {
                            if (void 0 === u) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");
                            var o = this._element;
                            "parent" === this._config.reference ? o = t : _.isElement(this._config.reference) && (o = this._config.reference, void 0 !== this._config.reference.jquery && (o = this._config.reference[0])), "scrollParent" !== this._config.boundary && g(t).addClass("position-static"), this._popper = new u(o, this._menu, this._getPopperConfig())
                        }
                        "ontouchstart" in document.documentElement && 0 === g(t).closest(".navbar-nav").length && g(document.body).children().on("mouseover", null, g.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), g(this._menu).toggleClass(gt), g(t).toggleClass(gt).trigger(g.Event(ft.SHOWN, n))
                    }
                }
            }
        }, st.show = function () {
            if (!(this._element.disabled || g(this._element).hasClass(dt) || g(this._menu).hasClass(gt))) {
                var t = {
                        relatedTarget: this._element
                    },
                    e = g.Event(ft.SHOW, t),
                    n = Ct._getParentFromElement(this._element);
                g(n).trigger(e), e.isDefaultPrevented() || (g(this._menu).toggleClass(gt), g(n).toggleClass(gt).trigger(g.Event(ft.SHOWN, t)))
            }
        }, st.hide = function () {
            if (!this._element.disabled && !g(this._element).hasClass(dt) && g(this._menu).hasClass(gt)) {
                var t = {
                        relatedTarget: this._element
                    },
                    e = g.Event(ft.HIDE, t),
                    n = Ct._getParentFromElement(this._element);
                g(n).trigger(e), e.isDefaultPrevented() || (g(this._menu).toggleClass(gt), g(n).toggleClass(gt).trigger(g.Event(ft.HIDDEN, t)))
            }
        }, st.dispose = function () {
            g.removeData(this._element, at), g(this._element).off(lt), this._element = null, (this._menu = null) !== this._popper && (this._popper.destroy(), this._popper = null)
        }, st.update = function () {
            this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
        }, st._addEventListeners = function () {
            var e = this;
            g(this._element).on(ft.CLICK, function (t) {
                t.preventDefault(), t.stopPropagation(), e.toggle()
            })
        }, st._getConfig = function (t) {
            return t = r({}, this.constructor.Default, g(this._element).data(), t), _.typeCheckConfig(rt, t, this.constructor.DefaultType), t
        }, st._getMenuElement = function () {
            if (!this._menu) {
                var t = Ct._getParentFromElement(this._element);
                t && (this._menu = t.querySelector(pt))
            }
            return this._menu
        }, st._getPlacement = function () {
            var t = g(this._element.parentNode),
                e = "bottom-start";
            return t.hasClass("dropup") ? (e = "top-start", g(this._menu).hasClass(_t) && (e = "top-end")) : t.hasClass("dropright") ? e = "right-start" : t.hasClass("dropleft") ? e = "left-start" : g(this._menu).hasClass(_t) && (e = "bottom-end"), e
        }, st._detectNavbar = function () {
            return 0 < g(this._element).closest(".navbar").length
        }, st._getOffset = function () {
            var e = this,
                t = {};
            return "function" == typeof this._config.offset ? t.fn = function (t) {
                return t.offsets = r({}, t.offsets, e._config.offset(t.offsets, e._element) || {}), t
            } : t.offset = this._config.offset, t
        }, st._getPopperConfig = function () {
            var t = {
                placement: this._getPlacement(),
                modifiers: {
                    offset: this._getOffset(),
                    flip: {
                        enabled: this._config.flip
                    },
                    preventOverflow: {
                        boundariesElement: this._config.boundary
                    }
                }
            };
            return "static" === this._config.display && (t.modifiers.applyStyle = {
                enabled: !1
            }), t
        }, Ct._jQueryInterface = function (e) {
            return this.each(function () {
                var t = g(this).data(at);
                if (t || (t = new Ct(this, "object" == typeof e ? e : null), g(this).data(at, t)), "string" == typeof e) {
                    if (void 0 === t[e]) throw new TypeError('No method named "' + e + '"');
                    t[e]()
                }
            })
        }, Ct._clearMenus = function (t) {
            if (!t || 3 !== t.which && ("keyup" !== t.type || 9 === t.which))
                for (var e = [].slice.call(document.querySelectorAll(mt)), n = 0, i = e.length; n < i; n++) {
                    var o = Ct._getParentFromElement(e[n]),
                        s = g(e[n]).data(at),
                        r = {
                            relatedTarget: e[n]
                        };
                    if (t && "click" === t.type && (r.clickEvent = t), s) {
                        var a = s._menu;
                        if (g(o).hasClass(gt) && !(t && ("click" === t.type && /input|textarea/i.test(t.target.tagName) || "keyup" === t.type && 9 === t.which) && g.contains(o, t.target))) {
                            var l = g.Event(ft.HIDE, r);
                            g(o).trigger(l), l.isDefaultPrevented() || ("ontouchstart" in document.documentElement && g(document.body).children().off("mouseover", null, g.noop), e[n].setAttribute("aria-expanded", "false"), g(a).removeClass(gt), g(o).removeClass(gt).trigger(g.Event(ft.HIDDEN, r)))
                        }
                    }
                }
        }, Ct._getParentFromElement = function (t) {
            var e, n = _.getSelectorFromElement(t);
            return n && (e = document.querySelector(n)), e || t.parentNode
        }, Ct._dataApiKeydownHandler = function (t) {
            if ((/input|textarea/i.test(t.target.tagName) ? !(32 === t.which || 27 !== t.which && (40 !== t.which && 38 !== t.which || g(t.target).closest(pt).length)) : ut.test(t.which)) && (t.preventDefault(), t.stopPropagation(), !this.disabled && !g(this).hasClass(dt))) {
                var e = Ct._getParentFromElement(this),
                    n = g(e).hasClass(gt);
                if (n && (!n || 27 !== t.which && 32 !== t.which)) {
                    var i = [].slice.call(e.querySelectorAll(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"));
                    if (0 !== i.length) {
                        var o = i.indexOf(t.target);
                        38 === t.which && 0 < o && o--, 40 === t.which && o < i.length - 1 && o++, o < 0 && (o = 0), i[o].focus()
                    }
                } else {
                    if (27 === t.which) {
                        var s = e.querySelector(mt);
                        g(s).trigger("focus")
                    }
                    g(this).trigger("click")
                }
            }
        }, s(Ct, null, [{
            key: "VERSION",
            get: function () {
                return "4.3.1"
            }
        }, {
            key: "Default",
            get: function () {
                return vt
            }
        }, {
            key: "DefaultType",
            get: function () {
                return Et
            }
        }]), Ct);

    function Ct(t, e) {
        this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
    }
    g(document).on(ft.KEYDOWN_DATA_API, mt, yt._dataApiKeydownHandler).on(ft.KEYDOWN_DATA_API, pt, yt._dataApiKeydownHandler).on(ft.CLICK_DATA_API + " " + ft.KEYUP_DATA_API, yt._clearMenus).on(ft.CLICK_DATA_API, mt, function (t) {
        t.preventDefault(), t.stopPropagation(), yt._jQueryInterface.call(g(this), "toggle")
    }).on(ft.CLICK_DATA_API, ".dropdown form", function (t) {
        t.stopPropagation()
    }), g.fn[rt] = yt._jQueryInterface, g.fn[rt].Constructor = yt, g.fn[rt].noConflict = function () {
        return g.fn[rt] = ht, yt._jQueryInterface
    };
    var Tt, St = "modal",
        bt = "bs.modal",
        It = "." + bt,
        Dt = g.fn[St],
        wt = {
            backdrop: !0,
            keyboard: !0,
            focus: !0,
            show: !0
        },
        At = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
            show: "boolean"
        },
        Nt = {
            HIDE: "hide" + It,
            HIDDEN: "hidden" + It,
            SHOW: "show" + It,
            SHOWN: "shown" + It,
            FOCUSIN: "focusin" + It,
            RESIZE: "resize" + It,
            CLICK_DISMISS: "click.dismiss" + It,
            KEYDOWN_DISMISS: "keydown.dismiss" + It,
            MOUSEUP_DISMISS: "mouseup.dismiss" + It,
            MOUSEDOWN_DISMISS: "mousedown.dismiss" + It,
            CLICK_DATA_API: "click" + It + ".data-api"
        },
        Ot = "modal-open",
        kt = "fade",
        Pt = "show",
        Lt = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
        jt = ".sticky-top",
        Ht = ((Tt = Rt.prototype).toggle = function (t) {
            return this._isShown ? this.hide() : this.show(t)
        }, Tt.show = function (t) {
            var e = this;
            if (!this._isShown && !this._isTransitioning) {
                g(this._element).hasClass(kt) && (this._isTransitioning = !0);
                var n = g.Event(Nt.SHOW, {
                    relatedTarget: t
                });
                g(this._element).trigger(n), this._isShown || n.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), g(this._element).on(Nt.CLICK_DISMISS, '[data-dismiss="modal"]', function (t) {
                    return e.hide(t)
                }), g(this._dialog).on(Nt.MOUSEDOWN_DISMISS, function () {
                    g(e._element).one(Nt.MOUSEUP_DISMISS, function (t) {
                        g(t.target).is(e._element) && (e._ignoreBackdropClick = !0)
                    })
                }), this._showBackdrop(function () {
                    return e._showElement(t)
                }))
            }
        }, Tt.hide = function (t) {
            var e = this;
            if (t && t.preventDefault(), this._isShown && !this._isTransitioning) {
                var n = g.Event(Nt.HIDE);
                if (g(this._element).trigger(n), this._isShown && !n.isDefaultPrevented()) {
                    this._isShown = !1;
                    var i = g(this._element).hasClass(kt);
                    if (i && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), g(document).off(Nt.FOCUSIN), g(this._element).removeClass(Pt), g(this._element).off(Nt.CLICK_DISMISS), g(this._dialog).off(Nt.MOUSEDOWN_DISMISS), i) {
                        var o = _.getTransitionDurationFromElement(this._element);
                        g(this._element).one(_.TRANSITION_END, function (t) {
                            return e._hideModal(t)
                        }).emulateTransitionEnd(o)
                    } else this._hideModal()
                }
            }
        }, Tt.dispose = function () {
            [window, this._element, this._dialog].forEach(function (t) {
                return g(t).off(It)
            }), g(document).off(Nt.FOCUSIN), g.removeData(this._element, bt), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null
        }, Tt.handleUpdate = function () {
            this._adjustDialog()
        }, Tt._getConfig = function (t) {
            return t = r({}, wt, t), _.typeCheckConfig(St, t, At), t
        }, Tt._showElement = function (t) {
            var e = this,
                n = g(this._element).hasClass(kt);

            function i() {
                e._config.focus && e._element.focus(), e._isTransitioning = !1, g(e._element).trigger(o)
            }
            this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), g(this._dialog).hasClass("modal-dialog-scrollable") ? this._dialog.querySelector(".modal-body").scrollTop = 0 : this._element.scrollTop = 0, n && _.reflow(this._element), g(this._element).addClass(Pt), this._config.focus && this._enforceFocus();
            var o = g.Event(Nt.SHOWN, {
                relatedTarget: t
            });
            if (n) {
                var s = _.getTransitionDurationFromElement(this._dialog);
                g(this._dialog).one(_.TRANSITION_END, i).emulateTransitionEnd(s)
            } else i()
        }, Tt._enforceFocus = function () {
            var e = this;
            g(document).off(Nt.FOCUSIN).on(Nt.FOCUSIN, function (t) {
                document !== t.target && e._element !== t.target && 0 === g(e._element).has(t.target).length && e._element.focus()
            })
        }, Tt._setEscapeEvent = function () {
            var e = this;
            this._isShown && this._config.keyboard ? g(this._element).on(Nt.KEYDOWN_DISMISS, function (t) {
                27 === t.which && (t.preventDefault(), e.hide())
            }) : this._isShown || g(this._element).off(Nt.KEYDOWN_DISMISS)
        }, Tt._setResizeEvent = function () {
            var e = this;
            this._isShown ? g(window).on(Nt.RESIZE, function (t) {
                return e.handleUpdate(t)
            }) : g(window).off(Nt.RESIZE)
        }, Tt._hideModal = function () {
            var t = this;
            this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._isTransitioning = !1, this._showBackdrop(function () {
                g(document.body).removeClass(Ot), t._resetAdjustments(), t._resetScrollbar(), g(t._element).trigger(Nt.HIDDEN)
            })
        }, Tt._removeBackdrop = function () {
            this._backdrop && (g(this._backdrop).remove(), this._backdrop = null)
        }, Tt._showBackdrop = function (t) {
            var e = this,
                n = g(this._element).hasClass(kt) ? kt : "";
            if (this._isShown && this._config.backdrop) {
                if (this._backdrop = document.createElement("div"), this._backdrop.className = "modal-backdrop", n && this._backdrop.classList.add(n), g(this._backdrop).appendTo(document.body), g(this._element).on(Nt.CLICK_DISMISS, function (t) {
                        e._ignoreBackdropClick ? e._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === e._config.backdrop ? e._element.focus() : e.hide())
                    }), n && _.reflow(this._backdrop), g(this._backdrop).addClass(Pt), !t) return;
                if (!n) return void t();
                var i = _.getTransitionDurationFromElement(this._backdrop);
                g(this._backdrop).one(_.TRANSITION_END, t).emulateTransitionEnd(i)
            } else if (!this._isShown && this._backdrop) {
                g(this._backdrop).removeClass(Pt);
                var o = function () {
                    e._removeBackdrop(), t && t()
                };
                if (g(this._element).hasClass(kt)) {
                    var s = _.getTransitionDurationFromElement(this._backdrop);
                    g(this._backdrop).one(_.TRANSITION_END, o).emulateTransitionEnd(s)
                } else o()
            } else t && t()
        }, Tt._adjustDialog = function () {
            var t = this._element.scrollHeight > document.documentElement.clientHeight;
            !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
        }, Tt._resetAdjustments = function () {
            this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
        }, Tt._checkScrollbar = function () {
            var t = document.body.getBoundingClientRect();
            this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
        }, Tt._setScrollbar = function () {
            var o = this;
            if (this._isBodyOverflowing) {
                var t = [].slice.call(document.querySelectorAll(Lt)),
                    e = [].slice.call(document.querySelectorAll(jt));
                g(t).each(function (t, e) {
                    var n = e.style.paddingRight,
                        i = g(e).css("padding-right");
                    g(e).data("padding-right", n).css("padding-right", parseFloat(i) + o._scrollbarWidth + "px")
                }), g(e).each(function (t, e) {
                    var n = e.style.marginRight,
                        i = g(e).css("margin-right");
                    g(e).data("margin-right", n).css("margin-right", parseFloat(i) - o._scrollbarWidth + "px")
                });
                var n = document.body.style.paddingRight,
                    i = g(document.body).css("padding-right");
                g(document.body).data("padding-right", n).css("padding-right", parseFloat(i) + this._scrollbarWidth + "px")
            }
            g(document.body).addClass(Ot)
        }, Tt._resetScrollbar = function () {
            var t = [].slice.call(document.querySelectorAll(Lt));
            g(t).each(function (t, e) {
                var n = g(e).data("padding-right");
                g(e).removeData("padding-right"), e.style.paddingRight = n || ""
            });
            var e = [].slice.call(document.querySelectorAll(jt));
            g(e).each(function (t, e) {
                var n = g(e).data("margin-right");
                void 0 !== n && g(e).css("margin-right", n).removeData("margin-right")
            });
            var n = g(document.body).data("padding-right");
            g(document.body).removeData("padding-right"), document.body.style.paddingRight = n || ""
        }, Tt._getScrollbarWidth = function () {
            var t = document.createElement("div");
            t.className = "modal-scrollbar-measure", document.body.appendChild(t);
            var e = t.getBoundingClientRect().width - t.clientWidth;
            return document.body.removeChild(t), e
        }, Rt._jQueryInterface = function (n, i) {
            return this.each(function () {
                var t = g(this).data(bt),
                    e = r({}, wt, g(this).data(), "object" == typeof n && n ? n : {});
                if (t || (t = new Rt(this, e), g(this).data(bt, t)), "string" == typeof n) {
                    if (void 0 === t[n]) throw new TypeError('No method named "' + n + '"');
                    t[n](i)
                } else e.show && t.show(i)
            })
        }, s(Rt, null, [{
            key: "VERSION",
            get: function () {
                return "4.3.1"
            }
        }, {
            key: "Default",
            get: function () {
                return wt
            }
        }]), Rt);

    function Rt(t, e) {
        this._config = this._getConfig(e), this._element = t, this._dialog = t.querySelector(".modal-dialog"), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0
    }
    g(document).on(Nt.CLICK_DATA_API, '[data-toggle="modal"]', function (t) {
        var e, n = this,
            i = _.getSelectorFromElement(this);
        i && (e = document.querySelector(i));
        var o = g(e).data(bt) ? "toggle" : r({}, g(e).data(), g(this).data());
        "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault();
        var s = g(e).one(Nt.SHOW, function (t) {
            t.isDefaultPrevented() || s.one(Nt.HIDDEN, function () {
                g(n).is(":visible") && n.focus()
            })
        });
        Ht._jQueryInterface.call(g(e), o, this)
    }), g.fn[St] = Ht._jQueryInterface, g.fn[St].Constructor = Ht, g.fn[St].noConflict = function () {
        return g.fn[St] = Dt, Ht._jQueryInterface
    };
    var xt = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
        Ft = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
        Ut = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

    function Wt(t, r, e) {
        if (0 === t.length) return t;
        if (e && "function" == typeof e) return e(t);
        for (var n = (new window.DOMParser).parseFromString(t, "text/html"), a = Object.keys(r), l = [].slice.call(n.body.querySelectorAll("*")), i = function (t, e) {
                var n = l[t],
                    i = n.nodeName.toLowerCase();
                if (-1 === a.indexOf(n.nodeName.toLowerCase())) return n.parentNode.removeChild(n), "continue";
                var o = [].slice.call(n.attributes),
                    s = [].concat(r["*"] || [], r[i] || []);
                o.forEach(function (t) {
                    ! function (t, e) {
                        var n = t.nodeName.toLowerCase();
                        if (-1 !== e.indexOf(n)) return -1 === xt.indexOf(n) || Boolean(t.nodeValue.match(Ft) || t.nodeValue.match(Ut));
                        for (var i = e.filter(function (t) {
                                return t instanceof RegExp
                            }), o = 0, s = i.length; o < s; o++)
                            if (n.match(i[o])) return !0;
                        return !1
                    }(t, s) && n.removeAttribute(t.nodeName)
                })
            }, o = 0, s = l.length; o < s; o++) i(o);
        return n.body.innerHTML
    }
    var qt, Mt = "tooltip",
        Kt = "bs.tooltip",
        Qt = "." + Kt,
        Bt = g.fn[Mt],
        Vt = "bs-tooltip",
        Yt = new RegExp("(^|\\s)" + Vt + "\\S+", "g"),
        zt = ["sanitize", "whiteList", "sanitizeFn"],
        Xt = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(number|string|function)",
            container: "(string|element|boolean)",
            fallbackPlacement: "(string|array)",
            boundary: "(string|element)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            whiteList: "object"
        },
        Jt = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: "right",
            BOTTOM: "bottom",
            LEFT: "left"
        },
        $t = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: 0,
            container: !1,
            fallbackPlacement: "flip",
            boundary: "scrollParent",
            sanitize: !0,
            sanitizeFn: null,
            whiteList: {
                "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
                a: ["target", "href", "title", "rel"],
                area: [],
                b: [],
                br: [],
                col: [],
                code: [],
                div: [],
                em: [],
                hr: [],
                h1: [],
                h2: [],
                h3: [],
                h4: [],
                h5: [],
                h6: [],
                i: [],
                img: ["src", "alt", "title", "width", "height"],
                li: [],
                ol: [],
                p: [],
                pre: [],
                s: [],
                small: [],
                span: [],
                sub: [],
                sup: [],
                strong: [],
                u: [],
                ul: []
            }
        },
        Gt = "show",
        Zt = {
            HIDE: "hide" + Qt,
            HIDDEN: "hidden" + Qt,
            SHOW: "show" + Qt,
            SHOWN: "shown" + Qt,
            INSERTED: "inserted" + Qt,
            CLICK: "click" + Qt,
            FOCUSIN: "focusin" + Qt,
            FOCUSOUT: "focusout" + Qt,
            MOUSEENTER: "mouseenter" + Qt,
            MOUSELEAVE: "mouseleave" + Qt
        },
        te = "fade",
        ee = "show",
        ne = "hover",
        ie = "focus",
        oe = ((qt = se.prototype).enable = function () {
            this._isEnabled = !0
        }, qt.disable = function () {
            this._isEnabled = !1
        }, qt.toggleEnabled = function () {
            this._isEnabled = !this._isEnabled
        }, qt.toggle = function (t) {
            if (this._isEnabled)
                if (t) {
                    var e = this.constructor.DATA_KEY,
                        n = g(t.currentTarget).data(e);
                    n || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), g(t.currentTarget).data(e, n)), n._activeTrigger.click = !n._activeTrigger.click, n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n)
                } else {
                    if (g(this.getTipElement()).hasClass(ee)) return void this._leave(null, this);
                    this._enter(null, this)
                }
        }, qt.dispose = function () {
            clearTimeout(this._timeout), g.removeData(this.element, this.constructor.DATA_KEY), g(this.element).off(this.constructor.EVENT_KEY), g(this.element).closest(".modal").off("hide.bs.modal"), this.tip && g(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, (this._activeTrigger = null) !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
        }, qt.show = function () {
            var e = this;
            if ("none" === g(this.element).css("display")) throw new Error("Please use show on visible elements");
            var t = g.Event(this.constructor.Event.SHOW);
            if (this.isWithContent() && this._isEnabled) {
                g(this.element).trigger(t);
                var n = _.findShadowRoot(this.element),
                    i = g.contains(null !== n ? n : this.element.ownerDocument.documentElement, this.element);
                if (t.isDefaultPrevented() || !i) return;
                var o = this.getTipElement(),
                    s = _.getUID(this.constructor.NAME);
                o.setAttribute("id", s), this.element.setAttribute("aria-describedby", s), this.setContent(), this.config.animation && g(o).addClass(te);
                var r = "function" == typeof this.config.placement ? this.config.placement.call(this, o, this.element) : this.config.placement,
                    a = this._getAttachment(r);
                this.addAttachmentClass(a);
                var l = this._getContainer();
                g(o).data(this.constructor.DATA_KEY, this), g.contains(this.element.ownerDocument.documentElement, this.tip) || g(o).appendTo(l), g(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new u(this.element, o, {
                    placement: a,
                    modifiers: {
                        offset: this._getOffset(),
                        flip: {
                            behavior: this.config.fallbackPlacement
                        },
                        arrow: {
                            element: ".arrow"
                        },
                        preventOverflow: {
                            boundariesElement: this.config.boundary
                        }
                    },
                    onCreate: function (t) {
                        t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                    },
                    onUpdate: function (t) {
                        return e._handlePopperPlacementChange(t)
                    }
                }), g(o).addClass(ee), "ontouchstart" in document.documentElement && g(document.body).children().on("mouseover", null, g.noop);
                var c = function () {
                    e.config.animation && e._fixTransition();
                    var t = e._hoverState;
                    e._hoverState = null, g(e.element).trigger(e.constructor.Event.SHOWN), "out" === t && e._leave(null, e)
                };
                if (g(this.tip).hasClass(te)) {
                    var h = _.getTransitionDurationFromElement(this.tip);
                    g(this.tip).one(_.TRANSITION_END, c).emulateTransitionEnd(h)
                } else c()
            }
        }, qt.hide = function (t) {
            function e() {
                n._hoverState !== Gt && i.parentNode && i.parentNode.removeChild(i), n._cleanTipClass(), n.element.removeAttribute("aria-describedby"), g(n.element).trigger(n.constructor.Event.HIDDEN), null !== n._popper && n._popper.destroy(), t && t()
            }
            var n = this,
                i = this.getTipElement(),
                o = g.Event(this.constructor.Event.HIDE);
            if (g(this.element).trigger(o), !o.isDefaultPrevented()) {
                if (g(i).removeClass(ee), "ontouchstart" in document.documentElement && g(document.body).children().off("mouseover", null, g.noop), this._activeTrigger.click = !1, this._activeTrigger[ie] = !1, this._activeTrigger[ne] = !1, g(this.tip).hasClass(te)) {
                    var s = _.getTransitionDurationFromElement(i);
                    g(i).one(_.TRANSITION_END, e).emulateTransitionEnd(s)
                } else e();
                this._hoverState = ""
            }
        }, qt.update = function () {
            null !== this._popper && this._popper.scheduleUpdate()
        }, qt.isWithContent = function () {
            return Boolean(this.getTitle())
        }, qt.addAttachmentClass = function (t) {
            g(this.getTipElement()).addClass(Vt + "-" + t)
        }, qt.getTipElement = function () {
            return this.tip = this.tip || g(this.config.template)[0], this.tip
        }, qt.setContent = function () {
            var t = this.getTipElement();
            this.setElementContent(g(t.querySelectorAll(".tooltip-inner")), this.getTitle()), g(t).removeClass(te + " " + ee)
        }, qt.setElementContent = function (t, e) {
            "object" != typeof e || !e.nodeType && !e.jquery ? this.config.html ? (this.config.sanitize && (e = Wt(e, this.config.whiteList, this.config.sanitizeFn)), t.html(e)) : t.text(e) : this.config.html ? g(e).parent().is(t) || t.empty().append(e) : t.text(g(e).text())
        }, qt.getTitle = function () {
            var t = this.element.getAttribute("data-original-title");
            return t = t || ("function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title)
        }, qt._getOffset = function () {
            var e = this,
                t = {};
            return "function" == typeof this.config.offset ? t.fn = function (t) {
                return t.offsets = r({}, t.offsets, e.config.offset(t.offsets, e.element) || {}), t
            } : t.offset = this.config.offset, t
        }, qt._getContainer = function () {
            return !1 === this.config.container ? document.body : _.isElement(this.config.container) ? g(this.config.container) : g(document).find(this.config.container)
        }, qt._getAttachment = function (t) {
            return Jt[t.toUpperCase()]
        }, qt._setListeners = function () {
            var i = this;
            this.config.trigger.split(" ").forEach(function (t) {
                if ("click" === t) g(i.element).on(i.constructor.Event.CLICK, i.config.selector, function (t) {
                    return i.toggle(t)
                });
                else if ("manual" !== t) {
                    var e = t === ne ? i.constructor.Event.MOUSEENTER : i.constructor.Event.FOCUSIN,
                        n = t === ne ? i.constructor.Event.MOUSELEAVE : i.constructor.Event.FOCUSOUT;
                    g(i.element).on(e, i.config.selector, function (t) {
                        return i._enter(t)
                    }).on(n, i.config.selector, function (t) {
                        return i._leave(t)
                    })
                }
            }), g(this.element).closest(".modal").on("hide.bs.modal", function () {
                i.element && i.hide()
            }), this.config.selector ? this.config = r({}, this.config, {
                trigger: "manual",
                selector: ""
            }) : this._fixTitle()
        }, qt._fixTitle = function () {
            var t = typeof this.element.getAttribute("data-original-title");
            !this.element.getAttribute("title") && "string" == t || (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
        }, qt._enter = function (t, e) {
            var n = this.constructor.DATA_KEY;
            (e = e || g(t.currentTarget).data(n)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), g(t.currentTarget).data(n, e)), t && (e._activeTrigger["focusin" === t.type ? ie : ne] = !0), g(e.getTipElement()).hasClass(ee) || e._hoverState === Gt ? e._hoverState = Gt : (clearTimeout(e._timeout), e._hoverState = Gt, e.config.delay && e.config.delay.show ? e._timeout = setTimeout(function () {
                e._hoverState === Gt && e.show()
            }, e.config.delay.show) : e.show())
        }, qt._leave = function (t, e) {
            var n = this.constructor.DATA_KEY;
            (e = e || g(t.currentTarget).data(n)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), g(t.currentTarget).data(n, e)), t && (e._activeTrigger["focusout" === t.type ? ie : ne] = !1), e._isWithActiveTrigger() || (clearTimeout(e._timeout), e._hoverState = "out", e.config.delay && e.config.delay.hide ? e._timeout = setTimeout(function () {
                "out" === e._hoverState && e.hide()
            }, e.config.delay.hide) : e.hide())
        }, qt._isWithActiveTrigger = function () {
            for (var t in this._activeTrigger)
                if (this._activeTrigger[t]) return !0;
            return !1
        }, qt._getConfig = function (t) {
            var e = g(this.element).data();
            return Object.keys(e).forEach(function (t) {
                -1 !== zt.indexOf(t) && delete e[t]
            }), "number" == typeof (t = r({}, this.constructor.Default, e, "object" == typeof t && t ? t : {})).delay && (t.delay = {
                show: t.delay,
                hide: t.delay
            }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), _.typeCheckConfig(Mt, t, this.constructor.DefaultType), t.sanitize && (t.template = Wt(t.template, t.whiteList, t.sanitizeFn)), t
        }, qt._getDelegateConfig = function () {
            var t = {};
            if (this.config)
                for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
            return t
        }, qt._cleanTipClass = function () {
            var t = g(this.getTipElement()),
                e = t.attr("class").match(Yt);
            null !== e && e.length && t.removeClass(e.join(""))
        }, qt._handlePopperPlacementChange = function (t) {
            var e = t.instance;
            this.tip = e.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
        }, qt._fixTransition = function () {
            var t = this.getTipElement(),
                e = this.config.animation;
            null === t.getAttribute("x-placement") && (g(t).removeClass(te), this.config.animation = !1, this.hide(), this.show(), this.config.animation = e)
        }, se._jQueryInterface = function (n) {
            return this.each(function () {
                var t = g(this).data(Kt),
                    e = "object" == typeof n && n;
                if ((t || !/dispose|hide/.test(n)) && (t || (t = new se(this, e), g(this).data(Kt, t)), "string" == typeof n)) {
                    if (void 0 === t[n]) throw new TypeError('No method named "' + n + '"');
                    t[n]()
                }
            })
        }, s(se, null, [{
            key: "VERSION",
            get: function () {
                return "4.3.1"
            }
        }, {
            key: "Default",
            get: function () {
                return $t
            }
        }, {
            key: "NAME",
            get: function () {
                return Mt
            }
        }, {
            key: "DATA_KEY",
            get: function () {
                return Kt
            }
        }, {
            key: "Event",
            get: function () {
                return Zt
            }
        }, {
            key: "EVENT_KEY",
            get: function () {
                return Qt
            }
        }, {
            key: "DefaultType",
            get: function () {
                return Xt
            }
        }]), se);

    function se(t, e) {
        if (void 0 === u) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
        this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
    }
    g.fn[Mt] = oe._jQueryInterface, g.fn[Mt].Constructor = oe, g.fn[Mt].noConflict = function () {
        return g.fn[Mt] = Bt, oe._jQueryInterface
    };
    var re = "popover",
        ae = "bs.popover",
        le = "." + ae,
        ce = g.fn[re],
        he = "bs-popover",
        ue = new RegExp("(^|\\s)" + he + "\\S+", "g"),
        fe = r({}, oe.Default, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        }),
        de = r({}, oe.DefaultType, {
            content: "(string|element|function)"
        }),
        ge = {
            HIDE: "hide" + le,
            HIDDEN: "hidden" + le,
            SHOW: "show" + le,
            SHOWN: "shown" + le,
            INSERTED: "inserted" + le,
            CLICK: "click" + le,
            FOCUSIN: "focusin" + le,
            FOCUSOUT: "focusout" + le,
            MOUSEENTER: "mouseenter" + le,
            MOUSELEAVE: "mouseleave" + le
        },
        _e = function (t) {
            var e, n;

            function i() {
                return t.apply(this, arguments) || this
            }
            n = t, (e = i).prototype = Object.create(n.prototype), (e.prototype.constructor = e).__proto__ = n;
            var o = i.prototype;
            return o.isWithContent = function () {
                return this.getTitle() || this._getContent()
            }, o.addAttachmentClass = function (t) {
                g(this.getTipElement()).addClass(he + "-" + t)
            }, o.getTipElement = function () {
                return this.tip = this.tip || g(this.config.template)[0], this.tip
            }, o.setContent = function () {
                var t = g(this.getTipElement());
                this.setElementContent(t.find(".popover-header"), this.getTitle());
                var e = this._getContent();
                "function" == typeof e && (e = e.call(this.element)), this.setElementContent(t.find(".popover-body"), e), t.removeClass("fade show")
            }, o._getContent = function () {
                return this.element.getAttribute("data-content") || this.config.content
            }, o._cleanTipClass = function () {
                var t = g(this.getTipElement()),
                    e = t.attr("class").match(ue);
                null !== e && 0 < e.length && t.removeClass(e.join(""))
            }, i._jQueryInterface = function (n) {
                return this.each(function () {
                    var t = g(this).data(ae),
                        e = "object" == typeof n ? n : null;
                    if ((t || !/dispose|hide/.test(n)) && (t || (t = new i(this, e), g(this).data(ae, t)), "string" == typeof n)) {
                        if (void 0 === t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n]()
                    }
                })
            }, s(i, null, [{
                key: "VERSION",
                get: function () {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function () {
                    return fe
                }
            }, {
                key: "NAME",
                get: function () {
                    return re
                }
            }, {
                key: "DATA_KEY",
                get: function () {
                    return ae
                }
            }, {
                key: "Event",
                get: function () {
                    return ge
                }
            }, {
                key: "EVENT_KEY",
                get: function () {
                    return le
                }
            }, {
                key: "DefaultType",
                get: function () {
                    return de
                }
            }]), i
        }(oe);
    g.fn[re] = _e._jQueryInterface, g.fn[re].Constructor = _e, g.fn[re].noConflict = function () {
        return g.fn[re] = ce, _e._jQueryInterface
    };
    var me, pe = "scrollspy",
        ve = "bs.scrollspy",
        Ee = "." + ve,
        ye = g.fn[pe],
        Ce = {
            offset: 10,
            method: "auto",
            target: ""
        },
        Te = {
            offset: "number",
            method: "string",
            target: "(string|element)"
        },
        Se = {
            ACTIVATE: "activate" + Ee,
            SCROLL: "scroll" + Ee,
            LOAD_DATA_API: "load" + Ee + ".data-api"
        },
        be = "active",
        Ie = ".nav, .list-group",
        De = ".nav-link",
        we = ".list-group-item",
        Ae = "position",
        Ne = ((me = Oe.prototype).refresh = function () {
            var e = this,
                t = this._scrollElement === this._scrollElement.window ? "offset" : Ae,
                o = "auto" === this._config.method ? t : this._config.method,
                s = o === Ae ? this._getScrollTop() : 0;
            this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function (t) {
                var e, n = _.getSelectorFromElement(t);
                if (n && (e = document.querySelector(n)), e) {
                    var i = e.getBoundingClientRect();
                    if (i.width || i.height) return [g(e)[o]().top + s, n]
                }
                return null
            }).filter(function (t) {
                return t
            }).sort(function (t, e) {
                return t[0] - e[0]
            }).forEach(function (t) {
                e._offsets.push(t[0]), e._targets.push(t[1])
            })
        }, me.dispose = function () {
            g.removeData(this._element, ve), g(this._scrollElement).off(Ee), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
        }, me._getConfig = function (t) {
            if ("string" != typeof (t = r({}, Ce, "object" == typeof t && t ? t : {})).target) {
                var e = g(t.target).attr("id");
                e || (e = _.getUID(pe), g(t.target).attr("id", e)), t.target = "#" + e
            }
            return _.typeCheckConfig(pe, t, Te), t
        }, me._getScrollTop = function () {
            return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
        }, me._getScrollHeight = function () {
            return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
        }, me._getOffsetHeight = function () {
            return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
        }, me._process = function () {
            var t = this._getScrollTop() + this._config.offset,
                e = this._getScrollHeight(),
                n = this._config.offset + e - this._getOffsetHeight();
            if (this._scrollHeight !== e && this.refresh(), n <= t) {
                var i = this._targets[this._targets.length - 1];
                this._activeTarget !== i && this._activate(i)
            } else {
                if (this._activeTarget && t < this._offsets[0] && 0 < this._offsets[0]) return this._activeTarget = null, void this._clear();
                for (var o = this._offsets.length; o--;) this._activeTarget !== this._targets[o] && t >= this._offsets[o] && (void 0 === this._offsets[o + 1] || t < this._offsets[o + 1]) && this._activate(this._targets[o])
            }
        }, me._activate = function (e) {
            this._activeTarget = e, this._clear();
            var t = this._selector.split(",").map(function (t) {
                    return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
                }),
                n = g([].slice.call(document.querySelectorAll(t.join(","))));
            n.hasClass("dropdown-item") ? (n.closest(".dropdown").find(".dropdown-toggle").addClass(be), n.addClass(be)) : (n.addClass(be), n.parents(Ie).prev(De + ", " + we).addClass(be), n.parents(Ie).prev(".nav-item").children(De).addClass(be)), g(this._scrollElement).trigger(Se.ACTIVATE, {
                relatedTarget: e
            })
        }, me._clear = function () {
            [].slice.call(document.querySelectorAll(this._selector)).filter(function (t) {
                return t.classList.contains(be)
            }).forEach(function (t) {
                return t.classList.remove(be)
            })
        }, Oe._jQueryInterface = function (e) {
            return this.each(function () {
                var t = g(this).data(ve);
                if (t || (t = new Oe(this, "object" == typeof e && e), g(this).data(ve, t)), "string" == typeof e) {
                    if (void 0 === t[e]) throw new TypeError('No method named "' + e + '"');
                    t[e]()
                }
            })
        }, s(Oe, null, [{
            key: "VERSION",
            get: function () {
                return "4.3.1"
            }
        }, {
            key: "Default",
            get: function () {
                return Ce
            }
        }]), Oe);

    function Oe(t, e) {
        var n = this;
        this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(e), this._selector = this._config.target + " " + De + "," + this._config.target + " " + we + "," + this._config.target + " .dropdown-item", this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, g(this._scrollElement).on(Se.SCROLL, function (t) {
            return n._process(t)
        }), this.refresh(), this._process()
    }
    g(window).on(Se.LOAD_DATA_API, function () {
        for (var t = [].slice.call(document.querySelectorAll('[data-spy="scroll"]')), e = t.length; e--;) {
            var n = g(t[e]);
            Ne._jQueryInterface.call(n, n.data())
        }
    }), g.fn[pe] = Ne._jQueryInterface, g.fn[pe].Constructor = Ne, g.fn[pe].noConflict = function () {
        return g.fn[pe] = ye, Ne._jQueryInterface
    };
    var ke, Pe = "bs.tab",
        Le = "." + Pe,
        je = g.fn.tab,
        He = {
            HIDE: "hide" + Le,
            HIDDEN: "hidden" + Le,
            SHOW: "show" + Le,
            SHOWN: "shown" + Le,
            CLICK_DATA_API: "click" + Le + ".data-api"
        },
        Re = "active",
        xe = ".active",
        Fe = "> li > .active",
        Ue = ((ke = We.prototype).show = function () {
            var n = this;
            if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && g(this._element).hasClass(Re) || g(this._element).hasClass("disabled"))) {
                var t, i, e = g(this._element).closest(".nav, .list-group")[0],
                    o = _.getSelectorFromElement(this._element);
                if (e) {
                    var s = "UL" === e.nodeName || "OL" === e.nodeName ? Fe : xe;
                    i = (i = g.makeArray(g(e).find(s)))[i.length - 1]
                }
                var r = g.Event(He.HIDE, {
                        relatedTarget: this._element
                    }),
                    a = g.Event(He.SHOW, {
                        relatedTarget: i
                    });
                if (i && g(i).trigger(r), g(this._element).trigger(a), !a.isDefaultPrevented() && !r.isDefaultPrevented()) {
                    o && (t = document.querySelector(o)), this._activate(this._element, e);
                    var l = function () {
                        var t = g.Event(He.HIDDEN, {
                                relatedTarget: n._element
                            }),
                            e = g.Event(He.SHOWN, {
                                relatedTarget: i
                            });
                        g(i).trigger(t), g(n._element).trigger(e)
                    };
                    t ? this._activate(t, t.parentNode, l) : l()
                }
            }
        }, ke.dispose = function () {
            g.removeData(this._element, Pe), this._element = null
        }, ke._activate = function (t, e, n) {
            function i() {
                return o._transitionComplete(t, s, n)
            }
            var o = this,
                s = (!e || "UL" !== e.nodeName && "OL" !== e.nodeName ? g(e).children(xe) : g(e).find(Fe))[0],
                r = n && s && g(s).hasClass("fade");
            if (s && r) {
                var a = _.getTransitionDurationFromElement(s);
                g(s).removeClass("show").one(_.TRANSITION_END, i).emulateTransitionEnd(a)
            } else i()
        }, ke._transitionComplete = function (t, e, n) {
            if (e) {
                g(e).removeClass(Re);
                var i = g(e.parentNode).find("> .dropdown-menu .active")[0];
                i && g(i).removeClass(Re), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !1)
            }
            if (g(t).addClass(Re), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), _.reflow(t), t.classList.contains("fade") && t.classList.add("show"), t.parentNode && g(t.parentNode).hasClass("dropdown-menu")) {
                var o = g(t).closest(".dropdown")[0];
                if (o) {
                    var s = [].slice.call(o.querySelectorAll(".dropdown-toggle"));
                    g(s).addClass(Re)
                }
                t.setAttribute("aria-expanded", !0)
            }
            n && n()
        }, We._jQueryInterface = function (n) {
            return this.each(function () {
                var t = g(this),
                    e = t.data(Pe);
                if (e || (e = new We(this), t.data(Pe, e)), "string" == typeof n) {
                    if (void 0 === e[n]) throw new TypeError('No method named "' + n + '"');
                    e[n]()
                }
            })
        }, s(We, null, [{
            key: "VERSION",
            get: function () {
                return "4.3.1"
            }
        }]), We);

    function We(t) {
        this._element = t
    }
    g(document).on(He.CLICK_DATA_API, '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', function (t) {
        t.preventDefault(), Ue._jQueryInterface.call(g(this), "show")
    }), g.fn.tab = Ue._jQueryInterface, g.fn.tab.Constructor = Ue, g.fn.tab.noConflict = function () {
        return g.fn.tab = je, Ue._jQueryInterface
    };
    var qe, Me = "toast",
        Ke = "bs.toast",
        Qe = "." + Ke,
        Be = g.fn[Me],
        Ve = {
            CLICK_DISMISS: "click.dismiss" + Qe,
            HIDE: "hide" + Qe,
            HIDDEN: "hidden" + Qe,
            SHOW: "show" + Qe,
            SHOWN: "shown" + Qe
        },
        Ye = "show",
        ze = "showing",
        Xe = {
            animation: "boolean",
            autohide: "boolean",
            delay: "number"
        },
        Je = {
            animation: !0,
            autohide: !0,
            delay: 500
        },
        $e = ((qe = Ge.prototype).show = function () {
            var t = this;

            function e() {
                t._element.classList.remove(ze), t._element.classList.add(Ye), g(t._element).trigger(Ve.SHOWN), t._config.autohide && t.hide()
            }
            if (g(this._element).trigger(Ve.SHOW), this._config.animation && this._element.classList.add("fade"), this._element.classList.remove("hide"), this._element.classList.add(ze), this._config.animation) {
                var n = _.getTransitionDurationFromElement(this._element);
                g(this._element).one(_.TRANSITION_END, e).emulateTransitionEnd(n)
            } else e()
        }, qe.hide = function (t) {
            var e = this;
            this._element.classList.contains(Ye) && (g(this._element).trigger(Ve.HIDE), t ? this._close() : this._timeout = setTimeout(function () {
                e._close()
            }, this._config.delay))
        }, qe.dispose = function () {
            clearTimeout(this._timeout), this._timeout = null, this._element.classList.contains(Ye) && this._element.classList.remove(Ye), g(this._element).off(Ve.CLICK_DISMISS), g.removeData(this._element, Ke), this._element = null, this._config = null
        }, qe._getConfig = function (t) {
            return t = r({}, Je, g(this._element).data(), "object" == typeof t && t ? t : {}), _.typeCheckConfig(Me, t, this.constructor.DefaultType), t
        }, qe._setListeners = function () {
            var t = this;
            g(this._element).on(Ve.CLICK_DISMISS, '[data-dismiss="toast"]', function () {
                return t.hide(!0)
            })
        }, qe._close = function () {
            function t() {
                e._element.classList.add("hide"), g(e._element).trigger(Ve.HIDDEN)
            }
            var e = this;
            if (this._element.classList.remove(Ye), this._config.animation) {
                var n = _.getTransitionDurationFromElement(this._element);
                g(this._element).one(_.TRANSITION_END, t).emulateTransitionEnd(n)
            } else t()
        }, Ge._jQueryInterface = function (n) {
            return this.each(function () {
                var t = g(this),
                    e = t.data(Ke);
                if (e || (e = new Ge(this, "object" == typeof n && n), t.data(Ke, e)), "string" == typeof n) {
                    if (void 0 === e[n]) throw new TypeError('No method named "' + n + '"');
                    e[n](this)
                }
            })
        }, s(Ge, null, [{
            key: "VERSION",
            get: function () {
                return "4.3.1"
            }
        }, {
            key: "DefaultType",
            get: function () {
                return Xe
            }
        }, {
            key: "Default",
            get: function () {
                return Je
            }
        }]), Ge);

    function Ge(t, e) {
        this._element = t, this._config = this._getConfig(e), this._timeout = null, this._setListeners()
    }
    g.fn[Me] = $e._jQueryInterface, g.fn[Me].Constructor = $e, g.fn[Me].noConflict = function () {
            return g.fn[Me] = Be, $e._jQueryInterface
        },
        function () {
            if (void 0 === g) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
            var t = g.fn.jquery.split(" ")[0].split(".");
            if (t[0] < 2 && t[1] < 9 || 1 === t[0] && 9 === t[1] && t[2] < 1 || 4 <= t[0]) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
        }(), t.Util = _, t.Alert = f, t.Button = D, t.Carousel = M, t.Collapse = it, t.Dropdown = yt, t.Modal = Ht, t.Popover = _e, t.Scrollspy = Ne, t.Tab = Ue, t.Toast = $e, t.Tooltip = oe, Object.defineProperty(t, "__esModule", {
            value: !0
        })
}), jQuery.getJSON("users", function (t) {
    console.log("users", t)
});
