function findCookie(name) {
	var cookies = document.cookie;
	// Split the cookie string into "name=value" strings.
	var cookiePairs = cookies.split(";");
	for (var p = 0; p < cookiePairs.length; ++p) {
		// Now split the "name=value" string into an array of 2 elements.
		var nameValue = cookiePairs[ p ].split("=");
		// The 1st element is the "name" part, and we need to trim off
		// any leading/trailing spaces so our "name" parameter can match.
		if (nameValue[0].trim() == name) {
			// Return the 2nd element of the array which contains the "value".
			return nameValue[1];
		}
	}
	// If the "name" of the "name=value" pair isn't found, then be
	// polite and return an empty string.
	return "";
}

function deleteCookie(name) {
	// Concatenate a "name=; expires..." string to assign to the
	// document cookie property to delete the name=value pair.
	document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}
window.onload = function(){
	//refresh counter
	var message = "you refreshed ", messageEnd = " times";
	var counterDisplay = document.getElementById("counter");
	
	var refreshCounter = makeCounter();
	//make refresh counter
	function makeCounter(){ 																// Nested functionz	
		var count = findCookie("refreshCounter");
		return function(){
			if(count == ""){
				counterDisplay.innerHTML = message + 0 + messageEnd; 						// message is used here with setup
			}else{
				counterDisplay.innerHTML = message + count + messageEnd;
				document.getElementById("greeting").innerHTML = "Welcome back to Cookie Counter";
			}
			document.cookie = "refreshCounter=" + ++count;;
			return count;
		};
		
	};
	
	//cookie counter
	var cookieButton = document.getElementById("cookieButton");
	var buyButton = document.getElementById("buyButton");
	var moreCookiesButton = document.getElementById("moreCookiesButton");
	var cookieDisplay = document.getElementById("cookie");
	
	var clickBought = findCookie("autoClicker");
	
	//get cookie count and assign it to count. and make sure the var is assigned to a number
	var count = findCookie("cookieCount");												// show casing with using cookies
	if(count === ""){
		count = 0;
	}else{
		count = parseInt(count);
	}
	
	//get cookie bonus and assign it to cookie bonus. and make sure the var is assigned to a number
	var cookieBonus = findCookie("cookieBonus");										// show casing with using cookies
	if(cookieBonus === ""){
		cookieBonus = 1;
	}else{
		cookieBonus = parseInt(cookieBonus);
	}
	
	//display how many cookies the user has made
	function displayCookie(){
			var message = "Cookies: " + count;		//using local scope of message while not affecting "global" in init function			
			cookieDisplay.innerHTML = message;				
	}
	
	if(clickBought){
		setInterval(function(){						//Anonymous Function and nested function
				++count;
				displayCookie();
				document.cookie = "cookieCount=" + count;
			}, 1000);
	}
	
	//display UI code and stored cookies
	displayCookie();
	
	
	/*
		
		onclick events
	
	*/
	//make a cookie and add it to the count
	cookieButton.onclick = function(){				//Anonymous Function and nested function
		count = count + cookieBonus;
		displayCookie();
		document.cookie = "cookieCount=" + count;
		console.log("You made cookies!!!");
	};
	
	//Buy autoclicker that makes a cookie every second
	buyButton.onclick = function(){					//Anonymous Function and nested function
		if(count >= 5 && !clickBought){
			count -= 5;
			displayCookie();
			document.cookie = "cookieCount=" + count;
			
			var message = "Cookies: ";				//using local scope of message in the setInterval closure loop.
			clickBought = true;
			document.cookie = "autoClicker=" + clickBought;
			
			setInterval(function(){					//Anonymous Function and nested function
				++count;			
				cookieDisplay.innerHTML = message + count;	// showing that local scope works
				document.cookie = "cookieCount=" + count;
			}, 1000);
		}else{
			console.log("Sorry, you can only buy the autoclicker once and you need atleast 5 cookies.");
		}
	};
	
	//adds another cookie to make cookie button per click.
	moreCookiesButton.onclick = function(){			//Anonymous Function
		if(count >= 10){
			count -= 10;
			displayCookie();
			cookieBonus += 1;
			document.cookie = ("cookieCount=" + count);
			document.cookie = ("cookieBonus=" + cookieBonus);
			console.log("You bought a larger cookie maker, you can make more cookies per batch!");
		}else{
			console.log("sorry, you need more cookies to buy this");
		}
	};
	refreshCounter();								//Calling makecounter to show scope of message being global
};