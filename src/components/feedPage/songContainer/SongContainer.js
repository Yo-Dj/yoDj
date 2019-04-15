import React from 'react'
import Fab from '@material-ui/core/Fab'
import Icon from '@material-ui/core/Icon'

class SongContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(type) {
    console.log('Typ Clicked ---> ', type)
  }

  render() {
    let {request} = this.props
    return (
      <div className="SongContainer">
        <div className="SongContainer__profile-cont">
          <div className="SongContainer--icon" />
          <div className="SongContainer--name">{request.name}</div>
        </div>
        <div className="SongContainer__main">
          <div className="SongContainer--song">{request.song}</div>
          <div className="SongContainer__action-container">
            <Fab color="primary" aria-label="Edit" classes={{root: 'SongContainer--times'}} size="small" onClick={() => this.handleClick('cancel')}>
              <Icon>close</Icon>
            </Fab>
            <Fab color="primary" aria-label="Edit" classes={{root: 'SongContainer--check'}} size="small" onClick={() => this.handleClick('accept')}>
              <Icon>check</Icon>
            </Fab>
            <div className="SongContainer--time">11 : 11 PM</div>
          </div>
        </div>
      </div>
    )
  }
}

export default SongContainer
