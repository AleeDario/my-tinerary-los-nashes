import React from 'react'

export default function CardReactions(props) {
   let { reaction, name, icon, id, fxDelete } = props
   return (
      <div className='card-body align-center flex column justify-around gap-2'>
         <img className='img-reaction' src={reaction.photo} alt={reaction.name} />
         <h4>{reaction.name}</h4>
         <div className='flex justify-between w-100'>
            <h5 className='flex column align-center iconReaction'><img src={icon} alt="icon" width='30px' />{name}</h5>
            <img src="../img/trash.gif" alt="trash" name={id} width='40px' onClick={fxDelete} />
         </div>


      </div>
   )
}