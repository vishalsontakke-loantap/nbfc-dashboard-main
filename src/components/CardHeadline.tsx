import { cn } from "@/lib/utils";

const CardHeadline = ({title, hr = 'yes', className}: {title: string, hr?: string, className?:string}) => {
  return (
    <>
      <h1 className={cn("text-lg font-bold", className)}>{title}</h1>

      {hr === "yes" && <hr />}
    </>
  );
}

export default CardHeadline
