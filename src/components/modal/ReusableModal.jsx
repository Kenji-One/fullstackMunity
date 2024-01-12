import { Dialog } from "@mui/material";
import FormHeading from "../settings/Community/NFTCreation/FormHeading";

const ReusableModal = ({ isOpen, handleClose, title, children }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      sx={{
        ".MuiPaper-root": {
          borderRadius: "0",
          width: "100%",
          maxWidth: { mob: "100%", tab: "523px" },
          margin: { mob: 0, tab: "24px" },
          height: { mob: "100%", tab: "unset" },
          maxHeight: { mob: "100%", tab: "calc(100% - 64px)" },
          padding: { mob: "16px", tab: "24px", lap: "32px" },
        },
      }}
    >
      <FormHeading text={title} onCloseModal={handleClose} />
      {children}
    </Dialog>
  );
};

export default ReusableModal;
