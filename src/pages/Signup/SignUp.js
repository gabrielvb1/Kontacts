import './SignUp.css';
import { useState } from 'react'
import api from '../../api';
import { Link } from 'react-router-dom'
function SignUp() {
  const [form, setForm] = useState({ nome: '', email: '', senha: '' })

  function handleChangeInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await api.post('/usuarios', { ...form })
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <div className="container-signup">

      <main className='left-signup'>
        <div className='container-form-signup'>
          <h2>Cadastre-se</h2>
          <form onSubmit={handleSubmit}>

            <input placeholder='Nome'
              onChange={handleChangeInput}
              type='text'
              name='nome'
            ></input>

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

            <button className='btn-cadastrar'>CADASTRAR</button>
            <button className='btn-cancelar'>CANCELAR</button>
            <div className='login-redirect'>
              <span>Já tem cadastro?</span> <Link className='span-clique-aqui' to='/'>Clique aqui</Link>
            </div>
          </form>

        </div>
      </main>

      <aside className='right-signup'></aside>
    </div>
  );
}

export default SignUp;
