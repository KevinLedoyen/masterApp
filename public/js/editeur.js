/* FONCTIONS DE REFERENCES EXEMPLES */
// firebase.database().ref('users/kevinLedoyen').set({
//  username: "test",
//  email: "test@gmail.com"
// });

// récupération de l'uid de l'utilisateur en cours
// firebase.auth().currentUser.uid
//Creates a new post for the current user.


function newPostForCurrentUser(title, text) {
var userId = firebase.auth().currentUser.uid;
	return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
		var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
		return writeNewPost(firebase.auth().currentUser.uid, username,
			firebase.auth().currentUser.photoURL,
			title, text);
});

//Saves a new post to the Firebase DB.
function writeNewPost(uid, username, picture, title, body) {
	// A post entry.
	var postData = {
		author: username,
		uid: uid,
		body: body,
		title: title,
		starCount: 0,
		authorPic: picture
	};

	// Get a key for a new Post.
	var newPostKey = firebase.database().ref().child('posts').push().key;

	// Write the new post's data simultaneously in the posts list and the user's post list.
	var updates = {};
	updates['/posts/' + newPostKey] = postData;
	updates['/user-posts/' + uid + '/' + newPostKey] = postData;

	return firebase.database().ref().update(updates);
}

window.addEventListener('load', function() {
	firebase.auth().onAuthStateChanged(onAuthStateChanged);
});

/**
 * Triggers every time there is a change in the Firebase auth state (i.e. user signed-in or user signed out).
 */
function onAuthStateChanged(user) {
  // We ignore token refresh events.
  if (user && currentUID === user.uid) {
    return;
  }
  if (user) {
    currentUID = user.uid;
    console.log(user);
    // writeUserData(user.uid, user.displayName, user.email, user.photoURL);
    // startDatabaseQueries();
  } else {
    // Set currentUID to null.
    currentUID = null;
  }
}