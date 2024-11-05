import Spinner from "@/components/Spinner";

function loading() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <Spinner />
    </div>
  );
}

export default loading;
