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
  const teamOnly = members.slice((members.length - 4));

  useEffect(() => {
    getAllMembers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredMembers = members.slice(0, (members.length - 4)).filter((mem) => mem.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <div className="text-center">
        <h1 className="text-center" id="member-page-header">{teamOnly[2]} Members</h1>
        <Link href={`/newMem/${firebaseKey}`} passHref>
          <Button variant="primary" className="editBtn add-mem">Add Member</Button>
        </Link>
      </div>
      <div className="d-flex flex-wrap justify-content-center" id="member-page-card-div">
        {filteredMembers.map((mem) => (
          <div className="team-mem-card">
            <TeamMemCard key={mem.firebaseKey} memberObj={mem} onUpdate={getAllMembers} teamFirebaseKey={firebaseKey} />
          </div>
        ))}
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
