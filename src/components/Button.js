  import React from "react";
  const Button = ({ className, title, onclick }) => {
    return (
      <button className={className} onClick={onclick}>
        {title}
      </button>
    );
  };

  export default Button;
