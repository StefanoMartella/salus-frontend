import { ButtonProps, CircularProgressProps } from "@mui/material";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

type Props = ButtonProps & {
  isLoading?: boolean;
  circularProgressProps?: CircularProgressProps;
};

function AppButton({
  isLoading,
  children,
  circularProgressProps,
  ...rest
}: Props) {
  return (
    <Button disabled={rest.disabled || isLoading} {...rest}>
      {isLoading ? (
        <div className="d-flex align-items-center">
          {children}
          <CircularProgress
            size={15}
            style={{ color: "blue", marginLeft: 10 }}
            {...circularProgressProps}
          />
        </div>
      ) : (
        children
      )}
    </Button>
  );
}

export default AppButton;
