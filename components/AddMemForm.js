import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { createMemberOfTeam, updateMemberOfTeam } from '../api/memberData';

const initialState = {
  name: '',
  image: '',
  role: '',
};

export default function AddMemForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();
  const { firebaseKey } = router.query;

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput(obj);
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
    console.warn(`teamFirebaseKey being used in mem form: ${firebaseKey}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formInput.firebaseKey) {
      updateMemberOfTeam(formInput, firebaseKey)
        .then(() => router.push(`/teams/${firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMemberOfTeam(payload, firebaseKey).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMemberOfTeam(patchPayload, firebaseKey).then(() => {
          router.push(`/teams/${firebaseKey}`);
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-black mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Team Member</h2>
      <FloatingLabel controlId="floatingInput1" label="Member Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Member Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="Team Member Role" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Member Role"
          name="role"
          value={formInput.role}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="Team Member Photo Url" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Member Photo Url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Team Member</Button>
    </Form>
  );
}

AddMemForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    role: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }),
};

AddMemForm.defaultProps = {
  obj: initialState,
};
