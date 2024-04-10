import { Link } from "react-router-dom";
import MainButton from "../../lib/Buttons/MainButton";
import { useState } from "react";
import BigModal from "../../lib/Modals/BigModal";

type MainInfo = {
  key: number;
  text: string;
  content: string;
};

const NotAuthUserMain = () => {
  const [modalSubs, setModalSubs] = useState(false);

  return (
    <div className="main__container info">
      <div className="main__block">
        <h1 className="title">Что вы можете делать на сайте</h1>
        <MainButton onClick={() => setModalSubs(true)}>Открыть модалку</MainButton>

        <BigModal modal={modalSubs} setModal={setModalSubs}>
          <h1>Модалка</h1>
        </BigModal>

        <Link to="/auth">
          <MainButton>Авторизоваться</MainButton>
        </Link>
      </div>
    </div>
  );
};

export default NotAuthUserMain;
