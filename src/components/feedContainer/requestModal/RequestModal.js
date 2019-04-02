import React from 'react'

class RequestModal extends React.Component {
    constructor(props) {
        super(props)
        this.requestWrap = React.createRef()
        this.handleClickOutside = this.handleClickOutside.bind(this)
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

    render() {
        let {isVisible, message} = this.props
        return (
            <div className={`RequestModal${isVisible ? ' RequestModal--visible' : ''}`}>
                <div className="RequestModal__container" ref={this.requestWrap}>
                    {message}
                </div>
            </div>
        )
    }
}

export default RequestModal