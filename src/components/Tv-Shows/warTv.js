import React from 'react';
import {connect} from 'react-redux';
import Slider from 'react-slick';
import Modal from 'react-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchTvVideo } from '../../store/actions/tvshowpageActions';

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

class WarTv extends React.Component{
    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            tv: {
                id: '', release_date: '', vote_average: '', title: ''
            }
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);


    }

    openModal(tv) {
        this.setState({modalIsOpen: true, tv: tv});
        //console.log(tv);
        //console.log(tv.id);
        this.props.fetchTvVideo(tv);
    }

    afterOpenModal(){
        this.subtitle.style.color = '#f00';
    }

    closeModal(){
        this.setState({modalIsOpen: false, tv: ''});
    }

    render(){
    //send same mapped data from this into the modal when clicked on the button <FontAwesomeIcon onClick....
    let war;
    if(this.props.war.length > 0){
        war = this.props.war[0].results.map(w => (
            <div className='sliderbox' key={w.id}>
                <div className='text-block'>
                    <h5 className='sliderTitle'>{w.name}</h5>
                    <FontAwesomeIcon onClick={() => this.openModal(w)} icon="plus-circle" className='sliderIcon' />
                    <p className='sliderRelease'>{w.first_air_date}</p>
                    <p className='sliderVote'>{w.vote_average}</p>
                </div>
                <img className='sliderImg' src={`${img_url}${w.poster_path}`} alt={w.name} />
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

    let tmpId = this.props.videos.length > 0 ? this.props.videos[0][0].key: '';
        return (
            <div>
                <Slider {...settings}>
                    {war}
                </Slider>
                <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel='tv modal'
                >
                {
                    //Would like to print relative data here
                }
                <h2 ref={subtitle => this.subtitle = subtitle}>{this.state.tv.name}</h2>
                    <div>
                    <p>Id: {this.state.tv.id}</p>
                    <h5 className='modalRelease'>Released: {this.state.tv.first_air_date}</h5>
                    <h5 className='modalVote'>Rating: {this.state.tv.vote_average}</h5>
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
        war: state.tv.war,
        videos: state.movTv.videostv
    }
}

export default connect(mapStateToProps,{ fetchTvVideo })(WarTv);