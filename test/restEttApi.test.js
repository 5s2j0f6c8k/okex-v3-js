import RestEttApi from '../src/RestEttApi'
import chai from 'chai'
import log4js, { Logger } from 'log4js'
let expect = chai.expect
describe('RestEttApi 测试 ', function () {

    log4js.configure({
        appenders: {
            console: { type: 'console' }
        },
        categories: { default: { appenders: ['console'], level: 'all' } }
    })
    let loggger = log4js.getLogger()


    let restEttApi = new RestEttApi("https://www.okex.com", "", "", "")
    it('getEttAccounts', function (done) {

        restEttApi.getEttAccounts().then(function (res) {
            res.json().then(function (json) {
                loggger.debug(json)
            })
            expect(res.status).to.eq(200)
            done()
        })
    })
});