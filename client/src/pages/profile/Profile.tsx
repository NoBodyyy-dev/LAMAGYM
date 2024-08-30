import { useAppDispatch, useAppSelector } from "../../hooks/stateHooks.ts";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getUserPostsFunc,
  createPostFunc,
  getAllTags,
} from "../../store/actions/blogAction.ts";
import { getUserProfileFunc } from "../../store/actions/userActions.ts";
import MainButton from "../../lib/button/MainButton.tsx";
import BigModal from "../../lib/modals/BigModal.tsx";
import MainInput from "../../lib/inputs/MainInput.tsx";
import { useInput, useSearchTags, useUnique } from "../../hooks/fieldHooks.ts";
import { createSubFunc, getUserSubs } from "../../store/actions/subsAction.ts";
import { SubType } from "../../store/types/subTypes.ts";
import Post from "../../lib/post/Post.tsx";
import { PostType } from "../../store/types/blogTypes.ts";
import ProfileUser from "./ProfileUser.tsx";
import MainTextarea from "../../lib/inputs/MainTextarea.tsx";
import Sub from "../../lib/subs/Sub.tsx";
import uploadFile from "../../hooks/uploadImage.ts";
import SmallButton from "../../lib/button/SmallButton.tsx";

const Profile = () => {
  const { username } = useParams();
  const dispatch = useAppDispatch();
  const { profileUser, curUser, isLoading } = useAppSelector(
    (state) => state.user
  );
  const { userPosts, tags } = useAppSelector((state) => state.blog);
  const { subs } = useAppSelector((state) => state.subs);

  const [openCreatePostModal, setOpenCreatePostModal] =
    useState<boolean>(false);
  const [openCreateSubModal, setOpenCreateSubModal] = useState<boolean>(false);
  const [openSelect, setOpenSelect] = useState<boolean>(false);

  const [selectTags, setSelectTags] = useState<Array<string>>([]);
  const [findTag, setFindTag] = useState<string>("");
  const [createPostField, setCreatePostField] = useState({
    body: "" as string,
    subId: { _id: null as string | null, label: null as string | null },
  });
  const [files, setFiles] = useState<string>("");
  const [createSubField, setCreateSubField] = useState({
    title: "" as string,
    description: "" as string,
    price: 0 as number,
    level: 0 as number,
  });
  const searchTags = useSearchTags(tags, findTag);

  const handlePostFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const imageFiles = e.target.files[0];
      const uploadPhoto = await uploadFile(imageFiles);
      setFiles(uploadPhoto);
      console.log(uploadPhoto);
      
    }
  };

  const addPost = () => {
    if (createPostField.body.trim() && selectTags.length) {
      console.log(files);
      dispatch(
        createPostFunc({
          body: createPostField.body,
          subId: createPostField.subId._id,
          tags: selectTags,
          image: files.url,
        })
      );
      setOpenCreatePostModal(false);
      createPostField.body = "";
      setFiles("");
      setSelectTags([]);
      setFindTag("");
    } else return;
  };

  const addSub = () => {
    if (
      createSubField.title.trim() &&
      createSubField.description.trim() &&
      createSubField.price > 100
    ) {
      dispatch(createSubFunc(createSubField));
      setOpenCreateSubModal(false);
      createSubField.price = 0;
      createSubField.title = "";
      createSubField.description = "";
      createSubField.level = subs.length + 1;
    }
  };

  useEffect(() => {
    createSubField.level = subs.length + 1;
  }, [subs.length]);

  useEffect(() => {
    dispatch(getUserProfileFunc(username!));
  }, [dispatch, username, userPosts.length]);

  useEffect(() => {
    dispatch(getUserPostsFunc({ username: username!, page: 1 }));
    dispatch(getUserSubs(username!));
  }, [username, curUser!._id, userPosts.length]);

  return (
    <div className="profile">
      <ProfileUser
        profileUser={profileUser!}
        curUser={curUser!}
        username={username!}
      />

      <div className="profile__container">
        <div className="profile__container__block posts">
          <div className="profile__container__block-header flex-align-center-sbetw">
            <h1 className="profile__container__block-header-title">Посты</h1>
            {username === curUser?.username && (
              <SmallButton
                onClick={() => {
                  setOpenCreatePostModal(true);
                  !tags.length && dispatch(getAllTags());
                }}
                className="add"
              />
            )}
          </div>
          {userPosts.length ? (
            userPosts.map((post: PostType, index: number) => {
              return <Post postData={post} key={index} />;
            })
          ) : (
            <h1 className="title txt-gray">Нет постов</h1>
          )}
        </div>
        <div className="profile__container__block subs">
          <div className="profile__container__block-header flex-align-center-sbetw">
            <h1 className="profile__container__block-header-title">Подписки</h1>
            {username === curUser?.username && (
              <SmallButton
                className="add"
                onClick={() => setOpenCreateSubModal((state) => !state)}
              />
            )}
          </div>
          <div className="profile__container__block__options">
            {subs.length ? (
              subs.map((sub: SubType, index) => {
                return <Sub curUser={curUser!} sub={sub} key={index} />;
              })
            ) : (
              <h1 className="title txt-gray">Нет подписок</h1>
            )}
          </div>
        </div>
      </div>
      <BigModal modal={openCreatePostModal} setModal={setOpenCreatePostModal}>
        <div className="modal__form">
          <h1 className="modal__form-title title">Создать пост</h1>
          <MainTextarea
            placeholder="Текст"
            value={createPostField.body}
            onChange={(e) =>
              // eslint-disable-next-line react-hooks/rules-of-hooks
              useInput(e, createPostField, setCreatePostField, "body")
            }
          />
          <h1 className="modal__form-title subtitle">Добавьте теги</h1>
          <MainInput
            placeholder="Найти тег..."
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFindTag(e.target.value)
            }
          />
          <div className="modal__form__tags tags">
            {searchTags.length ? (
              searchTags.map((tag: string, index: number) => {
                return (
                  <div
                    key={index}
                    className="modal__form__tags-tag tags-tag"
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    onClick={() => {
                      localStorage.setItem("tagStory", JSON.stringify([]));
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      setSelectTags(useUnique([...selectTags, tag]));
                      setFindTag("");
                    }}
                  >
                    #
                    <span className="txt-bold">
                      {tag.slice(0, findTag.length)}
                    </span>
                    {tag.slice(findTag.length)}
                  </div>
                );
              })
            ) : (
              <p className="txt-gray flex-to-center">Тег не найден</p>
            )}
          </div>
          <p className="default">Выбранные теги:</p>
          <div className="tags">
            {selectTags.map((tag: string, index: number) => {
              return (
                <div
                  onClick={() => {
                    setSelectTags(selectTags.filter((t) => t !== tag));
                  }}
                  className="tags-tag"
                  key={index}
                >
                  #{tag}
                </div>
              );
            })}
          </div>
          <label className="upload-file" htmlFor={"user-photo"}>
            <p>
              {files.original_filename
                ? files.original_filename
                : "Добавить фото"}
            </p>
            <input
              type="file"
              id="user-photo"
              accept="image/jpeg, image/png, image/jpg"
              className="hide"
              onChange={handlePostFiles}
            />
          </label>
          <div className="select">
            <div
              className="select__header txt-prpl txt-bold"
              onClick={() => setOpenSelect((s) => !s)}
            >
              {createPostField.subId.label || "Подписка не выбрана"}
            </div>
            {subs.length
              ? openSelect && (
                  <div className="select__body">
                    <div
                      className="select__option"
                      onClick={() => {
                        setCreatePostField((pr) => {
                          return {
                            ...pr,
                            subId: { _id: "", label: "" },
                          };
                        });
                        setOpenSelect(false);
                      }}
                    >
                      Подписка не выбрана
                    </div>
                    {subs.map((sub: SubType, index: number) => {
                      return (
                        <div
                          key={index}
                          className="select__option"
                          onClick={() => {
                            setCreatePostField((pr) => {
                              return {
                                ...pr,
                                subId: { _id: sub._id, label: sub.title },
                              };
                            });
                            setOpenSelect(false);
                          }}
                        >
                          <span className="txt-bold">{sub.title}</span> (Уровень: {sub.level})
                        </div>
                      );
                    })}
                  </div>
                )
              : ""}
          </div>
          <MainButton onClick={() => addPost()}>Создать</MainButton>
        </div>
      </BigModal>
      <BigModal modal={openCreateSubModal} setModal={setOpenCreateSubModal}>
        <div className="modal__form">
          <h1 className="modal__form-title title">Создать подписку</h1>
          <MainInput
            placeholder="Название подписки"
            value={createSubField.title}
            onChange={(e) =>
              // eslint-disable-next-line react-hooks/rules-of-hooks
              useInput(e, createSubField, setCreateSubField, "title")
            }
          />
          <MainTextarea
            placeholder="Описание подписки"
            value={createSubField.description}
            onChange={(e) =>
              // eslint-disable-next-line react-hooks/rules-of-hooks
              useInput(e, createSubField, setCreateSubField, "description")
            }
          />
          <div className="modal__price flex">
            <MainInput
              value={createSubField.price}
              onChange={(e) => {
                const regex = /^\d*$/;
                if (regex.test(e.target.value) && e.target.value.length < 10) {
                  setCreateSubField({
                    ...createSubField,
                    price: Number(e.target.value),
                  });
                }
                console.log(createSubField);
              }}
            />
            <div className="modal__price-box">
              Уровень подписки: {createSubField.level}
            </div>
          </div>
          <MainButton type="submit" onClick={() => addSub()}>
            Создать
          </MainButton>
        </div>
      </BigModal>
    </div>
  );
};

export default Profile;
