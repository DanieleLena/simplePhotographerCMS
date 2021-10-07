import React,{useEffect,useRef,useCallback} from "react";

const MessageModal = ({closeModal,isModalOpen,setDeleteConfirm}) => {

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


  const handleCloseModal = () => {
    closeModal(false);
    setDeleteConfirm(true);
  }



  return (
    <div
      className="message-cover"
      ref={modalRef}
      onClick={(e) =>closeModalByCover(e)}
    >
      <div className="message-modal">
        <h2>Warning</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
          exercitationem eveniet quae veniam, quos excepturi! Dignissimos
          eligendi a odio id repudiandae doloribus nulla architecto facilis
          cumque voluptatem quo, ipsum laborum!
        </p>
        <button onClick={() => handleCloseModal()}>Confirm</button>
        <button>Discard</button>
      </div>
    </div>
  );
};

export default MessageModal;
