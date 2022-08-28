import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import "./index.scss";

const array = [
  {
    title: "New films",
    quantity: 45,
    rate: "-20",
    icon: <ArrowDownward className="rate-icon negative" />,
  },
  {
    title: "Views",
    quantity: 25000,
    rate: "-5400",
    icon: <ArrowDownward className="rate-icon negative" />,
  },
  {
    title: "Users",
    quantity: 7,
    rate: "+2",
    icon: <ArrowUpward className="rate-icon" />,
  },
];

export default function Feature() {
  return (
    <div className="feature">
      {array.map((item, index) => (
        <div className="feature__item" key={index}>
          <span className="feature__item_title">{item.title}</span>
          <div className="feature__item_container">
            <span className="quantity">{item.quantity}</span>
            <span className="rate">
              {item.rate} {item.icon}
            </span>
          </div>
          <span className="feature__item_compare">Compared to last month</span>
        </div>
      ))}
    </div>
  );
}
