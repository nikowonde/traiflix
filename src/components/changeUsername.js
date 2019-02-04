import React from 'react';

import {connect} from 'react-redux';

const ChangeUsername = (props) => {
    return (
        <div className='container-fluid padding'>
            <div className='.col-md-4 changeUsername'>
                <input className='username-field' type='text' onChange={props.onUsernameChange} placeholder='Enter username here'/>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUsernameChange: (event) => dispatch({ type: 'CHANGE_USERNAME', value: event.target.value })
    }
}

export default connect(null, mapDispatchToProps)(ChangeUsername);