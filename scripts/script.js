const addBookButton = document.querySelector('.add-book-button')
const dialogWindow = document.querySelector('.book-dialog')
const blur = document.body
const confirmBtn = document.querySelector("#confirmBtn")
const form = document.forms['add-book']
const closeButton = document.querySelector('#cancelBtn')
const bookContainer = document.querySelector('.container')

addBookButton.addEventListener('click', modalPop)
dialogWindow.addEventListener('close', closeModal)
form.addEventListener('submit', addBook)
closeButton.addEventListener('click', () => dialogWindow.close())

function modalPop() {
    dialogWindow.showModal()
    blur.classList.toggle('active')
}

function closeModal() {
    blur.classList.toggle('active')
}

function getValues(e) {
}

function addBook(e) {
    e.preventDefault()
    const newBook = document.createElement('div')
    newBook.classList.add('book')
    const upper = document.createElement('div')
    upper.classList.add('upper-content')
    const bookTitle = document.createElement('h1')
    bookTitle.classList.add('title')
    bookTitle.innerText = this.title.value
    const bookAuthor = document.createElement('p')
    bookAuthor.classList.add('author')
    bookAuthor.innerText = this.author.value
    const bookDescription = document.createElement('p')
    bookDescription.classList.add('description')
    const bookStatus = document.createElement('p')
    bookStatus.classList.add('book-status')
    if (this.bookPages.value == this.pagesRead.value) {
        bookStatus.innerText = 'Finished'
        newBook.classList.add('finished')
    } else {
        bookStatus.innerText = `${this.pagesRead.value} / ${this.bookPages.value}`
    }
    bookContainer.appendChild(newBook)
    newBook.appendChild(upper)
    upper.appendChild(bookTitle)
    upper.appendChild(bookAuthor)
    newBook.appendChild(bookDescription)
    newBook.appendChild(bookStatus)
    dialogWindow.close()
}