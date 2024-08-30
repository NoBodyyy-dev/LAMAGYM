import { useAppDispatch, useAppSelector } from "../../hooks/stateHooks.ts";
import { ChangeEvent, memo, useEffect, useState } from "react";
import MainButton from "../../lib/button/MainButton.tsx";
import {
  subOnUserFunc,
  unsubOnUserFunc,
  updateMeFunc,
} from "../../store/actions/userActions.ts";
import { UserData } from "../../store/types/userTypes.ts";
import BigModal from "../../lib/modals/BigModal.tsx";
import { useNavigate } from "react-router-dom";
import uploadImage from "../../hooks/uploadImage.ts";
import MainInput from "../../lib/inputs/MainInput.tsx";

type Props = {
  curUser: UserData;
  profileUser: UserData;
  username: string;
};

const ProfileUser = memo((props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { socketConnection, isSuccess } = useAppSelector((state) => state.user);

  const [isSubs, setIsSubs] = useState<boolean>(false);
  const [errorOpen, setErrorOpen] = useState<boolean>(false);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);

  const [file, setFile] = useState("");
  const [updateData, setUpdateData] = useState({
    username: "" as string,
    image: "" as string,
  });

  const sendToChatroom = () => {
    if (socketConnection) {
      console.log(">>>", socketConnection);
      socketConnection.emit("createChat", props.profileUser._id);
      navigate(`/chat/${props.profileUser._id}`);
    }
  };

  const updateUser = () => {
    console.log(updateData);
    dispatch(updateMeFunc({ ...updateData, _id: props.profileUser!._id! }));
    setUpdateOpen(false);
    updateData.username = "";
    updateData.image = "";
    navigate("/")
    setTimeout(() => {
        navigate(`/profile/${props.username}`);
    }, 300)
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const uploadPhoto = await uploadImage(file);
    setFile(uploadPhoto);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    setUpdateData((pr) => {
      return { ...pr, image: uploadPhoto.url };
    });
    console.log(updateData);
  };

  useEffect(() => {
    if (
      props.curUser?.subsOnUsers?.find((id) => id === props.profileUser!._id!)
    ) {
      setIsSubs(true);
    } else setIsSubs(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.curUser._id, props.username!, props.profileUser!._id]);

  return (
    <div className="profile__user">
      <div className="profile__user__block flex-to-center">
        <div className="background"></div>
        <div className="profile__user__info flex-align-center-sbetw">
          <div className="block flex-to-center">
            <img
              src={props.profileUser!.image}
              alt={props.profileUser!.username}
              className="profile__user-logo"
            />
            <div className="text">
              <h1 className="profile__user-username">
                {props.profileUser!.username}
              </h1>
              <div className="profile__user-followers">
                {props.profileUser!.countSubscribers} подписчиков
              </div>
            </div>
          </div>
          <div className="profile__user-buttons">
            {props.username === props.curUser?.username ? (
              <MainButton
                onClick={() => {
                  setUpdateOpen(true);
                }}
              >
                Редактировать
              </MainButton>
            ) : isSubs ? (
              <MainButton
                className="bg-gray is--sub"
                onClick={() => {
                  setIsSubs(false);
                  dispatch(unsubOnUserFunc(props.username!));
                }}
              >
                Вы подписаны
              </MainButton>
            ) : (
              <MainButton
                onClick={() => {
                  if (props.curUser._id) {
                    setIsSubs(true);
                    dispatch(subOnUserFunc(props.username!));
                  } else {
                    setErrorOpen(true);
                  }
                }}
              >
                Подписаться
              </MainButton>
            )}
            {props.username !== props.curUser?.username && (
              <MainButton
                onClick={() => {
                  if (props.curUser._id) sendToChatroom();
                  else setErrorOpen(true);
                }}
              >
                Написать
              </MainButton>
            )}
          </div>
        </div>
      </div>
      <div className="profile__change"></div>
      <BigModal modal={errorOpen} setModal={setErrorOpen}>
        <div className="modal__full">
          <h1 className="title">Авторизуйтесь чтобы войти</h1>
          <MainButton onClick={() => navigate("/auth")}>
            Авторизоваться
          </MainButton>
        </div>
      </BigModal>
      <BigModal modal={updateOpen} setModal={setUpdateOpen}>
        <form className="modal__form">
          <h1 className="modal__form-title title">Изменить фото</h1>
          <label className="upload-file" htmlFor={"user-photo"}>
            <p>
              {file.original_filename
                ? file.original_filename
                : "Изменить фото"}
            </p>
            <input
              type="file"
              id="user-photo"
              accept="image/jpeg, image/png, image/jpg"
              className="hide"
              onChange={handleUpload}
            />
          </label>
          <MainButton onClick={() => updateUser()}>Изменить</MainButton>
        </form>
      </BigModal>
    </div>
  );
});

export default ProfileUser;
