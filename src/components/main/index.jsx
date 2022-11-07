import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  orderBy,
  deleteDoc, 
  updateDoc
} from "firebase/firestore";
import './style.css'
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
import { useFormik } from 'formik';
import * as yup from 'yup';



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

function Main() {
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState({
    editingId: null,
    editingText: ""
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      post: '',
    },
    validationSchema: yup.object({
      title: yup
        .string('Enter Your Post Title')
        .max(100, 'Limit Exceed!')
        .required('Title is required'),
      post: yup
        .string('Enter your post')
        .max(310, 'Limit Exceed!')
        .required('Post is required'),
    }),
    onSubmit: async (values) => {
      try {
        
        const docRef = await addDoc(collection(db, "Your Posts"), {
          yourPost: values.post,
          date: serverTimestamp(),
          yourTitle: values.title
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
  });

  // const showPost = async (event) => {
  //   document.getElementById("input").value = "";
  //   document.getElementById("title").value = "";
  //   event.preventDefault();
  //   console.log("Post Text", post);
  //   try {
  //     const docRef = await addDoc(collection(db, "Your Posts"), {
  //       yourPost: post,
  //       date: new date().getTime(),
  //       yourTitle: title
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }

  // }



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
    const RealTimeData = async () => {
      
      const q = query(collection(db, "Your Posts"), orderBy("date", "desc"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((doc) => {
          // posts.push(doc.data());
          posts.push({ id: doc.id, ...doc.data() });
        });

        setPosts(posts);
        console.log("My posts: ", posts);
      });
    }
    RealTimeData();
  }, [])


  const deletePost = async(postID)=>{
    await deleteDoc(doc(db, "Your Posts", postID));
    console.log(postID)
  }


  const updatePost = async (e) => {
    e.preventDefault();

    await updateDoc(doc(db, "Your Posts", editing.editingId), {
      yourPost: editing.editingText
    });

    setEditing({
      editingId: null,
      editingText: ""
    })

  }

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
        <div className="main-mid">
          <div className="box">
            <form onSubmit={formik.handleSubmit}>
              <input name="title" type="text" placeholder="Enter Title Of Your Post..." id="title" value={formik.values.title} onChange={formik.handleChange} />

              <span>{formik.touched.title}  {formik.errors.title}</span>
              <textarea name="post" cols="50" rows="6" id="input" value={formik.values.post} onChange={formik.handleChange}></textarea>
              <br />
              <span>{formik.touched.post}  {formik.errors.post}</span>
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
                    <p>{
                    moment(
                      (
                      eachPost?.date?.seconds) ? eachPost?.date?.seconds * 1000
                      :
                      undefined)
                    .format('Do MMMM , h:mm a')}</p>
                  </div>
                  <div className="buttons">
                    <button onClick={()=>{
                      deletePost(eachPost?.id)
                    }}>Delete</button>
                    {(editing.editingId === eachPost?.id) ? null :
              <button onClick={() => {

                setEditing({
                  editingId: eachPost?.id,
                  editingText: eachPost?.text
                })

              }} >Edit</button>
            }

                  </div>
                </div>
                <br />
                <hr />
                <h2 id="post-title">{eachPost?.yourTitle}</h2>
                <br />
                <p id="userPost">{(eachPost.id === editing.editingId) ?
                <form onSubmit={updatePost}>

                  <input
                  id="change-value"
                    type="text"
                    value={editing.editingText}
                    onChange={(e) => {
                      setEditing({
                        ...editing,
                        editingText: e.target.value
                      })
                    }}
                     />

                  <button type="submit" id="Update">Update</button>
                </form>
                :
                eachPost?.yourPost}</p>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </body>
  );
}
export default Main;