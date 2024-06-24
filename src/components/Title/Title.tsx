type TitleProps = {
  children: React.ReactNode;
  className?: string;
};

export const Title = ({ children, className = "" }: TitleProps) => {
  return (
    <h1 className={`text-left text-[24px] font-semibold ${className}`}>
      {children}
    </h1>
  );
};
