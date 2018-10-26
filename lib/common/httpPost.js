'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = httpPost;

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _cryptoJs = require('crypto-js');

var _cryptoJs2 = _interopRequireDefault(_cryptoJs);

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loggger = _log4js2.default.getLogger();

/**
 * Okex V3 Rest post请求
 * 作者: qugang
 * 邮箱: qgass@163.com
 * 创建时间：2018/10/26
 * @export
 * @param {*} url 请求地址
 * @param {*} param 参数
 * @param {*} accessKey 字符串类型的API Key
 * @param {*} passphrase 您在创建API密钥时指定的Passphrase
 */
function httpPost(url, param, accessKey, passphrase, secretKey) {
    var jsonValue = JSON.stringify(param);
    var timestamp = new Date().toISOString();
    var dirUrl = url.replace(/.*\/\/[^\/]*/, '');
    var sign = _cryptoJs2.default.enc.Base64.stringify(_cryptoJs2.default.HmacSHA256(timestamp + 'POST' + dirUrl + jsonValue, secretKey));
    var options = {
        method: 'post',
        body: JSON.stringify(param),
        headers: {
            'OK-ACCESS-KEY': accessKey,
            'OK-ACCESS-SIGN': sign,
            'OK-ACCESS-TIMESTAMP': timestamp,
            'OK-ACCESS-PASSPHRASE': passphrase,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

    };
    loggger.debug('httpPost:' + url + ' options:' + JSON.stringify(options));
    return (0, _nodeFetch2.default)(url, options);
}