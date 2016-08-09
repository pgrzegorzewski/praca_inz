var CLICKED = 0;

function increase_decrease_size() {
    var img = $("#tabula_recta");
	document.getElementById("tabula_recta").src= "resources/tabula_recta.png";
    
    if (img.width() < 200)
    {
        img.animate({width: "500px", height: "500px"}, 1000);
    }
	if (img.width() == 500)
    {
        img.animate({width: "80px", height: "80px"}, 1000);
    }
	CLICKED += 1;
};

function change_img()
{
	var img = $("tabula_recta");
	if(img.width() < 200 && CLICKED % 2 == 0)
		document.getElementById("tabula_recta").src= "resources/tabula_recta_resize.jpg";
};

function change_img2()
{
	var img = $("tabula_recta");
	if(img.width() < 200)
		document.getElementById("tabula_recta").src= "resources/tabula_recta.png";
};