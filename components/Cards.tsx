import React from "react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Option = {
  value: string;
  label: string;
};

type OptionCardProps = {
  option: Option;
  selectedOption: string;
  onOptionChange: (value: string) => void;
  paymentAmount: number;
  lastPaymentAmount: number;
  lastPaymentMessage: string;
  next: () => void;
};

const OptionCard: React.FC<OptionCardProps> = ({
  option,
  selectedOption,
  onOptionChange,
  paymentAmount,
  lastPaymentAmount,
  lastPaymentMessage,
  next,
}) => {
  return (
    <Card
      key={option.value}
      className={`flex flex-col justify-between ${
        selectedOption === option.value ? "ring-2 ring-cyan-400" : ""
      } flex-grow flex-shrink w-full sm:w-80`}
    >
      <CardHeader>
        <CardTitle>
          <h4 className="text-gray-600 text-2xl">
            {option.label.charAt(0).toUpperCase() + option.label.slice(1)}
          </h4>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p>{`${
          option.label.charAt(0).toUpperCase() + option.label.slice(1)
        } Payment Amount: ${paymentAmount.toLocaleString("en-AU", {
          style: "currency",
          currency: "AUD",
        })}`}</p>
        <CardDescription className="mt-4">{lastPaymentMessage}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            onOptionChange(option.value);
            next();
          }}
          className="w-full bg-cyan-400"
        >
          {"Setup flexible payment"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OptionCard;
