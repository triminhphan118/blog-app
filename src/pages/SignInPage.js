import { Button } from "components/button";
import { Field } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthLayout from "./AuthLayout";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import InputPasswordToggle from "components/input/InputPasswordToggle";
import { useDispatch, useSelector } from "react-redux";
import { login } from "redux/auth/authSlice";

const schemaValidation = Yup.object({
  username: Yup.string().required("Please ennter your username"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Pleaser ennter your password"),
});

function SingInPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.auth);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(schemaValidation),
    mode: "onBlur",
  });
  const handleSignIn = async (values) => {
    if (!isValid) return;
    dispatch(login(values));
    navigate("/");
  };

  useEffect(() => {
    document.title = "Login";
    if (user?._id) navigate("/");
  }, []);
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      toast.error(errors[Object.keys(errors)[0]].message, {
        pauseOnHover: false,
        autoClose: 1000,
      });
    }
  }, [errors]);
  return (
    <AuthLayout>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignIn)}
        autoComplete="off"
      >
        <Field className="feild">
          <Label htmlFor="username" className="label">
            Username
          </Label>
          <Input
            type="username"
            id="username"
            name="username"
            className="input"
            placeholder="Enter your username"
            control={control}
          />
        </Field>
        <Field className="feild">
          <Label htmlFor="password" className="label">
            Password
          </Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <div className="have-account">
          Do not have an account ? <NavLink to={"/sign-up"}>Register</NavLink>
        </div>
        <Button
          disabled={loading}
          isLoading={loading}
          type="submit"
          style={{
            width: "300px",
            margin: "0 auto",
          }}
        >
          Sign In
        </Button>
      </form>
    </AuthLayout>
  );
}

export default SingInPage;
