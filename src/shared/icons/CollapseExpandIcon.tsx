interface CollapseExpandIconProps {
  width: number;
  height: number;
  type: 'expand' | 'collapse';
}

export const CollapseExpandIcon = ({ width, height, type }: CollapseExpandIconProps) => {
  const expandedIconViewbox = `0 0 ${width} ${height}`;
  const collapsedIconViewbox = `0 0 ${height} ${width}`;

  return (
    <>
      {type === 'expand' && (
        <svg width={width} height={height} viewBox={expandedIconViewbox} fill="none" xmlns="http://www.w3.org/2000/svg">
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
          width={height}
          height={width}
          viewBox={collapsedIconViewbox}
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
    </>
  );
};
