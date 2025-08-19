import React from "react";
import FormSectionCard from "./FormSectionCard";
import { Skeleton } from "@/components/ui/skeleton";

interface Section {
  id: string;
  title: string;
  description?: string;
}

interface MultiSectionFormProps {
  sections: Section[];
  inputColumns?: number;
  spacing?: "tight" | "normal" | "loose";
}

const MultiSectionForm: React.FC<MultiSectionFormProps> = ({
  sections,
  inputColumns = 2,
  spacing = "normal",
}) => {
  // Map spacing option to actual spacing value
  const spacingMap = {
    tight: "space-y-4",
    normal: "space-y-6",
    loose: "space-y-8",
  };

  const spacingClass = spacingMap[spacing];

  return (
    <div className={`w-full ${spacingClass}`}>
      {sections.map((section) => (
        <FormSectionCard
          key={section.id}
          title={section.title}
          description={section.description}
          inputColumns={inputColumns}
        />
      ))}
      <div className="flex justify-end space-x-4 mt-6">
        <Skeleton className="h-10 w-24 bg-primary/30" />
      </div>
    </div>
  );
};

export default MultiSectionForm;
