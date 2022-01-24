var release=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function i(t){t.forEach(e)}function s(t){return"function"==typeof t}function r(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function o(t,e){t.appendChild(e)}function a(t,e,n){t.insertBefore(e,n||null)}function d(t){t.parentNode.removeChild(t)}function c(t){return document.createElement(t)}function l(){return t=" ",document.createTextNode(t);var t}function p(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function m(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function h(t,e,n){e in t?t[e]="boolean"==typeof t[e]&&""===n||n:m(t,e,n)}function u(t,e,n,i){null===n?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function f(t){const e={};for(const n of t)e[n.name]=n.value;return e}let b;function g(t){b=t}function y(){if(!b)throw new Error("Function called outside component initialization");return b}function $(){const t=y();return(e,n)=>{const i=t.$$.callbacks[e];if(i){const s=function(t,e,n=!1){const i=document.createEvent("CustomEvent");return i.initCustomEvent(t,n,!1,e),i}(e,n);i.slice().forEach((e=>{e.call(t,s)}))}}}const x=[],w=[],v=[],k=[],E=Promise.resolve();let _=!1;function C(t){v.push(t)}const S=new Set;let N=0;function j(){const t=b;do{for(;N<x.length;){const t=x[N];N++,g(t),A(t.$$)}for(g(null),x.length=0,N=0;w.length;)w.pop()();for(let t=0;t<v.length;t+=1){const e=v[t];S.has(e)||(S.add(e),e())}v.length=0}while(x.length);for(;k.length;)k.pop()();_=!1,S.clear(),g(t)}function A(t){if(null!==t.fragment){t.update(),i(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(C)}}const O=new Set;function M(t,e){-1===t.$$.dirty[0]&&(x.push(t),_||(_=!0,E.then(j)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function L(r,o,a,c,l,p,m,h=[-1]){const u=b;g(r);const f=r.$$={fragment:null,ctx:null,props:p,update:t,not_equal:l,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(o.context||(u?u.$$.context:[])),callbacks:n(),dirty:h,skip_bound:!1,root:o.target||u.$$.root};m&&m(f.root);let y=!1;if(f.ctx=a?a(r,o.props||{},((t,e,...n)=>{const i=n.length?n[0]:e;return f.ctx&&l(f.ctx[t],f.ctx[t]=i)&&(!f.skip_bound&&f.bound[t]&&f.bound[t](i),y&&M(r,t)),e})):[],f.update(),y=!0,i(f.before_update),f.fragment=!!c&&c(f.ctx),o.target){if(o.hydrate){const t=function(t){return Array.from(t.childNodes)}(o.target);f.fragment&&f.fragment.l(t),t.forEach(d)}else f.fragment&&f.fragment.c();o.intro&&(($=r.$$.fragment)&&$.i&&(O.delete($),$.i(x))),function(t,n,r,o){const{fragment:a,on_mount:d,on_destroy:c,after_update:l}=t.$$;a&&a.m(n,r),o||C((()=>{const n=d.map(e).filter(s);c?c.push(...n):i(n),t.$$.on_mount=[]})),l.forEach(C)}(r,o.target,o.anchor,o.customElement),j()}var $,x;g(u)}let B;"function"==typeof HTMLElement&&(B=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){const{on_mount:t}=this.$$;this.$$.on_disconnect=t.map(e).filter(s);for(const t in this.$$.slotted)this.appendChild(this.$$.slotted[t])}attributeChangedCallback(t,e,n){this[t]=n}disconnectedCallback(){i(this.$$.on_disconnect)}$destroy(){!function(t,e){const n=t.$$;null!==n.fragment&&(i(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}});var J="0.4.16";function R(e){let n,s,r,f,b,g,y,$,x,w,v;return{c(){n=c("div"),s=c("div"),r=c("div"),f=c("hb-checkout-paypal"),g=l(),y=c("div"),$=c("hb-checkout-shopping-cart"),this.c=t,h(f,"user",e[1]),h(f,"shipments",b=JSON.stringify(e[0])),m(r,"class","col-7"),u(r,"padding-right","30px"),h($,"items",e[3]),h($,"headers",x=JSON.stringify(e[2])),m(y,"class","col-5"),u(y,"padding-left","30px"),m(s,"class","row"),m(n,"class","container")},m(t,i){a(t,n,i),o(n,s),o(s,r),o(r,f),o(s,g),o(s,y),o(y,$),w||(v=[p(f,"payByCard",e[8]),p(f,"payByAccount",e[9]),p(f,"saveUser",e[10]),p(f,"saveShipment",e[11])],w=!0)},p(t,[e]){2&e&&h(f,"user",t[1]),1&e&&b!==(b=JSON.stringify(t[0]))&&h(f,"shipments",b),8&e&&h($,"items",t[3]),4&e&&x!==(x=JSON.stringify(t[2]))&&h($,"headers",x)},i:t,o:t,d(t){t&&d(n),w=!1,i(v)}}}function U(t,e,n){let{id:i}=e,{shipments:s}=e,{user:r}=e,{headers:o}=e,{items:a}=e,{completed:d}=e;const c=y(),l=$();function p(t,e){l(t,e),c.dispatchEvent&&c.dispatchEvent(new CustomEvent(t,{detail:e}))}function m(t){if(!document.getElementById("hb-"+t+"-script")){const e=document.createElement("script");e.id="hb-"+t+"-script",e.src=`https://cdn.jsdelivr.net/npm/@htmlbricks/hb-${t}@${J}/release/release.js`,location.href.includes("localhost")&&(e.src=`http://localhost:6006/${t}/dist/release.js`),document.head.appendChild(e)}}function h(t){const e=s.findIndex((e=>e.id===t.id)),i=s[e];s.forEach((t=>t.selected=!1)),i.selected=!0,n(2,o.shipmentFee=i.price,o),console.log("sss",i,t)}m("checkout-shopping-cart"),m("checkout-paypal");return t.$$set=t=>{"id"in t&&n(6,i=t.id),"shipments"in t&&n(0,s=t.shipments),"user"in t&&n(1,r=t.user),"headers"in t&&n(2,o=t.headers),"items"in t&&n(3,a=t.items),"completed"in t&&n(7,d=t.completed)},t.$$.update=()=>{207&t.$$.dirty&&(i||n(6,i=null),d||n(7,d="no"),s?"string"==typeof s&&n(0,s=JSON.parse(s)||[]):n(0,s=[]),o?"string"==typeof o&&n(2,o=JSON.parse(o)):n(2,o={}),(s.find((t=>t.selected))||s.find((t=>t.standard)))&&n(2,o.shipmentFee=(s.find((t=>t.selected))||s.find((t=>t.standard))).price,o),a||n(3,a=null),r||n(1,r=null))},[s,r,o,a,p,h,i,d,t=>p("payByCard",t.detail),t=>p("payByAccount",t.detail),t=>p("saveUser",t.detail),t=>h(t.detail)]}class F extends B{constructor(t){super(),this.shadowRoot.innerHTML='<style>@charset "UTF-8";@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css");:host{--bs-blue:#0d6efd;--bs-indigo:#6610f2;--bs-purple:#6f42c1;--bs-pink:#d63384;--bs-red:#dc3545;--bs-orange:#fd7e14;--bs-yellow:#ffc107;--bs-green:#198754;--bs-teal:#20c997;--bs-cyan:#0dcaf0;--bs-white:#fff;--bs-gray:#6c757d;--bs-gray-dark:#343a40;--bs-gray-100:#f8f9fa;--bs-gray-200:#e9ecef;--bs-gray-300:#dee2e6;--bs-gray-400:#ced4da;--bs-gray-500:#adb5bd;--bs-gray-600:#6c757d;--bs-gray-700:#495057;--bs-gray-800:#343a40;--bs-gray-900:#212529;--bs-primary:#07689f;--bs-secondary:#c9d6df;--bs-success:#11d3bc;--bs-info:#a2d5f2;--bs-warning:#ff7e67;--bs-danger:#f67280;--bs-light:#fafafa;--bs-dark:#4e4e4e;--bs-primary-rgb:7, 104, 159;--bs-secondary-rgb:201, 214, 223;--bs-success-rgb:17, 211, 188;--bs-info-rgb:162, 213, 242;--bs-warning-rgb:255, 126, 103;--bs-danger-rgb:246, 114, 128;--bs-light-rgb:250, 250, 250;--bs-dark-rgb:78, 78, 78;--bs-white-rgb:255, 255, 255;--bs-black-rgb:0, 0, 0;--bs-body-color-rgb:33, 37, 41;--bs-body-bg-rgb:255, 255, 255;--bs-font-sans-serif:system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--bs-font-monospace:SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--bs-gradient:linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0));--bs-body-font-family:var(--bs-font-sans-serif);--bs-body-font-size:1rem;--bs-body-font-weight:400;--bs-body-line-height:1.5;--bs-body-color:#212529;--bs-body-bg:#fff}*,*::before,*::after{box-sizing:border-box}@media(prefers-reduced-motion: no-preference){:host{scroll-behavior:smooth}}@media(min-width: 1200px){}@media(min-width: 1200px){}@media(min-width: 1200px){}@media(min-width: 1200px){}::-moz-focus-inner{padding:0;border-style:none}@media(min-width: 1200px){}::-webkit-datetime-edit-fields-wrapper,::-webkit-datetime-edit-text,::-webkit-datetime-edit-minute,::-webkit-datetime-edit-hour-field,::-webkit-datetime-edit-day-field,::-webkit-datetime-edit-month-field,::-webkit-datetime-edit-year-field{padding:0}::-webkit-inner-spin-button{height:auto}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-color-swatch-wrapper{padding:0}::file-selector-button{font:inherit}::-webkit-file-upload-button{font:inherit;-webkit-appearance:button}@media(min-width: 1200px){}@media(min-width: 1200px){}@media(min-width: 1200px){}@media(min-width: 1200px){}@media(min-width: 1200px){}@media(min-width: 1200px){}.container{width:100%;padding-right:var(--bs-gutter-x, 0.75rem);padding-left:var(--bs-gutter-x, 0.75rem);margin-right:auto;margin-left:auto}@media(min-width: 576px){.container{max-width:540px}}@media(min-width: 768px){.container{max-width:720px}}@media(min-width: 992px){.container{max-width:960px}}@media(min-width: 1200px){.container{max-width:1140px}}@media(min-width: 1400px){.container{max-width:1320px}}.row{--bs-gutter-x:1.5rem;--bs-gutter-y:0;display:flex;flex-wrap:wrap;margin-top:calc(-1 * var(--bs-gutter-y));margin-right:calc(-0.5 * var(--bs-gutter-x));margin-left:calc(-0.5 * var(--bs-gutter-x))}.row>*{flex-shrink:0;width:100%;max-width:100%;padding-right:calc(var(--bs-gutter-x) * 0.5);padding-left:calc(var(--bs-gutter-x) * 0.5);margin-top:var(--bs-gutter-y)}.col-5{flex:0 0 auto;width:41.66666667%}.col-7{flex:0 0 auto;width:58.33333333%}@media(min-width: 576px){}@media(min-width: 768px){}@media(min-width: 992px){}@media(min-width: 1200px){}@media(min-width: 1400px){}@media(prefers-reduced-motion: reduce){}@media(min-width: 576px){}@media(min-width: 768px){}@media(min-width: 992px){}@media(min-width: 1200px){}@media(min-width: 1400px){}@media(min-width: 1200px){}@media print{}:host{font-family:"Roboto", sans-serif;display:block;margin:40px 0px 40px 0px}</style>',L(this,{target:this.shadowRoot,props:f(this.attributes),customElement:!0},U,R,r,{id:6,shipments:0,user:1,headers:2,items:3,completed:7},null),t&&(t.target&&a(t.target,this,t.anchor),t.props&&(this.$set(t.props),j()))}static get observedAttributes(){return["id","shipments","user","headers","items","completed"]}get id(){return this.$$.ctx[6]}set id(t){this.$$set({id:t}),j()}get shipments(){return this.$$.ctx[0]}set shipments(t){this.$$set({shipments:t}),j()}get user(){return this.$$.ctx[1]}set user(t){this.$$set({user:t}),j()}get headers(){return this.$$.ctx[2]}set headers(t){this.$$set({headers:t}),j()}get items(){return this.$$.ctx[3]}set items(t){this.$$set({items:t}),j()}get completed(){return this.$$.ctx[7]}set completed(t){this.$$set({completed:t}),j()}}return customElements.define("hb-page-checkout-paypal",F),F}();
//# sourceMappingURL=release.js.map
