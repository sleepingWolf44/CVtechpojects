function Calculate(){//main function called.
    // getting inputs
    let Wage = parseInt(document.getElementById("wage").value);
    let Worktime = parseInt(document.getElementById("worked").value);
    //starts calculation
    if(Worktime>40){//Overtime calculation
        let OverTime = Worktime-40;
        let OverTimePay = (OverTime * Wage)*1.5;
        let ans = Math.round(((Wage * 40) + OverTimePay));
        let text = stylize(ans);
        document.getElementById("gross").textContent = "Your Gross imcome is " + text + "$";
    }
    else {//No-Overtime calculation
        let ans = Worktime * Wage;
        let text = stylize(ans);
        document.getElementById("gross").textContent = "Your Gross imcome is " + text + "$";
    }
}

function stylize(gross){// adds commas to show every thousand if needed.
    var len = gross.toString();
    let length = len.length;
    var text = "";
    if (length<3 || length>21){//checks to see if the stylization is needed specificaly if it is less than 3 digits or if it changes to scientific notation. 
        return gross;
    }
    if (length % 3 == 0){//checks to see if thire dors not need change
        
    }
    else if (length % 3 == 2) {// checks to see if their is 2 more numbers than the number need to place commas and add them to return number with thier own comma while subtracting from them from the input.
        text = len[0] + len[1] + "," + text;
        len = len.substring(2, length);
    }
    else {// checks to see if their is 1 more number than the number need to place commas and add it to return number with thier own comma while subtracting from it from the input.
        text = len[0] + "," + text;
        len = len.substring(1, length);
    }
    length = len.length;
    for (i = 0; i < len.length; i++) {//goes through the numbers and adds commas every 3 numbers.
        if (i % 3 == 0) {
            if (i == 0) {
                text = text + len[i];
            }
            else {
                text = text + "," + len[i];
            }
        }
        else {
            text = text + len[i];
        }
    }
    return text;
}