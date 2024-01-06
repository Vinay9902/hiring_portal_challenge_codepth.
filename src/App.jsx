import Navbar from "./components/Navbar/Navbar"
import Header from "./components/Header/Header"
import SearchBar from "./components/SearchBar/SearchBar"
import JobCard from "./components/JobCard/JobCard"
import jobData from "./JobDummyData"
import { useEffect, useState } from "react"
import { collection, query, where, getDocs,orderBy } from "firebase/firestore";
import { db,auth } from "./firebase.config"
import Login from "./components/Login/Login"
import Signup from "./components/Signup/Signup"
import Home from "./components/Home/Home"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  const [jobs, setJobs] = useState([]);
  const [customSearch, setCustomSearch] = useState(false);

  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);

  const fetchJobs = async () => {
    setCustomSearch(false);
    const tempJobs = []
    const jobsRef = query(collection(db, "jobs"));
    const q = query(jobsRef, orderBy("postedOn","desc"));
    const req = await getDocs(q);

    req.forEach((job) => {
      // console.log(doc.id, " => ", doc.data());
      tempJobs.push({
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn.toDate()
      })

    });
    setJobs(tempJobs);
  }
  const fetchJobsCustom = async (jobCriteria) => {
    setCustomSearch(true);
    const tempJobs = []
    const jobsRef = query(collection(db, "jobs"));
    const q = query(jobsRef, where("type", "==", jobCriteria.type),where("title", "==", jobCriteria.title),where("location", "==", jobCriteria.location),where("experience", "==", jobCriteria.experience),orderBy("postedOn","desc"));
    const req = await getDocs(q);

    req.forEach((job) => {
      tempJobs.push({
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn.toDate()
      })

    });
    setJobs(tempJobs);
  }

  useEffect(()=>{
    fetchJobs();
  },[])


  return (
    <>
      <Navbar />
      <Header />
      <SearchBar fetchJobsCustom={fetchJobsCustom}/>
      {customSearch && 
      <button onClick={fetchJobs} className="flex pl-[1250px] mb-2">
        <p className="bg-blue-500 px-10 py-2 rounded-md text-white">Clear Filters</p>
      </button>
      }
      {jobs.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}

      <Router>
        <Routes>
          <Route path="/" element={<Home name={userName} />} />         
          <Route path = "/login" element={<Login/>}/>  
          <Route path = "/signup" element={<Signup/>}/>  
        </Routes>
      </Router>

    </>
  )
}

export default App
