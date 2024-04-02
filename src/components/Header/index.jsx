import { CiCirclePlus } from "react-icons/ci";
import styles from './header.module.css'
import Logo from '../../assets/Logo.svg'
import { useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


export function Header({ onAddTask }) {
    const [title, setTitle] = useState('')
    function handleSubmit(e) {
        e.preventDefault();
        if (title.trim() === '')
        {
            MySwal.fire({
                title: 'Empty Field',
                text: 'Please enter a somthing before creating a task',
                icon: 'warning',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'swal2-mobile',
                }
            });
            return;
        }

        onAddTask(title);
        setTitle('');
    }


    function onChangeTitle(event) {
        setTitle(event.target.value)

    }



    return (
        <header className={styles.header}>
            <img src={Logo}></img>

            <form onSubmit={handleSubmit} className={styles.newTaskForm}>
                <input placeholder='Add a new task' type='text' value={title} onChange={onChangeTitle} />
                <button id="createBtn">Create
                    <CiCirclePlus size={20} />
                </button>
            </form>
        </header>
    )
}


