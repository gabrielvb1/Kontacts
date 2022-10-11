import Tabela from '../Tabela/Tabela'
import './Main.css'
import Sair from './Vector.svg'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import MyContext from '../../Context/MyContext'
import ModalAdd from './ModalAdd/ModalAdd'
import ModalEdit from './ModalEdit/ModalEdit'
import ModalDelete from './ModalDelete/ModalDelete'
import { clearItem } from '../../utils/storage'
export default function Main() {
    const navigate = useNavigate()
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [dataTabela, setDataTabela] = useState([])
    const [contatoId, setContatoId] = useState(null)
    const [contatoName, setContatoName] = useState('')
    const [form, setForm] = useState({ nome: '', email: '', telefone: '' })
    function handleLeaveMain(){
        navigate('/')
        clearItem()
    }
    return (
        <MyContext.Provider value={{ openModalAdd, setOpenModalAdd, dataTabela, setDataTabela, openModalEdit, setOpenModalEdit, contatoId, setContatoId, form, setForm, openModalDelete, setOpenModalDelete, contatoName, setContatoName }}>
            <div className='main-container'>
                <header>
                    <h2>KONTACTS</h2>
                    <img src={Sair} alt='icone-sair' onClick={()=>handleLeaveMain()}></img>
                </header>
                <div className='container-btn-top'>
                    <button className='btn-top' onClick={() => setOpenModalAdd(true)}>Adicionar</button>
                </div>

                <Tabela />
                <ModalAdd />
                <ModalEdit />
                <ModalDelete />
            </div>
        </MyContext.Provider>
    )
}