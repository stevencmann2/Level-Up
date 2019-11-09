//hide the greeeting card for now
$(document).ready(function hiddenContent() {
  $("#greeting-card").hide();
  $("#member-games").hide();
});

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAoVw91_gi_qp80TG0T-0o7mCej_yKLStQ",
  authDomain: "level-up-gaming.firebaseapp.com",
  databaseURL: "https://level-up-gaming.firebaseio.com",
  projectId: "level-up-gaming",
  storageBucket: "level-up-gaming.appspot.com",
  messagingSenderId: "360362860846",
  appId: "1:360362860846:web:c6e4191497b1cb712c1abf"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const m = moment().format("YYYY-MM-DD");
// console.log(m);

//Query URL for RAWG Gaming
const queryURL = `https://api.rawg.io/api/games?dates=2019-10-10,${m}&ordering=-added`;

//Attempting AJAX Call for RAWG Gaming 
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {
  // console.log(response);
});

/////////////////////////////////////////////////////////////////FIERBASE AUTH////////////////////////////////////////////////////////////////
//make auth and firstore references
const auth = firebase.auth();
const db = firebase.firestore();


console.log(auth);
console.log(db);

//Declaring variables from Sign Up form

let email = $("#email").val().trim(); //this will be changed to lowercase on the next line
let useremail = email.toLowerCase();
let password = $("#password").val().trim();
let username = $("#username").val().trim();
// let username = $("#username").val().trim();

$("#sign-up-button").on("click", function (event) {
  ///prevent reload of page
  event.preventDefault();

  ///////gather info and put apporpriate varibales to lowercase

  let email = $("#email").val().trim(); //this will be changed to lowercase on the next line
  let useremail = email.toLowerCase();
  let password = $("#password").val().trim();
  let username = $("#username").val().trim();        //added the username value
  // let username = $("#username").val().trim();

  //  console.log(email);
  //  console.log(password);
  //  console.log(username);
  //  console.log(useremail);

  // firebase password function to create a user with password and email &&&& gives them a credential
  auth.createUserWithEmailAndPassword(useremail, password).then(cred => {
    console.log(cred.user); //gives us the object of all the users credentials
    cred.user.updateProfile({
      displayName: username       ///// accessing the username through the display name aobject in firebase

  });
  });

  $("#email").val("");
  $("#password").val("");
  $("#username").val("");

});

//When authentifaction status is changed, hides and shows corresponding content
auth.onAuthStateChanged(function (user) {
  if (user) {
    $("#sign-up-form").hide();
    $("#greeting-card").show();
    $("#user-greeting").text(user.displayName);     //added
    console.log(user.displayName);    // added 
  } else {
    $("#greeting-card").hide();
  }
});

//lets create a logout function
$("#log-out").on("click", function (event) {
  event.preventDefault();
  /////////may want to delete this later but this will show the original form again
  $("#sign-up-form").show();
  $("#member-games").hide();
  $("#greeting-card").hide();
  auth.signOut();
  // console.log("user has logged out");
});

///// click event for log-in button on MEMBER MODAL
$("#log-in-button").on("click", function (event) {
  event.preventDefault();
  //console.log("sign-in button for members clicked");
  /// get existing member info
  emailValue = $("#member-email").val().trim(); /////to lower case
  email = emailValue.toLowerCase();
  password = $("#member-password").val().trim();

  auth.signInWithEmailAndPassword(email, password).then(cred => {
    //console.log(cred.user);
    // close the MEMBER modal  by hidin it and reset the form by clearing the values
    $("#sign-in-modal").modal('hide');
    $("#member-email").val("");
    $("#member-password").val("");
  })
});

//listen for auth status changes..... this keeps track of user authentication status
auth.onAuthStateChanged(user => {
  //console.log(user);   // console to check to see if logged in, if not returns null
  // check user logs in or not with if statement

  if (user) {
    console.log("user is logged in: ", user);
    $("#member-games").show();
  } else {
    console.log("user logged out");
   }

});
