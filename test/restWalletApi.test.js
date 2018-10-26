// import RestWalletApi from '../src/RestWalletApi'
// import chai from 'chai'
// import log4js, { Logger } from 'log4js'
// let expect = chai.expect
// describe('restWalletApi 测试 ', function () {

//     log4js.configure({
//         appenders: {
//             console: { type: 'console' }
//         },
//         categories: { default: { appenders: ['console'], level: 'all' } }
//     })
//     let loggger = log4js.getLogger()


//     let restWalletApi = new RestWalletApi("https://www.okex.com", "", "", "")
//     it('getCurrencies', function (done) {

//         restWalletApi.getCurrencies().then(function (res) {
//             res.json().then(function (json) {
//                 loggger.debug(json)
//             })
//             expect(res.status).to.eq(200)
//             done()
//         })
//     })

//     it("getWallet", function (done) {

//         restWalletApi.getWallet().then(function (res) {
//             res.json().then(function (json) {
//                 loggger.debug(json)
//             })
//             expect(res.status).to.eq(200)
//             done()
//         })
//     })

//     it("postTransfer", function (done) {
//         restWalletApi.postTransfer(0.0001, "eos", 6, 5, 'eos-usdt').then(function (res) {
//             res.json().then(function (json) {
//                 loggger.debug(json)
//             })
//             done()
//         })
//     })

//     // it("getWallet",function(){

//     //     restWalletApi.getWallet().then(function(res){
//     //         res.json().then(function(json){
//     //             loggger.debug(json)
//     //         })
//     //     })
//     // })

//     // it("getWallet",function(){

//     //     restWalletApi.getWallet().then(function(res){
//     //         res.json().then(function(json){
//     //             loggger.debug(json)
//     //         })
//     //     })
//     // })

//     // it("getWallet",function(){

//     //     restWalletApi.getWallet().then(function(res){
//     //         res.json().then(function(json){
//     //             loggger.debug(json)
//     //         })
//     //     })
//     // })

//     // it("getWallet",function(){

//     //     restWalletApi.getWallet().then(function(res){
//     //         res.json().then(function(json){
//     //             loggger.debug(json)
//     //         })
//     //     })
//     // })
// });