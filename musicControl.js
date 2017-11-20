$(".music").trigger('load');//auto load
$(".sfx").trigger('load');//auto load

function stopAudio(m){
  //pause playing
  $(m).trigger('pause');
  //set play time to 0
  $(m).prop("currentTime",0);
}