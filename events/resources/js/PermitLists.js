
$(document).ready(function () {
    $('select[id^="SelectYear_"]').live('change', function () {
        SetDateOnSelectChange($(this), 'year');
    });
    $('select[id^="SelectMonth_"]').live('change', function () {
        SetDateOnSelectChange($(this), 'month');
    });
    $('select[id^="SelectDay_"]').live('change', function () {
        SetDateOnSelectChange($(this), 'day');
    });

    $('#btnFBConfirm').click(function () {
        showMask();
        var rtn = FormCheckAndSubmit();
        if (!rtn) {
            hideMask();
            return false;
        }
        return true;
        alert("send!!");
        return false;
    });

    $('#btnCancel').click(function () {
        $("#form1").attr("action", $("#form1").attr("action") + "?end=3");
    });

    $('#GetCaptcha').load(function () {
        $('#showCaptcha').html('');
        try {
            $('#showCaptcha').append($('#GetCaptcha').contents().find('#imgCaptcha').live("click", RefreshCaptcah));
        } catch (e) {
            alert(e.message);
        }
    });

    $('#btnRefreshCaptcha,#spanShowCpatcha').live("click", RefreshCaptcah);

    $.each($('div[class*="dynamicDt"]'), function () {
        var $this = $(this);
        var d = new Date();
        for (var i = d.getFullYear(); i >= 1900; i--)
            $this.children('select:eq(0)').append("<option value='" + i + "' >" + i + "</option>");

        for (var i = 1; i <= 12; i++)
            $this.children('select:eq(1)').append("<option value='" + i + "' >" + i + "</option>");

        for (var i = 1; i <= 31; i++)
            $this.children('select:eq(2)').append("<option value='" + i + "' >" + i + "</option>");
        var SetDynamicDt = $this.html();
        $this.html(SetDynamicDt);
    });

    if (window.firstLoadCaptcha == null || window.firstLoadCaptcha == undefined) {
        window.firstLoadCaptcha = false;
        RefreshCaptcah();
    }

    $("select[id^='DeviceNumber']").change(function () {
        var sel = $(this).val();
        var Device_a = $(this).attr("id").replace("_0", "_a");
        switch (sel) {
            case "107":
                $("#" + Device_a).hide();
                break;
            case "106":
                $("#" + Device_a).show();
                break;
            case "104":
                $("#" + Device_a).hide();
                break;
        }
    });
    $("select[id^='DeviceNumber']").each(function () {
        var Device_a = $(this).attr("id").replace("_0", "_a");
        $("#" + Device_a).hide();
    });

    // 顯示提示文字
    $(".PermitListBody .ExampleText").hide();
    $(".PermitListBody input:text").focusin(function () {
        $(this).nextAll("span:hidden.ExampleText:eq(0)").text(GetExampleText($(this)));
        $(this).nextAll("span:hidden.ExampleText:eq(0)").show();
    });
    $(".PermitListBody input:text").focusout(function () {
        $(this).nextAll("span:visible.ExampleText:eq(0)").hide();
    });
    //在表單加上由cookie取得的tid及pid
    var arr1 = document.cookie.match(new RegExp("(^| )tid=([^;]*)(;|$)"));
    if (arr1 != null)
        $("#form1").append("<input type='hidden' name='tid' value='" + unescape(arr1[2]) + "' />");
    var arr2 = document.cookie.match(new RegExp("(^| )pid=([^;]*)(;|$)"));
    if (arr2 != null)
        $("#form1").append("<input type='hidden' name='pid' value='" + unescape(arr2[2]) + "' />");

});

function RefreshCaptcah() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 8;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    $('#spanShowCpatcha').children().remove();
    $('#spanShowCpatcha').append("<img src='" + $('#ValidImagePage').val() + "?refresh=" + randomstring + "' alt=''>");
}

