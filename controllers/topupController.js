const Topup = require('../models/Topup');
const Wallet = require('../models/Wallet');

exports.getAllTopups = async (req, res) => {
  try {
    const topups = await Topup.find();
    res.json(topups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTopup = async (req, res) => {
  try {
    const { id } = req.params;
    await Topup.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.approveTopup = async (req, res) => {
  try {
    const topup = await Topup.findById(req.params.id).populate('user');
    if (!topup) {
      return res.status(404).json({ message: 'Top-up request not found' });
    }

    if (topup.status === 'approved') {
      return res.status(400).json({ message: 'Top-up request is already approved' });
    }

    topup.status = 'approved';
    await topup.save();

    let wallet = await Wallet.findOne({ userId: topup.user._id });
    if (wallet) {
      wallet.balance += topup.amount;
      await wallet.save();
    } else {
      await Wallet.create({ userId: topup.user._id, balance: topup.amount });
    }

    res.json(topup);
  } catch (error) {
    res.status(500).json({ message: 'Error approving top-up request', error });
  }
};

exports.declineTopup = async (req, res) => {
  try {
    const topup = await Topup.findByIdAndUpdate(req.params.id, { status: 'declined' }, { new: true });
    res.json(topup);
  } catch (error) {
    res.status(500).json({ message: 'Error declining top-up request', error });
  }
};

exports.getApprovedTopups = async (req, res) => {
  try {
    const topups = await Topup.find({ status: 'approved' });
    res.json(topups);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching approved top-up requests', error });
  }
};

exports.getDeclinedTopups = async (req, res) => {
  try {
    const topups = await Topup.find({ status: 'declined' });
    res.json(topups);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching declined top-up requests', error });
  }
};
