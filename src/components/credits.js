import React, { Component } from 'react';
import {connect} from 'react-redux';

import Modal from 'react-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchVideoCredits } from '../store/actions/homepageActions';

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

class SearchCredits extends Component{
    state = {
        modalIsOpen: false,
        modal: {
            media_type: '', id: '', release_date: '', first_air_date: '', vote_average: '', title: '', name: ''
        }
    }

    openModal = (modal) => {
        this.setState({ modalIsOpen: true, modal: modal});
        this.props.fetchVideoCredits(modal);
    }

    afterOpenModal = () => {
        this.subtitle.style.color = '#f00';
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false, modal: ''});
    }

    render(){

    let credits;
        if(this.props.credits.length > 0){
            credits = this.props.credits[0].cast.sort((a, b) => parseFloat(b.popularity) - parseFloat(a.popularity)).map(cr => {
            if(cr.poster_path !== null && cr.title !== null && cr.name !== null && cr.character !== '' && cr.character !== 'Himself' && cr.character !== 'Himself - Host' && cr.character !== 'Narrator' && cr.character !== '' && cr.character !== 'Himself - Narrator' && ( cr.media_type=== 'tv' ? cr.name.length < 20 : cr.title.length < 20 ) && cr.vote_average > 5) {
                return (
                    <div className='-col-md-4 credit-box' key={cr.media_type === 'tv' ? cr.credit_id : cr.id}>
                        <div className='credit-block'>
                            <h5 className='search-title'>{`${cr.media_type === 'tv' ? cr.name : cr.title}`}</h5>
                            <p className='search-release'>{`${cr.media_type === 'tv' ? cr.first_air_date : cr.release_date}`}</p>
                            <p className='search-vote'>{cr.vote_average}</p>
                        </div>
                        <FontAwesomeIcon onClick={() => this.openModal(cr)} icon="plus-circle" className='CreditIcon' />
                        <div className='credit-modal'>
                            <img className='search-image' id='credit-image' src={`${img_url}${cr.poster_path}`} alt={cr.title} />
                        </div>
                    </div>
               )}
        })
        }

        let tmpId = (this.props.videos.length > 0 && this.props.videos[0].length > 0) ? this.props.videos[0][0].key : [];

        return (
            <div>
                <div className='row'>
                    {credits}
                </div>
                <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel='Credits modal'
                >
                <h2 ref={subtitle => this.subtitle = subtitle}>{this.state.modal.media_type === 'tv' ? this.state.modal.name : this.state.modal.title}</h2>
                    <div>
                    <p>Id: {this.state.modal.id}</p>
                    <h5 className='modalRelease'>Released: {this.state.modal.media_type === 'tv' ? this.state.modal.first_air_date : this.state.modal.release_date}</h5>
                    <h5 className='modalVote'>Rating: {this.state.modal.vote_average}</h5>
                    {tmpId.length > 0 ? <iframe width="560" height="315" src={`https://www.youtube.com/embed/${tmpId}`} frameBorder="0" title='youtube' allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className='videoFrame'></iframe> : <p className='loading'>No video was found...</p>}
                    </div>
                <button className='modalClose' onClick={this.closeModal}>X</button>
                </Modal>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        credits: state.movTv.credits,
        videos: state.movTv.creditVid
    }
}

export default connect(mapStateToProps, { fetchVideoCredits })(SearchCredits);