import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar({ value, onChange, onSubmit }) {
  const submit = (e) => {
    e.preventDefault();
    onSubmit?.(value);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <form
        onSubmit={submit}
        className="w-full h-full flex flex-row justify-center items-center"
      >
        <input
          type="text"
          placeholder="Search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-orange-50 border-2 border-amber-950 rounded-l-lg pl-3 pr-0 lg:pr-10 py-1 lg:py-1.5 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-700"
        />
        <button
          type="submit"
          className="bg-amber-950 text-orange-50 font-bold py-1.5 lg:py-2 px-2 flex items-center justify-center rounded-r-lg border-2 border-amber-950 hover:bg-amber-800"
        >
          <MagnifyingGlassIcon className="h-5 w-5 text-orange-50 font-bold" />
        </button>
      </form>
    </div>
  );
}
