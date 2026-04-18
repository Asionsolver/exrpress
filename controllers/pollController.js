const Poll = require("../models/poll.model");
exports.createPollGetController = (req, res) => {
  res.render("create");
};
exports.createPollPostController = async (req, res) => {
  let { title, description, options } = req.body;
  options = options.map((option) => {
    return {
      name: option,
      vote: 0,
    };
  });
  console.log(options);

  let poll = new Poll({
    title,
    description,
    options,
  });

  try {
    await poll.save();
    res.redirect("/polls");
  } catch (error) {
    console.log(error);
  }
};
