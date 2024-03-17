(()=>{"use strict";var e,t,n,r,i={880:(e,t,n)=>{n.a(e,(async(e,t)=>{try{var r=n(683);n(654),await(0,r.Z)(),t()}catch(e){t(e)}}),1)},683:(e,t,n)=>{function r(e,t){const n=document.createElement("div");n.classList.add("gameboard");for(let r=e.grid.length-1;r>=0;r--)for(let i=0;i<e.grid.length;i++){const a=document.createElement("div");a.classList.add("gameboard-grid"),a.id=`${r}-${i}`;const o=null!==e.grid[r][i].ship;t&&o?a.classList.add("occupied"):t&&!o&&a.classList.add("empty");const d=e.grid[r][i].isHit;d&&o?a.classList.add("occupied","hit"):d&&!o&&a.classList.add("empty","hit"),n.appendChild(a)}return n.style.gridTemplateRows=`repeat(${e.grid.length}, 50px)`,n.style.gridTemplateColumns=`repeat(${e.grid.length}, 50px)`,n}async function i(e){return new Promise((t=>{Array.from(e.children).forEach((e=>{e.addEventListener("click",(()=>{t([parseInt(e.id[0]),parseInt(e.id[2])])}))}))}))}function a(e){document.body.innerHTML="";const t=document.createElement("div");t.classList.add("loading-screen");const n=document.createElement("div");n.classList.add("text"),n.innerHTML=`Switching to ${e}...`,t.appendChild(n);const r=document.createElement("div");r.classList.add("icon"),t.appendChild(r);const i=document.createElement("button");return i.classList.add("switch"),i.innerHTML="Switch",t.appendChild(i),document.body.appendChild(t),new Promise((e=>{i.addEventListener("click",(()=>{e()}))}))}n.d(t,{Z:()=>h});class o{constructor(e){this.grid=[];for(let t=0;t<e;t++){let t=[];for(let n=0;n<e;n++)t.push({isHit:!1,ship:null});this.grid.push(t)}this.fleet=[]}receiveAttack(e,t){this.grid[e][t].isHit=!0,null!==this.grid[e][t].ship&&this.grid[e][t].ship.hit()}placeShip(e,t){let[n,r]=t;const i=[];for(let t=0;t<e.length;t++){let a,o;if("vertical"===e.orientation?(a=n+t,o=r):(a=n,o=r+t),a>=this.grid.length||o>=this.grid.length)throw new Error("Invalid coordinates: Out of bounds");let d=!0;e:for(let e=-1;e<=1;e++)for(let t=-1;t<=1;t++){let n=a+e,r=o+t;if(n>=0&&n<this.grid.length&&r>=0&&r<this.grid.length&&null!==this.grid[n][r].ship){d=!1;break e}}if(!d)throw new Error("Invalid coordinates: Ships are not 1-grid apart");i.push(this.grid[a][o])}i.forEach((t=>{t.ship=e})),this.fleet.push(e)}removeShipAt(e){let[t,n]=e;const r=this.grid[t][n].ship;null!==r&&this.grid.forEach((e=>{e.forEach((e=>{e.ship===r&&(e.ship=null)}))})),this.fleet.splice(this.fleet.indexOf(r),1)}isFleetSunk(){return this.fleet.every((e=>e.isSunk()))}clear(){for(let e=0;e<this.grid.length;e++)for(let t=0;t<this.grid.length;t++)null!==this.grid[e][t].ship&&(this.grid[e][t].ship=null);this.fleet=[]}}class d{constructor(e,t,n){this.name=e,this.gameboard=t,this.isComputer=n}}function s(e,t){const n=[];for(let e=0;e<t.grid.length;e++)for(let r=0;r<t.grid.length;r++)n.push([e,r]);let r=0;for(;r<e.length;){let i=e[r];for(;;){try{let e=Math.floor(Math.random()*n.length),a=n[e],[o,d]=a;n.splice(e,1),t.placeShip(i,[o,d]);for(let r=1;r<i.length;r++){let a;a="vertical"===i.orientation?e+r*t.grid.length:e+r,n.splice(a,1)}r++}catch(e){if(0!==n.length)continue;r=0,t.clear();for(let e=0;e<t.grid.length;e++)for(let r=0;r<t.grid.length;r++)n.push([e,r])}break}}return t}class l{constructor(e,t){if(!["vertical","horizontal"].includes(t))throw new Error('Invalid orientation. Only choose from "vertical" or "horizontal"');this.length=e,this.hits=0,this.orientation=t}hit(){this.hits++}isSunk(){return this.hits===this.length}}function c(e,t){const n=e.cloneNode(!1);return t&&[...e.childNodes].forEach((e=>{n.appendChild(e)})),n}async function p(e,t){let n=s([new l(1,"vertical"),new l(1,"vertical"),new l(1,"vertical"),new l(1,"vertical"),new l(2,"horizontal"),new l(2,"horizontal"),new l(2,"horizontal"),new l(3,"vertical"),new l(3,"horizontal"),new l(4,"horizontal")],new o(10));if(e)return new d("Computer",n,e);{const i=document.createElement("div");i.classList.add("player-creation-prompt"),document.body.appendChild(i);const a=document.createElement("div");a.classList.add("heading"),a.textContent=t,i.appendChild(a);const p=document.createElement("div");p.classList.add("title"),p.innerHTML="Choose Username",i.appendChild(p);const h=document.createElement("form");i.appendChild(h);const u=document.createElement("input");u.id="name",u.type="text",u.maxLength=10,u.placeholde="Player Name",h.appendChild(u);const m=document.createElement("label");m.setAttribute("for","name"),m.textContent="Name",h.appendChild(m);const f=document.createElement("button");return f.classList.add("submit-button"),f.textContent="Create",f.type="submit",h.appendChild(f),new Promise((t=>{h.addEventListener("submit",(async i=>{i.preventDefault(),document.body.innerHTML="";const a=u.value;n=await async function(){const e=[new l(1,"vertical"),new l(1,"vertical"),new l(1,"vertical"),new l(1,"vertical"),new l(2,"horizontal"),new l(2,"horizontal"),new l(2,"horizontal"),new l(3,"vertical"),new l(3,"horizontal"),new l(4,"horizontal")];let t=document.createElement("div");t.classList.add("fleet-container"),document.querySelector("body").appendChild(t);const n=new o(10),i=document.querySelector("body"),a=r(n,document.body);i.appendChild(a),e.forEach((e=>{const r=document.createElement("div");r.classList.add("ship",`size-${e.length}`,`${e.orientation}`),r.draggable=!0,t.appendChild(r),r.addEventListener("dragstart",(i=>{i.target.classList.add("dragging");const o=r.clientHeight-20;i.dataTransfer.setDragImage(r,15,o);let d=r;const s=r.parentElement,[l,c]=s.id.split("-"),p=s.classList.contains("gameboard-grid");[...a.childNodes].forEach((t=>{t.addEventListener("dragover",(e=>{e.preventDefault()})),t.addEventListener("drop",(()=>{try{null!==s&&p&&n.removeShipAt([parseInt(l),parseInt(c)]);let[r,i]=t.id.split("-");n.placeShip(e,[parseInt(r),parseInt(i)]),t.appendChild(d)}catch(t){null!==s&&p&&n.placeShip(e,[parseInt(l),parseInt(c)]),alert(t)}}))})),t.addEventListener("dragover",(e=>{e.preventDefault()})),t.addEventListener("drop",(()=>{null!==s&&p&&n.removeShipAt([parseInt(l),parseInt(c)]),t.appendChild(d)}))})),r.addEventListener("dragend",(e=>{e.target.classList.remove("dragging"),[...a.childNodes].forEach((e=>{const t=c(e,!0);e.parentNode.replaceChild(t,e)}));const n=c(t,!0);t.parentNode.replaceChild(n,t),t=n}))}));const d=document.createElement("button");d.classList.add("reset"),d.textContent="Reset",document.body.appendChild(d),d.addEventListener("click",(()=>{n.clear();for(let e=0;e<10;e++)for(let e=0;e<10;e++)[...a.childNodes].forEach((e=>{e.firstChild&&t.appendChild(e.firstChild),e.innerHTML=""}))}));const p=document.createElement("button");return p.classList.add("random"),p.textContent="Random",document.body.append(p),p.addEventListener("click",(()=>{d.click();const r=s(e,new o(10));for(let e=0;e<10;e++)for(let i=0;i<10;i++)if(r.grid[e][i].ship){const a=r.grid[e][i].ship;try{n.placeShip(a,[e,i]);const r=[...t.childNodes].find((e=>e.classList.contains(`size-${a.length}`)&&e.classList.contains(`${a.orientation}`)));t.removeChild(r),document.getElementById(`${e}-${i}`).appendChild(r)}catch(e){continue}}})),new Promise((e=>{const r=document.createElement("button");r.classList.add("done"),r.textContent="Done",document.querySelector("body").appendChild(r),r.addEventListener("click",(()=>{0===[...t.childNodes].length?(document.body.innerHTML="",e(n)):alert("You must place all the ships on the gameboard!")}))}))}(),t(new d(a,n,e))}))}))}}async function h(){let e,t;switch(await async function(e){const t=document.createElement("div");t.classList.add("game-mode-prompt"),document.body.appendChild(t);const n=document.createElement("div");n.classList.add("title"),n.textContent="Choose Game Mode",t.appendChild(n);const r=document.createElement("form");t.appendChild(r);const i=document.createElement("select");r.appendChild(i),["single-player-1-device","multiplayer-1-device","multiplayer-2-device"].forEach((e=>{const t=document.createElement("option");t.value=e,t.textContent=e.replace(/-/g," ").replace(/\b\w/g,(e=>e.toUpperCase())),i.appendChild(t)}));const a=document.createElement("button");return a.classList.add("submit-button"),a.textContent="Start Game",a.type="submit",r.appendChild(a),new Promise((e=>{r.addEventListener("submit",(t=>{t.preventDefault(),document.body.innerHTML="",e(i.value)}))}))}()){case"single-player-1-device":e=await p(!1,"Player 1"),t=await p(!0,"Player 2");break;case"multiplayer-1-device":e=await p(!1,"Player 1"),t=await p(!1,"Player 2")}let n=await async function(e,t){let n=e,o=t;const d=document.querySelector("body");e:for(;;){for(;;){let e,t;if(n.isComputer)e=Math.floor(Math.random()*n.gameboard.grid.length),t=Math.floor(Math.random()*n.gameboard.grid.length);else{d.innerHTML="",d.appendChild(r(o.gameboard,!1)),d.appendChild(r(n.gameboard,!0));const a=document.querySelector(".gameboard");if(!a)throw new Error('"gameboard" not found');[e,t]=await i(a)}if(!1===o.gameboard.grid[e][t].isHit){if(o.gameboard.receiveAttack(e,t),n.isComputer?(await new Promise((e=>setTimeout(e,1e3))),document.body.innerHTML="",d.appendChild(r(n.gameboard,!1)),d.appendChild(r(o.gameboard,!0))):(d.innerHTML="",d.appendChild(r(o.gameboard,!1)),d.appendChild(r(n.gameboard,!0))),o.gameboard.grid[e][t].ship){if(o.gameboard.isFleetSunk())break e;continue}break}}let e;e=n,n=o,o=e,await new Promise((e=>setTimeout(e,1e3))),n.isComputer||o.isComputer||await a(n.name)}return n}(e,t);alert(`${n.name} won!`)}},426:(e,t,n)=>{n.d(t,{Z:()=>d});var r=n(81),i=n.n(r),a=n(645),o=n.n(a)()(i());o.push([e.id,"body {\n    background-color: rgb(47, 43, 43);\n}\n\n.gameboard {\n    display: grid;\n    width: 500px;\n    height: 500px;\n    /* Grid Template Rows and Columns are dynamically modified in 'renderGameboard' function inside runGame.js module */\n}\n\n.gameboard-grid {\n    border: 1px solid grey;\n}\n\n.gameboard-grid.occupied {\n    background-color: rgb(124, 124, 138);\n}\n\n.gameboard-grid {\n    background-color: black;\n    display: grid;\n    align-items: flex-end;\n}\n\n.gameboard-grid.hit {\n    display: grid;\n    justify-items: center;\n    align-items: center;\n}\n\n.gameboard-grid.occupied.hit:after {\n    content: 'X';\n    font-size: 45px;\n    font-family: sans-serif;\n}\n\n.gameboard-grid.empty.hit:after {\n    content: '·';\n    font-size: 45px;\n    font-family: sans-serif;\n}\n\nbody {\n    display: grid;\n    gap: 10px;\n    grid-auto-flow: column;\n}\n\n.loading-screen .icon {\n    border: 16px solid #f3f3f3;\n    border-top: 16px solid black;\n    border-radius: 50%;\n    width: 120px;\n    height: 120px;\n    animation: spin 2s linear infinite;\n}\n\n@keyframes spin {\n    0% {\n        transform: rotate(0deg);\n    }\n    100% {\n        transform: rotate(360deg);\n    }\n}\n\n.fleet-container {\n    width: 200px;\n    align-items: center;\n    justify-content: space-around;\n    display: flex;\n    gap: 10px;\n    flex-wrap: wrap;\n    background-color: black;\n    padding: 10px;\n}\n\n.ship {\n    background-color: white;\n    border: 0px;\n}\n\n.ship.size-1.vertical {\n    height: 50px;\n    width: 50px;\n}\n.ship.size-2.vertical {\n    height: 100px;\n    width: 50px;\n}\n.ship.size-2.horizontal {\n    height: 50px;\n    width: 100px;\n}\n\n.ship.size-3.vertical {\n    height: 150px;\n    width: 50px;\n}\n.ship.size-3.horizontal {\n    height: 50px;\n    width: 150px;\n}\n\n.ship.size-4.vertical {\n    height: 200;\n    width: 50px;\n}\n.ship.size-4.horizontal {\n    height: 50px;\n    width: 200px;\n}\n\n.gameboard-grid {\n    position: relative;\n}\n\n.gameboard .ship {\n    position: absolute;\n    z-index: 10;\n}\n\n.dragging {\n    transition: 0.01s;\n    transform: translateX(-9999px);\n}\n",""]);const d=o},645:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,r,i,a){"string"==typeof e&&(e=[[null,e,void 0]]);var o={};if(r)for(var d=0;d<this.length;d++){var s=this[d][0];null!=s&&(o[s]=!0)}for(var l=0;l<e.length;l++){var c=[].concat(e[l]);r&&o[c[0]]||(void 0!==a&&(void 0===c[5]||(c[1]="@layer".concat(c[5].length>0?" ".concat(c[5]):""," {").concat(c[1],"}")),c[5]=a),n&&(c[2]?(c[1]="@media ".concat(c[2]," {").concat(c[1],"}"),c[2]=n):c[2]=n),i&&(c[4]?(c[1]="@supports (".concat(c[4],") {").concat(c[1],"}"),c[4]=i):c[4]="".concat(i)),t.push(c))}},t}},81:e=>{e.exports=function(e){return e[1]}},654:(e,t,n)=>{var r=n(379),i=n.n(r),a=n(795),o=n.n(a),d=n(569),s=n.n(d),l=n(565),c=n.n(l),p=n(216),h=n.n(p),u=n(589),m=n.n(u),f=n(426),g={};g.styleTagTransform=m(),g.setAttributes=c(),g.insert=s().bind(null,"head"),g.domAPI=o(),g.insertStyleElement=h(),i()(f.Z,g),f.Z&&f.Z.locals&&f.Z.locals},379:e=>{var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var a={},o=[],d=0;d<e.length;d++){var s=e[d],l=r.base?s[0]+r.base:s[0],c=a[l]||0,p="".concat(l," ").concat(c);a[l]=c+1;var h=n(p),u={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==h)t[h].references++,t[h].updater(u);else{var m=i(u,r);r.byIndex=d,t.splice(d,0,{identifier:p,updater:m,references:1})}o.push(p)}return o}function i(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,i){var a=r(e=e||[],i=i||{});return function(e){e=e||[];for(var o=0;o<a.length;o++){var d=n(a[o]);t[d].references--}for(var s=r(e,i),l=0;l<a.length;l++){var c=n(a[l]);0===t[c].references&&(t[c].updater(),t.splice(c,1))}a=s}}},569:e=>{var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},216:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var i=void 0!==n.layer;i&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,i&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var a=n.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},a={};function o(e){var t=a[e];if(void 0!==t)return t.exports;var n=a[e]={id:e,exports:{}};return i[e](n,n.exports,o),n.exports}e="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",t="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",n="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",r=e=>{e&&e.d<1&&(e.d=1,e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},o.a=(i,a,o)=>{var d;o&&((d=[]).d=-1);var s,l,c,p=new Set,h=i.exports,u=new Promise(((e,t)=>{c=t,l=e}));u[t]=h,u[e]=e=>(d&&e(d),p.forEach(e),u.catch((e=>{}))),i.exports=u,a((i=>{var a;s=(i=>i.map((i=>{if(null!==i&&"object"==typeof i){if(i[e])return i;if(i.then){var a=[];a.d=0,i.then((e=>{o[t]=e,r(a)}),(e=>{o[n]=e,r(a)}));var o={};return o[e]=e=>e(a),o}}var d={};return d[e]=e=>{},d[t]=i,d})))(i);var o=()=>s.map((e=>{if(e[n])throw e[n];return e[t]})),l=new Promise((t=>{(a=()=>t(o)).r=0;var n=e=>e!==d&&!p.has(e)&&(p.add(e),e&&!e.d&&(a.r++,e.push(a)));s.map((t=>t[e](n)))}));return a.r?l:o()}),(e=>(e?c(u[n]=e):l(h),r(d)))),d&&d.d<0&&(d.d=0)},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.nc=void 0,o(880)})();