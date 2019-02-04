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
                            <h3 className='introTitle'>{props.tr.results[0].name}</h3>
                            <p className='introDescription'>{props.tr.results[0].overview}</p>
                            <h5 className='introRating'>{`Rating: ${props.tr.results[0].vote_average}`}</h5>
                            <h5 className='introRelease'>{`Released: ${props.tr.results[0].first_air_date}`}</h5>
                        </div>
                        <img className="d-block w-100 carousel-img" src={`${img_url}${props.tr.results[0].backdrop_path}`} alt="First slide" />
                    </div>
                    <div className="carousel-item">
                        <div className='introText'>
                            <h3 className='introTitle'>{props.tr.results[1].name}</h3>
                            <p className='introDescription'>{props.tr.results[1].overview}</p>
                            <h5 className='introRating'>{`Rating: ${props.tr.results[1].vote_average}`}</h5>
                            <h5 className='introRelease'>{`Released: ${props.tr.results[1].first_air_date}`}</h5>
                        </div>
                        <img className="d-block w-100" src={`${img_url}${props.tr.results[1].backdrop_path}`} alt="Second slide" />
                    </div>
                    <div className="carousel-item">
                        <div className='introText'>
                            <h3 className='introTitle'>{props.tr.results[2].name}</h3>
                            <p className='introDescription'>{props.tr.results[2].overview}</p>
                            <h5 className='introRating'>{`Rating: ${props.tr.results[2].vote_average}`}</h5>
                            <h5 className='introRelease'>{`Released: ${props.tr.results[2].first_air_date}`}</h5>
                        </div>
                        <img className="d-block w-100" src={`${img_url}${props.tr.results[2].backdrop_path}`} alt="Third slide" />
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