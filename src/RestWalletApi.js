import httpGet from './common/httpGet'
import httpPost from './common/httpPost'
import RestCommonApi from './RestCommonApi'

/**
 * Okex V3 Rest钱包API
 * 作者: qugang
 * 邮箱: qgass@163.com
 * 创建时间：2018/10/26
 * @class RestWalletApi
 */
export default class RestWalletApi extends RestCommonApi {
    constructor(url, accessKey, passphrase,secretKey) {
        super(url)
        this.url = url
        this.accessKey = accessKey
        this.passphrase = passphrase
        this.secretKey =secretKey
    }


    /**
     * 获取平台所有币种列表。并非所有币种都可被用于交易。在ISO 4217标准中未被定义的币种代码可能使用的是自定义代码。
     *
     * @returns 
        currency	String	币种名称，如btc
        name	String	币种中文名称，不显示则无对应名称
        can_deposit	number	是否可充值，0表示不可充值，1表示可以充值
        can_withdraw	number	是否可提币，0表示不可提币，1表示可以提币
        min_withdrawal	number	币种最小提币量
     * @memberof RestWalletApi
     */
    async getCurrencies() {
        return await httpGet(`${this.url}/api/account/v3/currencies`, {}, this.accessKey, this.passphrase,this.secretKey)
    }



    /**
     *
     * 获取钱包账户资产列表，查询各币种的余额、冻结和可用等信息。
     * @returns 
        currency	String	币种，如btc
        balance	number	余额
        hold	number	冻结(不可用)
        available	number	可用于提现或资金划转的数量
     * @memberof RestWalletApi
     */
    async getWallet() {
        return await httpGet(`${this.url}/api/account/v3/wallet`, {}, this.accessKey, this.passphrase,this.secretKey)
    }


    /**
     * 获取钱包账户单个币种的余额、冻结和可用等信息。
     *
     * @param {*} currency 币种
     * @returns
        balance	number	余额
        hold	number	冻结(不可用)
        available	number	可用于提现或资金划转的数量
        currency	String	币种，如btc
     * @memberof RestWalletApi
     */
    async getWalletByCurrency(currency) {
        return await httpGet(`${this.url}/api/account/v3/wallet/${currency}`, {}, this.accessKey, this.passphrase,this.secretKey)
    }



    /**
     * OKEx站内在钱包账户、交易账户和子账户之间进行资金划转。
     *
     * @param {*} amount 划转数量 必须
     * @param {*} currency 币种 必须
     * @param {*} from 转出账户(0:子账户 1:币币 3:合约 4:C2C 5:币币杠杆 6:钱包 7:ETT) 必须
     * @param {*} to 转入账户(0:子账户 1:币币 3:合约 4:C2C 5:币币杠杆 6:钱包 7:ETT) 非必须
     * @param {*} instrument_id  杠杆币对，如：eos-usdt，仅限已开通杠杆的币对 非必须
     * @returns
        transfer_id	number	划转ID
        currency	String	划转币种
        from	number	转出账户
        amount	number	划转量
        to	number	转入账户
        result	boolean	划转结果。若是划转失败，将给出错误码提示
     * @memberof RestWalletApi
     */
    async postTransfer(amount, currency, from, to, instrument_id) {

        return await httpPost(`${this.url}/api/account/v3/transfer`, {
            amount: amount,
            currency: currency,
            from: from,
            to: to,
            instrument_id: instrument_id
        }, this.accessKey, this.passphrase,this.secretKey)
    }




    /**
     *
     * 提币到OKCoin国际站账户，OKEx账户或数字货币地址。
     * @param {*} currency 	币种 必须
     * @param {*} amount 数量 必须
     * @param {*} destination 提币到(2:OKCoin国际 3:OKEx 4:数字货币地址) 必须
     * @param {*} to_address 认证过的数字货币地址、邮箱或手机号 必须
     * @param {*} trade_pwd 交易密码 必须
     * @param {*} fee 网络手续费≥0.提币到OKCoin国际或OKEx免手续费，请设置为0.提币到数字货币地址所需网络手续费可通过提币手续费接口查询 必须
     * @returns
        currency	String	提币币种
        amount	number	提币数量
        withdraw_id	number	提币申请ID
        result	boolean	提币申请结果。若是提现申请失败，将给出错误码提示
     * @memberof RestWalletApi
     */
    async postWithdrawal(currency, amount, destination, to_address, trade_pwd, fee) {

        return await httpPost(`${this.url}/api/account/v3/withdrawal`, {
            amount: amount,
            currency: currency,
            destination: destination,
            to_address: to_address,
            trade_pwd: trade_pwd,
            fee: fee
        }, this.accessKey, this.passphrase,this.secretKey)
    }





