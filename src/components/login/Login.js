import React from 'react'
import { MuiThemeProvider ,createMuiTheme, withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import orange from '@material-ui/core/colors/orange'
import PhoneInput, {format} from "react-phone-input-auto-format"

const theme = createMuiTheme({
  palette: {
    primary: orange
  },
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiButton: {
      text: {
        color: 'white'
      }
    },
    MuiInput: {
      input: {
        textAlign: 'center',
        color: 'white'
      },
      underline: {
        borderBottom: '1px solid white',
        '&:before': {
          borderBottom: '1px solid white',
        }
      },
    }
  }
})

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      phone: ''
    }
    this.numberPressed = this.numberPressed.bind(this)
    this.removeNumber = this.removeNumber.bind(this)
  }

  numberPressed(num) {
    let {value, phone} = this.state
    value += num
    phone += num
    value = format(value)
    if (value.length < 15) {
      this.setState({
        value,
        phone
      })
    }
  }

  removeNumber() {
    let {value, phone} = this.state
    if (value !== '') {
      phone = phone.slice(0, phone.length - 1)
      value = format(phone)
      this.setState({
        value,
        phone
      })
    }
  }

  render() {
    let nums = [1,2,3,4,5,6,7,8,9]
    return (
    <MuiThemeProvider theme={theme}>
      <div className="Login">
        <div className="Login__logo">
          <div className="Login__icon" />
          <TextField value={this.state.value} margin="normal" classes={{root: "Login__text"}} InputProps={{readOnly: true, style: {textAlign: "center"}}} />
        </div>
        <div className="Login__numbers">
          {
            nums.map((num, index) => (
              <div className="Login__digit" key={index}>
                <Button variant="contained" color="primary" classes={{root: 'Login__digit-button'}} onClick={() => this.numberPressed(num)}>
                  {num}
                </Button>
              </div>
            ))
          }
         <div className="Login__digit"><Button variant="text" classes={{root: 'Login__action-button'}} onClick={this.removeNumber}>Clear</Button></div>
         <div className="Login__digit"><Button variant="contained" color="primary" classes={{root: 'Login__digit-button'}} onClick={() => this.numberPressed(0)}>0</Button></div>
         <div className="Login__digit"><Button variant="text" classes={{root: 'Login__action-button'}}>Next</Button></div>

        </div>
      </div>
    </MuiThemeProvider>
    )
  }
}

export default Login
