import httpGet from './common/httpGet'
import httpPost from './common/httpPost'
import httpDelete from './common/httpDelete'
import RestCommonApi from './RestCommonApi'

/**
 * Okex V3 Rest ett Api
 * 作者: qugang
 * 邮箱: qgass@163.com
 * 创建时间：2018/10/26
 * @class RestWalletApi
 */
export default class RestEttApi extends RestCommonApi{
    constructor(url, accessKey, passphrase,secretKey) {
        super(url)
        this.url = url
        this.accessKey = accessKey
        this.passphrase = passphrase
        this.secretKey =secretKey
    }


    /**
     * 组合账户信息
     * 获取组合账户资产列表，查询各币种的余额、冻结和可用等信息。
     * GET /api/ett/v3/accounts
     * @returns
        参数名	描述
        currency	币种或ett名称
        balance	余额
        holds	冻结(不可用)
        available	可用于交易或资金划转的数量
     * @memberof RestEttApi
     */
    async getEttAccounts(){
        return await httpGet(`${this.url}/api/ett/v3/accounts`, {}, this.accessKey, this.passphrase,this.secretKey)
    }


    /**
     * 单一币种账户信息
     * 获取组合账户单个币种的余额、冻结和可用等信息。
     * GET /api/ett/v3/accounts/<currency>
     * @param {*} currency
     * @returns
        参数名	描述
        balance	余额
        holds	冻结(不可用)
        available	可用于交易或资金划转的数量
     * @memberof RestEttApi
     */
    async getEttAccountsByCurrency(currency){
        return await httpGet(`${this.url}/api/ett/v3/accounts/${currency}`, {}, this.accessKey, this.passphrase,this.secretKey)
    }



    /**
     * 账单流水查询
     * 列出帐户资产流水。帐户资产流水是指导致帐户余额增加或减少的行为。流水会分页，并且按时间倒序排序和存储，最新的排在最前面。请参阅分页部分以获取第一页之后的其他纪录。
     * GET /api/ett/v3/accounts/<currency>/ledger
     * @param {*} currency
     * @returns
        参数名	描述
        ledger_id	账单ID
        currency	币种或ett名称
        balance	余额
        amount	变动数量
        type	流水来源
        created_at	账单创建时间
        details	如果类型是交易产生的，则该details字段将包含该交易的关联信息
        流水来源类型	描述
        transfer	资金转入/转出
        match	交易产生的资金变动
        fee	手续费
        rebate	返佣
        Type	Description
        transfer	Funds transfer
        match	Funds moved as a result of a trade
        fee	Fee as a result of a trade
        rebate	Fee reate as per our fee schedule
     * @memberof RestEttApi
     */
    async getEttLedger(currency){
        return await httpGet(`${this.url}/api/ett/v3/accounts/${currency}/ledger`, {}, this.accessKey, this.passphrase,this.secretKey)
    }


    /**
     * 下单
     * OKEx组合交易提供申购和赎回两种下单模式。只有当您的账户有足够的资金才能下单。一旦下单，您的账户资金将在订单生命周期内被冻结。被冻结的资金以及数量取决于订单指定的类型和参数。
     * POST /api/ett/v3/orders
     * @param {*} client_oid 	[非必填]由您设置的订单ID来识别您的订单
     * @param {*} type  订单类型(0：组合申购 1:用USDT申购 2:赎回USDT 3:立即赎回ett成分)
     * @param {*} quote_currency 申购/赎回币种
     * @param {*} amount 申购金额，usdt申购必填参数
     * @param {*} size 	赎回数量，赎回和组合申购必填参数
     * @param {*} ett 申购/赎回ett名称
     * @returns
        参数名	描述
        order_id	订单ID
        client_oid	由您设置的订单ID来识别您的订单
        result	下单结果。若是下单失败，将给出错误码提示
     * @memberof RestEttApi
     */
    async postEttOrders(client_oid,type,quote_currency,amount,size,ett){
        return await httpPost(`${this.url}/api/ett/v3/accounts/${currency}/ledger`, {
            client_oid:client_oid,
            type:type,
            quote_currency:quote_currency,
            amount:amount,
            size:size,
            ett:ett
        }, this.accessKey, this.passphrase,this.secretKey)
    }



