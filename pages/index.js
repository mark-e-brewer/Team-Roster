import { useAuth } from '../utils/context/authContext';
import ProfileCard from '../components/ProfileCard';

function Home() {
  const { user } = useAuth();

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Hello {user.displayName}! </h1>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '50vh',
          padding: '50px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <div>
          <ProfileCard />
        </div>
      </div>
    </>
  );
}

export default Home;
