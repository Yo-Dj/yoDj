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
    this.forwardToFeed = this.forwardToFeed.bind(this)
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

  forwardToFeed() {
    this.props.onForward()
  }

  render() {
    let {active, requests, requestMessage, openRequestModal, onAccept} = this.props
    let {selectedRequest} = this.state
    requests = active ? requests : []
    let requestNum = requests.reduce((acc,el) => acc +  (el.songRequest), 0)
    let fanNum = requests.reduce((acc, el) => ({...acc, [el.name]: true}), {})
    fanNum = Object.keys(fanNum).length
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
          <div className="FeedContainer--title" onClick={this.forwardToFeed}>Feed <span className={active ? 'FeedContainer--active' : ''}>></span></div>
          <div className="FeedContainer--request-num">{requestNum} reqs, {fanNum} fans</div>
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
