export function addComponent(componentName, allowLocal) {
    if (!document.getElementById("hb-" + componentName + "-script")) {
        const script = document.createElement("script");
        script.id = "hb-" + componentName + "-script";
        script.src = `https://cdn.jsdelivr.net/npm/@htmlbricks/hb-${componentName}@${pkg.version}/release/release.js`;
        if (allowLocal && location.href.includes("localhost")) script.src = `http://localhost:6006/${componentName}/dist/release.js`;

        document.head.appendChild(script);
    }
}