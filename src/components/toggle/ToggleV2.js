import PropTypes from "prop-types";

const ToggleV2 = (props) => {
  const { on, name, control, children, onClick, ...rest } = props;
  return (
    <label>
      <input
        type="checkbox"
        checked={on}
        className="hidden-input"
        onClick={onClick}
        {...rest}
      />
      <div
        className={`inline-block w-[70px] h-[42px] relative cursor-pointer rounded-full p-1 transition-all ${
          on ? "bg-[#f8fafc]" : "bg-[#fef9c3]"
        }`}
        {...rest}
      >
        <span
          className={`transition-all w-[34px] h-[34px] rounded-full flex items-center justify-center ${
            on
              ? "translate-x-[28px] bg-[#d4d4d4] text-[#1d4ed8]"
              : " bg-[#fff] text-[#facc15]"
          }`}
        >
          {children}
        </span>
      </div>
    </label>
  );
};

ToggleV2.propTypes = {
  on: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ToggleV2;
