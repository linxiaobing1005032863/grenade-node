$(function () {
    // banner的数据
    $.ajax({
        type: "GET",
        url: '/indexBanner',
        beforeSend: function (XMLHttpRequest) {
            $("#banner").html('<img src="/images/loading.gif" class="loading img-responsive">');
        },
        success: function (res) {
            $("#banner").empty();
            $(".carousel-indicators").empty();
            for (var i = 0, len = res.data.length; i < len; i++) {
                $("#banner").append(
                    '<div class="item">' +
                    '<img src="${res.data[i].image}" alt="${res.data[i].title}" class="img-responsive">'.format({
                        'res.data[i].image': res.data[i].image,
                        'res.data[i].title': res.data[i].title
                    }) +
                    '</div>'
                )
                $(".carousel-indicators").append(
                    '<li data-target="#carousel-example-generic" data-slide-to="${i}"></li>'.format({
                        i: i
                    })
                )
                $("#banner .item:first").addClass("active");
                $(".carousel-indicators li:first").addClass("active");
            }
        },
    });

    $.ajax({
        type: "GET",
        url: "/indexData",
        beforeSend: function (XMLHttpRequest) {
            $("#noticeScrollList").html('<img src="/images/loading.gif" class="loading img-responsive">');
            $("#activeList").html('<img src="/images/loading.gif" class="loading img-responsive">');
            $("#caseScrollList").html('<img src="/images/loading.gif" class="loading img-responsive">');
            $("#caseIndex").html('<img src="/images/loading.gif" class="loading img-responsive">');
            $("#bidImg").html('<img src="/images/loading.gif" class="loading img-responsive" style="height:auto">');
            $("#newsScrollList").html('<img src="/images/loading.gif" class="loading img-responsive" style="height:auto">');
        },
        success: function (res) {
            if (res.code == 200) {
                var noticeData = res.data.notice;
                var companyData = res.data.company;
                var caseData = res.data.caselist;
                var caseBannerData = res.data.caseBanner;
                var bidData = res.data.tender;
                //最新招标
                $("#bidImg").html('<img src="${bidData.image}" class="img-responsive">'.format({
                    'bidData.image': bidData.image
                }))
                for (var i = 0, len = bidData.address.length; i < len; i++) {
                    $("#bidArea").append(
                        '<option value="${bidData.address[i].name}">${bidData.address[i].name}</option>'.format({
                            'bidData.address[i].name': bidData.address[i].name
                        })
                    )
                }
                for (var i = 0, len = bidData.class.length; i < len; i++) {
                    $("#bidWebsite").append(
                        '<option value="${bidData.class[i].name}">${bidData.class[i].name}</option>'.format({
                            'bidData.class[i].name': bidData.class[i].name
                        })
                    )
                }
                $("#newsScrollList").empty();
                $("#newsScrollList").parent().attr("id", "newsScroll");
                for (var i = 0, len = bidData.content.length; i < len; i++) {
                    $("#newsScrollList").append('<li><a href="bid/bidContent.html#${bidData.content[i].id}">'.format({
                            'bidData.content[i].id': bidData.content[i].id
                        }) +
                        '<span>${bidData.content[i].title}</span>'.format({
                            'bidData.content[i].title': bidData.content[i].title
                        }) +
                        '<span>${bidData.content[i].time}</span>'.format({
                            'bidData.content[i].time': bidData.content[i].time
                        }) +
                        '</a></li>')
                }
                if (bidData.content.length == 0) {
                    $("#newsScrollList").html('<div class="noData">暂无相关内容</div>');
                    $("#newsScrollList").parent().removeAttr("id");
                }
                //公告数据
                for (var i = 0, len = noticeData.department.length; i < len; i++) {
                    $("#noticeDep").append(
                        '<option value="${noticeData.department[i].did}">${noticeData.department[i].name}</option>'.format({
                            'noticeData.department[i].did': noticeData.department[i].did,
                            'noticeData.department[i].name': noticeData.department[i].name
                        })
                    )
                }
                for (var i = 0, len = noticeData.address.length; i < len; i++) {
                    $("#noticeArea").append(
                        '<option value="${i+1}">${noticeData.address[i]}</option>'.format({
                            'i+1': i + 1,
                            'noticeData.address[i]': noticeData.address[i]
                        })
                    )
                }
                $("#noticeScrollList").empty();
                $("#noticeScrollList").parent().attr("id", "noticeScroll");
                for (var i = 0, len = noticeData.content.length; i < len; i++) {
                    $("#noticeScrollList").append(
                        '<li><a href="notice/noticeContent.html#${noticeData.content[i].id}">'.format({
                            'noticeData.content[i].id': noticeData.content[i].id
                        }) +
                        '<span>${noticeData.content[i].title}</span>'.format({
                            'noticeData.content[i].title': noticeData.content[i].title
                        }) +
                        '<span>${noticeData.content[i].time}</span>'.format({
                            'noticeData.content[i].time': noticeData.content[i].time
                        }) +
                        '</a></li>'
                    )
                }
                if (noticeData.content.length == 0) {
                    $("#noticeScrollList").html('<div class="noData">暂无相关内容</div>');
                    $("#noticeScrollList").parent().removeAttr("id");
                }
                //企业活动数据
                for (var i = 0, len = companyData.department.length; i < len; i++) {
                    $("#activeDep").append(
                        '<option value="${companyData.department[i].did}">${companyData.department[i].name}</option>'.format({
                            'companyData.department[i].did': companyData.department[i].did,
                            'companyData.department[i].name': companyData.department[i].name
                        })
                    )
                }
                $("#activeList").empty();
                for (var i = 0, len = companyData.content.length; i < len; i++) {
                    var arr = companyData.content[i].time.split('-');
                    $("#activeList").append(
                        '<a class="item" href="trend/trendContent.html#${companyData.content[i].id}">'.format({
                            'companyData.content[i].id': companyData.content[i].id
                        }) +
                        '<img src="${companyData.content[i].image}" class="img-responsive">'.format({
                            'companyData.content[i].image': companyData.content[i].image
                        }) +
                        '<div class="carousel-caption"><div class="title">${companyData.content[i].title}</div>'.format({
                            'companyData.content[i].title': companyData.content[i].title
                        }) +
                        '<p>举行日期${arr[0]}年${arr[1]}月${arr[2]}日</p>'.format({
                            'arr[0]': arr[0],
                            'arr[1]': arr[1],
                            'arr[2]': arr[2]
                        }) +
                        '<span>&gt;&gt;详情</span></div></a>'
                    )
                }
                $("#activeList .item:first").addClass("active");
                if (companyData.content.length == 0) {
                    $("#activeList").html('<div class="noData">暂无相关内容</div>')
                }
                //案例分析左边轮播数据
                $("#caseIndex").empty();
                for (var i = 0, len = caseBannerData.length; i < len; i++) {
                    $("#caseIndex").append(
                        '<a class="item" href="example/exampleContent.html#${caseBannerData[i].id}">'.format({
                            'caseBannerData[i].id': caseBannerData[i].id
                        }) +
                        '<img src="${caseBannerData[i].image}" class="img-responsive">'.format({
                            'caseBannerData[i].image': caseBannerData[i].image
                        }) +
                        '<div class="carousel-caption"> ${caseBannerData[i].title}</div></a>'.format({
                            'caseBannerData[i].title': caseBannerData[i].title
                        })
                    )
                }
                $("#caseIndex .item:first").addClass("active");
                if (caseBannerData.length == 0) {
                    $("#caseIndex").html('<div class="noData">暂无相关内容</div>')
                }
                //案例分析右边滚动数据
                for (var i = 0, len = caseData.address.length; i < len; i++) {
                    $("#caseList").append(
                        '<option value="${i+1}">${caseData.address[i]}</option>'.format({
                            'i+1}': i + 1,
                            'caseData.address[i]': caseData.address[i]
                        })
                    )
                }
                $("#caseScrollList").empty();
                $("#caseScrollList").parent().attr("id", "caseScroll");
                for (var i = 0, len = caseData.content.length; i < len; i++) {
                    $("#caseScrollList").append(
                        '<li><a href="example/exampleContent.html#${caseData.content[i].id}">'.format({
                            "caseData.content[i].id": caseData.content[i].id
                        }) +
                        '<span>${caseData.content[i].title}</span>'.format({
                            'caseData.content[i].title': caseData.content[i].title
                        }) +
                        '<span>${caseData.content[i].time}</span>'.format({
                            'caseData.content[i].time': caseData.content[i].time
                        }) +
                        '</a></li>'
                    )
                }
                if (caseData.content.length == 0) {
                    $("#caseScrollList").html('<div class="noData">暂无相关内容</div>');
                    $("#caseScrollList").parent().removeAttr("id");
                }
            }
        },
    });

    // //首页------------------核心优势轮播图
    var swiper = new Swiper('.swiper-container', {
        loop: true,
        calculateHeight: true,
        centeredSlides: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        followFinger: false,
        speed: 1000,
        mousewheel: false,
        on: {
            init: function (swiper) {
                slide = this.slides.eq(0);
                slide.addClass('ani-slide');
            },
            transitionStart: function () {
                for (i = 0; i < this.slides.length; i++) {
                    slide = this.slides.eq(i);
                    slide.removeClass('ani-slide');
                }
            },
            transitionEnd: function () {
                slide = this.slides.eq(this.activeIndex);
                slide.addClass('ani-slide');
            },
        }
    });

    // 首页-----------------轮播图的播放间隔时间
    $('.banner').carousel({
        interval: 3000
    })
})
var noticeDepType = 0;
var noticeAreaType = 0;
var companyDepType = 0;
var caseAreaType = 0;
var bidAreaType = "all";
var bidWebsite = "all";

