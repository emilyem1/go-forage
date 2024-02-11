import MushroomCard from "./MushroomCard";
import { Card, CardContent } from "@mui/material";

const Account = (props) => {
  const { users, friendData, setSelectedRoute, setUserSelected } = props;

  const user_id = parseInt(users.user_id);

  const numberOfFollows = friendData[user_id] ? friendData[user_id].length : 0;

  const getNumberOfFollowers = (userId) => {
    // Iterate over the friendData object using reduce
    return Object.values(friendData).reduce((count, friendsArray) => {
      // Check if the friendsArray contains the user with the specified user ID
      const isFollowing = friendsArray.some((friend) => friend.id === userId);
      // If the user is found in the friendsArray, increment the count
      if (isFollowing) {
        count++;
      }
      return count;
    }, 0); // Initialize count to 0
  };
  const numberOfFollowers = friendData[user_id]
    ? getNumberOfFollowers(user_id)
    : 0;

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
          width: "70vw",
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
            marginLeft: "33%",
          }}
        >
          <h4
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
          </h4>
          <h4 style={{ border: "2px solid white", padding: "1.5%"}}>
            {" "}
            FOLLOWING: {numberOfFollows}
          </h4>
          <h4
            style={{
              border: "2px solid white",
              padding: "1.5%",
              marginLeft: "2%",
            }}
          >
            FOLLOWERS: {numberOfFollowers}
          </h4>
        </CardContent>
      </Card>
      <section
        style={{
          display: "flex",
          width: "70vw",
          marginBottom: "3%",
          marginTop: "-1%",
        }}
      >
        <div style={{width:"30%", backgroundColor:"#4D6A66"}}>
          <MushroomCard
            fullname={users.fullname}
            email={users.email}
            profilePhoto={users.profilePhoto}
          />
        </div>
        <Card
          sx={{
            width: "50vw",
            borderRadius: "0",
          }}
        >
          {friendData[user_id] ? (
            friendData[user_id].map((friend) => {
              return (
                <CardContent
                  onClick={() => {
                    setUserSelected({
                      id: friend.id,
                      fullname: friend.name,
                      email: friend.email,
                      password: "asd",
                      photo_url: friend.avatar,
                    });
                    setSelectedRoute("USERBLOGS");
                  }}
                  key={friend.id}
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
                  <div> {friend.name}</div>
                </CardContent>
              );
            })
          ) : (
            <div>Not following any foragers yet!</div>
          )}

          {/* {friendData
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
            )} */}
        </Card>
      </section>
    </main>
  );
};

export default Account;
