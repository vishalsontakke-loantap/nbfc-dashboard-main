import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormField,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import CardHeader from "../CardHeader";
import CardHeadline from "../CardHeadline";

import { ChevronDown } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { DisbursementFileTags, DisbursementFileInferTableHeaders } from "@/lib/constants/index"; 
import { useEffect, useState } from "react";
import { SkeletonTable } from "../ui/skeleton-table";



const allowedValues = DisbursementFileTags.map((tag) => tag.value) as [
  string,
  ...string[]
];

const rowSchema = z.object({
  platformField: z.string(),
  column: z.enum(allowedValues, { message: "Select a column" }),
  required: z.boolean(),
});

const formSchema = z.object({
  mappings: z.array(rowSchema),
});

const CollectionFileInfer = () => {

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
      mappings: [
        {
          platformField: "Customer Name",
          column: "customerName",
          required: true,
        },
        {
          platformField: "Loan Account Number",
          column: "loanId",
          required: false,
        },
        {
          platformField: "Sanctioned Amount",
          column: "sanctionedAmount",
          required: false,
        },
        {
          platformField: "Disbursed Amount",
          column: "disbursedAmount",
          required: false,
        },
        {
          platformField: "Disbursement Date",
          column: "disbursementDate",
          required: false,
        },
        {
          platformField: "Tenure (in months)",
          column: "tenure",
          required: true,
        },
        {
          platformField: "Interest Rate (%)",
          column: "interestRate",
          required: true,
        },
      ],
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "mappings",
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Disbursement File Infer Form submitted:", data);

    navigate("/nbfc/product-config");
  }

  return (
    <div className="flex flex-col space-y-4 p-3">
      <CardHeader
        title="Disbursement File Column Mapping"
        subtitle="Map your disbursement file columns to platform fields to ensure smooth processing."
      />
      {loading ? (
        <Card>
          <CardContent>
            <SkeletonTable rows={8} columns={3} />
          </CardContent>
        </Card>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="bg-white shadow-sm rounded-lg p-4 space-y-3 space-x-4">
              <div className="flex items-center justify-between -mt-3">
                <CardHeadline
                  title="Upload Disbursement File"
                  hr="no"
                  className="text-sm mt-3 ml-2"
                />

                <Button
                  type="button"
                  variant="outline"
                  className="scale-90 rounded-sm bg-white text-blue-600 border-blue-500 hover:bg-blue-50"
                >
                  Export Sample File
                  <ChevronDown />
                </Button>
              </div>

              <hr />

              <Table>
                <TableHeader>
                  <TableRow>
                    {DisbursementFileInferTableHeaders.map((tab) => (
                      <TableHead key={tab.key}>{tab.name}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell>{field.platformField}</TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`mappings.${index}.column`}
                          render={({ field }) => (
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="w-[220px]">
                                <SelectValue placeholder="Select tag" />
                              </SelectTrigger>
                              <SelectContent>
                                {DisbursementFileTags.map((tag) => (
                                  <SelectItem key={tag.value} value={tag.value}>
                                    {tag.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </TableCell>
                      <TableCell className="grid place-items-center mr-10">
                        <FormField
                          control={form.control}
                          name={`mappings.${index}.required`}
                          render={({ field }) => (
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          )}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-end mt-4 mr-7">
              <Button
                type="submit"
                className="text-lg p-5 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default CollectionFileInfer;
