import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getMembersOfTeam } from '../../api/memberData';
import TeamMemCard from '../../components/TeamMemCard';
// eslint-disable-next-line no-unused-vars
export default function TeamMemPage({ searchQuery, teamFirebaseKey, setTeamFirebaseKey }) {
  const [members, setMembers] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;
  const getAllMembers = () => {
    getMembersOfTeam(firebaseKey).then(setMembers);
  };

  useEffect(() => {
    getAllMembers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredMembers = members.slice(0, (members.length - 4)).filter((mem) => mem.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <div className="text-center">
        <h1 className="text-center">Team Members</h1>
        <Link href={`/newMem/${firebaseKey}`} passHref>
          <Button variant="primary">Add Member</Button>
        </Link>
      </div>
      <div className="d-flex flex-wrap">
        {console.warn(`members array: ${members}`)}
        {filteredMembers.map((mem) => <TeamMemCard key={mem.firebaseKey} memberObj={mem} onUpdate={getAllMembers} teamFirebaseKey={firebaseKey} />)}
      </div>
    </>
  );
}

TeamMemPage.propTypes = {
  searchQuery: PropTypes.string,
  teamFirebaseKey: PropTypes.string,
  setTeamFirebaseKey: PropTypes.string,
};

TeamMemPage.defaultProps = {
  searchQuery: '',
  teamFirebaseKey: '',
  setTeamFirebaseKey: '',
};
