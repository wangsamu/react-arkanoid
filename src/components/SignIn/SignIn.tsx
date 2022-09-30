import React, { useState } from "react";
import { signInWithGooglePopup } from "../../utils/firebase/firebaseUtils";
import { ButonsContainer, SignInContainer } from "./SignInStyled";

const defaultFormField = {
  email: "",
  password: "",
};

function SignIn() {
  const [formFields, setFormFields] = useState(defaultFormField);
  const { email, password } = formFields;

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      // check if user is authenticated with email and password
      // const { user } = await signInAuthWithEmailAndPassword(email, password);
      // console.log("Logged in successfully!");
      refreshFormFields();
    } catch (error: any) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        alert("invalid credentials!");
      }
      console.log(error.message);
    }
  };

  const refreshFormFields = () => {
    setFormFields(defaultFormField);
  };

  const formInputList = [
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
  ];

  const logGoogleUser = async () => {
    await signInWithGooglePopup();
  };

  return (
    // <button onClick={signInwithGooglePopUp}>Sign in with Google</button>
    <SignInContainer>
      <h2>I already have an account</h2>
      <span>Sign in using email and password</span>
      <form onSubmit={handleSubmit}>
        {formInputList.map((inputs: any) => {
          return (
            <div>
              <input required {...inputs.inputOptions} />
              <label>{inputs.label}</label>
            </div>
          );
        })}
        <ButonsContainer>
          <button type="submit">Sign In</button>
          <button type="button" onClick={logGoogleUser}>
            Sign-in with Google
          </button>
        </ButonsContainer>
      </form>
    </SignInContainer>
  );
}

export default SignIn;
