//start sequence
let difficulty = 1;
function easy() {
    difficulty = 1;
    const nodeList = document.querySelectorAll(".card");
    for (i = 0; i < nodeList.length; i++) {
        if (parseInt(nodeList[i].getAttribute("id"))>16){
            nodeList[i].classList.add("med")
        }
    }
    Start();
}
function medium() {
    difficulty = 2;
    const nodeList = document.querySelectorAll(".card");
    for (i = 0; i < nodeList.length; i++) {
        if (parseInt(nodeList[i].getAttribute("id"))<37) {
            nodeList[i].classList.remove("med")
        }
        else{
            nodeList[i].classList.add("med")
        }
    }
    Start();
}
function hard() {
    difficulty = 3;
    const nodeList = document.querySelectorAll(".card");
    for (i = 0; i < nodeList.length; i++) {
            nodeList[i].classList.remove("med")
    }
    Start();
}
function Start(){
    clear();
    if (difficulty == 1){
        let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
        let shuffledArray = array.sort((a, b) => 0.5 - Math.random());
        red(shuffledArray[0], shuffledArray[1]);
        green(shuffledArray[2], shuffledArray[3]);
        blue(shuffledArray[4], shuffledArray[5]);
        orange(shuffledArray[6], shuffledArray[7]);
        cyan(shuffledArray[8], shuffledArray[9]);
        yellow(shuffledArray[10], shuffledArray[11]);
        pink(shuffledArray[12], shuffledArray[13]);
        teal(shuffledArray[14], shuffledArray[15]);
    }
    else if (difficulty == 2) {
        let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
        let shuffledArray = array.sort((a, b) => 0.5 - Math.random());
        red(shuffledArray[0], shuffledArray[1]);
        green(shuffledArray[2], shuffledArray[3]);
        blue(shuffledArray[4], shuffledArray[5]);
        orange(shuffledArray[6], shuffledArray[7]);
        cyan(shuffledArray[8], shuffledArray[9]);
        yellow(shuffledArray[10], shuffledArray[11]);
        pink(shuffledArray[12], shuffledArray[13]);
        teal(shuffledArray[14], shuffledArray[15]);
        purple(shuffledArray[16], shuffledArray[17]);
        lightblue(shuffledArray[18], shuffledArray[19]);
        black(shuffledArray[20], shuffledArray[21]);
        brown(shuffledArray[22], shuffledArray[23]);
        cadetblue(shuffledArray[24], shuffledArray[25]);
        chocolate(shuffledArray[26], shuffledArray[27]);
        crimson(shuffledArray[28], shuffledArray[29]);
        darkgoldenrod(shuffledArray[30], shuffledArray[31]);
        darkmagenta(shuffledArray[32], shuffledArray[33]);
        darkorchid(shuffledArray[34], shuffledArray[35]);
    }
    else{
        let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64];
        let shuffledArray = array.sort((a, b) => 0.5 - Math.random());
        red(shuffledArray[0], shuffledArray[1]);
        green(shuffledArray[2], shuffledArray[3]);
        blue(shuffledArray[4], shuffledArray[5]);
        orange(shuffledArray[6], shuffledArray[7]);
        cyan(shuffledArray[8], shuffledArray[9]);
        yellow(shuffledArray[10], shuffledArray[11]);
        pink(shuffledArray[12], shuffledArray[13]);
        teal(shuffledArray[14], shuffledArray[15]);
        purple(shuffledArray[16], shuffledArray[17]);
        lightblue(shuffledArray[18], shuffledArray[19]);
        black(shuffledArray[20], shuffledArray[21]);
        brown(shuffledArray[22], shuffledArray[23]);
        cadetblue(shuffledArray[24], shuffledArray[25]);
        chocolate(shuffledArray[26], shuffledArray[27]);
        crimson(shuffledArray[28], shuffledArray[29]);
        darkgoldenrod(shuffledArray[30], shuffledArray[31]);
        darkmagenta(shuffledArray[32], shuffledArray[33]);
        darkorchid(shuffledArray[34], shuffledArray[35]);
        darkkhaki(shuffledArray[36], shuffledArray[37]);
        darkred(shuffledArray[38], shuffledArray[39]);
        darkseagreen(shuffledArray[40], shuffledArray[41]);
        gold(shuffledArray[42], shuffledArray[43]);
        greenyellow(shuffledArray[44], shuffledArray[45]);
        gray(shuffledArray[46], shuffledArray[47]);
        lightgreen(shuffledArray[48], shuffledArray[49]);
        lightcoral(shuffledArray[50], shuffledArray[51]);
        midnightblue(shuffledArray[52], shuffledArray[53]);
        navajowhite(shuffledArray[54], shuffledArray[55]);
        olive(shuffledArray[56], shuffledArray[57]);
        orangered(shuffledArray[58], shuffledArray[59]);
        seagreen(shuffledArray[60], shuffledArray[61]);
        greyred(shuffledArray[62], shuffledArray[63]);
    }
}
//easy colors
function red(a, b){
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("red", "hidden");
    document.getElementById(b).classList.add("red", "hidden");
    document.getElementById(a).setAttribute("data-color", "red");
    document.getElementById(b).setAttribute("data-color", "red");
}
function green(a, b) {
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("green", "hidden");
    document.getElementById(b).classList.add("green", "hidden");
    document.getElementById(a).setAttribute("data-color", "green");
    document.getElementById(b).setAttribute("data-color", "green");
}
function blue(a, b) {
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("blue", "hidden");
    document.getElementById(b).classList.add("blue", "hidden");
    document.getElementById(a).setAttribute("data-color", "blue");
    document.getElementById(b).setAttribute("data-color", "blue");
}
function orange(a, b) {
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("orange", "hidden");
    document.getElementById(b).classList.add("orange", "hidden");
    document.getElementById(a).setAttribute("data-color", "orange");
    document.getElementById(b).setAttribute("data-color", "orange");
}
function cyan(a, b) {
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("cyan", "hidden");
    document.getElementById(b).classList.add("cyan", "hidden");
    document.getElementById(a).setAttribute("data-color", "cyan");
    document.getElementById(b).setAttribute("data-color", "cyan");
}
function yellow(a, b) {
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("yellow", "hidden");
    document.getElementById(b).classList.add("yellow", "hidden");
    document.getElementById(a).setAttribute("data-color", "yellow");
    document.getElementById(b).setAttribute("data-color", "yellow");
}
function pink(a, b) {
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("pink", "hidden");
    document.getElementById(b).classList.add("pink", "hidden");
    document.getElementById(a).setAttribute("data-color", "pink");
    document.getElementById(b).setAttribute("data-color", "pink");
}
function teal(a, b) {
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("teal", "hidden");
    document.getElementById(b).classList.add("teal", "hidden");
    document.getElementById(a).setAttribute("data-color", "teal");
    document.getElementById(b).setAttribute("data-color", "teal");
}
// med colors
function purple(a, b) {
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("purple", "hidden");
    document.getElementById(b).classList.add("purple", "hidden");
    document.getElementById(a).setAttribute("data-color", "purple");
    document.getElementById(b).setAttribute("data-color", "purple");
}
function lightblue(a, b) {
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("lightblue", "hidden");
    document.getElementById(b).classList.add("lightblue", "hidden");
    document.getElementById(a).setAttribute("data-color", "lightblue");
    document.getElementById(b).setAttribute("data-color", "lightblue");
}
function black(a, b) {
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("black", "hidden");
    document.getElementById(b).classList.add("black", "hidden");
    document.getElementById(a).setAttribute("data-color", "black");
    document.getElementById(b).setAttribute("data-color", "black");
}
function brown(a, b) {
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("brown", "hidden");
    document.getElementById(b).classList.add("brown", "hidden");
    document.getElementById(a).setAttribute("data-color", "brown");
    document.getElementById(b).setAttribute("data-color", "brown");
}
function cadetblue(a, b) {
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("cadetblue", "hidden");
    document.getElementById(b).classList.add("cadetblue", "hidden");
    document.getElementById(a).setAttribute("data-color", "cadetblue");
    document.getElementById(b).setAttribute("data-color", "cadetblue");
}
function chocolate(a, b) {
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("chocolate", "hidden");
    document.getElementById(b).classList.add("chocolate", "hidden");
    document.getElementById(a).setAttribute("data-color", "chocolate");
    document.getElementById(b).setAttribute("data-color", "chocolate");
}
function crimson(a, b) {
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("crimson", "hidden");
    document.getElementById(b).classList.add("crimson", "hidden");
    document.getElementById(a).setAttribute("data-color", "crimson");
    document.getElementById(b).setAttribute("data-color", "crimson");
}
function darkgoldenrod(a, b) {
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("darkgoldenrod", "hidden");
    document.getElementById(b).classList.add("darkgoldenrod", "hidden");
    document.getElementById(a).setAttribute("data-color", "darkgoldenrod");
    document.getElementById(b).setAttribute("data-color", "darkgoldenrod");
}
function darkmagenta(a, b) {
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("darkmagenta", "hidden");
    document.getElementById(b).classList.add("darkmagenta", "hidden");
    document.getElementById(a).setAttribute("data-color", "darkmagenta");
    document.getElementById(b).setAttribute("data-color", "darkmagenta");
}
function darkorchid(a, b) {
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("darkorchid", "hidden");
    document.getElementById(b).classList.add("darkorchid", "hidden");
    document.getElementById(a).setAttribute("data-color", "darkorchid");
    document.getElementById(b).setAttribute("data-color", "darkorchid");
}
//hard colors
function darkkhaki(a, b) {
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("darkkhaki", "hidden");
    document.getElementById(b).classList.add("darkkhaki", "hidden");
    document.getElementById(a).setAttribute("data-color", "darkkhaki");
    document.getElementById(b).setAttribute("data-color", "darkkhaki");
}
function darkred(a, b) {
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("darkred", "hidden");
    document.getElementById(b).classList.add("darkred", "hidden");
    document.getElementById(a).setAttribute("data-color", "darkred");
    document.getElementById(b).setAttribute("data-color", "darkred");
}
function darkseagreen(a, b) {
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("darkseagreen", "hidden");
    document.getElementById(b).classList.add("darkseagreen", "hidden");
    document.getElementById(a).setAttribute("data-color", "darkseagreen");
    document.getElementById(b).setAttribute("data-color", "darkseagreen");
}
function gold(a, b) {
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("gold", "hidden");
    document.getElementById(b).classList.add("gold", "hidden");
    document.getElementById(a).setAttribute("data-color", "gold");
    document.getElementById(b).setAttribute("data-color", "gold");
}
function greenyellow(a, b) {
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("greenyellow", "hidden");
    document.getElementById(b).classList.add("greenyellow", "hidden");
    document.getElementById(a).setAttribute("data-color", "greenyellow");
    document.getElementById(b).setAttribute("data-color", "greenyellow");
}
function gray(a, b) {
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("gray", "hidden");
    document.getElementById(b).classList.add("gray", "hidden");
    document.getElementById(a).setAttribute("data-color", "gray");
    document.getElementById(b).setAttribute("data-color", "gray");
}
function lightgreen(a, b) {
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("lightgreen", "hidden");
    document.getElementById(b).classList.add("lightgreen", "hidden");
    document.getElementById(a).setAttribute("data-color", "lightgreen");
    document.getElementById(b).setAttribute("data-color", "lightgreen");
}
function lightcoral(a, b) {
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("lightcoral", "hidden");
    document.getElementById(b).classList.add("lightcoral", "hidden");
    document.getElementById(a).setAttribute("data-color", "lightcoral");
    document.getElementById(b).setAttribute("data-color", "lightcoral");
}
function midnightblue(a, b) {
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("midnightblue", "hidden");
    document.getElementById(b).classList.add("midnightblue", "hidden");
    document.getElementById(a).setAttribute("data-color", "midnightblue");
    document.getElementById(b).setAttribute("data-color", "midnightblue");
}
function navajowhite(a, b) {
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("navajowhite", "hidden");
    document.getElementById(b).classList.add("navajowhite", "hidden");
    document.getElementById(a).setAttribute("data-color", "navajowhite");
    document.getElementById(b).setAttribute("data-color", "navajowhite");
}
function olive(a, b) {
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("olive", "hidden");
    document.getElementById(b).classList.add("olive", "hidden");
    document.getElementById(a).setAttribute("data-color", "olive");
    document.getElementById(b).setAttribute("data-color", "olive");
}
function orangered(a, b) {
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("orangered", "hidden");
    document.getElementById(b).classList.add("orangered", "hidden");
    document.getElementById(a).setAttribute("data-color", "orangered");
    document.getElementById(b).setAttribute("data-color", "orangered");
}
function seagreen(a, b) {
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("seagreen", "hidden");
    document.getElementById(b).classList.add("seagreen", "hidden");
    document.getElementById(a).setAttribute("data-color", "seagreen");
    document.getElementById(b).setAttribute("data-color", "seagreen");
}
function greyred(a, b) {
    a = a + ''
    b = b + ''
    document.getElementById(a).classList.add("greyred", "hidden");
    document.getElementById(b).classList.add("greyred", "hidden");
    document.getElementById(a).setAttribute("data-color", "greyred");
    document.getElementById(b).setAttribute("data-color", "greyred");
}



