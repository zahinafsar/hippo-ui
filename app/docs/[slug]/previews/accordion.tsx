import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function AccordionPreview() {
  return (
    <Accordion defaultValue="1" className="w-80">
      <AccordionItem value="1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. Follows WAI-ARIA patterns.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="2">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>Yes, via motion/react.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
