import { useContext } from 'react';
import api from '../../../api';
import MyContext from '../../../Context/MyContext';
import { getItem } from '../../../utils/storage';
import Close from '../ModalAdd/close.svg'
import '../ModalAdd/ModalAdd.css'
export default function ModalEdit() {
    const token = getItem('token')

    const { dataTabela, setDataTabela, openModalEdit, setOpenModalEdit, contatoId, form, setForm } = useContext(MyContext)

    function handleChangeInput(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await api.put(`/contatos/${contatoId}`, { ...form }, { headers: { Authorization: `Bearer ${token}` } })
            const localContato = [...dataTabela]
            const contatoUpdated = localContato.find((contato) => contato.id === contatoId)
            contatoUpdated.nome = form.nome
            contatoUpdated.email = form.email
            contatoUpdated.telefone = form.telefone
            setDataTabela(localContato)
        } catch (error) {
            console.log(error.response.data);
        }
    }
    return (
        <>
            {openModalEdit &&
                <div className="modal">
                    <div className="container-form-modal">
                        <div className='container-close'>
                            <img src={Close} alt='icone-fechar' onClick={() => setOpenModalEdit(false)}></img>
                        </div>
                        <h2>Editar Contato</h2>
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
                            <button className='btn-add'>SALVAR</button>
                            <button type='button' className='btn-limpar'>LIMPAR</button>
                        </form>
                    </div>
                </div>}
        </>
    )
}