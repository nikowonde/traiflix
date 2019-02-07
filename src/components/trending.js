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

class Trending extends React.Component{

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
        let trending;
        if (this.props.trending.length > 0){
            //console.log(props.trending[0].results)
            trending = this.props.trending[0].results.map(tr => (
                    <div className='sliderbox' key={tr.id}>
                        <div className='text-block'>
                            <h5 className='sliderTitle'>{tr.title}</h5>
                            <FontAwesomeIcon onClick={() => this.openModal(tr)} icon="plus-circle" className='sliderIcon' />
                            <p className='sliderRelease'>{tr.release_date}</p>
                            <p className='sliderVote'>{tr.vote_average}</p>
                        </div>
                        <img className='sliderImg' src={`${img_url}${tr.poster_path}`} alt={tr.title} />
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

        let tmpId = this.props.videos.length > 0 ? this.props.videos[0][0].key : '';
        return (
            <div>
                <Slider {...settings}>
                    {trending}
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
        trending: state.movTv.trending,
        videos: state.movTv.videos
    }
}

export default connect(mapStateToProps, { fetchVideo })(Trending);

//poster={tr.results.poster_path} title={tr.results.title} description={tr.results.overview} release={tr.results.release_date} key={tr.results[0].id}
/*
            <div classNameName='col-sm' key={tr.results[0].id}>
                <img classNameName='sliderImg' src={tr.results[0].poster_path} alt={tr.results.title} />
                <h4 classNameName='sliderTitle'>{tr.results[0].title}</h4>
                <p classNameName='sliderDescription'>{tr.results[0].overview}</p>
            </div>



*/