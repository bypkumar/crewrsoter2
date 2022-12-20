var applicationUrl;

$(document).ready(function (event) {
    applicationUrl = $("#applicationPath").val();

    console.log("on load")
    $("#overlay").hide();

});


$(document).keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {

        var username = $("#username").val();
        var password = $("#password").val();
        var ecn = $("#ecn").val();

        if (username == "" || username == null) {
            alert('Enter Username..!')
            return false;
        }

        if (password == "" || password == null) {
            alert('Enter Password..!')
            return false;
        }

        //if (ecn == "" || ecn == null) {
        //    alert('Enter ECN No.')
        //    return false;
        //}

        $("#overlay").show();
        $.ajax({
            type: 'POST',
            url: applicationUrl + "User/submitLogin",
            dataType: 'json',
            data: {
                username: function () { return $("#username").val(); },
                password: function () { return $("#password").val(); },
                ecn: function () { return 123; },
            },
            success: function (data) {
                var res = JSON.parse(data)
                console.log("res", data)
                if (res.status == true) {
                    window.location.href = applicationUrl + "Dashboard/Index";
                    //alert(res.message)
                } else {
                    alert(res.message)
                }

            },
            complete: function () {
                $("#overlay").hide();
            },
            error: function (ex) {
                alert('Failed to retrieve Sector : ' + ex);
            }
        });
    }
});


$("#loginSubmit").click(function () {


    var username = $("#username").val();
    var password = $("#password").val();
    var ecn = $("#ecn").val();

    if (username == "" || username == null) {
        alert('Enter Username..!')
        return false;
    }

    if (password == "" || password == null) {
        alert('Enter Password..!')
        return false;
    }

    //if (ecn == "" || ecn == null) {
    //    alert('Enter ECN No.')
    //    return false;
    //}

    $("#overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "User/submitLogin",
        dataType: 'json',
        data: {
            username: function () { return $("#username").val(); },
            password: function () { return $("#password").val(); },
            ecn: function () { return 123; },
        },
        success: function (data) {
            var res = JSON.parse(data)
            console.log("res", data)
            if (res.status == true) {
                window.location.href = applicationUrl + "Dashboard/Index";
                //alert(res.message)
            } else {
                alert(res.message)
            }

        },
        complete: function () {
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });
});
