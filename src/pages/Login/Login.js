import './Login.css';
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api';
import { setItem } from '../../utils/storage';
function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', senha: '' })

  function handleChangeInput(e) {

    setForm({ ...form, [e.target.name]: e.target.value })
  }


  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const { data } = await api.post('/login', { ...form })
      setItem('token', data.token)
      navigate('/main')
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <div className="container-login">

      <aside className='left'></aside>

      <main className='right'>
        <div className='container-form'>
          <div className='container-span'>
            <span>Bem-vindo</span>
          <h1>Faça o login com sua conta</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <input placeholder='E-mail'
              onChange={handleChangeInput}
              type='email'
              name='email'
            ></input>
            <input placeholder='Senha'
              onChange={handleChangeInput}
              type='password'
              name='senha'
            ></input>
            <button>LOGIN</button>
            <div className='signup-redirect'>
              <span>Não tem cadastro?</span> <Link className='span-clique-aqui' to='/signup'>Clique aqui</Link>
            </div>
          </form>

        </div>
      </main>
    </div>
  );
}

export default Login;
