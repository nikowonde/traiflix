import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from 'react-modal';

import { fetchPersonInfo, fetchPersonCredits, fetchVideoCredits } from '../store/actions/homepageActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SearchCredits from './credits';

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

class SearchPage extends Component {
    
    state = {
        personId: '',
        maxLength: 500,
        read: 'Read More',
        modalIsOpen: false,
        modal: {
            media_type: '', id: '', release_date: '', first_air_date: '', vote_average: '', title: '', name: ''
        }
    }

    componentDidUpdate = () => {
        if(this.props.results.length > 0 && this.props.results[0].results[0] !== undefined && this.state.personId !== this.props.results[0].results[0].id){
            if(this.props.results[0].results[0].media_type === 'person'){
                this.setState({personId: this.props.results[0].results[0].id, read: 'Read More', maxLength: 500}, this.props.fetchPersonInfo(this.props.results[0].results[0].id), this.props.fetchPersonCredits(this.props.results[0].results[0].id));
                this.forceUpdate(console.log('force update'));
            } else if(this.props.results.length > 0 && this.props.results[0].results[1] !== undefined && this.state.personId !== this.props.results[0].results[1].id){
            if(this.props.results[0].results[1].media_type === 'person' && this.props.results[0].results[1].popularity > 2){
                this.setState({personId: this.props.results[0].results[1].id, read: 'Read More', maxLength: 500}, this.props.fetchPersonInfo(this.props.results[0].results[1].id), this.props.fetchPersonCredits(this.props.results[0].results[1].id));
                this.forceUpdate(console.log('force update 2'));
            } } else if(this.props.results.length > 0 && this.props.results[0].results[2] !== undefined && this.state.personId !== this.props.results[0].results[2].id){
            if(this.props.results[0].results[2] !== undefined && this.props.results[0].results[2].media_type === 'person' && this.props.results[0].results[2].popularity > 3){
                this.setState({personId: this.props.results[0].results[2].id, read: 'Read More', maxLength: 500}, this.props.fetchPersonInfo(this.props.results[0].results[2].id), this.props.fetchPersonCredits(this.props.results[0].results[2].id));
                this.forceUpdate(console.log('force update 3'));
            } }
        }
    }

    readMore = () => {
        this.setState({maxLength: 10000, read: ''});
    }

    failure = () => {
        return (
            <div className='.col-md-8 search-container'>
                <div className='person-results failure'>
                    <p className='person-error'>{`Search failed, please try again`}</p>
                </div>
            </div>
        )
    }

    openModal = (modal) => {
        this.setState({ modalIsOpen: true, modal: modal})
        this.props.fetchVideoCredits(modal);
    }

