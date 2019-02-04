import React, {Component} from 'react';
import {connect} from 'react-redux';

import CarouselM from './carouselM';
import ActionMov from './actionMov';
import ComedyMov from './comedyMov';
import FamilyMov from './familyMov';

import { fetchActionM, fetchComedyM, fetchFamilyM } from '../../store/actions/moviepageActions';

class Movies extends Component{

    state = {
        actionT: 'Loading...',
        comedicT: 'Loading...',
        familyT: 'Loading...'
    }

    componentDidMount(){
        this.props.fetchActionM();
        this.props.fetchComedyM();
        this.props.fetchFamilyM();
        setTimeout(() => {this.setState({ actionT : 'Action movies trending now', comedicT: 'Best comedic relief of 2010s', familyT: 'Movies to watch with family' })}, 1000)
    }

    componentWillUnmount(){
        console.log('component did unmount')
    }
    
    render(){
        //console.log(this.props.action);
        
        return(
            <div className='container-fluid'>
                <div className='top-carousel-box'>
                {
                    this.props.action.map(ac => 
                    <CarouselM ac={ac} key={ac.results[0].id} />)
                }
                </div>
                    <h2 className='section-title'>{this.state.actionT}</h2>
                <React.Fragment>
                    <ActionMov />
                </React.Fragment>
                    <h2 className='section-title-con'>{this.state.comedicT}</h2>
                <React.Fragment>
                    <ComedyMov />
                </React.Fragment>
                    <h2 className='section-title-con'>{this.state.familyT}</h2>
                <React.Fragment>
                    <FamilyMov />
                </React.Fragment>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        action: state.movies.actions
    }
}


export default connect(mapStateToProps, { fetchActionM, fetchComedyM, fetchFamilyM })(Movies);