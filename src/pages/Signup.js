import React, { useState } from 'react'
import { Link } from 'react-router-dom';

// Component
import { Form, TextField, SelectField, SubmitButton } from '../component/FormElements';


const signupFormSchema = {
  email: {
    type: "email",
    label: "Email",
  },
  name: {
    type: "text",
    label: "Name",
  },
  password: {
    type: "text",
    label: "Password",
  },
  submit: {
    title: "Sign up",
    type: "submit",
    label: "Sign up"
  }
}

const Signup = () => {

  const [formData, setFormData] = useState({});

  const getFormElement = (elementName, elementSchema) => {
    const props = {
      name: elementName,
      label: elementSchema.label,
      title: elementSchema.title
    };

    if (elementSchema.type === "text" || elementSchema.type === "email") {
      return <TextField {...props} />
    }

    if (elementSchema.type === "select") {
      return <SelectField  {...props} />
    }

    if (elementSchema.type === "submit") {
      return <SubmitButton  {...props} />
    }

  }

  const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
    setSubmitting(false);
  }

  return (
    <div  className="form-wrapper">
      <h1>Sign Up</h1>
      <Form
        enableReinitialize
        initialValues={formData}
        onSubmit={onSubmit}
        noValidate
      >

        {Object.keys(signupFormSchema).map((key, ind) => (
          <div key={key} className="input-wrapper">
            {getFormElement(key, signupFormSchema[key])}
          </div>
        ))}

      </Form>
      <Link to={'/login'} className="link">Already have an account? Login</Link>
    </div>
  )
}

export default Signup