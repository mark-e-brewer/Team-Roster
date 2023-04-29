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
  const { firebaseKey } = router.query; // team firebaseKey

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput(obj);
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formInput.firebaseKey) {
      const [, teamKey] = firebaseKey.split('--');
      updateMemberOfTeam(formInput, teamKey)
        .then(() => router.push(`/teams/${teamKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid, teamKey: firebaseKey };
      createMemberOfTeam(payload, firebaseKey).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMemberOfTeam(patchPayload, firebaseKey).then(() => {
          router.push(`/teams/${firebaseKey}`);
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} id="add-member-form">
      <h2 className="text-black mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Team Member</h2>
      <FloatingLabel controlId="floatingInput1" label="Member Name" className="mb-3">
        <Form.Control
          className="form-input"
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
          className="form-input"
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
          className="form-input"
          type="text"
          placeholder="Enter Member Photo Url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Button type="submit" className="form-submit">{obj.firebaseKey ? 'Update' : 'Create'} Team Member</Button>
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
