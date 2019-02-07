import React from 'react';
import {connect} from 'react-redux';
import Slider from 'react-slick';
import Modal from 'react-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchMovVideo } from '../../store/actions/moviepageActions';

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
      background            : '#080a0a none repeat scroll 0% 0%',
      width                 : '600px',
    }
};

Modal.setAppElement('#root')

class ActionMov extends React.Component{
    constructor() {
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

    openModal(movie) {
        this.setState({modalIsOpen: true, movie: movie});
        //console.log(movie);
        //console.log(movie.id);
        this.props.fetchMovVideo(movie);
    }

    afterOpenModal(tmpId){
        this.subtitle.style.color = '#f00';
    }

    closeModal(){
        this.setState({modalIsOpen: false, movie: ''});
    }

    render(){
    //send same mapped data from this into the modal when clicked on the button <FontAwesomeIcon onClick....
    let action;
    if(this.props.action.length > 0){
        action = this.props.action[0].results.map(ac => (
            <div className='sliderbox' key={ac.id}>
                <div className='text-block'>
                    <h5 className='sliderTitle'>{ac.title}</h5>
                    <FontAwesomeIcon onClick={() => this.openModal(ac)} icon="plus-circle" className='sliderIcon' />
                    <p className='sliderRelease'>{ac.release_date}</p>
                    <p className='sliderVote'>{ac.vote_average}</p>
                </div>
                <img className='sliderImg' src={`${img_url}${ac.poster_path}`} alt={ac.title} />
            </div>
        ));
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        draggable: true,
        adaptiveHeight: true,
        className: 'innerSliderDiv',
        fade: false,
        swipeToSlide: true,
        touchThreshold: 15,
    };

    let tmpId = this.props.video.length > 0 ? this.props.video[0][0].key: '';
        return (
            <div>
                <Slider {...settings}>
                    {action}
                </Slider>
                <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel='Movies modal'
                >
                {
                    //Would like to print relative data here
                }
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
        action: state.movies.actions,
        video: state.movies.videos
    }
}

export default connect(mapStateToProps, { fetchMovVideo })(ActionMov);