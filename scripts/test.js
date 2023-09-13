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
    })
}

const userLibrary = new Array()
console.log(userLibrary)
let book = new Book('Harry Potter', 'J.K. Rowling', 122, 100)
book.addBook()
console.log(userLibrary)
book = new Book('Narnia', 'C.S. Lewis', 90, 10)
book.addBook()
console.log(userLibrary[1].title)
