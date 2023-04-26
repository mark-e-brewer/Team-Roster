import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleMemberOfTeam } from '../api/memberData';

export default function TeamMemCard({ memberObj, onUpdate, teamFirebaseKey }) {
  const deleteThisMember = () => {
    if (window.confirm(`Delete ${memberObj.name}?`)) {
      deleteSingleMemberOfTeam(teamFirebaseKey, memberObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card className="card mem-card" style={{ width: '15rem', margin: '8px' }}>
      <Card.Img variant="top" src={memberObj.image} alt={memberObj.name} style={{ height: '222px' }} />
      <Card.Body className="text-center">
        <Card.Title>{memberObj.name}</Card.Title>
        <Card.Subtitle>{memberObj.role}</Card.Subtitle>
        <hr />
      </Card.Body>
      <div className="text-center bottom-center">
        <Link href={`/newMem/edit/${memberObj.firebaseKey}--${teamFirebaseKey}`} passHref>
          <Button variant="primary" className="editBtn">Edit</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisMember} className="m-2 deleteBtn">
          Delete
        </Button>
        <Link href={`/newMem/edit/trade/${memberObj.firebaseKey}--${teamFirebaseKey}`} passHref>
          <Button variant="success">Trade</Button>
        </Link>
      </div>
    </Card>
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
