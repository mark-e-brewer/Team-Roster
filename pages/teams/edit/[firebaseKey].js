import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AddTeamForm from '../../../components/AddTeamForm';
import { getSingleTeam } from '../../../api/memberData';

export default function EditTeam() {
  const [editTeam, setEditTeam] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeam(firebaseKey).then(setEditTeam);
  }, [firebaseKey]);

  return (
    <AddTeamForm obj={editTeam} />
  );
}
