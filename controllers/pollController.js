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
  const showPercentage = req.query.voted === "1";
  const selectedOptionId = req.query.selected || "";

  try {
    let poll = await Poll.findById(id);
    if (!poll) {
      return res.status(404).render("viewPoll", { poll: null });
    }

    let result = [];
    let options = [...poll.options];

    options.forEach((option) => {
      let percentage = (option.vote * 100) / poll.totalVote;
      result.push({
        ...option._doc,
        percentage: percentage ? percentage : 0,
      });
    });
    res.render("viewPoll", { poll, result, showPercentage, selectedOptionId });
  } catch (error) {
    console.log(error);
  }
};

exports.viewPollPostController = async (req, res) => {
  let id = req.params.id;
  //   console.log(req.body);
  let optionId = req.body.pollOption;
  //   res.render("viewPoll");
  try {
    let poll = await Poll.findById(id);
    if (!poll) {
      return res.status(404).render("viewPoll", { poll: null });
    }
    // console.log(poll);
    let options = [...poll.options];
    // console.log(options);
    let index = options.findIndex((opt) => opt.id === optionId);
    // console.log("INDEX: " + index);

    if (index !== -1) {
      // Increase the vote for that specific option by 1
      options[index].vote = options[index].vote + 1;

      // Increase the total vote of the poll (totalVote) by 1
      let totalVote = poll.totalVote + 1;

      // Update the database
      await Poll.findOneAndUpdate(
        { _id: poll._id },
        { $set: { options, totalVote } },
      );

      // Redirect to the results page or the same page after voting
      res.redirect("/polls/" + id + "?voted=1&selected=" + optionId);
    } else {
      res.redirect("/polls/" + id);
    }
  } catch (error) {
    console.log(error);
  }
};
