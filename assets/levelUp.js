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
console.log(m);
//Query URL for RAWG Gaming
const queryURL = `https://api.rawg.io/api/games?dates=2019-10-10,${m}&ordering=-added`;
//Attempting AJAX Call for RAWG Gaming 
$.ajax({
  url: queryURL,
  method: "GET" 
}).then(function(response) {
    console.log(response);
});