import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Dropdown } from "components/dropdown";
import { Field } from "components/field";
import ImageUpload from "components/images/ImageUpload";
import { Input } from "components/input";
import { Label } from "components/label";
import Toggle from "components/toggle/Toggle";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import useUploadImageFS from "hooks/useUploadImageFS";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { status, statusPost } from "utils/constants";
import "react-quill/dist/quill.snow.css";
import slugify from "slugify";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import { apiImgBB } from "config/config";
import axios from "axios";
import { useAuth } from "contexts/auth-context";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { updatePosts } from "redux/posts/postsSlice";
import { getAllCategories } from "redux/category/categorySlice";
const schema = Yup.object({
  title: Yup.string().required("Please enter your title."),
  category: Yup.string().required("Please enter your category."),
  image: Yup.string().required("Please select your image."),
  content: Yup.string()
    .required("Please enter your content.")
    .min(50, "Content must be at least 50 characters."),
});

Quill.register("modules/imageUploader", ImageUploader);

const PostUpdate = () => {
  const [params] = useSearchParams();
  const postId = params.get("id");
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [content, setContent] = useState("");
  const regexImage = /%2F(\S+)\?/gm;
  const { user } = useSelector((state) => state.auth);
  const {
    posts: { posts },
    loading,
  } = useSelector((state) => state.posts);
  const {
    categories: { categories: categoriesStore },
  } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAllCategories({
        user,
      })
    );
  }, []);
  const {
    control,
    handleSubmit,
    watch,
    reset,
    getValues,
    setValue,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      image: "",
      content: "",
      status: 2,
      hot: false,
      category: {},
    },
    resolver: yupResolver(schema),
  });
  const imageName = regexImage.exec(getValues("image"));
  const {
    image,
    setImage,
    progress,
    setProgress,
    handleSelectImage,
    handleDRemoveImage,
  } = useUploadImageFS(setValue, getValues, imageName);

  useLayoutEffect(() => {
    if (categoriesStore.length < 1) {
      dispatch(
        getAllCategories({
          user: user,
          params: {},
        })
      );
    }
    let categoriesActive = categoriesStore.filter((item) => +item.status === 1);
    setCategories(categoriesActive);
  }, []);

  useEffect(() => {
    if (posts.length < 0) return;
    const post = posts.find((item) => item._id === postId);
    if (post) {
      reset({ ...post, category: post.category?._id, user: post.user?._id });
      setContent(post.content);
      setSelectCategory(post.category);
      const imageUrl = post.image;
      const imgUrl = regexImage.exec(imageUrl);
      imgUrl && setImage(imageUrl && imageUrl);
    }
  }, [postId]);

  const handleUpdatePost = (values) => {
    if (!isValid) return;
    const cloneValues = { ...values };
    cloneValues.slug = slugify(cloneValues.slug || cloneValues.title);
    dispatch(
      updatePosts({
        user,
        id: postId,
        value: {
          ...cloneValues,
          image,
          content,
          status: +cloneValues.status,
          hot: +cloneValues.hot,
          user: user._id,
          category: cloneValues.category,
        },
      })
    );
    // setSelectCategory({});
    setProgress(0);
  };
  const watchHot = watch("hot");
  const watchStatus = watch("status");
  const handleSelectCategory = (item) => {
    setValue("category", item._id);
    setSelectCategory(item);
  };
  const modules = useMemo(() => {
    return {
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("image", file);
          const response = await axios({
            url: apiImgBB,
            method: "post",
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return response.data.data.url;
        },
      },
    };
  }, []);
  useEffect(() => {
    document.title = "Update post";
    if (Object.keys(errors).length > 0) {
      toast.error(errors[Object.keys(errors)[0]].message, {
        pauseOnHover: false,
        autoClose: 1000,
      });
    }
  }, [errors]);
  if (!postId) return;

  return (
    <div>
      <DashboardHeading
        title="Update new post"
        desc={`update new posts id: #${postId}`}
      ></DashboardHeading>

      <form onSubmit={handleSubmit(handleUpdatePost)}>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
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
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Label
                placeholder={`${selectCategory?.name || "Select category"}`}
              ></Dropdown.Label>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Dropdown.Option
                      key={item._id}
                      onClick={() => handleSelectCategory(item)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            {selectCategory?.name && (
              <span className="p-2 text-sm font-medium text-green-500 mt-2 bg-green-50 inline-block rounded-lg">
                {selectCategory?.name}
              </span>
            )}
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Feature Post</Label>
            <Toggle
              control={control}
              name="hot"
              on={watchHot ? true : false}
            ></Toggle>
          </Field>
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                onClick={() => setValue("status", "approved")}
                checked={+watchStatus === statusPost.APPROVED}
                value={statusPost.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                onClick={() => setValue("status", "pending")}
                checked={+watchStatus === statusPost.PENDING}
                value={statusPost.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                onClick={() => setValue("status", statusPost.REJECT)}
                checked={+watchStatus === statusPost.REJECT}
                value={statusPost.REJECT}
              >
                Reject
              </Radio>
            </div>
          </Field>
        </div>

        <Field>
          <Label>Content</Label>
          <div className="w-full entry-content">
            <ReactQuill
              modules={modules}
              theme="snow"
              value={content}
              onChange={(content) => {
                setContent(content);
                setValue("content", content);
              }}
            />
          </div>
        </Field>
        <Button type="submit" className="mx-auto w-[250px]">
          {loading ? (
            <div className="border-4 border-t-transparent border-b-transparent animate-spin transition-all border-white w-10 h-10 rounded-full"></div>
          ) : (
            "Update post"
          )}
        </Button>
      </form>
    </div>
  );
};

export default PostUpdate;
