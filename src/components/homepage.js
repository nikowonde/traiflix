import React, {Component} from 'react';
import {connect} from 'react-redux';

import Carousel from './carousel';
import Trending from './trending';
import SimilarMovies from './similarMovies';
import TrendingTv from './trendingTv';


import { fetchSuggested, fetchSimilar, fetchTrendingTv } from '../store/actions/homepageActions';

class Homepage extends Component{

    state = {
        trendingMov: 'Loading...',
        similarMov: 'Loading...',
        trendingTv: 'Loading...',
        similarTitle: '',
    }

    componentDidMount(){
        this.props.fetchSuggested();
        this.similarVar = setTimeout(() => {this.props.fetchSimilar(this.props.trending[0].results[0].id);}, 1000);
        this.props.fetchTrendingTv();
        this.titleVar = setTimeout(() => {this.setState({ /*similarTitle: `${this.tmpTitle}`,*/ trendingMov : 'Movies trending now', similarMov: `Similar movies to:`, trendingTv: 'TV-shows trending now' })}, 1000);
    }

    componentWillUnmount(){
        console.log('component did unmount')
        clearTimeout(this.similarVar, this.titleVar, this.tmpTitleVar);
    }
    
    render(){
        let tmpMovId = this.props.trending.length > 0 ? this.props.trending[0].results : 'empty string';
        let tmpTitle = tmpMovId.length > 0 ? tmpMovId[0].title : '';
        let movieId = tmpMovId.length > 0 ? tmpMovId[0].id : '';
        let changeTitle = () => {
            setTimeout(() => {this.setState({ similarTitle: `${tmpTitle}`})}, 1000)
        }
        changeTitle();
        return (
            <div className='container-fluid'>
                <div className='top-carousel-box'>
                {
                    this.props.trending.map(tr =>
                    <Carousel trending={tr} key={tr.results[0].id} />)
                }
                </div>
                    <h2 className='section-title'>{this.state.trendingMov}</h2>
                <div>
                    <Trending />
                </div>
                    <h2 className='section-title-con'>{`${this.state.similarMov} ${this.state.similarTitle}`}</h2>
                <div>
                    <SimilarMovies movieid={movieId} />
                </div>
                <h2 className='section-title-con'>{this.state.trendingTv}</h2>
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
        tTv: state.movTv.trendingTv,
        username: state.movTv.username,
    }
}


export default connect(mapStateToProps, { fetchSuggested, fetchSimilar, fetchTrendingTv })(Homepage);