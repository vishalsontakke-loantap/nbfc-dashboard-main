import React, { useEffect, useRef } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField } from "@/components/ui/form";
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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import CardHeader from "../CardHeader";
import { useNavigate, useParams } from "react-router-dom";

import { breConfigTableHeaders, DROPDOWN_VALUES } from "@/lib/constants";
import { clampPercentage, formatIndianNumber } from "@/lib/utils";
import { useUpdateBreMutation } from "@/redux/features/bre/breApi";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";


const rowSchema = z.object({
  parameter: z.string(),
  value: z.coerce.number().min(0, { message: "This field is required" }),
  weightage: z.coerce.number().min(0).max(100),
  mandatory: z.boolean(),
});

const formSchema = z.object({
  mappings: z.array(rowSchema),
});

const BRETables: React.FC<BRETablesProps> = ({
  title,
  value,
  subtitle,
  navTo,
  paramsArr,
  onSubmit, // Receive onSubmit callback
}) => {
  const headerRef = useRef<CardHeaderHandle>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [updateBre, { isLoading, isSuccess, isError }] = useUpdateBreMutation();

  // console.log("BRE TABLE VALUE", value);

  console.log("BRE TABLE PARAMS ARR", paramsArr);
  // console.log("PARAMS ARR", paramsArr);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mappings: paramsArr.map((param) => ({
        parameter: param.key,
        value: undefined,
        weightage: undefined,
        mandatory: true || false,
      })),
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "mappings",
  });

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = form.getValues();

    const payload = {
      [value]: data.mappings.map((m) => ({
        key: m.parameter,
        value: m.value,
        is_mandatory: m.mandatory,
        weightage: m.weightage,
      })),
    };

    console.log("BRE update response:", payload);

    try {
      const response = await updateBre({
        id: Number(id),
        ...payload,
      }).unwrap();
      toast.success("BRE updated successfully");
      if (onSubmit) onSubmit();
      navigate(`#${navTo}`);
    } catch (err) {
      toast.error("Failed to update BRE");
      console.log(err);
    }
  };



  // inside BRETables component
  useEffect(() => {
    form.reset({
      mappings: paramsArr.map(param => ({
        parameter: param.key,
        value: param.subtitle,
        weightage: param.weightage ?? undefined,
        mandatory: !!param.mandatory,
      }))
    });
  }, [form, paramsArr]);

  return (
    <div>
      <CardHeader
        ref={headerRef}
        title={title}
        subtitle={subtitle}
        pclassName="mt-4"
        weightage={true}
      />

      <div className="space-y-3 space-x-4 w-full mt-4 min-w-[66rem]">
        <Form {...form}>
          <form onSubmit={onSubmitHandler}>
            <div className="bg-white shadow-sm rounded-lg p-4 ">
              <Table>
                <TableHeader>
                  <TableRow className="h-12">
                    {breConfigTableHeaders.map((header) => (
                      <TableHead key={header.key}>
                        <div className="flex items-center space-x-2">
                          {header.icon && <img src={header.icon} alt="" />}
                          <span>{header.name}</span>
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((field, index) => (
                    <TableRow key={field.id} className="h-12">
                      <TableCell className="w-[30%] flex flex-col">
                        <p className="font-semibold">{paramsArr[index]?.name}</p>

                      </TableCell>
                      <TableCell className="w-[30%]">
                        <FormField
                          control={form.control}
                          name={`mappings.${index}.value`}
                          render={({ field }) => {
                            const param = paramsArr[index];

                            // 🔥 1) money
                            if (param.type === "money") {
                              return (
                                <div className="relative">
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                                    ₹
                                  </span>
                                  <Input
                                    placeholder={param.subtitle}
                                    inputMode="numeric"
                                    className="pl-7"
                                    value={field.value ? formatIndianNumber(field.value.toString()) : ""}
                                    onChange={(e) => {
                                      const raw = e.target.value.replace(/[^0-9]/g, "");
                                      field.onChange(raw);
                                    }}
                                  />
                                </div>
                              );
                            }

                            // 🔥 2) percent
                            if (param.type === "percent") {
                              return (
                                <div className="relative">
                                  <Input
                                    type="number"
                                    step="any"
                                    min={0}
                                    max={100}
                                    className="pr-7"
                                    value={field.value ?? ""}
                                    onChange={(e) => {
                                      const num = parseFloat(e.target.value);
                                      field.onChange(clampPercentage(num));
                                    }}
                                  />
                                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
                                    %
                                  </span>
                                </div>
                              );
                            }

                            // 🔥 3) dropdown (multi-select)
                            if (param.type === "dropdown") {
                              const dropdownOptions = DROPDOWN_VALUES[param.key] ?? [];

                              return (
                                <Select
                                  multiple
                                  value={field.value || []}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger className="w-full min-w-[240px]">
                                    <SelectValue placeholder="Select options" />
                                  </SelectTrigger>

                                  <SelectContent className="w-full">
                                    {dropdownOptions.map((option: string) => (
                                      <SelectItem key={option} value={option}>
                                        {option}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              );
                            }


                            // 🔥 4) text
                            if (param.type === "text") {
                              return (
                                <Input
                                  type="text"
                                  placeholder={param.subtitle}
                                  {...field}
                                />
                              );
                            }

                            // 🔥 5) default number
                            return (
                              <Input
                                type="number"
                                placeholder={param.subtitle}
                                {...field}
                              />
                            );
                          }}
                        />
                      </TableCell>
                      <TableCell className="w-[30%]">
                        <FormField
                          control={form.control}
                          name={`mappings.${index}.weightage`}
                          render={({ field }) => (
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type="number"
                                  step="any"
                                  min={0}
                                  max={100}
                                  placeholder={`${(
                                    Math.random() * 9 +
                                    1
                                  ).toFixed(1)}`}
                                  className="pr-7"
                                  value={field.value ?? ""}
                                  onChange={(e) => {
                                    const num = parseFloat(e.target.value);
                                    field.onChange(clampPercentage(num));
                                  }}
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
                                  %
                                </span>
                              </div>
                            </FormControl>
                          )}
                        />
                      </TableCell>
                      <TableCell className="flex justify-center items-center">
                        <FormField
                          control={form.control}
                          name={`mappings.${index}.mandatory`}
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
            <div className="flex justify-end mt-4 mr-2">
              <Button
                type="submit"
                className="text-lg p-4 bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default React.memo(BRETables);