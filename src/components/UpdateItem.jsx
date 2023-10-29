"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
//formik
import { Formik } from "formik";

//yup schemas
import { addItemYupSchema } from "@/validation/addItemYupSchema";

//rtk query
import {
  useGetItemsByIdQuery,
  useUdpateItemMutation,
} from "@/redux/features/ItemsApi";

export default function UpdateItem({ id }) {
  const [successMessage, setSuccessMessage] = useState();
  const { currentData, isLoading } = useGetItemsByIdQuery(id);
  const [updateItem, response] = useUdpateItemMutation();

  const router = useRouter();
  return (
    <div className="flex justify-center flex-col items-center mt-5">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Formik
          initialValues={{
            name: currentData?.name,
            price: currentData?.price,
            img: currentData?.img,
          }}
          validationSchema={addItemYupSchema}
          onSubmit={async (values, { resetForm }) => {
            const data = {
              id,
              name: values.name,
              price: values.price,
              img: values.img,
            };
            await updateItem(data);
            resetForm();
            setSuccessMessage("Item updated Successfully Added");
            setTimeout(() => {
              router.push("/allitems");
            }, 1000);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isSubmitting,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl w-[500px] "
            >
              <div className="px-4 py-6 sm:p-8">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
                  <div className="col-span-full">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Item Name
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Item Name"
                        defaultValue={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid="true"
                        aria-describedby="email-error"
                      />
                    </div>

                    {errors.name && touched.name ? (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Item Price
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                      <input
                        type="text"
                        name="price"
                        id="price"
                        className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Item Price"
                        defaultValue={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid="true"
                      />
                    </div>
                    {errors.price && touched.price ? (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {errors.price}
                      </p>
                    ) : null}
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="img"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Item Image
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                      <input
                        id="img"
                        name="img"
                        type="file"
                        defaultValue={(event) => {
                          setFieldValue("file", event.currentTarget.files[0]);
                        }}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.img && touched.img ? (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {errors.img}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Item
                </button>
              </div>
            </form>
          )}
        </Formik>
      )}
      {response?.isLoading && <h1>loading...</h1>}
      {response?.isError && (
        <div className="rounded-md bg-red-50 p-4 mt-3">
          <div className="flex">
            <div className="flex-shrink-0"></div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                {response?.error?.data?.message}
              </h3>
            </div>
          </div>
        </div>
      )}
      {response?.isSuccess && (
        <div className="rounded-md bg-green-50 p-4 mt-3">
          <div className="flex">
            <div className="flex-shrink-0"></div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                {successMessage}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
