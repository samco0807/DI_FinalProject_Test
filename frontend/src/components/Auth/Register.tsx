// frontend/src/components/Auth/Register.tsx
import React, { useState, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { registerUser } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'volunteer',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(registerUser(formData));
    if (registerUser.fulfilled.match(resultAction)) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="auth-container">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom :</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email :</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Rôle :</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="volunteer">Bénévole</option>
            <option value="organizer">Organisateur</option>
          </select>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Inscription...' : 'S\'inscrire'}
        </button>
      </form>
    </div>
  );
};

export default Register;