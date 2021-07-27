const ConditionalShow = ({ condition, children }) => {
  return condition ? children : null;
};

export default ConditionalShow;
