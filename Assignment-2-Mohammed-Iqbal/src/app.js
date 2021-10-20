import './app.css'
import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import Shelves from './shelves'
import Search from './search'
import * as BooksAPI from './booksapi'

class BooksApp extends Component {

    
    componentDidMount() {
        this.getAll();
    }

    state = {
        showSearchPage: false,
        books: [],
        shelves: [],
        queriedBooks: []
    }

   
    setShelves = (books) => {
        let {shelves} = this.state;

        shelves = books.map(book => book.shelf);
        shelves = shelves.filter((elem, index, self) => index === self.indexOf(elem));

        this.setState({shelves});
    };

    getAll = () => {
        BooksAPI
            .getAll()
            .then((books) => {
                this.setState({books});
                this.setShelves(books);
            })
    };
    
    updateBook = (book, shelf) => {

        if (!shelf)
            return;

        let booksCopy;

        BooksAPI.update(book, shelf);

        const toUpdatedIndex = this.getUpdatedIndex(book);
        booksCopy = this.copyArr(this.state.books);


        if (toUpdatedIndex !== -1) {
            booksCopy[toUpdatedIndex].shelf = shelf;
        } else {
            book.shelf = shelf;
            booksCopy.push(book);
        }

        this.setState({books: booksCopy});
    };


    search = (query) => {
        if (query) {
            BooksAPI
                .search(query)
                .then((queriedBooks) => {
                    this.setState({queriedBooks});
                });
        } else {
            this.setState({queriedBooks: []});
        }
    };
    
    getUpdatedIndex = (book) => {
        return this
            .state
            .books
            .findIndex(b => b.id === book.id);
    };

   
    copyArr = (arr) => {
        return [...arr];
    };

    
    getBookShelf = (book) => {
        const existingBook = this
            .state
            .books
            .filter(b => b.id === book.id);
        if (existingBook.length) {
            return existingBook[0].shelf;
        } else {
            return null;
        }
    };
    

    render() {
        return (
            <div className="app">

                <Route
                    exact
                    path="/"
                    render={() => (<Shelves
                    books={this.state.books}
                    shelves={this.state.shelves}
                    updateBook={this.updateBook}
                    getShelf={this.getBookShelf}/>)}/>

                <Route
                    exact
                    path="/search"
                    render={() => (<Search
                    search={this.search}
                    queriedBooks={this.state.queriedBooks}
                    shelves={this.state.shelves}
                    updateBook={this.updateBook}
                    getShelf={this.getBookShelf}/>)}/>


            </div>
        )
    }
}

export default BooksApp
