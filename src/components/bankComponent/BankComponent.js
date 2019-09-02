import React from 'react'
import {StripeProvider, Elements, injectStripe} from 'react-stripe-elements'
import {withRouter} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Header from '../header'
import CardFormComponent from './CardForm'
import PaymentIcon from 'react-payment-icons'
import Icon from '@material-ui/core/Icon'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import axios from 'axios'

// const stripe = Stripe('pk_test_ZEn0Cz3VCvWRZSMR6AZpB32C0045ge11LF')
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
  }
}
class BankComponent extends React.Component {
  constructor(props) {
    super(props)
    this.wrapper = React.createRef()
    this.state = {
      userCard: {}
    }
    this.submitCard = this.submitCard.bind(this)
    this.getCard = this.getCard.bind(this)
    this.goBack = this.goBack.bind(this)
  }

 componentDidMount() {
    let {userInfo} = this.props
    if (userInfo.card && userInfo.card !== '') {
      axios.get('/card', {params: {cardId: userInfo.card}})
      .then(res => {
        console.log('RES ------> ', res)
        this.setState({
          userCard: res.data
        })
      })
      .catch(e => console.log('E ---> ', e))
    }
    // const paymentRequest = stripe.paymentRequest({
    //   country: 'US',
    //   currency: 'usd',
    //   total: {
    //     label: 'Demo total',
    //     amount: 1000,
    //   },
    //   requestPayerName: true,
    //   requestPayerEmail: true,
    // })
    // console.log('Stripe ----> ', stripe)
    // const elements = stripe.elements()
    // console.log('Elements ---> ', elements)
    // const prButton = elements.create('paymentRequestButton', {
    //   paymentRequest,
    // })
    // console.log('PR Button ----> ', prButton)

    // // ( async () => {
    //   const result = await paymentRequest.canMakePayment()

    //   this.wrapper.appendChild(prButton)
    //   console.log('Result ---> ', result)
    // }

    // )()
    // (async () => {
    //   // Check the availability of the Payment Request API first.
    //   const result = await paymentRequest.canMakePayment();
    //   if (result) {
    //     console.log('RESULTAT ----> ', result)
    //     // prButton.mount('#payment-request-button');
    //   } else {
    //     document.getElementById('payment-request-button').style.display = 'none';
    //   }
    // })()
    // stripe.applePay.checkAvailability(function(available) {
    //     console.log('Available ---> ', available)
    //   })
    }

  componentDidUpdate(prevProps) {
    let {userInfo} = this.props
    if ((!prevProps.userInfo.card && userInfo.card) || (prevProps.userInfo.card !== userInfo.card)) {
      axios.get('/card', {params: {cardId: userInfo.card}})
      .then(res => {
        this.setState({
          userCard: res.data
        })
      })
      .catch(e => console.log('E ---> ', e))
    }
  }

  goBack() {
    this.props.history.push('/profile')
  }

  submitCard(token = {}) {
    let {userInfo, onCardAdd} = this.props
    if (!userInfo.card && userInfo.card !== '') {
      axios.post('https:localhost:8080/save', {userInfo, token})
        .then(res => {
          if (res.data) {
            console.log('Card ADDED ----> ', res.data)
            onCardAdd(res.data.id)
            this.props.history('/bank')
          }
        })
        .catch(e => console.log('Bank Component error ---> ', e))
    } else {
      axios.post('https:localhost:8080/upgrade-card', {userId: userInfo.card, token})
        .then(res => {
          console.log('UPGRADED CARD ----> ', res)
          if (res.data) {
            console.log('CARD ----> ', res.data)
            this.props.history('/bank')
          }
        })
        .catch(e => console.log('CARD ERR ---> ', e))
    }
  }

  getCard() {
    axios.get('https:localhost:8080/card', {params: {cardId: this.state.userCard.id}})
      .then(res => {
        console.log('RES ------> ', res)
      })
      .catch(e => console.log('E ---> ', e))
  }

  render() {
    let {userInfo} = this.props
    let {userCard} = this.state
    let card = {}
    // const CardForm = injectStripe(CardFormComponent)
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
    }
    console.log('USER CARD ---> ', userCard)
    return (
      <div className="BankComponent">
        <Header imageUrl={userInfo.imageUrl} iconClick={() => {}} isActive={false} onClick={() => {}}/>
        <div className="BankComponent__subheader">
          <Icon onClick ={this.goBack}>close</Icon>
          <div className="BankComponent--subtitle">Bank Info</div>
       </div>
        <StripeProvider apiKey="pk_test_ZEn0Cz3VCvWRZSMR6AZpB32C0045ge11LF">
          <Elements>
          <CardFormComponent userInfo={userInfo} onSubmit={this.submitCard} update={userCard.card === undefined}/>
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

export default withRouter(BankComponent)
