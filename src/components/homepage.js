import React, {Component} from 'react';
import {connect} from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import Carousel from './carousel';
import Trending from './trending';
import SimilarMovies from './similarMovies';
import TrendingTv from './trendingTv';

import { fetchSuggested, fetchSimilar, fetchTrendingTv } from '../store/actions/moviesAndTvActions';

class Homepage extends Component{

    componentDidMount(){
        this.props.fetchSuggested();
        this.props.fetchSimilar();
        this.props.fetchTrendingTv();
    }
    render(){

        let tmpMovId = this.props.trending.length > 0 ? this.props.trending[0].results : 'empty string';
        console.log(tmpMovId[0].title)
        return (
            <div className='container-fluid'>
                <div className='top-carousel-box'>
                {
                    this.props.trending.map(tr =>
                    <Carousel trending={tr} key={tr.results[0].id} />)
                }
                </div>
                    <h2 className='section-title'>Movies trending now</h2>
                <div>
                        <Trending />
                </div>
                    <h2 className='section-title-con'>{`Similar movies to ${tmpMovId[0].title}:`}</h2>
                <div>
                    <SimilarMovies />
                </div>
                <h2 className='section-title-con'>TV-shows trending now</h2>
                <div>
                    <TrendingTv />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        trending: state.movTv.trending,
        tTv: state.movTv.trendingTv
    }
}

export default connect(mapStateToProps, { fetchSuggested, fetchSimilar, fetchTrendingTv })(Homepage);