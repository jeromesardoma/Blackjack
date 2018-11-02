import React, { Component } from 'react'; 
import './player.css';

class Player extends Component {
	constructor( props ) {
		super( props );
		
	}

	render () {
        const {
            hand,
            gameOver,
            type,
            score
        } = this.props;
		const cards = hand.map( (card, index ) => {
			if( gameOver === true && type === 'dealer' ) {
				return(
                    <img
                        src={ card.image }
                        alt={ card.code } 
                        key={ card.code }
                        style={{ "height": 150 }}></img>
				)
			} else {
				return(
                    <img 
                    src={ ( index === 0 && type === 'dealer' ) ? 'facedowncardv2.png' : card.image } 
                    alt={ card.code } 
                    key={ card.code }
                    style={{ "height": 150 }}></img>
				)
			}
		});			
		return(
			<div className="player" >
                <div>
                    <h3>{ type.substr(0,1).toUpperCase() + type.substr(1) }</h3>
                </div>
                <div>
                    <section style={{ 
                        "display": "flex", 
                        "alignItems": "center",
                        "justifyContent": "space-between" 
                        }}>
                        <div>
                            { cards }
                        </div>
                        { gameOver === false ? null : 
                            <div style={{ "width": 100 }}>
                                <h6>Score</h6>
                                <div style={{ "fontSize": 72 }}>{ score }</div>
                            </div>
                        }
                    </section>
                </div>
			</div>
		)
	};
	
}

export default Player; 
