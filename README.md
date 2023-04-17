
Paste this into the browser console of a page:
```js
(function o(e="print",n=[],r={}){function t(o){let e=o.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/i);if(!e)return o;let[n,r,t,i]=e.slice(1).map((o,e)=>3===e?parseFloat(o):parseInt(o)),u="#"+[n,r,t].map(o=>l(o)).join("");return isNaN(i)||(u+=l(Math.round(255*i))),u}function l(o){let e=o.toString(16);return 1===e.length?"0"+e:e}function i(o,e,r=""){let l=o.split(")").slice(0,-1).map(o=>o.trim()+")");for(let i of l){if(!i||n.includes(i)||n.includes(t(i)))return;let u=s.has(i)?s.get(i):new Map,d=u.has(e)?u.get(e):new Set;d.add(r),u.set(e,d),s.set(i,u)}}function u(o){return(o.includes("rgb(")&&(o=t(o)),Object.keys(r).includes(o))?r[o]+" - ":""}let s=new Map;for(let d of document.querySelectorAll("body, body *"))i(getComputedStyle(d).color,d,"Font Color"),i(getComputedStyle(d).backgroundColor,d,"Background Color"),i(getComputedStyle(d).borderColor,d,"Border Color"),i(getComputedStyle(d).outlineColor,d,"Outline Color");if("data"==e)return s;for(let[c,a]of(console.log("\n\n\n%c"+s.size+" COLOR"+(s.size>1?"S":"")+" FOUND IN THIS PAGE \n","font-size: 30px; font-weight: bold;"),s)){for(let[f,g]of(console.groupCollapsed("%c  ","background: "+c+";",u(c)+t(c)+" - "+c+" - Found in "+a.size+" element"+(a.size>1?"s":"")),a))console.log(Array.from(g).join(", ")+"\n",f),console.log("");console.groupEnd(),console.log("")}return s.size+" color"+(s.size>1?"s":"")+" found in this page"})(
    "print", // Output format: print | data
    [ // Optional: List the colors you want to exclude
        "rgb(0, 0, 0)",
        "rgba(0, 0, 0, 0)",
        "rgb(255, 255, 255)",
    ],
    { // Optional: Give your known colors names (Shows up with "print" option)
        "#08317e": "Catalina Blue",
        "#1d1c29": "Steel Gray",
    }
);
```