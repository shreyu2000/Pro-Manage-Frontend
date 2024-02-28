 import styles from './PopupMenu.module.css'

 const PopupMenu = ({ onEdit, onDelete, onShare, onClose }) => {
    return (
      <div className={styles.popupMenu}>
        <div
          className={styles.option}
          onClick={() => {
            onEdit();
            onClose();
          }}
        >
          Edit
        </div>
        
        <div
          className={styles.option}
          onClick={(e)=>{
            e.stopPropagation();
            onShare();
            onClose();
          }}
        >
          Share
        </div>
        <div
          className={styles.option}
          onClick={() => {
            onDelete();
            onClose();
          }}
          style={{color :"#CF3636"}}
        >
          Delete
        </div>
      </div>
    );
  };

  

  export default PopupMenu;