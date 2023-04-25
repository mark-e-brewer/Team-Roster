import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AddMemForm from '../../../components/AddMemForm';
import { getSingleMemberOfTeam } from '../../../api/memberData';

export default function EditMember() {
  const [editMember, setEditMember] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [memFirebaseKey, teamFirebaseKey] = firebaseKey.split('--');

  useEffect(() => {
    getSingleMemberOfTeam(teamFirebaseKey, memFirebaseKey).then(setEditMember);
  }, [memFirebaseKey, teamFirebaseKey]);

  return (
    <AddMemForm obj={editMember} />
  );
}
