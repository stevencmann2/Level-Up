$(document).ready(function () {
  $("#greeting-card").hide();
  $("#member-games").hide();

  // WALKTHROUGHS YOUTUBE API
  const key = 'AIzaSyAV0wUsK3zb2SGqevY8kwnorAo2CqNOyZ8';
  const playlistId = 'PLwaWr8yQbPuFir-1QFIncwHPg3iR1f4Cv';
  const URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

  const options = {
    part: 'snippet',
    key: key,
    maxResults: 15,
    playlistId: playlistId,
  }

  loadVids();

  function loadVids() {
    $.getJSON(URL, options, function (data) {
      console.log(data);
      const id = data.items[0].snippet.resourceId.videoId;
      mainVid(id);
      resultsLoop(data);

    });
  }

  function mainVid(id) {
    $('#video').html(`
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `);
  }

  function resultsLoop(data) {

    $.each(data.items, function (i, item) {

      const thumb = item.snippet.thumbnails.medium.url;
      const title = item.snippet.title;
      const desc = item.snippet.description.substring(0, 100);
      const vid = item.snippet.resourceId.videoId;

      $('main').append(`
            <article class= "item" data-key="${vid}">
              <img src="${thumb}" alt="" class="thumb">
              <div class="details">
                <h4>${title}</h4>
                <p>${desc}</p>
              </div>
            </article>
          `);
    });
  }

  $('main').on('click', 'article', function () {
    const id = $(this).attr('data-key');
    mainVid(id);
  });
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
    let username = $("#username").val().trim(); //added the username value
    // let username = $("#username").val().trim();

    //  console.log(email);
    //  console.log(password);
    //  console.log(username);
    //  console.log(useremail);

    // firebase password function to create a user with password and email &&&& gives them a credential
    auth.createUserWithEmailAndPassword(useremail, password).then(cred => {
      console.log(cred.user); //gives us the object of all the users credentials
      cred.user.updateProfile({
        displayName: username ///// accessing the username through the display name aobject in firebase

      });

       //FOR ERROR MESSAGES
       $(".sign-up-error").text("");
      }).catch(err => {
        $(".sign-up-error").text(err.message);

      })
    

    $("#email").val("");
    $("#password").val("");
    $("#username").val("");
  });
  

  //When authentifaction status is changed, hides and shows corresponding content
  auth.onAuthStateChanged(function (user) {
    if (user) {
      $("#sign-up-form").hide();
      $("#greeting-card").show();
      $("#user-greeting").text(user.displayName); //added
      console.log(user.displayName); // added 
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
    auth.signOut().then(function(){
      window.location = './index.html';
    })
    .catch(function(err){
      console.log(err);
      //error messages for the logout function
      $(".sign-up-error").text(err.message);
      $("#log-out-error").text(err.message);

    });



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

       //For ERROR MESSAGES 
       $(".log-in-error").text("");

      }).catch(err => {
        $(".log-in-error").text(err.message);
      })
    
  });

  //listen for auth status changes..... this keeps track of user authentication status
  auth.onAuthStateChanged(user => {
    //console.log(user);   // console to check to see if logged in, if not returns null
    // check user logs in or not with if statement

    if (user) {
      // console.log("user is logged in: ", user);
      $("#member-games").show();
    } else {
      // console.log("user logged out");
    }
  });



  //extra card content

  $.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});

$.ajax({

    method: "GET",
    url: `http://www.gamespot.com/api/games/?format=json&api_key=ce3e6d5e61b7cecf7d622fedfceb1ab2de3ade0b&filter=release_date:2019-10-01|${m},limit:10`,
    success: res => {
        console.log(res);


        const gameResults = res.results;


          for (let i = 0; i < gameResults.length; i++) {
            // if (gameResults[i].image.square_tiny === "null") {
            //     i++;

            // }
            // else {

            // const game = $("<a>");
            // game.addClass("news");

            // const title = $("<h5>").text(gameResults[i].name);
            // const image = $("<img>").attr("src", gameResults[i].image.square_tiny);
            // const url = gameResults[i].site_detail_url;
            // game.attr("href", url);
            // game.append(title, image);
            // $("#new-games").append(game);

            // }


            const game = $("<a>");
            game.addClass("news");

            const title = $("<h5>").text(gameResults[i].name);
            const image = $("<img>").attr("src", gameResults[i].image.square_tiny);
            const url = gameResults[i].site_detail_url;
            game.attr("href", url);
            game.append(title, image);
            $("#new-games").append(game);
            // $("#new-games").css("overflow-y", "scroll");

        

        }
    }

});
