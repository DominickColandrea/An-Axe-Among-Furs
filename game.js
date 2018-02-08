$(function(){
	let enter=13,
	GAMESTART=false,
	current;

	let e = document.getElementById("eLayer"); //eLayer
	let etx = e.getContext("2d");

	let a = document.getElementById("atk"); //attack layer
	let atx = a.getContext("2d");

	let el = document.getElementById("eOVERLAY"); //enemyOverlay layer
	let eltx = el.getContext("2d");

	let c = document.getElementById("canvas");//game layer
	let ctx = c.getContext("2d");

	let et = document.getElementById("enemyTopLayer"); //enemyTop layer
	let ettx = et.getContext("2d");

	let l = document.getElementById("layers"); //layer layer
	let ltx = l.getContext("2d");

	let u = document.getElementById("ui");//ui layer
	let utx = u.getContext("2d");

	let t = document.getElementById("title");//title layer
	let ttx = t.getContext("2d");

	let hbox = function(x, y, w, h){
		ctx.rect(x,y,w,h);
		ctx.globalAlpha = 0; //change for visibility //
		ctx.stroke();
		ctx.globalAlpha = 1;
	}; //end hbox

	let axhbox= function(x, y, w, h){
		atx.rect(x,y,w,h);
		atx.globalAlpha = 0; //change for visibility //
		atx.stroke();
	}; //end axhbox

	let ehbox = function(x, y, w, h){
		etx.rect(x,y,w,h);
		etx.globalAlpha = 0; //change for visibility //
		etx.stroke();
		etx.globalAlpha = 1;
	};//end ehbox

let keyboard= new Image();
keyboard.src = "assets/selectKeyboard.png";

let selectController= new Image();
selectController.src = "assets/selectController.png";

		let zackL = img[0];
		let zackR = img[1];
		let zackF = img[2];
        let zackB = img[3];
//end stills
	    let zackLsheet = img[4];
     	let zackRsheet = img[5];
		let zackFsheet = img[6];
	    let zackBsheet = img[7];
//end walking animations

	    let ATTACKzackLsheet = img[8];
	    let ATTACKzackRsheet = img[9];
	    let ATTACKzackFsheet = img[10];
	    let ATTACKzackBsheet = img[11];
//end attack animations

		let deerLEFT = img[12];
		let deerRIGHT = img[13];
		let deerF = img[14];
		let deer2F = img[14];
		let deer3F = img[14];
		let deer4F = img[14];
		let deer5F = img[14];
		let deer6F = img[14];
		let deer1DEAD = img[15];
		let deer2DEAD = img[15];
		let deer3DEAD = img[15];
		let deer4DEAD = img[15];
		let deer5DEAD = img[15];
		let deer6DEAD = img[15];
//end deer images

		let squirrelF = img[16];
		let squirrel2F = img[16];
		let squirrelWALK =img[17];
		let squirrel1DEAD = img[18];
		let squirrel2DEAD = img[18];
	//end squirrel images

		let freakF = img[19];
		let freakWalk =img[20];
		let freakDEAD = img[21];
	//end freak images

		let bearF = img[22];
	//end bear images

		let health5 = img[23];
		let health4 = img[24];
		let health3 = img[25];
		let health2 = img[26];
		let health1 = img[27];
		let health0 = img[28];
//end ui images

		let bg1Layer = img[29];
	    let bg1Tree = img[30];
//end first page images

	    let bearTree = img[31];
	    let lowerLeaves =img[32];
	    let lowerSpear = img[33];
	    let stump2 = img[34];
//end second page images

	    let backTree = img[35];
	    let frontGrass = img[36];
	    let tree2 = img[37];
	    let bearTree2 = img[38];
	    let rock2 = img[39];
//end third page images

	    let caveEntrance = img[40];
	 	let bg4Layer = img[41];
//end fourth page images

	    let bg5Layer = img[42];
//end fifth page images

	    let bg6Layer = img[43];
//end sixth page images

	    let bg7Layer = img[44];
//end seventh page images

	    let bg8Layer = img[45];
//end eigth page images

	    let bg9Layer = img[46];
//end ninth page images

	    let bg10Layer = img[47];
//end tenth page images

	    let bg11Layer = img[48];
	    let bg11Light = img[49];
//end eleventh page images

	    let bg12CaveLeft = img[50];
	    let bg12CaveRight = img[51];
	    let bg12CaveSpike = img[52];
	    let bg12Wall = img[53];
	    let bg12Light = img[54];
	    let bg12CaveDark = img[55];
//end twelth page images

	    let bgCaveLight = new Image();
	bgCaveLight.src="assets/bgCaveLight.png";

	let player = {
		totalHealth:5,
		currentHealth:5,
		alive:true,
		canMove:true,
		walking:false,
		armor:false,
		isHit:false,
		damage:1,
		speed:2,
		x:400,
		y:350,
		yBox:450,
		hitxSide:430,
		sideW:35,
		frontW:80,
		h:209,
		hBox: 40,
		sprites:[zackLsheet,zackRsheet,zackBsheet,zackFsheet],
		shift:0,
		frameWidth:128,
		frameHeight:209,
		totalFrames: 21,
		currentFrame: 0,
		counter:0,
		ATTACKsprites:[ATTACKzackLsheet,ATTACKzackRsheet,ATTACKzackBsheet,ATTACKzackFsheet],
		ATTACKshift:0,
		ATTACKframeWidth:159,
		ATTACKframeHeight:209,
		ATTACKtotalFrames: 14,
		ATTACKcurrentFrame: 0,
		ATTACKcounter:0,
		page:0
	}; //end player object

	let axe ={
		x:0,
		y:0,
		hFront:60,
		wFront:150,
		hSide:60,
		wSide:90
	};//end axe object

	let sfxCounter ={
		one:0,
		two:0,
		three:0,
		four:0,
		sfx(){
			switch(true){
				case player.page == 4:
				case player.page == 5:
				case player.page == 6:
				case player.page == 7:
				case player.page == 8:
				this.one++;
				this.two++;
				this.three++;
				this.four++;
		
					if (this.four>=610) {
						$("#caveSFX4").trigger("play")
							.prop("volume", 0.3);
							this.four=0;
					}

					else if (this.one>=940) {
						$("#caveSFX1").trigger("play")
							.prop("volume", 0.3);
							this.one=0;
					}
					else if (this.two>=1590) {
						$("#caveSFX2").trigger("play")
							.prop("volume", 0.3);
							this.two=0;
					}
					else if (this.three>=2000) {
						$("#caveSFX3").trigger("play")
							.prop("volume", 0.3);
							this.three=0;
					}
			}
		} //end sfx.sfxCounter
}; //end sfxCounter

ENEMIES =[
 enemyD = {
	name:"Deer 1",
	type:"Deer",
	totalHealth:1,
	currentHealth:1,
	alive:true,
	isHit:false,
	damage:1,
	speed:1,
	x:20,
	y:500,
	sideW:25,
	frontW:75,
	h:75,
	sprites:[null,null,null,null],
	shift:0,
	frameWidth:0,
	frameHeight:0,
	totalFrames: 9,
	currentFrame: 0,
	counter:0,
	invuln:false,
	page:1
}, //end enemyD object

 enemyD2 = {
	name:"Deer 2",
	type:"Deer",
	totalHealth:1,
	currentHealth:1,
	alive:true,
	isHit:false,
	damage:1,
	speed:1,
	x:95,
	y:130,
	sideW:25,
	frontW:75,
	h:75,
	sprites:[null,null,null,null],
	shift:0,
	frameWidth:0,
	frameHeight:0,
	totalFrames: 9,
	currentFrame: 0,
	counter:0,
	invuln:false,
	page:1
}, //end enemyD object

 enemyD3 = {
	name:"Deer 3",
	type:"Deer",
	totalHealth:1,
	currentHealth:1,
	alive:true,
	isHit:false,
	damage:1,
	speed:1,
	x:850,
	y:165,
	sideW:25,
	frontW:75,
	h:75,
	sprites:[null,null,null,null],
	shift:0,
	frameWidth:0,
	frameHeight:0,
	totalFrames: 9,
	currentFrame: 0,
	counter:0,
	invuln:false,
	page:1
}, //end enemyD object

 enemyD4 = {
	name:"Deer 4",
	type:"Deer",
	totalHealth:1,
	currentHealth:1,
	alive:true,
	isHit:false,
	damage:1,
	speed:1,
	x:285,
	y:390,
	sideW:25,
	frontW:75,
	h:75,
	sprites:[null,null,null,null],
	shift:0,
	frameWidth:0,
	frameHeight:0,
	totalFrames: 9,
	currentFrame: 0,
	counter:0,
	invuln:false,
	page:2
}, //end enemyD4 object

 enemyD5 = {
	name:"Deer 5",
	type:"Deer",
	totalHealth:1,
	currentHealth:1,
	alive:true,
	isHit:false,
	damage:1,
	speed:1,
	x:550,
	y:215,
	sideW:25,
	frontW:75,
	h:75,
	sprites:[null,null,null,null],
	shift:0,
	frameWidth:0,
	frameHeight:0,
	totalFrames: 9,
	currentFrame: 0,
	counter:0,
	invuln:false,
	page:2
}, //end enemyD5 object

 enemyD6 = {
	name:"Deer 6",
	type:"Deer",
	totalHealth:1,
	currentHealth:1,
	alive:true,
	isHit:false,
	damage:1,
	speed:1,
	x:471,
	y:217,
	sideW:25,
	frontW:75,
	h:75,
	sprites:[null,null,null,null],
	shift:0,
	frameWidth:0,
	frameHeight:0,
	totalFrames: 9,
	currentFrame: 0,
	counter:0,
	invuln:false,
	page:5
}, //end enemyD5 object

 enemyS = {
	name:"Squirrel 1",
	type:"Squirrel",
	totalHealth:1,
	currentHealth:1,
	alive:true,
	isHit:false,
	enraged:false,
	damage:1,
	speed:2,
	x:680,
	y:120,
	frontW:75,
	h:75,
	sprites:[null,null,null,null],
	shift:0,
	frameWidth:0,
	frameHeight:0,
	totalFrames: 9,
	currentFrame: 0,
	counter:0,
	invuln:false,
	page:2
}, //end enemyS object

 enemyS2 = {
	name:"Squirrel 2",
	type:"Squirrel",
	totalHealth:1,
	currentHealth:1,
	alive:true,
	isHit:false,
	enraged:false,
	damage:1,
	speed:2,
	x:550,
	y:420,
	frontW:75,
	h:75,
	sprites:[null,null,null,null],
	shift:0,
	frameWidth:0,
	frameHeight:0,
	totalFrames: 9,
	currentFrame: 0,
	counter:0,
	invuln:false,
	page:2
}, //end enemyS2 object

 enemyS3 = {
	name:"The Freak",
	type:"Freak",
	totalHealth:2,
	currentHealth:2,
	alive:true,
	isHit:false,
	damage:1,
	speed:1,
	x:400,
	y:370,
	frontW:75,
	h:150,
	sprites:[null,null,null,null],
	shift:0,
	frameWidth:0,
	frameHeight:0,
	totalFrames: 9,
	currentFrame: 0,
	counter:0,
	invuln:false,
	page:2
}, //end enemyS3 object

 bear = {
	name:"The Bear",
	totalHealth:7,
	currentHealth:7,
	alive:true,
	isHit:false,
	damage:2,
	speed:30,
	x:890,
	y:30,
	frontW:341,
	h:511,
	sprites:[null,null,null,null],
	shift:0,
	frameWidth:0,
	frameHeight:0,
	totalFrames: 9,
	currentFrame: 0,
	counter: 0,
	invuln: false,
	moveCounter:0,
	speedcounter:0,
	page:9
} //end bear object

]//end ENEMIES array
let NUMBEROFENEMIES= ENEMIES.length;

      let draw = {
      	drawZackR() {
      	ctx.clearRect(player.x-26, player.y, player.frontW+56, player.h+20);
        ctx.drawImage(zackR, player.x, player.y);
      },

        drawZackF() {
        	ctx.clearRect(player.x-26, player.y, player.frontW+56, player.h+20);
        ctx.drawImage(zackF, player.x, player.y);
      },

      drawZackB() {
      	ctx.clearRect(player.x-26, player.y, player.frontW+56, player.h+20);
        ctx.drawImage(zackB, player.x, player.y);
      },

      drawZackL() {
      	ctx.clearRect(player.x-26, player.y, player.frontW+56, player.h+20);
        ctx.drawImage(zackL, player.x, player.y);
      },

      drawBg1Layer() { //page 1
      	if (player.y<=220 || player.x>=490) {
			ltx.drawImage(bg1Layer, 0, 0);
      	}
      },

      drawBg1Tree() {
      	if (player.y<=130) {
			ltx.drawImage(bg1Tree, 0, 0);
      	}
      },

      drawlowerLeaves() { //page 2
 			ltx.drawImage(lowerLeaves, 0, 249);
      },

      drawBearTree() {
 		if (player.y<=170) {
 			ltx.drawImage(bearTree, 0, 0);
 		}

  		if (enemyD3.y<=290|| enemyD.y<=290 || enemyD2.y<=290) {
 			eltx.drawImage(bearTree, 0, 0);
 		}
      },

      drawlowerSpear() {
 		if (player.x>=500 && player.y<=290) {
 			ltx.drawImage(lowerSpear, 0, 0);
 		}
      },

      drawStump2() {
 		if (player.y<=80) {
 			ltx.drawImage(stump2, 428, 206);
 		}

 		if (enemyD3.y<=200 || enemyD.y<=200 || enemyD2.y<=200) {
 			eltx.drawImage(stump2, 428, 206);
 		}
      },

      drawBackTree(){//page 3
      	ltx.drawImage(backTree, 0, 0);
      },

      drawFrontGrass(){
      	ltx.drawImage(frontGrass, 0, 0);
      },

      drawTree2(){
      	if (player.y<=165) {
      		ltx.drawImage(tree2, 0, 0);
      	}
      	if (enemyD4.y<=200 || enemyD5.y<=200 || enemyS.y<=200 || enemyS2.y<=200 || enemyS3.y<=200) {
      		eltx.drawImage(tree2, 0, 0);
      	}
      },

      drawBearTree2(){
      	if (player.y<=170) {
      		ltx.drawImage(bearTree2, 0, 0);
      	}
      	if (enemyD4.y<=278 || enemyD5.y<=278 || enemyS.y<=278 || enemyS2.y<=278 || enemyS3.y<=278) {
      		eltx.drawImage(bearTree2, 0, 0);
      	}
      },

      drawRock2(){
      	if (player.y<=110) {
      		ltx.drawImage(rock2, 0, 0);
      	}
      	if (enemyD4.y<=248 || enemyD5.y<=248 || enemyS.y<=248 || enemyS2.y<=248 || enemyS3.y<=248) {
      		eltx.drawImage(rock2, 0, 0);
      	}
      },

      drawCaveEntrance(){ //page 4
      	if (player.y<=10) {
      		ltx.drawImage(caveEntrance, 0, 0);
      	}
      },

      drawBg4Layer(){
      		ltx.drawImage(bg4Layer, 0, 0);
      },

      drawBgCaveLight(){//caves
      	ltx.drawImage(bgCaveLight, 0, 0);
      },

      drawBg5Layer(){//page 5
      	ltx.drawImage(bg5Layer, 0, 0);
      },

      drawBg6Layer(){//page 6
      	ltx.drawImage(bg6Layer, 0, 0);
      },

      drawBg7Layer(){//page 7
      	ltx.drawImage(bg7Layer, 0, 0);
      },

      drawBg8Layer(){//page 8
      	ltx.drawImage(bg8Layer, 0, 0);
      },

      drawBg9Layer(){//page 9
      	ltx.drawImage(bg9Layer, 0, 0);
      },

      drawBg10Layer(){//page 10
      	ltx.drawImage(bg10Layer, 0, 0);
      },

      drawBg11Layer(){//page 11
      	ltx.drawImage(bg11Layer, 0, 0);
      },

      drawBg11Light(){//page 11
      	ltx.drawImage(bg11Light, 0, 0);
      },

      drawBg12CaveLeft(){//page 12
      	ltx.drawImage(bg12CaveLeft, 0, 0);
      },

      drawBg12CaveRight(){
      	if (player.y<=230){
      	ltx.drawImage(bg12CaveRight, 0, 0);
      	}
      },

      drawBg12CaveSpike(){
      	if (player.y<=120){
      	ltx.drawImage(bg12CaveSpike, 0, 0);
      }
      },

      drawBg12Wall(){
      	ltx.drawImage(bg12Wall, 0, 0);
      },

      drawBg12Light(){
      	ltx.drawImage(bg12Light, 0, 0);
      },

      drawBg12CaveDark(){
      	ltx.drawImage(bg12CaveDark, 0, 0);
      },

      drawDeer1F(){
      	etx.clearRect(enemyD.x,enemyD.y,enemyD.frontW,enemyD.h+15);
      	ettx.clearRect(enemyD.x,enemyD.y,enemyD.frontW,enemyD.h+15);
      	if (enemyD.y<= player.yBox) {
      		 etx.drawImage(deerF, enemyD.x, enemyD.y);
      	}
      	else{
      		ettx.drawImage(deerF, enemyD.x, enemyD.y);
      	}
      }, //add images for enemies

      drawDeer2F(){
      	etx.clearRect(enemyD2.x,enemyD2.y,enemyD2.frontW,enemyD2.h+15);
      	ettx.clearRect(enemyD2.x,enemyD2.y,enemyD2.frontW,enemyD2.h+15);
      	if (enemyD2.y <= player.yBox) {
      		etx.drawImage(deer2F, enemyD2.x, enemyD2.y);
      	}
        else{
      		ettx.drawImage(deer2F, enemyD2.x, enemyD2.y);
      	}
      }, //add images for enemies

      drawDeer3F(){
      	etx.clearRect(enemyD3.x,enemyD3.y,enemyD3.frontW,enemyD3.h+15);
      	ettx.clearRect(enemyD3.x,enemyD3.y,enemyD3.frontW,enemyD3.h+15);
        if (enemyD3.y <= player.yBox) {
      		etx.drawImage(deer3F, enemyD3.x, enemyD3.y);
      	}
        else{
      		ettx.drawImage(deer3F, enemyD3.x, enemyD3.y);
      	}
      }, //add images for enemies

      drawDeer4F(){
        	etx.clearRect(enemyD4.x,enemyD4.y,enemyD4.frontW,enemyD4.h+15);
      		ettx.clearRect(enemyD4.x,enemyD4.y,enemyD4.frontW,enemyD4.h+15);
        if (enemyD4.y <= player.yBox) {
      		etx.drawImage(deer4F, enemyD4.x, enemyD4.y);
      	}
        else{
      		ettx.drawImage(deer4F, enemyD4.x, enemyD4.y);
      	}
      }, //add images for enemies

      drawDeer5F(){
      	etx.clearRect(enemyD5.x,enemyD5.y,enemyD5.frontW,enemyD5.h+15);
      	ettx.clearRect(enemyD5.x,enemyD5.y,enemyD5.frontW,enemyD5.h+15);
        if (enemyD5.y <= player.yBox) {
      		etx.drawImage(deer5F, enemyD5.x, enemyD5.y);
      	}
        else{
      		ettx.drawImage(deer5F, enemyD5.x, enemyD5.y);
      	}
      }, //add images for enemies

      drawDeer6F(){
        	etx.clearRect(enemyD6.x,enemyD6.y,enemyD6.frontW,enemyD6.h+15);
        	ettx.clearRect(enemyD6.x,enemyD6.y,enemyD6.frontW,enemyD6.h+15);
        if (enemyD6.y <= player.yBox) {
      		etx.drawImage(deer6F, enemyD6.x, enemyD6.y);
      	}
        else{
      		ettx.drawImage(deer6F, enemyD6.x, enemyD6.y);
      	}
      }, //add images for enemies

      drawDeerLEFT(enemy){
      	etx.clearRect(enemy.x,enemy.y,enemy.frontW,enemy.h);
      	ettx.clearRect(enemy.x,enemy.y,enemy.frontW,enemy.h);
      	if (enemy.y <= player.yBox) {
      		etx.drawImage(deerLEFT, enemy.x, enemy.y);
      	}
        else{
      		ettx.drawImage(deerLEFT, enemy.x, enemy.y);
      	}
      }, //add images for enemies

      drawDeerRIGHT(enemy){
      	etx.clearRect(enemy.x,enemy.y,enemy.frontW,enemy.h);
      	ettx.clearRect(enemy.x,enemy.y,enemy.frontW,enemy.h);
     	if (enemy.y <= player.yBox) {
      		etx.drawImage(deerRIGHT, enemy.x, enemy.y);
      	}
        else{
      		ettx.drawImage(deerRIGHT, enemy.x, enemy.y);
      	}
      }, //add images for enemies

      drawDeer1DEAD(){
      	etx.clearRect(enemyD.x,enemyD.y,enemyD.frontW,enemyD.h);
        etx.drawImage(deer1DEAD, enemyD.x, enemyD.y);
      }, //add images for enemies

      drawDeer2DEAD(){
      	etx.clearRect(enemyD2.x,enemyD2.y,enemyD2.frontW,enemyD2.h);
        etx.drawImage(deer2DEAD, enemyD2.x, enemyD2.y);
      }, //add images for enemies

      drawDeer3DEAD(){
      	etx.clearRect(enemyD3.x,enemyD3.y,enemyD3.frontW,enemyD3.h);
        etx.drawImage(deer3DEAD, enemyD3.x, enemyD3.y);
      }, //add images for enemies

      drawDeer4DEAD(){
      	etx.clearRect(enemyD4.x,enemyD4.y,enemyD4.frontW,enemyD4.h);
        etx.drawImage(deer4DEAD, enemyD4.x, enemyD4.y);
      }, //add images for enemies

      drawDeer5DEAD(){
      	etx.clearRect(enemyD5.x,enemyD5.y,enemyD5.frontW,enemyD5.h);
        etx.drawImage(deer5DEAD, enemyD5.x, enemyD5.y);
      }, //add images for enemies

      drawDeer6DEAD(){
      	etx.clearRect(enemyD6.x,enemyD6.y,enemyD6.frontW,enemyD6.h);
        etx.drawImage(deer6DEAD, enemyD6.x, enemyD6.y);
      }, //add images for enemies

      drawSquirrel1F(){
        	etx.clearRect(enemyS.x,enemyS.y,enemyS.frontW,enemyS.h+15);
        	ettx.clearRect(enemyS.x,enemyS.y,enemyS.frontW,enemyS.h+15);
      	if (enemyS.y<= player.yBox) {
      		etx.drawImage(squirrelF, enemyS.x, enemyS.y);
      	}
      	else{
      		ettx.drawImage(squirrelF, enemyS.x, enemyS.y);
      	}
      }, //add images for enemies

      drawSquirrel2F(){
        	etx.clearRect(enemyS2.x,enemyS2.y,enemyS2.frontW,enemyS2.h+15);
        	ettx.clearRect(enemyS2.x,enemyS2.y,enemyS2.frontW,enemyS2.h+15);
      	if (enemyS2.y<= player.yBox) {
      		etx.drawImage(squirrel2F, enemyS2.x, enemyS2.y);
      	}
      	else{
      		ettx.drawImage(squirrel2F, enemyS2.x, enemyS2.y);
      	}
      }, //add images for enemies

      drawSquirrelWALK(enemy){
      	etx.clearRect(enemy.x,enemy.y,enemy.frontW,enemy.h+15);
      	ettx.clearRect(enemy.x,enemy.y,enemy.frontW,enemy.h+15);
      	if (enemy.y<= player.yBox) {
      		etx.drawImage(squirrelWALK, enemy.x, enemy.y);
      	}
      	else{
      		ettx.drawImage(squirrelWALK, enemy.x, enemy.y);
      	}
      },

      drawSquirrel1DEAD(){
        etx.drawImage(squirrel1DEAD, enemyS.x, enemyS.y);
      }, //add images for enemies

      drawSquirrel2DEAD(){
        etx.drawImage(squirrel2DEAD, enemyS2.x, enemyS2.y);
      }, //add images for enemies

      drawFreakF(){
        	etx.clearRect(enemyS3.x,enemyS3.y,enemyS3.frontW,enemyS3.h+15);
        	ettx.clearRect(enemyS3.x,enemyS3.y,enemyS3.frontW,enemyS3.h+15);
      	if (enemyS3.y<= player.yBox) {
      		etx.drawImage(freakF, enemyS3.x, enemyS3.y);
      	}
      	else{
      		ettx.drawImage(freakF, enemyS3.x, enemyS3.y);
      	}
      }, //add images for enemies

      drawFreakWalk(){
        	etx.clearRect(enemyS3.x,enemyS3.y,enemyS3.frontW,enemyS3.h+15);
        	ettx.clearRect(enemyS3.x,enemyS3.y,enemyS3.frontW,enemyS3.h+15);
      	if (enemyS3.y<= player.yBox) {
      		etx.drawImage(freakWalk, enemyS3.x, enemyS3.y);
      	}
      	else{
      		ettx.drawImage(freakWalk, enemyS3.x, enemyS3.y);
      	}
      }, //add images for enemies

      drawFreakDEAD(){
        etx.drawImage(freakDEAD, enemyS3.x, enemyS3.y+50); //change if height changes
      }, //add images for enemies

      drawBearF(){
      	etx.clearRect(bear.x-90, bear.y, bear.frontW+100, bear.h);
      	etx.drawImage(bearF, bear.x-90, bear.y);
      }
      }; //end draw

	let game = {
		 start(){
		setInterval(function(){
			InitKeyboard();
			movement();
			drawOverLays();
			enemyDraw();
		},16);
	}
	}; //end game object

function music(){
	switch(true){
		case player.alive == false:
		stopAudio(".music");
		stopAudio(".sfx");
		$("#death").trigger("play");
		$("#deathZ").trigger("play");
		break;
		case player.page == 0:
			$("#main").trigger("play")
					.prop("volume",0.8);
		break;

		case player.page == 1:
		if (enemyS3.alive== false && main2PLAYING==false) {
			stopAudio("#main");
			$("#main2").trigger("play")
					.prop("volume",0.8);
			main2PLAYING = true;
		} //end if main2
		else if (main2PLAYING == false) {
			$("#main").prop("volume",0.8);
		}
			stopAudio("#wind1");
		break;

		case player.page == 2:
		if (enemyS3.alive== false && main2PLAYING==false) {
			stopAudio("#main");
			$("#transition").trigger("play");
		delaysfx(function(){
			$("#main2").trigger("play")
						.prop("volume",0.8);
		},1500);
			main2PLAYING = true;
		} //end if main2
		break;

		case player.page == 3:
		if (enemyS3.alive== false && main2PLAYING==false) {
			stopAudio("#main");
			$("#main2").trigger("play")
					.prop("volume",0.8);
			main2PLAYING = true;
		} //end if main2
		else if (main2PLAYING) {
			$("#main2").trigger("play")
					.prop("volume",0.2);
		}
		else if (main2PLAYING == false) {
			$("#main").trigger("play")
					.prop("volume",0.2);
		}
			stopAudio("#cave");
			$("#wind1").trigger("play")
					.prop("volume",1);
		break;

		case player.page == 4:
		if (player.y>=400) {
			$("#caveSFX5").trigger("play")
							.prop("volume", 0.3);
		}
		$("#main2").trigger("play")
					.prop("volume",0.2);
			$("#wind1").prop("volume", 0.5);
		break;

		case player.page == 5:
		stopAudio("#main2");
			$("#wind1").trigger("play")
					.prop("volume", 0.2);
		break;

		case player.page == 6:
			stopAudio("#wind1");
		break;

		case player.page == 9:
			stopAudio(".music");
			if (bear.currentHealth == bear.totalHealth) { //new fix
				$("#bossEnter").trigger("play");
				$("#laughTube").trigger("play");
			}
		break;

		case player.page == 10:
			stopAudio("#bossEnter");
			stopAudio("#laughTube");
		break;

		case player.page == 11:
			stopAudio("#bossEnter");
			$("#main3").trigger("play");
		break;
	}
}//end music

function animate(sheet, i) {
	sheet.counter++;
		ctx.clearRect(player.x-36, player.y, player.frontW+75, player.h+20);
        ctx.drawImage(sheet.sprites[i],sheet.shift,0,sheet.frameWidth,sheet.frameHeight, sheet.x-20, sheet.y,sheet.frameWidth, sheet.frameHeight); //check on the -20
 	if (sheet.counter==4) {//change for animation speed
		sheet.counter=0;
  sheet.shift += sheet.frameWidth;
  sheet.currentFrame++;
	}//end counter
	  if (sheet.currentFrame == sheet.totalFrames) {
    sheet.shift = 0;
    sheet.currentFrame = 0;
  }//end reset
}//end animate

function ATTACKanimate(sheet, i, side) { //maybe add parameter so there dosnt need to be 2 animation functions for zack
	sheet.ATTACKcounter++;
		ctx.clearRect(player.x-36, player.y, player.frontW+75, player.h+20);
        ctx.drawImage(sheet.ATTACKsprites[i],sheet.ATTACKshift,0,sheet.ATTACKframeWidth,sheet.ATTACKframeHeight, sheet.x-35, sheet.y+10,sheet.ATTACKframeWidth, sheet.ATTACKframeHeight); //check on the x and y adjustments
 	if (sheet.ATTACKcounter==2) {//change for animation speed
		sheet.ATTACKcounter=0;
  sheet.ATTACKshift += sheet.ATTACKframeWidth;
  sheet.ATTACKcurrentFrame++;
	}//end counter
	  if (sheet.ATTACKcurrentFrame >= sheet.ATTACKtotalFrames) {
	  	attack = false;
		side(); //changethis to idle
  }//end reset
}//end ATTACKanimate

function animateENEMY(sheet, i) {
	sheet.counter++;
		etx.clearRect(0,0,canvas.width,canvas.height);
        etx.drawImage(sheet.sprites[i],sheet.shift,0,sheet.frameWidth,sheet.frameHeight, sheet.x, sheet.y,sheet.frameWidth, sheet.frameHeight);
 	if (sheet.counter==4) {//change for animation speed
		sheet.counter=0;
  sheet.shift += sheet.frameWidth;
  sheet.currentFrame++;
	}//end counter
	  if (sheet.currentFrame == sheet.totalFrames) {
    sheet.shift = 0;
    sheet.currentFrame = 0;
  }//end reset
}//end animateENEMY

function movement(){
	if (player.canMove){
	switch(true){

	case attack ===true:
	player.walking = false;
	console.log(player.x +" player.x "+ player.y+" player.y");
	$("#miss").trigger("play");
	switch(true){

		case kstate[0]:
		for (let i = ENEMIES.length - 1; i >= 0; i--) {
			enemyCollisionSide(ENEMIES[i]);
		}
	if (player.ATTACKcurrentFrame <= player.ATTACKtotalFrames) {
		ATTACKanimate(player, 0, draw.drawZackL); //maybe get rid of this side parameter, but might help with idles
	if (player.ATTACKcurrentFrame >= 6) {
		axhbox(axe.x = player.x-20, axe.y = player.yBox+10, axe.wSide, axe.hSide); //maybe change
		atx.stroke();
		for (let i = ENEMIES.length - 1; i >= 0; i--) {
			axeCollisionSide(ENEMIES[i]);
		}
	}
}
		break;

		case kstate[1]:
		for (let i = ENEMIES.length - 1; i >= 0; i--) {
			enemyCollisionSide(ENEMIES[i]);
		}
if (player.ATTACKcurrentFrame <= player.ATTACKtotalFrames) {
		ATTACKanimate(player, 1, draw.drawZackR);
	if (player.ATTACKcurrentFrame >= 6) {
		axhbox(axe.x = player.x+20, axe.y = player.yBox+10, axe.wSide, axe.hSide);
		atx.stroke();
		for (let i = ENEMIES.length - 1; i >= 0; i--) {
			axeCollisionSide(ENEMIES[i]);
		}
	}
}
		break;

		case kstate[2]:
		for (let i = ENEMIES.length - 1; i >= 0; i--) {
			enemyCollisionFront(ENEMIES[i]);
		}
if (player.ATTACKcurrentFrame <= player.ATTACKtotalFrames) {
		ATTACKanimate(player, 2, draw.drawZackB);
	if (player.ATTACKcurrentFrame >= 6) {
		axhbox(axe.x = player.x-35, axe.y = player.yBox-20, axe.wFront, axe.hFront);
		atx.stroke();
		for (let i = ENEMIES.length - 1; i >= 0; i--) {
			axeCollisionFront(ENEMIES[i]);
		}
	}
}
		break;

		case kstate[3]:
		for (let i = ENEMIES.length - 1; i >= 0; i--) {
			enemyCollisionFront(ENEMIES[i]);
		}
if (player.ATTACKcurrentFrame <= player.ATTACKtotalFrames) {
		ATTACKanimate(player, 3, draw.drawZackF);
	if (player.ATTACKcurrentFrame >= 6) {
		axhbox(axe.x = player.x-35, axe.y = player.y+130, axe.wFront, axe.hFront);
		atx.stroke();
		for (let i = ENEMIES.length - 1; i >= 0; i--) {
			axeCollisionFront(ENEMIES[i]);
		}
	}
}
		break;



		case faceState[0]:
		for (let i = ENEMIES.length - 1; i >= 0; i--) {
			enemyCollisionSide(ENEMIES[i]);
		}
	if (player.ATTACKcurrentFrame <= player.ATTACKtotalFrames) {
		ATTACKanimate(player, 0, draw.drawZackL); //maybe get rid of this side parameter, but might help with idles
	if (player.ATTACKcurrentFrame >= 6) {
		axhbox(axe.x = player.x-20, axe.y = player.yBox+10, axe.wSide, axe.hSide); //maybe change
		atx.stroke();
		for (let i = ENEMIES.length - 1; i >= 0; i--) {
			axeCollisionSide(ENEMIES[i]);
		}
	}
}
		break;

		case faceState[1]:
		for (let i = ENEMIES.length - 1; i >= 0; i--) {
			enemyCollisionSide(ENEMIES[i]);
		}
if (player.ATTACKcurrentFrame <= player.ATTACKtotalFrames) {
		ATTACKanimate(player, 1, draw.drawZackR);
	if (player.ATTACKcurrentFrame >= 6) {
		axhbox(axe.x = player.x+20, axe.y = player.yBox+10, axe.wSide, axe.hSide);
		atx.stroke();
		for (let i = ENEMIES.length - 1; i >= 0; i--) {
			axeCollisionSide(ENEMIES[i]);
		}
	}
}
		break;

		case faceState[2]:
		for (let i = ENEMIES.length - 1; i >= 0; i--) {
			enemyCollisionFront(ENEMIES[i]);
		}
if (player.ATTACKcurrentFrame <= player.ATTACKtotalFrames) {
		ATTACKanimate(player, 2, draw.drawZackB);
	if (player.ATTACKcurrentFrame >= 6) {
		axhbox(axe.x = player.x-35, axe.y = player.yBox-20, axe.wFront, axe.hFront);
		atx.stroke();
		for (let i = ENEMIES.length - 1; i >= 0; i--) {
			axeCollisionFront(ENEMIES[i]);
		}
	}
}
		break;

		case faceState[3]:
		for (let i = ENEMIES.length - 1; i >= 0; i--) {
			enemyCollisionFront(ENEMIES[i]);
		}
if (player.ATTACKcurrentFrame <= player.ATTACKtotalFrames) {
		ATTACKanimate(player, 3, draw.drawZackF);
	if (player.ATTACKcurrentFrame >= 6) {
		axhbox(axe.x = player.x-35, axe.y = player.y+130, axe.wFront, axe.hFront);
		atx.stroke();
		for (let i = ENEMIES.length - 1; i >= 0; i--) {
			axeCollisionFront(ENEMIES[i]);
		}
	}
}
		break;
	}//end switch
atx.clearRect(player.x-36, player.y, player.frontW+75, player.h+20);
	break;

	case kstate[0]===true:
		player.ATTACKshift = 0;
    player.ATTACKcurrentFrame = 0;
	console.log("left");
	pageCOLLISIONleft();											 
		for (let i = ENEMIES.length - 1; i >= 0; i--) {
			enemyCollisionSide(ENEMIES[i]);
		}
if (player.canMove && player.walking) {
		switch(true){
			case player.page ==0:
			if (player.x<=365 && player.y<=243) {
				$("#woodStepsZ").trigger("play");
				stopAudio("#grassStepsZ");
			}
			else{
				$("#grassStepsZ").trigger("play");
				stopAudio("#woodStepsZ");
			}
				stopAudio("#caveStepsZ");
			break;

			case player.page == 11:
			$("#woodStepsZ").trigger("play");
				stopAudio("#caveStepsZ");
			break;

			case player.page == 12:
			if (player.x<=365 && player.y<=243) {
				$("#woodStepsZ").trigger("play");
				stopAudio("#grassStepsZ");
			}
			else{
				$("#grassStepsZ").trigger("play");
				stopAudio("#woodStepsZ");
			}
				stopAudio("#caveStepsZ");
			break;

			case player.page <=3:
			$("#grassStepsZ").trigger("play");
				stopAudio("#caveStepsZ");
			break;

			case player.page >=4:
			$("#caveStepsZ").trigger("play");
				stopAudio("#grassStepsZ");
			break;
		}
}
else{
	stopAudio("#grassStepsZ");
	stopAudio("#woodStepsZ");
	stopAudio("#caveStepsZ");
}
	switch(true){
	case player.page == 2:
	case player.page == 5:
	case player.page == 6:
	case player.page == 7:
	case player.page == 8:
		if (player.hitxSide <=0) {
			fade();
		pageTransitionLeft(player.page);
	}
	break;

}// end kstate[0] switch

	break;

	case kstate[1] ===true:
		player.ATTACKshift = 0;
    player.ATTACKcurrentFrame = 0;
	console.log("right");
	pageCOLLISIONright();
		for (let i = ENEMIES.length - 1; i >= 0; i--) {
			enemyCollisionSide(ENEMIES[i]);
		}
if (player.canMove && player.walking) {
		switch(true){
			case player.page ==0:
			if (player.x<=365 && player.y<=243) {
				$("#woodStepsZ").trigger("play");
				stopAudio("#grassStepsZ");
			}
			else{
				$("#grassStepsZ").trigger("play");
				stopAudio("#woodStepsZ");
			}
				stopAudio("#caveStepsZ");
			break;

			case player.page == 11:
			$("#woodStepsZ").trigger("play");
				stopAudio("#caveStepsZ");
			break;

			case player.page == 12:
			if (player.x<=365 && player.y<=243) {
				$("#woodStepsZ").trigger("play");
				stopAudio("#grassStepsZ");
			}
			else{
				$("#grassStepsZ").trigger("play");
				stopAudio("#woodStepsZ");
			}
				stopAudio("#caveStepsZ");
			break;

			case player.page <=3:
			$("#grassStepsZ").trigger("play");
				stopAudio("#caveStepsZ");
			break;

			case player.page >=4:
			$("#caveStepsZ").trigger("play");
				stopAudio("#grassStepsZ");
			break;
		}
}
else{
	stopAudio("#grassStepsZ");
	stopAudio("#woodStepsZ");
	stopAudio("#caveStepsZ");
}
	switch(true){
	case player.page == 1:
	case player.page == 4:
	case player.page == 5:
	case player.page == 6:
	case player.page == 7:
	case player.page == 8:
	case player.page == 10:
	case player.page == 11:
		if (player.hitxSide >= 764) {
			fade();
		pageTransitionRight(player.page);
	}
	break;

	case player.page == 9:
		if (player.hitxSide >= 764 && !bear.alive) {
			fade();
		pageTransitionRight(player.page);
	}
	break;


}// end kstate[1] switch
	break;

	case kstate[2] ===true:
	player.ATTACKshift = 0;
    player.ATTACKcurrentFrame = 0;
    	for (let i = ENEMIES.length - 1; i >= 0; i--) {
			enemyCollisionFront(ENEMIES[i]);
		}
	if (player.page != 9) { //change for boss maybe

	console.log("up");
	pageCOLLISIONup();
if (player.canMove && player.walking) {
		switch(true){
			case player.page ==0:
			if (player.x<=365 && player.y<=243) {
				$("#woodStepsZ").trigger("play");
				stopAudio("#grassStepsZ");
			}
			else{
				$("#grassStepsZ").trigger("play");
				stopAudio("#woodStepsZ");
			}
				stopAudio("#caveStepsZ");
			break;

			case player.page == 11:
			$("#woodStepsZ").trigger("play");
				stopAudio("#caveStepsZ");
			break;

			case player.page == 12:
			if (player.x<=365 && player.y<=243) {
				$("#woodStepsZ").trigger("play");
				stopAudio("#grassStepsZ");
			}
			else{
				$("#grassStepsZ").trigger("play");
				stopAudio("#woodStepsZ");
			}
				stopAudio("#caveStepsZ");
			break;

			case player.page <=3:
			$("#grassStepsZ").trigger("play");
				stopAudio("#caveStepsZ");
			break;

			case player.page >=4:
			$("#caveStepsZ").trigger("play");
				stopAudio("#grassStepsZ");
			break;
		}
}
else{
	stopAudio("#grassStepsZ");
	stopAudio("#woodStepsZ");
	stopAudio("#caveStepsZ");
}
	switch(true){
		case player.page ===0:
	if (player.y <= -80 && player.x>=370 && player.x<=580) {
		fadeLong();
		pageTransitionUp(player.page);
	}
	break;

	case player.page ==1:
	if (player.y <= -80 && player.x>=290 && player.x<=410) {
		fade();
		pageTransitionUp(player.page);
	}
	break;

	case player.page ==3:
	if (player.y <= -80 && player.x>=320 && player.x<=410) {
		if (NUMBEROFENEMIES <= 2) {
			fade();
			pageTransitionUp(player.page);
		}
	}
	break;

}// end kstate[2] switch
}//end boss if
	else{
		draw.drawZackB();
		}
	break;

	case kstate[3] ===true:
	player.ATTACKshift = 0;
    player.ATTACKcurrentFrame = 0;
    	for (let i = ENEMIES.length - 1; i >= 0; i--) {
			enemyCollisionFront(ENEMIES[i]);
		}
	if (player.page != 9) { //change for boss maybe

	console.log("down");
	pageCOLLISIONdown();
if (player.canMove && player.walking) {
		switch(true){
			case player.page ==0:
			if (player.x<=365 && player.y<=243) {
				$("#woodStepsZ").trigger("play");
				stopAudio("#grassStepsZ");
			}
			else{
				$("#grassStepsZ").trigger("play");
				stopAudio("#woodStepsZ");
			}
				stopAudio("#caveStepsZ");
			break;

			case player.page == 11:
			$("#woodStepsZ").trigger("play");
				stopAudio("#caveStepsZ");
			break;

			case player.page == 12:
			if (player.x<=365 && player.y<=243) {
				$("#woodStepsZ").trigger("play");
				stopAudio("#grassStepsZ");
			}
			else{
				$("#grassStepsZ").trigger("play");
				stopAudio("#woodStepsZ");
			}
				stopAudio("#caveStepsZ");
			break;

			case player.page <=3:
			$("#grassStepsZ").trigger("play");
				stopAudio("#caveStepsZ");
			break;

			case player.page >=4:
			$("#caveStepsZ").trigger("play");
				stopAudio("#grassStepsZ");
			break;
		}
}
else{
	stopAudio("#grassStepsZ");
	stopAudio("#woodStepsZ");
	stopAudio("#caveStepsZ");
}
	switch(true){
	case player.page ==3:
	case player.page ==4:
	if (player.y >= 480) {
		fade();
		pageTransitionDown(player.page);
	}
	break;

}// end kstate[3] switch
}//end boss if
	else{
		draw.drawZackF();
	}
	break;

	case attack ===false:
	player.walking = false;
	stopAudio("#grassStepsZ");
	stopAudio("#woodStepsZ");
	stopAudio("#caveStepsZ");
	player.ATTACKshift = 0;
    player.ATTACKcurrentFrame = 0;
    player.shift = 0;
    player.currentFrame = 0;
		switch(true){
		case faceState[0]:
		for (let i = ENEMIES.length - 1; i >= 0; i--) {
			enemyCollisionSide(ENEMIES[i]);
		}
		draw.drawZackL();
		hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
		break;

		case faceState[1]:
		for (let i = ENEMIES.length - 1; i >= 0; i--) {
			enemyCollisionSide(ENEMIES[i]);
		}
		draw.drawZackR();
		hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
		break;

		case faceState[2]:
		for (let i = ENEMIES.length - 1; i >= 0; i--) {
			enemyCollisionFront(ENEMIES[i]);
		}
		draw.drawZackB();
		hbox(player.x,player.yBox,player.frontW,player.hBox);
		break;

		case faceState[3]:
		for (let i = ENEMIES.length - 1; i >= 0; i--) {
			enemyCollisionFront(ENEMIES[i]);
		}
		draw.drawZackF();
		hbox(player.x,player.yBox,player.frontW,player.hBox);
		break;
	}//end switch
	break;
	default:
	if (faceState==[0] || faceState ==[1]) {
		for (let i = ENEMIES.length - 1; i >= 0; i--) {
			enemyCollisionSide(ENEMIES[i]);
		}
	}
	else{
		for (let i = ENEMIES.length - 1; i >= 0; i--) {
			enemyCollisionFront(ENEMIES[i]);
		}
	}
	break;
}
ui();
sfxCounter.sfx();
}//end if canMove
}//end movement

function drawOverLays(){
	ltx.clearRect(0,0,canvas.width,canvas.height);
	eltx.clearRect(0,0,canvas.width,canvas.height);
	switch(true){
		case player.page ===0:
		case player.page ==12:
		draw.drawBg1Layer();
		draw.drawBg1Tree();
		break;

		case player.page ==1:
		draw.drawBearTree();
		draw.drawStump2();
		draw.drawlowerLeaves();
		draw.drawlowerSpear();
		break;

		case player.page ==2:
		draw.drawBackTree();
		draw.drawFrontGrass();
		draw.drawTree2();
		draw.drawBearTree2();
		draw.drawRock2();
		break;

		case player.page ==3:
		draw.drawCaveEntrance();
		draw.drawBg4Layer();
		break;

		case player.page ==4:
		draw.drawBg5Layer();
		draw.drawBgCaveLight();
		break;

		case player.page ==5:
		draw.drawBg6Layer();
		draw.drawBgCaveLight();
		break;

		case player.page ==6:
		draw.drawBg7Layer();
		draw.drawBgCaveLight();
		break;

		case player.page ==7:
		draw.drawBg8Layer();
		draw.drawBgCaveLight();
		break;

		case player.page ==8:
		draw.drawBg9Layer();
		draw.drawBgCaveLight();
		break;

		case player.page ==9:
		draw.drawBg10Layer();
		draw.drawBgCaveLight();
		break;

		case player.page ==10:
		draw.drawBg11Layer();
		draw.drawBg11Light();
		break;

		case player.page ==11:
		draw.drawBg12CaveLeft();
		draw.drawBg12CaveRight();
		draw.drawBg12CaveSpike();
		draw.drawBg12Wall();
		draw.drawBg12Light();
		draw.drawBg12CaveDark();
		break;
	}
}//end drawOverlays

function pageCOLLISIONleft(){
	switch(true){
		case player.page ===0:
		case player.page ==12:
			if (player.x>=350 && player.x<=372 && player.y<=240) {//right wall
				hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
				draw.drawZackL();
				player.walking = false;
				return false;
			}
			if (player.x>=0 && player.x<=145 && player.y<=263 && player.y>=218) {//logs and door
				hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
				draw.drawZackL();
				player.walking = false;
				return false;
			}
			if (player.x>=0 && player.x<=150 && player.y<=52 && player.y>=0) {//table
				hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
				draw.drawZackL();
				player.walking = false;
				return false;
			}
		break;
		case player.page == 1:
			if (player.x<=300 && player.y<=-5 && player.y>=-100) {//upper tree
				hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
				draw.drawZackL();
				player.walking = false;
				return false;
			}

			if (player.x<=180 && player.y<=190 && player.y>=150) {//bear tree rock
				hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
				draw.drawZackL();
				player.walking = false;
				return false;
			}

			if (player.x>=510 && player.x<=520 && player.y>=60 && player.y<=133) {//stump2
				hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
				draw.drawZackL();
				player.walking = false;
				return false;
			}

		break;

		case player.page == 2:
			if (player.x<=75 && player.y>=105 && player.y<=180) {//left tree
				hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
				draw.drawZackL();
				player.walking = false;
				return false;
			}

			if (player.x<=10 && player.y>=165) {//left rock wall
				hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
				draw.drawZackL();
				player.walking = false;
				return false;
			}

			if (player.x>=600 && player.x<=615 && player.y>=110 && player.y<=133) {//rock
				hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
				draw.drawZackL();
				player.walking = false;
				return false;
			}

		break;

		case player.page == 3:
			if (player.x<=226) {//forest end
				hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
				draw.drawZackL();
				player.walking = false;
				return false;
			}

			if (player.x<=322 && player.y<=48) {//top right
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackL();
				player.walking = false;
				return false;
			}
		break;

		case player.page == 4:
			if (player.x<=60) {//wall
				hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
				draw.drawZackL();
				player.walking = false;
				return false;
			}
		break;

		case player.page == 5:
			if (player.x<=102 && player.y >=200) {//bottom left wall
				hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
				draw.drawZackL();
				player.walking = false;
				return false;
			}
		break;

		case player.page == 6:
			if (player.x<=102 && player.y >=200) {//bottom left wall
				hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
				draw.drawZackL();
				player.walking = false;
				return false;
			}
		break;

		case player.page == 7:
			if (player.y<=155 && player.y>=102 && player.x<=152) {//starting rocks left
				hbox(player.x,player.yBox,player.sideW,player.hBox);
				draw.drawZackL();
				player.walking = false;
				return false;
			}
		break;

		case player.page == 8:
			if (player.y>=153 && player.x<=112) {//starting rocks left
				hbox(player.x,player.yBox,player.sideW,player.hBox);
				draw.drawZackL();
				player.walking = false;
				return false;
			}
		break;

		case player.page == 10:
			if (player.y>=198 && player.y<=248 && player.x<=138) {//starting rocks left
				hbox(player.x,player.yBox,player.sideW,player.hBox);
				draw.drawZackL();
				player.walking = false;
				return false;
			}
		break;

		case player.page == 11:
			if (player.y<=53 && player.x<=487) {//bed
				hbox(player.x,player.yBox,player.sideW,player.hBox);
				draw.drawZackL();
				player.walking = false;
				return false;
			}

			if (player.y<=220 && player.x<=135) {//behind cave left
				hbox(player.x,player.yBox,player.sideW,player.hBox);
				draw.drawZackL();
				player.walking = false;
				return false;
			}

			if (player.y<=279 && player.y>=217 && player.x<=300) {//cave front left
				hbox(player.x,player.yBox,player.sideW,player.hBox);
				draw.drawZackL();
				player.walking = false;
				return false;
			}

			if (player.y<=143 && player.y>=107 && player.x<=503 && player.x>=500) {//spike left
				hbox(player.x,player.yBox,player.sideW,player.hBox);
				draw.drawZackL();
				player.walking = false;
				return false;
			}
		break;

	}//end switch
	if (player.hitxSide>=1) {
			animate(player,0);
		hbox(player.hitxSide-=player.speed,player.yBox,player.sideW,player.hBox);
		player.x-=player.speed;
		player.walking = true;
	}
	else{
		draw.drawZackL();
		hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
		player.walking = false;
	}
} //end pageCOLLISIONleft

function pageCOLLISIONright(){
	switch(true){
		case player.page ===0:
		case player.page ==12:
			if (player.x>=280 && player.x<=312 && player.y<=240) {//right wall
				hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
				draw.drawZackR();
				player.walking = false;
				return false;
			}

			if (player.x>=180 && player.x<=312 && player.y>=218 && player.y<=240) {//help wall
				hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
				draw.drawZackR();
				player.walking = false;
				return false;
			}

			if (player.x>=520 && player.y>=318) {//stump
				hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
				draw.drawZackR();
				player.walking = false;
				return false;
			}

			if (player.x>=590 && player.y>=50 && player.y<=215) {//rocks
				hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
				draw.drawZackR();
				player.walking = false;
				return false;
			}
		break;
		case player.page == 1:
			if (player.x>=630 && player.y>=342) {//under rocks
				hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
				draw.drawZackR();
				player.walking = false;
				return false;
			}

			if (player.x>=580 && player.y<=340 && player.y>=270) {//lower rocks
				hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
				draw.drawZackR();
				player.walking = false;
				return false;
			}

			if (player.x>=630 && player.y<=269 && player.y>=193) {//middle rocks
				hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
				draw.drawZackR();
				player.walking = false;
				return false;
			}

			if (player.x>=670 && player.y<=191 && player.y>=104) {//high rocks
				hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
				draw.drawZackR();
				player.walking = false;
				return false;
			}

			if (player.x>=400 && player.y<=-5 && player.y>=-100) {//upper tree
				hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
				draw.drawZackR();
				player.walking = false;
				return false;
			}

			if (player.x>=360 && player.x<=370 && player.y>=60 && player.y<=133) {//stump2
				hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
				draw.drawZackR();
				player.walking = false;
				return false;
			}
		break;

		case player.page == 2:
			if (player.x>=375 && player.x<=400 && player.y>=110 && player.y<=133) {//rock
				hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
				draw.drawZackR();
				player.walking = false;
				return false;
			}

			if (player.x>=600 && player.y>=167 && player.y<=197) {//bear tree 2
				hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
				draw.drawZackR();
				player.walking = false;
				return false;
			}

		break;

		case player.page == 3:
			if (player.x>=544) {//forest end
				hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
				draw.drawZackR();
				player.walking = false;
				return false;
			}

			if (player.x>=460 && player.y>=407) {// thicket
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackR();
				player.walking = false;
				return false;
			}

			if (player.x>=408 && player.y<=48) {//top right
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackR();
				player.walking = false;
				return false;
			}

		break;

		case player.page == 4:
			if (player.x>=350 && player.y >=200) {//bottom wall
				hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
				draw.drawZackR();
				player.walking = false;
				return false;
			}

		break;

		case player.page == 5:

			if (player.y<=43 && player.x>=628) {//right top wall
				hbox(player.x,player.yBox,player.sideW,player.hBox);
				draw.drawZackR();
				player.walking = false;
				return false;
			}
			if (player.y>=102 && player.x>=675) {//right bottom wall
				hbox(player.x,player.yBox,player.sideW,player.hBox);
				draw.drawZackR();
				player.walking = false;
				return false;
			}

		break;

		case player.page == 6:


		break;

		case player.page == 7:
			if (player.y<=108 && player.x>=212) {//right top wall
				hbox(player.x,player.yBox,player.sideW,player.hBox);
				draw.drawZackR();
				player.walking = false;
				return false;
			}
		break;

		case player.page == 8:
			if (player.y<=235 && player.x>=395) {//right middle wall
				hbox(player.x,player.yBox,player.sideW,player.hBox);
				draw.drawZackR();
				player.walking = false;
				return false;
			}
		break;

		case player.page == 11:
			if (player.y>=205 && player.x>=613) {//right wall
				hbox(player.x,player.yBox,player.sideW,player.hBox);
				draw.drawZackR();
				player.walking = false;
				return false;
			}

			if (player.y<=143 && player.y>=107 && player.x<=400 && player.x>=368) {//right spike
				hbox(player.x,player.yBox,player.sideW,player.hBox);
				draw.drawZackR();
				player.walking = false;
				return false;
			}
		break;

	}//end switch

	if (player.hitxSide + player.sideW<=799) {
		animate(player,1);
		hbox(player.hitxSide+=player.speed,player.yBox,player.sideW,player.hBox);
		player.x+=player.speed;
		player.walking = true;
	}
	else{
		draw.drawZackR();
		hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
		player.walking = false;
	}	
} //end pageCOLLISIONright

function pageCOLLISIONup(){
	switch(true){
		case player.page ===0:
		case player.page ==12:
			if (player.armor == false && player.x>=200 && player.x<=280 && player.y<=1 && player.page ==0) {//armor
				$("#logGet").trigger("play");
				player.armor=true;
				console.log("Take me with you, brother.");
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}

			if (player.x>=580 && player.y<=1) {//top right
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}

			if (player.x<=370 && player.y<=1) {//top left
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}

			if (player.x>=190 && player.x<=365 && player.y<=245 && player.y>=244) {//help sign up
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}

			if (player.x>=-70 && player.x<=140 && player.y<=270 && player.y>=269) {//logs up
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}

			if (player.x>=-70 && player.x<=145 && player.y<=55) {//table up
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}

			if (player.x>=599 && player.y>=50 && player.y<=220) {//tree up
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}

		break;
		case player.page == 1:

			if (player.x<=290 && player.y<=1) {//top left
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}

			if (player.x>=402 && player.y<=1) {//top right
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}

			if (player.x>=-50 && player.x<=175 && player.y>=170 && player.y<=195) {//bear tree up
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}

			if (player.x>=585 && player.x<=630 && player.y>=345 && player.y<=350) {//low rocks up
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}

			if (player.x>=361 && player.x<=519 && player.y>=100 && player.y<=135) {//stump2 up
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}

		break;

		case player.page == 2:
			if (player.y<=1) {//top
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}

			if (player.x<=73 && player.y>=170 && player.y<=182) {//left up tree
				hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}

			if (player.x>=600 && player.y>=195 && player.y<=200) {//bear tree 2
				hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}

			if (player.x>=375 && player.x<=615 && player.y>=133 && player.y<=135) {//rock
				hbox(player.hitxSide,player.yBox,player.sideW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}
		break;

		case player.page == 3:
			if (player.x<=320 && player.y<=50) {//top right
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}

			if (player.x>=410 && player.y<=50) {//top left
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}

			if (NUMBEROFENEMIES >= 3 && player.y<=50) {
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}
		break;

		case player.page == 4:
			if (player.y<=1) {//top
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}
		break;

		case player.page == 5:
			if (player.y<=1) {//top
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}

			if (player.y<=45 && player.x>=630) {//right wall
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}
		break;

		case player.page == 6:
			if (player.y<=10) {//top rocks
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}
		break;

		case player.page == 7:
			if (player.y<=10) {//top rocks
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}

			if (player.y<=110 && player.x>=220) {//mid rocks
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}
		break;

		case player.page == 8:
			if (player.y<=110) {//top rocks
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}

			if (player.y<=237 && player.x>=398) {//mid rocks
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}

			if (player.y<=255 && player.x>=555) {//bottom rocks
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}
		break;

		case player.page == 10:
			if (player.y<=198) {//top rocks
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}

			if (player.y<=250 && player.x<=135) {//beginning rocks
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}
		break;

		case player.page == 11:

			if (player.y<=1) {//top
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}

			if (player.y<=55 && player.x<=485) {//top bed
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}

			if (player.y<=145 && player.y>=105 && player.x<=502 && player.x>=371) {//rock spike
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}

			if (player.y<=281 && player.y>=280 && player.x<=298) {//cave entrance
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackB();
				player.walking = false;
				return false;
			}
		break;

	} //end switch
	if (player.y>=-80) {
		animate(player,2);
		hbox(player.x,player.yBox-=player.speed,player.frontW,player.hBox);
		player.y-=player.speed;
		player.walking = true;
	}
	else{
		draw.drawZackB();
		hbox(player.x,player.yBox,player.frontW,player.hBox);
		player.walking = false;
	}
} //end pageCOLLISIONup

function pageCOLLISIONdown(){
	switch(true){
		case player.page ===0:
		case player.page ==12:
			if (player.y+player.h>=599) {// down
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackF();
				player.walking = false;
				return false;
			}

			if (player.x>=190 && player.x<=365 && player.y<=218 && player.y>=214) {//help sign down
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackF();
				player.walking = false;
				return false;
			}

			if (player.x>=-70 && player.x<=140 && player.y<=218 && player.y>=214) {//logs down
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackF();
				player.walking = false;
				return false;
			}

			if (player.x>=521 && player.y>=315) {//stump
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackF();
				player.walking = false;
				return false;
			}

			if (player.x>=591 && player.y>=47 && player.y<=50) {//rocks
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackF();
				player.walking = false;
				return false;
			}

		break;
		case player.page == 1:

			if (player.y+player.h>=599) {//down
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackF();
				player.walking = false;
				return false;
			}

			if (player.x>=-50 && player.x<=175 && player.y>=147 && player.y<=149) {//bear tree
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackF();
				player.walking = false;
				return false;
			}

			if (player.x>=585 && player.x<=630 && player.y>=259 && player.y<=270) {//rocks lowest
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackF();
				player.walking = false;
				return false;
			}

			if (player.x>=632 && player.y>=190) {//rocks middle
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackF();
				player.walking = false;
				return false;
			}

			if (player.x>=680 && player.y>=102) {//rocks highest
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackF();
				player.walking = false;
				return false;
			}

			if (player.x>=361 && player.x<=519 && player.y>=55 && player.y<=100) {//stump2
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackF();
				player.walking = false;
				return false;
			}

		break;

		case player.page ==2:

			if (player.y+player.h>=599) {//down
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackF();
				player.walking = false;
				return false;
			}

			if (player.x<=75 && player.y>=102 && player.y<=104) {//rocks highest && tree
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackF();
				player.walking = false;
				return false;
			}

			if (player.x>=600 && player.y>=165 && player.y<=167) {//bear tree 2
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackF();
				player.walking = false;
				return false;
			}

			if (player.x>=375 && player.x<= 615 && player.y>=108 && player.y<=110) {// main rock
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackF();
				player.walking = false;
				return false;
			}
		break;

		case player.page ==3:
			if (player.x>=461 && player.y>=405) {// thicket
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackF();
				player.walking = false;
				return false;
			}
		break;

		case player.page ==4:
			if (player.x>=352 && player.y >=198) {//wall
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackF();
				player.walking = false;
				return false;
			}
		break;

		case player.page ==5:
			if (player.x<=100 && player.y >=196) {//wall
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackF();
				player.walking = false;
				return false;
			}

			if (player.y >=265) {//water
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackF();
				player.walking = false;
				return false;
			}

			if (player.y>=100 && player.x>=677) {//right bottom wall
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackF();
				player.walking = false;
				return false;
			}
		break;

		case player.page ==6:
			if (player.y>=100) {//rocks and lake
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackF();
				player.walking = false;
				return false;
			}
		break;

		case player.page ==7:
			if (player.y>=100 && player.x<=150) {//starting rocks
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackF();
				player.walking = false;
				return false;
			}

			if (player.y>=150) {//rest of bottom rocks
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackF();
				player.walking = false;
				return false;
			}
		break;

		case player.page ==8:
			if (player.y>=150 && player.x<=110) {//starting rocks
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackF();
				player.walking = false;
				return false;
			}
			if (player.y>=315) {//bottom rocks
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackF();
				player.walking = false;
				return false;
			}
		break;

		case player.page ==10:
			if (player.y>=300) {//bottom rocks
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackF();
				player.walking = false;
				return false;
			}
		break;

		case player.page ==11:
			if (player.y>=203 && player.x>=615) {//bottom wall
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackF();
				player.walking = false;
				return false;
			}

			if (player.y>=280) {//bottom floor
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackF();
				player.walking = false;
				return false;
			}

			if (player.y<=217 && player.y>=215 && player.x<=298) {//cave back
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackF();
				player.walking = false;
				return false;
			}

			if (player.y<=125 && player.y>=105 && player.x<=502 && player.x>=371) {//rock spike
				hbox(player.x,player.yBox,player.frontW,player.hBox);
				draw.drawZackF();
				player.walking = false;
				return false;
			}
		break;

	} //end switch
	if (player.y<=560) {
		animate(player,3);
		hbox(player.x,player.yBox+=player.speed,player.frontW,player.hBox);
		player.y+=player.speed;
		player.walking = true;
	}
	else{
		draw.drawZackF();
		hbox(player.x,player.yBox,player.frontW,player.hBox);
		player.walking = false;
	}
} //end pageCOLLISIONDown

function pageTransitionUp(page){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	switch(true){
		case page === 0:
		hbox(player.x,player.yBox=590,player.frontW,player.hBox);
		player.y=490;
		player.page++;
		bgPage();
		console.log(player.page);
		break;
		case page == 1:
		hbox(player.x,player.yBox=590,player.frontW,player.hBox);
		player.y=490;
		player.page+=2;
		bgPage();
		console.log(player.page);
		break;

		case page == 3: //CaveMouth
		hbox(player.x=175,player.yBox=590,player.frontW,player.hBox);
		player.hitxSide=205;
		player.y=490;
		player.page++;
		bgPage();
		console.log(player.page);
		break;
	}
} //end pageTransitionUp

function pageTransitionRight(page){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	switch(true){
		case page == 1:
		hbox(player.hitxSide=-25,player.yBox,player.sideW,player.yBox);
		player.x=-55;
		player.page++;
		bgPage();
		console.log(player.page);
		break;
//cave below
		case page == 4:
		hbox(player.hitxSide=-25,player.yBox,player.sideW,player.hBox);
		player.x=-55;
		player.page++;
		bgPage();
		console.log(player.page);
		break;

		case page == 5:
		hbox(player.hitxSide=-25,player.yBox,player.sideW,player.hBox);
		player.x=-55;
		player.page++;
		bgPage();
		console.log(player.page);
		break;

		case page == 6:
		hbox(player.hitxSide=-25,player.yBox,player.sideW,player.hBox);
		player.x=-55;
		player.page++;
		bgPage();
		console.log(player.page);
		break;

		case page == 7:
		hbox(player.hitxSide=-25,player.yBox,player.sideW,player.hBox);
		player.x=-55;
		player.page++;
		bgPage();
		console.log(player.page);
		break;

		case page == 8:
		hbox(player.hitxSide=-25,player.yBox=350,player.sideW,player.hBox);
		player.y= 300;
		player.x=-55;
		player.page++;
		bgPage();
		console.log(player.page);
		break;

		case page == 9:
		hbox(player.hitxSide=-25,player.yBox,player.sideW,player.hBox);
		player.x=-55;
		player.page++;
		bgPage();
		console.log(player.page);
		break;

		case page == 10:
		hbox(player.hitxSide=-25,player.yBox=330,player.sideW,player.hBox);
		player.y= 280;
		player.x=-55;
		player.page++;
		bgPage();
		console.log(player.page);
		break;

		case page == 11:
		hbox(player.hitxSide=-25,player.yBox=170,player.sideW,player.hBox);
		player.y= 120;
		player.x=-55;
		player.page++;
		bgPage();
		console.log(player.page);
		break;
	}
} //end pageTransitionRight

function pageTransitionLeft(page){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	switch(true){
		case page == 2:
		player.page--;
		bgPage();
		console.log(player.page);
		hbox(player.hitxSide=775,player.yBox,player.sideW,player.hBox);
		player.x=745;
		break;
//cave below
		case page == 5:
		player.page--;
		bgPage();
		console.log(player.page);
		hbox(player.hitxSide=775,player.yBox,player.sideW,player.hBox);
		player.x=745;
		break;

		case page == 6:
		player.page--;
		bgPage();
		console.log(player.page);
		hbox(player.hitxSide=775,player.yBox,player.sideW,player.hBox);
		player.x=745;
		break;

		case page == 7:
		player.page--;
		bgPage();
		console.log(player.page);
		hbox(player.hitxSide=775,player.yBox,player.sideW,player.hBox);
		player.x=745;
		break;

		case page == 8:
		player.page--;
		bgPage();
		console.log(player.page);
		hbox(player.hitxSide=775,player.yBox,player.sideW,player.hBox);
		player.x=745;
		break;
	}
} //end pageTransitionLeft

function pageTransitionDown(page){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	switch(true){
		case page == 3:
		player.page-=2;
		bgPage();
		console.log(player.page);
		hbox(player.x=355,player.yBox=0,player.frontW,player.hBox);
		player.hitxSide=385;
		player.y=-100;
		break;

		case page == 4:
		hbox(player.x=370,player.yBox=0,player.frontW,player.hBox);
		player.hitxSide=400;
		player.y=-100;
		player.page--;
		bgPage();
		console.log(player.page);
		break;
	}
} //end pageTransitionDown

function bgPage(){
      	etx.clearRect(0,0,canvas.width,canvas.height);
      	ettx.clearRect(0,0,canvas.width,canvas.height);
	music();
	switch(true){
		case player.page ===0:
			$("#back").css("background-image", "url(" + "assets/bg1.png" + ")");
		break;
		case player.page == 1:
		$("#back").css("background-image", "url(" + "assets/bg2.png" + ")");
		break;

		case player.page == 2:
		$("#back").css("background-image", "url(" + "assets/bg3.png" + ")");
		break;

		case player.page == 3:
		if (NUMBEROFENEMIES < 3) {
			$("#back").css("background-image", "url(" + "assets/bg4Open.png" + ")");
		}
		else{
			$("#back").css("background-image", "url(" + "assets/bg4.png" + ")");
		}
		break;

		case player.page == 4:
		$("#back").css("background-image", "url(" + "assets/bg5.png" + ")");
		break;

		case player.page == 5:
		$("#back").css("background-image", "url(" + "assets/bg6.jpg" + ")");
		break;

		case player.page == 6:
		$("#back").css("background-image", "url(" + "assets/bg7.jpg" + ")");
		break;

		case player.page == 7:
		$("#back").css("background-image", "url(" + "assets/bg8.png" + ")");
		break;

		case player.page == 8:
		$("#back").css("background-image", "url(" + "assets/bg9.png" + ")");
		break;

		case player.page == 9:
		$("#back").css("background-image", "url(" + "assets/bg10.png" + ")");
		break;

		case player.page == 10:
		$("#back").css("background-image", "url(" + "assets/bg11.png" + ")");
		break;

		case player.page == 11:
		$("#back").css("background-image", "url(" + "assets/bg12.png" + ")");
		break;

		case player.page == 12:
		$("#back").css("background-image", "url(" + "assets/bg1.png" + ")");
		delay(function(){ //maybe
			$("#title").css("background-image", "url(assets/theEnd.png)");
			$("#title").css("animation", "fade 20s linear");
		delay(function(){
			$("#title").css("opacity", 1);
			$("#title").css("animation", "none");
			$("#main3").prop('loop', false);
			player.canMove=false;
			player.walking=false;
			stopAudio(".sfx");
		},20000);

	},10000);
		break;
	}
} //end bgPage

function enemyDraw() {
	if (enemyD.page == player.page) {
		if (!enemyD.alive) {
			draw.drawDeer1DEAD();
		}
		if (!enemyD2.alive) {
			draw.drawDeer2DEAD();
		}
		if (!enemyD3.alive) {
			draw.drawDeer3DEAD();
		}

		enemyMoveD();
	}

	if (enemyD6.page == player.page) {
		if (!enemyD6.alive) {
			draw.drawDeer6DEAD();
		}

		enemyMoveD();
	}

	if (enemyS.page == player.page) {
		if (!enemyS.alive) {
			draw.drawSquirrel1DEAD();
		}

		if (!enemyS2.alive) {
			draw.drawSquirrel2DEAD();
		}

		if (!enemyS3.alive) {
			draw.drawFreakDEAD();
		}

		if (!enemyD4.alive) {
			draw.drawDeer4DEAD();
		}

		if (!enemyD5.alive) {
			draw.drawDeer5DEAD();
		}
		enemyMoveD();
		enemyMoveS();
	}

	if (bear.page == player.page) {
		draw.drawBearF();
		enemyMoveB();
	}
} //end enemyDraw

function enemyCollideD(enemy){
	switch(player.page){
		case 1:
			if (enemy.x>=-50 && enemy.x<=175 && enemy.y>=297 && enemy.y<=345) {//bear tree
				draw.drawDeerRIGHT(enemy);
				ehbox(enemy.x+=enemy.speed,enemy.y-=enemy.speed,enemy.frontW,enemy.h);
				return false;
			}

			if (enemy.x>=585 && enemy.x<=630 && enemy.y>=255 && enemy.y<=260) {//rocks lowest
				ehbox(enemy.x-=enemy.speed,enemy.y,enemy.frontW,enemy.h);
				return false;
			}

			if (enemy.x>=360 && enemy.x<=520 && enemy.y>=200 && enemy.y<=250) {//stump2
				if (enemy.y<=200) {
				draw.drawDeerRIGHT(enemy);
				ehbox(enemy.x-=enemy.speed,enemy.y-=enemy.speed,enemy.frontW,enemy.h);
				}
				else{
				draw.drawDeerLEFT(enemy);
				ehbox(enemy.x+=enemy.speed,enemy.y+=enemy.speed,enemy.frontW,enemy.h);		
				}
				return false;
			}
			else{
				return true;
			}
			break;

		case 2:
			if (enemy.x>=-50 && enemy.x<=75 && enemy.y>=270 && enemy.y<=320) {//tree 2
				draw.drawDeerLEFT(enemy);
				ehbox(enemy.x+=enemy.speed,enemy.y+=enemy.speed,enemy.frontW,enemy.h);
				return false;
			}

			if (enemy.x>=375 && enemy.x<=615 && enemy.y>=270 && enemy.y<=275) {//rock 2
				if (enemy.x<=495) {
				draw.drawDeerLEFT(enemy);
				ehbox(enemy.x-=enemy.speed,enemy.y-=enemy.speed,enemy.frontW,enemy.h);
				}
				else{
				draw.drawDeerRIGHT(enemy);
				ehbox(enemy.x+=enemy.speed,enemy.y-=enemy.speed,enemy.frontW,enemy.h);
				}
				return false;
			}

			if (enemy.x>=600 && enemy.y>=320 && enemy.y<=330) {//bear tree 2
				draw.drawDeerLEFT(enemy);
				ehbox(enemy.x-=enemy.speed,enemy.y-=enemy.speed,enemy.frontW,enemy.h);
				return false;
			}

			else{
				return true;
			}
			break;
		}
} //end enemyCollideD

function enemyCollideS(enemy){
				if (enemy.x>=-50 && enemy.x<=75 && enemy.y>=280 && enemy.y<=310) {//tree 2
				draw.drawSquirrelWALK(enemy);
				ehbox(enemy.x,enemy.y+=enemy.speed,enemy.frontW,enemy.h);
				enemy.enraged = true;
				return false;
			}

			if (enemy.x>=375 && enemy.x<=615 && enemy.y>=270 && enemy.y<=275) {//rock 2
				if (enemy.y<=280) {
				draw.drawSquirrelWALK(enemy);
				ehbox(enemy.x-=enemy.speed,enemy.y+=enemy.speed,enemy.frontW,enemy.h);
				}
				else{
				draw.drawSquirrelWALK(enemy);
				ehbox(enemy.x-=enemy.speed,enemy.y-=enemy.speed,enemy.frontW,enemy.h);
				}
				enemy.enraged = true;
				return false;
			}

			if (enemy.x>=600 && enemy.y>=320 && enemy.y<=330) {//bear tree 2
				if (enemy.y<=310) {
				draw.drawSquirrelWALK(enemy);
				ehbox(enemy.x-=enemy.speed,enemy.y+=enemy.speed,enemy.frontW,enemy.h);
				}
				else{
				draw.drawSquirrelWALK(enemy);
				ehbox(enemy.x-=enemy.speed,enemy.y-=enemy.speed,enemy.frontW,enemy.h);
				}
				enemy.enraged = true;
				return false;
			}

			else{
				return true;
			}
} //end enemyCollideS

function enemyCollideF(enemy){ //change these numbers to be more height appropriate
				if (enemy.x>=-50 && enemy.x<=75 && enemy.y>=270 && enemy.y<=320) {//tree 2
				draw.drawFreakWalk(enemy);
				ehbox(enemy.x,enemy.y+=enemy.speed,enemy.frontW,enemy.h);
				enemy.enraged = true;
				return false;
			}

			if (enemy.x>=375 && enemy.x<=615 && enemy.y>=240 && enemy.y<=250) {//rock 2
				if (enemy.x<=495) {
				draw.drawFreakWalk(enemy);
				ehbox(enemy.x-=enemy.speed,enemy.y-=enemy.speed,enemy.frontW,enemy.h);
				}
				else{
				draw.drawFreakWalk(enemy);
				ehbox(enemy.x+=enemy.speed,enemy.y-=enemy.speed,enemy.frontW,enemy.h);
				}
				enemy.enraged = true;
				return false;
			}

			if (enemy.x>=600 && enemy.y>=270 && enemy.y<=280) {//bear tree 2
				draw.drawFreakWalk(enemy);
				ehbox(enemy.x-=enemy.speed,enemy.y-=enemy.speed,enemy.frontW,enemy.h);
				enemy.enraged = true;
				return false;
			}

			else{
				return true;
			}
} //end enemyCollideF

function enemyMoveD(){
	if (enemyD.page == player.page) {
	if (enemyD.alive && enemyCollideD(enemyD)) {
	switch(true){
		case(player.x-40> enemyD.x):
		draw.drawDeerRIGHT(enemyD);
		ehbox(enemyD.x+=enemyD.speed,enemyD.y,enemyD.frontW,enemyD.h);
		break;

		case(player.x+40< enemyD.x):
		draw.drawDeerLEFT(enemyD);
		ehbox(enemyD.x-=enemyD.speed,enemyD.y,enemyD.frontW,enemyD.h);
		break;

		case(player.yBox> enemyD.y):
		draw.drawDeer1F();
		ehbox(enemyD.x,enemyD.y+=enemyD.speed,enemyD.frontW,enemyD.h);
		break;

		case(player.yBox< enemyD.y):
		draw.drawDeer1F();
		ehbox(enemyD.x,enemyD.y-=enemyD.speed,enemyD.frontW,enemyD.h);
		break;

		default:
		draw.drawDeer1F();
		ehbox(enemyD.x,enemyD.y,enemyD.frontW,enemyD.h);
		break;
	}
}

	if (enemyD2.alive && enemyCollideD(enemyD2)) {
		switch(true){
		case(player.x-40> enemyD2.x):
		draw.drawDeerRIGHT(enemyD2);
		ehbox(enemyD2.x+=enemyD2.speed,enemyD2.y,enemyD2.frontW,enemyD2.h);
		break;

		case(player.x+40< enemyD2.x):
		draw.drawDeerLEFT(enemyD2);
		ehbox(enemyD2.x-=enemyD2.speed,enemyD2.y,enemyD2.frontW,enemyD2.h);
		break;

		case(player.yBox> enemyD2.y):
		draw.drawDeer2F();
		ehbox(enemyD2.x,enemyD2.y+=enemyD2.speed,enemyD2.frontW,enemyD2.h);
		break;

		case(player.yBox< enemyD2.y):
		draw.drawDeer2F();
		ehbox(enemyD2.x,enemyD2.y-=enemyD2.speed,enemyD2.frontW,enemyD2.h);
		break;

		default:
		draw.drawDeer2F();
		ehbox(enemyD2.x,enemyD2.y,enemyD2.frontW,enemyD2.h);
		break;
	}
}

	if (enemyD3.alive && enemyCollideD(enemyD3)) {
		switch(true){
		case(player.x-40> enemyD3.x):
		draw.drawDeerRIGHT(enemyD3);
		ehbox(enemyD3.x+=enemyD3.speed,enemyD3.y,enemyD3.frontW,enemyD3.h);
		break;

		case(player.x+40< enemyD3.x):
		draw.drawDeerLEFT(enemyD3);
		ehbox(enemyD3.x-=enemyD3.speed,enemyD3.y,enemyD3.frontW,enemyD3.h);
		break;

		case(player.yBox> enemyD3.y):
		draw.drawDeer3F();
		ehbox(enemyD3.x,enemyD3.y+=enemyD3.speed,enemyD3.frontW,enemyD3.h);
		break;

		case(player.yBox< enemyD3.y):
		draw.drawDeer3F();
		ehbox(enemyD3.x,enemyD3.y-=enemyD3.speed,enemyD3.frontW,enemyD3.h);
		break;

		default:
		draw.drawDeer3F();
		ehbox(enemyD3.x,enemyD3.y,enemyD3.frontW,enemyD3.h);
		break;
	}
}
}//end if

if (enemyD4.page == player.page) {
	if (enemyD4.alive && enemyCollideD(enemyD4)) {
		switch(true){
		case(player.x-40> enemyD4.x):
		draw.drawDeerRIGHT(enemyD4);
		ehbox(enemyD4.x+=enemyD4.speed,enemyD4.y,enemyD4.frontW,enemyD4.h);
		break;

		case(player.x+40< enemyD4.x):
		draw.drawDeerLEFT(enemyD4);
		ehbox(enemyD4.x-=enemyD4.speed,enemyD4.y,enemyD4.frontW,enemyD4.h);
		break;

		case(player.yBox> enemyD4.y):
		draw.drawDeer4F();
		ehbox(enemyD4.x,enemyD4.y+=enemyD4.speed,enemyD4.frontW,enemyD4.h);
		break;

		case(player.yBox< enemyD4.y):
		draw.drawDeer4F();
		ehbox(enemyD4.x,enemyD4.y-=enemyD4.speed,enemyD4.frontW,enemyD4.h);
		break;

		default:
		draw.drawDeer4F();
		ehbox(enemyD4.x,enemyD4.y,enemyD4.frontW,enemyD4.h);
		break;
	}
}

if (enemyD5.alive && enemyCollideD(enemyD5)) {
		switch(true){
		case(player.x-40> enemyD5.x):
		draw.drawDeerRIGHT(enemyD5);
		ehbox(enemyD5.x+=enemyD5.speed,enemyD5.y,enemyD5.frontW,enemyD5.h);
		break;

		case(player.x+40< enemyD5.x):
		draw.drawDeerLEFT(enemyD5);
		ehbox(enemyD5.x-=enemyD5.speed,enemyD5.y,enemyD5.frontW,enemyD5.h);
		break;

		case(player.yBox> enemyD5.y):
		draw.drawDeer5F();
		ehbox(enemyD5.x,enemyD5.y+=enemyD5.speed,enemyD5.frontW,enemyD5.h);
		break;

		case(player.yBox< enemyD5.y):
		draw.drawDeer5F();
		ehbox(enemyD5.x,enemyD5.y-=enemyD5.speed,enemyD5.frontW,enemyD5.h);
		break;

		default:
		draw.drawDeer5F();
		ehbox(enemyD5.x,enemyD5.y,enemyD5.frontW,enemyD5.h);
		break;
	}
}
}
if (enemyD6.page == player.page) {

if (enemyD6.alive) {
		switch(true){
		case(player.x-40> enemyD6.x):
		draw.drawDeerRIGHT(enemyD6);
		ehbox(enemyD6.x+=enemyD6.speed,enemyD6.y,enemyD6.frontW,enemyD6.h);
		break;

		case(player.x+40< enemyD6.x):
		draw.drawDeerLEFT(enemyD6);
		ehbox(enemyD6.x-=enemyD6.speed,enemyD6.y,enemyD6.frontW,enemyD6.h);
		break;

		case(player.yBox> enemyD6.y):
		draw.drawDeer6F();
		ehbox(enemyD6.x,enemyD6.y+=enemyD6.speed,enemyD6.frontW,enemyD6.h);
		break;

		case(player.yBox< enemyD6.y):
		draw.drawDeer6F();
		ehbox(enemyD6.x,enemyD6.y-=enemyD6.speed,enemyD6.frontW,enemyD6.h);
		break;

		default:
		draw.drawDeer6F();
		ehbox(enemyD6.x,enemyD6.y,enemyD6.frontW,enemyD6.h);
		break;
	}
}

}//end if
} //end enemyMoveD

function enemyMoveS(){
	if (enemyS.alive && enemyCollideS(enemyS)) {
	switch(true){

		case(enemyS.enraged):
		enemyS.speed=3;
		switch(true){
		case(player.x-40> enemyS.x):
		draw.drawSquirrelWALK(enemyS);
		ehbox(enemyS.x+=enemyS.speed,enemyS.y,enemyS.frontW,enemyS.h);
		break;

		case(player.x+40< enemyS.x):
		draw.drawSquirrelWALK(enemyS);
		ehbox(enemyS.x-=enemyS.speed,enemyS.y,enemyS.frontW,enemyS.h);
		break;

		case(player.yBox >= enemyS.y):
		draw.drawSquirrelWALK(enemyS);
		ehbox(enemyS.x,enemyS.y+=enemyS.speed,enemyS.frontW,enemyS.h);
		break;

		case(player.yBox <= enemyS.y):
		draw.drawSquirrelWALK(enemyS);
		ehbox(enemyS.x,enemyS.y-=enemyS.speed,enemyS.frontW,enemyS.h);
		break;

		default:
		draw.drawSquirrelWALK(enemyS);
		ehbox(enemyS.x,enemyS.y,enemyS.frontW,enemyS.h);
		break;
	}
		break;

		case(kstate[0]===false&& kstate[1]===false&& kstate[2]===false&& kstate[3]===false):
		case(attack):
		draw.drawSquirrel1F();
		break;

		case(kstate[0] && attack ===false):
		if (enemyS.x<=(799-enemyS.frontW)) {
			
		ehbox(enemyS.x+=enemyS.speed,enemyS.y,enemyS.frontW,enemyS.h);
		}
		else{
			enemyS.enraged = true;
			ehbox(enemyS.x,enemyS.y,enemyS.frontW,enemyS.h);
		}
		draw.drawSquirrelWALK(enemyS);
		break;

		case(kstate[1] && attack ===false):
		if (enemyS.x>=1){
			
		ehbox(enemyS.x-=enemyS.speed,enemyS.y,enemyS.frontW,enemyS.h);
		}
		else{
			enemyS.enraged = true;
			ehbox(enemyS.x,enemyS.y,enemyS.frontW,enemyS.h);
		}
		draw.drawSquirrelWALK(enemyS);
		break;

		case(kstate[2] && attack===false):
		if (enemyS.y<=(599-enemyS.h)) {
			
			ehbox(enemyS.x,enemyS.y+=enemyS.speed,enemyS.frontW,enemyS.h);
		}

		else{
			enemyS.enraged = true;
			ehbox(enemyS.x,enemyS.y,enemyS.frontW,enemyS.h);
		}
		draw.drawSquirrelWALK(enemyS);
		break;

		case(kstate[3] && attack ===false):
		if (enemyS.y>=1) {
			
		ehbox(enemyS.x,enemyS.y-=enemyS.speed,enemyS.frontW,enemyS.h);
		}
			else{
			enemyS.enraged = true;
			ehbox(enemyS.x,enemyS.y,enemyS.frontW,enemyS.h);
		}
		draw.drawSquirrelWALK(enemyS);
		break;
	}
}// end enemyS.alive

if (enemyS2.alive && enemyCollideS(enemyS2)) {
	switch(true){

		case(enemyS2.enraged):
		enemyS2.speed=3;
		switch(true){
		case(player.x-40> enemyS2.x):
		draw.drawSquirrelWALK(enemyS2);
		ehbox(enemyS2.x+=enemyS2.speed,enemyS2.y,enemyS2.frontW,enemyS2.h);
		break;

		case(player.x+40< enemyS2.x):
		draw.drawSquirrelWALK(enemyS2);
		ehbox(enemyS2.x-=enemyS2.speed,enemyS2.y,enemyS2.frontW,enemyS2.h);
		break;

		case(player.yBox >= enemyS2.y):
		draw.drawSquirrelWALK(enemyS2);
		ehbox(enemyS2.x,enemyS2.y+=enemyS2.speed,enemyS2.frontW,enemyS2.h);
		break;

		case(player.yBox <= enemyS2.y):
		draw.drawSquirrelWALK(enemyS2);
		ehbox(enemyS2.x,enemyS2.y-=enemyS2.speed,enemyS2.frontW,enemyS2.h);
		break;

		default:
		draw.drawSquirrelWALK(enemyS2);
		ehbox(enemyS2.x,enemyS2.y,enemyS2.frontW,enemyS2.h);
		break;
	}
		break;

		case(kstate[0]===false&& kstate[1]===false&& kstate[2]===false&& kstate[3]===false):
		case(attack):
		draw.drawSquirrel2F();
		break;
		
		case(kstate[0] && attack ===false):
		if (enemyS2.y>=1) {
		ehbox(enemyS2.x,enemyS2.y-=enemyS2.speed,enemyS2.frontW,enemyS2.h);
	}
	else{
		enemyS2.enraged = true;
		ehbox(enemyS2.x,enemyS2.y,enemyS2.frontW,enemyS2.h);
	}
	draw.drawSquirrelWALK(enemyS2);
		break;

		case(kstate[1] && attack ===false):
		if (enemyS2.x>=1) {
		ehbox(enemyS2.x-=enemyS2.speed,enemyS2.y,enemyS2.frontW,enemyS2.h);
	}
		else{
			enemyS2.enraged = true;
		ehbox(enemyS2.x,enemyS2.y,enemyS2.frontW,enemyS2.h);
	}
	draw.drawSquirrelWALK(enemyS2);
		break;

		case(kstate[2] && attack ===false):
		if (enemyS2.x<=(799-enemyS2.frontW)) {
		ehbox(enemyS2.x+=enemyS2.speed,enemyS2.y,enemyS2.frontW,enemyS2.h);

	}
		else{
			enemyS2.enraged = true;
		ehbox(enemyS2.x,enemyS2.y,enemyS2.frontW,enemyS2.h);
	}
	draw.drawSquirrelWALK(enemyS2);
		break;


		case(kstate[3] && attack===false):
		if (enemyS2.y<=(599-enemyS2.h)) {
		ehbox(enemyS2.x,enemyS2.y+=enemyS2.speed,enemyS2.frontW,enemyS2.h);
	}
	else{
		enemyS2.enraged = true;
		ehbox(enemyS2.x,enemyS2.y,enemyS2.frontW,enemyS2.h);
	}
	draw.drawSquirrelWALK(enemyS2);
		break;

	}
}// end enemyS2.alive

if (enemyS3.alive && enemyCollideF(enemyS3)) {
	switch(true){

		case(enemyS3.enraged):
		switch(true){
		case(player.x-40> enemyS3.x):
		draw.drawFreakWalk();
		ehbox(enemyS3.x+=enemyS3.speed,enemyS3.y,enemyS3.frontW,enemyS3.h);
		break;

		case(player.x+40< enemyS3.x):
		draw.drawFreakWalk();
		ehbox(enemyS3.x-=enemyS3.speed,enemyS3.y,enemyS3.frontW,enemyS3.h);
		break;

		case(player.yBox >= enemyS3.y):
		draw.drawFreakWalk();
		ehbox(enemyS3.x,enemyS3.y+=enemyS3.speed,enemyS3.frontW,enemyS3.h);
		break;

		case(player.yBox <= enemyS3.y):
		draw.drawFreakWalk();
		ehbox(enemyS3.x,enemyS3.y-=enemyS3.speed,enemyS3.frontW,enemyS3.h);
		break;

		default:
		draw.drawFreakWalk();
		ehbox(enemyS3.x,enemyS3.y,enemyS3.frontW,enemyS3.h);
		break;
	}
		break;

		case(kstate[0]===false&& kstate[1]===false&& kstate[2]===false&& kstate[3]===false):
		case(attack):
		draw.drawFreakF();
		break;

		case(kstate[0] && attack ===false):
		if (enemyS3.x>=1) {
		ehbox(enemyS3.x-=enemyS3.speed,enemyS3.y,enemyS3.frontW,enemyS3.h);
	}

	else{
		enemyS3.enraged = true;
		ehbox(enemyS3.x,enemyS3.y,enemyS3.frontW,enemyS3.h);
	}
	draw.drawFreakWalk();
		break;
		
		case(kstate[1] && attack ===false):
		if (enemyS3.x<=(799-enemyS3.frontW)) {
		ehbox(enemyS3.x+=enemyS3.speed,enemyS3.y,enemyS3.frontW,enemyS3.h);
	
	}
	else{
		enemyS3.enraged = true;
		ehbox(enemyS3.x,enemyS3.y,enemyS3.frontW,enemyS3.h);
	}
	draw.drawFreakWalk();
		break;

		case(kstate[2] && attack ===false):
		if (enemyS3.y>=1) {
		ehbox(enemyS3.x,enemyS3.y-=enemyS3.speed,enemyS3.frontW,enemyS3.h);
	}

	else{
		enemyS3.enraged = true;
		ehbox(enemyS3.x,enemyS3.y,enemyS3.frontW,enemyS3.h);
	}
	draw.drawFreakWalk();
		break;

		case(kstate[3] && attack ===false):
		if (enemyS3.y<=(599-enemyS3.h)) {
		ehbox(enemyS3.x,enemyS3.y+=enemyS3.speed,enemyS3.frontW,enemyS3.h);
	}

	else{
		enemyS3.enraged = true;
		ehbox(enemyS3.x,enemyS3.y,enemyS3.frontW,enemyS3.h);
	}
	draw.drawFreakWalk();
		break;

	}
} //end enemyS3.alive
} //end enemyMoveS

function enemyMoveB(){
	if (bear.alive) {
		bear.speedcounter++;
	if (bear.speedcounter == 70) {
		 if(bear.moveCounter >= 4 && bear.moveCounter != 7){
		bear.invuln = false;
		$("#bearScream").trigger("play");
		screenSlowShake();
		ehbox(bear.x,bear.y,bear.frontW,bear.h);
		bear.speedcounter =0;
		bear.moveCounter++;
	}
	else if (bear.moveCounter ==7) {
		ehbox(bear.x,bear.y,bear.frontW,bear.h);
		bear.moveCounter = -3;
		bear.speedcounter =0;
	}
	else{
		bear.invuln = true;
		screenShake();
		$("#bearSteps").trigger("play");
		ehbox(bear.x-=bear.speed,bear.y,bear.frontW,bear.h);
		bear.speedcounter =0
		bear.moveCounter++;
	}
	}
	}
} // end enemyMoveB

function enemyCollisionSide(enemy){
	if (player.page == enemy.page && enemy.alive == true) {
		if (player.hitxSide < enemy.x + enemy.frontW &&
   player.hitxSide + player.sideW > enemy.x &&
   player.yBox < enemy.y + enemy.h &&
   player.hBox + player.yBox > enemy.y) {
			hit(enemy);
		}
			
	}
} //end enemyCollisionSide


function enemyCollisionFront(enemy){
	if (player.page == enemy.page && enemy.alive == true) {
		if (player.x < enemy.x + enemy.frontW &&
	   player.x + player.frontW > enemy.x &&
	   player.yBox < enemy.y + enemy.h &&
	   player.hBox + player.yBox > enemy.y) {
	
			hit(enemy);
		}
	}
} //end enemyCollisionFront

function axeCollisionFront(enemy){
	if (player.page == enemy.page && enemy.alive == true ) {
		if (axe.x < enemy.x + enemy.frontW &&
	   axe.x + axe.wFront > enemy.x &&
	   axe.y < enemy.y + enemy.h &&
	   axe.hFront + axe.y > enemy.y) {
			hitEnemy(enemy);
		}
	}

} //end axeCollisionFront

function axeCollisionSide(enemy){
	if (player.page == enemy.page && enemy.alive == true ) {
		if (axe.x < enemy.x + enemy.frontW &&
	   axe.x + axe.wSide > enemy.x &&
	   axe.y < enemy.y + enemy.h &&
	   axe.hSide + axe.y > enemy.y) {
			hitEnemy(enemy);
		}
	}
} //end axeCollisionSide

function death(){
	if (player.currentHealth <=0) {
		if (player.armor) {
			$(".music").prop("volume",0.2);
			stopAudio(".sfx");
			$("#revive").trigger("play");
			player.canMove=false;
			fadeLog();
			player.armor = false;
			player.currentPage = player.page;
			player.page = -1;
			console.log("Don't end up like me.");
			player.currentHealth++;
		delayLog(function(){
			$(".music").prop("volume",0.8);
			player.canMove=true;
			player.page= player.currentPage;
			ui();
		player.isHit =true;
			delay(function(){
			player.isHit =false;
	},1500);
		},7000);
		}
		else{
		console.log("Ded");
		player.alive =false;
		player.canMove=false;
		music();
		fadeDeath();
	document.addEventListener('keydown', function(e){
 		 if(e.keyCode == 82)
    	window.location.reload();
	})
		}
	}
} //end death

function hit(enemy){
		if (player.isHit ===false) {
		player.isHit =true;
		delay(function(){
		player.isHit =false;
	},500);
			console.log("hit by "+enemy.name);
			$("#hitZ").trigger("play");
			player.currentHealth -=enemy.damage;
			ui();
			if (player.currentHealth <=0) {
				death();
			}
		switch(true){

		case player.page== 9:
		if (player.x<=200) {
			player.x=-25;
			player.hitxSide=0;
		}
		else{
		player.x-=200;
		player.hitxSide-=200;
		}
		draw.drawZackR();
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		break;

		case kstate[0]===true:
		if (player.x>=670) {
			player.x=720;
			player.hitxSide=695;
		}
		else{
			player.x+=70;
			player.hitxSide+=70;	
		}
		draw.drawZackL();
		ctx.clearRect(player.x-100, player.y-100, player.frontW+180, player.h+180)
		break;

		case kstate[1] ===true:
		if (player.x<=120) {
			player.x=0;
			player.hitxSide=25;
		}
		else{
		player.x-=70;
		player.hitxSide-=70;
		}
		draw.drawZackR();
		ctx.clearRect(player.x-100, player.y-100, player.frontW+180, player.h+180)
		break;

		case kstate[2] ===true:
			player.y+=70;
			player.yBox+=70;
		draw.drawZackB();
		ctx.clearRect(player.x-100, player.y-100, player.frontW+180, player.h+180)
		break;

		case kstate[3] ===true:
		player.y-=70;
		player.yBox-=70;
		draw.drawZackF();
		ctx.clearRect(player.x-100, player.y-100, player.frontW+180, player.h+180)
		break;

		case faceState[0]===true:
		if (player.x>=670) {
			player.x=720;
			player.hitxSide=695;
		}
		else{
			player.x+=70;
			player.hitxSide+=70;	
		}
		draw.drawZackL();
		ctx.clearRect(player.x-100, player.y-100, player.frontW+180, player.h+180)
		break;

		case faceState[1] ===true:
		if (player.x<=120) {
			player.x=0;
			player.hitxSide=25;
		}
		else{
		player.x-=70;
		player.hitxSide-=70;
		}
		draw.drawZackR();
		ctx.clearRect(player.x-100, player.y-100, player.frontW+180, player.h+180)
		break;

		case faceState[2] ===true:
			player.y+=70;
			player.yBox+=70;
		draw.drawZackB();
		ctx.clearRect(player.x-100, player.y-100, player.frontW+180, player.h+180)
		break;

		case faceState[3] ===true:
		player.y-=70;
		player.yBox-=70;
		draw.drawZackF();
		ctx.clearRect(player.x-100, player.y-100, player.frontW+180, player.h+180)
		break;

		}
		}
	} //end hit

function hitEnemy(e){
	if (e.alive) {
		if (e.isHit ===false && e.invuln == false) {
			$("#cut").trigger("play");
			e.isHit =true;
			delayE(function(){
				e.isHit =false;
				console.log(e.name + "can be hit");
			},500);
			e.currentHealth --;
			if (e == bear) {
				etx.clearRect(e.x-90, e.y, e.frontW+90, e.h);
				e.x+=40;
			}
			if (e.currentHealth <=0) {
				console.log(e.name +" is ded");
				e.alive = false;
				NUMBEROFENEMIES--;
				music();
				enemyDraw();
				if (e == bear) {
					$("#bearDeath").trigger("play");
					stopAudio("#bearSteps");
				}
				else if (e.type == "Deer") {
					$("#enemyDeathD").trigger("play");
					etx.clearRect(e.x, e.y, e.frontW, e.h);
					ettx.clearRect(e.x, e.y, e.frontW, e.h);
				}
				else if (e.type == "Squirrel"){
					$("#enemyDeathS").trigger("play");
					etx.clearRect(e.x, e.y, e.frontW, e.h);
					ettx.clearRect(e.x, e.y, e.frontW, e.h);
				}
				else{
					$("#enemyDeathS").trigger("play");
					etx.clearRect(e.x, e.y, e.frontW, e.h);
					ettx.clearRect(e.x, e.y, e.frontW, e.h);
					//$("#enemyDeathF").trigger("play");
				}
			}
	}//end else
	else if (e.invuln){
		$("#dink").trigger("play");	
		ehbox(e.x++,e.y,e.frontW,e.h);
	}
	}//end if alive
}//end hitEnemy

function ui(){
	utx.clearRect(0, 0, canvas.width, canvas.height);
	switch(true){
		case player.currentHealth ==5:
		utx.drawImage(health5, 20, 480);
		break;

		case player.currentHealth ==4:
		utx.drawImage(health4, 20, 480);
		break;

		case player.currentHealth ==3:
		utx.drawImage(health3, 20, 480);
		break;

		case player.currentHealth ==2:
		utx.drawImage(health2, 20, 480);
		break;

		case player.currentHealth ==1:
		utx.drawImage(health1, 20, 480);
		break;

		case player.currentHealth <=0:
		utx.drawImage(health0, 20, 480);
		break;

	}
}//end ui

function screenShake(){
	if (player.alive) {
	$("#back").css("animation", "shake .5s linear");
	$("#layers").css("animation", "shake .5s linear");
		delayShake(function(){
		$("#back").css("animation", "none");
		$("#layers").css("animation", "none");
	},500);
	}
}//end screenShake

function screenSlowShake(){
	if (player.alive) {
	$("#back").css("animation", "shakeSlow 3.5s linear");
	$("#layers").css("animation", "shakeSlow 3.5s linear");
		delayShake(function(){
		$("#back").css("animation", "none");
		$("#layers").css("animation", "none");
	},3500);
	}
}//end screenShake

function controllerSwitch(){

if (controller ==false) {
	utx.clearRect(0, 0, canvas.width, canvas.height);
	utx.drawImage(keyboard, 0 ,0);
}

else if (controller) {
	utx.clearRect(0, 0, canvas.width, canvas.height);
	utx.drawImage(selectController, 0 ,0);
}

$(window).keydown(function(e){
if (controller ==false && e.which ==69 && options) {
	utx.clearRect(0, 0, canvas.width, canvas.height);
	utx.drawImage(selectController, 0 ,0);
	controller = true;
	console.log("controller on");
}
else if (controller && e.which ==69 && options) {
	utx.clearRect(0, 0, canvas.width, canvas.height);
	utx.drawImage(keyboard, 0 ,0);
	controller = false;
	console.log("controller off");
}
});
} //end controller switch


$(document).on("keypress",function(e){
	if (e.which ==enter &! GAMESTART && options ==false) {
$("#ui").css("background-image", "none");
$("#title").css("background", "black");
GAMESTART=true;
game.start();
music();
ui();
draw.drawZackF();
fadeIntro();
}
	else if (e.which ==32 &! GAMESTART) {
		controls();
		controllerSwitch();
	}
}); //end one click
}); //end ready