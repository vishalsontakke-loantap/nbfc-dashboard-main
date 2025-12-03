// utils/breHelpers.ts
export type RawBreItem = {
  key: string;
  is_mandatory?: boolean;
  weightage?: string | number;
  value?: string | number | Array<number> | any;
};

export type Param = {
  key: string;
  name: string;       // human readable
  subtitle?: string;  // small hint / existing value
  type?: "money" | "percent" | "number" | "text" | "array";
  mandatory?: boolean;
  weightage?: number | string;
};

function titleCaseFromCamel(camel: string) {
  // creditScore -> Credit Score
  return camel
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (s) => s.toUpperCase());
}

export function guessTypeFromKeyOrValue(key: string, value: any): Param["type"] {
   return "number";
  return "text";
}

export function mapRawToParam(item: RawBreItem): Param {
  return {
    key: item.key,
    name: titleCaseFromCamel(item.key),
    subtitle:
      Array.isArray(item.value)
        ? `Values: ${item.value.join(", ")}`
        : item.value !== undefined && item.value !== null
        ? String(item.value)
        : "",
    type: guessTypeFromKeyOrValue(item.key, item.value),
    mandatory: !!item.is_mandatory,
    weightage: item.weightage ?? "",
  };
}

// map array helper
export function mapRawArrayToParams(arr?: RawBreItem[]) {
  if (!arr) return [];
  return arr.map(mapRawToParam);
}
