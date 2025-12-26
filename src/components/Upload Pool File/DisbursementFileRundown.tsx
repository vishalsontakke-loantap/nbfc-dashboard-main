import DateDisplay from "../DateDisplay";
import { Badge } from "@/components/ui/badge";
import ButtonRound from "@/components/ButtonRound";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { SkeletonTable } from "../ui/skeleton-table";
import { Button } from "../ui/button";
import {DataTable} from "@/components/ui/data-table";
import { PoolBuyoutConfirmation } from "./PoolBuyoutConfirmation";
import { getFormattedDateTime, assetPath } from "@/lib/utils";

const DisbursementFileRundown = () => {
    const [loading, setLoading] = useState(true);
    const [progress1, setProgress1] = useState(0);
    const [progress2, setProgress2] = useState(0);
    const [progress3, setProgress3] = useState(0);
    const targetValue = 100; // set this to your desired value

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 5750);

      return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
      let isMounted = true;

      const runProgress = async ({ setProgress }: RunProgressParams): Promise<void> => {
        let current = 0;
        while (isMounted && current <= targetValue) {
          setProgress(current);
          await new Promise((resolve) => setTimeout(resolve, 50));
          current += 1;
        }
      };

      const startProgressSequence = async () => {
        await runProgress({ setProgress: setProgress1 });
        await runProgress({ setProgress: setProgress2 });
        await runProgress({ setProgress: setProgress3 });
      };

      startProgressSequence();

      return () => {
        isMounted = false;
      };
    }, [targetValue]);


    
  return (
    <div className="flex flex-col space-y-4 p-3">
      <div className="flex flex-col bg-white shadow-sm rounded-lg p-5 space-y-3 space-x-4">
        <div className="flex items-center justify-between">
          {/** DISBURSEMENT FILE NAME */}
          <span className="flex space-x-2 text-sm text-[#62748E]">
            <p className="font-bold">Pool Batch ID:</p>
            <p>POL987868787</p>
            <Badge variant={"outline"} className="text-xs font-semibold">
              In Progress
            </Badge>
          </span>

          {/** DISBURSEMENT FILE DATE AND USER*/}
          <span className="flex items-center justify-center space-x-4">
            <span className="flex space-x-2 text-sm text-[#62748E]">
              <img
                src={assetPath("/images/icons/calendar_disbursement.svg")}
                alt="calender"
              />
              <DateDisplay date={new Date().toISOString()} />
            </span>
            <span className="flex space-x-2 text-sm text-[#62748E]">
              <img src={assetPath("/images/icons/user_disbursement.svg")} alt="User" />
              <p>User, U53R1D</p>
            </span>
          </span>
        </div>
        <div>
          {/* FILE UPLOAD ROW */}
          <span className="flex justify-between space-x-2 p-5 ml-5 mr-5">
            <span className="flex flex-col items-center space-y-1">
              <ButtonRound
                src="folder_open_disbursement"
                alt="folder open"
                id="folder_open"
                progress={100}
              />
              <Label htmlFor="folder_open"> File Uploaded </Label>
              <Label htmlFor="folder_open" className="text-[#62748E]">
                {getFormattedDateTime()}
              </Label>
            </span>
            <Progress
              value={progress1}
              className="w-[14rem] mt-5 -ml-58 -mr-55"
            />
            <span className="flex flex-col items-center space-y-1">
              <ButtonRound
                src="file_processed_disbursement"
                alt="file processed"
                id="file_processed"
                progress={progress1}
              />
              <Label htmlFor="file_processed"> File Processed </Label>
              {progress1 === 100 && (
                <Label htmlFor="file_processed" className="text-[#62748E]">
                  {getFormattedDateTime()}
                </Label>
              )}
            </span>
            <Progress
              value={progress2}
              className="w-[14rem] mt-5 -ml-58 -mr-50"
            />
            <span className="flex flex-col items-center space-y-1">
              <ButtonRound
                src="NBFC_BRE_dark_disbursement"
                alt="nbfc bre disbursement"
                id="nbfc_bre_disbursement"
                progress={progress2}
              />
              <Label htmlFor="nbfc_bre_disbursement"> NBFC BRE </Label>
              {progress2 === 100 && (
                <Label
                  htmlFor="nbfc_bre_disbursement"
                  className="text-[#62748E]"
                >
                  {getFormattedDateTime()}
                </Label>
              )}
            </span>
            <Progress
              value={progress3}
              className="w-[14rem] mt-5 -ml-50 -mr-50"
            />
            <span className="flex flex-col items-center space-y-1">
              <ButtonRound
                src="disburse_disbursement"
                alt="disburse_disbursement"
                id="disburse_disbursement"
                progress={progress3}
              />
              <Label htmlFor="disburse_disbursement"> Disburse </Label>
              {progress3 === 100 && (
                <Label
                  htmlFor="disburse_disbursement"
                  className="text-[#62748E]"
                >
                  {getFormattedDateTime()}
                </Label>
              )}
            </span>
          </span>
          {/** DISBURSEMENT FILE RUNDOWN */}
          <div className="text-[#62748E] flex justify-between bg-[#C3EEFF] min-h-[40px] min-w-full rounded-2xl p-3">
            <span className="flex justify-between">
              <p className="font-bold">Total App: </p>
              <p>4088</p>
            </span>
            <span className="flex justify-between">
              <p className="font-bold">Approved App: </p>
              <p>3408</p>
            </span>
            <span className="flex justify-between">
              <p className="font-bold">Approved Loan Amount: </p>
              <p>₹ 20,00,000</p>
            </span>
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex space-x-8 justify-end mr-5">
        <Button
          variant={"outline"}
          className="flex justify-between min-w-[11rem] items-center text-[#0089CF] border-[#0089CF]"
        >
          <p>Run NBFC BRE</p>
          <img
            src={assetPath("/images/icons/NBFC_BRE_disbursement.svg")}
            alt="NBFC_BRE_disbursement"
          />
        </Button>
        <PoolBuyoutConfirmation />
      </div>

      {/* TABLE SKELETONS */}
      {loading ? (
        <div className="flex flex-col bg-white shadow-sm rounded-lg p-5 space-y-3 space-x-4">
          <SkeletonTable rows={5} columns={4} />
        </div>
      ) : (
        <DataTable />
      )}
    </div>
  );
}

export default DisbursementFileRundown
