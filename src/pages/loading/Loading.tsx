import { useEffect, useState } from "react";
import { Progress } from "../../components/ui/ProgressBar";

const Loading = () => {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(60), 500);
    const timer2 = setTimeout(() => setProgress(100), 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="flex justify-center items-center w-full">
      <Progress value={progress} className="w-[30%] fixed top-1/2" />
    </div>
  );
};

export default Loading;
