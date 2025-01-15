import { DirectoryForm } from '../../../entities/directory-form/DirectoryForm';

interface EditDirectoryFormProps {
  onHide: () => void;
}

export const EditDirectoryForm: React.FC<EditDirectoryFormProps> = ({ onHide }) => {
  return <DirectoryForm onSubmit={() => {}} actionName="Изменить" />;
};
