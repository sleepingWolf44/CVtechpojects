function evenodd(){
    var num = document.getElementById("num").value;
    
    /*%  5%2 = 1*/

    var deci = parseInt(num)/2;
    var round = Math.round(parseInt(num) / 2);
    if (deci-round == 0){
        alert("your number is even")
    }
    else if (deci - round != 0)(
        alert("your number is odd")
    )
}
