import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TradeForm from '../../../../components/TradeForm';
import { getSingleMemberOfTeam } from '../../../../api/memberData';

export default function TradeMemPage() {
  const [memberData, setMemberData] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [memFirebaseKey, teamFirebaseKey] = firebaseKey.split('--');

  useEffect(() => {
    getSingleMemberOfTeam(teamFirebaseKey, memFirebaseKey).then(setMemberData);
  }, [memFirebaseKey, teamFirebaseKey]);

  return (
    <TradeForm obj={memberData} />
  );
}
