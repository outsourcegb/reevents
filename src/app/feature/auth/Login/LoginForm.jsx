import React from 'react';
import {connect} from 'react-redux'
import { Form, Segment, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from './../../../common/form/TextInput';
import {loginUser} from './../authActions';

const actions = {
  loginUser
}

const LoginForm = ({loginUser, handleSubmit}) => {
  return (
    <Form error size="large" onSubmit={handleSubmit(loginUser)}>
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="password"
        />
        <Button fluid size="large" color="teal">
          Login
        </Button>
      </Segment>
    </Form>
  );
};

export default connect(null, actions)(reduxForm({form: 'loginForm'})(LoginForm));