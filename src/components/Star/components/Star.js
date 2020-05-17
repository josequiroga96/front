import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Star extends Component {
    starSvgStyle() {
        const size = this.props.star.size ;
        return {
            width: size,
            height: size,
            transition: 'transform .2s ease-in-out',
        };
    }

    pathStyle() {
        const star = this.props.star;
        let fill;

        if (this.props.isPartiallyFullStar) fill = `url('#${this.props.fillId}')`;
        else if (this.props.starRating) fill = star.color;
        else fill = star.empty;

        return {
            fill: fill,
            transition: 'fill .2s ease-in-out',
        };
    }

    render() {
        return (
            <div className="star-container">
                <svg viewBox='0 0 51 48' className="widget-svg" style={this.starSvgStyle()}>
                    <path className="star" style={this.pathStyle()}
                        d='m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z'/>
                </svg>
            </div>
        );
    }
}

Star.propTypes = {
    fillId: PropTypes.string.isRequired,
    starRating: PropTypes.bool.isRequired,
    isPartiallyFullStar: PropTypes.bool.isRequired,
    star: PropTypes.object.isRequired
};

export default Star;