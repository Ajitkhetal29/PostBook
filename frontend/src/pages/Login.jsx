import React, { useState } from 'react'

const Login = () => {

    const [currentState, setCurrentState] = useState("Sign in");

    return (
        <div className='login'>

            <form>

                <h2>{currentState}</h2>

               {currentState === "Sign in" &&  <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" aria-describedby="name" />
                </div>}
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="pass" class="form-label">Password</label>
                    <input type="password" class="form-control" id="pass" />
                </div>

                {currentState === "sign in" ?<button type="submit" class="btn btn-primary">Sign in</button>:<button type="submit" class="btn btn-primary">Login</button>}
               
                
                {currentState === "Sign in" ?  <p>Already Have an account ? <span onClick={()=>{setCurrentState("Login")}}>Login</span></p>:<p>Dont have Have an account ? <span onClick={()=>{setCurrentState("Sign in")}}>Sign in</span></p>}
            </form>

        </div>
    )
}

export default Login