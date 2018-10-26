import RestSpotApi from '../src/RestSpotApi'
import chai from 'chai'
import log4js, { Logger } from 'log4js'
let expect = chai.expect
describe('RestSpotApi 测试 ', function () {

    log4js.configure({
        appenders: {
            console: { type: 'console' }
        },
        categories: { default: { appenders: ['console'], level: 'all' } }
    })
    let loggger = log4js.getLogger()


    let restSpotApi = new RestSpotApi("https://www.okex.com", "", "", "")
    it('getAccounts', function (done) {
        restSpotApi.getAccounts().then(function (res) {
            res.json().then(function (json) {
                loggger.debug(json)
            })
            expect(res.status).to.eq(200)
            done()
        })
    })
});