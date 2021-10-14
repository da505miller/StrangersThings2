import React from 'react';
import { useState } from 'react';


// Need to figure out all the logic that goes into the Search component
// This component is totally jacked up. Tried to follow along and do it during the lecture and idk what i did but it does not work right.

// const Search = ({setFilteredResults, posts}) => {

//     function filterThosePosts(posts, searchTerm){
//         searchTerm = searchTerm.toLowerCase();
//         return posts.filter((posts, positionInArray) => {
//             const myPostName = posts.title.toLowerCase();
//             return myPostName.includes(searchTerm);
//         })
//     }

//     const [searchTerm, setSearchTerm] = useState('');

//     return (
//         <form className="form-group">
//             <div className="col-lg-6">
//                 <div className="input-group">
//                     <input 
//                         onChange={(event) => {
//                             setSearchTerm(event.target.value)
//                             const mySearchFilteredPosts = filterThosePosts(posts, event.target.value)
//                             setFilteredResults(mySearchFilteredPosts)
//                         }}
                        
//                         value={searchTerm}
//                         type="text" className="form-control" placeholder="Search for..." required />
//                         <span className="input-group-btn">
//                             <button className="btn btn-primary" type="submit">Go!</button>
//                         </span>
//                 </div>
//             </div>
//         </form>
        
//     )

// }

const Search = () => {
    return (
    <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search posts</span>
        </label>
        <div className="form-group">
        <input
            type="text"
            className="form-control"
            id="header-search"
            placeholder="Search posts"
            name="s" 
        />
        </div>
        <button type="submit" className="btn btn-primary btn-dark btn-lg ">Search</button>
    </form>)
}



export default Search;