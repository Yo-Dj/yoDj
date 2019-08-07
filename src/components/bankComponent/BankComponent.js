import React from 'react'
import {StripeProvider, Elements, injectStripe} from 'react-stripe-elements'
import Header from '../header'
import CardFormComponent from './CardForm'
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
    this.submitCard = this.submitCard.bind(this)
  }

  submitCard(token) {
    let {userInfo} = this.props
    console.log('Post request')
    axios.post('http://localhost:8080/save', {userInfo, token})
      .then(res => {
        console.log('Responst ---> ', res)
      })
      .catch(e => console.log('Bank Component error ---> ', e))
  }

  render() {
    let {userInfo} = this.props
    const CardForm = injectStripe(CardFormComponent)
    return (
      <div className="BankComponent">
        <Header imageUrl={userInfo.imageUrl} iconClick={() => {}} isActive={false} onClick={() => {}}/>
        Hello from Bank Component
        <StripeProvider apiKey="pk_test_ZEn0Cz3VCvWRZSMR6AZpB32C0045ge11LF">
          <Elements>
            <CardForm userInfo={userInfo} onSubmit={this.submitCard}/>
          </Elements>
        </StripeProvider>
      </div>
    )
  }
}

export default BankComponent