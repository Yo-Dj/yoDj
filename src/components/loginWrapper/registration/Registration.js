import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import ConditionPage from '../conditionPage'

class Registration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      selectedType: '',
      openTerms: false
    }
    this.nameChange = this.nameChange.bind(this)
    this.selectUser = this.selectUser.bind(this)
    this.openCondition = this.openCondition.bind(this)
    this.closeCondition = this.closeCondition.bind(this)
  }

  nameChange(e) {
    let name = e.target.value
    if (name.indexOf('@') === -1) {
      name = '@' + name
    }
    if (name === '@') name = ''
    this.setState({
      name: name
    })
  }
x
  selectUser(selectedType) {
    this.setState({
      selectedType
    })
  }

  openCondition() {
    this.setState({
      openTerms: true
    })
  }

  closeCondition() {
    this.setState({
      openTerms: false
    })
  }

  render() {
    let {selectedType} = this.state
    return (
      <div className="Registration">
        <div className="Registration__icon" />
        <ConditionPage isVisible={this.state.openTerms} onClose={this.closeCondition}/>
        <TextField
          value={this.state.name}
          placeholder='Enter @Name'
          margin="normal"
          classes={{root: 'Registration__text'}}
          onChange={this.nameChange}
          InputProps={{style: {textAlign: 'center'}, classes: {input: 'Registration__input'}}}
        />
        <div className='Registration__user-select'>
          What kind of user are you?
          <div className='Registration__user-buttons'>
            <Button
              variant="contained"
              color="primary"
              classes={{root: `Registration__type-button${selectedType !== '' && selectedType === 'Fan' ? ' Registration--selected' : ''}`}}
              onClick={() => this.selectUser('DJ')}
            >
              DJ
            </Button>
            <Button
              variant="contained"
              color="primary"
              classes={{root: `Registration__type-button${selectedType !== '' && selectedType === 'DJ' ? ' Registration--selected' : ''}`}}
              onClick={() => this.selectUser('Fan')}
            >
              Fan
            </Button>
          </div>
        </div>
      <div className="Registration__condition" onClick={this.openCondition}>
        View YoDj terms and Privacy Policy
      </div>
    </div>
    )
  }
}

export default Registration
