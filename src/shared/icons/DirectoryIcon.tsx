interface DirectoryIconProps {
  isActive: boolean;
}

export const DirectoryIcon = ({ isActive }: DirectoryIconProps) => {
  return (
    <>
      <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15.5 3H7.768L5.916 0.223C5.87038 0.154449 5.80854 0.0982257 5.73597 0.059323C5.6634 0.0204202 5.58234 4.25504e-05 5.5 0H0.5C0.367392 0 0.240215 0.0526784 0.146447 0.146447C0.0526784 0.240215 0 0.367392 0 0.5L0 12C0 12.5304 0.210714 13.0391 0.585786 13.4142C0.960859 13.7893 1.46957 14 2 14H14C14.5304 14 15.0391 13.7893 15.4142 13.4142C15.7893 13.0391 16 12.5304 16 12V3.5C16 3.36739 15.9473 3.24021 15.8536 3.14645C15.7598 3.05268 15.6326 3 15.5 3Z"
          fill="#0060FF"
          fillOpacity={isActive ? '1' : '0.5'}
        />
      </svg>
    </>
  );
};
