const addBookButton = document.querySelector('.add-book-button')
const dialogWindow = document.querySelector('.book-dialog')
const blur = document.body
const confirmBtn = document.querySelector("#confirmBtn")
const form = document.forms['add-book']
const closeButton = document.querySelector('#cancelBtn')
const bookContainer = document.querySelector('.container')
const userLibrary = new Array()
const modalTitle = document.querySelector('.modal-title')
let bookId = 0
let elementChange = ''

addBookButton.addEventListener('click', modalPop)
dialogWindow.addEventListener('close', closeModal)
closeButton.addEventListener('click', () => dialogWindow.close())

function modalPop() {
    dialogWindow.showModal()
    modalTitle.innerText = 'Add book'
    blur.classList.toggle('active')
}

function modalPopEdit(e) {
    dialogWindow.showModal()
    modalTitle.innerText = 'Edit book'
    blur.classList.toggle('active')
    editBook(e)
}

function closeModal() {
    blur.classList.toggle('active')
}

function editBook(e) {
    console.log(e.target.getAttribute('data-id'))
    console.log(userLibrary[e.target.getAttribute('data-id')])
    modalPop()
    modalTitle.innerText = 'Edit book'
    form['title'].value = userLibrary[e.target.getAttribute('data-id')].title
    form['author'].value = userLibrary[e.target.getAttribute('data-id')].author
    form['bookPages'].value = userLibrary[e.target.getAttribute('data-id')].pages
    form['pagesRead'].value = userLibrary[e.target.getAttribute('data-id')].pagesRead
    elementChange = document.querySelector(`[data-id="${e.target.getAttribute('data-id')}"]`)
}


function Book(title, author, pages, pagesRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.pagesRead = pagesRead
    this.elementChange = ''
}

Book.prototype.addBook = function () {
    userLibrary.push({
        title: this.title,
        author: this.author,
        pages: this.pages,
        pagesRead: this.pagesRead,
        bookId: bookId
    })
    this.displayBook()
}

Book.prototype.displayBook = function () {
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
    this.updateBook(bookTitle, bookAuthor, bookStatus, this.title, this.author, this.readPages(newBook, this.pages, this.pagesRead))
    bookContainer.appendChild(newBook)
    newBook.appendChild(upper)
    upper.appendChild(bookTitle)
    upper.appendChild(bookAuthor)
    newBook.appendChild(bookDescription)
    newBook.appendChild(bookStatus)
    const bookElement = document.querySelectorAll('.book')
    bookElement.forEach(book => book.addEventListener('click', modalPopEdit))
    dialogWindow.close()
    bookId += 1
}

Book.prototype.edit = function () {
    this.updateBook(elementChange.children[0].children[0], elementChange.children[0].children[1], elementChange.children[2], form['title'].value, form['author'].value, this.readPages(elementChange, form['bookPages'].value, form['pagesRead'].value))
    dialogWindow.close()
}

Book.prototype.updateBook = function (titleElement, authorElement, pagesElement, title, author, pages) {
    titleElement.innerText = title
    authorElement.innerText = author
    pagesElement.innerText = pages
}

Book.prototype.readPages = function (book, pages, pagesRead) {
    if (pages == pagesRead) {
        book.classList.add('finished')
        return `Finished`
    } else {
        return `${pagesRead} / ${pages}`
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
    if (modalTitle.innerText == 'Add book') {
        book.addBook()
    } else if (modalTitle.innerText == 'Edit book') {
        book.edit()
    }
    form.reset()
}