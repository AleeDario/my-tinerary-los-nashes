import React from 'react'

export default function BotonRegistroGoogle(props) {
    let { url, texto } = props
    return (
        <div className=" flex border-radius-0-5 bg-google">
            <img className='bg-white img-google' src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt='Logo Google' />
            <a className='text-decoration text-white flex align-center justify-center p-0-5'
                href={url}>
                {texto}
            </a>
        </div>
    )
}
