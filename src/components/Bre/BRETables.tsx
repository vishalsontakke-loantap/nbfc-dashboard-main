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
import { useNavigate } from "react-router-dom";

import { breConfigTableHeaders } from "@/lib/constants";
import { clampPercentage, formatIndianNumber } from "@/lib/utils";


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
  subtitle,
  navTo,
  paramsArr,
  onSubmit, // Receive onSubmit callback
}) => {
  const headerRef = useRef<CardHeaderHandle>(null);
  const navigate = useNavigate();
  console.log("PARAMS ARR", paramsArr);
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

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = form.getValues();
    console.log("DATA", data);
    const inputWeightage = headerRef.current?.getValue() || "0";
    const weightage = clampPercentage(parseFloat(inputWeightage));

    const enteredTotal = data.mappings
      .map((m) => m.weightage || 0)
      .reduce((sum, w) => sum + w, 0);

    const roundedTotal = Math.round(enteredTotal * 10) / 10;

    // if (roundedTotal !== weightage) {
    //   toast.error(
    //     `Total weightage must be exactly ${weightage}%. Currently it's ${roundedTotal}%.`
    //   );
    //   return;
    // }

    console.log("Weightage:", weightage);
    console.log(`BRE Config ${title} Form data submitted:`, data);

    if (onSubmit) onSubmit();

    title !== "Demographic" ? navigate(`#${navTo}`) : navigate("/");
  };

  // inside BRETables component
 useEffect(() => {
  form.reset({
    mappings: paramsArr.map(param => ({
      parameter: param.key,
      value: param.subtitle ,
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
                          render={({ field }) =>
                            paramsArr[index].type === "money" ? (
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                                  ₹
                                </span>
                                <Input
                                  placeholder={paramsArr[index]?.subtitle}
                                  inputMode="numeric"
                                  className="pl-7" // make room for ₹ symbol
                                  value={
                                    field.value
                                      ? formatIndianNumber(
                                        field.value.toString()
                                      )
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
                            ) : paramsArr[index].type === "percent" ? (
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
                            ) : (
                              <Input
                                type="number"
                                placeholder={paramsArr[index].subtitle}
                                {...field}
                              />
                            )
                          }
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
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default React.memo(BRETables);