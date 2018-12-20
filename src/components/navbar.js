import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = (props) => {
    return (
        <span>
            <nav className='nav'>
                <Link to='/' className='nav-link active'>Home</Link>
                <Link to='/movies' className='nav-link'>Movies</Link>
                <Link to='/tv-shows' className='nav-link'>Tv-Shows</Link>
                <Link to='/recent' className='nav-link'>Recently Added</Link>
                <Link to='/categories' className='nav-link'>Categories</Link>
                <span className='user-search-panel'>
                    <div className='form-group search'>
                        <input label='search' className='form-control search' placeholder='Search...' />
                    </div>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Jack
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="">Action</a>
                            <a className="dropdown-item" href="">Another action</a>
                            <a className="dropdown-item" href="">Something else here</a>
                        </div>
                        </div>
                </span>
            </nav>
        </span>
    )
}

export default Navbar;