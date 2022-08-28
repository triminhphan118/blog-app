import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import ImageUpload from "components/images/ImageUpload";
import { Input } from "components/input";
import InputPasswordToggle from "components/input/InputPasswordToggle";
import { Label } from "components/label";
import { TextArea } from "components/textArea";
import { db } from "firebase-app/firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import useUploadImageFS from "hooks/useUploadImageFS";
import DashboardHeading from "module/dashboard/DashboardHeading";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { roleUser, statusUser } from "utils/constants";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { addUsers, updateUsers } from "redux/users/usersSlice";
const schema = Yup.object({
  fullname: Yup.string().required("Please enter your fullname."),
  email: Yup.string()
    .email("Please enter email in valid")
    .required("Please ennter your email"),
  username: Yup.string()
    .matches(/^[a-z0-9_-]{3,16}$/, "Username invalid")
    .required("Please enter your username."),
});

function UserUpdate() {
  const [params] = useSearchParams();
  const userID = params.get("id");
  const regexImage = /%2F(\S+)\?/gm;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    users: { users },
    loading,
  } = useSelector((state) => state.user);
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setError,
    getValues,
    setValue,
    formState: { isValid, errors },
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
    let userCurrent =
      users.length > 0 && users.find((item) => item._id === userID);
    console.log(userCurrent);
    reset(userCurrent && { ...userCurrent, password: "" });
    const imageUrl = userCurrent.avatar;
    const imgUrl = regexImage.exec(imageUrl);
    imgUrl && setImage(imageUrl && imageUrl);
  }, [reset, userID]);

  const watchStatus = watch("status");
  const watchRole = watch("role");
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
      })
    );
    setProgress(0);
  };
  useEffect(() => {
    document.title = "update user";
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
        <DashboardHeading
          title="Update user"
          desc={`Update user id:#${userID}`}
        ></DashboardHeading>
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
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === statusUser.Active}
                value={statusUser.Active}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === statusUser.Pending}
                value={statusUser.Pending}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === statusUser.Ban}
                value={statusUser.Ban}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={+watchRole === roleUser.Admin}
                value={roleUser.Admin}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={+watchRole === roleUser.Mod}
                value={roleUser.Mod}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={+watchRole === roleUser.User}
                value={roleUser.User}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Decsription</Label>
            <TextArea
              control={control}
              name="decs"
              placeholder="Enter your decscription"
            ></TextArea>
          </Field>
        </div>
        <Button
          kind="teal"
          type="submit"
          className="mx-auto w-[200px]"
          isLoading={loading}
          disable={loading}
        >
          Udpate user
        </Button>
      </form>
    </div>
  );
}

export default UserUpdate;
