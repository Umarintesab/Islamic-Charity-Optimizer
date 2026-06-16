// // import React, { useState } from 'react';
// // import { useAuth } from '../context/AuthContext';
// // import { useNavigate, Link } from 'react-router-dom';

// // function Login() {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const { login } = useAuth();
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError('');
// //     setLoading(true);

// //     const result = await login(email, password);
// //     if (result.success) {
// //       navigate('/');
// //     } else {
// //       setError(result.error);
// //     }
// //     setLoading(false);
// //   };

// //   return (
// //     <div className="card">
// //       <h2 className="card-title">Login</h2>
// //       {error && <div className="error-message">{error}</div>}
// //       <form onSubmit={handleSubmit}>
// //         <div className="form-group">
// //           <label>Email</label>
// //           <input
// //             type="email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             required
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label>Password</label>
// //           <input
// //             type="password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             required
// //           />
// //         </div>
// //         <button type="submit" className="btn btn-primary" disabled={loading}>
// //           {loading ? 'Logging in...' : 'Login'}
// //         </button>
// //       </form>
// //       <p style={{ marginTop: '1rem', color: '#cfd8ff' }}>
// //         Don't have an account? <Link to="/register">Register here</Link>
// //       </p>
// //     </div>
// //   );
// // }

// // export default Login;

// import React, { useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate, Link } from 'react-router-dom';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     const result = await login(email, password);
//     if (result.success) {
//       navigate('/zakat');
//     } else {
//       setError(result.error);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="card">
//       <h2 className="card-title">Login</h2>
//       {error && <div className="error-message">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary" disabled={loading}>
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//       <p style={{ marginTop: '1rem', color: '#cfd8ff' }}>
//         Don't have an account? <Link to="/register">Register here</Link>
//       </p>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="card">
      <h2 className="card-title">Welcome Back!</h2>
      <p style={{ color: '#a9b4d6', marginBottom: '1.5rem' }}>Login to access your dashboard</p>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#a9b4d6' }}>
        Don't have an account? <Link to="/register" style={{ color: '#667eea' }}>Register here</Link>
      </p>
    </div>
  );
}

export default Login;