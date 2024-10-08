interface Props {
  color: string;
}

const TurnIndicator = ({ color }: Props) => {
  return <h1>{color}'s turn!</h1>;
};

export default TurnIndicator;
