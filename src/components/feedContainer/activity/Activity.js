import React from 'react'

class Activity extends React.Component {
  render() {
    let {request} = this.props
    return (
      <div className="Activity">
          <div className="Activity__profile" style={{backgroundImage: `url(${request.img})`}}/>
        <div className="Activity__description">
          {`${request.name} ${request.message}`}
        </div>
      </div>
    )
  }
}

export default Activity
