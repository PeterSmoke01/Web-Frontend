import React,{useState} from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import '../../styles/AuthStyles.css';
import { useAuth } from '../../context/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [auth,setAuth] = useAuth();

    const navigate = useNavigate();

    //form function
const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const res = await axios.post(
          `/api/v1/auth/login`,
          { 
            email,
            password,
          }
        );
        if(res && res.data.success) {
        Swal.fire(
            'Good job!',
            `${res.data && res.data.message}`,
            'success'
          );
          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
          });
          localStorage.setItem('auth', JSON.stringify(res.data));
          setTimeout(() => {
            navigate('/');
          }, 1000);
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...'`${res.data.message}`,
                text: 'Something went wrong!',
              })
        }
    } catch(error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Your email or password is incorrect!',
      })
    }
  };

  return (
    <Layout title={"Register - Car Collection"}>
      <div className='form-container'>
        <h1>Hello! Register to get Started</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input 
            type="email" 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="form-control" 
            aria-describedby="emailHelp" 
            placeholder='Email'
            required/>
          </div>
          <div className="mb-3">
            <input 
            type="password" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="form-control" 
            aria-describedby="emailHelp" 
            placeholder='Password'
            required/>
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </Layout>
  )
}

export default Login
