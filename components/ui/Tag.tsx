type TagProperties = {} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function Tag({ className, ...props }: TagProperties) {
  return (
    <span className={`tag ${className ?? ''}`} {...props} />
  );
};
