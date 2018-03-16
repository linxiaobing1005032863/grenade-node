var _request = require('request-promise');
var path = require('path');
var config = require(path.resolve('plugins/read-config.js'));
var form = require(path.resolve('plugins/form.js'));
var uploadFile = require(path.resolve('plugins/uploadFile.js'));
var urlEncode = require(path.resolve('plugins/urlEncode.js'));

var request = function (options) {
    options = options || {};
    options.rejectUnauthorized = false;
    return _request(options);
}

module.exports = function () {
    this.getIndexBanner = function (argvs) {
        var options = {
            method: 'get',
            timeout: 3000,
            uri: config()['rurl'] + '/api/index/banner',
        };
        return request(options);
    };
    this.getIndexData = function (argvs) {
        var options = {
            method: 'get',
            timeout: 3000,
            uri: config()['rurl'] + '/api/index/index',
        };
        return request(options);
    };
    this.postSearch = function (argvs) {
        var options = {
            method: 'POST',
            timeout: 5000,
            uri: config()['rurl'] + '/api/index/search',
            form: argvs
        };
        return request(options);
    };
    this.postUpload = function (argvs) {
        var options = {
            method: 'POST',
            timeout: 5000,
            uri: config()['rurl'] + '/api/index/joinPosition',
            formData: {
                id: argvs.fields.id,
                file: uploadFile(argvs.files.file)
            },
        };
        return request(options);
    };
    this.postSearchTender = function (argvs) {
        var options = {
            method: 'POST',
            timeout: 5000,
            uri: config()['rurl'] + '/api/index/searchTender',
            form: argvs
        };
        return request(options);
    };
    this.getArticle = function (argvs) {
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + '/api/index/article?id=' + argvs.id,
        };
        return request(options);
    };
    this.getbidDetail = function (argvs) {
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + '/api/index/tenderInfo?id=' + argvs.id,
        };
        return request(options);
    };
    this.getTrend = function (argvs) {
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + '/api/index/company?page=' + argvs.page,
        };
        return request(options);
    };
    this.getTrendSearch = function (argvs) {
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + `/api/index/searchCompany${urlEncode(argvs,true)}`,
        };
        return request(options);
    };
    this.getTrendNotice = function (argvs) {
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + '/api/index/companyNotice',
        };
        return request(options);
    };
    this.getNoticeIndex = function (argvs) {
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + '/api/index/companyNoticeList?page=' + argvs.page,
        };
        return request(options);
    };
    this.getNoticeSearch = function (argvs) {
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + `/api/index/searchCompanyNoticeList${urlEncode(argvs,true)}`,
        };
        return request(options);
    };
    this.getJoinIndex = function (argvs) {
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + '/api/index/recruit?page=' + argvs.page,
        };
        return request(options);
    };
    this.getJoinSearch = function (argvs) {
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + `/api/index/searchRecruit${urlEncode(argvs,true)}`,
        };
        return request(options);
    };
    this.getExampleIndex = function (argvs) {
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + '/api/index/caselist?page=' + argvs.page,
        };
        return request(options);
    };
    this.getExampleSearch = function (argvs) {
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + `/api/index/searchCase${urlEncode(argvs,true)}`,
        };
        return request(options);
    };
    this.getbidIndex = function (argvs) {
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + '/api/index/tender?page=' + argvs.page,
        };
        return request(options);
    };
    this.getbidHeadlineTender = function (argvs) {
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + '/api/index/headlineTender',
        };
        return request(options);
    };
    this.getbidSearchTenderList = function (argvs) {
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + `/api/index/searchTenderList${urlEncode(argvs,true)}`,
        };
        return request(options);
    };
    this.getbidOpenTender = function (argvs) {
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + '/api/index/openTender',
        };
        return request(options);
    };
    return this;
}