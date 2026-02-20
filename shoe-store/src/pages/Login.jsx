import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { auth } from '../firebase';

import {
  setAuthenticated,
  setUser,
  setToken,
} from '../redux/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberEmail');
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEmailLogin = async () => {
    const email = formData.email.trim();
    const password = formData.password.trim();

    if (!email || !password) {
      toast.error('Please fill in both fields');
      return;
    }

    setLoading(true);
    try {
      if (rememberMe) {
        await setPersistence(auth, browserLocalPersistence);
        localStorage.setItem('rememberEmail', email);
      } else {
        localStorage.removeItem('rememberEmail');
      }

      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;

      const token = await user.getIdToken();
      dispatch(setToken(token));
      dispatch(
        setUser({
          username: user.displayName || email.split('@')[0],
          email: user.email,
          isAuthenticated: true,
          token,
        })
      );
      dispatch(setAuthenticated(true));

      localStorage.setItem('authToken', JSON.stringify({ access: token }));
      localStorage.setItem('lastUsername', user.displayName || email.split('@')[0]);

      toast.success('Welcome back to Cyman Wear!');
      const returnTo = new URLSearchParams(location.search).get('returnTo') || '/';
      setTimeout(() => navigate(returnTo), 1000);
    } catch (error) {
      const friendly =
        error.code === 'auth/invalid-credential'
          ? 'Invalid email or password.'
          : error.message || 'Email login failed.';
      toast.error(friendly);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const token = await user.getIdToken();
      const email = user.email ?? '';
      const displayName = user.displayName ?? email.split('@')[0];

      dispatch(setToken(token));
      dispatch(
        setUser({
          username: displayName,
          email,
          isAuthenticated: true,
          token,
        })
      );
      dispatch(setAuthenticated(true));
      localStorage.setItem('authToken', JSON.stringify({ access: token }));
      localStorage.setItem('lastUsername', displayName);

      toast.success('Signed in with Google — welcome to Cyman Wear!');
      setTimeout(() => navigate('/'), 500);
    } catch (error) {
      toast.error(error.message || 'Google sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="bg-gray-900 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Sign In to Cyman Wear</h2>

        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          className="mb-4 w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white placeholder-gray-400 rounded focus:ring-blue-500 focus:outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="mb-4 w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white placeholder-gray-400 rounded focus:ring-blue-500 focus:outline-none"
        />

        <label className="flex items-center mb-4 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="mr-2"
          />
          Remember Me
        </label>

        <button
          onClick={handleEmailLogin}
          disabled={loading}
          className={`w-full py-2 text-white font-semibold rounded transition ${
            loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>

        <button
          onClick={handleGoogleLogin}
          className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
        >
          Sign in with Google
        </button>

        <p className="mt-6 text-sm text-center text-gray-300">
          New to Cyman Wear?{' '}
          <Link to="/register" className="text-blue-500 hover:text-blue-600">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;