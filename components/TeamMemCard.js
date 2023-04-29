import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, OverlayTrigger, Tooltip,
} from 'react-bootstrap';
import Link from 'next/link';
import { deleteSingleMemberOfTeam } from '../api/memberData';

export default function TeamMemCard({ memberObj, onUpdate, teamFirebaseKey }) {
  const deleteThisMember = () => {
    if (window.confirm(`Delete ${memberObj.name}?`)) {
      deleteSingleMemberOfTeam(teamFirebaseKey, memberObj.firebaseKey).then(() => onUpdate());
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Click to trade
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 400, hide: 333 }}
      overlay={renderTooltip}
    >
      <Card className="card mem-card" style={{ width: '15rem', margin: '8px' }}>
        <Link href={`/newMem/edit/trade/${memberObj.firebaseKey}--${teamFirebaseKey}`} passHref>
          <Card.Img variant="top" src={memberObj.image} alt={memberObj.name} style={{ height: '215px' }} className="card-img" />
        </Link>
        <Card.Body className="text-center card-body">
          <Link href={`/newMem/edit/trade/${memberObj.firebaseKey}--${teamFirebaseKey}`} passHref>
            <Card.Title>{memberObj.name}</Card.Title>
          </Link>
          <Link href={`/newMem/edit/trade/${memberObj.firebaseKey}--${teamFirebaseKey}`} passHref>
            <Card.Subtitle>{memberObj.role}</Card.Subtitle>
          </Link>
          <hr />
        </Card.Body>
        <div className="text-center bottom-center card-button-div">
          <Link href={`/newMem/edit/${memberObj.firebaseKey}--${teamFirebaseKey}`} passHref>
            <Button variant="primary" className="editBtn m-2 btn">Edit</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisMember} className="m-2 deleteBtn btn">
            Delete
          </Button>
        </div>
      </Card>
    </OverlayTrigger>
  );
}

TeamMemCard.propTypes = {
  memberObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    team: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  teamFirebaseKey: PropTypes.string.isRequired,
};
