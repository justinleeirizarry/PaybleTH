import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { CardHeader, CardTitle } from "@/components/ui/card";
import DatePicker from "@/components/DatePicker";
import OptionCard from "@/components/Cards";
import BottomText from "./BottomText";

interface PaymentOptions {
  [key: string]: number;
}

interface PaymentPlanProps {
  form: any;
  paymentOptions: PaymentOptions;
  next: () => void;
}

const PaymentPlans: React.FC<PaymentPlanProps> = ({
  form,
  paymentOptions,
  next,
}) => {
  const paymentOption = form.getValues("paymentOption");

  return (
    <>
      <div className="flex flex-col ">
        <CardTitle className="text-4xl text-cyan-400">
          Great! Which plan suits you?
        </CardTitle>
        <p className=" mt-2 p-4 sm:p-0 w-10/12">
          {" "}
          Choose a flexible payment plan that suits you best. Remember, there is
          no extra fees for paying flexibly, You&apos;ll enter your payment
          details on the next page!
        </p>
      </div>
      <div className="flex flex-col space-y-10 p-6 border-solid border-2 rounded-lg">
        <Controller
          control={form.control}
          name="startDate"
          rules={{ required: "Start date is required" }}
          render={({ field, fieldState: { error } }) => (
            <CardHeader>
              <FormItem className="flex flex-col sm:flex items-start gap-4">
                <FormLabel>
                  <div className="flex flex-row items-center gap-6">
                    {" "}
                    <CardTitle className="text-gray-600">
                      When should we start?
                    </CardTitle>
                    <FormControl className="justify-start">
                      <DatePicker {...field} />
                    </FormControl>
                  </div>{" "}
                </FormLabel>
                {error && <FormMessage>{error.message}</FormMessage>}
              </FormItem>
            </CardHeader>
          )}
        />

        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full">
          {["weekly", "monthly", "fortnightly"].map((option) => {
            const lastPaymentKey = `last${
              option.charAt(0).toUpperCase() + option.slice(1)
            }Payment` as keyof typeof paymentOptions;
            const totalPayments = Math.ceil(
              parseFloat(form.getValues("amountOwed").replace(/,/g, "")) /
                paymentOptions[option]
            );
            const lastPaymentMessage =
              paymentOptions[option] && paymentOptions[lastPaymentKey]
                ? `${totalPayments - 1} ${option} payments of ${paymentOptions[
                    option
                  ].toLocaleString("en-AU", {
                    style: "currency",
                    currency: "AUD",
                  })} each, and a final payment of ${paymentOptions[
                    lastPaymentKey
                  ].toLocaleString("en-AU", {
                    style: "currency",
                    currency: "AUD",
                  })}`
                : "";

            return (
              <OptionCard
                key={option}
                option={{ value: option, label: option }}
                selectedOption={paymentOption}
                onOptionChange={(value) =>
                  form.setValue("paymentOption", value)
                }
                paymentAmount={paymentOptions[option]}
                lastPaymentAmount={paymentOptions[lastPaymentKey]}
                lastPaymentMessage={lastPaymentMessage}
                next={next}
              />
            );
          })}
        </div>
        <BottomText />
      </div>
    </>
  );
};

export default PaymentPlans;
