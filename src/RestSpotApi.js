
import httpGet from './common/httpGet'
import httpPost from './common/httpPost'
import RestCommonApi from './RestCommonApi'

/**
 * Okex V3 Rest币币交易API
 * 作者: qugang
 * 邮箱: qgass@163.com
 * 创建时间：2018/10/26
 * @export
 * @class RestSpotApi
 */
export default class RestSpotApi extends RestCommonApi {
    constructor(url, accessKey, passphrase,secretKey) {
        super(url)
        this.url = url
        this.accessKey = accessKey
        this.passphrase = passphrase
        this.secretKey =secretKey
    }


    /**
     * 获取币币账户资产列表(仅展示拥有资金的币对)，查询各币种的余额、冻结和可用等信息。
     *
     * @param {*} currency 	币种 必须
     * @returns
        currency	string	币种
        balance	string	余额
        hold	string	冻结(不可用)
        available	string	可用于交易或资金划转的数量
        id	long	账户id
     * @memberof RestSpotApi
     */
    async getAccounts(currency) {
        if (currency != undefined)
            return await httpGet(`${this.url}/api/spot/v3/accounts/${currency}`, {}, this.accessKey, this.passphrase,this.secretKey)
        else
            return await httpGet(`${this.url}/api/spot/v3/accounts`, {}, this.accessKey, this.passphrase,this.secretKey)
    }


    /**
     *
     * 列出账户资产流水。账户资产流水是指导致账户余额增加或减少的行为。流水会分页，并且按时间倒序排序和存储，最新的排在最前面。请参阅分页部分以获取第一页之后的其他记录。
     * @param {*} from  请求此id之后(更新的数据)的分页内容（举例一列数：1，2，3，4，5。from 4 只有5，to 4有1，2，3） 必须
     * @param {*} to 请求此id之前(更旧的数据)的分页内容 必须
     * @param {*} limit 分页返回的结果集数量，默认为100，最大为100(具体参见分页处的描述) 必须
     * @returns
        ledger_id	long	账单ID
        balance	string	余额
        currency	string	币种
        amount	string	变动数量
        type	string	流水来源
        timestamp	string	账单创建时间
        details	string	如果type是trade或者fee，则会有该details字段将包含order,instrument信息
        order_id	long	交易的ID
        instrument_id	string	交易的币对
     * @memberof RestSpotApi
     */
    async ledger(from, to, limit) {
        return await httpGet(`${this.url}/api/spot/v3/accounts/btc/ledger`, {
            from: from,
            to: to,
            limit: limit
        }, this.accessKey, this.passphrase,this.secretKey)
    }



    /**
     *OKEx币币交易提供限价单和市价单两种下单模式(更多下单模式将会在后期支持)。只有当您的账户有足够的资金才能下单。
     一旦下单，您的账户资金将在订单生命周期内被冻结。被冻结的资金以及数量取决于订单指定的类型和参数。
     *
     * @param {*} client_oid 由您设置的订单ID来识别您的订单 非必须
     * @param {*} type 	limit，market(默认是limit) 必须
     * @param {*} side 	buy or sell 必须
     * @param {*} instrument_id 币对名称 必须
     * @param {*} margin_trading 下单类型(当前为币币交易，请求值为1) 非必须
     * @param {*} price 限价单特殊参数 价格 
     * @param {*} size 限价单特殊参数 买入或卖出的数量
     * @param {*} notional 市价单特殊参数 	买入金额，市价买入是必填notional
     * @returns
        order_id	long	订单ID
        client_oid	string	由您设置的订单ID来识别您的订单
        result	boolean	下单结果。若是下单失败，将给出错误码提示
     * @memberof RestSpotApi
     */
    async postOrders(client_oid, type, side, instrument_id, margin_trading, price, size, notional) {

        return await httpPost(`${this.url}/api/spot/v3/orders`, {
            client_oid: client_oid,
            type: type,
            side: side,
            instrument_id: instrument_id,
            margin_trading: margin_trading,
            price: price,
            size: size,
            notional: notional
        }, this.accessKey, this.passphrase,this.secretKey)
    }



