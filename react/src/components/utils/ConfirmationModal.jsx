import Modal from 'react-modal'

const ConfirmationModal = ({ isModalOpen, toggleModal, component }) => {
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent dark overlay
            zIndex: 1000, // Set a higher z-index to overlay above other content
          },
          content: {
            width: '0px',
            height: '0px',
            margin: 'auto',
            background: '#f3f4f6',
            borderRadius: '8px',
            zIndex: 1001, // Set a z-index higher than the overlay
          },
        }}
      >
          {component}
 
      </Modal>
    </>
  );
};

export default ConfirmationModal;
