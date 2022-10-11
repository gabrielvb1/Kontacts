import Close from '../ModalAdd/close.svg'
import './ModalDelete.css'
import MyContext from '../../../Context/MyContext'
import { useContext } from 'react'
import api from '../../../api'
import { getItem } from '../../../utils/storage'
export default function ModalDelete() {
    const { openModalDelete, setOpenModalDelete, contatoName, contatoId, dataTabela, setDataTabela } = useContext(MyContext)
    const token = getItem('token')
    async function confirmDelete() {
        try {
            await api.delete(`contatos/${contatoId}`, { headers: { Authorization: `Bearer ${token}` } })
            const localUser = [...dataTabela]
            const localUserId = localUser.findIndex((user) => user.id === contatoId)
            localUser.splice(localUserId, 1)
            setDataTabela(localUser)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {openModalDelete &&

                <div className='modal'>
                    <div className='container-delete'>
                        <div className='container-delete-close'>
                            <img src={Close} alt='icone-fechar' onClick={() => setOpenModalDelete(false)}></img>
                        </div>
                        <h1>Confirma a exclusão?</h1>
                        <p>Deseja excluir o contato {contatoName}?</p>
                        <button className='excluir' onClick={() => confirmDelete()}>EXCLUIR</button>
                        <button className='cancelar' onClick={() => setOpenModalDelete(false)}>CANCELAR</button>
                    </div>
                </div>

            }

        </>
    )
}