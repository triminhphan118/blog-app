import { Button } from "components/button";
import { Field } from "components/field";
import ImageUpload from "components/images/ImageUpload";
import { Input } from "components/input";
import InputPasswordToggle from "components/input/InputPasswordToggle";
import { Label } from "components/label";

import useUploadImageFS from "hooks/useUploadImageFS";
import DashboardHeading from "module/dashboard/DashboardHeading";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { updateUsers } from "redux/users/usersSlice";
const schema = Yup.object({
  fullname: Yup.string().required("Please enter your fullname."),
  username: Yup.string()
    .matches(/^[a-z0-9_-]{3,16}$/, "Username invalid")
    .required("Please enter your fullname."),
  email: Yup.string()
    .email("Please enter email in valid")
    .required("Please ennter your email"),
});

function UserProfile() {
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.user);
  const userID = user?._id;
  const dispatch = useDispatch();
  const regexImage = /%2F(\S+)\?/gm;
  const {
    control,
    handleSubmit,
    reset,
    watch,
    getValues,
    setValue,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const imageName = regexImage.exec(getValues("avatar"));
  const {
    image,
    setImage,
    progress,
    setProgress,
    handleSelectImage,
    handleDRemoveImage,
  } = useUploadImageFS(setValue, getValues, imageName);

  useEffect(() => {
    if (!userID) return;

    reset(user && { ...user, password: "" });
    const imageUrl = user.avatar;
    const imgUrl = regexImage.exec(imageUrl);
    imgUrl && setImage(imageUrl && imageUrl);
  }, [user]);
  const handleUpdateUser = (values) => {
    if (!isValid) return;
    const cloneValues = { ...values };
    if (cloneValues.password.length > 0 && cloneValues.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    dispatch(
      updateUsers({
        user,
        id: userID,
        value: {
          ...cloneValues,
          status: +cloneValues.status,
          role: +cloneValues.role,
          avatar: image || "/default-profile.png",
        },
        type: "profile",
      })
    );
    setProgress(0);
  };
  useEffect(() => {
    document.title = "update profile";
    if (Object.keys(errors).length > 0) {
      toast.error(errors[Object.keys(errors)[0]].message, {
        pauseOnHover: false,
        autoClose: 1000,
      });
    }
  }, [errors]);
  return (
    <div>
      <div className="flex justitfy-bettwen">
        <DashboardHeading title="Update profile"></DashboardHeading>
      </div>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="w-[300px] h-[300px] mx-auto rounded-full ">
          <Field>
            <Label>Upload</Label>
            <ImageUpload
              onChange={handleSelectImage}
              name="image"
              image={image}
              progress={progress}
              onClickRemove={handleDRemoveImage}
            ></ImageUpload>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Fullname</Label>
            <Input
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              disabled={true}
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Email</Label>
            <Input
              disabled={true}
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <InputPasswordToggle
              name="password"
              placeholder="Enter your password"
              control={control}
            ></InputPasswordToggle>
          </Field>
        </div>

        <Button
          kind="primary"
          type="submit"
          className="mx-auto w-[200px]"
          isLoading={loading}
          disable={loading}
        >
          Udpate profile
        </Button>
      </form>
    </div>
  );
}

export default UserProfile;
