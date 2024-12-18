function Ffrom(){
    document.getElementById("From").value = "1";
    document.getElementById("FAns").textContent = "Fahrenheit";
}
function Cfrom() {
    document.getElementById("From").value = "2";
    document.getElementById("FAns").textContent = "Celsius";
}
function Kfrom() {
    document.getElementById("From").value = "3";
    document.getElementById("FAns").textContent = "Kelvin";
}
function Fto() {
    document.getElementById("to").value = "1";
    document.getElementById("TAns").textContent = "Fahrenheit";
}
function Cto() {
    document.getElementById("to").value = "2";
    document.getElementById("TAns").textContent = "Celsius";
}
function Kto() {
    document.getElementById("to").value = "3";
    document.getElementById("TAns").textContent = "Kelvin";
}
function Submit(){
    var Starting = document.getElementById("first").value;
    var From = document.getElementById("From").value;
    var To = document.getElementById("to").value;
    var Ans = "something went wrong";
    if (parseInt(From) == 1 && parseInt(To) == 2){//F to C
        Ans = ((parseInt(Starting) - 32) * 5/9) + " " + document.getElementById("TAns").textContent;
    }
    else if (parseInt(From) == 1 && parseInt(To) == 3) {//F to K
        Ans = (((parseInt(Starting) - 32) * 5 / 9) + 273.15) + " " + document.getElementById("TAns").textContent;
    }
    else if (parseInt(From) == 2 && parseInt(To) == 1) {//C to F
        Ans = ((parseInt(Starting) * 9/5) *5/9) + " " + document.getElementById("TAns").textContent;
    }
    else if (parseInt(From) == 2 && parseInt(To) == 3) {//C to K
        Ans = (parseInt(Starting) + 273.15) + " " + document.getElementById("TAns").textContent;
    }
    else if (parseInt(From) == 3 && parseInt(To) == 1) {//K to F
        Ans = ((parseInt(Starting) - 273.15)*9/5+32)+ " " + document.getElementById("TAns").textContent;
    }
    else if (parseInt(From) == 3 && parseInt(To) == 2) {//K to C
        Ans = (parseInt(Starting)-273.15) + " " + document.getElementById("TAns").textContent;
    }
    else if(parseInt(From) ==  parseInt(To)){
        Ans = Starting + " " + document.getElementById("TAns").textContent;
    }
    document.getElementById("result").textContent = Ans;
}