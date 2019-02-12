import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSearchResults, fetchPersonInfo } from '../store/actions/homepageActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = (props) => {
    return (
        <span>
            <nav className='nav'>
                <span className='nav-hide'>
                    <Link to='/' className='nav-link'>Home</Link>
                    <Link to='/movies' className='nav-link'>Movies</Link>
                    <Link to='/tv-shows' className='nav-link'>Tv-Shows</Link>
                    <span className='user-search-panel'>
                        <div className='form-group search'>
                            <input label='search' onChange={onInputChange} onKeyPress={(e) => handleKeyPress(e, props, tmpValue, personId)} className='form-control search' placeholder='Search...' />
                        </div>
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {props.username}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <Link to='/user' className='dropdown-item'>Change Username</Link>
                            </div>
                        </div>
                    </span>
                </span>
                <div className='container navContainer'>
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"><FontAwesomeIcon icon="align-justify" className='nav-icon' /></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <Link to='/' className='nav-link'>Home</Link>
                        <Link to='/movies' className='nav-link'>Movies</Link>
                        <Link to='/tv-shows' className='nav-link'>Tv-Shows</Link>
                        <div className='user-search-panel'>
                            <div className='form-group search'>
                                <input label='search' onChange={onInputChange} onKeyPress={(e) => handleKeyPress(e, props, tmpValue, personId)} className='form-control search' placeholder='Search...' />
                            </div>
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {props.username}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <Link to='/user' className='dropdown-item'>Change Username</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </span>
    )
}

let tmpValue = null;
let personId = null;

const onInputChange = (event) => {
    tmpValue = event.target.value;
    //console.log(tmpValue);
}

const handleKeyPress = (e, props, tmpValue) => {
    if (e.key === 'Enter') {
        props.fetchSearchResults(tmpValue);
        props.history.push('./search');
    }
}

const mapStateToProps = (state) => {
    return {
        info: state.movTv.results,
        username: state.movTv.username
    }
}

export default withRouter(connect(mapStateToProps, { fetchSearchResults, fetchPersonInfo })(Navbar));

/*

<Link to='/recent' className='nav-link'>Recently Added</Link>
<Link to='/categories' className='nav-link'>Categories</Link>

*/