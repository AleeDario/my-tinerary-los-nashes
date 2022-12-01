import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../redux/actions/userActions';
import reactionActions from '../redux/actions/reactionActions';
import Swal from 'sweetalert2'
import BotonMas from '../components/BotonMas';
import CardReactions from '../components/CardReactions';
import { Link as Navlink } from 'react-router-dom';

export default function MyProfile() {

   const dispatch = useDispatch()
   const { getUser, updateUser } = userActions
   const { getMyReactions, deleteReaction } = reactionActions
   const { user, id, token } = useSelector(state => state.user)
   const { myReactions } = useSelector(state => state.reaction)
   let [mostrarEventoUno, setMostrarEventoUno] = useState(false)

   useEffect(() => {
      dispatch(getUser(id))
      dispatch(getMyReactions({ id, token }))
      // eslint-disable-next-line
   }, [])

   let mostrarEvento1 = (e) => {
      e.preventDefault()
      setMostrarEventoUno(!mostrarEventoUno)
   }

   function updatePhoto() {

      Swal.fire({
         title: 'Update your photo',
         input: 'text',
         inputLabel: 'Your new photo url',
         inputPlaceholder: 'Enter your new photo url',
         showCancelButton: true,
         inputValidator: (value) => {
            if (!value) {
               return 'You need to write something!'
            }
         }
      })
         .then(async (result) => {
            if (result.isConfirmed) {

               let userUpdated = {
                  id: user._id,
                  user: {
                     photo: result.value
                  }
               }
               dispatch(updateUser(userUpdated))
            }
         }
         )
   }

   function updateName() {

      Swal.fire({
         title: 'Update your name',
         input: 'text',
         inputLabel: 'Your name',
         inputPlaceholder: 'Enter your name',
         showCancelButton: true,
         inputValidator: (value) => {
            if (!value) {
               return 'You need to write something!'
            }
         }
      })
         .then(async (result) => {
            if (result.isConfirmed) {

               let userUpdated = {
                  id: user._id,
                  user: {
                     name: result.value
                  }
               }
               dispatch(updateUser(userUpdated))
            }
         }
         )
   }

   function updateLastName() {
      Swal.fire({
         title: 'Update your last name',
         input: 'text',
         inputLabel: 'Your last name',
         inputPlaceholder: 'Enter your last name',
         showCancelButton: true,
         inputValidator: (value) => {
            if (!value) {
               return 'You need to write something!'
            }
         }
      })
         .then(async (result) => {
            if (result.isConfirmed) {

               let userUpdated = {
                  id: user._id,
                  user: {
                     lastName: result.value
                  }
               }
               dispatch(updateUser(userUpdated))
            }
         }
         )
   }

   function updateEmail() {

      Swal.fire({
         title: 'Update your Email',
         input: 'text',
         inputLabel: 'Your Email',
         inputPlaceholder: 'Enter your Email',
         showCancelButton: true,
         inputValidator: (value) => {
            if (!value) {
               return 'You need to write something!'
            }
         }
      })
         .then(async (result) => {
            if (result.isConfirmed) {

               let userUpdated = {
                  id: user._id,
                  user: {
                     email: result.value
                  }
               }
               dispatch(updateUser(userUpdated))
            }
         }
         )

   }

   function updateAge() {
      Swal.fire({
         title: 'Update your age',
         input: 'number',
         inputLabel: 'Your age',
         inputPlaceholder: 'Enter your age',
         showCancelButton: true,
         inputValidator: (value) => {
            if (!value) {
               return 'You need to write something!'
            }
         }
      })
         .then(async (result) => {
            if (result.isConfirmed) {

               let userUpdated = {
                  id: user._id,
                  user: {
                     age: result.value
                  }
               }
               dispatch(updateUser(userUpdated))
            }
         }
         )
   }

   function updatePassword(e) {
      e.preventDefault()
      Swal.fire({
         title: 'Update your password',
         input: 'password',
         inputLabel: 'Your password',
         inputPlaceholder: 'Enter your password',
         showCancelButton: true,
         inputValidator: (value) => {
            if (!value) {
               return 'You need to write something!'
            }
         }
      })
         .then(async (result) => {
            if (result.isConfirmed) {

               let userUpdated = {
                  id: user._id,
                  user: {
                     password: result.value
                  }
               }
               dispatch(updateUser(userUpdated))
            }
         }
         )
   }

   function deleteReactionUser(e) {
      e.preventDefault()
      Swal.fire({
         title: 'Are you sure?',
         text: "You won't be able to revert this!",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Yes, delete it!'
      })
         .then((result) => {
            if (result.isConfirmed) {
               dispatch(deleteReaction({ id: e.target.name, token }))
               Swal.fire({
                  title: 'Deleted!',
                  text: "Your reaction has been deleted.",
                  icon: 'success',
               })
            }
         })
   }

   return (
      <main className="w-100 flex column align-center p-3 gap-2 main-container-sign">
         <img className='imgFondo img-fluid' src='../img/fondo.jpg' alt='fondo-img' />
         <div className="flex column justify-center">
            <form>
               <div className="cardForm flex column align-center justify-center container-fluid p-2">
                  <h1 className="text-palette2 titleForm">My Profile</h1>
                  <div className='flex cardFormPerfil container-fluid gap-1-5'>
                     {<div className='flex cardFormPerfil2'>
                        <img width='350px' className="img-fluid" src={user.photo} alt="drawing" />
                        <div>
                           <BotonMas fx={updatePhoto} />
                        </div>
                     </div>}
                     <div className='flex column gap-1 justify-center align-center container-fluid'>
                        <div className="flex column gap-3">
                           <div className='flex column gap-1'>
                              <div className='flex gap-1 align-center'>
                                 <h2 className='textPerfil'>Name: {user.name}</h2>
                                 <BotonMas fx={updateName} />
                              </div>
                              <div className='flex gap-1'>
                                 <h2 className='textPerfil'>Last Name: {user.lastName}</h2>
                                 <BotonMas fx={updateLastName} />
                              </div>
                              <div className='flex gap-1'>
                                 <h2 className='textPerfil textEmail'>Email: {user.email}</h2>
                                 <BotonMas fx={updateEmail} />
                              </div>
                              <div className='flex gap-1'>
                                 <h2 className='textPerfil'>Age: {user.age}</h2>
                                 <BotonMas fx={updateAge} />
                              </div>
                           </div>
                           {<div className='flex justify-around buttonsPerfil'>
                              <button onClick={updatePassword} className="shadow__btn btn-prof">Change Password</button>
                              <button onClick={mostrarEvento1} className="shadow__btn btn-prof">See my reactions</button>
                           </div>}

                        </div>
                     </div>
                  </div>
               </div>
            </form>
            <div className='flex justify-center wrap gap-2'>
               {mostrarEventoUno && myReactions.length > 0 ? (
                  myReactions.map((reaction, index) => {
                     console.log(reaction)
                     let classReaction
                     if (reaction.name === reaction.name) {
                        classReaction = `cardPerfil ${reaction.name}`
                     } else {
                        classReaction = `cardPerfil`
                     }
                     return (
                        <div key={index} className="flex justify-center m-t-3">
                           <div className={classReaction}>
                              <CardReactions reaction={reaction.showId || reaction.itineraryId} name={reaction.name} icon={reaction.icon} id={reaction._id} fxDelete={deleteReactionUser} />
                           </div>
                        </div>
                     )
                  })
               ) : mostrarEventoUno && (
                  <div className='flex column align-center m-t-3 p-3'>
                     <img className='img-fluid' width='400px' src='../img/notreactions.png' alt="not reactions" />
                     <h4>You have no reactions, go to <Navlink to='/hotels' style={{ textDecoration: 'none' }}> Hotels </Navlink> or <Navlink to='/cities' style={{ textDecoration: 'none' }}> Hotels </Navlink> to see the itineraries or shows and be able to react.</h4>
                  </div>
               )}
            </div>
         </div>
      </main>
   )
}