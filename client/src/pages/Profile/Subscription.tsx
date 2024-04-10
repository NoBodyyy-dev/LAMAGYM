import { SUB_ITEM } from "../../store/subscription/SUBSCRIPTION_TYPES";

type PROPS = {
  sub: SUB_ITEM;
};

function Subscription(props: PROPS) {
  return (
    <div className="subs__item flex-to-center-col">
      <h1 className="subs__item-title">{props.sub.title}</h1>
      <p className="subs__item-description">{props.sub.description}</p>
      <p className="subs__item-price">{props.sub.price}$</p>
      <p className="subs__item-price">{props.sub.id}</p>
      <p className="subs__item-price">{props.sub.userId}</p>
    </div>
  );
}

export default Subscription;
