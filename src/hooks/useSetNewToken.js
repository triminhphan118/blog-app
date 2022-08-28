const { useDispatch } = require("react-redux");
const { setUser } = require("redux/auth/authSlice");

const useSetNewToken = (user) => {
  const dispatch = useDispatch();
  if (user?.accessToken) {
    dispatch(setUser(user));
  }
};

export default useSetNewToken;
