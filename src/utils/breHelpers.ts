// utils/breHelpers.ts

import { PARAMS } from "@/lib/constants";

// import { PARAMS } from "@/constants/breParams";
export type RawBreItem = {
  key: string;
  is_mandatory?: boolean;
  weightage?: string | number;
  type?: string;
  value?: string | number | Array<number> | any;
  isMulti?: string;
};

export type Param = {
  key: string;
  name: string;       // human readable
  subtitle?: string | string[];  // small hint / existing value or array for multi-select
  type?: string;
  mandatory?: boolean;
  weightage?: number | string;
  multi?: boolean;    // renamed from isMulti and changed to boolean
};




function titleCaseFromCamel(camel: string) {
  // creditScore -> Credit Score
  return camel
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (s) => s.toUpperCase());
}

export function guessTypeFromKeyOrValue(key: string): string | undefined {
  for (const category in PARAMS) {
    const cat = category as keyof typeof PARAMS;  // ✅ fix

    const param = PARAMS[cat].find((item) => item.key === key);
    if (param) {
      return param.type;
    }
  }
  return "number";  // default type
}

export function getMultiFromKey(key: string): boolean {
  for (const category in PARAMS) {
    const cat = category as keyof typeof PARAMS;

    const param = PARAMS[cat].find((item) => item.key === key);
    if (param && 'multi' in param) {
      return !!param.multi;
    }
  }
  return false;  // default to single select
}

export function mapRawToParam(item: RawBreItem): Param {
  const isMulti = getMultiFromKey(item.key);
  
  return {
    key: item.key,
    name: titleCaseFromCamel(item.key),
    subtitle: Array.isArray(item.value)
      ? (isMulti ? item.value : item.value.join(", "))
      : item.value !== undefined && item.value !== null
      ? String(item.value)
      : "",
    type: guessTypeFromKeyOrValue(item.key),  
    multi: isMulti,
    mandatory: !!item.is_mandatory,
    weightage: item.weightage ?? "",
  };      
}

// map array helper
export function mapRawArrayToParams(arr?: RawBreItem[]) {
  if (!arr) return [];
  return arr.map(mapRawToParam);
}