function FormCheckAndSubmit() {
    var check = true;
    var obj;
    var msg = "";
    var multiCheck = {};

    $(".PermitListBody input:text:visible,.PermitListBody input:checkbox:visible,.PermitListBody select:visible").each(function () {

        if ($("#" + $(this).attr("id") + "_a:visible").length == 1) {
            if (strTrim($("#" + $(this).attr("id") + "_a:visible:eq(0)").val()) == "" && strTrim($(this).val()) != "") {
                check = false;
                msg = "請填寫區碼。";
                obj = $("#" + $(this).attr("id") + "_a:visible:eq(0)");
                return false;
            }
            else if (strTrim($("#" + $(this).attr("id") + "_a:visible:eq(0)").val()) != "" && strTrim($(this).val()) == "") {
                check = false;
                msg = "請填寫市話號碼。";
                obj = $(this);
                return false;
            }
        }
        if ($(this).hasClass("deviceSelect")) {
            if (strTrim($(this).val()) == "" &&
                (strTrim($("#" + $(this).attr("id").substring(0, $(this).attr("id").length - 2)).val()) != "" ||
                    ($("#" + $(this).attr("id").substring(0, $(this).attr("id").length - 2) + "_a:visible:eq(0)").length == 1 &&
                    strTrim($("#" + $(this).attr("id").substring(0, $(this).attr("id").length - 2) + "_a:visible:eq(0)").val()) != ""))) {
                check = false;
                msg = "請選擇設備類型。";
                obj = $(this);
                return false;
            }
            else if (strTrim($(this).val()) != "" &&
                    ($("#" + $(this).attr("id").substring(0, $(this).attr("id").length - 2) + "_a:visible:eq(0)").length == 1 &&
                    strTrim($("#" + $(this).attr("id").substring(0, $(this).attr("id").length - 2) + "_a:visible:eq(0)").val()) == "")) {
                check = false;
                msg = "請填寫區碼。";
                obj = $("#" + $(this).attr("id").substring(0, $(this).attr("id").length - 2) + "_a:visible:eq(0)");
                return false;
            }
            else if (strTrim($(this).val()) != "" && strTrim($("#" + $(this).attr("id").substring(0, $(this).attr("id").length - 2)).val()) == "") {
                check = false;
                msg = "請填寫設備號碼。";
                obj = $("#" + $(this).attr("id").substring(0, $(this).attr("id").length - 2));
                return false;
            }
        }
        if ($(this).hasClass("IsRequired")) {
            if ($(this).attr("type") == "text" || $(this).attr("type") == "select-one") {
                var attr = $(this).attr("id").split("-")[1];
                if (attr.indexOf("_a") > 0 && attr.length > 5) {
                    // 區碼且複合式欄位
                    attr = attr.split("_")[0];
                    //if ($(this).attr("id").split("-")[1].length > 3 && $(this).attr("id").charAt($(this).attr("id").length - 1) != 1) {
                    if (attr.charAt(attr.length - 1) != 1) {
                        if (strTrim($(this).val()) == "" && $(this).nextAll().length > 2 && $(this).is(":visible")) {
                            check = false;
                            msg = "欄位尚未填寫。";
                            obj = $(this);
                            return false;
                        }
                    }
                    else {
                        if (strTrim($(this).val()) == "") {
                            check = false;
                            msg = "欄位尚未填寫。";
                            obj = $(this);
                            return false;
                        }
                    }
                }
                else if (attr.indexOf("_a") < 0 && attr.length > 3) {
                    // 非區碼的複合式欄位
                    if (attr.charAt(attr.length - 1) != 1) {
                        if (strTrim($(this).val()) == "" && $(this).nextAll().length > 1 && $(this).is(":visible")) {
                            check = false;
                            msg = "欄位尚未填寫。";
                            obj = $(this);
                            return false;
                        }
                    }
                    else {
                        if (strTrim($(this).val()) == "") {
                            check = false;
                            msg = "欄位尚未填寫。";
                            obj = $(this);
                            return false;
                        }
                    }
                }
                else {
                    if (strTrim($(this).val()) == "") {
                        check = false;
                        msg = "欄位尚未填寫。";
                        obj = $(this);
                        return false;
                    }
                }
            }
            else {
                $(this).find("select").each(function () {
                    if (strTrim($(this).val()) == "") {
                        check = false;
                        msg = "欄位尚未填寫。";
                        obj = $(this);
                        return false;
                    }
                });
                if (!check)
                    return false;
            }
        }

        if ($(this).hasClass("checkEmail")) {
            if (!checkInput($(this), "108")) {
                check = false;
                msg = "請輸入正確的Email！";
                obj = $(this);
                return false;
            }
        }
        if ($(this).hasClass("checkMobile")) {
            if (!checkInput($(this), "107")) {
                check = false;
                msg = "請輸入正確的手機號碼！";
                obj = $(this);
                return false;
            }
        }
        if ($(this).hasClass("checkTelephone")) {
            if (!checkInput($(this), "106")) {
                check = false;
                msg = "請輸入正確的電話號碼！\n市話號碼須包含區碼，不需填寫任何符號。";
                obj = $(this);
                return false;
            }
        }
        if ($(this).hasClass("checkHN")) {
            if (!checkInput($(this), "104")) {
                check = false;
                msg = "請輸入正確的HN號碼！";
                obj = $(this);
                return false;
            }
        }
        if ($(this).is(":visible") && $(this).hasClass("checkDevice") && strTrim($(this).val()) != "") {
            var deviceType; //= $("#" + $(this).attr("id") + "_0").val().toLowerCase();
            if ($(this).attr("id").indexOf("_a") > 0)
                deviceType = $("#" + $(this).attr("id").substring(0, $(this).attr("id").length - 2) + "_0").val().toLowerCase();
            else
                deviceType = $("#" + $(this).attr("id") + "_0").val().toLowerCase();

            if (deviceType == "") {
                check = false;
                msg = "請選擇設備號碼類型！"
                obj = $(this);
                return false;
            }
            if (!checkInput($(this), deviceType)) {
                check = false;
                switch (deviceType) {
                    case "107":
                        msg = "請輸入正確的手機號碼！";
                        break;
                    case "106":
                        msg = "請輸入正確的電話號碼！\n市話號碼須包含區碼，不需填寫任何符號。";
                        break;
                    case "104":
                        msg = "請輸入正確的HN號碼！";
                        break;
                }
                obj = $(this);
                return false;
            }
        }
        if ($(this).hasClass("Multi") && $(this).attr("id").indexOf("_a") < 10) {
            var value = strTrim($(this).val());
            if ($("#" + $(this).attr("id") + "_a:visible").length == 1)
                value = value + strTrim($("#" + $(this).attr("id") + "_a:visible:eq(0)").val());
            if (value != "") {
                if (value in multiCheck) {
                    check = false;
                    msg = "不可填寫相同的資料！";
                    obj = $(this);
                    return false;
                }
                multiCheck[value] = value;
            }
        }
    });
    if (!check) {
        alert(msg);
        $(obj).focus();
        return false;
    }
    // clear
    $(".PermitListBody input:text:hidden,.PermitListBody input:checkbox:hidden,.PermitListBody select:hidden").each(function () {
        var ctype = $(this).attr("type");
        if (ctype == "text" || ctype == "select-one")
            $(this).val("");
        else if (ctype == "checkbox")
            $(this).prop("checked", false);
    });
    return check;
}

