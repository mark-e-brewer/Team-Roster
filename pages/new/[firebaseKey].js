import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AddMemForm from '../../components/AddMemForm';
import { getSingleMember } from '../../api/memberData';

export default function EditMember() {
  const [editMember, setEditMember] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleMember(firebaseKey).then(setEditMember);
  }, [firebaseKey]);

  return (
    <AddMemForm obj={editMember} />
  );
}
