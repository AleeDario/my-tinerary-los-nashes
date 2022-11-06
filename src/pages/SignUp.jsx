import React from 'react'
import { useRef } from 'react'
import BotonEnviarForm from '../components/BotonEnviarForm'
import BotonRegistroGoogle from '../components/BotonRegistroGoogle'
import InputForm from '../components/InputForm'

export default function SignUp() {

    const form = useRef()
    const fullName = useRef()
    const email = useRef()
    const password = useRef()
    const confirmPassword = useRef()
    const tel = useRef()

    let newUser = []

    const enviarFormulario = () => {

        if (fullName.current.value !== '' && email.current.value !== '' && password.current.value !== '' && confirmPassword.current.value !== '' && tel.current.value !== '') {
            if (email.current.value.includes('@') && email.current.value.includes('.')) {

                if (password.current.value === confirmPassword.current.value) {
                    if (password.current.value.length >= 4) {
                        for(let i=0; i<tel.current.value.length; i++){
                            if(tel.current.value.codePointAt(i) < 48 || tel.current.value.codePointAt(i) > 57){
                                return alert('El teléfono debe ser un número')
                            }
                        }
                        newUser.push(
                            {
                                fullName: fullName.current.value,
                                email: email.current.value,
                                password: password.current.value,
                                tel: tel.current.value
                            }
                        )
                        form.current.reset()
                        alert('Usuario creado con éxito')
                    } else {
                        alert('La contraseña debe tener al menos 4 caracteres')
                    }
                } else {
                    alert('Las contraseñas no coinciden')
                }
            } else {
                alert('El email no es válido, debera contener al menos un @ y un .')
            }

        } else {
            alert('Todos los campos son obligatorios')
        }

        localStorage.setItem('newUser', JSON.stringify(newUser))
    }

    return (
        <main className="w-100 flex column align-center p-3 gap-2 main-container-sign">
            <h1 className="text-palette2 ">Sign Up</h1>
            <div className="flex justify-center">
                <form ref={form}>
                    <div className="card flex column align-center justify-center container-fluid">
                        <img className="img-w-20 flex align-center img-fluid" src="../img/signup-img.png" alt="drawing" />
                        <div className="input-wrapper flex column gap-1">
                            <InputForm classN="signup-input" type="text" place="Full Name" id="fullName" refId={fullName} />
                            <InputForm classN="signup-input" type="email" place="Email" id="email" refId={email} />
                            <InputForm classN="signup-input" type="password" place="Password" id="password" refId={password} />
                            <InputForm classN="signup-input" type="password" place="Confirm Password" id="confirmPassword" refId={confirmPassword} />
                            <InputForm classN="signup-input" type="text" place="Phone Number" id="tel" refId={tel} />
                        </div>

                        <BotonEnviarForm fx={enviarFormulario} texto='Sign Up' />
                        <BotonRegistroGoogle texto='Sign up with Google' url='https://accounts.google.com/v3/signin/identifier?dsh=S-1341219122%3A1667751252859917&continue=https%3A%2F%2Fwww.google.com%2F%3Fgws_rd%3Dssl&ec=GAZAmgQ&hl=es-419&passive=true&flowName=GlifWebSignIn&flowEntry=ServiceLogin&ifkv=ARgdvAt_thDvZZDycyZfT6GZJJ27KpLLjV92H1YwhHxFL1XG0rjrjh3BfVulpJ6CADzp2VCsgYHudQ' />
                    </div>
                </form>
            </div>
        </main>
    )
}
