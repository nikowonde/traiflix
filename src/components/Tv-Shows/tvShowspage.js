import React, {Component} from 'react';
import {connect} from 'react-redux';

import CarouselTv from './carouselTv';
import WarTv from './warTv';
import SciFan from './scifiFantasyTv';
import Anim from './animationTv';

import { fetchTrendingTv } from '../../store/actions/homepageActions';
import { fetchWarTv, fetchSciFanTv, fetchAnimTv } from '../../store/actions/tvshowpageActions';

let titleVar;

class TvShowsPage extends Component {

    state= {
        warPol: 'Loading...',
        sciFan: 'Loading...',
        animated: 'Loading...'
    }
    
    componentDidMount(){
        this.props.fetchTrendingTv();
        this.props.fetchWarTv();
        this.props.fetchSciFanTv();
        this.props.fetchAnimTv();
        this.titleVar = setTimeout(() => {this.setState({ warPol: 'War and politics', sciFan : 'Sci-Fi and Fantasy', animated: `Animated`})}, 1000);
    }

    componentWillMount(){
        clearTimeout(titleVar);
    }

    render(){
        //console.log(this.props.trending)
        return (
            <div className='container-fluid'>
                <div className='top-carousel-box'>
                {
                    this.props.trending.map(tr =>
                    <CarouselTv tr={tr} key={tr.results[0].id} />)
                }
                </div>
                <h2 className='section-title-con'>{this.state.warPol}</h2>
                <React.Fragment>
                    <WarTv />
                </React.Fragment>
                <h2 className='section-title-con'>{this.state.sciFan}</h2>
                <React.Fragment>
                    <SciFan />
                </React.Fragment>
                <h2 className='section-title-con'>{this.state.animated}</h2>
                <React.Fragment>
                    <Anim />
                </React.Fragment>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        trending: state.movTv.trendingTv
    }
}

export default connect(mapStateToProps, {fetchTrendingTv, fetchWarTv, fetchSciFanTv, fetchAnimTv})(TvShowsPage );