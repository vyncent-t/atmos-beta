import { useHistory } from "react-router";
import styles from './MainMenuStyles.module.css'
import { Link } from "react-router-dom";



function ConfModal(props) {


    const history = useHistory();

    function cancelHandler() {
        props.onCancel();
    }

    return (
        <div className={styles.backdrop}>
            <p> Are you sure?</p>
            <button className="btn btn-secondary m-1" onClick={cancelHandler}>Cancel</button>
            <Link to="/dashboard" className="m-3 btn btn-success">Continue</Link>
        </div>
    )
}

export default ConfModal;