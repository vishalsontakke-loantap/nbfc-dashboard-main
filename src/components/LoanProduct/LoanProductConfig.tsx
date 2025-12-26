import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CardHeader from "../CardHeader";
import CardHeadline from "../CardHeadline";
import MultiSectionForm from "@/components/ui/MultiSectionForm";
import { fileToBase64 } from "@/lib/Base64Convert";
import {
  useCreateProductMutation,
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "@/redux/features/products/productApi";
import { formSkeletons } from "@/lib/constants";

const twoDecimalRegex = /^\d+(\.\d{1,2})?$/;

const fileSchema = z
  .instanceof(File)
  .refine((f) => f.size <= 5 * 1024 * 1024, { message: "Max file size is 5MB" })
  .refine(
    (f) =>
      [
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf",
        "text/csv",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel.sheet.macroenabled.12",
      ].includes(f.type),
    { message: "Only allowed: jpg, png, gif, pdf, csv, xls, xlsx, xlsm" }
  )
  .optional();

const formSchema = z
  .object({
    product_name: z.string().min(4, { message: "Product name is required" }),
    product_type: z.string().min(1, { message: "Product type is required" }),
    max_disbursement_cap: z.union([z.string(), z.number()]).optional(),
    processing_fee: z.union([z.string(), z.number()]).optional(),
    service_fee: z.union([z.string(), z.number()]).optional(),
    gst_on_service_fee: z.union([z.string(), z.number()]).optional(),

    nbfc_share: z
      .union([z.string(), z.number()])
      .refine((v) => twoDecimalRegex.test(String(v)), { message: "NBFC share must be valid (max 2 decimals)" })
      .transform((v) => Number(v)),

    interest_type: z.string().min(1, { message: "Interest type is required" }),

    bank_share: z
      .union([z.string(), z.number()])
      .refine((v) => twoDecimalRegex.test(String(v)), { message: "Bank share must be valid (max 2 decimals)" })
      .transform((v) => Number(v)),

    nbfc_interest: z
      .union([z.string(), z.number()])
      .refine((v) => twoDecimalRegex.test(String(v)), { message: "NBFC ROI must be valid (max 2 decimals)" })
      .transform((v) => Number(v)),

    nbfc_spread: z
      .union([z.string(), z.number()])
      .refine((v) => twoDecimalRegex.test(String(v)), { message: "NBFC Spread must be valid (max 2 decimals)" })
      .transform((v) => Number(v)),

    bank_interest: z
      .union([z.string(), z.number()])
      .refine((v) => twoDecimalRegex.test(String(v)), { message: "Bank ROI must be valid (max 2 decimals)" })
      .transform((v) => Number(v)),

    bank_spread: z
      .union([z.string(), z.number()])
      .refine((v) => twoDecimalRegex.test(String(v)), { message: "Bank Spread must be valid (max 2 decimals)" })
      .transform((v) => Number(v)),

    blended_interest: z
      .union([z.string(), z.number()])
      .refine((v) => twoDecimalRegex.test(String(v)), { message: "Blended ROI must be valid (max 2 decimals)" })
      .transform((v) => Number(v)),

    colending_arrangement_doc: fileSchema,
  })
  .refine((data) => Number(data.nbfc_share) + Number(data.bank_share) === 100, {
    message: "NBFC share + Bank share must equal 100",
    path: ["nbfc_share"],
  });

type FormType = z.infer<typeof formSchema>;

const LoanProductConfig: React.FC = () => {
  // route params: id => nbfc id, optional productId => product id (edit)
  const { id: nbfcId, productId } = useParams<{ id?: string; productId?: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const { data: productDetails, isLoading: isFetchingDetails } = useGetProductDetailsQuery(productId ?? "", {
    skip: !productId,
  });

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 150);
    return () => clearTimeout(t);
  }, []);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_name: "",
      product_type: "",
      max_disbursement_cap: undefined,
      processing_fee: undefined,
      service_fee: undefined,
      gst_on_service_fee: undefined,
      nbfc_share: undefined,
      interest_type: "",
      bank_share: undefined,
      nbfc_interest: undefined,
      nbfc_spread: undefined,
      bank_interest: undefined,
      bank_spread: undefined,
      blended_interest: undefined,
      colending_arrangement_doc: undefined,
    },
  });

  // populate when editing
  useEffect(() => {
    if (!productId) return;
    if (productDetails?.data) {
      const d = productDetails.data;
      form.reset({
        product_name: d.product_name ?? "",
        product_type: d.product_type ?? "",
        max_disbursement_cap: d.max_disbursement_cap ?? undefined,
        processing_fee: d.processing_fee ?? undefined,
        service_fee: d.service_fee ?? undefined,
        gst_on_service_fee: d.gst_on_service ?? undefined,
        nbfc_share: d.nbfc_share ?? undefined,
        interest_type: d.interest_type ?? "",
        bank_share: d.bank_share ?? undefined,
        nbfc_interest: d.nbfc_interest ?? undefined,
        nbfc_spread: d.nbfc_spread ?? undefined,
        bank_interest: d.bank_interest ?? undefined,
        bank_spread: d.bank_spread ?? undefined,
        blended_interest: d.blended_interest ?? undefined,
        colending_arrangement_doc: undefined,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productDetails, productId]);

  // Auto-calculate blended_interest
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'nbfc_share' || name === 'nbfc_interest' || name === 'nbfc_spread' || name === 'bank_share' || name === 'bank_interest' || name === 'bank_spread') {
        const nbfcShare = Number(value.nbfc_share) || 0;
        const nbfcRoi = Number(value.nbfc_interest) || 0;
        const nbfcSpread = Number(value.nbfc_spread) || 0;
        const bankShare = Number(value.bank_share) || 0;
        const bankRoi = Number(value.bank_interest) || 0;
        const bankSpread = Number(value.bank_spread) || 0;
        
        const blendedRoi = (nbfcShare * (nbfcRoi + nbfcSpread) + bankShare * (bankRoi + bankSpread)) / 100;
        form.setValue('blended_interest', blendedRoi, { shouldValidate: false });
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const maybeConvertFile = async (file?: File | null) => {
    if (!file) return null;
    return await fileToBase64(file);
  };

  const toNumberOrNull = (v: any) => {
    if (v === undefined || v === null || v === "") return null;
    const n = Number(v);
    return Number.isNaN(n) ? null : n;
  };

  const onSubmit = async (data:any) => {
    setIsSubmitting(true);
    setLoading(true);

    try {
      const arrangementDocBase64 = data.colending_arrangement_doc ? await maybeConvertFile(data.colending_arrangement_doc) : null;

      const payload: any = {
        product_name: data.product_name,
        product_type: data.product_type,
        loan_category: "Secured",
        max_disbursement_cap: data.max_disbursement_cap ?? null,
        processing_fee: data.processing_fee ?? null,
        service_fee: data.service_fee ?? null,
        gst_on_service: data.gst_on_service_fee ?? null,
        repayment_type: "EMI",
        emi_frequency: "Monthly",
        moratorium_period: 1,
        nbfc_share: Number(data.nbfc_share),
        interest_type: data.interest_type,
        bank_share: Number(data.bank_share),
        collateral_type_required: "Gold",
        collateral_verification: "Pre",
        nbfc_interest: toNumberOrNull(data.nbfc_interest),
        nbfc_spread: toNumberOrNull(data.nbfc_spread),
        bank_interest: toNumberOrNull(data.bank_interest),
        bank_spread: toNumberOrNull(data.bank_spread),
        blended_interest: toNumberOrNull(data.blended_interest),
      };

      console.log("Payload:", payload);
      // return;

      if (arrangementDocBase64 !== null) {
        payload.documents = { arrangement_doc: arrangementDocBase64 };
      }

      if (productId) {
        // update product
        await updateProduct({ id: productId, updates: payload }).unwrap();
        toast.success("Product updated successfully");
        navigate(`/nbfc/${nbfcId}/product/${productId}`); // or your product details route
      } else {
        // create product for nbfc
        if (!nbfcId) {
          toast.error("Missing NBFC id for product creation");
          return;
        }
        payload.partner_id = nbfcId;
        await createProduct(payload).unwrap();
        toast.success("Loan Product created successfully!");
        navigate(`/nbfc/details/${nbfcId}`);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to save product");
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  // File Field Renderer (uses form.setValue/watch)
  const FileField = ({ name, label, existingServerKey }: { name: keyof FormType; label: string; existingServerKey?: string }) => {
    const fileRef = useRef<HTMLInputElement | null>(null);
    const currentValue = form.watch(name as any) as File | undefined;
    const existingFile = productDetails?.data?.[existingServerKey ?? "arrangement_doc"];

    return (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.gif,.pdf,.csv,.xls,.xlsx,.xlsm"
          ref={(e) => (fileRef.current = e)}
          onChange={(e) => form.setValue(name as any, e.target.files?.[0] as any, { shouldValidate: true })}
          className="hidden"
        />
        <div className="flex gap-2 items-center">
          <Button type="button" onClick={() => fileRef.current?.click()} className={`rounded-sm ${currentValue ? "bg-gray-500 text-gray-200" : "bg-blue-500 text-white"}`}>
            {currentValue ? "Uploaded" : existingFile ? "Replace" : "Upload"}
          </Button>

          {existingFile && !currentValue && (
            <div className="text-xs text-gray-600">Current: {productDetails?.data?.[existingServerKey + "_filename"] ?? "Existing file"}</div>
          )}
          {currentValue && <div className="text-xs text-gray-700">{(currentValue as File).name}</div>}
        </div>
        <FormMessage />
      </FormItem>
    );
  };

  return (
    <div className="flex flex-col space-y-4 p-3">
      <CardHeader
        title={productId ? "Edit Loan Product" : "Loan Product Details"}
        subtitle={productId ? "Edit existing product" : `Create product for NBFC ${nbfcId ?? ""}`}
      />

      {loading || (productId && isFetchingDetails) ? (
         <div className="flex flex-col space-y-4 p-3">
          <div className="mx-auto">
            <MultiSectionForm sections={formSkeletons} inputColumns={3} spacing="tight" />
          </div>
        </div>
      ) : (
        <Form {...form}>
          <form id="loan-product-form" className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Product Info */}
            <div className="bg-white shadow-sm rounded-lg p-5 space-y-3">
              <CardHeadline title="1. Product Info" />
              <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Controller
                  control={form.control}
                  name="product_name"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter Product Name" onChange={(e) => field.onChange(e.target.value.toUpperCase())} />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <Controller
                  control={form.control}
                  name="product_type"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Product Type</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Product Type" />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <Controller
                  control={form.control}
                  name="max_disbursement_cap"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Max Disbursement Cap</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="Max Disbursement Cap" />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <Controller
                  control={form.control}
                  name="bank_share"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Bank Share %</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="Bank Share" />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <Controller
                  control={form.control}
                  name="nbfc_share"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>NBFC Share %</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="NBFC Share" />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <Controller
                  control={form.control}
                  name="interest_type"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Interest Type</FormLabel>
                      <Select 
                        key={`interest-type-${productId || 'new'}-${field.value}`}
                        onValueChange={field.onChange} 
                        value={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Interest Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="fixed">Fixed</SelectItem>
                          <SelectItem value="floating">Floating</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Interest & Fees */}
            <div className="bg-white shadow-sm rounded-lg p-5 space-y-3">
              <CardHeadline title="2. Interest & Fees" />
              <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Controller
                  control={form.control}
                  name="bank_interest"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Bank Interest %</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="Bank Interest" />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <Controller
                  control={form.control}
                  name="nbfc_interest"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>NBFC Interest %</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="NBFC Interest" />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <Controller
                  control={form.control}
                  name="nbfc_spread"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>NBFC Spread %</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="NBFC Spread" />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <Controller
                  control={form.control}
                  name="bank_spread"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Bank Spread %</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="Bank Spread" />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <Controller
                  control={form.control}
                  name="blended_interest"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Blended Interest % (Auto-calculated)</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="number" 
                          placeholder="Auto-calculated" 
                          readOnly 
                          disabled
                          className="bg-gray-100 cursor-not-allowed"
                        />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <Controller
                  control={form.control}
                  name="processing_fee"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Processing Fee</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="Processing Fee" />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <Controller
                  control={form.control}
                  name="service_fee"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Service Fee</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="Service Fee" />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <Controller
                  control={form.control}
                  name="gst_on_service_fee"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>GST on Service Fee %</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="GST on Service Fee %" />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white shadow-sm rounded-lg p-5 space-y-3">
              <CardHeadline title="3. Documents" />
              <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Document upload */}
                <FileField name="colending_arrangement_doc" label="Arrangement Document" existingServerKey="arrangement_doc" />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting} className="p-5 text-lg bg-blue-500 hover:bg-blue-600 text-white">
                {isSubmitting ? "Submitting..." : productId ? "Update Product" : "Create Product"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default LoanProductConfig;
