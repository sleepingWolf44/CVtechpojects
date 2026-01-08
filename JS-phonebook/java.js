function add(){
    var First = document.getElementById("first").value;
    var Last = document.getElementById("last").value;
    var Phone = document.getElementById("phone").value;

    var x = document.getElementById("tabel").rows.length;
    var rows = x++;
    var row = document.getElementById("tabel").insertRow(rows);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(1);
    cell1.innerHTML = First;
    cell2.innerHTML = Last;
    cell3.innerHTML = Phone;
}