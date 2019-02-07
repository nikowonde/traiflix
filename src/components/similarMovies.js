import React from 'react';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from 'react-slick';

import { fetchVideo } from '../store/actions/homepageActions';


const img_url = 'https://image.tmdb.org/t/p/original';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      color                 : 'white',
      background: '#080a0a none repeat scroll 0% 0%',
      width: '600px',
    }
  };
  
Modal.setAppElement('#root')
  

class SimilarMovies extends React.Component{

    constructor(){
        super();

        this.state = {
            modalIsOpen: false,
            movie: {
                id: '', release_date: '', vote_average: '', title: ''
            }
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(movie){
        this.setState({modalIsOpen: true, movie: movie});
        this.props.fetchVideo(movie);
    }

    afterOpenModal(){
        this.subtitle.style.color = '#f00';
    }

    closeModal(){
        this.setState({modalIsOpen: false, movie: ''});
    }

        render(){
        let similar;
        if (this.props.similar.length > 0){
            //console.log(props.similar[0].results)
            similar = this.props.similar[0].results.map(sm => (
                    <div className='sliderbox' key={sm.id}>
                        <div className='text-block'>
                            <h5 className='sliderTitle'>{sm.title}</h5>
                            <FontAwesomeIcon onClick={() => this.openModal(sm)} icon="plus-circle" className='sliderIcon' />
                            <p className='sliderRelease'>{sm.release_date}</p>
                            <p className='sliderVote'>{sm.vote_average}</p>
                        </div>
                        <img className='sliderImg' src={`${img_url}${sm.poster_path}`} alt={sm.title} />
                    </div>
            ));
        }

        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 1,
            initialSlide: 0,
            rtl: false,
            className: 'innerSliderDiv',
            fade: false,
            swipeToSlide: true,
            touchThreshold: 15,
        };

        let tmpId = this.props.videos.length > 0 ? this.props.videos[0][0].key : '';
        return (
            <div>
                <Slider {...settings}>
                    {similar}
                </Slider>
                <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel='similar movie modal'
                >
                <h2 ref={subtitle => this.subtitle = subtitle}>{this.state.movie.title}</h2>
                    <div>
                    <p>Id: {this.state.movie.id}</p>
                    <h5 className='modalRelease'>Released: {this.state.movie.release_date}</h5>
                    <h5 className='modalVote'>Rating: {this.state.movie.vote_average}</h5>
                    {tmpId.length >0 ?<iframe width="560" height="315" src={`https://www.youtube.com/embed/${tmpId}`} frameBorder="0" title='youtube' allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className='videoFrame'></iframe> : <p className='loading'>Loading...</p>}
                    </div>
                <button className='modalClose' onClick={this.closeModal}>X</button>
                </Modal>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        similar: state.movTv.similar,
        videos: state.movTv.videos
    }
}

export default connect(mapStateToProps, { fetchVideo })(SimilarMovies);