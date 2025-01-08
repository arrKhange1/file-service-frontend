import styles from './Modal.module.scss';

interface ModalProps {
  visible: boolean;
  renderContent: (hide: () => void) => JSX.Element;
  onHide: () => void;
}

export const Modal: React.FC<ModalProps> = ({ visible, renderContent, onHide }) => {
  function hide(): void {
    onHide();
  }

  return (
    visible && (
      <div className={styles.backdrop}>
        <div className={styles.modal}>{renderContent(hide)}</div>
      </div>
    )
  );
};
