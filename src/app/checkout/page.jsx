import ViewCheckout from "@/components/ViewCheckout";

function checkoutPage() {
  return (
    <div className="flex justify-center mt-20 gap-5">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <ViewCheckout />{" "}
        </div>
      </div>
    </div>
  );
}

export default checkoutPage;
