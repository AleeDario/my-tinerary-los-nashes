import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import reactionActions from '../redux/actions/reactionActions'
import Reaction from './Reaction'

export default function CardHotel(props) {
    let { event } = props
    const dispatch = useDispatch()
    const { getReactions } = reactionActions

    useEffect(() => {
        dispatch(getReactions(event._id))
        // eslint-disable-next-line
    }, [])

    return (
        <div className='flex justify-center cont-event m-t-5 '>
            <div className='flex column justify-center gap-1 align-center bg-palette1 w-50 text-white p-3 border-radius-2 cont-event-children'>
                <img className='img-fluid' width='400px' src={event.photo} alt="" />
                <h1>{event.name}</h1>
                <p>{event.description}</p>
                <p>{event.date.split('T00:00:00.000Z')}</p>
                <div className='flex w-100 justify-between'>
                    <p>Price : ${event.price}</p>
                    <div className="flex gap-1">
                        <Reaction eventId={event._id} type='show' />
                    </div>
                </div>

            </div>
        </div>
    )
}
