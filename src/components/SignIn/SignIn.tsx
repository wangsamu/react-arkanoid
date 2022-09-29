import React from 'react'
import { signInwithGooglePopUp } from '../../utils/firebase/firebaseUtils'

function SignIn() {
  return (
    <button onClick={signInwithGooglePopUp}>Sign in with Google</button>
  )
}

export default SignIn