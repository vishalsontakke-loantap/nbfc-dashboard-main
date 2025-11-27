import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MultiSectionForm from "@/components/ui/MultiSectionForm";
import { formSkeletons } from "@/lib/constants";
import CardHeader from "../CardHeader";
import CardHeadline from "../CardHeadline";

import { rbiLisenceTypes } from "@/lib/constants";
import { formatIndianNumber } from "@/lib/utils";
import ProgressBar from "../ProgressBar";
import { fileToBase64 } from "@/lib/Base64Convert";
const twoDecimalRegex = /^\d+(\.\d{1,2})?$/;
const fileSchema = z
  .instanceof(File, { message: "File is required" })
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "Max file size is 5MB",
  })
  .refine(
    (file) => {
      const allowedTypes = [
        "image/jpeg", // jpg, jpeg
        "image/png", // png
        "image/gif", // gif
        "application/pdf", // pdf
        "text/csv", // csv
        "application/vnd.ms-excel", // xls
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // xlsx
        "application/vnd.ms-excel.sheet.macroenabled.12", // xlsm
      ];
      return allowedTypes.includes(file.type);
    },
    {
      message:
        "Only the following file types are accepted: jpg, jpeg, png, gif, pdf, csv, xls, xlsx, xlsm",
    }
  )
  .optional();
  
function ErrorInlineInput({ field, error, ...props }) {
  const displayValue = error ? `${field.value} (${error})` : field.value;

  return (
    <Input
      {...props}
      value={displayValue}
      onChange={(e) => field.onChange(e.target.value.replace(/ *\([^)]*\) */g, ""))}
    />
  );
}
const formSchema = z.object({
  product_name: z.string().min(4, { message: "Product name is required" }),
  product_type: z.string().min(4, { message: "Product type is required" }),
  max_disbursement_cap: z.string()
    .min(10, { message: "Max Disbursement Cap should be minimum 1000000000" }),
  processing_fee: z.string()
    .min(2, { message: "Processing fee is required" }),
  service_fee: z.string({
    required_error: "Service fee is required",
  })
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(String(val)), {
      message: "Service fee must be a valid number (max 2 decimal places)",
    }),
  gst_on_service_fee: z.string()
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(String(val)), {
      message: "Service fee must be a valid number (max 2 decimal places)",
    }),
  nbfc_share: z
    .string()
    .min(1, { message: "NBFC share is required" })
    .refine((v) => twoDecimalRegex.test(v), {
      message: "NBFC share must be a valid number (max 2 decimal places)",
    })
    .transform((v) => Number(v)),

  bank_share: z
    .string()
    .min(1, { message: "Bank share is required" })
    .refine((v) => twoDecimalRegex.test(v), {
      message: "Bank share must be a valid number (max 2 decimal places)",
    })
    .transform((v) => Number(v)),

  nbfc_roi: z
    .string()
    .min(1, { message: "NBFC ROI is required" })
    .refine((v) => twoDecimalRegex.test(v), {
      message: "NBFC ROI must be a valid number (max 2 decimal places)",
    })
    .transform((v) => Number(v)),

  bank_roi: z
    .string()
    .min(1, { message: "Bank ROI is required" })
    .refine((v) => twoDecimalRegex.test(v), {
      message: "Bank ROI must be a valid number (max 2 decimal places)",
    })
    .transform((v) => Number(v)),

  blended_roi: z
    .string()
    .min(1, { message: "Blended ROI is required" })
    .refine((v) => twoDecimalRegex.test(v), {
      message: "Blended ROI must be a valid number (max 2 decimal places)",
    })
    .transform((v) => Number(v)),

  colending_arrangement_doc: fileSchema
}).refine(
  (data) => data.nbfc_share + data.bank_share === 100,
  {
    message: "NBFC share + Bank share must equal 100",
    path: ["nbfc_share"], // error appears under nbfc_share (you can change it)
  }
);