    /**
     *
     * 下指定币对的多个订单（每次只能下最多4个币对且每个币对最多4个订单）。
     * @param {*} client_oid 由您设置的订单ID来识别您的订单 非必须
     * @param {*} type limit,market(默认是limit) 必须
     * @param {*} side 	buy or sell 必须
     * @param {*} instrument_id 币对名称 必须
     * @param {*} margin_trading 下单类型(当前为币币交易，请求值为1) 必须
     * @param {*} price 限价单特殊参数 价格 
     * @param {*} size 限价单特殊参数 买入或卖出的数量
     * @param {*} notional 市价单特殊参数 	买入金额，市价买入是必填notional
     * @returns
     * @memberof RestSpotApi
     */
    async postBatch_orders(batch_orders) {
        return await httpPost(`${this.url}/api/spot/v3/batch_orders`, batch_orders, this.accessKey, this.passphrase,this.secretKey)
    }


    /**
     *
     * 撤销之前下的未完成订单。
     * @param {*} orderId 订单号 必须
     * @param {*} client_oid 由您设置的订单ID来识别您的订单 非必须
     * @param {*} instrument_id 提供此参数则撤销指定币对的相应订单，如果不提供此参数则返回错误码 必须
     * @returns
     * @memberof RestSpotApi
     */
    async postCancel_orders(orderId, client_oid, instrument_id) {
        return  await httpPost(`${this.url}/api/spot/v3/cancel_orders/${orderId}`, {
            client_oid: client_oid,
            instrument_id: instrument_id,
        }, this.accessKey, this.passphrase,this.secretKey)
    }



    /**
     * 撤销指定的某一种或多种币对的所有未完成订单。
     *
     * @param {list} order_ids 订单编号，每次只能撤销同一币对下的最多4笔订单 如: [“1758”,”1779","1880"] 必须 
     * @param {*} instrument_id 币种 必须
     * @returns
        order_id	list	订单ID
        client_oid	string	由您设置的订单ID来识别您的订单
        result	boolean	撤单结果。若是撤单失败，将给出错误码提示
     * @memberof RestSpotApi
     */
    async postCancel_batch_orders(cancel_batch_orders) {
        return await httpPost(`${this.url}/api/spot/v3/cancel_batch_orders/${orderId}`, cancel_batch_orders, this.accessKey, this.passphrase,this.secretKey)
    }



    /**
     * 列出您当前所有的订单信息。这个请求支持分页，并且按时间倒序排序和存储，最新的排在最前面。请参阅分页部分以获取第一页之后的其他纪录。
     *
     * @param {*} instrument_id 	[必填]列出指定币对的订单
     * @param {*} status [必填]仅列出相应状态的订单列表。(all:所有状态 open:未成交 part_filled:部分成交 canceling:撤销中 filled:已成交 cancelled:已撤销 failure:下单失败 ordering:下单中)
     * @param {*} limit 分页返回的结果集数量，默认为100，最大为100(具体参见分页处的描述)
     * @param {*} from 请求此id之后(更新的数据)的分页内容（举例一列数：1，2，3，4，5。From 4 只有5，to 4有1，2，3）
     * @param {*} to 请求此id之前(更旧的数据)的分页内容
     * @returns
     * @memberof RestSpotApi
     */
    async getOrders(instrument_id, status, limit, from, to) {

        return await httpGet(`${this.url}/api/spot/v3/orders`, {
            instrument_id: instrument_id,
            status: status,
            limit: limit,
            from: from,
            to: to
        }, this.accessKey, this.passphrase,this.secretKey)
    }



