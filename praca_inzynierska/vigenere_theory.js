function increase_decrease_size() {
    var img = $("#tabula_recta");
    
    if (img.width() < 200)
    {
        img.animate({width: "500px", height: "500px"}, 1000);
    }
	if (img.width() == 500)
    {
        img.animate({width: "80px", height: "80px"}, 1000);
    }
};