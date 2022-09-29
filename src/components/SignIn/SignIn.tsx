import React from 'react'
import { signInWithGoogle } from '../../utils/firebase/firebase.utils'

function SignIn() {
  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

export default SignIn