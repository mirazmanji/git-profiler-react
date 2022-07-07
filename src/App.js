import "./App.css";
import { useState } from "react";
import Header from "./components/Header.js";
import Lookup from "./components/Lookup.js";
import Profile from "./components/Profile";
import { axiosGitUser, axiosCache } from "./config";
import Summary from "./components/Summary";

function App() {
  const [userName, setUsername] = useState("");
  const [userPhoto, setPhoto] = useState("");
  const [photoTitle, setPhotoTitle] = useState("");
  const [userStars, setStars] = useState(0);

  const updateUserName = (e) => {
    setUsername(e.target.value.toLowerCase());
  };

  const fetchData = async () => {
    if (!(await fetchCacheData())) {
      let data = [];
      let success = true;
      try {
        data = await axiosGitUser.get(userName);
        setStars(data.data.stars);
        setPhoto(data.data.avatarURL);
        setPhotoTitle(data.data.handle);
      } catch (err) {
        console.log({
          message: "Caught error on attempt to request new data",
          error: err.message,
        });
        alert(`${err.message}\r\nThe GitHub username may be invalid, or the API server is down.`)
        success = false;
      } finally {
        if (success) {
          try {
            const createDocument = {
              id: data.data.id,
              stars: data.data.stars,
              avatarURL: data.data.avatarURL,
              handle: data.data.handle.toLowerCase(),
            };
            const update = await axiosCache.post("/", createDocument);
            console.log({
              message: "Data successfully added to cache",
              data: update
            });
          } catch (err) {
            console.log({
              message: "Caught error on attempt to update cache",
              error: err.message,
            });
          }
        }
      }
    }
  };

  const fetchCacheData = async () => {
    try {
      const data = await axiosCache.get(userName);
      if (data.status === 200) {
        setStars(data.data.stars);
        setPhoto(data.data.avatarURL);
        setPhotoTitle(data.data.handle);
        console.log({
          message: "Data retrieved from cache",
          data: data
        });
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log({
        message: "Caught error on attempt retrieve data from cache",
        error: err.message,
      });
      return false;
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="row">
        <div className="col-md-4">&nbsp;</div>
        <div className="col-md-4">
          <Lookup
            userName={userName}
            updateUserName={updateUserName}
            fetchUser={fetchData}
          />
          {userPhoto ? (
            <Profile
              userPhoto={userPhoto}
              userName={photoTitle}
              stars={userStars}
            />
          ) : null}
          <Summary summaryText='Hello World'/>
        </div>
        <div className="col-md-4">&nbsp;</div>
      </div>
    </div>
  );
}
export default App;
