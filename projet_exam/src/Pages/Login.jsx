import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm({ onClose }) {
    const [form, setForm] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = e => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('https://manabu-app.fr/api/login_check', form);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.user.id);
            setMessage('✅ Connexion réussie !');
            navigate('/Profile');
            onClose(); // ferme la popup après succès
        } catch (err) {
            setMessage('❌ Identifiants incorrects.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="max-w-md w-full bg-[#F4E1C1] rounded-lg shadow-md p-8 relative">
                {/* Bouton fermer */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 hover:text-black text-lg"
                >
                    ✖
                </button>

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Connexion</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="username"
                            name="username"
                            placeholder="Nom d'utilisateur"
                            value={form.username}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Mot de passe"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#D93F3F] hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                    >
                        Se connecter
                    </button>
                </form>



                {message && (
                    <div className={`mt-4 text-center text-sm ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                        {message}
                    </div>
                )}

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Pas encore de compte ?{' '}
                        <button
                            onClick={() => navigate('/Signup')}
                            className="font-medium text-[#D93F3F]"
                        >
                            S'inscrire
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
