// [1] - I've tried toggleClass ¬¬/~~
$('#new-quote').on('click', function(e){
  e.preventDefault();
  var regex = /(<([^>]+)>)/ig; // remove html tags
  $('.icon-refresh').removeClass("fa fa-refresh icon-refresh").addClass("fa fa-spinner fa-spin icon-refresh"); // [1] 
  $.ajax({
    url: 'https://crossorigin.me/http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
    success: function(data) {
      $(".quote").html(data[0].content);
      $(".author").html(data[0].title);
      $('.icon-refresh').removeClass("fa fa-spinner fa-spin icon-refresh").addClass("fa fa-refresh icon-refresh"); // [1]
      
      var hashtag = "quoteGenerator";
      var contentShare = data[0].content.replace(regex, "");
      contentShare = contentShare.replace("’", "");
      
      if ((contentShare.length + hashtag.length) > 140) {
        contentShare = contentShare.substring(0, 140 - hashtag.length - 6);
        contentShare += "...";
      }
      contentShare = encodeURIComponent(contentShare);
      
      $('.social-button-link').attr("href", "https://twitter.com/intent/tweet?text="+decodeURIComponent(contentShare)+"&hashtags="+hashtag);
      
    }, 
    cache: false
  });
});