import React from 'react'
import {Col,button} from 'react-bootstrap'

import { Link } from 'react-router-dom'

const PetCard = ({name,age,description,imageUrl,_id,deletePet }) => {

    return (
      <Col className="" md={4}>
        <Link className='link' to={`/petDetails/${_id}`}>
          <div className="buttonPetCard">
          <div>
              <img className='imgPetCard' src={imageUrl} alt={name} />
          </div>
          <div>
            <h2>
              {name},{age}
            </h2>
            <p>{description}</p>
          </div>
          </div>
        </Link>
        <button className='marginL0' onClick={deletePet.bind(this,_id)}>
              Remove {name} 
            </button>
      </Col>
    );
}


export default PetCard