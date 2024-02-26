const checkEmailValid = (email) => {
  let regex = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-z]{2,}/;
  return regex.test(email);
};

export default checkEmailValid;
