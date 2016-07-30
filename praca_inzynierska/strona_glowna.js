function toggle_visibility(id) {
	var object = document.getElementById(id);
	if(object.style.display == 'block')
		object.style.display = 'none';
	else
		object.style.display = 'block';
}

