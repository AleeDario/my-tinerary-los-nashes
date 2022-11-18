import React from 'react'
import CallToAction from './CallToAction'
import IconFooter from './IconFooter'
import ScrollToTop from './ScrollToTop'

export default function Footer() {
    return (
        <footer className="m-top-2">
            <div className="flex">
                <img className="w-100 img-h-5" src="../img/footer-border.png" alt="footer border" />
            </div>
            <div className="first-footer flex justify-around align-center text-white bg-palette1 p-1">
                <div>
                    <img className="img-w-12" src="../img/logo-footer.png" alt="footer img" />
                </div>
                <div className="flex column gap-1-5 p-2 justify-start">
                    <h3 className="text-center text-redpalette">Contact</h3>
                    <IconFooter url='mailto:info@mytinerary.com' classImg='img-w-1 m-r-1' srcImage='./img/email.png' texto='info@mytinerary.com' />
                    <IconFooter url='tel:+54 9 11 1234-5678' classImg='img-w-1 m-r-1' srcImage='./img/phone.png' texto='+54 9 11 1234-5678' />
                    <IconFooter url='https://www.google.com/maps/place/43+Raymouth+Rd,+London+3910,+Reino+Unido/@51.4920715,-0.0570819,17z/data=!3m1!4b1!4m5!3m4!1s0x4876031847ea7ca1:0x707bc89a00580b87!8m2!3d51.4920715!4d-0.0570819' classImg='img-w-1 m-r-1' srcImage='./img/location.png' texto='43 Raymouth Rd. Baltemoer, London 3910' />
                </div>
                <div className="flex column gap-1 p-2 justify-center align-center">
                    <h3 className="text-redpalette">Navigation</h3>
                    <div className='flex justify-center align-center'>
                        <IconFooter classImg='img-w-1-5' srcImage='./img/paisaje-urbano.png'/><CallToAction rute='/cities' classN='btn2' text='Cities' />
                    </div>
                    <div className='flex justify-center align-center'>
                        <IconFooter classImg='img-w-1-5' srcImage='./img/boleto.png' /><CallToAction rute='/hotels' classN='btn2' text='Events' />
                    </div>
                    
                </div>

            </div>
            <div className="second-footer bg-palette6 flex justify-center gap-4 p-1">

                <IconFooter url='https://www.instagram.com/' classImg='img-w-3' srcImage='./img/instagram.png' />
                <IconFooter url='https://www.facebook.com/' classImg='img-w-3' srcImage='./img/facebook.png' />
                <IconFooter url='https://www.twitter.com/' classImg='img-w-3' srcImage='./img/twitter.png' />

                <ScrollToTop />
            </div>
        </footer>
    )
}
