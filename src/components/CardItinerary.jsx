import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import reactionActions from '../redux/actions/reactionActions'
import Comments from './Comments'
import Reaction from './Reaction'

export default function CardItinerary(props) {
    let { itinerary } = props
    const dispatch = useDispatch()
    const { getReactions } = reactionActions
    let [seeComments, setSeeComments] = useState(false)

    useEffect(() => {
        dispatch(getReactions(itinerary._id))
        // eslint-disable-next-line
    }, [])

    function numeroRandom(numero) {
        return Math.floor(Math.random() * numero)
    }

    let see = () => {
        setSeeComments(!seeComments)
    }

    return (
        <>
        <div className='flex justify-center cont-event m-t-5 '>
            <div className='flex column justify-center gap-2 align-center bg-palette1 w-50 text-white p-3 border-radius-2 cont-event-children'>
                <img className='img-fluid' width='400px' src={itinerary.photo[numeroRandom(itinerary.photo.length - 1)]} alt="" />
                <h1>{itinerary.name}</h1>
                <p>{itinerary.description}</p>
                <div className='flex w-100 justify-between align-center conjunto'>
                    <p>Price : ${itinerary.price}</p>
                    <button onClick={see} className="bg-palette2 w-40 flex justify-center p-1 p-x-3">
                        <p>Comments</p>
                    </button>
                    <div className="flex gap-1">
                        <Reaction eventId={itinerary._id} type='itinerary' />
                    </div>
                </div>

            </div>
        </div>
        {seeComments && (
        <div className='w-40 flex column align-center m-t-3 caja-comentarios'>
        
            <Comments eventId={itinerary._id} type='itinerary' />
        
        </div>
        )}
        </>
    )
}
