import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/Close'

class ConditionPage extends React.Component {
  static propTypes = {
    onClose: PropTypes.func,
    isVisible: PropTypes.bool
  }

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
            <p className="ConditionPage__paragraph">1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse sit amet ultricies nulla, ut fermentum dui.
            </p>
            <p className="ConditionPage__paragraph">
              2. Fusce ut quam feugiat, tristique justo eu, ultrices eros.
              Pellentesque eu elit ut urna porttitor accumsan. Etiam viverra erat vel consectetur ultricies.
            </p>
            <p className="ConditionPage__paragraph">
              In ut condimentum tortor, eget laoreet quam. Cras at lobortis mi. Sed elit justo,
              lacinia quis nibh et, tincidunt sagittis justo. Ut vulputate neque fermentum lacus ornare placerat.
            </p>
            <p className="ConditionPage__paragraph">
              Donec eu venenatis eros. Nam maximus lectus id nisl interdum mattis. Aliquam erat volutpat.
              Vestibulum eu justo hendrerit, semper diam non, tristique nunc.
            </p>
            <h2> Privacy Policy</h2>
            <p className="ConditionPage__paragraph">1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse sit amet ultricies nulla, ut fermentum dui.
            </p>
            <p className="ConditionPage__paragraph">
              2. Fusce ut quam feugiat, tristique justo eu, ultrices eros.
              Pellentesque eu elit ut urna porttitor accumsan. Etiam viverra erat vel consectetur ultricies.
            </p>
        </div>
      </div>
    )
  }
}

export default ConditionPage
