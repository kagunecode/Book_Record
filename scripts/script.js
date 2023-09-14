const addBookButton = document.querySelector('.add-book-button')
const dialogWindow = document.querySelector('.book-dialog')
const blur = document.body
const confirmBtn = document.querySelector("#confirmBtn")
const form = document.forms['add-book']
const closeButton = document.querySelector('#cancelBtn')
const bookContainer = document.querySelector('.container')
let userLibrary = new Array()
const modalTitle = document.querySelector('.modal-title')
const modeSwitch = document.querySelector('.mode-switch')
let bookId = 0
let elementChange = ''
let bookEditId = 0
let bookObjects = new Array()

addBookButton.addEventListener('click', modalPop)
dialogWindow.addEventListener('close', closeModal)
closeButton.addEventListener('click', () => dialogWindow.close())
modeSwitch.addEventListener('click', modeToggle)

function modalPop() {
    dialogWindow.showModal()
    modalTitle.innerText = 'Add book'
    blur.classList.toggle('active')
}

function closeModal() {
    blur.classList.toggle('active')
}

function editBook(e) {
    modalPop()
    modalTitle.innerText = 'Edit book'
    bookEditId = e.target.getAttribute('data-id')
    form['title'].value = userLibrary[bookEditId].title
    form['author'].value = userLibrary[bookEditId].author
    form['bookPages'].value = userLibrary[bookEditId].totalPages
    form['pagesRead'].value = userLibrary[bookEditId].totalRead
    elementChange = document.querySelector(`[data-id="${bookEditId}"]`)
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
        totalPages: this.pages,
        totalRead: this.pagesRead,
        bookId: bookId,
    })
    displayBook(this.title, this.author, this.pages, this.pagesRead)
}

function displayBook(title, author, pages, pagesRead) {
    const newBook = document.createElement('div')
    newBook.classList.add('book')
    newBook.setAttribute('data-id', bookId)
    const upper = document.createElement('div')
    upper.classList.add('upper-content')
    const bookTitle = document.createElement('h1')
    bookTitle.classList.add('title')
    const bookAuthor = document.createElement('p')
    bookAuthor.classList.add('author')
    const bookDescription = document.createElement('p')
    bookDescription.classList.add('description')
    const bookStatus = document.createElement('p')
    bookStatus.classList.add('book-status')
    updateBook(bookTitle, bookAuthor, bookStatus, title, author, pages, pagesRead, readPages(newBook, pages, pagesRead))
    bookContainer.appendChild(newBook)
    newBook.appendChild(upper)
    upper.appendChild(bookTitle)
    upper.appendChild(bookAuthor)
    newBook.appendChild(bookDescription)
    newBook.appendChild(bookStatus)
    const bookElement = document.querySelectorAll('.book')
    bookElement.forEach(book => book.addEventListener('click', editBook))
    dialogWindow.close()
    bookId += 1
    bookEditId = bookId
}

Book.prototype.edit = function () {
    updateBook(elementChange.children[0].children[0], elementChange.children[0].children[1], elementChange.children[2], form['title'].value, form['author'].value, form['bookPages'].value, form['pagesRead'].value, readPages(elementChange, form['bookPages'].value, form['pagesRead'].value))
    dialogWindow.close()
}

function updateBook(titleElement, authorElement, pagesElement, title, author, pages, pagesRead, pagesFunc) {
    titleElement.innerText = title
    authorElement.innerText = author
    pagesElement.innerText = pagesFunc
    userLibrary[bookEditId].title = title
    userLibrary[bookEditId].author = author
    userLibrary[bookEditId].totalPages = pages
    userLibrary[bookEditId].totalRead = pagesRead
}

function readPages(book, pages, pagesRead) {
    if (pages == pagesRead) {
        book.classList.add('finished')
        return `Finished`
    } else {
        book.classList.remove('finished')
        return `${pagesRead} / ${pages}`
    }
}

function validateInput() {
    let pages = Number(form['bookPages'].value)
    let pagesRead = Number(form['pagesRead'].value)
    if (pagesRead > pages) {
        alert('Read pages can\'t be higher than total pages')
        return false
    }
    if (modalTitle.innerText == 'Add book') {
        bookObjects.push(new Book(form['title'].value, form['author'].value, pages, pagesRead))
        bookObjects[bookId].addBook()
    } else if (modalTitle.innerText == 'Edit book') {
        bookObjects[bookEditId].edit()
    }
    form.reset()
}

function modeToggle(e) {
    if (e.target.classList.contains('bi-sun-fill')) {
        e.target.classList.remove('bi-sun-fill')
        e.target.classList.add('bi-moon-stars-fill')
        document.querySelector("body").classList.add('dark')
    } else {
        e.target.classList.remove("bi-moon-stars-fill");
        e.target.classList.add("bi-sun-fill");
        document.querySelector("body").classList.remove("dark");
    }
}