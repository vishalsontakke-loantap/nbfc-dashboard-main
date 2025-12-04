import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CardHeader from "../CardHeader";
import { lendingRateConfigTableHeaders } from "@/lib/constants";
import { useGetMclrRatesQuery, useGetRllrRatesQuery, useUpdateMclrRatesMutation, useUpdateRllrRatesMutation } from "@/redux/features/lendingRate/lendingRateApi";
import { toast } from "sonner";

const rowSchema = z.object({
  parameter: z.string(),
  value: z.coerce.number().min(0, { message: "This field is required" }),
  effectiveFrom: z.string().optional(),
});

const formSchema = z.object({
  mappings: z.array(rowSchema),
});

interface LendingRateTableProps {
  title: string;
  subtitle?: string;
  paramsArr: { name: string; key: string; subtitle: string; type: string }[];
  onSubmit?: () => void;
}

const LendingRateTable: React.FC<LendingRateTableProps> = ({ title, subtitle, paramsArr, onSubmit }) => {
  // Determine if this is the RLLR tab
  const isRllr = paramsArr.some((param) => param.key === "finalLendingRate");
  
  // Fetch rates based on type
  const { data: mclrRates, isLoading: isMclrLoading } = useGetMclrRatesQuery(undefined, { skip: isRllr });
  const { data: rllrRates, isLoading: isRllrLoading } = useGetRllrRatesQuery(undefined, { skip: !isRllr });
  
  // Update mutations
  const [updateMclr, { isLoading: isUpdatingMclr }] = useUpdateMclrRatesMutation();
  const [updateRllr, { isLoading: isUpdatingRllr }] = useUpdateRllrRatesMutation();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mappings: paramsArr.map((param) => ({
        parameter: param.name,
        value: undefined,
        effectiveFrom: undefined,
      })),
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "mappings",
  });

  // Populate form with fetched data
  useEffect(() => {
    const rates = isRllr ? rllrRates : mclrRates;
    if (rates && rates.length > 0) {
      const mappings = paramsArr.map((param) => {
        const matchedRate = rates.find((rate) => rate.tenor === param.name);
        return {
          parameter: param.name,
          value: matchedRate?.value ? Number(matchedRate.value) : undefined,
          effectiveFrom: matchedRate?.effective_from ? matchedRate.effective_from.split('T')[0] : undefined,
        };
      });
      form.reset({ mappings });
    }
  }, [mclrRates, rllrRates, isRllr, paramsArr, form]);

  // Watch the first 3 values for RLLR calculation
  const watchedValues = form.watch(["mappings.0.value", "mappings.1.value", "mappings.2.value"]);

  // Auto-calculate Final Lending Rate for RLLR
  useEffect(() => {
    if (!isRllr) return;
    
    const repoRate = Number(watchedValues[0]) || 0;
    const bankSpread = Number(watchedValues[1]) || 0;
    const creditRisk = Number(watchedValues[2]) || 0;
    
    const finalRate = repoRate + bankSpread + creditRisk;
    
    // Set the final lending rate (4th row)
    form.setValue("mappings.3.value", finalRate);
  }, [watchedValues, isRllr, form]);

const onSubmitHandler = async (data: z.infer<typeof formSchema>) => {
  const formattedData = data.mappings.map((item) => ({
    tenor: item.parameter,
    value: item.value,
    effective_from: item.effectiveFrom || "",
  }));

  try {
    if (isRllr) {
      await updateRllr(formattedData).unwrap();
      toast.success("RLLR rates updated successfully");
    } else {
      await updateMclr(formattedData).unwrap();
      toast.success("MCLR rates updated successfully");
    }
    if (onSubmit) onSubmit();
  } catch (error) {
    toast.error("Failed to update rates");
  }
};

  return (
    <div>
      <CardHeader title={title} subtitle={subtitle} pclassName="mt-4" weightage={false} />
      <div className="space-y-3 space-x-4 w-full mt-4 min-w-[66rem]">
        <form onSubmit={form.handleSubmit(onSubmitHandler)}>
          <Card className="bg-white shadow-sm rounded-lg p-4">
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="h-12">
                    <TableHead className="w-[30%]">
                      <div className="flex items-center space-x-2">
                        {lendingRateConfigTableHeaders[0].icon && (
                          <img src={lendingRateConfigTableHeaders[0].icon} alt="" />
                        )}
                        <span>Tenor</span>
                      </div>
                    </TableHead>
                    <TableHead className="w-[30%]">
                      <div className="flex items-center space-x-2">
                        {lendingRateConfigTableHeaders[1].icon && (
                          <img src={lendingRateConfigTableHeaders[1].icon} alt="" />
                        )}
                        <span>Value</span>
                      </div>
                    </TableHead>
                    {/* Only show Effective From column for MCLR, or for Final Lending Rate in RLLR */}
                    {(!isRllr || (isRllr && paramsArr.some((param) => param.key === "finalLendingRate"))) && (
                      <TableHead className="w-[30%]">Effective From</TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((field, index) => (
                    <TableRow key={field.id} className="h-12">
                      <TableCell className="w-[30%] flex flex-col">
                        <p className="font-semibold">{paramsArr[index].name}</p>
                        <p className="text-xs text-gray-500">{paramsArr[index].subtitle}</p>
                      </TableCell>
                      <TableCell className="w-[30%]">
                        <Input
                          type="number"
                          placeholder={paramsArr[index].subtitle}
                          {...form.register(`mappings.${index}.value`)}
                        />
                      </TableCell>
                      {/* For MCLR, show date for all rows. For RLLR, only for Final Lending Rate row. */}
                      {(!isRllr || paramsArr[index].key === "finalLendingRate") && (
                        <TableCell className="w-[30%]">
                          <Input
                            type="date"
                            placeholder="Select Effective Date"
                            {...form.register(`mappings.${index}.effectiveFrom`)}
                          />
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-end mt-4 mr-2">
                <Button 
                  type="submit" 
                  className="text-lg p-4 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isUpdatingMclr || isUpdatingRllr || isMclrLoading || isRllrLoading}
                >
                  {(isUpdatingMclr || isUpdatingRllr) ? "Updating..." : "Submit"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default LendingRateTable;
