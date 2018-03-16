//数据交互-----------动态加载数据
var areaType = "all";
var typeType = "all";
var timeType = 0;
var searchContent = '';
var isFirstOpen = true;

$(function () {
    loadView(); //加载页面
});

function bidSelect() {
    areaType = encodeURI($("#bidArea option:selected").val());
    timeType = encodeURI($("#bidTime option:selected").val());
    typeType = encodeURI($("#bidType option:selected").val());
    searchContent = '';
    loadView();
}

function loadView() {
    var response = getData(1);
    if (isFirstOpen) { //首次打开页面
        isFirstOpen = false;
        loadAnalyze(response);
    }

    loadTable(response); //加载数据
    loadPager(response); //加载分页器
}

function loadAnalyze(response) {
    var resData = response.data.tender;
    for (var i = 0, len = resData.address.length; i < len; i++) {
        $("#bidArea").append('<option value="${resData.address[i].name}">${resData.address[i].name}</option>'.format({
            'resData.address[i].name': resData.address[i].name
        }))
    }

    for (var i = 0, len = resData.class.length; i < len; i++) {
        $("#bidType").append('<option value="${resData.class[i].name}">${resData.class[i].name}</option>'.format({
            'resData.class[i].name': resData.class[i].name
        }))
    }
}

function loadTable(response) {
    $('#mainBid').empty();
    var resData = response.data.content;
    for (var i = 0, len = resData.length; i < len; i++) {
        $("#mainBid").append(
            '<li><a href="bidContent.html#${resData[i].id}">'.format({
                'resData[i].id': resData[i].id
            }) +
            '<h5>${resData[i].title}</h5>'.format({
                'resData[i].title': resData[i].title
            }) +
            '<article>${resData[i].description}</article>'.format({
                'resData[i].description': resData[i].description
            }) +
            '<span>${resData[i].time}</span>'.format({
                'resData[i].time': resData[i].time
            }) +
            '</a></li>'
        )
    }
    if (resData.length == 0) {
        $("#mainBid").html('<div class="noData">暂无相关内容</div>')
    }
}

//小伎俩：因为获取的pageSum是总页数
//该组件不支持直接输入总页数
//所以limit填1，这样的话totalCount就是总页数
function loadPager(response) {
    $('.pagination').remove();
    var totalCount = response.data.pageSum;
    $('#paging').extendPagination({
        totalCount: totalCount,
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
    if (searchContent !== "") {
        url = "/searchTender";
        data = {
            content: searchContent,
            page: page
        };
        method = "POST";
    } else if (timeType == 0 && areaType == "all" && typeType == "all") {
        url = "/bidIndex";
        data = {
            page: page
        };
        method = "GET";
    } else {
        url = "/bidSearchTenderList";
        data = {
            page: page,
            address: areaType,
            class: typeType,
            time: timeType
        };
        method = "GET";
    }
    var result = {};
    $.ajax({
        url: url,
        data: data,
        async: false,
        type: method,
        beforeSend: function () {
            $("#mainBid").html('<img src="/images/loading.gif" class="loading img-responsive">');
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


//头条招标
$.ajax({
    type: "GET",
    url: "/bidHeadlineTender",
    beforeSend: function () {
        $("#headlineScrollList").html('<img src="/images/loading.gif" class="loading img-responsive">');
    },
    success: function (res) {
        var resData = res.data;
        if (res.code == 200) {
            $("#headlineScrollList").empty();
            $("#headlineScrollList").parent().attr("id", "headlineScroll");
            for (var i = 0, len = resData.length; i < len; i++) {
                $("#headlineScrollList").append(
                    '<li><a href="bidContent.html#${resData[i].id}">'.format({
                        'resData[i].id': resData[i].id
                    }) +
                    '<span>${resData[i].title}</span><span>${resData[i].time}</span>'.format({
                        'resData[i].title': resData[i].title,
                        'resData[i].time': resData[i].time
                    }) +
                    '</a></li>'
                )
                $(".crosswise").append('<li><a href="bidContent.html#${resData[i].id}">${resData[i].title}</a></li>'.format({
                    'resData[i].id': resData[i].id,
                    'resData[i].title': resData[i].title
                }))
            }
            if (resData.length == 0) {
                $("#headlineScrollList").html('<div class="noData">暂无相关内容</div>');
                $(".crosswise").html('<div class="noData">暂无相关内容</div>');
                $("#headlineScrollList").parent().removeAttr("id");
            }
        }
    }
})

//开标
$.ajax({
    type: "GET",
    url: "/bidOpenTender",
    beforeSend: function () {
        $("#bidOpeningList").html('<img src="/images/loading.gif" class="loading img-responsive">');
    },
    success: function (res) {
        var resData = res.data;
        if (res.code == 200) {
            $("#bidOpeningList").empty();
            $("#bidOpeningList").parent().attr("id", "recommendScroll");
            for (var i = 0, len = resData.length; i < len; i++) {
                $("#bidOpeningList").append(
                    '<li><a href="bidContent.html#${resData[i].id}"><span>${resData[i].title}</span><span>${resData[i].time}</span></a></li>'.format({
                        'resData[i].id': resData[i].id,
                        'resData[i].title': resData[i].title,
                        'resData[i].time': resData[i].time
                    })
                )
            }
            if (resData.length == 0) {
                $("#bidOpeningList").html('<div class="noData">暂无相关内容</div>');
                $("#bidOpeningList").parent().removeAttr("id");
            }
        }
    }
})

//横向滚动最新动态
window.onload = function () {
    //招标------------------顶部横向滚动
    var demo = document.getElementById("demo");
    var demo1 = document.getElementById("demo1");
    var demo2 = document.getElementById("demo2");
    demo2.innerHTML = document.getElementById("demo1").innerHTML;

    function Marquee() {
        if (demo.scrollLeft - demo2.offsetWidth >= 0) {
            demo.scrollLeft -= demo1.offsetWidth;
        } else {
            demo.scrollLeft++;
        }
    }
    var myvar = setInterval(Marquee, 30);
    demo.onmouseout = function () {
        myvar = setInterval(Marquee, 30);
    }
    demo.onmouseover = function () {
        clearInterval(myvar);
    }
}