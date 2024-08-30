import { memo, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/stateHooks.ts";
import { SubType } from "../../store/types/subTypes.ts";
import { UserData } from "../../store/types/userTypes.ts";
import { buySubFunc } from "../../store/actions/userActions.ts";
import MainButton from "../button/MainButton.tsx";

type Props = {
  sub: SubType;
  curUser: UserData;
};

const Sub = memo((props: Props) => {
  const dispatch = useAppDispatch();
  const [isBuy, setIsBuy] = useState<boolean>(false);

  const subClasses = [
    "border-gray level1",
    "border-green level2",
    "border-prpl level3",
    "border-blue level4",
    "border-red level5",
    "border-gold level6",
    "border-diamond level7",
  ];

  useEffect(() => {
    if (props.curUser.purchasedSubs?.includes(props.sub._id)) setIsBuy(true);
  }, [props.curUser.purchasedSubs?.length]);

  return (
    <div
      className={`sub flex-to-center-col ${
        subClasses[props.sub.level - 1 < 7 ? props.sub.level - 1 : 7]
      }`}
    >
      <p className="sub-title">{props.sub.title}</p>
      <div className="sub-description border-gray">
        <span className="txt-prpl">Описание:</span> <br />
        {props.sub.description}
      </div>
      <p className="sub-price txt-bold txt-prpl">{props.sub.price} руб./мес.</p>
      <p className="sub-level txt-gray">Уровень: {props.sub.level}</p>
      {props.curUser._id !== props.sub.creatorId &&
        (isBuy ? (
          <div className="sub-button border-prpl buy">Куплено</div>
        ) : (props.curUser._id 
          && <MainButton
            onClick={() => {
              dispatch(buySubFunc(props.sub._id));
              setIsBuy(true);
            }}
            className="sub-button"
          >
            Купить
          </MainButton>
        ))}
    </div>
  );
});

export default Sub;
