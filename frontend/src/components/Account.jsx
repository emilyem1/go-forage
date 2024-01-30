import MushroomCard from "./MushroomCard";

const Account = (props) => {
  const { users } = props;
  return (
    <main style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <MushroomCard fullname={users.fullname} email={users.email} profilePhoto={users.profilePhoto} />
    </main>
  );
};

export default Account;