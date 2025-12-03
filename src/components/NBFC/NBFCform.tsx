import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

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
import { formSkeletons, rbiLisenceTypes } from "@/lib/constants";
import CardHeader from "../CardHeader";
import CardHeadline from "../CardHeadline";
import { formatIndianNumber } from "@/lib/utils";
import { fileToBase64 } from "@/lib/Base64Convert";
import { useCreateNbfcMutation, useGetNbfcDetailsQuery, useUpdateNbfcMutation } from "@/redux/features/nbfc/nbfcApi";

const fileSchema = z
  .instanceof(File, { message: "File is required" })
  .refine((file) => file.size <= 5 * 1024 * 1024, { message: "Max file size is 5MB" })
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
    { message: "Only allowed file types: jpg, png, gif, pdf, csv, xls, xlsx, xlsm" }
  )
  .optional();

const formSchema = z.object({
  nbfc_name: z.string(),
  registration_number: z.string(),
  rbi_license_type: z.string(),
  date_of_incorporation: z.coerce.date().nullable(),
  business_limit: z.coerce.number().min(10000000),
  registered_address: z.string().min(4),
  contact_person: z.string().min(4),
  contact_email: z.string().email(),
  phone_number: z.string().regex(/^\d{10}$/),
  website_url: z.string().url().optional().or(z.literal("")).optional(),
  rbiRegCertificate: fileSchema,
  boardRes: fileSchema,
  gstCertificate: fileSchema,
  panAndTanDocs: fileSchema,
  cancelledCheque: fileSchema,
  companyLogo: fileSchema,
});

type FormType = z.infer<typeof formSchema>;

