document.getElementById("farmerImg").addEventListener("click", function(e){
	var state = e.currentTarget.dataset.state;
	if (state == "play") {
		document.querySelector("audio").play();
		e.currentTarget.dataset.state = "pause";
	}
	else {
		document.querySelector("audio").pause();
		e.currentTarget.dataset.state = "play";
	}
});

var songArray = [
	"/assets/sneedwave-sneethe.opus",
	"/assets/feed-and-seed.ogg"
];

var randomNumber = Math.floor(Math.random() * songArray.length);
var newSong = songArray[randomNumber];
document.getElementById("farmerSong").src = newSong;