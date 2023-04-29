import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import {
  createMemberOfTeam, deleteSingleMemberOfTeam, getTeams, updateMemberForTrade,
} from '../api/memberData';

const initialState = {
  firebaseKey: '',
  teamKey: '',
  name: '',
  uid: '',
  role: '',
  image: '',
};

export default function TradeForm({ obj }) {
  const [formSelect, setFormSelect] = useState(obj);
  const [allTeams, setAllTeams] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    setFormSelect(obj);
    getTeams().then(setAllTeams);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormSelect((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const [memKey, teamKey] = firebaseKey.split('--');
    const payload = {
      firebaseKey: formSelect.firebaseKey,
      teamKey: formSelect.teamKey,
      name: formSelect.name,
      uid: formSelect.uid,
      role: formSelect.role,
      image: formSelect.image,
    };
    createMemberOfTeam(payload, formSelect.teamKey).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateMemberForTrade(patchPayload, name, formSelect.teamKey).then(() => {
        deleteSingleMemberOfTeam(teamKey, memKey).then(() => {
          router.push(`/teams/${formSelect.teamKey}`);
        });
      });
    });
  };

  const filteredTeams = allTeams.filter((team) => team.firebaseKey !== obj.teamKey);

  return (
    <Form onSubmit={handleSubmit} id="trade-form">
      <h2 className="text-black mt-5">Select Team for trade</h2>
      <FloatingLabel controlId="floatingSelect" label="Teams">
        <Form.Select
          className="form-select"
          id="trade-form-select"
          aria-label="Teams"
          name="teamKey"
          defaultValue={obj.teamKey}
          onChange={handleChange}
          required
        >
          <option value="">Select a Team</option>
          {
          filteredTeams.map((team) => (
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
      <Button type="submit" className="form-submit" id="trade-form-submit">Trade Member</Button>
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
  }),
};

TradeForm.defaultProps = {
  obj: initialState,
};
