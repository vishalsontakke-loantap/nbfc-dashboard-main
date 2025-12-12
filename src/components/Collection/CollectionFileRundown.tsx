import DateDisplay from "../DateDisplay";
import { Badge } from "@/components/ui/badge";
import ButtonRound from "@/components/ButtonRound";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { SkeletonTable } from "../ui/skeleton-table";
import { Button } from "../ui/button";
import { DataTable } from "@/components/ui/data-table";
import { CollectionConfirmation } from "./CollectionConfrimation";
import { getFormattedDateTime, assetPath } from "@/lib/utils";
import { useParams } from "react-router-dom";

const CollectionFileRundown = () => {
    const [loading, setLoading] = useState(false);
    const { batchId } = useParams();
    const [progress1, setProgress1] = useState(0);
    const [progress2, setProgress2] = useState(0);
    const [progress3, setProgress3] = useState(0);
    const targetValue = 100; // set this to your desired value




    return (
        <div className="flex flex-col space-y-4 p-5">
            <div className="flex flex-col bg-white shadow-sm rounded-lg p-5 space-y-3 space-x-4">
                <div className="flex items-center justify-between">
                    {/** DISBURSEMENT FILE NAME */}
                    <span className="flex space-x-2 text-sm text-[#62748E]">
                        <p className="font-bold">Pool Batch ID:</p>
                        <p>{batchId}</p>
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
                    
                    {/** DISBURSEMENT FILE RUNDOWN */}
                    <div className="text-[#62748E] flex justify-between bg-[#C3EEFF] min-h-[40px] min-w-full rounded-2xl p-3">
                        <span className="flex justify-between">
                            <p className="font-bold">Total Collection: </p>
                            <p>4088</p>
                        </span>
                        <span className="flex justify-between">
                            <p className="font-bold">Total Principal: </p>
                            <p>3408</p>
                        </span>
                        <span className="flex justify-between">
                            <p className="font-bold">Total Interest: </p>
                            <p>₹ 20,00,000</p>
                        </span>
                    </div>
                    <div className="text-[#62748E] flex justify-between bg-[#C3EEFF] min-h-[40px] min-w-full rounded-2xl p-3 mt-2">
                        <span className="flex justify-between">
                            <p className="font-bold">Bank Collection: </p>
                            <p>4088</p>
                        </span>
                        <span className="flex justify-between">
                            <p className="font-bold">Bank Principal: </p>
                            <p>3408</p>
                        </span>
                        <span className="flex justify-between">
                            <p className="font-bold">Bank Interest: </p>
                            <p>₹ 20,00,000</p>
                        </span>
                    </div>
                </div>
            </div>

            {/* BUTTONS */}
            <div className="flex space-x-8 justify-end mr-5">
                
                <CollectionConfirmation />
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

export default CollectionFileRundown
