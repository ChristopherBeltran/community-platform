import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { LoginContainer } from '../Login/Login.container'
import { VersionNumber } from 'src/components/VersionNumber/VersionNumber'
import './Header.scss'

interface IState {
  auth: boolean
  anchorEl: any
  isLoggedIn?: boolean
}

interface IProps {
  title?: string
}

export class DeprecatedHeader extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      auth: true,
      anchorEl: null,
    }
  }

  handleChange = event => {
    this.setState({ auth: event.target.checked })
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { auth, anchorEl } = this.state
    const open = Boolean(anchorEl)
    return (
      <div id="header">
        <div className="container">
          {/* <LoginContainer />
          {this.state && this.state.isLoggedIn ? (
            <div>User Logged in page</div>
          ) : (
            <div className="bgimg-1" />
          )} */}
          <VersionNumber />
          <AppBar position="static">
            <Toolbar>
              {/* <IconButton color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton> */}
              <Menu open={Boolean(anchorEl)}>
                <MenuItem onClick={this.handleClose}>Menu Item</MenuItem>
              </Menu>
              ))}
              {auth && (
                <div>
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>
        </div>
      </div>
    )
  }
}
