import React from 'react'
import {StripeProvider, Elements, injectStripe} from 'react-stripe-elements'
import Button from '@material-ui/core/Button'
import Header from '../header'
import CardFormComponent from './CardForm'
import PaymentIcon from 'react-payment-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import axios from 'axios'

export const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
        padding,
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
}
class BankComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userCard: {}
    }
    this.submitCard = this.submitCard.bind(this)
    this.getCard = this.getCard.bind(this)
  }

  componentDidMount() {
    console.log('USER PROPS ----> ', this.props)
    let {userInfo} = this.props
    if (userInfo.card && userInfo.card !== '') {
      axios.get('http://localhost:8080/card', {params: {cardId: userInfo.card}})
      .then(res => {
        console.log('RES ------> ', res)
        this.setState({
          userCard: res.data
        })
      })
      .catch(e => console.log('E ---> ', e))
    }
  }

  submitCard(token = {}) {
    let {userInfo, onCardAdd} = this.props
    axios.post('http://localhost:8080/save', {userInfo, token})
      .then(res => {
        console.log('Responst ---> ', res)
        if (res.data) {
          console.log('Card Tokens ---> ', res.data)
          onCardAdd(res.data.id)
        }
      })
      .catch(e => console.log('Bank Component error ---> ', e))
  }

  getCard() {
    console.log("STATE ----> ", this.state)
    axios.get('http://localhost:8080/card', {params: {cardId: this.state.userCard.id}})
      .then(res => {
        console.log('RES ------> ', res)
      })
      .catch(e => console.log('E ---> ', e))
  }

  render() {
    let {userInfo} = this.props
    let {userCard} = this.state
    let card = {}
    const CardForm = injectStripe(CardFormComponent)
    let active = false
    let boxShadowColor = active ? '#08FF00' : 'yellow'
    let boxShadow = `1px 2px 4px 1px ${boxShadowColor} inset, 1px 1px 4px 3px ${boxShadowColor}`
    let cardExist = userCard.sources !== undefined
    if (cardExist) {
      card.type = userCard.sources.data[0].brand 
      card.last4 = userCard.sources.data[0].last4
      card.exp_year = userCard.sources.data[0].exp_year
      card.exp_month = userCard.sources.data[0].exp_month
      card.name = userCard.sources.data[0].name
      console.log('Card ---> ', card)
    }
    return (
      <div className="BankComponent">
        <Header imageUrl={userInfo.imageUrl} iconClick={() => {}} isActive={false} onClick={() => {}}/>
        <StripeProvider apiKey="pk_test_ZEn0Cz3VCvWRZSMR6AZpB32C0045ge11LF">
          <Elements>
            <CardForm userInfo={userInfo} onSubmit={this.submitCard}/>
          </Elements>
        </StripeProvider>
        <div className="BankComponent__existing-container">
          <div className="BankComponent--border" style={{boxShadow: boxShadow, backgroundColor: boxShadowColor}}/>
          <div className="BankComponent--existing-card">
            <h2>Existing Card accounts</h2>
            {
              !cardExist
              ? <div>None ...</div>
              : <div className="BankComponent--card-box">
                  <div className="BankComponent--dollar-icon">
                    <FontAwesomeIcon icon="dollar-sign" />
                  </div>
                  <PaymentIcon
                    id={card.type.toLowerCase()}
                    style={{ margin: 5, width: 50 }}
                    className="payment-icon"
                  />
                  <div className="BankComponent--card-num">{card.last4}</div>
                </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default BankComponent