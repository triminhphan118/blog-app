import { Button } from "components/button";
import { Field } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import InputPasswordToggle from "components/input/InputPasswordToggle";
import { roleUser, statusUser } from "utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { register } from "redux/auth/authSlice";

const schemaValidation = Yup.object({
  fullname: Yup.string().required("Please enter your full name"),
  username: Yup.string()
    .required("Please enter your username")
    .trim()
    .matches(/^[a-z0-9_-]{3,16}$/, "username invalid"),
  email: Yup.string()
    .email("Please enter email in valid")
    .required("Please ennter your email"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Pleaser ennter your password"),
});

function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, error);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schemaValidation),
  });
  const handleSignUp = async (values) => {
    if (!isValid) return;
    const user = {
      ...values,
      avatar: "/default-profile.png",
      status: statusUser.Active,
      role: roleUser.User,
    };
    dispatch(register(user));
    console.log(user);
  };
  useEffect(() => {
    document.title = "Register";

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
        onSubmit={handleSubmit(handleSignUp)}
        autoComplete="off"
      >
        <Field className="feild">
          <Label htmlFor="fullname" className="label">
            Fullname
          </Label>
          <Input
            type="text"
            id="fullname"
            name="fullname"
            className="input"
            placeholder="Enter your fullname"
            control={control}
          />
        </Field>
        <Field className="feild">
          <Label htmlFor="username" className="label">
            Username
          </Label>
          <Input
            type="text"
            id="username"
            name="username"
            className="input"
            placeholder="Enter your username"
            control={control}
          />
        </Field>
        <Field className="feild">
          <Label htmlFor="email" className="label">
            Email address
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            className="input"
            placeholder="Enter your email"
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
          Do you already have an account ?{" "}
          <NavLink to="/sign-in">Login</NavLink>
        </div>
        <Button
          disabled={isSubmitting}
          isLoading={isSubmitting}
          type="submit"
          style={{
            width: "300px",
            margin: "0 auto",
          }}
        >
          Sign Up
        </Button>
      </form>
    </AuthLayout>
  );
}

export default SignUpPage;
