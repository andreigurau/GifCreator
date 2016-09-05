//client_id:2_TMHShQ
//client_secret:G3j4skzzMwmyds8hNXU0vFUf7WiXbChc4xNeDkuNiXKsBxjiUPmeNpCaBj9oU7qX


function convert(){
	console.log("Function was called");
	//$('#test').text("button pressed");
	var urlLink = $('#link').val();

	if ($('#minute').val() == "" || $('#second').val() == "" || $('#duration').val() == ""){
		var htmlStr = '<h5 id="results1">Please fill out all the parameters</h5>';
	//console.log("this didn't work??????");
	$("#results1").html(htmlStr);
    return;
	}
	var minute = parseInt($('#minute').val());
	var seconds = parseInt($('#second').val());
	var totalSeconds = (minute * 60) + seconds;
	var duration = $('#duration').val();
	var theData = '{"fetchUrl":"' + urlLink + '","fetchMinutes":"' + minute + '","fetchSeconds":"' + seconds + '","cut":{"start":"' + totalSeconds + '","duration":"' + duration + '"}}';
	console.log(minute);
	//checkValidUrl(urlLink);
	var matches = urlLink.match(/watch\?v=([a-zA-Z0-9\-_]+)/);
if (!matches)
{
    var htmlStr = '<h5 id="results1">Thats not a valid youtube URL</h5>';
	//console.log("this didn't work??????");
	$("#results1").html(htmlStr);
    return;
}



$.ajax({
 url: "https://api.gfycat.com/v1/gfycats",
 //beforeSend: function(xhr) { 
  //xhr.setRequestHeader("Authorization", "Basic " + btoa("username:password")); 
 //},
 type: 'POST',
 dataType: 'json',
 contentType: 'application/json',
 processData: false,
 //data: '{"fetchUrl":' + urlLink + ',"fetchMinutes":' + minute + ',"fetchSeconds":' + seconds + ',"cut":{"start":' + totalSeconds + ',"duration":' + duration + '}}'
 //data: '{"fetchUrl":"https://www.youtube.com/watch?v=RiXBWy0WvsE","fetchMinutes":"1","fetchSeconds":"5","cut":{"start":"605","duration":"5"}}'
 //data: '{"fetchUrl":"https://www.youtube.com/watch?v=RiXBWy0WvsE","fetchMinutes":"1","fetchSeconds":"6","cut":{"start":"126","duration":"6"}}' ,
 data: theData, 
 success: function (data) {
  //alert(JSON.stringify(data));
  
  console.log(data);

  var gifylink = data.gfyname;
  console.log(gifylink);
  postResults(gifylink);
},
  error: function(){
   var htmlStr = '<h5 id="results1">Sorry, something is wrong</h5>';
$("#results1").html(htmlStr);
 }
});

}


function postResults(gifylink){
	//var urlLink = "https://gfycat.com/" + gifylink;
	$("#convert1").remove();
	var htmlStr = '<h5 id="results1">A webm version of the gif will be available at the following link in a few minutes</h5>';
	htmlStr += "<p>https://gfycat.com/" + gifylink + "</p>";
	htmlStr+= "<h5>You can download the gif at one of the three following links once it has finished processing</h5>";
	htmlStr+= "<h6>Note: Two of the three links will deny you access. I don't know which one works or doesn't work</h6>";

	console.log(htmlStr);
	$("#results1").html(htmlStr);

	var linkOne = $('<li>').text("zippy.gfycat.com/" + gifylink + ".gif");
      $(linkOne).prependTo('.giflinks');
      var linkTwo = $('<li>').text("fat.gfycat.com/" + gifylink + ".gif");
      $(linkTwo).prependTo('.giflinks');
      var linkThree = $('<li>').text("giant.gfycat.com/" + gifylink + ".gif");
      $(linkThree).prependTo('.giflinks');
}
window.onload = function(){
	var convertButton = document.getElementById("convert1");
if(convertButton){
	console.log("convert button found");
	convertButton.addEventListener('click', convert);
}
}
