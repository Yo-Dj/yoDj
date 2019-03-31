import React from 'react'

class FeedContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let {active} = this.props
    return (
      <div className="FeedContainer">
        <div className="FeedContainer__header">
          <div className="FeedContainer--title">Feed <span className={active ? 'FeedContainer--active' : ''}>></span></div>
          <div className="FeedContainer--request-num">10 reqs, 21 fans</div>
        </div>
        Hello Feed Container
      </div>
    )
  }
}

export default FeedContainer
