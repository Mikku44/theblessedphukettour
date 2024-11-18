import {RadioGroup, Radio, useRadio, RadioProps} from "@nextui-org/radio";
import { cn } from "@nextui-org/theme";

export const CustomRadio = (props: RadioProps) => {
  const {
    Component,
    children,
    isSelected,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        "group inline-flex items-center justify-between hover:bg-content2 flex-row-reverse",
        " cursor-pointer border-2 border-default rounded-lg gap-4 p-4",
        "data-[selected=true]:border-primary",
      )}
    >
      <div >
        <input {...getInputProps()} />
      </div>
      
      <div style={{display:"none"}}   className="" {...getWrapperProps()}>
        
        <span  {...getControlProps()} />
      </div>
      
      <div {...getLabelWrapperProps()}>
        {children && <span {...getLabelProps()}>{children}</span>}
        {description && (
          <span className="text-small text-foreground opacity-70">{description}</span>
        )}
      </div>
    </Component>
  );
};

export default function PlanSelector() {
  return (
    <RadioGroup label="Plans" className="w-full ">
      {[1,2,3,4,5].map((item,index)=><CustomRadio key={index} description={(item*200).toString()+" THB"} value={item.toString()}>
        Program {item}
      </CustomRadio>)}
      
    </RadioGroup>
  );
}