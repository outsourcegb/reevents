import React, { Component } from 'react'
import { connect } from 'react-redux'

const mapState = (state) => ({
  data: state.test.data
})

class TestArea extends Component {
  render() {
    return (
      <div>
        Test page

        <p>
          The answer is: {this.props.data}
        </p>
      </div>
    )
  }
}

export default connect(mapState)(TestArea)