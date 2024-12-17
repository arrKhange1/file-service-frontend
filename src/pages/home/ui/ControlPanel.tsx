import { DirectoryItem } from '../../../entities/ui/DirectoryItem';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { CollapseExpandIcon } from '../../../shared/icons/CollapseExpandIcon';

export const ControlPanel = () => {
  return (
    <>
      <DirectoryItem name="events" isActive={true} />
      <DirectoryItem name="products" isActive={false} />
      <Accordion
        expandIcon={<CollapseExpandIcon type={'expand'} width={6} height={9} />}
        collapseIcon={<CollapseExpandIcon type={'collapse'} width={6} height={9} />}
      >
        <AccordionTab header={<div>Your dropbox</div>}>
          <DirectoryItem isActive={true} name="Dir1" />
          <DirectoryItem isActive={false} name="Dir2" />
        </AccordionTab>
      </Accordion>
    </>
  );
};
