let hasGP = false,
repGP,
gp = navigator.getGamepads()[0],
controller = false;
function canGame() {
    return "getGamepads" in navigator;
}

let keyLeft = 37,
keyLeft2 = 65,
keyRight=39,
keyRight2=68,
keyUp=38,
keyUp2=87,
keyDown=40,
keyDown2=83,
keyAttack=32,
keyAttack2=90,
main2PLAYING=false,
options = false;
let attack = false;
let kstate =[false, false, false, false];

let faceState=[false, false, false, false];

        if(canGame()) {
            $(window).on("gamepadconnected", function() {
                console.log("connection event");
                repGP = window.setInterval(reportOnGamepad,50);
            });
 
            $(window).on("gamepaddisconnected", function() {
                console.log("disconnection event");
            });

                       let checkGP = window.setInterval(function() {
                if(navigator.getGamepads()[0]) {
                    if(!hasGP) $(window).trigger("gamepadconnected");
                    window.clearInterval(checkGP);
                }
            }, 1000);
 
        }

    function reportOnGamepad() {
    	if (controller) {
        let gp = navigator.getGamepads()[0];
		switch(true){
			case gp.buttons[0].pressed:
			attack =true;
			kstate[0] =false;
			kstate[1] =false;
			kstate[2] =false;
			kstate[3] =false;
			break;

			case gp.buttons[14].pressed:
			kstate[0] =true;

			kstate[1] =false;
			kstate[2] =false;
			kstate[3] =false;
			faceState=[true, false, false, false];
			break;

			case gp.buttons[15].pressed:
			kstate[1] =true;

			kstate[0] =false;
			kstate[2] =false;
			kstate[3] =false;

			faceState=[false, true, false, false];
			break;

			case gp.buttons[12].pressed:
			kstate[2] =true;

			kstate[0] =false;
			kstate[1] =false;
			kstate[3] =false;
			faceState=[false, false, true, false];
			break;

			case gp.buttons[13].pressed:
			kstate[3] =true;

			kstate[0] =false;
			kstate[1] =false;
			kstate[2] =false;
			faceState=[false, false, false, true];
			break;

			default:
			kstate[0] =false;
			kstate[1] =false;
			kstate[2] =false;
			kstate[3] =false;
			break;

		}
	}
 } //end reportOnGamepad

let delay = (function(){
  let timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

let delayE = (function(){
  let timerE = 0;
  return function(callback, ms){
    clearTimeout (timerE);
    timerE = setTimeout(callback, ms);
  };
})();

let delaysfx = (function(){
  let timersfx = 0;
  return function(callback, ms){
    clearTimeout (timersfx);
    timersfx = setTimeout(callback, ms);
  };
})();

let delayLog = (function(){
  let timerLog = 0;
  return function(callback, ms){
    clearTimeout (timerLog);
    timerLog = setTimeout(callback, ms);
  };
})();

let delayShake = (function(){
  let timerShake = 0;
  return function(callback, ms){
    clearTimeout (timerShake);
    timerShake = setTimeout(callback, ms);
  };
})();

function InitKeyboard(){
	if (controller ==false) {
	$(window).keydown(function(e){
		switch(true){
			case e.keyCode ==keyAttack || e.keyCode ==keyAttack2:
			attack =true;
			break;

			case e.keyCode ==keyLeft || e.keyCode ==keyLeft2:
			kstate[0] =true;

			faceState=[true, false, false, false];
			break;

			case e.keyCode ==keyRight || e.keyCode ==keyRight2:
			kstate[1] =true;

			faceState=[false, true, false, false];
			break;

			case e.keyCode ==keyUp || e.keyCode ==keyUp2:
			kstate[2] =true;

			faceState=[false, false, true, false];
			break;

			case e.keyCode ==keyDown || e.keyCode ==keyDown2:
			kstate[3] =true;

			faceState=[false, false, false, true];
			break;
		}
	}); //end doc keydown

		$(window).keyup(function(e){
		switch(true){
			case e.keyCode ==keyLeft || e.keyCode ==keyLeft2:
			kstate[0] =false;
			break;

			case e.keyCode ==keyRight || e.keyCode ==keyRight2:
			kstate[1] =false;
			break;

			case e.keyCode ==keyUp || e.keyCode ==keyUp2:
			kstate[2] =false;
			break;

			case e.keyCode ==keyDown || e.keyCode ==keyDown2:
			kstate[3] =false;
			break;
		}
	}); //end doc keyup
	}
} //end InitKeyboard

function controls(){
	if (options ==false) {
		$("#title").css("animation", "fadeIN 0.1s linear");
		$("#ui").css("background-image", "url(assets/controls.png)");
	delay(function(){
		options = true;
		$("#title").css("opacity", "0");
		$("#title").css("animation", "none");
	},100);
	}
	else{
		$("#title").css("animation", "fade 0.1s linear");
	delay(function(){
		options = false;
		$("#ui").css("background-image", "none");
		$("#title").css("opacity", 1);
		$("#title").css("animation", "none");
	},100);
	}
}//end controls

function fadeControls(){
	$("#title").css("background-image", "url(assets/gameOver.png)");
	$("#title").css("animation", "fade 5s linear");
	delay(function(){
		$("#title").css("opacity", 1);
		$("#title").css("animation", "none");
	},100);
} //end fadeDeath

function fade(){
	$("#title").css("animation", "fadeIN 0.5s linear");
		delay(function(){
		$("#title").css("animation", "none");
	},500);
}//end fade

function fadeLong(){
	$("#title").css("animation", "fadeLong 1s linear");
		delay(function(){
		$("#title").css("animation", "none");
	},1000);
}//end fadeLong

function fadeIntro(){
	$("#title").css("animation", "fadeIN 0.5s linear");
	delay(function(){
		$("#title").css("opacity", "0");
		$("#title").css("animation", "none");
	},500);
} //end fadeIntro

function fadeLog(){
	$("#logman").css("animation", "fadeLog 7s linear");
}//end fadeLog

function fadeDeath(){
	$("#title").css("background-image", "url(assets/gameOver.png)");
	$("#title").css("animation", "fade 5s linear");
	delay(function(){
		$("#title").css("opacity", 1);
		$("#title").css("animation", "none");
	},5000);
} //end fadeDeath