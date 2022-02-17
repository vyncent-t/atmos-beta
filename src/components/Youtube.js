import React from 'react';
import { Container,Row,Button} from 'react-bootstrap';

const Youtube=() =>{
    $(document).ready(function () {
    let searchbutton = $("#youtubesearchbutton");
	let searchinput = $("#youtubesearch");
	let userVisualChoice;
	let clientLoaded = false
    // spotify data logic
let spotify_token = ''

	//replace this with project account key later

	// use the id from the JSON search api
	function youtubePlayer() {
		if (!clientLoaded) {loadClient()}
		else {execute()}
		console.log(userVisualChoice)
	}

		function loadClient() {
			// debugger
			gapi.client.setApiKey("AIzaSyD3zSXnL-OmdY16kUbJdV5Jrik9WI50LPg");
			gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
			.then(function() { console.log("YOUTUBE: GAPI client loaded for API"); execute(); },
			function(err) { console.error("Error loading GAPI client for API", err); });
		}

	function execute() {
		gapi.client.youtube.search.list(
            {"q": `${searchinput.val()} meditation`} )
			.then(function(response) {
				// Handle the results here (response.result has the parsed body).
				// debugger
				console.log("Response", response);
				let youtubeIDCode = response.result.items[0].id.videoId
				console.log(youtubeIDCode)

		let iframe = $("<iframe>");
		let youtubeContent = $("#youtubeContent");
		let youtubeURL = `https://www.youtube.com/embed/${youtubeIDCode}?controls=0&mute=1&showinfo=0&rel=0&autoplay=1&loop=1`;
		youtubeContent.empty()
		iframe.attr("src", youtubeURL);
		iframe.attr("width", "560");
		iframe.attr("height", "315");
		iframe.attr("frameborder", "0");
		iframe.appendTo(youtubeContent);
			},
				function(err) { console.error("Execute error", err); debugger });
			}
	searchbutton.on("click", youtubePlayer);
});


    return (
        <div>


        </div>
    )
}

export default Youtube;