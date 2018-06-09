import React, { Component } from 'react'
import {Button} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { incrementCounter, decrementCounter } from './TestActions.js'

const mapState = (state) => ({
  data: state.test.data
})

const actions = {
  incrementCounter,
  decrementCounter
}

class TestArea extends Component {
  render() {
    const {incrementCounter, decrementCounter, data} = this.props
    return (
      <div>
        Test page

        <p>
          The answer is: {this.props.data}
        </p>

        <Button onClick={incrementCounter} color='green' content="Increment" />
        <Button onClick={decrementCounter} color='red' content="Decrement" />
      </div>
    )
  }
}

export default connect(mapState, actions)(TestArea)