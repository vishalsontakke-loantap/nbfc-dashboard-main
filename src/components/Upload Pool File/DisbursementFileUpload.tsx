import { useRef } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useNavigate } from "react-router-dom";

import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import CardHeader from "../CardHeader";
import CardHeadline from "../CardHeadline";
import { assetPath } from "@/lib/utils";

import { ChevronDown } from "lucide-react";

const formSchema = z.object({
  file: z
    .instanceof(File, { message: "File is required" })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Max file size is 5MB",
    })
    .refine(
      (file) => {
        const allowedTypes = [
          // "image/jpeg", // jpg, jpeg
          // "image/png", // png
          // "image/gif", // gif
          // "application/pdf", // pdf
          "text/csv", // csv
          "application/vnd.ms-excel", // xls
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // xlsx
          "application/vnd.ms-excel.sheet.macroenabled.12", // xlsm
        ];
        return allowedTypes.includes(file.type);
      },
      {
        message:
          "Only the following file types are accepted: csv, xls, xlsx, xlsm",
      }
    )
    .optional(),
});

const DisbursementFileUpload = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    console.log("Disbursement File submitted with data:", data);
    navigate("/upload-pool-file/file-rundown");
  };

  return (
    <div className="flex flex-col space-y-4 p-3">
      <CardHeader
        title="Disbursement File Upload"
        subtitle="Upload your disbursement files here."
      />

      <Form {...form}>
        <form
          id="nbfc-form"
          className="space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="bg-white shadow-sm rounded-lg p-4 space-y-3 space-x-4">
            <div className="flex items-center justify-between">
              <CardHeadline title="Upload Disbursement File" hr="no" />

              <Button
                type="button"
                variant="outline"
                className="rounded-sm bg-white text-blue-600 border-blue-500 hover:bg-blue-50"
              >
                Export Sample File
                <ChevronDown />
              </Button>
            </div>

            <hr />

            {/* Wrap all form components within the Form provider */}
            <span className="flex flex-col items-center justify-center p-10">
              <img
                src={assetPath("/images/icons/file_open.svg")}
                alt="Upload Disbursement File"
                className="w-14"
              />

              <h3 className="font-semibold text-muted-foreground">
                Key Platform Fields & Expected Mapping Columns
              </h3>

              <p className="text-xs text-muted-foreground text-center mt-2 mb-4 max-w-[85dvh]">
                Download the sample format, upload your disbursement file, and
                map your columns to our required fields.
              </p>

              <FormField
                control={form.control}
                name="file"
                render={({ field }) => {
                  const fileRef = useRef<HTMLInputElement | null>(null);

                  return (
                    <FormItem>
                      {/* Hidden File Input */}
                      <input
                        type="file"
                        accept=".csv, .xls, .xlsx, .xlsm"
                        ref={(e) => {
                          fileRef.current = e;
                          field.ref(e);
                        }}
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                        className="hidden"
                      />

                      {/* Buttons Row */}
                      <div className="flex gap-2">
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

              <div className="flex justify-center items-center space-x-2 mt-4">
                <img
                  src={assetPath("/images/icons/learn_more.svg")}
                  alt="learn more"
                  id="learn_more"
                />
                <Label
                  htmlFor="learn_more"
                  className="text-sm text-muted-foreground"
                >
                  Learn more about this platform
                </Label>
              </div>
            </span>
          </div>
          <span className="flex justify-end items-center space-x-2 mr-8">
            <Button
              className="text-lg p-5 rounded-sm bg-blue-500 hover:bg-blue-600 text-white"
              type="submit"
            >
              Next
            </Button>
          </span>
        </form>
      </Form>
    </div>
  );
};

export default DisbursementFileUpload;
