import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getMembers } from '../api/memberData';
import TeamMemCard from '../components/TeamMemCard';
import { useAuth } from '../utils/context/authContext';

export default function TeamMemPage({ searchQuery }) {
  const [members, setMembers] = useState([]);
  const { user } = useAuth();
  const getAllMembers = () => {
    getMembers(user.uid).then(setMembers);
  };

  useEffect(() => {
    getAllMembers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredMembers = members.filter((mem) => mem.name.toLowerCase().includes(searchQuery.toLowerCase()));
  return (
    <>
      <h1 className="text-center">Team Members</h1>
      <div className="d-flex flex-wrap">
        {filteredMembers.map((mem) => <TeamMemCard key={mem.firebaseKey} memberObj={mem} onUpdate={getAllMembers} />)}
      </div>
    </>
  );
}

TeamMemPage.propTypes = {
  searchQuery: PropTypes.string,
};

TeamMemPage.defaultProps = {
  searchQuery: '',
};
