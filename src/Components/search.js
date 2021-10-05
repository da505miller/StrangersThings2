import React from 'react';
import { useState } from 'react';

const Search = () => {

    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div class="col-lg-6">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Search for..." />
                    <span class="input-group-btn">
                        <button class="btn btn-primary" type="button">Go!</button>
                    </span>
            </div>
        </div>
    )

}



export default Search;