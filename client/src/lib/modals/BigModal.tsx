import {Dispatch, SetStateAction} from "react";

type MODAL_PROPS = {
    children: any;
    modal: boolean;
    setModal: Dispatch<SetStateAction<boolean>>;
};

function BigModal(props: MODAL_PROPS) {
    return (
        <div className={props.modal ? "modal-bg active flex-to-center" : "modal-bg"}
             onClick={() => props.setModal(false)}>
            <div className="big-modal flex-to-center" onClick={(e) => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    );
}

export default BigModal;