function bidChoice() {
    bidAreaType = encodeURI($("#bidArea option:selected").val());
    bidWebsite = encodeURI($("#bidWebsite option:selected").val());
    changeBid();
}

function noticeChoice() {
    noticeDepType = $("#noticeDep  option:selected").val();
    noticeAreaType = $("#noticeArea  option:selected").val();
    changeNotice();
}

function companyChoiceDep() {
    companyDepType = $("#activeDep option:selected").val();
    changeCompany();
}

function caseChoiceArea() {
    caseAreaType = $("#caseList option:selected").val();
    changeCase();
}

function changeNotice() {
    $.ajax({
        url: "/noticeSearch",
        type: "GET",
        data: {
            page: 1,
            time: 0,
            id: noticeDepType,
            address: noticeAreaType,
        },
        success: function (res) {
            if (res.code == 200) {
                var resData = res.data.content;
                $("#noticeScrollList").empty();
                $("#noticeScrollList").parent().attr("id", "noticeScroll");
                for (var i = 0, len = resData.length; i < len; i++) {
                    $("#noticeScrollList").append(
                        '<li><a href="notice/noticeContent.html#${resData[i].id}">'.format({
                            'resData[i].id': resData[i].id
                        }) +
                        '<span>${resData[i].title}</span>'.format({
                            'resData[i].title': resData[i].title
                        }) +
                        '<span>${resData[i].time}</span>'.format({
                            'resData[i].time': resData[i].time
                        }) +
                        '</a></li>'
                    )
                }
                if (resData.length == 0) {
                    $("#noticeScrollList").html('<div class="noData">暂无相关内容</div>');
                    $("#noticeScrollList").parent().removeAttr("id");
                }
            }
        }
    })
}

