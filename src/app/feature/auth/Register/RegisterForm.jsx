import React from 'react';
import { connect } from "react-redux";
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import {combineValidators, isRequired} from 'revalidate';
import { Field , reduxForm} from 'redux-form';
import TextInput from './../../../common/form/TextInput';
import {registerUser} from './../authActions';
import SocialLogin from '../SocialLogin/SocialLogin';


const actions = {
  registerUser
}

const validate = combineValidators({
  displayName: isRequired('Display name'),
  email: isRequired('Email'),
  password: isRequired('Password')
})

const RegisterForm = ({handleSubmit, registerUser, error, invalid, submitting}) => {
  return (
    <div>
      <Form size="large" onSubmit={handleSubmit(registerUser)}>
        {error && <Label basic color="red" pointing="below">{error}</Label>}
        <Segment>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
          />
          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
          <Button
            disabled={invalid || submitting}
            fluid size="large" color="teal">
            Register
          </Button>

          <Divider horizontal>Or</Divider>

          <SocialLogin />
        </Segment>
      </Form>
    </div>
  );
};

export default connect(null, actions)(reduxForm({form: 'registerForm', validate})(RegisterForm));