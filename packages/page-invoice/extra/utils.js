export function printInvoice(opts) {
    var w = window.open("", "PRINT", "height=400,width=600");
    w.document.write("<html><head><title>" + document.title + "</title>");
    w.document.write("</head><body >");
    w.document.write("<style>@page { size: auto;  margin: 0mm; }</style><hb-page-invoice printer=\"yes\" items='" + JSON.stringify(opts.items) + "' headers='" + JSON.stringify(opts.headers) + "'></hb-page-invoice>");
    w.document.write("</body></html>");
    var script = document.createElement("script");
    script.id = "hb-page-invoice-script";
    script.src = "https://cdn.jsdelivr.net/npm/@htmlbricks/hb-page-invoice@" + opts.version + "/release/release.js";
    if (location.href.includes("localhost"))
        script.src = "http://localhost:6006/page-invoice/dist/release.js";
    w.document.head.appendChild(script);
    setTimeout(function () {
        w.print();
        w.close();
    }, 2000);
}
export function OpenInvoiceWindow(opts) {
    var w = window.open("", "PRINT", "height=400,width=600");
    w.document.write("<html><head><title>" + document.title + "</title>");
    w.document.write("</head><body >");
    w.document.write("<style>@page { size: auto;  margin: 0mm; }</style><hb-page-invoice items='" + JSON.stringify(opts.items) + "' headers='" + JSON.stringify(opts.headers) + "'></hb-page-invoice>");
    w.document.write("</body></html>");
    var script = document.createElement("script");
    script.id = "hb-page-invoice-script";
    script.src = "https://cdn.jsdelivr.net/npm/@htmlbricks/hb-page-invoice@" + opts.version + "/release/release.js";
    if (location.href.includes("localhost"))
        script.src = "http://localhost:6006/page-invoice/dist/release.js";
    w.document.head.appendChild(script);
}
