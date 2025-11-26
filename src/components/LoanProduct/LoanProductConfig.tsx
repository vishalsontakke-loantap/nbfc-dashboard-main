// LoanProductConfig.tsx
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CardHeader from "../CardHeader";
import CardHeadline from "../CardHeadline";
import { fileToBase64 } from "@/lib/Base64Convert";

const twoDecimalRegex = /^\d+(\.\d{1,2})?$/;

/**
 * File validation schema: optional file with size/type checks
 */
const fileSchema = z
  .instanceof(File, { message: "File is required" })
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "Max file size is 5MB",
  })
  .refine(
    (file) => {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf",
        "text/csv",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel.sheet.macroenabled.12",
      ];
      return allowedTypes.includes(file.type);
    },
    {
      message:
        "Only the following file types are accepted: jpg, jpeg, png, gif, pdf, csv, xls, xlsx, xlsm",
    }
  )
  .optional();

/**
 * Zod schema: accepts strings from form inputs and transforms to numbers
 */
export const formSchema = z
  .object({
    product_name: z.string().min(4, { message: "Product name is required" }),
    product_type: z.string().min(4, { message: "Product type is required" }),

    max_disbursement_cap: z
      .string()
      .min(1, { message: "Max Disbursement Cap is required" })
      .refine((v) => /^\d+(\.\d{0,2})?$/.test(v), {
        message: "Max Disbursement Cap must be a valid number (max 2 decimals)",
      })
      .transform((v) => Number(v)),

    processing_fee: z
      .string()
      .min(1, { message: "Processing fee is required" })
      .refine((v) => /^\d+(\.\d{0,2})?$/.test(v), {
        message: "Processing fee must be a valid number (max 2 decimals)",
      })
      .transform((v) => Number(v)),

    service_fee: z
      .string()
      .min(1, { message: "Service fee is required" })
      .refine((v) => twoDecimalRegex.test(v), {
        message: "Service fee must be a valid number (max 2 decimal places)",
      })
      .transform((v) => Number(v)),

    gst_on_service_fee: z
      .string()
      .min(1, { message: "GST on Service fee is required" })
      .refine((v) => twoDecimalRegex.test(v), {
        message: "GST on service fee must be a valid number (max 2 decimal places)",
      })
      .transform((v) => Number(v)),

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

    // match the input name used in the form below
    arrangement_doc: fileSchema,
  })
  .refine((data) => data.nbfc_share + data.bank_share === 100, {
    message: "NBFC share + Bank share must equal 100",
    path: ["nbfc_share"],
  });

type FormInput = z.input<typeof formSchema>; // inputs produced by the form (strings, File | undefined)
type FormOutput = z.infer<typeof formSchema>; // parsed output (numbers, File | undefined)

const LoanProductConfig: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const form = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_name: "",
      product_type: "",
      max_disbursement_cap: "",
      processing_fee: "",
      service_fee: "",
      gst_on_service_fee: "",
      nbfc_share: "",
      bank_share: "",
      nbfc_roi: "",
      bank_roi: "",
      blended_roi: "",
      arrangement_doc: undefined,
    },
  });

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const authToken = import.meta.env.VITE_API_AUTH_TOKEN;

  // Real submit expects parsed FormOutput (numbers)
  const realSubmit = async (data: FormOutput) => {
    setIsSubmitting(true);
    try {
      const arrangementBase64 = data.arrangement_doc
        ? await fileToBase64(data.arrangement_doc as File)
        : null;

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
        colending_arrangement_doc: arrangementBase64,
      };

      await axios.post(`${apiBaseUrl}/create-product`, payload, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      navigate("/loan-products");
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Wrapper: handle input shape, parse to output shape (FormOutput), then call realSubmit
  const onSubmitWrapper = form.handleSubmit((values: FormInput) => {
    // parse synchronously (resolver already validated but parse also types for TS)
    const parsed = formSchema.parse(values); // throws if invalid (shouldn't happen because resolver ran)
    void realSubmit(parsed);
  });

  return (
    <div className="flex flex-col space-y-4 p-5">
      <CardHeader
        title="Loan Product Details"
        subtitle="Tell us about your product to begin your product onboarding journey."
      />

      {loading ? (
        <div className="container py-10 mx-auto" />
      ) : (
        <Form {...form}>
          <form id="nbfc-form" className="space-y-4" onSubmit={onSubmitWrapper}>
            {/* Product Info */}
            <div className="bg-white shadow-sm rounded-lg p-5 space-y-3 space-x-4">
              <CardHeadline title="1. Product Info" />
              <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="product_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Product Name"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value.toUpperCase())}
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
                    <FormItem>
                      <FormLabel>Product Type</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the Product Type"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value.toUpperCase())}
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
                    <FormItem>
                      <FormLabel>Max Disbursement Cap</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the Max Disbursement Cap"
                          {...field}
                          inputMode="decimal"
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bank_share"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Share %</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Bank Share"
                          {...field}
                          inputMode="decimal"
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nbfc_share"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NBFC Share %</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="NBFC Share"
                          {...field}
                          inputMode="decimal"
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Interest Rate Details */}
            <div className="bg-white shadow-sm rounded-lg p-5 space-y-3 space-x-4">
              <CardHeadline title="2. Interest Rate Details" />
              <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="bank_roi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Interest %</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Bank Interest"
                          {...field}
                          inputMode="decimal"
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nbfc_roi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NBFC Interest %</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="NBFC Interest"
                          {...field}
                          inputMode="decimal"
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="blended_roi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blended Interest %</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Blended Interest"
                          {...field}
                          inputMode="decimal"
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="processing_fee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Processing Fee</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Processing Fee"
                          {...field}
                          inputMode="decimal"
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="service_fee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Fee</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Service Fee"
                          {...field}
                          inputMode="decimal"
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gst_on_service_fee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GST on Service Fee %</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="GST on Service Fee %"
                          {...field}
                          inputMode="decimal"
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Upload */}
            <div className="bg-white shadow-sm rounded-lg p-5 space-y-3 space-x-4">
              <CardHeadline title="3. Upload Required Documents" />
              <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="arrangement_doc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Arrangement Document</FormLabel>

                      <input
                        type="file"
                        accept=".jpg, .jpeg, .png, .gif, .pdf, .csv, .xls, .xlsx, .xlsm"
                        ref={(e) => {
                          fileRef.current = e;
                          field.ref(e);
                        }}
                        onChange={(e) => field.onChange(e.target.files?.[0] ?? undefined)}
                        className="hidden"
                      />

                      <div className="flex gap-2">
                        <Button type="button" variant="outline" onClick={() => {}}>
                          Sample
                        </Button>

                        <Button
                          type="button"
                          className={`rounded-sm ${field.value?.name ? "text-gray-200 bg-gray-500" : "text-white bg-blue-500 hover:bg-blue-600"}`}
                          disabled={!!field.value?.name}
                          onClick={() => fileRef.current?.click()}
                        >
                          {field.value?.name ? "Uploaded" : "Upload"}
                        </Button>
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="p-5 text-lg rounded-sm bg-blue-500 hover:bg-blue-600 text-white" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default LoanProductConfig;
