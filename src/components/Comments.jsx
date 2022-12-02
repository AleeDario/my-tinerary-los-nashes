import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import commentActions from '../redux/actions/commentActions'
import cityActions from '../redux/actions/cityActions'
import hotelActions from '../redux/actions/hotelActions'
import BotonMas from './BotonMas'
import Swal from 'sweetalert2'


export default function Comments(props) {

    let { eventId, type } = props
    const dispatch = useDispatch()
    const { token, id ,logged} = useSelector(state => state.user)
    const [reload, setReload] = useState(true)
    const [comments, setComments] = useState('')
    const { getComments, createComment, deleteComment, updateComment } = commentActions
    const { getItinerariesAll } = cityActions
    const { getAllShows } = hotelActions
    const { itinerariesAll } = useSelector(state => state.city)
    const { allShows } = useSelector(state => state.hotel)

    useEffect(() => {
        getCom()
        dispatch(getItinerariesAll())
        dispatch(getAllShows())
        // eslint-disable-next-line
    }, [reload])

    async function getCom() {
        let datos = {
            type,
            eventId,
        }
        let res = await dispatch(getComments(datos))
        setComments(res.payload)
    }

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(date) {
        return (
            [
                date.getFullYear(),
                padTo2Digits(date.getMonth() + 1),
                padTo2Digits(date.getDate()),
            ].join('-') +
            ' ' +
            [
                padTo2Digits(date.getHours()),
                padTo2Digits(date.getMinutes()),
                padTo2Digits(date.getSeconds()),
            ].join(':')
        );
    }


    async function sendComment(e) {
        e.preventDefault()
        console.log('entre')

        let itinerary = itinerariesAll.find(itinerary => itinerary._id === eventId)
        let show = allShows.find(show => show._id === eventId)

        const { value: text } = await Swal.fire({
            input: 'textarea',
            inputLabel: 'Comment',
            inputPlaceholder: 'Type your comment here...',
            inputAttributes: {
                'aria-label': 'Type your comment here'
            },
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Send',
        })

            .then(async (result) => {
                if (result.isConfirmed) {

                    let datos = {
                        token,
                        id: eventId,
                        comment: {
                            userId: id,
                            date: formatDate(new Date()),
                            comment: result.value,
                        },
                    }

                    if (itinerary) {
                        datos.comment.itineraryId = eventId
                    } else if (show) {
                        datos.comment.showId = eventId
                    }

                    try {
                        await dispatch(createComment(datos))
                        setReload(!reload)

                        Swal.fire({
                            icon: 'success',
                            title: 'Comment sent!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                    catch (error) {
                        console.log(error)
                    }
                }
            })


        if (text) {
            Swal.fire(text)
        }
    }

    async function deleteCommentary(e) {

        try {

            let datos = {
                token,
                id: e.target.name,
            }
            await dispatch(deleteComment(datos))
            setReload(!reload)
        }
        catch (error) {
            console.log(error)
        }
    }

    async function editCommentary(e) {

        const { value: text } = await Swal.fire({
            input: 'textarea',
            inputLabel: 'Edit your comment',
            inputPlaceholder: 'Type your comment edit here...',
            inputAttributes: {
                'aria-label': 'Type your comment edit here'
            },
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Edit',
        })

            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        let datos = {
                            token,
                            id: e.target.slot,
                            comment: {
                                userId: id,
                                date: formatDate(new Date()),
                                comment: result.value,
                            },
                        }
                        await dispatch(updateComment(datos))
                        setReload(!reload)
                    }
                    catch (error) {
                        console.log(error)
                    }
                }
            })

        if (text) {
            Swal.fire(text)
        }

    }


    return (
        <>
            {logged &&
            <div>
                <img src="../img/add-c.png" alt="" width='80px' onClick={sendComment} />
            </div>
            }
            {comments.success &&
                comments.response.map(comment => {
                    return (
                        <div key={comment._id} className='flex gap-2 align-center justify-between w-80 bg-white box-comments m-t-1 p-1'>
                            <div className='flex justify-between align-center w-100'>
                                <div className='flex align-center gap-2'>
                                    <div>
                                        <img src={comment.userId.photo} alt="" width='80px' className='border-radius-50' />
                                    </div>

                                    <div className='flex column gap-0-5'>
                                        <h4 className='flex align-center'>{comment.userId.logged ? (
                                            <img width='20px' className='img-com' src="../img/online-icon.png" alt="" />
                                        ) : (
                                            <img width='20px' className='img-com' src="../img/offline-icon.png" alt="" />
                                        )}{comment.userId.name} {comment.userId.lastName}</h4>
                                        <h6>{comment.date.replace('T', ' ').split('.000Z')}</h6>
                                        <p className='text-comment'>{comment.comment}</p>
                                    </div>

                                </div>
                            </div>
                            {comment.userId._id === id &&
                                <div className='align-end fondo'>
                                    <BotonMas w='30px' fx={editCommentary} name={comment._id} />
                                    <img onClick={deleteCommentary} src="../img/trash.gif" name={comment._id} id={comment._id} width='30px' alt="" />
                                </div>
                            }
                        </div>
                    )
                })}
        </>
    )
}
