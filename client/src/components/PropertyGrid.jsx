import Pagination from "./Pagination";
import Property from "./Property";
import SearchSortBar from "./SearchSortBar";

export default function PropertyGrid() {
  return (
    <>
        <SearchSortBar />
        <div className="grid grid-cols-1 md:grid-cols-3 w-full lg:grid-cols-4 gap-4 p-[20px]">
            <Property />
            <Property />
            <Property />
            <Property />
            <Property />
            <Property />
            <Property />
            <Property />
        </div>
        <div className="w-full flex justify-center mb-10">
            <Pagination />
        </div>
    </>
  )
}
