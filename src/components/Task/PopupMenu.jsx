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
          onClick={() => {
            onDelete();
            onClose();
          }}
        >
          Delete
        </div>
        <div
          className={styles.option}
          onClick={() => {
            onShare();
            onClose();
          }}
        >
          Share
        </div>
      </div>
    );
  };

  export default PopupMenu;