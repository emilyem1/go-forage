import TopNavigationBar from "./TopNavigationBar";

const headerStyle = {
  backgroundColor: '#e6e6dd'
};

const Header = (props) => {
  const { route, userData, value, setValue, setSearchTerm } = props;
  return (
    <header style={headerStyle}>
      <img src="./images/goForage.png" alt="logo" />
      <TopNavigationBar route={route} userData={userData} value={value} setValue = {setValue} setSearchTerm = {setSearchTerm}/>
    </header>
  );
};

export default Header;