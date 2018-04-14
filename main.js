$(function () { //Document Ready in Kurz

    var RandomStartReaktion = Math.floor((Math.random() * 3000));

    function KreisChangeColor() {
        $("#ReaktionsKreis").css("background-color", "rgb(255, 0, 0)");
    }

    $("#StartButton").click(function () {
        setTimeout(KreisChangeColor, RandomStartReaktion);
        $("#Zeiten").text(RandomStartReaktion);


        $("#ReaktionsKreis").click(function () {
            var color = $("#ReaktionsKreis").css('background-color');

            if (color == "rgb(255, 0, 0)") {
                alert("NICE!");
            }
            if (color != "rgb(255, 0, 0)") {
                alert("Zu Früh!");
            }
        });


    });





});










