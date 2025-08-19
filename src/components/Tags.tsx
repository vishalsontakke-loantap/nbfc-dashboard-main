const Tags = ({ tag = "Disbursement" }: { tag?: string }) => {
  return (
    <span className="bg-[#C3EEFF] rounded-3xl text-xs text-muted-foreground p-1 contain-content">
      {tag}
    </span>
  );
};

export default Tags
