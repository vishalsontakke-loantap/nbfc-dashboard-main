import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

interface PayloadViewerProps {
  data: Record<string, any>;
  title?: string;
}

export function PayloadViewer({
  data,
  title = "Request Data",
}: PayloadViewerProps) {
  const formatLabel = (key: string): string =>
    key
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const renderValue = (value: any): React.ReactNode => {
    if (value === null || value === undefined) {
      return <span className="text-gray-400">—</span>;
    }

    if (typeof value === "boolean") {
      return (
        <span className={value ? "text-green-600" : "text-red-600"}>
          {value ? "True" : "False"}
        </span>
      );
    }

    if (Array.isArray(value)) {
      return (
        <ul className="list-disc pl-4 space-y-1">
          {value.map((item, i) => (
            <li key={i} className="break-words">
              {String(item)}
            </li>
          ))}
        </ul>
      );
    }

    if (typeof value === "object") {
      return (
        <div className="mt-2 space-y-2 border-l-2 border-gray-200 pl-3">
          {Object.entries(value).map(([k, v]) => (
            <div key={k} className="grid grid-cols-[140px,1fr] gap-2">
              <dt className="text-xs text-gray-500">
                {formatLabel(k)}
              </dt>
              <dd className="text-sm">{renderValue(v)}</dd>
            </div>
          ))}
        </div>
      );
    }

    return <span className="break-words">{String(value)}</span>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="px-4 py-4">
        <div
          className="
            grid gap-x-6 gap-y-4
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {Object.entries(data).map(([key, value], index) => (
            <div key={key} className="space-y-1">
              <dt className="text-sm text-gray-600 font-medium">
                {formatLabel(key)}
              </dt>
              <dd className="text-sm">{renderValue(value)}</dd>

              {index < Object.keys(data).length - 1 && (
                <Separator className="mt-3 lg:hidden" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
