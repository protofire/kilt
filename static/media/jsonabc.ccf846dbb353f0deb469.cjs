/*! For license information please see jsonabc.ccf846dbb353f0deb469.cjs.LICENSE.txt */
function isArray(r){return"[object Array]"===Object.prototype.toString.call(r)}function isPlainObject(r){return"[object Object]"===Object.prototype.toString.call(r)}function sortObj(r,t){t=t||!1;var o={};return isArray(r)?((o=t?r:r.sort()).forEach((function(r,n){o[n]=sortObj(r,t)})),t||(o=o.sort((function(r,t){return(r=JSON.stringify(r))<(t=JSON.stringify(t))?-1:r>t?1:0})))):isPlainObject(r)?(o={},Object.keys(r).sort((function(r,t){return r.toLowerCase()<t.toLowerCase()?-1:r.toLowerCase()>t.toLowerCase()?1:0})).forEach((function(n){o[n]=sortObj(r[n],t)}))):o=r,o}function cleanJSON(r){return r=(r=r.replace(/,[ \t\r\n]+}/g,"}")).replace(/,[ \t\r\n]+\]/g,"]")}function sort(r,t){var o,n;if(r)try{r=cleanJSON(r),n=sortObj(JSON.parse(r),t),o=JSON.stringify(n,null,4)}catch(e){throw console.error("jsonabc: Incorrect JSON object.",[],e),e}return o}module.exports={sort:sort,sortObj:sortObj,cleanJSON:cleanJSON};