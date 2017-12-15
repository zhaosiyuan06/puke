$(function () {
    //视屏播放
    $(".backgroundImage").on("click", function () {
        var imgSrc = $(this).attr("src-data")
        $(".video_zhezhao .videoplay_Box video").attr("src", imgSrc);
        $(".video_zhezhao .videoplay_Box video")[0].play();
        $(".video_zhezhao").css("display", "block")
    })
    $(".video_zhezhao img").on("click", function () {
        $(".video_zhezhao .videoplay_Box video")[0].pause();
        $(".video_zhezhao").css("display", "none")
    })
    //相关资讯鼠标经过样式
    $(".golf_news .col-md-2  .news_box").on("mouseenter", function () {
        $(this).css("margin-top", "-20px")
    })
    $(".golf_news .col-md-2  .news_box").on("mouseleave", function () {
        $(this).css("margin-top", "0px")
    })
    //注册
    $("#loginin").on("click", function () {
        $(".register").css("display", "block")
        $(".register .form-horizontal").addClass("down")
    })
    $(".register .cancel").on("click", function () {
        $(".register").css("display", "none")
        $(".register .form-horizontal").removeClass("down")
    })
    //登录
    $(".login_register").on("click", function () {
        $(".register").css("display", "none")
        $(".login").css("display", "block")
        $(".register .form-horizontal").removeClass("down")
        $(".login .form-horizontal").addClass("down")
    })
    $(".login .cancel").on("click", function () {
        $(".login").css("display", "none")
        $(".login .form-horizontal").removeClass("down")
    })
//    点赞
    $(".content .container .new").on("click", function () {
        if ($(this).hasClass("news")) {
            $(this).removeClass("news")
        } else {
            $(this).addClass("news")
        }
    })

    // 产品数量加减
    $(".num1").on("click", function () {
        var n = $(this).next().val();
        var num = parseInt(n) - 1;
        if (num == 0) {
            return
        }
        $(this).next().val(num);
    })
    $(".num2").on("click", function () {
        var n = $(this).prev().val();
        var num = parseInt(n) + 1;
        if (num == 0) {
            return;
        }
        $(this).prev().val(num);
    })

    //订单确认
    function address() {
        var parer = $(".content_address .container .row .col-md-4 .addressed p").html()
        var people = $(".content_address .container .row .col-md-4 .addressed .man").html()
        // alert(people)
        var tel = $(".content_address .container .row .col-md-4 .addressed .tel").html()
        // alert(tel)
        $(".submit_box .container .col-md-12 .col-md-8 p").html(parer)
        $(".submit_box .container .col-md-12 .col-md-8 .names").html(people)
        $(".submit_box .container .col-md-12 .col-md-8 .tels").html(tel)
    }

    address()

    //默认地址选定
    $(".content_address .col-md-4").on("click", function () {
        $(".content_address .col-md-4 .box_order").removeClass("addressed")
        $(this).children(".box_orders").addClass("addressed")
        address()
    })

    //总额
    var sum = 0;
    $(".order_information .shop_order").each(function () {
        var add = parseFloat($(".money").html());
        sum = parseFloat(sum) + add;
        $(".submit_box .total").html(parseFloat(sum));
    })
//    新增工作地址
    $(".content_address .new_add,.address_table .right").on("click",function(){
        $(".new_address_box").css("display","block")
    })
    $(".close_box").on("click",function(){
        $(".new_address_box").css("display","none")
    })


//   信息确认页面选项卡
    $(".bottom_infor ul li").on("click",function(){

        var index = $(this).index();
        $(".infor_container>ul").eq(index).show().siblings().hide();
    })
//    修改个人信息
    $(".resert").on("click",function () {
        $(".col-md-9 .infor_container ul").css("display","none")
        $(".wan_infor").css("display","block")
    })
})


