import React from 'react'
import { useRef } from 'react'
import BotonRegistroGoogle from '../components/BotonRegistroGoogle'
import InputForm from '../components/InputForm'
import BotonEnviarForm from '../components/BotonEnviarForm'
import { Link as Navlink } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import userActions from '../redux/actions/userActions'
import { useNavigate } from 'react-router-dom'


export default function SignIn() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { login } = userActions

    const form = useRef()
    const email = useRef()
    const password = useRef()

    async function enviarFormulario(event) {
        event.preventDefault()

        let user = {
            email: email.current.value,
            password: password.current.value,
        }

        try {
            let response = await dispatch(login(user))
            if (response.payload.success) {
                Swal.fire({
                    icon: 'success',
                    title: response.payload.res.message,
                    showConfirmButton: true,
                })
                    .then(result => {
                        if (result.isConfirmed) {
                            navigate('/')
                        }
                    })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: response.payload.response,
                    showConfirmButton: true,
                })
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <main className="w-100 flex column align-center p-3 gap-2 main-container-signin">
            <img className='imgFondo' src='../img/fondo.jpg' alt='fondo-img' />
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
                                <p>Forgot your password?</p>
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