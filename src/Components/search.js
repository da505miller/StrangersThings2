import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Need to figure out all the logic that goes into the Search component

const Search = ({setFilteredResults, posts}) => {

    function filterThosePosts(posts, searchTerm){
        searchTerm = searchTerm.toLowerCase();
        return posts.filter((posts, positionInArray) => {
            const myPostName = posts.title.toLowerCase();
            return myPostName.includes(searchTerm);
        })
    }

    const [searchTerm, setSearchTerm] = useState('');

    return (
        <form className="form-group">
            <div className="col-lg-6">
                <div className="input-group">
                    <input 
                        onChange={(event) => {
                            setSearchTerm(event.target.value)
                            const mySearchFilteredPosts = filterThosePosts(posts, event.target.value)
                            setFilteredResults(mySearchFilteredPosts)
                        }}
                        
                        value={searchTerm}
                        type="text" className="form-control" placeholder="Search for..." required />
                        <span className="input-group-btn">
                            <button className="btn btn-primary" type="submit">Go!</button>
                        </span>
                </div>
            </div>
        </form>
        
    )

}



export default Search;