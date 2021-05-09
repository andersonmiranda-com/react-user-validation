import classes from "./Loading.module.css";
import Bb8 from "../../../assets/img/bb8.gif";

function Loading() {
  return (
    <div className={classes.verticalcenter}>
      <img src={Bb8} height="150" />
    </div>
  );

  return null;
}

export default Loading;
