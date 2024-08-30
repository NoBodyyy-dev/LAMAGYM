import {Dispatch, ReactNode, SetStateAction, useEffect} from "react";

type MODAL_PROPS = {
    children: ReactNode;
    modal: boolean;
    setModal: Dispatch<SetStateAction<boolean>>;
};

function BigModal(props: MODAL_PROPS) {
    useEffect(() => {
        if (props.modal) {
            document.body.classList.add("fixed-height")
        }
        if (document.body.classList.contains("fixed-height") && !props.modal)
            document.body.classList.remove("fixed-height")
    }, [props.modal]);

    return (
        props.modal &&
        <div className="modal-bg flex-to-center"
             onClick={() => props.setModal(false)}>
            <div className="big-modal" onClick={(e) => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    );
}

export default BigModal;