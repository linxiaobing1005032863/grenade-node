var id = window.location.hash.substr(1);
$.ajax({
    url: "/bidDetail",
    data: {
        id: id
    },
    type: "GET",
    beforeSend: function () {
        $(".bidContent").append('<img src="/images/loading.gif" class="loading img-responsive">');
    },
    success: function (res) {
        if (res.code == 200) {
            $(".updateNews").siblings().remove();
            $(".bidContent").append(
                '<p class="way"><span class="glyphicon glyphicon-home"></span>&nbsp;&nbsp;当前位置：<a href="../index.html">首页</a>&nbsp;&gt;&nbsp;<a href="bidIndex.html">最新招标</a>&nbsp;&gt;&nbsp;${res.data.title}</p>'.format({
                    'res.data.title': res.data.title
                }) +
                '<div class="text"><h5 class="name">${res.data.title}</h5><p class="parameter">日期：${res.data.time}<span>浏览次数：${res.data.click}</span></p>'.format({
                    'res.data.title': res.data.title,
                    'res.data.time': res.data.time,
                    'res.data.click': res.data.click
                }) +
                '<article class="mainText">${res.data.content}</article><p class="origin">来源：<a href="${res.data.url}" target="_blank">${res.data.company}</a></p></div>'.format({
                    'res.data.content': res.data.content,
                    'res.data.url': res.data.url,
                    'res.data.company': res.data.company
                })
            )
        }
    }
})

//头条招标
$.ajax({
    type: "GET",
    url: "/bidHeadlineTender",
    success: function (res) {
        var resData = res.data;
        if (res.code == 200) {
            for (var i = 0, len = resData.length; i < len; i++) {
                $(".crosswise").append('<li><a href="bidContent.html#${resData[i].id}" onclick="location.reload()">${resData[i].title}</a></li>'.format({
                    'resData[i].id': resData[i].id,
                    'resData[i].title': resData[i].title
                }))
            }
            if (resData.length == 0) {
                $(".crosswise").html('<div class="noData">暂无相关内容</div>');
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