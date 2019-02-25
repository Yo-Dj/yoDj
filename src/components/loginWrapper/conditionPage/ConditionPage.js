import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/Close'

class ConditionPage extends React.Component {
  constructor(props) {
    super(props)
    this.close = this.close.bind(this)
  }

  close() {
    this.props.onClose()
  }

  render() {
    let {isVisible} = this.props
    return (
      <div className={`ConditionPage${isVisible ? ' ConditionPage--visible' : ''}`}>
        <div className="ConditionPage__header">
          <div className="ConditionPage__back">
            <IconButton key="arrow"
                arial-label="Close"
                color="inherit"
                onClick={this.close}
            >
              <ArrowBack />
            </IconButton>
          </div>
          <div className="ConditionPage__title">yoDj</div>
        </div>
        <div className="ConditionPage__text">
            <h2> Terms and Conditions</h2>
        </div>
      </div>
    )
  }
}

export default ConditionPage
