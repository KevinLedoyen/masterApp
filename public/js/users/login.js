var currentUID;


var signInButton = document.getElementById('sign-in-button');
window.addEventListener('load', function() {
	// Bind Sign in button.
	signInButton.addEventListener('click', function() {
		var provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider);
	});
	// Listen for auth state changes
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
    updateMenu();
    var domain = document.location.origin;
    window.location.href = domain+"/redaction";
    document.cookie = "connected=true";
    // writeUserData(user.uid, user.displayName, user.email, user.photoURL);
    // startDatabaseQueries();
  } else {
    // Set currentUID to null.
    currentUID = null;
  }
}