function strTrim(txt) {
    return txt.replace(/^\s+|\s+$/g, '');
}
//傳入值檢查
//function checkInput(txt, type) {
//    var re = "";
//    switch (type) {
//        case "108":
//        case "109":
//            re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
//            break;
//        case "107":
//            re = /^[0][9][0-9]{8}$/;
//            break;
//        case "106":
//            re = /^[0][2-8][0-9]{6,8}$/;
//            break;
//        case "104":
//            re = /^[0-9]{8}$/;
//            break;
//    }
//    if (txt != '' && !re.test(txt)) {
//        return false;
//    }
//    return true;
//}
//傳入物件檢查
function checkInput(obj, type) {
    var re = "";
    switch (type) {
        case "108":
        case "109":
            re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
            break;
        case "107":
            re = /^[0][9][0-9]{8}$/;
            break;
        case "106":
            if ($(obj).attr("id").indexOf("_a") > 10)
                re = /^[0](2|3|37|4|49|5|6|7|8|82|89|826|836)$/;
            else
                re = /^[0-9]{5,8}$/;
            break;
        case "104":
            re = /^[0-9]{8}$/;
            break;
    }
    if ($(obj).val() != '' && !re.test($(obj).val())) {
        return false;
    }
    return true;
}

//更新日期欄位下拉選項及設定Hidden值
function SetDateOnSelectChange($this, changeitem) {
    var monthDaysJson = { 'month1': 31, 'month2': 29, 'month3': 31, 'month4': 30, 'month5': 31, 'month6': 30, 'month7': 31, 'month8': 31, 'month9': 30, 'month10': 31, 'month11': 30, 'month12': 31 };
    var $year = $this.parent().children('select[id^="SelectYear_"]');
    var $month = $this.parent().children('select[id^="SelectMonth_"]');
    var $day = $this.parent().children('select[id^="SelectDay_"]');
    var $value = $this.parent().children('input[type="text"],input[type="hidden"]');

    switch (changeitem) {
        case 'month':   //切換月份時更新可選擇的日期項目
            var daysOfMonth = parseInt(eval('monthDaysJson.month' + $month.val()));
            for (var i = 28; i <= 31; i++) {
                var $effectItem = $day.children('[value="' + i + '"]');
                if (i > daysOfMonth)
                    $effectItem.remove();
                else {
                    if ($effectItem.length < 1) {
                        $day.append($('<option value="' + i + '" >' + i + '</option>'));
                    }
                }
            }
            break;
    }
    if ($this.parent().children('select[id^="Select"][value=""]').length <= 0) {
        $value.val($year.val() + '/' + $month.val() + '/' + $day.val());
        var myDate = new Date($value.val());
        //非潤年2/29 取Date 不是29而是會變成1 利用此特性來判斷是否有選則錯誤
        if (myDate.getDate() != $day.val()) {
            $day.val('');
            $value.val('');
        }
    } else {
        $value.val('');
    }
}