function clear(){
    const nodeList = document.querySelectorAll(".card");
    for (i = 0; i < nodeList.length; i++) {
        nodeList[i].classList.remove("red", "hidden", "done")
        nodeList[i].classList.remove("green", "hidden", "done");
        nodeList[i].classList.remove("blue", "hidden", "done");
        nodeList[i].classList.remove("orange", "hidden", "done");
        nodeList[i].classList.remove("cyan", "hidden", "done");
        nodeList[i].classList.remove("yellow", "hidden", "done");
        nodeList[i].classList.remove("pink", "hidden", "done");
        nodeList[i].classList.remove("teal", "hidden", "done");
        nodeList[i].classList.remove("purple", "hidden", "done")
        nodeList[i].classList.remove("lightblue", "hidden", "done");
        nodeList[i].classList.remove("black", "hidden", "done");
        nodeList[i].classList.remove("brown", "hidden", "done");
        nodeList[i].classList.remove("cadetblue", "hidden", "done");
        nodeList[i].classList.remove("chocolate", "hidden", "done");
        nodeList[i].classList.remove("crimson", "hidden", "done");
        nodeList[i].classList.remove("darkgoldenrod", "hidden", "done");
        nodeList[i].classList.remove("darkmagenta", "hidden", "done")
        nodeList[i].classList.remove("darkorchid", "hidden", "done");
        nodeList[i].classList.remove("darkkhaki", "hidden", "done");
        nodeList[i].classList.remove("darkred", "hidden", "done");
        nodeList[i].classList.remove("darkseagreen", "hidden", "done");
        nodeList[i].classList.remove("gold", "hidden", "done");
        nodeList[i].classList.remove("greenyellow", "hidden", "done");
        nodeList[i].classList.remove("gray", "hidden", "done");
        nodeList[i].classList.remove("lightgreen", "hidden", "done")
        nodeList[i].classList.remove("lightcoral", "hidden", "done");
        nodeList[i].classList.remove("midnightblue", "hidden", "done");
        nodeList[i].classList.remove("navajowhite", "hidden", "done");
        nodeList[i].classList.remove("olive", "hidden", "done");
        nodeList[i].classList.remove("orangered", "hidden", "done");
        nodeList[i].classList.remove("seagreen", "hidden", "done");
        nodeList[i].classList.remove("greyred", "hidden", "done");
        clickedCard = null;
        sets = 0;
        clicks = 0;
        document.querySelector(".click").textContent = clicks + " clicks";
    }
}
//game
let sets = 0;
let clickedCard = null;
let clicks = 0;
function onCardClicked(e){
    clicks++;
    document.querySelector(".click").textContent = clicks + " clicks";
    const target = e.currentTarget;
    if (target === clickedCard || target.className.includes("done")){
        return;
    }
    target.className = target.className.replace('hidden', '').trim();
    console.log(target.getAttribute("data-color"))
    if(!clickedCard){
        clickedCard = target;
    }
    else if(clickedCard){
        if (clickedCard.getAttribute("data-color") === target.getAttribute("data-color")){
            clickedCard.setAttribute("data-done", true);
            clickedCard.className += " done";
            target.className += " done";
            sets++;
        }
        if (clickedCard.getAttribute("data-color") !== target.getAttribute("data-color")){
            clickedCard.className += " hidden";
            setTimeout(() => {target.className += " hidden";
            }, 200);
        }
        if(difficulty == 1){
            if (sets == 8) {
                setTimeout(() => {
                    alert("you won in " + clicks + " clicks");
                }, 100)
                setTimeout(() => {
                    Start();
                }, 1000);
            }
        }
        if (difficulty == 2) {
            if (sets == 18) {
                setTimeout(() => {
                    alert("you won in " + clicks + " clicks");
                }, 100)
                setTimeout(() => {
                    Start();
                }, 1000);
            }
        }
        if (difficulty == 3) {
            if (sets == 32) {
                setTimeout(() => {
                    alert("you won in " + clicks + " clicks");
                }, 300);
                setTimeout(() => {
                    Start();
                }, 1000);
            }
        }
        clickedCard = null;
    }
}