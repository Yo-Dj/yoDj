import React from 'react'
import Activity from './activity'
import SongRequest from './songRequest'
import RequestModal from './requestModal'

class FeedContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRequest: {}
    }
    this.handleRequest = this.handleRequest.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleRequest(type, selectedRequest) {
    this.setState({
      selectedRequest
    })
    this.props.onRequestOpen(true, type)
  }

  handleClose() {
    this.props.onRequestOpen(false)
  }

  render() {
    let {active, requests, requestMessage, openRequestModal, onAccept} = this.props
    let {selectedRequest} = this.state
    return (
      <div className="FeedContainer">
        <RequestModal
          isVisible={openRequestModal}
          message={requestMessage}
          onClose={this.handleClose}
          onAccept={onAccept}
          request={selectedRequest}
        />
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
