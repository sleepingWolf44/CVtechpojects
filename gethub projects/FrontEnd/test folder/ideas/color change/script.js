function btnRed() {
document.getElementById("Div1").style.backgroundColor="Red";
}
function btnGreen() {
document.getElementById("Div2").style.backgroundColor="Green";
}
function btnBlue() {
document.getElementById("Div3").style.backgroundColor="Blue";
}
function btnReset() {
sleep(1000)
document.getElementById("Div1").style.backgroundColor="white";
document.getElementById("Div2").style.backgroundColor="white";
document.getElementById("Div3").style.backgroundColor="white";
}
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}