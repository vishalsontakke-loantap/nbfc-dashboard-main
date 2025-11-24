import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CardHeader from "../CardHeader";
import { lendingRateConfigTableHeaders } from "@/lib/constants";

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

  const onSubmitHandler = (data: z.infer<typeof formSchema>) => {
    console.log(`Lending Rate Config ${title} Form data submitted:`, data);
    if (onSubmit) onSubmit();
  };

  // Determine if this is the RLLR tab by checking for the Final Lending Rate row
  const isRllr = paramsArr.some((param) => param.key === "finalLendingRate");

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
                <Button type="submit" className="text-lg p-4 bg-blue-600 hover:bg-blue-700 text-white">
                  Submit
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
