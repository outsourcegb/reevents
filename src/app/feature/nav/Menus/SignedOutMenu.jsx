import React, { Component } from 'react'
import {Menu, Button} from 'semantic-ui-react'

export class SignedOutMenu extends Component {
  render() {
    const {signIn, register} = this.props
    return (
      <Menu.Item position="right">
        <Button basic inverted content="Login" onClick={signIn} />
        <Button basic inverted content="Register" style={{marginLeft: '0.5em'}} onClick={register} />
      </Menu.Item>
    )
  }
}

export default SignedOutMenu
