import styles from './Modal.module.scss';

interface ModalProps {
  width: number;
  height: number;
  visible: boolean;
  renderContent: (hide: () => void) => JSX.Element;
  onHide: () => void;
}

export const Modal: React.FC<ModalProps> = ({ visible, renderContent, onHide, width, height }) => {
  function hide(): void {
    onHide();
  }

  return (
    visible && (
      <div className={styles.backdrop}>
        <div className={styles.modal} style={{ width: width ?? 300, height: height ?? 400 }}>
          {renderContent(hide)}
        </div>
      </div>
    )
  );
};
