const { NotFound } = require("http-errors");
const { User } = require("../../model");
const fs = require("fs/promises");
const path = require("path");

const avatarDir = path.join(__dirname, "../../public/avatars");
// console.log(avatarDir);

const updateAvatar = async (req, res) => {
  const { id } = req.user;
  //   console.log(id);
  const { path: tempUpload, originalname } = req.file;
  // console.log(tempUpload);
  try {
    const resultUpload = path.join(avatarDir, id, `${id}_${originalname}`);
    // console.log(resultUpload);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("/avatars", id, `${id}_${originalname}`);

    const result = await User.findOneAndUpdate(
      id,
      { avatarURL },
      {
        new: true,
      }
    );
    if (!result) {
      throw new NotFound(`Not found avatar`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};
module.exports = updateAvatar;

// const { NotFound } = require("http-errors");
// const { Contact } = require("../../model");

// const updateFavorite = async (req, res) => {
//   const { id } = req.params;
//   const { favorite } = req.body;
//   const result = await Contact.findOneAndUpdate(
//     {
//       id,
//       owner: req.user._id,
//     },
//     { favorite },
//     {
//       new: true,
//     }
//   );
//   if (!result) {
//     throw new NotFound(`Product with id=${id} not found`);
//   }
//   res.json({
//     status: "success",
//     code: 200,
//     data: {
//       result,
//     },
//   });
// };
// module.exports = updateFavorite;
