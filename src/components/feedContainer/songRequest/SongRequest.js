import React from 'react'
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

class SongRequest extends React.Component {
  render() {
    let {request} = this.props
    console.log('Request ---> ', request)
    // let profileImage = require(request.img)

    return (
      <div className="SongRequest">
        <div className="SongRequest__profile" style={{backgroundImage: `url(${request.img})`}}/>
        <div className="SongRequest__action-container">
        <Fab color="primary" aria-label="Edit">
          <Icon>check</Icon>
        </Fab>
        </div>
      </div>
    )
  }
}

export default SongRequest
