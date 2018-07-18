
window.addEventListener('load', function() {
	// Bind Sign out button.
	firebase.auth().signOut();
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
		document.cookie = "connected=false";
	    // writeUserData(user.uid, user.displayName, user.email, user.photoURL);
	    // startDatabaseQueries();
	} else {
	    // Set currentUID to null.
	    currentUID = null;
	}
}