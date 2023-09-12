import GridCard from "@/components/dashboard/uploader/grid-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import TextEdit from "./text-edit";
import TextTestList from "./text-list";

const ABCPage = () => {
  return (
    <>
      <GridCard title="ABC">
        <div className="flex min-h-[400px] w-full flex-col items-center justify-between gap-8 p-4">
          <span className="flex flex-row gap-4">
            <Badge variant={"default"}>Super</Badge>
            <Badge variant={"secondary"}>Secondary</Badge>
            <Badge variant={"outline"}>Outline</Badge>
            <Badge variant={"tertiary"}>Tertiary</Badge>
            <Badge variant={"destructive"}>Destructive</Badge>
          </span>
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-md border-zinc-800 font-jetbrains"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. It&apos;s animated by default, but you can disable it if
                you prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <TextTestList />
        </div>
      </GridCard>
    </>
  );
};
export default ABCPage;
