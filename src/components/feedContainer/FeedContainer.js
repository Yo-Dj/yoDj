import React from 'react'
import Activity from './activity'
import SongRequest from './songRequest'
import RequestModal from './requestModal'

class FeedContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      message: ''
    }
    this.handleRequest = this.handleRequest.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleRequest(type) {
    let message = (type === 'accept') 
      ? 'Are you sure you want to accept this req?'
      : 'Are you sure you want to reject this req?'
    this.setState({
      message,
      isOpen: true
    })
  }
  
  handleClose() {
    this.setState({
      message: '',
      isOpen: false
    })
  }

  render() {
    let {active, requests} = this.props
    let {isOpen, message} = this.state
    return (
      <div className="FeedContainer">
        <RequestModal isVisible={isOpen} message={message} onClose={this.handleClose}/>
        <div className="FeedContainer__header">
          <div className="FeedContainer--title">Feed <span className={active ? 'FeedContainer--active' : ''}>></span></div>
          <div className="FeedContainer--request-num">10 reqs, 21 fans</div>
        </div>
        <div className="FeedContainer--activity-container">
          {
            requests.map((request, index) => (
              request.songRequest ? <SongRequest request={request} key={index} onRequest={this.handleRequest}/> : <Activity request={request} key={index}/>
            ))
          }
        </div>
      </div>
    )
  }
}

export default FeedContainer