    afterOpenModal = () => {
        this.subtitle.style.color = '#f00';
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false, modal: ''});
    }
    

    render(){
    //console.log(this.state.personId)
    let results;
    let person_results;
    let person;
            if(this.props.results[0] === undefined){
                return this.failure(console.log('Search Error 1'));
            } if (this.props.results[0].results[0] === undefined ){
                return this.failure(console.log('Search Error 2'));
            }if(this.props.results[0].results[1] === undefined && this.props.results[0].results[0] === undefined) {
                return this.failure(console.log('Search Error 3'));
            } /*else if(this.props.results[0].results[1].media_type === 'person' && this.props.results[0].results[1].popularity < 2 ){
                return this.failure();
            }*/if (this.props.results[0].results[2] === undefined && this.props.results[0].results[1] === undefined && this.props.results[0].results[0] === undefined){
                return this.failure(console.log('Search Error 4'));
            }if (this.props.results[0].results[2] !== undefined && this.props.results[0].results[2].media_type === 'person' && this.props.results[0].results[0].popularity < 2 && this.props.results[0].results[2].popularity < 2){
                return this.failure(console.log('Search Error 5'));
            }
        if(this.props.results.length > 0 && this.props.results[0].results[0] !== undefined && this.props.results[0].results[0].media_type !== 'person' && this.props.results[0].results[1].media_type !== 'person' && this.props.results[0].results[2].media_type !== 'person'){
            results = this.props.results[0].results.sort((a, b) => parseFloat(b.popularity) - parseFloat(a.popularity)).map(rs => {
                if(rs.media_type === 'movie' && rs.poster_path !== null){
                    return (
                        <div className='.col-md-4 search-container' key={rs.id}>
                            <div className='search-results'>
                                <div className='credit-block'>
                                    <h5 className='search-title'>{rs.media_type === 'movie' ? rs.title : rs.name}</h5>
                                    <p className='search-release'>{`Released: ${rs.media_type === 'movie' ? rs.release_date: rs.first_air_date}`}</p>
                                    <p className='search-vote'>{`Rating: ${rs.vote_average}`}</p>
                                </div>
                                <FontAwesomeIcon onClick={() => this.openModal(rs)} icon="plus-circle" className='SearchIcon' />
                                <div className='credit-modal'>
                                    <img className='search-image' src={`${img_url}${rs.poster_path}`} alt={rs.media_type === 'movie' ? rs.title : rs.name} />
                                </div>
                            </div>
                        </div>
                    )}
                if (rs.poster_path === '' || rs.backdrop_path === '' || rs.media_type === 'person'){
                        return (<div key={rs.id}>{null}</div>);}
            } 
            )
        }
            if (this.props.results.length > 0 ){
                if(this.props.results[0].results[0] !== undefined || this.props.results[0].results[1] !== undefined || this.props.results[0].results[2] !== undefined){
                if (this.props.results[0].results[0].media_type === 'person' || this.props.results[0].results[1].media_type === 'person' || this.props.results[0].results[2].media_type === 'person'){
                    //onsole.log(this.props.results[0]);
                    person_results = this.props.results[0].results.map(pr => {
                    if(pr.profile_path !== null && pr.backdrop_path !== null && pr.media_type === 'person' && pr.popularity >= 3){
                    return (
                        <div className='.col-md-4 search-container' key={pr.id}>
                                <div className='search-results-person'>
                                    <h5 className='search-title'>{pr.name}</h5>
                                    <img className='search-image' src={`${img_url}${pr.profile_path}`} alt={pr.name} />
                                </div>
                        </div>
                    )
                }
                }
                )
            } 
            } else {
                    return <div className='loading'>Loading...</div>
                }
            }

        if (this.props.person.length > 0){
            person = this.props.person.map(person => {
                if(person.popularity >= 2){
                return (
                    <div className='.col-md-8 search-container' key={person.id}>
                        <div className='person-results'>
                            <p className='person-bio'>{person.biography.length > 500 ? person.biography.substr(0, this.state.maxLength) : person.biography}</p>
                            {person.biography.length > 520 ? <p className='readmore' onClick={() => {this.readMore()}}>{this.state.read}</p> : ''}
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className='.col-md-8 search-container'>
                        <div className='person-results'>
                            <p className='person-error'>{`Sorry could not find that`}</p>
                        </div>
                    </div>
                )
            }
            })
        }

        let tmpId = (this.props.videos.length > 0 && this.props.videos[0].length > 0) ? this.props.videos[0][0].key : [];

            return (
                <div className='container-fluid'>
                        <div className='row'>
                                {(this.props.results.length > 0 && this.props.results[0].results[0].media_type !== 'person')? results : person_results}
                                {(this.props.results.length > 0 && this.props.results[1] !== undefined && this.props.results[0].results[1].media_type === 'person')? person_results : ''}
                                {(this.props.results.length > 0 && this.props.results[2] !== undefined && this.props.results[0].results[2].media_type === 'person')? person_results : ''}
                                {(this.props.results.length > 0 && this.props.results[0].results[0].media_type !== 'person') ? null : person}
                                {(this.props.results.length > 0 && this.props.results[1] !== undefined && this.props.results[0].results[1].media_type === 'person')? person : ''}
                                {(this.props.results.length > 0 && this.props.results[2] !== undefined && this.props.results[0].results[2].media_type === 'person')? person : ''}
                        </div>
                                {(this.props.results.length > 0 && this.props.results[0].results[0].media_type === 'person') ? <SearchCredits /> : null}
                                {(this.props.results.length > 0 && this.props.results[1] !== undefined && this.props.results[0].results[1].media_type === 'person') ? <SearchCredits /> : ''}
                                {(this.props.results.length > 0 && this.props.results[2] !== undefined && this.props.results[0].results[2].media_type === 'person' )? <SearchCredits /> : ''}
                                <Modal
                                isOpen={this.state.modalIsOpen}
                                onAfterOpen={this.afterOpenModal}
                                onRequestClose={this.closeModal}
                                style={customStyles}
                                contentLabel='Search modal'
                                >
                                <h2 ref={subtitle => this.subtitle = subtitle}>{this.state.modal.media_type === 'tv' ? this.state.modal.name : this.state.modal.title}</h2>
                                    <div>
                                    <p>Id: {this.state.modal.id}</p>
                                    <h5 className='modalRelease'>Released: {this.state.modal.media_type === 'tv' ? this.state.modal.first_air_date : this.state.modal.release_date}</h5>
                                    <h5 className='modalVote'>Rating: {this.state.modal.vote_average}</h5>
                                    {tmpId.length > 0 ? <iframe width="560" height="315" src={`https://www.youtube.com/embed/${tmpId}`} frameBorder="0" title='youtube' allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> : <p className='no-video'>No video was found...</p>}
                                    </div>
                                <button className='modalClose' onClick={this.closeModal}>X</button>
                                </Modal>
                </div>
            )
        }
    }

const mapStateToProps = (state) => {
    return {
        results: state.movTv.results,
        person: state.movTv.personInfo,
        videos: state.movTv.creditVid
    }
}

export default connect(mapStateToProps, { fetchPersonInfo, fetchPersonCredits, fetchVideoCredits })(SearchPage);