    /**
     *
     * 查询提现到数字货币地址时，建议网络手续费信息。手续费越高，网络确认越快。
     * @param {*} currency 	币种，不填则返回所有 非必须
     * @returns
        currency	String	币种
        min_fee	number	最小提币手续费数量
        max_fee	number	最大提币手续费数量
     * @memberof RestWalletApi
     */
    async getWithdrawalFee(currency) {
        return await httpGet(`${this.url}/api/account/v3/wallet`, {
            currency:currency
        }, this.accessKey, this.passphrase,this.secretKey)
    }




    /**
     * 查询最近所有币种的提币记录。
     *
     * @param {*} currency 币种 非必须
     * @returns
        currency	String	币种
        amount	number	数量
        timestamp	String	提币申请时间
        from	String	提币地址(如果收币地址是OKEx平台地址，则此处将显示用户账户)
        to	String	收币地址
        tag	String	部分币种提币需要标签，若不需要则不返回此字段
        payment_id	String	部分币种提币需要此字段，若不需要则不返回此字段
        txid	String	提币哈希记录(内部转账将不返回此字段)
        fee	String	提币手续费
        status	String	提现状态（-3:撤销中;-2:已撤销;-1:失败;0:等待提现;1:提现中;2:已汇出;3:邮箱确认;4:人工审核中5:等待身份认证）
     * @memberof RestWalletApi
     */
    async getWithdrawalHistory(currency) {
        return await httpGet(`${this.url}/api/account/v3/withdrawal/history`, {
            currency:currency
        }, this.accessKey, this.passphrase,this.secretKey)
    }



    /**
     *
     * 查询钱包账户账单流水。流水会分页，并且按时间倒序排序和储存，最新的排在最前面。请参阅分页部分以获取第一页之后的其他记录。
     * @param {*} type  填写相应数字：1:充值2:提现13:撤销提现18:转入合约账户19:合约账户转出20:转入子账户21:子账户转出28:领取29:转入指数交易区30:指数交易区转出 31:转入点对点账户32:点对点账户转出 33:转入币币杠杆账户 34:币币杠杆账户转出 37:转入币币账户 38:币币账户转出 非必须
     * @param {*} currency 	请求此页码之后的分页内容（举例页码为：1，2，3，4，5。from 4 只返回第5页，to 4只返回第3页） 非必须
     * @param {*} limit 分页返回的结果集数量，默认为100，最大为100，按时间顺序排列，越早下单的在前面 非必须
     * @param {*} from 请求此页码之后的分页内容（举例页码为：1，2，3，4，5。from 4 只返回第5页，to 4只返回第3页） 非必须
     * @param {*} to 请求此页码之前的分页内容（举例页码为：1，2，3，4，5。from 4 只返回第5页，to 4只返回第3页） 非必须
     * @returns
     * @memberof RestWalletApi
     */
    async getLedger(type, currency, from, to, limit) {
        return await httpGet(`${this.url}/api/spot/v3/accounts/btc/ledger`, {
            type:type,
            currency:currency,
            from:from,
            to:to,
            limit:limit
        }, this.accessKey, this.passphrase,this.secretKey)
    }



    /**
     *
     * 获取各个币种的充值地址，包括曾使用过的老地址。
     * @param {*} currency 币种，如btc 必须
     * @returns
        address	String	充值地址
        tag	String	充值tag(当该币种不需要tag的时候不会返回此字段)
        payment_id	String	充值payment_id(单该币种不需要payment_id时不会返回此字段)
        currency	String	币种，如btc
     * @memberof RestWalletApi
     */
    async getDepositAddress(currency) {
        return await httpGet(`${this.url}/api/account/v3/deposit/address`, {
            currency:currency
        }, this.accessKey, this.passphrase,this.secretKey)
    }



    /**
     *
     * 获取所有币种的充值记录。
     * @param {*} currency 	币种名称，如：btc 非必须
     * @returns
        currency	String	币种名称，如：btc
        amount	number	充值数量
        to	String	此笔充值到账地址
        txid	String	区块转账哈希记录
        timestamp	String	充值到账时间
        status	String	提现状态（0:等待确认;1:确认到账;2:充值成功；）
     * @memberof RestWalletApi
     */
    async getDepositHistory(currency) {
        return await httpGet(`${this.url}/api/account/v3/deposit/history`, {
            currency:currency
        }, this.accessKey, this.passphrase,this.secretKey)
    }
}