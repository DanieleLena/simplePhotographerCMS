import React,{useEffect,useRef,useCallback} from "react";

const MessageModal = ({closeModal,isModalOpen,setDeleteConfirm,projectName}) => {

  // Close the modal when press 'Esc' OR outside the modal ==============================
  const modalRef = useRef();
  const closeModalByCover = (e) => {
    if (modalRef.current === e.target) {
      closeModal(false);
    }
  };
  const keyEsc = useCallback(
    (e) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal(false);
      }
    },
    // eslint-disable-next-line
    [isModalOpen]
  );
  useEffect(() => {
    document.addEventListener("keydown", keyEsc);
    return () => document.removeEventListener("keydown", keyEsc);
  }, [keyEsc]);


  const handleCloseModal = (confirm) => {
    closeModal(false);
    setDeleteConfirm(confirm);
  }



  return (
    <div
      className="message-cover"
      ref={modalRef}
      onClick={(e) => closeModalByCover(e)}
    >
      <div className="message-modal">
        <h2>Confirm Deletion</h2>
        <p>
          Are you sure you want to delete Project <strong>{projectName}</strong>
          ? <br></br> This action cannot be undone.
        </p>
        <div className="message-btn-container">
          <button
            className="custom-btn btn-2 btn-discard"
            onClick={() => handleCloseModal(false)}
          >
            Discard
          </button>
          <button className="custom-btn btn-2 btn-delete" onClick={() => handleCloseModal(true)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
