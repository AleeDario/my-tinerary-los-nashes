import React from 'react'
import { useRef } from 'react'
import BotonEnviarForm from '../components/BotonEnviarForm'
import BotonRegistroGoogle from '../components/BotonRegistroGoogle'
import InputForm from '../components/InputForm'
import Swal from 'sweetalert2'
import axios from 'axios'
import apiUrl from '../api/url'

export default function SignUp() {

    const form = useRef()
    const name = useRef()
    const lastName = useRef()
    const photo = useRef()
    const age = useRef()
    const email = useRef()
    const password = useRef()
    const confirmPassword = useRef()

    function enviarFormulario(event) {
        event.preventDefault()

        if (password.current.value === confirmPassword.current.value) {
            let newUser = {
                name: name.current.value,
                lastName: lastName.current.value,
                photo: photo.current.value,
                age: age.current.value,
                email: email.current.value,
                password: password.current.value,
            }

            Swal.fire({
                icon: 'info',
                title: `${newUser.name} ${newUser.lastName} Are you sure you want to register with this information?`,
                showConfirmButton: true,
                showCancelButton: true,
            })
                .then(async result => {
                    if (result.isConfirmed) {
                        let response = await axios.post(`${apiUrl}/api/auth/sign-up`, newUser)
                        if (response.data.success) {
                            Swal.fire({
                                title: 'Success!',
                                text: `${newUser.name} your account was created successfully. Please check your mailbox ( ${newUser.email} ) and confirm your registration to finish it.`,
                                icon: 'success',
                                confirmButtonText: 'Ok'
                            })
                            form.current.reset()
                        }
                    }
                })
                .catch(error => {
                    if(Array.isArray(error.response.data.message)){
                        Swal.fire({
                            icon: "error",
                            title: error.response.data.message.join(' <br> '),
                            showConfirmButton: true,
                        });
                    }else{
                        Swal.fire({
                            icon: "error",
                            title: error.response.data.message,
                            showConfirmButton: true,
                        });
                    }
                })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Passwords do not match!',
            })
        }
    }

    return (
        <main className="w-100 flex column align-center p-3 gap-2 main-container-sign">
            <img className='imgFondo' src='../img/fondo.jpg' alt='fondo-img' />
            <h1 className="text-palette2 ">Sign Up</h1>
            <div className="flex justify-center">
                <form ref={form}>
                    <div className="card flex column align-center justify-center container-fluid">
                        <img className="img-w-20 flex align-center img-fluid" src="../img/signup-img.png" alt="drawing" />
                        <div className="input-wrapper flex column gap-1">
                            <InputForm classN="signup-input" type="text" place="Name" id="name" refId={name} />
                            <InputForm classN="signup-input" type="text" place="LastName" id="lastName" refId={lastName} />
                            <InputForm classN="signup-input" type="text" place="Photo" id="photo" refId={photo} />
                            <InputForm classN="signup-input" type="number" place="Age" id="age" refId={age} />
                            <InputForm classN="signup-input" type="email" place="Email" id="email" refId={email} />
                            <InputForm classN="signup-input" type="password" place="Password" id="password" refId={password} />
                            <InputForm classN="signup-input" type="password" place="Confirm Password" id="confirmPassword" refId={confirmPassword} />
                        </div>

                        <BotonEnviarForm fx={enviarFormulario} texto='Sign Up' />
                        <BotonRegistroGoogle texto='Sign up with Google' url='https://accounts.google.com/v3/signin/identifier?dsh=S-1341219122%3A1667751252859917&continue=https%3A%2F%2Fwww.google.com%2F%3Fgws_rd%3Dssl&ec=GAZAmgQ&hl=es-419&passive=true&flowName=GlifWebSignIn&flowEntry=ServiceLogin&ifkv=ARgdvAt_thDvZZDycyZfT6GZJJ27KpLLjV92H1YwhHxFL1XG0rjrjh3BfVulpJ6CADzp2VCsgYHudQ' />
                    </div>
                </form>
            </div>
        </main>
    )
}
