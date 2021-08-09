import { useState } from "react";
import withAuth from "./components/withAuth";
import { getSession } from 'next-auth/client'
import axios from 'axios';

export default function createNewUser() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [radio, setRadio] = useState("peer leader");
  const [postSuccess, setPostSuccess] = useState(false);

  const postNewUser = async () => {
    let headers = {}
    const session = await getSession(); // Get the jwt for accessing backend
    if (session) {
      headers = {Authorization: `Bearer ${session.jwt}`};
    }
    let data = {"username": username, "email": email, "password": password}

    try {
      // Create authenticated user first (need to rewrite end points to create and set role in a single step)
      let res = await axios.post('http://localhost:1337/auth/local/register', data, {
        headers: headers,
      })
      console.log("create-new-users post response1:", res);

      // Setting the role for the new user
      // Set the role id for user likely rewrite endpoint
      let rolesID = {"peer leader": "60a4689d5d345b000e77f8c1", 
                     "research partner": "60a468d25d345b000e77f93d",
                     "genyus admin": "60a4686e5d345b000e77f845"}
      let userID = res.data.user.id;
      // Mongoose id
      let updateRoleData = {
        "role": {
                "_id": rolesID[radio]
        }
      }
      let res2 = await axios.put(`http://localhost:1337/users/${userID}`, updateRoleData, {
        headers: headers,
      })
      console.log("create-new-users put response2:", res2);

      if (typeof res2.statusText !== 'undefined' && res2.statusText == 'OK') {
        setPostSuccess(true);
        setUsername("");
        setPassword("");
        setEmail("");
        setRadio("peer leader")
      }
    } catch (e) {
      console.log('create-new-users caught error' ,e);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    postNewUser();
    setTimeout(function() {setPostSuccess(false)}, 5000);
  }

  const {session, haveAuthenticated} = withAuth({redirectTo: "/dashboard", permittedRole:"genyus admin"});
  if (!session) {
    return <h1>Loading...</h1>
  }
  if (session && haveAuthenticated()) {
    return (
      <div>
      <h1>{postSuccess ? `User Was Created` : `Create New User`}</h1>
      <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input name='email' type='text' value={email} onChange={e=>setEmail(e.target.value)}/>
      </label><br/>
      <label>
        Username:
        <input name='username' type='text' value={username} onChange={e=>setUsername(e.target.value)}/>
      </label>
      <label><br/>
        Password:
        <input name='password' type='password' value={password} onChange={e=>setPassword(e.target.value)}/>
      </label><br/>
      <input type="radio" id="genyus admin" name="userRole" value="genyus admin" onChange={e=>setRadio(e.target.value)} checked={"genyus admin" === radio}/>
      <label htmlFor="genyus admin">genyus Admin</label><br/>
      <input type="radio" id="research partner" name="userRole" value="research partner" onChange={e=>setRadio(e.target.value)} checked={"research partner" === radio}/>
      <label htmlFor="research partner">Research Partner</label><br/>
      <input type="radio" id="peer leader" name="userRole" value="peer leader" onChange={e=>setRadio(e.target.value)} checked={"peer leader" === radio}/>
      <label htmlFor="peer leader">Peer Leader</label><br/>
      <button type='submit'>Create User</button>
    </form>
    </div>
    
    )
  }
  return (<p>Redirecting...</p>)
}