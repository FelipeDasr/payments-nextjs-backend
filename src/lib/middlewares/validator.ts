import withJoi from "next-joi";

export default withJoi({
  onValidationError: (req, res, error) => {
    return res.status(422).json({
      message: error.details[0].message
    });
  },
});