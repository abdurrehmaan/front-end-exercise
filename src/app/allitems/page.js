import AllItems from "@/components/AllItems";

export default function AllItemsPage() {
  return (
    <div>
      <main>
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
            <AllItems />
          </div>
        </div>
      </main>
    </div>
  );
}
