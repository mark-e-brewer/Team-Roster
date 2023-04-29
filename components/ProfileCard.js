import React from 'react';
import { Card } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

export default function ProfileCard() {
  const { user } = useAuth();

  return (
    <>
      <Card className="card profile-card" style={{ width: '18rem', alignItems: 'center', textAlign: 'center' }}>
        <Card.Img style={{ borderRadius: '100px', width: '195px', marginTop: '15px' }} src={user.photoURL} alt="Profile" />
        <Card.Body className="profile-card-body">
          <Card.Title style={{ color: 'black' }} className="card-title">{user.displayName}</Card.Title>
          <Card.Text style={{ color: 'black' }} className="card-email card-text">{user.email}</Card.Text>
          <Card.Text className="card-text">Last sign in: {user.metadata.lastSignInTime}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
