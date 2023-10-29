import * as yup from "yup";

export const addItemYupSchema = yup.object().shape({
  name: yup.string().required("Item name is required"),
  price: yup.string().required("Price is required"),
  img: yup.string().required("Image is required"),
});
