import './Home.css';
import logo from '../logo1.png';
import { collection, addDoc } from "firebase/firestore";
import React,{useState, useEffect} from 'react';
import {db, storage} from './Firebase/Firebase';



function Home() {
  const members = [
    {profile:"https://media.licdn.com/dms/image/D5603AQGrZzz5sbPbyA/profile-displayphoto-shrink_800_800/0/1707255339779?e=1718841600&v=beta&t=UmuCGAlKMe1mpVaANwksfSzrGE6JGLLy-03KAXDe9Xg", name:"Rista Subedi"},
    {profile:"https://media.licdn.com/dms/image/D5603AQGrZzz5sbPbyA/profile-displayphoto-shrink_800_800/0/1707255339779?e=1718841600&v=beta&t=UmuCGAlKMe1mpVaANwksfSzrGE6JGLLy-03KAXDe9Xg", name:"Rista Subedi"},
    {profile:"https://media.licdn.com/dms/image/D5603AQGrZzz5sbPbyA/profile-displayphoto-shrink_800_800/0/1707255339779?e=1718841600&v=beta&t=UmuCGAlKMe1mpVaANwksfSzrGE6JGLLy-03KAXDe9Xg", name:"Rista Subedi"},
    {profile:"https://media.licdn.com/dms/image/D5603AQGrZzz5sbPbyA/profile-displayphoto-shrink_800_800/0/1707255339779?e=1718841600&v=beta&t=UmuCGAlKMe1mpVaANwksfSzrGE6JGLLy-03KAXDe9Xg", name:"Rista Subedi"},
    {profile:"https://media.licdn.com/dms/image/D5603AQGrZzz5sbPbyA/profile-displayphoto-shrink_800_800/0/1707255339779?e=1718841600&v=beta&t=UmuCGAlKMe1mpVaANwksfSzrGE6JGLLy-03KAXDe9Xg", name:"Rista Subedi"},
    {profile:"https://media.licdn.com/dms/image/D5603AQGrZzz5sbPbyA/profile-displayphoto-shrink_800_800/0/1707255339779?e=1718841600&v=beta&t=UmuCGAlKMe1mpVaANwksfSzrGE6JGLLy-03KAXDe9Xg", name:"Rista Subedi"}
  ]

  const [posts, setPosts] = useState([]);
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const getPostsFromFirebase = [];
    const post = db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          getPostsFromFirebase.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        setPosts(getPostsFromFirebase);
      });
      return () => post();
  }, []);

  console.log(posts)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !file) {
      alert('Please enter a description and choose a file.');
      return;
    }

    try {
      // Upload file to Firebase Storage
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);

      // Get download URL of the uploaded file
      const fileUrl = await fileRef.getDownloadURL();

      // Add data to Firestore
      await db.collection('posts').add({
        postDescription: description,
        postImage: fileUrl,
        timestamp: new Date(),
      });

      // Fetch updated posts from Firestore
      const querySnapshot = await db
        .collection("posts")
        .orderBy("timestamp", "desc")
        .get();
      const newPosts = [];
      querySnapshot.forEach((doc) => {
        newPosts.push({
          ...doc.data(),
          key: doc.id,
        });
      });

      // Update state with the new posts
      setPosts(newPosts);

      // Reset form fields
      setDescription('');
      setFile(null);
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="Home">
      <div className="navbar">
        <img src={logo} />
        <img className="profile" src="https://media.licdn.com/dms/image/D5603AQGrZzz5sbPbyA/profile-displayphoto-shrink_800_800/0/1707255339779?e=1718841600&v=beta&t=UmuCGAlKMe1mpVaANwksfSzrGE6JGLLy-03KAXDe9Xg" />
      </div>

      <div className = "mainPage">
        <div className="sidebar">
          <h1>Members</h1>
          <p>Want to be a member?</p>
          <button>Be a Member</button>
          <div className="members">
            {members.map((item, index) => (
              <div className="member">
                <img src={item.profile} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rightbar">
          <form method="post" onSubmit={handleSubmit}>
            <div className="addPost">
              <input 
                className="inputText" 
                type="text" 
                placeholder="Enter the event description" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button type="submit">Post</button>
          </form>

          {posts.length > 0 ? (
            posts.map((post) => 
                <div className="posts">
                  <p>{post.postDescription}</p>
                  <img src={post.postImage} />
                </div>
              )
          ):(
            <p>No posts. Stay tuned for more events</p>
          )}
          
        </div>
      </div>
    </div>
  );
}

export default Home;
