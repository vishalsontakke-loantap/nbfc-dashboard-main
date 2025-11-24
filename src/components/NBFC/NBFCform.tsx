import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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

import { rbiLisenceTypes} from "@/lib/constants";
import { formatIndianNumber } from "@/lib/utils";
import ProgressBar from "../ProgressBar";

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

const formSchema = z.object({
  nbfc_name: z.string().min(4, { message: "NBFC Name is required" }),

  registration_number: z
    .string()
    .min(1, { message: "Registration Number is required" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Registration Number must be alphanumeric",
    }),

  rbi_license_type: z.enum(
    [
      "Investment and Credit Company",
      "Infrastructure Finance Company",
      "Infrastructure Debt Fund",
      "Micro Finance Institution",
      "Core Investment Company",
      "Asset Finance Company",
      "Housing Finance Company",
      "Peer to Peer Lending Platform",
      "Account Aggregator",
      "Factor",
      "Mortgage Guarantee Company",
      "Non-Operative Financial Holding Company",
    ],
    { message: "RBI License Type is required" }
  ),

  date_of_incorporation: z.coerce.date({
    required_error: "Date of Incorporation is required",
    invalid_type_error: "Invalid date format",
  }),

  business_limit: z.coerce
    .number()
    .min(2, { message: "Business Limit is required" }),

  registered_address: z.string().min(4, {
    message: "Registration Address is required",
  }),

  contact_person: z.string().min(4, {
    message: "Contact Person is required",
  }),

  contact_email: z.string().email({
    message: "Invalid email address",
  }),

  phone_number: z
    .string()
    .regex(/^\d{10}$/, { message: "Phone Number must be exactly 10 digits" }),

  website_url: z
    .string()
    .url({ message: "Invalid URL format" })
    .optional()
    .or(z.literal("")),

  rbiRegCertificate: fileSchema,
  boardRes: fileSchema,
  gstCertificate: fileSchema,
  panAndTanDocs: fileSchema,
  cancelledCheque: fileSchema,
  companyLogo: fileSchema,
});

const NBFCform = () => {
  const [loading, setLoading] = useState(true);

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
      nbfc_name: "",
      registration_number: undefined,
      rbi_license_type: "Investment and Credit Company",
      date_of_incorporation: undefined,
      business_limit: undefined,
      registered_address: "",
      contact_person: "",
      contact_email: "",
      phone_number: "",
      website_url: "",

      rbiRegCertificate: undefined,
      boardRes: undefined,
      gstCertificate: undefined,
      panAndTanDocs: undefined,
      cancelledCheque: undefined,
      companyLogo: undefined,
    },
  });
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const authToken = import.meta.env.VITE_API_AUTH_TOKEN;
  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    console.log("NBFC Form submitted with data:", data);
    axios.post(`${apiBaseUrl}/create-partner`, data,{
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
      .then((response) => {
        console.log("Data successfully saved:", response.data);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
    // Add your processing logic here (e.g., API calls to save data).
    navigate("/nbfc/product-config");
  };

  return (
    <div className="flex flex-col space-y-4 p-5">
      <CardHeader
        title="NBFC Profile Details"
        subtitle="Tell us about your NBFC to begin your onboarding journey."
      />

      {loading ? (
        <div className="container py-10 mx-auto">
          <div className="max-w-4xl mx-auto">
            <MultiSectionForm
              sections={formSkeletons}
              inputColumns={3}
              spacing="tight"
            />
          </div>
        </div>
      ) : (
        <Form {...form}>
          <form
            id="nbfc-form"
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* NBFC Establishment Details */}
            <div className="bg-white shadow-sm rounded-lg p-5 space-y-3 space-x-4">
              <CardHeadline title="1. NBFC Establishment Details" />
              <span className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 space-x-4 space-y-1">
                <FormField
                  control={form.control}
                  name="nbfc_name"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>NBFC Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter NBFC Name"
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
                  name="registration_number"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Registration Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the Registration Number"
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
                  name="rbi_license_type"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>RBI License Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        // defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select RBI License Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {rbiLisenceTypes.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                />
              </span>
            </div>

            {/* NBFC Contact Details */}
            <div className="bg-white shadow-sm rounded-lg p-5 space-y-3 space-x-4">
              <CardHeadline title="2. NBFC Contact Details" />
              <span className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 space-x-4 space-y-1">
                <FormField
                  control={form.control}
                  name="registered_address"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Registration Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Registration Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contact_person"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Contact Person</FormLabel>
                      <FormControl>
                        <Input placeholder="Contact Person" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contact_email"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <div className="relative flex">
                          <span className="inline-flex items-center px-2 rounded-l-md border border-r-0 border-input bg-gray-50 text-sm">
                            +91
                          </span>
                          <Input
                            placeholder="Phone Number"
                            className="rounded-l-none"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website_url"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Website (Optional) </FormLabel>
                      <FormControl>
                        <Input placeholder="Website" {...field} />
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
                  name="rbiRegCertificate"
                  render={({ field }) => {
                    const fileRef = useRef<HTMLInputElement | null>(null);

                    return (
                      <FormItem>
                        <FormLabel>RBI Registration Certificate</FormLabel>

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
                            className={`rounded-sm bg-blue-500 hover:bg-blue-600 ${
                              field.value?.name
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

                <FormField
                  control={form.control}
                  name="boardRes"
                  render={({ field }) => {
                    const fileRef = useRef<HTMLInputElement | null>(null);

                    return (
                      <FormItem>
                        <FormLabel>
                          Board Resolution (for partnership)
                        </FormLabel>

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
                            className={`rounded-sm bg-blue-500 hover:bg-blue-600 ${
                              field.value?.name
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

                <FormField
                  control={form.control}
                  name="gstCertificate"
                  render={({ field }) => {
                    const fileRef = useRef<HTMLInputElement | null>(null);

                    return (
                      <FormItem>
                        <FormLabel>GST Certificate</FormLabel>

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
                            className={`rounded-sm bg-blue-500 hover:bg-blue-600 ${
                              field.value?.name
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

                <FormField
                  control={form.control}
                  name="panAndTanDocs"
                  render={({ field }) => {
                    const fileRef = useRef<HTMLInputElement | null>(null);

                    return (
                      <FormItem>
                        <FormLabel>PAN & TAN Documents</FormLabel>

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
                            className={`rounded-sm bg-blue-500 hover:bg-blue-600 ${
                              field.value?.name
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

                <FormField
                  control={form.control}
                  name="cancelledCheque"
                  render={({ field }) => {
                    const fileRef = useRef<HTMLInputElement | null>(null);

                    return (
                      <FormItem>
                        <FormLabel>Cancelled Cheque</FormLabel>

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
                            className={`rounded-sm bg-blue-500 hover:bg-blue-600 ${
                              field.value?.name
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

                <FormField
                  control={form.control}
                  name="companyLogo"
                  render={({ field }) => {
                    const fileRef = useRef<HTMLInputElement | null>(null);

                    return (
                      <FormItem>
                        <FormLabel>Company Logo (for platform use)</FormLabel>

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
                          {/* Upload Button */}
                          <Button
                            type="button"
                            className={`rounded-sm bg-blue-500 hover:bg-blue-600 ${
                              field.value?.name
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
              >
                Submit
              </Button>
            </span>
          </form>
        </Form>
      )}
      <div className="p-6">
        <ProgressBar totalSteps={4} currentStep={3} stepName="NBFC Profile Details" />
      </div>
    </div>
  );
};

export default NBFCform;