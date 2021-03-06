$(function () { //Document Ready in Kurz

	//Deklaration und Initalisierung
	var rand;
	var classKarte;
	var classBild;
	var neurand;
	var aufgedeckt1;
	var aufgedeckt2;
	var thisName1;
	var thisName2;
	var id;
	var className;
	var firstClick = true;
	var start
	var time;
	var clickable = true;
	var aktuellesBild;
	var gewonnen = false;
	var Minutenerste;
	var Sekundenerste;
	var Minuten = 0;
	var Sekunden = 0;



	$("#gewonnen").hide();
	//Spielfeld generierung 
	$("#StartButton").click(function () {
		$(this).prop("disabled", "true");
		var back = [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
		var front = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];

		neurand = 20;
		for (var i = 1; i <= 20; i++) {
			rand = Math.floor((Math.random() * neurand) + 0);
			classKarte = "karte" + front[rand];
			front.splice(rand, 1);
			neurand--;
			classBild = "bild" + i;



			$("#Spielfeld").append("<div class='float-left ml-3 mt-3 card " + classKarte + "' id=" + i + "></div>");


		}
		for (var j = 0; j < 20; j++) {
			rand = Math.floor((Math.random() * 10) + 1);
			if (front.includes(rand, 0) == false) {
				for (var k = 0; k < 2; k++)
					front[j + k] = rand;
			}
		}


		//Anklicken von den Karten
		$(".card").click(function () {
			aktuellesBild = $(this).css("background-image");
			if (aktuellesBild.indexOf('rueckseite') !== -1) {
				className = $(this).attr('class');


				//Beim ersten Klick wird die Zeit gestoppt
				if (firstClick == true) {
					start = new Date();
					Minutenerste = start.getMinutes();
					Sekundenerste = start.getSeconds();
					firstClick = false;

				}

				switch (className) {
					case "float-left ml-3 mt-3 card karte1":
						$(this).css("background-image", "url(./bilder/1.png)");
						break;
					case "float-left ml-3 mt-3 card karte2":
						$(this).css("background-image", "url(./bilder/2.png)");
						break;
					case "float-left ml-3 mt-3 card karte3":
						$(this).css("background-image", "url(./bilder/3.png)");
						break;
					case "float-left ml-3 mt-3 card karte4":
						$(this).css("background-image", "url(./bilder/4.png)");
						break;
					case "float-left ml-3 mt-3 card karte5":
						$(this).css("background-image", "url(./bilder/5.png)");
						break;
					case "float-left ml-3 mt-3 card karte6":
						$(this).css("background-image", "url(./bilder/6.png)");
						break;
					case "float-left ml-3 mt-3 card karte7":
						$(this).css("background-image", "url(./bilder/7.png)");
						break;
					case "float-left ml-3 mt-3 card karte8":
						$(this).css("background-image", "url(./bilder/8.png)");
						break;
					case "float-left ml-3 mt-3 card karte9":
						$(this).css("background-image", "url(./bilder/9.png)");
						break;
					case "float-left ml-3 mt-3 card karte10":
						$(this).css("background-image", "url(./bilder/10.png)");
						break;

				}
				//Wenn noch keine Karte aufgedeckt wurde, wird aufgedeckt1 zur aktuellen Karte
				if (aufgedeckt1 == null) { 
					aufgedeckt1 = className; 
					thisName1 = this;
				}
				else {
					aufgedeckt2 = className;
					thisName2 = this;
					prüfen(); //sobald zwei Karten aufgedeckt wurden, wird auf deren gleichheit geprüft
				}
			}






		});
		//Hier wird geprüft ob beide aufgedckten Karten gleich sind
		function prüfen() {

			//gleichheit der Karten wird geprüft
			if (aufgedeckt1 == aufgedeckt2) { //Wenn beide gleich sind werden sie disabled und in das Array schonGelöst gepusht
				$(thisName1).prop("disabled", true);
				$(thisName2).prop("disabled", true);

			}
			else {
				$(thisName1).css("background-image", "url(./bilder/rueckseite.png)"); //Wenn Sie nicht gleich sind werden sie wieder verdeckt
				$(thisName2).css("background-image", "url(./bilder/rueckseite.png)");
			}

			aufgedeckt1 = null;
			aufgedeckt2 = null;
			var tempbild;

			//Hier wird gepürft ob es noch Karten mit der Rückseite gibt, wenn nicht hat man gewonnen 
			for (var i = 1; i <= 20; i++) {
				tempbild = $("#" + i);
				if (tempbild.css("background-image").indexOf('rueckseite') !== -1) {
					gewonnen = false;
					break;
				}
				else gewonnen = true;

			}

			if (gewonnen == true) {
				zeitermitteln();
				$(this).prop("disabled", "false");

			}
		}

	});

	//Hier wird die Zeit ermittelt 
	function zeitermitteln() {
		time = new Date();
		Sekunden = Math.abs(time - start);
		var zeitinsec = (Sekunden / 1000)
		var zeitinmin = Math.floor(zeitinsec / 60)
		zeitinsec = zeitinsec - (zeitinmin * 60)
		$("#gewonnen").show();
		$("#gewonnen").append("Zeit: " + zeitinmin + " Minuten "+ zeitinsec +" Sekunden");

	}

	//Seite Neu Laden
	$("#ResetButton").click(function () {
		location.reload();
	});
	$("#gewonnenButton").click(function () {
		location.reload();
	});

});
