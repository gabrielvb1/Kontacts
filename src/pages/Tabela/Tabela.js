import './Tabela.css'
import Editar from './Editar.svg'
import Excluir from './Deletar.svg'
import api from '../../api'
import { useContext, useEffect } from 'react';
import { getItem } from '../../utils/storage';
import MyContext from '../../Context/MyContext';


function Tabela() {
    const token = getItem('token')
    const { dataTabela, setDataTabela, setOpenModalEdit, setContatoId, setForm, setOpenModalDelete, setContatoName } = useContext(MyContext)

    function handleOpenEditModal(id, linha) {
        setOpenModalEdit(true)
        setContatoId(id)
        setForm({ ...linha })
    }

    function handleOpenDeleteModal(id, nome) {
        setOpenModalDelete(true)
        setContatoId(id)
        setContatoName(nome)
    }

    useEffect(() => {
        async function getDataToTabel() {
            try {
                const { data } = await api.get('/contatos', { headers: { Authorization: `Bearer ${token}` } })
                setDataTabela([...data])
            } catch (error) {
                console.log(error.data);
            }
        }
        getDataToTabel()
    }, [setDataTabela, token])
    return (
        <div className='container-tabela'>
            <div className='cabecalho'>
                <strong className='normal'>Nome</strong>
                <strong className='normal'>E-mail</strong>
                <strong className='grande'>Telefone</strong>
                <div className='vazia pequena'></div>
            </div>

            <div className='corpo-tabela'>
                {dataTabela.map((linha) => {
                    return (
                        <div className='linha' key={linha.id}>
                            <span className='normal'>{linha.nome}</span>
                            <span className='normal'>{linha.email}</span>
                            <span className='grande'>{linha.telefone}</span>
                            <div className='editar-excluir pequena'>
                                <img src={Editar} alt='icone-editar' onClick={() => handleOpenEditModal(linha.id, linha)}></img>
                                <img src={Excluir} alt='icone-excluir' onClick={() => handleOpenDeleteModal(linha.id, linha.nome)}></img>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default Tabela