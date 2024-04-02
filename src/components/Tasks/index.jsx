import styles from './tasks.module.css'
import { Task } from '../Task'

// eslint-disable-next-line
export function Tasks({ tasks, onComplete, onDelete ,onEdit }) {
    let taskQuantity = tasks.length
    let completedTask = tasks.filter(task => task.isComplete).length

    const sortedTasks = tasks.slice().sort((a, b) => {
        if (a.isComplete && !b.isComplete) return 1;
        if (!a.isComplete && b.isComplete) return -1;
        return 0;
    });


    return (
        <section className={styles.tasks}>
            <header className={styles.header}>
                <div>
                    <p>Created tasks</p>
                    <span>{taskQuantity}</span>
                </div>

                <div>
                    <p className={styles.textPurple}>Completed</p>
                    <span>{completedTask} of {taskQuantity}</span>
                </div>

            </header>

            <div className={styles.list}>
                {sortedTasks.map(task => (
                    <Task key={task.id} task={task} onComplete={onComplete} onDelete={onDelete} onEdit={onEdit}/>
                ))}
            </div>
        </section>
    )
}

