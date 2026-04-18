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

exports.getAllPolls = async (req, res) => {
  try {
    let polls = await Poll.find();
    res.render("polls", { polls });
  } catch (error) {
    console.log(error);
  }
};

exports.viewPollGetController = async (req, res) => {
  let id = req.params.id;
  try {
    let poll = await Poll.findById(id);
    if (!poll) {
      return res.status(404).render("viewPoll", { poll: null });
    }
    res.render("viewPoll", { poll });
  } catch (error) {
    console.log(error);
  }
};
