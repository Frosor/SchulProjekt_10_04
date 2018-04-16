$(function () { //Document Ready in Kurz

    var schwierigkeit = 1;
    var Kreis;

    var spielfeld_leicht = '<div style="top:50px;" class="ReaktionsKreis mx-auto" id="ReaktionsKreis0"></div>';
    var spielfeld_normal = '<div id="wrapper"><div class="m-1 ReaktionsKreis2" id="ReaktionsKreis1"></div> <div class="m-1 ReaktionsKreis2" id="ReaktionsKreis2"></div>	<div class="m-1 ReaktionsKreis2" id="ReaktionsKreis3"></div> <div class="m-1 ReaktionsKreis2" id="ReaktionsKreis4"></div></div>';
    var spielfeld_schwer = '<div> Schwer Test Omg lul</div>';

    var Trys = 0;

    //Kreise Entfernen die sich im Speilfeld befinden
    function KreiseEntfernen() {
        $("#Spielfeld").empty();
    }

    //Div Container Removen; So werden immer die letzen 10 Versuche angezeigt
    function ZeitRemove() {
        var idremove = "zeit_div_" + (Trys - 10);
        if (Trys >= 11) //Div Removen
            $('#' + idremove).remove();
    }

    //Farbe des Kreises ändern
    function KreisChangeColor() {
        $(Kreis).css("background-color", "rgb(255, 255, 0)");
    }

    function ReaktionMessen() {
        if (schwierigkeit == 1) {
            Kreis = "#ReaktionsKreis0";
        }

        if (schwierigkeit == 2) {
            var randomKreis = Math.floor((Math.random() * 4) + 1);
            Kreis = "#ReaktionsKreis" + randomKreis;
        }


        //Start Button & Neuer Versuch Button disabln bis man in den Kreis geklickt hat.
        $(this).off();
        $("#NeuerVersuch").prop("disabled", true);

        //Random Start Zeit nach Drücken des Start Buttons zwischen 1-4 Sekunden
        do {
            var RandomStartReaktion = Math.floor((Math.random() * 4000));
        } while (RandomStartReaktion < 1000)

        //Genaue Zeit in ms andem die Farbe sich ändert
        var ms = new Date().getTime() + RandomStartReaktion;

        //Farbe des Kreies ändern Nach Randomzeit zw. 1-4 Sekunden; In Varibale damit man diesen TimeOut später manuell stoppen kann
        var Timer = setTimeout(KreisChangeColor, RandomStartReaktion);

        Trys++;

        $(Kreis).one("click", function () {
            //Aktuelle Farbe des Kreises am Moment des Klicks in eine Varibale speichern
            var color = $(Kreis).css('background-color');

            if (color == "rgb(255, 255, 0)") {
                //Zeit in MS in die Zeiten Box; jewaliges div mit einer ID versehen damit man ein einzeln löschen kann wenn es zu viele werden
                var id = "zeit_div_" + Trys;
                $("#Zeiten").prepend("<div id=" + id + "> " + Trys + ". " + (new Date().getTime() - ms) + " ms. </div>");
            }
            if (color != "rgb(255, 255, 0)") {
                var id = "zeit_div_" + Trys;
                $("#Zeiten").prepend("<div id=" + id + "> " + Trys + ". <b> Zu Früh! </b > <br></div>");
                //setTimeOut Stoppen
                clearTimeout(Timer);
            }
            ZeitRemove();
            //Neuer Verusuch Button wieder aktivieren
            $("#NeuerVersuch").prop("disabled", false);
        });
    }

    //SchwierigkeitsButtons, Farbe ändern wenn Aktiv / Nicht Aktiv
    function Schwierigkeiten_Button_On_Off(event, An1, An2) {
        $("#" + event.data.schwierigkeit).off();
        $("#" + An1).on("click", { schwierigkeit: "" + An1 }, Spielfeld_Erstellen);
        $("#" + An2).on("click", { schwierigkeit: "" + An2 }, Spielfeld_Erstellen);

        $("#" + event.data.schwierigkeit).addClass("Not_Active_Button").removeClass("Active_Button");
        $(".Not_Active_Button").removeClass("btn-outline-dark").addClass("btn-dark");
        $(".Active_Button").removeClass("btn-dark").addClass("btn-outline-dark");
        $("#" + An1).addClass("Active_Button").removeClass("Not_Active_Button");
        $("#" + An2).addClass("Active_Button").removeClass("Not_Active_Button");

        $("#StartButton").on("click", ReaktionMessen);
    }

    //Erstellung des Jewaligen Spielfeldes, Je nach Schwierigkeit
    function Spielfeld_Erstellen(event) {
        if (event.data.schwierigkeit == "Leicht") {
            schwierigkeit = 1;
            spielfeld_aktuell = spielfeld_leicht;
            Schwierigkeiten_Button_On_Off(event, "Normal", "Schwer");
        }
        else if (event.data.schwierigkeit == "Normal") {
            schwierigkeit = 2;
            spielfeld_aktuell = spielfeld_normal;
            Schwierigkeiten_Button_On_Off(event, "Leicht", "Schwer");
        }
        else if (event.data.schwierigkeit == "Schwer") {
            schwierigkeit = 3;
            spielfeld_aktuell = spielfeld_schwer;
            Schwierigkeiten_Button_On_Off(event, "Normal", "Leicht");
        }

        KreiseEntfernen();
        $("#Spielfeld").append(spielfeld_aktuell);
        $("#Zeiten").empty();
        Trys = 0;
    }


    //Schwierigkeitsbuttons Mit der Funkton Belegen
    $("#Leicht").on("click", { schwierigkeit: "Leicht" }, Spielfeld_Erstellen);
    $("#Normal").on("click", { schwierigkeit: "Normal" }, Spielfeld_Erstellen);
    $("#Schwer").on("click", { schwierigkeit: "Schwer" }, Spielfeld_Erstellen);

    //Funktion auf den StartButton Legen // Initialzustand des Buttons festlegen / Inital, keine Funktion
    $("#StartButton").off();

    //Start Button wieder Aktivierern + Farbe des Kreises wieder auf ursprung
    $("#NeuerVersuch").click(function () {
        $("#StartButton").on("click", ReaktionMessen);
        $(Kreis).css("background-color", "rgb(85, 85, 85)");
    });

    //Seite Neu Laden
    $("#ResetButton").click(function () {
        location.reload();
    });
});










