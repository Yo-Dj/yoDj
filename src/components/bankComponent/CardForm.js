import React from 'react'
import {CardElement} from 'react-stripe-elements'
import Button from '@material-ui/core/Button'
import {createOptions} from './BankComponent'
import './bankComponent.less'

class CardFormComponent extends React.Component {
  constructor(props) {
    super(props)  
    this.submitCard = this.submitCard.bind(this)
    this.onReady = this.onReady.bind(this)
    
  }

  async submitCard(e) {
    let {userInfo: {username}, onSubmit} = this.props
    console.log('USERNAMe ---> ', username)
    let {token} = await this.props.stripe.createToken({name: username})
    console.log('Token ----> ', token)
    onSubmit(token)
  }

  onReady(e) {
    console.log('onReady ----> ', e)
  }

  render() {
    return (
      <form>
        <div className="BankComponent--card-form">
          <CardElement
            {...createOptions(18)}
          />
        </div>
        <div className="BankComponent--add-button">
          <Button variant="contained" color="primary" classes={{root: 'BankComponent--save'}} onClick={this.submitCard}>Add Card</Button>
        </div>
      </form>
    )
  }
}

export default CardFormComponent