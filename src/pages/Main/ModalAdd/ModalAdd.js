import { useContext } from 'react';
import api from '../../../api';
import MyContext from '../../../Context/MyContext';
import { getItem } from '../../../utils/storage';
import Close from './close.svg';
import './ModalAdd.css'
export default function ModalAdd() {
    const token = getItem('token')
    const { openModalAdd, setOpenModalAdd, dataTabela, setDataTabela, form, setForm } = useContext(MyContext)

    function handleChangeInput(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const { data } = await api.post('/contatos', { ...form }, { headers: { Authorization: `Bearer ${token}` } })
            console.log(data);
            setDataTabela([...dataTabela, ...data])
        } catch (error) {
            console.log(error.response.data);
        }
    }
    return (
        <>
            {openModalAdd &&
                <div className="modal">
                    <div className="container-form-modal">
                        <div className='container-close'>
                            <img src={Close} alt='icone-fechar' onClick={() => setOpenModalAdd(false)}></img>
                        </div>
                        <h2>Novo Contato</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                placeholder='Nome'
                                type='text'
                                name='nome'
                                onChange={handleChangeInput}
                            ></input>

                            <input
                                placeholder='E-mail'
                                type='email'
                                name='email'
                                onChange={handleChangeInput}
                            ></input>

                            <input
                                placeholder='Telefone'
                                type='text'
                                name='telefone'
                                onChange={handleChangeInput}
                            ></input>
                            <button className='btn-add'>ADICIONAR</button>
                            <button type='button' className='btn-limpar'>LIMPAR</button>
                        </form>
                    </div>
                </div>}
        </>
    )
}