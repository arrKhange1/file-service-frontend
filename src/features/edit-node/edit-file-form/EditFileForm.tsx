import { FileForm } from '../../../entities/file-form/FileForm';

interface EditFileFormProps {
  onHide: () => void;
}

export const EditFileForm: React.FC<EditFileFormProps> = ({ onHide }) => {
  return <FileForm onSubmit={() => {}} actionName={'Изменить'} />;
};
