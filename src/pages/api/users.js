import { validationResult, check } from "express-validator";
import connectDB from "@/utils/database/database";
import User from "../../models/user";

// Handler for GET, POST, PUT, DELETE requests
export default async function handler(req, res) {
  await connectDB(); // Ensure database connection

  const { method } = req;
  switch (method) {
    case "GET":
      // Handle GET request
      try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "POST":
      // Handle POST request - Create a new user
      const createUserValidators = [
        check("first_name")
          .not()
          .isEmpty()
          .withMessage("First name is required"),
        check("last_name").not().isEmpty().withMessage("Last name is required"),
        check("email").isEmail().withMessage("Valid email is required"),
        // Add more validators as necessary
      ];

      await Promise.all(
        createUserValidators.map((validation) => validation.run(req))
      );
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "PUT":
      // Handle PUT request - Update a user
      const updateUserValidators = [
        check("first_name")
          .optional()
          .not()
          .isEmpty()
          .withMessage("First name cannot be empty"),
        // Add more validators as necessary for update
      ];

      await Promise.all(
        updateUserValidators.map((validation) => validation.run(req))
      );
      const updateErrors = validationResult(req);

      if (!updateErrors.isEmpty()) {
        return res.status(400).json({ errors: updateErrors.array() });
      }

      try {
        const { id } = req.query;
        const user = await User.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!user) {
          return res.status(404).json({ success: false });
        }

        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "DELETE":
      // Handle DELETE request - Delete a user
      try {
        const { id } = req.query;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
          return res.status(404).json({ success: false });
        }

        res.status(204).json({ success: true, data: {} }); // No content
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
