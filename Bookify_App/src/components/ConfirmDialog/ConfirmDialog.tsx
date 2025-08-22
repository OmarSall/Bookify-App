import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmDialog({
                                        open,
                                        title,
                                        description,
                                        confirmText = "Delete",
                                        cancelText = "Cancel",
                                        loading = false,
                                        onClose,
                                        onConfirm,
                                      }: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} fullWidth maxWidth="xs">
      <DialogTitle>{title}</DialogTitle>
      {description && (
        <DialogContent>
          <Typography variant="body2">{description}</Typography>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          {cancelText}
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" disabled={loading}>
          {loading ? "Deleting..." : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
