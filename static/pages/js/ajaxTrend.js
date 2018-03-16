var departmentType = 0;
var areaType = 0;
var timeType = 0;
var searchContent = "";
var typeId = -1;
var isFirstOpen = true;

$(function () {
    $(".time-type").on('click', function () {
        $(this).addClass("active").siblings().removeClass("active");
        timeType = $(this).val();
        searchContent = '';
        loadView();
    })
    loadView();
})

function loadView() {
    var res = getData(1);
    if (isFirstOpen) {
        isFirstOpen = false;
        loadDepartment(res);
    }
    loadTable(res);
    loadPager(res);
}

function loadDepartment(res) {
    typeId = res.data.typeId;
    var departData = res.data.department;
    for (var i = 0, len = departData.length; i < len; i++) {
        $("#department").append(
            ' <li value="${departData[i].did}" onclick="btnDepart(this)">${departData[i].name} </li>'.format({
                'departData[i].did': departData[i].did,
                'departData[i].name': departData[i].name
            })
        )
    }
    for (var i = 0, len = res.data.address.length; i < len; i++) {
        $("#area").append(
            ' <li value="${i+1}" onclick="btnArea(this)">${res.data.address[i]} </li>'.format({
                'i+1': i + 1,
                'res.data.address[i]': res.data.address[i]
            })
        )
    }
}

function loadTable(res) {
    $("#trendList").empty();
    var resData = res.data.content
    for (var i = 0, len = resData.length; i < len; i++) {
        $("#trendList").append(
            '<li><a class="row listDet" href="trendContent.html#${resData[i].id}">'.format({
                'resData[i].id': resData[i].id
            }) +
            '<div class="col-sm-4 col-xs-12"><img src="${resData[i].image}" alt="${resData[i].title}" class="img-responsive"></div>'.format({
                'resData[i].image': resData[i].image,
                'resData[i].title': resData[i].title
            }) +
            '<div class="col-sm-8 col-xs-12"><p class="listName"><span>${resData[i].title}</span>${resData[i].time}</p>'.format({
                'resData[i].title': resData[i].title,
                'resData[i].time': resData[i].time
            }) +
            '<article>${resData[i].description}</article>'.format({
                'resData[i].description': resData[i].description
            }) +
            ' <p class="see">${resData[i].click}</p></div></a></li>'.format({
                'resData[i].click': resData[i].click
            })
        )
    }
    if (resData.length == 0) {
        $("#trendList").html('<div class="noData">暂无相关内容</div>')
    }
}

function loadPager(res) {
    $(".pagination").remove();
    var totalCount = res.data.pageSum;
    $("#paging").extendPagination({
        totalCount: totalCount,
        limit: 10,
        callback: function (curr, limit, totalCount) {
            var res = getData(curr);
            window.parent.scrollTo(0, 0);
            loadTable(res);
        }
    })
}

function getData(page) {
    var url = "";
    var data = {};
    var method = "";
    if (searchContent !== "") {
        url = "/search";
        data = {
            typeId: typeId,
            content: searchContent,
            page: page
        };
        method = "POST";
    } else if (departmentType == 0 && areaType == 0 && timeType == 0) {
        url = "/trendIndex";
        data = {
            page: page
        };
        method = "GET";
    } else {
        url = "/trendSearch";
        data = {
            page: page,
            id: departmentType,
            address: areaType,
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
            $("#trendList").html('<img src="/images/loading.gif" class="loading img-responsive">');
        },
        success: function (res) {
            if (res.code == 200) {
                result = res;
            } 
        }
    });
    return result;
}

function searchToggle() {
    searchContent = $(".search-input").val();
    $(".search-input").val('');
    loadView();
}

function btnDepart(that) {
    $(that).addClass("active").siblings().removeClass("active");
    departmentType = $(that).val();
    searchContent = '';
    loadView();
}

function btnArea(that) {
    $(that).addClass("active").siblings().removeClass("active");
    areaType = $(that).val();
    searchContent = '';
    loadView();
}

//获取公告内容
$(function () {
    $.ajax({
        url: "/trendNotice",
        type: "GET",
        beforeSend: function (XMLHttpRequest) {
            $("#trendNotice").html('<img src="/images/loading.gif" class="loading img-responsive">');
        },
        success: function (res) {
            if (res.code == 200) {
                $("#trendNotice").empty();
                $("#trendNotice").parent().attr("id", "trendScroll");
                for (var i = 0, len = res.data.length; i < len; i++) {
                    $("#trendNotice").append(
                        '<li> <a href="../notice/noticeContent.html#${res.data[i].id}"><span>${res.data[i].title}</span></a></li>'.format({
                            'res.data[i].id': res.data[i].id,
                            'res.data[i].title': res.data[i].title
                        })
                    )
                }
                if (res.data.length == 0) {
                    $("#trendNotice").html('<div class="noData">暂无相关内容</div>');
                    $("#trendNotice").parent().removeAttr("id");
                }
            }
        }
    })
})