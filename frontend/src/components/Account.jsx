import MushroomCard from "./MushroomCard";
import { Card, CardContent } from "@mui/material";

const Account = (props) => {
  const { users, friendData, setSelectedRoute, setUserSelected } = props;
  const user_id = parseInt(users.user_id);
  const numberOfFollows = friendData.filter(
    (user) => user_id === user.user_id
  )[0].friends.length;


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
          width: "60vw",
          margin: "2% 0 0 0",
          backgroundColor: "#4D6A66",
          color: "white",
        }}
      >
        <CardContent>
          <h1 style={{ fontFamily: "Roboto", marginLeft: "30%" }}>
            Forager Account
          </h1>
        </CardContent>
      </Card>
      <section
        style={{
          display: "flex",
          width: "60vw",
          marginBottom: "3%",
          marginTop: "-1%",
        }}
      >
        <MushroomCard
          fullname={users.fullname}
          email={users.email}
          profilePhoto={users.profilePhoto}
          numberOfFollows={numberOfFollows}
        />
        <Card
          sx={{
            width: "44vw",
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
