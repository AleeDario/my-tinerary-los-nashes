import React from 'react'
import { useRef } from 'react'
import BotonRegistroGoogle from '../components/BotonRegistroGoogle'
import InputForm from '../components/InputForm'
import BotonEnviarForm from '../components/BotonEnviarForm'
import { Link as Navlink } from 'react-router-dom'

export default function SignIn() {

    const form = useRef()
    const email = useRef()
    const password = useRef()

    let userLoged = []

    const enviarFormulario = () => {

        if (email.current.value !== '' && password.current.value !== '') {
            userLoged.push(
                {
                    email: email.current.value,
                    password: password.current.value,
                }
            )
            form.current.reset()
            alert('Usuario Logeado con éxito')
        } else {
            alert('Todos los campos son obligatorios')
        }

        localStorage.setItem('userLoged', JSON.stringify(userLoged))
    }

    return (
        <main className="w-100 flex column align-center p-3 gap-2 main-container-signin">
            <h1 className="text-palette2">Sign In</h1>
            <div className="flex justify-center">
                <form ref={form}>
                    <div className="card flex column align-center justify-center container-fluid">

                        <img className="img-w-20 flex align-center img-fluid" src="./img/login-img.png" alt="login icon" />

                        <div className="input-wrapper flex column gap-1">
                            <InputForm classN="signup-input" type="text" place="Email" id="email" refId={email} />
                            <InputForm classN="signup-input" type="password" place="Password" id="password" refId={password} />
                        </div>

                        <BotonEnviarForm fx={enviarFormulario} texto='Sign In' />

                        <div className="remember-password">
                            <Navlink to='/forgot-password'>
                                <a>Forgot your password?</a>
                            </Navlink>
                        </div>

                        <BotonRegistroGoogle texto='Sign in with Google' url='https://accounts.google.com/v3/signin/identifier?dsh=S-1341219122%3A1667751252859917&continue=https%3A%2F%2Fwww.google.com%2F%3Fgws_rd%3Dssl&ec=GAZAmgQ&hl=es-419&passive=true&flowName=GlifWebSignIn&flowEntry=ServiceLogin&ifkv=ARgdvAt_thDvZZDycyZfT6GZJJ27KpLLjV92H1YwhHxFL1XG0rjrjh3BfVulpJ6CADzp2VCsgYHudQ' />

                        <div>
                            <Navlink to="/signup" style={{ textDecoration: 'none' }}>
                                <button className="newaccount-button">
                                    <div className="svg-wrapper-1">
                                        <div className="svg-wrapper">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                <path fill="none" d="M0 0h24v24H0z"></path>
                                                <path fill="currentColor"
                                                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z">
                                                </path>
                                            </svg>
                                        </div>
                                    </div>
                                    <span>Create new account</span>
                                </button>
                            </Navlink>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}
