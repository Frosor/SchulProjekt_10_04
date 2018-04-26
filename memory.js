$(function () { //Document Ready in Kurz
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
var schonGelöst = [];
var clickable = true;
var aktuellesBild;
var gewonnen = false;
var Minutenerste;
var Sekundenerste;
var Minuten = 0;
var Sekunden = 0;



$("#gewonnen").hide();
    $("#StartButton").click( function () {
		$(this).prop("disabled", "true");
		var back = [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18 ,19 , 20];
		var front = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];

		neurand = 20;
        for (var i = 1; i <= 20; i++) {
			rand = Math.floor((Math.random() * neurand) + 0);
				classKarte = "karte" + front[rand];
				front.splice(rand, 1);
				neurand--;
				classBild = "bild" + i;


			
			$("#Spielfeld").append("<div class='float-left ml-3 mt-3 card " + classKarte + "' id=" + i + "></div>");
			
			
        }
		for(var j = 0; j < 20; j++) {
			rand = Math.floor((Math.random() * 10) + 1);
				if (front.includes(rand, 0) == false) {
                    for(var k = 0; k < 2; k++)
					front[j+k] = rand;
                }
		}

 

		$(".card").click(function () {
			aktuellesBild = $(this).css("background-image");
			if(aktuellesBild == 'url("file:///C:/Users/schulze_d/Desktop/memory/bilder/r%C3%BCckseite.png")')	{
			className = $(this).attr('class');
			
			if(firstClick == true)
			{
				start = new Date();
				Minutenerste = start.getMinutes();
				Sekundenerste = start.getSeconds();
				firstClick = false;
				
			}
			
			switch(className)
			{
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
			
			if(aufgedeckt1 == null) {
				aufgedeckt1 = className;
				thisName1 = this;
			}
			else 
			{
				aufgedeckt2 = className;
				thisName2 = this;
				prüfen();
			}
	}
			
			



			
	 }); 
	 
	 		function prüfen(){
				
				
				if(aufgedeckt1 == aufgedeckt2)
				{
					$(thisName1).prop("disabled", true);
					$(thisName2).prop("disabled", true);
					schonGelöst.push(thisName1);
					schonGelöst.push(thisName2);

				}
				else
				{
					$(thisName1).css("background-image", "url(./bilder/rückseite.png)");
					$(thisName2).css("background-image", "url(./bilder/rückseite.png)");
				}
				
				aufgedeckt1 = null;
				aufgedeckt2 = null;
			
				for(var i=0 ; i <= 20; i++) {
						aktuellesBild = $("#" + i).css("background-image");
					if(aktuellesBild == 'url("file:///C:/Users/schulze_d/Desktop/memory/bilder/r%C3%BCckseite.png")') {
						gewonnen = false;
						break;
					}
					else gewonnen = true;
					
				}
			
			if(gewonnen == true)
			{
					
					time = new Date();
					zeitermitteln();
					$(this).prop("disabled", "false");

			}
			}
		
	});
	
	function zeitermitteln()
	{
		
		Minuten = time.getMinutes() - Minutenerste;
		Sekunden = time.getSeconds() - Sekundenerste;
		
		
		if(time.getSeconds() - Sekundenerste < 0)
		{
			Minuten = time.getMinutes - Minutenerste - 1;
			Sekunden = 60 - Sekundenerste;
		}
		else if(time.getSeconds() - Sekundenerste > 60)
		{
			Sekunden = 100 - Sekundenerste;
			Minuten = time.getMinutes - Minutenerste + 1;
		}
		
		
		if(Minuten <= 0)
		{
			$("#gewonnen").show();
			$("#gewonnen").append("Zeit: " + Sekunden + " Sekunden");
		}
		else
		{
			$("#gewonnen").show();
			$("#gewonnen").append("Zeit: " + Minuten + "." + Sekunden + " Minuten");
		}


	}
	
	  //Seite Neu Laden
    $("#ResetButton").click(function () {
        location.reload();
    });
	    $("#gewonnenButton").click(function () {
        location.reload();
    });

});
	