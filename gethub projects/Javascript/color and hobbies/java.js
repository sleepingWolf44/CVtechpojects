// Kyler Deakins 10/23/24-10/23/24
function Color(num){
    switch(num){//figures out which hobby needs to be changes through input then runs the approprite code.
        case 1:
            document.querySelector(".First").style.color = document.getElementById("FirColor").value;
            break;
        case 2:
            document.querySelector(".Second").style.color = document.getElementById("SecColor").value;
            break;
        case 3:
            document.querySelector(".Third").style.color = document.getElementById("TirColor").value;
            break;
        case 4:
            document.querySelector(".Fourth").style.color = document.getElementById("FourColor").value;
            break;
        case 5:
            document.querySelector(".Fifth").style.color = document.getElementById("FivColor").value;
            break;
    }
}