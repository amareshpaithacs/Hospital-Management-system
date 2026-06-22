import { useEffect } from "react";
import { BsX } from "react-icons/bs";

function Modal({ isOpen, onClose, title, children, footer }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-wrap">
        <div className="modal-dialog">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button className="modal-close-btn" onClick={onClose}>
              <BsX size={20} />
            </button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          {footer && (
            <div className="modal-footer">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Modal;