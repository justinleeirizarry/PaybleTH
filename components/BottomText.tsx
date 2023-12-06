import { CardContent } from "./ui/card";

const BottomText: React.FC = () => {
  return (
    <div className=" align-middle">
      <CardContent>
        {" "}
        Your flexible payment plan will automatically roll-over into future
        billing periods. We&apos;ll send and SMS before any roll-over and you
        can always cancel at any time Remember, there is no extra fees for
        paying flexibly.
      </CardContent>
    </div>
  );
};

export default BottomText;
