import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import reactionActions from '../redux/actions/reactionActions'
import { useState, useEffect } from 'react'


export default function Reaction(props) {
    let { idItinerary } = props
    const dispatch = useDispatch()
    const { getReactions, updateReaction } = reactionActions
    const { token, id } = useSelector(state => state.user)
    const [reload, setReload] = useState(true)
    const [reaction, setReaction] = useState({})

    useEffect(() => {
        reactions()
        // eslint-disable-next-line 
    }, [reload])

    async function reactions() {
        let res = await dispatch(getReactions(idItinerary))
        setReaction(res.payload)
    }

    async function press(e) {
        let name
        reaction.data.forEach(react => {
            if (react.name === e.target.name) {
                name = react.name
            }
        })

        let datos = {
            token,
            id: idItinerary,
            name,
        }
        try {
            await dispatch(updateReaction(datos))
            setReload(!reload)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {
                reaction.success &&
                reaction.data.map(react => {
                    let res = react.userId.find(user => user._id === id)
                    return (
                        <div key={react.name} className='reaction'>
                            {
                                res ? (
                                    <div className='elDiv'>
                                        <div>{react.userId.map(user => {
                                            return (<div className='flex'>
                                                <img className='img-fluid imgLike' src={user.photo} alt="" />
                                                <p>{user.name} {user.lastName}</p>
                                            </div>)
                                        })}</div>
                                        <img onClick={press} width='30px' name={react.name} src={react.icon} alt="icon" />
                                        <p>{reaction.lengthOfReactions[react.name]}</p>
                                    </div>
                                ) : (
                                    <div className='elDiv'>
                                        <div>{react.userId.map(user => {
                                            return (<div className='flex'>
                                                <img className='img-fluid imgLike' src={user.photo} alt="" />
                                                <p>{user.name} {user.lastName}</p>
                                            </div>)
                                        })}</div>
                                        <img onClick={press} width='30px' name={react.name} src={react.iconBack} alt="icoBack" />
                                        <p>{reaction.lengthOfReactions[react.name]}</p>
                                    </div>
                                )
                            }
                        </div>
                    )
                })
            }
        </>
    )
}
