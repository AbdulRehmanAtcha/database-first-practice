import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, onSnapshot, query } from "firebase/firestore";
import './App.css';
import logo from './icons/facebook.png';
import home from './icons/home.png';
import watch from './icons/watch.png';
import market from './icons/marketplace.png';
import group from './icons/user-group.png';
import gaming from './icons/gaming.png';
import dots from './icons/dots.png';
import messenger from './icons/messenger.png';
import bell from './icons/bell.png';
import arrow from './icons/arrow.png';
import user from './icons/profile-user.png'
import { useState, useEffect } from 'react';
import moment from 'moment';



const firebaseConfig = {
  apiKey: "AIzaSyAJGdAWeut7V4tFSgP5bSyvyi364AOePGw",
  authDomain: "firstdatabase-7cab1.firebaseapp.com",
  projectId: "firstdatabase-7cab1",
  storageBucket: "firstdatabase-7cab1.appspot.com",
  messagingSenderId: "638833129760",
  appId: "1:638833129760:web:1ffdf3a0ad555bf10a7f45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

function App() {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);

  const showPost = async (event) => {
    document.getElementById("input").value = "";
    event.preventDefault();
    console.log("Post Text", post);
    try {
      const docRef = await addDoc(collection(db, "Your Posts"), {
        yourPost: post,
        date: new Date().getTime()
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }

  useEffect(() => {
    const getPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "Your Posts"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => `, doc.data());
        setPosts((prev) => {
          let newArray = [...prev, doc.data()];
          return newArray
        });
      });
    }
    // getPosts();
    const RealTimeData = async ()=>{
      const q = query(collection(db, "Your Posts"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push(doc.data());
        });

        setPosts(posts);
        console.log("My posts: ", posts.join(", "));
      });
    }
    RealTimeData();
  }, [])

  return (
    <body>
      <div className="header">
        <div className="head-left">
          <img src={logo} alt="LOGO" height="45" width="45" />
          <input type="text" placeholder='Search Facebook' />
        </div>
        <div className="head-mid">
          <img src={home} alt="Home" width="30" height="30" />
          <img src={watch} alt="Home" width="30" height="30" />
          <img src={market} alt="Home" width="30" height="30" />
          <img src={group} alt="Home" width="30" height="30" />
          <img src={gaming} alt="Home" width="30" height="30" />
        </div>
        <div className="head-right">
          <button><img src={dots} alt="Menu" width="20" height="20" /></button>
          <button><img src={messenger} alt="Menu" width="20" height="20" /></button>
          <button><img src={bell} alt="Menu" width="20" height="20" /></button>
          <button><img src={arrow} alt="Menu" width="20" height="20" /></button>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="main">
        <div className="main-left"></div>
        <div className="main-mid">
          <div className="box">
            <img src={user} alt="User" height="50" width="50" />
            <form onSubmit={showPost}>
              <textarea id="input" type="text" onChange={(e) => {
                setPost(e.target.value)
              }} placeholder="What's on your mind, user?" />
              <button type='submit'>Post</button>
            </form>
          </div>
          <br />
          <br />
          <div className="posts">
            {posts.map((eachPost, i) => (
              <div className="post" key={i}>
                <div className="post-head">
                  <img src={user} alt="User" height="50" width="50" />
                  <div className="post-head-content">
                    <h2>User</h2>
                    <p>{moment(eachPost.date).format('Do MMMM , h:mm: a')}</p>
                  </div>
                </div>
                <br />
                <hr />
                <p id="userPost">{eachPost?.yourPost}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="main-right"></div>
      </div>
    </body>
  );
}

export default App;
