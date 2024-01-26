import TopNavigationBar from "./TopNavigationBar";

const headerStyle = {
  backgroundColor: '#e6e6dd'
};

const Header = (props) => {
  const { route } = props;
  return (
    <header style={headerStyle}>
      <img src="./images/goForage.png" alt="logo" />
      <TopNavigationBar route={route} />
    </header>
  );
};

export default Header;