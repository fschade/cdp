"use strict";var e=require("./files-ae3fb30d.js"),t=require("k6"),r=function(r){return["test_id"].forEach((function(e){return!r[e]&&t.fail("".concat(e," tag can't be blank"))})),e._objectSpread2(e._objectSpread2({},r),{},{cloud_id:r.cloud_id||e.ENV.CLOUD_ID,cloud_vendor:r.cloud_vendor||e.ENV.CLOUD_VENDOR,cloud_host:r.cloud_host||e.ENV.CLOUD_HOST,test_id:r.test_id.replace(/_/g,"-")})};exports.options=function(t){return e._objectSpread2(e._objectSpread2({insecureSkipTLSVerify:!0,iterations:3,vus:3},t),{},{tags:r(t.tags||{})})};
