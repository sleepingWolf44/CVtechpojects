function Calculate(){//main function called.
    // getting input
    let firstname = document.getElementById("first").value;
    let lastname = document.getElementById("last").value;
    let grade1 = parseInt(document.getElementById("G1").value);
    let grade2 = parseInt(document.getElementById("G2").value);
    let grade3 = parseInt(document.getElementById("G3").value);
    //
    let average = Average(grade1, grade2, grade3);

    let lettergrade = LetterGrade(average)

    Display(firstname, lastname, grade1, grade2, grade3, average, lettergrade)
}
function Average(g1, g2, g3){//takes the grades and averages them.
    let full = (g1 + g2 + g3)/3;
    let ave = Math.round(full * 10) / 10;//takes the average and rounds keeping the first decimal.
    return ave;
}
function LetterGrade(average) {//takes the average and assigns a letter grade to it. 
    if (average <60){
        return "F";
    }
    else if (average < 70) {
        return "D";
    }
    else if (average < 80) {
        return "C";
    }
    else if (average < 90) {
        return "B";
    }
    else if (average < 100) {
        return "A";
    }
}
function Display(firstname, lastname, grade1, grade2, grade3, average, lettergrade) {// grabs all information and displays it in their respective arear
    let nam = firstname + " " + lastname;
    document.getElementById("Name").textContent = "Full Name: " + nam;
    document.getElementById("Grade1").textContent = "grade 1: " + grade1;
    document.getElementById("Grade2").textContent = "grade 2: " + grade2;
    document.getElementById("Grade3").textContent = "grade 3: " + grade3;
    document.getElementById("Average").textContent = "Average: " + average;
    document.getElementById("Letter").textContent = "Letter Grade: " + lettergrade;
}