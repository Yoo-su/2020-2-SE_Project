export const btnStyle = (bgColor, color = "white") => {
  return {
    border: "transparent",
    color: color,
    borderRadius: "10px",
    padding: "0.5rem 1rem",
    margin: "0 0.2rem",
    backgroundColor: bgColor,
  };
};
export const alertStyle = () => {
  return {
    display: "flex",
    width: "16rem",
    padding: "0.3rem 0.5rem",
    alignItems: "center",
    marginBottom: "0",
    justifyContent: "space-around",
  };
};