    /**
     * 列出您当前所有的订单信息。这个请求支持分页，并且按时间倒序排序和存储，最新的排在最前面。请参阅分页部分以获取第一页之后的其他纪录。
     *
     * @param {*} limit 分页返回的结果集数量，默认为100，最大为100(具体参见分页处的描述)
     * @param {*} instrument_id
     * @param {*} from 请求此id之后(更新的数据)的分页内容（举例一列数：1，2，3，4，5。from 4 只有5，to 4有1，2，3）
     * @param {*} to 请求此id之前(更旧的数据)的分页内容
     * @returns
        order_id	long	订单ID
        price	string	价格
        size	string	交易货币数量
        notional	string	买入金额，市价买入时返回
        instrument_id	string	币对名称
        side	string	buy or sell
        type	string	limit,market(默认是limit)
        timestamp	string	订单创建时间
        filled_size	string	已成交数量
        filled_notional	string	已成交金额
        status	string	订单状态(all:所有状态 open:未成交 part_filled:部分成交 canceling:撤销中 filled:已成交 cancelled:已撤销 failure:下单失败 ordering:下单中)
     * @memberof RestSpotApi
     */
    async getOrders_pending(limit, instrument_id, from, to) {

        return await httpGet(`${this.url}/api/spot/v3/orders_pending`, {
            instrument_id: instrument_id,
            limit: limit,
            from: from,
            to: to
        }, this.accessKey, this.passphrase,this.secretKey)
    }



    /**
     *
     * 通过订单ID获取单个订单信息。
     * @param {*} order_id 订单号 必须
     * @param {*} instrument_id 币对 必须
     * @returns
     * @memberof RestSpotApi
     */
    async geOrdersById(order_id, instrument_id) {
        return  await httpGet(`${this.url}/api/spot/v3/orders/${order_id}`, {
            instrument_id: instrument_id
        }, this.accessKey, this.passphrase,this.secretKey)
    }




    /**
     * 获取最近的成交明细表。这个请求支持分页，并且按时间倒序排序和存储，最新的排在最前面。请参阅分页部分以获取第一页之后的其他记录。
     * 
     * @param {*} order_id 	[必填]仅限此order_id的资金明细列表。
     * @param {*} instrument_id [必填]仅限此instrument_id的资金明细表，
     * @param {*} from 请求此id之后(更新的数据)的分页内容（举例一列数：1，2，3，4，5。from 4 只有5，to 4有1，2，3）
     * @param {*} to 请求此id之前(更旧的数据)的分页内容
     * @param {*} limit 分页返回的结果集数量，默认为100，最大为100(具体参见分页处的描述)
     * @returns
        ledger_id	long	账单ID
        instrument_id	string	币对名称
        price	string	价格
        size	string	数量
        order_id	string	订单ID
        timestamp	string	订单创建时间
        exec_type	string	流动性方向(T or M)
        fee	string	手续费
        side	string	订单方向(buy or sell)
     * @memberof RestSpotApi
     */
    async getFills(order_id, instrument_id, from, to, limit) {
        return await httpGet(`${this.url}/api/spot/v3/fills`, {
            order_id: order_id,
            instrument_id: instrument_id,
            from: from,
            to: to,
            limit: limit
        }, this.accessKey, this.passphrase,this.secretKey)
    }


    /**
     *用于获取行情数据，这组公开接口提供了行情数据的快照，无需认证即可调用。
      获取交易币对的列表，查询各币对的交易限制和价格步长等信息。
     *
     * @returns
        instrument_id	string	币对名称
        base_currency	string	交易货币币种
        quote_currency	string	计价货币币种
        min_size	string	最小交易数量
        size_increment	string	交易货币数量精度
        tick_size	string	交易价格精度
     * @memberof RestSpotApi
     */
    async getInstruments() {
        return await httpGet(`${this.url}/api/spot/v3/instruments`, {
        }, this.accessKey, this.passphrase,this.secretKey)
    }


    /**
     *
     * 获取币对的深度列表。这个请求不支持分页，一个请求返回整个深度列表。
     * @param {*} instrument_id 币对名称 必须
     * @param {*} size 	[非必填]返回深度档位数量，最多返回200
     * @param {*} depth [非必填]按价格合并深度，默认为tick_size的值(获取币对信息)
     * @returns
        price	string	价格
        size	string	数量
        num_orders	integer	组成此条深度的订单数量
     * @memberof RestSpotApi
     */
    async getInstrumentsBybook(instrument_id, size, depth) {
        return await httpGet(`${this.url}/api/spot/v3/instruments/${instrument_id}/book`, {
            instrument_id: instrument_id,
            size: size,
            depth: depth
        }, this.accessKey, this.passphrase,this.secretKey)
    }


