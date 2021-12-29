let deletedItems = document.querySelectorAll(".delete")

for (let i = 0; i < deletedItems.length; i++) {
    deletedItems[i].addEventListener("click", function () {
        deletedItems[i].insertAdjacentHTML(
            'afterbegin',
            `<input type="hidden" name="deletedItems" value=${i.toString()}>`
        )
        document.getElementById("item" + i.toString()).className = "hide"
    })
}

