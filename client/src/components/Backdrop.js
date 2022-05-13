import styles from './MainMenuStyles.module.css'

function Backdrop(props) {
    return (
        <div className={styles.backdrop} onClick={props.onCancel} />
    )
}

export default Backdrop