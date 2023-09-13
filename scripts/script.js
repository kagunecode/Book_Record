const addBookButton = document.querySelector('.add-book-button')
const dialogWindow = document.querySelector('.book-dialog')
const blur = document.body

addBookButton.addEventListener('click', addBook)
dialogWindow.addEventListener('close', closeModal)

function addBook() {
    dialogWindow.showModal()
    blur.classList.toggle('active')
}

function closeModal() {
    blur.classList.toggle('active')
}