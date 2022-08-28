import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field } from "components/field";
import FieldCheckboxes from "components/field/FieldCheckboxes";
import { Label } from "components/label";
import DashboardHeading from "module/dashboard/DashboardHeading";
import { Input } from "components/input";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { status } from "utils/constants";
import { useEffect } from "react";
import { toast } from "react-toastify";
import slugify from "slugify";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { updateCategories } from "redux/category/categorySlice";
const schema = Yup.object({
  name: Yup.string().required("Please enter your title."),
});

function CategoryUpdate() {
  let [searchParams] = useSearchParams();
  const idCategory = searchParams.get("id");
  const {
    categories: { categories },
  } = useSelector((state) => state.category);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispath = useDispatch();

  const {
    control,
    setValue,
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (categories.length > 0) {
      const category = categories.find((item) => item._id === idCategory);
      reset(category);
    }
  }, [categories, idCategory, reset]);
  const watchStatus = watch("status");
  const handleUpdateCategory = (values) => {
    const cloneValues = { ...values };
    cloneValues.slug = slugify(cloneValues.slug || cloneValues.name, {
      lower: true,
    });
    dispath(
      updateCategories({
        user,
        id: idCategory,
        value: cloneValues,
      })
    );
  };
  useEffect(() => {
    document.title = "Update category";
    if (Object.keys(errors).length > 0) {
      toast.error(errors[Object.keys(errors)[0]].message, {
        pauseOnHover: false,
        autoClose: 1000,
      });
    }
  }, [errors]);
  if (!idCategory) return;
  return (
    <div>
      <DashboardHeading
        title="Update category"
        desc={`update category id:#${idCategory}`}
      ></DashboardHeading>

      <form onSubmit={handleSubmit(handleUpdateCategory)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
          <FieldCheckboxes>
            <Label>Status</Label>
            <div className="flex flex-wrap gap-x-5">
              <Radio
                name="status"
                control={control}
                value={status.Approved}
                checked={+watchStatus === status.Approved}
                onClick={() => setValue("status", status.Approved)}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                value={status.UnApproved}
                onClick={() => setValue("status", status.UnApproved)}
                checked={+watchStatus === status.UnApproved}
              >
                Unapproved
              </Radio>
            </div>
          </FieldCheckboxes>
          <Button
            kind="green"
            className="mx-auto w-[250px] mt-4"
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            Update category
          </Button>
        </div>
      </form>
    </div>
  );
}
export default CategoryUpdate;
