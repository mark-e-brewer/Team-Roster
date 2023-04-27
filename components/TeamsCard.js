import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleTeam } from '../api/memberData';

export default function TeamsCard({ teamObj, onUpdate }) {
  const deleteThisTeam = () => {
    if (window.confirm(`Delete ${teamObj.teamName} team?`)) {
      deleteSingleTeam(teamObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card className="card team-card" style={{ width: '15rem', margin: '8px' }}>
      <Card.Img variant="top" src={teamObj.teamImage} alt={teamObj.teamName} style={{ height: '222px' }} />
      <Card.Body className="text-center">
        <Card.Title>{teamObj.teamName}</Card.Title>
        <hr />
      </Card.Body>
      <div className="text-center bottom-center">
        <Link href={`/teams/${teamObj.firebaseKey}`} passHref>
          <Button variant="secondary" className="btn m-2 viewBtn">View</Button>
        </Link>
        <Link href={`/teams/edit/${teamObj.firebaseKey}`} passHref>
          <Button variant="primary" className="btn m-2 editBtn">Edit</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisTeam} className="btn m-2  deleteBtn">Delete</Button>
      </div>
    </Card>
  );
}

TeamsCard.propTypes = {
  teamObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    teamImage: PropTypes.string,
    teamName: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
