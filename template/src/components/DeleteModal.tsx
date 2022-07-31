import React from "react";
import Button from "./Button";
import Modal from "./Modal";

interface props {
  submit: () => void;
  hide: () => void;
  visible: boolean;
}

const DeleteModal: React.FC<props> = ({ visible, hide, submit }) => {
  return (
    <Modal isVisible={visible} close={hide}>
      <div className="overflow-hidden bg-white rounded-lg">
        <div className="flex items-center p-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-50">
            <i className="text-3xl text-red-600 bx bx-trash"></i>
          </div>
          <div className="mx-5">
            <h4 className="text-3xl text-gray800">
              are you sure you want to delete this item
            </h4>
            <p className="text-lg text-gray700">
              this item will be removed from the list
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end p-5 bg-gray50">
          <Button
            onClick={submit}
            className="px-8 py-3 mx-5 bg-red-600 border border-red-600 btn-primary"
            placeholder="delete"
          />
          <Button
            placeholder="cancel"
            onClick={hide}
            className="mx-5 text-gray-600 bg-transparent border-0 shadow-none"
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
