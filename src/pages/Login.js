import React, { useState, useEffect, useContext  } from 'react'
import { Link, useNavigate } from 'react-router-dom';

// Component
import { Form, TextField, SelectField, SubmitButton } from '../component/FormElements';

// Store
import { GlobalContext } from "../Store/Globalstate";

const loginFormSchema = {
    email: {
        type: "email",
        label: "Email",
        required: true
    },
    password: {
        type: "text",
        label: "Password",
        required: true
    },
    submit: {
        title: "Login",
        type: "submit",
        label: "Login"
    }
}


const Login = () => {

    const [formData, setFormData] = useState({});
    const { state, dispatch } = useContext(GlobalContext);
    let navigate = useNavigate();

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
        dispatch({
            type: "LOGIN",
            payload: ''
        });
        navigate('/dashboard')

    }

    return (
        <div className="form-wrapper">
            <h1>Login</h1>
            <Form
                enableReinitialize
                initialValues={formData}
                onSubmit={onSubmit}
                noValidate
            >

                {Object.keys(loginFormSchema).map((key, ind) => (
                    <div key={key} className="input-wrapper">
                        {getFormElement(key, loginFormSchema[key])}
                    </div>
                ))}

            </Form>
            <Link to={'/signup'} className="link">Don't have an account yet? Sign Up</Link>
        </div>
    )
}

export default Login