import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface FormSectionCardProps {
  title: string;
  description?: string;
  inputColumns?: number;
}

const FormSectionCard: React.FC<FormSectionCardProps> = ({
  title,
  description,
  inputColumns = 3,
}) => {
  // Create an array of 5 items for inputs
  const inputs = Array.from({ length: 5 }, (_, i) => i);

  return (
    <Card className="w-[62rem] -translate-12">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
        <hr className="-mt-4"/>
      <CardContent>
        <div
          className={`grid gap-3 ${
            inputColumns === 1
              ? "grid-cols-1"
              : inputColumns === 3
              ? "grid-cols-1 md:grid-cols-3"
              : "grid-cols-1 md:grid-cols-2"
          }`}
        >
          {inputs.map((index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-8 w-full bg-gray-300" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FormSectionCard;
