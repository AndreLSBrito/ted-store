import { Progress } from "@/components/ui/progress";

const Loading = () => {
  return ( 
    <div className="flex h-full w-auto flex-col items-center justify-center">
      <Progress className="w-[50%]" value={99}/> 
    </div>
   );
}
 
export default Loading;