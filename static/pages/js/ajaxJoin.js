$(".panel .jobSingle").click(function () {
    $(".panel .jobSingle").css("background", "transparent");
    $(".panel .jobSingle .glyphicon").removeClass("glyphicon-menu-down").addClass("glyphicon-menu-up")
    if (!$(this).next().hasClass("in")) {
        $(this).css("background", "#f3f3f3");
        $(this).find(".glyphicon").removeClass("glyphicon-menu-up").addClass("glyphicon-menu-down");
    }
})

var jobsType = 0;
var areaType = 0;
var postType = 0;
var searchContent = "";
var typeId = -1;
var isFirstOpen = true;
var workId = 0; //获取招聘信息ID

$(function () {
    loadView();
})

function loadView() {
    var res = getData(1);
    if (isFirstOpen) {
        isFirstOpen = false;
        loadChoice(res);
    }
    loadTable(res);
    loadPager(res);
}

function loadChoice(res) {
    typeId = res.data.typeId;
    var choiceData = res.data;
    for (var i = 0, len = choiceData.recruitType.length; i < len; i++) {
        $("#recruit").append('<li value="${i+1}" onclick="jobList(this)">${choiceData.recruitType[i]}</li>'.format({
            'i+1': i + 1,
            'choiceData.recruitType[i]': choiceData.recruitType[i]
        }))
    }

    for (var i = 0, len = choiceData.address.length; i < len; i++) {
        $("#area").append('<li value="${i+1}" onclick="areaList(this)">${choiceData.address[i]}</li>'.format({
            'i+1': i + 1,
            'choiceData.address[i]': choiceData.address[i]
        }))
    }

    for (var i = 0, len = choiceData.positionType.length; i < len; i++) {
        $("#post").append('<li value="${i+1}" onclick="postList(this)">${choiceData.positionType[i]}</li>'.format({
            'i+1': i + 1,
            'choiceData.positionType[i]': choiceData.positionType[i]
        }))
    }
}

function loadTable(res) {
    $("#jobBrother").nextAll().remove();
    var resData = res.data.content;
    for (var i = 0, len = resData.length; i < len; i++) {
        $("#jobBrother").after(
            '<div class="panel panel-default" id="${resData[i].id}">'.format({
                'resData[i].id': resData[i].id
            }) +
            '<div class="panel-heading jobSingle" role="tab" id="job${i+1}">'.format({
                'i+1': i + 1
            }) +
            '<a role="button" data-toggle="collapse" data-parent="#job" href="#collapse${i+1}" aria-expanded="false" aria-controls="collapse${i+1}" class="collapsed title">'.format({
                'i+1': i + 1
            }) +
            '<span class="name1">${resData[i].title}</span><span class="name2 hidden-xs">${resData[i].positionType}</span><span class="name3">${resData[i].positionAddress}</span><span class="glyphicon glyphicon-menu-up name4"></span>'.format({
                'resData[i].title': resData[i].title,
                'resData[i].positionType': resData[i].positionType,
                'resData[i].positionAddress': resData[i].positionAddress
            }) +
            ' </a></div><div id="collapse${i+1}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="job${i+1}">'.format({
                'i+1': i + 1
            }) +
            ' <div class="panel-body"><article>${resData[i].body}</article>'.format({
                'resData[i].body': resData[i].body
            }) +
            '<button class="apply btn" data-toggle="modal" data-target="#myModal" onclick="findId(this)">立即申请</button></div></div></div>'
        )
    }
    if (resData.length == 0) {
        $("#jobBrother").after('<div class="noData">暂无相关内容</div>')
    }
}

function loadPager(res) {
    $('.pagination').remove();
    var totalCount = res.data.pageSum;
    $("#paging").extendPagination({
        totalCount: totalCount,
        limit: 10,
        callback: function (curr, limit, totalCount) {
            var res = getData(curr);
            window.parent.scrollTo(0, 0);
            loadTable(res);
        }
    });
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
    } else if (jobsType == 0 && areaType == 0 && postType == 0) {
        url = "/joinIndex";
        data = {
            page: page
        };
        method = "GET";
    } else {
        url = "/joinSearch";
        data = {
            recruitType: jobsType,
            positionAddress: areaType,
            positionType: postType,
            page: page
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
            $("#jobBrother").after('<img src="/images/loading.gif" class="loading img-responsive">');
        },
        success: function (res) {
            if (res.code == 200) {
                result = res;
            } else {
                alert("请求有问题");
            }
        }
    });
    return result;
}

function jobList(that) { //点击招聘类型
    $(that).addClass("active").siblings().removeClass("active");
    jobsType = $(that).val();
    searchContent = "";
    loadView();
}

function areaList(that) { //点击区域类型
    $(that).addClass("active").siblings().removeClass("active");
    areaType = $(that).val();
    searchContent = "";
    loadView();
}

function postList(that) { //点击岗位类型
    $(that).addClass("active").siblings().removeClass("active");
    postType = $(that).val();
    searchContent = "";
    loadView();
}

function searchToggle() { //点击搜索框
    searchContent = $(".search-input").val();
    $(".search-input").val('');
    loadView();
}

function findId(that) {
    var obj = document.getElementById('FileUpload');
    obj.outerHTML = obj.outerHTML;
    workId = $(that).parent().parent().parent(".panel").attr("id");
    $(".body1").show();
    $(".body2,.body3").hide();
}

//上传简历
var formData = new FormData();

function upload(file) {
    formData.append("file", file.files[0]);
}

function doUpload(that) {
    var fileObj = document.getElementById("FileUpload").files[0];
    if (typeof (fileObj) == "undefined" || fileObj.size <= 0) {
        alert("请选择上传文件");
        return;
    }
    var fileType = fileObj.name.substring(fileObj.name.lastIndexOf(".")).toLowerCase();
    if (fileType !== ".zip" && fileType !== ".png" && fileType !== ".jpg" && fileType !== ".doc") {
        alert("该文件类型不允许上传,请上传.doc,.png,.jpg,.zip类型的文件");
        return false;
    }
    $(".body1,.body3").hide();
    $(".body2").show();
    $(".progress-bar-warning").html("0%");
    $(".progress-bar-warning").css("width", "0%");
    formData.append("id", workId)
    $.ajax({
        url: '/upload',
        type: 'POST',
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        xhr: function () {
            var xhr = $.ajaxSettings.xhr();
            if (onprogress && xhr.upload) {
                xhr.upload.addEventListener("progress", onprogress, false);
                return xhr;
            }
        },
        success: function (res) {
            $(".body1,.body2").hide();
            $(".body3").show();
        }
    });
}
//上传文件进度条 
function onprogress(evt) {
    var loaded = evt.loaded; //已经上传大小情况 
    var tot = evt.total; //附件总大小 
    var per = Math.floor(100 * loaded / tot); //已经上传的百分比  
    $(".progress-bar-warning").html(per + "%");
    $(".progress-bar-warning").css("width", per + "%");
}