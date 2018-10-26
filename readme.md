# OKEX-V3-JS

[![node version][node-image]][node-url]

[node-image]: https://img.shields.io/badge/node.js-%3E=_4.2-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/


## 类说明
构造函数参数 

url:https://www.okex.com 

accessKey 您在创建API密钥时获得

passphrase 您在创建API密钥时指定

secretKey 您在创建API密钥时获得


### RestCommonApi.js 父类

getOkexTime 获取服务时间

#### RestWalletApi.js 钱包API

 getCurrencies 获取币种列表

 getWallet 钱包账户信息

 getWalletByCurrency 单一币种账户信息

 postTransfer 资金划转

 postWithdrawal 提币

 getWithdrawalFee 提币手续费

 getWithdrawalHistory 查询最近所有币种的提币记录与单个

 getLedger 账单流水查询

 getDepositAddress 获取充值地址

 getDepositHistory 获取充值记录

 RestSpotApi.js 币币交易API

 getAccounts 币币账户信息

 ledger 账单流水查询

 postOrders 下单

 postBatch_orders 批量下单

 postCancel_orders 撤销指定订单

 postCancel_batch_orders 批量撤销订单

 getOrders 获取订单列表

 getOrders_pending 获取所有未成交订单

 geOrdersById 获取订单信息

 getFills 获取成交明细

 getInstruments 获取币对信息

 getInstrumentsBybook 获取深度数据

 getInstrumentsTicker 获取全部ticker信息

 getInstrumentsTickerById 获取某个ticker信息

 getInstrumentsTrades 获取成交数据

 getInstrumentsCandles 获取K线数据

#### RestMarginApi.js 币币杠杆API

 getMarginAccounts 币币杠杆账户信息

 getMarginAccountByInstrument_id 单一币对账户信息

 getMarginLedger 账单流水查询

 getMarginVailability 杠杆配置信息

 getMarginVailabilityById 某个杠杆配置信息

 getMarginBorrowed 获取借币记录

 getMarginBorrowedById 某账户借币记录

 postMarginBorrow 借币

 postMarginRepayment 还币

 postMarginOrders 下单

 postMarginBatch_orders 批量下单

 postMarginCancel_orders 撤销指定订单

 postMarginCancel_batch_orders 批量撤销订单

 getMarginOrders 获取订单列表

 getMarginOrdersById 获取订单信息

 getMarginOrders_pending 获取所有未成交订单

 getMarginFills 获取成交明细

#### RestEttApi.js ETT API

 getEttAccounts 组合账户信息

 getEttAccountsByCurrency 单一币种账户信息

 getEttLedger 账单流水查询

 postEttOrders 下单

 deleteEttOrders 撤销指定订单

 getEttOrders 获取订单列表

 getEttOrdersById 获取订单信息

 getEttConstituents 获取组合成分
 
 getEttDefinePrice 获取ETT清算历史定价


### RestFuturesApi 合约API

getFuturesPosition() 合约持仓信息

getFuturesPosition(instrument_id) 单个合约持仓信息

getFuturesAccounts() 所有币种合约账户信息

getFuturesLeverage(currency) 获取合约币种杠杆倍数   

postFuturesLeverage 设定合约币种杠杆倍数

getFuturesLedger(currency) 账单流水查询

postFuturesOrder(client_oid, instrument_id, type, price, size, match_price, leverage) 下单 

postFuturesOrders(instrument_id, leverage, orders_data) 批量下单

postFuturesCancel_order(instrument_id, order_id) 撤销指定订单

postFuturesCancel_batch_orders(instrument_id, order_ids)  批量撤销订单

getFuturesOrdersByInstrument_id(instrument_id,status,from,to,limit) 获取订单列表

getFuturesOrdersByInstrument_idAndOrderId(instrument_id,order_id) 获取订单信息

getFuturesFills(order_id,instrument_id,from,to,limit) 获取成交明细      

getFuturesInstruments() 获取币对信息

getFuturesInstrumentsBook(instrument_id,size) 获取深度数据

getFuturesInstrumentsTicker() 获取全部ticker信息

getFuturesInstrumentsTickerByInstrument_id(instrument_id) 获取某个ticker信息
 
getFuturesInstrumentsTradesByInstrument_id(instrument_id,from,to,limit) 获取成交数据

getFuturesInstrumentsCandlesByInstrument_id(instrument_id,start,end,granularity) 获取K线数据

getFuturesInstrumentsIndexByInstrument_id(instrument_id) 获取指数信息

getFuturesRate() 获取法币汇率

getFuturesInstrumentsEstimated_price(instrument_id) 获取预估交割价

getFuturesInstrumentsOpen_interest(instrument_id) 获取平台总持仓量

getFuturesInstrumentsPrice_limit(instrument_id) 获取当前限价

getFuturesInstrumentsLiquidation(instrument_id,
        status,
        from,
        to,
        limit) 获取爆仓单

getFuturesInstrumentsHolds(instrument_id) 获取合约挂单冻结数量

## 安装包

```js
npm install 
```

## Testing

```js
npm test
```

## 配置日志

```js
import log4js, { Logger } from 'log4js'

    log4js.configure({
        appenders: {
            console: { type: 'console' }
        },
        categories: { default: { appenders: ['console'], level: 'all' } }
    })
    let loggger = log4js.getLogger()
    loggger.debug("hello world")
```

## How to use
```js
import RestWalletApi from '../src/RestWalletApi'
log4js.configure({
        appenders: {
            console: { type: 'console' }
        },
        categories: { default: { appenders: ['console'], level: 'all' } }
    })
let loggger = log4js.getLogger()

restWalletApi.getCurrencies().then(function (res) {
            res.json().then(function (json) {
                loggger.debug(json)
            })
        })
```


