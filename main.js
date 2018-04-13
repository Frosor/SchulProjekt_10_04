src = "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"

$(document).ready(function () {
    $("div").click(function () {
        //$(this).fadeOut();
        document.getElementsByClassName("hide").body.style.backgroundColor = "red";

    });
});

