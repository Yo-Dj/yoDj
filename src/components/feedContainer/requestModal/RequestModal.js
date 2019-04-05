import React from 'react'
import Button from '@material-ui/core/Button'

class RequestModal extends React.Component {
    constructor(props) {
        super(props)
        this.requestWrap = React.createRef()
        this.handleClickOutside = this.handleClickOutside.bind(this)
        this.buttonClicked = this.buttonClicked.bind(this)
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside)
      }

      componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside)
      }

      handleClickOutside(event) {
        if (this.requestWrap.current && !this.requestWrap.current.contains(event.target) && this.props.isVisible) {
          this.props.onClose()
        }
      }

      buttonClicked(answer) {
        let {onAccept, request} = this.props
        if (answer === 'Yes') {
          onAccept(request)
        }
      }

    render() {
        let {isVisible, message} = this.props
        return (
            <div className={`RequestModal${isVisible ? ' RequestModal--visible' : ''}`}>
                <div className="RequestModal__container" ref={this.requestWrap}>
                  <div className="RequestModal--text">{message}</div>
                  <div className="RequestModal--action-buttons">
                    <Button variant="contained" color="primary" classes={{root: 'RequestModal--button'}} onClick={() => this.buttonClicked('No')}>
                      No
                    </Button>
                    <div className="RequestModal--right-button">
                    <Button variant="contained" color="primary" classes={{root: 'RequestModal--button'}} onClick={() => this.buttonClicked('Yes')}>
                      Yes
                    </Button>
                    </div>
                  </div>
                </div>
            </div>
        )
    }
}

export default RequestModal
