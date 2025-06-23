// import { useEffect } from "react";
import { selectCurrentBoard } from "../../redux/boards/selectors.js";
import BoardData from "../BoardData/BoardData.jsx";
import Done from "../Done/Done.jsx";
import InProgress from "../InProgress/InProgress.jsx";
import ToDo from "../ToDo/ToDo.jsx";
import { useSelector } from "react-redux";
// import { fetchBoardById } from "../../redux/boards/operations.js";
// import { selectTasks } from "../../redux/tasks/selectors.js";

const Board = () => {
  // const dispatch = useDispatch();
  const board = useSelector(selectCurrentBoard);

  //   const data = useSelector(selectTasks);

  //   useEffect(() => {
  //     dispatch(fetchBoardById());
  //   }, [dispatch]);

  return (
    <div>
      <BoardData data={board.data} />
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
