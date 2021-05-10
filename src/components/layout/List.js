import { useState, useEffect } from "react";

import ListItem from "./ListItem";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Loading from "../UI/Loading/Loading";
import classes from "./List.module.css";

const initialDataUrl = "https://swapi.dev/api/people/";

const MainPage = () => {
  const [items, setItems] = useState([]);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData(initialDataUrl);
  }, []);

  const fetchData = async (url) => {
    setIsLoading(true);
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setItems(data.results);
          setNext(data.next);
          setPrevious(data.previous);
          setIsLoading(false);
        }, 500);
      });
  };

  const handlePreviousPage = () => {
    fetchData(previous);
  };

  const handleNextPage = () => {
    fetchData(next);
  };

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <Card className={classes.mainpage}>
            {items.map((item) => (
              <ListItem key={item.url} item={item} />
            ))}
          </Card>

          <div className={classes.buttons}>
            {!!previous ? (
              <Button onClick={handlePreviousPage}>Previous</Button>
            ) : (
              <div></div>
            )}
            {!!next && <Button onClick={handleNextPage}>Next</Button>}
          </div>
        </>
      )}
    </>
  );
};

export default MainPage;
