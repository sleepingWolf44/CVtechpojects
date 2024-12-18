function Submit(){
    var Starting = document.getElementById("first").value;
    var Second = document.getElementById("Second").value;
    var num = Starting ** Second;
    document.getElementById("result").textContent = num
}