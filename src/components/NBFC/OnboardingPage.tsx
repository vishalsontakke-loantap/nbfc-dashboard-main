import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const OnboardingPage = () => {
  return (
    <div className="grid place-items-center min-h-[89.5dvh] p-5">
      <Card className="scale-95 w-full h-full flex items-center p-10">
        <div className="flex flex-col items-center max-w-[120dvh]">
          <h1 className="text-3xl font-bold">Welcome to Onboarding</h1>
          <p className="text-xs text-center text-muted-foreground mt-4 mb-6">
            Welcome to the NBFC onboarding journey for Co-Lending and Pool
            Buyout partnerships. Get started by sharing your company details,
            uploading key documents, and configuring your integration settings.
          </p>
        </div>
        <CardContent className="space-x-4">
          <Button variant={"outline"}>
            Learn More
            <img
              src="/images/icons/learn_more_onboarding_page.svg" // adjust filename as needed
              alt={"Learn More"}
              className={"w-6"}
            />
          </Button>
          <Link to="/nbfc/segment-selection">
            <Button>
              Register New NBFC
              <ChevronRight />
            </Button>
          </Link>
        </CardContent>
        <CardFooter className="mb-auto">
          <img src="/images/onboarding_row.svg" alt="row" />
        </CardFooter>
      </Card>
    </div>
  );
};

export default OnboardingPage;
