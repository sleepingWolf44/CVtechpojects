let sets = 0;
let clickedCard = null;
let clicks = 0;
var first = 0;
var mark = 0;
document.onkeydown = function (e) {
    e = e || window.event;
    var key = e.which || e.keyCode;
    if (key === 84) {//t
        if (mark == 0) {
            mark++;
            document.getElementById("check").checked = true;
        }
        else {
            mark = 0;
            document.getElementById("check").checked = false;
        }
    }
    if (key === 82) {//r
        location.reload(true)
    }
}
function markmine(){
    if(mark==0){
        mark++;
    }
    else{
        mark = 0
    }
}
function Start(e){
    document.querySelector(".click").textContent = clicks + " clicks";
    const target = e.currentTarget;
    if(mark ==1){
        if ((target.className.includes("mark"))){
            target.className = target.className.replace('mark', '');
        }
        else{
        target.classList.add("mark");
        }
    }
    else{
        clicks++;
        if (first == 0) {
            first++;
            let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64];
            let remove = (parseInt(target.getAttribute("id"))) - 2;
            console.log(target.getAttribute("id"))
            let x = array.splice(remove, 3)
            let topremove = remove - 8;
            let y = array.splice(topremove, 3);
            let bottomremove = remove + 2;
            let z = array.splice(bottomremove, 3);
            console.log(x + ',' + y + ',' + z);
            console.log(array);
            set(array);
            const nodeList = array;
            let shuffledArray = array.sort((a, b) => 0.5 - Math.random());
            let mines = [shuffledArray[0], shuffledArray[1], shuffledArray[2], shuffledArray[3], shuffledArray[4], shuffledArray[5], shuffledArray[6], shuffledArray[7], shuffledArray[8], shuffledArray[9]]
            mine(mines)
            close(mines, array, target);
        }
        if (target.className.includes("mark")){

        }
        else if (target.className.includes("done")) {

        }
        else if (target.className.includes("mine")) {
            alert("boom you lose")
            clear();
        }
        else if (target.className.includes("one") || target.className.includes("two") || target.className.includes("three") || target.className.includes("four") || target.className.includes("five") || target.className.includes("six") || target.className.includes("seven") || target.className.includes("eight")) {
            target.className = target.className.replace('hidden', '').trim();
            sets++;
        }
        else {
            target.className = target.className.replace('hidden', '').trim();
            target.className += " none";
            None();
            sets++;
        }
        // if(sets == 54){
        //     alert("you win")
        //     clear();
        // }
    }
}
function None(target){
    let near = parseInt(target.getAttribute("id"))
    let L = near - 1;
    let R = near + 1;
    let U = near - 8;
    let D = near + 8;
    if (document.getElementById(L).className.includes("one") || document.getElementById(L).className.includes("two") || document.getElementById(L).className.includes("three") || document.getElementById(L).className.includes("four") || document.getElementById(L).className.includes("five") || document.getElementById(L).className.includes("six") || document.getElementById(L).className.includes("seven") || document.getElementById(L).className.includes("eight") || document.getElementById(L).className.includes("mine") || target.className.includes("done")){
    }
    else{
        document.getElementById(L).className = document.getElementById(L).className.replace('hidden', '').trim();
        document.getElementById(L).className += " none";
        sets++;
        None(L);
    }


    if (document.getElementById(R).className.includes("one") || document.getElementById(R).className.includes("two") || document.getElementById(R).className.includes("three") || document.getElementById(R).className.includes("four") || document.getElementById(R).className.includes("five") || document.getElementById(R).className.includes("six") || document.getElementById(R).className.includes("seven") || document.getElementById(R).className.includes("eight") || document.getElementById(R).className.includes("mine") || target.className.includes("done")) {
    }
    else {
        document.getElementById(R).className = document.getElementById(R).className.replace('hidden', '').trim();
        document.getElementById(R).className += " none";
        sets++;
        None(R);
    }


    if (document.getElementById(U).className.includes("one") || document.getElementById(U).className.includes("two") || document.getElementById(U).className.includes("three") || document.getElementById(U).className.includes("four") || document.getElementById(U).className.includes("five") || document.getElementById(U).className.includes("six") || document.getElementById(U).className.includes("seven") || document.getElementById(U).className.includes("eight") || document.getElementById(U).className.includes("mine") || target.className.includes("done")) {
    }
    else {
        document.getElementById(U).className = document.getElementById(U).className.replace('hidden', '').trim();
        document.getElementById(U).className += " none";
        sets++;
        None(U);
    }


    if (document.getElementById(D).className.includes("one") || document.getElementById(D).className.includes("two") || document.getElementById(D).className.includes("three") || document.getElementById(D).className.includes("four") || document.getElementById(D).className.includes("five") || document.getElementById(D).className.includes("six") || document.getElementById(D).className.includes("seven") || document.getElementById(D).className.includes("eight") || document.getElementById(D).className.includes("mine") || target.className.includes("done")) {
    }
    else {
        document.getElementById(D).className = document.getElementById(D).className.replace('hidden', '').trim();
        document.getElementById(D).className += " none";
        sets++;
        None(D);
    }
}
function set(array){
    const nodeList = array;
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
        else if ((nodeList[i])%8 == 0 && i !== 8 && i !== 64){
            document.getElementById(nodeList[i]).setAttribute("corner", "rightcorner");
        }
        else if (((nodeList[i]) - 1) % 8 == 0 && i !== 1 && i !== 57){
            document.getElementById(nodeList[i]).setAttribute("corner", "leftcorner");
        }
        else if ((nodeList[i]) < 9 && i !== 1 && i !== 8) {
            document.getElementById(nodeList[i]).setAttribute("corner", "topcorner");
        }
        else if ((nodeList[i]) > 56 && i !== 57 && i !== 64) {
            document.getElementById(nodeList[i]).setAttribute("corner", "bottomcorner");
        }
    }
}
function mine(mines) {//sets up mines with the data mine
    const nodeList = mines;
    for (i = 0; i < nodeList.length; i++) {
        document.getElementById(nodeList[i]).className += " mine"
    }
} 
let n =0
function close(mines, array) {//sets up mines with the data mine
    const nodeList = mines;
    for (i = 0; i < nodeList.length; i++) {
        if (document.getElementById(nodeList[i]).getAttribute("corner") === "topleftcorner") {
            topleft(nodeList[i])
        }
        else if (document.getElementById(nodeList[i]).getAttribute("corner") === "toprightcorner") {
            topright(nodeList[i])
        }
        else if (document.getElementById(nodeList[i]).getAttribute("corner") === "bottomleftcorner") {
            bottomleft(nodeList[i])
        }
        else if (document.getElementById(nodeList[i]).getAttribute("corner") === "bottomrightcorner") {
            bottomright(nodeList[i])
        }
        else if (document.getElementById(nodeList[i]).getAttribute("corner") === "leftcorner"){
            Left(nodeList[i])
        }
        else if (document.getElementById(nodeList[i]).getAttribute("corner") === "rightcorner") {
            Right(nodeList[i])
        }
        else if (document.getElementById(nodeList[i]).getAttribute("corner") === "topcorner") {
            Top(nodeList[i])
        }
        else if (document.getElementById(nodeList[i]).getAttribute("corner") === "bottomcorner") {
            Bottom(nodeList[i])
        }
        else{
            if ((parseInt(nodeList[i]) - 1) < 0) {

            }
            else if (document.getElementById(parseInt(nodeList[i]) - 1).className.includes("mine")) {
            }
            else if (document.getElementById(parseInt(nodeList[i]) - 1).className.includes("one")) {
                document.getElementById(parseInt(nodeList[i]) - 1).classList.replace('one', 'two')
            }
            else if (document.getElementById(parseInt(nodeList[i]) - 1).className.includes("two")) {
                document.getElementById(parseInt(nodeList[i]) - 1).classList.replace('two', 'three')
            }
            else if (document.getElementById(parseInt(nodeList[i]) - 1).className.includes("three")) {
                document.getElementById(parseInt(nodeList[i]) - 1).classList.replace('three', 'four')
            }
            else if (document.getElementById(parseInt(nodeList[i]) - 1).className.includes("four")) {
                document.getElementById(parseInt(nodeList[i]) - 1).classList.replace('four', 'five')
            }
            else if (document.getElementById(parseInt(nodeList[i]) - 1).className.includes("five")) {
                document.getElementById(parseInt(nodeList[i]) - 1).classList.replace('five', 'six')
            }
            else if (document.getElementById(parseInt(nodeList[i]) - 1).className.includes("six")) {
                document.getElementById(parseInt(nodeList[i]) - 1).classList.replace('six', 'seven')
            }
            else if (document.getElementById(parseInt(nodeList[i]) - 1).className.includes("seven")) {
                document.getElementById(parseInt(nodeList[i]) - 1).classList.replace('seven', 'eight')
            }
            else {
                document.getElementById(parseInt(nodeList[i]) - 1).className += " one"
            }


            if ((parseInt(nodeList[i]) + 1) > 64) {
            }
            else if (document.getElementById(parseInt(nodeList[i]) + 1).className.includes("mine")) {
            }
            else if (document.getElementById(parseInt(nodeList[i]) + 1).className.includes("one")) {
                document.getElementById(parseInt(nodeList[i]) + 1).classList.replace('one', 'two')
            }
            else if (document.getElementById(parseInt(nodeList[i]) + 1).className.includes("two")) {
                document.getElementById(parseInt(nodeList[i]) + 1).classList.replace('two', 'three')
            }
            else if (document.getElementById(parseInt(nodeList[i]) + 1).className.includes("three")) {
                document.getElementById(parseInt(nodeList[i]) + 1).classList.replace('three', 'four')
            }
            else if (document.getElementById(parseInt(nodeList[i]) + 1).className.includes("four")) {
                document.getElementById(parseInt(nodeList[i]) + 1).classList.replace('four', 'five')
            }
            else if (document.getElementById(parseInt(nodeList[i]) + 1).className.includes("five")) {
                document.getElementById(parseInt(nodeList[i]) + 1).classList.replace('five', 'six')
            }
            else if (document.getElementById(parseInt(nodeList[i]) + 1).className.includes("six")) {
                document.getElementById(parseInt(nodeList[i]) + 1).classList.replace('six', 'seven')
            }
            else if (document.getElementById(parseInt(nodeList[i]) + 1).className.includes("seven")) {
                document.getElementById(parseInt(nodeList[i]) + 1).classList.replace('seven', 'eight')
            }
            else {
                document.getElementById(parseInt(nodeList[i]) + 1).className += " one"
            }


            if ((parseInt(nodeList[i]) - 9) < 0) {

            }
            else if (document.getElementById(parseInt(nodeList[i]) - 9).className.includes("mine")) {
            }
            else if (document.getElementById(parseInt(nodeList[i]) - 9).className.includes("one")) {
                document.getElementById(parseInt(nodeList[i]) - 9).classList.replace('one', 'two')
            }
            else if (document.getElementById(parseInt(nodeList[i]) - 9).className.includes("two")) {
                document.getElementById(parseInt(nodeList[i]) - 9).classList.replace('two', 'three')
            }
            else if (document.getElementById(parseInt(nodeList[i]) - 9).className.includes("three")) {
                document.getElementById(parseInt(nodeList[i]) - 9).classList.replace('three', 'four')
            }
            else if (document.getElementById(parseInt(nodeList[i]) - 9).className.includes("four")) {
                document.getElementById(parseInt(nodeList[i]) - 9).classList.replace('four', 'five')
            }
            else if (document.getElementById(parseInt(nodeList[i]) - 9).className.includes("five")) {
                document.getElementById(parseInt(nodeList[i]) - 9).classList.replace('five', 'six')
            }
            else if (document.getElementById(parseInt(nodeList[i]) - 9).className.includes("six")) {
                document.getElementById(parseInt(nodeList[i]) - 9).classList.replace('six', 'seven')
            }
            else if (document.getElementById(parseInt(nodeList[i]) - 9).className.includes("seven")) {
                document.getElementById(parseInt(nodeList[i]) - 9).classList.replace('seven', 'eight')
            }
            else {
                document.getElementById(parseInt(nodeList[i]) - 9).className += " one"
            }


            if ((parseInt(nodeList[i]) - 8) < 0) {

            }
            else if (document.getElementById(parseInt(nodeList[i]) - 8).className.includes("mine")) {
            }
            else if (document.getElementById(parseInt(nodeList[i]) - 8).className.includes("one")) {
                document.getElementById(parseInt(nodeList[i]) - 8).classList.replace('one', 'two')
            }
            else if (document.getElementById(parseInt(nodeList[i]) - 8).className.includes("two")) {
                document.getElementById(parseInt(nodeList[i]) - 8).classList.replace('two', 'three')
            }
            else if (document.getElementById(parseInt(nodeList[i]) - 8).className.includes("three")) {
                document.getElementById(parseInt(nodeList[i]) - 8).classList.replace('three', 'four')
            }
            else if (document.getElementById(parseInt(nodeList[i]) - 8).className.includes("four")) {
                document.getElementById(parseInt(nodeList[i]) - 8).classList.replace('four', 'five')
            }
            else if (document.getElementById(parseInt(nodeList[i]) - 8).className.includes("five")) {
                document.getElementById(parseInt(nodeList[i]) - 8).classList.replace('five', 'six')
            }
            else if (document.getElementById(parseInt(nodeList[i]) - 8).className.includes("six")) {
                document.getElementById(parseInt(nodeList[i]) - 8).classList.replace('six', 'seven')
            }
            else if (document.getElementById(parseInt(nodeList[i]) - 8).className.includes("seven")) {
                document.getElementById(parseInt(nodeList[i]) - 8).classList.replace('seven', 'eight')
            }
            else {
                document.getElementById(parseInt(nodeList[i]) - 8).className += " one"
            }


            
            if ((parseInt(nodeList[i]) - 7) < 0) {

            }
            else if (document.getElementById(parseInt(nodeList[i]) - 7).className.includes("mine")) {
            }
            else if (document.getElementById(parseInt(nodeList[i]) - 7).className.includes("one")) {
                document.getElementById(parseInt(nodeList[i]) - 7).classList.replace('one', 'two')
            }
            else if (document.getElementById(parseInt(nodeList[i]) - 7).className.includes("two")) {
                document.getElementById(parseInt(nodeList[i]) - 7).classList.replace('two', 'three')
            }
            else if (document.getElementById(parseInt(nodeList[i]) - 7).className.includes("three")) {
                document.getElementById(parseInt(nodeList[i]) - 7).classList.replace('three', 'four')
            }
            else if (document.getElementById(parseInt(nodeList[i]) - 7).className.includes("four")) {
                document.getElementById(parseInt(nodeList[i]) - 7).classList.replace('four', 'five')
            }
            else if (document.getElementById(parseInt(nodeList[i]) - 7).className.includes("five")) {
                document.getElementById(parseInt(nodeList[i]) - 7).classList.replace('five', 'six')
            }
            else if (document.getElementById(parseInt(nodeList[i]) - 7).className.includes("six")) {
                document.getElementById(parseInt(nodeList[i]) - 7).classList.replace('six', 'seven')
            }
            else if (document.getElementById(parseInt(nodeList[i]) - 7).className.includes("seven")) {
                document.getElementById(parseInt(nodeList[i]) - 7).classList.replace('seven', 'eight')
            }
            else {
                document.getElementById(parseInt(nodeList[i]) - 7).className += " one"
            }


            if ((parseInt(nodeList[i]) + 9) > 64) {

            }
            else if (document.getElementById(parseInt(nodeList[i]) + 9).className.includes("mine")) {
            }
            else if (document.getElementById(parseInt(nodeList[i]) + 9).className.includes("one")) {
                document.getElementById(parseInt(nodeList[i]) + 9).classList.replace('one', 'two')
            }
            else if (document.getElementById(parseInt(nodeList[i]) + 9).className.includes("two")) {
                document.getElementById(parseInt(nodeList[i]) + 9).classList.replace('two', 'three')
            }
            else if (document.getElementById(parseInt(nodeList[i]) + 9).className.includes("three")) {
                document.getElementById(parseInt(nodeList[i]) + 9).classList.replace('three', 'four')
            }
            else if (document.getElementById(parseInt(nodeList[i]) + 9).className.includes("four")) {
                document.getElementById(parseInt(nodeList[i]) + 9).classList.replace('four', 'five')
            }
            else if (document.getElementById(parseInt(nodeList[i]) + 9).className.includes("five")) {
                document.getElementById(parseInt(nodeList[i]) + 9).classList.replace('five', 'six')
            }
            else if (document.getElementById(parseInt(nodeList[i]) + 9).className.includes("six")) {
                document.getElementById(parseInt(nodeList[i]) + 9).classList.replace('six', 'seven')
            }
            else if (document.getElementById(parseInt(nodeList[i]) + 9).className.includes("seven")) {
                document.getElementById(parseInt(nodeList[i]) + 9).classList.replace('seven', 'eight')
            }

            else {
                document.getElementById(parseInt(nodeList[i]) + 9).className += " one"
            }


            if ((parseInt(nodeList[i]) + 8) > 64) {

            }
            else if (document.getElementById(parseInt(nodeList[i]) + 8).className.includes("mine")) {
            }
            else if (document.getElementById(parseInt(nodeList[i]) + 8).className.includes("one")) {
                document.getElementById(parseInt(nodeList[i]) + 8).classList.replace('one', 'two')
            }
            else if (document.getElementById(parseInt(nodeList[i]) + 8).className.includes("two")) {
                document.getElementById(parseInt(nodeList[i]) + 8).classList.replace('two', 'three')
            }
            else if (document.getElementById(parseInt(nodeList[i]) + 8).className.includes("three")) {
                document.getElementById(parseInt(nodeList[i]) + 8).classList.replace('three', 'four')
            }
            else if (document.getElementById(parseInt(nodeList[i]) + 8).className.includes("four")) {
                document.getElementById(parseInt(nodeList[i]) + 8).classList.replace('four', 'five')
            }
            else if (document.getElementById(parseInt(nodeList[i]) + 8).className.includes("five")) {
                document.getElementById(parseInt(nodeList[i]) + 8).classList.replace('five', 'six')
            }
            else if (document.getElementById(parseInt(nodeList[i]) + 8).className.includes("six")) {
                document.getElementById(parseInt(nodeList[i]) + 8).classList.replace('six', 'seven')
            }
            else if (document.getElementById(parseInt(nodeList[i]) + 8).className.includes("seven")) {
                document.getElementById(parseInt(nodeList[i]) + 8).classList.replace('seven', 'eight')
            }
            else {
                document.getElementById(parseInt(nodeList[i]) + 8).className += " one"
            }


            
            if ((parseInt(nodeList[i]) + 7) < 0) {

            }
            else if (document.getElementById(parseInt(nodeList[i]) + 7).className.includes("mine")) {
            }
            else if (document.getElementById(parseInt(nodeList[i]) + 7).className.includes("one")) {
                document.getElementById(parseInt(nodeList[i]) + 7).classList.replace('one', 'two')
            }
            else if (document.getElementById(parseInt(nodeList[i]) + 7).className.includes("two")) {
                document.getElementById(parseInt(nodeList[i]) + 7).classList.replace('two', 'three')
            }
            else if (document.getElementById(parseInt(nodeList[i]) + 7).className.includes("three")) {
                document.getElementById(parseInt(nodeList[i]) + 7).classList.replace('three', 'four')
            }
            else if (document.getElementById(parseInt(nodeList[i]) + 7).className.includes("four")) {
                document.getElementById(parseInt(nodeList[i]) + 7).classList.replace('four', 'five')
            }
            else if (document.getElementById(parseInt(nodeList[i]) + 7).className.includes("five")) {
                document.getElementById(parseInt(nodeList[i]) + 7).classList.replace('five', 'six')
            }
            else if (document.getElementById(parseInt(nodeList[i]) + 7).className.includes("six")) {
                document.getElementById(parseInt(nodeList[i]) + 7).classList.replace('six', 'seven')
            }
            else if (document.getElementById(parseInt(nodeList[i]) + 7).className.includes("seven")) {
                document.getElementById(parseInt(nodeList[i]) + 7).classList.replace('seven', 'eight')
            }
            else {
                document.getElementById(parseInt(nodeList[i]) + 7).className += " one"
            }
        }
    }
    hidden(array);
}
function hidden(array){
    const nodeList = array;
    for (i = 0; i < nodeList.length; i++) {
        document.getElementById(nodeList[i]).className += " hidden"
    }
}
// function red(a, b){
//     a = a + ''
//     b = b + ''
//     document.getElementById(a).classList.add("red", "hidden");
//     document.getElementById(b).classList.add("red", "hidden");
//     document.getElementById(a).setAttribute("data-color", "red");
//     document.getElementById(b).setAttribute("data-color", "red");
// }

