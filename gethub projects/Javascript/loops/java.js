function forloop(){
    for(i=1;i<=5;i++){
        let person;
        switch (i){
            case 1:
                person = "David"
                break
            case 2:
                person = "Konner"
                break
            case 3:
                person = "Gavin"
                break
            case 4:
                person = "Beckham"
                break
            case 5:
                person = "Kamryn"
                break
        }
        let classmate = "classmate" + i
        document.getElementById(classmate).textContent = person;
    }
}
const people = { 1: "David", 2: "Konner", 3: "Gavin", 4: "Beckham", 5: "Kamryn" }
function forinloop(){
    for (let x in people){
        let classmate = "classmate" + x;
        document.getElementById(classmate).textContent = people[x];
    }

}
const classmates = ["David", "Konner", "Gavin", "Beckham", "Kamryn"]
function forofloop(){
    let p=0;
    for (let x of classmates) {
        p++;
        let classmate = "classmate" + p;
        document.getElementById(classmate).textContent = x;
    }
}
function whileloop(){
    let k=0;
    while(classmates.length > k){
        let classmate = "classmate" + (k+1);
        document.getElementById(classmate).textContent = classmates[k];
        k++;
    }

}
function dowhileloop(){
    let k = 0;
    do{
        let classmate = "classmate" + (k + 1);
        document.getElementById(classmate).textContent = classmates[k];
        k++;
    }
    while (classmates.length > k)
}
function restart(){
    for (i = 1; i <= 5; i++) {
        let classmate = "classmate" + i;
        document.getElementById(classmate).textContent = " ";
    }
}