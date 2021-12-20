const { NotFound } = require("http-errors");

const { Contact } = require("../models");

class Contacts {
  async add(req, res) {
    const { _id } = req.user;
    const result = await Contact.create({ ...req.body, owner: _id });

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  }

  async getAll(req, res) {
    const { _id } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const contacts = await Contact.find({ owner: _id }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id, email");

    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  }

  async getById(req, res) {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);

    if (!result) {
      throw new NotFound(`Contact with id='${contactId}' not found`);
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  }

  async removeById(req, res) {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    console.log(result);

    if (!result) {
      throw new NotFound(`Contact with id='${contactId}' not found`);
    }

    res.json({
      status: "success",
      code: 200,
      message: "contact deleted ",
      data: {
        result,
      },
    });
  }

  async updateById(req, res) {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!result) {
      throw new NotFound(`Contact with id='${contactId}' not found`);
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  }

  async updateFavorite(req, res) {
    const { contactId } = req.params;
    const { favorite } = req.body;

    const result = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

    if (!result) {
      throw new NotFound(`Contact with id='${contactId}' not found`);
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  }
}

module.exports = new Contacts();
