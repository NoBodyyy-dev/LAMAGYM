import { memo } from "react";
import { SubscriptionType } from "../../../store/blog/BlogTypes";

type PROPS = {
  sub: SubscriptionType;
};

const Subscription = memo((props: PROPS) => {
  return (
    <div className="subs__item flex-to-center-col">
      <h1 className="subs__item-title">{props.sub.title}</h1>
      <p className="subs__item-description">{props.sub.description}</p>
      <p className="subs__item-price">{props.sub.price}$</p>
      <p className="subs__item-price">{props.sub.id}</p>
      <p className="subs__item-price">{props.sub.profileId}</p>
    </div>
  );
});

export default Subscription;
