'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _httpGet = require('./common/httpGet');

var _httpGet2 = _interopRequireDefault(_httpGet);

var _httpPost = require('./common/httpPost');

var _httpPost2 = _interopRequireDefault(_httpPost);

var _httpDelete = require('./common/httpDelete');

var _httpDelete2 = _interopRequireDefault(_httpDelete);

var _RestCommonApi2 = require('./RestCommonApi');

var _RestCommonApi3 = _interopRequireDefault(_RestCommonApi2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Okex V3 Rest ett Api
 * 作者: qugang
 * 邮箱: qgass@163.com
 * 创建时间：2018/10/26
 * @class RestWalletApi
 */
var RestEttApi = function (_RestCommonApi) {
    _inherits(RestEttApi, _RestCommonApi);

    function RestEttApi(url, accessKey, passphrase, secretKey) {
        _classCallCheck(this, RestEttApi);

        var _this = _possibleConstructorReturn(this, (RestEttApi.__proto__ || Object.getPrototypeOf(RestEttApi)).call(this, url));

        _this.url = url;
        _this.accessKey = accessKey;
        _this.passphrase = passphrase;
        _this.secretKey = secretKey;
        return _this;
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


    _createClass(RestEttApi, [{
        key: 'getEttAccounts',
        value: async function getEttAccounts() {
            return await (0, _httpGet2.default)(this.url + '/api/ett/v3/accounts', {}, this.accessKey, this.passphrase, this.secretKey);
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

    }, {
        key: 'getEttAccountsByCurrency',
        value: async function getEttAccountsByCurrency(currency) {
            return await (0, _httpGet2.default)(this.url + '/api/ett/v3/accounts/' + currency, {}, this.accessKey, this.passphrase, this.secretKey);
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

    }, {
        key: 'getEttLedger',
        value: async function getEttLedger(currency) {
            return await (0, _httpGet2.default)(this.url + '/api/ett/v3/accounts/' + currency + '/ledger', {}, this.accessKey, this.passphrase, this.secretKey);
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

    }, {
        key: 'postEttOrders',
        value: async function postEttOrders(client_oid, type, quote_currency, amount, size, ett) {
            return await (0, _httpPost2.default)(this.url + '/api/ett/v3/accounts/' + currency + '/ledger', {
                client_oid: client_oid,
                type: type,
                quote_currency: quote_currency,
                amount: amount,
                size: size,
                ett: ett
            }, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         * 撤销指定订单
         * 撤销之前下的未完成订单。
         * DELETE /api/ett/v3/orders/<order_id>
         * @param {*} order_id 订单ID
         * @returns
         * @memberof RestEttApi
         */

    }, {
        key: 'deleteEttOrders',
        value: async function deleteEttOrders(order_id) {
            return await (0, _httpDelete2.default)(this.url + '/api/ett/v3/orders/' + order_id, {}, this.accessKey, this.passphrase, this.secretKey);
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

    }, {
        key: 'getEttOrders',
        value: async function getEttOrders(status, ett, type, from, to, limit) {
            return await (0, _httpGet2.default)(this.url + '/api/ett/v3/orders', {
                status: status,
                ett: ett,
                type: type,
                from: from,
                to: to,
                limit: limit
            }, this.accessKey, this.passphrase, this.secretKey);
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

    }, {
        key: 'getEttOrdersById',
        value: async function getEttOrdersById(order_id) {
            return await (0, _httpGet2.default)(this.url + '/api/ett/v3/orders', {
                order_id: order_id
            }, this.accessKey, this.passphrase, this.secretKey);
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

    }, {
        key: 'getEttConstituents',
        value: async function getEttConstituents(ett) {
            return await (0, _httpGet2.default)(this.url + '/api/ett/v3/constituents/' + ett, {}, this.accessKey, this.passphrase, this.secretKey);
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

    }, {
        key: 'getEttDefinePrice',
        value: async function getEttDefinePrice(ett) {
            return await (0, _httpGet2.default)(this.url + '/api/ett/v3/define-price/' + ett, {}, this.accessKey, this.passphrase, this.secretKey);
        }
    }]);

    return RestEttApi;
}(_RestCommonApi3.default);

exports.default = RestEttApi;