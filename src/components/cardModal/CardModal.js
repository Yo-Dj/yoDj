import React from 'react'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'

class CardModal extends React.Component {
  constructor(props) {
    super(props)
    this.closeModal = this.closeModal.bind(this)
    this.addCard = this.addCard.bind(this)
  }

  closeModal() {
    this.props.onCloseModal()
  }
  
  addCard() {
    console.log('Add Card ---> ')
    this.props.onOpenCardInfo()
  }

  render() {
    let {isVisible} = this.props
    return (
      <div className={`CardModal${isVisible ? ' CardModal--visible' : ''}`}>
        <div className="CardModal--close-icon" onClick={this.closeModal}>
          <Icon onClick ={this.closeModal}>close</Icon>
        </div>
        <div className="CardModal__container">
          Please add your card to process requests.
        <div className="CardModal--actions">
          <Button variant="contained" color="primary" classes={{root: 'RequestModal--button'}} 
            onClick={this.addCard}>
              Continue
          </Button>
        </div>
        </div>
      </div>
    )
  }
}

export default CardModal