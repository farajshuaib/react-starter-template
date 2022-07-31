import React from "react";

interface props {
  data: any;
  children: React.ReactNode
}

const Safe: React.FC<props> = ({ children, data }) => {
  if (data) {
    return <>{children}</>;
  } else {
    return (
      <div>
        <h5 className="my-12 text-2xl text-center">This page is empty</h5>
      </div>
    );
  }
};

export default Safe;
