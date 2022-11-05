export const playYoutube = ()=>{
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;


  function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube', {
      playerVars: {
        'controls': 0,
        'loop': 1,
        'playsinline': 1,
        'rel': 0,
      },
      videoId: '9ZG3d9-7ZKg',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }

  function onPlayerReady(event) {
    // event.target.mute();
    // player.playVideo();
  }

  var done = false;

  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
      event.target.playVideo();
    }
  }

  function stopVideo() {
    player.stopVideo();
  }

  function playVideo() {
    player.playVideo();
  }

  window.addEventListener('load', function() {

  });
}
