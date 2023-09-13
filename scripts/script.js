const addBookButton = document.querySelector('.add-book-button')
const dialogWindow = document.querySelector('.book-dialog')
const blur = document.body
const confirmBtn = document.querySelector("#confirmBtn")
const form = document.forms['add-book']
const closeButton = document.querySelector('#cancelBtn')
const bookContainer = document.querySelector('.container')
const userLibrary = new Array()
let bookId = 0

addBookButton.addEventListener('click', modalPop)
dialogWindow.addEventListener('close', closeModal)
closeButton.addEventListener('click', () => dialogWindow.close())

function modalPop() {
    dialogWindow.showModal()
    blur.classList.toggle('active')
}

function closeModal() {
    blur.classList.toggle('active')
}

function Book(title, author, pages, pagesRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.pagesRead = pagesRead
}

Book.prototype.addBook = function () {
    userLibrary.push({
        title: this.title,
        author: this.author,
        pages: this.pages,
        pagesRead: this.pagesRead,
        bookId: bookId
    })
    bookId += 1
    this.displayBook()
}

Book.prototype.displayBook = function () {
    const newBook = document.createElement('div')
    newBook.classList.add('book')
    const upper = document.createElement('div')
    upper.classList.add('upper-content')
    const bookTitle = document.createElement('h1')
    bookTitle.classList.add('title')
    bookTitle.innerText = this.title
    const bookAuthor = document.createElement('p')
    bookAuthor.classList.add('author')
    bookAuthor.innerText = this.author
    const bookDescription = document.createElement('p')
    bookDescription.classList.add('description')
    const bookStatus = document.createElement('p')
    bookStatus.classList.add('book-status')
    bookStatus.innerText = this.readPages(newBook)
    bookContainer.appendChild(newBook)
    newBook.appendChild(upper)
    upper.appendChild(bookTitle)
    upper.appendChild(bookAuthor)
    newBook.appendChild(bookDescription)
    newBook.appendChild(bookStatus)
    dialogWindow.close()
}

Book.prototype.readPages = function (book) {
    if (this.pages == this.pagesRead) {
        book.classList.add('finished')
        return `Finished`
    } else {
        return `${this.pagesRead} / ${this.pages}`
    }
}

function validateInput() {
    let pages = form['bookPages'].value
    let pagesRead = form['pagesRead'].value
    if (Number(pagesRead) > Number(pages)) {
        alert('Read pages can\'t be higher than total pages')
        return false
    }
    let book = new Book(form['title'].value, form['author'].value, pages, pagesRead)
    book.addBook()
    form.reset()
}