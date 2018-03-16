$('#accordion').collapse({
    toggle: false
})

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
            ' <li value="${departData[i].did}" onclick="btnDepart(this)">${departData[i].name}</li>'.format({
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
    $("#list").empty();
    var resData = res.data.content;
    for (var i = 0, len = resData.length; i < len; i++) {
        var arr = resData[i].time.split('-');
        $("#list").append(
            '<li><a href="noticeContent.html#${resData[i].id}">'.format({
                'resData[i].id': resData[i].id
            }) +
            '<div class="left"><span class="day">${arr[2]}</span><p class="mon">${arr[0]}-${arr[1]}</p></div>'.format({
                'arr[2]': arr[2],
                'arr[0]': arr[0],
                'arr[1]': arr[1]
            }) +
            '<div class="right"><span>${resData[i].title}</span><article>${resData[i].description}</article></div>'.format({
                'resData[i].title': resData[i].title,
                'resData[i].description': resData[i].description
            }) +
            '</a></li>'
        )
    }
    if (resData.length == 0) {
        $("#list").html('<div class="noData">暂无相关内容</div>')
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
    } else if (departmentType == 0 && timeType == 0 && areaType == 0) {
        url = "/noticeIndex";
        data = {
            page: page
        };
        method = "GET";
    } else {
        url = "/noticeSearch";
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
            $("#list").html('<img src="/images/loading.gif" class="loading img-responsive">');
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