function changeCompany() {
    $.ajax({
        url: "/trendSearch",
        data: {
            id: companyDepType,
            address: 0,
            time: 0,
            page: 1
        },
        type: "GET",
        success: function (res) {
            if (res.code == 200) {
                var resData = res.data.content;
                $("#activeList").empty();
                for (var i = 0, len = resData.length; i < len; i++) {
                    var arr = resData[i].time.split('-');
                    $("#activeList").append(
                        '<a class="item" href="trend/trendContent.html#${resData[i].id}">'.format({
                            'resData[i].id': resData[i].id
                        }) +
                        '<img src="${resData[i].image}" class="img-responsive">'.format({
                            'resData[i].image': resData[i].image
                        }) +
                        '<div class="carousel-caption"><div class="title">${resData[i].title}</div>'.format({
                            'resData[i].title': resData[i].title
                        }) +
                        '<p>举行日期${arr[0]}年${arr[1]}月${arr[2]}日</p>'.format({
                            'arr[0]': arr[0],
                            'arr[1]': arr[1],
                            'arr[2]': arr[2]
                        }) +
                        '<span>&gt;&gt;详情</span></div></a>'
                    )
                }
                $("#activeList .item:first").addClass("active");
                if (resData.length == 0) {
                    $("#activeList").html('<div class="noData">暂无相关内容</div>');
                }
            }
        }
    })
}

function changeCase() {
    $.ajax({
        url: "/exampleSearch",
        data: {
            id: 0,
            time: 0,
            address: caseAreaType,
            page: 1
        },
        type: 'GET',
        success: function (res) {
            if (res.code == 200) {
                var resData = res.data.content;
                $("#caseScrollList").empty();
                $("#caseScrollList").parent().attr("id", "caseScroll");
                for (var i = 0, len = resData.length; i < len; i++) {
                    $("#caseScrollList").append(
                        '<li><a href="example/exampleContent.html#${resData[i].id}">'.format({
                            'resData[i].id': resData[i].id
                        }) +
                        '<span>${resData[i].title}</span>'.format({
                            'resData[i].title': resData[i].title
                        }) +
                        '<span>${resData[i].time}</span>'.format({
                            'resData[i].title': resData[i].title
                        }) +
                        '</a></li>'
                    )
                }
                if (resData.length == 0) {
                    $("#caseScrollList").html('<div class="noData">暂无相关内容</div>');
                    $("#caseScrollList").parent().removeAttr("id");
                }
            }
        }
    })
}

function changeBid() {
    $.ajax({
        url: "/bidSearchTenderList",
        data: {
            time: 0,
            page: 1,
            address: bidAreaType,
            class: bidWebsite,
        },
        type: 'GET',
        success: function (res) {
            if (res.code == 200) {
                var resData = res.data.content;
                $("#newsScrollList").empty();
                $("#newsScrollList").parent().attr("id", "newsScroll");
                for (var i = 0, len = resData.length; i < len; i++) {
                    $("#newsScrollList").append(
                        '<li><a href="bid/bidContent.html#${resData[i].id}">'.format({
                            'resData[i].id': resData[i].id
                        }) +
                        '<span>${resData[i].title}</span>'.format({
                            'resData[i].title': resData[i].title
                        }) +
                        '<span>${resData[i].time}</span>'.format({
                            'resData[i].time': resData[i].time
                        }) +
                        '</a></li>'
                    )
                }
                if (resData.length == 0) {
                    $("#newsScrollList").html('<div class="noData">暂无相关内容</div>');
                    $("#newsScrollList").parent().removeAttr("id");
                }
            }
        }
    })
}