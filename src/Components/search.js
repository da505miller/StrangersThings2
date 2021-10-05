import React from 'react';
import { useState } from 'react';

const Search = (props) => {

    const posts = props.posts;

    const [searchTerm, setSearchTerm] = useState('');

    return (
        <form className="form-group">
            <div className="col-lg-6">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search for..." />
                        <span className="input-group-btn">
                            <button className="btn btn-primary" type="submit">Go!</button>
                        </span>
                </div>
            </div>
        </form>
        
    )

}



export default Search;