// $(document).ready(function(){
    $('.table').css({'top': $('.heading').position().top});
    class Book{
        constructor(title,author,isbn){
            this.title = title;
            this.author = author;
            this.isbn = isbn;
        }
    }
    class Main{
        static add(book){
            let tr = document.createElement('tr');
            tr.innerHTML = `
                <td class='pt-3'>${book.title}</td>
                <td class='pt-3'>${book.author}</td>
                <td class='pt-3'>${book.isbn}</td>
                <td><button class='btn btn-danger btn-sm delete'>X</button></td>
            `;
            $('tbody').append(tr);
        }
        static clear(){
            document.querySelector('#title').value = '';
            document.querySelector('#author').value = '';
            document.querySelector('#isbn').value = '';
        }
        static added(txt,color){
            let div = document.createElement('div')
            div.innerText = txt;
            
            $(div).addClass(`alert alert-${color}`);
            
            $($('.inpform')).before($(div));
            $(div).delay(2500).fadeOut(500);
        }
        static storedbooks(){
            let books = Store.getBook();
            books.forEach(a => {
                Main.add(a)
            })
        }
    }
    $('table').on('click',function(e){
        if($(e.target).hasClass('delete')){
            $(e.target).parent().parent().fadeOut(200);
            Main.added('Removed','danger')
            Store.removeBook($(e.target).parent().prev().text());
        }
    })
    document.querySelector('.inpform').addEventListener('submit',function(e){
        e.preventDefault();

        title = document.querySelector('#title').value;
        author = document.querySelector('#author').value;
        isbn = document.querySelector('#isbn').value;

        book = new Book(title,author,isbn);

        if(title == '' || author == '' || isbn == ''){
            Main.added('Fill all the blanks','warning');
        } else{
            

            Main.add(book);
            Store.addBook(book);
            Main.clear();
            Main.added('Added','success');
        }
        

    })
    class Store {
        static getBook(){
            let books;
            if(localStorage.getItem('books') === null){
                books = [];
            } else{
                books = JSON.parse(localStorage.getItem('books'));
            }
            return books;
        }
        static addBook(book){
            let books = Store.getBook();
            books.push(book)
            localStorage.setItem('books',JSON.stringify(books));
        }
        static removeBook(isbn){
            let books = Store.getBook();
            books.forEach((book,index) => {
                if(book.isbn == isbn){
                    books.splice(index,1);
                }
                localStorage.setItem('books',JSON.stringify(books));
            })
        }
    }
    Main.storedbooks()
// })
// man = new Main(1,2,3);
// document.addEventListener('DOMContentLoaded', function(){
    // console.log(12);
    // maa = new Main();
    // Main2 = new Main();
    // mane = new Main()
    // console.log(mane.add)
// })
//startinggggggggggggggggggggggggggggg