import React from 'react';

const img_url = 'https://image.tmdb.org/t/p/original';

const Carousel = (props) => {
    //console.log(props.ac)
    return (
        <div>
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel" data-interval='3500'>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className='introText'>
                            <h3 className='introTitle'>{props.ac.results[0].title}</h3>
                            <p className='introDescription'>{props.ac.results[0].overview}</p>
                            <h5 className='introRating'>{`Rating: ${props.ac.results[0].vote_average}`}</h5>
                            <h5 className='introRelease'>{`Released: ${props.ac.results[0].release_date}`}</h5>
                        </div>
                        <img className="d-block w-100 carousel-img" src={`${img_url}${props.ac.results[0].backdrop_path}`} alt="First slide" />
                    </div>
                    <div className="carousel-item">
                        <div className='introText'>
                            <h3 className='introTitle'>{props.ac.results[1].title}</h3>
                            <p className='introDescription'>{props.ac.results[1].overview}</p>
                            <h5 className='introRating'>{`Rating: ${props.ac.results[1].vote_average}`}</h5>
                            <h5 className='introRelease'>{`Released: ${props.ac.results[1].release_date}`}</h5>
                        </div>
                        <img className="d-block w-100" src={`${img_url}${props.ac.results[1].backdrop_path}`} alt="Second slide" />
                    </div>
                    <div className="carousel-item">
                        <div className='introText'>
                            <h3 className='introTitle'>{props.ac.results[2].title}</h3>
                            <p className='introDescription'>{props.ac.results[2].overview}</p>
                            <h5 className='introRating'>{`Rating: ${props.ac.results[2].vote_average}`}</h5>
                            <h5 className='introRelease'>{`Released: ${props.ac.results[2].release_date}`}</h5>
                        </div>
                        <img className="d-block w-100" src={`${img_url}${props.ac.results[2].backdrop_path}`} alt="Third slide" />
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
    )
}

export default Carousel;