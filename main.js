src="http://code.jquery.com/jquery-latest.min.js" 
type="text/javascript"
src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"
$(".hide").click(function() {
    $(this).hide(200);    
});
$(".fade").click(function() {
    $(this).fadeOut(300);  
    $(this).fadeToggle("slow");  
});