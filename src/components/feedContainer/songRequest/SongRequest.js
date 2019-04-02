import React from 'react'
import Fab from '@material-ui/core/Fab'
import Icon from '@material-ui/core/Icon'

class SongRequest extends React.Component {
  render() {
    let {request} = this.props
    return (
      <div className="SongRequest">
        <div className="SongRequest__profile" style={{backgroundImage: `url(${request.img})`}}/>
        <div className="SongRequest__description">
          {`${request.name}: ${request.song}`}
        </div>
        <div className="SongRequest__action-container">
        <Fab color="primary" aria-label="Edit" classes={{root: 'SongRequest--times'}} size="small">
          <Icon>close</Icon>
        </Fab>
        <Fab color="primary" aria-label="Edit" classes={{root: 'SongRequest--check'}} size="small">
          <Icon>check</Icon>
        </Fab>
        </div>
      </div>
    )
  }
}

export default SongRequest
