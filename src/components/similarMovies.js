import React from 'react';
import {connect} from 'react-redux';
import Slider from 'react-slick';
import SliModal from './sliModal';

const img_url = 'https://image.tmdb.org/t/p/original';

const SimilarMovies = (props) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 3
    };

    let similar;
    if (props.similar.length > 0){
        //console.log(props.similar[0].results)
        similar = props.similar[0].results.map(sm => (
                <div className='sliderbox' key={sm.id}>
                    <div className='text-block'>
                        <h5 className='sliderTitle'>{sm.title}</h5>
                        <SliModal
                        toModal={sm}
                        img_url={img_url}
                        />
                        <p className='sliderRelease'>{sm.release_date}</p>
                        <p className='sliderVote'>{sm.vote_average}</p>
                    </div>
                    <img className='sliderImg' src={`${img_url}${sm.poster_path}`} alt={sm.title} />
                </div>
        ));
    }
    return (
        <Slider {...settings}>
            {similar}
        </Slider>
    )
}


const mapStateToProps = (state) => {
    return {
        similar: state.movTv.similar
    }
}

export default connect(mapStateToProps)(SimilarMovies);