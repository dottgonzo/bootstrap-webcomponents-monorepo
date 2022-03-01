"use strict";
exports.__esModule = true;
exports.addComponent = void 0;
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
//# sourceMappingURL=main.js.map