    /**
     *
     * 获取平台全部币对的最新成交价、买一价、卖一价和24小时交易量的快照信息。
     * @returns
        instrument_id	string	币对名称
        last	string	最新成交价
        best_bid	string	买一价
        best_ask	string	卖一价
        open_24h	string	24小时开盘价
        high_24h	string	24小时最高价
        low_24h	string	24小时最低价
        base_volume_24h	string	24小时成交量，按交易货币统计
        quote_volume_24h	string	24小时成交量，按计价货币统计
        timestamp	string	系统时间戳
     * @memberof RestSpotApi
     */
    async getInstrumentsTicker() {
        return await httpGet(`${this.url}/api/spot/v3/instruments/ticker`, {
        }, this.accessKey, this.passphrase,this.secretKey)
    }


    /**
     * 获取币对的最新成交价、买一价、卖一价和24小时交易量的快照信息。
     *
     * @param {*} instrument_id 币对名称 必须
     * @returns
        instrument_id	string	币对名称
        last	string	最新成交价
        best_bid	string	买一价
        best_ask	string	卖一价
        open_24h	string	24小时开盘价
        high_24h	string	24小时最高价
        low_24h	string	24小时最低价
        base_volume_24h	string	24小时成交量，按交易货币统计
        quote_volume_24h	string	24小时成交量，按计价货币统计
        timestamp	string	系统时间戳
     * @memberof RestSpotApi
     */
    async getInstrumentsTickerById(instrument_id) {
        return await httpGet(`${this.url}/api/spot/v3/instruments/${instrument_id}/ticker`, {
        }, this.accessKey, this.passphrase,this.secretKey)
    }



    /**
     *
     * 获取币对最新的60条成交列表。这个请求支持分页，并且按时间倒序排序和存储，最新的排在最前面。请参阅分页部分以获取第一页之后的其他纪录。
     * @param {*} instrument_id 币对名称 必须
     * @param {*} limit 分页返回的结果集数量，默认为100，最大为100(具体参见分页处的描述)
     * @param {*} from 请求此id之后(更新的数据)的分页内容（举例一列数：1，2，3，4，5。from 4 只有5，to 4有1，2，3）
     * @param {*} to 请求此id之前(更旧的数据)的分页内容
     * @returns
        timestamp	string	成交时间
        trade_id	integer	成交ID
        price	string	成交价格
        size	string	成交数量
        side	string	成交方向
     * @memberof RestSpotApi
     */
    async getInstrumentsTrades(instrument_id, limit, from, to) {
        return await httpGet(`${this.url}/api/spot/v3/instruments/${instrument_id}/trades`, {
            limit: limit,
            from: from,
            to: to
        }, this.accessKey, this.passphrase,this.secretKey)
    }


    /**
     *
     * 获取币对的K线数据。K线数据按请求的粒度分组返回。
     * @param {*} instrument_id 币对名称 必须
     * @param {*} granularity 开始时间(ISO 8601标准)
     * @param {*} start 结束时间(ISO 8601标准)
     * @param {*} end 以秒来计量的时间粒度
     * @returns
        time	string	开始时间
        low	string	最低价格
        high	string	最高价格
        open	string	开盘价格
        close	string	收盘价格
        volume	string	交易量
     * @memberof RestSpotApi
     */
    async getInstrumentsCandles(instrument_id, granularity, start, end) {

        return await httpGet(`${this.url}/api/spot/v3/instruments/btc-usdt/candles`, {
            instrument_id: instrument_id,
            granularity: granularity,
            start: start,
            end: end
        }, this.accessKey, this.passphrase,this.secretKey)
    }
}