const NBFCform: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  // RTK Query hooks
  const [createNbfc] = useCreateNbfcMutation();
  const [updateNbfc] = useUpdateNbfcMutation();
  const { data: nbfcDetails, isLoading: isFetchingDetails } = useGetNbfcDetailsQuery(id ?? "", { skip: !id });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nbfc_name: "",
      registration_number: "",
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

  // When editing (id present) — populate form with fetched values
  useEffect(() => {
    if (!id) return;
    if (nbfcDetails?.data) {
      const d = nbfcDetails.data;
      form.reset({
        nbfc_name: d.nbfc_name ?? d.name ?? "",
        registration_number: d.registration_number ?? "",
        rbi_license_type: d.rbi_license_type ?? "Investment and Credit Company",
        date_of_incorporation: d.date_of_incorporation ? new Date(d.date_of_incorporation) : undefined,
        business_limit: d.business_limit ?? d.business ?? undefined,
        registered_address: d.registered_address ?? "",
        contact_person: d.contact_person ?? "",
        contact_email: d.contact_email ?? "",
        phone_number: d.phone_number ?? "",
        website_url: d.website_url ?? "",
        // For files: we don't set File objects — we keep them undefined and render existing filenames in UI if needed
        rbiRegCertificate: undefined,
        boardRes: undefined,
        gstCertificate: undefined,
        panAndTanDocs: undefined,
        cancelledCheque: undefined,
        companyLogo: undefined,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nbfcDetails, id]);

  const toMySqlDate = (date: Date | null | undefined) => {
    if (!date) return null;
    return new Date(date).toISOString().split("T")[0];
  };

  // helper to base64 only when user provided a new file
  const maybeConvertFile = async (file?: File | null) => {
    if (!file) return null;
    return await fileToBase64(file);
  };

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    setIsSubmitting(true);
    setLoading(true);

    try {
      // Only convert files that user actually uploaded (if undefined => do not send, backend should preserve old)
      const rbiRegCertificate = data.rbiRegCertificate ? await maybeConvertFile(data.rbiRegCertificate) : null;
      const boardRes = data.boardRes ? await maybeConvertFile(data.boardRes) : null;
      const gstCertificate = data.gstCertificate ? await maybeConvertFile(data.gstCertificate) : null;
      const panAndTanDocs = data.panAndTanDocs ? await maybeConvertFile(data.panAndTanDocs) : null;
      const cancelledCheque = data.cancelledCheque ? await maybeConvertFile(data.cancelledCheque) : null;
      const companyLogo = data.companyLogo ? await maybeConvertFile(data.companyLogo) : null;

      const payload = {
        nbfc_name: data.nbfc_name,
        registration_number: String(data.registration_number ?? ""),
        rbi_license_type: data.rbi_license_type,
        date_of_incorporation: toMySqlDate(data.date_of_incorporation as any),
        business_limit: Number(data.business_limit ?? 0),
        registered_address: data.registered_address,
        contact_person: data.contact_person,
        contact_email: data.contact_email,
        phone_number: data.phone_number,
        website_url: data.website_url || null,
        documents: {
          rbi_registration_certificate: rbiRegCertificate !== null ? rbiRegCertificate : undefined,
          board_resolutions: boardRes !== null ? boardRes : undefined,
          gst_certificate: gstCertificate !== null ? gstCertificate : undefined,
          pan_tan: panAndTanDocs !== null ? panAndTanDocs : undefined,
          cancelled_cheque: cancelledCheque !== null ? cancelledCheque : undefined,
          logo: companyLogo !== null ? companyLogo : undefined,
        }
        // Files: only include if non-null; for update, backend should ignore nulls or treat them as "no change"

      };

      if (id) {
        // update flow
        await updateNbfc({ id, payload }).unwrap();
        toast.success("NBFC updated successfully");
        navigate(`/nbfc/details/${id}`);
      } else {
        // create flow
        await createNbfc(payload).unwrap();
        toast.success("NBFC created successfully");
        navigate("/nbfc-list");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to save NBFC");
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4 p-5">
      <CardHeader
        title={id ? "Edit NBFC Profile" : "NBFC Profile Details"}
        subtitle="Tell us about your NBFC to begin your onboarding journey."
      />

      {loading || (id && isFetchingDetails) ? (
        <div className="flex flex-col space-y-4 p-5">
          <div className="mx-auto">
            <MultiSectionForm sections={formSkeletons} inputColumns={3} spacing="tight" />
          </div>
        </div>
      ) : (
        <Form {...form}>
          <form id="nbfc-form" className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            {/* NBFC Establishment Details */}
            <div className="bg-white shadow-sm rounded-lg p-5 space-y-3 space-x-4">
              <CardHeadline title="1. NBFC Establishment Details" />
              <span className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 space-x-4 space-y-1">
                {/* NBFC Name */}
                <FormField control={form.control} name="nbfc_name" render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>NBFC Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter NBFC Name" {...field} onChange={(e) => field.onChange(e.target.value.toUpperCase())} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Registration Number */}
                <FormField control={form.control} name="registration_number" render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Registration Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the Registration Number" {...field} onChange={(e) => field.onChange(e.target.value.toUpperCase())} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* RBI License Type */}
                <FormField control={form.control} name="rbi_license_type" render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>RBI License Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select RBI License Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {rbiLisenceTypes.map((item) => (
                          <SelectItem key={item.value} value={item.value}>{item.type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Date of incorporation */}
                <FormField control={form.control} name="date_of_incorporation" render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Date of Incorporation</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="date"
                          max={new Date().toISOString().split("T")[0]}
                          value={field.value instanceof Date ? field.value.toISOString().split("T")[0] : ""}
                          onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                          onFocus={(e) => e.currentTarget.showPicker?.()}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Business limit */}
                <FormField control={form.control} name="business_limit" render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Business Limit</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₹</span>
                        <Input placeholder="Business Limit" inputMode="numeric" className="pl-7" value={field.value ? formatIndianNumber(String(field.value)) : ""} onChange={(e) => field.onChange(e.target.value.replace(/[^0-9]/g, ""))} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </span>
            </div>

            {/* NBFC Contact Details */}
            <div className="bg-white shadow-sm rounded-lg p-5 space-y-3 space-x-4">
              <CardHeadline title="2. NBFC Contact Details" />
              <span className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 space-x-4 space-y-1">
                <FormField control={form.control} name="registered_address" render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Registration Address</FormLabel>
                    <FormControl><Input placeholder="Registration Address" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="contact_person" render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Contact Person</FormLabel>
                    <FormControl><Input placeholder="Contact Person" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="contact_email" render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input placeholder="Email" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="phone_number" render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <div className="relative flex">
                        <span className="inline-flex items-center px-2 rounded-l-md border border-r-0 border-input bg-gray-50 text-sm">+91</span>
                        <Input placeholder="Phone Number" className="rounded-l-none" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="website_url" render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Website (Optional)</FormLabel>
                    <FormControl><Input placeholder="Website" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </span>
            </div>

            {/* Documents */}
            <div className="bg-white shadow-sm rounded-lg p-5 space-y-3 space-x-4">
              <CardHeadline title="3. Upload Required Documents" />
              <span className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 space-x-4 space-y-1">
                <FormField control={form.control} name="rbiRegCertificate" render={({ field }) => {
                  const fileRef = useRef<HTMLInputElement | null>(null);
                  return (
                    <FormItem>
                      <FormLabel>RBI Registration Certificate</FormLabel>
                      <input type="file" accept=".jpg,.jpeg,.png,.gif,.pdf,.csv,.xls,.xlsx,.xlsm" ref={(e) => { fileRef.current = e; field.ref(e); }} onChange={(e) => field.onChange(e.target.files?.[0])} className="hidden" />
                      <div className="flex gap-2">
                        <Button type="button" variant="outline" className="rounded-sm">Sample</Button>
                        <Button type="button" onClick={() => fileRef.current?.click()} className={`rounded-sm ${field.value?.name ? "bg-gray-500 text-gray-200" : "bg-blue-500 text-white"}`}>
                          {field.value?.name ? "Uploaded" : (nbfcDetails?.data?.rbi_registration_certificate ? "Replace" : "Upload")}
                        </Button>
                        {/* show existing filename if present */}
                        {nbfcDetails?.data?.rbi_registration_certificate && !field.value && (
                          <div className="text-xs text-gray-600 self-center">Current: {nbfcDetails.data.rbi_registration_certificate_filename ?? "Existing file"}</div>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  );
                }} />


                {/* Board Resolution */}
                <FormField
                  control={form.control}
                  name="boardRes"
                  render={({ field }) => {
                    const fileRef = useRef<HTMLInputElement | null>(null);
                    return (
                      <FormItem>
                        <FormLabel>Board Resolution (for partnership)</FormLabel>

                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.gif,.pdf,.csv,.xls,.xlsx,.xlsm"
                          ref={(e) => {
                            fileRef.current = e;
                            field.ref(e);
                          }}
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                          className="hidden"
                        />

                        <div className="flex gap-2 items-center">
                          <Button type="button" variant="outline" className="rounded-sm">Sample</Button>

                          <Button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            className={`rounded-sm ${field.value?.name ? "bg-gray-500 text-gray-200" : "bg-blue-500 text-white"}`}
                          >
                            {field.value?.name ? "Uploaded" : (nbfcDetails?.data?.board_resolutions ? "Replace" : "Upload")}
                          </Button>

                          {nbfcDetails?.data?.board_resolutions && !field.value && (
                            <div className="text-xs text-gray-600 self-center">
                              Current: {nbfcDetails.data.board_resolutions_filename ?? "Existing file"}
                            </div>
                          )}
                        </div>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                {/* GST Certificate */}
                <FormField
                  control={form.control}
                  name="gstCertificate"
                  render={({ field }) => {
                    const fileRef = useRef<HTMLInputElement | null>(null);
                    return (
                      <FormItem>
                        <FormLabel>GST Certificate</FormLabel>

                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.gif,.pdf,.csv,.xls,.xlsx,.xlsm"
                          ref={(e) => {
                            fileRef.current = e;
                            field.ref(e);
                          }}
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                          className="hidden"
                        />

                        <div className="flex gap-2 items-center">
                          <Button type="button" variant="outline" className="rounded-sm">Sample</Button>

                          <Button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            className={`rounded-sm ${field.value?.name ? "bg-gray-500 text-gray-200" : "bg-blue-500 text-white"}`}
                          >
                            {field.value?.name ? "Uploaded" : (nbfcDetails?.data?.gst_certificate ? "Replace" : "Upload")}
                          </Button>

                          {nbfcDetails?.data?.gst_certificate && !field.value && (
                            <div className="text-xs text-gray-600 self-center">
                              Current: {nbfcDetails.data.gst_certificate_filename ?? "Existing file"}
                            </div>
                          )}
                        </div>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                {/* PAN & TAN Documents */}
                <FormField
                  control={form.control}
                  name="panAndTanDocs"
                  render={({ field }) => {
                    const fileRef = useRef<HTMLInputElement | null>(null);
                    return (
                      <FormItem>
                        <FormLabel>PAN & TAN Documents</FormLabel>

                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.gif,.pdf,.csv,.xls,.xlsx,.xlsm"
                          ref={(e) => {
                            fileRef.current = e;
                            field.ref(e);
                          }}
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                          className="hidden"
                        />

                        <div className="flex gap-2 items-center">
                          <Button type="button" variant="outline" className="rounded-sm">Sample</Button>

                          <Button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            className={`rounded-sm ${field.value?.name ? "bg-gray-500 text-gray-200" : "bg-blue-500 text-white"}`}
                          >
                            {field.value?.name ? "Uploaded" : (nbfcDetails?.data?.pan_tan ? "Replace" : "Upload")}
                          </Button>

                          {nbfcDetails?.data?.pan_tan && !field.value && (
                            <div className="text-xs text-gray-600 self-center">
                              Current: {nbfcDetails.data.pan_tan_filename ?? "Existing file"}
                            </div>
                          )}
                        </div>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                {/* Cancelled Cheque */}
                <FormField
                  control={form.control}
                  name="cancelledCheque"
                  render={({ field }) => {
                    const fileRef = useRef<HTMLInputElement | null>(null);
                    return (
                      <FormItem>
                        <FormLabel>Cancelled Cheque</FormLabel>

                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.gif,.pdf,.csv,.xls,.xlsx,.xlsm"
                          ref={(e) => {
                            fileRef.current = e;
                            field.ref(e);
                          }}
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                          className="hidden"
                        />

                        <div className="flex gap-2 items-center">
                          <Button type="button" variant="outline" className="rounded-sm">Sample</Button>

                          <Button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            className={`rounded-sm ${field.value?.name ? "bg-gray-500 text-gray-200" : "bg-blue-500 text-white"}`}
                          >
                            {field.value?.name ? "Uploaded" : (nbfcDetails?.data?.cancelled_cheque ? "Replace" : "Upload")}
                          </Button>

                          {nbfcDetails?.data?.cancelled_cheque && !field.value && (
                            <div className="text-xs text-gray-600 self-center">
                              Current: {nbfcDetails.data.cancelled_cheque_filename ?? "Existing file"}
                            </div>
                          )}
                        </div>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                {/* Company Logo */}
                <FormField
                  control={form.control}
                  name="companyLogo"
                  render={({ field }) => {
                    const fileRef = useRef<HTMLInputElement | null>(null);
                    return (
                      <FormItem>
                        <FormLabel>Company Logo (for platform use)</FormLabel>

                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.gif,.pdf,.csv,.xls,.xlsx,.xlsm"
                          ref={(e) => {
                            fileRef.current = e;
                            field.ref(e);
                          }}
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                          className="hidden"
                        />

                        <div className="flex gap-2 items-center">
                          <Button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            className={`rounded-sm ${field.value?.name ? "bg-gray-500 text-gray-200" : "bg-blue-500 text-white"}`}
                          >
                            {field.value?.name ? "Uploaded" : (nbfcDetails?.data?.logo ? "Replace" : "Upload")}
                          </Button>

                          {nbfcDetails?.data?.logo && !field.value && (
                            <div className="text-xs text-gray-600 self-center">
                              Current: {nbfcDetails.data.logo_filename ?? "Existing file"}
                            </div>
                          )}
                        </div>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />


              </span>
            </div>

            <span className="flex justify-end">
              <Button className="p-5 text-lg rounded-sm bg-blue-500 hover:bg-blue-600 text-white flex" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : id ? "Update" : "Submit"}
              </Button>
            </span>
          </form>
        </Form>
      )}
    </div>
  );
};

export default NBFCform;
