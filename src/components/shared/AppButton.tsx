import { ButtonProps, CircularProgressProps } from "@mui/material";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

type Props = ButtonProps & {
  loading?: boolean;
  circularProgressProps?: CircularProgressProps;
};

function AppButton({
  loading,
  children,
  circularProgressProps,
  ...rest
}: Props) {
  return (
    <Button disabled={rest.disabled || loading} {...rest}>
      {loading ? (
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
