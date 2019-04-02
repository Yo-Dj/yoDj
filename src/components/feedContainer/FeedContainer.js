import React from 'react'
import Activity from './activity'
import SongRequest from './songRequest'

class FeedContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let {active, requests} = this.props
    return (
      <div className="FeedContainer">
        <div className="FeedContainer__header">
          <div className="FeedContainer--title">Feed <span className={active ? 'FeedContainer--active' : ''}>></span></div>
          <div className="FeedContainer--request-num">10 reqs, 21 fans</div>
        </div>
        <div className="FeedContainer--activity-container">
          {
            requests.map((request, index) => (
              request.songRequest ? <SongRequest request={request} key={index} /> : <Activity request={request} key={index}/>
            ))
          }
        </div>
      </div>
    )
  }
}

export default FeedContainer
