
function func() {
    for (i = 0; i < 10; i++){
        const elementToClone = document.querySelector(".clone-me");
        const clonedElement = elementToClone.cloneNode(true);
        container.appendChild(clonedElement);
        document.querySelector(".der").style.visibility = "hidden";
    }
}
