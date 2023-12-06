import React from "react";
import { Controller } from "react-hook-form";
import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import DatePicker from "@/components/DatePicker";
import PriceInput from "@/components/PriceInput";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

interface StepOneProps {
  control: any;
  next: () => void;
}

const EnterInfo: React.FC<StepOneProps> = ({ control, next }) => {
  return (
    <Card className="p-8 border-solid border-2  rounded-lg">
      <Controller
        control={control}
        name="amountOwed"
        rules={{ required: "Amount owed is required" }}
        render={({ field, fieldState: { error } }) => (
          <CardContent>
            <FormItem className="grid w-full items-center gap-4">
              <CardTitle className="text-gray-600">Amount Owed</CardTitle>
              <FormControl>
                <PriceInput field={field} />
              </FormControl>
              {error && <FormMessage>{error.message}</FormMessage>}
            </FormItem>
          </CardContent>
        )}
      />
      <Controller
        control={control}
        name="dueDate"
        rules={{ required: "Due date is required" }}
        render={({ field, fieldState: { error } }) => (
          <CardContent>
            <FormItem className="flex items-center gap-4">
              <CardTitle className="text-gray-600">Due Date</CardTitle>
              <FormControl className="w-2/3">
                <DatePicker {...field} />
              </FormControl>
              {error && <FormMessage>{error.message}</FormMessage>}
            </FormItem>
          </CardContent>
        )}
      />
      <CardFooter>
        <Button
          className="w-full bg-cyan-400 hover:bg-slate-600"
          onClick={next}
        >
          submit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EnterInfo;
