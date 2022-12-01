import React, { useEffect } from 'react'
import { useDispatch} from 'react-redux'
import reactionActions from '../redux/actions/reactionActions'
import Reaction from './Reaction'

export default function CardItinerary(props) {
    let { itinerary } = props
    const dispatch = useDispatch()
    const { getReactions } = reactionActions

    useEffect(() => {
        dispatch(getReactions(itinerary._id))
        // eslint-disable-next-line
    }, [])

    function numeroRandom(numero) {
        return Math.floor(Math.random() * numero)
    }
    return (
        <div className='flex justify-center cont-event m-t-5 '>
            <div className='flex column justify-center gap-2 align-center bg-palette1 w-50 text-white p-3 border-radius-2 cont-event-children'>
                <img className='img-fluid' width='400px' src={itinerary.photo[numeroRandom(itinerary.photo.length - 1)]} alt="" />
                <h1>{itinerary.name}</h1>
                <p>{itinerary.description}</p>
                <div className='flex w-100 justify-between'>
                    <p>Price : ${itinerary.price}</p>
                    <div className="flex gap-1">
                        <Reaction eventId={itinerary._id} type='itinerary' />
                    </div>
                </div>

            </div>
        </div>
    )
}
