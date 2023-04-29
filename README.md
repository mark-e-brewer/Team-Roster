# A-Team

A-Team is a react/next.js project where you put together teams of user created members and trade them with your friends and other teams.
## [View App](https://a-team-roster.netlify.app)

## About the User
  - The Ideal User is anyone looking to have some fun and express themselfs or someone looking to keep organized visual repreentations of groups they manage.
  - A teacher may use this app to create and keep track of student groups or students themselfs may use this to create groups and divvy up roles.
  - This app couold be used to get students excitted about being in groups as they get to represent themselfs in fun ways.

## Features
  - Users and create Teams with a photo and then add members to those teams.
  - a user can search for teams or members by name.
  - Teams and member info can be updated.
  - Teams and members can be Deleted.
  - Users can choose to trade a member to another team.

## Project Screenshots'
  <img width="1148" src="https://user-images.githubusercontent.com/119375745/235309970-32b0c700-4b9d-4a57-95ad-846858a3ef15.png">
  <img width="1148" src="https://user-images.githubusercontent.com/119375745/235309962-2a3f9c4d-4a11-4acd-ae3a-75270075513e.png">
  <img width="1148" src="https://user-images.githubusercontent.com/119375745/235309957-f124b11e-b0af-429f-84b8-075ea78ea405.png">
  <img width="1148" src="https://user-images.githubusercontent.com/119375745/235309938-324d8ee3-f44e-41c6-93cf-5a36150e328a.png">
## Code Snippet

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

## Contributors
  - [Mark Brewer] (https://github.com/markbrew3)
