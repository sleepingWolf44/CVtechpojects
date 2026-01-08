function Mix() {
    White()
    backgroundColor = "Black"
    document.getElementById("BackColor").value = backgroundColor;
    const nodeList = document.querySelectorAll(".box-element");
    $(".change").css("background-color", backgroundColor);
    for (i = 0, n = 0; i < nodeList.length; i++, n++) {
        if (n == 1) {
            nodeList[i].style.borderBottomColor = "#c40000";
            nodeList[i].style.borderLeftColor = "#ff0000";
            nodeList[i].style.borderRightColor = "#ff0000";
            nodeList[i].style.borderTopColor = "#000000";
        }
        else if (n == 2) {
            nodeList[i].style.borderLeftColor = "#ffee00";
            nodeList[i].style.borderRightColor = "#ffee00";
            nodeList[i].style.borderBottomColor = "#d3d600";
            nodeList[i].style.borderTopColor = "#000000";
        }
        else if (n == 3) {
            nodeList[i].style.borderLeftColor = "#00ff5e";
            nodeList[i].style.borderRightColor = "#00ff5e";
            nodeList[i].style.borderBottomColor = "#00c40a";
            nodeList[i].style.borderTopColor = "#000000";
        }
        else if (n == 4) {
            nodeList[i].style.borderLeftColor = "#00d9ff";
            nodeList[i].style.borderRightColor = "#00d9ff";
            nodeList[i].style.borderBottomColor = "#0065c4";
            nodeList[i].style.borderTopColor = "#000000";
        }
        else {
            nodeList[i].style.borderLeftColor = "#cc00ff";
            nodeList[i].style.borderRightColor = "#cc00ff";
            nodeList[i].style.borderBottomColor = "#8300c4";
            nodeList[i].style.borderTopColor = "#000000";
            n = 0;
        }
    }
}
function FullRand() {
    var turnspeed = Math.floor(((Math.random() * 2000) * -1) + 1);
    document.getElementById("SpeedRange").value = turnspeed;
    $("#rangeValue").text(turnspeed);
    Speed()
    $(".change").css("background-color", getRandomColor());
    const nodeList = document.querySelectorAll(".box-element");
    for (i = 0; i < nodeList.length; i++) {
        $(nodeList[i]).css("borderBottomColor", getRandomColor());
        $(nodeList[i]).css("borderLeftColor", getRandomColor());
        $(nodeList[i]).css("borderRightColor", getRandomColor());
        $(nodeList[i]).css("borderTopColor", getRandomColor());
    }
}
function Rand() {
    var speed = document.getElementById("Speed").checked;
    if (speed){
        var turnspeed = Math.floor(((Math.random() * 2000) * -1) + 1);
        document.getElementById("SpeedRange").value = turnspeed;
        $("#rangeValue").text(turnspeed);
        Speed()
    }
    var Third = document.getElementById("Third").checked;
    if (Third) {
        borderBottomColor = getRandomColor();
        document.getElementById("ThirdColor").value = borderBottomColor;
    }
    var sec = document.getElementById("sec").checked;
    if (sec) {
        borderLeftRightColor = getRandomColor();
        document.getElementById("SecColor").value = borderLeftRightColor;
    }
    var Main = document.getElementById("Main").checked;
    if (Main) {
        borderTopColor = getRandomColor();
        document.getElementById("MainColor").value = borderTopColor;
    }
    var background = document.getElementById("background").checked;
    if (background) {
        backgroundColor = getRandomColor();
        document.getElementById("BackColor").value = backgroundColor;
        $(".change").css("background-color", backgroundColor);
    }
    Submit()
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function Submit() {
    const nodeList = document.querySelectorAll(".box-element");
    for (i = 0; i < nodeList.length; i++) {
        nodeList[i].style.borderTopColor = document.getElementById("MainColor").value;
        nodeList[i].style.borderLeftColor = document.getElementById("SecColor").value;
        nodeList[i].style.borderRightColor = document.getElementById("SecColor").value;
        nodeList[i].style.borderBottomColor = document.getElementById("ThirdColor").value;
    }
}
function Black() {
    const nodeList = document.querySelectorAll(".see");
    for (h = 0; h < nodeList.length; h++) {
        nodeList[h].style.color = "#000000";
    }
}
function White() {
    const nodeList = document.querySelectorAll(".see");
    for (j = 0; j < nodeList.length; j++) {
        nodeList[j].style.color = "#ffffff";
    }
}
function Speed() {
    var speed = ((document.getElementById("SpeedRange").value)*-1)+"s";
    var fast = parseInt(document.getElementById("SpeedRange").value) + 2001;
    $("#rangeValue").text(fast);
    const nodeList = document.querySelectorAll(".box-element");
    for (i = 0; i < nodeList.length; i++) {
        nodeList[i].style.animationDuration = speed;
    }
} 
function back() {
    document.querySelector(".change").style.backgroundColor = document.getElementById("BackColor").value;
}
function Extra(){
    var element = document.getElementById("show");
    element.classList.toggle("hidden");
} 
