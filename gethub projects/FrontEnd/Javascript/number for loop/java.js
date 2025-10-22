function Submit(){
    var Starting = document.getElementById("first").value;
    var Ending = document.getElementById("last").value;
    var Increment = document.getElementById("Increment").value;
    var text = "";
    for (i = Starting; i <= (Ending); i = i + Increment){
        num = " " + i + ""; 
        text = text + num;
    }
    document.getElementById("values").textContent = text
}