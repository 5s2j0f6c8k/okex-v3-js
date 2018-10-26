'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _httpGet = require('./common/httpGet');

var _httpGet2 = _interopRequireDefault(_httpGet);

var _httpPost = require('./common/httpPost');

var _httpPost2 = _interopRequireDefault(_httpPost);

var _RestCommonApi2 = require('./RestCommonApi');

var _RestCommonApi3 = _interopRequireDefault(_RestCommonApi2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Okex V3 Rest 币币杠杆API
 * 作者: qugang
 * 邮箱: qgass@163.com
 * 创建时间：2018/10/26
 * @class RestWalletApi
 */
var RestMarginApi = function (_RestCommonApi) {
    _inherits(RestMarginApi, _RestCommonApi);

    function RestMarginApi(url, accessKey, passphrase, secretKey) {
        _classCallCheck(this, RestMarginApi);

        var _this = _possibleConstructorReturn(this, (RestMarginApi.__proto__ || Object.getPrototypeOf(RestMarginApi)).call(this, url));

        _this.url = url;
        _this.accessKey = accessKey;
        _this.passphrase = passphrase;
        _this.secretKey = secretKey;
        return _this;
    }

    /**
     *
     * 获取币币杠杆账户资产列表(仅展示拥有资金的币对)，查询各币种的余额、冻结和可用等信息。
     * @returns
        instrument_id	string	杠杆币对名称
        balance	string	余额
        hold	string	冻结(不可用)
        available	string	可用于交易或资金划转的数量
        risk_rate	string	风险率
        liquidation_price	string	爆仓价
        borrowed	string	已借币 （已借未还的部分）
        lending_fee	string	利息 （未还的利息）
     * @memberof RestMarginApi
     */


    _createClass(RestMarginApi, [{
        key: 'getMarginAccounts',
        value: async function getMarginAccounts() {
            return await (0, _httpGet2.default)(this.url + '/api/margin/v3/accounts', {}, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         *
         * 获取币币杠杆某币对账户的余额、冻结和可用等信息。
         * @param {*} instrument_id 币对 必须
         * @returns
            balance	string	余额
            hold	string	冻结(不可用)
            available	string	可用于交易或资金划转的数量
         * @memberof RestMarginApi
         */

    }, {
        key: 'getMarginAccountByInstrument_id',
        value: async function getMarginAccountByInstrument_id(instrument_id) {
            return await (0, _httpGet2.default)(this.url + '/api/margin/v3/accounts/' + instrument_id, {}, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         *
         * 列出杠杆帐户资产流水。帐户资产流水是指导致帐户余额增加或减少的行为。流水会分页，并且按时间倒序排序和存储，最新的排在最前面。请参阅分页部分以获取第一页之后的其他纪录。
         * @param {*} instrument_id 币对 必须
         * @param {*} limit 分页返回的结果集数量，默认为100，最大为100(具体参见分页处的描述)
         * @param {*} type [非必填]1:转入 2:转出 3:借款 4:还款 5:计息 6:穿仓亏损 7:买入 8:卖出 若不传此参数则默认返回所有类型
         * @param {*} from 请求此id之后(更新的数据)的分页内容（举例一列数：1，2，3，4，5。from 4 只有5，to 4有1，2，3）
         * @param {*} to 请求此id之前(更旧的数据)的分页内容
         * @returns
            ledger_id	string	账单ID
            instrument_id	string	杠杆币对名称
            currency	string	币种
            balance	string	余额
            amount	string	变动数量
            type	string	流水来源
            timestamp	string	账单创建时间
            details	string	如果type是trade或者fee，则会有该details字段将包含order,instrument信息
            order_id	string	交易的ID
         * @memberof RestMarginApi
         */

    }, {
        key: 'getMarginLedger',
        value: async function getMarginLedger(instrument_id, limit, type, from, to) {
            return await (0, _httpGet2.default)(this.url + '/api/margin/v3/accounts/' + instrument_id + '/ledger', {
                limit: limit,
                type: type,
                from: from,
                to: to
            }, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         *
         * 获取币币杠杆账户的借币配置信息，包括当前最大可借、借币利率、最大杠杆倍数。
         * @returns
            instrument_id	string	杠杆币对名称
            currency	string	币种
            available	string	当前最大可借
            rate	double	借币利率
            leverage	string	最大杠杆倍数
         * @memberof RestMarginApi
         */

    }, {
        key: 'getMarginVailability',
        value: async function getMarginVailability() {
            return await (0, _httpGet2.default)(this.url + '/api/margin/v3/accounts/margin_info', {}, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         *
         * 获取某个币币杠杆账户的借币配置信息，包括当前最大可借、借币利率、最大杠杆倍数。
         * @param {*} instrument_id 必须 id
         * @returns
            currency	string	币种
            available	string	当前最大可借
            rate	double	借币利率
            leverage	string	最大杠杆倍数
         * @memberof RestMarginApi
         */

    }, {
        key: 'getMarginVailabilityById',
        value: async function getMarginVailabilityById(instrument_id) {
            return await (0, _httpGet2.default)(this.url + '/api/margin/v3/accounts/' + instrument_id + '/margin_info', {}, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         *
         * 获取币币杠杆帐户的借币记录。这个请求支持分页，并且按时间倒序排序和存储，最新的排在最前面。请参阅分页部分以获取第一页之后的其他纪录。
         * @param {*} status 状态(0:未还清 1:已还清)    
         * @param {*} limit 分页返回的结果集数量，默认为100，最大为100(具体参见分页处的描述)
         * @param {*} from 请求此id之后(更新的数据)的分页内容（举例一列数：1，2，3，4，5。from 4 只有5，to 4有1，2，3）
         * @param {*} to 请求此id之前(更旧的数据)的分页内容
         * @returns
            borrow_id	long	借币记录ID
            instrument_id	string	杠杆币对名称
            currency	string	币种
            created_at	string	借币时间
            amount	string	借币总数量
            interest	string	利息总数量
            returned_amount	string	已还借币数量
            paid_interest	string	已还利息数量
            last_interest_time	string	最后一次计息时间
         * @memberof RestMarginApi
         */

    }, {
        key: 'getMarginBorrowed',
        value: async function getMarginBorrowed(status, limit, from, to) {
            return await (0, _httpGet2.default)(this.url + '/api/margin/v3/accounts/borrowed', {
                status: status,
                limit: limit,
                from: from,
                to: to
            }, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         *
         * 获取某个币币杠杆帐户的借币记录。这个请求支持分页，并且按时间倒序排序和存储，最新的排在最前面。请参阅分页部分以获取第一页之后的其他纪录。
         * @param {*} instrument_id id
         * @param {*} status  状态(0:未还清 1:已还清)
         * @param {*} from 请求此id之后(更新的数据)的分页内容（举例一列数：1，2，3，4，5。from 4 只有5，to 4有1，2，3）
         * @param {*} to 请求此id之前(更旧的数据)的分页内容
         * @param {*} limit 分页返回的结果集数量，默认为100，最大为100(具体参见分页处的描述)
         * @returns
            borrow_id	long	借币记录ID
            currency	string	币种
            created_at	string	借币时间
            amount	string	借币总数量
            interest	string	利息总数量
            returned_amount	string	已还借币数量
            paid_interest	string	已还利息数量
            last_interest_time	string	最后一次计息时间
         * @memberof RestMarginApi
         */

    }, {
        key: 'getMarginBorrowedById',
        value: async function getMarginBorrowedById(instrument_id, status, from, to, limit) {
            return await (0, _httpGet2.default)(this.url + '/api/margin/v3/accounts/' + instrument_id + '/borrowed', {
                status: status,
                limit: limit,
                from: from,
                to: to
            }, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         *
         * 在某个币币杠杆账户里进行借币。
         * @param {*} instrument_id	string	是	杠杆币对名称
         * @param {*} currency	string	是	币种
         * @param {*} amount	string	是	借币数量
         * @returns
            borrow_id	long	借币记录ID
            result	boolean	结果
         * @memberof RestMarginApi
         */

    }, {
        key: 'postMarginBorrow',
        value: async function postMarginBorrow(instrument_id, currency, amount) {
            return await (0, _httpPost2.default)(this.url + '/api/margin/v3/accounts/borrow', {
                instrument_id: instrument_id,
                currency: currency,
                sidamounte: amount
            }, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         *
         *
         * @param {*} borrow_id	string	是	借币记录ID
         * @param {*} instrument_id	string	是	杠杆币对名称
         * @param {*} currency	string	是	币种
         * @param {*} amount	string	是	还币数量
         * @returns
            repayment_id	long	还币记录ID
            result	boolean	结果
         * @memberof RestMarginApi
         */

    }, {
        key: 'postMarginRepayment',
        value: async function postMarginRepayment(borrow_id, instrument_id, currency, amount) {
            return await (0, _httpPost2.default)(this.url + '/api/margin/v3/accounts/repayment', {
                borrow_id: borrow_id,
                instrument_id: instrument_id,
                currency: currency,
                sidamounte: amount
            }, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         *
         * OKEx API提供limit和market两种下单模式。只有当您的账户有足够的资金才能下单。
         * 一旦下单，您的账户资金将在订单生命周期内被冻结。被冻结的资金以及数量取决于订单指定的类型和参数。
         * @param {*} client_oid string	否	由您设置的订单ID来识别您的订单
         * @param {*} type 	string	是	limit,market(默认是limit)
         * @param {*} side	string	是	buy or sell
         * @param {*} instrument_id string	是	币对名称
         * @param {*} margin_trading string	否	下单类型(当前为币币杠杆交易，请求值为2)
         * @param {*} price string	string	是	价格
         * @param {*} size string	是	买入或卖出的数量
         * @param {*} notional string	否	[非必填]买入金额，市价买入时必填notional
         * @returns
            order_id	long	订单ID
            client_oid	string	由您设置的订单ID来识别您的订单
            result	boolean	下单结果。若是下单失败，将给出错误码提示。
         * @memberof RestMarginApi
         */

    }, {
        key: 'postMarginOrders',
        value: async function postMarginOrders(client_oid, type, side, instrument_id, margin_trading, price, size, notional) {
            return await (0, _httpPost2.default)(this.url + '/api/margin/v3/orders', {
                client_oid: client_oid,
                type: type,
                side: side,
                instrument_id: instrument_id,
                margin_trading: margin_trading,
                price: price,
                size: size,
                notional: notional
            }, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         *
         * 下指定币对的多个订单（每次只能下最多4个币对且每个币对最多4个订单）。
         * @param {*} batch_orders
            参数名	类型	是否必填	描述
            client_oid	string	否	[非必填]由您设置的订单ID来识别您的订单
            type	string	是	limit,market(默认是limit)
            side	string	是	buy or sell
            instrument_id	string	是	币对名称
            margin_trading	string	否	下单类型(当前为币币杠杆交易，请求值为2)
            限价单特殊参数
            参数名	类型	是否必填	描述
            price	string	是	价格
            size	string	是	买入或卖出的数量
            市价单特殊参数
            参数名	类型	是否必填	描述
            size	string	否	[非必填]卖出数量，市价卖出必填size
            notional	string	否	[非必填]买入金额，市价买入时必填notional
            [{"client_oid":"20180728","instrument_id":"btc-usdt","side":"sell","type":"limit","size":"0.001","price":"10001","margin_trading ":"1"},
            {"client_oid":"20180728","instrument_id":"btc-usdt","side":"sell","type":"limit","size":"0.001","price":"10002","margin_trading ":"1"}
            {"client_oid":"20180728","instrument_id":"btc-usdt","side":"sell","type":"limit","size":"0.001","price":"10001","margin_trading ":"1"},
            {"client_oid":"20180728","instrument_id":"btc-usdt","side":"sell","type":"limit","size":"0.001","price":"10002","margin_trading ":"1"}]
         * @returns
            order_id	long	订单ID
            client_oid	string	由您设置的订单ID来识别您的订单
            result	boolean	下单结果。若是下单失败，将给出错误码提示。
         * @memberof RestMarginApi
         */

    }, {
        key: 'postMarginBatch_orders',
        value: async function postMarginBatch_orders(batch_orders) {
            return await (0, _httpPost2.default)(this.url + '/api/margin/v3/orders', batch_orders, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         *
         * 撤销之前下的未完成订单。
         * @param {*} order_id 订单ID
         * @param {*} instrument_id string	是	[必填]提供此参数则撤销指定币对的相应订单，如果不提供此参数则返回错误码
         * @param {*} client_oid string	否	由您设置的订单ID来识别您的订单
         * @returns
            order_id	long	订单ID
            client_oid	string	由您设置的订单ID来识别您的订单
            result	boolean	撤单结果。若是撤单失败，将给出错误码提示
         * @memberof RestMarginApi
         */

    }, {
        key: 'postMarginCancel_orders',
        value: async function postMarginCancel_orders(order_id, instrument_id, client_oid) {
            return await (0, _httpPost2.default)(this.url + '/api/margin/v3/cancel_orders/' + order_id, {
                instrument_id: instrument_id,
                client_oid: client_oid
            }, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         *
         * 撤销指定的某一种或多种币对的所有未完成订单。
         * @param {*} batch_orders
            instrument_id	list	是	提供此参数则撤销指定一个或多个币对的订单，如果不提供此参数则返回错误码，此字段支持传多个值。此参数为[''btc-usdt'',''ltc-eth''],推荐使用中横线连接币种，下划线连接的方式也同时兼容
            order_id	long	是	订单ID
            [{"instrument_id":"btc-usdt","order_ids":[23464,23465]},
             {"instrument_id":"btc-usdt","order_ids":[23464,23465]}]
         * @returns
         * @memberof RestMarginApi
         */

    }, {
        key: 'postMarginCancel_batch_orders',
        value: async function postMarginCancel_batch_orders(cancel_batch_orders) {
            return await (0, _httpPost2.default)(this.url + '/api/margin/v3/cancel_batch_orders', cancel_batch_orders, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         *
         * 列出您当前所有的订单信息。这个请求支持分页，并且按时间倒序排序和存储，最新的排在最前面。请参阅分页部分以获取第一页之后的其他纪录。
         * @param {*} instrument_id string	[非必填]列出指定币对的订单
         * @param {*} status string	仅列出相应状态的订单列表。(all:所有状态 open:未成交 part_filled:部分成交 canceling:撤销中 filled:已成交 cancelled:已撤销 failure:下单失败 ordering:下单中)
         * @param {*} limit string	分页返回的结果集数量，默认为100，最大为100(具体参见分页处的描述)
         * @param {*} from string	请求此id之后(更新的数据)的分页内容（举例一列数：1，2，3，4，5。from 4 只有5，to 4有1，2，3）
         * @param {*} to string	请求此id之前(更旧的数据)的分页内容
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
            status	string	订单状态
         * @memberof RestMarginApi
         */

    }, {
        key: 'getMarginOrders',
        value: async function getMarginOrders(instrument_id, status, limit, from, to) {
            return await (0, _httpGet2.default)(this.url + '/api/margin/v3/orders', {
                instrument_id: instrument_id,
                status: status,
                limit: limit,
                from: from,
                to: to
            }, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         *
         * 通过订单ID获取单个订单信息。
         * @param {*} order_id 订单号 
         * @param {*} instrument_id string	[必填]币对
         * @returns
         * @memberof RestMarginApi
         */

    }, {
        key: 'getMarginOrdersById',
        value: async function getMarginOrdersById(order_id, instrument_id) {

            return await (0, _httpGet2.default)(this.url + '/api/margin/v3/orders', {
                order_id: order_id,
                instrument_id: instrument_id
            }, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         *
         * 列出您当前所有的订单信息。这个请求支持分页，并且按时间倒序排序和存储，最新的排在最前面。请参阅分页部分以获取第一页之后的其他纪录。
         * @param {*} limit string	分页返回的结果集数量，默认为100，最大为100(具体参见分页处的描述)
         * @param {*} instrument_id string	[非必填]币对名称
         * @param {*} from string	请求此id之后(更新的数据)的分页内容（举例一列数：1，2，3，4，5。from 4 只有5，to 4有1，2，3）
         * @param {*} to string	请求此id之前(更旧的数据)的分页内容
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
         * @memberof RestMarginApi
         */

    }, {
        key: 'getMarginOrders_pending',
        value: async function getMarginOrders_pending(limit, instrument_id, from, to) {
            return await (0, _httpGet2.default)(this.url + '/api/margin/v3/orders_pending', {
                limit: limit,
                instrument_id: instrument_id,
                from: from,
                to: to
            }, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         *
         * 获取最近的成交明细列表。这个请求支持分页，并且按时间倒序排序和存储，最新的排在最前面。请参阅分页部分以获取第一页之后的其他纪录。
         * @param {*} order_id 	long	[必填]仅限此order_id的资金明细列表。
         * @param {*} instrument_id 	string	[必填]仅限此instrument_id的资金明细列表。
         * @param {*} from 	string	请求此id之后(更新的数据)的分页内容（举例一列数：1，2，3，4，5。from 4 只有5，to 4有1，2，3）
         * @param {*} to 	string	请求此id之前(更旧的数据)的分页内容
         * @param {*} limit 	string	分页返回的结果集数量，默认为100，最大为100(具体参见分页处的描述)
         * @returns
            ledger_id	long	账单ID
            instrument_id	string	币对名称
            price	string	价格
            size	string	数量
            order_id	long	订单ID
            timestamp	string	订单创建时间
            exec_type	string	流动性方向(T or M)
            fee	string	手续费
            side	string	订单方向(buy or sell)   
         * @memberof RestMarginApi
         */

    }, {
        key: 'getMarginFills',
        value: async function getMarginFills(order_id, instrument_id, from, to, limit) {
            return await (0, _httpGet2.default)(this.url + '/api/margin/v3/fills', {
                order_id: order_id,
                limit: limit,
                instrument_id: instrument_id,
                from: from,
                to: to
            }, this.accessKey, this.passphrase, this.secretKey);
        }
    }]);

    return RestMarginApi;
}(_RestCommonApi3.default);

exports.default = RestMarginApi;