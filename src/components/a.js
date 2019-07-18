!(function(t) {
  var e = {};
  function i(n) {
    if (e[n]) return e[n].exports;
    var r = (e[n] = { i: n, l: !1, exports: {} });
    return t[n].call(r.exports, r, r.exports, i), (r.l = !0), r.exports;
  }
  (i.m = t),
    (i.c = e),
    (i.d = function(t, e, n) {
      i.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
    }),
    (i.r = function(t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (i.t = function(t, e) {
      if ((1 & e && (t = i(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var n = Object.create(null);
      if (
        (i.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var r in t)
          i.d(
            n,
            r,
            function(e) {
              return t[e];
            }.bind(null, r)
          );
      return n;
    }),
    (i.n = function(t) {
      var e =
        t && t.__esModule
          ? function() {
              return t.default;
            }
          : function() {
              return t;
            };
      return i.d(e, "a", e), e;
    }),
    (i.o = function(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (i.p = "https://prod.purechatcdn.com/assets/"),
    i((i.s = 130));
})({
  1: function(t, e) {
    t.exports = {
      homeUrl: "https://www.purechat.com",
      apiUrl: "https://api.purechat.com",
      cdnUrl: "https://prod.purechatcdn.com",
      apiCdnServerUrl: "https://api-cdn.purechat.com",
      trackingOperatorApiUrl: "https://tracking.purechat.com",
      tableRenderInterval: 1e3,
      googleEmbedApiKey: "AIzaSyAZVBKuXyvNx3c78LAliIJWOgpsTn4Ty3M",
      cdnServerUrl: "https://prod.purechatcdn.com",
      customerIoSiteId: "d4a6e4df3666072e5b55",
      dashboardRootUrl: "https://app.purechat.com",
      apiRootUrl: "https://api.purechat.com",
      widgetApiRootUrl: "https://widgetapi.purechat.com",
      filesRootUrl: "https://files.purechat.com",
      pingQueueUrl: "https://checkin.purechat.com/api/checkin",
      authCookieName: "purechatAuthv5",
      pidCookieName: "prodvtftwPID",
      pingInterval: 5e3,
      sessionTimeout: 12e5
    };
  },
  130: function(t, e, i) {
    "use strict";
    i.r(e);
    var n = i(1),
      r = i.n(n);
    function o(t) {
      for (var e = 1; e < arguments.length; e++) {
        var i = null != arguments[e] ? arguments[e] : {},
          n = Object.keys(i);
        "function" == typeof Object.getOwnPropertySymbols &&
          (n = n.concat(
            Object.getOwnPropertySymbols(i).filter(function(t) {
              return Object.getOwnPropertyDescriptor(i, t).enumerable;
            })
          )),
          n.forEach(function(e) {
            a(t, e, i[e]);
          });
      }
      return t;
    }
    function a(t, e, i) {
      return (
        e in t
          ? Object.defineProperty(t, e, {
              value: i,
              enumerable: !0,
              configurable: !0,
              writable: !0
            })
          : (t[e] = i),
        t
      );
    }
    function c(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function u(t, e) {
      for (var i = 0; i < e.length; i++) {
        var n = e[i];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(t, n.key, n);
      }
    }
    function p(t, e, i) {
      return e && u(t.prototype, e), i && u(t, i), t;
    }
    var s = null;
    window.MooTools &&
      ((s = Function.prototype.bind),
      (Function.prototype.bind = function(t) {
        if ("function" != typeof this)
          throw new TypeError("Function.prototype.bind");
        var e = Array.prototype.slice.call(arguments, 1),
          i = this,
          n = function() {},
          r = function() {
            return i.apply(
              this instanceof n ? this : t,
              e.concat(Array.prototype.slice.call(arguments))
            );
          };
        return (
          this.prototype && (n.prototype = this.prototype),
          (r.prototype = new n()),
          r
        );
      }));
    try {
      "undefined" != typeof Prototype &&
        Object.defineProperty(Array.prototype, Symbol.toStringTag, {
          value: "Array"
        });
    } catch (t) {}
    var l = 2e4,
      d = {},
      f = 0;
    function h(t, e) {
      var i = new XMLHttpRequest();
      i.open("GET", t),
        (i.onload = function() {
          if (200 === i.status) {
            var t = JSON.parse(i.responseText);
            e(t);
          }
        }),
        i.send();
    }
    function y(t, e, i) {
      var n = document.createElement("script");
      (n.async = !0), (n.type = "text/javascript"), (n.src = t);
      var r = !1;
      i && "function" == typeof i && (n.onerror = i),
        (n.onload = n.onreadystatechange = function() {
          r ||
            (this.readyState &&
              "loaded" !== this.readyState &&
              "complete" !== this.readyState) ||
            ((r = !0), e());
        }),
        document.body.appendChild(n);
    }
    var w = (function() {
        function t(e) {
          c(this, t), (this.api = e.getPublicApi());
        }
        return (
          p(t, [
            {
              key: "on",
              value: function() {
                return this.api.on.apply(this.api, arguments);
              }
            },
            {
              key: "off",
              value: function() {
                return this.api.off.apply(this.api, arguments);
              }
            },
            {
              key: "action",
              value: function() {
                return this.api.action.apply(this.api, arguments);
              }
            },
            {
              key: "set",
              value: function() {
                return this.api.set.apply(this.api, arguments);
              }
            },
            {
              key: "get",
              value: function() {
                return this.api.get.apply(this.api, arguments);
              }
            }
          ]),
          t
        );
      })(),
      b = (function() {
        function t() {
          var e = this,
            i =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {};
          c(this, t);
          var n = Object.keys(i).reduce(function(t, e) {
              switch (e.toLowerCase().trim()) {
                case "c":
                  t.widgetId = i[e];
                  break;
                case "o":
                  t.overrideWidgetId = i[e];
                  break;
                case "pureserverurl":
                  t.pureServerUrl = i[e];
                  break;
                case "chatserverurl":
                  t.chatServerUrl = i[e];
                  break;
                case "f":
                  t.isWidget = i[e];
              }
              return t;
            }, {}),
            a = function() {
              var t,
                i,
                a = n.overrideWidgetId || n.widgetId;
              (t = function() {
                (window.pc$ = window.jQuery.noConflict(!0)),
                  h(
                    ""
                      .concat(
                        r.a.widgetApiRootUrl,
                        "/api/visitorwidget/widgetversions/"
                      )
                      .concat(a),
                    function(t) {
                      var i = o({}, n, e.mapWidgetVersionSettings(t));
                      if (i.QuotaExceeded || i.Stop) return !1;
                      h(
                        ""
                          .concat(
                            r.a.apiCdnServerUrl,
                            "/api/visitorwidget/widget/"
                          )
                          .concat(a, "/")
                          .concat(i.WidgetVersion),
                        function(t) {
                          if (
                            ((i = o({}, t, i)),
                            !e.isAllowedDomain(i.AllowedDomains))
                          )
                            return !1;
                          !(function(t, e) {
                            var i =
                              (arguments.length > 2 && void 0 !== arguments[2]
                                ? arguments[2]
                                : null) || "_WidgetJPCB".concat(f);
                            window[i] = function() {
                              e.apply(null, arguments),
                                (window[i] = function() {});
                            };
                            var n = document.createElement("script");
                            n.setAttribute("data-cfasync", !1),
                              n.setAttribute("async", !0),
                              n.setAttribute("type", "text/javascript"),
                              f++;
                            var r = t;
                            r.indexOf("?") < 0 && (r += "?_=_"),
                              (r += "&callback=".concat(i));
                            var o = !1;
                            (n.onload = n.onreadystatechange = function() {
                              o ||
                                (this.readyState &&
                                  "loaded" !== this.readyState &&
                                  "complete" !== this.readyState) ||
                                ((o = !0),
                                clearTimeout(d["JSONPTimeout".concat(i)]),
                                delete d["JSONPTimeout".concat(i)]);
                            }),
                              window.location.search.indexOf("pcforcemobile") >=
                                0 && (r += "&forceMobile=true"),
                              n.setAttribute("src", r),
                              document
                                .getElementsByTagName("HEAD")[0]
                                .appendChild(n),
                              (d["JSONPTimeout".concat(i)] = setTimeout(
                                function() {
                                  throw "Pure Chat widget failed to load";
                                },
                                l
                              ));
                          })(
                            "".concat(r.a.dashboardRootUrl, "/version"),
                            function(t) {
                              var n =
                                t.assets["widget-script.js"] ||
                                t.assets["widgetScript.js"];
                              y(
                                "".concat(r.a.cdnUrl, "/").concat(n),
                                function() {
                                  window._pcwi && delete window._pcwi;
                                  var t = window._pcWidgetInitializer;
                                  t
                                    ? t.start(i, function(t) {
                                        if (
                                          ((e.widget = t), window.purechatApi)
                                        ) {
                                          var i = window.purechatApi,
                                            n = i.l,
                                            r = i.t;
                                          (window.purechatApi = new w(t)),
                                            n.forEach(function(t) {
                                              return window.purechatApi.on.apply(
                                                window.purechatApi,
                                                t
                                              );
                                            }),
                                            r.forEach(function(t) {
                                              return window.purechatApi.action.apply(
                                                window.purechatApi,
                                                t
                                              );
                                            });
                                        }
                                        window.MooTools &&
                                          null !== s &&
                                          (Function.prototype.bind = s);
                                      })
                                    : console.log(
                                        "Pure Chat Widget failed to load"
                                      );
                                },
                                function() {
                                  return console.log(
                                    "Failed to load widget script"
                                  );
                                }
                              );
                            },
                            "_WidgetJPCB_Version"
                          );
                        }
                      );
                    }
                  );
              }),
                (i = function() {
                  return console.log("Libraries failed to load");
                }),
                y(
                  "//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js",
                  function() {
                    if (!window.jQuery)
                      return y(
                        "".concat(r.a.cdnUrl, "/assets/jquery.fallback.321.js"),
                        t,
                        i
                      );
                    t();
                  },
                  function() {
                    return y(
                      "".concat(r.a.cdnUrl, "/assets/jquery.fallback.321.js"),
                      t,
                      i
                    );
                  }
                );
            };
          "complete" === document.readyState
            ? setTimeout(a, 0)
            : window.addEventListener
            ? window.addEventListener("load", a, !1)
            : window.attachEvent
            ? window.attachEvent("onload", a)
            : (window.onload = a);
        }
        return (
          p(t, [
            {
              key: "mapWidgetVersionSettings",
              value: function() {
                var t =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {};
                return Object.keys(t).reduce(function(e, i) {
                  var n = t[i];
                  switch (i) {
                    case "v":
                      e.Valid = !0 === n || 1 === n;
                      break;
                    case "wv":
                      e.WidgetVersion = n;
                      break;
                    case "csu":
                      e.ChatServerUrl = n;
                      break;
                    case "sru":
                      e.SiteRootUrl = n;
                      break;
                    case "dap":
                      e.DisableAvailabilityPings = !0 === n || 1 === n;
                      break;
                    case "ip":
                      e.VisitorIPAddress = n;
                      break;
                    case "rfm":
                      e.RequestFromMobileDevice = !0 === n || 1 === n;
                      break;
                    case "b":
                      e.IPIsBanned = !0 === n || 1 === n;
                      break;
                    case "cru":
                      e.CdnRootUrl = n;
                      break;
                    case "acru":
                      e.ApiCdnRootUrl = n;
                      break;
                    case "id":
                      e.Id = n;
                      break;
                    case "s":
                      e.Stop = !0 === n || 1 === n;
                      break;
                    case "qe":
                      e.QuotaExceeded = !0 === n || 1 === n;
                      break;
                    default:
                      e[i] = n;
                  }
                  return e;
                }, {});
              }
            },
            {
              key: "isAllowedDomain",
              value: function() {
                var t =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : [];
                return (
                  0 === t.length ||
                  (t.push("purechat.com"),
                  t.some(function(t) {
                    return /^\*$/.test(t) || -1 !== document.domain.search(t);
                  }))
                );
              }
            },
            {
              key: "set",
              value: function() {
                this.publicApi &&
                  this.publicApi.set.apply(this.publicApi, arguments);
              }
            },
            {
              key: "get",
              value: function() {
                this.publicApi &&
                  this.publicApi.get.apply(this.publicApi, arguments);
              }
            },
            {
              key: "on",
              value: function() {
                this.publicApi &&
                  this.publicApi.on.apply(this.publicApi, arguments);
              }
            },
            {
              key: "trigger",
              value: function() {
                this.publicApi &&
                  this.publicApi.trigger.apply(this.publicApi, arguments);
              }
            },
            {
              key: "publicApi",
              get: function() {
                return this.widget ? this.widget.getPublicApi() : null;
              }
            }
          ]),
          t
        );
      })();
    window.PCWidget = b;
  }
});
