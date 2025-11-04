let clickedCard = null;
let clicks = 0;
var first = 0;
var mark = 0;
let play = 1;
var blackCastle = 0;
var WhiteCastle = 0;
var graveW = 1;
var graveB = 1;
function restart(){
    location.reload(true);
}
document.onkeydown = function (e) {
    e = e || window.event;
    var key = e.which || e.keyCode;
    if (key === 82) {//r
        location.reload(true);
    }
}
function board(){
    for (t = 1; t <= 64; t++) {
        if (p == 0) {
            let tar = document.getElementById(t);
            tar.classList.remove("premotion");
            tar.classList.remove("moveable");
            if (t % 8 == 0) {
                tar.style.backgroundColor = "rgb(81, 80, 80)";
                p++;
            }
            else if (t % 2 == 0) {
                tar.style.backgroundColor = "rgb(81, 80, 80)";
            }
            else {
                tar.style.backgroundColor = "white";
            }
        }
        else {
            let tar = document.getElementById(t);
            tar.classList.remove("premotion");
            tar.classList.remove("moveable");
            if (t % 8 == 0) {
                tar.style.backgroundColor = "white";
                p = 0;
            }
            else if (t % 2 == 0) {
                tar.style.backgroundColor = "white";
            }
            else {
                tar.style.backgroundColor = "rgb(81, 80, 80)";
            }
        }
    }
}
let p = 0;
let j = 0;
function run(){
    board();
    const nodeList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64];
    for (i = 0; i < nodeList.length; i++) {
        if ((nodeList[i]) == 1) {
            document.getElementById(nodeList[i]).setAttribute("corner", "topleftcorner");
        }
        else if ((nodeList[i]) == 8) {
            document.getElementById(nodeList[i]).setAttribute("corner", "toprightcorner");
        }
        else if ((nodeList[i]) == 57) {
            document.getElementById(nodeList[i]).setAttribute("corner", "bottomleftcorner");
        }
        else if ((nodeList[i]) == 64) {
            document.getElementById(nodeList[i]).setAttribute("corner", "bottomrightcorner");
        }
        else if ((nodeList[i]) % 8 == 0 && i !== 8 && i !== 64) {
            document.getElementById(nodeList[i]).setAttribute("corner", "rightcorner");
        }
        else if (((nodeList[i]) - 1) % 8 == 0 && i !== 1 && i !== 57) {
            document.getElementById(nodeList[i]).setAttribute("corner", "leftcorner");
        }
        else if ((nodeList[i]) < 9 && i !== 0 && i !== 9) {
            document.getElementById(nodeList[i]).setAttribute("corner", "topcorner");
        }
        else if ((nodeList[i]) > 56 && i !== 56 && i !== 65) {
            document.getElementById(nodeList[i]).setAttribute("corner", "bottomcorner");
        }
    }
    for(h = 9; h<17; h++){//blackpawn
        let tar = document.getElementById(h);
        tar.classList.add("blackpawn", "first")
    }
    for (k = 49; k < 57; k++) {//whitepawn
        let tar = document.getElementById(k);
        tar.classList.add("whitepawn", "first")
    }
    for (q = 1; q < 9; q++) {
        let tar = document.getElementById(q);
        let classes;
        switch (q) {
            case 1:
                classes = "blackrook"
                break
            case 2:
                classes = "blackknight"
                break
            case 3:
                classes = "blackBishop"
                break
            case 4:
                classes = "blackqueen"
                break
            case 5:
                classes = "blackking", "Castling"
                break
            case 6:
                classes = "blackBishop"
                break
            case 7:
                classes = "blackknight"
                break
            case 8:
                classes = "blackrook"
                break
        }
        tar.classList.add(classes)
    }
    for (c = 57; c < 65; c++) {
        let tar = document.getElementById(c);
        let classes;
        switch (c) {
            case 57:
                classes = "whiterook"
                break
            case 58:
                classes = "whiteknight"
                break
            case 59:
                classes = "whiteBishop"
                break
            case 60:
                classes = "whitequeen"
                break
            case 61:
                classes = "whiteking"
                break
            case 62:
                classes = "whiteBishop"
                break
            case 63:
                classes = "whiteknight"
                break
            case 64:
                classes = "whiterook"
                break
        }
        tar.classList.add(classes)
    }
}
let lastclick= null;
let unit;
function Start(e){
    pieces();
    const target = e.currentTarget;// make target the block you clicked on
    let num = parseInt(target.getAttribute("id"));// get the number of the block
    let player = document.getElementById("player")
    if (play == 0) {//stops code from running after game ends
        return
    }
    else if (target.className.includes("moveable")){

    }
    else if (play % 2 == 0) {//gets rid of en passant after the fist move has happened.
        const nodeList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64];
        for (i = 1; i < nodeList.length; i++) {
            document.getElementById(i).classList.remove("B_en_passant");
        }
        if (target.className.includes("whitequeen") || target.className.includes("whiteking") || target.className.includes("whiteBishop") || target.className.includes("whiteknight") || target.className.includes("whiterook") || target.className.includes("whitepawn")) {
            return
        }
    }
    else {//gets rid of en passant after the fist move has happened.
        const nodeList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64];
        for (i = 1; i < nodeList.length; i++) {
            document.getElementById(i).classList.remove("W_en_passant");
        }
        if (target.className.includes("blackpawn") || target.className.includes("blackqueen") || target.className.includes("blackking") || target.className.includes("blackBishop") || target.className.includes("blackknight") || target.className.includes("blackrook")) {
            return
        }
    }
    if (!lastclick) {//check if is it the first time intracting with board
        board();
        moveable(num, target);
        lastclick = target;
    }
    else if (lastclick) {//not first time
        if (target.className.includes("moveable")) {// can it be moved
            //add piece to the graveyard after it is captured.
            if (target.className.includes("blackking")) {//black king taken
                document.getElementById("BG" + graveB).classList.add("blackking")
                alert("white won in " + play + " moves");
                play = -1;
            }
            else if (target.className.includes("whiteking")) {//white king taken
                document.getElementById("WG" + graveW).classList.add("whiteking")
                alert("black won in " + play + " moves");
                play = -1;
            }
            if (target.className.includes("blackpawn")) {
                document.getElementById("BG" + graveB).classList.add("blackpawn")
                graveB++;
            }
            else if (target.className.includes("blackqueen")) {
                document.getElementById("BG" + graveB).classList.add("blackqueen")
                graveB++;
            }
            else if (target.className.includes("blackBishop")) {
                document.getElementById("BG" + graveB).classList.add("blackBishop")
                graveB++;
            }
            else if (target.className.includes("blackknight")) {
                document.getElementById("BG" + graveB).classList.add("blackknight")
                graveB++;
            }
            else if (target.className.includes("blackrook")) {
                document.getElementById("BG" + graveB).classList.add("blackrook")
                graveB++;
            }
            else if (target.className.includes("whitequeen")) {
                document.getElementById("WG" + graveW).classList.add("whitequeen")
                graveW++;
            }
            else if (target.className.includes("whiteBishop")) {
                document.getElementById("WG" + graveW).classList.add("whiteBishop")
                graveW++;
            }
            else if (target.className.includes("whiteknight")) {
                document.getElementById("WG" + graveW).classList.add("whiteknight")
                graveW++;
            }
            else if (target.className.includes("whiterook")) {
                document.getElementById("WG" + graveW).classList.add("whiterook")
                graveW++;
            }
            else if (target.className.includes("whitepawn")) {
                document.getElementById("WG" + graveW).classList.add("whitepawn")
                graveW++;
            }
            else if (target.className.includes("CanCastleR")) {//it is able to castle to the right
                if (lastclick.className.includes("blackking")) {//makes sure the right piece is moving
                    target.classList.add("blackking");
                    document.getElementById(num - 1).classList.add("blackrook")
                    blackCastle++;
                }
                else if (lastclick.className.includes("whiteking")) {//makes sure the right piece is moving
                    target.classList.add("whiteking");
                    document.getElementById(num - 1).classList.add("whiterook")
                    WhiteCastle++;
                }
                remove(document.getElementById(num + 1))
                remove(lastclick);
                pieces();
                board();
                lastclick = null;
                play++;
                return
            }
            if (target.className.includes("CanCastleL")) {//it is able to castle to the left
                if (lastclick.className.includes("blackking")) {//makes sure the right piece is moving
                    target.classList.add("blackking");
                    document.getElementById(num + 1).classList.add("blackrook")
                    blackCastle++;
                }
                else if (lastclick.className.includes("whiteking")) {//makes sure the right piece is moving
                    target.classList.add("whiteking");
                    document.getElementById(num + 1).classList.add("whiterook")
                    WhiteCastle++;
                }
                remove(document.getElementById(num - 1))
                remove(lastclick);
                pieces();
                board();
                lastclick = null;
                play++;
                return
            }
            else if (target.className.includes("premotion")){//can premote
                let nam;
                if (lastclick.className.includes("whitepawn")) {//figues out what pawn is premoting to based on the radio buttons
                    if (document.getElementById("Queen").checked){
                        nam = "whitequeen";
                    }
                    else if (document.getElementById("Rook").checked) {
                        nam = "whiterook"; 
                    }
                    else if (document.getElementById("Knight").checked) {
                        nam = "whiteknight";
                    }
                    else if (document.getElementById("Bishop").checked) {
                        nam = "whiteBishop";
                    }
                }
                else if (lastclick.className.includes("blackpawn")){
                    if (document.getElementById("Queen").checked) {
                        nam = "blackqueen";
                    }
                    else if (document.getElementById("Rook").checked) {
                        nam = "blackrook";
                    }
                    else if (document.getElementById("Knight").checked) {
                        nam = "blackknight";
                    }
                    else if (document.getElementById("Bishop").checked) {
                        nam = "blackBishop";
                    }
                }
                remove(target);
                remove(lastclick);
                target.classList.add(nam);
                pieces();
                board();
                lastclick = null;
                play++;
            }
            else{//a normal move without any captuing
                remove(target);
                unit = remove(lastclick);
                target.classList.add(unit);
                pieces();
                board();
                lastclick = null;
                play++;
            } 
        }
        else {//changes the piece that is moving to what is clicked
            board();
            moveable(num, target);
            lastclick = target;
        }
        if (play % 2 == 0){//changes who is the curent player.
            player.classList.remove("white");
            player.classList.add("black")
        }
        else{
            player.classList.remove("black");
            player.classList.add("white")
        }
    }
}
function pieces(){
    for (tile = 1; tile <= 64; tile++){
        if (document.getElementById(tile).className.includes("blackpawn")) {
            document.getElementById(tile).textContent = "black pawn"
        }
        else if (document.getElementById(tile).className.includes("blackqueen")) {
            document.getElementById(tile).textContent = "black queen"
        }
        else if (document.getElementById(tile).className.includes("blackking")) {
            document.getElementById(tile).textContent = "black king"
        }
        else if (document.getElementById(tile).className.includes("blackBishop")) {
            document.getElementById(tile).textContent = "black Bishop"
        }
        else if (document.getElementById(tile).className.includes("blackknight")) {
            document.getElementById(tile).textContent = "black knight"
        }
        else if (document.getElementById(tile).className.includes("blackrook")) {
            document.getElementById(tile).textContent = "black rook"
        }
        else if (document.getElementById(tile).className.includes("whitequeen")) {
            document.getElementById(tile).textContent = "white queen"
        }
        else if (document.getElementById(tile).className.includes("whiteking")) {
            document.getElementById(tile).textContent = "white king"
        }
        else if (document.getElementById(tile).className.includes("whiteBishop")) {
            document.getElementById(tile).textContent = "white Bishop"
        }
        else if (document.getElementById(tile).className.includes("whiteknight")) {
            document.getElementById(tile).textContent = "white knight"
        }
        else if (document.getElementById(tile).className.includes("whiterook")) {
            document.getElementById(tile).textContent = "white rook"
        }
        else if (document.getElementById(tile).className.includes("whitepawn")) {
            document.getElementById(tile).textContent = "white pawn"
        }
        else{
            document.getElementById(tile).textContent = ""
        }
    }
}

