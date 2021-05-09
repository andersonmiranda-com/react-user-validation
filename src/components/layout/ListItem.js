import Card from "../UI/Card/Card";

import classes from "./ListItem.module.css";

const ListItem = (props) => {
  return (
    <Card className={classes.item}>
      <div className={classes.item__description}>
        <h4>{props.item.name}</h4>
        Birth year: {props.item.birth_year}
      </div>
      <div className={classes.item__detail}>{props.item.gender}</div>
    </Card>
  );
};

export default ListItem;
