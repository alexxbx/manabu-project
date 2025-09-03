import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup({ onClose }) {
    const [form, setForm] = useState({ username: '', password: '', email: '' });
    const [message, setMessage] = useState('');
    const [rgpdAccepted, setRgpdAccepted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();

    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 8) errors.push('8 caractères minimum');
        if (!/[A-Z]/.test(password)) errors.push('une majuscule');
        if (!/[a-z]/.test(password)) errors.push('une minuscule');
        if (!/[0-9]/.test(password)) errors.push('un chiffre');
        if (!/[!@#$%^&*]/.test(password)) errors.push('un caractère spécial (!@#$%^&*)');
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));

        if (name === 'password') {
            const errors = validatePassword(value);
            setPasswordError(errors.length ? `Le mot de passe doit contenir : ${errors.join(', ')}` : '');
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();

        if (!rgpdAccepted) {
            setMessage('❌ Vous devez accepter les conditions d’utilisation pour continuer.');
            return;
        }

        const passwordErrors = validatePassword(form.password);
        if (passwordErrors.length > 0) {
            setMessage('❌ Le mot de passe ne respecte pas les critères de sécurité.');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const res = await axios.post('https://manabu-app.fr/api/register', form);

            // Message succès
            setMessage('✅ Compte créé avec succès !');

            // Réinitialiser le formulaire
            setForm({ username: '', email: '', password: '' });
            setRgpdAccepted(false);

            // Fermer la popup après 1.5s (optionnel)
            setTimeout(() => {
                onClose(); // si tu veux rediriger directement
            }, 1500);
        } catch (err) {
            setMessage('❌ Erreur lors de l’inscription.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-[#F4E1C1] rounded-lg shadow-lg p-8 w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 hover:text-black text-lg"
                >
                    ✖
                </button>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Inscription</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Nom d'utilisateur"
                        value={form.username}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Mot de passe"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                    {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}

                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={rgpdAccepted}
                            onChange={(e) => setRgpdAccepted(e.target.checked)}
                            className="h-4 w-4 text-[#D93F3F] border-gray-300 rounded"
                        />
                        <span>
                            J'accepte les{' '}
                            <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-[#D93F3F] underline hover:text-red-600">
                                conditions d'utilisation
                            </a>
                        </span>
                    </label>

                    <button
                        type="submit"
                        disabled={loading || !rgpdAccepted}
                        className={`w-full py-2 px-4 rounded-md shadow-sm text-white ${!rgpdAccepted ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#D93F3F] hover:bg-red-600'
                            }`}
                    >
                        {loading ? 'Enregistrement...' : "S'inscrire"}
                    </button>
                </form>

                {message && (
                    <div className={`mt-4 text-center text-sm ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Signup;
