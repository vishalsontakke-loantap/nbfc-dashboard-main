declare type myCardComponents = {
  imgSrc: string;
  imgAlt: string;
  heading: string;
  subtext: string;
  badge?: string;
};

declare interface CardHeaderHandle {
  getValue: () => string;
}

declare interface CardHeaderProps {
  title: string;
  subtitle?: string;
  pclassName?: string;
  weightage?: boolean;
}

declare interface BRETablesProps {
  title: string;
  value: string;
  subtitle: string;
  navTo: string;
  paramsArr: any[];
  onSubmit?: () => void;
}

declare interface LoanProductTablesProps {
  title: string;
  subtitle: string;
  navTo: string;
  paramsArr: any[];
  onSubmit?: () => void;
}

declare interface TabStore {
  submittedTabs: string[];
  markTabAsSubmitted: (tab: string) => void;
}

declare interface ButtonRoundProps {
  src: string;
  alt: string;
  id: string;
  className?: string;
  progress? : number;
}

declare interface RunProgressParams {
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

declare type tableDataParams = {
  sl: number;
  nbfcId: string;
  appId: string;
  status: "Approved" | "Rejected";
  name: string;
  tenure: number;
  nbfcDisbursedAmount: number;
  posAmount: number;
};

declare type UsePaginationParams = {
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
};

declare type PaginationRange = Array<number | typeof DOTS>;

declare interface SidebarItem {
  to: string;
  label: string;
  icon: string;
  match: string[];
}