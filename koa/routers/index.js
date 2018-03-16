var Router = require('koa-router');
var path = require('path');
var sendfile = require('koa-sendfile');
var server = require(path.resolve('koa/servers/index.js'));
var config = require(path.resolve('plugins/read-config.js'));
var fetch = require('node-fetch'); //url转发
var koaBody = require('koa-body');
var uploadFile = require(path.resolve('plugins/uploadFile.js'));
var urlEncode = require(path.resolve('plugins/urlEncode.js'));

module.exports = function () {
    var router = new Router();
    //获取列表页面
    router.get('/index', function* () {
        yield(sendfile(this, path.resolve('static/pages/index.html')));
        if (!this.status) {
            this.throw(404);
        }
    }).get('/happy', function* () {
        yield(sendfile(this, path.resolve('static/pages/happy.html')));
        if (!this.status) {
            this.throw(404);
        }
    }).get('/indexBanner', function* () { //首页banner
        var $self = this;
        var data = $self.request.query;
        yield(server().getIndexBanner(data)
            .then((parsedBody) => {
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) => {
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
            }));
    }).get('/indexData', function* () { //首页数据
        var $self = this;
        var data = $self.request.query;
        yield(server().getIndexData(data)
            .then((parsedBody) => {
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) => {
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
            }));
    }).post('/search', function* () { //整个网站的搜索
        var $self = this;
        var data = $self.request.body;
        yield(server().postSearch(data)
            .then((parsedBody) => {
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) => {
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
            }));
    }).post('/upload', koaBody({
        multipart: true
    }), function* (next) { //上传文件简历
        var $self = this;
        var uploadData = $self.request.body;
        yield(server().postUpload(uploadData)
            .then((parsedBody) => {
                $self.body = parsedBody;
            }).catch((error) => {
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
            }));
    }).post('/searchTender', function* () { //整个网站的搜索
        var $self = this;
        var data = $self.request.body;
        yield(server().postSearchTender(data)
            .then((parsedBody) => {
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) => {
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
            }));
    }).get('/articleDeatail', function* () { //整个网站的详情
        var $self = this;
        var data = $self.request.query;
        yield(server().getArticle(data)
            .then((parsedBody) => {
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) => {
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
            }));
    }).get('/trendIndex', function* () { //公司动态的列表
        var $self = this;
        var data = $self.request.query;
        yield(server().getTrend(data)
            .then((parsedBody) => {
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) => {
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
            }));
    }).get('/trendSearch', function* () { //按类型搜索公司动态
        var $self = this;
        var data = $self.request.query;
        yield(server().getTrendSearch(data)
            .then((parsedBody) => {
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) => {
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
            }));
    }).get('/trendNotice', function* () { //公司动态中的公告列表
        var $self = this;
        var data = $self.request.query;
        yield(server().getTrendNotice(data)
            .then((parsedBody) => {
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) => {
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
            }));
    }).get('/noticeIndex', function* () { //公告列表
        var $self = this;
        var data = $self.request.query;
        yield(server().getNoticeIndex(data)
            .then((parsedBody) => {
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) => {
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
            }));
    }).get('/noticeSearch', function* () { //按类型搜索公告
        var $self = this;
        var data = $self.request.query;
        yield(server().getNoticeSearch(data)
            .then((parsedBody) => {
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) => {
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
            }));
    }).get('/joinIndex', function* () { //加入我们列表
        var $self = this;
        var data = $self.request.query;
        yield(server().getJoinIndex(data)
            .then((parsedBody) => {
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) => {
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
            }));
    }).get('/joinSearch', function* () { //按类型搜索加入我们
        var $self = this;
        var data = $self.request.query;
        yield(server().getJoinSearch(data)
            .then((parsedBody) => {
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) => {
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
            }));
    }).get('/exampleIndex', function* () { //公司案例列表
        var $self = this;
        var data = $self.request.query;
        yield(server().getExampleIndex(data)
            .then((parsedBody) => {
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) => {
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
            }));
    }).get('/exampleSearch', function* () { //按类型搜索案例
        var $self = this;
        var data = $self.request.query;
        yield(server().getExampleSearch(data)
            .then((parsedBody) => {
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) => {
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
            }));
    }).get('/bidIndex', function* () { //招标首页
        var $self = this;
        var data = $self.request.query;
        yield(server().getbidIndex(data)
            .then((parsedBody) => {
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) => {
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
            }));
    }).get('/bidDetail', function* () { //整个网站的详情
        var $self = this;
        var data = $self.request.query;
        yield(server().getbidDetail(data)
            .then((parsedBody) => {
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) => {
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
            }));
    }).get('/bidHeadlineTender', function* () { //整个网站的详情
        var $self = this;
        var data = $self.request.query;
        yield(server().getbidHeadlineTender(data)
            .then((parsedBody) => {
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) => {
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
            }));
    }).get('/bidSearchTenderList', function* () { //整个网站的详情
        var $self = this;
        var data = $self.request.query;
        yield(server().getbidSearchTenderList(data)
            .then((parsedBody) => {
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) => {
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
            }));
    }).get('/bidOpenTender', function* () { //整个网站的详情
        var $self = this;
        var data = $self.request.query;
        yield(server().getbidOpenTender(data)
            .then((parsedBody) => {
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) => {
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
            }));
    })
    return router;
};