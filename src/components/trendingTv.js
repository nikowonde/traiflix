import React from 'react';
import {connect} from 'react-redux';
import Slider from 'react-slick';
import SliModalTv from './sliModalTv';

const img_url = 'https://image.tmdb.org/t/p/original';

const TrendingTv = (props) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 3
    };

    let trending;
    if (props.trending.length > 0){
        //console.log(props.trending[0].results)
        trending = props.trending[0].results.map(tr => (
                <div className='sliderbox' key={tr.id}>
                    <div className='text-block'>
                        <h5 className='sliderTitle'>{tr.name}</h5>
                        <SliModalTv
                        toModal={tr}
                        img_url={img_url}
                        />
                        <p className='sliderRelease'>{tr.first_air_date}</p>
                        <p className='sliderVote'>{tr.vote_average}</p>
                    </div>
                    <img className='sliderImg' src={`${img_url}${tr.poster_path}`} alt={tr.title} />
                </div>
        ));
    }
    return (
        <Slider {...settings}>
            {trending}
        </Slider>
    )
}


const mapStateToProps = (state) => {
    return {
        trending: state.movTv.trendingTv
    }
}

export default connect(mapStateToProps)(TrendingTv);

//poster={tr.results.poster_path} title={tr.results.title} description={tr.results.overview} release={tr.results.release_date} key={tr.results[0].id}
/*
            <div classNameName='col-sm' key={tr.results[0].id}>
                <img classNameName='sliderImg' src={tr.results[0].poster_path} alt={tr.results.title} />
                <h4 classNameName='sliderTitle'>{tr.results[0].title}</h4>
                <p classNameName='sliderDescription'>{tr.results[0].overview}</p>
            </div>



*/