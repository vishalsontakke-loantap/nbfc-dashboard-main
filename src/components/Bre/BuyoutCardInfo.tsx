import React from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { assetPath } from "@/lib/utils";
type Capability = {
    text: string;
};

type Functionality = {
    text: string;
    img:string;
};

interface PoolBuyoutProps {
    title: string;
    subtitle: string;
    capabilities: Capability[];
    functionalities: Functionality[];
    onContinue?: () => void;
    continueHref?: string;
    policyHref?: string;
}

const BuyoutCardInfo: React.FC<PoolBuyoutProps> = ({
    title,
    subtitle,
    capabilities,
    functionalities,
    onContinue,
    continueHref,
    policyHref,
}) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border border-gray-200 mr-6 ml-6 mb-8">
            {/* Left section */}
            <div className="flex-1">
                {/* Header */}
                <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <Badge variant="destructive" className="text-xs font-semibold">
                        BETA
                    </Badge>
                </div>
                <p className="text-gray-500 text-sm mb-4">{subtitle}</p>
                <hr />

                {/* Capabilities & Functionalities */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-6 mt-2">
                    {/* Capabilities */}
                    <div>
                        <h3 className="text-green-600 font-semibold mb-2">
                            System Capabilities
                        </h3>
                        <ul className="space-y-1">
                            {capabilities.map((cap, idx) => (
                                <li key={idx} className="flex items-center text-sm text-gray-700">
                                    <span className="mr-2"><img src={assetPath("/images/righticon.svg")} alt="" /></span>
                                    {cap.text}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Functionalities */}
                    <div>
                        <h3 className="text-orange-500 font-semibold mb-2">
                            Key Functionalities
                        </h3>
                        <ul className="space-y-1">
                            {functionalities.map((func, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-center text-sm text-gray-700"
                                >
                                    <span className="mr-2"><img src={assetPath(func.img)} alt="" /></span>
                                    {func.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Right section */}
            <div className="flex flex-col items-end gap-3 w-64">
                {continueHref ? (
                    <Link
                        to={continueHref}
                        className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-lg shadow-md transition"
                    >
                        Continue Onboarding
                    </Link>
                ) : (
                    <button
                        onClick={onContinue}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-lg shadow-md transition"
                    >
                        Continue Onboarding
                    </button>
                )}
                {policyHref ? (
                    <Link
                        to={policyHref}
                        className="w-full text-center text-sm text-gray-600 border rounded-lg px-4 py-2 bg-gray-100"
                    >
                        View Policy & Limits
                    </Link>
                ) : (
                    <button className="w-full text-sm text-gray-600 border rounded-lg px-4 py-2 bg-gray-100">
                        View Policy & Limits
                    </button>
                )}
                <div className="flex gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs font-semibold">
                        User Manual
                    </Badge>
                    <Badge variant="secondary" className="text-xs font-semibold">
                        SLA
                    </Badge>
                    <Badge variant="secondary" className="text-xs font-semibold">
                        FAQ
                    </Badge>
                </div>
            </div>
        </div>
    );
};

export default BuyoutCardInfo;
