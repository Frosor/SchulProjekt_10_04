$(function () { //Document Ready in Kurz

    function ReaktionMessen() {
        //Start Button & Neuer Versuch Button disabln bis man in den Kreis geklickt hat.
        $(this).prop("disabled", true);
        $("#NeuerVersuch").prop("disabled", true);

        //Random Start Zeit nach Drücken des Start Buttons zwischen 1-4 Sekunden
        do {
            var RandomStartReaktion = Math.floor((Math.random() * 4000));
        } while (RandomStartReaktion < 1000)

        //Farbe des Kreises ändern
        function KreisChangeColor() {
            $("#ReaktionsKreis").css("background-color", "rgb(255, 0, 0)");
        }

        //Farbe des Kreies ändern Nach Randomzeit zw. 1-4 Sekunden
        setTimeout(KreisChangeColor, RandomStartReaktion);

        //Genaue Zeit in ms andem die Farbe sich ändert
        var ms = new Date().getTime() + RandomStartReaktion;

        $("#ReaktionsKreis").one("click", function () {
            //Aktuelle Farbe des Kreises am Moment des Klicks in eine Varibale speichern
            var color = $("#ReaktionsKreis").css('background-color');

            if (color == "rgb(255, 0, 0)") {
                //alert(ms - new Date().getTime());
                //
                //Zeit in MS in die Zeiten Box
                $("#Zeiten").append("<div> " + -1 * (ms - new Date().getTime()) + "ms. </div>");
                $("#NeuerVersuch").prop("disabled", false);
            }
            if (color != "rgb(255, 0, 0)") {
                //alert("Zu Früh!");
                $("#Zeiten").append("<div><b> Zu Früh! </b> <br></div>");
                $("#NeuerVersuch").prop("disabled", false);
            }
        });

    }




    $("#StartButton").click(ReaktionMessen);

    // Klappt nocht nicht so richtig
    $("#NeuerVersuch").click(function () {
        $("#StartButton").prop("disabled", false);
        $("#ReaktionsKreis").css("background-color", "rgb(85, 85, 85)");
    });


    //Seite Neu Laden
    $("#ResetButton").click(function () {
        location.reload();
    });

});










