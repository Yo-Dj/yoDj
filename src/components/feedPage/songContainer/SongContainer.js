import React from 'react'
import Fab from '@material-ui/core/Fab'
import Icon from '@material-ui/core/Icon'

class SongContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(type) {
    let {onRequest, request} = this.props
    onRequest(type, request)
  }

  render() {
    let {request} = this.props
    return (
      <div className="SongContainer">
        <div className="SongContainer__profile-cont">
          <div className="SongContainer--icon" style={{backgroundImage: `url(${request.img})`}}/>
          <div className="SongContainer--name">{request.name}</div>
        </div>
        <div className="SongContainer__main">
          <div className="SongContainer--song">{request.song}</div>
          <div className="SongContainer__action-container">
            <div className="SongContainer__buttons">
              <Fab color="primary" aria-label="Edit" classes={{root: 'SongContainer--times'}} size="small" onClick={() => this.handleClick('cancel')}>
                <Icon>close</Icon>
              </Fab>
              <Fab color="primary" aria-label="Edit" classes={{root: 'SongContainer--check'}} size="small" onClick={() => this.handleClick('accept')}>
                <Icon>check</Icon>
              </Fab>
            </div>
            <div className="SongContainer--time">11 : 11 PM</div>
          </div>
        </div>
      </div>
    )
  }
}

export default SongContainer
