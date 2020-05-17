import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Star from './Star';
import './styles/startRating.css'

class StarRatings extends Component {
    fillId = `starGrad${Math.random().toFixed(15).slice(2)}`;

    porcent() {
        return this.props.rating.toFixed(2).split('.')[1].slice(0, 2);
    }

    renderStars() {
        const { rating, star } = this.props;
        let array = [];

        for (let i = 0; i < 5; i++) {
            const index = i + 1;
            const starRating = index <= rating;
            const isPartiallyFullStar = index > rating && index - 1 < rating;

            array.push(
                <Star
                    key={index}
                    fillId={this.fillId}
                    starRating={starRating}
                    isPartiallyFullStar={isPartiallyFullStar}
                    star={star}
                />
            );
        }

        return array;
    }

    render() {
        const star = this.props.star;

        return (
            <div className="star-ratings">
                <svg className="star-grad">
                    <defs>
                        <linearGradient id={this.fillId} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" className="stop-color" style={{stopColor: star.color}} />
                            <stop offset={this.porcent()+'%'} className="stop-color" style={{stopColor: star.color}} />
                            <stop offset={this.porcent()+'%'} className="stop-color" style={{stopColor: star.empty}} />
                            <stop offset="100%" className="stop-color" style={{stopColor: star.empty}} />
                        </linearGradient>
                    </defs>
                </svg>
                {this.renderStars()}
            </div>
        );
    }
}

StarRatings.propTypes = {
    rating: PropTypes.number.isRequired,
    star: PropTypes.object.isRequired
};

StarRatings.defaultProps = {
    rating: 0,
    star: {
        color: 'blue',
        empty: 'rgb(212, 212, 212)',
        size: '25px'
    }
};

export default StarRatings;