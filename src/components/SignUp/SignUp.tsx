import React, { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebaseUtils";

import { SignUpContainer } from "./SignUpStyled";

const defaultFormField = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUp() {
  const [formFields, setFormFields] = useState(defaultFormField);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    //confirm that password matches
    if (password !== confirmPassword) {
      alert("password do not match!");
      return;
    }

    try {
      //check if user is authenticated with email and password
      const { user } =
        (await createAuthUserWithEmailAndPassword(email, password)) || {};
      if (!user) {
        throw new Error("Something went wrong!");
      }
      //create a user document with data introduced
      await createUserDocumentFromAuth(user, {
        displayName,
      });
      refreshFormFields();
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use!");
      } else {
        console.log(error.message);
      }
    }
  };

  const refreshFormFields = () => {
    setFormFields(defaultFormField);
  };

  const formInputList = [
    {
      label: "Display name",
      inputOptions: {
        type: "text",
        name: "displayName",
        onChange: handleChange,
        value: displayName,
      },
    },
    {
      label: "Email",
      inputOptions: {
        type: "email",
        name: "email",
        onChange: handleChange,
        value: email,
      },
    },
    {
      label: "Password",
      inputOptions: {
        type: "password",
        name: "password",
        onChange: handleChange,
        value: password,
      },
    },
    {
      label: "Confirm Password",
      inputOptions: {
        type: "password",
        name: "confirmPassword",
        onChange: handleChange,
        value: confirmPassword,
      },
    },
  ];
  return (
    <SignUpContainer>
      <h2>Don't have an account yet?</h2>
      <h3>Sign up in a just a few seconds!</h3>
      <form onSubmit={handleSubmit}>
        {formInputList.map((inputs) => (
          <div key={inputs.label}>
            <label>{inputs.label}</label>
            <input required {...inputs.inputOptions} />
          </div>
        ))}
        <button type="button" onClick={handleSubmit}>
          Sign Up
        </button>
      </form>
    </SignUpContainer>
  );
}

export default SignUp;
