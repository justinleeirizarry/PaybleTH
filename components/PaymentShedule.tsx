import React from "react";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import BottomText from "./BottomText";

interface PaymentProps {
  frequency: "weekly" | "fortnightly" | "monthly";
  totalAmount: number;
  weeklyPayment: number;
  monthlyPayment: number;
  fortnightlyPayment: number;
  lastPayment: number;
  startDate: Date;
  dueDate: Date;
  paymentOption: string;
}

const PaymentSchedule: React.FC<PaymentProps> = ({
  frequency,
  totalAmount,
  weeklyPayment,
  monthlyPayment,
  fortnightlyPayment,
  lastPayment,
  startDate,
  dueDate,
  paymentOption,
}) => {
  const getPaymentAmount = (index: number, totalPayments: number) =>
    index < totalPayments - 1
      ? {
          weekly: weeklyPayment,
          fortnightly: fortnightlyPayment,
          monthly: monthlyPayment,
        }[frequency]
      : lastPayment;

  const getIntervalDays = () =>
    ({ weekly: 7, fortnightly: 14, monthly: 30 })[frequency];

  const totalPayments = Math.ceil(totalAmount / getPaymentAmount(0, 1));
  const intervalDays = getIntervalDays();

  const payments = Array.from({ length: totalPayments }, (_, index) => {
    const amount = getPaymentAmount(index, totalPayments);
    return {
      number: index + 1,
      amount: amount.toLocaleString("en-AU", {
        style: "currency",
        currency: "AUD",
      }),
      date: new Date(Date.now() + index * intervalDays * 24 * 60 * 60 * 1000),
      submitted: false,
    };
  });

  return (
    <>
      <Card className=" rounded-lg align-middle justify-center">
        <CardHeader>
          <CardTitle className="text-4xl text-cyan-400">
            Your payment plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          You started a {paymentOption} plan on {startDate.toLocaleDateString()}{" "}
          that will finish on {dueDate.toLocaleDateString()}. There are{" "}
          {totalPayments} payments.
        </CardContent>
      </Card>
      <div className="border-solid border-2 border-cyan-400 rounded-md p-11">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-l">Payment Number</TableHead>
              <TableHead className="text-l">Amount</TableHead>
              <TableHead className="text-l">Date</TableHead>
              <TableHead className="text-l">Status</TableHead>
              <TableHead className="text-right text-l">Submitted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.number}>
                <TableCell>{payment.number}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>{payment.date.toLocaleDateString()}</TableCell>
                <TableCell>
                  {payment.date > new Date() ? "Upcoming" : "Past"}
                </TableCell>
                <TableCell className="w-[100px]">
                  {payment.submitted ? "Yes" : "No"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <BottomText />
    </>
  );
};

export default PaymentSchedule;
