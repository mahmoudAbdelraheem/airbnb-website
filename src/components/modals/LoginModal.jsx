import Modal from "./Modal";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useForm } from "react-hook-form";

import useLoginModal from "../../hooks/useLoginModal";
import userRegisterModal from "../../hooks/useRegisterModal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { loginWithEmailAndPassword } from "../../data/auth/authWithEmailAndPassword";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../../data/auth/authWithGoogleAccount";
import { loginWithGitHub } from "../../data/auth/authWithGithubAccount";

function LoginModal() {
  const loginModal = useLoginModal();
  const registerModal = userRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerWithGitHub = async () => {
    try {
      await loginWithGitHub();
      loginModal.onClose();
      navigator("/");
    } catch (error) {
      console.log(error);
    }
  };

  const registerWithGoogle = async () => {
    try {
      await loginWithGoogle();
      loginModal.onClose();
      navigator("/");
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      // create user with name, email, and password
      await loginWithEmailAndPassword(data.email, data.password);
      // close modal
      loginModal.onClose();
      // to refresh the page
      navigator("/");

      toast.success("Registration successful!");
    } catch (error) {
      console.log(error);
      toast.error("Registration failed, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title={"Welcome back"} subtitle={"Login to your account!"} />
      <Input
        id={"email"}
        label={"Email"}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id={"password"}
        label={"Password"}
        type={"password"}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label={"Continue with Google"}
        icon={FcGoogle}
        onClick={registerWithGoogle}
      />
      <Button
        outline
        label={"Continue with Github"}
        icon={AiFillGithub}
        onClick={registerWithGitHub}
      />
      <div
        className="
      text-neutral-500
      text-center
      mt-4
      font-light
      "
      >
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={registerModal.onClose}
            className="
          text-neutral-800 
          cursor-pointer 
          hover:underline"
          >
            Log in.
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disable={isLoading}
      isOpen={loginModal.isOpen}
      title={"Login"}
      actionLabel={"Continue"}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;
