import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';

const ErrorModal = (props) => {

  return (
    <Fragment>
      {
        ReactDOM.createPortal(
          <Modal title={props.title} message={props.message} onConfirm={props.onConfirm} />,
          document.getElementById("modal-root")
        )
      }
    </Fragment>
  );
};

export default ErrorModal;
