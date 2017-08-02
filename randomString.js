function main()
{
    $('.imageTile').hide();
    $('.imageTile').fadeIn(500);
	
    $('.imageTile').each(function() {
		var url = false;
        url = getRandomUrl();
        
        //alert("image sorted");
		$(this).children().attr("src", url);
		$(this).parent().attr("href", url);
	});
}

$(document).ready(main);

/*
function main() {
  $('.projects-button').on('click', function() {			
    $(this).next().slideToggle(100);
		$(this).toggleClass('active');
		$(this).text('Projects Viewed');
	});
}
*/

function getRandomUrl()
{
	var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	
    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

	var result = "http://i.imgur.com/" + text +".jpg";
	
	var img = new Image();
	
	//TODO: find a way to check if the image failed to load and load a new one
	
	img.src = result;
    
    
	
	return result;
}

function imgError(image)
{
    image.src = getRandomUrl();
}

function img404Check(image)
{
    
    if (image.width == 161)
    {
        if (image.height == 81)
        {
            imgError(image);
            return;
        }
    }
    
    if (image.path.includes("removed"))
    {
        alert("detected path");
        imgError(image);
        return;
    }
    
    if (getDocumentTitle(image.src) == "imgur: the simple 404 page")
    {
        alert("detected title");
        imgError(image);
        return;
    }
    
    var imageShortUrl = "http://" + image.src.substr(9, 16);
    var http = new XMLHttpRequest();
    http.open('HEAD', imageShortUrl, false);
    http.send();
    if (http.status != 404)
    {
        alert("detected 404 status");
        imgError(image);
        return;
    }
}

function getDocumentTitle(url)
{
    var xhr = new XMLHttpRequest();
    var title = "";
    xhr.open("GET", url, false);
    xhr.onload = function () {
        title = document.title;
    }
    return title;
} 

function refreshImage(image)
{
    var url = false;
    url = getRandomUrl();
    $(image).attr("src", url);
}

function getAssociatedVideo(url)
{
    var xhr = new XMLHttpRequest();
    var gifurl = "";
    xhr.open("GET", url, false);
    xhr.onload = function () {
        gifurl = document.getElementsByClassName("video-elements")[0].children()[0].getAttribute("src");
        alert("gifurl = " + gifurl);
    }
    return title;
}