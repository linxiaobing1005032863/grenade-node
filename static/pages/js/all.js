$(document).ready(function () {
    // 整个网站-------------导入公共头部底部
    $('.navbar-default').load("../common/header.html");
    $('footer').load("../common/footer.html");

    //整个网站-------------搜索移入展开搜索框
    $(".input-holder img").mouseenter(function () {
        var long = $(".search").width() - 46;
        $(this).siblings("input").animate({
            width: long
        }, 600).select();
    });
    $(".input-holder").click(function (e) {
        e.stopPropagation();
    });

    // 首页---------------艾佳服务的移入移除
    $(".service .col-md-3").hover(function () {
        $(this).find(".self").filter(':not(:animated)').slideUp(300);
        $(this).find(".goIn").filter(':not(:animated)').slideDown(300);
    }, function () {
        $(this).find(".self").slideDown(300)
        $(this).find(".goIn").slideUp(300)
    })

    // 首页------------------右侧的扫一扫二维码
    $(".qrcode .top").click(function () {
        $(this).next("ul").slideDown();
        $(this).next().next(".bottom").show();
    })
    $(".qrcode .bottom").click(function () {
        $(this).prev("ul").slideUp();
        $(this).hide();
    });
    $(window).bind("scroll", function () {
        var top = $(this).scrollTop(); // 当前窗口的滚动距离
        if (top >= 600) {
            $(".qrcode").show();
        } else {
            $(".qrcode").hide();
        }
        if (document.body.offsetWidth <= 768) {
            $(".qrcode").hide();
        }
    });

    //首页---------------------右侧的扫一扫二维码上移放大效果
    $(".qrcode li").hover(function () {
        var num = $(this).index();
        var high = num * 110;
        $(".qrcode .left").html('<img src=../images/index/big' + num + '.png>');
        $(".qrcode .left").css({
            "top": high,
            "display": "block"
        });
    }, function () {
        $(".qrcode .left").css("display", "none");
    })

    //首页-------------------右侧返回顶部的按钮
    var clientHeight = document.documentElement.clientHeight; //获取可视区域的高度
    var timer = null; //定义一个定时器
    var isTop = true; //定义一个布尔值，用于判断是否到达顶部

    window.onscroll = function () { //滚动条滚动事件
        var osTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (osTop >= clientHeight) { //如果滚动高度大于可视区域高度，则显示回到顶部按钮
            $("#back").show();
        } else {
            $("#back").hide();
        }

        //主要用于判断当 点击回到顶部按钮后 滚动条在回滚过程中，若手动滚动滚动条，则清除定时器
        if (!isTop) {
            clearInterval(timer);
        }
        isTop = false;
    }
    $("#back").click(function () {
        timer = setInterval(function () {
            var osTop = document.documentElement.scrollTop || document.body.scrollTop; //获取滚动条的滚动高度
            //用于设置速度差，产生缓动的效果
            var speed = Math.floor(-osTop / 6);
            document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
            isTop = true; //用于阻止滚动事件清除定时器
            if (osTop == 0) {
                clearInterval(timer);
            }
        }, 30);
    })

    // 首页--------------新闻滚动
    stopOrstart("#newsScroll");
    stopOrstart("#noticeScroll");
    stopOrstart("#caseScroll");

    // 首页-----------------------合作伙伴-图片的上移旋转
    $(".img img").mouseenter(function () {
        $(this).css("transform", "rotateY(360deg)");
        $(this).css("transition", "1s");
    })

    //最新招标---------------------头条招标
    stopOrstart("#headlineScroll");
    stopOrstart("#recommendScroll");

    //公司动态------------------公告轮播
    stopOrstart("#trendScroll");

})

// 自动滚动的方法
function autoScroll(obj) {
    $(obj).find("ul").animate({
        marginTop: "-37px"
    }, 500, function () {
        $(this).css({
            marginTop: "0px"
        }).find("li:first").appendTo(this);
    })
}

// 移入暂停移出滚动的方法
function stopOrstart(obj) {
    var timer = setInterval('autoScroll("' + obj + '")', 3000);
    $(obj).hover(function () {
        clearInterval(timer);
    }, function () {
        timer = setInterval('autoScroll("' + obj + '")', 3000);
    })
}