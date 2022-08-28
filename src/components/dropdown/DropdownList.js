import { useDropdown } from "./dropdown-context";

function DropdownList({ children }) {
  const { show } = useDropdown();
  return (
    <>
      {show && (
        <div className="absolute top-full left-0 w-full bg-white shadow-sm z-20 h-[300px] overflow-y-scroll right-0 overflow-hidden shadow-lg">
          {children}
        </div>
      )}
    </>
  );
}
export default DropdownList;
