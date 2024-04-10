import { useNavigate } from "react-router-dom";
import MainButton from "../../lib/Buttons/MainButton";

function NotFoud() {
  const navigate = useNavigate();

  return (
    <div className="error">
      <h1 className="title">Страница не найдена</h1>
      <MainButton onClick={() => navigate(-1)}>Вернуться обратно</MainButton>
    </div>
  );
}

export default NotFoud;
