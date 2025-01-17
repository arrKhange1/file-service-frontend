import styles from './Modal.module.scss';

interface ModalProps {
  width?: number;
  height?: number;
  visible: boolean;
  header?: string;
  renderContent: (hide: () => void) => JSX.Element;
  onHide: () => void;
}

export const Modal: React.FC<ModalProps> = ({ header, visible, renderContent, onHide, width, height }) => {
  function hide(): void {
    onHide();
  }

  return (
    visible && (
      <div className={styles.backdrop}>
        <div className={styles.modal} style={{ width: width ?? 300, height: height ?? 400 }}>
          <span className={styles.modalHeader}>{header}</span>
          <img className={styles.modalCloseIcon} src="src/app/icons/close.svg" onClick={hide} />
          {renderContent(hide)}
        </div>
      </div>
    )
  );
};
