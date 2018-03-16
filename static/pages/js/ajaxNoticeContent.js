var id = window.location.hash.substr(1);
$.ajax({
    url: "/articleDeatail",
    data: {
        id: id
    },
    type: "GET",
    beforeSend: function () {
        $(".noticeContent").append('<img src="/images/loading.gif" class="loading img-responsive">');
    },
    success: function (res) {
        if (res.code == 200) {
            $(".bannerContent").siblings().remove();
            $(".noticeContent").append(
                '<p class="way"><span class="glyphicon glyphicon-home"></span>&nbsp;&nbsp;当前位置：<a href="../index.html">首页</a>&nbsp;&gt;&nbsp;<a href="../trend/trendIndex.html">公司动态</a>&nbsp;&gt;&nbsp;<a href="noticeIndex.html">公告</a>&nbsp;&gt;&nbsp;${res.data.title}</p>'.format({
                    'res.data.title': res.data.title
                }) +
                '<div class="text"><h5 class="name">${res.data.title}</h5><p class="parameter">日期：${res.data.time}<span>浏览次数：${res.data.click}</span></p>'.format({
                    'res.data.title': res.data.title,
                    'res.data.time': res.data.time,
                    'res.data.click': res.data.click
                }) +
                '<article class="mainText">${res.data.content}</article></div>'.format({
                    'res.data.content': res.data.content
                })
            )
        }
    }
})