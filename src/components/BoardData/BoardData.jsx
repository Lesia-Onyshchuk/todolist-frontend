const BoardData = ({ data }) => {
  console.log("BoardData", data);
  return (
    <div>
      <h1>{data.boardId}</h1>
      <p>{data.name}</p>
      <button type="button">delete</button>
    </div>
  );
};

export default BoardData;
