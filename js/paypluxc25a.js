! function(e, t) {
	"object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.axios = t() : e.axios = t()
}(window, function() {
	return function(e) {
		var t = {};

		function n(i) {
			if (t[i]) return t[i].exports;
			var r = t[i] = {
				i: i,
				l: !1,
				exports: {}
			};
			return e[i].call(r.exports, r, r.exports, n), r.l = !0, r.exports
		}
		return n.m = e, n.c = t, n.d = function(e, t, i) {
			n.o(e, t) || Object.defineProperty(e, t, {
				enumerable: !0,
				get: i
			})
		}, n.r = function(e) {
			"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
				value: "Module"
			}), Object.defineProperty(e, "__esModule", {
				value: !0
			})
		}, n.t = function(e, t) {
			if (1 & t && (e = n(e)), 8 & t) return e;
			if (4 & t && "object" == typeof e && e && e.__esModule) return e;
			var i = Object.create(null);
			if (n.r(i), Object.defineProperty(i, "default", {
					enumerable: !0,
					value: e
				}), 2 & t && "string" != typeof e)
				for (var r in e) n.d(i, r, function(t) {
					return e[t]
				}.bind(null, r));
			return i
		}, n.n = function(e) {
			var t = e && e.__esModule ? function() {
				return e.default
			} : function() {
				return e
			};
			return n.d(t, "a", t), t
		}, n.o = function(e, t) {
			return Object.prototype.hasOwnProperty.call(e, t)
		}, n.p = "", n(n.s = "./index.js")
	}({
		"./index.js": function(e, t, n) {
			e.exports = n("./lib/axios.js")
		},
		"./lib/adapters/xhr.js": function(e, t, n) {
			"use strict";
			var i = n("./lib/utils.js"),
				r = n("./lib/core/settle.js"),
				o = n("./lib/helpers/cookies.js"),
				a = n("./lib/helpers/buildURL.js"),
				s = n("./lib/core/buildFullPath.js"),
				l = n("./lib/helpers/parseHeaders.js"),
				u = n("./lib/helpers/isURLSameOrigin.js"),
				c = n("./lib/core/createError.js");
			e.exports = function(e) {
				return new Promise(function(t, n) {
					var d = e.data,
						f = e.headers,
						h = e.responseType;
					i.isFormData(d) && delete f["Content-Type"];
					var p = new XMLHttpRequest;
					if (e.auth) {
						var g = e.auth.username || "",
							m = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
						f.Authorization = "Basic " + btoa(g + ":" + m)
					}
					var v = s(e.baseURL, e.url);

					function b() {
						if (p) {
							var i = "getAllResponseHeaders" in p ? l(p.getAllResponseHeaders()) : null,
								o = {
									data: h && "text" !== h && "json" !== h ? p.response : p.responseText,
									status: p.status,
									statusText: p.statusText,
									headers: i,
									config: e,
									request: p
								};
							r(t, n, o), p = null
						}
					}
					if (p.open(e.method.toUpperCase(), a(v, e.params, e.paramsSerializer), !0), p.timeout = e.timeout, "onloadend" in p ? p.onloadend = b : p.onreadystatechange = function() {
							p && 4 === p.readyState && (0 !== p.status || p.responseURL && 0 === p.responseURL.indexOf("file:")) && setTimeout(b)
						}, p.onabort = function() {
							p && (n(c("Request aborted", e, "ECONNABORTED", p)), p = null)
						}, p.onerror = function() {
							n(c("Network Error", e, null, p)), p = null
						}, p.ontimeout = function() {
							var t = "timeout of " + e.timeout + "ms exceeded";
							e.timeoutErrorMessage && (t = e.timeoutErrorMessage), n(c(t, e, e.transitional && e.transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED", p)), p = null
						}, i.isStandardBrowserEnv()) {
						var y = (e.withCredentials || u(v)) && e.xsrfCookieName ? o.read(e.xsrfCookieName) : void 0;
						y && (f[e.xsrfHeaderName] = y)
					}
					"setRequestHeader" in p && i.forEach(f, function(e, t) {
						void 0 === d && "content-type" === t.toLowerCase() ? delete f[t] : p.setRequestHeader(t, e)
					}), i.isUndefined(e.withCredentials) || (p.withCredentials = !!e.withCredentials), h && "json" !== h && (p.responseType = e.responseType), "function" == typeof e.onDownloadProgress && p.addEventListener("progress", e.onDownloadProgress), "function" == typeof e.onUploadProgress && p.upload && p.upload.addEventListener("progress", e.onUploadProgress), e.cancelToken && e.cancelToken.promise.then(function(e) {
						p && (p.abort(), n(e), p = null)
					}), d || (d = null), p.send(d)
				})
			}
		},
		"./lib/axios.js": function(e, t, n) {
			"use strict";
			var i = n("./lib/utils.js"),
				r = n("./lib/helpers/bind.js"),
				o = n("./lib/core/Axios.js"),
				a = n("./lib/core/mergeConfig.js");

			function s(e) {
				var t = new o(e),
					n = r(o.prototype.request, t);
				return i.extend(n, o.prototype, t), i.extend(n, t), n
			}
			var l = s(n("./lib/defaults.js"));
			l.Axios = o, l.create = function(e) {
				return s(a(l.defaults, e))
			}, l.Cancel = n("./lib/cancel/Cancel.js"), l.CancelToken = n("./lib/cancel/CancelToken.js"), l.isCancel = n("./lib/cancel/isCancel.js"), l.all = function(e) {
				return Promise.all(e)
			}, l.spread = n("./lib/helpers/spread.js"), l.isAxiosError = n("./lib/helpers/isAxiosError.js"), e.exports = l, e.exports.default = l
		},
		"./lib/cancel/Cancel.js": function(e, t, n) {
			"use strict";

			function i(e) {
				this.message = e
			}
			i.prototype.toString = function() {
				return "Cancel" + (this.message ? ": " + this.message : "")
			}, i.prototype.__CANCEL__ = !0, e.exports = i
		},
		"./lib/cancel/CancelToken.js": function(e, t, n) {
			"use strict";
			var i = n("./lib/cancel/Cancel.js");

			function r(e) {
				if ("function" != typeof e) throw new TypeError("executor must be a function.");
				var t;
				this.promise = new Promise(function(e) {
					t = e
				});
				var n = this;
				e(function(e) {
					n.reason || (n.reason = new i(e), t(n.reason))
				})
			}
			r.prototype.throwIfRequested = function() {
				if (this.reason) throw this.reason
			}, r.source = function() {
				var e;
				return {
					token: new r(function(t) {
						e = t
					}),
					cancel: e
				}
			}, e.exports = r
		},
		"./lib/cancel/isCancel.js": function(e, t, n) {
			"use strict";
			e.exports = function(e) {
				return !(!e || !e.__CANCEL__)
			}
		},
		"./lib/core/Axios.js": function(e, t, n) {
			"use strict";
			var i = n("./lib/utils.js"),
				r = n("./lib/helpers/buildURL.js"),
				o = n("./lib/core/InterceptorManager.js"),
				a = n("./lib/core/dispatchRequest.js"),
				s = n("./lib/core/mergeConfig.js"),
				l = n("./lib/helpers/validator.js"),
				u = l.validators;

			function c(e) {
				this.defaults = e, this.interceptors = {
					request: new o,
					response: new o
				}
			}
			c.prototype.request = function(e) {
				"string" == typeof e ? (e = arguments[1] || {}).url = arguments[0] : e = e || {}, (e = s(this.defaults, e)).method ? e.method = e.method.toLowerCase() : this.defaults.method ? e.method = this.defaults.method.toLowerCase() : e.method = "get";
				var t = e.transitional;
				void 0 !== t && l.assertOptions(t, {
					silentJSONParsing: u.transitional(u.boolean, "1.0.0"),
					forcedJSONParsing: u.transitional(u.boolean, "1.0.0"),
					clarifyTimeoutError: u.transitional(u.boolean, "1.0.0")
				}, !1);
				var n = [],
					i = !0;
				this.interceptors.request.forEach(function(t) {
					"function" == typeof t.runWhen && !1 === t.runWhen(e) || (i = i && t.synchronous, n.unshift(t.fulfilled, t.rejected))
				});
				var r, o = [];
				if (this.interceptors.response.forEach(function(e) {
						o.push(e.fulfilled, e.rejected)
					}), !i) {
					var c = [a, void 0];
					for (Array.prototype.unshift.apply(c, n), c = c.concat(o), r = Promise.resolve(e); c.length;) r = r.then(c.shift(), c.shift());
					return r
				}
				for (var d = e; n.length;) {
					var f = n.shift(),
						h = n.shift();
					try {
						d = f(d)
					} catch (e) {
						h(e);
						break
					}
				}
				try {
					r = a(d)
				} catch (e) {
					return Promise.reject(e)
				}
				for (; o.length;) r = r.then(o.shift(), o.shift());
				return r
			}, c.prototype.getUri = function(e) {
				return e = s(this.defaults, e), r(e.url, e.params, e.paramsSerializer).replace(/^\?/, "")
			}, i.forEach(["delete", "get", "head", "options"], function(e) {
				c.prototype[e] = function(t, n) {
					return this.request(s(n || {}, {
						method: e,
						url: t,
						data: (n || {}).data
					}))
				}
			}), i.forEach(["post", "put", "patch"], function(e) {
				c.prototype[e] = function(t, n, i) {
					return this.request(s(i || {}, {
						method: e,
						url: t,
						data: n
					}))
				}
			}), e.exports = c
		},
		"./lib/core/InterceptorManager.js": function(e, t, n) {
			"use strict";
			var i = n("./lib/utils.js");

			function r() {
				this.handlers = []
			}
			r.prototype.use = function(e, t, n) {
				return this.handlers.push({
					fulfilled: e,
					rejected: t,
					synchronous: !!n && n.synchronous,
					runWhen: n ? n.runWhen : null
				}), this.handlers.length - 1
			}, r.prototype.eject = function(e) {
				this.handlers[e] && (this.handlers[e] = null)
			}, r.prototype.forEach = function(e) {
				i.forEach(this.handlers, function(t) {
					null !== t && e(t)
				})
			}, e.exports = r
		},
		"./lib/core/buildFullPath.js": function(e, t, n) {
			"use strict";
			var i = n("./lib/helpers/isAbsoluteURL.js"),
				r = n("./lib/helpers/combineURLs.js");
			e.exports = function(e, t) {
				return e && !i(t) ? r(e, t) : t
			}
		},
		"./lib/core/createError.js": function(e, t, n) {
			"use strict";
			var i = n("./lib/core/enhanceError.js");
			e.exports = function(e, t, n, r, o) {
				var a = new Error(e);
				return i(a, t, n, r, o)
			}
		},
		"./lib/core/dispatchRequest.js": function(e, t, n) {
			"use strict";
			var i = n("./lib/utils.js"),
				r = n("./lib/core/transformData.js"),
				o = n("./lib/cancel/isCancel.js"),
				a = n("./lib/defaults.js");

			function s(e) {
				e.cancelToken && e.cancelToken.throwIfRequested()
			}
			e.exports = function(e) {
				return s(e), e.headers = e.headers || {}, e.data = r.call(e, e.data, e.headers, e.transformRequest), e.headers = i.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers), i.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function(t) {
					delete e.headers[t]
				}), (e.adapter || a.adapter)(e).then(function(t) {
					return s(e), t.data = r.call(e, t.data, t.headers, e.transformResponse), t
				}, function(t) {
					return o(t) || (s(e), t && t.response && (t.response.data = r.call(e, t.response.data, t.response.headers, e.transformResponse))), Promise.reject(t)
				})
			}
		},
		"./lib/core/enhanceError.js": function(e, t, n) {
			"use strict";
			e.exports = function(e, t, n, i, r) {
				return e.config = t, n && (e.code = n), e.request = i, e.response = r, e.isAxiosError = !0, e.toJSON = function() {
					return {
						message: this.message,
						name: this.name,
						description: this.description,
						number: this.number,
						fileName: this.fileName,
						lineNumber: this.lineNumber,
						columnNumber: this.columnNumber,
						stack: this.stack,
						config: this.config,
						code: this.code
					}
				}, e
			}
		},
		"./lib/core/mergeConfig.js": function(e, t, n) {
			"use strict";
			var i = n("./lib/utils.js");
			e.exports = function(e, t) {
				t = t || {};
				var n = {},
					r = ["url", "method", "data"],
					o = ["headers", "auth", "proxy", "params"],
					a = ["baseURL", "transformRequest", "transformResponse", "paramsSerializer", "timeout", "timeoutMessage", "withCredentials", "adapter", "responseType", "xsrfCookieName", "xsrfHeaderName", "onUploadProgress", "onDownloadProgress", "decompress", "maxContentLength", "maxBodyLength", "maxRedirects", "transport", "httpAgent", "httpsAgent", "cancelToken", "socketPath", "responseEncoding"],
					s = ["validateStatus"];

				function l(e, t) {
					return i.isPlainObject(e) && i.isPlainObject(t) ? i.merge(e, t) : i.isPlainObject(t) ? i.merge({}, t) : i.isArray(t) ? t.slice() : t
				}

				function u(r) {
					i.isUndefined(t[r]) ? i.isUndefined(e[r]) || (n[r] = l(void 0, e[r])) : n[r] = l(e[r], t[r])
				}
				i.forEach(r, function(e) {
					i.isUndefined(t[e]) || (n[e] = l(void 0, t[e]))
				}), i.forEach(o, u), i.forEach(a, function(r) {
					i.isUndefined(t[r]) ? i.isUndefined(e[r]) || (n[r] = l(void 0, e[r])) : n[r] = l(void 0, t[r])
				}), i.forEach(s, function(i) {
					i in t ? n[i] = l(e[i], t[i]) : i in e && (n[i] = l(void 0, e[i]))
				});
				var c = r.concat(o).concat(a).concat(s),
					d = Object.keys(e).concat(Object.keys(t)).filter(function(e) {
						return -1 === c.indexOf(e)
					});
				return i.forEach(d, u), n
			}
		},
		"./lib/core/settle.js": function(e, t, n) {
			"use strict";
			var i = n("./lib/core/createError.js");
			e.exports = function(e, t, n) {
				var r = n.config.validateStatus;
				n.status && r && !r(n.status) ? t(i("Request failed with status code " + n.status, n.config, null, n.request, n)) : e(n)
			}
		},
		"./lib/core/transformData.js": function(e, t, n) {
			"use strict";
			var i = n("./lib/utils.js"),
				r = n("./lib/defaults.js");
			e.exports = function(e, t, n) {
				var o = this || r;
				return i.forEach(n, function(n) {
					e = n.call(o, e, t)
				}), e
			}
		},
		"./lib/defaults.js": function(e, t, n) {
			"use strict";
			var i = n("./lib/utils.js"),
				r = n("./lib/helpers/normalizeHeaderName.js"),
				o = n("./lib/core/enhanceError.js"),
				a = {
					"Content-Type": "application/x-www-form-urlencoded"
				};

			function s(e, t) {
				!i.isUndefined(e) && i.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t)
			}
			var l, u = {
				transitional: {
					silentJSONParsing: !0,
					forcedJSONParsing: !0,
					clarifyTimeoutError: !1
				},
				adapter: ("undefined" != typeof XMLHttpRequest ? l = n("./lib/adapters/xhr.js") : "undefined" != typeof process && "[object process]" === Object.prototype.toString.call(process) && (l = n("./lib/adapters/xhr.js")), l),
				transformRequest: [function(e, t) {
					return r(t, "Accept"), r(t, "Content-Type"), i.isFormData(e) || i.isArrayBuffer(e) || i.isBuffer(e) || i.isStream(e) || i.isFile(e) || i.isBlob(e) ? e : i.isArrayBufferView(e) ? e.buffer : i.isURLSearchParams(e) ? (s(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString()) : i.isObject(e) || t && "application/json" === t["Content-Type"] ? (s(t, "application/json"), function(e, t, n) {
						if (i.isString(e)) try {
							return (t || JSON.parse)(e), i.trim(e)
						} catch (e) {
							if ("SyntaxError" !== e.name) throw e
						}
						return (n || JSON.stringify)(e)
					}(e)) : e
				}],
				transformResponse: [function(e) {
					var t = this.transitional,
						n = t && t.silentJSONParsing,
						r = t && t.forcedJSONParsing,
						a = !n && "json" === this.responseType;
					if (a || r && i.isString(e) && e.length) try {
						return JSON.parse(e)
					} catch (e) {
						if (a) {
							if ("SyntaxError" === e.name) throw o(e, this, "E_JSON_PARSE");
							throw e
						}
					}
					return e
				}],
				timeout: 0,
				xsrfCookieName: "XSRF-TOKEN",
				xsrfHeaderName: "X-XSRF-TOKEN",
				maxContentLength: -1,
				maxBodyLength: -1,
				validateStatus: function(e) {
					return e >= 200 && e < 300
				}
			};
			u.headers = {
				common: {
					Accept: "application/json, text/plain, */*"
				}
			}, i.forEach(["delete", "get", "head"], function(e) {
				u.headers[e] = {}
			}), i.forEach(["post", "put", "patch"], function(e) {
				u.headers[e] = i.merge(a)
			}), e.exports = u
		},
		"./lib/helpers/bind.js": function(e, t, n) {
			"use strict";
			e.exports = function(e, t) {
				return function() {
					for (var n = new Array(arguments.length), i = 0; i < n.length; i++) n[i] = arguments[i];
					return e.apply(t, n)
				}
			}
		},
		"./lib/helpers/buildURL.js": function(e, t, n) {
			"use strict";
			var i = n("./lib/utils.js");

			function r(e) {
				return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
			}
			e.exports = function(e, t, n) {
				if (!t) return e;
				var o;
				if (n) o = n(t);
				else if (i.isURLSearchParams(t)) o = t.toString();
				else {
					var a = [];
					i.forEach(t, function(e, t) {
						null != e && (i.isArray(e) ? t += "[]" : e = [e], i.forEach(e, function(e) {
							i.isDate(e) ? e = e.toISOString() : i.isObject(e) && (e = JSON.stringify(e)), a.push(r(t) + "=" + r(e))
						}))
					}), o = a.join("&")
				}
				if (o) {
					var s = e.indexOf("#"); - 1 !== s && (e = e.slice(0, s)), e += (-1 === e.indexOf("?") ? "?" : "&") + o
				}
				return e
			}
		},
		"./lib/helpers/combineURLs.js": function(e, t, n) {
			"use strict";
			e.exports = function(e, t) {
				return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e
			}
		},
		"./lib/helpers/cookies.js": function(e, t, n) {
			"use strict";
			var i = n("./lib/utils.js");
			e.exports = i.isStandardBrowserEnv() ? {
				write: function(e, t, n, r, o, a) {
					var s = [];
					s.push(e + "=" + encodeURIComponent(t)), i.isNumber(n) && s.push("expires=" + new Date(n).toGMTString()), i.isString(r) && s.push("path=" + r), i.isString(o) && s.push("domain=" + o), !0 === a && s.push("secure"), document.cookie = s.join("; ")
				},
				read: function(e) {
					var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
					return t ? decodeURIComponent(t[3]) : null
				},
				remove: function(e) {
					this.write(e, "", Date.now() - 864e5)
				}
			} : {
				write: function() {},
				read: function() {
					return null
				},
				remove: function() {}
			}
		},
		"./lib/helpers/isAbsoluteURL.js": function(e, t, n) {
			"use strict";
			e.exports = function(e) {
				return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)
			}
		},
		"./lib/helpers/isAxiosError.js": function(e, t, n) {
			"use strict";
			e.exports = function(e) {
				return "object" == typeof e && !0 === e.isAxiosError
			}
		},
		"./lib/helpers/isURLSameOrigin.js": function(e, t, n) {
			"use strict";
			var i = n("./lib/utils.js");
			e.exports = i.isStandardBrowserEnv() ? function() {
				var e, t = /(msie|trident)/i.test(navigator.userAgent),
					n = document.createElement("a");

				function r(e) {
					var i = e;
					return t && (n.setAttribute("href", i), i = n.href), n.setAttribute("href", i), {
						href: n.href,
						protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
						host: n.host,
						search: n.search ? n.search.replace(/^\?/, "") : "",
						hash: n.hash ? n.hash.replace(/^#/, "") : "",
						hostname: n.hostname,
						port: n.port,
						pathname: "/" === n.pathname.charAt(0) ? n.pathname : "/" + n.pathname
					}
				}
				return e = r(window.location.href),
					function(t) {
						var n = i.isString(t) ? r(t) : t;
						return n.protocol === e.protocol && n.host === e.host
					}
			}() : function() {
				return !0
			}
		},
		"./lib/helpers/normalizeHeaderName.js": function(e, t, n) {
			"use strict";
			var i = n("./lib/utils.js");
			e.exports = function(e, t) {
				i.forEach(e, function(n, i) {
					i !== t && i.toUpperCase() === t.toUpperCase() && (e[t] = n, delete e[i])
				})
			}
		},
		"./lib/helpers/parseHeaders.js": function(e, t, n) {
			"use strict";
			var i = n("./lib/utils.js"),
				r = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
			e.exports = function(e) {
				var t, n, o, a = {};
				return e ? (i.forEach(e.split("\n"), function(e) {
					if (o = e.indexOf(":"), t = i.trim(e.substr(0, o)).toLowerCase(), n = i.trim(e.substr(o + 1)), t) {
						if (a[t] && r.indexOf(t) >= 0) return;
						a[t] = "set-cookie" === t ? (a[t] ? a[t] : []).concat([n]) : a[t] ? a[t] + ", " + n : n
					}
				}), a) : a
			}
		},
		"./lib/helpers/spread.js": function(e, t, n) {
			"use strict";
			e.exports = function(e) {
				return function(t) {
					return e.apply(null, t)
				}
			}
		},
		"./lib/helpers/validator.js": function(e, t, n) {
			"use strict";
			var i = n("./package.json"),
				r = {};
			["object", "boolean", "number", "function", "string", "symbol"].forEach(function(e, t) {
				r[e] = function(n) {
					return typeof n === e || "a" + (t < 1 ? "n " : " ") + e
				}
			});
			var o = {},
				a = i.version.split(".");

			function s(e, t) {
				for (var n = t ? t.split(".") : a, i = e.split("."), r = 0; r < 3; r++) {
					if (n[r] > i[r]) return !0;
					if (n[r] < i[r]) return !1
				}
				return !1
			}
			r.transitional = function(e, t, n) {
				var r = t && s(t);

				function a(e, t) {
					return "[Axios v" + i.version + "] Transitional option '" + e + "'" + t + (n ? ". " + n : "")
				}
				return function(n, i, s) {
					if (!1 === e) throw new Error(a(i, " has been removed in " + t));
					return r && !o[i] && (o[i] = !0, console.warn(a(i, " has been deprecated since v" + t + " and will be removed in the near future"))), !e || e(n, i, s)
				}
			}, e.exports = {
				isOlderVersion: s,
				assertOptions: function(e, t, n) {
					if ("object" != typeof e) throw new TypeError("options must be an object");
					for (var i = Object.keys(e), r = i.length; r-- > 0;) {
						var o = i[r],
							a = t[o];
						if (a) {
							var s = e[o],
								l = void 0 === s || a(s, o, e);
							if (!0 !== l) throw new TypeError("option " + o + " must be " + l)
						} else if (!0 !== n) throw Error("Unknown option " + o)
					}
				},
				validators: r
			}
		},
		"./lib/utils.js": function(e, t, n) {
			"use strict";
			var i = n("./lib/helpers/bind.js"),
				r = Object.prototype.toString;

			function o(e) {
				return "[object Array]" === r.call(e)
			}

			function a(e) {
				return void 0 === e
			}

			function s(e) {
				return null !== e && "object" == typeof e
			}

			function l(e) {
				if ("[object Object]" !== r.call(e)) return !1;
				var t = Object.getPrototypeOf(e);
				return null === t || t === Object.prototype
			}

			function u(e) {
				return "[object Function]" === r.call(e)
			}

			function c(e, t) {
				if (null != e)
					if ("object" != typeof e && (e = [e]), o(e))
						for (var n = 0, i = e.length; n < i; n++) t.call(null, e[n], n, e);
					else
						for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.call(null, e[r], r, e)
			}
			e.exports = {
				isArray: o,
				isArrayBuffer: function(e) {
					return "[object ArrayBuffer]" === r.call(e)
				},
				isBuffer: function(e) {
					return null !== e && !a(e) && null !== e.constructor && !a(e.constructor) && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
				},
				isFormData: function(e) {
					return "undefined" != typeof FormData && e instanceof FormData
				},
				isArrayBufferView: function(e) {
					return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer
				},
				isString: function(e) {
					return "string" == typeof e
				},
				isNumber: function(e) {
					return "number" == typeof e
				},
				isObject: s,
				isPlainObject: l,
				isUndefined: a,
				isDate: function(e) {
					return "[object Date]" === r.call(e)
				},
				isFile: function(e) {
					return "[object File]" === r.call(e)
				},
				isBlob: function(e) {
					return "[object Blob]" === r.call(e)
				},
				isFunction: u,
				isStream: function(e) {
					return s(e) && u(e.pipe)
				},
				isURLSearchParams: function(e) {
					return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams
				},
				isStandardBrowserEnv: function() {
					return ("undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && "undefined" != typeof window && "undefined" != typeof document
				},
				forEach: c,
				merge: function e() {
					var t = {};

					function n(n, i) {
						l(t[i]) && l(n) ? t[i] = e(t[i], n) : l(n) ? t[i] = e({}, n) : o(n) ? t[i] = n.slice() : t[i] = n
					}
					for (var i = 0, r = arguments.length; i < r; i++) c(arguments[i], n);
					return t
				},
				extend: function(e, t, n) {
					return c(t, function(t, r) {
						e[r] = n && "function" == typeof t ? i(t, n) : t
					}), e
				},
				trim: function(e) {
					return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
				},
				stripBOM: function(e) {
					return 65279 === e.charCodeAt(0) && (e = e.slice(1)), e
				}
			}
		},
		"./package.json": function(e) {
			e.exports = JSON.parse('{"name":"axios","version":"0.21.4","description":"Promise based HTTP client for the browser and node.js","main":"index.js","scripts":{"test":"grunt test","start":"node ./sandbox/server.js","build":"NODE_ENV=production grunt build","preversion":"npm test","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json","postversion":"git push && git push --tags","examples":"node ./examples/server.js","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","fix":"eslint --fix lib/**/*.js"},"repository":{"type":"git","url":"https://github.com/axios/axios.git"},"keywords":["xhr","http","ajax","promise","node"],"author":"Matt Zabriskie","license":"MIT","bugs":{"url":"https://github.com/axios/axios/issues"},"homepage":"https://axios-http.com","devDependencies":{"coveralls":"^3.0.0","es6-promise":"^4.2.4","grunt":"^1.3.0","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^23.0.0","grunt-karma":"^4.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^4.0.2","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^6.3.2","karma-chrome-launcher":"^3.1.0","karma-firefox-launcher":"^2.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^4.3.6","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.8","karma-webpack":"^4.0.2","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","mocha":"^8.2.1","sinon":"^4.5.0","terser-webpack-plugin":"^4.2.3","typescript":"^4.0.5","url-search-params":"^0.10.0","webpack":"^4.44.2","webpack-dev-server":"^3.11.0"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"jsdelivr":"dist/axios.min.js","unpkg":"dist/axios.min.js","typings":"./index.d.ts","dependencies":{"follow-redirects":"^1.14.0"},"bundlesize":[{"path":"./dist/axios.min.js","threshold":"5kB"}]}')
		}
	})
}),
function(e, t) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).Chart = t()
}(this, function() {
	"use strict";
	"undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;

	function e() {
		throw new Error("Dynamic requires are not currently supported by rollup-plugin-commonjs")
	}

	function t(e, t) {
		return e(t = {
			exports: {}
		}, t.exports), t.exports
	}
	var n = {
			aliceblue: [240, 248, 255],
			antiquewhite: [250, 235, 215],
			aqua: [0, 255, 255],
			aquamarine: [127, 255, 212],
			azure: [240, 255, 255],
			beige: [245, 245, 220],
			bisque: [255, 228, 196],
			black: [0, 0, 0],
			blanchedalmond: [255, 235, 205],
			blue: [0, 0, 255],
			blueviolet: [138, 43, 226],
			brown: [165, 42, 42],
			burlywood: [222, 184, 135],
			cadetblue: [95, 158, 160],
			chartreuse: [127, 255, 0],
			chocolate: [210, 105, 30],
			coral: [255, 127, 80],
			cornflowerblue: [100, 149, 237],
			cornsilk: [255, 248, 220],
			crimson: [220, 20, 60],
			cyan: [0, 255, 255],
			darkblue: [0, 0, 139],
			darkcyan: [0, 139, 139],
			darkgoldenrod: [184, 134, 11],
			darkgray: [169, 169, 169],
			darkgreen: [0, 100, 0],
			darkgrey: [169, 169, 169],
			darkkhaki: [189, 183, 107],
			darkmagenta: [139, 0, 139],
			darkolivegreen: [85, 107, 47],
			darkorange: [255, 140, 0],
			darkorchid: [153, 50, 204],
			darkred: [139, 0, 0],
			darksalmon: [233, 150, 122],
			darkseagreen: [143, 188, 143],
			darkslateblue: [72, 61, 139],
			darkslategray: [47, 79, 79],
			darkslategrey: [47, 79, 79],
			darkturquoise: [0, 206, 209],
			darkviolet: [148, 0, 211],
			deeppink: [255, 20, 147],
			deepskyblue: [0, 191, 255],
			dimgray: [105, 105, 105],
			dimgrey: [105, 105, 105],
			dodgerblue: [30, 144, 255],
			firebrick: [178, 34, 34],
			floralwhite: [255, 250, 240],
			forestgreen: [34, 139, 34],
			fuchsia: [255, 0, 255],
			gainsboro: [220, 220, 220],
			ghostwhite: [248, 248, 255],
			gold: [255, 215, 0],
			goldenrod: [218, 165, 32],
			gray: [128, 128, 128],
			green: [0, 128, 0],
			greenyellow: [173, 255, 47],
			grey: [128, 128, 128],
			honeydew: [240, 255, 240],
			hotpink: [255, 105, 180],
			indianred: [205, 92, 92],
			indigo: [75, 0, 130],
			ivory: [255, 255, 240],
			khaki: [240, 230, 140],
			lavender: [230, 230, 250],
			lavenderblush: [255, 240, 245],
			lawngreen: [124, 252, 0],
			lemonchiffon: [255, 250, 205],
			lightblue: [173, 216, 230],
			lightcoral: [240, 128, 128],
			lightcyan: [224, 255, 255],
			lightgoldenrodyellow: [250, 250, 210],
			lightgray: [211, 211, 211],
			lightgreen: [144, 238, 144],
			lightgrey: [211, 211, 211],
			lightpink: [255, 182, 193],
			lightsalmon: [255, 160, 122],
			lightseagreen: [32, 178, 170],
			lightskyblue: [135, 206, 250],
			lightslategray: [119, 136, 153],
			lightslategrey: [119, 136, 153],
			lightsteelblue: [176, 196, 222],
			lightyellow: [255, 255, 224],
			lime: [0, 255, 0],
			limegreen: [50, 205, 50],
			linen: [250, 240, 230],
			magenta: [255, 0, 255],
			maroon: [128, 0, 0],
			mediumaquamarine: [102, 205, 170],
			mediumblue: [0, 0, 205],
			mediumorchid: [186, 85, 211],
			mediumpurple: [147, 112, 219],
			mediumseagreen: [60, 179, 113],
			mediumslateblue: [123, 104, 238],
			mediumspringgreen: [0, 250, 154],
			mediumturquoise: [72, 209, 204],
			mediumvioletred: [199, 21, 133],
			midnightblue: [25, 25, 112],
			mintcream: [245, 255, 250],
			mistyrose: [255, 228, 225],
			moccasin: [255, 228, 181],
			navajowhite: [255, 222, 173],
			navy: [0, 0, 128],
			oldlace: [253, 245, 230],
			olive: [128, 128, 0],
			olivedrab: [107, 142, 35],
			orange: [255, 165, 0],
			orangered: [255, 69, 0],
			orchid: [218, 112, 214],
			palegoldenrod: [238, 232, 170],
			palegreen: [152, 251, 152],
			paleturquoise: [175, 238, 238],
			palevioletred: [219, 112, 147],
			papayawhip: [255, 239, 213],
			peachpuff: [255, 218, 185],
			peru: [205, 133, 63],
			pink: [255, 192, 203],
			plum: [221, 160, 221],
			powderblue: [176, 224, 230],
			purple: [128, 0, 128],
			rebeccapurple: [102, 51, 153],
			red: [255, 0, 0],
			rosybrown: [188, 143, 143],
			royalblue: [65, 105, 225],
			saddlebrown: [139, 69, 19],
			salmon: [250, 128, 114],
			sandybrown: [244, 164, 96],
			seagreen: [46, 139, 87],
			seashell: [255, 245, 238],
			sienna: [160, 82, 45],
			silver: [192, 192, 192],
			skyblue: [135, 206, 235],
			slateblue: [106, 90, 205],
			slategray: [112, 128, 144],
			slategrey: [112, 128, 144],
			snow: [255, 250, 250],
			springgreen: [0, 255, 127],
			steelblue: [70, 130, 180],
			tan: [210, 180, 140],
			teal: [0, 128, 128],
			thistle: [216, 191, 216],
			tomato: [255, 99, 71],
			turquoise: [64, 224, 208],
			violet: [238, 130, 238],
			wheat: [245, 222, 179],
			white: [255, 255, 255],
			whitesmoke: [245, 245, 245],
			yellow: [255, 255, 0],
			yellowgreen: [154, 205, 50]
		},
		i = t(function(e) {
			var t = {};
			for (var i in n) n.hasOwnProperty(i) && (t[n[i]] = i);
			var r = e.exports = {
				rgb: {
					channels: 3,
					labels: "rgb"
				},
				hsl: {
					channels: 3,
					labels: "hsl"
				},
				hsv: {
					channels: 3,
					labels: "hsv"
				},
				hwb: {
					channels: 3,
					labels: "hwb"
				},
				cmyk: {
					channels: 4,
					labels: "cmyk"
				},
				xyz: {
					channels: 3,
					labels: "xyz"
				},
				lab: {
					channels: 3,
					labels: "lab"
				},
				lch: {
					channels: 3,
					labels: "lch"
				},
				hex: {
					channels: 1,
					labels: ["hex"]
				},
				keyword: {
					channels: 1,
					labels: ["keyword"]
				},
				ansi16: {
					channels: 1,
					labels: ["ansi16"]
				},
				ansi256: {
					channels: 1,
					labels: ["ansi256"]
				},
				hcg: {
					channels: 3,
					labels: ["h", "c", "g"]
				},
				apple: {
					channels: 3,
					labels: ["r16", "g16", "b16"]
				},
				gray: {
					channels: 1,
					labels: ["gray"]
				}
			};
			for (var o in r)
				if (r.hasOwnProperty(o)) {
					if (!("channels" in r[o])) throw new Error("missing channels property: " + o);
					if (!("labels" in r[o])) throw new Error("missing channel labels property: " + o);
					if (r[o].labels.length !== r[o].channels) throw new Error("channel and label counts mismatch: " + o);
					var a = r[o].channels,
						s = r[o].labels;
					delete r[o].channels, delete r[o].labels, Object.defineProperty(r[o], "channels", {
						value: a
					}), Object.defineProperty(r[o], "labels", {
						value: s
					})
				} r.rgb.hsl = function(e) {
				var t, n, i = e[0] / 255,
					r = e[1] / 255,
					o = e[2] / 255,
					a = Math.min(i, r, o),
					s = Math.max(i, r, o),
					l = s - a;
				return s === a ? t = 0 : i === s ? t = (r - o) / l : r === s ? t = 2 + (o - i) / l : o === s && (t = 4 + (i - r) / l), (t = Math.min(60 * t, 360)) < 0 && (t += 360), n = (a + s) / 2, [t, 100 * (s === a ? 0 : n <= .5 ? l / (s + a) : l / (2 - s - a)), 100 * n]
			}, r.rgb.hsv = function(e) {
				var t, n, i, r, o, a = e[0] / 255,
					s = e[1] / 255,
					l = e[2] / 255,
					u = Math.max(a, s, l),
					c = u - Math.min(a, s, l),
					d = function(e) {
						return (u - e) / 6 / c + .5
					};
				return 0 === c ? r = o = 0 : (o = c / u, t = d(a), n = d(s), i = d(l), a === u ? r = i - n : s === u ? r = 1 / 3 + t - i : l === u && (r = 2 / 3 + n - t), r < 0 ? r += 1 : r > 1 && (r -= 1)), [360 * r, 100 * o, 100 * u]
			}, r.rgb.hwb = function(e) {
				var t = e[0],
					n = e[1],
					i = e[2];
				return [r.rgb.hsl(e)[0], 100 * (1 / 255 * Math.min(t, Math.min(n, i))), 100 * (i = 1 - 1 / 255 * Math.max(t, Math.max(n, i)))]
			}, r.rgb.cmyk = function(e) {
				var t, n = e[0] / 255,
					i = e[1] / 255,
					r = e[2] / 255;
				return [100 * ((1 - n - (t = Math.min(1 - n, 1 - i, 1 - r))) / (1 - t) || 0), 100 * ((1 - i - t) / (1 - t) || 0), 100 * ((1 - r - t) / (1 - t) || 0), 100 * t]
			}, r.rgb.keyword = function(e) {
				var i = t[e];
				if (i) return i;
				var r, o, a, s = 1 / 0;
				for (var l in n)
					if (n.hasOwnProperty(l)) {
						var u = n[l],
							c = (o = e, a = u, Math.pow(o[0] - a[0], 2) + Math.pow(o[1] - a[1], 2) + Math.pow(o[2] - a[2], 2));
						c < s && (s = c, r = l)
					} return r
			}, r.keyword.rgb = function(e) {
				return n[e]
			}, r.rgb.xyz = function(e) {
				var t = e[0] / 255,
					n = e[1] / 255,
					i = e[2] / 255;
				return [100 * (.4124 * (t = t > .04045 ? Math.pow((t + .055) / 1.055, 2.4) : t / 12.92) + .3576 * (n = n > .04045 ? Math.pow((n + .055) / 1.055, 2.4) : n / 12.92) + .1805 * (i = i > .04045 ? Math.pow((i + .055) / 1.055, 2.4) : i / 12.92)), 100 * (.2126 * t + .7152 * n + .0722 * i), 100 * (.0193 * t + .1192 * n + .9505 * i)]
			}, r.rgb.lab = function(e) {
				var t = r.rgb.xyz(e),
					n = t[0],
					i = t[1],
					o = t[2];
				return i /= 100, o /= 108.883, n = (n /= 95.047) > .008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116, [116 * (i = i > .008856 ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116) - 16, 500 * (n - i), 200 * (i - (o = o > .008856 ? Math.pow(o, 1 / 3) : 7.787 * o + 16 / 116))]
			}, r.hsl.rgb = function(e) {
				var t, n, i, r, o, a = e[0] / 360,
					s = e[1] / 100,
					l = e[2] / 100;
				if (0 === s) return [o = 255 * l, o, o];
				t = 2 * l - (n = l < .5 ? l * (1 + s) : l + s - l * s), r = [0, 0, 0];
				for (var u = 0; u < 3; u++)(i = a + 1 / 3 * -(u - 1)) < 0 && i++, i > 1 && i--, o = 6 * i < 1 ? t + 6 * (n - t) * i : 2 * i < 1 ? n : 3 * i < 2 ? t + (n - t) * (2 / 3 - i) * 6 : t, r[u] = 255 * o;
				return r
			}, r.hsl.hsv = function(e) {
				var t = e[0],
					n = e[1] / 100,
					i = e[2] / 100,
					r = n,
					o = Math.max(i, .01);
				return n *= (i *= 2) <= 1 ? i : 2 - i, r *= o <= 1 ? o : 2 - o, [t, 100 * (0 === i ? 2 * r / (o + r) : 2 * n / (i + n)), 100 * ((i + n) / 2)]
			}, r.hsv.rgb = function(e) {
				var t = e[0] / 60,
					n = e[1] / 100,
					i = e[2] / 100,
					r = Math.floor(t) % 6,
					o = t - Math.floor(t),
					a = 255 * i * (1 - n),
					s = 255 * i * (1 - n * o),
					l = 255 * i * (1 - n * (1 - o));
				switch (i *= 255, r) {
					case 0:
						return [i, l, a];
					case 1:
						return [s, i, a];
					case 2:
						return [a, i, l];
					case 3:
						return [a, s, i];
					case 4:
						return [l, a, i];
					case 5:
						return [i, a, s]
				}
			}, r.hsv.hsl = function(e) {
				var t, n, i, r = e[0],
					o = e[1] / 100,
					a = e[2] / 100,
					s = Math.max(a, .01);
				return i = (2 - o) * a, n = o * s, [r, 100 * (n = (n /= (t = (2 - o) * s) <= 1 ? t : 2 - t) || 0), 100 * (i /= 2)]
			}, r.hwb.rgb = function(e) {
				var t, n, i, r, o, a, s, l = e[0] / 360,
					u = e[1] / 100,
					c = e[2] / 100,
					d = u + c;
				switch (d > 1 && (u /= d, c /= d), i = 6 * l - (t = Math.floor(6 * l)), 0 != (1 & t) && (i = 1 - i), r = u + i * ((n = 1 - c) - u), t) {
					default:
					case 6:
					case 0:
						o = n, a = r, s = u;
						break;
					case 1:
						o = r, a = n, s = u;
						break;
					case 2:
						o = u, a = n, s = r;
						break;
					case 3:
						o = u, a = r, s = n;
						break;
					case 4:
						o = r, a = u, s = n;
						break;
					case 5:
						o = n, a = u, s = r
				}
				return [255 * o, 255 * a, 255 * s]
			}, r.cmyk.rgb = function(e) {
				var t = e[0] / 100,
					n = e[1] / 100,
					i = e[2] / 100,
					r = e[3] / 100;
				return [255 * (1 - Math.min(1, t * (1 - r) + r)), 255 * (1 - Math.min(1, n * (1 - r) + r)), 255 * (1 - Math.min(1, i * (1 - r) + r))]
			}, r.xyz.rgb = function(e) {
				var t, n, i, r = e[0] / 100,
					o = e[1] / 100,
					a = e[2] / 100;
				return n = -.9689 * r + 1.8758 * o + .0415 * a, i = .0557 * r + -.204 * o + 1.057 * a, t = (t = 3.2406 * r + -1.5372 * o + -.4986 * a) > .0031308 ? 1.055 * Math.pow(t, 1 / 2.4) - .055 : 12.92 * t, n = n > .0031308 ? 1.055 * Math.pow(n, 1 / 2.4) - .055 : 12.92 * n, i = i > .0031308 ? 1.055 * Math.pow(i, 1 / 2.4) - .055 : 12.92 * i, [255 * (t = Math.min(Math.max(0, t), 1)), 255 * (n = Math.min(Math.max(0, n), 1)), 255 * (i = Math.min(Math.max(0, i), 1))]
			}, r.xyz.lab = function(e) {
				var t = e[0],
					n = e[1],
					i = e[2];
				return n /= 100, i /= 108.883, t = (t /= 95.047) > .008856 ? Math.pow(t, 1 / 3) : 7.787 * t + 16 / 116, [116 * (n = n > .008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116) - 16, 500 * (t - n), 200 * (n - (i = i > .008856 ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116))]
			}, r.lab.xyz = function(e) {
				var t, n, i, r = e[0];
				t = e[1] / 500 + (n = (r + 16) / 116), i = n - e[2] / 200;
				var o = Math.pow(n, 3),
					a = Math.pow(t, 3),
					s = Math.pow(i, 3);
				return n = o > .008856 ? o : (n - 16 / 116) / 7.787, t = a > .008856 ? a : (t - 16 / 116) / 7.787, i = s > .008856 ? s : (i - 16 / 116) / 7.787, [t *= 95.047, n *= 100, i *= 108.883]
			}, r.lab.lch = function(e) {
				var t, n = e[0],
					i = e[1],
					r = e[2];
				return (t = 360 * Math.atan2(r, i) / 2 / Math.PI) < 0 && (t += 360), [n, Math.sqrt(i * i + r * r), t]
			}, r.lch.lab = function(e) {
				var t, n = e[0],
					i = e[1];
				return t = e[2] / 360 * 2 * Math.PI, [n, i * Math.cos(t), i * Math.sin(t)]
			}, r.rgb.ansi16 = function(e) {
				var t = e[0],
					n = e[1],
					i = e[2],
					o = 1 in arguments ? arguments[1] : r.rgb.hsv(e)[2];
				if (0 === (o = Math.round(o / 50))) return 30;
				var a = 30 + (Math.round(i / 255) << 2 | Math.round(n / 255) << 1 | Math.round(t / 255));
				return 2 === o && (a += 60), a
			}, r.hsv.ansi16 = function(e) {
				return r.rgb.ansi16(r.hsv.rgb(e), e[2])
			}, r.rgb.ansi256 = function(e) {
				var t = e[0],
					n = e[1],
					i = e[2];
				return t === n && n === i ? t < 8 ? 16 : t > 248 ? 231 : Math.round((t - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(t / 255 * 5) + 6 * Math.round(n / 255 * 5) + Math.round(i / 255 * 5)
			}, r.ansi16.rgb = function(e) {
				var t = e % 10;
				if (0 === t || 7 === t) return e > 50 && (t += 3.5), [t = t / 10.5 * 255, t, t];
				var n = .5 * (1 + ~~(e > 50));
				return [(1 & t) * n * 255, (t >> 1 & 1) * n * 255, (t >> 2 & 1) * n * 255]
			}, r.ansi256.rgb = function(e) {
				if (e >= 232) {
					var t = 10 * (e - 232) + 8;
					return [t, t, t]
				}
				var n;
				return e -= 16, [Math.floor(e / 36) / 5 * 255, Math.floor((n = e % 36) / 6) / 5 * 255, n % 6 / 5 * 255]
			}, r.rgb.hex = function(e) {
				var t = (((255 & Math.round(e[0])) << 16) + ((255 & Math.round(e[1])) << 8) + (255 & Math.round(e[2]))).toString(16).toUpperCase();
				return "000000".substring(t.length) + t
			}, r.hex.rgb = function(e) {
				var t = e.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
				if (!t) return [0, 0, 0];
				var n = t[0];
				3 === t[0].length && (n = n.split("").map(function(e) {
					return e + e
				}).join(""));
				var i = parseInt(n, 16);
				return [i >> 16 & 255, i >> 8 & 255, 255 & i]
			}, r.rgb.hcg = function(e) {
				var t, n = e[0] / 255,
					i = e[1] / 255,
					r = e[2] / 255,
					o = Math.max(Math.max(n, i), r),
					a = Math.min(Math.min(n, i), r),
					s = o - a;
				return t = s <= 0 ? 0 : o === n ? (i - r) / s % 6 : o === i ? 2 + (r - n) / s : 4 + (n - i) / s + 4, t /= 6, [360 * (t %= 1), 100 * s, 100 * (s < 1 ? a / (1 - s) : 0)]
			}, r.hsl.hcg = function(e) {
				var t = e[1] / 100,
					n = e[2] / 100,
					i = 1,
					r = 0;
				return (i = n < .5 ? 2 * t * n : 2 * t * (1 - n)) < 1 && (r = (n - .5 * i) / (1 - i)), [e[0], 100 * i, 100 * r]
			}, r.hsv.hcg = function(e) {
				var t = e[1] / 100,
					n = e[2] / 100,
					i = t * n,
					r = 0;
				return i < 1 && (r = (n - i) / (1 - i)), [e[0], 100 * i, 100 * r]
			}, r.hcg.rgb = function(e) {
				var t = e[0] / 360,
					n = e[1] / 100,
					i = e[2] / 100;
				if (0 === n) return [255 * i, 255 * i, 255 * i];
				var r, o = [0, 0, 0],
					a = t % 1 * 6,
					s = a % 1,
					l = 1 - s;
				switch (Math.floor(a)) {
					case 0:
						o[0] = 1, o[1] = s, o[2] = 0;
						break;
					case 1:
						o[0] = l, o[1] = 1, o[2] = 0;
						break;
					case 2:
						o[0] = 0, o[1] = 1, o[2] = s;
						break;
					case 3:
						o[0] = 0, o[1] = l, o[2] = 1;
						break;
					case 4:
						o[0] = s, o[1] = 0, o[2] = 1;
						break;
					default:
						o[0] = 1, o[1] = 0, o[2] = l
				}
				return r = (1 - n) * i, [255 * (n * o[0] + r), 255 * (n * o[1] + r), 255 * (n * o[2] + r)]
			}, r.hcg.hsv = function(e) {
				var t = e[1] / 100,
					n = t + e[2] / 100 * (1 - t),
					i = 0;
				return n > 0 && (i = t / n), [e[0], 100 * i, 100 * n]
			}, r.hcg.hsl = function(e) {
				var t = e[1] / 100,
					n = e[2] / 100 * (1 - t) + .5 * t,
					i = 0;
				return n > 0 && n < .5 ? i = t / (2 * n) : n >= .5 && n < 1 && (i = t / (2 * (1 - n))), [e[0], 100 * i, 100 * n]
			}, r.hcg.hwb = function(e) {
				var t = e[1] / 100,
					n = t + e[2] / 100 * (1 - t);
				return [e[0], 100 * (n - t), 100 * (1 - n)]
			}, r.hwb.hcg = function(e) {
				var t = e[1] / 100,
					n = 1 - e[2] / 100,
					i = n - t,
					r = 0;
				return i < 1 && (r = (n - i) / (1 - i)), [e[0], 100 * i, 100 * r]
			}, r.apple.rgb = function(e) {
				return [e[0] / 65535 * 255, e[1] / 65535 * 255, e[2] / 65535 * 255]
			}, r.rgb.apple = function(e) {
				return [e[0] / 255 * 65535, e[1] / 255 * 65535, e[2] / 255 * 65535]
			}, r.gray.rgb = function(e) {
				return [e[0] / 100 * 255, e[0] / 100 * 255, e[0] / 100 * 255]
			}, r.gray.hsl = r.gray.hsv = function(e) {
				return [0, 0, e[0]]
			}, r.gray.hwb = function(e) {
				return [0, 100, e[0]]
			}, r.gray.cmyk = function(e) {
				return [0, 0, 0, e[0]]
			}, r.gray.lab = function(e) {
				return [e[0], 0, 0]
			}, r.gray.hex = function(e) {
				var t = 255 & Math.round(e[0] / 100 * 255),
					n = ((t << 16) + (t << 8) + t).toString(16).toUpperCase();
				return "000000".substring(n.length) + n
			}, r.rgb.gray = function(e) {
				return [(e[0] + e[1] + e[2]) / 3 / 255 * 100]
			}
		});
	i.rgb, i.hsl, i.hsv, i.hwb, i.cmyk, i.xyz, i.lab, i.lch, i.hex, i.keyword, i.ansi16, i.ansi256, i.hcg, i.apple, i.gray;

	function r(e) {
		var t = function() {
				for (var e = {}, t = Object.keys(i), n = t.length, r = 0; r < n; r++) e[t[r]] = {
					distance: -1,
					parent: null
				};
				return e
			}(),
			n = [e];
		for (t[e].distance = 0; n.length;)
			for (var r = n.pop(), o = Object.keys(i[r]), a = o.length, s = 0; s < a; s++) {
				var l = o[s],
					u = t[l]; - 1 === u.distance && (u.distance = t[r].distance + 1, u.parent = r, n.unshift(l))
			}
		return t
	}

	function o(e, t) {
		return function(n) {
			return t(e(n))
		}
	}

	function a(e, t) {
		for (var n = [t[e].parent, e], r = i[t[e].parent][e], a = t[e].parent; t[a].parent;) n.unshift(t[a].parent), r = o(i[t[a].parent][a], r), a = t[a].parent;
		return r.conversion = n, r
	}
	var s = {};
	Object.keys(i).forEach(function(e) {
		s[e] = {}, Object.defineProperty(s[e], "channels", {
			value: i[e].channels
		}), Object.defineProperty(s[e], "labels", {
			value: i[e].labels
		});
		var t = function(e) {
			for (var t = r(e), n = {}, i = Object.keys(t), o = i.length, s = 0; s < o; s++) {
				var l = i[s];
				null !== t[l].parent && (n[l] = a(l, t))
			}
			return n
		}(e);
		Object.keys(t).forEach(function(n) {
			var i = t[n];
			s[e][n] = function(e) {
				var t = function(t) {
					if (null == t) return t;
					arguments.length > 1 && (t = Array.prototype.slice.call(arguments));
					var n = e(t);
					if ("object" == typeof n)
						for (var i = n.length, r = 0; r < i; r++) n[r] = Math.round(n[r]);
					return n
				};
				return "conversion" in e && (t.conversion = e.conversion), t
			}(i), s[e][n].raw = function(e) {
				var t = function(t) {
					return null == t ? t : (arguments.length > 1 && (t = Array.prototype.slice.call(arguments)), e(t))
				};
				return "conversion" in e && (t.conversion = e.conversion), t
			}(i)
		})
	});
	var l = s,
		u = {
			aliceblue: [240, 248, 255],
			antiquewhite: [250, 235, 215],
			aqua: [0, 255, 255],
			aquamarine: [127, 255, 212],
			azure: [240, 255, 255],
			beige: [245, 245, 220],
			bisque: [255, 228, 196],
			black: [0, 0, 0],
			blanchedalmond: [255, 235, 205],
			blue: [0, 0, 255],
			blueviolet: [138, 43, 226],
			brown: [165, 42, 42],
			burlywood: [222, 184, 135],
			cadetblue: [95, 158, 160],
			chartreuse: [127, 255, 0],
			chocolate: [210, 105, 30],
			coral: [255, 127, 80],
			cornflowerblue: [100, 149, 237],
			cornsilk: [255, 248, 220],
			crimson: [220, 20, 60],
			cyan: [0, 255, 255],
			darkblue: [0, 0, 139],
			darkcyan: [0, 139, 139],
			darkgoldenrod: [184, 134, 11],
			darkgray: [169, 169, 169],
			darkgreen: [0, 100, 0],
			darkgrey: [169, 169, 169],
			darkkhaki: [189, 183, 107],
			darkmagenta: [139, 0, 139],
			darkolivegreen: [85, 107, 47],
			darkorange: [255, 140, 0],
			darkorchid: [153, 50, 204],
			darkred: [139, 0, 0],
			darksalmon: [233, 150, 122],
			darkseagreen: [143, 188, 143],
			darkslateblue: [72, 61, 139],
			darkslategray: [47, 79, 79],
			darkslategrey: [47, 79, 79],
			darkturquoise: [0, 206, 209],
			darkviolet: [148, 0, 211],
			deeppink: [255, 20, 147],
			deepskyblue: [0, 191, 255],
			dimgray: [105, 105, 105],
			dimgrey: [105, 105, 105],
			dodgerblue: [30, 144, 255],
			firebrick: [178, 34, 34],
			floralwhite: [255, 250, 240],
			forestgreen: [34, 139, 34],
			fuchsia: [255, 0, 255],
			gainsboro: [220, 220, 220],
			ghostwhite: [248, 248, 255],
			gold: [255, 215, 0],
			goldenrod: [218, 165, 32],
			gray: [128, 128, 128],
			green: [0, 128, 0],
			greenyellow: [173, 255, 47],
			grey: [128, 128, 128],
			honeydew: [240, 255, 240],
			hotpink: [255, 105, 180],
			indianred: [205, 92, 92],
			indigo: [75, 0, 130],
			ivory: [255, 255, 240],
			khaki: [240, 230, 140],
			lavender: [230, 230, 250],
			lavenderblush: [255, 240, 245],
			lawngreen: [124, 252, 0],
			lemonchiffon: [255, 250, 205],
			lightblue: [173, 216, 230],
			lightcoral: [240, 128, 128],
			lightcyan: [224, 255, 255],
			lightgoldenrodyellow: [250, 250, 210],
			lightgray: [211, 211, 211],
			lightgreen: [144, 238, 144],
			lightgrey: [211, 211, 211],
			lightpink: [255, 182, 193],
			lightsalmon: [255, 160, 122],
			lightseagreen: [32, 178, 170],
			lightskyblue: [135, 206, 250],
			lightslategray: [119, 136, 153],
			lightslategrey: [119, 136, 153],
			lightsteelblue: [176, 196, 222],
			lightyellow: [255, 255, 224],
			lime: [0, 255, 0],
			limegreen: [50, 205, 50],
			linen: [250, 240, 230],
			magenta: [255, 0, 255],
			maroon: [128, 0, 0],
			mediumaquamarine: [102, 205, 170],
			mediumblue: [0, 0, 205],
			mediumorchid: [186, 85, 211],
			mediumpurple: [147, 112, 219],
			mediumseagreen: [60, 179, 113],
			mediumslateblue: [123, 104, 238],
			mediumspringgreen: [0, 250, 154],
			mediumturquoise: [72, 209, 204],
			mediumvioletred: [199, 21, 133],
			midnightblue: [25, 25, 112],
			mintcream: [245, 255, 250],
			mistyrose: [255, 228, 225],
			moccasin: [255, 228, 181],
			navajowhite: [255, 222, 173],
			navy: [0, 0, 128],
			oldlace: [253, 245, 230],
			olive: [128, 128, 0],
			olivedrab: [107, 142, 35],
			orange: [255, 165, 0],
			orangered: [255, 69, 0],
			orchid: [218, 112, 214],
			palegoldenrod: [238, 232, 170],
			palegreen: [152, 251, 152],
			paleturquoise: [175, 238, 238],
			palevioletred: [219, 112, 147],
			papayawhip: [255, 239, 213],
			peachpuff: [255, 218, 185],
			peru: [205, 133, 63],
			pink: [255, 192, 203],
			plum: [221, 160, 221],
			powderblue: [176, 224, 230],
			purple: [128, 0, 128],
			rebeccapurple: [102, 51, 153],
			red: [255, 0, 0],
			rosybrown: [188, 143, 143],
			royalblue: [65, 105, 225],
			saddlebrown: [139, 69, 19],
			salmon: [250, 128, 114],
			sandybrown: [244, 164, 96],
			seagreen: [46, 139, 87],
			seashell: [255, 245, 238],
			sienna: [160, 82, 45],
			silver: [192, 192, 192],
			skyblue: [135, 206, 235],
			slateblue: [106, 90, 205],
			slategray: [112, 128, 144],
			slategrey: [112, 128, 144],
			snow: [255, 250, 250],
			springgreen: [0, 255, 127],
			steelblue: [70, 130, 180],
			tan: [210, 180, 140],
			teal: [0, 128, 128],
			thistle: [216, 191, 216],
			tomato: [255, 99, 71],
			turquoise: [64, 224, 208],
			violet: [238, 130, 238],
			wheat: [245, 222, 179],
			white: [255, 255, 255],
			whitesmoke: [245, 245, 245],
			yellow: [255, 255, 0],
			yellowgreen: [154, 205, 50]
		},
		c = {
			getRgba: d,
			getHsla: f,
			getRgb: function(e) {
				var t = d(e);
				return t && t.slice(0, 3)
			},
			getHsl: function(e) {
				var t = f(e);
				return t && t.slice(0, 3)
			},
			getHwb: h,
			getAlpha: function(e) {
				var t = d(e);
				if (t) return t[3];
				if (t = f(e)) return t[3];
				if (t = h(e)) return t[3]
			},
			hexString: function(e, t) {
				var t = void 0 !== t && 3 === e.length ? t : e[3];
				return "#" + b(e[0]) + b(e[1]) + b(e[2]) + (t >= 0 && t < 1 ? b(Math.round(255 * t)) : "")
			},
			rgbString: function(e, t) {
				if (t < 1 || e[3] && e[3] < 1) return p(e, t);
				return "rgb(" + e[0] + ", " + e[1] + ", " + e[2] + ")"
			},
			rgbaString: p,
			percentString: function(e, t) {
				if (t < 1 || e[3] && e[3] < 1) return g(e, t);
				var n = Math.round(e[0] / 255 * 100),
					i = Math.round(e[1] / 255 * 100),
					r = Math.round(e[2] / 255 * 100);
				return "rgb(" + n + "%, " + i + "%, " + r + "%)"
			},
			percentaString: g,
			hslString: function(e, t) {
				if (t < 1 || e[3] && e[3] < 1) return m(e, t);
				return "hsl(" + e[0] + ", " + e[1] + "%, " + e[2] + "%)"
			},
			hslaString: m,
			hwbString: function(e, t) {
				void 0 === t && (t = void 0 !== e[3] ? e[3] : 1);
				return "hwb(" + e[0] + ", " + e[1] + "%, " + e[2] + "%" + (void 0 !== t && 1 !== t ? ", " + t : "") + ")"
			},
			keyword: function(e) {
				return y[e.slice(0, 3)]
			}
		};

	function d(e) {
		if (e) {
			var t = [0, 0, 0],
				n = 1,
				i = e.match(/^#([a-fA-F0-9]{3,4})$/i),
				r = "";
			if (i) {
				r = (i = i[1])[3];
				for (var o = 0; o < t.length; o++) t[o] = parseInt(i[o] + i[o], 16);
				r && (n = Math.round(parseInt(r + r, 16) / 255 * 100) / 100)
			} else if (i = e.match(/^#([a-fA-F0-9]{6}([a-fA-F0-9]{2})?)$/i)) {
				r = i[2], i = i[1];
				for (o = 0; o < t.length; o++) t[o] = parseInt(i.slice(2 * o, 2 * o + 2), 16);
				r && (n = Math.round(parseInt(r, 16) / 255 * 100) / 100)
			} else if (i = e.match(/^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i)) {
				for (o = 0; o < t.length; o++) t[o] = parseInt(i[o + 1]);
				n = parseFloat(i[4])
			} else if (i = e.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i)) {
				for (o = 0; o < t.length; o++) t[o] = Math.round(2.55 * parseFloat(i[o + 1]));
				n = parseFloat(i[4])
			} else if (i = e.match(/(\w+)/)) {
				if ("transparent" == i[1]) return [0, 0, 0, 0];
				if (!(t = u[i[1]])) return
			}
			for (o = 0; o < t.length; o++) t[o] = v(t[o], 0, 255);
			return n = n || 0 == n ? v(n, 0, 1) : 1, t[3] = n, t
		}
	}

	function f(e) {
		if (e) {
			var t = e.match(/^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/);
			if (t) {
				var n = parseFloat(t[4]);
				return [v(parseInt(t[1]), 0, 360), v(parseFloat(t[2]), 0, 100), v(parseFloat(t[3]), 0, 100), v(isNaN(n) ? 1 : n, 0, 1)]
			}
		}
	}

	function h(e) {
		if (e) {
			var t = e.match(/^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/);
			if (t) {
				var n = parseFloat(t[4]);
				return [v(parseInt(t[1]), 0, 360), v(parseFloat(t[2]), 0, 100), v(parseFloat(t[3]), 0, 100), v(isNaN(n) ? 1 : n, 0, 1)]
			}
		}
	}

	function p(e, t) {
		return void 0 === t && (t = void 0 !== e[3] ? e[3] : 1), "rgba(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + t + ")"
	}

	function g(e, t) {
		return "rgba(" + Math.round(e[0] / 255 * 100) + "%, " + Math.round(e[1] / 255 * 100) + "%, " + Math.round(e[2] / 255 * 100) + "%, " + (t || e[3] || 1) + ")"
	}

	function m(e, t) {
		return void 0 === t && (t = void 0 !== e[3] ? e[3] : 1), "hsla(" + e[0] + ", " + e[1] + "%, " + e[2] + "%, " + t + ")"
	}

	function v(e, t, n) {
		return Math.min(Math.max(t, e), n)
	}

	function b(e) {
		var t = e.toString(16).toUpperCase();
		return t.length < 2 ? "0" + t : t
	}
	var y = {};
	for (var _ in u) y[u[_]] = _;
	var x = function(e) {
		return e instanceof x ? e : this instanceof x ? (this.valid = !1, this.values = {
			rgb: [0, 0, 0],
			hsl: [0, 0, 0],
			hsv: [0, 0, 0],
			hwb: [0, 0, 0],
			cmyk: [0, 0, 0, 0],
			alpha: 1
		}, void("string" == typeof e ? (t = c.getRgba(e)) ? this.setValues("rgb", t) : (t = c.getHsla(e)) ? this.setValues("hsl", t) : (t = c.getHwb(e)) && this.setValues("hwb", t) : "object" == typeof e && (void 0 !== (t = e).r || void 0 !== t.red ? this.setValues("rgb", t) : void 0 !== t.l || void 0 !== t.lightness ? this.setValues("hsl", t) : void 0 !== t.v || void 0 !== t.value ? this.setValues("hsv", t) : void 0 !== t.w || void 0 !== t.whiteness ? this.setValues("hwb", t) : void 0 === t.c && void 0 === t.cyan || this.setValues("cmyk", t)))) : new x(e);
		var t
	};
	x.prototype = {
		isValid: function() {
			return this.valid
		},
		rgb: function() {
			return this.setSpace("rgb", arguments)
		},
		hsl: function() {
			return this.setSpace("hsl", arguments)
		},
		hsv: function() {
			return this.setSpace("hsv", arguments)
		},
		hwb: function() {
			return this.setSpace("hwb", arguments)
		},
		cmyk: function() {
			return this.setSpace("cmyk", arguments)
		},
		rgbArray: function() {
			return this.values.rgb
		},
		hslArray: function() {
			return this.values.hsl
		},
		hsvArray: function() {
			return this.values.hsv
		},
		hwbArray: function() {
			var e = this.values;
			return 1 !== e.alpha ? e.hwb.concat([e.alpha]) : e.hwb
		},
		cmykArray: function() {
			return this.values.cmyk
		},
		rgbaArray: function() {
			var e = this.values;
			return e.rgb.concat([e.alpha])
		},
		hslaArray: function() {
			var e = this.values;
			return e.hsl.concat([e.alpha])
		},
		alpha: function(e) {
			return void 0 === e ? this.values.alpha : (this.setValues("alpha", e), this)
		},
		red: function(e) {
			return this.setChannel("rgb", 0, e)
		},
		green: function(e) {
			return this.setChannel("rgb", 1, e)
		},
		blue: function(e) {
			return this.setChannel("rgb", 2, e)
		},
		hue: function(e) {
			return e && (e = (e %= 360) < 0 ? 360 + e : e), this.setChannel("hsl", 0, e)
		},
		saturation: function(e) {
			return this.setChannel("hsl", 1, e)
		},
		lightness: function(e) {
			return this.setChannel("hsl", 2, e)
		},
		saturationv: function(e) {
			return this.setChannel("hsv", 1, e)
		},
		whiteness: function(e) {
			return this.setChannel("hwb", 1, e)
		},
		blackness: function(e) {
			return this.setChannel("hwb", 2, e)
		},
		value: function(e) {
			return this.setChannel("hsv", 2, e)
		},
		cyan: function(e) {
			return this.setChannel("cmyk", 0, e)
		},
		magenta: function(e) {
			return this.setChannel("cmyk", 1, e)
		},
		yellow: function(e) {
			return this.setChannel("cmyk", 2, e)
		},
		black: function(e) {
			return this.setChannel("cmyk", 3, e)
		},
		hexString: function() {
			return c.hexString(this.values.rgb)
		},
		rgbString: function() {
			return c.rgbString(this.values.rgb, this.values.alpha)
		},
		rgbaString: function() {
			return c.rgbaString(this.values.rgb, this.values.alpha)
		},
		percentString: function() {
			return c.percentString(this.values.rgb, this.values.alpha)
		},
		hslString: function() {
			return c.hslString(this.values.hsl, this.values.alpha)
		},
		hslaString: function() {
			return c.hslaString(this.values.hsl, this.values.alpha)
		},
		hwbString: function() {
			return c.hwbString(this.values.hwb, this.values.alpha)
		},
		keyword: function() {
			return c.keyword(this.values.rgb, this.values.alpha)
		},
		rgbNumber: function() {
			var e = this.values.rgb;
			return e[0] << 16 | e[1] << 8 | e[2]
		},
		luminosity: function() {
			for (var e = this.values.rgb, t = [], n = 0; n < e.length; n++) {
				var i = e[n] / 255;
				t[n] = i <= .03928 ? i / 12.92 : Math.pow((i + .055) / 1.055, 2.4)
			}
			return .2126 * t[0] + .7152 * t[1] + .0722 * t[2]
		},
		contrast: function(e) {
			var t = this.luminosity(),
				n = e.luminosity();
			return t > n ? (t + .05) / (n + .05) : (n + .05) / (t + .05)
		},
		level: function(e) {
			var t = this.contrast(e);
			return t >= 7.1 ? "AAA" : t >= 4.5 ? "AA" : ""
		},
		dark: function() {
			var e = this.values.rgb;
			return (299 * e[0] + 587 * e[1] + 114 * e[2]) / 1e3 < 128
		},
		light: function() {
			return !this.dark()
		},
		negate: function() {
			for (var e = [], t = 0; t < 3; t++) e[t] = 255 - this.values.rgb[t];
			return this.setValues("rgb", e), this
		},
		lighten: function(e) {
			var t = this.values.hsl;
			return t[2] += t[2] * e, this.setValues("hsl", t), this
		},
		darken: function(e) {
			var t = this.values.hsl;
			return t[2] -= t[2] * e, this.setValues("hsl", t), this
		},
		saturate: function(e) {
			var t = this.values.hsl;
			return t[1] += t[1] * e, this.setValues("hsl", t), this
		},
		desaturate: function(e) {
			var t = this.values.hsl;
			return t[1] -= t[1] * e, this.setValues("hsl", t), this
		},
		whiten: function(e) {
			var t = this.values.hwb;
			return t[1] += t[1] * e, this.setValues("hwb", t), this
		},
		blacken: function(e) {
			var t = this.values.hwb;
			return t[2] += t[2] * e, this.setValues("hwb", t), this
		},
		greyscale: function() {
			var e = this.values.rgb,
				t = .3 * e[0] + .59 * e[1] + .11 * e[2];
			return this.setValues("rgb", [t, t, t]), this
		},
		clearer: function(e) {
			var t = this.values.alpha;
			return this.setValues("alpha", t - t * e), this
		},
		opaquer: function(e) {
			var t = this.values.alpha;
			return this.setValues("alpha", t + t * e), this
		},
		rotate: function(e) {
			var t = this.values.hsl,
				n = (t[0] + e) % 360;
			return t[0] = n < 0 ? 360 + n : n, this.setValues("hsl", t), this
		},
		mix: function(e, t) {
			var n = e,
				i = void 0 === t ? .5 : t,
				r = 2 * i - 1,
				o = this.alpha() - n.alpha(),
				a = ((r * o == -1 ? r : (r + o) / (1 + r * o)) + 1) / 2,
				s = 1 - a;
			return this.rgb(a * this.red() + s * n.red(), a * this.green() + s * n.green(), a * this.blue() + s * n.blue()).alpha(this.alpha() * i + n.alpha() * (1 - i))
		},
		toJSON: function() {
			return this.rgb()
		},
		clone: function() {
			var e, t, n = new x,
				i = this.values,
				r = n.values;
			for (var o in i) i.hasOwnProperty(o) && (e = i[o], "[object Array]" === (t = {}.toString.call(e)) ? r[o] = e.slice(0) : "[object Number]" === t ? r[o] = e : console.error("unexpected color value:", e));
			return n
		}
	}, x.prototype.spaces = {
		rgb: ["red", "green", "blue"],
		hsl: ["hue", "saturation", "lightness"],
		hsv: ["hue", "saturation", "value"],
		hwb: ["hue", "whiteness", "blackness"],
		cmyk: ["cyan", "magenta", "yellow", "black"]
	}, x.prototype.maxes = {
		rgb: [255, 255, 255],
		hsl: [360, 100, 100],
		hsv: [360, 100, 100],
		hwb: [360, 100, 100],
		cmyk: [100, 100, 100, 100]
	}, x.prototype.getValues = function(e) {
		for (var t = this.values, n = {}, i = 0; i < e.length; i++) n[e.charAt(i)] = t[e][i];
		return 1 !== t.alpha && (n.a = t.alpha), n
	}, x.prototype.setValues = function(e, t) {
		var n, i, r = this.values,
			o = this.spaces,
			a = this.maxes,
			s = 1;
		if (this.valid = !0, "alpha" === e) s = t;
		else if (t.length) r[e] = t.slice(0, e.length), s = t[e.length];
		else if (void 0 !== t[e.charAt(0)]) {
			for (n = 0; n < e.length; n++) r[e][n] = t[e.charAt(n)];
			s = t.a
		} else if (void 0 !== t[o[e][0]]) {
			var u = o[e];
			for (n = 0; n < e.length; n++) r[e][n] = t[u[n]];
			s = t.alpha
		}
		if (r.alpha = Math.max(0, Math.min(1, void 0 === s ? r.alpha : s)), "alpha" === e) return !1;
		for (n = 0; n < e.length; n++) i = Math.max(0, Math.min(a[e][n], r[e][n])), r[e][n] = Math.round(i);
		for (var c in o) c !== e && (r[c] = l[e][c](r[e]));
		return !0
	}, x.prototype.setSpace = function(e, t) {
		var n = t[0];
		return void 0 === n ? this.getValues(e) : ("number" == typeof n && (n = Array.prototype.slice.call(t)), this.setValues(e, n), this)
	}, x.prototype.setChannel = function(e, t, n) {
		var i = this.values[e];
		return void 0 === n ? i[t] : n === i[t] ? this : (i[t] = n, this.setValues(e, i), this)
	}, "undefined" != typeof window && (window.Color = x);
	var w = x;

	function k(e) {
		return -1 === ["__proto__", "prototype", "constructor"].indexOf(e)
	}
	var S, C = {
			noop: function() {},
			uid: (S = 0, function() {
				return S++
			}),
			isNullOrUndef: function(e) {
				return null == e
			},
			isArray: function(e) {
				if (Array.isArray && Array.isArray(e)) return !0;
				var t = Object.prototype.toString.call(e);
				return "[object" === t.substr(0, 7) && "Array]" === t.substr(-6)
			},
			isObject: function(e) {
				return null !== e && "[object Object]" === Object.prototype.toString.call(e)
			},
			isFinite: function(e) {
				return ("number" == typeof e || e instanceof Number) && isFinite(e)
			},
			valueOrDefault: function(e, t) {
				return void 0 === e ? t : e
			},
			valueAtIndexOrDefault: function(e, t, n) {
				return C.valueOrDefault(C.isArray(e) ? e[t] : e, n)
			},
			callback: function(e, t, n) {
				if (e && "function" == typeof e.call) return e.apply(n, t)
			},
			each: function(e, t, n, i) {
				var r, o, a;
				if (C.isArray(e))
					if (o = e.length, i)
						for (r = o - 1; r >= 0; r--) t.call(n, e[r], r);
					else
						for (r = 0; r < o; r++) t.call(n, e[r], r);
				else if (C.isObject(e))
					for (o = (a = Object.keys(e)).length, r = 0; r < o; r++) t.call(n, e[a[r]], a[r])
			},
			arrayEquals: function(e, t) {
				var n, i, r, o;
				if (!e || !t || e.length !== t.length) return !1;
				for (n = 0, i = e.length; n < i; ++n)
					if (r = e[n], o = t[n], r instanceof Array && o instanceof Array) {
						if (!C.arrayEquals(r, o)) return !1
					} else if (r !== o) return !1;
				return !0
			},
			clone: function(e) {
				if (C.isArray(e)) return e.map(C.clone);
				if (C.isObject(e)) {
					for (var t = Object.create(e), n = Object.keys(e), i = n.length, r = 0; r < i; ++r) t[n[r]] = C.clone(e[n[r]]);
					return t
				}
				return e
			},
			_merger: function(e, t, n, i) {
				if (k(e)) {
					var r = t[e],
						o = n[e];
					C.isObject(r) && C.isObject(o) ? C.merge(r, o, i) : t[e] = C.clone(o)
				}
			},
			_mergerIf: function(e, t, n) {
				if (k(e)) {
					var i = t[e],
						r = n[e];
					C.isObject(i) && C.isObject(r) ? C.mergeIf(i, r) : t.hasOwnProperty(e) || (t[e] = C.clone(r))
				}
			},
			merge: function(e, t, n) {
				var i, r, o, a, s, l = C.isArray(t) ? t : [t],
					u = l.length;
				if (!C.isObject(e)) return e;
				for (i = (n = n || {}).merger || C._merger, r = 0; r < u; ++r)
					if (t = l[r], C.isObject(t))
						for (s = 0, a = (o = Object.keys(t)).length; s < a; ++s) i(o[s], e, t, n);
				return e
			},
			mergeIf: function(e, t) {
				return C.merge(e, t, {
					merger: C._mergerIf
				})
			},
			extend: Object.assign || function(e) {
				return C.merge(e, [].slice.call(arguments, 1), {
					merger: function(e, t, n) {
						t[e] = n[e]
					}
				})
			},
			inherits: function(e) {
				var t = this,
					n = e && e.hasOwnProperty("constructor") ? e.constructor : function() {
						return t.apply(this, arguments)
					},
					i = function() {
						this.constructor = n
					};
				return i.prototype = t.prototype, n.prototype = new i, n.extend = C.inherits, e && C.extend(n.prototype, e), n.__super__ = t.prototype, n
			},
			_deprecated: function(e, t, n, i) {
				void 0 !== t && console.warn(e + ': "' + n + '" is deprecated. Please use "' + i + '" instead')
			}
		},
		T = C;
	C.callCallback = C.callback, C.indexOf = function(e, t, n) {
		return Array.prototype.indexOf.call(e, t, n)
	}, C.getValueOrDefault = C.valueOrDefault, C.getValueAtIndexOrDefault = C.valueAtIndexOrDefault;
	var D = {
			linear: function(e) {
				return e
			},
			easeInQuad: function(e) {
				return e * e
			},
			easeOutQuad: function(e) {
				return -e * (e - 2)
			},
			easeInOutQuad: function(e) {
				return (e /= .5) < 1 ? .5 * e * e : -.5 * (--e * (e - 2) - 1)
			},
			easeInCubic: function(e) {
				return e * e * e
			},
			easeOutCubic: function(e) {
				return (e -= 1) * e * e + 1
			},
			easeInOutCubic: function(e) {
				return (e /= .5) < 1 ? .5 * e * e * e : .5 * ((e -= 2) * e * e + 2)
			},
			easeInQuart: function(e) {
				return e * e * e * e
			},
			easeOutQuart: function(e) {
				return -((e -= 1) * e * e * e - 1)
			},
			easeInOutQuart: function(e) {
				return (e /= .5) < 1 ? .5 * e * e * e * e : -.5 * ((e -= 2) * e * e * e - 2)
			},
			easeInQuint: function(e) {
				return e * e * e * e * e
			},
			easeOutQuint: function(e) {
				return (e -= 1) * e * e * e * e + 1
			},
			easeInOutQuint: function(e) {
				return (e /= .5) < 1 ? .5 * e * e * e * e * e : .5 * ((e -= 2) * e * e * e * e + 2)
			},
			easeInSine: function(e) {
				return 1 - Math.cos(e * (Math.PI / 2))
			},
			easeOutSine: function(e) {
				return Math.sin(e * (Math.PI / 2))
			},
			easeInOutSine: function(e) {
				return -.5 * (Math.cos(Math.PI * e) - 1)
			},
			easeInExpo: function(e) {
				return 0 === e ? 0 : Math.pow(2, 10 * (e - 1))
			},
			easeOutExpo: function(e) {
				return 1 === e ? 1 : 1 - Math.pow(2, -10 * e)
			},
			easeInOutExpo: function(e) {
				return 0 === e ? 0 : 1 === e ? 1 : (e /= .5) < 1 ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (2 - Math.pow(2, -10 * --e))
			},
			easeInCirc: function(e) {
				return e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1)
			},
			easeOutCirc: function(e) {
				return Math.sqrt(1 - (e -= 1) * e)
			},
			easeInOutCirc: function(e) {
				return (e /= .5) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
			},
			easeInElastic: function(e) {
				var t = 1.70158,
					n = 0,
					i = 1;
				return 0 === e ? 0 : 1 === e ? 1 : (n || (n = .3), i < 1 ? (i = 1, t = n / 4) : t = n / (2 * Math.PI) * Math.asin(1 / i), -i * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * (2 * Math.PI) / n))
			},
			easeOutElastic: function(e) {
				var t = 1.70158,
					n = 0,
					i = 1;
				return 0 === e ? 0 : 1 === e ? 1 : (n || (n = .3), i < 1 ? (i = 1, t = n / 4) : t = n / (2 * Math.PI) * Math.asin(1 / i), i * Math.pow(2, -10 * e) * Math.sin((e - t) * (2 * Math.PI) / n) + 1)
			},
			easeInOutElastic: function(e) {
				var t = 1.70158,
					n = 0,
					i = 1;
				return 0 === e ? 0 : 2 == (e /= .5) ? 1 : (n || (n = .45), i < 1 ? (i = 1, t = n / 4) : t = n / (2 * Math.PI) * Math.asin(1 / i), e < 1 ? i * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * (2 * Math.PI) / n) * -.5 : i * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - t) * (2 * Math.PI) / n) * .5 + 1)
			},
			easeInBack: function(e) {
				var t = 1.70158;
				return e * e * ((t + 1) * e - t)
			},
			easeOutBack: function(e) {
				var t = 1.70158;
				return (e -= 1) * e * ((t + 1) * e + t) + 1
			},
			easeInOutBack: function(e) {
				var t = 1.70158;
				return (e /= .5) < 1 ? e * e * ((1 + (t *= 1.525)) * e - t) * .5 : .5 * ((e -= 2) * e * ((1 + (t *= 1.525)) * e + t) + 2)
			},
			easeInBounce: function(e) {
				return 1 - D.easeOutBounce(1 - e)
			},
			easeOutBounce: function(e) {
				return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
			},
			easeInOutBounce: function(e) {
				return e < .5 ? .5 * D.easeInBounce(2 * e) : .5 * D.easeOutBounce(2 * e - 1) + .5
			}
		},
		M = {
			effects: D
		};
	T.easingEffects = D;
	var E = Math.PI,
		A = E / 180,
		P = 2 * E,
		O = E / 2,
		N = E / 4,
		R = 2 * E / 3,
		I = {
			clear: function(e) {
				e.ctx.clearRect(0, 0, e.width, e.height)
			},
			roundedRect: function(e, t, n, i, r, o) {
				if (o) {
					var a = Math.min(o, r / 2, i / 2),
						s = t + a,
						l = n + a,
						u = t + i - a,
						c = n + r - a;
					e.moveTo(t, l), s < u && l < c ? (e.arc(s, l, a, -E, -O), e.arc(u, l, a, -O, 0), e.arc(u, c, a, 0, O), e.arc(s, c, a, O, E)) : s < u ? (e.moveTo(s, n), e.arc(u, l, a, -O, O), e.arc(s, l, a, O, E + O)) : l < c ? (e.arc(s, l, a, -E, 0), e.arc(s, c, a, 0, E)) : e.arc(s, l, a, -E, E), e.closePath(), e.moveTo(t, n)
				} else e.rect(t, n, i, r)
			},
			drawPoint: function(e, t, n, i, r, o) {
				var a, s, l, u, c, d = (o || 0) * A;
				if (t && "object" == typeof t && ("[object HTMLImageElement]" === (a = t.toString()) || "[object HTMLCanvasElement]" === a)) return e.save(), e.translate(i, r), e.rotate(d), e.drawImage(t, -t.width / 2, -t.height / 2, t.width, t.height), void e.restore();
				if (!(isNaN(n) || n <= 0)) {
					switch (e.beginPath(), t) {
						default:
							e.arc(i, r, n, 0, P), e.closePath();
							break;
						case "triangle":
							e.moveTo(i + Math.sin(d) * n, r - Math.cos(d) * n), d += R, e.lineTo(i + Math.sin(d) * n, r - Math.cos(d) * n), d += R, e.lineTo(i + Math.sin(d) * n, r - Math.cos(d) * n), e.closePath();
							break;
						case "rectRounded":
							u = n - (c = .516 * n), s = Math.cos(d + N) * u, l = Math.sin(d + N) * u, e.arc(i - s, r - l, c, d - E, d - O), e.arc(i + l, r - s, c, d - O, d), e.arc(i + s, r + l, c, d, d + O), e.arc(i - l, r + s, c, d + O, d + E), e.closePath();
							break;
						case "rect":
							if (!o) {
								u = Math.SQRT1_2 * n, e.rect(i - u, r - u, 2 * u, 2 * u);
								break
							}
							d += N;
						case "rectRot":
							s = Math.cos(d) * n, l = Math.sin(d) * n, e.moveTo(i - s, r - l), e.lineTo(i + l, r - s), e.lineTo(i + s, r + l), e.lineTo(i - l, r + s), e.closePath();
							break;
						case "crossRot":
							d += N;
						case "cross":
							s = Math.cos(d) * n, l = Math.sin(d) * n, e.moveTo(i - s, r - l), e.lineTo(i + s, r + l), e.moveTo(i + l, r - s), e.lineTo(i - l, r + s);
							break;
						case "star":
							s = Math.cos(d) * n, l = Math.sin(d) * n, e.moveTo(i - s, r - l), e.lineTo(i + s, r + l), e.moveTo(i + l, r - s), e.lineTo(i - l, r + s), d += N, s = Math.cos(d) * n, l = Math.sin(d) * n, e.moveTo(i - s, r - l), e.lineTo(i + s, r + l), e.moveTo(i + l, r - s), e.lineTo(i - l, r + s);
							break;
						case "line":
							s = Math.cos(d) * n, l = Math.sin(d) * n, e.moveTo(i - s, r - l), e.lineTo(i + s, r + l);
							break;
						case "dash":
							e.moveTo(i, r), e.lineTo(i + Math.cos(d) * n, r + Math.sin(d) * n)
					}
					e.fill(), e.stroke()
				}
			},
			_isPointInArea: function(e, t) {
				return e.x > t.left - 1e-6 && e.x < t.right + 1e-6 && e.y > t.top - 1e-6 && e.y < t.bottom + 1e-6
			},
			clipArea: function(e, t) {
				e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip()
			},
			unclipArea: function(e) {
				e.restore()
			},
			lineTo: function(e, t, n, i) {
				var r = n.steppedLine;
				if (r) {
					if ("middle" === r) {
						var o = (t.x + n.x) / 2;
						e.lineTo(o, i ? n.y : t.y), e.lineTo(o, i ? t.y : n.y)
					} else "after" === r && !i || "after" !== r && i ? e.lineTo(t.x, n.y) : e.lineTo(n.x, t.y);
					e.lineTo(n.x, n.y)
				} else n.tension ? e.bezierCurveTo(i ? t.controlPointPreviousX : t.controlPointNextX, i ? t.controlPointPreviousY : t.controlPointNextY, i ? n.controlPointNextX : n.controlPointPreviousX, i ? n.controlPointNextY : n.controlPointPreviousY, n.x, n.y) : e.lineTo(n.x, n.y)
			}
		},
		L = I;
	T.clear = I.clear, T.drawRoundedRectangle = function(e) {
		e.beginPath(), I.roundedRect.apply(I, arguments)
	};
	var F = {
		_set: function(e, t) {
			return T.merge(this[e] || (this[e] = {}), t)
		}
	};
	F._set("global", {
		defaultColor: "rgba(0,0,0,0.1)",
		defaultFontColor: "#666",
		defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
		defaultFontSize: 12,
		defaultFontStyle: "normal",
		defaultLineHeight: 1.2,
		showLines: !0
	});
	var j = F,
		W = T.valueOrDefault;
	var z = {
			toLineHeight: function(e, t) {
				var n = ("" + e).match(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/);
				if (!n || "normal" === n[1]) return 1.2 * t;
				switch (e = +n[2], n[3]) {
					case "px":
						return e;
					case "%":
						e /= 100
				}
				return t * e
			},
			toPadding: function(e) {
				var t, n, i, r;
				return T.isObject(e) ? (t = +e.top || 0, n = +e.right || 0, i = +e.bottom || 0, r = +e.left || 0) : t = n = i = r = +e || 0, {
					top: t,
					right: n,
					bottom: i,
					left: r,
					height: t + i,
					width: r + n
				}
			},
			_parseFont: function(e) {
				var t = j.global,
					n = W(e.fontSize, t.defaultFontSize),
					i = {
						family: W(e.fontFamily, t.defaultFontFamily),
						lineHeight: T.options.toLineHeight(W(e.lineHeight, t.defaultLineHeight), n),
						size: n,
						style: W(e.fontStyle, t.defaultFontStyle),
						weight: null,
						string: ""
					};
				return i.string = function(e) {
					return !e || T.isNullOrUndef(e.size) || T.isNullOrUndef(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family
				}(i), i
			},
			resolve: function(e, t, n, i) {
				var r, o, a, s = !0;
				for (r = 0, o = e.length; r < o; ++r)
					if (void 0 !== (a = e[r]) && (void 0 !== t && "function" == typeof a && (a = a(t), s = !1), void 0 !== n && T.isArray(a) && (a = a[n], s = !1), void 0 !== a)) return i && !s && (i.cacheable = !1), a
			}
		},
		V = {
			_factorize: function(e) {
				var t, n = [],
					i = Math.sqrt(e);
				for (t = 1; t < i; t++) e % t == 0 && (n.push(t), n.push(e / t));
				return i === (0 | i) && n.push(i), n.sort(function(e, t) {
					return e - t
				}).pop(), n
			},
			log10: Math.log10 || function(e) {
				var t = Math.log(e) * Math.LOG10E,
					n = Math.round(t);
				return e === Math.pow(10, n) ? n : t
			}
		},
		H = V;
	T.log10 = V.log10;
	var B = T,
		q = M,
		Y = L,
		U = z,
		$ = H,
		G = {
			getRtlAdapter: function(e, t, n) {
				return e ? function(e, t) {
					return {
						x: function(n) {
							return e + e + t - n
						},
						setWidth: function(e) {
							t = e
						},
						textAlign: function(e) {
							return "center" === e ? e : "right" === e ? "left" : "right"
						},
						xPlus: function(e, t) {
							return e - t
						},
						leftForLtr: function(e, t) {
							return e - t
						}
					}
				}(t, n) : {
					x: function(e) {
						return e
					},
					setWidth: function(e) {},
					textAlign: function(e) {
						return e
					},
					xPlus: function(e, t) {
						return e + t
					},
					leftForLtr: function(e, t) {
						return e
					}
				}
			},
			overrideTextDirection: function(e, t) {
				var n, i;
				"ltr" !== t && "rtl" !== t || (i = [(n = e.canvas.style).getPropertyValue("direction"), n.getPropertyPriority("direction")], n.setProperty("direction", t, "important"), e.prevTextDirection = i)
			},
			restoreTextDirection: function(e) {
				var t = e.prevTextDirection;
				void 0 !== t && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]))
			}
		};
	B.easing = q, B.canvas = Y, B.options = U, B.math = $, B.rtl = G;
	var Q = function(e) {
		B.extend(this, e), this.initialize.apply(this, arguments)
	};
	B.extend(Q.prototype, {
		_type: void 0,
		initialize: function() {
			this.hidden = !1
		},
		pivot: function() {
			var e = this;
			return e._view || (e._view = B.extend({}, e._model)), e._start = {}, e
		},
		transition: function(e) {
			var t = this,
				n = t._model,
				i = t._start,
				r = t._view;
			return n && 1 !== e ? (r || (r = t._view = {}), i || (i = t._start = {}), function(e, t, n, i) {
				var r, o, a, s, l, u, c, d, f, h = Object.keys(n);
				for (r = 0, o = h.length; r < o; ++r)
					if (u = n[a = h[r]], t.hasOwnProperty(a) || (t[a] = u), (s = t[a]) !== u && "_" !== a[0]) {
						if (e.hasOwnProperty(a) || (e[a] = s), (c = typeof u) == typeof(l = e[a]))
							if ("string" === c) {
								if ((d = w(l)).valid && (f = w(u)).valid) {
									t[a] = f.mix(d, i).rgbString();
									continue
								}
							} else if (B.isFinite(l) && B.isFinite(u)) {
							t[a] = l + (u - l) * i;
							continue
						}
						t[a] = u
					}
			}(i, r, n, e), t) : (t._view = B.extend({}, n), t._start = null, t)
		},
		tooltipPosition: function() {
			return {
				x: this._model.x,
				y: this._model.y
			}
		},
		hasValue: function() {
			return B.isNumber(this._model.x) && B.isNumber(this._model.y)
		}
	}), Q.extend = B.inherits;
	var X = Q,
		J = X.extend({
			chart: null,
			currentStep: 0,
			numSteps: 60,
			easing: "",
			render: null,
			onAnimationProgress: null,
			onAnimationComplete: null
		}),
		Z = J;
	Object.defineProperty(J.prototype, "animationObject", {
		get: function() {
			return this
		}
	}), Object.defineProperty(J.prototype, "chartInstance", {
		get: function() {
			return this.chart
		},
		set: function(e) {
			this.chart = e
		}
	}), j._set("global", {
		animation: {
			duration: 1e3,
			easing: "easeOutQuart",
			onProgress: B.noop,
			onComplete: B.noop
		}
	});
	var K = {
			animations: [],
			request: null,
			addAnimation: function(e, t, n, i) {
				var r, o, a = this.animations;
				for (t.chart = e, t.startTime = Date.now(), t.duration = n, i || (e.animating = !0), r = 0, o = a.length; r < o; ++r)
					if (a[r].chart === e) return void(a[r] = t);
				a.push(t), 1 === a.length && this.requestAnimationFrame()
			},
			cancelAnimation: function(e) {
				var t = B.findIndex(this.animations, function(t) {
					return t.chart === e
				}); - 1 !== t && (this.animations.splice(t, 1), e.animating = !1)
			},
			requestAnimationFrame: function() {
				var e = this;
				null === e.request && (e.request = B.requestAnimFrame.call(window, function() {
					e.request = null, e.startDigest()
				}))
			},
			startDigest: function() {
				this.advance(), this.animations.length > 0 && this.requestAnimationFrame()
			},
			advance: function() {
				for (var e, t, n, i, r = this.animations, o = 0; o < r.length;) t = (e = r[o]).chart, n = e.numSteps, i = Math.floor((Date.now() - e.startTime) / e.duration * n) + 1, e.currentStep = Math.min(i, n), B.callback(e.render, [t, e], t), B.callback(e.onAnimationProgress, [e], t), e.currentStep >= n ? (B.callback(e.onAnimationComplete, [e], t), t.animating = !1, r.splice(o, 1)) : ++o
			}
		},
		ee = B.options.resolve,
		te = ["push", "pop", "shift", "splice", "unshift"];

	function ne(e, t) {
		var n = e._chartjs;
		if (n) {
			var i = n.listeners,
				r = i.indexOf(t); - 1 !== r && i.splice(r, 1), i.length > 0 || (te.forEach(function(t) {
				delete e[t]
			}), delete e._chartjs)
		}
	}
	var ie = function(e, t) {
		this.initialize(e, t)
	};
	B.extend(ie.prototype, {
		datasetElementType: null,
		dataElementType: null,
		_datasetElementOptions: ["backgroundColor", "borderCapStyle", "borderColor", "borderDash", "borderDashOffset", "borderJoinStyle", "borderWidth"],
		_dataElementOptions: ["backgroundColor", "borderColor", "borderWidth", "pointStyle"],
		initialize: function(e, t) {
			var n = this;
			n.chart = e, n.index = t, n.linkScales(), n.addElements(), n._type = n.getMeta().type
		},
		updateIndex: function(e) {
			this.index = e
		},
		linkScales: function() {
			var e = this.getMeta(),
				t = this.chart,
				n = t.scales,
				i = this.getDataset(),
				r = t.options.scales;
			null !== e.xAxisID && e.xAxisID in n && !i.xAxisID || (e.xAxisID = i.xAxisID || r.xAxes[0].id), null !== e.yAxisID && e.yAxisID in n && !i.yAxisID || (e.yAxisID = i.yAxisID || r.yAxes[0].id)
		},
		getDataset: function() {
			return this.chart.data.datasets[this.index]
		},
		getMeta: function() {
			return this.chart.getDatasetMeta(this.index)
		},
		getScaleForId: function(e) {
			return this.chart.scales[e]
		},
		_getValueScaleId: function() {
			return this.getMeta().yAxisID
		},
		_getIndexScaleId: function() {
			return this.getMeta().xAxisID
		},
		_getValueScale: function() {
			return this.getScaleForId(this._getValueScaleId())
		},
		_getIndexScale: function() {
			return this.getScaleForId(this._getIndexScaleId())
		},
		reset: function() {
			this._update(!0)
		},
		destroy: function() {
			this._data && ne(this._data, this)
		},
		createMetaDataset: function() {
			var e = this.datasetElementType;
			return e && new e({
				_chart: this.chart,
				_datasetIndex: this.index
			})
		},
		createMetaData: function(e) {
			var t = this.dataElementType;
			return t && new t({
				_chart: this.chart,
				_datasetIndex: this.index,
				_index: e
			})
		},
		addElements: function() {
			var e, t, n = this.getMeta(),
				i = this.getDataset().data || [],
				r = n.data;
			for (e = 0, t = i.length; e < t; ++e) r[e] = r[e] || this.createMetaData(e);
			n.dataset = n.dataset || this.createMetaDataset()
		},
		addElementAndReset: function(e) {
			var t = this.createMetaData(e);
			this.getMeta().data.splice(e, 0, t), this.updateElement(t, e, !0)
		},
		buildOrUpdateElements: function() {
			var e, t, n = this,
				i = n.getDataset(),
				r = i.data || (i.data = []);
			n._data !== r && (n._data && ne(n._data, n), r && Object.isExtensible(r) && (t = n, (e = r)._chartjs ? e._chartjs.listeners.push(t) : (Object.defineProperty(e, "_chartjs", {
				configurable: !0,
				enumerable: !1,
				value: {
					listeners: [t]
				}
			}), te.forEach(function(t) {
				var n = "onData" + t.charAt(0).toUpperCase() + t.slice(1),
					i = e[t];
				Object.defineProperty(e, t, {
					configurable: !0,
					enumerable: !1,
					value: function() {
						var t = Array.prototype.slice.call(arguments),
							r = i.apply(this, t);
						return B.each(e._chartjs.listeners, function(e) {
							"function" == typeof e[n] && e[n].apply(e, t)
						}), r
					}
				})
			}))), n._data = r), n.resyncElements()
		},
		_configure: function() {
			this._config = B.merge(Object.create(null), [this.chart.options.datasets[this._type], this.getDataset()], {
				merger: function(e, t, n) {
					"_meta" !== e && "data" !== e && B._merger(e, t, n)
				}
			})
		},
		_update: function(e) {
			this._configure(), this._cachedDataOpts = null, this.update(e)
		},
		update: B.noop,
		transition: function(e) {
			for (var t = this.getMeta(), n = t.data || [], i = n.length, r = 0; r < i; ++r) n[r].transition(e);
			t.dataset && t.dataset.transition(e)
		},
		draw: function() {
			var e = this.getMeta(),
				t = e.data || [],
				n = t.length,
				i = 0;
			for (e.dataset && e.dataset.draw(); i < n; ++i) t[i].draw()
		},
		getStyle: function(e) {
			var t, n = this.getMeta(),
				i = n.dataset;
			return this._configure(), i && void 0 === e ? t = this._resolveDatasetElementOptions(i || {}) : (e = e || 0, t = this._resolveDataElementOptions(n.data[e] || {}, e)), !1 !== t.fill && null !== t.fill || (t.backgroundColor = t.borderColor), t
		},
		_resolveDatasetElementOptions: function(e, t) {
			var n, i, r, o, a = this,
				s = a.chart,
				l = a._config,
				u = e.custom || {},
				c = s.options.elements[a.datasetElementType.prototype._type] || {},
				d = a._datasetElementOptions,
				f = {},
				h = {
					chart: s,
					dataset: a.getDataset(),
					datasetIndex: a.index,
					hover: t
				};
			for (n = 0, i = d.length; n < i; ++n) r = d[n], o = t ? "hover" + r.charAt(0).toUpperCase() + r.slice(1) : r, f[r] = ee([u[o], l[o], c[o]], h);
			return f
		},
		_resolveDataElementOptions: function(e, t) {
			var n = this,
				i = e && e.custom,
				r = n._cachedDataOpts;
			if (r && !i) return r;
			var o, a, s, l, u = n.chart,
				c = n._config,
				d = u.options.elements[n.dataElementType.prototype._type] || {},
				f = n._dataElementOptions,
				h = {},
				p = {
					chart: u,
					dataIndex: t,
					dataset: n.getDataset(),
					datasetIndex: n.index
				},
				g = {
					cacheable: !i
				};
			if (i = i || {}, B.isArray(f))
				for (a = 0, s = f.length; a < s; ++a) h[l = f[a]] = ee([i[l], c[l], d[l]], p, t, g);
			else
				for (a = 0, s = (o = Object.keys(f)).length; a < s; ++a) h[l = o[a]] = ee([i[l], c[f[l]], c[l], d[l]], p, t, g);
			return g.cacheable && (n._cachedDataOpts = Object.freeze(h)), h
		},
		removeHoverStyle: function(e) {
			B.merge(e._model, e.$previousStyle || {}), delete e.$previousStyle
		},
		setHoverStyle: function(e) {
			var t = this.chart.data.datasets[e._datasetIndex],
				n = e._index,
				i = e.custom || {},
				r = e._model,
				o = B.getHoverColor;
			e.$previousStyle = {
				backgroundColor: r.backgroundColor,
				borderColor: r.borderColor,
				borderWidth: r.borderWidth
			}, r.backgroundColor = ee([i.hoverBackgroundColor, t.hoverBackgroundColor, o(r.backgroundColor)], void 0, n), r.borderColor = ee([i.hoverBorderColor, t.hoverBorderColor, o(r.borderColor)], void 0, n), r.borderWidth = ee([i.hoverBorderWidth, t.hoverBorderWidth, r.borderWidth], void 0, n)
		},
		_removeDatasetHoverStyle: function() {
			var e = this.getMeta().dataset;
			e && this.removeHoverStyle(e)
		},
		_setDatasetHoverStyle: function() {
			var e, t, n, i, r, o, a = this.getMeta().dataset,
				s = {};
			if (a) {
				for (o = a._model, r = this._resolveDatasetElementOptions(a, !0), e = 0, t = (i = Object.keys(r)).length; e < t; ++e) s[n = i[e]] = o[n], o[n] = r[n];
				a.$previousStyle = s
			}
		},
		resyncElements: function() {
			var e = this.getMeta(),
				t = this.getDataset().data,
				n = e.data.length,
				i = t.length;
			i < n ? e.data.splice(i, n - i) : i > n && this.insertElements(n, i - n)
		},
		insertElements: function(e, t) {
			for (var n = 0; n < t; ++n) this.addElementAndReset(e + n)
		},
		onDataPush: function() {
			var e = arguments.length;
			this.insertElements(this.getDataset().data.length - e, e)
		},
		onDataPop: function() {
			this.getMeta().data.pop()
		},
		onDataShift: function() {
			this.getMeta().data.shift()
		},
		onDataSplice: function(e, t) {
			this.getMeta().data.splice(e, t), this.insertElements(e, arguments.length - 2)
		},
		onDataUnshift: function() {
			this.insertElements(0, arguments.length)
		}
	}), ie.extend = B.inherits;
	var re = ie,
		oe = 2 * Math.PI;

	function ae(e, t) {
		var n = t.startAngle,
			i = t.endAngle,
			r = t.pixelMargin,
			o = r / t.outerRadius,
			a = t.x,
			s = t.y;
		e.beginPath(), e.arc(a, s, t.outerRadius, n - o, i + o), t.innerRadius > r ? (o = r / t.innerRadius, e.arc(a, s, t.innerRadius - r, i + o, n - o, !0)) : e.arc(a, s, r, i + Math.PI / 2, n - Math.PI / 2), e.closePath(), e.clip()
	}

	function se(e, t, n) {
		var i = "inner" === t.borderAlign;
		i ? (e.lineWidth = 2 * t.borderWidth, e.lineJoin = "round") : (e.lineWidth = t.borderWidth, e.lineJoin = "bevel"), n.fullCircles && function(e, t, n, i) {
			var r, o = n.endAngle;
			for (i && (n.endAngle = n.startAngle + oe, ae(e, n), n.endAngle = o, n.endAngle === n.startAngle && n.fullCircles && (n.endAngle += oe, n.fullCircles--)), e.beginPath(), e.arc(n.x, n.y, n.innerRadius, n.startAngle + oe, n.startAngle, !0), r = 0; r < n.fullCircles; ++r) e.stroke();
			for (e.beginPath(), e.arc(n.x, n.y, t.outerRadius, n.startAngle, n.startAngle + oe), r = 0; r < n.fullCircles; ++r) e.stroke()
		}(e, t, n, i), i && ae(e, n), e.beginPath(), e.arc(n.x, n.y, t.outerRadius, n.startAngle, n.endAngle), e.arc(n.x, n.y, n.innerRadius, n.endAngle, n.startAngle, !0), e.closePath(), e.stroke()
	}
	j._set("global", {
		elements: {
			arc: {
				backgroundColor: j.global.defaultColor,
				borderColor: "#fff",
				borderWidth: 2,
				borderAlign: "center"
			}
		}
	});
	var le = X.extend({
			_type: "arc",
			inLabelRange: function(e) {
				var t = this._view;
				return !!t && Math.pow(e - t.x, 2) < Math.pow(t.radius + t.hoverRadius, 2)
			},
			inRange: function(e, t) {
				var n = this._view;
				if (n) {
					for (var i = B.getAngleFromPoint(n, {
							x: e,
							y: t
						}), r = i.angle, o = i.distance, a = n.startAngle, s = n.endAngle; s < a;) s += oe;
					for (; r > s;) r -= oe;
					for (; r < a;) r += oe;
					var l = r >= a && r <= s,
						u = o >= n.innerRadius && o <= n.outerRadius;
					return l && u
				}
				return !1
			},
			getCenterPoint: function() {
				var e = this._view,
					t = (e.startAngle + e.endAngle) / 2,
					n = (e.innerRadius + e.outerRadius) / 2;
				return {
					x: e.x + Math.cos(t) * n,
					y: e.y + Math.sin(t) * n
				}
			},
			getArea: function() {
				var e = this._view;
				return Math.PI * ((e.endAngle - e.startAngle) / (2 * Math.PI)) * (Math.pow(e.outerRadius, 2) - Math.pow(e.innerRadius, 2))
			},
			tooltipPosition: function() {
				var e = this._view,
					t = e.startAngle + (e.endAngle - e.startAngle) / 2,
					n = (e.outerRadius - e.innerRadius) / 2 + e.innerRadius;
				return {
					x: e.x + Math.cos(t) * n,
					y: e.y + Math.sin(t) * n
				}
			},
			draw: function() {
				var e, t = this._chart.ctx,
					n = this._view,
					i = "inner" === n.borderAlign ? .33 : 0,
					r = {
						x: n.x,
						y: n.y,
						innerRadius: n.innerRadius,
						outerRadius: Math.max(n.outerRadius - i, 0),
						pixelMargin: i,
						startAngle: n.startAngle,
						endAngle: n.endAngle,
						fullCircles: Math.floor(n.circumference / oe)
					};
				if (t.save(), t.fillStyle = n.backgroundColor, t.strokeStyle = n.borderColor, r.fullCircles) {
					for (r.endAngle = r.startAngle + oe, t.beginPath(), t.arc(r.x, r.y, r.outerRadius, r.startAngle, r.endAngle), t.arc(r.x, r.y, r.innerRadius, r.endAngle, r.startAngle, !0), t.closePath(), e = 0; e < r.fullCircles; ++e) t.fill();
					r.endAngle = r.startAngle + n.circumference % oe
				}
				t.beginPath(), t.arc(r.x, r.y, r.outerRadius, r.startAngle, r.endAngle), t.arc(r.x, r.y, r.innerRadius, r.endAngle, r.startAngle, !0), t.closePath(), t.fill(), n.borderWidth && se(t, n, r), t.restore()
			}
		}),
		ue = B.valueOrDefault,
		ce = j.global.defaultColor;
	j._set("global", {
		elements: {
			line: {
				tension: .4,
				backgroundColor: ce,
				borderWidth: 3,
				borderColor: ce,
				borderCapStyle: "butt",
				borderDash: [],
				borderDashOffset: 0,
				borderJoinStyle: "miter",
				capBezierPoints: !0,
				fill: !0
			}
		}
	});
	var de = X.extend({
			_type: "line",
			draw: function() {
				var e, t, n, i = this,
					r = i._view,
					o = i._chart.ctx,
					a = r.spanGaps,
					s = i._children.slice(),
					l = j.global,
					u = l.elements.line,
					c = -1,
					d = i._loop;
				if (s.length) {
					if (i._loop) {
						for (e = 0; e < s.length; ++e)
							if (t = B.previousItem(s, e), !s[e]._view.skip && t._view.skip) {
								s = s.slice(e).concat(s.slice(0, e)), d = a;
								break
							} d && s.push(s[0])
					}
					for (o.save(), o.lineCap = r.borderCapStyle || u.borderCapStyle, o.setLineDash && o.setLineDash(r.borderDash || u.borderDash), o.lineDashOffset = ue(r.borderDashOffset, u.borderDashOffset), o.lineJoin = r.borderJoinStyle || u.borderJoinStyle, o.lineWidth = ue(r.borderWidth, u.borderWidth), o.strokeStyle = r.borderColor || l.defaultColor, o.beginPath(), (n = s[0]._view).skip || (o.moveTo(n.x, n.y), c = 0), e = 1; e < s.length; ++e) n = s[e]._view, t = -1 === c ? B.previousItem(s, e) : s[c], n.skip || (c !== e - 1 && !a || -1 === c ? o.moveTo(n.x, n.y) : B.canvas.lineTo(o, t._view, n), c = e);
					d && o.closePath(), o.stroke(), o.restore()
				}
			}
		}),
		fe = B.valueOrDefault,
		he = j.global.defaultColor;

	function pe(e) {
		var t = this._view;
		return !!t && Math.abs(e - t.x) < t.radius + t.hitRadius
	}
	j._set("global", {
		elements: {
			point: {
				radius: 3,
				pointStyle: "circle",
				backgroundColor: he,
				borderColor: he,
				borderWidth: 1,
				hitRadius: 1,
				hoverRadius: 4,
				hoverBorderWidth: 1
			}
		}
	});
	var ge = X.extend({
			_type: "point",
			inRange: function(e, t) {
				var n = this._view;
				return !!n && Math.pow(e - n.x, 2) + Math.pow(t - n.y, 2) < Math.pow(n.hitRadius + n.radius, 2)
			},
			inLabelRange: pe,
			inXRange: pe,
			inYRange: function(e) {
				var t = this._view;
				return !!t && Math.abs(e - t.y) < t.radius + t.hitRadius
			},
			getCenterPoint: function() {
				var e = this._view;
				return {
					x: e.x,
					y: e.y
				}
			},
			getArea: function() {
				return Math.PI * Math.pow(this._view.radius, 2)
			},
			tooltipPosition: function() {
				var e = this._view;
				return {
					x: e.x,
					y: e.y,
					padding: e.radius + e.borderWidth
				}
			},
			draw: function(e) {
				var t = this._view,
					n = this._chart.ctx,
					i = t.pointStyle,
					r = t.rotation,
					o = t.radius,
					a = t.x,
					s = t.y,
					l = j.global,
					u = l.defaultColor;
				t.skip || (void 0 === e || B.canvas._isPointInArea(t, e)) && (n.strokeStyle = t.borderColor || u, n.lineWidth = fe(t.borderWidth, l.elements.point.borderWidth), n.fillStyle = t.backgroundColor || u, B.canvas.drawPoint(n, i, o, a, s, r))
			}
		}),
		me = j.global.defaultColor;

	function ve(e) {
		return e && void 0 !== e.width
	}

	function be(e) {
		var t, n, i, r, o;
		return ve(e) ? (o = e.width / 2, t = e.x - o, n = e.x + o, i = Math.min(e.y, e.base), r = Math.max(e.y, e.base)) : (o = e.height / 2, t = Math.min(e.x, e.base), n = Math.max(e.x, e.base), i = e.y - o, r = e.y + o), {
			left: t,
			top: i,
			right: n,
			bottom: r
		}
	}

	function ye(e, t, n) {
		return e === t ? n : e === n ? t : e
	}

	function _e(e, t, n) {
		var i, r, o, a, s = e.borderWidth,
			l = function(e) {
				var t = e.borderSkipped,
					n = {};
				return t ? (e.horizontal ? e.base > e.x && (t = ye(t, "left", "right")) : e.base < e.y && (t = ye(t, "bottom", "top")), n[t] = !0, n) : n
			}(e);
		return B.isObject(s) ? (i = +s.top || 0, r = +s.right || 0, o = +s.bottom || 0, a = +s.left || 0) : i = r = o = a = +s || 0, {
			t: l.top || i < 0 ? 0 : i > n ? n : i,
			r: l.right || r < 0 ? 0 : r > t ? t : r,
			b: l.bottom || o < 0 ? 0 : o > n ? n : o,
			l: l.left || a < 0 ? 0 : a > t ? t : a
		}
	}

	function xe(e, t, n) {
		var i = null === t,
			r = null === n,
			o = !(!e || i && r) && be(e);
		return o && (i || t >= o.left && t <= o.right) && (r || n >= o.top && n <= o.bottom)
	}
	j._set("global", {
		elements: {
			rectangle: {
				backgroundColor: me,
				borderColor: me,
				borderSkipped: "bottom",
				borderWidth: 0
			}
		}
	});
	var we = X.extend({
			_type: "rectangle",
			draw: function() {
				var e = this._chart.ctx,
					t = this._view,
					n = function(e) {
						var t = be(e),
							n = t.right - t.left,
							i = t.bottom - t.top,
							r = _e(e, n / 2, i / 2);
						return {
							outer: {
								x: t.left,
								y: t.top,
								w: n,
								h: i
							},
							inner: {
								x: t.left + r.l,
								y: t.top + r.t,
								w: n - r.l - r.r,
								h: i - r.t - r.b
							}
						}
					}(t),
					i = n.outer,
					r = n.inner;
				e.fillStyle = t.backgroundColor, e.fillRect(i.x, i.y, i.w, i.h), i.w === r.w && i.h === r.h || (e.save(), e.beginPath(), e.rect(i.x, i.y, i.w, i.h), e.clip(), e.fillStyle = t.borderColor, e.rect(r.x, r.y, r.w, r.h), e.fill("evenodd"), e.restore())
			},
			height: function() {
				var e = this._view;
				return e.base - e.y
			},
			inRange: function(e, t) {
				return xe(this._view, e, t)
			},
			inLabelRange: function(e, t) {
				var n = this._view;
				return ve(n) ? xe(n, e, null) : xe(n, null, t)
			},
			inXRange: function(e) {
				return xe(this._view, e, null)
			},
			inYRange: function(e) {
				return xe(this._view, null, e)
			},
			getCenterPoint: function() {
				var e, t, n = this._view;
				return ve(n) ? (e = n.x, t = (n.y + n.base) / 2) : (e = (n.x + n.base) / 2, t = n.y), {
					x: e,
					y: t
				}
			},
			getArea: function() {
				var e = this._view;
				return ve(e) ? e.width * Math.abs(e.y - e.base) : e.height * Math.abs(e.x - e.base)
			},
			tooltipPosition: function() {
				var e = this._view;
				return {
					x: e.x,
					y: e.y
				}
			}
		}),
		ke = {},
		Se = le,
		Ce = de,
		Te = ge,
		De = we;
	ke.Arc = Se, ke.Line = Ce, ke.Point = Te, ke.Rectangle = De;
	var Me = B._deprecated,
		Ee = B.valueOrDefault;

	function Ae(e, t, n) {
		var i, r, o = n.barThickness,
			a = t.stackCount,
			s = t.pixels[e],
			l = B.isNullOrUndef(o) ? function(e, t) {
				var n, i, r, o, a = e._length;
				for (r = 1, o = t.length; r < o; ++r) a = Math.min(a, Math.abs(t[r] - t[r - 1]));
				for (r = 0, o = e.getTicks().length; r < o; ++r) i = e.getPixelForTick(r), a = r > 0 ? Math.min(a, Math.abs(i - n)) : a, n = i;
				return a
			}(t.scale, t.pixels) : -1;
		return B.isNullOrUndef(o) ? (i = l * n.categoryPercentage, r = n.barPercentage) : (i = o * a, r = 1), {
			chunk: i / a,
			ratio: r,
			start: s - i / 2
		}
	}
	j._set("bar", {
		hover: {
			mode: "label"
		},
		scales: {
			xAxes: [{
				type: "category",
				offset: !0,
				gridLines: {
					offsetGridLines: !0
				}
			}],
			yAxes: [{
				type: "linear"
			}]
		}
	}), j._set("global", {
		datasets: {
			bar: {
				categoryPercentage: .8,
				barPercentage: .9
			}
		}
	});
	var Pe = re.extend({
			dataElementType: ke.Rectangle,
			_dataElementOptions: ["backgroundColor", "borderColor", "borderSkipped", "borderWidth", "barPercentage", "barThickness", "categoryPercentage", "maxBarThickness", "minBarLength"],
			initialize: function() {
				var e, t, n = this;
				re.prototype.initialize.apply(n, arguments), (e = n.getMeta()).stack = n.getDataset().stack, e.bar = !0, t = n._getIndexScale().options, Me("bar chart", t.barPercentage, "scales.[x/y]Axes.barPercentage", "dataset.barPercentage"), Me("bar chart", t.barThickness, "scales.[x/y]Axes.barThickness", "dataset.barThickness"), Me("bar chart", t.categoryPercentage, "scales.[x/y]Axes.categoryPercentage", "dataset.categoryPercentage"), Me("bar chart", n._getValueScale().options.minBarLength, "scales.[x/y]Axes.minBarLength", "dataset.minBarLength"), Me("bar chart", t.maxBarThickness, "scales.[x/y]Axes.maxBarThickness", "dataset.maxBarThickness")
			},
			update: function(e) {
				var t, n, i = this.getMeta().data;
				for (this._ruler = this.getRuler(), t = 0, n = i.length; t < n; ++t) this.updateElement(i[t], t, e)
			},
			updateElement: function(e, t, n) {
				var i = this,
					r = i.getMeta(),
					o = i.getDataset(),
					a = i._resolveDataElementOptions(e, t);
				e._xScale = i.getScaleForId(r.xAxisID), e._yScale = i.getScaleForId(r.yAxisID), e._datasetIndex = i.index, e._index = t, e._model = {
					backgroundColor: a.backgroundColor,
					borderColor: a.borderColor,
					borderSkipped: a.borderSkipped,
					borderWidth: a.borderWidth,
					datasetLabel: o.label,
					label: i.chart.data.labels[t]
				}, B.isArray(o.data[t]) && (e._model.borderSkipped = null), i._updateElementGeometry(e, t, n, a), e.pivot()
			},
			_updateElementGeometry: function(e, t, n, i) {
				var r = this,
					o = e._model,
					a = r._getValueScale(),
					s = a.getBasePixel(),
					l = a.isHorizontal(),
					u = r._ruler || r.getRuler(),
					c = r.calculateBarValuePixels(r.index, t, i),
					d = r.calculateBarIndexPixels(r.index, t, u, i);
				o.horizontal = l, o.base = n ? s : c.base, o.x = l ? n ? s : c.head : d.center, o.y = l ? d.center : n ? s : c.head, o.height = l ? d.size : void 0, o.width = l ? void 0 : d.size
			},
			_getStacks: function(e) {
				var t, n, i = this._getIndexScale(),
					r = i._getMatchingVisibleMetas(this._type),
					o = i.options.stacked,
					a = r.length,
					s = [];
				for (t = 0; t < a && (n = r[t], (!1 === o || -1 === s.indexOf(n.stack) || void 0 === o && void 0 === n.stack) && s.push(n.stack), n.index !== e); ++t);
				return s
			},
			getStackCount: function() {
				return this._getStacks().length
			},
			getStackIndex: function(e, t) {
				var n = this._getStacks(e),
					i = void 0 !== t ? n.indexOf(t) : -1;
				return -1 === i ? n.length - 1 : i
			},
			getRuler: function() {
				var e, t, n = this._getIndexScale(),
					i = [];
				for (e = 0, t = this.getMeta().data.length; e < t; ++e) i.push(n.getPixelForValue(null, e, this.index));
				return {
					pixels: i,
					start: n._startPixel,
					end: n._endPixel,
					stackCount: this.getStackCount(),
					scale: n
				}
			},
			calculateBarValuePixels: function(e, t, n) {
				var i, r, o, a, s, l, u, c = this.chart,
					d = this._getValueScale(),
					f = d.isHorizontal(),
					h = c.data.datasets,
					p = d._getMatchingVisibleMetas(this._type),
					g = d._parseValue(h[e].data[t]),
					m = n.minBarLength,
					v = d.options.stacked,
					b = this.getMeta().stack,
					y = void 0 === g.start ? 0 : g.max >= 0 && g.min >= 0 ? g.min : g.max,
					_ = void 0 === g.start ? g.end : g.max >= 0 && g.min >= 0 ? g.max - g.min : g.min - g.max,
					x = p.length;
				if (v || void 0 === v && void 0 !== b)
					for (i = 0; i < x && (r = p[i]).index !== e; ++i) r.stack === b && (o = void 0 === (u = d._parseValue(h[r.index].data[t])).start ? u.end : u.min >= 0 && u.max >= 0 ? u.max : u.min, (g.min < 0 && o < 0 || g.max >= 0 && o > 0) && (y += o));
				return a = d.getPixelForValue(y), l = (s = d.getPixelForValue(y + _)) - a, void 0 !== m && Math.abs(l) < m && (l = m, s = _ >= 0 && !f || _ < 0 && f ? a - m : a + m), {
					size: l,
					base: a,
					head: s,
					center: s + l / 2
				}
			},
			calculateBarIndexPixels: function(e, t, n, i) {
				var r = "flex" === i.barThickness ? function(e, t, n) {
						var i, r = t.pixels,
							o = r[e],
							a = e > 0 ? r[e - 1] : null,
							s = e < r.length - 1 ? r[e + 1] : null,
							l = n.categoryPercentage;
						return null === a && (a = o - (null === s ? t.end - t.start : s - o)), null === s && (s = o + o - a), i = o - (o - Math.min(a, s)) / 2 * l, {
							chunk: Math.abs(s - a) / 2 * l / t.stackCount,
							ratio: n.barPercentage,
							start: i
						}
					}(t, n, i) : Ae(t, n, i),
					o = this.getStackIndex(e, this.getMeta().stack),
					a = r.start + r.chunk * o + r.chunk / 2,
					s = Math.min(Ee(i.maxBarThickness, 1 / 0), r.chunk * r.ratio);
				return {
					base: a - s / 2,
					head: a + s / 2,
					center: a,
					size: s
				}
			},
			draw: function() {
				var e = this.chart,
					t = this._getValueScale(),
					n = this.getMeta().data,
					i = this.getDataset(),
					r = n.length,
					o = 0;
				for (B.canvas.clipArea(e.ctx, e.chartArea); o < r; ++o) {
					var a = t._parseValue(i.data[o]);
					isNaN(a.min) || isNaN(a.max) || n[o].draw()
				}
				B.canvas.unclipArea(e.ctx)
			},
			_resolveDataElementOptions: function() {
				var e = B.extend({}, re.prototype._resolveDataElementOptions.apply(this, arguments)),
					t = this._getIndexScale().options,
					n = this._getValueScale().options;
				return e.barPercentage = Ee(t.barPercentage, e.barPercentage), e.barThickness = Ee(t.barThickness, e.barThickness), e.categoryPercentage = Ee(t.categoryPercentage, e.categoryPercentage), e.maxBarThickness = Ee(t.maxBarThickness, e.maxBarThickness), e.minBarLength = Ee(n.minBarLength, e.minBarLength), e
			}
		}),
		Oe = B.valueOrDefault,
		Ne = B.options.resolve;
	j._set("bubble", {
		hover: {
			mode: "single"
		},
		scales: {
			xAxes: [{
				type: "linear",
				position: "bottom",
				id: "x-axis-0"
			}],
			yAxes: [{
				type: "linear",
				position: "left",
				id: "y-axis-0"
			}]
		},
		tooltips: {
			callbacks: {
				title: function() {
					return ""
				},
				label: function(e, t) {
					var n = t.datasets[e.datasetIndex].label || "",
						i = t.datasets[e.datasetIndex].data[e.index];
					return n + ": (" + e.xLabel + ", " + e.yLabel + ", " + i.r + ")"
				}
			}
		}
	});
	var Re = re.extend({
			dataElementType: ke.Point,
			_dataElementOptions: ["backgroundColor", "borderColor", "borderWidth", "hoverBackgroundColor", "hoverBorderColor", "hoverBorderWidth", "hoverRadius", "hitRadius", "pointStyle", "rotation"],
			update: function(e) {
				var t = this,
					n = t.getMeta().data;
				B.each(n, function(n, i) {
					t.updateElement(n, i, e)
				})
			},
			updateElement: function(e, t, n) {
				var i = this,
					r = i.getMeta(),
					o = e.custom || {},
					a = i.getScaleForId(r.xAxisID),
					s = i.getScaleForId(r.yAxisID),
					l = i._resolveDataElementOptions(e, t),
					u = i.getDataset().data[t],
					c = i.index,
					d = n ? a.getPixelForDecimal(.5) : a.getPixelForValue("object" == typeof u ? u : NaN, t, c),
					f = n ? s.getBasePixel() : s.getPixelForValue(u, t, c);
				e._xScale = a, e._yScale = s, e._options = l, e._datasetIndex = c, e._index = t, e._model = {
					backgroundColor: l.backgroundColor,
					borderColor: l.borderColor,
					borderWidth: l.borderWidth,
					hitRadius: l.hitRadius,
					pointStyle: l.pointStyle,
					rotation: l.rotation,
					radius: n ? 0 : l.radius,
					skip: o.skip || isNaN(d) || isNaN(f),
					x: d,
					y: f
				}, e.pivot()
			},
			setHoverStyle: function(e) {
				var t = e._model,
					n = e._options,
					i = B.getHoverColor;
				e.$previousStyle = {
					backgroundColor: t.backgroundColor,
					borderColor: t.borderColor,
					borderWidth: t.borderWidth,
					radius: t.radius
				}, t.backgroundColor = Oe(n.hoverBackgroundColor, i(n.backgroundColor)), t.borderColor = Oe(n.hoverBorderColor, i(n.borderColor)), t.borderWidth = Oe(n.hoverBorderWidth, n.borderWidth), t.radius = n.radius + n.hoverRadius
			},
			_resolveDataElementOptions: function(e, t) {
				var n = this,
					i = n.chart,
					r = n.getDataset(),
					o = e.custom || {},
					a = r.data[t] || {},
					s = re.prototype._resolveDataElementOptions.apply(n, arguments),
					l = {
						chart: i,
						dataIndex: t,
						dataset: r,
						datasetIndex: n.index
					};
				return n._cachedDataOpts === s && (s = B.extend({}, s)), s.radius = Ne([o.radius, a.r, n._config.radius, i.options.elements.point.radius], l, t), s
			}
		}),
		Ie = B.valueOrDefault,
		Le = Math.PI,
		Fe = 2 * Le,
		je = Le / 2;
	j._set("doughnut", {
		animation: {
			animateRotate: !0,
			animateScale: !1
		},
		hover: {
			mode: "single"
		},
		legendCallback: function(e) {
			var t, n, i, r = document.createElement("ul"),
				o = e.data,
				a = o.datasets,
				s = o.labels;
			if (r.setAttribute("class", e.id + "-legend"), a.length)
				for (t = 0, n = a[0].data.length; t < n; ++t)(i = r.appendChild(document.createElement("li"))).appendChild(document.createElement("span")).style.backgroundColor = a[0].backgroundColor[t], s[t] && i.appendChild(document.createTextNode(s[t]));
			return r.outerHTML
		},
		legend: {
			labels: {
				generateLabels: function(e) {
					var t = e.data;
					return t.labels.length && t.datasets.length ? t.labels.map(function(n, i) {
						var r = e.getDatasetMeta(0),
							o = r.controller.getStyle(i);
						return {
							text: n,
							fillStyle: o.backgroundColor,
							strokeStyle: o.borderColor,
							lineWidth: o.borderWidth,
							hidden: isNaN(t.datasets[0].data[i]) || r.data[i].hidden,
							index: i
						}
					}) : []
				}
			},
			onClick: function(e, t) {
				var n, i, r, o = t.index,
					a = this.chart;
				for (n = 0, i = (a.data.datasets || []).length; n < i; ++n)(r = a.getDatasetMeta(n)).data[o] && (r.data[o].hidden = !r.data[o].hidden);
				a.update()
			}
		},
		cutoutPercentage: 50,
		rotation: -je,
		circumference: Fe,
		tooltips: {
			callbacks: {
				title: function() {
					return ""
				},
				label: function(e, t) {
					var n = t.labels[e.index],
						i = ": " + t.datasets[e.datasetIndex].data[e.index];
					return B.isArray(n) ? (n = n.slice())[0] += i : n += i, n
				}
			}
		}
	});
	var We = re.extend({
		dataElementType: ke.Arc,
		linkScales: B.noop,
		_dataElementOptions: ["backgroundColor", "borderColor", "borderWidth", "borderAlign", "hoverBackgroundColor", "hoverBorderColor", "hoverBorderWidth"],
		getRingIndex: function(e) {
			for (var t = 0, n = 0; n < e; ++n) this.chart.isDatasetVisible(n) && ++t;
			return t
		},
		update: function(e) {
			var t, n, i, r, o = this,
				a = o.chart,
				s = a.chartArea,
				l = a.options,
				u = 1,
				c = 1,
				d = 0,
				f = 0,
				h = o.getMeta(),
				p = h.data,
				g = l.cutoutPercentage / 100 || 0,
				m = l.circumference,
				v = o._getRingWeight(o.index);
			if (m < Fe) {
				var b = l.rotation % Fe,
					y = (b += b >= Le ? -Fe : b < -Le ? Fe : 0) + m,
					_ = Math.cos(b),
					x = Math.sin(b),
					w = Math.cos(y),
					k = Math.sin(y),
					S = b <= 0 && y >= 0 || y >= Fe,
					C = b <= je && y >= je || y >= Fe + je,
					T = b <= -je && y >= -je || y >= Le + je,
					D = b === -Le || y >= Le ? -1 : Math.min(_, _ * g, w, w * g),
					M = T ? -1 : Math.min(x, x * g, k, k * g),
					E = S ? 1 : Math.max(_, _ * g, w, w * g),
					A = C ? 1 : Math.max(x, x * g, k, k * g);
				u = (E - D) / 2, c = (A - M) / 2, d = -(E + D) / 2, f = -(A + M) / 2
			}
			for (i = 0, r = p.length; i < r; ++i) p[i]._options = o._resolveDataElementOptions(p[i], i);
			for (a.borderWidth = o.getMaxBorderWidth(), t = (s.right - s.left - a.borderWidth) / u, n = (s.bottom - s.top - a.borderWidth) / c, a.outerRadius = Math.max(Math.min(t, n) / 2, 0), a.innerRadius = Math.max(a.outerRadius * g, 0), a.radiusLength = (a.outerRadius - a.innerRadius) / (o._getVisibleDatasetWeightTotal() || 1), a.offsetX = d * a.outerRadius, a.offsetY = f * a.outerRadius, h.total = o.calculateTotal(), o.outerRadius = a.outerRadius - a.radiusLength * o._getRingWeightOffset(o.index), o.innerRadius = Math.max(o.outerRadius - a.radiusLength * v, 0), i = 0, r = p.length; i < r; ++i) o.updateElement(p[i], i, e)
		},
		updateElement: function(e, t, n) {
			var i = this,
				r = i.chart,
				o = r.chartArea,
				a = r.options,
				s = a.animation,
				l = (o.left + o.right) / 2,
				u = (o.top + o.bottom) / 2,
				c = a.rotation,
				d = a.rotation,
				f = i.getDataset(),
				h = n && s.animateRotate ? 0 : e.hidden ? 0 : i.calculateCircumference(f.data[t]) * (a.circumference / Fe),
				p = n && s.animateScale ? 0 : i.innerRadius,
				g = n && s.animateScale ? 0 : i.outerRadius,
				m = e._options || {};
			B.extend(e, {
				_datasetIndex: i.index,
				_index: t,
				_model: {
					backgroundColor: m.backgroundColor,
					borderColor: m.borderColor,
					borderWidth: m.borderWidth,
					borderAlign: m.borderAlign,
					x: l + r.offsetX,
					y: u + r.offsetY,
					startAngle: c,
					endAngle: d,
					circumference: h,
					outerRadius: g,
					innerRadius: p,
					label: B.valueAtIndexOrDefault(f.label, t, r.data.labels[t])
				}
			});
			var v = e._model;
			n && s.animateRotate || (v.startAngle = 0 === t ? a.rotation : i.getMeta().data[t - 1]._model.endAngle, v.endAngle = v.startAngle + v.circumference), e.pivot()
		},
		calculateTotal: function() {
			var e, t = this.getDataset(),
				n = this.getMeta(),
				i = 0;
			return B.each(n.data, function(n, r) {
				e = t.data[r], isNaN(e) || n.hidden || (i += Math.abs(e))
			}), i
		},
		calculateCircumference: function(e) {
			var t = this.getMeta().total;
			return t > 0 && !isNaN(e) ? Fe * (Math.abs(e) / t) : 0
		},
		getMaxBorderWidth: function(e) {
			var t, n, i, r, o, a, s, l, u = 0,
				c = this.chart;
			if (!e)
				for (t = 0, n = c.data.datasets.length; t < n; ++t)
					if (c.isDatasetVisible(t)) {
						e = (i = c.getDatasetMeta(t)).data, t !== this.index && (o = i.controller);
						break
					} if (!e) return 0;
			for (t = 0, n = e.length; t < n; ++t) r = e[t], o ? (o._configure(), a = o._resolveDataElementOptions(r, t)) : a = r._options, "inner" !== a.borderAlign && (s = a.borderWidth, u = (l = a.hoverBorderWidth) > (u = s > u ? s : u) ? l : u);
			return u
		},
		setHoverStyle: function(e) {
			var t = e._model,
				n = e._options,
				i = B.getHoverColor;
			e.$previousStyle = {
				backgroundColor: t.backgroundColor,
				borderColor: t.borderColor,
				borderWidth: t.borderWidth
			}, t.backgroundColor = Ie(n.hoverBackgroundColor, i(n.backgroundColor)), t.borderColor = Ie(n.hoverBorderColor, i(n.borderColor)), t.borderWidth = Ie(n.hoverBorderWidth, n.borderWidth)
		},
		_getRingWeightOffset: function(e) {
			for (var t = 0, n = 0; n < e; ++n) this.chart.isDatasetVisible(n) && (t += this._getRingWeight(n));
			return t
		},
		_getRingWeight: function(e) {
			return Math.max(Ie(this.chart.data.datasets[e].weight, 1), 0)
		},
		_getVisibleDatasetWeightTotal: function() {
			return this._getRingWeightOffset(this.chart.data.datasets.length)
		}
	});
	j._set("horizontalBar", {
		hover: {
			mode: "index",
			axis: "y"
		},
		scales: {
			xAxes: [{
				type: "linear",
				position: "bottom"
			}],
			yAxes: [{
				type: "category",
				position: "left",
				offset: !0,
				gridLines: {
					offsetGridLines: !0
				}
			}]
		},
		elements: {
			rectangle: {
				borderSkipped: "left"
			}
		},
		tooltips: {
			mode: "index",
			axis: "y"
		}
	}), j._set("global", {
		datasets: {
			horizontalBar: {
				categoryPercentage: .8,
				barPercentage: .9
			}
		}
	});
	var ze = Pe.extend({
			_getValueScaleId: function() {
				return this.getMeta().xAxisID
			},
			_getIndexScaleId: function() {
				return this.getMeta().yAxisID
			}
		}),
		Ve = B.valueOrDefault,
		He = B.options.resolve,
		Be = B.canvas._isPointInArea;

	function qe(e, t) {
		var n = e && e.options.ticks || {},
			i = n.reverse,
			r = void 0 === n.min ? t : 0,
			o = void 0 === n.max ? t : 0;
		return {
			start: i ? o : r,
			end: i ? r : o
		}
	}
	j._set("line", {
		showLines: !0,
		spanGaps: !1,
		hover: {
			mode: "label"
		},
		scales: {
			xAxes: [{
				type: "category",
				id: "x-axis-0"
			}],
			yAxes: [{
				type: "linear",
				id: "y-axis-0"
			}]
		}
	});
	var Ye = re.extend({
			datasetElementType: ke.Line,
			dataElementType: ke.Point,
			_datasetElementOptions: ["backgroundColor", "borderCapStyle", "borderColor", "borderDash", "borderDashOffset", "borderJoinStyle", "borderWidth", "cubicInterpolationMode", "fill"],
			_dataElementOptions: {
				backgroundColor: "pointBackgroundColor",
				borderColor: "pointBorderColor",
				borderWidth: "pointBorderWidth",
				hitRadius: "pointHitRadius",
				hoverBackgroundColor: "pointHoverBackgroundColor",
				hoverBorderColor: "pointHoverBorderColor",
				hoverBorderWidth: "pointHoverBorderWidth",
				hoverRadius: "pointHoverRadius",
				pointStyle: "pointStyle",
				radius: "pointRadius",
				rotation: "pointRotation"
			},
			update: function(e) {
				var t, n, i = this,
					r = i.getMeta(),
					o = r.dataset,
					a = r.data || [],
					s = i.chart.options,
					l = i._config,
					u = i._showLine = Ve(l.showLine, s.showLines);
				for (i._xScale = i.getScaleForId(r.xAxisID), i._yScale = i.getScaleForId(r.yAxisID), u && (void 0 !== l.tension && void 0 === l.lineTension && (l.lineTension = l.tension), o._scale = i._yScale, o._datasetIndex = i.index, o._children = a, o._model = i._resolveDatasetElementOptions(o), o.pivot()), t = 0, n = a.length; t < n; ++t) i.updateElement(a[t], t, e);
				for (u && 0 !== o._model.tension && i.updateBezierControlPoints(), t = 0, n = a.length; t < n; ++t) a[t].pivot()
			},
			updateElement: function(e, t, n) {
				var i, r, o = this,
					a = o.getMeta(),
					s = e.custom || {},
					l = o.getDataset(),
					u = o.index,
					c = l.data[t],
					d = o._xScale,
					f = o._yScale,
					h = a.dataset._model,
					p = o._resolveDataElementOptions(e, t);
				i = d.getPixelForValue("object" == typeof c ? c : NaN, t, u), r = n ? f.getBasePixel() : o.calculatePointY(c, t, u), e._xScale = d, e._yScale = f, e._options = p, e._datasetIndex = u, e._index = t, e._model = {
					x: i,
					y: r,
					skip: s.skip || isNaN(i) || isNaN(r),
					radius: p.radius,
					pointStyle: p.pointStyle,
					rotation: p.rotation,
					backgroundColor: p.backgroundColor,
					borderColor: p.borderColor,
					borderWidth: p.borderWidth,
					tension: Ve(s.tension, h ? h.tension : 0),
					steppedLine: !!h && h.steppedLine,
					hitRadius: p.hitRadius
				}
			},
			_resolveDatasetElementOptions: function(e) {
				var t, n, i, r, o, a, s, l, u, c, d, f = this,
					h = f._config,
					p = e.custom || {},
					g = f.chart.options,
					m = g.elements.line,
					v = re.prototype._resolveDatasetElementOptions.apply(f, arguments);
				return v.spanGaps = Ve(h.spanGaps, g.spanGaps), v.tension = Ve(h.lineTension, m.tension), v.steppedLine = He([p.steppedLine, h.steppedLine, m.stepped]), v.clip = (t = Ve(h.clip, (a = f._xScale, s = f._yScale, l = v.borderWidth, c = qe(a, u = l / 2), {
					top: (d = qe(s, u)).end,
					right: c.end,
					bottom: d.start,
					left: c.start
				})), B.isObject(t) ? (n = t.top, i = t.right, r = t.bottom, o = t.left) : n = i = r = o = t, {
					top: n,
					right: i,
					bottom: r,
					left: o
				}), v
			},
			calculatePointY: function(e, t, n) {
				var i, r, o, a, s, l, u, c = this.chart,
					d = this._yScale,
					f = 0,
					h = 0;
				if (d.options.stacked) {
					for (s = +d.getRightValue(e), u = (l = c._getSortedVisibleDatasetMetas()).length, i = 0; i < u && (o = l[i]).index !== n; ++i) r = c.data.datasets[o.index], "line" === o.type && o.yAxisID === d.id && ((a = +d.getRightValue(r.data[t])) < 0 ? h += a || 0 : f += a || 0);
					return s < 0 ? d.getPixelForValue(h + s) : d.getPixelForValue(f + s)
				}
				return d.getPixelForValue(e)
			},
			updateBezierControlPoints: function() {
				var e, t, n, i, r = this.chart,
					o = this.getMeta(),
					a = o.dataset._model,
					s = r.chartArea,
					l = o.data || [];

				function u(e, t, n) {
					return Math.max(Math.min(e, n), t)
				}
				if (a.spanGaps && (l = l.filter(function(e) {
						return !e._model.skip
					})), "monotone" === a.cubicInterpolationMode) B.splineCurveMonotone(l);
				else
					for (e = 0, t = l.length; e < t; ++e) n = l[e]._model, i = B.splineCurve(B.previousItem(l, e)._model, n, B.nextItem(l, e)._model, a.tension), n.controlPointPreviousX = i.previous.x, n.controlPointPreviousY = i.previous.y, n.controlPointNextX = i.next.x, n.controlPointNextY = i.next.y;
				if (r.options.elements.line.capBezierPoints)
					for (e = 0, t = l.length; e < t; ++e) n = l[e]._model, Be(n, s) && (e > 0 && Be(l[e - 1]._model, s) && (n.controlPointPreviousX = u(n.controlPointPreviousX, s.left, s.right), n.controlPointPreviousY = u(n.controlPointPreviousY, s.top, s.bottom)), e < l.length - 1 && Be(l[e + 1]._model, s) && (n.controlPointNextX = u(n.controlPointNextX, s.left, s.right), n.controlPointNextY = u(n.controlPointNextY, s.top, s.bottom)))
			},
			draw: function() {
				var e, t = this.chart,
					n = this.getMeta(),
					i = n.data || [],
					r = t.chartArea,
					o = t.canvas,
					a = 0,
					s = i.length;
				for (this._showLine && (e = n.dataset._model.clip, B.canvas.clipArea(t.ctx, {
						left: !1 === e.left ? 0 : r.left - e.left,
						right: !1 === e.right ? o.width : r.right + e.right,
						top: !1 === e.top ? 0 : r.top - e.top,
						bottom: !1 === e.bottom ? o.height : r.bottom + e.bottom
					}), n.dataset.draw(), B.canvas.unclipArea(t.ctx)); a < s; ++a) i[a].draw(r)
			},
			setHoverStyle: function(e) {
				var t = e._model,
					n = e._options,
					i = B.getHoverColor;
				e.$previousStyle = {
					backgroundColor: t.backgroundColor,
					borderColor: t.borderColor,
					borderWidth: t.borderWidth,
					radius: t.radius
				}, t.backgroundColor = Ve(n.hoverBackgroundColor, i(n.backgroundColor)), t.borderColor = Ve(n.hoverBorderColor, i(n.borderColor)), t.borderWidth = Ve(n.hoverBorderWidth, n.borderWidth), t.radius = Ve(n.hoverRadius, n.radius)
			}
		}),
		Ue = B.options.resolve;
	j._set("polarArea", {
		scale: {
			type: "radialLinear",
			angleLines: {
				display: !1
			},
			gridLines: {
				circular: !0
			},
			pointLabels: {
				display: !1
			},
			ticks: {
				beginAtZero: !0
			}
		},
		animation: {
			animateRotate: !0,
			animateScale: !0
		},
		startAngle: -.5 * Math.PI,
		legendCallback: function(e) {
			var t, n, i, r = document.createElement("ul"),
				o = e.data,
				a = o.datasets,
				s = o.labels;
			if (r.setAttribute("class", e.id + "-legend"), a.length)
				for (t = 0, n = a[0].data.length; t < n; ++t)(i = r.appendChild(document.createElement("li"))).appendChild(document.createElement("span")).style.backgroundColor = a[0].backgroundColor[t], s[t] && i.appendChild(document.createTextNode(s[t]));
			return r.outerHTML
		},
		legend: {
			labels: {
				generateLabels: function(e) {
					var t = e.data;
					return t.labels.length && t.datasets.length ? t.labels.map(function(n, i) {
						var r = e.getDatasetMeta(0),
							o = r.controller.getStyle(i);
						return {
							text: n,
							fillStyle: o.backgroundColor,
							strokeStyle: o.borderColor,
							lineWidth: o.borderWidth,
							hidden: isNaN(t.datasets[0].data[i]) || r.data[i].hidden,
							index: i
						}
					}) : []
				}
			},
			onClick: function(e, t) {
				var n, i, r, o = t.index,
					a = this.chart;
				for (n = 0, i = (a.data.datasets || []).length; n < i; ++n)(r = a.getDatasetMeta(n)).data[o].hidden = !r.data[o].hidden;
				a.update()
			}
		},
		tooltips: {
			callbacks: {
				title: function() {
					return ""
				},
				label: function(e, t) {
					return t.labels[e.index] + ": " + e.yLabel
				}
			}
		}
	});
	var $e = re.extend({
		dataElementType: ke.Arc,
		linkScales: B.noop,
		_dataElementOptions: ["backgroundColor", "borderColor", "borderWidth", "borderAlign", "hoverBackgroundColor", "hoverBorderColor", "hoverBorderWidth"],
		_getIndexScaleId: function() {
			return this.chart.scale.id
		},
		_getValueScaleId: function() {
			return this.chart.scale.id
		},
		update: function(e) {
			var t, n, i, r = this,
				o = r.getDataset(),
				a = r.getMeta(),
				s = r.chart.options.startAngle || 0,
				l = r._starts = [],
				u = r._angles = [],
				c = a.data;
			for (r._updateRadius(), a.count = r.countVisibleElements(), t = 0, n = o.data.length; t < n; t++) l[t] = s, i = r._computeAngle(t), u[t] = i, s += i;
			for (t = 0, n = c.length; t < n; ++t) c[t]._options = r._resolveDataElementOptions(c[t], t), r.updateElement(c[t], t, e)
		},
		_updateRadius: function() {
			var e = this,
				t = e.chart,
				n = t.chartArea,
				i = t.options,
				r = Math.min(n.right - n.left, n.bottom - n.top);
			t.outerRadius = Math.max(r / 2, 0), t.innerRadius = Math.max(i.cutoutPercentage ? t.outerRadius / 100 * i.cutoutPercentage : 1, 0), t.radiusLength = (t.outerRadius - t.innerRadius) / t.getVisibleDatasetCount(), e.outerRadius = t.outerRadius - t.radiusLength * e.index, e.innerRadius = e.outerRadius - t.radiusLength
		},
		updateElement: function(e, t, n) {
			var i = this,
				r = i.chart,
				o = i.getDataset(),
				a = r.options,
				s = a.animation,
				l = r.scale,
				u = r.data.labels,
				c = l.xCenter,
				d = l.yCenter,
				f = a.startAngle,
				h = e.hidden ? 0 : l.getDistanceFromCenterForValue(o.data[t]),
				p = i._starts[t],
				g = p + (e.hidden ? 0 : i._angles[t]),
				m = s.animateScale ? 0 : l.getDistanceFromCenterForValue(o.data[t]),
				v = e._options || {};
			B.extend(e, {
				_datasetIndex: i.index,
				_index: t,
				_scale: l,
				_model: {
					backgroundColor: v.backgroundColor,
					borderColor: v.borderColor,
					borderWidth: v.borderWidth,
					borderAlign: v.borderAlign,
					x: c,
					y: d,
					innerRadius: 0,
					outerRadius: n ? m : h,
					startAngle: n && s.animateRotate ? f : p,
					endAngle: n && s.animateRotate ? f : g,
					label: B.valueAtIndexOrDefault(u, t, u[t])
				}
			}), e.pivot()
		},
		countVisibleElements: function() {
			var e = this.getDataset(),
				t = this.getMeta(),
				n = 0;
			return B.each(t.data, function(t, i) {
				isNaN(e.data[i]) || t.hidden || n++
			}), n
		},
		setHoverStyle: function(e) {
			var t = e._model,
				n = e._options,
				i = B.getHoverColor,
				r = B.valueOrDefault;
			e.$previousStyle = {
				backgroundColor: t.backgroundColor,
				borderColor: t.borderColor,
				borderWidth: t.borderWidth
			}, t.backgroundColor = r(n.hoverBackgroundColor, i(n.backgroundColor)), t.borderColor = r(n.hoverBorderColor, i(n.borderColor)), t.borderWidth = r(n.hoverBorderWidth, n.borderWidth)
		},
		_computeAngle: function(e) {
			var t = this,
				n = this.getMeta().count,
				i = t.getDataset(),
				r = t.getMeta();
			if (isNaN(i.data[e]) || r.data[e].hidden) return 0;
			var o = {
				chart: t.chart,
				dataIndex: e,
				dataset: i,
				datasetIndex: t.index
			};
			return Ue([t.chart.options.elements.arc.angle, 2 * Math.PI / n], o, e)
		}
	});
	j._set("pie", B.clone(j.doughnut)), j._set("pie", {
		cutoutPercentage: 0
	});
	var Ge = We,
		Qe = B.valueOrDefault;
	j._set("radar", {
		spanGaps: !1,
		scale: {
			type: "radialLinear"
		},
		elements: {
			line: {
				fill: "start",
				tension: 0
			}
		}
	});
	var Xe = re.extend({
		datasetElementType: ke.Line,
		dataElementType: ke.Point,
		linkScales: B.noop,
		_datasetElementOptions: ["backgroundColor", "borderWidth", "borderColor", "borderCapStyle", "borderDash", "borderDashOffset", "borderJoinStyle", "fill"],
		_dataElementOptions: {
			backgroundColor: "pointBackgroundColor",
			borderColor: "pointBorderColor",
			borderWidth: "pointBorderWidth",
			hitRadius: "pointHitRadius",
			hoverBackgroundColor: "pointHoverBackgroundColor",
			hoverBorderColor: "pointHoverBorderColor",
			hoverBorderWidth: "pointHoverBorderWidth",
			hoverRadius: "pointHoverRadius",
			pointStyle: "pointStyle",
			radius: "pointRadius",
			rotation: "pointRotation"
		},
		_getIndexScaleId: function() {
			return this.chart.scale.id
		},
		_getValueScaleId: function() {
			return this.chart.scale.id
		},
		update: function(e) {
			var t, n, i = this,
				r = i.getMeta(),
				o = r.dataset,
				a = r.data || [],
				s = i.chart.scale,
				l = i._config;
			for (void 0 !== l.tension && void 0 === l.lineTension && (l.lineTension = l.tension), o._scale = s, o._datasetIndex = i.index, o._children = a, o._loop = !0, o._model = i._resolveDatasetElementOptions(o), o.pivot(), t = 0, n = a.length; t < n; ++t) i.updateElement(a[t], t, e);
			for (i.updateBezierControlPoints(), t = 0, n = a.length; t < n; ++t) a[t].pivot()
		},
		updateElement: function(e, t, n) {
			var i = this,
				r = e.custom || {},
				o = i.getDataset(),
				a = i.chart.scale,
				s = a.getPointPositionForValue(t, o.data[t]),
				l = i._resolveDataElementOptions(e, t),
				u = i.getMeta().dataset._model,
				c = n ? a.xCenter : s.x,
				d = n ? a.yCenter : s.y;
			e._scale = a, e._options = l, e._datasetIndex = i.index, e._index = t, e._model = {
				x: c,
				y: d,
				skip: r.skip || isNaN(c) || isNaN(d),
				radius: l.radius,
				pointStyle: l.pointStyle,
				rotation: l.rotation,
				backgroundColor: l.backgroundColor,
				borderColor: l.borderColor,
				borderWidth: l.borderWidth,
				tension: Qe(r.tension, u ? u.tension : 0),
				hitRadius: l.hitRadius
			}
		},
		_resolveDatasetElementOptions: function() {
			var e = this._config,
				t = this.chart.options,
				n = re.prototype._resolveDatasetElementOptions.apply(this, arguments);
			return n.spanGaps = Qe(e.spanGaps, t.spanGaps), n.tension = Qe(e.lineTension, t.elements.line.tension), n
		},
		updateBezierControlPoints: function() {
			var e, t, n, i, r = this.getMeta(),
				o = this.chart.chartArea,
				a = r.data || [];

			function s(e, t, n) {
				return Math.max(Math.min(e, n), t)
			}
			for (r.dataset._model.spanGaps && (a = a.filter(function(e) {
					return !e._model.skip
				})), e = 0, t = a.length; e < t; ++e) n = a[e]._model, i = B.splineCurve(B.previousItem(a, e, !0)._model, n, B.nextItem(a, e, !0)._model, n.tension), n.controlPointPreviousX = s(i.previous.x, o.left, o.right), n.controlPointPreviousY = s(i.previous.y, o.top, o.bottom), n.controlPointNextX = s(i.next.x, o.left, o.right), n.controlPointNextY = s(i.next.y, o.top, o.bottom)
		},
		setHoverStyle: function(e) {
			var t = e._model,
				n = e._options,
				i = B.getHoverColor;
			e.$previousStyle = {
				backgroundColor: t.backgroundColor,
				borderColor: t.borderColor,
				borderWidth: t.borderWidth,
				radius: t.radius
			}, t.backgroundColor = Qe(n.hoverBackgroundColor, i(n.backgroundColor)), t.borderColor = Qe(n.hoverBorderColor, i(n.borderColor)), t.borderWidth = Qe(n.hoverBorderWidth, n.borderWidth), t.radius = Qe(n.hoverRadius, n.radius)
		}
	});
	j._set("scatter", {
		hover: {
			mode: "single"
		},
		scales: {
			xAxes: [{
				id: "x-axis-1",
				type: "linear",
				position: "bottom"
			}],
			yAxes: [{
				id: "y-axis-1",
				type: "linear",
				position: "left"
			}]
		},
		tooltips: {
			callbacks: {
				title: function() {
					return ""
				},
				label: function(e) {
					return "(" + e.xLabel + ", " + e.yLabel + ")"
				}
			}
		}
	}), j._set("global", {
		datasets: {
			scatter: {
				showLine: !1
			}
		}
	});
	var Je = {
		bar: Pe,
		bubble: Re,
		doughnut: We,
		horizontalBar: ze,
		line: Ye,
		polarArea: $e,
		pie: Ge,
		radar: Xe,
		scatter: Ye
	};

	function Ze(e, t) {
		return e.native ? {
			x: e.x,
			y: e.y
		} : B.getRelativePosition(e, t)
	}

	function Ke(e, t) {
		var n, i, r, o, a, s, l = e._getSortedVisibleDatasetMetas();
		for (i = 0, o = l.length; i < o; ++i)
			for (r = 0, a = (n = l[i].data).length; r < a; ++r)(s = n[r])._view.skip || t(s)
	}

	function et(e, t) {
		var n = [];
		return Ke(e, function(e) {
			e.inRange(t.x, t.y) && n.push(e)
		}), n
	}

	function tt(e, t, n, i) {
		var r = Number.POSITIVE_INFINITY,
			o = [];
		return Ke(e, function(e) {
			if (!n || e.inRange(t.x, t.y)) {
				var a = e.getCenterPoint(),
					s = i(t, a);
				s < r ? (o = [e], r = s) : s === r && o.push(e)
			}
		}), o
	}

	function nt(e) {
		var t = -1 !== e.indexOf("x"),
			n = -1 !== e.indexOf("y");
		return function(e, i) {
			var r = t ? Math.abs(e.x - i.x) : 0,
				o = n ? Math.abs(e.y - i.y) : 0;
			return Math.sqrt(Math.pow(r, 2) + Math.pow(o, 2))
		}
	}

	function it(e, t, n) {
		var i = Ze(t, e);
		n.axis = n.axis || "x";
		var r = nt(n.axis),
			o = n.intersect ? et(e, i) : tt(e, i, !1, r),
			a = [];
		return o.length ? (e._getSortedVisibleDatasetMetas().forEach(function(e) {
			var t = e.data[o[0]._index];
			t && !t._view.skip && a.push(t)
		}), a) : []
	}
	var rt = {
			modes: {
				single: function(e, t) {
					var n = Ze(t, e),
						i = [];
					return Ke(e, function(e) {
						if (e.inRange(n.x, n.y)) return i.push(e), i
					}), i.slice(0, 1)
				},
				label: it,
				index: it,
				dataset: function(e, t, n) {
					var i = Ze(t, e);
					n.axis = n.axis || "xy";
					var r = nt(n.axis),
						o = n.intersect ? et(e, i) : tt(e, i, !1, r);
					return o.length > 0 && (o = e.getDatasetMeta(o[0]._datasetIndex).data), o
				},
				"x-axis": function(e, t) {
					return it(e, t, {
						intersect: !1
					})
				},
				point: function(e, t) {
					return et(e, Ze(t, e))
				},
				nearest: function(e, t, n) {
					var i = Ze(t, e);
					n.axis = n.axis || "xy";
					var r = nt(n.axis);
					return tt(e, i, n.intersect, r)
				},
				x: function(e, t, n) {
					var i = Ze(t, e),
						r = [],
						o = !1;
					return Ke(e, function(e) {
						e.inXRange(i.x) && r.push(e), e.inRange(i.x, i.y) && (o = !0)
					}), n.intersect && !o && (r = []), r
				},
				y: function(e, t, n) {
					var i = Ze(t, e),
						r = [],
						o = !1;
					return Ke(e, function(e) {
						e.inYRange(i.y) && r.push(e), e.inRange(i.x, i.y) && (o = !0)
					}), n.intersect && !o && (r = []), r
				}
			}
		},
		ot = B.extend;

	function at(e, t) {
		return B.where(e, function(e) {
			return e.pos === t
		})
	}

	function st(e, t) {
		return e.sort(function(e, n) {
			var i = t ? n : e,
				r = t ? e : n;
			return i.weight === r.weight ? i.index - r.index : i.weight - r.weight
		})
	}

	function lt(e, t, n, i) {
		return Math.max(e[n], t[n]) + Math.max(e[i], t[i])
	}

	function ut(e, t, n) {
		var i, r, o = n.box,
			a = e.maxPadding;
		if (n.size && (e[n.pos] -= n.size), n.size = n.horizontal ? o.height : o.width, e[n.pos] += n.size, o.getPadding) {
			var s = o.getPadding();
			a.top = Math.max(a.top, s.top), a.left = Math.max(a.left, s.left), a.bottom = Math.max(a.bottom, s.bottom), a.right = Math.max(a.right, s.right)
		}
		if (i = t.outerWidth - lt(a, e, "left", "right"), r = t.outerHeight - lt(a, e, "top", "bottom"), i !== e.w || r !== e.h) {
			e.w = i, e.h = r;
			var l = n.horizontal ? [i, e.w] : [r, e.h];
			return !(l[0] === l[1] || isNaN(l[0]) && isNaN(l[1]))
		}
	}

	function ct(e, t) {
		var n = t.maxPadding;

		function i(e) {
			var i = {
				left: 0,
				top: 0,
				right: 0,
				bottom: 0
			};
			return e.forEach(function(e) {
				i[e] = Math.max(t[e], n[e])
			}), i
		}
		return i(e ? ["left", "right"] : ["top", "bottom"])
	}

	function dt(e, t, n) {
		var i, r, o, a, s, l, u = [];
		for (i = 0, r = e.length; i < r; ++i)(a = (o = e[i]).box).update(o.width || t.w, o.height || t.h, ct(o.horizontal, t)), ut(t, n, o) && (l = !0, u.length && (s = !0)), a.fullWidth || u.push(o);
		return s && dt(u, t, n) || l
	}

	function ft(e, t, n) {
		var i, r, o, a, s = n.padding,
			l = t.x,
			u = t.y;
		for (i = 0, r = e.length; i < r; ++i) a = (o = e[i]).box, o.horizontal ? (a.left = a.fullWidth ? s.left : t.left, a.right = a.fullWidth ? n.outerWidth - s.right : t.left + t.w, a.top = u, a.bottom = u + a.height, a.width = a.right - a.left, u = a.bottom) : (a.left = l, a.right = l + a.width, a.top = t.top, a.bottom = t.top + t.h, a.height = a.bottom - a.top, l = a.right);
		t.x = l, t.y = u
	}
	j._set("global", {
		layout: {
			padding: {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			}
		}
	});
	var ht, pt = {
			defaults: {},
			addBox: function(e, t) {
				e.boxes || (e.boxes = []), t.fullWidth = t.fullWidth || !1, t.position = t.position || "top", t.weight = t.weight || 0, t._layers = t._layers || function() {
					return [{
						z: 0,
						draw: function() {
							t.draw.apply(t, arguments)
						}
					}]
				}, e.boxes.push(t)
			},
			removeBox: function(e, t) {
				var n = e.boxes ? e.boxes.indexOf(t) : -1; - 1 !== n && e.boxes.splice(n, 1)
			},
			configure: function(e, t, n) {
				for (var i, r = ["fullWidth", "position", "weight"], o = r.length, a = 0; a < o; ++a) i = r[a], n.hasOwnProperty(i) && (t[i] = n[i])
			},
			update: function(e, t, n) {
				if (e) {
					var i = e.options.layout || {},
						r = B.options.toPadding(i.padding),
						o = t - r.width,
						a = n - r.height,
						s = function(e) {
							var t = function(e) {
									var t, n, i, r = [];
									for (t = 0, n = (e || []).length; t < n; ++t) i = e[t], r.push({
										index: t,
										box: i,
										pos: i.position,
										horizontal: i.isHorizontal(),
										weight: i.weight
									});
									return r
								}(e),
								n = st(at(t, "left"), !0),
								i = st(at(t, "right")),
								r = st(at(t, "top"), !0),
								o = st(at(t, "bottom"));
							return {
								leftAndTop: n.concat(r),
								rightAndBottom: i.concat(o),
								chartArea: at(t, "chartArea"),
								vertical: n.concat(i),
								horizontal: r.concat(o)
							}
						}(e.boxes),
						l = s.vertical,
						u = s.horizontal,
						c = Object.freeze({
							outerWidth: t,
							outerHeight: n,
							padding: r,
							availableWidth: o,
							vBoxMaxWidth: o / 2 / l.length,
							hBoxMaxHeight: a / 2
						}),
						d = ot({
							maxPadding: ot({}, r),
							w: o,
							h: a,
							x: r.left,
							y: r.top
						}, r);
					! function(e, t) {
						var n, i, r;
						for (n = 0, i = e.length; n < i; ++n)(r = e[n]).width = r.horizontal ? r.box.fullWidth && t.availableWidth : t.vBoxMaxWidth, r.height = r.horizontal && t.hBoxMaxHeight
					}(l.concat(u), c), dt(l, d, c), dt(u, d, c) && dt(l, d, c),
						function(e) {
							var t = e.maxPadding;

							function n(n) {
								var i = Math.max(t[n] - e[n], 0);
								return e[n] += i, i
							}
							e.y += n("top"), e.x += n("left"), n("right"), n("bottom")
						}(d), ft(s.leftAndTop, d, c), d.x += d.w, d.y += d.h, ft(s.rightAndBottom, d, c), e.chartArea = {
							left: d.left,
							top: d.top,
							right: d.left + d.w,
							bottom: d.top + d.h
						}, B.each(s.chartArea, function(t) {
							var n = t.box;
							ot(n, e.chartArea), n.update(d.w, d.h)
						})
				}
			}
		},
		gt = (ht = Object.freeze({
			__proto__: null,
			default: "/*\r\n * DOM element rendering detection\r\n * https://davidwalsh.name/detect-node-insertion\r\n */\r\n@keyframes chartjs-render-animation {\r\n\tfrom { opacity: 0.99; }\r\n\tto { opacity: 1; }\r\n}\r\n\r\n.chartjs-render-monitor {\r\n\tanimation: chartjs-render-animation 0.001s;\r\n}\r\n\r\n/*\r\n * DOM element resizing detection\r\n * https://github.com/marcj/css-element-queries\r\n */\r\n.chartjs-size-monitor,\r\n.chartjs-size-monitor-expand,\r\n.chartjs-size-monitor-shrink {\r\n\tposition: absolute;\r\n\tdirection: ltr;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\tright: 0;\r\n\tbottom: 0;\r\n\toverflow: hidden;\r\n\tpointer-events: none;\r\n\tvisibility: hidden;\r\n\tz-index: -1;\r\n}\r\n\r\n.chartjs-size-monitor-expand > div {\r\n\tposition: absolute;\r\n\twidth: 1000000px;\r\n\theight: 1000000px;\r\n\tleft: 0;\r\n\ttop: 0;\r\n}\r\n\r\n.chartjs-size-monitor-shrink > div {\r\n\tposition: absolute;\r\n\twidth: 200%;\r\n\theight: 200%;\r\n\tleft: 0;\r\n\ttop: 0;\r\n}\r\n"
		})) && ht.default || ht,
		mt = "$chartjs",
		vt = "chartjs-size-monitor",
		bt = "chartjs-render-monitor",
		yt = "chartjs-render-animation",
		_t = ["animationstart", "webkitAnimationStart"],
		xt = {
			touchstart: "mousedown",
			touchmove: "mousemove",
			touchend: "mouseup",
			pointerenter: "mouseenter",
			pointerdown: "mousedown",
			pointermove: "mousemove",
			pointerup: "mouseup",
			pointerleave: "mouseout",
			pointerout: "mouseout"
		};

	function wt(e, t) {
		var n = B.getStyle(e, t),
			i = n && n.match(/^(\d+)(\.\d+)?px$/);
		return i ? Number(i[1]) : void 0
	}
	var kt = !! function() {
		var e = !1;
		try {
			var t = Object.defineProperty({}, "passive", {
				get: function() {
					e = !0
				}
			});
			window.addEventListener("e", null, t)
		} catch (e) {}
		return e
	}() && {
		passive: !0
	};

	function St(e, t, n) {
		e.addEventListener(t, n, kt)
	}

	function Ct(e, t, n) {
		e.removeEventListener(t, n, kt)
	}

	function Tt(e, t, n, i, r) {
		return {
			type: e,
			chart: t,
			native: r || null,
			x: void 0 !== n ? n : null,
			y: void 0 !== i ? i : null
		}
	}

	function Dt(e) {
		var t = document.createElement("div");
		return t.className = e || "", t
	}

	function Mt(e, t, n) {
		var i, r, o, a, s = e[mt] || (e[mt] = {}),
			l = s.resizer = function(e) {
				var t = Dt(vt),
					n = Dt(vt + "-expand"),
					i = Dt(vt + "-shrink");
				n.appendChild(Dt()), i.appendChild(Dt()), t.appendChild(n), t.appendChild(i), t._reset = function() {
					n.scrollLeft = 1e6, n.scrollTop = 1e6, i.scrollLeft = 1e6, i.scrollTop = 1e6
				};
				var r = function() {
					t._reset(), e()
				};
				return St(n, "scroll", r.bind(n, "expand")), St(i, "scroll", r.bind(i, "shrink")), t
			}((i = function() {
				if (s.resizer) {
					var i = n.options.maintainAspectRatio && e.parentNode,
						r = i ? i.clientWidth : 0;
					t(Tt("resize", n)), i && i.clientWidth < r && n.canvas && t(Tt("resize", n))
				}
			}, o = !1, a = [], function() {
				a = Array.prototype.slice.call(arguments), r = r || this, o || (o = !0, B.requestAnimFrame.call(window, function() {
					o = !1, i.apply(r, a)
				}))
			}));
		! function(e, t) {
			var n = e[mt] || (e[mt] = {}),
				i = n.renderProxy = function(e) {
					e.animationName === yt && t()
				};
			B.each(_t, function(t) {
				St(e, t, i)
			}), n.reflow = !!e.offsetParent, e.classList.add(bt)
		}(e, function() {
			if (s.resizer) {
				var t = e.parentNode;
				t && t !== l.parentNode && t.insertBefore(l, t.firstChild), l._reset()
			}
		})
	}

	function Et(e) {
		var t = e[mt] || {},
			n = t.resizer;
		delete t.resizer,
			function(e) {
				var t = e[mt] || {},
					n = t.renderProxy;
				n && (B.each(_t, function(t) {
					Ct(e, t, n)
				}), delete t.renderProxy), e.classList.remove(bt)
			}(e), n && n.parentNode && n.parentNode.removeChild(n)
	}
	var At = {
		disableCSSInjection: !1,
		_enabled: "undefined" != typeof window && "undefined" != typeof document,
		_ensureLoaded: function(e) {
			if (!this.disableCSSInjection) {
				var t = e.getRootNode ? e.getRootNode() : document;
				! function(e, t) {
					var n = e[mt] || (e[mt] = {});
					if (!n.containsStyles) {
						n.containsStyles = !0, t = "/* Chart.js */\n" + t;
						var i = document.createElement("style");
						i.setAttribute("type", "text/css"), i.appendChild(document.createTextNode(t)), e.appendChild(i)
					}
				}(t.host ? t : document.head, gt)
			}
		},
		acquireContext: function(e, t) {
			"string" == typeof e ? e = document.getElementById(e) : e.length && (e = e[0]), e && e.canvas && (e = e.canvas);
			var n = e && e.getContext && e.getContext("2d");
			return n && n.canvas === e ? (this._ensureLoaded(e), function(e, t) {
				var n = e.style,
					i = e.getAttribute("height"),
					r = e.getAttribute("width");
				if (e[mt] = {
						initial: {
							height: i,
							width: r,
							style: {
								display: n.display,
								height: n.height,
								width: n.width
							}
						}
					}, n.display = n.display || "block", null === r || "" === r) {
					var o = wt(e, "width");
					void 0 !== o && (e.width = o)
				}
				if (null === i || "" === i)
					if ("" === e.style.height) e.height = e.width / (t.options.aspectRatio || 2);
					else {
						var a = wt(e, "height");
						void 0 !== o && (e.height = a)
					}
			}(e, t), n) : null
		},
		releaseContext: function(e) {
			var t = e.canvas;
			if (t[mt]) {
				var n = t[mt].initial;
				["height", "width"].forEach(function(e) {
					var i = n[e];
					B.isNullOrUndef(i) ? t.removeAttribute(e) : t.setAttribute(e, i)
				}), B.each(n.style || {}, function(e, n) {
					t.style[n] = e
				}), t.width = t.width, delete t[mt]
			}
		},
		addEventListener: function(e, t, n) {
			var i = e.canvas;
			if ("resize" !== t) {
				var r = n[mt] || (n[mt] = {});
				St(i, t, (r.proxies || (r.proxies = {}))[e.id + "_" + t] = function(t) {
					n(function(e, t) {
						var n = xt[e.type] || e.type,
							i = B.getRelativePosition(e, t);
						return Tt(n, t, i.x, i.y, e)
					}(t, e))
				})
			} else Mt(i, n, e)
		},
		removeEventListener: function(e, t, n) {
			var i = e.canvas;
			if ("resize" !== t) {
				var r = ((n[mt] || {}).proxies || {})[e.id + "_" + t];
				r && Ct(i, t, r)
			} else Et(i)
		}
	};
	B.addEvent = St, B.removeEvent = Ct;
	var Pt = At._enabled ? At : {
			acquireContext: function(e) {
				return e && e.canvas && (e = e.canvas), e && e.getContext("2d") || null
			}
		},
		Ot = B.extend({
			initialize: function() {},
			acquireContext: function() {},
			releaseContext: function() {},
			addEventListener: function() {},
			removeEventListener: function() {}
		}, Pt);
	j._set("global", {
		plugins: {}
	});
	var Nt = {
			_plugins: [],
			_cacheId: 0,
			register: function(e) {
				var t = this._plugins;
				[].concat(e).forEach(function(e) {
					-1 === t.indexOf(e) && t.push(e)
				}), this._cacheId++
			},
			unregister: function(e) {
				var t = this._plugins;
				[].concat(e).forEach(function(e) {
					var n = t.indexOf(e); - 1 !== n && t.splice(n, 1)
				}), this._cacheId++
			},
			clear: function() {
				this._plugins = [], this._cacheId++
			},
			count: function() {
				return this._plugins.length
			},
			getAll: function() {
				return this._plugins
			},
			notify: function(e, t, n) {
				var i, r, o, a, s, l = this.descriptors(e),
					u = l.length;
				for (i = 0; i < u; ++i)
					if ("function" == typeof(s = (o = (r = l[i]).plugin)[t]) && ((a = [e].concat(n || [])).push(r.options), !1 === s.apply(o, a))) return !1;
				return !0
			},
			descriptors: function(e) {
				var t = e.$plugins || (e.$plugins = {});
				if (t.id === this._cacheId) return t.descriptors;
				var n = [],
					i = [],
					r = e && e.config || {},
					o = r.options && r.options.plugins || {};
				return this._plugins.concat(r.plugins || []).forEach(function(e) {
					if (-1 === n.indexOf(e)) {
						var t = e.id,
							r = o[t];
						!1 !== r && (!0 === r && (r = B.clone(j.global.plugins[t])), n.push(e), i.push({
							plugin: e,
							options: r || {}
						}))
					}
				}), t.descriptors = i, t.id = this._cacheId, i
			},
			_invalidate: function(e) {
				delete e.$plugins
			}
		},
		Rt = {
			constructors: {},
			defaults: {},
			registerScaleType: function(e, t, n) {
				this.constructors[e] = t, this.defaults[e] = B.clone(n)
			},
			getScaleConstructor: function(e) {
				return this.constructors.hasOwnProperty(e) ? this.constructors[e] : void 0
			},
			getScaleDefaults: function(e) {
				return this.defaults.hasOwnProperty(e) ? B.merge(Object.create(null), [j.scale, this.defaults[e]]) : {}
			},
			updateScaleDefaults: function(e, t) {
				this.defaults.hasOwnProperty(e) && (this.defaults[e] = B.extend(this.defaults[e], t))
			},
			addScalesToLayout: function(e) {
				B.each(e.scales, function(t) {
					t.fullWidth = t.options.fullWidth, t.position = t.options.position, t.weight = t.options.weight, pt.addBox(e, t)
				})
			}
		},
		It = B.valueOrDefault,
		Lt = B.rtl.getRtlAdapter;
	j._set("global", {
		tooltips: {
			enabled: !0,
			custom: null,
			mode: "nearest",
			position: "average",
			intersect: !0,
			backgroundColor: "rgba(0,0,0,0.8)",
			titleFontStyle: "bold",
			titleSpacing: 2,
			titleMarginBottom: 6,
			titleFontColor: "#fff",
			titleAlign: "left",
			bodySpacing: 2,
			bodyFontColor: "#fff",
			bodyAlign: "left",
			footerFontStyle: "bold",
			footerSpacing: 2,
			footerMarginTop: 6,
			footerFontColor: "#fff",
			footerAlign: "left",
			yPadding: 6,
			xPadding: 6,
			caretPadding: 2,
			caretSize: 5,
			cornerRadius: 6,
			multiKeyBackground: "#fff",
			displayColors: !0,
			borderColor: "rgba(0,0,0,0)",
			borderWidth: 0,
			callbacks: {
				beforeTitle: B.noop,
				title: function(e, t) {
					var n = "",
						i = t.labels,
						r = i ? i.length : 0;
					if (e.length > 0) {
						var o = e[0];
						o.label ? n = o.label : o.xLabel ? n = o.xLabel : r > 0 && o.index < r && (n = i[o.index])
					}
					return n
				},
				afterTitle: B.noop,
				beforeBody: B.noop,
				beforeLabel: B.noop,
				label: function(e, t) {
					var n = t.datasets[e.datasetIndex].label || "";
					return n && (n += ": "), B.isNullOrUndef(e.value) ? n += e.yLabel : n += e.value, n
				},
				labelColor: function(e, t) {
					var n = t.getDatasetMeta(e.datasetIndex).data[e.index]._view;
					return {
						borderColor: n.borderColor,
						backgroundColor: n.backgroundColor
					}
				},
				labelTextColor: function() {
					return this._options.bodyFontColor
				},
				afterLabel: B.noop,
				afterBody: B.noop,
				beforeFooter: B.noop,
				footer: B.noop,
				afterFooter: B.noop
			}
		}
	});
	var Ft = {
		average: function(e) {
			if (!e.length) return !1;
			var t, n, i = 0,
				r = 0,
				o = 0;
			for (t = 0, n = e.length; t < n; ++t) {
				var a = e[t];
				if (a && a.hasValue()) {
					var s = a.tooltipPosition();
					i += s.x, r += s.y, ++o
				}
			}
			return {
				x: i / o,
				y: r / o
			}
		},
		nearest: function(e, t) {
			var n, i, r, o = t.x,
				a = t.y,
				s = Number.POSITIVE_INFINITY;
			for (n = 0, i = e.length; n < i; ++n) {
				var l = e[n];
				if (l && l.hasValue()) {
					var u = l.getCenterPoint(),
						c = B.distanceBetweenPoints(t, u);
					c < s && (s = c, r = l)
				}
			}
			if (r) {
				var d = r.tooltipPosition();
				o = d.x, a = d.y
			}
			return {
				x: o,
				y: a
			}
		}
	};

	function jt(e, t) {
		return t && (B.isArray(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e
	}

	function Wt(e) {
		return ("string" == typeof e || e instanceof String) && e.indexOf("\n") > -1 ? e.split("\n") : e
	}

	function zt(e) {
		var t = j.global;
		return {
			xPadding: e.xPadding,
			yPadding: e.yPadding,
			xAlign: e.xAlign,
			yAlign: e.yAlign,
			rtl: e.rtl,
			textDirection: e.textDirection,
			bodyFontColor: e.bodyFontColor,
			_bodyFontFamily: It(e.bodyFontFamily, t.defaultFontFamily),
			_bodyFontStyle: It(e.bodyFontStyle, t.defaultFontStyle),
			_bodyAlign: e.bodyAlign,
			bodyFontSize: It(e.bodyFontSize, t.defaultFontSize),
			bodySpacing: e.bodySpacing,
			titleFontColor: e.titleFontColor,
			_titleFontFamily: It(e.titleFontFamily, t.defaultFontFamily),
			_titleFontStyle: It(e.titleFontStyle, t.defaultFontStyle),
			titleFontSize: It(e.titleFontSize, t.defaultFontSize),
			_titleAlign: e.titleAlign,
			titleSpacing: e.titleSpacing,
			titleMarginBottom: e.titleMarginBottom,
			footerFontColor: e.footerFontColor,
			_footerFontFamily: It(e.footerFontFamily, t.defaultFontFamily),
			_footerFontStyle: It(e.footerFontStyle, t.defaultFontStyle),
			footerFontSize: It(e.footerFontSize, t.defaultFontSize),
			_footerAlign: e.footerAlign,
			footerSpacing: e.footerSpacing,
			footerMarginTop: e.footerMarginTop,
			caretSize: e.caretSize,
			cornerRadius: e.cornerRadius,
			backgroundColor: e.backgroundColor,
			opacity: 0,
			legendColorBackground: e.multiKeyBackground,
			displayColors: e.displayColors,
			borderColor: e.borderColor,
			borderWidth: e.borderWidth
		}
	}

	function Vt(e, t) {
		return "center" === t ? e.x + e.width / 2 : "right" === t ? e.x + e.width - e.xPadding : e.x + e.xPadding
	}

	function Ht(e) {
		return jt([], Wt(e))
	}
	var Bt = X.extend({
			initialize: function() {
				this._model = zt(this._options), this._lastActive = []
			},
			getTitle: function() {
				var e = this._options.callbacks,
					t = e.beforeTitle.apply(this, arguments),
					n = e.title.apply(this, arguments),
					i = e.afterTitle.apply(this, arguments),
					r = [];
				return r = jt(r, Wt(t)), r = jt(r, Wt(n)), r = jt(r, Wt(i))
			},
			getBeforeBody: function() {
				return Ht(this._options.callbacks.beforeBody.apply(this, arguments))
			},
			getBody: function(e, t) {
				var n = this,
					i = n._options.callbacks,
					r = [];
				return B.each(e, function(e) {
					var o = {
						before: [],
						lines: [],
						after: []
					};
					jt(o.before, Wt(i.beforeLabel.call(n, e, t))), jt(o.lines, i.label.call(n, e, t)), jt(o.after, Wt(i.afterLabel.call(n, e, t))), r.push(o)
				}), r
			},
			getAfterBody: function() {
				return Ht(this._options.callbacks.afterBody.apply(this, arguments))
			},
			getFooter: function() {
				var e = this._options.callbacks,
					t = e.beforeFooter.apply(this, arguments),
					n = e.footer.apply(this, arguments),
					i = e.afterFooter.apply(this, arguments),
					r = [];
				return r = jt(r, Wt(t)), r = jt(r, Wt(n)), r = jt(r, Wt(i))
			},
			update: function(e) {
				var t, n, i, r, o, a, s, l, u, c, d = this,
					f = d._options,
					h = d._model,
					p = d._model = zt(f),
					g = d._active,
					m = d._data,
					v = {
						xAlign: h.xAlign,
						yAlign: h.yAlign
					},
					b = {
						x: h.x,
						y: h.y
					},
					y = {
						width: h.width,
						height: h.height
					},
					_ = {
						x: h.caretX,
						y: h.caretY
					};
				if (g.length) {
					p.opacity = 1;
					var x = [],
						w = [];
					_ = Ft[f.position].call(d, g, d._eventPosition);
					var k = [];
					for (t = 0, n = g.length; t < n; ++t) k.push((i = g[t], r = void 0, o = void 0, a = void 0, s = void 0, l = void 0, u = void 0, c = void 0, r = i._xScale, o = i._yScale || i._scale, a = i._index, s = i._datasetIndex, l = i._chart.getDatasetMeta(s).controller, u = l._getIndexScale(), c = l._getValueScale(), {
						xLabel: r ? r.getLabelForIndex(a, s) : "",
						yLabel: o ? o.getLabelForIndex(a, s) : "",
						label: u ? "" + u.getLabelForIndex(a, s) : "",
						value: c ? "" + c.getLabelForIndex(a, s) : "",
						index: a,
						datasetIndex: s,
						x: i._model.x,
						y: i._model.y
					}));
					f.filter && (k = k.filter(function(e) {
						return f.filter(e, m)
					})), f.itemSort && (k = k.sort(function(e, t) {
						return f.itemSort(e, t, m)
					})), B.each(k, function(e) {
						x.push(f.callbacks.labelColor.call(d, e, d._chart)), w.push(f.callbacks.labelTextColor.call(d, e, d._chart))
					}), p.title = d.getTitle(k, m), p.beforeBody = d.getBeforeBody(k, m), p.body = d.getBody(k, m), p.afterBody = d.getAfterBody(k, m), p.footer = d.getFooter(k, m), p.x = _.x, p.y = _.y, p.caretPadding = f.caretPadding, p.labelColors = x, p.labelTextColors = w, p.dataPoints = k, y = function(e, t) {
						var n = e._chart.ctx,
							i = 2 * t.yPadding,
							r = 0,
							o = t.body,
							a = o.reduce(function(e, t) {
								return e + t.before.length + t.lines.length + t.after.length
							}, 0);
						a += t.beforeBody.length + t.afterBody.length;
						var s = t.title.length,
							l = t.footer.length,
							u = t.titleFontSize,
							c = t.bodyFontSize,
							d = t.footerFontSize;
						i += s * u, i += s ? (s - 1) * t.titleSpacing : 0, i += s ? t.titleMarginBottom : 0, i += a * c, i += a ? (a - 1) * t.bodySpacing : 0, i += l ? t.footerMarginTop : 0, i += l * d, i += l ? (l - 1) * t.footerSpacing : 0;
						var f = 0,
							h = function(e) {
								r = Math.max(r, n.measureText(e).width + f)
							};
						return n.font = B.fontString(u, t._titleFontStyle, t._titleFontFamily), B.each(t.title, h), n.font = B.fontString(c, t._bodyFontStyle, t._bodyFontFamily), B.each(t.beforeBody.concat(t.afterBody), h), f = t.displayColors ? c + 2 : 0, B.each(o, function(e) {
							B.each(e.before, h), B.each(e.lines, h), B.each(e.after, h)
						}), f = 0, n.font = B.fontString(d, t._footerFontStyle, t._footerFontFamily), B.each(t.footer, h), {
							width: r += 2 * t.xPadding,
							height: i
						}
					}(this, p), b = function(e, t, n, i) {
						var r = e.x,
							o = e.y,
							a = e.caretSize,
							s = e.caretPadding,
							l = e.cornerRadius,
							u = n.xAlign,
							c = n.yAlign,
							d = a + s,
							f = l + s;
						return "right" === u ? r -= t.width : "center" === u && ((r -= t.width / 2) + t.width > i.width && (r = i.width - t.width), r < 0 && (r = 0)), "top" === c ? o += d : o -= "bottom" === c ? t.height + d : t.height / 2, "center" === c ? "left" === u ? r += d : "right" === u && (r -= d) : "left" === u ? r -= f : "right" === u && (r += f), {
							x: r,
							y: o
						}
					}(p, y, v = function(e, t) {
						var n, i, r, o, a, s = e._model,
							l = e._chart,
							u = e._chart.chartArea,
							c = "center",
							d = "center";
						s.y < t.height ? d = "top" : s.y > l.height - t.height && (d = "bottom");
						var f = (u.left + u.right) / 2,
							h = (u.top + u.bottom) / 2;
						"center" === d ? (n = function(e) {
							return e <= f
						}, i = function(e) {
							return e > f
						}) : (n = function(e) {
							return e <= t.width / 2
						}, i = function(e) {
							return e >= l.width - t.width / 2
						}), r = function(e) {
							return e + t.width + s.caretSize + s.caretPadding > l.width
						}, o = function(e) {
							return e - t.width - s.caretSize - s.caretPadding < 0
						}, a = function(e) {
							return e <= h ? "top" : "bottom"
						}, n(s.x) ? (c = "left", r(s.x) && (c = "center", d = a(s.y))) : i(s.x) && (c = "right", o(s.x) && (c = "center", d = a(s.y)));
						var p = e._options;
						return {
							xAlign: p.xAlign ? p.xAlign : c,
							yAlign: p.yAlign ? p.yAlign : d
						}
					}(this, y), d._chart)
				} else p.opacity = 0;
				return p.xAlign = v.xAlign, p.yAlign = v.yAlign, p.x = b.x, p.y = b.y, p.width = y.width, p.height = y.height, p.caretX = _.x, p.caretY = _.y, d._model = p, e && f.custom && f.custom.call(d, p), d
			},
			drawCaret: function(e, t) {
				var n = this._chart.ctx,
					i = this._view,
					r = this.getCaretPosition(e, t, i);
				n.lineTo(r.x1, r.y1), n.lineTo(r.x2, r.y2), n.lineTo(r.x3, r.y3)
			},
			getCaretPosition: function(e, t, n) {
				var i, r, o, a, s, l, u = n.caretSize,
					c = n.cornerRadius,
					d = n.xAlign,
					f = n.yAlign,
					h = e.x,
					p = e.y,
					g = t.width,
					m = t.height;
				if ("center" === f) s = p + m / 2, "left" === d ? (r = (i = h) - u, o = i, a = s + u, l = s - u) : (r = (i = h + g) + u, o = i, a = s - u, l = s + u);
				else if ("left" === d ? (i = (r = h + c + u) - u, o = r + u) : "right" === d ? (i = (r = h + g - c - u) - u, o = r + u) : (i = (r = n.caretX) - u, o = r + u), "top" === f) s = (a = p) - u, l = a;
				else {
					s = (a = p + m) + u, l = a;
					var v = o;
					o = i, i = v
				}
				return {
					x1: i,
					x2: r,
					x3: o,
					y1: a,
					y2: s,
					y3: l
				}
			},
			drawTitle: function(e, t, n) {
				var i, r, o, a = t.title,
					s = a.length;
				if (s) {
					var l = Lt(t.rtl, t.x, t.width);
					for (e.x = Vt(t, t._titleAlign), n.textAlign = l.textAlign(t._titleAlign), n.textBaseline = "middle", i = t.titleFontSize, r = t.titleSpacing, n.fillStyle = t.titleFontColor, n.font = B.fontString(i, t._titleFontStyle, t._titleFontFamily), o = 0; o < s; ++o) n.fillText(a[o], l.x(e.x), e.y + i / 2), e.y += i + r, o + 1 === s && (e.y += t.titleMarginBottom - r)
				}
			},
			drawBody: function(e, t, n) {
				var i, r, o, a, s, l, u, c, d = t.bodyFontSize,
					f = t.bodySpacing,
					h = t._bodyAlign,
					p = t.body,
					g = t.displayColors,
					m = 0,
					v = g ? Vt(t, "left") : 0,
					b = Lt(t.rtl, t.x, t.width),
					y = function(t) {
						n.fillText(t, b.x(e.x + m), e.y + d / 2), e.y += d + f
					},
					_ = b.textAlign(h);
				for (n.textAlign = h, n.textBaseline = "middle", n.font = B.fontString(d, t._bodyFontStyle, t._bodyFontFamily), e.x = Vt(t, _), n.fillStyle = t.bodyFontColor, B.each(t.beforeBody, y), m = g && "right" !== _ ? "center" === h ? d / 2 + 1 : d + 2 : 0, s = 0, u = p.length; s < u; ++s) {
					for (i = p[s], r = t.labelTextColors[s], o = t.labelColors[s], n.fillStyle = r, B.each(i.before, y), l = 0, c = (a = i.lines).length; l < c; ++l) {
						if (g) {
							var x = b.x(v);
							n.fillStyle = t.legendColorBackground, n.fillRect(b.leftForLtr(x, d), e.y, d, d), n.lineWidth = 1, n.strokeStyle = o.borderColor, n.strokeRect(b.leftForLtr(x, d), e.y, d, d), n.fillStyle = o.backgroundColor, n.fillRect(b.leftForLtr(b.xPlus(x, 1), d - 2), e.y + 1, d - 2, d - 2), n.fillStyle = r
						}
						y(a[l])
					}
					B.each(i.after, y)
				}
				m = 0, B.each(t.afterBody, y), e.y -= f
			},
			drawFooter: function(e, t, n) {
				var i, r, o = t.footer,
					a = o.length;
				if (a) {
					var s = Lt(t.rtl, t.x, t.width);
					for (e.x = Vt(t, t._footerAlign), e.y += t.footerMarginTop, n.textAlign = s.textAlign(t._footerAlign), n.textBaseline = "middle", i = t.footerFontSize, n.fillStyle = t.footerFontColor, n.font = B.fontString(i, t._footerFontStyle, t._footerFontFamily), r = 0; r < a; ++r) n.fillText(o[r], s.x(e.x), e.y + i / 2), e.y += i + t.footerSpacing
				}
			},
			drawBackground: function(e, t, n, i) {
				n.fillStyle = t.backgroundColor, n.strokeStyle = t.borderColor, n.lineWidth = t.borderWidth;
				var r = t.xAlign,
					o = t.yAlign,
					a = e.x,
					s = e.y,
					l = i.width,
					u = i.height,
					c = t.cornerRadius;
				n.beginPath(), n.moveTo(a + c, s), "top" === o && this.drawCaret(e, i), n.lineTo(a + l - c, s), n.quadraticCurveTo(a + l, s, a + l, s + c), "center" === o && "right" === r && this.drawCaret(e, i), n.lineTo(a + l, s + u - c), n.quadraticCurveTo(a + l, s + u, a + l - c, s + u), "bottom" === o && this.drawCaret(e, i), n.lineTo(a + c, s + u), n.quadraticCurveTo(a, s + u, a, s + u - c), "center" === o && "left" === r && this.drawCaret(e, i), n.lineTo(a, s + c), n.quadraticCurveTo(a, s, a + c, s), n.closePath(), n.fill(), t.borderWidth > 0 && n.stroke()
			},
			draw: function() {
				var e = this._chart.ctx,
					t = this._view;
				if (0 !== t.opacity) {
					var n = {
							width: t.width,
							height: t.height
						},
						i = {
							x: t.x,
							y: t.y
						},
						r = Math.abs(t.opacity < .001) ? 0 : t.opacity,
						o = t.title.length || t.beforeBody.length || t.body.length || t.afterBody.length || t.footer.length;
					this._options.enabled && o && (e.save(), e.globalAlpha = r, this.drawBackground(i, t, e, n), i.y += t.yPadding, B.rtl.overrideTextDirection(e, t.textDirection), this.drawTitle(i, t, e), this.drawBody(i, t, e), this.drawFooter(i, t, e), B.rtl.restoreTextDirection(e, t.textDirection), e.restore())
				}
			},
			handleEvent: function(e) {
				var t, n = this,
					i = n._options;
				return n._lastActive = n._lastActive || [], "mouseout" === e.type ? n._active = [] : (n._active = n._chart.getElementsAtEventForMode(e, i.mode, i), i.reverse && n._active.reverse()), (t = !B.arrayEquals(n._active, n._lastActive)) && (n._lastActive = n._active, (i.enabled || i.custom) && (n._eventPosition = {
					x: e.x,
					y: e.y
				}, n.update(!0), n.pivot())), t
			}
		}),
		qt = Ft,
		Yt = Bt;
	Yt.positioners = qt;
	var Ut = B.valueOrDefault;

	function $t() {
		return B.merge(Object.create(null), [].slice.call(arguments), {
			merger: function(e, t, n, i) {
				if ("xAxes" === e || "yAxes" === e) {
					var r, o, a, s = n[e].length;
					for (t[e] || (t[e] = []), r = 0; r < s; ++r) a = n[e][r], o = Ut(a.type, "xAxes" === e ? "category" : "linear"), r >= t[e].length && t[e].push({}), !t[e][r].type || a.type && a.type !== t[e][r].type ? B.merge(t[e][r], [Rt.getScaleDefaults(o), a]) : B.merge(t[e][r], a)
				} else B._merger(e, t, n, i)
			}
		})
	}

	function Gt() {
		return B.merge(Object.create(null), [].slice.call(arguments), {
			merger: function(e, t, n, i) {
				var r = t[e] || Object.create(null),
					o = n[e];
				"scales" === e ? t[e] = $t(r, o) : "scale" === e ? t[e] = B.merge(r, [Rt.getScaleDefaults(o.type), o]) : B._merger(e, t, n, i)
			}
		})
	}

	function Qt(e, t, n) {
		var i, r = function(e) {
			return e.id === i
		};
		do {
			i = t + n++
		} while (B.findIndex(e, r) >= 0);
		return i
	}

	function Xt(e) {
		return "top" === e || "bottom" === e
	}

	function Jt(e, t) {
		return function(n, i) {
			return n[e] === i[e] ? n[t] - i[t] : n[e] - i[e]
		}
	}
	j._set("global", {
		elements: {},
		events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
		hover: {
			onHover: null,
			mode: "nearest",
			intersect: !0,
			animationDuration: 400
		},
		onClick: null,
		maintainAspectRatio: !0,
		responsive: !0,
		responsiveAnimationDuration: 0
	});
	var Zt = function(e, t) {
		return this.construct(e, t), this
	};
	B.extend(Zt.prototype, {
		construct: function(e, t) {
			var n = this;
			t = function(e) {
				var t = (e = e || Object.create(null)).data = e.data || {};
				return t.datasets = t.datasets || [], t.labels = t.labels || [], e.options = Gt(j.global, j[e.type], e.options || {}), e
			}(t);
			var i = Ot.acquireContext(e, t),
				r = i && i.canvas,
				o = r && r.height,
				a = r && r.width;
			n.id = B.uid(), n.ctx = i, n.canvas = r, n.config = t, n.width = a, n.height = o, n.aspectRatio = o ? a / o : null, n.options = t.options, n._bufferedRender = !1, n._layers = [], n.chart = n, n.controller = n, Zt.instances[n.id] = n, Object.defineProperty(n, "data", {
				get: function() {
					return n.config.data
				},
				set: function(e) {
					n.config.data = e
				}
			}), i && r ? (n.initialize(), n.update()) : console.error("Failed to create chart: can't acquire context from the given item")
		},
		initialize: function() {
			var e = this;
			return Nt.notify(e, "beforeInit"), B.retinaScale(e, e.options.devicePixelRatio), e.bindEvents(), e.options.responsive && e.resize(!0), e.initToolTip(), Nt.notify(e, "afterInit"), e
		},
		clear: function() {
			return B.canvas.clear(this), this
		},
		stop: function() {
			return K.cancelAnimation(this), this
		},
		resize: function(e) {
			var t = this,
				n = t.options,
				i = t.canvas,
				r = n.maintainAspectRatio && t.aspectRatio || null,
				o = Math.max(0, Math.floor(B.getMaximumWidth(i))),
				a = Math.max(0, Math.floor(r ? o / r : B.getMaximumHeight(i)));
			if ((t.width !== o || t.height !== a) && (i.width = t.width = o, i.height = t.height = a, i.style.width = o + "px", i.style.height = a + "px", B.retinaScale(t, n.devicePixelRatio), !e)) {
				var s = {
					width: o,
					height: a
				};
				Nt.notify(t, "resize", [s]), n.onResize && n.onResize(t, s), t.stop(), t.update({
					duration: n.responsiveAnimationDuration
				})
			}
		},
		ensureScalesHaveIDs: function() {
			var e = this.options,
				t = e.scales || {},
				n = e.scale;
			B.each(t.xAxes, function(e, n) {
				e.id || (e.id = Qt(t.xAxes, "x-axis-", n))
			}), B.each(t.yAxes, function(e, n) {
				e.id || (e.id = Qt(t.yAxes, "y-axis-", n))
			}), n && (n.id = n.id || "scale")
		},
		buildOrUpdateScales: function() {
			var e = this,
				t = e.options,
				n = e.scales || {},
				i = [],
				r = Object.keys(n).reduce(function(e, t) {
					return e[t] = !1, e
				}, {});
			t.scales && (i = i.concat((t.scales.xAxes || []).map(function(e) {
				return {
					options: e,
					dtype: "category",
					dposition: "bottom"
				}
			}), (t.scales.yAxes || []).map(function(e) {
				return {
					options: e,
					dtype: "linear",
					dposition: "left"
				}
			}))), t.scale && i.push({
				options: t.scale,
				dtype: "radialLinear",
				isDefault: !0,
				dposition: "chartArea"
			}), B.each(i, function(t) {
				var i = t.options,
					o = i.id,
					a = Ut(i.type, t.dtype);
				Xt(i.position) !== Xt(t.dposition) && (i.position = t.dposition), r[o] = !0;
				var s = null;
				if (o in n && n[o].type === a)(s = n[o]).options = i, s.ctx = e.ctx, s.chart = e;
				else {
					var l = Rt.getScaleConstructor(a);
					if (!l) return;
					s = new l({
						id: o,
						type: a,
						options: i,
						ctx: e.ctx,
						chart: e
					}), n[s.id] = s
				}
				s.mergeTicksOptions(), t.isDefault && (e.scale = s)
			}), B.each(r, function(e, t) {
				e || delete n[t]
			}), e.scales = n, Rt.addScalesToLayout(this)
		},
		buildOrUpdateControllers: function() {
			var e, t, n = this,
				i = [],
				r = n.data.datasets;
			for (e = 0, t = r.length; e < t; e++) {
				var o = r[e],
					a = n.getDatasetMeta(e),
					s = o.type || n.config.type;
				if (a.type && a.type !== s && (n.destroyDatasetMeta(e), a = n.getDatasetMeta(e)), a.type = s, a.order = o.order || 0, a.index = e, a.controller) a.controller.updateIndex(e), a.controller.linkScales();
				else {
					var l = Je[a.type];
					if (void 0 === l) throw new Error('"' + a.type + '" is not a chart type.');
					a.controller = new l(n, e), i.push(a.controller)
				}
			}
			return i
		},
		resetElements: function() {
			var e = this;
			B.each(e.data.datasets, function(t, n) {
				e.getDatasetMeta(n).controller.reset()
			}, e)
		},
		reset: function() {
			this.resetElements(), this.tooltip.initialize()
		},
		update: function(e) {
			var t, n, i, r, o = this;
			if (e && "object" == typeof e || (e = {
					duration: e,
					lazy: arguments[1]
				}), r = (i = o).options, B.each(i.scales, function(e) {
					pt.removeBox(i, e)
				}), r = Gt(j.global, j[i.config.type], r), i.options = i.config.options = r, i.ensureScalesHaveIDs(), i.buildOrUpdateScales(), i.tooltip._options = r.tooltips, i.tooltip.initialize(), Nt._invalidate(o), !1 !== Nt.notify(o, "beforeUpdate")) {
				o.tooltip._data = o.data;
				var a = o.buildOrUpdateControllers();
				for (t = 0, n = o.data.datasets.length; t < n; t++) o.getDatasetMeta(t).controller.buildOrUpdateElements();
				o.updateLayout(), o.options.animation && o.options.animation.duration && B.each(a, function(e) {
					e.reset()
				}), o.updateDatasets(), o.tooltip.initialize(), o.lastActive = [], Nt.notify(o, "afterUpdate"), o._layers.sort(Jt("z", "_idx")), o._bufferedRender ? o._bufferedRequest = {
					duration: e.duration,
					easing: e.easing,
					lazy: e.lazy
				} : o.render(e)
			}
		},
		updateLayout: function() {
			var e = this;
			!1 !== Nt.notify(e, "beforeLayout") && (pt.update(this, this.width, this.height), e._layers = [], B.each(e.boxes, function(t) {
				t._configure && t._configure(), e._layers.push.apply(e._layers, t._layers())
			}, e), e._layers.forEach(function(e, t) {
				e._idx = t
			}), Nt.notify(e, "afterScaleUpdate"), Nt.notify(e, "afterLayout"))
		},
		updateDatasets: function() {
			if (!1 !== Nt.notify(this, "beforeDatasetsUpdate")) {
				for (var e = 0, t = this.data.datasets.length; e < t; ++e) this.updateDataset(e);
				Nt.notify(this, "afterDatasetsUpdate")
			}
		},
		updateDataset: function(e) {
			var t = this.getDatasetMeta(e),
				n = {
					meta: t,
					index: e
				};
			!1 !== Nt.notify(this, "beforeDatasetUpdate", [n]) && (t.controller._update(), Nt.notify(this, "afterDatasetUpdate", [n]))
		},
		render: function(e) {
			var t = this;
			e && "object" == typeof e || (e = {
				duration: e,
				lazy: arguments[1]
			});
			var n = t.options.animation,
				i = Ut(e.duration, n && n.duration),
				r = e.lazy;
			if (!1 !== Nt.notify(t, "beforeRender")) {
				var o = function(e) {
					Nt.notify(t, "afterRender"), B.callback(n && n.onComplete, [e], t)
				};
				if (n && i) {
					var a = new Z({
						numSteps: i / 16.66,
						easing: e.easing || n.easing,
						render: function(e, t) {
							var n = B.easing.effects[t.easing],
								i = t.currentStep,
								r = i / t.numSteps;
							e.draw(n(r), r, i)
						},
						onAnimationProgress: n.onProgress,
						onAnimationComplete: o
					});
					K.addAnimation(t, a, i, r)
				} else t.draw(), o(new Z({
					numSteps: 0,
					chart: t
				}));
				return t
			}
		},
		draw: function(e) {
			var t, n, i = this;
			if (i.clear(), B.isNullOrUndef(e) && (e = 1), i.transition(e), !(i.width <= 0 || i.height <= 0) && !1 !== Nt.notify(i, "beforeDraw", [e])) {
				for (n = i._layers, t = 0; t < n.length && n[t].z <= 0; ++t) n[t].draw(i.chartArea);
				for (i.drawDatasets(e); t < n.length; ++t) n[t].draw(i.chartArea);
				i._drawTooltip(e), Nt.notify(i, "afterDraw", [e])
			}
		},
		transition: function(e) {
			for (var t = 0, n = (this.data.datasets || []).length; t < n; ++t) this.isDatasetVisible(t) && this.getDatasetMeta(t).controller.transition(e);
			this.tooltip.transition(e)
		},
		_getSortedDatasetMetas: function(e) {
			var t, n, i = [];
			for (t = 0, n = (this.data.datasets || []).length; t < n; ++t) e && !this.isDatasetVisible(t) || i.push(this.getDatasetMeta(t));
			return i.sort(Jt("order", "index")), i
		},
		_getSortedVisibleDatasetMetas: function() {
			return this._getSortedDatasetMetas(!0)
		},
		drawDatasets: function(e) {
			var t, n;
			if (!1 !== Nt.notify(this, "beforeDatasetsDraw", [e])) {
				for (n = (t = this._getSortedVisibleDatasetMetas()).length - 1; n >= 0; --n) this.drawDataset(t[n], e);
				Nt.notify(this, "afterDatasetsDraw", [e])
			}
		},
		drawDataset: function(e, t) {
			var n = {
				meta: e,
				index: e.index,
				easingValue: t
			};
			!1 !== Nt.notify(this, "beforeDatasetDraw", [n]) && (e.controller.draw(t), Nt.notify(this, "afterDatasetDraw", [n]))
		},
		_drawTooltip: function(e) {
			var t = this.tooltip,
				n = {
					tooltip: t,
					easingValue: e
				};
			!1 !== Nt.notify(this, "beforeTooltipDraw", [n]) && (t.draw(), Nt.notify(this, "afterTooltipDraw", [n]))
		},
		getElementAtEvent: function(e) {
			return rt.modes.single(this, e)
		},
		getElementsAtEvent: function(e) {
			return rt.modes.label(this, e, {
				intersect: !0
			})
		},
		getElementsAtXAxis: function(e) {
			return rt.modes["x-axis"](this, e, {
				intersect: !0
			})
		},
		getElementsAtEventForMode: function(e, t, n) {
			var i = rt.modes[t];
			return "function" == typeof i ? i(this, e, n) : []
		},
		getDatasetAtEvent: function(e) {
			return rt.modes.dataset(this, e, {
				intersect: !0
			})
		},
		getDatasetMeta: function(e) {
			var t = this.data.datasets[e];
			t._meta || (t._meta = {});
			var n = t._meta[this.id];
			return n || (n = t._meta[this.id] = {
				type: null,
				data: [],
				dataset: null,
				controller: null,
				hidden: null,
				xAxisID: null,
				yAxisID: null,
				order: t.order || 0,
				index: e
			}), n
		},
		getVisibleDatasetCount: function() {
			for (var e = 0, t = 0, n = this.data.datasets.length; t < n; ++t) this.isDatasetVisible(t) && e++;
			return e
		},
		isDatasetVisible: function(e) {
			var t = this.getDatasetMeta(e);
			return "boolean" == typeof t.hidden ? !t.hidden : !this.data.datasets[e].hidden
		},
		generateLegend: function() {
			return this.options.legendCallback(this)
		},
		destroyDatasetMeta: function(e) {
			var t = this.id,
				n = this.data.datasets[e],
				i = n._meta && n._meta[t];
			i && (i.controller.destroy(), delete n._meta[t])
		},
		destroy: function() {
			var e, t, n = this,
				i = n.canvas;
			for (n.stop(), e = 0, t = n.data.datasets.length; e < t; ++e) n.destroyDatasetMeta(e);
			i && (n.unbindEvents(), B.canvas.clear(n), Ot.releaseContext(n.ctx), n.canvas = null, n.ctx = null), Nt.notify(n, "destroy"), delete Zt.instances[n.id]
		},
		toBase64Image: function() {
			return this.canvas.toDataURL.apply(this.canvas, arguments)
		},
		initToolTip: function() {
			var e = this;
			e.tooltip = new Yt({
				_chart: e,
				_chartInstance: e,
				_data: e.data,
				_options: e.options.tooltips
			}, e)
		},
		bindEvents: function() {
			var e = this,
				t = e._listeners = {},
				n = function() {
					e.eventHandler.apply(e, arguments)
				};
			B.each(e.options.events, function(i) {
				Ot.addEventListener(e, i, n), t[i] = n
			}), e.options.responsive && (n = function() {
				e.resize()
			}, Ot.addEventListener(e, "resize", n), t.resize = n)
		},
		unbindEvents: function() {
			var e = this,
				t = e._listeners;
			t && (delete e._listeners, B.each(t, function(t, n) {
				Ot.removeEventListener(e, n, t)
			}))
		},
		updateHoverStyle: function(e, t, n) {
			var i, r, o, a = n ? "set" : "remove";
			for (r = 0, o = e.length; r < o; ++r)(i = e[r]) && this.getDatasetMeta(i._datasetIndex).controller[a + "HoverStyle"](i);
			"dataset" === t && this.getDatasetMeta(e[0]._datasetIndex).controller["_" + a + "DatasetHoverStyle"]()
		},
		eventHandler: function(e) {
			var t = this,
				n = t.tooltip;
			if (!1 !== Nt.notify(t, "beforeEvent", [e])) {
				t._bufferedRender = !0, t._bufferedRequest = null;
				var i = t.handleEvent(e);
				n && (i = n._start ? n.handleEvent(e) : i | n.handleEvent(e)), Nt.notify(t, "afterEvent", [e]);
				var r = t._bufferedRequest;
				return r ? t.render(r) : i && !t.animating && (t.stop(), t.render({
					duration: t.options.hover.animationDuration,
					lazy: !0
				})), t._bufferedRender = !1, t._bufferedRequest = null, t
			}
		},
		handleEvent: function(e) {
			var t, n = this,
				i = n.options || {},
				r = i.hover;
			return n.lastActive = n.lastActive || [], "mouseout" === e.type ? n.active = [] : n.active = n.getElementsAtEventForMode(e, r.mode, r), B.callback(i.onHover || i.hover.onHover, [e.native, n.active], n), "mouseup" !== e.type && "click" !== e.type || i.onClick && i.onClick.call(n, e.native, n.active), n.lastActive.length && n.updateHoverStyle(n.lastActive, r.mode, !1), n.active.length && r.mode && n.updateHoverStyle(n.active, r.mode, !0), t = !B.arrayEquals(n.active, n.lastActive), n.lastActive = n.active, t
		}
	}), Zt.instances = {};
	var Kt = Zt;
	Zt.Controller = Zt, Zt.types = {}, B.configMerge = Gt, B.scaleMerge = $t;

	function en() {
		throw new Error("This method is not implemented: either no adapter can be found or an incomplete integration was provided.")
	}

	function tn(e) {
		this.options = e || {}
	}
	B.extend(tn.prototype, {
		formats: en,
		parse: en,
		format: en,
		add: en,
		diff: en,
		startOf: en,
		endOf: en,
		_create: function(e) {
			return e
		}
	}), tn.override = function(e) {
		B.extend(tn.prototype, e)
	};
	var nn = {
			_date: tn
		},
		rn = {
			formatters: {
				values: function(e) {
					return B.isArray(e) ? e : "" + e
				},
				linear: function(e, t, n) {
					var i = n.length > 3 ? n[2] - n[1] : n[1] - n[0];
					Math.abs(i) > 1 && e !== Math.floor(e) && (i = e - Math.floor(e));
					var r = B.log10(Math.abs(i)),
						o = "";
					if (0 !== e)
						if (Math.max(Math.abs(n[0]), Math.abs(n[n.length - 1])) < 1e-4) {
							var a = B.log10(Math.abs(e)),
								s = Math.floor(a) - Math.floor(r);
							s = Math.max(Math.min(s, 20), 0), o = e.toExponential(s)
						} else {
							var l = -1 * Math.floor(r);
							l = Math.max(Math.min(l, 20), 0), o = e.toFixed(l)
						}
					else o = "0";
					return o
				},
				logarithmic: function(e, t, n) {
					var i = e / Math.pow(10, Math.floor(B.log10(e)));
					return 0 === e ? "0" : 1 === i || 2 === i || 5 === i || 0 === t || t === n.length - 1 ? e.toExponential() : ""
				}
			}
		},
		on = B.isArray,
		an = B.isNullOrUndef,
		sn = B.valueOrDefault,
		ln = B.valueAtIndexOrDefault;

	function un(e, t, n) {
		var i, r = e.getTicks().length,
			o = Math.min(t, r - 1),
			a = e.getPixelForTick(o),
			s = e._startPixel,
			l = e._endPixel;
		if (!(n && (i = 1 === r ? Math.max(a - s, l - a) : 0 === t ? (e.getPixelForTick(1) - a) / 2 : (a - e.getPixelForTick(o - 1)) / 2, (a += o < t ? i : -i) < s - 1e-6 || a > l + 1e-6))) return a
	}

	function cn(e, t, n, i) {
		var r, o, a, s, l, u, c, d, f, h, p, g, m, v = n.length,
			b = [],
			y = [],
			_ = [],
			x = 0,
			w = 0;
		for (r = 0; r < v; ++r) {
			if (s = n[r].label, l = n[r].major ? t.major : t.minor, e.font = u = l.string, c = i[u] = i[u] || {
					data: {},
					gc: []
				}, d = l.lineHeight, f = h = 0, an(s) || on(s)) {
				if (on(s))
					for (o = 0, a = s.length; o < a; ++o) p = s[o], an(p) || on(p) || (f = B.measureText(e, c.data, c.gc, f, p), h += d)
			} else f = B.measureText(e, c.data, c.gc, f, s), h = d;
			b.push(f), y.push(h), _.push(d / 2), x = Math.max(f, x), w = Math.max(h, w)
		}

		function k(e) {
			return {
				width: b[e] || 0,
				height: y[e] || 0,
				offset: _[e] || 0
			}
		}
		return function(e, t) {
			B.each(e, function(e) {
				var n, i = e.gc,
					r = i.length / 2;
				if (r > t) {
					for (n = 0; n < r; ++n) delete e.data[i[n]];
					i.splice(0, r)
				}
			})
		}(i, v), g = b.indexOf(x), m = y.indexOf(w), {
			first: k(0),
			last: k(v - 1),
			widest: k(g),
			highest: k(m)
		}
	}

	function dn(e) {
		return e.drawTicks ? e.tickMarkLength : 0
	}

	function fn(e) {
		var t, n;
		return e.display ? (t = B.options._parseFont(e), n = B.options.toPadding(e.padding), t.lineHeight + n.height) : 0
	}

	function hn(e, t) {
		return B.extend(B.options._parseFont({
			fontFamily: sn(t.fontFamily, e.fontFamily),
			fontSize: sn(t.fontSize, e.fontSize),
			fontStyle: sn(t.fontStyle, e.fontStyle),
			lineHeight: sn(t.lineHeight, e.lineHeight)
		}), {
			color: B.options.resolve([t.fontColor, e.fontColor, j.global.defaultFontColor])
		})
	}

	function pn(e) {
		var t = hn(e, e.minor);
		return {
			minor: t,
			major: e.major.enabled ? hn(e, e.major) : t
		}
	}

	function gn(e) {
		var t, n, i, r = [];
		for (n = 0, i = e.length; n < i; ++n) void 0 !== (t = e[n])._index && r.push(t);
		return r
	}

	function mn(e, t, n, i) {
		var r, o, a, s, l = sn(n, 0),
			u = Math.min(sn(i, e.length), e.length),
			c = 0;
		for (t = Math.ceil(t), i && (t = (r = i - n) / Math.floor(r / t)), s = l; s < 0;) c++, s = Math.round(l + c * t);
		for (o = Math.max(l, 0); o < u; o++) a = e[o], o === s ? (a._index = o, c++, s = Math.round(l + c * t)) : delete a.label
	}
	j._set("scale", {
		display: !0,
		position: "left",
		offset: !1,
		gridLines: {
			display: !0,
			color: "rgba(0,0,0,0.1)",
			lineWidth: 1,
			drawBorder: !0,
			drawOnChartArea: !0,
			drawTicks: !0,
			tickMarkLength: 10,
			zeroLineWidth: 1,
			zeroLineColor: "rgba(0,0,0,0.25)",
			zeroLineBorderDash: [],
			zeroLineBorderDashOffset: 0,
			offsetGridLines: !1,
			borderDash: [],
			borderDashOffset: 0
		},
		scaleLabel: {
			display: !1,
			labelString: "",
			padding: {
				top: 4,
				bottom: 4
			}
		},
		ticks: {
			beginAtZero: !1,
			minRotation: 0,
			maxRotation: 50,
			mirror: !1,
			padding: 0,
			reverse: !1,
			display: !0,
			autoSkip: !0,
			autoSkipPadding: 0,
			labelOffset: 0,
			callback: rn.formatters.values,
			minor: {},
			major: {}
		}
	});
	var vn = X.extend({
		zeroLineIndex: 0,
		getPadding: function() {
			return {
				left: this.paddingLeft || 0,
				top: this.paddingTop || 0,
				right: this.paddingRight || 0,
				bottom: this.paddingBottom || 0
			}
		},
		getTicks: function() {
			return this._ticks
		},
		_getLabels: function() {
			var e = this.chart.data;
			return this.options.labels || (this.isHorizontal() ? e.xLabels : e.yLabels) || e.labels || []
		},
		mergeTicksOptions: function() {},
		beforeUpdate: function() {
			B.callback(this.options.beforeUpdate, [this])
		},
		update: function(e, t, n) {
			var i, r, o, a, s, l = this,
				u = l.options.ticks,
				c = u.sampleSize;
			if (l.beforeUpdate(), l.maxWidth = e, l.maxHeight = t, l.margins = B.extend({
					left: 0,
					right: 0,
					top: 0,
					bottom: 0
				}, n), l._ticks = null, l.ticks = null, l._labelSizes = null, l._maxLabelLines = 0, l.longestLabelWidth = 0, l.longestTextCache = l.longestTextCache || {}, l._gridLineItems = null, l._labelItems = null, l.beforeSetDimensions(), l.setDimensions(), l.afterSetDimensions(), l.beforeDataLimits(), l.determineDataLimits(), l.afterDataLimits(), l.beforeBuildTicks(), a = l.buildTicks() || [], (!(a = l.afterBuildTicks(a) || a) || !a.length) && l.ticks)
				for (a = [], i = 0, r = l.ticks.length; i < r; ++i) a.push({
					value: l.ticks[i],
					major: !1
				});
			return l._ticks = a, s = c < a.length, o = l._convertTicksToLabels(s ? function(e, t) {
				for (var n = [], i = e.length / t, r = 0, o = e.length; r < o; r += i) n.push(e[Math.floor(r)]);
				return n
			}(a, c) : a), l._configure(), l.beforeCalculateTickRotation(), l.calculateTickRotation(), l.afterCalculateTickRotation(), l.beforeFit(), l.fit(), l.afterFit(), l._ticksToDraw = u.display && (u.autoSkip || "auto" === u.source) ? l._autoSkip(a) : a, s && (o = l._convertTicksToLabels(l._ticksToDraw)), l.ticks = o, l.afterUpdate(), l.minSize
		},
		_configure: function() {
			var e, t, n = this,
				i = n.options.ticks.reverse;
			n.isHorizontal() ? (e = n.left, t = n.right) : (e = n.top, t = n.bottom, i = !i), n._startPixel = e, n._endPixel = t, n._reversePixels = i, n._length = t - e
		},
		afterUpdate: function() {
			B.callback(this.options.afterUpdate, [this])
		},
		beforeSetDimensions: function() {
			B.callback(this.options.beforeSetDimensions, [this])
		},
		setDimensions: function() {
			var e = this;
			e.isHorizontal() ? (e.width = e.maxWidth, e.left = 0, e.right = e.width) : (e.height = e.maxHeight, e.top = 0, e.bottom = e.height), e.paddingLeft = 0, e.paddingTop = 0, e.paddingRight = 0, e.paddingBottom = 0
		},
		afterSetDimensions: function() {
			B.callback(this.options.afterSetDimensions, [this])
		},
		beforeDataLimits: function() {
			B.callback(this.options.beforeDataLimits, [this])
		},
		determineDataLimits: B.noop,
		afterDataLimits: function() {
			B.callback(this.options.afterDataLimits, [this])
		},
		beforeBuildTicks: function() {
			B.callback(this.options.beforeBuildTicks, [this])
		},
		buildTicks: B.noop,
		afterBuildTicks: function(e) {
			var t = this;
			return on(e) && e.length ? B.callback(t.options.afterBuildTicks, [t, e]) : (t.ticks = B.callback(t.options.afterBuildTicks, [t, t.ticks]) || t.ticks, e)
		},
		beforeTickToLabelConversion: function() {
			B.callback(this.options.beforeTickToLabelConversion, [this])
		},
		convertTicksToLabels: function() {
			var e = this.options.ticks;
			this.ticks = this.ticks.map(e.userCallback || e.callback, this)
		},
		afterTickToLabelConversion: function() {
			B.callback(this.options.afterTickToLabelConversion, [this])
		},
		beforeCalculateTickRotation: function() {
			B.callback(this.options.beforeCalculateTickRotation, [this])
		},
		calculateTickRotation: function() {
			var e, t, n, i, r, o, a, s = this,
				l = s.options,
				u = l.ticks,
				c = s.getTicks().length,
				d = u.minRotation || 0,
				f = u.maxRotation,
				h = d;
			!s._isVisible() || !u.display || d >= f || c <= 1 || !s.isHorizontal() ? s.labelRotation = d : (t = (e = s._getLabelSizes()).widest.width, n = e.highest.height - e.highest.offset, i = Math.min(s.maxWidth, s.chart.width - t), t + 6 > (r = l.offset ? s.maxWidth / c : i / (c - 1)) && (r = i / (c - (l.offset ? .5 : 1)), o = s.maxHeight - dn(l.gridLines) - u.padding - fn(l.scaleLabel), a = Math.sqrt(t * t + n * n), h = B.toDegrees(Math.min(Math.asin(Math.min((e.highest.height + 6) / r, 1)), Math.asin(Math.min(o / a, 1)) - Math.asin(n / a))), h = Math.max(d, Math.min(f, h))), s.labelRotation = h)
		},
		afterCalculateTickRotation: function() {
			B.callback(this.options.afterCalculateTickRotation, [this])
		},
		beforeFit: function() {
			B.callback(this.options.beforeFit, [this])
		},
		fit: function() {
			var e = this,
				t = e.minSize = {
					width: 0,
					height: 0
				},
				n = e.chart,
				i = e.options,
				r = i.ticks,
				o = i.scaleLabel,
				a = i.gridLines,
				s = e._isVisible(),
				l = "bottom" === i.position,
				u = e.isHorizontal();
			if (u ? t.width = e.maxWidth : s && (t.width = dn(a) + fn(o)), u ? s && (t.height = dn(a) + fn(o)) : t.height = e.maxHeight, r.display && s) {
				var c = pn(r),
					d = e._getLabelSizes(),
					f = d.first,
					h = d.last,
					p = d.widest,
					g = d.highest,
					m = .4 * c.minor.lineHeight,
					v = r.padding;
				if (u) {
					var b = 0 !== e.labelRotation,
						y = B.toRadians(e.labelRotation),
						_ = Math.cos(y),
						x = Math.sin(y),
						w = x * p.width + _ * (g.height - (b ? g.offset : 0)) + (b ? 0 : m);
					t.height = Math.min(e.maxHeight, t.height + w + v);
					var k, S, C = e.getPixelForTick(0) - e.left,
						T = e.right - e.getPixelForTick(e.getTicks().length - 1);
					b ? (k = l ? _ * f.width + x * f.offset : x * (f.height - f.offset), S = l ? x * (h.height - h.offset) : _ * h.width + x * h.offset) : (k = f.width / 2, S = h.width / 2), e.paddingLeft = Math.max((k - C) * e.width / (e.width - C), 0) + 3, e.paddingRight = Math.max((S - T) * e.width / (e.width - T), 0) + 3
				} else {
					var D = r.mirror ? 0 : p.width + v + m;
					t.width = Math.min(e.maxWidth, t.width + D), e.paddingTop = f.height / 2, e.paddingBottom = h.height / 2
				}
			}
			e.handleMargins(), u ? (e.width = e._length = n.width - e.margins.left - e.margins.right, e.height = t.height) : (e.width = t.width, e.height = e._length = n.height - e.margins.top - e.margins.bottom)
		},
		handleMargins: function() {
			var e = this;
			e.margins && (e.margins.left = Math.max(e.paddingLeft, e.margins.left), e.margins.top = Math.max(e.paddingTop, e.margins.top), e.margins.right = Math.max(e.paddingRight, e.margins.right), e.margins.bottom = Math.max(e.paddingBottom, e.margins.bottom))
		},
		afterFit: function() {
			B.callback(this.options.afterFit, [this])
		},
		isHorizontal: function() {
			var e = this.options.position;
			return "top" === e || "bottom" === e
		},
		isFullWidth: function() {
			return this.options.fullWidth
		},
		getRightValue: function(e) {
			if (an(e)) return NaN;
			if (("number" == typeof e || e instanceof Number) && !isFinite(e)) return NaN;
			if (e)
				if (this.isHorizontal()) {
					if (void 0 !== e.x) return this.getRightValue(e.x)
				} else if (void 0 !== e.y) return this.getRightValue(e.y);
			return e
		},
		_convertTicksToLabels: function(e) {
			var t, n, i, r = this;
			for (r.ticks = e.map(function(e) {
					return e.value
				}), r.beforeTickToLabelConversion(), t = r.convertTicksToLabels(e) || r.ticks, r.afterTickToLabelConversion(), n = 0, i = e.length; n < i; ++n) e[n].label = t[n];
			return t
		},
		_getLabelSizes: function() {
			var e = this,
				t = e._labelSizes;
			return t || (e._labelSizes = t = cn(e.ctx, pn(e.options.ticks), e.getTicks(), e.longestTextCache), e.longestLabelWidth = t.widest.width), t
		},
		_parseValue: function(e) {
			var t, n, i, r;
			return on(e) ? (t = +this.getRightValue(e[0]), n = +this.getRightValue(e[1]), i = Math.min(t, n), r = Math.max(t, n)) : (t = void 0, n = e = +this.getRightValue(e), i = e, r = e), {
				min: i,
				max: r,
				start: t,
				end: n
			}
		},
		_getScaleLabel: function(e) {
			var t = this._parseValue(e);
			return void 0 !== t.start ? "[" + t.start + ", " + t.end + "]" : +this.getRightValue(e)
		},
		getLabelForIndex: B.noop,
		getPixelForValue: B.noop,
		getValueForPixel: B.noop,
		getPixelForTick: function(e) {
			var t = this.options.offset,
				n = this._ticks.length,
				i = 1 / Math.max(n - (t ? 0 : 1), 1);
			return e < 0 || e > n - 1 ? null : this.getPixelForDecimal(e * i + (t ? i / 2 : 0))
		},
		getPixelForDecimal: function(e) {
			return this._reversePixels && (e = 1 - e), this._startPixel + e * this._length
		},
		getDecimalForPixel: function(e) {
			var t = (e - this._startPixel) / this._length;
			return this._reversePixels ? 1 - t : t
		},
		getBasePixel: function() {
			return this.getPixelForValue(this.getBaseValue())
		},
		getBaseValue: function() {
			var e = this.min,
				t = this.max;
			return this.beginAtZero ? 0 : e < 0 && t < 0 ? t : e > 0 && t > 0 ? e : 0
		},
		_autoSkip: function(e) {
			var t, n, i, r, o = this.options.ticks,
				a = this._length,
				s = o.maxTicksLimit || a / this._tickSize() + 1,
				l = o.major.enabled ? function(e) {
					var t, n, i = [];
					for (t = 0, n = e.length; t < n; t++) e[t].major && i.push(t);
					return i
				}(e) : [],
				u = l.length,
				c = l[0],
				d = l[u - 1];
			if (u > s) return function(e, t, n) {
				var i, r, o = 0,
					a = t[0];
				for (n = Math.ceil(n), i = 0; i < e.length; i++) r = e[i], i === a ? (r._index = i, a = t[++o * n]) : delete r.label
			}(e, l, u / s), gn(e);
			if (i = function(e, t, n, i) {
					var r, o, a, s, l = function(e) {
							var t, n, i = e.length;
							if (i < 2) return !1;
							for (n = e[0], t = 1; t < i; ++t)
								if (e[t] - e[t - 1] !== n) return !1;
							return n
						}(e),
						u = (t.length - 1) / i;
					if (!l) return Math.max(u, 1);
					for (a = 0, s = (r = B.math._factorize(l)).length - 1; a < s; a++)
						if ((o = r[a]) > u) return o;
					return Math.max(u, 1)
				}(l, e, 0, s), u > 0) {
				for (t = 0, n = u - 1; t < n; t++) mn(e, i, l[t], l[t + 1]);
				return r = u > 1 ? (d - c) / (u - 1) : null, mn(e, i, B.isNullOrUndef(r) ? 0 : c - r, c), mn(e, i, d, B.isNullOrUndef(r) ? e.length : d + r), gn(e)
			}
			return mn(e, i), gn(e)
		},
		_tickSize: function() {
			var e = this.options.ticks,
				t = B.toRadians(this.labelRotation),
				n = Math.abs(Math.cos(t)),
				i = Math.abs(Math.sin(t)),
				r = this._getLabelSizes(),
				o = e.autoSkipPadding || 0,
				a = r ? r.widest.width + o : 0,
				s = r ? r.highest.height + o : 0;
			return this.isHorizontal() ? s * n > a * i ? a / n : s / i : s * i < a * n ? s / n : a / i
		},
		_isVisible: function() {
			var e, t, n, i = this.chart,
				r = this.options.display;
			if ("auto" !== r) return !!r;
			for (e = 0, t = i.data.datasets.length; e < t; ++e)
				if (i.isDatasetVisible(e) && ((n = i.getDatasetMeta(e)).xAxisID === this.id || n.yAxisID === this.id)) return !0;
			return !1
		},
		_computeGridLineItems: function(e) {
			var t, n, i, r, o, a, s, l, u, c, d, f, h, p, g, m, v, b = this,
				y = b.chart,
				_ = b.options,
				x = _.gridLines,
				w = _.position,
				k = x.offsetGridLines,
				S = b.isHorizontal(),
				C = b._ticksToDraw,
				T = C.length + (k ? 1 : 0),
				D = dn(x),
				M = [],
				E = x.drawBorder ? ln(x.lineWidth, 0, 0) : 0,
				A = E / 2,
				P = B._alignPixel,
				O = function(e) {
					return P(y, e, E)
				};
			for ("top" === w ? (t = O(b.bottom), s = b.bottom - D, u = t - A, d = O(e.top) + A, h = e.bottom) : "bottom" === w ? (t = O(b.top), d = e.top, h = O(e.bottom) - A, s = t + A, u = b.top + D) : "left" === w ? (t = O(b.right), a = b.right - D, l = t - A, c = O(e.left) + A, f = e.right) : (t = O(b.left), c = e.left, f = O(e.right) - A, a = t + A, l = b.left + D), n = 0; n < T; ++n) i = C[n] || {}, an(i.label) && n < C.length || (n === b.zeroLineIndex && _.offset === k ? (p = x.zeroLineWidth, g = x.zeroLineColor, m = x.zeroLineBorderDash || [], v = x.zeroLineBorderDashOffset || 0) : (p = ln(x.lineWidth, n, 1), g = ln(x.color, n, "rgba(0,0,0,0.1)"), m = x.borderDash || [], v = x.borderDashOffset || 0), void 0 !== (r = un(b, i._index || n, k)) && (o = P(y, r, p), S ? a = l = c = f = o : s = u = d = h = o, M.push({
				tx1: a,
				ty1: s,
				tx2: l,
				ty2: u,
				x1: c,
				y1: d,
				x2: f,
				y2: h,
				width: p,
				color: g,
				borderDash: m,
				borderDashOffset: v
			})));
			return M.ticksLength = T, M.borderValue = t, M
		},
		_computeLabelItems: function() {
			var e, t, n, i, r, o, a, s, l, u, c, d, f = this,
				h = f.options,
				p = h.ticks,
				g = h.position,
				m = p.mirror,
				v = f.isHorizontal(),
				b = f._ticksToDraw,
				y = pn(p),
				_ = p.padding,
				x = dn(h.gridLines),
				w = -B.toRadians(f.labelRotation),
				k = [];
			for ("top" === g ? (o = f.bottom - x - _, a = w ? "left" : "center") : "bottom" === g ? (o = f.top + x + _, a = w ? "right" : "center") : "left" === g ? (r = f.right - (m ? 0 : x) - _, a = m ? "left" : "right") : (r = f.left + (m ? 0 : x) + _, a = m ? "right" : "left"), e = 0, t = b.length; e < t; ++e) i = (n = b[e]).label, an(i) || (s = f.getPixelForTick(n._index || e) + p.labelOffset, u = (l = n.major ? y.major : y.minor).lineHeight, c = on(i) ? i.length : 1, v ? (r = s, d = "top" === g ? ((w ? 1 : .5) - c) * u : (w ? 0 : .5) * u) : (o = s, d = (1 - c) * u / 2), k.push({
				x: r,
				y: o,
				rotation: w,
				label: i,
				font: l,
				textOffset: d,
				textAlign: a
			}));
			return k
		},
		_drawGrid: function(e) {
			var t = this,
				n = t.options.gridLines;
			if (n.display) {
				var i, r, o, a, s, l = t.ctx,
					u = t.chart,
					c = B._alignPixel,
					d = n.drawBorder ? ln(n.lineWidth, 0, 0) : 0,
					f = t._gridLineItems || (t._gridLineItems = t._computeGridLineItems(e));
				for (o = 0, a = f.length; o < a; ++o) i = (s = f[o]).width, r = s.color, i && r && (l.save(), l.lineWidth = i, l.strokeStyle = r, l.setLineDash && (l.setLineDash(s.borderDash), l.lineDashOffset = s.borderDashOffset), l.beginPath(), n.drawTicks && (l.moveTo(s.tx1, s.ty1), l.lineTo(s.tx2, s.ty2)), n.drawOnChartArea && (l.moveTo(s.x1, s.y1), l.lineTo(s.x2, s.y2)), l.stroke(), l.restore());
				if (d) {
					var h, p, g, m, v = d,
						b = ln(n.lineWidth, f.ticksLength - 1, 1),
						y = f.borderValue;
					t.isHorizontal() ? (h = c(u, t.left, v) - v / 2, p = c(u, t.right, b) + b / 2, g = m = y) : (g = c(u, t.top, v) - v / 2, m = c(u, t.bottom, b) + b / 2, h = p = y), l.lineWidth = d, l.strokeStyle = ln(n.color, 0), l.beginPath(), l.moveTo(h, g), l.lineTo(p, m), l.stroke()
				}
			}
		},
		_drawLabels: function() {
			var e = this;
			if (e.options.ticks.display) {
				var t, n, i, r, o, a, s, l, u = e.ctx,
					c = e._labelItems || (e._labelItems = e._computeLabelItems());
				for (t = 0, i = c.length; t < i; ++t) {
					if (a = (o = c[t]).font, u.save(), u.translate(o.x, o.y), u.rotate(o.rotation), u.font = a.string, u.fillStyle = a.color, u.textBaseline = "middle", u.textAlign = o.textAlign, s = o.label, l = o.textOffset, on(s))
						for (n = 0, r = s.length; n < r; ++n) u.fillText("" + s[n], 0, l), l += a.lineHeight;
					else u.fillText(s, 0, l);
					u.restore()
				}
			}
		},
		_drawTitle: function() {
			var e = this,
				t = e.ctx,
				n = e.options,
				i = n.scaleLabel;
			if (i.display) {
				var r, o, a = sn(i.fontColor, j.global.defaultFontColor),
					s = B.options._parseFont(i),
					l = B.options.toPadding(i.padding),
					u = s.lineHeight / 2,
					c = n.position,
					d = 0;
				if (e.isHorizontal()) r = e.left + e.width / 2, o = "bottom" === c ? e.bottom - u - l.bottom : e.top + u + l.top;
				else {
					var f = "left" === c;
					r = f ? e.left + u + l.top : e.right - u - l.top, o = e.top + e.height / 2, d = f ? -.5 * Math.PI : .5 * Math.PI
				}
				t.save(), t.translate(r, o), t.rotate(d), t.textAlign = "center", t.textBaseline = "middle", t.fillStyle = a, t.font = s.string, t.fillText(i.labelString, 0, 0), t.restore()
			}
		},
		draw: function(e) {
			this._isVisible() && (this._drawGrid(e), this._drawTitle(), this._drawLabels())
		},
		_layers: function() {
			var e = this,
				t = e.options,
				n = t.ticks && t.ticks.z || 0,
				i = t.gridLines && t.gridLines.z || 0;
			return e._isVisible() && n !== i && e.draw === e._draw ? [{
				z: i,
				draw: function() {
					e._drawGrid.apply(e, arguments), e._drawTitle.apply(e, arguments)
				}
			}, {
				z: n,
				draw: function() {
					e._drawLabels.apply(e, arguments)
				}
			}] : [{
				z: n,
				draw: function() {
					e.draw.apply(e, arguments)
				}
			}]
		},
		_getMatchingVisibleMetas: function(e) {
			var t = this,
				n = t.isHorizontal();
			return t.chart._getSortedVisibleDatasetMetas().filter(function(i) {
				return (!e || i.type === e) && (n ? i.xAxisID === t.id : i.yAxisID === t.id)
			})
		}
	});
	vn.prototype._draw = vn.prototype.draw;
	var bn = vn,
		yn = B.isNullOrUndef,
		_n = bn.extend({
			determineDataLimits: function() {
				var e, t = this,
					n = t._getLabels(),
					i = t.options.ticks,
					r = i.min,
					o = i.max,
					a = 0,
					s = n.length - 1;
				void 0 !== r && (e = n.indexOf(r)) >= 0 && (a = e), void 0 !== o && (e = n.indexOf(o)) >= 0 && (s = e), t.minIndex = a, t.maxIndex = s, t.min = n[a], t.max = n[s]
			},
			buildTicks: function() {
				var e = this._getLabels(),
					t = this.minIndex,
					n = this.maxIndex;
				this.ticks = 0 === t && n === e.length - 1 ? e : e.slice(t, n + 1)
			},
			getLabelForIndex: function(e, t) {
				var n = this.chart;
				return n.getDatasetMeta(t).controller._getValueScaleId() === this.id ? this.getRightValue(n.data.datasets[t].data[e]) : this._getLabels()[e]
			},
			_configure: function() {
				var e = this,
					t = e.options.offset,
					n = e.ticks;
				bn.prototype._configure.call(e), e.isHorizontal() || (e._reversePixels = !e._reversePixels), n && (e._startValue = e.minIndex - (t ? .5 : 0), e._valueRange = Math.max(n.length - (t ? 0 : 1), 1))
			},
			getPixelForValue: function(e, t, n) {
				var i, r, o, a = this;
				return yn(t) || yn(n) || (e = a.chart.data.datasets[n].data[t]), yn(e) || (i = a.isHorizontal() ? e.x : e.y), (void 0 !== i || void 0 !== e && isNaN(t)) && (r = a._getLabels(), e = B.valueOrDefault(i, e), t = -1 !== (o = r.indexOf(e)) ? o : t, isNaN(t) && (t = e)), a.getPixelForDecimal((t - a._startValue) / a._valueRange)
			},
			getPixelForTick: function(e) {
				var t = this.ticks;
				return e < 0 || e > t.length - 1 ? null : this.getPixelForValue(t[e], e + this.minIndex)
			},
			getValueForPixel: function(e) {
				var t = Math.round(this._startValue + this.getDecimalForPixel(e) * this._valueRange);
				return Math.min(Math.max(t, 0), this.ticks.length - 1)
			},
			getBasePixel: function() {
				return this.bottom
			}
		}),
		xn = {
			position: "bottom"
		};
	_n._defaults = xn;
	var wn = B.noop,
		kn = B.isNullOrUndef;
	var Sn = bn.extend({
			getRightValue: function(e) {
				return "string" == typeof e ? +e : bn.prototype.getRightValue.call(this, e)
			},
			handleTickRangeOptions: function() {
				var e = this,
					t = e.options.ticks;
				if (t.beginAtZero) {
					var n = B.sign(e.min),
						i = B.sign(e.max);
					n < 0 && i < 0 ? e.max = 0 : n > 0 && i > 0 && (e.min = 0)
				}
				var r = void 0 !== t.min || void 0 !== t.suggestedMin,
					o = void 0 !== t.max || void 0 !== t.suggestedMax;
				void 0 !== t.min ? e.min = t.min : void 0 !== t.suggestedMin && (null === e.min ? e.min = t.suggestedMin : e.min = Math.min(e.min, t.suggestedMin)), void 0 !== t.max ? e.max = t.max : void 0 !== t.suggestedMax && (null === e.max ? e.max = t.suggestedMax : e.max = Math.max(e.max, t.suggestedMax)), r !== o && e.min >= e.max && (r ? e.max = e.min + 1 : e.min = e.max - 1), e.min === e.max && (e.max++, t.beginAtZero || e.min--)
			},
			getTickLimit: function() {
				var e, t = this.options.ticks,
					n = t.stepSize,
					i = t.maxTicksLimit;
				return n ? e = Math.ceil(this.max / n) - Math.floor(this.min / n) + 1 : (e = this._computeTickLimit(), i = i || 11), i && (e = Math.min(i, e)), e
			},
			_computeTickLimit: function() {
				return Number.POSITIVE_INFINITY
			},
			handleDirectionalChanges: wn,
			buildTicks: function() {
				var e = this,
					t = e.options.ticks,
					n = e.getTickLimit(),
					i = {
						maxTicks: n = Math.max(2, n),
						min: t.min,
						max: t.max,
						precision: t.precision,
						stepSize: B.valueOrDefault(t.fixedStepSize, t.stepSize)
					},
					r = e.ticks = function(e, t) {
						var n, i, r, o, a = [],
							s = e.stepSize,
							l = s || 1,
							u = e.maxTicks - 1,
							c = e.min,
							d = e.max,
							f = e.precision,
							h = t.min,
							p = t.max,
							g = B.niceNum((p - h) / u / l) * l;
						if (g < 1e-14 && kn(c) && kn(d)) return [h, p];
						(o = Math.ceil(p / g) - Math.floor(h / g)) > u && (g = B.niceNum(o * g / u / l) * l), s || kn(f) ? n = Math.pow(10, B._decimalPlaces(g)) : (n = Math.pow(10, f), g = Math.ceil(g * n) / n), i = Math.floor(h / g) * g, r = Math.ceil(p / g) * g, s && (!kn(c) && B.almostWhole(c / g, g / 1e3) && (i = c), !kn(d) && B.almostWhole(d / g, g / 1e3) && (r = d)), o = (r - i) / g, o = B.almostEquals(o, Math.round(o), g / 1e3) ? Math.round(o) : Math.ceil(o), i = Math.round(i * n) / n, r = Math.round(r * n) / n, a.push(kn(c) ? i : c);
						for (var m = 1; m < o; ++m) a.push(Math.round((i + m * g) * n) / n);
						return a.push(kn(d) ? r : d), a
					}(i, e);
				e.handleDirectionalChanges(), e.max = B.max(r), e.min = B.min(r), t.reverse ? (r.reverse(), e.start = e.max, e.end = e.min) : (e.start = e.min, e.end = e.max)
			},
			convertTicksToLabels: function() {
				var e = this;
				e.ticksAsNumbers = e.ticks.slice(), e.zeroLineIndex = e.ticks.indexOf(0), bn.prototype.convertTicksToLabels.call(e)
			},
			_configure: function() {
				var e, t = this,
					n = t.getTicks(),
					i = t.min,
					r = t.max;
				bn.prototype._configure.call(t), t.options.offset && n.length && (i -= e = (r - i) / Math.max(n.length - 1, 1) / 2, r += e), t._startValue = i, t._endValue = r, t._valueRange = r - i
			}
		}),
		Cn = {
			position: "left",
			ticks: {
				callback: rn.formatters.linear
			}
		};

	function Tn(e, t, n, i) {
		var r, o, a = e.options,
			s = function(e, t, n) {
				var i = [n.type, void 0 === t && void 0 === n.stack ? n.index : "", n.stack].join(".");
				return void 0 === e[i] && (e[i] = {
					pos: [],
					neg: []
				}), e[i]
			}(t, a.stacked, n),
			l = s.pos,
			u = s.neg,
			c = i.length;
		for (r = 0; r < c; ++r) o = e._parseValue(i[r]), isNaN(o.min) || isNaN(o.max) || n.data[r].hidden || (l[r] = l[r] || 0, u[r] = u[r] || 0, a.relativePoints ? l[r] = 100 : o.min < 0 || o.max < 0 ? u[r] += o.min : l[r] += o.max)
	}

	function Dn(e, t, n) {
		var i, r, o = n.length;
		for (i = 0; i < o; ++i) r = e._parseValue(n[i]), isNaN(r.min) || isNaN(r.max) || t.data[i].hidden || (e.min = Math.min(e.min, r.min), e.max = Math.max(e.max, r.max))
	}
	var Mn = Sn.extend({
			determineDataLimits: function() {
				var e, t, n, i, r = this,
					o = r.options,
					a = r.chart.data.datasets,
					s = r._getMatchingVisibleMetas(),
					l = o.stacked,
					u = {},
					c = s.length;
				if (r.min = Number.POSITIVE_INFINITY, r.max = Number.NEGATIVE_INFINITY, void 0 === l)
					for (e = 0; !l && e < c; ++e) l = void 0 !== (t = s[e]).stack;
				for (e = 0; e < c; ++e) n = a[(t = s[e]).index].data, l ? Tn(r, u, t, n) : Dn(r, t, n);
				B.each(u, function(e) {
					i = e.pos.concat(e.neg), r.min = Math.min(r.min, B.min(i)), r.max = Math.max(r.max, B.max(i))
				}), r.min = B.isFinite(r.min) && !isNaN(r.min) ? r.min : 0, r.max = B.isFinite(r.max) && !isNaN(r.max) ? r.max : 1, r.handleTickRangeOptions()
			},
			_computeTickLimit: function() {
				var e;
				return this.isHorizontal() ? Math.ceil(this.width / 40) : (e = B.options._parseFont(this.options.ticks), Math.ceil(this.height / e.lineHeight))
			},
			handleDirectionalChanges: function() {
				this.isHorizontal() || this.ticks.reverse()
			},
			getLabelForIndex: function(e, t) {
				return this._getScaleLabel(this.chart.data.datasets[t].data[e])
			},
			getPixelForValue: function(e) {
				return this.getPixelForDecimal((+this.getRightValue(e) - this._startValue) / this._valueRange)
			},
			getValueForPixel: function(e) {
				return this._startValue + this.getDecimalForPixel(e) * this._valueRange
			},
			getPixelForTick: function(e) {
				var t = this.ticksAsNumbers;
				return e < 0 || e > t.length - 1 ? null : this.getPixelForValue(t[e])
			}
		}),
		En = Cn;
	Mn._defaults = En;
	var An = B.valueOrDefault,
		Pn = B.math.log10;
	var On = {
		position: "left",
		ticks: {
			callback: rn.formatters.logarithmic
		}
	};

	function Nn(e, t) {
		return B.isFinite(e) && e >= 0 ? e : t
	}
	var Rn = bn.extend({
			determineDataLimits: function() {
				var e, t, n, i, r, o, a = this,
					s = a.options,
					l = a.chart,
					u = l.data.datasets,
					c = a.isHorizontal();

				function d(e) {
					return c ? e.xAxisID === a.id : e.yAxisID === a.id
				}
				a.min = Number.POSITIVE_INFINITY, a.max = Number.NEGATIVE_INFINITY, a.minNotZero = Number.POSITIVE_INFINITY;
				var f = s.stacked;
				if (void 0 === f)
					for (e = 0; e < u.length; e++)
						if (t = l.getDatasetMeta(e), l.isDatasetVisible(e) && d(t) && void 0 !== t.stack) {
							f = !0;
							break
						} if (s.stacked || f) {
					var h = {};
					for (e = 0; e < u.length; e++) {
						var p = [(t = l.getDatasetMeta(e)).type, void 0 === s.stacked && void 0 === t.stack ? e : "", t.stack].join(".");
						if (l.isDatasetVisible(e) && d(t))
							for (void 0 === h[p] && (h[p] = []), r = 0, o = (i = u[e].data).length; r < o; r++) {
								var g = h[p];
								n = a._parseValue(i[r]), isNaN(n.min) || isNaN(n.max) || t.data[r].hidden || n.min < 0 || n.max < 0 || (g[r] = g[r] || 0, g[r] += n.max)
							}
					}
					B.each(h, function(e) {
						if (e.length > 0) {
							var t = B.min(e),
								n = B.max(e);
							a.min = Math.min(a.min, t), a.max = Math.max(a.max, n)
						}
					})
				} else
					for (e = 0; e < u.length; e++)
						if (t = l.getDatasetMeta(e), l.isDatasetVisible(e) && d(t))
							for (r = 0, o = (i = u[e].data).length; r < o; r++) n = a._parseValue(i[r]), isNaN(n.min) || isNaN(n.max) || t.data[r].hidden || n.min < 0 || n.max < 0 || (a.min = Math.min(n.min, a.min), a.max = Math.max(n.max, a.max), 0 !== n.min && (a.minNotZero = Math.min(n.min, a.minNotZero)));
				a.min = B.isFinite(a.min) ? a.min : null, a.max = B.isFinite(a.max) ? a.max : null, a.minNotZero = B.isFinite(a.minNotZero) ? a.minNotZero : null, this.handleTickRangeOptions()
			},
			handleTickRangeOptions: function() {
				var e = this,
					t = e.options.ticks;
				e.min = Nn(t.min, e.min), e.max = Nn(t.max, e.max), e.min === e.max && (0 !== e.min && null !== e.min ? (e.min = Math.pow(10, Math.floor(Pn(e.min)) - 1), e.max = Math.pow(10, Math.floor(Pn(e.max)) + 1)) : (e.min = 1, e.max = 10)), null === e.min && (e.min = Math.pow(10, Math.floor(Pn(e.max)) - 1)), null === e.max && (e.max = 0 !== e.min ? Math.pow(10, Math.floor(Pn(e.min)) + 1) : 10), null === e.minNotZero && (e.min > 0 ? e.minNotZero = e.min : e.max < 1 ? e.minNotZero = Math.pow(10, Math.floor(Pn(e.max))) : e.minNotZero = 1)
			},
			buildTicks: function() {
				var e = this,
					t = e.options.ticks,
					n = !e.isHorizontal(),
					i = {
						min: Nn(t.min),
						max: Nn(t.max)
					},
					r = e.ticks = function(e, t) {
						var n, i, r = [],
							o = An(e.min, Math.pow(10, Math.floor(Pn(t.min)))),
							a = Math.floor(Pn(t.max)),
							s = Math.ceil(t.max / Math.pow(10, a));
						0 === o ? (n = Math.floor(Pn(t.minNotZero)), i = Math.floor(t.minNotZero / Math.pow(10, n)), r.push(o), o = i * Math.pow(10, n)) : (n = Math.floor(Pn(o)), i = Math.floor(o / Math.pow(10, n)));
						var l = n < 0 ? Math.pow(10, Math.abs(n)) : 1;
						do {
							r.push(o), 10 == ++i && (i = 1, l = ++n >= 0 ? 1 : l), o = Math.round(i * Math.pow(10, n) * l) / l
						} while (n < a || n === a && i < s);
						var u = An(e.max, o);
						return r.push(u), r
					}(i, e);
				e.max = B.max(r), e.min = B.min(r), t.reverse ? (n = !n, e.start = e.max, e.end = e.min) : (e.start = e.min, e.end = e.max), n && r.reverse()
			},
			convertTicksToLabels: function() {
				this.tickValues = this.ticks.slice(), bn.prototype.convertTicksToLabels.call(this)
			},
			getLabelForIndex: function(e, t) {
				return this._getScaleLabel(this.chart.data.datasets[t].data[e])
			},
			getPixelForTick: function(e) {
				var t = this.tickValues;
				return e < 0 || e > t.length - 1 ? null : this.getPixelForValue(t[e])
			},
			_getFirstTickValue: function(e) {
				var t = Math.floor(Pn(e));
				return Math.floor(e / Math.pow(10, t)) * Math.pow(10, t)
			},
			_configure: function() {
				var e = this,
					t = e.min,
					n = 0;
				bn.prototype._configure.call(e), 0 === t && (t = e._getFirstTickValue(e.minNotZero), n = An(e.options.ticks.fontSize, j.global.defaultFontSize) / e._length), e._startValue = Pn(t), e._valueOffset = n, e._valueRange = (Pn(e.max) - Pn(t)) / (1 - n)
			},
			getPixelForValue: function(e) {
				var t = this,
					n = 0;
				return (e = +t.getRightValue(e)) > t.min && e > 0 && (n = (Pn(e) - t._startValue) / t._valueRange + t._valueOffset), t.getPixelForDecimal(n)
			},
			getValueForPixel: function(e) {
				var t = this,
					n = t.getDecimalForPixel(e);
				return 0 === n && 0 === t.min ? 0 : Math.pow(10, t._startValue + (n - t._valueOffset) * t._valueRange)
			}
		}),
		In = On;
	Rn._defaults = In;
	var Ln = B.valueOrDefault,
		Fn = B.valueAtIndexOrDefault,
		jn = B.options.resolve,
		Wn = {
			display: !0,
			animate: !0,
			position: "chartArea",
			angleLines: {
				display: !0,
				color: "rgba(0,0,0,0.1)",
				lineWidth: 1,
				borderDash: [],
				borderDashOffset: 0
			},
			gridLines: {
				circular: !1
			},
			ticks: {
				showLabelBackdrop: !0,
				backdropColor: "rgba(255,255,255,0.75)",
				backdropPaddingY: 2,
				backdropPaddingX: 2,
				callback: rn.formatters.linear
			},
			pointLabels: {
				display: !0,
				fontSize: 10,
				callback: function(e) {
					return e
				}
			}
		};

	function zn(e) {
		var t = e.ticks;
		return t.display && e.display ? Ln(t.fontSize, j.global.defaultFontSize) + 2 * t.backdropPaddingY : 0
	}

	function Vn(e, t, n, i, r) {
		return e === i || e === r ? {
			start: t - n / 2,
			end: t + n / 2
		} : e < i || e > r ? {
			start: t - n,
			end: t
		} : {
			start: t,
			end: t + n
		}
	}

	function Hn(e) {
		return 0 === e || 180 === e ? "center" : e < 180 ? "left" : "right"
	}

	function Bn(e, t, n, i) {
		var r, o, a = n.y + i / 2;
		if (B.isArray(t))
			for (r = 0, o = t.length; r < o; ++r) e.fillText(t[r], n.x, a), a += i;
		else e.fillText(t, n.x, a)
	}

	function qn(e, t, n) {
		90 === e || 270 === e ? n.y -= t.h / 2 : (e > 270 || e < 90) && (n.y -= t.h)
	}

	function Yn(e) {
		return B.isNumber(e) ? e : 0
	}
	var Un = Sn.extend({
			setDimensions: function() {
				var e = this;
				e.width = e.maxWidth, e.height = e.maxHeight, e.paddingTop = zn(e.options) / 2, e.xCenter = Math.floor(e.width / 2), e.yCenter = Math.floor((e.height - e.paddingTop) / 2), e.drawingArea = Math.min(e.height - e.paddingTop, e.width) / 2
			},
			determineDataLimits: function() {
				var e = this,
					t = e.chart,
					n = Number.POSITIVE_INFINITY,
					i = Number.NEGATIVE_INFINITY;
				B.each(t.data.datasets, function(r, o) {
					if (t.isDatasetVisible(o)) {
						var a = t.getDatasetMeta(o);
						B.each(r.data, function(t, r) {
							var o = +e.getRightValue(t);
							isNaN(o) || a.data[r].hidden || (n = Math.min(o, n), i = Math.max(o, i))
						})
					}
				}), e.min = n === Number.POSITIVE_INFINITY ? 0 : n, e.max = i === Number.NEGATIVE_INFINITY ? 0 : i, e.handleTickRangeOptions()
			},
			_computeTickLimit: function() {
				return Math.ceil(this.drawingArea / zn(this.options))
			},
			convertTicksToLabels: function() {
				var e = this;
				Sn.prototype.convertTicksToLabels.call(e), e.pointLabels = e.chart.data.labels.map(function() {
					var t = B.callback(e.options.pointLabels.callback, arguments, e);
					return t || 0 === t ? t : ""
				})
			},
			getLabelForIndex: function(e, t) {
				return +this.getRightValue(this.chart.data.datasets[t].data[e])
			},
			fit: function() {
				var e = this.options;
				e.display && e.pointLabels.display ? function(e) {
					var t, n, i, r = B.options._parseFont(e.options.pointLabels),
						o = {
							l: 0,
							r: e.width,
							t: 0,
							b: e.height - e.paddingTop
						},
						a = {};
					e.ctx.font = r.string, e._pointLabelSizes = [];
					var s, l, u, c = e.chart.data.labels.length;
					for (t = 0; t < c; t++) {
						i = e.getPointPosition(t, e.drawingArea + 5), s = e.ctx, l = r.lineHeight, u = e.pointLabels[t], n = B.isArray(u) ? {
							w: B.longestText(s, s.font, u),
							h: u.length * l
						} : {
							w: s.measureText(u).width,
							h: l
						}, e._pointLabelSizes[t] = n;
						var d = e.getIndexAngle(t),
							f = B.toDegrees(d) % 360,
							h = Vn(f, i.x, n.w, 0, 180),
							p = Vn(f, i.y, n.h, 90, 270);
						h.start < o.l && (o.l = h.start, a.l = d), h.end > o.r && (o.r = h.end, a.r = d), p.start < o.t && (o.t = p.start, a.t = d), p.end > o.b && (o.b = p.end, a.b = d)
					}
					e.setReductions(e.drawingArea, o, a)
				}(this) : this.setCenterPoint(0, 0, 0, 0)
			},
			setReductions: function(e, t, n) {
				var i = this,
					r = t.l / Math.sin(n.l),
					o = Math.max(t.r - i.width, 0) / Math.sin(n.r),
					a = -t.t / Math.cos(n.t),
					s = -Math.max(t.b - (i.height - i.paddingTop), 0) / Math.cos(n.b);
				r = Yn(r), o = Yn(o), a = Yn(a), s = Yn(s), i.drawingArea = Math.min(Math.floor(e - (r + o) / 2), Math.floor(e - (a + s) / 2)), i.setCenterPoint(r, o, a, s)
			},
			setCenterPoint: function(e, t, n, i) {
				var r = this,
					o = r.width - t - r.drawingArea,
					a = e + r.drawingArea,
					s = n + r.drawingArea,
					l = r.height - r.paddingTop - i - r.drawingArea;
				r.xCenter = Math.floor((a + o) / 2 + r.left), r.yCenter = Math.floor((s + l) / 2 + r.top + r.paddingTop)
			},
			getIndexAngle: function(e) {
				var t = this.chart,
					n = (e * (360 / t.data.labels.length) + ((t.options || {}).startAngle || 0)) % 360;
				return (n < 0 ? n + 360 : n) * Math.PI * 2 / 360
			},
			getDistanceFromCenterForValue: function(e) {
				var t = this;
				if (B.isNullOrUndef(e)) return NaN;
				var n = t.drawingArea / (t.max - t.min);
				return t.options.ticks.reverse ? (t.max - e) * n : (e - t.min) * n
			},
			getPointPosition: function(e, t) {
				var n = this.getIndexAngle(e) - Math.PI / 2;
				return {
					x: Math.cos(n) * t + this.xCenter,
					y: Math.sin(n) * t + this.yCenter
				}
			},
			getPointPositionForValue: function(e, t) {
				return this.getPointPosition(e, this.getDistanceFromCenterForValue(t))
			},
			getBasePosition: function(e) {
				var t = this.min,
					n = this.max;
				return this.getPointPositionForValue(e || 0, this.beginAtZero ? 0 : t < 0 && n < 0 ? n : t > 0 && n > 0 ? t : 0)
			},
			_drawGrid: function() {
				var e, t, n, i = this,
					r = i.ctx,
					o = i.options,
					a = o.gridLines,
					s = o.angleLines,
					l = Ln(s.lineWidth, a.lineWidth),
					u = Ln(s.color, a.color);
				if (o.pointLabels.display && function(e) {
						var t = e.ctx,
							n = e.options,
							i = n.pointLabels,
							r = zn(n),
							o = e.getDistanceFromCenterForValue(n.ticks.reverse ? e.min : e.max),
							a = B.options._parseFont(i);
						t.save(), t.font = a.string, t.textBaseline = "middle";
						for (var s = e.chart.data.labels.length - 1; s >= 0; s--) {
							var l = 0 === s ? r / 2 : 0,
								u = e.getPointPosition(s, o + l + 5),
								c = Fn(i.fontColor, s, j.global.defaultFontColor);
							t.fillStyle = c;
							var d = e.getIndexAngle(s),
								f = B.toDegrees(d);
							t.textAlign = Hn(f), qn(f, e._pointLabelSizes[s], u), Bn(t, e.pointLabels[s], u, a.lineHeight)
						}
						t.restore()
					}(i), a.display && B.each(i.ticks, function(e, n) {
						0 !== n && (t = i.getDistanceFromCenterForValue(i.ticksAsNumbers[n]), function(e, t, n, i) {
							var r, o = e.ctx,
								a = t.circular,
								s = e.chart.data.labels.length,
								l = Fn(t.color, i - 1),
								u = Fn(t.lineWidth, i - 1);
							if ((a || s) && l && u) {
								if (o.save(), o.strokeStyle = l, o.lineWidth = u, o.setLineDash && (o.setLineDash(t.borderDash || []), o.lineDashOffset = t.borderDashOffset || 0), o.beginPath(), a) o.arc(e.xCenter, e.yCenter, n, 0, 2 * Math.PI);
								else {
									r = e.getPointPosition(0, n), o.moveTo(r.x, r.y);
									for (var c = 1; c < s; c++) r = e.getPointPosition(c, n), o.lineTo(r.x, r.y)
								}
								o.closePath(), o.stroke(), o.restore()
							}
						}(i, a, t, n))
					}), s.display && l && u) {
					for (r.save(), r.lineWidth = l, r.strokeStyle = u, r.setLineDash && (r.setLineDash(jn([s.borderDash, a.borderDash, []])), r.lineDashOffset = jn([s.borderDashOffset, a.borderDashOffset, 0])), e = i.chart.data.labels.length - 1; e >= 0; e--) t = i.getDistanceFromCenterForValue(o.ticks.reverse ? i.min : i.max), n = i.getPointPosition(e, t), r.beginPath(), r.moveTo(i.xCenter, i.yCenter), r.lineTo(n.x, n.y), r.stroke();
					r.restore()
				}
			},
			_drawLabels: function() {
				var e = this,
					t = e.ctx,
					n = e.options.ticks;
				if (n.display) {
					var i, r, o = e.getIndexAngle(0),
						a = B.options._parseFont(n),
						s = Ln(n.fontColor, j.global.defaultFontColor);
					t.save(), t.font = a.string, t.translate(e.xCenter, e.yCenter), t.rotate(o), t.textAlign = "center", t.textBaseline = "middle", B.each(e.ticks, function(o, l) {
						(0 !== l || n.reverse) && (i = e.getDistanceFromCenterForValue(e.ticksAsNumbers[l]), n.showLabelBackdrop && (r = t.measureText(o).width, t.fillStyle = n.backdropColor, t.fillRect(-r / 2 - n.backdropPaddingX, -i - a.size / 2 - n.backdropPaddingY, r + 2 * n.backdropPaddingX, a.size + 2 * n.backdropPaddingY)), t.fillStyle = s, t.fillText(o, 0, -i))
					}), t.restore()
				}
			},
			_drawTitle: B.noop
		}),
		$n = Wn;
	Un._defaults = $n;
	var Gn = B._deprecated,
		Qn = B.options.resolve,
		Xn = B.valueOrDefault,
		Jn = Number.MIN_SAFE_INTEGER || -9007199254740991,
		Zn = Number.MAX_SAFE_INTEGER || 9007199254740991,
		Kn = {
			millisecond: {
				common: !0,
				size: 1,
				steps: 1e3
			},
			second: {
				common: !0,
				size: 1e3,
				steps: 60
			},
			minute: {
				common: !0,
				size: 6e4,
				steps: 60
			},
			hour: {
				common: !0,
				size: 36e5,
				steps: 24
			},
			day: {
				common: !0,
				size: 864e5,
				steps: 30
			},
			week: {
				common: !1,
				size: 6048e5,
				steps: 4
			},
			month: {
				common: !0,
				size: 2628e6,
				steps: 12
			},
			quarter: {
				common: !1,
				size: 7884e6,
				steps: 4
			},
			year: {
				common: !0,
				size: 3154e7
			}
		},
		ei = Object.keys(Kn);

	function ti(e, t) {
		return e - t
	}

	function ni(e) {
		return B.valueOrDefault(e.time.min, e.ticks.min)
	}

	function ii(e) {
		return B.valueOrDefault(e.time.max, e.ticks.max)
	}

	function ri(e, t, n, i) {
		var r = function(e, t, n) {
				for (var i, r, o, a = 0, s = e.length - 1; a >= 0 && a <= s;) {
					if (r = e[(i = a + s >> 1) - 1] || null, o = e[i], !r) return {
						lo: null,
						hi: o
					};
					if (o[t] < n) a = i + 1;
					else {
						if (!(r[t] > n)) return {
							lo: r,
							hi: o
						};
						s = i - 1
					}
				}
				return {
					lo: o,
					hi: null
				}
			}(e, t, n),
			o = r.lo ? r.hi ? r.lo : e[e.length - 2] : e[0],
			a = r.lo ? r.hi ? r.hi : e[e.length - 1] : e[1],
			s = a[t] - o[t],
			l = s ? (n - o[t]) / s : 0,
			u = (a[i] - o[i]) * l;
		return o[i] + u
	}

	function oi(e, t) {
		var n = e._adapter,
			i = e.options.time,
			r = i.parser,
			o = r || i.format,
			a = t;
		return "function" == typeof r && (a = r(a)), B.isFinite(a) || (a = "string" == typeof o ? n.parse(a, o) : n.parse(a)), null !== a ? +a : (r || "function" != typeof o || (a = o(t), B.isFinite(a) || (a = n.parse(a))), a)
	}

	function ai(e, t) {
		if (B.isNullOrUndef(t)) return null;
		var n = e.options.time,
			i = oi(e, e.getRightValue(t));
		return null === i ? i : (n.round && (i = +e._adapter.startOf(i, n.round)), i)
	}

	function si(e, t, n, i) {
		var r, o, a, s = ei.length;
		for (r = ei.indexOf(e); r < s - 1; ++r)
			if (a = (o = Kn[ei[r]]).steps ? o.steps : Zn, o.common && Math.ceil((n - t) / (a * o.size)) <= i) return ei[r];
		return ei[s - 1]
	}

	function li(e, t, n) {
		var i, r, o = [],
			a = {},
			s = t.length;
		for (i = 0; i < s; ++i) a[r = t[i]] = i, o.push({
			value: r,
			major: !1
		});
		return 0 !== s && n ? function(e, t, n, i) {
			var r, o, a = e._adapter,
				s = +a.startOf(t[0].value, i),
				l = t[t.length - 1].value;
			for (r = s; r <= l; r = +a.add(r, 1, i))(o = n[r]) >= 0 && (t[o].major = !0);
			return t
		}(e, o, a, n) : o
	}
	var ui = bn.extend({
			initialize: function() {
				this.mergeTicksOptions(), bn.prototype.initialize.call(this)
			},
			update: function() {
				var e = this.options,
					t = e.time || (e.time = {}),
					n = this._adapter = new nn._date(e.adapters.date);
				return Gn("time scale", t.format, "time.format", "time.parser"), Gn("time scale", t.min, "time.min", "ticks.min"), Gn("time scale", t.max, "time.max", "ticks.max"), B.mergeIf(t.displayFormats, n.formats()), bn.prototype.update.apply(this, arguments)
			},
			getRightValue: function(e) {
				return e && void 0 !== e.t && (e = e.t), bn.prototype.getRightValue.call(this, e)
			},
			determineDataLimits: function() {
				var e, t, n, i, r, o, a, s = this,
					l = s.chart,
					u = s._adapter,
					c = s.options,
					d = c.time.unit || "day",
					f = Zn,
					h = Jn,
					p = [],
					g = [],
					m = [],
					v = s._getLabels();
				for (e = 0, n = v.length; e < n; ++e) m.push(ai(s, v[e]));
				for (e = 0, n = (l.data.datasets || []).length; e < n; ++e)
					if (l.isDatasetVisible(e))
						if (r = l.data.datasets[e].data, B.isObject(r[0]))
							for (g[e] = [], t = 0, i = r.length; t < i; ++t) o = ai(s, r[t]), p.push(o), g[e][t] = o;
						else g[e] = m.slice(0), a || (p = p.concat(m), a = !0);
				else g[e] = [];
				m.length && (f = Math.min(f, m[0]), h = Math.max(h, m[m.length - 1])), p.length && (p = n > 1 ? function(e) {
					var t, n, i, r = {},
						o = [];
					for (t = 0, n = e.length; t < n; ++t) r[i = e[t]] || (r[i] = !0, o.push(i));
					return o
				}(p).sort(ti) : p.sort(ti), f = Math.min(f, p[0]), h = Math.max(h, p[p.length - 1])), f = ai(s, ni(c)) || f, h = ai(s, ii(c)) || h, f = f === Zn ? +u.startOf(Date.now(), d) : f, h = h === Jn ? +u.endOf(Date.now(), d) + 1 : h, s.min = Math.min(f, h), s.max = Math.max(f + 1, h), s._table = [], s._timestamps = {
					data: p,
					datasets: g,
					labels: m
				}
			},
			buildTicks: function() {
				var e, t, n, i = this,
					r = i.min,
					o = i.max,
					a = i.options,
					s = a.ticks,
					l = a.time,
					u = i._timestamps,
					c = [],
					d = i.getLabelCapacity(r),
					f = s.source,
					h = a.distribution;
				for (u = "data" === f || "auto" === f && "series" === h ? u.data : "labels" === f ? u.labels : function(e, t, n, i) {
						var r, o = e._adapter,
							a = e.options,
							s = a.time,
							l = s.unit || si(s.minUnit, t, n, i),
							u = Qn([s.stepSize, s.unitStepSize, 1]),
							c = "week" === l && s.isoWeekday,
							d = t,
							f = [];
						if (c && (d = +o.startOf(d, "isoWeek", c)), d = +o.startOf(d, c ? "day" : l), o.diff(n, t, l) > 1e5 * u) throw t + " and " + n + " are too far apart with stepSize of " + u + " " + l;
						for (r = d; r < n; r = +o.add(r, u, l)) f.push(r);
						return r !== n && "ticks" !== a.bounds || f.push(r), f
					}(i, r, o, d), "ticks" === a.bounds && u.length && (r = u[0], o = u[u.length - 1]), r = ai(i, ni(a)) || r, o = ai(i, ii(a)) || o, e = 0, t = u.length; e < t; ++e)(n = u[e]) >= r && n <= o && c.push(n);
				return i.min = r, i.max = o, i._unit = l.unit || (s.autoSkip ? si(l.minUnit, i.min, i.max, d) : function(e, t, n, i, r) {
					var o, a;
					for (o = ei.length - 1; o >= ei.indexOf(n); o--)
						if (a = ei[o], Kn[a].common && e._adapter.diff(r, i, a) >= t - 1) return a;
					return ei[n ? ei.indexOf(n) : 0]
				}(i, c.length, l.minUnit, i.min, i.max)), i._majorUnit = s.major.enabled && "year" !== i._unit ? function(e) {
					for (var t = ei.indexOf(e) + 1, n = ei.length; t < n; ++t)
						if (Kn[ei[t]].common) return ei[t]
				}(i._unit) : void 0, i._table = function(e, t, n, i) {
					if ("linear" === i || !e.length) return [{
						time: t,
						pos: 0
					}, {
						time: n,
						pos: 1
					}];
					var r, o, a, s, l, u = [],
						c = [t];
					for (r = 0, o = e.length; r < o; ++r)(s = e[r]) > t && s < n && c.push(s);
					for (c.push(n), r = 0, o = c.length; r < o; ++r) l = c[r + 1], a = c[r - 1], s = c[r], void 0 !== a && void 0 !== l && Math.round((l + a) / 2) === s || u.push({
						time: s,
						pos: r / (o - 1)
					});
					return u
				}(i._timestamps.data, r, o, h), i._offsets = function(e, t, n, i, r) {
					var o, a, s = 0,
						l = 0;
					return r.offset && t.length && (o = ri(e, "time", t[0], "pos"), s = 1 === t.length ? 1 - o : (ri(e, "time", t[1], "pos") - o) / 2, a = ri(e, "time", t[t.length - 1], "pos"), l = 1 === t.length ? a : (a - ri(e, "time", t[t.length - 2], "pos")) / 2), {
						start: s,
						end: l,
						factor: 1 / (s + 1 + l)
					}
				}(i._table, c, 0, 0, a), s.reverse && c.reverse(), li(i, c, i._majorUnit)
			},
			getLabelForIndex: function(e, t) {
				var n = this,
					i = n._adapter,
					r = n.chart.data,
					o = n.options.time,
					a = r.labels && e < r.labels.length ? r.labels[e] : "",
					s = r.datasets[t].data[e];
				return B.isObject(s) && (a = n.getRightValue(s)), o.tooltipFormat ? i.format(oi(n, a), o.tooltipFormat) : "string" == typeof a ? a : i.format(oi(n, a), o.displayFormats.datetime)
			},
			tickFormatFunction: function(e, t, n, i) {
				var r = this._adapter,
					o = this.options,
					a = o.time.displayFormats,
					s = a[this._unit],
					l = this._majorUnit,
					u = a[l],
					c = n[t],
					d = o.ticks,
					f = l && u && c && c.major,
					h = r.format(e, i || (f ? u : s)),
					p = f ? d.major : d.minor,
					g = Qn([p.callback, p.userCallback, d.callback, d.userCallback]);
				return g ? g(h, t, n) : h
			},
			convertTicksToLabels: function(e) {
				var t, n, i = [];
				for (t = 0, n = e.length; t < n; ++t) i.push(this.tickFormatFunction(e[t].value, t, e));
				return i
			},
			getPixelForOffset: function(e) {
				var t = this._offsets,
					n = ri(this._table, "time", e, "pos");
				return this.getPixelForDecimal((t.start + n) * t.factor)
			},
			getPixelForValue: function(e, t, n) {
				var i = null;
				if (void 0 !== t && void 0 !== n && (i = this._timestamps.datasets[n][t]), null === i && (i = ai(this, e)), null !== i) return this.getPixelForOffset(i)
			},
			getPixelForTick: function(e) {
				var t = this.getTicks();
				return e >= 0 && e < t.length ? this.getPixelForOffset(t[e].value) : null
			},
			getValueForPixel: function(e) {
				var t = this._offsets,
					n = this.getDecimalForPixel(e) / t.factor - t.end,
					i = ri(this._table, "pos", n, "time");
				return this._adapter._create(i)
			},
			_getLabelSize: function(e) {
				var t = this.options.ticks,
					n = this.ctx.measureText(e).width,
					i = B.toRadians(this.isHorizontal() ? t.maxRotation : t.minRotation),
					r = Math.cos(i),
					o = Math.sin(i),
					a = Xn(t.fontSize, j.global.defaultFontSize);
				return {
					w: n * r + a * o,
					h: n * o + a * r
				}
			},
			getLabelWidth: function(e) {
				return this._getLabelSize(e).w
			},
			getLabelCapacity: function(e) {
				var t = this,
					n = t.options.time,
					i = n.displayFormats,
					r = i[n.unit] || i.millisecond,
					o = t.tickFormatFunction(e, 0, li(t, [e], t._majorUnit), r),
					a = t._getLabelSize(o),
					s = Math.floor(t.isHorizontal() ? t.width / a.w : t.height / a.h);
				return t.options.offset && s--, s > 0 ? s : 1
			}
		}),
		ci = {
			position: "bottom",
			distribution: "linear",
			bounds: "data",
			adapters: {},
			time: {
				parser: !1,
				unit: !1,
				round: !1,
				displayFormat: !1,
				isoWeekday: !1,
				minUnit: "millisecond",
				displayFormats: {}
			},
			ticks: {
				autoSkip: !1,
				source: "auto",
				major: {
					enabled: !1
				}
			}
		};
	ui._defaults = ci;
	var di = {
			category: _n,
			linear: Mn,
			logarithmic: Rn,
			radialLinear: Un,
			time: ui
		},
		fi = t(function(t, n) {
			t.exports = function() {
				var n, i;

				function r() {
					return n.apply(null, arguments)
				}

				function o(e) {
					return e instanceof Array || "[object Array]" === Object.prototype.toString.call(e)
				}

				function a(e) {
					return null != e && "[object Object]" === Object.prototype.toString.call(e)
				}

				function s(e) {
					return void 0 === e
				}

				function l(e) {
					return "number" == typeof e || "[object Number]" === Object.prototype.toString.call(e)
				}

				function u(e) {
					return e instanceof Date || "[object Date]" === Object.prototype.toString.call(e)
				}

				function c(e, t) {
					var n, i = [];
					for (n = 0; n < e.length; ++n) i.push(t(e[n], n));
					return i
				}

				function d(e, t) {
					return Object.prototype.hasOwnProperty.call(e, t)
				}

				function f(e, t) {
					for (var n in t) d(t, n) && (e[n] = t[n]);
					return d(t, "toString") && (e.toString = t.toString), d(t, "valueOf") && (e.valueOf = t.valueOf), e
				}

				function h(e, t, n, i) {
					return At(e, t, n, i, !0).utc()
				}

				function p(e) {
					return null == e._pf && (e._pf = {
						empty: !1,
						unusedTokens: [],
						unusedInput: [],
						overflow: -2,
						charsLeftOver: 0,
						nullInput: !1,
						invalidMonth: null,
						invalidFormat: !1,
						userInvalidated: !1,
						iso: !1,
						parsedDateParts: [],
						meridiem: null,
						rfc2822: !1,
						weekdayMismatch: !1
					}), e._pf
				}

				function g(e) {
					if (null == e._isValid) {
						var t = p(e),
							n = i.call(t.parsedDateParts, function(e) {
								return null != e
							}),
							r = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && n);
						if (e._strict && (r = r && 0 === t.charsLeftOver && 0 === t.unusedTokens.length && void 0 === t.bigHour), null != Object.isFrozen && Object.isFrozen(e)) return r;
						e._isValid = r
					}
					return e._isValid
				}

				function m(e) {
					var t = h(NaN);
					return null != e ? f(p(t), e) : p(t).userInvalidated = !0, t
				}
				i = Array.prototype.some ? Array.prototype.some : function(e) {
					for (var t = Object(this), n = t.length >>> 0, i = 0; i < n; i++)
						if (i in t && e.call(this, t[i], i, t)) return !0;
					return !1
				};
				var v = r.momentProperties = [];

				function b(e, t) {
					var n, i, r;
					if (s(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), s(t._i) || (e._i = t._i), s(t._f) || (e._f = t._f), s(t._l) || (e._l = t._l), s(t._strict) || (e._strict = t._strict), s(t._tzm) || (e._tzm = t._tzm), s(t._isUTC) || (e._isUTC = t._isUTC), s(t._offset) || (e._offset = t._offset), s(t._pf) || (e._pf = p(t)), s(t._locale) || (e._locale = t._locale), v.length > 0)
						for (n = 0; n < v.length; n++) i = v[n], s(r = t[i]) || (e[i] = r);
					return e
				}
				var y = !1;

				function _(e) {
					b(this, e), this._d = new Date(null != e._d ? e._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), !1 === y && (y = !0, r.updateOffset(this), y = !1)
				}

				function x(e) {
					return e instanceof _ || null != e && null != e._isAMomentObject
				}

				function w(e) {
					return e < 0 ? Math.ceil(e) || 0 : Math.floor(e)
				}

				function k(e) {
					var t = +e,
						n = 0;
					return 0 !== t && isFinite(t) && (n = w(t)), n
				}

				function S(e, t, n) {
					var i, r = Math.min(e.length, t.length),
						o = Math.abs(e.length - t.length),
						a = 0;
					for (i = 0; i < r; i++)(n && e[i] !== t[i] || !n && k(e[i]) !== k(t[i])) && a++;
					return a + o
				}

				function C(e) {
					!1 === r.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e)
				}

				function T(e, t) {
					var n = !0;
					return f(function() {
						if (null != r.deprecationHandler && r.deprecationHandler(null, e), n) {
							for (var i, o = [], a = 0; a < arguments.length; a++) {
								if (i = "", "object" == typeof arguments[a]) {
									for (var s in i += "\n[" + a + "] ", arguments[0]) i += s + ": " + arguments[0][s] + ", ";
									i = i.slice(0, -2)
								} else i = arguments[a];
								o.push(i)
							}
							C(e + "\nArguments: " + Array.prototype.slice.call(o).join("") + "\n" + (new Error).stack), n = !1
						}
						return t.apply(this, arguments)
					}, t)
				}
				var D, M = {};

				function E(e, t) {
					null != r.deprecationHandler && r.deprecationHandler(e, t), M[e] || (C(t), M[e] = !0)
				}

				function A(e) {
					return e instanceof Function || "[object Function]" === Object.prototype.toString.call(e)
				}

				function P(e, t) {
					var n, i = f({}, e);
					for (n in t) d(t, n) && (a(e[n]) && a(t[n]) ? (i[n] = {}, f(i[n], e[n]), f(i[n], t[n])) : null != t[n] ? i[n] = t[n] : delete i[n]);
					for (n in e) d(e, n) && !d(t, n) && a(e[n]) && (i[n] = f({}, i[n]));
					return i
				}

				function O(e) {
					null != e && this.set(e)
				}
				r.suppressDeprecationWarnings = !1, r.deprecationHandler = null, D = Object.keys ? Object.keys : function(e) {
					var t, n = [];
					for (t in e) d(e, t) && n.push(t);
					return n
				};
				var N = {};

				function R(e, t) {
					var n = e.toLowerCase();
					N[n] = N[n + "s"] = N[t] = e
				}

				function I(e) {
					return "string" == typeof e ? N[e] || N[e.toLowerCase()] : void 0
				}

				function L(e) {
					var t, n, i = {};
					for (n in e) d(e, n) && (t = I(n)) && (i[t] = e[n]);
					return i
				}
				var F = {};

				function j(e, t) {
					F[e] = t
				}

				function W(e, t, n) {
					var i = "" + Math.abs(e),
						r = t - i.length,
						o = e >= 0;
					return (o ? n ? "+" : "" : "-") + Math.pow(10, Math.max(0, r)).toString().substr(1) + i
				}
				var z = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
					V = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
					H = {},
					B = {};

				function q(e, t, n, i) {
					var r = i;
					"string" == typeof i && (r = function() {
						return this[i]()
					}), e && (B[e] = r), t && (B[t[0]] = function() {
						return W(r.apply(this, arguments), t[1], t[2])
					}), n && (B[n] = function() {
						return this.localeData().ordinal(r.apply(this, arguments), e)
					})
				}

				function Y(e, t) {
					return e.isValid() ? (t = U(t, e.localeData()), H[t] = H[t] || function(e) {
						var t, n, i, r = e.match(z);
						for (t = 0, n = r.length; t < n; t++) B[r[t]] ? r[t] = B[r[t]] : r[t] = (i = r[t]).match(/\[[\s\S]/) ? i.replace(/^\[|\]$/g, "") : i.replace(/\\/g, "");
						return function(t) {
							var i, o = "";
							for (i = 0; i < n; i++) o += A(r[i]) ? r[i].call(t, e) : r[i];
							return o
						}
					}(t), H[t](e)) : e.localeData().invalidDate()
				}

				function U(e, t) {
					var n = 5;

					function i(e) {
						return t.longDateFormat(e) || e
					}
					for (V.lastIndex = 0; n >= 0 && V.test(e);) e = e.replace(V, i), V.lastIndex = 0, n -= 1;
					return e
				}
				var $ = /\d/,
					G = /\d\d/,
					Q = /\d{3}/,
					X = /\d{4}/,
					J = /[+-]?\d{6}/,
					Z = /\d\d?/,
					K = /\d\d\d\d?/,
					ee = /\d\d\d\d\d\d?/,
					te = /\d{1,3}/,
					ne = /\d{1,4}/,
					ie = /[+-]?\d{1,6}/,
					re = /\d+/,
					oe = /[+-]?\d+/,
					ae = /Z|[+-]\d\d:?\d\d/gi,
					se = /Z|[+-]\d\d(?::?\d\d)?/gi,
					le = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
					ue = {};

				function ce(e, t, n) {
					ue[e] = A(t) ? t : function(e, i) {
						return e && n ? n : t
					}
				}

				function de(e, t) {
					return d(ue, e) ? ue[e](t._strict, t._locale) : new RegExp(fe(e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(e, t, n, i, r) {
						return t || n || i || r
					})))
				}

				function fe(e) {
					return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
				}
				var he = {};

				function pe(e, t) {
					var n, i = t;
					for ("string" == typeof e && (e = [e]), l(t) && (i = function(e, n) {
							n[t] = k(e)
						}), n = 0; n < e.length; n++) he[e[n]] = i
				}

				function ge(e, t) {
					pe(e, function(e, n, i, r) {
						i._w = i._w || {}, t(e, i._w, i, r)
					})
				}

				function me(e, t, n) {
					null != t && d(he, e) && he[e](t, n._a, n, e)
				}
				var ve = 0,
					be = 1,
					ye = 2,
					_e = 3,
					xe = 4,
					we = 5,
					ke = 6,
					Se = 7,
					Ce = 8;

				function Te(e) {
					return De(e) ? 366 : 365
				}

				function De(e) {
					return e % 4 == 0 && e % 100 != 0 || e % 400 == 0
				}
				q("Y", 0, 0, function() {
					var e = this.year();
					return e <= 9999 ? "" + e : "+" + e
				}), q(0, ["YY", 2], 0, function() {
					return this.year() % 100
				}), q(0, ["YYYY", 4], 0, "year"), q(0, ["YYYYY", 5], 0, "year"), q(0, ["YYYYYY", 6, !0], 0, "year"), R("year", "y"), j("year", 1), ce("Y", oe), ce("YY", Z, G), ce("YYYY", ne, X), ce("YYYYY", ie, J), ce("YYYYYY", ie, J), pe(["YYYYY", "YYYYYY"], ve), pe("YYYY", function(e, t) {
					t[ve] = 2 === e.length ? r.parseTwoDigitYear(e) : k(e)
				}), pe("YY", function(e, t) {
					t[ve] = r.parseTwoDigitYear(e)
				}), pe("Y", function(e, t) {
					t[ve] = parseInt(e, 10)
				}), r.parseTwoDigitYear = function(e) {
					return k(e) + (k(e) > 68 ? 1900 : 2e3)
				};
				var Me, Ee = Ae("FullYear", !0);

				function Ae(e, t) {
					return function(n) {
						return null != n ? (Oe(this, e, n), r.updateOffset(this, t), this) : Pe(this, e)
					}
				}

				function Pe(e, t) {
					return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN
				}

				function Oe(e, t, n) {
					e.isValid() && !isNaN(n) && ("FullYear" === t && De(e.year()) && 1 === e.month() && 29 === e.date() ? e._d["set" + (e._isUTC ? "UTC" : "") + t](n, e.month(), Ne(n, e.month())) : e._d["set" + (e._isUTC ? "UTC" : "") + t](n))
				}

				function Ne(e, t) {
					if (isNaN(e) || isNaN(t)) return NaN;
					var n, i = (t % (n = 12) + n) % n;
					return e += (t - i) / 12, 1 === i ? De(e) ? 29 : 28 : 31 - i % 7 % 2
				}
				Me = Array.prototype.indexOf ? Array.prototype.indexOf : function(e) {
					var t;
					for (t = 0; t < this.length; ++t)
						if (this[t] === e) return t;
					return -1
				}, q("M", ["MM", 2], "Mo", function() {
					return this.month() + 1
				}), q("MMM", 0, 0, function(e) {
					return this.localeData().monthsShort(this, e)
				}), q("MMMM", 0, 0, function(e) {
					return this.localeData().months(this, e)
				}), R("month", "M"), j("month", 8), ce("M", Z), ce("MM", Z, G), ce("MMM", function(e, t) {
					return t.monthsShortRegex(e)
				}), ce("MMMM", function(e, t) {
					return t.monthsRegex(e)
				}), pe(["M", "MM"], function(e, t) {
					t[be] = k(e) - 1
				}), pe(["MMM", "MMMM"], function(e, t, n, i) {
					var r = n._locale.monthsParse(e, i, n._strict);
					null != r ? t[be] = r : p(n).invalidMonth = e
				});
				var Re = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
					Ie = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
					Le = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");

				function Fe(e, t) {
					var n;
					if (!e.isValid()) return e;
					if ("string" == typeof t)
						if (/^\d+$/.test(t)) t = k(t);
						else if (!l(t = e.localeData().monthsParse(t))) return e;
					return n = Math.min(e.date(), Ne(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n), e
				}

				function je(e) {
					return null != e ? (Fe(this, e), r.updateOffset(this, !0), this) : Pe(this, "Month")
				}
				var We = le,
					ze = le;

				function Ve() {
					function e(e, t) {
						return t.length - e.length
					}
					var t, n, i = [],
						r = [],
						o = [];
					for (t = 0; t < 12; t++) n = h([2e3, t]), i.push(this.monthsShort(n, "")), r.push(this.months(n, "")), o.push(this.months(n, "")), o.push(this.monthsShort(n, ""));
					for (i.sort(e), r.sort(e), o.sort(e), t = 0; t < 12; t++) i[t] = fe(i[t]), r[t] = fe(r[t]);
					for (t = 0; t < 24; t++) o[t] = fe(o[t]);
					this._monthsRegex = new RegExp("^(" + o.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + i.join("|") + ")", "i")
				}

				function He(e) {
					var t;
					if (e < 100 && e >= 0) {
						var n = Array.prototype.slice.call(arguments);
						n[0] = e + 400, t = new Date(Date.UTC.apply(null, n)), isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e)
					} else t = new Date(Date.UTC.apply(null, arguments));
					return t
				}

				function Be(e, t, n) {
					var i = 7 + t - n,
						r = (7 + He(e, 0, i).getUTCDay() - t) % 7;
					return -r + i - 1
				}

				function qe(e, t, n, i, r) {
					var o, a, s = (7 + n - i) % 7,
						l = Be(e, i, r),
						u = 1 + 7 * (t - 1) + s + l;
					return u <= 0 ? a = Te(o = e - 1) + u : u > Te(e) ? (o = e + 1, a = u - Te(e)) : (o = e, a = u), {
						year: o,
						dayOfYear: a
					}
				}

				function Ye(e, t, n) {
					var i, r, o = Be(e.year(), t, n),
						a = Math.floor((e.dayOfYear() - o - 1) / 7) + 1;
					return a < 1 ? (r = e.year() - 1, i = a + Ue(r, t, n)) : a > Ue(e.year(), t, n) ? (i = a - Ue(e.year(), t, n), r = e.year() + 1) : (r = e.year(), i = a), {
						week: i,
						year: r
					}
				}

				function Ue(e, t, n) {
					var i = Be(e, t, n),
						r = Be(e + 1, t, n);
					return (Te(e) - i + r) / 7
				}

				function $e(e, t) {
					return e.slice(t, 7).concat(e.slice(0, t))
				}
				q("w", ["ww", 2], "wo", "week"), q("W", ["WW", 2], "Wo", "isoWeek"), R("week", "w"), R("isoWeek", "W"), j("week", 5), j("isoWeek", 5), ce("w", Z), ce("ww", Z, G), ce("W", Z), ce("WW", Z, G), ge(["w", "ww", "W", "WW"], function(e, t, n, i) {
					t[i.substr(0, 1)] = k(e)
				}), q("d", 0, "do", "day"), q("dd", 0, 0, function(e) {
					return this.localeData().weekdaysMin(this, e)
				}), q("ddd", 0, 0, function(e) {
					return this.localeData().weekdaysShort(this, e)
				}), q("dddd", 0, 0, function(e) {
					return this.localeData().weekdays(this, e)
				}), q("e", 0, 0, "weekday"), q("E", 0, 0, "isoWeekday"), R("day", "d"), R("weekday", "e"), R("isoWeekday", "E"), j("day", 11), j("weekday", 11), j("isoWeekday", 11), ce("d", Z), ce("e", Z), ce("E", Z), ce("dd", function(e, t) {
					return t.weekdaysMinRegex(e)
				}), ce("ddd", function(e, t) {
					return t.weekdaysShortRegex(e)
				}), ce("dddd", function(e, t) {
					return t.weekdaysRegex(e)
				}), ge(["dd", "ddd", "dddd"], function(e, t, n, i) {
					var r = n._locale.weekdaysParse(e, i, n._strict);
					null != r ? t.d = r : p(n).invalidWeekday = e
				}), ge(["d", "e", "E"], function(e, t, n, i) {
					t[i] = k(e)
				});
				var Ge = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
					Qe = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
					Xe = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
					Je = le,
					Ze = le,
					Ke = le;

				function et() {
					function e(e, t) {
						return t.length - e.length
					}
					var t, n, i, r, o, a = [],
						s = [],
						l = [],
						u = [];
					for (t = 0; t < 7; t++) n = h([2e3, 1]).day(t), i = this.weekdaysMin(n, ""), r = this.weekdaysShort(n, ""), o = this.weekdays(n, ""), a.push(i), s.push(r), l.push(o), u.push(i), u.push(r), u.push(o);
					for (a.sort(e), s.sort(e), l.sort(e), u.sort(e), t = 0; t < 7; t++) s[t] = fe(s[t]), l[t] = fe(l[t]), u[t] = fe(u[t]);
					this._weekdaysRegex = new RegExp("^(" + u.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + l.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + s.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + a.join("|") + ")", "i")
				}

				function tt() {
					return this.hours() % 12 || 12
				}

				function nt(e, t) {
					q(e, 0, 0, function() {
						return this.localeData().meridiem(this.hours(), this.minutes(), t)
					})
				}

				function it(e, t) {
					return t._meridiemParse
				}
				q("H", ["HH", 2], 0, "hour"), q("h", ["hh", 2], 0, tt), q("k", ["kk", 2], 0, function() {
					return this.hours() || 24
				}), q("hmm", 0, 0, function() {
					return "" + tt.apply(this) + W(this.minutes(), 2)
				}), q("hmmss", 0, 0, function() {
					return "" + tt.apply(this) + W(this.minutes(), 2) + W(this.seconds(), 2)
				}), q("Hmm", 0, 0, function() {
					return "" + this.hours() + W(this.minutes(), 2)
				}), q("Hmmss", 0, 0, function() {
					return "" + this.hours() + W(this.minutes(), 2) + W(this.seconds(), 2)
				}), nt("a", !0), nt("A", !1), R("hour", "h"), j("hour", 13), ce("a", it), ce("A", it), ce("H", Z), ce("h", Z), ce("k", Z), ce("HH", Z, G), ce("hh", Z, G), ce("kk", Z, G), ce("hmm", K), ce("hmmss", ee), ce("Hmm", K), ce("Hmmss", ee), pe(["H", "HH"], _e), pe(["k", "kk"], function(e, t, n) {
					var i = k(e);
					t[_e] = 24 === i ? 0 : i
				}), pe(["a", "A"], function(e, t, n) {
					n._isPm = n._locale.isPM(e), n._meridiem = e
				}), pe(["h", "hh"], function(e, t, n) {
					t[_e] = k(e), p(n).bigHour = !0
				}), pe("hmm", function(e, t, n) {
					var i = e.length - 2;
					t[_e] = k(e.substr(0, i)), t[xe] = k(e.substr(i)), p(n).bigHour = !0
				}), pe("hmmss", function(e, t, n) {
					var i = e.length - 4,
						r = e.length - 2;
					t[_e] = k(e.substr(0, i)), t[xe] = k(e.substr(i, 2)), t[we] = k(e.substr(r)), p(n).bigHour = !0
				}), pe("Hmm", function(e, t, n) {
					var i = e.length - 2;
					t[_e] = k(e.substr(0, i)), t[xe] = k(e.substr(i))
				}), pe("Hmmss", function(e, t, n) {
					var i = e.length - 4,
						r = e.length - 2;
					t[_e] = k(e.substr(0, i)), t[xe] = k(e.substr(i, 2)), t[we] = k(e.substr(r))
				});
				var rt, ot = Ae("Hours", !0),
					at = {
						calendar: {
							sameDay: "[Today at] LT",
							nextDay: "[Tomorrow at] LT",
							nextWeek: "dddd [at] LT",
							lastDay: "[Yesterday at] LT",
							lastWeek: "[Last] dddd [at] LT",
							sameElse: "L"
						},
						longDateFormat: {
							LTS: "h:mm:ss A",
							LT: "h:mm A",
							L: "MM/DD/YYYY",
							LL: "MMMM D, YYYY",
							LLL: "MMMM D, YYYY h:mm A",
							LLLL: "dddd, MMMM D, YYYY h:mm A"
						},
						invalidDate: "Invalid date",
						ordinal: "%d",
						dayOfMonthOrdinalParse: /\d{1,2}/,
						relativeTime: {
							future: "in %s",
							past: "%s ago",
							s: "a few seconds",
							ss: "%d seconds",
							m: "a minute",
							mm: "%d minutes",
							h: "an hour",
							hh: "%d hours",
							d: "a day",
							dd: "%d days",
							M: "a month",
							MM: "%d months",
							y: "a year",
							yy: "%d years"
						},
						months: Ie,
						monthsShort: Le,
						week: {
							dow: 0,
							doy: 6
						},
						weekdays: Ge,
						weekdaysMin: Xe,
						weekdaysShort: Qe,
						meridiemParse: /[ap]\.?m?\.?/i
					},
					st = {},
					lt = {};

				function ut(e) {
					return e ? e.toLowerCase().replace("_", "-") : e
				}

				function ct(n) {
					var i = null;
					if (!st[n] && t && t.exports) try {
						i = rt._abbr;
						var r = e;
						r("./locale/" + n), dt(i)
					} catch (e) {}
					return st[n]
				}

				function dt(e, t) {
					var n;
					return e && ((n = s(t) ? ht(e) : ft(e, t)) ? rt = n : "undefined" != typeof console && console.warn && console.warn("Locale " + e + " not found. Did you forget to load it?")), rt._abbr
				}

				function ft(e, t) {
					if (null !== t) {
						var n, i = at;
						if (t.abbr = e, null != st[e]) E("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), i = st[e]._config;
						else if (null != t.parentLocale)
							if (null != st[t.parentLocale]) i = st[t.parentLocale]._config;
							else {
								if (null == (n = ct(t.parentLocale))) return lt[t.parentLocale] || (lt[t.parentLocale] = []), lt[t.parentLocale].push({
									name: e,
									config: t
								}), null;
								i = n._config
							} return st[e] = new O(P(i, t)), lt[e] && lt[e].forEach(function(e) {
							ft(e.name, e.config)
						}), dt(e), st[e]
					}
					return delete st[e], null
				}

				function ht(e) {
					var t;
					if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e) return rt;
					if (!o(e)) {
						if (t = ct(e)) return t;
						e = [e]
					}
					return function(e) {
						for (var t, n, i, r, o = 0; o < e.length;) {
							for (r = ut(e[o]).split("-"), t = r.length, n = (n = ut(e[o + 1])) ? n.split("-") : null; t > 0;) {
								if (i = ct(r.slice(0, t).join("-"))) return i;
								if (n && n.length >= t && S(r, n, !0) >= t - 1) break;
								t--
							}
							o++
						}
						return rt
					}(e)
				}

				function pt(e) {
					var t, n = e._a;
					return n && -2 === p(e).overflow && (t = n[be] < 0 || n[be] > 11 ? be : n[ye] < 1 || n[ye] > Ne(n[ve], n[be]) ? ye : n[_e] < 0 || n[_e] > 24 || 24 === n[_e] && (0 !== n[xe] || 0 !== n[we] || 0 !== n[ke]) ? _e : n[xe] < 0 || n[xe] > 59 ? xe : n[we] < 0 || n[we] > 59 ? we : n[ke] < 0 || n[ke] > 999 ? ke : -1, p(e)._overflowDayOfYear && (t < ve || t > ye) && (t = ye), p(e)._overflowWeeks && -1 === t && (t = Se), p(e)._overflowWeekday && -1 === t && (t = Ce), p(e).overflow = t), e
				}

				function gt(e, t, n) {
					return null != e ? e : null != t ? t : n
				}

				function mt(e) {
					var t, n, i, o, a, s = [];
					if (!e._d) {
						for (i = function(e) {
								var t = new Date(r.now());
								return e._useUTC ? [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()] : [t.getFullYear(), t.getMonth(), t.getDate()]
							}(e), e._w && null == e._a[ye] && null == e._a[be] && function(e) {
								var t, n, i, r, o, a, s, l;
								if (null != (t = e._w).GG || null != t.W || null != t.E) o = 1, a = 4, n = gt(t.GG, e._a[ve], Ye(Pt(), 1, 4).year), i = gt(t.W, 1), ((r = gt(t.E, 1)) < 1 || r > 7) && (l = !0);
								else {
									o = e._locale._week.dow, a = e._locale._week.doy;
									var u = Ye(Pt(), o, a);
									n = gt(t.gg, e._a[ve], u.year), i = gt(t.w, u.week), null != t.d ? ((r = t.d) < 0 || r > 6) && (l = !0) : null != t.e ? (r = t.e + o, (t.e < 0 || t.e > 6) && (l = !0)) : r = o
								}
								i < 1 || i > Ue(n, o, a) ? p(e)._overflowWeeks = !0 : null != l ? p(e)._overflowWeekday = !0 : (s = qe(n, i, r, o, a), e._a[ve] = s.year, e._dayOfYear = s.dayOfYear)
							}(e), null != e._dayOfYear && (a = gt(e._a[ve], i[ve]), (e._dayOfYear > Te(a) || 0 === e._dayOfYear) && (p(e)._overflowDayOfYear = !0), n = He(a, 0, e._dayOfYear), e._a[be] = n.getUTCMonth(), e._a[ye] = n.getUTCDate()), t = 0; t < 3 && null == e._a[t]; ++t) e._a[t] = s[t] = i[t];
						for (; t < 7; t++) e._a[t] = s[t] = null == e._a[t] ? 2 === t ? 1 : 0 : e._a[t];
						24 === e._a[_e] && 0 === e._a[xe] && 0 === e._a[we] && 0 === e._a[ke] && (e._nextDay = !0, e._a[_e] = 0), e._d = (e._useUTC ? He : function(e, t, n, i, r, o, a) {
							var s;
							return e < 100 && e >= 0 ? (s = new Date(e + 400, t, n, i, r, o, a), isFinite(s.getFullYear()) && s.setFullYear(e)) : s = new Date(e, t, n, i, r, o, a), s
						}).apply(null, s), o = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[_e] = 24), e._w && void 0 !== e._w.d && e._w.d !== o && (p(e).weekdayMismatch = !0)
					}
				}
				var vt = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
					bt = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
					yt = /Z|[+-]\d\d(?::?\d\d)?/,
					_t = [
						["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
						["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
						["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
						["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
						["YYYY-DDD", /\d{4}-\d{3}/],
						["YYYY-MM", /\d{4}-\d\d/, !1],
						["YYYYYYMMDD", /[+-]\d{10}/],
						["YYYYMMDD", /\d{8}/],
						["GGGG[W]WWE", /\d{4}W\d{3}/],
						["GGGG[W]WW", /\d{4}W\d{2}/, !1],
						["YYYYDDD", /\d{7}/]
					],
					xt = [
						["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
						["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
						["HH:mm:ss", /\d\d:\d\d:\d\d/],
						["HH:mm", /\d\d:\d\d/],
						["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
						["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
						["HHmmss", /\d\d\d\d\d\d/],
						["HHmm", /\d\d\d\d/],
						["HH", /\d\d/]
					],
					wt = /^\/?Date\((\-?\d+)/i;

				function kt(e) {
					var t, n, i, r, o, a, s = e._i,
						l = vt.exec(s) || bt.exec(s);
					if (l) {
						for (p(e).iso = !0, t = 0, n = _t.length; t < n; t++)
							if (_t[t][1].exec(l[1])) {
								r = _t[t][0], i = !1 !== _t[t][2];
								break
							} if (null == r) return void(e._isValid = !1);
						if (l[3]) {
							for (t = 0, n = xt.length; t < n; t++)
								if (xt[t][1].exec(l[3])) {
									o = (l[2] || " ") + xt[t][0];
									break
								} if (null == o) return void(e._isValid = !1)
						}
						if (!i && null != o) return void(e._isValid = !1);
						if (l[4]) {
							if (!yt.exec(l[4])) return void(e._isValid = !1);
							a = "Z"
						}
						e._f = r + (o || "") + (a || ""), Mt(e)
					} else e._isValid = !1
				}
				var St = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

				function Ct(e) {
					var t = parseInt(e, 10);
					return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t
				}
				var Tt = {
					UT: 0,
					GMT: 0,
					EDT: -240,
					EST: -300,
					CDT: -300,
					CST: -360,
					MDT: -360,
					MST: -420,
					PDT: -420,
					PST: -480
				};

				function Dt(e) {
					var t, n, i, r, o, a, s, l = St.exec(e._i.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, ""));
					if (l) {
						var u = (t = l[4], n = l[3], i = l[2], r = l[5], o = l[6], a = l[7], s = [Ct(t), Le.indexOf(n), parseInt(i, 10), parseInt(r, 10), parseInt(o, 10)], a && s.push(parseInt(a, 10)), s);
						if (! function(e, t, n) {
								if (e) {
									var i = Qe.indexOf(e),
										r = new Date(t[0], t[1], t[2]).getDay();
									if (i !== r) return p(n).weekdayMismatch = !0, n._isValid = !1, !1
								}
								return !0
							}(l[1], u, e)) return;
						e._a = u, e._tzm = function(e, t, n) {
							if (e) return Tt[e];
							if (t) return 0;
							var i = parseInt(n, 10),
								r = i % 100,
								o = (i - r) / 100;
							return 60 * o + r
						}(l[8], l[9], l[10]), e._d = He.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), p(e).rfc2822 = !0
					} else e._isValid = !1
				}

				function Mt(e) {
					if (e._f !== r.ISO_8601)
						if (e._f !== r.RFC_2822) {
							e._a = [], p(e).empty = !0;
							var t, n, i, o, a, s = "" + e._i,
								l = s.length,
								u = 0;
							for (i = U(e._f, e._locale).match(z) || [], t = 0; t < i.length; t++) o = i[t], (n = (s.match(de(o, e)) || [])[0]) && ((a = s.substr(0, s.indexOf(n))).length > 0 && p(e).unusedInput.push(a), s = s.slice(s.indexOf(n) + n.length), u += n.length), B[o] ? (n ? p(e).empty = !1 : p(e).unusedTokens.push(o), me(o, n, e)) : e._strict && !n && p(e).unusedTokens.push(o);
							p(e).charsLeftOver = l - u, s.length > 0 && p(e).unusedInput.push(s), e._a[_e] <= 12 && !0 === p(e).bigHour && e._a[_e] > 0 && (p(e).bigHour = void 0), p(e).parsedDateParts = e._a.slice(0), p(e).meridiem = e._meridiem, e._a[_e] = (c = e._locale, d = e._a[_e], null == (f = e._meridiem) ? d : null != c.meridiemHour ? c.meridiemHour(d, f) : null != c.isPM ? ((h = c.isPM(f)) && d < 12 && (d += 12), h || 12 !== d || (d = 0), d) : d), mt(e), pt(e)
						} else Dt(e);
					else kt(e);
					var c, d, f, h
				}

				function Et(e) {
					var t = e._i,
						n = e._f;
					return e._locale = e._locale || ht(e._l), null === t || void 0 === n && "" === t ? m({
						nullInput: !0
					}) : ("string" == typeof t && (e._i = t = e._locale.preparse(t)), x(t) ? new _(pt(t)) : (u(t) ? e._d = t : o(n) ? function(e) {
						var t, n, i, r, o;
						if (0 === e._f.length) return p(e).invalidFormat = !0, void(e._d = new Date(NaN));
						for (r = 0; r < e._f.length; r++) o = 0, t = b({}, e), null != e._useUTC && (t._useUTC = e._useUTC), t._f = e._f[r], Mt(t), g(t) && (o += p(t).charsLeftOver, o += 10 * p(t).unusedTokens.length, p(t).score = o, (null == i || o < i) && (i = o, n = t));
						f(e, n || t)
					}(e) : n ? Mt(e) : function(e) {
						var t = e._i;
						s(t) ? e._d = new Date(r.now()) : u(t) ? e._d = new Date(t.valueOf()) : "string" == typeof t ? function(e) {
							var t = wt.exec(e._i);
							null === t ? (kt(e), !1 === e._isValid && (delete e._isValid, Dt(e), !1 === e._isValid && (delete e._isValid, r.createFromInputFallback(e)))) : e._d = new Date(+t[1])
						}(e) : o(t) ? (e._a = c(t.slice(0), function(e) {
							return parseInt(e, 10)
						}), mt(e)) : a(t) ? function(e) {
							if (!e._d) {
								var t = L(e._i);
								e._a = c([t.year, t.month, t.day || t.date, t.hour, t.minute, t.second, t.millisecond], function(e) {
									return e && parseInt(e, 10)
								}), mt(e)
							}
						}(e) : l(t) ? e._d = new Date(t) : r.createFromInputFallback(e)
					}(e), g(e) || (e._d = null), e))
				}

				function At(e, t, n, i, r) {
					var s, l = {};
					return !0 !== n && !1 !== n || (i = n, n = void 0), (a(e) && function(e) {
						if (Object.getOwnPropertyNames) return 0 === Object.getOwnPropertyNames(e).length;
						var t;
						for (t in e)
							if (e.hasOwnProperty(t)) return !1;
						return !0
					}(e) || o(e) && 0 === e.length) && (e = void 0), l._isAMomentObject = !0, l._useUTC = l._isUTC = r, l._l = n, l._i = e, l._f = t, l._strict = i, (s = new _(pt(Et(l))))._nextDay && (s.add(1, "d"), s._nextDay = void 0), s
				}

				function Pt(e, t, n, i) {
					return At(e, t, n, i, !1)
				}
				r.createFromInputFallback = T("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(e) {
					e._d = new Date(e._i + (e._useUTC ? " UTC" : ""))
				}), r.ISO_8601 = function() {}, r.RFC_2822 = function() {};
				var Ot = T("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
						var e = Pt.apply(null, arguments);
						return this.isValid() && e.isValid() ? e < this ? this : e : m()
					}),
					Nt = T("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
						var e = Pt.apply(null, arguments);
						return this.isValid() && e.isValid() ? e > this ? this : e : m()
					});

				function Rt(e, t) {
					var n, i;
					if (1 === t.length && o(t[0]) && (t = t[0]), !t.length) return Pt();
					for (n = t[0], i = 1; i < t.length; ++i) t[i].isValid() && !t[i][e](n) || (n = t[i]);
					return n
				}
				var It = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];

				function Lt(e) {
					var t = L(e),
						n = t.year || 0,
						i = t.quarter || 0,
						r = t.month || 0,
						o = t.week || t.isoWeek || 0,
						a = t.day || 0,
						s = t.hour || 0,
						l = t.minute || 0,
						u = t.second || 0,
						c = t.millisecond || 0;
					this._isValid = function(e) {
						for (var t in e)
							if (-1 === Me.call(It, t) || null != e[t] && isNaN(e[t])) return !1;
						for (var n = !1, i = 0; i < It.length; ++i)
							if (e[It[i]]) {
								if (n) return !1;
								parseFloat(e[It[i]]) !== k(e[It[i]]) && (n = !0)
							} return !0
					}(t), this._milliseconds = +c + 1e3 * u + 6e4 * l + 1e3 * s * 60 * 60, this._days = +a + 7 * o, this._months = +r + 3 * i + 12 * n, this._data = {}, this._locale = ht(), this._bubble()
				}

				function Ft(e) {
					return e instanceof Lt
				}

				function jt(e) {
					return e < 0 ? -1 * Math.round(-1 * e) : Math.round(e)
				}

				function Wt(e, t) {
					q(e, 0, 0, function() {
						var e = this.utcOffset(),
							n = "+";
						return e < 0 && (e = -e, n = "-"), n + W(~~(e / 60), 2) + t + W(~~e % 60, 2)
					})
				}
				Wt("Z", ":"), Wt("ZZ", ""), ce("Z", se), ce("ZZ", se), pe(["Z", "ZZ"], function(e, t, n) {
					n._useUTC = !0, n._tzm = Vt(se, e)
				});
				var zt = /([\+\-]|\d\d)/gi;

				function Vt(e, t) {
					var n = (t || "").match(e);
					if (null === n) return null;
					var i = n[n.length - 1] || [],
						r = (i + "").match(zt) || ["-", 0, 0],
						o = 60 * r[1] + k(r[2]);
					return 0 === o ? 0 : "+" === r[0] ? o : -o
				}

				function Ht(e, t) {
					var n, i;
					return t._isUTC ? (n = t.clone(), i = (x(e) || u(e) ? e.valueOf() : Pt(e).valueOf()) - n.valueOf(), n._d.setTime(n._d.valueOf() + i), r.updateOffset(n, !1), n) : Pt(e).local()
				}

				function Bt(e) {
					return 15 * -Math.round(e._d.getTimezoneOffset() / 15)
				}

				function qt() {
					return !!this.isValid() && this._isUTC && 0 === this._offset
				}
				r.updateOffset = function() {};
				var Yt = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,
					Ut = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

				function $t(e, t) {
					var n, i, r, o, a, s, u = e,
						c = null;
					return Ft(e) ? u = {
						ms: e._milliseconds,
						d: e._days,
						M: e._months
					} : l(e) ? (u = {}, t ? u[t] = e : u.milliseconds = e) : (c = Yt.exec(e)) ? (n = "-" === c[1] ? -1 : 1, u = {
						y: 0,
						d: k(c[ye]) * n,
						h: k(c[_e]) * n,
						m: k(c[xe]) * n,
						s: k(c[we]) * n,
						ms: k(jt(1e3 * c[ke])) * n
					}) : (c = Ut.exec(e)) ? (n = "-" === c[1] ? -1 : 1, u = {
						y: Gt(c[2], n),
						M: Gt(c[3], n),
						w: Gt(c[4], n),
						d: Gt(c[5], n),
						h: Gt(c[6], n),
						m: Gt(c[7], n),
						s: Gt(c[8], n)
					}) : null == u ? u = {} : "object" == typeof u && ("from" in u || "to" in u) && (o = Pt(u.from), a = Pt(u.to), r = o.isValid() && a.isValid() ? (a = Ht(a, o), o.isBefore(a) ? s = Qt(o, a) : ((s = Qt(a, o)).milliseconds = -s.milliseconds, s.months = -s.months), s) : {
						milliseconds: 0,
						months: 0
					}, (u = {}).ms = r.milliseconds, u.M = r.months), i = new Lt(u), Ft(e) && d(e, "_locale") && (i._locale = e._locale), i
				}

				function Gt(e, t) {
					var n = e && parseFloat(e.replace(",", "."));
					return (isNaN(n) ? 0 : n) * t
				}

				function Qt(e, t) {
					var n = {};
					return n.months = t.month() - e.month() + 12 * (t.year() - e.year()), e.clone().add(n.months, "M").isAfter(t) && --n.months, n.milliseconds = +t - +e.clone().add(n.months, "M"), n
				}

				function Xt(e, t) {
					return function(n, i) {
						var r;
						return null === i || isNaN(+i) || (E(t, "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), r = n, n = i, i = r), Jt(this, $t(n = "string" == typeof n ? +n : n, i), e), this
					}
				}

				function Jt(e, t, n, i) {
					var o = t._milliseconds,
						a = jt(t._days),
						s = jt(t._months);
					e.isValid() && (i = null == i || i, s && Fe(e, Pe(e, "Month") + s * n), a && Oe(e, "Date", Pe(e, "Date") + a * n), o && e._d.setTime(e._d.valueOf() + o * n), i && r.updateOffset(e, a || s))
				}
				$t.fn = Lt.prototype, $t.invalid = function() {
					return $t(NaN)
				};
				var Zt = Xt(1, "add"),
					Kt = Xt(-1, "subtract");

				function en(e, t) {
					var n, i, r = 12 * (t.year() - e.year()) + (t.month() - e.month()),
						o = e.clone().add(r, "months");
					return t - o < 0 ? (n = e.clone().add(r - 1, "months"), i = (t - o) / (o - n)) : (n = e.clone().add(r + 1, "months"), i = (t - o) / (n - o)), -(r + i) || 0
				}

				function tn(e) {
					var t;
					return void 0 === e ? this._locale._abbr : (null != (t = ht(e)) && (this._locale = t), this)
				}
				r.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", r.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
				var nn = T("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(e) {
					return void 0 === e ? this.localeData() : this.locale(e)
				});

				function rn() {
					return this._locale
				}
				var on = 1e3,
					an = 60 * on,
					sn = 60 * an,
					ln = 3506328 * sn;

				function un(e, t) {
					return (e % t + t) % t
				}

				function cn(e, t, n) {
					return e < 100 && e >= 0 ? new Date(e + 400, t, n) - ln : new Date(e, t, n).valueOf()
				}

				function dn(e, t, n) {
					return e < 100 && e >= 0 ? Date.UTC(e + 400, t, n) - ln : Date.UTC(e, t, n)
				}

				function fn(e, t) {
					q(0, [e, e.length], 0, t)
				}

				function hn(e, t, n, i, r) {
					var o;
					return null == e ? Ye(this, i, r).year : (o = Ue(e, i, r), t > o && (t = o), function(e, t, n, i, r) {
						var o = qe(e, t, n, i, r),
							a = He(o.year, 0, o.dayOfYear);
						return this.year(a.getUTCFullYear()), this.month(a.getUTCMonth()), this.date(a.getUTCDate()), this
					}.call(this, e, t, n, i, r))
				}
				q(0, ["gg", 2], 0, function() {
					return this.weekYear() % 100
				}), q(0, ["GG", 2], 0, function() {
					return this.isoWeekYear() % 100
				}), fn("gggg", "weekYear"), fn("ggggg", "weekYear"), fn("GGGG", "isoWeekYear"), fn("GGGGG", "isoWeekYear"), R("weekYear", "gg"), R("isoWeekYear", "GG"), j("weekYear", 1), j("isoWeekYear", 1), ce("G", oe), ce("g", oe), ce("GG", Z, G), ce("gg", Z, G), ce("GGGG", ne, X), ce("gggg", ne, X), ce("GGGGG", ie, J), ce("ggggg", ie, J), ge(["gggg", "ggggg", "GGGG", "GGGGG"], function(e, t, n, i) {
					t[i.substr(0, 2)] = k(e)
				}), ge(["gg", "GG"], function(e, t, n, i) {
					t[i] = r.parseTwoDigitYear(e)
				}), q("Q", 0, "Qo", "quarter"), R("quarter", "Q"), j("quarter", 7), ce("Q", $), pe("Q", function(e, t) {
					t[be] = 3 * (k(e) - 1)
				}), q("D", ["DD", 2], "Do", "date"), R("date", "D"), j("date", 9), ce("D", Z), ce("DD", Z, G), ce("Do", function(e, t) {
					return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient
				}), pe(["D", "DD"], ye), pe("Do", function(e, t) {
					t[ye] = k(e.match(Z)[0])
				});
				var pn = Ae("Date", !0);
				q("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), R("dayOfYear", "DDD"), j("dayOfYear", 4), ce("DDD", te), ce("DDDD", Q), pe(["DDD", "DDDD"], function(e, t, n) {
					n._dayOfYear = k(e)
				}), q("m", ["mm", 2], 0, "minute"), R("minute", "m"), j("minute", 14), ce("m", Z), ce("mm", Z, G), pe(["m", "mm"], xe);
				var gn = Ae("Minutes", !1);
				q("s", ["ss", 2], 0, "second"), R("second", "s"), j("second", 15), ce("s", Z), ce("ss", Z, G), pe(["s", "ss"], we);
				var mn, vn = Ae("Seconds", !1);
				for (q("S", 0, 0, function() {
						return ~~(this.millisecond() / 100)
					}), q(0, ["SS", 2], 0, function() {
						return ~~(this.millisecond() / 10)
					}), q(0, ["SSS", 3], 0, "millisecond"), q(0, ["SSSS", 4], 0, function() {
						return 10 * this.millisecond()
					}), q(0, ["SSSSS", 5], 0, function() {
						return 100 * this.millisecond()
					}), q(0, ["SSSSSS", 6], 0, function() {
						return 1e3 * this.millisecond()
					}), q(0, ["SSSSSSS", 7], 0, function() {
						return 1e4 * this.millisecond()
					}), q(0, ["SSSSSSSS", 8], 0, function() {
						return 1e5 * this.millisecond()
					}), q(0, ["SSSSSSSSS", 9], 0, function() {
						return 1e6 * this.millisecond()
					}), R("millisecond", "ms"), j("millisecond", 16), ce("S", te, $), ce("SS", te, G), ce("SSS", te, Q), mn = "SSSS"; mn.length <= 9; mn += "S") ce(mn, re);

				function bn(e, t) {
					t[ke] = k(1e3 * ("0." + e))
				}
				for (mn = "S"; mn.length <= 9; mn += "S") pe(mn, bn);
				var yn = Ae("Milliseconds", !1);
				q("z", 0, 0, "zoneAbbr"), q("zz", 0, 0, "zoneName");
				var _n = _.prototype;

				function xn(e) {
					return e
				}
				_n.add = Zt, _n.calendar = function(e, t) {
					var n = e || Pt(),
						i = Ht(n, this).startOf("day"),
						o = r.calendarFormat(this, i) || "sameElse",
						a = t && (A(t[o]) ? t[o].call(this, n) : t[o]);
					return this.format(a || this.localeData().calendar(o, this, Pt(n)))
				}, _n.clone = function() {
					return new _(this)
				}, _n.diff = function(e, t, n) {
					var i, r, o;
					if (!this.isValid()) return NaN;
					if (!(i = Ht(e, this)).isValid()) return NaN;
					switch (r = 6e4 * (i.utcOffset() - this.utcOffset()), t = I(t)) {
						case "year":
							o = en(this, i) / 12;
							break;
						case "month":
							o = en(this, i);
							break;
						case "quarter":
							o = en(this, i) / 3;
							break;
						case "second":
							o = (this - i) / 1e3;
							break;
						case "minute":
							o = (this - i) / 6e4;
							break;
						case "hour":
							o = (this - i) / 36e5;
							break;
						case "day":
							o = (this - i - r) / 864e5;
							break;
						case "week":
							o = (this - i - r) / 6048e5;
							break;
						default:
							o = this - i
					}
					return n ? o : w(o)
				}, _n.endOf = function(e) {
					var t;
					if (void 0 === (e = I(e)) || "millisecond" === e || !this.isValid()) return this;
					var n = this._isUTC ? dn : cn;
					switch (e) {
						case "year":
							t = n(this.year() + 1, 0, 1) - 1;
							break;
						case "quarter":
							t = n(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
							break;
						case "month":
							t = n(this.year(), this.month() + 1, 1) - 1;
							break;
						case "week":
							t = n(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
							break;
						case "isoWeek":
							t = n(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
							break;
						case "day":
						case "date":
							t = n(this.year(), this.month(), this.date() + 1) - 1;
							break;
						case "hour":
							t = this._d.valueOf(), t += sn - un(t + (this._isUTC ? 0 : this.utcOffset() * an), sn) - 1;
							break;
						case "minute":
							t = this._d.valueOf(), t += an - un(t, an) - 1;
							break;
						case "second":
							t = this._d.valueOf(), t += on - un(t, on) - 1
					}
					return this._d.setTime(t), r.updateOffset(this, !0), this
				}, _n.format = function(e) {
					e || (e = this.isUtc() ? r.defaultFormatUtc : r.defaultFormat);
					var t = Y(this, e);
					return this.localeData().postformat(t)
				}, _n.from = function(e, t) {
					return this.isValid() && (x(e) && e.isValid() || Pt(e).isValid()) ? $t({
						to: this,
						from: e
					}).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
				}, _n.fromNow = function(e) {
					return this.from(Pt(), e)
				}, _n.to = function(e, t) {
					return this.isValid() && (x(e) && e.isValid() || Pt(e).isValid()) ? $t({
						from: this,
						to: e
					}).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
				}, _n.toNow = function(e) {
					return this.to(Pt(), e)
				}, _n.get = function(e) {
					return A(this[e = I(e)]) ? this[e]() : this
				}, _n.invalidAt = function() {
					return p(this).overflow
				}, _n.isAfter = function(e, t) {
					var n = x(e) ? e : Pt(e);
					return !(!this.isValid() || !n.isValid()) && ("millisecond" === (t = I(t) || "millisecond") ? this.valueOf() > n.valueOf() : n.valueOf() < this.clone().startOf(t).valueOf())
				}, _n.isBefore = function(e, t) {
					var n = x(e) ? e : Pt(e);
					return !(!this.isValid() || !n.isValid()) && ("millisecond" === (t = I(t) || "millisecond") ? this.valueOf() < n.valueOf() : this.clone().endOf(t).valueOf() < n.valueOf())
				}, _n.isBetween = function(e, t, n, i) {
					var r = x(e) ? e : Pt(e),
						o = x(t) ? t : Pt(t);
					return !!(this.isValid() && r.isValid() && o.isValid()) && (("(" === (i = i || "()")[0] ? this.isAfter(r, n) : !this.isBefore(r, n)) && (")" === i[1] ? this.isBefore(o, n) : !this.isAfter(o, n)))
				}, _n.isSame = function(e, t) {
					var n, i = x(e) ? e : Pt(e);
					return !(!this.isValid() || !i.isValid()) && ("millisecond" === (t = I(t) || "millisecond") ? this.valueOf() === i.valueOf() : (n = i.valueOf(), this.clone().startOf(t).valueOf() <= n && n <= this.clone().endOf(t).valueOf()))
				}, _n.isSameOrAfter = function(e, t) {
					return this.isSame(e, t) || this.isAfter(e, t)
				}, _n.isSameOrBefore = function(e, t) {
					return this.isSame(e, t) || this.isBefore(e, t)
				}, _n.isValid = function() {
					return g(this)
				}, _n.lang = nn, _n.locale = tn, _n.localeData = rn, _n.max = Nt, _n.min = Ot, _n.parsingFlags = function() {
					return f({}, p(this))
				}, _n.set = function(e, t) {
					if ("object" == typeof e)
						for (var n = function(e) {
								var t = [];
								for (var n in e) t.push({
									unit: n,
									priority: F[n]
								});
								return t.sort(function(e, t) {
									return e.priority - t.priority
								}), t
							}(e = L(e)), i = 0; i < n.length; i++) this[n[i].unit](e[n[i].unit]);
					else if (A(this[e = I(e)])) return this[e](t);
					return this
				}, _n.startOf = function(e) {
					var t;
					if (void 0 === (e = I(e)) || "millisecond" === e || !this.isValid()) return this;
					var n = this._isUTC ? dn : cn;
					switch (e) {
						case "year":
							t = n(this.year(), 0, 1);
							break;
						case "quarter":
							t = n(this.year(), this.month() - this.month() % 3, 1);
							break;
						case "month":
							t = n(this.year(), this.month(), 1);
							break;
						case "week":
							t = n(this.year(), this.month(), this.date() - this.weekday());
							break;
						case "isoWeek":
							t = n(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
							break;
						case "day":
						case "date":
							t = n(this.year(), this.month(), this.date());
							break;
						case "hour":
							t = this._d.valueOf(), t -= un(t + (this._isUTC ? 0 : this.utcOffset() * an), sn);
							break;
						case "minute":
							t = this._d.valueOf(), t -= un(t, an);
							break;
						case "second":
							t = this._d.valueOf(), t -= un(t, on)
					}
					return this._d.setTime(t), r.updateOffset(this, !0), this
				}, _n.subtract = Kt, _n.toArray = function() {
					var e = this;
					return [e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond()]
				}, _n.toObject = function() {
					var e = this;
					return {
						years: e.year(),
						months: e.month(),
						date: e.date(),
						hours: e.hours(),
						minutes: e.minutes(),
						seconds: e.seconds(),
						milliseconds: e.milliseconds()
					}
				}, _n.toDate = function() {
					return new Date(this.valueOf())
				}, _n.toISOString = function(e) {
					if (!this.isValid()) return null;
					var t = !0 !== e,
						n = t ? this.clone().utc() : this;
					return n.year() < 0 || n.year() > 9999 ? Y(n, t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ") : A(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + 60 * this.utcOffset() * 1e3).toISOString().replace("Z", Y(n, "Z")) : Y(n, t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ")
				}, _n.inspect = function() {
					if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
					var e = "moment",
						t = "";
					this.isLocal() || (e = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", t = "Z");
					var n = "[" + e + '("]',
						i = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY",
						r = t + '[")]';
					return this.format(n + i + "-MM-DD[T]HH:mm:ss.SSS" + r)
				}, _n.toJSON = function() {
					return this.isValid() ? this.toISOString() : null
				}, _n.toString = function() {
					return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
				}, _n.unix = function() {
					return Math.floor(this.valueOf() / 1e3)
				}, _n.valueOf = function() {
					return this._d.valueOf() - 6e4 * (this._offset || 0)
				}, _n.creationData = function() {
					return {
						input: this._i,
						format: this._f,
						locale: this._locale,
						isUTC: this._isUTC,
						strict: this._strict
					}
				}, _n.year = Ee, _n.isLeapYear = function() {
					return De(this.year())
				}, _n.weekYear = function(e) {
					return hn.call(this, e, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
				}, _n.isoWeekYear = function(e) {
					return hn.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4)
				}, _n.quarter = _n.quarters = function(e) {
					return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3)
				}, _n.month = je, _n.daysInMonth = function() {
					return Ne(this.year(), this.month())
				}, _n.week = _n.weeks = function(e) {
					var t = this.localeData().week(this);
					return null == e ? t : this.add(7 * (e - t), "d")
				}, _n.isoWeek = _n.isoWeeks = function(e) {
					var t = Ye(this, 1, 4).week;
					return null == e ? t : this.add(7 * (e - t), "d")
				}, _n.weeksInYear = function() {
					var e = this.localeData()._week;
					return Ue(this.year(), e.dow, e.doy)
				}, _n.isoWeeksInYear = function() {
					return Ue(this.year(), 1, 4)
				}, _n.date = pn, _n.day = _n.days = function(e) {
					if (!this.isValid()) return null != e ? this : NaN;
					var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
					return null != e ? (e = function(e, t) {
						return "string" != typeof e ? e : isNaN(e) ? "number" == typeof(e = t.weekdaysParse(e)) ? e : null : parseInt(e, 10)
					}(e, this.localeData()), this.add(e - t, "d")) : t
				}, _n.weekday = function(e) {
					if (!this.isValid()) return null != e ? this : NaN;
					var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
					return null == e ? t : this.add(e - t, "d")
				}, _n.isoWeekday = function(e) {
					if (!this.isValid()) return null != e ? this : NaN;
					if (null != e) {
						var t = function(e, t) {
							return "string" == typeof e ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e
						}(e, this.localeData());
						return this.day(this.day() % 7 ? t : t - 7)
					}
					return this.day() || 7
				}, _n.dayOfYear = function(e) {
					var t = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
					return null == e ? t : this.add(e - t, "d")
				}, _n.hour = _n.hours = ot, _n.minute = _n.minutes = gn, _n.second = _n.seconds = vn, _n.millisecond = _n.milliseconds = yn, _n.utcOffset = function(e, t, n) {
					var i, o = this._offset || 0;
					if (!this.isValid()) return null != e ? this : NaN;
					if (null != e) {
						if ("string" == typeof e) {
							if (null === (e = Vt(se, e))) return this
						} else Math.abs(e) < 16 && !n && (e *= 60);
						return !this._isUTC && t && (i = Bt(this)), this._offset = e, this._isUTC = !0, null != i && this.add(i, "m"), o !== e && (!t || this._changeInProgress ? Jt(this, $t(e - o, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, r.updateOffset(this, !0), this._changeInProgress = null)), this
					}
					return this._isUTC ? o : Bt(this)
				}, _n.utc = function(e) {
					return this.utcOffset(0, e)
				}, _n.local = function(e) {
					return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(Bt(this), "m")), this
				}, _n.parseZone = function() {
					if (null != this._tzm) this.utcOffset(this._tzm, !1, !0);
					else if ("string" == typeof this._i) {
						var e = Vt(ae, this._i);
						null != e ? this.utcOffset(e) : this.utcOffset(0, !0)
					}
					return this
				}, _n.hasAlignedHourOffset = function(e) {
					return !!this.isValid() && (e = e ? Pt(e).utcOffset() : 0, (this.utcOffset() - e) % 60 == 0)
				}, _n.isDST = function() {
					return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
				}, _n.isLocal = function() {
					return !!this.isValid() && !this._isUTC
				}, _n.isUtcOffset = function() {
					return !!this.isValid() && this._isUTC
				}, _n.isUtc = qt, _n.isUTC = qt, _n.zoneAbbr = function() {
					return this._isUTC ? "UTC" : ""
				}, _n.zoneName = function() {
					return this._isUTC ? "Coordinated Universal Time" : ""
				}, _n.dates = T("dates accessor is deprecated. Use date instead.", pn), _n.months = T("months accessor is deprecated. Use month instead", je), _n.years = T("years accessor is deprecated. Use year instead", Ee), _n.zone = T("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", function(e, t) {
					return null != e ? ("string" != typeof e && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset()
				}), _n.isDSTShifted = T("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", function() {
					if (!s(this._isDSTShifted)) return this._isDSTShifted;
					var e = {};
					if (b(e, this), (e = Et(e))._a) {
						var t = e._isUTC ? h(e._a) : Pt(e._a);
						this._isDSTShifted = this.isValid() && S(e._a, t.toArray()) > 0
					} else this._isDSTShifted = !1;
					return this._isDSTShifted
				});
				var wn = O.prototype;

				function kn(e, t, n, i) {
					var r = ht(),
						o = h().set(i, t);
					return r[n](o, e)
				}

				function Sn(e, t, n) {
					if (l(e) && (t = e, e = void 0), e = e || "", null != t) return kn(e, t, n, "month");
					var i, r = [];
					for (i = 0; i < 12; i++) r[i] = kn(e, i, n, "month");
					return r
				}

				function Cn(e, t, n, i) {
					"boolean" == typeof e ? (l(t) && (n = t, t = void 0), t = t || "") : (n = t = e, e = !1, l(t) && (n = t, t = void 0), t = t || "");
					var r, o = ht(),
						a = e ? o._week.dow : 0;
					if (null != n) return kn(t, (n + a) % 7, i, "day");
					var s = [];
					for (r = 0; r < 7; r++) s[r] = kn(t, (r + a) % 7, i, "day");
					return s
				}
				wn.calendar = function(e, t, n) {
					var i = this._calendar[e] || this._calendar.sameElse;
					return A(i) ? i.call(t, n) : i
				}, wn.longDateFormat = function(e) {
					var t = this._longDateFormat[e],
						n = this._longDateFormat[e.toUpperCase()];
					return t || !n ? t : (this._longDateFormat[e] = n.replace(/MMMM|MM|DD|dddd/g, function(e) {
						return e.slice(1)
					}), this._longDateFormat[e])
				}, wn.invalidDate = function() {
					return this._invalidDate
				}, wn.ordinal = function(e) {
					return this._ordinal.replace("%d", e)
				}, wn.preparse = xn, wn.postformat = xn, wn.relativeTime = function(e, t, n, i) {
					var r = this._relativeTime[n];
					return A(r) ? r(e, t, n, i) : r.replace(/%d/i, e)
				}, wn.pastFuture = function(e, t) {
					var n = this._relativeTime[e > 0 ? "future" : "past"];
					return A(n) ? n(t) : n.replace(/%s/i, t)
				}, wn.set = function(e) {
					var t, n;
					for (n in e) A(t = e[n]) ? this[n] = t : this["_" + n] = t;
					this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source)
				}, wn.months = function(e, t) {
					return e ? o(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || Re).test(t) ? "format" : "standalone"][e.month()] : o(this._months) ? this._months : this._months.standalone
				}, wn.monthsShort = function(e, t) {
					return e ? o(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[Re.test(t) ? "format" : "standalone"][e.month()] : o(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone
				}, wn.monthsParse = function(e, t, n) {
					var i, r, o;
					if (this._monthsParseExact) return function(e, t, n) {
						var i, r, o, a = e.toLocaleLowerCase();
						if (!this._monthsParse)
							for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], i = 0; i < 12; ++i) o = h([2e3, i]), this._shortMonthsParse[i] = this.monthsShort(o, "").toLocaleLowerCase(), this._longMonthsParse[i] = this.months(o, "").toLocaleLowerCase();
						return n ? "MMM" === t ? -1 !== (r = Me.call(this._shortMonthsParse, a)) ? r : null : -1 !== (r = Me.call(this._longMonthsParse, a)) ? r : null : "MMM" === t ? -1 !== (r = Me.call(this._shortMonthsParse, a)) ? r : -1 !== (r = Me.call(this._longMonthsParse, a)) ? r : null : -1 !== (r = Me.call(this._longMonthsParse, a)) ? r : -1 !== (r = Me.call(this._shortMonthsParse, a)) ? r : null
					}.call(this, e, t, n);
					for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), i = 0; i < 12; i++) {
						if (r = h([2e3, i]), n && !this._longMonthsParse[i] && (this._longMonthsParse[i] = new RegExp("^" + this.months(r, "").replace(".", "") + "$", "i"), this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(r, "").replace(".", "") + "$", "i")), n || this._monthsParse[i] || (o = "^" + this.months(r, "") + "|^" + this.monthsShort(r, ""), this._monthsParse[i] = new RegExp(o.replace(".", ""), "i")), n && "MMMM" === t && this._longMonthsParse[i].test(e)) return i;
						if (n && "MMM" === t && this._shortMonthsParse[i].test(e)) return i;
						if (!n && this._monthsParse[i].test(e)) return i
					}
				}, wn.monthsRegex = function(e) {
					return this._monthsParseExact ? (d(this, "_monthsRegex") || Ve.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (d(this, "_monthsRegex") || (this._monthsRegex = ze), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex)
				}, wn.monthsShortRegex = function(e) {
					return this._monthsParseExact ? (d(this, "_monthsRegex") || Ve.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (d(this, "_monthsShortRegex") || (this._monthsShortRegex = We), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex)
				}, wn.week = function(e) {
					return Ye(e, this._week.dow, this._week.doy).week
				}, wn.firstDayOfYear = function() {
					return this._week.doy
				}, wn.firstDayOfWeek = function() {
					return this._week.dow
				}, wn.weekdays = function(e, t) {
					var n = o(this._weekdays) ? this._weekdays : this._weekdays[e && !0 !== e && this._weekdays.isFormat.test(t) ? "format" : "standalone"];
					return !0 === e ? $e(n, this._week.dow) : e ? n[e.day()] : n
				}, wn.weekdaysMin = function(e) {
					return !0 === e ? $e(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin
				}, wn.weekdaysShort = function(e) {
					return !0 === e ? $e(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort
				}, wn.weekdaysParse = function(e, t, n) {
					var i, r, o;
					if (this._weekdaysParseExact) return function(e, t, n) {
						var i, r, o, a = e.toLocaleLowerCase();
						if (!this._weekdaysParse)
							for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], i = 0; i < 7; ++i) o = h([2e3, 1]).day(i), this._minWeekdaysParse[i] = this.weekdaysMin(o, "").toLocaleLowerCase(), this._shortWeekdaysParse[i] = this.weekdaysShort(o, "").toLocaleLowerCase(), this._weekdaysParse[i] = this.weekdays(o, "").toLocaleLowerCase();
						return n ? "dddd" === t ? -1 !== (r = Me.call(this._weekdaysParse, a)) ? r : null : "ddd" === t ? -1 !== (r = Me.call(this._shortWeekdaysParse, a)) ? r : null : -1 !== (r = Me.call(this._minWeekdaysParse, a)) ? r : null : "dddd" === t ? -1 !== (r = Me.call(this._weekdaysParse, a)) ? r : -1 !== (r = Me.call(this._shortWeekdaysParse, a)) ? r : -1 !== (r = Me.call(this._minWeekdaysParse, a)) ? r : null : "ddd" === t ? -1 !== (r = Me.call(this._shortWeekdaysParse, a)) ? r : -1 !== (r = Me.call(this._weekdaysParse, a)) ? r : -1 !== (r = Me.call(this._minWeekdaysParse, a)) ? r : null : -1 !== (r = Me.call(this._minWeekdaysParse, a)) ? r : -1 !== (r = Me.call(this._weekdaysParse, a)) ? r : -1 !== (r = Me.call(this._shortWeekdaysParse, a)) ? r : null
					}.call(this, e, t, n);
					for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), i = 0; i < 7; i++) {
						if (r = h([2e3, 1]).day(i), n && !this._fullWeekdaysParse[i] && (this._fullWeekdaysParse[i] = new RegExp("^" + this.weekdays(r, "").replace(".", "\\.?") + "$", "i"), this._shortWeekdaysParse[i] = new RegExp("^" + this.weekdaysShort(r, "").replace(".", "\\.?") + "$", "i"), this._minWeekdaysParse[i] = new RegExp("^" + this.weekdaysMin(r, "").replace(".", "\\.?") + "$", "i")), this._weekdaysParse[i] || (o = "^" + this.weekdays(r, "") + "|^" + this.weekdaysShort(r, "") + "|^" + this.weekdaysMin(r, ""), this._weekdaysParse[i] = new RegExp(o.replace(".", ""), "i")), n && "dddd" === t && this._fullWeekdaysParse[i].test(e)) return i;
						if (n && "ddd" === t && this._shortWeekdaysParse[i].test(e)) return i;
						if (n && "dd" === t && this._minWeekdaysParse[i].test(e)) return i;
						if (!n && this._weekdaysParse[i].test(e)) return i
					}
				}, wn.weekdaysRegex = function(e) {
					return this._weekdaysParseExact ? (d(this, "_weekdaysRegex") || et.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (d(this, "_weekdaysRegex") || (this._weekdaysRegex = Je), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex)
				}, wn.weekdaysShortRegex = function(e) {
					return this._weekdaysParseExact ? (d(this, "_weekdaysRegex") || et.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (d(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Ze), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
				}, wn.weekdaysMinRegex = function(e) {
					return this._weekdaysParseExact ? (d(this, "_weekdaysRegex") || et.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (d(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Ke), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
				}, wn.isPM = function(e) {
					return "p" === (e + "").toLowerCase().charAt(0)
				}, wn.meridiem = function(e, t, n) {
					return e > 11 ? n ? "pm" : "PM" : n ? "am" : "AM"
				}, dt("en", {
					dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
					ordinal: function(e) {
						var t = e % 10,
							n = 1 === k(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
						return e + n
					}
				}), r.lang = T("moment.lang is deprecated. Use moment.locale instead.", dt), r.langData = T("moment.langData is deprecated. Use moment.localeData instead.", ht);
				var Tn = Math.abs;

				function Dn(e, t, n, i) {
					var r = $t(t, n);
					return e._milliseconds += i * r._milliseconds, e._days += i * r._days, e._months += i * r._months, e._bubble()
				}

				function Mn(e) {
					return e < 0 ? Math.floor(e) : Math.ceil(e)
				}

				function En(e) {
					return 4800 * e / 146097
				}

				function An(e) {
					return 146097 * e / 4800
				}

				function Pn(e) {
					return function() {
						return this.as(e)
					}
				}
				var On = Pn("ms"),
					Nn = Pn("s"),
					Rn = Pn("m"),
					In = Pn("h"),
					Ln = Pn("d"),
					Fn = Pn("w"),
					jn = Pn("M"),
					Wn = Pn("Q"),
					zn = Pn("y");

				function Vn(e) {
					return function() {
						return this.isValid() ? this._data[e] : NaN
					}
				}
				var Hn = Vn("milliseconds"),
					Bn = Vn("seconds"),
					qn = Vn("minutes"),
					Yn = Vn("hours"),
					Un = Vn("days"),
					$n = Vn("months"),
					Gn = Vn("years"),
					Qn = Math.round,
					Xn = {
						ss: 44,
						s: 45,
						m: 45,
						h: 22,
						d: 26,
						M: 11
					},
					Jn = Math.abs;

				function Zn(e) {
					return (e > 0) - (e < 0) || +e
				}

				function Kn() {
					if (!this.isValid()) return this.localeData().invalidDate();
					var e, t, n = Jn(this._milliseconds) / 1e3,
						i = Jn(this._days),
						r = Jn(this._months);
					e = w(n / 60), t = w(e / 60), n %= 60, e %= 60;
					var o = w(r / 12),
						a = r %= 12,
						s = i,
						l = t,
						u = e,
						c = n ? n.toFixed(3).replace(/\.?0+$/, "") : "",
						d = this.asSeconds();
					if (!d) return "P0D";
					var f = d < 0 ? "-" : "",
						h = Zn(this._months) !== Zn(d) ? "-" : "",
						p = Zn(this._days) !== Zn(d) ? "-" : "",
						g = Zn(this._milliseconds) !== Zn(d) ? "-" : "";
					return f + "P" + (o ? h + o + "Y" : "") + (a ? h + a + "M" : "") + (s ? p + s + "D" : "") + (l || u || c ? "T" : "") + (l ? g + l + "H" : "") + (u ? g + u + "M" : "") + (c ? g + c + "S" : "")
				}
				var ei = Lt.prototype;
				return ei.isValid = function() {
					return this._isValid
				}, ei.abs = function() {
					var e = this._data;
					return this._milliseconds = Tn(this._milliseconds), this._days = Tn(this._days), this._months = Tn(this._months), e.milliseconds = Tn(e.milliseconds), e.seconds = Tn(e.seconds), e.minutes = Tn(e.minutes), e.hours = Tn(e.hours), e.months = Tn(e.months), e.years = Tn(e.years), this
				}, ei.add = function(e, t) {
					return Dn(this, e, t, 1)
				}, ei.subtract = function(e, t) {
					return Dn(this, e, t, -1)
				}, ei.as = function(e) {
					if (!this.isValid()) return NaN;
					var t, n, i = this._milliseconds;
					if ("month" === (e = I(e)) || "quarter" === e || "year" === e) switch (t = this._days + i / 864e5, n = this._months + En(t), e) {
						case "month":
							return n;
						case "quarter":
							return n / 3;
						case "year":
							return n / 12
					} else switch (t = this._days + Math.round(An(this._months)), e) {
						case "week":
							return t / 7 + i / 6048e5;
						case "day":
							return t + i / 864e5;
						case "hour":
							return 24 * t + i / 36e5;
						case "minute":
							return 1440 * t + i / 6e4;
						case "second":
							return 86400 * t + i / 1e3;
						case "millisecond":
							return Math.floor(864e5 * t) + i;
						default:
							throw new Error("Unknown unit " + e)
					}
				}, ei.asMilliseconds = On, ei.asSeconds = Nn, ei.asMinutes = Rn, ei.asHours = In, ei.asDays = Ln, ei.asWeeks = Fn, ei.asMonths = jn, ei.asQuarters = Wn, ei.asYears = zn, ei.valueOf = function() {
					return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * k(this._months / 12) : NaN
				}, ei._bubble = function() {
					var e, t, n, i, r, o = this._milliseconds,
						a = this._days,
						s = this._months,
						l = this._data;
					return o >= 0 && a >= 0 && s >= 0 || o <= 0 && a <= 0 && s <= 0 || (o += 864e5 * Mn(An(s) + a), a = 0, s = 0), l.milliseconds = o % 1e3, e = w(o / 1e3), l.seconds = e % 60, t = w(e / 60), l.minutes = t % 60, n = w(t / 60), l.hours = n % 24, a += w(n / 24), r = w(En(a)), s += r, a -= Mn(An(r)), i = w(s / 12), s %= 12, l.days = a, l.months = s, l.years = i, this
				}, ei.clone = function() {
					return $t(this)
				}, ei.get = function(e) {
					return e = I(e), this.isValid() ? this[e + "s"]() : NaN
				}, ei.milliseconds = Hn, ei.seconds = Bn, ei.minutes = qn, ei.hours = Yn, ei.days = Un, ei.weeks = function() {
					return w(this.days() / 7)
				}, ei.months = $n, ei.years = Gn, ei.humanize = function(e) {
					if (!this.isValid()) return this.localeData().invalidDate();
					var t = this.localeData(),
						n = function(e, t, n) {
							var i = $t(e).abs(),
								r = Qn(i.as("s")),
								o = Qn(i.as("m")),
								a = Qn(i.as("h")),
								s = Qn(i.as("d")),
								l = Qn(i.as("M")),
								u = Qn(i.as("y")),
								c = r <= Xn.ss && ["s", r] || r < Xn.s && ["ss", r] || o <= 1 && ["m"] || o < Xn.m && ["mm", o] || a <= 1 && ["h"] || a < Xn.h && ["hh", a] || s <= 1 && ["d"] || s < Xn.d && ["dd", s] || l <= 1 && ["M"] || l < Xn.M && ["MM", l] || u <= 1 && ["y"] || ["yy", u];
							return c[2] = t, c[3] = +e > 0, c[4] = n,
								function(e, t, n, i, r) {
									return r.relativeTime(t || 1, !!n, e, i)
								}.apply(null, c)
						}(this, !e, t);
					return e && (n = t.pastFuture(+this, n)), t.postformat(n)
				}, ei.toISOString = Kn, ei.toString = Kn, ei.toJSON = Kn, ei.locale = tn, ei.localeData = rn, ei.toIsoString = T("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Kn), ei.lang = nn, q("X", 0, 0, "unix"), q("x", 0, 0, "valueOf"), ce("x", oe), ce("X", /[+-]?\d+(\.\d{1,3})?/), pe("X", function(e, t, n) {
					n._d = new Date(1e3 * parseFloat(e, 10))
				}), pe("x", function(e, t, n) {
					n._d = new Date(k(e))
				}), r.version = "2.24.0", n = Pt, r.fn = _n, r.min = function() {
					return Rt("isBefore", [].slice.call(arguments, 0))
				}, r.max = function() {
					return Rt("isAfter", [].slice.call(arguments, 0))
				}, r.now = function() {
					return Date.now ? Date.now() : +new Date
				}, r.utc = h, r.unix = function(e) {
					return Pt(1e3 * e)
				}, r.months = function(e, t) {
					return Sn(e, t, "months")
				}, r.isDate = u, r.locale = dt, r.invalid = m, r.duration = $t, r.isMoment = x, r.weekdays = function(e, t, n) {
					return Cn(e, t, n, "weekdays")
				}, r.parseZone = function() {
					return Pt.apply(null, arguments).parseZone()
				}, r.localeData = ht, r.isDuration = Ft, r.monthsShort = function(e, t) {
					return Sn(e, t, "monthsShort")
				}, r.weekdaysMin = function(e, t, n) {
					return Cn(e, t, n, "weekdaysMin")
				}, r.defineLocale = ft, r.updateLocale = function(e, t) {
					if (null != t) {
						var n, i, r = at;
						null != (i = ct(e)) && (r = i._config), t = P(r, t), (n = new O(t)).parentLocale = st[e], st[e] = n, dt(e)
					} else null != st[e] && (null != st[e].parentLocale ? st[e] = st[e].parentLocale : null != st[e] && delete st[e]);
					return st[e]
				}, r.locales = function() {
					return D(st)
				}, r.weekdaysShort = function(e, t, n) {
					return Cn(e, t, n, "weekdaysShort")
				}, r.normalizeUnits = I, r.relativeTimeRounding = function(e) {
					return void 0 === e ? Qn : "function" == typeof e && (Qn = e, !0)
				}, r.relativeTimeThreshold = function(e, t) {
					return void 0 !== Xn[e] && (void 0 === t ? Xn[e] : (Xn[e] = t, "s" === e && (Xn.ss = t - 1), !0))
				}, r.calendarFormat = function(e, t) {
					var n = e.diff(t, "days", !0);
					return n < -6 ? "sameElse" : n < -1 ? "lastWeek" : n < 0 ? "lastDay" : n < 1 ? "sameDay" : n < 2 ? "nextDay" : n < 7 ? "nextWeek" : "sameElse"
				}, r.prototype = _n, r.HTML5_FMT = {
					DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
					DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
					DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
					DATE: "YYYY-MM-DD",
					TIME: "HH:mm",
					TIME_SECONDS: "HH:mm:ss",
					TIME_MS: "HH:mm:ss.SSS",
					WEEK: "GGGG-[W]WW",
					MONTH: "YYYY-MM"
				}, r
			}()
		}),
		hi = {
			datetime: "MMM D, YYYY, h:mm:ss a",
			millisecond: "h:mm:ss.SSS a",
			second: "h:mm:ss a",
			minute: "h:mm a",
			hour: "hA",
			day: "MMM D",
			week: "ll",
			month: "MMM YYYY",
			quarter: "[Q]Q - YYYY",
			year: "YYYY"
		};
	nn._date.override("function" == typeof fi ? {
		_id: "moment",
		formats: function() {
			return hi
		},
		parse: function(e, t) {
			return "string" == typeof e && "string" == typeof t ? e = fi(e, t) : e instanceof fi || (e = fi(e)), e.isValid() ? e.valueOf() : null
		},
		format: function(e, t) {
			return fi(e).format(t)
		},
		add: function(e, t, n) {
			return fi(e).add(t, n).valueOf()
		},
		diff: function(e, t, n) {
			return fi(e).diff(fi(t), n)
		},
		startOf: function(e, t, n) {
			return e = fi(e), "isoWeek" === t ? e.isoWeekday(n).valueOf() : e.startOf(t).valueOf()
		},
		endOf: function(e, t) {
			return fi(e).endOf(t).valueOf()
		},
		_create: function(e) {
			return fi(e)
		}
	} : {}), j._set("global", {
		plugins: {
			filler: {
				propagate: !0
			}
		}
	});
	var pi = {
		dataset: function(e) {
			var t = e.fill,
				n = e.chart,
				i = n.getDatasetMeta(t),
				r = i && n.isDatasetVisible(t) && i.dataset._children || [],
				o = r.length || 0;
			return o ? function(e, t) {
				return t < o && r[t]._view || null
			} : null
		},
		boundary: function(e) {
			var t = e.boundary,
				n = t ? t.x : null,
				i = t ? t.y : null;
			return B.isArray(t) ? function(e, n) {
				return t[n]
			} : function(e) {
				return {
					x: null === n ? e.x : n,
					y: null === i ? e.y : i
				}
			}
		}
	};

	function gi(e, t, n) {
		var i, r = e._model || {},
			o = r.fill;
		if (void 0 === o && (o = !!r.backgroundColor), !1 === o || null === o) return !1;
		if (!0 === o) return "origin";
		if (i = parseFloat(o, 10), isFinite(i) && Math.floor(i) === i) return "-" !== o[0] && "+" !== o[0] || (i = t + i), !(i === t || i < 0 || i >= n) && i;
		switch (o) {
			case "bottom":
				return "start";
			case "top":
				return "end";
			case "zero":
				return "origin";
			case "origin":
			case "start":
			case "end":
				return o;
			default:
				return !1
		}
	}

	function mi(e) {
		return (e.el._scale || {}).getPointPositionForValue ? function(e) {
			var t, n, i, r, o, a = e.el._scale,
				s = a.options,
				l = a.chart.data.labels.length,
				u = e.fill,
				c = [];
			if (!l) return null;
			for (t = s.ticks.reverse ? a.max : a.min, n = s.ticks.reverse ? a.min : a.max, i = a.getPointPositionForValue(0, t), r = 0; r < l; ++r) o = "start" === u || "end" === u ? a.getPointPositionForValue(r, "start" === u ? t : n) : a.getBasePosition(r), s.gridLines.circular && (o.cx = i.x, o.cy = i.y, o.angle = a.getIndexAngle(r) - Math.PI / 2), c.push(o);
			return c
		}(e) : function(e) {
			var t, n = e.el._model || {},
				i = e.el._scale || {},
				r = e.fill,
				o = null;
			if (isFinite(r)) return null;
			if ("start" === r ? o = void 0 === n.scaleBottom ? i.bottom : n.scaleBottom : "end" === r ? o = void 0 === n.scaleTop ? i.top : n.scaleTop : void 0 !== n.scaleZero ? o = n.scaleZero : i.getBasePixel && (o = i.getBasePixel()), null != o) {
				if (void 0 !== o.x && void 0 !== o.y) return o;
				if (B.isFinite(o)) return {
					x: (t = i.isHorizontal()) ? o : null,
					y: t ? null : o
				}
			}
			return null
		}(e)
	}

	function vi(e, t, n) {
		var i, r = e[t].fill,
			o = [t];
		if (!n) return r;
		for (; !1 !== r && -1 === o.indexOf(r);) {
			if (!isFinite(r)) return r;
			if (!(i = e[r])) return !1;
			if (i.visible) return r;
			o.push(r), r = i.fill
		}
		return !1
	}

	function bi(e) {
		var t = e.fill,
			n = "dataset";
		return !1 === t ? null : (isFinite(t) || (n = "boundary"), pi[n](e))
	}

	function yi(e) {
		return e && !e.skip
	}

	function _i(e, t, n, i, r) {
		var o, a, s, l;
		if (i && r) {
			for (e.moveTo(t[0].x, t[0].y), o = 1; o < i; ++o) B.canvas.lineTo(e, t[o - 1], t[o]);
			if (void 0 === n[0].angle)
				for (e.lineTo(n[r - 1].x, n[r - 1].y), o = r - 1; o > 0; --o) B.canvas.lineTo(e, n[o], n[o - 1], !0);
			else
				for (a = n[0].cx, s = n[0].cy, l = Math.sqrt(Math.pow(n[0].x - a, 2) + Math.pow(n[0].y - s, 2)), o = r - 1; o > 0; --o) e.arc(a, s, l, n[o].angle, n[o - 1].angle, !0)
		}
	}

	function xi(e, t, n, i, r, o) {
		var a, s, l, u, c, d, f, h, p = t.length,
			g = i.spanGaps,
			m = [],
			v = [],
			b = 0,
			y = 0;
		for (e.beginPath(), a = 0, s = p; a < s; ++a) c = n(u = t[l = a % p]._view, l, i), d = yi(u), f = yi(c), o && void 0 === h && d && (s = p + (h = a + 1)), d && f ? (b = m.push(u), y = v.push(c)) : b && y && (g ? (d && m.push(u), f && v.push(c)) : (_i(e, m, v, b, y), b = y = 0, m = [], v = []));
		_i(e, m, v, b, y), e.closePath(), e.fillStyle = r, e.fill()
	}
	var wi = {
			id: "filler",
			afterDatasetsUpdate: function(e, t) {
				var n, i, r, o, a = (e.data.datasets || []).length,
					s = t.propagate,
					l = [];
				for (i = 0; i < a; ++i) o = null, (r = (n = e.getDatasetMeta(i)).dataset) && r._model && r instanceof ke.Line && (o = {
					visible: e.isDatasetVisible(i),
					fill: gi(r, i, a),
					chart: e,
					el: r
				}), n.$filler = o, l.push(o);
				for (i = 0; i < a; ++i)(o = l[i]) && (o.fill = vi(l, i, s), o.boundary = mi(o), o.mapper = bi(o))
			},
			beforeDatasetsDraw: function(e) {
				var t, n, i, r, o, a, s, l = e._getSortedVisibleDatasetMetas(),
					u = e.ctx;
				for (n = l.length - 1; n >= 0; --n)(t = l[n].$filler) && t.visible && (r = (i = t.el)._view, o = i._children || [], a = t.mapper, s = r.backgroundColor || j.global.defaultColor, a && s && o.length && (B.canvas.clipArea(u, e.chartArea), xi(u, o, a, r, s, i._loop), B.canvas.unclipArea(u)))
			}
		},
		ki = B.rtl.getRtlAdapter,
		Si = B.noop,
		Ci = B.valueOrDefault;

	function Ti(e, t) {
		return e.usePointStyle && e.boxWidth > t ? t : e.boxWidth
	}
	j._set("global", {
		legend: {
			display: !0,
			position: "top",
			align: "center",
			fullWidth: !0,
			reverse: !1,
			weight: 1e3,
			onClick: function(e, t) {
				var n = t.datasetIndex,
					i = this.chart,
					r = i.getDatasetMeta(n);
				r.hidden = null === r.hidden ? !i.data.datasets[n].hidden : null, i.update()
			},
			onHover: null,
			onLeave: null,
			labels: {
				boxWidth: 40,
				padding: 10,
				generateLabels: function(e) {
					var t = e.data.datasets,
						n = e.options.legend || {},
						i = n.labels && n.labels.usePointStyle;
					return e._getSortedDatasetMetas().map(function(n) {
						var r = n.controller.getStyle(i ? 0 : void 0);
						return {
							text: t[n.index].label,
							fillStyle: r.backgroundColor,
							hidden: !e.isDatasetVisible(n.index),
							lineCap: r.borderCapStyle,
							lineDash: r.borderDash,
							lineDashOffset: r.borderDashOffset,
							lineJoin: r.borderJoinStyle,
							lineWidth: r.borderWidth,
							strokeStyle: r.borderColor,
							pointStyle: r.pointStyle,
							rotation: r.rotation,
							datasetIndex: n.index
						}
					}, this)
				}
			}
		},
		legendCallback: function(e) {
			var t, n, i, r = document.createElement("ul"),
				o = e.data.datasets;
			for (r.setAttribute("class", e.id + "-legend"), t = 0, n = o.length; t < n; t++)(i = r.appendChild(document.createElement("li"))).appendChild(document.createElement("span")).style.backgroundColor = o[t].backgroundColor, o[t].label && i.appendChild(document.createTextNode(o[t].label));
			return r.outerHTML
		}
	});
	var Di = X.extend({
		initialize: function(e) {
			B.extend(this, e), this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1
		},
		beforeUpdate: Si,
		update: function(e, t, n) {
			var i = this;
			return i.beforeUpdate(), i.maxWidth = e, i.maxHeight = t, i.margins = n, i.beforeSetDimensions(), i.setDimensions(), i.afterSetDimensions(), i.beforeBuildLabels(), i.buildLabels(), i.afterBuildLabels(), i.beforeFit(), i.fit(), i.afterFit(), i.afterUpdate(), i.minSize
		},
		afterUpdate: Si,
		beforeSetDimensions: Si,
		setDimensions: function() {
			var e = this;
			e.isHorizontal() ? (e.width = e.maxWidth, e.left = 0, e.right = e.width) : (e.height = e.maxHeight, e.top = 0, e.bottom = e.height), e.paddingLeft = 0, e.paddingTop = 0, e.paddingRight = 0, e.paddingBottom = 0, e.minSize = {
				width: 0,
				height: 0
			}
		},
		afterSetDimensions: Si,
		beforeBuildLabels: Si,
		buildLabels: function() {
			var e = this,
				t = e.options.labels || {},
				n = B.callback(t.generateLabels, [e.chart], e) || [];
			t.filter && (n = n.filter(function(n) {
				return t.filter(n, e.chart.data)
			})), e.options.reverse && n.reverse(), e.legendItems = n
		},
		afterBuildLabels: Si,
		beforeFit: Si,
		fit: function() {
			var e = this,
				t = e.options,
				n = t.labels,
				i = t.display,
				r = e.ctx,
				o = B.options._parseFont(n),
				a = o.size,
				s = e.legendHitBoxes = [],
				l = e.minSize,
				u = e.isHorizontal();
			if (u ? (l.width = e.maxWidth, l.height = i ? 10 : 0) : (l.width = i ? 10 : 0, l.height = e.maxHeight), i) {
				if (r.font = o.string, u) {
					var c = e.lineWidths = [0],
						d = 0;
					r.textAlign = "left", r.textBaseline = "middle", B.each(e.legendItems, function(e, t) {
						var i = Ti(n, a) + a / 2 + r.measureText(e.text).width;
						(0 === t || c[c.length - 1] + i + 2 * n.padding > l.width) && (d += a + n.padding, c[c.length - (t > 0 ? 0 : 1)] = 0), s[t] = {
							left: 0,
							top: 0,
							width: i,
							height: a
						}, c[c.length - 1] += i + n.padding
					}), l.height += d
				} else {
					var f = n.padding,
						h = e.columnWidths = [],
						p = e.columnHeights = [],
						g = n.padding,
						m = 0,
						v = 0;
					B.each(e.legendItems, function(e, t) {
						var i = Ti(n, a) + a / 2 + r.measureText(e.text).width;
						t > 0 && v + a + 2 * f > l.height && (g += m + n.padding, h.push(m), p.push(v), m = 0, v = 0), m = Math.max(m, i), v += a + f, s[t] = {
							left: 0,
							top: 0,
							width: i,
							height: a
						}
					}), g += m, h.push(m), p.push(v), l.width += g
				}
				e.width = l.width, e.height = l.height
			} else e.width = l.width = e.height = l.height = 0
		},
		afterFit: Si,
		isHorizontal: function() {
			return "top" === this.options.position || "bottom" === this.options.position
		},
		draw: function() {
			var e = this,
				t = e.options,
				n = t.labels,
				i = j.global,
				r = i.defaultColor,
				o = i.elements.line,
				a = e.height,
				s = e.columnHeights,
				l = e.width,
				u = e.lineWidths;
			if (t.display) {
				var c, d = ki(t.rtl, e.left, e.minSize.width),
					f = e.ctx,
					h = Ci(n.fontColor, i.defaultFontColor),
					p = B.options._parseFont(n),
					g = p.size;
				f.textAlign = d.textAlign("left"), f.textBaseline = "middle", f.lineWidth = .5, f.strokeStyle = h, f.fillStyle = h, f.font = p.string;
				var m = Ti(n, g),
					v = e.legendHitBoxes,
					b = function(e, i) {
						switch (t.align) {
							case "start":
								return n.padding;
							case "end":
								return e - i;
							default:
								return (e - i + n.padding) / 2
						}
					},
					y = e.isHorizontal();
				c = y ? {
					x: e.left + b(l, u[0]),
					y: e.top + n.padding,
					line: 0
				} : {
					x: e.left + n.padding,
					y: e.top + b(a, s[0]),
					line: 0
				}, B.rtl.overrideTextDirection(e.ctx, t.textDirection);
				var _ = g + n.padding;
				B.each(e.legendItems, function(t, i) {
					var h = f.measureText(t.text).width,
						p = m + g / 2 + h,
						x = c.x,
						w = c.y;
					d.setWidth(e.minSize.width), y ? i > 0 && x + p + n.padding > e.left + e.minSize.width && (w = c.y += _, c.line++, x = c.x = e.left + b(l, u[c.line])) : i > 0 && w + _ > e.top + e.minSize.height && (x = c.x = x + e.columnWidths[c.line] + n.padding, c.line++, w = c.y = e.top + b(a, s[c.line]));
					var k = d.x(x);
					! function(e, t, i) {
						if (!(isNaN(m) || m <= 0)) {
							f.save();
							var a = Ci(i.lineWidth, o.borderWidth);
							if (f.fillStyle = Ci(i.fillStyle, r), f.lineCap = Ci(i.lineCap, o.borderCapStyle), f.lineDashOffset = Ci(i.lineDashOffset, o.borderDashOffset), f.lineJoin = Ci(i.lineJoin, o.borderJoinStyle), f.lineWidth = a, f.strokeStyle = Ci(i.strokeStyle, r), f.setLineDash && f.setLineDash(Ci(i.lineDash, o.borderDash)), n && n.usePointStyle) {
								var s = m * Math.SQRT2 / 2,
									l = d.xPlus(e, m / 2),
									u = t + g / 2;
								B.canvas.drawPoint(f, i.pointStyle, s, l, u, i.rotation)
							} else f.fillRect(d.leftForLtr(e, m), t, m, g), 0 !== a && f.strokeRect(d.leftForLtr(e, m), t, m, g);
							f.restore()
						}
					}(k, w, t), v[i].left = d.leftForLtr(k, v[i].width), v[i].top = w,
						function(e, t, n, i) {
							var r = g / 2,
								o = d.xPlus(e, m + r),
								a = t + r;
							f.fillText(n.text, o, a), n.hidden && (f.beginPath(), f.lineWidth = 2, f.moveTo(o, a), f.lineTo(d.xPlus(o, i), a), f.stroke())
						}(k, w, t, h), y ? c.x += p + n.padding : c.y += _
				}), B.rtl.restoreTextDirection(e.ctx, t.textDirection)
			}
		},
		_getLegendItemAt: function(e, t) {
			var n, i, r, o = this;
			if (e >= o.left && e <= o.right && t >= o.top && t <= o.bottom)
				for (r = o.legendHitBoxes, n = 0; n < r.length; ++n)
					if (e >= (i = r[n]).left && e <= i.left + i.width && t >= i.top && t <= i.top + i.height) return o.legendItems[n];
			return null
		},
		handleEvent: function(e) {
			var t, n = this,
				i = n.options,
				r = "mouseup" === e.type ? "click" : e.type;
			if ("mousemove" === r) {
				if (!i.onHover && !i.onLeave) return
			} else {
				if ("click" !== r) return;
				if (!i.onClick) return
			}
			t = n._getLegendItemAt(e.x, e.y), "click" === r ? t && i.onClick && i.onClick.call(n, e.native, t) : (i.onLeave && t !== n._hoveredItem && (n._hoveredItem && i.onLeave.call(n, e.native, n._hoveredItem), n._hoveredItem = t), i.onHover && t && i.onHover.call(n, e.native, t))
		}
	});

	function Mi(e, t) {
		var n = new Di({
			ctx: e.ctx,
			options: t,
			chart: e
		});
		pt.configure(e, n, t), pt.addBox(e, n), e.legend = n
	}
	var Ei = {
			id: "legend",
			_element: Di,
			beforeInit: function(e) {
				var t = e.options.legend;
				t && Mi(e, t)
			},
			beforeUpdate: function(e) {
				var t = e.options.legend,
					n = e.legend;
				t ? (B.mergeIf(t, j.global.legend), n ? (pt.configure(e, n, t), n.options = t) : Mi(e, t)) : n && (pt.removeBox(e, n), delete e.legend)
			},
			afterEvent: function(e, t) {
				var n = e.legend;
				n && n.handleEvent(t)
			}
		},
		Ai = B.noop;
	j._set("global", {
		title: {
			display: !1,
			fontStyle: "bold",
			fullWidth: !0,
			padding: 10,
			position: "top",
			text: "",
			weight: 2e3
		}
	});
	var Pi = X.extend({
		initialize: function(e) {
			B.extend(this, e), this.legendHitBoxes = []
		},
		beforeUpdate: Ai,
		update: function(e, t, n) {
			var i = this;
			return i.beforeUpdate(), i.maxWidth = e, i.maxHeight = t, i.margins = n, i.beforeSetDimensions(), i.setDimensions(), i.afterSetDimensions(), i.beforeBuildLabels(), i.buildLabels(), i.afterBuildLabels(), i.beforeFit(), i.fit(), i.afterFit(), i.afterUpdate(), i.minSize
		},
		afterUpdate: Ai,
		beforeSetDimensions: Ai,
		setDimensions: function() {
			var e = this;
			e.isHorizontal() ? (e.width = e.maxWidth, e.left = 0, e.right = e.width) : (e.height = e.maxHeight, e.top = 0, e.bottom = e.height), e.paddingLeft = 0, e.paddingTop = 0, e.paddingRight = 0, e.paddingBottom = 0, e.minSize = {
				width: 0,
				height: 0
			}
		},
		afterSetDimensions: Ai,
		beforeBuildLabels: Ai,
		buildLabels: Ai,
		afterBuildLabels: Ai,
		beforeFit: Ai,
		fit: function() {
			var e, t = this,
				n = t.options,
				i = t.minSize = {},
				r = t.isHorizontal();
			n.display ? (e = (B.isArray(n.text) ? n.text.length : 1) * B.options._parseFont(n).lineHeight + 2 * n.padding, t.width = i.width = r ? t.maxWidth : e, t.height = i.height = r ? e : t.maxHeight) : t.width = i.width = t.height = i.height = 0
		},
		afterFit: Ai,
		isHorizontal: function() {
			var e = this.options.position;
			return "top" === e || "bottom" === e
		},
		draw: function() {
			var e = this,
				t = e.ctx,
				n = e.options;
			if (n.display) {
				var i, r, o, a = B.options._parseFont(n),
					s = a.lineHeight,
					l = s / 2 + n.padding,
					u = 0,
					c = e.top,
					d = e.left,
					f = e.bottom,
					h = e.right;
				t.fillStyle = B.valueOrDefault(n.fontColor, j.global.defaultFontColor), t.font = a.string, e.isHorizontal() ? (r = d + (h - d) / 2, o = c + l, i = h - d) : (r = "left" === n.position ? d + l : h - l, o = c + (f - c) / 2, i = f - c, u = Math.PI * ("left" === n.position ? -.5 : .5)), t.save(), t.translate(r, o), t.rotate(u), t.textAlign = "center", t.textBaseline = "middle";
				var p = n.text;
				if (B.isArray(p))
					for (var g = 0, m = 0; m < p.length; ++m) t.fillText(p[m], 0, g, i), g += s;
				else t.fillText(p, 0, 0, i);
				t.restore()
			}
		}
	});

	function Oi(e, t) {
		var n = new Pi({
			ctx: e.ctx,
			options: t,
			chart: e
		});
		pt.configure(e, n, t), pt.addBox(e, n), e.titleBlock = n
	}
	var Ni = {},
		Ri = wi,
		Ii = Ei,
		Li = {
			id: "title",
			_element: Pi,
			beforeInit: function(e) {
				var t = e.options.title;
				t && Oi(e, t)
			},
			beforeUpdate: function(e) {
				var t = e.options.title,
					n = e.titleBlock;
				t ? (B.mergeIf(t, j.global.title), n ? (pt.configure(e, n, t), n.options = t) : Oi(e, t)) : n && (pt.removeBox(e, n), delete e.titleBlock)
			}
		};
	for (var Fi in Ni.filler = Ri, Ni.legend = Ii, Ni.title = Li, Kt.helpers = B,
			function() {
				function e(e, t, n) {
					var i;
					return "string" == typeof e ? (i = parseInt(e, 10), -1 !== e.indexOf("%") && (i = i / 100 * t.parentNode[n])) : i = e, i
				}

				function t(e) {
					return null != e && "none" !== e
				}

				function n(n, i, r) {
					var o = document.defaultView,
						a = B._getParentNode(n),
						s = o.getComputedStyle(n)[i],
						l = o.getComputedStyle(a)[i],
						u = t(s),
						c = t(l),
						d = Number.POSITIVE_INFINITY;
					return u || c ? Math.min(u ? e(s, n, r) : d, c ? e(l, a, r) : d) : "none"
				}
				B.where = function(e, t) {
					if (B.isArray(e) && Array.prototype.filter) return e.filter(t);
					var n = [];
					return B.each(e, function(e) {
						t(e) && n.push(e)
					}), n
				}, B.findIndex = Array.prototype.findIndex ? function(e, t, n) {
					return e.findIndex(t, n)
				} : function(e, t, n) {
					n = void 0 === n ? e : n;
					for (var i = 0, r = e.length; i < r; ++i)
						if (t.call(n, e[i], i, e)) return i;
					return -1
				}, B.findNextWhere = function(e, t, n) {
					B.isNullOrUndef(n) && (n = -1);
					for (var i = n + 1; i < e.length; i++) {
						var r = e[i];
						if (t(r)) return r
					}
				}, B.findPreviousWhere = function(e, t, n) {
					B.isNullOrUndef(n) && (n = e.length);
					for (var i = n - 1; i >= 0; i--) {
						var r = e[i];
						if (t(r)) return r
					}
				}, B.isNumber = function(e) {
					return !isNaN(parseFloat(e)) && isFinite(e)
				}, B.almostEquals = function(e, t, n) {
					return Math.abs(e - t) < n
				}, B.almostWhole = function(e, t) {
					var n = Math.round(e);
					return n - t <= e && n + t >= e
				}, B.max = function(e) {
					return e.reduce(function(e, t) {
						return isNaN(t) ? e : Math.max(e, t)
					}, Number.NEGATIVE_INFINITY)
				}, B.min = function(e) {
					return e.reduce(function(e, t) {
						return isNaN(t) ? e : Math.min(e, t)
					}, Number.POSITIVE_INFINITY)
				}, B.sign = Math.sign ? function(e) {
					return Math.sign(e)
				} : function(e) {
					return 0 == (e = +e) || isNaN(e) ? e : e > 0 ? 1 : -1
				}, B.toRadians = function(e) {
					return e * (Math.PI / 180)
				}, B.toDegrees = function(e) {
					return e * (180 / Math.PI)
				}, B._decimalPlaces = function(e) {
					if (B.isFinite(e)) {
						for (var t = 1, n = 0; Math.round(e * t) / t !== e;) t *= 10, n++;
						return n
					}
				}, B.getAngleFromPoint = function(e, t) {
					var n = t.x - e.x,
						i = t.y - e.y,
						r = Math.sqrt(n * n + i * i),
						o = Math.atan2(i, n);
					return o < -.5 * Math.PI && (o += 2 * Math.PI), {
						angle: o,
						distance: r
					}
				}, B.distanceBetweenPoints = function(e, t) {
					return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2))
				}, B.aliasPixel = function(e) {
					return e % 2 == 0 ? 0 : .5
				}, B._alignPixel = function(e, t, n) {
					var i = e.currentDevicePixelRatio,
						r = n / 2;
					return Math.round((t - r) * i) / i + r
				}, B.splineCurve = function(e, t, n, i) {
					var r = e.skip ? t : e,
						o = t,
						a = n.skip ? t : n,
						s = Math.sqrt(Math.pow(o.x - r.x, 2) + Math.pow(o.y - r.y, 2)),
						l = Math.sqrt(Math.pow(a.x - o.x, 2) + Math.pow(a.y - o.y, 2)),
						u = s / (s + l),
						c = l / (s + l),
						d = i * (u = isNaN(u) ? 0 : u),
						f = i * (c = isNaN(c) ? 0 : c);
					return {
						previous: {
							x: o.x - d * (a.x - r.x),
							y: o.y - d * (a.y - r.y)
						},
						next: {
							x: o.x + f * (a.x - r.x),
							y: o.y + f * (a.y - r.y)
						}
					}
				}, B.EPSILON = Number.EPSILON || 1e-14, B.splineCurveMonotone = function(e) {
					var t, n, i, r, o, a, s, l, u, c = (e || []).map(function(e) {
							return {
								model: e._model,
								deltaK: 0,
								mK: 0
							}
						}),
						d = c.length;
					for (t = 0; t < d; ++t)
						if (!(i = c[t]).model.skip) {
							if (n = t > 0 ? c[t - 1] : null, (r = t < d - 1 ? c[t + 1] : null) && !r.model.skip) {
								var f = r.model.x - i.model.x;
								i.deltaK = 0 !== f ? (r.model.y - i.model.y) / f : 0
							}!n || n.model.skip ? i.mK = i.deltaK : !r || r.model.skip ? i.mK = n.deltaK : this.sign(n.deltaK) !== this.sign(i.deltaK) ? i.mK = 0 : i.mK = (n.deltaK + i.deltaK) / 2
						} for (t = 0; t < d - 1; ++t) i = c[t], r = c[t + 1], i.model.skip || r.model.skip || (B.almostEquals(i.deltaK, 0, this.EPSILON) ? i.mK = r.mK = 0 : (o = i.mK / i.deltaK, a = r.mK / i.deltaK, (l = Math.pow(o, 2) + Math.pow(a, 2)) <= 9 || (s = 3 / Math.sqrt(l), i.mK = o * s * i.deltaK, r.mK = a * s * i.deltaK)));
					for (t = 0; t < d; ++t)(i = c[t]).model.skip || (n = t > 0 ? c[t - 1] : null, r = t < d - 1 ? c[t + 1] : null, n && !n.model.skip && (u = (i.model.x - n.model.x) / 3, i.model.controlPointPreviousX = i.model.x - u, i.model.controlPointPreviousY = i.model.y - u * i.mK), r && !r.model.skip && (u = (r.model.x - i.model.x) / 3, i.model.controlPointNextX = i.model.x + u, i.model.controlPointNextY = i.model.y + u * i.mK))
				}, B.nextItem = function(e, t, n) {
					return n ? t >= e.length - 1 ? e[0] : e[t + 1] : t >= e.length - 1 ? e[e.length - 1] : e[t + 1]
				}, B.previousItem = function(e, t, n) {
					return n ? t <= 0 ? e[e.length - 1] : e[t - 1] : t <= 0 ? e[0] : e[t - 1]
				}, B.niceNum = function(e, t) {
					var n = Math.floor(B.log10(e)),
						i = e / Math.pow(10, n);
					return (t ? i < 1.5 ? 1 : i < 3 ? 2 : i < 7 ? 5 : 10 : i <= 1 ? 1 : i <= 2 ? 2 : i <= 5 ? 5 : 10) * Math.pow(10, n)
				}, B.requestAnimFrame = "undefined" == typeof window ? function(e) {
					e()
				} : window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
					return window.setTimeout(e, 1e3 / 60)
				}, B.getRelativePosition = function(e, t) {
					var n, i, r = e.originalEvent || e,
						o = e.target || e.srcElement,
						a = o.getBoundingClientRect(),
						s = r.touches;
					s && s.length > 0 ? (n = s[0].clientX, i = s[0].clientY) : (n = r.clientX, i = r.clientY);
					var l = parseFloat(B.getStyle(o, "padding-left")),
						u = parseFloat(B.getStyle(o, "padding-top")),
						c = parseFloat(B.getStyle(o, "padding-right")),
						d = parseFloat(B.getStyle(o, "padding-bottom")),
						f = a.right - a.left - l - c,
						h = a.bottom - a.top - u - d;
					return {
						x: n = Math.round((n - a.left - l) / f * o.width / t.currentDevicePixelRatio),
						y: i = Math.round((i - a.top - u) / h * o.height / t.currentDevicePixelRatio)
					}
				}, B.getConstraintWidth = function(e) {
					return n(e, "max-width", "clientWidth")
				}, B.getConstraintHeight = function(e) {
					return n(e, "max-height", "clientHeight")
				}, B._calculatePadding = function(e, t, n) {
					return (t = B.getStyle(e, t)).indexOf("%") > -1 ? n * parseInt(t, 10) / 100 : parseInt(t, 10)
				}, B._getParentNode = function(e) {
					var t = e.parentNode;
					return t && "[object ShadowRoot]" === t.toString() && (t = t.host), t
				}, B.getMaximumWidth = function(e) {
					var t = B._getParentNode(e);
					if (!t) return e.clientWidth;
					var n = t.clientWidth,
						i = n - B._calculatePadding(t, "padding-left", n) - B._calculatePadding(t, "padding-right", n),
						r = B.getConstraintWidth(e);
					return isNaN(r) ? i : Math.min(i, r)
				}, B.getMaximumHeight = function(e) {
					var t = B._getParentNode(e);
					if (!t) return e.clientHeight;
					var n = t.clientHeight,
						i = n - B._calculatePadding(t, "padding-top", n) - B._calculatePadding(t, "padding-bottom", n),
						r = B.getConstraintHeight(e);
					return isNaN(r) ? i : Math.min(i, r)
				}, B.getStyle = function(e, t) {
					return e.currentStyle ? e.currentStyle[t] : document.defaultView.getComputedStyle(e, null).getPropertyValue(t)
				}, B.retinaScale = function(e, t) {
					var n = e.currentDevicePixelRatio = t || "undefined" != typeof window && window.devicePixelRatio || 1;
					if (1 !== n) {
						var i = e.canvas,
							r = e.height,
							o = e.width;
						i.height = r * n, i.width = o * n, e.ctx.scale(n, n), i.style.height || i.style.width || (i.style.height = r + "px", i.style.width = o + "px")
					}
				}, B.fontString = function(e, t, n) {
					return t + " " + e + "px " + n
				}, B.longestText = function(e, t, n, i) {
					var r = (i = i || {}).data = i.data || {},
						o = i.garbageCollect = i.garbageCollect || [];
					i.font !== t && (r = i.data = {}, o = i.garbageCollect = [], i.font = t), e.font = t;
					var a, s, l, u, c, d = 0,
						f = n.length;
					for (a = 0; a < f; a++)
						if (null != (u = n[a]) && !0 !== B.isArray(u)) d = B.measureText(e, r, o, d, u);
						else if (B.isArray(u))
						for (s = 0, l = u.length; s < l; s++) null == (c = u[s]) || B.isArray(c) || (d = B.measureText(e, r, o, d, c));
					var h = o.length / 2;
					if (h > n.length) {
						for (a = 0; a < h; a++) delete r[o[a]];
						o.splice(0, h)
					}
					return d
				}, B.measureText = function(e, t, n, i, r) {
					var o = t[r];
					return o || (o = t[r] = e.measureText(r).width, n.push(r)), o > i && (i = o), i
				}, B.numberOfLabelLines = function(e) {
					var t = 1;
					return B.each(e, function(e) {
						B.isArray(e) && e.length > t && (t = e.length)
					}), t
				}, B.color = w ? function(e) {
					return e instanceof CanvasGradient && (e = j.global.defaultColor), w(e)
				} : function(e) {
					return console.error("Color.js not found!"), e
				}, B.getHoverColor = function(e) {
					return e instanceof CanvasPattern || e instanceof CanvasGradient ? e : B.color(e).saturate(.5).darken(.1).rgbString()
				}
			}(), Kt._adapters = nn, Kt.Animation = Z, Kt.animationService = K, Kt.controllers = Je, Kt.DatasetController = re, Kt.defaults = j, Kt.Element = X, Kt.elements = ke, Kt.Interaction = rt, Kt.layouts = pt, Kt.platform = Ot, Kt.plugins = Nt, Kt.Scale = bn, Kt.scaleService = Rt, Kt.Ticks = rn, Kt.Tooltip = Yt, Kt.helpers.each(di, function(e, t) {
				Kt.scaleService.registerScaleType(t, e, e._defaults)
			}), Ni) Ni.hasOwnProperty(Fi) && Kt.plugins.register(Ni[Fi]);
	Kt.platform.initialize();
	var ji = Kt;
	return "undefined" != typeof window && (window.Chart = Kt), Kt.Chart = Kt, Kt.Legend = Ni.legend._element, Kt.Title = Ni.title._element, Kt.pluginService = Kt.plugins, Kt.PluginBase = Kt.Element.extend({}), Kt.canvasHelpers = Kt.helpers.canvas, Kt.layoutService = Kt.layouts, Kt.LinearScaleBase = Sn, Kt.helpers.each(["Bar", "Bubble", "Doughnut", "Line", "PolarArea", "Radar", "Scatter"], function(e) {
		Kt[e] = function(t, n) {
			return new Kt(t, Kt.helpers.merge(n || {}, {
				type: e.charAt(0).toLowerCase() + e.slice(1)
			}))
		}
	}), ji
}),
function(e, t) {
	"use strict";
	"object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
		if (!e.document) throw new Error("jQuery requires a window with a document");
		return t(e)
	} : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
	"use strict";
	var n = [],
		i = Object.getPrototypeOf,
		r = n.slice,
		o = n.flat ? function(e) {
			return n.flat.call(e)
		} : function(e) {
			return n.concat.apply([], e)
		},
		a = n.push,
		s = n.indexOf,
		l = {},
		u = l.toString,
		c = l.hasOwnProperty,
		d = c.toString,
		f = d.call(Object),
		h = {},
		p = function(e) {
			return "function" == typeof e && "number" != typeof e.nodeType && "function" != typeof e.item
		},
		g = function(e) {
			return null != e && e === e.window
		},
		m = e.document,
		v = {
			type: !0,
			src: !0,
			nonce: !0,
			noModule: !0
		};

	function b(e, t, n) {
		var i, r, o = (n = n || m).createElement("script");
		if (o.text = e, t)
			for (i in v)(r = t[i] || t.getAttribute && t.getAttribute(i)) && o.setAttribute(i, r);
		n.head.appendChild(o).parentNode.removeChild(o)
	}

	function y(e) {
		return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? l[u.call(e)] || "object" : typeof e
	}
	var _ = "3.6.3 -ajax,-ajax/jsonp,-ajax/load,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-deprecated/ajax-event-alias,-effects,-effects/Tween,-effects/animatedSelector",
		x = function(e, t) {
			return new x.fn.init(e, t)
		};

	function w(e) {
		var t = !!e && "length" in e && e.length,
			n = y(e);
		return !p(e) && !g(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
	}
	x.fn = x.prototype = {
		jquery: _,
		constructor: x,
		length: 0,
		toArray: function() {
			return r.call(this)
		},
		get: function(e) {
			return null == e ? r.call(this) : e < 0 ? this[e + this.length] : this[e]
		},
		pushStack: function(e) {
			var t = x.merge(this.constructor(), e);
			return t.prevObject = this, t
		},
		each: function(e) {
			return x.each(this, e)
		},
		map: function(e) {
			return this.pushStack(x.map(this, function(t, n) {
				return e.call(t, n, t)
			}))
		},
		slice: function() {
			return this.pushStack(r.apply(this, arguments))
		},
		first: function() {
			return this.eq(0)
		},
		last: function() {
			return this.eq(-1)
		},
		even: function() {
			return this.pushStack(x.grep(this, function(e, t) {
				return (t + 1) % 2
			}))
		},
		odd: function() {
			return this.pushStack(x.grep(this, function(e, t) {
				return t % 2
			}))
		},
		eq: function(e) {
			var t = this.length,
				n = +e + (e < 0 ? t : 0);
			return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
		},
		end: function() {
			return this.prevObject || this.constructor()
		},
		push: a,
		sort: n.sort,
		splice: n.splice
	}, x.extend = x.fn.extend = function() {
		var e, t, n, i, r, o, a = arguments[0] || {},
			s = 1,
			l = arguments.length,
			u = !1;
		for ("boolean" == typeof a && (u = a, a = arguments[s] || {}, s++), "object" == typeof a || p(a) || (a = {}), s === l && (a = this, s--); s < l; s++)
			if (null != (e = arguments[s]))
				for (t in e) i = e[t], "__proto__" !== t && a !== i && (u && i && (x.isPlainObject(i) || (r = Array.isArray(i))) ? (n = a[t], o = r && !Array.isArray(n) ? [] : r || x.isPlainObject(n) ? n : {}, r = !1, a[t] = x.extend(u, o, i)) : void 0 !== i && (a[t] = i));
		return a
	}, x.extend({
		expando: "jQuery" + (_ + Math.random()).replace(/\D/g, ""),
		isReady: !0,
		error: function(e) {
			throw new Error(e)
		},
		noop: function() {},
		isPlainObject: function(e) {
			var t, n;
			return !(!e || "[object Object]" !== u.call(e)) && (!(t = i(e)) || "function" == typeof(n = c.call(t, "constructor") && t.constructor) && d.call(n) === f)
		},
		isEmptyObject: function(e) {
			var t;
			for (t in e) return !1;
			return !0
		},
		globalEval: function(e, t, n) {
			b(e, {
				nonce: t && t.nonce
			}, n)
		},
		each: function(e, t) {
			var n, i = 0;
			if (w(e))
				for (n = e.length; i < n && !1 !== t.call(e[i], i, e[i]); i++);
			else
				for (i in e)
					if (!1 === t.call(e[i], i, e[i])) break;
			return e
		},
		makeArray: function(e, t) {
			var n = t || [];
			return null != e && (w(Object(e)) ? x.merge(n, "string" == typeof e ? [e] : e) : a.call(n, e)), n
		},
		inArray: function(e, t, n) {
			return null == t ? -1 : s.call(t, e, n)
		},
		merge: function(e, t) {
			for (var n = +t.length, i = 0, r = e.length; i < n; i++) e[r++] = t[i];
			return e.length = r, e
		},
		grep: function(e, t, n) {
			for (var i = [], r = 0, o = e.length, a = !n; r < o; r++) !t(e[r], r) !== a && i.push(e[r]);
			return i
		},
		map: function(e, t, n) {
			var i, r, a = 0,
				s = [];
			if (w(e))
				for (i = e.length; a < i; a++) null != (r = t(e[a], a, n)) && s.push(r);
			else
				for (a in e) null != (r = t(e[a], a, n)) && s.push(r);
			return o(s)
		},
		guid: 1,
		support: h
	}), "function" == typeof Symbol && (x.fn[Symbol.iterator] = n[Symbol.iterator]), x.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
		l["[object " + t + "]"] = t.toLowerCase()
	});
	var k = function(e) {
		var t, n, i, r, o, a, s, l, u, c, d, f, h, p, g, m, v, b, y, _ = "sizzle" + 1 * new Date,
			x = e.document,
			w = 0,
			k = 0,
			S = le(),
			C = le(),
			T = le(),
			D = le(),
			M = function(e, t) {
				return e === t && (d = !0), 0
			},
			E = {}.hasOwnProperty,
			A = [],
			P = A.pop,
			O = A.push,
			N = A.push,
			R = A.slice,
			I = function(e, t) {
				for (var n = 0, i = e.length; n < i; n++)
					if (e[n] === t) return n;
				return -1
			},
			L = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
			F = "[\\x20\\t\\r\\n\\f]",
			j = "(?:\\\\[\\da-fA-F]{1,6}" + F + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
			W = "\\[" + F + "*(" + j + ")(?:" + F + "*([*^$|!~]?=)" + F + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + j + "))|)" + F + "*\\]",
			z = ":(" + j + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + W + ")*)|.*)\\)|)",
			V = new RegExp(F + "+", "g"),
			H = new RegExp("^" + F + "+|((?:^|[^\\\\])(?:\\\\.)*)" + F + "+$", "g"),
			B = new RegExp("^" + F + "*," + F + "*"),
			q = new RegExp("^" + F + "*([>+~]|" + F + ")" + F + "*"),
			Y = new RegExp(F + "|>"),
			U = new RegExp(z),
			$ = new RegExp("^" + j + "$"),
			G = {
				ID: new RegExp("^#(" + j + ")"),
				CLASS: new RegExp("^\\.(" + j + ")"),
				TAG: new RegExp("^(" + j + "|[*])"),
				ATTR: new RegExp("^" + W),
				PSEUDO: new RegExp("^" + z),
				CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + F + "*(even|odd|(([+-]|)(\\d*)n|)" + F + "*(?:([+-]|)" + F + "*(\\d+)|))" + F + "*\\)|)", "i"),
				bool: new RegExp("^(?:" + L + ")$", "i"),
				needsContext: new RegExp("^" + F + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + F + "*((?:-\\d)?\\d*)" + F + "*\\)|)(?=[^-]|$)", "i")
			},
			Q = /HTML$/i,
			X = /^(?:input|select|textarea|button)$/i,
			J = /^h\d$/i,
			Z = /^[^{]+\{\s*\[native \w/,
			K = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
			ee = /[+~]/,
			te = new RegExp("\\\\[\\da-fA-F]{1,6}" + F + "?|\\\\([^\\r\\n\\f])", "g"),
			ne = function(e, t) {
				var n = "0x" + e.slice(1) - 65536;
				return t || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320))
			},
			ie = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
			re = function(e, t) {
				return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
			},
			oe = function() {
				f()
			},
			ae = _e(function(e) {
				return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase()
			}, {
				dir: "parentNode",
				next: "legend"
			});
		try {
			N.apply(A = R.call(x.childNodes), x.childNodes), A[x.childNodes.length].nodeType
		} catch (e) {
			N = {
				apply: A.length ? function(e, t) {
					O.apply(e, R.call(t))
				} : function(e, t) {
					for (var n = e.length, i = 0; e[n++] = t[i++];);
					e.length = n - 1
				}
			}
		}

		function se(e, t, i, r) {
			var o, s, u, c, d, p, v, b = t && t.ownerDocument,
				x = t ? t.nodeType : 9;
			if (i = i || [], "string" != typeof e || !e || 1 !== x && 9 !== x && 11 !== x) return i;
			if (!r && (f(t), t = t || h, g)) {
				if (11 !== x && (d = K.exec(e)))
					if (o = d[1]) {
						if (9 === x) {
							if (!(u = t.getElementById(o))) return i;
							if (u.id === o) return i.push(u), i
						} else if (b && (u = b.getElementById(o)) && y(t, u) && u.id === o) return i.push(u), i
					} else {
						if (d[2]) return N.apply(i, t.getElementsByTagName(e)), i;
						if ((o = d[3]) && n.getElementsByClassName && t.getElementsByClassName) return N.apply(i, t.getElementsByClassName(o)), i
					} if (n.qsa && !D[e + " "] && (!m || !m.test(e)) && (1 !== x || "object" !== t.nodeName.toLowerCase())) {
					if (v = e, b = t, 1 === x && (Y.test(e) || q.test(e))) {
						for ((b = ee.test(e) && ve(t.parentNode) || t) === t && n.scope || ((c = t.getAttribute("id")) ? c = c.replace(ie, re) : t.setAttribute("id", c = _)), s = (p = a(e)).length; s--;) p[s] = (c ? "#" + c : ":scope") + " " + ye(p[s]);
						v = p.join(",")
					}
					try {
						if (n.cssSupportsSelector && !CSS.supports("selector(:is(" + v + "))")) throw new Error;
						return N.apply(i, b.querySelectorAll(v)), i
					} catch (t) {
						D(e, !0)
					} finally {
						c === _ && t.removeAttribute("id")
					}
				}
			}
			return l(e.replace(H, "$1"), t, i, r)
		}

		function le() {
			var e = [];
			return function t(n, r) {
				return e.push(n + " ") > i.cacheLength && delete t[e.shift()], t[n + " "] = r
			}
		}

		function ue(e) {
			return e[_] = !0, e
		}

		function ce(e) {
			var t = h.createElement("fieldset");
			try {
				return !!e(t)
			} catch (e) {
				return !1
			} finally {
				t.parentNode && t.parentNode.removeChild(t), t = null
			}
		}

		function de(e, t) {
			for (var n = e.split("|"), r = n.length; r--;) i.attrHandle[n[r]] = t
		}

		function fe(e, t) {
			var n = t && e,
				i = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
			if (i) return i;
			if (n)
				for (; n = n.nextSibling;)
					if (n === t) return -1;
			return e ? 1 : -1
		}

		function he(e) {
			return function(t) {
				return "input" === t.nodeName.toLowerCase() && t.type === e
			}
		}

		function pe(e) {
			return function(t) {
				var n = t.nodeName.toLowerCase();
				return ("input" === n || "button" === n) && t.type === e
			}
		}

		function ge(e) {
			return function(t) {
				return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && ae(t) === e : t.disabled === e : "label" in t && t.disabled === e
			}
		}

		function me(e) {
			return ue(function(t) {
				return t = +t, ue(function(n, i) {
					for (var r, o = e([], n.length, t), a = o.length; a--;) n[r = o[a]] && (n[r] = !(i[r] = n[r]))
				})
			})
		}

		function ve(e) {
			return e && void 0 !== e.getElementsByTagName && e
		}
		for (t in n = se.support = {}, o = se.isXML = function(e) {
				var t = e && e.namespaceURI,
					n = e && (e.ownerDocument || e).documentElement;
				return !Q.test(t || n && n.nodeName || "HTML")
			}, f = se.setDocument = function(e) {
				var t, r, a = e ? e.ownerDocument || e : x;
				return a != h && 9 === a.nodeType && a.documentElement ? (p = (h = a).documentElement, g = !o(h), x != h && (r = h.defaultView) && r.top !== r && (r.addEventListener ? r.addEventListener("unload", oe, !1) : r.attachEvent && r.attachEvent("onunload", oe)), n.scope = ce(function(e) {
					return p.appendChild(e).appendChild(h.createElement("div")), void 0 !== e.querySelectorAll && !e.querySelectorAll(":scope fieldset div").length
				}), n.cssSupportsSelector = ce(function() {
					return CSS.supports("selector(*)") && h.querySelectorAll(":is(:jqfake)") && !CSS.supports("selector(:is(*,:jqfake))")
				}), n.attributes = ce(function(e) {
					return e.className = "i", !e.getAttribute("className")
				}), n.getElementsByTagName = ce(function(e) {
					return e.appendChild(h.createComment("")), !e.getElementsByTagName("*").length
				}), n.getElementsByClassName = Z.test(h.getElementsByClassName), n.getById = ce(function(e) {
					return p.appendChild(e).id = _, !h.getElementsByName || !h.getElementsByName(_).length
				}), n.getById ? (i.filter.ID = function(e) {
					var t = e.replace(te, ne);
					return function(e) {
						return e.getAttribute("id") === t
					}
				}, i.find.ID = function(e, t) {
					if (void 0 !== t.getElementById && g) {
						var n = t.getElementById(e);
						return n ? [n] : []
					}
				}) : (i.filter.ID = function(e) {
					var t = e.replace(te, ne);
					return function(e) {
						var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
						return n && n.value === t
					}
				}, i.find.ID = function(e, t) {
					if (void 0 !== t.getElementById && g) {
						var n, i, r, o = t.getElementById(e);
						if (o) {
							if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
							for (r = t.getElementsByName(e), i = 0; o = r[i++];)
								if ((n = o.getAttributeNode("id")) && n.value === e) return [o]
						}
						return []
					}
				}), i.find.TAG = n.getElementsByTagName ? function(e, t) {
					return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : n.qsa ? t.querySelectorAll(e) : void 0
				} : function(e, t) {
					var n, i = [],
						r = 0,
						o = t.getElementsByTagName(e);
					if ("*" === e) {
						for (; n = o[r++];) 1 === n.nodeType && i.push(n);
						return i
					}
					return o
				}, i.find.CLASS = n.getElementsByClassName && function(e, t) {
					if (void 0 !== t.getElementsByClassName && g) return t.getElementsByClassName(e)
				}, v = [], m = [], (n.qsa = Z.test(h.querySelectorAll)) && (ce(function(e) {
					var t;
					p.appendChild(e).innerHTML = "<a id='" + _ + "'></a><select id='" + _ + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && m.push("[*^$]=" + F + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || m.push("\\[" + F + "*(?:value|" + L + ")"), e.querySelectorAll("[id~=" + _ + "-]").length || m.push("~="), (t = h.createElement("input")).setAttribute("name", ""), e.appendChild(t), e.querySelectorAll("[name='']").length || m.push("\\[" + F + "*name" + F + "*=" + F + "*(?:''|\"\")"), e.querySelectorAll(":checked").length || m.push(":checked"), e.querySelectorAll("a#" + _ + "+*").length || m.push(".#.+[+~]"), e.querySelectorAll("\\\f"), m.push("[\\r\\n\\f]")
				}), ce(function(e) {
					e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
					var t = h.createElement("input");
					t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && m.push("name" + F + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && m.push(":enabled", ":disabled"), p.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && m.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), m.push(",.*:")
				})), (n.matchesSelector = Z.test(b = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.oMatchesSelector || p.msMatchesSelector)) && ce(function(e) {
					n.disconnectedMatch = b.call(e, "*"), b.call(e, "[s!='']:x"), v.push("!=", z)
				}), n.cssSupportsSelector || m.push(":has"), m = m.length && new RegExp(m.join("|")), v = v.length && new RegExp(v.join("|")), t = Z.test(p.compareDocumentPosition), y = t || Z.test(p.contains) ? function(e, t) {
					var n = 9 === e.nodeType && e.documentElement || e,
						i = t && t.parentNode;
					return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
				} : function(e, t) {
					if (t)
						for (; t = t.parentNode;)
							if (t === e) return !0;
					return !1
				}, M = t ? function(e, t) {
					if (e === t) return d = !0, 0;
					var i = !e.compareDocumentPosition - !t.compareDocumentPosition;
					return i || (1 & (i = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !n.sortDetached && t.compareDocumentPosition(e) === i ? e == h || e.ownerDocument == x && y(x, e) ? -1 : t == h || t.ownerDocument == x && y(x, t) ? 1 : c ? I(c, e) - I(c, t) : 0 : 4 & i ? -1 : 1)
				} : function(e, t) {
					if (e === t) return d = !0, 0;
					var n, i = 0,
						r = e.parentNode,
						o = t.parentNode,
						a = [e],
						s = [t];
					if (!r || !o) return e == h ? -1 : t == h ? 1 : r ? -1 : o ? 1 : c ? I(c, e) - I(c, t) : 0;
					if (r === o) return fe(e, t);
					for (n = e; n = n.parentNode;) a.unshift(n);
					for (n = t; n = n.parentNode;) s.unshift(n);
					for (; a[i] === s[i];) i++;
					return i ? fe(a[i], s[i]) : a[i] == x ? -1 : s[i] == x ? 1 : 0
				}, h) : h
			}, se.matches = function(e, t) {
				return se(e, null, null, t)
			}, se.matchesSelector = function(e, t) {
				if (f(e), n.matchesSelector && g && !D[t + " "] && (!v || !v.test(t)) && (!m || !m.test(t))) try {
					var i = b.call(e, t);
					if (i || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
				} catch (e) {
					D(t, !0)
				}
				return se(t, h, null, [e]).length > 0
			}, se.contains = function(e, t) {
				return (e.ownerDocument || e) != h && f(e), y(e, t)
			}, se.attr = function(e, t) {
				(e.ownerDocument || e) != h && f(e);
				var r = i.attrHandle[t.toLowerCase()],
					o = r && E.call(i.attrHandle, t.toLowerCase()) ? r(e, t, !g) : void 0;
				return void 0 !== o ? o : n.attributes || !g ? e.getAttribute(t) : (o = e.getAttributeNode(t)) && o.specified ? o.value : null
			}, se.escape = function(e) {
				return (e + "").replace(ie, re)
			}, se.error = function(e) {
				throw new Error("Syntax error, unrecognized expression: " + e)
			}, se.uniqueSort = function(e) {
				var t, i = [],
					r = 0,
					o = 0;
				if (d = !n.detectDuplicates, c = !n.sortStable && e.slice(0), e.sort(M), d) {
					for (; t = e[o++];) t === e[o] && (r = i.push(o));
					for (; r--;) e.splice(i[r], 1)
				}
				return c = null, e
			}, r = se.getText = function(e) {
				var t, n = "",
					i = 0,
					o = e.nodeType;
				if (o) {
					if (1 === o || 9 === o || 11 === o) {
						if ("string" == typeof e.textContent) return e.textContent;
						for (e = e.firstChild; e; e = e.nextSibling) n += r(e)
					} else if (3 === o || 4 === o) return e.nodeValue
				} else
					for (; t = e[i++];) n += r(t);
				return n
			}, (i = se.selectors = {
				cacheLength: 50,
				createPseudo: ue,
				match: G,
				attrHandle: {},
				find: {},
				relative: {
					">": {
						dir: "parentNode",
						first: !0
					},
					" ": {
						dir: "parentNode"
					},
					"+": {
						dir: "previousSibling",
						first: !0
					},
					"~": {
						dir: "previousSibling"
					}
				},
				preFilter: {
					ATTR: function(e) {
						return e[1] = e[1].replace(te, ne), e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
					},
					CHILD: function(e) {
						return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || se.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && se.error(e[0]), e
					},
					PSEUDO: function(e) {
						var t, n = !e[6] && e[2];
						return G.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && U.test(n) && (t = a(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
					}
				},
				filter: {
					TAG: function(e) {
						var t = e.replace(te, ne).toLowerCase();
						return "*" === e ? function() {
							return !0
						} : function(e) {
							return e.nodeName && e.nodeName.toLowerCase() === t
						}
					},
					CLASS: function(e) {
						var t = S[e + " "];
						return t || (t = new RegExp("(^|" + F + ")" + e + "(" + F + "|$)")) && S(e, function(e) {
							return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
						})
					},
					ATTR: function(e, t, n) {
						return function(i) {
							var r = se.attr(i, e);
							return null == r ? "!=" === t : !t || (r += "", "=" === t ? r === n : "!=" === t ? r !== n : "^=" === t ? n && 0 === r.indexOf(n) : "*=" === t ? n && r.indexOf(n) > -1 : "$=" === t ? n && r.slice(-n.length) === n : "~=" === t ? (" " + r.replace(V, " ") + " ").indexOf(n) > -1 : "|=" === t && (r === n || r.slice(0, n.length + 1) === n + "-"))
						}
					},
					CHILD: function(e, t, n, i, r) {
						var o = "nth" !== e.slice(0, 3),
							a = "last" !== e.slice(-4),
							s = "of-type" === t;
						return 1 === i && 0 === r ? function(e) {
							return !!e.parentNode
						} : function(t, n, l) {
							var u, c, d, f, h, p, g = o !== a ? "nextSibling" : "previousSibling",
								m = t.parentNode,
								v = s && t.nodeName.toLowerCase(),
								b = !l && !s,
								y = !1;
							if (m) {
								if (o) {
									for (; g;) {
										for (f = t; f = f[g];)
											if (s ? f.nodeName.toLowerCase() === v : 1 === f.nodeType) return !1;
										p = g = "only" === e && !p && "nextSibling"
									}
									return !0
								}
								if (p = [a ? m.firstChild : m.lastChild], a && b) {
									for (y = (h = (u = (c = (d = (f = m)[_] || (f[_] = {}))[f.uniqueID] || (d[f.uniqueID] = {}))[e] || [])[0] === w && u[1]) && u[2], f = h && m.childNodes[h]; f = ++h && f && f[g] || (y = h = 0) || p.pop();)
										if (1 === f.nodeType && ++y && f === t) {
											c[e] = [w, h, y];
											break
										}
								} else if (b && (y = h = (u = (c = (d = (f = t)[_] || (f[_] = {}))[f.uniqueID] || (d[f.uniqueID] = {}))[e] || [])[0] === w && u[1]), !1 === y)
									for (;
										(f = ++h && f && f[g] || (y = h = 0) || p.pop()) && ((s ? f.nodeName.toLowerCase() !== v : 1 !== f.nodeType) || !++y || (b && ((c = (d = f[_] || (f[_] = {}))[f.uniqueID] || (d[f.uniqueID] = {}))[e] = [w, y]), f !== t)););
								return (y -= r) === i || y % i == 0 && y / i >= 0
							}
						}
					},
					PSEUDO: function(e, t) {
						var n, r = i.pseudos[e] || i.setFilters[e.toLowerCase()] || se.error("unsupported pseudo: " + e);
						return r[_] ? r(t) : r.length > 1 ? (n = [e, e, "", t], i.setFilters.hasOwnProperty(e.toLowerCase()) ? ue(function(e, n) {
							for (var i, o = r(e, t), a = o.length; a--;) e[i = I(e, o[a])] = !(n[i] = o[a])
						}) : function(e) {
							return r(e, 0, n)
						}) : r
					}
				},
				pseudos: {
					not: ue(function(e) {
						var t = [],
							n = [],
							i = s(e.replace(H, "$1"));
						return i[_] ? ue(function(e, t, n, r) {
							for (var o, a = i(e, null, r, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
						}) : function(e, r, o) {
							return t[0] = e, i(t, null, o, n), t[0] = null, !n.pop()
						}
					}),
					has: ue(function(e) {
						return function(t) {
							return se(e, t).length > 0
						}
					}),
					contains: ue(function(e) {
						return e = e.replace(te, ne),
							function(t) {
								return (t.textContent || r(t)).indexOf(e) > -1
							}
					}),
					lang: ue(function(e) {
						return $.test(e || "") || se.error("unsupported lang: " + e), e = e.replace(te, ne).toLowerCase(),
							function(t) {
								var n;
								do {
									if (n = g ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
								} while ((t = t.parentNode) && 1 === t.nodeType);
								return !1
							}
					}),
					target: function(t) {
						var n = e.location && e.location.hash;
						return n && n.slice(1) === t.id
					},
					root: function(e) {
						return e === p
					},
					focus: function(e) {
						return e === h.activeElement && (!h.hasFocus || h.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
					},
					enabled: ge(!1),
					disabled: ge(!0),
					checked: function(e) {
						var t = e.nodeName.toLowerCase();
						return "input" === t && !!e.checked || "option" === t && !!e.selected
					},
					selected: function(e) {
						return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
					},
					empty: function(e) {
						for (e = e.firstChild; e; e = e.nextSibling)
							if (e.nodeType < 6) return !1;
						return !0
					},
					parent: function(e) {
						return !i.pseudos.empty(e)
					},
					header: function(e) {
						return J.test(e.nodeName)
					},
					input: function(e) {
						return X.test(e.nodeName)
					},
					button: function(e) {
						var t = e.nodeName.toLowerCase();
						return "input" === t && "button" === e.type || "button" === t
					},
					text: function(e) {
						var t;
						return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
					},
					first: me(function() {
						return [0]
					}),
					last: me(function(e, t) {
						return [t - 1]
					}),
					eq: me(function(e, t, n) {
						return [n < 0 ? n + t : n]
					}),
					even: me(function(e, t) {
						for (var n = 0; n < t; n += 2) e.push(n);
						return e
					}),
					odd: me(function(e, t) {
						for (var n = 1; n < t; n += 2) e.push(n);
						return e
					}),
					lt: me(function(e, t, n) {
						for (var i = n < 0 ? n + t : n > t ? t : n; --i >= 0;) e.push(i);
						return e
					}),
					gt: me(function(e, t, n) {
						for (var i = n < 0 ? n + t : n; ++i < t;) e.push(i);
						return e
					})
				}
			}).pseudos.nth = i.pseudos.eq, {
				radio: !0,
				checkbox: !0,
				file: !0,
				password: !0,
				image: !0
			}) i.pseudos[t] = he(t);
		for (t in {
				submit: !0,
				reset: !0
			}) i.pseudos[t] = pe(t);

		function be() {}

		function ye(e) {
			for (var t = 0, n = e.length, i = ""; t < n; t++) i += e[t].value;
			return i
		}

		function _e(e, t, n) {
			var i = t.dir,
				r = t.next,
				o = r || i,
				a = n && "parentNode" === o,
				s = k++;
			return t.first ? function(t, n, r) {
				for (; t = t[i];)
					if (1 === t.nodeType || a) return e(t, n, r);
				return !1
			} : function(t, n, l) {
				var u, c, d, f = [w, s];
				if (l) {
					for (; t = t[i];)
						if ((1 === t.nodeType || a) && e(t, n, l)) return !0
				} else
					for (; t = t[i];)
						if (1 === t.nodeType || a)
							if (c = (d = t[_] || (t[_] = {}))[t.uniqueID] || (d[t.uniqueID] = {}), r && r === t.nodeName.toLowerCase()) t = t[i] || t;
							else {
								if ((u = c[o]) && u[0] === w && u[1] === s) return f[2] = u[2];
								if (c[o] = f, f[2] = e(t, n, l)) return !0
							} return !1
			}
		}

		function xe(e) {
			return e.length > 1 ? function(t, n, i) {
				for (var r = e.length; r--;)
					if (!e[r](t, n, i)) return !1;
				return !0
			} : e[0]
		}

		function we(e, t, n, i, r) {
			for (var o, a = [], s = 0, l = e.length, u = null != t; s < l; s++)(o = e[s]) && (n && !n(o, i, r) || (a.push(o), u && t.push(s)));
			return a
		}

		function ke(e, t, n, i, r, o) {
			return i && !i[_] && (i = ke(i)), r && !r[_] && (r = ke(r, o)), ue(function(o, a, s, l) {
				var u, c, d, f = [],
					h = [],
					p = a.length,
					g = o || function(e, t, n) {
						for (var i = 0, r = t.length; i < r; i++) se(e, t[i], n);
						return n
					}(t || "*", s.nodeType ? [s] : s, []),
					m = !e || !o && t ? g : we(g, f, e, s, l),
					v = n ? r || (o ? e : p || i) ? [] : a : m;
				if (n && n(m, v, s, l), i)
					for (u = we(v, h), i(u, [], s, l), c = u.length; c--;)(d = u[c]) && (v[h[c]] = !(m[h[c]] = d));
				if (o) {
					if (r || e) {
						if (r) {
							for (u = [], c = v.length; c--;)(d = v[c]) && u.push(m[c] = d);
							r(null, v = [], u, l)
						}
						for (c = v.length; c--;)(d = v[c]) && (u = r ? I(o, d) : f[c]) > -1 && (o[u] = !(a[u] = d))
					}
				} else v = we(v === a ? v.splice(p, v.length) : v), r ? r(null, a, v, l) : N.apply(a, v)
			})
		}

		function Se(e) {
			for (var t, n, r, o = e.length, a = i.relative[e[0].type], s = a || i.relative[" "], l = a ? 1 : 0, c = _e(function(e) {
					return e === t
				}, s, !0), d = _e(function(e) {
					return I(t, e) > -1
				}, s, !0), f = [function(e, n, i) {
					var r = !a && (i || n !== u) || ((t = n).nodeType ? c(e, n, i) : d(e, n, i));
					return t = null, r
				}]; l < o; l++)
				if (n = i.relative[e[l].type]) f = [_e(xe(f), n)];
				else {
					if ((n = i.filter[e[l].type].apply(null, e[l].matches))[_]) {
						for (r = ++l; r < o && !i.relative[e[r].type]; r++);
						return ke(l > 1 && xe(f), l > 1 && ye(e.slice(0, l - 1).concat({
							value: " " === e[l - 2].type ? "*" : ""
						})).replace(H, "$1"), n, l < r && Se(e.slice(l, r)), r < o && Se(e = e.slice(r)), r < o && ye(e))
					}
					f.push(n)
				} return xe(f)
		}
		return be.prototype = i.filters = i.pseudos, i.setFilters = new be, a = se.tokenize = function(e, t) {
			var n, r, o, a, s, l, u, c = C[e + " "];
			if (c) return t ? 0 : c.slice(0);
			for (s = e, l = [], u = i.preFilter; s;) {
				for (a in n && !(r = B.exec(s)) || (r && (s = s.slice(r[0].length) || s), l.push(o = [])), n = !1, (r = q.exec(s)) && (n = r.shift(), o.push({
						value: n,
						type: r[0].replace(H, " ")
					}), s = s.slice(n.length)), i.filter) !(r = G[a].exec(s)) || u[a] && !(r = u[a](r)) || (n = r.shift(), o.push({
					value: n,
					type: a,
					matches: r
				}), s = s.slice(n.length));
				if (!n) break
			}
			return t ? s.length : s ? se.error(e) : C(e, l).slice(0)
		}, s = se.compile = function(e, t) {
			var n, r = [],
				o = [],
				s = T[e + " "];
			if (!s) {
				for (t || (t = a(e)), n = t.length; n--;)(s = Se(t[n]))[_] ? r.push(s) : o.push(s);
				(s = T(e, function(e, t) {
					var n = t.length > 0,
						r = e.length > 0,
						o = function(o, a, s, l, c) {
							var d, p, m, v = 0,
								b = "0",
								y = o && [],
								_ = [],
								x = u,
								k = o || r && i.find.TAG("*", c),
								S = w += null == x ? 1 : Math.random() || .1,
								C = k.length;
							for (c && (u = a == h || a || c); b !== C && null != (d = k[b]); b++) {
								if (r && d) {
									for (p = 0, a || d.ownerDocument == h || (f(d), s = !g); m = e[p++];)
										if (m(d, a || h, s)) {
											l.push(d);
											break
										} c && (w = S)
								}
								n && ((d = !m && d) && v--, o && y.push(d))
							}
							if (v += b, n && b !== v) {
								for (p = 0; m = t[p++];) m(y, _, a, s);
								if (o) {
									if (v > 0)
										for (; b--;) y[b] || _[b] || (_[b] = P.call(l));
									_ = we(_)
								}
								N.apply(l, _), c && !o && _.length > 0 && v + t.length > 1 && se.uniqueSort(l)
							}
							return c && (w = S, u = x), y
						};
					return n ? ue(o) : o
				}(o, r))).selector = e
			}
			return s
		}, l = se.select = function(e, t, n, r) {
			var o, l, u, c, d, f = "function" == typeof e && e,
				h = !r && a(e = f.selector || e);
			if (n = n || [], 1 === h.length) {
				if ((l = h[0] = h[0].slice(0)).length > 2 && "ID" === (u = l[0]).type && 9 === t.nodeType && g && i.relative[l[1].type]) {
					if (!(t = (i.find.ID(u.matches[0].replace(te, ne), t) || [])[0])) return n;
					f && (t = t.parentNode), e = e.slice(l.shift().value.length)
				}
				for (o = G.needsContext.test(e) ? 0 : l.length; o-- && (u = l[o], !i.relative[c = u.type]);)
					if ((d = i.find[c]) && (r = d(u.matches[0].replace(te, ne), ee.test(l[0].type) && ve(t.parentNode) || t))) {
						if (l.splice(o, 1), !(e = r.length && ye(l))) return N.apply(n, r), n;
						break
					}
			}
			return (f || s(e, h))(r, t, !g, n, !t || ee.test(e) && ve(t.parentNode) || t), n
		}, n.sortStable = _.split("").sort(M).join("") === _, n.detectDuplicates = !!d, f(), n.sortDetached = ce(function(e) {
			return 1 & e.compareDocumentPosition(h.createElement("fieldset"))
		}), ce(function(e) {
			return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
		}) || de("type|href|height|width", function(e, t, n) {
			if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
		}), n.attributes && ce(function(e) {
			return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
		}) || de("value", function(e, t, n) {
			if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
		}), ce(function(e) {
			return null == e.getAttribute("disabled")
		}) || de(L, function(e, t, n) {
			var i;
			if (!n) return !0 === e[t] ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
		}), se
	}(e);
	x.find = k, x.expr = k.selectors, x.expr[":"] = x.expr.pseudos, x.uniqueSort = x.unique = k.uniqueSort, x.text = k.getText, x.isXMLDoc = k.isXML, x.contains = k.contains, x.escapeSelector = k.escape;
	var S = function(e, t, n) {
			for (var i = [], r = void 0 !== n;
				(e = e[t]) && 9 !== e.nodeType;)
				if (1 === e.nodeType) {
					if (r && x(e).is(n)) break;
					i.push(e)
				} return i
		},
		C = function(e, t) {
			for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
			return n
		},
		T = x.expr.match.needsContext;

	function D(e, t) {
		return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
	}
	var M = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

	function E(e, t, n) {
		return p(t) ? x.grep(e, function(e, i) {
			return !!t.call(e, i, e) !== n
		}) : t.nodeType ? x.grep(e, function(e) {
			return e === t !== n
		}) : "string" != typeof t ? x.grep(e, function(e) {
			return s.call(t, e) > -1 !== n
		}) : x.filter(t, e, n)
	}
	x.filter = function(e, t, n) {
		var i = t[0];
		return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? x.find.matchesSelector(i, e) ? [i] : [] : x.find.matches(e, x.grep(t, function(e) {
			return 1 === e.nodeType
		}))
	}, x.fn.extend({
		find: function(e) {
			var t, n, i = this.length,
				r = this;
			if ("string" != typeof e) return this.pushStack(x(e).filter(function() {
				for (t = 0; t < i; t++)
					if (x.contains(r[t], this)) return !0
			}));
			for (n = this.pushStack([]), t = 0; t < i; t++) x.find(e, r[t], n);
			return i > 1 ? x.uniqueSort(n) : n
		},
		filter: function(e) {
			return this.pushStack(E(this, e || [], !1))
		},
		not: function(e) {
			return this.pushStack(E(this, e || [], !0))
		},
		is: function(e) {
			return !!E(this, "string" == typeof e && T.test(e) ? x(e) : e || [], !1).length
		}
	});
	var A, P = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
	(x.fn.init = function(e, t, n) {
		var i, r;
		if (!e) return this;
		if (n = n || A, "string" == typeof e) {
			if (!(i = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : P.exec(e)) || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
			if (i[1]) {
				if (t = t instanceof x ? t[0] : t, x.merge(this, x.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : m, !0)), M.test(i[1]) && x.isPlainObject(t))
					for (i in t) p(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
				return this
			}
			return (r = m.getElementById(i[2])) && (this[0] = r, this.length = 1), this
		}
		return e.nodeType ? (this[0] = e, this.length = 1, this) : p(e) ? void 0 !== n.ready ? n.ready(e) : e(x) : x.makeArray(e, this)
	}).prototype = x.fn, A = x(m);
	var O = /^(?:parents|prev(?:Until|All))/,
		N = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
		};

	function R(e, t) {
		for (;
			(e = e[t]) && 1 !== e.nodeType;);
		return e
	}
	x.fn.extend({
		has: function(e) {
			var t = x(e, this),
				n = t.length;
			return this.filter(function() {
				for (var e = 0; e < n; e++)
					if (x.contains(this, t[e])) return !0
			})
		},
		closest: function(e, t) {
			var n, i = 0,
				r = this.length,
				o = [],
				a = "string" != typeof e && x(e);
			if (!T.test(e))
				for (; i < r; i++)
					for (n = this[i]; n && n !== t; n = n.parentNode)
						if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && x.find.matchesSelector(n, e))) {
							o.push(n);
							break
						} return this.pushStack(o.length > 1 ? x.uniqueSort(o) : o)
		},
		index: function(e) {
			return e ? "string" == typeof e ? s.call(x(e), this[0]) : s.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
		},
		add: function(e, t) {
			return this.pushStack(x.uniqueSort(x.merge(this.get(), x(e, t))))
		},
		addBack: function(e) {
			return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
		}
	}), x.each({
		parent: function(e) {
			var t = e.parentNode;
			return t && 11 !== t.nodeType ? t : null
		},
		parents: function(e) {
			return S(e, "parentNode")
		},
		parentsUntil: function(e, t, n) {
			return S(e, "parentNode", n)
		},
		next: function(e) {
			return R(e, "nextSibling")
		},
		prev: function(e) {
			return R(e, "previousSibling")
		},
		nextAll: function(e) {
			return S(e, "nextSibling")
		},
		prevAll: function(e) {
			return S(e, "previousSibling")
		},
		nextUntil: function(e, t, n) {
			return S(e, "nextSibling", n)
		},
		prevUntil: function(e, t, n) {
			return S(e, "previousSibling", n)
		},
		siblings: function(e) {
			return C((e.parentNode || {}).firstChild, e)
		},
		children: function(e) {
			return C(e.firstChild)
		},
		contents: function(e) {
			return null != e.contentDocument && i(e.contentDocument) ? e.contentDocument : (D(e, "template") && (e = e.content || e), x.merge([], e.childNodes))
		}
	}, function(e, t) {
		x.fn[e] = function(n, i) {
			var r = x.map(this, t, n);
			return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (r = x.filter(i, r)), this.length > 1 && (N[e] || x.uniqueSort(r), O.test(e) && r.reverse()), this.pushStack(r)
		}
	});
	var I = /[^\x20\t\r\n\f]+/g;

	function L(e) {
		return e
	}

	function F(e) {
		throw e
	}

	function j(e, t, n, i) {
		var r;
		try {
			e && p(r = e.promise) ? r.call(e).done(t).fail(n) : e && p(r = e.then) ? r.call(e, t, n) : t.apply(void 0, [e].slice(i))
		} catch (e) {
			n.apply(void 0, [e])
		}
	}
	x.Callbacks = function(e) {
		e = "string" == typeof e ? function(e) {
			var t = {};
			return x.each(e.match(I) || [], function(e, n) {
				t[n] = !0
			}), t
		}(e) : x.extend({}, e);
		var t, n, i, r, o = [],
			a = [],
			s = -1,
			l = function() {
				for (r = r || e.once, i = t = !0; a.length; s = -1)
					for (n = a.shift(); ++s < o.length;) !1 === o[s].apply(n[0], n[1]) && e.stopOnFalse && (s = o.length, n = !1);
				e.memory || (n = !1), t = !1, r && (o = n ? [] : "")
			},
			u = {
				add: function() {
					return o && (n && !t && (s = o.length - 1, a.push(n)), function t(n) {
						x.each(n, function(n, i) {
							p(i) ? e.unique && u.has(i) || o.push(i) : i && i.length && "string" !== y(i) && t(i)
						})
					}(arguments), n && !t && l()), this
				},
				remove: function() {
					return x.each(arguments, function(e, t) {
						for (var n;
							(n = x.inArray(t, o, n)) > -1;) o.splice(n, 1), n <= s && s--
					}), this
				},
				has: function(e) {
					return e ? x.inArray(e, o) > -1 : o.length > 0
				},
				empty: function() {
					return o && (o = []), this
				},
				disable: function() {
					return r = a = [], o = n = "", this
				},
				disabled: function() {
					return !o
				},
				lock: function() {
					return r = a = [], n || t || (o = n = ""), this
				},
				locked: function() {
					return !!r
				},
				fireWith: function(e, n) {
					return r || (n = [e, (n = n || []).slice ? n.slice() : n], a.push(n), t || l()), this
				},
				fire: function() {
					return u.fireWith(this, arguments), this
				},
				fired: function() {
					return !!i
				}
			};
		return u
	}, x.extend({
		Deferred: function(t) {
			var n = [
					["notify", "progress", x.Callbacks("memory"), x.Callbacks("memory"), 2],
					["resolve", "done", x.Callbacks("once memory"), x.Callbacks("once memory"), 0, "resolved"],
					["reject", "fail", x.Callbacks("once memory"), x.Callbacks("once memory"), 1, "rejected"]
				],
				i = "pending",
				r = {
					state: function() {
						return i
					},
					always: function() {
						return o.done(arguments).fail(arguments), this
					},
					catch: function(e) {
						return r.then(null, e)
					},
					pipe: function() {
						var e = arguments;
						return x.Deferred(function(t) {
							x.each(n, function(n, i) {
								var r = p(e[i[4]]) && e[i[4]];
								o[i[1]](function() {
									var e = r && r.apply(this, arguments);
									e && p(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[i[0] + "With"](this, r ? [e] : arguments)
								})
							}), e = null
						}).promise()
					},
					then: function(t, i, r) {
						var o = 0;

						function a(t, n, i, r) {
							return function() {
								var s = this,
									l = arguments,
									u = function() {
										var e, u;
										if (!(t < o)) {
											if ((e = i.apply(s, l)) === n.promise()) throw new TypeError("Thenable self-resolution");
											u = e && ("object" == typeof e || "function" == typeof e) && e.then, p(u) ? r ? u.call(e, a(o, n, L, r), a(o, n, F, r)) : (o++, u.call(e, a(o, n, L, r), a(o, n, F, r), a(o, n, L, n.notifyWith))) : (i !== L && (s = void 0, l = [e]), (r || n.resolveWith)(s, l))
										}
									},
									c = r ? u : function() {
										try {
											u()
										} catch (e) {
											x.Deferred.exceptionHook && x.Deferred.exceptionHook(e, c.stackTrace), t + 1 >= o && (i !== F && (s = void 0, l = [e]), n.rejectWith(s, l))
										}
									};
								t ? c() : (x.Deferred.getStackHook && (c.stackTrace = x.Deferred.getStackHook()), e.setTimeout(c))
							}
						}
						return x.Deferred(function(e) {
							n[0][3].add(a(0, e, p(r) ? r : L, e.notifyWith)), n[1][3].add(a(0, e, p(t) ? t : L)), n[2][3].add(a(0, e, p(i) ? i : F))
						}).promise()
					},
					promise: function(e) {
						return null != e ? x.extend(e, r) : r
					}
				},
				o = {};
			return x.each(n, function(e, t) {
				var a = t[2],
					s = t[5];
				r[t[1]] = a.add, s && a.add(function() {
					i = s
				}, n[3 - e][2].disable, n[3 - e][3].disable, n[0][2].lock, n[0][3].lock), a.add(t[3].fire), o[t[0]] = function() {
					return o[t[0] + "With"](this === o ? void 0 : this, arguments), this
				}, o[t[0] + "With"] = a.fireWith
			}), r.promise(o), t && t.call(o, o), o
		},
		when: function(e) {
			var t = arguments.length,
				n = t,
				i = Array(n),
				o = r.call(arguments),
				a = x.Deferred(),
				s = function(e) {
					return function(n) {
						i[e] = this, o[e] = arguments.length > 1 ? r.call(arguments) : n, --t || a.resolveWith(i, o)
					}
				};
			if (t <= 1 && (j(e, a.done(s(n)).resolve, a.reject, !t), "pending" === a.state() || p(o[n] && o[n].then))) return a.then();
			for (; n--;) j(o[n], s(n), a.reject);
			return a.promise()
		}
	});
	var W = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
	x.Deferred.exceptionHook = function(t, n) {
		e.console && e.console.warn && t && W.test(t.name) && e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n)
	}, x.readyException = function(t) {
		e.setTimeout(function() {
			throw t
		})
	};
	var z = x.Deferred();

	function V() {
		m.removeEventListener("DOMContentLoaded", V), e.removeEventListener("load", V), x.ready()
	}
	x.fn.ready = function(e) {
		return z.then(e).catch(function(e) {
			x.readyException(e)
		}), this
	}, x.extend({
		isReady: !1,
		readyWait: 1,
		ready: function(e) {
			(!0 === e ? --x.readyWait : x.isReady) || (x.isReady = !0, !0 !== e && --x.readyWait > 0 || z.resolveWith(m, [x]))
		}
	}), x.ready.then = z.then, "complete" === m.readyState || "loading" !== m.readyState && !m.documentElement.doScroll ? e.setTimeout(x.ready) : (m.addEventListener("DOMContentLoaded", V), e.addEventListener("load", V));
	var H = function(e, t, n, i, r, o, a) {
			var s = 0,
				l = e.length,
				u = null == n;
			if ("object" === y(n))
				for (s in r = !0, n) H(e, t, s, n[s], !0, o, a);
			else if (void 0 !== i && (r = !0, p(i) || (a = !0), u && (a ? (t.call(e, i), t = null) : (u = t, t = function(e, t, n) {
					return u.call(x(e), n)
				})), t))
				for (; s < l; s++) t(e[s], n, a ? i : i.call(e[s], s, t(e[s], n)));
			return r ? e : u ? t.call(e) : l ? t(e[0], n) : o
		},
		B = /^-ms-/,
		q = /-([a-z])/g;

	function Y(e, t) {
		return t.toUpperCase()
	}

	function U(e) {
		return e.replace(B, "ms-").replace(q, Y)
	}
	var $ = function(e) {
		return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
	};

	function G() {
		this.expando = x.expando + G.uid++
	}
	G.uid = 1, G.prototype = {
		cache: function(e) {
			var t = e[this.expando];
			return t || (t = {}, $(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
				value: t,
				configurable: !0
			}))), t
		},
		set: function(e, t, n) {
			var i, r = this.cache(e);
			if ("string" == typeof t) r[U(t)] = n;
			else
				for (i in t) r[U(i)] = t[i];
			return r
		},
		get: function(e, t) {
			return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][U(t)]
		},
		access: function(e, t, n) {
			return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
		},
		remove: function(e, t) {
			var n, i = e[this.expando];
			if (void 0 !== i) {
				if (void 0 !== t) {
					n = (t = Array.isArray(t) ? t.map(U) : (t = U(t)) in i ? [t] : t.match(I) || []).length;
					for (; n--;) delete i[t[n]]
				}(void 0 === t || x.isEmptyObject(i)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
			}
		},
		hasData: function(e) {
			var t = e[this.expando];
			return void 0 !== t && !x.isEmptyObject(t)
		}
	};
	var Q = new G,
		X = new G,
		J = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		Z = /[A-Z]/g;

	function K(e, t, n) {
		var i;
		if (void 0 === n && 1 === e.nodeType)
			if (i = "data-" + t.replace(Z, "-$&").toLowerCase(), "string" == typeof(n = e.getAttribute(i))) {
				try {
					n = function(e) {
						return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : J.test(e) ? JSON.parse(e) : e)
					}(n)
				} catch (e) {}
				X.set(e, t, n)
			} else n = void 0;
		return n
	}
	x.extend({
		hasData: function(e) {
			return X.hasData(e) || Q.hasData(e)
		},
		data: function(e, t, n) {
			return X.access(e, t, n)
		},
		removeData: function(e, t) {
			X.remove(e, t)
		},
		_data: function(e, t, n) {
			return Q.access(e, t, n)
		},
		_removeData: function(e, t) {
			Q.remove(e, t)
		}
	}), x.fn.extend({
		data: function(e, t) {
			var n, i, r, o = this[0],
				a = o && o.attributes;
			if (void 0 === e) {
				if (this.length && (r = X.get(o), 1 === o.nodeType && !Q.get(o, "hasDataAttrs"))) {
					for (n = a.length; n--;) a[n] && 0 === (i = a[n].name).indexOf("data-") && (i = U(i.slice(5)), K(o, i, r[i]));
					Q.set(o, "hasDataAttrs", !0)
				}
				return r
			}
			return "object" == typeof e ? this.each(function() {
				X.set(this, e)
			}) : H(this, function(t) {
				var n;
				if (o && void 0 === t) return void 0 !== (n = X.get(o, e)) ? n : void 0 !== (n = K(o, e)) ? n : void 0;
				this.each(function() {
					X.set(this, e, t)
				})
			}, null, t, arguments.length > 1, null, !0)
		},
		removeData: function(e) {
			return this.each(function() {
				X.remove(this, e)
			})
		}
	}), x.extend({
		queue: function(e, t, n) {
			var i;
			if (e) return t = (t || "fx") + "queue", i = Q.get(e, t), n && (!i || Array.isArray(n) ? i = Q.access(e, t, x.makeArray(n)) : i.push(n)), i || []
		},
		dequeue: function(e, t) {
			t = t || "fx";
			var n = x.queue(e, t),
				i = n.length,
				r = n.shift(),
				o = x._queueHooks(e, t);
			"inprogress" === r && (r = n.shift(), i--), r && ("fx" === t && n.unshift("inprogress"), delete o.stop, r.call(e, function() {
				x.dequeue(e, t)
			}, o)), !i && o && o.empty.fire()
		},
		_queueHooks: function(e, t) {
			var n = t + "queueHooks";
			return Q.get(e, n) || Q.access(e, n, {
				empty: x.Callbacks("once memory").add(function() {
					Q.remove(e, [t + "queue", n])
				})
			})
		}
	}), x.fn.extend({
		queue: function(e, t) {
			var n = 2;
			return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? x.queue(this[0], e) : void 0 === t ? this : this.each(function() {
				var n = x.queue(this, e, t);
				x._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && x.dequeue(this, e)
			})
		},
		dequeue: function(e) {
			return this.each(function() {
				x.dequeue(this, e)
			})
		},
		clearQueue: function(e) {
			return this.queue(e || "fx", [])
		},
		promise: function(e, t) {
			var n, i = 1,
				r = x.Deferred(),
				o = this,
				a = this.length,
				s = function() {
					--i || r.resolveWith(o, [o])
				};
			for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;)(n = Q.get(o[a], e + "queueHooks")) && n.empty && (i++, n.empty.add(s));
			return s(), r.promise(t)
		}
	});
	var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
		te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$", "i"),
		ne = ["Top", "Right", "Bottom", "Left"],
		ie = m.documentElement,
		re = function(e) {
			return x.contains(e.ownerDocument, e)
		},
		oe = {
			composed: !0
		};
	ie.getRootNode && (re = function(e) {
		return x.contains(e.ownerDocument, e) || e.getRootNode(oe) === e.ownerDocument
	});
	var ae = function(e, t) {
		return "none" === (e = t || e).style.display || "" === e.style.display && re(e) && "none" === x.css(e, "display")
	};
	var se = {};

	function le(e) {
		var t, n = e.ownerDocument,
			i = e.nodeName,
			r = se[i];
		return r || (t = n.body.appendChild(n.createElement(i)), r = x.css(t, "display"), t.parentNode.removeChild(t), "none" === r && (r = "block"), se[i] = r, r)
	}

	function ue(e, t) {
		for (var n, i, r = [], o = 0, a = e.length; o < a; o++)(i = e[o]).style && (n = i.style.display, t ? ("none" === n && (r[o] = Q.get(i, "display") || null, r[o] || (i.style.display = "")), "" === i.style.display && ae(i) && (r[o] = le(i))) : "none" !== n && (r[o] = "none", Q.set(i, "display", n)));
		for (o = 0; o < a; o++) null != r[o] && (e[o].style.display = r[o]);
		return e
	}
	x.fn.extend({
		show: function() {
			return ue(this, !0)
		},
		hide: function() {
			return ue(this)
		},
		toggle: function(e) {
			return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
				ae(this) ? x(this).show() : x(this).hide()
			})
		}
	});
	var ce, de, fe = /^(?:checkbox|radio)$/i,
		he = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
		pe = /^$|^module$|\/(?:java|ecma)script/i;
	ce = m.createDocumentFragment().appendChild(m.createElement("div")), (de = m.createElement("input")).setAttribute("type", "radio"), de.setAttribute("checked", "checked"), de.setAttribute("name", "t"), ce.appendChild(de), h.checkClone = ce.cloneNode(!0).cloneNode(!0).lastChild.checked, ce.innerHTML = "<textarea>x</textarea>", h.noCloneChecked = !!ce.cloneNode(!0).lastChild.defaultValue, ce.innerHTML = "<option></option>", h.option = !!ce.lastChild;
	var ge = {
		thead: [1, "<table>", "</table>"],
		col: [2, "<table><colgroup>", "</colgroup></table>"],
		tr: [2, "<table><tbody>", "</tbody></table>"],
		td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
		_default: [0, "", ""]
	};

	function me(e, t) {
		var n;
		return n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && D(e, t) ? x.merge([e], n) : n
	}

	function ve(e, t) {
		for (var n = 0, i = e.length; n < i; n++) Q.set(e[n], "globalEval", !t || Q.get(t[n], "globalEval"))
	}
	ge.tbody = ge.tfoot = ge.colgroup = ge.caption = ge.thead, ge.th = ge.td, h.option || (ge.optgroup = ge.option = [1, "<select multiple='multiple'>", "</select>"]);
	var be = /<|&#?\w+;/;

	function ye(e, t, n, i, r) {
		for (var o, a, s, l, u, c, d = t.createDocumentFragment(), f = [], h = 0, p = e.length; h < p; h++)
			if ((o = e[h]) || 0 === o)
				if ("object" === y(o)) x.merge(f, o.nodeType ? [o] : o);
				else if (be.test(o)) {
			for (a = a || d.appendChild(t.createElement("div")), s = (he.exec(o) || ["", ""])[1].toLowerCase(), l = ge[s] || ge._default, a.innerHTML = l[1] + x.htmlPrefilter(o) + l[2], c = l[0]; c--;) a = a.lastChild;
			x.merge(f, a.childNodes), (a = d.firstChild).textContent = ""
		} else f.push(t.createTextNode(o));
		for (d.textContent = "", h = 0; o = f[h++];)
			if (i && x.inArray(o, i) > -1) r && r.push(o);
			else if (u = re(o), a = me(d.appendChild(o), "script"), u && ve(a), n)
			for (c = 0; o = a[c++];) pe.test(o.type || "") && n.push(o);
		return d
	}
	var _e = /^([^.]*)(?:\.(.+)|)/;

	function xe() {
		return !0
	}

	function we() {
		return !1
	}

	function ke(e, t) {
		return e === function() {
			try {
				return m.activeElement
			} catch (e) {}
		}() == ("focus" === t)
	}

	function Se(e, t, n, i, r, o) {
		var a, s;
		if ("object" == typeof t) {
			for (s in "string" != typeof n && (i = i || n, n = void 0), t) Se(e, s, n, i, t[s], o);
			return e
		}
		if (null == i && null == r ? (r = n, i = n = void 0) : null == r && ("string" == typeof n ? (r = i, i = void 0) : (r = i, i = n, n = void 0)), !1 === r) r = we;
		else if (!r) return e;
		return 1 === o && (a = r, (r = function(e) {
			return x().off(e), a.apply(this, arguments)
		}).guid = a.guid || (a.guid = x.guid++)), e.each(function() {
			x.event.add(this, t, r, i, n)
		})
	}

	function Ce(e, t, n) {
		n ? (Q.set(e, t, !1), x.event.add(e, t, {
			namespace: !1,
			handler: function(e) {
				var i, o, a = Q.get(this, t);
				if (1 & e.isTrigger && this[t]) {
					if (a.length)(x.event.special[t] || {}).delegateType && e.stopPropagation();
					else if (a = r.call(arguments), Q.set(this, t, a), i = n(this, t), this[t](), a !== (o = Q.get(this, t)) || i ? Q.set(this, t, !1) : o = {}, a !== o) return e.stopImmediatePropagation(), e.preventDefault(), o && o.value
				} else a.length && (Q.set(this, t, {
					value: x.event.trigger(x.extend(a[0], x.Event.prototype), a.slice(1), this)
				}), e.stopImmediatePropagation())
			}
		})) : void 0 === Q.get(e, t) && x.event.add(e, t, xe)
	}
	x.event = {
		global: {},
		add: function(e, t, n, i, r) {
			var o, a, s, l, u, c, d, f, h, p, g, m = Q.get(e);
			if ($(e))
				for (n.handler && (n = (o = n).handler, r = o.selector), r && x.find.matchesSelector(ie, r), n.guid || (n.guid = x.guid++), (l = m.events) || (l = m.events = Object.create(null)), (a = m.handle) || (a = m.handle = function(t) {
						return void 0 !== x && x.event.triggered !== t.type ? x.event.dispatch.apply(e, arguments) : void 0
					}), u = (t = (t || "").match(I) || [""]).length; u--;) h = g = (s = _e.exec(t[u]) || [])[1], p = (s[2] || "").split(".").sort(), h && (d = x.event.special[h] || {}, h = (r ? d.delegateType : d.bindType) || h, d = x.event.special[h] || {}, c = x.extend({
					type: h,
					origType: g,
					data: i,
					handler: n,
					guid: n.guid,
					selector: r,
					needsContext: r && x.expr.match.needsContext.test(r),
					namespace: p.join(".")
				}, o), (f = l[h]) || ((f = l[h] = []).delegateCount = 0, d.setup && !1 !== d.setup.call(e, i, p, a) || e.addEventListener && e.addEventListener(h, a)), d.add && (d.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), r ? f.splice(f.delegateCount++, 0, c) : f.push(c), x.event.global[h] = !0)
		},
		remove: function(e, t, n, i, r) {
			var o, a, s, l, u, c, d, f, h, p, g, m = Q.hasData(e) && Q.get(e);
			if (m && (l = m.events)) {
				for (u = (t = (t || "").match(I) || [""]).length; u--;)
					if (h = g = (s = _e.exec(t[u]) || [])[1], p = (s[2] || "").split(".").sort(), h) {
						for (d = x.event.special[h] || {}, f = l[h = (i ? d.delegateType : d.bindType) || h] || [], s = s[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = f.length; o--;) c = f[o], !r && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || i && i !== c.selector && ("**" !== i || !c.selector) || (f.splice(o, 1), c.selector && f.delegateCount--, d.remove && d.remove.call(e, c));
						a && !f.length && (d.teardown && !1 !== d.teardown.call(e, p, m.handle) || x.removeEvent(e, h, m.handle), delete l[h])
					} else
						for (h in l) x.event.remove(e, h + t[u], n, i, !0);
				x.isEmptyObject(l) && Q.remove(e, "handle events")
			}
		},
		dispatch: function(e) {
			var t, n, i, r, o, a, s = new Array(arguments.length),
				l = x.event.fix(e),
				u = (Q.get(this, "events") || Object.create(null))[l.type] || [],
				c = x.event.special[l.type] || {};
			for (s[0] = l, t = 1; t < arguments.length; t++) s[t] = arguments[t];
			if (l.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, l)) {
				for (a = x.event.handlers.call(this, l, u), t = 0;
					(r = a[t++]) && !l.isPropagationStopped();)
					for (l.currentTarget = r.elem, n = 0;
						(o = r.handlers[n++]) && !l.isImmediatePropagationStopped();) l.rnamespace && !1 !== o.namespace && !l.rnamespace.test(o.namespace) || (l.handleObj = o, l.data = o.data, void 0 !== (i = ((x.event.special[o.origType] || {}).handle || o.handler).apply(r.elem, s)) && !1 === (l.result = i) && (l.preventDefault(), l.stopPropagation()));
				return c.postDispatch && c.postDispatch.call(this, l), l.result
			}
		},
		handlers: function(e, t) {
			var n, i, r, o, a, s = [],
				l = t.delegateCount,
				u = e.target;
			if (l && u.nodeType && !("click" === e.type && e.button >= 1))
				for (; u !== this; u = u.parentNode || this)
					if (1 === u.nodeType && ("click" !== e.type || !0 !== u.disabled)) {
						for (o = [], a = {}, n = 0; n < l; n++) void 0 === a[r = (i = t[n]).selector + " "] && (a[r] = i.needsContext ? x(r, this).index(u) > -1 : x.find(r, this, null, [u]).length), a[r] && o.push(i);
						o.length && s.push({
							elem: u,
							handlers: o
						})
					} return u = this, l < t.length && s.push({
				elem: u,
				handlers: t.slice(l)
			}), s
		},
		addProp: function(e, t) {
			Object.defineProperty(x.Event.prototype, e, {
				enumerable: !0,
				configurable: !0,
				get: p(t) ? function() {
					if (this.originalEvent) return t(this.originalEvent)
				} : function() {
					if (this.originalEvent) return this.originalEvent[e]
				},
				set: function(t) {
					Object.defineProperty(this, e, {
						enumerable: !0,
						configurable: !0,
						writable: !0,
						value: t
					})
				}
			})
		},
		fix: function(e) {
			return e[x.expando] ? e : new x.Event(e)
		},
		special: {
			load: {
				noBubble: !0
			},
			click: {
				setup: function(e) {
					var t = this || e;
					return fe.test(t.type) && t.click && D(t, "input") && Ce(t, "click", xe), !1
				},
				trigger: function(e) {
					var t = this || e;
					return fe.test(t.type) && t.click && D(t, "input") && Ce(t, "click"), !0
				},
				_default: function(e) {
					var t = e.target;
					return fe.test(t.type) && t.click && D(t, "input") && Q.get(t, "click") || D(t, "a")
				}
			},
			beforeunload: {
				postDispatch: function(e) {
					void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
				}
			}
		}
	}, x.removeEvent = function(e, t, n) {
		e.removeEventListener && e.removeEventListener(t, n)
	}, x.Event = function(e, t) {
		if (!(this instanceof x.Event)) return new x.Event(e, t);
		e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? xe : we, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && x.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[x.expando] = !0
	}, x.Event.prototype = {
		constructor: x.Event,
		isDefaultPrevented: we,
		isPropagationStopped: we,
		isImmediatePropagationStopped: we,
		isSimulated: !1,
		preventDefault: function() {
			var e = this.originalEvent;
			this.isDefaultPrevented = xe, e && !this.isSimulated && e.preventDefault()
		},
		stopPropagation: function() {
			var e = this.originalEvent;
			this.isPropagationStopped = xe, e && !this.isSimulated && e.stopPropagation()
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;
			this.isImmediatePropagationStopped = xe, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
		}
	}, x.each({
		altKey: !0,
		bubbles: !0,
		cancelable: !0,
		changedTouches: !0,
		ctrlKey: !0,
		detail: !0,
		eventPhase: !0,
		metaKey: !0,
		pageX: !0,
		pageY: !0,
		shiftKey: !0,
		view: !0,
		char: !0,
		code: !0,
		charCode: !0,
		key: !0,
		keyCode: !0,
		button: !0,
		buttons: !0,
		clientX: !0,
		clientY: !0,
		offsetX: !0,
		offsetY: !0,
		pointerId: !0,
		pointerType: !0,
		screenX: !0,
		screenY: !0,
		targetTouches: !0,
		toElement: !0,
		touches: !0,
		which: !0
	}, x.event.addProp), x.each({
		focus: "focusin",
		blur: "focusout"
	}, function(e, t) {
		x.event.special[e] = {
			setup: function() {
				return Ce(this, e, ke), !1
			},
			trigger: function() {
				return Ce(this, e), !0
			},
			_default: function(t) {
				return Q.get(t.target, e)
			},
			delegateType: t
		}
	}), x.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function(e, t) {
		x.event.special[e] = {
			delegateType: t,
			bindType: t,
			handle: function(e) {
				var n, i = e.relatedTarget,
					r = e.handleObj;
				return i && (i === this || x.contains(this, i)) || (e.type = r.origType, n = r.handler.apply(this, arguments), e.type = t), n
			}
		}
	}), x.fn.extend({
		on: function(e, t, n, i) {
			return Se(this, e, t, n, i)
		},
		one: function(e, t, n, i) {
			return Se(this, e, t, n, i, 1)
		},
		off: function(e, t, n) {
			var i, r;
			if (e && e.preventDefault && e.handleObj) return i = e.handleObj, x(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
			if ("object" == typeof e) {
				for (r in e) this.off(r, t, e[r]);
				return this
			}
			return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = we), this.each(function() {
				x.event.remove(this, e, n, t)
			})
		}
	});
	var Te = /<script|<style|<link/i,
		De = /checked\s*(?:[^=]|=\s*.checked.)/i,
		Me = /^\s*<!\[CDATA\[|\]\]>\s*$/g;

	function Ee(e, t) {
		return D(e, "table") && D(11 !== t.nodeType ? t : t.firstChild, "tr") && x(e).children("tbody")[0] || e
	}

	function Ae(e) {
		return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
	}

	function Pe(e) {
		return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
	}

	function Oe(e, t) {
		var n, i, r, o, a, s;
		if (1 === t.nodeType) {
			if (Q.hasData(e) && (s = Q.get(e).events))
				for (r in Q.remove(t, "handle events"), s)
					for (n = 0, i = s[r].length; n < i; n++) x.event.add(t, r, s[r][n]);
			X.hasData(e) && (o = X.access(e), a = x.extend({}, o), X.set(t, a))
		}
	}

	function Ne(e, t, n, i) {
		t = o(t);
		var r, a, s, l, u, c, d = 0,
			f = e.length,
			g = f - 1,
			m = t[0],
			v = p(m);
		if (v || f > 1 && "string" == typeof m && !h.checkClone && De.test(m)) return e.each(function(r) {
			var o = e.eq(r);
			v && (t[0] = m.call(this, r, o.html())), Ne(o, t, n, i)
		});
		if (f && (a = (r = ye(t, e[0].ownerDocument, !1, e, i)).firstChild, 1 === r.childNodes.length && (r = a), a || i)) {
			for (l = (s = x.map(me(r, "script"), Ae)).length; d < f; d++) u = r, d !== g && (u = x.clone(u, !0, !0), l && x.merge(s, me(u, "script"))), n.call(e[d], u, d);
			if (l)
				for (c = s[s.length - 1].ownerDocument, x.map(s, Pe), d = 0; d < l; d++) u = s[d], pe.test(u.type || "") && !Q.access(u, "globalEval") && x.contains(c, u) && (u.src && "module" !== (u.type || "").toLowerCase() ? x._evalUrl && !u.noModule && x._evalUrl(u.src, {
					nonce: u.nonce || u.getAttribute("nonce")
				}, c) : b(u.textContent.replace(Me, ""), u, c))
		}
		return e
	}

	function Re(e, t, n) {
		for (var i, r = t ? x.filter(t, e) : e, o = 0; null != (i = r[o]); o++) n || 1 !== i.nodeType || x.cleanData(me(i)), i.parentNode && (n && re(i) && ve(me(i, "script")), i.parentNode.removeChild(i));
		return e
	}
	x.extend({
		htmlPrefilter: function(e) {
			return e
		},
		clone: function(e, t, n) {
			var i, r, o, a, s, l, u, c = e.cloneNode(!0),
				d = re(e);
			if (!(h.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || x.isXMLDoc(e)))
				for (a = me(c), i = 0, r = (o = me(e)).length; i < r; i++) s = o[i], l = a[i], u = void 0, "input" === (u = l.nodeName.toLowerCase()) && fe.test(s.type) ? l.checked = s.checked : "input" !== u && "textarea" !== u || (l.defaultValue = s.defaultValue);
			if (t)
				if (n)
					for (o = o || me(e), a = a || me(c), i = 0, r = o.length; i < r; i++) Oe(o[i], a[i]);
				else Oe(e, c);
			return (a = me(c, "script")).length > 0 && ve(a, !d && me(e, "script")), c
		},
		cleanData: function(e) {
			for (var t, n, i, r = x.event.special, o = 0; void 0 !== (n = e[o]); o++)
				if ($(n)) {
					if (t = n[Q.expando]) {
						if (t.events)
							for (i in t.events) r[i] ? x.event.remove(n, i) : x.removeEvent(n, i, t.handle);
						n[Q.expando] = void 0
					}
					n[X.expando] && (n[X.expando] = void 0)
				}
		}
	}), x.fn.extend({
		detach: function(e) {
			return Re(this, e, !0)
		},
		remove: function(e) {
			return Re(this, e)
		},
		text: function(e) {
			return H(this, function(e) {
				return void 0 === e ? x.text(this) : this.empty().each(function() {
					1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
				})
			}, null, e, arguments.length)
		},
		append: function() {
			return Ne(this, arguments, function(e) {
				1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Ee(this, e).appendChild(e)
			})
		},
		prepend: function() {
			return Ne(this, arguments, function(e) {
				if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
					var t = Ee(this, e);
					t.insertBefore(e, t.firstChild)
				}
			})
		},
		before: function() {
			return Ne(this, arguments, function(e) {
				this.parentNode && this.parentNode.insertBefore(e, this)
			})
		},
		after: function() {
			return Ne(this, arguments, function(e) {
				this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
			})
		},
		empty: function() {
			for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (x.cleanData(me(e, !1)), e.textContent = "");
			return this
		},
		clone: function(e, t) {
			return e = null != e && e, t = null == t ? e : t, this.map(function() {
				return x.clone(this, e, t)
			})
		},
		html: function(e) {
			return H(this, function(e) {
				var t = this[0] || {},
					n = 0,
					i = this.length;
				if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
				if ("string" == typeof e && !Te.test(e) && !ge[(he.exec(e) || ["", ""])[1].toLowerCase()]) {
					e = x.htmlPrefilter(e);
					try {
						for (; n < i; n++) 1 === (t = this[n] || {}).nodeType && (x.cleanData(me(t, !1)), t.innerHTML = e);
						t = 0
					} catch (e) {}
				}
				t && this.empty().append(e)
			}, null, e, arguments.length)
		},
		replaceWith: function() {
			var e = [];
			return Ne(this, arguments, function(t) {
				var n = this.parentNode;
				x.inArray(this, e) < 0 && (x.cleanData(me(this)), n && n.replaceChild(t, this))
			}, e)
		}
	}), x.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(e, t) {
		x.fn[e] = function(e) {
			for (var n, i = [], r = x(e), o = r.length - 1, s = 0; s <= o; s++) n = s === o ? this : this.clone(!0), x(r[s])[t](n), a.apply(i, n.get());
			return this.pushStack(i)
		}
	});
	var Ie = new RegExp("^(" + ee + ")(?!px)[a-z%]+$", "i"),
		Le = /^--/,
		Fe = function(t) {
			var n = t.ownerDocument.defaultView;
			return n && n.opener || (n = e), n.getComputedStyle(t)
		},
		je = function(e, t, n) {
			var i, r, o = {};
			for (r in t) o[r] = e.style[r], e.style[r] = t[r];
			for (r in i = n.call(e), t) e.style[r] = o[r];
			return i
		},
		We = new RegExp(ne.join("|"), "i"),
		ze = new RegExp("^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$", "g");

	function Ve(e, t, n) {
		var i, r, o, a, s = Le.test(t),
			l = e.style;
		return (n = n || Fe(e)) && (a = n.getPropertyValue(t) || n[t], s && a && (a = a.replace(ze, "$1") || void 0), "" !== a || re(e) || (a = x.style(e, t)), !h.pixelBoxStyles() && Ie.test(a) && We.test(t) && (i = l.width, r = l.minWidth, o = l.maxWidth, l.minWidth = l.maxWidth = l.width = a, a = n.width, l.width = i, l.minWidth = r, l.maxWidth = o)), void 0 !== a ? a + "" : a
	}

	function He(e, t) {
		return {
			get: function() {
				if (!e()) return (this.get = t).apply(this, arguments);
				delete this.get
			}
		}
	}! function() {
		function t() {
			if (c) {
				u.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", c.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", ie.appendChild(u).appendChild(c);
				var t = e.getComputedStyle(c);
				i = "1%" !== t.top, l = 12 === n(t.marginLeft), c.style.right = "60%", a = 36 === n(t.right), r = 36 === n(t.width), c.style.position = "absolute", o = 12 === n(c.offsetWidth / 3), ie.removeChild(u), c = null
			}
		}

		function n(e) {
			return Math.round(parseFloat(e))
		}
		var i, r, o, a, s, l, u = m.createElement("div"),
			c = m.createElement("div");
		c.style && (c.style.backgroundClip = "content-box", c.cloneNode(!0).style.backgroundClip = "", h.clearCloneStyle = "content-box" === c.style.backgroundClip, x.extend(h, {
			boxSizingReliable: function() {
				return t(), r
			},
			pixelBoxStyles: function() {
				return t(), a
			},
			pixelPosition: function() {
				return t(), i
			},
			reliableMarginLeft: function() {
				return t(), l
			},
			scrollboxSize: function() {
				return t(), o
			},
			reliableTrDimensions: function() {
				var t, n, i, r;
				return null == s && (t = m.createElement("table"), n = m.createElement("tr"), i = m.createElement("div"), t.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", n.style.cssText = "border:1px solid", n.style.height = "1px", i.style.height = "9px", i.style.display = "block", ie.appendChild(t).appendChild(n).appendChild(i), r = e.getComputedStyle(n), s = parseInt(r.height, 10) + parseInt(r.borderTopWidth, 10) + parseInt(r.borderBottomWidth, 10) === n.offsetHeight, ie.removeChild(t)), s
			}
		}))
	}();
	var Be = ["Webkit", "Moz", "ms"],
		qe = m.createElement("div").style,
		Ye = {};

	function Ue(e) {
		var t = x.cssProps[e] || Ye[e];
		return t || (e in qe ? e : Ye[e] = function(e) {
			for (var t = e[0].toUpperCase() + e.slice(1), n = Be.length; n--;)
				if ((e = Be[n] + t) in qe) return e
		}(e) || e)
	}
	var $e = /^(none|table(?!-c[ea]).+)/,
		Ge = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		Qe = {
			letterSpacing: "0",
			fontWeight: "400"
		};

	function Xe(e, t, n) {
		var i = te.exec(t);
		return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : t
	}

	function Je(e, t, n, i, r, o) {
		var a = "width" === t ? 1 : 0,
			s = 0,
			l = 0;
		if (n === (i ? "border" : "content")) return 0;
		for (; a < 4; a += 2) "margin" === n && (l += x.css(e, n + ne[a], !0, r)), i ? ("content" === n && (l -= x.css(e, "padding" + ne[a], !0, r)), "margin" !== n && (l -= x.css(e, "border" + ne[a] + "Width", !0, r))) : (l += x.css(e, "padding" + ne[a], !0, r), "padding" !== n ? l += x.css(e, "border" + ne[a] + "Width", !0, r) : s += x.css(e, "border" + ne[a] + "Width", !0, r));
		return !i && o >= 0 && (l += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - l - s - .5)) || 0), l
	}

	function Ze(e, t, n) {
		var i = Fe(e),
			r = (!h.boxSizingReliable() || n) && "border-box" === x.css(e, "boxSizing", !1, i),
			o = r,
			a = Ve(e, t, i),
			s = "offset" + t[0].toUpperCase() + t.slice(1);
		if (Ie.test(a)) {
			if (!n) return a;
			a = "auto"
		}
		return (!h.boxSizingReliable() && r || !h.reliableTrDimensions() && D(e, "tr") || "auto" === a || !parseFloat(a) && "inline" === x.css(e, "display", !1, i)) && e.getClientRects().length && (r = "border-box" === x.css(e, "boxSizing", !1, i), (o = s in e) && (a = e[s])), (a = parseFloat(a) || 0) + Je(e, t, n || (r ? "border" : "content"), o, i, a) + "px"
	}
	x.extend({
			cssHooks: {
				opacity: {
					get: function(e, t) {
						if (t) {
							var n = Ve(e, "opacity");
							return "" === n ? "1" : n
						}
					}
				}
			},
			cssNumber: {
				animationIterationCount: !0,
				columnCount: !0,
				fillOpacity: !0,
				flexGrow: !0,
				flexShrink: !0,
				fontWeight: !0,
				gridArea: !0,
				gridColumn: !0,
				gridColumnEnd: !0,
				gridColumnStart: !0,
				gridRow: !0,
				gridRowEnd: !0,
				gridRowStart: !0,
				lineHeight: !0,
				opacity: !0,
				order: !0,
				orphans: !0,
				widows: !0,
				zIndex: !0,
				zoom: !0
			},
			cssProps: {},
			style: function(e, t, n, i) {
				if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
					var r, o, a, s = U(t),
						l = Le.test(t),
						u = e.style;
					if (l || (t = Ue(s)), a = x.cssHooks[t] || x.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (r = a.get(e, !1, i)) ? r : u[t];
					"string" === (o = typeof n) && (r = te.exec(n)) && r[1] && (n = function(e, t, n, i) {
						var r, o, a = 20,
							s = i ? function() {
								return i.cur()
							} : function() {
								return x.css(e, t, "")
							},
							l = s(),
							u = n && n[3] || (x.cssNumber[t] ? "" : "px"),
							c = e.nodeType && (x.cssNumber[t] || "px" !== u && +l) && te.exec(x.css(e, t));
						if (c && c[3] !== u) {
							for (l /= 2, u = u || c[3], c = +l || 1; a--;) x.style(e, t, c + u), (1 - o) * (1 - (o = s() / l || .5)) <= 0 && (a = 0), c /= o;
							c *= 2, x.style(e, t, c + u), n = n || []
						}
						return n && (c = +c || +l || 0, r = n[1] ? c + (n[1] + 1) * n[2] : +n[2], i && (i.unit = u, i.start = c, i.end = r)), r
					}(e, t, r), o = "number"), null != n && n == n && ("number" !== o || l || (n += r && r[3] || (x.cssNumber[s] ? "" : "px")), h.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, i)) || (l ? u.setProperty(t, n) : u[t] = n))
				}
			},
			css: function(e, t, n, i) {
				var r, o, a, s = U(t);
				return Le.test(t) || (t = Ue(s)), (a = x.cssHooks[t] || x.cssHooks[s]) && "get" in a && (r = a.get(e, !0, n)), void 0 === r && (r = Ve(e, t, i)), "normal" === r && t in Qe && (r = Qe[t]), "" === n || n ? (o = parseFloat(r), !0 === n || isFinite(o) ? o || 0 : r) : r
			}
		}), x.each(["height", "width"], function(e, t) {
			x.cssHooks[t] = {
				get: function(e, n, i) {
					if (n) return !$e.test(x.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? Ze(e, t, i) : je(e, Ge, function() {
						return Ze(e, t, i)
					})
				},
				set: function(e, n, i) {
					var r, o = Fe(e),
						a = !h.scrollboxSize() && "absolute" === o.position,
						s = (a || i) && "border-box" === x.css(e, "boxSizing", !1, o),
						l = i ? Je(e, t, i, s, o) : 0;
					return s && a && (l -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(o[t]) - Je(e, t, "border", !1, o) - .5)), l && (r = te.exec(n)) && "px" !== (r[3] || "px") && (e.style[t] = n, n = x.css(e, t)), Xe(0, n, l)
				}
			}
		}), x.cssHooks.marginLeft = He(h.reliableMarginLeft, function(e, t) {
			if (t) return (parseFloat(Ve(e, "marginLeft")) || e.getBoundingClientRect().left - je(e, {
				marginLeft: 0
			}, function() {
				return e.getBoundingClientRect().left
			})) + "px"
		}), x.each({
			margin: "",
			padding: "",
			border: "Width"
		}, function(e, t) {
			x.cssHooks[e + t] = {
				expand: function(n) {
					for (var i = 0, r = {}, o = "string" == typeof n ? n.split(" ") : [n]; i < 4; i++) r[e + ne[i] + t] = o[i] || o[i - 2] || o[0];
					return r
				}
			}, "margin" !== e && (x.cssHooks[e + t].set = Xe)
		}), x.fn.extend({
			css: function(e, t) {
				return H(this, function(e, t, n) {
					var i, r, o = {},
						a = 0;
					if (Array.isArray(t)) {
						for (i = Fe(e), r = t.length; a < r; a++) o[t[a]] = x.css(e, t[a], !1, i);
						return o
					}
					return void 0 !== n ? x.style(e, t, n) : x.css(e, t)
				}, e, t, arguments.length > 1)
			}
		}), x.fn.delay = function(t, n) {
			return t = x.fx && x.fx.speeds[t] || t, n = n || "fx", this.queue(n, function(n, i) {
				var r = e.setTimeout(n, t);
				i.stop = function() {
					e.clearTimeout(r)
				}
			})
		},
		function() {
			var e = m.createElement("input"),
				t = m.createElement("select").appendChild(m.createElement("option"));
			e.type = "checkbox", h.checkOn = "" !== e.value, h.optSelected = t.selected, (e = m.createElement("input")).value = "t", e.type = "radio", h.radioValue = "t" === e.value
		}();
	var Ke, et = x.expr.attrHandle;
	x.fn.extend({
		attr: function(e, t) {
			return H(this, x.attr, e, t, arguments.length > 1)
		},
		removeAttr: function(e) {
			return this.each(function() {
				x.removeAttr(this, e)
			})
		}
	}), x.extend({
		attr: function(e, t, n) {
			var i, r, o = e.nodeType;
			if (3 !== o && 8 !== o && 2 !== o) return void 0 === e.getAttribute ? x.prop(e, t, n) : (1 === o && x.isXMLDoc(e) || (r = x.attrHooks[t.toLowerCase()] || (x.expr.match.bool.test(t) ? Ke : void 0)), void 0 !== n ? null === n ? void x.removeAttr(e, t) : r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : r && "get" in r && null !== (i = r.get(e, t)) ? i : null == (i = x.find.attr(e, t)) ? void 0 : i)
		},
		attrHooks: {
			type: {
				set: function(e, t) {
					if (!h.radioValue && "radio" === t && D(e, "input")) {
						var n = e.value;
						return e.setAttribute("type", t), n && (e.value = n), t
					}
				}
			}
		},
		removeAttr: function(e, t) {
			var n, i = 0,
				r = t && t.match(I);
			if (r && 1 === e.nodeType)
				for (; n = r[i++];) e.removeAttribute(n)
		}
	}), Ke = {
		set: function(e, t, n) {
			return !1 === t ? x.removeAttr(e, n) : e.setAttribute(n, n), n
		}
	}, x.each(x.expr.match.bool.source.match(/\w+/g), function(e, t) {
		var n = et[t] || x.find.attr;
		et[t] = function(e, t, i) {
			var r, o, a = t.toLowerCase();
			return i || (o = et[a], et[a] = r, r = null != n(e, t, i) ? a : null, et[a] = o), r
		}
	});
	var tt = /^(?:input|select|textarea|button)$/i,
		nt = /^(?:a|area)$/i;

	function it(e) {
		return (e.match(I) || []).join(" ")
	}

	function rt(e) {
		return e.getAttribute && e.getAttribute("class") || ""
	}

	function ot(e) {
		return Array.isArray(e) ? e : "string" == typeof e && e.match(I) || []
	}
	x.fn.extend({
		prop: function(e, t) {
			return H(this, x.prop, e, t, arguments.length > 1)
		},
		removeProp: function(e) {
			return this.each(function() {
				delete this[x.propFix[e] || e]
			})
		}
	}), x.extend({
		prop: function(e, t, n) {
			var i, r, o = e.nodeType;
			if (3 !== o && 8 !== o && 2 !== o) return 1 === o && x.isXMLDoc(e) || (t = x.propFix[t] || t, r = x.propHooks[t]), void 0 !== n ? r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : e[t] = n : r && "get" in r && null !== (i = r.get(e, t)) ? i : e[t]
		},
		propHooks: {
			tabIndex: {
				get: function(e) {
					var t = x.find.attr(e, "tabindex");
					return t ? parseInt(t, 10) : tt.test(e.nodeName) || nt.test(e.nodeName) && e.href ? 0 : -1
				}
			}
		},
		propFix: {
			for: "htmlFor",
			class: "className"
		}
	}), h.optSelected || (x.propHooks.selected = {
		get: function(e) {
			var t = e.parentNode;
			return t && t.parentNode && t.parentNode.selectedIndex, null
		},
		set: function(e) {
			var t = e.parentNode;
			t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
		}
	}), x.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
		x.propFix[this.toLowerCase()] = this
	}), x.fn.extend({
		addClass: function(e) {
			var t, n, i, r, o, a;
			return p(e) ? this.each(function(t) {
				x(this).addClass(e.call(this, t, rt(this)))
			}) : (t = ot(e)).length ? this.each(function() {
				if (i = rt(this), n = 1 === this.nodeType && " " + it(i) + " ") {
					for (o = 0; o < t.length; o++) r = t[o], n.indexOf(" " + r + " ") < 0 && (n += r + " ");
					a = it(n), i !== a && this.setAttribute("class", a)
				}
			}) : this
		},
		removeClass: function(e) {
			var t, n, i, r, o, a;
			return p(e) ? this.each(function(t) {
				x(this).removeClass(e.call(this, t, rt(this)))
			}) : arguments.length ? (t = ot(e)).length ? this.each(function() {
				if (i = rt(this), n = 1 === this.nodeType && " " + it(i) + " ") {
					for (o = 0; o < t.length; o++)
						for (r = t[o]; n.indexOf(" " + r + " ") > -1;) n = n.replace(" " + r + " ", " ");
					a = it(n), i !== a && this.setAttribute("class", a)
				}
			}) : this : this.attr("class", "")
		},
		toggleClass: function(e, t) {
			var n, i, r, o, a = typeof e,
				s = "string" === a || Array.isArray(e);
			return p(e) ? this.each(function(n) {
				x(this).toggleClass(e.call(this, n, rt(this), t), t)
			}) : "boolean" == typeof t && s ? t ? this.addClass(e) : this.removeClass(e) : (n = ot(e), this.each(function() {
				if (s)
					for (o = x(this), r = 0; r < n.length; r++) i = n[r], o.hasClass(i) ? o.removeClass(i) : o.addClass(i);
				else void 0 !== e && "boolean" !== a || ((i = rt(this)) && Q.set(this, "__className__", i), this.setAttribute && this.setAttribute("class", i || !1 === e ? "" : Q.get(this, "__className__") || ""))
			}))
		},
		hasClass: function(e) {
			var t, n, i = 0;
			for (t = " " + e + " "; n = this[i++];)
				if (1 === n.nodeType && (" " + it(rt(n)) + " ").indexOf(t) > -1) return !0;
			return !1
		}
	});
	var at = /\r/g;
	x.fn.extend({
		val: function(e) {
			var t, n, i, r = this[0];
			return arguments.length ? (i = p(e), this.each(function(n) {
				var r;
				1 === this.nodeType && (null == (r = i ? e.call(this, n, x(this).val()) : e) ? r = "" : "number" == typeof r ? r += "" : Array.isArray(r) && (r = x.map(r, function(e) {
					return null == e ? "" : e + ""
				})), (t = x.valHooks[this.type] || x.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, r, "value") || (this.value = r))
			})) : r ? (t = x.valHooks[r.type] || x.valHooks[r.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(r, "value")) ? n : "string" == typeof(n = r.value) ? n.replace(at, "") : null == n ? "" : n : void 0
		}
	}), x.extend({
		valHooks: {
			option: {
				get: function(e) {
					var t = x.find.attr(e, "value");
					return null != t ? t : it(x.text(e))
				}
			},
			select: {
				get: function(e) {
					var t, n, i, r = e.options,
						o = e.selectedIndex,
						a = "select-one" === e.type,
						s = a ? null : [],
						l = a ? o + 1 : r.length;
					for (i = o < 0 ? l : a ? o : 0; i < l; i++)
						if (((n = r[i]).selected || i === o) && !n.disabled && (!n.parentNode.disabled || !D(n.parentNode, "optgroup"))) {
							if (t = x(n).val(), a) return t;
							s.push(t)
						} return s
				},
				set: function(e, t) {
					for (var n, i, r = e.options, o = x.makeArray(t), a = r.length; a--;)((i = r[a]).selected = x.inArray(x.valHooks.option.get(i), o) > -1) && (n = !0);
					return n || (e.selectedIndex = -1), o
				}
			}
		}
	}), x.each(["radio", "checkbox"], function() {
		x.valHooks[this] = {
			set: function(e, t) {
				if (Array.isArray(t)) return e.checked = x.inArray(x(e).val(), t) > -1
			}
		}, h.checkOn || (x.valHooks[this].get = function(e) {
			return null === e.getAttribute("value") ? "on" : e.value
		})
	}), h.focusin = "onfocusin" in e;
	var st = /^(?:focusinfocus|focusoutblur)$/,
		lt = function(e) {
			e.stopPropagation()
		};
	x.extend(x.event, {
		trigger: function(t, n, i, r) {
			var o, a, s, l, u, d, f, h, v = [i || m],
				b = c.call(t, "type") ? t.type : t,
				y = c.call(t, "namespace") ? t.namespace.split(".") : [];
			if (a = h = s = i = i || m, 3 !== i.nodeType && 8 !== i.nodeType && !st.test(b + x.event.triggered) && (b.indexOf(".") > -1 && (y = b.split("."), b = y.shift(), y.sort()), u = b.indexOf(":") < 0 && "on" + b, (t = t[x.expando] ? t : new x.Event(b, "object" == typeof t && t)).isTrigger = r ? 2 : 3, t.namespace = y.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + y.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : x.makeArray(n, [t]), f = x.event.special[b] || {}, r || !f.trigger || !1 !== f.trigger.apply(i, n))) {
				if (!r && !f.noBubble && !g(i)) {
					for (l = f.delegateType || b, st.test(l + b) || (a = a.parentNode); a; a = a.parentNode) v.push(a), s = a;
					s === (i.ownerDocument || m) && v.push(s.defaultView || s.parentWindow || e)
				}
				for (o = 0;
					(a = v[o++]) && !t.isPropagationStopped();) h = a, t.type = o > 1 ? l : f.bindType || b, (d = (Q.get(a, "events") || Object.create(null))[t.type] && Q.get(a, "handle")) && d.apply(a, n), (d = u && a[u]) && d.apply && $(a) && (t.result = d.apply(a, n), !1 === t.result && t.preventDefault());
				return t.type = b, r || t.isDefaultPrevented() || f._default && !1 !== f._default.apply(v.pop(), n) || !$(i) || u && p(i[b]) && !g(i) && ((s = i[u]) && (i[u] = null), x.event.triggered = b, t.isPropagationStopped() && h.addEventListener(b, lt), i[b](), t.isPropagationStopped() && h.removeEventListener(b, lt), x.event.triggered = void 0, s && (i[u] = s)), t.result
			}
		},
		simulate: function(e, t, n) {
			var i = x.extend(new x.Event, n, {
				type: e,
				isSimulated: !0
			});
			x.event.trigger(i, null, t)
		}
	}), x.fn.extend({
		trigger: function(e, t) {
			return this.each(function() {
				x.event.trigger(e, t, this)
			})
		},
		triggerHandler: function(e, t) {
			var n = this[0];
			if (n) return x.event.trigger(e, t, n, !0)
		}
	}), h.focusin || x.each({
		focus: "focusin",
		blur: "focusout"
	}, function(e, t) {
		var n = function(e) {
			x.event.simulate(t, e.target, x.event.fix(e))
		};
		x.event.special[t] = {
			setup: function() {
				var i = this.ownerDocument || this.document || this,
					r = Q.access(i, t);
				r || i.addEventListener(e, n, !0), Q.access(i, t, (r || 0) + 1)
			},
			teardown: function() {
				var i = this.ownerDocument || this.document || this,
					r = Q.access(i, t) - 1;
				r ? Q.access(i, t, r) : (i.removeEventListener(e, n, !0), Q.remove(i, t))
			}
		}
	}), x.parseXML = function(t) {
		var n, i;
		if (!t || "string" != typeof t) return null;
		try {
			n = (new e.DOMParser).parseFromString(t, "text/xml")
		} catch (e) {}
		return i = n && n.getElementsByTagName("parsererror")[0], n && !i || x.error("Invalid XML: " + (i ? x.map(i.childNodes, function(e) {
			return e.textContent
		}).join("\n") : t)), n
	};
	var ut, ct = /\[\]$/,
		dt = /\r?\n/g,
		ft = /^(?:submit|button|image|reset|file)$/i,
		ht = /^(?:input|select|textarea|keygen)/i;

	function pt(e, t, n, i) {
		var r;
		if (Array.isArray(t)) x.each(t, function(t, r) {
			n || ct.test(e) ? i(e, r) : pt(e + "[" + ("object" == typeof r && null != r ? t : "") + "]", r, n, i)
		});
		else if (n || "object" !== y(t)) i(e, t);
		else
			for (r in t) pt(e + "[" + r + "]", t[r], n, i)
	}
	x.param = function(e, t) {
		var n, i = [],
			r = function(e, t) {
				var n = p(t) ? t() : t;
				i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
			};
		if (null == e) return "";
		if (Array.isArray(e) || e.jquery && !x.isPlainObject(e)) x.each(e, function() {
			r(this.name, this.value)
		});
		else
			for (n in e) pt(n, e[n], t, r);
		return i.join("&")
	}, x.fn.extend({
		serialize: function() {
			return x.param(this.serializeArray())
		},
		serializeArray: function() {
			return this.map(function() {
				var e = x.prop(this, "elements");
				return e ? x.makeArray(e) : this
			}).filter(function() {
				var e = this.type;
				return this.name && !x(this).is(":disabled") && ht.test(this.nodeName) && !ft.test(e) && (this.checked || !fe.test(e))
			}).map(function(e, t) {
				var n = x(this).val();
				return null == n ? null : Array.isArray(n) ? x.map(n, function(e) {
					return {
						name: t.name,
						value: e.replace(dt, "\r\n")
					}
				}) : {
					name: t.name,
					value: n.replace(dt, "\r\n")
				}
			}).get()
		}
	}), x.fn.extend({
		wrapAll: function(e) {
			var t;
			return this[0] && (p(e) && (e = e.call(this[0])), t = x(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
				for (var e = this; e.firstElementChild;) e = e.firstElementChild;
				return e
			}).append(this)), this
		},
		wrapInner: function(e) {
			return p(e) ? this.each(function(t) {
				x(this).wrapInner(e.call(this, t))
			}) : this.each(function() {
				var t = x(this),
					n = t.contents();
				n.length ? n.wrapAll(e) : t.append(e)
			})
		},
		wrap: function(e) {
			var t = p(e);
			return this.each(function(n) {
				x(this).wrapAll(t ? e.call(this, n) : e)
			})
		},
		unwrap: function(e) {
			return this.parent(e).not("body").each(function() {
				x(this).replaceWith(this.childNodes)
			}), this
		}
	}), x.expr.pseudos.hidden = function(e) {
		return !x.expr.pseudos.visible(e)
	}, x.expr.pseudos.visible = function(e) {
		return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
	}, h.createHTMLDocument = ((ut = m.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === ut.childNodes.length), x.parseHTML = function(e, t, n) {
		return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (h.createHTMLDocument ? ((i = (t = m.implementation.createHTMLDocument("")).createElement("base")).href = m.location.href, t.head.appendChild(i)) : t = m), o = !n && [], (r = M.exec(e)) ? [t.createElement(r[1])] : (r = ye([e], t, o), o && o.length && x(o).remove(), x.merge([], r.childNodes)));
		var i, r, o
	}, x.offset = {
		setOffset: function(e, t, n) {
			var i, r, o, a, s, l, u = x.css(e, "position"),
				c = x(e),
				d = {};
			"static" === u && (e.style.position = "relative"), s = c.offset(), o = x.css(e, "top"), l = x.css(e, "left"), ("absolute" === u || "fixed" === u) && (o + l).indexOf("auto") > -1 ? (a = (i = c.position()).top, r = i.left) : (a = parseFloat(o) || 0, r = parseFloat(l) || 0), p(t) && (t = t.call(e, n, x.extend({}, s))), null != t.top && (d.top = t.top - s.top + a), null != t.left && (d.left = t.left - s.left + r), "using" in t ? t.using.call(e, d) : c.css(d)
		}
	}, x.fn.extend({
		offset: function(e) {
			if (arguments.length) return void 0 === e ? this : this.each(function(t) {
				x.offset.setOffset(this, e, t)
			});
			var t, n, i = this[0];
			return i ? i.getClientRects().length ? (t = i.getBoundingClientRect(), n = i.ownerDocument.defaultView, {
				top: t.top + n.pageYOffset,
				left: t.left + n.pageXOffset
			}) : {
				top: 0,
				left: 0
			} : void 0
		},
		position: function() {
			if (this[0]) {
				var e, t, n, i = this[0],
					r = {
						top: 0,
						left: 0
					};
				if ("fixed" === x.css(i, "position")) t = i.getBoundingClientRect();
				else {
					for (t = this.offset(), n = i.ownerDocument, e = i.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === x.css(e, "position");) e = e.parentNode;
					e && e !== i && 1 === e.nodeType && ((r = x(e).offset()).top += x.css(e, "borderTopWidth", !0), r.left += x.css(e, "borderLeftWidth", !0))
				}
				return {
					top: t.top - r.top - x.css(i, "marginTop", !0),
					left: t.left - r.left - x.css(i, "marginLeft", !0)
				}
			}
		},
		offsetParent: function() {
			return this.map(function() {
				for (var e = this.offsetParent; e && "static" === x.css(e, "position");) e = e.offsetParent;
				return e || ie
			})
		}
	}), x.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function(e, t) {
		var n = "pageYOffset" === t;
		x.fn[e] = function(i) {
			return H(this, function(e, i, r) {
				var o;
				if (g(e) ? o = e : 9 === e.nodeType && (o = e.defaultView), void 0 === r) return o ? o[t] : e[i];
				o ? o.scrollTo(n ? o.pageXOffset : r, n ? r : o.pageYOffset) : e[i] = r
			}, e, i, arguments.length)
		}
	}), x.each(["top", "left"], function(e, t) {
		x.cssHooks[t] = He(h.pixelPosition, function(e, n) {
			if (n) return n = Ve(e, t), Ie.test(n) ? x(e).position()[t] + "px" : n
		})
	}), x.each({
		Height: "height",
		Width: "width"
	}, function(e, t) {
		x.each({
			padding: "inner" + e,
			content: t,
			"": "outer" + e
		}, function(n, i) {
			x.fn[i] = function(r, o) {
				var a = arguments.length && (n || "boolean" != typeof r),
					s = n || (!0 === r || !0 === o ? "margin" : "border");
				return H(this, function(t, n, r) {
					var o;
					return g(t) ? 0 === i.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === r ? x.css(t, n, s) : x.style(t, n, r, s)
				}, t, a ? r : void 0, a)
			}
		})
	}), x.fn.extend({
		bind: function(e, t, n) {
			return this.on(e, null, t, n)
		},
		unbind: function(e, t) {
			return this.off(e, null, t)
		},
		delegate: function(e, t, n, i) {
			return this.on(t, e, n, i)
		},
		undelegate: function(e, t, n) {
			return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
		},
		hover: function(e, t) {
			return this.mouseenter(e).mouseleave(t || e)
		}
	}), x.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, t) {
		x.fn[t] = function(e, n) {
			return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
		}
	});
	var gt = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
	x.proxy = function(e, t) {
		var n, i, o;
		if ("string" == typeof t && (n = e[t], t = e, e = n), p(e)) return i = r.call(arguments, 2), (o = function() {
			return e.apply(t || this, i.concat(r.call(arguments)))
		}).guid = e.guid = e.guid || x.guid++, o
	}, x.holdReady = function(e) {
		e ? x.readyWait++ : x.ready(!0)
	}, x.isArray = Array.isArray, x.parseJSON = JSON.parse, x.nodeName = D, x.isFunction = p, x.isWindow = g, x.camelCase = U, x.type = y, x.now = Date.now, x.isNumeric = function(e) {
		var t = x.type(e);
		return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
	}, x.trim = function(e) {
		return null == e ? "" : (e + "").replace(gt, "$1")
	}, "function" == typeof define && define.amd && define("jquery", [], function() {
		return x
	});
	var mt = e.jQuery,
		vt = e.$;
	return x.noConflict = function(t) {
		return e.$ === x && (e.$ = vt), t && e.jQuery === x && (e.jQuery = mt), x
	}, void 0 === t && (e.jQuery = e.$ = x), x
}),
function(e, t) {
	"object" == typeof exports && "undefined" != typeof module ? t(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).bootstrap = {}, e.jQuery, e.Popper)
}(this, function(e, t, n) {
	"use strict";

	function i(e) {
		return e && "object" == typeof e && "default" in e ? e : {
			default: e
		}
	}
	var r = i(t),
		o = i(n);

	function a(e, t) {
		for (var n = 0; n < t.length; n++) {
			var i = t[n];
			i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
		}
	}

	function s(e, t, n) {
		return t && a(e.prototype, t), n && a(e, n), Object.defineProperty(e, "prototype", {
			writable: !1
		}), e
	}

	function l() {
		return (l = Object.assign ? Object.assign.bind() : function(e) {
			for (var t = 1; t < arguments.length; t++) {
				var n = arguments[t];
				for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
			}
			return e
		}).apply(this, arguments)
	}

	function u(e, t) {
		return (u = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
			return e.__proto__ = t, e
		})(e, t)
	}
	var c = "transitionend";

	function d(e) {
		var t = this,
			n = !1;
		return r.default(this).one(f.TRANSITION_END, function() {
			n = !0
		}), setTimeout(function() {
			n || f.triggerTransitionEnd(t)
		}, e), this
	}
	var f = {
		TRANSITION_END: "bsTransitionEnd",
		getUID: function(e) {
			do {
				e += ~~(1e6 * Math.random())
			} while (document.getElementById(e));
			return e
		},
		getSelectorFromElement: function(e) {
			var t = e.getAttribute("data-target");
			if (!t || "#" === t) {
				var n = e.getAttribute("href");
				t = n && "#" !== n ? n.trim() : ""
			}
			try {
				return document.querySelector(t) ? t : null
			} catch (e) {
				return null
			}
		},
		getTransitionDurationFromElement: function(e) {
			if (!e) return 0;
			var t = r.default(e).css("transition-duration"),
				n = r.default(e).css("transition-delay"),
				i = parseFloat(t),
				o = parseFloat(n);
			return i || o ? (t = t.split(",")[0], n = n.split(",")[0], 1e3 * (parseFloat(t) + parseFloat(n))) : 0
		},
		reflow: function(e) {
			return e.offsetHeight
		},
		triggerTransitionEnd: function(e) {
			r.default(e).trigger(c)
		},
		supportsTransitionEnd: function() {
			return Boolean(c)
		},
		isElement: function(e) {
			return (e[0] || e).nodeType
		},
		typeCheckConfig: function(e, t, n) {
			for (var i in n)
				if (Object.prototype.hasOwnProperty.call(n, i)) {
					var r = n[i],
						o = t[i],
						a = o && f.isElement(o) ? "element" : null == (s = o) ? "" + s : {}.toString.call(s).match(/\s([a-z]+)/i)[1].toLowerCase();
					if (!new RegExp(r).test(a)) throw new Error(e.toUpperCase() + ': Option "' + i + '" provided type "' + a + '" but expected type "' + r + '".')
				} var s
		},
		findShadowRoot: function(e) {
			if (!document.documentElement.attachShadow) return null;
			if ("function" == typeof e.getRootNode) {
				var t = e.getRootNode();
				return t instanceof ShadowRoot ? t : null
			}
			return e instanceof ShadowRoot ? e : e.parentNode ? f.findShadowRoot(e.parentNode) : null
		},
		jQueryDetection: function() {
			if (void 0 === r.default) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
			var e = r.default.fn.jquery.split(" ")[0].split(".");
			if (e[0] < 2 && e[1] < 9 || 1 === e[0] && 9 === e[1] && e[2] < 1 || e[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
		}
	};
	f.jQueryDetection(), r.default.fn.emulateTransitionEnd = d, r.default.event.special[f.TRANSITION_END] = {
		bindType: c,
		delegateType: c,
		handle: function(e) {
			if (r.default(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
		}
	};
	var h = r.default.fn.alert,
		p = function() {
			function e(e) {
				this._element = e
			}
			var t = e.prototype;
			return t.close = function(e) {
				var t = this._element;
				e && (t = this._getRootElement(e)), this._triggerCloseEvent(t).isDefaultPrevented() || this._removeElement(t)
			}, t.dispose = function() {
				r.default.removeData(this._element, "bs.alert"), this._element = null
			}, t._getRootElement = function(e) {
				var t = f.getSelectorFromElement(e),
					n = !1;
				return t && (n = document.querySelector(t)), n || (n = r.default(e).closest(".alert")[0]), n
			}, t._triggerCloseEvent = function(e) {
				var t = r.default.Event("close.bs.alert");
				return r.default(e).trigger(t), t
			}, t._removeElement = function(e) {
				var t = this;
				if (r.default(e).removeClass("show"), r.default(e).hasClass("fade")) {
					var n = f.getTransitionDurationFromElement(e);
					r.default(e).one(f.TRANSITION_END, function(n) {
						return t._destroyElement(e, n)
					}).emulateTransitionEnd(n)
				} else this._destroyElement(e)
			}, t._destroyElement = function(e) {
				r.default(e).detach().trigger("closed.bs.alert").remove()
			}, e._jQueryInterface = function(t) {
				return this.each(function() {
					var n = r.default(this),
						i = n.data("bs.alert");
					i || (i = new e(this), n.data("bs.alert", i)), "close" === t && i[t](this)
				})
			}, e._handleDismiss = function(e) {
				return function(t) {
					t && t.preventDefault(), e.close(this)
				}
			}, s(e, null, [{
				key: "VERSION",
				get: function() {
					return "4.6.2"
				}
			}]), e
		}();
	r.default(document).on("click.bs.alert.data-api", '[data-dismiss="alert"]', p._handleDismiss(new p)), r.default.fn.alert = p._jQueryInterface, r.default.fn.alert.Constructor = p, r.default.fn.alert.noConflict = function() {
		return r.default.fn.alert = h, p._jQueryInterface
	};
	var g = r.default.fn.button,
		m = function() {
			function e(e) {
				this._element = e, this.shouldAvoidTriggerChange = !1
			}
			var t = e.prototype;
			return t.toggle = function() {
				var e = !0,
					t = !0,
					n = r.default(this._element).closest('[data-toggle="buttons"]')[0];
				if (n) {
					var i = this._element.querySelector('input:not([type="hidden"])');
					if (i) {
						if ("radio" === i.type)
							if (i.checked && this._element.classList.contains("active")) e = !1;
							else {
								var o = n.querySelector(".active");
								o && r.default(o).removeClass("active")
							} e && ("checkbox" !== i.type && "radio" !== i.type || (i.checked = !this._element.classList.contains("active")), this.shouldAvoidTriggerChange || r.default(i).trigger("change")), i.focus(), t = !1
					}
				}
				this._element.hasAttribute("disabled") || this._element.classList.contains("disabled") || (t && this._element.setAttribute("aria-pressed", !this._element.classList.contains("active")), e && r.default(this._element).toggleClass("active"))
			}, t.dispose = function() {
				r.default.removeData(this._element, "bs.button"), this._element = null
			}, e._jQueryInterface = function(t, n) {
				return this.each(function() {
					var i = r.default(this),
						o = i.data("bs.button");
					o || (o = new e(this), i.data("bs.button", o)), o.shouldAvoidTriggerChange = n, "toggle" === t && o[t]()
				})
			}, s(e, null, [{
				key: "VERSION",
				get: function() {
					return "4.6.2"
				}
			}]), e
		}();
	r.default(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(e) {
		var t = e.target,
			n = t;
		if (r.default(t).hasClass("btn") || (t = r.default(t).closest(".btn")[0]), !t || t.hasAttribute("disabled") || t.classList.contains("disabled")) e.preventDefault();
		else {
			var i = t.querySelector('input:not([type="hidden"])');
			if (i && (i.hasAttribute("disabled") || i.classList.contains("disabled"))) return void e.preventDefault();
			"INPUT" !== n.tagName && "LABEL" === t.tagName || m._jQueryInterface.call(r.default(t), "toggle", "INPUT" === n.tagName)
		}
	}).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
		var t = r.default(e.target).closest(".btn")[0];
		r.default(t).toggleClass("focus", /^focus(in)?$/.test(e.type))
	}), r.default(window).on("load.bs.button.data-api", function() {
		for (var e = [].slice.call(document.querySelectorAll('[data-toggle="buttons"] .btn')), t = 0, n = e.length; t < n; t++) {
			var i = e[t],
				r = i.querySelector('input:not([type="hidden"])');
			r.checked || r.hasAttribute("checked") ? i.classList.add("active") : i.classList.remove("active")
		}
		for (var o = 0, a = (e = [].slice.call(document.querySelectorAll('[data-toggle="button"]'))).length; o < a; o++) {
			var s = e[o];
			"true" === s.getAttribute("aria-pressed") ? s.classList.add("active") : s.classList.remove("active")
		}
	}), r.default.fn.button = m._jQueryInterface, r.default.fn.button.Constructor = m, r.default.fn.button.noConflict = function() {
		return r.default.fn.button = g, m._jQueryInterface
	};
	var v = "carousel",
		b = ".bs.carousel",
		y = r.default.fn[v],
		_ = ".carousel-indicators",
		x = {
			interval: 5e3,
			keyboard: !0,
			slide: !1,
			pause: "hover",
			wrap: !0,
			touch: !0
		},
		w = {
			interval: "(number|boolean)",
			keyboard: "boolean",
			slide: "(boolean|string)",
			pause: "(string|boolean)",
			wrap: "boolean",
			touch: "boolean"
		},
		k = {
			TOUCH: "touch",
			PEN: "pen"
		},
		S = function() {
			function e(e, t) {
				this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(t), this._element = e, this._indicatorsElement = this._element.querySelector(_), this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners()
			}
			var t = e.prototype;
			return t.next = function() {
				this._isSliding || this._slide("next")
			}, t.nextWhenVisible = function() {
				var e = r.default(this._element);
				!document.hidden && e.is(":visible") && "hidden" !== e.css("visibility") && this.next()
			}, t.prev = function() {
				this._isSliding || this._slide("prev")
			}, t.pause = function(e) {
				e || (this._isPaused = !0), this._element.querySelector(".carousel-item-next, .carousel-item-prev") && (f.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
			}, t.cycle = function(e) {
				e || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._updateInterval(), this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
			}, t.to = function(e) {
				var t = this;
				this._activeElement = this._element.querySelector(".active.carousel-item");
				var n = this._getItemIndex(this._activeElement);
				if (!(e > this._items.length - 1 || e < 0))
					if (this._isSliding) r.default(this._element).one("slid.bs.carousel", function() {
						return t.to(e)
					});
					else {
						if (n === e) return this.pause(), void this.cycle();
						var i = e > n ? "next" : "prev";
						this._slide(i, this._items[e])
					}
			}, t.dispose = function() {
				r.default(this._element).off(b), r.default.removeData(this._element, "bs.carousel"), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
			}, t._getConfig = function(e) {
				return e = l({}, x, e), f.typeCheckConfig(v, e, w), e
			}, t._handleSwipe = function() {
				var e = Math.abs(this.touchDeltaX);
				if (!(e <= 40)) {
					var t = e / this.touchDeltaX;
					this.touchDeltaX = 0, t > 0 && this.prev(), t < 0 && this.next()
				}
			}, t._addEventListeners = function() {
				var e = this;
				this._config.keyboard && r.default(this._element).on("keydown.bs.carousel", function(t) {
					return e._keydown(t)
				}), "hover" === this._config.pause && r.default(this._element).on("mouseenter.bs.carousel", function(t) {
					return e.pause(t)
				}).on("mouseleave.bs.carousel", function(t) {
					return e.cycle(t)
				}), this._config.touch && this._addTouchEventListeners()
			}, t._addTouchEventListeners = function() {
				var e = this;
				if (this._touchSupported) {
					var t = function(t) {
							e._pointerEvent && k[t.originalEvent.pointerType.toUpperCase()] ? e.touchStartX = t.originalEvent.clientX : e._pointerEvent || (e.touchStartX = t.originalEvent.touches[0].clientX)
						},
						n = function(t) {
							e._pointerEvent && k[t.originalEvent.pointerType.toUpperCase()] && (e.touchDeltaX = t.originalEvent.clientX - e.touchStartX), e._handleSwipe(), "hover" === e._config.pause && (e.pause(), e.touchTimeout && clearTimeout(e.touchTimeout), e.touchTimeout = setTimeout(function(t) {
								return e.cycle(t)
							}, 500 + e._config.interval))
						};
					r.default(this._element.querySelectorAll(".carousel-item img")).on("dragstart.bs.carousel", function(e) {
						return e.preventDefault()
					}), this._pointerEvent ? (r.default(this._element).on("pointerdown.bs.carousel", function(e) {
						return t(e)
					}), r.default(this._element).on("pointerup.bs.carousel", function(e) {
						return n(e)
					}), this._element.classList.add("pointer-event")) : (r.default(this._element).on("touchstart.bs.carousel", function(e) {
						return t(e)
					}), r.default(this._element).on("touchmove.bs.carousel", function(t) {
						return function(t) {
							e.touchDeltaX = t.originalEvent.touches && t.originalEvent.touches.length > 1 ? 0 : t.originalEvent.touches[0].clientX - e.touchStartX
						}(t)
					}), r.default(this._element).on("touchend.bs.carousel", function(e) {
						return n(e)
					}))
				}
			}, t._keydown = function(e) {
				if (!/input|textarea/i.test(e.target.tagName)) switch (e.which) {
					case 37:
						e.preventDefault(), this.prev();
						break;
					case 39:
						e.preventDefault(), this.next()
				}
			}, t._getItemIndex = function(e) {
				return this._items = e && e.parentNode ? [].slice.call(e.parentNode.querySelectorAll(".carousel-item")) : [], this._items.indexOf(e)
			}, t._getItemByDirection = function(e, t) {
				var n = "next" === e,
					i = "prev" === e,
					r = this._getItemIndex(t),
					o = this._items.length - 1;
				if ((i && 0 === r || n && r === o) && !this._config.wrap) return t;
				var a = (r + ("prev" === e ? -1 : 1)) % this._items.length;
				return -1 === a ? this._items[this._items.length - 1] : this._items[a]
			}, t._triggerSlideEvent = function(e, t) {
				var n = this._getItemIndex(e),
					i = this._getItemIndex(this._element.querySelector(".active.carousel-item")),
					o = r.default.Event("slide.bs.carousel", {
						relatedTarget: e,
						direction: t,
						from: i,
						to: n
					});
				return r.default(this._element).trigger(o), o
			}, t._setActiveIndicatorElement = function(e) {
				if (this._indicatorsElement) {
					var t = [].slice.call(this._indicatorsElement.querySelectorAll(".active"));
					r.default(t).removeClass("active");
					var n = this._indicatorsElement.children[this._getItemIndex(e)];
					n && r.default(n).addClass("active")
				}
			}, t._updateInterval = function() {
				var e = this._activeElement || this._element.querySelector(".active.carousel-item");
				if (e) {
					var t = parseInt(e.getAttribute("data-interval"), 10);
					t ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = t) : this._config.interval = this._config.defaultInterval || this._config.interval
				}
			}, t._slide = function(e, t) {
				var n, i, o, a = this,
					s = this._element.querySelector(".active.carousel-item"),
					l = this._getItemIndex(s),
					u = t || s && this._getItemByDirection(e, s),
					c = this._getItemIndex(u),
					d = Boolean(this._interval);
				if ("next" === e ? (n = "carousel-item-left", i = "carousel-item-next", o = "left") : (n = "carousel-item-right", i = "carousel-item-prev", o = "right"), u && r.default(u).hasClass("active")) this._isSliding = !1;
				else if (!this._triggerSlideEvent(u, o).isDefaultPrevented() && s && u) {
					this._isSliding = !0, d && this.pause(), this._setActiveIndicatorElement(u), this._activeElement = u;
					var h = r.default.Event("slid.bs.carousel", {
						relatedTarget: u,
						direction: o,
						from: l,
						to: c
					});
					if (r.default(this._element).hasClass("slide")) {
						r.default(u).addClass(i), f.reflow(u), r.default(s).addClass(n), r.default(u).addClass(n);
						var p = f.getTransitionDurationFromElement(s);
						r.default(s).one(f.TRANSITION_END, function() {
							r.default(u).removeClass(n + " " + i).addClass("active"), r.default(s).removeClass("active " + i + " " + n), a._isSliding = !1, setTimeout(function() {
								return r.default(a._element).trigger(h)
							}, 0)
						}).emulateTransitionEnd(p)
					} else r.default(s).removeClass("active"), r.default(u).addClass("active"), this._isSliding = !1, r.default(this._element).trigger(h);
					d && this.cycle()
				}
			}, e._jQueryInterface = function(t) {
				return this.each(function() {
					var n = r.default(this).data("bs.carousel"),
						i = l({}, x, r.default(this).data());
					"object" == typeof t && (i = l({}, i, t));
					var o = "string" == typeof t ? t : i.slide;
					if (n || (n = new e(this, i), r.default(this).data("bs.carousel", n)), "number" == typeof t) n.to(t);
					else if ("string" == typeof o) {
						if (void 0 === n[o]) throw new TypeError('No method named "' + o + '"');
						n[o]()
					} else i.interval && i.ride && (n.pause(), n.cycle())
				})
			}, e._dataApiClickHandler = function(t) {
				var n = f.getSelectorFromElement(this);
				if (n) {
					var i = r.default(n)[0];
					if (i && r.default(i).hasClass("carousel")) {
						var o = l({}, r.default(i).data(), r.default(this).data()),
							a = this.getAttribute("data-slide-to");
						a && (o.interval = !1), e._jQueryInterface.call(r.default(i), o), a && r.default(i).data("bs.carousel").to(a), t.preventDefault()
					}
				}
			}, s(e, null, [{
				key: "VERSION",
				get: function() {
					return "4.6.2"
				}
			}, {
				key: "Default",
				get: function() {
					return x
				}
			}]), e
		}();
	r.default(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", S._dataApiClickHandler), r.default(window).on("load.bs.carousel.data-api", function() {
		for (var e = [].slice.call(document.querySelectorAll('[data-ride="carousel"]')), t = 0, n = e.length; t < n; t++) {
			var i = r.default(e[t]);
			S._jQueryInterface.call(i, i.data())
		}
	}), r.default.fn[v] = S._jQueryInterface, r.default.fn[v].Constructor = S, r.default.fn[v].noConflict = function() {
		return r.default.fn[v] = y, S._jQueryInterface
	};
	var C = "collapse",
		T = r.default.fn[C],
		D = '[data-toggle="collapse"]',
		M = {
			toggle: !0,
			parent: ""
		},
		E = {
			toggle: "boolean",
			parent: "(string|element)"
		},
		A = function() {
			function e(e, t) {
				this._isTransitioning = !1, this._element = e, this._config = this._getConfig(t), this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));
				for (var n = [].slice.call(document.querySelectorAll(D)), i = 0, r = n.length; i < r; i++) {
					var o = n[i],
						a = f.getSelectorFromElement(o),
						s = [].slice.call(document.querySelectorAll(a)).filter(function(t) {
							return t === e
						});
					null !== a && s.length > 0 && (this._selector = a, this._triggerArray.push(o))
				}
				this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
			}
			var t = e.prototype;
			return t.toggle = function() {
				r.default(this._element).hasClass("show") ? this.hide() : this.show()
			}, t.show = function() {
				var t, n, i = this;
				if (!this._isTransitioning && !r.default(this._element).hasClass("show") && (this._parent && 0 === (t = [].slice.call(this._parent.querySelectorAll(".show, .collapsing")).filter(function(e) {
						return "string" == typeof i._config.parent ? e.getAttribute("data-parent") === i._config.parent : e.classList.contains("collapse")
					})).length && (t = null), !(t && (n = r.default(t).not(this._selector).data("bs.collapse")) && n._isTransitioning))) {
					var o = r.default.Event("show.bs.collapse");
					if (r.default(this._element).trigger(o), !o.isDefaultPrevented()) {
						t && (e._jQueryInterface.call(r.default(t).not(this._selector), "hide"), n || r.default(t).data("bs.collapse", null));
						var a = this._getDimension();
						r.default(this._element).removeClass("collapse").addClass("collapsing"), this._element.style[a] = 0, this._triggerArray.length && r.default(this._triggerArray).removeClass("collapsed").attr("aria-expanded", !0), this.setTransitioning(!0);
						var s = "scroll" + (a[0].toUpperCase() + a.slice(1)),
							l = f.getTransitionDurationFromElement(this._element);
						r.default(this._element).one(f.TRANSITION_END, function() {
							r.default(i._element).removeClass("collapsing").addClass("collapse show"), i._element.style[a] = "", i.setTransitioning(!1), r.default(i._element).trigger("shown.bs.collapse")
						}).emulateTransitionEnd(l), this._element.style[a] = this._element[s] + "px"
					}
				}
			}, t.hide = function() {
				var e = this;
				if (!this._isTransitioning && r.default(this._element).hasClass("show")) {
					var t = r.default.Event("hide.bs.collapse");
					if (r.default(this._element).trigger(t), !t.isDefaultPrevented()) {
						var n = this._getDimension();
						this._element.style[n] = this._element.getBoundingClientRect()[n] + "px", f.reflow(this._element), r.default(this._element).addClass("collapsing").removeClass("collapse show");
						var i = this._triggerArray.length;
						if (i > 0)
							for (var o = 0; o < i; o++) {
								var a = this._triggerArray[o],
									s = f.getSelectorFromElement(a);
								if (null !== s) r.default([].slice.call(document.querySelectorAll(s))).hasClass("show") || r.default(a).addClass("collapsed").attr("aria-expanded", !1)
							}
						this.setTransitioning(!0);
						this._element.style[n] = "";
						var l = f.getTransitionDurationFromElement(this._element);
						r.default(this._element).one(f.TRANSITION_END, function() {
							e.setTransitioning(!1), r.default(e._element).removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
						}).emulateTransitionEnd(l)
					}
				}
			}, t.setTransitioning = function(e) {
				this._isTransitioning = e
			}, t.dispose = function() {
				r.default.removeData(this._element, "bs.collapse"), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
			}, t._getConfig = function(e) {
				return (e = l({}, M, e)).toggle = Boolean(e.toggle), f.typeCheckConfig(C, e, E), e
			}, t._getDimension = function() {
				return r.default(this._element).hasClass("width") ? "width" : "height"
			}, t._getParent = function() {
				var t, n = this;
				f.isElement(this._config.parent) ? (t = this._config.parent, void 0 !== this._config.parent.jquery && (t = this._config.parent[0])) : t = document.querySelector(this._config.parent);
				var i = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
					o = [].slice.call(t.querySelectorAll(i));
				return r.default(o).each(function(t, i) {
					n._addAriaAndCollapsedClass(e._getTargetFromElement(i), [i])
				}), t
			}, t._addAriaAndCollapsedClass = function(e, t) {
				var n = r.default(e).hasClass("show");
				t.length && r.default(t).toggleClass("collapsed", !n).attr("aria-expanded", n)
			}, e._getTargetFromElement = function(e) {
				var t = f.getSelectorFromElement(e);
				return t ? document.querySelector(t) : null
			}, e._jQueryInterface = function(t) {
				return this.each(function() {
					var n = r.default(this),
						i = n.data("bs.collapse"),
						o = l({}, M, n.data(), "object" == typeof t && t ? t : {});
					if (!i && o.toggle && "string" == typeof t && /show|hide/.test(t) && (o.toggle = !1), i || (i = new e(this, o), n.data("bs.collapse", i)), "string" == typeof t) {
						if (void 0 === i[t]) throw new TypeError('No method named "' + t + '"');
						i[t]()
					}
				})
			}, s(e, null, [{
				key: "VERSION",
				get: function() {
					return "4.6.2"
				}
			}, {
				key: "Default",
				get: function() {
					return M
				}
			}]), e
		}();
	r.default(document).on("click.bs.collapse.data-api", D, function(e) {
		"A" === e.currentTarget.tagName && e.preventDefault();
		var t = r.default(this),
			n = f.getSelectorFromElement(this),
			i = [].slice.call(document.querySelectorAll(n));
		r.default(i).each(function() {
			var e = r.default(this),
				n = e.data("bs.collapse") ? "toggle" : t.data();
			A._jQueryInterface.call(e, n)
		})
	}), r.default.fn[C] = A._jQueryInterface, r.default.fn[C].Constructor = A, r.default.fn[C].noConflict = function() {
		return r.default.fn[C] = T, A._jQueryInterface
	};
	var P = "dropdown",
		O = r.default.fn[P],
		N = new RegExp("38|40|27"),
		R = {
			offset: 0,
			flip: !0,
			boundary: "scrollParent",
			reference: "toggle",
			display: "dynamic",
			popperConfig: null
		},
		I = {
			offset: "(number|string|function)",
			flip: "boolean",
			boundary: "(string|element)",
			reference: "(string|element)",
			display: "string",
			popperConfig: "(null|object)"
		},
		L = function() {
			function e(e, t) {
				this._element = e, this._popper = null, this._config = this._getConfig(t), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
			}
			var t = e.prototype;
			return t.toggle = function() {
				if (!this._element.disabled && !r.default(this._element).hasClass("disabled")) {
					var t = r.default(this._menu).hasClass("show");
					e._clearMenus(), t || this.show(!0)
				}
			}, t.show = function(t) {
				if (void 0 === t && (t = !1), !(this._element.disabled || r.default(this._element).hasClass("disabled") || r.default(this._menu).hasClass("show"))) {
					var n = {
							relatedTarget: this._element
						},
						i = r.default.Event("show.bs.dropdown", n),
						a = e._getParentFromElement(this._element);
					if (r.default(a).trigger(i), !i.isDefaultPrevented()) {
						if (!this._inNavbar && t) {
							if (void 0 === o.default) throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
							var s = this._element;
							"parent" === this._config.reference ? s = a : f.isElement(this._config.reference) && (s = this._config.reference, void 0 !== this._config.reference.jquery && (s = this._config.reference[0])), "scrollParent" !== this._config.boundary && r.default(a).addClass("position-static"), this._popper = new o.default(s, this._menu, this._getPopperConfig())
						}
						"ontouchstart" in document.documentElement && 0 === r.default(a).closest(".navbar-nav").length && r.default(document.body).children().on("mouseover", null, r.default.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), r.default(this._menu).toggleClass("show"), r.default(a).toggleClass("show").trigger(r.default.Event("shown.bs.dropdown", n))
					}
				}
			}, t.hide = function() {
				if (!this._element.disabled && !r.default(this._element).hasClass("disabled") && r.default(this._menu).hasClass("show")) {
					var t = {
							relatedTarget: this._element
						},
						n = r.default.Event("hide.bs.dropdown", t),
						i = e._getParentFromElement(this._element);
					r.default(i).trigger(n), n.isDefaultPrevented() || (this._popper && this._popper.destroy(), r.default(this._menu).toggleClass("show"), r.default(i).toggleClass("show").trigger(r.default.Event("hidden.bs.dropdown", t)))
				}
			}, t.dispose = function() {
				r.default.removeData(this._element, "bs.dropdown"), r.default(this._element).off(".bs.dropdown"), this._element = null, this._menu = null, null !== this._popper && (this._popper.destroy(), this._popper = null)
			}, t.update = function() {
				this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
			}, t._addEventListeners = function() {
				var e = this;
				r.default(this._element).on("click.bs.dropdown", function(t) {
					t.preventDefault(), t.stopPropagation(), e.toggle()
				})
			}, t._getConfig = function(e) {
				return e = l({}, this.constructor.Default, r.default(this._element).data(), e), f.typeCheckConfig(P, e, this.constructor.DefaultType), e
			}, t._getMenuElement = function() {
				if (!this._menu) {
					var t = e._getParentFromElement(this._element);
					t && (this._menu = t.querySelector(".dropdown-menu"))
				}
				return this._menu
			}, t._getPlacement = function() {
				var e = r.default(this._element.parentNode),
					t = "bottom-start";
				return e.hasClass("dropup") ? t = r.default(this._menu).hasClass("dropdown-menu-right") ? "top-end" : "top-start" : e.hasClass("dropright") ? t = "right-start" : e.hasClass("dropleft") ? t = "left-start" : r.default(this._menu).hasClass("dropdown-menu-right") && (t = "bottom-end"), t
			}, t._detectNavbar = function() {
				return r.default(this._element).closest(".navbar").length > 0
			}, t._getOffset = function() {
				var e = this,
					t = {};
				return "function" == typeof this._config.offset ? t.fn = function(t) {
					return t.offsets = l({}, t.offsets, e._config.offset(t.offsets, e._element)), t
				} : t.offset = this._config.offset, t
			}, t._getPopperConfig = function() {
				var e = {
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
				return "static" === this._config.display && (e.modifiers.applyStyle = {
					enabled: !1
				}), l({}, e, this._config.popperConfig)
			}, e._jQueryInterface = function(t) {
				return this.each(function() {
					var n = r.default(this).data("bs.dropdown");
					if (n || (n = new e(this, "object" == typeof t ? t : null), r.default(this).data("bs.dropdown", n)), "string" == typeof t) {
						if (void 0 === n[t]) throw new TypeError('No method named "' + t + '"');
						n[t]()
					}
				})
			}, e._clearMenus = function(t) {
				if (!t || 3 !== t.which && ("keyup" !== t.type || 9 === t.which))
					for (var n = [].slice.call(document.querySelectorAll('[data-toggle="dropdown"]')), i = 0, o = n.length; i < o; i++) {
						var a = e._getParentFromElement(n[i]),
							s = r.default(n[i]).data("bs.dropdown"),
							l = {
								relatedTarget: n[i]
							};
						if (t && "click" === t.type && (l.clickEvent = t), s) {
							var u = s._menu;
							if (r.default(a).hasClass("show") && !(t && ("click" === t.type && /input|textarea/i.test(t.target.tagName) || "keyup" === t.type && 9 === t.which) && r.default.contains(a, t.target))) {
								var c = r.default.Event("hide.bs.dropdown", l);
								r.default(a).trigger(c), c.isDefaultPrevented() || ("ontouchstart" in document.documentElement && r.default(document.body).children().off("mouseover", null, r.default.noop), n[i].setAttribute("aria-expanded", "false"), s._popper && s._popper.destroy(), r.default(u).removeClass("show"), r.default(a).removeClass("show").trigger(r.default.Event("hidden.bs.dropdown", l)))
							}
						}
					}
			}, e._getParentFromElement = function(e) {
				var t, n = f.getSelectorFromElement(e);
				return n && (t = document.querySelector(n)), t || e.parentNode
			}, e._dataApiKeydownHandler = function(t) {
				if ((/input|textarea/i.test(t.target.tagName) ? !(32 === t.which || 27 !== t.which && (40 !== t.which && 38 !== t.which || r.default(t.target).closest(".dropdown-menu").length)) : N.test(t.which)) && !this.disabled && !r.default(this).hasClass("disabled")) {
					var n = e._getParentFromElement(this),
						i = r.default(n).hasClass("show");
					if (i || 27 !== t.which) {
						if (t.preventDefault(), t.stopPropagation(), !i || 27 === t.which || 32 === t.which) return 27 === t.which && r.default(n.querySelector('[data-toggle="dropdown"]')).trigger("focus"), void r.default(this).trigger("click");
						var o = [].slice.call(n.querySelectorAll(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)")).filter(function(e) {
							return r.default(e).is(":visible")
						});
						if (0 !== o.length) {
							var a = o.indexOf(t.target);
							38 === t.which && a > 0 && a--, 40 === t.which && a < o.length - 1 && a++, a < 0 && (a = 0), o[a].focus()
						}
					}
				}
			}, s(e, null, [{
				key: "VERSION",
				get: function() {
					return "4.6.2"
				}
			}, {
				key: "Default",
				get: function() {
					return R
				}
			}, {
				key: "DefaultType",
				get: function() {
					return I
				}
			}]), e
		}();
	r.default(document).on("keydown.bs.dropdown.data-api", '[data-toggle="dropdown"]', L._dataApiKeydownHandler).on("keydown.bs.dropdown.data-api", ".dropdown-menu", L._dataApiKeydownHandler).on("click.bs.dropdown.data-api keyup.bs.dropdown.data-api", L._clearMenus).on("click.bs.dropdown.data-api", '[data-toggle="dropdown"]', function(e) {
		e.preventDefault(), e.stopPropagation(), L._jQueryInterface.call(r.default(this), "toggle")
	}).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
		e.stopPropagation()
	}), r.default.fn[P] = L._jQueryInterface, r.default.fn[P].Constructor = L, r.default.fn[P].noConflict = function() {
		return r.default.fn[P] = O, L._jQueryInterface
	};
	var F = r.default.fn.modal,
		j = ".modal-dialog",
		W = {
			backdrop: !0,
			keyboard: !0,
			focus: !0,
			show: !0
		},
		z = {
			backdrop: "(boolean|string)",
			keyboard: "boolean",
			focus: "boolean",
			show: "boolean"
		},
		V = function() {
			function e(e, t) {
				this._config = this._getConfig(t), this._element = e, this._dialog = e.querySelector(j), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0
			}
			var t = e.prototype;
			return t.toggle = function(e) {
				return this._isShown ? this.hide() : this.show(e)
			}, t.show = function(e) {
				var t = this;
				if (!this._isShown && !this._isTransitioning) {
					var n = r.default.Event("show.bs.modal", {
						relatedTarget: e
					});
					r.default(this._element).trigger(n), n.isDefaultPrevented() || (this._isShown = !0, r.default(this._element).hasClass("fade") && (this._isTransitioning = !0), this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), r.default(this._element).on("click.dismiss.bs.modal", '[data-dismiss="modal"]', function(e) {
						return t.hide(e)
					}), r.default(this._dialog).on("mousedown.dismiss.bs.modal", function() {
						r.default(t._element).one("mouseup.dismiss.bs.modal", function(e) {
							r.default(e.target).is(t._element) && (t._ignoreBackdropClick = !0)
						})
					}), this._showBackdrop(function() {
						return t._showElement(e)
					}))
				}
			}, t.hide = function(e) {
				var t = this;
				if (e && e.preventDefault(), this._isShown && !this._isTransitioning) {
					var n = r.default.Event("hide.bs.modal");
					if (r.default(this._element).trigger(n), this._isShown && !n.isDefaultPrevented()) {
						this._isShown = !1;
						var i = r.default(this._element).hasClass("fade");
						if (i && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), r.default(document).off("focusin.bs.modal"), r.default(this._element).removeClass("show"), r.default(this._element).off("click.dismiss.bs.modal"), r.default(this._dialog).off("mousedown.dismiss.bs.modal"), i) {
							var o = f.getTransitionDurationFromElement(this._element);
							r.default(this._element).one(f.TRANSITION_END, function(e) {
								return t._hideModal(e)
							}).emulateTransitionEnd(o)
						} else this._hideModal()
					}
				}
			}, t.dispose = function() {
				[window, this._element, this._dialog].forEach(function(e) {
					return r.default(e).off(".bs.modal")
				}), r.default(document).off("focusin.bs.modal"), r.default.removeData(this._element, "bs.modal"), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null
			}, t.handleUpdate = function() {
				this._adjustDialog()
			}, t._getConfig = function(e) {
				return e = l({}, W, e), f.typeCheckConfig("modal", e, z), e
			}, t._triggerBackdropTransition = function() {
				var e = this,
					t = r.default.Event("hidePrevented.bs.modal");
				if (r.default(this._element).trigger(t), !t.isDefaultPrevented()) {
					var n = this._element.scrollHeight > document.documentElement.clientHeight;
					n || (this._element.style.overflowY = "hidden"), this._element.classList.add("modal-static");
					var i = f.getTransitionDurationFromElement(this._dialog);
					r.default(this._element).off(f.TRANSITION_END), r.default(this._element).one(f.TRANSITION_END, function() {
						e._element.classList.remove("modal-static"), n || r.default(e._element).one(f.TRANSITION_END, function() {
							e._element.style.overflowY = ""
						}).emulateTransitionEnd(e._element, i)
					}).emulateTransitionEnd(i), this._element.focus()
				}
			}, t._showElement = function(e) {
				var t = this,
					n = r.default(this._element).hasClass("fade"),
					i = this._dialog ? this._dialog.querySelector(".modal-body") : null;
				this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), r.default(this._dialog).hasClass("modal-dialog-scrollable") && i ? i.scrollTop = 0 : this._element.scrollTop = 0, n && f.reflow(this._element), r.default(this._element).addClass("show"), this._config.focus && this._enforceFocus();
				var o = r.default.Event("shown.bs.modal", {
						relatedTarget: e
					}),
					a = function() {
						t._config.focus && t._element.focus(), t._isTransitioning = !1, r.default(t._element).trigger(o)
					};
				if (n) {
					var s = f.getTransitionDurationFromElement(this._dialog);
					r.default(this._dialog).one(f.TRANSITION_END, a).emulateTransitionEnd(s)
				} else a()
			}, t._enforceFocus = function() {
				var e = this;
				r.default(document).off("focusin.bs.modal").on("focusin.bs.modal", function(t) {
					document !== t.target && e._element !== t.target && 0 === r.default(e._element).has(t.target).length && e._element.focus()
				})
			}, t._setEscapeEvent = function() {
				var e = this;
				this._isShown ? r.default(this._element).on("keydown.dismiss.bs.modal", function(t) {
					e._config.keyboard && 27 === t.which ? (t.preventDefault(), e.hide()) : e._config.keyboard || 27 !== t.which || e._triggerBackdropTransition()
				}) : this._isShown || r.default(this._element).off("keydown.dismiss.bs.modal")
			}, t._setResizeEvent = function() {
				var e = this;
				this._isShown ? r.default(window).on("resize.bs.modal", function(t) {
					return e.handleUpdate(t)
				}) : r.default(window).off("resize.bs.modal")
			}, t._hideModal = function() {
				var e = this;
				this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._showBackdrop(function() {
					r.default(document.body).removeClass("modal-open"), e._resetAdjustments(), e._resetScrollbar(), r.default(e._element).trigger("hidden.bs.modal")
				})
			}, t._removeBackdrop = function() {
				this._backdrop && (r.default(this._backdrop).remove(), this._backdrop = null)
			}, t._showBackdrop = function(e) {
				var t = this,
					n = r.default(this._element).hasClass("fade") ? "fade" : "";
				if (this._isShown && this._config.backdrop) {
					if (this._backdrop = document.createElement("div"), this._backdrop.className = "modal-backdrop", n && this._backdrop.classList.add(n), r.default(this._backdrop).appendTo(document.body), r.default(this._element).on("click.dismiss.bs.modal", function(e) {
							t._ignoreBackdropClick ? t._ignoreBackdropClick = !1 : e.target === e.currentTarget && ("static" === t._config.backdrop ? t._triggerBackdropTransition() : t.hide())
						}), n && f.reflow(this._backdrop), r.default(this._backdrop).addClass("show"), !e) return;
					if (!n) return void e();
					var i = f.getTransitionDurationFromElement(this._backdrop);
					r.default(this._backdrop).one(f.TRANSITION_END, e).emulateTransitionEnd(i)
				} else if (!this._isShown && this._backdrop) {
					r.default(this._backdrop).removeClass("show");
					var o = function() {
						t._removeBackdrop(), e && e()
					};
					if (r.default(this._element).hasClass("fade")) {
						var a = f.getTransitionDurationFromElement(this._backdrop);
						r.default(this._backdrop).one(f.TRANSITION_END, o).emulateTransitionEnd(a)
					} else o()
				} else e && e()
			}, t._adjustDialog = function() {
				var e = this._element.scrollHeight > document.documentElement.clientHeight;
				!this._isBodyOverflowing && e && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !e && (this._element.style.paddingRight = this._scrollbarWidth + "px")
			}, t._resetAdjustments = function() {
				this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
			}, t._checkScrollbar = function() {
				var e = document.body.getBoundingClientRect();
				this._isBodyOverflowing = Math.round(e.left + e.right) < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
			}, t._setScrollbar = function() {
				var e = this;
				if (this._isBodyOverflowing) {
					var t = [].slice.call(document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top")),
						n = [].slice.call(document.querySelectorAll(".sticky-top"));
					r.default(t).each(function(t, n) {
						var i = n.style.paddingRight,
							o = r.default(n).css("padding-right");
						r.default(n).data("padding-right", i).css("padding-right", parseFloat(o) + e._scrollbarWidth + "px")
					}), r.default(n).each(function(t, n) {
						var i = n.style.marginRight,
							o = r.default(n).css("margin-right");
						r.default(n).data("margin-right", i).css("margin-right", parseFloat(o) - e._scrollbarWidth + "px")
					});
					var i = document.body.style.paddingRight,
						o = r.default(document.body).css("padding-right");
					r.default(document.body).data("padding-right", i).css("padding-right", parseFloat(o) + this._scrollbarWidth + "px")
				}
				r.default(document.body).addClass("modal-open")
			}, t._resetScrollbar = function() {
				var e = [].slice.call(document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"));
				r.default(e).each(function(e, t) {
					var n = r.default(t).data("padding-right");
					r.default(t).removeData("padding-right"), t.style.paddingRight = n || ""
				});
				var t = [].slice.call(document.querySelectorAll(".sticky-top"));
				r.default(t).each(function(e, t) {
					var n = r.default(t).data("margin-right");
					void 0 !== n && r.default(t).css("margin-right", n).removeData("margin-right")
				});
				var n = r.default(document.body).data("padding-right");
				r.default(document.body).removeData("padding-right"), document.body.style.paddingRight = n || ""
			}, t._getScrollbarWidth = function() {
				var e = document.createElement("div");
				e.className = "modal-scrollbar-measure", document.body.appendChild(e);
				var t = e.getBoundingClientRect().width - e.clientWidth;
				return document.body.removeChild(e), t
			}, e._jQueryInterface = function(t, n) {
				return this.each(function() {
					var i = r.default(this).data("bs.modal"),
						o = l({}, W, r.default(this).data(), "object" == typeof t && t ? t : {});
					if (i || (i = new e(this, o), r.default(this).data("bs.modal", i)), "string" == typeof t) {
						if (void 0 === i[t]) throw new TypeError('No method named "' + t + '"');
						i[t](n)
					} else o.show && i.show(n)
				})
			}, s(e, null, [{
				key: "VERSION",
				get: function() {
					return "4.6.2"
				}
			}, {
				key: "Default",
				get: function() {
					return W
				}
			}]), e
		}();
	r.default(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(e) {
		var t, n = this,
			i = f.getSelectorFromElement(this);
		i && (t = document.querySelector(i));
		var o = r.default(t).data("bs.modal") ? "toggle" : l({}, r.default(t).data(), r.default(this).data());
		"A" !== this.tagName && "AREA" !== this.tagName || e.preventDefault();
		var a = r.default(t).one("show.bs.modal", function(e) {
			e.isDefaultPrevented() || a.one("hidden.bs.modal", function() {
				r.default(n).is(":visible") && n.focus()
			})
		});
		V._jQueryInterface.call(r.default(t), o, this)
	}), r.default.fn.modal = V._jQueryInterface, r.default.fn.modal.Constructor = V, r.default.fn.modal.noConflict = function() {
		return r.default.fn.modal = F, V._jQueryInterface
	};
	var H = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
		B = {
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
			img: ["src", "srcset", "alt", "title", "width", "height"],
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
		},
		q = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i,
		Y = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

	function U(e, t, n) {
		if (0 === e.length) return e;
		if (n && "function" == typeof n) return n(e);
		for (var i = (new window.DOMParser).parseFromString(e, "text/html"), r = Object.keys(t), o = [].slice.call(i.body.querySelectorAll("*")), a = function(e, n) {
				var i = o[e],
					a = i.nodeName.toLowerCase();
				if (-1 === r.indexOf(i.nodeName.toLowerCase())) return i.parentNode.removeChild(i), "continue";
				var s = [].slice.call(i.attributes),
					l = [].concat(t["*"] || [], t[a] || []);
				s.forEach(function(e) {
					(function(e, t) {
						var n = e.nodeName.toLowerCase();
						if (-1 !== t.indexOf(n)) return -1 === H.indexOf(n) || Boolean(q.test(e.nodeValue) || Y.test(e.nodeValue));
						for (var i = t.filter(function(e) {
								return e instanceof RegExp
							}), r = 0, o = i.length; r < o; r++)
							if (i[r].test(n)) return !0;
						return !1
					})(e, l) || i.removeAttribute(e.nodeName)
				})
			}, s = 0, l = o.length; s < l; s++) a(s);
		return i.body.innerHTML
	}
	var $ = "tooltip",
		G = r.default.fn.tooltip,
		Q = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
		X = ["sanitize", "whiteList", "sanitizeFn"],
		J = {
			AUTO: "auto",
			TOP: "top",
			RIGHT: "right",
			BOTTOM: "bottom",
			LEFT: "left"
		},
		Z = {
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
			customClass: "",
			sanitize: !0,
			sanitizeFn: null,
			whiteList: B,
			popperConfig: null
		},
		K = {
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
			customClass: "(string|function)",
			sanitize: "boolean",
			sanitizeFn: "(null|function)",
			whiteList: "object",
			popperConfig: "(null|object)"
		},
		ee = {
			HIDE: "hide.bs.tooltip",
			HIDDEN: "hidden.bs.tooltip",
			SHOW: "show.bs.tooltip",
			SHOWN: "shown.bs.tooltip",
			INSERTED: "inserted.bs.tooltip",
			CLICK: "click.bs.tooltip",
			FOCUSIN: "focusin.bs.tooltip",
			FOCUSOUT: "focusout.bs.tooltip",
			MOUSEENTER: "mouseenter.bs.tooltip",
			MOUSELEAVE: "mouseleave.bs.tooltip"
		},
		te = function() {
			function e(e, t) {
				if (void 0 === o.default) throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
				this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = e, this.config = this._getConfig(t), this.tip = null, this._setListeners()
			}
			var t = e.prototype;
			return t.enable = function() {
				this._isEnabled = !0
			}, t.disable = function() {
				this._isEnabled = !1
			}, t.toggleEnabled = function() {
				this._isEnabled = !this._isEnabled
			}, t.toggle = function(e) {
				if (this._isEnabled)
					if (e) {
						var t = this.constructor.DATA_KEY,
							n = r.default(e.currentTarget).data(t);
						n || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), r.default(e.currentTarget).data(t, n)), n._activeTrigger.click = !n._activeTrigger.click, n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n)
					} else {
						if (r.default(this.getTipElement()).hasClass("show")) return void this._leave(null, this);
						this._enter(null, this)
					}
			}, t.dispose = function() {
				clearTimeout(this._timeout), r.default.removeData(this.element, this.constructor.DATA_KEY), r.default(this.element).off(this.constructor.EVENT_KEY), r.default(this.element).closest(".modal").off("hide.bs.modal", this._hideModalHandler), this.tip && r.default(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
			}, t.show = function() {
				var e = this;
				if ("none" === r.default(this.element).css("display")) throw new Error("Please use show on visible elements");
				var t = r.default.Event(this.constructor.Event.SHOW);
				if (this.isWithContent() && this._isEnabled) {
					r.default(this.element).trigger(t);
					var n = f.findShadowRoot(this.element),
						i = r.default.contains(null !== n ? n : this.element.ownerDocument.documentElement, this.element);
					if (t.isDefaultPrevented() || !i) return;
					var a = this.getTipElement(),
						s = f.getUID(this.constructor.NAME);
					a.setAttribute("id", s), this.element.setAttribute("aria-describedby", s), this.setContent(), this.config.animation && r.default(a).addClass("fade");
					var l = "function" == typeof this.config.placement ? this.config.placement.call(this, a, this.element) : this.config.placement,
						u = this._getAttachment(l);
					this.addAttachmentClass(u);
					var c = this._getContainer();
					r.default(a).data(this.constructor.DATA_KEY, this), r.default.contains(this.element.ownerDocument.documentElement, this.tip) || r.default(a).appendTo(c), r.default(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new o.default(this.element, a, this._getPopperConfig(u)), r.default(a).addClass("show"), r.default(a).addClass(this.config.customClass), "ontouchstart" in document.documentElement && r.default(document.body).children().on("mouseover", null, r.default.noop);
					var d = function() {
						e.config.animation && e._fixTransition();
						var t = e._hoverState;
						e._hoverState = null, r.default(e.element).trigger(e.constructor.Event.SHOWN), "out" === t && e._leave(null, e)
					};
					if (r.default(this.tip).hasClass("fade")) {
						var h = f.getTransitionDurationFromElement(this.tip);
						r.default(this.tip).one(f.TRANSITION_END, d).emulateTransitionEnd(h)
					} else d()
				}
			}, t.hide = function(e) {
				var t = this,
					n = this.getTipElement(),
					i = r.default.Event(this.constructor.Event.HIDE),
					o = function() {
						"show" !== t._hoverState && n.parentNode && n.parentNode.removeChild(n), t._cleanTipClass(), t.element.removeAttribute("aria-describedby"), r.default(t.element).trigger(t.constructor.Event.HIDDEN), null !== t._popper && t._popper.destroy(), e && e()
					};
				if (r.default(this.element).trigger(i), !i.isDefaultPrevented()) {
					if (r.default(n).removeClass("show"), "ontouchstart" in document.documentElement && r.default(document.body).children().off("mouseover", null, r.default.noop), this._activeTrigger.click = !1, this._activeTrigger.focus = !1, this._activeTrigger.hover = !1, r.default(this.tip).hasClass("fade")) {
						var a = f.getTransitionDurationFromElement(n);
						r.default(n).one(f.TRANSITION_END, o).emulateTransitionEnd(a)
					} else o();
					this._hoverState = ""
				}
			}, t.update = function() {
				null !== this._popper && this._popper.scheduleUpdate()
			}, t.isWithContent = function() {
				return Boolean(this.getTitle())
			}, t.addAttachmentClass = function(e) {
				r.default(this.getTipElement()).addClass("bs-tooltip-" + e)
			}, t.getTipElement = function() {
				return this.tip = this.tip || r.default(this.config.template)[0], this.tip
			}, t.setContent = function() {
				var e = this.getTipElement();
				this.setElementContent(r.default(e.querySelectorAll(".tooltip-inner")), this.getTitle()), r.default(e).removeClass("fade show")
			}, t.setElementContent = function(e, t) {
				"object" != typeof t || !t.nodeType && !t.jquery ? this.config.html ? (this.config.sanitize && (t = U(t, this.config.whiteList, this.config.sanitizeFn)), e.html(t)) : e.text(t) : this.config.html ? r.default(t).parent().is(e) || e.empty().append(t) : e.text(r.default(t).text())
			}, t.getTitle = function() {
				var e = this.element.getAttribute("data-original-title");
				return e || (e = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), e
			}, t._getPopperConfig = function(e) {
				var t = this;
				return l({}, {
					placement: e,
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
					onCreate: function(e) {
						e.originalPlacement !== e.placement && t._handlePopperPlacementChange(e)
					},
					onUpdate: function(e) {
						return t._handlePopperPlacementChange(e)
					}
				}, this.config.popperConfig)
			}, t._getOffset = function() {
				var e = this,
					t = {};
				return "function" == typeof this.config.offset ? t.fn = function(t) {
					return t.offsets = l({}, t.offsets, e.config.offset(t.offsets, e.element)), t
				} : t.offset = this.config.offset, t
			}, t._getContainer = function() {
				return !1 === this.config.container ? document.body : f.isElement(this.config.container) ? r.default(this.config.container) : r.default(document).find(this.config.container)
			}, t._getAttachment = function(e) {
				return J[e.toUpperCase()]
			}, t._setListeners = function() {
				var e = this;
				this.config.trigger.split(" ").forEach(function(t) {
					if ("click" === t) r.default(e.element).on(e.constructor.Event.CLICK, e.config.selector, function(t) {
						return e.toggle(t)
					});
					else if ("manual" !== t) {
						var n = "hover" === t ? e.constructor.Event.MOUSEENTER : e.constructor.Event.FOCUSIN,
							i = "hover" === t ? e.constructor.Event.MOUSELEAVE : e.constructor.Event.FOCUSOUT;
						r.default(e.element).on(n, e.config.selector, function(t) {
							return e._enter(t)
						}).on(i, e.config.selector, function(t) {
							return e._leave(t)
						})
					}
				}), this._hideModalHandler = function() {
					e.element && e.hide()
				}, r.default(this.element).closest(".modal").on("hide.bs.modal", this._hideModalHandler), this.config.selector ? this.config = l({}, this.config, {
					trigger: "manual",
					selector: ""
				}) : this._fixTitle()
			}, t._fixTitle = function() {
				var e = typeof this.element.getAttribute("data-original-title");
				(this.element.getAttribute("title") || "string" !== e) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
			}, t._enter = function(e, t) {
				var n = this.constructor.DATA_KEY;
				(t = t || r.default(e.currentTarget).data(n)) || (t = new this.constructor(e.currentTarget, this._getDelegateConfig()), r.default(e.currentTarget).data(n, t)), e && (t._activeTrigger["focusin" === e.type ? "focus" : "hover"] = !0), r.default(t.getTipElement()).hasClass("show") || "show" === t._hoverState ? t._hoverState = "show" : (clearTimeout(t._timeout), t._hoverState = "show", t.config.delay && t.config.delay.show ? t._timeout = setTimeout(function() {
					"show" === t._hoverState && t.show()
				}, t.config.delay.show) : t.show())
			}, t._leave = function(e, t) {
				var n = this.constructor.DATA_KEY;
				(t = t || r.default(e.currentTarget).data(n)) || (t = new this.constructor(e.currentTarget, this._getDelegateConfig()), r.default(e.currentTarget).data(n, t)), e && (t._activeTrigger["focusout" === e.type ? "focus" : "hover"] = !1), t._isWithActiveTrigger() || (clearTimeout(t._timeout), t._hoverState = "out", t.config.delay && t.config.delay.hide ? t._timeout = setTimeout(function() {
					"out" === t._hoverState && t.hide()
				}, t.config.delay.hide) : t.hide())
			}, t._isWithActiveTrigger = function() {
				for (var e in this._activeTrigger)
					if (this._activeTrigger[e]) return !0;
				return !1
			}, t._getConfig = function(e) {
				var t = r.default(this.element).data();
				return Object.keys(t).forEach(function(e) {
					-1 !== X.indexOf(e) && delete t[e]
				}), "number" == typeof(e = l({}, this.constructor.Default, t, "object" == typeof e && e ? e : {})).delay && (e.delay = {
					show: e.delay,
					hide: e.delay
				}), "number" == typeof e.title && (e.title = e.title.toString()), "number" == typeof e.content && (e.content = e.content.toString()), f.typeCheckConfig($, e, this.constructor.DefaultType), e.sanitize && (e.template = U(e.template, e.whiteList, e.sanitizeFn)), e
			}, t._getDelegateConfig = function() {
				var e = {};
				if (this.config)
					for (var t in this.config) this.constructor.Default[t] !== this.config[t] && (e[t] = this.config[t]);
				return e
			}, t._cleanTipClass = function() {
				var e = r.default(this.getTipElement()),
					t = e.attr("class").match(Q);
				null !== t && t.length && e.removeClass(t.join(""))
			}, t._handlePopperPlacementChange = function(e) {
				this.tip = e.instance.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(e.placement))
			}, t._fixTransition = function() {
				var e = this.getTipElement(),
					t = this.config.animation;
				null === e.getAttribute("x-placement") && (r.default(e).removeClass("fade"), this.config.animation = !1, this.hide(), this.show(), this.config.animation = t)
			}, e._jQueryInterface = function(t) {
				return this.each(function() {
					var n = r.default(this),
						i = n.data("bs.tooltip"),
						o = "object" == typeof t && t;
					if ((i || !/dispose|hide/.test(t)) && (i || (i = new e(this, o), n.data("bs.tooltip", i)), "string" == typeof t)) {
						if (void 0 === i[t]) throw new TypeError('No method named "' + t + '"');
						i[t]()
					}
				})
			}, s(e, null, [{
				key: "VERSION",
				get: function() {
					return "4.6.2"
				}
			}, {
				key: "Default",
				get: function() {
					return Z
				}
			}, {
				key: "NAME",
				get: function() {
					return $
				}
			}, {
				key: "DATA_KEY",
				get: function() {
					return "bs.tooltip"
				}
			}, {
				key: "Event",
				get: function() {
					return ee
				}
			}, {
				key: "EVENT_KEY",
				get: function() {
					return ".bs.tooltip"
				}
			}, {
				key: "DefaultType",
				get: function() {
					return K
				}
			}]), e
		}();
	r.default.fn.tooltip = te._jQueryInterface, r.default.fn.tooltip.Constructor = te, r.default.fn.tooltip.noConflict = function() {
		return r.default.fn.tooltip = G, te._jQueryInterface
	};
	var ne = "popover",
		ie = r.default.fn.popover,
		re = new RegExp("(^|\\s)bs-popover\\S+", "g"),
		oe = l({}, te.Default, {
			placement: "right",
			trigger: "click",
			content: "",
			template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
		}),
		ae = l({}, te.DefaultType, {
			content: "(string|element|function)"
		}),
		se = {
			HIDE: "hide.bs.popover",
			HIDDEN: "hidden.bs.popover",
			SHOW: "show.bs.popover",
			SHOWN: "shown.bs.popover",
			INSERTED: "inserted.bs.popover",
			CLICK: "click.bs.popover",
			FOCUSIN: "focusin.bs.popover",
			FOCUSOUT: "focusout.bs.popover",
			MOUSEENTER: "mouseenter.bs.popover",
			MOUSELEAVE: "mouseleave.bs.popover"
		},
		le = function(e) {
			var t, n;

			function i() {
				return e.apply(this, arguments) || this
			}
			n = e, (t = i).prototype = Object.create(n.prototype), t.prototype.constructor = t, u(t, n);
			var o = i.prototype;
			return o.isWithContent = function() {
				return this.getTitle() || this._getContent()
			}, o.addAttachmentClass = function(e) {
				r.default(this.getTipElement()).addClass("bs-popover-" + e)
			}, o.getTipElement = function() {
				return this.tip = this.tip || r.default(this.config.template)[0], this.tip
			}, o.setContent = function() {
				var e = r.default(this.getTipElement());
				this.setElementContent(e.find(".popover-header"), this.getTitle());
				var t = this._getContent();
				"function" == typeof t && (t = t.call(this.element)), this.setElementContent(e.find(".popover-body"), t), e.removeClass("fade show")
			}, o._getContent = function() {
				return this.element.getAttribute("data-content") || this.config.content
			}, o._cleanTipClass = function() {
				var e = r.default(this.getTipElement()),
					t = e.attr("class").match(re);
				null !== t && t.length > 0 && e.removeClass(t.join(""))
			}, i._jQueryInterface = function(e) {
				return this.each(function() {
					var t = r.default(this).data("bs.popover"),
						n = "object" == typeof e ? e : null;
					if ((t || !/dispose|hide/.test(e)) && (t || (t = new i(this, n), r.default(this).data("bs.popover", t)), "string" == typeof e)) {
						if (void 0 === t[e]) throw new TypeError('No method named "' + e + '"');
						t[e]()
					}
				})
			}, s(i, null, [{
				key: "VERSION",
				get: function() {
					return "4.6.2"
				}
			}, {
				key: "Default",
				get: function() {
					return oe
				}
			}, {
				key: "NAME",
				get: function() {
					return ne
				}
			}, {
				key: "DATA_KEY",
				get: function() {
					return "bs.popover"
				}
			}, {
				key: "Event",
				get: function() {
					return se
				}
			}, {
				key: "EVENT_KEY",
				get: function() {
					return ".bs.popover"
				}
			}, {
				key: "DefaultType",
				get: function() {
					return ae
				}
			}]), i
		}(te);
	r.default.fn.popover = le._jQueryInterface, r.default.fn.popover.Constructor = le, r.default.fn.popover.noConflict = function() {
		return r.default.fn.popover = ie, le._jQueryInterface
	};
	var ue = "scrollspy",
		ce = r.default.fn[ue],
		de = "scroll.bs.scrollspy",
		fe = ".nav-link",
		he = ".list-group-item",
		pe = ".dropdown-item",
		ge = {
			offset: 10,
			method: "auto",
			target: ""
		},
		me = {
			offset: "number",
			method: "string",
			target: "(string|element)"
		},
		ve = function() {
			function e(e, t) {
				var n = this;
				this._element = e, this._scrollElement = "BODY" === e.tagName ? window : e, this._config = this._getConfig(t), this._selector = this._config.target + " " + fe + "," + this._config.target + " " + he + "," + this._config.target + " " + pe, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, r.default(this._scrollElement).on(de, function(e) {
					return n._process(e)
				}), this.refresh(), this._process()
			}
			var t = e.prototype;
			return t.refresh = function() {
				var e = this,
					t = this._scrollElement === this._scrollElement.window ? "offset" : "position",
					n = "auto" === this._config.method ? t : this._config.method,
					i = "position" === n ? this._getScrollTop() : 0;
				this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function(e) {
					var t, o = f.getSelectorFromElement(e);
					if (o && (t = document.querySelector(o)), t) {
						var a = t.getBoundingClientRect();
						if (a.width || a.height) return [r.default(t)[n]().top + i, o]
					}
					return null
				}).filter(Boolean).sort(function(e, t) {
					return e[0] - t[0]
				}).forEach(function(t) {
					e._offsets.push(t[0]), e._targets.push(t[1])
				})
			}, t.dispose = function() {
				r.default.removeData(this._element, "bs.scrollspy"), r.default(this._scrollElement).off(".bs.scrollspy"), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
			}, t._getConfig = function(e) {
				if ("string" != typeof(e = l({}, ge, "object" == typeof e && e ? e : {})).target && f.isElement(e.target)) {
					var t = r.default(e.target).attr("id");
					t || (t = f.getUID(ue), r.default(e.target).attr("id", t)), e.target = "#" + t
				}
				return f.typeCheckConfig(ue, e, me), e
			}, t._getScrollTop = function() {
				return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
			}, t._getScrollHeight = function() {
				return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
			}, t._getOffsetHeight = function() {
				return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
			}, t._process = function() {
				var e = this._getScrollTop() + this._config.offset,
					t = this._getScrollHeight(),
					n = this._config.offset + t - this._getOffsetHeight();
				if (this._scrollHeight !== t && this.refresh(), e >= n) {
					var i = this._targets[this._targets.length - 1];
					this._activeTarget !== i && this._activate(i)
				} else {
					if (this._activeTarget && e < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();
					for (var r = this._offsets.length; r--;) {
						this._activeTarget !== this._targets[r] && e >= this._offsets[r] && (void 0 === this._offsets[r + 1] || e < this._offsets[r + 1]) && this._activate(this._targets[r])
					}
				}
			}, t._activate = function(e) {
				this._activeTarget = e, this._clear();
				var t = this._selector.split(",").map(function(t) {
						return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
					}),
					n = r.default([].slice.call(document.querySelectorAll(t.join(","))));
				n.hasClass("dropdown-item") ? (n.closest(".dropdown").find(".dropdown-toggle").addClass("active"), n.addClass("active")) : (n.addClass("active"), n.parents(".nav, .list-group").prev(fe + ", " + he).addClass("active"), n.parents(".nav, .list-group").prev(".nav-item").children(fe).addClass("active")), r.default(this._scrollElement).trigger("activate.bs.scrollspy", {
					relatedTarget: e
				})
			}, t._clear = function() {
				[].slice.call(document.querySelectorAll(this._selector)).filter(function(e) {
					return e.classList.contains("active")
				}).forEach(function(e) {
					return e.classList.remove("active")
				})
			}, e._jQueryInterface = function(t) {
				return this.each(function() {
					var n = r.default(this).data("bs.scrollspy");
					if (n || (n = new e(this, "object" == typeof t && t), r.default(this).data("bs.scrollspy", n)), "string" == typeof t) {
						if (void 0 === n[t]) throw new TypeError('No method named "' + t + '"');
						n[t]()
					}
				})
			}, s(e, null, [{
				key: "VERSION",
				get: function() {
					return "4.6.2"
				}
			}, {
				key: "Default",
				get: function() {
					return ge
				}
			}]), e
		}();
	r.default(window).on("load.bs.scrollspy.data-api", function() {
		for (var e = [].slice.call(document.querySelectorAll('[data-spy="scroll"]')), t = e.length; t--;) {
			var n = r.default(e[t]);
			ve._jQueryInterface.call(n, n.data())
		}
	}), r.default.fn[ue] = ve._jQueryInterface, r.default.fn[ue].Constructor = ve, r.default.fn[ue].noConflict = function() {
		return r.default.fn[ue] = ce, ve._jQueryInterface
	};
	var be = r.default.fn.tab,
		ye = function() {
			function e(e) {
				this._element = e
			}
			var t = e.prototype;
			return t.show = function() {
				var e = this;
				if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && r.default(this._element).hasClass("active") || r.default(this._element).hasClass("disabled") || this._element.hasAttribute("disabled"))) {
					var t, n, i = r.default(this._element).closest(".nav, .list-group")[0],
						o = f.getSelectorFromElement(this._element);
					if (i) {
						var a = "UL" === i.nodeName || "OL" === i.nodeName ? "> li > .active" : ".active";
						n = (n = r.default.makeArray(r.default(i).find(a)))[n.length - 1]
					}
					var s = r.default.Event("hide.bs.tab", {
							relatedTarget: this._element
						}),
						l = r.default.Event("show.bs.tab", {
							relatedTarget: n
						});
					if (n && r.default(n).trigger(s), r.default(this._element).trigger(l), !l.isDefaultPrevented() && !s.isDefaultPrevented()) {
						o && (t = document.querySelector(o)), this._activate(this._element, i);
						var u = function() {
							var t = r.default.Event("hidden.bs.tab", {
									relatedTarget: e._element
								}),
								i = r.default.Event("shown.bs.tab", {
									relatedTarget: n
								});
							r.default(n).trigger(t), r.default(e._element).trigger(i)
						};
						t ? this._activate(t, t.parentNode, u) : u()
					}
				}
			}, t.dispose = function() {
				r.default.removeData(this._element, "bs.tab"), this._element = null
			}, t._activate = function(e, t, n) {
				var i = this,
					o = (!t || "UL" !== t.nodeName && "OL" !== t.nodeName ? r.default(t).children(".active") : r.default(t).find("> li > .active"))[0],
					a = n && o && r.default(o).hasClass("fade"),
					s = function() {
						return i._transitionComplete(e, o, n)
					};
				if (o && a) {
					var l = f.getTransitionDurationFromElement(o);
					r.default(o).removeClass("show").one(f.TRANSITION_END, s).emulateTransitionEnd(l)
				} else s()
			}, t._transitionComplete = function(e, t, n) {
				if (t) {
					r.default(t).removeClass("active");
					var i = r.default(t.parentNode).find("> .dropdown-menu .active")[0];
					i && r.default(i).removeClass("active"), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !1)
				}
				r.default(e).addClass("active"), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !0), f.reflow(e), e.classList.contains("fade") && e.classList.add("show");
				var o = e.parentNode;
				if (o && "LI" === o.nodeName && (o = o.parentNode), o && r.default(o).hasClass("dropdown-menu")) {
					var a = r.default(e).closest(".dropdown")[0];
					if (a) {
						var s = [].slice.call(a.querySelectorAll(".dropdown-toggle"));
						r.default(s).addClass("active")
					}
					e.setAttribute("aria-expanded", !0)
				}
				n && n()
			}, e._jQueryInterface = function(t) {
				return this.each(function() {
					var n = r.default(this),
						i = n.data("bs.tab");
					if (i || (i = new e(this), n.data("bs.tab", i)), "string" == typeof t) {
						if (void 0 === i[t]) throw new TypeError('No method named "' + t + '"');
						i[t]()
					}
				})
			}, s(e, null, [{
				key: "VERSION",
				get: function() {
					return "4.6.2"
				}
			}]), e
		}();
	r.default(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', function(e) {
		e.preventDefault(), ye._jQueryInterface.call(r.default(this), "show")
	}), r.default.fn.tab = ye._jQueryInterface, r.default.fn.tab.Constructor = ye, r.default.fn.tab.noConflict = function() {
		return r.default.fn.tab = be, ye._jQueryInterface
	};
	var _e = "toast",
		xe = r.default.fn.toast,
		we = {
			animation: !0,
			autohide: !0,
			delay: 500
		},
		ke = {
			animation: "boolean",
			autohide: "boolean",
			delay: "number"
		},
		Se = function() {
			function e(e, t) {
				this._element = e, this._config = this._getConfig(t), this._timeout = null, this._setListeners()
			}
			var t = e.prototype;
			return t.show = function() {
				var e = this,
					t = r.default.Event("show.bs.toast");
				if (r.default(this._element).trigger(t), !t.isDefaultPrevented()) {
					this._clearTimeout(), this._config.animation && this._element.classList.add("fade");
					var n = function() {
						e._element.classList.remove("showing"), e._element.classList.add("show"), r.default(e._element).trigger("shown.bs.toast"), e._config.autohide && (e._timeout = setTimeout(function() {
							e.hide()
						}, e._config.delay))
					};
					if (this._element.classList.remove("hide"), f.reflow(this._element), this._element.classList.add("showing"), this._config.animation) {
						var i = f.getTransitionDurationFromElement(this._element);
						r.default(this._element).one(f.TRANSITION_END, n).emulateTransitionEnd(i)
					} else n()
				}
			}, t.hide = function() {
				if (this._element.classList.contains("show")) {
					var e = r.default.Event("hide.bs.toast");
					r.default(this._element).trigger(e), e.isDefaultPrevented() || this._close()
				}
			}, t.dispose = function() {
				this._clearTimeout(), this._element.classList.contains("show") && this._element.classList.remove("show"), r.default(this._element).off("click.dismiss.bs.toast"), r.default.removeData(this._element, "bs.toast"), this._element = null, this._config = null
			}, t._getConfig = function(e) {
				return e = l({}, we, r.default(this._element).data(), "object" == typeof e && e ? e : {}), f.typeCheckConfig(_e, e, this.constructor.DefaultType), e
			}, t._setListeners = function() {
				var e = this;
				r.default(this._element).on("click.dismiss.bs.toast", '[data-dismiss="toast"]', function() {
					return e.hide()
				})
			}, t._close = function() {
				var e = this,
					t = function() {
						e._element.classList.add("hide"), r.default(e._element).trigger("hidden.bs.toast")
					};
				if (this._element.classList.remove("show"), this._config.animation) {
					var n = f.getTransitionDurationFromElement(this._element);
					r.default(this._element).one(f.TRANSITION_END, t).emulateTransitionEnd(n)
				} else t()
			}, t._clearTimeout = function() {
				clearTimeout(this._timeout), this._timeout = null
			}, e._jQueryInterface = function(t) {
				return this.each(function() {
					var n = r.default(this),
						i = n.data("bs.toast");
					if (i || (i = new e(this, "object" == typeof t && t), n.data("bs.toast", i)), "string" == typeof t) {
						if (void 0 === i[t]) throw new TypeError('No method named "' + t + '"');
						i[t](this)
					}
				})
			}, s(e, null, [{
				key: "VERSION",
				get: function() {
					return "4.6.2"
				}
			}, {
				key: "DefaultType",
				get: function() {
					return ke
				}
			}, {
				key: "Default",
				get: function() {
					return we
				}
			}]), e
		}();
	r.default.fn.toast = Se._jQueryInterface, r.default.fn.toast.Constructor = Se, r.default.fn.toast.noConflict = function() {
		return r.default.fn.toast = xe, Se._jQueryInterface
	}, e.Alert = p, e.Button = m, e.Carousel = S, e.Collapse = A, e.Dropdown = L, e.Modal = V, e.Popover = le, e.Scrollspy = ve, e.Tab = ye, e.Toast = Se, e.Tooltip = te, e.Util = f, Object.defineProperty(e, "__esModule", {
		value: !0
	})
}), $(document).ready(function() {
		const e = ["GH", "UG"],
			t = localStorage.getItem("location"),
			n = localStorage.getItem("cookie");
		t || fetch("https://ipapi.co/json/").then(e => e.json()).then(t => {
			t.country_code && (localStorage.setItem("location", t.country_code), e.includes(t.country_code) && "GH" !== t.country_code && (window.location.href = `${window.location.protocol}//${window.location.host}/${t.country_code.toLowerCase()}/`))
		}), n || ($(".alert-cookie").removeClass("d-none").addClass("d-flex"), $(document).on("click", ".alert-cookie button", function(e) {
			localStorage.setItem("cookie", !0)
		})), $(document).on("click", "#home [data-image]", function(e) {
			e.preventDefault(), $("#home .bubble-list[data-image].active").removeClass("active"), $(this).addClass("active");
			let t = $(this).data("image");
			$(this).hasClass("seen") ? $(".experience-image").replaceWith(`\n                <img class="experience-image" src="images/img/${t}@3x.jpg">\n            `) : ($(".experience-image").replaceWith(`\n                <img class="experience-image" src="images/img/${t}.jpg" data-src="images/img/${t}@3x.jpg">\n            `), $(this).addClass("seen"), setTimeout(function() {
				$(".experience-image").visibility({
					type: "image",
					transition: "fade in",
					duration: 250
				})
			}, 250))
		});
		// let i = [{
		// 	name: "Bitcoin",
		// 	id: 2,
		// 	abbr: "BTC",
		// 	color: "#f7931a",
		// 	actions: {
		// 		buy: "https://app.payplux.com/dashboard/buy-and-sell/buy",
		// 		sell: "https://app.payplux.com/dashboard/buy-and-sell/sell"
		// 	}
		// }, {
		// 	name: "Bitcoin Cash",
		// 	id: 6,
		// 	abbr: "BCH",
		// 	color: "#8dc351"
		// }, {
		// 	name: "Ethereum",
		// 	id: 4,
		// 	abbr: "ETH",
		// 	color: "#627eea"
		// }, {
		// 	name: "Litecoin",
		// 	id: 5,
		// 	abbr: "LTC",
		// 	color: "#d3d3d3"
		// }, {
		// 	name: "Dogecoin",
		// 	id: 7,
		// 	abbr: "doge",
		// 	color: "#c3a633"
		// }];
		// const r = $(".table"),
		// 	o = e => {
		// 		let t = [];
		// 		return e.forEach(e => {
		// 			t.push(e.price_close)
		// 		}), t
		// 	};
		// r && i.forEach(e => {
		// 	axios.get(`https://api.payplux.com/api/v5/marketdata/chart/${e.id}?with_crypto_rate=true`).then(t => {
		// 		let {
		// 			data: n,
		// 			ecurrency: i
		// 		} = t.data;
		// 		n.push({
		// 			price_close: i.crypto_rate
		// 		}), n = n.splice(10, n.length);
		// 		const s = i.crypto_rate.toFixed(2),
		// 			l = ((e, t) => {
		// 				const n = e.slice(e.length - 2, e.length)[0].price_close,
		// 					i = t.crypto_rate - n;
		// 				return parseFloat(i / n * 100, 2).toLocaleString("en-GB", {
		// 					style: "decimal",
		// 					minimumFractionDigits: 2,
		// 					maximumFractionDigits: 2
		// 				})
		// 			})(n, i),
		// 			u = {};
		// 		Math.ceil(l) < 0 ? (u.icon = "arrow_downward", u.className = "down") : Math.ceil(l) > 1 ? (u.icon = "arrow_upward", u.className = "up") : (u.icon = "remove", u.className = "none");
		// 		let c = '<div class="d-flex td steel-text">Coming soon</div>';
		// 		e.actions && (c = `<div class="d-flex w-100 td">\n                    <button\n                      onClick="window.open('${e.actions.buy}', '_blank')"\n                      class="btn button button-32 font-size-sm-12 font-weight-sm-600 px-3 mr-2 mr-md-3">BUY</button>\n                    <button \n                      onClick="window.open('${e.actions.sell}', '_blank')"\n                      class="btn button button-32 font-size-sm-12 font-weight-sm-600 px-3">SELL</button>\n                  </div>`), r.find("tbody").append(`\n                        <tr>\n                            <td class="product">\n                                <div class="d-flex td">\n                                    <img src="images/currencies/${e.abbr.toLowerCase()}.svg" alt="" class="mr-2 mr-md-2">\n                                    <div class="product-name">\n                                        <div class="d-flex align-items-center">\n                                            <p class="name font-size-sm-16 font-size-md-18">${e.name}</p>\n                                            <p class="abbr">${e.abbr}</p>\n                                        </div>\n                                        <p class="price d-block d-md-none font-size-sm-16">\n                                            <span class="amount">${s}</span>\n                                            <span class="currency">USD</span>\n                                        </p>\n                                    </div>\n                                </div>\n                            </td>\n                        \n                            <td class="price d-none d-md-table-cell">\n                                <div class="d-flex justify-content-end td font-weight-sm-600">\n                                    <span class="amount">${s}</span>\n                                    <span class="currency">USD</span>\n                                </div>\n                            </td>\n                        \n                            <td class="change d-none d-md-table-cell ${u.className}">\n                                <div class="d-flex td">\n                                    <i class="material-icons">${u.icon}</i>\n                                    <span>${l==1/0?"0.00":Math.abs(l)}</span>\n                                </div>\n                            </td>\n                        \n                            <td class="chart d-none d-lg-table-cell">\n                                <div class="d-flex justify-content-center align-items-center" style="height: 84px; width: 84px;">\n                                    <canvas class="currency-graph" height="50" width="80" id="currency-${e.id}"></canvas>\n                                </div>\n                            </td>\n                            <td class="actions">\n                            ${c}\n                            </td>\n                        </tr>\n                    `), a({
		// 			el: document.querySelector(`#currency-${e.id}`),
		// 			data: o(n),
		// 			color: e.color
		// 		})
		// 	}).catch(e => {})
		// });
		// const a = e => {
		// 	let t = [];
		// 	e.data.forEach(() => {
		// 		t.push("")
		// 	});
		// 	new Chart(e.el, {
		// 		type: "line",
		// 		data: {
		// 			labels: t,
		// 			datasets: [{
		// 				label: "",
		// 				data: e.data,
		// 				backgroundColor: "transparent",
		// 				borderColor: e.color,
		// 				borderWidth: 2,
		// 				pointRadius: -1
		// 			}]
		// 		},
		// 		options: {
		// 			responsive: !1,
		// 			legend: {
		// 				display: !1
		// 			},
		// 			scales: {
		// 				yAxes: [{
		// 					gridLines: {
		// 						display: !1,
		// 						drawBorder: !1
		// 					},
		// 					ticks: {
		// 						display: !1
		// 					}
		// 				}],
		// 				xAxes: [{
		// 					gridLines: {
		// 						display: !1,
		// 						drawBorder: !1
		// 					},
		// 					ticks: {
		// 						display: !1
		// 					}
		// 				}]
		// 			},
		// 			layout: {
		// 				padding: {
		// 					left: -10,
		// 					bottom: -10,
		// 					right: 0,
		// 					top: 0
		// 				}
		// 			}
		// 		}
		// 	})
		// }
	}),
	function(e, t, n, i) {
		"use strict";
		t = void 0 !== t && t.Math == Math ? t : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), e.fn.embed = function(n) {
			var r, o = e(this),
				a = o.selector || "",
				s = (new Date).getTime(),
				l = [],
				u = n,
				c = "string" == typeof u,
				d = [].slice.call(arguments, 1);
			return o.each(function() {
				var f, h = e.isPlainObject(n) ? e.extend(!0, {}, e.fn.embed.settings, n) : e.extend({}, e.fn.embed.settings),
					p = h.selector,
					g = h.className,
					m = h.sources,
					v = h.error,
					b = h.metadata,
					y = h.namespace,
					_ = h.templates,
					x = "." + y,
					w = "module-" + y,
					k = (e(t), e(this)),
					S = (k.find(p.placeholder), k.find(p.icon), k.find(p.embed)),
					C = this,
					T = k.data(w);
				f = {
					initialize: function() {
						f.debug("Initializing embed"), f.determine.autoplay(), f.create(), f.bind.events(), f.instantiate()
					},
					instantiate: function() {
						f.verbose("Storing instance of module", f), T = f, k.data(w, f)
					},
					destroy: function() {
						f.verbose("Destroying previous instance of embed"), f.reset(), k.removeData(w).off(x)
					},
					refresh: function() {
						f.verbose("Refreshing selector cache"), k.find(p.placeholder), k.find(p.icon), S = k.find(p.embed)
					},
					bind: {
						events: function() {
							f.has.placeholder() && (f.debug("Adding placeholder events"), k.on("click" + x, p.placeholder, f.createAndShow).on("click" + x, p.icon, f.createAndShow))
						}
					},
					create: function() {
						f.get.placeholder() ? f.createPlaceholder() : f.createAndShow()
					},
					createPlaceholder: function(e) {
						var t = f.get.icon(),
							n = f.get.url();
						f.generate.embed(n), e = e || f.get.placeholder(), k.html(_.placeholder(e, t)), f.debug("Creating placeholder for embed", e, t)
					},
					createEmbed: function(t) {
						f.refresh(), t = t || f.get.url(), S = e("<div/>").addClass(g.embed).html(f.generate.embed(t)).appendTo(k), h.onCreate.call(C, t), f.debug("Creating embed object", S)
					},
					changeEmbed: function(e) {
						S.html(f.generate.embed(e))
					},
					createAndShow: function() {
						f.createEmbed(), f.show()
					},
					change: function(e, t, n) {
						f.debug("Changing video to ", e, t, n), k.data(b.source, e).data(b.id, t), n ? k.data(b.url, n) : k.removeData(b.url), f.has.embed() ? f.changeEmbed() : f.create()
					},
					reset: function() {
						f.debug("Clearing embed and showing placeholder"), f.remove.data(), f.remove.active(), f.remove.embed(), f.showPlaceholder(), h.onReset.call(C)
					},
					show: function() {
						f.debug("Showing embed"), f.set.active(), h.onDisplay.call(C)
					},
					hide: function() {
						f.debug("Hiding embed"), f.showPlaceholder()
					},
					showPlaceholder: function() {
						f.debug("Showing placeholder image"), f.remove.active(), h.onPlaceholderDisplay.call(C)
					},
					get: {
						id: function() {
							return h.id || k.data(b.id)
						},
						placeholder: function() {
							return h.placeholder || k.data(b.placeholder)
						},
						icon: function() {
							return h.icon ? h.icon : k.data(b.icon) !== i ? k.data(b.icon) : f.determine.icon()
						},
						source: function(e) {
							return h.source ? h.source : k.data(b.source) !== i ? k.data(b.source) : f.determine.source()
						},
						type: function() {
							var e = f.get.source();
							return m[e] !== i && m[e].type
						},
						url: function() {
							return h.url ? h.url : k.data(b.url) !== i ? k.data(b.url) : f.determine.url()
						}
					},
					determine: {
						autoplay: function() {
							f.should.autoplay() && (h.autoplay = !0)
						},
						source: function(t) {
							var n = !1;
							return (t = t || f.get.url()) && e.each(m, function(e, i) {
								if (-1 !== t.search(i.domain)) return n = e, !1
							}), n
						},
						icon: function() {
							var e = f.get.source();
							return m[e] !== i && m[e].icon
						},
						url: function() {
							var e, t = h.id || k.data(b.id),
								n = h.source || k.data(b.source);
							return (e = m[n] !== i && m[n].url.replace("{id}", t)) && k.data(b.url, e), e
						}
					},
					set: {
						active: function() {
							k.addClass(g.active)
						}
					},
					remove: {
						data: function() {
							k.removeData(b.id).removeData(b.icon).removeData(b.placeholder).removeData(b.source).removeData(b.url)
						},
						active: function() {
							k.removeClass(g.active)
						},
						embed: function() {
							S.empty()
						}
					},
					encode: {
						parameters: function(e) {
							var t, n = [];
							for (t in e) n.push(encodeURIComponent(t) + "=" + encodeURIComponent(e[t]));
							return n.join("&amp;")
						}
					},
					generate: {
						embed: function(e) {
							f.debug("Generating embed html");
							var t, n, i = f.get.source();
							return (e = f.get.url(e)) ? (n = f.generate.parameters(i), t = _.iframe(e, n)) : f.error(v.noURL, k), t
						},
						parameters: function(t, n) {
							var r = m[t] && m[t].parameters !== i ? m[t].parameters(h) : {};
							return (n = n || h.parameters) && (r = e.extend({}, r, n)), r = h.onEmbed(r), f.encode.parameters(r)
						}
					},
					has: {
						embed: function() {
							return 0 < S.length
						},
						placeholder: function() {
							return h.placeholder || k.data(b.placeholder)
						}
					},
					should: {
						autoplay: function() {
							return "auto" === h.autoplay ? h.placeholder || k.data(b.placeholder) !== i : h.autoplay
						}
					},
					is: {
						video: function() {
							return "video" == f.get.type()
						}
					},
					setting: function(t, n) {
						if (f.debug("Changing setting", t, n), e.isPlainObject(t)) e.extend(!0, h, t);
						else {
							if (n === i) return h[t];
							e.isPlainObject(h[t]) ? e.extend(!0, h[t], n) : h[t] = n
						}
					},
					internal: function(t, n) {
						if (e.isPlainObject(t)) e.extend(!0, f, t);
						else {
							if (n === i) return f[t];
							f[t] = n
						}
					},
					debug: function() {
						!h.silent && h.debug && (h.performance ? f.performance.log(arguments) : (f.debug = Function.prototype.bind.call(console.info, console, h.name + ":"), f.debug.apply(console, arguments)))
					},
					verbose: function() {
						!h.silent && h.verbose && h.debug && (h.performance ? f.performance.log(arguments) : (f.verbose = Function.prototype.bind.call(console.info, console, h.name + ":"), f.verbose.apply(console, arguments)))
					},
					error: function() {
						h.silent || (f.error = Function.prototype.bind.call(console.error, console, h.name + ":"), f.error.apply(console, arguments))
					},
					performance: {
						log: function(e) {
							var t, n;
							h.performance && (n = (t = (new Date).getTime()) - (s || t), s = t, l.push({
								Name: e[0],
								Arguments: [].slice.call(e, 1) || "",
								Element: C,
								"Execution Time": n
							})), clearTimeout(f.performance.timer), f.performance.timer = setTimeout(f.performance.display, 500)
						},
						display: function() {
							var t = h.name + ":",
								n = 0;
							s = !1, clearTimeout(f.performance.timer), e.each(l, function(e, t) {
								n += t["Execution Time"]
							}), t += " " + n + "ms", a && (t += " '" + a + "'"), 1 < o.length && (t += " (" + o.length + ")"), (console.group !== i || console.table !== i) && 0 < l.length && (console.groupCollapsed(t), console.table ? console.table(l) : e.each(l, function(e, t) {
								console.log(t.Name + ": " + t["Execution Time"] + "ms")
							}), console.groupEnd()), l = []
						}
					},
					invoke: function(t, n, o) {
						var a, s, l, u = T;
						return n = n || d, o = C || o, "string" == typeof t && u !== i && (t = t.split(/[\. ]/), a = t.length - 1, e.each(t, function(n, r) {
							var o = n != a ? r + t[n + 1].charAt(0).toUpperCase() + t[n + 1].slice(1) : t;
							if (e.isPlainObject(u[o]) && n != a) u = u[o];
							else {
								if (u[o] !== i) return s = u[o], !1;
								if (!e.isPlainObject(u[r]) || n == a) return u[r] !== i ? s = u[r] : f.error(v.method, t), !1;
								u = u[r]
							}
						})), e.isFunction(s) ? l = s.apply(o, n) : s !== i && (l = s), e.isArray(r) ? r.push(l) : r !== i ? r = [r, l] : l !== i && (r = l), s
					}
				}, c ? (T === i && f.initialize(), f.invoke(u)) : (T !== i && T.invoke("destroy"), f.initialize())
			}), r !== i ? r : this
		}, e.fn.embed.settings = {
			name: "Embed",
			namespace: "embed",
			silent: !1,
			debug: !1,
			verbose: !1,
			performance: !0,
			icon: !1,
			source: !1,
			url: !1,
			id: !1,
			autoplay: "auto",
			color: "#444444",
			hd: !0,
			brandedUI: !1,
			parameters: !1,
			onDisplay: function() {},
			onPlaceholderDisplay: function() {},
			onReset: function() {},
			onCreate: function(e) {},
			onEmbed: function(e) {
				return e
			},
			metadata: {
				id: "id",
				icon: "icon",
				placeholder: "placeholder",
				source: "source",
				url: "url"
			},
			error: {
				noURL: "No URL specified",
				method: "The method you called is not defined"
			},
			className: {
				active: "active",
				embed: "embed"
			},
			selector: {
				embed: ".embed",
				placeholder: ".placeholder",
				icon: ".icon"
			},
			sources: {
				youtube: {
					name: "youtube",
					type: "video",
					icon: "video play",
					domain: "youtube.com",
					url: "//www.youtube.com/embed/{id}",
					parameters: function(e) {
						return {
							autohide: !e.brandedUI,
							autoplay: e.autoplay,
							color: e.color || i,
							hq: e.hd,
							jsapi: e.api,
							modestbranding: !e.brandedUI
						}
					}
				},
				vimeo: {
					name: "vimeo",
					type: "video",
					icon: "video play",
					domain: "vimeo.com",
					url: "//player.vimeo.com/video/{id}",
					parameters: function(e) {
						return {
							api: e.api,
							autoplay: e.autoplay,
							byline: e.brandedUI,
							color: e.color || i,
							portrait: e.brandedUI,
							title: e.brandedUI
						}
					}
				}
			},
			templates: {
				iframe: function(e, t) {
					var n = e;
					return t && (n += "?" + t), '<iframe src="' + n + '" width="100%" height="100%" frameborder="0" scrolling="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'
				},
				placeholder: function(e, t) {
					var n = "";
					return t && (n += '<i class="' + t + ' icon"></i>'), e && (n += '<img class="placeholder" src="' + e + '">'), n
				}
			},
			api: !1,
			onPause: function() {},
			onPlay: function() {},
			onStop: function() {}
		}
	}(jQuery, window, document),
	function(e, t, n, i) {
		"use strict";
		t = void 0 !== t && t.Math == Math ? t : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), e.fn.transition = function() {
			var r, o = e(this),
				a = o.selector || "",
				s = (new Date).getTime(),
				l = [],
				u = arguments,
				c = u[0],
				d = [].slice.call(arguments, 1),
				f = "string" == typeof c;
			return t.requestAnimationFrame || t.mozRequestAnimationFrame || t.webkitRequestAnimationFrame || t.msRequestAnimationFrame, o.each(function(t) {
				var h, p, g, m, v, b, y, _, x, w = e(this),
					k = this;
				(x = {
					initialize: function() {
						h = x.get.settings.apply(k, u), m = h.className, g = h.error, v = h.metadata, _ = "." + h.namespace, y = "module-" + h.namespace, p = w.data(y) || x, b = x.get.animationEndEvent(), f && (f = x.invoke(c)), !1 === f && (x.verbose("Converted arguments into settings object", h), h.interval ? x.delay(h.animate) : x.animate(), x.instantiate())
					},
					instantiate: function() {
						x.verbose("Storing instance of module", x), p = x, w.data(y, p)
					},
					destroy: function() {
						x.verbose("Destroying previous module for", k), w.removeData(y)
					},
					refresh: function() {
						x.verbose("Refreshing display type on next animation"), delete x.displayType
					},
					forceRepaint: function() {
						x.verbose("Forcing element repaint");
						var e = w.parent(),
							t = w.next();
						0 === t.length ? w.detach().appendTo(e) : w.detach().insertBefore(t)
					},
					repaint: function() {
						x.verbose("Repainting element"), k.offsetWidth
					},
					delay: function(e) {
						var n, r = x.get.animationDirection();
						r || (r = x.can.transition() ? x.get.direction() : "static"), e = e !== i ? e : h.interval, n = "auto" == h.reverse && r == m.outward || 1 == h.reverse ? (o.length - t) * h.interval : t * h.interval, x.debug("Delaying animation by", n), setTimeout(x.animate, n)
					},
					animate: function(e) {
						if (h = e || h, !x.is.supported()) return x.error(g.support), !1;
						if (x.debug("Preparing animation", h.animation), x.is.animating()) {
							if (h.queue) return !h.allowRepeats && x.has.direction() && x.is.occurring() && !0 !== x.queuing ? x.debug("Animation is currently occurring, preventing queueing same animation", h.animation) : x.queue(h.animation), !1;
							if (!h.allowRepeats && x.is.occurring()) return x.debug("Animation is already occurring, will not execute repeated animation", h.animation), !1;
							x.debug("New animation started, completing previous early", h.animation), p.complete()
						}
						x.can.animate() ? x.set.animating(h.animation) : x.error(g.noAnimation, h.animation, k)
					},
					reset: function() {
						x.debug("Resetting animation to beginning conditions"), x.remove.animationCallbacks(), x.restore.conditions(), x.remove.animating()
					},
					queue: function(e) {
						x.debug("Queueing animation of", e), x.queuing = !0, w.one(b + ".queue" + _, function() {
							x.queuing = !1, x.repaint(), x.animate.apply(this, h)
						})
					},
					complete: function(e) {
						x.debug("Animation complete", h.animation), x.remove.completeCallback(), x.remove.failSafe(), x.is.looping() || (x.is.outward() ? (x.verbose("Animation is outward, hiding element"), x.restore.conditions(), x.hide()) : x.is.inward() ? (x.verbose("Animation is outward, showing element"), x.restore.conditions(), x.show()) : (x.verbose("Static animation completed"), x.restore.conditions(), h.onComplete.call(k)))
					},
					force: {
						visible: function() {
							var e = w.attr("style"),
								t = x.get.userStyle(),
								n = x.get.displayType(),
								r = t + "display: " + n + " !important;",
								o = w.css("display"),
								a = e === i || "" === e;
							o !== n ? (x.verbose("Overriding default display to show element", n), w.attr("style", r)) : a && w.removeAttr("style")
						},
						hidden: function() {
							var e = w.attr("style"),
								t = w.css("display"),
								n = e === i || "" === e;
							"none" === t || x.is.hidden() ? n && w.removeAttr("style") : (x.verbose("Overriding default display to hide element"), w.css("display", "none"))
						}
					},
					has: {
						direction: function(t) {
							var n = !1;
							return "string" == typeof(t = t || h.animation) && (t = t.split(" "), e.each(t, function(e, t) {
								t !== m.inward && t !== m.outward || (n = !0)
							})), n
						},
						inlineDisplay: function() {
							var t = w.attr("style") || "";
							return e.isArray(t.match(/display.*?;/, ""))
						}
					},
					set: {
						animating: function(e) {
							var t;
							x.remove.completeCallback(), e = e || h.animation, t = x.get.animationClass(e), x.save.animation(t), x.force.visible(), x.remove.hidden(), x.remove.direction(), x.start.animation(t)
						},
						duration: function(e, t) {
							!(t = "number" == typeof(t = t || h.duration) ? t + "ms" : t) && 0 !== t || (x.verbose("Setting animation duration", t), w.css({
								"animation-duration": t
							}))
						},
						direction: function(e) {
							(e = e || x.get.direction()) == m.inward ? x.set.inward() : x.set.outward()
						},
						looping: function() {
							x.debug("Transition set to loop"), w.addClass(m.looping)
						},
						hidden: function() {
							w.addClass(m.transition).addClass(m.hidden)
						},
						inward: function() {
							x.debug("Setting direction to inward"), w.removeClass(m.outward).addClass(m.inward)
						},
						outward: function() {
							x.debug("Setting direction to outward"), w.removeClass(m.inward).addClass(m.outward)
						},
						visible: function() {
							w.addClass(m.transition).addClass(m.visible)
						}
					},
					start: {
						animation: function(e) {
							e = e || x.get.animationClass(), x.debug("Starting tween", e), w.addClass(e).one(b + ".complete" + _, x.complete), h.useFailSafe && x.add.failSafe(), x.set.duration(h.duration), h.onStart.call(k)
						}
					},
					save: {
						animation: function(e) {
							x.cache || (x.cache = {}), x.cache.animation = e
						},
						displayType: function(e) {
							"none" !== e && w.data(v.displayType, e)
						},
						transitionExists: function(t, n) {
							e.fn.transition.exists[t] = n, x.verbose("Saving existence of transition", t, n)
						}
					},
					restore: {
						conditions: function() {
							var e = x.get.currentAnimation();
							e && (w.removeClass(e), x.verbose("Removing animation class", x.cache)), x.remove.duration()
						}
					},
					add: {
						failSafe: function() {
							var e = x.get.duration();
							x.timer = setTimeout(function() {
								w.triggerHandler(b)
							}, e + h.failSafeDelay), x.verbose("Adding fail safe timer", x.timer)
						}
					},
					remove: {
						animating: function() {
							w.removeClass(m.animating)
						},
						animationCallbacks: function() {
							x.remove.queueCallback(), x.remove.completeCallback()
						},
						queueCallback: function() {
							w.off(".queue" + _)
						},
						completeCallback: function() {
							w.off(".complete" + _)
						},
						display: function() {
							w.css("display", "")
						},
						direction: function() {
							w.removeClass(m.inward).removeClass(m.outward)
						},
						duration: function() {
							w.css("animation-duration", "")
						},
						failSafe: function() {
							x.verbose("Removing fail safe timer", x.timer), x.timer && clearTimeout(x.timer)
						},
						hidden: function() {
							w.removeClass(m.hidden)
						},
						visible: function() {
							w.removeClass(m.visible)
						},
						looping: function() {
							x.debug("Transitions are no longer looping"), x.is.looping() && (x.reset(), w.removeClass(m.looping))
						},
						transition: function() {
							w.removeClass(m.visible).removeClass(m.hidden)
						}
					},
					get: {
						settings: function(t, n, i) {
							return "object" == typeof t ? e.extend(!0, {}, e.fn.transition.settings, t) : "function" == typeof i ? e.extend({}, e.fn.transition.settings, {
								animation: t,
								onComplete: i,
								duration: n
							}) : "string" == typeof n || "number" == typeof n ? e.extend({}, e.fn.transition.settings, {
								animation: t,
								duration: n
							}) : "object" == typeof n ? e.extend({}, e.fn.transition.settings, n, {
								animation: t
							}) : "function" == typeof n ? e.extend({}, e.fn.transition.settings, {
								animation: t,
								onComplete: n
							}) : e.extend({}, e.fn.transition.settings, {
								animation: t
							})
						},
						animationClass: function(e) {
							var t = e || h.animation,
								n = x.can.transition() && !x.has.direction() ? x.get.direction() + " " : "";
							return m.animating + " " + m.transition + " " + n + t
						},
						currentAnimation: function() {
							return !(!x.cache || x.cache.animation === i) && x.cache.animation
						},
						currentDirection: function() {
							return x.is.inward() ? m.inward : m.outward
						},
						direction: function() {
							return x.is.hidden() || !x.is.visible() ? m.inward : m.outward
						},
						animationDirection: function(t) {
							var n;
							return "string" == typeof(t = t || h.animation) && (t = t.split(" "), e.each(t, function(e, t) {
								t === m.inward ? n = m.inward : t === m.outward && (n = m.outward)
							})), n || !1
						},
						duration: function(e) {
							return !1 === (e = e || h.duration) && (e = w.css("animation-duration") || 0), "string" == typeof e ? -1 < e.indexOf("ms") ? parseFloat(e) : 1e3 * parseFloat(e) : e
						},
						displayType: function(e) {
							return e = e === i || e, h.displayType ? h.displayType : (e && w.data(v.displayType) === i && x.can.transition(!0), w.data(v.displayType))
						},
						userStyle: function(e) {
							return (e = e || w.attr("style") || "").replace(/display.*?;/, "")
						},
						transitionExists: function(t) {
							return e.fn.transition.exists[t]
						},
						animationStartEvent: function() {
							var e, t = n.createElement("div"),
								r = {
									animation: "animationstart",
									OAnimation: "oAnimationStart",
									MozAnimation: "mozAnimationStart",
									WebkitAnimation: "webkitAnimationStart"
								};
							for (e in r)
								if (t.style[e] !== i) return r[e];
							return !1
						},
						animationEndEvent: function() {
							var e, t = n.createElement("div"),
								r = {
									animation: "animationend",
									OAnimation: "oAnimationEnd",
									MozAnimation: "mozAnimationEnd",
									WebkitAnimation: "webkitAnimationEnd"
								};
							for (e in r)
								if (t.style[e] !== i) return r[e];
							return !1
						}
					},
					can: {
						transition: function(t) {
							var n, r, o, a, s, l, u = h.animation,
								c = x.get.transitionExists(u),
								d = x.get.displayType(!1);
							if (c === i || t) {
								if (x.verbose("Determining whether animation exists"), n = w.attr("class"), r = w.prop("tagName"), a = (o = e("<" + r + " />").addClass(n).insertAfter(w)).addClass(u).removeClass(m.inward).removeClass(m.outward).addClass(m.animating).addClass(m.transition).css("animationName"), s = o.addClass(m.inward).css("animationName"), d || (d = o.attr("class", n).removeAttr("style").removeClass(m.hidden).removeClass(m.visible).show().css("display"), x.verbose("Determining final display state", d), x.save.displayType(d)), o.remove(), a != s) x.debug("Direction exists for animation", u), l = !0;
								else {
									if ("none" == a || !a) return void x.debug("No animation defined in css", u);
									x.debug("Static animation found", u, d), l = !1
								}
								x.save.transitionExists(u, l)
							}
							return c !== i ? c : l
						},
						animate: function() {
							return x.can.transition() !== i
						}
					},
					is: {
						animating: function() {
							return w.hasClass(m.animating)
						},
						inward: function() {
							return w.hasClass(m.inward)
						},
						outward: function() {
							return w.hasClass(m.outward)
						},
						looping: function() {
							return w.hasClass(m.looping)
						},
						occurring: function(e) {
							return e = "." + (e = e || h.animation).replace(" ", "."), 0 < w.filter(e).length
						},
						visible: function() {
							return w.is(":visible")
						},
						hidden: function() {
							return "hidden" === w.css("visibility")
						},
						supported: function() {
							return !1 !== b
						}
					},
					hide: function() {
						x.verbose("Hiding element"), x.is.animating() && x.reset(), k.blur(), x.remove.display(), x.remove.visible(), x.set.hidden(), x.force.hidden(), h.onHide.call(k), h.onComplete.call(k)
					},
					show: function(e) {
						x.verbose("Showing element", e), x.remove.hidden(), x.set.visible(), x.force.visible(), h.onShow.call(k), h.onComplete.call(k)
					},
					toggle: function() {
						x.is.visible() ? x.hide() : x.show()
					},
					stop: function() {
						x.debug("Stopping current animation"), w.triggerHandler(b)
					},
					stopAll: function() {
						x.debug("Stopping all animation"), x.remove.queueCallback(), w.triggerHandler(b)
					},
					clear: {
						queue: function() {
							x.debug("Clearing animation queue"), x.remove.queueCallback()
						}
					},
					enable: function() {
						x.verbose("Starting animation"), w.removeClass(m.disabled)
					},
					disable: function() {
						x.debug("Stopping animation"), w.addClass(m.disabled)
					},
					setting: function(t, n) {
						if (x.debug("Changing setting", t, n), e.isPlainObject(t)) e.extend(!0, h, t);
						else {
							if (n === i) return h[t];
							e.isPlainObject(h[t]) ? e.extend(!0, h[t], n) : h[t] = n
						}
					},
					internal: function(t, n) {
						if (e.isPlainObject(t)) e.extend(!0, x, t);
						else {
							if (n === i) return x[t];
							x[t] = n
						}
					},
					debug: function() {
						!h.silent && h.debug && (h.performance ? x.performance.log(arguments) : (x.debug = Function.prototype.bind.call(console.info, console, h.name + ":"), x.debug.apply(console, arguments)))
					},
					verbose: function() {
						!h.silent && h.verbose && h.debug && (h.performance ? x.performance.log(arguments) : (x.verbose = Function.prototype.bind.call(console.info, console, h.name + ":"), x.verbose.apply(console, arguments)))
					},
					error: function() {
						h.silent || (x.error = Function.prototype.bind.call(console.error, console, h.name + ":"), x.error.apply(console, arguments))
					},
					performance: {
						log: function(e) {
							var t, n;
							h.performance && (n = (t = (new Date).getTime()) - (s || t), s = t, l.push({
								Name: e[0],
								Arguments: [].slice.call(e, 1) || "",
								Element: k,
								"Execution Time": n
							})), clearTimeout(x.performance.timer), x.performance.timer = setTimeout(x.performance.display, 500)
						},
						display: function() {
							var t = h.name + ":",
								n = 0;
							s = !1, clearTimeout(x.performance.timer), e.each(l, function(e, t) {
								n += t["Execution Time"]
							}), t += " " + n + "ms", a && (t += " '" + a + "'"), 1 < o.length && (t += " (" + o.length + ")"), (console.group !== i || console.table !== i) && 0 < l.length && (console.groupCollapsed(t), console.table ? console.table(l) : e.each(l, function(e, t) {
								console.log(t.Name + ": " + t["Execution Time"] + "ms")
							}), console.groupEnd()), l = []
						}
					},
					invoke: function(t, n, o) {
						var a, s, l, u = p;
						return n = n || d, o = k || o, "string" == typeof t && u !== i && (t = t.split(/[\. ]/), a = t.length - 1, e.each(t, function(n, r) {
							var o = n != a ? r + t[n + 1].charAt(0).toUpperCase() + t[n + 1].slice(1) : t;
							if (e.isPlainObject(u[o]) && n != a) u = u[o];
							else {
								if (u[o] !== i) return s = u[o], !1;
								if (!e.isPlainObject(u[r]) || n == a) return u[r] !== i && (s = u[r]), !1;
								u = u[r]
							}
						})), e.isFunction(s) ? l = s.apply(o, n) : s !== i && (l = s), e.isArray(r) ? r.push(l) : r !== i ? r = [r, l] : l !== i && (r = l), s !== i && s
					}
				}).initialize()
			}), r !== i ? r : this
		}, e.fn.transition.exists = {}, e.fn.transition.settings = {
			name: "Transition",
			silent: !1,
			debug: !1,
			verbose: !1,
			performance: !0,
			namespace: "transition",
			interval: 0,
			reverse: "auto",
			onStart: function() {},
			onComplete: function() {},
			onShow: function() {},
			onHide: function() {},
			useFailSafe: !0,
			failSafeDelay: 100,
			allowRepeats: !1,
			displayType: !1,
			animation: "fade",
			duration: !1,
			queue: !0,
			metadata: {
				displayType: "display"
			},
			className: {
				animating: "animating",
				disabled: "disabled",
				hidden: "hidden",
				inward: "in",
				loading: "loading",
				looping: "looping",
				outward: "out",
				transition: "transition",
				visible: "visible"
			},
			error: {
				noAnimation: "Element is no longer attached to DOM. Unable to animate.  Use silent setting to surpress this warning in production.",
				repeated: "That animation is already occurring, cancelling repeated animation",
				method: "The method you called is not defined",
				support: "This browser does not support CSS animations"
			}
		}
	}(jQuery, window, document),
	function(e, t, n, i) {
		"use strict";
		t = void 0 !== t && t.Math == Math ? t : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), e.api = e.fn.api = function(n) {
			var r, o = e.isFunction(this) ? e(t) : e(this),
				a = o.selector || "",
				s = (new Date).getTime(),
				l = [],
				u = n,
				c = "string" == typeof u,
				d = [].slice.call(arguments, 1);
			return o.each(function() {
				var o, f, h, p, g, m, v = e.isPlainObject(n) ? e.extend(!0, {}, e.fn.api.settings, n) : e.extend({}, e.fn.api.settings),
					b = v.namespace,
					y = v.metadata,
					_ = v.selector,
					x = v.error,
					w = v.className,
					k = "." + b,
					S = "module-" + b,
					C = e(this),
					T = C.closest(_.form),
					D = v.stateContext ? e(v.stateContext) : C,
					M = this,
					E = D[0],
					A = C.data(S);
				m = {
					initialize: function() {
						c || m.bind.events(), m.instantiate()
					},
					instantiate: function() {
						m.verbose("Storing instance of module", m), A = m, C.data(S, A)
					},
					destroy: function() {
						m.verbose("Destroying previous module for", M), C.removeData(S).off(k)
					},
					bind: {
						events: function() {
							var e = m.get.event();
							e ? (m.verbose("Attaching API events to element", e), C.on(e + k, m.event.trigger)) : "now" == v.on && (m.debug("Querying API endpoint immediately"), m.query())
						}
					},
					decode: {
						json: function(e) {
							if (e !== i && "string" == typeof e) try {
								e = JSON.parse(e)
							} catch (e) {}
							return e
						}
					},
					read: {
						cachedResponse: function(e) {
							var n;
							if (t.Storage !== i) return n = sessionStorage.getItem(e), m.debug("Using cached response", e, n), m.decode.json(n);
							m.error(x.noStorage)
						}
					},
					write: {
						cachedResponse: function(n, r) {
							r && "" === r ? m.debug("Response empty, not caching", r) : t.Storage !== i ? (e.isPlainObject(r) && (r = JSON.stringify(r)), sessionStorage.setItem(n, r), m.verbose("Storing cached response for url", n, r)) : m.error(x.noStorage)
						}
					},
					query: function() {
						if (m.is.disabled()) m.debug("Element is disabled API request aborted");
						else {
							if (m.is.loading()) {
								if (!v.interruptRequests) return void m.debug("Cancelling request, previous request is still pending");
								m.debug("Interrupting previous request"), m.abort()
							}
							if (v.defaultData && e.extend(!0, v.urlData, m.get.defaultData()), v.serializeForm && (v.data = m.add.formData(v.data)), !1 === (f = m.get.settings())) return m.cancelled = !0, void m.error(x.beforeSend);
							if (m.cancelled = !1, (h = m.get.templatedURL()) || m.is.mocked()) {
								if ((h = m.add.urlData(h)) || m.is.mocked()) {
									if (f.url = v.base + h, o = e.extend(!0, {}, v, {
											type: v.method || v.type,
											data: p,
											url: v.base + h,
											beforeSend: v.beforeXHR,
											success: function() {},
											failure: function() {},
											complete: function() {}
										}), m.debug("Querying URL", o.url), m.verbose("Using AJAX settings", o), "local" === v.cache && m.read.cachedResponse(h)) return m.debug("Response returned from local cache"), m.request = m.create.request(), void m.request.resolveWith(E, [m.read.cachedResponse(h)]);
									v.throttle ? v.throttleFirstRequest || m.timer ? (m.debug("Throttling request", v.throttle), clearTimeout(m.timer), m.timer = setTimeout(function() {
										m.timer && delete m.timer, m.debug("Sending throttled request", p, o.method), m.send.request()
									}, v.throttle)) : (m.debug("Sending request", p, o.method), m.send.request(), m.timer = setTimeout(function() {}, v.throttle)) : (m.debug("Sending request", p, o.method), m.send.request())
								}
							} else m.error(x.missingURL)
						}
					},
					should: {
						removeError: function() {
							return !0 === v.hideError || "auto" === v.hideError && !m.is.form()
						}
					},
					is: {
						disabled: function() {
							return 0 < C.filter(_.disabled).length
						},
						expectingJSON: function() {
							return "json" === v.dataType || "jsonp" === v.dataType
						},
						form: function() {
							return C.is("form") || D.is("form")
						},
						mocked: function() {
							return v.mockResponse || v.mockResponseAsync || v.response || v.responseAsync
						},
						input: function() {
							return C.is("input")
						},
						loading: function() {
							return !!m.request && "pending" == m.request.state()
						},
						abortedRequest: function(e) {
							return e && e.readyState !== i && 0 === e.readyState ? (m.verbose("XHR request determined to be aborted"), !0) : (m.verbose("XHR request was not aborted"), !1)
						},
						validResponse: function(t) {
							return m.is.expectingJSON() && e.isFunction(v.successTest) ? (m.debug("Checking JSON returned success", v.successTest, t), v.successTest(t) ? (m.debug("Response passed success test", t), !0) : (m.debug("Response failed success test", t), !1)) : (m.verbose("Response is not JSON, skipping validation", v.successTest, t), !0)
						}
					},
					was: {
						cancelled: function() {
							return m.cancelled || !1
						},
						succesful: function() {
							return m.request && "resolved" == m.request.state()
						},
						failure: function() {
							return m.request && "rejected" == m.request.state()
						},
						complete: function() {
							return m.request && ("resolved" == m.request.state() || "rejected" == m.request.state())
						}
					},
					add: {
						urlData: function(t, n) {
							var r, o;
							return t && (r = t.match(v.regExp.required), o = t.match(v.regExp.optional), n = n || v.urlData, r && (m.debug("Looking for required URL variables", r), e.each(r, function(r, o) {
								var a = -1 !== o.indexOf("$") ? o.substr(2, o.length - 3) : o.substr(1, o.length - 2),
									s = e.isPlainObject(n) && n[a] !== i ? n[a] : C.data(a) !== i ? C.data(a) : D.data(a) !== i ? D.data(a) : n[a];
								if (s === i) return m.error(x.requiredParameter, a, t), t = !1;
								m.verbose("Found required variable", a, s), s = v.encodeParameters ? m.get.urlEncodedValue(s) : s, t = t.replace(o, s)
							})), o && (m.debug("Looking for optional URL variables", r), e.each(o, function(r, o) {
								var a = -1 !== o.indexOf("$") ? o.substr(3, o.length - 4) : o.substr(2, o.length - 3),
									s = e.isPlainObject(n) && n[a] !== i ? n[a] : C.data(a) !== i ? C.data(a) : D.data(a) !== i ? D.data(a) : n[a];
								t = s !== i ? (m.verbose("Optional variable Found", a, s), t.replace(o, s)) : (m.verbose("Optional variable not found", a), -1 !== t.indexOf("/" + o) ? t.replace("/" + o, "") : t.replace(o, ""))
							}))), t
						},
						formData: function(t) {
							var n = e.fn.serializeObject !== i,
								r = n ? T.serializeObject() : T.serialize();
							return t = t || v.data, e.isPlainObject(t) ? n ? (m.debug("Extending existing data with form data", t, r), e.extend(!0, {}, t, r)) : (m.error(x.missingSerialize), m.debug("Cant extend data. Replacing data with form data", t, r), r) : (m.debug("Adding form data", r), r)
						}
					},
					send: {
						request: function() {
							m.set.loading(), m.request = m.create.request(), m.is.mocked() ? m.mockedXHR = m.create.mockedXHR() : m.xhr = m.create.xhr(), v.onRequest.call(E, m.request, m.xhr)
						}
					},
					event: {
						trigger: function(e) {
							m.query(), "submit" != e.type && "click" != e.type || e.preventDefault()
						},
						xhr: {
							always: function() {},
							done: function(t, n, i) {
								var r = this,
									o = (new Date).getTime() - g,
									a = v.loadingDuration - o,
									s = !!e.isFunction(v.onResponse) && (m.is.expectingJSON() ? v.onResponse.call(r, e.extend(!0, {}, t)) : v.onResponse.call(r, t));
								a = 0 < a ? a : 0, s && (m.debug("Modified API response in onResponse callback", v.onResponse, s, t), t = s), 0 < a && m.debug("Response completed early delaying state change by", a), setTimeout(function() {
									m.is.validResponse(t) ? m.request.resolveWith(r, [t, i]) : m.request.rejectWith(r, [i, "invalid"])
								}, a)
							},
							fail: function(e, t, n) {
								var i = this,
									r = (new Date).getTime() - g,
									o = v.loadingDuration - r;
								0 < (o = 0 < o ? o : 0) && m.debug("Response completed early delaying state change by", o), setTimeout(function() {
									m.is.abortedRequest(e) ? m.request.rejectWith(i, [e, "aborted", n]) : m.request.rejectWith(i, [e, "error", t, n])
								}, o)
							}
						},
						request: {
							done: function(e, t) {
								m.debug("Successful API Response", e), "local" === v.cache && h && (m.write.cachedResponse(h, e), m.debug("Saving server response locally", m.cache)), v.onSuccess.call(E, e, C, t)
							},
							complete: function(e, t) {
								var n, i;
								m.was.succesful() ? (i = e, n = t) : (n = e, i = m.get.responseFromXHR(n)), m.remove.loading(), v.onComplete.call(E, i, C, n)
							},
							fail: function(e, t, n) {
								var r = m.get.responseFromXHR(e),
									a = m.get.errorFromRequest(r, t, n);
								if ("aborted" == t) return m.debug("XHR Aborted (Most likely caused by page navigation or CORS Policy)", t, n), v.onAbort.call(E, t, C, e), !0;
								"invalid" == t ? m.debug("JSON did not pass success test. A server-side error has most likely occurred", r) : "error" == t && e !== i && (m.debug("XHR produced a server error", t, n), 200 != e.status && n !== i && "" !== n && m.error(x.statusMessage + n, o.url), v.onError.call(E, a, C, e)), v.errorDuration && "aborted" !== t && (m.debug("Adding error state"), m.set.error(), m.should.removeError() && setTimeout(m.remove.error, v.errorDuration)), m.debug("API Request failed", a, e), v.onFailure.call(E, r, C, e)
							}
						}
					},
					create: {
						request: function() {
							return e.Deferred().always(m.event.request.complete).done(m.event.request.done).fail(m.event.request.fail)
						},
						mockedXHR: function() {
							var t, n, i, r = v.mockResponse || v.response,
								o = v.mockResponseAsync || v.responseAsync;
							return i = e.Deferred().always(m.event.xhr.complete).done(m.event.xhr.done).fail(m.event.xhr.fail), r ? (n = e.isFunction(r) ? (m.debug("Using specified synchronous callback", r), r.call(E, f)) : (m.debug("Using settings specified response", r), r), i.resolveWith(E, [n, !1, {
								responseText: n
							}])) : e.isFunction(o) && (t = function(e) {
								m.debug("Async callback returned response", e), e ? i.resolveWith(E, [e, !1, {
									responseText: e
								}]) : i.rejectWith(E, [{
									responseText: e
								}, !1, !1])
							}, m.debug("Using specified async response callback", o), o.call(E, f, t)), i
						},
						xhr: function() {
							var t;
							return t = e.ajax(o).always(m.event.xhr.always).done(m.event.xhr.done).fail(m.event.xhr.fail), m.verbose("Created server request", t, o), t
						}
					},
					set: {
						error: function() {
							m.verbose("Adding error state to element", D), D.addClass(w.error)
						},
						loading: function() {
							m.verbose("Adding loading state to element", D), D.addClass(w.loading), g = (new Date).getTime()
						}
					},
					remove: {
						error: function() {
							m.verbose("Removing error state from element", D), D.removeClass(w.error)
						},
						loading: function() {
							m.verbose("Removing loading state from element", D), D.removeClass(w.loading)
						}
					},
					get: {
						responseFromXHR: function(t) {
							return !!e.isPlainObject(t) && (m.is.expectingJSON() ? m.decode.json(t.responseText) : t.responseText)
						},
						errorFromRequest: function(t, n, r) {
							return e.isPlainObject(t) && t.error !== i ? t.error : v.error[n] !== i ? v.error[n] : r
						},
						request: function() {
							return m.request || !1
						},
						xhr: function() {
							return m.xhr || !1
						},
						settings: function() {
							var t;
							return (t = v.beforeSend.call(E, v)) && (t.success !== i && (m.debug("Legacy success callback detected", t), m.error(x.legacyParameters, t.success), t.onSuccess = t.success), t.failure !== i && (m.debug("Legacy failure callback detected", t), m.error(x.legacyParameters, t.failure), t.onFailure = t.failure), t.complete !== i && (m.debug("Legacy complete callback detected", t), m.error(x.legacyParameters, t.complete), t.onComplete = t.complete)), t === i && m.error(x.noReturnedValue), !1 === t ? t : t !== i ? e.extend(!0, {}, t) : e.extend(!0, {}, v)
						},
						urlEncodedValue: function(e) {
							var n = t.decodeURIComponent(e),
								i = t.encodeURIComponent(e);
							return n !== e ? (m.debug("URL value is already encoded, avoiding double encoding", e), e) : (m.verbose("Encoding value using encodeURIComponent", e, i), i)
						},
						defaultData: function() {
							var t = {};
							return e.isWindow(M) || (m.is.input() ? t.value = C.val() : m.is.form() || (t.text = C.text())), t
						},
						event: function() {
							return e.isWindow(M) || "now" == v.on ? (m.debug("API called without element, no events attached"), !1) : "auto" == v.on ? C.is("input") ? M.oninput !== i ? "input" : M.onpropertychange !== i ? "propertychange" : "keyup" : C.is("form") ? "submit" : "click" : v.on
						},
						templatedURL: function(e) {
							if (e = e || C.data(y.action) || v.action || !1, h = C.data(y.url) || v.url || !1) return m.debug("Using specified url", h), h;
							if (e) {
								if (m.debug("Looking up url for action", e, v.api), v.api[e] === i && !m.is.mocked()) return void m.error(x.missingAction, v.action, v.api);
								h = v.api[e]
							} else m.is.form() && (h = C.attr("action") || D.attr("action") || !1, m.debug("No url or action specified, defaulting to form action", h));
							return h
						}
					},
					abort: function() {
						var e = m.get.xhr();
						e && "resolved" !== e.state() && (m.debug("Cancelling API request"), e.abort())
					},
					reset: function() {
						m.remove.error(), m.remove.loading()
					},
					setting: function(t, n) {
						if (m.debug("Changing setting", t, n), e.isPlainObject(t)) e.extend(!0, v, t);
						else {
							if (n === i) return v[t];
							e.isPlainObject(v[t]) ? e.extend(!0, v[t], n) : v[t] = n
						}
					},
					internal: function(t, n) {
						if (e.isPlainObject(t)) e.extend(!0, m, t);
						else {
							if (n === i) return m[t];
							m[t] = n
						}
					},
					debug: function() {
						!v.silent && v.debug && (v.performance ? m.performance.log(arguments) : (m.debug = Function.prototype.bind.call(console.info, console, v.name + ":"), m.debug.apply(console, arguments)))
					},
					verbose: function() {
						!v.silent && v.verbose && v.debug && (v.performance ? m.performance.log(arguments) : (m.verbose = Function.prototype.bind.call(console.info, console, v.name + ":"), m.verbose.apply(console, arguments)))
					},
					error: function() {
						v.silent || (m.error = Function.prototype.bind.call(console.error, console, v.name + ":"), m.error.apply(console, arguments))
					},
					performance: {
						log: function(e) {
							var t, n;
							v.performance && (n = (t = (new Date).getTime()) - (s || t), s = t, l.push({
								Name: e[0],
								Arguments: [].slice.call(e, 1) || "",
								"Execution Time": n
							})), clearTimeout(m.performance.timer), m.performance.timer = setTimeout(m.performance.display, 500)
						},
						display: function() {
							var t = v.name + ":",
								n = 0;
							s = !1, clearTimeout(m.performance.timer), e.each(l, function(e, t) {
								n += t["Execution Time"]
							}), t += " " + n + "ms", a && (t += " '" + a + "'"), (console.group !== i || console.table !== i) && 0 < l.length && (console.groupCollapsed(t), console.table ? console.table(l) : e.each(l, function(e, t) {
								console.log(t.Name + ": " + t["Execution Time"] + "ms")
							}), console.groupEnd()), l = []
						}
					},
					invoke: function(t, n, o) {
						var a, s, l, u = A;
						return n = n || d, o = M || o, "string" == typeof t && u !== i && (t = t.split(/[\. ]/), a = t.length - 1, e.each(t, function(n, r) {
							var o = n != a ? r + t[n + 1].charAt(0).toUpperCase() + t[n + 1].slice(1) : t;
							if (e.isPlainObject(u[o]) && n != a) u = u[o];
							else {
								if (u[o] !== i) return s = u[o], !1;
								if (!e.isPlainObject(u[r]) || n == a) return u[r] !== i ? s = u[r] : m.error(x.method, t), !1;
								u = u[r]
							}
						})), e.isFunction(s) ? l = s.apply(o, n) : s !== i && (l = s), e.isArray(r) ? r.push(l) : r !== i ? r = [r, l] : l !== i && (r = l), s
					}
				}, c ? (A === i && m.initialize(), m.invoke(u)) : (A !== i && A.invoke("destroy"), m.initialize())
			}), r !== i ? r : this
		}, e.api.settings = {
			name: "API",
			namespace: "api",
			debug: !1,
			verbose: !1,
			performance: !0,
			api: {},
			cache: !0,
			interruptRequests: !0,
			on: "auto",
			stateContext: !1,
			loadingDuration: 0,
			hideError: "auto",
			errorDuration: 2e3,
			encodeParameters: !0,
			action: !1,
			url: !1,
			base: "",
			urlData: {},
			defaultData: !0,
			serializeForm: !1,
			throttle: 0,
			throttleFirstRequest: !0,
			method: "get",
			data: {},
			dataType: "json",
			mockResponse: !1,
			mockResponseAsync: !1,
			response: !1,
			responseAsync: !1,
			beforeSend: function(e) {
				return e
			},
			beforeXHR: function(e) {},
			onRequest: function(e, t) {},
			onResponse: !1,
			onSuccess: function(e, t) {},
			onComplete: function(e, t) {},
			onFailure: function(e, t) {},
			onError: function(e, t) {},
			onAbort: function(e, t) {},
			successTest: !1,
			error: {
				beforeSend: "The before send function has aborted the request",
				error: "There was an error with your request",
				exitConditions: "API Request Aborted. Exit conditions met",
				JSONParse: "JSON could not be parsed during error handling",
				legacyParameters: "You are using legacy API success callback names",
				method: "The method you called is not defined",
				missingAction: "API action used but no url was defined",
				missingSerialize: "jquery-serialize-object is required to add form data to an existing data object",
				missingURL: "No URL specified for api event",
				noReturnedValue: "The beforeSend callback must return a settings object, beforeSend ignored.",
				noStorage: "Caching responses locally requires session storage",
				parseError: "There was an error parsing your request",
				requiredParameter: "Missing a required URL parameter: ",
				statusMessage: "Server gave an error: ",
				timeout: "Your request timed out"
			},
			regExp: {
				required: /\{\$*[A-z0-9]+\}/g,
				optional: /\{\/\$*[A-z0-9]+\}/g
			},
			className: {
				loading: "loading",
				error: "error"
			},
			selector: {
				disabled: ".disabled",
				form: "form"
			},
			metadata: {
				action: "action",
				url: "url"
			}
		}
	}(jQuery, window, document),
	function(e, t, n, i) {
		"use strict";
		t = void 0 !== t && t.Math == Math ? t : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), e.fn.form = function(t) {
			var r, o = e(this),
				a = o.selector || "",
				s = (new Date).getTime(),
				l = [],
				u = t,
				c = arguments[1],
				d = "string" == typeof u,
				f = [].slice.call(arguments, 1);
			return o.each(function() {
				var h, p, g, m, v, b, y, _, x, w, k, S, C, T, D, M, E = e(this),
					A = this,
					P = [],
					O = !1;
				(M = {
					initialize: function() {
						M.get.settings(), d ? (D === i && M.instantiate(), M.invoke(u)) : (D !== i && D.invoke("destroy"), M.verbose("Initializing form validation", E, v), M.bindEvents(), M.set.defaults(), M.instantiate())
					},
					instantiate: function() {
						M.verbose("Storing instance of module", M), D = M, E.data(C, M)
					},
					destroy: function() {
						M.verbose("Destroying previous module", D), M.removeEvents(), E.removeData(C)
					},
					refresh: function() {
						M.verbose("Refreshing selector cache"), h = E.find(_.field), p = E.find(_.group), g = E.find(_.message), E.find(_.prompt), m = E.find(_.submit), E.find(_.clear), E.find(_.reset)
					},
					submit: function() {
						M.verbose("Submitting form", E), E.submit()
					},
					attachEvents: function(t, n) {
						n = n || "submit", e(t).on("click" + T, function(e) {
							M[n](), e.preventDefault()
						})
					},
					bindEvents: function() {
						M.verbose("Attaching form events"), E.on("submit" + T, M.validate.form).on("blur" + T, _.field, M.event.field.blur).on("click" + T, _.submit, M.submit).on("click" + T, _.reset, M.reset).on("click" + T, _.clear, M.clear), v.keyboardShortcuts && E.on("keydown" + T, _.field, M.event.field.keydown), h.each(function() {
							var t = e(this),
								n = t.prop("type"),
								i = M.get.changeEvent(n, t);
							e(this).on(i + T, M.event.field.change)
						})
					},
					clear: function() {
						h.each(function() {
							var t = e(this),
								n = t.parent(),
								i = t.closest(p),
								r = i.find(_.prompt),
								o = t.data(y.defaultValue) || "",
								a = n.is(_.uiCheckbox),
								s = n.is(_.uiDropdown);
							i.hasClass(x.error) && (M.verbose("Resetting error on field", i), i.removeClass(x.error), r.remove()), s ? (M.verbose("Resetting dropdown value", n, o), n.dropdown("clear")) : a ? t.prop("checked", !1) : (M.verbose("Resetting field value", t, o), t.val(""))
						})
					},
					reset: function() {
						h.each(function() {
							var t = e(this),
								n = t.parent(),
								r = t.closest(p),
								o = r.find(_.prompt),
								a = t.data(y.defaultValue),
								s = n.is(_.uiCheckbox),
								l = n.is(_.uiDropdown),
								u = r.hasClass(x.error);
							a !== i && (u && (M.verbose("Resetting error on field", r), r.removeClass(x.error), o.remove()), l ? (M.verbose("Resetting dropdown value", n, a), n.dropdown("restore defaults")) : s ? (M.verbose("Resetting checkbox value", n, a), t.prop("checked", a)) : (M.verbose("Resetting field value", t, a), t.val(a)))
						})
					},
					determine: {
						isValid: function() {
							var t = !0;
							return e.each(b, function(e, n) {
								M.validate.field(n, e, !0) || (t = !1)
							}), t
						}
					},
					is: {
						bracketedRule: function(e) {
							return e.type && e.type.match(v.regExp.bracket)
						},
						shorthandFields: function(e) {
							var t = e[Object.keys(e)[0]];
							return M.is.shorthandRules(t)
						},
						shorthandRules: function(t) {
							return "string" == typeof t || e.isArray(t)
						},
						empty: function(e) {
							return !e || 0 === e.length || (e.is('input[type="checkbox"]') ? !e.is(":checked") : M.is.blank(e))
						},
						blank: function(t) {
							return "" === e.trim(t.val())
						},
						valid: function(t) {
							var n = !0;
							return t ? (M.verbose("Checking if field is valid", t), M.validate.field(b[t], t, !1)) : (M.verbose("Checking if form is valid"), e.each(b, function(e, t) {
								M.is.valid(e) || (n = !1)
							}), n)
						}
					},
					removeEvents: function() {
						E.off(T), h.off(T), m.off(T), h.off(T)
					},
					event: {
						field: {
							keydown: function(t) {
								var n = e(this),
									i = t.which,
									r = n.is(_.input),
									o = n.is(_.checkbox),
									a = 0 < n.closest(_.uiDropdown).length;
								27 == i && (M.verbose("Escape key pressed blurring field"), n.blur()), t.ctrlKey || 13 != i || !r || a || o || (O || (n.one("keyup" + T, M.event.field.keyup), M.submit(), M.debug("Enter pressed on input submitting form")), O = !0)
							},
							keyup: function() {
								O = !1
							},
							blur: function(t) {
								var n = e(this),
									i = n.closest(p),
									r = M.get.validation(n);
								i.hasClass(x.error) ? (M.debug("Revalidating field", n, r), r && M.validate.field(r)) : "blur" == v.on && r && M.validate.field(r)
							},
							change: function(t) {
								var n = e(this),
									i = n.closest(p),
									r = M.get.validation(n);
								r && ("change" == v.on || i.hasClass(x.error) && v.revalidate) && (clearTimeout(M.timer), M.timer = setTimeout(function() {
									M.debug("Revalidating field", n, M.get.validation(n)), M.validate.field(r)
								}, v.delay))
							}
						}
					},
					get: {
						ancillaryValue: function(e) {
							return !(!e.type || !e.value && !M.is.bracketedRule(e)) && (e.value !== i ? e.value : e.type.match(v.regExp.bracket)[1] + "")
						},
						ruleName: function(e) {
							return M.is.bracketedRule(e) ? e.type.replace(e.type.match(v.regExp.bracket)[0], "") : e.type
						},
						changeEvent: function(e, t) {
							return "checkbox" == e || "radio" == e || "hidden" == e || t.is("select") ? "change" : M.get.inputEvent()
						},
						inputEvent: function() {
							return n.createElement("input").oninput !== i ? "input" : n.createElement("input").onpropertychange !== i ? "propertychange" : "keyup"
						},
						fieldsFromShorthand: function(t) {
							var n = {};
							return e.each(t, function(t, i) {
								"string" == typeof i && (i = [i]), n[t] = {
									rules: []
								}, e.each(i, function(e, i) {
									n[t].rules.push({
										type: i
									})
								})
							}), n
						},
						prompt: function(t, n) {
							var i, r, o = M.get.ruleName(t),
								a = M.get.ancillaryValue(t),
								s = M.get.field(n.identifier),
								l = s.val(),
								u = e.isFunction(t.prompt) ? t.prompt(l) : t.prompt || v.prompt[o] || v.text.unspecifiedRule,
								c = -1 !== u.search("{value}"),
								d = -1 !== u.search("{name}");
							return c && (u = u.replace("{value}", s.val())), d && (r = 1 == (i = s.closest(_.group).find("label").eq(0)).length ? i.text() : s.prop("placeholder") || v.text.unspecifiedField, u = u.replace("{name}", r)), u = (u = u.replace("{identifier}", n.identifier)).replace("{ruleValue}", a), t.prompt || M.verbose("Using default validation prompt for type", u, o), u
						},
						settings: function() {
							if (e.isPlainObject(t)) {
								var n = Object.keys(t);
								0 < n.length && t[n[0]].identifier !== i && t[n[0]].rules !== i ? (v = e.extend(!0, {}, e.fn.form.settings, c), b = e.extend({}, e.fn.form.settings.defaults, t), M.error(v.error.oldSyntax, A), M.verbose("Extending settings from legacy parameters", b, v)) : (t.fields && M.is.shorthandFields(t.fields) && (t.fields = M.get.fieldsFromShorthand(t.fields)), v = e.extend(!0, {}, e.fn.form.settings, t), b = e.extend({}, e.fn.form.settings.defaults, v.fields), M.verbose("Extending settings", b, v))
							} else v = e.fn.form.settings, b = e.fn.form.settings.defaults, M.verbose("Using default form validation", b, v);
							S = v.namespace, y = v.metadata, _ = v.selector, x = v.className, w = v.regExp, k = v.error, C = "module-" + S, T = "." + S, D = E.data(C), M.refresh()
						},
						field: function(t) {
							return M.verbose("Finding field with identifier", t), t = M.escape.string(t), 0 < h.filter("#" + t).length ? h.filter("#" + t) : 0 < h.filter('[name="' + t + '"]').length ? h.filter('[name="' + t + '"]') : 0 < h.filter('[name="' + t + '[]"]').length ? h.filter('[name="' + t + '[]"]') : 0 < h.filter("[data-" + y.validate + '="' + t + '"]').length ? h.filter("[data-" + y.validate + '="' + t + '"]') : e("<input/>")
						},
						fields: function(t) {
							var n = e();
							return e.each(t, function(e, t) {
								n = n.add(M.get.field(t))
							}), n
						},
						validation: function(t) {
							var n, i;
							return !!b && (e.each(b, function(e, r) {
								i = r.identifier || e, M.get.field(i)[0] == t[0] && (r.identifier = i, n = r)
							}), n || !1)
						},
						value: function(e) {
							var t = [];
							return t.push(e), M.get.values.call(A, t)[e]
						},
						values: function(t) {
							var n = e.isArray(t) ? M.get.fields(t) : h,
								r = {};
							return n.each(function(t, n) {
								var o = e(n),
									a = (o.prop("type"), o.prop("name")),
									s = o.val(),
									l = o.is(_.checkbox),
									u = o.is(_.radio),
									c = -1 !== a.indexOf("[]"),
									d = !!l && o.is(":checked");
								a && (c ? (a = a.replace("[]", ""), r[a] || (r[a] = []), l ? d ? r[a].push(s || !0) : r[a].push(!1) : r[a].push(s)) : u ? r[a] !== i && 0 != r[a] || (r[a] = !!d && (s || !0)) : r[a] = l ? !!d && (s || !0) : s)
							}), r
						}
					},
					has: {
						field: function(e) {
							return M.verbose("Checking for existence of a field with identifier", e), "string" != typeof(e = M.escape.string(e)) && M.error(k.identifier, e), 0 < h.filter("#" + e).length || 0 < h.filter('[name="' + e + '"]').length || 0 < h.filter("[data-" + y.validate + '="' + e + '"]').length
						}
					},
					escape: {
						string: function(e) {
							return (e = String(e)).replace(w.escape, "\\$&")
						}
					},
					add: {
						rule: function(e, t) {
							M.add.field(e, t)
						},
						field: function(t, n) {
							var i = {};
							M.is.shorthandRules(n) ? (n = e.isArray(n) ? n : [n], i[t] = {
								rules: []
							}, e.each(n, function(e, n) {
								i[t].rules.push({
									type: n
								})
							})) : i[t] = n, b = e.extend({}, b, i), M.debug("Adding rules", i, b)
						},
						fields: function(t) {
							var n;
							n = t && M.is.shorthandFields(t) ? M.get.fieldsFromShorthand(t) : t, b = e.extend({}, b, n)
						},
						prompt: function(t, n) {
							var r = M.get.field(t).closest(p),
								o = r.children(_.prompt),
								a = 0 !== o.length;
							n = "string" == typeof n ? [n] : n, M.verbose("Adding field error state", t), r.addClass(x.error), v.inline && (a || (o = v.templates.prompt(n)).appendTo(r), o.html(n[0]), a ? M.verbose("Inline errors are disabled, no inline error added", t) : v.transition && e.fn.transition !== i && E.transition("is supported") ? (M.verbose("Displaying error with css transition", v.transition), o.transition(v.transition + " in", v.duration)) : (M.verbose("Displaying error with fallback javascript animation"), o.fadeIn(v.duration)))
						},
						errors: function(e) {
							M.debug("Adding form error messages", e), M.set.error(), g.html(v.templates.error(e))
						}
					},
					remove: {
						rule: function(t, n) {
							var r = e.isArray(n) ? n : [n];
							if (n == i) return M.debug("Removed all rules"), void(b[t].rules = []);
							b[t] != i && e.isArray(b[t].rules) && e.each(b[t].rules, function(e, n) {
								-1 !== r.indexOf(n.type) && (M.debug("Removed rule", n.type), b[t].rules.splice(e, 1))
							})
						},
						field: function(t) {
							var n = e.isArray(t) ? t : [t];
							e.each(n, function(e, t) {
								M.remove.rule(t)
							})
						},
						rules: function(t, n) {
							e.isArray(t) ? e.each(fields, function(e, t) {
								M.remove.rule(t, n)
							}) : M.remove.rule(t, n)
						},
						fields: function(e) {
							M.remove.field(e)
						},
						prompt: function(t) {
							var n = M.get.field(t).closest(p),
								r = n.children(_.prompt);
							n.removeClass(x.error), v.inline && r.is(":visible") && (M.verbose("Removing prompt for field", t), v.transition && e.fn.transition !== i && E.transition("is supported") ? r.transition(v.transition + " out", v.duration, function() {
								r.remove()
							}) : r.fadeOut(v.duration, function() {
								r.remove()
							}))
						}
					},
					set: {
						success: function() {
							E.removeClass(x.error).addClass(x.success)
						},
						defaults: function() {
							h.each(function() {
								var t = e(this),
									n = 0 < t.filter(_.checkbox).length ? t.is(":checked") : t.val();
								t.data(y.defaultValue, n)
							})
						},
						error: function() {
							E.removeClass(x.success).addClass(x.error)
						},
						value: function(e, t) {
							var n = {};
							return n[e] = t, M.set.values.call(A, n)
						},
						values: function(t) {
							e.isEmptyObject(t) || e.each(t, function(t, n) {
								var i, r = M.get.field(t),
									o = r.parent(),
									a = e.isArray(n),
									s = o.is(_.uiCheckbox),
									l = o.is(_.uiDropdown),
									u = r.is(_.radio) && s;
								0 < r.length && (a && s ? (M.verbose("Selecting multiple", n, r), o.checkbox("uncheck"), e.each(n, function(e, t) {
									i = r.filter('[value="' + t + '"]'), o = i.parent(), 0 < i.length && o.checkbox("check")
								})) : u ? (M.verbose("Selecting radio value", n, r), r.filter('[value="' + n + '"]').parent(_.uiCheckbox).checkbox("check")) : s ? (M.verbose("Setting checkbox value", n, o), !0 === n ? o.checkbox("check") : o.checkbox("uncheck")) : l ? (M.verbose("Setting dropdown value", n, o), o.dropdown("set selected", n)) : (M.verbose("Setting field value", n, r), r.val(n)))
							})
						}
					},
					validate: {
						form: function(e, t) {
							var n = M.get.values();
							if (O) return !1;
							if (P = [], M.determine.isValid()) {
								if (M.debug("Form has no validation errors, submitting"), M.set.success(), !0 !== t) return v.onSuccess.call(A, e, n)
							} else if (M.debug("Form has errors"), M.set.error(), v.inline || M.add.errors(P), E.data("moduleApi") !== i && e.stopImmediatePropagation(), !0 !== t) return v.onFailure.call(A, P, n)
						},
						field: function(t, n, r) {
							r = r === i || r, "string" == typeof t && (M.verbose("Validating field", t), t = b[n = t]);
							var o = t.identifier || n,
								a = M.get.field(o),
								s = !!t.depends && M.get.field(t.depends),
								l = !0,
								u = [];
							return t.identifier || (M.debug("Using field name as identifier", o), t.identifier = o), a.prop("disabled") ? (M.debug("Field is disabled. Skipping", o), l = !0) : t.optional && M.is.blank(a) ? (M.debug("Field is optional and blank. Skipping", o), l = !0) : t.depends && M.is.empty(s) ? (M.debug("Field depends on another value that is not present or empty. Skipping", s), l = !0) : t.rules !== i && e.each(t.rules, function(e, n) {
								M.has.field(o) && !M.validate.rule(t, n) && (M.debug("Field is invalid", o, n.type), u.push(M.get.prompt(n, t)), l = !1)
							}), l ? (r && (M.remove.prompt(o, u), v.onValid.call(a)), !0) : (r && (P = P.concat(u), M.add.prompt(o, u), v.onInvalid.call(a, u)), !1)
						},
						rule: function(t, n) {
							var r = M.get.field(t.identifier),
								o = (n.type, r.val()),
								a = M.get.ancillaryValue(n),
								s = M.get.ruleName(n),
								l = v.rules[s];
							if (e.isFunction(l)) return o = o === i || "" === o || null === o ? "" : e.trim(o + ""), l.call(r, o, a);
							M.error(k.noRule, s)
						}
					},
					setting: function(t, n) {
						if (e.isPlainObject(t)) e.extend(!0, v, t);
						else {
							if (n === i) return v[t];
							v[t] = n
						}
					},
					internal: function(t, n) {
						if (e.isPlainObject(t)) e.extend(!0, M, t);
						else {
							if (n === i) return M[t];
							M[t] = n
						}
					},
					debug: function() {
						!v.silent && v.debug && (v.performance ? M.performance.log(arguments) : (M.debug = Function.prototype.bind.call(console.info, console, v.name + ":"), M.debug.apply(console, arguments)))
					},
					verbose: function() {
						!v.silent && v.verbose && v.debug && (v.performance ? M.performance.log(arguments) : (M.verbose = Function.prototype.bind.call(console.info, console, v.name + ":"), M.verbose.apply(console, arguments)))
					},
					error: function() {
						v.silent || (M.error = Function.prototype.bind.call(console.error, console, v.name + ":"), M.error.apply(console, arguments))
					},
					performance: {
						log: function(e) {
							var t, n;
							v.performance && (n = (t = (new Date).getTime()) - (s || t), s = t, l.push({
								Name: e[0],
								Arguments: [].slice.call(e, 1) || "",
								Element: A,
								"Execution Time": n
							})), clearTimeout(M.performance.timer), M.performance.timer = setTimeout(M.performance.display, 500)
						},
						display: function() {
							var t = v.name + ":",
								n = 0;
							s = !1, clearTimeout(M.performance.timer), e.each(l, function(e, t) {
								n += t["Execution Time"]
							}), t += " " + n + "ms", a && (t += " '" + a + "'"), 1 < o.length && (t += " (" + o.length + ")"), (console.group !== i || console.table !== i) && 0 < l.length && (console.groupCollapsed(t), console.table ? console.table(l) : e.each(l, function(e, t) {
								console.log(t.Name + ": " + t["Execution Time"] + "ms")
							}), console.groupEnd()), l = []
						}
					},
					invoke: function(t, n, o) {
						var a, s, l, u = D;
						return n = n || f, o = A || o, "string" == typeof t && u !== i && (t = t.split(/[\. ]/), a = t.length - 1, e.each(t, function(n, r) {
							var o = n != a ? r + t[n + 1].charAt(0).toUpperCase() + t[n + 1].slice(1) : t;
							if (e.isPlainObject(u[o]) && n != a) u = u[o];
							else {
								if (u[o] !== i) return s = u[o], !1;
								if (!e.isPlainObject(u[r]) || n == a) return u[r] !== i && (s = u[r]), !1;
								u = u[r]
							}
						})), e.isFunction(s) ? l = s.apply(o, n) : s !== i && (l = s), e.isArray(r) ? r.push(l) : r !== i ? r = [r, l] : l !== i && (r = l), s
					}
				}).initialize()
			}), r !== i ? r : this
		}, e.fn.form.settings = {
			name: "Form",
			namespace: "form",
			debug: !1,
			verbose: !1,
			performance: !0,
			fields: !1,
			keyboardShortcuts: !0,
			on: "submit",
			inline: !1,
			delay: 200,
			revalidate: !0,
			transition: "scale",
			duration: 200,
			onValid: function() {},
			onInvalid: function() {},
			onSuccess: function() {
				return !0
			},
			onFailure: function() {
				return !1
			},
			metadata: {
				defaultValue: "default",
				validate: "validate"
			},
			regExp: {
				htmlID: /^[a-zA-Z][\w:.-]*$/g,
				bracket: /\[(.*)\]/i,
				decimal: /^\d+\.?\d*$/,
				email: /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
				escape: /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
				flags: /^\/(.*)\/(.*)?/,
				integer: /^\-?\d+$/,
				number: /^\-?\d*(\.\d+)?$/,
				url: /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/i
			},
			text: {
				unspecifiedRule: "Please enter a valid value",
				unspecifiedField: "This field"
			},
			prompt: {
				empty: "{name} must have a value",
				checked: "{name} must be checked",
				email: "{name} must be a valid e-mail",
				url: "{name} must be a valid url",
				regExp: "{name} is not formatted correctly",
				integer: "{name} must be an integer",
				decimal: "{name} must be a decimal number",
				number: "{name} must be set to a number",
				is: '{name} must be "{ruleValue}"',
				isExactly: '{name} must be exactly "{ruleValue}"',
				not: '{name} cannot be set to "{ruleValue}"',
				notExactly: '{name} cannot be set to exactly "{ruleValue}"',
				contain: '{name} must contain "{ruleValue}"',
				containExactly: '{name} must contain exactly "{ruleValue}"',
				doesntContain: '{name} cannot contain  "{ruleValue}"',
				doesntContainExactly: '{name} cannot contain exactly "{ruleValue}"',
				minLength: "{name} must be at least {ruleValue} characters",
				length: "{name} must be at least {ruleValue} characters",
				exactLength: "{name} must be exactly {ruleValue} characters",
				maxLength: "{name} cannot be longer than {ruleValue} characters",
				match: "{name} must match {ruleValue} field",
				different: "{name} must have a different value than {ruleValue} field",
				creditCard: "{name} must be a valid credit card number",
				minCount: "{name} must have at least {ruleValue} choices",
				exactCount: "{name} must have exactly {ruleValue} choices",
				maxCount: "{name} must have {ruleValue} or less choices"
			},
			selector: {
				checkbox: 'input[type="checkbox"], input[type="radio"]',
				clear: ".clear",
				field: "input, textarea, select",
				group: ".field",
				input: "input",
				message: ".error.message",
				prompt: ".prompt.label",
				radio: 'input[type="radio"]',
				reset: '.reset:not([type="reset"])',
				submit: '.submit:not([type="submit"])',
				uiCheckbox: ".ui.checkbox",
				uiDropdown: ".ui.dropdown"
			},
			className: {
				error: "error",
				label: "ui prompt label",
				pressed: "down",
				success: "success"
			},
			error: {
				identifier: "You must specify a string identifier for each field",
				method: "The method you called is not defined.",
				noRule: "There is no rule matching the one you specified",
				oldSyntax: "Starting in 2.0 forms now only take a single settings object. Validation settings converted to new syntax automatically."
			},
			templates: {
				error: function(t) {
					var n = '<ul class="list">';
					return e.each(t, function(e, t) {
						n += "<li>" + t + "</li>"
					}), e(n += "</ul>")
				},
				prompt: function(t) {
					return e("<div/>").addClass("ui basic red pointing prompt label").html(t[0])
				}
			},
			rules: {
				empty: function(t) {
					return !(t === i || "" === t || e.isArray(t) && 0 === t.length)
				},
				checked: function() {
					return 0 < e(this).filter(":checked").length
				},
				email: function(t) {
					return e.fn.form.settings.regExp.email.test(t)
				},
				url: function(t) {
					return e.fn.form.settings.regExp.url.test(t)
				},
				regExp: function(t, n) {
					if (n instanceof RegExp) return t.match(n);
					var i, r = n.match(e.fn.form.settings.regExp.flags);
					return r && (n = 2 <= r.length ? r[1] : n, i = 3 <= r.length ? r[2] : ""), t.match(new RegExp(n, i))
				},
				integer: function(t, n) {
					var r, o, a, s = e.fn.form.settings.regExp.integer;
					return n && -1 === ["", ".."].indexOf(n) && (-1 == n.indexOf("..") ? s.test(n) && (r = o = n - 0) : (a = n.split("..", 2), s.test(a[0]) && (r = a[0] - 0), s.test(a[1]) && (o = a[1] - 0))), s.test(t) && (r === i || r <= t) && (o === i || t <= o)
				},
				decimal: function(t) {
					return e.fn.form.settings.regExp.decimal.test(t)
				},
				number: function(t) {
					return e.fn.form.settings.regExp.number.test(t)
				},
				is: function(e, t) {
					return t = "string" == typeof t ? t.toLowerCase() : t, (e = "string" == typeof e ? e.toLowerCase() : e) == t
				},
				isExactly: function(e, t) {
					return e == t
				},
				not: function(e, t) {
					return (e = "string" == typeof e ? e.toLowerCase() : e) != ("string" == typeof t ? t.toLowerCase() : t)
				},
				notExactly: function(e, t) {
					return e != t
				},
				contains: function(t, n) {
					return n = n.replace(e.fn.form.settings.regExp.escape, "\\$&"), -1 !== t.search(new RegExp(n, "i"))
				},
				containsExactly: function(t, n) {
					return n = n.replace(e.fn.form.settings.regExp.escape, "\\$&"), -1 !== t.search(new RegExp(n))
				},
				doesntContain: function(t, n) {
					return n = n.replace(e.fn.form.settings.regExp.escape, "\\$&"), -1 === t.search(new RegExp(n, "i"))
				},
				doesntContainExactly: function(t, n) {
					return n = n.replace(e.fn.form.settings.regExp.escape, "\\$&"), -1 === t.search(new RegExp(n))
				},
				minLength: function(e, t) {
					return e !== i && e.length >= t
				},
				length: function(e, t) {
					return e !== i && e.length >= t
				},
				exactLength: function(e, t) {
					return e !== i && e.length == t
				},
				maxLength: function(e, t) {
					return e !== i && e.length <= t
				},
				match: function(t, n) {
					var r;
					return e(this), 0 < e('[data-validate="' + n + '"]').length ? r = e('[data-validate="' + n + '"]').val() : 0 < e("#" + n).length ? r = e("#" + n).val() : 0 < e('[name="' + n + '"]').length ? r = e('[name="' + n + '"]').val() : 0 < e('[name="' + n + '[]"]').length && (r = e('[name="' + n + '[]"]')), r !== i && t.toString() == r.toString()
				},
				different: function(t, n) {
					var r;
					return e(this), 0 < e('[data-validate="' + n + '"]').length ? r = e('[data-validate="' + n + '"]').val() : 0 < e("#" + n).length ? r = e("#" + n).val() : 0 < e('[name="' + n + '"]').length ? r = e('[name="' + n + '"]').val() : 0 < e('[name="' + n + '[]"]').length && (r = e('[name="' + n + '[]"]')), r !== i && t.toString() !== r.toString()
				},
				creditCard: function(t, n) {
					var i, r, o = {
							visa: {
								pattern: /^4/,
								length: [16]
							},
							amex: {
								pattern: /^3[47]/,
								length: [15]
							},
							mastercard: {
								pattern: /^5[1-5]/,
								length: [16]
							},
							discover: {
								pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
								length: [16]
							},
							unionPay: {
								pattern: /^(62|88)/,
								length: [16, 17, 18, 19]
							},
							jcb: {
								pattern: /^35(2[89]|[3-8][0-9])/,
								length: [16]
							},
							maestro: {
								pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
								length: [12, 13, 14, 15, 16, 17, 18, 19]
							},
							dinersClub: {
								pattern: /^(30[0-5]|^36)/,
								length: [14]
							},
							laser: {
								pattern: /^(6304|670[69]|6771)/,
								length: [16, 17, 18, 19]
							},
							visaElectron: {
								pattern: /^(4026|417500|4508|4844|491(3|7))/,
								length: [16]
							}
						},
						a = {},
						s = !1,
						l = "string" == typeof n && n.split(",");
					if ("string" == typeof t && 0 !== t.length) {
						if (t = t.replace(/[\-]/g, ""), l && (e.each(l, function(n, i) {
								(r = o[i]) && (a = {
									length: -1 !== e.inArray(t.length, r.length),
									pattern: -1 !== t.search(r.pattern)
								}).length && a.pattern && (s = !0)
							}), !s)) return !1;
						if ((i = {
								number: -1 !== e.inArray(t.length, o.unionPay.length),
								pattern: -1 !== t.search(o.unionPay.pattern)
							}).number && i.pattern) return !0;
						for (var u = t.length, c = 0, d = [
								[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
								[0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
							], f = 0; u--;) f += d[c][parseInt(t.charAt(u), 10)], c ^= 1;
						return f % 10 == 0 && 0 < f
					}
				},
				minCount: function(e, t) {
					return 0 == t || (1 == t ? "" !== e : e.split(",").length >= t)
				},
				exactCount: function(e, t) {
					return 0 == t ? "" === e : 1 == t ? "" !== e && -1 === e.search(",") : e.split(",").length == t
				},
				maxCount: function(e, t) {
					return 0 != t && (1 == t ? -1 === e.search(",") : e.split(",").length <= t)
				}
			}
		}
	}(jQuery, window, document),
	function(e, t, n, i) {
		"use strict";
		t = void 0 !== t && t.Math == Math ? t : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), e.fn.visibility = function(r) {
			var o, a = e(this),
				s = a.selector || "",
				l = (new Date).getTime(),
				u = [],
				c = r,
				d = "string" == typeof c,
				f = [].slice.call(arguments, 1),
				h = a.length,
				p = 0;
			return a.each(function() {
				var a, g, m, v, b = e.isPlainObject(r) ? e.extend(!0, {}, e.fn.visibility.settings, r) : e.extend({}, e.fn.visibility.settings),
					y = b.className,
					_ = b.namespace,
					x = b.error,
					w = b.metadata,
					k = "." + _,
					S = "module-" + _,
					C = e(t),
					T = e(this),
					D = e(b.context),
					M = (T.selector, T.data(S)),
					E = t.requestAnimationFrame || t.mozRequestAnimationFrame || t.webkitRequestAnimationFrame || t.msRequestAnimationFrame || function(e) {
						setTimeout(e, 0)
					},
					A = this,
					P = !1;
				v = {
					initialize: function() {
						v.debug("Initializing", b), v.setup.cache(), v.should.trackChanges() && ("image" == b.type && v.setup.image(), "fixed" == b.type && v.setup.fixed(), b.observeChanges && v.observeChanges(), v.bind.events()), v.save.position(), v.is.visible() || v.error(x.visible, T), b.initialCheck && v.checkVisibility(), v.instantiate()
					},
					instantiate: function() {
						v.debug("Storing instance", v), T.data(S, v), M = v
					},
					destroy: function() {
						v.verbose("Destroying previous module"), m && m.disconnect(), g && g.disconnect(), C.off("load" + k, v.event.load).off("resize" + k, v.event.resize), D.off("scroll" + k, v.event.scroll).off("scrollchange" + k, v.event.scrollchange), "fixed" == b.type && (v.resetFixed(), v.remove.placeholder()), T.off(k).removeData(S)
					},
					observeChanges: function() {
						"MutationObserver" in t && (g = new MutationObserver(v.event.contextChanged), m = new MutationObserver(v.event.changed), g.observe(n, {
							childList: !0,
							subtree: !0
						}), m.observe(A, {
							childList: !0,
							subtree: !0
						}), v.debug("Setting up mutation observer", m))
					},
					bind: {
						events: function() {
							v.verbose("Binding visibility events to scroll and resize"), b.refreshOnLoad && C.on("load" + k, v.event.load), C.on("resize" + k, v.event.resize), D.off("scroll" + k).on("scroll" + k, v.event.scroll).on("scrollchange" + k, v.event.scrollchange)
						}
					},
					event: {
						changed: function(e) {
							v.verbose("DOM tree modified, updating visibility calculations"), v.timer = setTimeout(function() {
								v.verbose("DOM tree modified, updating sticky menu"), v.refresh()
							}, 100)
						},
						contextChanged: function(t) {
							[].forEach.call(t, function(t) {
								t.removedNodes && [].forEach.call(t.removedNodes, function(t) {
									(t == A || 0 < e(t).find(A).length) && (v.debug("Element removed from DOM, tearing down events"), v.destroy())
								})
							})
						},
						resize: function() {
							v.debug("Window resized"), b.refreshOnResize && E(v.refresh)
						},
						load: function() {
							v.debug("Page finished loading"), E(v.refresh)
						},
						scroll: function() {
							b.throttle ? (clearTimeout(v.timer), v.timer = setTimeout(function() {
								D.triggerHandler("scrollchange" + k, [D.scrollTop()])
							}, b.throttle)) : E(function() {
								D.triggerHandler("scrollchange" + k, [D.scrollTop()])
							})
						},
						scrollchange: function(e, t) {
							v.checkVisibility(t)
						}
					},
					precache: function(t, i) {
						t instanceof Array || (t = [t]);
						for (var r = t.length, o = 0, a = [], s = n.createElement("img"), l = function() {
								++o >= t.length && e.isFunction(i) && i()
							}; r--;)(s = n.createElement("img")).onload = l, s.onerror = l, s.src = t[r], a.push(s)
					},
					enableCallbacks: function() {
						v.debug("Allowing callbacks to occur"), P = !1
					},
					disableCallbacks: function() {
						v.debug("Disabling all callbacks temporarily"), P = !0
					},
					should: {
						trackChanges: function() {
							return d ? (v.debug("One time query, no need to bind events"), !1) : (v.debug("Callbacks being attached"), !0)
						}
					},
					setup: {
						cache: function() {
							v.cache = {
								occurred: {},
								screen: {},
								element: {}
							}
						},
						image: function() {
							var e = T.data(w.src);
							e && (v.verbose("Lazy loading image", e), b.once = !0, b.observeChanges = !1, b.onOnScreen = function() {
								v.debug("Image on screen", A), v.precache(e, function() {
									v.set.image(e, function() {
										++p == h && b.onAllLoaded.call(this), b.onLoad.call(this)
									})
								})
							})
						},
						fixed: function() {
							v.debug("Setting up fixed"), b.once = !1, b.observeChanges = !1, b.initialCheck = !0, b.refreshOnLoad = !0, r.transition || (b.transition = !1), v.create.placeholder(), v.debug("Added placeholder", a), b.onTopPassed = function() {
								v.debug("Element passed, adding fixed position", T), v.show.placeholder(), v.set.fixed(), b.transition && e.fn.transition !== i && T.transition(b.transition, b.duration)
							}, b.onTopPassedReverse = function() {
								v.debug("Element returned to position, removing fixed", T), v.hide.placeholder(), v.remove.fixed()
							}
						}
					},
					create: {
						placeholder: function() {
							v.verbose("Creating fixed position placeholder"), a = T.clone(!1).css("display", "none").addClass(y.placeholder).insertAfter(T)
						}
					},
					show: {
						placeholder: function() {
							v.verbose("Showing placeholder"), a.css("display", "block").css("visibility", "hidden")
						}
					},
					hide: {
						placeholder: function() {
							v.verbose("Hiding placeholder"), a.css("display", "none").css("visibility", "")
						}
					},
					set: {
						fixed: function() {
							v.verbose("Setting element to fixed position"), T.addClass(y.fixed).css({
								position: "fixed",
								top: b.offset + "px",
								left: "auto",
								zIndex: b.zIndex
							}), b.onFixed.call(A)
						},
						image: function(t, n) {
							if (T.attr("src", t), b.transition)
								if (e.fn.transition !== i) {
									if (T.hasClass(y.visible)) return void v.debug("Transition already occurred on this image, skipping animation");
									T.transition(b.transition, b.duration, n)
								} else T.fadeIn(b.duration, n);
							else T.show()
						}
					},
					is: {
						onScreen: function() {
							return v.get.elementCalculations().onScreen
						},
						offScreen: function() {
							return v.get.elementCalculations().offScreen
						},
						visible: function() {
							return !(!v.cache || !v.cache.element || 0 === v.cache.element.width && 0 === v.cache.element.offset.top)
						},
						verticallyScrollableContext: function() {
							var e = D.get(0) !== t && D.css("overflow-y");
							return "auto" == e || "scroll" == e
						},
						horizontallyScrollableContext: function() {
							var e = D.get(0) !== t && D.css("overflow-x");
							return "auto" == e || "scroll" == e
						}
					},
					refresh: function() {
						v.debug("Refreshing constants (width/height)"), "fixed" == b.type && v.resetFixed(), v.reset(), v.save.position(), b.checkOnRefresh && v.checkVisibility(), b.onRefresh.call(A)
					},
					resetFixed: function() {
						v.remove.fixed(), v.remove.occurred()
					},
					reset: function() {
						v.verbose("Resetting all cached values"), e.isPlainObject(v.cache) && (v.cache.screen = {}, v.cache.element = {})
					},
					checkVisibility: function(e) {
						v.verbose("Checking visibility of element", v.cache.element), !P && v.is.visible() && (v.save.scroll(e), v.save.calculations(), v.passed(), v.passingReverse(), v.topVisibleReverse(), v.bottomVisibleReverse(), v.topPassedReverse(), v.bottomPassedReverse(), v.onScreen(), v.offScreen(), v.passing(), v.topVisible(), v.bottomVisible(), v.topPassed(), v.bottomPassed(), b.onUpdate && b.onUpdate.call(A, v.get.elementCalculations()))
					},
					passed: function(t, n) {
						var r = v.get.elementCalculations();
						if (t && n) b.onPassed[t] = n;
						else {
							if (t !== i) return v.get.pixelsPassed(t) > r.pixelsPassed;
							r.passing && e.each(b.onPassed, function(e, t) {
								r.bottomVisible || r.pixelsPassed > v.get.pixelsPassed(e) ? v.execute(t, e) : b.once || v.remove.occurred(t)
							})
						}
					},
					onScreen: function(e) {
						var t = v.get.elementCalculations(),
							n = e || b.onOnScreen,
							r = "onScreen";
						if (e && (v.debug("Adding callback for onScreen", e), b.onOnScreen = e), t.onScreen ? v.execute(n, r) : b.once || v.remove.occurred(r), e !== i) return t.onOnScreen
					},
					offScreen: function(e) {
						var t = v.get.elementCalculations(),
							n = e || b.onOffScreen,
							r = "offScreen";
						if (e && (v.debug("Adding callback for offScreen", e), b.onOffScreen = e), t.offScreen ? v.execute(n, r) : b.once || v.remove.occurred(r), e !== i) return t.onOffScreen
					},
					passing: function(e) {
						var t = v.get.elementCalculations(),
							n = e || b.onPassing,
							r = "passing";
						if (e && (v.debug("Adding callback for passing", e), b.onPassing = e), t.passing ? v.execute(n, r) : b.once || v.remove.occurred(r), e !== i) return t.passing
					},
					topVisible: function(e) {
						var t = v.get.elementCalculations(),
							n = e || b.onTopVisible,
							r = "topVisible";
						if (e && (v.debug("Adding callback for top visible", e), b.onTopVisible = e), t.topVisible ? v.execute(n, r) : b.once || v.remove.occurred(r), e === i) return t.topVisible
					},
					bottomVisible: function(e) {
						var t = v.get.elementCalculations(),
							n = e || b.onBottomVisible,
							r = "bottomVisible";
						if (e && (v.debug("Adding callback for bottom visible", e), b.onBottomVisible = e), t.bottomVisible ? v.execute(n, r) : b.once || v.remove.occurred(r), e === i) return t.bottomVisible
					},
					topPassed: function(e) {
						var t = v.get.elementCalculations(),
							n = e || b.onTopPassed,
							r = "topPassed";
						if (e && (v.debug("Adding callback for top passed", e), b.onTopPassed = e), t.topPassed ? v.execute(n, r) : b.once || v.remove.occurred(r), e === i) return t.topPassed
					},
					bottomPassed: function(e) {
						var t = v.get.elementCalculations(),
							n = e || b.onBottomPassed,
							r = "bottomPassed";
						if (e && (v.debug("Adding callback for bottom passed", e), b.onBottomPassed = e), t.bottomPassed ? v.execute(n, r) : b.once || v.remove.occurred(r), e === i) return t.bottomPassed
					},
					passingReverse: function(e) {
						var t = v.get.elementCalculations(),
							n = e || b.onPassingReverse,
							r = "passingReverse";
						if (e && (v.debug("Adding callback for passing reverse", e), b.onPassingReverse = e), t.passing ? b.once || v.remove.occurred(r) : v.get.occurred("passing") && v.execute(n, r), e !== i) return !t.passing
					},
					topVisibleReverse: function(e) {
						var t = v.get.elementCalculations(),
							n = e || b.onTopVisibleReverse,
							r = "topVisibleReverse";
						if (e && (v.debug("Adding callback for top visible reverse", e), b.onTopVisibleReverse = e), t.topVisible ? b.once || v.remove.occurred(r) : v.get.occurred("topVisible") && v.execute(n, r), e === i) return !t.topVisible
					},
					bottomVisibleReverse: function(e) {
						var t = v.get.elementCalculations(),
							n = e || b.onBottomVisibleReverse,
							r = "bottomVisibleReverse";
						if (e && (v.debug("Adding callback for bottom visible reverse", e), b.onBottomVisibleReverse = e), t.bottomVisible ? b.once || v.remove.occurred(r) : v.get.occurred("bottomVisible") && v.execute(n, r), e === i) return !t.bottomVisible
					},
					topPassedReverse: function(e) {
						var t = v.get.elementCalculations(),
							n = e || b.onTopPassedReverse,
							r = "topPassedReverse";
						if (e && (v.debug("Adding callback for top passed reverse", e), b.onTopPassedReverse = e), t.topPassed ? b.once || v.remove.occurred(r) : v.get.occurred("topPassed") && v.execute(n, r), e === i) return !t.onTopPassed
					},
					bottomPassedReverse: function(e) {
						var t = v.get.elementCalculations(),
							n = e || b.onBottomPassedReverse,
							r = "bottomPassedReverse";
						if (e && (v.debug("Adding callback for bottom passed reverse", e), b.onBottomPassedReverse = e), t.bottomPassed ? b.once || v.remove.occurred(r) : v.get.occurred("bottomPassed") && v.execute(n, r), e === i) return !t.bottomPassed
					},
					execute: function(e, t) {
						var n = v.get.elementCalculations(),
							i = v.get.screenCalculations();
						(e = e || !1) && (b.continuous ? (v.debug("Callback being called continuously", t, n), e.call(A, n, i)) : v.get.occurred(t) || (v.debug("Conditions met", t, n), e.call(A, n, i))), v.save.occurred(t)
					},
					remove: {
						fixed: function() {
							v.debug("Removing fixed position"), T.removeClass(y.fixed).css({
								position: "",
								top: "",
								left: "",
								zIndex: ""
							}), b.onUnfixed.call(A)
						},
						placeholder: function() {
							v.debug("Removing placeholder content"), a && a.remove()
						},
						occurred: function(e) {
							if (e) {
								var t = v.cache.occurred;
								t[e] !== i && !0 === t[e] && (v.debug("Callback can now be called again", e), v.cache.occurred[e] = !1)
							} else v.cache.occurred = {}
						}
					},
					save: {
						calculations: function() {
							v.verbose("Saving all calculations necessary to determine positioning"), v.save.direction(), v.save.screenCalculations(), v.save.elementCalculations()
						},
						occurred: function(e) {
							e && (v.cache.occurred[e] !== i && !0 === v.cache.occurred[e] || (v.verbose("Saving callback occurred", e), v.cache.occurred[e] = !0))
						},
						scroll: function(e) {
							e = e + b.offset || D.scrollTop() + b.offset, v.cache.scroll = e
						},
						direction: function() {
							var e, t = v.get.scroll(),
								n = v.get.lastScroll();
							return e = n < t && n ? "down" : t < n && n ? "up" : "static", v.cache.direction = e, v.cache.direction
						},
						elementPosition: function() {
							var e = v.cache.element,
								t = v.get.screenSize();
							return v.verbose("Saving element position"), e.fits = e.height < t.height, e.offset = T.offset(), e.width = T.outerWidth(), e.height = T.outerHeight(), v.is.verticallyScrollableContext() && (e.offset.top += D.scrollTop() - D.offset().top), v.is.horizontallyScrollableContext() && (e.offset.left += D.scrollLeft - D.offset().left), v.cache.element = e
						},
						elementCalculations: function() {
							var e = v.get.screenCalculations(),
								t = v.get.elementPosition();
							return b.includeMargin ? (t.margin = {}, t.margin.top = parseInt(T.css("margin-top"), 10), t.margin.bottom = parseInt(T.css("margin-bottom"), 10), t.top = t.offset.top - t.margin.top, t.bottom = t.offset.top + t.height + t.margin.bottom) : (t.top = t.offset.top, t.bottom = t.offset.top + t.height), t.topPassed = e.top >= t.top, t.bottomPassed = e.top >= t.bottom, t.topVisible = e.bottom >= t.top && !t.topPassed, t.bottomVisible = e.bottom >= t.bottom && !t.bottomPassed, t.pixelsPassed = 0, t.percentagePassed = 0, t.onScreen = (t.topVisible || t.passing) && !t.bottomPassed, t.passing = t.topPassed && !t.bottomPassed, t.offScreen = !t.onScreen, t.passing && (t.pixelsPassed = e.top - t.top, t.percentagePassed = (e.top - t.top) / t.height), v.cache.element = t, v.verbose("Updated element calculations", t), t
						},
						screenCalculations: function() {
							var e = v.get.scroll();
							return v.save.direction(), v.cache.screen.top = e, v.cache.screen.bottom = e + v.cache.screen.height, v.cache.screen
						},
						screenSize: function() {
							v.verbose("Saving window position"), v.cache.screen = {
								height: D.height()
							}
						},
						position: function() {
							v.save.screenSize(), v.save.elementPosition()
						}
					},
					get: {
						pixelsPassed: function(e) {
							var t = v.get.elementCalculations();
							return -1 < e.search("%") ? t.height * (parseInt(e, 10) / 100) : parseInt(e, 10)
						},
						occurred: function(e) {
							return v.cache.occurred !== i && v.cache.occurred[e] || !1
						},
						direction: function() {
							return v.cache.direction === i && v.save.direction(), v.cache.direction
						},
						elementPosition: function() {
							return v.cache.element === i && v.save.elementPosition(), v.cache.element
						},
						elementCalculations: function() {
							return v.cache.element === i && v.save.elementCalculations(), v.cache.element
						},
						screenCalculations: function() {
							return v.cache.screen === i && v.save.screenCalculations(), v.cache.screen
						},
						screenSize: function() {
							return v.cache.screen === i && v.save.screenSize(), v.cache.screen
						},
						scroll: function() {
							return v.cache.scroll === i && v.save.scroll(), v.cache.scroll
						},
						lastScroll: function() {
							return v.cache.screen === i ? (v.debug("First scroll event, no last scroll could be found"), !1) : v.cache.screen.top
						}
					},
					setting: function(t, n) {
						if (e.isPlainObject(t)) e.extend(!0, b, t);
						else {
							if (n === i) return b[t];
							b[t] = n
						}
					},
					internal: function(t, n) {
						if (e.isPlainObject(t)) e.extend(!0, v, t);
						else {
							if (n === i) return v[t];
							v[t] = n
						}
					},
					debug: function() {
						!b.silent && b.debug && (b.performance ? v.performance.log(arguments) : (v.debug = Function.prototype.bind.call(console.info, console, b.name + ":"), v.debug.apply(console, arguments)))
					},
					verbose: function() {
						!b.silent && b.verbose && b.debug && (b.performance ? v.performance.log(arguments) : (v.verbose = Function.prototype.bind.call(console.info, console, b.name + ":"), v.verbose.apply(console, arguments)))
					},
					error: function() {
						b.silent || (v.error = Function.prototype.bind.call(console.error, console, b.name + ":"), v.error.apply(console, arguments))
					},
					performance: {
						log: function(e) {
							var t, n;
							b.performance && (n = (t = (new Date).getTime()) - (l || t), l = t, u.push({
								Name: e[0],
								Arguments: [].slice.call(e, 1) || "",
								Element: A,
								"Execution Time": n
							})), clearTimeout(v.performance.timer), v.performance.timer = setTimeout(v.performance.display, 500)
						},
						display: function() {
							var t = b.name + ":",
								n = 0;
							l = !1, clearTimeout(v.performance.timer), e.each(u, function(e, t) {
								n += t["Execution Time"]
							}), t += " " + n + "ms", s && (t += " '" + s + "'"), (console.group !== i || console.table !== i) && 0 < u.length && (console.groupCollapsed(t), console.table ? console.table(u) : e.each(u, function(e, t) {
								console.log(t.Name + ": " + t["Execution Time"] + "ms")
							}), console.groupEnd()), u = []
						}
					},
					invoke: function(t, n, r) {
						var a, s, l, u = M;
						return n = n || f, r = A || r, "string" == typeof t && u !== i && (t = t.split(/[\. ]/), a = t.length - 1, e.each(t, function(n, r) {
							var o = n != a ? r + t[n + 1].charAt(0).toUpperCase() + t[n + 1].slice(1) : t;
							if (e.isPlainObject(u[o]) && n != a) u = u[o];
							else {
								if (u[o] !== i) return s = u[o], !1;
								if (!e.isPlainObject(u[r]) || n == a) return u[r] !== i ? s = u[r] : v.error(x.method, t), !1;
								u = u[r]
							}
						})), e.isFunction(s) ? l = s.apply(r, n) : s !== i && (l = s), e.isArray(o) ? o.push(l) : o !== i ? o = [o, l] : l !== i && (o = l), s
					}
				}, d ? (M === i && v.initialize(), M.save.scroll(), M.save.calculations(), v.invoke(c)) : (M !== i && M.invoke("destroy"), v.initialize())
			}), o !== i ? o : this
		}, e.fn.visibility.settings = {
			name: "Visibility",
			namespace: "visibility",
			debug: !1,
			verbose: !1,
			performance: !0,
			observeChanges: !0,
			initialCheck: !0,
			refreshOnLoad: !0,
			refreshOnResize: !0,
			checkOnRefresh: !0,
			once: !0,
			continuous: !1,
			offset: 0,
			includeMargin: !1,
			context: t,
			throttle: !1,
			type: !1,
			zIndex: "10",
			transition: "fade in",
			duration: 1e3,
			onPassed: {},
			onOnScreen: !1,
			onOffScreen: !1,
			onPassing: !1,
			onTopVisible: !1,
			onBottomVisible: !1,
			onTopPassed: !1,
			onBottomPassed: !1,
			onPassingReverse: !1,
			onTopVisibleReverse: !1,
			onBottomVisibleReverse: !1,
			onTopPassedReverse: !1,
			onBottomPassedReverse: !1,
			onLoad: function() {},
			onAllLoaded: function() {},
			onFixed: function() {},
			onUnfixed: function() {},
			onUpdate: !1,
			onRefresh: function() {},
			metadata: {
				src: "src"
			},
			className: {
				fixed: "fixed",
				placeholder: "placeholder",
				visible: "visible"
			},
			error: {
				method: "The method you called is not defined.",
				visible: "Element is hidden, you must call refresh after element becomes visible"
			}
		}
	}(jQuery, window, document);