import MushroomCard from "./MushroomCard";

const Account = () => {
  const cookies = document.cookie; // Just a string, must turn into object:
  const cookieObject = cookies.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {});
  // For easy access:
  const fullname = cookieObject.fullname;
  const email = cookieObject.email;
  const profilePhoto = cookieObject.profilePhoto;
  return (
    <main style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <MushroomCard fullname={fullname} email={email} profilePhoto={profilePhoto} />
    </main>
  );
};

export default Account;