const LoanProductConfig = () => {
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_name: "",
      product_type: "",
      max_disbursement_cap: undefined,
      processing_fee: undefined,
      service_fee: undefined,
      gst_on_service_fee: undefined,
      nbfc_share: undefined,
      bank_share: undefined,
      nbfc_roi: undefined,
      bank_roi: undefined,
      blended_roi: undefined,
      colending_arrangement_doc: undefined
    },
  });
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const authToken = import.meta.env.VITE_API_AUTH_TOKEN;

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    console.log("Loan product submitted with data:", data);
    setIsSubmitting(true);

    try {
      // Convert all files to Base64 strings
      const arrangemet_doc = await fileToBase64(data.colending_arrangement_doc);
      const payload = {
        product_name: data.product_name,
        product_type: data.product_type,
        max_disbursement_cap: data.max_disbursement_cap,
        processing_fee: data.processing_fee,
        service_fee: data.service_fee,
        gst_on_service_fee: data.gst_on_service_fee,
        nbfc_share: data.nbfc_share,
        bank_share: data.bank_share,
        nbfc_roi: data.nbfc_roi,
        bank_roi: data.bank_roi,
        blended_roi: data.blended_roi,
        colending_arrangement_doc: data.colending_arrangement_doc,
       
        documents: {
          arrangement_doc: arrangemet_doc,
        },
      };
      const response = await axios.post(
        `${apiBaseUrl}/create-product`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      navigate("/loan-products");

    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setIsSubmitting(false);
      navigate(`/nbfc/details/${id}`);
    }
  };
  return (
    <div className="flex flex-col space-y-4 p-5">
      <CardHeader
        title="Loan Product Details"
        subtitle="Tell us about your product to begin your product onboarding journey."
      />

      {loading ? (
        <div className="container py-10 mx-auto">
          {/* <div className="max-w-4xl mx-auto">
            <MultiSectionForm
              sections={formSkeletons}
              inputColumns={3}
              spacing="tight"
            />
          </div> */}
        </div>
      ) : (
        <Form {...form}>
          <form
            id="nbfc-form"
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* Product Details */}
            <div className="bg-white shadow-sm rounded-lg p-5 space-y-3 space-x-4">
              <CardHeadline title="1. Product Info" />
              <span className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 space-x-4 space-y-1">
                <FormField
                  control={form.control}
                  name="product_name"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Product Name"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value.toUpperCase())
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="product_type"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Product Type</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the Product Type"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value.toUpperCase())
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="max_disbursement_cap"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Max Disbursement Cap</FormLabel>
                      <Input
                      type="number"
                          placeholder="Enter the Max Disbursement Cap"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value.toUpperCase())
                          }
                        />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bank_share"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Bank Share %</FormLabel>
                      <FormControl>
                        <Input placeholder="Bank Share" {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nbfc_share"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>NBFC Share %</FormLabel>
                      <FormControl>
                        <Input placeholder="NBFC Share" {...field}  type="number"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
{/* 
                <FormField
                  control={form.control}
                  name="date_of_incorporation"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Date of Incorporation</FormLabel>
                      <FormControl>
                        <div className="relative">
                          {!field.value && (
                            <span className="bg-white w-50 absolute left-3 top-2 text-muted-foreground pointer-events-none text-sm">
                              Enter Date of Incorporation
                            </span>
                          )}
                          <Input
                            type="date"
                            max={new Date().toISOString().split("T")[0]}
                            value={
                              field.value instanceof Date &&
                                !isNaN(field.value.getTime())
                                ? field.value.toISOString().split("T")[0]
                                : ""
                            }
                            onChange={(e) => {
                              const val = e.target.value;
                              field.onChange(val ? new Date(val) : null); // support clearing the date
                            }}
                            onFocus={(e) => e.currentTarget.showPicker?.()}
                            ref={(input) => {
                              if (input) {
                                input.onclick = () => input.showPicker?.();
                              }
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="business_limit"
                  render={({ field }) => {
                    return (
                      <FormItem className="mb-4">
                        <FormLabel>Business Limit</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                              ₹
                            </span>
                            <Input
                              placeholder="Business Limit"
                              inputMode="numeric"
                              className="pl-7" // make room for ₹ symbol
                              value={
                                field.value
                                  ? formatIndianNumber(field.value.toString())
                                  : ""
                              }
                              onChange={(e) => {
                                const raw = e.target.value.replace(
                                  /[^0-9]/g,
                                  ""
                                );
                                field.onChange(raw);
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                /> */}
              </span>
            </div>

            {/* NBFC Contact Details */}
            <div className="bg-white shadow-sm rounded-lg p-5 space-y-3 space-x-4">
              <CardHeadline title="2. Interest Rate Details" />
              <span className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 space-x-4 space-y-1">
                <FormField
                  control={form.control}
                  name="bank_roi"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Bank Interest %</FormLabel>
                      <FormControl>
                        <Input placeholder="Bank Interest" {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nbfc_roi"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>NBFC Interest %</FormLabel>
                      <FormControl>
                        <Input placeholder="NBFC Interest" {...field} type="number"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="blended_roi"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Blended Interest %</FormLabel>
                      <FormControl>
                        <Input placeholder="Blended Interest" {...field} type="number"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="processing_fee"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Processing Fee</FormLabel>
                      <FormControl>
                        <Input placeholder="Processing Fee" {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="service_fee"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Service Fee</FormLabel>
                      <FormControl>
                        <Input placeholder="Service Fee" {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gst_on_service_fee"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>GST on Service Fee %</FormLabel>
                      <FormControl>
                        <Input placeholder="GST on Service Fee %" {...field} type="number"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </span>
            </div>

            {/* NBFC Document Upload */}
            <div className="bg-white shadow-sm rounded-lg p-5 space-y-3 space-x-4">
              <CardHeadline title="3. Upload Required Documents" />
              <span className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 space-x-4 space-y-1">
                <FormField
                  control={form.control}
                  name="arrangement_doc"
                  render={({ field }) => {
                    const fileRef = useRef<HTMLInputElement | null>(null);

                    return (
                      <FormItem>
                        <FormLabel>Arrangement Document</FormLabel>

                        {/* Hidden File Input */}
                        <input
                          type="file"
                          accept=".jpg, .jpeg, .png, .gif, .pdf, .csv, .xls, .xlsx, .xlsm"
                          ref={(e) => {
                            fileRef.current = e;
                            field.ref(e);
                          }}
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                          className="hidden"
                        />

                        {/* Buttons Row */}
                        <div className="flex gap-2">
                          {/* Sample Button (non-functional) */}
                          <Button
                            type="button"
                            variant="outline"
                            className="rounded-sm bg-white text-blue-600 border-blue-500 hover:bg-blue-50"
                          >
                            Sample
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="ml-2 h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                              />
                            </svg>
                          </Button>

                          {/* Upload Button */}
                          <Button
                            type="button"
                            className={`rounded-sm bg-blue-500 hover:bg-blue-600 ${field.value?.name
                              ? "text-gray-200 bg-gray-500"
                              : "text-white"
                              }`}
                            disabled={!!field.value?.name}
                            onClick={() => fileRef.current?.click()}
                          >
                            {field.value?.name ? "Uploaded" : "Upload"}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="ml-2 h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
                              />
                            </svg>
                          </Button>
                        </div>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

               
              </span>
            </div>

            <span className="flex justify-end">
              <Button
                className="p-5 text-lg rounded-sm bg-blue-500 hover:bg-blue-600 text-white flex"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </span>
          </form>
        </Form>
      )}
      {/* <div className="p-6">
        <ProgressBar totalSteps={4} currentStep={3} stepName="NBFC Profile Details" />
      </div> */}
    </div>
  );
};

export default LoanProductConfig;