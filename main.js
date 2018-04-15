$(function () { //Document Ready in Kurz

    var Trys = 0;

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

        //Div Container Removen; So werden immer die letzen 10 Versuche angezeigt
        function DivRemove() {
            var idremove = "zeit_div_" + (Trys - 10);
            if (Trys >= 11) //Div Removen
                $('#' + idremove).remove();
        }

        //Farbe des Kreies ändern Nach Randomzeit zw. 1-4 Sekunden; In Varibale damit man diesen TimeOut später manuell stoppen kann
        var Timer = setTimeout(KreisChangeColor, RandomStartReaktion);

        //Genaue Zeit in ms andem die Farbe sich ändert
        var ms = new Date().getTime() + RandomStartReaktion;

        Trys++;

        $("#ReaktionsKreis").one("click", function () {
            //Aktuelle Farbe des Kreises am Moment des Klicks in eine Varibale speichern
            var color = $("#ReaktionsKreis").css('background-color');

            if (color == "rgb(255, 0, 0)") {
                DivRemove;
                //Zeit in MS in die Zeiten Box; jewaliges div mit einer ID versehen damit man ein einzeln löschen kann wenn es zu viele werden
                var id = "zeit_div_" + Trys;
                $("#Zeiten").prepend("<div id=" + id + "> " + Trys + ". " + (new Date().getTime() - ms) + " ms. </div>");
            }
            if (color != "rgb(255, 0, 0)") {
                DivRemove;
                var id = "zeit_div_" + Trys;
                $("#Zeiten").prepend("<div id=" + id + "> " + Trys + ". <b> Zu Früh! </b > <br></div>");
                //setTimeOut Stoppen
                clearTimeout(Timer);
            }
            //Neuer Verusuch Button wieder aktivieren
            $("#NeuerVersuch").prop("disabled", false);
        });
    }



    $("#StartButton").click(ReaktionMessen);

    //Start Button wieder Aktivierern + Farbe des Kreises wieder auf ursprung
    $("#NeuerVersuch").click(function () {
        $("#StartButton").prop("disabled", false);
        $("#ReaktionsKreis").css("background-color", "rgb(85, 85, 85)");
    });

    //Seite Neu Laden
    $("#ResetButton").click(function () {
        location.reload();
    });
});










