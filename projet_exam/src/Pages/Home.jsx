import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LoginForm from './Login';
import RegisterForm from './Signup';
import { FaInstagram, FaFacebook, FaTwitter, FaApple, FaGooglePlay, FaTiktok } from 'react-icons/fa';
import { Link } from 'react-router-dom';


function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [open, setOpen] = useState(false);
  const goComingSoon = () => navigate('/coming-soon');
  const navigate = useNavigate();
  return (
    <div className="Home">
      <header className="flex justify-between items-center px-4 md:px-6 w-full h-[60px] sm:h-[80px] md:h-[103px] bg-[#F4E1C1] shadow-[0px_10px_30px_10px_rgba(0,0,0,0.15)]">
        <img href="#" src="/logosite.png" alt="logo" className="h-12 sm:h-16 md:h-24" />
        <button
          onClick={() => setShowLogin(true)}
          className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 bg-[#D93F3F] text-white rounded-full hover:bg-red-600 text-xs sm:text-sm md:text-base"
        >
          Se connecter
        </button>

        {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
      </header>
      <div className="relative justify-center flex flex-row w-full h-[200px] sm:h-[300px] md:h-[426px] bg-gradient-to-b from-[#264653] to-stone-400/0">
        <div className="absolute left-0 top-0">
          <img src="/Sakura.svg" alt="sakura" className="w-12 sm:w-16 md:w-32" />
        </div>
        <div className="flex items-center justify-center w-full">
          <img src="/Vector.svg" alt="sun" className="hidden md:block absolute right-[650px] h-[297px] w-[336px]" />
          <div className="hover:shadow-[4px_38px_30px_0px_rgba(0,0,0,0.25)] text-center md:absolute md:right-[400px] h-[200px] sm:h-[280px] md:h-[358px] w-[200px] sm:w-[280px] md:w-[322px] p-3 sm:p-4 md:p-8 bg-[#F4E1C1] rounded-[30px] sm:rounded-[50px]">
            <h1 className="font-bold text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2">ようこそ !</h1>
            <p className="text-gray-600 text-sm sm:text-base mb-1 sm:mb-2 md:mb-4">(Bienvenue !)</p>
            <p className="font-customFont text-sm sm:text-base md:text-lg mb-4 sm:mb-8 md:mb-12">Votre aventure en japonais commence ici. Essayez gratuitement !</p>
            <button onClick={() => setOpen(true)} className="w-full bg-[#D93F3F] text-white py-1.5 sm:py-2 md:py-3 rounded-full hover:bg-red-600 text-xs sm:text-sm md:text-base">
              Nous rejoindre
            </button>

            {open && <RegisterForm onClose={() => setOpen(false)} />}
          </div>
        </div>
      </div>
      <div className="min-[1024px]:block w-100 h-64 bg-[#F4E1C1] flex space-x-4">
        <img src="/TempleA.svg" alt="temple" className="absolute top-[220px] left-[100px] h-96" />
        <img src="/Shrine.svg" alt="torii" className="absolute top-[350px] left-[500px] h-64" />
        <img src="/TempleB.svg" alt="temple" className="absolute top-[250px] right-[100px] h-96" />
        <img src='/flower.svg' alt='flower' className='absolute bottom-8 h-6' />
        <img src='/flower.svg' alt='flower' className='absolute right-8 bottom-[100px] h-6' />
        <img src='/flower.svg' alt='flower' className='absolute bottom-2 left-60 h-6' />
        <img src='/flower.svg' alt='flower' className='absolute bottom-1 right-[300px] h-6' />
        <img src='/flower.svg' alt='flower' className='absolute bottom-[20px] right-[600px] h-6' />
        <img src='/flower.svg' alt='flower' className='absolute -bottom-[40px] right-[800px] h-6' />
        <img src='/flower.svg' alt='flower' className='absolute bottom-20 left-[500px] h-6' />
      </div>
      <div className="mt-4 sm:mt-8 md:mt-16 px-3 sm:px-4 md:px-8 flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-10 max-w-7xl mx-auto">
        <div className="flex flex-col justify-center items-center h-[300px] sm:h-[400px] md:h-[522px] w-full md:w-[428px] bg-[#F4E1C1] p-4 sm:p-6 md:p-8 rounded-[30px] sm:rounded-[50px] hover:shadow-[5px_4px_31px_0px_rgba(0,0,0,0.25)] text-center">
          <img src="/teacher-icon.svg" alt="teacher" className="w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 mx-auto mb-3 sm:mb-4 md:mb-6" />
          <p className="text-sm sm:text-base md:text-lg">Des leçons interactives qui s'adaptent à votre niveau et à votre rythme.</p>
        </div>
        <div className="flex flex-col justify-center items-center h-[300px] sm:h-[400px] md:h-[522px] w-full md:w-[428px] bg-[#F4E1C1] p-4 sm:p-6 md:p-8 rounded-[30px] sm:rounded-[50px] hover:shadow-[5px_4px_31px_0px_rgba(0,0,0,0.25)] text-center">
          <img src="/badge-icon.svg" alt="badge" className="w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 mx-auto mb-3 sm:mb-4 md:mb-6" />
          <p className="text-sm sm:text-base md:text-lg">Débloquez des badges, relevez des défis et grimpez dans le classement !</p>
        </div>
        <div className="flex flex-col justify-center items-center h-[300px] sm:h-[400px] md:h-[522px] w-full md:w-[428px] bg-[#F4E1C1] p-4 sm:p-6 md:p-8 rounded-[30px] sm:rounded-[50px] hover:shadow-[5px_4px_31px_0px_rgba(0,0,0,0.25)] text-center">
          <img src="/brain-icon.svg" alt="brain" className="w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 mx-auto mb-3 sm:mb-4 md:mb-6" />
          <p className="text-sm sm:text-base md:text-lg">Mémorisez durablement grâce à la répétition espacée, une méthode scientifiquement prouvée.</p>
        </div>
      </div>
      <div className="mt-4 sm:mt-8 md:mt-16 py-6 sm:py-8 md:py-12 bg-neutral-600 text-white">
        <h2 className="text-xl sm:text-2xl md:text-4xl text-center mb-6 sm:mb-8 md:mb-12">Coming soon !</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto text-center px-3 sm:px-4 md:px-0">
          <div>
            <img src="/friends-icon.svg" alt="friends" className="w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 mx-auto mb-3 sm:mb-4 md:mb-6" />
            <p className="text-xs sm:text-sm md:text-base">Affrontez vos amis dans des quiz amusants et apprenez ensemble.</p>
          </div>
          <div>
            <img src="/offline-icon.svg" alt="offline" className="w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 mx-auto mb-3 sm:mb-4 md:mb-6" />
            <p className="text-xs sm:text-sm md:text-base">Apprenez même sans connexion : téléchargez vos leçons et continuez partout.</p>
          </div>
          <div>
            <img src="/feedback-icon.svg" alt="feedback" className="w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 mx-auto mb-3 sm:mb-4 md:mb-6" />
            <p className="text-xs sm:text-sm md:text-base">Des retours personnalisés par des experts pour perfectionner votre japonais.</p>
          </div>
        </div>
      </div>
      <footer className="mt-2 sm:mt-4 bg-[#F4E1C1] py-4 sm:py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          <div>
            <img src="/logosite.png" alt="logo" className="h-12 sm:h-16 md:h-24 mb-3 sm:mb-4" />
            <div className="flex gap-6">
              <button onClick={goComingSoon} className="text-gray-700 hover:text-pink-500 text-3xl"><FaInstagram /></button>
              <button onClick={goComingSoon} className="text-gray-700 hover:text-blue-600 text-3xl"><FaFacebook /></button>
              <button onClick={goComingSoon} className="text-gray-700 hover:text-blue-400 text-3xl"><FaTwitter /></button>
              <button onClick={goComingSoon} className="text-gray-700 hover:text-blue-400 text-3xl"><FaTiktok /></button>

            </div>
          </div>
          <div>
            <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">À propos</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li><Link to="/about-us" className="text-gray-700 hover:text-gray-900">Qui sommes-nous ?</Link></li>
              <li><Link to="/user-reviews" className="text-gray-700 hover:text-gray-900">Avis des utilisateurs</Link></li>
              <li><Link to="/contact" className="text-gray-700 hover:text-gray-900">Nous contacter</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Télécharger la version mobile</h3>
            <div className="flex space-x-3 sm:space-x-4">
              <button onClick={goComingSoon} className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900"><FaApple /> App Store</button>
              <button onClick={goComingSoon} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"><FaGooglePlay /> Google Play</button>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Conditions d'utilisation et confidentialité</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li><Link to="/community-guidelines" className="text-gray-700 hover:text-gray-900">Règles de conduite de la communauté</Link></li>
              <li><Link to="/terms" className="text-gray-700 hover:text-gray-900">Conditions d'utilisation</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-700 hover:text-gray-900">Politique de confidentialité</Link></li>
              <li><Link to="/legal-notice" className="text-gray-700 hover:text-gray-900">Mentions légales</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
