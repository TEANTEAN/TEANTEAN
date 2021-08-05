import { signIn, getCsrfToken } from 'next-auth/client'
import { useState } from "react";
import TextField from '@material-ui/core/TextField';


export default function Login({ csrfToken }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn('credentials',
      {
        "username": username, "password": password, callbackUrl: 'http://localhost:3000/dashboard'
      }
    )
  }
  return (
    <form method='post' onSubmit={handleSubmit}>
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
      <input name='csrfToken' type='hidden' defaultValue={csrfToken}/>
      <label>
        Username
        <input name='username' type='text' onChange={e=>setUsername(e.target.value)}/>
      </label>
      <label>
        Password
        <input name='password' type='password' onChange={e=>setPassword(e.target.value)}/>
      </label>
      <button type='submit'>Sign in</button>
    </form>
  )
}


export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  }
}