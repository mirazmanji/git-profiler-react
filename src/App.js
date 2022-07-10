import "./App.css";
import { useState, CSSProperties } from "react";
import Header from "./components/Header.js";
import Lookup from "./components/Lookup.js";
import Profile from "./components/Profile";
import { axiosGitUser, axiosCache, axiosOpenAI } from "./config";
import Summary from "./components/Summary.js";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  let [userName, setUsername] = useState("");
  let [userPhoto, setPhoto] = useState("");
  let [photoTitle, setPhotoTitle] = useState("");
  let [userStars, setStars] = useState(0);
  let [userRepos, setRepos] = useState([])
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#0d6efd");

  const updateUserName = (e) => {
    setUsername(e.target.value.toLowerCase());
  };

  const clearPage = () => {
    setPhoto("")
    setPhotoTitle("")
    setStars(0)
    setRepos([])
    setLoading(true)

  }

  const fetchData = async () => {
    clearPage()
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
    } else {
      setLoading(false)
    }
  };

  const fetchCacheData = async () => {
    try {
      //const data = await axiosCache.get(userName);
      const data = await axiosOpenAI.get(userName)
      if (data.status === 200) {
        setStars(data.data.stars);
        setPhoto(data.data.avatarURL);
        setPhotoTitle(data.data.handle);
        setRepos(data.data.repoReadMes)
        console.log({
          message: "Data retrieved from cache",
          data: data,
          repo: userRepos
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
  const summaryArray = [{'summary': 'Hello'}, {'summary':'World'}]
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
          ) : (
          <div className="container">
            <div className="d-flex justify-content-center">
              <ClipLoader color={color} loading={loading} size={150} />
            </div>
          </div>
          )
        }
        </div>
        <div className="col-md-4">&nbsp;</div>
      </div>
      {userPhoto ? (
      <div className="container">
        <div className="row align-items-start mt-2">
        <Summary repos={userRepos}/>
        </div>
      </div>
      ) : null }

    </div>
  );
}
export default App;
