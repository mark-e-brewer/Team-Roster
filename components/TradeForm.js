import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { createMemberOfTeam, getTeams } from '../api/memberData';

const initialState = {
  firebaseKey: '',
  teamKey: '',
  name: '',
  uid: '',
  role: '',
  image: '',
};

export default function TradeForm({ obj }) {
  const [formSelect, setFormSelect] = useState(initialState);
  const [allTeams, setAllTeams] = useState([]);
  const router = useRouter();
  // const { firebaseKey } = router.query;

  useEffect(() => {
    setFormSelect(obj);
    console.warn(`OBJ USED FOR TRADE: ${formSelect}`);
    getTeams().then(setAllTeams);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormSelect((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const [memKey, teamKey] = firebaseKey.split('--');
    const payload = { ...formSelect };
    createMemberOfTeam(payload, formSelect.teamKey).then(() => {
      router.push('/team');
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-black mt-5">Select Team for trade</h2>
      <FloatingLabel controlId="floatingSelect" label="Teams">
        <Form.Select
          aria-label="Teams"
          name="teamKey"
          value={obj.teamKey}
          onChange={handleChange}
          required
        >
          <option value="">Select a Team</option>
          {
            allTeams.map((team) => (
              <option
                key={team.firebaseKey}
                value={team.firebaseKey}
              >
                {team.teamName}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>
      <Button type="submit">Trade Member</Button>
    </Form>
  );
}

TradeForm.propTypes = {
  obj: PropTypes.shape({
    teamKey: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    role: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};
