$(function () {
//Deklration und Initialisierung 
	var playercounter = 0;
	var farbe1;
	var farbe2;
	var farbe3;
	var farbe4;
	var farbe5;
	var farbe6;
	var farbe7;
	var farbe8;
	var farbe9;
	var gewonnen = false;
	var aktuellefarbe;

	//Für das anklicken der Felder
	$(".feld").one("click", function () {
		if (gewonnen != true) {
			if (playercounter % 2 == 0) {
				$("#Zeiten").text("Player 2 (Gelb) ist an der Reihe.");
				$(this).css("background-color", "green");
				aktuellefarbe = "rgb(0, 128, 0)";
				checkWin();
				playercounter++
			}
			else {
				$("#Zeiten").text("Player 1 (Gruen) ist an der Reihe.");
				$(this).css("background-color", "yellow");
				aktuellefarbe = "rgb(255, 255, 0)";
				checkWin();
				playercounter++
			}
		}

	});
	//Hier wird der gecheckt ob jemand gewonnen hat
	function checkWin() {
		farbe1 = $("#1").css('background-color');
		farbe2 = $("#2").css('background-color');
		farbe3 = $("#3").css('background-color');
		farbe4 = $("#4").css('background-color');
		farbe5 = $("#5").css('background-color');
		farbe6 = $("#6").css('background-color');
		farbe7 = $("#7").css('background-color');
		farbe8 = $("#8").css('background-color');
		farbe9 = $("#9").css('background-color');


		if (farbe1 == aktuellefarbe && farbe2 == aktuellefarbe && farbe3 == aktuellefarbe) {
			gewinner();
		}
		if (farbe4 == aktuellefarbe && farbe5 == aktuellefarbe && farbe6 == aktuellefarbe) {
			gewinner();
		}
		if (farbe7 == aktuellefarbe && farbe8 == aktuellefarbe && farbe9 == aktuellefarbe) {
			gewinner();
		}
		if (farbe1 == aktuellefarbe && farbe4 == aktuellefarbe && farbe7 == aktuellefarbe) {
			gewinner();
		}
		if (farbe2 == aktuellefarbe && farbe5 == aktuellefarbe && farbe8 == aktuellefarbe) {
			gewinner();
		}
		if (farbe3 == aktuellefarbe && farbe6 == aktuellefarbe && farbe9 == aktuellefarbe) {
			gewinner();
		}
		if (farbe7 == aktuellefarbe && farbe5 == aktuellefarbe && farbe3 == aktuellefarbe) {
			gewinner();
		}
		if (farbe1 == aktuellefarbe && farbe5 == aktuellefarbe && farbe9 == aktuellefarbe) {
			gewinner();
		}
	}
	//Der Gewinner wird ausgegeben
	function gewinner() {
		if (aktuellefarbe == "rgb(0, 128, 0)" && gewonnen == false) {
			alert("Gruen hat gewonnen!")
			gewonnen = true;
		}
		else {
			alert("Gelb hat gewonnen!")
			gewonnen = true;
		}
		location.reload();
	}
});