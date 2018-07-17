/* FONCTIONS DE REFERENCES EXEMPLES */
firebase.database().ref('users/kevinLedoyen').set({
 username: "test",
 email: "test@gmail.com"
});

// récupération de l'uid de l'utilisateur en cours
// firebase.auth().currentUser.uid
//Creates a new post for the current user.
var current_user_documents = [];
console.log('update document');
function update_documents(){
	uid = firebase.auth().currentUser.uid;
	var Documents = firebase.database().ref('user-documents/' + uid);
	Documents.on('value', function (r) {
	    $('#liens_documents').html('Loading...');
	    var html = '';
	    r.forEach(function (item) {
	        console.log(item);
	        console.log(item.key);
	        // item.child("name").val()
	        current_user_documents[item.key] = item.val();
	        html += "<li><a href='#' class='lien_document' data-lien_document='"+item.key+"'>"+item.child("titre").val()+"</a> <a href='#' class='delete_document' data-lien_document='"+item.key+"' style='color:red;float:right;'><b>X</b></a></li>"
	        // html = '<div class="col-md-4">' +
	        //     '<a href="entry.html?id=' + item.getKey() + '" style="text-decoration:none!important;">' +
	        //     '<div class="panel panel-info">' +
	        //     '<div class="panel-heading">' +
	        //     '<h3 class="panel-title">' + excerpt(entry.title, 140) + '</h3>' +
	        //     '</div>' +
	        //     '<div class="panel-body">' +
	        //     '<small>By ' + entry.author + ' | ' + datetimeFormat(entry.updatedAt) + ' | ' + entry.views + ' views</small>' +
	        //     '<hr><p>' + excerpt(entry.content, 250) + '</p>' +
	        //     '</div>' +
	        //     '</div>' +
	        //     '</a>' +
	        //     '</div>' + html; // prepend the entry because we need to display it in reverse order
	    });

	    $('#liens_documents').html(html);
	    update_triggers();
	});
}


window.addEventListener('load', function() {
	firebase.auth().onAuthStateChanged(onAuthStateChanged);
});


// document.getElementById("newPostForCurrentUser").addEventListener ("click", newPostForCurrentUser, false);
jQuery(document).ready(function($) {
	$('#newPostForCurrentUser').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		newPostForCurrentUser();
	});
	$('#updatePostForCurrentUser').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		updatePostForCurrentUser();
	});
	$('#createNewPostForCurrentUser').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */

		CKEDITOR.instances.ckeditor_content.setData("<h1>Mon némesis...</h1>")
		$("#newPost input[name=titre]").val("Nouveau document");
		$('#newPostForCurrentUser').show();
		$('#updatePostForCurrentUser').hide();
	});
});

function update_triggers(){
	$('.lien_document').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		console.log(this);
		var key = $(this).data('lien_document');
		console.log(key);
		console.log(current_user_documents[key]);
		CKEDITOR.instances.ckeditor_content.setData(current_user_documents[key]["content"])
		$("#newPost input[name=titre]").val(current_user_documents[key]["titre"]);
		$("#newPost input[name=uid]").val(key);

		// display du bon bouton d'enregistrement
		$('#newPostForCurrentUser').hide();
		$('#updatePostForCurrentUser').show();
	});
	$('.delete_document').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		var key = $(this).data('lien_document');
		var userId = firebase.auth().currentUser.uid;
		deletePost(userId, key);
		$('#createNewPostForCurrentUser').click();
	});
}

function newPostForCurrentUser(){
	var titre = $("#newPost input[name=titre]" ).val();
	var ckeditor_content = CKEDITOR.instances.ckeditor_content.getData();
	var userId = firebase.auth().currentUser.uid;
	// console.log(titre, ckeditor_content, userId);
	// if (titre != "" & ckeditor_content != "") {}
	// Récupération du nom de l'auteur pour l'enregistrement en base
	return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
		var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
		console.log(username);
		console.log(firebase.auth().currentUser.uid);
		console.log(firebase.auth().currentUser.photoURL);
		console.log(titre);
		console.log(ckeditor_content);
		return writeNewPost(firebase.auth().currentUser.uid,
			username,
			firebase.auth().currentUser.photoURL,
			titre,
			ckeditor_content);
	});
};

function updatePostForCurrentUser(){
	var titre = $("#newPost input[name=titre]" ).val();
	var key = $("#newPost input[name=uid]" ).val();
	var ckeditor_content = CKEDITOR.instances.ckeditor_content.getData();
	var userId = firebase.auth().currentUser.uid;
	// console.log(titre, ckeditor_content, userId);
	// if (titre != "" & ckeditor_content != "") {}
	// Récupération du nom de l'auteur pour l'enregistrement en base
	return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
		var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
		console.log(username);
		console.log(firebase.auth().currentUser.uid);
		console.log(firebase.auth().currentUser.photoURL);
		console.log(titre);
		console.log(ckeditor_content);
		return updatePost(firebase.auth().currentUser.uid,
			key,
			username,
			firebase.auth().currentUser.photoURL,
			titre,
			ckeditor_content);
	});
};

//Saves a new post to the Firebase DB.
function writeNewPost(uid, username, picture, titre, ckeditor_content) {
	// Un nouveau document
	console.log('Nouveau document');
	var docData = {
		author: username,
		uid: uid,
		titre: titre,
		content: ckeditor_content,
		starCount: 0,
		authorPic: picture
	};

	// Récupération d'une nouvelle clé pour un nouveau document
	var newPostKey = firebase.database().ref().child('documents').push().key;

	// Write the new post's data simultaneously in the posts list and the user's post list.
	// Ecriture d'un nouveau document à la fois dans /documents et dans user-document
	var updates = {};
	updates['/documents/' + newPostKey] = docData;
	updates['/user-documents/' + uid + '/' + newPostKey] = docData;

	return firebase.database().ref().update(updates);
}

//Saves a new post to the Firebase DB.
function updatePost(uid, key, username, picture, titre, ckeditor_content) {
	// Un nouveau document
	console.log('Nouveau document');
	var docData = {
		author: username,
		uid: uid,
		titre: titre,
		content: ckeditor_content,
		starCount: 0,
		authorPic: picture
	};

	// Récupération d'une nouvelle clé pour un nouveau document
	// var newPostKey = firebase.database().ref().child('documents').push().key;

	// Write the new post's data simultaneously in the posts list and the user's post list.
	// Ecriture d'un nouveau document à la fois dans /documents et dans user-document
	var updates = {};
	updates['/documents/' + key] = docData;
	updates['/user-documents/' + uid + '/' + key] = docData;

	return firebase.database().ref().update(updates);
}

function deletePost(uid, key){
	firebase.database().ref("documents/" + key).remove();
	firebase.database().ref("user-documents/" + uid + '/' + key).remove();
}


/**
 * Triggers every time there is a change in the Firebase auth state (i.e. user signed-in or user signed out).
 */
function onAuthStateChanged(user) {
	// We ignore token refresh events.
	if (user && currentUID === user.uid) {
		return;
	}
	if (user) {
		console.log('onAuthStateChanged');
		currentUID = user.uid;
		update_documents();
		console.log(user);
	    // writeUserData(user.uid, user.displayName, user.email, user.photoURL);
	    // startDatabaseQueries();
	} else {
		console.log('onAuthStateChanged');
	    // Set currentUID to null.
	    currentUID = null;
	}
}

