

//! modal component props 
//  bool? isOpen 
// onClose ()=> void
// onSubmit ()=> void
// title?
// body? react component
// footer? react component
// actionLabel
// disable? bool
// secondaryAction? ()=> void
// secondaryActionLabel? string  

import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

function Modal({
    isOpen, 
    onClose, 
    onSubmit, 
    title, 
    body, 
    footer, 
    actionLabel, 
    disable, 
    secondaryAction, 
    secondaryActionLabel,
}) {

    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);


    const handleClose = useCallback(()=>{
        if(disable) {
            return;
        }
        setShowModal(false);
        //! for animation
        setTimeout(() => {
            onClose();
        }, 300);
    },[ disable, onClose ]);


    const handleSubmit = useCallback(()=>{
        if(disable) {
            return;
        }

        onSubmit();
    }, [disable, onSubmit]);

    
    const handleSecondaryAction = useCallback(()=>{
        if(disable || !secondaryAction) {
            return;
        }
        secondaryAction();
    }, [disable, secondaryAction]);



    if(!isOpen) {
        return null;
    }

    return (
      <>
        <div
          className="
            justify-center
            items-center
            flex
            overflow-x-hidden
            overflow-y-auto
            fixed
            inset-0
            z-50
            outline-none
            focus:outline-none
            bg-neutral-800
            bg-opacity-70
        "
        >
          <div
            className="
                relative
                w-full
                md:w-4/6 
                lg:w-3/6
                xl:w-2/5
                my-6
                mx-auto
                lg:max-w-3xl
                h-full
                lg:h-auto
                md:h-auto
  
            "
          >
            {/* here is the modal content */}
            <div
              className={`
                        translate
                        duration-300
                        h-full
                        ${showModal ? "translate-y-0" : "translate-y-full"}
                        ${showModal ? "opacity-100" : "opacity-0"}
                        `}
            >
              <div
                className="
                        translate
                        h-full
                        lg:h-auto
                        md:h-auto
                        border-0
                        rounded-lg
                        shadow-lg
                        relative
                        flex
                        flex-col
                        w-full
                        bg-white
                        outline-none
                        focus:outline-none
                    "
              >
                {/* here is the modal header */}
                <div
                  className="
                            flex
                            items-center
                            p-6
                            rounded-t
                            justify-center
                            relative
                            border-b-[1px]
                        "
                >
                  <button
                    onClick={handleClose}
                    className="
                                p-1
                                border-0
                                hover:opacity-70
                                transition
                                absolute
                                left-9
                            "
                  >
                    <IoMdClose size={18} />
                  </button>

                  <div
                    className="
                                    text-lg
                                    font-semibold
                                "
                  >
                    {title}
                  </div>
                </div>

                {/* here is the modal body */}
                <div
                  className="
                            relative
                            p-6
                            flex-auto"
                >
                  {body}
                </div>

                {/* here is the modal footer */}
                <div
                  className="
                            flex
                            flex-col
                            gap-2
                            p-6
                        "
                >
                  <div
                    className="
                                flex
                                flex-row
                                items-center
                                gap-4
                                w-full
                            "
                  >
                    {secondaryAction && secondaryActionLabel && (
                      <Button
                        outline
                        disabled={disable}
                        label={secondaryActionLabel}
                        onClick={handleSecondaryAction}
                      />
                    )}

                    <Button
                      disabled={disable}
                      label={actionLabel}
                      onClick={handleSubmit}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default Modal;