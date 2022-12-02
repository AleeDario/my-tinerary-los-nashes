import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import reactionActions from '../redux/actions/reactionActions'
import Reaction from './Reaction'
import Comments from './Comments'

export default function CardHotel(props) {
    let { event } = props
    const dispatch = useDispatch()
    const { getReactions } = reactionActions
    let [seeComments, setSeeComments] = useState(false)

    useEffect(() => {
        dispatch(getReactions(event._id))
        // eslint-disable-next-line
    }, [])

    let see = () => {
        setSeeComments(!seeComments)
    }

    return (
        <>
            <div className='flex justify-center cont-event m-t-5 '>
                <div className='flex column justify-center gap-1 align-center bg-palette1 w-50 text-white p-3 border-radius-2 cont-event-children'>
                    <img className='img-fluid' width='400px' src={event.photo} alt="" />
                    <h1>{event.name}</h1>
                    <p>{event.description}</p>
                    <p>{event.date.split('T00:00:00.000Z')}</p>
                    <div className='flex w-100 justify-between'>
                        <p>Price : ${event.price}</p>
                        <button onClick={see} className="bg-palette2 w-40 flex justify-center p-1 p-x-3">
                            <p>Comments</p>
                        </button>
                        <div className="flex gap-1">
                            <Reaction eventId={event._id} type='show' />
                        </div>
                    </div>

                </div>
            </div>
            {seeComments && (
                <div className='w-40 flex column align-center m-t-3 caja-comentarios'>

                    <Comments eventId={event._id} type='show' />

                </div>
            )}
        </>
    )
}