    /**
     * 撤销指定订单
     * 撤销之前下的未完成订单。
     * DELETE /api/ett/v3/orders/<order_id>
     * @param {*} order_id 订单ID
     * @returns
     * @memberof RestEttApi
     */
    async deleteEttOrders(order_id){
        return await httpDelete(`${this.url}/api/ett/v3/orders/${order_id}`, {
        }, this.accessKey, this.passphrase,this.secretKey)
    }



    /**
     * 获取订单列表
     * 列出您当前所有的订单信息。这个请求支持分页，并且按时间倒序排序和存储，最新的排在最前面。请参阅分页部分以获取第一页之后的其他纪录。
     * GET /api/ett/v3/orders
     * @param {*} status  	仅列出相应状态的订单列表。(0:所有状态 1:等待成交 2:已成交 3:已撤销)
     * @param {*} ett	[必填]列出指定ett的订单
     * @param {*} type [必填]（1:申购 2:赎回）
     * @param {*} from 请求此id之后(更新的数据)的分页内容（举例一列数：1，2，3，4，5。from 4 只有5，to 4有1，2，3）
     * @param {*} to 	请求此id之前(更旧的数据)的分页内容
     * @param {*} limit 	分页返回的结果集数量，默认为100，最大为100(具体参见分页处的描述)
     * @returns
        order_id	订单ID
        price	价格
        size	ett数量
        amount	申购/赎回币种总量
        ett	ett名称
        type	订单类型
        created_at	订单创建时间
        status	订单状态(open 新订单 process 申赎中 done 已完成 cancel 已撤销)
     * @memberof RestEttApi
     */
    async getEttOrders(status,
        ett,
        type,
        from,
        to,
        limit){
        return await httpGet(`${this.url}/api/ett/v3/orders`, {
            status:status,
            ett:ett,
            type:type,
            from:from,
            to:to,
            limit:limit
        }, this.accessKey, this.passphrase,this.secretKey)
    }


    /**
     * 获取订单信息
     * 通过订单ID获取单个订单信息。
     * GET /api/ett/v3/orders/
     * @param {*} order_id 订单ID
     * @returns
        参数名	描述
        order_id	订单ID
        price	价格
        size	ett数量
        amount	申购/赎回币种总量
        ett	ett名称
        type	订单类型
        created_at	订单创建时间
        status	订单状态
     * @memberof RestEttApi
     */
    async getEttOrdersById(order_id){
        return await httpGet(`${this.url}/api/ett/v3/orders`, {
            order_id:order_id
        }, this.accessKey, this.passphrase,this.secretKey)
    }


    /**
     * 获取组合成分
     * 获取ett的组合成分信息。此接口为公共接口，不需要身份验证。
     * GET /api/ett/v3/constituents/< ett >
     * @param {*} ett[非必填]ett名称如ok06ett
     * @returns
        参数名	描述
        net_value	ett美元净值
        ett	ett名称
        amount	每份ett包含币种成分数量
        currency	ett包含币种成分
     * @memberof RestEttApi
     */
    async getEttConstituents(ett){
        return await httpGet(`${this.url}/api/ett/v3/constituents/${ett}`, {
        }, this.accessKey, this.passphrase,this.secretKey)
    }



    /**
     * 获取ETT清算历史定价
     * 获取ETT的清算历史定价。此接口为公共接口，不需要身份验证。
     * GET /api/ett/v3/define-price/<ett>
     * @param {*} ett 基金名称，当前只有ok06ett
     * @returns
        参数名	描述
        date	该基金产品清算时间
        price	该基金产品清算时价格
     * @memberof RestEttApi
     */
    async getEttDefinePrice(ett){
        return await httpGet(`${this.url}/api/ett/v3/define-price/${ett}`, {
        }, this.accessKey, this.passphrase,this.secretKey)
    }
}