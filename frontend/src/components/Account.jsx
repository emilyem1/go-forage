import MushroomCard from "./MushroomCard";
import { Card, CardContent } from "@mui/material";

const Account = (props) => {
  const { users, friendData, setSelectedRoute, setUserSelected } = props;

  const user_id = parseInt(users.user_id);

  const filteredUserData = friendData.filter(
    (user) => user_id === user.user_id
  );
  const numberOfFollows =
    filteredUserData.length > 0 ? filteredUserData[0].friends.length : 0;

  const numberOfFollowers = friendData.reduce((count, user) => {
    const friends = user.friends.map((friend) => friend.user_id);
    if (friends.includes(user_id)) {
      count++;
    }
    return count;
  }, 0);
  const handleClick = () => {
    setSelectedRoute("BOOKMARKS");
  };

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Card
        sx={{
          width: "50vw",
          margin: "2% 0 0 0",
          backgroundColor: "#4D6A66",
          color: "white",
        }}
      >
        <CardContent
          sx={{
            fontFamily: "Roboto",
            display: "flex",
            justifyContent: "center",
            marginLeft: "38%",
          }}
        >
          <h5
            onClick={handleClick}
            style={{
              backgroundColor: "#c74343",
              padding: "1.5%",
              marginRight: "2%",
              color: "white",
              border: "2px solid white",
              cursor: "pointer",
            }}
          >
            BOOKMARKS
          </h5>
          <h5 style={{ border: "2px solid white", padding: "1.5%" }}>
            {" "}
            FOLLOWING: {numberOfFollows}
          </h5>
          <h5
            style={{
              border: "2px solid white",
              padding: "1.5%",
              marginLeft: "2%",
            }}
          >
            FOLLOWERS: {numberOfFollowers}
          </h5>
        </CardContent>
      </Card>
      <section
        style={{
          display: "flex",
          width: "50vw",
          marginBottom: "3%",
          marginTop: "-1%",
        }}
      >
        <MushroomCard
          fullname={users.fullname}
          email={users.email}
          profilePhoto={users.profilePhoto}
        />
        <Card
          sx={{
            width: "50vw",
            borderRadius: "0",
          }}
        >
          {friendData
            .filter((user) => user_id === user.user_id)
            .map((user) =>
              user.friends.map((friend) => (
                <CardContent
                  onClick={() => {
                    setUserSelected({
                      id: friend.user_id,
                      fullname: friend.user_name,
                      email: friend.email,
                      password: "asd",
                      photo_url: friend.avatar,
                    });
                    setSelectedRoute("USERBLOGS");
                  }}
                  key={friend.user_id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "2em",
                    "&:hover": {
                      border: "4px solid #879b65",
                      cursor: "pointer",
                    },
                  }}
                >
                  <img
                    style={{
                      width: "5em",
                      padding: "5%",
                    }}
                    src={friend.avatar}
                  />
                  <div> {friend.user_name}</div>
                </CardContent>
              ))
            )}
        </Card>
      </section>
    </main>
  );
};

export default Account;
