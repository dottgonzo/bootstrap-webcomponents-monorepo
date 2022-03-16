"use strict";
exports.__esModule = true;
exports.LanguageTranslator = exports.addComponent = void 0;
function addComponent(componentName, version, allowLocal) {
    if (!document.getElementById("hb-" + componentName + "-script")) {
        var script = document.createElement("script");
        script.id = "hb-" + componentName + "-script";
        script.src = "https://cdn.jsdelivr.net/npm/@htmlbricks/hb-".concat(componentName, "@").concat(version, "/release/release.js");
        if (allowLocal && location.href.includes("localhost")) {
            script.src = "http://localhost:6006/".concat(componentName, "/dist/release.js");
        }
        document.head.appendChild(script);
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
    LanguageTranslator.prototype.translateWord = function (wordKey) {
        return LanguageTranslator.getDictionaryWord(wordKey, this.dictionary, this.lang);
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