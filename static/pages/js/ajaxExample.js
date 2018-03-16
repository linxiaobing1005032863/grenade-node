var eventType = 0;
var areaType = 0;
var timeType = 0;
var searchContent = '';
var typeId = -1;
var isFirstOpen = true;

$(function () {
    $(".time-type").on('click', function () {
        $(this).addClass("active").siblings().removeClass("active");
        timeType = $(this).val();
        searchContent = '';
        loadView();
    })
    loadView(); //加载页面
});

function loadView() {
    var response = getData(1);
    if (isFirstOpen) { //首次打开页面
        isFirstOpen = false;
        loadAnalyze(response); //加载analyze列表
    }
    loadTable(response); //加载数据
    loadPager(response); //加载分页器
}

function loadAnalyze(response) {
    typeId = response.data.typeId; //页面ID赋值
    var caseData = response.data;
    for (var i = 0, len = caseData.case.length; i < len; i++) {
        $("#analyze").append(
            '<li value="' + caseData.case[i].did +
            '" onclick="doList(this)">' +
            caseData.case[i].name + '</li>'
        )
    }
    for (var i = 0, len = caseData.address.length; i < len; i++) {
        $("#area").append(
            '<li value="' + (i + 1) +
            '" onclick="doArea(this)">' +
            caseData.address[i] + '</li>'
        )
    }
}

function loadTable(response) {
    $('#caseList').empty();
    var resData = response.data.content;
    for (var i = 0, len = resData.length; i < len; i++) {
        $("#caseList").append(
            '<a class="col-md-3 col-sm-6 col-xs-12" href="exampleContent.html#${resData[i].id}">'.format({
                'resData[i].id': resData[i].id
            }) +
            '<div class="imgSize"><img src="${resData[i].image}" class="img-responsive">'.format({
                'resData[i].image': resData[i].image
            }) +
            '<img src="../../images/example/hover.png" class="img-responsive hoverImg"></div>' +
            '<div class="indro"><p>${resData[i].title}</p>${resData[i].time}</div></a>'.format({
                'resData[i].title': resData[i].title,
                'resData[i].time': resData[i].time
            })
        )
    }
    if (resData.length == 0) {
        $("#caseList").html('<div class="noData">暂无相关内容</div>')
    }
}

//小伎俩：因为获取的pageSum是总页数
//该组件不支持直接输入总页数
//所以limit填1，这样的话totalCount就是总页数
function loadPager(response) {
    $('.pagination').remove();
    var totalCount = response.data.pageSum;
    $('#paging').extendPagination({
        totalCount: totalCount, //要测试分页请求是否正常就随便输入一个数字
        limit: 10,
        callback: function (curr, limit, totalCount) { //点击页码回调事件
            var response = getData(curr);
            window.parent.scrollTo(0, 0);
            loadTable(response); //加载数据
        }
    });
}

function getData(page) {
    var url = "";
    var data = {};
    var method = "";
    if (searchContent !== '') { //搜索
        url = "/search";
        data = {
            typeId: typeId,
            content: searchContent,
            page: page
        };
        method = "POST";
    } else if (eventType == 0 && timeType == 0 && areaType == 0) { //All
        url = "/exampleIndex"
        data = {
            page: page
        }
        method = "GET";
    } else { //其他
        url = "/exampleSearch";
        data = {
            page: page,
            id: eventType,
            time: timeType,
            address: areaType,
        }
        method = "GET";
    }
    var result = {};
    $.ajax({
        url: url,
        data: data,
        async: false, //同步获取数据才可以实时渲染，后期可改成获取时加个loading层
        type: method,
        beforeSend: function () {
            $("#caseList").html('<img src="/images/loading.gif" class="loading img-responsive">');
        },
        success: function (response) {
            if (response.code == 200) {
                result = response
            } else {
                alert('请求有问题噢');
            }
        }
    });
    return result;
}

function searchToggle() { //搜索点击事件
    searchContent = $(".search-input").val();
    $(".search-input").val('');
    loadView();
}

function doList(that) { //案例分析点击事件
    $(that).addClass("active").siblings().removeClass("active");
    eventType = $(that).val();
    searchContent = '';
    loadView();
}

function doArea(that) { //地区选择点击事件
    $(that).addClass("active").siblings().removeClass("active");
    areaType = $(that).val();
    searchContent = '';
    loadView();
}