function moveable(num, target){
    if (target.className.includes("whitepawn")) {
        let lu = document.getElementById(num - 9)
        let ru = document.getElementById(num - 7)
        if (ru.className.includes("blackpawn") || ru.className.includes("blackqueen") || ru.className.includes("blackking") || ru.className.includes("blackBishop") || ru.className.includes("blackknight") || ru.className.includes("blackrook")) {
            ru.style.backgroundColor = "greenyellow"
            ru.classList.add("moveable");
            if (ru.getAttribute("corner") === "topleftcorner" || ru.getAttribute("corner") === "toprightcorner" || ru.getAttribute("corner") === "topcorner"){
                ru.classList.add("premotion");
            }
        }
        if (lu.className.includes("blackpawn") || lu.className.includes("blackqueen") || lu.className.includes("blackking") || lu.className.includes("blackBishop") || lu.className.includes("blackknight") || lu.className.includes("blackrook")) {//|| lu.className.includes("B_en_passant")
            lu.classList.add("moveable");
            lu.style.backgroundColor = "greenyellow"
            if (lu.getAttribute("corner") === "topleftcorner" || lu.getAttribute("corner") === "toprightcorner" || lu.getAttribute("corner") === "topcorner") {
                lu.classList.add("premotion");
            }
        }
        if (target.className.includes("first")) {
            if (block(document.getElementById(num - 16), 0)){
                document.getElementById(num - 16).classList.add("moveable");
                document.getElementById(num - 16).style.backgroundColor = "greenyellow"
                //document.getElementById(num - 8).classList.add("W_en_passant");
                if (document.getElementById(num - 16).getAttribute("corner") === "topleftcorner" || document.getElementById(num - 16).getAttribute("corner") === "toprightcorner" || document.getElementById(num - 16).getAttribute("corner") === "topcorner") {
                    document.getElementById(num - 16).classList.add("premotion");
                }
            }
        }
        if (block(document.getElementById(num - 8), 0)) {
            document.getElementById(num - 8).classList.add("moveable");
            document.getElementById(num - 8).style.backgroundColor = "greenyellow"

            if (document.getElementById(num - 8).getAttribute("corner") === "topleftcorner" || document.getElementById(num - 8).getAttribute("corner") === "toprightcorner" || document.getElementById(num - 8).getAttribute("corner") === "topcorner") {
                document.getElementById(num - 8).classList.add("premotion");
            }
        }
    }
    else if (target.className.includes("blackpawn")) {
        let ld = document.getElementById(num + 7)
        let rd = document.getElementById(num + 9)
        if (rd.className.includes("whitequeen") || rd.className.includes("whiteking") || rd.className.includes("whiteBishop") || rd.className.includes("whiteknight") || rd.className.includes("whiterook") || rd.className.includes("whitepawn")) {//|| rd.className.includes("W_en_passant")
            rd.style.backgroundColor = "greenyellow"
            rd.classList.add("moveable");
            if (rd.getAttribute("corner") === "bottomleftcorner" || rd.getAttribute("corner") === "bottomrightcorner" || rd.getAttribute("corner") === "bottomcorner") {
                rd.classList.add("premotion");
            }
        }
        if (ld.className.includes("whitequeen") || ld.className.includes("whiteking") || ld.className.includes("whiteBishop") || ld.className.includes("whiteknight") || ld.className.includes("whiterook") || ld.className.includes("whitepawn")) {//|| ld.className.includes("W_en_passant")
            ld.classList.add("moveable");
            ld.style.backgroundColor = "greenyellow"
            if (ld.getAttribute("corner") === "bottomleftcorner" || ld.getAttribute("corner") === "bottomrightcorner" || ld.getAttribute("corner") === "bottomcorner") {
                ld.classList.add("premotion");
            }
        }
        if (target.className.includes("first")) {
            if (block(document.getElementById(num + 16), 0)) {
                document.getElementById(num + 16).classList.add("moveable");
                document.getElementById(num + 16).style.backgroundColor = "greenyellow"
                //document.getElementById(num + 8).classList.add("B_en_passant");
                if (document.getElementById(num + 16).getAttribute("corner") === "bottomleftcorner" || document.getElementById(num + 16).getAttribute("corner") === "bottomrightcorner" || document.getElementById(num + 16).getAttribute("corner") === "bottomcorner") {
                    document.getElementById(num + 16).classList.add("premotion");
                }
            }
        }
        if (block(document.getElementById(num + 8), 0)) {
            document.getElementById(num + 8).classList.add("moveable");
            document.getElementById(num + 8).style.backgroundColor = "greenyellow"

            if (document.getElementById(num + 8).getAttribute("corner") === "bottomleftcorner" || document.getElementById(num + 8).getAttribute("corner") === "bottomrightcorner" || document.getElementById(num + 8).getAttribute("corner") === "bottomcorner") {
                document.getElementById(num + 8).classList.add("premotion");
            }
        }
    }
    else if (target.className.includes("blackrook") || target.className.includes("whiterook")) {
        let whiteblack;
        if (target.className.includes("whiterook")) {
            whiteblack = 1;
        }
        if (target.className.includes("blackrook")) {
            whiteblack = 2;
        }
        let w = 0;
        let bn = 0;
        let no = 0;
        let np = 0;
        for (D = num + 8, U = num - 8, Le = num - 1, Ri = num + 1; D < 65 || U > 0 || Le > 0 || Ri < 65; D += 8, U -= 8, Le -= 1, Ri += 1) {
            if (D < 65) {
                if (no == 0) {
                    if (block(document.getElementById(D), whiteblack)) {
                        document.getElementById(D).classList.add("moveable");
                        document.getElementById(D).style.backgroundColor = "greenyellow"
                    }
                    else{
                        no = 1;
                    }
                }
            }
            if (U > 0) {
                if (np == 0){
                    if (block(document.getElementById(U), whiteblack)) {
                        document.getElementById(U).classList.add("moveable");
                        document.getElementById(U).style.backgroundColor = "greenyellow"
                    }
                    else {
                        np = 1;
                    }
                }
            }


            if (Le < 1 || w > 0 || document.getElementById(Le).getAttribute("corner") === "rightcorner") {
                w = 1;
            }
            else if (document.getElementById(Le).getAttribute("corner") === "topleftcorner" || document.getElementById(Le).getAttribute("corner") === "bottomleftcorner" || document.getElementById(Le).getAttribute("corner") === "leftcorner") {
                if (block(document.getElementById(Le), whiteblack)) {
                    document.getElementById(Le).classList.add("moveable");
                    document.getElementById(Le).style.backgroundColor = "greenyellow"
                    w++;
                }
                else {
                    w++;
                }
            }
            else if (document.getElementById(Le).getAttribute("corner") === "toprightcorner" || document.getElementById(Le).getAttribute("corner") === "bottomrightcorner" || document.getElementById(Le).getAttribute("corner") === "rightcorner"){
                w++;
            }
            else {
                if (block(document.getElementById(Le), whiteblack)) {
                    document.getElementById(Le).classList.add("moveable");
                    document.getElementById(Le).style.backgroundColor = "greenyellow"
                }
                else {
                    w++;
                }
            }



            if (Ri > 64 || bn > 0 || document.getElementById(Ri).getAttribute("corner") === "leftcorner") {
                bn = 1;
            }
            else if (document.getElementById(Ri).getAttribute("corner") === "toprightcorner" || document.getElementById(Ri).getAttribute("corner") === "bottomrightcorner" || document.getElementById(Ri).getAttribute("corner") === "rightcorner") {
                if (block(document.getElementById(Ri), whiteblack)) {
                    document.getElementById(Ri).classList.add("moveable");
                    document.getElementById(Ri).style.backgroundColor = "greenyellow"
                    bn++;
                }
                else {
                    bn++;
                }
            }
            else if (document.getElementById(Ri).getAttribute("corner") === "topleftcorner" || document.getElementById(Ri).getAttribute("corner") === "bottomleftcorner" || document.getElementById(Ri).getAttribute("corner") === "leftcorner") {
                bn++;
            }
            else {
                if (block(document.getElementById(Ri), whiteblack)) {
                    document.getElementById(Ri).classList.add("moveable");
                    document.getElementById(Ri).style.backgroundColor = "greenyellow"
                }
                else {
                    bn++;
                }
            }
        }
    }
    else if (target.className.includes("blackBishop") || target.className.includes("whiteBishop")) {
        let whiteblack;
        if (target.className.includes("whiteBishop")) {
            whiteblack = 1;
        }
        if (target.className.includes("blackBishop")) {
            whiteblack = 2;
        }
        let u = 0;
        let z = 0;
        let d = 0;
        var f = 0;
        let fo = 0;
        let fn = 0;
        if ((num - 7) < 0) {
            f = 1;
        }
        if ((num - 9) < 0) {
            d++;
        }
        if ((num + 7) > 64) {
            z++;
        }
        if ((num + 9) > 64) {
            u++;
        }
        if (fn == 0) {
            for (Ul = num - 7, Ur = num - 9; fn < 1; Ul -= 7, Ur -= 9) {
                if (f == 0) {
                    if (Ul < 1) {
                        f++;
                    }
                    else if (document.getElementById(Ul).getAttribute("corner") === "leftcorner" || document.getElementById(Ul).getAttribute("corner") === "topleftcorner" || document.getElementById(Ul).getAttribute("corner") === "bottomleftcorner") {
                        f++;
                    }
                    else if (document.getElementById(Ul).getAttribute("corner") === "leftcorner" || document.getElementById(Ul).getAttribute("corner") === "topleftcorner") {
                        if (block(document.getElementById(Ul), whiteblack)) {
                            document.getElementById(Ul).classList.add("moveable");
                            document.getElementById(Ul).style.backgroundColor = "greenyellow"
                        }
                        f++;
                    }
                    else if (block(document.getElementById(Ul), whiteblack)) {
                        document.getElementById(Ul).classList.add("moveable");
                        document.getElementById(Ul).style.backgroundColor = "greenyellow"
                    }
                    else{
                        f++;
                    }
                }
                if (d == 0) {
                    if (Ur < 1) {
                        d++;
                    }
                    else if (document.getElementById(Ur).getAttribute("corner") === "rightcorner" || document.getElementById(Ur).getAttribute("corner") === "bottomrightcorner" || document.getElementById(Ur).getAttribute("corner") === "toprightcorner") {
                        d++;
                    }
                    else if (document.getElementById(Ur).getAttribute("corner") === "leftcorner" || document.getElementById(Ur).getAttribute("corner") === "topcorner" || document.getElementById(Ur).getAttribute("corner") === "topleftcorner") {
                        if (block(document.getElementById(Ur), whiteblack)) {
                            document.getElementById(Ur).classList.add("moveable");
                            document.getElementById(Ur).style.backgroundColor = "greenyellow"
                        }
                        d++;
                    }
                    else if (block(document.getElementById(Ur), whiteblack)) {
                        document.getElementById(Ur).classList.add("moveable");
                        document.getElementById(Ur).style.backgroundColor = "greenyellow"
                    }
                    else{
                        d++;
                    }
                }
                if ((f + d) > 1) {
                    fn++;
                }
            }
        }
        for (Dl = num + 7, Dr = num + 9; fo < 1; Dl += 7, Dr += 9) {
            if (u == 0) {
                if (Dr > 64) {
                    u++;
                }
                else if (document.getElementById(Dr).getAttribute("corner") === "leftcorner" || document.getElementById(Dr).getAttribute("corner") === "bottomleftcorner" || document.getElementById(Dr).getAttribute("corner") === "topleftcorner") {
                    u++;
                }
                else if (document.getElementById(Dr).getAttribute("corner") === "rightcorner" || document.getElementById(Dr).getAttribute("corner") === "bottomcorner" || document.getElementById(Dr).getAttribute("corner") === "bottomrightcorner") {
                    if (block(document.getElementById(Dr), whiteblack)) {
                        document.getElementById(Dr).classList.add("moveable");
                        document.getElementById(Dr).style.backgroundColor = "greenyellow"
                    }
                    u++;
                }
                else if (block(document.getElementById(Dr), whiteblack)) {
                    document.getElementById(Dr).classList.add("moveable");
                    document.getElementById(Dr).style.backgroundColor = "greenyellow"
                }
                else {
                    u++;
                }
            }
            if (z == 0) {
                if (Dl > 64) {
                    z++;
                }
                else if (document.getElementById(Dl).getAttribute("corner") === "rightcorner" || document.getElementById(Dl).getAttribute("corner") === "bottomrightcorner" || document.getElementById(Dl).getAttribute("corner") === "toprightcorner") {
                    z++;
                }
                else if (document.getElementById(Dl).getAttribute("corner") === "leftcorner" || document.getElementById(Dl).getAttribute("corner") === "bottomcorner" || document.getElementById(Dl).getAttribute("corner") === "bottomleftcorner") {
                    if (block(document.getElementById(Dl), whiteblack)) {
                        document.getElementById(Dl).classList.add("moveable");
                        document.getElementById(Dl).style.backgroundColor = "greenyellow"
                    }
                    z++;
                }
                else if (block(document.getElementById(Dl), whiteblack)) {
                    document.getElementById(Dl).classList.add("moveable");
                    document.getElementById(Dl).style.backgroundColor = "greenyellow"
                }
                else {
                    z++;
                }
            }
            if ((z + u) > 1) {
                fo++;
            }
        }
    }
    else if (target.className.includes("blackknight") || target.className.includes("whiteknight")) {
        let whiteblack;
        if (target.className.includes("whiteknight")) {
            whiteblack = 1;
        }
        if (target.className.includes("blackknight")) {
            whiteblack = 2;
        }
        let upr1 = num - 15;
        let upr2 = num - 6;
        let upl1 = num - 17;
        let upl2 = num - 10;
        let dor1 = num + 10;
        let dor2 = num + 17;
        let dol1 = num + 6;
        let dol2 = num + 15;
        if (upr1 - 1 < 1) {

        }
        else if (document.getElementById(upr1).getAttribute("corner") === "topleftcorner" || document.getElementById(upr1).getAttribute("corner") === "bottomleftcorner" || document.getElementById(upr1).getAttribute("corner") === "leftcorner" || document.getElementById(upr1 - 1).getAttribute("corner") === "rightcorner" || document.getElementById(upr1 - 1).getAttribute("corner") === "toprightcorner" || document.getElementById(upr1 - 1).getAttribute("corner") === "bottomrightcorner") {

        }
        else {
            if (block(document.getElementById(upr1), whiteblack)) {
                document.getElementById(upr1).classList.add("moveable");
                document.getElementById(upr1).style.backgroundColor = "greenyellow";
            }
        }



        if (upr2 - 1 < 1) {

        }
        else if (document.getElementById(upr2).getAttribute("corner") === "topleftcorner" || document.getElementById(upr2).getAttribute("corner") === "bottomleftcorner" || document.getElementById(upr2).getAttribute("corner") === "leftcorner" || document.getElementById(upr2 - 1).getAttribute("corner") === "topleftcorner" || document.getElementById(upr2 - 1).getAttribute("corner") === "bottomleftcorner" || document.getElementById(upr2 - 1).getAttribute("corner") === "leftcorner") {

        }
        else {
            if (block(document.getElementById(upr2), whiteblack)) {
                document.getElementById(upr2).classList.add("moveable");
                document.getElementById(upr2).style.backgroundColor = "greenyellow";
            }
        }


        if (upl1 < 1) {

        }
        else if (document.getElementById(upl1).getAttribute("corner") === "toprightcorner" || document.getElementById(upl1).getAttribute("corner") === "bottomrightcorner" || document.getElementById(upl1).getAttribute("corner") === "rightcorner" || document.getElementById(upl1 + 1).getAttribute("corner") === "leftcorner" || document.getElementById(upl1 + 1).getAttribute("corner") === "topleftcorner" || document.getElementById(upl1 + 1).getAttribute("corner") === "bottomleftcorner") {
        }
        else {
            if (block(document.getElementById(upl1), whiteblack)) {
                document.getElementById(upl1).classList.add("moveable");
                document.getElementById(upl1).style.backgroundColor = "greenyellow";
            }
        }

        if (upl2 < 1) {

        }
        else if (document.getElementById(upl2).getAttribute("corner") === "toprightcorner" || document.getElementById(upl2).getAttribute("corner") === "bottomrightcorner" || document.getElementById(upl2).getAttribute("corner") === "rightcorner" || document.getElementById(upl2 + 1).getAttribute("corner") === "toprightcorner" || document.getElementById(upl2 + 1).getAttribute("corner") === "bottomrightcorner" || document.getElementById(upl2 + 1).getAttribute("corner") === "rightcorner") {
        }
        else {
            if (block(document.getElementById(upl2), whiteblack)) {
                document.getElementById(upl2).classList.add("moveable");
                document.getElementById(upl2).style.backgroundColor = "greenyellow";
            }
        }


        if (dor1 > 64) {

        }
        else if (document.getElementById(dor1).getAttribute("corner") === "topleftcorner" || document.getElementById(dor1).getAttribute("corner") === "bottomleftcorner" || document.getElementById(dor1).getAttribute("corner") === "leftcorner" || document.getElementById(dor1 - 1).getAttribute("corner") === "leftcorner" || document.getElementById(dor1 - 1).getAttribute("corner") === "topleftcorner" || document.getElementById(dor1 - 1).getAttribute("corner") === "bottomleftcorner") {
        }
        else {
            if (block(document.getElementById(dor1), whiteblack)) {
                document.getElementById(dor1).classList.add("moveable");
                document.getElementById(dor1).style.backgroundColor = "greenyellow";
            }
        }


        if (dor2 > 64) {

        }
        else if (document.getElementById(dor2).getAttribute("corner") === "topleftcorner" || document.getElementById(dor2).getAttribute("corner") === "bottomleftcorner" || document.getElementById(dor2).getAttribute("corner") === "leftcorner" || document.getElementById(dor2 - 1).getAttribute("corner") === "toprightcorner" || document.getElementById(dor2 - 1).getAttribute("corner") === "bottomrightcorner" || document.getElementById(dor2 - 1).getAttribute("corner") === "rightcorner") {

        }
        else {
            if (block(document.getElementById(dor2), whiteblack)) {
                document.getElementById(dor2).classList.add("moveable");
                document.getElementById(dor2).style.backgroundColor = "greenyellow";
            }
        }


        if (dol1 + 1 > 64) {
        }
        else if (document.getElementById(dol1).getAttribute("corner") === "toprightcorner" || document.getElementById(dol1).getAttribute("corner") === "bottomrightcorner" || document.getElementById(dol1).getAttribute("corner") === "rightcorner" || document.getElementById(dol1 + 1).getAttribute("corner") === "toprightcorner" || document.getElementById(dol1 + 1).getAttribute("corner") === "bottomrightcorner" || document.getElementById(dol1 + 1).getAttribute("corner") === "rightcorner") {
        }
        else {
            if (block(document.getElementById(dol1), whiteblack)) {
                document.getElementById(dol1).classList.add("moveable");
                document.getElementById(dol1).style.backgroundColor = "greenyellow";
            }
        }


        if (dol2 + 1 > 64) {

        }
        else if (document.getElementById(dol2).getAttribute("corner") === "toprightcorner" || document.getElementById(dol2).getAttribute("corner") === "bottomrightcorner" || document.getElementById(dol2).getAttribute("corner") === "rightcorner" || document.getElementById(dol2 + 1).getAttribute("corner") === "topleftcorner" || document.getElementById(dol2 + 1).getAttribute("corner") === "bottomleftcorner" || document.getElementById(dol2 + 1).getAttribute("corner") === "leftcorner") {

        }
        else {
            if (block(document.getElementById(dol2), whiteblack)) {
                document.getElementById(dol2).classList.add("moveable");
                document.getElementById(dol2).style.backgroundColor = "greenyellow";
            }
        }
    }
    else if (target.className.includes("blackking") || target.className.includes("whiteking")) {
        let whiteblack;
        if (target.className.includes("whiteking")) {
            whiteblack = 1;
        }
        if (target.className.includes("blackking")) {
            whiteblack = 2;
        }
        if(num+1>64){

        }
        else if (document.getElementById(num + 1).getAttribute("corner") === "leftcorner") {
        }
        else {
            if (block(document.getElementById(num + 1), whiteblack)) {
                document.getElementById(num + 1).classList.add("moveable");
                document.getElementById(num + 1).style.backgroundColor = "greenyellow";
            }
        }
        if (document.getElementById(num - 1).getAttribute("corner") === "rightcorner") {
        }
        else {
            if (block(document.getElementById(num - 1), whiteblack)) {
                document.getElementById(num - 1).classList.add("moveable");
                document.getElementById(num - 1).style.backgroundColor = "greenyellow";
            }
        }
        if (target.className.includes("Castling")){
            if (document.getElementById(num + 3).className.includes("whiterook") || document.getElementById(num + 3).className.includes("blackrook")){
                if (block(document.getElementById(num + 1), 0)){
                    if (block(document.getElementById(num + 2), 0)) {
                        if (whiteblack == 1){
                            if (WhiteCastle == 0){
                                document.getElementById(num + 2).classList.add("CanCastleR");
                                document.getElementById(num + 2).classList.add("moveable");
                                document.getElementById(num + 2).style.backgroundColor = "greenyellow";
                            }
                        }
                        else {
                            if (blackCastle == 0) {
                                document.getElementById(num + 2).classList.add("CanCastleR");
                                document.getElementById(num + 2).classList.add("moveable");
                                document.getElementById(num + 2).style.backgroundColor = "greenyellow";
                            }
                        }
                    }
                }
            }
            if (document.getElementById(num - 4).className.includes("whiterook") || document.getElementById(num - 4).className.includes("blackrook")) {
                if (block(document.getElementById(num - 1), 0)) {
                    if (block(document.getElementById(num - 2), 0)) {
                        if (block(document.getElementById(num - 3), 0))
                            if (whiteblack == 1) {
                                if (WhiteCastle == 0) {
                                    document.getElementById(num - 3).classList.add("CanCastleL");
                                    document.getElementById(num - 3).classList.add("moveable");
                                    document.getElementById(num - 3).style. backgroundColor = "greenyellow";
                                }
                            }
                            else {
                                if (blackCastle == 0) {
                                    document.getElementById(num - 3).classList.add("CanCastleL");
                                    document.getElementById(num - 3).classList.add("moveable");
                                    document.getElementById(num - 3).style.backgroundColor = "greenyellow";
                                }
                        }
                    }
                }
            }
        }
        if (num + 8 < 65) {
            if (block(document.getElementById(num + 8), whiteblack)) {
                document.getElementById(num + 8).classList.add("moveable");
                document.getElementById(num + 8).style.backgroundColor = "greenyellow";
            }
        }
        if (num - 8 > 0) {
            if (block(document.getElementById(num - 8), whiteblack)) {
                document.getElementById(num - 8).classList.add("moveable");
                document.getElementById(num - 8).style.backgroundColor = "greenyellow";
            }
        }



        if (num + 7 > 64) {

        }
        else if (document.getElementById(num + 7).getAttribute("corner") === "rightcorner") {

        }
        else {
            if (block(document.getElementById(num + 7), whiteblack)) {
                document.getElementById(num + 7).classList.add("moveable");
                document.getElementById(num + 7).style.backgroundColor = "greenyellow";
            }
        }



        if (num - 7 < 0) {

        }
        else if (document.getElementById(num - 7).getAttribute("corner") === "leftcorner") {

        }
        else {
            if (block(document.getElementById(num - 7), whiteblack)) {
                document.getElementById(num - 7).classList.add("moveable");
                document.getElementById(num - 7).style.backgroundColor = "greenyellow";
            }
        }



        if (num + 9 > 64) {

        }
        else if (document.getElementById(num + 9).getAttribute("corner") === "leftcorner") {

        }
        else {
            if (block(document.getElementById(num + 9), whiteblack)) {
                document.getElementById(num + 9).classList.add("moveable");
                document.getElementById(num + 9).style.backgroundColor = "greenyellow";
            }
        }



        if (num - 9 < 0) {

        }
        else if (document.getElementById(num - 9).getAttribute("corner") === "rightcorner") {

        }
        else {
            if (block(document.getElementById(num - 9), whiteblack)) {
                document.getElementById(num - 9).classList.add("moveable");
                document.getElementById(num - 9).style.backgroundColor = "greenyellow";
            }
        }
    }
    else if (target.className.includes("blackqueen") || target.className.includes("whitequeen")) {//queen movement rook+bishop
        let w = 0;
        let bn = 0;
        let u = 0;
        let z = 0;
        let d = 0;
        var f = 0;
        let fo = 0;
        let fn = 0;
        let no = 0;
        let np = 0;
        let whiteblack;
        if (target.className.includes("whitequeen")) {
            whiteblack = 1;
        }
        if (target.className.includes("blackqueen")) {
            whiteblack = 2;
        }
        for (D = num + 8, U = num - 8, Le = num - 1, Ri = num + 1; D < 65 || U > 0 || Le > 0 || Ri < 65; D += 8, U -= 8, Le -= 1, Ri += 1) {
            if (D < 65) {
                if (no == 0) {
                    if (block(document.getElementById(D), whiteblack)) {
                        document.getElementById(D).classList.add("moveable");
                        document.getElementById(D).style.backgroundColor = "greenyellow"
                    }
                    else {
                        no = 1;
                    }
                }
            }
            if (U > 0) {
                if (np == 0) {
                    if (block(document.getElementById(U), whiteblack)) {
                        document.getElementById(U).classList.add("moveable");
                        document.getElementById(U).style.backgroundColor = "greenyellow"
                    }
                    else {
                        np = 1;
                    }
                }
            }


            if (Le < 1 || w > 0 || document.getElementById(Le).getAttribute("corner") === "rightcorner") {
                w = 1;
            }
            else if (document.getElementById(Le).getAttribute("corner") === "topleftcorner" || document.getElementById(Le).getAttribute("corner") === "bottomleftcorner" || document.getElementById(Le).getAttribute("corner") === "leftcorner") {
                if (block(document.getElementById(Le), whiteblack)) {
                    document.getElementById(Le).classList.add("moveable");
                    document.getElementById(Le).style.backgroundColor = "greenyellow"
                    w++;
                }
                else {
                    w++;
                }
            }
            else if (document.getElementById(Le).getAttribute("corner") === "toprightcorner" || document.getElementById(Le).getAttribute("corner") === "bottomrightcorner" || document.getElementById(Le).getAttribute("corner") === "rightcorner") {
                w++;
            }
            else {
                if (block(document.getElementById(Le), whiteblack)) {
                    document.getElementById(Le).classList.add("moveable");
                    document.getElementById(Le).style.backgroundColor = "greenyellow"
                }
                else {
                    w++;
                }
            }



            if (Ri > 64 || bn > 0 || document.getElementById(Ri).getAttribute("corner") === "leftcorner") {
                bn = 1;
            }
            else if (document.getElementById(Ri).getAttribute("corner") === "toprightcorner" || document.getElementById(Ri).getAttribute("corner") === "bottomrightcorner" || document.getElementById(Ri).getAttribute("corner") === "rightcorner") {
                if (block(document.getElementById(Ri), whiteblack)) {
                    document.getElementById(Ri).classList.add("moveable");
                    document.getElementById(Ri).style.backgroundColor = "greenyellow"
                    bn++;
                }
                else {
                    bn++;
                }
            }
            else if (document.getElementById(Ri).getAttribute("corner") === "topleftcorner" || document.getElementById(Ri).getAttribute("corner") === "bottomleftcorner" || document.getElementById(Ri).getAttribute("corner") === "leftcorner") {
                bn++;
            }
            else {
                if (block(document.getElementById(Ri), whiteblack)) {
                    document.getElementById(Ri).classList.add("moveable");
                    document.getElementById(Ri).style.backgroundColor = "greenyellow"
                }
                else {
                    bn++;
                }
            }
        }
        if ((num - 7) < 0) {
            f = 1;
        }
        if ((num - 9) < 0) {
            d++;
        }
        if ((num + 7) > 65) {
            z++;
        }
        if ((num + 9) > 65) {
            u++;
        }
        if (fn == 0) {
            for (Ul = num - 7, Ur = num - 9; fn < 1; Ul -= 7, Ur -= 9) {
                if (f == 0) {
                    if (Ul < 1) {
                        f++;
                    }
                    else if (document.getElementById(Ul).getAttribute("corner") === "leftcorner" || document.getElementById(Ul).getAttribute("corner") === "topleftcorner" || document.getElementById(Ul).getAttribute("corner") === "bottomleftcorner") {
                        f++;
                    }
                    else if (document.getElementById(Ul).getAttribute("corner") === "leftcorner" || document.getElementById(Ul).getAttribute("corner") === "topleftcorner") {
                        if (block(document.getElementById(Ul), whiteblack)) {
                            document.getElementById(Ul).classList.add("moveable");
                            document.getElementById(Ul).style.backgroundColor = "greenyellow"
                        }
                        f++;
                    }
                    else if (block(document.getElementById(Ul), whiteblack)) {
                        document.getElementById(Ul).classList.add("moveable");
                        document.getElementById(Ul).style.backgroundColor = "greenyellow"
                    }
                    else {
                        f++;
                    }
                }
                if (d == 0) {
                    if (Ur < 1) {
                        d++;
                    }
                    else if (document.getElementById(Ur).getAttribute("corner") === "rightcorner" || document.getElementById(Ur).getAttribute("corner") === "bottomrightcorner" || document.getElementById(Ur).getAttribute("corner") === "toprightcorner") {
                        d++;
                    }
                    else if (document.getElementById(Ur).getAttribute("corner") === "leftcorner" || document.getElementById(Ur).getAttribute("corner") === "topcorner" || document.getElementById(Ur).getAttribute("corner") === "topleftcorner") {
                        if (block(document.getElementById(Ur), whiteblack)) {
                            document.getElementById(Ur).classList.add("moveable");
                            document.getElementById(Ur).style.backgroundColor = "greenyellow"
                        }
                        d++;
                    }
                    else if (block(document.getElementById(Ur), whiteblack)) {
                        document.getElementById(Ur).classList.add("moveable");
                        document.getElementById(Ur).style.backgroundColor = "greenyellow"
                    }
                    else {
                        d++;
                    }
                }
                if ((f + d) > 1) {
                    fn++;
                }
            }
        }
        for (Dl = num + 7, Dr = num + 9; fo < 1; Dl += 7, Dr += 9) {
            if (u == 0) {
                if (Dr > 64) {
                    u++;
                }
                else if (document.getElementById(Dr).getAttribute("corner") === "leftcorner" || document.getElementById(Dr).getAttribute("corner") === "bottomleftcorner" || document.getElementById(Dr).getAttribute("corner") === "topleftcorner") {
                    u++;
                }
                else if (document.getElementById(Dr).getAttribute("corner") === "rightcorner" || document.getElementById(Dr).getAttribute("corner") === "bottomcorner" || document.getElementById(Dr).getAttribute("corner") === "bottomrightcorner") {
                    if (block(document.getElementById(Dr), whiteblack)) {
                        document.getElementById(Dr).classList.add("moveable");
                        document.getElementById(Dr).style.backgroundColor = "greenyellow"
                    }
                    u++;
                }
                else if (block(document.getElementById(Dr), whiteblack)) {
                    document.getElementById(Dr).classList.add("moveable");
                    document.getElementById(Dr).style.backgroundColor = "greenyellow"
                }
                else {
                    u++;
                }
            }
            if (z == 0) {
                if (Dl > 64) {
                    z++;
                }
                else if (document.getElementById(Dl).getAttribute("corner") === "rightcorner" || document.getElementById(Dl).getAttribute("corner") === "bottomrightcorner" || document.getElementById(Dl).getAttribute("corner") === "toprightcorner") {
                    z++;
                }
                else if (document.getElementById(Dl).getAttribute("corner") === "leftcorner" || document.getElementById(Dl).getAttribute("corner") === "bottomcorner" || document.getElementById(Dl).getAttribute("corner") === "bottomleftcorner") {
                    
                    if (block(document.getElementById(Dl), whiteblack)) {
                        document.getElementById(Dl).classList.add("moveable");
                        document.getElementById(Dl).style.backgroundColor = "greenyellow"
                    }
                    z++;
                }
                else if (block(document.getElementById(Dl), whiteblack)) {
                    document.getElementById(Dl).classList.add("moveable");
                    document.getElementById(Dl).style.backgroundColor = "greenyellow"
                }
                else {
                    z++;
                }
            }
            if ((z + u) > 1) {
                fo++;
            }
        }

    }
    else if (target.className.includes("blackknight") || target.className.includes("whiteknight")) {// movement for knights
        let whiteblack;
        if (target.className.includes("whiteknight")) {
            whiteblack = 1;
        }
        if (target.className.includes("blackknight")) {
            whiteblack = 2;
        }
        let upr1 = num - 15;// up 2 = -16 and right 1 = +1`
        let upr2 = num - 6;
        let upl1 = num - 17;
        let upl2 = num - 10;
        let dor1 = num + 10;
        let dor2 = num + 17;
        let dol1 = num + 6;
        let dol2 = num + 15;
        if (upr1 - 1 < 1) {

        }
        else if (document.getElementById(upr1).getAttribute("corner") === "topleftcorner" || document.getElementById(upr1).getAttribute("corner") === "bottomleftcorner" || document.getElementById(upr1).getAttribute("corner") === "leftcorner" || document.getElementById(upr1 - 1).getAttribute("corner") === "rightcorner" || document.getElementById(upr1 - 1).getAttribute("corner") === "toprightcorner" || document.getElementById(upr1 - 1).getAttribute("corner") === "bottomrightcorner") {

        }
        else {
            if (block(document.getElementById(upr1), whiteblack)) {
                document.getElementById(upr1).classList.add("moveable");
                document.getElementById(upr1).style.backgroundColor = "greenyellow";
            }
        }



        if (upr2 - 1 < 1) {

        }
        else if (document.getElementById(upr2).getAttribute("corner") === "topleftcorner" || document.getElementById(upr2).getAttribute("corner") === "bottomleftcorner" || document.getElementById(upr2).getAttribute("corner") === "leftcorner" || document.getElementById(upr2 - 1).getAttribute("corner") === "topleftcorner" || document.getElementById(upr2 - 1).getAttribute("corner") === "bottomleftcorner" || document.getElementById(upr2 - 1).getAttribute("corner") === "leftcorner") {

        }
        else {
            if (block(document.getElementById(upr2), whiteblack)) {
                document.getElementById(upr2).classList.add("moveable");
                document.getElementById(upr2).style.backgroundColor = "greenyellow";
            }
        }


        if (upl1 < 1) {

        }
        else if (document.getElementById(upl1).getAttribute("corner") === "toprightcorner" || document.getElementById(upl1).getAttribute("corner") === "bottomrightcorner" || document.getElementById(upl1).getAttribute("corner") === "rightcorner" || document.getElementById(upl1 + 1).getAttribute("corner") === "leftcorner" || document.getElementById(upl1 + 1).getAttribute("corner") === "topleftcorner" || document.getElementById(upl1 + 1).getAttribute("corner") === "bottomleftcorner") {
        }
        else {
            if (block(document.getElementById(upl1), whiteblack)) {
                document.getElementById(upl1).classList.add("moveable");
                document.getElementById(upl1).style.backgroundColor = "greenyellow";
            }
        }

        if (upl2 < 1) {

        }
        else if (document.getElementById(upl2).getAttribute("corner") === "toprightcorner" || document.getElementById(upl2).getAttribute("corner") === "bottomrightcorner" || document.getElementById(upl2).getAttribute("corner") === "rightcorner" || document.getElementById(upl2 + 1).getAttribute("corner") === "toprightcorner" || document.getElementById(upl2 + 1).getAttribute("corner") === "bottomrightcorner" || document.getElementById(upl2 + 1).getAttribute("corner") === "rightcorner") {

        }
        else {
            if (block(document.getElementById(upl2), whiteblack)) {
                document.getElementById(upl2).classList.add("moveable");
                document.getElementById(upl2).style.backgroundColor = "greenyellow";
            }
        }


        if (dor1 > 64) {

        }
        else if (document.getElementById(dor1).getAttribute("corner") === "topleftcorner" || document.getElementById(dor1).getAttribute("corner") === "bottomleftcorner" || document.getElementById(dor1).getAttribute("corner") === "leftcorner" || document.getElementById(dor1 - 1).getAttribute("corner") === "leftcorner" || document.getElementById(dor1 - 1).getAttribute("corner") === "topleftcorner" || document.getElementById(dor1 - 1).getAttribute("corner") === "bottomleftcorner") {
        }
        else {
            if (block(document.getElementById(dor1), whiteblack)) {
                document.getElementById(dor1).classList.add("moveable");
                document.getElementById(dor1).style.backgroundColor = "greenyellow";
            }
        }


        if (dor2 > 64) {

        }
        else if (document.getElementById(dor2).getAttribute("corner") === "topleftcorner" || document.getElementById(dor2).getAttribute("corner") === "bottomleftcorner" || document.getElementById(dor2).getAttribute("corner") === "leftcorner" || document.getElementById(dor2 - 1).getAttribute("corner") === "toprightcorner" || document.getElementById(dor2 - 1).getAttribute("corner") === "bottomrightcorner" || document.getElementById(dor2 - 1).getAttribute("corner") === "rightcorner") {

        }
        else {
            if (block(document.getElementById(dor2), whiteblack)) {
                document.getElementById(dor2).classList.add("moveable");
                document.getElementById(dor2).style.backgroundColor = "greenyellow";
            }
        }


        if (dol1 + 1 > 64) {
        }
        else if (document.getElementById(dol1).getAttribute("corner") === "toprightcorner" || document.getElementById(dol1).getAttribute("corner") === "bottomrightcorner" || document.getElementById(dol1).getAttribute("corner") === "rightcorner" || document.getElementById(dol1 + 1).getAttribute("corner") === "toprightcorner" || document.getElementById(dol1 + 1).getAttribute("corner") === "bottomrightcorner" || document.getElementById(dol1 + 1).getAttribute("corner") === "rightcorner") {
        }
        else {
            if (block(document.getElementById(dol1), whiteblack)) {
                document.getElementById(dol1).classList.add("moveable");
                document.getElementById(dol1).style.backgroundColor = "greenyellow";
            }
        }


        if (dol2 + 1 > 64) {

        }
        else if (document.getElementById(dol2).getAttribute("corner") === "toprightcorner" || document.getElementById(dol2).getAttribute("corner") === "bottomrightcorner" || document.getElementById(dol2).getAttribute("corner") === "rightcorner" || document.getElementById(dol2 + 1).getAttribute("corner") === "topleftcorner" || document.getElementById(dol2 + 1).getAttribute("corner") === "bottomleftcorner" || document.getElementById(dol2 + 1).getAttribute("corner") === "leftcorner") {

        }
        else {
            if (block(document.getElementById(dol2), whiteblack)) {
                document.getElementById(dol2).classList.add("moveable");
                document.getElementById(dol2).style.backgroundColor = "greenyellow";
            }
        }
    }
}
function remove(lastclick){// takes out the class and gives it back
    let n = "";
    if (lastclick.className.includes("whitepawn")){
        lastclick.classList.remove("whitepawn");
        n += "whitepawn";
    }
    if (lastclick.className.includes("first")){
        lastclick.classList.remove("first");
    }
    if (lastclick.className.includes("blackpawn")) {
        lastclick.classList.remove("blackpawn");
        n += "blackpawn";
    }
    if (lastclick.className.includes("blackrook")) {
        lastclick.classList.remove("blackrook");
        n = "blackrook";
    }
    else if (lastclick.className.includes("whiterook")) {
        lastclick.classList.remove("whiterook");
        n = "whiterook";
    }
    else if (lastclick.className.includes("blackBishop")) {
        lastclick.classList.remove("blackBishop");
        n = "blackBishop";
    }
    else if (lastclick.className.includes("whiteBishop")) {
        lastclick.classList.remove("whiteBishop");
        n = "whiteBishop";
    }
    else if (lastclick.className.includes("blackknight")) {
        lastclick.classList.remove("blackknight");
        n = "blackknight";
    } 
    else if (lastclick.className.includes("whiteknight")) {
        lastclick.classList.remove("whiteknight");
        n = "whiteknight";
    }
    else if (lastclick.className.includes("blackking")) {
        lastclick.classList.remove("blackking");
        n = "blackking";
    }
    else if (lastclick.className.includes("whiteking")) {
        lastclick.classList.remove("whiteking");
        n = "whiteking";
    }
    else if (lastclick.className.includes("blackqueen")) {
        lastclick.classList.remove("blackqueen");
        n = "blackqueen";
    } 
    else if (lastclick.className.includes("whitequeen")) {
        lastclick.classList.remove("whitequeen");
        n = "whitequeen";
    } 
    return n;
}
function block(boardpiece, num){
    if (num == 0){//the peice is a pawn
        if (boardpiece.className.includes("whitepawn") || boardpiece.className.includes("whiterook") || boardpiece.className.includes("whiteBishop") || boardpiece.className.includes("whiteknight") || boardpiece.className.includes("whiteking") || boardpiece.className.includes("whitequeen") || boardpiece.className.includes("blackpawn") || boardpiece.className.includes("blackrook") || boardpiece.className.includes("blackBishop") || boardpiece.className.includes("blackknight") || boardpiece.className.includes("blackking") || boardpiece.className.includes("blackqueen") ){//pawn cant take in front of itself
            return false;// cant move
        }
        else{
            return true;// can move
        }
    }
    else if (num == 1) {//the peice is white
        if (boardpiece.className.includes("whitepawn") || boardpiece.className.includes("whiterook") || boardpiece.className.includes("whiteBishop") || boardpiece.className.includes("whiteknight") || boardpiece.className.includes("whiteking") || boardpiece.className.includes("whitequeen")) {//cant take your own pieces
            return false;// cant move
        }
        else if (boardpiece.className.includes("blackpawn") || boardpiece.className.includes("blackrook") || boardpiece.className.includes("blackBishop") || boardpiece.className.includes("blackknight") || boardpiece.className.includes("blackking") || boardpiece.className.includes("blackqueen")) {//allows you to take but blocks jump
            boardpiece.classList.add("moveable");
            boardpiece.style.backgroundColor = "greenyellow"
            return false;// cant move
        }
        else {
            return true;// can move
        }
    }
    else if (num == 2) {// the peice is black
        if ( boardpiece.className.includes("blackpawn") || boardpiece.className.includes("blackrook") || boardpiece.className.includes("blackBishop") || boardpiece.className.includes("blackknight") || boardpiece.className.includes("blackking") || boardpiece.className.includes("blackqueen")) { //cant take your own pieces
            return false;// cant move
        }
        else if (boardpiece.className.includes("whitepawn") || boardpiece.className.includes("whiterook") || boardpiece.className.includes("whiteBishop") || boardpiece.className.includes("whiteknight") || boardpiece.className.includes("whiteking") || boardpiece.className.includes("whitequeen")) {//allows you to take but blocks jump
            boardpiece.classList.add("moveable");
            boardpiece.style.backgroundColor = "greenyellow"
            return false;// cant move
        }
        else {
            return true;// can move
        }
    }
} 
