import styles from './CollapseExpandIcon.module.scss';

interface CollapseExpandIconProps {
  type: 'expand' | 'collapse';
}

export const CollapseExpandIcon = ({ type }: CollapseExpandIconProps) => {
  return (
    <>
      <div className={styles.iconWrapper}>
        {type === 'expand' && (
          <svg data-icon-expand width={8} height={9} viewBox={'0 0 8 9'} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.833496 8.6665L4.8335 4.99984L0.833496 1.33317"
              stroke="#272727"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {type === 'collapse' && (
          <svg
            data-icon-collapse
            width={9}
            height={8}
            viewBox={'0 0 9 8'}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.333496 0.833496L4.00016 4.8335L7.66683 0.833496"
              stroke="#272727"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </>
  );
};
