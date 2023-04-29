import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getTeams } from '../api/memberData';
import TeamsCard from '../components/TeamsCard';

export default function TeamsPage({ searchQuery }) {
  const [teams, setTeams] = useState([]);
  const getAllTeams = () => {
    getTeams().then(setTeams);
  };

  useEffect(() => {
    getAllTeams();
  }, []);

  const filteredTeams = teams.filter((team) => team.teamName.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <h1 className="text-center" id="team-page-div">Teams</h1>
      <div className="d-flex flex-wrap justify-content-center">
        {filteredTeams.map((team) => <TeamsCard key={team.firebaseKey} teamObj={team} onUpdate={getAllTeams} />)}
      </div>
    </>
  );
}

TeamsPage.propTypes = {
  searchQuery: PropTypes.string,
};

TeamsPage.defaultProps = {
  searchQuery: '',
};
