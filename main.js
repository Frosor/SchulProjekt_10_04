$(function () { //Document Ready in Kurz

    var schwierigkeit = 1;
    var Kreis;

    var Trys = 0;

    $("#Leicht").prop("disabled", true);

    function ReaktionMessen() {
        if (schwierigkeit == 1) {
            Kreis = "#ReaktionsKreis0";
        }

        if (schwierigkeit == 2) {
            var randomKreis = Math.floor((Math.random() * 4) + 1);
            Kreis = "#ReaktionsKreis" + randomKreis;
        }
        //Start Button & Neuer Versuch Button disabln bis man in den Kreis geklickt hat.
        $(this).prop("disabled", true);
        $("#NeuerVersuch").prop("disabled", true);

        //Random Start Zeit nach Drücken des Start Buttons zwischen 1-4 Sekunden
        do {
            var RandomStartReaktion = Math.floor((Math.random() * 4000));
        } while (RandomStartReaktion < 1000)

        //Farbe des Kreises ändern
        function KreisChangeColor() {
            $(Kreis).css("background-color", "rgb(255, 255, 0)");
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

        $(Kreis).one("click", function () {
            //Aktuelle Farbe des Kreises am Moment des Klicks in eine Varibale speichern
            var color = $(Kreis).css('background-color');

            if (color == "rgb(255, 255, 0)") {
                DivRemove();
                //Zeit in MS in die Zeiten Box; jewaliges div mit einer ID versehen damit man ein einzeln löschen kann wenn es zu viele werden
                var id = "zeit_div_" + Trys;
                $("#Zeiten").prepend("<div id=" + id + "> " + Trys + ". " + (new Date().getTime() - ms) + " ms. </div>");
            }
            if (color != "rgb(255, 255, 0)") {
                DivRemove();
                var id = "zeit_div_" + Trys;
                $("#Zeiten").prepend("<div id=" + id + "> " + Trys + ". <b> Zu Früh! </b > <br></div>");
                //setTimeOut Stoppen
                clearTimeout(Timer);
            }
            //Neuer Verusuch Button wieder aktivieren
            $("#NeuerVersuch").prop("disabled", false);
        });
    }

    $('#Normal').click(function () {
        schwierigkeit = 2;

        //erstellt 4 neue Kreise mit IDs und fügt diese dem Spielfeld an
        var KreiseNormal = '<div class="row"><div class="ReaktionsKreis2" id="ReaktionsKreis1"></div> <div class="ReaktionsKreis2" id="ReaktionsKreis2"></div></div>	<div class="row" style="margin: 0 auto;"><div class="ReaktionsKreis2" id="ReaktionsKreis3"></div> <div class="ReaktionsKreis2" id="ReaktionsKreis4"></div></div>';
        $("#ReaktionsKreis0").remove();
        $("#Spielfeld").append(KreiseNormal);


        //blockt aktuellen Knopf und entsperrt andere Schwierigkeiten
        $(this).prop("disabled", true);
        $("#Leicht").prop("disabled", false);
        $("#Schwer").prop("disabled", false);
        $("#StartButton").prop("disabled", false);
        //leert Zeiten und setzt Versuche zurück 
        $("#Zeiten").empty();
        Trys = 0;
    });

    $('#Leicht').click(function () {
        schwierigkeit = 1;

        //entfernt alle Kreise von Normal
        $("#ReaktionsKreis1").remove();
        $("#ReaktionsKreis2").remove();
        $("#ReaktionsKreis3").remove();
        $("#ReaktionsKreis4").remove();
        //erstellt neuen Kreis für Einfach
        var ReaktionsKreis0 = '<div style="top:50px;" class="ReaktionsKreis mx-auto" id="ReaktionsKreis0"></div>';
        $("#Spielfeld").append(ReaktionsKreis0);

        //blockt aktuellen Knopf und entsperrt andere Schwierigkeiten
        $(this).prop("disabled", true);
        $("#Normal").prop("disabled", false);
        $("#Schwer").prop("disabled", false);
        $("#StartButton").prop("disabled", false);

        //leert Zeiten und setzt Versuche zurück 
        $("#Zeiten").empty();
        Trys = 0;
    });

    $('#Schwer').click(function () {
        schwierigkeit = 3;

        //blockt aktuellen Knopf und entsperrt andere Schwierigkeiten
        $(this).prop("disabled", true);
        $("#Normal").prop("disabled", false);
        $("#Leicht").prop("disabled", false);
        $("#StartButton").prop("disabled", false);

        //leert Zeiten und setzt Versuche zurück
        $("#Zeiten").empty();
        Trys = 0;
    });


    $("#StartButton").click(ReaktionMessen);

    //Start Button wieder Aktivierern + Farbe des Kreises wieder auf ursprung
    $("#NeuerVersuch").click(function () {
        $("#StartButton").prop("disabled", false);
        $(Kreis).css("background-color", "rgb(85, 85, 85)");
    });

    //Seite Neu Laden
    $("#ResetButton").click(function () {
        location.reload();
    });
});