function restart(){
    location.reload(true)
}
function Left(num){
    if ((parseInt(num) + 1) > 64) {
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("one")) {
        document.getElementById(parseInt(num) + 1).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("two")) {
        document.getElementById(parseInt(num) + 1).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("three")) {
        document.getElementById(parseInt(num) + 1).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("four")) {
        document.getElementById(parseInt(num) + 1).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("five")) {
        document.getElementById(parseInt(num) + 1).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("six")) {
        document.getElementById(parseInt(num) + 1).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("seven")) {
        document.getElementById(parseInt(num) + 1).classList.replace('seven', 'eight')
    }
    else {
        document.getElementById(parseInt(num) + 1).className += " one"
    }


    if ((parseInt(num) - 8) < 0) {

    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("one")) {
        document.getElementById(parseInt(num) - 8).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("two")) {
        document.getElementById(parseInt(num) - 8).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("three")) {
        document.getElementById(parseInt(num) - 8).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("four")) {
        document.getElementById(parseInt(num) - 8).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("five")) {
        document.getElementById(parseInt(num) - 8).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("six")) {
        document.getElementById(parseInt(num) - 8).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("seven")) {
        document.getElementById(parseInt(num) - 8).classList.replace('seven', 'eight')
    }
    else {
        document.getElementById(parseInt(num) - 8).className += " one"
    }


    
    if ((parseInt(num) - 7) < 0) {

    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("one")) {
        document.getElementById(parseInt(num) - 7).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("two")) {
        document.getElementById(parseInt(num) - 7).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("three")) {
        document.getElementById(parseInt(num) - 7).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("four")) {
        document.getElementById(parseInt(num) - 7).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("five")) {
        document.getElementById(parseInt(num) - 7).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("six")) {
        document.getElementById(parseInt(num) - 7).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("seven")) {
        document.getElementById(parseInt(num) - 7).classList.replace('seven', 'eight')
    }
    else {
        document.getElementById(parseInt(num) - 7).className += " one"
    }


    if ((parseInt(num) + 9) > 64) {

    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("one")) {
        document.getElementById(parseInt(num) + 9).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("two")) {
        document.getElementById(parseInt(num) + 9).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("three")) {
        document.getElementById(parseInt(num) + 9).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("four")) {
        document.getElementById(parseInt(num) + 9).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("five")) {
        document.getElementById(parseInt(num) + 9).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("six")) {
        document.getElementById(parseInt(num) + 9).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("seven")) {
        document.getElementById(parseInt(num) + 9).classList.replace('seven', 'eight')
    }

    else {
        document.getElementById(parseInt(num) + 9).className += " one"
    }


    if ((parseInt(num) + 8) > 64) {

    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("one")) {
        document.getElementById(parseInt(num) + 8).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("two")) {
        document.getElementById(parseInt(num) + 8).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("three")) {
        document.getElementById(parseInt(num) + 8).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("four")) {
        document.getElementById(parseInt(num) + 8).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("five")) {
        document.getElementById(parseInt(num) + 8).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("six")) {
        document.getElementById(parseInt(num) + 8).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("seven")) {
        document.getElementById(parseInt(num) + 8).classList.replace('seven', 'eight')
    }
    else {
        document.getElementById(parseInt(num) + 8).className += " one"
    }
}
function Right(num) {
    if ((parseInt(num) - 1) < 0) {

    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("one")) {
        document.getElementById(parseInt(num) - 1).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("two")) {
        document.getElementById(parseInt(num) - 1).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("three")) {
        document.getElementById(parseInt(num) - 1).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("four")) {
        document.getElementById(parseInt(num) - 1).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("five")) {
        document.getElementById(parseInt(num) - 1).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("six")) {
        document.getElementById(parseInt(num) - 1).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("seven")) {
        document.getElementById(parseInt(num) - 1).classList.replace('seven', 'eight')
    }
    else {
        document.getElementById(parseInt(num) - 1).className += " one"
    }

    if ((parseInt(num) - 9) < 0) {

    }
    else if (document.getElementById(parseInt(num) - 9).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) - 9).className.includes("one")) {
        document.getElementById(parseInt(num) - 9).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) - 9).className.includes("two")) {
        document.getElementById(parseInt(num) - 9).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) - 9).className.includes("three")) {
        document.getElementById(parseInt(num) - 9).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) - 9).className.includes("four")) {
        document.getElementById(parseInt(num) - 9).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) - 9).className.includes("five")) {
        document.getElementById(parseInt(num) - 9).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) - 9).className.includes("six")) {
        document.getElementById(parseInt(num) - 9).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) - 9).className.includes("seven")) {
        document.getElementById(parseInt(num) - 9).classList.replace('seven', 'eight')
    }
    else {
        document.getElementById(parseInt(num) - 9).className += " one"
    }


    if ((parseInt(num) - 8) < 0) {

    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("one")) {
        document.getElementById(parseInt(num) - 8).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("two")) {
        document.getElementById(parseInt(num) - 8).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("three")) {
        document.getElementById(parseInt(num) - 8).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("four")) {
        document.getElementById(parseInt(num) - 8).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("five")) {
        document.getElementById(parseInt(num) - 8).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("six")) {
        document.getElementById(parseInt(num) - 8).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("seven")) {
        document.getElementById(parseInt(num) - 8).classList.replace('seven', 'eight')
    }
    else {
        document.getElementById(parseInt(num) - 8).className += " one"
    }


    if ((parseInt(num) + 8) > 64) {

    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("one")) {
        document.getElementById(parseInt(num) + 8).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("two")) {
        document.getElementById(parseInt(num) + 8).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("three")) {
        document.getElementById(parseInt(num) + 8).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("four")) {
        document.getElementById(parseInt(num) + 8).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("five")) {
        document.getElementById(parseInt(num) + 8).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("six")) {
        document.getElementById(parseInt(num) + 8).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("seven")) {
        document.getElementById(parseInt(num) + 8).classList.replace('seven', 'eight')
    }
    else {
        document.getElementById(parseInt(num) + 8).className += " one"
    }


    
    if ((parseInt(num) + 7) < 0) {

    }
    else if (document.getElementById(parseInt(num) + 7).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) + 7).className.includes("one")) {
        document.getElementById(parseInt(num) + 7).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) + 7).className.includes("two")) {
        document.getElementById(parseInt(num) + 7).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) + 7).className.includes("three")) {
        document.getElementById(parseInt(num) + 7).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) + 7).className.includes("four")) {
        document.getElementById(parseInt(num) + 7).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) + 7).className.includes("five")) {
        document.getElementById(parseInt(num) + 7).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) + 7).className.includes("six")) {
        document.getElementById(parseInt(num) + 7).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) + 7).className.includes("seven")) {
        document.getElementById(parseInt(num) + 7).classList.replace('seven', 'eight')
    }
    else {
        document.getElementById(parseInt(num) + 7).className += " one"
    }
}
function Top(num) {
    if ((parseInt(num) - 1) < 0) {

    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("one")) {
        document.getElementById(parseInt(num) - 1).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("two")) {
        document.getElementById(parseInt(num) - 1).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("three")) {
        document.getElementById(parseInt(num) - 1).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("four")) {
        document.getElementById(parseInt(num) - 1).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("five")) {
        document.getElementById(parseInt(num) - 1).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("six")) {
        document.getElementById(parseInt(num) - 1).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("seven")) {
        document.getElementById(parseInt(num) - 1).classList.replace('seven', 'eight')
    }
    else {
        document.getElementById(parseInt(num) - 1).className += " one"
    }


    if ((parseInt(num) + 1) > 64) {
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("one")) {
        document.getElementById(parseInt(num) + 1).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("two")) {
        document.getElementById(parseInt(num) + 1).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("three")) {
        document.getElementById(parseInt(num) + 1).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("four")) {
        document.getElementById(parseInt(num) + 1).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("five")) {
        document.getElementById(parseInt(num) + 1).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("six")) {
        document.getElementById(parseInt(num) + 1).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("seven")) {
        document.getElementById(parseInt(num) + 1).classList.replace('seven', 'eight')
    }
    else {
        document.getElementById(parseInt(num) + 1).className += " one"
    }


    if ((parseInt(num) + 9) > 64) {

    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("one")) {
        document.getElementById(parseInt(num) + 9).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("two")) {
        document.getElementById(parseInt(num) + 9).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("three")) {
        document.getElementById(parseInt(num) + 9).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("four")) {
        document.getElementById(parseInt(num) + 9).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("five")) {
        document.getElementById(parseInt(num) + 9).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("six")) {
        document.getElementById(parseInt(num) + 9).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("seven")) {
        document.getElementById(parseInt(num) + 9).classList.replace('seven', 'eight')
    }

    else {
        document.getElementById(parseInt(num) + 9).className += " one"
    }


    if ((parseInt(num) + 8) > 64) {

    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("one")) {
        document.getElementById(parseInt(num) + 8).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("two")) {
        document.getElementById(parseInt(num) + 8).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("three")) {
        document.getElementById(parseInt(num) + 8).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("four")) {
        document.getElementById(parseInt(num) + 8).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("five")) {
        document.getElementById(parseInt(num) + 8).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("six")) {
        document.getElementById(parseInt(num) + 8).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("seven")) {
        document.getElementById(parseInt(num) + 8).classList.replace('seven', 'eight')
    }
    else {
        document.getElementById(parseInt(num) + 8).className += " one"
    }


    
    if ((parseInt(num) + 7) < 0) {

    }
    else if (document.getElementById(parseInt(num) + 7).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) + 7).className.includes("one")) {
        document.getElementById(parseInt(num) + 7).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) + 7).className.includes("two")) {
        document.getElementById(parseInt(num) + 7).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) + 7).className.includes("three")) {
        document.getElementById(parseInt(num) + 7).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) + 7).className.includes("four")) {
        document.getElementById(parseInt(num) + 7).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) + 7).className.includes("five")) {
        document.getElementById(parseInt(num) + 7).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) + 7).className.includes("six")) {
        document.getElementById(parseInt(num) + 7).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) + 7).className.includes("seven")) {
        document.getElementById(parseInt(num) + 7).classList.replace('seven', 'eight')
    }
    else {
        document.getElementById(parseInt(num) + 7).className += " one"
    }
}
function Bottom(num) {
    if ((parseInt(num) - 1) < 0) {

    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("one")) {
        document.getElementById(parseInt(num) - 1).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("two")) {
        document.getElementById(parseInt(num) - 1).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("three")) {
        document.getElementById(parseInt(num) - 1).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("four")) {
        document.getElementById(parseInt(num) - 1).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("five")) {
        document.getElementById(parseInt(num) - 1).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("six")) {
        document.getElementById(parseInt(num) - 1).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("seven")) {
        document.getElementById(parseInt(num) - 1).classList.replace('seven', 'eight')
    }
    else {
        document.getElementById(parseInt(num) - 1).className += " one"
    }


    if ((parseInt(num) + 1) > 64) {
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("one")) {
        document.getElementById(parseInt(num) + 1).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("two")) {
        document.getElementById(parseInt(num) + 1).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("three")) {
        document.getElementById(parseInt(num) + 1).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("four")) {
        document.getElementById(parseInt(num) + 1).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("five")) {
        document.getElementById(parseInt(num) + 1).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("six")) {
        document.getElementById(parseInt(num) + 1).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("seven")) {
        document.getElementById(parseInt(num) + 1).classList.replace('seven', 'eight')
    }
    else {
        document.getElementById(parseInt(num) + 1).className += " one"
    }


    if ((parseInt(num) - 9) < 0) {

    }
    else if (document.getElementById(parseInt(num) - 9).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) - 9).className.includes("one")) {
        document.getElementById(parseInt(num) - 9).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) - 9).className.includes("two")) {
        document.getElementById(parseInt(num) - 9).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) - 9).className.includes("three")) {
        document.getElementById(parseInt(num) - 9).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) - 9).className.includes("four")) {
        document.getElementById(parseInt(num) - 9).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) - 9).className.includes("five")) {
        document.getElementById(parseInt(num) - 9).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) - 9).className.includes("six")) {
        document.getElementById(parseInt(num) - 9).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) - 9).className.includes("seven")) {
        document.getElementById(parseInt(num) - 9).classList.replace('seven', 'eight')
    }
    else {
        document.getElementById(parseInt(num) - 9).className += " one"
    }


    if ((parseInt(num) - 8) < 0) {

    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("one")) {
        document.getElementById(parseInt(num) - 8).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("two")) {
        document.getElementById(parseInt(num) - 8).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("three")) {
        document.getElementById(parseInt(num) - 8).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("four")) {
        document.getElementById(parseInt(num) - 8).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("five")) {
        document.getElementById(parseInt(num) - 8).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("six")) {
        document.getElementById(parseInt(num) - 8).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("seven")) {
        document.getElementById(parseInt(num) - 8).classList.replace('seven', 'eight')
    }
    else {
        document.getElementById(parseInt(num) - 8).className += " one"
    }


    
    if ((parseInt(num) - 7) < 0) {

    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("one")) {
        document.getElementById(parseInt(num) - 7).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("two")) {
        document.getElementById(parseInt(num) - 7).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("three")) {
        document.getElementById(parseInt(num) - 7).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("four")) {
        document.getElementById(parseInt(num) - 7).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("five")) {
        document.getElementById(parseInt(num) - 7).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("six")) {
        document.getElementById(parseInt(num) - 7).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("seven")) {
        document.getElementById(parseInt(num) - 7).classList.replace('seven', 'eight')
    }
    else {
        document.getElementById(parseInt(num) - 7).className += " one"
    }
}
function topleft(num){//1,8,9
    if ((parseInt(num) + 1) > 64) {
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("one")) {
        document.getElementById(parseInt(num) + 1).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("two")) {
        document.getElementById(parseInt(num) + 1).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("three")) {
        document.getElementById(parseInt(num) + 1).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("four")) {
        document.getElementById(parseInt(num) + 1).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("five")) {
        document.getElementById(parseInt(num) + 1).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("six")) {
        document.getElementById(parseInt(num) + 1).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("seven")) {
        document.getElementById(parseInt(num) + 1).classList.replace('seven', 'eight')
    }
    else {
        document.getElementById(parseInt(num) + 1).className += " one"
    }


    if ((parseInt(num) + 9) > 64) {

    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("one")) {
        document.getElementById(parseInt(num) + 9).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("two")) {
        document.getElementById(parseInt(num) + 9).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("three")) {
        document.getElementById(parseInt(num) + 9).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("four")) {
        document.getElementById(parseInt(num) + 9).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("five")) {
        document.getElementById(parseInt(num) + 9).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("six")) {
        document.getElementById(parseInt(num) + 9).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("seven")) {
        document.getElementById(parseInt(num) + 9).classList.replace('seven', 'eight')
    }

    else {
        document.getElementById(parseInt(num) + 9).className += " one"
    }


    if ((parseInt(num) + 8) > 64) {

    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("one")) {
        document.getElementById(parseInt(num) + 8).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("two")) {
        document.getElementById(parseInt(num) + 8).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("three")) {
        document.getElementById(parseInt(num) + 8).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("four")) {
        document.getElementById(parseInt(num) + 8).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("five")) {
        document.getElementById(parseInt(num) + 8).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("six")) {
        document.getElementById(parseInt(num) + 8).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("seven")) {
        document.getElementById(parseInt(num) + 8).classList.replace('seven', 'eight')
    }
    else {
        document.getElementById(parseInt(num) + 8).className += " one"
    }
}
function topright(num){//-1,8,9
    if ((parseInt(num) - 1) < 0) {

    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("one")) {
        document.getElementById(parseInt(num) - 1).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("two")) {
        document.getElementById(parseInt(num) - 1).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("three")) {
        document.getElementById(parseInt(num) - 1).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("four")) {
        document.getElementById(parseInt(num) - 1).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("five")) {
        document.getElementById(parseInt(num) - 1).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("six")) {
        document.getElementById(parseInt(num) - 1).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("seven")) {
        document.getElementById(parseInt(num) - 1).classList.replace('seven', 'eight')
    }
    else {
        document.getElementById(parseInt(num) - 1).className += " one"
    }

    if ((parseInt(num) + 9) > 64) {

    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("one")) {
        document.getElementById(parseInt(num) + 9).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("two")) {
        document.getElementById(parseInt(num) + 9).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("three")) {
        document.getElementById(parseInt(num) + 9).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("four")) {
        document.getElementById(parseInt(num) + 9).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("five")) {
        document.getElementById(parseInt(num) + 9).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("six")) {
        document.getElementById(parseInt(num) + 9).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) + 9).className.includes("seven")) {
        document.getElementById(parseInt(num) + 9).classList.replace('seven', 'eight')
    }

    else {
        document.getElementById(parseInt(num) + 9).className += " one"
    }


    if ((parseInt(num) + 8) > 64) {

    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("one")) {
        document.getElementById(parseInt(num) + 8).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("two")) {
        document.getElementById(parseInt(num) + 8).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("three")) {
        document.getElementById(parseInt(num) + 8).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("four")) {
        document.getElementById(parseInt(num) + 8).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("five")) {
        document.getElementById(parseInt(num) + 8).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("six")) {
        document.getElementById(parseInt(num) + 8).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) + 8).className.includes("seven")) {
        document.getElementById(parseInt(num) + 8).classList.replace('seven', 'eight')
    }
    else {
        document.getElementById(parseInt(num) + 8).className += " one"
    }

}
function bottomleft(num){//1,-7,-8
    if ((parseInt(num) + 1) > 64) {
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("one")) {
        document.getElementById(parseInt(num) + 1).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("two")) {
        document.getElementById(parseInt(num) + 1).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("three")) {
        document.getElementById(parseInt(num) + 1).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("four")) {
        document.getElementById(parseInt(num) + 1).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("five")) {
        document.getElementById(parseInt(num) + 1).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("six")) {
        document.getElementById(parseInt(num) + 1).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) + 1).className.includes("seven")) {
        document.getElementById(parseInt(num) + 1).classList.replace('seven', 'eight')
    }
    else {
        document.getElementById(parseInt(num) + 1).className += " one"
    }

    if ((parseInt(num) - 8) < 0) {

    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("one")) {
        document.getElementById(parseInt(num) - 8).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("two")) {
        document.getElementById(parseInt(num) - 8).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("three")) {
        document.getElementById(parseInt(num) - 8).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("four")) {
        document.getElementById(parseInt(num) - 8).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("five")) {
        document.getElementById(parseInt(num) - 8).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("six")) {
        document.getElementById(parseInt(num) - 8).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("seven")) {
        document.getElementById(parseInt(num) - 8).classList.replace('seven', 'eight')
    }
    else {
        document.getElementById(parseInt(num) - 8).className += " one"
    }



    if ((parseInt(num) - 7) < 0) {

    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("one")) {
        document.getElementById(parseInt(num) - 7).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("two")) {
        document.getElementById(parseInt(num) - 7).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("three")) {
        document.getElementById(parseInt(num) - 7).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("four")) {
        document.getElementById(parseInt(num) - 7).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("five")) {
        document.getElementById(parseInt(num) - 7).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("six")) {
        document.getElementById(parseInt(num) - 7).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("seven")) {
        document.getElementById(parseInt(num) - 7).classList.replace('seven', 'eight')
    }
    else {
        document.getElementById(parseInt(num) - 7).className += " one"
    }
}
function bottomright(num) {//-1,-7,-8

    if ((parseInt(num) - 1) < 0) {

    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("one")) {
        document.getElementById(parseInt(num) - 1).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("two")) {
        document.getElementById(parseInt(num) - 1).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("three")) {
        document.getElementById(parseInt(num) - 1).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("four")) {
        document.getElementById(parseInt(num) - 1).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("five")) {
        document.getElementById(parseInt(num) - 1).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("six")) {
        document.getElementById(parseInt(num) - 1).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) - 1).className.includes("seven")) {
        document.getElementById(parseInt(num) - 1).classList.replace('seven', 'eight')
    }
    else {
        document.getElementById(parseInt(num) - 1).className += " one"
    }


    if ((parseInt(num) - 8) < 0) {

    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("one")) {
        document.getElementById(parseInt(num) - 8).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("two")) {
        document.getElementById(parseInt(num) - 8).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("three")) {
        document.getElementById(parseInt(num) - 8).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("four")) {
        document.getElementById(parseInt(num) - 8).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("five")) {
        document.getElementById(parseInt(num) - 8).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("six")) {
        document.getElementById(parseInt(num) - 8).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) - 8).className.includes("seven")) {
        document.getElementById(parseInt(num) - 8).classList.replace('seven', 'eight')
    }
    else {
        document.getElementById(parseInt(num) - 8).className += " one"
    }



    if ((parseInt(num) - 7) < 0) {

    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("mine")) {
    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("one")) {
        document.getElementById(parseInt(num) - 7).classList.replace('one', 'two')
    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("two")) {
        document.getElementById(parseInt(num) - 7).classList.replace('two', 'three')
    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("three")) {
        document.getElementById(parseInt(num) - 7).classList.replace('three', 'four')
    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("four")) {
        document.getElementById(parseInt(num) - 7).classList.replace('four', 'five')
    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("five")) {
        document.getElementById(parseInt(num) - 7).classList.replace('five', 'six')
    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("six")) {
        document.getElementById(parseInt(num) - 7).classList.replace('six', 'seven')
    }
    else if (document.getElementById(parseInt(num) - 7).className.includes("seven")) {
        document.getElementById(parseInt(num) - 7).classList.replace('seven', 'eight')
    }
    else {
        document.getElementById(parseInt(num) - 7).className += " one"
    }
}