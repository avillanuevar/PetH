import React from 'react'
import {Col,Button} from 'react-bootstrap'

import { Link } from 'react-router-dom'

const PetCard = ({name,age,description,imageUrl,_id,deletePet }) => {

    return (
      <Col className="" md={4}>
        <Link className="btn btn-sm btn-dark" to={`/petDetails/${_id}`}>
          <div>
            <img src={imageUrl} alt={name} />
          </div>
          <div>
            <h2>
              {name},{age}
            </h2>
            <p>{description}</p>
          </div>
        </Link>
        <Button variant="dark" onClick={deletePet.bind(this,_id)}>
              Remove {name} from your list
            </Button>
      </Col>
    );
}


export default PetCard