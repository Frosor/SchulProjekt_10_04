$(function () { //Document Ready in Kurz

    var Kreis;
    var Schwierigkeit_;
    var Trys;
    var spam = true;
    var toptime = 0;
    $("#NeuerVersuch").prop("disabled", true);
    $("#StartButton").prop("disabled", true);
    var spielfeld_leicht = '<div style="top:50px;" class="ReaktionsKreis mx-auto Kreis" id="ReaktionsKreis0"></div>';
    var spielfeld_normal = '<div class="wrapper"><div class="ReaktionsKreis2 Kreis" id="ReaktionsKreis1"></div> <div class="ReaktionsKreis2 Kreis" id="ReaktionsKreis2"></div>	<div class="ReaktionsKreis2 Kreis" id="ReaktionsKreis3"></div> <div class="ReaktionsKreis2 Kreis" id="ReaktionsKreis4"></div></div>';
    var spielfeld_schwer = '<div class="wrapper"><div class="ReaktionsKreis3 Kreis" id="ReaktionsKreis5"></div> <div class="ReaktionsKreis3 Kreis" id="ReaktionsKreis6"></div>	<div class="ReaktionsKreis3 Kreis" id="ReaktionsKreis7"></div> <div class="ReaktionsKreis3 Kreis" id="ReaktionsKreis8"></div><div class="ReaktionsKreis3 Kreis" id="ReaktionsKreis9"></div> <div class="ReaktionsKreis3 Kreis" id="ReaktionsKreis10"></div>	<div class="ReaktionsKreis3 Kreis" id="ReaktionsKreis11"></div> <div class="ReaktionsKreis3 Kreis" id="ReaktionsKreis12"></div><div class="ReaktionsKreis3 Kreis" id="ReaktionsKreis13"></div></div>';

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
        if (Schwierigkeit_ == "Leicht") {
            Kreis = "#ReaktionsKreis0";
        }

        if (Schwierigkeit_ == "Normal") {
            var randomKreis = Math.floor((Math.random() * 4) + 1);
            Kreis = "#ReaktionsKreis" + randomKreis;
        }

        if (Schwierigkeit_ == "Schwer") {
            var randomKreis = Math.floor(Math.random() * (13 - 5 + 1)) + 5;
            Kreis = "#ReaktionsKreis" + randomKreis;
        }

        //Start Button & Neuer Versuch Button disabln bis man in den Kreis geklickt hat.
        $(this).off();
        $(this).prop("disabled", true);
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

        $(".Kreis").one("click", function () {

            //Aktuelle Farbe des Kreises am Moment des Klicks in eine Varibale speichern
            var color = $(this).css('background-color');
            //Mehrfach klicken auch auf andere Kreise verhindern (Normal, Schwer)
            $(".Kreis").off();
            if (color == "rgb(255, 255, 0)") {

                //Zeit des aktuellen Versuches und ID zur akutellen Zeit
                var id = "zeit_div_" + Trys;
                // Standard Abweichung (25), durch div. Aufrufe 
                var time = new Date().getTime() - ms - 25;

                //berechnet Best-Zeit, wenn nicht vorhanden wird Best-Zeit als aktuelle zeit gesetzt 
                if (toptime > time || toptime == 0) {
                    toptime = time;
                    $("#tt").empty();
                    $("#bottom").prepend("<div id='tt'>" + toptime + " ms.</div>");

                }
                //Zeit in MS in die Zeiten Box; jewaliges div mit einer ID versehen damit man ein einzeln löschen kann wenn es zu viele werden
                $("#Zeiten").prepend("<div id=" + id + "> " + Trys + ". " + time + " ms. </div>");
                //Best-Zeit header in die Zeiten Box, Best-Zeit in MS in inhalt box
                $("#Zeiten").prepend("<h5 id='toptime'> Best-Zeit: </h5>");

            }
            if (color != "rgb(255, 255, 0)") {
                var id = "zeit_div_" + Trys;
                $("#Zeiten").prepend("<div id=" + id + "> " + Trys + ". <b> Falsch! </b > <br></div>");
            }
            //setTimeOut Stoppen
            clearTimeout(Timer);
            ZeitRemove();
            spam = true;
            //Neuer Verusuch Button wieder aktivieren
            $("#NeuerVersuch").prop("disabled", false);
        });
    }

    //SchwierigkeitsButtons, Farbe ändern wenn Aktiv / Nicht Aktiv
    function Schwierigkeiten_Button_On_Off(event, An1, An2) {
        //Aktuellen Button, alle Handles entfernen // Beide anderen Buttons click handle wieder drauf setzen
        $("#" + event.data.schwierigkeit).off();
        $("#" + An1).on("click", { schwierigkeit: "" + An1 }, Spielfeld_Erstellen);
        $("#" + An2).on("click", { schwierigkeit: "" + An2 }, Spielfeld_Erstellen);

        //Klassen der Buttons ändern, sodass der Angeklicke seine Farbe zum "btn-dark" ändert
        $("#" + event.data.schwierigkeit).addClass("Not_Active_Button").removeClass("Active_Button");
        $(".Not_Active_Button").removeClass("btn-outline-dark").addClass("btn-dark");
        $(".Active_Button").removeClass("btn-dark").addClass("btn-outline-dark");
        $("#" + An1).addClass("Active_Button").removeClass("Not_Active_Button");
        $("#" + An2).addClass("Active_Button").removeClass("Not_Active_Button");

        //StartButton "zurück" setzen, Alle Handles entfernen, und das neue Aktuelle click handle wieder drauf setzen
        $("#StartButton").off();
        $("#StartButton").on("click", ReaktionMessen);
    }

    //Erstellung des Jewaligen Spielfeldes, Je nach Schwierigkeit
    function Spielfeld_Erstellen(event) {
        if (event.data.schwierigkeit == "Leicht") {
            spielfeld_aktuell = spielfeld_leicht;
            //Aktuelle Schwierigkeit des geklickten Buttons via event.data
            Schwierigkeit_ = event.data.schwierigkeit;
            Schwierigkeiten_Button_On_Off(event, "Normal", "Schwer");
        }
        else if (event.data.schwierigkeit == "Normal") {
            spielfeld_aktuell = spielfeld_normal;
            Schwierigkeit_ = event.data.schwierigkeit;
            Schwierigkeiten_Button_On_Off(event, "Leicht", "Schwer");
        }
        else if (event.data.schwierigkeit == "Schwer") {
            spielfeld_aktuell = spielfeld_schwer;
            Schwierigkeit_ = event.data.schwierigkeit;
            Schwierigkeiten_Button_On_Off(event, "Normal", "Leicht");
        }
        KreiseEntfernen();
        $("#Spielfeld").append(spielfeld_aktuell);
        //beim Wechsel von Schwierigkeit Zeiten, Versuche und Best-Zeit entfernen
        $("#Zeiten").empty();
        $("#tt").empty();
        $("#NeuerVersuch").prop("disabled", true);
        $("#StartButton").prop("disabled", false);
        toptime = 0;
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
        $(this).prop("disabled", true);
        $("#StartButton").prop("disabled", false);
        if (spam == true) {
            $("#StartButton").on("click", ReaktionMessen);
            $(Kreis).css("background-color", "rgb(85, 85, 85)");
            spam = false;
        }
    });

    //$("#StartButton").click, ReaktionMessen);

    //Seite Neu Laden
    $("#ResetButton").click(function () {
        location.reload();
    });
});
