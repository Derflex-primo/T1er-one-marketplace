import { ReactNode } from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="
    min-w-full
    mx-auto
    xl:px-10
    md:px-2
    px-2
    "
    > {children} </div>
  );
};

export default Container;