function addMultiCol(obj) {
    var trObj = $(obj).closest("tr");
    while ($(".Multi:visible").length < $(".Multi").length) {
        if ($(trObj).next().is(":hidden")) {
            $(trObj).next().show();
            break;
        }
        else
            trObj = $(trObj).next();
    }
}

function removeMultiCol(obj) {
    $(obj).closest("tr").hide();
}

function GetExampleText(obj) {
    var ttype = $(obj).attr("id").split("-")[1].substring(0, 3);
    var etext = "";
    switch (ttype) {
        case "101":
            etext = "ex. 王小明";
            break;
        case "102":
            etext = "ex. A223456789";
            break;
        case "103":
            etext = "ex. 22341234";
            break;
        case "104":
            etext = "ex. 12342234";
            break;
        case "105":
            etext = "ex. M12342234";
            break;
        case "106":
            etext = "ex. 02 23441234";
            break;
        case "107":
            etext = "ex. 0919123456";
            break;
        case "108":
        case "109":
            etext = "ex. email@msa.hinet.net";
            break;
        case "110":
        case "111":
            etext = "ex. 台北市信義路一段21號";
            break;
        case "112":
            etext = "ex. 12345678";
            break;
        case "113":
            etext = "ex. 12345678";
            break;
        case "114":
            etext = "ex. 9A12345";
            break;
        case "115":
            var deviceType;
            if ($(obj).attr("id").indexOf("_a") > 0)
                deviceType = $("#" + $(obj).attr("id").substring(0, $(obj).attr("id").length - 2) + "_0").val().toLowerCase();
            else
                deviceType = $("#" + $(obj).attr("id") + "_0").val().toLowerCase();
            if (deviceType == "107")
                etext = "ex. 0919123456";
            else if (deviceType == "106")
                etext = "ex. 02 23441234";
            else if (deviceType == "104")
                etext = "ex. 12342234";
            break;
    }
    return etext;
}
function showMask() {
    if ($("#maskBG").length == 0 && $("input[name='ActivityID']").length == 1) {
        $("#form1").append("<div id='maskBG' class='MaskDivBackground'></div><div id='maskLoading' class='MaskDivLoading'>表單送出中...</div>");
        $("#maskBG").show();
        $("#maskLoading").show();
    }
    else {
        $("#maskBG").show();
        $("#maskLoading").show();
        //document.getElementById("maskBG").style.display = "block";
        //document.getElementById("maskLoading").style.display = "block";
    }
}
function hideMask() {
    $("#maskBG").hide();
    $("#maskLoading").hide();
    //document.getElementById("maskBG").style.display = 'none';
    //document.getElementById("maskLoading").style.display = 'none';
}