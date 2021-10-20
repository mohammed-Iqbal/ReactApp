import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import BooksList from './bookslist'
import PropTypes from 'prop-types';

class Search extends Component {

    static propTypes = {
        shelves: PropTypes.array.isRequired,
        updateBook: PropTypes.func.isRequired,
        search: PropTypes.func.isRequired
    }

    state = {
        query:''
    }

    updateQuery = (query) => {
        this.setState({
            query: query
        }, () => {
            this
                .props
                .search(this.state.query);
        })
    }

    render() {
        const {queriedBooks, shelves, updateBook, getShelf} = this.props;
        const {query} = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Exit</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by the title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <BooksList
                        queriedBooks={queriedBooks}
                        updateBook={updateBook}
                        shelves={shelves}
                        getShelf={getShelf}/>
                </div>
            </div>
        )
    }
}

export default Search;