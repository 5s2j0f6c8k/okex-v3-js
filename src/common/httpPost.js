import fetch from 'node-fetch';
import CryptoJS from 'crypto-js'
import log4js, { Logger } from 'log4js'
let loggger = log4js.getLogger()

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
export default function httpPost(url, param, accessKey, passphrase,secretKey) {
    const jsonValue = JSON.stringify(param)
    const timestamp = new Date().toISOString()
    const dirUrl = url.replace(/.*\/\/[^\/]*/, '')
    let sign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(timestamp + 'POST' + dirUrl + jsonValue, secretKey))
    let options = {
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

    }
    loggger.debug(`httpPost:${url} options:${JSON.stringify(options)}`)
    return fetch(url, options)
}