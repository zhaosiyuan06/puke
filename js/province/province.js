$(function(){
    function select1() {
        $.ajax(
            {
                type: "post",
                url: "Handler.ashx",
                data: { "type": "province" },
                success: function (msg) {
                    for (var i = 0; i < msg.length; i++) {
                        $("#S1").append("<option value=" + msg[i].ProvinceID + ">" + msg[i].ProvinceName + "</option>");
                    }
                    select2();
                }
            })
    };
    function select2() {
        $("#S2").html("");
        $.ajax(
            {
                type: "post",
                url: "Handler.ashx",
                data: { "type": "city","provinceID":$('#S1').attr("value") },
                success: function (msg) {
                    for (var i = 0; i < msg.length; i++) {
                        $("#S2").append("<option value=" + msg[i].CityID + ">" + msg[i].CityName + "</option>");
                    }
                    select3();
                }
            })
    };
    function select3() {
        $("#S3").html("");
        $.ajax(
            {
                type: "post",
                url: "Handler.ashx",
                data: { "type": "district","cityID":$('#S2').attr("value") },
                success: function (msg) {
                    for (var i = 0; i < msg.length; i++) {
                        $("#S3").append("<option value=" + msg[i].DistrictID + ">" + msg[i].DistrictName + "</option>");
                    }
                }
            })
    };
    $(function () {
        select1();
        $('#S1').bind("change", select2);
        $('#S2').bind("change", select3);
    });

    $("#province").ProvinceCity()
})