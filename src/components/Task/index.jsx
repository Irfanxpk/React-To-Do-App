import { useState } from "react";
import styles from './task.module.css'
import { TbTrash } from 'react-icons/tb';
import { BsFillCheckCircleFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

export function Task({ task, onComplete, onDelete, onEdit }) {

    const [editedTitle, setEditedTitle] = useState(task.title);
    const [isEditing, setIsEditing] = useState(false);
    
    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleDone = () => {
        if( editedTitle==''){
            setIsEditing(false);
            return onEdit(task.id,task.title)
        }else{
        setIsEditing(false);
        onEdit(task.id, editedTitle);
    }
    };

    const handleChange = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedTitle(task.title);
    };


    return (
        <div className={styles.task}>
        {!isEditing &&(
            <button className={styles.checkContainer} onClick={() => onComplete(task.id)}>
                {task.isComplete ? <BsFillCheckCircleFill /> : <div />}

            </button>
        )}
            {isEditing ? (
                <input
                    type="text"
                    value={editedTitle}
                    onChange={handleChange}
                    autoFocus
                    className={styles.editInput}
                />
            ) : (
                <p className={task.isComplete ? styles.textCompleted : ''}>{task.title}</p>
            )}

            <button className={styles.deleteButton} onClick={isEditing ? handleDone : handleEdit}>
                {isEditing ? 'Done'  : <FaEdit size={20} />}
            </button>

            {isEditing && (
                <button className={styles.deleteButton} onClick={handleCancel}>
                    Cancel
                </button>
            )}

            <button className={styles.deleteButton} onClick={() => onDelete(task.id)}>
                <TbTrash size={20} />
            </button>
        </div>
    );
}
