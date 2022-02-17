export function addComponent(
  componentName: string,
  version: string,
  allowLocal?: boolean
) {
  if (!document.getElementById("hb-" + componentName + "-script")) {
    const script = document.createElement("script");
    script.id = "hb-" + componentName + "-script";
    script.src = `https://cdn.jsdelivr.net/npm/@htmlbricks/hb-${componentName}@${version}/release/release.js`;
    if (allowLocal && location.href.includes("localhost")) {
      script.src = `http://localhost:6006/${componentName}/dist/release.js`;
    }

    document.head.appendChild(script);
  }
}
