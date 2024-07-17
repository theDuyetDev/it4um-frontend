import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
const InputBox = ({
  name,
  type,
  id,
  value,
  placeholder,
  onChange,
  disabled,
}) => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  return (
    <div className="relative w-[100%] mb-2">
      <input
        name={name}
        type={
          type === "password" ? (visiblePassword ? "text" : "password") : type
        }
        placeholder={placeholder}
        id={id}
        value={value}
        className="input-box"
        onChange={onChange}
        required
        disabled={disabled}
      />
      {type === "password" ? (
        <button
          type="button"
          className="password-icon"
          onClick={() => setVisiblePassword((currentVal) => !currentVal)}
        >
          {visiblePassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default InputBox;
