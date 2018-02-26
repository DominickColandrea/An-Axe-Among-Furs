let img = []; //add ALL OF THESE IMAGES IN THE ARRAY TO THEIR CORRECT SPOT. AKA TAKE OUT THE OLD IMG.SRC AND WHATNOT
function preload() {
    for (let i = 0; i < preload.arguments.length; i++) {
        img[i] = new Image();
        img[i].src = preload.arguments[i];
    }
}
preload( //do not move positions, just add on

    "assets/ZL.png",//zack
    "assets/ZR.png",
    "assets/ZF1.png",
    "assets/ZB.png",
    "assets/ZLsheet.png",//animations
    "assets/ZRsheet.png",
    "assets/ZFsheet.png",
    "assets/ZBsheet.png",
    "assets/ZAL.png",
    "assets/ZAR.png",
    "assets/ZAF.png",
    "assets/ZAB.png",
    "assets/DL.png",//enemies
    "assets/DR.png",
    "assets/DF.png",
    "assets/DDead.png",
    "assets/SF.png",
    "assets/SWalk.png",
    "assets/SDead.png",
    "assets/freak.png",
    "assets/freakWalk.png",
    "assets/freakDead.png",
    "assets/bear.png",
    "assets/health5.png",//ui
    "assets/health4.png",
    "assets/health3.png",
    "assets/health2.png",
    "assets/health1.png",
    "assets/health0.png",
    "assets/bg1Layer.png", //page 1
    "assets/bg1Tree.png",
    "assets/bearTree.png",//page 2
    "assets/lowerLeaves.png",
    "assets/lowerSpear.png",
    "assets/stump2TOP.png",
    "assets/backTree.png",//page 3
    "assets/frontGrass.png",
    "assets/tree2.png",
    "assets/bearTree2.png",
    "assets/rock2.png",
    "assets/caveEntrance.png",//page 4
    "assets/bg4Layer.png",
    "assets/bg5Layer.png",//page 5
    "assets/bg6Layer.png",//page 6
    "assets/bg7Layer.png",//page 7
    "assets/bg8Layer.png",//page 8
    "assets/bg9Layer.png",//page 9
    "assets/bg10Layer.png",//page 10
    "assets/bg11Layer.png",//page 11
    "assets/bg11Light.png",
    "assets/bg12CaveLeft.png",//page 12
    "assets/bg12CaveRight.png",
    "assets/bg12CaveSpike.png",
    "assets/bg12Wall.png",
    "assets/bg12Light.png",
    "assets/bg12CaveDark.png",
    "assets/startScreen.png",//background maybe delete
    "assets/bgCaveLight.png",
    "assets/bg1.png",
    "assets/bg2.png",
    "assets/bg3.png",
    "assets/bg4.png",
    "assets/bg4Open.png",
    "assets/bg5.png",
    "assets/bg6.jpg",
    "assets/bg7.jpg",
    "assets/bg8.png",
    "assets/bg9.png",
    "assets/bg10.png",
    "assets/bg11.png",
    "assets/bg12.png",
    "assets/bakround.jpg",
    "assets/logman.png",
    "assets/gameOver.png",
    "assets/theEnd.png",
);