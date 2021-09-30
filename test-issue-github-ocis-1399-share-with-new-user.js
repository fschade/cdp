"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./_chunks/times-dd490b81.js"),a=require("./_chunks/files-ae3fb30d.js");require("k6/encoding"),require("k6/http");var t=require("./_chunks/options-80deb912.js"),r=require("k6");require("k6/metrics");var n=require("./_chunks/users-97c44b49.js");require("k6/crypto");var s=function(){function e(){a._classCallCheck(this,e)}return a._createClass(e,null,[{key:"exec",value:function(e){var t=e.credential,r=e.shareType,n=e.shareWith,s=e.path,i=e.permissions,c=e.tags;return a.request({method:"POST",credential:t,path:"/ocs/v1.php/apps/files_sharing/api/v1/shares",params:{tags:c},body:{shareType:r,shareWith:n,path:s,permissions:i}})}}]),e}(),i=function(){function e(){a._classCallCheck(this,e)}return a._createClass(e,null,[{key:"exec",value:function(e){var t=e.credential,r=e.id,n=e.tags;return a.request({method:"POST",credential:t,path:"/ocs/v1.php/apps/files_sharing/api/v1/shares/pending/".concat(r),params:{tags:n}})}}]),e}(),c=function(e){a._inherits(n,e);var t=a._createSuper(n);function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=e.name,s=e.metricID,i=void 0===s?"default":s;return a._classCallCheck(this,n),t.call(this,{name:r||"cloud_".concat(i,"_play_share_create")})}return a._createClass(n,[{key:"exec",value:function(e){var t=e.credential,n=e.shareType,i=e.shareWith,c=e.path,o=e.permissions,d=e.tags;d=a._objectSpread2(a._objectSpread2({},this.tags),d);var u=s.exec({credential:t,shareType:n,shareWith:i,path:c,permissions:o,tags:d});return r.check(u,{"share create status is 200":function(){return 200===u.status}},d)||this.metricErrorRate.add(1,d),this.metricTrend.add(u.timings.duration,d),{response:u,tags:d}}}]),n}(a.Play),o=function(e){a._inherits(n,e);var t=a._createSuper(n);function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=e.name,s=e.metricID,i=void 0===s?"default":s;return a._classCallCheck(this,n),t.call(this,{name:r||"cloud_".concat(i,"_play_share_accept")})}return a._createClass(n,[{key:"exec",value:function(e){var t=e.credential,n=e.id,s=e.tags;s=a._objectSpread2(a._objectSpread2({},this.tags),s);var c=i.exec({credential:t,id:n,tags:s});return r.check(c,{"share accept status is 200":function(){return 200===c.status}},s)||this.metricErrorRate.add(1,s),this.metricTrend.add(c.timings.duration,s),{response:c,tags:s}}}]),n}(a.Play),d=e.times_1(500,(function(){return{size:10,unit:"KB"}})),u=new a.Factory(a.buildAccount({login:a.ACCOUNTS.ADMIN})),l={davCreate:new a.Create,davUpload:new a.Upload,davDelete:new a.Delete,davDownload:new a.Download,usersCreate:new n.Create,usersDelete:new n.Delete,shareCreate:new c,shareAccept:new o,davPropfind:new a.Propfind},h=t.options({tags:{test_id:"share-with-new-user",issue_url:"github.com/owncloud/ocis/issues/1399"},thresholds:d.reduce((function(e,a){return e["".concat(l.davUpload.metricTrendName,"{asset:").concat(a.unit+a.size.toString(),"}")]=[],e["".concat(l.davDownload.metricTrendName,"{asset:").concat(a.unit+a.size.toString(),"}")]=[],e["".concat(l.davDelete.metricTrendName,"{asset:").concat(a.unit+a.size.toString(),"}")]=[],e}),{})});exports.default=function(){var e=new a.Factory({login:a.randomString(),password:a.randomString()}),t={name:e.account.login,password:e.account.password,get credential(){return e.credential}},r={name:u.account.login,password:u.account.password,credential:u.credential};l.usersCreate.exec({credential:r.credential,userName:t.name,password:t.password,email:"".concat(t.name,"@owncloud.com")}),l.davCreate.exec({credential:r.credential,userName:r.name,path:t.name});var n=[];d.forEach((function(e,s){var i=e.unit+e.size.toString(),c=a.buildAsset({name:"".concat(s,"-dummy.zip"),size:e.size,unit:e.unit});l.davUpload.exec({asset:c,credential:r.credential,userName:r.name,path:t.name,tags:{asset:i}}),n.push({id:i,name:c.name})}));var s=l.shareCreate.exec({credential:u.credential,shareType:"0",shareWith:t.name,path:t.name,permissions:"1"});l.shareAccept.exec({credential:e.credential,id:a.parseXML(s.response.body).getElementsByTagName("id")[0].childNodes[0].textContent}),l.davPropfind.exec({credential:t.credential,path:["Shares",t.name].join("/"),userName:t.name}),n.forEach((function(e){l.davDownload.exec({credential:t.credential,userName:t.name,path:["Shares",t.name,e.name].join("/"),tags:{asset:e.id}})})),l.usersDelete.exec({credential:r.credential,userName:t.name}),l.davDelete.exec({credential:r.credential,path:t.name,userName:r.name})},exports.options=h;
