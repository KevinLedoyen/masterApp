/* LISTE DES VARIABLES GLOBALES*/
var currentUID;
var user;

window.addEventListener('load', function() {
	updateMenu();
});
function updateMenu(){
	var connected = getCookie("connected");
	if (connected == true) {
		console.log('utilisateur connecté');
	}else {
		console.log('utilisateur PAS connecté');
	}
}

var getCookie = function(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}