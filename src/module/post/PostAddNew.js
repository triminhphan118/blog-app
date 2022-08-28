import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Dropdown } from "components/dropdown";
import { Field } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import React, { useLayoutEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import styled from "styled-components";
import { statusPost } from "utils/constants";

import ImageUpload from "components/images/ImageUpload";
import useUploadImageFS from "hooks/useUploadImageFS";
import Toggle from "components/toggle/Toggle";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import DashboardHeading from "module/dashboard/DashboardHeading";
import "react-quill/dist/quill.snow.css";

import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import { apiImgBB } from "config/config";
import axios from "axios";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { addPosts } from "redux/posts/postsSlice";
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
const PostAddNewStyles = styled.div``;
const PostAddNew = () => {
  const [selectCategory, setSelectCategory] = useState({});
  const [content, setContent] = useState();
  const { user } = useSelector((state) => state.auth);
  const {
    categories: { categories },
  } = useSelector((state) => state.category);
  const [cateActive, setCateActive] = useState([]);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      user: {},
      hot: false,
      category: {},
    },
    resolver: yupResolver(schema),
  });
  const {
    setImage,
    setProgress,
    progress,
    image,
    handleSelectImage,
    handleDRemoveImage,
  } = useUploadImageFS(setValue, getValues);
  const watchStatus = watch("status");
  const watchHot = watch("hot");

  const handleAddPost = (values) => {
    const cloneValues = { ...values };
    cloneValues.slug = slugify(cloneValues.slug || cloneValues.title, {
      lower: true,
    });
    dispatch(
      addPosts({
        user: user,
        value: {
          ...cloneValues,
          user: user._id,
          image,
        },
      })
    );
    reset({
      title: "",
      slug: "",
      image: "",
      content: "",
      status: 2,
      hot: false,
      category: {},
    });
    setSelectCategory({});
    setImage("");
    setProgress(0);
    setContent("");
  };

  useEffect(() => {
    dispatch(
      getAllCategories({
        user,
      })
    );
  }, []);

  useLayoutEffect(() => {
    let categoriesActive = categories.filter((item) => +item.status === 1);
    setCateActive(categoriesActive);
  }, [categories]);

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
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "multipart/form-data",
            },
          });
          console.log(response.image.url);
          // return response.data.data.url;
        },
      },
    };
  }, []);
  useEffect(() => {
    document.title = "Add new post";
    if (Object.keys(errors).length > 0) {
      toast.error(errors[Object.keys(errors)[0]].message, {
        pauseOnHover: false,
        autoClose: 1000,
      });
    }
  }, [errors]);
  return (
    <PostAddNewStyles>
      <DashboardHeading
        title="Add new post"
        desc="add new posts"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddPost)}>
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
                {cateActive.length > 0 &&
                  cateActive.map((item) => (
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
            <Toggle control={control} name="hot" on={watchHot}></Toggle>
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
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          {/* <Field>
            <Label>Author</Label>
            <Input
              control={control}
              placeholder="Find the author"
              name="author"
            ></Input>
          </Field> */}
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
          {isSubmitting ? (
            <div className="border-4 border-t-transparent border-b-transparent animate-spin transition-all border-white w-10 h-10 rounded-full"></div>
          ) : (
            "Add new post"
          )}
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
