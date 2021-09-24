import React, { Component } from 'react'
import Card from './Card.js'
import axios from 'axios'
import './Container.css'


class Container extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            deckID: '',
            remainingCards: '',
            deck: []
         }
    }
    async componentDidMount() {
        const url = 'https://www.deckofcardsapi.com/api/deck/new/shuffle';
        const response = await axios.get(url);
        const data = await response.data;
        this.setState({deckID: data.deck_id, remainingCards: data.remaining});
    }
    getCard = async (e) => {
        if(this.state.remainingCards === 0){
            return
        }
        const url = `https://www.deckofcardsapi.com/api/deck/${this.state.deckID}/draw/?count=1`;
        const response = await axios.get(url);
        const data = await response.data;
        const card = await data.cards[0];
        const remainingCards = await data.remaining;
        this.setState((st) => {
            st.deck = [...st.deck, 
                {image: card.image, code: card.code, card: `${card.value} of ${card.suit}`}]
            st.remainingCards = remainingCards
            return {deck: st.deck, remainingCards: st.remainingCards}
        })
    }
    render() { 
        const cards = this.state.deck.map((el, i) => 
            <Card cardImage={el.image} key={el.code} card={el.card} />)
        return ( 
            <div>
                <h1>Card Dealer</h1>
                <div>Your deck has {this.state.remainingCards} cards remaining.</div>
                {this.state.remainingCards === 0 ? null : 
                <button onClick={this.getCard}>Gimme a card!</button>}
                <div className="Container-cards">
                    {cards}
                </div>
            </div>
         );
    }
}
 
export default Container;