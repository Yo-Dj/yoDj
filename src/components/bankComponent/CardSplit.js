import React from 'react'
// import {CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement} from 'react-stripe-elements'
import 
  {CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement} from 'react-stripe-elements'
import {createOptions} from './BankComponent'
import './bankComponent.less'

class CardSplit extends React.Component {
  constructor(props) {
    super(props)
    this.submitCard = this.submitCard.bind(this)
  }

  submitCard() {
    console.log('Submit Card')
  }


  render() {
    return (
      <form onSubmit={this.submitCard}>
        <label>
          Card number
          <CardNumberElement 
            {...createOptions(18)}
          />
        </label>
        <label>
          Expiration date
          <CardExpiryElement 
            {...createOptions(18)}
          />
          </label>
          {/*
          <label>
            CVC
            <CardCVCElement
              {...createOptions(18)}
            />
        </label>
        <label>
          Postal code
          <PostalCodeElement
            {...createOptions(18)}
          />
        </label> */}
      </form>
    )
  }
}

export default CardSplit