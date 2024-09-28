import axios from "axios";
import Modal from "./Modal";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import useRegisterModal from "../../hooks/useRegisterModal";

function RegisterModal() {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);


    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: {
        name: "",
        email: "",
        password: "",
      },
    });

    const onSubmit = (data) => {
      setIsLoading(true);
      axios
        .post("/api/register", data)
        .then(() => {
          registerModal.onClose();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

  return (
    <Modal
      disable={isLoading}
      isOpen={registerModal.isOpen}
      title={"Register"}
      actionLabel={"Continue"}
      onClose={registerModal.onClose}
      onSubmit={()=>{handleSubmit(onSubmit)}}
    />
  );
}

export default RegisterModal;
