import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Lessons from './Pages/Lessons';
import Profile from './Pages/Profile';
import Leaderboard from './Pages/Leaderboard';
import Quiz from './Pages/Quiz';
import Review from './Pages/Review';
import Flashcards from './Pages/Flashcards';
import ImmersionMode from './Pages/ImmersionMode';
import Multiplayer from './Pages/Multiplayer';
import Chat from './Pages/Chat';
import Dashboard from './Pages/Dashboard';
import LessonQuiz from './Pages/LessonQuiz';
import Terms from './Pages/Terms';
import ComingSoon from './Pages/ComingSoon';
import AboutUs from './Pages/AboutUs';
import CommunityRules from './Pages/CommunityRules';
import PrivacyPolicy from './Pages/PrivacyPolicy';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path='/Lessons' element={<Lessons />} />
        <Route path='/Leaderboard' element={<Leaderboard />} />
        <Route path="/Quiz" element={<Quiz />} />
        <Route path='/Review' element={<Review />} />
        <Route path="/Flashcards" element={<Flashcards />} />
        <Route path="/ImmersionMode" element={<ImmersionMode />} />
        <Route path="/Multiplayer" element={<Multiplayer />} />
        <Route path="*" element={<div>Page not found</div>} />
        <Route path='/Chat' element={<Chat />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/admin' element={<Dashboard />} />
        <Route path="/lessons/:id" element={<LessonQuiz />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/community-guidelines" element={<CommunityRules />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
}

export default App;