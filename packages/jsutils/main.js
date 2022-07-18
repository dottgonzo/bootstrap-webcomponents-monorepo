"use strict";
exports.__esModule = true;
exports.LanguageTranslator = exports.addComponent = exports.getChildStyleToPass = void 0;
function getChildStyleToPass(parsedStyle, vars) {
    var _a, _b;
    var toreturn = "";
    if (parsedStyle &&
        (vars === null || vars === void 0 ? void 0 : vars.length) &&
        ((_a = Object.keys(parsedStyle)) === null || _a === void 0 ? void 0 : _a.length) &&
        ((_b = vars === null || vars === void 0 ? void 0 : vars.filter(function (f) { return Object.keys(parsedStyle).includes(f.name); })) === null || _b === void 0 ? void 0 : _b.length)) {
        var _loop_1 = function (k) {
            var isPresent = vars === null || vars === void 0 ? void 0 : vars.filter(function (f) { return f.name === k && f.defaultValue !== parsedStyle[k]; });
            if (isPresent) {
                toreturn += "".concat(k, ":").concat(parsedStyle[k], ";");
            }
        };
        for (var _i = 0, _c = Object.keys(parsedStyle); _i < _c.length; _i++) {
            var k = _c[_i];
            _loop_1(k);
        }
    }
    return toreturn;
}
exports.getChildStyleToPass = getChildStyleToPass;
function addComponent(opts) {
    var _a;
    var componentName = ((_a = opts === null || opts === void 0 ? void 0 : opts.repoName.split("/")) === null || _a === void 0 ? void 0 : _a[1]) || (opts === null || opts === void 0 ? void 0 : opts.repoName);
    if (!componentName)
        throw new Error("wrong componentPath " + (opts === null || opts === void 0 ? void 0 : opts.repoName));
    if (!(opts === null || opts === void 0 ? void 0 : opts.version))
        throw new Error("wrong version " + (opts === null || opts === void 0 ? void 0 : opts.version));
    var iifePath = (opts === null || opts === void 0 ? void 0 : opts.iifePath) || "release/release.js";
    if (window && !window.customElements.get(componentName) || (!window && !document.getElementById(componentName + "-script"))) {
        try {
            var script = document.createElement("script");
            script.id = componentName + "-script";
            script.src = "https://cdn.jsdelivr.net/npm/".concat(opts.repoName, "@").concat(opts.version, "/").concat(iifePath);
            if ((opts === null || opts === void 0 ? void 0 : opts.local) && location.href.includes("localhost")) {
                script.src = "".concat(opts.local);
            }
            document.head.appendChild(script);
        }
        catch (err) {
            console.warn(err);
        }
    }
}
exports.addComponent = addComponent;
var LanguageTranslator = /** @class */ (function () {
    function LanguageTranslator(opts) {
        if (!(opts === null || opts === void 0 ? void 0 : opts.dictionary))
            throw new Error("no dictionary provided");
        this.dictionary = opts.dictionary;
        this.setLang(opts === null || opts === void 0 ? void 0 : opts.lang);
    }
    LanguageTranslator.prototype.setLang = function (lang) {
        if (!lang)
            lang = LanguageTranslator.getDefaultLang();
        this.lang = lang;
    };
    LanguageTranslator.prototype.translateWord = function (wordKey, lang) {
        return LanguageTranslator.getDictionaryWord(wordKey, this.dictionary, lang || this.lang);
    };
    LanguageTranslator.prototype.translateDate = function (dateISOString, timeOptions, lang) {
        return LanguageTranslator.formatDate(dateISOString, timeOptions, lang || this.lang);
    };
    LanguageTranslator.getDefaultLang = function () {
        var _a, _b, _c, _d, _e;
        var browserLang = "en";
        if ((navigator === null || navigator === void 0 ? void 0 : navigator.languages) &&
            ((_c = (_b = (_a = navigator.languages[0]) === null || _a === void 0 ? void 0 : _a.split("-")[0]) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === null || _c === void 0 ? void 0 : _c.length)) {
            browserLang = (_e = (_d = navigator.languages[0]) === null || _d === void 0 ? void 0 : _d.split("-")[0]) === null || _e === void 0 ? void 0 : _e.toLowerCase();
        }
        return browserLang;
    };
    LanguageTranslator.getDictionaryWord = function (wordKey, dictionary, lang) {
        var _a;
        if (!wordKey)
            throw new Error("no wordKey provided");
        if (!dictionary)
            throw new Error("no dictionary provided");
        if (lang && ((_a = dictionary[lang]) === null || _a === void 0 ? void 0 : _a[wordKey]))
            return dictionary[lang][wordKey];
        var w = "";
        var defLng = LanguageTranslator.getDefaultLang();
        if (!lang || defLng !== lang) {
            var defaultLng = dictionary === null || dictionary === void 0 ? void 0 : dictionary[defLng];
            if (defaultLng === null || defaultLng === void 0 ? void 0 : defaultLng[wordKey]) {
                w = defaultLng[wordKey];
            }
        }
        return w;
    };
    LanguageTranslator.formatDate = function (dateISOString, timeOptions, lang) {
        if (!dateISOString)
            throw new Error("no date provided");
        if (typeof dateISOString.getMonth !== "function") {
            throw new Error("wrong date format");
        }
        var dayDateFormat = new Intl.DateTimeFormat(lang || LanguageTranslator.getDefaultLang(), timeOptions);
        return dayDateFormat.format(dateISOString);
    };
    return LanguageTranslator;
}());
exports.LanguageTranslator = LanguageTranslator;
//# sourceMappingURL=main.js.map