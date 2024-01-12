const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

const supportedFileTypes = ["mp4", "mp3", "jpeg", "png", "pdf", "zip"];

// Add more 3D model file types to this array as needed
const supported3DModelFileTypes = ["obj", "fbx", "stl", "blend"];

const FileSchemaJoi = Joi.object({
  file_name: Joi.string()
    .required()
    .custom((value, helpers) => {
      const extension = value.split(".").pop().toLowerCase();
      if (
        !supportedFileTypes.includes(extension) &&
        !supported3DModelFileTypes.includes(extension)
      ) {
        return helpers.message(
          `File type not supported. Only ${supportedFileTypes.join(
            ", "
          )} and 3D model file types are allowed.`
        );
      }
      return value;
    }),
  file_size: Joi.number().required(),
  file_type: Joi.string().required(),
  file: Joi.any().required(), // For file upload, it might need custom validation
  file_folder: Joi.string().required(),
  community_id: Joi.string().required(),
});

// schema for user validation
module.exports.userSchema = Joi.object({
  first_name: Joi.string().trim().escapeHTML(),
  last_name: Joi.string().trim().escapeHTML(),
  username: Joi.string().required().trim().escapeHTML(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .escapeHTML(),
  about: Joi.string().trim().escapeHTML(),
});

// schema for key validation
module.exports.KeySchemaJoi = Joi.object({
  image: Joi.string().uri(), // Assuming image is a URL
  name: Joi.string().required(),
  chain: Joi.string(), // Validate based on your requirements
  description: Joi.string(),
  quantity: Joi.number().integer().min(1).default(1),
  price: Joi.number().min(0).default(0),
  community_id: Joi.string().required(),
});

// Joi validation for FolderSchema
const FolderSchemaJoi = Joi.object({
  name: Joi.string().required(),
  user_id: Joi.string().required(),
  community_id: Joi.string().required(),
  files: Joi.array().items(FileSchemaJoi),
});

// Joi validation for RoadmapSchema
const RoadmapSchemaJoi = Joi.object({
  title: Joi.string().required(),
  date: Joi.string().required(),
  description: Joi.string().required(),
  points: Joi.array().items(
    Joi.object({
      point: Joi.string().required(),
    })
  ),
  achieved: Joi.boolean(),
  category_id: Joi.string().required(),
});

// schema for community validation
module.exports.communityValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  community_avatar: Joi.string().required(),
  community_banner: Joi.string().required(),
  community_category: Joi.string().required(),
  is_verified: Joi.boolean(),
  chain: Joi.string().required(),
  socials: Joi.array().items(
    Joi.object({
      name: Joi.string().allow(null),
      url: Joi.string().required(),
      icon: Joi.string().allow(null),
      user_id: Joi.string().required(),
    })
  ),
  merch: Joi.object({
    url: Joi.string().allow(""),
    is_active: Joi.boolean(),
  }),
  dao_proposals: Joi.object({
    url: Joi.string().allow(""),
    is_active: Joi.boolean(),
  }),
  articles: Joi.object({
    url: Joi.string().allow(""),
    is_active: Joi.boolean(),
  }),
  giveaway: Joi.object({
    url: Joi.string().allow(""),
    is_active: Joi.boolean(),
  }),
  social_posts: Joi.object({
    url: Joi.string().allow(""),
    is_active: Joi.boolean(),
  }),
  files_tab: Joi.object({
    data: Joi.array().items(FolderSchemaJoi), // Define FolderSchemaJoi separately
    is_active: Joi.boolean(),
  }),
  roadmaps: Joi.object({
    type: Joi.string().valid("monthly", "quarterly").required(),
    is_active: Joi.boolean(),
    data: Joi.array().items(RoadmapSchemaJoi), // Define RoadmapSchemaJoi separately
  }),
  minting_price: Joi.number().min(0),
  key_quantity: Joi.number().min(0),
  key: Joi.array().items(Joi.string()),
  keys_left: Joi.number(),
  users_joined: Joi.number(),
  user_id: Joi.string().required(),
});
