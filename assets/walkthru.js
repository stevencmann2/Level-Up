$(document).ready(function () {

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
        $.getJSON(URL, options, function(data) {
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

        $.each(data.items, function(i, item) {

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