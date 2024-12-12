



// nav
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById("grow").style.width = "90px";
    } else {
        document.getElementById("grow").style.width = "10%";
    }
}  
//donation bar 
let input = 0;
function donation(){
    input += parseInt(document.getElementById("number").value);
    let per = ((input / 100000) * 100);
    if(per>=100){
        per = 100
    }
    let persentage = Math.floor(per) + "%";
    document.getElementById("bar").textContent = persentage;
    document.getElementById("num").style.width = persentage;
}
function inf(){
    window.scrollTo({top:0, behavior: 'smooth'});
} 