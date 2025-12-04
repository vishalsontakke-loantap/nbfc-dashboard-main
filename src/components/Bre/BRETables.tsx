import React, { useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField } from "@/components/ui/form";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
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

import Select from "react-select";   // ⭐️ IMPORT


// ---------------------
// ZOD SCHEMA UPDATE
// ---------------------
const rowSchema = z.object({
  parameter: z.string(),
  value: z.union([
    z.coerce.number(),
    z.array(z.string()),   // ⭐ multi-select support
  ]),
  weightage: z.coerce.number().min(0).max(100),
  mandatory: z.boolean(),
});

const formSchema = z.object({
  mappings: z.array(rowSchema),
});


const BRETables = ({
  title,
  value,
  subtitle,
  navTo,
  paramsArr,
  onSubmit,
}) => {

  const headerRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [updateBre, { isLoading }] = useUpdateBreMutation();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mappings: paramsArr.map((p) => ({
        parameter: p.key,
        value: undefined,
        weightage: undefined,
        mandatory: true
      })),
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "mappings",
  });


  // -------------------------
  //  SUBMIT HANDLER
  // -------------------------
  const onSubmitHandler = async (e) => {
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

    try {
      await updateBre({ id: Number(id), ...payload }).unwrap();
      toast.success("BRE updated successfully");
      onSubmit && onSubmit();
      navigate(`#${navTo}`);
    } catch (err) {
      toast.error("Failed to update BRE");
    }
  };


  // -------------------------
  // RESET FORM WHEN PARAMS CHANGE
  // -------------------------
  useEffect(() => {
    form.reset({
      mappings: paramsArr.map((p) => ({
        parameter: p.key,
        value: p.subtitle,
        weightage: p.weightage ?? undefined,
        mandatory: !!p.mandatory,
      })),
    });
  }, [paramsArr]);


  return (
    <div>
      <CardHeader
        ref={headerRef}
        title={title}
        subtitle={subtitle}
      />

      <div className="space-y-3 space-x-4 w-full mt-4 min-w-[66rem]">
        <Form {...form}>
          <form onSubmit={onSubmitHandler}>
            <div className="bg-white shadow-sm rounded-lg p-4">
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

                  {fields.map((field, index) => {
                    const param = paramsArr[index];

                    return (
                      <TableRow key={field.id} className="h-12">

                        {/* LABEL */}
                        <TableCell className="w-[30%]">
                          <p className="font-semibold">
                            {param?.name}
                          </p>
                        </TableCell>


                        {/* VALUE FIELD */}
                        <TableCell className="w-[30%]">

                          <FormField
                            control={form.control}
                            name={`mappings.${index}.value`}
                            render={({ field }) => {

                              // ---------------------------
                              // 🔥 MONEY
                              // ---------------------------
                              if (param.type === "money") {
                                return (
                                  <Input
                                    inputMode="numeric"
                                    value={
                                      field.value
                                        ? formatIndianNumber(field.value.toString())
                                        : ""
                                    }
                                    onChange={(e) => {
                                      const raw = e.target.value.replace(/[^0-9]/g, "");
                                      field.onChange(raw);
                                    }}
                                  />
                                );
                              }


                              // ---------------------------
                              // 🔥 PERCENT
                              // ---------------------------
                              if (param.type === "percent") {
                                return (
                                  <Input
                                    type="number"
                                    min={0}
                                    max={100}
                                    value={field.value ?? ""}
                                    onChange={(e) =>
                                      field.onChange(clampPercentage(+e.target.value))
                                    }
                                  />
                                );
                              }


                              // ---------------------------
                              // 🔥 DROPDOWN WITH REACT-SELECT
                              // ---------------------------
                              if (param.type === "dropdown") {
                                const dropdownOptions = DROPDOWN_VALUES[param.key] ?? [];
                                const options = dropdownOptions.map((o) => ({
                                  label: o,
                                  value: o,
                                }));
                                console.log("Dropdown Options:",param );
                                return (
                                  <Controller
                                    control={form.control}
                                    
                                    name={`mappings.${index}.value`}
                                    render={({ field }) => (
                                      <Select
                                        isMulti={param.isMulti == "true"}   // ⭐ multi-select support
                                        options={options}
                                        className="min-w-[240px]"
                                        value={options.filter((o) =>
                                          (field.value ?? []).includes(o.value)
                                        )}
                                        onChange={(selected) => {
                                          // if(param.isMulti == "true"){}
                                          field.onChange(
                                            selected.map((s) => s.value)
                                          );
                                        }}
                                      />
                                    )}
                                  />
                                );
                              }


                              // ---------------------------
                              // 🔥 TEXT
                              // ---------------------------
                              if (param.type === "text") {
                                return (
                                  <Input type="text" {...field} />
                                );
                              }
                              return (
                                <Input
                                  type="number"
                                  {...field}
                                />
                              );
                            }}
                          />

                        </TableCell>


                        {/* WEIGHTAGE */}
                        <TableCell className="w-[30%]">
                          <FormField
                            control={form.control}
                            name={`mappings.${index}.weightage`}
                            render={({ field }) => (
                              <FormControl>
                                <Input
                                  type="number"
                                  min={0}
                                  max={100}
                                  value={field.value ?? ""}
                                  onChange={(e) =>
                                    field.onChange(clampPercentage(+e.target.value))
                                  }
                                />
                              </FormControl>
                            )}
                          />
                        </TableCell>


                        {/* MANDATORY SWITCH */}
                        <TableCell>
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
                    );
                  })}

                </TableBody>

              </Table>
            </div>


            {/* SUBMIT BUTTON */}
            <div className="flex justify-end mt-4 mr-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="text-lg p-4 bg-blue-600 hover:bg-blue-700 text-white"
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
