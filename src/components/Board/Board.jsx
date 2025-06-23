// import { useEffect } from "react";
import BoardData from "../BoardData/BoardData.jsx";
import Done from "../Done/Done.jsx";
import InProgress from "../InProgress/InProgress.jsx";
import ToDo from "../ToDo/ToDo.jsx";
import { useDispatch } from "react-redux";
import { fetchBoardById } from "../../redux/boards/operations.js";
// import { selectTasks } from "../../redux/tasks/selectors.js";

const Board = () => {
  const dispatch = useDispatch();

  //   const data = useSelector(selectTasks);

  //   useEffect(() => {
  //     dispatch(fetchBoardById());
  //   }, [dispatch]);

  return (
    <div>
      <BoardData data={dispatch(fetchBoardById())} />
      <ul>
        <li>
          <ToDo />
        </li>
        <li>
          <InProgress />
        </li>
        <li>
          <Done />
        </li>
      </ul>
    </div>
  );
};

export default Board;
