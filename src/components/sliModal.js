import React from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

import { fetchVideo } from '../store/actions/moviesAndTvActions';

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

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

class SliModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(movieId) {
    this.setState({modalIsOpen: true});
    this.props.fetchVideo(movieId);
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  render() {
    let movieId = this.props.toModal.id;
    let tmpId = (this.props.videos.length > 0)?this.props.videos[0][0].key: '';
    return (
      <div>
        <FontAwesomeIcon onClick={() => this.openModal(movieId)} icon="plus-circle" className='sliderIcon' />
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={subtitle => this.subtitle = subtitle}>{this.props.toModal.title}</h2>
          <div>
              <p>Id: {this.props.toModal.id}</p>
              <h5 className='modalRelease'>Released: {this.props.toModal.release_date}</h5>
              <h5 className='modalVote'>Rating: {this.props.toModal.vote_average}</h5>
              {tmpId.length >0 ?<iframe width="560" height="315" src={`https://www.youtube.com/embed/${tmpId}`} frameborder="0" title='youtube' allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> : <p className='loading'>Loading...</p>}
          </div>
          <button className='modalClose' onClick={this.closeModal}>X</button>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    videos: state.movTv.videos
  }
}

export default connect(mapStateToProps, { fetchVideo })(SliModal);

//<p className='modalDescription'>{this.props.trending.overview}</p>