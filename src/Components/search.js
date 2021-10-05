import React from 'react';
import { useState } from 'react';

const Search = (props) => {
    
    const posts = props.posts;

    const [searchTerm, setSearchTerm] = useState('');

    return (
        <form className="form-group">
            <div class="col-lg-6">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search for..." />
                        <span class="input-group-btn">
                            <button class="btn btn-primary" type="button">Go!</button>
                        </span>
                </div>
            </div>
        </form>
        
    )

}



export default Search;