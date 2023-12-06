"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { Form } from "@/components/ui/form";

import PaymentSchedule from "@/components/PaymentShedule";
import StepOne from "@/components/EnterInfo";
import Navigation from "@/components/Navigation";
import PaymentPlans from "@/components/PaymentPlans";

const formSchema = z.object({
  amountOwed: z
    .string()
    .refine((value) => Number(value.replace(/,/g, "")) > 0, {
      message: "Amount owed must be greater than zero",
    }),
  dueDate: z.date().refine((date) => date >= new Date(), {
    message: "Due date must be in the future",
  }),
  startDate: z.date().refine(
    (date) => {
      return date.setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0);
    },
    {
      message: "Start date must be today or in the future",
    }
  ),
  option: z.string(),
  paymentOption: z.string(),
});

const steps = [
  {
    id: "Step 1",
    name: "Amount and Date",
    fields: ["amountOwed", "dueDate"],
  },
  {
    id: "Step 2",
    name: "Another Date and Option",
    fields: ["startDate", "option", "paymentOption"],
  },
  { id: "Step 3", name: "Payment Schedule" },
];

export default function Home() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentOptions, setPaymentOptions] = useState({
    weekly: 0,
    monthly: 0,
    fortnightly: 0,
    lastWeeklyPayment: 0,
    lastMonthlyPayment: 0,
    lastFortnightlyPayment: 0,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amountOwed: "",
      dueDate: new Date(),
      startDate: new Date(),
      option: "",
      paymentOption: "",
    },
  });

  const { watch, formState } = form;
  const startDate = watch("startDate");
  const dueDate = watch("dueDate");
  const amountOwed = watch("amountOwed");

  useEffect(() => {
    const calculatePaymentOptions = (
      startDate: Date,
      dueDate: Date,
      amountOwed: number
    ) => {
      const diffInDays = Math.ceil(
        (dueDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diffInDays === 0) {
        console.error("Start date and due date are the same.");
        return;
      }

      const diffInWeeks = Math.ceil(diffInDays / 7);
      const diffInMonths = Math.ceil(diffInDays / 30);
      const diffInFortnights = Math.ceil(diffInDays / 14);

      const weekly = amountOwed / diffInWeeks;
      const monthly = amountOwed / diffInMonths;
      const fortnightly = amountOwed / diffInFortnights;

      const lastWeeklyPayment = amountOwed - weekly * (diffInWeeks - 1);
      const lastMonthlyPayment = amountOwed - monthly * (diffInMonths - 1);
      const lastFortnightlyPayment =
        amountOwed - fortnightly * (diffInFortnights - 1);

      setPaymentOptions({
        weekly: weekly < 0 ? 0 : weekly,
        monthly: monthly < 0 ? 0 : monthly,
        fortnightly: fortnightly < 0 ? 0 : fortnightly,
        lastWeeklyPayment: lastWeeklyPayment < 0 ? 0 : lastWeeklyPayment,
        lastMonthlyPayment: lastMonthlyPayment < 0 ? 0 : lastMonthlyPayment,
        lastFortnightlyPayment:
          lastFortnightlyPayment < 0 ? 0 : lastFortnightlyPayment,
      });
    };

    calculatePaymentOptions(
      new Date(startDate),
      new Date(dueDate),
      parseFloat(amountOwed.replace(/,/g, ""))
    );
  }, [startDate, dueDate, amountOwed]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const newValues = {
      ...values,
      amountOwed: parseFloat(values.amountOwed.replace(/,/g, "")),
    };
  };

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as any[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await form.handleSubmit(handleSubmit)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  const paymentOption = form.getValues("paymentOption");
  const lastPaymentKey = `last${
    paymentOption.charAt(0).toUpperCase() + paymentOption.slice(1)
  }Payment` as keyof typeof paymentOptions;

  return (
    <main className="flex flex-col w-full items-center justify-center sm:p-16 p-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4 mx-auto  p-4 rounded-md"
        >
          {currentStep === 0 && <StepOne control={form.control} next={next} />}
          {currentStep === 1 && (
            <>
              <PaymentPlans
                form={form}
                paymentOptions={paymentOptions}
                next={next}
              />
            </>
          )}
          {currentStep === 2 && (
            <PaymentSchedule
              frequency={
                form.getValues("paymentOption") as
                  | "weekly"
                  | "monthly"
                  | "fortnightly"
              }
              totalAmount={parseFloat(
                form.getValues("amountOwed").replace(/,/g, "")
              )}
              weeklyPayment={paymentOptions.weekly}
              monthlyPayment={paymentOptions.monthly}
              fortnightlyPayment={paymentOptions.fortnightly}
              lastPayment={paymentOptions[lastPaymentKey]}
              startDate={form.getValues("startDate")}
              dueDate={form.getValues("dueDate")}
              paymentOption={form.getValues("paymentOption")}
            />
          )}
        </form>
      </Form>

      <Navigation
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        prev={prev}
        next={next}
      />
    </main>
  );
}
