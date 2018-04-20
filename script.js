$(function () { //Document Ready in Kurz
    var numbers = [];
    var numberasign;
    var numberasign_bool = true;
    var rand
    var click = 0;

    $("#StartButton").prop("disabled", true);
    //Console // Inspector Deactivieren; Unterbindet das untersuchen und somit das rausfinden der ID´s der Elemente
    //so kann man also nicht mehr schummeln
    function byebyeConsole() {
        $(document).keydown(function (e) {
            if (e.which === 123) {
                return false;
            }
        });
        $(document).bind("contextmenu", function (e) {
            e.preventDefault();
        });
    }

    byebyeConsole();

    //Erstellen des Spielfeldes mit 9 Elementen, und zufälliger Reihenfolge
    function SpielfeldErzeugen() {
        for (var i = 0; i < 9; i++) {
            numberasign_bool = true;
            do {
                rand = Math.floor((Math.random() * 9) + 1);
                // console.log("g. " + rand);
                if (numbers.lenght == 0) {
                    numbers[i] = rand;
                }
                //Überprüfung ob die Gezogene Zahl schon im Array vorhanden ist
                else if (numbers.includes(rand, 0) == false) {
                    numberasign_bool = false;
                    numbers[i] = rand;
                }
            } while (numberasign_bool == true)
            $("#Spielfeld").append("<div class='Spielelement float-left text-light display-1 p-4' id='Spielelement_" + numbers[i] + "'>" + numbers[i] + "</div>");
        }
    }

    //Zahlen hiden
    function HideZahlen() {
        $(".Spielelement").text(" ");
        $(".Spielelement").click(ClickEz);
    }

    function ClickEz() {
        click++;
        if ($(this).attr('id') == "Spielelement_" + click) {
            $(this).css("background-color", "green");
            if (click == 9) {
                Spielfeld_leeren();
                $("#Spielfeld").append("<div class='Gewonnen display-1'> Gewonnen </div>");
            }
        }
        else {
            Spielfeld_leeren();
            $("#Spielfeld").append("<div class='Verloren display-1'> Leider Verloren </div>");
        }
    }

    function Zeiten_Button_On_Off(Aus, An1, An2) {
        //Klassen der Buttons ändern, sodass der Angeklicke seine Farbe zum "btn-dark" ändert
        $("#" + Aus).addClass("btn-dark").removeClass("btn-outline-dark");
        $("#" + An1).addClass("btn-outline-dark").removeClass("btn-dark");
        $("#" + An2).addClass("btn-outline-dark").removeClass("btn-dark");
        $("#StartButton").prop("disabled", false);
    }

    function Spielfeld_leeren() {
        $("#Spielfeld").empty();
    }

    function Start() {
        Spielfeld_leeren();
        $("#StartButton").off();
        SpielfeldErzeugen();
        setTimeout(HideZahlen, Zeit);
    }

    $("#StartButton").one("click", Start);

    $("#ResetButton").click(function () {
        location.reload(true);
    });

    $("#1_Sekunde").click(function () {
        Zeit = 1000;
        Zeiten_Button_On_Off("1_Sekunde", "1_5_Sekunde", "2_Sekunde");
    });
    $("#1_5_Sekunde").click(function () {
        Zeit = 1500;
        Zeiten_Button_On_Off("1_5_Sekunde", "1_Sekunde", "2_Sekunde");
    });
    $("#2_Sekunde").click(function () {
        Zeit = 2000;
        Zeiten_Button_On_Off("2_Sekunde", "1_5_Sekunde", "1_Sekunde");
    });
});