import { useState, useEffect } from "react";

import Button from "../components/UI/Button/Button";
import classes from "./MainPage.module.css";

const MainPage = () => {
  const [items, setItems] = useState([]);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  useEffect(() => {
    fetchData("https://swapi.dev/api/people/");
  }, []);

  const fetchData = async (url) => {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setItems(data.results);
        setNext(data.next);
        setPrevious(data.previous);
      });
  };

  const handlePreviousPage = () => {
    fetchData(previous);
  };

  const handleNextPage = () => {
    fetchData(next);
  };

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
      <div className={classes.buttons}>
        {!!previous ? (
          <Button onClick={handlePreviousPage}>Previous</Button>
        ) : (
          <div></div>
        )}
        {!!next && <Button onClick={handleNextPage}>Next</Button>}
      </div>
    </div>
  );
};

export default MainPage;
